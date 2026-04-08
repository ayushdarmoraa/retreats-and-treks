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

/* ── Styles ─────────────────────────────────────────────────────────── */
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

export default async function ReviewClusterPage({ params }: PageProps) {
  const { slug } = await params;
  const cluster = getReviewCluster(slug);
  if (!cluster) notFound();

  const canonical = buildCanonicalUrl(`/reviews/${cluster.slug}`);

  // Aggregate reviews across all service slugs for this cluster
  const allReviews = cluster.retreatServiceSlugs.flatMap((s) => getReviewsForSlug(s));

  // Deduplicate reviews that share slugs with other clusters
  const seen = new Set<string>();
  const uniqueReviews = allReviews.filter((r) => {
    const key = `${r.participantName}-${r.datePublished}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort newest first
  const sortedReviews = uniqueReviews.sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  );

  const totalReviews = sortedReviews.length;
  const avgRating =
    totalReviews > 0
      ? Math.round((sortedReviews.reduce((sum, r) => sum + r.ratingValue, 0) / totalReviews) * 10) / 10
      : 0;

  // Schema
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
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Reviews', href: '/reviews' }, { name: cluster.h1 }]} />

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


      {/* ── Hero & Context Block ────────────────────────────────── */}
      <header style={{ ...sectionStyle, paddingBottom: 0 }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{cluster.h1}</h1>
        <p
          style={{
            lineHeight: 1.75,
            color: 'var(--color-text)',
            fontSize: '1.05rem',
            marginBottom: '1rem',
          }}
        >
          {cluster.intro}
        </p>
        {/* Context Block: What People Actually Experience */}
        <section style={{ marginTop: '1.5rem', marginBottom: '1.5rem', background: 'var(--color-bg-alt)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            What People Actually Experience in {cluster.h1.replace('Experiences', '').trim()}
          </h2>
          <p style={{ marginBottom: '0.75rem' }}>
            Many participants describe the initial challenge of embracing silence, with the first day often being the hardest. As the retreat progresses, people report a deepening sense of calm and clarity, with emotional releases being common—sometimes through tears, sometimes through laughter. The natural surroundings play a powerful role, helping guests reconnect with themselves and the world around them.
          </p>
          <p style={{ marginBottom: '0.75rem' }}>
            For most, the absence of digital devices and constant communication leads to a profound digital detox. Many reviews mention the impact of nature: waking up to mountain sunrises, meditating in forests, and feeling the support of a like-minded group. By the end, participants often express gratitude for the space to reflect, heal, and rediscover their inner peace.
          </p>
          <p>
            These patterns—silence difficulty, emotional release, and nature’s impact—are echoed across nearly every review. Scroll down to read real, unfiltered stories from those who have completed these retreats.
          </p>
        </section>
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
              <strong>{totalReviews}</strong> reviews
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
          {sortedReviews.map((review) => (
            <ReviewCard
              key={`${review.participantName}-${review.datePublished}`}
              review={review}
            />
          ))}
        </div>
      </section>

      {/* ── Summary Insights ─────────────────────────────────────── */}
      <section style={{ ...sectionStyle, background: 'var(--color-bg-alt)', marginTop: '2rem', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Common Themes Across Reviews</h2>
        <ul style={{ marginLeft: '1.25rem', marginBottom: '0.75rem', lineHeight: 1.7 }}>
          <li>Deep mental clarity and peace after initial silence difficulty</li>
          <li>Emotional release—tears, laughter, and breakthroughs</li>
          <li>Profound impact of nature and digital detox</li>
          <li>Supportive group environment and personal transformation</li>
        </ul>
        <p style={{ fontSize: '0.98rem', color: 'var(--color-text)' }}>
          These insights are distilled from real participant stories. Every journey is unique, but these themes appear again and again in the reviews below.
        </p>
      </section>

      {/* ── Internal Links ───────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Explore Further</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
          <Link href={cluster.primaryPageHref} style={{ color: 'var(--color-primary)' }}>
            {cluster.primaryPageLabel} →
          </Link>
          <Link href="/reviews" style={{ color: 'var(--color-primary)' }}>
            All reviews →
          </Link>
        </div>
      </section>
    </>
  );
}
