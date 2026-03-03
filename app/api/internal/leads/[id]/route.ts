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
import { z } from 'zod/v4';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  context: RouteContext,
) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const rawId = (await context.params).id;
  
  // Validate UUID format
  const idResult = z.safeParse(UUIDSchema, rawId);
  if (!idResult.success) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }
  const id = idResult.data;
  const sql = getDb();

  try {
    // Lead detail
    const leads = await sql`
      SELECT
        id, name, email, interested_in, location, month, group_size, budget,
        source_url, vertical, category, lead_score, lead_tier, status,
        followup_count, last_followup_at, created_at
      FROM inquiries
      WHERE id = ${id}
    `;

    if (leads.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Event log for this lead
    const events = await sql`
      SELECT id, event_type, meta, created_at
      FROM conversion_events
      WHERE inquiry_id = ${id}
      ORDER BY created_at DESC
      LIMIT 100
    `;

    return NextResponse.json({
      lead: leads[0],
      events,
    });
  } catch (err) {
    console.error('[Admin:Lead] Query error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

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
    }).catch(() => {});

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
