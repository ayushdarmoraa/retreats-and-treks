/**
 * Client-side telemetry helper.
 * Import in client components only (no "use server").
 *
 * All calls are fire-and-forget. Errors are silently swallowed
 * so telemetry never interrupts the user experience.
 */

type EventType =
  | 'topic_to_pillar'
  | 'blog_to_journey'
  | 'comparison_to_journey'
  | 'pillar_to_journey'
  | 'matrix_to_journey'
  | 'scroll_depth'
  | 'faq_expand'
  | 'comparison_sort'
  | 'comparison_filter'
  | 'finder_complete';

interface TrackPayload {
  event: EventType;
  from: string;
  to?: string;
  meta?: Record<string, unknown>;
}

export function track(payload: TrackPayload): void {
  try {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Silent fail
  }
}
