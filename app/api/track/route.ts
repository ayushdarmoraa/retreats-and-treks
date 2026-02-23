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
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const EVENT_LOG_PATH = path.join(process.cwd(), 'data', 'events.jsonl');

const NAVIGATION_EVENTS = [
  'topic_to_pillar',
  'blog_to_journey',
  'comparison_to_journey',
  'pillar_to_journey',
  'matrix_to_journey',
] as const;

const BEHAVIORAL_EVENTS = [
  'scroll_depth',
  'faq_expand',
  'comparison_sort',
  'comparison_filter',
  'finder_complete',
] as const;

const ALL_EVENTS = [...NAVIGATION_EVENTS, ...BEHAVIORAL_EVENTS] as const;
type EventType = (typeof ALL_EVENTS)[number];

interface TrackEvent {
  event: EventType;
  from: string;
  to?: string;
  meta?: Record<string, unknown>;
  ts: string;
}

function isValidPath(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('/') && value.length <= 200;
}

function isValidEvent(value: unknown): value is EventType {
  return typeof value === 'string' && (ALL_EVENTS as readonly string[]).includes(value);
}

function appendEvent(entry: TrackEvent): void {
  try {
    const line = JSON.stringify(entry) + '\n';
    fs.appendFileSync(EVENT_LOG_PATH, line, 'utf-8');
  } catch {
    // Non-blocking — telemetry must never break user experience
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
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

  if (!isValidEvent(event) || !isValidPath(from)) {
    return NextResponse.json({ error: 'Invalid event payload' }, { status: 422 });
  }

  // Navigation events require a `to` path
  if ((NAVIGATION_EVENTS as readonly string[]).includes(event as string) && !isValidPath(to)) {
    return NextResponse.json({ error: 'Navigation events require a valid `to` path' }, { status: 422 });
  }

  const entry: TrackEvent = {
    event,
    from,
    ...(isValidPath(to) ? { to } : {}),
    ...(meta && typeof meta === 'object' ? { meta: meta as Record<string, unknown> } : {}),
    ts: new Date().toISOString(),
  };

  appendEvent(entry);

  return NextResponse.json({ ok: true }, { status: 200 });
}
