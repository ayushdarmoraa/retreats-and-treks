import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/treks/garhwal-himalayas/fitness-guide';

export function generateMetadata(): Metadata {
  return {
    title: 'Garhwal Trek Fitness Guide — 8-Week Preparation Plan (3,850m–4,800m) | Retreats And Treks',
    description:
      'Free 8-week fitness plan for Garhwal Himalaya treks. Week-by-week training for Brahmatal (3,850m), Kuari Pass, Roopkund (4,800m) & Pangarchulla. Cardio, strength, altitude prep & gear checklist.',
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

  return (
    <TrackedPage page={PATH} style={{ width: '100%', padding: '0' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <style>{`
        /* ── FITNESS GUIDE — scoped prefix: fg- ── */

        .fg-table-wrap {
          overflow-x: auto;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          background: #ffffff;
        }
        .fg-table { width: 100%; border-collapse: collapse; }
        .fg-table thead tr { border-bottom: 2px solid #e5e7eb; }
        .fg-table th {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.55rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--color-primary); opacity: 0.7;
          padding: 0.75rem 1rem; text-align: left; white-space: nowrap;
        }
        .fg-table td {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.84rem; font-weight: 300;
          color: #444444; padding: 0.75rem 1rem;
          border-bottom: 1px solid #f0f0f0;
        }
        .fg-table tbody tr:last-child td { border-bottom: none; }
        .fg-table tbody tr { transition: background 0.15s ease; }
        .fg-table tbody tr:hover td { background: #f7f9f7; }

        .fg-badge {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.6rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          border-radius: 100px; padding: 2px 8px;
          display: inline-block; white-space: nowrap;
          vertical-align: middle; margin-left: 6px;
        }
        .fg-badge-moderate {
          color: var(--color-primary);
          background: rgba(15,118,110,0.07);
          border: 1px solid rgba(15,118,110,0.2);
        }
        .fg-badge-challenging {
          color: #e65100;
          background: rgba(230,81,0,0.05);
          border: 1px solid rgba(230,81,0,0.2);
        }

        /* Quick-pick cards */
        .fg-pick {
          background: #fff;
          border: 1px solid #eef0ee;
          border-left: 3px solid var(--color-primary);
          border-radius: 10px;
          padding: 1rem 1.25rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem; line-height: 1.85; color: #555;
          transition: box-shadow 0.2s ease;
        }
        .fg-pick:hover { box-shadow: 0 4px 16px rgba(15,118,110,0.08); }
        .fg-pick-label {
          font-size: 0.55rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--color-primary); opacity: 0.7; margin-bottom: 0.35rem;
        }

        /* Section body text */
        .fg-body {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem; font-weight: 300;
          line-height: 1.85; color: #555555; margin: 0;
        }

        /* Week blocks */
        .fg-week {
          border-left: 2px solid rgba(15,118,110,0.2);
          padding: 0.1rem 0 0.1rem 1.25rem;
          margin-bottom: 1.5rem;
        }
        .fg-week-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem; font-weight: 500;
          color: #111; margin: 0 0 0.5rem;
          letter-spacing: -0.01em;
        }
        .fg-week ul {
          margin: 0; padding-left: 1.1rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem; font-weight: 300;
          line-height: 1.85; color: #555;
        }
        .fg-week ul li { margin-bottom: 0.25rem; }

        /* Gear checklist groups */
        .fg-gear-group {
          background: #fff;
          border: 1px solid #eef0ee;
          border-top: 2px solid var(--color-primary);
          border-radius: 10px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.25rem;
          transition: box-shadow 0.2s ease;
        }
        .fg-gear-group:hover { box-shadow: 0 6px 20px rgba(15,118,110,0.07); }
        .fg-gear-group:last-of-type { margin-bottom: 0; }
        .fg-gear-group h3 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem; font-weight: 500;
          color: #111; margin: 0 0 0.85rem;
          letter-spacing: -0.01em;
        }
        .fg-gear-group ul {
          margin: 0; padding-left: 1.1rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem; font-weight: 300;
          line-height: 1.85; color: #555;
        }

        /* AMS severity indicators */
        .fg-ams-row { display: flex; gap: 1rem; align-items: flex-start; padding: 1rem 0; border-bottom: 1px solid #f0f0f0; }
        .fg-ams-row:last-child { border-bottom: none; }
        .fg-ams-dot { flex-shrink: 0; width: 10px; height: 10px; border-radius: 50%; margin-top: 0.45rem; }

        /* Progress steps */
        .fg-step { display: flex; gap: 1.25rem; position: relative; }
        .fg-step-line { position: absolute; left: 4px; top: 20px; width: 2px; height: calc(100% - 4px); background: linear-gradient(to bottom, rgba(15,118,110,0.2), transparent); }
        .fg-step-dot { flex-shrink: 0; width: 10px; height: 10px; border-radius: 50%; background: var(--color-primary); margin-top: 0.35rem; }

        /* Nav */
        .fg-nav-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.9rem 1.1rem; border-bottom: 1px solid #f0f0f0;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem; font-weight: 300;
          color: #333333; text-decoration: none;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .fg-nav-link:hover { background: #f7f9f7; color: var(--color-primary); }
        .fg-nav-link::after { content: '→'; color: var(--color-primary); opacity: 0.5; }
        .fg-nav-group { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .fg-nav-group .fg-nav-link:last-child { border-bottom: none; }

        /* Responsive */
        @media (max-width: 700px) {
          .fg-table th:nth-child(3),
          .fg-table td:nth-child(3),
          .fg-table th:nth-child(4),
          .fg-table td:nth-child(4) { display: none; }
          .fg-bench-hide { display: none; }
          .fg-gear-group { padding: 1rem 1.1rem; }
        }
      `}</style>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#f7f9f7',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Treks', href: '/treks' },
            { name: 'Garhwal Himalayas', href: '/treks/garhwal-himalayas' },
            { name: 'Fitness Guide' },
          ]} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0 1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Fitness Guide · Garhwal Himalayas</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
            fontWeight: 200, letterSpacing: '-0.035em',
            color: '#111111', lineHeight: 1.1, margin: '0 0 1.75rem',
          }}>
            Garhwal Trek Fitness Guide: 8-Week Preparation Plan
          </h1>

          {/* Quick-pick cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div className="fg-pick">
              <div className="fg-pick-label">Moderate Routes — 4 weeks prep</div>
              <span style={{ fontWeight: 500, color: '#111' }}>
                <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal</Link>
                {' '}or{' '}
                <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kuari Pass</Link>
              </span>{' '}
              <span style={{ fontWeight: 300 }}>— 4-day routes at 3,850–3,876 m. Beginner-friendly with guided campsites.</span>
            </div>
            <div className="fg-pick" style={{ borderLeftColor: '#e65100' }}>
              <div className="fg-pick-label" style={{ color: '#e65100' }}>Challenging Routes — 6–8 weeks prep</div>
              <span style={{ fontWeight: 500, color: '#111' }}>
                <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund</Link>
                {' '}or{' '}
                <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Pangarchulla</Link>
              </span>{' '}
              <span style={{ fontWeight: 300 }}>— 6–7 day routes above 4,500 m. Prior high-altitude experience required.</span>
            </div>
          </div>

          <p className="fg-body" style={{ marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Garhwal Himalaya treks</Link>{' '}
            range from moderate 4-day routes at 3,850 metres to challenging 7-day expeditions at 4,800 metres.
            Every route demands specific physical preparation — and the training differs significantly between
            difficulty tiers. This guide provides a structured 8-week plan that covers both, with clear
            thresholds for when you are ready.
          </p>
          <p className="fg-body">
            Whether you are preparing for the{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal winter trek</Link>{' '}
            or the{' '}
            <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Pangarchulla summit climb</Link>,
            this plan scales to your target route.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FITNESS REQUIREMENTS BY TREK
      ═══════════════════════════════════════ */}
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>By Route</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            Fitness Requirements by Trek
          </h2>
          <p className="fg-body" style={{ marginBottom: '1.75rem' }}>
            If you are choosing between the two moderate snow treks, the{' '}
            <Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal vs Kuari Pass comparison</Link>{' '}
            breaks down the differences in terrain, views, and season. Once you have chosen your target route, follow the corresponding training plan below.
          </p>

          {/* Hero image for visual context */}
          <div style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '1.75rem' }}>
            <img
              src="/Images/trek/region/garhwal.webp"
              alt="Garhwal Himalaya trekking terrain — ridge trail above 4000m"
              loading="lazy"
              style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div className="fg-table-wrap">
            <table className="fg-table">
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
                {[
                  { href: '/treks/location/lohajung/brahmatal-trek',   name: 'Brahmatal',    alt: '3,850 m', dist: '5–8 km',                      elev: '400–700 m',   weeks: '4 weeks', diff: 'moderate'    },
                  { href: '/treks/location/joshimath/kuari-pass-trek', name: 'Kuari Pass',   alt: '3,876 m', dist: '6–10 km',                     elev: '500–800 m',   weeks: '4 weeks', diff: 'moderate'    },
                  { href: '/treks/location/lohajung/roopkund-trek',    name: 'Roopkund',     alt: '4,800 m', dist: '7–12 km',                     elev: '600–1,000 m', weeks: '6 weeks', diff: 'challenging' },
                  { href: '/treks/location/joshimath/pangarchulla-trek', name: 'Pangarchulla', alt: '4,590 m', dist: '5–8 km (summit: 720 m in 4h)', elev: '500–720 m',  weeks: '6 weeks', diff: 'challenging' },
                ].map(row => (
                  <tr key={row.href}>
                    <td>
                      <Link href={row.href} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>{row.name}</Link>
                      <span className={`fg-badge fg-badge-${row.diff}`}>{row.diff}</span>
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

      {/* ═══════════════════════════════════════
          READINESS BENCHMARKS
      ═══════════════════════════════════════ */}
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#f7f9f7',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Readiness Check</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            Are You Ready? Fitness Benchmarks
          </h2>
          <p className="fg-body" style={{ marginBottom: '1.75rem' }}>
            Before committing to a trek, test yourself against these benchmarks. If you can hit the numbers for your target difficulty, you are physically prepared.
          </p>

          <div className="fg-table-wrap">
            <table className="fg-table fg-bench-table" style={{ minWidth: '520px' }}>
              <thead>
                <tr>
                  <th>Benchmark</th>
                  <th>Moderate (Brahmatal / Kuari)</th>
                  <th className="fg-bench-hide">Challenging (Roopkund / Pangarchulla)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Continuous jog',            mod: '5 km in 35 min',              chal: '8 km in 50 min' },
                  { label: 'Loaded walk (8 kg pack)',   mod: '10 km in 2.5 hours',          chal: '15 km in 3.5 hours' },
                  { label: 'Stair climb (continuous)',  mod: '30 floors in 20 min',         chal: '50 floors in 30 min' },
                  { label: 'Back-to-back walk days',    mod: '2 consecutive days, 12 km each', chal: '3 consecutive days, 15 km each' },
                  { label: 'Bodyweight squats',         mod: '3 × 25 reps',                 chal: '3 × 40 reps' },
                ].map((b, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500, color: '#111' }}>{b.label}</td>
                    <td>{b.mod}</td>
                    <td className="fg-bench-hide">{b.chal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          8-WEEK PLAN — MODERATE
      ═══════════════════════════════════════ */}
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Training Plan</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            8-Week Plan: Moderate Treks (Brahmatal &amp; Kuari Pass)
          </h2>
          <p className="fg-body" style={{ marginBottom: '1.75rem' }}>
            This plan assumes a baseline of normal activity (walking, occasional gym) but no structured endurance training.
            4 training days per week. Rest days are not optional — they prevent overuse injury.
            If you are new to Himalayan trekking, read the{' '}
            <Link href="/blog/beginner-to-advanced-trek-progression-garhwal" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>beginner to advanced trek progression</Link>{' '}
            to understand where Brahmatal and Kuari Pass sit in the overall difficulty scale.
          </p>

          <div className="fg-week">
            <p className="fg-week-title">Weeks 1–2: Build Base</p>
            <ul>
              <li><strong>3× cardio:</strong> Jog or brisk walk 3–5 km. Target: continuous movement for 30–40 minutes without stopping.</li>
              <li><strong>1× strength:</strong> Bodyweight circuit — 3 rounds of 20 squats, 10 lunges per leg, 30-second wall sit, 15 step-ups per leg.</li>
              <li><strong>Weekend:</strong> One longer walk — 8–10 km on varied terrain (park, trail, hills) with a daypack containing 3–5 kg.</li>
            </ul>
          </div>

          <div className="fg-week">
            <p className="fg-week-title">Weeks 3–4: Build Duration</p>
            <ul>
              <li><strong>3× cardio:</strong> Jog 4–6 km. Introduce 1 interval session: 5 × 3-minute hard effort with 2-minute recovery.</li>
              <li><strong>1× strength:</strong> Add weighted step-ups (backpack with 5–8 kg), calf raises, and 60-second plank holds.</li>
              <li><strong>Weekend:</strong> Back-to-back walking days — 10 km Saturday, 8 km Sunday, both with 5–8 kg pack.</li>
            </ul>
          </div>

          <div className="fg-week">
            <p className="fg-week-title">Weeks 5–6: Build Intensity</p>
            <ul>
              <li><strong>3× cardio:</strong> One long jog (6–8 km), one interval session, one stairmaster/stair climb session (30+ minutes).</li>
              <li><strong>1× strength:</strong> Increase to 4 rounds. Add single-leg squats (pistol progressions) and loaded lunges.</li>
              <li><strong>Weekend:</strong> One simulation day — walk 12–15 km with trekking pack (8 kg), include hill sections if available. Include 500+ m elevation gain if possible.</li>
            </ul>
          </div>

          <div className="fg-week" style={{ marginBottom: 0 }}>
            <p className="fg-week-title">Weeks 7–8: Taper &amp; Test</p>
            <ul>
              <li><strong>Week 7:</strong> Run benchmark tests (see table above). If you hit moderate targets, you are ready. If not, extend training by 1–2 weeks.</li>
              <li><strong>Week 8:</strong> Reduce volume by 40%. Light jogs, easy walks, flexibility work. Arrive at the trailhead rested, not fatigued.</li>
            </ul>
          </div>

          <p className="fg-body" style={{ marginTop: '1.5rem' }}>
            If you are training for the{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal Trek</Link>,
            emphasise cold-weather endurance — add outdoor sessions in colder hours and practice layering on the move.
            For the{' '}
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kuari Pass Trek</Link>,
            focus on sustained ridge walking — longer weekend hikes with moderate elevation gain build the right stamina.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          8-WEEK PLAN — CHALLENGING
      ═══════════════════════════════════════ */}
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#f7f9f7',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: '#e65100', opacity: 0.5, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#e65100', fontWeight: 500, opacity: 0.7 }}>Advanced Plan</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            8-Week Plan: Challenging Treks (Roopkund &amp; Pangarchulla)
          </h2>
          <p className="fg-body" style={{ marginBottom: '1.75rem' }}>
            This plan assumes you have already completed a moderate Himalayan trek or equivalent multi-day endurance activity.
            If starting from scratch, complete the moderate plan first, then add 4 weeks of this programme.
            5 training days per week. For context on what separates these routes from lower treks, see our guide to{' '}
            <Link href="/blog/high-altitude-treks-garhwal-above-4000m" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>high-altitude treks above 4,000m in Garhwal</Link>.
            Not sure which challenging route suits you? The{' '}
            <Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund vs Pangarchulla breakdown</Link>{' '}
            compares summit difficulty, permit requirements, and best seasons.
          </p>

          <div className="fg-week" style={{ borderLeftColor: 'rgba(230,81,0,0.2)' }}>
            <p className="fg-week-title">Weeks 1–2: Endurance Foundation</p>
            <ul>
              <li><strong>3× cardio:</strong> Run 5–8 km at conversational pace. Include 1 hill repeat session (6 × 2-minute hill sprints).</li>
              <li><strong>2× strength:</strong> Heavy lower body — weighted squats, loaded step-ups (10 kg pack), single-leg deadlifts, calf raises. Core work: plank variations, Russian twists, dead bugs.</li>
              <li><strong>Weekend:</strong> Long hike — 12–15 km with 10 kg pack, targeting 600–800 m elevation gain.</li>
            </ul>
          </div>

          <div className="fg-week" style={{ borderLeftColor: 'rgba(230,81,0,0.2)' }}>
            <p className="fg-week-title">Weeks 3–4: Volume &amp; Consecutive Days</p>
            <ul>
              <li><strong>3× cardio:</strong> One long run (8–10 km), one interval session (8 × 3-minute hard), one sustained stair climb (40+ minutes).</li>
              <li><strong>2× strength:</strong> Increase load. Add box step-ups with 12 kg pack. Bulgarian split squats. 90-second plank holds.</li>
              <li><strong>Weekend:</strong> Back-to-back-to-back — Fri 10 km, Sat 15 km, Sun 10 km, all with pack. This simulates multi-day fatigue.</li>
            </ul>
          </div>

          <div className="fg-week" style={{ borderLeftColor: 'rgba(230,81,0,0.2)' }}>
            <p className="fg-week-title">Weeks 5–6: Peak Training</p>
            <ul>
              <li><strong>Summit simulation (Pangarchulla-specific):</strong> One session per week — climb 1,000 m elevation in under 3 hours. Use a tall building, hill, or stairmaster at maximum incline with 10–12 kg pack.</li>
              <li><strong>Consecutive-day endurance:</strong> 3 days of 12–15 km walking/running. Log total weekly distance of 50+ km.</li>
              <li><strong>Strength maintenance:</strong> 2 sessions, same exercises but maintaining load — not increasing. Focus on recovery quality.</li>
            </ul>
          </div>

          <div className="fg-week" style={{ marginBottom: 0, borderLeftColor: 'rgba(230,81,0,0.2)' }}>
            <p className="fg-week-title">Weeks 7–8: Taper &amp; Final Test</p>
            <ul>
              <li><strong>Week 7:</strong> Run all benchmark tests. Hit the challenging column targets. One final long simulation hike (15+ km, 800+ m gain).</li>
              <li><strong>Week 8:</strong> Reduce volume by 50%. Light runs, easy walks, yoga or stretching. Focus on sleep quality (8+ hours). Arrive at Lohajung or Joshimath rested and fuelled.</li>
            </ul>
          </div>

          <p className="fg-body" style={{ marginTop: '1.5rem' }}>
            If you are preparing for the{' '}
            <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund Trek</Link>,
            prioritise multi-day endurance — your body must sustain effort across seven consecutive days above 3,500 m.
            For the{' '}
            <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Pangarchulla Peak</Link>{' '}
            summit, focus on explosive climbing power and summit-day simulation — the single hardest day on any Garhwal trek.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GEAR CHECKLIST
      ═══════════════════════════════════════ */}
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>What to Carry</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            Complete Gear Checklist
          </h2>
          <p className="fg-body" style={{ marginBottom: '1.75rem' }}>
            Gear requirements differ between moderate winter treks and challenging high-altitude routes.
            This summary covers the essentials. For a complete, print-ready list organised by category and
            difficulty badge, see the{' '}
            <Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Garhwal trek packing checklist</Link>.
          </p>

          <div className="fg-gear-group">
            <h3>Essential — All Garhwal Treks</h3>
            <ul>
              <li>Trekking boots — ankle-height, waterproof, broken in (minimum 50 km of walking before the trek)</li>
              <li>3-layer clothing system — moisture-wicking base, insulating mid-layer (fleece or down), waterproof/windproof shell</li>
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

          <div className="fg-gear-group">
            <h3>Winter / Snow Treks — Brahmatal (Dec–Mar)</h3>
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

          <div className="fg-gear-group" style={{ borderTopColor: '#e65100' }}>
            <h3>Challenging / Summit Treks — Roopkund, Pangarchulla</h3>
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

      {/* ═══════════════════════════════════════
          ALTITUDE ACCLIMATISATION
      ═══════════════════════════════════════ */}
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#f7f9f7',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Altitude Safety</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            Altitude Acclimatisation Strategy
          </h2>
          <p className="fg-body" style={{ marginBottom: '1.75rem' }}>
            No amount of sea-level fitness replaces proper acclimatisation. The human body needs time to adapt
            to reduced oxygen pressure at altitude. The golden rule: <strong style={{ fontWeight: 500, color: '#111' }}>climb high, sleep low</strong>.
          </p>

          <div className="fg-table-wrap" style={{ marginBottom: '1.75rem' }}>
            <table className="fg-table" style={{ minWidth: '480px' }}>
              <thead>
                <tr>
                  <th>Altitude Zone</th>
                  <th>AMS Risk</th>
                  <th>Acclimatisation Rule</th>
                  <th className="fg-bench-hide">Relevant Treks</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { zone: '2,500–3,500 m', risk: 'Low',       rule: 'No special measures. Stay hydrated (3–4 L/day).', treks: 'Trail start for all 4 treks' },
                  { zone: '3,500–4,000 m', risk: 'Moderate',  rule: 'Do not ascend more than 500m sleeping altitude per day. Rest day every 3rd day.', treks: 'Brahmatal summit, Kuari Pass' },
                  { zone: '4,000–4,500 m', risk: 'High',      rule: 'Mandatory acclimatisation day before pushing higher. Monitor SpO2 — descend if below 80%.', treks: 'Pangarchulla approach, Roopkund upper camps' },
                  { zone: '4,500–5,000 m', risk: 'Very High', rule: 'Summit push only. Do not sleep at this altitude. Descend same day.', treks: 'Roopkund lake (4,800m), Pangarchulla summit (4,590m)' },
                ].map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500, color: '#111', whiteSpace: 'nowrap' }}>{r.zone}</td>
                    <td>
                      <span style={{
                        fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em',
                        textTransform: 'uppercase' as const, borderRadius: '100px',
                        padding: '2px 8px', display: 'inline-block', whiteSpace: 'nowrap',
                        ...(r.risk === 'Low'       ? { color: '#555', background: '#f0f0f0', border: '1px solid #e0e0e0' } :
                            r.risk === 'Moderate'  ? { color: 'var(--color-primary)', background: 'rgba(15,118,110,0.07)', border: '1px solid rgba(15,118,110,0.2)' } :
                            r.risk === 'High'      ? { color: '#b45309', background: 'rgba(180,83,9,0.07)', border: '1px solid rgba(180,83,9,0.2)' } :
                                                     { color: '#e65100', background: 'rgba(230,81,0,0.05)', border: '1px solid rgba(230,81,0,0.2)' })
                      }}>{r.risk}</span>
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>{r.rule}</td>
                    <td className="fg-bench-hide" style={{ fontSize: '0.82rem' }}>{r.treks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="fg-body" style={{ marginBottom: '1rem', fontWeight: 500, color: '#111' }}>
            AMS Warning Signs — When to Turn Back
          </p>
          {[
            { label: 'Mild AMS', color: 'var(--color-primary)', bg: 'rgba(15,118,110,0.07)', body: 'Persistent headache not relieved by ibuprofen, loss of appetite, mild nausea, difficulty sleeping. Action: do not ascend further until symptoms resolve.' },
            { label: 'Moderate AMS', color: '#b45309', bg: 'rgba(180,83,9,0.07)', body: 'Severe headache, vomiting, extreme fatigue at rest, ataxia (unsteady walking). Action: descend immediately by at least 500m.' },
            { label: 'Severe AMS (HACE/HAPE)', color: '#e65100', bg: 'rgba(230,81,0,0.07)', body: 'Confusion, inability to walk straight, persistent cough with pink/frothy sputum, blue lips. Action: emergency descent. This is life-threatening.' },
          ].map((a, i) => (
            <div key={i} className="fg-ams-row">
              <span className="fg-ams-dot" style={{ background: a.color }} />
              <p className="fg-body" style={{ margin: 0 }}>
                <strong style={{ fontWeight: 500, color: '#111' }}>{a.label}:</strong>{' '}{a.body}
              </p>
            </div>
          ))}

          <p className="fg-body" style={{ marginTop: '1.5rem' }}>
            All guided{' '}
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Garhwal trekking routes</Link>{' '}
            include trained leaders who monitor group members for AMS symptoms and carry emergency communication equipment.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          NUTRITION
      ═══════════════════════════════════════ */}
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>On the Trail</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Nutrition &amp; Hydration on Trail
          </h2>

          {[
            { label: 'Daily calorie requirement', text: '3,000–4,000 kcal while trekking (vs ~2,000 kcal at rest). You will undereat if you rely on appetite alone — eat on schedule, not hunger.' },
            { label: 'Hydration target', text: '3–4 litres per day. Above 4,000m, increase to 4–5 litres. Dehydration amplifies AMS symptoms. Carry purification tablets as backup.' },
            { label: 'Carbohydrate loading', text: '60–70% of calories from carbs during the trek. Rice, chapati, pasta, porridge, energy bars. Your body burns glycogen rapidly at altitude.' },
            { label: 'Trail snacks', text: 'Carry 500–800 kcal of portable food per day — trail mix, dates, glucose biscuits, chocolate, energy gels. Summit day on Pangarchulla requires fast-access calories.' },
            { label: 'Avoid', text: 'Alcohol (impairs acclimatisation), excessive caffeine (diuretic at altitude), heavy fatty meals before climb days.' },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', padding: '1.1rem 0', borderBottom: i < arr.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
              <span style={{ flexShrink: 0, width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-primary)', opacity: 0.4, marginTop: '0.45rem' }} />
              <p className="fg-body" style={{ margin: 0 }}>
                <strong style={{ fontWeight: 500, color: '#111' }}>{item.label}:</strong>{' '}{item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
      ═══════════════════════════════════════ */}
      <PrimaryCTA
        label="Plan My Garhwal Trek"
        subtext="Share your fitness level and preferred dates. We will recommend the right route and preparation timeline."
        vertical="trek"
        category="fitness"
        sourcePath={PATH}
      />

      {/* ═══════════════════════════════════════
          FAQ
      ═══════════════════════════════════════ */}
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#f7f9f7',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>FAQ</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          EXPLORE MORE
      ═══════════════════════════════════════ */}
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '4rem', paddingBottom: '4rem',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Choose Your Trek</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Choose Your Trek
          </h2>

          <div className="fg-nav-group">
            <Link href="/treks/garhwal-himalayas" className="fg-nav-link">Garhwal Trekking Routes — Overview &amp; Comparison</Link>
            <Link href="/treks/brahmatal-vs-kuari-pass" className="fg-nav-link">Brahmatal vs Kuari Pass — Moderate Trek Comparison</Link>
            <Link href="/treks/roopkund-vs-pangarchulla" className="fg-nav-link">Roopkund vs Pangarchulla — Challenging Trek Comparison</Link>
            <Link href="/treks/garhwal-himalayas/packing-checklist" className="fg-nav-link">Print-Ready Packing Checklist</Link>
            <Link href="/blog/beginner-to-advanced-trek-progression-garhwal" className="fg-nav-link">Beginner to Advanced — The Garhwal Progression Path</Link>
            <Link href="/blog/high-altitude-treks-garhwal-above-4000m" className="fg-nav-link">High Altitude Treks Above 4,000m</Link>
          </div>
        </div>
      </section>

    </TrackedPage>
  );
}