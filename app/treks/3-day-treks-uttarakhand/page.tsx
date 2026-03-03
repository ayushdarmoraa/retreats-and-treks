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

const PATH = '/treks/3-day-treks-uttarakhand';

export function generateMetadata(): Metadata {
  return {
    title: 'Best 3-Day Treks in Uttarakhand — Short Himalayan Treks (2N/3D) | Retreats And Treks',
    description:
      'Find the best 3-day treks in Uttarakhand including Tiger Fall, Budher Caves and short-format Kedarkantha. Weekend Himalayan treks within driving distance of Delhi.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Best 3-Day Treks in Uttarakhand',
      description:
        'Short Himalayan treks in Uttarakhand — 2 nights, 3 days. Forest trails, waterfall treks and cave explorations across Chakrata and Sankri, drivable from Delhi.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is the best 3-day trek in Uttarakhand?',
    answer:
      'The Tiger Fall Trek in Chakrata is the best 3-day trek in Uttarakhand for most people. It combines a well-graded forest trail, a spectacular waterfall destination, and comfortable overnight camping — all within a 2-night, 3-day format that fits a long weekend. For trekkers wanting a cave exploration component, the Budher Caves Trek offers a distinctive alternative in the same region. For experienced trekkers seeking a summit, the compressed Kedarkantha itinerary is possible in three days but requires strong fitness.',
  },
  {
    question: 'Can Kedarkantha be done in 3 days?',
    answer:
      'Yes, but it is not the standard format. The standard Kedarkantha itinerary is four days with a gradual acclimatisation schedule. A compressed three-day version is possible by combining the first two days into one longer trek day — covering the distance from Sankri to Juda Ka Talab and then to the base camp in a single push. This requires above-average fitness and fast acclimatisation. Most guided operators offer the four-day format as default. The three-day option is best suited for trekkers with prior Himalayan experience.',
  },
  {
    question: 'Are 3-day treks beginner-friendly?',
    answer:
      'Yes. Three-day treks are the ideal introduction to Himalayan trekking. The duration is short enough that fatigue does not accumulate, but long enough for genuine mountain immersion — forest trails, overnight camping, and summit or waterfall destinations. Tiger Fall and Budher Caves in Chakrata require no prior trekking experience. Basic fitness — the ability to walk four to five hours per day on uneven terrain — is sufficient.',
  },
  {
    question: 'What is the closest 3-day trek to Delhi?',
    answer:
      'The Tiger Fall Trek in Chakrata is the closest quality 3-day trek to Delhi. Chakrata is approximately 320 km from Delhi — six to seven hours by road. You can depart Friday evening, trek Saturday and Sunday, and return Sunday evening or Monday morning. Sankri-based treks are eight to nine hours from Delhi and work within a three-day format if you depart Thursday evening or early Friday morning.',
  },
  {
    question: 'What fitness level is required for a 3-day trek?',
    answer:
      'Moderate baseline fitness is sufficient for Chakrata treks — Tiger Fall and Budher Caves. If you can walk comfortably for four to five hours on uneven terrain and climb five flights of stairs without stopping, you have the foundation. The compressed Kedarkantha requires higher fitness: the ability to walk six to eight hours per day with altitude gain. Two to three weeks of daily walking or light jogging before the trek is recommended preparation for any format.',
  },
];

export default function ThreeDayTreksUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: '3-Day Treks in Uttarakhand', url: canonicalUrl },
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
          { name: '3-Day Treks in Uttarakhand' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Best 3-Day Treks in Uttarakhand
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Two nights, three days. That is all you need for a genuine Himalayan trekking
            experience — forest trails, ridge views, waterfall destinations, cave
            explorations, and even a summit attempt if your fitness allows. The 3-day format
            is the most practical trek duration for anyone working a standard week: depart
            Friday, trek Saturday and Sunday, return by Monday morning.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Uttarakhand holds the best 3-day trek options in northern India because the
            mountains are close to Delhi — six to nine hours by road — and the trails are
            graded for accessibility without sacrificing quality. You are not compromising
            by choosing a short trek. You are choosing a format that delivers the core
            Himalayan experience within a weekend.
          </p>
        </header>

        {/* ── WHAT MAKES A 3-DAY TREK ──────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            What Makes a Trek Suitable for 3 Days?
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Not every Himalayan trek compresses into three days. The format works when five
            factors align.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Travel time under 9 hours from Delhi.</strong> The drive to the
              trailhead consumes one direction of a day. If the base is more than nine hours
              away, you lose too much trekking time to travel. Chakrata (6–7 hours) and
              Sankri (8–9 hours) both fit within the window.
            </li>
            <li>
              <strong>Trail distance under 20 km total.</strong> Three days of trekking at
              a comfortable pace covers 12 to 18 km total — four to six km per trekking day.
              This is enough for forest walks, waterfall approaches, and ridge traverses
              without forced marches.
            </li>
            <li>
              <strong>Altitude below 3,000 metres (standard) or 3,800 metres (compressed).</strong>{' '}
              Chakrata treks stay between 1,800 and 2,500 metres — no acclimatisation
              needed. A compressed Kedarkantha pushes to 3,800 metres in three days, which
              demands faster acclimatisation and prior experience.
            </li>
            <li>
              <strong>Clear destination — summit, waterfall, or cave.</strong> A 3-day trek
              needs a defined objective. Tiger Fall delivers a waterfall. Budher Caves
              delivers underground exploration. Kedarkantha delivers a summit. The
              destination gives the short format shape and purpose.
            </li>
            <li>
              <strong>Established base-camp logistics.</strong> Short treks work when
              accommodation, meals, and transport are professionally managed. Homestays in
              Chakrata, guided camps in Sankri, and organised transport from Delhi remove
              the planning burden that makes independent trekking impractical in three days.
            </li>
          </ul>
        </section>

        {/* ── BEST 3-DAY TREKS ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best 3-Day Treks in Uttarakhand
          </h2>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Tiger Fall Trek (Chakrata)
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/chakrata/tiger-fall-trek" style={{ color: 'var(--color-primary)' }}>
              Tiger Fall Trek in Chakrata
            </Link>{' '}
            is the strongest 3-day trek option in Uttarakhand. Twelve kilometres through
            dense deodar and oak forest to one of the region&apos;s highest direct
            waterfalls — and back. The trail stays between 1,800 and 2,200 metres, requires
            no prior trekking experience, and is shaded by forest canopy throughout.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The 3-day format gives this trek room to breathe. Day one: travel from Delhi
            to{' '}
            <Link href="/treks/location/chakrata" style={{ color: 'var(--color-primary)' }}>
              Chakrata trek base
            </Link>
            , settle into a homestay, evening orientation. Day two: full trekking day —
            forest walk to Tiger Fall, time at the waterfall, return to camp or homestay.
            Day three: morning nature walk or village exploration, drive back to Delhi.
            No rushing. No forced marches. The mountain experience has space to land.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Kedarkantha Trek (Short Itinerary Version)
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The standard{' '}
            <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>
              Kedarkantha snow trek
            </Link>{' '}
            is a four-day itinerary with gradual acclimatisation. A compressed three-day
            version is possible for fit trekkers — combining the first two days into a
            single long push from{' '}
            <Link href="/treks/location/sankri" style={{ color: 'var(--color-primary)' }}>
              treks based in Sankri
            </Link>{' '}
            to the high camp, followed by summit day and descent.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            This is not the recommended format for first-timers. The altitude gain is
            faster, the daily distances are longer, and acclimatisation time is reduced.
            But for trekkers who have completed at least one Himalayan trek previously
            and have strong cardio fitness, the three-day Kedarkantha delivers a snow
            summit at 3,800 metres within a long-weekend window. The reward-to-time ratio
            is extraordinary — you stand on a Himalayan peak within 48 hours of leaving
            Delhi.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Budher Caves Trek (Chakrata Region)
          </h3>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            The{' '}
            <Link href="/treks/location/chakrata/budher-caves-trek" style={{ color: 'var(--color-primary)' }}>
              Budher Caves Trek
            </Link>{' '}
            combines forest trekking with underground exploration — a distinctive experience
            no other short trek in Uttarakhand offers. Ten kilometres through oak forest to
            ancient limestone caves, with guided exploration inside. The 3-day format
            follows the same structure as Tiger Fall: travel day, trek day, return day.
            Moderate difficulty, no prior caving experience required, and the combination
            of forest canopy above ground and cave systems below creates a varied experience
            that holds attention across all three days.
          </p>
        </section>

        {/* ── WHO SHOULD CHOOSE ────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Should Choose a 3-Day Trek?
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>First-time trekkers.</strong> Three days is long enough to test
              whether Himalayan trekking is for you, short enough that the commitment is
              low. Tiger Fall or Budher Caves in Chakrata are ideal — accessible trails,
              no altitude concerns, and a clear destination. If you enjoy it, the natural
              next step is a{' '}
              <Link href="/treks/beginner-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
                beginner treks in Uttarakhand
              </Link>{' '}
              like the full four-day Kedarkantha.
            </li>
            <li>
              <strong>Corporate groups.</strong> The 3-day format is the most practical
              team-building trek. Friday departure, Saturday trekking, Sunday return —
              minimal leave required. Chakrata&apos;s proximity to Delhi and professional
              homestay infrastructure make logistics straightforward for groups of 10 to 20.
            </li>
            <li>
              <strong>Students.</strong> Budget-friendly, time-efficient, and delivers a
              genuine mountain experience. A group of friends can organise a 3-day Chakrata
              trek for a fraction of a longer expedition&apos;s cost.
            </li>
            <li>
              <strong>Couples.</strong> A weekend in the mountains — forest trails, campfire
              evenings, waterfall visits — without the multi-day commitment of a longer
              trek. The 3-day format is romantic and practical in equal measure.
            </li>
            <li>
              <strong>Delhi and NCR residents.</strong> If you live within driving distance,
              3-day treks become repeatable — once every few months, a different trail, a
              different season. See our{' '}
              <Link href="/treks/trek-near-delhi" style={{ color: 'var(--color-primary)' }}>
                weekend treks near Delhi
              </Link>{' '}
              guide for the full range of options within reach.
            </li>
          </ul>
        </section>

        {/* ── BEST SEASON ──────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Season for 3-Day Treks
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>October to November.</strong> The universal best window. Post-monsoon
            air is clear, trails are dry, temperatures are comfortable, and Himalayan
            visibility is at its peak. Both Chakrata and Sankri trails are in prime
            condition. This is the recommendation for anyone booking their first 3-day trek.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>February to April.</strong> Spring brings warming temperatures,
            wildflowers at lower elevations, and well-defined trails. Chakrata treks are
            excellent in this window. The compressed Kedarkantha still carries snow in
            February and early March — ideal for those seeking the{' '}
            <Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              winter treks in Uttarakhand
            </Link>{' '}
            experience in a short format.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>May to June.</strong> The{' '}
            <Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              summer treks in Uttarakhand
            </Link>{' '}
            window. Chakrata forest trails are shaded and cool while Delhi bakes. Tiger
            Fall builds volume through May. The green canopy and flowing streams make
            summer the most visually lush season for forest-based 3-day treks.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>December to January.</strong> Winter adds a dimension to Chakrata —
            crisp air, occasional frost, and quiet trails. The compressed Kedarkantha is at
            its snow-covered best. Cold temperatures require proper layering but the reward
            is a winter mountain experience within a weekend.
          </p>
        </section>

        {/* ── COMMERCIAL NAVIGATION ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: '#fafafa' }}>
          <p style={{ lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
            Exploring longer itineraries and all difficulty levels? See the full{' '}
            <Link href="/treks" style={{ color: 'var(--color-primary)' }}>
              Himalayan treks directory
            </Link>{' '}
            for guided routes across Uttarakhand.
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
