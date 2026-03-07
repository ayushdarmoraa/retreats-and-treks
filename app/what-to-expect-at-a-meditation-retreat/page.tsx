import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/what-to-expect-at-a-meditation-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'What to Expect at a Meditation Retreat — Day by Day | Retreats And Treks',
    description:
      'What to expect at a meditation retreat — schedule, sitting, walking, meals, emotions, the discomfort and the depth. A realistic day-by-day guide for first-timers and experienced practitioners.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'What to Expect at a Meditation Retreat',
      description: 'The real experience — schedule, emotions, the hard parts, and why people come back.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Will I be bored at a meditation retreat?',
    answer:
      'Almost certainly — for the first morning. Boredom is the mind\'s protest at losing its habitual stimulation. It passes. What replaces it is far more interesting than anything your phone has ever provided. By day two, most people report that the richness of unmediated sensory experience — light, sound, breath, texture — is more compelling than they expected.',
  },
  {
    question: 'What if I cannot sit for long periods?',
    answer:
      'Sitting meditation alternates with walking meditation, and sessions include breaks. Chairs and cushion supports are always available. You do not need to sit in lotus position. The goal is alertness, not endurance. If your body needs to move, walking meditation is equally valid practice.',
  },
  {
    question: 'Will I have free time during the retreat?',
    answer:
      'Yes. Most retreats include 2–4 hours of unstructured time daily — for personal practice, journalling, walking in nature, or simply resting. This free time is not filler. It is where much of the retreat\'s work happens, as insights from structured sessions settle and integrate.',
  },
  {
    question: 'What is the food like?',
    answer:
      'Vegetarian, simple, and nourishing. Meals are eaten in silence (on silent retreats) and are typically local and seasonal. The simplicity of the food is part of the practice — eating becomes a meditation itself when you actually taste each bite without conversation or distraction.',
  },
];

export default function WhatToExpectMeditationRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'What to Expect', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
      />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Meditation Retreats', href: '/meditation-retreats' }, { name: 'What to Expect' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            What to Expect at a Meditation Retreat
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            The unknown is the hardest part. Not the sitting, not the silence, not the
            early mornings &mdash; the not knowing what comes next. This guide walks
            through exactly what happens at a meditation retreat, from arrival to departure,
            so the only surprise left is the depth.
          </p>
        </header>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Before You Arrive
          </h2>
          <p style={{ lineHeight: 1.8 }}>
            Most retreats send pre-arrival instructions: what to bring, what to leave behind,
            how to prepare your mind and body. Read our{' '}
            <Link href="/how-to-prepare-for-a-retreat" style={{ color: 'var(--color-primary)' }}>preparation guide</Link>{' '}
            for practical steps. The key insight: the retreat starts before you arrive. How you
            approach the days before directly affects how quickly you settle.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Day 1: Arrival and Orientation
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            You arrive, usually in the afternoon or evening. Room assignment, tour of the space,
            and a group orientation. You meet the teacher and the other participants. Phones are
            stored away (or signal disappears, in locations like{' '}
            <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar</Link>).
            The schedule is explained. After dinner, the first short sitting. Then sleep &mdash;
            earlier than you are used to, and with a mind that is louder than expected.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Days 2&ndash;3: Settling
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            The first full day is often the hardest. Your mind protests &mdash; it wants input,
            stimulation, something to react to. Restlessness, boredom, and anxiety are common.
            The body may feel restless too. This is normal. The schedule holds you: sit, walk, eat,
            sit, walk, eat, sit, sleep. By day two, something begins to shift. The internal
            monologue slows. Awareness sharpens. You notice the quality of light, the taste
            of food, the feeling of your feet on the ground.
          </p>
        </section>

        <PrimaryCTA
          label="Experience This Yourself"
          subtext="Curious about the journey? Tell us about yourself and we'll recommend the right fit."
          vertical="retreat"
          category="expect-meditation"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Days 4&ndash;7: Depth
          </h2>
          <p style={{ lineHeight: 1.8 }}>
            For those on a <Link href="/7-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>7-day retreat</Link>,
            this is where the real work happens. The mind, having run out of its habitual loops,
            begins to access something quieter. Meditation sessions become easier &mdash; not in the
            sense of effort, but in the sense of naturalness. The silence stops being something you
            do and becomes something you are. Emotional material may surface. Insights arrive
            without thinking. The Himalayan environment amplifies everything &mdash; the altitude,
            the forest, the beauty.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            The Physical Experience
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><strong>Sitting:</strong> sessions of 30&ndash;60 minutes, alternating with walking</li>
            <li><strong>Walking:</strong> slow intentional walking in natural settings</li>
            <li><strong>Meals:</strong> vegetarian, eaten in silence, simple and nourishing</li>
            <li><strong>Sleep:</strong> 8&ndash;9 hours (early to bed, early to rise)</li>
            <li><strong>Body:</strong> gentle stretching or yoga complements the sitting practice</li>
          </ul>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            The Emotional Journey
          </h2>
          <p style={{ lineHeight: 1.8 }}>
            Expect an arc: resistance → settling → depth → integration. The resistance phase
            (day 1) is where most people consider leaving. The settling phase (days 2&ndash;3) is
            where the commitment pays off. The depth phase (days 4+) is why people come back year
            after year. Allow the full arc before judging the experience. Read about the{' '}
            <Link href="/benefits-of-meditation-retreat" style={{ color: 'var(--color-primary)' }}>specific benefits</Link>{' '}
            people report.
          </p>
        </section>

        <PrimaryCTA
          label="Find My Retreat"
          subtext="Ready to try? We match you to the right environment, duration, and approach."
          vertical="retreat"
          category="expect-meditation"
          sourcePath={PATH}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>&larr; Meditation Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/is-a-meditation-retreat-worth-it" style={{ color: 'var(--color-primary)' }}>Is It Worth It?</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/how-to-choose-a-meditation-retreat" style={{ color: 'var(--color-primary)' }}>How to Choose</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
