/**
 * Inquiry Submission API — POST /api/inquire
 *
 * Production-grade pipeline:
 *   1. Honeypot check (bot trap)
 *   2. Timestamp delta validation (minimum 2s form fill time)
 *   3. IP-based rate limiting (5 req/min)
 *   4. Input validation
 *   5. Postgres storage (Neon)
 *   6. Conversion event logging
 *   7. Email dispatch (non-blocking)
 */

import { NextRequest, NextResponse } from 'next/server';
import { insertInquiry, type Inquiry } from '@/lib/inquiries';
import { sendInquiryEmails } from '@/lib/email';
import { logConversionEvent } from '@/lib/conversion-events';
import { isRateLimited, isGlobalRateLimited, isBotUserAgent, hashIp } from '@/lib/rate-limit';
import { scoreInquiry } from '@/lib/lead-scoring';
import { InquirySchema } from '@/lib/schemas';

export const runtime = 'nodejs';

/** Minimum time in ms between form load and submit (bot filter) */
const MIN_FILL_TIME_MS = 2_000;

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    '0.0.0.0'
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const ipHash = hashIp(ip);
  const userAgent = request.headers.get('user-agent') || '';

  try {
    // ── 0a. BOT USER-AGENT CHECK ──────────────────────────
    if (isBotUserAgent(userAgent)) {
      logConversionEvent({
        eventType: 'inquiry_spam_blocked',
        ipHash,
        userAgent,
        meta: { reason: 'bot_ua' },
      }).catch(() => {});
      return NextResponse.json({ success: true }); // fake success
    }

    // ── 0b. GLOBAL RATE CAP ──────────────────────────────
    if (isGlobalRateLimited()) {
      return NextResponse.json(
        { error: 'Service temporarily busy. Please try again shortly.' },
        { status: 429 },
      );
    }

    const body = await request.json();

    // ── 1. HONEYPOT CHECK ──────────────────────────────────
    // If the hidden "website" field has any value, it's a bot.
    if (body.website) {
      // Log silently, return fake success to not reveal detection
      logConversionEvent({
        eventType: 'inquiry_spam_blocked',
        ipHash,
        userAgent,
        meta: { reason: 'honeypot', ip_hash: ipHash },
      }).catch(() => {});
      return NextResponse.json({ success: true });
    }

    // ── 2. TIMESTAMP DELTA VALIDATION ──────────────────────
    const formLoadedAt = Number(body._t) || 0;
    if (formLoadedAt > 0 && Date.now() - formLoadedAt < MIN_FILL_TIME_MS) {
      logConversionEvent({
        eventType: 'inquiry_spam_blocked',
        ipHash,
        userAgent,
        meta: { reason: 'too_fast', delta_ms: Date.now() - formLoadedAt },
      }).catch(() => {});
      return NextResponse.json({ success: true }); // fake success
    }

    // ── 3. RATE LIMITING ───────────────────────────────────
    if (isRateLimited(ipHash, 5, 60_000)) {
      logConversionEvent({
        eventType: 'inquiry_spam_blocked',
        ipHash,
        userAgent,
        meta: { reason: 'rate_limit' },
      }).catch(() => {});
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute.' },
        { status: 429 }
      );
    }

    // ── 4. VALIDATION (Zod) ─────────────────────────────────
    const result = InquirySchema.safeParse(body);

    if (!result.success) {
      const issue = result.error.issues[0];
      const field = issue?.path?.join('.') || 'unknown';
      logConversionEvent({
        eventType: 'inquiry_validation_failed',
        sourceUrl: String(body.source || '').slice(0, 500),
        vertical: String(body.vertical || '').slice(0, 50),
        category: String(body.category || '').slice(0, 100),
        ipHash,
        meta: { field, message: issue?.message },
      }).catch(() => {});
      return NextResponse.json(
        { error: issue?.message || 'Invalid input' },
        { status: 400 },
      );
    }

    const inquiry: Inquiry = {
      ...result.data,
      timestamp: new Date().toISOString(),
    };

    // ── 5. LEAD SCORING ─────────────────────────────────────
    const { score, tier, signals } = scoreInquiry(inquiry);

    // ── 6. STORE (with lead intelligence) ──────────────────
    const inquiryId = await insertInquiry(inquiry, score, tier);

    // ── 7. LOG CONVERSION EVENT ────────────────────────────
    logConversionEvent({
      eventType: 'inquiry_submitted',
      inquiryId,
      sourceUrl: inquiry.source,
      vertical: inquiry.vertical,
      category: inquiry.category,
      ipHash,
      userAgent,
      meta: { lead_score: score, lead_tier: tier, signals },
    }).catch(() => {});

    // ── 8. TIERED EMAIL (non-blocking) ─────────────────────
    sendInquiryEmails(inquiry, tier, score)
      .then((emailResult) => {
        const eventType = emailResult.sent ? 'inquiry_email_sent' : 'inquiry_email_failed';
        logConversionEvent({
          eventType,
          inquiryId,
          sourceUrl: inquiry.source,
          meta: emailResult.error ? { error: emailResult.error, lead_tier: tier } : { lead_tier: tier },
        }).catch(() => {});
      })
      .catch((err) => {
        console.error('[Inquire] Email send error:', err);
        logConversionEvent({
          eventType: 'inquiry_email_failed',
          inquiryId,
          sourceUrl: inquiry.source,
          meta: { error: String(err), lead_tier: tier },
        }).catch(() => {});
      });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[API:Inquire] Unhandled error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
