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

const PATH = '/first-day-of-a-meditation-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Your First Day at a Meditation Retreat — Hour by Hour | Retreats And Treks',
    description:
      'What actually happens on day one of a meditation retreat — from arrival and orientation to your first sit, first meal in silence, and the moment you realise your phone is gone.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Your First Day at a Meditation Retreat — Hour by Hour',
      description: 'An honest, hour-by-hour account of what day one looks like.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Your First Day at a Meditation Retreat — Hour by Hour'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What time does a meditation retreat usually start?',
    answer:
      'Most residential retreats ask you to arrive between 2pm and 4pm on the first day. This allows time for settling in, orientation, and a first session before dinner. Some retreats start with an evening meal and an introductory talk rather than a formal meditation. Check your specific programme — our retreats send a detailed arrival guide one week before the start date.',
  },
  {
    question: 'Do you meditate on the first day?',
    answer:
      'Yes, but gently. The first sit is usually shorter — 20 to 30 minutes — with clear guidance. The purpose is orientation, not depth. You are learning the posture, the schedule, and the space. The intensive practice begins on day two.',
  },
  {
    question: 'What if I arrive late to a meditation retreat?',
    answer:
      'Contact the retreat centre before your arrival day. Most programmes can accommodate late arrivals but need to know in advance. Arriving after orientation means you miss the group introduction and initial guidelines, which makes the transition harder. Plan your travel to arrive within the stated window.',
  },
  {
    question: 'Can I leave the retreat centre on the first day?',
    answer:
      'Technically yes, but it is discouraged. The first day is about crossing a threshold — physically and mentally. Leaving the grounds, even briefly, disrupts the transition. Bring everything you need before arrival so there is no reason to leave.',
  },
  {
    question: 'What happens if I cannot sit cross-legged?',
    answer:
      'You can meditate in a chair, on a bench, or with a backrest. There is no required posture. The only requirement is that your spine is upright and unsupported (if possible). Our facilitators will help you find a position that works for your body during the first session. Flexibility is not a prerequisite.',
  },
];

export default function FirstDayOfAMeditationRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'First Day of a Retreat', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Your First Day at a Meditation Retreat — Hour by Hour',
    description: 'What actually happens on day one of a meditation retreat.',
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
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Meditation Retreats', href: '/meditation-retreats' }, { name: 'First Day' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Your First Day at a Meditation Retreat: Hour by Hour
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Day one is the strangest day. You are not yet in the retreat and no longer in
            your ordinary life. Here is exactly what happens &mdash; the arrival, the first
            sit, the first meal in silence, and the moment you realise you are genuinely
            alone with your own mind.
          </p>
        </header>

        {/* --- Arrival --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>2:00pm &mdash; Arrival and the Last Conversation</h2>
          <p style={proseStyle}>
            You arrive with your bag. There is a registration process &mdash; room
            assignment, a brief medical form, an overview of the schedule. You meet other
            participants. Everyone is a little nervous, a little excited, making the
            slightly forced small talk of people who know that speech is about to be taken
            away.
          </p>
          <p style={proseStyle}>
            This is the last conversation you will have for the duration of the retreat.
            People say surprisingly honest things in these first minutes &mdash; why they
            are here, what they are hoping for, what they are afraid of. It is a
            strangely intimate start.
          </p>
        </section>

        {/* --- Phone surrender --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>3:00pm &mdash; The Phone Goes Away</h2>
          <p style={proseStyle}>
            On most silent retreats &mdash; and on all of ours &mdash; you surrender your
            phone. Not powered down in your room. Physically handed over. The moment you
            do it, something shifts. There is a tiny jolt of anxiety, then a strange
            lightness. You are now unreachable. No one can contact you. You cannot check
            anything. The world you left behind is, for the next few days, genuinely
            absent.
          </p>
          <p style={proseStyle}>
            Read more about{' '}
            <Link href="/a-week-without-my-phone-digital-detox" style={{ color: 'var(--color-primary)' }}>
              what a week without your phone actually feels like
            </Link>.
          </p>
        </section>

        {/* --- Orientation --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>3:30pm &mdash; Orientation</h2>
          <p style={proseStyle}>
            The facilitator introduces the programme. Schedule, guidelines, the structure
            of each day. When and where to sit. When meals are served. Where the walking
            paths go. What to do if you need help. The tone is calm, practical,
            reassuring.
          </p>
          <p style={proseStyle}>
            Two things stand out: the instruction to not make eye contact (to protect
            others&rsquo; experience as much as your own), and the reminder that you can
            leave at any time. Nobody is trapped. This is voluntary.
          </p>
        </section>

        {/* --- First sit --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>4:30pm &mdash; Your First Sit</h2>
          <p style={proseStyle}>
            The first meditation session. Usually 20&ndash;30 minutes. Guided, gentle, mostly
            focused on arriving in the body &mdash; feeling the breath, noticing the
            sounds of the room, acknowledging that you are here. The facilitator&rsquo;s
            voice is the last external structure you will rely on before the silence
            deepens.
          </p>
          <p style={proseStyle}>
            Most people&rsquo;s minds race during the first sit. Plans, anxieties, mental
            to-do lists. This is normal and expected. You are not failing. You are
            noticing how fast your mind moves &mdash; which is the first actual
            observation of the retreat.
          </p>
        </section>

        <PrimaryCTA
          label="See Our Retreat Schedule"
          subtext="View the day-by-day structure of each programme."
          vertical="retreat"
          category="first-day-guide"
          sourcePath={PATH}
        />

        {/* --- First meal --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>6:00pm &mdash; First Meal in Silence</h2>
          <p style={proseStyle}>
            Eating without conversation is one of the most disorienting experiences of day
            one. You sit with others &mdash; the same people you were chatting with two
            hours ago &mdash; and nobody speaks. You hear chewing. You hear cutlery.
            You notice how food actually tastes when you are not talking through the meal.
          </p>
          <p style={proseStyle}>
            Many participants report that this first silent meal is when the retreat becomes
            real. The abstraction of &ldquo;silence&rdquo; becomes concrete. You are
            sitting in a room with other human beings and no one is acknowledging each
            other. It is strange, slightly uncomfortable, and oddly liberating.
          </p>
        </section>

        {/* --- Evening --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>7:30pm &mdash; Evening Session and Lights</h2>
          <p style={proseStyle}>
            A short evening sit or a dharma talk. Some programmes include a walking
            meditation before bed. By 9pm, the centre is quiet. You are in your room
            &mdash; no screen, no book, no music. Just you and the ceiling and whatever
            your mind decides to do.
          </p>
          <p style={proseStyle}>
            This is when most first-timers think: &ldquo;What have I done?&rdquo; The gap
            between your ordinary life and this new reality is at its widest. Tomorrow
            will bring the first full day of practice, and the experiences that come with
            it. If you want to know what happens next, read about{' '}
            <Link href="/how-hard-is-a-silent-retreat" style={{ color: 'var(--color-primary)' }}>
              how hard a silent retreat actually is
            </Link>
            {' '}and{' '}
            <Link href="/what-happens-to-your-mind-in-silence" style={{ color: 'var(--color-primary)' }}>
              what happens to your mind in prolonged silence
            </Link>.
          </p>
        </section>

        {/* --- What to know --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>What You Should Know Before Day One</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Pack light</strong> &mdash; see our{' '}
              <Link href="/what-to-pack-for-a-retreat" style={{ color: 'var(--color-primary)' }}>
                complete packing list
              </Link>
            </li>
            <li><strong>Arrive rested</strong> &mdash; do not fly in the same day or travel overnight. Give yourself a buffer</li>
            <li><strong>Eat normally</strong> &mdash; do not fast or change your diet dramatically before arrival</li>
            <li><strong>Tell someone where you are</strong> &mdash; share the retreat centre contact details with a trusted person</li>
            <li><strong>Lower your expectations</strong> &mdash; the retreat will not match what you imagine. That is the point</li>
          </ul>
          <p style={proseStyle}>
            For the complete guide, read{' '}
            <Link href="/how-to-prepare-for-a-retreat" style={{ color: 'var(--color-primary)' }}>
              how to prepare for a retreat
            </Link>
            {' '}and{' '}
            <Link href="/first-meditation-retreat-tips" style={{ color: 'var(--color-primary)' }}>
              first meditation retreat tips
            </Link>.
          </p>
        </section>

        <FeaturedRetreat
          title="3-Day Meditation Retreat — Perfect for Beginners"
          description="A short, facilitated introduction to retreat practice. All meals, accommodation, and guidance included."
          links={[
            { label: 'View programme', href: '/3-day-meditation-retreat' },
            { label: 'See all dates', href: '/retreat-calendar' },
            { label: 'Find your retreat', href: '/find-your-retreat' },
          ]}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <RelatedReads
          links={[
            { label: 'How Hard Is a Silent Retreat?', href: '/how-hard-is-a-silent-retreat' },
            { label: 'What to Pack for a Retreat', href: '/what-to-pack-for-a-retreat' },
            { label: 'What to Expect at a Meditation Retreat', href: '/what-to-expect-at-a-meditation-retreat' },
            { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
          ]}
        />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>&larr; Meditation Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/how-to-prepare-for-a-retreat" style={{ color: 'var(--color-primary)' }}>How to Prepare</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/retreat-calendar" style={{ color: 'var(--color-primary)' }}>Retreat Calendar</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
