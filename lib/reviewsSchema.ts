import type { ExperiencePage } from '@/config/experiencePages';
import { getReviewsForSlug } from '@/content/reviews';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateReviewSchemas, generateAggregateRatingSchema } from '@/components/seo/Schema';

/**
 * Central utility: computes review + aggregate rating schemas for an ExperiencePage.
 * Aggregates reviews across all retreatServiceSlugs on the page.
 */
export function getReviewSchemasForPage(page: ExperiencePage) {
  const allReviews = page.retreatServiceSlugs.flatMap((slug) => getReviewsForSlug(slug));
  const canonicalUrl = buildCanonicalUrl(`/${page.slug}`);

  const reviewSchemas =
    allReviews.length > 0
      ? generateReviewSchemas(allReviews, page.title, canonicalUrl)
      : [];

  const aggregateSchema =
    allReviews.length >= 2
      ? generateAggregateRatingSchema(
          Math.round((allReviews.reduce((sum, r) => sum + r.ratingValue, 0) / allReviews.length) * 10) / 10,
          allReviews.length,
          page.title,
          canonicalUrl,
        )
      : null;

  return { reviewSchemas, aggregateSchema };
}
