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

test('lead foundation migration preserves historical tiers and allows every initialized durable event type', () => {
  const initializer = read('scripts/init-db.ts');
  const foundation = read('scripts/migrations/20261007_phase2_lead_data_foundation.sql');
  const durableAnalytics = read('scripts/migrations/20261012_durable_analytics_events.sql');
  const historicalBackfill = foundation.match(/UPDATE inquiries\s+SET canonical_lead_tier = CASE([\s\S]*?)END\s+WHERE canonical_lead_tier IS NULL/);

  assert.ok(historicalBackfill, 'foundation migration must explicitly populate canonical tiers');
  assert.match(historicalBackfill[1], /WHEN lead_tier = 'hot' THEN 'hot'/);
  assert.match(historicalBackfill[1], /WHEN lead_tier = 'warm' THEN 'warm'/);
  assert.match(historicalBackfill[1], /WHEN lead_tier = 'nurture' THEN 'nurture'/);
  assert.match(historicalBackfill[1], /WHEN lead_tier = 'early' THEN 'early'/);
  assert.doesNotMatch(historicalBackfill[1], /WHEN lead_tier = '(?:cold|unscored)'/);

  const eventTypes = [
    'conversion_cta_view', 'conversion_cta_click', 'lead_capture_open',
    'lead_capture_step_view', 'lead_capture_step_complete', 'lead_capture_abandon',
    'lead_submitted', 'whatsapp_handoff', 'phone_click', 'page_view',
    'topic_to_pillar', 'blog_to_journey', 'comparison_to_journey',
    'pillar_to_journey', 'matrix_to_journey', 'form_submission', 'scroll_depth',
    'faq_expand', 'comparison_sort', 'comparison_filter', 'finder_complete',
    'availability_form_submit', 'departure_table_click', 'calendar_filter',
    'micro_save', 'micro_share', 'micro_download', 'yoga_form_completion',
    'yoga_finder_start', 'yoga_finder_recommendation', 'yoga_departure_selection',
    'inquiry_submitted', 'inquiry_validation_failed', 'inquiry_spam_blocked',
    'inquiry_email_sent', 'inquiry_email_failed', 'status_change', 'followup_sent',
  ];

  for (const eventType of eventTypes) {
    assert.ok(initializer.includes(`'${eventType}'`), `initializer must allow ${eventType}`);
    assert.ok(foundation.includes(`'${eventType}'`), `foundation migration must allow ${eventType}`);
    assert.ok(durableAnalytics.includes(`'${eventType}'`), `durable analytics migration must allow ${eventType}`);
  }
});
