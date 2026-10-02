/**
 * GET /api/internal/leads — Paginated lead table with filters
 *
 * Query params:
 *   tier      — hot | warm | cold (comma-separated for multi)
 *   status    — open | replied | closed | booked
 *   vertical  — retreat | trek
 *   yogaType  — rishikesh | custom | ttc
 *   month     — exact persisted month value
 *   product   — product_id, or product label when no product_id is stored
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
const VALID_TIERS = ['Hot', 'Warm', 'Nurture', 'Early', 'hot', 'warm', 'cold', 'unscored'];
const VALID_SORTS = ['score', 'date'];
const VALID_YOGA_TYPES = ['rishikesh', 'custom', 'ttc'];

export async function GET(request: NextRequest) {
  // Auth handled by proxy.ts — no additional check needed here

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const sql = getDb();
  const params = request.nextUrl.searchParams;

  // Parse filters
  const tierFilter = params.get('tier')?.split(',').filter(t => VALID_TIERS.includes(t)) || [];
  const statusFilter = params.get('status')?.split(',').filter(s => VALID_STATUSES.includes(s)) || [];
  const verticalFilter = params.get('vertical') || '';
  const yogaTypeFilter = VALID_YOGA_TYPES.includes(params.get('yogaType') || '') ? params.get('yogaType')! : '';
  const monthFilter = params.get('month')?.trim() || '';
  const productFilter = params.get('product')?.trim() || '';
  const search = params.get('q')?.trim() || '';
  const sort = VALID_SORTS.includes(params.get('sort') || '') ? params.get('sort')! : 'date';
  const order = params.get('order') === 'asc' ? 'asc' : 'desc';
  const page = Math.max(1, parseInt(params.get('page') || '1', 10));
  const limit = Math.min(200, Math.max(1, parseInt(params.get('limit') || '50', 10)));
  const offset = (page - 1) * limit;

  const isTtc = sql`(
    LOWER(COALESCE(yoga_interest, '')) = 'yoga ttc'
    OR LOWER(COALESCE(product_id, '')) = 'yoga-ttc'
    OR LOWER(COALESCE(product, '')) LIKE '%teacher training%'
  )`;
  const isYogaLead = sql`(
    COALESCE(yoga_interest, '') <> ''
    OR LOWER(COALESCE(product_id, '')) LIKE 'yoga-%'
    OR LOWER(COALESCE(category, '')) LIKE '%yoga%'
    OR LOWER(COALESCE(source_url, '')) LIKE '%yoga%'
  )`;
  const yogaTypeClause = yogaTypeFilter === 'ttc'
    ? sql`AND ${isTtc}`
    : yogaTypeFilter === 'rishikesh'
      ? sql`AND ${isYogaLead} AND LOWER(COALESCE(location, '')) = 'rishikesh' AND NOT ${isTtc}`
      : yogaTypeFilter === 'custom'
        ? sql`AND ${isYogaLead} AND NOT ${isTtc} AND (
            LOWER(COALESCE(product, '')) = 'other location'
            OR LOWER(COALESCE(category, '')) LIKE '%custom%'
            OR (LOWER(COALESCE(location, '')) <> '' AND LOWER(COALESCE(location, '')) <> 'rishikesh')
          )`
        : sql``;
  const monthClause = monthFilter ? sql`AND month = ${monthFilter}` : sql``;
  const productClause = productFilter
    ? sql`AND (product_id = ${productFilter} OR (COALESCE(product_id, '') = '' AND product = ${productFilter}))`
    : sql``;
  try {
    const yogaFilterOptions = await sql`
    SELECT DISTINCT NULLIF(BTRIM(month), '') AS month,
      NULLIF(BTRIM(product_id), '') AS product_id,
      NULLIF(BTRIM(product), '') AS product
    FROM inquiries
    WHERE ${isYogaLead}
    ORDER BY month, product_id, product
  `;
    const filterOptions = {
      months: [...new Set(yogaFilterOptions.map((row) => row.month).filter(Boolean))],
      products: [...new Map(yogaFilterOptions
        .filter((row) => row.product_id || row.product)
        .map((row) => {
          const value = row.product_id || row.product;
          return [value, { value, label: row.product || row.product_id }];
        })).values()],
    };

    // Build dynamic query using Neon tagged templates
    // We use conditional fragments with the tagged template
    const rows = await sql`
      SELECT
        id, name, email, phone, yoga_interest, product, product_id, departure_id, yoga_classification, yoga_sales_route, recommended_product, recommended_alternative, interested_in, location, month, preferred_date, planning_horizon, group_size, budget,
        duration, yoga_experience, booking_readiness,
        source_url, vertical, category, lead_score, lead_tier, status,
        followup_count, last_followup_at, created_at
      FROM inquiries
      WHERE 1=1
        ${tierFilter.length > 0 ? sql`AND lead_tier = ANY(${tierFilter})` : sql``}
        ${statusFilter.length > 0 ? sql`AND status = ANY(${statusFilter})` : sql``}
        ${verticalFilter ? sql`AND vertical = ${verticalFilter}` : sql``}
        ${yogaTypeClause}
        ${monthClause}
        ${productClause}
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
        ${yogaTypeClause}
        ${monthClause}
        ${productClause}
        ${search ? sql`AND (name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'})` : sql``}
    `;

    const total = countResult[0]?.total ?? 0;

    return NextResponse.json({
      leads: rows,
      filterOptions,
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
