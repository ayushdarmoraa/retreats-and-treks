/**
 * Server-Side Rate Limiter
 *
 * In-memory sliding window rate limiter with:
 *   - Per-IP window (configurable limit + window size)
 *   - Global request cap (prevents distributed abuse)
 *   - Bot User-Agent blocking (known crawlers / headless browsers)
 *
 * Not distributed — each serverless instance has its own window.
 * Sufficient for spam prevention. For DDoS, use Vercel WAF.
 */

interface WindowEntry {
  timestamps: number[];
}

const store = new Map<string, WindowEntry>();

// ── Global rate cap ─────────────────────────────────────────
// Prevents distributed attacks that spread across many IPs.
const GLOBAL_WINDOW_MS = 60_000;
const GLOBAL_MAX_REQUESTS = 200;
let globalTimestamps: number[] = [];

function pruneGlobal(): void {
  const cutoff = Date.now() - GLOBAL_WINDOW_MS;
  globalTimestamps = globalTimestamps.filter((t) => t > cutoff);
}

/**
 * Check if the global request cap has been hit.
 * Returns true if the request should be BLOCKED.
 */
export function isGlobalRateLimited(): boolean {
  pruneGlobal();
  if (globalTimestamps.length >= GLOBAL_MAX_REQUESTS) {
    return true;
  }
  globalTimestamps.push(Date.now());
  return false;
}

// ── Bot User-Agent detection ────────────────────────────────
// Block known headless browsers and aggressive crawlers that
// shouldn't be submitting forms. Legitimate crawlers (Googlebot)
// don't submit POST requests to form endpoints.
const BOT_UA_PATTERNS = [
  /curl\//i,
  /python-requests/i,
  /python-urllib/i,
  /java\//i,
  /libwww-perl/i,
  /wget\//i,
  /scrapy/i,
  /httpclient/i,
  /headlesschrome/i,
  /phantomjs/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,
];

/**
 * Check if a User-Agent string matches known bot patterns.
 */
export function isBotUserAgent(ua: string): boolean {
  if (!ua || ua.length < 4) return true; // Missing/empty UA = suspicious
  return BOT_UA_PATTERNS.some((pattern) => pattern.test(ua));
}

/** Clean entries older than windowMs */
function prune(entry: WindowEntry, windowMs: number): void {
  const cutoff = Date.now() - windowMs;
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
}

/**
 * Check if a request should be rate-limited.
 *
 * @param key     - Unique key (typically hashed IP)
 * @param limit   - Max requests per window
 * @param windowMs - Window size in milliseconds (default: 60s)
 * @returns true if the request should be BLOCKED
 */
export function isRateLimited(
  key: string,
  limit: number = 5,
  windowMs: number = 60_000
): boolean {
  let entry = store.get(key);

  if (!entry) {
    entry = { timestamps: [] };
    store.set(key, entry);
  }

  prune(entry, windowMs);

  if (entry.timestamps.length >= limit) {
    return true; // blocked
  }

  entry.timestamps.push(Date.now());
  return false;
}

/**
 * Hash an IP address for storage (simple, non-reversible).
 * We don't store raw IPs.
 */
export function hashIp(ip: string): string {
  // Simple FNV-1a hash — fast, non-crypto, sufficient for rate limiting
  let hash = 2166136261;
  for (let i = 0; i < ip.length; i++) {
    hash ^= ip.charCodeAt(i);
    hash = (hash * 16777619) >>> 0;
  }
  return hash.toString(36);
}
