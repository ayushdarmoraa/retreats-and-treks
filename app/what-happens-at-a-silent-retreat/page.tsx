import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/what-happens-at-a-silent-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'What Happens at a Silent Retreat? A Complete Guide | Retreats And Treks',
    description:
      'What actually happens at a silent retreat — day-by-day structure, noble silence rules, what to expect emotionally, meals, walking, the discomfort that turns into depth. An honest guide.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'What Happens at a Silent Retreat? A Complete Guide',
      description: 'The honest truth about silent retreats — from arrival anxiety to the silence that changes you.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('What Happens at a Silent Retreat? A Complete Guide'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Do I have to be completely silent the entire time?',
    answer:
      'Noble silence means no casual conversation, no social media, no phone calls. However, you can speak with retreat guides when needed — for practical questions, emotional support, or safety concerns. The intention is to remove habitual talking, not to create a punitive environment. Most people find that after the first day, they no longer want to speak.',
  },
  {
    question: 'What if I cannot handle the silence?',
    answer:
      'The first hours are the hardest. Your mind, accustomed to constant input, panics at the absence. This is normal and expected. By the second day, most people settle. If you genuinely need to leave, you can — retreats are voluntary. But the discomfort of the first day is almost always temporary, and what lies beyond it is why people come back.',
  },
  {
    question: 'Can I read books during a silent retreat?',
    answer:
      'Most traditional silent retreats ask you to refrain from reading. The purpose is to remove all external input — spoken, written, digital — so the mind has nothing new to process and begins to settle into its own depths. Some retreats allow journalling. If reading is important to you, ask before booking.',
  },
  {
    question: 'What do you do all day if you are not talking?',
    answer:
      'Days are structured: morning meditation (60–90 minutes), breakfast, walking practice, midday session, lunch, rest period, afternoon meditation, gentle movement or yoga, evening session, sleep. The structure holds you — you are never wondering what to do next. Between sessions, you walk, rest, or sit with whatever is arising.',
  },
  {
    question: 'Is a silent retreat religious?',
    answer:
      'Not necessarily. Some silent retreats are rooted in Buddhist tradition (Vipassana), some in Hindu contemplative practice, and some are entirely secular. Our Himalayan silent retreats draw on contemplative wisdom without requiring religious belief. The silence itself is the practice — not a prayer to any deity.',
  },
  {
    question: 'Will I feel lonely during a silent retreat?',
    answer:
      'Surprisingly, no. There is a paradox in silent retreats: you are surrounded by people who are all going through the same experience, and the shared silence creates a quality of connection that conversation rarely achieves. Many retreatants describe feeling less lonely during silence than they do in their normal social lives.',
  },
];

export default function WhatHappensAtASilentRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Silent Retreats', url: buildCanonicalUrl('/silent-retreats') },
    { name: 'What Happens at a Silent Retreat', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: 'What Happens at a Silent Retreat?',
    description: 'A complete guide to what happens at a silent retreat — structure, rules, emotional journey.',
    url: canonicalUrl,
    isPartOf: { '@type': 'WebSite', name: 'Retreats And Treks' },
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, webPageSchema]) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Silent Retreats', href: '/silent-retreats' },
          { name: 'What Happens at a Silent Retreat' },
        ]}
      />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            What Happens at a Silent Retreat?
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            You arrive. You hand over your phone. And then &mdash; nothing. No conversation. No
            notifications. No news. No small talk. Just you, the schedule, and whatever emerges
            from the quiet. This is what most people imagine when they think of a silent retreat.
            The reality is both simpler and more profound than the imagination.
          </p>
        </header>

        {/* ── THE ARRIVAL ──────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            The Arrival: Before Silence Begins
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Most silent retreats begin with an evening gathering. Introductions happen now &mdash; you
            see the faces of the people you will share silence with, learn the schedule, ask
            practical questions. Phones are collected or stored. The guide explains noble silence:
            no speaking, no eye contact meant to communicate, no written notes to others. Then the
            silence begins, usually after dinner.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            The first night is strange. You eat in silence. You walk to your room in silence. You
            lie awake aware of how loud your own thoughts are. This is normal. This is the beginning.
          </p>
        </section>

        {/* ── DAY BY DAY ───────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Day by Day: What Actually Happens
          </h2>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Day 1 — The Noise</h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Your mind has not received the memo. It talks to itself constantly &mdash; rehearsing
            conversations, replaying memories, planning your return. The silence around you makes
            the internal noise louder. This is not failure. This is the mind adjusting to the
            absence of external input. Restlessness, impatience, and even anxiety are common.
            The structure of the day &mdash; meditation, meals, walking &mdash; holds you through it.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Day 2 — The Settling</h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Something shifts. The internal monologue begins to slow. You notice things you missed
            yesterday &mdash; the quality of light, the taste of food, the texture of the air.
            Meditation sessions become easier. Not peaceful necessarily, but less frantic. The body
            begins to relax. You may feel unexpectedly emotional &mdash; this is the nervous system
            releasing what it has been holding.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Day 3 — The Opening</h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            By day three, most people report a qualitative change. The silence is no longer
            something imposed &mdash; it feels natural, even wanted. Awareness sharpens. Walking
            in nature becomes intensely vivid. The mind, having exhausted its habitual loops,
            begins to access something quieter. This is where the retreat begins to do its real work.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Days 4&ndash;7 — Depth</h3>
          <p style={{ lineHeight: 1.8 }}>
            For those on longer retreats, the later days are where the deepest work happens. The
            mind is genuinely quiet. Insights arise not through thinking but through a kind of
            knowing that silence makes possible. Many people describe these days as some of the
            most important experiences of their lives. The Himalayan environment amplifies this
            &mdash; the altitude, the beauty, the absence of distraction.
          </p>
        </section>

        <PrimaryCTA
          label="Experience Silence Yourself"
          subtext="Curious? Tell us about yourself and we'll recommend the right silent retreat for you."
          vertical="retreat"
          category="guide-silent-retreat"
          sourcePath={PATH}
        />

        {/* ── TYPICAL DAILY SCHEDULE ───────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            A Typical Day
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 600, width: '30%' }}>6:00 AM</td>
                  <td style={{ padding: '0.5rem' }}>Wake. Tea or warm water.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 600 }}>6:30 – 8:00</td>
                  <td style={{ padding: '0.5rem' }}>Morning meditation session (guided and silent periods)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 600 }}>8:00 – 9:00</td>
                  <td style={{ padding: '0.5rem' }}>Breakfast in silence</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 600 }}>9:00 – 11:00</td>
                  <td style={{ padding: '0.5rem' }}>Walking meditation / free practice / nature immersion</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 600 }}>11:00 – 12:30</td>
                  <td style={{ padding: '0.5rem' }}>Midday meditation or teaching session</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 600 }}>12:30 – 2:00</td>
                  <td style={{ padding: '0.5rem' }}>Lunch and rest</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 600 }}>2:00 – 3:30</td>
                  <td style={{ padding: '0.5rem' }}>Personal practice, journalling, or rest</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 600 }}>3:30 – 5:00</td>
                  <td style={{ padding: '0.5rem' }}>Afternoon meditation or gentle yoga</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 600 }}>5:00 – 6:30</td>
                  <td style={{ padding: '0.5rem' }}>Free time, walking, evening light</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 600 }}>6:30 – 7:30</td>
                  <td style={{ padding: '0.5rem' }}>Dinner in silence</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 600 }}>7:30 – 8:30</td>
                  <td style={{ padding: '0.5rem' }}>Evening session — meditation, chanting, or guided sitting</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem', fontWeight: 600 }}>9:00 PM</td>
                  <td style={{ padding: '0.5rem' }}>Lights out</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── EMOTIONAL JOURNEY ────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            The Emotional Arc Nobody Warns You About
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Silent retreat marketing often focuses on the peaceful outcome. The honest truth is
            that the journey includes discomfort. Many retreatants experience waves of sadness,
            irritation, grief, or anxiety &mdash; especially on days one and two. This is not a sign
            that something is wrong. It is a sign that the silence is working. When external
            stimulation is removed, the emotions you have been carrying (and suppressing) surface.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            The guide is there for these moments. The structure holds you. And the natural
            environment &mdash; especially in the Himalayas, where the beauty is constant and the air
            is clean &mdash; acts as a container for whatever arises.
          </p>
        </section>

        {/* ── WHERE TO DO IT ───────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Where to Do a Silent Retreat in the Himalayas
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li>
              <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link> &mdash;
              forest silence, gentle and accessible. Best for first-timers. 3&ndash;7 days.
            </li>
            <li>
              <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar</Link> &mdash;
              geological silence, radical remoteness. Best for experienced retreatants. 7&ndash;14 days.
            </li>
            <li>
              <Link href="/locations/munsiyari" style={{ color: 'var(--color-primary)' }}>Munsiyari</Link> &mdash;
              alpine silence, spacious and expansive. Best for those who need openness. 5&ndash;7 days.
            </li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            See our full guide: <Link href="/himalayan-silent-retreats" style={{ color: 'var(--color-primary)' }}>Himalayan silent retreats</Link>.
          </p>
        </section>

        <PrimaryCTA
          label="Find My Silent Retreat"
          subtext="First timer or experienced? We'll match you to the right silence."
          vertical="retreat"
          category="guide-silent-retreat"
          sourcePath={PATH}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/silent-retreats" style={{ color: 'var(--color-primary)' }}>&larr; Silent Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/how-to-choose-a-meditation-retreat" style={{ color: 'var(--color-primary)' }}>How to Choose a Meditation Retreat</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/how-to-prepare-for-a-retreat" style={{ color: 'var(--color-primary)' }}>How to Prepare for a Retreat</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
