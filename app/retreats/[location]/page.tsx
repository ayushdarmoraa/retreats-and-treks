import { Metadata } from 'next';
import Link from 'next/link';
import { getRetreatsByLocation } from '@/lib/retreats';
import { getLocationById, getAllLocations } from '@/lib/locations';
import { getRetreatHubMetadata } from '@/lib/metadata';
import { getLocationPremiumContent } from '@/content/locations';
import { getRetreatServiceBySlug } from '@/content/retreats/services';
import { getTrekBySlug } from '@/content/treks';
import type { LocationId } from '@/config/locations';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import {
  generateTouristDestinationSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
} from '@/components/seo/Schema';
import RetreatsLocationClient from './RetreatsLocationClient';
import Breadcrumb from '@/components/Breadcrumb';

interface PageProps {
  params: Promise<{ location: string }>;
}

export function generateStaticParams(): { location: string }[] {
  return getAllLocations()
    .filter((loc) => loc.supportsRetreats)
    .map((loc) => ({ location: loc.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location } = await params;
  const locationId = location as unknown as LocationId;
  return getRetreatHubMetadata(locationId);
}

export default async function RetreatsLocationPage({ params }: PageProps) {
  const { location } = await params;
  const locationId = location as unknown as LocationId;
  const locationData = getLocationById(locationId);
  const locationPremiumContent = getLocationPremiumContent(locationId);
  const retreats = getRetreatsByLocation(locationId);

  if (!locationData || !locationPremiumContent) {
    return (
      <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
        <h1>Location not found</h1>
        <Link href="/retreats" style={{ color: 'var(--color-primary)' }}>
          ← Back to all retreats
        </Link>
      </main>
    );
  }

  // Fetch retreat services for this location
  const retreatServices = locationPremiumContent.retreatSlugs
    .map((slug) => getRetreatServiceBySlug(slug))
    .filter((service) => service !== undefined);

  // Fetch treks for this location
  const treks = locationPremiumContent.trekSlugs
    .map((slug) => getTrekBySlug(slug))
    .filter((trek) => trek !== undefined);

  const canonicalUrl = buildCanonicalUrl(`/retreats/${location}`);

  const touristDestinationSchema = generateTouristDestinationSchema(locationData, canonicalUrl);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: locationData.name, url: canonicalUrl },
  ]);

  const itemListSchema = generateItemListSchema([
    ...retreatServices.map((service) => ({
      name: service.title,
      url: buildCanonicalUrl(`/retreats/journeys/${service.slug}`),
    })),
    ...treks.map((trek) => ({
      name: trek.title,
      url: buildCanonicalUrl(`/treks/${trek.slug}`),
    })),
  ]);

  return (
    <>
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: locationData.name },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristDestinationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <p style={{ maxWidth: '56rem', margin: '0 auto var(--space-md)', padding: '0 var(--space-md)', fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--color-text)' }}>
        For a broader understanding of formats, seasonal differences, and how mountain retreats are
        structured across regions, see our complete guide to{' '}
        <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
          Himalayan Retreats in India
        </Link>
        .
      </p>
      <RetreatsLocationClient
        locationPremiumContent={locationPremiumContent}
        retreats={retreats}
        retreatServices={retreatServices}
        treks={treks}
        locationId={location}
      />
      {location === 'chakrata' && (
        <section style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-xl) var(--space-md)' }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Planning Your Chakrata Retreat</h2>
          <p style={{ marginBottom: '0.75rem', lineHeight: 1.75 }}>
            If you are considering a retreat in Chakrata, the following guides may help you plan effectively:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <Link href="/blog/best-time-for-retreat-in-chakrata" style={{ color: 'var(--color-primary)' }}>
                Best time for a retreat in Chakrata
              </Link>
            </li>
            <li>
              <Link href="/blog/how-to-reach-chakrata-for-a-retreat" style={{ color: 'var(--color-primary)' }}>
                How to reach Chakrata for a retreat
              </Link>
            </li>
            <li>
              <Link href="/blog/is-chakrata-good-for-a-retreat" style={{ color: 'var(--color-primary)' }}>
                Is Chakrata good for a retreat?
              </Link>
            </li>
            <li>
              <Link href="/blog/chakrata-vs-rishikesh-for-a-retreat" style={{ color: 'var(--color-primary)' }}>
                Chakrata vs Rishikesh for a retreat
              </Link>
            </li>
          </ul>
          <p style={{ lineHeight: 1.75 }}>
            For broader regional context, see our guide to{' '}
            <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Himalayan Retreats in India
            </Link>
            .
          </p>
        </section>
      )}

      {location === 'sankri' && (
        <section style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-xl) var(--space-md)' }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Planning Your Sankri Retreat</h2>
          <p style={{ marginBottom: '0.75rem', lineHeight: 1.75 }}>
            If you are considering a retreat in Sankri, the following guides may help you plan effectively:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <Link href="/blog/best-time-for-retreat-in-sankri" style={{ color: 'var(--color-primary)' }}>
                Best time for a retreat in Sankri
              </Link>
            </li>
            <li>
              <Link href="/blog/how-to-reach-sankri-for-a-retreat" style={{ color: 'var(--color-primary)' }}>
                How to reach Sankri for a retreat
              </Link>
            </li>
            <li>
              <Link href="/blog/is-sankri-good-for-a-retreat" style={{ color: 'var(--color-primary)' }}>
                Is Sankri good for a retreat?
              </Link>
            </li>
            <li>
              <Link href="/blog/chakrata-vs-sankri" style={{ color: 'var(--color-primary)' }}>
                Chakrata vs Sankri: which is right for you?
              </Link>
            </li>
          </ul>
          <p style={{ lineHeight: 1.75 }}>
            For broader regional context, see our guide to{' '}
            <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Himalayan Retreats in India
            </Link>
            .
          </p>
        </section>
      )}

      {location === 'munsiyari' && (
        <section style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-xl) var(--space-md)' }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Planning Your Munsiyari Retreat</h2>
          <p style={{ marginBottom: '0.75rem', lineHeight: 1.75 }}>
            If you are considering a retreat in Munsiyari, the following guides may help you plan effectively:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <Link href="/blog/best-time-for-retreat-in-munsiyari" style={{ color: 'var(--color-primary)' }}>
                Best time for a retreat in Munsiyari
              </Link>
            </li>
            <li>
              <Link href="/blog/how-to-reach-munsiyari-for-a-retreat" style={{ color: 'var(--color-primary)' }}>
                How to reach Munsiyari for a retreat
              </Link>
            </li>
            <li>
              <Link href="/blog/is-munsiyari-good-for-a-retreat" style={{ color: 'var(--color-primary)' }}>
                Is Munsiyari good for a retreat?
              </Link>
            </li>
          </ul>
          <p style={{ lineHeight: 1.75 }}>
            For broader regional context, see our guide to{' '}
            <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Himalayan Retreats in India
            </Link>
            .
          </p>
        </section>
      )}

      {location === 'rishikesh' && (
        <section style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-xl) var(--space-md)' }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Planning Your Rishikesh Retreat</h2>
          <p style={{ marginBottom: '0.75rem', lineHeight: 1.75 }}>
            If you are considering a retreat in Rishikesh, the following guides may help you plan effectively:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <Link href="/blog/best-time-for-retreat-in-rishikesh" style={{ color: 'var(--color-primary)' }}>
                Best time for a retreat in Rishikesh
              </Link>
            </li>
            <li>
              <Link href="/blog/how-to-reach-rishikesh-for-a-retreat" style={{ color: 'var(--color-primary)' }}>
                How to reach Rishikesh for a retreat
              </Link>
            </li>
            <li>
              <Link href="/blog/is-rishikesh-good-for-a-retreat" style={{ color: 'var(--color-primary)' }}>
                Is Rishikesh good for a retreat?
              </Link>
            </li>
            <li>
              <Link href="/blog/chakrata-vs-rishikesh-for-a-retreat" style={{ color: 'var(--color-primary)' }}>
                Chakrata vs Rishikesh for a retreat
              </Link>
            </li>
          </ul>
          <p style={{ lineHeight: 1.75 }}>
            For broader regional context, see our guide to{' '}
            <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Himalayan Retreats in India
            </Link>
            .
          </p>
        </section>
      )}
    </>
  );
}
