import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/treks/garhwal-himalayas/packing-checklist';

export function generateMetadata(): Metadata {
  return {
    title: 'Garhwal Trek Packing Checklist — Print-Ready Gear List by Difficulty | Retreats And Treks',
    description:
      'Complete packing checklist for Garhwal Himalaya treks (3,850m–4,800m). Print-ready gear list for Brahmatal, Kuari Pass, Roopkund & Pangarchulla. Organised by category, difficulty tier & season.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Garhwal Trek Packing Checklist — Complete Gear List',
      description:
        'Print-ready packing checklist for all 4 Garhwal Himalaya treks. Organised by category, difficulty tier and season. Nothing forgotten.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
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

  const checkboxStyle = {
    display: 'block' as const,
    padding: '0.35rem 0',
    lineHeight: 1.7,
  };

  const categoryStyle = {
    fontSize: '1.15rem' as const,
    fontWeight: 600 as const,
    marginBottom: '0.5rem',
    marginTop: '1.5rem',
  };

  const badgeBase = {
    display: 'inline-block' as const,
    fontSize: '0.7rem' as const,
    fontWeight: 600 as const,
    padding: '0.15rem 0.5rem',
    borderRadius: '3px',
    marginLeft: '0.5rem',
    verticalAlign: 'middle' as const,
  };

  const badgeAll = { ...badgeBase, background: 'var(--color-primary)', color: '#fff' };
  const badgeWinter = { ...badgeBase, background: '#2563eb', color: '#fff' };
  const badgeChallenge = { ...badgeBase, background: '#dc2626', color: '#fff' };
  const badgeSummit = { ...badgeBase, background: '#7c3aed', color: '#fff' };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Treks', href: '/treks' },
          { name: 'Garhwal Himalayas', href: '/treks/garhwal-himalayas' },
          { name: 'Packing Checklist' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Garhwal Trek Packing Checklist
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            A complete, print-ready packing list for all 4{' '}
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)' }}>
              Garhwal Himalaya treks
            </Link>{' '}
            — from the moderate{' '}
            <Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)' }}>
              Brahmatal and Kuari Pass routes
            </Link>{' '}
            to the challenging{' '}
            <Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)' }}>
              Roopkund and Pangarchulla expeditions
            </Link>.
            Items are organised by category, with colour badges indicating which treks require each item.
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}>
            <strong>How to use:</strong> Print this page (Ctrl+P / Cmd+P) and check off items as you pack.
            Items marked <span style={badgeAll}>ALL</span> are required for every Garhwal trek.
            Items marked <span style={badgeWinter}>WINTER</span> are for December–March snow treks.
            Items marked <span style={badgeChallenge}>4,500m+</span> are for Roopkund and Pangarchulla.
            Items marked <span style={badgeSummit}>SUMMIT</span> are specific to Pangarchulla summit day.
          </p>
        </header>

        {/* ── PRINT STYLES ─────────────────────────────────────────── */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            nav, footer, header > div:first-child, [data-cta], button, .no-print { display: none !important; }
            body { font-size: 11pt; line-height: 1.5; }
            article { max-width: 100% !important; padding: 0 !important; }
            h1 { font-size: 16pt !important; }
            h2 { font-size: 13pt !important; page-break-after: avoid; }
            h3 { font-size: 11pt !important; page-break-after: avoid; }
            table { page-break-inside: avoid; }
            a { color: #000 !important; text-decoration: none !important; }
            @page { margin: 1.5cm; }
          }
        `}} />

        {/* ── FOOTWEAR ─────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
            Footwear
          </h2>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Trekking boots — ankle-height, waterproof, broken in (50+ km before trek) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Camp sandals or flip-flops (rest at campsites) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Trekking socks — 2 pairs merino wool <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Liner socks — 2 pairs (blister prevention) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Gaiters — knee-height, waterproof <span style={badgeWinter}>WINTER</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Microspikes / light crampons <span style={badgeWinter}>WINTER</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Full crampons — 12-point (often provided by operator) <span style={badgeSummit}>SUMMIT</span>
          </label>
        </section>

        {/* ── CLOTHING — BASE LAYER ────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
            Clothing — Base Layer
          </h2>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Moisture-wicking t-shirts — 2–3 (synthetic or merino, never cotton) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Trekking trousers — 2 pairs (quick-dry, articulated knees) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Underwear — 3 pairs quick-dry <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Thermal base layer top — lightweight <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Thermal base layer bottom — lightweight <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Expedition-weight thermal top <span style={badgeChallenge}>4,500m+</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Expedition-weight thermal bottom <span style={badgeChallenge}>4,500m+</span>
          </label>
        </section>

        {/* ── CLOTHING — MID LAYER ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
            Clothing — Mid Layer
          </h2>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Fleece jacket or pullover (200-weight) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Down jacket — rated to −10°C <span style={badgeWinter}>WINTER</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Down jacket — rated to −15°C or lower <span style={badgeChallenge}>4,500m+</span>
          </label>
        </section>

        {/* ── CLOTHING — OUTER LAYER ───────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
            Clothing — Outer Layer
          </h2>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Waterproof/windproof shell jacket (seam-sealed) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Waterproof overtrousers <span style={badgeWinter}>WINTER</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Poncho or rain cover (monsoon-adjacent seasons) <span style={badgeAll}>ALL</span>
          </label>
        </section>

        {/* ── HEAD & HANDS ─────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
            Head, Hands &amp; Face
          </h2>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Sun hat or cap (UV protection) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Warm beanie / wool hat <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Buff / neck gaiter <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Balaclava (full face cover) <span style={badgeWinter}>WINTER</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Trekking gloves — lightweight, touchscreen-compatible <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Insulated gloves — waterproof, rated to −15°C <span style={badgeWinter}>WINTER</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> UV-rated sunglasses (Category 3–4) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Snow goggles (high wind / summit day) <span style={badgeSummit}>SUMMIT</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Sunscreen SPF 50+ (apply every 2 hours above snow line) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Lip balm with SPF <span style={badgeAll}>ALL</span>
          </label>
        </section>

        {/* ── PACK & CARRY ─────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
            Pack &amp; Carry
          </h2>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Daypack — 30–40 litres with hip belt <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Rain cover for pack <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Dry bags — 2–3 (for electronics, clothes, sleeping bag) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Trekking poles — pair (reduces knee impact 25–30%) <span style={badgeAll}>ALL</span>
          </label>
        </section>

        {/* ── SLEEP SYSTEM ─────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
            Sleep System
          </h2>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Sleeping bag — 3-season, comfort −5°C (spring/autumn treks) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Sleeping bag — 4-season, comfort −15°C (December–March) <span style={badgeWinter}>WINTER</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Sleeping bag — 4-season, comfort −20°C (Pangarchulla summit camp) <span style={badgeSummit}>SUMMIT</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Sleeping bag liner (adds 5–8°C warmth) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Sleeping pad — insulated (R-value 3.0+) <span style={badgeAll}>ALL</span>
          </label>
        </section>

        {/* ── HYDRATION & NUTRITION ────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
            Hydration &amp; Nutrition
          </h2>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Water bottles — 2 × 1 litre (wide-mouth, BPA-free) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Insulated water bottle cover (prevents freezing) <span style={badgeWinter}>WINTER</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Water purification tablets (backup) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> ORS sachets — 4–6 (altitude dehydration recovery) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Trail mix / dry fruit — 500g <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Energy bars — 4–6 (high calorie, compact) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Glucose biscuits / chocolate <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Energy gels — 4+ (summit day fuel, no cooking above 4,200m in wind) <span style={badgeSummit}>SUMMIT</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Hand warmers — chemical, 2–4 pairs (also warm water bottles) <span style={badgeWinter}>WINTER</span>
          </label>
        </section>

        {/* ── ELECTRONICS ──────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
            Electronics
          </h2>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Headlamp with spare batteries (lithium — perform better in cold) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Power bank — 10,000+ mAh (keep inside sleeping bag at night to prevent cold drain) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Phone with offline maps downloaded (Maps.me or Google Maps offline) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Camera (optional — phone is fine) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Pulse oximeter — pocket-sized (monitor SpO2 above 4,000m) <span style={badgeChallenge}>4,500m+</span>
          </label>
        </section>

        {/* ── FIRST AID & HEALTH ───────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
            First Aid &amp; Health
          </h2>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Blister plasters (Compeed or equivalent) — 6+ <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Medical tape / zinc oxide tape <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Ibuprofen (anti-inflammatory, headache relief) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Paracetamol (fever, general pain) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Diamox 125mg — physician prescribed (altitude sickness prevention) <span style={badgeChallenge}>4,500m+</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Antiseptic wipes / cream <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Anti-diarrhoeal medication <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Prescription medications (carry originals + copy of prescription) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Knee brace / support (if known knee issues — descents are demanding) <span style={badgeAll}>ALL</span>
          </label>
        </section>

        {/* ── TOILETRIES ───────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
            Toiletries &amp; Personal
          </h2>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Toothbrush &amp; toothpaste (travel size) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Wet wipes / biodegradable body wipes (no showers on trail) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Toilet paper + ziplock bag (pack out all waste) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Hand sanitiser <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Quick-dry towel (microfibre, compact) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Earplugs (tent/dormitory sleeping) <span style={badgeAll}>ALL</span>
          </label>
        </section>

        {/* ── DOCUMENTS ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
            Documents &amp; Essentials
          </h2>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Government-issued photo ID (Aadhaar / passport) — original + photocopy <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Trek permit (arranged by operator for Roopkund; self-arranged for others) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Emergency contact card (laminated, in pack lid pocket) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Cash — ₹3,000–5,000 (no ATMs beyond base town) <span style={badgeAll}>ALL</span>
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" /> Travel insurance with altitude trekking cover (verify policy covers 5,000m) <span style={badgeChallenge}>4,500m+</span>
          </label>
        </section>

        {/* ── WEIGHT TARGETS ───────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Target Pack Weight
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', lineHeight: 1.7 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Trek Type</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Daypack Target</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Self-Supported Target</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Summit Day</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate (Brahmatal, Kuari Pass)</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>6–8 kg</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>12–14 kg</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>N/A</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Challenging (Roopkund, Pangarchulla)</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>7–9 kg</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>13–15 kg</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4–5 kg</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ lineHeight: 1.8, marginTop: '1rem', fontSize: '0.95rem' }}>
            Weigh your fully packed bag at home. If you are over target, eliminate items from the non-essential
            category first. Every extra kilogram costs energy you will need above 4,000 metres.
            For a structured training plan that builds load tolerance, see the{' '}
            <Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: 'var(--color-primary)' }}>
              8-week Garhwal fitness preparation guide
            </Link>.
          </p>
        </section>

        <PrimaryCTA
          label="Plan My Garhwal Trek"
          subtext="Tell us your experience level and preferred dates. We will recommend the right route, provide a gear briefing, and handle permits."
          vertical="trek"
          category="packing"
          sourcePath={PATH}
        />

        {/* ── FAQs ─────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </section>

        {/* ── EXPLORE MORE ─────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-md)', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
            Explore More
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2 }}>
            <li><Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>All 4 Garhwal Himalaya Treks — Route Overview →</Link></li>
            <li><Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>8-Week Fitness Preparation Guide →</Link></li>
            <li><Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal vs Kuari Pass — Moderate Comparison →</Link></li>
            <li><Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund vs Pangarchulla — Challenging Comparison →</Link></li>
            <li><Link href="/blog/beginner-to-advanced-trek-progression-garhwal" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Beginner to Advanced Garhwal Progression →</Link></li>
          </ul>
        </section>

      </article>
    </TrackedPage>
  );
}
