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

const PATH = '/retreats-for-beginners';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Meditation Retreats for Beginners — Where to Start | Retreats And Treks',
    description:
      'Everything a first-timer needs to know about meditation retreats — which type, which duration, what to expect, and how to choose wisely. An honest guide that addresses the fears and practicalities.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Meditation Retreats for Beginners — Where to Start',
      description: 'The complete beginner\'s guide to choosing and preparing for your first retreat.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Meditation Retreats for Beginners — Where to Start'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Do I need meditation experience before going on a retreat?',
    answer:
      'No. Many people attend their first retreat with zero meditation experience. Facilitated retreats include all instruction — you do not need to know how to meditate before arriving. In fact, arriving without established habits can be an advantage, because you have no technique to unlearn or expectations to manage.',
  },
  {
    question: 'What is the best type of retreat for a complete beginner?',
    answer:
      'A facilitated 3-day meditation retreat in a comfortable setting. Look for: a trained facilitator (not self-directed), meals included, private or semi-private accommodation, and a structured schedule. Avoid 10-day Vipassana as your first retreat — it is intense by design and better suited to people with some retreat experience.',
  },
  {
    question: 'How much does a beginner meditation retreat cost?',
    answer:
      'Retreat costs vary widely. Budget options (donation-based Vipassana centres) are free but austere. Mid-range retreats with facilitation, comfortable rooms, and meals typically cost ₹15,000–₹35,000 for 3 days in India. Premium retreats can go much higher. Our retreats include all meals, accommodation, and facilitation, with transparent pricing on each programme page.',
  },
  {
    question: 'What if I cannot sit still for long periods?',
    answer:
      'You do not need to. Beginner-friendly retreats intersperse sitting meditation with walking meditation, gentle movement, and rest. Sessions are shorter (20–30 minutes initially) and build gradually. Chairs and backrests are available. The practice is about attention, not endurance.',
  },
  {
    question: 'Should I do a silent retreat as my first retreat?',
    answer:
      'It depends on your temperament. Some beginners thrive in silence because it simplifies the experience — fewer social dynamics to navigate. Others find it too intense without the relief of conversation. A good middle ground is a retreat with noble silence (quiet hours) rather than total silence. Our 3-day retreat includes periods of both silence and facilitated sharing.',
  },
];

export default function RetreatsForBeginnersPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'Retreats for Beginners', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Meditation Retreats for Beginners — Where to Start',
    description: 'A first-timer\'s guide to choosing the right meditation retreat.',
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
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Meditation Retreats', href: '/meditation-retreats' }, { name: 'Beginners' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Meditation Retreats for Beginners: Where to Start
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            You do not need to be a meditator to go on a meditation retreat. You do not need
            to be spiritual, flexible, or calm. You need willingness to try something
            uncomfortable and a few days of free time. This guide covers everything else.
          </p>
        </header>

        {/* --- Why a retreat --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Why Start with a Retreat (Not an App)</h2>
          <p style={proseStyle}>
            Most people try to learn meditation alone &mdash; through apps, videos, or
            books. This works for some. For many, it does not. The dropout rate for
            meditation apps is over 90% within the first month. The reason is simple:
            meditation is difficult, and doing difficult things alone, in the same
            environment where all your distractions live, is harder than it needs to be.
          </p>
          <p style={proseStyle}>
            A retreat removes the obstacles that home practice cannot. No decisions about
            when to sit. No negotiation with yourself about whether to skip today. No
            family, work, or notifications competing for your attention. The structure does
            the work that willpower cannot.
          </p>
          <p style={proseStyle}>
            This is why many experienced meditators started with a retreat, not the other
            way around. Read{' '}
            <Link href="/why-people-go-to-meditation-retreats" style={{ color: 'var(--color-primary)' }}>
              why people go to meditation retreats
            </Link>
            {' '}for a deeper look at motivations.
          </p>
        </section>

        {/* --- Choosing a type --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Which Type of Retreat Is Best for Beginners?</h2>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Facilitated Meditation Retreat</h3>
          <p style={proseStyle}>
            <strong>Best for most beginners.</strong> A trained facilitator guides every
            session, provides instruction, and is available for questions. You do not need
            to know what you are doing &mdash; the facilitator provides the structure. Our{' '}
            <Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3-day meditation retreat</Link>
            {' '}is designed specifically for this.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Yoga Retreat with Meditation</h3>
          <p style={proseStyle}>
            If sitting still feels intimidating, a{' '}
            <Link href="/5-day-yoga-retreat" style={{ color: 'var(--color-primary)' }}>yoga retreat</Link>
            {' '}that includes meditation sessions gives you a gentler entry. Physical
            movement breaks up the sitting, and yoga itself is preparation for
            stillness. This format suits people who learn through the body.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Silent Retreat</h3>
          <p style={proseStyle}>
            Not typically recommended for first-timers, but some beginners do very well
            with silence. If you are introverted, comfortable with solitude, and want the
            most immersive experience, a{' '}
            <Link href="/3-day-silent-retreat" style={{ color: 'var(--color-primary)' }}>3-day silent retreat</Link>
            {' '}is an option. Read about{' '}
            <Link href="/how-hard-is-a-silent-retreat" style={{ color: 'var(--color-primary)' }}>
              how hard silence actually is
            </Link>
            {' '}before deciding.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>Vipassana (10-Day)</h3>
          <p style={proseStyle}>
            The traditional Goenka Vipassana format is free, widely available, and
            profoundly effective &mdash; but intense. Ten days of silence, 10 hours of
            sitting per day, strict schedule, no physical exercise. It is not designed for
            comfort. Some beginners thrive here. Many find it too harsh as a first
            experience. Read our{' '}
            <Link href="/vipassana-vs-meditation-retreat" style={{ color: 'var(--color-primary)' }}>
              comparison of Vipassana and general meditation retreats
            </Link>.
          </p>
        </section>

        <PrimaryCTA
          label="Find a Beginner-Friendly Retreat"
          subtext="Use our retreat finder to match your experience level with the right programme."
          vertical="retreat"
          category="beginners-guide"
          sourcePath={PATH}
        />

        {/* --- How long --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>How Long Should Your First Retreat Be?</h2>
          <p style={proseStyle}>
            Three days. This is the consensus among retreat facilitators and our own
            experience. Three days gives you enough time to settle, practice, and get a
            genuine taste of what retreats offer &mdash; without the intensity of a full
            week.
          </p>
          <p style={proseStyle}>
            If three days feels too short, consider{' '}
            <Link href="/how-long-should-a-meditation-retreat-be" style={{ color: 'var(--color-primary)' }}>
              our detailed duration guide
            </Link>
            {' '}for a comparison of 3, 5, 7, and 10-day options.
          </p>
        </section>

        {/* --- Where --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Where Should Beginners Go?</h2>
          <p style={proseStyle}>
            Location matters less than you think, but environment matters more. Look for:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li><strong>Natural setting</strong> &mdash; nature reduces distraction and supports stillness</li>
            <li><strong>Comfortable accommodation</strong> &mdash; your first retreat should not also be a test of endurance</li>
            <li><strong>Small group size</strong> &mdash; 8&ndash;15 people allows for personal attention</li>
            <li><strong>Accessible location</strong> &mdash; keep travel simple. Save remote destinations for later</li>
          </ul>
          <p style={proseStyle}>
            Our{' '}
            <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata forest retreat</Link>
            {' '}is specifically designed for beginners &mdash; accessible from Delhi
            (6 hours), surrounded by deodar forest, comfortable rooms, and trained
            facilitators. For something more adventurous later, see{' '}
            <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar</Link>.
          </p>
        </section>

        {/* --- Fears --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Common Fears (and the Reality)</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>&ldquo;I can&rsquo;t meditate&rdquo;</strong> &mdash; You do not need
              to know how. That is what the facilitator is for. Thinking you cannot
              meditate is the most common reason people attend a retreat
            </li>
            <li>
              <strong>&ldquo;I&rsquo;ll be bored&rdquo;</strong> &mdash; You will. And
              that is part of the experience. Read about{' '}
              <Link href="/first-day-of-a-meditation-retreat" style={{ color: 'var(--color-primary)' }}>
                what day one actually looks like
              </Link>
            </li>
            <li>
              <strong>&ldquo;It&rsquo;s too expensive&rdquo;</strong> &mdash; Read our{' '}
              <Link href="/is-a-meditation-retreat-worth-it" style={{ color: 'var(--color-primary)' }}>
                analysis of whether a retreat is worth the cost
              </Link>
            </li>
            <li>
              <strong>&ldquo;I&rsquo;ll feel out of place&rdquo;</strong> &mdash; Most
              retreat participants are first-timers. You will not be the only one who
              does not know what they are doing
            </li>
            <li>
              <strong>&ldquo;What if I want to leave?&rdquo;</strong> &mdash; You can. No
              retreat should prevent you from leaving. The desire to leave usually passes
              within hours
            </li>
          </ul>
        </section>

        {/* --- Preparation --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>How to Prepare for Your First Retreat</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>Practice sitting still for 10&ndash;20 minutes a day for 1&ndash;2 weeks before you go</li>
            <li>Read our{' '}
              <Link href="/what-to-pack-for-a-retreat" style={{ color: 'var(--color-primary)' }}>packing list</Link>
              {' '}&mdash; bring less than you think</li>
            <li>Avoid dramatic dietary changes in the week before</li>
            <li>Tell friends and family you will be unreachable</li>
            <li>Lower your expectations to zero &mdash; arrival without agenda is the best preparation</li>
          </ul>
          <p style={proseStyle}>
            Full preparation guide:{' '}
            <Link href="/how-to-prepare-for-a-retreat" style={{ color: 'var(--color-primary)' }}>
              How to Prepare for a Retreat
            </Link>
            {' '}and{' '}
            <Link href="/first-meditation-retreat-tips" style={{ color: 'var(--color-primary)' }}>
              First Meditation Retreat Tips
            </Link>.
          </p>
        </section>

        <FeaturedRetreat
          title="3-Day Meditation Retreat — Designed for Beginners"
          description="No experience needed. Facilitated sessions, all meals, forest setting. The gentlest possible entry to retreat practice."
          links={[
            { label: 'View programme', href: '/3-day-meditation-retreat' },
            { label: 'See all dates', href: '/retreat-calendar' },
            { label: 'Find your retreat', href: '/find-your-retreat' },
          ]}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <RelatedReads
          links={[
            { label: 'First Day of a Meditation Retreat', href: '/first-day-of-a-meditation-retreat' },
            { label: 'How Long Should a Retreat Be?', href: '/how-long-should-a-meditation-retreat-be' },
            { label: 'How Hard Is a Silent Retreat?', href: '/how-hard-is-a-silent-retreat' },
            { label: 'What to Pack for a Retreat', href: '/what-to-pack-for-a-retreat' },
          ]}
        />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>&larr; Meditation Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/find-your-retreat" style={{ color: 'var(--color-primary)' }}>Find Your Retreat</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/retreat-calendar" style={{ color: 'var(--color-primary)' }}>Retreat Calendar</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
