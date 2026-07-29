import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
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

const PATH = '/treks/best-treks-in-uttarakhand/snow';
const PARENT_PATH = '/treks/winter-treks-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Snow Treks in Uttarakhand | Retreats And Treks',
    description:
      'The 3 best snow treks in Uttarakhand for winter 2024–25. Brahmatal, Kedarkantha, and Kuari Pass ranked by snow conditions, difficulty, and experience required.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Best Snow Treks in Uttarakhand — Winter Himalayan Adventure',
      description:
        'Curated selection of winter snow treks in Uttarakhand covering December to March routes with varying difficulty levels.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Best Snow Treks in Uttarakhand'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'When is the best time for snow treks in Uttarakhand?',
    answer:
      'December to March offers the best snow conditions. January and February deliver peak snow depth — Kedarkantha and Brahmatal trails are fully snow-covered above 3,000 m. Early December and late March can have patchy snow at lower elevations.',
  },
  {
    question: 'Which snow trek is easiest for first-timers?',
    answer:
      'Brahmatal is the easiest snow trek. At 4 days duration with moderate difficulty and no technical sections, it provides a complete snow trekking experience (frozen lake, snow ridges, summit views) without the steep summit push required on Kedarkantha.',
  },
  {
    question: 'Do I need crampons or ice axes for snow treks?',
    answer:
      'Microspikes or basic crampons are recommended for Kedarkantha summit day (steep snow above 3,500 m). Brahmatal can be done with gaiters and good trekking boots. Kuari Pass in March needs gaiters for upper snow sections. Trek operators typically provide microspikes if needed.',
  },
  {
    question: 'How cold does it get on winter treks in Uttarakhand?',
    answer:
      'Night temperatures at camp drop to -5°C to -15°C depending on altitude and month. January is coldest. Daytime on trail with sun is typically 0°C to 5°C. A proper 4-layer system (base, insulation, fleece, shell) plus a -15°C sleeping bag is essential.',
  },
];

const BREADCRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Treks', href: '/treks' },
  { name: 'Best Treks in Uttarakhand', href: PARENT_PATH },
  { name: 'Snow Treks' },
];

export default function SnowTreksPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Best Treks in Uttarakhand', url: buildCanonicalUrl(PARENT_PATH) },
    { name: 'Snow Treks', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  // Split heading for green last word
  const h1Words = "Best Snow Treks in Uttarakhand".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Best Snow Treks in Uttarakhand — Winter Himalayan Adventure"
        description="Curated selection of winter snow treks in Uttarakhand covering December to March routes with varying difficulty levels."
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

        .med-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .med-list-item { display: grid; grid-template-columns: 1.9rem 1fr; gap: 0.9rem; }
        .med-list-dot { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid rgba(15,118,110,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .med-list-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; }
        .med-list-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #4b5259; font-weight: 400; }
        .med-list-text strong { color: #2B2A26; font-weight: 600; }

        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; padding-bottom: 0.5rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-hero-section {
          position: relative;
          overflow: hidden;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(15,118,110,0.12);
        }
        .med-hero-section .med-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(4,12,10,0.88) 0%, rgba(4,12,10,0.5) 50%, rgba(4,12,10,0.82) 100%);
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
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 1.1rem;
          line-height: 1.05;
          text-shadow: 0 3px 24px rgba(0,0,0,0.5);
        }
        .med-hero-section .med-hero-content .med-h1 span {
          color: #5eead4;
        }
        .med-hero-section .med-hero-content .med-body {
          max-width: 46rem;
          margin: 0 auto 1.5rem;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.88);
          text-shadow: 0 2px 20px rgba(0,0,0,0.6);
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
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          padding: 0.35rem 0.9rem;
          background: rgba(15,118,110,0.2);
          backdrop-filter: blur(8px);
        }
        .med-hero-section .med-hero-content .med-hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .med-section-padding { padding: 4rem 0; }
        .med-section-padding-sm { padding: 3rem 0; }

        /* ── Snow Card Styles ── */
        .med-snow-card {
          padding: 0;
          overflow: hidden;
          transition: all 0.35s ease;
          margin-bottom: 1.75rem;
        }
        .med-snow-card:last-child { margin-bottom: 0; }
        .med-snow-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(15,118,110,0.08);
        }
        .med-snow-card .med-snow-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
        }
        .med-snow-card .med-snow-body {
          padding: 1.75rem 2rem 2rem;
        }
        .med-snow-card .med-h3 {
          font-size: 1.1rem;
          margin-bottom: 0.3rem;
        }
        .med-snow-card .med-h3 a {
          color: #0f766e;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.3s;
        }
        .med-snow-card .med-h3 a:hover {
          color: #0d6b64;
          text-decoration: underline;
        }
        .med-snow-card .med-body {
          font-size: 0.92rem;
          margin-bottom: 0.75rem;
        }
        .med-snow-card .med-body:last-child {
          margin-bottom: 0;
        }
        .med-snow-card .med-snow-tag {
          display: inline-block;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #0f766e;
          background: rgba(15,118,110,0.08);
          padding: 0.2rem 0.7rem;
          border-radius: 999px;
          margin-bottom: 0.5rem;
        }
        .med-snow-card .med-snow-conditions {
          background: #f0faf8;
          padding: 1rem 1.25rem;
          border-radius: 12px;
          margin-top: 0.75rem;
          border-left: 3px solid #0f766e;
        }
        .med-snow-card .med-snow-conditions .med-body {
          font-size: 0.88rem;
          margin-bottom: 0;
          color: #4b5259;
        }

        .med-snow-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem 0.75rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          color: #6b7280;
          margin-bottom: 0.65rem;
        }
        .med-snow-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .med-snow-meta-pill::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #0f766e;
          display: inline-block;
        }

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
        .med-badge-moderate {
          background: rgba(15,118,110,0.08);
          color: #0f766e;
        }
        .med-badge-moderate-challenging {
          background: rgba(230,81,0,0.08);
          color: #c45000;
        }

        .med-snow-link {
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
        .med-snow-link:hover {
          color: #0d6b64;
          text-decoration: underline;
        }

        .med-snow-callout {
          padding: 1.25rem 1.5rem;
          background: #fff;
          border: 1px solid rgba(15,118,110,0.08);
          border-left: 4px solid #0f766e;
          border-radius: 12px;
          transition: all 0.3s;
          margin-top: 1.5rem;
        }
        .med-snow-callout:hover {
          border-color: rgba(15,118,110,0.2);
          box-shadow: 0 4px 16px rgba(15,118,110,0.04);
        }
        .med-snow-callout .med-body { margin: 0; }
        .med-snow-callout .med-body a {
          color: #0f766e;
          font-weight: 500;
          text-decoration: none;
        }
        .med-snow-callout .med-body a:hover {
          text-decoration: underline;
        }

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
        .med-table td a {
          color: #0f766e;
          font-weight: 500;
          text-decoration: none;
        }
        .med-table td a:hover {
          text-decoration: underline;
        }

        /* ── Gear Grid ── */
        .med-gear-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        @media (max-width: 720px) {
          .med-gear-grid {
            grid-template-columns: 1fr;
          }
        }
        .med-gear-card {
          padding: 1.25rem 1.5rem;
          border: 1px solid rgba(15,118,110,0.08);
          border-radius: 12px;
          background: #fff;
          transition: all 0.3s ease;
        }
        .med-gear-card:hover {
          border-color: rgba(15,118,110,0.2);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(15,118,110,0.06);
        }
        .med-gear-card .med-h3 {
          font-size: 0.9rem;
          margin-bottom: 0.3rem;
        }
        .med-gear-card .med-body {
          font-size: 0.85rem;
          margin-bottom: 0;
        }

        .med-snow-footer {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1.5rem;
          justify-content: center;
          padding: 2rem 0 4rem;
          border-top: 1px solid rgba(15,118,110,0.08);
          margin-top: 2rem;
        }
        .med-snow-footer a {
          color: #0f766e;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.3s;
        }
        .med-snow-footer a:hover {
          color: #0d6b64;
          text-decoration: underline;
        }

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
        .med-faq-details:hover {
          border-color: rgba(15,118,110,0.25);
          box-shadow: 0 4px 16px rgba(15,118,110,0.04);
        }
        .med-faq-details[open] {
          border-color: rgba(15,118,110,0.3);
        }
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
        .med-faq-summary::-webkit-details-marker {
          display: none;
        }
        .med-faq-summary:hover {
          background: rgba(15,118,110,0.02);
        }
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
        .med-faq-details[open] .med-faq-icon {
          transform: rotate(45deg);
        }
        .med-faq-icon svg {
          width: 20px;
          height: 20px;
          stroke-width: 2;
          transition: stroke-width 0.2s ease;
        }
        .med-faq-summary:hover .med-faq-icon svg {
          stroke-width: 2.5;
        }
        .med-faq-answer {
          padding: 0 1.5rem 1.5rem;
          animation: med-faq-slide 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes med-faq-slide {
          0% {
            opacity: 0;
            transform: translateY(-12px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .med-faq-answer .med-body {
          margin: 0;
          font-size: 0.92rem;
          color: #4b5259;
        }

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
        .med-nav-link:last-child {
          border-bottom: none;
        }
        .med-nav-link:hover {
          background: #f7f9f7;
          color: #0f766e;
        }
        .med-nav-link .med-arrow {
          color: #0f766e;
          font-size: 0.8rem;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb items={BREADCRUMBS} />
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>
                Winter Trekking · Uttarakhand
              </span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Winter transforms the Uttarakhand Himalaya — frozen lakes, snow-laden conifer forests, and summit ridges under continuous white. The snow trekking season runs December to March, with January and February delivering peak conditions. Three featured routes offer distinctly different winter experiences, from a gentle frozen-lake walk to a proper summit push through deep snow.
            </p>
            <div className="med-hero-tags">
              <span>Brahmatal</span>
              <span>Kedarkantha</span>
              <span>Kuari Pass</span>
              <span>Dec–Mar</span>
            </div>
            <div className="med-hero-actions">
              <a href="#treks" className="med-cta-btn">View Treks</a>
              <a href="#compare" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Compare Options</a>
            </div>
          </div>
        </section>

        {/* ── INTRO CALLOUT ── */}
        <section className="med-shell med-section-white med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-snow-callout">
              <p className="med-body">
                <strong>First snow trek?</strong> Choose <Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal</Link> — frozen lake, snow ridges, moderate difficulty. No crampons needed.
                <br />
                <strong>Want a summit?</strong> Choose <Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha</Link> — deep-snow summit views across six Himalayan ranges.
                <br /><br />
                <span style={{ fontSize: '0.92rem', color: '#6b7280' }}>
                  These routes are drawn from our <Link href={PARENT_PATH}>complete ranking of the 10 best treks in Uttarakhand</Link>.
                  For non-winter routes, see the <Link href={`${PARENT_PATH}/beginner`}>beginner treks</Link> and <Link href={`${PARENT_PATH}/high-altitude`}>high-altitude treks</Link> filter pages.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* ── TREK CARDS ── */}
        <section id="treks" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Featured Snow Treks</span>
            </div>
            <h2 className="med-h2">Three Routes, <span>Three Winter Experiences</span></h2>

            {/* Brahmatal */}
            <div className="med-card med-snow-card">
              <img src="/Images/trek/snow/bramhatal.webp" alt="Brahmatal snow trek — frozen alpine lake in Garhwal Himalaya" className="med-snow-img" />
              <div className="med-snow-body">
                <span className="med-snow-tag">First Snow</span>
                <h3 className="med-h3"><Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal — The Ideal First Snow Trek</Link></h3>
                <div className="med-snow-meta">
                  <span className="med-snow-meta-pill">3,850 m</span>
                  <span className="med-snow-meta-pill"><span className="med-badge med-badge-moderate">Moderate</span></span>
                  <span className="med-snow-meta-pill">4 days</span>
                  <span className="med-snow-meta-pill">Dec–Mar</span>
                  <span className="med-snow-meta-pill">Lohajung, Garhwal</span>
                </div>
                <p className="med-body">
                  <Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal</Link> is the snow trek most often recommended for first-time winter trekkers — and for good reason. A 4-day route from Lohajung through snow-covered rhododendron forest to a frozen alpine lake at 3,850 m, with continuous Trishul and Nanda Ghunti views from the upper ridges. No technical sections, no exposed scrambles, no crampons needed. The shorter 4-day duration also limits cold-weather exposure, which is the real challenge of winter trekking for beginners.
                </p>
                <div className="med-snow-conditions">
                  <p className="med-body"><strong style={{ color: '#0f766e' }}>Snow conditions:</strong> Above 3,000 m, expect 1–3 feet of packed snow from mid-December. The trail through snow-covered forest is visually stunning and the frozen lake itself — with mountain reflections visible through ice — is the signature moment. January and February offer the deepest snow.</p>
                </div>
                <Link href="/treks/location/lohajung/brahmatal-trek" className="med-snow-link">View full trek details →</Link>
              </div>
            </div>

            {/* Kedarkantha */}
            <div className="med-card med-snow-card">
              <img src="/Images/trek/snow/kedarkantha.webp" alt="Kedarkantha summit — winter snow trek from Sankri" className="med-snow-img" />
              <div className="med-snow-body">
                <span className="med-snow-tag">Summit</span>
                <h3 className="med-h3"><Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha — The Quintessential Winter Summit</Link></h3>
                <div className="med-snow-meta">
                  <span className="med-snow-meta-pill">3,810 m</span>
                  <span className="med-snow-meta-pill"><span className="med-badge med-badge-moderate-challenging">Moderate–Challenging</span></span>
                  <span className="med-snow-meta-pill">5 days</span>
                  <span className="med-snow-meta-pill">Dec–Feb</span>
                  <span className="med-snow-meta-pill">Sankri</span>
                </div>
                <p className="med-body">
                  <Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha</Link> is the most popular winter trek in India — the definitive first summit experience in deep snow. A 5-day route from Sankri with a final summit push that gains 1,500 feet through knee-deep snow to a 3,810 m peak offering 360-degree views across six Himalayan ranges. More physically demanding than Brahmatal, with a proper summit-day challenge that separates it from a standard snow walk.
                </p>
                <div className="med-snow-conditions">
                  <p className="med-body"><strong style={{ color: '#0f766e' }}>Snow conditions:</strong> Deep snow above 3,200 m from December. The summit push is the centrepiece — a steep, sustained climb through snow that requires microspikes and genuine effort. Sunrise from the snow-covered peak is the most photographed moment in Indian winter trekking.</p>
                </div>
                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <Link href="/treks/location/sankri/kedarkantha-trek" className="med-snow-link">View full trek details →</Link>
                  <Link href="/treks/kedarkantha-vs-har-ki-dun" className="med-snow-link">Kedarkantha vs Har Ki Dun →</Link>
                </div>
              </div>
            </div>

            {/* Kuari Pass */}
            <div className="med-card med-snow-card">
              <img src="/Images/trek/snow/kuari.webp" alt="Kuari Pass March — snow and spring on the Curzon Trail" className="med-snow-img" />
              <div className="med-snow-body">
                <span className="med-snow-tag">Snow + Spring</span>
                <h3 className="med-h3"><Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass (March) — Snow Meets Spring</Link></h3>
                <div className="med-snow-meta">
                  <span className="med-snow-meta-pill">3,876 m</span>
                  <span className="med-snow-meta-pill"><span className="med-badge med-badge-moderate">Moderate</span></span>
                  <span className="med-snow-meta-pill">5 days</span>
                  <span className="med-snow-meta-pill">March</span>
                  <span className="med-snow-meta-pill">Joshimath, Garhwal</span>
                </div>
                <p className="med-body">
                  <Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass</Link> in early March sits at the intersection of winter and spring — significant snow remains on the upper sections while rhododendrons begin blooming on the lower trail. Not a pure deep-snow trek like Kedarkantha, but the combination of lingering snow, spring colour, and the famous Curzon Trail ridge walk creates the most photogenic window of any featured route.
                </p>
                <div className="med-snow-conditions">
                  <p className="med-body"><strong style={{ color: '#0f766e' }}>Snow conditions:</strong> Upper sections (above 3,400 m) retain 1–2 feet of snow through mid-March. Lower trail transitions from snow to mud to dry trail as spring advances. The ridge walk with snow underfoot and Nanda Devi views is the highlight.</p>
                </div>
                <Link href="/treks/location/joshimath/kuari-pass-trek" className="med-snow-link">View full trek details →</Link>
              </div>
            </div>

            <div className="med-snow-callout">
              <p className="med-body">
                <strong>Choosing between Kedarkantha and Har Ki Dun from Sankri?</strong>{' '}
                Both leave from the same base town but deliver opposite experiences.{' '}
                <Link href="/treks/kedarkantha-vs-har-ki-dun">See the full Kedarkantha vs Har Ki Dun comparison →</Link>
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          
          label="Book a Winter Trek"
          subtext="Share your preferred dates — we will confirm snow conditions and availability."
          vertical="trek"
          category="filter-snow"
          sourcePath={PATH}
        />

        {/* ── COMPARISON TABLE ── */}
        <section id="compare" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">At a Glance</span>
            </div>
            <h2 className="med-h2">Snow Treks <span>at a Glance</span></h2>

            <div className="med-table-wrap">
              <table className="med-table">
                <thead>
                  <tr>
                    <th>Trek</th>
                    <th>Altitude</th>
                    <th>Difficulty</th>
                    <th>Days</th>
                    <th>Peak Snow</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { href: '/treks/location/lohajung/brahmatal-trek', name: 'Brahmatal', alt: '3,850 m', diff: 'Moderate', days: '4', snow: 'Jan–Feb' },
                    { href: '/treks/location/sankri/kedarkantha-trek', name: 'Kedarkantha', alt: '3,810 m', diff: 'Moderate–Challenging', days: '5', snow: 'Dec–Feb' },
                    { href: '/treks/location/joshimath/kuari-pass-trek', name: 'Kuari Pass', alt: '3,876 m', diff: 'Moderate', days: '5', snow: 'Mar (lingering)' },
                  ].map((row) => {
                    const isModerateChallenging = row.diff === 'Moderate–Challenging';
                    return (
                      <tr key={row.href}>
                        <td><Link href={row.href}>{row.name}</Link></td>
                        <td>{row.alt}</td>
                        <td>
                          <span className={`med-badge ${isModerateChallenging ? 'med-badge-moderate-challenging' : 'med-badge-moderate'}`}>
                            {row.diff}
                          </span>
                        </td>
                        <td>{row.days}</td>
                        <td>{row.snow}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── GEAR ESSENTIALS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Gear & Preparation</span>
            </div>
            <h2 className="med-h2">Winter <span>Gear Essentials</span></h2>
            <p className="med-body">
              Snow trekking demands specific gear beyond standard 3-season equipment. The critical additions: waterproof shell layers (jacket + pants), insulated gloves with waterproof outers, gaiters to keep snow out of boots, microspikes for icy sections, and a sleeping bag rated to -15°C minimum.
            </p>

            <div className="med-gear-grid">
              <div className="med-gear-card">
                <h3 className="med-h3">Layering System</h3>
                <p className="med-body">Base layer, insulation, fleece, and waterproof shell. A -15°C sleeping bag is essential for cold nights.</p>
              </div>
              <div className="med-gear-card">
                <h3 className="med-h3">Snow Gear</h3>
                <p className="med-body">Gaiters to keep snow out of boots. Microspikes for icy sections. Trek operators typically provide microspikes if needed.</p>
              </div>
              <div className="med-gear-card">
                <h3 className="med-h3">Cold Weather</h3>
                <p className="med-body">Insulated gloves with waterproof outers. Thermal socks. Neck warmer. Night temperatures drop to -5°C to -15°C.</p>
              </div>
            </div>

            <p className="med-body" style={{ marginTop: '1.5rem' }}>
              Our <Link href="/treks/garhwal-himalayas/packing-checklist">print-ready packing checklist</Link> includes a winter-specific section covering all snow trek gear.
              For fitness preparation targeting winter conditions, see the <Link href="/treks/garhwal-himalayas/fitness-guide">8-week fitness guide</Link>.
            </p>
          </div>
        </section>

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

        {/* ── BROWSE BY CATEGORY ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Browse by Category</span>
            </div>
            <h2 className="med-h2">Browse <span>by Category</span></h2>

            <div className="med-nav-group">
              <Link href={PARENT_PATH} className="med-nav-link">
                <span>All 10 Best Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href={`${PARENT_PATH}/beginner`} className="med-nav-link">
                <span>Beginner Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href={`${PARENT_PATH}/high-altitude`} className="med-nav-link">
                <span>High-Altitude Treks Above 4,000 m</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href={`${PARENT_PATH}/challenging`} className="med-nav-link" style={{ borderBottom: 'none' }}>
                <span>Challenging Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <div className="med-snow-footer">
          <Link href="/treks">← All Treks</Link>
          <Link href={PARENT_PATH}>Best Treks in Uttarakhand</Link>
          <Link href="/treks/trek-near-delhi">Weekend Treks Near Delhi</Link>
          <Link href="/treks/location/sankri">Sankri Treks</Link>
        </div>

      </article>
    </TrackedPage>
  );
}
