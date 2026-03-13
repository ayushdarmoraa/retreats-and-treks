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

const PATH = '/retreats/yoga-retreat-rishikesh';

export function generateMetadata(): Metadata {
  return {
    title: 'Yoga Retreats in Rishikesh — Structured Practice on the Ganges | Retreats And Treks',
    description:
      'Find yoga retreats in Rishikesh with structured asana, pranayama and meditation on the Ganges. Multi-day residential programs in India\'s yoga capital.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Yoga Retreats in Rishikesh — Structured Practice on the Ganges',
      description:
        'Residential yoga retreat programs in Rishikesh. Morning Ganga-side practice, pranayama, meditation and structured multi-day immersion in the Himalayan foothills.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Yoga Retreats in Rishikesh — Structured Practice on the Ganges'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is Rishikesh the best place for a yoga retreat in India?',
    answer:
      'Rishikesh is widely regarded as the best place for a yoga retreat in India. It holds the highest concentration of experienced yoga teachers, established ashram traditions, and structured residential programmes in the country. The Ganges riverside setting and Himalayan foothill environment add a dimension that indoor studios cannot replicate. For practitioners seeking lineage-based instruction with spiritual depth, Rishikesh is the global standard.',
  },
  {
    question: 'Are yoga retreats in Rishikesh beginner-friendly?',
    answer:
      'Yes. Most yoga retreats in Rishikesh structure sessions for mixed experience levels. Facilitators offer modifications for every posture. Pranayama and meditation sessions are taught from foundations — no prior experience assumed. Beginners often report faster progress in a retreat than in months of weekly classes because the immersive format allows the body and mind to adapt without interruption between sessions.',
  },
  {
    question: 'What is included in a yoga retreat in Rishikesh?',
    answer:
      'A standard yoga retreat in Rishikesh includes daily asana sessions (typically two per day), pranayama instruction, guided meditation, vegetarian meals, accommodation, and facilitated group activities such as nature walks or evening satsang. Many programmes also include sound healing, journaling workshops, or Ayurvedic consultations. Yoga mats, props, and practice spaces are provided. You bring comfortable clothing and a willingness to follow the daily structure.',
  },
  {
    question: 'Are yoga retreats in Rishikesh residential?',
    answer:
      'Yes. Retreat programmes in Rishikesh are residential — you stay on-site for the full duration. This is essential to the retreat format. Living within the programme container, eating together, practising together, and sleeping on-site creates the sustained immersion that distinguishes a retreat from a series of drop-in classes. Accommodation ranges from simple ashram rooms to comfortable private rooms depending on the programme.',
  },
  {
    question: 'Can international visitors attend yoga retreats in Rishikesh?',
    answer:
      'Absolutely. Rishikesh draws yoga practitioners from over fifty countries annually. Sessions are conducted in English. International visitors need a valid Indian tourist visa or e-visa. Rishikesh is well-connected — five to six hours from Delhi by road, with Dehradun airport forty-five minutes away offering domestic connections. Many retreats offer airport transfer arrangements for international participants.',
  },
  {
    question: 'How is a yoga retreat different from yoga teacher training?',
    answer:
      'A yoga retreat focuses on personal practice, restoration, and immersive experience. It is for anyone seeking a structured pause. Yoga teacher training (YTT) is a professional certification programme — typically 200 or 500 hours — designed to qualify graduates to teach. Retreats are shorter (two to seven days), less academic, and prioritise personal transformation over technical instruction. If you want to deepen your practice, choose a retreat. If you want to teach, pursue YTT.',
  },
];

export default function YogaRetreatRishikeshPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Yoga Retreats in Rishikesh', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <AutoArticleSchema
        title="Yoga Retreats in Rishikesh"
        description="Find yoga retreats in Rishikesh with structured asana, pranayama and meditation on the Ganges. Multi-day residential programs in India's yoga capital."
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
          { name: 'Yoga Retreats in Rishikesh' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Yoga Retreats in Rishikesh
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Rishikesh is where serious yoga practice begins. Not in a studio with mirrored
            walls and playlist curation — on the banks of the Ganges, in the foothills of the
            Himalayas, inside a tradition that has sustained unbroken practice for generations.
            A yoga retreat here is a residential programme: structured daily asana, pranayama,
            meditation, and guided integration over multiple days. You arrive carrying whatever
            the city has loaded onto you. You leave with a body that has remembered how to
            breathe and a mind that has stopped racing.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            This is not a holiday with yoga attached. It is a programme built around practice,
            held in the one place on earth most associated with that practice. The river
            provides the soundtrack. The mountains provide the frame. The teaching lineage
            provides the structure. Everything else — the noise, the notifications, the
            decision fatigue — stays outside the gate.
          </p>
        </header>

        {/* ── WHY RISHIKESH ────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Why Rishikesh Is the Yoga Capital of India
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The title is not honorary. Rishikesh earned it through density of practice,
            depth of lineage, and a physical environment that no other city in India can
            match. The Ganges enters the plains here — cold, fast, and clean enough to sit
            beside at dawn without the cognitive dissonance that other river cities create.
            The Himalayan foothills rise immediately behind the town, delivering mountain
            air, forest canopy, and a natural sound barrier against the world beyond.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The ashram tradition in Rishikesh is unbroken. Teachers here hold lineages in
            Hatha, Ashtanga, Iyengar, Sivananda, and Kundalini yoga — not as academic
            knowledge but as living practice transmitted teacher to student across decades.
            This depth of instruction is what separates a Rishikesh retreat from a wellness
            resort with a yoga schedule. The teaching carries weight. The corrections are
            precise. The philosophy is integrated into every session, not bolted on as
            an afterthought.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            International recognition followed naturally. Practitioners from over fifty
            countries travel to Rishikesh annually. The town holds India&apos;s highest
            concentration of registered yoga schools, retreat centres, and residential
            programmes. When the world thinks of yoga in India, it thinks of Rishikesh.
            That reputation is infrastructure — it means the best teachers, the most refined
            programmes, and the deepest practice containers are concentrated here. Explore
            all{' '}
            <Link href="/retreats/rishikesh" style={{ color: 'var(--color-primary)' }}>
              Rishikesh retreat programs
            </Link>{' '}
            to see the full range of formats available.
          </p>
        </section>

        {/* ── WHAT IT LOOKS LIKE ───────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            What a Yoga Retreat in Rishikesh Looks Like
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            A retreat in Rishikesh follows a rhythm built around the river and the mountain
            day. It is not a menu of activities you choose from — it is a structured
            container designed to move you through a physical and mental reset over two to
            seven days.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Morning Ganga-side practice (6:30–8:00 AM).</strong> The primary asana
              session. Ninety minutes of guided practice on a riverside platform as mist
              lifts from the water. Hatha or Vinyasa flow depending on the programme.
              Modifications for all levels. The sound of the Ganges holds attention without
              effort — external noise management is unnecessary when the river is the
              background.
            </li>
            <li>
              <strong>Pranayama (9:00–9:45 AM).</strong> Structured breathwork following
              breakfast. Alternate nostril breathing, kapalabhati, box breathing, and
              extended exhale techniques. In Rishikesh&apos;s river-valley air, breath
              exercises carry a distinctive freshness that studio environments cannot
              replicate.
            </li>
            <li>
              <strong>Guided meditation (11:00–11:45 AM).</strong> Seated practice — often
              on the riverbank or in a shaded courtyard. Breath-based concentration, body
              scanning, or mantra meditation depending on the tradition. This session
              integrates the morning&apos;s physical practice into stillness.
            </li>
            <li>
              <strong>Afternoon free practice or nature time.</strong> Unstructured hours
              for personal practice, journaling, walking along the riverbank, or simply
              resting. This space is deliberate — the body needs integration time between
              structured sessions.
            </li>
            <li>
              <strong>Evening session (5:00–6:30 PM).</strong> Restorative yoga, yin
              practice, or{' '}
              <Link href="/retreats/journeys/sound-healing" style={{ color: 'var(--color-primary)' }}>
                sound healing retreats
              </Link>
              . Slower, softer, and designed to wind the nervous system down. Some programmes
              include evening satsang — guided philosophical discussion around a theme from
              the day&apos;s practice.
            </li>
          </ul>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Meals are vegetarian, often sattvic — light, clean, and timed to support practice
            rather than social dining. Digital detox is standard. Screens go off on arrival.
            The retreat begins the moment the device goes dark.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            This is not yoga teacher training. Teacher training programmes (200-hour, 500-hour)
            are academic and certification-focused. A retreat is experiential and
            restoration-focused. Both exist in Rishikesh. They serve different purposes.
          </p>
        </section>

        {/* ── WHO SHOULD CHOOSE ────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Should Choose a Yoga Retreat in Rishikesh
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Rishikesh serves the widest range of participants of any yoga destination in
            India. The infrastructure supports everything from first-time gentle practice
            to advanced intensive formats.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Beginners who want proper foundations.</strong> A retreat is the fastest
              way to build a practice. Three days of guided instruction with personal
              correction establishes alignment, breath awareness, and postural foundations
              that self-guided learning takes months to approximate. Rishikesh offers the
              widest selection of beginner-welcoming programmes.
            </li>
            <li>
              <strong>Corporate professionals carrying{' '}
              <Link href="/retreats/journeys/burnout-recovery" style={{ color: 'var(--color-primary)' }}>
                burnout recovery retreats
              </Link>.</strong>{' '}
              Decision fatigue, screen overload, and sleep disruption respond powerfully to
              structured yoga immersion. The physical practice releases held tension. The
              breathwork resets the autonomic nervous system. The environment completes the
              intervention — Rishikesh is five to six hours from Delhi, making it the most
              accessible serious reset available to NCR professionals. See all{' '}
              <Link href="/retreats/retreats-near-delhi" style={{ color: 'var(--color-primary)' }}>
                retreats near Delhi
              </Link>{' '}
              for accessible options.
            </li>
            <li>
              <strong>International visitors.</strong> If you are travelling to India for
              yoga, Rishikesh is the destination. English-language instruction is standard.
              The town is well-connected — Dehradun airport is forty-five minutes away with
              domestic flights from Delhi, Mumbai, and Bangalore. Visa requirements are
              straightforward. The retreats are structured for international comfort without
              diluting the depth of practice.
            </li>
            <li>
              <strong>Couples seeking a shared practice experience.</strong> Practising yoga
              together in a residential retreat — meals, sessions, silence, riverbank walks —
              creates shared presence that a resort holiday cannot. Rishikesh provides the
              structure that turns a trip into a transformative shared experience.
            </li>
            <li>
              <strong>Short-term seekers (3–5 days).</strong> Not everyone has a week.
              Rishikesh&apos;s proximity to Delhi and its dense concentration of programmes
              means you can arrive Friday evening and depart Monday or Tuesday with a
              complete retreat experience. The short format works here because the teaching
              infrastructure is so refined — every session counts.
            </li>
          </ul>
        </section>

        {/* ── BEST TIME ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Time for a Yoga Retreat in Rishikesh
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Rishikesh operates year-round, but the practice quality shifts with the seasons.
            Choosing the right window depends on whether you prioritise outdoor practice
            conditions, quieter atmosphere, or specific weather preferences.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>October to November</strong> is the peak. Post-monsoon clarity, mild
            temperatures (20–28°C), and excellent river conditions. Morning Ganga-side
            practice is at its best — crisp air, clear skies, low humidity. This is the
            strongest recommendation for first-time visitors.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>February to April</strong> is the second peak. Winter lifts, wildflowers
            appear in the foothills, and the town is quieter than autumn. Mornings are cool
            (12–18°C) and afternoons warm comfortably. Ideal for practitioners who prefer
            fewer visitors and a more intimate retreat atmosphere.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/retreats/summer-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Summer Himalayan retreats
            </Link>{' '}
            (May to June) are warm in Rishikesh — daytime temperatures reach 35–40°C. Early
            morning and evening sessions remain comfortable, but midday practice moves
            indoors. Some practitioners prefer the heat for its detoxifying intensity.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Monsoon (July to September) brings rain, humidity, and a transformed landscape.
            The Ganges rises and quickens. Outdoor riverside practice shifts to covered
            spaces. The atmosphere is uniquely introspective — fewer visitors, lush green
            foothills, and rain-on-roof meditation that carries its own quality.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <Link href="/retreats/winter-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Winter Himalayan retreats
            </Link>{' '}
            (December to January) bring cool mornings (8–14°C) and mild afternoons. Rishikesh
            never freezes. Winter practice has a sharp, clear quality — cold air deepens
            pranayama and the low-angle winter light creates beautiful morning session
            conditions.
          </p>
        </section>

        {/* ── HOW LONG ─────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            How Long Should a Yoga Retreat in Rishikesh Be?
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Duration shapes the depth. Each format serves a different intention and schedule
            reality.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>3 days (2 nights).</strong> The minimum effective dose. Friday arrival,
            full Saturday immersion, Sunday morning closing. This format delivers genuine
            reset — measurable reduction in cortisol, improved sleep quality, and restored
            mental clarity. It works for professionals who cannot take extended leave and
            want the most value from a weekend window.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>5 days (4 nights).</strong> The sweet spot for most practitioners. By day
            three, the body has fully adjusted to the retreat rhythm. Days four and five are
            where the deeper benefits emerge — sustained concentration, emotional processing,
            and the kind of insight that only arrives when the mind has been quiet long
            enough. This format allows the teaching to build progressively rather than
            compress everything into a single full day.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>7 days (6 nights).</strong> The full immersion format. One week in
            Rishikesh — practising twice daily, eating clean, sleeping in mountain air,
            disconnected from devices — creates a before-and-after line that shorter formats
            approach but do not cross. Physical flexibility increases noticeably. Mental
            patterns that seemed fixed begin to shift. Relationships with stress, sleep, and
            attention reset at a foundational level.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            Not sure which duration fits your situation? Our comparison of{' '}
            <Link href="/blog/3-day-vs-5-day-himalayan-retreat" style={{ color: 'var(--color-primary)' }}>
              three-day versus five-day retreat formats
            </Link>{' '}
            covers the trade-offs in detail.
          </p>
        </section>

        {/* ── COMMERCIAL NAVIGATION ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: '#fafafa' }}>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
            Looking at the full picture? See all{' '}
            <Link href="/retreats/rishikesh" style={{ color: 'var(--color-primary)' }}>
              Rishikesh retreat programs
            </Link>{' '}
            including meditation, sound healing, and burnout recovery formats.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
            For yoga programmes across all Himalayan locations, see{' '}
            <Link href="/retreats/yoga-retreat-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              yoga retreats in Uttarakhand
            </Link>
            . For all retreat types and destinations, start at{' '}
            <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Himalayan retreats in India
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
