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

const PATH = '/treks/best-treks-in-uttarakhand/beginner';
const PARENT_PATH = '/treks/best-treks-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Beginner Treks in Uttarakhand | Retreats And Treks',
    description:
      'Best beginner treks in Uttarakhand ranked by difficulty, from easy Chakrata day hikes to moderate Garhwal routes with no prior trekking experience needed.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Best Beginner Treks in Uttarakhand — Your First Himalayan Walk',
      description:
        'Curated selection of easy and moderate treks in Uttarakhand for first-time trekkers, covering day hikes to multi-day routes.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Best Beginner Treks in Uttarakhand'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is the easiest trek in Uttarakhand?',
    answer:
      'Tiger Fall in Chakrata is the easiest featured trek — a single-day forest trail below 2,500 m with no altitude risk, no camping gear needed, and year-round accessibility. It is ideal for first-time trekkers and families.',
  },
  {
    question: 'Can a complete beginner do a multi-day trek in Uttarakhand?',
    answer:
      'Yes. Brahmatal (4 days, Moderate) and Kuari Pass (5 days, Moderate) are designed for fit beginners with no prior trekking experience. Both are fully guided, with established campsites and gradual altitude gain.',
  },
  {
    question: 'What fitness level is needed for beginner treks?',
    answer:
      'For Chakrata day treks, basic walking fitness is sufficient. For Brahmatal or Kuari Pass, 4–6 weeks of preparation including cardio (jogging, cycling) and stair climbing is recommended. You should be comfortable walking 8–12 km on uneven ground.',
  },
  {
    question: 'What is the best season for beginner treks in Uttarakhand?',
    answer:
      'October–November and March–May offer the most comfortable conditions — mild temperatures, clear skies, and dry trails. Brahmatal is a winter-specific trek (Dec–Mar) with snow but moderate difficulty. Chakrata day hikes are accessible year-round.',
  },
];

const TREKS = [
  {
    name: 'Tiger Fall Trek',
    slug: '/treks/location/chakrata/tiger-fall-trek',
    altitude: '~2,200 m',
    difficulty: 'Easy',
    days: '1 day',
    season: 'Year-round',
    location: 'Chakrata',
    tag: '🌟 Recommended',
    description:
      'A gentle forest walk to one of the tallest waterfalls in Uttarakhand. The trail stays below tree cover the entire way, with no exposed ridges or steep scrambles. Perfect for families, first-timers, or as a warm-up before a multi-day route.',
  },
  {
    name: 'Budher Caves Trek',
    slug: '/treks/location/chakrata/budher-caves-trek',
    altitude: '~2,200 m',
    difficulty: 'Easy',
    days: '1 day',
    season: 'Year-round',
    location: 'Chakrata',
    tag: '🕵️ Adventure',
    description:
      'A slightly longer forest trail leading to ancient limestone caves, offering more trail variety than Tiger Fall with a rewarding geological endpoint. Same low-altitude, low-risk profile, but adds exploration interest.',
  },
  {
    name: 'Brahmatal Trek',
    slug: '/treks/location/lohajung/brahmatal-trek',
    altitude: '3,850 m',
    difficulty: 'Moderate',
    days: '4 days',
    season: 'Dec–Mar',
    location: 'Lohajung, Garhwal',
    tag: '🏔️ Snow Trek',
    description:
      'The ideal first snow trek — frozen Brahmatal Lake, snow-covered ridges, and continuous Trishul and Nanda Ghunti views. The 4-day duration limits cold exposure while delivering a genuinely alpine experience.',
  },
  {
    name: 'Kuari Pass Trek',
    slug: '/treks/location/joshimath/kuari-pass-trek',
    altitude: '3,876 m',
    difficulty: 'Moderate',
    days: '5 days',
    season: 'Mar–May, Oct–Nov',
    location: 'Joshimath, Garhwal',
    tag: '⛰️ Ridge Walk',
    description:
      'One of the most accessible ridge walks in the Himalayas — 5 days along the historic Curzon Trail with Nanda Devi, Dronagiri, and Chaukhamba visible for most of the route. The classic first moderate trek in Garhwal.',
  },
  {
    name: 'Khaliya Top Trek',
    slug: '/treks/location/munsiyari/khaliya-top-trek',
    altitude: '3,500 m',
    difficulty: 'Moderate',
    days: '3–4 days',
    season: 'May–Jun, Sep–Oct',
    location: 'Munsiyari, Kumaon',
    tag: '🌄 Panorama',
    description:
      'A quieter alternative to the popular Garhwal routes — Khaliya Top offers a 360-degree Panchachuli massif panorama from 3,500 metres, with far fewer trekkers on trail. Ideal for trekkers who value solitude alongside scenery.',
  },
];

export default function BeginnerTreksPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Best Treks in Uttarakhand', url: buildCanonicalUrl(PARENT_PATH) },
    { name: 'Beginner Treks', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Beginner Treks in Uttarakhand — Your First Himalayan Walk',
    description:
      'Curated selection of easy and moderate treks in Uttarakhand for first-time trekkers, covering day hikes to multi-day routes.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Best Beginner Treks in Uttarakhand".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Best Beginner Treks in Uttarakhand — Your First Himalayan Walk"
        description="Curated selection of easy and moderate treks in Uttarakhand for first-time trekkers, covering day hikes to multi-day routes."
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
        .med-trek-card {
          padding: 1.5rem;
          border-top: 3px solid #0f766e;
          transition: all 0.35s ease;
        }
        .med-trek-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(15,118,110,0.08);
        }
        .med-trek-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-trek-card .med-h3 a { color: #0f766e; font-weight: 600; text-decoration: none; transition: color 0.3s; }
        .med-trek-card .med-h3 a:hover { color: #0d6b64; text-decoration: underline; }
        .med-trek-card .med-body { font-size: 0.92rem; margin-bottom: 0.5rem; }
        .med-trek-card .med-body:last-child { margin-bottom: 0; }
        .med-trek-card .med-trek-tag {
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

        .med-trek-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem 0.75rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          color: #6b7280;
          margin-bottom: 0.65rem;
        }
        .med-trek-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .med-trek-meta-pill::before {
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
        .med-badge-easy {
          background: rgba(15,118,110,0.08);
          color: #0f766e;
        }
        .med-badge-moderate {
          background: rgba(37,99,235,0.08);
          color: #2563eb;
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

        .med-trek-why {
          border-left: 3px solid #0f766e;
          padding-left: 1.25rem;
          margin-bottom: 1.25rem;
          transition: border-color 0.3s;
        }
        .med-trek-why:last-child { margin-bottom: 0; }
        .med-trek-why:hover { border-color: #0d6b64; }
        .med-trek-why .med-h3 { font-size: 0.85rem; font-weight: 600; color: #2B2A26; margin-bottom: 0.2rem; }
        .med-trek-why .med-body { font-size: 0.88rem; margin-bottom: 0; }

        .med-trek-season {
          padding: 1rem 1.25rem;
          background: #fff;
          border: 1px solid rgba(15,118,110,0.06);
          border-radius: 12px;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
        }
        .med-trek-season:last-child { margin-bottom: 0; }
        .med-trek-season:hover {
          border-color: rgba(15,118,110,0.2);
          transform: translateX(6px);
        }
        .med-trek-season .med-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          color: #0f766e;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.2rem;
        }
        .med-trek-season .med-body { font-size: 0.88rem; margin-bottom: 0; }

        .med-trek-who {
          display: flex;
          gap: 0.75rem;
          padding: 0.9rem 1rem;
          border-bottom: 1px solid rgba(15,118,110,0.06);
          transition: background 0.2s;
        }
        .med-trek-who:last-child { border-bottom: none; }
        .med-trek-who:hover { background: #f7f9f7; }
        .med-trek-who .med-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #0f766e;
          flex-shrink: 0;
          margin-top: 0.65rem;
        }
        .med-trek-who .med-body { font-size: 0.88rem; margin: 0; }
        .med-trek-who .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-trek-who .med-body a:hover { text-decoration: underline; }

        .med-trek-callout {
          padding: 1.25rem 1.5rem;
          background: #fff;
          border: 1px solid rgba(15,118,110,0.08);
          border-left: 4px solid #0f766e;
          border-radius: 12px;
          transition: all 0.3s;
        }
        .med-trek-callout:hover {
          border-color: rgba(15,118,110,0.2);
          box-shadow: 0 4px 16px rgba(15,118,110,0.04);
        }
        .med-trek-callout .med-body { margin: 0; }
        .med-trek-callout .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-trek-callout .med-body a:hover { text-decoration: underline; }

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
              { name: 'Best Treks in Uttarakhand', href: PARENT_PATH },
              { name: 'Beginner Treks' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Beginner Treks · Uttarakhand</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              You do not need expedition experience to trek in the Himalayas. Uttarakhand offers a clear pathway from
              flat forest trails to moderate multi-day routes — each step building the skills and confidence for the next.
            </p>
            <div className="med-hero-tags">
              <span>Easy Day Hikes</span>
              <span>Moderate Multi-Day</span>
              <span>No Experience Needed</span>
              <span>Fully Guided</span>
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
            <div className="med-trek-callout">
              <p className="med-body">
                <strong>Not sure which beginner trek to choose?</strong>{' '}
                Start with <Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal</Link> for snow views and a frozen alpine lake,
                or <Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass</Link> for panoramic Nanda Devi views on the historic
                Curzon Trail. Both are moderate, fully guided, and need no technical skills.
                <br /><br />
                <span style={{ fontSize: '0.92rem', color: '#6b7280' }}>
                  All five treks are included in our <Link href={PARENT_PATH}>complete ranking of the 10 best treks in Uttarakhand</Link>,
                  which also covers challenging and high-altitude routes for experienced trekkers.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* ── EASY DAY TREKS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Easy Day Treks</span>
            </div>
            <h2 className="med-h2">Easy Day Treks — <span>No Experience Needed</span></h2>
            <p className="med-body">
              Chakrata sits 2–3 hours from Dehradun in dense deodar forest below 2,500 metres.
              These trails require no multi-day gear, no camping, and no altitude acclimatisation.
              They are the ideal first step for anyone who has never walked a mountain trail.
            </p>

            {TREKS.filter(t => t.difficulty === 'Easy').map((trek) => (
              <div key={trek.slug} className="med-card med-trek-card">
                <span className="med-trek-tag">{trek.tag}</span>
                <h3 className="med-h3"><Link href={trek.slug}>{trek.name}</Link></h3>
                <div className="med-trek-meta">
                  <span className="med-trek-meta-pill">{trek.altitude}</span>
                  <span className="med-trek-meta-pill"><span className="med-badge med-badge-easy">{trek.difficulty}</span></span>
                  <span className="med-trek-meta-pill">{trek.days}</span>
                  <span className="med-trek-meta-pill">{trek.season}</span>
                  <span className="med-trek-meta-pill">{trek.location}</span>
                </div>
                <p className="med-body">{trek.description}</p>
                <Link href={trek.slug} className="med-trek-link">View full trek details →</Link>
              </div>
            ))}

            <p className="med-body" style={{ marginTop: '1rem' }}>
              Both Chakrata trails pair well with a <Link href="/retreats/chakrata">Chakrata retreat weekend</Link> —
              trek in the morning, rest and reset in the afternoon.
            </p>
          </div>
        </section>

        {/* ── MODERATE MULTI-DAY ── */}
        <section id="treks" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Moderate Multi-Day Treks</span>
            </div>
            <h2 className="med-h2">Moderate Multi-Day Treks — <span>Your First Himalayan Camping Experience</span></h2>
            <p className="med-body">
              These routes introduce camping at altitude, multi-day rhythm, and the full Himalayan trekking experience —
              but with gradual altitude gain, well-established trails, and professional guides throughout.
              No technical skills needed; 4–6 weeks of fitness preparation recommended.
            </p>

            {TREKS.filter(t => t.difficulty === 'Moderate').map((trek) => (
              <div key={trek.slug} className="med-card med-trek-card">
                <span className="med-trek-tag">{trek.tag}</span>
                <h3 className="med-h3"><Link href={trek.slug}>{trek.name}</Link></h3>
                <div className="med-trek-meta">
                  <span className="med-trek-meta-pill">{trek.altitude}</span>
                  <span className="med-trek-meta-pill"><span className="med-badge med-badge-moderate">{trek.difficulty}</span></span>
                  <span className="med-trek-meta-pill">{trek.days}</span>
                  <span className="med-trek-meta-pill">{trek.season}</span>
                  <span className="med-trek-meta-pill">{trek.location}</span>
                </div>
                <p className="med-body">{trek.description}</p>
                {trek.name === 'Kuari Pass Trek' ? (
                  <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <Link href={trek.slug} className="med-trek-link">View full trek details →</Link>
                    <Link href="/treks/brahmatal-vs-kuari-pass" className="med-trek-link">Compare Brahmatal vs Kuari Pass →</Link>
                  </div>
                ) : (
                  <Link href={trek.slug} className="med-trek-link">View full trek details →</Link>
                )}
              </div>
            ))}

            <div className="med-trek-callout" style={{ marginTop: '1.5rem' }}>
              <p className="med-body">
                <strong>Still deciding between Brahmatal and Kuari Pass?</strong>{' '}
                See our detailed <Link href="/treks/brahmatal-vs-kuari-pass">Brahmatal vs Kuari Pass comparison</Link>{' '}
                for a side-by-side breakdown of season, views, difficulty, and logistics.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          id="plan"
          label="Plan My First Trek"
          subtext="Tell us your dates and fitness level — we will recommend the perfect first route."
          vertical="trek"
          category="filter-beginner"
          sourcePath={PATH}
        />

        {/* ── COMPARISON TABLE ── */}
        <section id="compare" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">At a Glance</span>
            </div>
            <h2 className="med-h2">Beginner Treks <span>at a Glance</span></h2>

            <div className="med-table-wrap">
              <table className="med-table">
                <thead>
                  <tr>
                    <th>Trek</th>
                    <th>Altitude</th>
                    <th>Difficulty</th>
                    <th>Days</th>
                    <th>Best Season</th>
                  </tr>
                </thead>
                <tbody>
                  {TREKS.map((trek) => (
                    <tr key={trek.slug}>
                      <td><Link href={trek.slug}>{trek.name}</Link></td>
                      <td>{trek.altitude}</td>
                      <td>
                        <span className={`med-badge ${trek.difficulty === 'Easy' ? 'med-badge-easy' : 'med-badge-moderate'}`}>
                          {trek.difficulty}
                        </span>
                      </td>
                      <td>{trek.days}</td>
                      <td>{trek.season}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <FeaturedRetreat
          title="Brahmatal Trek — Your First Himalayan Snow Experience"
          description="Frozen lake, snow-covered ridges, and continuous Himalayan views. 4 days, fully guided, no technical skills needed."
          links={[
            { label: 'View Trek Details', href: '/treks/location/lohajung/brahmatal-trek' },
            { label: 'See All Beginner Treks', href: PATH },
            { label: 'Compare Brahmatal vs Kuari Pass', href: '/treks/brahmatal-vs-kuari-pass' },
          ]}
        />

        {/* ── WHAT TO EXPECT ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">What to Expect</span>
            </div>
            <h2 className="med-h2">What to Expect <span>on Your First Trek</span></h2>

            <div className="med-grid-2" style={{ marginTop: '1.5rem' }}>
              <div>
                <h3 className="med-h3" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f766e', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Day Treks (Chakrata)
                </h3>
                <p className="med-body">
                  You will walk 4–8 km on forest trails at low altitude. Carry water, snacks, and rain protection.
                  No special equipment needed. Return to accommodation the same day.
                </p>
              </div>
              <div>
                <h3 className="med-h3" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f766e', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Multi-Day Treks (Brahmatal, Kuari Pass, Khaliya Top)
                </h3>
                <p className="med-body">
                  You will camp in tents at established sites, eat meals prepared by a trek crew, and walk 6–12 km per day
                  with 500–800 m elevation gain. Guides manage navigation, safety, and logistics. Your main job is to walk and enjoy.
                  Basic trekking gear is needed — our <Link href="/treks/garhwal-himalayas/packing-checklist">packing checklist</Link> covers everything.
                </p>
              </div>
            </div>

            <p className="med-body" style={{ marginTop: '1.5rem' }}>
              Ready to progress beyond beginner routes? The{' '}
              <Link href={`${PARENT_PATH}#challenging-treks`}>challenging treks section</Link>{' '}
              covers Roopkund, Pangarchulla, and Milam Glacier for experienced trekkers.
            </p>
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'All 10 Best Treks in Uttarakhand', href: PARENT_PATH },
            { label: 'Snow Treks in Uttarakhand', href: `${PARENT_PATH}/snow` },
            { label: 'Brahmatal vs Kuari Pass Comparison', href: '/treks/brahmatal-vs-kuari-pass' },
            { label: 'Garhwal Himalayas Trekking Guide', href: '/treks/garhwal-himalayas' },
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

        {/* ── BROWSE BY CATEGORY ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
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
              <Link href={`${PARENT_PATH}/snow`} className="med-nav-link">
                <span>Snow Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href={`${PARENT_PATH}/high-altitude`} className="med-nav-link">
                <span>High-Altitude Treks Above 4,000 m</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href={`${PARENT_PATH}/challenging`} className="med-nav-link">
                <span>Challenging Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/garhwal-himalayas" className="med-nav-link" style={{ borderBottom: 'none' }}>
                <span>Garhwal Himalayas — Complete Trekking Guide</span>
                <span className="med-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <div className="med-trek-footer">
          <Link href="/treks">← All Treks</Link>
          <Link href={PARENT_PATH}>Best Treks in Uttarakhand</Link>
          <Link href="/treks/trek-near-delhi">Weekend Treks Near Delhi</Link>
          <Link href="/treks/location/chakrata">Chakrata Treks</Link>
        </div>

      </article>
    </TrackedPage>
  );
}