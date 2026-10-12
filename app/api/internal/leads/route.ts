/**
 * GET /api/internal/leads — Server-paginated lead table with validated filters.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_STATUSES = ['open', 'replied', 'closed', 'booked'] as const;
const VALID_TIERS = ['Hot', 'Warm', 'Nurture', 'Early', 'Cold', 'Unscored', 'hot', 'warm', 'cold', 'nurture', 'early', 'unscored'] as const;
const VALID_VERTICALS = ['retreat', 'trek', 'yoga', 'art'] as const;
const VALID_YOGA_TYPES = ['rishikesh', 'custom', 'ttc'] as const;
const ISO_DATE = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}, 'Date must be a real calendar date');

const LeadsQuerySchema = z.object({
  tier: z.array(z.enum(VALID_TIERS)).transform((tiers) => tiers.map((tier) => tier.toLowerCase())).default([]),
  status: z.array(z.enum(VALID_STATUSES)).default([]),
  vertical: z.enum(VALID_VERTICALS).optional(),
  yogaType: z.enum(VALID_YOGA_TYPES).optional(),
  from: ISO_DATE.optional(),
  to: ISO_DATE.optional(),
  product: z.string().trim().max(200).optional(),
  location: z.string().trim().max(200).optional(),
  route: z.string().trim().max(100).optional(),
  source: z.string().trim().max(200).optional(),
  cta: z.string().trim().max(200).optional(),
  pagePath: z.string().trim().max(500).optional(),
  month: z.string().trim().max(50).optional(),
  q: z.string().trim().max(200).optional(),
  sort: z.enum(['score', 'date']).default('date'),
  order: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().min(1).max(1_000_000).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
}).superRefine((query, context) => {
  if (query.from && query.to && query.from > query.to) {
    context.addIssue({
      code: 'custom',
      path: ['to'],
      message: 'End date must be on or after start date',
    });
  }
});

type LeadsGetDependencies = {
  getDb: typeof getDb;
  hasDatabase: () => boolean;
};

function readCsvParam(
  params: URLSearchParams,
  key: string,
): string[] | undefined {
  const value = params.get(key);
  if (value === null) return undefined;
  return value.split(',').map((item) => item.trim());
}

function parseQuery(params: URLSearchParams) {
  return LeadsQuerySchema.safeParse({
    tier: readCsvParam(params, 'tier'),
    status: readCsvParam(params, 'status'),
    vertical: params.get('vertical') ?? undefined,
    yogaType: params.get('yogaType') ?? undefined,
    from: params.get('from') ?? undefined,
    to: params.get('to') ?? undefined,
    product: params.get('product') ?? undefined,
    location: params.get('location') ?? undefined,
    route: params.get('route') ?? undefined,
    source: params.get('source') ?? undefined,
    cta: params.get('cta') ?? undefined,
    pagePath: params.get('pagePath') ?? undefined,
    month: params.get('month') ?? undefined,
    q: params.get('q') ?? undefined,
    sort: params.get('sort') ?? undefined,
    order: params.get('order') ?? undefined,
    page: params.get('page') ?? undefined,
    limit: params.get('limit') ?? undefined,
  });
}

export function createLeadsGetHandler(
  dependencies: LeadsGetDependencies = {
    getDb,
    hasDatabase: () => Boolean(process.env.DATABASE_URL),
  },
) {
  return async function GET(request: NextRequest) {
    if (!dependencies.hasDatabase()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const parsedQuery = parseQuery(request.nextUrl.searchParams);
    if (!parsedQuery.success) {
      return NextResponse.json({ error: 'Invalid lead filters' }, { status: 400 });
    }
    const filters = parsedQuery.data;
    const sql = dependencies.getDb();

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
    const yogaTypeClause = filters.yogaType === 'ttc'
      ? sql`AND ${isTtc}`
      : filters.yogaType === 'rishikesh'
        ? sql`AND ${isYogaLead} AND LOWER(COALESCE(location, '')) = 'rishikesh' AND NOT ${isTtc}`
        : filters.yogaType === 'custom'
          ? sql`AND ${isYogaLead} AND NOT ${isTtc} AND (
              LOWER(COALESCE(product, '')) = 'other location'
              OR LOWER(COALESCE(category, '')) LIKE '%custom%'
              OR (LOWER(COALESCE(location, '')) <> '' AND LOWER(COALESCE(location, '')) <> 'rishikesh')
            )`
          : sql``;
    const tierClause = filters.tier.length > 0
      ? sql`AND LOWER(COALESCE(NULLIF(canonical_lead_tier, ''), NULLIF(lead_tier, ''), 'unscored')) = ANY(${filters.tier})`
      : sql``;
    const statusClause = filters.status.length > 0 ? sql`AND status = ANY(${filters.status})` : sql``;
    const verticalClause = filters.vertical ? sql`AND vertical = ${filters.vertical}` : sql``;
    const fromClause = filters.from ? sql`AND created_at >= ${filters.from}::date` : sql``;
    const toClause = filters.to
      ? sql`AND created_at < (${filters.to}::date + interval '1 day')`
      : sql``;
    const productClause = filters.product
      ? sql`AND (product_id = ${filters.product} OR (COALESCE(product_id, '') = '' AND product = ${filters.product}))`
      : sql``;
    const locationClause = filters.location ? sql`AND location = ${filters.location}` : sql``;
    const routeClause = filters.route
      ? sql`AND COALESCE(NULLIF(sales_route, ''), NULLIF(yoga_sales_route, '')) = ${filters.route}`
      : sql``;
    const sourceClause = filters.source
      ? sql`AND COALESCE(NULLIF(last_utm_source, ''), NULLIF(first_utm_source, ''), NULLIF(referrer, ''), NULLIF(source_url, '')) = ${filters.source}`
      : sql``;
    const ctaClause = filters.cta ? sql`AND cta_id = ${filters.cta}` : sql``;
    const pagePathClause = filters.pagePath
      ? sql`AND COALESCE(NULLIF(last_landing_page, ''), NULLIF(first_landing_page, ''), NULLIF(source_url, '')) = ${filters.pagePath}`
      : sql``;
    const monthClause = filters.month ? sql`AND month = ${filters.month}` : sql``;
    const searchClause = filters.q
      ? sql`AND (name ILIKE ${`%${filters.q}%`} OR email ILIKE ${`%${filters.q}%`})`
      : sql``;

    try {
      const filterOptionRows = await sql`
        SELECT DISTINCT NULLIF(BTRIM(month), '') AS month,
          NULLIF(BTRIM(product_id), '') AS product_id,
          NULLIF(BTRIM(product), '') AS product
        FROM inquiries
        ORDER BY month, product_id, product
        LIMIT 1000
      `;
      const filterOptions = {
        months: [...new Set(filterOptionRows.map((row) => row.month).filter(Boolean))],
        products: [...new Map(filterOptionRows
          .filter((row) => row.product_id || row.product)
          .map((row) => {
            const value = row.product_id || row.product;
            return [value, { value, label: row.product || row.product_id }];
          })).values()],
      };

      const countResult = await sql`
        SELECT COUNT(*)::int AS total
        FROM inquiries
        WHERE 1=1
          ${tierClause}
          ${statusClause}
          ${verticalClause}
          ${yogaTypeClause}
          ${fromClause}
          ${toClause}
          ${productClause}
          ${locationClause}
          ${routeClause}
          ${sourceClause}
          ${ctaClause}
          ${pagePathClause}
          ${monthClause}
          ${searchClause}
      `;
      const total = countResult[0]?.total ?? 0;
      const pages = Math.ceil(total / filters.limit);
      const page = Math.min(filters.page, pages || 1);
      const offset = (page - 1) * filters.limit;
      const primarySort = filters.sort === 'score' ? sql`lead_score` : sql`created_at`;
      const primaryOrder = filters.order === 'asc' ? sql`ASC` : sql`DESC`;
      const secondaryOrder = filters.sort === 'score'
        ? sql`created_at DESC, id ASC`
        : sql`id ASC`;

      const leads = await sql`
        SELECT
          id, lead_reference, name, email, phone, age, origin_city, origin_country,
          interest, interested_in, vertical, category, destination, location,
          product, product_id, departure, departure_id, departure_date, preferred_timing,
          preferred_date, month, planning_horizon, group_size, budget, duration,
          lead_score,
          COALESCE(NULLIF(canonical_lead_tier, ''), NULLIF(lead_tier, ''), 'unscored') AS lead_tier,
          sales_route, yoga_sales_route, status, source_url, referrer,
          first_landing_page, last_landing_page, page_title, page_type,
          first_utm_source, first_utm_medium, first_utm_campaign, first_utm_term,
          first_utm_content, first_utm_id, first_touch_at, last_utm_source,
          last_utm_medium, last_utm_campaign, last_utm_term, last_utm_content,
          last_utm_id, last_touch_at, cta_id, cta_position, cta_label, cta_variant,
          conversion_session_id, followup_count, last_followup_at, created_at,
          yoga_interest, yoga_classification,
          recommended_product, recommended_alternative, yoga_experience, booking_readiness
        FROM inquiries
        WHERE 1=1
          ${tierClause}
          ${statusClause}
          ${verticalClause}
          ${yogaTypeClause}
          ${fromClause}
          ${toClause}
          ${productClause}
          ${locationClause}
          ${routeClause}
          ${sourceClause}
          ${ctaClause}
          ${pagePathClause}
          ${monthClause}
          ${searchClause}
        ORDER BY ${primarySort} ${primaryOrder}, ${secondaryOrder}
        LIMIT ${filters.limit}
        OFFSET ${offset}
      `;

      return NextResponse.json({
        leads,
        filterOptions,
        pagination: {
          page,
          limit: filters.limit,
          total,
          pages,
        },
      });
    } catch (err) {
      console.error('[Admin:Leads] Query error:', err);
      return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
  };
}

export const GET = createLeadsGetHandler();
