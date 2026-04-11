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

function getPageUrlForRetreatSlug(retreatSlug: string): string | null {
  const page = EXPERIENCE_PAGES.find((p) => p.retreatServiceSlugs.includes(retreatSlug));
  return page ? `/${page.slug}` : null;
}

export default function ReviewsPage() {
  const sortedReviews = [...RETREAT_REVIEWS].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  );

  const totalReviews = sortedReviews.length;
  const avgRating =
    totalReviews > 0
      ? Math.round((sortedReviews.reduce((sum, r) => sum + r.ratingValue, 0) / totalReviews) * 10) / 10
      : 0;

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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

      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Reviews' }]} />

      <article>

        {/* ── HERO ── */}
        <div style={{
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          background: '#f7f9f7',
          paddingTop: '4rem', paddingBottom: '4rem',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', display: 'inline-block' }} />
              <span style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.75rem', letterSpacing: '0.28em',
                textTransform: 'uppercase' as const,
                color: '#374151', fontWeight: 500,
              }}>Participant Stories</span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
              fontWeight: 200, letterSpacing: '-0.035em',
              color: '#111111', lineHeight: 1.1,
              margin: '0 0 1.5rem',
            }}>
              Real Retreat Experiences in the Himalayas
            </h1>
            <p style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.95rem', fontWeight: 300,
              lineHeight: 1.85, color: '#3a3a3a',
              margin: '0 0 2rem',
              paddingLeft: '1.5rem',
              borderLeft: '2px solid rgba(15,118,110,0.25)',
            }}>
              Stories from people who attended our meditation, yoga, and silent retreats across
              Zanskar, Chakrata, Rishikesh, and the wider Himalayas.
            </p>

            {/* Stats pills */}
            {totalReviews > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.5rem' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.78rem', fontWeight: 300, color: '#333333',
                  background: '#ffffff', border: '1px solid #e5e7eb',
                  borderRadius: '100px', padding: '5px 14px',
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#374151' }}>Reviews</span>
                  {totalReviews} verified
                </span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.78rem', fontWeight: 300, color: '#333333',
                  background: '#ffffff', border: '1px solid #e5e7eb',
                  borderRadius: '100px', padding: '5px 14px',
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#374151' }}>Rating</span>
                  {avgRating} / 5
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── REVIEW GRID ── */}
        <div style={{
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          background: '#ffffff',
          paddingTop: '4rem', paddingBottom: '4rem',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', display: 'inline-block' }} />
              <span style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.75rem', letterSpacing: '0.28em',
                textTransform: 'uppercase' as const,
                color: '#374151', fontWeight: 500,
              }}>All Reviews</span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 24rem), 1fr))',
              gap: '1.25rem',
            }}>
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
                ) : card;
              })}
            </div>
          </div>
        </div>

        {/* ── EXPLORE BY CATEGORY ── */}
        {REVIEW_CLUSTERS.length > 0 && (
          <div style={{
            width: '100vw', marginLeft: 'calc(-50vw + 50%)',
            background: '#f7f9f7',
            paddingTop: '4rem', paddingBottom: '4rem',
          }}>
            <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', display: 'inline-block' }} />
                <span style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.75rem', letterSpacing: '0.28em',
                  textTransform: 'uppercase' as const,
                  color: '#374151', fontWeight: 500,
                }}>Browse by Category</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                fontWeight: 200, letterSpacing: '-0.03em',
                color: '#111111', lineHeight: 1.15,
                margin: '0 0 1.75rem',
              }}>Explore Reviews by Category</h2>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                {REVIEW_CLUSTERS.map((cluster, i, arr) => (
                  <Link
                    key={cluster.slug}
                    href={`/reviews/${cluster.slug}`}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '1rem 1.25rem',
                      borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none',
                      textDecoration: 'none',
                      background: '#ffffff',
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '0.88rem', fontWeight: 300,
                      color: '#333333',
                      transition: 'background 0.15s',
                    }}
                  >
                    <span>{cluster.h1}</span>
                    <span style={{ color: '#374151', fontSize: '0.8rem' }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

      </article>
    </>
  );
}