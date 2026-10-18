import assert from 'node:assert/strict';
import test from 'node:test';
import { NextRequest } from 'next/server';
import type { getDb } from '@/lib/db';
import { createLeadDetailGetHandler } from './route';

const LEAD_ID = '11111111-1111-4111-8111-111111111111';
const lead = {
  id: LEAD_ID,
  lead_reference: 'RT-261009-0042',
  name: 'Asha Mehta',
  email: 'asha@example.com',
  phone: '+91 9876543210',
  status: 'open',
  lead_score: 42,
  lead_tier: 'warm',
  conversion_session_id: 'session-42',
  first_utm_source: 'newsletter',
  first_utm_id: 'campaign-42',
  first_touch_at: '2026-10-09T08:00:00.000Z',
  last_utm_id: 'campaign-43',
  last_touch_at: '2026-10-10T08:00:00.000Z',
  last_utm_campaign: 'october-retreat',
};

function makeDatabase(returnedLead: Record<string, unknown>[] = [lead], events: Record<string, unknown>[] = []) {
  const calls: Array<{ text: string; values: unknown[] }> = [];
  const query = ((strings: TemplateStringsArray, ...values: unknown[]) => {
    const text = strings.join(' ? ').replace(/\s+/g, ' ').trim();
    calls.push({ text, values });
    return Promise.resolve(text.includes('conversion_events') ? events : returnedLead);
  }) as unknown as ReturnType<typeof getDb>;

  return { query, calls };
}

test('validates IDs before database access and returns not-found for missing leads', async () => {
  const database = makeDatabase([]);
  const handler = createLeadDetailGetHandler({
    getDb: () => database.query,
    hasDatabase: () => true,
  });
  const invalid = await handler(new NextRequest('http://localhost/api/internal/leads/not-a-uuid'), {
    params: Promise.resolve({ id: 'not-a-uuid' }),
  });

  assert.equal(invalid.status, 400);
  assert.equal(database.calls.length, 0);

  const missing = await handler(new NextRequest(`http://localhost/api/internal/leads/${LEAD_ID}`), {
    params: Promise.resolve({ id: LEAD_ID }),
  });
  assert.equal(missing.status, 404);
});

test('returns inquiry- and lead-reference-linked events chronologically with optional attribution intact', async () => {
  const orderedEvents = [
    { id: 'event-1', event_type: 'conversion_cta_view', created_at: '2026-10-09T08:00:00Z' },
    { id: 'event-2', event_type: 'lead_submitted', created_at: '2026-10-09T08:05:00Z' },
    { id: 'event-3', event_type: 'whatsapp_handoff', created_at: '2026-10-09T08:10:00Z' },
  ];
  const database = makeDatabase([lead], orderedEvents);
  const handler = createLeadDetailGetHandler({
    getDb: () => database.query,
    hasDatabase: () => true,
  });
  const response = await handler(new NextRequest(`http://localhost/api/internal/leads/${LEAD_ID}`), {
    params: Promise.resolve({ id: LEAD_ID }),
  });
  const body = await response.json();
  const leadQuery = database.calls.find((call) => !call.text.includes('conversion_events'))!;
  const eventQuery = database.calls.find((call) => call.text.includes('conversion_events'))!;

  assert.equal(response.status, 200);
  assert.equal(body.lead.lead_reference, 'RT-261009-0042');
  assert.equal(body.lead.first_utm_source, 'newsletter');
  assert.equal(body.lead.first_utm_id, 'campaign-42');
  assert.equal(body.lead.first_touch_at, '2026-10-09T08:00:00.000Z');
  assert.equal(body.lead.last_utm_id, 'campaign-43');
  assert.equal(body.lead.last_touch_at, '2026-10-10T08:00:00.000Z');
  for (const field of ['first_utm_id', 'first_touch_at', 'last_utm_id', 'last_touch_at']) {
    assert.ok(leadQuery.text.includes(field), `lead detail query selects ${field}`);
  }
  assert.equal(body.lead.last_utm_campaign, 'october-retreat');
  assert.deepEqual(body.events.map((event: { event_type: string }) => event.event_type), [
    'conversion_cta_view',
    'lead_submitted',
    'whatsapp_handoff',
  ]);
  assert.ok(eventQuery.text.includes('ORDER BY'));
  assert.ok(eventQuery.values.includes(LEAD_ID));
  assert.ok(eventQuery.text.includes('lead_reference = ?'));
  assert.ok(eventQuery.values.includes('RT-261009-0042'));
  assert.ok(!eventQuery.text.includes('conversion_session_id = ?'));
});

test('keeps legacy lead timelines scoped to inquiry and lead reference', async () => {
  const database = makeDatabase([{ ...lead, conversion_session_id: null }]);
  const handler = createLeadDetailGetHandler({
    getDb: () => database.query,
    hasDatabase: () => true,
  });

  await handler(new NextRequest(`http://localhost/api/internal/leads/${LEAD_ID}`), {
    params: Promise.resolve({ id: LEAD_ID }),
  });

  const eventQuery = database.calls.find((call) => call.text.includes('conversion_events'))!;
  assert.ok(eventQuery.values.includes(LEAD_ID));
  assert.ok(eventQuery.values.includes('RT-261009-0042'));
  assert.ok(!eventQuery.text.includes('conversion_session_id = ?'));
});

test('strips personal data from stored conversion-event timeline metadata', async () => {
  const database = makeDatabase([lead], [{
    id: 'event-pii',
    meta: {
      email: 'asha@example.com',
      phone: '+91 9876543210',
      fullName: 'Asha Mehta',
      followup_day: 3,
      lead_reference: 'RT-261009-0042',
    },
  }]);
  const handler = createLeadDetailGetHandler({
    getDb: () => database.query,
    hasDatabase: () => true,
  });

  const response = await handler(new NextRequest(`http://localhost/api/internal/leads/${LEAD_ID}`), {
    params: Promise.resolve({ id: LEAD_ID }),
  });
  const body = await response.json();

  assert.deepEqual(body.events[0].meta, {
    followup_day: 3,
    lead_reference: 'RT-261009-0042',
  });
});
