import assert from 'node:assert/strict';
import test from 'node:test';
import { NextRequest } from 'next/server';

import { createInquirePostHandler } from './route';
import type { Inquiry } from '@/lib/inquiries';
import type { ConversionEvent } from '@/lib/conversion-events';
import { getYogaLeadTier } from '@/lib/lead-scoring';
import { RETREAT_PROGRAM_EVENTS } from '@/config/retreatProgramEvents';
import { ALL_DEPARTURES, getTrekDepartureId } from '@/config/departures';

function setup(overrides: {
  now?: () => number;
  insertInquiry?: (inquiry: Inquiry, score: number, tier: string, requiredEvents: ConversionEvent[]) => Promise<{
    status: 'inserted' | 'duplicate' | 'conflict';
    inquiryId: string;
    leadReference: string | null;
  }>;
  sendInquiryEmails?: (inquiry: Inquiry, tier: string, score: number, routing: string) => Promise<{ sent: boolean; error?: string }>;
  isRateLimited?: () => boolean;
  isGlobalRateLimited?: () => boolean;
  isBotUserAgent?: () => boolean;
} = {}) {
  const persisted: Array<{ inquiry: Inquiry; score: number; tier: string }> = [];
  const events: ConversionEvent[] = [];
  const sequence: string[] = [];
  const emails: Array<{ inquiry: Inquiry; tier: string; score: number; routing: string }> = [];
  const attemptedKeys: string[] = [];
  const seenKeys = new Map<string, { inquiryId: string; leadReference: string }>();
  const seenRequiredEvents = new Set<string>();

  const handler = createInquirePostHandler({
    insertInquiry: async (inquiry, score = 0, tier = 'unscored', requiredEvents = []) => {
      sequence.push('persist');
      attemptedKeys.push(inquiry.idempotencyKey || '');
      if (overrides.insertInquiry) return overrides.insertInquiry(inquiry, score, tier, requiredEvents);

      const key = inquiry.idempotencyKey || '';
      let record = seenKeys.get(key);
      const status = record ? 'duplicate' : 'inserted';
      if (!record) {
        persisted.push({ inquiry, score, tier });
        record = { inquiryId: `inquiry-${persisted.length}`, leadReference: 'RT-261008-0042' };
        seenKeys.set(key, record);
      }
      for (const event of requiredEvents) {
        const eventKey = `${record.inquiryId}:${event.eventType}`;
        if (!seenRequiredEvents.has(eventKey)) {
          sequence.push(`event:${event.eventType}`);
          events.push({ ...event, inquiryId: record.inquiryId, leadReference: record.leadReference });
          seenRequiredEvents.add(eventKey);
        }
      }
      return { status, ...record };
    },
    sendInquiryEmails: async (inquiry, tier = 'cold', score = 0, routing = '') => {
      sequence.push('notify');
      emails.push({ inquiry, tier, score, routing });
      if (overrides.sendInquiryEmails) return overrides.sendInquiryEmails(inquiry, tier, score, routing);
      return { sent: true };
    },
    logConversionEvent: async (event) => {
      sequence.push(`event:${event.eventType}`);
      events.push(event);
    },
    now: overrides.now ?? Date.now,
    isGlobalRateLimited: overrides.isGlobalRateLimited ?? (() => false),
    isRateLimited: overrides.isRateLimited ?? (() => false),
    isBotUserAgent: overrides.isBotUserAgent ?? (() => false),
  });

  const post = (body: unknown, ip = '192.0.2.10') => handler(new NextRequest('http://localhost/api/inquire', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  }));

  return { post, persisted, events, sequence, emails, attemptedKeys };
}

test('rejects missing and malformed phone numbers for every inquiry vertical', async () => {
  const api = setup();
  const missing = await api.post({ name: 'Asha Mehta', source: '/contact' });
  const malformed = await api.post({
    name: 'Asha Mehta',
    phone: 'call me maybe',
    vertical: 'trek',
    source: '/treks/brahmatal',
  });

  assert.equal(missing.status, 400);
  assert.equal((await missing.json()).code, 'validation_error');
  assert.equal(malformed.status, 400);
  assert.equal((await malformed.json()).code, 'validation_error');
  assert.equal(api.persisted.length, 0);
});

test('accepts a backward-compatible generic enquiry and maps its message', async () => {
  const api = setup();
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    message: 'Please share general information.',
    source: '/contact',
  });

  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.equal(api.persisted[0].inquiry.additionalRequest, 'Please share general information.');
  assert.equal(api.persisted[0].inquiry.pageType, 'contact');
  assert.equal(api.persisted[0].inquiry.firstUtmId, undefined);
  assert.equal(api.persisted[0].inquiry.lastUtmId, undefined);
  assert.equal(api.persisted[0].inquiry.firstTouchAt, undefined);
  assert.equal(api.persisted[0].inquiry.lastTouchAt, undefined);
});

test('reports a deterministic conflict when a submission token is reused for changed inquiry data', async () => {
  const api = setup({
    insertInquiry: async () => ({
      status: 'conflict',
      inquiryId: 'existing-inquiry',
      leadReference: 'RT-261008-0042',
    }),
  });
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    source: '/contact',
    submissionToken: '19d1821d-4c14-4ef1-8802-9eb522e19061',
  });
  const body = await response.json();

  assert.equal(response.status, 409);
  assert.equal(body.success, false);
  assert.equal(body.code, 'idempotency_conflict');
  assert.equal(body.leadReference, undefined);
});

test('maps utm_id and touch timestamps into the inquiry persistence payload', async () => {
  const api = setup();
  const firstTouchAt = '2026-10-09T08:00:00.000Z';
  const lastTouchAt = '2026-10-10T08:00:00.000Z';
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    source: '/retreats/chakrata',
    firstUtm: { utm_source: 'newsletter', utm_id: 'first-id' },
    lastUtm: { utm_source: 'google', utm_id: 'last-id' },
    firstTouchAt,
    lastTouchAt,
  });

  assert.equal(response.status, 200);
  assert.equal(api.persisted[0].inquiry.firstUtmSource, 'newsletter');
  assert.equal(api.persisted[0].inquiry.firstUtmId, 'first-id');
  assert.equal(api.persisted[0].inquiry.lastUtmSource, 'google');
  assert.equal(api.persisted[0].inquiry.lastUtmId, 'last-id');
  assert.equal(api.persisted[0].inquiry.firstTouchAt, firstTouchAt);
  assert.equal(api.persisted[0].inquiry.lastTouchAt, lastTouchAt);
});

test('accepts phone-only contact details and leaves email empty', async () => {
  const api = setup();
  const response = await api.post({ name: 'Asha Mehta', phone: '+91 9876543210' });

  assert.equal(response.status, 200);
  assert.equal(api.persisted[0].inquiry.phone, '+91 9876543210');
  assert.equal(api.persisted[0].inquiry.email, null);
});

test('accepts a valid optional email address', async () => {
  const api = setup();
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    email: 'asha@example.com',
  });

  assert.equal(response.status, 200);
  assert.equal(api.persisted[0].inquiry.email, 'asha@example.com');
});

test('uses authoritative catalog product data and server-computed score and tier', async () => {
  const api = setup();
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    productId: 'yoga-rishikesh-5-day',
    product: 'Forged product name',
    location: 'unregistered destination',
    vertical: 'art',
    score: 100,
    tier: 'hot',
    routing: 'forged',
    source: '/contact',
  });
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(api.persisted[0].inquiry.product, '5-Day Yoga Retreat in Rishikesh');
  assert.equal(api.persisted[0].inquiry.productId, 'yoga-rishikesh-5-day');
  assert.equal(api.persisted[0].inquiry.location, 'Rishikesh');
  assert.equal(api.persisted[0].inquiry.vertical, 'yoga');
  assert.equal(api.persisted[0].score, 35);
  assert.equal(api.persisted[0].tier, 'nurture');
  assert.equal(api.persisted[0].inquiry.salesRoute, 'direct_product');
  assert.equal(body.score, undefined);
  assert.equal(body.tier, undefined);
  assert.equal(body.routing, undefined);
});

test('uses the catalog Yoga departure date instead of client-provided departure data', async () => {
  const today = new Date().toISOString().slice(0, 10);
  const departure = RETREAT_PROGRAM_EVENTS.find((event) =>
    event.productId === 'yoga-rishikesh-5-day' && event.startDate >= today,
  );
  assert.ok(departure?.productId);

  const api = setup();
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    productId: departure.productId,
    departureId: departure.slug,
    departureDate: '9999-12-31',
    preferredDate: '9999-12-31',
  });

  assert.equal(response.status, 200);
  assert.equal(api.persisted[0].inquiry.departureId, departure.slug);
  assert.equal(api.persisted[0].inquiry.departureDate, departure.startDate);
  assert.equal(api.persisted[0].inquiry.preferredDate, departure.startDate);
});

test('resolves a supplied Trek departure from the authoritative departures registry', async (t) => {
  const today = new Date().toISOString().slice(0, 10);
  const selected = ALL_DEPARTURES.flatMap((trek) =>
    trek.departures
      .filter((departure) => departure.startDate >= today && departure.status !== 'sold-out')
      .map((departure) => ({ trek, departure })),
  )[0];
  if (!selected) {
    t.skip('No current, non-sold-out Trek departure is published in the registry.');
    return;
  }

  const api = setup();
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    productId: selected.trek.slug,
    departureId: getTrekDepartureId(selected.trek.slug, selected.departure.startDate),
    departureDate: '9999-12-31',
    preferredDate: '9999-12-31',
  });

  assert.equal(response.status, 200);
  assert.equal(api.persisted[0].inquiry.productId, selected.trek.slug);
  assert.equal(api.persisted[0].inquiry.departureId, getTrekDepartureId(selected.trek.slug, selected.departure.startDate));
  assert.equal(api.persisted[0].inquiry.departureDate, selected.departure.startDate);
  assert.equal(api.persisted[0].inquiry.preferredDate, selected.departure.startDate);
});

test('does not treat a client month or stale Trek departure ID as a verified departure', async () => {
  const trek = ALL_DEPARTURES[0];
  const api = setup();
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    productId: trek.slug,
    departureId: getTrekDepartureId(trek.slug, '1999-01-01'),
    departureDate: '1999-01-01',
    month: 'October',
  });

  assert.equal(response.status, 200);
  assert.equal(api.persisted[0].inquiry.productId, trek.slug);
  assert.equal(api.persisted[0].inquiry.departureId, '');
  assert.equal(api.persisted[0].inquiry.departureDate, null);
  assert.equal(api.persisted[0].inquiry.month, 'October');
});

test('resolves Art event context from the published registry and persists stable attribution', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: new Date('2026-10-01T00:00:00Z') });
  t.after(() => t.mock.timers.reset());
  const today = new Date().toISOString().slice(0, 10);
  const departure = RETREAT_PROGRAM_EVENTS.find((event) =>
    ['art-and-creative', 'trek-and-paint', 'weekend-art-retreat'].includes(event.serviceSlug) &&
    event.endDate >= today,
  );
  if (!departure) {
    t.skip('No currently active Art event is published in the registry.');
    return;
  }

  const api = setup();
  const request = {
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    age: 34,
    productId: departure.serviceSlug,
    product: 'Forged Art Product',
    departureId: departure.slug,
    departureDate: '9999-12-31',
    preferredDate: '9999-12-31',
    duration: '999 days',
    ...(departure.locationName !== 'TBA' ? { location: 'Rishikesh' } : {}),
    groupSize: '3–4',
    vertical: 'art',
    category: departure.serviceSlug,
    source: `/${departure.slug}`,
    pageType: 'art_product',
    ctaId: `art_fixed_departure_${departure.slug}_book`,
    ctaPosition: 'card',
    ctaLabel: 'Book This Date',
    conversionSessionId: 'art-conversion-session',
    firstUtm: { utm_source: 'newsletter' },
    lastUtm: { utm_source: 'google' },
  };
  const response = await api.post(request);
  const duplicateResponse = await api.post(request);

  assert.equal(response.status, 200);
  assert.equal(duplicateResponse.status, 200);
  assert.equal((await duplicateResponse.json()).duplicate, true);
  assert.equal(api.persisted.length, 1);
  assert.equal(api.events.filter((event) => event.eventType === 'lead_submitted').length, 1);
  const inquiry = api.persisted[0].inquiry;
  assert.equal(inquiry.productId, departure.serviceSlug);
  assert.notEqual(inquiry.product, 'Forged Art Product');
  assert.equal(inquiry.departureId, departure.slug);
  assert.equal(inquiry.departureDate, departure.startDate);
  assert.equal(inquiry.preferredDate, departure.startDate);
  assert.equal(inquiry.duration, `${departure.durationDays} days`);
  assert.equal(inquiry.vertical, 'art');
  assert.equal(inquiry.category, departure.serviceSlug);
  assert.equal(inquiry.pageType, 'art_product');
  assert.equal(inquiry.ctaId, `art_fixed_departure_${departure.slug}_book`);
  assert.equal(inquiry.ctaPosition, 'card');
  assert.equal(inquiry.conversionSessionId, 'art-conversion-session');
  assert.equal(inquiry.firstUtmSource, 'newsletter');
  assert.equal(inquiry.lastUtmSource, 'google');
  assert.equal(inquiry.age, 34);
  assert.equal(inquiry.groupSize, '3–4');
  assert.equal(
    inquiry.destination,
    departure.locationName === 'TBA' ? null : departure.locationName,
  );

  const submitted = api.events.find((event) => event.eventType === 'lead_submitted');
  assert.equal(submitted?.ctaId, `art_fixed_departure_${departure.slug}_book`);
  assert.equal(submitted?.ctaPosition, 'card');
  assert.equal(submitted?.meta?.departure_id, departure.slug);
});

test('keeps generic Art enquiries generic when no verified event is supplied', async () => {
  const api = setup();
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    productId: 'unverified-art-product',
    product: 'Unverified Art Product',
    departureId: 'unpublished-art-event',
    departureDate: '9999-12-31',
    vertical: 'art',
    category: 'art-and-creative',
    source: '/retreats/art',
    ctaId: 'art_hub_primary_inquiry',
    ctaPosition: 'primary',
  });

  assert.equal(response.status, 200);
  const inquiry = api.persisted[0].inquiry;
  assert.equal(inquiry.pageType, 'art_hub');
  assert.equal(inquiry.vertical, 'art');
  assert.equal(inquiry.category, 'art-and-creative');
  assert.equal(inquiry.product, '');
  assert.equal(inquiry.productId, '');
  assert.equal(inquiry.departureId, '');
  assert.equal(inquiry.departureDate, null);
});

test('resolves an Art service product without inventing a departure or location', async () => {
  const api = setup();
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    productId: 'art-and-creative',
    product: 'Untrusted Product Name',
    departureId: '',
    departureDate: '9999-12-31',
    vertical: 'art',
    category: 'art-and-creative',
    source: '/retreats/journeys/art-and-creative',
    ctaId: 'art_journey_art_and_creative_primary_inquiry',
    ctaPosition: 'primary',
  });

  assert.equal(response.status, 200);
  const inquiry = api.persisted[0].inquiry;
  assert.equal(inquiry.pageType, 'art_product');
  assert.equal(inquiry.vertical, 'art');
  assert.equal(inquiry.category, 'art-and-creative');
  assert.equal(inquiry.productId, 'art-and-creative');
  assert.equal(inquiry.product, 'Creative Healing Retreat');
  assert.equal(inquiry.departureId, '');
  assert.equal(inquiry.departureDate, null);
  assert.equal(inquiry.destination, null);
});

test('drops invalid product and destination context but still saves a generic enquiry', async () => {
  const api = setup();
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    productId: 'stale-product',
    product: 'Untrusted name',
    destination: 'Unregistered place',
    source: '/contact',
  });

  assert.equal(response.status, 200);
  assert.equal(api.persisted[0].inquiry.productId, '');
  assert.equal(api.persisted[0].inquiry.product, '');
  assert.equal(api.persisted[0].inquiry.destination, null);
  assert.equal(api.persisted[0].inquiry.pageType, 'contact');
});

test('allows a valid but unknown page context', async () => {
  const api = setup();
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    source: '/unknown-route',
    pageTitle: 'Kedarkantha Trek',
  });

  assert.equal(response.status, 200);
  assert.equal(api.persisted[0].inquiry.pageType, 'other');
  assert.equal(api.persisted[0].inquiry.productId, '');
  assert.equal(api.persisted[0].inquiry.pageTitle, 'Kedarkantha Trek');
});

test('uses canonical lead-tier boundaries', () => {
  assert.equal(getYogaLeadTier(75), 'hot');
  assert.equal(getYogaLeadTier(74), 'warm');
  assert.equal(getYogaLeadTier(50), 'warm');
  assert.equal(getYogaLeadTier(49), 'nurture');
  assert.equal(getYogaLeadTier(25), 'nurture');
  assert.equal(getYogaLeadTier(24), 'early');
});

test('applies the canonical scoring rules and hot tier on the server', async () => {
  const api = setup();
  await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    productId: 'yoga-rishikesh-5-day',
    planningHorizon: 'This month',
    bookingReadiness: 'Ready to book',
    groupSize: '3–5',
    budget: '₹15–30k',
  });

  assert.equal(api.persisted[0].score, 90);
  assert.equal(api.persisted[0].tier, 'hot');
  assert.equal(api.persisted[0].inquiry.canonicalLeadTier, 'hot');
});

test('scores 6–10 people as an eight-point group opportunity', async () => {
  const api = setup();
  await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    groupSize: '6–10',
  });

  assert.equal(api.persisted[0].score, 13);
});

test('routes verified products deterministically without exposing internal routing', async () => {
  const api = setup();
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    productId: 'yoga-ttc',
    yogaInterest: 'Yoga TTC',
  });
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(api.emails[0].routing, 'ttc');
  assert.equal(api.persisted[0].inquiry.yogaSalesRoute, 'TTC_SALES');
  assert.equal(body.routing, undefined);
  assert.equal(body.yogaSalesRoute, undefined);
});

test('uses the database-generated lead reference for response, event, and notification', async () => {
  const api = setup();
  const response = await api.post({ name: 'Asha Mehta', phone: '+91 9876543210' });
  const body = await response.json();
  const leadEvent = api.events.find((event) => event.eventType === 'lead_submitted');

  assert.equal(body.leadReference, 'RT-261008-0042');
  assert.equal(leadEvent?.leadReference, 'RT-261008-0042');
  assert.equal(leadEvent?.inquiryId, 'inquiry-1');
  assert.equal(api.emails[0].inquiry.leadReference, 'RT-261008-0042');
});

test('persists Yoga finder selections with stable CTA and first/last-touch context', async () => {
  const api = setup();
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    productId: 'yoga-rishikesh-5-day',
    yogaInterest: 'Yoga Retreat',
    yogaExperience: 'Beginner',
    location: 'Rishikesh',
    duration: '5 days',
    month: 'specific',
    planningHorizon: '31–90 days',
    groupSize: '3–5',
    budget: '₹30–60k',
    bookingReadiness: 'Likely',
    source: '/yoga-retreats',
    category: 'yoga-finder',
    conversionSessionId: 'yoga-finder-session',
    ctaId: 'yoga_finder_structured_inquiry',
    ctaLabel: 'Send structured enquiry',
    ctaPosition: 'primary',
    firstUtm: { utm_source: 'newsletter' },
    lastUtm: { utm_source: 'google', utm_medium: 'cpc' },
  });

  assert.equal(response.status, 200);
  const inquiry = api.persisted[0].inquiry;
  assert.equal(inquiry.productId, 'yoga-rishikesh-5-day');
  assert.equal(inquiry.product, '5-Day Yoga Retreat in Rishikesh');
  assert.equal(inquiry.yogaInterest, 'Yoga Retreat');
  assert.equal(inquiry.yogaExperience, 'Beginner');
  assert.equal(inquiry.location, 'Rishikesh');
  assert.equal(inquiry.duration, '5 days');
  assert.equal(inquiry.month, 'specific');
  assert.equal(inquiry.planningHorizon, '31–90 days');
  assert.equal(inquiry.groupSize, '3–5');
  assert.equal(inquiry.budget, '₹30–60k');
  assert.equal(inquiry.bookingReadiness, 'Likely');
  assert.equal(inquiry.ctaId, 'yoga_finder_structured_inquiry');
  assert.equal(inquiry.ctaPosition, 'primary');
  assert.equal(inquiry.conversionSessionId, 'yoga-finder-session');
  assert.equal(inquiry.firstUtmSource, 'newsletter');
  assert.equal(inquiry.lastUtmSource, 'google');
  assert.equal(inquiry.lastUtmMedium, 'cpc');
});

test('keeps generic Yoga finder enquiries Yoga-classified without inventing a product or departure', async () => {
  const api = setup();
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    source: '/find-your-retreat?type=yoga',
    vertical: 'yoga',
    category: 'yoga-finder',
    yogaInterest: 'Not sure',
    location: '',
    duration: 'Flexible',
    month: 'flexible',
    planningHorizon: '91–180 days',
    ctaId: 'find_your_retreat_help_me_choose_inquiry',
    ctaPosition: 'finder_result',
  });

  assert.equal(response.status, 200);
  assert.equal(api.persisted[0].inquiry.pageType, 'finder');
  assert.equal(api.persisted[0].inquiry.vertical, 'yoga');
  assert.equal(api.persisted[0].inquiry.category, 'yoga-finder');
  assert.equal(api.persisted[0].inquiry.productId, '');
  assert.equal(api.persisted[0].inquiry.product, '');
  assert.equal(api.persisted[0].inquiry.departureId, '');
  assert.equal(api.persisted[0].inquiry.yogaInterest, 'Not sure');
  assert.equal(api.persisted[0].inquiry.duration, 'Flexible');
  assert.equal(api.persisted[0].inquiry.month, 'flexible');
});

test('legacy clients without tokens retain the ten-minute deduplication fallback', async () => {
  let now = Date.parse('2026-10-10T05:00:00.000Z');
  const api = setup({ now: () => now });
  const request = { name: 'Asha Mehta', phone: '+91 9876543210', source: '/contact' };
  const firstResponse = await api.post(request, '192.0.2.10');
  const secondResponse = await api.post(request, '192.0.2.11');
  now += 10 * 60 * 1000;
  const laterResponse = await api.post(request, '192.0.2.10');
  const firstBody = await firstResponse.json();
  const secondBody = await secondResponse.json();
  const laterBody = await laterResponse.json();

  assert.equal(firstBody.success, true);
  assert.equal(secondBody.success, true);
  assert.equal(secondBody.duplicate, true);
  assert.equal(laterBody.success, true);
  assert.equal(laterBody.duplicate, undefined);
  assert.equal(api.attemptedKeys[0], api.attemptedKeys[1]);
  assert.notEqual(api.attemptedKeys[0], api.attemptedKeys[2]);
  assert.equal(api.persisted.length, 2);
  assert.equal(api.events.filter((event) => event.eventType === 'lead_submitted').length, 2);
});

test('modern client retries reuse a stable token across the legacy time boundary', async () => {
  let now = Date.parse('2026-10-10T05:00:00.000Z');
  const api = setup({ now: () => now });
  const request = {
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    source: '/contact',
    submissionToken: '19d1821d-4c14-4ef1-8802-9eb522e19061',
  };
  const firstResponse = await api.post(request);
  now += 30 * 60 * 1000;
  const retryResponse = await api.post(request);
  const firstBody = await firstResponse.json();
  const retryBody = await retryResponse.json();

  assert.equal(firstBody.success, true);
  assert.equal(retryBody.duplicate, true);
  assert.equal(retryBody.leadReference, 'RT-261008-0042');
  assert.equal(api.attemptedKeys[0], api.attemptedKeys[1]);
  assert.equal(api.persisted.length, 1);
});

test('new intentional submissions with distinct tokens create distinct inquiries', async () => {
  const api = setup();
  const request = { name: 'Asha Mehta', phone: '+91 9876543210', source: '/contact' };
  const first = await api.post({ ...request, submissionToken: '19d1821d-4c14-4ef1-8802-9eb522e19061' });
  const second = await api.post({ ...request, submissionToken: 'b1f24eae-8615-41b2-ae53-b1d165361702' });

  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.notEqual(api.attemptedKeys[0], api.attemptedKeys[1]);
  assert.equal(api.persisted.length, 2);
});

test('rejects a malformed client submission token', async () => {
  const api = setup();
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    submissionToken: 'not-a-uuid',
  });
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.code, 'validation_error');
  assert.equal(api.persisted.length, 0);
});

test('concurrent duplicate requests with the same client token share one inquiry', async () => {
  const api = setup();
  const request = {
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    source: '/contact',
    submissionToken: '19d1821d-4c14-4ef1-8802-9eb522e19061',
  };
  const [firstResponse, secondResponse] = await Promise.all([
    api.post(request),
    api.post(request),
  ]);
  const bodies = await Promise.all([firstResponse.json(), secondResponse.json()]);

  assert.ok(bodies.every((body) => body.success === true));
  assert.equal(bodies.filter((body) => body.duplicate === true).length, 1);
  assert.ok(bodies.every((body) => body.leadReference === 'RT-261008-0042'));
  assert.equal(api.persisted.length, 1);
  assert.equal(api.events.filter((event) => event.eventType === 'lead_submitted').length, 1);
});

test('required submission events are committed with a new inquiry and not duplicated by concurrent retries', async () => {
  const api = setup();
  const request = {
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    source: '/contact',
    submissionToken: '19d1821d-4c14-4ef1-8802-9eb522e19061',
  };
  const responses = await Promise.all([api.post(request), api.post(request)]);
  const bodies = await Promise.all(responses.map((response) => response.json()));

  assert.ok(bodies.every((body) => body.success === true));
  assert.equal(api.persisted.length, 1);
  assert.equal(api.events.filter((event) => event.eventType === 'lead_submitted').length, 1);
  assert.equal(api.events.filter((event) => event.eventType === 'inquiry_submitted').length, 1);
});

test('required-event transaction failure reports persistence failure and same-token retry recovers atomically', async () => {
  let failOnce = true;
  const inquiries = new Map<string, { inquiryId: string; leadReference: string }>();
  const requiredEvents = new Set<string>();
  const api = setup({
    insertInquiry: async (inquiry, _score, _tier, events) => {
      const key = inquiry.idempotencyKey || '';
      if (failOnce) {
        failOnce = false;
        throw new Error('required event insert failed; transaction rolled back');
      }
      const existing = inquiries.get(key);
      const record = existing ?? {
        inquiryId: `inquiry-${inquiries.size + 1}`,
        leadReference: 'RT-261008-0042',
      };
      for (const event of events) requiredEvents.add(`${record.inquiryId}:${event.eventType}`);
      inquiries.set(key, record);
      return { status: existing ? 'duplicate' : 'inserted', ...record };
    },
  });
  const request = {
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    source: '/contact',
    submissionToken: '19d1821d-4c14-4ef1-8802-9eb522e19061',
  };

  const failed = await api.post(request);
  assert.equal(failed.status, 500);
  assert.equal((await failed.json()).success, false);
  assert.equal(inquiries.size, 0);
  assert.equal(requiredEvents.size, 0);

  const retried = await api.post(request);
  assert.equal(retried.status, 200);
  assert.equal(inquiries.size, 1);
  assert.equal(requiredEvents.size, 2);
});

test('a duplicate retry repairs absent required events without creating another inquiry', async () => {
  const key = 'client:19d1821d-4c14-4ef1-8802-9eb522e19061';
  const record = { inquiryId: 'existing-inquiry', leadReference: 'RT-261008-0042' };
  const eventKeys = new Set<string>();
  const api = setup({
    insertInquiry: async (_inquiry, _score, _tier, requiredEvents) => {
      for (const event of requiredEvents) eventKeys.add(`${record.inquiryId}:${event.eventType}`);
      return { status: 'duplicate', ...record };
    },
  });
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    source: '/contact',
    submissionToken: key.slice('client:'.length),
  });
  const body = await response.json();

  assert.equal(body.success, true);
  assert.equal(body.duplicate, true);
  assert.equal(body.leadReference, record.leadReference);
  assert.equal(api.persisted.length, 0);
  assert.equal(eventKeys.size, 2);
});

test('returns a server error without reporting success or emitting lead_submitted if persistence fails', async () => {
  const api = setup({
    insertInquiry: async () => {
      throw new Error('database unavailable');
    },
  });
  const response = await api.post({ name: 'Asha Mehta', phone: '+91 9876543210' });
  const body = await response.json();

  assert.equal(response.status, 500);
  assert.equal(body.success, false);
  assert.equal(body.code, 'persistence_error');
  assert.equal(body.error.includes('database unavailable'), false);
  assert.equal(api.events.some((event) => event.eventType === 'lead_submitted'), false);
});

test('persists the lead before recording lead_submitted', async () => {
  const api = setup();
  await api.post({ name: 'Asha Mehta', phone: '+91 9876543210' });

  assert.ok(api.sequence.indexOf('persist') < api.sequence.indexOf('event:lead_submitted'));
});

test('notification failure does not fail an already-persisted enquiry', async () => {
  const api = setup({
    sendInquiryEmails: async () => {
      throw new Error('mail provider unavailable');
    },
  });
  const response = await api.post({ name: 'Asha Mehta', phone: '+91 9876543210' });
  const body = await response.json();

  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.equal(api.events.some((event) => event.eventType === 'lead_submitted'), true);
});

test('returns a distinguishable validation response for invalid input', async () => {
  const api = setup();
  const response = await api.post({ name: 'A', phone: '' });
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.success, false);
  assert.equal(body.code, 'validation_error');
  assert.equal(api.persisted.length, 0);
});

test('returns a distinguishable spam rejection for the existing honeypot', async () => {
  const api = setup();
  const response = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    website: 'bot-filled-field',
  });
  const body = await response.json();

  assert.equal(response.status, 403);
  assert.equal(body.success, false);
  assert.equal(body.code, 'spam_rejected');
  assert.equal(api.persisted.length, 0);
});

test('rejects submissions from known bot user agents without persisting', async () => {
  const api = setup({ isBotUserAgent: () => true });
  const response = await api.post({ name: 'Asha Mehta', phone: '+91 9876543210' });
  const body = await response.json();

  assert.equal(response.status, 403);
  assert.equal(body.success, false);
  assert.equal(body.code, 'spam_rejected');
  assert.equal(api.persisted.length, 0);
  await new Promise((resolve) => setTimeout(resolve, 0));
  const spamEvent = api.events.find((event) => event.eventType === 'inquiry_spam_blocked');
  assert.equal(spamEvent?.meta?.reason, 'bot_ua');
});

test('rejects submissions that arrive faster than a human can fill the form', async () => {
  const api = setup();
  const loadedAt = Date.now();
  const tooFast = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    _t: String(loadedAt),
  });
  const tooFastBody = await tooFast.json();

  assert.equal(tooFast.status, 403);
  assert.equal(tooFastBody.success, false);
  assert.equal(tooFastBody.code, 'spam_rejected');
  assert.equal(api.persisted.length, 0);
  await new Promise((resolve) => setTimeout(resolve, 0));
  const spamEvent = api.events.find((event) => event.eventType === 'inquiry_spam_blocked');
  assert.equal(spamEvent?.meta?.reason, 'too_fast');

  const patient = await api.post({
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    _t: String(loadedAt - 10_000),
  });
  assert.equal(patient.status, 200);
  assert.equal((await patient.json()).success, true);
  assert.equal(api.persisted.length, 1);
});

test('returns a rate-limited response when the per-IP window is exhausted', async () => {
  const api = setup({ isRateLimited: () => true });
  const response = await api.post({ name: 'Asha Mehta', phone: '+91 9876543210' });
  const body = await response.json();

  assert.equal(response.status, 429);
  assert.equal(body.success, false);
  assert.equal(body.code, 'rate_limited');
  assert.equal(api.persisted.length, 0);
  assert.equal(api.emails.length, 0);
  await new Promise((resolve) => setTimeout(resolve, 0));
  const spamEvent = api.events.find((event) => event.eventType === 'inquiry_spam_blocked');
  assert.equal(spamEvent?.meta?.reason, 'rate_limit');
});

test('returns a rate-limited response when the shared global cap is reached', async () => {
  const api = setup({ isGlobalRateLimited: () => true });
  const response = await api.post({ name: 'Asha Mehta', phone: '+91 9876543210' });
  const body = await response.json();

  assert.equal(response.status, 429);
  assert.equal(body.success, false);
  assert.equal(body.code, 'rate_limited');
  assert.equal(api.persisted.length, 0);
});
