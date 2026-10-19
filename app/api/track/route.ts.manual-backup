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
}

export function createTrackPostHandler(
  dependencies: TrackDependencies = {
    persistEvent: persistConversionEvent,
  },
) {
  return async function POST(req: NextRequest): Promise<NextResponse> {
    let body: unknown;
    try {
      body = await req.json();
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
