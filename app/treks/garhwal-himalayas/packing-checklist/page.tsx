import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
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

    

        <style>{`
        /* ── PCL scoped styles — prefix: pcl- ── */
        .pcl-body { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555555; margin: 0; }
        .pcl-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .pcl-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; display: inline-block; }
        .pcl-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--color-primary); font-weight: 500; opacity: 0.7; }

        /* Badges */
        .pcl-badge { display: inline-block; font-family: var(--font-geist-sans), sans-serif; font-size: 0.6rem; font-weight: 600; padding: 0.1rem 0.45rem; border-radius: 3px; margin-left: 0.4rem; vertical-align: middle; letter-spacing: 0.04em; }
        .pcl-badge-all      { background: var(--color-primary); color: #fff; }
        .pcl-badge-winter   { background: #2563eb; color: #fff; }
        .pcl-badge-challenge{ background: #dc2626; color: #fff; }
        .pcl-badge-summit   { background: #7c3aed; color: #fff; }

        /* Gear group card */
        .pcl-gear-group { background: #ffffff; border: 1px solid #eef0ee; border-top: 2px solid var(--color-primary); border-radius: 10px; margin-bottom: 1rem; overflow: hidden; }
        .pcl-gear-group-title { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 500; color: #111; padding: 0.85rem 1.25rem 0; letter-spacing: -0.01em; margin: 0 0 0.25rem; }
        .pcl-gear-item { display: flex; align-items: baseline; gap: 0.6rem; padding: 0.45rem 1.25rem; border-bottom: 1px solid #f7f9f7; font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 300; color: #555; line-height: 1.7; transition: background 0.12s ease; }
        .pcl-gear-item:last-child { border-bottom: none; }
        .pcl-gear-item:hover { background: #f7f9f7; }
        .pcl-gear-item input[type="checkbox"] { flex-shrink: 0; accent-color: var(--color-primary); width: 0.9rem; height: 0.9rem; margin-top: 0.15rem; cursor: pointer; }
        .pcl-gear-item label { cursor: pointer; flex: 1; }

        /* Table */
        .pcl-table-wrap { overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 10px; background: #ffffff; }
        .pcl-table { width: 100%; border-collapse: collapse; }
        .pcl-table thead tr { border-bottom: 2px solid #e5e7eb; }
        .pcl-table th { font-family: var(--font-geist-sans), sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-primary); opacity: 0.7; padding: 0.75rem 1rem; text-align: left; }
        .pcl-table td { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 300; color: #444; padding: 0.75rem 1rem; border-bottom: 1px solid #f0f0f0; }
        .pcl-table td:first-child { font-weight: 500; color: #111; }
        .pcl-table tbody tr:last-child td { border-bottom: none; }
        .pcl-table tbody tr:hover td { background: #f7f9f7; }

        /* Nav */
        .pcl-nav-group { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .pcl-nav-link { display: flex; align-items: center; justify-content: space-between; padding: 0.9rem 1.1rem; border-bottom: 1px solid #f0f0f0; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #333; text-decoration: none; transition: background 0.15s ease, color 0.15s ease; }
        .pcl-nav-link:hover { background: #f7f9f7; color: var(--color-primary); }
        .pcl-nav-link::after { content: '→'; color: var(--color-primary); opacity: 0.5; }
        .pcl-nav-group .pcl-nav-link:last-child { border-bottom: none; }

        /* 2-col gear grid */
        .pcl-gear-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

        /* Legend strip */
        .pcl-legend { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; padding: 0.85rem 1.25rem; background: #f7f9f7; border: 1px solid #eef0ee; border-radius: 10px; margin-bottom: 1.75rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.8rem; font-weight: 300; color: #555; align-items: center; }
        .pcl-legend-item { display: flex; align-items: center; gap: 0.35rem; }

        @media print {
          nav, footer, [data-cta], button, .no-print { display: none !important; }
          body { font-size: 11pt; line-height: 1.5; }
          article { max-width: 100% !important; padding: 0 !important; }
          h1 { font-size: 16pt !important; }
          h2 { font-size: 13pt !important; page-break-after: avoid; }
          a { color: #000 !important; text-decoration: none !important; }
          @page { margin: 1.5cm; }
          .pcl-gear-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 700px) {
          .pcl-gear-grid { grid-template-columns: 1fr; }
          .pcl-table th:nth-child(4), .pcl-table td:nth-child(4) { display: none; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="pcl-eyebrow"><span className="pcl-eyebrow-line" /><span className="pcl-eyebrow-text">Garhwal Himalayas · Print-Ready Gear List</span></div>
          <h1 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.035em', color: '#111111', lineHeight: 1.1, margin: '0 0 1.5rem' }}>
            Garhwal Trek Packing Checklist
          </h1>
          <p className="pcl-body" style={{ marginBottom: '1.25rem' }}>
            A complete, print-ready packing list for all 4{' '}
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Garhwal Himalaya treks</Link>{' '}
            — from the moderate{' '}
            <Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal and Kuari Pass routes</Link>{' '}
            to the challenging{' '}
            <Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund and Pangarchulla expeditions</Link>.
            Items are organised by category, with colour badges indicating which treks require each item.
          </p>
          <p className="pcl-body" style={{ marginBottom: '1.5rem' }}>
            <strong style={{ fontWeight: 500, color: '#111' }}>How to use:</strong> Print this page (Ctrl+P / Cmd+P) and check off items as you pack.
          </p>
          <div className="pcl-legend">
            <span style={{ fontWeight: 500, color: '#111', fontSize: '0.78rem' }}>Legend:</span>
            <span className="pcl-legend-item"><span className="pcl-badge pcl-badge-all">ALL</span> Every Garhwal trek</span>
            <span className="pcl-legend-item"><span className="pcl-badge pcl-badge-winter">WINTER</span> December–March snow treks</span>
            <span className="pcl-legend-item"><span className="pcl-badge pcl-badge-challenge">4,500m+</span> Roopkund &amp; Pangarchulla</span>
            <span className="pcl-legend-item"><span className="pcl-badge pcl-badge-summit">SUMMIT</span> Pangarchulla summit day</span>
          </div>
        </div>
      </section>

      {/* ── GEAR SECTIONS ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="pcl-eyebrow"><span className="pcl-eyebrow-line" /><span className="pcl-eyebrow-text">Footwear &amp; Clothing</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Footwear &amp; Clothing
          </h2>
          <div className="pcl-gear-grid">

            {/* Footwear */}
            <div className="pcl-gear-group">
              <h3 className="pcl-gear-group-title">Footwear</h3>
              {[
                { text: 'Trekking boots — ankle-height, waterproof, broken in (50+ km before trek)', badge: 'all' },
                { text: 'Camp sandals or flip-flops (rest at campsites)', badge: 'all' },
                { text: 'Trekking socks — 2 pairs merino wool', badge: 'all' },
                { text: 'Liner socks — 2 pairs (blister prevention)', badge: 'all' },
                { text: 'Gaiters — knee-height, waterproof', badge: 'winter' },
                { text: 'Microspikes / light crampons', badge: 'winter' },
                { text: 'Full crampons — 12-point (often provided by operator)', badge: 'summit' },
              ].map((item, i) => (
                <div className="pcl-gear-item" key={i}>
                  <input type="checkbox" id={`foot-${i}`} />
                  <label htmlFor={`foot-${i}`}>{item.text} <span className={`pcl-badge pcl-badge-${item.badge}`}>{item.badge === 'all' ? 'ALL' : item.badge === 'winter' ? 'WINTER' : item.badge === 'challenge' ? '4,500m+' : 'SUMMIT'}</span></label>
                </div>
              ))}
            </div>

            {/* Base Layer */}
            <div className="pcl-gear-group">
              <h3 className="pcl-gear-group-title">Clothing — Base Layer</h3>
              {[
                { text: 'Moisture-wicking t-shirts — 2–3 (synthetic or merino, never cotton)', badge: 'all' },
                { text: 'Trekking trousers — 2 pairs (quick-dry, articulated knees)', badge: 'all' },
                { text: 'Underwear — 3 pairs quick-dry', badge: 'all' },
                { text: 'Thermal base layer top — lightweight', badge: 'all' },
                { text: 'Thermal base layer bottom — lightweight', badge: 'all' },
                { text: 'Expedition-weight thermal top', badge: 'challenge' },
                { text: 'Expedition-weight thermal bottom', badge: 'challenge' },
              ].map((item, i) => (
                <div className="pcl-gear-item" key={i}>
                  <input type="checkbox" id={`base-${i}`} />
                  <label htmlFor={`base-${i}`}>{item.text} <span className={`pcl-badge pcl-badge-${item.badge}`}>{item.badge === 'all' ? 'ALL' : item.badge === 'winter' ? 'WINTER' : item.badge === 'challenge' ? '4,500m+' : 'SUMMIT'}</span></label>
                </div>
              ))}
            </div>

            {/* Mid Layer */}
            <div className="pcl-gear-group">
              <h3 className="pcl-gear-group-title">Clothing — Mid Layer</h3>
              {[
                { text: 'Fleece jacket or pullover (200-weight)', badge: 'all' },
                { text: 'Down jacket — rated to −10°C', badge: 'winter' },
                { text: 'Down jacket — rated to −15°C or lower', badge: 'challenge' },
              ].map((item, i) => (
                <div className="pcl-gear-item" key={i}>
                  <input type="checkbox" id={`mid-${i}`} />
                  <label htmlFor={`mid-${i}`}>{item.text} <span className={`pcl-badge pcl-badge-${item.badge}`}>{item.badge === 'all' ? 'ALL' : item.badge === 'winter' ? 'WINTER' : item.badge === 'challenge' ? '4,500m+' : 'SUMMIT'}</span></label>
                </div>
              ))}
            </div>

            {/* Outer Layer */}
            <div className="pcl-gear-group">
              <h3 className="pcl-gear-group-title">Clothing — Outer Layer</h3>
              {[
                { text: 'Waterproof/windproof shell jacket (seam-sealed)', badge: 'all' },
                { text: 'Waterproof overtrousers', badge: 'winter' },
                { text: 'Poncho or rain cover (monsoon-adjacent seasons)', badge: 'all' },
              ].map((item, i) => (
                <div className="pcl-gear-item" key={i}>
                  <input type="checkbox" id={`outer-${i}`} />
                  <label htmlFor={`outer-${i}`}>{item.text} <span className={`pcl-badge pcl-badge-${item.badge}`}>{item.badge === 'all' ? 'ALL' : item.badge === 'winter' ? 'WINTER' : item.badge === 'challenge' ? '4,500m+' : 'SUMMIT'}</span></label>
                </div>
              ))}
            </div>

            {/* Head Hands Face */}
            <div className="pcl-gear-group" style={{ gridColumn: '1 / -1' }}>
              <h3 className="pcl-gear-group-title">Head, Hands &amp; Face</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                {[
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
                ].map((item, i) => (
                  <div className="pcl-gear-item" key={i} style={{ borderRight: i % 2 === 0 ? '1px solid #f7f9f7' : 'none' }}>
                    <input type="checkbox" id={`head-${i}`} />
                    <label htmlFor={`head-${i}`}>{item.text} <span className={`pcl-badge pcl-badge-${item.badge}`}>{item.badge === 'all' ? 'ALL' : item.badge === 'winter' ? 'WINTER' : item.badge === 'challenge' ? '4,500m+' : 'SUMMIT'}</span></label>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── GEAR: PACK, SLEEP, HYDRATION ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="pcl-eyebrow"><span className="pcl-eyebrow-line" /><span className="pcl-eyebrow-text">Pack, Sleep &amp; Nutrition</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Pack, Sleep &amp; Nutrition
          </h2>
          <div className="pcl-gear-grid">

            {/* Pack & Carry */}
            <div className="pcl-gear-group">
              <h3 className="pcl-gear-group-title">Pack &amp; Carry</h3>
              {[
                { text: 'Daypack — 30–40 litres with hip belt', badge: 'all' },
                { text: 'Rain cover for pack', badge: 'all' },
                { text: 'Dry bags — 2–3 (for electronics, clothes, sleeping bag)', badge: 'all' },
                { text: 'Trekking poles — pair (reduces knee impact 25–30%)', badge: 'all' },
              ].map((item, i) => (
                <div className="pcl-gear-item" key={i}>
                  <input type="checkbox" id={`pack-${i}`} />
                  <label htmlFor={`pack-${i}`}>{item.text} <span className={`pcl-badge pcl-badge-${item.badge}`}>ALL</span></label>
                </div>
              ))}
            </div>

            {/* Sleep System */}
            <div className="pcl-gear-group">
              <h3 className="pcl-gear-group-title">Sleep System</h3>
              {[
                { text: 'Sleeping bag — 3-season, comfort −5°C (spring/autumn treks)', badge: 'all' },
                { text: 'Sleeping bag — 4-season, comfort −15°C (December–March)', badge: 'winter' },
                { text: 'Sleeping bag — 4-season, comfort −20°C (Pangarchulla summit camp)', badge: 'summit' },
                { text: 'Sleeping bag liner (adds 5–8°C warmth)', badge: 'all' },
                { text: 'Sleeping pad — insulated (R-value 3.0+)', badge: 'all' },
              ].map((item, i) => (
                <div className="pcl-gear-item" key={i}>
                  <input type="checkbox" id={`sleep-${i}`} />
                  <label htmlFor={`sleep-${i}`}>{item.text} <span className={`pcl-badge pcl-badge-${item.badge}`}>{item.badge === 'all' ? 'ALL' : item.badge === 'winter' ? 'WINTER' : 'SUMMIT'}</span></label>
                </div>
              ))}
            </div>

            {/* Hydration & Nutrition */}
            <div className="pcl-gear-group" style={{ gridColumn: '1 / -1' }}>
              <h3 className="pcl-gear-group-title">Hydration &amp; Nutrition</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                {[
                  { text: 'Water bottles — 2 × 1 litre (wide-mouth, BPA-free)', badge: 'all' },
                  { text: 'Insulated water bottle cover (prevents freezing)', badge: 'winter' },
                  { text: 'Water purification tablets (backup)', badge: 'all' },
                  { text: 'ORS sachets — 4–6 (altitude dehydration recovery)', badge: 'all' },
                  { text: 'Trail mix / dry fruit — 500g', badge: 'all' },
                  { text: 'Energy bars — 4–6 (high calorie, compact)', badge: 'all' },
                  { text: 'Glucose biscuits / chocolate', badge: 'all' },
                  { text: 'Energy gels — 4+ (summit day fuel, no cooking above 4,200m in wind)', badge: 'summit' },
                  { text: 'Hand warmers — chemical, 2–4 pairs (also warm water bottles)', badge: 'winter' },
                ].map((item, i) => (
                  <div className="pcl-gear-item" key={i} style={{ borderRight: i % 2 === 0 ? '1px solid #f7f9f7' : 'none' }}>
                    <input type="checkbox" id={`hydro-${i}`} />
                    <label htmlFor={`hydro-${i}`}>{item.text} <span className={`pcl-badge pcl-badge-${item.badge}`}>{item.badge === 'all' ? 'ALL' : item.badge === 'winter' ? 'WINTER' : item.badge === 'challenge' ? '4,500m+' : 'SUMMIT'}</span></label>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── GEAR: ELECTRONICS, FIRST AID, TOILETRIES, DOCUMENTS ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="pcl-eyebrow"><span className="pcl-eyebrow-line" /><span className="pcl-eyebrow-text">Safety, Health &amp; Essentials</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Safety, Health &amp; Essentials
          </h2>
          <div className="pcl-gear-grid">

            {/* Electronics */}
            <div className="pcl-gear-group">
              <h3 className="pcl-gear-group-title">Electronics</h3>
              {[
                { text: 'Headlamp with spare batteries (lithium — perform better in cold)', badge: 'all' },
                { text: 'Power bank — 10,000+ mAh (keep inside sleeping bag at night to prevent cold drain)', badge: 'all' },
                { text: 'Phone with offline maps downloaded (Maps.me or Google Maps offline)', badge: 'all' },
                { text: 'Camera (optional — phone is fine)', badge: 'all' },
                { text: 'Pulse oximeter — pocket-sized (monitor SpO2 above 4,000m)', badge: 'challenge' },
              ].map((item, i) => (
                <div className="pcl-gear-item" key={i}>
                  <input type="checkbox" id={`elec-${i}`} />
                  <label htmlFor={`elec-${i}`}>{item.text} <span className={`pcl-badge pcl-badge-${item.badge}`}>{item.badge === 'all' ? 'ALL' : '4,500m+'}</span></label>
                </div>
              ))}
            </div>

            {/* First Aid */}
            <div className="pcl-gear-group">
              <h3 className="pcl-gear-group-title">First Aid &amp; Health</h3>
              {[
                { text: 'Blister plasters (Compeed or equivalent) — 6+', badge: 'all' },
                { text: 'Medical tape / zinc oxide tape', badge: 'all' },
                { text: 'Ibuprofen (anti-inflammatory, headache relief)', badge: 'all' },
                { text: 'Paracetamol (fever, general pain)', badge: 'all' },
                { text: 'Diamox 125mg — physician prescribed (altitude sickness prevention)', badge: 'challenge' },
                { text: 'Antiseptic wipes / cream', badge: 'all' },
                { text: 'Anti-diarrhoeal medication', badge: 'all' },
                { text: 'Prescription medications (carry originals + copy of prescription)', badge: 'all' },
                { text: 'Knee brace / support (if known knee issues — descents are demanding)', badge: 'all' },
              ].map((item, i) => (
                <div className="pcl-gear-item" key={i}>
                  <input type="checkbox" id={`aid-${i}`} />
                  <label htmlFor={`aid-${i}`}>{item.text} <span className={`pcl-badge pcl-badge-${item.badge}`}>{item.badge === 'all' ? 'ALL' : '4,500m+'}</span></label>
                </div>
              ))}
            </div>

            {/* Toiletries */}
            <div className="pcl-gear-group">
              <h3 className="pcl-gear-group-title">Toiletries &amp; Personal</h3>
              {[
                { text: 'Toothbrush & toothpaste (travel size)', badge: 'all' },
                { text: 'Wet wipes / biodegradable body wipes (no showers on trail)', badge: 'all' },
                { text: 'Toilet paper + ziplock bag (pack out all waste)', badge: 'all' },
                { text: 'Hand sanitiser', badge: 'all' },
                { text: 'Quick-dry towel (microfibre, compact)', badge: 'all' },
                { text: 'Earplugs (tent/dormitory sleeping)', badge: 'all' },
              ].map((item, i) => (
                <div className="pcl-gear-item" key={i}>
                  <input type="checkbox" id={`toil-${i}`} />
                  <label htmlFor={`toil-${i}`}>{item.text} <span className="pcl-badge pcl-badge-all">ALL</span></label>
                </div>
              ))}
            </div>

            {/* Documents */}
            <div className="pcl-gear-group">
              <h3 className="pcl-gear-group-title">Documents &amp; Essentials</h3>
              {[
                { text: 'Government-issued photo ID (Aadhaar / passport) — original + photocopy', badge: 'all' },
                { text: 'Trek permit (arranged by operator for Roopkund; self-arranged for others)', badge: 'all' },
                { text: 'Emergency contact card (laminated, in pack lid pocket)', badge: 'all' },
                { text: 'Cash — ₹3,000–5,000 (no ATMs beyond base town)', badge: 'all' },
                { text: 'Travel insurance with altitude trekking cover (verify policy covers 5,000m)', badge: 'challenge' },
              ].map((item, i) => (
                <div className="pcl-gear-item" key={i}>
                  <input type="checkbox" id={`doc-${i}`} />
                  <label htmlFor={`doc-${i}`}>{item.text} <span className={`pcl-badge pcl-badge-${item.badge}`}>{item.badge === 'all' ? 'ALL' : '4,500m+'}</span></label>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── TARGET PACK WEIGHT ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="pcl-eyebrow"><span className="pcl-eyebrow-line" /><span className="pcl-eyebrow-text">Weight Targets</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Target Pack Weight
          </h2>
          <div className="pcl-table-wrap">
            <table className="pcl-table">
              <thead>
                <tr>
                  <th>Trek Type</th>
                  <th>Daypack Target</th>
                  <th>Self-Supported Target</th>
                  <th>Summit Day</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Moderate (Brahmatal, Kuari Pass)</td>
                  <td>6–8 kg</td>
                  <td>12–14 kg</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>Challenging (Roopkund, Pangarchulla)</td>
                  <td>7–9 kg</td>
                  <td>13–15 kg</td>
                  <td>4–5 kg</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="pcl-body" style={{ marginTop: '1.25rem' }}>
            Weigh your fully packed bag at home. If you are over target, eliminate items from the non-essential category first. Every extra kilogram costs energy you will need above 4,000 metres. For a structured training plan that builds load tolerance, see the{' '}
            <Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>8-week Garhwal fitness preparation guide</Link>.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <PrimaryCTA label="Plan My Garhwal Trek" subtext="Tell us your experience level and preferred dates. We will recommend the right route, provide a gear briefing, and handle permits." vertical="trek" category="packing" sourcePath={PATH} />

      {/* ── FAQ ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="pcl-eyebrow"><span className="pcl-eyebrow-line" /><span className="pcl-eyebrow-text">FAQ</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── EXPLORE MORE ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="pcl-eyebrow"><span className="pcl-eyebrow-line" /><span className="pcl-eyebrow-text">Explore More</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Explore More
          </h2>
          <div className="pcl-nav-group">
            <Link href="/treks/garhwal-himalayas" className="pcl-nav-link">All 4 Garhwal Himalaya Treks — Route Overview</Link>
            <Link href="/treks/garhwal-himalayas/fitness-guide" className="pcl-nav-link">8-Week Fitness Preparation Guide</Link>
            <Link href="/treks/brahmatal-vs-kuari-pass" className="pcl-nav-link">Brahmatal vs Kuari Pass — Moderate Comparison</Link>
            <Link href="/treks/roopkund-vs-pangarchulla" className="pcl-nav-link">Roopkund vs Pangarchulla — Challenging Comparison</Link>
            <Link href="/blog/beginner-to-advanced-trek-progression-garhwal" className="pcl-nav-link">Beginner to Advanced Garhwal Progression</Link>
          </div>
        </div>
      </section>

    </TrackedPage>
  );
}
