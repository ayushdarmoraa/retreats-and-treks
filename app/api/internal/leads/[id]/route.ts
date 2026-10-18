/**
 * PATCH /api/internal/leads/[id] — Update lead status
 * GET   /api/internal/leads/[id] — Get lead detail + event log
 *
 * Status transitions:
 *   open → replied | closed | booked
 *   replied → closed | booked
 *   closed → open (reopen)
 *   booked → (terminal)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { StatusUpdateSchema, UUIDSchema } from '@/lib/schemas';
import { sanitizeConversionEventMeta } from '@/lib/conversion-events';
import { z } from 'zod/v4';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

type LeadDetailGetDependencies = {
  getDb: typeof getDb;
  hasDatabase: () => boolean;
};

export function createLeadDetailGetHandler(
  dependencies: LeadDetailGetDependencies = {
    getDb,
    hasDatabase: () => Boolean(process.env.DATABASE_URL),
  },
) {
  return async function GET(
    _request: NextRequest,
    context: RouteContext,
  ) {
    if (!dependencies.hasDatabase()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const rawId = (await context.params).id;
    const idResult = z.safeParse(UUIDSchema, rawId);
    if (!idResult.success) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }
    const id = idResult.data;
    const sql = dependencies.getDb();

    try {
      const leads = await sql`
        SELECT
          id, lead_reference, name, email, phone, age, origin_city, origin_country,
          interest, preferred_timing, destination, departure, departure_date,
          additional_request, yoga_interest, product, product_id, departure_id,
          yoga_classification, yoga_sales_route, sales_route, recommended_product,
          recommended_alternative, interested_in, location, month, preferred_date,
          planning_horizon, group_size, budget, duration, yoga_experience,
          booking_readiness, source_url, vertical, category, lead_score, lead_tier,
          canonical_lead_tier, status, conversion_session_id, first_landing_page,
          last_landing_page, page_title, page_type, cta_id, cta_position, cta_label,
          cta_variant, referrer, first_utm_source, first_utm_medium,
          first_utm_campaign, first_utm_term, first_utm_content, first_utm_id,
          first_touch_at, last_utm_source, last_utm_medium, last_utm_campaign,
          last_utm_term, last_utm_content, last_utm_id, last_touch_at,
          followup_count, last_followup_at, created_at
        FROM inquiries
        WHERE id = ${id}
      `;

      if (leads.length === 0) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }

      const lead = leads[0];
      const events = await sql`
        SELECT
          id, event_type, meta, created_at, page_path, page_type, vertical,
          category, cta_id, cta_position, cta_label, cta_variant, lead_reference
        FROM conversion_events
        WHERE inquiry_id = ${id}
          OR lead_reference = ${lead.lead_reference}
        ORDER BY created_at ASC, id ASC
        LIMIT 200
      `;
      const sanitizedEvents = events.map((event) => ({
        ...event,
        meta: event.meta === null ? null : sanitizeConversionEventMeta(event.meta),
      }));

      return NextResponse.json({ lead, events: sanitizedEvents });
    } catch (err) {
      console.error('[Admin:Lead] Query error:', err);
      return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
  };
}

export const GET = createLeadDetailGetHandler();

export async function PATCH(
  request: NextRequest,
  context: RouteContext,
) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const rawId = (await context.params).id;

  // Validate UUID
  const idResult = z.safeParse(UUIDSchema, rawId);
  if (!idResult.success) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }
  const id = idResult.data;
  const sql = getDb();

  try {
    const body = await request.json();

    // Validate status with Zod
    const parsed = StatusUpdateSchema.parse(body);
    const newStatus = parsed.status;

    // Verify the lead exists
    const existing = await sql`SELECT id, status FROM inquiries WHERE id = ${id}`;
    if (existing.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Prevent re-opening booked leads
    if (existing[0].status === 'booked' && newStatus !== 'booked') {
      return NextResponse.json(
        { error: 'Cannot change status of a booked lead' },
        { status: 400 },
      );
    }

    await sql`
      UPDATE inquiries
      SET status = ${newStatus}
      WHERE id = ${id}
    `;

    // Log the status change as a conversion event
    const { logConversionEvent } = await import('@/lib/conversion-events');
    logConversionEvent({
      eventType: 'status_change',
      inquiryId: id,
      meta: {
        from_status: existing[0].status,
        to_status: newStatus,
      },
    }).catch(() => {
      console.error('[Admin:Lead] Status-change event persistence failed');
    });

    return NextResponse.json({ ok: true, status: newStatus });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.issues[0]?.message || 'Invalid input' },
        { status: 400 },
      );
    }
    console.error('[Admin:Lead] Update error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
