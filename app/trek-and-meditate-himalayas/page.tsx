import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/trek-and-meditate-himalayas';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Trek and Meditate in the Himalayas — Walking as Practice | Retreats And Treks',
    description:
      'Trek and meditate in the Himalayas. Not a trek with meditation added — a practice where walking and sitting are equal partners. Himalayan trails as meditation halls. Chakrata, Sankri, Zanskar.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Trek and Meditate in the Himalayas',
      description: 'Walking and sitting as equal partners. Himalayan trails as meditation halls.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How does meditation integrate with trekking?',
    answer:
      'Walking meditation on the trail is the primary integration. Rather than trekking with headphones or constant conversation, we walk in silence with attention on breath, footstep, and sensory experience. Evening sitting meditation follows the day\'s walk. The physical tiredness from trekking settles the mind far more effectively than willpower alone. By day three, the line between "trekking" and "meditating" dissolves.',
  },
  {
    question: 'Is this suitable for non-meditators who love trekking?',
    answer:
      'Yes — this format is specifically designed for people who are drawn to meditation but find sitting practice difficult. Walking is the primary medium. If you can walk in the mountains, you can meditate in the mountains. No prior meditation experience is needed. The terrain does most of the teaching.',
  },
  {
    question: 'How is this different from a normal Himalayan trek?',
    answer:
      'Three differences: silence (portions of the day are walked without conversation), intentionality (attention is deliberately placed on the body and senses rather than left to wander), and evening practice (30–60 minutes of sitting meditation integrates the day). The result is a trek that leaves you not just physically refreshed but genuinely stiller inside.',
  },
  {
    question: 'What skill level is needed?',
    answer:
      'Moderate fitness for most routes. We select trails that support meditative walking — meaning steady gradients rather than technical scrambles, forests rather than exposed ridges, and pacing that allows attention rather than gasping. If you can walk 5–6 hours at a comfortable pace, you are ready.',
  },
];

export default function TrekAndMeditatePage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Trek and Meditate in the Himalayas', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Trek & Meditate' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Trek and Meditate in the Himalayas
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Walking is the oldest meditation. Before cushions and caves, before techniques
            and traditions, humans walked. Step after step, in silence, with attention on
            the body moving through landscape. The Himalayas are perhaps the most compelling
            landscape on earth for this practice &mdash; terrain that demands presence, beauty
            that arrests the wandering mind, altitude that simplifies thought to breath and step.
            This is not a trek with meditation added as a feature. It is a practice where walking
            and sitting are equal partners.
          </p>
        </header>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Who This Is For
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li>Trekkers who want more than exercise &mdash; who sense that mountains offer something beyond scenery</li>
            <li>People curious about meditation but unable to sit still long enough to try it</li>
            <li>Those who process through movement and feel claustrophobic in traditional retreat settings</li>
            <li>Experienced meditators who want to take their practice off the cushion and into the world</li>
            <li>Anyone who has walked in the mountains and felt something shift inside that they want to explore</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Explore Trek + Meditate"
          subtext="Tell us about your trekking experience and interest in meditation. We'll design the right route."
          vertical="retreat"
          category="trek-meditate"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            A Typical Day
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <tbody>
                {[
                  '5:30 AM — Wake. Tea in silence.',
                  '6:00 AM — Sitting meditation (30 minutes)',
                  '6:45 AM — Breakfast',
                  '7:30 AM — Trail departs. Silent walking.',
                  '10:00 AM — Rest stop. Brief body scan.',
                  '10:30 AM — Continue walking. Conversation permitted.',
                  '12:30 PM — Lunch at trail or camp.',
                  '2:00 PM — Afternoon trek or rest at camp.',
                  '4:30 PM — Arrive at camp. Settle.',
                  '5:30 PM — Evening sitting meditation (45 minutes)',
                  '6:30 PM — Dinner',
                  '8:00 PM — Star observation or early sleep.',
                ].map((row) => {
                  const [time, ...rest] = row.split(' — ');
                  return (
                    <tr key={row} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '0.6rem 0.5rem', whiteSpace: 'nowrap', fontWeight: 500 }}>{time}</td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>{rest.join(' — ')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Where to Walk and Sit
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link> — gentle forest trails perfect for walking meditation</li>
            <li><Link href="/locations/sankri" style={{ color: 'var(--color-primary)' }}>Sankri</Link> — classic Himalayan trails through valleys and villages</li>
            <li><Link href="/locations/munsiyari" style={{ color: 'var(--color-primary)' }}>Munsiyari</Link> — alpine meadow walks with Panchachuli panorama</li>
            <li><Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar</Link> — Trans-Himalayan trails between monasteries</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Walk With Us"
          subtext="The trail is the meditation hall. Let us show you which path suits your pace."
          vertical="retreat"
          category="trek-meditate"
          sourcePath={PATH}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/meditation-retreat-and-trek" style={{ color: 'var(--color-primary)' }}>Retreat + Trek</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/himalayan-retreat-with-trekking" style={{ color: 'var(--color-primary)' }}>Retreat with Trekking</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)' }}>Best Treks</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
