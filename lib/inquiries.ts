/**
 * Inquiry Storage — Neon Postgres
 *
 * Stores each inquiry in the `inquiries` table.
 * Returns the persisted UUID and database-generated lead reference for
 * downstream event correlation.
 */

import { createHash } from 'node:crypto';
import { getDb } from './db';
import { normalizeConversionEvent, type ConversionEvent } from './conversion-events';

const IDEMPOTENCY_WINDOW_MS = 10 * 60 * 1000;

interface InsertInquiryDependencies {
  databaseUrl?: string | null;
  expectedBranchId?: string | null;
  getDb?: typeof getDb;
}

export interface Inquiry {
  name: string;
  email?: string | null;
  phone: string;
  yogaInterest: string;
  product: string;
  productId: string;
  departureId: string;
  planningHorizon: string;
  interestedIn: 'trek' | 'retreat' | '';
  location: string;
  month: string;
  preferredDate: string;
  groupSize: string;
  budget: string;
  duration: string;
  yogaExperience: string;
  experience?: string | null;
  bookingReadiness: string;
  yogaClassification: string;
  yogaSalesRoute: string;
  recommendedProduct: string;
  recommendedAlternative: string;
  source: string;
  vertical: string;
  category: string;
  trek: string;
  timestamp: string;
  age?: number | string | null;
  originCity?: string | null;
  originCountry?: string | null;
  interest?: string | null;
  preferredTiming?: string | null;
  destination?: string | null;
  departure?: string | null;
  departureDate?: string | null;
  additionalRequest?: string | null;
  leadReference?: string | null;
  conversionSessionId?: string | null;
  firstLandingPage?: string | null;
  lastLandingPage?: string | null;
  pageTitle?: string | null;
  pageType?: string | null;
  ctaId?: string | null;
  ctaPosition?: string | null;
  ctaLabel?: string | null;
  ctaVariant?: string | null;
  referrer?: string | null;
  firstUtmSource?: string | null;
  firstUtmMedium?: string | null;
  firstUtmCampaign?: string | null;
  firstUtmTerm?: string | null;
  firstUtmContent?: string | null;
  firstUtmId?: string | null;
  lastUtmSource?: string | null;
  lastUtmMedium?: string | null;
  lastUtmCampaign?: string | null;
  lastUtmTerm?: string | null;
  lastUtmContent?: string | null;
  lastUtmId?: string | null;
  firstTouchAt?: string | null;
  lastTouchAt?: string | null;
  idempotencyKey?: string | null;
  canonicalLeadTier?: string | null;
  salesRoute?: string | null;
}

export function normalizeCanonicalLeadTier(value?: string | null): string | null {
  const cleaned = value?.toString().trim().toLowerCase();
  if (!cleaned) return null;
  if (['hot', 'warm', 'nurture', 'early'].includes(cleaned)) return cleaned;
  return null;
}

export function normalizeLegacyLeadTier(value?: string | null): string | null {
  const cleaned = value?.toString().trim();
  if (!cleaned) return null;
  const lower = cleaned.toLowerCase();
  if (['hot', 'warm', 'nurture', 'early', 'cold', 'unscored'].includes(lower)) return lower;
  return lower || null;
}

function normalizeIdempotencyKey(value?: string | null): string | null {
  if (!value || !value.trim()) return null;
  return value.trim().slice(0, 128);
}

function normalizeFingerprintValue(value: unknown, key: string): string {
  if (typeof value === 'number') return String(value);
  if (typeof value !== 'string') return '';
  if (key === 'phone') return value.replace(/[^\d+]/g, '');
  const normalized = value.trim().toLowerCase();
  return key === 'source' ? normalized.split('?')[0].split('#')[0] : normalized;
}

export function createInquiryPayloadFingerprint(inquiry: Inquiry): string {
  const fields = [
    'name',
    'email',
    'phone',
    'age',
    'originCity',
    'originCountry',
    'interest',
    'preferredTiming',
    'destination',
    'departure',
    'departureDate',
    'additionalRequest',
    'yogaInterest',
    'product',
    'productId',
    'departureId',
    'planningHorizon',
    'interestedIn',
    'location',
    'month',
    'preferredDate',
    'groupSize',
    'budget',
    'duration',
    'yogaExperience',
    'experience',
    'bookingReadiness',
    'source',
    'vertical',
    'category',
    'trek',
    'pageType',
    'ctaId',
    'ctaPosition',
    'ctaLabel',
    'ctaVariant',
    'salesRoute',
  ] as const;
  const normalized = Object.fromEntries(fields.map((field) => [
    field,
    normalizeFingerprintValue(inquiry[field], field),
  ]));
  return createHash('sha256').update(JSON.stringify(normalized)).digest('hex');
}

export function generateIdempotencyKey(inquiry: Pick<
  Inquiry,
  | 'name'
  | 'phone'
  | 'email'
  | 'source'
  | 'product'
  | 'productId'
  | 'location'
  | 'departureId'
  | 'departureDate'
  | 'preferredDate'
  | 'month'
  | 'interest'
  | 'originCity'
  | 'originCountry'
  | 'groupSize'
  | 'preferredTiming'
  | 'duration'
  | 'experience'
  | 'budget'
  | 'additionalRequest'
>, nowMs: number = Date.now()): string {
  const raw = [
    inquiry.name,
    inquiry.phone,
    inquiry.email,
    inquiry.source,
    inquiry.product,
    inquiry.productId,
    inquiry.location,
    inquiry.departureId,
    inquiry.departureDate,
    inquiry.preferredDate,
    inquiry.month,
    inquiry.interest,
    inquiry.originCity,
    inquiry.originCountry,
    inquiry.groupSize,
    inquiry.preferredTiming,
    inquiry.duration,
    inquiry.experience,
    inquiry.budget,
    inquiry.additionalRequest,
  ].map((value, index) => normalizeFingerprintValue(value, index === 3 ? 'source' : ''));

  const window = Math.floor(nowMs / IDEMPOTENCY_WINDOW_MS);
  return createHash('sha256').update(JSON.stringify({ inquiry: raw, window })).digest('hex');
}

export function deriveCanonicalLeadTier(value?: string | null, fallbackScore?: number): string | null {
  const normalized = normalizeCanonicalLeadTier(value);
  if (normalized) return normalized;

  if (typeof fallbackScore === 'number') {
    if (fallbackScore >= 75) return 'hot';
    if (fallbackScore >= 50) return 'warm';
    if (fallbackScore >= 25) return 'nurture';
    if (fallbackScore >= 0) return 'early';
  }

  const legacy = normalizeLegacyLeadTier(value);
  if (legacy === 'hot') return 'hot';
  if (legacy === 'warm') return 'warm';
  if (legacy === 'nurture') return 'nurture';
  if (legacy === 'early') return 'early';
  return null;
}

/**
 * Insert inquiry into Postgres, returning the existing row for an idempotent
 * duplicate instead of creating a second lead.
 */
export async function insertInquiry(
  inquiry: Inquiry,
  leadScore: number = 0,
  leadTier: string = 'unscored',
  requiredEvents: ConversionEvent[] = [],
  dependencies: InsertInquiryDependencies = {},
): Promise<{
  status: 'inserted' | 'duplicate' | 'conflict';
  inquiryId: string;
  leadReference: string | null;
}> {
  const databaseUrl = dependencies.databaseUrl === undefined
    ? process.env.DATABASE_URL
    : dependencies.databaseUrl;
  if (!databaseUrl) {
    throw new Error('Inquiry database is not configured');
  }

  const sql = (dependencies.getDb ?? getDb)();
  const payloadFingerprint = createInquiryPayloadFingerprint(inquiry);
  const normalizedLeadTier = normalizeLegacyLeadTier(leadTier) ?? 'unscored';
  const canonicalLeadTier = deriveCanonicalLeadTier(inquiry.canonicalLeadTier ?? null, leadScore) ?? normalizeCanonicalLeadTier(normalizedLeadTier) ?? null;
  // Token-less legacy callers retain the existing ten-minute fingerprint fallback.
  const idempotencyKey = normalizeIdempotencyKey(inquiry.idempotencyKey) ?? generateIdempotencyKey({
    name: inquiry.name,
    phone: inquiry.phone ?? null,
    email: inquiry.email ?? null,
    source: inquiry.source,
    product: inquiry.product,
    productId: inquiry.productId,
    location: inquiry.location,
    departureId: inquiry.departureId,
    departureDate: inquiry.departureDate ?? null,
    preferredDate: inquiry.preferredDate,
    month: inquiry.month,
    interest: inquiry.interest ?? null,
    originCity: inquiry.originCity ?? null,
    originCountry: inquiry.originCountry ?? null,
    groupSize: inquiry.groupSize,
    preferredTiming: inquiry.preferredTiming ?? null,
    duration: inquiry.duration,
    experience: inquiry.experience ?? null,
    budget: inquiry.budget,
    additionalRequest: inquiry.additionalRequest ?? null,
  });

  const insertQuery = sql`
    INSERT INTO inquiries (
      name, email, phone, age, yoga_interest, product, product_id, departure_id,
      yoga_classification, yoga_sales_route, recommended_product,
      recommended_alternative, interested_in, location, month, preferred_date,
      planning_horizon, group_size, budget, duration, yoga_experience,
      booking_readiness, source_url, vertical, category, lead_score, lead_tier,
      origin_city, origin_country, interest, preferred_timing, destination,
      departure, departure_date, additional_request, lead_reference,
      conversion_session_id, first_landing_page, last_landing_page, page_title,
      page_type, cta_id, cta_position, cta_label, cta_variant, referrer,
      first_utm_source, first_utm_medium, first_utm_campaign, first_utm_term,
      first_utm_content, first_utm_id, last_utm_source, last_utm_medium, last_utm_campaign,
      last_utm_term, last_utm_content, last_utm_id, first_touch_at, last_touch_at,
      idempotency_key, canonical_lead_tier, idempotency_payload_hash, sales_route
    )
    VALUES (
      ${inquiry.name},
      ${inquiry.email ?? null},
      ${inquiry.phone ?? null},
      ${inquiry.age !== undefined && inquiry.age !== null ? Number(inquiry.age) : null},
      ${inquiry.yogaInterest},
      ${inquiry.product},
      ${inquiry.productId},
      ${inquiry.departureId},
      ${inquiry.yogaClassification},
      ${inquiry.yogaSalesRoute},
      ${inquiry.recommendedProduct},
      ${inquiry.recommendedAlternative},
      ${inquiry.interestedIn},
      ${inquiry.location},
      ${inquiry.month},
      ${inquiry.preferredDate},
      ${inquiry.planningHorizon},
      ${inquiry.groupSize},
      ${inquiry.budget},
      ${inquiry.duration},
      ${inquiry.experience || inquiry.yogaExperience},
      ${inquiry.bookingReadiness},
      ${inquiry.source},
      ${inquiry.vertical},
      ${inquiry.category || inquiry.trek},
      ${leadScore},
      ${normalizedLeadTier},
      ${inquiry.originCity ?? null},
      ${inquiry.originCountry ?? null},
      ${inquiry.interest ?? null},
      ${inquiry.preferredTiming ?? null},
      ${inquiry.destination ?? null},
      ${inquiry.departure ?? null},
      ${inquiry.departureDate ?? null},
      ${inquiry.additionalRequest ?? null},
      next_lead_reference(current_date),
      ${inquiry.conversionSessionId ?? null},
      ${inquiry.firstLandingPage ?? null},
      ${inquiry.lastLandingPage ?? null},
      ${inquiry.pageTitle ?? null},
      ${inquiry.pageType ?? null},
      ${inquiry.ctaId ?? null},
      ${inquiry.ctaPosition ?? null},
      ${inquiry.ctaLabel ?? null},
      ${inquiry.ctaVariant ?? null},
      ${inquiry.referrer ?? null},
      ${inquiry.firstUtmSource ?? null},
      ${inquiry.firstUtmMedium ?? null},
      ${inquiry.firstUtmCampaign ?? null},
      ${inquiry.firstUtmTerm ?? null},
      ${inquiry.firstUtmContent ?? null},
      ${inquiry.firstUtmId ?? null},
      ${inquiry.lastUtmSource ?? null},
      ${inquiry.lastUtmMedium ?? null},
      ${inquiry.lastUtmCampaign ?? null},
      ${inquiry.lastUtmTerm ?? null},
      ${inquiry.lastUtmContent ?? null},
      ${inquiry.lastUtmId ?? null},
      ${inquiry.firstTouchAt ?? null},
      ${inquiry.lastTouchAt ?? null},
      ${idempotencyKey},
      ${canonicalLeadTier},
      ${payloadFingerprint},
      ${inquiry.salesRoute ?? null}
    )
    ON CONFLICT (idempotency_key) DO NOTHING
    RETURNING id, lead_reference
  `;

  const eventQueries = requiredEvents.map((event) => {
    const normalized = normalizeConversionEvent(event);
    if (!normalized) {
      throw new Error(`Invalid required conversion event: ${event.eventType}`);
    }

    return sql`
      INSERT INTO conversion_events (
        event_type, inquiry_id, conversion_session_id, source_url, page_path,
        page_type, vertical, category, cta_id, cta_position, cta_label,
        cta_variant, lead_reference, ip_hash, user_agent, event_idempotency_key, meta
      )
      SELECT
        ${normalized.eventType}, persisted.id, ${normalized.conversionSessionId ?? null},
        ${normalized.sourceUrl ?? null}, ${normalized.pagePath ?? null},
        ${normalized.pageType ?? null}, ${normalized.vertical ?? null},
        ${normalized.category ?? null}, ${normalized.ctaId ?? null},
        ${normalized.ctaPosition ?? null}, ${normalized.ctaLabel ?? null},
        ${normalized.ctaVariant ?? null}, persisted.lead_reference,
        ${normalized.ipHash ?? null}, ${normalized.userAgent ?? null},
        'inquiry:' || persisted.id::text || ':' || ${normalized.eventType},
        ${JSON.stringify(normalized.meta ?? {})}
      FROM inquiries AS persisted
      WHERE persisted.idempotency_key = ${idempotencyKey}
        AND persisted.idempotency_payload_hash = ${payloadFingerprint}
      ON CONFLICT (event_idempotency_key)
        WHERE event_idempotency_key IS NOT NULL
      DO NOTHING
    `;
  });

  const existingQuery = sql`
    SELECT id, lead_reference, idempotency_payload_hash
    FROM inquiries
    WHERE idempotency_key = ${idempotencyKey}
    LIMIT 1
  `;
  const expectedBranchId = dependencies.expectedBranchId === undefined
    ? process.env.NEON_EXPECTED_BRANCH_ID
    : dependencies.expectedBranchId;
  const branchGuard = expectedBranchId
    ? [sql`
        SELECT 1 / CASE
          WHEN current_setting('neon.branch_id', true) = ${expectedBranchId} THEN 1
          ELSE 0
        END AS branch_guard
      `]
    : [];
  const transactionResults = await sql.transaction([...branchGuard, insertQuery, ...eventQueries, existingQuery]);
  const resultOffset = branchGuard.length;
  const insertedRows = transactionResults[resultOffset] ?? [];

  if (insertedRows[0]?.id) {
    return {
      status: 'inserted',
      inquiryId: String(insertedRows[0].id),
      leadReference: typeof insertedRows[0].lead_reference === 'string' ? insertedRows[0].lead_reference : null,
    };
  }

  const existingRows = transactionResults[resultOffset + eventQueries.length + 1] ?? [];
  if (existingRows[0]?.id) {
    const storedFingerprint = typeof existingRows[0].idempotency_payload_hash === 'string'
      ? existingRows[0].idempotency_payload_hash
      : null;
    return {
      status: storedFingerprint && storedFingerprint !== payloadFingerprint ? 'conflict' : 'duplicate',
      inquiryId: String(existingRows[0].id),
      leadReference: typeof existingRows[0].lead_reference === 'string' ? existingRows[0].lead_reference : null,
    };
  }

  throw new Error('Inquiry insert did not return a persisted row');
}
