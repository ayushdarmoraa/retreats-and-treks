/**
 * Lead Scoring Engine
 *
 * Assigns a 0–100 score and a tier to each inquiry based on
 * signals that correlate with revenue conversion.
 *
 * Tier system:
 *   hot     (70–100)  → Immediate personal outreach + premium content
 *   warm    (40–69)   → Guided nurture sequence + resource pack
 *   cold    (0–39)    → Standard auto-response
 *
 * Scoring signals:
 *   - Group size (more people = higher revenue potential)
 *   - Specific location selected (intent clarity)
 *   - Specific month selected (booking readiness)
 *   - Vertical = retreat (higher AOV than trek)
 *   - Category signals (luxury, private = premium intent)
 *   - Source page depth (deeper funnel = more qualified)
 */

import type { Inquiry } from './inquiries';

export type LeadTier = 'hot' | 'warm' | 'cold' | 'unscored';

export interface LeadScore {
  score: number;
  tier: LeadTier;
  signals: string[];
}

/**
 * Score an inquiry. Pure function — no side effects.
 */
export function scoreInquiry(inquiry: Inquiry): LeadScore {
  let score = 0;
  const signals: string[] = [];

  // ── GROUP SIZE ──────────────────────────────────────────
  // Larger groups = higher revenue per booking
  const groupMap: Record<string, number> = {
    '1': 5,
    '2': 10,
    '3–4': 18,
    '5–8': 25,
    '9+': 30,
  };
  const groupPoints = groupMap[inquiry.groupSize] ?? 0;
  if (groupPoints > 0) {
    score += groupPoints;
    signals.push(`group_size:${inquiry.groupSize}(+${groupPoints})`);
  }

  // ── LOCATION SPECIFICITY ────────────────────────────────
  // Choosing a location = higher intent than "not sure yet"
  if (inquiry.location && inquiry.location !== '') {
    score += 10;
    signals.push(`location:${inquiry.location}(+10)`);
  }

  // ── MONTH SPECIFICITY ──────────────────────────────────
  // Choosing a month = ready to book, not just browsing
  if (inquiry.month && inquiry.month !== '') {
    score += 15;
    signals.push(`month:${inquiry.month}(+15)`);
  }

  // ── VERTICAL ───────────────────────────────────────────
  // Retreats have higher AOV than treks
  if (inquiry.interestedIn === 'retreat') {
    score += 10;
    signals.push('vertical:retreat(+10)');
  } else if (inquiry.interestedIn === 'trek') {
    score += 5;
    signals.push('vertical:trek(+5)');
  }

  // ── BUDGET SIGNAL ───────────────────────────────────────
  // Explicitly declared budget = high purchase intent
  const budgetMap: Record<string, number> = {
    '₹15–30k': 8,
    '₹30–60k': 15,
    '₹60k+': 20,
    'Not sure yet': 3,
  };
  const budgetPoints = budgetMap[inquiry.budget] ?? 0;
  if (budgetPoints > 0) {
    score += budgetPoints;
    signals.push(`budget:${inquiry.budget}(+${budgetPoints})`);
  }

  // ── CATEGORY (INTENT SIGNAL) ───────────────────────────
  const premiumCategories = ['luxury', 'private', 'premium'];
  const highIntentCategories = ['seasonal', 'near-delhi', 'weekend'];

  if (premiumCategories.includes(inquiry.category)) {
    score += 15;
    signals.push(`category:${inquiry.category}(+15:premium)`);
  } else if (highIntentCategories.includes(inquiry.category)) {
    score += 8;
    signals.push(`category:${inquiry.category}(+8:high_intent)`);
  } else if (inquiry.category) {
    score += 3;
    signals.push(`category:${inquiry.category}(+3)`);
  }

  // ── SOURCE PAGE DEPTH ──────────────────────────────────
  // Deeper pages = more research = more qualified
  const source = inquiry.source || '';
  if (source.includes('/journeys/')) {
    // Journey pages are bottom-of-funnel
    score += 12;
    signals.push('source:journey_page(+12)');
  } else if (source.includes('/retreats/') || source.includes('/treks/')) {
    score += 7;
    signals.push('source:pillar_page(+7)');
  } else if (source.includes('/compare/')) {
    score += 10;
    signals.push('source:comparison_page(+10)');
  } else if (source === '/' || source.includes('/blog/')) {
    score += 2;
    signals.push('source:top_funnel(+2)');
  }

  // Cap at 100
  score = Math.min(score, 100);

  // Determine tier
  let tier: LeadTier;
  if (score >= 70) tier = 'hot';
  else if (score >= 40) tier = 'warm';
  else tier = 'cold';

  return { score, tier, signals };
}
