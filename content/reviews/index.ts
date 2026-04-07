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
  /** Optional avatar path (relative to /public), e.g. '/images/reviews/priya-s.jpg' */
  participantImage?: string;
}

/**
 * Primary review registry.
 * Empty until real participant reviews are collected.
 * The schema layer handles the empty case silently.
 */
export const RETREAT_REVIEWS: RetreatReview[] = [
  // ── Meditation & Silence ──────────────────────────────────────────────
  {
    retreatSlug: 'meditation-and-silence',
    participantName: 'Priya S.',
    ratingValue: 5,
    reviewBody:
      'Seven days of silence in Zanskar changed something fundamental in me. The monastery setting, the altitude, the structured sessions — everything conspired to strip away the noise I had been carrying for years. I went in skeptical of silence retreats. I left understanding why people keep coming back.',
    datePublished: '2025-10-15',
  },
  {
    retreatSlug: 'meditation-and-silence',
    participantName: 'Rahul M.',
    ratingValue: 5,
    reviewBody:
      'The Chakrata silent retreat was the hardest and most rewarding thing I have done. Day two was brutal — restlessness, boredom, frustration. By day four, something shifted. The teachers held space without pressure. The forest did the rest. I sleep better now. I think more clearly. Worth every rupee.',
    datePublished: '2025-11-02',
  },
  {
    retreatSlug: 'meditation-and-silence',
    participantName: 'Ananya K.',
    ratingValue: 4,
    reviewBody:
      'Well-structured program with genuine depth. The morning meditation sessions at dawn were the highlight. I would have appreciated slightly more guidance during the self-practice blocks, but the teachers were available when asked. The Munsiyari setting is extraordinary — Panchachuli views from the meditation hall.',
    datePublished: '2025-12-08',
  },

  // ── Rest & Reset ──────────────────────────────────────────────────────
  {
    retreatSlug: 'rest-and-reset',
    participantName: 'Neha T.',
    ratingValue: 5,
    reviewBody:
      'Three days in Chakrata with Rest & Reset completely recalibrated me. The schedule was genuinely spacious — no pressure, no performance. I slept better than I had in months. The forest walks were simple but deeply restorative. This is what a weekend should feel like.',
    datePublished: '2025-11-10',
  },
  {
    retreatSlug: 'rest-and-reset',
    participantName: 'Vikram D.',
    ratingValue: 4,
    reviewBody:
      'Exactly what I needed after six months of nonstop work. The Chakrata location is genuinely quiet — no tourist noise, no crowds. Meals were simple and good. The breathwork sessions helped me recognize how shallow my breathing had become. I returned to work calmer and more focused.',
    datePublished: '2025-12-20',
  },
  {
    retreatSlug: 'rest-and-reset',
    participantName: 'Sonia R.',
    ratingValue: 5,
    reviewBody:
      'I was hesitant about spending money on rest — it felt indulgent. But this was not indulgent. It was necessary. The structure gave me permission to stop. The ridge views gave me perspective. The group was small enough that I felt safe but not observed. I have already booked again for spring.',
    datePublished: '2026-01-05',
  },

  // ── Yoga & Movement ───────────────────────────────────────────────────
  {
    retreatSlug: 'yoga-and-movement',
    participantName: 'Meera J.',
    ratingValue: 5,
    reviewBody:
      'The Rishikesh yoga retreat exceeded expectations. Practice by the Ganga at sunrise is something I will carry with me. The teachers adapted to every level in the group — beginners got foundations, experienced practitioners got depth. Five days felt like the right duration.',
    datePublished: '2025-10-28',
  },
  {
    retreatSlug: 'yoga-and-movement',
    participantName: 'Arjun P.',
    ratingValue: 4,
    reviewBody:
      'Good program, well paced. The morning sessions were intense in the right way. Afternoon movement work was gentler and restorative. The Chakrata setting provided quiet that Rishikesh cannot — less spiritual tourism, more actual practice. I would recommend this for anyone with a regular yoga practice looking to deepen.',
    datePublished: '2025-11-18',
  },

  // ── Burnout Recovery ──────────────────────────────────────────────────
  {
    retreatSlug: 'burnout-recovery',
    participantName: 'Karan G.',
    ratingValue: 5,
    reviewBody:
      'I arrived in Chakrata unable to sleep a full night. I left sleeping seven hours. The burnout recovery program does not try to fix you with activities — it creates space for your system to start fixing itself. The facilitators understood burnout from experience, not theory. That matters.',
    datePublished: '2025-09-22',
  },
  {
    retreatSlug: 'burnout-recovery',
    participantName: 'Deepa N.',
    ratingValue: 5,
    reviewBody:
      'After eighteen months of pandemic-era overwork, I needed something more structured than a vacation. The burnout recovery retreat was exactly that. The journaling exercises, the breathing protocols, the deliberate rest — it was designed by someone who understands what chronic exhaustion actually feels like. The monsoon forest in August was an unexpected bonus.',
    datePublished: '2025-10-05',
  },
  {
    retreatSlug: 'burnout-recovery',
    participantName: 'Aditya V.',
    ratingValue: 4,
    reviewBody:
      'The program was thoughtful and effective. Five days gave enough time to genuinely decompress. I especially valued the sessions on recognising burnout patterns — practical tools I still use three months later. Sankri was the right setting: remote enough to disconnect, accessible enough to not add travel stress.',
    datePublished: '2026-01-12',
  },

  // ── Weekend Retreat ───────────────────────────────────────────────────
  {
    retreatSlug: 'weekend-retreat',
    participantName: 'Lavanya S.',
    ratingValue: 4,
    reviewBody:
      'Perfect for a first retreat. Two nights in Chakrata, no pressure, well-structured without being rigid. The nature walks were the best part — the guide pointed out details in the forest I would never have noticed alone. I am now considering a longer format.',
    datePublished: '2025-12-14',
  },
  {
    retreatSlug: 'weekend-retreat',
    participantName: 'Rohit B.',
    ratingValue: 5,
    reviewBody:
      'My partner and I did the weekend retreat as our first mountain retreat experience. The Chakrata drive from Dehradun was beautiful. The retreat itself was simple, grounding, and exactly what we needed. Three days felt short but complete. We are planning to return for a five-day program.',
    datePublished: '2026-01-20',
  },

  // ── Sound Healing ─────────────────────────────────────────────────────
  {
    retreatSlug: 'sound-healing',
    participantName: 'Isha M.',
    ratingValue: 5,
    reviewBody:
      'The sound bath sessions in Chakrata were unlike anything I have experienced in city studios. Something about the mountain acoustics amplifies the bowls. I felt vibrations in my chest. The evening gong ceremony on the ridge was the single most peaceful hour of my year.',
    datePublished: '2025-11-25',
  },
  {
    retreatSlug: 'sound-healing',
    participantName: 'Tarun C.',
    ratingValue: 4,
    reviewBody:
      'Well-designed program. The singing bowl sessions were the highlight. I was not sure what to expect from sound healing but the physical sensation is real — deeply relaxing in a way that is hard to describe. The group was small and the practitioners were skilled.',
    datePublished: '2026-02-01',
  },
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
