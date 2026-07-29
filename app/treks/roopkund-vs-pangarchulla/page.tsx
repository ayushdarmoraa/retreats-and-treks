import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const PATH = '/treks/roopkund-vs-pangarchulla';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Roopkund vs Pangarchulla — Challenging Garhwal Trek Comparison | Retreats And Treks',
    description:
      'Roopkund vs Pangarchulla trek comparison by difficulty, summit day, season, permits, fitness, altitude, and route style in Garhwal.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Roopkund vs Pangarchulla — Challenging Garhwal Trek Comparison',
      description:
        'Mystery lake expedition (4,800m) vs peak summit (4,590m). Side-by-side comparison of the two hardest Garhwal treks.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Roopkund vs Pangarchulla — Challenging Garhwal Trek Comparison'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is harder — Roopkund or Pangarchulla?',
    answer:
      'Both are rated challenging, but they are hard in different ways. Roopkund is longer (53 km, 7 days) with sustained altitude above 4,000 m across multiple days. Pangarchulla is shorter (32 km, 6 days) but the summit push involves a steep 700 m climb on a single day with an alpine start at 3 AM. Roopkund tests endurance and altitude tolerance; Pangarchulla tests single-day climbing power and cold-weather stamina. Most experienced trekkers consider the Pangarchulla summit day to be the more technically demanding single effort.',
  },
  {
    question: 'Can I do both treks in one trip?',
    answer:
      'Not practically. Roopkund starts from Lohajung (pre/post-monsoon) and Pangarchulla starts from Joshimath (spring only). The base towns are 6+ hours apart by road and the seasonal windows overlap only in May. Most trekkers do them as separate trips, typically in different years as progression milestones.',
  },
  {
    question: 'Which trek needs more prior experience?',
    answer:
      'Both require prior high-altitude trekking experience above 4,000 m. Pangarchulla additionally requires comfort with early alpine starts, steep snow climbing, and use of crampons. If you have done one challenging Himalayan trek (Kedarkantha in winter, or a similar 3,800+ m route), Roopkund is the logical next step. If you have done Roopkund or equivalent, Pangarchulla is the summit-grade progression.',
  },
  {
    question: 'What is the best season for each?',
    answer:
      'Roopkund: May–June (pre-monsoon) or September–October (post-monsoon). Pangarchulla: March–May only, when consolidated snow supports the summit approach. There is no autumn Pangarchulla season — early snow makes the summit unstable.',
  },
  {
    question: 'Which has better views from the top?',
    answer:
      'Pangarchulla offers a full 360° summit panorama including Nanda Devi, Nanda Ghunti, Dronagiri, and the inner Nanda Devi Sanctuary. Roopkund\'s view is dominated by the Trishul massif looming directly above the lake, with Nanda Ghunti to the east. The Pangarchulla summit is the more comprehensive viewpoint; Roopkund is the more dramatic single-image destination.',
  },
  {
    question: 'Do I need a permit for Roopkund in 2025–2026?',
    answer:
      'Yes. Roopkund falls within the Nanda Devi Biosphere Reserve, and trekking requires a forest department permit obtained at the Lohajung check post. As of 2025, individual trekkers must register with an authorised guide or trekking operator — solo unsupported trekking is not permitted on this route. Permit fees are approximately ₹150–600 per person depending on the issuing authority. International trekkers pay higher fees. Your trekking operator typically handles permit logistics. Always confirm current permit status before departure.',
  },
  {
    question: 'How difficult is the Pangarchulla summit day?',
    answer:
      'The Pangarchulla summit day is the single most demanding day on any standard Garhwal trek. You leave Khullara camp at 3 AM, climb 720 metres of elevation over 4–5 hours through steep consolidated snow and loose scree, reach the 4,590 m summit by mid-morning, and descend the same day. Crampons are mandatory for the final snow slope. The difficulty comes from the combination of altitude (above 4,000 m throughout), steep gradient (sustained 30–40° slopes near the summit), early alpine start in darkness and sub-zero temperatures, and the need to complete the round trip before afternoon weather deteriorates.',
  },
];

const COMPARISON_ROWS = [
  { label: 'Base Town', roopkund: 'Lohajung (2,350 m)', pangarchulla: 'Joshimath (1,875 m)' },
  { label: 'Max Altitude', roopkund: '4,800 m', pangarchulla: '4,590 m' },
  { label: 'Distance', roopkund: '53 km', pangarchulla: '32 km' },
  { label: 'Duration', roopkund: '7 days', pangarchulla: '6 days' },
  { label: 'Difficulty', roopkund: 'Challenging', pangarchulla: 'Challenging' },
  { label: 'Best Season', roopkund: 'May–Jun, Sep–Oct', pangarchulla: 'Mar–May' },
  { label: 'Type', roopkund: 'Expedition (lake destination)', pangarchulla: 'Summit climb (peak)' },
  { label: 'Special Gear', roopkund: 'Standard high-altitude kit', pangarchulla: 'Crampons, gaiters required' },
];

export default function RoopkundVsPangarchullaPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Garhwal Himalayas', url: buildCanonicalUrl('/treks/garhwal-himalayas') },
    { name: 'Roopkund vs Pangarchulla', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Roopkund vs Pangarchulla — Challenging Garhwal Trek Comparison',
    description:
      'Mystery lake expedition (4,800m) vs peak summit (4,590m). Side-by-side comparison of the two hardest Garhwal treks.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Roopkund vs Pangarchulla".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Roopkund vs Pangarchulla — Challenging Garhwal Trek Comparison"
        description="Mystery lake expedition (4,800m) vs peak summit (4,590m). Side-by-side comparison of the two hardest Garhwal treks."
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

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; }
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
        .med-table td:first-child { font-weight: 600; color: #2B2A26; width: 25%; }
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
        .med-badge-challenging {
          background: rgba(230,81,0,0.08);
          color: #e65100;
        }

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
        .med-callout .med-body strong { color: #2B2A26; }

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

        /* ── Progression Steps ── */
        .med-progression {
          border: 1px solid rgba(15,118,110,0.08);
          border-radius: 12px;
          overflow: hidden;
        }
        .med-progression-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(15,118,110,0.06);
          background: #fff;
          transition: background 0.2s;
        }
        .med-progression-item:last-child { border-bottom: none; }
        .med-progression-item:hover { background: #f7f9f7; }
        .med-progression-item .med-num {
          flex-shrink: 0;
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
          background: #0f766e;
          color: #fff;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.1rem;
        }
        .med-progression-item .med-body {
          font-size: 0.88rem;
          margin: 0;
        }
        .med-progression-item .med-body strong { color: #2B2A26; }
        .med-progression-item .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-progression-item .med-body a:hover { text-decoration: underline; }

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
              { name: 'Garhwal Himalayas', href: '/treks/garhwal-himalayas' },
              { name: 'Roopkund vs Pangarchulla' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Trek Comparison · Challenging · Garhwal Himalayas</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              If you have completed moderate treks like Brahmatal or Kuari Pass and are ready to step into challenging territory, the Garhwal trekking region offers two outstanding options: the Roopkund mystery lake expedition and the Pangarchulla Peak summit climb.
            </p>
            <div className="med-hero-tags">
              <span>Roopkund</span>
              <span>Pangarchulla</span>
              <span>4,590–4,800m</span>
              <span>Challenging</span>
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
              <Link href="/treks/best-treks-in-uttarakhand/challenging">Challenging Treks</Link>
              <span className="med-sep">→</span>
              <span>Roopkund vs Pangarchulla</span>
            </div>

            <div className="med-card med-pick-card" style={{ marginBottom: '0.75rem' }}>
              <div className="med-label">Mystery Lake Expedition · 7 days · 4,800 m · May–Jun, Sep–Oct</div>
              <p className="med-body"><strong><Link href="/treks/location/lohajung/roopkund-trek">Roopkund Trek</Link></strong> — Sustained high-altitude expedition. Glacial skeleton lake, Bedni Bugyal, Trishul views.</p>
            </div>
            <div className="med-card med-pick-card">
              <div className="med-label">Summit Climb · 6 days · 4,590 m · Mar–May only</div>
              <p className="med-body"><strong><Link href="/treks/location/joshimath/pangarchulla-trek">Pangarchulla Peak</Link></strong> — Concentrated summit push. 3 AM alpine start, crampons, 360° Nanda Devi Sanctuary panorama.</p>
            </div>

            <p className="med-body" style={{ marginTop: '1.5rem' }}>
              Both are rated challenging, both exceed 4,500 metres, and both demand prior high-altitude experience. But they test different skills, occur in different seasons, and deliver fundamentally different types of mountain achievement. This comparison helps you decide which challenge matches your experience and ambition. For the full range of routes from easy to expedition-grade, see our <Link href="/treks/best-treks-in-uttarakhand">Uttarakhand trekking guide</Link>.
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
            <h2 className="med-h2">Roopkund vs Pangarchulla <span>at a Glance</span></h2>

            <div className="med-table-wrap">
              <table className="med-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Roopkund</th>
                    <th>Pangarchulla</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr key={i}>
                      <td>{row.label}</td>
                      <td>
                        {row.label === 'Base Town' ? (
                          <><Link href="/treks/location/lohajung">Lohajung</Link> (2,350 m)</>
                        ) : row.label === 'Special Gear' ? (
                          row.roopkund
                        ) : (
                          row.roopkund
                        )}
                      </td>
                      <td>
                        {row.label === 'Base Town' ? (
                          <><Link href="/treks/location/joshimath">Joshimath</Link> (1,875 m)</>
                        ) : row.label === 'Special Gear' ? (
                          <span style={{ color: '#e65100', fontWeight: 600 }}>{row.pangarchulla}</span>
                        ) : row.label === 'Difficulty' ? (
                          <span className="med-badge med-badge-challenging">{row.pangarchulla}</span>
                        ) : (
                          row.pangarchulla
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <PrimaryCTA
          
          label="Help Me Choose"
          subtext="Share your experience level and dates. We will recommend the right challenging trek."
          vertical="trek"
          category="comparison"
          sourcePath={PATH}
        />

        {/* ── EXPERIENCE COMPARISON ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">What You Will Experience</span>
            </div>
            <h2 className="med-h2">The Experience: <span>Expedition vs Summit</span></h2>

            <div className="med-split">
              <div className="med-card med-split-card">
                <div className="med-img-wrap">
                  <img src="/Images/trek/region/roopkund_lake.webp" alt="Roopkund glacial lake high altitude expedition" className="med-img" />
                </div>
                <div className="med-body-wrap">
                  <h3 className="med-h3">Roopkund — The Mystery Lake Expedition</h3>
                  <p className="med-body">Roopkund is a journey trek. The destination — the glacial lake at 4,800 metres with its mysterious ancient skeletal remains — is the goal, but the route itself is rich in terrain transitions. You cross Bedni Bugyal (one of India's largest alpine meadows), ascend through exposed high-altitude moraine, and navigate terrain that changes character every day.</p>
                  <p className="med-body">The challenge is cumulative: day after day above 3,500 metres. Roopkund tests endurance, altitude tolerance, and the ability to maintain morale across a week-long expedition in remote terrain.</p>
                </div>
              </div>
              <div className="med-card med-split-card">
                <div className="med-img-wrap">
                  <img src="/Images/trek/region/pangarchulla.webp" alt="Pangarchulla summit climb steep snow alpine" className="med-img" />
                </div>
                <div className="med-body-wrap">
                  <h3 className="med-h3">Pangarchulla — The Summit Climb</h3>
                  <p className="med-body">Pangarchulla is a peak trek. The first three days follow the scenic but non-technical Kuari Pass approach through forests and meadows. Then it diverges. Day five is summit day: a 3 AM alpine start from Khullara camp, a 700-metre climb through steep snow and scree, and arrival on a narrow peak with 360° views of the Nanda Devi Sanctuary.</p>
                  <p className="med-body">The challenge is concentrated. You use crampons. You carry a headlamp. You push through physical limits. The reward — standing on a true summit — is a fundamentally different feeling from reaching a lake or a pass.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FITNESS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Fitness Required</span>
            </div>
            <h2 className="med-h2">Fitness &amp; <span>Preparation Requirements</span></h2>

            <div className="med-split">
              <div className="med-card med-split-card" style={{ padding: '0' }}>
                <div className="med-body-wrap">
                  <h3 className="med-h3">For Roopkund — Build Stamina</h3>
                  <p className="med-body">6–8 weeks of structured preparation. Daily cardio (running, cycling, or swimming) for cardiovascular base. Weekend hill hikes with a 10–12 kg pack for trail-specific conditioning. Core strength work for stability on uneven terrain.</p>
                  <p className="med-body">The seven-day duration means your body must sustain effort across multiple consecutive days at altitude — <strong>stamina matters more than peak power.</strong></p>
                </div>
              </div>
              <div className="med-card med-split-card" style={{ padding: '0' }}>
                <div className="med-body-wrap">
                  <h3 className="med-h3">For Pangarchulla — Build Power</h3>
                  <p className="med-body">6–8 weeks of preparation with emphasis on explosive climbing power. Stairmaster sessions, hill repeats, and loaded pack training for the summit day. Single-day fitness matters more than multi-day stamina — you need to climb 700 metres in 4–5 hours at altitude after a 3 AM start.</p>
                  <p className="med-body"><strong>If you can power-hike 1,000 m elevation gain in under 3 hours at sea level with a pack, you are ready.</strong></p>
                </div>
              </div>
            </div>

            <div className="med-callout">
              <p className="med-body"><strong>Prior experience requirement for both:</strong> At least one completed trek above 4,000 metres. Comfort with cold-weather camping (sub-zero temperatures). Mental readiness for sustained physical exertion in thin air. If you have completed <Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal</Link> or <Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass</Link>, you have the altitude foundation — but both Roopkund and Pangarchulla require a meaningful step up in fitness and commitment.</p>
            </div>
          </div>
        </section>

        {/* ── ALTITUDE SAFETY ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Altitude &amp; Safety</span>
            </div>
            <h2 className="med-h2">Altitude &amp; <span>Safety Considerations</span></h2>
            <p className="med-body">
              Both treks operate well above 4,000 metres where Acute Mountain Sickness (AMS) risk is real.
            </p>

            <div className="med-split">
              <div className="med-card med-split-card" style={{ padding: '0' }}>
                <div className="med-body-wrap">
                  <h3 className="med-h3">Roopkund (4,800 m) — Gradual but High</h3>
                  <p className="med-body">The highest point in this comparison. You spend 2–3 days above 4,000 metres, which gives AMS more opportunity to develop. The altitude gain is gradual across the seven-day itinerary, which helps — but the final push to the lake at 4,800 m is the critical zone.</p>
                  <p className="med-body">Guided operators carry pulse oximeters and follow descent protocols if symptoms appear.</p>
                </div>
              </div>
              <div className="med-card med-split-card" style={{ padding: '0' }}>
                <div className="med-body-wrap">
                  <h3 className="med-h3">Pangarchulla (4,590 m) — Rapid Single-Day Gain</h3>
                  <p className="med-body">Lower maximum altitude, but the summit push involves rapid altitude gain on a single day (Khullara camp at ~3,870 m to summit at 4,590 m). The acclimatisation profile depends heavily on the rest day at Khullara.</p>
                  <p className="med-body">The combination of altitude, cold, and extreme exertion on summit day creates a unique physiological stress.</p>
                </div>
              </div>
            </div>

            <div className="med-callout">
              <p className="med-body"><strong>Both treks:</strong> Diamox prophylaxis may be recommended by your physician. Hydration (3–4 litres daily above 3,500 m), gradual ascent, and willingness to turn back if symptoms worsen are non-negotiable safety principles. Choose guided operators with certified trek leaders and emergency communication equipment.</p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Challenging Trek"
          subtext="Experienced trekker? Tell us your altitude history and we will recommend the right route."
          vertical="trek"
          category="comparison"
          sourcePath={PATH}
        />

        {/* ── SEASONS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">When to Go</span>
            </div>
            <h2 className="med-h2">Season &amp; <span>Weather</span></h2>

            <div className="med-season-card">
              <span className="med-label">Roopkund · Two Windows</span>
              <p className="med-body"><strong>Pre-monsoon (May–June)</strong> offers warmer conditions but more afternoon cloud. <strong>Post-monsoon (September–October)</strong> delivers sharper visibility and fewer trekkers. The monsoon gap (July–August) makes Roopkund entirely unavailable for a quarter of the year.</p>
            </div>
            <div className="med-season-card">
              <span className="med-label">Pangarchulla · Single Window — March to May Only</span>
              <p className="med-body">March and early April offer consolidated snow for the summit — the best conditions for crampon grip. Late April and May are warmer but the snow line rises, potentially exposing loose scree on the summit approach. The trek is not viable in monsoon, post-monsoon, or winter.</p>
            </div>
            <div className="med-season-card" style={{ marginBottom: 0 }}>
              <span className="med-label">Overlap · May Only</span>
              <p className="med-body">May is the only month where both are available. If you have a fixed May window and are deciding between them, the choice reduces to: do you want a week-long expedition to a mystery lake, or a summit climb with a concentrated challenge?</p>
            </div>
          </div>
        </section>

        {/* ── WHO SHOULD CHOOSE ── */}
        <section id="choose" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decision Guide</span>
            </div>
            <h2 className="med-h2">Who Should <span>Choose Which</span></h2>

            <div className="med-choose-grid">
              <div className="med-card med-choose-card">
                <h3 className="med-h3">Choose Roopkund if:</h3>
                <ul>
                  <li>You want an extended expedition experience (7 days on trail)</li>
                  <li>You are drawn to iconic destinations (the mystery lake)</li>
                  <li>Your fitness favours sustained endurance over explosive power</li>
                  <li>You prefer pre-monsoon or post-monsoon seasons</li>
                  <li>You have completed at least one trek above 4,000 m</li>
                </ul>
              </div>
              <div className="med-card med-choose-card">
                <h3 className="med-h3">Choose Pangarchulla if:</h3>
                <ul>
                  <li>You want a true summit experience (standing on a peak)</li>
                  <li>You thrive on concentrated, high-intensity challenges</li>
                  <li>You are comfortable with crampons, alpine starts, and steep snow</li>
                  <li>You prefer a spring trekking window (March–May)</li>
                  <li>You have completed Kuari Pass or equivalent and want the next step</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROGRESSION PATH ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Garhwal Ladder</span>
            </div>
            <h2 className="med-h2">The Garhwal <span>Progression</span></h2>
            <p className="med-body">
              Both Roopkund and Pangarchulla sit at the top of the Garhwal difficulty spectrum. The natural progression for most trekkers through the region looks like this:
            </p>

            <div className="med-progression" style={{ marginTop: '1.5rem' }}>
              <div className="med-progression-item">
                <span className="med-num">1</span>
                <p className="med-body"><strong><Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal</Link></strong> (Moderate, 3,850 m) — winter snow trek introduction</p>
              </div>
              <div className="med-progression-item">
                <span className="med-num">2</span>
                <p className="med-body"><strong><Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass</Link></strong> (Moderate, 3,876 m) — panoramic ridge walk</p>
              </div>
              <div className="med-progression-item">
                <span className="med-num">3</span>
                <p className="med-body"><strong><Link href="/treks/location/lohajung/roopkund-trek">Roopkund</Link></strong> (Challenging, 4,800 m) — extended high-altitude expedition</p>
              </div>
              <div className="med-progression-item" style={{ borderBottom: 'none' }}>
                <span className="med-num">4</span>
                <p className="med-body"><strong><Link href="/treks/location/joshimath/pangarchulla-trek">Pangarchulla</Link></strong> (Challenging, 4,590 m) — true summit experience</p>
              </div>
            </div>

            <p className="med-body" style={{ marginTop: '1rem' }}>
              You do not need to follow this order rigidly, but each trek builds skills and altitude confidence that the next one demands. See our <Link href="/treks/garhwal-himalayas">Garhwal Himalayas trekking guide</Link> for the full picture.
            </p>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Trek"
          subtext="Share your altitude history and preferred dates. We will recommend the right route."
          vertical="trek"
          category="comparison"
          sourcePath={PATH}
        />

        {/* ── FAQ ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
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

        {/* ── EXPLORE MORE ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
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
              <Link href="/treks/best-treks-in-uttarakhand/challenging" className="med-nav-link">
                <span>Challenging Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/best-treks-in-uttarakhand/high-altitude" className="med-nav-link">
                <span>High-Altitude Treks Above 4,000 m</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/garhwal-himalayas" className="med-nav-link">
                <span>Garhwal Himalayas Trekking Guide</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/garhwal-himalayas/fitness-guide" className="med-nav-link">
                <span>8-Week Fitness Preparation Plan</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/garhwal-himalayas/packing-checklist" className="med-nav-link">
                <span>Packing Checklist — Print-Ready Gear List</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/brahmatal-vs-kuari-pass" className="med-nav-link">
                <span>Moderate Garhwal Treks: Brahmatal vs Kuari Pass</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/location/lohajung" className="med-nav-link">
                <span>All treks from Lohajung</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/location/joshimath" className="med-nav-link" style={{ borderBottom: 'none' }}>
                <span>All treks from Joshimath</span>
                <span className="med-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <div className="med-trek-footer">
          <Link href="/treks">← All Treks</Link>
          <Link href="/treks/best-treks-in-uttarakhand">Best Treks in Uttarakhand</Link>
          <Link href="/treks/garhwal-himalayas">Garhwal Himalayas</Link>
          <Link href="/treks/location/lohajung">Lohajung Treks</Link>
          <Link href="/treks/location/joshimath">Joshimath Treks</Link>
        </div>

      </article>
    </TrackedPage>
  );
}
