import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
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
    { label: 'Beginner snow trekking', href: '/treks/best-treks-in-uttarakhand/beginner' },
    { label: 'Winter Himalayan treks', href: '/treks/best-treks-in-uttarakhand/snow' },
    { label: 'First high-altitude experience', href: '/treks/best-treks-in-uttarakhand/high-altitude' },
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
    { label: 'Summer valley trekking', href: '/treks/best-treks-in-uttarakhand' },
    { label: 'Beginner Himalayan trek', href: '/treks/best-treks-in-uttarakhand/beginner' },
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

      {/* INTENT TRAIL — discovery cluster reinforcement */}
      <nav aria-label="Discovery trail" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', lineHeight: 1.6 }}>
        <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
          Best Treks in Uttarakhand
        </Link>
        {INTENT_TRAIL[slug] && (
          <>
            {' → '}
            <Link href={INTENT_TRAIL[slug].path} style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
              {INTENT_TRAIL[slug].label}
            </Link>
          </>
        )}
        {' → '}
        <span>{trek.title}</span>
      </nav>

      <h1 style={{ marginBottom: '0.25rem' }}>{trek.title}</h1>

      {/* SOCIAL PROOF — rating line */}
      {TREK_RATINGS[slug] && (
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
          <span style={{ color: '#f59e0b' }}>★</span>{' '}
          <strong>{TREK_RATINGS[slug].value.toFixed(1)}</strong> rating from{' '}
          {TREK_RATINGS[slug].count}+ trekkers
        </p>
      )}

      {/* META BAR */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
        <span><strong>Location:</strong> {location.name}</span>
        <span><strong>Duration:</strong> {trek.duration}</span>
        <span><strong>Difficulty:</strong> {trek.difficulty}</span>
        {trek.altitude && <span><strong>Max Altitude:</strong> {trek.altitude}</span>}
        {trek.distance && <span><strong>Distance:</strong> {trek.distance}</span>}
      </div>

      {/* BEST FOR — authority flow back to filter/discovery pages */}
      {BEST_FOR[slug] && (
        <div style={{ fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.8 }}>
          <strong>Best for:</strong>
          <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', margin: '0.25rem 0 0' }}>
            {BEST_FOR[slug].map((item, i) => (
              <li key={i}>
                <Link href={item.href} style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* INTRO / DESCRIPTION — contextual discovery link embedded */}
      <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text)', marginBottom: '1.5rem' }}>
        {trek.description}{' '}
        Frequently listed among the{' '}
        <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
          {DISCOVERY_ANCHORS[slug] || 'Best Treks in Uttarakhand guide'}
        </Link>.
      </p>

      {/* OVERVIEW — rendered as "Why Choose" section */}
      {overviewParagraphs.length > 0 && (
        <section style={{ marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '1rem', color: 'var(--color-text)' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Why Choose the {trek.title}</h2>
          {overviewParagraphs.map((para, i) => (
            <p key={i} style={{ marginBottom: '1rem' }}>{para}</p>
          ))}
        </section>
      )}

      {/* HIGHLIGHTS */}
      {trek.highlights.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Trek Highlights</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7, color: 'var(--color-text)' }}>
            {trek.highlights.map((h, i) => (
              <li key={i} style={{ marginBottom: '0.4rem' }}>{h}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ITINERARY — Route Overview */}
      {trek.itinerary.length > 0 && (
        <section style={{ marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '1rem', color: 'var(--color-text)' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Route Overview</h2>
          {trek.itinerary.map((day, i) => (
            <p key={i} style={{ marginBottom: '0.75rem' }}><strong>{day.split(':')[0]}:</strong>{day.includes(':') ? day.substring(day.indexOf(':') + 1) : day}</p>
          ))}
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
        </section>
      )}

      {/* MINI LEAD FORM — above departure table */}
      <TrekMiniLeadForm
        trekTitle={trek.title}
        trekSlug={trek.slug}
        locationId={locationId}
        sourcePath={`/treks/location/${locationId}/${slug}`}
        bestSeason={trek.bestSeason}
      />

      {/* DEPARTURE DATES TABLE */}
      <TrekDeparturesTable
        trekTitle={trek.title}
        trekSlug={trek.slug}
        difficulty={trek.difficulty}
        bestSeason={trek.bestSeason}
        locationId={locationId}
        locationName={location.name}
        sourcePath={`/treks/location/${locationId}/${slug}`}
      />

      {/* DIFFICULTY & PREPARATION */}
      <section style={{ marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '1rem', color: 'var(--color-text)' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Difficulty &amp; Preparation</h2>
        <p>This trek is rated <strong>{trek.difficulty}</strong>.{trek.altitude ? ` Maximum elevation reaches ${trek.altitude}.` : ''}{trek.distance ? ` Total route distance is approximately ${trek.distance}.` : ''} The trek duration is {trek.duration} from {trek.pickupPoint}.</p>
        <p>Best seasons: <strong>{trek.bestSeason.join(', ')}</strong>. Plan your trip around these months for the safest conditions and best visibility.</p>
        {trek.difficulty === 'Challenging' && (
          <p>This is a demanding route. Prior multi-day Himalayan trekking experience is recommended. Ensure you have adequate cardiovascular fitness, are comfortable with sustained daily walking over rough terrain, and have experience at altitudes above 3,000 metres. Consult a physician before committing if you have any altitude-related health concerns.</p>
        )}
        {trek.difficulty === 'Moderate' && (
          <p>Reasonable fitness is required. Prior trekking experience is helpful but not mandatory if you prepare with regular cardio exercise in the weeks before departure.</p>
        )}
        {trek.difficulty === 'Easy' && (
          <p>This trek is suitable for beginners and families. Basic fitness is sufficient — the trails are well-defined and the altitude manageable.</p>
        )}
      </section>

      {/* QUICK FAQ — conversion confidence near CTA */}
      <aside style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', backgroundColor: 'var(--color-surface, #f9f9f9)', borderRadius: 'var(--radius-sm, 6px)', fontSize: '0.9rem', lineHeight: 1.7 }}>
        <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Quick questions</p>
        <p style={{ marginBottom: '0.4rem' }}><strong>Can I cancel?</strong> Free cancellation up to 7 days before departure. Full refund, no questions asked.</p>
        <p style={{ marginBottom: 0 }}><strong>What if I&apos;m a beginner?</strong> Our trek coordinator assesses your fitness and recommends the right trek. We won&apos;t send you on a route you&apos;re not ready for.</p>
      </aside>

      {/* CONVERSION LAYER — all treks */}
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

      {/* BEST TIME — dedicated section */}
      <section style={{ marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '1rem', color: 'var(--color-text)' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Best Time to Trek</h2>
        <p>The recommended months are <strong>{trek.bestSeason.join(', ')}</strong>. These windows offer the most stable weather, safest trail conditions, and best mountain visibility.</p>
        {trek.bestSeason.some(m => ['May', 'June'].includes(m)) && (
          <p><strong>Pre-monsoon (May–June):</strong> Clear skies, warming temperatures, and wildflower meadows at higher elevations. Snow may persist above 3,500 metres in early May, adding alpine character. This is typically the busiest trekking window.</p>
        )}
        {trek.bestSeason.some(m => ['September', 'October'].includes(m)) && (
          <p><strong>Post-monsoon (September–October):</strong> After the monsoon rains withdraw, visibility sharpens dramatically. Autumn brings cooler temperatures, golden light, and far fewer trekkers on the trail. An excellent season for photography and solitude.</p>
        )}
        {trek.bestSeason.some(m => ['December', 'January', 'February'].includes(m)) && (
          <p><strong>Winter (December–February):</strong> Snow conditions define the experience. Cold temperatures, shorter days, and icy trails require proper gear and winter trekking experience. The reward is dramatic snow-covered landscapes and virtually empty trails.</p>
        )}
        {trek.bestSeason.some(m => ['March', 'April'].includes(m)) && (
          <p><strong>Spring (March–April):</strong> Retreating snow, blooming rhododendrons, and lengthening days. A transitional season with mild conditions at lower elevations and lingering snow higher up.</p>
        )}
      </section>

      {/* MONTHLY CONDITIONS — month-by-month breakdown if available */}
      {trek.monthlyConditions && trek.monthlyConditions.length > 0 && (
        <section style={{ marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '1rem', color: 'var(--color-text)' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Month-by-Month Conditions</h2>
          {trek.monthlyConditions.map((mc, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <p><strong>{mc.month}:</strong> {mc.conditions}</p>
            </div>
          ))}
        </section>
      )}

      {/* SAFETY — if available */}
      {trek.safety && (
        <section style={{ marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '1rem', color: 'var(--color-text)' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Safety &amp; Precautions</h2>
          <p>{trek.safety}</p>
        </section>
      )}

      {/* PERMITS — if available */}
      {trek.permits && (
        <section style={{ marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '1rem', color: 'var(--color-text)' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Permits &amp; Documentation</h2>
          <p>{trek.permits}</p>
        </section>
      )}

      {/* WHO SHOULD AVOID — if available */}
      {trek.whoShouldAvoid && (
        <section style={{ marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '1rem', color: 'var(--color-text)' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Who Should Reconsider</h2>
          <p>{trek.whoShouldAvoid}</p>
        </section>
      )}

      {/* LOCAL LOGISTICS — if available */}
      {trek.localLogistics && (
        <section style={{ marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '1rem', color: 'var(--color-text)' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Getting There &amp; Local Info</h2>
          <p>{trek.localLogistics}</p>
        </section>
      )}

      {/* INCLUSIONS & EXCLUSIONS */}
      <section style={{ marginBottom: '2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Included</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7, color: 'var(--color-text)', fontSize: '0.95rem' }}>
            {trek.inclusions.map((item, i) => (
              <li key={i} style={{ marginBottom: '0.3rem' }}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Not Included</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7, color: 'var(--color-text)', fontSize: '0.95rem' }}>
            {trek.exclusions.map((item, i) => (
              <li key={i} style={{ marginBottom: '0.3rem' }}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      {trek.faqs.length > 0 && (
        <section style={{ marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '1rem', color: 'var(--color-text)' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
          {trek.faqs.map((faq, i) => (
            <div key={i} style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{faq.question}</p>
              <p style={{ color: 'var(--color-text-secondary)' }}>{faq.answer}</p>
            </div>
          ))}
        </section>
      )}

      {/* CONTEXTUAL LINKS */}

      {/* CROSS-LINK — same difficulty peer */}
      {PEER_TREKS[slug] && (
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
          {PEER_TREKS[slug].prompt}{' '}
          Consider the{' '}
          <Link href={`/treks/location/${PEER_TREKS[slug].location}/${PEER_TREKS[slug].slug}`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
            {PEER_TREKS[slug].label}
          </Link>.
        </p>
      )}

      <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
        Explore more <Link href={`/treks/location/${locationId}`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>treks around {location.name}</Link> or discover <Link href={`/retreats/${locationId}`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>wellness retreats in {location.name}</Link>.
      </p>

      {/* UPWARD CLUSTER LINKS */}
      <nav style={{ marginTop: '1.5rem', padding: '1.25rem', backgroundColor: 'var(--color-surface, #f9f9f9)', borderRadius: 'var(--radius-sm, 6px)', fontSize: '0.95rem', lineHeight: 1.8 }}>
        <p style={{ margin: 0, fontWeight: 600, marginBottom: '0.5rem' }}>Explore the region</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>
            <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
              Best Treks in Uttarakhand →
            </Link>
          </li>
          {INTENT_TRAIL[slug] && (
            <li>
              <Link href={INTENT_TRAIL[slug].path} style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                {INTENT_TRAIL[slug].label} →
              </Link>
            </li>
          )}
          <li>
            <Link href={`/treks/location/${locationId}`} style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
              All treks from {location.name} →
            </Link>
          </li>
          {GARHWAL_LOCATIONS.has(locationId) && (
            <li>
              <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                Garhwal Himalayas trekking guide →
              </Link>
            </li>
          )}
          {trek.bestSeason.some((m: string) => ['December', 'January', 'February', 'March'].includes(m)) && (
            <li>
              <Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                Winter treks in Uttarakhand →
              </Link>
            </li>
          )}
          {trek.bestSeason.some((m: string) => ['May', 'June', 'April'].includes(m)) && (
            <li>
              <Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                Summer treks in Uttarakhand →
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* RELATED TREKS */}
      {relatedTreks.length > 0 && (
        <section style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Related Treks in {location.name}</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {relatedTreks.map((related) => (
              <li key={related.slug} style={{ marginBottom: '0.75rem' }}>
                <Link href={`/treks/location/${locationId}/${related.slug}`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>{related.title}</Link>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}> — {related.duration} · {related.difficulty}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* COMPARISON PAGE */}
      {COMPARISON_BLOGS[slug] && (
        <section style={{ marginTop: '2rem', padding: '1.25rem', backgroundColor: 'var(--color-surface, #f9f9f9)', borderRadius: 'var(--radius-sm, 6px)' }}>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
            Not sure which trek to choose?{' '}
            <Link href={COMPARISON_BLOGS[slug].path} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
              {COMPARISON_BLOGS[slug].title} →
            </Link>
          </p>
        </section>
      )}
    </main>
    </>
  );
}
