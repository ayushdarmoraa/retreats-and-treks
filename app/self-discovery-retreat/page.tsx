import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/self-discovery-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Self-Discovery Retreat in the Himalayas — Who You Are Without the Noise | Retreats And Treks',
    description:
      'Self-discovery retreat in the Indian Himalayas. Remove the noise, the roles, the obligations — and see what remains. Small-group immersive retreats in Chakrata, Zanskar, Rishikesh.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Self-Discovery Retreat in the Himalayas',
      description: 'Who you are without the noise. Himalayan retreats for genuine self-encounter.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What does a self-discovery retreat actually involve?',
    answer:
      'Meditation, silence, journalling, guided inquiry, and extended time in nature — but the real intervention is removal. We remove the familiar: screens, schedules, social roles, productivity pressure, and the default narratives you tell yourself. What remains in that space is what the retreat is about. It is different for every person, which is why it cannot be scripted — only held.',
  },
  {
    question: 'Do I need to know what I am looking for?',
    answer:
      'No. In fact, not knowing is a better starting position than a fixed agenda. A self-discovery retreat works by creating the conditions for insight to arise naturally — not by pursuing a specific answer. Come with curiosity rather than a checklist. The clarity usually shows up when you stop trying to manufacture it.',
  },
  {
    question: 'Is this a therapy retreat?',
    answer:
      'No. Self-discovery retreats are not therapeutic interventions. They are contemplative environments where you have sustained access to your own inner life. If therapeutic material surfaces (and it may), we hold it — but we are not therapists. If you are in acute psychological distress, professional support is more appropriate. If you are seeking depth and self-knowledge, this is the right space.',
  },
  {
    question: 'How long should a self-discovery retreat be?',
    answer:
      'Three days provides a genuine opening. Seven days allows depth. Ten days can be transformative. For a first experience, a 3-day or weekend retreat gives you enough time to settle past the surface without the commitment of a full week. If you have the time, 7 days is the sweet spot — enough depth for real discovery without the endurance challenge of 10.',
  },
];

export default function SelfDiscoveryRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Self-Discovery Retreat', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Self-Discovery Retreat' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Self-Discovery Retreat in the Himalayas
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            You are not lost. You are buried. Under roles, expectations, habits, devices,
            obligations, and the noise of a life that has been designed by everyone except you.
            A self-discovery retreat does not add anything. It subtracts. It removes the familiar
            structures and leaves you alone with the question that has been waiting beneath
            everything: who are you when there is nothing to perform, nothing to produce, and
            nowhere to be? The Himalayas have been holding that question for people for thousands
            of years.
          </p>
        </header>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Who This Is For
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li>People at a crossroads &mdash; career change, relationship shift, midlife reckoning</li>
            <li>Those who have achieved what they set out to achieve and found it was not enough</li>
            <li>Anyone whose daily life feels functional but hollow</li>
            <li>People seeking to reconnect with values, creativity, or purpose they have lost touch with</li>
            <li>Those drawn to inner work but not to religious frameworks</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Start the Conversation"
          subtext="Describe where you are. No obligation. We'll tell you honestly whether a retreat is the right next step."
          vertical="retreat"
          category="self-discovery"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            How It Works
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            A self-discovery retreat is not a workshop with modules and outcomes. It is an
            environment designed for encounter &mdash; with silence, with nature, with your own mind.
            The structure is simple: meditation, walking, journalling, rest. No goals. No
            performance metrics. No breakthroughs required.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            What happens is different for everyone. Some people find clarity they did not know
            they needed. Others find grief they had been carrying without knowing it. Some discover
            creative energy that had been dormant. Others discover rest &mdash; genuine, deep rest
            that they had forgotten was possible. The retreat does not determine the outcome. It
            creates the conditions and trusts the process.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Where to Do This
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/silent-retreat-chakrata" style={{ color: 'var(--color-primary)' }}>Silent retreat in Chakrata</Link> — gentle forest silence for first encounters</li>
            <li><Link href="/meditation-retreat-zanskar" style={{ color: 'var(--color-primary)' }}>Meditation retreat in Zanskar</Link> — radical separation for deep inquiry</li>
            <li><Link href="/spiritual-retreat-rishikesh" style={{ color: 'var(--color-primary)' }}>Spiritual retreat in Rishikesh</Link> — tradition-supported self-inquiry</li>
            <li><Link href="/healing-retreat-munsiyari" style={{ color: 'var(--color-primary)' }}>Healing retreat in Munsiyari</Link> — perspective through vast landscape</li>
          </ul>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Duration Options
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3-day retreat</Link> — enough to open the door</li>
            <li><Link href="/7-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>7-day retreat</Link> — depth for genuine discovery</li>
            <li><Link href="/10-day-silent-retreat" style={{ color: 'var(--color-primary)' }}>10-day silent retreat</Link> — sustained immersion for those ready</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Explore Self-Discovery Retreats"
          subtext="Not sure which format, location, or duration? We help you choose."
          vertical="retreat"
          category="self-discovery"
          sourcePath={PATH}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/spiritual-retreats" style={{ color: 'var(--color-primary)' }}>Spiritual Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/life-reset-retreat" style={{ color: 'var(--color-primary)' }}>Life Reset Retreat</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/personal-growth-retreat" style={{ color: 'var(--color-primary)' }}>Personal Growth Retreat</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
