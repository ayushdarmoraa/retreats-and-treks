import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import FeaturedRetreat from '@/components/FeaturedRetreat';
import RelatedReads from '@/components/RelatedReads';

const PATH = '/retreat-vs-therapy';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Retreat vs Therapy — Can a Meditation Retreat Replace Therapy? | Retreats And Treks',
    description:
      'When a retreat is the right choice, when therapy is, and when you need both. An honest comparison of meditation retreats and psychotherapy for stress, burnout, and emotional processing.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Retreat vs Therapy — Can a Meditation Retreat Replace Therapy?',
      description: 'Retreats and therapy serve different functions. Here is when each one is the right tool.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Retreat vs Therapy — Can a Meditation Retreat Replace Therapy?'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Can a meditation retreat replace therapy?',
    answer:
      'No. A retreat can complement therapy powerfully but should not replace it for conditions requiring ongoing professional support — including clinical depression, PTSD, personality disorders, or active substance dependence. Retreats work at the level of the nervous system and experiential awareness. Therapy works at the level of narrative, relational patterns, and clinical diagnosis. They are different tools for different layers of the same person.',
  },
  {
    question: 'Is it safe to attend a retreat if I am in therapy?',
    answer:
      'Generally yes, and many therapists actively recommend retreat experiences as complementary practice. Inform your therapist before attending so they can help you prepare and integrate afterward. If you are working through acute trauma or recently destabilised material, discuss timing with your therapist — a retreat may be best scheduled after a period of stabilisation, not during active processing.',
  },
  {
    question: 'What does a retreat do that therapy cannot?',
    answer:
      'A retreat provides extended immersion that therapy sessions cannot replicate — 3 to 10 days of sustained practice in a low-stimulus environment. This allows the nervous system to downregulate deeply, produces experiential insight (knowing through direct perception rather than cognitive understanding), and creates a felt reference point for regulated awareness that persists after the retreat ends.',
  },
  {
    question: 'Should I do therapy before my first retreat?',
    answer:
      'If you have no active mental health concerns, therapy is not a prerequisite. If you are managing anxiety, depression, or trauma, having an existing therapeutic relationship provides a safety net — someone who knows your history and can help you integrate whatever arises during the retreat. Either way, our facilitators screen for contraindications and provide support throughout.',
  },
  {
    question: 'Can a retreat bring up things I should process in therapy?',
    answer:
      'Yes, and this is often valuable. Extended silence and reduced stimulation allow suppressed material to surface — emotions, memories, and patterns that are usually masked by daily activity. This is not a problem. It is the beginning of processing. Having a therapist to work with after the retreat helps integrate these experiences into your ongoing growth.',
  },
];

export default function RetreatVsTherapyPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'Retreat vs Therapy', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Retreat vs Therapy — Can a Meditation Retreat Replace Therapy?',
    description: 'An honest comparison of retreats and psychotherapy — when each is appropriate and when you need both.',
    url: canonicalUrl,
    author: { '@type': 'Organization', name: 'Retreats And Treks' },
    publisher: { '@type': 'Organization', name: 'Retreats And Treks' },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  const sectionStyle = { marginBottom: 'var(--space-xl)' } as const;
  const h2Style = { fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' } as const;
  const proseStyle = { lineHeight: 1.8, marginBottom: '0.75rem' } as const;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
      />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Meditation Retreats', href: '/meditation-retreats' }, { name: 'Retreat vs Therapy' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Retreat vs Therapy: When Each One Is the Right Tool
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            This question comes up more and more as meditation retreats enter mainstream
            wellness culture. Can a retreat do what therapy does? Should you see a therapist
            instead of attending a retreat? The honest answer is nuanced: they are different
            tools that work on different layers of the same person, and the best outcomes
            often come from combining both.
          </p>
        </header>

        <section style={sectionStyle}>
          <h2 style={h2Style}>What Therapy Does</h2>
          <p style={proseStyle}>
            Psychotherapy works primarily through narrative, relationship, and clinical
            framework. A skilled therapist helps you identify patterns in your thinking and
            behaviour, understand their origins, develop new cognitive and relational
            strategies, and process traumatic or difficult experiences through the safety
            of a professional relationship.
          </p>
          <p style={proseStyle}>
            Therapy&rsquo;s strengths are specificity (it addresses your particular history
            and patterns), ongoing support (weekly sessions over months or years), clinical
            expertise (diagnosing and treating mental health conditions), and relational
            healing (the therapeutic relationship itself is a corrective experience for
            attachment and trust).
          </p>
          <p style={proseStyle}>
            Therapy&rsquo;s limitation is format: 50-minute sessions once per week, within
            your normal life context. The environment does not change. The stimulation
            level does not change. The nervous system state you bring into the session is
            the same one you carry through the rest of your week.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>What a Retreat Does</h2>
          <p style={proseStyle}>
            A meditation retreat works primarily through environment, duration, and direct
            experience. By removing external stimulation for 3&ndash;10 days and replacing
            it with structured practice in a supportive setting, a retreat produces changes
            that are experiential rather than cognitive.
          </p>
          <p style={proseStyle}>
            The nervous system downregulates deeply &mdash; cortisol drops, sleep architecture
            improves, the default mode network quiets. Emotions that were suppressed by daily
            activity surface and move through the system. Habitual thought patterns become
            visible as patterns rather than truths. Read{' '}
            <Link href="/what-happens-to-your-mind-in-silence" style={{ color: 'var(--color-primary)' }}>the full neuroscience of what silence does to the mind</Link>.
          </p>
          <p style={proseStyle}>
            A retreat&rsquo;s strength is immersion: sustained, uninterrupted depth that no
            weekly session can replicate. Its limitation is that it does not provide ongoing
            clinical support, diagnostic expertise, or the relational healing that therapy offers.
          </p>
        </section>

        <PrimaryCTA
          label="Talk to Us About Your Situation"
          subtext="We'll help you assess whether a retreat is right for where you are right now."
          vertical="retreat"
          category="retreat-vs-therapy"
          sourcePath={PATH}
        />

        <section style={sectionStyle}>
          <h2 style={h2Style}>Choose a Retreat When&hellip;</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>You are functional but running on chronic stress that holidays do not resolve</li>
            <li>You want a direct experience of what a regulated nervous system feels like</li>
            <li>Your meditation practice has plateaued and needs depth</li>
            <li>You are in a life transition and need sustained space to process it</li>
            <li>You want to develop body-based awareness that cognitive therapy alone does not provide</li>
            <li>Your therapist has recommended a contemplative experience as complementary work</li>
          </ul>
          <p style={proseStyle}>
            Read{' '}
            <Link href="/why-people-go-to-meditation-retreats" style={{ color: 'var(--color-primary)' }}>why people actually go to retreats</Link>
            {' '}&mdash; the real motivations are often surprising.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Choose Therapy When&hellip;</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>You are experiencing clinical depression, anxiety disorder, or PTSD</li>
            <li>You have active suicidal ideation or self-harm patterns</li>
            <li>You need to process specific traumatic events with professional guidance</li>
            <li>You are navigating a relationship crisis that requires relational skills building</li>
            <li>You need ongoing weekly support rather than an intensive one-time intervention</li>
            <li>You have substance dependence requiring clinical management</li>
          </ul>
          <p style={proseStyle}>
            These are not weaknesses &mdash; they are situations where clinical expertise is the
            appropriate first response. A retreat may become valuable later, after stabilisation.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>When Both Together Is the Best Approach</h2>
          <p style={proseStyle}>
            The most powerful combination is ongoing therapy plus periodic retreat. Here is
            why: therapy provides the narrative framework and relational container for
            understanding your experience. A retreat provides the experiential depth and
            nervous system reset that cognitive understanding alone cannot achieve.
          </p>
          <p style={proseStyle}>
            Many of our participants are in active therapy. Their therapists report that
            clients return from retreats with new material &mdash; insights, body memories,
            emotional processings &mdash; that advances therapeutic work by weeks or months.
            The retreat provides the raw experience. Therapy helps integrate it.
          </p>
          <p style={proseStyle}>
            For{' '}
            <Link href="/burnout-recovery-retreats" style={{ color: 'var(--color-primary)' }}>burnout recovery</Link>
            {' '}in particular, this combination is highly effective. Therapy addresses the
            cognitive and behavioural patterns that led to burnout. A retreat addresses the
            nervous system dysregulation that maintains it. Neither alone is as effective as
            both together.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>What a Retreat Cannot Do</h2>
          <p style={proseStyle}>
            We believe in honesty about limitations. A retreat cannot diagnose mental health
            conditions. It cannot provide the ongoing relational container of weekly therapy.
            It cannot prescribe or manage medication. It is not a crisis intervention. And it
            cannot undo years of accumulated patterns in a single sitting.
          </p>
          <p style={proseStyle}>
            What it can do is give you 3&ndash;10 days of sustained contact with your own
            mind under conditions that make depth possible. That experience &mdash; and the
            reference point it creates &mdash; is something most people describe as
            transformative. But it is a complement to a full life of self-care, not a
            replacement for it.
          </p>
        </section>

        <FeaturedRetreat
          title="Burnout Recovery Retreat — When Rest Isn't Enough"
          description="Designed for depleted nervous systems. Gentle pacing, nature immersion, and skilled facilitation in the Himalayan forest."
          links={[
            { label: 'View programme', href: '/burnout-recovery-retreats' },
            { label: 'Explore Chakrata', href: '/locations/chakrata' },
            { label: 'See all dates', href: '/retreat-calendar' },
          ]}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <RelatedReads
          links={[
            { label: 'Why People Go to Meditation Retreats', href: '/why-people-go-to-meditation-retreats' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
            { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
            { label: 'Burnout Recovery Retreats', href: '/burnout-recovery-retreats' },
          ]}
        />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>&larr; Meditation Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/burnout-recovery-retreats" style={{ color: 'var(--color-primary)' }}>Burnout Recovery</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/retreat-vs-vacation" style={{ color: 'var(--color-primary)' }}>Retreat vs Vacation</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
