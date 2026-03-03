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

const PATH = '/treks/best-trek-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: '12 Best Treks in Uttarakhand (2026 Guide) — Snow, Valley & Weekend Picks',
    description:
      'Looking for the best trek in Uttarakhand? Compare snow treks, valley routes, weekend escapes and beginner-friendly Himalayan hikes. Ranked by season, difficulty and duration to help you choose fast.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: '12 Best Treks in Uttarakhand (2026) — Snow, Valley & Weekend Picks',
      description:
        'Looking for the best trek in Uttarakhand? Compare snow treks, valley routes, weekend escapes and beginner-friendly Himalayan hikes. Ranked by season, difficulty and duration.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is the best trek in Uttarakhand?',
    answer:
      'Kedarkantha is the best overall trek in Uttarakhand. It combines accessibility (suitable for beginners), a defined summit objective (3,800 metres), spectacular Himalayan panoramas, and year-round availability with peak conditions in winter. It is the most popular guided trek in northern India for good reason — the reward-to-effort ratio is unmatched. For valley trekking, Har Ki Dun is the best option. For a day trek, Tiger Fall in Chakrata.',
  },
  {
    question: 'Which is the easiest trek in Uttarakhand?',
    answer:
      'Tiger Fall Trek in Chakrata is the easiest. It stays between 1,800 and 2,200 metres, covers 12 km on well-defined forest trails, and requires no prior trekking experience. Completable in a single day. For a multi-day beginner trek with a summit, Kedarkantha is the strongest choice — moderate effort spread over four days with guided support throughout.',
  },
  {
    question: 'What is the best time to trek in Uttarakhand?',
    answer:
      'October to November is the best overall window — clear skies, dry trails, comfortable temperatures, and peak Himalayan visibility. For snow treks, December to February is ideal (Kedarkantha). For valley treks, May to June is best (Har Ki Dun). Each season offers a different character, and the best time depends on the trek you choose.',
  },
  {
    question: 'How do I choose between Kedarkantha and Har Ki Dun?',
    answer:
      'Choose Kedarkantha if you want a summit, snow, and a 4-day commitment. Choose Har Ki Dun if you prefer valleys, green meadows, and a 6-day immersive walk. Kedarkantha is best in winter (December to March). Har Ki Dun is best in summer (May to June). Both start from Sankri. Both are accessible to beginners. The choice comes down to season, duration, and whether you prefer a peak or a valley.',
  },
  {
    question: 'Can beginners trek in Uttarakhand?',
    answer:
      'Yes. Uttarakhand has the widest range of beginner-friendly treks in the Indian Himalayas. Tiger Fall and Budher Caves in Chakrata require no prior experience. Kedarkantha is the most popular first summit trek in India. Har Ki Dun is accessible to anyone with moderate fitness. All are available as guided packages with professional support, meals, and equipment included.',
  },
  {
    question: 'How much does trekking in Uttarakhand cost?',
    answer:
      'Trek package costs depend on duration, season, group size, and transport inclusion. Short 3-day Chakrata packages are the most affordable. Multi-day Kedarkantha and Har Ki Dun packages cost more due to additional camping, meals, and guide days. Group bookings reduce per-person cost. All packages include guide, meals, permits, and camping equipment. Transport from Delhi is available as an optional add-on.',
  },
];

export default function BestTrekInUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Best Treks in Uttarakhand', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Treks in Uttarakhand',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: 5,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Kedarkantha Trek',
        url: buildCanonicalUrl('/treks/location/sankri/kedarkantha-trek'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Har Ki Dun Trek',
        url: buildCanonicalUrl('/treks/location/sankri/har-ki-dun-trek'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Tiger Fall Trek in Chakrata',
        url: buildCanonicalUrl('/treks/location/chakrata/tiger-fall-trek'),
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Budher Caves Trek in Chakrata',
        url: buildCanonicalUrl('/treks/location/chakrata/budher-caves-trek'),
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Kedarkantha vs Har Ki Dun Comparison',
        url: buildCanonicalUrl('/treks/kedarkantha-vs-har-ki-dun'),
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '12 Best Treks in Uttarakhand (2026 Guide)',
    description:
      'Looking for the best trek in Uttarakhand? Compare snow treks, valley routes, weekend escapes and beginner-friendly Himalayan hikes. Ranked by season, difficulty and duration to help you choose fast.',
    url: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Retreats And Treks',
    },
    about: {
      '@type': 'Thing',
      name: 'Himalayan trekking in Uttarakhand',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2'],
    },
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          breadcrumbSchema,
          faqSchema,
          itemListSchema,
          webPageSchema,
        ]) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Treks', href: '/treks' },
          { name: 'Best Treks in Uttarakhand' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Best Treks in Uttarakhand: Top Himalayan Routes Ranked by Season &amp; Difficulty
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Uttarakhand is home to India&rsquo;s most diverse and accessible Himalayan
            trekking routes — from snow-covered summit climbs to green river valleys
            and short weekend waterfall trails. The challenge is not finding a trek.
            It&rsquo;s choosing the right one for your season, fitness level and
            available time.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            This ranked guide breaks down the best treks in Uttarakhand by snow
            experience, valley beauty, duration, difficulty and proximity to Delhi.
            Whether you want a winter summit, a summer meadow walk or a three-day
            mountain escape, you&rsquo;ll find the right route below.
          </p>
        </header>

        <PrimaryCTA
          label="Plan My Trek"
          subtext="Know which trek is right for you? Let a mountain planner help."
          vertical="trek"
          category="apex"
          sourcePath={PATH}
        />

        {/* ── TOP ROUTES ───────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Top Trek Routes in Uttarakhand
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The routes below are ranked by overall quality — a composite of
            accessibility, scenic reward, guide infrastructure, and year-round
            availability. Summit treks test vertical ambition, valley treks reward
            sustained immersion, and day treks offer Himalayan contact with zero
            logistical overhead. Each category serves a different intent, and the
            best trek for you depends on which dimension matters most.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Kedarkantha Trek
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>
              Kedarkantha Trek
            </Link>{' '}
            is the single best trek in Uttarakhand for most people. Four days from{' '}
            <Link href="/treks/location/sankri" style={{ color: 'var(--color-primary)' }}>
              Sankri trek base
            </Link>{' '}
            to a 3,800-metre summit with panoramic views across six Himalayan ranges. Snow
            summit in winter, green ridge walk in summer. Accessible to beginners. Guided
            throughout. The reward-to-effort ratio is unmatched at this difficulty level —
            you stand on a Himalayan peak within 48 hours of leaving Delhi.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Har Ki Dun Trek
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)' }}>
              Har Ki Dun Trek
            </Link>{' '}
            is the best valley trek in northern India. Six days through the Tons Valley —
            forest, village, meadow, and glacial amphitheatre. Also based in Sankri.
            Best in summer when the valley is green and flowering. If Kedarkantha is about
            a single peak moment, Har Ki Dun is about sustained immersion — five days of
            changing landscape that builds to one of the most spectacular valleys in the
            Himalayas. Choosing between the two? See our{' '}
            <Link href="/treks/kedarkantha-vs-har-ki-dun" style={{ color: 'var(--color-primary)' }}>
              Kedarkantha vs Har Ki Dun
            </Link>{' '}
            comparison.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Tiger Fall &amp; Chakrata Treks
          </h3>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            The{' '}
            <Link href="/treks/location/chakrata" style={{ color: 'var(--color-primary)' }}>
              Chakrata trek base
            </Link>{' '}
            offers the easiest Himalayan treks — Tiger Fall (12 km forest walk to a major
            waterfall) and Budher Caves (10 km to ancient limestone caves). No altitude
            concerns, no multi-day commitment, no prior experience required. These are the
            entry point for anyone testing whether Himalayan trekking is for them.
          </p>
        </section>

        <PrimaryCTA
          label="Speak With a Mountain Planner"
          subtext="Ready to start planning? Tell us your dates and preferences."
          vertical="trek"
          category="apex"
          sourcePath={PATH}
        />

        {/* ── BY SEASON ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Treks by Season
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Season determines which treks are at their best — and which are accessible at
            all. The two primary windows are winter and summer, each with a distinct
            character.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Winter (December to February).</strong>{' '}
            <Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              Winter treks in Uttarakhand
            </Link>{' '}
            mean snow. Kedarkantha is the definitive winter trek — snow-covered forest,
            frozen meadows, and a summit panorama sharpened by cold, clear air. Chakrata
            trails are also walkable in winter with occasional frost and quiet, cold-air
            forest conditions. Winter trekking requires proper layering and guided support
            but delivers the most dramatic landscapes of any season.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>Summer (May to June).</strong>{' '}
            <Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              Summer treks in Uttarakhand
            </Link>{' '}
            mean green valleys, wildflower meadows, and comfortable temperatures. Har Ki
            Dun is at its best — the valley is open, the rivers are flowing, and the trail
            is dry and defined. Chakrata forest trails are shaded and cool while the plains
            bake. Summer is the most forgiving season for first-time trekkers — no snow
            gear, long daylight, and gentle conditions throughout.
          </p>
        </section>

        {/* ── BY DIFFICULTY & DURATION ──────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Treks by Difficulty and Duration
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Beginner / 1–2 days.</strong> Tiger Fall and Budher Caves in Chakrata.
            No prior experience needed. Completable in a day trip or comfortable overnight.
            The lowest entry barrier to Himalayan trekking. See the full{' '}
            <Link href="/treks/beginner-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              beginner treks in Uttarakhand
            </Link>{' '}
            guide for detailed options.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Beginner-Moderate / 3 days.</strong> The{' '}
            <Link href="/treks/3-day-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              3-day treks in Uttarakhand
            </Link>{' '}
            format — two nights, three days — is the sweet spot for weekend trekkers.
            Tiger Fall and Budher Caves fit naturally into a 3-day itinerary with travel
            days included. A compressed Kedarkantha is possible for fit, experienced
            trekkers.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Moderate / 4 days.</strong> Kedarkantha in its standard format. The
            ideal duration for a first summit trek — gradual acclimatisation, progressive
            daily challenge, and a peak reward on day three.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>Moderate / 6 days.</strong> Har Ki Dun. The full valley experience.
            Longer daily distances, sustained effort over almost a week, and the deepest
            mountain immersion available on a beginner-to-moderate trail in Uttarakhand.
          </p>
        </section>

        {/* ── HOW TO CHOOSE ────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            How to Choose the Right Trek
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Three questions determine the right trek for you.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>When are you going?</strong> December to February points to Kedarkantha.
            May to June points to Har Ki Dun. October to November works for everything.
            Season narrows your options immediately.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>How many days do you have?</strong> One to two days: Chakrata. Three
            days: Tiger Fall or Budher Caves with travel. Four days: Kedarkantha. Six days:
            Har Ki Dun. Duration determines format.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>What do you want from the experience?</strong> A summit: Kedarkantha.
            A valley: Har Ki Dun. A waterfall: Tiger Fall. A cave: Budher Caves. A snow
            experience: winter Kedarkantha. A green landscape: summer Har Ki Dun. The
            destination shapes the memory.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            In short: season sets the shortlist, duration filters it, and personal
            objective — summit, valley, waterfall, cave — determines the final pick.
            Most first-timers should default to Kedarkantha (winter) or Har Ki Dun
            (summer) and build from there. Weekend travellers with limited days
            should start with a{' '}
            <Link href="/treks/3-day-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              3-day trek in Uttarakhand
            </Link>{' '}
            from Chakrata before committing to a longer route.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            If you are still deciding, start with Kedarkantha. It is the most complete
            single trek in Uttarakhand — summit, snow, forest, and panorama in four days.
            Everything else follows naturally from there. For{' '}
            <Link href="/treks/trek-near-delhi" style={{ color: 'var(--color-primary)' }}>
              weekend treks near Delhi
            </Link>
            , Chakrata is the practical starting point.
          </p>
          <p style={{ lineHeight: 1.8, marginTop: '1rem', margin: 0 }}>
            All featured treks fall within an altitude range of 2,000 to 3,800 metres. Below 2,500 metres — Chakrata, lower Har Ki Dun sections — trails remain below the tree line, passing through dense deodar, oak, and rhododendron forest with reliable canopy cover. Above 3,000 metres, you cross the tree line into open alpine meadow and exposed ridgeline. The permanent snow line in western Uttarakhand sits between 3,400 and 3,800 metres depending on season; Kedarkantha&apos;s summit sits right at this threshold. No permits are required for Kedarkantha or Tiger Fall. Har Ki Dun requires a Govind Pashu Vihar National Park entry permit, obtainable at Sankri. All guided operators hold valid adventure-tourism certification under Uttarakhand state licensing, and lead guides carry Wilderness First Responder or equivalent mountain safety credentials.
          </p>
        </section>

        {/* ── BOOKING ──────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Booking Trek Packages
          </h2>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            All treks are available as{' '}
            <Link href="/treks/trek-packages-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              all-inclusive trek packages
            </Link>{' '}
            — certified guide, meals, accommodation, permits, and safety gear included.
            Packages are available for individuals joining group departures, private groups,
            corporate teams, and student batches. Transport from Delhi is available as an
            add-on. See the full{' '}
            <Link href="/treks" style={{ color: 'var(--color-primary)' }}>
              Himalayan treks directory
            </Link>{' '}
            for detailed itineraries across all routes and seasons.
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
