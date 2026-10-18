import assert from 'node:assert/strict';
import test from 'node:test';

import {
  normalizeConversionEvent,
  persistConversionEvent,
  shouldRecordCtaView,
  toDurableConversionEvent,
} from './conversion-events';
import type { getDb } from './db';

test('page views stay distinct from CTA visibility events', () => {
  const event = toDurableConversionEvent({
    event: 'page_view',
    from: '/treks/chakrata',
    meta: { conversion_session_id: 'session-42' },
  });
  assert.equal(event?.eventType, 'page_view');
});

test('explicit visible CTA events map to the durable CTA-view vocabulary', () => {
  const event = toDurableConversionEvent({
    event: 'cta_view',
    from: '/treks/chakrata',
    meta: {
      conversion_session_id: 'session-42',
      cta_id: 'trek_hero_inquiry',
      cta_position: 'hero',
      vertical: 'trek',
    },
  });
  assert.equal(event?.eventType, 'conversion_cta_view');
  assert.equal(event?.ctaId, 'trek_hero_inquiry');
});

test('toDurableConversionEvent maps explicit conversion events to the durable schema', () => {
  const event = toDurableConversionEvent({
    event: 'cta_click',
    from: '/treks/chakrata',
    to: '/treks/chakrata#pricing',
    meta: {
      conversion_session_id: 'session-42',
      cta_id: 'hero_whatsapp',
      cta_position: 'hero',
      cta_label: 'WhatsApp us',
      cta_variant: 'primary',
      vertical: 'trek',
      category: 'himalayan',
      page_type: 'trek_hub',
    },
  });

  assert.ok(event);
  assert.equal(event.eventType, 'conversion_cta_click');
  assert.equal(event.conversionSessionId, 'session-42');
  assert.equal(event.ctaId, 'hero_whatsapp');
  assert.equal(event.pagePath, '/treks/chakrata');
  assert.equal(event.pageType, 'trek_hub');
  assert.deepEqual(event.meta?.destination_path, '/treks/chakrata#pricing');
});

test('WhatsApp handoffs persist only a valid lead reference in the dedicated field', () => {
  const valid = toDurableConversionEvent({
    event: 'whatsapp_click',
    from: '/treks/chakrata',
    meta: { lead_reference: 'RT-261009-0042' },
  });
  assert.equal(valid?.eventType, 'whatsapp_handoff');
  assert.equal(valid?.leadReference, 'RT-261009-0042');

  const invalid = toDurableConversionEvent({
    event: 'whatsapp_click',
    from: '/treks/chakrata',
    meta: { lead_reference: 'not-a-reference' },
  });
  assert.equal(invalid?.leadReference, undefined);

  const unrelated = toDurableConversionEvent({
    event: 'cta_click',
    from: '/treks/chakrata',
    meta: { lead_reference: 'RT-261009-0042' },
  });
  assert.equal(unrelated?.leadReference, undefined);
});

function makeWhatsAppPersistenceDb(matchingLead?: { id: string; lead_reference: string }) {
  const queries: Array<{ text: string; values: unknown[] }> = [];
  const sql = ((strings: TemplateStringsArray, ...values: unknown[]) => {
    const text = strings.join(' ? ').replace(/\s+/g, ' ').trim();
    queries.push({ text, values });
    return Promise.resolve(text.startsWith('SELECT id, lead_reference FROM inquiries')
      ? matchingLead ? [matchingLead] : []
      : []);
  }) as unknown as ReturnType<typeof getDb>;
  return { sql, queries };
}

test('persisted WhatsApp handoffs link only to a lead whose reference exists', async () => {
  const leadReference = 'RT-261009-0042';
  const database = makeWhatsAppPersistenceDb({ id: 'saved-lead-id', lead_reference: leadReference });

  const result = await persistConversionEvent({
    eventType: 'whatsapp_handoff',
    leadReference,
    conversionSessionId: 'session-42',
    pagePath: '/treks/chakrata',
    meta: { lead_reference: leadReference },
  }, {
    databaseUrl: 'mock://test',
    expectedBranchId: null,
    getDb: () => database.sql,
  });

  const insert = database.queries.find((query) => query.text.startsWith('INSERT INTO conversion_events'));
  assert.equal(result, 'persisted');
  assert.ok(insert);
  assert.ok(insert.values.includes('saved-lead-id'));
  assert.ok(insert.values.includes(leadReference));
});

test('unknown WhatsApp lead references are persisted without false lead correlation', async () => {
  const leadReference = 'RT-261009-0042';
  const database = makeWhatsAppPersistenceDb();

  const result = await persistConversionEvent({
    eventType: 'whatsapp_handoff',
    leadReference,
    conversionSessionId: 'session-42',
    pagePath: '/treks/chakrata',
    meta: { lead_reference: leadReference, cta_id: 'success_whatsapp' },
  }, {
    databaseUrl: 'mock://test',
    expectedBranchId: null,
    getDb: () => database.sql,
  });

  const insert = database.queries.find((query) => query.text.startsWith('INSERT INTO conversion_events'));
  assert.equal(result, 'persisted');
  assert.ok(insert);
  assert.ok(!insert.values.includes(leadReference));
  assert.ok(!insert.values.includes('saved-lead-id'));
  assert.ok(insert.values.some((value) => typeof value === 'string'
    && value.includes('"cta_id":"success_whatsapp"')
    && !value.includes('lead_reference')));
});

test('conversion event metadata removes personal contact fields at every nesting level', () => {
  const event = toDurableConversionEvent({
    event: 'cta_click',
    from: '/contact',
    meta: {
      cta_label: 'Plan a retreat',
      product_name: 'Chakrata Retreat',
      email: 'asha@example.com',
      phoneNumber: '+91 9876543210',
      visitor: {
        firstName: 'Asha',
        message: 'I would like to book.',
        preference: 'Chakrata',
      },
      answers: [{ contactEmail: 'asha@example.com', duration: '5 days' }],
    },
  });

  assert.deepEqual(event?.meta, {
    cta_label: 'Plan a retreat',
    product_name: 'Chakrata Retreat',
    visitor: { preference: 'Chakrata' },
    answers: [{ duration: '5 days' }],
  });
});

test('capture lifecycle events map to their matching durable event names', () => {
  for (const eventName of [
    'lead_capture_open',
    'lead_capture_step_view',
    'lead_capture_step_complete',
    'lead_capture_abandon',
  ]) {
    assert.equal(
      toDurableConversionEvent({ event: eventName, from: '/retreats/chakrata' })?.eventType,
      eventName,
    );
  }
});

test('client form completion is not recorded as a persisted lead event', () => {
  assert.equal(
    toDurableConversionEvent({ event: 'form_submission', from: '/contact' })?.eventType,
    'form_submission',
  );
});

test('CTA view dedupe suppresses repeated events in the same window', () => {
  const first = shouldRecordCtaView({
    eventType: 'conversion_cta_view',
    conversionSessionId: 'session-dup',
    pagePath: '/retreats/rishikesh',
    ctaId: 'cta-1',
    ctaPosition: 'hero',
    vertical: 'yoga',
    category: 'retreat',
  });

  const second = shouldRecordCtaView({
    eventType: 'conversion_cta_view',
    conversionSessionId: 'session-dup',
    pagePath: '/retreats/rishikesh',
    ctaId: 'cta-1',
    ctaPosition: 'hero',
    vertical: 'yoga',
    category: 'retreat',
  });

  assert.equal(first, true);
  assert.equal(second, false);
});

test('normalizeConversionEvent rejects unsupported event names and sanitizes values', () => {
  const event = normalizeConversionEvent({
    eventType: 'not_real',
    pagePath: 'retreats/  ',
    ctaLabel: '   WhatsApp    ',
    meta: { some: ['value', 1, true] },
  } as never);

  assert.equal(event, null);
});
