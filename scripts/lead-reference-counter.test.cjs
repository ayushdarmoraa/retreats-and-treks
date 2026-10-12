/* eslint-disable @typescript-eslint/no-require-imports */

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const WebSocket = require('ws');
const { neonConfig, Pool } = require('@neondatabase/serverless');

const APPROVED_BRANCH_ID = 'br-mute-night-b5k9vuk6';
const COUNTER_CAPACITY = 9999;
neonConfig.webSocketConstructor = WebSocket;

function getTestConnectionString() {
  const envPath = path.join(__dirname, '..', '.env.test.local');
  const entries = fs.readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .filter((line) => /^\s*(?:export\s+)?DATABASE_URL\s*=/.test(line));

  if (entries.length !== 1) {
    throw new Error('Expected exactly one DATABASE_URL in .env.test.local.');
  }

  const rawValue = entries[0].replace(/^\s*(?:export\s+)?DATABASE_URL\s*=\s*/, '').trim();
  let connectionString;
  if (rawValue.startsWith('"') && rawValue.endsWith('"')) {
    connectionString = rawValue.slice(1, -1);
  } else if (rawValue.startsWith("'") && rawValue.endsWith("'")) {
    connectionString = rawValue.slice(1, -1);
  } else {
    connectionString = rawValue.replace(/\s+#.*$/, '').trim();
  }

  const url = new URL(connectionString);
  if (
    !['postgres:', 'postgresql:'].includes(url.protocol) ||
    !url.hostname.toLowerCase().endsWith('.neon.tech')
  ) {
    throw new Error('DATABASE_URL in .env.test.local must target Neon.');
  }

  return connectionString;
}

async function withVerifiedClient(pool, operation) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT current_setting('neon.branch_id', true) AS branch_id",
    );
    if (result.rows[0]?.branch_id !== APPROVED_BRANCH_ID) {
      throw new Error('Database session is not on the approved Neon test branch.');
    }
    return await operation(client);
  } finally {
    client.release();
  }
}

function syntheticDate() {
  const start = Date.UTC(2098, 0, 1);
  const dayOffset = crypto.randomInt(0, 36525);
  return new Date(start + dayOffset * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

async function reserveCounterDate(pool, ownedDates) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const referenceDate = syntheticDate();
    if (ownedDates.has(referenceDate)) continue;

    const reserved = await withVerifiedClient(pool, (client) => client.query(
      `INSERT INTO lead_reference_state(reference_date, last_value)
       VALUES ($1::date, 0)
       ON CONFLICT (reference_date) DO NOTHING
       RETURNING reference_date`,
      [referenceDate],
    ));
    if (reserved.rows.length === 1) {
      ownedDates.add(referenceDate);
      return referenceDate;
    }
  }

  throw new Error('Unable to reserve an unused synthetic reference date.');
}

test('reference allocation enforces four-digit capacity and is unique under concurrency', async () => {
  const connectionString = getTestConnectionString();
  const pool = new Pool({ connectionString, max: 24 });
  const ownedDates = new Set();
  try {
    const boundaryDate = await reserveCounterDate(pool, ownedDates);
    const concurrentDate = await reserveCounterDate(pool, ownedDates);

    const boundaryUpdate = await withVerifiedClient(pool, (client) => client.query(
      `UPDATE lead_reference_state
       SET last_value = 9998
       WHERE reference_date = $1::date
       RETURNING last_value`,
      [boundaryDate],
    ));
    const boundaryRows = boundaryUpdate.rows;
    assert.equal(boundaryRows[0]?.last_value, COUNTER_CAPACITY - 1);

    const lastSupportedRows = await withVerifiedClient(pool, (client) => client.query(
      'SELECT next_lead_reference($1::date) AS reference',
      [boundaryDate],
    ));
    const [lastSupported] = lastSupportedRows.rows;
    const formattedDate = boundaryDate.slice(2).replaceAll('-', '');
    assert.equal(lastSupported.reference, `RT-${formattedDate}-9999`);

    await assert.rejects(
      withVerifiedClient(pool, (client) => client.query(
        'SELECT next_lead_reference($1::date) AS reference',
        [boundaryDate],
      )),
      (error) => error?.code === '22003',
    );

    const boundaryStateRows = await withVerifiedClient(pool, (client) => client.query(
      `SELECT last_value
       FROM lead_reference_state
       WHERE reference_date = $1::date`,
      [boundaryDate],
    ));
    const [boundaryState] = boundaryStateRows.rows;
    assert.equal(boundaryState.last_value, COUNTER_CAPACITY);

    const allocationCount = 24;
    const allocations = await Promise.all(
      Array.from({ length: allocationCount }, () => withVerifiedClient(pool, (client) => client.query(
        'SELECT next_lead_reference($1::date) AS reference',
        [concurrentDate],
      ))),
    );
    const references = allocations.map(({ rows }) => rows[0].reference);
    assert.equal(new Set(references).size, allocationCount);
    assert.ok(references.every((reference) => /^RT-\d{6}-\d{4}$/.test(reference)));

    const suffixes = references.map((reference) => Number(reference.slice(-4))).sort((a, b) => a - b);
    assert.deepEqual(suffixes, Array.from({ length: allocationCount }, (_, index) => index + 1));
  } finally {
    const cleanupErrors = [];
    for (const referenceDate of ownedDates) {
      try {
        const deletedRows = await withVerifiedClient(pool, (client) => client.query(
          `DELETE FROM lead_reference_state
           WHERE reference_date = $1::date
           RETURNING reference_date::text AS reference_date`,
          [referenceDate],
        ));
        assert.equal(deletedRows.rows[0]?.reference_date, referenceDate);
      } catch (error) {
        cleanupErrors.push(error);
      }
    }
    try {
      await pool.end();
    } catch (error) {
      cleanupErrors.push(error);
    }
    if (cleanupErrors.length > 0) {
      throw new AggregateError(cleanupErrors, 'Failed to clean up all owned lead-reference test rows.');
    }
    console.log(`Cleaned up ${ownedDates.size} owned lead-reference test rows.`);
  }
});
