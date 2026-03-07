import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/benefits-of-meditation-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Benefits of a Meditation Retreat — What Actually Changes | Retreats And Treks',
    description:
      'The real benefits of a meditation retreat — nervous system reset, restored attention, emotional processing, and depth of silence. What changes in 3, 7, and 10 days.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Benefits of a Meditation Retreat — What Actually Changes',
      description: 'Nervous system reset, restored attention, emotional processing. What a meditation retreat does that daily practice cannot.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Are the benefits of a meditation retreat permanent?',
    answer:
      'The acute effects — reduced cortisol, restored attention, emotional clarity — begin to fade within weeks if not maintained. But the deeper shifts — in perspective, in your relationship with your own mind, in your understanding of silence — tend to persist. Many retreatants report that even months later, they can access a quality of stillness they discovered on retreat. Regular follow-up practice (even 10 minutes daily) maintains the benefits.',
  },
  {
    question: 'Can I get the same benefits from meditating at home?',
    answer:
      'Daily meditation provides incremental benefits. A retreat provides a quantum shift. The difference is environmental: at home, you meditate for 20 minutes then return to stimulation. On retreat, meditation is sustained over days in an environment that supports it. The depth achieved in 7 days of retreat meditation typically takes months or years of daily practice to reach. Both have value — they are complementary, not interchangeable.',
  },
  {
    question: 'How soon do the benefits start during a retreat?',
    answer:
      'Physiological changes (reduced cortisol, lower blood pressure) begin within 24–48 hours. Attentional benefits (improved focus, reduced reactivity) typically emerge by day 2–3. Deeper psychological benefits (emotional processing, perspective shifts, insight) usually arrive from day 4 onwards. This is why we recommend at least 3 days for a meaningful first retreat.',
  },
  {
    question: 'Do you need to be spiritual to benefit from a meditation retreat?',
    answer:
      'No. The physiological and psychological benefits of sustained meditation are well-documented and do not require spiritual belief. Reduced stress hormones, improved attention, better sleep, and emotional regulation occur regardless of worldview. If you are spiritual, the retreat may deepen that dimension. If you are not, the benefits are still substantial.',
  },
];

export default function BenefitsOfMeditationRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'Benefits of a Meditation Retreat', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
      />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Meditation Retreats', href: '/meditation-retreats' }, { name: 'Benefits of a Meditation Retreat' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Benefits of a Meditation Retreat: What Actually Changes
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Meditation retreat marketing often speaks in vague promises &mdash; &ldquo;find
            inner peace,&rdquo; &ldquo;transform your life.&rdquo; The reality is more specific
            and more interesting. A meditation retreat produces measurable, identifiable changes
            in your nervous system, attention, emotional processing, and relationship with
            silence. Here is what actually happens.
          </p>
        </header>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            1. Nervous System Reset
          </h2>
          <p style={{ lineHeight: 1.8 }}>
            Chronic stress locks the nervous system in sympathetic (fight-or-flight) mode. Daily
            meditation helps, but the environment keeps re-triggering the stress response. On
            retreat, the triggers are removed. Within 48 hours &mdash; especially in a Himalayan
            forest environment like <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link> &mdash;
            the nervous system begins transitioning to parasympathetic dominance. Cortisol drops.
            Heart rate variability improves. Sleep architecture normalises. This is not relaxation.
            It is physiological recalibration.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            2. Restored Attention
          </h2>
          <p style={{ lineHeight: 1.8 }}>
            Your attention is a finite resource that daily life depletes. Screens, notifications,
            decisions, social interactions &mdash; each draws from the same well. On retreat,
            the demands on attention drop to near zero. The mind refills. By day three, most
            retreatants notice a sharpness of attention they had forgotten was possible &mdash;
            colours are more vivid, sounds more distinct, thoughts more clear. This is not a
            side effect. It is one of the primary benefits.
          </p>
        </section>

        <PrimaryCTA
          label="Experience This for Yourself"
          subtext="Tell us what you're seeking — we'll match you to the right retreat duration and location."
          vertical="retreat"
          category="benefits-meditation"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            3. Emotional Processing
          </h2>
          <p style={{ lineHeight: 1.8 }}>
            When external stimulation is removed, the emotions you have been suppressing surface.
            This can be uncomfortable &mdash; grief, anger, sadness, or anxiety may arise. This
            is not a problem. It is the retreat working. In daily life, there is always a
            distraction available to push these feelings back down. On retreat, there is nowhere
            to hide. The emotions process, the body releases what it has been holding, and
            something lighter emerges on the other side.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            4. Relationship with Silence
          </h2>
          <p style={{ lineHeight: 1.8 }}>
            Most people have never experienced genuine silence. Not quiet &mdash; silence. The
            thick, living quality that emerges when there is no input at all. A meditation retreat
            introduces you to this silence, and once you know it exists, you carry the knowledge
            back into daily life. You discover that silence is not empty. It is the most full
            thing you have ever encountered. See{' '}
            <Link href="/what-happens-at-a-silent-retreat" style={{ color: 'var(--color-primary)' }}>what happens at a silent retreat</Link>.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Benefits by Duration
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Duration</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Expected Benefits</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Page</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}>3 days</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Cortisol reduction, initial settling, attention boost</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}><Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3-day retreat</Link></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}>7 days</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Deep recalibration, emotional processing, genuine insight</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}><Link href="/7-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>7-day retreat</Link></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}>10 days</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Transformative depth, sustained silence, neuroplastic change</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}><Link href="/10-day-silent-retreat" style={{ color: 'var(--color-primary)' }}>10-day retreat</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Meditation Retreat"
          subtext="Not sure how long? We'll recommend the right duration for your situation."
          vertical="retreat"
          category="benefits-meditation"
          sourcePath={PATH}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>&larr; Meditation Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/is-a-meditation-retreat-worth-it" style={{ color: 'var(--color-primary)' }}>Is a Meditation Retreat Worth It?</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/how-to-choose-a-meditation-retreat" style={{ color: 'var(--color-primary)' }}>How to Choose</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
