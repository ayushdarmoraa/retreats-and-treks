/**
 * Follow-Up Sequence Engine
 *
 * Queries Postgres for leads that need follow-up emails.
 * Sends tier-appropriate Day 3 and Day 7 nudges.
 *
 * Schedule: Run once daily via Vercel Cron or external scheduler.
 *
 * Rules:
 *   - Day 3: First follow-up for hot + warm leads
 *   - Day 7: Second follow-up for hot + warm leads (cold gets Day 7 only)
 *   - Max 2 follow-ups per lead
 *   - Skip if lead already replied (future: track via email open/reply webhook)
 *
 * Revenue logic:
 *   - Hot leads get personal, urgency-framed follow-ups
 *   - Warm leads get resource-based nurture
 *   - Cold leads get one gentle check-in at Day 7 only
 */

import { getDb } from './db';
import { Resend } from 'resend';
import { logConversionEvent } from './conversion-events';
import type { LeadTier } from './lead-scoring';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const BASE_URL = 'https://www.retreatsandtreks.com';

interface FollowUpCandidate {
  id: string;
  name: string;
  email: string;
  interested_in: string | null;
  location: string | null;
  month: string | null;
  group_size: string | null;
  budget: string | null;
  vertical: string | null;
  lead_tier: LeadTier;
  lead_score: number;
  followup_count: number;
  created_at: string;
}

export interface FollowUpResult {
  processed: number;
  sent: number;
  skipped: number;
  errors: number;
}

/**
 * Process all pending follow-ups. Returns summary.
 */
export async function processFollowUps(): Promise<FollowUpResult> {
  if (!process.env.DATABASE_URL) {
    console.warn('[FollowUp] DATABASE_URL not set — skipping');
    return { processed: 0, sent: 0, skipped: 0, errors: 0 };
  }

  const sql = getDb();
  const result: FollowUpResult = { processed: 0, sent: 0, skipped: 0, errors: 0 };

  // ── DAY 3 CANDIDATES ──────────────────────────────────
  // Hot + warm leads, 3 days old, 0 follow-ups sent
  const day3Candidates = await sql`
    SELECT id, name, email, interested_in, location, month, group_size, budget,
           vertical, lead_tier, lead_score, followup_count, created_at
    FROM inquiries
    WHERE followup_count = 0
      AND status = 'open'
      AND lead_tier IN ('hot', 'warm')
      AND created_at <= now() - interval '3 days'
      AND created_at > now() - interval '4 days'
    ORDER BY lead_score DESC
    LIMIT 50
  ` as unknown as FollowUpCandidate[];

  // ── DAY 7 CANDIDATES ──────────────────────────────────
  // All tiers, 7 days old, fewer than 2 follow-ups
  const day7Candidates = await sql`
    SELECT id, name, email, interested_in, location, month, group_size, budget,
           vertical, lead_tier, lead_score, followup_count, created_at
    FROM inquiries
    WHERE followup_count < 2
      AND status = 'open'
      AND created_at <= now() - interval '7 days'
      AND created_at > now() - interval '8 days'
    ORDER BY lead_score DESC
    LIMIT 50
  ` as unknown as FollowUpCandidate[];

  // Process Day 3
  for (const lead of day3Candidates) {
    result.processed++;
    try {
      const sent = await sendFollowUp(lead, 3);
      if (sent) {
        await markFollowUpSent(sql, lead.id);
        result.sent++;
      } else {
        result.skipped++;
      }
    } catch (err) {
      result.errors++;
      console.error(`[FollowUp] Day 3 error for ${lead.id}:`, err);
    }
  }

  // Process Day 7
  for (const lead of day7Candidates) {
    result.processed++;
    try {
      const sent = await sendFollowUp(lead, 7);
      if (sent) {
        await markFollowUpSent(sql, lead.id);
        result.sent++;
      } else {
        result.skipped++;
      }
    } catch (err) {
      result.errors++;
      console.error(`[FollowUp] Day 7 error for ${lead.id}:`, err);
    }
  }

  return result;
}

// ────────────────────────────────────────────────────────────

async function markFollowUpSent(
  sql: ReturnType<typeof getDb>,
  inquiryId: string,
): Promise<void> {
  await sql`
    UPDATE inquiries
    SET followup_count = followup_count + 1,
        last_followup_at = now()
    WHERE id = ${inquiryId}
  `;
}

async function sendFollowUp(
  lead: FollowUpCandidate,
  day: 3 | 7,
): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn('[FollowUp] RESEND_API_KEY not set — skipping');
    return false;
  }

  const resend = new Resend(RESEND_API_KEY);
  const { subject, html } = buildFollowUpEmail(lead, day);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: lead.email,
      replyTo: process.env.TEAM_NOTIFICATION_EMAIL || FROM_EMAIL,
      subject,
      html,
    });

    logConversionEvent({
      eventType: 'inquiry_email_sent',
      inquiryId: lead.id,
      meta: { followup_day: day, lead_tier: lead.lead_tier, lead_score: lead.lead_score },
    }).catch(() => {});

    return true;
  } catch (err) {
    logConversionEvent({
      eventType: 'inquiry_email_failed',
      inquiryId: lead.id,
      meta: { followup_day: day, error: err instanceof Error ? err.message : String(err) },
    }).catch(() => {});
    return false;
  }
}

// ────────────────────────────────────────────────────────────
// FOLLOW-UP EMAIL TEMPLATES
// ────────────────────────────────────────────────────────────

function buildFollowUpEmail(
  lead: FollowUpCandidate,
  day: 3 | 7,
): { subject: string; html: string } {
  const tier = lead.lead_tier;

  if (day === 3) {
    if (tier === 'hot') return buildDay3Hot(lead);
    return buildDay3Warm(lead);
  }

  // Day 7
  if (tier === 'hot') return buildDay7Hot(lead);
  if (tier === 'warm') return buildDay7Warm(lead);
  return buildDay7Cold(lead);
}

// ── DAY 3: HOT ────────────────────────────────────────────
function buildDay3Hot(lead: FollowUpCandidate): { subject: string; html: string } {
  const name = lead.name || 'there';
  const isRetreat = lead.interested_in === 'retreat';
  const type = isRetreat ? 'retreat' : 'trek';

  return {
    subject: `${lead.name}, a quick follow-up on your ${type} plan`,
    html: `
      <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; line-height: 1.8;">
        <p>Hi ${name},</p>

        <p>I wanted to follow up on your ${type} inquiry from a few days ago. I've been looking into options${lead.location ? ` for <strong>${lead.location}</strong>` : ''} and have a few ideas I think you'd find interesting.</p>

        <p>If you've had any more thoughts on:</p>
        <ul style="padding-left: 1.2rem;">
          ${isRetreat
            ? `<li>Preferred dates${lead.month ? ` within ${lead.month}` : ''}</li>
               <li>What you're most looking for — rest, practice, or exploration</li>`
            : `<li>Your experience level with Himalayan terrain</li>
               <li>Preferred dates${lead.month ? ` within ${lead.month}` : ''}</li>`
          }
        </ul>

        <p>…I can put together a <strong>personalized itinerary</strong> for you. Just reply with whatever you have — even rough thoughts help.</p>

        ${lead.budget && lead.budget !== 'Not sure yet' ? `
        <p style="font-size: 0.9rem; color: #64748b;">Given your budget indication of ${lead.budget}, I have some well-matched options in mind.</p>
        ` : ''}

        <p style="color: #555; font-size: 0.9rem; margin-top: 2rem;">
          Warm regards,<br/>
          Retreats And Treks
        </p>
      </div>
    `,
  };
}

// ── DAY 3: WARM ───────────────────────────────────────────
function buildDay3Warm(lead: FollowUpCandidate): { subject: string; html: string } {
  const name = lead.name || 'there';
  const isRetreat = lead.interested_in === 'retreat';

  return {
    subject: isRetreat
      ? `A retreat resource you might find useful`
      : `A trekking guide you might find useful`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; line-height: 1.75;">
        <p>Hi ${name},</p>

        <p>Following up on your inquiry from a few days ago. While we put together your options, I thought this might be helpful:</p>

        ${isRetreat ? `
        <div style="padding: 1rem; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; margin: 1rem 0;">
          <p style="margin: 0 0 0.5rem; font-weight: 600;"><a href="${BASE_URL}/retreat-programs" style="color: #2563eb;">Retreat Program Comparison</a></p>
          <p style="margin: 0; font-size: 0.9rem; color: #64748b;">See all retreat formats, durations, and what each experience includes — side by side.</p>
        </div>
        <p>If you've had a chance to think about what format appeals most — a weekend retreat, a 5-day immersion, or something longer — just reply and we'll narrow it down.</p>
        ` : `
        <div style="padding: 1rem; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; margin: 1rem 0;">
          <p style="margin: 0 0 0.5rem; font-weight: 600;"><a href="${BASE_URL}/treks/best-treks-in-uttarakhand" style="color: #2563eb;">Best Treks in Uttarakhand — Ranked</a></p>
          <p style="margin: 0; font-size: 0.9rem; color: #64748b;">Difficulty levels, best seasons, and what makes each route unique.</p>
        </div>
        <p>If any particular trek caught your eye, just reply and we'll build a plan around it.</p>
        `}

        <p style="color: #555; font-size: 0.9rem; margin-top: 2rem;">
          — Retreats And Treks
        </p>
      </div>
    `,
  };
}

// ── DAY 7: HOT ────────────────────────────────────────────
function buildDay7Hot(lead: FollowUpCandidate): { subject: string; html: string } {
  const name = lead.name || 'there';
  const isRetreat = lead.interested_in === 'retreat';
  const type = isRetreat ? 'retreat' : 'trek';

  return {
    subject: `Last note on your ${type} planning, ${lead.name}`,
    html: `
      <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; line-height: 1.8;">
        <p>Hi ${name},</p>

        <p>I'm circling back one last time on your ${type} inquiry. I know plans evolve — if the timing has shifted or you have new questions, I'm here.</p>

        ${lead.month ? `
        <p style="padding: 0.75rem 1rem; background: #f8fafc; border-left: 3px solid #94a3b8; border-radius: 4px; font-size: 0.9rem; color: #475569;">
          <strong>Availability note:</strong> ${getFollowUpScarcity(lead.month, isRetreat)}
        </p>
        ` : ''}

        <p>If you'd like to proceed, just reply with your preferred dates and I'll have a complete plan ready within 24 hours. If the timing isn't right, no pressure at all — our programs run year-round.</p>

        <p style="color: #555; font-size: 0.9rem; margin-top: 2rem;">
          Warm regards,<br/>
          Retreats And Treks
        </p>
      </div>
    `,
  };
}

// ── DAY 7: WARM ───────────────────────────────────────────
function buildDay7Warm(lead: FollowUpCandidate): { subject: string; html: string } {
  const name = lead.name || 'there';
  const isRetreat = lead.interested_in === 'retreat';

  return {
    subject: `Still thinking about your Himalayan ${isRetreat ? 'retreat' : 'trek'}?`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; line-height: 1.75;">
        <p>Hi ${name},</p>

        <p>Just a gentle follow-up. If you're still exploring options, here's one more resource that might help with your decision:</p>

        ${isRetreat ? `
        <div style="padding: 1rem; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; margin: 1rem 0;">
          <p style="margin: 0 0 0.5rem; font-weight: 600;"><a href="${BASE_URL}/blog/is-weekend-retreat-worth-it" style="color: #2563eb;">Is a Weekend Retreat Actually Worth It?</a></p>
          <p style="margin: 0; font-size: 0.9rem; color: #64748b;">A honest look at what you can realistically expect from different retreat durations.</p>
        </div>
        ` : `
        <div style="padding: 1rem; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; margin: 1rem 0;">
          <p style="margin: 0 0 0.5rem; font-weight: 600;"><a href="${BASE_URL}/blog/trek-vs-retreat" style="color: #2563eb;">Trek vs Retreat — Which Is Right for You?</a></p>
          <p style="margin: 0; font-size: 0.9rem; color: #64748b;">If you're still deciding between the two, this comparison covers the key differences.</p>
        </div>
        `}

        <p>Whenever you're ready, just reply to this email and we'll take it from there. No rush.</p>

        <p style="color: #555; font-size: 0.9rem; margin-top: 2rem;">
          — Retreats And Treks
        </p>
      </div>
    `,
  };
}

// ── DAY 7: COLD ───────────────────────────────────────────
function buildDay7Cold(lead: FollowUpCandidate): { subject: string; html: string } {
  const name = lead.name || 'there';

  return {
    subject: `A quick note from Retreats And Treks`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; line-height: 1.75;">
        <p>Hi ${name},</p>

        <p>We noticed you reached out last week. If you're still thinking about a Himalayan experience — whether a trek, a retreat, or something in between — we're here whenever you're ready.</p>

        <p>A few places to start:</p>
        <ul style="padding-left: 1.2rem;">
          <li><a href="${BASE_URL}/retreats/best-retreat-in-uttarakhand" style="color: #2563eb;">Best Retreats in Uttarakhand</a></li>
          <li><a href="${BASE_URL}/treks/best-treks-in-uttarakhand" style="color: #2563eb;">Best Treks in Uttarakhand</a></li>
        </ul>

        <p>Just reply if you'd like to talk through options. No commitment needed.</p>

        <p style="color: #555; font-size: 0.9rem; margin-top: 2rem;">
          — Retreats And Treks
        </p>
      </div>
    `,
  };
}

// ────────────────────────────────────────────────────────────

function getFollowUpScarcity(month: string, isRetreat: boolean): string {
  const peakMonths = ['October', 'November', 'March', 'April', 'May', 'December'];
  const isPeak = peakMonths.includes(month);

  if (isPeak && isRetreat) {
    return `${month} retreat sessions are beginning to fill. If your dates are flexible, there's still good availability — but confirming within the next week gives us the most options.`;
  }
  if (isPeak) {
    return `${month} treks are in high demand. Guide availability narrows as the season approaches — confirming early gives you first pick of dates.`;
  }
  return `${month} still has good availability. Confirming your dates whenever you're ready will help us reserve the best experience.`;
}
