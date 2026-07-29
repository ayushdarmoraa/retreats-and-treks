import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import FeaturedRetreat from '@/components/FeaturedRetreat';
import RelatedReads from '@/components/RelatedReads';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const PATH = '/treks/kedarkantha-vs-har-ki-dun';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Kedarkantha vs Har Ki Dun — Which Trek Is Right for You? | Retreats And Treks',
    description:
      'Kedarkantha vs Har Ki Dun trek comparison from Sankri: summit vs valley, winter vs summer, duration, difficulty, and who should choose which route.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Kedarkantha vs Har Ki Dun — Which Trek Is Right for You?',
      description:
        'Compare Kedarkantha and Har Ki Dun treks from Sankri. Snow summit vs green valley. Winter vs summer. Difficulty, duration, and who should choose which.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Kedarkantha vs Har Ki Dun — Which Trek Is Right for You?'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which trek is easier — Kedarkantha or Har Ki Dun?',
    answer:
      'Kedarkantha is easier on a per-day basis. Daily distances are shorter (5 to 6 km), the total duration is four days, and the only physically demanding section is the summit push on day three. Har Ki Dun is easier in terms of altitude and terrain — no summit, no steep ascent — but the total distance is longer (40 km over six days). If you define "easier" as less total effort, Kedarkantha wins. If you define it as less intense on any single day, Har Ki Dun wins.',
  },
  {
    question: 'Is Kedarkantha better in winter?',
    answer:
      'Yes. Kedarkantha is specifically a winter trek. The trail is at its most spectacular from December to March when snow covers the forest, meadows, and summit ridge. The panorama from the 3,800-metre peak is sharpest in winter due to cold, clear air. Summer Kedarkantha (May) offers a hybrid green-and-snow experience but lacks the full snow immersion that defines the trek. If you are choosing Kedarkantha, choose it in winter.',
  },
  {
    question: 'Is Har Ki Dun suitable for beginners?',
    answer:
      'Yes, with moderate fitness. Har Ki Dun requires the ability to walk six to eight kilometres per day for five to six consecutive days on uneven terrain. There are no technical sections, no summit push, and no altitude concerns (maximum 3,600 metres). The challenge is sustained effort over multiple days rather than single-day intensity. If you can walk comfortably for five to six hours per day with a daypack, you have the fitness for Har Ki Dun.',
  },
  {
    question: 'Which trek is more scenic?',
    answer:
      'Both are exceptionally scenic but in different ways. Kedarkantha delivers concentrated drama — snow-laden forest, alpine meadows, and a 360-degree summit panorama across six Himalayan ranges. It peaks on summit morning and that single view is unforgettable. Har Ki Dun delivers sustained beauty — five days of changing landscape from forest to village to meadow to glacial valley. The scenery builds progressively and the Har Ki Dun valley itself is one of the most spectacular natural amphitheatres in the Himalayas. Kedarkantha for one defining moment. Har Ki Dun for a week of visual richness.',
  },
  {
    question: 'Can both treks be done by first-time trekkers?',
    answer:
      'Yes. Both are classified as beginner-to-moderate and are regularly completed by first-time Himalayan trekkers. Kedarkantha is the more common first trek — shorter duration, structured progression, and the summit reward is highly motivating. Har Ki Dun requires more sustained fitness but no technical skill. For a first trek, Kedarkantha is the stronger recommendation due to its shorter commitment and clearer objective. For a second trek, Har Ki Dun is the natural follow-up.',
  },
];

const COMPARISON_ROWS = [
  { label: 'Type', kedarkantha: 'Summit trek', hari: 'Valley trek' },
  { label: 'Duration', kedarkantha: '4–5 days', hari: '6–7 days' },
  { label: 'Max Altitude', kedarkantha: '~3,800 m', hari: '~3,600 m' },
  { label: 'Best Season', kedarkantha: 'Winter (Dec–Mar)', hari: 'Summer (May–Jun)' },
  { label: 'Difficulty', kedarkantha: 'Moderate-beginner', hari: 'Moderate' },
  { label: 'Landscape', kedarkantha: 'Snow summit + forest', hari: 'River valley + meadows' },
  { label: 'Base', kedarkantha: 'Sankri', hari: 'Sankri' },
];

export default function KedarkanthaVsHarKiDunPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Kedarkantha vs Har Ki Dun', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Kedarkantha vs Har Ki Dun — Which Trek Is Right for You?',
    description:
      'Compare Kedarkantha and Har Ki Dun treks from Sankri. Snow summit vs green valley. Winter vs summer. Difficulty, duration, and who should choose which.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Kedarkantha vs Har Ki Dun".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Kedarkantha vs Har Ki Dun — Which Trek Is Right for You?"
        description="Compare Kedarkantha and Har Ki Dun treks from Sankri. Snow summit vs green valley. Winter vs summer. Difficulty, duration, and who should choose which."
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
          min-height: 70vh;
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

        /* ── Pick Cards ── */
        .med-pick-card {
          padding: 1rem 1.25rem;
          border-left: 3px solid #0f766e;
          transition: all 0.3s ease;
        }
        .med-pick-card:hover {
          border-color: #0d6b64;
          transform: translateX(4px);
        }
        .med-pick-card .med-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0f766e;
        }
        .med-pick-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        /* ── Comparison Table ── */
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
        .med-table td:first-child { font-weight: 600; color: #2B2A26; }
        .med-table td a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-table td a:hover { text-decoration: underline; }

        /* ── Split Cards ── */
        .med-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        @media (max-width: 720px) { .med-split { grid-template-columns: 1fr; } }
        .med-split-card {
          padding: 0;
          overflow: hidden;
        }
        .med-split-card .med-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: #f0f2f0;
        }
        .med-split-card .med-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .med-split-card:hover .med-img {
          transform: scale(1.04);
        }
        .med-split-card .med-body-wrap {
          padding: 1.25rem 1.5rem 1.5rem;
        }
        .med-split-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-split-card .med-h3 a { color: #0f766e; font-weight: 600; text-decoration: none; }
        .med-split-card .med-h3 a:hover { text-decoration: underline; }
        .med-split-card .med-body { font-size: 0.92rem; margin-bottom: 0.5rem; }
        .med-split-card .med-body:last-child { margin-bottom: 0; }

        /* ── Season Cards ── */
        .med-season-card {
          padding: 1.25rem 1.5rem;
          border: 1px solid rgba(15,118,110,0.08);
          border-radius: 12px;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
        }
        .med-season-card:hover {
          border-color: rgba(15,118,110,0.2);
          transform: translateX(4px);
        }
        .med-season-card:last-child { margin-bottom: 0; }
        .med-season-card .med-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0f766e;
        }
        .med-season-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        /* ── Choose Grid ── */
        .med-choose-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        @media (max-width: 720px) { .med-choose-grid { grid-template-columns: 1fr; } }
        .med-choose-card {
          padding: 1.5rem;
          border-top: 3px solid #0f766e;
        }
        .med-choose-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.5rem; }
        .med-choose-card ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .med-choose-card ul li {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.92rem;
          line-height: 1.85;
          color: #4b5259;
          padding: 0.3rem 0 0.3rem 1.25rem;
          position: relative;
          border-bottom: 1px solid rgba(15,118,110,0.04);
        }
        .med-choose-card ul li:last-child { border-bottom: none; }
        .med-choose-card ul li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #0f766e;
          font-size: 0.8rem;
        }
        .med-choose-card ul li a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-choose-card ul li a:hover { text-decoration: underline; }

        .med-callout {
          padding: 1.25rem 1.5rem;
          background: #f7f9f7;
          border: 1px solid rgba(15,118,110,0.08);
          border-left: 4px solid #0f766e;
          border-radius: 12px;
          transition: all 0.3s;
          margin-top: 1rem;
        }
        .med-callout:hover {
          border-color: rgba(15,118,110,0.2);
          box-shadow: 0 4px 16px rgba(15,118,110,0.04);
        }
        .med-callout .med-body { margin: 0; }

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

        .med-discovery-trail {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          color: #6b7280;
          margin-bottom: 1rem;
        }
        .med-discovery-trail a {
          color: #0f766e;
          text-decoration: none;
          font-weight: 500;
        }
        .med-discovery-trail a:hover { text-decoration: underline; }
        .med-discovery-trail .med-sep { color: #d1d5db; margin: 0 0.3rem; }
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
              { name: 'Kedarkantha vs Har Ki Dun' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Trek Comparison · Sankri, Uttarakhand</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Both treks start from the same place — Sankri trek base, the primary trek base in Uttarakhand's Tons Valley. Both are among the most popular Himalayan treks in India. But the experience they deliver is fundamentally different: the Kedarkantha Trek is a snow summit, while the Har Ki Dun Trek is a green valley journey.
            </p>
            <div className="med-hero-tags">
              <span>Kedarkantha</span>
              <span>Har Ki Dun</span>
              <span>Snow Summit</span>
              <span>Green Valley</span>
            </div>
            <div className="med-hero-actions">
              <a href="#comparison" className="med-cta-btn">View Comparison</a>
              <a href="#choose" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Help Me Choose</a>
            </div>
          </div>
        </section>

        {/* ── DISCOVERY TRAIL ── */}
        <section className="med-shell med-section-white med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-discovery-trail">
              <Link href="/treks/best-treks-in-uttarakhand">Best Treks in Uttarakhand</Link>
              <span className="med-sep">→</span>
              <Link href="/treks/best-treks-in-uttarakhand/snow">Snow Treks</Link>
              <span className="med-sep">→</span>
              <span>Kedarkantha vs Har Ki Dun</span>
            </div>

            <div className="med-card med-pick-card" style={{ marginBottom: '0.75rem' }}>
              <div className="med-label">Snow Summit · 4 days · Dec–Mar</div>
              <p className="med-body"><strong><Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha Trek</Link></strong> — 3,800 m summit with 360° Himalayan panorama. First-time snow trekkers.</p>
            </div>
            <div className="med-card med-pick-card">
              <div className="med-label">Valley Journey · 6 days · Apr–Jun, Sep–Nov</div>
              <p className="med-body"><strong><Link href="/treks/location/sankri/har-ki-dun-trek">Har Ki Dun Trek</Link></strong> — Glacial valley, ancient villages, wildflower meadows. Sustained summer walking.</p>
            </div>

            <p className="med-body" style={{ marginTop: '1.5rem' }}>
              One is a four-day sprint to a peak, the other is a six-day walk through a glacial corridor. Choosing between them is not about which is better — it is about which is right for you. Both are featured in our <Link href="/treks/best-treks-in-uttarakhand">top trekking routes in Uttarakhand</Link>.
            </p>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section id="comparison" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">At a Glance</span>
            </div>
            <h2 className="med-h2">Kedarkantha vs Har Ki Dun <span>Quick Comparison</span></h2>

            <div className="med-table-wrap">
              <table className="med-table">
                <thead>
                  <tr>
                    <th>Factor</th>
                    <th>Kedarkantha</th>
                    <th>Har Ki Dun</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr key={i}>
                      <td>{row.label}</td>
                      <td>{row.kedarkantha}</td>
                      <td>{row.hari}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <PrimaryCTA
          
          label="Help Me Choose"
          subtext="Not sure which trek fits you? Share your dates and experience — we will recommend the right route."
          vertical="trek"
          category="comparison"
          sourcePath={PATH}
        />

        {/* ── LANDSCAPE & EXPERIENCE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">What You Will See</span>
            </div>
            <h2 className="med-h2">Landscape &amp; <span>Experience</span></h2>

            <div className="med-split">
              <div className="med-card med-split-card">
                <div className="med-img-wrap">
                  <img src="/Images/trek/region/kedarkantha.webp" alt="Kedarkantha summit snow trail" className="med-img" />
                </div>
                <div className="med-body-wrap">
                  <h3 className="med-h3"><Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha</Link></h3>
                  <p className="med-body">A concentrated experience that builds to a single defining moment. The Kedarkantha Trek rises through dense pine and oak forest — silent and snow-covered in winter — crosses open alpine meadows, and ascends a final ridge to a 3,800-metre summit.</p>
                  <p className="med-body">The panorama from the top spans Swargarohini, Bandarpoonch, Black Peak, and the Gangotri group. On a clear winter morning, that summit view is the single most spectacular sight available on any beginner trek in India.</p>
                </div>
              </div>
              <div className="med-card med-split-card">
                <div className="med-img-wrap">
                  <img src="/Images/trek/region/harkidun.webp" alt="Har Ki Dun green valley trail" className="med-img" />
                </div>
                <div className="med-body-wrap">
                  <h3 className="med-h3"><Link href="/treks/location/sankri/har-ki-dun-trek">Har Ki Dun</Link></h3>
                  <p className="med-body">A sustained experience that deepens over five to six days. The Har Ki Dun Trek follows the ancient Tons Valley through traditional Himalayan villages, across wooden bridges over glacial rivers, through dense forest and open meadow.</p>
                  <p className="med-body">The beauty accumulates — each day's landscape is different from the last, and the valley itself, when you finally reach it, feels earned. If Kedarkantha is a photograph, Har Ki Dun is a film.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DIFFICULTY ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Effort Required</span>
            </div>
            <h2 className="med-h2">Difficulty &amp; <span>Fitness Level</span></h2>

            <div className="med-split">
              <div className="med-card med-split-card" style={{ padding: '0' }}>
                <div className="med-body-wrap">
                  <h3 className="med-h3">Kedarkantha — Burst Effort</h3>
                  <p className="med-body"><strong>Kedarkantha</strong> demands burst effort. Three days of moderate forest walking (5 to 6 km per day) followed by a summit push — a steep 800-metre ascent in snow conditions, typically starting before dawn. The summit day is the hardest single day on either trek. But the overall commitment is shorter: four days total.</p>
                </div>
              </div>
              <div className="med-card med-split-card" style={{ padding: '0' }}>
                <div className="med-body-wrap">
                  <h3 className="med-h3">Har Ki Dun — Sustained Endurance</h3>
                  <p className="med-body"><strong>Har Ki Dun</strong> demands sustained endurance. Daily distances average 7 to 8 km over six days. No single day is as intense as Kedarkantha's summit push, but the cumulative load is higher. The terrain is gentler — no steep summit ascent, no snow gear in summer — but the duration tests a different kind of fitness.</p>
                </div>
              </div>
            </div>

            <p className="med-body" style={{ marginTop: '1.5rem' }}>
              Both are accessible to <Link href="/treks/best-treks-in-uttarakhand/beginner">beginner treks in Uttarakhand</Link>. The preparation is the same: two to three weeks of daily cardio. The difference is what kind of challenge you prefer. Short and sharp, or long and steady.
            </p>
          </div>
        </section>

        {/* ── SEASONS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">When to Go</span>
            </div>
            <h2 className="med-h2">Best Season — <span>Winter vs Summer</span></h2>
            <p className="med-body">
              This is the deciding factor for many trekkers. The two treks occupy opposite seasonal windows — and each is at its best in that window.
            </p>

            <div className="med-season-card">
              <span className="med-label">Kedarkantha · December to March</span>
              <p className="med-body">This is a <Link href="/treks/best-treks-in-uttarakhand/snow">winter treks in Uttarakhand</Link>. The trail is snow-covered, the forest is silent and white, and the summit panorama is sharpest in cold, clear winter air. If you are choosing Kedarkantha, choose December to February for the definitive version.</p>
            </div>
            <div className="med-season-card" style={{ marginBottom: 0 }}>
              <span className="med-label">Har Ki Dun · April–June &amp; September–November</span>
              <p className="med-body">This is a <Link href="/treks/summer-treks-uttarakhand">summer treks in Uttarakhand</Link>. The valley is green, wildflowers blanket the meadows, the river runs clear, and the trail is dry and comfortable. Summer is when Har Ki Dun is most accessible and most beautiful.</p>
            </div>
          </div>
        </section>

        {/* ── WHO SHOULD CHOOSE ── */}
        <section id="choose" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decision Guide</span>
            </div>
            <h2 className="med-h2">Who Should <span>Choose Which?</span></h2>

            <div className="med-choose-grid">
              <div className="med-card med-choose-card">
                <h3 className="med-h3">Choose Kedarkantha if:</h3>
                <ul>
                  <li>You want to stand on a Himalayan summit</li>
                  <li>You want a snow trek experience</li>
                  <li>You have 4 to 5 days available</li>
                  <li>You are a first-time snow trekker seeking a guided format</li>
                  <li>You prefer concentrated intensity over sustained walking</li>
                  <li>You are trekking between December and March</li>
                </ul>
              </div>
              <div className="med-card med-choose-card">
                <h3 className="med-h3">Choose Har Ki Dun if:</h3>
                <ul>
                  <li>You prefer valleys, rivers, and meadows over summit views</li>
                  <li>You enjoy longer, immersive walks through changing landscape</li>
                  <li>You want summer greenery and wildflowers</li>
                  <li>You dislike extreme cold or snow conditions</li>
                  <li>You have 6 to 7 days available</li>
                  <li>You are trekking between April and June or September and November</li>
                </ul>
              </div>
            </div>

            <div className="med-callout">
              <p className="med-body">
                <strong>Do both.</strong> If you have the time, the strongest recommendation is to do both — Kedarkantha in winter, Har Ki Dun in summer. They are complementary experiences from the same base, and together they give you the full range of what Himalayan trekking offers.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Trek"
          subtext="Share your preferred season and experience level — we will match you to the right trek."
          vertical="trek"
          category="comparison"
          sourcePath={PATH}
        />

        <FeaturedRetreat
          title="Kedarkantha — The Classic Winter Summit"
          description="Deep snow, 360° Himalayan views, and a summit push that rewards. 4 days, moderate difficulty, no technical skills."
          links={[
            { label: 'View Kedarkantha Details', href: '/treks/location/sankri/kedarkantha-trek' },
            { label: 'View Har Ki Dun Details', href: '/treks/location/sankri/har-ki-dun-trek' },
            { label: 'Compare More Treks', href: '/treks/best-treks-in-uttarakhand' },
          ]}
        />

        {/* ── EXPLORE MORE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Explore More</span>
            </div>
            <h2 className="med-h2">Browse <span>by Category</span></h2>

            <div className="med-nav-group">
              <Link href="/treks/location/sankri/kedarkantha-trek" className="med-nav-link">
                <span>Kedarkantha Trek — Full Route Details</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/location/sankri/har-ki-dun-trek" className="med-nav-link">
                <span>Har Ki Dun Trek — Full Route Details</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/best-treks-in-uttarakhand/snow" className="med-nav-link">
                <span>Snow Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/best-treks-in-uttarakhand/beginner" className="med-nav-link" style={{ borderBottom: 'none' }}>
                <span>Beginner Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">FAQ</span>
            </div>
            <h2 className="med-h2">Frequently asked <span>questions</span></h2>

            <div className="med-faq-accordion">
              {FAQ_ITEMS.map((faq, i) => (
                <details key={i} className="med-faq-details">
                  <summary className="med-faq-summary">
                    <span className="med-faq-question">{faq.question}</span>
                    <span className="med-faq-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </summary>
                  <div className="med-faq-answer">
                    <p className="med-body">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'Best Treks in Uttarakhand — Complete Guide', href: '/treks/best-treks-in-uttarakhand' },
            { label: 'Snow Treks in Uttarakhand', href: '/treks/best-treks-in-uttarakhand/snow' },
            { label: 'Beginner Treks in Uttarakhand', href: '/treks/best-treks-in-uttarakhand/beginner' },
            { label: 'Brahmatal vs Kuari Pass Comparison', href: '/treks/brahmatal-vs-kuari-pass' },
          ]}
        />

        {/* ── FOOTER ── */}
        <div className="med-trek-footer">
          <Link href="/treks">← All Treks</Link>
          <Link href="/treks/best-treks-in-uttarakhand">Best Treks in Uttarakhand</Link>
          <Link href="/treks/location/sankri">Sankri Treks</Link>
          <Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha</Link>
          <Link href="/treks/location/sankri/har-ki-dun-trek">Har Ki Dun</Link>
        </div>

      </article>
    </TrackedPage>
  );
}
