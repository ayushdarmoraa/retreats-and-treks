import assert from 'node:assert/strict';
import test from 'node:test';

import {
  normalizeConversionEvent,
  shouldRecordCtaView,
  toDurableConversionEvent,
} from './conversion-events';

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
