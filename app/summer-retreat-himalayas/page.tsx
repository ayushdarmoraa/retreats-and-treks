import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/summer-retreat-himalayas';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Summer Retreat in the Himalayas — Escape the Heat, Find Altitude | Retreats And Treks',
    description:
      'Summer retreats in the Himalayas — meditation, yoga, and healing in cool mountain environments. Chakrata, Munsiyari, Zanskar. When the plains burn, the mountains hold space.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Summer Retreat in the Himalayas',
      description: 'When the plains burn, the mountains hold space. Summer retreats in cool Himalayan locations.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Summer Retreat in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the weather like during a summer Himalayan retreat?',
    answer:
      'At altitude (2,000–3,500 m), summer temperatures range from 15–25°C during the day and 5–15°C at night. This is dramatically cooler than the plains, where temperatures reach 40–45°C from April–June. The contrast makes the mountains feel like a different climate zone — because they are. Pre-monsoon (April–June) is optimally clear. Monsoon (July–August) brings rain but also lush greenery.',
  },
  {
    question: 'Is monsoon season suitable for retreats?',
    answer:
      'Yes, with the right location. Monsoon (July–August) brings rain, but locations like Zanskar sit in the rain shadow and remain dry. Chakrata receives moderate rainfall that makes the forest spectacularly lush without flooding. Rishikesh is best avoided during peak monsoon due to heat and humidity. The monsoon rhythm — rain, clearing, rain — can be deeply meditative.',
  },
  {
    question: 'Which summer location is best for a first retreat?',
    answer:
      'Chakrata in May–June is the ideal first summer retreat. Cool temperatures, lush forest, easy access from Dehradun, and genuinely quiet. Munsiyari offers more dramatic landscapes but requires a longer journey. Zanskar is best for experienced retreatants comfortable with altitude and remoteness.',
  },
  {
    question: 'Can I combine a summer retreat with trekking?',
    answer:
      'Absolutely. Summer is peak trekking season. Sankri, Munsiyari, and Zanskar all support combined retreat+trek itineraries. A common pattern: 3–5 day retreat followed by a 3–5 day trek, or vice versa. The combination of stillness and movement creates a particularly powerful experience.',
  },
];

export default function SummerRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Summer Retreat in the Himalayas', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Summer Retreat Himalayas' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Summer Retreat in the Himalayas
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            When the Indian plains become uninhabitable &mdash; 40°C, dust, the weight of
            compressed heat &mdash; the Himalayas offer altitude, cool air, and the kind of
            environmental relief that makes retreat work not just possible but natural. Summer
            in the mountains is green, vivid, and alive. Snow melts. Streams run. Flowers appear
            in meadows. And the cool mornings make 6 AM meditation feel like a gift rather than
            a discipline.
          </p>
        </header>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Why Summer for a Himalayan Retreat
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><strong>Temperature relief:</strong> 15–25°C vs 40°C+ on the plains. The body settles instantly.</li>
            <li><strong>Longest days:</strong> More natural light for practice, walking, and outdoor meditation.</li>
            <li><strong>Full accessibility:</strong> All six retreat locations are accessible from April–September.</li>
            <li><strong>Zanskar opens:</strong> June–September is the only window for Zanskar retreats — the deepest option.</li>
            <li><strong>Lush landscape:</strong> Forests green, wildflowers bloom, waterfalls peak.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Summer Retreat Locations
          </h2>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Chakrata</Link> — Cool Forest at 2,200 m
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0 }}>
                May–June in Chakrata is perfect — 15–22°C, the deodar forest at its most lush,
                and negligible tourist presence. The pre-monsoon air is exceptionally clear.
                Best for: meditation, silent retreat, stress relief.
              </p>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Zanskar</Link> — Trans-Himalayan Immersion
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0 }}>
                June–September only. At 3,500 m in the rain shadow, Zanskar has dry, clear summers.
                Monastery culture is at its most active. This is the only season for Zanskar retreat
                experiences — and the most immersive option anywhere in India.
              </p>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/munsiyari" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Munsiyari</Link> — Alpine Meadows at 2,300 m
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0 }}>
                May–June before the monsoon, or September after. Alpine wildflowers, Panchachuli
                views, and the Khaliya Top meadows are at their most striking. For retreatants
                who want dramatic landscape alongside inner work.
              </p>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/sankri" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Sankri</Link> — Trek-Retreat Gateway
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0 }}>
                Summer opens all high-altitude treks from Sankri. Combine burnout recovery or
                stress-relief retreat with Har Ki Dun or village walks. Physical engagement in
                the landscape alongside contemplative practice.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan a Summer Retreat"
          subtext="Tell us your month and what you're seeking. We'll match you to the right elevation."
          vertical="retreat"
          category="summer-retreat"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Popular Summer Retreats
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/meditation-retreat-zanskar" style={{ color: 'var(--color-primary)' }}>Meditation retreat in Zanskar</Link> — the deepest summer immersion</li>
            <li><Link href="/yoga-retreat-rishikesh" style={{ color: 'var(--color-primary)' }}>Yoga retreat in Rishikesh</Link> — available year-round but pre-monsoon is optimal</li>
            <li><Link href="/silent-retreat-munsiyari" style={{ color: 'var(--color-primary)' }}>Silent retreat in Munsiyari</Link> — alpine silence at its peak</li>
            <li><Link href="/burnout-recovery-retreat-sankri" style={{ color: 'var(--color-primary)' }}>Burnout recovery in Sankri</Link> — movement and recovery in the mountains</li>
            <li><Link href="/5-day-yoga-retreat" style={{ color: 'var(--color-primary)' }}>5-day yoga retreat</Link> — an ideal summer duration</li>
          </ul>
        </section>

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/winter-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>Winter Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/spring-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>Spring Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/autumn-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>Autumn Retreats</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
