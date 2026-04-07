/**
 * Review Cluster Pages — programmatic SEO layer
 *
 * Each cluster page aggregates reviews for a set of retreat service slugs,
 * with unique H1, metadata, and canonical URL. Pages are only created when
 * enough reviews exist to form a meaningful page (≥3).
 *
 * To add a new cluster: append to REVIEW_CLUSTERS and reviews will flow automatically.
 */

export interface ReviewCluster {
  /** URL slug: /reviews/[slug] */
  readonly slug: string;
  readonly title: string;
  readonly h1: string;
  readonly metaDescription: string;
  readonly intro: string;
  /** Retreat service slugs whose reviews appear on this page */
  readonly retreatServiceSlugs: readonly string[];
  /** Link to the primary experience/money page */
  readonly primaryPageHref: string;
  readonly primaryPageLabel: string;
}

export const REVIEW_CLUSTERS: readonly ReviewCluster[] = [
  {
    slug: 'burnout-recovery',
    title: 'Burnout Recovery Retreat Reviews | Retreats And Treks',
    h1: 'Burnout Recovery Retreat Experiences',
    metaDescription:
      'Reviews from professionals who attended burnout recovery retreats in Chakrata and Sankri. Real stories of decompression, nervous system reset, and returning to work differently.',
    intro:
      'Burnout does not resolve with a weekend off. These are stories from people who took five to seven days away from screens, deadlines, and performance — and came back measurably different.',
    retreatServiceSlugs: ['burnout-recovery', 'rest-and-reset'],
    primaryPageHref: '/burnout-recovery-retreats',
    primaryPageLabel: 'Explore Burnout Recovery Retreats',
  },
  {
    slug: 'meditation-retreats',
    title: 'Meditation Retreat Reviews & Experiences | Retreats And Treks',
    h1: 'Real Meditation Retreat Experiences in India',
    metaDescription:
      'Real participant reviews from meditation retreats across the Himalayas. Honest stories of silence, insight, and transformation.',
    intro:
      'What is it really like to attend a meditation retreat? These reviews share the unfiltered experiences of people who spent days in silence, learning to observe their minds and reconnect with themselves. From first-timers to seasoned practitioners, discover what actually happens when you step away from daily noise and into deep stillness.',
    retreatServiceSlugs: ['meditation-and-silence', 'rest-and-reset'],
    primaryPageHref: '/meditation-retreats',
    primaryPageLabel: 'Explore Meditation Retreats',
  },
  {
    slug: 'anxiety-relief',
    title: 'Anxiety Relief Retreat Reviews | Retreats And Treks',
    h1: 'Anxiety Relief Retreat Experiences',
    metaDescription:
      'First-hand reviews from participants who attended retreats focused on anxiety relief. Real stories of healing, calm, and new perspective.',
    intro:
      'Anxiety can feel isolating, but you are not alone. These reviews come from people who joined retreats designed to help manage and relieve anxiety. Through meditation, nature immersion, and supportive guidance, participants share how their relationship with anxiety changed—and what tools they took home.',
    retreatServiceSlugs: ['rest-and-reset', 'burnout-recovery'],
    primaryPageHref: '/anxiety-healing-retreat',
    primaryPageLabel: 'Explore Anxiety Healing Retreats',
  },
  {
    slug: 'chakrata',
    title: 'Chakrata Retreat Reviews | Retreats And Treks',
    h1: 'Real Retreat Experiences in Chakrata',
    metaDescription:
      'Authentic reviews from people who attended retreats in Chakrata. Insights on the location, programs, and personal transformation.',
    intro:
      'Chakrata is more than a destination—it’s a container for deep rest and renewal. These reviews are from participants who experienced the unique energy of Chakrata through meditation, yoga, and healing retreats. Read what makes this Himalayan town a true retreat haven.',
    retreatServiceSlugs: [
      'rest-and-reset',
      'meditation-and-silence',
      'yoga-and-movement',
      'burnout-recovery',
      'sound-healing',
      'weekend-retreat'
    ],
    primaryPageHref: '/locations/chakrata',
    primaryPageLabel: 'About Chakrata Retreats',
  },
  // Removed clusters: yoga-retreats, sankri (insufficient reviews)
];

export function getReviewCluster(slug: string): ReviewCluster | undefined {
  return REVIEW_CLUSTERS.find((c) => c.slug === slug);
}

export function getAllReviewClusterSlugs(): string[] {
  return REVIEW_CLUSTERS.map((c) => c.slug);
}
