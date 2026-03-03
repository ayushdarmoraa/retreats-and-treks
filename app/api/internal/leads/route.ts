/**
 * GET /api/internal/leads — Paginated lead table with filters
 *
 * Query params:
 *   tier      — hot | warm | cold (comma-separated for multi)
 *   status    — open | replied | closed | booked
 *   vertical  — retreat | trek
 *   sort      — score | date (default: date)
 *   order     — asc | desc (default: desc)
 *   page      — 1-based page number
 *   limit     — rows per page (default: 50, max: 200)
 *   q         — search name or email
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_STATUSES = ['open', 'replied', 'closed', 'booked'];
const VALID_TIERS = ['hot', 'warm', 'cold', 'unscored'];
const VALID_SORTS = ['score', 'date'];

export async function GET(request: NextRequest) {
  // Auth handled by middleware.ts — no additional check needed here

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const sql = getDb();
  const params = request.nextUrl.searchParams;

  // Parse filters
  const tierFilter = params.get('tier')?.split(',').filter(t => VALID_TIERS.includes(t)) || [];
  const statusFilter = params.get('status')?.split(',').filter(s => VALID_STATUSES.includes(s)) || [];
  const verticalFilter = params.get('vertical') || '';
  const search = params.get('q')?.trim() || '';
  const sort = VALID_SORTS.includes(params.get('sort') || '') ? params.get('sort')! : 'date';
  const order = params.get('order') === 'asc' ? 'asc' : 'desc';
  const page = Math.max(1, parseInt(params.get('page') || '1', 10));
  const limit = Math.min(200, Math.max(1, parseInt(params.get('limit') || '50', 10)));
  const offset = (page - 1) * limit;

  try {
    // Build dynamic query using Neon tagged templates
    // We use conditional fragments with the tagged template
    const rows = await sql`
      SELECT
        id, name, email, interested_in, location, month, group_size, budget,
        source_url, vertical, category, lead_score, lead_tier, status,
        followup_count, last_followup_at, created_at
      FROM inquiries
      WHERE 1=1
        ${tierFilter.length > 0 ? sql`AND lead_tier = ANY(${tierFilter})` : sql``}
        ${statusFilter.length > 0 ? sql`AND status = ANY(${statusFilter})` : sql``}
        ${verticalFilter ? sql`AND vertical = ${verticalFilter}` : sql``}
        ${search ? sql`AND (name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'})` : sql``}
      ORDER BY
        ${sort === 'score' ? sql`lead_score` : sql`created_at`}
        ${order === 'desc' ? sql`DESC` : sql`ASC`}
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    // Total count for pagination
    const countResult = await sql`
      SELECT COUNT(*)::int as total
      FROM inquiries
      WHERE 1=1
        ${tierFilter.length > 0 ? sql`AND lead_tier = ANY(${tierFilter})` : sql``}
        ${statusFilter.length > 0 ? sql`AND status = ANY(${statusFilter})` : sql``}
        ${verticalFilter ? sql`AND vertical = ${verticalFilter}` : sql``}
        ${search ? sql`AND (name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'})` : sql``}
    `;

    const total = countResult[0]?.total ?? 0;

    return NextResponse.json({
      leads: rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('[Admin:Leads] Query error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
