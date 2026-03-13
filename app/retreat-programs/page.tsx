import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateCollectionPageSchema, generateBreadcrumbSchema, generateItemListSchema } from '@/components/seo/Schema';
import { getAllRetreatServices } from '@/content/retreats/services';
import { RETREAT_DURATION_GROUP } from '@/config/retreatDurations';
import { RETREAT_MATRIX_META } from '@/config/retreatMatrix';
import { RETREAT_SCORES } from '@/config/retreatScores';
import { getAggregateRating } from '@/content/reviews';
import ProgramMatrixTable, { type MatrixRow } from '@/components/ProgramMatrixTable';
import Breadcrumb from '@/components/Breadcrumb';

const PATH = '/retreat-programs';

export function generateMetadata(): Metadata {
  return {
    title: 'All Himalayan Retreat Programs — Compare by Duration, Format & Intensity | Retreats And Treks',
    description:
      'Compare all structured Himalayan retreat programs side by side. Filter and sort by duration, location, intensity, and format to find the retreat that matches your needs.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'All Himalayan Retreat Programs — Compare & Choose | Retreats And Treks',
      description:
        'A complete matrix of structured retreat programs in the Indian Himalayas. Filter by duration, intensity, and format.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('All Himalayan Retreat Programs — Compare & Choose | Retreats And Treks'),
    },
  };
}

export default function RetreatProgramsPage() {
  const services = getAllRetreatServices();
  const canonicalUrl = buildCanonicalUrl(PATH);

  const rows: MatrixRow[] = services.map((s) => {
    const meta = RETREAT_MATRIX_META[s.slug];
    return {
      slug: s.slug,
      title: s.title,
      duration: RETREAT_DURATION_GROUP[s.slug] ?? 'flexible',
      primaryLocation: s.whereItWorksBest.primary,
      intensity: meta?.intensity ?? 'medium',
      format: meta?.format ?? 'hybrid',
      bestFor: meta?.bestFor ?? s.oneLineEssence,
      scores: RETREAT_SCORES[s.slug],
      rating: (() => { const r = getAggregateRating(s.slug); return r ? { value: r.ratingValue, count: r.reviewCount } : undefined; })(),
    };
  });

  const collectionSchema = generateCollectionPageSchema({
    name: 'Himalayan Retreat Programs',
    description:
      'A complete collection of structured retreat programs in the Indian Himalayas, covering rest, yoga, meditation, creative, sound healing, and custom formats.',
    url: canonicalUrl,
  });

  const itemListSchema = generateItemListSchema(
    services.map((s) => ({
      name: s.title,
      url: buildCanonicalUrl(`/retreats/journeys/${s.slug}`),
    })),
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Himalayan Retreats', url: buildCanonicalUrl('/retreats/himalayan-retreats') },
    { name: 'All Retreat Programs', url: canonicalUrl },
  ]);

  return (
    <main className="rpm-main">
      <style>{`
        .rpm-main {
          max-width: 72rem;
          margin: 0 auto;
          padding: var(--space-lg) var(--space-md);
        }

        /* Hero */
        .rpm-hero {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          background: #f7f9f7;
          padding: 5rem 0;
          margin-bottom: var(--space-xl);
          position: relative;
          overflow: hidden;
        }
        .rpm-hero::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(15,118,110,0.5) 30%,
            rgba(15,118,110,0.5) 70%,
            transparent
          );
        }
        .rpm-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(15,118,110,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .rpm-hero-inner {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 var(--space-md);
          position: relative;
          z-index: 1;
        }

        .rpm-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .rpm-eyebrow-line {
          width: 24px; height: 1px;
          background: var(--color-primary); opacity: 0.5;
          flex-shrink: 0;
        }

        .rpm-h1 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(1.75rem, 3.8vw, 2.65rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #111111;
          line-height: 1.15;
          margin: 0 0 0.75rem;
        }
        .rpm-h1-accent {
          color: var(--color-primary);
          font-weight: 200;
        }

        .rpm-rule {
          width: 36px; height: 1px;
          background: var(--color-primary);
          opacity: 0.22;
          margin: 1.75rem 0;
        }

        .rpm-sub {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.8;
          color: #555555;
          margin: 0;
          max-width: 48rem;
        }

        /* Sections */
        .rpm-section {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          padding: 5rem 0;
        }
        .rpm-section-inner {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 var(--space-md);
        }
        .rpm-section-white { background: #ffffff; }
        .rpm-section-tint  { background: #f7f9f7; }

        .rpm-h2 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #111111;
          line-height: 1.15;
          margin: 0 0 2rem;
        }
        .rpm-h2-accent { color: var(--color-primary); font-weight: 200; }

        /* Link lists */
        .rpm-linklist {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .rpm-linklist li {
          position: relative;
          border: 1px solid #eef0ee;
          border-radius: 6px;
          background: #ffffff;
          overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .rpm-section-white .rpm-linklist li {
          background: #f7f9f7;
        }
        .rpm-linklist li::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--color-primary);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .rpm-linklist li:hover {
          border-color: rgba(15,118,110,0.3);
          box-shadow: 0 4px 16px rgba(15,118,110,0.07);
          transform: translateY(-2px);
        }
        .rpm-linklist li:hover::before { transform: scaleY(1); }

        .rpm-linklist a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.1rem 0.85rem 1.35rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          color: #2563eb;
          text-decoration: none;
          line-height: 1.5;
          transition: color 0.2s;
        }
        .rpm-linklist a:hover { color: var(--color-primary); }
        .rpm-linklist-arrow {
          font-size: 0.7rem;
          color: var(--color-primary);
          opacity: 0.3;
          flex-shrink: 0;
          transition: opacity 0.2s, transform 0.2s;
        }
        .rpm-linklist li:hover .rpm-linklist-arrow {
          opacity: 0.9;
          transform: translateX(3px);
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <div className="rpm-hero">
        <div className="rpm-hero-inner">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Himalayan Retreats', href: '/retreats/himalayan-retreats' },
              { name: 'All Programs' },
            ]}
          />
          <div className="rpm-eyebrow">
            <span className="rpm-eyebrow-line" />
          </div>
          <h1 className="rpm-h1">
            All Retreat{' '}
            <span className="rpm-h1-accent">Programs</span>
          </h1>
          <div className="rpm-rule" />
          <p className="rpm-sub">
            A complete overview of all structured retreat programs available through Retreats And Treks.
            Sort by duration, location, or intensity, and filter to find the program that matches your
            current need.
          </p>
        </div>
      </div>

      {/* Matrix table */}
      <ProgramMatrixTable rows={rows} fromPath={PATH} />

      {/* Popular Comparisons */}
<style>{`
  .rpm-cmp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: rgba(15,118,110,0.08);
    border: 1px solid rgba(15,118,110,0.08);
    margin-top: 2rem;
  }
  @media (max-width: 640px) {
    .rpm-cmp-grid { grid-template-columns: 1fr; }
  }
  .rpm-cmp-item {
    background: #f7f9f7;
    position: relative;
    overflow: hidden;
    transition: background 0.25s;
  }
  .rpm-cmp-item::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--color-primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
  }
  .rpm-cmp-item:hover { background: #ffffff; }
  .rpm-cmp-item:hover::before { transform: scaleX(1); }
  .rpm-cmp-item a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1.75rem;
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.88rem;
    font-weight: 300;
    color: #222222;
    text-decoration: none;
    gap: 1rem;
    transition: color 0.2s;
  }
  .rpm-cmp-item:hover a { color: var(--color-primary); }
  .rpm-cmp-num {
    font-size: 0.56rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    color: var(--color-primary);
    opacity: 0.4;
    display: block;
    margin-bottom: 0.35rem;
  }
  .rpm-cmp-arrow {
    font-size: 0.7rem;
    color: var(--color-primary);
    opacity: 0.3;
    flex-shrink: 0;
    transition: opacity 0.2s, transform 0.2s;
  }
  .rpm-cmp-item:hover .rpm-cmp-arrow {
    opacity: 1;
    transform: translateX(4px);
  }
`}</style>

<section className="rpm-section rpm-section-tint">
  <div className="rpm-section-inner">

    <div className="rpm-eyebrow">
      <span className="rpm-eyebrow-line" />
    </div>

    <h2 className="rpm-h2">
      Popular{' '}
      <span className="rpm-h2-accent">Comparisons</span>
    </h2>

    <div className="rpm-cmp-grid">
      {[
        { href: '/compare/burnout-recovery-vs-rest-and-reset', label: 'Burnout Recovery vs Rest & Reset' },
        { href: '/compare/meditation-and-silence-vs-yoga-and-movement', label: 'Meditation & Silence vs Yoga & Movement' },
        { href: '/compare/sound-healing-vs-weekend-retreat', label: 'Sound Healing vs Weekend Retreat' },
        { href: '/compare/art-and-creative-vs-burnout-recovery', label: 'Art & Creative vs Burnout Recovery' },
      ].map((item, i) => (
        <div key={item.href} className="rpm-cmp-item">
          <Link href={item.href}>
            <span>
              <span className="rpm-cmp-num">0{i + 1}</span>
              {item.label}
            </span>
            <span className="rpm-cmp-arrow">→</span>
          </Link>
        </div>
      ))}
    </div>

  </div>
</section>

      {/* Need help deciding */}
      <section className="rpm-section rpm-section-white">
        <div className="rpm-section-inner">
          <div className="rpm-eyebrow">
            <span className="rpm-eyebrow-line" />
          </div>
          <h2 className="rpm-h2">
            Need help{' '}
            <span className="rpm-h2-accent">deciding?</span>
          </h2>
          <ul className="rpm-linklist">
            <li>
              <Link href="/retreats/himalayan-retreats">
                Complete guide to Himalayan retreats in India
                <span className="rpm-linklist-arrow">→</span>
              </Link>
            </li>
            <li>
              <Link href="/topics/retreat-decision">
                Retreat decision guides — how to choose the right format
                <span className="rpm-linklist-arrow">→</span>
              </Link>
            </li>
            <li>
              <Link href="/blog/3-day-vs-5-day-himalayan-retreat">
                3-day vs 5-day — which duration is right for you?
                <span className="rpm-linklist-arrow">→</span>
              </Link>
            </li>
            <li>
              <Link href="/blog/retreat-vs-trek-which-is-right-for-you">
                Retreat vs trek — understanding the difference
                <span className="rpm-linklist-arrow">→</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

    </main>
  );
}