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

  // Review schema — only injected when real reviews exist
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
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.82rem',
              fontWeight: 300,
              color: '#374151',
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

<div style={{
  borderLeft: '2px solid rgba(15,118,110,0.3)',
  paddingLeft: '1rem',
  marginBottom: 'var(--space-lg)',
}}>
  <p style={{
    fontFamily: 'var(--font-geist-sans), sans-serif',
    fontSize: '0.82rem',
    fontWeight: 300,
    lineHeight: 1.8,
    color: '#595959',
    margin: 0,
  }}>
    For a broader understanding of retreat formats, seasonal considerations, and how mountain
    programs differ across regions, see our complete guide to{' '}
    <Link href="/retreats/himalayan-retreats" style={{
      color: '#374151',
      textDecoration: 'none',
      borderBottom: '1px solid rgba(15,118,110,0.25)',
    }}>
      Himalayan Retreats in India
    </Link>
    .
  </p>
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
          <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '5rem 0', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
            <style>{`
              .yoga-fac-grid {
                display: grid;
                grid-template-columns: minmax(220px, 0.8fr) minmax(0, 1.4fr);
                gap: 2rem;
                align-items: center;
                max-width: 54rem;
                margin: 0 auto;
              }
              .yoga-fac-image {
                position: relative;
                width: 100%;
                aspect-ratio: 1 / 1;
                border-radius: 12px;
                overflow: hidden;
                background: #eef0ee;
              }
              @media (max-width: 720px) {
                .yoga-fac-grid {
                  grid-template-columns: 1fr !important;
                  gap: 1.5rem !important;
                  max-width: 100% !important;
                }
                .yoga-fac-image {
                  max-width: 320px;
                  margin: 0 auto;
                }
              }
            `}</style>
            <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', justifyContent: 'center' }}>
                <span style={{ width: 24, height: 1, background: 'var(--color-primary)', display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151', fontWeight: 500 }}>Your Facilitator</span>
                <span style={{ width: 24, height: 1, background: 'var(--color-primary)', display: 'inline-block' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, margin: '0 0 2rem', textAlign: 'center' }}>
                Who guides your <span style={{ color: '#374151' }}>practice</span>
              </h2>
              <div className="yoga-fac-grid">
                {facilitator.image && (
                  <div className="yoga-fac-image">
                    <Image src={facilitator.image.src} alt={facilitator.image.alt} width={800} height={800} loading="lazy" quality={70} sizes="(max-width: 720px) 100vw, 320px" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#374151', margin: '0 0 0.75rem' }}>
                    {facilitator.yearsExperience} years experience
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.15rem, 2vw, 1.45rem)', fontWeight: 400, color: '#111', margin: '0 0 0.35rem', letterSpacing: '-0.02em' }}>
                    {facilitator.name}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.86rem', color: '#374151', fontWeight: 400, margin: '0 0 1rem' }}>
                    {facilitator.title}
                  </p>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', lineHeight: 1.85, color: '#555', fontWeight: 300, margin: '0 0 1.25rem' }}>
                    {facilitator.approach}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {facilitator.specialisations.map((item) => (
                      <span key={item} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#374151', border: '1px solid rgba(15,118,110,0.18)', borderRadius: '100px', padding: '0.35rem 0.7rem', background: '#f7f9f7' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link href={`/facilitators/${facilitator.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.7rem 1.8rem', border: '1px solid rgba(15,118,110,0.3)', color: 'var(--color-primary)', textDecoration: 'none', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.04em', borderRadius: '100px', transition: 'all 0.2s' }}>
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
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '5rem 0', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', justifyContent: 'center' }}>
              <span style={{ width: 24, height: 1, background: 'var(--color-primary)', display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151', fontWeight: 500 }}>Also Available In</span>
              <span style={{ width: 24, height: 1, background: 'var(--color-primary)', display: 'inline-block' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, margin: '0 0 0.75rem', textAlign: 'center' }}>
              Yoga courses <span style={{ color: '#374151' }}>beyond India</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', lineHeight: 1.85, color: '#555', fontWeight: 300, margin: '0 auto 2.5rem', textAlign: 'center', maxWidth: '40rem' }}>
              Sakshi also leads yoga teacher training courses and retreats in Thailand, Bali, and Nepal. Ask for dates and details.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
              {[
                { location: 'Rishikesh, India', context: 'Yoga\'s birthplace. Retreats, TTC, and aerial yoga programs with Sakshi.', badge: 'Primary', text: 'Hi, I want details about Yoga Retreats and TTC in Rishikesh.' },
                { location: 'Thailand', context: 'Yoga teacher training in a tropical setting. Immersive multi-week format.', badge: 'TTC', text: 'Hi, I want details about Yoga Teacher Training in Thailand.' },
                { location: 'Bali, Indonesia', context: 'Yoga teacher training surrounded by rice terraces and temple culture.', badge: 'TTC', text: 'Hi, I want details about Yoga Teacher Training in Bali.' },
                { location: 'Nepal', context: 'Mountain yoga and teacher training near the Annapurna range.', badge: 'TTC', text: 'Hi, I want details about Yoga Teacher Training in Nepal.' },
              ].map((loc) => (
                <div key={loc.location} style={{ background: '#ffffff', border: '1px solid #eef0ee', borderRadius: 10, padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1rem', fontWeight: 500, color: '#111', margin: 0, letterSpacing: '-0.01em' }}>
                      {loc.location}
                    </h3>
                    <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)', background: 'rgba(15,118,110,0.07)', borderRadius: '3px', padding: '3px 8px' }}>
                      {loc.badge}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', lineHeight: 1.7, color: '#666', fontWeight: 300, margin: 0 }}>
                    {loc.context}
                  </p>
                  <a
                    href={`https://wa.me/919760446101?text=${encodeURIComponent(loc.text)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto', padding: '0.72rem 1rem', borderRadius: '999px', background: 'var(--color-primary)', color: '#ffffff', textDecoration: 'none', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'transform 0.2s ease, background 0.2s ease' }}
                  >
                    Ask {loc.location.split(',')[0]} Dates →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Compare links — surfaces the comparison engine */}
{(() => {
  const others = getAllRetreatServices().filter((s) => s.slug !== retreat).slice(0, 3);
  if (others.length === 0) return null;
  const pairs = others.map((s) => {
    const [a, b] = retreat < s.slug ? [retreat, s.slug] : [s.slug, retreat];
    return { href: `/compare/${a}-vs-${b}`, label: `${retreatService.title} vs ${s.title}` };
  });
  return (
    <section className="rct-wrap">
      <style>{`
        .rct-wrap {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          background: #ffffff;
          padding: 5rem 0;
        }

        .rct-inner {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .rct-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .rct-eyebrow-line {
          width: 24px; height: 1px;
          background: var(--color-primary); 
          flex-shrink: 0;
        }

        .rct-h2 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #111111;
          line-height: 1.15;
          margin: 0 0 2rem;
        }
        .rct-h2-accent {
          color: #374151;
          font-weight: 200;
        }

        .rct-list {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .rct-item {
          position: relative;
          overflow: hidden;
          border: 1px solid #eef0ee;
          border-radius: 6px;
          background: #f7f9f7;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .rct-item::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--color-primary);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .rct-item:hover {
          border-color: rgba(15,118,110,0.3);
          box-shadow: 0 8px 24px rgba(0,0,0,0.07);
          transform: translateY(-2px);
        }
        .rct-item:hover::before {
          transform: scaleY(1);
        }

        .rct-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem 1rem 1.5rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          color: #374151;
          text-decoration: none;
          line-height: 1.5;
          transition: opacity 0.2s;
        }
        .rct-link:hover {  }

        .rct-arrow {
          font-size: 0.7rem;
          color: #374151;
          
          flex-shrink: 0;
          transition: opacity 0.2s, transform 0.2s;
        }
        .rct-item:hover .rct-arrow {
          
          transform: translateX(3px);
        }
      `}</style>

      <div className="rct-inner">

        <div className="rct-eyebrow">
          <span className="rct-eyebrow-line" />
        </div>

        <h2 className="rct-h2">
          Compare This{' '}
          <span className="rct-h2-accent">Retreat</span>
        </h2>

        <ul className="rct-list">
          {pairs.map((p) => (
            <li key={p.href} className="rct-item">
              <Link href={p.href} className="rct-link">
                {p.label}
                <span className="rct-arrow">→</span>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
})()}

      {RETREAT_SCORES[retreat] && (
  <section className="rps-wrap">
    <style>{`
      .rps-wrap {
        width: 100vw;
        margin-left: calc(-50vw + 50%);
        background: #f7f9f7;
        padding: 5rem 0;
        position: relative;
        overflow: hidden;
      }
      .rps-wrap::after {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(
          ellipse 50% 80% at 90% 50%,
          rgba(15,118,110,0.05) 0%,
          transparent 70%
        );
        pointer-events: none;
      }

      .rps-inner {
        max-width: 52rem;
        margin: 0 auto;
        padding: 0 2rem;
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: 1fr 1.1fr;
        gap: 4rem;
        align-items: center;
      }
      @media (max-width: 680px) {
        .rps-inner { grid-template-columns: 1fr; gap: 2.5rem; }
      }

      /* Left */
      .rps-left {}

      .rps-eyebrow {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }
      .rps-eyebrow-line {
        width: 24px; height: 1px;
        background: var(--color-primary); 
        flex-shrink: 0;
      }

      .rps-h2 {
        font-family: var(--font-geist-sans), sans-serif;
        font-size: clamp(1.4rem, 2.5vw, 1.85rem);
        font-weight: 200;
        letter-spacing: -0.03em;
        color: #111111;
        line-height: 1.15;
        margin: 0 0 1rem;
      }
      .rps-h2-accent {
        color: #374151;
        font-weight: 200;
      }

      .rps-sub {
        font-family: var(--font-geist-sans), sans-serif;
        font-size: 0.82rem;
        font-weight: 300;
        line-height: 1.8;
        color: #888888;
        margin: 0;
      }

      .rps-divider {
        width: 32px; height: 1px;
        background: var(--color-primary);
        
        margin: 1.5rem 0;
      }

      /* Right */
      .rps-right {
        background: #ffffff;
        border: 1px solid #e8edea;
        border-radius: 12px;
        padding: 2rem 2rem;
        box-shadow:
          0 2px 8px rgba(0,0,0,0.04),
          0 8px 28px rgba(15,118,110,0.06);
        position: relative;
        overflow: hidden;
      }
      .rps-right::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 2px;
        background: linear-gradient(
          90deg,
          var(--color-primary),
          rgba(15,118,110,0.2)
        );
      }
    `}</style>

    <div className="rps-inner">

      {/* Left — heading + sub */}
      <div className="rps-left">
        <div className="rps-eyebrow">
          <span className="rps-eyebrow-line" />
        </div>
        <h2 className="rps-h2">
          Program{' '}
          <span className="rps-h2-accent">Profile</span>
        </h2>
        <div className="rps-divider" />
        <p className="rps-sub">
          Editorial scores across four dimensions. Higher values indicate greater emphasis, not quality.
        </p>
      </div>

      {/* Right — score panel */}
      <div className="rps-right">
        <RetreatScorePanel scores={RETREAT_SCORES[retreat]!} />
      </div>

    </div>
  </section>
)}

<section className="rfaq-wrap">
  <style>{`
    .rfaq-wrap {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #ffffff;
      padding: 5rem 0;
    }

    .rfaq-inner {
      max-width: 52rem;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .rfaq-eyebrow {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    .rfaq-eyebrow-line {
      width: 24px; height: 1px;
      background: var(--color-primary); 
      flex-shrink: 0;
    }

    .rfaq-h2 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.4rem, 2.5vw, 1.85rem);
      font-weight: 200;
      letter-spacing: -0.03em;
      color: #111111;
      line-height: 1.15;
      margin: 0 0 2.5rem;
    }
    .rfaq-h2-accent {
      color: #374151;
      font-weight: 200;
    }
  `}</style>

  <div className="rfaq-inner">
    <div className="rfaq-eyebrow">
      <span className="rfaq-eyebrow-line" />
    </div>

    <h2 className="rfaq-h2">
      Frequently Asked{' '}
      <span className="rfaq-h2-accent">Questions</span>
    </h2>

    <TrackedFAQ items={faqItems} page={journeyPath} />
  </div>
</section>
    </TrackedPage>
  );
}
