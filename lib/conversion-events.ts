/**
 * Conversion Event Logger — Neon Postgres
 *
 * Tracks submission success, validation failure, and other funnel events.
 * Falls back to console.log if DATABASE_URL is not set.
 *
 * Event types:
 *   inquiry_submitted  — successful form submission
 *   inquiry_validation_failed — server rejected form data
 *   inquiry_spam_blocked — honeypot or rate limit triggered
 *   inquiry_email_sent — confirmation email delivered
 *   inquiry_email_failed — email delivery failed
 */

import { getDb } from './db';

export type ConversionEventType =
  | 'inquiry_submitted'
  | 'inquiry_validation_failed'
  | 'inquiry_spam_blocked'
  | 'inquiry_email_sent'
  | 'inquiry_email_failed'
  | 'status_change'
  | 'followup_sent';

interface ConversionEvent {
  eventType: ConversionEventType;
  inquiryId?: string | null;
  sourceUrl?: string;
  vertical?: string;
  category?: string;
  ipHash?: string;
  userAgent?: string;
  meta?: Record<string, unknown>;
}

/**
 * Log a conversion event. Non-blocking — errors are swallowed.
 */
export async function logConversionEvent(event: ConversionEvent): Promise<void> {
  try {
    if (!process.env.DATABASE_URL) {
      console.log('[ConversionEvent]', event.eventType, event.meta ?? '');
      return;
    }

    const sql = getDb();
    await sql`
      INSERT INTO conversion_events (event_type, inquiry_id, source_url, vertical, category, ip_hash, user_agent, meta)
      VALUES (
        ${event.eventType},
        ${event.inquiryId ?? null},
        ${event.sourceUrl ?? null},
        ${event.vertical ?? null},
        ${event.category ?? null},
        ${event.ipHash ?? null},
        ${event.userAgent ?? null},
        ${JSON.stringify(event.meta ?? {})}
      )
    `;
  } catch (err) {
    // Analytics never blocks the user experience
    console.error('[ConversionEvent] Log failed:', err instanceof Error ? err.message : err);
  }
}
