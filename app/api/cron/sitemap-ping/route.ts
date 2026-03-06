import { NextResponse } from 'next/server';
import { pingSitemapToSearchEngines } from '@/lib/sitemap-ping';

/**
 * GET /api/cron/sitemap-ping
 *
 * Pings Google and Bing to notify them the sitemap has updated.
 * Run post-deploy via Vercel cron or manually with CRON_SECRET.
 *
 * To test locally:
 *   curl -H "Authorization: Bearer <your-cron-secret>" http://localhost:3000/api/cron/sitemap-ping
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = await pingSitemapToSearchEngines();

  const allOk = results.every((r) => r.ok);

  console.log(
    `[Cron:SitemapPing] ${results.map((r) => `${r.engine}=${r.ok ? r.status : 'FAIL'}`).join(' ')}`,
  );

  return NextResponse.json({
    ok: allOk,
    results,
    ts: new Date().toISOString(),
  });
}
