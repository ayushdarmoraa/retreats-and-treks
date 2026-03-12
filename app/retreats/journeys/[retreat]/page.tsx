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
  generateReviewSchemas,
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

  return {
    title: `${retreatService.title} – Himalayan Retreat`,
    description: retreatService.oneLineEssence,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RetreatDetailPage({ params }: PageProps) {
  const { retreat } = await params;
  const retreatService = getRetreatServiceBySlug(retreat);

  if (!retreatService) {
    return (
      <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
        <h1>Retreat not found</h1>
        <Link href="/retreats" style={{ color: 'var(--color-primary)' }}>
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

  const faqItems = [
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
  const reviewSchemas = reviews.length > 0
    ? generateReviewSchemas(reviews, retreatService.title, canonicalUrl)
    : [];
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
      {reviewSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

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
              color: 'var(--color-primary)',
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
    color: '#777777',
    margin: 0,
  }}>
    For a broader understanding of retreat formats, seasonal considerations, and how mountain
    programs differ across regions, see our complete guide to{' '}
    <Link href="/retreats/himalayan-retreats" style={{
      color: 'var(--color-primary)',
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
      />

      <RelatedRetreats currentSlug={retreat} />

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
          background: var(--color-primary); opacity: 0.5;
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
          color: var(--color-primary);
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
          color: var(--color-primary);
          text-decoration: none;
          line-height: 1.5;
          transition: opacity 0.2s;
        }
        .rct-link:hover { opacity: 0.8; }

        .rct-arrow {
          font-size: 0.7rem;
          color: var(--color-primary);
          opacity: 0.35;
          flex-shrink: 0;
          transition: opacity 0.2s, transform 0.2s;
        }
        .rct-item:hover .rct-arrow {
          opacity: 0.9;
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
        background: var(--color-primary); opacity: 0.5;
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
        color: var(--color-primary);
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
        opacity: 0.2;
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
      background: var(--color-primary); opacity: 0.5;
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
      color: var(--color-primary);
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
