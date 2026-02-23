import { Metadata } from 'next';
import Link from 'next/link';
import { getRetreatServiceBySlug, getAllRetreatServices } from '@/content/retreats/services';
import { getLocationsWithRetreats, getLocationById } from '@/lib/locations';
import { getTreksByLocation } from '@/lib/treks';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateReviewSchemas,
  generateAggregateRatingSchema,
} from '@/components/seo/Schema';
import { getReviewsForSlug, getAggregateRating } from '@/content/reviews';
import RetreatJourneyClient from '../RetreatJourneyClient';
import RelatedRetreats from '@/components/RelatedRetreats';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import TrackedFAQ from '@/components/TrackedFAQ';
import RetreatScorePanel from '@/components/RetreatScoreBar';
import { RETREAT_SCORES } from '@/config/retreatScores';
import RatingBadge from '@/components/RatingBadge';
import type { LocationId } from '@/config/locations';

interface PageProps {
  params: Promise<{ retreat: string }>;
}

export function generateStaticParams(): { retreat: string }[] {
  return getAllRetreatServices().map((s) => ({ retreat: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { retreat } = await params;
  const retreatService = getRetreatServiceBySlug(retreat);

  if (!retreatService) {
    return {
      title: 'Retreat Not Found',
      robots: { index: false },
    };
  }

  const path = `/retreats/journeys/${retreat}`;
  const canonicalUrl = buildCanonicalUrl(path);

  return {
    title: `${retreatService.title} – Himalayan Retreat`,
    description: retreatService.oneLineEssence,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RetreatDetailPage({ params }: PageProps) {
  const { retreat } = await params;
  const retreatService = getRetreatServiceBySlug(retreat);

  if (!retreatService) {
    return (
      <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
        <h1>Retreat not found</h1>
        <Link href="/retreats" style={{ color: 'var(--color-primary)' }}>
          ← Back to all retreats
        </Link>
      </main>
    );
  }

  // Get locations where this retreat works best
  const allLocationsWithRetreats = getLocationsWithRetreats();
  const compatibleLocationIds: string[] = [
    retreatService.whereItWorksBest.primary,
    ...retreatService.whereItWorksBest.alsoWorks,
  ];
  const compatibleLocations = allLocationsWithRetreats.filter((loc) =>
    compatibleLocationIds.includes(loc.id),
  );

  const primaryLocationId = retreatService.whereItWorksBest.primary as LocationId;
  const treksAtPrimary = getTreksByLocation(primaryLocationId);
  const suggestedTrek = treksAtPrimary[0];

  const canonicalUrl = buildCanonicalUrl(`/retreats/journeys/${retreat}`);
  const primaryLocation = getLocationById(primaryLocationId);

  const serviceSchema = generateServiceSchema(
    { title: retreatService.title, description: retreatService.oneLineEssence },
    canonicalUrl,
    primaryLocation?.name ?? 'Chakrata',
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: retreatService.title, url: canonicalUrl },
  ]);

  const faqItems = [
    {
      question: `Who is the ${retreatService.title} retreat designed for?`,
      answer: retreatService.forNotFor.for.join('. '),
    },
    {
      question: `Who is this retreat not suitable for?`,
      answer: retreatService.forNotFor.notFor.join('. '),
    },
    {
      question: `What does a typical day look like?`,
      answer: retreatService.howItWorks.rhythm,
    },
    {
      question: `Where is this retreat held?`,
      answer: `This retreat works best in ${primaryLocation?.name ?? 'Chakrata'}. ${retreatService.whereItWorksBest.primaryReason}`,
    },
    {
      question: `How does this retreat adapt to different seasons and group sizes?`,
      answer: retreatService.adaptability,
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);

  // Review schema — only injected when real reviews exist
  const reviews = getReviewsForSlug(retreat);
  const aggregateRating = getAggregateRating(retreat);
  const reviewSchemas = reviews.length > 0
    ? generateReviewSchemas(reviews, retreatService.title, canonicalUrl)
    : [];
  const aggregateRatingSchema = aggregateRating
    ? generateAggregateRatingSchema(
        aggregateRating.ratingValue,
        aggregateRating.reviewCount,
        retreatService.title,
        canonicalUrl,
      )
    : null;

  const journeyPath = `/retreats/journeys/${retreat}`;

  return (
    <TrackedPage page={journeyPath} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {aggregateRatingSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
        />
      )}
      {reviewSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: retreatService.title },
        ]}
      />

      {aggregateRating && (
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <RatingBadge rating={{ value: aggregateRating.ratingValue, count: aggregateRating.reviewCount }} variant="standard" />
        </div>
      )}

      <p style={{ fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 'var(--space-lg)', color: 'var(--color-text)' }}>
        For a broader understanding of retreat formats, seasonal considerations, and how mountain
        programs differ across regions, see our complete guide to{' '}
        <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
          Himalayan Retreats in India
        </Link>
        .
      </p>

      <RetreatJourneyClient
        retreat={retreatService}
        locations={compatibleLocations}
        suggestedTrek={suggestedTrek}
      />

      <RelatedRetreats currentSlug={retreat} />

      {/* Compare links — surfaces the comparison engine */}
      {(() => {
        const others = getAllRetreatServices().filter((s) => s.slug !== retreat).slice(0, 3);
        if (others.length === 0) return null;
        const pairs = others.map((s) => {
          const [a, b] = retreat < s.slug ? [retreat, s.slug] : [s.slug, retreat];
          return { href: `/compare/${a}-vs-${b}`, label: `${retreatService.title} vs ${s.title}` };
        });
        return (
          <section style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-border, #e0e0e0)' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
              Compare This Retreat
            </h2>
            <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, margin: 0 }}>
              {pairs.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} style={{ color: 'var(--color-primary)' }}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })()}

      {RETREAT_SCORES[retreat] && (
        <section style={{ marginTop: 'var(--space-xl)', padding: '0 0 var(--space-lg)', borderTop: '1px solid var(--color-border, #e0e0e0)', paddingTop: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Program Profile
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>
            Editorial scores across four dimensions. Higher values indicate greater emphasis, not quality.
          </p>
          <div style={{ maxWidth: '22rem' }}>
            <RetreatScorePanel scores={RETREAT_SCORES[retreat]!} />
          </div>
        </section>
      )}

      <section style={{ marginTop: 'var(--space-xl)', padding: '0 0 var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-lg)' }}>
          Frequently Asked Questions
        </h2>
        <TrackedFAQ items={faqItems} page={journeyPath} />
      </section>
    </TrackedPage>
  );
}
