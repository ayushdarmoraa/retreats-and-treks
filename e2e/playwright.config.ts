import { Pool, neonConfig } from '@neondatabase/serverless';
import type { PoolClient, QueryResult, QueryResultRow } from '@neondatabase/serverless';
import { defineConfig } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import WebSocket from 'ws';

export const APPROVED_TEST_BRANCH_ID = 'br-curly-pond-b5mxgar9';

function readTestDatabaseUrl(): string {
  const envPath = path.join(process.cwd(), '.env.test.local');
  const lines = fs.readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .filter((line) => /^\s*(?:export\s+)?DATABASE_URL\s*=/.test(line));

  if (lines.length !== 1) {
    throw new Error('E2E requires exactly one local test DATABASE_URL.');
  }

  const rawValue = lines[0].replace(/^\s*(?:export\s+)?DATABASE_URL\s*=\s*/, '').trim();
  const databaseUrl = rawValue.startsWith('"') && rawValue.endsWith('"')
    ? rawValue.slice(1, -1)
    : rawValue.startsWith("'") && rawValue.endsWith("'")
      ? rawValue.slice(1, -1)
      : rawValue.replace(/\s+#.*$/, '').trim();
  const parsed = new URL(databaseUrl);

  if (
    !['postgres:', 'postgresql:'].includes(parsed.protocol) ||
    !parsed.hostname.toLowerCase().endsWith('.neon.tech')
  ) {
    throw new Error('E2E DATABASE_URL must target Neon.');
  }

  return databaseUrl;
}

const testDatabaseUrl = readTestDatabaseUrl();
const expectedBranchId = process.env.NEON_EXPECTED_BRANCH_ID;

if (expectedBranchId !== APPROVED_TEST_BRANCH_ID) {
  throw new Error('E2E requires NEON_EXPECTED_BRANCH_ID to match the approved isolated test branch.');
}

process.env.DATABASE_URL = testDatabaseUrl;

neonConfig.webSocketConstructor = WebSocket;

let testPool: Pool | undefined;

function getTestPool(): Pool {
  testPool ??= new Pool({ connectionString: testDatabaseUrl, max: 2 });
  return testPool;
}

type DatabaseClient = PoolClient;

async function safeQuery<Row extends QueryResultRow>(
  client: DatabaseClient,
  text: string,
  values: unknown[] = [],
): Promise<QueryResult<Row>> {
  try {
    return await client.query<Row>(text, values);
  } catch (error) {
    const code = typeof error === 'object' && error !== null && 'code' in error
      && typeof error.code === 'string'
      ? error.code
      : 'QUERY_FAILED';
    throw new Error(`Isolated test database query failed (${code}).`);
  }
}

export async function withVerifiedClient<T>(
  operation: (client: DatabaseClient) => Promise<T>,
): Promise<T> {
  const pool = getTestPool();
  let client: DatabaseClient;
  try {
    client = await pool.connect();
  } catch {
    throw new Error('Unable to connect to the isolated test database.');
  }

  try {
    const identity = await safeQuery<{ branch_id: string | null }>(
      client,
      "SELECT current_setting('neon.branch_id', true) AS branch_id",
    );
    if (identity.rows[0]?.branch_id !== expectedBranchId) {
      throw new Error('Connected Neon branch does not match the approved test branch.');
    }
    return await operation(client);
  } finally {
    client.release();
  }
}

export interface OwnedLeadIdentity {
  name: string;
  phone: string;
}

export function makeTestUserAgent(token: string): string {
  const safeToken = token.replace(/[^a-zA-Z0-9]/g, '');
  if (!safeToken) {
    throw new Error('E2E requires a non-empty synthetic user-agent token.');
  }

  return `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 RT-E2E-${safeToken}`;
}

export interface OwnedLead {
  id: string;
  name: string;
  phone: string;
  product_id: string | null;
  source_url: string | null;
  vertical: string | null;
  category: string | null;
  lead_score: number;
  lead_tier: string;
  canonical_lead_tier: string | null;
  lead_reference: string | null;
  conversion_session_id: string | null;
  first_utm_source: string | null;
}

export interface OwnedEvent {
  event_type: string;
  lead_reference: string | null;
  conversion_session_id: string | null;
}

export async function findOwnedLead(identity: OwnedLeadIdentity): Promise<OwnedLead | null> {
  return withVerifiedClient(async (client) => {
    const result = await safeQuery<OwnedLead>(
      client,
      `SELECT id, name, phone, product_id, source_url, vertical, category,
              lead_score, lead_tier, canonical_lead_tier, lead_reference,
              conversion_session_id, first_utm_source
       FROM inquiries
       WHERE name = $1 AND phone = $2`,
      [identity.name, identity.phone],
    );
    if (result.rows.length > 1) {
      throw new Error('Synthetic lead identity matched more than one database row.');
    }
    return result.rows[0] ?? null;
  });
}

export async function readOwnedEvents(leadId: string, sessionId: string): Promise<OwnedEvent[]> {
  return withVerifiedClient(async (client) => {
    const result = await safeQuery<OwnedEvent>(
      client,
      `SELECT event_type, lead_reference, conversion_session_id
       FROM conversion_events
       WHERE inquiry_id = $1::uuid OR conversion_session_id = $2`,
      [leadId, sessionId],
    );
    return result.rows;
  });
}

export async function cleanupOwnedLead(
  identity: OwnedLeadIdentity,
  sessionId: string | null,
): Promise<void> {
  await withVerifiedClient(async (client) => {
    await safeQuery(client, 'BEGIN');
    try {
      const identityCheck = await safeQuery<{ branch_id: string | null }>(
        client,
        "SELECT current_setting('neon.branch_id', true) AS branch_id",
      );
      if (identityCheck.rows[0]?.branch_id !== expectedBranchId) {
        throw new Error('Test branch changed before synthetic-data cleanup.');
      }

      const leads = await safeQuery<{ id: string }>(
        client,
        `SELECT id FROM inquiries WHERE name = $1 AND phone = $2`,
        [identity.name, identity.phone],
      );
      if (leads.rows.length > 1) {
        throw new Error('Refusing cleanup because the synthetic identity is not unique.');
      }

      const lead = leads.rows[0];
      if (lead) {
        await safeQuery(
          client,
          'DELETE FROM conversion_events WHERE inquiry_id = $1::uuid',
          [lead.id],
        );
      }
      if (sessionId) {
        await safeQuery(
          client,
          'DELETE FROM conversion_events WHERE conversion_session_id = $1',
          [sessionId],
        );
      }
      if (lead) {
        const deleted = await safeQuery<{ id: string }>(
          client,
          `DELETE FROM inquiries
           WHERE id = $1::uuid AND name = $2 AND phone = $3
           RETURNING id`,
          [lead.id, identity.name, identity.phone],
        );
        if (deleted.rows.length !== 1) {
          throw new Error('Synthetic lead cleanup did not delete exactly its owned row.');
        }
      }
      await safeQuery(client, 'COMMIT');
    } catch (error) {
      try {
        await safeQuery(client, 'ROLLBACK');
      } catch {
        throw new AggregateError([error], 'Synthetic-data cleanup failed and rollback could not be confirmed.');
      }
      throw error;
    }
  });
}

export async function cleanupOwnedSpamEvents(userAgent: string): Promise<void> {
  await withVerifiedClient(async (client) => {
    await safeQuery(
      client,
      `DELETE FROM conversion_events
       WHERE event_type = 'inquiry_spam_blocked' AND user_agent = $1`,
      [userAgent],
    );
  });
}

export async function closeTestPool(): Promise<void> {
  if (!testPool) return;
  const pool = testPool;
  testPool = undefined;
  await pool.end();
}

export async function verifyTestBranch(): Promise<void> {
  await withVerifiedClient(async () => undefined);
}

export default defineConfig({
  testDir: '.',
  testMatch: ['lead-contact.spec.ts', 'trek-inquiry.spec.ts', 'availability-inquiry.spec.ts'],
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 120_000,
  expect: { timeout: 10_000 },
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3100',
    browserName: 'chromium',
    headless: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  },
  webServer: {
    command: 'corepack pnpm exec next start --hostname 127.0.0.1 --port 3100',
    url: 'http://127.0.0.1:3100/contact',
    timeout: 180_000,
    reuseExistingServer: false,
    env: {
      DATABASE_URL: testDatabaseUrl,
      NEON_EXPECTED_BRANCH_ID: expectedBranchId,
      NEXT_PUBLIC_SITE_URL: 'https://www.retreatsandtreks.com',
      RESEND_API_KEY: '',
    },
  },
});
