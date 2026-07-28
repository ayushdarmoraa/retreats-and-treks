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

const PATH = '/treks/best-treks-in-uttarakhand/challenging';
const PARENT_PATH = '/treks/best-treks-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Challenging Treks in Uttarakhand | Retreats And Treks',
    description:
      'Most challenging treks in Uttarakhand for experienced trekkers, including Roopkund, Pangarchulla, and Milam Glacier with difficulty and fitness guidance.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Challenging Treks in Uttarakhand — For Experienced Trekkers',
      description:
        'Curated selection of difficult treks in Uttarakhand for experienced trekkers — Roopkund, Pangarchulla, and Milam Glacier.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Challenging Treks in Uttarakhand'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the most difficult trek in Uttarakhand?',
    answer:
      'Milam Glacier is the most demanding in terms of sustained commitment — 8–10 days, 118 km, through remote Kumaon terrain with limited evacuation options. Roopkund is the most demanding in terms of altitude (4,800 m with multiple days above 4,000 m). Pangarchulla has the most intense single day — a 1,200 m alpine-start summit push through snow.',
  },
  {
    question: 'What experience do I need for challenging treks?',
    answer:
      'Prior high-altitude experience above 3,500 m is essential — ideally Kedarkantha, Kuari Pass, or Brahmatal. You should have completed at least 2–3 multi-day treks and be comfortable with camping, cold weather, and sustained physical effort across 6–8 hours per day.',
  },
  {
    question: 'How fit do I need to be for Roopkund or Pangarchulla?',
    answer:
      '6–8 weeks of structured preparation: running/cycling 30–45 min 4x/week, loaded stair climbing (15 kg pack) 2x/week, and core stability work. You should be able to run 5 km in under 30 minutes and climb 60 floors in an hour with a loaded pack before attempting either route.',
  },
  {
    question: 'Which challenging trek should I do first — Roopkund or Pangarchulla?',
    answer:
      'Pangarchulla if you prefer a concentrated summit challenge (one very hard day). Roopkund if you prefer sustained expedition-style trekking (multiple days above 4,000 m). Both require similar fitness, but the physical demands are distributed differently.',
  },
];

const TREKS = [
  {
    name: 'Roopkund — The Mystery Lake Expedition',
    slug: '/treks/location/lohajung/roopkund-trek',
    image: '/Images/trek/challenging/roopkund_lake.webp',
    alt: 'Roopkund trek — glacial lake at 4800m in Garhwal Himalaya',
    altitude: '4,800 m',
    difficulty: 'Challenging',
    days: '7 days',
    season: 'May–Jun, Sep–Oct',
    location: 'Lohajung, Garhwal',
    tag: '🏔️ Expedition',
    description:
      'Roopkund is India\'s most iconic high-altitude trek — a 53 km expedition from Lohajung to a glacial lake at 4,800 metres, known for the centuries-old skeletal remains at its shores. The route crosses the vast Bedni Bugyal alpine meadow, navigates moraine fields, and demands sustained altitude tolerance across multiple days above 4,000 metres.',
    why:
      'Unlike Pangarchulla (where the difficulty concentrates in a single summit day), Roopkund distributes its demands across 7 days with sustained exposure above 4,000 m. Altitude sickness risk is cumulative. The moraine fields above 4,200 m require careful foot placement for hours at a time. Weather deteriorates rapidly above the Bugyal. This is expedition trekking, not a weekend challenge.',
  },
  {
    name: 'Pangarchulla Peak — The Summit Climb',
    slug: '/treks/location/joshimath/pangarchulla-trek',
    image: '/Images/trek/challenging/pangarchulla.webp',
    alt: 'Pangarchulla peak — summit climb at 4590m from Joshimath',
    altitude: '4,590 m',
    difficulty: 'Challenging',
    days: '6 days',
    season: 'Mar–May',
    location: 'Joshimath, Garhwal',
    tag: '⛰️ Summit',
    description:
      'Pangarchulla is one of the few accessible true summit experiences in Uttarakhand. The route follows the Kuari Pass approach before diverging toward a steep snow-and-scree ascent with an alpine start. At the top: a 360-degree panorama of Nanda Devi, Dronagiri, Chaukhamba, and the entire Nanda Devi Sanctuary. Crampons required. For experienced trekkers who want to stand on a peak, not a pass.',
    why:
      'Summit day gains 1,200 m from high camp in a single alpine-start push beginning before dawn. The snow-and-scree terrain above 4,200 m requires crampons and confident movement on steep ground. The rest of the approach (Days 1–4 via the Kuari Pass trail) is moderate — the difficulty is concentrated into one relentless day.',
  },
  {
    name: 'Milam Glacier — The Remote Expedition',
    slug: '/treks/location/munsiyari/milam-glacier-trek',
    image: '/Images/trek/challenging/milamglacier.webp',
    alt: 'Milam Glacier trek — remote Johar Valley expedition from Munsiyari',
    altitude: '3,450 m',
    difficulty: 'Challenging',
    days: '8–10 days',
    season: 'May–Jun, Sep–Oct',
    location: 'Munsiyari, Kumaon',
    tag: '🌄 Wilderness',
    description:
      'Milam Glacier is Uttarakhand\'s great expedition trek — an 8–10 day, 118 km journey along the ancient Johar Valley trade route from Munsiyari to the glacier snout beneath the Panchachuli massif. The route passes through abandoned Bhotiya trading villages (Martoli, Burfu), crosses glacial moraines, and follows the Goriganga River into genuinely wild terrain.',
    why:
      'The altitude is lower than Roopkund (3,450 m max), but the sustained 8–10 day commitment through remote terrain with limited evacuation options makes it equally demanding. You are walking deep into the mountains — days from the nearest road — with river crossings, moraines, and unpredictable weather. This is for trekkers who want genuine wilderness immersion, not a curated mountain experience.',
  },
];

export default function ChallengingTreksPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Best Treks in Uttarakhand', url: buildCanonicalUrl(PARENT_PATH) },
    { name: 'Challenging Treks', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Challenging Treks in Uttarakhand — For Experienced Trekkers',
    description:
      'Curated selection of difficult treks in Uttarakhand for experienced trekkers — Roopkund, Pangarchulla, and Milam Glacier.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for teal last word
  const h1Words = "Most Challenging Treks in Uttarakhand".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Challenging Treks in Uttarakhand — For Experienced Trekkers"
        description="Curated selection of difficult treks in Uttarakhand for experienced trekkers — Roopkund, Pangarchulla, and Milam Glacier."
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

        /* ── Trek Card Styles (teal accent, matching site theme) ── */
        .med-trek-card {
          padding: 0;
          overflow: hidden;
          transition: all 0.35s ease;
          max-width: 100%;
          border-top: 3px solid #0f766e;
        }
        .med-trek-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(15,118,110,0.1);
        }
        .med-trek-card .med-trek-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: #f0f2f0;
        }
        .med-trek-card .med-trek-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .med-trek-card:hover .med-trek-img {
          transform: scale(1.04);
        }
        .med-trek-card .med-trek-body {
          padding: 1.5rem;
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
        .med-trek-card .med-trek-why {
          background: #f7f9f7;
          padding: 1rem 1.25rem;
          border-radius: 12px;
          margin-top: 0.75rem;
          border-left: 3px solid #0f766e;
        }
        .med-trek-card .med-trek-why .med-body {
          font-size: 0.88rem;
          margin-bottom: 0;
          color: #4b5259;
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
        .med-badge-challenging {
          background: rgba(15,118,110,0.1);
          color: #0f766e;
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
              { name: 'Challenging Treks' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Challenging Treks · Uttarakhand</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              These are not enhanced day hikes. They are serious mountain routes where preparation directly determines safety and enjoyment. All three require prior high-altitude experience (above 3,500 m), 6–8 weeks of structured fitness work, and comfort with steep, exposed, and potentially snow-covered terrain.
            </p>
            <div className="med-hero-tags">
              <span>Roopkund</span>
              <span>Pangarchulla</span>
              <span>Milam Glacier</span>
              <span>Experienced Only</span>
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
                <strong>Not sure which challenging trek suits you?</strong>{' '}
                <Link href="/treks/location/lohajung/roopkund-trek">Roopkund</Link> for sustained altitude above 4,000 m,
                <Link href="/treks/location/joshimath/pangarchulla-trek">Pangarchulla</Link> for an intense summit push,
                or <Link href="/treks/location/munsiyari/milam-glacier-trek">Milam Glacier</Link> for remote expedition endurance.
                <br /><br />
                <span style={{ fontSize: '0.92rem', color: '#6b7280' }}>
                  These routes are drawn from our <Link href={PARENT_PATH}>complete ranking of the 10 best treks in Uttarakhand</Link>.
                  Not ready for challenging routes yet? The <Link href={`${PARENT_PATH}/beginner`}>beginner treks</Link> page covers easy and moderate alternatives.
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
              <span className="med-eyebrow-text">Three Routes</span>
            </div>
            <h2 className="med-h2">Three Different <span>Types of Challenge</span></h2>
            <p className="med-body">
              Each of these treks demands serious preparation — but the nature of the challenge is fundamentally different.
              Choose based on the type of difficulty you are seeking.
            </p>

            {TREKS.map((trek) => (
              <div key={trek.slug} className="med-card med-trek-card">
                <div className="med-trek-img-wrap">
                  <img src={trek.image} alt={trek.alt} className="med-trek-img" />
                </div>
                <div className="med-trek-body">
                  <span className="med-trek-tag">{trek.tag}</span>
                  <h3 className="med-h3"><Link href={trek.slug}>{trek.name}</Link></h3>
                  <div className="med-trek-meta">
                    <span className="med-trek-meta-pill">{trek.altitude}</span>
                    <span className="med-trek-meta-pill"><span className="med-badge med-badge-challenging">{trek.difficulty}</span></span>
                    <span className="med-trek-meta-pill">{trek.days}</span>
                    <span className="med-trek-meta-pill">{trek.season}</span>
                    <span className="med-trek-meta-pill">{trek.location}</span>
                  </div>
                  <p className="med-body">{trek.description}</p>
                  <div className="med-trek-why">
                    <p className="med-body"><strong style={{ color: '#0f766e' }}>Why it is challenging:</strong> {trek.why}</p>
                  </div>
                  {trek.name.includes('Pangarchulla') ? (
                    <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                      <Link href={trek.slug} className="med-trek-link">View full trek details →</Link>
                      <Link href="/treks/roopkund-vs-pangarchulla" className="med-trek-link">Compare Roopkund vs Pangarchulla →</Link>
                    </div>
                  ) : (
                    <Link href={trek.slug} className="med-trek-link">View full trek details →</Link>
                  )}
                </div>
              </div>
            ))}

            <div className="med-trek-callout" style={{ marginTop: '1.5rem' }}>
              <p className="med-body">
                <strong>Still deciding between Roopkund and Pangarchulla?</strong>{' '}
                See our detailed <Link href="/treks/roopkund-vs-pangarchulla">Roopkund vs Pangarchulla comparison</Link>{' '}
                for a side-by-side breakdown of altitude, difficulty, and logistics.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          id="plan"
          label="Plan a Challenging Trek"
          subtext="Share your trekking history and preferred dates — we will match you with the right route."
          vertical="trek"
          category="filter-challenging"
          sourcePath={PATH}
        />

        {/* ── COMPARISON TABLE ── */}
        <section id="compare" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">At a Glance</span>
            </div>
            <h2 className="med-h2">Challenging Treks <span>at a Glance</span></h2>

            <div className="med-table-wrap">
              <table className="med-table">
                <thead>
                  <tr>
                    <th>Trek</th>
                    <th>Max Altitude</th>
                    <th>Days</th>
                    <th>Challenge Type</th>
                    <th>Region</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { href: '/treks/location/lohajung/roopkund-trek', name: 'Roopkund', alt: '4,800 m', days: '7', type: 'Sustained altitude', region: 'Garhwal' },
                    { href: '/treks/location/joshimath/pangarchulla-trek', name: 'Pangarchulla', alt: '4,590 m', days: '6', type: 'Intense summit push', region: 'Garhwal' },
                    { href: '/treks/location/munsiyari/milam-glacier-trek', name: 'Milam Glacier', alt: '3,450 m', days: '8–10', type: 'Remote endurance', region: 'Kumaon' },
                  ].map((row) => (
                    <tr key={row.href}>
                      <td><Link href={row.href}>{row.name}</Link></td>
                      <td>{row.alt}</td>
                      <td>{row.days}</td>
                      <td>{row.type}</td>
                      <td>{row.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <FeaturedRetreat
          title="Roopkund Trek — The Ultimate Himalayan Expedition"
          description="7 days, 4,800 metres, glacial lake, skeletal remains, and the vast Bedni Bugyal. For experienced trekkers only."
          links={[
            { label: 'View Trek Details', href: '/treks/location/lohajung/roopkund-trek' },
            { label: 'Compare Roopkund vs Pangarchulla', href: '/treks/roopkund-vs-pangarchulla' },
            { label: 'See All Challenging Treks', href: PATH },
          ]}
        />

        {/* ── PROGRESSION PATH ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Progression</span>
            </div>
            <h2 className="med-h2">The Path to <span>Challenging Treks</span></h2>
            <p className="med-body">
              Attempting a challenging trek without proper progression increases both risk and misery. The recommended build-up:
            </p>

            <div className="med-progression">
              {[
                { label: 'First multi-day', title: 'Brahmatal or Kuari Pass', desc: 'Tests altitude response at 3,850–3,876 m.' },
                { label: 'Summit experience', title: 'Kedarkantha', desc: 'Adds a genuine summit push and snow conditions.' },
                { label: 'Challenging route', title: 'Pangarchulla, Roopkund, or Milam Glacier', desc: 'Full high-altitude or expedition demands.' },
              ].map((step) => (
                <div key={step.label} className="med-progression-item">
                  <span className="med-label">{step.label}</span>
                  <h3 className="med-h3">{step.title}</h3>
                  <p className="med-body">{step.desc}</p>
                </div>
              ))}
            </div>

            <p className="med-body">
              For the complete progression framework with training plans for each level, see our{' '}
              <Link href="/blog/beginner-to-advanced-trek-progression-garhwal">beginner-to-advanced trek progression guide</Link>{' '}
              and the <Link href="/treks/garhwal-himalayas/fitness-guide">8-week fitness preparation plan</Link>.
            </p>
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'All 10 Best Treks in Uttarakhand', href: PARENT_PATH },
            { label: 'Roopkund vs Pangarchulla Comparison', href: '/treks/roopkund-vs-pangarchulla' },
            { label: 'Snow Treks in Uttarakhand', href: `${PARENT_PATH}/snow` },
            { label: 'High-Altitude Treks Above 4,000 m', href: `${PARENT_PATH}/high-altitude` },
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
              <Link href={`${PARENT_PATH}/snow`} className="med-nav-link">
                <span>Snow Treks in Uttarakhand</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href={`${PARENT_PATH}/high-altitude`} className="med-nav-link">
                <span>High-Altitude Treks Above 4,000 m</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/roopkund-vs-pangarchulla" className="med-nav-link" style={{ borderBottom: 'none' }}>
                <span>Roopkund vs Pangarchulla — Full Comparison</span>
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
          <Link href="/treks/location/joshimath">Joshimath Treks</Link>
        </div>

      </article>
    </TrackedPage>
  );
}