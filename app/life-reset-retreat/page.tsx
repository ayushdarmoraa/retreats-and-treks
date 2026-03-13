import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/life-reset-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Life Reset Retreat — Start Again from Silence | Retreats And Treks',
    description:
      'Life reset retreat in the Indian Himalayas. For when daily life needs a complete recalibration — not optimisation, not adjustment, but a genuine restart from stillness. Chakrata, Zanskar.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Life Reset Retreat in the Himalayas',
      description: 'Not optimisation. Not adjustment. A genuine restart from stillness.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Life Reset Retreat in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What does "life reset" mean in a retreat context?',
    answer:
      'A life reset is not about making a dramatic decision during the retreat. It is about creating enough distance from your existing patterns that you can see them clearly — and from that clarity, choose which ones to keep and which to release. The reset happens in the gap between your daily life and the silence of the retreat. What you do with that reset when you return is yours to decide.',
  },
  {
    question: 'Is a life reset retreat different from a regular meditation retreat?',
    answer:
      'The techniques overlap — meditation, silence, journalling, nature immersion. The difference is intention. A meditation retreat focuses on deepening practice. A life reset retreat focuses on creating the conditions for a fundamental reorientation. The environment, structure, and guidance are calibrated for people at a turning point, not people seeking incremental depth.',
  },
  {
    question: 'How long do the effects of a life reset retreat last?',
    answer:
      'The clarity achieved on retreat begins to fade within weeks if not maintained. But the decisions made from that clarity — career changes, relationship shifts, lifestyle redesigns — persist. The retreat does not change your life. It gives you the perspective to change it yourself. Follow-up practices (even 10 minutes of daily meditation) maintain the clarity longer.',
  },
  {
    question: 'Should I make major life decisions during the retreat?',
    answer:
      'We recommend against making final decisions during the retreat itself. The clarity of retreat can feel absolute — but it is also decontextualised. Instead, use the retreat to see clearly. Write down what you see. Then give yourself 2–4 weeks back in daily life before committing to major changes. If the insight persists, it was real. If it fades, the timing was not right.',
  },
];

export default function LifeResetRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Life Reset Retreat', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Life Reset Retreat' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Life Reset Retreat
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            You have reached a point where optimisation is not enough. The system is running as
            designed &mdash; career, relationships, routines &mdash; but the design no longer fits.
            Something fundamental needs to shift, and you cannot see what it is from inside the
            pattern. A life reset retreat creates distance. Genuine, physical, sensory distance
            from everything familiar. Not to escape your life, but to see it clearly enough to
            choose which parts to keep.
          </p>
        </header>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Who Comes to a Life Reset Retreat
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li>Professionals in their 30s–50s who have succeeding at something that no longer matters</li>
            <li>People in the aftermath of major change &mdash; divorce, loss, career disruption</li>
            <li>Founders and leaders whose identity has fused with their role</li>
            <li>Anyone who wakes at 3 AM with the sense that something needs to change but cannot name what</li>
            <li>People who have tried coaching, therapy, and holidays without finding the reset they need</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Talk to Us"
          subtext="Describe where you are. We'll tell you whether a retreat is the right intervention — or if something else would serve better."
          vertical="retreat"
          category="life-reset"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            The Reset Process
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Days 1–2: Withdrawal.</strong> The familiar inputs stop. Phone, email, social
            media, news, conversation, tasks — all of it. The mind protests. Restlessness, anxiety,
            boredom. This is normal. It is the system de-patterning.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Days 3–5: Settling.</strong> The mind quiets. The noise that was hiding beneath
            the busyness becomes audible — unprocessed emotions, suppressed questions, values that
            got lost in the rush. This phase can be uncomfortable but is where the real work begins.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            <strong>Days 5–7+: Clarity.</strong> From the settled place, seeing becomes possible.
            You can observe your life patterns without being inside them. Insights arrive without
            force. The reset is not a decision — it is a shift in perspective from which better
            decisions become obvious.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Recommended Formats
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/7-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>7-day retreat</Link> — the minimum for genuine reset</li>
            <li><Link href="/10-day-silent-retreat" style={{ color: 'var(--color-primary)' }}>10-day silent retreat</Link> — deeper reset with sustained silence</li>
            <li><Link href="/meditation-retreat-chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link> — gentle forest environment for accessible reset</li>
            <li><Link href="/meditation-retreat-zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar</Link> — radical separation for deep recalibration</li>
            <li><Link href="/burnout-recovery-retreat-chakrata" style={{ color: 'var(--color-primary)' }}>Burnout recovery in Chakrata</Link> — when the reset is physiological</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Begin My Reset"
          subtext="We design life reset experiences based on where you are and what kind of distance you need."
          vertical="retreat"
          category="life-reset"
          sourcePath={PATH}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/self-discovery-retreat" style={{ color: 'var(--color-primary)' }}>Self-Discovery Retreat</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/personal-growth-retreat" style={{ color: 'var(--color-primary)' }}>Personal Growth Retreat</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/burnout-recovery-retreats" style={{ color: 'var(--color-primary)' }}>Burnout Recovery</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
