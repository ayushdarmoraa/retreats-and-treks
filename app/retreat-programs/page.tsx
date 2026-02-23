import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateCollectionPageSchema, generateBreadcrumbSchema, generateItemListSchema } from '@/components/seo/Schema';
import { getAllRetreatServices } from '@/content/retreats/services';
import { RETREAT_DURATION_GROUP } from '@/config/retreatDurations';
import { RETREAT_MATRIX_META } from '@/config/retreatMatrix';
import { RETREAT_SCORES } from '@/config/retreatScores';
import { getAggregateRating } from '@/content/reviews';
import ProgramMatrixTable, { type MatrixRow } from '@/components/ProgramMatrixTable';
import Breadcrumb from '@/components/Breadcrumb';

const PATH = '/retreat-programs';

export function generateMetadata(): Metadata {
  return {
    title: 'All Himalayan Retreat Programs — Compare by Duration, Format & Intensity | Retreats And Treks',
    description:
      'Compare all structured Himalayan retreat programs side by side. Filter and sort by duration, location, intensity, and format to find the retreat that matches your needs.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'All Himalayan Retreat Programs — Compare & Choose | Retreats And Treks',
      description:
        'A complete matrix of structured retreat programs in the Indian Himalayas. Filter by duration, intensity, and format.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

export default function RetreatProgramsPage() {
  const services = getAllRetreatServices();
  const canonicalUrl = buildCanonicalUrl(PATH);

  // Build structured matrix rows (server-side, passed to client component)
  const rows: MatrixRow[] = services.map((s) => {
    const meta = RETREAT_MATRIX_META[s.slug];
    return {
      slug: s.slug,
      title: s.title,
      duration: RETREAT_DURATION_GROUP[s.slug] ?? 'flexible',
      primaryLocation: s.whereItWorksBest.primary,
      intensity: meta?.intensity ?? 'medium',
      format: meta?.format ?? 'hybrid',
      bestFor: meta?.bestFor ?? s.oneLineEssence,
      scores: RETREAT_SCORES[s.slug],
      rating: (() => { const r = getAggregateRating(s.slug); return r ? { value: r.ratingValue, count: r.reviewCount } : undefined; })(),
    };
  });

  const collectionSchema = generateCollectionPageSchema({
    name: 'Himalayan Retreat Programs',
    description:
      'A complete collection of structured retreat programs in the Indian Himalayas, covering rest, yoga, meditation, creative, sound healing, and custom formats.',
    url: canonicalUrl,
  });

  const itemListSchema = generateItemListSchema(
    services.map((s) => ({
      name: s.title,
      url: buildCanonicalUrl(`/retreats/journeys/${s.slug}`),
    })),
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Himalayan Retreats', url: buildCanonicalUrl('/retreats/himalayan-retreats') },
    { name: 'All Retreat Programs', url: canonicalUrl },
  ]);

  return (
    <main style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Himalayan Retreats', href: '/retreats/himalayan-retreats' },
          { name: 'All Programs' },
        ]}
      />

      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 'var(--space-md)', lineHeight: 1.3 }}>
        All Retreat Programs
      </h1>
      <p style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: 'var(--space-xl)', color: 'var(--color-text-secondary)', maxWidth: '48rem' }}>
        A complete overview of all structured retreat programs available through Retreats And Treks.
        Sort by duration, location, or intensity, and filter to find the program that matches your
        current need.
      </p>

      {/* Sortable matrix — client component for interactivity */}
      <ProgramMatrixTable rows={rows} fromPath={PATH} />

      {/* Popular comparisons */}
      <section style={{ marginTop: 'var(--space-xl)', borderTop: '1px solid var(--color-border, #e0e0e0)', paddingTop: 'var(--space-lg)' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
          Popular Comparisons
        </h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, color: 'var(--color-text-secondary)' }}>
          <li>
            <Link href="/compare/burnout-recovery-vs-rest-and-reset" style={{ color: 'var(--color-primary)' }}>
              Burnout Recovery vs Rest &amp; Reset
            </Link>
          </li>
          <li>
            <Link href="/compare/meditation-and-silence-vs-yoga-and-movement" style={{ color: 'var(--color-primary)' }}>
              Meditation &amp; Silence vs Yoga &amp; Movement
            </Link>
          </li>
          <li>
            <Link href="/compare/sound-healing-vs-weekend-retreat" style={{ color: 'var(--color-primary)' }}>
              Sound Healing vs Weekend Retreat
            </Link>
          </li>
          <li>
            <Link href="/compare/art-and-creative-vs-burnout-recovery" style={{ color: 'var(--color-primary)' }}>
              Art &amp; Creative vs Burnout Recovery
            </Link>
          </li>
        </ul>
      </section>

      {/* Editorial guide links */}
      <section style={{ marginTop: 'var(--space-lg)', borderTop: '1px solid var(--color-border, #e0e0e0)', paddingTop: 'var(--space-lg)' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
          Need help deciding?
        </h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, color: 'var(--color-text-secondary)' }}>
          <li>
            <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Complete guide to Himalayan retreats in India
            </Link>
          </li>
          <li>
            <Link href="/topics/retreat-decision" style={{ color: 'var(--color-primary)' }}>
              Retreat decision guides — how to choose the right format
            </Link>
          </li>
          <li>
            <Link href="/blog/3-day-vs-5-day-himalayan-retreat" style={{ color: 'var(--color-primary)' }}>
              3-day vs 5-day — which duration is right for you?
            </Link>
          </li>
          <li>
            <Link href="/blog/retreat-vs-trek-which-is-right-for-you" style={{ color: 'var(--color-primary)' }}>
              Retreat vs trek — understanding the difference
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
