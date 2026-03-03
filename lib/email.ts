/**
 * Email Auto-Response via Resend — Intent-Based Qualification
 *
 * Instead of a generic "we received your inquiry" email,
 * sends tier-specific content designed to move leads toward conversion.
 *
 * Hot leads  → Premium brochure + direct scheduler link + personal tone
 * Warm leads → Curated resource pack + qualification questions
 * Cold leads → Standard helpful response + content links
 *
 * Each tier email has a different CTA designed to extract
 * the next signal (dates, budget, fitness level) that qualifies further.
 */

import { Resend } from 'resend';
import type { Inquiry } from './inquiries';
import type { LeadTier } from './lead-scoring';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const TEAM_EMAIL = process.env.TEAM_NOTIFICATION_EMAIL || '';
const BASE_URL = 'https://www.retreatsandtreks.com';

export async function sendInquiryEmails(
  inquiry: Inquiry,
  tier: LeadTier = 'cold',
  score: number = 0,
): Promise<{ sent: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.warn('[Email] RESEND_API_KEY not set — skipping email send.');
    return { sent: false, error: 'API key not configured' };
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    // 1. Intent-based auto-response to the lead
    const { subject, html } = buildTieredResponse(inquiry, tier);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: inquiry.email,
      replyTo: TEAM_EMAIL || FROM_EMAIL,
      subject,
      html,
    });

    // 2. Internal notification — enriched with lead score
    if (TEAM_EMAIL) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: TEAM_EMAIL,
        subject: `[${tier.toUpperCase()} ${score}] ${inquiry.interestedIn || 'General'} — ${inquiry.name}`,
        html: buildTeamNotificationHtml(inquiry, tier, score),
      });
    }

    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown email error';
    console.error('[Email] Send failed:', message);
    return { sent: false, error: message };
  }
}

// ────────────────────────────────────────────────────────────
// TIERED RESPONSE BUILDER
// ────────────────────────────────────────────────────────────

function buildTieredResponse(
  inquiry: Inquiry,
  tier: LeadTier,
): { subject: string; html: string } {
  switch (tier) {
    case 'hot':
      return buildHotResponse(inquiry);
    case 'warm':
      return buildWarmResponse(inquiry);
    default:
      return buildColdResponse(inquiry);
  }
}

// ── HOT LEAD (70–100) ─────────────────────────────────────
// Personal tone. Premium positioning. Direct scheduler CTA.
function buildHotResponse(inquiry: Inquiry): { subject: string; html: string } {
  const isRetreat = inquiry.interestedIn === 'retreat';
  const greeting = inquiry.name ? `Hi ${inquiry.name},` : 'Hi,';
  const type = isRetreat ? 'retreat' : 'trek';

  const subject = isRetreat
    ? `${inquiry.name}, your private retreat details`
    : `${inquiry.name}, your trek planning details`;

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; line-height: 1.8;">
      <p>${greeting}</p>

      <p>Thank you for reaching out. I'm personally handling your ${type} inquiry.</p>

      ${inquiry.location ? `<p>I see you're interested in <strong>${inquiry.location}</strong> — excellent choice. I've spent considerable time there and can share specific recommendations that aren't on the website.</p>` : ''}

      ${inquiry.month ? `<p><strong>${inquiry.month}</strong> is ${getMonthInsight(inquiry.month, inquiry.location)} for ${inquiry.location || 'the Himalayas'}.</p>` : ''}

      ${inquiry.groupSize && inquiry.groupSize !== '1' ? `<p>For a group of <strong>${inquiry.groupSize}</strong>, I can tailor the experience — private transport, dedicated guide, and flexible scheduling.</p>` : ''}

      <p style="margin-top: 1.5rem;">To prepare the best options for you, it would help to know:</p>
      <ol style="padding-left: 1.2rem;">
        ${isRetreat
          ? `<li>Do you have preferred dates, or are you flexible within ${inquiry.month || 'the coming months'}?</li>
             <li>Any dietary preferences or accessibility needs?</li>
             <li>What matters most — solitude, guided practice, or exploration?</li>`
          : `<li>What's your trekking experience level? (First time is perfectly fine)</li>
             <li>Do you have preferred dates within ${inquiry.month || 'the coming months'}?</li>
             <li>Any fitness or altitude concerns?</li>`
        }
      </ol>

      <p style="margin-top: 1.5rem;">Just reply to this email with whatever details you have. I'll put together a personalized plan within 24 hours.</p>

      <!-- PREMIUM UPSELL BLOCK -->
      <div style="margin-top: 2rem; padding: 1.25rem; background: #fefce8; border: 1px solid #fde68a; border-radius: 8px;">
        <p style="margin: 0 0 0.5rem; font-weight: 600; color: #92400e;">Also available for your group:</p>
        <ul style="padding-left: 1.2rem; margin: 0; color: #78350f;">
          <li><strong>Private itinerary design</strong> — fully customized to your group's pace and interests</li>
          <li><strong>Premium small-batch experience</strong> — max 6 people, dedicated host</li>
          <li><strong>Custom date scheduling</strong> — we work around your calendar, not ours</li>
        </ul>
        <p style="margin: 0.75rem 0 0; font-size: 0.9rem; color: #92400e;">Just mention "private" or "custom" in your reply and I'll include premium options in your plan.</p>
      </div>

      ${isRetreat ? `
      <p style="margin-top: 1.5rem;">In the meantime, this may be helpful:</p>
      <ul style="padding-left: 1.2rem;">
        <li><a href="${BASE_URL}/retreat-programs" style="color: #2563eb;">Program Comparison Matrix</a> — see all formats side by side</li>
        <li><a href="${BASE_URL}/retreats/luxury-himalayan-retreats" style="color: #2563eb;">Luxury Himalayan Retreats</a> — our premium experiences</li>
      </ul>
      ` : `
      <p style="margin-top: 1.5rem;">This might be useful while I prepare your options:</p>
      <ul style="padding-left: 1.2rem;">
        <li><a href="${BASE_URL}/treks/best-trek-in-uttarakhand" style="color: #2563eb;">Best Treks in Uttarakhand</a> — complete comparison</li>
        <li><a href="${BASE_URL}/treks/beginner-treks-uttarakhand" style="color: #2563eb;">Beginner-Friendly Treks</a> — if this is your first time</li>
      </ul>
      `}

      <!-- SCARCITY CUE — factual, not manufactured -->
      ${inquiry.month ? `
      <p style="margin-top: 1.5rem; padding: 0.75rem 1rem; background: #f8fafc; border-left: 3px solid #94a3b8; border-radius: 4px; font-size: 0.9rem; color: #475569;">
        <strong>Planning note:</strong> ${getScarcityCue(inquiry.month, isRetreat)}
      </p>
      ` : ''}

      <p style="color: #555; font-size: 0.9rem; margin-top: 2.5rem; border-top: 1px solid #e5e7eb; padding-top: 1rem;">
        Warm regards,<br/>
        Retreats And Treks<br/>
        Dehradun, Uttarakhand
      </p>
    </div>
  `;

  return { subject, html };
}

// ── WARM LEAD (40–69) ─────────────────────────────────────
// Helpful + guiding. Resource pack. Qualification questions embedded.
function buildWarmResponse(inquiry: Inquiry): { subject: string; html: string } {
  const isRetreat = inquiry.interestedIn === 'retreat';
  const greeting = inquiry.name ? `Hi ${inquiry.name},` : 'Hi,';
  const type = isRetreat ? 'retreat' : 'trek';

  const subject = isRetreat
    ? `Your retreat planning resources — Retreats And Treks`
    : `Your trek planning resources — Retreats And Treks`;

  const html = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; line-height: 1.75;">
      <p>${greeting}</p>

      <p>Thank you for your ${type} inquiry. We've received your details and a mountain planner will be in touch within 24 hours.</p>

      ${inquiry.location ? `<p><strong>Location interest:</strong> ${inquiry.location}</p>` : ''}
      ${inquiry.month ? `<p><strong>Preferred month:</strong> ${inquiry.month}</p>` : ''}
      ${inquiry.groupSize ? `<p><strong>Group size:</strong> ${inquiry.groupSize}</p>` : ''}

      <p style="margin-top: 1.5rem;">While we prepare your options, these resources will help you narrow down what works best:</p>

      ${isRetreat ? `
      <ul style="padding-left: 1.2rem;">
        <li><a href="${BASE_URL}/retreat-programs" style="color: #2563eb;">Program Comparison Matrix</a> — all formats, durations, and approaches</li>
        <li><a href="${BASE_URL}/retreats/best-retreat-in-uttarakhand" style="color: #2563eb;">Best Retreats in Uttarakhand</a> — curated guide</li>
        <li><a href="${BASE_URL}/blog/is-weekend-retreat-worth-it" style="color: #2563eb;">Is a Weekend Retreat Worth It?</a> — ideal if deciding on duration</li>
      </ul>
      ` : `
      <ul style="padding-left: 1.2rem;">
        <li><a href="${BASE_URL}/treks/best-trek-in-uttarakhand" style="color: #2563eb;">Best Treks in Uttarakhand</a> — complete ranked comparison</li>
        <li><a href="${BASE_URL}/treks/beginner-treks-uttarakhand" style="color: #2563eb;">Beginner-Friendly Treks</a> — great for first-timers</li>
        <li><a href="${BASE_URL}/blog/kedarkantha-vs-har-ki-dun" style="color: #2563eb;">Kedarkantha vs Har Ki Dun</a> — if you're comparing routes</li>
      </ul>
      `}

      <p style="margin-top: 1.5rem; padding: 1rem; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
        <strong>Quick question:</strong> ${isRetreat
          ? 'What matters most to you — deep rest, guided practice, or exploring a new place?'
          : 'Have you done any Himalayan trekking before, or would this be your first?'}
        <br/><span style="color: #64748b; font-size: 0.9rem;">Just reply to this email — it helps us match the right experience.</span>
      </p>

      <p style="color: #555; font-size: 0.9rem; margin-top: 2rem;">
        — Retreats And Treks<br/>
        Dehradun, Uttarakhand
      </p>
    </div>
  `;

  return { subject, html };
}

// ── COLD LEAD (0–39) ──────────────────────────────────────
// Standard helpful response. Content links. Light CTA.
function buildColdResponse(inquiry: Inquiry): { subject: string; html: string } {
  const isRetreat = inquiry.interestedIn === 'retreat';
  const greeting = inquiry.name ? `Hi ${inquiry.name},` : 'Hi,';
  const type = isRetreat ? 'retreat' : inquiry.interestedIn === 'trek' ? 'trek' : '';

  const subject = type
    ? `Your ${type} inquiry — Retreats And Treks`
    : `Your inquiry — Retreats And Treks`;

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
      <p>${greeting}</p>
      <p>Thank you for your ${type || ''} inquiry. We have received your request and a mountain planner will be in touch within 24 hours.</p>
      ${inquiry.location ? `<p><strong>Location interest:</strong> ${inquiry.location}</p>` : ''}
      ${inquiry.month ? `<p><strong>Preferred month:</strong> ${inquiry.month}</p>` : ''}
      ${inquiry.groupSize ? `<p><strong>Group size:</strong> ${inquiry.groupSize}</p>` : ''}
      <p>In the meantime, you may find these resources helpful:</p>
      <ul>
        <li><a href="${BASE_URL}/retreats/best-retreat-in-uttarakhand">Best Retreats in Uttarakhand</a></li>
        <li><a href="${BASE_URL}/treks/best-trek-in-uttarakhand">Best Treks in Uttarakhand</a></li>
        <li><a href="${BASE_URL}/retreat-programs">Program Comparison Matrix</a></li>
      </ul>
      <p style="color: #555; font-size: 0.9rem; margin-top: 2rem;">
        — Retreats And Treks<br/>
        Dehradun, Uttarakhand
      </p>
    </div>
  `;

  return { subject, html };
}

// ────────────────────────────────────────────────────────────
// TEAM NOTIFICATION — enriched with lead intelligence
// ────────────────────────────────────────────────────────────

function buildTeamNotificationHtml(
  inquiry: Inquiry,
  tier: LeadTier,
  score: number,
): string {
  const tierColors: Record<LeadTier, string> = {
    hot: '#dc2626',
    warm: '#d97706',
    cold: '#6b7280',
    unscored: '#9ca3af',
  };

  return `
    <div style="font-family: monospace; font-size: 0.9rem;">
      <h3 style="margin-bottom: 0.5rem;">New Inquiry Received</h3>
      <div style="display: inline-block; padding: 0.25rem 0.75rem; background: ${tierColors[tier]}; color: white; border-radius: 4px; font-weight: bold; margin-bottom: 1rem;">
        ${tier.toUpperCase()} — Score ${score}/100
      </div>
      <table style="margin-top: 0.75rem;">
        <tr><td><strong>Name:</strong></td><td>${inquiry.name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${inquiry.email}</td></tr>
        <tr><td><strong>Interested in:</strong></td><td>${inquiry.interestedIn || '—'}</td></tr>
        <tr><td><strong>Location:</strong></td><td>${inquiry.location || '—'}</td></tr>
        <tr><td><strong>Month:</strong></td><td>${inquiry.month || '—'}</td></tr>
        <tr><td><strong>Group size:</strong></td><td>${inquiry.groupSize || '—'}</td></tr>
        <tr><td><strong>Budget:</strong></td><td>${inquiry.budget || '—'}</td></tr>
        <tr><td><strong>Source:</strong></td><td>${inquiry.source}</td></tr>
        <tr><td><strong>Vertical:</strong></td><td>${inquiry.vertical}</td></tr>
        <tr><td><strong>Category:</strong></td><td>${inquiry.category}</td></tr>
        <tr><td><strong>Timestamp:</strong></td><td>${inquiry.timestamp}</td></tr>
      </table>
      <p style="margin-top: 1rem; color: #6b7280;">
        ${tier === 'hot' ? '⚡ HIGH PRIORITY — Respond personally within 4 hours.' : ''}
        ${tier === 'warm' ? '📋 Follow up within 24 hours with tailored options.' : ''}
        ${tier === 'cold' ? 'Standard response sent. Follow up if they reply.' : ''}
      </p>
    </div>
  `;
}

// ────────────────────────────────────────────────────────────
// SEASONAL INSIGHT HELPER
// ────────────────────────────────────────────────────────────

function getMonthInsight(month: string, _location?: string): string {
  const insights: Record<string, string> = {
    'January': 'a beautiful winter month — snow-covered trails and crisp mountain air',
    'February': 'ideal for snow experiences and quiet winter retreats',
    'March': 'the start of spring — rhododendrons begin blooming across the ridges',
    'April': 'peak spring — clear skies, wildflowers, and perfect trekking weather',
    'May': 'warm but stunning — great visibility before monsoon arrives',
    'June': 'the edge of monsoon — lush greenery, but plan for occasional rain',
    'July': 'deep monsoon — waterfalls are spectacular, but trails can be challenging',
    'August': 'monsoon continues — beautiful for retreats, less ideal for high treks',
    'September': 'post-monsoon brilliance — clear air, green valleys, excellent conditions',
    'October': 'one of the best months — golden autumn light and perfect temperatures',
    'November': 'early winter — crisp, clear, and uncrowded',
    'December': 'deep winter — snow at altitude, cozy retreat season',
  };
  return insights[month] || 'a good time to visit';
}

// ────────────────────────────────────────────────────────────
// SCARCITY CUE HELPER — factual time-expectation framing
// ────────────────────────────────────────────────────────────

function getScarcityCue(month: string, isRetreat: boolean): string {
  const peakMonths = ['October', 'November', 'March', 'April', 'May', 'December'];
  const isPeak = peakMonths.includes(month);

  if (isPeak && isRetreat) {
    return `${month} retreats typically fill 3–4 weeks in advance. Confirming early gives us more flexibility with accommodation and scheduling.`;
  }
  if (isPeak) {
    return `${month} is peak trekking season — popular routes book out 2–3 weeks ahead. Sharing your dates early helps us secure the best slots.`;
  }
  if (isRetreat) {
    return `${month} is quieter, which means more flexibility — but our small-batch format means limited spots per session.`;
  }
  return `${month} treks have moderate demand. Sharing your preferred dates helps us plan the best experience.`;
}

