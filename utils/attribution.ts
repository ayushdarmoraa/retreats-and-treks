const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
] as const;

const STORAGE_KEY = 'retreats-and-treks-attribution-v1';

type AttributionValues = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;
export interface AttributionState {
  first: AttributionValues;
  last: AttributionValues;
  firstLandingPage?: string;
  lastLandingPage?: string;
  referrer?: string;
  firstTouchAt?: string;
  lastTouchAt?: string;
}

export interface AttributionSnapshot {
  firstUtm: AttributionValues;
  lastUtm: AttributionValues;
  firstLandingPage?: string;
  lastLandingPage?: string;
  referrer?: string;
  firstTouchAt?: string;
  lastTouchAt?: string;
}

interface SearchReader {
  get(name: string): string | null;
}

function sanitizeValues(value: unknown): AttributionValues {
  if (!value || typeof value !== 'object') return {};
  const result: AttributionValues = {};
  for (const key of ATTRIBUTION_KEYS) {
    const candidate = (value as Record<string, unknown>)[key];
    if (typeof candidate === 'string' && candidate.trim()) {
      result[key] = candidate.trim().slice(0, 200);
    }
  }
  return result;
}

function sanitizeStoredText(value: unknown, maxLength = 1000): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  return value.trim().slice(0, maxLength);
}

function currentLandingPage(): string | undefined {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : undefined;
  return pathname?.startsWith('/') ? sanitizeStoredText(pathname.split(/[?#]/, 1)[0], 500) : undefined;
}

function currentReferrer(): string | undefined {
  if (typeof document === 'undefined' || !document.referrer) return undefined;
  try {
    const referrer = new URL(document.referrer);
    if (referrer.protocol !== 'http:' && referrer.protocol !== 'https:') return undefined;
    return sanitizeStoredText(`${referrer.origin}${referrer.pathname}`, 1000);
  } catch {
    return undefined;
  }
}

function readAttributionState(): AttributionState {
  if (typeof window === 'undefined') return { first: {}, last: {} };
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return { first: {}, last: {} };
    const parsed = JSON.parse(stored) as Partial<AttributionState>;
    return {
      first: sanitizeValues(parsed.first),
      last: sanitizeValues(parsed.last),
      firstLandingPage: sanitizeStoredText(parsed.firstLandingPage, 500),
      lastLandingPage: sanitizeStoredText(parsed.lastLandingPage, 500),
      referrer: sanitizeStoredText(parsed.referrer),
      firstTouchAt: sanitizeStoredText(parsed.firstTouchAt, 50),
      lastTouchAt: sanitizeStoredText(parsed.lastTouchAt, 50),
    };
  } catch {
    return { first: {}, last: {} };
  }
}

function readAttributionValues(search: SearchReader): AttributionValues {
  const values: AttributionValues = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = search.get(key)?.trim();
    if (value) values[key] = value.slice(0, 200);
  }
  return values;
}

export function captureAttribution(search: SearchReader): void {
  if (typeof window === 'undefined') return;
  const incoming = readAttributionValues(search);
  const existing = readAttributionState();
  const hasIncoming = Object.keys(incoming).length > 0;
  const firstTouch = !existing.firstTouchAt
    && !existing.firstLandingPage
    && Object.keys(existing.first).length === 0;
  const touchedAt = new Date().toISOString();
  const landingPage = currentLandingPage();
  const referrer = firstTouch ? currentReferrer() : undefined;
  const state: AttributionState = {
    ...existing,
    first: firstTouch ? incoming : existing.first,
    last: hasIncoming ? incoming : existing.last,
    ...(!existing.firstLandingPage && firstTouch && landingPage ? { firstLandingPage: landingPage } : {}),
    ...(landingPage ? { lastLandingPage: landingPage } : {}),
    ...(!existing.referrer && referrer ? { referrer } : {}),
    ...(!existing.firstTouchAt && firstTouch ? { firstTouchAt: touchedAt } : {}),
    ...(hasIncoming ? { lastTouchAt: touchedAt } : {}),
  };
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Attribution storage must never block the form or page.
  }
}

export function readAttributionSnapshot(search: SearchReader): AttributionSnapshot {
  const existing = readAttributionState();
  const incoming = readAttributionValues(search);
  const hasIncoming = Object.keys(incoming).length > 0;
  const firstTouch = !existing.firstTouchAt
    && !existing.firstLandingPage
    && Object.keys(existing.first).length === 0;
  const landingPage = currentLandingPage();
  const referrer = firstTouch ? currentReferrer() : undefined;
  const touchedAt = hasIncoming ? new Date().toISOString() : undefined;

  return {
    firstUtm: firstTouch && hasIncoming ? incoming : existing.first,
    lastUtm: hasIncoming ? incoming : existing.last,
    ...(existing.firstLandingPage || (firstTouch ? landingPage : undefined)
      ? { firstLandingPage: existing.firstLandingPage || landingPage }
      : {}),
    ...(landingPage || existing.lastLandingPage
      ? { lastLandingPage: existing.lastLandingPage || landingPage }
      : {}),
    ...(existing.referrer
      ? { referrer: existing.referrer }
      : referrer
        ? { referrer }
        : {}),
    ...(existing.firstTouchAt || (firstTouch && hasIncoming ? touchedAt : undefined)
      ? { firstTouchAt: existing.firstTouchAt || touchedAt }
      : {}),
    ...(existing.lastTouchAt || (hasIncoming ? touchedAt : undefined)
      ? { lastTouchAt: existing.lastTouchAt || touchedAt }
      : {}),
  };
}

export function buildAttributionQuery(search: SearchReader): string {
  const state = readAttributionState();
  const current = readAttributionValues(search);
  const result = new URLSearchParams();

  for (const key of ATTRIBUTION_KEYS) {
    const firstValue = state.first[key];
    if (firstValue) result.set(`first_${key}`, firstValue.slice(0, 60));
    const value = current[key] ?? state.last[key] ?? firstValue;
    if (value) result.set(key, value.slice(0, 60));
  }

  let query = result.toString();
  while (query.length > 260) {
    const entries = [...result.entries()];
    const lastEntry = entries[entries.length - 1];
    if (!lastEntry) break;
    result.delete(lastEntry[0]);
    query = result.toString();
  }
  return query;
}
