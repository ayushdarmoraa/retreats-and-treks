import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/winter-retreat-himalayas';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Winter Retreat in the Himalayas — Snow, Silence, Recalibration | Retreats And Treks',
    description:
      'Winter retreats in the Himalayas — meditation, healing, and deep rest in Chakrata, Rishikesh, and Mussoorie. Cold air, clear skies, fewer people. The quietest season for the deepest work.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Winter Retreat in the Himalayas',
      description: 'The quietest season for the deepest work. Himalayan winter retreats in Chakrata, Rishikesh, Mussoorie.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How cold does it get during a Himalayan winter retreat?',
    answer:
      'Chakrata (2,200 m) drops to 0–5°C at night, 10–15°C daytime from December–February. Rishikesh (370 m) stays milder at 5–20°C. Mussoorie ranges 0–10°C. Accommodation is heated or insulated, and warm bedding is provided. The cold is part of the experience — it sharpens attention and makes the warm retreat spaces feel like sanctuaries.',
  },
  {
    question: 'Which locations are accessible in winter?',
    answer:
      'Chakrata, Rishikesh, and Mussoorie remain accessible throughout winter. Roads may occasionally close for heavy snowfall in Chakrata, but typically for hours, not days. Zanskar is inaccessible from October–May. Munsiyari access becomes unreliable in deep winter. Sankri is snow-covered but sometimes accessible for combined trek–retreat experiences.',
  },
  {
    question: 'Is winter a good time for a first retreat?',
    answer:
      'Winter is an excellent time for a first retreat. The cold naturally encourages inward focus. Tourist numbers drop to near zero, creating genuine solitude. The short days and early dark create a natural rhythm of practice and rest. Rishikesh in winter offers the gentlest entry — warm enough for comfort, quiet enough for depth.',
  },
  {
    question: 'What should I pack for a winter Himalayan retreat?',
    answer:
      'Layers: thermal base, fleece mid-layer, and a warm outer jacket. Warm socks, a beanie, and gloves for morning walks. A shawl or blanket for meditation sessions. Hot water bottles are provided. The key is warmth without bulk — you want to be comfortable sitting for extended periods. See our preparation guide for full details.',
  },
];

export default function WinterRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Winter Retreat in the Himalayas', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Winter Retreat Himalayas' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Winter Retreat in the Himalayas
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Winter strips the Himalayas to essentials. The tourists leave. The forests go quiet.
            Snow covers the high passes and seals the valleys into stillness. Temperatures drop
            and the cold becomes a collaborator &mdash; sharpening attention, encouraging inwardness,
            making the warmth of a fire or a blanket feel like a gift. For retreat work, winter
            is the most potent season. Fewer distractions. Clearer air. Longer nights for rest.
            And something in the cold itself that says: go inward.
          </p>
        </header>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Why Winter for a Retreat
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><strong>Solitude:</strong> Tourist numbers drop 90%+. You may be the only group in the area.</li>
            <li><strong>Acoustic clarity:</strong> Cold air carries sound differently. The silence is sharper.</li>
            <li><strong>Natural rhythm:</strong> Short days create early evenings and long, restorative sleep.</li>
            <li><strong>Inward pull:</strong> The cold naturally discourages wandering and encourages sitting, reading, reflecting.</li>
            <li><strong>Visual beauty:</strong> Snow-dusted forests, frost on glass, clear mountain views unobscured by haze.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Winter Retreat Locations
          </h2>

          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Chakrata</Link> — Forest Silence in Snow
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0 }}>
                At 2,200 m, Chakrata receives light snowfall in January–February. The deodar
                forests become even quieter under snow. Accommodation is heated. The combination
                of forest and snow creates an environment of extraordinary stillness. Accessible
                year-round from Dehradun.
              </p>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/rishikesh" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Rishikesh</Link> — Warm Winter Retreat
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0 }}>
                At 370 m, Rishikesh stays mild enough for comfortable outdoor practice even in
                December–February. The Ganges runs clear in winter. The ashrams are quieter. Morning
                fog on the river creates a meditative atmosphere. The most accessible winter option.
              </p>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/mussoorie" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Mussoorie</Link> — Cloud-Wrapped Quiet
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0 }}>
                Mussoorie in winter is a different town. The tourists leave and the mist settles.
                Occasional snowfall transforms the ridgelines. The quieter pockets around Cloud
                End become ideal retreat spaces. 1.5 hours from Dehradun.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan a Winter Retreat"
          subtext="Tell us your dates and what you're seeking. We'll recommend the right winter location."
          vertical="retreat"
          category="winter-retreat"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Winter Retreat Options
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/meditation-retreat-chakrata" style={{ color: 'var(--color-primary)' }}>Meditation retreat in Chakrata</Link> — forest silence intensified by cold</li>
            <li><Link href="/silent-retreat-chakrata" style={{ color: 'var(--color-primary)' }}>Silent retreat in Chakrata</Link> — winter is the natural season for silence</li>
            <li><Link href="/yoga-retreat-rishikesh" style={{ color: 'var(--color-primary)' }}>Yoga retreat in Rishikesh</Link> — warm enough for asana, quiet enough for depth</li>
            <li><Link href="/healing-retreat-rishikesh" style={{ color: 'var(--color-primary)' }}>Healing retreat in Rishikesh</Link> — gentle winter climate for recovery</li>
            <li><Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3-day meditation retreat</Link> — a focused winter weekend</li>
          </ul>
        </section>

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/summer-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>Summer Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/spring-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>Spring Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/autumn-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>Autumn Retreats</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
