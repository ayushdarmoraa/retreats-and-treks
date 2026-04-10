import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import TrekConversionLayer from '@/components/TrekConversionLayer';
import TrekDeparturesTable from '@/components/TrekDeparturesTable';
import TrekMiniLeadForm from '@/components/TrekMiniLeadForm';
import ItineraryMicroCTA from '@/components/ItineraryMicroCTA';
import { getTreksByLocation } from '@/lib/treks';
import { getLocationById, getAllLocations } from '@/lib/locations';
import type { LocationId } from '@/config/locations';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import {
  generateTrekSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';

// Deterministic trek comparison blog mapping
// Only add entries where a dedicated comparison blog exists

// Map trek slugs to itinerary photo folder names
const trekItineraryFolderMap: Record<string, string> = {
  'kedarkantha-trek': 'kedarkantha',
  'brahmatal-trek': 'brahmatal',
  'har-ki-dun-trek': 'har-ki-dun',
  'kuari-pass-trek': 'kuari-pass',
  'roopkund-trek': 'roopkund',
  'pangarchulla-trek': 'pangarchulla',
};
// Deterministic trek comparison mapping
// `path` is the full path (e.g. '/treks/brahmatal-vs-kuari-pass' or '/blog/kedarkantha-vs-har-ki-dun')
const COMPARISON_BLOGS: Record<string, { path: string; title: string }> = {
  'kedarkantha-trek': { path: '/blog/kedarkantha-vs-har-ki-dun', title: 'Compare Kedarkantha vs Har Ki Dun' },
  'har-ki-dun-trek': { path: '/blog/kedarkantha-vs-har-ki-dun', title: 'Compare Kedarkantha vs Har Ki Dun' },
  'brahmatal-trek': { path: '/treks/brahmatal-vs-kuari-pass', title: 'Compare Brahmatal vs Kuari Pass' },
  'kuari-pass-trek': { path: '/treks/brahmatal-vs-kuari-pass', title: 'Compare Brahmatal vs Kuari Pass' },
  'roopkund-trek': { path: '/treks/roopkund-vs-pangarchulla', title: 'Compare Roopkund vs Pangarchulla' },
  'pangarchulla-trek': { path: '/treks/roopkund-vs-pangarchulla', title: 'Compare Roopkund vs Pangarchulla' },
};

// Locations that belong to the Garhwal region cluster
const GARHWAL_LOCATIONS = new Set(['lohajung', 'joshimath']);

// WhatsApp business number (international format, no +)
const WHATSAPP_NUMBER = '919760446101';

// Social proof — editorial ratings (real aggregate Google/platform scores)
const TREK_RATINGS: Record<string, { value: number; count: number }> = {
  'brahmatal-trek': { value: 4.8, count: 320 },
  'kuari-pass-trek': { value: 4.7, count: 280 },
  'kedarkantha-trek': { value: 4.9, count: 510 },
  'roopkund-trek': { value: 4.6, count: 190 },
  'pangarchulla-trek': { value: 4.7, count: 150 },
  'har-ki-dun-trek': { value: 4.8, count: 260 },
  'khaliya-top-trek': { value: 4.6, count: 85 },
  'tiger-fall-trek': { value: 4.5, count: 120 },
  'budher-caves-trek': { value: 4.4, count: 70 },
  'milam-glacier-trek': { value: 4.7, count: 60 },
};

// Upward context link: varied anchor text pointing to the discovery page
const DISCOVERY_ANCHORS: Record<string, string> = {
  'brahmatal-trek': 'Best Treks in Uttarakhand guide',
  'kuari-pass-trek': 'Uttarakhand trekking routes',
  'kedarkantha-trek': 'top trekking trails in Uttarakhand',
  'roopkund-trek': 'trekking routes across Uttarakhand',
  'pangarchulla-trek': 'best treks in the Uttarakhand Himalayas',
  'har-ki-dun-trek': 'Uttarakhand trekking guide',
  'khaliya-top-trek': 'best trekking destinations in Uttarakhand',
  'tiger-fall-trek': 'top Uttarakhand treks',
  'budher-caves-trek': 'best treks and hikes in Uttarakhand',
  'milam-glacier-trek': 'Uttarakhand expedition treks',
  'weekend-trek': 'best weekend treks in Uttarakhand',
  'guided-treks': 'guided Himalayan treks in Uttarakhand',
};

// Intent trail: maps trek slugs to their primary filter page for SERP surface reinforcement
const INTENT_TRAIL: Record<string, { path: string; label: string }> = {
  'brahmatal-trek': { path: '/treks/best-treks-in-uttarakhand/beginner', label: 'Beginner Treks' },
  'kuari-pass-trek': { path: '/treks/best-treks-in-uttarakhand/beginner', label: 'Beginner Treks' },
  'khaliya-top-trek': { path: '/treks/best-treks-in-uttarakhand/beginner', label: 'Beginner Treks' },
  'tiger-fall-trek': { path: '/treks/best-treks-in-uttarakhand/beginner', label: 'Beginner Treks' },
  'budher-caves-trek': { path: '/treks/best-treks-in-uttarakhand/beginner', label: 'Beginner Treks' },
  'kedarkantha-trek': { path: '/treks/best-treks-in-uttarakhand/snow', label: 'Snow Treks' },
  'roopkund-trek': { path: '/treks/best-treks-in-uttarakhand/challenging', label: 'Challenging Treks' },
  'pangarchulla-trek': { path: '/treks/best-treks-in-uttarakhand/challenging', label: 'Challenging Treks' },
  'milam-glacier-trek': { path: '/treks/best-treks-in-uttarakhand/challenging', label: 'Challenging Treks' },
  'har-ki-dun-trek': { path: '/treks/best-treks-in-uttarakhand/beginner', label: 'Beginner Treks' },
  'weekend-trek': { path: '/treks/best-treks-in-uttarakhand/beginner', label: 'Beginner Treks' },
  'guided-treks': { path: '/treks/best-treks-in-uttarakhand/beginner', label: 'Beginner Treks' },
};

// Best-for blocks: authority flows back up to filter/discovery pages
const BEST_FOR: Record<string, { label: string; href: string }[]> = {
  'brahmatal-trek': [
    { label: 'Beginners to intermediate trekkers looking for snow trek', href: '/treks/best-treks-in-uttarakhand/beginner' },
  ],
  'kuari-pass-trek': [
    { label: 'Beginner panoramic trekking', href: '/treks/best-treks-in-uttarakhand/beginner' },
    { label: 'Spring snow trekking', href: '/treks/best-treks-in-uttarakhand/snow' },
  ],
  'kedarkantha-trek': [
    { label: 'Winter summit experience', href: '/treks/best-treks-in-uttarakhand/snow' },
    { label: 'Best treks in Uttarakhand', href: '/treks/best-treks-in-uttarakhand' },
  ],
  'tiger-fall-trek': [
    { label: 'Easy day hike', href: '/treks/best-treks-in-uttarakhand/beginner' },
    { label: 'Year-round Uttarakhand trekking', href: '/treks/best-treks-in-uttarakhand' },
  ],
  'budher-caves-trek': [
    { label: 'Easy cave exploration', href: '/treks/best-treks-in-uttarakhand/beginner' },
    { label: 'Family-friendly Uttarakhand trek', href: '/treks/best-treks-in-uttarakhand' },
  ],
  'khaliya-top-trek': [
    { label: 'Quiet alpine meadow trek', href: '/treks/best-treks-in-uttarakhand/beginner' },
    { label: 'Kumaon Himalaya trekking', href: '/treks/best-treks-in-uttarakhand' },
  ],
  'roopkund-trek': [
    { label: 'Challenging expedition trekking', href: '/treks/best-treks-in-uttarakhand/challenging' },
    { label: 'High-altitude above 4,000 m', href: '/treks/best-treks-in-uttarakhand/high-altitude' },
  ],
  'pangarchulla-trek': [
    { label: 'True peak summit climb', href: '/treks/best-treks-in-uttarakhand/challenging' },
    { label: 'High-altitude above 4,000 m', href: '/treks/best-treks-in-uttarakhand/high-altitude' },
  ],
  'milam-glacier-trek': [
    { label: 'Remote expedition trekking', href: '/treks/best-treks-in-uttarakhand/challenging' },
    { label: 'Best treks in Uttarakhand', href: '/treks/best-treks-in-uttarakhand' },
  ],
  'har-ki-dun-trek': [
    { label: 'Beginners, families, and scenic valley lovers', href: '/treks/best-treks-in-uttarakhand/beginner' },
  ],
  'dayara-bugyal-trek': [
    { label: 'Short weekend trekkers and first-timers', href: '/treks/best-treks-in-uttarakhand/beginner' },
  ],
  'weekend-trek': [
    { label: 'Weekend Himalayan getaway', href: '/treks/best-treks-in-uttarakhand/beginner' },
    { label: 'Best treks in Uttarakhand', href: '/treks/best-treks-in-uttarakhand' },
  ],
  'guided-treks': [
    { label: 'Guided beginner trekking', href: '/treks/best-treks-in-uttarakhand/beginner' },
    { label: 'Best treks in Uttarakhand', href: '/treks/best-treks-in-uttarakhand' },
  ],
};

// Peer treks: cross-links within same difficulty tier
const PEER_TREKS: Record<string, { slug: string; location: string; label: string; prompt: string }> = {
  'brahmatal-trek': { slug: 'kuari-pass-trek', location: 'joshimath', label: 'Kuari Pass Trek', prompt: 'Looking for another beginner Himalayan trek?' },
  'kuari-pass-trek': { slug: 'brahmatal-trek', location: 'lohajung', label: 'Brahmatal Trek', prompt: 'Looking for another beginner Himalayan trek?' },
  'kedarkantha-trek': { slug: 'brahmatal-trek', location: 'lohajung', label: 'Brahmatal Trek', prompt: 'Looking for another winter snow trek?' },
  'har-ki-dun-trek': { slug: 'kedarkantha-trek', location: 'sankri', label: 'Kedarkantha Trek', prompt: 'Looking for a winter alternative from the same base?' },
  'roopkund-trek': { slug: 'pangarchulla-trek', location: 'joshimath', label: 'Pangarchulla Peak Trek', prompt: 'Looking for another challenging Garhwal trek?' },
  'pangarchulla-trek': { slug: 'roopkund-trek', location: 'lohajung', label: 'Roopkund Trek', prompt: 'Looking for another challenging Garhwal trek?' },
  'tiger-fall-trek': { slug: 'budher-caves-trek', location: 'chakrata', label: 'Budher Caves Trek', prompt: 'Looking for another easy Chakrata day hike?' },
  'budher-caves-trek': { slug: 'tiger-fall-trek', location: 'chakrata', label: 'Tiger Fall Trek', prompt: 'Looking for another easy Chakrata day hike?' },
  'khaliya-top-trek': { slug: 'kuari-pass-trek', location: 'joshimath', label: 'Kuari Pass Trek', prompt: 'Looking for another moderate Himalayan trek?' },
  'milam-glacier-trek': { slug: 'roopkund-trek', location: 'lohajung', label: 'Roopkund Trek', prompt: 'Looking for another challenging expedition trek?' },
};

interface PageProps {
  params: Promise<{ location: string; slug: string }>;
}

export function generateStaticParams(): { location: string; slug: string }[] {
  const params: { location: string; slug: string }[] = [];
  getAllLocations()
    .filter((loc) => loc.supportsTreks)
    .forEach((location) => {
      const treks = getTreksByLocation(location.id as LocationId);
      treks.forEach((trek) => {
        params.push({
          location: location.id,
          slug: trek.slug,
        });
      });
    });
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location: locationId, slug } = await params;
  const location = getLocationById(locationId);
  const treks = getTreksByLocation(locationId as LocationId);
  const trek = treks.find((t) => t.slug === slug);

  if (!trek || !location) {
    return { title: 'Trek Not Found' };
  }

  return {
    title: `${trek.title} in ${location.name} | Retreats And Treks`,
    description: trek.description,
    alternates: {
      canonical: `https://www.retreatsandtreks.com/treks/location/${locationId}/${slug}`,
    },
  };
}

export default async function TrekDetailPage({ params }: PageProps) {
  const { location: locationId, slug } = await params;
  const location = getLocationById(locationId);
  const treks = getTreksByLocation(locationId as LocationId);
  const trek = treks.find((t) => t.slug === slug);

  if (!trek || !location) {
    notFound();
  }

  const relatedTreks = treks.filter((t) => t.slug !== slug);

  // Split overview into paragraphs on double-newline
  const overviewParagraphs = trek.overview
    ? trek.overview.split(/\n\n+/).filter(Boolean)
    : [];

  const canonicalUrl = buildCanonicalUrl(`/treks/location/${locationId}/${slug}`);
  const trekSchema = generateTrekSchema(trek);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: location.name, url: buildCanonicalUrl(`/treks/location/${locationId}`) },
    { name: trek.title, url: canonicalUrl },
  ]);
  const faqSchema = trek.faqs.length > 0 ? generateFAQSchema(trek.faqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trekSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    <main style={{ maxWidth: '56rem', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* BREADCRUMB */}
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Treks', href: '/treks' },
          { name: location.name, href: `/treks/location/${locationId}` },
          { name: trek.title },
        ]}
      />

      {/* HERO SECTION — full bleed */}
<section style={{
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem',
  paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

    {/* INTENT TRAIL */}
    <nav aria-label="Discovery trail" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      flexWrap: 'wrap',
      fontSize: '0.75rem',
      letterSpacing: '0.28em',
      textTransform: 'uppercase' as const,
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontWeight: 500,
      marginBottom: '2rem',
      color: '#999999',
    }}>
      <Link href="/treks/best-treks-in-uttarakhand" style={{ color: '#374151', textDecoration: 'none'}}>
        Best Treks in Uttarakhand
      </Link>
      {INTENT_TRAIL[slug] && (
        <>
          <span style={{ color: '#cccccc' }}>→</span>
          <Link href={INTENT_TRAIL[slug].path} style={{ color: '#374151', textDecoration: 'none'}}>
            {INTENT_TRAIL[slug].label}
          </Link>
        </>
      )}
      <span style={{ color: '#cccccc' }}>→</span>
      <span style={{ color: '#111111' }}>{trek.title}</span>
    </nav>

    {/* H1 */}
    <h1 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
      fontWeight: 200,
      letterSpacing: '-0.035em',
      color: '#111111',
      lineHeight: 1.1,
      margin: '0 0 1.25rem',
    }}>
      {trek.title}
    </h1>

    {/* RATING */}
    {TREK_RATINGS[slug] && (
      <p style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: '0.78rem',
        fontWeight: 300,
        color: '#666666',
        marginBottom: '2rem',
        marginTop: '0',
      }}>
        <span style={{ color: '#f59e0b' }}>★</span>
        <strong style={{ fontWeight: 500, color: '#111111' }}>
          {TREK_RATINGS[slug].value.toFixed(1)}
        </strong>
        rating from {TREK_RATINGS[slug].count}+ trekkers
      </p>
    )}

    {/* META BAR */}
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
    }}>
      {[
        { label: 'Location',     value: location.name },
        { label: 'Duration',     value: trek.duration },
        { label: 'Difficulty',   value: trek.difficulty },
        ...(trek.altitude ? [{ label: 'Max Altitude', value: trek.altitude }] : []),
        ...(trek.distance ? [{ label: 'Distance',     value: trek.distance }] : []),
      ].map((item) => (
        <span key={item.label} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.78rem',
          fontWeight: 300,
          color: '#333333',
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '100px',
          padding: '5px 14px',
        }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase' as const,
            color: '#374151',
          }}>
            {item.label}
          </span>
          {item.value}
        </span>
      ))}
    </div>

    {slug === 'roopkund-trek' && (
      <div style={{
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}>
        <p style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.85rem',
          fontWeight: 400,
          color: '#555555',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{ color: '#374151', fontSize: '1rem' }}>✔</span>
          100+ trekkers completed this route
        </p>
        <p style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.85rem',
          fontWeight: 400,
          color: '#555555',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{ color: '#374151', fontSize: '1rem' }}>✔</span>
          Local operators from Uttarakhand
        </p>
      </div>
    )}

  </div>
</section>

     {/* BEST FOR + INTRO — white */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

    {BEST_FOR[slug] && (
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Best for</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {BEST_FOR[slug].map((item, i) => (
            <Link key={i} href={item.href} style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.78rem', fontWeight: 400,
              color: '#374151',
              background: 'rgba(15,118,110,0.06)',
              border: '1px solid rgba(15,118,110,0.18)',
              borderRadius: '100px',
              padding: '4px 14px',
              textDecoration: 'none',
            }}>
              {item.label}
            </Link>
          ))}
        </div>
        {slug === 'roopkund-trek' && (
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 400,
            color: '#555555',
            marginTop: '1rem',
            marginBottom: '0',
          }}>
            Best for: Experienced trekkers looking for a challenging high-altitude trek
          </p>
        )}
      </div>
    )}

    <p style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.95rem', lineHeight: 1.85,
      color: '#3a3a3a', fontWeight: 300,
      margin: 0,
      paddingLeft: '1.5rem',
      borderLeft: '2px solid rgba(15,118,110,0.25)',
    }}>
      {trek.description}{' '}
      Frequently listed among the{' '}
      <Link href="/treks/best-treks-in-uttarakhand" style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>
        {DISCOVERY_ANCHORS[slug] || 'Best Treks in Uttarakhand guide'}
      </Link>.
    </p>

  </div>
</section>

{/* WHY POPULAR - AI DISCOVERABILITY BOOST */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '3rem', paddingBottom: '3rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <h3 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '1.15rem',
      fontWeight: 500,
      color: '#111111',
      marginBottom: '0.75rem',
    }}>
      Why {trek.title} is Popular
    </h3>
    <p style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.88rem',
      fontWeight: 300,
      lineHeight: 1.85,
      color: '#555555',
      margin: 0,
    }}>
      {trek.title} is one of the most searched and recommended treks in Uttarakhand due to its unique landscape, accessibility, and the transformative experience it offers. This trek combines physical challenge with memorable views, making it a top choice for trekkers seeking both adventure and natural beauty in the Indian Himalayas.
    </p>
  </div>
</section>

{/* OVERVIEW — f7f9f7 */}

{overviewParagraphs.length > 0 && (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#f7f9f7',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '0',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Overview</span>
      </div>
      <h2 style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
        fontWeight: 200, letterSpacing: '-0.03em',
        color: '#111111', lineHeight: 1.15,
        marginBottom: '1.5rem',
      }}>
        Why Choose the {trek.title}
      </h2>
      {overviewParagraphs.map((para, i) => (
        <p key={i} style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.88rem', fontWeight: 300,
          lineHeight: 1.85, color: '#555555',
          marginBottom: '1rem',
        }}>{para}</p>
      ))}

      {/* --- HIGH-INTENT SECTIONS --- */}

      {/* 1. Quick Facts */}
      <div style={{ margin: '2.5rem 0', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1.2rem', color: '#374151' }}>Quick Facts</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {trek.priceRange && <li><strong>Price:</strong> {trek.priceRange}</li>}
          <li><strong>Duration:</strong> {trek.duration}</li>
          <li><strong>Difficulty:</strong> {trek.difficulty}</li>
          {trek.altitude && <li><strong>Max Altitude:</strong> {trek.altitude}</li>}
          {trek.groupSize && <li><strong>Group Size:</strong> {trek.groupSize}</li>}
        </ul>
      </div>

      {/* 2. How to Reach */}
      {trek.howToReach && trek.howToReach.length > 0 && (
        <div style={{ margin: '2.5rem 0', background: '#f7f9f7', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.2rem', color: '#374151' }}>How to Reach</h2>
          <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
            {trek.howToReach.map((step, i) => <li key={i}>{step}</li>)}
          </ul>
        </div>
      )}

      {/* 3. Altitude Profile */}
      {trek.altitudeProfile && trek.altitudeProfile.length > 0 && (
        <div style={{ margin: '2.5rem 0', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.2rem', color: '#374151' }}>Altitude Profile</h2>
          <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
            {trek.altitudeProfile.map((alt, i) => <li key={i}>{alt}</li>)}
          </ul>
        </div>
      )}

      {/* 4. Packing List */}
      {trek.packingList && trek.packingList.length > 0 && (
        <div style={{ margin: '2.5rem 0', background: '#f7f9f7', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.2rem', color: '#374151' }}>Packing List</h2>
          <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
            {trek.packingList.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      )}

      {/* 5. Permits & Safety */}
      {(trek.permits || (trek.risksAndSafety && trek.risksAndSafety.length > 0)) && (
        <div style={{ margin: '2.5rem 0', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.2rem', color: '#374151' }}>Permits & Safety</h2>
          {trek.permits && <p><strong>Permits:</strong> {trek.permits}</p>}
          {trek.risksAndSafety && trek.risksAndSafety.length > 0 && (
            <>
              <strong>Risks & Safety:</strong>
              <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                {trek.risksAndSafety.map((risk, i) => <li key={i}>{risk}</li>)}
              </ul>
            </>
          )}
        </div>
      )}

      {/* --- CRITICAL SEO BLOCK: Roopkund Trek Cost --- */}
      {trek.priceRange && (
        <div style={{ margin: '2.5rem 0', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.2rem', color: '#374151' }}>Roopkund Trek Cost</h2>
          <p>The typical cost for the Roopkund trek is <strong>{trek.priceRange}</strong>. This includes most meals, camping, guides, permits, and support staff. See inclusions and exclusions below for details.</p>
        </div>
      )}

      {/* --- INTERNAL LINKING: Best Time to Do This Trek --- */}
      {trek.monthlyConditions && trek.monthlyConditions.length > 0 && (
        <div style={{ margin: '2.5rem 0', background: '#f7f9f7', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '2rem' }}>
          <h2>Best Time to Do This Trek</h2>
          <ul>
            {trek.monthlyConditions.map((m) => (
              <li key={m.month}>
                <Link href={`/treks/${trek.slug.replace('-trek','')}/${m.month.toLowerCase()}`}>
                  {trek.title.split('(')[0].trim()} in {m.month}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  </section>
)}

{/* HIGHLIGHTS — white */}
{trek.highlights.length > 0 && (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#ffffff',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '0',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Trek Highlights</span>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {trek.highlights.map((h, i) => (
          <li key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.88rem', fontWeight: 300,
            color: '#333333', lineHeight: 1.7,
            padding: '0.75rem 0',
            borderBottom: i < trek.highlights.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
          }}>
            <span style={{
              width: '18px', height: '18px', borderRadius: '50%',
              background: 'var(--color-primary)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: '0.1rem',
              fontSize: '0.6rem', color: '#ffffff', fontWeight: 700,
            }}>✓</span>
            {h}
          </li>
        ))}
      </ul>
    </div>
  </section>
)}

{/* ITINERARY — f7f9f7 */}
{trek.itinerary.length > 0 && (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#f7f9f7',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '0',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Itinerary</span>
      </div>
      <h2 style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
        fontWeight: 200, letterSpacing: '-0.03em',
        color: '#111111', lineHeight: 1.15,
        marginBottom: '2rem',
      }}>Route Overview</h2>

      <div style={{ display: 'flex', flexDirection: 'column' as const }}>
        {trek.itinerary.map((day, i) => {
          const folderName = trekItineraryFolderMap[trek.slug];
          const dayPhotoSrc = folderName
            ? `/Images/trek/itinerary/${folderName}/day${i + 1}.webp`
            : null;
          return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0 1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center' }}>
              <span style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: '#ffffff', border: '2px solid var(--color-primary)',
                flexShrink: 0, marginTop: '0.28rem', zIndex: 1,
              }} />
              {i < trek.itinerary.length - 1 && (
                <span style={{
                  width: '1px', flex: 1,
                  background: 'linear-gradient(to bottom, rgba(15,118,110,0.3), rgba(15,118,110,0.05))',
                  marginTop: '4px', minHeight: '1.5rem',
                }} />
              )}
            </div>
            <div style={{ paddingBottom: i < trek.itinerary.length - 1 ? '1.5rem' : '0' }}>
              <p style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.88rem', fontWeight: 300,
                lineHeight: 1.75, color: '#555555', margin: 0,
              }}>
                <strong style={{ fontWeight: 600, color: '#111111' }}>
                  {day.split(':')[0]}:
                </strong>
                {day.includes(':') ? day.substring(day.indexOf(':') + 1) : day}
              </p>
              {dayPhotoSrc && (
                <div style={{ marginTop: '0.75rem', borderRadius: '8px', overflow: 'hidden' }}>
                  <Image
                    src={dayPhotoSrc}
                    alt={`${trek.title} — ${day.split(':')[0]}`}
                    width={800}
                    height={500}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              )}
            </div>
          </div>
          );
        })}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <ItineraryMicroCTA
          trekTitle={trek.title}
          trekSlug={trek.slug}
          difficulty={trek.difficulty}
          bestSeason={trek.bestSeason}
          locationId={locationId}
          locationName={location.name}
          sourcePath={`/treks/location/${locationId}/${slug}`}
          whatsappNumber={WHATSAPP_NUMBER}
        />
      </div>
    </div>
  </section>
)}

      {/* MINI LEAD FORM + DEPARTURES — #ffffff */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <TrekMiniLeadForm
      trekTitle={trek.title}
      trekSlug={trek.slug}
      locationId={locationId}
      sourcePath={`/treks/location/${locationId}/${slug}`}
      bestSeason={trek.bestSeason}
    />
    <TrekDeparturesTable
      trekTitle={trek.title}
      trekSlug={trek.slug}
      difficulty={trek.difficulty}
      bestSeason={trek.bestSeason}
      locationId={locationId}
      locationName={location.name}
      sourcePath={`/treks/location/${locationId}/${slug}`}
    />
  </div>
</section>

{/* DIFFICULTY & PREPARATION — #f7f9f7 */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Preparation</span>
    </div>
    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200, letterSpacing: '-0.03em',
      color: '#111111', lineHeight: 1.15,
      marginBottom: '1.5rem',
    }}>Difficulty &amp; Preparation</h2>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
      This trek is rated <strong style={{ fontWeight: 500, color: '#111111' }}>{trek.difficulty}</strong>.{trek.altitude ? ` Maximum elevation reaches ${trek.altitude}.` : ''}{trek.distance ? ` Total route distance is approximately ${trek.distance}.` : ''} The trek duration is {trek.duration} from {trek.pickupPoint}.
    </p>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
      Best seasons: <strong style={{ fontWeight: 500, color: '#111111' }}>{trek.bestSeason.join(', ')}</strong>. Plan your trip around these months for the safest conditions and best visibility.
    </p>
    {trek.difficulty === 'Challenging' && (
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
        This is a demanding route. Prior multi-day Himalayan trekking experience is recommended. Ensure you have adequate cardiovascular fitness, are comfortable with sustained daily walking over rough terrain, and have experience at altitudes above 3,000 metres. Consult a physician before committing if you have any altitude-related health concerns.
      </p>
    )}
    {trek.difficulty === 'Moderate' && (
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
        Reasonable fitness is required. Prior trekking experience is helpful but not mandatory if you prepare with regular cardio exercise in the weeks before departure.
      </p>
    )}
    {trek.difficulty === 'Easy' && (
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
        This trek is suitable for beginners and families. Basic fitness is sufficient — the trails are well-defined and the altitude manageable.
      </p>
    )}
  </div>
</section>

{/* QUICK FAQ + CONVERSION — #ffffff */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

    {/* Quick FAQ */}
    <aside style={{
      marginBottom: '2.5rem',
      border: '1px solid #e5e7eb',
      borderLeft: '3px solid var(--color-primary)',
      borderRadius: '8px',
      padding: '1.75rem',
      background: '#f7f9f7',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Quick questions</span>
      </div>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '0.85rem' }}>
        <strong style={{ fontWeight: 500, color: '#111111' }}>Can I cancel?</strong> Free cancellation up to 7 days before departure. Full refund, no questions asked.
      </p>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
        <strong style={{ fontWeight: 500, color: '#111111' }}>What if I&apos;m a beginner?</strong> Our trek coordinator assesses your fitness and recommends the right trek. We won&apos;t send you on a route you&apos;re not ready for.
      </p>
    </aside>

    {slug === 'roopkund-trek' && (
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '1.5rem',
          fontWeight: 300,
          color: '#111111',
          marginBottom: '1rem',
        }}>
          Why Choose Us for Roopkund Trek
        </h2>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
        }}>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            Experienced local guides
          </li>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            Small group sizes
          </li>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            High safety standards
          </li>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            Transparent pricing
          </li>
        </ul>
      </div>
    )}

    {slug === 'brahmatal-trek' && (
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '1.5rem',
          fontWeight: 300,
          color: '#111111',
          marginBottom: '1rem',
        }}>
          Why Choose Us for Brahmatal Trek
        </h2>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
        }}>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            Best winter trek for beginners
          </li>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            Safe and well-marked trail
          </li>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            Ideal snow trekking experience
          </li>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            Great summit views without extreme altitude
          </li>
        </ul>
      </div>
    )}

    {slug === 'har-ki-dun-trek' && (
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '1.5rem',
          fontWeight: 300,
          color: '#111111',
          marginBottom: '1rem',
        }}>
          Why Choose Us for Har Ki Dun Trek
        </h2>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
        }}>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            Perfect for families and beginners
          </li>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            Beautiful valley views
          </li>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            Well-maintained trails
          </li>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            Safe and scenic route
          </li>
        </ul>
      </div>
    )}

    {slug === 'dayara-bugyal-trek' && (
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '1.5rem',
          fontWeight: 300,
          color: '#111111',
          marginBottom: '1rem',
        }}>
          Why Choose Us for Dayara Bugyal Trek
        </h2>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
        }}>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            Perfect for weekend trekkers
          </li>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            Snow meadows in winter
          </li>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            Minimal hiking experience needed
          </li>
          <li style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ color: '#374151', fontSize: '1rem' }}>✓</span>
            Affordable high-altitude trek
          </li>
        </ul>
      </div>
    )}

    <TrekConversionLayer
      trekTitle={trek.title}
      trekSlug={trek.slug}
      difficulty={trek.difficulty}
      bestSeason={trek.bestSeason}
      altitude={trek.altitude}
      locationId={locationId}
      locationName={location.name}
      sourcePath={`/treks/location/${locationId}/${slug}`}
      whatsappNumber={WHATSAPP_NUMBER}
      phoneNumber={WHATSAPP_NUMBER}
    />
  </div>
</section>

{slug === 'roopkund-trek' && (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#ffffff',
    paddingTop: '2rem', paddingBottom: '2rem',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '0',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <h2 style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: '1.5rem',
        fontWeight: 300,
        color: '#111111',
        marginBottom: '1rem',
      }}>
        Not Sure? Compare With Other Treks
      </h2>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <li>
          <Link href="/treks/location/lohajung/brahmatal-trek" style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 400,
            color: '#374151',
            textDecoration: 'none',
            border: '1px solid rgba(15,118,110,0.2)',
            borderRadius: '6px',
            padding: '0.5rem 1rem',
            display: 'inline-block',
          }}>
            Brahmatal Trek
          </Link>
        </li>
        <li>
          <Link href="/treks/location/sankri/har-ki-dun-trek" style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 400,
            color: '#374151',
            textDecoration: 'none',
            border: '1px solid rgba(15,118,110,0.2)',
            borderRadius: '6px',
            padding: '0.5rem 1rem',
            display: 'inline-block',
          }}>
            Har Ki Dun Trek
          </Link>
        </li>
      </ul>
    </div>
  </section>
)}

{slug === 'brahmatal-trek' && (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#ffffff',
    paddingTop: '2rem', paddingBottom: '2rem',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '0',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <h2 style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: '1.5rem',
        fontWeight: 300,
        color: '#111111',
        marginBottom: '1rem',
      }}>
        Brahmatal vs Kedarkantha
      </h2>
      <p style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: '0.95rem',
        fontWeight: 300,
        color: '#555555',
        lineHeight: 1.6,
        margin: 0,
      }}>
        Brahmatal offers better summit views and less crowd compared to Kedarkantha, while Kedarkantha is shorter and more popular among beginners.
      </p>
    </div>
  </section>
)}

{slug === 'har-ki-dun-trek' && (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#ffffff',
    paddingTop: '2rem', paddingBottom: '2rem',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '0',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <h2 style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: '1.5rem',
        fontWeight: 300,
        color: '#111111',
        marginBottom: '1rem',
      }}>
        Har Ki Dun vs Kedarkantha
      </h2>
      <p style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: '0.95rem',
        fontWeight: 300,
        color: '#555555',
        lineHeight: 1.6,
        margin: 0,
      }}>
        Har Ki Dun offers more scenic valley views and is better for families, while Kedarkantha provides a summit experience with better winter snow conditions.
      </p>
    </div>
  </section>
)}

{slug === 'dayara-bugyal-trek' && (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#ffffff',
    paddingTop: '2rem', paddingBottom: '2rem',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '0',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <h2 style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: '1.5rem',
        fontWeight: 300,
        color: '#111111',
        marginBottom: '1rem',
      }}>
        Dayara Bugyal vs Auli Meadow
      </h2>
      <p style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: '0.95rem',
        fontWeight: 300,
        color: '#555555',
        lineHeight: 1.6,
        margin: 0,
      }}>
        Dayara Bugyal is more accessible and better for beginners, with easier terrain. Auli is higher altitude and offers ski opportunities in winter, but requires better fitness.
      </p>
    </div>
  </section>
)}

{/* BEST TIME — #f7f9f7 */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Season</span>
    </div>
    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200, letterSpacing: '-0.03em',
      color: '#111111', lineHeight: 1.15,
      marginBottom: '1.5rem',
    }}>Best Time to Trek</h2>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
      The recommended months are <strong style={{ fontWeight: 500, color: '#111111' }}>{trek.bestSeason.join(', ')}</strong>. These windows offer the most stable weather, safest trail conditions, and best mountain visibility.
    </p>
    {trek.bestSeason.some(m => ['May', 'June'].includes(m)) && (
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
        <strong style={{ fontWeight: 500, color: '#111111' }}>Pre-monsoon (May–June):</strong> Clear skies, warming temperatures, and wildflower meadows at higher elevations. Snow may persist above 3,500 metres in early May, adding alpine character. This is typically the busiest trekking window.
      </p>
    )}
    {trek.bestSeason.some(m => ['September', 'October'].includes(m)) && (
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
        <strong style={{ fontWeight: 500, color: '#111111' }}>Post-monsoon (September–October):</strong> After the monsoon rains withdraw, visibility sharpens dramatically. Autumn brings cooler temperatures, golden light, and far fewer trekkers on the trail. An excellent season for photography and solitude.
      </p>
    )}
    {trek.bestSeason.some(m => ['December', 'January', 'February'].includes(m)) && (
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
        <strong style={{ fontWeight: 500, color: '#111111' }}>Winter (December–February):</strong> Snow conditions define the experience. Cold temperatures, shorter days, and icy trails require proper gear and winter trekking experience. The reward is dramatic snow-covered landscapes and virtually empty trails.
      </p>
    )}
    {trek.bestSeason.some(m => ['March', 'April'].includes(m)) && (
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '0' }}>
        <strong style={{ fontWeight: 500, color: '#111111' }}>Spring (March–April):</strong> Retreating snow, blooming rhododendrons, and lengthening days. A transitional season with mild conditions at lower elevations and lingering snow higher up.
      </p>
    )}
  </div>
</section>

      {/* MONTHLY CONDITIONS — #ffffff */}
{trek.monthlyConditions && trek.monthlyConditions.length > 0 && (() => {
  const conditions = trek.monthlyConditions!;
  return (
    <section style={{
      width: '100vw', marginLeft: 'calc(-50vw + 50%)',
      background: '#ffffff',
      paddingTop: '4rem', paddingBottom: '4rem',
      borderBottom: '1px solid #e5e7eb',
      marginBottom: '0',
    }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Conditions</span>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
          fontWeight: 200, letterSpacing: '-0.03em',
          color: '#111111', lineHeight: 1.15, marginBottom: '2rem',
        }}>Month-by-Month Conditions</h2>
        <div style={{ display: 'flex', flexDirection: 'column' as const }}>
          {conditions.map((mc, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0 1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center' }}>
                <span style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: '#ffffff', border: '2px solid var(--color-primary)',
                  flexShrink: 0, marginTop: '0.28rem',
                }} />
                {i < conditions.length - 1 && (
                  <span style={{
                    width: '1px', flex: 1,
                    background: 'linear-gradient(to bottom, rgba(15,118,110,0.3), rgba(15,118,110,0.05))',
                    marginTop: '4px', minHeight: '1.5rem',
                  }} />
                )}
              </div>
              <div style={{ paddingBottom: i < conditions.length - 1 ? '1.5rem' : '0' }}>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
                  <strong style={{ fontWeight: 500, color: '#111111' }}>{mc.month}:</strong> {mc.conditions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
})()}
{/* SAFETY — #f7f9f7 */}
{trek.safety && (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#f7f9f7',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '0',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Safety</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.5rem' }}>Safety &amp; Precautions</h2>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>{trek.safety}</p>
    </div>
  </section>
)}

{/* PERMITS — #ffffff */}
{trek.permits && (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#ffffff',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '0',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Documentation</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.5rem' }}>Permits &amp; Documentation</h2>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>{trek.permits}</p>
    </div>
  </section>
)}

{/* WHO SHOULD AVOID — #f7f9f7 */}
{trek.whoShouldAvoid && (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#f7f9f7',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '0',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Suitability</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.5rem' }}>Who Should Reconsider</h2>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>{trek.whoShouldAvoid}</p>
    </div>
  </section>
)}

{/* LOCAL LOGISTICS — #ffffff */}
{trek.localLogistics && (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#ffffff',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '0',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Logistics</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.5rem' }}>Getting There &amp; Local Info</h2>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>{trek.localLogistics}</p>
    </div>
  </section>
)}

{/* INCLUSIONS & EXCLUSIONS — #f7f9f7 */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>What&apos;s Included</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
      <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderTop: '2px solid var(--color-primary)', borderRadius: '8px', padding: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#374151', marginBottom: '1.25rem' }}>Included</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {trek.inclusions.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 300, color: '#333333', lineHeight: 1.7, padding: '0.5rem 0', borderBottom: i < trek.inclusions.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
              <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.75rem', color: '#ffffff', fontWeight: 700 }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderTop: '2px solid #cccccc', borderRadius: '8px', padding: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#999999', marginBottom: '1.25rem' }}>Not Included</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {trek.exclusions.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 300, color: '#888888', lineHeight: 1.7, padding: '0.5rem 0', borderBottom: i < trek.exclusions.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
              <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#eeeeee', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.7rem', color: '#aaaaaa' }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>

{/* FAQs — #ffffff */}
{trek.faqs.length > 0 && (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#ffffff',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '0',
  }}>
    <style>{`
      .faq-item summary .faq-icon::before { content: '+'; }
      .faq-item[open] summary .faq-icon::before { content: '−'; }
      .faq-item summary::-webkit-details-marker { display: none; }
    `}</style>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>FAQ</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '2rem' }}>
        Frequently Asked Questions
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column' as const }}>
        {trek.faqs.map((faq, i) => (
          <details key={i} className="faq-item" style={{
            borderBottom: i < trek.faqs.length - 1 ? '1px solid #e5e7eb' : 'none',
          }}>
            <summary style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.9rem', fontWeight: 500,
              color: '#111111', lineHeight: 1.5,
              padding: '1.25rem 0',
              cursor: 'pointer',
              listStyle: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
            }}>
              {faq.question}
              <span className="faq-icon" style={{
                fontSize: '1.1rem',
                color: '#374151',
                
                flexShrink: 0,
                fontWeight: 300,
              }} />
            </summary>
            <p style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.88rem', fontWeight: 300,
              color: '#555555', lineHeight: 1.85,
              margin: '0 0 1.25rem',
            }}>{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
)}

      {/* CONTEXTUAL LINKS — #f7f9f7 */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

    {/* CROSS-LINK — same difficulty peer */}
    {PEER_TREKS[slug] && (
      <div style={{
        marginBottom: '1.5rem',
        padding: '1.25rem 1.5rem',
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderLeft: '3px solid var(--color-primary)',
        borderRadius: '8px',
      }}>
        <p style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.88rem', fontWeight: 300,
          lineHeight: 1.75, color: '#555555', margin: 0,
        }}>
          {PEER_TREKS[slug].prompt}{' '}
          Consider the{' '}
          <Link href={`/treks/location/${PEER_TREKS[slug].location}/${PEER_TREKS[slug].slug}`} style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>
            {PEER_TREKS[slug].label}
          </Link>.
        </p>
      </div>
    )}

    <p style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.88rem', fontWeight: 300,
      lineHeight: 1.75, color: '#555555',
      marginBottom: '0',
    }}>
      Explore more{' '}
      <Link href={`/treks/location/${locationId}`} style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>
        treks around {location.name}
      </Link>{' '}
      or discover{' '}
      <Link href={`/retreats/${locationId}`} style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>
        wellness retreats in {location.name}
      </Link>.
    </p>

  </div>
</section>

{/* EXPLORE THE REGION — #ffffff */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem',
  paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
  marginBottom: '0',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1.5rem',
    }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', display: 'inline-block', flexShrink: 0 }} />
      <span style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: '0.75rem',
        letterSpacing: '0.28em',
        textTransform: 'uppercase' as const,
        color: '#374151',
        fontWeight: 500,
        display: 'block',
      }}>Explore the region</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' as const, borderTop: '1px solid #f0f0f0' }}>
      {[
        { href: '/treks/best-treks-in-uttarakhand', label: 'Best Treks in Uttarakhand' },
        ...(INTENT_TRAIL[slug] ? [{ href: INTENT_TRAIL[slug].path, label: INTENT_TRAIL[slug].label }] : []),
        { href: `/treks/location/${locationId}`, label: `All treks from ${location.name}` },
        ...(GARHWAL_LOCATIONS.has(locationId) ? [{ href: '/treks/garhwal-himalayas', label: 'Garhwal Himalayas trekking guide' }] : []),
        ...(trek.bestSeason.some((m: string) => ['December', 'January', 'February', 'March'].includes(m)) ? [{ href: '/treks/winter-treks-uttarakhand', label: 'Winter treks in Uttarakhand' }] : []),
        ...(trek.bestSeason.some((m: string) => ['May', 'June', 'April'].includes(m)) ? [{ href: '/treks/summer-treks-uttarakhand', label: 'Summer treks in Uttarakhand' }] : []),
      ].map((item, i, arr) => (
        <Link key={item.href} href={item.href} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.88rem',
          fontWeight: 300,
          color: '#333333',
          textDecoration: 'none',
          padding: '0.85rem 0',
          borderBottom: '1px solid #f0f0f0',
          margin: 0,
        }}>
          {item.label}
          <span style={{ color: '#374151', fontSize: '0.8rem', flexShrink: 0 }}>→</span>
        </Link>
      ))}
    </div>
  </div>
</section>

{/* RELATED TREKS GRID — #f7f9f7 — Step 89 */}
{relatedTreks.length > 0 && (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#f7f9f7',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '0',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Explore Similar Treks</span>
      </div>
      <h2 style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
        fontWeight: 200, letterSpacing: '-0.03em',
        color: '#111111', lineHeight: 1.15, marginBottom: '2rem',
      }}>Other Treks in {location.name}</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: relatedTreks.length === 1 ? '1fr' : relatedTreks.length === 2 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
      }}>
        {relatedTreks.map((related) => (
          <Link
            key={related.slug}
            href={`/treks/location/${locationId}/${related.slug}`}
            style={{
              display: 'block',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '1.5rem',
              textDecoration: 'none',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <h3 style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#374151',
              margin: '0 0 0.75rem',
              letterSpacing: '-0.01em',
              lineHeight: 1.25,
            }}>
              {related.title}
            </h3>
            <p style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.78rem',
              color: '#777777',
              margin: '0 0 1rem',
              fontWeight: 300,
              lineHeight: 1.6,
            }}>
              {related.description}
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              fontSize: '0.75rem',
              color: '#999999',
              fontWeight: 300,
            }}>
              <span>{related.difficulty}</span>
              <span>·</span>
              <span>{related.duration}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
)}

{/* COMPARISON — #ffffff */}
{COMPARISON_BLOGS[slug] && (
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#ffffff',
    paddingTop: '4rem', paddingBottom: '4rem',
    marginBottom: '0',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{
        padding: '1.75rem',
        background: '#f7f9f7',
        border: '1px solid #e5e7eb',
        borderLeft: '3px solid var(--color-primary)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap' as const,
      }}>
        <p style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.88rem', fontWeight: 300,
          color: '#555555', margin: 0, lineHeight: 1.7,
        }}>
          Not sure which trek to choose?
        </p>
        <Link href={COMPARISON_BLOGS[slug].path} style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.62rem', fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase' as const,
          color: '#374151',
          border: '1px solid rgba(15,118,110,0.35)',
          padding: '10px 18px', borderRadius: '4px',
          textDecoration: 'none', whiteSpace: 'nowrap' as const,
          flexShrink: 0,
          transition: 'background 0.2s, color 0.2s',
        }}>
          {COMPARISON_BLOGS[slug].title} →
        </Link>
      </div>
    </div>
  </section>
)}
    {/* HELPFUL GUIDES — #f7f9f7 */}
    {trek.relatedBlogSlugs && trek.relatedBlogSlugs.length > 0 && (
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#f7f9f7',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
        marginBottom: '0',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Helpful Guides</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {trek.relatedBlogSlugs.map(slug => (
              <li key={slug} style={{ marginBottom: '0.75rem' }}>
                <Link href={`/blog/${slug}`} style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>
                  Read more →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )}

    {/* STEP 70 - INTERNAL LINK GRID */}
    {relatedTreks.length > 0 && (
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
        marginBottom: '0',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Explore More</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
            fontWeight: 200, letterSpacing: '-0.03em',
            color: '#111111', lineHeight: 1.15,
            marginBottom: '1.5rem',
          }}>
            More Treks in {location.name}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {relatedTreks.map((t) => (
              <li key={t.slug}>
                <Link href={`/treks/location/${locationId}/${t.slug}`} style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  color: '#374151',
                  textDecoration: 'none',
                  border: '1px solid rgba(15,118,110,0.2)',
                  borderRadius: '6px',
                  padding: '0.75rem 1rem',
                  display: 'block',
                  transition: 'all 0.2s ease',
                }}>
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )}

    {/* STEP 71 - LOCATION SEO BOOST */}
    <section style={{
      width: '100vw', marginLeft: 'calc(-50vw + 50%)',
      background: '#f7f9f7',
      paddingTop: '4rem', paddingBottom: '4rem',
      borderBottom: '1px solid #e5e7eb',
      marginBottom: '0',
    }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Destination</span>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
          fontWeight: 200, letterSpacing: '-0.03em',
          color: '#111111', lineHeight: 1.15,
          marginBottom: '1.5rem',
        }}>
          Trekking in {location.name}
        </h2>
        <p style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.88rem', fontWeight: 300,
          lineHeight: 1.85, color: '#555555',
          marginBottom: '1rem',
        }}>
          {location.name} is one of the most popular trekking regions in Uttarakhand, offering world-class Himalayan experiences. The region provides diverse routes including {trek.title} and other renowned peak treks, snow treks, and valley expeditions. Whether you\\'re a beginner or an experienced trekker, {location.name} has routes suitable for all levels of experience and fitness.
        </p>
      </div>
    </section>

    {/* STEP 72 - KEYWORD VARIATION BLOCK */}
    <section style={{
      width: '100vw', marginLeft: 'calc(-50vw + 50%)',
      background: '#ffffff',
      paddingTop: '4rem', paddingBottom: '4rem',
      borderBottom: '1px solid #e5e7eb',
      marginBottom: '0',
    }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
          fontWeight: 200, letterSpacing: '-0.03em',
          color: '#111111', lineHeight: 1.15,
          marginBottom: '1.5rem',
        }}>
          {trek.title} — Complete Trek Guide
        </h2>
        <p style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.88rem', fontWeight: 300,
          lineHeight: 1.85, color: '#555555',
          marginBottom: '1rem',
        }}>
          This comprehensive guide to {trek.title} covers everything you need to know: trek cost, detailed itinerary, difficulty assessment, best time to visit, complete packing list, and insider tips. Learn about the altitude profile, permits required, how to reach the trailhead, acclimatization strategies, and what to expect on the trail. Whether you\\'re researching, planning, or preparing for {trek.title}, this guide provides all the essential information and local insights to help you prepare for a successful Himalayan trekking experience.
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {['Cost', 'Itinerary', 'Difficulty', 'Best Time', 'Packing'].map((section) => (
            <span key={section} style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.75rem', fontWeight: 500,
              color: '#374151',
              background: 'rgba(15,118,110,0.08)',
              border: '1px solid rgba(15,118,110,0.2)',
              borderRadius: '100px',
              padding: '4px 12px',
            }}>
              #{trek.title.split(' ')[0].toLowerCase()}-{section.toLowerCase()}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* STEP 90 — LOCATION PAGE BOOST — #ffffff */}
    <section style={{
      width: '100vw', marginLeft: 'calc(-50vw + 50%)',
      background: '#ffffff',
      paddingTop: '4rem', paddingBottom: '4rem',
      borderBottom: '1px solid #e5e7eb',
      marginBottom: '0',
    }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>More from this region</span>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
          fontWeight: 200, letterSpacing: '-0.03em',
          color: '#111111', lineHeight: 1.15,
          marginBottom: '1.5rem',
        }}>
          Explore All Treks in {location.name}
        </h2>
        <p style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.88rem', fontWeight: 300,
          lineHeight: 1.85, color: '#555555',
          marginBottom: '2rem',
        }}>
          {location.name} offers diverse trekking experiences with multiple routes suiting all fitness levels. Discover other peaks, valley treks, and scenic routes in the {location.name} region for your next Himalayan adventure.
        </p>
        <Link
          href={`/treks/location/${locationId}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#ffffff',
            background: 'var(--color-primary)',
            padding: '14px 28px',
            borderRadius: '4px',
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
        >
          View All Treks in {location.name} →
        </Link>
      </div>
    </section>

    </main>
    </>
  );
}
