import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/spiritual-awakening-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Spiritual Awakening Retreat — Beyond the Self You Know | Retreats And Treks',
    description:
      'Spiritual awakening retreat in the Indian Himalayas. Sustained meditation, silence, and contemplative practice in environments where awakening has been happening for millennia. Zanskar, Rishikesh, Chakrata.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Spiritual Awakening Retreat in the Himalayas',
      description: 'Sustained practice in environments where awakening has been happening for millennia.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Spiritual Awakening Retreat in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Can a retreat cause spiritual awakening?',
    answer:
      'A retreat cannot guarantee awakening any more than watering a plant guarantees flowering. But it can create the conditions — sustained silence, removed distractions, supported practice, and an environment that has held this work for centuries. Awakening, if it comes, arrives on its own schedule. The retreat simply makes you available for it.',
  },
  {
    question: 'Do I need to follow a specific spiritual tradition?',
    answer:
      'No. Our retreats draw from contemplative practices across traditions — Buddhist insight meditation, Hindu yogic practices, and non-denominational mindfulness — without requiring adherence to any tradition. The inner territory is universal. The techniques are tools, not dogma. Come with your own framework or come without one.',
  },
  {
    question: 'What is the difference between a spiritual retreat and a spiritual awakening retreat?',
    answer:
      'A spiritual retreat supports existing practice and provides depth. A spiritual awakening retreat is specifically oriented toward the dissolution of habitual identity structures — the fixed sense of "I" that most people take for granted. This requires longer duration, deeper silence, and greater willingness to sit with discomfort. It is not for beginners, though beginners sometimes arrive ready regardless.',
  },
  {
    question: 'How long should a spiritual awakening retreat be?',
    answer:
      'Seven days minimum. Ten days is more realistic. The first 3–5 days are typically spent dismantling the noise layer. The deeper work happens after that — and it requires sustained, uninterrupted practice. A 3-day retreat can provide a taste, but genuine movement toward awakening needs the extended container.',
  },
];

export default function SpiritualAwakeningRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Spiritual Awakening Retreat', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Spiritual Awakening Retreat' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Spiritual Awakening Retreat in the Himalayas
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Spiritual awakening is not what the market sells. It is not bliss on demand, cosmic
            visions on schedule, or enlightenment as a credential. It is the recognition that the
            person you take yourself to be &mdash; with all their stories, fears, ambitions, and
            complaints &mdash; is a construction. And that beneath the construction, something
            else has always been present. The Himalayas have been the geography for this recognition
            for untold centuries because the land itself teaches impermanence, scale, and silence
            in ways that no instruction can.
          </p>
        </header>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Who This Is For
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li>Experienced meditators seeking to deepen beyond technique into direct seeing</li>
            <li>People who have had glimpses of something beyond the personal self and want sustained access</li>
            <li>Those at a point where questions of identity, purpose, and meaning have become urgent</li>
            <li>Practitioners from any tradition who want silent container for intensive practice</li>
            <li>Anyone who has reached the limits of self-improvement and suspects something else is possible</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Discuss This Path"
          subtext="This retreat is for a specific inner state. Describe where you are — we'll tell you honestly if the timing is right."
          vertical="retreat"
          category="spiritual-awakening"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Where the Land Holds This Work
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/spiritual-retreat-zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar</Link> — monastery culture stretching back over a thousand years. The closest thing to a living awakening tradition.</li>
            <li><Link href="/spiritual-retreat-rishikesh" style={{ color: 'var(--color-primary)' }}>Rishikesh</Link> — the accumulated spiritual weight of India&rsquo;s contemplative capital. Tradition, lineage, and the Ganges.</li>
            <li><Link href="/spiritual-retreat-chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link> — for those who encounter the sacred through nature rather than tradition. Forest silence as teacher.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Duration Matters
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Awakening work requires sustained, unbroken practice. The mind needs days, not hours,
            to settle past its habitual patterns. Most serious practitioners recommend a minimum
            of 7 days.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/7-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>7-day retreat</Link> — the minimum for depth</li>
            <li><Link href="/10-day-silent-retreat" style={{ color: 'var(--color-primary)' }}>10-day silent retreat</Link> — the traditional container for intensive practice</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Begin the Inquiry"
          subtext="We match you to the right environment, duration, and approach for this stage of your practice."
          vertical="retreat"
          category="spiritual-awakening"
          sourcePath={PATH}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/spiritual-retreats" style={{ color: 'var(--color-primary)' }}>Spiritual Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/self-discovery-retreat" style={{ color: 'var(--color-primary)' }}>Self-Discovery Retreat</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/silent-retreats" style={{ color: 'var(--color-primary)' }}>Silent Retreats</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
