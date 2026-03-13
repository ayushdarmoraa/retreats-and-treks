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

const PATH = '/why-zanskar-is-perfect-for-retreats';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Why Zanskar Is Perfect for Meditation Retreats | Retreats And Treks',
    description:
      'What makes Zanskar one of the most compelling retreat destinations in the world — the altitude, the monasteries, the isolation, and the centuries-old contemplative culture that still defines daily life.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Why Zanskar Is Perfect for Meditation Retreats',
      description: 'Altitude, monasteries, isolation, and living contemplative culture.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Why Zanskar Is Perfect for Meditation Retreats'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Where exactly is Zanskar?',
    answer:
      'Zanskar is a remote valley in the Ladakh region of northern India, at an altitude of 3,500–4,000 metres. It is part of the Trans-Himalayan range, separated from the Kashmir Valley by the Great Himalayan Range and from Ladakh by the Zanskar Range. The valley is accessible by road from Kargil (7–9 hours) or by air via Leh followed by road travel.',
  },
  {
    question: 'Is Zanskar safe for international visitors?',
    answer:
      'Yes. Zanskar is a peaceful, predominantly Buddhist region with a welcoming local culture. It is part of the Ladakh Union Territory. The main safety considerations are altitude (requires acclimatisation), road conditions (mountain roads require experienced drivers), and weather (limited access in winter). Our retreats handle all logistics, transport, and safety planning.',
  },
  {
    question: 'Do I need to be Buddhist to attend a retreat in Zanskar?',
    answer:
      'No. Our retreats are secular and welcome people of all backgrounds and beliefs. Zanskar\'s monasteries have a long tradition of hosting contemplative visitors regardless of faith. The meditation techniques taught are evidence-based mindfulness practices, not religious instruction.',
  },
  {
    question: 'How does altitude affect meditation?',
    answer:
      'At 3,500 metres, the reduced oxygen naturally slows the body and mind. Breathing becomes more deliberate, physical activity requires more effort, and the body enters a state of heightened awareness. Many practitioners report that altitude creates a built-in stillness that supports meditation. Proper acclimatisation (1–2 days) is essential before intensive practice begins.',
  },
  {
    question: 'Is Zanskar appropriate for beginners?',
    answer:
      'Zanskar is best suited for people with some retreat experience or a strong adventurous spirit. The travel is challenging, the environment is rugged, and the isolation is genuine — no nearby towns, no easy exits. For beginners, we recommend starting with our Chakrata forest retreat, which offers the same facilitation in a more accessible setting.',
  },
];

export default function WhyZanskarPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Locations', url: buildCanonicalUrl('/locations') },
    { name: 'Zanskar', url: buildCanonicalUrl('/locations/zanskar') },
    { name: 'Why Zanskar?', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Zanskar Is Perfect for Meditation Retreats',
    description: 'What makes Zanskar an exceptional retreat destination.',
    url: canonicalUrl,
    author: { '@type': 'Organization', name: 'Retreats And Treks' },
    publisher: { '@type': 'Organization', name: 'Retreats And Treks' },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
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
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Locations', href: '/locations' }, { name: 'Zanskar', href: '/locations/zanskar' }, { name: 'Why Zanskar?' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Why Zanskar Is Perfect for Meditation Retreats
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            There are comfortable places to meditate. And then there is Zanskar &mdash;
            a valley at 3,500 metres where monasteries have held silence for over a
            thousand years, where the landscape is so vast it makes your inner noise feel
            small, and where the conditions for deep practice are not manufactured but
            natural.
          </p>
        </header>

        {/* --- The Landscape --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>The Landscape Does the Work</h2>
          <p style={proseStyle}>
            Zanskar is a high-altitude desert valley surrounded by peaks above 6,000
            metres. The sky is a shade of blue that does not exist at lower elevations.
            The air is thin, dry, and clear. Sound carries differently &mdash; a river
            two kilometres away is audible from a monastery courtyard. At night, the
            absence of light pollution reveals a sky so dense with stars that silence
            becomes visual.
          </p>
          <p style={proseStyle}>
            This is not decoration. The vastness of the landscape creates a perceptual
            shift that supports meditation directly. When you sit in a valley where the
            horizon is 50 kilometres away, the tight focus of daily anxiety loosens. The
            mind expands to match the space.
          </p>
        </section>

        {/* --- Living Tradition --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>A Living Contemplative Tradition</h2>
          <p style={proseStyle}>
            Zanskar is not a tourist destination that happens to have old temples. It is a
            functioning Buddhist community where monks and nuns have practised meditation
            continuously for over a millennium. Monasteries like Phuktal, Karsha, and
            Stongde are not museums &mdash; they are active centres of contemplative life.
          </p>
          <p style={proseStyle}>
            When you meditate in Zanskar, you are sitting in a place where sitting has
            been the primary activity for centuries. The walls of these monasteries have
            absorbed thousands of hours of practice. Whether or not you believe in the
            literal energy of a place, there is a quality of attention in spaces that have
            been used for contemplation that is difficult to replicate in a converted
            hotel or wellness centre.
          </p>
          <p style={proseStyle}>
            Read about{' '}
            <Link href="/my-7-day-meditation-retreat-in-zanskar" style={{ color: 'var(--color-primary)' }}>
              one person&rsquo;s experience of a 7-day retreat in Zanskar
            </Link>.
          </p>
        </section>

        {/* --- Altitude Effect --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>The Altitude Effect</h2>
          <p style={proseStyle}>
            At 3,500 metres, everything slows down. Walking is slower. Breathing is more
            deliberate. Physical exertion is limited. The body, without being asked,
            enters a gentler pace. This is exactly what meditation requires &mdash; a
            deceleration that at sea level must be consciously cultivated but at altitude
            happens automatically.
          </p>
          <p style={proseStyle}>
            The reduced oxygen also affects sleep patterns and energy levels, which can
            initially feel challenging but ultimately supports the retreat process. When
            you cannot rush, you stop trying to. When you cannot sustain your usual
            pace, you discover what exists beneath it.
          </p>
        </section>

        <PrimaryCTA
          label="Explore Zanskar Retreats"
          subtext="Limited availability — our Zanskar programmes run only in summer months."
          vertical="retreat"
          category="zanskar-guide"
          sourcePath={PATH}
        />

        {/* --- Genuine Isolation --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Genuine Isolation</h2>
          <p style={proseStyle}>
            Most retreat centres create artificial isolation &mdash; a quiet property
            within reach of a town. Zanskar does not need to manufacture remoteness.
            The nearest city (Leh) is a day&rsquo;s drive away. Mobile signal is
            intermittent or absent. There is no decision to make about being connected
            because connection is not available.
          </p>
          <p style={proseStyle}>
            This changes the retreat fundamentally. The digital detox is not voluntary
            &mdash; it is geographical. Read about{' '}
            <Link href="/a-week-without-my-phone-digital-detox" style={{ color: 'var(--color-primary)' }}>
              what a week without your phone actually feels like
            </Link>.
          </p>
        </section>

        {/* --- Not for everyone --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Zanskar Is Not for Everyone</h2>
          <p style={proseStyle}>
            Honesty matters here. Zanskar is rugged, remote, and physically demanding to
            reach. Accommodation in monasteries is basic. Temperatures can drop below
            freezing even in summer mornings. The food is simple and vegetarian. There is
            no spa, no luxury, no comfort beyond what is genuinely needed.
          </p>
          <p style={proseStyle}>
            If you want a comfortable first retreat, start with{' '}
            <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link>
            . If you want comfort plus mountains, look at our{' '}
            <Link href="/best-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>best Himalayan retreats</Link>
            {' '}page. Zanskar is for people who are ready to strip away comfort
            entirely and see what remains.
          </p>
        </section>

        {/* --- Practical next steps --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Planning a Zanskar Retreat</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>The retreat:</strong>{' '}
              <Link href="/meditation-retreat-zanskar" style={{ color: 'var(--color-primary)' }}>
                Meditation retreat in Zanskar
              </Link>
              {' '}&mdash; what the programme includes and who it&rsquo;s for
            </li>
            <li>
              <strong>Day by day:</strong>{' '}
              <Link href="/7-day-zanskar-meditation-retreat-itinerary" style={{ color: 'var(--color-primary)' }}>
                7-day Zanskar itinerary
              </Link>
            </li>
            <li>
              <strong>Next departure:</strong>{' '}
              <Link href="/zanskar-meditation-retreat-june-2026" style={{ color: 'var(--color-primary)' }}>
                June 2026 Zanskar programme
              </Link>
              {' '}&mdash; dates, pricing, availability
            </li>
            <li>
              <strong>When to go:</strong>{' '}
              <Link href="/best-time-for-a-retreat-in-zanskar" style={{ color: 'var(--color-primary)' }}>
                Best time for a retreat in Zanskar
              </Link>
            </li>
            <li>
              <strong>How to get there:</strong>{' '}
              <Link href="/how-to-reach-zanskar-for-a-retreat" style={{ color: 'var(--color-primary)' }}>
                How to reach Zanskar
              </Link>
            </li>
            <li>
              <strong>What to bring:</strong>{' '}
              <Link href="/what-to-pack-for-a-retreat" style={{ color: 'var(--color-primary)' }}>
                Complete packing list
              </Link>
              {' '}(includes Zanskar-specific altitude gear)
            </li>
          </ul>
        </section>

        <FeaturedRetreat
          title="7-Day Meditation Retreat in Zanskar"
          description="Monastery-based practice at 3,500m. All logistics, meals, acclimatisation, and facilitation included."
          links={[
            { label: 'Zanskar location details', href: '/locations/zanskar' },
            { label: 'See retreat dates', href: '/retreat-calendar' },
            { label: 'Find your retreat', href: '/find-your-retreat' },
          ]}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <RelatedReads
          links={[
            { label: 'Meditation Retreat in Zanskar', href: '/meditation-retreat-zanskar' },
            { label: '7-Day Zanskar Itinerary', href: '/7-day-zanskar-meditation-retreat-itinerary' },
            { label: 'Best Time for a Retreat in Zanskar', href: '/best-time-for-a-retreat-in-zanskar' },
            { label: 'How to Reach Zanskar', href: '/how-to-reach-zanskar-for-a-retreat' },
            { label: 'My 7-Day Retreat in Zanskar', href: '/my-7-day-meditation-retreat-in-zanskar' },
          ]}
        />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>&larr; Zanskar</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/locations" style={{ color: 'var(--color-primary)' }}>All Locations</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/retreat-calendar" style={{ color: 'var(--color-primary)' }}>Retreat Calendar</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
