import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getTreksByLocation } from '@/lib/treks';
import { getLocationById, getAllLocations } from '@/lib/locations';
import type { LocationId } from '@/config/locations';

// Deterministic trek comparison blog mapping
// Only add entries where a dedicated comparison blog exists
const COMPARISON_BLOGS: Record<string, { slug: string; title: string }> = {
  'kedarkantha-trek': { slug: 'kedarkantha-vs-har-ki-dun', title: 'Compare Kedarkantha vs Har Ki Dun' },
  'har-ki-dun-trek': { slug: 'kedarkantha-vs-har-ki-dun', title: 'Compare Kedarkantha vs Har Ki Dun' },
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
    title: `${trek.title} in ${location.name}`,
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

  return (
    <main style={{ maxWidth: '56rem', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* BREADCRUMB */}
      <div style={{ marginBottom: '0.5rem', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
        <Link href="/treks" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Treks</Link>
        {' \u2192 '}
        <Link href={`/treks/location/${locationId}`} style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>{location.name}</Link>
        {' \u2192 '}{trek.title}
      </div>

      <h1 style={{ marginBottom: '0.75rem' }}>{trek.title}</h1>

      {/* META BAR */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
        <span><strong>Location:</strong> {location.name}</span>
        <span><strong>Duration:</strong> {trek.duration}</span>
        <span><strong>Difficulty:</strong> {trek.difficulty}</span>
        {trek.altitude && <span><strong>Max Altitude:</strong> {trek.altitude}</span>}
        {trek.distance && <span><strong>Distance:</strong> {trek.distance}</span>}
      </div>

      {/* INTRO / DESCRIPTION */}
      <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text)', marginBottom: '1.5rem' }}>
        {trek.description}
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
        </section>
      )}

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
      <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
        Explore more <Link href={`/treks/location/${locationId}`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>treks around {location.name}</Link> or discover <Link href={`/retreats/${locationId}`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>wellness retreats in {location.name}</Link>.
      </p>

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

      {/* COMPARISON BLOG */}
      {COMPARISON_BLOGS[slug] && (
        <section style={{ marginTop: '2rem', padding: '1.25rem', backgroundColor: 'var(--color-surface, #f9f9f9)', borderRadius: 'var(--radius-sm, 6px)' }}>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
            Not sure which trek to choose?{' '}
            <Link href={`/blog/${COMPARISON_BLOGS[slug].slug}`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
              {COMPARISON_BLOGS[slug].title} →
            </Link>
          </p>
        </section>
      )}
    </main>
  );
}
