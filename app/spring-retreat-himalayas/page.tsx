import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/spring-retreat-himalayas';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Spring Retreat in the Himalayas — Renewal Season | Retreats And Treks',
    description:
      'Spring Himalayan retreats (March–May) — blooming forests, warming mornings, clear mountain views. The season of renewal. Meditation, yoga, and healing in Chakrata, Rishikesh, Munsiyari.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Spring Retreat in the Himalayas',
      description: 'The season of renewal. Spring Himalayan retreats in blooming forests and warming mountains.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Spring Retreat in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'When exactly is spring in the Himalayas?',
    answer:
      'March through May. At lower altitudes (Rishikesh, 370 m), spring arrives in March with warming days. At mid-altitude (Chakrata, Mussoorie at ~2,000 m), April–May is peak spring with rhododendron blooms and clear skies. At high altitude (Munsiyari, 2,300 m), spring comes in May. The retreats are timed to each location\'s optimal window.',
  },
  {
    question: 'Is spring the best season for a Himalayan retreat?',
    answer:
      'Spring and autumn are the two peak retreat seasons. Spring has an advantage: the psychological association with renewal, longer days, blooming forests, and warming-but-still-cool temperatures. Many retreatants report that the season itself supports the inner process of opening and emergence. If your retreat intention involves new beginnings or transition, spring amplifies that.',
  },
  {
    question: 'What makes spring different from autumn for retreats?',
    answer:
      'Spring is expansive — days lengthen, flowers bloom, energy rises. Autumn is contractive — days shorten, trees shed, energy settles. Both are excellent for retreat work but serve different emotional needs. Spring suits those seeking renewal, emergence, or forward momentum. Autumn suits those seeking release, integration, or rest. Choose the season that mirrors your inner state.',
  },
  {
    question: 'Can I see rhododendron blooms during a spring retreat?',
    answer:
      'Yes. Peak rhododendron season is April–May at altitudes above 2,000 m. Chakrata, Munsiyari, and the forests around Sankri are especially vivid. The forest canopy turns red and pink — one of the most visually striking natural events in the Himalayas. A spring retreat in these locations includes this as natural backdrop.',
  },
];

export default function SpringRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Spring Retreat in the Himalayas', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Spring Retreat Himalayas' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Spring Retreat in the Himalayas
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            March through May. The mountains thaw. Rhododendrons ignite the forest canopy
            in red and pink. Streams swell with snowmelt. Mornings warm enough for outdoor
            meditation, nights cool enough for deep sleep. Spring in the Himalayas is not just
            a season &mdash; it is the landscape demonstrating renewal. For retreat work, this
            resonance between inner intention and outer environment is potent. If you are seeking
            a retreat that marks a new beginning, spring amplifies the signal.
          </p>
        </header>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Why Spring for a Retreat
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><strong>Renewal energy:</strong> The season mirrors inner emergence. Everything is opening.</li>
            <li><strong>Optimal weather:</strong> 12–25°C at most locations. Neither too hot nor too cold.</li>
            <li><strong>Visual beauty:</strong> Rhododendron blooms, wildflowers, crystal-clear mountain views.</li>
            <li><strong>Full access:</strong> All six retreat locations are accessible from March onwards.</li>
            <li><strong>Pre-tourist window:</strong> April–May is before peak season. Quiet and uncrowded.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Spring Retreat Locations
          </h2>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Chakrata</Link> — Forest Coming Alive
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0 }}>
                April–May. The deodar and oak forests fill with birdsong. Rhododendrons bloom.
                Temperatures are perfect for both indoor practice and outdoor walking meditation.
                The forest, which was austere in winter, now wraps you in green. Ideal for
                meditation, silent retreat, and healing work.
              </p>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/rishikesh" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Rishikesh</Link> — March Before the Heat
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0 }}>
                March is Rishikesh&rsquo;s sweet spot — warm days (25–30°C), cool mornings, the
                Ganges running clear before monsoon sediment. The spiritual scene is active but
                not yet crowded. Ideal for yoga retreats in the tradition&rsquo;s heartland.
              </p>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/munsiyari" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Munsiyari</Link> — Alpine Awakening
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0 }}>
                May brings Munsiyari to life — snow recedes from the Panchachuli view, wildflowers
                carpet the Khaliya meadows, and the air is crystal clear. The long approach journey
                deepens the sense of arrival. For retreatants drawn to dramatic landscape.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan a Spring Retreat"
          subtext="March–May. Tell us your preferred month and intention — we'll match the right location."
          vertical="retreat"
          category="spring-retreat"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Popular Spring Retreats
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/meditation-retreat-chakrata" style={{ color: 'var(--color-primary)' }}>Meditation retreat in Chakrata</Link> — April forest stillness</li>
            <li><Link href="/yoga-retreat-rishikesh" style={{ color: 'var(--color-primary)' }}>Yoga retreat in Rishikesh</Link> — March warmth + tradition</li>
            <li><Link href="/healing-retreat-munsiyari" style={{ color: 'var(--color-primary)' }}>Healing retreat in Munsiyari</Link> — May alpine renewal</li>
            <li><Link href="/stress-relief-retreat-chakrata" style={{ color: 'var(--color-primary)' }}>Stress relief in Chakrata</Link> — spring forest immersion</li>
            <li><Link href="/weekend-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>Weekend retreat</Link> — quick spring reset</li>
          </ul>
        </section>

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/summer-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>Summer Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/autumn-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>Autumn Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/winter-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>Winter Retreats</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
