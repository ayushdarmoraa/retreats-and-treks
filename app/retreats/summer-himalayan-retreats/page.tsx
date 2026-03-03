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

const PATH = '/retreats/summer-himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Summer Himalayan Retreats in India — May & June Escape',
    description:
      'Escape the Indian summer with Himalayan retreats in Sankri, Munsiyari, Chakrata and Rishikesh. Cool mountain air, yoga, meditation and transformational stays from May to June.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Summer Himalayan Retreats in India — May & June Escape',
      description:
        'Cool mountain air, open landscapes, and structured retreat programs across four Himalayan locations. May–June programs for heat escape and intentional pause.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How cool are the Himalayas in May and June?',
    answer:
      'Temperatures vary by altitude. Sankri and Munsiyari typically range from 10–22°C, offering genuine relief from plains heat. Chakrata sits around 15–28°C — noticeably cooler than Delhi but not alpine cold. Rishikesh is warmer at 25–35°C but still more comfortable than the deep plains. For maximum temperature contrast, higher-altitude locations like Sankri and Munsiyari deliver the strongest summer cooling.',
  },
  {
    question: 'Is summer a good time for a first retreat?',
    answer:
      'Summer is arguably the best season for first-time retreat participants. The weather is comfortable, daylight hours are long, and outdoor programming is at its fullest. Trails are accessible, landscapes are green, and the extended evenings allow gentle transition into retreat rhythm without the intensity of winter cold or monsoon restrictions. Most beginners find May and June the most approachable window.',
  },
  {
    question: 'Will monsoon affect a May or June retreat?',
    answer:
      'Monsoon typically arrives in the Himalayan foothills by late June or early July. May and early-to-mid June programs generally operate before monsoon onset. Late June retreats at lower elevations such as Rishikesh may encounter pre-monsoon humidity and occasional rain. Higher-altitude locations like Sankri and Munsiyari see monsoon effects later and less intensely. Program dates are set with seasonal timing in mind.',
  },
  {
    question: 'What should I pack for a summer Himalayan retreat?',
    answer:
      'Light layers are essential — mornings and evenings can be cool even when days are warm. A light rain jacket for unexpected showers, comfortable walking shoes with grip, sunscreen, a hat, and a reusable water bottle are recommended. Loose, breathable clothing works well for yoga and movement sessions. Detailed packing guidance is provided after booking based on the specific location and altitude.',
  },
  {
    question: 'Can I combine a summer retreat with trekking?',
    answer:
      'Yes. Summer is peak trekking season in the higher Himalayas, and locations like Sankri and Munsiyari offer natural retreat-plus-trek combinations. Kedarkantha and Har Ki Dun from Sankri, or Khaliya Top and Milam Glacier approaches from Munsiyari, can be paired with retreat programs. These hybrid formats suit participants who want both physical challenge and reflective practice.',
  },
];

export default function SummerHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Himalayan Retreats', url: buildCanonicalUrl('/retreats/himalayan-retreats') },
    { name: 'Summer Retreats', url: canonicalUrl },
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
          { name: 'Retreats', href: '/retreats' },
          { name: 'Himalayan Retreats', href: '/retreats/himalayan-retreats' },
          { name: 'Summer Retreats' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Summer Himalayan Retreats in India
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            When the Indian plains cross 40°C in May and June, the Himalayan foothills and valleys
            sit between 12 and 25 degrees. The air is clean. The views are open. The forests are
            fully green and alive. Summer in the mountains is not simply cooler — it is a different
            sensory environment entirely, and it creates ideal conditions for retreat work.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Long daylight hours extend practice into early morning and late evening. Trails that
            were snow-covered in winter are now accessible for walking meditation and light
            trekking. Outdoor yoga sessions happen in meadows rather than enclosed rooms. The
            landscape is not a backdrop — it is an active participant in the retreat container.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            For professionals escaping urban heat, for first-time retreat participants seeking
            comfortable conditions, and for anyone who has postponed pause because the timing
            never felt right — summer in the Himalayas removes the last excuse.
          </p>
        </header>
        <PrimaryCTA
          label="Plan My Summer Retreat"
          subtext="Planning a summer retreat? Let us help you find the right location."
          vertical="retreat"
          category="seasonal"
          sourcePath="/retreats/summer-himalayan-retreats"
        />
        {/* ── WHY CHOOSE THE HIMALAYAS IN SUMMER ────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Why Choose the Himalayas in Summer
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The primary draw is climate contrast. When Delhi, Mumbai, and Bengaluru are at peak
            heat and humidity, the Himalayan mid-altitudes offer temperatures that feel like a
            different season. But the value is not merely thermal — mountain summer creates specific
            conditions that enhance retreat outcomes.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Temperature and comfort.</strong> At 1,500–2,500 metres, daytime temperatures
            range from 18 to 25°C. Nights are cool enough for deep sleep without heating. This is
            the Goldilocks window — warm enough for outdoor practice, cool enough for the body to
            recover. The relentless heat that fragments urban attention simply does not exist here.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Extended daylight.</strong> Summer days in the Himalayas stretch past 7 PM.
            Morning light arrives before 5 AM. This creates programming flexibility that no other
            season offers — pre-dawn meditation, sunrise yoga, late-afternoon nature walks, and
            evening integration sessions, all in natural light.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Landscape at full capacity.</strong> Forests are dense and green. Wildflowers
            bloom across alpine meadows. Rivers run full from snowmelt. The landscape is generous
            in summer — visually rich, acoustically alive, and physically inviting. Walking
            practice on open trails has a quality that enclosed winter sessions cannot replicate.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>Beginner-friendly conditions.</strong> Summer removes the barriers that
            discourage first-time participants in other seasons — cold temperatures, snow
            logistics, road uncertainty. The accessibility and comfort of May–June make it the
            most natural entry point for anyone exploring the retreat format for the first time.
          </p>
        </section>
        <PrimaryCTA
          label="Plan My Summer Retreat"
          subtext="Tell us your preferred dates. We will recommend the ideal summer retreat."
          vertical="retreat"
          category="seasonal"
          sourcePath="/retreats/summer-himalayan-retreats"
        />
        {/* ── BEST LOCATIONS FOR SUMMER RETREAT ─────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Himalayan Locations for a Summer Retreat
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Summer amplifies the strengths of higher-altitude locations while making lower
            elevations warmer. The choice depends on how much altitude you want, whether you plan
            to combine trekking with retreat, and how far you are willing to travel.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/sankri" style={{ color: 'inherit' }}>
              Sankri — Cool Pine Forest Valleys
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Sankri sits at the upper edge of the treeline in the Govind Wildlife Sanctuary
            corridor, where summer temperatures rarely exceed 22°C. The pine and oak forests
            surrounding the village provide natural air conditioning and walking routes that stay
            cool even at midday. Summer is when Sankri comes fully alive — the valley is green,
            the rivers are strong, and the high-altitude meadows above the village open for the
            first time since autumn.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            This is also peak season for combining retreat with trekking. Kedarkantha and Har Ki
            Dun trails are fully accessible, making Sankri the strongest summer location for
            participants who want physical movement alongside reflective practice. The cool
            climate, quiet village, and trail access create what is arguably the most complete
            summer retreat environment we offer.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/munsiyari" style={{ color: 'inherit' }}>
              Munsiyari — High Altitude and Panchachuli Views
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Munsiyari in summer is the premium alpine option. At over 2,200 metres, with the
            Panchachuli massif filling the northern horizon, this is mountain retreat at its most
            dramatic. Summer temperatures hover around 15–22°C — genuinely cool, never hot.
            Khaliya Top meadows bloom with wildflowers. The Milam Glacier approach opens for the
            season. Bhotiya villages are active and welcoming.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Munsiyari suits participants who want altitude, visual grandeur, and genuine remoteness.
            The journey to reach it is longer than other locations, which creates natural
            psychological separation from routine. For serious seekers and experienced retreat
            participants, summer Munsiyari offers depth that more accessible locations cannot match.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/chakrata" style={{ color: 'inherit' }}>
              Chakrata — Quiet Hill Escape
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Chakrata is the most accessible summer escape — reachable from Delhi within a day,
            sitting on a forested ridge at moderate altitude. Summer days are warm but comfortable
            (20–30°C), and the deodar forests provide shade and walking routes. Tiger Falls and
            the surrounding forest trails are at their best in May and June. For professionals
            seeking a long weekend or three-to-five-day retreat without complex logistics, Chakrata
            delivers genuine mountain environment with minimal travel friction.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/rishikesh" style={{ color: 'inherit' }}>
              Rishikesh — Riverside Retreats Before Monsoon
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Rishikesh in May–June is warmer than the mountain locations (28–38°C) but remains
            cooler than the deep plains. Pre-monsoon energy creates intensity — the Ganges runs
            strong, ashram routines shift toward early-morning practice to avoid midday heat, and
            serious yoga courses run their intensive summer cohorts. This is not a cool-climate
            escape but a spiritual-intensity window. For those drawn to{' '}
            <Link href="/retreats/journeys/yoga-and-movement" style={{ color: 'var(--color-primary)' }}>
              yoga and movement
            </Link>{' '}
            or teacher-led philosophical study, pre-monsoon Rishikesh has a focused energy that
            cooler seasons dilute with tourist traffic.
          </p>
        </section>

        {/* ── WHAT TO EXPECT ───────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            What to Expect in a Summer Retreat
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Summer programming takes advantage of extended daylight and comfortable outdoor
            conditions. A typical day is more expansive than winter formats — more time outside,
            more movement, more landscape integration.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Morning yoga in open air</strong> — meadow or forest-edge sessions beginning
              at first light, when mountain air is coolest and clearest
            </li>
            <li>
              <strong>Guided forest meditation</strong> — walking or seated practice under tree
              canopy, using natural sound as the meditation object
            </li>
            <li>
              <strong>Nature walks and light trekking</strong> — trail-based integration sessions
              on routes that are fully accessible in summer
            </li>
            <li>
              <strong>Breathwork and pranayama</strong> — the clean, oxygen-rich mountain air at
              altitude noticeably deepens breathing practice
            </li>
            <li>
              <strong>Digital detox</strong> — reduced connectivity at mountain locations makes
              disconnection natural rather than disciplined
            </li>
            <li>
              <strong>Extended evening integration</strong> — long twilight hours for journaling,
              conversation, or quiet time before natural sleep onset
            </li>
          </ul>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            For a deeper comparison of retreat formats and how to choose between them, see our
            guide to{' '}
            <Link href="/blog/3-day-vs-5-day-himalayan-retreat" style={{ color: 'var(--color-primary)' }}>
              choosing the right retreat length
            </Link>.
          </p>
        </section>

        {/* ── WHO IS A SUMMER RETREAT FOR ───────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Is a Summer Retreat Ideal For
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Corporate professionals</strong> needing structured pause during the May–June
              window before Q3 intensity begins
            </li>
            <li>
              <strong>Burnout recovery</strong> — the gentle climate and longer days create ideal
              conditions for nervous system recalibration without the intensity of winter cold.
              See our{' '}
              <Link href="/retreats/journeys/burnout-recovery" style={{ color: 'var(--color-primary)' }}>
                Burnout Recovery
              </Link>{' '}
              program
            </li>
            <li>
              <strong>First-time retreat participants</strong> — summer removes barriers of cold,
              logistics complexity, and seasonal uncertainty, making it the most accessible entry
              point
            </li>
            <li>
              <strong>Couples</strong> seeking shared reflective experience in comfortable, scenic
              conditions
            </li>
            <li>
              <strong>Solo travellers</strong> — summer group sizes are moderate, creating community
              without being overwhelming
            </li>
          </ul>
        </section>

        {/* ── PLANNING YOUR MAY–JUNE RETREAT ────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Planning Your May–June Himalayan Retreat
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Book early.</strong> Summer is peak retreat season in the Himalayas. Popular
            locations and formats fill weeks in advance, particularly for May weekends and
            early June. Confirming your dates four to six weeks ahead is recommended.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Choose altitude by intent.</strong> If maximum cooling is the priority, choose
            Sankri or Munsiyari. If accessibility and weekend-friendly logistics matter more,
            Chakrata is optimal. If spiritual tradition matters more than climate, Rishikesh works
            even in summer warmth.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Pack in layers.</strong> Mountain weather shifts through the day — mornings
            can be 12°C and afternoons 25°C in the same location. A light fleece, rain layer,
            comfortable walking shoes, and sun protection cover most situations.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>Respect altitude gently.</strong> Locations above 2,000 metres (Sankri,
            Munsiyari) may cause mild breathlessness on arrival. Programs account for this with
            gradual first-day scheduling. Hydration and rest on the travel day are sufficient for
            most participants.
          </p>
        </section>

        {/* ── SEASONAL PAIR NAVIGATION ──────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: '#fafafa' }}>
          <p style={{ lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
            Looking for a different season?{' '}
            <Link href="/retreats/winter-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Winter Himalayan Retreats
            </Link>{' '}
            (December–February) offer snow silence, introspective depth, and small-group intimacy.
            For a complete overview of all seasons and formats, see{' '}
            <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Himalayan Retreats in India
            </Link>.
          </p>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-lg)' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </section>

        {/* ── NAVIGATION ────────────────────────────────────────────── */}
        <nav style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-lg)', fontSize: '0.95rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
            ← Himalayan Retreats
          </Link>
          <Link href="/retreats" style={{ color: 'var(--color-primary)' }}>
            All Retreats
          </Link>
        </nav>

      </article>
    </TrackedPage>
  );
}
