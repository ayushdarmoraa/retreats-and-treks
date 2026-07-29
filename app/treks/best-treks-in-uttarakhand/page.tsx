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

const PATH = '/treks/best-treks-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Treks in Uttarakhand | Retreats And Treks',
    description:
      'Compare the best treks in Uttarakhand by altitude, difficulty, season, duration, and route style — Brahmatal, Kuari Pass, Roopkund, Pangarchulla, and more.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: '10 Best Treks in Uttarakhand (3,000–4,800m) — Difficulty, Season & Guide',
      description:
        'Compare the best treks in Uttarakhand by altitude, difficulty, season, duration, and route style — Brahmatal, Kuari Pass, Roopkund, Pangarchulla, and more.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Best Treks in Uttarakhand'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What are the best treks in Uttarakhand for beginners in 2026?',
    answer:
      'The three best beginner treks in Uttarakhand are Brahmatal (3,850 m, 4 days from Lohajung — a moderate winter snow trek with no technical sections), Kuari Pass (3,876 m, 5 days from Joshimath — a panoramic ridge walk on the Lord Curzon Trail), and Khaliya Top (3,500 m, 3–4 days from Munsiyari — a short summit trek with Panchachuli views). For day treks, the Tiger Fall trail in Chakrata requires no prior experience and is completable in a single day.',
  },
  {
    question: 'Which is the best snow trek in Uttarakhand?',
    answer:
      'Brahmatal is the best snow trek for most trekkers — a 4-day moderate route to a frozen alpine lake at 3,850 m with views of Trishul and Nanda Ghunti. Best from December to March. Kedarkantha (3,810 m from Sankri) is the most popular winter summit trek with a steep final-day push through deep snow. Both are accessible to fit beginners. For experienced trekkers, Pangarchulla offers a challenging snow-and-scree summit at 4,590 m in March–May.',
  },
  {
    question: 'What is the hardest trek in Uttarakhand?',
    answer:
      'Roopkund is the hardest featured trek — a 7-day, 53 km expedition to a glacial lake at 4,800 m with sustained high-altitude exposure, moraine crossings, and unpredictable weather above 4,000 m. Pangarchulla Peak (4,590 m) is also challenging, requiring an alpine-start summit push through steep snow. Both demand 6–8 weeks of fitness preparation and prior high-altitude experience above 4,000 m. The Milam Glacier trek in Kumaon is the longest at 8–10 days.',
  },
  {
    question: 'How do I choose between Garhwal and Kumaon treks?',
    answer:
      'Garhwal (Lohajung and Joshimath bases) offers higher altitudes (3,850–4,800 m), dramatic Nanda Devi panoramas, and glacier-lake terrain — best for trekkers seeking classic Himalayan routes. Kumaon (Munsiyari base) offers remoteness, cultural depth (abandoned trade villages on the Milam Glacier route), and fewer crowds. Garhwal routes have better guide infrastructure and shorter approach drives. Kumaon routes reward patience and expedition mindset. Most trekkers start in Garhwal and explore Kumaon later.',
  },
  {
    question: 'When is the best time to trek in Uttarakhand?',
    answer:
      'October to November is the best overall window — clear skies, dry trails, and peak Himalayan visibility across all regions. For snow treks, December to March (Brahmatal, Kedarkantha). For valley treks and high-altitude expeditions, May to June (Har Ki Dun, Roopkund, Milam Glacier). September to October is the post-monsoon sweet spot for Roopkund and Kuari Pass. Monsoon (July–August) closes all high-altitude routes.',
  },
  {
    question: 'Can I trek in Uttarakhand without a guide?',
    answer:
      'Short Chakrata trails (Tiger Fall, Budher Caves) can be done independently. All multi-day treks above 3,000 m should be done with guided operators — the routes are remote, rescue infrastructure is minimal, and weather changes rapidly at altitude. Guided treks include permits, safety equipment, meals, and local knowledge. Roopkund, Pangarchulla, and Milam Glacier should never be attempted independently.',
  },
  {
    question: 'What is the cheapest trek in Uttarakhand?',
    answer:
      'The Tiger Fall day trek in Chakrata is the most affordable — no guide fees, no camping equipment, and no multi-day food costs. Among guided multi-day treks, Kedarkantha (4 days from Sankri) typically offers the best value due to short duration, established infrastructure, and high group-departure availability. Longer expeditions like Roopkund (7 days) and Milam Glacier (8–10 days) cost more due to extended camping, porters, and permit processing.',
  },
  {
    question: 'Which Uttarakhand trek has the best views?',
    answer:
      'Kuari Pass delivers the highest view-to-effort ratio — near-continuous panoramas of Nanda Devi (7,816 m), Dronagiri, Chaukhamba, and Kamet across 5 days of ridge walking at moderate difficulty. For a single summit panorama, Pangarchulla offers 360° views from 4,590 m. For valley-and-range beauty, the Har Ki Dun alpine meadow amphitheatre is unmatched. Each delivers a different kind of visual reward.',
  },
];

const ALL_TREKS = [
  { href: '/treks/location/lohajung/brahmatal-trek', name: 'Brahmatal', alt: '3,850 m', diff: 'Moderate', days: '4', season: 'Dec–Mar', region: 'Garhwal' },
  { href: '/treks/location/joshimath/kuari-pass-trek', name: 'Kuari Pass', alt: '3,876 m', diff: 'Moderate', days: '5', season: 'Mar–May, Oct–Nov', region: 'Garhwal' },
  { href: '/treks/location/sankri/kedarkantha-trek', name: 'Kedarkantha', alt: '3,810 m', diff: 'Moderate–Challenging', days: '5', season: 'Dec–Feb', region: 'Sankri' },
  { href: '/treks/location/sankri/har-ki-dun-trek', name: 'Har Ki Dun', alt: '3,566 m', diff: 'Moderate', days: '5', season: 'May–Jun, Sep–Oct', region: 'Sankri' },
  { href: '/treks/location/munsiyari/khaliya-top-trek', name: 'Khaliya Top', alt: '3,500 m', diff: 'Moderate', days: '3–4', season: 'May–Jun, Sep–Oct', region: 'Kumaon' },
  { href: '/treks/location/lohajung/roopkund-trek', name: 'Roopkund', alt: '4,800 m', diff: 'Challenging', days: '7', season: 'May–Jun, Sep–Oct', region: 'Garhwal' },
  { href: '/treks/location/joshimath/pangarchulla-trek', name: 'Pangarchulla', alt: '4,590 m', diff: 'Challenging', days: '6', season: 'Mar–May', region: 'Garhwal' },
  { href: '/treks/location/munsiyari/milam-glacier-trek', name: 'Milam Glacier', alt: '3,450 m', diff: 'Challenging', days: '8–10', season: 'May–Jun, Sep–Oct', region: 'Kumaon' },
  { href: '/treks/location/chakrata/tiger-fall-trek', name: 'Tiger Fall', alt: '~2,200 m', diff: 'Easy', days: '1', season: 'Year-round', region: 'Chakrata' },
  { href: '/treks/location/chakrata/budher-caves-trek', name: 'Budher Caves', alt: '~2,200 m', diff: 'Easy', days: '1', season: 'Year-round', region: 'Chakrata' },
];

const REGIONS = [
  {
    name: 'Garhwal Himalayas',
    slug: '/treks/garhwal-himalayas',
    description:
      'The high-altitude heart of Uttarakhand — accessed from Lohajung and Joshimath. Brahmatal, Kuari Pass, Roopkund, and Pangarchulla offer altitude ranges from 3,850 to 4,800 metres with Nanda Devi Sanctuary views.',
    treks: ['Brahmatal', 'Kuari Pass', 'Roopkund', 'Pangarchulla'],
  },
  {
    name: 'Sankri',
    slug: '/treks/location/sankri',
    description:
      'Base for two of Uttarakhand\'s most popular multi-day treks: Kedarkantha (winter summit) and Har Ki Dun (summer valley). Reached from Dehradun in 4–5 hours.',
    treks: ['Kedarkantha', 'Har Ki Dun'],
  },
  {
    name: 'Chakrata',
    slug: '/treks/location/chakrata',
    description:
      'Gateway for first-time trekkers and weekend travellers from Delhi. Tiger Fall and Budher Caves stay below 2,500 metres — no altitude concerns, no multi-day gear, no prior experience needed.',
    treks: ['Tiger Fall', 'Budher Caves'],
  },
  {
    name: 'Kumaon (Munsiyari)',
    slug: '/treks/location/munsiyari',
    description:
      'Remote expeditions with fewer crowds — Milam Glacier (8–10 days along the Johar trade route) and Khaliya Top (3–4 days to a Panchachuli panorama). Deeper cultural layers and genuinely wild terrain.',
    treks: ['Milam Glacier', 'Khaliya Top'],
  },
];

const PROGRESSION_STEPS = [
  { label: 'Day treks (Easy)', content: 'Tiger Fall or Budher Caves in Chakrata — builds trail confidence with zero altitude risk.' },
  { label: 'First multi-day (Moderate)', content: 'Brahmatal or Kuari Pass — introduces camping, altitude, and multi-day rhythm.' },
  { label: 'Summit experience (Moderate–Challenging)', content: 'Kedarkantha — adds a genuine summit push and winter snow conditions.' },
  { label: 'High altitude (Challenging)', content: 'Pangarchulla or Roopkund — sustained exposure above 4,000 m with technical demands.' },
  { label: 'Expedition (Challenging)', content: 'Milam Glacier — 8–10 days of continuous remote trekking through glacial terrain.' },
];

export default function BestTreksInUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Best Treks in Uttarakhand', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '10 Best Treks in Uttarakhand — Beginner to High-Altitude Guide',
    description:
      'A curated guide to the 10 best treks in Uttarakhand across Garhwal, Kumaon, Sankri and Chakrata — ranked by difficulty, altitude and season.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Best Treks in Uttarakhand".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="10 Best Treks in Uttarakhand — Beginner to High-Altitude Guide"
        description="A curated guide to the 10 best treks in Uttarakhand across Garhwal, Kumaon, Sankri and Chakrata — ranked by difficulty, altitude and season."
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
        .med-grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } .med-grid-4 { grid-template-columns: 1fr; } }
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

        /* ── Table of Contents ── */
        .med-toc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          overflow: hidden;
        }
        @media (max-width: 820px) { .med-toc-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .med-toc-grid { grid-template-columns: 1fr; } }
        .med-toc-item {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding: 1.25rem 1.5rem;
          border-right: 1px solid rgba(15,118,110,0.06);
          border-bottom: 1px solid rgba(15,118,110,0.06);
          text-decoration: none;
          background: #fff;
          transition: background 0.2s, transform 0.2s;
        }
        .med-toc-item:hover { background: #f7f9f7; transform: translateY(-2px); }
        .med-toc-item:nth-child(4n) { border-right: none; }
        .med-toc-item:nth-child(n+5) { border-bottom: none; }
        .med-toc-num {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.18em;
          color: #0f766e;
        }
        .med-toc-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem; font-weight: 400;
          color: #2B2A26; line-height: 1.4;
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
        .med-badge-moderate-challenging {
          background: rgba(230,81,0,0.08);
          color: #c45000;
        }
        .med-badge-challenging {
          background: rgba(230,81,0,0.08);
          color: #e65100;
        }

        .med-filter-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .med-filter-pill {
          display: inline-block;
          padding: 0.4rem 0.85rem;
          border-radius: 999px;
          border: 1px solid rgba(15,118,110,0.3);
          color: #0f766e;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-decoration: none;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .med-filter-pill:hover {
          background: #0f766e;
          color: #ffffff;
          border-color: #0f766e;
        }

        /* ── Region Cards ── */
        .med-region-card {
          padding: 1.5rem;
          border-left: 3px solid #0f766e;
          transition: all 0.3s ease;
        }
        .med-region-card:hover {
          border-color: #0d6b64;
          transform: translateX(6px);
        }
        .med-region-card .med-h3 { font-size: 1rem; margin-bottom: 0.3rem; }
        .med-region-card .med-body { font-size: 0.88rem; margin-bottom: 0; }
        .med-region-card .med-trek-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem;
          margin-top: 0.5rem;
        }
        .med-region-card .med-trek-tags span {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          color: #0f766e;
          background: rgba(15,118,110,0.08);
          padding: 0.15rem 0.6rem;
          border-radius: 999px;
        }

        /* ── Progression Timeline ── */
        .med-progression {
          position: relative;
          padding-left: 2rem;
          margin: 1.5rem 0;
        }
        .med-progression::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 8px;
          width: 2px;
          background: rgba(15,118,110,0.2);
        }
        .med-progression-item {
          position: relative;
          margin-bottom: 1.5rem;
        }
        .med-progression-item:last-child { margin-bottom: 0; }
        .med-progression-item::before {
          content: '';
          position: absolute;
          top: 8px;
          left: -2rem;
          width: 14px;
          height: 14px;
          background: #fff;
          border: 2px solid #0f766e;
          border-radius: 50%;
          transform: translateX(-7px);
        }
        .med-progression-item .med-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0f766e;
        }
        .med-progression-item .med-h3 { font-size: 1rem; margin-bottom: 0.2rem; }
        .med-progression-item .med-body { font-size: 0.92rem; margin-bottom: 0; }

        /* ── Decision Cards ── */
        .med-decision-card {
          padding: 1.25rem 1.5rem;
          background: #f7f9f7;
          border: 1px solid rgba(15,118,110,0.08);
          border-radius: 12px;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
        }
        .med-decision-card:hover {
          border-color: rgba(15,118,110,0.2);
          transform: translateX(4px);
        }
        .med-decision-card .med-h3 { font-size: 0.95rem; margin-bottom: 0.2rem; }
        .med-decision-card .med-body { font-size: 0.88rem; margin-bottom: 0; }

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

        /* ── Explore Links ── */
        .med-explore-group {
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        .med-explore-link {
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
        .med-explore-link:last-child { border-bottom: none; }
        .med-explore-link:hover { background: #f7f9f7; color: #0f766e; }
        .med-explore-link .med-arrow { color: #0f766e; font-size: 0.8rem; }

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
              { name: 'Best Treks in Uttarakhand' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Trekking Guide · Uttarakhand</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Uttarakhand stretches from the foothills north of Delhi to the highest peaks in India — Nanda Devi at 7,816 metres, Kamet, Chaukhamba, and the Panchachuli massif. Across four distinct trekking regions, the state offers a complete spectrum of Himalayan experiences.
            </p>
            <div className="med-hero-tags">
              <span>Brahmatal</span>
              <span>Kuari Pass</span>
              <span>Roopkund</span>
              <span>Kedarkantha</span>
            </div>
            <div className="med-hero-actions">
              <a href="#comparison" className="med-cta-btn">View All Treks</a>
              <a href="#regions" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Explore Regions</a>
            </div>
          </div>
        </section>

        {/* ── TABLE OF CONTENTS ── */}
        <section className="med-shell med-section-white med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">In This Guide</span>
            </div>

            <nav aria-label="Table of contents" style={{ marginTop: '0.5rem' }}>
              <div className="med-toc-grid">
                {[
                  { href: '#beginner-treks', label: 'Beginner-Friendly Treks' },
                  { href: '#moderate-treks', label: 'Moderate Multi-Day Treks' },
                  { href: '#challenging-treks', label: 'Challenging High-Altitude Treks' },
                  { href: '#snow-treks', label: 'Best Snow Treks' },
                  { href: '#high-altitude', label: 'High-Altitude Treks Above 4,000 m' },
                  { href: '#regions', label: 'Trekking Regions in Uttarakhand' },
                  { href: '#progression', label: 'The Trekking Progression Path' },
                  { href: '#how-to-choose', label: 'How to Choose the Right Trek' },
                ].map((item, i) => (
                  <a key={item.href} href={item.href} className="med-toc-item">
                    <span className="med-toc-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="med-toc-label">{item.label}</span>
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </section>

        <PrimaryCTA
          
          label="Plan My Uttarakhand Trek"
          subtext="Tell us your dates, fitness level and preferred difficulty. We will match you to the right route."
          vertical="trek"
          category="apex"
          sourcePath={PATH}
        />

        {/* ── COMPARISON TABLE ── */}
        <section id="comparison" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Trek Comparison</span>
            </div>
            <h2 className="med-h2">All 10 Treks <span>at a Glance</span></h2>

            <div className="med-table-wrap">
              <table className="med-table">
                <thead>
                  <tr>
                    <th>Trek</th>
                    <th>Altitude</th>
                    <th>Difficulty</th>
                    <th>Days</th>
                    <th>Best Season</th>
                    <th>Region</th>
                  </tr>
                </thead>
                <tbody>
                  {ALL_TREKS.map((row) => {
                    const diffClass = row.diff.toLowerCase().startsWith('challenging')
                      ? 'med-badge-challenging'
                      : row.diff.toLowerCase().startsWith('easy')
                      ? 'med-badge-easy'
                      : row.diff.includes('–')
                      ? 'med-badge-moderate-challenging'
                      : 'med-badge-moderate';
                    return (
                      <tr key={row.href}>
                        <td><Link href={row.href}>{row.name}</Link></td>
                        <td>{row.alt}</td>
                        <td><span className={`med-badge ${diffClass}`}>{row.diff}</span></td>
                        <td>{row.days}</td>
                        <td>{row.season}</td>
                        <td>{row.region}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="med-filter-pills">
              <Link href={`${PATH}/beginner`} className="med-filter-pill">Beginner Treks</Link>
              <Link href={`${PATH}/snow`} className="med-filter-pill">Snow Treks</Link>
              <Link href={`${PATH}/high-altitude`} className="med-filter-pill">High-Altitude (4,000 m+)</Link>
              <Link href={`${PATH}/challenging`} className="med-filter-pill">Challenging Treks</Link>
            </div>

            <p className="med-body">
              <strong>Looking for a beginner trek?</strong> Start with{' '}
              <Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal</Link> or{' '}
              <Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass</Link> — both moderate, no technical skills needed.{' '}
              <Link href={`${PATH}/beginner`}>See all beginner treks →</Link>
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <strong>Want a summit challenge?</strong> See{' '}
              <Link href="/treks/location/joshimath/pangarchulla-trek">Pangarchulla</Link> or{' '}
              <Link href="/treks/location/lohajung/roopkund-trek">Roopkund</Link> — challenging routes above 4,500 m for experienced trekkers.{' '}
              <Link href={`${PATH}/challenging`}>Full challenging treks guide →</Link>
            </p>
          </div>
        </section>

        {/* ── BEGINNER TREKS ── */}
        <section id="beginner-treks" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Beginner Treks</span>
            </div>
            <h2 className="med-h2">Beginner-Friendly Treks <span>in Uttarakhand</span></h2>
            <p className="med-body">
              These routes require no prior Himalayan experience. They stay below 4,000 metres, have no technical sections, and are supported by established guide infrastructure.
            </p>

            <div className="med-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
              <h3 className="med-h3" style={{ fontSize: '1rem' }}><Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal Trek — The Ideal First High-Altitude Trek</Link></h3>
              <div className="med-trek-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem 0.75rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', fontWeight: 400, color: '#6b7280', marginBottom: '0.5rem' }}>
                <span>3,850 m</span>
                <span><span className="med-badge med-badge-moderate">Moderate</span></span>
                <span>4 days</span>
                <span>Dec–Mar</span>
                <span>Lohajung, Garhwal</span>
              </div>
              <p className="med-body">
                A 22 km route from Lohajung to a frozen alpine lake at 3,850 metres, passing through oak and rhododendron forest before emerging onto snow-covered ridges with views of Trishul and Nanda Ghunti. The 4-day duration keeps fatigue manageable. See{' '}
                <Link href="/treks/brahmatal/departures">upcoming Brahmatal trek departures</Link>.
              </p>
            </div>

            <div className="med-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
              <h3 className="med-h3" style={{ fontSize: '1rem' }}><Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass Trek — Best Views for Moderate Effort</Link></h3>
              <div className="med-trek-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem 0.75rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', fontWeight: 400, color: '#6b7280', marginBottom: '0.5rem' }}>
                <span>3,876 m</span>
                <span><span className="med-badge med-badge-moderate">Moderate</span></span>
                <span>5 days</span>
                <span>Mar–May, Oct–Nov</span>
                <span>Joshimath, Garhwal</span>
              </div>
              <p className="med-body">
                Follows the historic Lord Curzon Trail along a high ridge with near-continuous views of Nanda Devi, Dronagiri, Chaukhamba, and Kamet. The view-to-effort ratio is the highest of any trek in Uttarakhand.{' '}
                <Link href="/treks/brahmatal-vs-kuari-pass">Compare Brahmatal vs Kuari Pass</Link> for the detailed breakdown.
              </p>
            </div>

            <div className="med-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
              <h3 className="med-h3" style={{ fontSize: '1rem' }}><Link href="/treks/location/munsiyari/khaliya-top-trek">Khaliya Top Trek — Shortest Route to Serious Views</Link></h3>
              <div className="med-trek-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem 0.75rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', fontWeight: 400, color: '#6b7280', marginBottom: '0.5rem' }}>
                <span>3,500 m</span>
                <span><span className="med-badge med-badge-moderate">Moderate</span></span>
                <span>3–4 days</span>
                <span>May–Jun, Sep–Oct</span>
                <span>Munsiyari, Kumaon</span>
              </div>
              <p className="med-body">
                A broad alpine meadow at 3,500 metres above Munsiyari, offering an unbroken 180-degree panorama of the five Panchachuli summits. At 3–4 days, it is the shortest route to genuine high-altitude Himalayan views.
              </p>
            </div>

            <div className="med-card" style={{ padding: '1.5rem' }}>
              <h3 className="med-h3" style={{ fontSize: '1rem' }}>Tiger Fall &amp; Budher Caves — Weekend Day Treks</h3>
              <div className="med-trek-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem 0.75rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', fontWeight: 400, color: '#6b7280', marginBottom: '0.5rem' }}>
                <span>~2,200 m</span>
                <span><span className="med-badge med-badge-easy">Easy</span></span>
                <span>1 day each</span>
                <span>Year-round</span>
                <span>Chakrata</span>
              </div>
              <p className="med-body">
                <Link href="/treks/location/chakrata/tiger-fall-trek">Tiger Fall</Link> (12 km through deodar forest to a major Himalayan waterfall) and{' '}
                <Link href="/treks/location/chakrata/budher-caves-trek">Budher Caves</Link> (10 km to ancient limestone caves) are the lowest-barrier entry points to Himalayan trekking.
              </p>
            </div>
          </div>
        </section>

        {/* ── MODERATE TREKS ── */}
        <section id="moderate-treks" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Moderate Treks</span>
            </div>
            <h2 className="med-h2">Moderate Multi-Day <span>Treks</span></h2>
            <p className="med-body">
              These routes offer the core Himalayan trekking experience — multiple days on trail, camping at altitude, and the slow rhythm of walking through changing landscapes.
            </p>

            <div className="med-card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
              <h3 className="med-h3" style={{ fontSize: '1rem' }}><Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha Trek — The Classic Winter Summit</Link></h3>
              <div className="med-trek-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem 0.75rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', fontWeight: 400, color: '#6b7280', marginBottom: '0.5rem' }}>
                <span>3,810 m</span>
                <span><span className="med-badge med-badge-moderate-challenging">Moderate–Challenging</span></span>
                <span>5 days</span>
                <span>Dec–Feb</span>
                <span>Sankri</span>
              </div>
              <p className="med-body">
                The most popular guided trek in northern India. A 5-day route from Sankri to a 3,810 m summit with 360-degree views across six Himalayan ranges. The definitive first summit experience in the Indian Himalayas.
              </p>
            </div>

            <div className="med-card" style={{ padding: '1.5rem' }}>
              <h3 className="med-h3" style={{ fontSize: '1rem' }}><Link href="/treks/location/sankri/har-ki-dun-trek">Har Ki Dun Trek — The Valley Immersion</Link></h3>
              <div className="med-trek-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem 0.75rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', fontWeight: 400, color: '#6b7280', marginBottom: '0.5rem' }}>
                <span>3,566 m</span>
                <span><span className="med-badge med-badge-moderate">Moderate</span></span>
                <span>5 days</span>
                <span>May–Jun, Sep–Oct</span>
                <span>Sankri</span>
              </div>
              <p className="med-body">
                The finest valley trek in northern India — 5 days through the Tons Valley with forest, traditional mountain villages, alpine meadows, and a glacial amphitheatre at the head.{' '}
                <Link href="/treks/kedarkantha-vs-har-ki-dun">Kedarkantha vs Har Ki Dun</Link> comparison.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Find My Difficulty Level"
          subtext="Not sure where to start? Share your fitness and experience — we will recommend the right difficulty."
          vertical="trek"
          category="apex"
          sourcePath={PATH}
        />

        {/* ── CHALLENGING TREKS ── */}
        <section id="challenging-treks" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Challenging Treks</span>
            </div>
            <h2 className="med-h2">Challenging High-Altitude <span>Treks</span></h2>
            <p className="med-body">
              These routes require prior high-altitude experience (above 4,000 m), 6–8 weeks of structured fitness preparation, and comfort with steep, exposed terrain.
            </p>

            <div className="med-card" style={{ padding: '1.5rem', marginBottom: '1.25rem', borderTop: '3px solid #e65100' }}>
              <h3 className="med-h3" style={{ fontSize: '1rem' }}><Link href="/treks/location/lohajung/roopkund-trek">Roopkund Trek — The Mystery Lake Expedition</Link></h3>
              <div className="med-trek-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem 0.75rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', fontWeight: 400, color: '#6b7280', marginBottom: '0.5rem' }}>
                <span>4,800 m</span>
                <span><span className="med-badge med-badge-challenging">Challenging</span></span>
                <span>7 days</span>
                <span>May–Jun, Sep–Oct</span>
                <span>Lohajung, Garhwal</span>
              </div>
              <p className="med-body">
                India's most iconic high-altitude trek — a 53 km expedition to a glacial lake at 4,800 metres, known for the centuries-old skeletal remains at its shores. The route crosses the vast Bedni Bugyal alpine meadow and navigates moraine fields.
              </p>
            </div>

            <div className="med-card" style={{ padding: '1.5rem', marginBottom: '1.25rem', borderTop: '3px solid #e65100' }}>
              <h3 className="med-h3" style={{ fontSize: '1rem' }}><Link href="/treks/location/joshimath/pangarchulla-trek">Pangarchulla Peak Trek — The Summit Climb</Link></h3>
              <div className="med-trek-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem 0.75rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', fontWeight: 400, color: '#6b7280', marginBottom: '0.5rem' }}>
                <span>4,590 m</span>
                <span><span className="med-badge med-badge-challenging">Challenging</span></span>
                <span>6 days</span>
                <span>Mar–May</span>
                <span>Joshimath, Garhwal</span>
              </div>
              <p className="med-body">
                One of the few accessible true summit experiences in Uttarakhand — a steep snow-and-scree ascent with an alpine start and 360° views of Nanda Devi, Dronagiri, and the Nanda Devi Sanctuary. Crampons required.{' '}
                <Link href="/treks/roopkund-vs-pangarchulla">Compare Roopkund vs Pangarchulla</Link>.
              </p>
            </div>

            <div className="med-card" style={{ padding: '1.5rem', borderTop: '3px solid #e65100' }}>
              <h3 className="med-h3" style={{ fontSize: '1rem' }}><Link href="/treks/location/munsiyari/milam-glacier-trek">Milam Glacier Trek — The Remote Expedition</Link></h3>
              <div className="med-trek-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem 0.75rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', fontWeight: 400, color: '#6b7280', marginBottom: '0.5rem' }}>
                <span>3,450 m</span>
                <span><span className="med-badge med-badge-challenging">Challenging</span></span>
                <span>8–10 days</span>
                <span>May–Jun, Sep–Oct</span>
                <span>Munsiyari, Kumaon</span>
              </div>
              <p className="med-body">
                Uttarakhand's great expedition trek — an 8–10 day, 118 km journey along the ancient Johar Valley trade route from Munsiyari to the glacier snout beneath the Panchachuli massif.
              </p>
            </div>
          </div>
        </section>

        {/* ── SNOW TREKS ── */}
        <section id="snow-treks" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Snow Treks</span>
            </div>
            <h2 className="med-h2">Best Snow Treks <span>in Uttarakhand</span></h2>
            <p className="med-body">
              Winter transforms the Uttarakhand Himalaya — frozen lakes, snow-laden forests, and summit ridges under continuous white. The best snow season runs December to March.
            </p>

            <div className="med-list" style={{ marginTop: '1.5rem' }}>
              <div className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">
                  <strong><Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal</Link></strong> — the ideal first snow trek with frozen lake, snow ridges, and no technical sections.
                </span>
              </div>
              <div className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">
                  <strong><Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha</Link></strong> — the quintessential winter summit experience with deep snow and a steep final push.
                </span>
              </div>
              <div className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">
                  <strong><Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass (March)</Link></strong> — lingering snow on the upper sections with rhododendron bloom makes this the most photogenic window.
                </span>
              </div>
            </div>

            <p className="med-body" style={{ marginTop: '1rem' }}>
              For a deeper dive, see our{' '}
              <Link href="/treks/best-treks-in-uttarakhand/snow">winter treks in Uttarakhand</Link> seasonal page.
            </p>
          </div>
        </section>

        {/* ── HIGH ALTITUDE ── */}
        <section id="high-altitude" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">High Altitude</span>
            </div>
            <h2 className="med-h2">High-Altitude Treks <span>Above 4,000 m</span></h2>
            <p className="med-body">
              Above 4,000 metres, the landscape changes fundamentally — treeline gives way to exposed moraine and glacial terrain, oxygen pressure drops, and weather windows shrink.
            </p>

            <div className="med-list" style={{ marginTop: '1.5rem' }}>
              <div className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" style={{ background: '#e65100' }} /></span>
                <span className="med-list-text">
                  <strong><Link href="/treks/location/lohajung/roopkund-trek">Roopkund (4,800 m)</Link></strong> — the highest featured trek with sustained exposure above 4,000 m and the iconic mystery lake.
                </span>
              </div>
              <div className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" style={{ background: '#e65100' }} /></span>
                <span className="med-list-text">
                  <strong><Link href="/treks/location/joshimath/pangarchulla-trek">Pangarchulla (4,590 m)</Link></strong> — a true peak summit with 360° views and the most technically demanding single day on any featured trek.
                </span>
              </div>
            </div>

            <p className="med-body" style={{ marginTop: '1rem' }}>
              Preparing for routes above 4,000 m? See our{' '}
              <Link href="/treks/garhwal-himalayas/fitness-guide">8-week fitness guide for Garhwal treks</Link> and the{' '}
              <Link href="/treks/best-treks-in-uttarakhand/high-altitude">high-altitude treks guide</Link>.
            </p>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Trek"
          subtext="Ready to start? Tell us your preferred season and experience level."
          vertical="trek"
          category="apex"
          sourcePath={PATH}
        />

        {/* ── REGIONS ── */}
        <section id="regions" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Trekking Regions</span>
            </div>
            <h2 className="med-h2">Trekking Regions <span>in Uttarakhand</span></h2>
            <p className="med-body">
              Uttarakhand's trekking landscape divides into four distinct regions, each with its own character, altitude profile, and access logistics.
            </p>

            {REGIONS.map((region) => (
              <div key={region.slug} className="med-card med-region-card" style={{ marginBottom: '1rem' }}>
                <h3 className="med-h3"><Link href={region.slug}>{region.name}</Link></h3>
                <p className="med-body">{region.description}</p>
                <div className="med-trek-tags">
                  {region.treks.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROGRESSION PATH ── */}
        <section id="progression" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Progression Path</span>
            </div>
            <h2 className="med-h2">The Trekking <span>Progression Path</span></h2>
            <p className="med-body">
              Most successful Himalayan trekkers build experience in stages. The natural progression through Uttarakhand's routes follows altitude and duration:
            </p>

            <div className="med-progression">
              {PROGRESSION_STEPS.map((step) => (
                <div key={step.label} className="med-progression-item">
                  <span className="med-label">{step.label}</span>
                  <p className="med-body">{step.content}</p>
                </div>
              ))}
            </div>

            <p className="med-body">
              For a detailed training framework, see our{' '}
              <Link href="/blog/beginner-to-advanced-trek-progression-garhwal">beginner-to-advanced trek progression guide</Link> and the{' '}
              <Link href="/treks/garhwal-himalayas/fitness-guide">8-week fitness preparation plan</Link>.
            </p>
          </div>
        </section>

        {/* ── HOW TO CHOOSE ── */}
        <section id="how-to-choose" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decision Guide</span>
            </div>
            <h2 className="med-h2">How to Choose <span>the Right Trek</span></h2>
            <p className="med-body">Three questions determine the right route:</p>

            <div className="med-decision-card">
              <h3 className="med-h3">When are you going?</h3>
              <p className="med-body">December–February: Brahmatal or Kedarkantha (snow treks). March–May: Kuari Pass, Pangarchulla, or Khaliya Top. May–June: Roopkund, Har Ki Dun, or Milam Glacier. September–November: Roopkund, Kuari Pass, or Khaliya Top.</p>
            </div>
            <div className="med-decision-card">
              <h3 className="med-h3">How many days do you have?</h3>
              <p className="med-body">1 day: Chakrata. 3–4 days: Brahmatal or Khaliya Top. 5 days: Kuari Pass, Kedarkantha, or Har Ki Dun. 6–7 days: Pangarchulla or Roopkund. 8–10 days: Milam Glacier.</p>
            </div>
            <div className="med-decision-card" style={{ marginBottom: 0 }}>
              <h3 className="med-h3">What experience do you have?</h3>
              <p className="med-body">First trek: Tiger Fall or Brahmatal. Second trek: Kuari Pass or Kedarkantha. Third+: Pangarchulla or Roopkund. Expedition-ready: Milam Glacier.</p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Talk to a Trek Coordinator"
          subtext="Share your dates and fitness level. We will recommend the exact route for your experience."
          vertical="trek"
          category="apex"
          sourcePath={PATH}
        />

        <FeaturedRetreat
          title="Brahmatal — The Perfect First Himalayan Trek"
          description="Frozen lake, snow-covered ridges, and Himalayan views. 4 days, moderate difficulty, no technical sections."
          links={[
            { label: 'View Trek Details', href: '/treks/location/lohajung/brahmatal-trek' },
            { label: 'See All Beginner Treks', href: `${PATH}/beginner` },
            { label: 'Compare Brahmatal vs Kuari Pass', href: '/treks/brahmatal-vs-kuari-pass' },
          ]}
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

        <RelatedReads
          links={[
            { label: 'Beginner Treks in Uttarakhand', href: `${PATH}/beginner` },
            { label: 'Snow Treks in Uttarakhand', href: `${PATH}/snow` },
            { label: 'High-Altitude Treks Above 4,000 m', href: `${PATH}/high-altitude` },
            { label: 'Challenging Treks in Uttarakhand', href: `${PATH}/challenging` },
          ]}
        />

        {/* ── EXPLORE MORE ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Explore More</span>
            </div>
            <h2 className="med-h2">Explore by <span>Region &amp; Topic</span></h2>

            <div className="med-explore-group">
              <Link href={`${PATH}/beginner`} className="med-explore-link">
                <span>Beginner Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href={`${PATH}/snow`} className="med-explore-link">
                <span>Snow Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href={`${PATH}/high-altitude`} className="med-explore-link">
                <span>High-Altitude Treks Above 4,000 m</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href={`${PATH}/challenging`} className="med-explore-link" style={{ borderBottom: 'none' }}>
                <span>Challenging Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
            </div>

            <div className="med-explore-group">
              <Link href="/treks/garhwal-himalayas" className="med-explore-link">
                <span>Garhwal Himalayas — Complete Trekking Guide</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/location/sankri" className="med-explore-link">
                <span>Treks from Sankri</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/location/munsiyari" className="med-explore-link">
                <span>Treks from Munsiyari</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/location/chakrata" className="med-explore-link" style={{ borderBottom: 'none' }}>
                <span>Weekend Treks from Chakrata</span>
                <span className="med-arrow">→</span>
              </Link>
            </div>

            <div className="med-explore-group">
              <Link href="/treks/brahmatal-vs-kuari-pass" className="med-explore-link">
                <span>Brahmatal vs Kuari Pass — Moderate Trek Comparison</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/roopkund-vs-pangarchulla" className="med-explore-link">
                <span>Roopkund vs Pangarchulla — Challenging Trek Comparison</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/kedarkantha-vs-har-ki-dun" className="med-explore-link" style={{ borderBottom: 'none' }}>
                <span>Kedarkantha vs Har Ki Dun — Sankri Trek Comparison</span>
                <span className="med-arrow">→</span>
              </Link>
            </div>

            <div className="med-explore-group" style={{ marginBottom: 0 }}>
              <Link href="/treks/summer-treks-uttarakhand" className="med-explore-link">
                <span>Summer Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/garhwal-himalayas/fitness-guide" className="med-explore-link">
                <span>8-Week Fitness Guide for Garhwal Treks</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/garhwal-himalayas/packing-checklist" className="med-explore-link" style={{ borderBottom: 'none' }}>
                <span>Packing Checklist — Print-Ready Gear List</span>
                <span className="med-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <div className="med-trek-footer">
          <Link href="/treks">← All Treks</Link>
          <Link href="/treks/garhwal-himalayas">Garhwal Himalayas</Link>
          <Link href="/treks/location/sankri">Sankri Treks</Link>
          <Link href="/treks/location/munsiyari">Munsiyari Treks</Link>
          <Link href="/treks/location/chakrata">Chakrata Treks</Link>
        </div>

      </article>
    </TrackedPage>
  );
}
