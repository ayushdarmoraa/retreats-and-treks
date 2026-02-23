import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import {
  generateCollectionPageSchema,
  generateItemListSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/components/seo/Schema';
import { getAllRetreatServices } from '@/content/retreats/services';
import AllRetreatPrograms from '@/components/AllRetreatPrograms';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import RetreatFinder from '@/components/RetreatFinder';
import { getAggregateRating } from '@/content/reviews';
import Breadcrumb from '@/components/Breadcrumb';

const PATH = '/retreats/himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Himalayan Retreats in India | Retreats And Treks',
    description:
      'A complete guide to understanding, choosing, and experiencing retreats in the Indian Himalayas. Yoga, silent, wellness, and creative retreat experiences across Chakrata, Sankri, and beyond.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Himalayan Retreats in India | Retreats And Treks',
      description:
        'A complete guide to understanding, choosing, and experiencing retreats in the Indian Himalayas.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Are Himalayan retreats suitable for beginners?',
    answer:
      'Yes. Most Himalayan retreats are designed to accommodate participants with no prior retreat experience. Structured schedules, guided sessions, and facilitator support make the format accessible to first-time attendees. While some silent or intensive formats may recommend basic familiarity with meditation or yoga, many retreats explicitly welcome beginners and provide modifications as needed.',
  },
  {
    question: 'How far are Himalayan retreat locations from Delhi or Dehradun?',
    answer:
      'Travel time depends on the specific location. Mid-altitude Himalayan destinations such as Chakrata can typically be reached within a manageable road journey from Delhi, often suitable for three- to five-day retreats. More remote valleys such as Sankri require longer travel durations but provide deeper geographical separation. Most retreats provide clear travel guidance in advance.',
  },
  {
    question: 'Is prior yoga or meditation experience required?',
    answer:
      'No. While prior experience can enhance comfort, it is not required for most structured retreats. Sessions are typically guided with variations to support mixed levels. Participants are encouraged to engage at their own pace rather than perform at a fixed standard.',
  },
  {
    question: 'What is the difference between a Himalayan retreat and a trek?',
    answer:
      'A Himalayan retreat is a structured, facilitator-led program focused on reflection, rest, and guided practice. A trek emphasizes physical movement and route-based exploration. Some formats combine both elements, but the primary orientation of a retreat remains inward, whereas a trek centers on terrain progression and physical endurance.',
  },
  {
    question: 'What should I pack for a Himalayan retreat?',
    answer:
      'Packing depends on season and altitude. Layered clothing suitable for cooler mornings and evenings is recommended year-round. Comfortable walking shoes, personal medications, reusable water bottles, and basic toiletries are essential. Retreat organizers typically provide detailed packing guidance tailored to the specific location and season.',
  },
  {
    question: 'What is the best time of year for a Himalayan retreat?',
    answer:
      'Spring and autumn are often preferred for stable weather and clear visibility. Summer offers relief from the heat of the plains in mid-altitude regions. Winter retreats are quieter and more introspective but require comfort with colder temperatures. The ideal season depends on personal intention rather than weather alone.',
  },
  {
    question: 'What is the cancellation and refund policy?',
    answer:
      'Cancellation and refund terms vary by program and are communicated clearly at the time of booking. Most structured retreat programs offer partial refunds for cancellations made within a defined window before the start date. Participants are encouraged to review specific program terms before confirming. We recommend reaching out directly for program-specific cancellation guidance.',
  },
  {
    question: 'Is travel insurance recommended for a Himalayan retreat?',
    answer:
      'Travel insurance is advisable for any Himalayan retreat, particularly for programs in more remote locations. Standard travel insurance covering trip cancellation, medical emergencies, and evacuation is recommended. Participants with pre-existing conditions should confirm coverage terms with their insurer before travel.',
  },
  {
    question: 'Are Himalayan retreats safe for solo travelers?',
    answer:
      'Yes. Structured retreat formats are well suited for solo travelers. Programs provide social containment through shared meals, group sessions, and facilitated activities, so participants are not isolated. Most retreat participants attend individually. Solo travel to established retreat locations in Uttarakhand and the broader Himalayan region is common and generally safe with standard precautions.',
  },
  {
    question: 'Are dietary restrictions or preferences accommodated?',
    answer:
      'Most Himalayan retreat programs serve vegetarian meals as the default. Common dietary preferences such as vegan, gluten-free, or allergen-specific requirements can typically be accommodated with advance notice. Participants should communicate dietary needs at the time of registration to ensure appropriate arrangements.',
  },
  {
    question: 'What if I have a medical condition — can I still attend?',
    answer:
      'Many retreat participants have pre-existing conditions and attend without difficulty, particularly for rest-focused or gentle-movement formats. Participants with significant cardiovascular, respiratory, or mobility conditions should consult a physician before booking, particularly for higher-altitude locations. Program descriptions outline physical intensity levels to help participants self-assess suitability.',
  },
];

export default function HimalayanRetreatsPage() {
  // Validate FAQ structural data integrity at render time
  validateFAQSync(FAQ_ITEMS, PATH);

  const allRetreats = getAllRetreatServices();
  const canonicalUrl = buildCanonicalUrl(PATH);

  // Pre-compute ratings for Finder (null entries excluded)
  const finderRatings = Object.fromEntries(
    allRetreats.flatMap((s) => {
      const r = getAggregateRating(s.slug);
      return r ? [[s.slug, { value: r.ratingValue, count: r.reviewCount }]] : [];
    }),
  );

  const collectionPageSchema = generateCollectionPageSchema({
    name: 'Himalayan Retreats in India',
    description:
      'A curated collection of retreat journeys in the Indian Himalayas — yoga, silent, wellness, creative, and custom experiences across carefully chosen mountain locations.',
    url: canonicalUrl,
  });

  const itemListSchema = generateItemListSchema(
    allRetreats.map((retreat) => ({
      name: retreat.title,
      url: buildCanonicalUrl(`/retreats/journeys/${retreat.slug}`),
    })),
  );

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Himalayan Retreats', url: canonicalUrl },
  ]);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Himalayan Retreats' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Himalayan Retreats in India
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Himalayan retreats are structured, multi-day immersion experiences held in the mountain
            regions of North India. They are designed for intentional pause — a shift away from the
            pace of urban life into an environment that supports mental clarity, physical restoration,
            and reflective space.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Unlike holidays built around entertainment or sightseeing, retreats operate on rhythm
            rather than spontaneity. Days are gently structured. Practices are guided. Silence is
            respected. Time in nature is not incidental — it is central to the experience.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            In the Indian Himalayas, geography itself becomes part of the retreat container. Forested
            slopes, wide valleys, cooler air, and lower sensory density create conditions that make
            slowing down natural rather than forced. Participants often report that the most
            noticeable change is not dramatic insight, but a gradual return to steadiness — deeper
            sleep, clearer thinking, reduced internal noise.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            This guide explains what Himalayan retreats are, how they differ from other forms of
            travel, what formats exist, and how to choose the right retreat depending on your
            experience level and personal intention.
          </p>
        </header>

        {/* ── TOPIC NAVIGATION ──────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Explore Retreat Guides by Topic
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, margin: 0 }}>
            <li>
              <Link href="/retreat-programs" style={{ color: 'var(--color-primary)' }}>
                Compare all retreat programs — duration, intensity, format
              </Link>
            </li>
            <li>
              <Link href="/topics/retreat-decision" style={{ color: 'var(--color-primary)' }}>
                Retreat Decision Guides
              </Link>
            </li>
            <li>
              <Link href="/topics/location-authority" style={{ color: 'var(--color-primary)' }}>
                Location-Based Retreat Guides
              </Link>
            </li>
            <li>
              <Link href="/compare/burnout-recovery-vs-rest-and-reset" style={{ color: 'var(--color-primary)' }}>
                Compare: Burnout Recovery vs Rest &amp; Reset
              </Link>
            </li>
            <li>
              <Link href="/compare/meditation-and-silence-vs-yoga-and-movement" style={{ color: 'var(--color-primary)' }}>
                Compare: Meditation &amp; Silence vs Yoga &amp; Movement
              </Link>
            </li>
          </ul>
        </section>

        {/* ── WHAT IS A HIMALAYAN RETREAT ───────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            What Is a Himalayan Retreat?
          </h2>

          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            A Himalayan retreat is a time-bound, facilitator-led program conducted in a Himalayan
            location that integrates guided practices with immersion in a mountain environment. Most
            retreats last between three and seven days and follow a deliberate daily rhythm rather
            than an open-ended itinerary.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            Core components typically include:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.9, marginBottom: '1rem' }}>
            <li>Morning movement practices such as yoga or mobility work</li>
            <li>Breathwork or meditation sessions</li>
            <li>Facilitated group reflection or structured discussion</li>
            <li>Quiet periods for integration</li>
            <li>Light nature immersion or gentle mountain walks</li>
          </ul>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The defining characteristic of a retreat is intentional structure. Participants are not
            left to design their own schedule. Meals are shared. Digital engagement is reduced. The
            emphasis is on internal recalibration rather than external stimulation.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            The mountain setting is not symbolic alone — it is functional. Reduced urban noise,
            expansive landscapes, and natural circadian alignment create conditions where attention
            stabilizes more easily. In that sense, the Himalayas are not simply a backdrop to the
            retreat; they are part of its operating environment.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Retreat vs Vacation
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            A vacation is organized around choice, leisure, and stimulation. A retreat is organized
            around rhythm, reduction, and internal focus. Both involve leaving your usual environment
            — but a retreat deliberately limits options in order to deepen presence.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Retreat vs Trek
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            A trek is a physical journey through mountain terrain. The emphasis is on movement,
            endurance, and landscape. A retreat is place-based — you arrive and stay, allowing depth
            to emerge through stillness rather than distance. Some journeys combine both formats, but
            they are structurally distinct.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Retreat vs Ashram Stay
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Ashram stays are typically longer-term, institutionally rooted, and tied to a specific
            spiritual tradition. Himalayan retreats are shorter, more program-specific, and often
            non-denominational. They are designed to be accessible to anyone — regardless of
            religious orientation or prior practice.
          </p>
        </section>

        {/* ── WHY THE HIMALAYAS ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Why the Himalayas?
          </h2>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Environmental Conditions That Support Stillness
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The Himalayan regions of North India offer environmental conditions fundamentally
            different from urban centers. Lower population density, reduced traffic noise, cooler
            temperatures, and expansive landscapes collectively reduce sensory overload. This shift
            is not aesthetic alone — it directly affects how attention functions.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            In cities, perception is constantly fragmented by movement, sound, light, and digital
            interruption. In mountain settings, these inputs decrease dramatically. Silence is
            ambient rather than curated. The nervous system is not continually stimulated. As
            external input reduces, internal awareness becomes easier to sustain.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Even moderate elevation subtly alters breathing patterns and encourages slower pacing.
            While retreats are not high-altitude expeditions, the mountain climate itself supports
            clarity and rest.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Psychological Distance from Routine
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Retreats depend on separation — not only physical, but psychological. The Himalayas
            create natural distance from habitual environments. When daily cues are removed — office
            buildings, traffic patterns, constant connectivity — the mind becomes less reactive and
            more observational.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            This transition unfolds gradually over the first one to two days. Participants often
            experience initial restlessness followed by noticeable settling. Without constant
            reinforcement of routine, internal patterns become easier to recognize. Reflection
            becomes less abstract and more embodied.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Wide valleys and open ridgelines reinforce perspective. In psychological terms,
            perspective reduces urgency. Challenges that feel immediate in urban environments often
            feel proportionate in mountain settings.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Cultural Pace of Mountain Regions
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Many Himalayan communities operate at a slower, less compressed pace than metropolitan
            centers. Daily life aligns more closely with daylight and seasonal cycles than with
            productivity metrics.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Retreats hosted in such environments benefit from this rhythm. Meals are unhurried.
            Silence is socially acceptable. Conversations are measured. The surrounding culture
            supports the retreat container rather than competing with it.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            This is not romanticization. It is contextual reinforcement. Environment shapes
            behavior. A retreat conducted in a high-intensity setting must counteract its
            surroundings. In the Himalayas, the surroundings reinforce intention.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Nature as a Functional Component, Not Decoration
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            In Himalayan retreats, nature is integrated into the program rather than treated as
            scenery. Morning sessions may face open landscapes. Walking meditations occur on forest
            paths. Quiet integration time is spent outdoors.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Natural light exposure regulates circadian rhythm. Forest environments support
            attentional recovery. Open horizons reduce visual density and mental compression. These
            effects are subtle but cumulative across several days.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            For this reason, retreat location is not interchangeable. A high-density tourist town
            does not create the same conditions as a quieter valley or forested ridge. Geography
            meaningfully shapes experience.
          </p>
        </section>

        {/* ── TYPES OF RETREATS ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Types of Himalayan Retreats
          </h2>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Yoga Retreats
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Yoga retreats in the Himalayas combine daily movement practice with breathwork and
            guided meditation in a mountain setting that supports longer, slower sessions than
            typical urban studio formats. Rather than compressed class schedules, sessions often
            extend into unhurried practice blocks with space for integration.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The emphasis varies by facilitator. Some retreats focus on alignment and physical
            refinement, while others emphasize restorative practice or breath-led movement. In
            Himalayan contexts, yoga tends to shift away from performance and toward inward
            awareness, shaped by the surrounding quiet.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Most mountain yoga retreats are designed to accommodate mixed levels. Participants are
            guided according to experience rather than expected to perform at a fixed standard.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Silent Retreats
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Silent retreats reduce or eliminate verbal communication for defined periods, allowing
            participants to observe internal patterns without conversational distraction. In
            Himalayan environments, silence is reinforced by the setting itself. The absence of
            traffic and urban noise reduces resistance to quiet formats.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            These retreats typically include structured meditation sessions, mindful walking,
            journaling, and limited facilitator guidance. Silence is not imposed as austerity; it
            is used as a tool for observation. Without constant dialogue, internal thought patterns
            become more visible.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            While some silent retreats are designed for experienced practitioners,
            beginner-friendly formats also exist with clear guidance and supportive structure.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Wellness &amp; Reset Retreats
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Wellness retreats focus on recovery from overstimulation, burnout, and chronic stress.
            Programs may include gentle movement, breathwork, nervous system regulation practices,
            sleep optimization, and extended rest periods.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Unlike performance-driven programs, reset retreats reduce intensity. Schedules are
            deliberately spacious. The objective is restoration rather than transformation. In
            Himalayan settings, cooler air, early nightfall, and lower sensory input support
            recalibration.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            These retreats are particularly suited for professionals seeking structured pause
            without long-term commitments.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Creative and Reflection Retreats
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Creative retreats are designed for writers, founders, artists, and professionals who
            require uninterrupted thinking time. The program may include structured reflection
            sessions, peer dialogue, or protected solitude.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Mountain environments reduce external demands, allowing participants to engage deeply
            with long-form ideas or personal transitions. Unlike productivity workshops, these
            retreats prioritize clarity over output.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            For many participants, the value lies not in producing finished work, but in regaining
            depth of thought.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Retreat + Trek Hybrid Experiences
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Hybrid formats combine retreat programming with light or moderate trekking components.
            In these structures, physical movement complements reflection rather than replacing it.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Treks may involve ridge walks, forest trails, or short supported routes. The purpose
            is experiential integration — using landscape engagement to deepen the retreat process.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            For participants who benefit from embodied movement, hybrid formats provide balance:
            structured introspection paired with active exploration.
          </p>
        </section>

        {/* ── RETREAT JOURNEYS (registry-driven) ────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Our Retreat Journeys
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {allRetreats.map((retreat) => (
              <li key={retreat.slug}>
                <Link
                  href={`/retreats/journeys/${retreat.slug}`}
                  style={{ color: 'var(--color-primary)' }}
                >
                  {retreat.title}
                </Link>
                {' — '}
                <span style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
                  {retreat.oneLineEssence}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── LOCATIONS ─────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Locations We Host Retreats
          </h2>

          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Himalayan retreats are shaped not only by facilitation style but by geography. Altitude,
            forest density, accessibility, and cultural context influence the tone of each
            experience. While the Himalayan range spans multiple regions, retreats are best
            understood through specific locations rather than abstract mountain labels.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Below are the primary mountain regions where our retreats are currently hosted.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/chakrata" style={{ color: 'inherit' }}>
              Chakrata — Forested Ridge Environment
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Chakrata sits along a quieter Himalayan ridge in Uttarakhand, characterized by pine
            forests, open valley views, and relatively low tourist density compared to commercial
            hill stations. Its elevation maintains cooler temperatures for much of the year,
            supporting extended outdoor sessions and unhurried pacing.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Retreats hosted in Chakrata tend to emphasize restoration and reflective space. The
            surrounding forests create natural walking routes for integration time, while ridge
            views provide openness without exposure to heavy tourism traffic.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Its accessibility from Delhi makes it suitable for three- to five-day retreat formats,
            offering meaningful separation without excessive travel complexity.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/sankri" style={{ color: 'inherit' }}>
              Sankri — Valley-Based Mountain Immersion
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Sankri lies deeper in the Garhwal Himalayas and serves as a gateway to several trekking
            routes. The surrounding valley landscapes are more expansive and alpine in character,
            with pronounced seasonal variation.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Retreats hosted in Sankri often integrate longer nature immersion segments, including
            forest walks and light trekking extensions. The environment supports participants who
            benefit from embodied movement alongside structured reflection.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Because Sankri is more remote, retreats here tend to attract participants seeking
            stronger geographical separation from routine environments.
          </p>
        </section>

        {/* ── WHO THEY ARE FOR ──────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Himalayan Retreats Are For
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Himalayan retreats are not limited to experienced practitioners or long-term spiritual
            seekers. They are structured environments designed for individuals who recognize the
            need for deliberate pause.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            They are particularly suited for:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.9, marginBottom: '1rem' }}>
            <li>Professionals experiencing sustained mental fatigue or burnout</li>
            <li>Founders and decision-makers seeking clarity away from operational pressure</li>
            <li>Creatives requiring uninterrupted thinking time</li>
            <li>Individuals navigating life transitions such as career shifts or personal change</li>
            <li>First-time retreat participants seeking guided structure rather than open-ended solitude</li>
          </ul>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Retreats in mountain settings are not designed for constant activity. They appeal to
            individuals comfortable with slower pacing and reflective time. While prior experience
            in yoga or meditation can be helpful, it is not required in most structured formats.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The common factor among participants is not background — it is intention. Those who
            benefit most are willing to disengage temporarily from routine, reduce digital input,
            and engage with a structured rhythm designed for recalibration.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            Himalayan retreats are less suitable for individuals seeking entertainment-driven
            travel or high-intensity adventure experiences. While trekking extensions may be
            included, the primary orientation remains inward.
          </p>
        </section>

        {/* ── BEST TIME ─────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Time for a Himalayan Retreat
          </h2>

          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Seasonality influences both environmental conditions and the psychological tone of a
            retreat. While Himalayan retreats operate across much of the year, each season creates
            a distinct experience.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Spring (March–May)
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Spring offers moderate temperatures, blooming landscapes, and increasing daylight
            hours. Forest regions are particularly vibrant during this period, making it well
            suited for retreats that include extended outdoor sessions and light walking practices.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Spring retreats often feel balanced — neither intensely introspective nor socially
            dense — and are generally comfortable for first-time participants.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Summer (June–July)
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Summer provides relief from the heat of the plains, especially in mid-altitude
            Himalayan regions. Retreats during this time attract participants seeking cooler
            climates and geographical separation from urban environments.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            While some areas may experience monsoon onset toward late July, many retreat locations
            remain operational with adjusted outdoor programming.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Autumn (September–November)
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Autumn is characterized by clear skies, stable weather, and high visibility across
            mountain ranges. This season is often considered optimal for retreats that integrate
            light trekking extensions.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            The post-monsoon clarity enhances landscape immersion, making it a preferred period
            for participants who value expansive mountain views alongside structured practice.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Winter (December–February)
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Winter retreats are quieter and more introspective in tone. Cooler temperatures
            naturally reduce external activity and encourage indoor practice formats, journaling,
            and extended reflective sessions.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            For participants comfortable with colder climates, winter retreats can offer deeper
            stillness and lower tourist density. Accessibility may vary depending on altitude and
            weather conditions.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            Choosing the right season depends less on "ideal weather" and more on personal
            intention. Those seeking outward engagement may prefer spring or autumn, while
            individuals seeking deeper quiet often resonate with winter formats.
          </p>
        </section>

        {/* ── HOW TO CHOOSE ─────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            How to Choose the Right Himalayan Retreat
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Selecting a Himalayan retreat involves more than choosing a location. The structure,
            duration, and facilitation style all shape the experience. Clarifying intention before
            booking reduces mismatch between expectation and format.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Duration and Intensity
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Short retreats of three to four days provide structured pause without requiring
            extended time away from work. Longer formats allow deeper settling and more gradual
            integration.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Intensity varies as well. Some retreats follow full-day programming with early starts
            and structured sessions. Others maintain spacious schedules with extended rest periods.
            Reviewing the daily rhythm in advance helps determine alignment.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Physical Movement Level
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Not all retreats emphasize physical activity. Some focus primarily on meditation and
            reflection, while others integrate yoga, forest walks, or light trekking.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Participants should assess their comfort with movement at moderate elevation. Retreat
            descriptions typically clarify whether physical endurance is central or optional.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Group Size and Facilitation Style
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Smaller groups often allow more personalized guidance and quieter dynamics. Larger
            groups may create broader social interaction and shared energy.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Facilitation style also differs. Some retreats emphasize structured instruction,
            while others encourage independent reflection within a guided framework. Reading
            facilitator profiles and program outlines helps clarify expectations.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Accessibility and Travel Considerations
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Travel logistics influence the overall experience. Locations closer to Delhi or major
            transit hubs may suit shorter retreats. More remote valleys provide deeper separation
            but require additional travel time.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Understanding transport duration, terrain, and seasonal accessibility ensures
            realistic planning.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            The most effective retreat choice aligns environment, structure, and personal
            intention. Clarity before arrival allows participants to engage fully once the program
            begins.
          </p>
        </section>

        {/* ── FIND MY RETREAT (decision assistant) ─────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Not sure which retreat is right for you?
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Answer five questions. Get your top two matches from the registry — no login required.
          </p>
          <RetreatFinder fromPath={PATH} ratings={finderRatings} />
        </section>

        {/* ── EXPLORE PROGRAMS (conversion layer) ──────────────────── */}
        <AllRetreatPrograms />

        {/* ── FAQ (tracked accordion) ────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-lg)' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </section>

        {/* ── NAVIGATION ────────────────────────────────────────────── */}
        <nav style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-lg)', fontSize: '0.95rem' }}>
          <Link href="/retreats" style={{ color: 'var(--color-primary)' }}>
            ← Back to all retreats
          </Link>
        </nav>

      </article>
    </TrackedPage>
  );
}
