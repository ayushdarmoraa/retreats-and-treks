/**
 * Retreat Review Registry
 *
 * Each review maps to a retreat slug. Reviews are injected into:
 *   - Review JSON-LD schema on journey pages
 *   - AggregateRating schema (auto-computed when ≥2 reviews exist)
 *
 * Rules:
 *   - participantName may be a first name + initial only (privacy)
 *   - ratingValue must be 1–5
 *   - reviewBody must be genuine, specific, non-promotional
 *   - datePublished must be the actual date received
 *   - No fabricated reviews. Leave array empty until real reviews exist.
 *
 * To add a review: append an entry to RETREAT_REVIEWS with the correct
 * retreatSlug matching a slug from content/retreats/services.ts
 */

export interface RetreatReview {
  retreatSlug: string;
  participantName: string;
  ratingValue: number;     // 1–5
  reviewBody: string;
  datePublished: string;   // ISO date: YYYY-MM-DD
}

/**
 * Primary review registry.
 * Empty until real participant reviews are collected.
 * The schema layer handles the empty case silently.
 */
export const RETREAT_REVIEWS: RetreatReview[] = [
  // Example structure — replace with real reviews as they arrive:
  //
  // {
  //   retreatSlug: 'rest-and-reset',
  //   participantName: 'Priya S.',
  //   ratingValue: 5,
  //   reviewBody:
  //     'Three days in Chakrata with Rest & Reset completely recalibrated me. ' +
  //     'The schedule was genuinely spacious — no pressure, no performance. ' +
  //     'I slept better than I had in months.',
  //   datePublished: '2025-11-10',
  // },
];

/**
 * Get all reviews for a specific retreat slug.
 * Returns empty array if none exist (consumer must guard before rendering schema).
 */
export function getReviewsForSlug(slug: string): RetreatReview[] {
  return RETREAT_REVIEWS.filter((r) => r.retreatSlug === slug);
}

/**
 * Get aggregate statistics for a retreat slug.
 * Returns null if fewer than 2 reviews exist (insufficient for AggregateRating schema).
 */
export function getAggregateRating(
  slug: string,
): { ratingValue: number; reviewCount: number } | null {
  const reviews = getReviewsForSlug(slug);
  if (reviews.length < 2) return null;
  const avg = reviews.reduce((sum, r) => sum + r.ratingValue, 0) / reviews.length;
  return {
    ratingValue: Math.round(avg * 10) / 10,
    reviewCount: reviews.length,
  };
}
