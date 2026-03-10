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

const PATH = '/treks/kedarkantha-vs-har-ki-dun';

export function generateMetadata(): Metadata {
  return {
    title: 'Kedarkantha vs Har Ki Dun: Which Trek Should You Choose? | Retreats And Treks',
    description:
      'Kedarkantha vs Har Ki Dun — a practical comparison of the two most popular treks from Sankri. Summit vs valley, winter vs summer, 4-day vs 6-day. Choose the right trek for your experience level.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Kedarkantha vs Har Ki Dun — Which Trek Is Right for You?',
      description:
        'Compare Kedarkantha and Har Ki Dun treks from Sankri. Snow summit vs green valley. Winter vs summer. Difficulty, duration, and who should choose which.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which trek is easier — Kedarkantha or Har Ki Dun?',
    answer:
      'Kedarkantha is easier on a per-day basis. Daily distances are shorter (5 to 6 km), the total duration is four days, and the only physically demanding section is the summit push on day three. Har Ki Dun is easier in terms of altitude and terrain — no summit, no steep ascent — but the total distance is longer (40 km over six days). If you define "easier" as less total effort, Kedarkantha wins. If you define it as less intense on any single day, Har Ki Dun wins.',
  },
  {
    question: 'Is Kedarkantha better in winter?',
    answer:
      'Yes. Kedarkantha is specifically a winter trek. The trail is at its most spectacular from December to March when snow covers the forest, meadows, and summit ridge. The panorama from the 3,800-metre peak is sharpest in winter due to cold, clear air. Summer Kedarkantha (May) offers a hybrid green-and-snow experience but lacks the full snow immersion that defines the trek. If you are choosing Kedarkantha, choose it in winter.',
  },
  {
    question: 'Is Har Ki Dun suitable for beginners?',
    answer:
      'Yes, with moderate fitness. Har Ki Dun requires the ability to walk six to eight kilometres per day for five to six consecutive days on uneven terrain. There are no technical sections, no summit push, and no altitude concerns (maximum 3,600 metres). The challenge is sustained effort over multiple days rather than single-day intensity. If you can walk comfortably for five to six hours per day with a daypack, you have the fitness for Har Ki Dun.',
  },
  {
    question: 'Which trek is more scenic?',
    answer:
      'Both are exceptionally scenic but in different ways. Kedarkantha delivers concentrated drama — snow-laden forest, alpine meadows, and a 360-degree summit panorama across six Himalayan ranges. It peaks on summit morning and that single view is unforgettable. Har Ki Dun delivers sustained beauty — five days of changing landscape from forest to village to meadow to glacial valley. The scenery builds progressively and the Har Ki Dun valley itself is one of the most spectacular natural amphitheatres in the Himalayas. Kedarkantha for one defining moment. Har Ki Dun for a week of visual richness.',
  },
  {
    question: 'Can both treks be done by first-time trekkers?',
    answer:
      'Yes. Both are classified as beginner-to-moderate and are regularly completed by first-time Himalayan trekkers. Kedarkantha is the more common first trek — shorter duration, structured progression, and the summit reward is highly motivating. Har Ki Dun requires more sustained fitness but no technical skill. For a first trek, Kedarkantha is the stronger recommendation due to its shorter commitment and clearer objective. For a second trek, Har Ki Dun is the natural follow-up.',
  },
];

export default function KedarkanthaVsHarKiDunPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Kedarkantha vs Har Ki Dun', url: canonicalUrl },
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
          { name: 'Kedarkantha vs Har Ki Dun' },
        ]}
      />

      {/* INTENT TRAIL — discovery cluster reinforcement */}
      <nav aria-label="Discovery trail" className="kvh-trail">
        <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
          Best Treks in Uttarakhand
        </Link>
        {' → '}
        <Link href="/treks/best-treks-in-uttarakhand/snow" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
          Snow Treks
        </Link>
        {' → '}
        <span>Kedarkantha vs Har Ki Dun</span>
      </nav>

      <style>{`
        /* ── KVH scoped styles — prefix: kvh- ── */
        .kvh-trail { font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 300; color: #888; line-height: 1.6; margin-bottom: 0.75rem; }
        .kvh-body { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555555; margin: 0; }
        .kvh-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .kvh-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; display: inline-block; }
        .kvh-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--color-primary); font-weight: 500; opacity: 0.7; }

        .kvh-pick { background: #fff; border: 1px solid #eef0ee; border-left: 3px solid var(--color-primary); border-radius: 10px; padding: 1rem 1.25rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; line-height: 1.85; color: #555; transition: box-shadow 0.2s ease; }
        .kvh-pick:hover { box-shadow: 0 4px 16px rgba(15,118,110,0.08); }
        .kvh-pick-label { font-size: 0.55rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-primary); opacity: 0.7; margin-bottom: 0.35rem; }

        .kvh-table-wrap { overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 10px; background: #ffffff; }
        .kvh-table { width: 100%; border-collapse: collapse; }
        .kvh-table thead tr { border-bottom: 2px solid #e5e7eb; }
        .kvh-table th { font-family: var(--font-geist-sans), sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-primary); opacity: 0.7; padding: 0.75rem 1rem; text-align: left; }
        .kvh-table td { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 300; color: #444; padding: 0.75rem 1rem; border-bottom: 1px solid #f0f0f0; }
        .kvh-table td:first-child { font-weight: 500; color: #111; }
        .kvh-table tbody tr:last-child td { border-bottom: none; }
        .kvh-table tbody tr { transition: background 0.15s ease; }
        .kvh-table tbody tr:hover td { background: #f7f9f7; }

        .kvh-split { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.75rem; }
        .kvh-split-card { background: #ffffff; border: 1px solid #eef0ee; border-top: 2px solid var(--color-primary); border-radius: 10px; padding: 1.25rem; transition: box-shadow 0.2s ease, transform 0.2s ease; }
        .kvh-split-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(15,118,110,0.09); }
        .kvh-split-card h3 { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 500; color: #111; margin: 0 0 0.75rem; letter-spacing: -0.01em; }
        .kvh-split-card p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 300; line-height: 1.85; color: #555; margin: 0; }

        .kvh-season { background: #fff; border: 1px solid #eef0ee; border-radius: 10px; padding: 1.25rem 1.5rem; margin-bottom: 1rem; transition: box-shadow 0.2s ease; }
        .kvh-season:hover { box-shadow: 0 4px 16px rgba(15,118,110,0.07); }
        .kvh-season:last-of-type { margin-bottom: 0; }
        .kvh-season-label { font-family: var(--font-geist-sans), sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-primary); opacity: 0.7; margin-bottom: 0.5rem; }
        .kvh-season p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; margin: 0; }

        .kvh-choose-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.75rem; }
        .kvh-choose-card { background: #ffffff; border: 1px solid #eef0ee; border-top: 2px solid var(--color-primary); border-radius: 10px; padding: 1.25rem; }
        .kvh-choose-card h3 { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 600; color: #111; margin: 0 0 0.85rem; letter-spacing: -0.01em; }
        .kvh-choose-card ul { margin: 0; padding: 0; list-style: none; }
        .kvh-choose-card ul li { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 300; line-height: 1.85; color: #555; padding: 0.2rem 0 0.2rem 1.1rem; position: relative; border-bottom: 1px solid #f7f9f7; }
        .kvh-choose-card ul li:last-child { border-bottom: none; }
        .kvh-choose-card ul li::before { content: '→'; position: absolute; left: 0; color: var(--color-primary); opacity: 0.5; font-size: 0.75rem; }

        .kvh-nav-block { background: #f7f9f7; border: 1px solid #e5e7eb; border-left: 3px solid var(--color-primary); border-radius: 10px; padding: 1.25rem 1.5rem; }
        .kvh-nav-block p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; margin: 0; }
        .kvh-nav-link { display: flex; align-items: center; justify-content: space-between; padding: 0.9rem 1.1rem; border-bottom: 1px solid #f0f0f0; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #333; text-decoration: none; transition: background 0.15s ease, color 0.15s ease; }
        .kvh-nav-link:hover { background: #f7f9f7; color: var(--color-primary); }
        .kvh-nav-link::after { content: '→'; color: var(--color-primary); opacity: 0.5; }
        .kvh-nav-group { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .kvh-nav-group .kvh-nav-link:last-child { border-bottom: none; }

        @media (max-width: 700px) {
          .kvh-split { grid-template-columns: 1fr; }
          .kvh-choose-grid { grid-template-columns: 1fr; }
          .kvh-table th:nth-child(3), .kvh-table td:nth-child(3) { display: none; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="kvh-eyebrow"><span className="kvh-eyebrow-line" /><span className="kvh-eyebrow-text">Trek Comparison · Sankri, Uttarakhand</span></div>
          <h1 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.035em', color: '#111111', lineHeight: 1.1, margin: '0 0 1.75rem' }}>
            Kedarkantha vs Har Ki Dun: Which Trek Should You Choose?
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div className="kvh-pick">
              <div className="kvh-pick-label">Snow Summit · 4 days · Dec–Mar</div>
              <span style={{ fontWeight: 500, color: '#111' }}><Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kedarkantha Trek</Link></span>{' '}
              <span style={{ fontWeight: 300 }}>— 3,800 m summit with 360° Himalayan panorama. First-time snow trekkers.</span>
            </div>
            <div className="kvh-pick">
              <div className="kvh-pick-label">Valley Journey · 6 days · Apr–Jun, Sep–Nov</div>
              <span style={{ fontWeight: 500, color: '#111' }}><Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Har Ki Dun Trek</Link></span>{' '}
              <span style={{ fontWeight: 300 }}>— Glacial valley, ancient villages, wildflower meadows. Sustained summer walking.</span>
            </div>
          </div>
          <p className="kvh-body">
            Both treks start from the same place —{' '}
            <Link href="/treks/location/sankri" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Sankri trek base</Link>,
            the primary trek base in Uttarakhand&apos;s Tons Valley. Both are among the most popular Himalayan treks in India. And both are accessible to first-time trekkers. But the experience they deliver is fundamentally different: the{' '}
            <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kedarkantha Trek</Link>{' '}
            is a snow summit, while the{' '}
            <Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Har Ki Dun Trek</Link>{' '}
            is a green valley journey. One is a four-day sprint to a peak, the other is a six-day walk through a glacial corridor. Choosing between them is not about which is better — it is about which is right for you. Both are featured in our{' '}
            <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>top trekking routes in Uttarakhand</Link>.
          </p>
        </div>
      </section>

      {/* ── QUICK COMPARISON TABLE ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="kvh-eyebrow"><span className="kvh-eyebrow-line" /><span className="kvh-eyebrow-text">At a Glance</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Quick Comparison Overview
          </h2>
          <div className="kvh-table-wrap">
            <table className="kvh-table">
              <thead><tr><th>Factor</th><th>Kedarkantha</th><th>Har Ki Dun</th></tr></thead>
              <tbody>
                {[
                  { f: 'Type',         k: 'Summit trek',          h: 'Valley trek' },
                  { f: 'Duration',     k: '4–5 days',             h: '6–7 days' },
                  { f: 'Max Altitude', k: '~3,800 m',             h: '~3,600 m' },
                  { f: 'Best Season',  k: 'Winter (Dec–Mar)',      h: 'Summer (May–Jun)' },
                  { f: 'Difficulty',   k: 'Moderate-beginner',    h: 'Moderate' },
                  { f: 'Landscape',    k: 'Snow summit + forest', h: 'River valley + meadows' },
                  { f: 'Base',         k: 'Sankri',               h: 'Sankri' },
                ].map((r, i) => <tr key={i}><td>{r.f}</td><td>{r.k}</td><td>{r.h}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── LANDSCAPE & EXPERIENCE ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="kvh-eyebrow"><span className="kvh-eyebrow-line" /><span className="kvh-eyebrow-text">What You Will See</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Landscape &amp; Experience
          </h2>
          <div className="kvh-split">
            <div className="kvh-split-card">
              <img src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=600&q=80&fit=crop" alt="Kedarkantha summit snow trail" loading="lazy" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px', marginBottom: '1rem', display: 'block' }} />
              <h3><Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Kedarkantha</Link></h3>
              <p>A concentrated experience that builds to a single defining moment. The{' '}<Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kedarkantha Trek</Link>{' '}rises through dense pine and oak forest — silent and snow-covered in winter — crosses open alpine meadows, and ascends a final ridge to a 3,800-metre summit. The panorama from the top spans Swargarohini, Bandarpoonch, Black Peak, and the Gangotri group. On a clear winter morning, that summit view is the single most spectacular sight available on any beginner trek in India. The trek is four days, but the defining moment is twenty minutes on the peak.</p>
            </div>
            <div className="kvh-split-card">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fit=crop" alt="Har Ki Dun green valley trail" loading="lazy" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px', marginBottom: '1rem', display: 'block' }} />
              <h3><Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Har Ki Dun</Link></h3>
              <p>A sustained experience that deepens over five to six days. The{' '}<Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Har Ki Dun Trek</Link>{' '}follows the ancient Tons Valley through traditional Himalayan villages, across wooden bridges over glacial rivers, through dense forest and open meadow, and into the vast Har Ki Dun valley — a natural amphitheatre surrounded by 5,000-metre peaks. There is no single peak moment. Instead, the beauty accumulates — each day&apos;s landscape is different from the last, and the valley itself, when you finally reach it, feels earned. If Kedarkantha is a photograph, Har Ki Dun is a film.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIFFICULTY & FITNESS ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="kvh-eyebrow"><span className="kvh-eyebrow-line" /><span className="kvh-eyebrow-text">Effort Required</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Difficulty &amp; Fitness Level
          </h2>
          <div className="kvh-split">
            <div className="kvh-split-card">
              <h3>Kedarkantha — Burst Effort</h3>
              <p><strong style={{ fontWeight: 500, color: '#111' }}>Kedarkantha</strong> demands burst effort. Three days of moderate forest walking (5 to 6 km per day) followed by a summit push — a steep 800-metre ascent in snow conditions, typically starting before dawn. The summit day is the hardest single day on either trek. But the overall commitment is shorter: four days total. If you are moderately fit and can handle one hard day, Kedarkantha is within reach. Snow adds a factor — microspikes, gaiters, and careful footing — but guided groups manage the technical elements.</p>
            </div>
            <div className="kvh-split-card">
              <h3>Har Ki Dun — Sustained Endurance</h3>
              <p><strong style={{ fontWeight: 500, color: '#111' }}>Har Ki Dun</strong> demands sustained endurance. Daily distances average 7 to 8 km over six days. No single day is as intense as Kedarkantha&apos;s summit push, but the cumulative load is higher. By day four or five, fatigue compresses — your legs know they have been walking. The terrain is gentler — no steep summit ascent, no snow gear in summer — but the duration tests a different kind of fitness: consistency over days, not intensity on one day.</p>
            </div>
          </div>
          <p className="kvh-body">
            Both are accessible to{' '}
            <Link href="/treks/beginner-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>beginner treks in Uttarakhand</Link>.
            The preparation is the same: two to three weeks of daily cardio — walking, jogging, stair climbing. The difference is what kind of challenge you prefer. Short and sharp, or long and steady.
          </p>
        </div>
      </section>

      {/* ── BEST SEASON ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="kvh-eyebrow"><span className="kvh-eyebrow-line" /><span className="kvh-eyebrow-text">When to Go</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            Best Season — Winter vs Summer
          </h2>
          <p className="kvh-body" style={{ marginBottom: '1.75rem' }}>
            This is the deciding factor for many trekkers. The two treks occupy opposite seasonal windows — and each is at its best in that window.
          </p>
          <div className="kvh-season">
            <div className="kvh-season-label">Kedarkantha · December to March</div>
            <p>This is a{' '}<Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>winter treks in Uttarakhand</Link>. The trail is snow-covered, the forest is silent and white, and the summit panorama is sharpest in cold, clear winter air. Kedarkantha in summer (May) is possible but loses the snow immersion that defines the experience. If you are choosing Kedarkantha, choose December to February for the definitive version.</p>
          </div>
          <div className="kvh-season">
            <div className="kvh-season-label">Har Ki Dun · April–June &amp; September–November</div>
            <p>This is a{' '}<Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>summer treks in Uttarakhand</Link>. The valley is green, wildflowers blanket the meadows, the river runs clear, and the trail is dry and comfortable. Har Ki Dun in winter is spectacular but more demanding — snow-covered trails, colder temperatures, limited guided availability. Summer is when Har Ki Dun is most accessible and most beautiful.</p>
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD CHOOSE WHICH ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="kvh-eyebrow"><span className="kvh-eyebrow-line" /><span className="kvh-eyebrow-text">Decision Guide</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Who Should Choose Which?
          </h2>
          <div className="kvh-choose-grid">
            <div className="kvh-choose-card">
              <h3>Choose Kedarkantha if:</h3>
              <ul>
                <li>You want to stand on a Himalayan summit</li>
                <li>You want a snow trek experience</li>
                <li>You have 4 to 5 days available</li>
                <li>You are a first-time snow trekker seeking a guided format</li>
                <li>You prefer concentrated intensity over sustained walking</li>
                <li>You are trekking between December and March</li>
              </ul>
            </div>
            <div className="kvh-choose-card">
              <h3>Choose Har Ki Dun if:</h3>
              <ul>
                <li>You prefer valleys, rivers, and meadows over summit views</li>
                <li>You enjoy longer, immersive walks through changing landscape</li>
                <li>You want summer greenery and wildflowers</li>
                <li>You dislike extreme cold or snow conditions</li>
                <li>You have 6 to 7 days available</li>
                <li>You are trekking between April and June or September and November</li>
              </ul>
            </div>
          </div>
          <p className="kvh-body">
            Both treks leave from{' '}
            <Link href="/treks/location/sankri" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Sankri trek base</Link>.
            If you have the time, the strongest recommendation is to do both — Kedarkantha in winter, Har Ki Dun in summer. They are complementary experiences from the same base, and together they give you the full range of what Himalayan trekking offers.
          </p>
        </div>
      </section>

      {/* ── COMMERCIAL NAVIGATION ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="kvh-eyebrow"><span className="kvh-eyebrow-line" /><span className="kvh-eyebrow-text">Explore More</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.5rem' }}>
            Browse by Category
          </h2>
          <div className="kvh-nav-block" style={{ marginBottom: '1.5rem' }}>
            <p>
              Looking for more options? See the{' '}
              <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>complete guide to Uttarakhand treks</Link>, the{' '}
              <Link href="/treks/best-treks-in-uttarakhand/snow" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>snow treks filter</Link>{' '}
              for winter routes, or browse the full{' '}
              <Link href="/treks" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Himalayan treks directory</Link>{' '}
              for guided itineraries across all seasons.
            </p>
          </div>
          <div className="kvh-nav-group">
            <Link href="/treks/location/sankri/kedarkantha-trek" className="kvh-nav-link">Kedarkantha Trek — Full Route Details</Link>
            <Link href="/treks/location/sankri/har-ki-dun-trek" className="kvh-nav-link">Har Ki Dun Trek — Full Route Details</Link>
            <Link href="/treks/best-treks-in-uttarakhand/snow" className="kvh-nav-link">Snow Treks in Uttarakhand</Link>
            <Link href="/treks/best-treks-in-uttarakhand/beginner" className="kvh-nav-link">Beginner Treks in Uttarakhand</Link>
            <Link href="/treks/best-treks-in-uttarakhand" className="kvh-nav-link">All 10 Best Treks in Uttarakhand</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="kvh-eyebrow"><span className="kvh-eyebrow-line" /><span className="kvh-eyebrow-text">FAQ</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

    </TrackedPage>
  );
}
