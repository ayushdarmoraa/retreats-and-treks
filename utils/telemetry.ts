/**
 * Client-side telemetry helper.
 * Import in client components only (no "use server").
 *
 * All calls are fire-and-forget. Errors are silently swallowed
 * so telemetry never interrupts the user experience.
 */

import { isValidConversionSessionId, readConversionSessionId } from '@/lib/conversion-foundation';

export const CLIENT_EVENT_TYPES = [
  'page_view',
  'cta_view',
  'cta_click',
  'form_start',
  'form_submission',
  'topic_to_pillar',
  'blog_to_journey',
  'comparison_to_journey',
  'pillar_to_journey',
  'matrix_to_journey',
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
  'lead_capture_abandon',
  'lead_capture_step_view',
  'lead_capture_step_complete',
] as const;

type EventType = (typeof CLIENT_EVENT_TYPES)[number];

interface TrackPayload {
  event: EventType;
  from: string;
  to?: string;
  meta?: Record<string, unknown>;
}

export function track(payload: TrackPayload): void {
  try {
    const suppliedSessionId = payload.meta?.conversion_session_id ?? payload.meta?.conversionSessionId;
    const conversionSessionId = typeof window === 'undefined'
      ? undefined
      : typeof suppliedSessionId === 'string' && isValidConversionSessionId(suppliedSessionId)
        ? suppliedSessionId
        : readConversionSessionId();
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        ...(conversionSessionId
          ? {
            meta: {
              ...payload.meta,
              conversion_session_id: conversionSessionId,
            },
          }
          : {}),
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Silent fail
  }
}
