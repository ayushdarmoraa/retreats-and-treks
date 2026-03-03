/**
 * Auth utilities for internal dashboard
 *
 * Uses HMAC-signed cookie for session validation.
 * ADMIN_PASSWORD env var is the operator password.
 * ADMIN_SECRET env var is the HMAC signing key.
 *
 * Cookie format: base64(timestamp:hashVersion:hmac(timestamp:hashVersion:password_hash))
 * hashVersion = first 8 chars of SHA-256(password)
 * When ADMIN_PASSWORD changes, hashVersion changes, instantly invalidating all sessions.
 * Expires after 24 hours.
 */

const COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE = 24 * 60 * 60; // 24 hours in seconds

/**
 * Web Crypto HMAC-SHA256 sign
 */
async function hmacSign(secret: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * SHA-256 hash (for password hashing — not bcrypt, but sufficient for single-user internal tool)
 */
async function sha256(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Validate a password and return a signed session cookie value.
 * Returns null if password is wrong or env vars are missing.
 */
export async function createSession(password: string): Promise<string | null> {
  const expectedPassword = process.env.ADMIN_PASSWORD;
  const signingKey = process.env.ADMIN_SECRET;

  if (!expectedPassword || !signingKey) {
    console.warn('[Auth] ADMIN_PASSWORD or ADMIN_SECRET not set');
    return null;
  }

  if (password !== expectedPassword) {
    return null;
  }

  const timestamp = String(Math.floor(Date.now() / 1000));
  const passwordHash = await sha256(password);
  const hashVersion = passwordHash.slice(0, 8);
  const signature = await hmacSign(signingKey, `${timestamp}:${hashVersion}:${passwordHash}`);
  const token = btoa(`${timestamp}:${hashVersion}:${signature}`);

  return token;
}

/**
 * Validate a session cookie value.
 * Returns true if the cookie is valid and not expired.
 */
export async function validateSession(cookieValue: string): Promise<boolean> {
  const signingKey = process.env.ADMIN_SECRET;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!signingKey || !expectedPassword) return false;

  try {
    const decoded = atob(cookieValue);
    const parts = decoded.split(':');
    // Support both old (timestamp:signature) and new (timestamp:hashVersion:signature) formats
    const timestampStr = parts[0];
    const hashVersion = parts.length === 3 ? parts[1] : null;
    const signature = parts.length === 3 ? parts[2] : parts[1];
    const timestamp = parseInt(timestampStr, 10);

    if (isNaN(timestamp)) return false;

    // Check expiry
    const now = Math.floor(Date.now() / 1000);
    if (now - timestamp > SESSION_MAX_AGE) return false;

    // Verify password hash version matches current password
    const passwordHash = await sha256(expectedPassword);
    const currentHashVersion = passwordHash.slice(0, 8);

    // If token has hashVersion, verify it matches current password
    if (hashVersion && hashVersion !== currentHashVersion) return false;

    // Verify HMAC
    const payload = hashVersion
      ? `${timestampStr}:${hashVersion}:${passwordHash}`
      : `${timestampStr}:${passwordHash}`;
    const expected = await hmacSign(signingKey, payload);

    return signature === expected;
  } catch {
    return false;
  }
}

export { COOKIE_NAME, SESSION_MAX_AGE };
