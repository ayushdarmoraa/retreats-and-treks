import { Metadata } from 'next';
import Link from 'next/link';
import { RETREAT_REVIEWS } from '@/content/reviews';
import { EXPERIENCE_PAGES } from '@/config/experiencePages';
import { REVIEW_CLUSTERS } from '@/config/reviewClusters';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateReviewSchemas, generateAggregateRatingSchema, generateBreadcrumbSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import ReviewCard from '@/components/reviews/ReviewCard';
import TrackedPage from '@/components/TrackedPage';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

export const dynamic = 'force-static';

const PAGE_TITLE = 'Retreat Reviews & Experiences | Retreats And Treks';
const PAGE_DESCRIPTION =
  'Real reviews from meditation, yoga, silent, and healing retreats in the Himalayas, with experiences from Zanskar, Chakrata, Rishikesh, and more.';
const CANONICAL = buildCanonicalUrl('/reviews');

export function generateMetadata(): Metadata {
  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    alternates: { canonical: CANONICAL },
    openGraph: {
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: CANONICAL,
      type: 'website',
      images: buildOgImages(PAGE_TITLE),
    },
  };
}

function getPageUrlForRetreatSlug(retreatSlug: string): string | null {
  const page = EXPERIENCE_PAGES.find((p) => p.retreatServiceSlugs.includes(retreatSlug));
  return page ? `/${page.slug}` : null;
}

export default function ReviewsPage() {
  const sortedReviews = [...RETREAT_REVIEWS].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  );

  const totalReviews = sortedReviews.length;
  const avgRating =
    totalReviews > 0
      ? Math.round((sortedReviews.reduce((sum, r) => sum + r.ratingValue, 0) / totalReviews) * 10) / 10
      : 0;

  const reviewSchemas = generateReviewSchemas(sortedReviews, 'Retreats And Treks', CANONICAL);
  const aggregateSchema =
    totalReviews >= 2
      ? generateAggregateRatingSchema(avgRating, totalReviews, 'Retreats And Treks', CANONICAL)
      : null;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Reviews', url: CANONICAL },
  ]);

  // Split heading for green last word
  const h1Words = "Real Retreat Experiences in the Himalayas".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page="/reviews" style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Retreat Reviews & Experiences — Real Stories from the Himalayas"
        description="Real reviews from meditation, yoga, silent, and healing retreats in the Himalayas."
        path="/reviews"
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

        .med-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .med-list-item { display: grid; grid-template-columns: 1.9rem 1fr; gap: 0.9rem; }
        .med-list-dot { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid rgba(15,118,110,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .med-list-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; }
        .med-list-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #4b5259; font-weight: 400; }
        .med-list-text strong { color: #2B2A26; font-weight: 600; }

        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-hero-section {
          position: relative;
          overflow: hidden;
          min-height: 50vh;
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

        /* ── Reviews specific styles ── */
        .med-reviews-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }
        .med-reviews-stat {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.78rem;
          font-weight: 300;
          color: #333;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          padding: 5px 14px;
        }
        .med-reviews-stat .med-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
        }

        .med-reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 24rem), 1fr));
          gap: 1.25rem;
          margin-top: 1.5rem;
        }

        .med-reviews-categories {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 12px;
          overflow: hidden;
          margin-top: 1.5rem;
        }
        .med-reviews-category {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(15,118,110,0.08);
          text-decoration: none;
          background: #fff;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          font-weight: 400;
          color: #2B2A26;
          transition: background 0.2s;
        }
        .med-reviews-category:last-child { border-bottom: none; }
        .med-reviews-category:hover { background: #f7f9f7; }
        .med-reviews-category .med-arrow { color: #0f766e; font-size: 0.8rem; }

        .med-reviews-hero-body {
          max-width: 46rem;
          margin: 0 auto 1.5rem;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.85);
          text-shadow: 0 2px 14px rgba(0,0,0,0.45);
          text-align: center;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {reviewSchemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              ...reviewSchemas,
              ...(aggregateSchema ? [aggregateSchema] : []),
            ]),
          }}
        />
      )}

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Reviews' },
            ]}
          />
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Participant Stories</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-reviews-hero-body">
              Stories from people who attended our meditation, yoga, and silent retreats across Zanskar, Chakrata, Rishikesh, and the wider Himalayas.
            </p>

            {totalReviews > 0 && (
              <div className="med-reviews-stats">
                <span className="med-reviews-stat">
                  <span className="med-label">Reviews</span>
                  {totalReviews} verified
                </span>
                <span className="med-reviews-stat">
                  <span className="med-label">Rating</span>
                  {avgRating} / 5
                </span>
              </div>
            )}

            <div className="med-hero-actions" style={{ marginTop: '2rem' }}>
              <a href="#reviews" className="med-cta-btn">Read Reviews ↓</a>
              <a href="#categories" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Browse by Category</a>
            </div>
          </div>
        </section>

        {/* ── REVIEW GRID ── */}
        <section id="reviews" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">All Reviews</span>
            </div>
            <h2 className="med-h2">Real <span>Experiences</span></h2>

            <div className="med-reviews-grid">
              {sortedReviews.map((review) => {
                const pageUrl = getPageUrlForRetreatSlug(review.retreatSlug);
                const card = (
                  <ReviewCard
                    key={`${review.participantName}-${review.datePublished}`}
                    review={review}
                  />
                );
                return pageUrl ? (
                  <Link
                    key={`${review.participantName}-${review.datePublished}`}
                    href={pageUrl}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {card}
                  </Link>
                ) : card;
              })}
            </div>
          </div>
        </section>

        {/* ── EXPLORE BY CATEGORY ── */}
        {REVIEW_CLUSTERS.length > 0 && (
          <section id="categories" className="med-shell med-section-alt med-section-padding">
            <div className="med-inner">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Browse by Category</span>
              </div>
              <h2 className="med-h2">Explore Reviews <span>by Category</span></h2>

              <div className="med-reviews-categories">
                {REVIEW_CLUSTERS.map((cluster, i, arr) => (
                  <Link
                    key={cluster.slug}
                    href={`/reviews/${cluster.slug}`}
                    className="med-reviews-category"
                    style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(15,118,110,0.08)' : 'none' }}
                  >
                    <span>{cluster.h1}</span>
                    <span className="med-arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Retreats</span>
              </Link>
              <Link href="/meditation-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Meditation Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/locations" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Locations</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/contact" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Contact Us</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
            </div>
          </div>
        </nav>

      </article>
    </TrackedPage>
  );
}
