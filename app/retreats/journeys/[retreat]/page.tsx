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
          <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
            <div className="med-outer">
              <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Your Facilitator</span>
                <span className="med-eyebrow-line" />
              </div>
              <h2 className="med-h2" style={{ textAlign: 'center' }}>
                Who guides your <span>practice</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 0.8fr) minmax(0, 1.4fr)', gap: '2rem', alignItems: 'center', maxWidth: '54rem', margin: '0 auto' }}>
                {facilitator.image && (
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', borderRadius: '18px', overflow: 'hidden', background: '#f7f9f7' }}>
                    <Image src={facilitator.image.src} alt={facilitator.image.alt} width={800} height={800} loading="lazy" quality={70} sizes="(max-width: 720px) 100vw, 320px" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div>
                  <p className="med-body" style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0f766e', marginBottom: '0.75rem' }}>
                    {facilitator.yearsExperience} years experience
                  </p>
                  <h3 className="med-h3" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.45rem)', fontWeight: 500 }}>{facilitator.name}</h3>
                  <p className="med-body" style={{ fontSize: '0.86rem', color: '#4b5259', marginBottom: '1rem' }}>
                    {facilitator.title}
                  </p>
                  <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                    {facilitator.approach}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {facilitator.specialisations.map((item) => (
                      <span key={item} className="med-season-tag" style={{ marginBottom: 0 }}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link href={`/facilitators/${facilitator.slug}`} className="med-cta-outline" style={{ display: 'inline-flex', padding: '0.7rem 1.8rem', fontSize: '0.72rem' }}>
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
        <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Also Available In</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>
              Yoga courses <span>beyond India</span>
            </h2>
            <p className="med-body" style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 2.5rem' }}>
              Sakshi also leads yoga teacher training courses and retreats in Thailand, Bali, and Nepal. Ask for dates and details.
            </p>

            <div className="med-grid-4">
              {[
                { location: 'Rishikesh, India', context: 'Yoga\'s birthplace. Retreats, TTC, and aerial yoga programs with Sakshi.', badge: 'Primary', text: 'Hi, I want details about Yoga Retreats and TTC in Rishikesh.' },
                { location: 'Thailand', context: 'Yoga teacher training in a tropical setting. Immersive multi-week format.', badge: 'TTC', text: 'Hi, I want details about Yoga Teacher Training in Thailand.' },
                { location: 'Bali, Indonesia', context: 'Yoga teacher training surrounded by rice terraces and temple culture.', badge: 'TTC', text: 'Hi, I want details about Yoga Teacher Training in Bali.' },
                { location: 'Nepal', context: 'Mountain yoga and teacher training near the Annapurna range.', badge: 'TTC', text: 'Hi, I want details about Yoga Teacher Training in Nepal.' },
              ].map((loc) => (
                <div key={loc.location} className="med-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 className="med-h3" style={{ fontSize: '1rem', marginBottom: 0 }}>{loc.location}</h3>
                    <span className="med-season-tag" style={{ marginBottom: 0 }}>{loc.badge}</span>
                  </div>
                  <p className="med-body" style={{ fontSize: '0.82rem', marginBottom: 0 }}>{loc.context}</p>
                  <a
                    href={`https://wa.me/919760446101?text=${encodeURIComponent(loc.text)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="med-cta-btn"
                    style={{ marginTop: 'auto', padding: '0.7rem 1rem', fontSize: '0.68rem', width: '100%' }}
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
          <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
            <div className="med-inner">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Compare</span>
              </div>
              <h2 className="med-h2">Compare This <span>Retreat</span></h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1.8rem' }}>
                {pairs.map((p) => (
                  <Link key={p.href} href={p.href} className="med-card" style={{ padding: '1rem 1.5rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>{p.label}</span>
                    <span style={{ color: '#0f766e', fontSize: '1.2rem' }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── PROGRAM PROFILE ── */}
      {RETREAT_SCORES[retreat] && (
        <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <div className="med-eyebrow">
                  <span className="med-eyebrow-line" />
                  <span className="med-eyebrow-text">Program Profile</span>
                </div>
                <h2 className="med-h2" style={{ marginBottom: '1rem' }}>
                  Program <span>Profile</span>
                </h2>
                <div style={{ width: '32px', height: '1px', background: '#0f766e', marginBottom: '1.5rem' }} />
                <p className="med-body" style={{ fontSize: '0.82rem', color: '#6b7280' }}>
                  Editorial scores across four dimensions. Higher values indicate greater emphasis, not quality.
                </p>
              </div>

              <div className="med-card" style={{ padding: '2rem' }}>
                <RetreatScorePanel scores={RETREAT_SCORES[retreat]!} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Common Questions</span>
          </div>
          <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
          <TrackedFAQ items={faqItems} page={journeyPath} />
        </div>
      </section>
    </TrackedPage>
  );
}