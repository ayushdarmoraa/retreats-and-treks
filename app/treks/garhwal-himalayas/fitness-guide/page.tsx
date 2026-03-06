import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
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
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Garhwal Trek Fitness Guide — 8-Week Training Plan',
      description:
        'Structured 8-week fitness preparation for moderate and challenging Garhwal Himalaya treks. Cardio, strength, altitude acclimatisation & complete gear checklist.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
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
          { name: 'Fitness Guide' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Garhwal Trek Fitness Guide: 8-Week Preparation Plan
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)' }}>
              Garhwal Himalaya treks
            </Link>{' '}
            range from moderate 4-day routes at 3,850 metres to challenging 7-day expeditions at 4,800 metres.
            Every route demands specific physical preparation — and the training differs significantly between
            difficulty tiers. This guide provides a structured 8-week plan that covers both, with clear
            thresholds for when you are ready.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Whether you are preparing for the{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>
              Brahmatal winter trek
            </Link>{' '}
            or the{' '}
            <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>
              Pangarchulla summit climb
            </Link>, this plan scales to your target route.
          </p>
        </header>

        {/* ── FITNESS REQUIREMENTS BY TREK ──────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Fitness Requirements by Trek
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', lineHeight: 1.7 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Trek</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Altitude</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Daily Distance</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Daily Elevation</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Min. Training</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,850m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>5–8 km</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>400–700m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4 weeks</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>Kuari Pass</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,876m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>6–10 km</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>500–800m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4 weeks</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>Roopkund</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4,800m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>7–12 km</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>600–1,000m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>6 weeks</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>Pangarchulla</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4,590m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>5–8 km (summit: 720m in 4h)</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>500–720m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>6 weeks</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ lineHeight: 1.8, marginTop: '1rem' }}>
            If you are choosing between the two moderate snow treks, the{' '}
            <Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)' }}>
              Brahmatal vs Kuari Pass comparison
            </Link>{' '}
            breaks down the differences in terrain, views, and season. Once you have chosen your
            target route, follow the corresponding training plan below.
          </p>
        </section>

        {/* ── READINESS BENCHMARKS ──────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Are You Ready? Fitness Benchmarks
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Before committing to a trek, test yourself against these benchmarks. If you can hit the numbers
            for your target difficulty, you are physically prepared.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', lineHeight: 1.7 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Benchmark</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Moderate (Brahmatal / Kuari)</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Challenging (Roopkund / Pangarchulla)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Continuous jog</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>5 km in 35 min</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>8 km in 50 min</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Loaded walk (8 kg pack)</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>10 km in 2.5 hours</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>15 km in 3.5 hours</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Stair climb (continuous)</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>30 floors in 20 min</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>50 floors in 30 min</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Back-to-back walk days</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>2 consecutive days, 12 km each</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3 consecutive days, 15 km each</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Bodyweight squats</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3 × 25 reps</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3 × 40 reps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 8-WEEK PLAN: MODERATE ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            8-Week Plan: Moderate Treks (Brahmatal &amp; Kuari Pass)
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            This plan assumes a baseline of normal activity (walking, occasional gym) but no structured endurance training.
            4 training days per week. Rest days are not optional — they prevent overuse injury.
            If you are new to Himalayan trekking, read the{' '}
            <Link href="/blog/beginner-to-advanced-trek-progression-garhwal" style={{ color: 'var(--color-primary)' }}>
              beginner to advanced trek progression
            </Link>{' '}
            to understand where Brahmatal and Kuari Pass sit in the overall difficulty scale.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Weeks 1–2: Build Base</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            <li><strong>3× cardio:</strong> Jog or brisk walk 3–5 km. Target: continuous movement for 30–40 minutes without stopping.</li>
            <li><strong>1× strength:</strong> Bodyweight circuit — 3 rounds of 20 squats, 10 lunges per leg, 30-second wall sit, 15 step-ups per leg.</li>
            <li><strong>Weekend:</strong> One longer walk — 8–10 km on varied terrain (park, trail, hills) with a daypack containing 3–5 kg.</li>
          </ul>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Weeks 3–4: Build Duration</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            <li><strong>3× cardio:</strong> Jog 4–6 km. Introduce 1 interval session: 5 × 3-minute hard effort with 2-minute recovery.</li>
            <li><strong>1× strength:</strong> Add weighted step-ups (backpack with 5–8 kg), calf raises, and 60-second plank holds.</li>
            <li><strong>Weekend:</strong> Back-to-back walking days — 10 km Saturday, 8 km Sunday, both with 5–8 kg pack.</li>
          </ul>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Weeks 5–6: Build Intensity</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            <li><strong>3× cardio:</strong> One long jog (6–8 km), one interval session, one stairmaster/stair climb session (30+ minutes).</li>
            <li><strong>1× strength:</strong> Increase to 4 rounds. Add single-leg squats (pistol progressions) and loaded lunges.</li>
            <li><strong>Weekend:</strong> One simulation day — walk 12–15 km with trekking pack (8 kg), include hill sections if available. Include 500+ m elevation gain if possible.</li>
          </ul>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Weeks 7–8: Taper &amp; Test</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            <li><strong>Week 7:</strong> Run benchmark tests (see table above). If you hit moderate targets, you are ready. If not, extend training by 1–2 weeks.</li>
            <li><strong>Week 8:</strong> Reduce volume by 40%. Light jogs, easy walks, flexibility work. Arrive at the trailhead rested, not fatigued.</li>
          </ul>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            If you are training for the{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal Trek</Link>,
            emphasise cold-weather endurance — add outdoor sessions in colder hours and practice layering on the move.
            For the{' '}
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>Kuari Pass Trek</Link>,
            focus on sustained ridge walking — longer weekend hikes with moderate elevation gain build the right stamina.
          </p>
        </section>

        {/* ── 8-WEEK PLAN: CHALLENGING ──────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            8-Week Plan: Challenging Treks (Roopkund &amp; Pangarchulla)
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            This plan assumes you have already completed a moderate Himalayan trek or equivalent multi-day endurance activity.
            If starting from scratch, complete the moderate plan first, then add 4 weeks of this programme.
            5 training days per week. For context on what separates these routes from lower treks, see our guide to{' '}
            <Link href="/blog/high-altitude-treks-garhwal-above-4000m" style={{ color: 'var(--color-primary)' }}>
              high-altitude treks above 4,000m in Garhwal
            </Link>.
            Not sure which challenging route suits you? The{' '}
            <Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)' }}>
              Roopkund vs Pangarchulla breakdown
            </Link>{' '}
            compares summit difficulty, permit requirements, and best seasons.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Weeks 1–2: Endurance Foundation</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            <li><strong>3× cardio:</strong> Run 5–8 km at conversational pace. Include 1 hill repeat session (6 × 2-minute hill sprints).</li>
            <li><strong>2× strength:</strong> Heavy lower body — weighted squats, loaded step-ups (10 kg pack), single-leg deadlifts, calf raises. Core work: plank variations, Russian twists, dead bugs.</li>
            <li><strong>Weekend:</strong> Long hike — 12–15 km with 10 kg pack, targeting 600–800 m elevation gain.</li>
          </ul>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Weeks 3–4: Volume &amp; Consecutive Days</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            <li><strong>3× cardio:</strong> One long run (8–10 km), one interval session (8 × 3-minute hard), one sustained stair climb (40+ minutes).</li>
            <li><strong>2× strength:</strong> Increase load. Add box step-ups with 12 kg pack. Bulgarian split squats. 90-second plank holds.</li>
            <li><strong>Weekend:</strong> Back-to-back-to-back — Fri 10 km, Sat 15 km, Sun 10 km, all with pack. This simulates multi-day fatigue.</li>
          </ul>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Weeks 5–6: Peak Training</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            <li><strong>Summit simulation (Pangarchulla-specific):</strong> One session per week — climb 1,000 m elevation in under 3 hours. Use a tall building, hill, or stairmaster at maximum incline with 10–12 kg pack.</li>
            <li><strong>Consecutive-day endurance:</strong> 3 days of 12–15 km walking/running. Log total weekly distance of 50+ km.</li>
            <li><strong>Strength maintenance:</strong> 2 sessions, same exercises but maintaining load — not increasing. Focus on recovery quality.</li>
          </ul>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Weeks 7–8: Taper &amp; Final Test</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            <li><strong>Week 7:</strong> Run all benchmark tests. Hit the challenging column targets. One final long simulation hike (15+ km, 800+ m gain).</li>
            <li><strong>Week 8:</strong> Reduce volume by 50%. Light runs, easy walks, yoga or stretching. Focus on sleep quality (8+ hours). Arrive at Lohajung or Joshimath rested and fuelled.</li>
          </ul>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            If you are preparing for the{' '}
            <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>Roopkund Trek</Link>,
            prioritise multi-day endurance — your body must sustain effort across seven consecutive days above 3,500 m.
            For the{' '}
            <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>Pangarchulla Peak</Link>{' '}
            summit, focus on explosive climbing power and summit-day simulation — the single hardest day on any Garhwal trek.
          </p>
        </section>

        {/* ── GEAR CHECKLIST ────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Complete Gear Checklist
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Gear requirements differ between moderate winter treks and challenging high-altitude routes.
            This summary covers the essentials. For a complete, print-ready list organised by category and
            difficulty badge, see the{' '}
            <Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: 'var(--color-primary)' }}>
              Garhwal trek packing checklist
            </Link>.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Essential (All Garhwal Treks)</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, marginBottom: '1rem' }}>
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

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Winter / Snow Treks (Brahmatal, Dec–Mar)</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            <li>Gaiters (knee-height, waterproof)</li>
            <li>Microspikes or light crampons</li>
            <li>Down jacket rated to −10°C</li>
            <li>4-season sleeping bag (comfort rating −15°C or lower)</li>
            <li>Thermal base layers (top and bottom)</li>
            <li>Hand warmers (chemical, 2–4 pairs)</li>
            <li>Insulated water bottle cover (prevents freezing)</li>
          </ul>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Challenging / Summit Treks (Roopkund, Pangarchulla)</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            <li>Full crampons (12-point, provided by operator on Pangarchulla)</li>
            <li>Gaiters (mandatory for snow approaches)</li>
            <li>4-season sleeping bag (comfort −20°C for Pangarchulla summit camp)</li>
            <li>Expedition-weight thermal layers</li>
            <li>Altitude medication — Diamox 125 mg (physician prescribed, start 24 hours before ascent above 3,500m)</li>
            <li>Pulse oximeter (pocket-sized, for monitoring SpO2 above 4,000m)</li>
            <li>Energy gels or bars (summit day — you cannot cook above 4,200m in wind)</li>
          </ul>
        </section>

        {/* ── ALTITUDE ACCLIMATISATION ──────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Altitude Acclimatisation Strategy
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            No amount of sea-level fitness replaces proper acclimatisation. The human body needs time to adapt
            to reduced oxygen pressure at altitude. The golden rule: <strong>climb high, sleep low</strong>.
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', lineHeight: 1.7 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Altitude Zone</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>AMS Risk</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Acclimatisation Rule</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Relevant Treks</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}>2,500–3,500m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Low</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>No special measures. Stay hydrated (3–4 L/day).</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Trail start for all 4 treks</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,500–4,000m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Do not ascend more than 500m sleeping altitude per day. Rest day every 3rd day.</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Brahmatal summit, Kuari Pass</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4,000–4,500m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>High</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Mandatory acclimatisation day before pushing higher. Monitor SpO2 — descend if below 80%.</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Pangarchulla approach, Roopkund upper camps</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4,500–5,000m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Very High</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Summit push only. Do not sleep at this altitude. Descend same day.</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Roopkund lake (4,800m), Pangarchulla summit (4,590m)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.5rem' }}>AMS Warning Signs — When to Turn Back</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            <li><strong>Mild AMS:</strong> Persistent headache not relieved by ibuprofen, loss of appetite, mild nausea, difficulty sleeping. Action: do not ascend further until symptoms resolve.</li>
            <li><strong>Moderate AMS:</strong> Severe headache, vomiting, extreme fatigue at rest, ataxia (unsteady walking). Action: descend immediately by at least 500m.</li>
            <li><strong>Severe AMS (HACE/HAPE):</strong> Confusion, inability to walk straight, persistent cough with pink/frothy sputum, blue lips. Action: emergency descent. This is life-threatening.</li>
          </ul>
          <p style={{ lineHeight: 1.8 }}>
            All guided{' '}
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)' }}>
              Garhwal trekking routes
            </Link>{' '}
            include trained leaders who monitor group members for AMS symptoms and carry
            emergency communication equipment.
          </p>
        </section>

        {/* ── NUTRITION ─────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Nutrition &amp; Hydration on Trail
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            <li><strong>Daily calorie requirement:</strong> 3,000–4,000 kcal while trekking (vs ~2,000 kcal at rest). You will undereat if you rely on appetite alone — eat on schedule, not hunger.</li>
            <li><strong>Hydration target:</strong> 3–4 litres per day. Above 4,000m, increase to 4–5 litres. Dehydration amplifies AMS symptoms. Carry purification tablets as backup.</li>
            <li><strong>Carbohydrate loading:</strong> 60–70% of calories from carbs during the trek. Rice, chapati, pasta, porridge, energy bars. Your body burns glycogen rapidly at altitude.</li>
            <li><strong>Trail snacks:</strong> Carry 500–800 kcal of portable food per day — trail mix, dates, glucose biscuits, chocolate, energy gels. Summit day on Pangarchulla requires fast-access calories.</li>
            <li><strong>Avoid:</strong> Alcohol (impairs acclimatisation), excessive caffeine (diuretic at altitude), heavy fatty meals before climb days.</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Plan My Garhwal Trek"
          subtext="Share your fitness level and preferred dates. We will recommend the right route and preparation timeline."
          vertical="trek"
          category="fitness"
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
            Choose Your Trek
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2 }}>
            <li><Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Garhwal Trekking Routes — Overview &amp; Comparison →</Link></li>
            <li><Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal vs Kuari Pass — Moderate Trek Comparison →</Link></li>
            <li><Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund vs Pangarchulla — Challenging Trek Comparison →</Link></li>
            <li><Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Print-Ready Packing Checklist →</Link></li>
            <li><Link href="/blog/beginner-to-advanced-trek-progression-garhwal" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Beginner to Advanced — The Garhwal Progression Path →</Link></li>
            <li><Link href="/blog/high-altitude-treks-garhwal-above-4000m" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>High Altitude Treks Above 4,000m →</Link></li>
          </ul>
        </section>

      </article>
    </TrackedPage>
  );
}
