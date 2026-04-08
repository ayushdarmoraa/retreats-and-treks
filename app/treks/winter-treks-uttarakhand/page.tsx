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

const PATH = '/treks/best-treks-in-uttarakhand/beginner';
const PARENT_PATH = '/treks/best-treks-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Beginner Treks in Uttarakhand (2025) — Easy & Moderate Routes',
    description:
      'The 5 best beginner-friendly treks in Uttarakhand ranked by difficulty. From easy day hikes in Chakrata to moderate multi-day routes in Garhwal — no prior trekking experience needed.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
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

const BREADCRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Treks', href: '/treks' },
  { name: 'Best Treks in Uttarakhand', href: PARENT_PATH },
  { name: 'Beginner Treks' },
];

export default function BeginnerTreksPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Best Treks in Uttarakhand', url: buildCanonicalUrl(PARENT_PATH) },
    { name: 'Beginner Treks', url: buildCanonicalUrl(PATH) },
  ]);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Best Beginner Treks in Uttarakhand',
        description:
          'Curated selection of easy and moderate treks in Uttarakhand for first-time trekkers, covering day hikes to multi-day routes.',
        url: buildCanonicalUrl(PATH),
        isPartOf: {
          '@type': 'CollectionPage',
          url: buildCanonicalUrl(PARENT_PATH),
          name: '10 Best Treks in Uttarakhand',
        },
      },
      {
        '@type': 'ItemList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Tiger Fall Trek', url: buildCanonicalUrl('/treks/location/chakrata/tiger-fall-trek') },
          { '@type': 'ListItem', position: 2, name: 'Budher Caves Trek', url: buildCanonicalUrl('/treks/location/chakrata/budher-caves-trek') },
          { '@type': 'ListItem', position: 3, name: 'Brahmatal Trek', url: buildCanonicalUrl('/treks/location/lohajung/brahmatal-trek') },
          { '@type': 'ListItem', position: 4, name: 'Kuari Pass Trek', url: buildCanonicalUrl('/treks/location/joshimath/kuari-pass-trek') },
          { '@type': 'ListItem', position: 5, name: 'Khaliya Top Trek', url: buildCanonicalUrl('/treks/location/munsiyari/khaliya-top-trek') },
        ],
      },
      breadcrumbSchema,
      faqSchema,
    ],
  };

  return (
    <TrackedPage page={PATH}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <style>{`
        .beg-body { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; margin: 0 0 1rem; }
        .beg-h2 { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200; letter-spacing: -0.03em; color: #111; line-height: 1.15; margin: 0 0 0.75rem; }
        .beg-h3 { font-family: var(--font-geist-sans), sans-serif; font-size: 0.95rem; font-weight: 500; color: #111; letter-spacing: -0.01em; margin: 0 0 0.5rem; }
        .beg-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .beg-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary);  display: inline-block; }
        .beg-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase; color: #374151; font-weight: 500; }

        .beg-trek-card { background: #fff; border: 1px solid #eef0ee; border-top: 2px solid var(--color-primary); border-radius: 8px; padding: 1.25rem 1.5rem; margin-bottom: 0.75rem; transition: transform 0.18s, box-shadow 0.18s; }
        .beg-trek-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.07); }
        .beg-trek-meta { display: flex; flex-wrap: wrap; gap: 0.3rem 1rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; font-weight: 400; color: #888; margin-bottom: 0.65rem; }
        .beg-trek-meta-pill { display: inline-flex; align-items: center; gap: 0.3rem; }
        .beg-trek-meta-pill::before { content: ''; width: 4px; height: 4px; border-radius: 50%; background: var(--color-primary);  display: inline-block; }
        .beg-trek-link { display: inline-flex; align-items: center; gap: 0.35rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; font-weight: 500; color: #374151; text-decoration: none; border-bottom: 1px solid rgba(15,118,110,0.25); margin-top: 0.5rem; }
        .beg-trek-link:hover { border-bottom-color: #374151; }

        .beg-callout { background: #fff; border: 1px solid #e5e7eb; border-left: 3px solid var(--color-primary); border-radius: 8px; padding: 1rem 1.25rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; }
        .beg-callout a { color: #374151; font-weight: 500; text-decoration: none; border-bottom: 1px solid rgba(15,118,110,0.25); }
        .beg-callout a:hover { border-bottom-color: #374151; }
        .beg-callout strong { font-weight: 500; color: #111; }

        .beg-table-wrap { border: 1px solid #eef0ee; border-radius: 8px; overflow: hidden; }
        .beg-table { width: 100%; border-collapse: collapse; font-family: var(--font-geist-sans), sans-serif; font-size: 0.82rem; font-weight: 300; }
        .beg-table thead tr { background: #f7f9f7; border-bottom: 2px solid #e5e7eb; }
        .beg-table th { padding: 0.65rem 1rem; text-align: left; font-weight: 500; color: #111; font-size: 0.75rem; letter-spacing: 0.02em; }
        .beg-table tbody tr { border-bottom: 1px solid #f0f0f0; transition: background 0.12s; }
        .beg-table tbody tr:last-child { border-bottom: none; }
        .beg-table tbody tr:hover { background: #f7f9f7; }
        .beg-table td { padding: 0.65rem 1rem; color: #555; }
        .beg-table td a { color: #374151; font-weight: 500; text-decoration: none; }
        .beg-table td a:hover { text-decoration: underline; }
        .beg-badge { display: inline-block; font-size: 0.62rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.15rem 0.75rem; border-radius: 3px; }
        .beg-badge-easy { background: rgba(15,118,110,0.08); color: #374151; }
        .beg-badge-moderate { background: rgba(37,99,235,0.08); color: #2563eb; }

        .beg-nav-group { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .beg-nav-link { display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; border-bottom: 1px solid #f0f0f0; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #333; text-decoration: none; transition: background 0.15s, color 0.15s; }
        .beg-nav-link:last-child { border-bottom: none; }
        .beg-nav-link:hover { background: #f7f9f7; color: #374151; }
        .beg-nav-link.back::before { content: '←'; color: #374151;  margin-right: 0.5rem; }
        .beg-nav-link:not(.back)::after { content: '→'; color: #374151;  }

        @media (max-width: 700px) {
          .beg-table-wrap { overflow-x: auto; }
          .beg-trek-meta { gap: 0.25rem 0.75rem; }
        }
      `}</style>

      <article style={{ maxWidth: 720, margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
        <Breadcrumb items={BREADCRUMBS} />

        {/* ── HERO ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="beg-eyebrow">
              <span className="beg-eyebrow-line" />
              <span className="beg-eyebrow-text">Beginner Treks · Uttarakhand</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: 'clamp(1.75rem,3.5vw,2.4rem)', fontWeight: 200, letterSpacing: '-0.035em', color: '#111', lineHeight: 1.1, margin: '0 0 1.5rem' }}>
              Best Beginner Treks in Uttarakhand
            </h1>
            <p className="beg-body" style={{ margin: '0 0 1rem' }}>
              You do not need expedition experience to trek in the Himalayas. Uttarakhand offers a clear pathway from
              flat forest trails to moderate multi-day routes — each step building the skills and confidence for the next.
              This page covers the 5 best treks for beginners: two easy day hikes (no gear, no altitude) and three
              moderate routes (camping, gentle altitude, fully guided).
            </p>
            <p className="beg-body" style={{ margin: 0 }}>
              All five treks are included in our{' '}
              <Link href={PARENT_PATH} style={{ color: '#374151', fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid rgba(15,118,110,0.25)' }}>
                complete ranking of the 10 best treks in Uttarakhand
              </Link>, which also covers challenging and high-altitude routes for experienced trekkers.
            </p>
          </div>
        </section>

        {/* ── CALLOUT ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '3rem', paddingBottom: '3rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="beg-callout">
              <strong>Not sure which beginner trek to choose?</strong>{' '}
              Start with{' '}
              <Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal</Link>{' '}
              for snow views and a frozen alpine lake, or{' '}
              <Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass</Link>{' '}
              for panoramic Nanda Devi views on the historic Curzon Trail. Both are moderate, fully guided, and need no technical skills.
            </div>
          </div>
        </section>

        {/* ── EASY DAY TREKS ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="beg-eyebrow">
              <span className="beg-eyebrow-line" />
              <span className="beg-eyebrow-text">Easy Day Treks</span>
            </div>
            <h2 className="beg-h2">Easy Day Treks — No Experience Needed</h2>
            <p className="beg-body">
              Chakrata sits 2–3 hours from Dehradun in dense deodar forest below 2,500 metres.
              These trails require no multi-day gear, no camping, and no altitude acclimatisation.
              They are the ideal first step for anyone who has never walked a mountain trail.
            </p>
            <div className="beg-trek-card">
              <h3 className="beg-h3">Tiger Fall Trek</h3>
              <div className="beg-trek-meta">
                <span className="beg-trek-meta-pill">~2,200 m</span>
                <span className="beg-trek-meta-pill"><span className="beg-badge beg-badge-easy">Easy</span></span>
                <span className="beg-trek-meta-pill">1 day</span>
                <span className="beg-trek-meta-pill">Year-round</span>
                <span className="beg-trek-meta-pill">Chakrata</span>
              </div>
              <p className="beg-body" style={{ margin: 0 }}>
                A gentle forest walk to one of the tallest waterfalls in Uttarakhand. The trail stays below tree cover the
                entire way, with no exposed ridges or steep scrambles. Perfect for families, first-timers, or as a
                warm-up before a multi-day route.
              </p>
              <Link href="/treks/location/chakrata/tiger-fall-trek" className="beg-trek-link">
                View full Tiger Fall trek details →
              </Link>
            </div>
            <div className="beg-trek-card">
              <h3 className="beg-h3">Budher Caves Trek</h3>
              <div className="beg-trek-meta">
                <span className="beg-trek-meta-pill">~2,200 m</span>
                <span className="beg-trek-meta-pill"><span className="beg-badge beg-badge-easy">Easy</span></span>
                <span className="beg-trek-meta-pill">1 day</span>
                <span className="beg-trek-meta-pill">Year-round</span>
                <span className="beg-trek-meta-pill">Chakrata</span>
              </div>
              <p className="beg-body" style={{ margin: 0 }}>
                A slightly longer forest trail leading to ancient limestone caves, offering more trail variety than Tiger Fall
                with a rewarding geological endpoint. Same low-altitude, low-risk profile, but adds exploration interest.
              </p>
              <Link href="/treks/location/chakrata/budher-caves-trek" className="beg-trek-link">
                View full Budher Caves trek details →
              </Link>
            </div>
            <p className="beg-body" style={{ margin: '1rem 0 0' }}>
              Both Chakrata trails pair well with a{' '}
              <Link href="/retreats/chakrata" style={{ color: '#374151', fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid rgba(15,118,110,0.25)' }}>
                Chakrata retreat weekend
              </Link>{' '}
              — trek in the morning, rest and reset in the afternoon.
            </p>
          </div>
        </section>

        {/* ── MODERATE MULTI-DAY ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="beg-eyebrow">
              <span className="beg-eyebrow-line" />
              <span className="beg-eyebrow-text">Moderate Multi-Day Treks</span>
            </div>
            <h2 className="beg-h2">Moderate Multi-Day Treks — Your First Himalayan Camping Experience</h2>
            <p className="beg-body">
              These routes introduce camping at altitude, multi-day rhythm, and the full Himalayan trekking experience —
              but with gradual altitude gain, well-established trails, and professional guides throughout.
              No technical skills needed; 4–6 weeks of fitness preparation recommended.
            </p>
            <div className="beg-trek-card">
              <h3 className="beg-h3">Brahmatal Trek</h3>
              <div className="beg-trek-meta">
                <span className="beg-trek-meta-pill">3,850 m</span>
                <span className="beg-trek-meta-pill"><span className="beg-badge beg-badge-moderate">Moderate</span></span>
                <span className="beg-trek-meta-pill">4 days</span>
                <span className="beg-trek-meta-pill">Dec–Mar</span>
                <span className="beg-trek-meta-pill">Lohajung, Garhwal</span>
              </div>
              <p className="beg-body" style={{ margin: 0 }}>
                The ideal first snow trek — frozen Brahmatal Lake, snow-covered ridges, and continuous Trishul and Nanda Ghunti
                views. The 4-day duration limits cold exposure while delivering a genuinely alpine experience. The route
                gains altitude gradually through forest before opening onto exposed ridge meadows.
              </p>
              <Link href="/treks/location/lohajung/brahmatal-trek" className="beg-trek-link">
                View full Brahmatal trek details →
              </Link>
            </div>
            <div className="beg-trek-card">
              <h3 className="beg-h3">Kuari Pass Trek</h3>
              <div className="beg-trek-meta">
                <span className="beg-trek-meta-pill">3,876 m</span>
                <span className="beg-trek-meta-pill"><span className="beg-badge beg-badge-moderate">Moderate</span></span>
                <span className="beg-trek-meta-pill">5 days</span>
                <span className="beg-trek-meta-pill">Mar–May, Oct–Nov</span>
                <span className="beg-trek-meta-pill">Joshimath, Garhwal</span>
              </div>
              <p className="beg-body" style={{ margin: 0 }}>
                One of the most accessible ridge walks in the Himalayas — 5 days along the historic Curzon Trail with
                Nanda Devi, Dronagiri, and Chaukhamba visible for most of the route. Spring brings snow on the upper
                sections plus rhododendron bloom along the lower trail. This is the classic first moderate trek in Garhwal.
              </p>
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                <Link href="/treks/location/joshimath/kuari-pass-trek" className="beg-trek-link">
                  View full Kuari Pass trek details →
                </Link>
                <Link href="/treks/brahmatal-vs-kuari-pass" className="beg-trek-link">
                  Compare Brahmatal vs Kuari Pass →
                </Link>
              </div>
            </div>
            <div className="beg-trek-card">
              <h3 className="beg-h3">Khaliya Top Trek</h3>
              <div className="beg-trek-meta">
                <span className="beg-trek-meta-pill">3,500 m</span>
                <span className="beg-trek-meta-pill"><span className="beg-badge beg-badge-moderate">Moderate</span></span>
                <span className="beg-trek-meta-pill">3–4 days</span>
                <span className="beg-trek-meta-pill">May–Jun, Sep–Oct</span>
                <span className="beg-trek-meta-pill">Munsiyari, Kumaon</span>
              </div>
              <p className="beg-body" style={{ margin: 0 }}>
                A quieter alternative to the popular Garhwal routes — Khaliya Top offers a 360-degree Panchachuli massif panorama
                from 3,500 metres, with far fewer trekkers on trail. Based from Munsiyari in the Kumaon Himalaya, it provides
                a genuine alpine meadow summit experience at gentler altitude than Garhwal. Ideal for trekkers who value solitude
                alongside scenery.
              </p>
              <Link href="/treks/location/munsiyari/khaliya-top-trek" className="beg-trek-link">
                View full Khaliya Top trek details →
              </Link>
            </div>
          </div>
        </section>

        {/* ── COMPARISON CALLOUT ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '3rem', paddingBottom: '3rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="beg-callout">
              <strong>Still deciding between Brahmatal and Kuari Pass?</strong>{' '}
              See our detailed{' '}
              <Link href="/treks/brahmatal-vs-kuari-pass">
                Brahmatal vs Kuari Pass comparison
              </Link>{' '}
              for a side-by-side breakdown of season, views, difficulty, and logistics.
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="beg-eyebrow">
              <span className="beg-eyebrow-line" />
              <span className="beg-eyebrow-text">At a Glance</span>
            </div>
            <h2 className="beg-h2" style={{ marginBottom: '1.75rem' }}>Beginner Treks at a Glance</h2>
            <div className="beg-table-wrap">
              <table className="beg-table">
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
                  <tr>
                    <td><Link href="/treks/location/chakrata/tiger-fall-trek">Tiger Fall</Link></td>
                    <td>~2,200 m</td>
                    <td><span className="beg-badge beg-badge-easy">Easy</span></td>
                    <td>1</td>
                    <td>Year-round</td>
                  </tr>
                  <tr>
                    <td><Link href="/treks/location/chakrata/budher-caves-trek">Budher Caves</Link></td>
                    <td>~2,200 m</td>
                    <td><span className="beg-badge beg-badge-easy">Easy</span></td>
                    <td>1</td>
                    <td>Year-round</td>
                  </tr>
                  <tr>
                    <td><Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal</Link></td>
                    <td>3,850 m</td>
                    <td><span className="beg-badge beg-badge-moderate">Moderate</span></td>
                    <td>4</td>
                    <td>Dec–Mar</td>
                  </tr>
                  <tr>
                    <td><Link href="/treks/location/joshimath/kuari-pass-trek">Kuari Pass</Link></td>
                    <td>3,876 m</td>
                    <td><span className="beg-badge beg-badge-moderate">Moderate</span></td>
                    <td>5</td>
                    <td>Mar–May, Oct–Nov</td>
                  </tr>
                  <tr>
                    <td><Link href="/treks/location/munsiyari/khaliya-top-trek">Khaliya Top</Link></td>
                    <td>3,500 m</td>
                    <td><span className="beg-badge beg-badge-moderate">Moderate</span></td>
                    <td>3–4</td>
                    <td>May–Jun, Sep–Oct</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── WHAT TO EXPECT ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="beg-eyebrow">
              <span className="beg-eyebrow-line" />
              <span className="beg-eyebrow-text">What to Expect</span>
            </div>
            <h2 className="beg-h2">What to Expect on Your First Trek</h2>
            <p className="beg-body">
              <strong style={{ fontWeight: 500, color: '#111' }}>Day treks (Chakrata):</strong>{' '}
              You will walk 4–8 km on forest trails at low altitude. Carry water, snacks,
              and rain protection. No special equipment needed. Return to accommodation the same day.
            </p>
            <p className="beg-body">
              <strong style={{ fontWeight: 500, color: '#111' }}>Multi-day treks (Brahmatal, Kuari Pass, Khaliya Top):</strong>{' '}
              You will camp in tents at established sites,
              eat meals prepared by a trek crew, and walk 6–12 km per day with 500–800 m elevation gain. Guides manage
              navigation, safety, and logistics. Your main job is to walk and enjoy. Basic trekking gear (layering system,
              trekking shoes, daypack) is needed — our{' '}
              <Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: '#374151', fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid rgba(15,118,110,0.25)' }}>
                packing checklist
              </Link>{' '}
              covers everything.
            </p>
            <p className="beg-body" style={{ margin: 0 }}>
              Ready to progress beyond beginner routes? The{' '}
              <Link href={`${PARENT_PATH}#challenging-treks`} style={{ color: '#374151', fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid rgba(15,118,110,0.25)' }}>
                challenging treks section
              </Link>{' '}
              covers Roopkund, Pangarchulla, and Milam Glacier for experienced trekkers.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <PrimaryCTA
              label="Plan My First Trek"
              subtext="Tell us your dates and fitness level — we will recommend the perfect first route."
              vertical="trek"
              category="filter-beginner"
              sourcePath={PATH}
            />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="beg-eyebrow">
              <span className="beg-eyebrow-line" />
              <span className="beg-eyebrow-text">FAQ</span>
            </div>
            <h2 className="beg-h2" style={{ marginBottom: '1.75rem' }}>Frequently Asked Questions</h2>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

        {/* ── NAV ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="beg-eyebrow">
              <span className="beg-eyebrow-line" />
              <span className="beg-eyebrow-text">Browse by Category</span>
            </div>
            <h2 className="beg-h2" style={{ marginBottom: '1.75rem' }}>Browse by Category</h2>
            <div className="beg-nav-group">
              <Link href={PARENT_PATH} className="beg-nav-link back">All 10 Best Treks in Uttarakhand</Link>
              <Link href={`${PARENT_PATH}/snow`} className="beg-nav-link">Snow Treks in Uttarakhand</Link>
              <Link href={`${PARENT_PATH}/high-altitude`} className="beg-nav-link">High-Altitude Treks Above 4,000 m</Link>
              <Link href={`${PARENT_PATH}/challenging`} className="beg-nav-link">Challenging Treks in Uttarakhand</Link>
              <Link href="/treks/garhwal-himalayas" className="beg-nav-link">Garhwal Himalayas — Complete Trekking Guide</Link>
            </div>
          </div>
        </section>

      </article>
    </TrackedPage>
  );
}