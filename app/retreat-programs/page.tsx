import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateCollectionPageSchema, generateBreadcrumbSchema, generateItemListSchema } from '@/components/seo/Schema';
import Image from 'next/image';
import { getAllRetreatServices } from '@/content/retreats/services';
import { RETREAT_DURATION_GROUP } from '@/config/retreatDurations';
import { RETREAT_MATRIX_META } from '@/config/retreatMatrix';
import { RETREAT_SCORES } from '@/config/retreatScores';
import { getAggregateRating } from '@/content/reviews';
import ProgramMatrixTable, { type MatrixRow } from '@/components/ProgramMatrixTable';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const PATH = '/retreat-programs';

export function generateMetadata(): Metadata {
  return {
    title: 'Himalayan Retreat Programs | Retreats And Treks',
    description:
      'Compare Himalayan retreat programs by duration, location, intensity, and format to find the retreat that matches your needs.',
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

  // Split heading for green last word
  const h1Words = "All Retreat Programs".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="All Himalayan Retreat Programs — Compare & Choose"
        description="A complete matrix of structured retreat programs in the Indian Himalayas. Filter by duration, intensity, and format."
        path={PATH}
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
        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
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

        /* ── Programs specific styles ── */
        .med-programs-hero {
          min-height: 50vh;
        }

        .med-programs-matrix {
          margin-top: 1.5rem;
        }

        .med-programs-compare-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(15,118,110,0.08);
          border: 1px solid rgba(15,118,110,0.08);
          border-radius: 12px;
          overflow: hidden;
          margin-top: 2rem;
        }
        @media (max-width: 640px) {
          .med-programs-compare-grid { grid-template-columns: 1fr; }
        }
        .med-programs-compare-item {
          background: #f7f9f7;
          position: relative;
          overflow: hidden;
          transition: background 0.25s;
        }
        .med-programs-compare-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: #0f766e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .med-programs-compare-item:hover { background: #ffffff; }
        .med-programs-compare-item:hover::before { transform: scaleX(1); }
        .med-programs-compare-item a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          font-weight: 400;
          color: #2B2A26;
          text-decoration: none;
          gap: 1rem;
          transition: color 0.2s;
        }
        .med-programs-compare-item:hover a { color: #0f766e; }
        .med-programs-compare-num {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #0f766e;
          display: block;
          margin-bottom: 0.2rem;
        }
        .med-programs-compare-arrow {
          font-size: 0.8rem;
          color: #0f766e;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .med-programs-compare-item:hover .med-programs-compare-arrow {
          transform: translateX(4px);
        }

        .med-programs-linklist {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
        .med-programs-linklist li {
          position: relative;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 12px;
          background: #ffffff;
          overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .med-programs-linklist li::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: #0f766e;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .med-programs-linklist li:hover {
          border-color: rgba(15,118,110,0.3);
          box-shadow: 0 4px 16px rgba(15,118,110,0.07);
          transform: translateY(-2px);
        }
        .med-programs-linklist li:hover::before { transform: scaleY(1); }
        .med-programs-linklist a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.1rem 0.85rem 1.35rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: #2B2A26;
          text-decoration: none;
          line-height: 1.5;
          transition: color 0.2s;
        }
        .med-programs-linklist a:hover { color: #0f766e; }
        .med-programs-linklist-arrow {
          font-size: 0.7rem;
          color: #0f766e;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .med-programs-linklist li:hover .med-programs-linklist-arrow {
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

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Himalayan Retreats', href: '/retreats' },
              { name: 'All Programs' },
            ]}
          />
        </div>
      </div>

      <article>

        {/* ── HERO ── */}
        <section className="med-shell med-hero-section med-programs-hero">
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Compare & Choose</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              A complete overview of all structured retreat programs available through Retreats And Treks. Sort by duration, location, or intensity, and filter to find the program that matches your current need.
            </p>
            <div className="med-hero-tags">
              <span>{services.length} Programs</span>
              <span>3–10 Days</span>
              <span>4 Locations</span>
              <span>All Levels</span>
            </div>
            <div className="med-hero-actions">
              <a href="#matrix" className="med-cta-btn">View All Programs ↓</a>
              <Link href="/find-your-retreat" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>
                Retreat Finder
              </Link>
            </div>
          </div>
        </section>

        {/* ── MATRIX TABLE ── */}
        <section id="matrix" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Program Matrix</span>
            </div>
            <h2 className="med-h2">Compare All <span>Retreat Programs</span></h2>
            <p className="med-body">
              Filter and sort by duration, intensity, format, or location to find the program that matches your needs.
            </p>

            <div className="med-programs-matrix">
              <ProgramMatrixTable rows={rows} fromPath={PATH} />
            </div>
          </div>
        </section>

        {/* ── POPULAR COMPARISONS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Popular Comparisons</span>
            </div>
            <h2 className="med-h2">Popular <span>Comparisons</span></h2>

            <div className="med-programs-compare-grid">
              {[
                { href: '/compare/burnout-recovery-vs-rest-and-reset', label: 'Burnout Recovery vs Rest & Reset' },
                { href: '/compare/meditation-and-silence-vs-yoga-and-movement', label: 'Meditation & Silence vs Yoga & Movement' },
                { href: '/compare/sound-healing-vs-weekend-retreat', label: 'Sound Healing vs Weekend Retreat' },
                { href: '/compare/art-and-creative-vs-burnout-recovery', label: 'Art & Creative vs Burnout Recovery' },
                { href: '/compare/private-and-custom-vs-sound-healing', label: 'Custom vs Sound Healing' },
                { href: '/compare/private-and-custom-vs-trek-and-paint', label: 'Custom vs Trek & Paint' },
                { href: '/compare/private-and-custom-vs-weekend-art-retreat', label: 'Custom vs Weekend Art' },
                { href: '/compare/private-and-custom-vs-weekend-retreat', label: 'Custom vs Weekend Retreat' },
                { href: '/compare/sound-healing-vs-trek-and-paint', label: 'Sound Healing vs Trek & Paint' },
                { href: '/compare/sound-healing-vs-weekend-art-retreat', label: 'Sound Healing vs Weekend Art' },
                { href: '/compare/trek-and-paint-vs-weekend-art-retreat', label: 'Trek & Paint vs Weekend Art' },
                { href: '/compare/trek-and-paint-vs-weekend-retreat', label: 'Trek & Paint vs Weekend Retreat' },
                { href: '/compare/weekend-art-retreat-vs-weekend-retreat', label: 'Weekend Art vs Weekend Retreat' },
              ].map((item, i) => (
                <div key={item.href} className="med-programs-compare-item">
                  <Link href={item.href}>
                    <span>
                      <span className="med-programs-compare-num">{String(i + 1).padStart(2, '0')}</span>
                      {item.label}
                    </span>
                    <span className="med-programs-compare-arrow">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEED HELP DECIDING ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decision Support</span>
            </div>
            <h2 className="med-h2">Need help <span>deciding?</span></h2>

            <ul className="med-programs-linklist">
              <li>
                <Link href="/retreats/himalayan-retreats">
                  Complete guide to Himalayan retreats in India
                  <span className="med-programs-linklist-arrow">→</span>
                </Link>
              </li>
              <li>
                <Link href="/topics/retreat-decision">
                  Retreat decision guides — how to choose the right format
                  <span className="med-programs-linklist-arrow">→</span>
                </Link>
              </li>
              <li>
                <Link href="/blog/3-day-vs-5-day-himalayan-retreat">
                  3-day vs 5-day — which duration is right for you?
                  <span className="med-programs-linklist-arrow">→</span>
                </Link>
              </li>
              <li>
                <Link href="/blog/retreat-vs-trek-which-is-right-for-you">
                  Retreat vs trek — understanding the difference
                  <span className="med-programs-linklist-arrow">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Retreats</span>
              </Link>
              <Link href="/find-your-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreat Finder</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreat-calendar" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreat Calendar</span>
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