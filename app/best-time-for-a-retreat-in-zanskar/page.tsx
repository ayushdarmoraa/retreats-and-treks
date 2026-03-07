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

const PATH = '/best-time-for-a-retreat-in-zanskar';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Time for a Meditation Retreat in Zanskar — Month-by-Month Guide | Retreats And Treks',
    description:
      'When to visit Zanskar for a meditation retreat — the best months, weather conditions, road access, and how seasonal changes affect your practice. A month-by-month planning guide.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Best Time for a Meditation Retreat in Zanskar',
      description: 'Month-by-month weather, access, and retreat planning for Zanskar.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the best month for a retreat in Zanskar?',
    answer:
      'July and August are the most reliable months — stable weather, all roads open, longest daylight hours, and warmest temperatures (daytime highs of 20–25°C). June is good but roads may still be opening after winter. September offers beautiful autumn light but temperatures drop quickly and road closures can begin.',
  },
  {
    question: 'Can I visit Zanskar in winter?',
    answer:
      'Winter access to Zanskar is extremely limited. The road from Kargil closes from October/November until May/June. The famous Chadar trek (frozen river walk) provides winter access but is an expedition-grade trek, not a retreat journey. We do not operate winter retreats in Zanskar.',
  },
  {
    question: 'How cold does Zanskar get in summer?',
    answer:
      'Summer daytime temperatures range from 18–28°C, which is very comfortable. However, mornings and evenings drop to 5–10°C, and nights can approach freezing even in July. The temperature swing between day and night is dramatic — 15–20°C — so layered clothing is essential.',
  },
  {
    question: 'Does the monsoon affect Zanskar?',
    answer:
      'Zanskar sits in a rain shadow and receives very little direct monsoon rainfall. However, the monsoon causes landslides on access roads (particularly the Kargil–Padum road), which can cause temporary road closures. Our retreat logistics account for this with buffer days in the itinerary.',
  },
  {
    question: 'When do retreats in Zanskar run?',
    answer:
      'Our Zanskar retreat programmes run from mid-June to mid-September. The exact dates vary each year depending on road conditions and monastery availability. Check our retreat calendar for current season dates. We announce Zanskar dates 4–6 months in advance to allow for travel planning.',
  },
];

export default function BestTimeForZanskarPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Locations', url: buildCanonicalUrl('/locations') },
    { name: 'Zanskar', url: buildCanonicalUrl('/locations/zanskar') },
    { name: 'Best Time to Visit', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Time for a Meditation Retreat in Zanskar',
    description: 'Month-by-month guide to planning a Zanskar retreat.',
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
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Locations', href: '/locations' }, { name: 'Zanskar', href: '/locations/zanskar' }, { name: 'Best Time' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Best Time for a Meditation Retreat in Zanskar
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Zanskar is accessible for only four months of the year. The rest of the time,
            it is sealed by snow. Choosing the right month for your retreat affects
            everything &mdash; weather, road access, monastery schedules, and the quality
            of your experience.
          </p>
        </header>

        {/* --- Overview --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>The Short Answer</h2>
          <p style={proseStyle}>
            <strong>Best:</strong> July and August. Stable weather, open roads, warm days,
            clear skies.
          </p>
          <p style={proseStyle}>
            <strong>Good:</strong> Mid-June and September. Beautiful but with more risk &mdash;
            roads still opening in June, closing in September.
          </p>
          <p style={proseStyle}>
            <strong>Not possible:</strong> October through May. Roads closed, extreme cold,
            no retreat operations.
          </p>
        </section>

        {/* --- Month by month --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Month-by-Month Breakdown</h2>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>June (Mid-Month Onward)</h3>
          <p style={proseStyle}>
            The road from Kargil to Padum typically opens in early to mid-June, though this
            varies by year. Mid-June onwards is generally reliable. Temperatures are
            pleasant &mdash; 15&ndash;22°C during the day &mdash; and the valley is especially
            green. Snowmelt fills the rivers, and the landscape has a freshness that does
            not last into later summer.
          </p>
          <p style={proseStyle}>
            <strong>For retreats:</strong> June works well but book with flexibility. Road
            delays are common. Our June programmes include buffer days for exactly this
            reason. See our{' '}
            <Link href="/summer-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>summer retreat guide</Link>.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>July</h3>
          <p style={proseStyle}>
            Peak accessibility. All roads open, weather warm and stable (20&ndash;28°C
            daytime), and the days are long. This is the most popular month for Zanskar
            travel, which means you may encounter other visitors on the road &mdash; but
            once at the monastery, the isolation is total.
          </p>
          <p style={proseStyle}>
            <strong>For retreats:</strong> Ideal. The warm days make outdoor walking
            meditation and courtyard practice comfortable. Mornings are cool (5&ndash;10°C)
            which actually supports early sitting &mdash; the crisp air sharpens attention.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>August</h3>
          <p style={proseStyle}>
            Slightly warmer than July, with occasional afternoon clouds. The monsoon,
            while it does not rain in Zanskar directly, can cause landslides on the
            approach roads from the Kargil side. Travel delays of 2&ndash;6 hours are
            possible but rarely longer.
          </p>
          <p style={proseStyle}>
            <strong>For retreats:</strong> Excellent. Many of our best Zanskar retreats run
            in August. The valley is quiet as the initial wave of summer tourists has
            passed. Monastery schedules are settled and monks are available for
            interaction.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>September</h3>
          <p style={proseStyle}>
            Early September is beautiful &mdash; golden light, quiet valleys, and the
            beginning of autumn colour. Temperatures drop noticeably: 12&ndash;20°C
            during the day, near freezing at night. By late September, road closures
            become a real possibility.
          </p>
          <p style={proseStyle}>
            <strong>For retreats:</strong> Early September only. Our last Zanskar retreat
            each year typically ends by mid-September. The autumn atmosphere adds
            something &mdash; the approaching closure of the valley creates a sense of
            finality that deepens the retreat experience.
          </p>
        </section>

        <PrimaryCTA
          label="See Current Zanskar Dates"
          subtext="We announce Zanskar retreat dates 4–6 months in advance."
          vertical="retreat"
          category="zanskar-timing"
          sourcePath={PATH}
        />

        {/* --- How season affects practice --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>How the Season Affects Your Practice</h2>
          <p style={proseStyle}>
            Zanskar&rsquo;s summer is not just a weather window &mdash; the season changes
            the quality of your retreat in specific ways:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li><strong>Long daylight</strong> &mdash; 14&ndash;15 hours of light in June/July means early morning practice at 5am is in natural light, not darkness</li>
            <li><strong>Temperature range</strong> &mdash; cold mornings ground you. Warm afternoons allow outdoor practice. This natural rhythm mirrors traditional monastic schedules</li>
            <li><strong>Clear skies</strong> &mdash; the high-altitude sky creates a visual spaciousness that supports open awareness practices</li>
            <li><strong>Festival season</strong> &mdash; late July/August sometimes coincides with monastery festivals, adding cultural depth to the experience</li>
          </ul>
        </section>

        {/* --- Practical planning --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Planning Your Visit</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>Book 3&ndash;6 months in advance &mdash; Zanskar retreats have limited capacity</li>
            <li>Allow 2 travel days each way (Delhi &rarr; Leh &rarr; Zanskar)</li>
            <li>Include 1&ndash;2 acclimatisation days in Leh before heading to Zanskar</li>
            <li>Pack for a 20°C temperature range &mdash; see our{' '}
              <Link href="/what-to-pack-for-a-retreat" style={{ color: 'var(--color-primary)' }}>packing list</Link></li>
            <li>Read{' '}
              <Link href="/how-to-reach-zanskar-for-a-retreat" style={{ color: 'var(--color-primary)' }}>how to reach Zanskar</Link>
              {' '}for the complete travel guide</li>
            <li>View the{' '}
              <Link href="/meditation-retreat-zanskar" style={{ color: 'var(--color-primary)' }}>full Zanskar meditation retreat</Link>
              {' '}page for programme details</li>
            <li>See the{' '}
              <Link href="/zanskar-meditation-retreat-june-2026" style={{ color: 'var(--color-primary)' }}>June 2026 departure</Link>
              {' '}for dates and availability</li>
          </ul>
        </section>

        <FeaturedRetreat
          title="Zanskar Summer Retreat"
          description="Monastery-based meditation at 3,500m. June–September availability. All logistics handled."
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
            { label: 'Why Zanskar Is Perfect for Retreats', href: '/why-zanskar-is-perfect-for-retreats' },
            { label: 'How to Reach Zanskar', href: '/how-to-reach-zanskar-for-a-retreat' },
            { label: 'My 7-Day Retreat in Zanskar', href: '/my-7-day-meditation-retreat-in-zanskar' },
          ]}
        />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>&larr; Zanskar</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/retreat-calendar" style={{ color: 'var(--color-primary)' }}>Retreat Calendar</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/why-zanskar-is-perfect-for-retreats" style={{ color: 'var(--color-primary)' }}>Why Zanskar?</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
