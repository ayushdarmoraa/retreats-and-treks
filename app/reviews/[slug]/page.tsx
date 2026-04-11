import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getReviewCluster, getAllReviewClusterSlugs } from '@/config/reviewClusters';
import { getReviewsForSlug } from '@/content/reviews';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateReviewSchemas, generateAggregateRatingSchema, generateBreadcrumbSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import ReviewCard from '@/components/reviews/ReviewCard';

export const dynamic = 'force-static';
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return getAllReviewClusterSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cluster = getReviewCluster(slug);
  if (!cluster) return { title: 'Not Found', robots: { index: false } };
  const canonical = buildCanonicalUrl(`/reviews/${cluster.slug}`);
  return {
    title: cluster.title,
    description: cluster.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: cluster.title,
      description: cluster.metaDescription,
      url: canonical,
      type: 'website',
      images: buildOgImages(cluster.title),
    },
  };
}

export default async function ReviewClusterPage({ params }: PageProps) {
  const { slug } = await params;
  const cluster = getReviewCluster(slug);
  if (!cluster) notFound();

  const canonical = buildCanonicalUrl(`/reviews/${cluster.slug}`);

  const allReviews = cluster.retreatServiceSlugs.flatMap((s) => getReviewsForSlug(s));
  const seen = new Set<string>();
  const uniqueReviews = allReviews.filter((r) => {
    const key = `${r.participantName}-${r.datePublished}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const sortedReviews = uniqueReviews.sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  );

  const totalReviews = sortedReviews.length;
  const avgRating =
    totalReviews > 0
      ? Math.round((sortedReviews.reduce((sum, r) => sum + r.ratingValue, 0) / totalReviews) * 10) / 10
      : 0;

  const reviewSchemas = generateReviewSchemas(sortedReviews, cluster.h1, canonical);
  const aggregateSchema =
    totalReviews >= 2
      ? generateAggregateRatingSchema(avgRating, totalReviews, cluster.h1, canonical)
      : null;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Reviews', url: buildCanonicalUrl('/reviews') },
    { name: cluster.h1, url: canonical },
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

      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Reviews', href: '/reviews' }, { name: cluster.h1 }]} />

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
          }}>{cluster.h1}</h1>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.95rem', fontWeight: 300,
            lineHeight: 1.85, color: '#3a3a3a',
            margin: '0 0 1.5rem',
            paddingLeft: '1.5rem',
            borderLeft: '2px solid rgba(15,118,110,0.25)',
          }}>{cluster.intro}</p>

          {/* Stats pills */}
          {totalReviews > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.5rem', marginBottom: '1.5rem' }}>
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

          {/* What People Experience box */}
          <div style={{
            background: '#ffffff', border: '1px solid #e5e7eb',
            borderLeft: '3px solid var(--color-primary)',
            borderRadius: '8px', padding: '1.5rem',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.92rem', fontWeight: 500,
              color: '#111111', margin: '0 0 0.75rem',
            }}>
              What People Actually Experience in {cluster.h1.replace('Experiences', '').trim()}
            </h2>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: '0 0 0.75rem' }}>
              Many participants describe the initial challenge of embracing silence, with the first day often being the hardest. As the retreat progresses, people report a deepening sense of calm and clarity, with emotional releases being common—sometimes through tears, sometimes through laughter.
            </p>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: '0 0 0.75rem' }}>
              For most, the absence of digital devices and constant communication leads to a profound digital detox. Many reviews mention the impact of nature: waking up to mountain sunrises, meditating in forests, and feeling the support of a like-minded group.
            </p>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
              These patterns—silence difficulty, emotional release, and nature's impact—are echoed across nearly every review. Scroll down to read real, unfiltered stories.
            </p>
          </div>
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
            {sortedReviews.map((review) => (
              <ReviewCard
                key={`${review.participantName}-${review.datePublished}`}
                review={review}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── COMMON THEMES ── */}
      <div style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#f7f9f7',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', display: 'inline-block' }} />
            <span style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.75rem', letterSpacing: '0.28em',
              textTransform: 'uppercase' as const,
              color: '#374151', fontWeight: 500,
            }}>Insights</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
            fontWeight: 200, letterSpacing: '-0.03em',
            color: '#111111', lineHeight: 1.15,
            margin: '0 0 1.5rem',
          }}>Common Themes Across Reviews</h2>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              'Deep mental clarity and peace after initial silence difficulty',
              'Emotional release — tears, laughter, and breakthroughs',
              'Profound impact of nature and digital detox',
              'Supportive group environment and personal transformation',
            ].map((theme) => (
              <div key={theme} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                background: '#ffffff', border: '1px solid #e5e7eb',
                borderRadius: '8px', padding: '0.875rem 1.125rem',
              }}>
                <span style={{ color: 'var(--color-primary)', fontSize: '0.8rem', marginTop: '2px', flexShrink: 0 }}>✦</span>
                <span style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.88rem', fontWeight: 300,
                  lineHeight: 1.6, color: '#3a3a3a',
                }}>{theme}</span>
              </div>
            ))}
          </div>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.85rem', fontWeight: 300,
            lineHeight: 1.85, color: '#6b7280',
          }}>
            These insights are distilled from real participant stories. Every journey is unique, but these themes appear again and again.
          </p>
        </div>
      </div>

      {/* ── EXPLORE FURTHER ── */}
      <div style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '3rem', paddingBottom: '3rem',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', display: 'inline-block' }} />
            <span style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.75rem', letterSpacing: '0.28em',
              textTransform: 'uppercase' as const,
              color: '#374151', fontWeight: 500,
            }}>Explore Further</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <Link href={cluster.primaryPageHref} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              borderBottom: '1px solid #e5e7eb',
              textDecoration: 'none',
              background: '#ffffff',
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.88rem', fontWeight: 300,
              color: '#333333',
            }}>
              <span>{cluster.primaryPageLabel}</span>
              <span style={{ color: '#374151', fontSize: '0.8rem' }}>→</span>
            </Link>
            <Link href="/reviews" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              textDecoration: 'none',
              background: '#ffffff',
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.88rem', fontWeight: 300,
              color: '#333333',
            }}>
              <span>All Reviews</span>
              <span style={{ color: '#374151', fontSize: '0.8rem' }}>→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}