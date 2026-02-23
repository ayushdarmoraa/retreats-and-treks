import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateWebsiteSchema, generateOrganizationSchema } from '@/components/seo/Schema';
import { getLocationsWithRetreats } from '@/lib/locations';
import HomeClient from './HomeClient';
import RetreatFinder from '@/components/RetreatFinder';
import { getAllRetreatServices } from '@/content/retreats/services';
import { getAggregateRating } from '@/content/reviews';

export function generateMetadata(): Metadata {
  return {
    title: 'Himalayan Retreats & Treks – Designed Around Your Intention',
    description:
      'Curated retreats and treks across carefully chosen Himalayan locations. Designed around your intention, not fixed schedules. Small groups, request-based journeys.',
    alternates: {
      canonical: buildCanonicalUrl('/'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function HomePage() {
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();
  const locationsWithRetreats = getLocationsWithRetreats();
  const allRetreats = getAllRetreatServices();
  const finderRatings = Object.fromEntries(
    allRetreats.flatMap((s) => {
      const r = getAggregateRating(s.slug);
      return r ? [[s.slug, { value: r.ratingValue, count: r.reviewCount }]] : [];
    }),
  );

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <HomeClient locations={locationsWithRetreats} />

      <section style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 var(--space-md) var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Not sure which retreat is right for you?
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)', fontSize: '0.95rem', lineHeight: 1.7 }}>
          Five questions. Two matches. No login required.
        </p>
        <RetreatFinder fromPath="/" ratings={finderRatings} />
      </section>

      <section style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 var(--space-md) var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          Retreat Planning Resources
        </h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, margin: 0 }}>
          <li>
            <Link href="/retreat-programs" style={{ color: 'var(--color-primary)' }}>
              Compare all retreat programs
            </Link>
          </li>
          <li>
            <Link href="/topics/retreat-decision" style={{ color: 'var(--color-primary)' }}>
              How to Choose the Right Retreat
            </Link>
          </li>
          <li>
            <Link href="/topics/location-authority" style={{ color: 'var(--color-primary)' }}>
              Explore Retreat Locations
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
