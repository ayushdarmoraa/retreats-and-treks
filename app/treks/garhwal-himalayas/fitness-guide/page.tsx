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

const PATH = '/treks/garhwal-himalayas/fitness-guide';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Garhwal Trek Fitness Guide — 8-Week Training Plan | Retreats And Treks',
    description:
      'Free 8-week Garhwal trek fitness plan for Brahmatal, Kuari Pass, Roopkund, and Pangarchulla with cardio, strength, altitude prep, and gear guidance.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Garhwal Trek Fitness Guide — 8-Week Training Plan',
      description:
        'Structured 8-week fitness preparation for moderate and challenging Garhwal Himalaya treks. Cardio, strength, altitude acclimatisation & complete gear checklist.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Garhwal Trek Fitness Guide — 8-Week Training Plan'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How many weeks should I train before a Garhwal trek?',
    answer:
      'For moderate treks (Brahmatal, Kuari Pass): 4–6 weeks of structured training is sufficient. For challenging treks (Roopkund, Pangarchulla): 6–8 weeks minimum. If you are starting from a sedentary baseline, add 2–4 weeks of foundational cardio before beginning the structured plan.',
  },
  {
    question: 'Can I train for a Himalayan trek without access to mountains?',
    answer:
      'Yes. The 8-week plan is designed for flat-city training. Stairmaster intervals, loaded stair climbs, and treadmill incline work simulate mountain terrain effectively. The key adaptations — cardiovascular endurance, leg strength, and load tolerance — can all be built in urban environments. What you cannot simulate is altitude: plan your itinerary with proper acclimatisation days to compensate.',
  },
  {
    question: 'What fitness level is needed for Brahmatal vs Roopkund?',
    answer:
      'Brahmatal (3,850m, moderate): You should be able to jog 5 km continuously and walk 6–8 hours on uneven terrain with a daypack. Roopkund (4,800m, challenging): You should be able to run 8–10 km, walk 8–10 hours on consecutive days with a loaded pack, and have prior experience above 3,500m. The gap between moderate and challenging is significant — do not skip the progression.',
  },
  {
    question: 'Do I need a gym membership to follow this plan?',
    answer:
      'No. The plan can be executed entirely outdoors or at home with minimal equipment. Running, stair climbing, bodyweight exercises, and loaded walking (with a backpack and water bottles for weight) cover all required training. A gym with a stairmaster simply makes interval sessions more controlled.',
  },
];

const TREK_REQUIREMENTS = [
  { href: '/treks/location/lohajung/brahmatal-trek', name: 'Brahmatal', alt: '3,850 m', dist: '5–8 km', elev: '400–700 m', weeks: '4 weeks', diff: 'moderate' },
  { href: '/treks/location/joshimath/kuari-pass-trek', name: 'Kuari Pass', alt: '3,876 m', dist: '6–10 km', elev: '500–800 m', weeks: '4 weeks', diff: 'moderate' },
  { href: '/treks/location/lohajung/roopkund-trek', name: 'Roopkund', alt: '4,800 m', dist: '7–12 km', elev: '600–1,000 m', weeks: '6 weeks', diff: 'challenging' },
  { href: '/treks/location/joshimath/pangarchulla-trek', name: 'Pangarchulla', alt: '4,590 m', dist: '5–8 km (summit: 720m in 4h)', elev: '500–720 m', weeks: '6 weeks', diff: 'challenging' },
];

const BENCHMARKS = [
  { label: 'Continuous jog', mod: '5 km in 35 min', chal: '8 km in 50 min' },
  { label: 'Loaded walk (8 kg pack)', mod: '10 km in 2.5 hours', chal: '15 km in 3.5 hours' },
  { label: 'Stair climb (continuous)', mod: '30 floors in 20 min', chal: '50 floors in 30 min' },
  { label: 'Back-to-back walk days', mod: '2 days, 12 km each', chal: '3 days, 15 km each' },
  { label: 'Bodyweight squats', mod: '3 × 25 reps', chal: '3 × 40 reps' },
];

const ALTITUDE_ZONES = [
  { zone: '2,500–3,500 m', risk: 'Low', rule: 'No special measures. Stay hydrated (3–4 L/day).', treks: 'Trail start for all 4 treks' },
  { zone: '3,500–4,000 m', risk: 'Moderate', rule: 'Do not ascend more than 500m sleeping altitude per day. Rest day every 3rd day.', treks: 'Brahmatal summit, Kuari Pass' },
  { zone: '4,000–4,500 m', risk: 'High', rule: 'Mandatory acclimatisation day before pushing higher. Monitor SpO2.', treks: 'Pangarchulla approach, Roopkund upper camps' },
  { zone: '4,500–5,000 m', risk: 'Very High', rule: 'Summit push only. Do not sleep at this altitude. Descend same day.', treks: 'Roopkund lake (4,800m), Pangarchulla summit (4,590m)' },
];

const NUTRITION_ITEMS = [
  { label: 'Daily calorie requirement', text: '3,000–4,000 kcal while trekking (vs ~2,000 kcal at rest). You will undereat if you rely on appetite alone — eat on schedule, not hunger.' },
  { label: 'Hydration target', text: '3–4 litres per day. Above 4,000m, increase to 4–5 litres. Dehydration amplifies AMS symptoms.' },
  { label: 'Carbohydrate loading', text: '60–70% of calories from carbs during the trek. Rice, chapati, pasta, porridge, energy bars.' },
  { label: 'Trail snacks', text: 'Carry 500–800 kcal of portable food per day — trail mix, dates, glucose biscuits, chocolate, energy gels.' },
  { label: 'Avoid', text: 'Alcohol (impairs acclimatisation), excessive caffeine (diuretic at altitude), heavy fatty meals before climb days.' },
];

export default function GarhwalFitnessGuidePage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Garhwal Himalayas', url: buildCanonicalUrl('/treks/garhwal-himalayas') },
    { name: 'Fitness Guide', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Garhwal Trek Fitness Guide — 8-Week Preparation Plan (3,850m–4,800m)',
    description:
      'Free 8-week Garhwal trek fitness plan for Brahmatal, Kuari Pass, Roopkund, and Pangarchulla with cardio, strength, altitude prep, and gear guidance.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-05-09',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Garhwal Trek Fitness Guide".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Garhwal Trek Fitness Guide — 8-Week Preparation Plan"
        description="Free 8-week Garhwal trek fitness plan for Brahmatal, Kuari Pass, Roopkund, and Pangarchulla with cardio, strength, altitude prep, and gear guidance."
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
        .med-pick-card.med-pick-challenging {
          border-left-color: #e65100;
        }
        .med-pick-card.med-pick-challenging:hover {
          border-color: #c45000;
        }
        .med-pick-card .med-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0f766e;
        }
        .med-pick-card.med-pick-challenging .med-label {
          color: #e65100;
        }
        .med-pick-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

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
        .med-badge-moderate {
          background: rgba(15,118,110,0.08);
          color: #0f766e;
        }
        .med-badge-challenging {
          background: rgba(230,81,0,0.08);
          color: #e65100;
        }
        .med-badge-low {
          color: #6b7280;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
        }
        .med-badge-medium {
          color: #0f766e;
          background: rgba(15,118,110,0.08);
          border: 1px solid rgba(15,118,110,0.2);
        }
        .med-badge-high {
          color: #b45309;
          background: rgba(180,83,9,0.08);
          border: 1px solid rgba(180,83,9,0.2);
        }
        .med-badge-very-high {
          color: #e65100;
          background: rgba(230,81,0,0.08);
          border: 1px solid rgba(230,81,0,0.2);
        }

        /* ── Week Blocks ── */
        .med-week-block {
          border-left: 3px solid #0f766e;
          padding: 0.1rem 0 0.1rem 1.5rem;
          margin-bottom: 1.5rem;
          transition: border-color 0.3s;
        }
        .med-week-block:hover {
          border-color: #0d6b64;
        }
        .med-week-block.med-week-challenging {
          border-left-color: #e65100;
        }
        .med-week-block.med-week-challenging:hover {
          border-color: #c45000;
        }
        .med-week-block .med-h3 {
          font-size: 1rem;
          margin-bottom: 0.3rem;
        }
        .med-week-block .med-body { font-size: 0.92rem; margin-bottom: 0.3rem; }
        .med-week-block ul {
          margin: 0.5rem 0 0;
          padding-left: 0;
          list-style: none;
        }
        .med-week-block ul li {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.92rem;
          line-height: 1.85;
          color: #4b5259;
          padding: 0.2rem 0 0.2rem 1.25rem;
          position: relative;
        }
        .med-week-block ul li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #0f766e;
          font-size: 0.75rem;
        }
        .med-week-block.med-week-challenging ul li::before {
          color: #e65100;
        }
        .med-week-block ul li strong { color: #2B2A26; font-weight: 600; }

        /* ── Gear Cards ── */
        .med-gear-card {
          padding: 1.5rem;
          border-top: 3px solid #0f766e;
          transition: all 0.35s ease;
          margin-bottom: 1.25rem;
        }
        .med-gear-card:last-child { margin-bottom: 0; }
        .med-gear-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(15,118,110,0.06);
        }
        .med-gear-card.med-gear-challenging {
          border-top-color: #e65100;
        }
        .med-gear-card .med-h3 { font-size: 0.95rem; margin-bottom: 0.3rem; }
        .med-gear-card ul {
          margin: 0.5rem 0 0;
          padding-left: 0;
          list-style: none;
        }
        .med-gear-card ul li {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          line-height: 1.85;
          color: #4b5259;
          padding: 0.15rem 0 0.15rem 1.25rem;
          position: relative;
        }
        .med-gear-card ul li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #0f766e;
          font-size: 1rem;
        }
        .med-gear-card.med-gear-challenging ul li::before {
          color: #e65100;
        }

        /* ── Altitude Table ── */
        .med-altitude-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr 1fr;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(15,118,110,0.06);
          align-items: center;
        }
        @media (max-width: 720px) {
          .med-altitude-row {
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
            padding: 0.75rem 0.5rem;
          }
          .med-altitude-row .med-hide-mobile { display: none; }
        }
        .med-altitude-row:last-child { border-bottom: none; }
        .med-altitude-row .med-zone {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: #2B2A26;
        }
        .med-altitude-row .med-rule {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.82rem;
          color: #4b5259;
        }
        .med-altitude-row .med-treks {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.78rem;
          color: #6b7280;
        }

        /* ── Nutrition List ── */
        .med-nutrition-item {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(15,118,110,0.06);
        }
        .med-nutrition-item:last-child { border-bottom: none; }
        .med-nutrition-item .med-dot {
          flex-shrink: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #0f766e;
          margin-top: 0.45rem;
        }
        .med-nutrition-item .med-body { font-size: 0.92rem; margin-bottom: 0; }
        .med-nutrition-item .med-body strong { color: #2B2A26; }

        /* ── AMS Warning ── */
        .med-ams-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(15,118,110,0.06);
        }
        .med-ams-item:last-child { border-bottom: none; }
        .med-ams-item .med-dot {
          flex-shrink: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-top: 0.45rem;
        }
        .med-ams-item .med-body { font-size: 0.92rem; margin-bottom: 0; }
        .med-ams-item .med-body strong { color: #2B2A26; }

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

        .med-hero-img {
          border-radius: 18px;
          overflow: hidden;
          margin-bottom: 1.75rem;
        }
        .med-hero-img img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
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
              { name: 'Fitness Guide' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Fitness Guide · Garhwal Himalayas</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              The Garhwal Himalaya treks range from moderate 4-day routes at 3,850 metres to challenging 7-day expeditions at 4,800 metres. Every route demands specific physical preparation — and the training differs significantly between difficulty tiers.
            </p>
            <div className="med-hero-tags">
              <span>8-Week Plan</span>
              <span>Cardio & Strength</span>
              <span>Altitude Prep</span>
              <span>Gear Checklist</span>
            </div>
            <div className="med-hero-actions">
              <a href="#plan" className="med-cta-btn">View Training Plan</a>
              <a href="#gear" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Gear Checklist</a>
            </div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="med-shell med-section-white med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-pick-card" style={{ marginBottom: '0.75rem' }}>
              <div className="med-label">Moderate Routes — 4 weeks prep</div>
              <p className="med-body">
                <strong><Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal</Link></strong> or{' '}
                <strong><Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass</Link></strong> — 4-day routes at 3,850–3,876 m. Beginner-friendly with guided campsites.
              </p>
            </div>
            <div className="med-card med-pick-card med-pick-challenging">
              <div className="med-label">Challenging Routes — 6–8 weeks prep</div>
              <p className="med-body">
                <strong><Link href="/treks/location/lohajung/roopkund-trek">Roopkund</Link></strong> or{' '}
                <strong><Link href="/treks/location/joshimath/pangarchulla-trek">Pangarchulla</Link></strong> — 6–7 day routes above 4,500 m. Prior high-altitude experience required.
              </p>
            </div>

            <p className="med-body" style={{ marginTop: '1.5rem' }}>
              The <Link href="/treks/garhwal-himalayas">Garhwal Himalaya treks</Link> range from moderate 4-day routes at 3,850 metres to challenging 7-day expeditions at 4,800 metres. This guide provides a structured 8-week plan that covers both, with clear thresholds for when you are ready.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              Whether you are preparing for the <Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal winter trek</Link> or the <Link href="/treks/location/joshimath/pangarchulla-trek">Pangarchulla summit climb</Link>, this plan scales to your target route.
            </p>
          </div>
        </section>

        {/* ── REQUIREMENTS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">By Route</span>
            </div>
            <h2 className="med-h2">Fitness Requirements <span>by Trek</span></h2>
            <p className="med-body">
              If you are choosing between the two moderate snow treks, the{' '}
              <Link href="/treks/brahmatal-vs-kuari-pass">Brahmatal vs Kuari Pass comparison</Link>{' '}
              breaks down the differences in terrain, views, and season.
            </p>

            <div className="med-hero-img">
              <img src="/Images/trek/region/garhwal.webp" alt="Garhwal Himalaya trekking terrain — ridge trail above 4000m" />
            </div>

            <div className="med-table-wrap">
              <table className="med-table">
                <thead>
                  <tr>
                    <th>Trek</th>
                    <th>Altitude</th>
                    <th>Daily Distance</th>
                    <th>Daily Elevation</th>
                    <th>Min. Training</th>
                  </tr>
                </thead>
                <tbody>
                  {TREK_REQUIREMENTS.map((row) => (
                    <tr key={row.href}>
                      <td>
                        <Link href={row.href}>{row.name}</Link>
                        <span className={`med-badge ${row.diff === 'moderate' ? 'med-badge-moderate' : 'med-badge-challenging'}`}>
                          {row.diff}
                        </span>
                      </td>
                      <td>{row.alt}</td>
                      <td>{row.dist}</td>
                      <td>{row.elev}</td>
                      <td>{row.weeks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── BENCHMARKS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Readiness Check</span>
            </div>
            <h2 className="med-h2">Are You Ready? <span>Fitness Benchmarks</span></h2>
            <p className="med-body">
              Before committing to a trek, test yourself against these benchmarks. If you can hit the numbers for your target difficulty, you are physically prepared.
            </p>

            <div className="med-table-wrap">
              <table className="med-table">
                <thead>
                  <tr>
                    <th>Benchmark</th>
                    <th>Moderate (Brahmatal / Kuari)</th>
                    <th>Challenging (Roopkund / Pangarchulla)</th>
                  </tr>
                </thead>
                <tbody>
                  {BENCHMARKS.map((b, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, color: '#2B2A26' }}>{b.label}</td>
                      <td>{b.mod}</td>
                      <td>{b.chal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 8-WEEK PLAN — MODERATE ── */}
        <section  className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Training Plan</span>
            </div>
            <h2 className="med-h2">8-Week Plan: <span>Moderate Treks</span></h2>
            <p className="med-body">
              This plan assumes a baseline of normal activity but no structured endurance training. 4 training days per week. Rest days are not optional — they prevent overuse injury.
            </p>

            <div className="med-week-block">
              <h3 className="med-h3">Weeks 1–2: Build Base</h3>
              <ul>
                <li><strong>3× cardio:</strong> Jog or brisk walk 3–5 km. Target: continuous movement for 30–40 minutes without stopping.</li>
                <li><strong>1× strength:</strong> Bodyweight circuit — 3 rounds of 20 squats, 10 lunges per leg, 30-second wall sit, 15 step-ups per leg.</li>
                <li><strong>Weekend:</strong> One longer walk — 8–10 km on varied terrain with a daypack containing 3–5 kg.</li>
              </ul>
            </div>
            <div className="med-week-block">
              <h3 className="med-h3">Weeks 3–4: Build Duration</h3>
              <ul>
                <li><strong>3× cardio:</strong> Jog 4–6 km. Introduce 1 interval session: 5 × 3-minute hard effort with 2-minute recovery.</li>
                <li><strong>1× strength:</strong> Add weighted step-ups (backpack with 5–8 kg), calf raises, and 60-second plank holds.</li>
                <li><strong>Weekend:</strong> Back-to-back walking days — 10 km Saturday, 8 km Sunday, both with 5–8 kg pack.</li>
              </ul>
            </div>
            <div className="med-week-block">
              <h3 className="med-h3">Weeks 5–6: Build Intensity</h3>
              <ul>
                <li><strong>3× cardio:</strong> One long jog (6–8 km), one interval session, one stairmaster/stair climb session (30+ minutes).</li>
                <li><strong>1× strength:</strong> Increase to 4 rounds. Add single-leg squats and loaded lunges.</li>
                <li><strong>Weekend:</strong> One simulation day — walk 12–15 km with trekking pack (8 kg), include hill sections if available.</li>
              </ul>
            </div>
            <div className="med-week-block" style={{ marginBottom: 0 }}>
              <h3 className="med-h3">Weeks 7–8: Taper &amp; Test</h3>
              <ul>
                <li><strong>Week 7:</strong> Run benchmark tests. If you hit moderate targets, you are ready.</li>
                <li><strong>Week 8:</strong> Reduce volume by 40%. Light jogs, easy walks, flexibility work. Arrive at the trailhead rested.</li>
              </ul>
            </div>

            <p className="med-body" style={{ marginTop: '1.5rem' }}>
              If you are training for the <Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal Trek</Link>, emphasise cold-weather endurance. For the <Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass Trek</Link>, focus on sustained ridge walking.
            </p>
          </div>
        </section>

        {/* ── 8-WEEK PLAN — CHALLENGING ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" style={{ background: 'rgba(230,81,0,0.35)' }} />
              <span className="med-eyebrow-text" style={{ color: '#e65100' }}>Advanced Plan</span>
            </div>
            <h2 className="med-h2">8-Week Plan: <span style={{ color: '#e65100' }}>Challenging Treks</span></h2>
            <p className="med-body">
              This plan assumes you have already completed a moderate Himalayan trek. 5 training days per week. Not sure which challenging route suits you? The <Link href="/treks/roopkund-vs-pangarchulla">Roopkund vs Pangarchulla breakdown</Link> compares summit difficulty and best seasons.
            </p>

            <div className="med-week-block med-week-challenging">
              <h3 className="med-h3">Weeks 1–2: Endurance Foundation</h3>
              <ul>
                <li><strong>3× cardio:</strong> Run 5–8 km at conversational pace. Include 1 hill repeat session (6 × 2-minute hill sprints).</li>
                <li><strong>2× strength:</strong> Heavy lower body — weighted squats, loaded step-ups (10 kg pack), single-leg deadlifts, calf raises. Core work.</li>
                <li><strong>Weekend:</strong> Long hike — 12–15 km with 10 kg pack, targeting 600–800 m elevation gain.</li>
              </ul>
            </div>
            <div className="med-week-block med-week-challenging">
              <h3 className="med-h3">Weeks 3–4: Volume &amp; Consecutive Days</h3>
              <ul>
                <li><strong>3× cardio:</strong> One long run (8–10 km), one interval session (8 × 3-minute hard), one sustained stair climb (40+ minutes).</li>
                <li><strong>2× strength:</strong> Increase load. Add box step-ups with 12 kg pack. Bulgarian split squats. 90-second plank holds.</li>
                <li><strong>Weekend:</strong> Back-to-back-to-back — Fri 10 km, Sat 15 km, Sun 10 km, all with pack.</li>
              </ul>
            </div>
            <div className="med-week-block med-week-challenging">
              <h3 className="med-h3">Weeks 5–6: Peak Training</h3>
              <ul>
                <li><strong>Summit simulation:</strong> One session per week — climb 1,000 m elevation in under 3 hours with 10–12 kg pack.</li>
                <li><strong>Consecutive-day endurance:</strong> 3 days of 12–15 km walking/running. Total weekly distance 50+ km.</li>
                <li><strong>Strength maintenance:</strong> 2 sessions, maintaining load — not increasing.</li>
              </ul>
            </div>
            <div className="med-week-block med-week-challenging" style={{ marginBottom: 0 }}>
              <h3 className="med-h3">Weeks 7–8: Taper &amp; Final Test</h3>
              <ul>
                <li><strong>Week 7:</strong> Run all benchmark tests. Hit the challenging column targets. One final long simulation hike.</li>
                <li><strong>Week 8:</strong> Reduce volume by 50%. Light runs, easy walks, yoga. Focus on sleep quality (8+ hours).</li>
              </ul>
            </div>

            <p className="med-body" style={{ marginTop: '1.5rem' }}>
              For <Link href="/treks/location/lohajung/roopkund-trek">Roopkund</Link>, prioritise multi-day endurance. For <Link href="/treks/location/joshimath/pangarchulla-trek">Pangarchulla</Link>, focus on explosive climbing power and summit-day simulation.
            </p>
          </div>
        </section>

        <PrimaryCTA
          
          label="Plan My Garhwal Trek"
          subtext="Share your fitness level and preferred dates. We will recommend the right route and preparation timeline."
          vertical="trek"
          category="fitness"
          sourcePath={PATH}
        />

        {/* ── GEAR CHECKLIST ── */}
        <section id="gear" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">What to Carry</span>
            </div>
            <h2 className="med-h2">Complete <span>Gear Checklist</span></h2>
            <p className="med-body">
              Gear requirements differ between moderate winter treks and challenging high-altitude routes. This summary covers the essentials. For a complete, print-ready list, see the <Link href="/treks/garhwal-himalayas/packing-checklist">Garhwal trek packing checklist</Link>.
            </p>

            <div className="med-card med-gear-card">
              <h3 className="med-h3">Essential — All Garhwal Treks</h3>
              <ul>
                <li>Trekking boots — ankle-height, waterproof, broken in (minimum 50 km of walking before the trek)</li>
                <li>3-layer clothing system — moisture-wicking base, insulating mid-layer, waterproof/windproof shell</li>
                <li>Trekking poles (pair) — reduces knee impact by 25–30% on descents</li>
                <li>Daypack (30–40 L) with rain cover</li>
                <li>Headlamp with spare batteries</li>
                <li>Water bottles (2 × 1 L) or hydration bladder</li>
                <li>Sunscreen (SPF 50+), lip balm with SPF, UV-rated sunglasses</li>
                <li>Personal first-aid kit — blister plasters, ibuprofen, Diamox (consult physician), ORS sachets, antiseptic</li>
                <li>Buff/balaclava and warm hat</li>
                <li>2 pairs trekking socks (merino wool) + liner socks</li>
              </ul>
            </div>

            <div className="med-card med-gear-card">
              <h3 className="med-h3">Winter / Snow Treks — Brahmatal (Dec–Mar)</h3>
              <ul>
                <li>Gaiters (knee-height, waterproof)</li>
                <li>Microspikes or light crampons</li>
                <li>Down jacket rated to −10°C</li>
                <li>4-season sleeping bag (comfort rating −15°C or lower)</li>
                <li>Thermal base layers (top and bottom)</li>
                <li>Hand warmers (chemical, 2–4 pairs)</li>
                <li>Insulated water bottle cover (prevents freezing)</li>
              </ul>
            </div>

            <div className="med-card med-gear-card med-gear-challenging">
              <h3 className="med-h3">Challenging / Summit Treks — Roopkund, Pangarchulla</h3>
              <ul>
                <li>Full crampons (12-point, provided by operator on Pangarchulla)</li>
                <li>Gaiters (mandatory for snow approaches)</li>
                <li>4-season sleeping bag (comfort −20°C for Pangarchulla summit camp)</li>
                <li>Expedition-weight thermal layers</li>
                <li>Altitude medication — Diamox 125 mg (physician prescribed, start 24 hours before ascent above 3,500m)</li>
                <li>Pulse oximeter (pocket-sized, for monitoring SpO2 above 4,000m)</li>
                <li>Energy gels or bars (summit day — you cannot cook above 4,200m in wind)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── ALTITUDE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Altitude Safety</span>
            </div>
            <h2 className="med-h2">Altitude <span>Acclimatisation Strategy</span></h2>
            <p className="med-body">
              No amount of sea-level fitness replaces proper acclimatisation. The golden rule: <strong>climb high, sleep low</strong>.
            </p>

            <div className="med-table-wrap">
              <div className="med-altitude-row" style={{ background: '#f7f9f7', borderBottom: '2px solid #0f766e', fontWeight: 600, color: '#2B2A26' }}>
                <span className="med-zone">Altitude Zone</span>
                <span>AMS Risk</span>
                <span className="med-hide-mobile">Acclimatisation Rule</span>
                <span className="med-hide-mobile">Relevant Treks</span>
              </div>
              {ALTITUDE_ZONES.map((row) => {
                const riskClass = row.risk === 'Low' ? 'med-badge-low' : row.risk === 'Moderate' ? 'med-badge-medium' : row.risk === 'High' ? 'med-badge-high' : 'med-badge-very-high';
                return (
                  <div key={row.zone} className="med-altitude-row">
                    <span className="med-zone">{row.zone}</span>
                    <span><span className={`med-badge ${riskClass}`}>{row.risk}</span></span>
                    <span className="med-rule med-hide-mobile">{row.rule}</span>
                    <span className="med-treks med-hide-mobile">{row.treks}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <p className="med-body" style={{ fontWeight: 600, color: '#2B2A26' }}>AMS Warning Signs — When to Turn Back</p>
              <div className="med-ams-item">
                <span className="med-dot" style={{ background: '#0f766e' }} />
                <p className="med-body"><strong>Mild AMS:</strong> Persistent headache not relieved by ibuprofen, loss of appetite, mild nausea, difficulty sleeping. Action: do not ascend further until symptoms resolve.</p>
              </div>
              <div className="med-ams-item">
                <span className="med-dot" style={{ background: '#b45309' }} />
                <p className="med-body"><strong>Moderate AMS:</strong> Severe headache, vomiting, extreme fatigue at rest, ataxia (unsteady walking). Action: descend immediately by at least 500m.</p>
              </div>
              <div className="med-ams-item" style={{ borderBottom: 'none' }}>
                <span className="med-dot" style={{ background: '#e65100' }} />
                <p className="med-body"><strong>Severe AMS (HACE/HAPE):</strong> Confusion, inability to walk straight, persistent cough with pink/frothy sputum, blue lips. Action: emergency descent. This is life-threatening.</p>
              </div>
            </div>

            <p className="med-body" style={{ marginTop: '1.5rem' }}>
              All guided <Link href="/treks/garhwal-himalayas">Garhwal trekking routes</Link> include trained leaders who monitor group members for AMS symptoms.
            </p>
          </div>
        </section>

        {/* ── NUTRITION ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">On the Trail</span>
            </div>
            <h2 className="med-h2">Nutrition &amp; <span>Hydration on Trail</span></h2>

            {NUTRITION_ITEMS.map((item, i) => (
              <div key={i} className="med-nutrition-item" style={{ borderBottom: i < NUTRITION_ITEMS.length - 1 ? '1px solid rgba(15,118,110,0.06)' : 'none' }}>
                <span className="med-dot" />
                <p className="med-body"><strong>{item.label}:</strong> {item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <FeaturedRetreat
          title="Brahmatal — The Ideal First Snow Trek"
          description="Frozen lake, snow-covered ridges, and Himalayan views. 4 days, moderate difficulty, no technical sections."
          links={[
            { label: 'View Brahmatal Details', href: '/treks/location/lohajung/brahmatal-trek' },
            { label: 'View Kuari Pass Details', href: '/treks/location/joshimath/kuari-pass-trek' },
            { label: 'Compare More Treks', href: '/treks/best-treks-in-uttarakhand' },
          ]}
        />

        <PrimaryCTA
          label="Plan My Garhwal Trek"
          subtext="Share your fitness level and preferred dates. We will recommend the right route and preparation timeline."
          vertical="trek"
          category="fitness"
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

        <RelatedReads
          links={[
            { label: 'Garhwal Trekking Routes — Overview & Comparison', href: '/treks/garhwal-himalayas' },
            { label: 'Brahmatal vs Kuari Pass — Moderate Trek Comparison', href: '/treks/brahmatal-vs-kuari-pass' },
            { label: 'Roopkund vs Pangarchulla — Challenging Trek Comparison', href: '/treks/roopkund-vs-pangarchulla' },
            { label: 'Print-Ready Packing Checklist', href: '/treks/garhwal-himalayas/packing-checklist' },
          ]}
        />

        {/* ── EXPLORE MORE ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Choose Your Trek</span>
            </div>
            <h2 className="med-h2">Choose <span>Your Trek</span></h2>

            <div className="med-nav-group">
              <Link href="/treks/garhwal-himalayas" className="med-nav-link">
                <span>Garhwal Trekking Routes — Overview &amp; Comparison</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/brahmatal-vs-kuari-pass" className="med-nav-link">
                <span>Brahmatal vs Kuari Pass — Moderate Trek Comparison</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/roopkund-vs-pangarchulla" className="med-nav-link">
                <span>Roopkund vs Pangarchulla — Challenging Trek Comparison</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/garhwal-himalayas/packing-checklist" className="med-nav-link" style={{ borderBottom: 'none' }}>
                <span>Print-Ready Packing Checklist</span>
                <span className="med-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <div className="med-trek-footer">
          <Link href="/treks">← All Treks</Link>
          <Link href="/treks/garhwal-himalayas">Garhwal Himalayas</Link>
          <Link href="/treks/location/lohajung">Lohajung Treks</Link>
          <Link href="/treks/location/joshimath">Joshimath Treks</Link>
        </div>

      </article>
    </TrackedPage>
  );
}
