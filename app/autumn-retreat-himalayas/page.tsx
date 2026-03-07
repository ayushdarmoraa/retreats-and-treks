import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/autumn-retreat-himalayas';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Autumn Retreat in the Himalayas — The Letting-Go Season | Retreats And Treks',
    description:
      'Autumn Himalayan retreats (September–November) — post-monsoon clarity, golden light, peak mountain views. The season of release. Meditation, silence, healing in Chakrata, Munsiyari, Rishikesh.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Autumn Retreat in the Himalayas',
      description: 'Post-monsoon clarity, golden light, peak mountain views. The Himalayan season of release.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Why is autumn considered the best season for Himalayan retreats?',
    answer:
      'September–November offers the clearest mountain views of the year. Monsoon has washed the air clean. Temperatures are comfortable (10–22°C at mid-altitude). The forests are still green but beginning to turn. Tourist crowds have not yet arrived. And psychologically, autumn\'s quality of release and settling mirrors the inner work of retreat — making it the most naturally aligned season.',
  },
  {
    question: 'Which autumn month is best for a retreat?',
    answer:
      'October is the sweet spot at most locations — clear skies, comfortable temperatures, post-monsoon lushness still visible. September works well but may have residual rain at lower altitudes. November is cooler and drier, transitioning toward winter. For Zanskar, September is the final window before passes close.',
  },
  {
    question: 'Are the mountains visible in autumn?',
    answer:
      'Autumn provides the best mountain visibility of the year. The monsoon clears atmospheric haze, and the air remains clean until winter haze builds in December. From Munsiyari, the Panchachuli range appears with crystalline sharpness. From Chakrata, distant Himalayan peaks emerge on clear days. The visual impact of these views during meditation or walking practice is profound.',
  },
  {
    question: 'Is autumn good for a combined retreat and trek?',
    answer:
      'Excellent. October–November is peak trekking season for most Himalayan routes. Snow has not yet arrived at passes below 4,500 m, the weather is stable, and the trails are dry. A common pattern is a 3–5 day retreat followed by a trek — the inner stillness from retreat enhances the trekking experience significantly.',
  },
];

export default function AutumnRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Autumn Retreat in the Himalayas', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Autumn Retreat Himalayas' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Autumn Retreat in the Himalayas
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            September through November. The monsoon withdraws and leaves everything clean.
            The air is crystalline. Mountains that were hidden for months reappear with
            startling clarity. The forests begin their turn &mdash; greens deepening toward
            gold. The light changes quality, becoming warmer and more angled. Autumn in the
            Himalayas is the season of release &mdash; the landscape is letting go, and it
            invites you to do the same. For retreat work involving grief, transition, completion,
            or simply settling, autumn provides the most aligned container.
          </p>
        </header>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Why Autumn for a Retreat
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><strong>Clearest views:</strong> Post-monsoon air is the cleanest of the year. Mountains appear with razor sharpness.</li>
            <li><strong>Golden light:</strong> Lower sun angle creates warm, contemplative light throughout the day.</li>
            <li><strong>Release energy:</strong> The season naturally supports letting go — leaves fall, the land simplifies.</li>
            <li><strong>Perfect temperature:</strong> 10–22°C at mid-altitude. Warm enough for outdoor practice, cool enough for deep sleep.</li>
            <li><strong>Trek compatibility:</strong> October–November is peak trek season. Combine retreat and trek.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Autumn Retreat Locations
          </h2>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Chakrata</Link> — Forest in Golden Light
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0 }}>
                October–November. The deodar forest takes on a golden-green quality as the sun
                angle drops. Morning mist burns off to reveal clear Himalayan views. The tourist
                season has not started. For meditation, silent retreat, and healing work, this
                is Chakrata at its most contemplative.
              </p>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/munsiyari" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Munsiyari</Link> — Panchachuli in Crystal Air
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0 }}>
                September–October. The Panchachuli peaks are at their most dramatic — washed clean
                by monsoon, not yet obscured by winter haze. The Khaliya meadows turn golden.
                For retreatants who process through landscape, this is the most visually powerful
                season.
              </p>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/rishikesh" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Rishikesh</Link> — Post-Monsoon Renewal
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0 }}>
                October onwards. The Ganges settles after monsoon, the air cools, and the ashram
                scene returns to its contemplative rhythm. Comfortable temperatures (20–28°C)
                perfect for yoga and meditation. The spiritual energy of the post-Navaratri season
                adds depth.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan an Autumn Retreat"
          subtext="September–November. Tell us your dates — we'll match the right location and approach."
          vertical="retreat"
          category="autumn-retreat"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Popular Autumn Retreats
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/silent-retreat-chakrata" style={{ color: 'var(--color-primary)' }}>Silent retreat in Chakrata</Link> — autumn forest silence at its deepest</li>
            <li><Link href="/meditation-retreat-zanskar" style={{ color: 'var(--color-primary)' }}>Meditation retreat in Zanskar</Link> — September: the final window</li>
            <li><Link href="/healing-retreat-munsiyari" style={{ color: 'var(--color-primary)' }}>Healing retreat in Munsiyari</Link> — autumn release in alpine landscape</li>
            <li><Link href="/spiritual-retreat-rishikesh" style={{ color: 'var(--color-primary)' }}>Spiritual retreat in Rishikesh</Link> — post-monsoon clarity on the Ganges</li>
            <li><Link href="/7-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>7-day meditation retreat</Link> — a full autumn immersion</li>
          </ul>
        </section>

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/winter-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>Winter Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/spring-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>Spring Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/summer-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>Summer Retreats</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
