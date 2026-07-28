import { Metadata } from 'next';
import Link from 'next/link';
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
import FeaturedRetreat from '@/components/FeaturedRetreat';
import RelatedReads from '@/components/RelatedReads';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const PATH = '/treks/garhwal-himalayas';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Garhwal Himalaya Treks | Retreats And Treks',
    description:
      'Compare the best Garhwal Himalaya treks by difficulty, season, route, and altitude — Brahmatal, Kuari Pass, Roopkund, and Pangarchulla.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Best Treks in Garhwal Himalayas — Routes from 3,850m to 4,800m',
      description:
        'Compare 4 high-altitude Garhwal treks by difficulty, season & views. Brahmatal, Kuari Pass, Roopkund, Pangarchulla — the complete planning guide.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Best Treks in Garhwal Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What are the best treks in the Garhwal Himalayas?',
    answer:
      'The four premier treks in the Garhwal Himalaya are Brahmatal (frozen lake trek from Lohajung, moderate difficulty), Roopkund (the mystery lake trek at 4,800 metres, challenging), Kuari Pass (Lord Curzon Trail from Joshimath, moderate with panoramic Nanda Devi views), and Pangarchulla (a true summit climb to 4,590 metres, challenging). Each offers a different character — from winter snow treks to high-altitude summit pushes.',
  },
  {
    question: 'How do I reach Garhwal trekking bases?',
    answer:
      'The two main trek bases in Garhwal are Lohajung and Joshimath. Lohajung is reached via a 10-hour drive from Rishikesh through Karnaprayag and Dewal. Joshimath is approximately 270 km from Rishikesh (9–10 hours) via Rudraprayag and Chamoli. Both have regular bus services and shared taxis from Rishikesh and Haridwar. The nearest rail head is Haridwar; the nearest airport is Jolly Grant in Dehradun.',
  },
  {
    question: 'What is the best season for Garhwal Himalaya treks?',
    answer:
      'It depends on the trek. Brahmatal is a winter trek best done December to March. Roopkund has two windows: pre-monsoon (May–June) and post-monsoon (September–October). Kuari Pass is excellent in spring (March–May) and autumn (October–November). Pangarchulla is best in March to May when consolidated snow allows the summit push. Monsoon (July–August) should be avoided across all Garhwal routes due to heavy rainfall and trail instability.',
  },
  {
    question: 'Are Garhwal treks suitable for beginners?',
    answer:
      'Brahmatal and Kuari Pass are moderate-difficulty treks accessible to first-time Himalayan trekkers with reasonable fitness. Both keep below 4,000 metres and have no technical sections. Roopkund and Pangarchulla are challenging routes recommended for experienced trekkers with prior high-altitude exposure above 4,000 metres. If you are new to Himalayan trekking, start with Brahmatal or Kuari Pass before attempting the higher routes.',
  },
  {
    question: 'How does Garhwal compare to other trekking regions in Uttarakhand?',
    answer:
      'Garhwal offers higher altitude and more dramatic Himalayan scenery than the mid-altitude trails around Chakrata (2,000–2,400 metres). Compared to the Sankri-based treks in western Garhwal (Kedarkantha, Har Ki Dun), the Lohajung and Joshimath routes access the Nanda Devi Sanctuary zone — among the most spectacular mountain landscapes in India. Garhwal treks generally require more days (5–7) and greater fitness than weekend trails near Dehradun.',
  },
  {
    question: 'Is Brahmatal safe for beginners with no trekking experience?',
    answer:
      'Yes. Brahmatal is one of the safest introductory Himalayan treks. It stays below 4,000 metres (AMS risk is minimal at 3,850 m), has no technical sections like rock scrambles or fixed ropes, and follows a well-established trail from Lohajung with reliable guide support. The moderate 4-day duration keeps fatigue manageable. Beginners should maintain 3–4 weeks of regular cardio (jogging, cycling) beforehand and carry proper cold-weather gear for winter conditions.',
  },
  {
    question: 'Which is harder — Kuari Pass or Kedarkantha?',
    answer:
      'They are close in difficulty — both are moderate treks reaching similar altitudes (Kuari Pass at 3,876 m, Kedarkantha at 3,800 m). The key difference is structure: Kedarkantha has a steep summit-day push while Kuari Pass spreads elevation gain more evenly across 5 days. For pure physical demand, the Kedarkantha summit day is harder; for sustained multi-day effort, Kuari Pass is slightly more taxing. Neither requires technical skills.',
  },
];

const GARHWAL_TREKS = [
  {
    name: 'Brahmatal Trek — The Frozen Lake Winter Classic',
    slug: '/treks/location/lohajung/brahmatal-trek',
    altitude: '3,850 m',
    duration: '4 days',
    season: 'December–March',
    difficulty: 'Moderate',
    tag: '❄️ Winter Classic',
    description:
      'The premier winter trek in Garhwal — a 22 km route from Lohajung to the frozen Brahmatal lake at 3,850 metres. The trail passes through dense oak and rhododendron forest before emerging onto snow-covered ridges with views of Trishul and Nanda Ghunti.',
  },
  {
    name: 'Roopkund Trek — The Mystery Lake Expedition',
    slug: '/treks/location/lohajung/roopkund-trek',
    altitude: '4,800 m',
    duration: '7 days',
    season: 'May–June, Sep–Oct',
    difficulty: 'Challenging',
    tag: '🏔️ Expedition',
    description:
      'One of the most iconic routes in the Indian Himalayas — a 53 km expedition from Lohajung to the glacial Roopkund Lake at 4,800 metres, famous for the ancient human skeletal remains discovered at its shores. The route crosses the vast Bedni Bugyal alpine meadow and navigates exposed high-altitude terrain.',
  },
  {
    name: 'Kuari Pass Trek — The Panoramic Ridge Walk',
    slug: '/treks/location/joshimath/kuari-pass-trek',
    altitude: '3,876 m',
    duration: '5 days',
    season: 'Mar–May, Oct–Nov',
    difficulty: 'Moderate',
    tag: '🌄 Ridge Walk',
    description:
      'Follows the historic Lord Curzon Trail along a high ridge offering near-continuous views of the Nanda Devi Sanctuary, Dronagiri, Chaukhamba, and Kamet. Widely considered the finest view-to-effort ratio of any trek in Uttarakhand.',
  },
  {
    name: 'Pangarchulla Peak Trek — The Summit Challenge',
    slug: '/treks/location/joshimath/pangarchulla-trek',
    altitude: '4,590 m',
    duration: '6 days',
    season: 'March–May',
    difficulty: 'Challenging',
    tag: '⛰️ Summit',
    description:
      'Combines the Kuari Pass approach with a true summit push to 4,590 metres — one of the few accessible summit experiences in Garhwal. The final day involves a steep snow-and-scree ascent with an alpine start, rewarded by a 360° panorama of Nanda Devi and the Nanda Devi Sanctuary.',
  },
];

const REGIONS_COMPARISON = [
  {
    name: 'Chakrata',
    slug: '/treks/location/chakrata',
    altitude: '2,000–2,400 m',
    difficulty: 'Easy',
    description:
      'Weekend-accessible from Dehradun. Forest trails, limestone caves, waterfalls. Ideal for first-time trekkers, families, and those combining a trek with a wellness retreat. No high-altitude exposure.',
  },
  {
    name: 'Sankri',
    slug: '/treks/location/sankri',
    altitude: '3,500–3,800 m',
    difficulty: 'Moderate–Challenging',
    description:
      'Multi-day alpine treks including Kedarkantha (the classic winter snow summit) and Har Ki Dun (the contemplative valley trek). The best winter trekking base in Uttarakhand.',
  },
  {
    name: 'Garhwal Interior',
    slug: '#',
    altitude: '3,800–4,800 m',
    difficulty: 'Moderate–Challenging',
    description:
      'The highest altitude routes in Uttarakhand trekking. Glacier lakes, summit climbs, Nanda Devi panoramas. Multi-day commitments (4–7 days on trail). The choice when you want genuine high-Himalayan exposure.',
  },
];

const SEASONS = [
  {
    season: 'Winter',
    months: 'December–March',
    active: true,
    treks: 'Brahmatal',
    description:
      'Brahmatal is the standout winter route — frozen lakes, snow-covered ridges, and clear mountain visibility. Kuari Pass is also feasible in early spring (March) with lingering snow.',
  },
  {
    season: 'Spring',
    months: 'March–May',
    active: true,
    treks: 'Kuari Pass, Pangarchulla',
    description:
      'The widest trekking window. Both Kuari Pass and Pangarchulla are in prime condition. Brahmatal transitions from snow to green in late March. Rhododendron blooms colour the forests below 3,500 metres.',
  },
  {
    season: 'Pre-Monsoon',
    months: 'May–June',
    active: true,
    treks: 'Roopkund',
    description:
      'Roopkund\'s primary window. Snow line retreats above 4,000 metres, making the higher routes passable. Temperatures are warm at lower elevations. Morning skies are typically clear.',
  },
  {
    season: 'Monsoon',
    months: 'July–August',
    active: false,
    treks: '—',
    description:
      'Not recommended for any Garhwal trek. Heavy rainfall, trail erosion, landslide risk, and zero visibility above the treeline. All guided operations suspend during this period.',
  },
  {
    season: 'Autumn',
    months: 'September–November',
    active: true,
    treks: 'Roopkund, Kuari Pass',
    description:
      'Roopkund\'s secondary window. Kuari Pass is outstanding in October–November with the sharpest mountain visibility of the year. Temperatures drop quickly after October.',
  },
];

export default function GarhwalHimalayasTreksPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Garhwal Himalayas', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Treks in Garhwal Himalayas — Routes from 3,850m to 4,800m',
    description:
      'Compare 4 high-altitude Garhwal treks by difficulty, season & views. Brahmatal, Kuari Pass, Roopkund, Pangarchulla — the complete planning guide.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Best Treks in the Garhwal Himalayas".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Best Treks in Garhwal Himalayas — Routes from 3,850m to 4,800m"
        description="Compare 4 high-altitude Garhwal treks by difficulty, season & views. Brahmatal, Kuari Pass, Roopkund, Pangarchulla — the complete planning guide."
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

        /* ── Meta Pills ── */
        .med-meta-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .med-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          color: #4b5259;
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 999px;
          padding: 5px 14px;
        }
        .med-meta-pill .med-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0f766e;
        }

        /* ── Trek Cards ── */
        .med-trek-card {
          padding: 1.5rem;
          border-left: 3px solid #0f766e;
          transition: all 0.35s ease;
        }
        .med-trek-card:hover {
          transform: translateX(6px);
          box-shadow: 0 16px 40px rgba(15,118,110,0.08);
        }
        .med-trek-card.med-trek-challenging {
          border-left-color: #e65100;
        }
        .med-trek-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.2rem; }
        .med-trek-card .med-h3 a { color: #0f766e; font-weight: 600; text-decoration: none; transition: color 0.3s; }
        .med-trek-card .med-h3 a:hover { color: #0d6b64; text-decoration: underline; }
        .med-trek-card .med-body { font-size: 0.92rem; margin-bottom: 0; }
        .med-trek-card .med-trek-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.3rem 0.75rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          color: #6b7280;
          margin: 0.3rem 0 0.65rem;
        }
        .med-trek-card .med-trek-meta span {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .med-trek-card .med-trek-meta span::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #0f766e;
          display: inline-block;
        }
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
        .med-trek-card.med-trek-challenging .med-trek-tag {
          color: #e65100;
          background: rgba(230,81,0,0.08);
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
        .med-badge-challenging {
          background: rgba(230,81,0,0.08);
          color: #e65100;
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

        /* ── Base Cards ── */
        .med-base-card {
          padding: 1.5rem;
          border-top: 3px solid #0f766e;
          transition: all 0.35s ease;
        }
        .med-base-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(15,118,110,0.06);
        }
        .med-base-card .med-h3 { font-size: 1rem; margin-bottom: 0.3rem; }
        .med-base-card .med-h3 a { color: #0f766e; font-weight: 600; text-decoration: none; }
        .med-base-card .med-h3 a:hover { text-decoration: underline; }
        .med-base-card .med-body { font-size: 0.88rem; margin-bottom: 0; }

        /* ── Season Cards ── */
        .med-season-item {
          display: grid;
          grid-template-columns: 2.5rem 1fr;
          gap: 0 1.25rem;
          padding-bottom: 1.5rem;
        }
        .med-season-item:last-child { padding-bottom: 0; }
        .med-season-item .med-dot {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .med-season-item .med-dot .med-circle {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid #0f766e;
          flex-shrink: 0;
          margin-top: 0.22rem;
        }
        .med-season-item .med-dot .med-circle.med-inactive {
          border-color: #d1d5db;
          background: #f3f4f6;
        }
        .med-season-item .med-dot .med-line {
          width: 1px;
          flex: 1;
          min-height: 1.5rem;
          margin-top: 4px;
          background: linear-gradient(to bottom, rgba(15,118,110,0.2), rgba(15,118,110,0.04));
        }
        .med-season-item .med-content .med-header {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          margin-bottom: 0.4rem;
        }
        .med-season-item .med-content .med-header .med-name {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: #2B2A26;
        }
        .med-season-item .med-content .med-header .med-months {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.72rem;
          font-weight: 400;
          color: #6b7280;
        }
        .med-season-item .med-content .med-header .med-treks {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          color: #0f766e;
          background: rgba(15,118,110,0.08);
          padding: 0.1rem 0.6rem;
          border-radius: 999px;
        }
        .med-season-item .med-content .med-body { font-size: 0.88rem; margin-bottom: 0; }

        .med-season-item.med-inactive .med-content .med-header .med-name { color: #9ca3af; }
        .med-season-item.med-inactive .med-content .med-header .med-treks { color: #9ca3af; background: #f3f4f6; }
        .med-season-item.med-inactive .med-content .med-body { color: #9ca3af; }

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

        /* ── Region Cards ── */
        .med-region-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 720px) { .med-region-grid { grid-template-columns: 1fr; } }
        .med-region-card {
          padding: 1.5rem;
          border-top: 2px solid #94a3b8;
        }
        .med-region-card.med-region-highlight {
          border-top-color: #0f766e;
          border: 1px solid rgba(15,118,110,0.12);
        }
        .med-region-card .med-h3 { font-size: 0.95rem; margin-bottom: 0.2rem; }
        .med-region-card .med-h3 a { color: #0f766e; font-weight: 600; text-decoration: none; }
        .med-region-card .med-h3 a:hover { text-decoration: underline; }
        .med-region-card .med-alt {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 400;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }
        .med-region-card .med-body { font-size: 0.85rem; margin-bottom: 0; }

        /* ── Decision Cards ── */
        .med-decision-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        @media (max-width: 720px) { .med-decision-grid { grid-template-columns: 1fr; } }
        .med-decision-card {
          padding: 1.5rem;
          transition: all 0.3s ease;
        }
        .med-decision-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(15,118,110,0.06);
        }
        .med-decision-card .med-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0f766e;
        }
        .med-decision-card.med-decision-challenging .med-label { color: #e65100; }
        .med-decision-card .med-h3 { font-size: 0.95rem; margin-bottom: 0.3rem; }
        .med-decision-card .med-h3 a { color: #2B2A26; font-weight: 500; text-decoration: none; }
        .med-decision-card .med-h3 a:hover { color: #0f766e; text-decoration: underline; }
        .med-decision-card .med-body { font-size: 0.85rem; margin-bottom: 0; }

        /* ── Planning List ── */
        .med-plan-item {
          display: grid;
          grid-template-columns: 2.5rem 1fr;
          gap: 0 1.25rem;
          padding-bottom: 1.5rem;
        }
        .med-plan-item:last-child { padding-bottom: 0; }
        .med-plan-item .med-dot {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .med-plan-item .med-dot .med-circle {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid #0f766e;
          background: rgba(15,118,110,0.12);
          flex-shrink: 0;
          margin-top: 0.22rem;
        }
        .med-plan-item .med-dot .med-line {
          width: 1px;
          flex: 1;
          min-height: 1.5rem;
          margin-top: 4px;
          background: linear-gradient(to bottom, rgba(15,118,110,0.2), rgba(15,118,110,0.04));
        }
        .med-plan-item .med-content .med-body { font-size: 0.92rem; margin-bottom: 0; }
        .med-plan-item .med-content .med-body strong { color: #2B2A26; }

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

        .med-callout {
          padding: 1.25rem 1.5rem;
          background: #f7f9f7;
          border: 1px solid rgba(15,118,110,0.08);
          border-left: 4px solid #0f766e;
          border-radius: 12px;
          transition: all 0.3s;
        }
        .med-callout:hover {
          border-color: rgba(15,118,110,0.2);
          box-shadow: 0 4px 16px rgba(15,118,110,0.04);
        }
        .med-callout .med-body { margin: 0; }
        .med-callout .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-callout .med-body a:hover { text-decoration: underline; }
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
              { name: 'Garhwal Himalayas' },
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
              The Garhwal Himalaya stretches across the northern arc of Uttarakhand — from the Nanda Devi Sanctuary in the east to the Gangotri massif in the west. This is where India's highest peaks live: Nanda Devi at 7,816 metres, Kamet, Chaukhamba, Dronagiri, and dozens of 6,000-metre summits.
            </p>
            <div className="med-hero-tags">
              <span>Brahmatal</span>
              <span>Kuari Pass</span>
              <span>Roopkund</span>
              <span>Pangarchulla</span>
            </div>
            <div className="med-hero-actions">
              <a href="#treks" className="med-cta-btn">View Treks</a>
              <a href="#compare" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Compare Routes</a>
            </div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="med-shell med-section-white med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-meta-pills">
              {[
                { label: 'Routes', value: '4 Treks' },
                { label: 'Altitude', value: '3,850m – 4,800m' },
                { label: 'Bases', value: 'Lohajung & Joshimath' },
                { label: 'Season', value: 'Dec – Jun, Sep – Nov' },
              ].map((item) => (
                <span key={item.label} className="med-meta-pill">
                  <span className="med-label">{item.label}</span>
                  {item.value}
                </span>
              ))}
            </div>

            <p className="med-body">
              Unlike the heavily trafficked circuits of Nepal or the permit-restricted zones of Ladakh, the Garhwal trekking routes retain a sense of wildness and solitude. Two base towns — <Link href="/treks/location/lohajung">Lohajung</Link> and <Link href="/treks/location/joshimath">Joshimath</Link> — serve as launchpads for four distinct routes that together cover the full spectrum of Himalayan trekking.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              From moderate ridge walks with continuous panoramas to challenging summit pushes above 4,500 metres, Garhwal offers some of the most scenic and accessible high-altitude routes in the entire Himalayan range. Explore all routes in our <Link href="/treks/best-treks-in-uttarakhand">Best Treks in Uttarakhand</Link> guide.
            </p>
          </div>
        </section>

        <PrimaryCTA
          id="plan"
          label="Plan My Garhwal Trek"
          subtext="Tell us your dates and experience level. We will match you to the right Garhwal route."
          vertical="trek"
          category="region"
          sourcePath={PATH}
        />

        {/* ── GEOGRAPHY ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Terrain</span>
            </div>
            <h2 className="med-h2">Garhwal Geography: <span>Understanding the Terrain</span></h2>
            <p className="med-body">
              The Garhwal division of Uttarakhand encompasses the districts of Chamoli, Rudraprayag, Uttarkashi, Tehri, Pauri, Dehradun, and Haridwar. The trekking terrain lies primarily in Chamoli district — the administrative heart of the Nanda Devi Biosphere Reserve.
            </p>
            <p className="med-body">
              The geological character of Garhwal is defined by the Main Central Thrust — the tectonic boundary where the Indian plate dives beneath the Eurasian plate. This has produced a landscape of extraordinary vertical relief: valleys at 1,500 metres sit within direct sight of peaks above 7,000 metres.
            </p>

            <div className="med-list" style={{ marginTop: '1.5rem' }}>
              <div className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">
                  <strong>Nanda Devi Sanctuary zone.</strong> The <Link href="/treks/location/lohajung/roopkund-trek">Roopkund</Link> and <Link href="/treks/location/joshimath/pangarchulla-trek">Pangarchulla</Link> routes approach the outer rim of the Nanda Devi Sanctuary.
                </span>
              </div>
              <div className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">
                  <strong>Lake and glacier systems.</strong> Garhwal's trekking routes pass through a landscape shaped by Pleistocene glaciation — cirque lakes like <Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal</Link> and Roopkund.
                </span>
              </div>
              <div className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">
                  <strong>Ridge and valley structure.</strong> The <Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass</Link> route follows a high ridge with the peaks arrayed before you for kilometres at a stretch.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── BASE TOWNS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Base Towns</span>
            </div>
            <h2 className="med-h2">Garhwal Trek Bases: <span>Lohajung &amp; Joshimath</span></h2>
            <p className="med-body">
              All four Garhwal treks launch from one of two base towns, each with a distinct character and access profile.
            </p>

            <div className="med-grid-2" style={{ marginTop: '1.5rem' }}>
              <div className="med-card med-base-card">
                <h3 className="med-h3"><Link href="/treks/location/lohajung">Lohajung — Gateway to Brahmatal &amp; Roopkund</Link></h3>
                <p className="med-body">
                  Lohajung is a small roadhead village at 2,350 metres in the Chamoli district. Reached by a 10-hour drive from Rishikesh, Lohajung is as far from a tourist town as you can get — basic guesthouses, a handful of dhabas, and the quiet intensity of a working mountain village.
                </p>
              </div>
              <div className="med-card med-base-card">
                <h3 className="med-h3"><Link href="/treks/location/joshimath">Joshimath — Gateway to Kuari Pass &amp; Pangarchulla</Link></h3>
                <p className="med-body">
                  Joshimath sits at 1,875 metres on the pilgrim road to Badrinath — a historic mountain town with deep religious significance. Better connected than Lohajung, with regular bus services from Rishikesh and more accommodation options.
                </p>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Garhwal Trek"
          subtext="Not sure which route? We can help you choose based on your fitness, dates, and experience."
          vertical="trek"
          category="region"
          sourcePath={PATH}
        />

        {/* ── THE FOUR TREKS ── */}
        <section id="treks" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Routes</span>
            </div>
            <h2 className="med-h2">The Four Great <span>Garhwal Treks</span></h2>
            <p className="med-body">
              Each trek occupies a distinct niche — different difficulty, different season, different mountain character. Together they cover the full Garhwal trekking spectrum.
            </p>

            {GARHWAL_TREKS.map((trek) => {
              const isChallenging = trek.difficulty === 'Challenging';
              return (
                <div key={trek.slug} className={`med-card med-trek-card ${isChallenging ? 'med-trek-challenging' : ''}`} style={{ marginBottom: '1.25rem' }}>
                  <span className="med-trek-tag">{trek.tag}</span>
                  <h3 className="med-h3"><Link href={trek.slug}>{trek.name}</Link></h3>
                  <div className="med-trek-meta">
                    <span>{trek.altitude}</span>
                    <span>{trek.duration}</span>
                    <span>{trek.season}</span>
                    <span><span className={`med-badge ${isChallenging ? 'med-badge-challenging' : 'med-badge-moderate'}`}>{trek.difficulty}</span></span>
                  </div>
                  <p className="med-body">{trek.description}</p>
                  <Link href={trek.slug} className="med-trek-link">View full trek details →</Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SEASONAL GUIDE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Best Time to Go</span>
            </div>
            <h2 className="med-h2">When to Trek in Garhwal: <span>Seasonal Guide</span></h2>
            <p className="med-body">
              Garhwal trekking is not a single-season activity — different routes open in different months, and the landscape transforms dramatically with the seasons.
            </p>

            {SEASONS.map((season, i, arr) => {
              const isInactive = !season.active;
              return (
                <div key={season.season} className={`med-season-item ${isInactive ? 'med-inactive' : ''}`} style={{ paddingBottom: i < arr.length - 1 ? '1.5rem' : '0' }}>
                  <div className="med-dot">
                    <span className={`med-circle ${isInactive ? 'med-inactive' : ''}`} />
                    {i < arr.length - 1 && <span className="med-line" />}
                  </div>
                  <div className="med-content">
                    <div className="med-header">
                      <span className="med-name">{season.season}</span>
                      <span className="med-months">{season.months}</span>
                      {season.treks && <span className="med-treks">{season.treks}</span>}
                    </div>
                    <p className="med-body">{season.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section id="compare" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Compare Routes</span>
            </div>
            <h2 className="med-h2">Difficulty &amp; Altitude <span>Comparison</span></h2>
            <p className="med-body">
              Choosing the right Garhwal trek depends on your experience level and the kind of challenge you want.
            </p>

            <div className="med-table-wrap">
              <table className="med-table">
                <thead>
                  <tr>
                    <th>Trek</th>
                    <th>Difficulty</th>
                    <th>Max Altitude</th>
                    <th>Duration</th>
                    <th>Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { href: '/treks/location/lohajung/brahmatal-trek', name: 'Brahmatal', diff: 'Moderate', alt: '3,850 m', dur: '4 days', best: 'Winter snow trek, first Garhwal experience' },
                    { href: '/treks/location/joshimath/kuari-pass-trek', name: 'Kuari Pass', diff: 'Moderate', alt: '3,876 m', dur: '5 days', best: 'Panoramic views, spring / autumn trek' },
                    { href: '/treks/location/joshimath/pangarchulla-trek', name: 'Pangarchulla', diff: 'Challenging', alt: '4,590 m', dur: '6 days', best: 'Summit experience, experienced trekkers' },
                    { href: '/treks/location/lohajung/roopkund-trek', name: 'Roopkund', diff: 'Challenging', alt: '4,800 m', dur: '7 days', best: 'Expedition-style, iconic destination' },
                  ].map((row) => {
                    const isChallenging = row.diff === 'Challenging';
                    return (
                      <tr key={row.name}>
                        <td><Link href={row.href}>{row.name}</Link></td>
                        <td><span className={`med-badge ${isChallenging ? 'med-badge-challenging' : 'med-badge-moderate'}`}>{row.diff}</span></td>
                        <td>{row.alt}</td>
                        <td>{row.dur}</td>
                        <td>{row.best}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="med-callout" style={{ marginTop: '1.5rem' }}>
              <p className="med-body">
                <strong>For beginners:</strong> Start with <Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal</Link> or <Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass</Link>. Both stay below 4,000 metres and have no technical sections.
              </p>
              <p className="med-body" style={{ marginTop: '0.5rem' }}>
                <strong>For experienced trekkers:</strong> <Link href="/treks/location/joshimath/pangarchulla-trek">Pangarchulla</Link> and <Link href="/treks/location/lohajung/roopkund-trek">Roopkund</Link> demand prior high-altitude experience.
              </p>
            </div>
          </div>
        </section>

        {/* ── REGIONAL COMPARISON ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Regional Context</span>
            </div>
            <h2 className="med-h2">Garhwal vs Other <span>Uttarakhand Trekking Regions</span></h2>
            <p className="med-body">
              Uttarakhand offers trekking across three distinct zones. Each serves a different kind of trekker.
            </p>

            <div className="med-region-grid" style={{ marginTop: '1.5rem' }}>
              {REGIONS_COMPARISON.map((region) => {
                const isHighlight = region.name === 'Garhwal Interior';
                return (
                  <div key={region.name} className={`med-card med-region-card ${isHighlight ? 'med-region-highlight' : ''}`}>
                    <h3 className="med-h3">{region.name === 'Garhwal Interior' ? region.name : <Link href={region.slug}>{region.name}</Link>}</h3>
                    <div className="med-alt">{region.altitude} · {region.difficulty}</div>
                    <p className="med-body">{region.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PLANNING ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Planning</span>
            </div>
            <h2 className="med-h2">How to Plan a <span>Garhwal Himalaya Trek</span></h2>

            <div className="med-plan-item">
              <div className="med-dot">
                <span className="med-circle" />
                <span className="med-line" />
              </div>
              <div className="med-content">
                <p className="med-body"><strong>Getting there.</strong> Both Lohajung and Joshimath are reached via Rishikesh. From Rishikesh, Joshimath is a 9–10 hour drive; Lohajung is approximately 10 hours.</p>
              </div>
            </div>
            <div className="med-plan-item">
              <div className="med-dot">
                <span className="med-circle" />
                <span className="med-line" />
              </div>
              <div className="med-content">
                <p className="med-body"><strong>Duration.</strong> Plan for the full trek duration plus 2 travel days each way. A Brahmatal trek is a 7–8 day commitment; Roopkund requires 10–11 days.</p>
              </div>
            </div>
            <div className="med-plan-item">
              <div className="med-dot">
                <span className="med-circle" />
                <span className="med-line" />
              </div>
              <div className="med-content">
                <p className="med-body"><strong>Fitness preparation.</strong> For Brahmatal and Kuari Pass, 3–4 weeks of daily cardio is sufficient. For Roopkund and Pangarchulla, 6–8 weeks of structured preparation is required.</p>
              </div>
            </div>
            <div className="med-plan-item" style={{ paddingBottom: 0 }}>
              <div className="med-dot">
                <span className="med-circle" />
              </div>
              <div className="med-content">
                <p className="med-body"><strong>Guided vs independent.</strong> All four Garhwal treks are best done with guided operators. The routes are remote, rescue infrastructure is limited, and weather changes rapidly above 3,500 metres.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── DECISION GUIDES ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decide</span>
            </div>
            <h2 className="med-h2">Choosing Your <span>Garhwal Route</span></h2>
            <p className="med-body">
              Not sure which route fits your experience? We have built two detailed comparison guides that break down the real differences.
            </p>

            <div className="med-decision-grid" style={{ marginTop: '1.5rem' }}>
              <Link href="/treks/brahmatal-vs-kuari-pass" className="med-card med-decision-card" style={{ textDecoration: 'none' }}>
                <span className="med-label">Moderate treks</span>
                <h3 className="med-h3">Brahmatal vs Kuari Pass — which moderate Garhwal trek? →</h3>
                <p className="med-body">Covers the frozen lake versus panoramic ridge decision. If this is your first trek in the region, start here.</p>
              </Link>
              <Link href="/treks/roopkund-vs-pangarchulla" className="med-card med-decision-card med-decision-challenging" style={{ textDecoration: 'none' }}>
                <span className="med-label">Challenging treks</span>
                <h3 className="med-h3">Roopkund vs Pangarchulla — expedition or summit? →</h3>
                <p className="med-body">Compares the high-altitude mystery lake expedition with the demanding peak climb. For experienced trekkers.</p>
              </Link>
            </div>

            <div className="med-callout" style={{ marginTop: '1.5rem' }}>
              <p className="med-body">
                <strong>The progression path:</strong> Most trekkers move through Garhwal in stages — a <Link href="/treks/location/lohajung/brahmatal-trek">moderate snow trek from Lohajung</Link> or a <Link href="/treks/location/joshimath/kuari-pass-trek">spring ridge walk from Joshimath</Link> builds the altitude confidence needed for the <Link href="/treks/location/lohajung/roopkund-trek">challenging routes above 4,500 metres</Link>.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Garhwal Trek"
          subtext="Share your experience level and preferred dates. We will recommend the right Garhwal route."
          vertical="trek"
          category="region"
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
              <span className="med-eyebrow-text">FAQs</span>
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
            { label: 'Brahmatal vs Kuari Pass Comparison', href: '/treks/brahmatal-vs-kuari-pass' },
            { label: 'Roopkund vs Pangarchulla Comparison', href: '/treks/roopkund-vs-pangarchulla' },
            { label: 'Beginner Treks in Uttarakhand', href: '/treks/best-treks-in-uttarakhand/beginner' },
          ]}
        />

        {/* ── EXPLORE MORE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Keep Exploring</span>
            </div>
            <h2 className="med-h2">Explore <span>More Treks</span></h2>

            <div className="med-nav-group">
              <Link href="/treks/brahmatal-vs-kuari-pass" className="med-nav-link">
                <span>Brahmatal vs Kuari Pass — Moderate Trek Comparison</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/roopkund-vs-pangarchulla" className="med-nav-link">
                <span>Roopkund vs Pangarchulla — Challenging Trek Comparison</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/location/lohajung" className="med-nav-link">
                <span>Treks from Lohajung</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/location/joshimath" className="med-nav-link">
                <span>Treks from Joshimath</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/best-treks-in-uttarakhand/snow" className="med-nav-link">
                <span>Winter Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/summer-treks-uttarakhand" className="med-nav-link">
                <span>Summer Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/best-treks-in-uttarakhand/beginner" className="med-nav-link">
                <span>Beginner Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/location/chakrata" className="med-nav-link">
                <span>Weekend Treks from Chakrata</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/best-treks-in-uttarakhand" className="med-nav-link">
                <span>Best Treks in Uttarakhand — Master Guide</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/garhwal-himalayas/fitness-guide" className="med-nav-link" style={{ borderBottom: 'none' }}>
                <span>8-Week Fitness Guide for Garhwal Treks</span>
                <span className="med-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <div className="med-trek-footer">
          <Link href="/treks">← All Treks</Link>
          <Link href="/treks/best-treks-in-uttarakhand">Best Treks in Uttarakhand</Link>
          <Link href="/treks/location/lohajung">Lohajung Treks</Link>
          <Link href="/treks/location/joshimath">Joshimath Treks</Link>
        </div>

      </article>
    </TrackedPage>
  );
}