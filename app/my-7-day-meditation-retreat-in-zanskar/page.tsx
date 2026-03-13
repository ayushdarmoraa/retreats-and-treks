import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import FeaturedRetreat from '@/components/FeaturedRetreat';
import RelatedReads from '@/components/RelatedReads';

const PATH = '/my-7-day-meditation-retreat-in-zanskar';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'My 7-Day Meditation Retreat in Zanskar — A First-Person Account',
    description:
      'A first-person account of a 7-day silent meditation retreat in Zanskar, Ladakh — monastery sitting at 3,500m, frozen gorges, altitude silence, and what happens when you stop running from stillness.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'My 7-Day Meditation Retreat in Zanskar',
      description:
        'What really happens during a week of silence at 3,500 metres in a Himalayan monastery valley. A first-person retreat story.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('My 7-Day Meditation Retreat in Zanskar'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is a 7-day meditation retreat in Zanskar safe for beginners?',
    answer:
      'Zanskar retreats are recommended for those with at least some prior meditation experience — even a few months of home practice or a single weekend retreat. The altitude (3,500m), remoteness, and emotional intensity amplify everything. Beginners do better starting with a 3-day retreat in Chakrata, then progressing to Zanskar.',
  },
  {
    question: 'What does a typical day look like on a Zanskar retreat?',
    answer:
      'Wake at 5:30am. Morning sitting meditation (60–90 minutes). Breakfast in silence. Walking meditation along the river or to a monastery. Late morning guided session. Lunch. Afternoon free period for rest, journalling, or solo walking. Evening sitting session. Lights out by 9pm. The rhythm is designed around natural light and altitude energy.',
  },
  {
    question: 'How do you handle altitude sickness during the retreat?',
    answer:
      'All Zanskar programmes include two acclimatisation days in Leh (3,500m) before the drive into the valley. The retreat pace is deliberately slow. Hydration, gentle movement, and rest are built into the schedule. Our facilitators are trained in altitude awareness. If symptoms persist, descent is always the protocol.',
  },
  {
    question: 'Can I bring my phone to a Zanskar retreat?',
    answer:
      'You can bring it for emergencies, but signal is intermittent to absent in much of the valley. Most participants find the involuntary disconnection to be one of the most valuable aspects of the retreat. We recommend treating it as an opportunity rather than a constraint.',
  },
  {
    question: 'What should I pack for a 7-day retreat in Zanskar?',
    answer:
      'Warm layers (temperatures range from 25°C daytime to 0°C at night in summer), a headlamp, personal medications, sunscreen, and a journal. We provide detailed packing lists upon booking. Accommodation is basic guesthouses and camp-style lodging with all meals included.',
  },
];

export default function ZanskarStoryPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'My 7-Day Retreat in Zanskar', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'My 7-Day Meditation Retreat in Zanskar — A First-Person Account',
    description:
      'A first-person account of a 7-day silent meditation retreat in Zanskar, Ladakh at 3,500 metres.',
    url: canonicalUrl,
    author: { '@type': 'Organization', name: 'Retreats And Treks' },
    publisher: { '@type': 'Organization', name: 'Retreats And Treks' },
    datePublished: '2025-09-15',
    dateModified: '2026-03-01',
    mainEntityOfPage: canonicalUrl,
  };

  const sectionStyle = { marginBottom: 'var(--space-xl)' } as const;
  const h2Style = { fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' } as const;
  const proseStyle = { lineHeight: 1.8, marginBottom: '0.75rem' } as const;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Meditation Retreats', href: '/meditation-retreats' },
          { name: 'My 7-Day Retreat in Zanskar' },
        ]}
      />

      <article>
        {/* ── HERO ──────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            My 7-Day Meditation Retreat in Zanskar: What Actually Happens When You Stop
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
            A first-person account &middot; 7 days &middot; Zanskar Valley, Ladakh &middot; 3,500m
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '0.75rem' }}>
            I didn&rsquo;t go to Zanskar to find myself. I went because I had run out of ways
            to avoid myself. Eighteen months of pandemic-era overwork, a relationship ending
            quietly, the creeping sense that I was living someone else&rsquo;s schedule. A
            colleague mentioned a meditation retreat in a place I&rsquo;d never heard of. I
            looked it up. The photos showed bare rock, turquoise rivers, a monastery clinging
            to a cliff. It looked like the opposite of everything in my life. I booked it.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            This is what actually happened during seven days of silence at 3,500 metres in
            the Trans-Himalayan valley of{' '}
            <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar</Link>.
          </p>
        </header>

        {/* ── DAY 0: ARRIVAL ────────────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Day 0 &mdash; Arriving in Ladakh</h2>
          <p style={proseStyle}>
            The flight into Leh is its own initiation. The plane threads between peaks, and
            suddenly the window fills with brown, barren mountains stretching to every horizon.
            No green. No rivers you can see. Just rock and sky and the thin, sharp quality of
            light at 3,500 metres.
          </p>
          <p style={proseStyle}>
            At the airport, the air hits differently. Not thin exactly, but less &mdash; as if
            someone turned down the volume on breathing. The team met us and drove us to a
            guesthouse in Leh. The instruction was simple: rest, drink water, walk slowly. No
            exertion. No rushing. Your body is recalibrating.
          </p>
          <p style={proseStyle}>
            I spent two acclimatisation days in Leh. Wandered the market. Sat in Shanti Stupa
            looking over the valley. Already my mind was quieter than it had been in months, and
            the retreat hadn&rsquo;t even started. Altitude does something to the mental chatter.
            The reduced oxygen slows the machinery of overthinking. I noticed this before anyone
            mentioned it.
          </p>
        </section>

        {/* ── DAY 1: THE DRIVE ──────────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Day 1 &mdash; The Journey into Zanskar Valley</h2>
          <p style={proseStyle}>
            The drive from Leh to Zanskar is 230 kilometres that take eight to ten hours. The
            road passes through Kargil, then climbs to Pensi La &mdash; a 4,400-metre pass
            where the Drang-Drung Glacier sits enormous and indifferent beside the road. This
            is the threshold. Crossing Pensi La, I felt something shift. Not dramatic. Just the
            simple recognition that I was now a long way from anything familiar.
          </p>
          <p style={proseStyle}>
            The valley opened below &mdash; wide, brown, austere. No lush forests. No charming
            villages. Just rock, river, sky, and the occasional monastery perched impossibly on
            a ridge. I understood immediately why people come here for meditation. There is
            nothing decorative about this place. It does not try to be beautiful. It simply is
            what it is, and that honesty works on you.
          </p>
          <p style={proseStyle}>
            We arrived at base near Padum in late afternoon. A simple guesthouse. Warm food.
            The group &mdash; eleven others, from four countries &mdash; shared a quiet dinner.
            The facilitator explained the silence protocol: starting tomorrow morning, we would
            not speak until day six. No eye contact seeking. No phones. No reading. Just the
            practice, the land, and ourselves.
          </p>
        </section>

        <PrimaryCTA
          label="Explore the Zanskar Retreat"
          subtext="The same 7-day programme described in this story. Small groups, June–September."
          vertical="retreat"
          category="zanskar-story"
          sourcePath={PATH}
        />

        {/* ── DAY 2: FIRST SESSION ──────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Day 2 &mdash; The First Meditation Sessions</h2>
          <p style={proseStyle}>
            5:30am wake-up. Cold air. The kind of cold that is clean rather than cruel. I walked
            to the meditation space &mdash; a simple room with cushions, facing the valley. The
            Zanskar River was audible but not loud. The mountains were still dark. The sky was
            beginning to lighten.
          </p>
          <p style={proseStyle}>
            The first sit was 60 minutes. Breath awareness. Simple instruction: feel the breath
            at the nostrils. When you notice thinking, return. That&rsquo;s it. No philosophy.
            No spiritual framework. Just attention and its inevitable wandering.
          </p>
          <p style={proseStyle}>
            The first twenty minutes were restless. My mind produced an impressive inventory of
            everything I should be doing instead of sitting on a cushion at dawn in Ladakh. Emails.
            The project I didn&rsquo;t finish. Whether I&rsquo;d packed enough warm clothes. Then
            something happened that doesn&rsquo;t happen in my London flat: the room became intensely
            quiet. Not just silent &mdash; quiet in a way that had texture. The absence of ambient
            noise &mdash; no traffic, no fridge hum, no neighbours &mdash; created a quality of
            stillness I had never experienced. My mind, receiving no external input, began to slow.
          </p>
          <p style={proseStyle}>
            After the session, we walked to{' '}
            <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>Karsha Monastery</Link>
            {' '}for walking meditation. The path along the valley floor was flat and wide. Prayer
            flags snapped in the wind. The monastery appeared above us, white walls against brown
            rock, and the walk became its own practice.
          </p>
        </section>

        {/* ── DAY 3–4: SILENCE ──────────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Days 3&ndash;4 &mdash; Silence and the Mind&rsquo;s Resistance</h2>
          <p style={proseStyle}>
            Day three is where most people hit the wall. Two days into silence, the surface
            distractions have burned off. What remains is whatever you have been avoiding. For
            me, it was grief. Not dramatic grief &mdash; just the accumulated sadness of years
            spent moving too fast to feel anything properly.
          </p>
          <p style={proseStyle}>
            The altitude amplifies everything. At 3,500 metres, emotions arrive with less
            buffering. The thinking mind &mdash; the one that usually packages feelings into
            narratives and solutions &mdash; is running at reduced capacity. So the feelings
            just sit there, unprocessed, undeniable. The facilitator had warned us: &ldquo;The
            mountain doesn&rsquo;t care about your story. It only cares that you&rsquo;re
            honest.&rdquo;
          </p>
          <p style={proseStyle}>
            I spent the afternoon of day three sitting by the river. Not meditating formally.
            Just sitting. The water was the colour of oxidised copper. The rocks were 500 million
            years old &mdash; ancient seabed, uplifted. Fossils of marine organisms visible in
            cliff faces at 4,000 metres. Perspective is unavoidable here. Whatever I was carrying
            became appropriately sized.
          </p>
          <p style={proseStyle}>
            Day four brought something I didn&rsquo;t expect: boredom converting into curiosity.
            With nothing to consume, no information to process, no conversations to manage, my
            attention turned toward whatever was immediately present. The texture of stone. The
            exact quality of the wind. The pattern of my own breathing. These things, which I
            normally ignore entirely, became interesting. Not intellectually &mdash; directly.
            The{' '}
            <Link href="/what-happens-at-a-silent-retreat" style={{ color: 'var(--color-primary)' }}>silence was doing its work</Link>.
          </p>
        </section>

        {/* ── DAY 5: BREAKTHROUGH ───────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Day 5 &mdash; When the Practice Opens</h2>
          <p style={proseStyle}>
            People who haven&rsquo;t done extended retreat sometimes imagine a breakthrough as
            something dramatic &mdash; a vision, an ecstatic moment, a cosmic understanding.
            Mine was quieter. I woke on day five and realised I had slept eight hours without
            waking once. This had not happened in over a year.
          </p>
          <p style={proseStyle}>
            The morning sit was different from every session before it. I sat down, found the
            breath, and the gap between thoughts widened. Not through effort &mdash; through
            the accumulation of four days of practice, altitude, silence, and the relentless
            honesty of the landscape. The thinking mind didn&rsquo;t stop. It just became less
            interesting than what was underneath it.
          </p>
          <p style={proseStyle}>
            We visited{' '}
            <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>Phugtal Monastery</Link>
            {' '}that afternoon. The approach through the gorge &mdash; two hours of walking
            through increasingly dramatic terrain &mdash; was a practice in itself. When the
            monastery appeared, built into a cliff face above a cave, something in me understood
            why people had been meditating in these mountains for a thousand years. It wasn&rsquo;t
            about belief. It was about the quality of attention these spaces have accumulated.
            Sitting in the prayer hall, I felt the stones. Nine hundred years of practitioners
            sitting where I was sitting. The silence had layers.
          </p>
          <p style={proseStyle}>
            That evening, the sunset painted the valley in colours I don&rsquo;t have words for.
            Not beautiful in the way a postcard is beautiful. Beautiful in the way that truth is
            beautiful &mdash; undecorated and complete.
          </p>
        </section>

        <PrimaryCTA
          label="See the Day-by-Day Itinerary"
          subtext="Read the detailed schedule for the 7-day Zanskar meditation programme."
          vertical="retreat"
          category="zanskar-story"
          sourcePath={PATH}
        />

        <p style={{ textAlign: 'center', marginTop: '-1rem', marginBottom: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link
            href="/7-day-zanskar-meditation-retreat-itinerary"
            style={{
              display: 'inline-block',
              padding: '0.5rem 1.25rem',
              border: '1px solid var(--color-primary, #2d6a4f)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            View the complete 7-day Zanskar itinerary &rarr;
          </Link>
        </p>

        {/* ── DAY 6: SPEAKING AGAIN ─────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Day 6 &mdash; Breaking Silence</h2>
          <p style={proseStyle}>
            The silence ended on the morning of day six. The facilitator rang the bell, and we
            were invited to speak. What surprised me most was how little I wanted to. After five
            days without language, words felt heavy and imprecise. The other participants reported
            the same thing. We spoke slowly, choosing words carefully. One woman said, &ldquo;I
            feel like I&rsquo;ve been cleaning a window for five days and now I can finally see
            through it.&rdquo; That was exactly right.
          </p>
          <p style={proseStyle}>
            The group dynamic had shifted completely. Without five days of small talk, social
            positioning, and personality performance, we had become genuinely present to each
            other. The conversations that day were some of the most honest I have had in my
            adult life. Not because people were trying to be profound &mdash; because the
            pretence had been stripped out by the silence.
          </p>
          <p style={proseStyle}>
            The afternoon was integration &mdash; journalling, a final walking meditation along
            the river, and a session on how to carry the practice home. The facilitator was
            pragmatic: &ldquo;You will lose most of this within two weeks of returning to your
            normal life. That is not failure &mdash; it is physics. What will remain is the
            knowledge that this quality of awareness exists. You now know what silence can do.
            That knowledge doesn&rsquo;t disappear.&rdquo;
          </p>
        </section>

        {/* ── DAY 7: LEAVING ────────────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Day 7 &mdash; Leaving Zanskar</h2>
          <p style={proseStyle}>
            The drive out is the reverse of the drive in &mdash; Pensi La, Kargil, back to Leh
            &mdash; but the experience is entirely different. The same landscape that felt
            foreign on arrival now felt like home. Not sentimental home. Just the recognition
            that this place had revealed something I had been looking away from, and I was
            grateful.
          </p>
          <p style={proseStyle}>
            At the airport in Leh, waiting for the flight, the sounds of phones, conversations,
            and airport announcements felt genuinely overwhelming. My nervous system had
            recalibrated to silence, and the ordinary volume of modern life was now registering
            as noise. This was the clearest evidence that something real had changed. Not a
            concept. A physiological adaptation.
          </p>
        </section>

        {/* ── WHAT I TOOK HOME ──────────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>What I Took Home from Zanskar</h2>
          <p style={proseStyle}>
            Three months later, here is what remained:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>A daily sitting practice.</strong> Not one hour in a monastery &mdash;
              twenty minutes in my flat. But twenty minutes that I protect because I know what
              they connect to.
            </li>
            <li>
              <strong>Reduced reactivity.</strong> The gap between stimulus and response is
              measurably wider. Zanskar didn&rsquo;t create this &mdash; the five days of silence
              trained my nervous system to pause before reacting. That training outlasted the
              retreat.
            </li>
            <li>
              <strong>Proportional perspective.</strong> When I notice anxiety or urgency,
              something in me remembers the fossil-bearing cliffs. 500 million years of geological
              history. It doesn&rsquo;t eliminate difficulty. It sizes it appropriately.
            </li>
            <li>
              <strong>An intention to return.</strong> Zanskar revealed a capacity for depth I
              didn&rsquo;t know I had. The{' '}
              <Link href="/10-day-silent-retreat" style={{ color: 'var(--color-primary)' }}>10-day programme</Link>
              {' '}is next.
            </li>
          </ul>
        </section>

        {/* ── WHO THIS IS FOR ───────────────────────────────────── */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Who Should Consider a Zanskar Retreat</h2>
          <p style={proseStyle}>
            Zanskar is not for everyone, and that is part of its value. It is best suited for:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>People with some meditation experience who want environmental depth</li>
            <li>Those who have done accessible retreats and feel ready for more</li>
            <li>Anyone seeking genuine disconnection &mdash; not just a wellness weekend</li>
            <li>Practitioners drawn to Buddhist contemplative environments</li>
          </ul>
          <p style={proseStyle}>
            If you are a beginner, consider starting with a{' '}
            <Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3-day retreat in Chakrata</Link>
            {' '}or a{' '}
            <Link href="/7-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>7-day guided programme</Link>
            {' '}before Zanskar. The progression builds on itself. Many participants follow a
            path from{' '}
            <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link>
            {' '}to{' '}
            <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar</Link>
            {' '}over one to two years.
          </p>
          <p style={proseStyle}>
            For the detailed day-by-day breakdown, see the{' '}
            <Link href="/7-day-zanskar-meditation-retreat-itinerary" style={{ color: 'var(--color-primary)' }}>7-day Zanskar retreat itinerary</Link>.
            For the next scheduled departure, see the{' '}
            <Link href="/zanskar-meditation-retreat-june-2026" style={{ color: 'var(--color-primary)' }}>June 2026 Zanskar programme</Link>.
            To learn more about the programme, see{' '}
            <Link href="/meditation-retreat-zanskar" style={{ color: 'var(--color-primary)' }}>meditation retreat in Zanskar</Link>.
          </p>
        </section>

        <PrimaryCTA
          label="Plan My Zanskar Retreat"
          subtext="Small groups, June–September. We'll help you decide if Zanskar is the right next step."
          vertical="retreat"
          category="zanskar-story"
          sourcePath={PATH}
        />

        <FeaturedRetreat
          title="Experience Zanskar for Yourself"
          description="Small groups, June–September only. Monastery immersion at 3,500 metres with skilled facilitators and complete digital disconnection."
          links={[
            { label: 'Explore Zanskar', href: '/locations/zanskar' },
            { label: 'See upcoming dates', href: '/retreat-calendar' },
            { label: 'Find your retreat', href: '/find-your-retreat' },
          ]}
        />

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <RelatedReads
          links={[
            { label: 'Meditation Retreat in Zanskar', href: '/meditation-retreat-zanskar' },
            { label: 'Why Zanskar Is Perfect for Retreats', href: '/why-zanskar-is-perfect-for-retreats' },
            { label: 'Best Time for a Retreat in Zanskar', href: '/best-time-for-a-retreat-in-zanskar' },
            { label: 'How to Reach Zanskar', href: '/how-to-reach-zanskar-for-a-retreat' },
            { label: '7-Day Zanskar Itinerary', href: '/7-day-zanskar-meditation-retreat-itinerary' },
          ]}
        />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>&larr; Meditation Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>Explore Zanskar</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/best-meditation-retreats-in-india" style={{ color: 'var(--color-primary)' }}>Best Meditation Retreats in India</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
