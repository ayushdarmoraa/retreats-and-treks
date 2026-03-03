/**
 * GET /api/internal/analytics — Revenue metrics for dashboard
 *
 * Returns 30-day aggregated metrics:
 *   - Total leads
 *   - Hot leads
 *   - Booked count (conversion)
 *   - Conversion rate (booked / total)
 *   - Avg lead score
 *   - Leads by tier breakdown
 *   - Leads by vertical breakdown
 *   - Leads by status breakdown
 *   - Avg response time for booked leads (time from created_at to status change)
 *   - Daily lead volume (last 30 days)
 *
 * Auth: Handled by middleware.ts
 */

import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const sql = getDb();

  try {
    // ── Core metrics (30 days) ─────────────────────────────
    const [metrics] = await sql`
      SELECT
        COUNT(*)::int AS total_leads,
        COUNT(*) FILTER (WHERE lead_tier = 'hot')::int AS hot_leads,
        COUNT(*) FILTER (WHERE lead_tier = 'warm')::int AS warm_leads,
        COUNT(*) FILTER (WHERE lead_tier = 'cold')::int AS cold_leads,
        COUNT(*) FILTER (WHERE status = 'booked')::int AS booked,
        COUNT(*) FILTER (WHERE status = 'replied')::int AS replied,
        COUNT(*) FILTER (WHERE status = 'closed')::int AS closed,
        COUNT(*) FILTER (WHERE status = 'open')::int AS open,
        ROUND(AVG(lead_score), 1) AS avg_score,
        ROUND(
          CASE WHEN COUNT(*) > 0
            THEN COUNT(*) FILTER (WHERE status = 'booked')::numeric / COUNT(*)::numeric * 100
            ELSE 0
          END,
          1
        ) AS conversion_rate,
        COUNT(*) FILTER (WHERE vertical = 'retreat')::int AS retreat_leads,
        COUNT(*) FILTER (WHERE vertical = 'trek')::int AS trek_leads
      FROM inquiries
      WHERE created_at >= now() - interval '30 days'
    `;

    // ── Hot lead conversion (hot → booked rate) ────────────
    const [hotConversion] = await sql`
      SELECT
        COUNT(*)::int AS total_hot,
        COUNT(*) FILTER (WHERE status = 'booked')::int AS hot_booked,
        ROUND(
          CASE WHEN COUNT(*) > 0
            THEN COUNT(*) FILTER (WHERE status = 'booked')::numeric / COUNT(*)::numeric * 100
            ELSE 0
          END,
          1
        ) AS hot_conversion_rate
      FROM inquiries
      WHERE created_at >= now() - interval '30 days'
        AND lead_tier = 'hot'
    `;

    // ── Daily volume (last 30 days) ────────────────────────
    const dailyVolume = await sql`
      SELECT
        date_trunc('day', created_at)::date AS day,
        COUNT(*)::int AS count,
        COUNT(*) FILTER (WHERE lead_tier = 'hot')::int AS hot
      FROM inquiries
      WHERE created_at >= now() - interval '30 days'
      GROUP BY date_trunc('day', created_at)
      ORDER BY day ASC
    `;

    // ── Top source pages ───────────────────────────────────
    const topSources = await sql`
      SELECT
        source_url,
        COUNT(*)::int AS count,
        ROUND(AVG(lead_score), 0)::int AS avg_score
      FROM inquiries
      WHERE created_at >= now() - interval '30 days'
        AND source_url IS NOT NULL
        AND source_url != ''
      GROUP BY source_url
      ORDER BY count DESC
      LIMIT 10
    `;

    // ── Budget distribution ────────────────────────────────
    const budgetDist = await sql`
      SELECT
        COALESCE(NULLIF(budget, ''), 'Not specified') AS budget_range,
        COUNT(*)::int AS count
      FROM inquiries
      WHERE created_at >= now() - interval '30 days'
      GROUP BY budget_range
      ORDER BY count DESC
    `;

    return NextResponse.json({
      period: '30d',
      metrics: {
        totalLeads: metrics.total_leads,
        hotLeads: metrics.hot_leads,
        warmLeads: metrics.warm_leads,
        coldLeads: metrics.cold_leads,
        booked: metrics.booked,
        replied: metrics.replied,
        closed: metrics.closed,
        open: metrics.open,
        avgScore: parseFloat(metrics.avg_score) || 0,
        conversionRate: parseFloat(metrics.conversion_rate) || 0,
        retreatLeads: metrics.retreat_leads,
        trekLeads: metrics.trek_leads,
      },
      hotConversion: {
        totalHot: hotConversion.total_hot,
        hotBooked: hotConversion.hot_booked,
        hotConversionRate: parseFloat(hotConversion.hot_conversion_rate) || 0,
      },
      dailyVolume,
      topSources,
      budgetDistribution: budgetDist,
      ts: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Analytics] Query error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
