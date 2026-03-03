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

const PATH = '/retreats/winter-himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Winter Himalayan Retreats in India — December to February',
    description:
      'Winter retreat experiences across the Indian Himalayas. Snow silence in Sankri, forest calm in Chakrata, alpine stillness in Munsiyari, and mild spiritual immersion in Rishikesh. December–February programs.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Winter Himalayan Retreats in India — December to February',
      description:
        'Snow silence, crisp air, fewer tourists, slower rhythm. Winter retreat programs across four Himalayan locations.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is it too cold for a winter Himalayan retreat?',
    answer:
      'Temperatures vary by location and altitude. Rishikesh remains mild (8–20°C). Chakrata is cool but manageable (2–15°C). Sankri and Munsiyari can drop below freezing at night, but retreat accommodations provide warm bedding, heaters, and hot meals. Most participants find the cold invigorating rather than uncomfortable — it sharpens attention and deepens sleep. Packing appropriate layers is recommended.',
  },
  {
    question: 'Will there be snow during a winter retreat?',
    answer:
      'Sankri typically receives snowfall from mid-December through February, often creating a snow-covered landscape. Munsiyari sees snow at higher elevations and occasionally in the town itself. Chakrata receives light snow in some years, particularly in January. Rishikesh does not receive snow. Snow conditions vary by year — retreat programs adapt schedules accordingly.',
  },
  {
    question: 'Are mountain roads accessible in winter?',
    answer:
      'Chakrata and Rishikesh remain accessible by road throughout winter. Sankri roads may be affected by snowfall — retreat operators monitor conditions and provide updated travel guidance before departure. Munsiyari access can be more challenging in heavy snow years, and some programs operate on a weather-dependent basis. Participants receive detailed travel advisories before booking confirmation.',
  },
  {
    question: 'What should I pack for a winter Himalayan retreat?',
    answer:
      'Layered thermal clothing is essential — base layers, fleece mid-layers, and a warm outer jacket. Warm socks, gloves, and a hat are recommended for higher-altitude locations. Comfortable indoor clothing for practice sessions, a reusable water bottle, personal medications, and a headlamp or torch for early mornings are also useful. Detailed packing lists are provided after booking.',
  },
  {
    question: 'Are winter retreats suitable for first-time participants?',
    answer:
      'Yes. Winter retreats often have smaller group sizes, which creates a more intimate and supportive container. The slower seasonal rhythm naturally suits first-time participants who benefit from reduced stimulation. However, those uncomfortable with cold temperatures may prefer spring or autumn programs, or the milder climate of Rishikesh.',
  },
  {
    question: 'How do winter retreats differ from other seasons?',
    answer:
      'Winter retreats are characterised by smaller groups, quieter environments, and more introspective programming. Snow cover and colder air reduce the impulse toward outdoor activity, naturally deepening indoor practices like meditation, breathwork, and journaling. Early sunsets create longer evenings for reflection. The overall pace is slower and more contained than warmer-season programs.',
  },
];

export default function WinterHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Himalayan Retreats', url: buildCanonicalUrl('/retreats/himalayan-retreats') },
    { name: 'Winter Retreats', url: canonicalUrl },
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
          { name: 'Winter Retreats' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Winter Himalayan Retreats in India
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Winter in the Himalayas strips everything to essentials. Snow absorbs sound. Cold air
            sharpens attention. Tourist traffic drops to near zero. The mountains become quieter,
            starker, and more honest — and retreats held in this season carry a different weight
            than those in warmer months.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            From December through February, the Indian Himalayan foothills and valleys enter their
            most introspective season. Days are shorter. Mornings are crisp and still. Evenings
            arrive early, creating long hours for reflection, reading, and fireside quiet. The
            rhythm of winter naturally slows the nervous system — something no facilitator can
            manufacture.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            For people who have spent the year overstimulated, overcommitted, or simply moving too
            fast, a winter Himalayan retreat offers what no warm-weather holiday can: genuine
            deceleration, held by a landscape that is itself at rest.
          </p>
        </header>
        <PrimaryCTA
          label="Plan My Winter Retreat"
          subtext="Considering a winter retreat? A planner can help you choose."
          vertical="retreat"
          category="seasonal"
          sourcePath="/retreats/winter-himalayan-retreats"
        />
        {/* ── WHY WINTER CHANGES THE EXPERIENCE ─────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Why Winter Changes the Retreat Experience
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Retreat environments are shaped by season as much as by facilitation. In winter, the
            Himalayas create conditions that are qualitatively different from spring or autumn
            programs — not better or worse, but distinct in what they offer the nervous system.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Reduced stimulation.</strong> Snow cover dampens ambient sound. Fewer travellers
            mean quieter roads, emptier trails, and smaller groups. The external world becomes
            simpler — and that simplicity transfers inward. Participants consistently report that
            silence feels more natural in winter, less like a discipline and more like a
            continuation of what the landscape is already doing.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Snow acoustics and sensory softening.</strong> Fresh snow absorbs high-frequency
            sound, creating a muted acoustic environment that is measurably different from other
            seasons. For meditation, breathwork, and journaling, this matters — the container is
            held not just by the facilitator, but by the physical environment itself.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Early sunsets and long evenings.</strong> When darkness arrives by 5:30 PM, the
            evening expands. There is no pressure to be outside, no daylight guilt. Fireside
            conversation, quiet reading, early sleep — winter naturally creates the spacious
            evenings that retreat designers try to build artificially in other seasons.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Small group intimacy.</strong> Winter programs draw fewer participants, which
            means smaller circles, more facilitator attention, and deeper relational dynamics.
            Groups of 6–10 create a different kind of trust than groups of 20.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>Contrast therapy.</strong> Cold mornings and warm interiors create a natural
            rhythm of contraction and expansion. Stepping from a heated room into sharp mountain
            air at dawn, then returning to hot chai and a warm practice space — this oscillation
            is invigorating without being extreme. The body relearns that discomfort can be brief
            and purposeful.
          </p>
        </section>
        <PrimaryCTA
          label="Plan My Winter Retreat"
          subtext="Share your dates and we will match you to the right winter retreat."
          vertical="retreat"
          category="seasonal"
          sourcePath="/retreats/winter-himalayan-retreats"
        />
        {/* ── WINTER RETREAT LOCATIONS ──────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Our Winter Retreat Locations
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Each of our four Himalayan locations responds differently to winter. Choosing the right
            one depends on how much cold you welcome, what kind of stillness you seek, and whether
            you want snow or simply quiet.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/sankri" style={{ color: 'inherit' }}>
              Sankri — Snow and High-Altitude Stillness
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Sankri in winter is a snow-covered valley at the edge of the treeline. The village
            empties of trekkers. The Tons River slows. Pine forests hold snow on their branches,
            creating corridors of white silence. Temperatures drop below freezing at night, and
            mornings require real warmth — both external and internal. Retreats here operate in
            genuine mountain winter: wood fires, layered clothing, and the kind of quiet that only
            comes with snow on the ground. This is for people who want winter as an active element
            of the retreat, not a backdrop. For seasonal planning, see our guide on{' '}
            <Link href="/blog/best-time-for-retreat-in-sankri" style={{ color: 'var(--color-primary)' }}>
              the best time for a retreat in Sankri
            </Link>.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/chakrata" style={{ color: 'inherit' }}>
              Chakrata — Quiet Forest Winter
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Chakrata sits lower than Sankri, along a forested ridge that sees winter as cold calm
            rather than deep snow. The deodar and oak forests thin in winter, opening longer views
            across valleys. Morning frost covers the ground. Days are clear and bright, nights cold
            but not extreme. Snow visits occasionally — a light dusting rather than a blanket. This
            is the right winter location for people who want seasonal stillness without the
            intensity of high-altitude cold. Accessibility from Delhi remains straightforward even
            in January, making it practical for three- to five-day formats.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/munsiyari" style={{ color: 'inherit' }}>
              Munsiyari — Alpine Silence (Weather Dependent)
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Munsiyari in winter faces the Panchachuli range under full snow. The alpine meadows
            above the town become inaccessible. The village itself becomes very quiet — few visitors,
            reduced services, and a pace set entirely by weather. Winter retreats in Munsiyari are
            not guaranteed — road access can close after heavy snowfall, and programs operate on a
            weather-dependent basis. But when conditions allow, this is perhaps the most raw and
            unmediated winter retreat setting we offer. For participants who are comfortable with
            uncertainty and genuine remoteness.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/rishikesh" style={{ color: 'inherit' }}>
              Rishikesh — Mild Winter on the Ganges
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Rishikesh does not experience mountain winter. Days are cool and comfortable (15–20°C),
            nights are brisk but not cold. The Ganges runs clearer in winter. Pilgrimage traffic
            peaks around festivals, creating collective spiritual energy. For participants who want
            a winter retreat without cold-weather intensity — or who prefer spiritual tradition and
            community over isolation — Rishikesh offers structured practice in a mild, accessible
            climate. Winter here means deeper ashram rhythms and smaller yoga cohorts, not snow.
          </p>
        </section>

        {/* ── BEST MONTHS ──────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Months for a Winter Retreat
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>December.</strong> The transition month. Snow begins arriving at higher
            elevations (Sankri, Munsiyari). Chakrata turns cold and clear. Rishikesh enters
            peak pilgrimage season. December retreats offer the first taste of winter stillness
            without the deepest cold. Roads are generally accessible.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>January.</strong> The coldest month across all Himalayan locations. Sankri is
            fully snow-covered. Munsiyari may become intermittently inaccessible. Chakrata sees
            its lowest temperatures. This is the month for participants who actively seek deep
            winter — small groups, maximum stillness, and genuine cold as a container for practice.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>February.</strong> The late-winter window. Days begin lengthening. Snow persists
            at altitude but becomes softer. Chakrata warms slightly. Rishikesh starts the
            transition toward spring energy. February retreats balance winter depth with the
            first signals of seasonal turn — a good choice for people who want winter character
            without the extremes of January.
          </p>
        </section>

        {/* ── WHO A WINTER RETREAT IS FOR ───────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who a Winter Retreat Is For
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Winter retreats attract a specific kind of participant — people who recognise that the
            discomfort of cold and the scarcity of daylight are not obstacles but tools. Not
            everyone wants this. Those who do tend to be seeking something deeper than relaxation.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Burnout recovery.</strong> The reduced stimulation of a winter Himalayan
              setting is neurologically ideal for overstimulated systems. Cold air, early sleep,
              and limited screen access create conditions the nervous system cannot resist resting in.
            </li>
            <li>
              <strong>Deep reflection and transition.</strong> Year-end and new-year retreats serve
              people processing career changes, relationship shifts, or creative blocks. Winter
              creates the psychological container for honest self-assessment.
            </li>
            <li>
              <strong>Digital detox.</strong> Shorter days and cold evenings eliminate the usual
              triggers for compulsive screen use. Winter removes the competition — there is nothing
              more stimulating outside the retreat to pull your attention.
            </li>
            <li>
              <strong>Cold-weather seekers.</strong> Some people simply come alive in the cold.
              For them, the sharp air, snow light, and physical aliveness of a Himalayan winter
              are not tolerated but desired. These participants often find winter retreats more
              transformative than any other season.
            </li>
          </ul>
        </section>

        {/* ── WHICH FORMAT WORKS BEST IN WINTER ─────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Which Retreat Format Works Best in Winter
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Not every retreat format suits winter equally. The season amplifies certain styles and
            makes others impractical. Three formats align particularly well:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <Link href="/retreats/journeys/burnout-recovery" style={{ color: 'var(--color-primary)' }}>
                Burnout Recovery
              </Link>
              {' — '}Winter reduces input to the minimum. The cold, quiet, and darkness support
              nervous system recovery naturally, making this the strongest seasonal match for
              burnout programs.
            </li>
            <li>
              <Link href="/retreats/journeys/meditation-and-silence" style={{ color: 'var(--color-primary)' }}>
                Meditation &amp; Silence
              </Link>
              {' — '}Snow acoustics and fewer people create ambient silence that supports formal
              practice without artificial enforcement. Winter silence feels organic.
            </li>
            <li>
              <Link href="/retreats/journeys/rest-and-reset" style={{ color: 'var(--color-primary)' }}>
                Rest &amp; Reset
              </Link>
              {' — '}Short days and long evenings naturally encourage extra sleep, slower meals,
              and unhurried integration. Winter does the work of rest without requiring discipline.
            </li>
          </ul>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            For a broader view of how all retreat formats are structured, see our complete guide
            to{' '}
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
