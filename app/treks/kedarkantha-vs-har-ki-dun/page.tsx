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
      <nav aria-label="Discovery trail" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
        <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
          Best Treks in Uttarakhand
        </Link>
        {' → '}
        <Link href="/treks/best-treks-in-uttarakhand/snow" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
          Snow Treks
        </Link>
        {' → '}
        <span>Kedarkantha vs Har Ki Dun</span>
      </nav>

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Kedarkantha vs Har Ki Dun: Which Trek Should You Choose?
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Both treks start from the same place —{' '}
            <Link href="/treks/location/sankri" style={{ color: 'var(--color-primary)' }}>
              Sankri trek base
            </Link>
            , the primary trek base in Uttarakhand&apos;s Tons Valley. Both are among the
            most popular Himalayan treks in India. And both are accessible to first-time
            trekkers. But the experience they deliver is fundamentally different: the{' '}
            <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>
              Kedarkantha Trek
            </Link>{' '}
            is a snow summit, while the{' '}
            <Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)' }}>
              Har Ki Dun Trek
            </Link>{' '}
            is a green valley journey. One is a four-day sprint to a peak,
            the other is a six-day walk through a glacial corridor. Choosing between them
            is not about which is better — it is about which is right for you. Both are
            featured in our{' '}
            <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              top trekking routes in Uttarakhand
            </Link>.
          </p>
        </header>

        {/* ── QUICK COMPARISON ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Quick Comparison Overview
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', lineHeight: 1.7 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600 }}>Factor</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600 }}>Kedarkantha</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600 }}>Har Ki Dun</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>Type</td>
                  <td style={{ padding: '0.75rem 1rem' }}>Summit trek</td>
                  <td style={{ padding: '0.75rem 1rem' }}>Valley trek</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: '#fafafa' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>Duration</td>
                  <td style={{ padding: '0.75rem 1rem' }}>4–5 days</td>
                  <td style={{ padding: '0.75rem 1rem' }}>6–7 days</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>Max Altitude</td>
                  <td style={{ padding: '0.75rem 1rem' }}>~3,800 m</td>
                  <td style={{ padding: '0.75rem 1rem' }}>~3,600 m</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: '#fafafa' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>Best Season</td>
                  <td style={{ padding: '0.75rem 1rem' }}>Winter (Dec–Mar)</td>
                  <td style={{ padding: '0.75rem 1rem' }}>Summer (May–Jun)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>Difficulty</td>
                  <td style={{ padding: '0.75rem 1rem' }}>Moderate-beginner</td>
                  <td style={{ padding: '0.75rem 1rem' }}>Moderate</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: '#fafafa' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>Landscape</td>
                  <td style={{ padding: '0.75rem 1rem' }}>Snow summit + forest</td>
                  <td style={{ padding: '0.75rem 1rem' }}>River valley + meadows</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>Base</td>
                  <td style={{ padding: '0.75rem 1rem' }}>Sankri</td>
                  <td style={{ padding: '0.75rem 1rem' }}>Sankri</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── LANDSCAPE & EXPERIENCE ───────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Landscape &amp; Experience
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Kedarkantha</strong> is a concentrated experience that builds to a
            single defining moment. The{' '}
            <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>
              Kedarkantha Trek
            </Link>{' '}
            rises through dense pine and oak forest — silent and snow-covered in winter —
            crosses open alpine meadows, and ascends a final ridge to a 3,800-metre summit.
            The panorama from the top spans Swargarohini, Bandarpoonch, Black Peak, and the
            Gangotri group. On a clear winter morning, that summit view is the single most
            spectacular sight available on any beginner trek in India. The trek is four days,
            but the defining moment is twenty minutes on the peak.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>Har Ki Dun</strong> is a sustained experience that deepens over five to
            six days. The{' '}
            <Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)' }}>
              Har Ki Dun Trek
            </Link>{' '}
            follows the ancient Tons Valley through traditional Himalayan villages, across
            wooden bridges over glacial rivers, through dense forest and open meadow, and
            into the vast Har Ki Dun valley — a natural amphitheatre surrounded by
            5,000-metre peaks. There is no single peak moment. Instead, the beauty
            accumulates — each day&apos;s landscape is different from the last, and the valley
            itself, when you finally reach it, feels earned. If Kedarkantha is a photograph,
            Har Ki Dun is a film.
          </p>
        </section>

        {/* ── DIFFICULTY & FITNESS ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Difficulty &amp; Fitness Level
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Kedarkantha</strong> demands burst effort. Three days of moderate
            forest walking (5 to 6 km per day) followed by a summit push — a steep
            800-metre ascent in snow conditions, typically starting before dawn. The summit
            day is the hardest single day on either trek. But the overall commitment is
            shorter: four days total. If you are moderately fit and can handle one hard day,
            Kedarkantha is within reach. Snow adds a factor — microspikes, gaiters, and
            careful footing — but guided groups manage the technical elements.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Har Ki Dun</strong> demands sustained endurance. Daily distances average
            7 to 8 km over six days. No single day is as intense as Kedarkantha&apos;s
            summit push, but the cumulative load is higher. By day four or five, fatigue
            compresses — your legs know they have been walking. The terrain is gentler —
            no steep summit ascent, no snow gear in summer — but the duration tests a
            different kind of fitness: consistency over days, not intensity on one day.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            Both are accessible to{' '}
            <Link href="/treks/beginner-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              beginner treks in Uttarakhand
            </Link>
            . The preparation is the same: two to three weeks of daily cardio — walking,
            jogging, stair climbing. The difference is what kind of challenge you prefer.
            Short and sharp, or long and steady.
          </p>
        </section>

        {/* ── BEST SEASON ──────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Season — Winter vs Summer
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            This is the deciding factor for many trekkers. The two treks occupy opposite
            seasonal windows — and each is at its best in that window.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Kedarkantha: December to March.</strong> This is a{' '}
            <Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              winter treks in Uttarakhand
            </Link>
            . The trail is snow-covered, the forest is silent and white, and the summit
            panorama is sharpest in cold, clear winter air. Kedarkantha in summer (May) is
            possible but loses the snow immersion that defines the experience. If you are
            choosing Kedarkantha, choose December to February for the definitive version.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>Har Ki Dun: April to June and September to November.</strong> This is a{' '}
            <Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              summer treks in Uttarakhand
            </Link>
            . The valley is green, wildflowers blanket the meadows, the river runs clear,
            and the trail is dry and comfortable. Har Ki Dun in winter is spectacular but
            more demanding — snow-covered trails, colder temperatures, limited guided
            availability. Summer is when Har Ki Dun is most accessible and most beautiful.
          </p>
        </section>

        {/* ── WHO SHOULD CHOOSE WHICH ──────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Should Choose Which?
          </h2>
          <p style={{ lineHeight: 1.8, fontWeight: 600, marginBottom: '0.5rem' }}>
            Choose Kedarkantha if:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1.25rem' }}>
            <li>You want to stand on a Himalayan summit</li>
            <li>You want a snow trek experience</li>
            <li>You have 4 to 5 days available</li>
            <li>You are a first-time snow trekker seeking a guided format</li>
            <li>You prefer concentrated intensity over sustained walking</li>
            <li>You are trekking between December and March</li>
          </ul>
          <p style={{ lineHeight: 1.8, fontWeight: 600, marginBottom: '0.5rem' }}>
            Choose Har Ki Dun if:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>You prefer valleys, rivers, and meadows over summit views</li>
            <li>You enjoy longer, immersive walks through changing landscape</li>
            <li>You want summer greenery and wildflowers</li>
            <li>You dislike extreme cold or snow conditions</li>
            <li>You have 6 to 7 days available</li>
            <li>You are trekking between April and June or September and November</li>
          </ul>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            Both treks leave from{' '}
            <Link href="/treks/location/sankri" style={{ color: 'var(--color-primary)' }}>
              Sankri trek base
            </Link>
            . If you have the time, the strongest recommendation is to do both — Kedarkantha
            in winter, Har Ki Dun in summer. They are complementary experiences from the
            same base, and together they give you the full range of what Himalayan trekking
            offers.
          </p>
        </section>

        {/* ── COMMERCIAL NAVIGATION ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: '#fafafa' }}>
          <p style={{ lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
            Looking for more options? See the{' '}
            <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              complete guide to Uttarakhand treks
            </Link>, the{' '}
            <Link href="/treks/best-treks-in-uttarakhand/snow" style={{ color: 'var(--color-primary)' }}>
              snow treks filter
            </Link>{' '}
            for winter routes, or browse the full{' '}
            <Link href="/treks" style={{ color: 'var(--color-primary)' }}>
              Himalayan treks directory
            </Link>{' '}
            for guided itineraries across all seasons.
          </p>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-lg)' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </section>

      </article>
    </TrackedPage>
  );
}
