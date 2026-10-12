import { readAttributionSnapshot } from '../utils/attribution';

export const PAGE_TYPES = [
  'home',
  'trek_hub',
  'trek_product',
  'trek_departure',
  'retreat_hub',
  'retreat_product',
  'retreat_location',
  'yoga_hub',
  'yoga_product',
  'yoga_departure',
  'art_hub',
  'art_product',
  'art_location',
  'journey',
  'location',
  'blog',
  'comparison',
  'programme',
  'calendar',
  'finder',
  'contact',
  'facilitator',
  'review',
  'other',
] as const;

export type PageType = (typeof PAGE_TYPES)[number];

export const CTA_POSITIONS = [
  'hero',
  'primary',
  'mid_page',
  'content',
  'card',
  'sidebar',
  'sticky_mobile',
  'sticky_desktop',
  'calendar',
  'comparison',
  'footer',
  'floating',
  'form_success',
  'finder_result',
  'header',
  'other',
] as const;

export type CtaPosition = (typeof CTA_POSITIONS)[number];

export type UTMKey =
  | 'utm_source'
  | 'utm_medium'
  | 'utm_campaign'
  | 'utm_term'
  | 'utm_content'
  | 'utm_id';

export interface ConversionPageContext {
  path: string;
  title?: string;
  type: PageType;
  vertical?: string;
  category?: string;
}

export interface ConversionCtaContext {
  id?: string;
  label?: string;
  position: CtaPosition;
  variant?: string;
}

export interface ConversionProductContext {
  id?: string;
  name?: string;
}

export interface ConversionLocationContext {
  id?: string;
  name?: string;
}

export interface ConversionDepartureContext {
  id?: string;
  date?: string;
}

export interface ConversionAttribution {
  conversionSessionId: string;
  firstLandingPage?: string;
  lastLandingPage?: string;
  referrer?: string;
  firstUtm?: Partial<Record<UTMKey, string>>;
  lastUtm?: Partial<Record<UTMKey, string>>;
  firstTouchAt?: string;
  lastTouchAt?: string;
}

export interface ConversionContext {
  page: ConversionPageContext;
  cta: ConversionCtaContext;
  product: ConversionProductContext;
  experience?: string;
  location: ConversionLocationContext;
  duration?: string;
  departure: ConversionDepartureContext;
  attribution: ConversionAttribution;
}

export interface ConversionContextInput {
  pagePath?: string;
  pageTitle?: string;
  pageType?: PageType | string;
  vertical?: string;
  category?: string;
  ctaId?: string;
  ctaLabel?: string;
  ctaPosition?: CtaPosition | string;
  ctaVariant?: string;
  productId?: string;
  productName?: string;
  experience?: string;
  locationId?: string;
  locationName?: string;
  duration?: string;
  departureId?: string;
  departureDate?: string;
  conversionSessionId?: string;
  attribution?: Partial<ConversionAttribution>;
}

const SESSION_STORAGE_KEY = 'conversion_session_id_v1';

function sanitizeText(value?: string | null): string | undefined {
  if (typeof value !== 'string') return undefined;
  const next = value.trim();
  return next.length > 0 ? next.slice(0, 200) : undefined;
}

function sanitizePath(path?: string): string {
  if (!path) return '/';
  const trimmed = path.trim();
  if (!trimmed) return '/';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

export function normalizePageType(input?: string): PageType {
  const candidate = sanitizeText(input)?.toLowerCase();
  if (!candidate) return 'other';

  if (candidate === 'home' || candidate === '/') return 'home';
  if (candidate === 'trek-hub' || candidate === 'trek_hub') return 'trek_hub';
  if (candidate === 'trek-product' || candidate === 'trek_product') return 'trek_product';
  if (candidate === 'trek-departure' || candidate === 'trek_departure') return 'trek_departure';
  if (candidate === 'retreat-hub' || candidate === 'retreat_hub') return 'retreat_hub';
  if (candidate === 'retreat-product' || candidate === 'retreat_product') return 'retreat_product';
  if (candidate === 'retreat-location' || candidate === 'retreat_location') return 'retreat_location';
  if (candidate === 'yoga-hub' || candidate === 'yoga_hub') return 'yoga_hub';
  if (candidate === 'yoga-product' || candidate === 'yoga_product') return 'yoga_product';
  if (candidate === 'yoga-departure' || candidate === 'yoga_departure') return 'yoga_departure';
  if (candidate === 'art-hub' || candidate === 'art_hub') return 'art_hub';
  if (candidate === 'art-product' || candidate === 'art_product') return 'art_product';
  if (candidate === 'art-location' || candidate === 'art_location') return 'art_location';
  if (candidate === 'journey') return 'journey';
  if (candidate === 'location') return 'location';
  if (candidate === 'blog') return 'blog';
  if (candidate === 'comparison') return 'comparison';
  if (candidate === 'programme') return 'programme';
  if (candidate === 'calendar') return 'calendar';
  if (candidate === 'finder') return 'finder';
  if (candidate === 'contact') return 'contact';
  if (candidate === 'facilitator') return 'facilitator';
  if (candidate === 'review') return 'review';

  return 'other';
}

export function normalizeCtaPosition(input?: string): CtaPosition {
  const candidate = sanitizeText(input)?.toLowerCase();
  if (!candidate) return 'other';

  if (candidate === 'hero') return 'hero';
  if (candidate === 'primary') return 'primary';
  if (candidate === 'mid-page' || candidate === 'mid_page') return 'mid_page';
  if (candidate === 'content') return 'content';
  if (candidate === 'card') return 'card';
  if (candidate === 'sidebar') return 'sidebar';
  if (candidate === 'sticky-mobile' || candidate === 'sticky_mobile') return 'sticky_mobile';
  if (candidate === 'sticky-desktop' || candidate === 'sticky_desktop') return 'sticky_desktop';
  if (candidate === 'calendar') return 'calendar';
  if (candidate === 'comparison') return 'comparison';
  if (candidate === 'footer') return 'footer';
  if (candidate === 'floating') return 'floating';
  if (candidate === 'form-success' || candidate === 'form_success') return 'form_success';
  if (candidate === 'finder-result' || candidate === 'finder_result') return 'finder_result';
  if (candidate === 'header') return 'header';

  return 'other';
}

export function canonicalPageTypeFromPath(pathname?: string): PageType {
  const path = sanitizePath(pathname);

  const knownPages: Array<{ pattern: RegExp; type: PageType }> = [
    { pattern: /^\/$/, type: 'home' },
    { pattern: /^\/(?:retreat-)?program(?:me)?s?(?:\/.*)?$/i, type: 'programme' },
    { pattern: /^\/(?:retreat-)?calendars?(?:\/.*)?$/i, type: 'calendar' },
    { pattern: /^\/facilitators?(?:\/.*)?$/i, type: 'facilitator' },
    { pattern: /^\/yoga-retreats?\/?$/i, type: 'yoga_hub' },
    { pattern: /^\/treks?\/location\/[^/]+\/[^/]+(?:\/.*)?$/i, type: 'trek_product' },
    { pattern: /^\/treks?\/(?:brahmatal|kuari-pass|pangarchulla|roopkund|dayara|har-ki-dun|kedarkantha)\/(?:departures|[^/]+)(?:\/.*)?$/i, type: 'trek_departure' },
    { pattern: /^\/treks?\/[^/]+-vs-[^/]+\/?$/i, type: 'comparison' },
    { pattern: /^\/trek\/[^/]+(?:\/.*)?$/i, type: 'trek_product' },
    { pattern: /^\/treks?(?:\/[^/]+)?\/?$/i, type: 'trek_hub' },
    { pattern: /^\/treks?\/(?:best-treks-in-uttarakhand|garhwal-himalayas)\/[^/]+\/?$/i, type: 'trek_hub' },
    { pattern: /^\/retreats\/art\/?$/i, type: 'art_hub' },
    { pattern: /^\/art-retreat-[^/]+(?:\/.*)?$/i, type: 'art_location' },
    { pattern: /^\/(?:retreats\/)?art\/locations?\/[^/]+(?:\/.*)?$/i, type: 'art_location' },
    { pattern: /^\/retreats\/journeys\/(?:art-and-creative|trek-and-paint|weekend-art-retreat)(?:\/.*)?$/i, type: 'art_product' },
    { pattern: /^\/retreats\/journeys(?:\/.*)?$/i, type: 'journey' },
    { pattern: /^\/retreats?\/program(?:me)?s?(?:\/.*)?$/i, type: 'programme' },
    { pattern: /^\/retreats?\/calendars?(?:\/.*)?$/i, type: 'calendar' },
    { pattern: /^\/retreats?\/yoga-retreats?\/?$/i, type: 'yoga_hub' },
    { pattern: /^\/retreats\/(?!journeys\/)(?:[^/]+\/)?yoga(?:-|\/|$)/i, type: 'yoga_product' },
    { pattern: /^\/retreats?\/[^/]+\/.+$/i, type: 'retreat_product' },
    { pattern: /^\/retreats?(?:\/.*)?$/i, type: 'retreat_hub' },
    { pattern: /^\/retreat\//i, type: 'retreat_product' },
    { pattern: /^\/art\/.*$/i, type: 'art_product' },
    { pattern: /^\/yoga-retreat-[^/]+(?:\/.*)?$/i, type: 'yoga_product' },
    { pattern: /^\/yoga(?:-|\/|$)/i, type: 'yoga_hub' },
    { pattern: /^\/yoga\//i, type: 'yoga_product' },
    { pattern: /^\/yoga-.*$/i, type: 'yoga_product' },
    { pattern: /^\/art(?:-|\/|$)/i, type: 'art_hub' },
    { pattern: /^\/art\//i, type: 'art_product' },
    { pattern: /^\/journeys?(?:\/.*)?$/i, type: 'journey' },
    { pattern: /^\/locations?(?:\/.*)?$/i, type: 'location' },
    { pattern: /^\/find-your-retreat\/?$/i, type: 'finder' },
    { pattern: /^\/blog(?:\/.*)?$/i, type: 'blog' },
    { pattern: /^\/compare(?:\/.*)?$/i, type: 'comparison' },
    { pattern: /^\/comparison(?:\/.*)?$/i, type: 'comparison' },
    { pattern: /^\/[^/]+-vs-[^/]+\/?$/i, type: 'comparison' },
    { pattern: /^\/finder(?:\/.*)?$/i, type: 'finder' },
    { pattern: /^\/contact(?:\/.*)?$/i, type: 'contact' },
    { pattern: /^\/reviews?(?:\/.*)?$/i, type: 'review' },
  ];

  const match = knownPages.find(({ pattern }) => pattern.test(path));
  return match?.type ?? 'other';
}

export function resolvePageContext(input: ConversionContextInput): ConversionPageContext {
  const path = sanitizePath(input.pagePath);
  const registryType = canonicalPageTypeFromPath(path);
  const routeType = normalizePageType(input.pageType);
  const specificRetreatRoute = routeType === 'retreat_location' && registryType === 'retreat_hub';
  const pageType = specificRetreatRoute
    ? routeType
    : registryType !== 'other'
      ? registryType
      : routeType !== 'other'
        ? routeType
        : 'other';

  return {
    path,
    ...(sanitizeText(input.pageTitle) ? { title: sanitizeText(input.pageTitle) } : {}),
    type: pageType,
    ...(sanitizeText(input.vertical) ? { vertical: sanitizeText(input.vertical) } : {}),
    ...(sanitizeText(input.category) ? { category: sanitizeText(input.category) } : {}),
  };
}

export function resolveCtaContext(input: ConversionContextInput): ConversionCtaContext {
  const position = normalizeCtaPosition(input.ctaPosition) || 'other';
  const explicitId = sanitizeText(input.ctaId);
  const label = sanitizeText(input.ctaLabel);
  const path = sanitizeText(input.pagePath);
  const pageId = path?.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  const categoryId = sanitizeText(input.category)
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  const id = explicitId ?? (pageId
    ? `cta_${pageId}_${position}_${categoryId || 'general'}_inquiry`.slice(0, 200)
    : undefined);

  return {
    ...(id ? { id } : {}),
    ...(label ? { label } : {}),
    position,
    ...(sanitizeText(input.ctaVariant) ? { variant: sanitizeText(input.ctaVariant) } : {}),
  };
}

export function resolveAttribution(input: Partial<ConversionAttribution> = {}): ConversionAttribution {
  const sessionId = isValidConversionSessionId(input.conversionSessionId)
    ? input.conversionSessionId.trim()
    : generateConversionSessionId();

  return {
    conversionSessionId: sessionId,
    ...(sanitizeText(input.firstLandingPage) ? { firstLandingPage: sanitizeText(input.firstLandingPage) } : {}),
    ...(sanitizeText(input.lastLandingPage) ? { lastLandingPage: sanitizeText(input.lastLandingPage) } : {}),
    ...(sanitizeText(input.referrer) ? { referrer: sanitizeText(input.referrer) } : {}),
    ...(input.firstUtm && Object.keys(input.firstUtm).length > 0 ? { firstUtm: sanitizeUtmMap(input.firstUtm) } : {}),
    ...(input.lastUtm && Object.keys(input.lastUtm).length > 0 ? { lastUtm: sanitizeUtmMap(input.lastUtm) } : {}),
    ...(sanitizeText(input.firstTouchAt) ? { firstTouchAt: sanitizeText(input.firstTouchAt) } : {}),
    ...(sanitizeText(input.lastTouchAt) ? { lastTouchAt: sanitizeText(input.lastTouchAt) } : {}),
  };
}

export function sanitizeUtmMap(input?: Partial<Record<UTMKey, string>>): Partial<Record<UTMKey, string>> {
  if (!input) return {};
  const next: Partial<Record<UTMKey, string>> = {};

  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'] as const) {
    const value = sanitizeText(input[key]);
    if (value) next[key] = value;
  }

  return next;
}

export function generateConversionSessionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : undefined;
  if (cryptoObject && 'getRandomValues' in cryptoObject) {
    cryptoObject.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }

  const hex = Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  return `${Date.now().toString(36)}-${hex}`;
}

export function isValidConversionSessionId(value?: string | null): value is string {
  return typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9_-]{0,199}$/.test(value.trim());
}

export function readConversionSessionId(): string {
  if (typeof window === 'undefined') return generateConversionSessionId();

  try {
    const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (isValidConversionSessionId(existing)) return existing.trim();
    const generated = generateConversionSessionId();
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, generated);
    return generated;
  } catch {
    return generateConversionSessionId();
  }
}

export function resolveConversionContext(input: ConversionContextInput = {}): ConversionContext {
  const page = resolvePageContext(input);
  const cta = resolveCtaContext(input);
  const sessionId = isValidConversionSessionId(input.conversionSessionId)
    ? input.conversionSessionId.trim()
    : isValidConversionSessionId(input.attribution?.conversionSessionId)
      ? input.attribution.conversionSessionId.trim()
      : readConversionSessionId();
  const attribution = resolveAttribution({
    ...(input.attribution ?? {}),
    conversionSessionId: sessionId,
  });

  return {
    page,
    cta,
    product: {
      ...(sanitizeText(input.productId) ? { id: sanitizeText(input.productId) } : {}),
      ...(sanitizeText(input.productName) ? { name: sanitizeText(input.productName) } : {}),
    },
    ...(sanitizeText(input.experience) ? { experience: sanitizeText(input.experience) } : {}),
    location: {
      ...(sanitizeText(input.locationId) ? { id: sanitizeText(input.locationId) } : {}),
      ...(sanitizeText(input.locationName) ? { name: sanitizeText(input.locationName) } : {}),
    },
    ...(sanitizeText(input.duration) ? { duration: sanitizeText(input.duration) } : {}),
    departure: {
      ...(sanitizeText(input.departureId) ? { id: sanitizeText(input.departureId) } : {}),
      ...(sanitizeText(input.departureDate) ? { date: sanitizeText(input.departureDate) } : {}),
    },
    attribution,
  };
}

export function extractUtmFromSearch(search: URLSearchParams | { get: (name: string) => string | null }): Partial<Record<UTMKey, string>> {
  const query = search instanceof URLSearchParams ? search : new URLSearchParams();
  const values: Partial<Record<UTMKey, string>> = {};

  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'] as const) {
    const raw = query.get ? query.get(key) : search.get(key);
    const value = sanitizeText(raw);
    if (value) values[key] = value;
  }

  return values;
}

export function buildAttributionSnapshot(search: URLSearchParams | { get: (name: string) => string | null }): Required<Pick<ConversionAttribution, 'firstUtm' | 'lastUtm'>> & Pick<ConversionAttribution, 'firstLandingPage' | 'lastLandingPage' | 'referrer' | 'firstTouchAt' | 'lastTouchAt'> {
  return readAttributionSnapshot(search);
}
