/**
 * Edge Middleware — Auth Gate for /internal/* routes
 *
 * Blocks access to:
 *   /internal/*           (dashboard pages)
 *   /api/internal/*       (admin API routes)
 *   /api/cron/*           (cron endpoints — protected by CRON_SECRET header)
 *
 * Allows:
 *   - Requests with valid admin_session cookie
 *   - /internal/login (the login page itself)
 *   - /api/internal/auth/* (login/logout endpoints)
 *   - /api/cron/* with valid CRON_SECRET Bearer token
 */

import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE = 24 * 60 * 60;

export const config = {
  matcher: ['/internal/:path*', '/api/internal/:path*', '/api/cron/:path*'],
};

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

async function sha256(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function isValidSession(cookieValue: string): Promise<boolean> {
  const signingKey = process.env.ADMIN_SECRET;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!signingKey || !expectedPassword) return false;

  try {
    const decoded = atob(cookieValue);
    const parts = decoded.split(':');
    const timestampStr = parts[0];
    const hashVersion = parts.length === 3 ? parts[1] : null;
    const signature = parts.length === 3 ? parts[2] : parts[1];
    const timestamp = parseInt(timestampStr, 10);

    if (isNaN(timestamp)) return false;
    if (Math.floor(Date.now() / 1000) - timestamp > SESSION_MAX_AGE) return false;

    const passwordHash = await sha256(expectedPassword);
    const currentHashVersion = passwordHash.slice(0, 8);

    if (hashVersion && hashVersion !== currentHashVersion) return false;

    const payload = hashVersion
      ? `${timestampStr}:${hashVersion}:${passwordHash}`
      : `${timestampStr}:${passwordHash}`;
    const expected = await hmacSign(signingKey, payload);

    return signature === expected;
  } catch {
    return false;
  }
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Allow login page and auth endpoints ────────────────
  if (pathname === '/internal/login' || pathname.startsWith('/api/internal/auth')) {
    return NextResponse.next();
  }

  // ── Cron endpoints: validate CRON_SECRET, not session ──
  if (pathname.startsWith('/api/cron/')) {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
      return NextResponse.next();
    }

    // Also allow if admin session is valid (manual trigger from dashboard)
    const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;
    if (sessionCookie && (await isValidSession(sessionCookie))) {
      return NextResponse.next();
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── Check admin session cookie ─────────────────────────
  const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;

  if (!sessionCookie || !(await isValidSession(sessionCookie))) {
    // For API routes, return 401 JSON
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For pages, redirect to login
    const loginUrl = new URL('/internal/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
