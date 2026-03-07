import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import FeaturedRetreat from '@/components/FeaturedRetreat';
import RelatedReads from '@/components/RelatedReads';

const PATH = '/how-long-should-a-meditation-retreat-be';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'How Long Should a Meditation Retreat Be? 3 vs 5 vs 7 vs 10 Days | Retreats And Treks',
    description:
      'The right retreat length depends on your experience, goals, and schedule. A clear comparison of 3-day, 5-day, 7-day, and 10-day meditation retreats — what each offers and who each serves.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'How Long Should a Meditation Retreat Be?',
      description: '3 days vs 5 vs 7 vs 10 — which retreat duration is right for you.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is a 3-day meditation retreat long enough to be effective?',
    answer:
      'Yes. A 3-day retreat provides a genuine shift in awareness and a meaningful break from routine. You will experience the core elements — sitting practice, silence, simplified living — and most participants report noticeable calm and clarity by day three. It is not as deep as a 7 or 10-day retreat, but it is far more effective than no retreat at all. It is the ideal starting point for beginners.',
  },
  {
    question: 'What is the difference between a 7-day and 10-day retreat?',
    answer:
      'The main difference is resolution depth. Both retreats hit the same difficult middle section (days 2–4), but a 10-day retreat gives you 3 extra days on the other side of that difficulty. These final days are where deeper insight tends to emerge. A 7-day retreat still provides significant depth and is more accessible for people with work or family commitments.',
  },
  {
    question: 'Should beginners start with a weekend retreat or a 3-day retreat?',
    answer:
      'A 3-day retreat if possible. Weekend retreats (2 days) are sometimes too short to move through the adjustment period — you arrive on Saturday, settle on Sunday, and leave before the retreat truly begins. Three days gives you one full day of actual practice between the transition days.',
  },
  {
    question: 'How many days off work do I need for a 7-day retreat?',
    answer:
      'Plan for 9 days total — 7 retreat days plus one travel day on each end. Arriving rushed and leaving immediately diminishes the experience. If possible, add one quiet day at home after the retreat before returning to work. The transition back to normal life is part of the practice.',
  },
  {
    question: 'Can I do multiple short retreats instead of one long one?',
    answer:
      'Yes, and many experienced practitioners prefer this approach. Three 3-day retreats per year can be more sustainable and equally transformative as one 10-day retreat. The benefit of longer retreats is depth — the benefit of repeated shorter retreats is consistency. Both paths work.',
  },
];

const comparisonRows = [
  ['Duration', '3 days', '5 days', '7 days', '10 days'],
  ['Best for', 'Beginners, busy schedules', 'Intermediate, specific focus', 'Deep practice, experienced + beginners', 'Advanced, serious practitioners'],
  ['Difficulty peak', 'Day 2 (may not resolve)', 'Days 2–3 (partial resolve)', 'Days 2–4 (full resolution by day 5)', 'Days 2–4 (extended resolution)'],
  ['Depth of experience', 'Introduction — taste of silence', 'Moderate — beginning of inner shift', 'Significant — sustained clarity', 'Profound — lasting behavioural change'],
  ['Time off required', '4–5 days total', '6–7 days total', '9 days total', '12 days total'],
  ['Post-retreat effect', '1–2 weeks', '2–3 weeks', '3–6 weeks', '1–3 months'],
];

export default function HowLongShouldARetreatBePage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'How Long Should a Retreat Be?', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Long Should a Meditation Retreat Be?',
    description: 'Comparing 3, 5, 7, and 10-day meditation retreats.',
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
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Meditation Retreats', href: '/meditation-retreats' }, { name: 'How Long?' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            How Long Should a Meditation Retreat Be?
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            The right retreat length depends on three things: your experience level, your
            goals, and how much time you can genuinely give. Here is a clear breakdown of
            what each duration offers and who each serves best.
          </p>
        </header>

        {/* --- Comparison table --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Duration Comparison at a Glance</h2>
          <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
              <thead>
                <tr>
                  {comparisonRows[0].map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        borderBottom: '2px solid var(--color-border)',
                        fontWeight: 600,
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.slice(1).map(([dim, ...cols]) => (
                  <tr key={dim}>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--color-border)', fontWeight: 600 }}>
                      {dim}
                    </td>
                    {cols.map((val, i) => (
                      <td
                        key={i}
                        style={{ padding: '0.75rem', borderBottom: '1px solid var(--color-border)', lineHeight: 1.5 }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- 3-day --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>3-Day Retreat — The Gateway</h2>
          <p style={proseStyle}>
            A <Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3-day meditation retreat</Link>
            {' '}is the minimum effective dose. You get one day of transition, one full day
            of practice, and one day of integration. It teaches you whether retreat practice
            works for you without requiring a major time commitment.
          </p>
          <p style={proseStyle}>
            <strong>Choose 3 days if:</strong> you have never done a retreat, you cannot take
            a full week off, or you want to test whether you can handle silence before
            committing to something longer.
          </p>
          <p style={proseStyle}>
            <strong>Know this:</strong> you may hit the hard part (day 2) without
            experiencing the resolution that comes on days 4&ndash;5 of longer retreats.
            This can leave you feeling that it did not work &mdash; when in reality you
            simply did not have time for the process to complete.
          </p>
        </section>

        {/* --- 5-day --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>5-Day Retreat — The Practical Middle</h2>
          <p style={proseStyle}>
            Five days gives you time to move through the difficult middle and begin to
            experience what is on the other side. You get one transition day, two or three
            hard days, and one or two days of settling. It is the least common duration but
            works well for people with{' '}
            <Link href="/5-day-yoga-retreat" style={{ color: 'var(--color-primary)' }}>yoga-focused programmes</Link>
            {' '}or structured workshops that intersperse sitting with movement and teaching.
          </p>
          <p style={proseStyle}>
            <strong>Choose 5 days if:</strong> you have done a 3-day retreat before and want
            more depth, or the programme combines meditation with yoga, nature, or facilitated
            workshops that benefit from the extra days.
          </p>
        </section>

        <PrimaryCTA
          label="Find the Right Duration for You"
          subtext="Take our short quiz to match your experience and goals with the ideal retreat length."
          vertical="retreat"
          category="duration-guide"
          sourcePath={PATH}
        />

        {/* --- 7-day --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>7-Day Retreat — The Sweet Spot</h2>
          <p style={proseStyle}>
            Seven days is what most experienced teachers recommend and what our participants
            consistently rate highest. The{' '}
            <Link href="/7-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>7-day meditation retreat</Link>
            {' '}gives you time to arrive (day 1), struggle (days 2&ndash;4), settle
            (day 5), and experience genuine clarity (days 6&ndash;7). The arc is complete.
          </p>
          <p style={proseStyle}>
            <strong>Choose 7 days if:</strong> you want depth without the significant time
            commitment of 10 days. Suitable for both beginners and experienced practitioners.
            A week is long enough for meaningful transformation and short enough to fit into
            most schedules once or twice per year.
          </p>
        </section>

        {/* --- 10-day --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>10-Day Retreat — The Deep Dive</h2>
          <p style={proseStyle}>
            A <Link href="/10-day-silent-retreat" style={{ color: 'var(--color-primary)' }}>10-day silent retreat</Link>
            {' '}is the traditional format made famous by Vipassana centres worldwide. The
            extra three days beyond the 7-day structure allow for deeper integration, more
            sustained silence, and insights that only emerge after extended practice.
          </p>
          <p style={proseStyle}>
            <strong>Choose 10 days if:</strong> you have completed at least one shorter retreat,
            your practice is established, and you can commit the time without creating stress
            in your life. A 10-day retreat done under pressure is less effective than a 7-day
            retreat done with ease.
          </p>
          <p style={proseStyle}>
            Read about the{' '}
            <Link href="/how-hard-is-a-silent-retreat" style={{ color: 'var(--color-primary)' }}>
              real difficulty of silent retreats
            </Link>
            {' '}to calibrate your expectations for longer durations.
          </p>
        </section>

        {/* --- Decision framework --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>A Simple Decision Framework</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li><strong>Never done a retreat?</strong> Start with{' '}
              <Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3 days</Link>
            </li>
            <li><strong>Done one retreat and want more?</strong> Try{' '}
              <Link href="/7-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>7 days</Link>
            </li>
            <li><strong>Regular practitioner seeking depth?</strong> Go for{' '}
              <Link href="/10-day-silent-retreat" style={{ color: 'var(--color-primary)' }}>10 days</Link>
            </li>
            <li><strong>Limited time but experienced?</strong> A focused 3&ndash;5 day retreat can be remarkably effective for people who already have a sitting practice</li>
            <li><strong>Unsure?</strong> Use our{' '}
              <Link href="/find-your-retreat" style={{ color: 'var(--color-primary)' }}>retreat finder</Link>
              {' '}for a personalised recommendation
            </li>
          </ul>
        </section>

        <FeaturedRetreat
          title="Choose Your Duration"
          description="We run 3, 5, 7, and 10-day retreats across two Himalayan locations. All programmes include facilitation, meals, and accommodation."
          links={[
            { label: '3-day retreat', href: '/3-day-meditation-retreat' },
            { label: '7-day retreat', href: '/7-day-meditation-retreat' },
            { label: '10-day retreat', href: '/10-day-silent-retreat' },
            { label: 'All dates', href: '/retreat-calendar' },
          ]}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <RelatedReads
          links={[
            { label: 'How Hard Is a Silent Retreat?', href: '/how-hard-is-a-silent-retreat' },
            { label: 'First Day of a Meditation Retreat', href: '/first-day-of-a-meditation-retreat' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
            { label: 'What to Expect at a Meditation Retreat', href: '/what-to-expect-at-a-meditation-retreat' },
          ]}
        />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>&larr; Meditation Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/retreat-programs" style={{ color: 'var(--color-primary)' }}>All Programmes</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/retreat-calendar" style={{ color: 'var(--color-primary)' }}>Retreat Calendar</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
