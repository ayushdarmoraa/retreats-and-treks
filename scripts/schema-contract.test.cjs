/* eslint-disable @typescript-eslint/no-require-imports */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

test('initializer and attribution migration define the inquiry attribution columns used by persistence and dashboard detail', () => {
  const initializer = read('scripts/init-db.ts');
  const migration = read('scripts/migrations/20261010_plan_a_attribution_fields.sql');
  const inquiryStorage = read('lib/inquiries.ts');
  const leadDetail = read('app/api/internal/leads/[id]/route.ts');
  const tableDefinition = initializer.match(/CREATE TABLE IF NOT EXISTS inquiries \(([\s\S]*?)\n\s*\)\s*`/);

  assert.ok(tableDefinition, 'initializer must define the inquiries table');
  for (const [column, type] of [
    ['first_utm_id', 'TEXT'],
    ['last_utm_id', 'TEXT'],
    ['first_touch_at', 'TIMESTAMPTZ'],
    ['last_touch_at', 'TIMESTAMPTZ'],
  ]) {
    assert.match(tableDefinition[1], new RegExp(`\\b${column}\\s+${type}\\b`));
    assert.match(initializer, new RegExp(`ADD COLUMN IF NOT EXISTS ${column} ${type}`));
    assert.match(migration, new RegExp(`ADD COLUMN IF NOT EXISTS ${column} ${type}`));
    assert.match(inquiryStorage, new RegExp(`\\b${column}\\b`));
    assert.match(leadDetail, new RegExp(`\\b${column}\\b`));
  }
});

test('initializer and required-event migration share the nullable event idempotency key and unique index', () => {
  const initializer = read('scripts/init-db.ts');
  const migration = read('scripts/migrations/20261011_required_submission_event_idempotency.sql');
  const inquiryStorage = read('lib/inquiries.ts');

  assert.match(initializer, /\bevent_idempotency_key\s+TEXT\b/);
  assert.match(initializer, /ADD COLUMN IF NOT EXISTS event_idempotency_key TEXT/);
  assert.match(initializer, /CREATE UNIQUE INDEX IF NOT EXISTS idx_conversion_events_idempotency_key ON conversion_events\(event_idempotency_key\) WHERE event_idempotency_key IS NOT NULL/);
  assert.match(migration, /ADD COLUMN IF NOT EXISTS event_idempotency_key TEXT/);
  assert.match(migration, /CREATE UNIQUE INDEX IF NOT EXISTS idx_conversion_events_idempotency_key/);
  assert.match(inquiryStorage, /transaction\(\[(?:\.\.\.branchGuard,\s*)?insertQuery,\s*\.\.\.eventQueries,\s*existingQuery\]\)/);
  assert.match(inquiryStorage, /'inquiry:' \|\| persisted\.id::text \|\| ':' \|\| \$\{normalized\.eventType\}/);
  assert.match(inquiryStorage, /ON CONFLICT \(event_idempotency_key\)\s+WHERE event_idempotency_key IS NOT NULL\s+DO NOTHING/);
});
