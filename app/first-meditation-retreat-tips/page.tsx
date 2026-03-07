import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/first-meditation-retreat-tips';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'First Meditation Retreat Tips — What I Wish I\'d Known | Retreats And Treks',
    description:
      'First meditation retreat tips from experienced retreatants — what to pack, how to handle day one, dealing with discomfort, choosing duration, and the one thing nobody tells you.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'First Meditation Retreat Tips',
      description: 'Practical advice from people who\'ve been where you are — nervous, curious, and ready.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How do I know I am ready for my first retreat?',
    answer:
      'You are ready when you are curious enough to try and honest enough to be uncomfortable. There is no prerequisite level of meditation experience, fitness, or spiritual development. If you are reading this page, you are ready. The only thing you need to bring is willingness.',
  },
  {
    question: 'Should my first retreat be silent?',
    answer:
      'It can be. A 3-day silent retreat in a gentle environment like Chakrata is manageable for complete beginners. The silence is supported by the forest environment and the structure of the day. If the idea of sustained silence feels overwhelming, start with a meditation retreat that includes some talking periods.',
  },
  {
    question: 'What if I feel like leaving on day one?',
    answer:
      'Almost everyone feels this on day one. It is the mind\'s protest at losing its habitual stimulation. Stay. The discomfort of day one is temporary. What lies beyond it is why people call retreats life-changing. If you leave on day one, you leave with the only the difficult part of the experience.',
  },
  {
    question: 'Is it better to go alone or with a friend?',
    answer:
      'Going alone is usually better, especially for silent retreats. A friend becomes a social anchor — someone to make eye contact with, to compare experiences with, to perform for. Going alone forces you into the full experience with no social buffer. If you do go with someone, commit to not seeking each other out during the retreat.',
  },
];

export default function FirstMeditationRetreatTipsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'First Retreat Tips', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
      />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Meditation Retreats', href: '/meditation-retreats' }, { name: 'First Retreat Tips' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            First Meditation Retreat: Tips from People Who Have Been There
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Your first meditation retreat is unlike anything you have done before. Not harder,
            necessarily &mdash; but different in a way that is difficult to prepare for
            intellectually. These tips come from retreatants who were exactly where you are now:
            curious, nervous, and unsure what they were getting themselves into. They all came back.
          </p>
        </header>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            1. Start With the Right Duration
          </h2>
          <p style={{ lineHeight: 1.8 }}>
            Three days is the sweet spot for a first retreat. Long enough for genuine depth.
            Short enough that the commitment feels manageable. A{' '}
            <Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3-day meditation retreat</Link> or{' '}
            <Link href="/weekend-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>weekend retreat</Link>{' '}
            gives you the full arc &mdash; adjustment, settling, depth &mdash; without requiring a
            week off work. If that goes well,{' '}
            <Link href="/7-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>7 days</Link> awaits.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            2. Choose Environment Over Prestige
          </h2>
          <p style={{ lineHeight: 1.8 }}>
            The famous retreat with the celebrity teacher and 50 participants will give you a
            different experience than a small-group retreat in a Himalayan forest with an
            experienced guide and 10 people. For your first retreat, choose the second. The
            environment matters more than the brand. Read{' '}
            <Link href="/how-to-choose-a-meditation-retreat" style={{ color: 'var(--color-primary)' }}>how to choose the right retreat</Link>.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            3. Stop Preparing Three Days Before
          </h2>
          <p style={{ lineHeight: 1.8 }}>
            In the final three days before the retreat, stop adding. Stop reading about
            meditation, stop planning, stop setting expectations. Simplify your diet. Reduce
            screen time. Begin the transition into quieter living. The{' '}
            <Link href="/how-to-prepare-for-a-retreat" style={{ color: 'var(--color-primary)' }}>preparation guide</Link>{' '}
            covers this in detail.
          </p>
        </section>

        <PrimaryCTA
          label="Plan My First Retreat"
          subtext="Tell us you're a first-timer and we'll design an experience that meets you where you are."
          vertical="retreat"
          category="first-retreat-tips"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            4. Day One Will Be Weird. Stay.
          </h2>
          <p style={{ lineHeight: 1.8 }}>
            You will feel restless, anxious, bored, or all three. Your mind will generate urgent
            reasons why you should leave. This happens to nearly everyone. It is the mind losing
            its inputs and panicking. By evening of day one, it begins to settle. By day two,
            you will be glad you stayed. The people who leave on day one never get to the good part.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            5. Do Not Compare Your Experience
          </h2>
          <p style={{ lineHeight: 1.8 }}>
            You are not trying to achieve anything. There is no correct way to feel on retreat.
            If someone describes blissful visions and you felt mostly restless and achy, your
            retreat was not a failure. Every experience is data. The value of the retreat is in
            what you learn about your own mind &mdash; not in matching someone else&rsquo;s description.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            6. The Thing Nobody Tells You
          </h2>
          <p style={{ lineHeight: 1.8 }}>
            The most common thing first-time retreatants say afterward is not &ldquo;it was
            peaceful&rdquo; or &ldquo;I feel enlightened.&rdquo; It is: &ldquo;I had no idea
            how loud my mind was.&rdquo; This discovery &mdash; not the peace that follows it,
            but the initial shock of hearing your own mental noise &mdash; is the most valuable
            takeaway. Once you hear it, you cannot unhear it. And that awareness is the beginning
            of everything meditation promises.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Recommended First Retreats
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3-day meditation retreat</Link> &mdash; the gentlest entry</li>
            <li><Link href="/3-day-silent-retreat" style={{ color: 'var(--color-primary)' }}>3-day silent retreat</Link> &mdash; if you are drawn to silence</li>
            <li><Link href="/weekend-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>Weekend retreat</Link> &mdash; if time is limited</li>
            <li><Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link> &mdash; the most accessible, nurturing first environment</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Start Here"
          subtext="First retreat? We specialise in making the first time genuinely good."
          vertical="retreat"
          category="first-retreat-tips"
          sourcePath={PATH}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>&larr; Meditation Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/what-to-expect-at-a-meditation-retreat" style={{ color: 'var(--color-primary)' }}>What to Expect</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/is-a-meditation-retreat-worth-it" style={{ color: 'var(--color-primary)' }}>Is It Worth It?</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
