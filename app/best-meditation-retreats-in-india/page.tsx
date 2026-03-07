import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import FeaturedRetreat from '@/components/FeaturedRetreat';
import RelatedReads from '@/components/RelatedReads';

const PATH = '/best-meditation-retreats-in-india';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Meditation Retreats in India (2026) — Himalayan Silence & Depth',
    description:
      'Compare the best meditation retreats in India — from monastery immersion in Zanskar to forest silence in Chakrata and Ganges-side practice in Rishikesh. Ranked by depth, remoteness, and tradition.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Best Meditation Retreats in India (2026) — Himalayan Silence & Depth',
      description:
        'Compare the best meditation retreats in India — from monastery immersion in Zanskar to forest silence in Chakrata and Ganges-side practice in Rishikesh.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the best meditation retreat in India for beginners?',
    answer:
      'Chakrata is the best starting point for beginners. At 2,000 metres in a dense Himalayan forest, it provides natural silence without extreme conditions. Sessions are guided, groups are small (maximum 12), and the location is accessible from Dehradun — no flights or difficult mountain roads required. Rishikesh is also excellent for beginners who prefer a more structured, ashram-style environment.',
  },
  {
    question: 'Which is deeper — Zanskar or Rishikesh for meditation?',
    answer:
      'Zanskar offers deeper immersion for experienced practitioners. At 3,500 metres with century-old monasteries and no phone signal, the environment itself strips away distraction. Rishikesh offers depth through lineage — living ashram traditions, experienced teachers, and the energy of the Ganges. Choose Zanskar for radical separation from the world. Choose Rishikesh for spiritual tradition with more infrastructure.',
  },
  {
    question: 'How long should a meditation retreat be?',
    answer:
      'Three days is a meaningful reset — enough to taste genuine silence. Five to seven days allows your mind to settle beneath habitual patterns and experience real depth. Ten days or more is standard for Vipassana-style silent retreats. For Zanskar, we recommend a minimum of seven days because two days are spent in transit — the remoteness is the medicine, but it requires commitment.',
  },
  {
    question: 'Do I need meditation experience before attending?',
    answer:
      'No prior experience is required for our Chakrata and Rishikesh retreats. Guided instruction covers foundational techniques. For Zanskar retreats, some prior meditation experience is recommended — the altitude and remoteness amplify everything, and having a basic practice helps you meet those conditions skillfully.',
  },
  {
    question: 'What makes Himalayan meditation retreats different from Goa or Kerala?',
    answer:
      'The Himalayas offer altitude, silence, and remoteness that coastal retreat centres cannot replicate. At elevation, reduced oxygen naturally slows the thinking mind. Mountain forests and valleys absorb sonic distraction. The distance from civilisation removes habitual cues. Goa and Kerala are warm, comfortable, and more accessible — but they are also busier, flatter, and closer to tourism infrastructure. If your meditation needs environmental support, the Himalayas are categorically more effective.',
  },
  {
    question: 'Can I combine a meditation retreat with trekking?',
    answer:
      'Yes — and this combination is particularly effective. Walking in mountains becomes a form of moving meditation. In Zanskar, treks pass through river gorges and ancient monasteries. In Chakrata, forest walks are part of the program. In Sankri, multi-day treks can be combined with base-camp meditation sessions. The body and the mind work together when the land demands it.',
  },
];

export default function BestMeditationRetreatsInIndiaPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'Best Meditation Retreats in India', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Meditation Retreats in India',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: 5,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Monastery Meditation in Zanskar',
        url: buildCanonicalUrl('/locations/zanskar'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Forest Silence Meditation in Chakrata',
        url: buildCanonicalUrl('/locations/chakrata'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Ganges-Side Meditation in Rishikesh',
        url: buildCanonicalUrl('/locations/rishikesh'),
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Alpine Meditation in Munsiyari',
        url: buildCanonicalUrl('/locations/munsiyari'),
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Silent Meditation Retreat in Sankri',
        url: buildCanonicalUrl('/locations/sankri'),
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Best Meditation Retreats in India (2026 Guide)',
    description:
      'Compare the best meditation retreats in India — ranked by depth, environment, and suitability.',
    url: canonicalUrl,
    isPartOf: { '@type': 'WebSite', name: 'Retreats And Treks' },
    about: { '@type': 'Thing', name: 'Meditation retreats in India' },
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, itemListSchema, webPageSchema]) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Meditation Retreats', href: '/meditation-retreats' },
          { name: 'Best Meditation Retreats in India' },
        ]}
      />

      <article>
        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Best Meditation Retreats in India: Himalayan Silence, Monastery Depth &amp; Guided Practice
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            India offers more meditation retreat options than any country on earth &mdash; but
            most are in warm, accessible coastal locations designed for comfort over depth.
            The Himalayas offer something fundamentally different: altitude that quiets the
            thinking mind, forests and valleys that absorb distraction, and a contemplative
            tradition predating written history.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            This guide compares the best meditation retreats in India by environment, depth,
            and suitability &mdash; from monastery immersion in remote Ladakh to accessible
            forest silence two hours from Dehradun.
          </p>
        </header>

        <PrimaryCTA
          label="Plan My Meditation Retreat"
          subtext="Not sure which setting suits your practice? We can help you choose."
          vertical="retreat"
          category="best-meditation"
          sourcePath={PATH}
        />

        {/* ── COMPARISON TABLE ──────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Quick Comparison &mdash; Best Meditation Retreats by Setting
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Rank</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Location</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Style</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Altitude</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: 1, name: 'Zanskar', id: 'zanskar', style: 'Monastery immersion', alt: '3,500m', best: 'Deep practitioners, radical disconnection' },
                  { rank: 2, name: 'Chakrata', id: 'chakrata', style: 'Forest silence', alt: '2,000m', best: 'Beginners, accessible depth' },
                  { rank: 3, name: 'Rishikesh', id: 'rishikesh', style: 'Ashram tradition', alt: '372m', best: 'Spiritual lineage, teacher access' },
                  { rank: 4, name: 'Munsiyari', id: 'munsiyari', style: 'Alpine contemplation', alt: '2,200m', best: 'Peak views, spacious silence' },
                  { rank: 5, name: 'Sankri', id: 'sankri', style: 'Trek + meditation', alt: '1,920m', best: 'Movement integration, forest depth' },
                ].map((row) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{row.rank}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <Link href={`/locations/${row.id}`} style={{ color: 'var(--color-primary)' }}>{row.name}</Link>
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{row.style}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{row.alt}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 1. ZANSKAR ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            1. Zanskar &mdash; Monastery Meditation at 3,500 Metres
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Zanskar is the deepest meditation environment we offer. A high-altitude river valley
            in Ladakh, sealed by mountains, 230&nbsp;km from Leh. The monasteries &mdash; Phugtal
            clinging to a cliff face, Karsha overlooking the valley, Stongde on its ridge &mdash;
            carry over a thousand years of Buddhist contemplative practice.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            At 3,500&nbsp;metres, the reduced oxygen naturally slows the thinking mind. The isolation
            strips away every familiar cue. Phone signal is intermittent to absent. The land itself
            becomes the meditation teacher &mdash; ancient rock, deep silence, vast sky.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Best for:</strong> experienced meditators seeking radical immersion.<br />
            <strong>Season:</strong> June&ndash;September (summer). January&ndash;February (Chadar season).<br />
            <strong>Duration:</strong> minimum 7 days recommended (includes transit).<br />
            <strong>Group size:</strong> maximum 12.
          </p>
          <p>
            <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>Explore Zanskar &rarr;</Link>
            {' '}&nbsp;|&nbsp;{' '}
            <Link href="/retreats/zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar retreats &rarr;</Link>
          </p>
        </section>

        {/* ── 2. CHAKRATA ───────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            2. Chakrata &mdash; Forest Silence at 2,000 Metres
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Chakrata is the most accessible deep-silence location in the Indian Himalayas. Dense
            deodar and oak forest creates a natural acoustic enclosure &mdash; no tourist noise, no
            traffic, no temple bells. Just birdsong, wind, and the occasional sound of a village
            going about its life.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Two thousand metres of altitude gently reduces mental pace without causing altitude
            discomfort. The town is 60&nbsp;km from Dehradun &mdash; reachable by car in 2.5 hours.
            This accessibility makes Chakrata ideal for first-time meditation retreatants who
            want genuine silence without extreme logistics.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Best for:</strong> beginners, weekend-to-weeklong retreats, burnout recovery through silence.<br />
            <strong>Season:</strong> year-round. September&ndash;October is ideal clarity.<br />
            <strong>Duration:</strong> 3&ndash;7 days.<br />
            <strong>Group size:</strong> maximum 12.
          </p>
          <p>
            <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Explore Chakrata &rarr;</Link>
            {' '}&nbsp;|&nbsp;{' '}
            <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata retreats &rarr;</Link>
          </p>
        </section>

        <PrimaryCTA
          label="Help Me Choose a Location"
          subtext="Tell us your experience level and intention — we'll recommend the right setting."
          vertical="retreat"
          category="best-meditation"
          sourcePath={PATH}
        />

        {/* ── 3. RISHIKESH ──────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            3. Rishikesh &mdash; Ganges Tradition
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Rishikesh is India&rsquo;s yoga and spiritual capital &mdash; a place where meditation
            is not an imported wellness concept but a lived, daily practice. Morning aarti on
            the Ganges, ashram bells, the hum of practice in every direction. The spiritual weight
            of this place is accumulated over centuries.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            The meditation experience here is different from mountain locations &mdash; less isolated,
            more embedded in tradition. You meditate alongside a river that carries spiritual
            significance for a billion people. The teachers have lineage, not just certification.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Best for:</strong> those seeking tradition, teacher access, and spiritual community.<br />
            <strong>Season:</strong> October&ndash;March (cool season). Avoid June&ndash;August (monsoon heat).<br />
            <strong>Duration:</strong> 5&ndash;14 days.<br />
            <strong>Group size:</strong> maximum 12.
          </p>
          <p>
            <Link href="/locations/rishikesh" style={{ color: 'var(--color-primary)' }}>Explore Rishikesh &rarr;</Link>
            {' '}&nbsp;|&nbsp;{' '}
            <Link href="/retreats/rishikesh" style={{ color: 'var(--color-primary)' }}>Rishikesh retreats &rarr;</Link>
          </p>
        </section>

        {/* ── 4. MUNSIYARI ──────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            4. Munsiyari &mdash; Alpine Contemplation
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Munsiyari sits at 2,200 metres facing the Panchachuli peaks &mdash; five summits
            rising above 6,000 metres. The meditation experience here is defined by spaciousness:
            open sky, vast mountain views, and the kind of silence that comes from being far
            above the treeline with very few other humans in sight.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Best for:</strong> those seeking perspective and spacious stillness with alpine grandeur.<br />
            <strong>Season:</strong> April&ndash;June, September&ndash;November.<br />
            <strong>Duration:</strong> 5&ndash;7 days.<br />
            <strong>Group size:</strong> maximum 12.
          </p>
          <p>
            <Link href="/locations/munsiyari" style={{ color: 'var(--color-primary)' }}>Explore Munsiyari &rarr;</Link>
            {' '}&nbsp;|&nbsp;{' '}
            <Link href="/retreats/munsiyari" style={{ color: 'var(--color-primary)' }}>Munsiyari retreats &rarr;</Link>
          </p>
        </section>

        {/* ── 5. SANKRI ─────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            5. Sankri &mdash; Trek &amp; Meditation Integration
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Sankri is a remote Himalayan basecamp &mdash; the launching point for Kedarkantha,
            Har Ki Dun, and other classic treks. Meditation here is not separate from movement;
            it is integrated with it. Walk through forests of oak and rhododendron, sit at camp,
            and let the body&rsquo;s exertion become the preparation for stillness.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Best for:</strong> those who meditate better after moving, trek-meditation combination seekers.<br />
            <strong>Season:</strong> March&ndash;June, September&ndash;November.<br />
            <strong>Duration:</strong> 5&ndash;10 days.<br />
            <strong>Group size:</strong> maximum 12.
          </p>
          <p>
            <Link href="/locations/sankri" style={{ color: 'var(--color-primary)' }}>Explore Sankri &rarr;</Link>
            {' '}&nbsp;|&nbsp;{' '}
            <Link href="/retreats/sankri" style={{ color: 'var(--color-primary)' }}>Sankri retreats &rarr;</Link>
          </p>
        </section>

        {/* ── MOUNTAIN VS COAST VS ASHRAM ──────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Himalayan Retreats vs. Coastal &amp; Ashram Settings
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            India&rsquo;s meditation retreats fall into three broad environments, each shaping practice
            in fundamentally different ways. Understanding these differences is the first step
            toward choosing correctly.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Himalayan mountain retreats</strong> use altitude, remoteness, and natural silence
            as active elements of the practice. At 2,000&ndash;3,500 metres, reduced oxygen gently
            quiets mental chatter without pharmaceutical intervention. Dense forests absorb
            ambient sound. The absence of phone signal, traffic, and tourism infrastructure
            removes the habitual triggers that keep the nervous system in its familiar loops.
            Himalayan retreats are environments where the land does half the work.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Coastal retreats</strong> &mdash; Goa, Kerala, parts of Karnataka &mdash;
            offer warmth, comfort, and accessibility. The sea provides a soothing ambient
            backdrop. However, coastal locations tend to be at sea level (no altitude benefit),
            near tourist infrastructure (more noise and distraction), and in tropical heat
            (which can make long sitting sessions physically uncomfortable). Coastal retreats
            work well for yoga-focused programmes or shorter wellness breaks, but they rarely
            provide the depth of silence available in the mountains.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Ashram retreats</strong> &mdash; particularly in Rishikesh, Varanasi, and
            South India &mdash; offer spiritual lineage and community. The meditation is embedded
            in a living tradition: daily rituals, chanting, teacher-student relationships
            extending back centuries. The environment is structured and disciplined rather
            than wild and remote. For practitioners seeking philosophical grounding alongside
            meditation technique, ashram-based retreats offer something mountains alone cannot.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            Our network includes both Himalayan mountain settings (Zanskar, Chakrata, Munsiyari,
            Sankri) and ashram-influenced practice (Rishikesh), giving you access to both
            paradigms. Many returning participants combine both: starting with a{' '}
            <Link href="/silent-retreats" style={{ color: 'var(--color-primary)' }}>silent retreat</Link>
            {' '}in the mountains, then deepening with an ashram stay. See our{' '}
            <Link href="/how-to-choose-a-meditation-retreat" style={{ color: 'var(--color-primary)' }}>guide to choosing a meditation retreat</Link>
            {' '}for a structured decision framework.
          </p>
        </section>

        {/* ── MEDITATION STYLES ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Meditation Styles at Indian Retreats
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Not all meditation retreats teach the same technique. The style of practice
            matters as much as the setting, and different traditions suit different temperaments.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Vipassana (insight meditation)</strong> is the most widely recognised
            tradition for silent retreats in India. Based on the Theravada Buddhist lineage
            popularised by S.N. Goenka, Vipassana uses systematic body scanning to develop
            equanimity. Sessions are typically long (one hour or more), in complete silence,
            with minimal teacher interaction. This style demands discipline and rewards
            persistence. It is available across India, but the Himalayan environment &mdash;
            particularly Zanskar with its{' '}
            <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>monastery setting</Link>
            {' '}&mdash; amplifies its effect.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Guided mindfulness meditation</strong> uses verbal instruction to direct
            attention &mdash; to the breath, body sensations, sounds, or thoughts. This is the
            most accessible style for beginners and forms the foundation of our{' '}
            <Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3-day retreats</Link>
            {' '}and{' '}
            <Link href="/5-day-yoga-retreat" style={{ color: 'var(--color-primary)' }}>5-day programmes</Link>
            . Guided sessions reduce the anxiety of &ldquo;not knowing what to do&rdquo; and
            allow participants to settle into practice without performance pressure.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Yogic meditation (dhyana)</strong> follows the Patanjali tradition and is
            closely integrated with physical yoga practice. Pranayama (breathwork) and asana
            prepare the body; meditation follows as the natural extension. This style is
            particularly strong in Rishikesh, where the{' '}
            <Link href="/yoga-retreats" style={{ color: 'var(--color-primary)' }}>yoga tradition</Link>
            {' '}provides both the technique and the philosophical framework.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            <strong>Walking and movement meditation</strong> integrates awareness practice
            with physical movement &mdash; forest walks, mountain traverses, or structured
            kinhin (Zen walking meditation). This style is central to our{' '}
            <Link href="/meditation-retreat-and-trek" style={{ color: 'var(--color-primary)' }}>trek-and-meditate programmes</Link>
            {' '}and is ideal for people who find extended sitting uncomfortable or who
            process experience through the body rather than the mind alone.
          </p>
        </section>

        {/* ── RETREAT LENGTH GUIDE ──────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            How Long Should a Meditation Retreat Be?
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Retreat duration determines what is possible. Each length offers a distinct
            quality of experience, and choosing the right duration is often more important
            than choosing the right technique.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>3 days (weekend retreat):</strong> enough to break the rhythm of daily life
            and experience a genuine shift in mental pace. The first day is usually decompression;
            the second day is where silence begins to work; the third day consolidates what has
            opened. A 3-day retreat is ideal for first-timers, busy professionals, or anyone
            who wants to test whether extended practice is right for them. Our{' '}
            <Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3-day meditation retreat</Link>
            {' '}in Chakrata is our most popular entry point.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>5&ndash;7 days:</strong> the minimum duration for real depth. By day three
            or four, the habitual mind runs out of familiar narratives and begins to settle
            into unfamiliar territory. This is where meditation stops being a technique and
            starts being an experience. Five to seven days allows time for the nervous system
            to downregulate, for sleep to deepen, and for insight to arise naturally rather
            than being forced. Our{' '}
            <Link href="/7-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>7-day meditation retreat</Link>
            {' '}and{' '}
            <Link href="/7-day-healing-retreat" style={{ color: 'var(--color-primary)' }}>7-day healing retreat</Link>
            {' '}are designed around this window.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>10 days or more:</strong> the traditional duration for Vipassana and deep
            silent retreats. Ten days provides enough time for the practice to work through
            layers of resistance, distraction, and emotional processing. Most participants
            describe a qualitative shift around day six or seven that is only accessible with
            longer commitment. Our{' '}
            <Link href="/10-day-silent-retreat" style={{ color: 'var(--color-primary)' }}>10-day silent retreat</Link>
            {' '}in Zanskar is designed for those ready to go deep. The two transit days
            (Leh to Zanskar and return) serve as natural decompression bookends.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            If you are unsure about duration, start shorter. A powerful 3-day experience
            in Chakrata often leads to a 7-day return visit &mdash; and eventually to
            Zanskar. The journey builds on itself.
          </p>
        </section>

        <PrimaryCTA
          label="Find the Right Duration for Me"
          subtext="Not sure about length or location? We'll match your schedule and intention to the right programme."
          vertical="retreat"
          category="best-meditation"
          sourcePath={PATH}
        />

        {/* ── HOW TO CHOOSE ─────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            How to Choose the Right Meditation Retreat
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            The &ldquo;best&rdquo; meditation retreat depends on three factors:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li><strong>Experience level:</strong> beginners start at Chakrata or Rishikesh; experienced practitioners choose Zanskar or Munsiyari.</li>
            <li><strong>Desired depth:</strong> for a reset, 3 days in Chakrata. For transformation, 7+ days in Zanskar.</li>
            <li><strong>Relationship with movement:</strong> if you need body and mind together, Sankri integrates trekking with meditation.</li>
          </ul>
          <p style={{ lineHeight: 1.8 }}>
            See our{' '}
            <Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>meditation retreats overview</Link>
            {' '}for detailed descriptions of each format, or explore all{' '}
            <Link href="/locations" style={{ color: 'var(--color-primary)' }}>Himalayan locations</Link>
            {' '}in our network.
          </p>
        </section>

        <PrimaryCTA
          label="Plan My Meditation Retreat"
          subtext="Describe what you're seeking — a mountain planner will recommend the right location."
          vertical="retreat"
          category="best-meditation"
          sourcePath={PATH}
        />

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <FeaturedRetreat
          title="7-Day Meditation Retreat in Zanskar Valley"
          description="Monastery immersion at 3,500 metres. The deepest silent retreat in India — for those ready for radical separation from the ordinary."
          links={[
            { label: 'Explore Zanskar', href: '/locations/zanskar' },
            { label: 'View all programmes', href: '/retreat-programs' },
            { label: 'See upcoming dates', href: '/retreat-calendar' },
          ]}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <RelatedReads
          links={[
            { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
            { label: 'Why People Go to Meditation Retreats', href: '/why-people-go-to-meditation-retreats' },
            { label: 'My 7-Day Meditation Retreat in Zanskar', href: '/my-7-day-meditation-retreat-in-zanskar' },
          ]}
        />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>&larr; Meditation Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>Himalayan Retreats Guide</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
