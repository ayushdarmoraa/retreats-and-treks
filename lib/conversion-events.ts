/**
 * Conversion Event Logger — Neon Postgres
 *
 * Tracks submission success, validation failure, and durable funnel events.
 * Falls back to console.log/JSONL-safe no-op if DATABASE_URL is not set.
 */

import { getDb } from './db';

export const DURABLE_EVENT_TYPES = [
  'conversion_cta_view',
  'conversion_cta_click',
  'lead_capture_open',
  'lead_capture_step_view',
  'lead_capture_step_complete',
  'lead_capture_abandon',
  'lead_submitted',
  'whatsapp_handoff',
  'phone_click',
  'page_view',
  'topic_to_pillar',
  'blog_to_journey',
  'comparison_to_journey',
  'pillar_to_journey',
  'matrix_to_journey',
  'form_submission',
  'scroll_depth',
  'faq_expand',
  'comparison_sort',
  'comparison_filter',
  'finder_complete',
  'availability_form_submit',
  'departure_table_click',
  'calendar_filter',
  'micro_save',
  'micro_share',
  'micro_download',
  'yoga_form_completion',
  'yoga_finder_start',
  'yoga_finder_recommendation',
  'yoga_departure_selection',
] as const;

export const LEGACY_EVENT_TYPES = [
  'inquiry_submitted',
  'inquiry_validation_failed',
  'inquiry_spam_blocked',
  'inquiry_email_sent',
  'inquiry_email_failed',
  'status_change',
  'followup_sent',
] as const;

export type DurableConversionEventType = (typeof DURABLE_EVENT_TYPES)[number];
export type LegacyConversionEventType = (typeof LEGACY_EVENT_TYPES)[number];
export type ConversionEventType = DurableConversionEventType | LegacyConversionEventType;

export interface ConversionEvent {
  eventType: ConversionEventType;
  inquiryId?: string | null;
  conversionSessionId?: string | null;
  sourceUrl?: string;
  pagePath?: string;
  pageType?: string;
  vertical?: string;
  category?: string;
  ctaId?: string | null;
  ctaPosition?: string | null;
  ctaLabel?: string | null;
  ctaVariant?: string | null;
  leadReference?: string | null;
  ipHash?: string;
  userAgent?: string;
  meta?: Record<string, unknown>;
}

export interface TrackPayloadLike {
  event: string;
  from?: string;
  to?: string;
  meta?: Record<string, unknown>;
}

export type ConversionEventPersistenceResult = 'persisted' | 'deduplicated' | 'unavailable' | 'failed';

export interface ConversionEventPersistenceDependencies {
  databaseUrl?: string | null;
  getDb?: typeof getDb;
  expectedBranchId?: string | null;
}

const CTA_VIEW_DEDUPE_WINDOW_MS = 15 * 60 * 1000;
const CTA_VIEW_DEDUPE_KEYS = new Map<string, number>();

function sanitizeText(value: unknown, maxLength = 500): string | undefined {
  if (typeof value !== 'string') return undefined;
  const cleaned = value.trim();
  if (!cleaned) return undefined;
  return cleaned.slice(0, maxLength);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isPiiMetaKey(key: string): boolean {
  const normalized = key.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  return /(^|_)(email|phone|mobile|telephone|message|enquiry|address)(_|$)/.test(normalized)
    || /^(name|first_name|last_name|full_name|user_name|customer_name|contact_name|visitor_name|person_name|participant_name|guest_name|age|dob|date_of_birth|birth_date|origin_city|origin_country)$/.test(normalized);
}

function sanitizeMetaValue(value: unknown): unknown {
  if (typeof value === 'string') return sanitizeText(value, 2000);
  if (typeof value === 'number' || typeof value === 'boolean' || value === null) return value;
  if (Array.isArray(value)) {
    return value
      .map(sanitizeMetaValue)
      .filter((item) => item !== undefined);
  }
  if (isRecord(value)) {
    const next: Record<string, unknown> = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      if (isPiiMetaKey(key)) continue;
      const cleaned = sanitizeMetaValue(nestedValue);
      if (cleaned !== undefined) next[key] = cleaned;
    }
    return next;
  }
  return undefined;
}

export function sanitizeConversionEventMeta(
  value: Record<string, unknown> | undefined,
): Record<string, unknown> {
  const sanitized = sanitizeMetaValue(value);
  return isRecord(sanitized) ? sanitized : {};
}

function normalizePagePath(value: string | undefined): string | undefined {
  const candidate = sanitizeText(value, 500);
  if (!candidate) return undefined;
  return candidate.startsWith('/') ? candidate : `/${candidate}`;
}

function isDurableEventType(value: unknown): value is ConversionEventType {
  if (typeof value !== 'string') return false;
  const normalized = value.trim();
  return [...DURABLE_EVENT_TYPES, ...LEGACY_EVENT_TYPES].includes(normalized as ConversionEventType);
}

function normalizeEventType(value: unknown): ConversionEventType | null {
  if (!isDurableEventType(value)) return null;
  return value.trim() as ConversionEventType;
}

export function shouldRecordCtaView(event: Pick<ConversionEvent, 'eventType' | 'conversionSessionId' | 'pagePath' | 'ctaId' | 'ctaPosition' | 'vertical' | 'category'>): boolean {
  if (event.eventType !== 'conversion_cta_view') return true;

  const dedupeKey = [
    event.conversionSessionId ?? 'anonymous',
    event.pagePath ?? '/',
    event.ctaId ?? 'missing-cta',
    event.ctaPosition ?? 'unknown',
    event.vertical ?? '',
    event.category ?? '',
  ].join('|');

  const now = Date.now();
  const lastSeen = CTA_VIEW_DEDUPE_KEYS.get(dedupeKey);
  if (lastSeen && now - lastSeen < CTA_VIEW_DEDUPE_WINDOW_MS) {
    return false;
  }

  CTA_VIEW_DEDUPE_KEYS.set(dedupeKey, now);
  return true;
}

export function normalizeConversionEvent(event: ConversionEvent): ConversionEvent | null {
  const eventType = normalizeEventType(event.eventType);
  if (!eventType) return null;

  const normalized: ConversionEvent = {
    eventType,
    inquiryId: sanitizeText(event.inquiryId ?? undefined, 100) || undefined,
    conversionSessionId: sanitizeText(event.conversionSessionId ?? undefined, 200) || undefined,
    sourceUrl: sanitizeText(event.sourceUrl ?? undefined, 1000),
    pagePath: normalizePagePath(event.pagePath),
    pageType: sanitizeText(event.pageType ?? undefined, 100),
    vertical: sanitizeText(event.vertical ?? undefined, 100),
    category: sanitizeText(event.category ?? undefined, 100),
    ctaId: sanitizeText(event.ctaId ?? undefined, 200) || undefined,
    ctaPosition: sanitizeText(event.ctaPosition ?? undefined, 100) || undefined,
    ctaLabel: sanitizeText(event.ctaLabel ?? undefined, 200) || undefined,
    ctaVariant: sanitizeText(event.ctaVariant ?? undefined, 100) || undefined,
    leadReference: sanitizeText(event.leadReference ?? undefined, 100) || undefined,
    ipHash: sanitizeText(event.ipHash ?? undefined, 128) || undefined,
    userAgent: sanitizeText(event.userAgent ?? undefined, 500) || undefined,
    meta: sanitizeConversionEventMeta(event.meta),
  };

  return normalized;
}

export function toDurableConversionEvent(payload: TrackPayloadLike): ConversionEvent | null {
  const meta = sanitizeConversionEventMeta(payload.meta);
  const fromPath = normalizePagePath(payload.from);
  const toPath = normalizePagePath(typeof payload.to === 'string' ? payload.to : undefined);
  const conversionSessionId = sanitizeText(meta.conversion_session_id ?? meta.conversionSessionId ?? undefined, 200) || undefined;
  const ctaId = sanitizeText((meta.cta_id ?? meta.ctaId ?? meta.cta ?? undefined) as string | undefined, 200) || undefined;
  const ctaPosition = sanitizeText((meta.cta_position ?? meta.ctaPosition ?? meta.position ?? undefined) as string | undefined, 100) || undefined;
  const ctaLabel = sanitizeText((meta.cta_label ?? meta.ctaLabel ?? meta.label ?? undefined) as string | undefined, 200) || undefined;
  const ctaVariant = sanitizeText((meta.cta_variant ?? meta.ctaVariant ?? meta.variant ?? undefined) as string | undefined, 100) || undefined;
  const vertical = sanitizeText((meta.vertical ?? meta.category_name ?? undefined) as string | undefined, 100) || undefined;
  const category = sanitizeText((meta.category ?? meta.subject ?? undefined) as string | undefined, 100) || undefined;
  const pageType = sanitizeText((meta.page_type ?? meta.pageType ?? undefined) as string | undefined, 100) || undefined;

  const eventTypeForPayload = payload.event.trim();
  const mapping: Record<string, ConversionEventType> = {
    cta_click: 'conversion_cta_click',
    sticky_cta_click: 'conversion_cta_click',
    cta_view: 'conversion_cta_view',
    form_start: 'lead_capture_open',
    lead_capture_open: 'lead_capture_open',
    lead_capture_step_view: 'lead_capture_step_view',
    lead_capture_step_complete: 'lead_capture_step_complete',
    lead_capture_abandon: 'lead_capture_abandon',
    yoga_form_open: 'lead_capture_open',
    whatsapp_click: 'whatsapp_handoff',
    yoga_whatsapp_click: 'whatsapp_handoff',
    phone_click: 'phone_click',
    departure_table_click: 'conversion_cta_click',
  };

  const candidate = mapping[eventTypeForPayload] ?? (
    (DURABLE_EVENT_TYPES as readonly string[]).includes(eventTypeForPayload)
      ? eventTypeForPayload as DurableConversionEventType
      : null
  );
  if (!candidate) return null;
  const rawLeadReference = meta.lead_reference ?? meta.leadReference;
  const leadReference = candidate === 'whatsapp_handoff' && typeof rawLeadReference === 'string'
    ? sanitizeText(rawLeadReference, 100)
    : undefined;

  const event: ConversionEvent = {
    eventType: candidate,
    conversionSessionId,
    ...(leadReference && /^RT-\d{6}-\d{4,}$/.test(leadReference) ? { leadReference } : {}),
    sourceUrl: sanitizeText(payload.from, 1000),
    pagePath: fromPath,
    pageType,
    vertical,
    category,
    ctaId,
    ctaPosition,
    ctaLabel,
    ctaVariant,
    meta: {
      ...meta,
      ...(toPath ? { destination_path: toPath } : {}),
    },
  };

  return normalizeConversionEvent(event);
}

export async function persistConversionEvent(
  event: ConversionEvent,
  dependencies: ConversionEventPersistenceDependencies = {},
): Promise<ConversionEventPersistenceResult> {
  const normalized = normalizeConversionEvent(event);
  if (!normalized) return 'failed';

  if (normalized.eventType === 'conversion_cta_view' && !shouldRecordCtaView(normalized)) {
    return 'deduplicated';
  }

  try {
    const databaseUrl = dependencies.databaseUrl === undefined
      ? process.env.DATABASE_URL
      : dependencies.databaseUrl;
    if (!databaseUrl) return 'unavailable';

    const sql = (dependencies.getDb ?? getDb)();
    if (normalized.eventType === 'whatsapp_handoff' && normalized.leadReference) {
      const matchingLeads = await sql`
        SELECT id, lead_reference
        FROM inquiries
        WHERE lead_reference = ${normalized.leadReference}
        LIMIT 1
      `;
      const matchingLead = matchingLeads[0];
      if (matchingLead?.id && matchingLead.lead_reference === normalized.leadReference) {
        normalized.inquiryId = String(matchingLead.id);
        normalized.leadReference = String(matchingLead.lead_reference);
      } else {
        normalized.inquiryId = undefined;
        normalized.leadReference = undefined;
        if (normalized.meta) {
          delete normalized.meta.lead_reference;
          delete normalized.meta.leadReference;
        }
      }
    }

    const insertQuery = sql`
      INSERT INTO conversion_events (
        event_type,
        inquiry_id,
        conversion_session_id,
        source_url,
        page_path,
        page_type,
        vertical,
        category,
        cta_id,
        cta_position,
        cta_label,
        cta_variant,
        lead_reference,
        ip_hash,
        user_agent,
        meta
      )
      VALUES (
        ${normalized.eventType},
        ${normalized.inquiryId ?? null},
        ${normalized.conversionSessionId ?? null},
        ${normalized.sourceUrl ?? null},
        ${normalized.pagePath ?? null},
        ${normalized.pageType ?? null},
        ${normalized.vertical ?? null},
        ${normalized.category ?? null},
        ${normalized.ctaId ?? null},
        ${normalized.ctaPosition ?? null},
        ${normalized.ctaLabel ?? null},
        ${normalized.ctaVariant ?? null},
        ${normalized.leadReference ?? null},
        ${normalized.ipHash ?? null},
        ${normalized.userAgent ?? null},
        ${JSON.stringify(normalized.meta ?? {})}
      )
    `;
    const expectedBranchId = dependencies.expectedBranchId === undefined
      ? process.env.NEON_EXPECTED_BRANCH_ID
      : dependencies.expectedBranchId;
    if (expectedBranchId) {
      await sql.transaction([
        sql`
          SELECT 1 / CASE
            WHEN current_setting('neon.branch_id', true) = ${expectedBranchId} THEN 1
            ELSE 0
          END AS branch_guard
        `,
        insertQuery,
      ]);
    } else {
      await insertQuery;
    }
    return 'persisted';
  } catch {
    console.error('[ConversionEvent] Durable write failed');
    return 'failed';
  }
}

export async function logConversionEvent(event: ConversionEvent): Promise<void> {
  const result = await persistConversionEvent(event);
  if (result === 'failed' || result === 'unavailable') {
    throw new Error('Durable conversion event persistence failed');
  }
}
