import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/how-to-choose-a-meditation-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'How to Choose a Meditation Retreat — A Practical Guide | Retreats And Treks',
    description:
      'How to choose the right meditation retreat: environment, duration, group size, teaching style, location. A practical guide to finding a retreat that matches your experience and intention.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'How to Choose a Meditation Retreat — A Practical Guide',
      description: 'Environment, duration, group size, teaching style. What actually matters when choosing a meditation retreat.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('How to Choose a Meditation Retreat — A Practical Guide'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How much meditation experience do I need for a retreat?',
    answer:
      'None. Many retreats welcome complete beginners with guided instruction. What matters is not experience but willingness — willingness to sit, to be quiet, and to stay with what arises. If you are new, choose a short retreat (3 days) in a gentle environment like Chakrata. If you have a regular practice, longer and more remote options like Zanskar become accessible.',
  },
  {
    question: 'What is the ideal retreat length for a first timer?',
    answer:
      'Three days is the minimum for genuine depth. Day one is adjustment. Day two is settling. Day three is where something shifts. Five to seven days allows genuine transformation. For a first retreat, three days is a safe, meaningful commitment.',
  },
  {
    question: 'Should I choose a meditation retreat close to home or far away?',
    answer:
      'Distance matters more than you expect. Travelling far enough that your daily world feels genuinely remote creates a psychological separation that supports the retreat. A retreat 2 hours from home may feel like an extended day off. A retreat in the Himalayas — even if it takes a full day to reach — creates the clean break your nervous system needs. The journey is part of the transition.',
  },
  {
    question: 'Is group size important in a meditation retreat?',
    answer:
      'Very. Large retreats (30+) can feel anonymous — you are one of many, and individual guidance is rare. Small groups (8–12) allow the teacher to see you, adjust the practice, and offer personal support. In a small group, the shared silence creates intimacy without conversation. This is one of the most important factors most people overlook.',
  },
  {
    question: 'How do I know if a retreat is genuine vs commercial tourism?',
    answer:
      'Look for three signals: small group size (under 15), experienced teachers who practise what they teach (not wellness performers), and an environment that supports the practice rather than marketing to tourists. Avoid retreats that promise transformation in their advertising — genuine retreats describe the conditions, not the outcome.',
  },
  {
    question: 'Can I combine meditation with other activities like trekking?',
    answer:
      'Yes, walking and trekking complement meditation practice. In the Himalayas, walking is itself a form of meditation — rhythmic movement, engagement with landscape, breath awareness. Many retreats include walking practice as part of the structure. Locations like Sankri and Munsiyari are particularly suited to integrated retreat-and-trek programmes.',
  },
];

export default function HowToChooseMeditationRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'How to Choose a Meditation Retreat', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: 'How to Choose a Meditation Retreat',
    description: 'A practical guide to choosing the right meditation retreat.',
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
          { name: 'Meditation Retreats', href: '/meditation-retreats' },
          { name: 'How to Choose a Meditation Retreat' },
        ]}
      />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            How to Choose a Meditation Retreat
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            The internet is full of meditation retreats. Most are indistinguishable &mdash; the same
            stock photos, the same vague promises of inner peace, the same spa-adjacent language.
            Choosing the right retreat is not about finding the one with the best website. It is about
            matching your nervous system, your experience level, and your intention to the right
            environment, duration, and teaching approach.
          </p>
        </header>

        {/* ── ENVIRONMENT ───────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            1. Environment Is the Most Important Factor
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            The environment where you meditate matters more than the technique. A perfect
            meditation method in a noisy, commercial, or visually chaotic setting will not go
            deep. A simple breath practice in a Himalayan forest at 2,000 metres will.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Look for retreats where the physical environment supports the practice:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><strong>Acoustic quiet</strong> &mdash; no traffic, no tourism, no commercial noise</li>
            <li><strong>Natural beauty</strong> &mdash; forest, mountains, river (not a conference room)</li>
            <li><strong>Altitude</strong> &mdash; even moderate altitude (1,500&ndash;2,500m) naturally slows the mind</li>
            <li><strong>Remoteness</strong> &mdash; far enough from your daily world that you feel genuinely separated</li>
          </ul>
          <p style={{ lineHeight: 1.8, marginTop: '0.75rem' }}>
            In our network, <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link> offers
            forest quiet, <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar</Link> offers
            radical remoteness, and <Link href="/locations/rishikesh" style={{ color: 'var(--color-primary)' }}>Rishikesh</Link> offers
            sacred tradition.
          </p>
        </section>

        {/* ── DURATION ──────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            2. Duration: Longer Than You Think
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            One day is a taster. Three days gives you genuine depth &mdash; enough time for the mind
            to stop running its habitual loops. Five to seven days is where real transformation
            begins. Ten days or more is for serious practitioners who want sustained immersion.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            Most people choose retreats that are too short because they are afraid of commitment.
            If you are genuinely seeking change, choose at least three days of residential retreat.
            The first day is always adjustment. The real work begins after that.
          </p>
        </section>

        <PrimaryCTA
          label="Help Me Choose a Retreat"
          subtext="Tell us your experience level, timeline, and what you're seeking. We'll recommend the right fit."
          vertical="retreat"
          category="guide-choose-meditation"
          sourcePath={PATH}
        />

        {/* ── GROUP SIZE ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            3. Group Size: Smaller Is Better
          </h2>
          <p style={{ lineHeight: 1.8 }}>
            Large meditation retreats (30+ people) offer affordability but sacrifice depth. You are
            one of many. The teacher cannot see you. Personal guidance is minimal. In a small group
            (8&ndash;12), the teacher notices when you are struggling. Adjustments happen in real time.
            The shared silence in a small group creates an intimacy that large retreats cannot replicate.
            All our retreats are capped at 12 participants for this reason.
          </p>
        </section>

        {/* ── TEACHING STYLE ────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            4. Teaching Style: Practice Over Performance
          </h2>
          <p style={{ lineHeight: 1.8 }}>
            Beware of retreats led by Instagram-famous teachers whose primary skill is audience
            engagement. Look for teachers who have a sustained personal practice, who teach from
            experience rather than certification alone, and who are comfortable with silence themselves.
            A good retreat teacher is more like a mountain guide than a lecturer &mdash; they know the
            terrain and walk it with you.
          </p>
        </section>

        {/* ── LOCATION ──────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            5. Location: Match the Land to Your Need
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Need</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Location</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Why</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Gentle first experience</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}><Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link></td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Forest quiet, accessible, nurturing</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Deep immersion</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}><Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar</Link></td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Radical remoteness, monastery lineage</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Yogic tradition</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}><Link href="/locations/rishikesh" style={{ color: 'var(--color-primary)' }}>Rishikesh</Link></td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Sacred geography, Ganges energy</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Spacious stillness</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}><Link href="/locations/munsiyari" style={{ color: 'var(--color-primary)' }}>Munsiyari</Link></td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Alpine openness, peak views</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── WHAT TO AVOID ─────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            What to Avoid
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li>Retreats that promise specific outcomes (&ldquo;guaranteed enlightenment&rdquo;)</li>
            <li>Very large groups where personal attention is impossible</li>
            <li>Urban locations dressed up as &ldquo;retreats&rdquo; — proximity to noise defeats the purpose</li>
            <li>Programs that pack the schedule with workshops and leave no space for actual practice</li>
            <li>Teachers without personal practice — ask how they live, not just what they teach</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Find My Meditation Retreat"
          subtext="Not sure where to start? We'll match you to the right environment, duration, and approach."
          vertical="retreat"
          category="guide-choose-meditation"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Further Reading
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>Meditation retreats in the Himalayas</Link></li>
            <li><Link href="/silent-retreats" style={{ color: 'var(--color-primary)' }}>Silent retreats</Link></li>
            <li><Link href="/what-happens-at-a-silent-retreat" style={{ color: 'var(--color-primary)' }}>What happens at a silent retreat?</Link></li>
            <li><Link href="/best-meditation-retreats-in-india" style={{ color: 'var(--color-primary)' }}>Best meditation retreats in India</Link></li>
            <li><Link href="/retreat-vs-vacation" style={{ color: 'var(--color-primary)' }}>Retreat vs vacation: what is the difference?</Link></li>
          </ul>
        </section>

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
      </article>
    </TrackedPage>
  );
}
