import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import TrackedFAQ from '@/components/TrackedFAQ';
import PrimaryCTA from '@/components/PrimaryCTA';
import FeaturedRetreat from '@/components/FeaturedRetreat';
import RelatedReads from '@/components/RelatedReads';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import { getAllTreks } from '@/lib/treks';
import { TrekAttributeConfig } from '@/config/trekAttributes';
import { TrekContent } from '@/types/content';
import { images } from '@/lib/images';

/* ── Location path mapping ────────────────────────────────────────────── */

const LOCATION_PATH: Record<string, string> = {
  chakrata: '/treks/location/chakrata',
  sankri: '/treks/location/sankri',
  joshimath: '/treks/location/joshimath',
  lohajung: '/treks/location/lohajung',
  munsiyari: '/treks/location/munsiyari',
  barsu: '/treks/location/barsu',
};

function trekPath(trek: TrekContent): string {
  const base = LOCATION_PATH[trek.locationId] ?? '/treks';
  return `${base}/${trek.slug}`;
}

/* ── Metadata generator ───────────────────────────────────────────────── */

export function generateAttributeMetadata(config: TrekAttributeConfig): Metadata {
  const path = `/treks/${config.slug}`;
  const title = config.seoTitle ?? config.title;

  return {
    title: `${title} | Retreats And Treks`,
    description: config.description,
    alternates: { canonical: buildCanonicalUrl(path) },
    robots: { index: true, follow: true },
    openGraph: {
      title: config.title,
      description: config.description,
      url: buildCanonicalUrl(path),
      type: 'website',
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages(title),
    },
  };
}

/* ── Page component ───────────────────────────────────────────────────── */

export default function TrekAttributePage({
  config,
}: {
  config: TrekAttributeConfig;
}) {
  const path = `/treks/${config.slug}`;
  const allTreks = getAllTreks();
  const matchedTreks = allTreks.filter(config.filter);

  validateFAQSync(config.faqs, path);

  const h2Title = config.title
    .split('—')[0]
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const canonicalUrl = buildCanonicalUrl(path);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: config.title.split('—')[0].trim(), url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(config.faqs);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: config.title,
    description: config.description,
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = config.title.split('—')[0].trim().split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage
      page={path}
      style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}
    >
      <AutoArticleSchema
        title={config.title}
        description={config.description}
        path={path}
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

        .med-count-badge {
          display: inline-block;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          color: #0f766e;
          background: rgba(15,118,110,0.08);
          border-radius: 999px;
          padding: 0.2rem 0.9rem;
          letter-spacing: 0.04em;
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
          font-size: 0.82rem;
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
        .med-table td a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-table td a:hover { text-decoration: underline; }

        .med-badge {
          display: inline-block;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.15rem 0.6rem;
          border-radius: 999px;
        }
        .med-badge-easy {
          background: rgba(15,118,110,0.08);
          color: #0f766e;
        }
        .med-badge-moderate {
          background: rgba(15,118,110,0.08);
          color: #0f766e;
        }
        .med-badge-challenging {
          background: rgba(230,81,0,0.08);
          color: #e65100;
        }
        .med-badge-moderate-challenging {
          background: rgba(230,81,0,0.08);
          color: #c45000;
        }

        /* ── Trek Cards ── */
        .med-trek-card {
          padding: 1.5rem;
          border-top: 3px solid #0f766e;
          transition: all 0.35s ease;
        }
        .med-trek-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(15,118,110,0.08);
        }
        .med-trek-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.2rem; }
        .med-trek-card .med-h3 a { color: #0f766e; font-weight: 600; text-decoration: none; transition: color 0.3s; }
        .med-trek-card .med-h3 a:hover { color: #0d6b64; text-decoration: underline; }
        .med-trek-card .med-body { font-size: 0.92rem; margin-bottom: 0; }
        .med-trek-card .med-trek-meta {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          color: #6b7280;
          margin: 0.3rem 0 0.65rem;
        }

        .med-trek-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          color: #0f766e;
          text-decoration: none;
          margin-top: 0.5rem;
          transition: color 0.3s;
        }
        .med-trek-link:hover { color: #0d6b64; text-decoration: underline; }

        /* ── Nav Group ── */
        .med-nav-group {
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          overflow: hidden;
        }
        .med-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid rgba(15,118,110,0.06);
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          font-weight: 400;
          color: #2B2A26;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .med-nav-link:last-child { border-bottom: none; }
        .med-nav-link:hover { background: #f7f9f7; color: #0f766e; }
        .med-nav-link .med-arrow { color: #0f766e; font-size: 0.8rem; }

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

        /* ── FAQ Accordion ── */
        .med-faq-accordion {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
        .med-faq-details {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.1);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .med-faq-details:hover { border-color: rgba(15,118,110,0.25); box-shadow: 0 4px 16px rgba(15,118,110,0.04); }
        .med-faq-details[open] { border-color: rgba(15,118,110,0.3); }
        .med-faq-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          cursor: pointer;
          list-style: none;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: #2B2A26;
          transition: background 0.2s ease;
          user-select: none;
          gap: 1rem;
        }
        .med-faq-summary::-webkit-details-marker { display: none; }
        .med-faq-summary:hover { background: rgba(15,118,110,0.02); }
        .med-faq-details[open] .med-faq-summary {
          background: rgba(15,118,110,0.03);
          border-bottom: 1px solid rgba(15,118,110,0.06);
        }
        .med-faq-question { flex: 1; }
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
        .med-faq-details[open] .med-faq-icon { transform: rotate(45deg); }
        .med-faq-icon svg { width: 20px; height: 20px; stroke-width: 2; transition: stroke-width 0.2s ease; }
        .med-faq-summary:hover .med-faq-icon svg { stroke-width: 2.5; }
        .med-faq-answer {
          padding: 0 1.5rem 1.5rem;
          animation: med-faq-slide 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes med-faq-slide {
          0% { opacity: 0; transform: translateY(-12px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .med-faq-answer .med-body { margin: 0; font-size: 0.92rem; color: #4b5259; }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Treks', href: '/treks' },
              { name: config.title.split('—')[0].trim() },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Treks · Uttarakhand</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">{config.intro}</p>
            <div className="med-hero-tags">
              <span>{matchedTreks.length} Treks</span>
              <span>Filtered Selection</span>
              <span>Uttarakhand</span>
            </div>
            <div className="med-hero-actions">
              <a href="#table" className="med-cta-btn">View All Treks</a>
              <a href="#faq" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>FAQ</a>
            </div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="med-shell med-section-white med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <p className="med-body" style={{ marginBottom: '0.5rem' }}>
              <span className="med-count-badge">{matchedTreks.length} treks match this filter</span>
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              Explore all routes in our{' '}
              <Link href="/treks/best-treks-in-uttarakhand" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>
                Best Treks in Uttarakhand
              </Link>{' '}
              guide.
            </p>
          </div>
        </section>

        {/* ── CTA 1 ── */}
        <section className="med-shell med-section-white med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <PrimaryCTA
              label="Plan My Trek"
              subtext="Tell us your dates, group size, and experience level — we'll recommend the right route."
              vertical="trek"
              category="filter"
              sourcePath={path}
            />
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section id="table" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">At a Glance</span>
            </div>
            <h2 className="med-h2">{h2Title} <span>Quick Comparison</span></h2>

            <div className="med-table-wrap">
              <table className="med-table">
                <thead>
                  <tr>
                    <th>Trek</th>
                    <th>Altitude</th>
                    <th>Duration</th>
                    <th>Difficulty</th>
                    <th>Best Season</th>
                  </tr>
                </thead>
                <tbody>
                  {matchedTreks.map((trek) => {
                    const diffClass = trek.difficulty?.toLowerCase().includes('challenging')
                      ? 'med-badge-challenging'
                      : trek.difficulty?.toLowerCase().includes('easy')
                      ? 'med-badge-easy'
                      : trek.difficulty?.toLowerCase().includes('moderate–')
                      ? 'med-badge-moderate-challenging'
                      : 'med-badge-moderate';
                    return (
                      <tr key={trek.slug}>
                        <td><Link href={trekPath(trek)}>{trek.title}</Link></td>
                        <td>{trek.altitude ?? '—'}</td>
                        <td>{trek.duration}</td>
                        <td>
                          <span className={`med-badge ${diffClass}`}>
                            {trek.difficulty}
                          </span>
                        </td>
                        <td>{trek.bestSeason?.join(', ') ?? '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── TREK CARDS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Detailed Overview</span>
            </div>
            <h2 className="med-h2">{h2Title} <span>Detailed Overview</span></h2>

            {matchedTreks.map((trek) => (
              <div key={trek.slug} className="med-card med-trek-card">
                <h3 className="med-h3"><Link href={trekPath(trek)}>{trek.title}</Link></h3>
                <p className="med-trek-meta">
                  {trek.altitude ?? ''} · {trek.duration} · {trek.difficulty} · {trek.bestSeason?.slice(0, 3).join(', ') ?? ''}{trek.bestSeason && trek.bestSeason.length > 3 ? ' …' : ''}
                </p>
                <p className="med-body">{trek.overview}</p>
                <Link href={trekPath(trek)} className="med-trek-link">View full trek details →</Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA 2 ── */}
        <section className="med-shell med-section-alt med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <PrimaryCTA
              label="Plan My Trek"
              subtext="Not sure which trek suits you? Share your dates and preferences — we'll help you choose."
              vertical="trek"
              category="filter"
              sourcePath={path}
            />
          </div>
        </section>

        <FeaturedRetreat
          title="Brahmatal — The Ideal First Snow Trek"
          description="Frozen lake, snow-covered ridges, and Himalayan views. 4 days, moderate difficulty, no technical sections."
          links={[
            { label: 'View Trek Details', href: '/treks/location/lohajung/brahmatal-trek' },
            { label: 'See All Beginner Treks', href: '/treks/best-treks-in-uttarakhand/beginner' },
            { label: 'Compare Brahmatal vs Kuari Pass', href: '/treks/brahmatal-vs-kuari-pass' },
          ]}
        />

        {/* ── EXPLORE MORE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Explore More</span>
            </div>
            <h2 className="med-h2">Explore <span>More</span></h2>

            <div className="med-nav-group">
              <Link href="/treks/best-treks-in-uttarakhand" className="med-nav-link">
                <span>Best Treks in Uttarakhand — Complete Guide</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/best-treks-in-uttarakhand/beginner" className="med-nav-link">
                <span>Beginner Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/best-treks-in-uttarakhand#challenging-treks" className="med-nav-link">
                <span>Challenging Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/best-treks-in-uttarakhand#snow-treks" className="med-nav-link">
                <span>Snow Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/best-treks-in-uttarakhand/snow" className="med-nav-link">
                <span>Winter Treks (December–February)</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/summer-treks-uttarakhand" className="med-nav-link" style={{ borderBottom: 'none' }}>
                <span>Summer Treks (May–June)</span>
                <span className="med-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'Best Treks in Uttarakhand — Complete Guide', href: '/treks/best-treks-in-uttarakhand' },
            { label: 'Beginner Treks in Uttarakhand', href: '/treks/best-treks-in-uttarakhand/beginner' },
            { label: 'Garhwal Himalayas Trekking Guide', href: '/treks/garhwal-himalayas' },
            { label: 'Brahmatal vs Kuari Pass Comparison', href: '/treks/brahmatal-vs-kuari-pass' },
          ]}
        />

        {/* ── FAQ ── */}
        <section id="faq" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">FAQ</span>
            </div>
            <h2 className="med-h2">Frequently asked <span>questions</span></h2>
            <TrackedFAQ items={config.faqs} page={path} />
          </div>
        </section>

        {/* ── FOOTER ── */}
        <div className="med-trek-footer">
          <Link href="/treks">← All Treks</Link>
          <Link href="/treks/best-treks-in-uttarakhand">Best Treks in Uttarakhand</Link>
          <Link href="/treks/garhwal-himalayas">Garhwal Himalayas</Link>
          <Link href="/treks/location/chakrata">Chakrata Treks</Link>
        </div>

      </article>
    </TrackedPage>
  );
}
