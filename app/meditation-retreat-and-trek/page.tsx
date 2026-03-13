import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/meditation-retreat-and-trek';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Meditation Retreat and Trek — Stillness Meets Movement | Retreats And Treks',
    description:
      'Combine a meditation retreat with Himalayan trekking. Stillness and movement in the same journey — 3–5 days of silent practice followed by 3–5 days on the trail. Chakrata, Sankri, Zanskar.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Meditation Retreat and Trek in the Himalayas',
      description: 'Stillness meets movement. Combine silent practice with Himalayan trekking.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Meditation Retreat and Trek in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the typical format for a combined retreat and trek?',
    answer:
      'The most common format: 3–5 days of retreat (meditation, silence, rest) followed by 3–5 days of trekking. The retreat creates inner stillness, and the trek channels that stillness into movement through landscape. Some participants prefer the reverse — trek first to exhaust the body, then retreat to settle the mind. Both work. We recommend retreat-first for most people.',
  },
  {
    question: 'Do I need to be fit for the trekking portion?',
    answer:
      'Moderate fitness is sufficient for most of our treks. We are not climbing peaks. Typical trek days are 5–7 hours of walking on established trails at 2,000–4,000 m altitude. If you walk regularly and can handle stairs without distress, you can manage the treks. The retreat days before trekking also serve as acclimatization to altitude.',
  },
  {
    question: 'Can I do just the retreat or just the trek?',
    answer:
      'Absolutely. Both are offered independently. But the combination is more powerful than either alone. Meditation at altitude creates depth. Trekking after sustained silence creates a quality of presence on the trail that most trekkers never access. The two practices are complementary — each enhances the other.',
  },
  {
    question: 'Which locations support both retreat and trekking?',
    answer:
      'Chakrata offers gentle treks through deodar forests alongside retreat facilities. Sankri is the gateway to classic Uttarakhand treks (Har Ki Dun, Kedarkantha) with retreat options in the village. Zanskar offers the most extreme combination — monastery meditation meets high-altitude trekking in the Trans-Himalaya. Munsiyari provides alpine meadow treks with retreat space.',
  },
];

export default function MeditationRetreatAndTrekPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreat and Trek', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Meditation Retreat + Trek' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Meditation Retreat and Trek in the Himalayas
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Most retreat centres do not offer trekking. Most trekking companies do not understand
            meditation. We do both &mdash; because the combination produces something neither
            can achieve alone. Stillness experienced in retreat deepens the quality of presence
            on the trail. Physical engagement with the mountain deepens the quality of
            sitting practice. The body and mind are not separate systems. A combined retreat
            and trek treats them as one.
          </p>
        </header>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Why Combine Retreat and Trek
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><strong>Embodied meditation:</strong> Walking 6 hours through mountains after 3 days of silence creates a quality of moving meditation that is impossible to manufacture.</li>
            <li><strong>Physical release:</strong> The body stores what the mind processes in retreat. Trekking releases it through movement.</li>
            <li><strong>Altitude acclimatization:</strong> Retreat days serve as natural acclimatization before the trek.</li>
            <li><strong>Extended unplugging:</strong> 7–10 days without screens or schedules — long enough for genuine recalibration.</li>
            <li><strong>Complete experience:</strong> Inner work (retreat) + outer exploration (trek) = the full Himalayan experience.</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Design My Retreat + Trek"
          subtext="Tell us your fitness level, experience, and how many days you have. We'll create a combined itinerary."
          vertical="retreat"
          category="retreat-and-trek"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Sample Combinations
          </h2>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Chakrata: 3-Day Retreat + Weekend Trek (5–6 days)
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0, fontSize: '0.95rem' }}>
                3 days of meditation in the deodar forest, then 2–3 days of forest trekking to
                Tiger Falls, Budher Caves, and Deoban. The gentlest combination — ideal for
                first-timers. See <Link href="/meditation-retreat-chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata retreats</Link>.
              </p>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Sankri: 3-Day Retreat + Har Ki Dun Trek (8–9 days)
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0, fontSize: '0.95rem' }}>
                Silent retreat in the village, then a classic valley trek through ancient villages
                and pastoral landscapes. The retreat settles you; the trek carries that stillness
                through one of the most beautiful valleys in the Himalayas. See <Link href="/burnout-recovery-retreat-sankri" style={{ color: 'var(--color-primary)' }}>Sankri retreats</Link>.
              </p>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Zanskar: 5-Day Monastery Retreat + River Trek (10–12 days)
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0, fontSize: '0.95rem' }}>
                The most immersive combination. Meditation in the monastery tradition, then
                trekking along the Zanskar River or to Phuktal Gompa. Trans-Himalayan landscape
                at 3,500+ m. For experienced practitioners and fit trekkers. See <Link href="/meditation-retreat-zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar retreats</Link>.
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Explore Independently
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Retreats</h3>
              <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, fontSize: '0.9rem' }}>
                <li><Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>Meditation Retreats</Link></li>
                <li><Link href="/silent-retreats" style={{ color: 'var(--color-primary)' }}>Silent Retreats</Link></li>
                <li><Link href="/7-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>7-Day Retreat</Link></li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Treks</h3>
              <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, fontSize: '0.9rem' }}>
                <li><Link href="/treks" style={{ color: 'var(--color-primary)' }}>All Treks</Link></li>
                <li><Link href="/treks/beginner-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>Beginner Treks</Link></li>
                <li><Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)' }}>Best Treks</Link></li>
              </ul>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Combined Experience"
          subtext="Retreat + trek. We'll design the perfect ratio of stillness and movement."
          vertical="retreat"
          category="retreat-and-trek"
          sourcePath={PATH}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/himalayan-retreat-with-trekking" style={{ color: 'var(--color-primary)' }}>Retreat + Trekking</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/trek-and-meditate-himalayas" style={{ color: 'var(--color-primary)' }}>Trek &amp; Meditate</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/retreats" style={{ color: 'var(--color-primary)' }}>All Retreats</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
