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

const PATH = '/treks/brahmatal-vs-kuari-pass';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Brahmatal vs Kuari Pass — Which Garhwal Trek Should You Choose? | Retreats And Treks',
    description:
      'Brahmatal vs Kuari Pass trek comparison by altitude, difficulty, views, season, duration, and cost for these moderate Garhwal routes.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Brahmatal vs Kuari Pass — Moderate Garhwal Trek Comparison',
      description:
        'Frozen lake vs panoramic ridge. Compare altitude, season, difficulty & views for the two best moderate treks in the Garhwal Himalayas.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Brahmatal vs Kuari Pass — Moderate Garhwal Trek Comparison'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is easier — Brahmatal or Kuari Pass?',
    answer:
      'Both are rated moderate difficulty. Brahmatal reaches 3,850 m over 4 days (22 km), while Kuari Pass reaches 3,876 m over 5 days (30 km). The altitude and difficulty are nearly identical. The main difference is duration — Kuari Pass covers more ground over an extra day, spreading the effort more evenly. Neither requires technical skills.',
  },
  {
    question: 'Can I do Brahmatal and Kuari Pass in one trip?',
    answer:
      'Not easily. Brahmatal is a winter trek (December–March) from Lohajung, while Kuari Pass is best in spring (March–May) or autumn (October–November) from Joshimath. The only overlap is March, when both are theoretically possible but the logistics (different base towns, 6+ hours apart by road) make back-to-back trips impractical. Most trekkers do them in separate trips.',
  },
  {
    question: 'Which trek has better views?',
    answer:
      'Kuari Pass is widely considered the better panoramic trek — the ridge walk offers near-continuous views of Nanda Devi, Dronagiri, Chaukhamba, and Kamet across multiple days. Brahmatal\'s views are concentrated around the summit ridge and lake campsite, with Trishul and Nanda Ghunti as the signature peaks. Kuari Pass wins on breadth of views; Brahmatal wins on the unique frozen lake experience.',
  },
  {
    question: 'Which is better for a first Garhwal trek?',
    answer:
      'Either works well as a first Garhwal experience. If you want a winter snow trek and enjoy camping by a frozen lake, choose Brahmatal. If you want the widest possible Himalayan panorama in comfortable spring or autumn weather, choose Kuari Pass. Both are well-supported by guided operators and suitable for first-time high-altitude trekkers with basic fitness.',
  },
  {
    question: 'How do I reach the starting points?',
    answer:
      'Brahmatal starts from Lohajung (10 hours from Rishikesh via Karnaprayag). Kuari Pass starts from Joshimath (9–10 hours from Rishikesh via Rudraprayag). Both are accessed by road from Rishikesh or Haridwar. Joshimath has better road infrastructure and more frequent bus services due to its position on the Badrinath pilgrim route.',
  },
];

const COMPARISON_ROWS = [
  { label: 'Base Town', brahmatal: 'Lohajung (2,350 m)', kuari: 'Joshimath (1,875 m)' },
  { label: 'Max Altitude', brahmatal: '3,850 m', kuari: '3,876 m' },
  { label: 'Distance', brahmatal: '22 km', kuari: '30 km' },
  { label: 'Duration', brahmatal: '4 days', kuari: '5 days' },
  { label: 'Difficulty', brahmatal: 'Moderate', kuari: 'Moderate' },
  { label: 'Best Season', brahmatal: 'Dec–Mar (winter)', kuari: 'Mar–May, Oct–Nov' },
  { label: 'Signature', brahmatal: 'Frozen alpine lake', kuari: 'Continuous ridge panorama' },
  { label: 'Key Peaks', brahmatal: 'Trishul, Nanda Ghunti', kuari: 'Nanda Devi, Dronagiri, Chaukhamba' },
];

export default function BrahmatalVsKuariPassPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Garhwal Himalayas', url: buildCanonicalUrl('/treks/garhwal-himalayas') },
    { name: 'Brahmatal vs Kuari Pass', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Brahmatal vs Kuari Pass — Which Garhwal Trek Should You Choose?',
    description:
      'Frozen lake vs panoramic ridge. Compare altitude, season, difficulty & views for the two best moderate treks in the Garhwal Himalayas.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Brahmatal vs Kuari Pass".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Brahmatal vs Kuari Pass — Which Garhwal Trek Should You Choose?"
        description="Frozen lake vs panoramic ridge. Compare altitude, season, difficulty & views for the two best moderate treks in the Garhwal Himalayas."
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

        /* ── Page specific styles ── */
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

        /* Comparison Table */
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
        .med-table td:first-child { font-weight: 600; color: #2B2A26; width: 25%; }

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

        /* Split Cards */
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

        /* Season Cards */
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

        /* Choose Grid */
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
              { name: 'Garhwal Himalayas', href: '/treks/garhwal-himalayas' },
              { name: 'Brahmatal vs Kuari Pass' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Trek Comparison · Garhwal Himalayas</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Which Garhwal trek should you choose? The frozen lake winter trek from Lohajung, or the panoramic ridge walk from Joshimath? Both are moderate, both are accessible, but the experience is fundamentally different.
            </p>
            <div className="med-hero-tags">
              <span>Brahmatal</span>
              <span>Kuari Pass</span>
              <span>Moderate Difficulty</span>
              <span>Compare & Choose</span>
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
              <Link href="/treks/best-treks-in-uttarakhand/beginner">Beginner Treks</Link>
              <span className="med-sep">→</span>
              <span>Brahmatal vs Kuari Pass</span>
            </div>

            <div className="med-card med-pick-card" style={{ marginBottom: '0.75rem' }}>
              <div className="med-label">Frozen Lake · 4 days · 3,850 m · Dec–Mar</div>
              <p className="med-body"><strong><Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal Trek</Link></strong> — Winter snow trek from Lohajung. Frozen alpine lake, Trishul views.</p>
            </div>
            <div className="med-card med-pick-card">
              <div className="med-label">Panoramic Ridge · 5 days · 3,876 m · Mar–May, Oct–Nov</div>
              <p className="med-body"><strong><Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass Trek</Link></strong> — Lord Curzon Trail from Joshimath. Nanda Devi panorama across multiple days.</p>
            </div>

            <p className="med-body" style={{ marginTop: '1.5rem' }}>
              The <Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal Trek</Link> and the <Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass Trek</Link> are the two premier moderate-difficulty treks in the <Link href="/treks/garhwal-himalayas">Garhwal Himalaya region</Link>. Both stay below 4,000 metres, both are accessible to first-time high-altitude trekkers, and both deliver exceptional Himalayan scenery. Yet they are fundamentally different experiences — different seasons, different base towns, different signature landscapes.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              This comparison breaks down the real differences to help you choose the right Garhwal trek for your experience level, preferred season, and the kind of mountain encounter you are looking for. Both routes feature in our <Link href="/treks/best-treks-in-uttarakhand">best treks in Uttarakhand</Link> guide as top beginner-friendly options across the state.
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
            <h2 className="med-h2">Brahmatal vs Kuari Pass <span>at a Glance</span></h2>

            <div className="med-table-wrap">
              <table className="med-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Brahmatal</th>
                    <th>Kuari Pass</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr key={i}>
                      <td>{row.label}</td>
                      <td>
                        {row.label === 'Base Town' ? (
                          <><Link href="/treks/location/lohajung">Lohajung</Link> (2,350 m)</>
                        ) : (
                          row.brahmatal
                        )}
                      </td>
                      <td>
                        {row.label === 'Base Town' ? (
                          <><Link href="/treks/location/joshimath">Joshimath</Link> (1,875 m)</>
                        ) : (
                          row.kuari
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
          subtext="Not sure which trek fits you? Share your dates and experience — we will recommend the right route."
          vertical="trek"
          category="comparison"
          sourcePath={PATH}
        />

        {/* ── EXPERIENCE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">What You Will Experience</span>
            </div>
            <h2 className="med-h2">The Experience: <span>What Each Trek Feels Like</span></h2>

            <div className="med-split">
              <div className="med-card med-split-card">
                <div className="med-img-wrap">
                  <img src="/Images/trek/begineertrek/bramhatal.webp" alt="Brahmatal frozen alpine lake in winter" className="med-img" />
                </div>
                <div className="med-body-wrap">
                  <h3 className="med-h3">Brahmatal — The Frozen Lake Winter Trek</h3>
                  <p className="med-body">Brahmatal is a winter trek. You walk through snow-laden oak and rhododendron forest, camp on snow-covered clearings, and reach a frozen alpine lake at 3,850 metres. The landscape is white, silent, and dramatic. Night temperatures drop to −10°C at camp.</p>
                  <p className="med-body">The signature moment is arriving at Brahmatal Lake — a frozen sheet of ice surrounded by snow ridges with the Trishul massif rising behind. It is a visual that exists only in winter.</p>
                </div>
              </div>
              <div className="med-card med-split-card">
                <div className="med-img-wrap">
                  <img src="/Images/trek/begineertrek/kuari.webp" alt="Kuari Pass ridge walk with Nanda Devi panorama" className="med-img" />
                </div>
                <div className="med-body-wrap">
                  <h3 className="med-h3">Kuari Pass — The Panoramic Ridge Walk</h3>
                  <p className="med-body">Kuari Pass is a ridge trek. Instead of walking toward a single destination, you walk along a high ridge with the Himalayan range arrayed before you for days. Nanda Devi (7,816 m), Dronagiri, Chaukhamba, Kamet — the entire Nanda Devi Sanctuary unfolds to your north.</p>
                  <p className="med-body">In spring, rhododendrons bloom. In autumn, the forests turn gold and the peaks appear almost three-dimensional. The descent via Auli adds variety that Brahmatal's out-and-back structure does not offer.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SEASONS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">When to Go</span>
            </div>
            <h2 className="med-h2">When to Go: <span>The Season Question</span></h2>
            <p className="med-body">
              This is the most important differentiator. The two treks occupy almost entirely different seasonal windows:
            </p>

            <div className="med-season-card">
              <span className="med-label">Brahmatal · December to March</span>
              <p className="med-body">This is exclusively a <Link href="/treks/best-treks-in-uttarakhand/snow">winter trek</Link>. The frozen lake and snow ridges that define the experience only exist in winter. Doing Brahmatal in summer misses the point entirely.</p>
            </div>
            <div className="med-season-card">
              <span className="med-label">Kuari Pass · March–May &amp; October–November</span>
              <p className="med-body">March to May (spring) and October to November (autumn) are the prime windows. Kuari Pass can be done in winter with snow gear, but it is fundamentally a <Link href="/treks/summer-treks-uttarakhand">spring/summer and autumn trek</Link>.</p>
            </div>
            <div className="med-season-card" style={{ marginBottom: 0 }}>
              <span className="med-label">Practical Implication</span>
              <p className="med-body"><strong>March</strong> is the only month where both are theoretically viable. <strong>Your travel dates will often make this decision for you.</strong> Planning December–February? Brahmatal. Planning April, May, October, or November? Kuari Pass.</p>
            </div>
          </div>
        </section>

        {/* ── DIFFICULTY ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Effort Required</span>
            </div>
            <h2 className="med-h2">Difficulty <span>Comparison</span></h2>
            <p className="med-body">
              Both treks are rated moderate, and on paper they look almost identical. But the effort profile differs:
            </p>

            <div className="med-split">
              <div className="med-card med-split-card" style={{ padding: '0' }}>
                <div className="med-body-wrap">
                  <h3 className="med-h3">Brahmatal — Shorter but Colder</h3>
                  <p className="med-body"><strong>Brahmatal</strong> is shorter (4 days, 22 km) but involves walking through snow for most of the route. Snow increases energy expenditure by 30–50% compared to dry trail. Combined with cold temperatures that drain stamina, Brahmatal feels harder than its distance suggests.</p>
                  <p className="med-body">The cold is a genuine factor — if you are not comfortable in sustained sub-zero temperatures, Brahmatal will be more demanding psychologically.</p>
                </div>
              </div>
              <div className="med-card med-split-card" style={{ padding: '0' }}>
                <div className="med-body-wrap">
                  <h3 className="med-h3">Kuari Pass — Longer but Warmer</h3>
                  <p className="med-body"><strong>Kuari Pass</strong> is longer (5 days, 30 km) but on mostly dry trail with established camping infrastructure. The altitude gain is spread across more days, making the daily effort more manageable.</p>
                  <p className="med-body">For first-timers, Kuari Pass is slightly more accessible due to the extra acclimatisation day and warmer conditions. If you have never slept in a tent at −8°C, Kuari Pass in spring is the gentler introduction.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Garhwal Trek"
          subtext="Tell us your preferred month and fitness level. We will recommend the right route."
          vertical="trek"
          category="comparison"
          sourcePath={PATH}
        />

        {/* ── VIEWS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">What You Will See</span>
            </div>
            <h2 className="med-h2">Views &amp; <span>Scenery</span></h2>

            <div className="med-split">
              <div className="med-card med-split-card" style={{ padding: '0' }}>
                <div className="med-body-wrap">
                  <h3 className="med-h3">Brahmatal — Concentrated Drama</h3>
                  <p className="med-body"><strong>Brahmatal</strong> delivers its visual payoff as concentrated moments — the frozen lake, the summit ridge, and the campsite panorama. The views of Trishul (7,120 m) and Nanda Ghunti (6,309 m) are striking, especially against winter's white foreground.</p>
                  <p className="med-body">But much of the trail is in forest — you don't see mountains for extended stretches until you clear the treeline.</p>
                </div>
              </div>
              <div className="med-card med-split-card" style={{ padding: '0' }}>
                <div className="med-body-wrap">
                  <h3 className="med-h3">Kuari Pass — Sustained Panorama</h3>
                  <p className="med-body"><strong>Kuari Pass</strong> delivers views as a sustained experience. The ridge walk places you above the treeline for long sections, with the Nanda Devi range visible almost continuously from day two onward.</p>
                  <p className="med-body">The scale is larger: Nanda Devi (7,816 m), Dronagiri (7,066 m), Chaukhamba (7,138 m), Kamet (7,756 m). In autumn, visibility can extend beyond 200 km.</p>
                </div>
              </div>
            </div>

            <div className="med-callout">
              <p className="med-body"><strong>Verdict:</strong> Kuari Pass for breadth and duration of mountain views. Brahmatal for the unique frozen lake visual and the drama of a snow-covered Himalayan landscape.</p>
            </div>
          </div>
        </section>

        {/* ── LOGISTICS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Getting There</span>
            </div>
            <h2 className="med-h2">Getting There &amp; <span>Logistics</span></h2>

            <div className="med-split">
              <div className="med-card med-split-card" style={{ padding: '0' }}>
                <div className="med-body-wrap">
                  <h3 className="med-h3">Brahmatal from <Link href="/treks/location/lohajung">Lohajung</Link></h3>
                  <p className="med-body">10 hours from Rishikesh by road via Karnaprayag and Dewal. Lohajung is a small village with basic guesthouses and no ATMs. The road quality is acceptable but narrow in the final stretch. Less frequent bus services.</p>
                  <p className="med-body"><strong>Total trip:</strong> 7–8 days from Delhi (2 travel days each way + 4 trek days).</p>
                </div>
              </div>
              <div className="med-card med-split-card" style={{ padding: '0' }}>
                <div className="med-body-wrap">
                  <h3 className="med-h3">Kuari Pass from <Link href="/treks/location/joshimath">Joshimath</Link></h3>
                  <p className="med-body">9–10 hours from Rishikesh via the Badrinath highway. Joshimath is a proper town with hotels, restaurants, ATMs, and shops. Better road infrastructure, more frequent buses, and more accommodation options.</p>
                  <p className="med-body"><strong>Total trip:</strong> 8–9 days from Delhi (2 travel days each way + 5 trek days).</p>
                </div>
              </div>
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
            <h2 className="med-h2">Who Should <span>Choose Which</span></h2>

            <div className="med-choose-grid">
              <div className="med-card med-choose-card">
                <h3 className="med-h3">Choose Brahmatal if:</h3>
                <ul>
                  <li>You want a winter snow trek (December–March)</li>
                  <li>You are drawn to the frozen lake experience</li>
                  <li>You are comfortable with cold-weather camping (−8 to −10°C)</li>
                  <li>You have 4 trek days available</li>
                  <li>You want an alternative to the crowded Kedarkantha circuit</li>
                </ul>
              </div>
              <div className="med-card med-choose-card">
                <h3 className="med-h3">Choose Kuari Pass if:</h3>
                <ul>
                  <li>You want the widest possible Himalayan panorama</li>
                  <li>You prefer spring or autumn trekking (milder weather)</li>
                  <li>This is your first high-altitude Himalayan trek</li>
                  <li>You value historic trails (Lord Curzon Trail)</li>
                  <li>You want the option to extend to <Link href="/treks/location/joshimath/pangarchulla-trek">Pangarchulla summit</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROGRESSION ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Progression</span>
            </div>
            <h2 className="med-h2">Next Steps <span>After Each Trek</span></h2>

            <div className="med-split">
              <div className="med-card med-split-card" style={{ padding: '0' }}>
                <div className="med-body-wrap">
                  <h3 className="med-h3">After Brahmatal</h3>
                  <p className="med-body">The natural progression is the <Link href="/treks/location/lohajung/roopkund-trek">Roopkund Trek</Link> — same base village (Lohajung), significantly higher altitude (4,800 m), and challenging difficulty. Brahmatal at 3,850 m gives you the altitude confidence to tackle Roopkund.</p>
                </div>
              </div>
              <div className="med-card med-split-card" style={{ padding: '0' }}>
                <div className="med-body-wrap">
                  <h3 className="med-h3">After Kuari Pass</h3>
                  <p className="med-body">The natural extension is <Link href="/treks/location/joshimath/pangarchulla-trek">Pangarchulla Peak</Link> — the route shares the same approach trail before diverging for a summit push to 4,590 m. Some itineraries combine both, crossing Kuari Pass on day 3 and pushing to Pangarchulla from Khullara camp.</p>
                </div>
              </div>
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
          title="Brahmatal — The Ideal First Snow Trek"
          description="Frozen lake, snow-covered ridges, and Himalayan views. 4 days, moderate difficulty, no technical sections."
          links={[
            { label: 'View Brahmatal Details', href: '/treks/location/lohajung/brahmatal-trek' },
            { label: 'View Kuari Pass Details', href: '/treks/location/joshimath/kuari-pass-trek' },
            { label: 'Compare More Treks', href: '/treks/best-treks-in-uttarakhand' },
          ]}
        />

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
            { label: 'Beginner Treks in Uttarakhand', href: '/treks/best-treks-in-uttarakhand/beginner' },
            { label: 'Garhwal Himalayas Trekking Guide', href: '/treks/garhwal-himalayas' },
            { label: 'Roopkund vs Pangarchulla — Challenging Comparison', href: '/treks/roopkund-vs-pangarchulla' },
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
              <Link href="/treks/roopkund-vs-pangarchulla" className="med-nav-link">
                <span>Challenging Garhwal Treks: Roopkund vs Pangarchulla</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/location/lohajung" className="med-nav-link">
                <span>All treks from Lohajung</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/location/joshimath" className="med-nav-link">
                <span>All treks from Joshimath</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/best-treks-in-uttarakhand/snow" className="med-nav-link" style={{ borderBottom: 'none' }}>
                <span>Winter Treks in Uttarakhand</span>
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
