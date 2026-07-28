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

const PATH = '/treks/garhwal-himalayas/packing-checklist';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Garhwal Trek Packing Checklist — Complete Gear List | Retreats And Treks',
    description:
      'Complete Garhwal trek packing checklist for Brahmatal, Kuari Pass, Roopkund, and Pangarchulla, organised by gear category, season, and difficulty.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Garhwal Trek Packing Checklist — Complete Gear List',
      description:
        'Print-ready packing checklist for all 4 Garhwal Himalaya treks. Organised by category, difficulty tier and season. Nothing forgotten.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Garhwal Trek Packing Checklist — Complete Gear List'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the most important gear item for a Garhwal Himalaya trek?',
    answer:
      'Trekking boots. Ill-fitting or unbroken boots cause more trek abandonments than altitude sickness. Buy ankle-height, waterproof boots and walk at least 50 km in them before your trek. Everything else can be rented or improvised — boots cannot.',
  },
  {
    question: 'Can I rent gear for Brahmatal or Kuari Pass instead of buying?',
    answer:
      'Yes. Operators in Lohajung and Joshimath rent sleeping bags, trekking poles, crampons, gaiters, and down jackets. Buy your own boots, base layers, and socks — these are personal-fit items that perform poorly when borrowed. Rental gear is adequate for moderate treks but may not meet the quality standard needed for Roopkund or Pangarchulla summit days.',
  },
  {
    question: 'How heavy should my backpack be on a Garhwal trek?',
    answer:
      'For supported treks (mules/porters carry camping gear): 6–8 kg daypack. For self-supported treks: 12–15 kg maximum including water. On Pangarchulla summit day, carry only essentials — 4–5 kg. Pack weight is the most controllable factor in trek comfort. Weigh your pack at home and eliminate anything over your target.',
  },
  {
    question: 'Do I need crampons for Brahmatal in winter?',
    answer:
      'Microspikes are sufficient for Brahmatal (December–March). Full 12-point crampons are only required for Pangarchulla summit and Roopkund final approach. Most operators provide crampons for challenging treks — confirm before purchasing.',
  },
];

const FOOTWEAR_ITEMS = [
  { text: 'Trekking boots — ankle-height, waterproof, broken in (50+ km before trek)', badge: 'all' },
  { text: 'Camp sandals or flip-flops (rest at campsites)', badge: 'all' },
  { text: 'Trekking socks — 2 pairs merino wool', badge: 'all' },
  { text: 'Liner socks — 2 pairs (blister prevention)', badge: 'all' },
  { text: 'Gaiters — knee-height, waterproof', badge: 'winter' },
  { text: 'Microspikes / light crampons', badge: 'winter' },
  { text: 'Full crampons — 12-point (often provided by operator)', badge: 'summit' },
];

const BASE_ITEMS = [
  { text: 'Moisture-wicking t-shirts — 2–3 (synthetic or merino, never cotton)', badge: 'all' },
  { text: 'Trekking trousers — 2 pairs (quick-dry, articulated knees)', badge: 'all' },
  { text: 'Underwear — 3 pairs quick-dry', badge: 'all' },
  { text: 'Thermal base layer top — lightweight', badge: 'all' },
  { text: 'Thermal base layer bottom — lightweight', badge: 'all' },
  { text: 'Expedition-weight thermal top', badge: 'challenge' },
  { text: 'Expedition-weight thermal bottom', badge: 'challenge' },
];

const MID_ITEMS = [
  { text: 'Fleece jacket or pullover (200-weight)', badge: 'all' },
  { text: 'Down jacket — rated to −10°C', badge: 'winter' },
  { text: 'Down jacket — rated to −15°C or lower', badge: 'challenge' },
];

const OUTER_ITEMS = [
  { text: 'Waterproof/windproof shell jacket (seam-sealed)', badge: 'all' },
  { text: 'Waterproof overtrousers', badge: 'winter' },
  { text: 'Poncho or rain cover (monsoon-adjacent seasons)', badge: 'all' },
];

const HEAD_ITEMS = [
  { text: 'Sun hat or cap (UV protection)', badge: 'all' },
  { text: 'Warm beanie / wool hat', badge: 'all' },
  { text: 'Buff / neck gaiter', badge: 'all' },
  { text: 'Balaclava (full face cover)', badge: 'winter' },
  { text: 'Trekking gloves — lightweight, touchscreen-compatible', badge: 'all' },
  { text: 'Insulated gloves — waterproof, rated to −15°C', badge: 'winter' },
  { text: 'UV-rated sunglasses (Category 3–4)', badge: 'all' },
  { text: 'Snow goggles (high wind / summit day)', badge: 'summit' },
  { text: 'Sunscreen SPF 50+ (apply every 2 hours above snow line)', badge: 'all' },
  { text: 'Lip balm with SPF', badge: 'all' },
];

const PACK_ITEMS = [
  { text: 'Daypack — 30–40 litres with hip belt', badge: 'all' },
  { text: 'Rain cover for pack', badge: 'all' },
  { text: 'Dry bags — 2–3 (for electronics, clothes, sleeping bag)', badge: 'all' },
  { text: 'Trekking poles — pair (reduces knee impact 25–30%)', badge: 'all' },
];

const SLEEP_ITEMS = [
  { text: 'Sleeping bag — 3-season, comfort −5°C (spring/autumn treks)', badge: 'all' },
  { text: 'Sleeping bag — 4-season, comfort −15°C (December–March)', badge: 'winter' },
  { text: 'Sleeping bag — 4-season, comfort −20°C (Pangarchulla summit camp)', badge: 'summit' },
  { text: 'Sleeping bag liner (adds 5–8°C warmth)', badge: 'all' },
  { text: 'Sleeping pad — insulated (R-value 3.0+)', badge: 'all' },
];

const HYDRATION_ITEMS = [
  { text: 'Water bottles — 2 × 1 litre (wide-mouth, BPA-free)', badge: 'all' },
  { text: 'Insulated water bottle cover (prevents freezing)', badge: 'winter' },
  { text: 'Water purification tablets (backup)', badge: 'all' },
  { text: 'ORS sachets — 4–6 (altitude dehydration recovery)', badge: 'all' },
  { text: 'Trail mix / dry fruit — 500g', badge: 'all' },
  { text: 'Energy bars — 4–6 (high calorie, compact)', badge: 'all' },
  { text: 'Glucose biscuits / chocolate', badge: 'all' },
  { text: 'Energy gels — 4+ (summit day fuel, no cooking above 4,200m in wind)', badge: 'summit' },
  { text: 'Hand warmers — chemical, 2–4 pairs (also warm water bottles)', badge: 'winter' },
];

const ELECTRONICS_ITEMS = [
  { text: 'Headlamp with spare batteries (lithium — perform better in cold)', badge: 'all' },
  { text: 'Power bank — 10,000+ mAh (keep inside sleeping bag at night to prevent cold drain)', badge: 'all' },
  { text: 'Phone with offline maps downloaded (Maps.me or Google Maps offline)', badge: 'all' },
  { text: 'Camera (optional — phone is fine)', badge: 'all' },
  { text: 'Pulse oximeter — pocket-sized (monitor SpO2 above 4,000m)', badge: 'challenge' },
];

const FIRST_AID_ITEMS = [
  { text: 'Blister plasters (Compeed or equivalent) — 6+', badge: 'all' },
  { text: 'Medical tape / zinc oxide tape', badge: 'all' },
  { text: 'Ibuprofen (anti-inflammatory, headache relief)', badge: 'all' },
  { text: 'Paracetamol (fever, general pain)', badge: 'all' },
  { text: 'Diamox 125mg — physician prescribed (altitude sickness prevention)', badge: 'challenge' },
  { text: 'Antiseptic wipes / cream', badge: 'all' },
  { text: 'Anti-diarrhoeal medication', badge: 'all' },
  { text: 'Prescription medications (carry originals + copy of prescription)', badge: 'all' },
  { text: 'Knee brace / support (if known knee issues — descents are demanding)', badge: 'all' },
];

const TOILETRIES_ITEMS = [
  { text: 'Toothbrush & toothpaste (travel size)', badge: 'all' },
  { text: 'Wet wipes / biodegradable body wipes (no showers on trail)', badge: 'all' },
  { text: 'Toilet paper + ziplock bag (pack out all waste)', badge: 'all' },
  { text: 'Hand sanitiser', badge: 'all' },
  { text: 'Quick-dry towel (microfibre, compact)', badge: 'all' },
  { text: 'Earplugs (tent/dormitory sleeping)', badge: 'all' },
];

const DOCUMENTS_ITEMS = [
  { text: 'Government-issued photo ID (Aadhaar / passport) — original + photocopy', badge: 'all' },
  { text: 'Trek permit (arranged by operator for Roopkund; self-arranged for others)', badge: 'all' },
  { text: 'Emergency contact card (laminated, in pack lid pocket)', badge: 'all' },
  { text: 'Cash — ₹3,000–5,000 (no ATMs beyond base town)', badge: 'all' },
  { text: 'Travel insurance with altitude trekking cover (verify policy covers 5,000m)', badge: 'challenge' },
];

const WEIGHT_TARGETS = [
  { type: 'Moderate (Brahmatal, Kuari Pass)', daypack: '6–8 kg', self: '12–14 kg', summit: 'N/A' },
  { type: 'Challenging (Roopkund, Pangarchulla)', daypack: '7–9 kg', self: '13–15 kg', summit: '4–5 kg' },
];

export default function PackingChecklistPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Garhwal Himalayas', url: buildCanonicalUrl('/treks/garhwal-himalayas') },
    { name: 'Packing Checklist', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Garhwal Trek Packing Checklist — Print-Ready Gear List by Difficulty',
    description:
      'Complete Garhwal trek packing checklist for Brahmatal, Kuari Pass, Roopkund, and Pangarchulla, organised by gear category, season, and difficulty.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-05-09',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Garhwal Trek Packing Checklist".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  const getBadgeClass = (badge: string) => {
    switch (badge) {
      case 'all': return 'med-badge-all';
      case 'winter': return 'med-badge-winter';
      case 'challenge': return 'med-badge-challenge';
      case 'summit': return 'med-badge-summit';
      default: return 'med-badge-all';
    }
  };

  const getBadgeLabel = (badge: string) => {
    switch (badge) {
      case 'all': return 'ALL';
      case 'winter': return 'WINTER';
      case 'challenge': return '4,500m+';
      case 'summit': return 'SUMMIT';
      default: return 'ALL';
    }
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Garhwal Trek Packing Checklist — Print-Ready Gear List by Difficulty"
        description="Complete Garhwal trek packing checklist for Brahmatal, Kuari Pass, Roopkund, and Pangarchulla, organised by gear category, season, and difficulty."
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

        /* ── Legend ── */
        .med-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1.25rem;
          padding: 0.85rem 1.5rem;
          background: #f7f9f7;
          border: 1px solid rgba(15,118,110,0.08);
          border-radius: 12px;
          margin-bottom: 1.75rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          color: #4b5259;
          align-items: center;
        }
        .med-legend .med-legend-label {
          font-weight: 600;
          color: #2B2A26;
          font-size: 0.78rem;
        }
        .med-legend-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        /* ── Badges ── */
        .med-badge {
          display: inline-block;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.1rem 0.5rem;
          border-radius: 4px;
          margin-left: 0.4rem;
          vertical-align: middle;
        }
        .med-badge-all {
          background: #0f766e;
          color: #fff;
        }
        .med-badge-winter {
          background: #2563eb;
          color: #fff;
        }
        .med-badge-challenge {
          background: #dc2626;
          color: #fff;
        }
        .med-badge-summit {
          background: #7c3aed;
          color: #fff;
        }

        /* ── Gear Cards ── */
        .med-gear-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        @media (max-width: 720px) { .med-gear-grid { grid-template-columns: 1fr; } }

        .med-gear-card {
          padding: 0;
          overflow: hidden;
        }
        .med-gear-card .med-gear-header {
          padding: 0.85rem 1.25rem 0.25rem;
        }
        .med-gear-card .med-gear-header .med-h3 {
          font-size: 0.95rem;
          margin-bottom: 0;
        }
        .med-gear-card .med-gear-items {
          padding: 0 1.25rem 0.85rem;
        }
        .med-gear-card .med-gear-item {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          padding: 0.4rem 0;
          border-bottom: 1px solid rgba(15,118,110,0.04);
          font-family: var(--font-inter), sans-serif;
          font-size: 0.84rem;
          font-weight: 400;
          color: #4b5259;
          line-height: 1.7;
          transition: background 0.12s ease;
        }
        .med-gear-card .med-gear-item:last-child {
          border-bottom: none;
        }
        .med-gear-card .med-gear-item:hover {
          background: rgba(15,118,110,0.02);
          margin: 0 -0.5rem;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          border-radius: 4px;
        }
        .med-gear-card .med-gear-item input[type="checkbox"] {
          flex-shrink: 0;
          accent-color: #0f766e;
          width: 0.9rem;
          height: 0.9rem;
          margin-top: 0.15rem;
          cursor: pointer;
        }
        .med-gear-card .med-gear-item label {
          cursor: pointer;
          flex: 1;
        }

        .med-gear-card.med-gear-wide {
          grid-column: 1 / -1;
        }
        .med-gear-card.med-gear-wide .med-gear-items {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        @media (max-width: 720px) {
          .med-gear-card.med-gear-wide .med-gear-items {
            grid-template-columns: 1fr;
          }
        }
        .med-gear-card.med-gear-wide .med-gear-item {
          padding-right: 0.5rem;
        }
        .med-gear-card.med-gear-wide .med-gear-item:nth-child(odd) {
          border-right: 1px solid rgba(15,118,110,0.04);
          padding-right: 0.75rem;
        }
        @media (max-width: 720px) {
          .med-gear-card.med-gear-wide .med-gear-item:nth-child(odd) {
            border-right: none;
          }
        }

        /* ── Weight Table ── */
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
        .med-table td:first-child { font-weight: 500; color: #2B2A26; }

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

        @media print {
          .med-cta-btn, .med-cta-outline, .med-breadcrumb-wrap, .med-trek-footer,
          .med-nav-group, .med-hero-actions, .med-hero-tags, .med-hero-overlay,
          [data-cta], nav, footer, .no-print { display: none !important; }
          .med-hero-section { min-height: 40vh !important; }
          .med-hero-section .med-hero-content { padding: 2rem 1.5rem !important; }
          .med-hero-section .med-hero-overlay { background: rgba(4,12,10,0.6) !important; }
          .med-gear-grid { grid-template-columns: 1fr 1fr !important; }
          .med-gear-card.med-gear-wide .med-gear-items { grid-template-columns: 1fr 1fr !important; }
          .med-card { box-shadow: none !important; border: 1px solid #e5e7eb !important; }
          .med-card::before { display: none !important; }
          .med-gear-item:hover { background: none !important; }
          .med-table tr:hover td { background: none !important; }
        }
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
              { name: 'Packing Checklist' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Garhwal Himalayas · Print-Ready Gear List</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              A complete, print-ready packing list for all 4 Garhwal Himalaya treks — from the moderate Brahmatal and Kuari Pass routes to the challenging Roopkund and Pangarchulla expeditions.
            </p>
            <div className="med-hero-tags">
              <span>Print-Ready</span>
              <span>ALL Garhwal Treks</span>
              <span>By Difficulty</span>
              <span>By Season</span>
            </div>
            <div className="med-hero-actions">
              <a href="#checklist" className="med-cta-btn">View Checklist</a>
              <a href="#weight" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Pack Weight</a>
            </div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section id="checklist" className="med-shell med-section-white med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <p className="med-body">
              Items are organised by category, with colour badges indicating which treks require each item.
            </p>
            <p className="med-body" style={{ marginBottom: '0.5rem' }}>
              <strong>How to use:</strong> Print this page (Ctrl+P / Cmd+P) and check off items as you pack.
            </p>

            <div className="med-legend">
              <span className="med-legend-label">Legend:</span>
              <span className="med-legend-item"><span className="med-badge med-badge-all">ALL</span> Every Garhwal trek</span>
              <span className="med-legend-item"><span className="med-badge med-badge-winter">WINTER</span> December–March snow treks</span>
              <span className="med-legend-item"><span className="med-badge med-badge-challenge">4,500m+</span> Roopkund &amp; Pangarchulla</span>
              <span className="med-legend-item"><span className="med-badge med-badge-summit">SUMMIT</span> Pangarchulla summit day</span>
            </div>
          </div>
        </section>

        {/* ── FOOTWEAR & CLOTHING ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Footwear &amp; Clothing</span>
            </div>
            <h2 className="med-h2">Footwear &amp; <span>Clothing</span></h2>

            <div className="med-gear-grid">
              {/* Footwear */}
              <div className="med-card med-gear-card">
                <div className="med-gear-header">
                  <h3 className="med-h3">Footwear</h3>
                </div>
                <div className="med-gear-items">
                  {FOOTWEAR_ITEMS.map((item, i) => (
                    <div key={i} className="med-gear-item">
                      <input type="checkbox" id={`foot-${i}`} />
                      <label htmlFor={`foot-${i}`}>
                        {item.text}
                        <span className={`med-badge ${getBadgeClass(item.badge)}`}>
                          {getBadgeLabel(item.badge)}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Base Layer */}
              <div className="med-card med-gear-card">
                <div className="med-gear-header">
                  <h3 className="med-h3">Clothing — Base Layer</h3>
                </div>
                <div className="med-gear-items">
                  {BASE_ITEMS.map((item, i) => (
                    <div key={i} className="med-gear-item">
                      <input type="checkbox" id={`base-${i}`} />
                      <label htmlFor={`base-${i}`}>
                        {item.text}
                        <span className={`med-badge ${getBadgeClass(item.badge)}`}>
                          {getBadgeLabel(item.badge)}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mid Layer */}
              <div className="med-card med-gear-card">
                <div className="med-gear-header">
                  <h3 className="med-h3">Clothing — Mid Layer</h3>
                </div>
                <div className="med-gear-items">
                  {MID_ITEMS.map((item, i) => (
                    <div key={i} className="med-gear-item">
                      <input type="checkbox" id={`mid-${i}`} />
                      <label htmlFor={`mid-${i}`}>
                        {item.text}
                        <span className={`med-badge ${getBadgeClass(item.badge)}`}>
                          {getBadgeLabel(item.badge)}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outer Layer */}
              <div className="med-card med-gear-card">
                <div className="med-gear-header">
                  <h3 className="med-h3">Clothing — Outer Layer</h3>
                </div>
                <div className="med-gear-items">
                  {OUTER_ITEMS.map((item, i) => (
                    <div key={i} className="med-gear-item">
                      <input type="checkbox" id={`outer-${i}`} />
                      <label htmlFor={`outer-${i}`}>
                        {item.text}
                        <span className={`med-badge ${getBadgeClass(item.badge)}`}>
                          {getBadgeLabel(item.badge)}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Head, Hands, Face - Full Width */}
              <div className="med-card med-gear-card med-gear-wide">
                <div className="med-gear-header">
                  <h3 className="med-h3">Head, Hands &amp; Face</h3>
                </div>
                <div className="med-gear-items">
                  {HEAD_ITEMS.map((item, i) => (
                    <div key={i} className="med-gear-item">
                      <input type="checkbox" id={`head-${i}`} />
                      <label htmlFor={`head-${i}`}>
                        {item.text}
                        <span className={`med-badge ${getBadgeClass(item.badge)}`}>
                          {getBadgeLabel(item.badge)}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PACK, SLEEP, HYDRATION ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Pack, Sleep &amp; Nutrition</span>
            </div>
            <h2 className="med-h2">Pack, Sleep &amp; <span>Nutrition</span></h2>

            <div className="med-gear-grid">
              {/* Pack & Carry */}
              <div className="med-card med-gear-card">
                <div className="med-gear-header">
                  <h3 className="med-h3">Pack &amp; Carry</h3>
                </div>
                <div className="med-gear-items">
                  {PACK_ITEMS.map((item, i) => (
                    <div key={i} className="med-gear-item">
                      <input type="checkbox" id={`pack-${i}`} />
                      <label htmlFor={`pack-${i}`}>
                        {item.text}
                        <span className="med-badge med-badge-all">ALL</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sleep System */}
              <div className="med-card med-gear-card">
                <div className="med-gear-header">
                  <h3 className="med-h3">Sleep System</h3>
                </div>
                <div className="med-gear-items">
                  {SLEEP_ITEMS.map((item, i) => (
                    <div key={i} className="med-gear-item">
                      <input type="checkbox" id={`sleep-${i}`} />
                      <label htmlFor={`sleep-${i}`}>
                        {item.text}
                        <span className={`med-badge ${getBadgeClass(item.badge)}`}>
                          {getBadgeLabel(item.badge)}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hydration & Nutrition - Full Width */}
              <div className="med-card med-gear-card med-gear-wide">
                <div className="med-gear-header">
                  <h3 className="med-h3">Hydration &amp; Nutrition</h3>
                </div>
                <div className="med-gear-items">
                  {HYDRATION_ITEMS.map((item, i) => (
                    <div key={i} className="med-gear-item">
                      <input type="checkbox" id={`hydro-${i}`} />
                      <label htmlFor={`hydro-${i}`}>
                        {item.text}
                        <span className={`med-badge ${getBadgeClass(item.badge)}`}>
                          {getBadgeLabel(item.badge)}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SAFETY, HEALTH, ESSENTIALS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Safety, Health &amp; Essentials</span>
            </div>
            <h2 className="med-h2">Safety, Health &amp; <span>Essentials</span></h2>

            <div className="med-gear-grid">
              {/* Electronics */}
              <div className="med-card med-gear-card">
                <div className="med-gear-header">
                  <h3 className="med-h3">Electronics</h3>
                </div>
                <div className="med-gear-items">
                  {ELECTRONICS_ITEMS.map((item, i) => (
                    <div key={i} className="med-gear-item">
                      <input type="checkbox" id={`elec-${i}`} />
                      <label htmlFor={`elec-${i}`}>
                        {item.text}
                        <span className={`med-badge ${getBadgeClass(item.badge)}`}>
                          {getBadgeLabel(item.badge)}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* First Aid */}
              <div className="med-card med-gear-card">
                <div className="med-gear-header">
                  <h3 className="med-h3">First Aid &amp; Health</h3>
                </div>
                <div className="med-gear-items">
                  {FIRST_AID_ITEMS.map((item, i) => (
                    <div key={i} className="med-gear-item">
                      <input type="checkbox" id={`aid-${i}`} />
                      <label htmlFor={`aid-${i}`}>
                        {item.text}
                        <span className={`med-badge ${getBadgeClass(item.badge)}`}>
                          {getBadgeLabel(item.badge)}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toiletries */}
              <div className="med-card med-gear-card">
                <div className="med-gear-header">
                  <h3 className="med-h3">Toiletries &amp; Personal</h3>
                </div>
                <div className="med-gear-items">
                  {TOILETRIES_ITEMS.map((item, i) => (
                    <div key={i} className="med-gear-item">
                      <input type="checkbox" id={`toil-${i}`} />
                      <label htmlFor={`toil-${i}`}>
                        {item.text}
                        <span className="med-badge med-badge-all">ALL</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div className="med-card med-gear-card">
                <div className="med-gear-header">
                  <h3 className="med-h3">Documents &amp; Essentials</h3>
                </div>
                <div className="med-gear-items">
                  {DOCUMENTS_ITEMS.map((item, i) => (
                    <div key={i} className="med-gear-item">
                      <input type="checkbox" id={`doc-${i}`} />
                      <label htmlFor={`doc-${i}`}>
                        {item.text}
                        <span className={`med-badge ${getBadgeClass(item.badge)}`}>
                          {getBadgeLabel(item.badge)}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TARGET PACK WEIGHT ── */}
        <section id="weight" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Weight Targets</span>
            </div>
            <h2 className="med-h2">Target <span>Pack Weight</span></h2>

            <div className="med-table-wrap">
              <table className="med-table">
                <thead>
                  <tr>
                    <th>Trek Type</th>
                    <th>Daypack Target</th>
                    <th>Self-Supported Target</th>
                    <th>Summit Day</th>
                  </tr>
                </thead>
                <tbody>
                  {WEIGHT_TARGETS.map((row, i) => (
                    <tr key={i}>
                      <td>{row.type}</td>
                      <td>{row.daypack}</td>
                      <td>{row.self}</td>
                      <td>{row.summit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="med-body" style={{ marginTop: '1.25rem' }}>
              Weigh your fully packed bag at home. If you are over target, eliminate items from the non-essential category first. Every extra kilogram costs energy you will need above 4,000 metres. For a structured training plan that builds load tolerance, see the{' '}
              <Link href="/treks/garhwal-himalayas/fitness-guide">8-week Garhwal fitness preparation guide</Link>.
            </p>
          </div>
        </section>

        <PrimaryCTA
          id="plan"
          label="Plan My Garhwal Trek"
          subtext="Tell us your experience level and preferred dates. We will recommend the right route, provide a gear briefing, and handle permits."
          vertical="trek"
          category="packing"
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
            { label: 'All 4 Garhwal Himalaya Treks — Route Overview', href: '/treks/garhwal-himalayas' },
            { label: '8-Week Fitness Preparation Guide', href: '/treks/garhwal-himalayas/fitness-guide' },
            { label: 'Brahmatal vs Kuari Pass — Moderate Comparison', href: '/treks/brahmatal-vs-kuari-pass' },
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
              <Link href="/treks/garhwal-himalayas" className="med-nav-link">
                <span>All 4 Garhwal Himalaya Treks — Route Overview</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/garhwal-himalayas/fitness-guide" className="med-nav-link">
                <span>8-Week Fitness Preparation Guide</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/brahmatal-vs-kuari-pass" className="med-nav-link">
                <span>Brahmatal vs Kuari Pass — Moderate Comparison</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/treks/roopkund-vs-pangarchulla" className="med-nav-link" style={{ borderBottom: 'none' }}>
                <span>Roopkund vs Pangarchulla — Challenging Comparison</span>
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