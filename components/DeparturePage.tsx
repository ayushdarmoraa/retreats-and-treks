import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import PrimaryCTA from '@/components/PrimaryCTA';
import FeaturedRetreat from '@/components/FeaturedRetreat';
import RelatedReads from '@/components/RelatedReads';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { schemaIds } from '@/lib/schemaIds';
import { validateFAQSync } from '@/utils/validateFAQSync';
import { getDeparturesBySlug } from '@/config/departures';
import type { Departure, TrekDepartures } from '@/config/departures';
import { notFound } from 'next/navigation';
import { images } from '@/lib/images';

// ─── Status badge ───────────────────────────────────────────────────────────

function statusColor(status: Departure['status']): { bg: string; text: string; label: string } {
  switch (status) {
    case 'open':
      return { bg: 'rgba(15,118,110,0.08)', text: '#0f766e', label: 'Open' };
    case 'filling-fast':
      return { bg: 'rgba(245,158,11,0.1)', text: '#92400e', label: 'Filling Fast' };
    case 'last-few':
      return { bg: 'rgba(220,38,38,0.08)', text: '#991b1b', label: 'Last Few Seats' };
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
      organizer: { '@id': schemaIds.organization },
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
    brand: { '@id': schemaIds.organization },
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

  const title = `${trek.trekName} Departures | Retreats And Treks`;
  const description = `Book ${trek.trekName} departures with dates, prices from ₹${trek.basePrice.toLocaleString('en-IN')}, live seats, difficulty, altitude, and best months.`;

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
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages(title),
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

  const canonicalUrl = buildCanonicalUrl(`/treks/${urlSlug}/departures`);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${trek.trekName} — Fixed Departures 2025-26`,
    description: `Book ${trek.trekName} departures with dates, prices from ₹${trek.basePrice.toLocaleString('en-IN')}, live seats, difficulty, altitude, and best months.`,
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2025-01-01',
    dateModified: '2025-01-01',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = `${trek.trekName} — Fixed Departures 2025-26`.split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  // WHATSAPP_NUMBER from trek detail template
  const WHATSAPP_NUMBER = '919760446101';
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${trek.trekName} departure. Can you help me with availability and booking?`
  );

  return (
    <TrackedPage page={`/treks/${urlSlug}/departures`} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title={`${trek.trekName} — Fixed Departures 2025-26`}
        description={`Book ${trek.trekName} departures with dates, prices from ₹${trek.basePrice.toLocaleString('en-IN')}, live seats, difficulty, altitude, and best months.`}
        path={`/treks/${urlSlug}/departures`}
      />

      <style>{`
        .med-shell { width: 100vw; margin-left: calc(-50vw + 50%); }
        .med-outer { max-width: 76rem; margin: 0 auto; padding: 0 1.5rem; }
        .med-inner { max-width: 58rem; margin: 0 auto; padding: 0 1.5rem; }

        .med-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.1rem; }
        .med-eyebrow-line { width: 30px; height: 1px; background: rgba(15,118,110,0.35); flex-shrink: 0; }
        .med-eyebrow-text { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6b7280; font-weight: 600; }

        .med-h2 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.12; margin: 0 0 1.1rem; }
        .med-h2 span { color: #0f766e; }
        .med-h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.15rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.7rem; letter-spacing: -0.01em; }
        .med-body { font-family: var(--font-inter), sans-serif; font-size: 0.98rem; line-height: 1.9; color: #4b5259; font-weight: 400; margin: 0 0 1rem; }
        .med-body:last-child { margin-bottom: 0; }
        .med-body strong { color: #2B2A26; font-weight: 600; }

        .med-card {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(15,31,28,0.05);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .med-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: #0f766e; transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: 2;
        }
        .med-card:hover { transform: translateY(-6px); border-color: rgba(15,118,110,0.28); box-shadow: 0 22px 48px rgba(15,31,28,0.12); }
        .med-card:hover::before { transform: scaleX(1); }

        .med-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem 2.3rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.25); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid #0f766e; }
        .med-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.32); }
        .med-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.85rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .med-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } }

        @keyframes med-hero-zoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        .med-hero-bg { animation: med-hero-zoom 24s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .med-hero-bg { animation: none; } }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-hero-section {
          position: relative;
          overflow: hidden;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(15,118,110,0.12);
        }
        .med-hero-section .med-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%);
        }
        .med-hero-section .med-hero-content {
          position: relative;
          z-index: 2;
          max-width: 58rem;
          width: 100%;
          padding: 5rem 1.5rem 4.5rem;
          text-align: center;
        }
        .med-hero-section .med-hero-content .med-h1 {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(2.3rem, 4.6vw, 3.4rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 1.1rem;
          line-height: 1.08;
          text-shadow: 0 3px 24px rgba(0,0,0,0.5);
        }
        .med-hero-section .med-hero-content .med-h1 span {
          color: #5eead4;
        }
        .med-hero-section .med-hero-content .med-body {
          max-width: 46rem;
          margin: 0 auto 1.5rem;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.85);
          text-shadow: 0 2px 14px rgba(0,0,0,0.45);
        }
        .med-hero-section .med-hero-content .med-hero-tags {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .med-hero-section .med-hero-content .med-hero-tags span {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 999px;
          padding: 0.35rem 0.9rem;
          background: rgba(15,118,110,0.25);
        }
        .med-hero-section .med-hero-content .med-hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .med-section-padding { padding: 4rem 0; }
        .med-section-padding-sm { padding: 3rem 0; }

        /* ── Status Badge ── */
        .med-status-badge {
          display: inline-block;
          padding: 0.2rem 0.7rem;
          border-radius: 999px;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .med-filling-badge {
          display: inline-block;
          margin-top: 0.5rem;
          padding: 0.3rem 0.9rem;
          background: rgba(220,38,38,0.08);
          color: #991b1b;
          border-radius: 999px;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
        }

        /* ── Table ── */
        .med-table-wrap {
          overflow-x: auto;
          border-radius: 18px;
          border: 1px solid rgba(15,118,110,0.12);
          margin-top: 1.5rem;
        }
        .med-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
        }
        .med-table th {
          text-align: left;
          padding: 0.85rem 1rem;
          background: #f7f9f7;
          border-bottom: 2px solid #0f766e;
          font-weight: 600;
          color: #2B2A26;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .med-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(15,118,110,0.08);
          color: #4b5259;
        }
        .med-table tr:last-child td { border-bottom: none; }
        .med-table tr:hover td { background: #f7f9f7; }

        .med-book-btn {
          display: inline-block;
          padding: 0.5rem 1.25rem;
          background: #0f766e;
          color: #fff;
          border-radius: 999px;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          white-space: nowrap;
          border: 1px solid #0f766e;
        }
        .med-book-btn:hover {
          background: #0d6b64;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(15,118,110,0.25);
        }

        /* ── Departure Info Cards ── */
        .med-departure-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          color: #6b7280;
        }

        .med-departure-meta span {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .med-departure-meta span::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #0f766e;
          display: inline-block;
        }

        /* ── CTA Block ── */
        .med-cta-block {
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
          border: 2px solid #bbf7d0;
          border-radius: 18px;
          padding: 2.5rem;
          text-align: center;
          margin: 2rem 0;
        }
        .med-cta-block .med-h2 {
          font-size: 1.6rem;
          margin-bottom: 0.5rem;
        }
        .med-cta-block .med-body {
          font-size: 1.05rem;
          margin-bottom: 0.25rem;
        }
        .med-cta-block .med-price {
          font-family: var(--font-inter), sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #2B2A26;
          margin-bottom: 1rem;
        }
        .med-cta-block .med-wa-btn {
          display: inline-block;
          padding: 0.85rem 2.5rem;
          background: #25d366;
          color: #fff;
          border-radius: 999px;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .med-cta-block .med-wa-btn:hover {
          background: #1ebe5c;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(37,211,102,0.3);
        }
        .med-cta-block .med-small {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.82rem;
          color: #6b7280;
          margin-top: 0.5rem;
        }

        /* ── FAQ ── */
        .med-faq-item {
          border-bottom: 1px solid rgba(15,118,110,0.08);
          padding: 1.25rem 0;
        }
        .med-faq-item:last-child { border-bottom: none; }
        .med-faq-item .med-question {
          font-family: var(--font-inter), sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #2B2A26;
          cursor: pointer;
          line-height: 1.5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          background: none;
          border: none;
          padding: 0;
          text-align: left;
        }
        .med-faq-item .med-question:hover { color: #0f766e; }
        .med-faq-item .med-answer {
          margin-top: 0.5rem;
          line-height: 1.7;
          color: #4b5259;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.92rem;
        }

        .med-faq-icon {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f766e;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .med-faq-item[open] .med-faq-icon {
          transform: rotate(45deg);
        }

        /* ── Explore Grid ── */
        .med-explore-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .med-explore-link {
          display: block;
          padding: 1rem 1.25rem;
          background: #f7f9f7;
          border-radius: 12px;
          border: 1px solid rgba(15,118,110,0.08);
          color: #2B2A26;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .med-explore-link:hover {
          background: #fff;
          border-color: rgba(15,118,110,0.25);
          transform: translateY(-3px);
          box-shadow: 0 4px 16px rgba(15,118,110,0.06);
        }
        .med-explore-link .med-arrow { color: #0f766e; }

        .med-trek-footer {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1.5rem;
          justify-content: center;
          padding: 2rem 0 4rem;
          border-top: 1px solid rgba(15,118,110,0.08);
          margin-top: 2rem;
        }
        .med-trek-footer a {
          color: #0f766e;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.3s;
        }
        .med-trek-footer a:hover { color: #0d6b64; text-decoration: underline; }
      `}</style>

      {/* ── Schema markup ────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, productSchema, faqSchema, articleSchema]) }}
      />
      {eventSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <article>

        {/* ── HERO ── */}
        <section className="med-shell med-hero-section">
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              className="med-hero-bg"
              src={heroImage.src}
              alt={heroImage.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div className="med-hero-overlay" />
          </div>
          <div className="med-hero-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Fixed Departures 2025-26</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              {trek.duration} · {trek.difficulty} · {trek.altitude} · From {trek.pickupPoint}
            </p>
            {fillingFast.length > 0 && (
              <div className="med-filling-badge">
                {fillingFast.length} batch{fillingFast.length > 1 ? 'es' : ''} filling fast
              </div>
            )}
            <div className="med-hero-tags">
              <span>{trek.shortName}</span>
              <span>{trek.difficulty}</span>
              <span>{trek.altitude}</span>
              <span>{trek.duration}</span>
            </div>
            <div className="med-hero-actions">
              <a href="#departures" className="med-cta-btn">View Dates</a>
              <a href="#faq" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>FAQ</a>
            </div>
          </div>
        </section>

        {/* ── Departures Table ── */}
        <section id="departures" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Upcoming Departures</span>
            </div>
            <h2 className="med-h2">Upcoming {trek.trekName} <span>Departure Dates</span></h2>
            <p className="med-body" style={{ marginBottom: '1.5rem' }}>
              Prices are per person, all-inclusive. Group sizes limited to ensure quality. Best months for {trek.shortName}: <strong>{trek.bestMonths}</strong>.
            </p>

            <div className="med-table-wrap">
              <table className="med-table">
                <thead>
                  <tr>
                    <th>Dates</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th>Seats Left</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {trek.departures.map((dep, i) => {
                    const s = statusColor(dep.status);
                    return (
                      <tr key={i}>
                        <td style={{ fontWeight: 600, color: '#2B2A26' }}>{dep.dateRange}</td>
                        <td>{trek.duration}</td>
                        <td style={{ fontWeight: 600, color: '#2B2A26' }}>₹{dep.price.toLocaleString('en-IN')}</td>
                        <td>{dep.status === 'sold-out' ? '—' : `${dep.seatsLeft} / ${dep.groupSize}`}</td>
                        <td>
                          <span
                            className="med-status-badge"
                            style={{
                              background: s.bg,
                              color: s.text,
                            }}
                          >
                            {s.label}
                          </span>
                        </td>
                        <td>
                          {dep.status !== 'sold-out' && (
                            <a href="/contact" className="med-book-btn">
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
          </div>
        </section>

        {/* ── Best Months Guide ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Best Time</span>
            </div>
            <h2 className="med-h2">Best Months <span>for {trek.trekName}</span></h2>
            <div className="med-card" style={{ padding: '1.5rem' }}>
              <p className="med-body">
                The ideal months for {trek.shortName} are <strong>{trek.bestMonths}</strong>. During these windows,
                trail conditions are optimal, weather is most predictable, and you will get the best mountain
                visibility. Departure batches are scheduled exclusively within these season windows to ensure
                the best possible experience.
              </p>
              <p className="med-body" style={{ marginBottom: 0 }}>
                <strong>Tip:</strong> Early-season and late-season departures often have more availability
                and occasionally lower prices. Mid-season batches (especially around holidays and long weekends)
                fill fastest.
              </p>
            </div>
          </div>
        </section>

        {/* ── Difficulty Guide ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Fitness</span>
            </div>
            <h2 className="med-h2">Difficulty &amp; <span>Fitness Guide</span></h2>
            <div className="med-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.4rem 1rem',
                    borderRadius: '999px',
                    background: trek.difficulty === 'Moderate' ? 'rgba(15,118,110,0.08)' : 'rgba(220,38,38,0.08)',
                    color: trek.difficulty === 'Moderate' ? '#0f766e' : '#991b1b',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  {trek.difficulty}
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.4rem 1rem',
                    borderRadius: '999px',
                    background: 'rgba(37,99,235,0.08)',
                    color: '#1e40af',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  Max altitude: {trek.altitude}
                </span>
              </div>
              <p className="med-body" style={{ marginBottom: 0 }}>{trek.difficultyGuide}</p>
            </div>
          </div>
        </section>

        {/* ── Quick Itinerary ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Itinerary</span>
            </div>
            <h2 className="med-h2">Quick <span>Itinerary</span></h2>
            <div className="med-card" style={{ padding: '1.5rem' }}>
              <ol style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.8,
                color: '#4b5259',
                paddingLeft: '1.2rem',
                margin: 0,
              }}>
                {trek.quickItinerary.map((day, i) => (
                  <li key={i} style={{ marginBottom: '0.3rem' }}>{day}</li>
                ))}
              </ol>
              <p className="med-body" style={{ marginTop: '1rem', marginBottom: 0, fontSize: '0.9rem', color: '#6b7280' }}>
                → <Link
                  href={`/treks/location/${trek.slug.includes('brahmatal') || trek.slug.includes('roopkund') ? 'lohajung' : 'joshimath'}/${trek.slug}`}
                  style={{ color: '#0f766e', textDecoration: 'underline' }}
                >
                  Read the full {trek.shortName} trek guide
                </Link> for detailed day-by-day itinerary, packing list, and trail conditions.
              </p>
            </div>
          </div>
        </section>

        {/* ── What's Included ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Inclusions</span>
            </div>
            <h2 className="med-h2">What is <span>Included</span></h2>
            <div className="med-card" style={{ padding: '1.5rem' }}>
              <ul style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.8,
                color: '#4b5259',
                paddingLeft: '1.2rem',
                margin: 0,
              }}>
                {trek.included.map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.2rem' }}>{item}</li>
                ))}
              </ul>
              <p className="med-body" style={{ marginTop: '1rem', marginBottom: 0, fontSize: '0.9rem', color: '#6b7280' }}>
                <strong>Not included:</strong> Travel to/from {trek.pickupPoint}, personal gear and clothing, travel insurance, tips.
              </p>
            </div>
          </div>
        </section>

        {/* ── Reserve CTA ── */}
        <section className="med-shell med-section-alt med-section-padding-sm">
          <div className="med-inner">
            <div className="med-cta-block">
              <h2 className="med-h2">Reserve Your Spot</h2>
              <p className="med-body">
                {openDepartures.length} departure{openDepartures.length !== 1 ? 's' : ''} available · Limited to {trek.departures[0]?.groupSize || 16} per batch · Free cancellation up to 15 days
              </p>
              <p className="med-price">
                From ₹{trek.basePrice.toLocaleString('en-IN')} per person
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="med-wa-btn"
                >
                  Book via WhatsApp
                </a>
              </div>
              <p className="med-small">
                Or use the inquiry form below
              </p>
            </div>
          </div>
        </section>

        {/* ── Primary CTA ── */}
        <PrimaryCTA
          label={`Inquire About ${trek.shortName} Departures`}
          subtext="Have questions? Need help choosing a batch? We respond within 2 hours."
          vertical="trek"
          category="departures"
          sourcePath={`/treks/${urlSlug}/departures`}
          location={trek.pickupPoint}
        />

        <FeaturedRetreat
          title={`${trek.trekName} — Book Your Departure`}
          description={`${trek.duration}, ${trek.difficulty}, max altitude ${trek.altitude}. Starts from ${trek.pickupPoint}. Best months: ${trek.bestMonths}.`}
          links={[
            { label: 'View Full Trek Guide', href: `/treks/location/${trek.slug.includes('brahmatal') || trek.slug.includes('roopkund') ? 'lohajung' : 'joshimath'}/${trek.slug}` },
            { label: 'See All Treks', href: '/treks/best-treks-in-uttarakhand' },
            { label: 'Fitness Guide', href: '/treks/garhwal-himalayas/fitness-guide' },
          ]}
        />

        {/* ── FAQ ── */}
        <section id="faq" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">FAQ</span>
            </div>
            <h2 className="med-h2">Frequently asked <span>questions</span></h2>

            {faqs.map((faq, i) => (
              <details key={i} className="med-faq-item" open={i === 0 ? true : undefined}>
                <summary className="med-question">
                  {faq.question}
                  <span className="med-faq-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </summary>
                <div className="med-answer">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'Full Trek Guide', href: `/treks/location/${trek.slug.includes('brahmatal') || trek.slug.includes('roopkund') ? 'lohajung' : 'joshimath'}/${trek.slug}` },
            { label: 'Best Treks in Uttarakhand', href: '/treks/best-treks-in-uttarakhand' },
            { label: 'Garhwal Himalayas Guide', href: '/treks/garhwal-himalayas' },
            { label: 'Trek Fitness Guide', href: '/treks/garhwal-himalayas/fitness-guide' },
          ]}
        />

        {/* ── Explore More ── */}
        <section className="med-shell med-section-alt med-section-padding">
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Explore More</span>
            </div>
            <h2 className="med-h2">Explore <span>More</span></h2>

            <div className="med-explore-grid">
              <Link
                href={`/treks/location/${trek.slug.includes('brahmatal') || trek.slug.includes('roopkund') ? 'lohajung' : 'joshimath'}/${trek.slug}`}
                className="med-explore-link"
              >
                Full {trek.shortName} Trek Guide <span className="med-arrow">→</span>
              </Link>
              <Link
                href="/treks/best-treks-in-uttarakhand"
                className="med-explore-link"
              >
                Best Treks in Uttarakhand <span className="med-arrow">→</span>
              </Link>
              <Link
                href="/treks/garhwal-himalayas"
                className="med-explore-link"
              >
                Garhwal Himalayas Guide <span className="med-arrow">→</span>
              </Link>
              <Link
                href="/treks/garhwal-himalayas/fitness-guide"
                className="med-explore-link"
              >
                Trek Fitness Guide <span className="med-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <div className="med-trek-footer">
          <Link href="/treks">All Treks</Link>
          <Link href="/treks/best-treks-in-uttarakhand">Best Treks in Uttarakhand</Link>
          <Link href="/treks/garhwal-himalayas">Garhwal Himalayas</Link>
          <Link href="/treks/location/sankri">Sankri Treks</Link>
          <Link href="/treks/location/lohajung">Lohajung Treks</Link>
        </div>

      </article>
    </TrackedPage>
  );
}
