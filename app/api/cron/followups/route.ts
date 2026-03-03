import { NextResponse } from 'next/server';
import { processFollowUps } from '@/lib/followups';

/**
 * GET /api/cron/followups
 *
 * Vercel Cron endpoint — runs daily at 08:00 UTC.
 * Protected by CRON_SECRET so only Vercel's scheduler can trigger it.
 *
 * To test locally:
 *   curl -H "Authorization: Bearer <your-cron-secret>" http://localhost:3000/api/cron/followups
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // allow up to 60s on pro plan

export async function GET(request: Request) {
  // ── Auth check ───────────────────────────────────────
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await processFollowUps();

    console.log(
      `[Cron:FollowUps] processed=${result.processed} sent=${result.sent} ` +
      `skipped=${result.skipped} errors=${result.errors}`
    );

    return NextResponse.json({
      ok: true,
      ...result,
      ts: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Cron:FollowUps] Fatal error:', err);
    return NextResponse.json(
      { ok: false, error: 'Internal error' },
      { status: 500 }
    );
  }
}
