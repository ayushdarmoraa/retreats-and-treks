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

const PATH = '/retreats/weekend-himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Weekend Himalayan Retreats Near Delhi — 2–3 Day Mountain Escapes',
    description:
      'Plan a 2–3 day weekend Himalayan retreat near Delhi. Friday–Sunday corporate reset programs in Chakrata and Rishikesh with yoga, meditation and nature immersion.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Weekend Himalayan Retreats Near Delhi — 2–3 Day Mountain Escapes',
      description:
        'Friday–Sunday Himalayan retreat programs near Delhi. 2–3 day reset in Chakrata, Rishikesh and Sankri with yoga, meditation and structured restoration.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Can I do a Himalayan retreat in just 2 days?',
    answer:
      'Yes. A well-structured 2-night retreat delivers measurable benefit. Programs are designed for compressed timelines — Friday evening arrival with a grounding session, full Saturday immersion across yoga, breathwork, meditation and nature, and Sunday morning closing with early departure. Participants consistently report noticeable mental reset within 48 hours when the environment and structure are right. The key is not duration but design.',
  },
  {
    question: 'Which is closer to Delhi — Chakrata or Rishikesh?',
    answer:
      'Rishikesh is slightly closer at 5–6 hours by road from Delhi. Chakrata takes 6–7 hours via Dehradun. Both are comfortably reachable on a Friday evening or early Saturday morning. Rishikesh is faster if you are coming from south or central Delhi. Chakrata is more direct from north Delhi via the Yamuna Expressway corridor. Both qualify as genuine weekend destinations.',
  },
  {
    question: 'Is Sankri feasible for a weekend retreat?',
    answer:
      'Sankri requires 8–9 hours from Delhi, which makes a standard Friday–Sunday weekend tight. It works well for extended weekends or 3-day holidays where you have Friday off or can depart Thursday evening. For a regular 2-night weekend, Chakrata and Rishikesh are more practical. If Sankri is your priority, a 3-night format is recommended.',
  },
  {
    question: 'What is included in a 2-night weekend retreat?',
    answer:
      'A typical 2-night weekend retreat includes accommodation, all meals from Friday dinner through Sunday breakfast, two full yoga and meditation sessions per day, one guided nature walk or forest immersion, breathwork or sound healing workshops, and integration time. Digital detox support, journaling prompts, and personalised intention-setting are included in most formats. Specific inclusions vary by location and program.',
  },
  {
    question: 'Do I need prior yoga or meditation experience?',
    answer:
      'No. Weekend retreats are designed to be accessible for first-time participants. Sessions are guided and adapted to mixed experience levels. Facilitators provide modifications for beginners and deeper variations for experienced practitioners within the same session. Many weekend participants are professionals with no formal practice — the structured environment makes entry natural rather than intimidating.',
  },
  {
    question: 'When is the best time of year for a weekend Himalayan retreat?',
    answer:
      'Weekend Himalayan retreats operate year-round, with each season offering a different quality. October–November and February–March are the most popular windows — pleasant weather, clear skies, and comfortable temperatures. Summer weekends (May–June) offer heat escape from Delhi. Winter weekends (December–January) suit those drawn to quiet introspection and smaller groups. Road conditions at higher-altitude locations like Sankri may affect winter access.',
  },
];

export default function WeekendHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Himalayan Retreats', url: buildCanonicalUrl('/retreats/himalayan-retreats') },
    { name: 'Weekend Retreats', url: canonicalUrl },
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
          { name: 'Weekend Retreats' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Weekend Himalayan Retreats Near Delhi
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Most professionals in Delhi and NCR know they need a break. The problem is not
            awareness — it is logistics. Annual leave is limited, long trips require coordination,
            and by the time a week opens up, burnout has already set in. A weekend retreat removes
            the planning barrier entirely. Two nights in the Himalayas — Friday evening to Sunday
            afternoon — is enough to reset sleep, break the screen cycle, and return to work with
            a clarity that no amount of weekend sleeping-in can deliver.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            The Himalayan foothills sit five to seven hours from Delhi by road. A Friday
            departure after work places you in a mountain environment by midnight, with a full
            Saturday of structured restoration ahead. No flights. No complex logistics. No
            annual leave required. This is not a vacation — it is a functional reset designed
            for people who cannot afford to stop but cannot afford not to.
          </p>
        </header>
        <PrimaryCTA
          label="Plan My Weekend Retreat"
          subtext="Ready for a weekend reset? A planner can help organise it."
          vertical="retreat"
          category="weekend"
          sourcePath="/retreats/weekend-himalayan-retreats"
        />
        {/* ── WHY A WEEKEND RETREAT WORKS ───────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Why a Weekend Retreat Works for Busy Professionals
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The assumption that meaningful retreat requires a week is wrong. Environment change
            — not duration — is the primary driver of cognitive reset. Moving from an urban,
            screen-dominated context into a structured mountain environment triggers neurological
            downshift within hours. Two full days in that container is a complete cycle.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>No leave required.</strong> A Friday evening departure and Sunday evening
            return uses zero annual leave. For mid-career professionals and founders who guard
            their leave days, this is the critical advantage.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Minimal travel fatigue.</strong> Five to seven hours by road from Delhi is
            shorter than most domestic flights once you factor in airport time. Self-drive,
            shared cab, or overnight bus — the approach is straightforward. You arrive tired
            from travel, which actually helps: the first night&apos;s sleep in mountain air is
            often the deepest in months.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Structured intensity.</strong> Weekend retreats are not diluted versions of
            longer programs. They are compressed by design — early morning sessions, full-day
            immersion, evening integration. Every hour is intentional. Participants frequently
            report that a focused 48-hour{' '}
            <Link href="/retreats/journeys/burnout-recovery" style={{ color: 'var(--color-primary)' }}>
              burnout recovery
            </Link>{' '}
            retreat delivers more reset than a week of unstructured holiday.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>Repeatable rhythm.</strong> A single week-long retreat per year is meaningful.
            A weekend retreat every quarter is transformational. The proximity of the Himalayas
            to Delhi makes quarterly reset not just possible but practical.
          </p>
        </section>
        <PrimaryCTA
          label="Plan My Weekend Retreat"
          subtext="Share your preferred weekend and group size. We handle the rest."
          vertical="retreat"
          category="weekend"
          sourcePath="/retreats/weekend-himalayan-retreats"
        />
        {/* ── BEST WEEKEND LOCATIONS FROM DELHI ─────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Weekend Himalayan Retreat Locations from Delhi
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Not every mountain destination works for a weekend. The travel time must leave
            enough hours for genuine programming without the journey consuming the experience.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/chakrata" style={{ color: 'inherit' }}>
              Chakrata — 6–7 Hours from Delhi
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Chakrata is arguably the strongest weekend retreat destination from Delhi. At
            approximately 2,200 metres on a quiet cantonment ridge, it offers genuine mountain
            environment without extreme altitude or tourist congestion. The drive from Delhi via
            Dehradun takes six to seven hours — leave by 5 PM on Friday, and you are settling
            into a forest-edge retreat by midnight.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The landscape is defined by deodar forests, waterfalls, and ridge walks with Himalayan
            views on clear days. Tiger Falls provides a natural anchor point for immersive
            walking. The cantonment area&apos;s military heritage means low commercial development
            — just forest and villages. This quietness is what makes Chakrata effective for
            short-duration retreat work.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Weekend retreat programs in{' '}
            <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)' }}>
              Chakrata
            </Link>{' '}
            typically include morning yoga on forest platforms, guided meditation walks, breathwork
            sessions, and campfire integration in the evenings. The 2-night format here feels
            unhurried because the environment does half the work — the quiet and the air begin
            the reset before any programmed session starts.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/rishikesh" style={{ color: 'inherit' }}>
              Rishikesh — 5–6 Hours from Delhi
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Rishikesh is the fastest Himalayan destination from Delhi and the most established
            centre for{' '}
            <Link href="/retreats/journeys/yoga-and-movement" style={{ color: 'var(--color-primary)' }}>
              yoga and movement
            </Link>{' '}
            practice in India. The five-to-six-hour drive places you on the Ganges by late
            evening. For professionals who want the most efficient Friday-to-Sunday format with
            minimal travel overhead, Rishikesh delivers consistently.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The retreat character here is different from Chakrata. Where Chakrata is forest
            silence, Rishikesh is spiritual infrastructure — ashram traditions, experienced yoga
            teachers, riverside meditation, and a lineage of practice that adds depth to even a
            short stay. Early morning practice on the riverbank, with mist rising off the water
            and temple bells in the distance, creates a container that manufactured settings
            cannot replicate.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Weekend formats in{' '}
            <Link href="/retreats/rishikesh" style={{ color: 'var(--color-primary)' }}>
              Rishikesh
            </Link>{' '}
            tend toward structured yoga and meditation programming — two sessions per day,
            pranayama instruction, philosophical context, and facilitated group reflection. This
            suits participants who want guided practice rather than open-ended nature immersion.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/sankri" style={{ color: 'inherit' }}>
              Sankri — Extended Weekend Option (8–9 Hours)
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Sankri sits deeper in the Himalayas — roughly eight to nine hours from Delhi, in the
            upper Tons Valley near the Govind Wildlife Sanctuary. This travel time makes it tight
            for a standard Friday–Sunday weekend, but it works well for extended weekends and
            three-day holidays. If you have a Friday off, or can depart Thursday evening, Sankri
            offers something the closer locations cannot: true remote mountain immersion at the
            edge of the treeline. Pine forests, glacial rivers, and complete digital
            disconnection. For a longer comparison of retreat formats by duration, see our guide
            to{' '}
            <Link href="/blog/3-day-vs-5-day-himalayan-retreat" style={{ color: 'var(--color-primary)' }}>
              choosing the right retreat length
            </Link>.
          </p>
        </section>

        {/* ── WHAT A 2–3 DAY WEEKEND RETREAT LOOKS LIKE ─────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            What a 2–3 Day Weekend Retreat Looks Like
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Weekend retreats follow a compressed but complete arc — arrival, immersion, and
            integration within 48 hours.
          </p>

          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>Friday evening — Arrival and settling.</strong>
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Most participants arrive between 10 PM and midnight after the drive from Delhi. A
            light welcome — herbal tea, room orientation, and a brief grounding exercise — marks
            the transition from travel mode to retreat mode. No structured programming. The goal
            is to let the journey fatigue become the bridge to deep first-night sleep in clean
            mountain air.
          </p>

          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>Saturday — Full immersion day.</strong>
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Saturday is the core of the retreat. Pre-dawn meditation or gentle yoga, a full
            morning practice session with breathwork, guided nature walk or forest immersion
            after lunch, an afternoon workshop (sound healing, journaling, or restorative yoga),
            and an evening integration circle. Meals are timed to support the rhythm. Screens
            stay off. The full day in mountain environment, without decisions or obligations,
            is where the reset happens.
          </p>

          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>Sunday — Closing and departure.</strong>
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            Sunday begins with a final morning practice — often the most powerful session, because
            the body and mind have already shifted from the previous day&apos;s immersion. A closing
            circle or intention-setting exercise anchors the experience. Breakfast and departure
            by late morning allow comfortable return to Delhi by evening.
          </p>
        </section>

        {/* ── WHO SHOULD CONSIDER A WEEKEND RETREAT ─────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Should Consider a Weekend Retreat
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Weekend Himalayan retreats are specifically for people whose constraints make longer
            programs impractical. That includes most of urban professional India.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Corporate professionals (25–45)</strong> — the primary audience. People
              carrying decision fatigue, screen overload, and accumulated stress who cannot take a
              week off but urgently need restoration
            </li>
            <li>
              <strong>Startup founders and entrepreneurs</strong> — operating in always-on mode
              with no boundary between work and rest. A structured 48-hour container creates
              the separation that willpower alone cannot
            </li>
            <li>
              <strong>Creatives and freelancers</strong> — seeking environmental shift to unblock
              stalled work or reset perspective. Mountain air and digital silence deliver what
              no café can
            </li>
            <li>
              <strong>Couples needing a reset</strong> — a shared retreat experience without
              tourist distractions creates conversation and connection that a resort weekend
              does not
            </li>
            <li>
              <strong>First-time retreat participants</strong> — a weekend is the lowest
              commitment entry point. Two nights is enough to experience the retreat container
              without the intimidation of a full week
            </li>
          </ul>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            If burnout is already present, not approaching, see our dedicated{' '}
            <Link href="/retreats/journeys/burnout-recovery" style={{ color: 'var(--color-primary)' }}>
              Burnout Recovery
            </Link>{' '}
            program — available in weekend and extended formats at all locations.
          </p>
        </section>

        {/* ── PLANNING YOUR FRIDAY–SUNDAY RETREAT ───────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Planning Your Friday–Sunday Himalayan Retreat
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Travel from Delhi.</strong> Self-drive is the most flexible option — it allows
            departure timing that matches your Friday schedule. Shared cabs from Delhi to
            Dehradun (for Chakrata) or Haridwar (for Rishikesh) are available through retreat
            coordination. Overnight buses are an option if you prefer sleeping through the
            journey. For Rishikesh, the Delhi–Dehradun Shatabdi train followed by a short taxi
            is the most comfortable public transport route.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>What to pack.</strong> Light and practical. Comfortable clothing for yoga and
            walking. A warm layer for mountain evenings — even in summer, nights at 2,000 metres
            are cool. Minimal luggage. The less you carry, the faster the mental shift begins.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>When to book.</strong> Weekend programs run year-round but fill quickly for
            long weekends, festival holidays, and popular windows (October–November,
            March–April). Booking two to three weeks ahead is advisable. For peak weekends,
            four weeks is safer.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Ideal months.</strong> Every month has its quality. October and November bring
            crisp clear skies. February and March offer warming days with snow-capped views.
            May–June is ideal for{' '}
            <Link href="/retreats/summer-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              summer Himalayan retreats
            </Link>{' '}
            — escaping Delhi heat for mountain air.
            December–January suits{' '}
            <Link href="/retreats/winter-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              winter Himalayan retreats
            </Link>{' '}
            for those drawn to cold-weather contemplation.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>Weather notes.</strong> Chakrata and Rishikesh are accessible by road in all
            seasons. Sankri roads may be affected by snow in January–February or landslides
            during monsoon.
          </p>
        </section>

        {/* ── COMMERCIAL NAVIGATION ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: '#fafafa' }}>
          <p style={{ lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
            Looking for longer immersion?{' '}
            <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Himalayan Retreats in India
            </Link>{' '}
            covers five-day, seven-day, and custom-length formats across all four locations.
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
        <nav style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-lg)', fontSize: '0.95rem' }}>
          <Link href="/retreats" style={{ color: 'var(--color-primary)' }}>
            ← All Retreats
          </Link>
        </nav>

      </article>
    </TrackedPage>
  );
}
