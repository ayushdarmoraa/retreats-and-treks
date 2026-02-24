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

      <h1 style={{ maxWidth: '64rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md) 0', fontSize: '2rem', fontWeight: 600, lineHeight: 1.15 }}>
        Himalayan Retreats and Guided Treks in India
      </h1>
      <HomeClient locations={locationsWithRetreats} />

      {/* ── FEATURED RETREATS & TREKS (server-rendered links for crawl depth) ── */ }
      <section style={{ maxWidth: '56rem', margin: '1.5rem auto', padding: '0 var(--space-md) var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Featured Retreats &amp; Treks</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
          Quick access to our core hubs, high-intent retreat programs, and priority locations.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Core Hubs</h3>
            <ul style={{ paddingLeft: '1rem', margin: 0, lineHeight: 1.7 }}>
              <li><Link href="/retreats">Himalayan retreats — all locations &amp; programs</Link></li>
              <li><Link href="/treks">Himalayan treks — weekend &amp; multi-day routes</Link></li>
              <li><Link href="/retreat-programs">Program comparison matrix — filter by duration &amp; intensity</Link></li>
              <li><Link href="/blog">Retreat &amp; trek blog — guides and comparisons</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>High-Intent Programs</h3>
            <ul style={{ paddingLeft: '1rem', margin: 0, lineHeight: 1.7 }}>
              <li><Link href="/retreats/journeys/burnout-recovery">Burnout Recovery retreat — deep restorative program</Link></li>
              <li><Link href="/retreats/journeys/rest-and-reset">Rest &amp; Reset retreat — nervous system recalibration</Link></li>
              <li><Link href="/retreats/journeys/yoga-and-movement">Yoga &amp; Movement retreat — embodied practice</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Priority Locations</h3>
            <ul style={{ paddingLeft: '1rem', margin: 0, lineHeight: 1.7 }}>
              <li><Link href="/retreats/chakrata">Chakrata retreat hub — forest retreats &amp; weekend escapes</Link></li>
              <li><Link href="/retreats/sankri">Sankri retreat hub — remote mountain retreats &amp; trek access</Link></li>
              <li><Link href="/retreats/rishikesh">Rishikesh retreat hub — yoga infrastructure &amp; riverfront retreats</Link></li>
            </ul>
          </div>
        </div>
      </section>

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
