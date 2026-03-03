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

const PATH = '/retreats/best-retreat-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: '10 Best Retreats in Uttarakhand (2026 Guide) — Yoga, Luxury & Weekend Picks',
    description:
      'Looking for the best retreat in Uttarakhand? Compare yoga retreats in Rishikesh, luxury escapes in Munsiyari, weekend resets near Delhi and seasonal Himalayan wellness programs — ranked by purpose and budget.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: '10 Best Retreats in Uttarakhand (2026) — Yoga, Luxury & Weekend Picks',
      description:
        'Looking for the best retreat in Uttarakhand? Compare yoga retreats in Rishikesh, luxury escapes in Munsiyari, weekend resets near Delhi and seasonal Himalayan wellness programs.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is the best yoga retreat in Uttarakhand?',
    answer:
      'Rishikesh is the best location for a yoga retreat in Uttarakhand. It offers the deepest instructor pool, the widest range of yoga styles (Hatha, Vinyasa, Ashtanga, Yin), riverside practice settings along the Ganges, and year-round availability. For a quieter mountain alternative, Sankri and Munsiyari offer yoga programs at higher altitude with smaller groups and forest immersion.',
  },
  {
    question: 'What is the best retreat near Delhi?',
    answer:
      'Chakrata is the best retreat destination near Delhi — six hours by road, no flight required. It offers weekend-friendly wellness stays with yoga, meditation, forest walks, and Himalayan stillness at 2,200 metres. Rishikesh is also reachable in five to six hours and offers a wider range of programs. For a two-day escape, Chakrata is the most practical option. For a deeper program, choose Rishikesh.',
  },
  {
    question: 'Is Munsiyari better than Rishikesh for a retreat?',
    answer:
      'They serve different needs. Munsiyari is better for seclusion, alpine views, and premium stillness — it sits at 2,200 metres facing the Panchachuli peaks and receives very few visitors. Rishikesh is better for structured yoga training, instructor access, and spiritual heritage. Choose Munsiyari for luxury and solitude. Choose Rishikesh for depth and technique.',
  },
  {
    question: 'Which retreat is best in summer?',
    answer:
      'Munsiyari and Sankri are the best summer retreat destinations. Both sit above 2,000 metres where temperatures stay between 15 and 25 degrees while the plains exceed 40. Green forests, cool air, and snow-peak views make summer the ideal season for mountain wellness. Rishikesh is warm in summer but still operational with riverside programs.',
  },
  {
    question: 'Are retreats in Uttarakhand beginner-friendly?',
    answer:
      'Yes. Most retreats in Uttarakhand are designed for beginners and do not require prior yoga or meditation experience. Guided programs include foundational sessions, personal instruction, and progressive difficulty. Chakrata and Rishikesh are the most beginner-friendly locations — accessible, well-supported, and geared toward first-time participants.',
  },
  {
    question: 'How many days are ideal for a Himalayan retreat?',
    answer:
      'Two to three days works for a weekend reset — enough for a few yoga sessions, guided meditation, and mountain stillness. Five to seven days is ideal for a meaningful transformation — deeper practice, accumulated rest, and real detachment from routine. For immersive programs (teacher training, silent retreats), ten days or more is standard. Choose duration based on objective: reset, restore, or transform.',
  },
];

export default function BestRetreatInUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Best Retreat in Uttarakhand', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Retreats in Uttarakhand',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: 5,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Yoga Retreats in Rishikesh',
        url: buildCanonicalUrl('/retreats/yoga-retreat-rishikesh'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Meditation Retreats in Rishikesh',
        url: buildCanonicalUrl('/retreats/meditation-retreat-rishikesh'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Luxury Himalayan Retreats',
        url: buildCanonicalUrl('/retreats/luxury-himalayan-retreats'),
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Weekend Himalayan Retreats',
        url: buildCanonicalUrl('/retreats/weekend-himalayan-retreats'),
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Retreats Near Delhi',
        url: buildCanonicalUrl('/retreats/retreat-near-delhi'),
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '10 Best Retreats in Uttarakhand (2026 Guide)',
    description:
      'Looking for the best retreat in Uttarakhand? Compare yoga retreats in Rishikesh, luxury escapes in Munsiyari, weekend resets near Delhi and seasonal Himalayan wellness programs — ranked by purpose and budget.',
    url: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Retreats And Treks',
    },
    about: {
      '@type': 'Thing',
      name: 'Himalayan wellness retreats in Uttarakhand',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2'],
    },
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          breadcrumbSchema,
          faqSchema,
          itemListSchema,
          webPageSchema,
        ]) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Best Retreat in Uttarakhand' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Best Retreats in Uttarakhand: Top Mountain Wellness Escapes Ranked by Purpose &amp; Season
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Uttarakhand is India&rsquo;s most concentrated mountain wellness region —
            but the &ldquo;best&rdquo; retreat depends entirely on your goal. A yoga
            immersion in Rishikesh feels different from alpine seclusion in Munsiyari
            or a short forest reset in Chakrata.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            This ranked guide compares the best retreats in Uttarakhand by purpose,
            season, duration and budget. Whether you want structured daily yoga, silent
            meditation, a luxury mountain escape or a two-day reset near Delhi,
            you&rsquo;ll find the right retreat category below.
          </p>
        </header>

        <PrimaryCTA
          label="Plan My Retreat"
          subtext="Not sure which retreat suits you? A mountain planner can help."
          vertical="retreat"
          category="apex"
          sourcePath={PATH}
        />

        {/* ── QUICK COMPARISON ──────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Quick Comparison — Best Retreats by Category
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The table below maps each retreat objective to its strongest location. These
            are not interchangeable — a yoga retreat in Rishikesh and a luxury retreat in
            Munsiyari serve fundamentally different needs even though both fall under
            &ldquo;Himalayan retreat.&rdquo; Skim the category that matches your intent,
            then read the detailed section below.
          </p>
          <div style={{ overflowX: 'auto', marginBottom: '0.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', lineHeight: 1.7 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem 1rem', fontWeight: 600 }}>Category</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 1rem', fontWeight: 600 }}>Best Option</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Best Yoga Retreat', 'Rishikesh'],
                  ['Best Meditation Retreat', 'Rishikesh / Munsiyari'],
                  ['Best Luxury Retreat', 'Munsiyari'],
                  ['Best Weekend Retreat', 'Chakrata'],
                  ['Best Retreat Near Delhi', 'Chakrata / Rishikesh'],
                  ['Best Summer Retreat', 'Munsiyari / Sankri'],
                  ['Best Winter Retreat', 'Rishikesh'],
                ].map(([category, option]) => (
                  <tr key={category} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.5rem 1rem' }}>{category}</td>
                    <td style={{ padding: '0.5rem 1rem' }}>{option}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <PrimaryCTA
          label="Speak With a Mountain Planner"
          subtext="Ready to start planning? Share your preferences and dates."
          vertical="retreat"
          category="apex"
          sourcePath={PATH}
        />

        {/* ── YOGA ──────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Yoga Retreat — Rishikesh
          </h2>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Why Rishikesh Leads for Yoga
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Rishikesh is the undisputed centre of yoga retreat culture in northern India.
            The concentration of certified instructors, the range of styles (Hatha,
            Vinyasa, Ashtanga, Yin, Kundalini), and the Ganges-side practice settings
            make it the default choice for anyone whose primary retreat goal is yoga. Our{' '}
            <Link href="/retreats/yoga-retreat-rishikesh" style={{ color: 'var(--color-primary)' }}>
              yoga retreat in Rishikesh
            </Link>{' '}
            guide covers structure, scheduling, and instructor profiles in detail.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Rishikesh yoga programs run year-round. Winter mornings are cool and focused.
            Monsoon (July to September) limits some outdoor sessions but deepens the
            contemplative atmosphere. Spring and autumn are peak seasons — clear weather,
            moderate temperatures, and the river at its cleanest.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            For yoga practice combined with mountain altitude and forest immersion rather
            than river-valley energy, see the broader{' '}
            <Link href="/retreats/yoga-retreat-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              yoga retreat in Uttarakhand
            </Link>{' '}
            overview, which includes Chakrata and Sankri options alongside Rishikesh.
          </p>
        </section>

        {/* ── MEDITATION ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Meditation Retreat — Mountain &amp; River Options
          </h2>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            River Stillness vs Alpine Silence
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Meditation retreats split into two distinct experiences in Uttarakhand.{' '}
            <Link href="/retreats/rishikesh" style={{ color: 'var(--color-primary)' }}>
              Rishikesh
            </Link>{' '}
            offers structured programs: guided Vipassana, mindfulness courses, silent
            retreats with group support, and ashram-based practice rooted in decades of
            lineage. The{' '}
            <Link href="/retreats/meditation-retreat-rishikesh" style={{ color: 'var(--color-primary)' }}>
              meditation retreat in Rishikesh
            </Link>{' '}
            guide covers these programs in detail.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/retreats/munsiyari" style={{ color: 'var(--color-primary)' }}>
              Munsiyari
            </Link>{' '}
            offers something different — altitude silence. At 2,200 metres facing the
            Panchachuli massif, Munsiyari provides natural stillness that no guided
            session can replicate. Fewer visitors, thinner air, wider horizons. Meditation
            here is landscape-driven rather than instructor-driven. It suits experienced
            practitioners or anyone seeking genuine seclusion.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            For a complete view across all meditation-friendly locations, see{' '}
            <Link href="/retreats/meditation-retreat-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              meditation retreats in Uttarakhand
            </Link>
            .
          </p>
        </section>

        {/* ── LUXURY ────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Luxury Retreat — Alpine Seclusion
          </h2>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Why Munsiyari Leads for Luxury
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Luxury in the Himalayas is not about marble lobbies — it is about privacy,
            views, curated programming, and the absence of crowds. Munsiyari leads this
            category. Its combination of Panchachuli panoramas, limited visitor volume,
            and premium accommodation creates a retreat experience closer to alpine
            seclusion than mainstream hospitality.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            The{' '}
            <Link href="/retreats/luxury-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              luxury Himalayan retreats
            </Link>{' '}
            guide compares premium options across all locations — Munsiyari for
            alpine exclusivity, Rishikesh for heritage luxury, and Sankri for
            off-grid wilderness comfort. If your primary criterion is quality of
            accommodation and curated experience rather than program intensity, start
            there.
          </p>
        </section>

        {/* ── WEEKEND ───────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Weekend Retreat Near Delhi
          </h2>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Why Chakrata Leads for Weekends
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            For a two-day mountain wellness escape from Delhi, NCR or Chandigarh,{' '}
            <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)' }}>
              Chakrata
            </Link>{' '}
            is the most time-efficient option. Six hours by road, no flight, no complex
            logistics. At 2,200 metres, it delivers immediate altitude relief — cool air,
            deodar forest, Himalayan quiet — the moment you arrive. Morning yoga, afternoon
            forest walks, evening meditation. A weekend is enough to feel the shift.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            Our{' '}
            <Link href="/retreats/weekend-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              weekend Himalayan retreats
            </Link>{' '}
            guide covers two-day and three-day formats across all locations. For options
            beyond Chakrata, including Rishikesh and Mussoorie, see the full{' '}
            <Link href="/retreats/retreat-near-delhi" style={{ color: 'var(--color-primary)' }}>
              retreat near Delhi
            </Link>{' '}
            comparison.
          </p>
        </section>

        {/* ── BY SEASON ─────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Retreat by Season
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Season determines which locations are at their peak and which offer off-season
            value.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Summer (April to June).</strong> Munsiyari and{' '}
            <Link href="/retreats/sankri" style={{ color: 'var(--color-primary)' }}>
              Sankri
            </Link>{' '}
            are at their best —
            green valleys, snow-peak views, temperatures between 15 and 25 degrees while
            the plains bake above 40. High-altitude summer retreats combine forest bathing,
            yoga, and the clearest mountain visibility of the year. See{' '}
            <Link href="/retreats/summer-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              summer Himalayan retreats
            </Link>{' '}
            for full seasonal options.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>Winter (October to February).</strong> Rishikesh is the strongest
            winter retreat destination — cool mornings sharpen yoga practice, the Ganges
            is at its clearest, and the valley is uncrowded after monsoon. Chakrata offers
            cold-air forest stillness with occasional frost. High-altitude locations
            (Munsiyari, Sankri) close or operate limited winter programs. See{' '}
            <Link href="/retreats/winter-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              winter Himalayan retreats
            </Link>{' '}
            for details.
          </p>
        </section>

        {/* ── HOW TO CHOOSE ─────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            How to Choose the Best Retreat for You
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Five dimensions determine the right retreat.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Duration.</strong> Two to three days: Chakrata or Rishikesh weekend
            format. Five to seven days: Rishikesh deep program, Munsiyari immersion, or
            Sankri wilderness stay. Ten days or more: teacher training, silent retreat, or
            extended personal practice.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Budget.</strong> Chakrata and Sankri offer the most affordable mountain
            wellness experiences. Rishikesh spans every price bracket from ashram-basic to
            heritage-premium. Munsiyari skews toward the higher end due to its exclusivity
            and limited capacity.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Intensity.</strong> For structured, instructor-led programs with daily
            schedules: Rishikesh. For self-directed rest with optional guided sessions:
            Chakrata or Munsiyari. For a blend of nature immersion and light wellness
            programming: Sankri.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Location preference.</strong> River energy: Rishikesh. Forest altitude:
            Chakrata. High-alpine solitude: Munsiyari. Wilderness valley: Sankri. Each
            landscape shapes the retreat experience at a fundamental level.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Travel time.</strong> Five to six hours from Delhi: Rishikesh or
            Chakrata. Eight to nine hours: Sankri. Twelve hours or overnight: Munsiyari.
            Travel time is the most common constraint — if you have only a weekend, your
            location is decided before you choose a program.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            For a structured view of all options by location and program type, see the{' '}
            <Link href="/retreats/uttarakhand-retreats" style={{ color: 'var(--color-primary)' }}>
              Uttarakhand retreats
            </Link>{' '}
            overview and the main{' '}
            <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Himalayan retreats in India
            </Link>{' '}
            directory.
          </p>
          <p style={{ lineHeight: 1.8, marginTop: '1rem', margin: 0 }}>
            Program styles vary significantly across locations. Rishikesh offers the widest spectrum — Hatha yoga for alignment-focused practice, Vinyasa for dynamic flow, pranayama-centred breathwork intensives, and structured Vipassana-style silent immersion programs lasting three to ten days. Munsiyari and Sankri operate on a boutique retreat format: small groups of four to eight, private facilitator models where a single lead practitioner holds the entire program arc, and silent-immersion scheduling that eliminates group social pressure. Chakrata programs lean toward weekend-accessible gentle yoga and guided nature meditation rather than intensive technique training. Understanding the distinction between ashram-style group instruction, boutique private facilitation, and self-directed silent retreats is the single most important factor in choosing well.
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
