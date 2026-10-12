import assert from 'node:assert/strict';
import test from 'node:test';

import {
  canonicalPageTypeFromPath,
  normalizeCtaPosition,
  normalizePageType,
  isValidConversionSessionId,
  readConversionSessionId,
  resolveConversionContext,
} from './conversion-foundation';
import { buildWhatsAppMessage, buildWhatsAppUrl } from './whatsapp';
import { RETREAT_PROGRAM_EVENTS } from '@/config/retreatProgramEvents';

test('complete conversion context resolves expected shape', () => {
  const context = resolveConversionContext({
    pagePath: '/yoga-retreat-rishikesh',
    pageType: 'yoga_product',
    ctaId: 'yoga_rishikesh_5day_hero_whatsapp',
    ctaPosition: 'hero',
    ctaLabel: 'WhatsApp us',
    productName: '5 Day Yoga Retreat in Rishikesh',
    locationName: 'Rishikesh',
    duration: '5 days',
    departureDate: '2026-10-15',
    attribution: {
      conversionSessionId: 'session-123',
      firstUtm: { utm_source: 'google' },
      lastUtm: { utm_source: 'google', utm_medium: 'cpc' },
    },
  });

  assert.equal(context.page.type, 'yoga_product');
  assert.equal(context.cta.position, 'hero');
  assert.equal(context.cta.id, 'yoga_rishikesh_5day_hero_whatsapp');
  assert.equal(context.product.name, '5 Day Yoga Retreat in Rishikesh');
  assert.equal(context.location.name, 'Rishikesh');
  assert.equal(context.departure.date, '2026-10-15');
  assert.equal(context.attribution.conversionSessionId, 'session-123');
  assert.equal(context.attribution.firstUtm?.utm_source, 'google');
  assert.equal(context.attribution.lastUtm?.utm_medium, 'cpc');
});

test('unknown page types fall back safely to other', () => {
  assert.equal(canonicalPageTypeFromPath('/not-real-page'), 'other');
  assert.equal(canonicalPageTypeFromPath('/find-your-retreat'), 'finder');
  assert.equal(normalizePageType('not-real-page'), 'other');
  assert.equal(normalizeCtaPosition('some-random-position'), 'other');
});

test('comparison and blog routes resolve to their canonical page types', () => {
  assert.equal(canonicalPageTypeFromPath('/compare/retreat-a-vs-retreat-b'), 'comparison');
  assert.equal(canonicalPageTypeFromPath('/retreat-vs-therapy'), 'comparison');
  assert.equal(canonicalPageTypeFromPath('/vipassana-vs-meditation-retreat'), 'comparison');
  assert.equal(canonicalPageTypeFromPath('/blog/how-to-choose-a-retreat'), 'blog');
});

test('specific route families resolve before broad hub and content patterns', () => {
  const cases: Array<[string, string]> = [
    ['/yoga-retreats', 'yoga_hub'],
    ['/retreat-programs', 'programme'],
    ['/retreat-programmes', 'programme'],
    ['/retreat-calendar', 'calendar'],
    ['/facilitators/alex', 'facilitator'],
    ['/retreats/yoga-retreats', 'yoga_hub'],
    ['/retreats/programs/summer', 'programme'],
    ['/retreats/calendar/2026', 'calendar'],
    ['/retreats/journeys/yoga-and-movement', 'journey'],
    ['/retreats/art/locations/chakrata', 'art_location'],
  ];

  for (const [path, expected] of cases) {
    assert.equal(canonicalPageTypeFromPath(path), expected, path);
  }
  assert.equal(canonicalPageTypeFromPath('/unknown/retreat-programs'), 'other');
});

test('Trek product routes resolve before the broad trek hub matcher', () => {
  assert.equal(canonicalPageTypeFromPath('/treks'), 'trek_hub');
  assert.equal(canonicalPageTypeFromPath('/treks/bedni-bugyal'), 'trek_hub');
  assert.equal(canonicalPageTypeFromPath('/treks/location/uttarakhand/bedni-bugyal'), 'trek_product');
  assert.equal(canonicalPageTypeFromPath('/treks/brahmatal/november'), 'trek_departure');
  assert.equal(canonicalPageTypeFromPath('/treks/brahmatal/departures'), 'trek_departure');
  assert.equal(canonicalPageTypeFromPath('/treks/best-treks-in-uttarakhand/beginner'), 'trek_hub');
  assert.equal(canonicalPageTypeFromPath('/treks/brahmatal-vs-kuari-pass'), 'comparison');
  assert.equal(canonicalPageTypeFromPath('/unknown/unregistered'), 'other');
  assert.equal(canonicalPageTypeFromPath('/treks/unregistered/unknown'), 'other');
});

test('journey and nested retreat product routes resolve ahead of the retreat hub', () => {
  assert.equal(canonicalPageTypeFromPath('/retreats/journeys/yoga-and-movement'), 'journey');
  assert.equal(canonicalPageTypeFromPath('/retreats/sankri/meditation-retreat'), 'retreat_product');
  assert.equal(canonicalPageTypeFromPath('/retreats/yoga-retreat-rishikesh'), 'yoga_product');
  assert.equal(canonicalPageTypeFromPath('/retreats/sankri/yoga-retreat'), 'yoga_product');
  assert.equal(
    resolveConversionContext({
      pagePath: '/retreats/chakrata',
      pageType: 'retreat_location',
    }).page.type,
    'retreat_location',
  );
});

test('context precedence keeps authoritative registry ahead of route and CTA override', () => {
  const context = resolveConversionContext({
    pagePath: '/treks/bedni-bugyal',
    pageType: 'home',
    ctaPosition: 'floating',
  });

  assert.equal(context.page.type, 'trek_hub');
  assert.equal(context.cta.position, 'floating');
});

test('server-generated session ids are isolated between anonymous requests', () => {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Reflect.deleteProperty(globalThis, 'window');
  try {
    const first = readConversionSessionId();
    const second = readConversionSessionId();
    assert.notEqual(first, second);
    assert.ok(isValidConversionSessionId(first));
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, 'window', previousWindow);
  }
});

test('valid browser session ids are retained and invalid ids are replaced', () => {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  let stored = 'session-123';
  const sessionStorage = {
    getItem: () => stored,
    setItem: (_key: string, value: string) => { stored = value; },
  };
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { sessionStorage },
  });
  try {
    assert.equal(readConversionSessionId(), 'session-123');
    stored = '';
    const generatedFirst = readConversionSessionId();
    assert.equal(readConversionSessionId(), generatedFirst);
    assert.equal(stored, generatedFirst);
    assert.equal(isValidConversionSessionId('invalid session'), false);
    stored = 'invalid session';
    const replacement = readConversionSessionId();
    assert.notEqual(replacement, 'invalid session');
    assert.equal(stored, replacement);
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, 'window', previousWindow);
    else Reflect.deleteProperty(globalThis, 'window');
  }
});

test('valid payload session ids are preserved and invalid values are not trusted', () => {
  const valid = resolveConversionContext({
    pagePath: '/retreats/chakrata',
    conversionSessionId: 'session-123',
  });
  assert.equal(valid.attribution.conversionSessionId, 'session-123');

  const invalid = resolveConversionContext({
    pagePath: '/retreats/chakrata',
    conversionSessionId: 'not a valid session',
    attribution: { conversionSessionId: 'also invalid' },
  });
  assert.notEqual(invalid.attribution.conversionSessionId, 'not a valid session');
  assert.notEqual(invalid.attribution.conversionSessionId, 'also invalid');
});

test('CTA context uses a stable fallback identity when no explicit ID is supplied', () => {
  const context = resolveConversionContext({ pagePath: '/retreats/chakrata', ctaPosition: 'hero' });
  assert.equal(context.cta.id, 'cta_retreats_chakrata_hero_general_inquiry');
});

test('CTA identity remains stable when marketing copy changes', () => {
  const first = resolveConversionContext({
    pagePath: '/retreats/chakrata',
    ctaPosition: 'hero',
    category: 'meditation-retreat',
    ctaLabel: 'Ask about availability',
  });
  const second = resolveConversionContext({
    pagePath: '/retreats/chakrata',
    ctaPosition: 'hero',
    category: 'meditation-retreat',
    ctaLabel: 'Book a retreat',
  });

  assert.equal(first.cta.id, 'cta_retreats_chakrata_hero_meditation_retreat_inquiry');
  assert.equal(first.cta.id, second.cta.id);
});

test('WhatsApp builder uses an honest generic message when context is unknown', () => {
  const message = buildWhatsAppMessage({ context: { pagePath: '/unknown-route' } });
  assert.match(message, /interested in planning a retreat/i);
  assert.doesNotMatch(message, /your offering|your destination|suitable option|suitable date/i);
});

test('malformed utm values are ignored without throwing', () => {
  const context = resolveConversionContext({
    pagePath: '/retreats/chakrata',
    attribution: {
      conversionSessionId: 'session-456',
      firstUtm: { utm_source: '   ', utm_medium: 'paid social', utm_id: '   ' },
      lastUtm: { utm_source: 'google', utm_medium: '   ' },
    },
  });

  assert.deepEqual(context.attribution.firstUtm, { utm_medium: 'paid social' });
  assert.equal(context.attribution.lastUtm?.utm_source, 'google');
});

test('whatsapp builder uses the canonical number and excludes internal analytics fields', () => {
  const message = buildWhatsAppMessage({
    context: {
      pagePath: '/yoga-retreats',
      productName: 'Yoga Retreat',
      locationName: 'Rishikesh',
      duration: '7 days',
      departureDate: '2026-11-01',
      ctaId: 'yoga_rishikesh_hero_whatsapp',
      ctaPosition: 'hero',
      attribution: { conversionSessionId: 'session-789', firstUtm: { utm_source: 'google' } },
    },
  });

  assert.match(message, /Yoga Retreat/i);
  assert.match(message, /Rishikesh/i);
  assert.doesNotMatch(message, /utm_source/i);
  assert.doesNotMatch(message, /lead score/i);

  const url = buildWhatsAppUrl({
    context: {
      pagePath: '/retreats/sankri',
      productName: 'Custom Yoga Retreat',
      locationName: 'Sankri',
      duration: '3 days',
    },
  });

  assert.match(url, /wa\.me\/919760446101/);
  assert.match(url, /Custom%20Yoga%20Retreat/);
});

test('Yoga WhatsApp handoff retains selected product and departure without exposing attribution', () => {
  const context = resolveConversionContext({
    pagePath: '/retreats/yoga-retreat-rishikesh',
    vertical: 'yoga',
    category: 'yoga-retreats-rishikesh',
    ctaId: 'yoga_departure_november_whatsapp',
    ctaPosition: 'calendar',
    ctaLabel: 'Ask on WhatsApp',
    productId: 'yoga-rishikesh-5-day',
    productName: '5-Day Yoga Retreat in Rishikesh',
    locationName: 'Rishikesh',
    duration: '5 days',
    departureId: 'yoga-rishikesh-5-day-2026-11-09',
    departureDate: '2026-11-09',
    conversionSessionId: 'private-session-id',
    attribution: {
      firstUtm: { utm_source: 'newsletter' },
      lastUtm: { utm_source: 'google' },
    },
  });
  const url = buildWhatsAppUrl({
    context,
    message: 'Hi, I am interested in this Yoga departure. Please share the confirmed details.',
  });
  const message = new URL(url).searchParams.get('text') ?? '';

  assert.match(url, /^https:\/\/wa\.me\/919760446101\?/);
  assert.match(message, /5-Day Yoga Retreat in Rishikesh/);
  assert.match(message, /Rishikesh/);
  assert.match(message, /5 days/);
  assert.match(message, /2026-11-09/);
  assert.match(message, /Please share the confirmed details/);
  assert.doesNotMatch(message, /private-session-id|utm_source|lead score|tier|routing/i);
});

test('Art hub, location, and generated event routes resolve their canonical page contexts', () => {
  assert.equal(canonicalPageTypeFromPath('/retreats/art'), 'art_hub');
  assert.equal(canonicalPageTypeFromPath('/art-retreat-rishikesh'), 'art_location');
  assert.equal(canonicalPageTypeFromPath('/retreats/journeys/art-and-creative'), 'art_product');

  const context = resolveConversionContext({
    pagePath: '/creative-healing-retreat-october-2026',
    pageType: 'art_product',
    vertical: 'art',
    category: 'art-and-creative',
    ctaId: 'art_event_creative_healing_october_primary',
    ctaPosition: 'primary',
    productId: 'art-and-creative',
    productName: 'Creative Healing Retreat',
    locationName: 'Mussoorie',
    duration: '7 days',
    departureId: 'creative-healing-retreat-october-2026',
    departureDate: '2026-10-05',
  });

  assert.equal(context.page.type, 'art_product');
  assert.equal(context.cta.id, 'art_event_creative_healing_october_primary');
  assert.equal(context.cta.position, 'primary');
  assert.equal(context.product.id, 'art-and-creative');
  assert.equal(context.departure.id, 'creative-healing-retreat-october-2026');
  assert.equal(context.departure.date, '2026-10-05');
  assert.equal(context.location.name, 'Mussoorie');
});

test('Art event WhatsApp context includes the selected event and verified date without private attribution', () => {
  const event = RETREAT_PROGRAM_EVENTS.find((candidate) =>
    ['art-and-creative', 'trek-and-paint', 'weekend-art-retreat'].includes(candidate.serviceSlug),
  );
  assert.ok(event);

  const context = resolveConversionContext({
    pagePath: `/${event.slug}`,
    pageType: 'art_product',
    vertical: 'art',
    category: event.serviceSlug,
    ctaId: `art_fixed_departure_${event.slug}_book`,
    ctaPosition: 'card',
    productId: event.serviceSlug,
    productName: event.label,
    locationName: event.locationName !== 'TBA' ? event.locationName : undefined,
    duration: `${event.durationDays} days`,
    departureId: event.slug,
    departureDate: event.dateRange,
    conversionSessionId: 'private-art-session',
    attribution: { firstUtm: { utm_source: 'newsletter' } },
  });
  const url = buildWhatsAppUrl({
    context,
    message: `Hi, I saved an enquiry about ${event.label} (${event.dateRange}).`,
  });
  const message = new URL(url).searchParams.get('text') ?? '';

  assert.match(url, /^https:\/\/wa\.me\/919760446101\?/);
  assert.match(message, new RegExp(event.label));
  assert.match(message, new RegExp(event.dateRange));
  if (event.locationName !== 'TBA') assert.match(message, new RegExp(event.locationName));
  assert.doesNotMatch(message, /private-art-session|utm_source|lead score|tier|routing/i);
});
