/**
 * Conversion + Behavioral Telemetry API — POST /api/track
 *
 * Receives all instrumented events and appends to data/events.jsonl.
 * No PII collected. Only structural interaction data.
 *
 * Navigation events:
 *   topic_to_pillar         — /topics/[topic] → /retreats/himalayan-retreats
 *   blog_to_journey         — /blog/[slug]    → /retreats/journeys/[slug]
 *   comparison_to_journey   — /compare/[pair] → /retreats/journeys/[slug]
 *   pillar_to_journey       — /retreats/himalayan-retreats → /retreats/journeys/[slug]
 *   matrix_to_journey       — /retreat-programs → /retreats/journeys/[slug]
 *
 * Behavioral events (no `to` field required):
 *   scroll_depth            — user scrolled to a depth milestone (meta.depth: 25|50|75|90)
 *   faq_expand              — user expanded a FAQ item (meta.question: string)
 *   comparison_sort         — user sorted the matrix (meta.key: column name)
 *   comparison_filter       — user applied a filter (meta.filter: filter description)
 *   finder_complete         — user completed Find My Retreat (meta.result: top slug)
 */

import { NextRequest, NextResponse } from 'next/server';
import { persistConversionEvent, toDurableConversionEvent } from '@/lib/conversion-events';
import { hashIp, isRateLimited } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const NAVIGATION_EVENTS = [
  'topic_to_pillar',
  'blog_to_journey',
  'comparison_to_journey',
  'pillar_to_journey',
  'matrix_to_journey',
] as const;

const BEHAVIORAL_EVENTS = [
  'page_view',
  'cta_view',
  'cta_click',
  'form_start',
  'form_submission',
  'scroll_depth',
  'faq_expand',
  'comparison_sort',
  'comparison_filter',
  'finder_complete',
  'sticky_cta_click',
  'availability_form_submit',
  'departure_table_click',
  'whatsapp_click',
  'phone_click',
  'calendar_filter',
  'micro_save',
  'micro_share',
  'micro_download',
  'yoga_whatsapp_click',
  'yoga_form_open',
  'yoga_form_completion',
  'yoga_finder_start',
  'yoga_finder_recommendation',
  'yoga_departure_selection',
  'lead_capture_open',
  'lead_capture_step_view',
  'lead_capture_step_complete',
  'lead_capture_abandon',
] as const;

const ALL_EVENTS = [...NAVIGATION_EVENTS, ...BEHAVIORAL_EVENTS] as const;
export const TRACK_EVENT_TYPES = ALL_EVENTS;
type EventType = (typeof ALL_EVENTS)[number];

// Telemetry payloads are small: meta is capped at 6000 chars and paths at 200,
// so a legitimate event stays well under 16 KiB. This limit only rejects
// abusive/oversized bodies before we parse them.
export const MAX_TRACK_BODY_BYTES = 16 * 1024;
export const TRACK_EVENT_RATE_LIMIT = 120;
const TRACK_EVENT_RATE_WINDOW_MS = 60_000;

function isValidPath(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('/') && value.length <= 200;
}

function isValidEvent(value: unknown): value is EventType {
  return typeof value === 'string' && (ALL_EVENTS as readonly string[]).includes(value);
}

function isValidMeta(value: unknown): value is Record<string, unknown> | undefined {
  if (value === undefined) return true;
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  try {
    return JSON.stringify(value).length <= 6000;
  } catch {
    return false;
  }
}

interface TrackDependencies {
  persistEvent: typeof persistConversionEvent;
  rateLimit?: typeof isRateLimited;
}

type BodyReadResult =
  | { ok: true; text: string }
  | { ok: false; reason: 'too_large' | 'unreadable' };

/**
 * Read the request body as text while enforcing MAX_TRACK_BODY_BYTES.
 *
 * The Content-Length header (when present) is rejected up front so oversized
 * uploads are not buffered at all. Bodies without a trustworthy header are
 * read chunk-by-chunk and aborted as soon as the limit is crossed.
 */
async function readBodyWithLimit(req: NextRequest): Promise<BodyReadResult> {
  const declared = Number(req.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > MAX_TRACK_BODY_BYTES) {
    return { ok: false, reason: 'too_large' };
  }

  if (!req.body) return { ok: true, text: '' };

  const reader = req.body.getReader();
  const decoder = new TextDecoder();
  let text = '';
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_TRACK_BODY_BYTES) {
        await reader.cancel().catch(() => {});
        return { ok: false, reason: 'too_large' };
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } catch {
    await reader.cancel().catch(() => {});
    return { ok: false, reason: 'unreadable' };
  }
  return { ok: true, text };
}

export function createTrackPostHandler(
  dependencies: TrackDependencies = {
    persistEvent: persistConversionEvent,
  },
) {
  return async function POST(req: NextRequest): Promise<NextResponse> {
    const bodyRead = await readBodyWithLimit(req);
    if (!bodyRead.ok) {
      return bodyRead.reason === 'too_large'
        ? NextResponse.json({ error: 'Request body too large' }, { status: 413 })
        : NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    let body: unknown;
    try {
      body = JSON.parse(bodyRead.text);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }

    const { event, from, to, meta } = body as Record<string, unknown>;

    if (!isValidEvent(event) || !isValidPath(from) || !isValidMeta(meta)) {
      return NextResponse.json({ error: 'Invalid event payload' }, { status: 422 });
    }

    if (to !== undefined && !isValidPath(to)) {
      return NextResponse.json({ error: 'Invalid destination path' }, { status: 422 });
    }

    if ((NAVIGATION_EVENTS as readonly string[]).includes(event as string) && !isValidPath(to)) {
      return NextResponse.json({ error: 'Navigation events require a valid `to` path' }, { status: 422 });
    }

    const durableEvent = toDurableConversionEvent({ event, from, to: typeof to === 'string' ? to : undefined, meta });
    if (!durableEvent) {
      return NextResponse.json({ error: 'unsupported_durable_event', durable: false }, { status: 422 });
    }

    const forwardedIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    const clientIp = forwardedIp || req.headers.get('x-real-ip') || 'unknown';
    const rateLimit = dependencies.rateLimit ?? isRateLimited;
    if (rateLimit(`track:${hashIp(clientIp)}`, TRACK_EVENT_RATE_LIMIT, TRACK_EVENT_RATE_WINDOW_MS)) {
      return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
    }

    let persistence: Awaited<ReturnType<typeof dependencies.persistEvent>>;
    try {
      persistence = await dependencies.persistEvent(durableEvent);
    } catch {
      persistence = 'failed';
    }
    if (persistence === 'persisted' || persistence === 'deduplicated') {
      return NextResponse.json({
        ok: true,
        durable: true,
        ...(persistence === 'deduplicated' ? { deduplicated: true } : {}),
      });
    }

    if (persistence === 'unavailable' || persistence === 'failed') {
      console.error('[API:Track] Durable event persistence unavailable');
      return NextResponse.json(
        { error: 'durable_persistence_failed', durable: false },
        { status: 503 },
      );
    }

    return NextResponse.json({ error: 'durable_persistence_failed', durable: false }, { status: 503 });
  };
}

export const POST = createTrackPostHandler();
