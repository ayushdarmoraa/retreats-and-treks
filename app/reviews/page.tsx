import { Metadata } from 'next';
import Link from 'next/link';
import { RETREAT_REVIEWS } from '@/content/reviews';
import { EXPERIENCE_PAGES } from '@/config/experiencePages';
import { REVIEW_CLUSTERS } from '@/config/reviewClusters';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateReviewSchemas, generateAggregateRatingSchema, generateBreadcrumbSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import ReviewCard from '@/components/reviews/ReviewCard';

export const dynamic = 'force-static';

const PAGE_TITLE = 'Retreat Reviews & Experiences | Retreats And Treks';
const PAGE_DESCRIPTION =
  'Real reviews from participants who attended our meditation, yoga, silent, and healing retreats in the Himalayas. Honest experiences from Zanskar, Chakrata, Rishikesh, and more.';
const CANONICAL = buildCanonicalUrl('/reviews');

export function generateMetadata(): Metadata {
  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    alternates: { canonical: CANONICAL },
    openGraph: {
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: CANONICAL,
      type: 'website',
      images: buildOgImages(PAGE_TITLE),
    },
  };
}

/* ── Reverse map: retreatSlug → best experience page URL ────────────── */
function getPageUrlForRetreatSlug(retreatSlug: string): string | null {
  const page = EXPERIENCE_PAGES.find((p) =>
    p.retreatServiceSlugs.includes(retreatSlug),
  );
  return page ? `/${page.slug}` : null;
}

/* ── Styles (matching existing inline pattern) ──────────────────────── */
const sectionStyle = {
  maxWidth: '56rem',
  margin: '0 auto',
  padding: 'var(--space-xl) var(--space-md)',
} as const;

const h2Style = {
  fontSize: '1.35rem',
  fontWeight: 600,
  marginBottom: '0.75rem',
} as const;

export default function ReviewsPage() {
  // Sort reviews by date, newest first
  const sortedReviews = [...RETREAT_REVIEWS].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  );

  // Aggregate stats
  const totalReviews = sortedReviews.length;
  const avgRating =
    totalReviews > 0
      ? Math.round((sortedReviews.reduce((sum, r) => sum + r.ratingValue, 0) / totalReviews) * 10) / 10
      : 0;

  // Schema
  const reviewSchemas = generateReviewSchemas(sortedReviews, 'Retreats And Treks', CANONICAL);
  const aggregateSchema =
    totalReviews >= 2
      ? generateAggregateRatingSchema(avgRating, totalReviews, 'Retreats And Treks', CANONICAL)
      : null;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Reviews', url: CANONICAL },
  ]);

  return (
    <>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Reviews' }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {reviewSchemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              ...reviewSchemas,
              ...(aggregateSchema ? [aggregateSchema] : []),
            ]),
          }}
        />
      )}

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header style={{ ...sectionStyle, paddingBottom: 0 }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Real Retreat Experiences in the Himalayas
        </h1>
        <p
          style={{
            lineHeight: 1.75,
            color: 'var(--color-text)',
            fontSize: '1.05rem',
            marginBottom: '1rem',
          }}
        >
          Stories from people who attended our meditation, yoga, and silent retreats across
          Zanskar, Chakrata, Rishikesh, and the wider Himalayas.
        </p>
      </header>

      {/* ── Aggregate Stats ──────────────────────────────────────── */}
      {totalReviews > 0 && (
        <section style={{ ...sectionStyle, paddingTop: 0, paddingBottom: 0 }}>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-xl)',
              flexWrap: 'wrap',
              padding: '1rem 1.25rem',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.95rem',
              color: 'var(--color-text)',
            }}
          >
            <span>
              <strong>{totalReviews}</strong> verified reviews
            </span>
            <span>
              <strong>{avgRating}</strong> average rating {'★'.repeat(Math.round(avgRating))}
            </span>
          </div>
        </section>
      )}

      {/* ── Review Grid ──────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>All Reviews</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 26rem), 1fr))',
            gap: 'var(--space-md)',
          }}
        >
          {sortedReviews.map((review) => {
            const pageUrl = getPageUrlForRetreatSlug(review.retreatSlug);
            const card = (
              <ReviewCard
                key={`${review.participantName}-${review.datePublished}`}
                review={review}
              />
            );

            return pageUrl ? (
              <Link
                key={`${review.participantName}-${review.datePublished}`}
                href={pageUrl}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {card}
              </Link>
            ) : (
              card
            );
          })}
        </div>
      </section>

      {/* ── Explore by Category ──────────────────────────────────── */}
      {REVIEW_CLUSTERS.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Explore Reviews by Category</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {REVIEW_CLUSTERS.map((cluster) => (
              <Link
                key={cluster.slug}
                href={`/reviews/${cluster.slug}`}
                style={{
                  display: 'block',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1rem 1.25rem',
                  textDecoration: 'none',
                  color: 'var(--color-primary)',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                }}
              >
                {cluster.h1} →
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
