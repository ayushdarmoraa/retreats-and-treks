import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/retreats/yoga-retreat-uttarakhand';

export function generateMetadata(): Metadata {
  return {
    title: 'Yoga Retreats in Uttarakhand — Mountain Practice in the Himalayas | Retreats And Treks',
    description:
      'Find yoga retreats in Uttarakhand across Rishikesh, Chakrata and Sankri. Structured asana, pranayama and meditation programs in Himalayan mountain settings.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Yoga Retreats in Uttarakhand — Mountain Practice in the Himalayas',
      description:
        'Immersive yoga retreat programs in Uttarakhand. Rishikesh, Chakrata and Sankri — asana, breathwork and meditation in genuine Himalayan environments.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Yoga Retreats in Uttarakhand — Mountain Practice in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is Rishikesh the best place for a yoga retreat in Uttarakhand?',
    answer:
      'Rishikesh is the most established yoga destination in Uttarakhand and one of the most recognised globally. It offers the widest range of teachers, ashram traditions, and riverside practice settings. However, "best" depends on what you seek. If you want structured lineage-based yoga with spiritual infrastructure, Rishikesh is unmatched. If you want forest silence with yoga woven into nature immersion, Chakrata may serve you better. Both are strong choices — they serve different intentions.',
  },
  {
    question: 'Are yoga retreats in Uttarakhand suitable for beginners?',
    answer:
      'Yes. Most yoga retreats in Uttarakhand welcome beginners and structure sessions to accommodate mixed experience levels. Facilitators adjust postures and offer modifications. Pranayama and meditation sessions require no prior experience. The mountain environment itself supports practice — clean air, natural quiet, and reduced stimulation make it easier to settle into focused attention. Beginners often report faster progress in a retreat setting than in months of studio classes.',
  },
  {
    question: 'How long should a yoga retreat in Uttarakhand be?',
    answer:
      'A two-to-three-night retreat delivers a genuine reset and is the most practical format for working professionals. You will experience multiple practice sessions, breathwork instruction, and enough environmental immersion for measurable benefit. For deeper transformation — especially if combining yoga with meditation, journaling, or nature therapy — a five-to-seven-night format allows the body to fully adjust and the practice to deepen beyond surface-level relaxation.',
  },
  {
    question: 'Are yoga retreats in Uttarakhand open year-round?',
    answer:
      'Rishikesh and Chakrata operate yoga retreat programs throughout the year. Rishikesh remains mild in winter and warm in summer. Chakrata is cool year-round with occasional light snow in January. Sankri operates from April through November, with winter snowfall limiting access. October to November and February to April are the most popular booking windows across all locations.',
  },
  {
    question: 'What is typically included in a yoga retreat in Uttarakhand?',
    answer:
      'A standard yoga retreat includes daily asana sessions (usually morning and late afternoon), pranayama instruction, guided meditation, meals (often vegetarian or sattvic), accommodation, and facilitated group activities such as nature walks or evening reflection circles. Some retreats also include sound healing, journaling workshops, or Ayurvedic consultations. Equipment like yoga mats and props are provided. You bring comfortable clothing and an open mind.',
  },
  {
    question: 'Do I need to be physically fit for a yoga retreat?',
    answer:
      'No. Yoga retreats in Uttarakhand are designed to meet participants where they are. Sessions are adapted for different fitness levels — chair modifications, supported postures, and restorative sequences are standard offerings. The emphasis is on mindful movement and breath awareness, not athletic performance. If you can walk comfortably, you can participate fully in a yoga retreat.',
  },
];

export default function YogaRetreatUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Yoga Retreats in Uttarakhand', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <AutoArticleSchema
        title="Yoga Retreats in Uttarakhand"
        description="Find yoga retreats in Uttarakhand across Rishikesh, Chakrata and Sankri. Structured asana, pranayama and meditation programs in Himalayan mountain settings."
        path={PATH}
      />
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
          { name: 'Yoga Retreats in Uttarakhand' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Yoga Retreats in Uttarakhand
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Uttarakhand is where yoga moved from studio floors to mountain ridges. The state
            holds India&apos;s deepest concentration of practice lineages, river-valley ashrams,
            and high-altitude retreat settings — all within the Himalayan foothills. This is
            not a drop-in class or a resort add-on. A yoga retreat here means structured daily
            practice in an environment that amplifies every session: clean mountain air,
            natural silence, and the kind of sensory reduction that makes focused attention
            effortless.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Whether you are beginning a practice or deepening one that has plateaued in urban
            settings, the Himalayan environment changes the equation. Altitude quiets the
            nervous system. Forest canopy filters stimulation. River sound holds attention
            without effort. The yoga is the same — the container is radically different.
          </p>
        </header>

        {/* ── WHY UTTARAKHAND ──────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Why Uttarakhand Is the Heart of Yoga in the Himalayas
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The connection between Uttarakhand and yoga is not marketing — it is history.
            Sages practiced in these valleys long before the word &ldquo;retreat&rdquo; existed.
            Rishikesh became the world&apos;s yoga capital not by accident but because the
            Ganges valley offered precisely the conditions that sustained practice demands:
            isolation from commerce, clean water, moderate climate, and a lineage of teachers
            who never left.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Beyond the spiritual lineage, the physical environment is what makes Uttarakhand
            irreplaceable for yoga. Mountain silence is not merely the absence of noise — it
            is a positive quality that settles the mind before the first session begins.
            Practice at altitude, with deodar forests on three sides and Himalayan peaks on
            the horizon, engages the body differently. Breathing exercises at 1,500 to 2,200
            metres feel qualitatively different from the same exercises at sea level. The air
            is thinner, cooler, and carries none of the particulate load that urban lungs
            have normalised.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            River settings add another dimension. The sound of flowing water — not
            recorded, not simulated, but present in the room where you practise — acts as a
            natural anchor for meditation. Forest settings provide canopy shade for outdoor
            sessions and walking meditation paths that no built environment can replicate.
            This is why serious practitioners return to Uttarakhand. The environment is not
            decoration — it is infrastructure.
          </p>
        </section>

        {/* ── BEST PLACES ──────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Places for a Yoga Retreat in Uttarakhand
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Uttarakhand offers multiple retreat environments — each with a distinct character
            that serves different practice intentions. The strongest locations combine
            accessibility with environmental quality, and all support structured yoga
            programming.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/rishikesh" style={{ color: 'inherit' }}>
              Rishikesh — Riverside Yoga Capital
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Rishikesh is the starting point for most yoga seekers in India, and for good
            reason. The town holds the highest density of experienced yoga teachers, ashram
            traditions, and structured training programmes in the country. Practice here
            happens on the banks of the Ganges — morning sessions with mist on the water,
            evening meditation as temple bells mark the transition to night.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            What distinguishes{' '}
            <Link href="/retreats/rishikesh" style={{ color: 'var(--color-primary)' }}>
              Rishikesh retreat programs
            </Link>{' '}
            from its reputation as a backpacker stop is the depth of the teaching lineage.
            Retreat programmes here draw from Hatha, Ashtanga, Iyengar, and Kundalini
            traditions — often with facilitators who have decades of unbroken practice.
            Riverside pranayama at dawn, followed by two-hour asana sessions, followed by
            guided meditation in the afternoon. The structure is rigorous but accessible.
            Beginners are welcome; the teaching adjusts.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Rishikesh is five to six hours from Delhi by road, making it the most accessible
            yoga retreat destination in the Himalayas. For weekend formats or first-time
            participants, it is the lowest-friction entry point.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/chakrata" style={{ color: 'inherit' }}>
              Chakrata — Quiet Forest Yoga Immersion
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Chakrata offers what Rishikesh cannot: complete quiet. Sitting at 2,200 metres on
            a deodar-covered ridge in Dehradun district, this former cantonment town has no
            tourist infrastructure, no ashram strip, and no ambient noise. Yoga practice here
            happens on forest platforms with views of the greater Himalayan range.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)' }}>
              Chakrata retreat environment
            </Link>{' '}
            is built for participants who want yoga woven into nature immersion rather than
            delivered in a studio setting. Morning asana under deodar canopy. Walking
            meditation on forest trails. Breathwork sessions where the only competing sound
            is birdsong. Evening restorative yoga by firelight. The programme rhythm follows
            the mountain day — sunrise to sunset — rather than a clock.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            For practitioners who have hit a plateau in urban settings, Chakrata&apos;s
            sensory reduction often unlocks progress that more stimulation never could. Six
            to seven hours from Delhi by road.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/sankri" style={{ color: 'inherit' }}>
              Sankri — High-Altitude Yoga and Nature
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            Sankri sits in the upper Tons Valley near the Govind Wildlife Sanctuary — deeper
            into the mountains, at the edge of the treeline. Yoga here is paired with
            wilderness: pine forest walks, glacial river meditation, and practice sessions
            in settings where the nearest town is hours away. The eight-to-nine-hour drive
            from Delhi makes{' '}
            <Link href="/retreats/sankri" style={{ color: 'var(--color-primary)' }}>
              Sankri
            </Link>{' '}
            better suited for extended retreats or long weekends. What you sacrifice in
            accessibility, you gain in depth of immersion. For experienced practitioners
            seeking a yoga retreat that strips away every layer of distraction, Sankri
            delivers.
          </p>
        </section>

        {/* ── WHAT TO EXPECT ───────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            What to Expect in a Yoga Retreat in Uttarakhand
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            A yoga retreat in the Himalayas is not a hotel stay with a morning class attached.
            It is a structured container designed to shift your physical and mental state over
            two to seven days. Here is what a typical day looks like across our Uttarakhand
            locations.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Pre-dawn meditation (6:00–6:30 AM).</strong> Optional seated practice
              as the mountain light shifts. No instruction — just held space and silence.
            </li>
            <li>
              <strong>Morning asana (7:00–8:30 AM).</strong> The primary practice session.
              Ninety minutes of guided posture work — Hatha or Vinyasa flow depending on the
              programme. Modifications offered for all levels. In Rishikesh, this often
              happens on a riverside platform. In Chakrata, on a forest deck.
            </li>
            <li>
              <strong>Pranayama and breathwork (10:00–10:45 AM).</strong> Structured
              breathing techniques — alternate nostril breathing, box breathing, kapalabhati.
              Mountain air makes these sessions uniquely effective. Participants consistently
              note the difference between practising breathwork at altitude versus sea level.
            </li>
            <li>
              <strong>Nature immersion (afternoon).</strong> Guided forest walk, waterfall
              visit, or riverside sitting. Not fitness hiking — slow, attentive movement
              through the landscape. This integrates the morning practice into the body.
            </li>
            <li>
              <strong>Evening session (5:00–6:30 PM).</strong> Restorative yoga, yin
              practice, or{' '}
              <Link href="/retreats/journeys/sound-healing" style={{ color: 'var(--color-primary)' }}>
                sound healing
              </Link>
              . Slower, deeper, and designed to prepare the body for sleep.
            </li>
            <li>
              <strong>Digital detox.</strong> Screens stay off throughout. This is not a
              suggestion — it is structure. Removing the device removes the last source of
              urban rhythm. Most participants report that the absence of screens is the single
              most impactful element of the retreat.
            </li>
          </ul>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            Meals are vegetarian, timed to support the practice rhythm, and prepared with
            local ingredients. The food is part of the programme — not an afterthought.
          </p>
        </section>

        {/* ── WHO SHOULD CHOOSE ────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Should Choose a Yoga Retreat in Uttarakhand
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            You do not need to be flexible, experienced, or spiritual. You need to be ready
            for a structured pause.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Beginners with no formal practice.</strong> A retreat is arguably the
              best place to start. Immersive environments bypass the inconsistency of weekly
              classes. Three days of guided practice builds more foundation than three months
              of sporadic studio visits.
            </li>
            <li>
              <strong>Corporate professionals carrying chronic stress.</strong> Yoga is one of
              the most evidence-based interventions for nervous system regulation. A Himalayan
              retreat compounds the benefit — the environment does half the work before the
              first session begins.
            </li>
            <li>
              <strong>Couples seeking a shared reset.</strong> Practising together in a
              mountain setting creates connection and presence that a resort holiday does not
              deliver. Shared physical practice, shared meals, shared silence.
            </li>
            <li>
              <strong>International visitors.</strong> Uttarakhand is the global destination
              for authentic yoga practice. Rishikesh alone draws practitioners from over fifty
              countries annually. If you are travelling to India for yoga, this is where you
              come.
            </li>
            <li>
              <strong>Long-stay participants.</strong> For those with the time and intention
              for seven-to-fourteen-day immersion, Uttarakhand offers the infrastructure and
              teaching depth to sustain extended practice without diminishing returns.
            </li>
          </ul>
        </section>

        {/* ── BEST TIME ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Time for a Yoga Retreat in Uttarakhand
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Uttarakhand supports year-round yoga retreats, but each season changes the
            character of the experience. Choosing the right window depends on what you want
            from the environment.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>October to November and February to April</strong> are the peak windows.
            Clear skies, moderate temperatures, and the best Himalayan visibility. These
            shoulder seasons offer the strongest combination of outdoor practice conditions
            and comfortable living. Most retreat programmes run their flagship schedules
            during these months.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/retreats/summer-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              summer Himalayan retreats
            </Link>{' '}
            (May to June) offer heat escape — Chakrata and Sankri remain cool while plains
            temperatures climb past 40°C. Monsoon (July to September) limits outdoor sessions
            but creates a uniquely introspective atmosphere for indoor practice with rain on
            the roof.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <Link href="/retreats/winter-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              winter Himalayan retreats
            </Link>{' '}
            (December to February) suit practitioners who want cold-air breathwork and the
            meditative quality of short mountain days. Rishikesh stays mild. Chakrata offers
            crisp mornings with occasional frost. Sankri closes for the season. Each window
            serves a different practice intention — there is no wrong time, only different
            experiences.
          </p>
        </section>

        {/* ── COMMERCIAL NAVIGATION ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: '#fafafa' }}>
          <p style={{ lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
            Exploring all retreat options?{' '}
            <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Himalayan wellness retreats
            </Link>{' '}
            covers every destination, duration, and program type. For location-specific
            planning across the state, see{' '}
            <Link href="/retreats/uttarakhand-retreats" style={{ color: 'var(--color-primary)' }}>
              Uttarakhand retreats
            </Link>.
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
