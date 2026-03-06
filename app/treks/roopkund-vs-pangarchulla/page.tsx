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
      <nav aria-label="Discovery trail" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
        <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
          Best Treks in Uttarakhand
        </Link>
        {' → '}
        <Link href="/treks/best-treks-in-uttarakhand/challenging" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
          Challenging Treks
        </Link>
        {' → '}
        <span>Roopkund vs Pangarchulla</span>
      </nav>

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Roopkund vs Pangarchulla: Which Challenging Garhwal Trek Is Right for You?
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            If you have completed moderate treks like{' '}
            <Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)' }}>
              the Brahmatal or Kuari Pass routes
            </Link>{' '}
            and are ready to step into challenging territory, the{' '}
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)' }}>
              Garhwal trekking region
            </Link>{' '}
            offer two outstanding options: the{' '}
            <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>
              Roopkund mystery lake expedition
            </Link>{' '}
            and the{' '}
            <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>
              Pangarchulla Peak summit climb
            </Link>.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Both are rated challenging, both exceed 4,500 metres, and both demand prior high-altitude
            experience. But they test different skills, occur in different seasons, and deliver
            fundamentally different types of mountain achievement. This comparison helps you decide
            which challenge matches your experience and ambition. For the full range of routes from
            easy to expedition-grade, see our{' '}
            <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              Uttarakhand trekking guide
            </Link>.
          </p>
        </header>

        {/* ── AT A GLANCE TABLE ────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            At a Glance
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', lineHeight: 1.7 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem', width: '25%' }}></th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Roopkund</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Pangarchulla</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Base Town</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/lohajung" style={{ color: 'var(--color-primary)' }}>Lohajung</Link> (2,350 m)</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/joshimath" style={{ color: 'var(--color-primary)' }}>Joshimath</Link> (1,875 m)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Max Altitude</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4,800 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4,590 m</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Distance</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>53 km</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>32 km</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Duration</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>7 days</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>6 days</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Difficulty</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Challenging</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Challenging</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Best Season</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>May–Jun, Sep–Oct</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Mar–May</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Type</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Expedition (lake destination)</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Summit climb (peak)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Special Gear</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Standard high-altitude kit</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Crampons, gaiters required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <PrimaryCTA
          label="Help Me Choose"
          subtext="Share your experience level and dates. We will recommend the right challenging trek."
          vertical="trek"
          category="comparison"
          sourcePath="/treks/roopkund-vs-pangarchulla"
        />

        {/* ── EXPERIENCE COMPARISON ────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            The Experience: Expedition vs Summit
          </h2>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Roopkund — The Mystery Lake Expedition
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Roopkund is a journey trek. The destination — the glacial lake at 4,800 metres with its
            mysterious ancient skeletal remains — is the goal, but the route itself is rich in terrain
            transitions. You cross Bedni Bugyal (one of India&apos;s largest alpine meadows), ascend
            through exposed high-altitude moraine, and navigate terrain that changes character every
            day. The trek builds over seven days, with the altitude gain distributed across multiple
            camps.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The challenge is cumulative: day after day above 3,500 metres, sustained walking at altitude,
            and the psychological weight of increasing exposure as you move further from the trailhead.
            Roopkund tests endurance, altitude tolerance, and the ability to maintain morale across a
            week-long expedition in remote terrain. The final approach to the lake is steep and exposed
            but not technical.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Pangarchulla — The Summit Climb
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Pangarchulla is a peak trek. The first three days follow the scenic but non-technical
            Kuari Pass approach through forests and meadows. Then it diverges. Day five is summit day:
            a 3 AM alpine start from Khullara camp, a 700-metre climb through steep snow and scree,
            and arrival on a narrow peak with 360° views of the Nanda Devi Sanctuary.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The challenge is concentrated rather than distributed. You spend three days acclimatising on
            the moderate Kuari Pass trail, then everything compresses into one brutal summit push. It
            demands peak fitness on a single day, comfort with steep snow climbing at altitude, and
            the mental resilience to continue climbing in pre-dawn cold. You use crampons. You carry
            a headlamp. You push through physical limits. The reward — standing on a true summit — is a
            fundamentally different feeling from reaching a lake or a pass.
          </p>
        </section>

        {/* ── FITNESS & PREPARATION ────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Fitness &amp; Preparation Requirements
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>For Roopkund:</strong> 6–8 weeks of structured preparation. Daily cardio (running,
            cycling, or swimming) for cardiovascular base. Weekend hill hikes with a 10–12 kg pack for
            trail-specific conditioning. Core strength work for stability on uneven terrain. The
            seven-day duration means your body must sustain effort across multiple consecutive days
            at altitude — stamina matters more than peak power.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>For Pangarchulla:</strong> 6–8 weeks of preparation with emphasis on explosive
            climbing power. Stairmaster sessions, hill repeats, and loaded pack training for the
            summit day. Single-day fitness matters more than multi-day stamina — you need to climb
            700 metres in 4–5 hours at altitude after a 3 AM start. Core strength and balance are
            critical for the snow approach. If you can power-hike a 1,000 m elevation gain in under
            3 hours at sea level with a pack, you are ready.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Prior experience requirement for both:</strong> At least one completed trek above
            4,000 metres. Comfort with cold-weather camping (sub-zero temperatures). Mental readiness
            for sustained physical exertion in thin air. If you have completed{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal</Link>{' '}
            or{' '}
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>Kuari Pass</Link>,
            you have the altitude foundation — but both Roopkund and Pangarchulla require a meaningful
            step up in fitness and commitment.
          </p>
        </section>

        {/* ── ALTITUDE SAFETY ──────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Altitude &amp; Safety Considerations
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Both treks operate well above 4,000 metres where Acute Mountain Sickness (AMS) risk is real:
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Roopkund (4,800 m):</strong> The highest point in this comparison. You spend 2–3
            days above 4,000 metres, which gives AMS more opportunity to develop. The altitude gain is
            gradual across the seven-day itinerary, which helps — but the final push to the lake at
            4,800 m is the critical zone. Guided operators carry pulse oximeters and follow descent
            protocols if symptoms appear.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Pangarchulla (4,590 m):</strong> Lower maximum altitude, but the summit push involves
            rapid altitude gain on a single day (Khullara camp at ~3,870 m to summit at 4,590 m). The
            acclimatisation profile depends heavily on the rest day at Khullara. The combination of
            altitude, cold, and extreme exertion on summit day creates a unique physiological stress.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Both treks:</strong> Diamox prophylaxis may be recommended by your physician.
            Hydration (3–4 litres daily above 3,500 m), gradual ascent, and willingness to turn back
            if symptoms worsen are non-negotiable safety principles. Choose guided operators with
            certified trek leaders and emergency communication equipment.
          </p>
        </section>

        <PrimaryCTA
          label="Plan My Challenging Trek"
          subtext="Experienced trekker? Tell us your altitude history and we will recommend the right route."
          vertical="trek"
          category="comparison"
          sourcePath="/treks/roopkund-vs-pangarchulla"
        />

        {/* ── SEASONAL WINDOWS ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Season &amp; Weather
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Roopkund</strong> has two distinct windows: pre-monsoon (May–June) and post-monsoon
            (September–October). Pre-monsoon offers warmer conditions but more afternoon cloud.
            Post-monsoon delivers sharper visibility and fewer trekkers. The monsoon gap (July–August)
            makes Roopkund entirely unavailable for a quarter of the year.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Pangarchulla</strong> has a single window: March to May. March and early April offer
            consolidated snow for the summit — the best conditions for crampon grip. Late April and May
            are warmer but the snow line rises, potentially exposing loose scree on the summit approach.
            The trek is not viable in monsoon, post-monsoon, or winter.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Overlap:</strong> May is the only month where both are available. If you have a
            fixed May window and are deciding between them, the choice reduces to: do you want a
            week-long expedition to a mystery lake, or a summit climb with a concentrated challenge?
          </p>
        </section>

        {/* ── WHO SHOULD CHOOSE WHICH ──────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Should Choose Which
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Choose Roopkund if:</strong>
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>You want an extended expedition experience (7 days on trail)</li>
            <li>You are drawn to iconic destinations (the mystery lake)</li>
            <li>Your fitness favours sustained endurance over explosive power</li>
            <li>You prefer pre-monsoon or post-monsoon seasons</li>
            <li>You have completed at least one trek above 4,000 m</li>
          </ul>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Choose Pangarchulla if:</strong>
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>You want a true summit experience (standing on a peak)</li>
            <li>You thrive on concentrated, high-intensity challenges</li>
            <li>You are comfortable with crampons, alpine starts, and steep snow</li>
            <li>You prefer a spring trekking window (March–May)</li>
            <li>You have completed Kuari Pass or equivalent and want the next step</li>
          </ul>
        </section>

        {/* ── PROGRESSION PATH ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            The Garhwal Progression
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Both Roopkund and Pangarchulla sit at the top of the Garhwal difficulty spectrum. The
            natural progression for most trekkers through the region looks like this:
          </p>
          <ol style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal</Link>{' '}
              (Moderate, 3,850 m) — winter snow trek introduction
            </li>
            <li>
              <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>Kuari Pass</Link>{' '}
              (Moderate, 3,876 m) — panoramic ridge walk
            </li>
            <li>
              <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>Roopkund</Link>{' '}
              (Challenging, 4,800 m) — extended high-altitude expedition
            </li>
            <li>
              <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>Pangarchulla</Link>{' '}
              (Challenging, 4,590 m) — true summit experience
            </li>
          </ol>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            You do not need to follow this order rigidly, but each trek builds skills and altitude
            confidence that the next one demands. See our{' '}
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)' }}>
              Garhwal Himalayas trekking guide
            </Link>{' '}
            for the full picture.
          </p>
        </section>

        <PrimaryCTA
          label="Plan My Trek"
          subtext="Share your altitude history and preferred dates. We will recommend the right route."
          vertical="trek"
          category="comparison"
          sourcePath="/treks/roopkund-vs-pangarchulla"
        />

        {/* ── FAQs ─────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </section>

        {/* ── EXPLORE MORE ─────────────────────────────────────────── */}
        <section style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
            Explore More
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2 }}>
            <li><Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Best Treks in Uttarakhand — Complete Guide →</Link></li>
            <li><Link href="/treks/best-treks-in-uttarakhand/challenging" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Challenging Treks in Uttarakhand →</Link></li>
            <li><Link href="/treks/best-treks-in-uttarakhand/high-altitude" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>High-Altitude Treks Above 4,000 m →</Link></li>
            <li><Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Garhwal Himalayas Trekking Guide →</Link></li>
            <li><Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>8-Week Fitness Preparation Plan →</Link></li>
            <li><Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Packing Checklist — Print-Ready Gear List →</Link></li>
            <li><Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Moderate Garhwal Treks: Brahmatal vs Kuari Pass →</Link></li>
            <li><Link href="/treks/location/lohajung" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>All treks from Lohajung →</Link></li>
            <li><Link href="/treks/location/joshimath" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>All treks from Joshimath →</Link></li>
            <li><Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Summer Treks in Uttarakhand →</Link></li>
            <li><Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Best Treks in Uttarakhand →</Link></li>
          </ul>
        </section>

      </article>
    </TrackedPage>
  );
}
