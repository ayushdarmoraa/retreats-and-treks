const TOKEN_STORAGE_PREFIX = 'retreats-and-treks:pending-inquiry:v2';
const TOKEN_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const volatileTokens = new Map<string, { token: string; fingerprint: string }>();
const VOLATILE_FIELDS = new Set([
  '_t',
  'website',
  'conversionSessionId',
  'referrer',
  'firstLandingPage',
  'lastLandingPage',
  'firstUtm',
  'lastUtm',
  'firstTouchAt',
  'lastTouchAt',
]);

interface TokenStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

interface PendingTokenOptions {
  storage?: TokenStorage | null;
  createToken?: () => string;
}

export interface PendingSubmissionToken {
  token: string;
  clear: () => void;
}

function getSessionStorage(): TokenStorage | null {
  try {
    return typeof window === 'undefined' ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

function createUuid(): string {
  return globalThis.crypto.randomUUID();
}

function normalizeIdentity(value: unknown, key?: string): unknown {
  if (key && VOLATILE_FIELDS.has(key)) return undefined;
  if (typeof value === 'string' && key === 'source') return value.split('?')[0];
  if (Array.isArray(value)) return value.map((item) => normalizeIdentity(item));
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .flatMap(([childKey, childValue]) => {
          const normalized = normalizeIdentity(childValue, childKey);
          return normalized === undefined ? [] : [[childKey, normalized]];
        }),
    );
  }
  return value;
}

async function fingerprintSubmission(identity: unknown): Promise<string> {
  const serialized = JSON.stringify(normalizeIdentity(identity));
  const digest = await globalThis.crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(serialized),
  );
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function acquirePendingSubmissionToken(
  formScope: string,
  submissionIdentity: unknown,
  options: PendingTokenOptions = {},
): Promise<PendingSubmissionToken> {
  const storage = Object.hasOwn(options, 'storage') ? options.storage ?? null : getSessionStorage();
  const makeToken = options.createToken ?? createUuid;
  const storageKey = `${TOKEN_STORAGE_PREFIX}:${encodeURIComponent(formScope)}`;
  const fingerprint = await fingerprintSubmission(submissionIdentity);
  let pending = volatileTokens.get(storageKey);
  if (pending?.fingerprint !== fingerprint) pending = undefined;

  if (storage && storageKey) {
    try {
      const stored = storage.getItem(storageKey);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (
          parsed &&
          typeof parsed === 'object' &&
          'token' in parsed &&
          'fingerprint' in parsed &&
          typeof parsed.token === 'string' &&
          TOKEN_PATTERN.test(parsed.token) &&
          parsed.fingerprint === fingerprint
        ) {
          pending = { token: parsed.token, fingerprint };
        }
      }
    } catch {
      // Fall back to the in-memory token when session storage is unavailable.
    }
  }

  pending ??= { token: makeToken(), fingerprint };
  volatileTokens.set(storageKey, pending);
  if (storage && storageKey) {
    try {
      storage.setItem(storageKey, JSON.stringify(pending));
    } catch {
      // Keep the pending token in memory when session storage is unavailable.
    }
  }

  return {
    token: pending.token,
    clear: () => {
      if (!storageKey) return;
      if (volatileTokens.get(storageKey)?.token === pending.token) volatileTokens.delete(storageKey);
      if (storage) {
        try {
          const stored = storage.getItem(storageKey);
          if (stored && JSON.parse(stored).token === pending.token) storage.removeItem(storageKey);
        } catch {
          // Storage may become unavailable after the request has completed.
        }
      }
    },
  };
}
