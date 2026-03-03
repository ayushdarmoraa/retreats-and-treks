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

const PATH = '/retreats/retreat-near-delhi';

export function generateMetadata(): Metadata {
  return {
    title: 'Himalayan Retreats Near Delhi — Mountain Wellness Within Driving Distance | Retreats And Treks',
    description:
      'Find Himalayan retreats near Delhi in Chakrata, Rishikesh and Sankri. Yoga, meditation and mountain wellness programs 5–9 hours from the capital by road.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Himalayan Retreats Near Delhi — Mountain Wellness Within Driving Distance',
      description:
        'Mountain retreat programs within a day\'s drive of Delhi. Chakrata, Rishikesh and Sankri — yoga, meditation and structured restoration in Uttarakhand.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the closest Himalayan retreat to Delhi?',
    answer:
      'Rishikesh is the closest Himalayan retreat destination from Delhi at five to six hours by road. It offers established yoga and meditation infrastructure with the shortest travel overhead. Chakrata is the next closest at six to seven hours, offering a quieter forest-ridge environment. Both are comfortably reachable on a Friday evening departure.',
  },
  {
    question: 'Can I drive to these retreats from Delhi?',
    answer:
      'Yes. All retreat locations listed are accessible by private car or shared cab from Delhi. Rishikesh is reached via the Delhi–Dehradun highway. Chakrata adds a hill extension beyond Dehradun. Sankri requires a longer drive through Purola. Self-drive is the most flexible option — it allows departure timing that matches your Friday work schedule. Road conditions are generally good year-round for Rishikesh and Chakrata.',
  },
  {
    question: 'Is a 2-day retreat near Delhi effective?',
    answer:
      'Yes. A well-structured two-night retreat delivers measurable benefit. Environment change — not duration — is the primary driver of cognitive reset. Moving from screen-dominated urban life into a structured mountain setting triggers neurological downshift within hours. Friday evening arrival with a full Saturday immersion and Sunday morning closing is a complete cycle. Participants consistently report noticeable mental reset within 48 hours when the structure is right.',
  },
  {
    question: 'Which is better for a retreat near Delhi — Chakrata or Rishikesh?',
    answer:
      'It depends on what you seek. Rishikesh is faster to reach, offers established yoga lineage, riverside practice, and a wider range of facilitators. Chakrata is quieter, higher in altitude, and provides forest-ridge immersion with lower tourist density. Choose Rishikesh for structured yoga and spiritual tradition. Choose Chakrata for silence, nature immersion, and reduced stimulation. Both are equally valid — they serve different retreat intentions.',
  },
  {
    question: 'Are retreats near Delhi open year-round?',
    answer:
      'Rishikesh and Chakrata operate retreat programs year-round. Rishikesh remains mild in winter and warm in summer. Chakrata is cool year-round with occasional light snow in January. Sankri is best from April through November — winter snowfall limits access. October to November and February to April are the most popular booking windows across all locations.',
  },
];

export default function RetreatNearDelhiPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Retreats Near Delhi', url: canonicalUrl },
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
          { name: 'Retreats Near Delhi' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Himalayan Retreats Near Delhi
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Five to seven hours by road separates Delhi from genuine mountain retreat
            environments. That is shorter than most domestic flights once you account for
            airport time — and it means a Friday evening departure places you in the Himalayas
            by midnight. Two nights of structured restoration. Sunday return. Zero annual leave
            required. For professionals in Delhi and NCR carrying accumulated stress, this is
            the most practical wellness intervention available: a mountain reset that fits inside
            a working week.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            The Uttarakhand foothills hold multiple retreat destinations within this driving
            radius — each offering a different character, altitude, and program style. The
            question is not whether a retreat near Delhi is feasible. It is which location
            matches your intention and how quickly you can get there.
          </p>
        </header>

        <PrimaryCTA
          label="Plan My Weekend Retreat"
          subtext="Planning a weekend retreat near Delhi? Let us help."
          vertical="retreat"
          category="near-delhi"
          sourcePath="/retreats/retreat-near-delhi"
        />

        {/* ── HOW CLOSE ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            How Close Are These Retreats to Delhi?
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Travel time is the decisive factor for retreat accessibility. Every hour of journey
            subtracts from time in the mountains. Here are the realistic drive times from
            central Delhi — not optimistic estimates, but Friday-evening-traffic-adjusted
            numbers.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Rishikesh — 5–6 hours.</strong> The fastest Himalayan retreat destination.
              Delhi–Haridwar highway is well-maintained. The final stretch along the Ganges
              adds thirty minutes but signals the transition into retreat territory. Arrival by
              10–11 PM on a Friday departure after work is realistic.
            </li>
            <li>
              <strong>Chakrata — 6–7 hours.</strong> Via Dehradun, then a hill extension into
              the cantonment area. The additional hour beyond Rishikesh buys significantly more
              altitude, forest density, and quiet. Arrival by midnight on a Friday departure.
            </li>
            <li>
              <strong>Sankri — 8–9 hours.</strong> Deeper into the mountains via Purola. This
              is tight for a standard weekend but workable for extended weekends or three-day
              holidays. The extra travel time delivers genuine wilderness immersion that closer
              locations cannot replicate.
            </li>
          </ul>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            All three destinations are accessible by private car, shared cab, or a combination
            of train and taxi. No flights required. The Delhi–Dehradun Shatabdi train is a
            practical alternative for Rishikesh and Chakrata — four-and-a-half hours to
            Dehradun station, followed by a short road transfer.
          </p>
        </section>
        <PrimaryCTA
          label="Plan My Weekend Retreat"
          subtext="Tell us your preferred dates. We will recommend the right location."
          vertical="retreat"
          category="near-delhi"
          sourcePath="/retreats/retreat-near-delhi"
        />
        {/* ── BEST DESTINATIONS ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Retreat Destinations Near Delhi
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Proximity alone does not make a strong retreat location. Environment quality,
            programme structure, and the ability to disconnect from urban rhythm matter
            equally. These three destinations deliver on all counts.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/chakrata" style={{ color: 'inherit' }}>
              Chakrata — Quiet Mountain Escape (6–7 Hours)
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Chakrata sits at 2,200 metres on a forested ridge in Dehradun district — a quiet
            cantonment town with deodar canopy, waterfall walks, and Himalayan views on clear
            days. The military heritage means minimal commercial development. No tourist strip.
            No ambient noise. Just forest and villages.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            This quietness is what makes{' '}
            <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)' }}>
              Chakrata
            </Link>{' '}
            the strongest retreat-near-Delhi option for professionals seeking genuine
            disconnection. Weekend programs here include morning yoga on forest platforms,
            guided meditation walks, breathwork sessions, and evening campfire integration.
            The 2-night format feels unhurried because the environment does half the work —
            clean air and silence begin the reset before any programmed session starts.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Chakrata is the practical default for first-time retreat participants from Delhi.
            Accessible enough for a regular weekend, quiet enough for genuine transformation,
            and structured enough that two nights deliver a complete cycle.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/rishikesh" style={{ color: 'inherit' }}>
              Rishikesh — Riverside Yoga Hub (5–6 Hours)
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Rishikesh is the fastest Himalayan destination from Delhi and India&apos;s most
            established centre for{' '}
            <Link href="/retreats/journeys/yoga-and-movement" style={{ color: 'var(--color-primary)' }}>
              yoga and movement retreats
            </Link>.
            The five-to-six-hour drive places you on the Ganges by late evening. For
            professionals who want the most time-efficient Friday-to-Sunday format, Rishikesh
            delivers consistently.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The retreat character here is different from Chakrata. Where Chakrata is forest
            silence,{' '}
            <Link href="/retreats/rishikesh" style={{ color: 'var(--color-primary)' }}>
              Rishikesh
            </Link>{' '}
            is spiritual infrastructure — ashram traditions, experienced yoga teachers,
            riverside meditation, and a lineage of practice that adds depth to even a short
            stay. Early morning practice on the riverbank, with mist on the water and temple
            bells in the distance, creates a container that manufactured settings cannot
            replicate.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Weekend formats in Rishikesh tend toward structured yoga and meditation
            programming — two sessions per day, pranayama instruction, and facilitated group
            reflection. This suits participants who want guided practice rather than
            open-ended nature immersion.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/sankri" style={{ color: 'inherit' }}>
              Sankri — Extended Weekend Option (8–9 Hours)
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            Sankri sits deeper in the Himalayas — eight to nine hours from Delhi in the upper
            Tons Valley near the Govind Wildlife Sanctuary. The travel time makes it tight for
            a standard Friday–Sunday weekend, but it works well for extended weekends and
            three-day holidays. If you have a Friday off, or can depart Thursday evening,{' '}
            <Link href="/retreats/sankri" style={{ color: 'var(--color-primary)' }}>
              Sankri
            </Link>{' '}
            offers something the closer locations cannot: true remote mountain immersion at
            the edge of the treeline. Pine forests, glacial rivers, and complete digital
            disconnection.
          </p>
        </section>

        {/* ── WHO SHOULD CHOOSE ────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Should Choose a Retreat Near Delhi
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Retreats near Delhi are specifically for people whose time constraints make longer
            journeys impractical. The proximity advantage removes every logistical excuse.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Corporate professionals (25–45)</strong> — carrying decision fatigue,
              screen overload, and accumulated stress. A Friday departure and Sunday return
              uses zero annual leave while delivering genuine neurological reset
            </li>
            <li>
              <strong>Startup founders and entrepreneurs</strong> — operating in always-on
              mode with no boundary between work and rest. A structured weekend container
              creates the separation that willpower alone cannot
            </li>
            <li>
              <strong>Couples needing a reset</strong> — a shared mountain retreat without
              tourist distractions creates conversation and connection that a resort weekend
              does not deliver
            </li>
            <li>
              <strong>First-time retreat participants</strong> — a nearby destination with
              short travel time is the lowest-commitment entry point. Chakrata or Rishikesh
              for two nights is enough to experience the retreat container without the
              intimidation factor of a remote journey
            </li>
          </ul>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            If your schedule allows for more than a weekend, our{' '}
            <Link href="/retreats/weekend-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              weekend Himalayan retreats
            </Link>{' '}
            guide covers the full two-to-three-day format across all locations, including
            seasonal timing and booking guidance.
          </p>
        </section>

        {/* ── WHAT A 2–3 DAY RETREAT LOOKS LIKE ─────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            What a 2–3 Day Retreat Near Delhi Looks Like
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>Friday evening — Arrival and settling.</strong>
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Depart Delhi after work. Arrive between 10 PM and midnight depending on your
            destination. A light welcome — herbal tea, room orientation, brief grounding
            exercise — marks the transition from travel mode to retreat space. No structured
            programming. The journey fatigue becomes the bridge to deep first-night sleep in
            mountain air.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>Saturday — Full immersion day.</strong>
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Saturday is the core of the retreat. Pre-dawn meditation or gentle yoga. A full
            morning practice session with breathwork. Guided nature walk or forest immersion
            after lunch. Afternoon workshop — sound healing, journaling, or restorative yoga.
            Evening integration circle. Meals timed to support the rhythm. Screens stay off.
            The full day in mountain environment, without decisions or obligations, is where
            the reset happens.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>Sunday — Closing and departure.</strong>
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Sunday begins with a final morning practice — often the most powerful session
            because the body and mind have already shifted. A closing circle or
            intention-setting exercise anchors the experience. Breakfast and departure by late
            morning allow comfortable return to Delhi by evening.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            For guidance on whether a shorter or longer format suits your needs, see our
            comparison of{' '}
            <Link href="/blog/3-day-vs-5-day-himalayan-retreat" style={{ color: 'var(--color-primary)' }}>
              three-day versus five-day retreat formats
            </Link>.
          </p>
        </section>

        {/* ── COMMERCIAL NAVIGATION ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: '#fafafa' }}>
          <p style={{ lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
            Exploring all locations and formats?{' '}
            <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Himalayan retreats in India
            </Link>{' '}
            covers every destination, duration, and program type. For state-level planning,
            see our{' '}
            <Link href="/retreats/uttarakhand-retreats" style={{ color: 'var(--color-primary)' }}>
              Uttarakhand retreats
            </Link>{' '}
            guide.
          </p>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-lg)' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </section>


      </article>
    </TrackedPage>
  );
}
