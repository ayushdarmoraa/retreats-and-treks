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
interface AttributionState {
  first: AttributionValues;
  last: AttributionValues;
}
interface SearchReader {
  get(name: string): string | null;
}

function readAttributionState(): AttributionState {
  if (typeof window === 'undefined') return { first: {}, last: {} };
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return { first: {}, last: {} };
    const parsed = JSON.parse(stored) as Partial<AttributionState>;
    return { first: parsed.first ?? {}, last: parsed.last ?? {} };
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
  if (Object.keys(incoming).length === 0) return;

  const existing = readAttributionState();
  const state: AttributionState = {
    first: Object.keys(existing.first).length > 0 ? existing.first : incoming,
    last: incoming,
  };
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Attribution storage must never block the form or page.
  }
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
