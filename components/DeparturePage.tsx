import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import PrimaryCTA from '@/components/PrimaryCTA';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import { getDeparturesBySlug } from '@/config/departures';
import type { Departure, TrekDepartures } from '@/config/departures';
import { notFound } from 'next/navigation';

// ─── Shared styles ──────────────────────────────────────────────────────────

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: 'var(--color-primary)',
  marginTop: 'var(--space-xl)',
  marginBottom: 'var(--space-md)',
};

const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 'var(--radius-md)',
  padding: 'var(--space-lg)',
  marginBottom: 'var(--space-md)',
};

// ─── Status badge ───────────────────────────────────────────────────────────

function statusColor(status: Departure['status']): { bg: string; text: string; label: string } {
  switch (status) {
    case 'open':
      return { bg: '#ecfdf5', text: '#065f46', label: 'Open' };
    case 'filling-fast':
      return { bg: '#fffbeb', text: '#92400e', label: 'Filling Fast' };
    case 'last-few':
      return { bg: '#fef2f2', text: '#991b1b', label: 'Last Few Seats' };
    case 'sold-out':
      return { bg: '#f3f4f6', text: '#6b7280', label: 'Sold Out' };
  }
}

// ─── Schema generators ──────────────────────────────────────────────────────

function generateDepartureEventSchemas(trek: TrekDepartures) {
  return trek.departures
    .filter((d) => d.status !== 'sold-out')
    .map((d) => ({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: `${trek.trekName} — ${d.dateRange}`,
      description: `Fixed departure batch for ${trek.trekName} (${trek.altitude}, ${trek.difficulty}). Group size: ${d.groupSize}. Starts from ${trek.pickupPoint}.`,
      startDate: d.startDate,
      endDate: d.endDate,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'Place',
        name: trek.pickupPoint,
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Uttarakhand',
          addressCountry: 'IN',
        },
      },
      organizer: {
        '@type': 'Organization',
        name: 'Retreats And Treks',
        url: buildCanonicalUrl('/'),
      },
      offers: {
        '@type': 'Offer',
        url: buildCanonicalUrl(`/treks/${trek.urlSlug}/departures`),
        price: d.price,
        priceCurrency: trek.currency,
        availability: d.status === 'sold-out'
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
        validFrom: '2025-01-01',
      },
      maximumAttendeeCapacity: d.groupSize,
    }));
}

function generateProductSchema(trek: TrekDepartures) {
  const openDepartures = trek.departures.filter((d) => d.status !== 'sold-out');
  const lowestPrice = Math.min(...openDepartures.map((d) => d.price));
  const highestPrice = Math.max(...openDepartures.map((d) => d.price));

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${trek.trekName} — Fixed Departures 2025-26`,
    description: `Book your ${trek.trekName} departure. ${trek.duration}, ${trek.difficulty}, max altitude ${trek.altitude}. Starts from ${trek.pickupPoint}. Best months: ${trek.bestMonths}.`,
    brand: {
      '@type': 'Organization',
      name: 'Retreats And Treks',
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: lowestPrice,
      highPrice: highestPrice,
      priceCurrency: trek.currency,
      offerCount: openDepartures.length,
      availability: 'https://schema.org/InStock',
      url: buildCanonicalUrl(`/treks/${trek.urlSlug}/departures`),
    },
  };
}

// ─── FAQ data ───────────────────────────────────────────────────────────────

function getDepartureFAQs(trek: TrekDepartures) {
  return [
    {
      question: `What is included in the ${trek.trekName} departure price?`,
      answer: trek.included.join('. ') + '. Travel to/from ' + trek.pickupPoint + ' is not included.',
    },
    {
      question: `How many people are in each ${trek.shortName} batch?`,
      answer: `Each batch has a maximum of ${trek.departures[0]?.groupSize || 16} trekkers. Smaller groups ensure better safety, personal attention from the guide, and a more immersive experience.`,
    },
    {
      question: `Can I cancel or reschedule my ${trek.shortName} departure?`,
      answer: `Free cancellation is available up to 15 days before departure. Between 7–15 days, a 50% refund applies. No refund within 7 days. You can transfer your booking to another batch (subject to availability) at no extra charge up to 10 days before departure.`,
    },
    {
      question: `What fitness level do I need for ${trek.trekName}?`,
      answer: trek.difficultyGuide,
    },
    {
      question: `How do I reach ${trek.pickupPoint}?`,
      answer: `${trek.pickupPoint} is the base camp for ${trek.trekName}. Detailed travel instructions are shared upon booking confirmation, including bus/taxi options from Rishikesh and Dehradun.`,
    },
  ];
}

// ─── Metadata generator ─────────────────────────────────────────────────────

export function generateDepartureMetadata(urlSlug: string): Metadata {
  const trek = getDeparturesBySlug(urlSlug);
  if (!trek) return { title: 'Departures Not Found' };

  const title = `${trek.trekName} Departures 2025-26 — Dates, Prices & Availability`;
  const description = `Book your ${trek.trekName} fixed departure. ${trek.duration}, ${trek.difficulty}, ${trek.altitude}. Upcoming batches with dates, prices from ₹${trek.basePrice.toLocaleString('en-IN')}, and live seat availability. Best months: ${trek.bestMonths}.`;

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(`/treks/${urlSlug}/departures`),
    },
    openGraph: {
      title,
      description,
      url: buildCanonicalUrl(`/treks/${urlSlug}/departures`),
      type: 'website',
    },
  };
}

// ─── Page component ─────────────────────────────────────────────────────────

export default function DeparturePage({ urlSlug }: { urlSlug: string }) {
  const trek = getDeparturesBySlug(urlSlug);
  if (!trek) notFound();

  const faqs = getDepartureFAQs(trek);
  validateFAQSync(faqs, `/treks/${urlSlug}/departures`);

  const openDepartures = trek.departures.filter((d) => d.status !== 'sold-out');
  const fillingFast = trek.departures.filter((d) => d.status === 'filling-fast' || d.status === 'last-few');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Treks', href: '/treks' },
    { name: trek.trekName, href: `/treks/location/${trek.slug.includes('brahmatal') || trek.slug.includes('roopkund') ? 'lohajung' : 'joshimath'}/${trek.slug}` },
    { name: 'Departures' },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: trek.trekName, url: buildCanonicalUrl(`/treks/location/${trek.slug.includes('brahmatal') || trek.slug.includes('roopkund') ? 'lohajung' : 'joshimath'}/${trek.slug}`) },
    { name: 'Departures', url: buildCanonicalUrl(`/treks/${urlSlug}/departures`) },
  ]);

  const eventSchemas = generateDepartureEventSchemas(trek);
  const productSchema = generateProductSchema(trek);
  const faqSchema = generateFAQSchema(faqs);

  // WHATSAPP_NUMBER from trek detail template
  const WHATSAPP_NUMBER = '919760446101';
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${trek.trekName} departure. Can you help me with availability and booking?`
  );

  return (
    <TrackedPage page={`/treks/${urlSlug}/departures`}>
      {/* ── Schema markup ────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {eventSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Breadcrumb ───────────────────────────────────────── */}
      <Breadcrumb items={breadcrumbItems} />

      {/* ── Hero / H1 ────────────────────────────────────────── */}
      <header style={{ marginBottom: 'var(--space-lg)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2, color: '#111827' }}>
          {trek.trekName} — Fixed Departures 2025-26
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)', marginTop: 'var(--space-xs)' }}>
          {trek.duration} · {trek.difficulty} · {trek.altitude} · From {trek.pickupPoint}
        </p>
        {fillingFast.length > 0 && (
          <p style={{
            display: 'inline-block',
            marginTop: 'var(--space-sm)',
            padding: '4px 12px',
            background: '#fef2f2',
            color: '#991b1b',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}>
            🔥 {fillingFast.length} batch{fillingFast.length > 1 ? 'es' : ''} filling fast
          </p>
        )}
      </header>

      {/* ── Departures Table ─────────────────────────────────── */}
      <section>
        <h2 style={sectionHeadingStyle}>Upcoming Departure Dates</h2>
        <p style={{ color: 'var(--color-muted)', marginBottom: 'var(--space-md)', fontSize: '0.95rem' }}>
          Prices are per person, all-inclusive. Group sizes limited to ensure quality. Best months for {trek.shortName}: <strong>{trek.bestMonths}</strong>.
        </p>

        {/* Desktop table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.95rem',
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-primary)', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Dates</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Duration</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Price</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Seats Left</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Status</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}></th>
              </tr>
            </thead>
            <tbody>
              {trek.departures.map((dep, i) => {
                const s = statusColor(dep.status);
                return (
                  <tr
                    key={i}
                    style={{
                      borderBottom: '1px solid #e5e7eb',
                      opacity: dep.status === 'sold-out' ? 0.5 : 1,
                    }}
                  >
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{dep.dateRange}</td>
                    <td style={{ padding: '12px 16px' }}>{trek.duration}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                      ₹{dep.price.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      {dep.status === 'sold-out' ? '—' : `${dep.seatsLeft} / ${dep.groupSize}`}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-sm)',
                        background: s.bg,
                        color: s.text,
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}>
                        {s.label}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      {dep.status !== 'sold-out' && (
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I want to book the ${trek.trekName} departure: ${dep.dateRange}. Please confirm availability.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            padding: '8px 20px',
                            background: 'var(--color-primary)',
                            color: '#fff',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Book Now
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Best Months Guide ────────────────────────────────── */}
      <section>
        <h2 style={sectionHeadingStyle}>Best Months for {trek.trekName}</h2>
        <div style={cardStyle}>
          <p style={{ lineHeight: 1.7, marginBottom: 'var(--space-sm)' }}>
            The ideal months for {trek.shortName} are <strong>{trek.bestMonths}</strong>. During these windows,
            trail conditions are optimal, weather is most predictable, and you&apos;ll get the best mountain
            visibility. Departure batches are scheduled exclusively within these season windows to ensure
            the best possible experience.
          </p>
          <p style={{ lineHeight: 1.7 }}>
            <strong>Tip:</strong> Early-season and late-season departures often have more availability
            and occasionally lower prices. Mid-season batches (especially around holidays and long weekends)
            fill fastest.
          </p>
        </div>
      </section>

      {/* ── Batch Difficulty Guide ───────────────────────────── */}
      <section>
        <h2 style={sectionHeadingStyle}>Difficulty & Fitness Guide</h2>
        <div style={cardStyle}>
          <div style={{
            display: 'flex',
            gap: 'var(--space-md)',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-md)',
          }}>
            <div style={{
              padding: '8px 16px',
              background: trek.difficulty === 'Moderate' ? '#ecfdf5' : '#fef2f2',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: trek.difficulty === 'Moderate' ? '#065f46' : '#991b1b',
            }}>
              {trek.difficulty}
            </div>
            <div style={{
              padding: '8px 16px',
              background: '#f0f9ff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#1e40af',
            }}>
              Max altitude: {trek.altitude}
            </div>
          </div>
          <p style={{ lineHeight: 1.7 }}>{trek.difficultyGuide}</p>
        </div>
      </section>

      {/* ── Quick Itinerary ──────────────────────────────────── */}
      <section>
        <h2 style={sectionHeadingStyle}>Quick Itinerary</h2>
        <div style={cardStyle}>
          <ol style={{ paddingLeft: '1.2rem', lineHeight: 1.8 }}>
            {trek.quickItinerary.map((day, i) => (
              <li key={i} style={{ marginBottom: '6px' }}>{day}</li>
            ))}
          </ol>
          <p style={{ marginTop: 'var(--space-md)', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
            → <Link
              href={`/treks/location/${trek.slug.includes('brahmatal') || trek.slug.includes('roopkund') ? 'lohajung' : 'joshimath'}/${trek.slug}`}
              style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
            >
              Read the full {trek.shortName} trek guide
            </Link> for detailed day-by-day itinerary, packing list, and trail conditions.
          </p>
        </div>
      </section>

      {/* ── What's Included ──────────────────────────────────── */}
      <section>
        <h2 style={sectionHeadingStyle}>What&apos;s Included</h2>
        <div style={cardStyle}>
          <ul style={{ paddingLeft: '1.2rem', lineHeight: 1.8 }}>
            {trek.included.map((item, i) => (
              <li key={i} style={{ marginBottom: '4px' }}>✓ {item}</li>
            ))}
          </ul>
          <p style={{ marginTop: 'var(--space-sm)', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
            <strong>Not included:</strong> Travel to/from {trek.pickupPoint}, personal gear & clothing, travel insurance, tips.
          </p>
        </div>
      </section>

      {/* ── Reserve CTA ──────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
        border: '2px solid #bbf7d0',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-xl)',
        textAlign: 'center',
        margin: 'var(--space-xl) 0',
      }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: 'var(--space-sm)' }}>
          Reserve Your Spot
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-muted)', marginBottom: 'var(--space-xs)' }}>
          {openDepartures.length} departure{openDepartures.length !== 1 ? 's' : ''} available · Limited to {trek.departures[0]?.groupSize || 16} per batch · Free cancellation up to 15 days
        </p>
        <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 'var(--space-md)' }}>
          From ₹{trek.basePrice.toLocaleString('en-IN')} per person
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: '#25d366',
              color: '#fff',
              borderRadius: 'var(--radius-sm)',
              fontSize: '1rem',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            💬 Book via WhatsApp
          </a>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: 'var(--space-sm)' }}>
          Or use the inquiry form below ↓
        </p>
      </section>

      {/* ── Inline inquiry form ──────────────────────────────── */}
      <PrimaryCTA
        label={`Inquire About ${trek.shortName} Departures`}
        subtext="Have questions? Need help choosing a batch? We respond within 2 hours."
        vertical="trek"
        category="departures"
        sourcePath={`/treks/${urlSlug}/departures`}
        location={trek.pickupPoint}
      />

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section>
        <h2 style={sectionHeadingStyle}>Frequently Asked Questions</h2>
        {faqs.map((faq, i) => (
          <details
            key={i}
            style={{
              borderBottom: '1px solid #e5e7eb',
              padding: 'var(--space-md) 0',
            }}
          >
            <summary style={{
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '1rem',
              lineHeight: 1.5,
            }}>
              {faq.question}
            </summary>
            <p style={{
              marginTop: 'var(--space-sm)',
              lineHeight: 1.7,
              color: 'var(--color-muted)',
            }}>
              {faq.answer}
            </p>
          </details>
        ))}
      </section>

      {/* ── Internal links / Explore more ────────────────────── */}
      <section style={{ marginTop: 'var(--space-xl)' }}>
        <h2 style={sectionHeadingStyle}>Explore More</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--space-md)',
        }}>
          <Link
            href={`/treks/location/${trek.slug.includes('brahmatal') || trek.slug.includes('roopkund') ? 'lohajung' : 'joshimath'}/${trek.slug}`}
            style={{
              display: 'block',
              padding: 'var(--space-md)',
              background: '#f9fafb',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #e5e7eb',
              color: 'var(--color-primary)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            📋 Full {trek.shortName} Trek Guide →
          </Link>
          <Link
            href="/treks/best-treks-in-uttarakhand"
            style={{
              display: 'block',
              padding: 'var(--space-md)',
              background: '#f9fafb',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #e5e7eb',
              color: 'var(--color-primary)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            🏔️ Best Treks in Uttarakhand →
          </Link>
          <Link
            href="/treks/garhwal-himalayas"
            style={{
              display: 'block',
              padding: 'var(--space-md)',
              background: '#f9fafb',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #e5e7eb',
              color: 'var(--color-primary)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            🗺️ Garhwal Himalayas Guide →
          </Link>
          <Link
            href="/treks/garhwal-himalayas/fitness-guide"
            style={{
              display: 'block',
              padding: 'var(--space-md)',
              background: '#f9fafb',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #e5e7eb',
              color: 'var(--color-primary)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            💪 Trek Fitness Guide →
          </Link>
        </div>
      </section>
    </TrackedPage>
  );
}
