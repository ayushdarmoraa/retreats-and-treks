import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/treks/roopkund-vs-pangarchulla';

export function generateMetadata(): Metadata {
  return {
    title: 'Roopkund vs Pangarchulla (4,800m vs 4,590m) — Challenging Garhwal Treks Compared | Retreats And Treks',
    description:
      'Roopkund (4,800m, 7 days) vs Pangarchulla (4,590m, 6 days). Difficulty, summit day, season, permits & fitness compared. Which challenging Garhwal Himalaya trek should you attempt first?',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Roopkund vs Pangarchulla — Challenging Garhwal Trek Comparison',
      description:
        'Mystery lake expedition (4,800m) vs peak summit (4,590m). Side-by-side comparison of the two hardest Garhwal treks.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is harder — Roopkund or Pangarchulla?',
    answer:
      'Both are rated challenging, but they are hard in different ways. Roopkund is longer (53 km, 7 days) with sustained altitude above 4,000 m across multiple days. Pangarchulla is shorter (32 km, 6 days) but the summit push involves a steep 700 m climb on a single day with an alpine start at 3 AM. Roopkund tests endurance and altitude tolerance; Pangarchulla tests single-day climbing power and cold-weather stamina. Most experienced trekkers consider the Pangarchulla summit day to be the more technically demanding single effort.',
  },
  {
    question: 'Can I do both treks in one trip?',
    answer:
      'Not practically. Roopkund starts from Lohajung (pre/post-monsoon) and Pangarchulla starts from Joshimath (spring only). The base towns are 6+ hours apart by road and the seasonal windows overlap only in May. Most trekkers do them as separate trips, typically in different years as progression milestones.',
  },
  {
    question: 'Which trek needs more prior experience?',
    answer:
      'Both require prior high-altitude trekking experience above 4,000 m. Pangarchulla additionally requires comfort with early alpine starts, steep snow climbing, and use of crampons. If you have done one challenging Himalayan trek (Kedarkantha in winter, or a similar 3,800+ m route), Roopkund is the logical next step. If you have done Roopkund or equivalent, Pangarchulla is the summit-grade progression.',
  },
  {
    question: 'What is the best season for each?',
    answer:
      'Roopkund: May–June (pre-monsoon) or September–October (post-monsoon). Pangarchulla: March–May only, when consolidated snow supports the summit approach. There is no autumn Pangarchulla season — early snow makes the summit unstable.',
  },
  {
    question: 'Which has better views from the top?',
    answer:
      'Pangarchulla offers a full 360° summit panorama including Nanda Devi, Nanda Ghunti, Dronagiri, and the inner Nanda Devi Sanctuary. Roopkund&apos;s view is dominated by the Trishul massif looming directly above the lake, with Nanda Ghunti to the east. The Pangarchulla summit is the more comprehensive viewpoint; Roopkund is the more dramatic single-image destination (the skeleton lake at 4,800 m).',
  },
  {
    question: 'Do I need a permit for Roopkund in 2025–2026?',
    answer:
      'Yes. Roopkund falls within the Nanda Devi Biosphere Reserve, and trekking requires a forest department permit obtained at the Lohajung check post. As of 2025, individual trekkers must register with an authorised guide or trekking operator — solo unsupported trekking is not permitted on this route. Permit fees are approximately ₹150–600 per person (Indian nationals) depending on the issuing authority. International trekkers pay higher fees. Your trekking operator typically handles permit logistics. Always confirm current permit status before departure, as regulations can change seasonally.',
  },
  {
    question: 'How difficult is the Pangarchulla summit day?',
    answer:
      'The Pangarchulla summit day is the single most demanding day on any standard Garhwal trek. You leave Khullara camp at 3 AM, climb 720 metres of elevation over 4–5 hours through steep consolidated snow and loose scree, reach the 4,590 m summit by mid-morning, and descend the same day. Crampons are mandatory for the final snow slope. The difficulty comes from the combination of altitude (above 4,000 m throughout), steep gradient (sustained 30–40° slopes near the summit), early alpine start in darkness and sub-zero temperatures, and the need to complete the round trip before afternoon weather deteriorates. Prior experience above 4,000 m is essential.',
  },
];

export default function RoopkundVsPangarchullaPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Garhwal Himalayas', url: buildCanonicalUrl('/treks/garhwal-himalayas') },
    { name: 'Roopkund vs Pangarchulla', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

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
          { name: 'Roopkund vs Pangarchulla' },
        ]}
      />

      {/* INTENT TRAIL — discovery cluster reinforcement */}
      <nav aria-label="Discovery trail" className="rvp-trail">
        <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
          Best Treks in Uttarakhand
        </Link>
        {' → '}
        <Link href="/treks/best-treks-in-uttarakhand/challenging" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
          Challenging Treks
        </Link>
        {' → '}
        <span>Roopkund vs Pangarchulla</span>
      </nav>

      <style>{`
        /* ── RVP scoped styles — prefix: rvp- ── */
        .rvp-trail { font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 300; color: #888; line-height: 1.6; margin-bottom: 0.75rem; }
        .rvp-body { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555555; margin: 0; }
        .rvp-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .rvp-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.6; display: inline-block; }
        .rvp-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--color-primary); font-weight: 500; opacity: 0.8; }

        /* Quick-pick cards */
        .rvp-pick { background: #fff; border: 1px solid #eef0ee; border-left: 3px solid var(--color-primary); border-radius: 10px; padding: 1rem 1.25rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; line-height: 1.85; color: #555; transition: box-shadow 0.2s ease; }
        .rvp-pick:hover { box-shadow: 0 4px 16px rgba(15,118,110,0.08); }
        .rvp-pick-label { font-size: 0.55rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-primary); opacity: 0.7; margin-bottom: 0.35rem; }

        /* Table */
        .rvp-table-wrap { overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 10px; background: #ffffff; }
        .rvp-table { width: 100%; border-collapse: collapse; }
        .rvp-table thead tr { border-bottom: 2px solid #e5e7eb; }
        .rvp-table th { font-family: var(--font-geist-sans), sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-primary); opacity: 0.7; padding: 0.75rem 1rem; text-align: left; }
        .rvp-table td { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 300; color: #444; padding: 0.75rem 1rem; border-bottom: 1px solid #f0f0f0; }
        .rvp-table td:first-child { font-weight: 500; color: #111; width: 25%; }
        .rvp-table tbody tr:last-child td { border-bottom: none; }
        .rvp-table tbody tr { transition: background 0.15s ease; }
        .rvp-table tbody tr:hover td { background: #f7f9f7; }

        /* Split cards */
        .rvp-split { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.75rem; }
        .rvp-split-card { background: #ffffff; border: 1px solid #eef0ee; border-top: 2px solid var(--color-primary); border-radius: 10px; padding: 1.25rem; transition: box-shadow 0.2s ease, transform 0.2s ease; }
        .rvp-split-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(15,118,110,0.09); }
        .rvp-split-card h3 { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 500; color: #111; margin: 0 0 0.75rem; letter-spacing: -0.01em; }
        .rvp-split-card p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 300; line-height: 1.85; color: #555; margin: 0 0 0.75rem; }
        .rvp-split-card p:last-child { margin-bottom: 0; }

        /* Season cards */
        .rvp-season { background: #fff; border: 1px solid #eef0ee; border-radius: 10px; padding: 1.25rem 1.5rem; margin-bottom: 1rem; transition: box-shadow 0.2s ease; }
        .rvp-season:hover { box-shadow: 0 4px 16px rgba(15,118,110,0.07); }
        .rvp-season:last-of-type { margin-bottom: 0; }
        .rvp-season-label { font-family: var(--font-geist-sans), sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-primary); opacity: 0.7; margin-bottom: 0.5rem; }
        .rvp-season p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; margin: 0; }

        /* Callout */
        .rvp-callout { background: #f7f9f7; border: 1px solid #eef0ee; border-left: 3px solid var(--color-primary); border-radius: 10px; padding: 1rem 1.25rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; margin-bottom: 1rem; }
        .rvp-callout strong { font-weight: 500; color: #111; }

        /* Progression steps */
        .rvp-steps { display: flex; flex-direction: column; gap: 0; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .rvp-step { display: flex; align-items: flex-start; gap: 1rem; padding: 1rem 1.25rem; border-bottom: 1px solid #f0f0f0; background: #fff; transition: background 0.15s ease; }
        .rvp-step:last-child { border-bottom: none; }
        .rvp-step:hover { background: #f7f9f7; }
        .rvp-step-num { flex-shrink: 0; width: 1.6rem; height: 1.6rem; border-radius: 50%; background: var(--color-primary); color: #fff; font-family: var(--font-geist-sans), sans-serif; font-size: 0.7rem; font-weight: 600; display: flex; align-items: center; justify-content: center; margin-top: 0.1rem; }
        .rvp-step-body { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; }
        .rvp-step-body strong { font-weight: 500; color: #111; }

        /* Choose-if grid */
        .rvp-choose-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .rvp-choose-card { background: #ffffff; border: 1px solid #eef0ee; border-top: 2px solid var(--color-primary); border-radius: 10px; padding: 1.25rem; }
        .rvp-choose-card h3 { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 600; color: #111; margin: 0 0 0.85rem; letter-spacing: -0.01em; }
        .rvp-choose-card ul { margin: 0; padding: 0; list-style: none; }
        .rvp-choose-card ul li { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 300; line-height: 1.85; color: #555; padding: 0.2rem 0 0.2rem 1.1rem; position: relative; border-bottom: 1px solid #f7f9f7; }
        .rvp-choose-card ul li:last-child { border-bottom: none; }
        .rvp-choose-card ul li::before { content: '→'; position: absolute; left: 0; color: var(--color-primary); opacity: 0.5; font-size: 0.75rem; }

        /* Nav */
        .rvp-nav-group { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .rvp-nav-link { display: flex; align-items: center; justify-content: space-between; padding: 0.9rem 1.1rem; border-bottom: 1px solid #f0f0f0; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #333; text-decoration: none; transition: background 0.15s ease, color 0.15s ease; }
        .rvp-nav-link:hover { background: #f7f9f7; color: var(--color-primary); }
        .rvp-nav-link::after { content: '→'; color: var(--color-primary); opacity: 0.5; }
        .rvp-nav-group .rvp-nav-link:last-child { border-bottom: none; }

        @media (max-width: 700px) {
          .rvp-split { grid-template-columns: 1fr; }
          .rvp-choose-grid { grid-template-columns: 1fr; }
          .rvp-table th:nth-child(3), .rvp-table td:nth-child(3) { display: none; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="rvp-eyebrow"><span className="rvp-eyebrow-line" /><span className="rvp-eyebrow-text">Trek Comparison · Challenging · Garhwal Himalayas</span></div>
          <h1 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.035em', color: '#111111', lineHeight: 1.1, margin: '0 0 1.75rem' }}>
            Roopkund vs Pangarchulla: Which Challenging Garhwal Trek Is Right for You?
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div className="rvp-pick">
              <div className="rvp-pick-label">Mystery Lake Expedition · 7 days · 4,800 m · May–Jun, Sep–Oct</div>
              <span style={{ fontWeight: 500, color: '#111' }}><Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund Trek</Link></span>{' '}
              <span style={{ fontWeight: 300 }}>— Sustained high-altitude expedition. Glacial skeleton lake, Bedni Bugyal, Trishul views.</span>
            </div>
            <div className="rvp-pick">
              <div className="rvp-pick-label">Summit Climb · 6 days · 4,590 m · Mar–May only</div>
              <span style={{ fontWeight: 500, color: '#111' }}><Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Pangarchulla Peak</Link></span>{' '}
              <span style={{ fontWeight: 300 }}>— Concentrated summit push. 3 AM alpine start, crampons, 360° Nanda Devi Sanctuary panorama.</span>
            </div>
          </div>
          <p className="rvp-body" style={{ marginBottom: '1rem' }}>
            If you have completed moderate treks like{' '}
            <Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>the Brahmatal or Kuari Pass routes</Link>{' '}
            and are ready to step into challenging territory, the{' '}
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Garhwal trekking region</Link>{' '}
            offer two outstanding options: the{' '}
            <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund mystery lake expedition</Link>{' '}
            and the{' '}
            <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Pangarchulla Peak summit climb</Link>.
          </p>
          <p className="rvp-body">
            Both are rated challenging, both exceed 4,500 metres, and both demand prior high-altitude experience. But they test different skills, occur in different seasons, and deliver fundamentally different types of mountain achievement. This comparison helps you decide which challenge matches your experience and ambition. For the full range of routes from easy to expedition-grade, see our{' '}
            <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Uttarakhand trekking guide</Link>.
          </p>
        </div>
      </section>

      {/* ── AT A GLANCE TABLE ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="rvp-eyebrow"><span className="rvp-eyebrow-line" /><span className="rvp-eyebrow-text">At a Glance</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            At a Glance
          </h2>
          <div className="rvp-table-wrap">
            <table className="rvp-table">
              <thead><tr><th></th><th>Roopkund</th><th>Pangarchulla</th></tr></thead>
              <tbody>
                {[
                  { f: 'Base Town',     r: <><Link href="/treks/location/lohajung" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Lohajung</Link> (2,350 m)</>, p: <><Link href="/treks/location/joshimath" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Joshimath</Link> (1,875 m)</> },
                  { f: 'Max Altitude',  r: '4,800 m',                          p: '4,590 m' },
                  { f: 'Distance',      r: '53 km',                            p: '32 km' },
                  { f: 'Duration',      r: '7 days',                           p: '6 days' },
                  { f: 'Difficulty',    r: 'Challenging',                      p: 'Challenging' },
                  { f: 'Best Season',   r: 'May–Jun, Sep–Oct',                 p: 'Mar–May' },
                  { f: 'Type',          r: 'Expedition (lake destination)',     p: 'Summit climb (peak)' },
                  { f: 'Special Gear',  r: 'Standard high-altitude kit',       p: 'Crampons, gaiters required' },
                ].map((row, i) => (
                  <tr key={i}><td>{row.f}</td><td>{row.r}</td><td>{row.p}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA 1 ── */}
      <PrimaryCTA label="Help Me Choose" subtext="Share your experience level and dates. We will recommend the right challenging trek." vertical="trek" category="comparison" sourcePath="/treks/roopkund-vs-pangarchulla" />

      {/* ── EXPERIENCE COMPARISON ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="rvp-eyebrow"><span className="rvp-eyebrow-line" /><span className="rvp-eyebrow-text">What You Will Experience</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            The Experience: Expedition vs Summit
          </h2>
          <div className="rvp-split">
            <div className="rvp-split-card">
              <img src="/Images/trek/region/roopkund_lake.webp" alt="Roopkund glacial lake high altitude expedition" loading="lazy" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px', marginBottom: '1rem', display: 'block' }} />
              <h3>Roopkund — The Mystery Lake Expedition</h3>
              <p>Roopkund is a journey trek. The destination — the glacial lake at 4,800 metres with its mysterious ancient skeletal remains — is the goal, but the route itself is rich in terrain transitions. You cross Bedni Bugyal (one of India&apos;s largest alpine meadows), ascend through exposed high-altitude moraine, and navigate terrain that changes character every day.</p>
              <p>The challenge is cumulative: day after day above 3,500 metres. Roopkund tests endurance, altitude tolerance, and the ability to maintain morale across a week-long expedition in remote terrain. The final approach to the lake is steep and exposed but not technical.</p>
            </div>
            <div className="rvp-split-card">
              <img src="/Images/trek/region/pangarchulla.webp" alt="Pangarchulla summit climb steep snow alpine" loading="lazy" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px', marginBottom: '1rem', display: 'block' }} />
              <h3>Pangarchulla — The Summit Climb</h3>
              <p>Pangarchulla is a peak trek. The first three days follow the scenic but non-technical Kuari Pass approach through forests and meadows. Then it diverges. Day five is summit day: a 3 AM alpine start from Khullara camp, a 700-metre climb through steep snow and scree, and arrival on a narrow peak with 360° views of the Nanda Devi Sanctuary.</p>
              <p>The challenge is concentrated. You use crampons. You carry a headlamp. You push through physical limits. The reward — standing on a true summit — is a fundamentally different feeling from reaching a lake or a pass.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FITNESS & PREPARATION ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="rvp-eyebrow"><span className="rvp-eyebrow-line" /><span className="rvp-eyebrow-text">Fitness Required</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Fitness &amp; Preparation Requirements
          </h2>
          <div className="rvp-split">
            <div className="rvp-split-card">
              <h3>For Roopkund — Build Stamina</h3>
              <p>6–8 weeks of structured preparation. Daily cardio (running, cycling, or swimming) for cardiovascular base. Weekend hill hikes with a 10–12 kg pack for trail-specific conditioning. Core strength work for stability on uneven terrain.</p>
              <p>The seven-day duration means your body must sustain effort across multiple consecutive days at altitude — <strong style={{ fontWeight: 500, color: '#111' }}>stamina matters more than peak power.</strong></p>
            </div>
            <div className="rvp-split-card">
              <h3>For Pangarchulla — Build Power</h3>
              <p>6–8 weeks of preparation with emphasis on explosive climbing power. Stairmaster sessions, hill repeats, and loaded pack training for the summit day. Single-day fitness matters more than multi-day stamina — you need to climb 700 metres in 4–5 hours at altitude after a 3 AM start.</p>
              <p><strong style={{ fontWeight: 500, color: '#111' }}>If you can power-hike 1,000 m elevation gain in under 3 hours at sea level with a pack, you are ready.</strong></p>
            </div>
          </div>
          <div className="rvp-callout">
            <strong>Prior experience requirement for both:</strong> At least one completed trek above 4,000 metres. Comfort with cold-weather camping (sub-zero temperatures). Mental readiness for sustained physical exertion in thin air. If you have completed{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal</Link>{' '}
            or{' '}
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kuari Pass</Link>,
            you have the altitude foundation — but both Roopkund and Pangarchulla require a meaningful step up in fitness and commitment.
          </div>
        </div>
      </section>

      {/* ── ALTITUDE SAFETY ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="rvp-eyebrow"><span className="rvp-eyebrow-line" /><span className="rvp-eyebrow-text">Altitude &amp; Safety</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            Altitude &amp; Safety Considerations
          </h2>
          <p className="rvp-body" style={{ marginBottom: '1.75rem' }}>
            Both treks operate well above 4,000 metres where Acute Mountain Sickness (AMS) risk is real:
          </p>
          <div className="rvp-split">
            <div className="rvp-split-card">
              <h3>Roopkund (4,800 m) — Gradual but High</h3>
              <p>The highest point in this comparison. You spend 2–3 days above 4,000 metres, which gives AMS more opportunity to develop. The altitude gain is gradual across the seven-day itinerary, which helps — but the final push to the lake at 4,800 m is the critical zone.</p>
              <p>Guided operators carry pulse oximeters and follow descent protocols if symptoms appear.</p>
            </div>
            <div className="rvp-split-card">
              <h3>Pangarchulla (4,590 m) — Rapid Single-Day Gain</h3>
              <p>Lower maximum altitude, but the summit push involves rapid altitude gain on a single day (Khullara camp at ~3,870 m to summit at 4,590 m). The acclimatisation profile depends heavily on the rest day at Khullara.</p>
              <p>The combination of altitude, cold, and extreme exertion on summit day creates a unique physiological stress.</p>
            </div>
          </div>
          <div className="rvp-callout">
            <strong>Both treks:</strong> Diamox prophylaxis may be recommended by your physician. Hydration (3–4 litres daily above 3,500 m), gradual ascent, and willingness to turn back if symptoms worsen are non-negotiable safety principles. Choose guided operators with certified trek leaders and emergency communication equipment.
          </div>
        </div>
      </section>

      {/* ── CTA 2 ── */}
      <PrimaryCTA label="Plan My Challenging Trek" subtext="Experienced trekker? Tell us your altitude history and we will recommend the right route." vertical="trek" category="comparison" sourcePath="/treks/roopkund-vs-pangarchulla" />

      {/* ── SEASONAL WINDOWS ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="rvp-eyebrow"><span className="rvp-eyebrow-line" /><span className="rvp-eyebrow-text">When to Go</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Season &amp; Weather
          </h2>
          <div className="rvp-season">
            <div className="rvp-season-label">Roopkund · Two Windows</div>
            <p><strong style={{ fontWeight: 500, color: '#111' }}>Pre-monsoon (May–June)</strong> offers warmer conditions but more afternoon cloud. <strong style={{ fontWeight: 500, color: '#111' }}>Post-monsoon (September–October)</strong> delivers sharper visibility and fewer trekkers. The monsoon gap (July–August) makes Roopkund entirely unavailable for a quarter of the year.</p>
          </div>
          <div className="rvp-season">
            <div className="rvp-season-label">Pangarchulla · Single Window — March to May Only</div>
            <p>March and early April offer consolidated snow for the summit — the best conditions for crampon grip. Late April and May are warmer but the snow line rises, potentially exposing loose scree on the summit approach. The trek is not viable in monsoon, post-monsoon, or winter.</p>
          </div>
          <div className="rvp-season" style={{ marginTop: '1rem' }}>
            <div className="rvp-season-label">Overlap · May Only</div>
            <p>May is the only month where both are available. If you have a fixed May window and are deciding between them, the choice reduces to: do you want a week-long expedition to a mystery lake, or a summit climb with a concentrated challenge?</p>
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD CHOOSE WHICH ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="rvp-eyebrow"><span className="rvp-eyebrow-line" /><span className="rvp-eyebrow-text">Decision Guide</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Who Should Choose Which
          </h2>
          <div className="rvp-choose-grid">
            <div className="rvp-choose-card">
              <h3>Choose Roopkund if:</h3>
              <ul>
                <li>You want an extended expedition experience (7 days on trail)</li>
                <li>You are drawn to iconic destinations (the mystery lake)</li>
                <li>Your fitness favours sustained endurance over explosive power</li>
                <li>You prefer pre-monsoon or post-monsoon seasons</li>
                <li>You have completed at least one trek above 4,000 m</li>
              </ul>
            </div>
            <div className="rvp-choose-card">
              <h3>Choose Pangarchulla if:</h3>
              <ul>
                <li>You want a true summit experience (standing on a peak)</li>
                <li>You thrive on concentrated, high-intensity challenges</li>
                <li>You are comfortable with crampons, alpine starts, and steep snow</li>
                <li>You prefer a spring trekking window (March–May)</li>
                <li>You have completed Kuari Pass or equivalent and want the next step</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRESSION PATH ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="rvp-eyebrow"><span className="rvp-eyebrow-line" /><span className="rvp-eyebrow-text">The Garhwal Ladder</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            The Garhwal Progression
          </h2>
          <p className="rvp-body" style={{ marginBottom: '1.75rem' }}>
            Both Roopkund and Pangarchulla sit at the top of the Garhwal difficulty spectrum. The natural progression for most trekkers through the region looks like this:
          </p>
          <div className="rvp-steps">
            <div className="rvp-step">
              <div className="rvp-step-num">1</div>
              <div className="rvp-step-body"><strong><Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Brahmatal</Link></strong> (Moderate, 3,850 m) — winter snow trek introduction</div>
            </div>
            <div className="rvp-step">
              <div className="rvp-step-num">2</div>
              <div className="rvp-step-body"><strong><Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Kuari Pass</Link></strong> (Moderate, 3,876 m) — panoramic ridge walk</div>
            </div>
            <div className="rvp-step">
              <div className="rvp-step-num">3</div>
              <div className="rvp-step-body"><strong><Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Roopkund</Link></strong> (Challenging, 4,800 m) — extended high-altitude expedition</div>
            </div>
            <div className="rvp-step">
              <div className="rvp-step-num">4</div>
              <div className="rvp-step-body"><strong><Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Pangarchulla</Link></strong> (Challenging, 4,590 m) — true summit experience</div>
            </div>
          </div>
          <p className="rvp-body" style={{ marginTop: '1.25rem' }}>
            You do not need to follow this order rigidly, but each trek builds skills and altitude confidence that the next one demands. See our{' '}
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Garhwal Himalayas trekking guide</Link>{' '}
            for the full picture.
          </p>
        </div>
      </section>

      {/* ── CTA 3 ── */}
      <PrimaryCTA label="Plan My Trek" subtext="Share your altitude history and preferred dates. We will recommend the right route." vertical="trek" category="comparison" sourcePath="/treks/roopkund-vs-pangarchulla" />

      {/* ── FAQ ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="rvp-eyebrow"><span className="rvp-eyebrow-line" /><span className="rvp-eyebrow-text">FAQ</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── EXPLORE MORE ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="rvp-eyebrow"><span className="rvp-eyebrow-line" /><span className="rvp-eyebrow-text">Explore More</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Explore More
          </h2>
          <div className="rvp-nav-group">
            <Link href="/treks/best-treks-in-uttarakhand" className="rvp-nav-link">Best Treks in Uttarakhand — Complete Guide</Link>
            <Link href="/treks/best-treks-in-uttarakhand/challenging" className="rvp-nav-link">Challenging Treks in Uttarakhand</Link>
            <Link href="/treks/best-treks-in-uttarakhand/high-altitude" className="rvp-nav-link">High-Altitude Treks Above 4,000 m</Link>
            <Link href="/treks/garhwal-himalayas" className="rvp-nav-link">Garhwal Himalayas Trekking Guide</Link>
            <Link href="/treks/garhwal-himalayas/fitness-guide" className="rvp-nav-link">8-Week Fitness Preparation Plan</Link>
            <Link href="/treks/garhwal-himalayas/packing-checklist" className="rvp-nav-link">Packing Checklist — Print-Ready Gear List</Link>
            <Link href="/treks/brahmatal-vs-kuari-pass" className="rvp-nav-link">Moderate Garhwal Treks: Brahmatal vs Kuari Pass</Link>
            <Link href="/treks/location/lohajung" className="rvp-nav-link">All treks from Lohajung</Link>
            <Link href="/treks/location/joshimath" className="rvp-nav-link">All treks from Joshimath</Link>
            <Link href="/treks/summer-treks-uttarakhand" className="rvp-nav-link">Summer Treks in Uttarakhand</Link>
            <Link href="/treks/best-treks-in-uttarakhand" className="rvp-nav-link">Best Treks in Uttarakhand</Link>
          </div>
        </div>
      </section>

    </TrackedPage>
  );
}
