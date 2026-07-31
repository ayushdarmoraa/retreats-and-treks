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
import Image from 'next/image';
import { getFacilitatorsByRetreat } from '@/config/facilitators';
import type { LocationId } from '@/config/locations';
import { SectionHeading } from '@/components/ui';
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

  const customSeoTitle = 'seoTitle' in retreatService ? (retreatService as Record<string, unknown>).seoTitle as string | undefined : undefined;
  const customSeoDesc = 'seoDescription' in retreatService ? (retreatService as Record<string, unknown>).seoDescription as string | undefined : undefined;
  const seoDescription = customSeoDesc ?? `${retreatService.oneLineEssence} Join this curated retreat in the Indian Himalayas. Small groups, no experience needed.`;

  const heroImage = 'heroImage' in retreatService ? (retreatService as Record<string, unknown>).heroImage as string | undefined : undefined;

  return {
    title: customSeoTitle ?? `${retreatService.title} in the Himalayas – Retreats And Treks`,
    description: seoDescription.length > 160 ? seoDescription.slice(0, 157) + '...' : seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    ...(heroImage ? {
      openGraph: {
        title: `${retreatService.title} in the Himalayas`,
        description: retreatService.oneLineEssence,
        url: canonicalUrl,
        type: 'website',
        siteName: 'Retreats And Treks',
        locale: 'en_IN',
        images: [{ url: heroImage, width: 1200, height: 630, alt: `${retreatService.title} retreat in the Himalayas` }],
      },
    } : {}),
  };
}

export default async function RetreatDetailPage({ params }: PageProps) {
  const { retreat } = await params;
  const retreatService = getRetreatServiceBySlug(retreat);

  if (!retreatService) {
    return (
      <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
        <h1>Retreat not found</h1>
        <Link href="/retreats" style={{ color: '#374151' }}>
          ← Back to all retreats
        </Link>
      </main>
    );
  }

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

  const faqItems = 'faqItems' in retreatService && Array.isArray((retreatService as Record<string, unknown>).faqItems)
    ? (retreatService as unknown as { faqItems: { question: string; answer: string }[] }).faqItems
    : [
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

  const reviews = getReviewsForSlug(retreat);
  const aggregateRating = getAggregateRating(retreat);
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
    <TrackedPage page={journeyPath} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
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

      <div className="med-shell" style={{ background: '#ffffff', padding: '1.5rem 0 0' }}>
        <div className="med-inner">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Retreats', href: '/retreats' },
              ...(retreat === 'art-and-creative' ? [{ name: 'Art Retreats', href: '/retreats/art' }] : []),
              { name: retreatService.title },
            ]}
          />

          {retreat === 'art-and-creative' && (
            <div style={{ paddingTop: '1rem' }}>
              <Link
                href="/retreats/art"
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.82rem',
                  fontWeight: 400,
                  color: '#0f766e',
                  textDecoration: 'none',
                }}
              >
                ← Back to Art Retreats
              </Link>
            </div>
          )}

          {aggregateRating && (
            <div style={{ marginBottom: '1rem', paddingTop: '2rem' }}>
              <RatingBadge
                rating={{ value: aggregateRating.ratingValue, count: aggregateRating.reviewCount }}
                variant="standard"
              />
            </div>
          )}

          <div className="med-card" style={{ padding: '1rem 1.5rem', marginBottom: '2rem' }}>
            <p className="med-body" style={{ fontSize: '0.82rem', marginBottom: 0 }}>
              For a broader understanding of retreat formats, seasonal considerations, and how mountain
              programs differ across regions, see our complete guide to{' '}
              <Link href="/retreats/himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                Himalayan Retreats in India
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <RetreatJourneyClient
        retreat={retreatService}
        locations={compatibleLocations}
        suggestedTrek={suggestedTrek}
        retreatSlug={retreat}
      />

      <RelatedRetreats currentSlug={retreat} />

     {/* ── FACILITATOR SECTION — yoga-and-movement only ── */}
{retreat === 'yoga-and-movement' && (() => {
  const facilitator = getFacilitatorsByRetreat('yoga-and-movement')[0];
  if (!facilitator) return null;
  return (
    <section className="med-shell" style={{ background: '#ffffff', padding: 'clamp(2.5rem, 6vw, 4.5rem) 0', borderTop: '1px solid rgba(15,118,110,0.08)', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
      <style>{`
        /* ── FACILITATOR STYLES ── */
        .facilitator-outer {
          max-width: 76rem;
          margin: 0 auto;
          padding: 0 clamp(1rem, 4vw, 2.5rem);
        }

        .facilitator-grid {
          display: grid;
          grid-template-columns: minmax(220px, 0.8fr) minmax(0, 1.4fr);
          gap: 2rem;
          align-items: center;
          max-width: 54rem;
          margin: 2rem auto 0;
        }

        .facilitator-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 18px;
          overflow: hidden;
          background: #f7f9f7;
        }

        .facilitator-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .facilitator-experience {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0f766e;
          margin-bottom: 0.75rem;
        }

        .facilitator-name {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          font-size: clamp(1.15rem, 2vw, 1.45rem);
          font-weight: 500;
          color: #1a1a1a;
          margin: 0 0 0.5rem;
          line-height: 1.2;
        }

        .facilitator-title {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 0.86rem;
          font-weight: 400;
          color: #4b5259;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .facilitator-approach {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.8;
          color: #6b7280;
          margin-bottom: 1.25rem;
          letter-spacing: 0.01em;
        }

        .facilitator-specialisations {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .facilitator-tag {
          display: inline-block;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0f766e;
          background: rgba(15, 118, 110, 0.08);
          padding: 0.32rem 0.7rem;
          border-radius: 999px;
          margin-bottom: 0;
        }

        .facilitator-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.7rem 1.8rem;
          border: 1px solid rgba(15, 118, 110, 0.25);
          color: #0f766e;
          text-decoration: none;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border-radius: 999px;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .facilitator-cta:hover {
          border-color: #0f766e;
          background: rgba(15, 118, 110, 0.05);
          transform: translateY(-2px);
        }

        /* ── MOBILE RESPONSIVE ── */
        @media (max-width: 720px) {
          .facilitator-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            max-width: 100% !important;
          }

          .facilitator-image-wrap {
            max-width: 280px !important;
            margin: 0 auto !important;
          }

          .facilitator-name {
            text-align: center !important;
          }

          .facilitator-experience {
            text-align: center !important;
          }

          .facilitator-title {
            text-align: center !important;
          }

          .facilitator-approach {
            text-align: center !important;
          }

          .facilitator-specialisations {
            justify-content: center !important;
          }

          .facilitator-cta {
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
          }
        }

        @media (max-width: 480px) {
          .facilitator-image-wrap {
            max-width: 220px !important;
          }

          .facilitator-name {
            font-size: 1.1rem !important;
          }

          .facilitator-title {
            font-size: 0.8rem !important;
          }

          .facilitator-approach {
            font-size: 0.82rem !important;
          }

          .facilitator-cta {
            font-size: 0.68rem !important;
            padding: 0.6rem 1.5rem !important;
          }
        }
      `}</style>

      <div className="facilitator-outer">
        {/* ── USING SECTION HEADING ── */}
        <SectionHeading
          eyebrow="Your Facilitator"
          title="Who guides your practice"
          description="Learn about the experienced facilitator who will guide your yoga and movement journey."
        />

        <div className="facilitator-grid">
          {facilitator.image && (
            <div className="facilitator-image-wrap">
              <Image 
                src={facilitator.image.src} 
                alt={facilitator.image.alt} 
                width={800} 
                height={800} 
                loading="lazy" 
                quality={70} 
                sizes="(max-width: 720px) 100vw, 320px" 
                className="facilitator-image" 
              />
            </div>
          )}
          <div>
            <p className="facilitator-experience">
              {facilitator.yearsExperience} years experience
            </p>
            <h3 className="facilitator-name">{facilitator.name}</h3>
            <p className="facilitator-title">
              {facilitator.title}
            </p>
            <p className="facilitator-approach">
              {facilitator.approach}
            </p>
            <div className="facilitator-specialisations">
              {facilitator.specialisations.map((item) => (
                <span key={item} className="facilitator-tag">
                  {item}
                </span>
              ))}
            </div>
            <Link href={`/facilitators/${facilitator.slug}`} className="facilitator-cta">
              Meet {facilitator.name.split(' ')[0]} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
})()}

     {/* ── ALSO AVAILABLE IN — yoga international locations ── */}
{retreat === 'yoga-and-movement' && (
  <section className="med-shell" style={{ background: '#f7f9f7', padding: 'clamp(2.5rem, 6vw, 4.5rem) 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
    <style>{`
      /* ── ALSO AVAILABLE STYLES ── */
      .also-outer {
        max-width: 76rem;
        margin: 0 auto;
        padding: 0 clamp(1rem, 4vw, 2.5rem);
      }

      .also-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 1.4rem;
        margin-top: 2rem;
      }

      .also-card {
        background: #ffffff;
        border: 1px solid rgba(15, 118, 110, 0.12);
        border-radius: 18px;
        box-shadow: 0 10px 30px rgba(15, 31, 28, 0.05);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .also-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: #0f766e;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 2;
      }

      .also-card:hover {
        transform: translateY(-6px);
        border-color: rgba(15, 118, 110, 0.28);
        box-shadow: 0 22px 48px rgba(15, 31, 28, 0.12);
      }

      .also-card:hover::before {
        transform: scaleX(1);
      }

      .also-card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .also-card-location {
        font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
        font-size: 1rem;
        font-weight: 500;
        color: #1a1a1a;
        margin: 0;
        line-height: 1.2;
      }

      .also-card-badge {
        display: inline-block;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 0.55rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #0f766e;
        background: rgba(15, 118, 110, 0.08);
        padding: 0.25rem 0.6rem;
        border-radius: 999px;
        margin-bottom: 0;
        flex-shrink: 0;
      }

      .also-card-context {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 0.82rem;
        font-weight: 300;
        line-height: 1.7;
        color: #6b7280;
        margin: 0;
        letter-spacing: 0.01em;
      }

      .also-card-cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.7rem 1rem;
        background: #0f766e;
        color: white;
        text-decoration: none;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 0.68rem;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        border-radius: 999px;
        box-shadow: 0 10px 26px rgba(15, 118, 110, 0.25);
        transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        border: 1px solid #0f766e;
        width: 100%;
        margin-top: auto;
      }

      .also-card-cta:hover {
        background: #0d6b64;
        transform: translateY(-3px);
        box-shadow: 0 16px 36px rgba(15, 118, 110, 0.32);
      }

      /* ── MOBILE RESPONSIVE ── */
      @media (max-width: 960px) {
        .also-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }
      }

      @media (max-width: 640px) {
        .also-grid {
          grid-template-columns: 1fr !important;
          gap: 1rem !important;
        }

        .also-card {
          padding: 1.25rem !important;
        }

        .also-card-location {
          font-size: 0.95rem !important;
        }

        .also-card-context {
          font-size: 0.8rem !important;
        }

        .also-card-cta {
          font-size: 0.65rem !important;
          padding: 0.6rem 0.8rem !important;
        }
      }

      @media (max-width: 480px) {
        .also-outer {
          padding: 0 1rem !important;
        }

        .also-card {
          padding: 1rem !important;
        }
      }
    `}</style>

    <div className="also-outer">
      <SectionHeading
        eyebrow="Also Available In"
        title="Yoga courses beyond India"
        description="Sakshi also leads yoga teacher training courses and retreats in Thailand, Bali, and Nepal. Ask for dates and details."
      />

      <div className="also-grid">
        {[
          { location: 'Rishikesh, India', context: "Yoga's birthplace. Retreats, TTC, and aerial yoga programs with Sakshi.", badge: 'Primary', text: 'Hi, I want details about Yoga Retreats and TTC in Rishikesh.' },
          { location: 'Thailand', context: 'Yoga teacher training in a tropical setting. Immersive multi-week format.', badge: 'TTC', text: 'Hi, I want details about Yoga Teacher Training in Thailand.' },
          { location: 'Bali, Indonesia', context: 'Yoga teacher training surrounded by rice terraces and temple culture.', badge: 'TTC', text: 'Hi, I want details about Yoga Teacher Training in Bali.' },
          { location: 'Nepal', context: 'Mountain yoga and teacher training near the Annapurna range.', badge: 'TTC', text: 'Hi, I want details about Yoga Teacher Training in Nepal.' },
        ].map((loc) => (
          <div key={loc.location} className="also-card">
            <div className="also-card-header">
              <h3 className="also-card-location">{loc.location}</h3>
              <span className="also-card-badge">{loc.badge}</span>
            </div>
            <p className="also-card-context">{loc.context}</p>
            <a
              href={`https://wa.me/919760446101?text=${encodeURIComponent(loc.text)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="also-card-cta"
            >
              Ask {loc.location.split(',')[0]} Dates →
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
)}
    {/* Compare links */}
{(() => {
  const others = getAllRetreatServices().filter((s) => s.slug !== retreat).slice(0, 3);
  if (others.length === 0) return null;
  const pairs = others.map((s) => {
    const [a, b] = retreat < s.slug ? [retreat, s.slug] : [s.slug, retreat];
    return { href: `/compare/${a}-vs-${b}`, label: `${retreatService.title} vs ${s.title}` };
  });
  return (
    <section className="med-shell" style={{ background: '#f7f9f7', padding: 'clamp(2.5rem, 6vw, 4.5rem) 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
      <style>{`
        /* ── COMPARE STYLES ── */
        .compare-wrapper {
          max-width: 46rem;
          margin: 0 auto;
          padding: 0 clamp(1rem, 4vw, 2.5rem);
        }

        /* ── COMPARE BOX ── */
        .compare-box {
          background: #ffffff;
          border: 1px solid rgba(15, 118, 110, 0.12);
          border-radius: 14px;
          box-shadow: 0 6px 18px rgba(15, 31, 28, 0.05);
          padding: 1.2rem 1.5rem;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .compare-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 34px rgba(15, 31, 28, 0.1);
          border-color: rgba(15, 118, 110, 0.28);
        }

        .compare-box:hover .compare-arrow {
          transform: translateX(6px);
          color: #0f766e;
        }

        .compare-label {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: clamp(0.85rem, 0.95vw, 0.95rem);
          font-weight: 400;
          color: #1a1a1a;
          margin: 0;
          letter-spacing: 0.01em;
          line-height: 1.4;
        }

        .compare-arrow {
          color: #9ca3af;
          font-size: 1.15rem;
          flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s ease;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .compare-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: left;
          margin-top: 2rem;
        }

        /* ── MOBILE RESPONSIVE ── */
        @media (max-width: 640px) {
          .compare-box {
            padding: 1rem 1.2rem !important;
          }

          .compare-label {
            font-size: 0.82rem !important;
          }

          .compare-list {
            gap: 0.8rem !important;
          }
        }

        @media (max-width: 480px) {
          .compare-wrapper {
            padding: 0 1rem !important;
          }

          .compare-box {
            padding: 0.8rem 1rem !important;
            border-radius: 12px !important;
          }

          .compare-label {
            font-size: 0.78rem !important;
          }

          .compare-arrow {
            font-size: 1rem !important;
          }
        }
      `}</style>

      <div className="compare-wrapper">
        <SectionHeading
          eyebrow="Compare"
          title="Compare This Retreat"
          description="See how this retreat compares to other similar offerings."
        />

        <div className="compare-list">
          {pairs.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="compare-box"
            >
              <span className="compare-label">{p.label}</span>
              <span className="compare-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
})()}
{/* ── PROGRAM PROFILE ── */}
{RETREAT_SCORES[retreat] && (
  <section 
    className="med-shell" 
    style={{ 
      background: '#f7f9f7', 
      padding: 'clamp(3rem, 8vw, 5.5rem) 0', 
      borderBottom: '1px solid rgba(15,118,110,0.08)' 
    }}
  >
    <style>{`
      /* ── PROGRAM PROFILE STYLES ── */
      .profile-wrapper {
        padding: 0 clamp(15px, 5vw, 50px);
        width: 100%;
      }

      .profile-grid {
        display: grid;
        grid-template-columns: 1fr 1.1fr;
        gap: clamp(2rem, 4vw, 4rem);
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }

      /* ── DESCRIPTION ── */
      .profile-description {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: clamp(0.82rem, 0.95vw, 0.92rem);
        font-weight: 300;
        line-height: 1.8;
        color: #6b7280;
        margin: 0;
        max-width: 90%;
        letter-spacing: 0.01em;
      }

      .profile-description strong {
        color: #374151;
        font-weight: 400;
      }

      /* ── CARD ── */
      .profile-card {
        padding: clamp(1.5rem, 2.5vw, 2.8rem);
        width: 100%;
        max-width: 32rem;
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 4px 32px rgba(15, 118, 110, 0.06);
        border: 1px solid rgba(15, 118, 110, 0.06);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .profile-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 48px rgba(15, 118, 110, 0.10);
      }

      /* ── MOBILE RESPONSIVE ── */
      @media (max-width: 968px) {
        .profile-grid {
          grid-template-columns: 1fr !important;
          gap: 2.5rem !important;
          text-align: center !important;
        }

        .profile-description {
          max-width: 100% !important;
          text-align: center !important;
        }

        .profile-card {
          max-width: 100% !important;
          margin: 0 auto;
        }
      }

      @media (max-width: 640px) {
        .profile-wrapper {
          padding: 0 20px !important;
        }

        .profile-card {
          padding: 1.5rem !important;
        }

        .profile-description {
          font-size: 0.82rem !important;
          line-height: 1.7 !important;
        }
      }

      @media (max-width: 480px) {
        .profile-wrapper {
          padding: 0 15px !important;
        }

        .profile-card {
          padding: 1.25rem !important;
        }
      }
    `}</style>

    <div className="profile-wrapper">
      <div className="profile-grid">
        {/* LEFT */}
        <div>
          <SectionHeading
            eyebrow="Program Profile"
            title="Program Profile"
            description="Editorial scores across four dimensions. Higher values indicate greater emphasis, not quality."
          />
        </div>

        {/* RIGHT */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
          <div className="profile-card">
            <RetreatScorePanel scores={RETREAT_SCORES[retreat]!} />
          </div>
        </div>
      </div>
    </div>
  </section>
)}
      {/* ── FAQ ── */}
<section className="med-shell" style={{ background: '#ffffff', padding: 'clamp(2.5rem, 6vw, 4.5rem) 0' }}>
  <style>{`
    /* ── FAQ STYLES ── */
    .faq-inner {
      max-width: 58rem;
      margin: 0 auto;
      padding: 0 clamp(1rem, 4vw, 2.5rem);
    }

    /* ── FAQ ITEMS ── */
    .faq-details {
      border-bottom: 1px solid rgba(15, 118, 110, 0.08);
    }

    .faq-details[open] .faq-question {
      color: #0f766e;
    }

    .faq-details[open] .faq-icon {
      border-color: #0f766e;
      background: rgba(15, 118, 110, 0.06);
    }

    .faq-summary::-webkit-details-marker {
      display: none;
    }
    .faq-summary {
      list-style: none;
    }

    .faq-details summary .faq-icon::after {
      content: '+';
    }
    .faq-details[open] summary .faq-icon::after {
      content: '−';
    }

    .faq-question {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: clamp(0.88rem, 1vw, 0.95rem);
      font-weight: 400;
      color: #1a1a1a;
      letter-spacing: 0.01em;
      line-height: 1.6;
      transition: color 0.2s ease;
    }

    .faq-answer {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: clamp(0.82rem, 0.9vw, 0.88rem);
      font-weight: 300;
      line-height: 1.85;
      color: #6b7280;
      margin: 0 0 1.25rem;
      padding-right: 2rem;
      letter-spacing: 0.01em;
    }

    .faq-icon {
      flex-shrink: 0;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 1.5px solid rgba(15, 118, 110, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      color: #0f766e;
      line-height: 1;
      user-select: none;
      margin-top: 2px;
      transition: background 0.2s ease, border-color 0.2s ease;
      font-weight: 300;
    }

    .faq-summary-style {
      cursor: pointer;
      padding: 1.1rem 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      transition: color 0.2s ease;
    }

    /* ── MOBILE RESPONSIVE ── */
    @media (max-width: 640px) {
      .faq-summary-style {
        padding: 0.9rem 0 !important;
      }

      .faq-question {
        font-size: 0.85rem !important;
      }

      .faq-answer {
        font-size: 0.8rem !important;
        padding-right: 0 !important;
        margin-bottom: 1rem !important;
      }

      .faq-icon {
        width: 20px !important;
        height: 20px !important;
        font-size: 0.7rem !important;
      }
    }

    @media (max-width: 480px) {
      .faq-inner {
        padding: 0 1rem !important;
      }

      .faq-question {
        font-size: 0.82rem !important;
      }

      .faq-answer {
        font-size: 0.78rem !important;
      }

      .faq-summary-style {
        padding: 0.8rem 0 !important;
      }
    }
  `}</style>

  <div className="faq-inner">
    <SectionHeading
      eyebrow="Common Questions"
      title="Frequently Asked Questions"
    />
    <TrackedFAQ items={faqItems} page={journeyPath} />
  </div>
</section>
    </TrackedPage>
  );
}