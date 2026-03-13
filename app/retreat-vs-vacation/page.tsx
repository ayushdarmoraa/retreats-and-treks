import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/retreat-vs-vacation';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Retreat vs Vacation — What Is the Difference? | Retreats And Treks',
    description:
      'The real difference between a retreat and a vacation — why rest doesn\'t equal recovery, what retreats offer that holidays cannot, and how to know which one you actually need right now.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Retreat vs Vacation — What Is the Difference?',
      description: 'Why holidays don\'t fix burnout. What a retreat does that a vacation cannot.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Retreat vs Vacation — What Is the Difference?'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Can a vacation be restorative like a retreat?',
    answer:
      'A vacation can provide rest and pleasure, but it rarely provides the conditions for deep restoration. Vacations maintain your connection to your identity — you are still you, just in a nicer location. Retreats disrupt that connection by removing the inputs that sustain your habitual self (devices, conversations, decisions, entertainment). If what you need is pleasure and novelty, take a vacation. If what you need is genuine recalibration, choose a retreat.',
  },
  {
    question: 'Is a retreat harder than a vacation?',
    answer:
      'In some ways, yes. A retreat asks you to give up comfort, distraction, and habitual stimulation. The first day can be uncomfortable — especially on a silent retreat. But the kind of rest a retreat provides is qualitatively different from the relaxation of a holiday. A vacation relaxes the surface. A retreat reaches the depth.',
  },
  {
    question: 'Do I need to meditate on a retreat?',
    answer:
      'Not all retreats are meditation-focused. Some emphasise yoga, nature immersion, somatic work, or creative expression. What all genuine retreats share is structure, intention, and separation from daily life. If sitting meditation feels daunting, there are retreats that use walking, movement, or nature as the primary practice.',
  },
  {
    question: 'Can I bring my partner on a retreat?',
    answer:
      'Some retreats welcome couples, though the experience is often individual — especially on silent retreats where you will not be speaking to each other. Attending a retreat with a partner can be meaningful if both people are genuinely seeking the experience. It can be counterproductive if one person is attending to please the other. Discuss intentions honestly before booking together.',
  },
  {
    question: 'How long should a retreat be compared to a vacation?',
    answer:
      'A vacation can be any length — a weekend getaway works because pleasure is immediate. A retreat needs at least three days for genuine depth. The first day is transition, the second is settling, and the third is where the real work begins. For deeper transformation, five to seven days is optimal. This is why retreats feel like a bigger commitment — because they are.',
  },
  {
    question: 'What if I need both — rest and depth?',
    answer:
      'Consider a retreat that includes periods of unstructured time in a beautiful environment. Many Himalayan retreats combine practice with free time in nature — you get the depth of meditation and the pleasure of mountain beauty. Chakrata is particularly good for this balance: structured practice plus forest walks, clean air, and genuine rest.',
  },
];

export default function RetreatVsVacationPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreat vs Vacation', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: 'Retreat vs Vacation — What Is the Difference?',
    description: 'Understanding the real difference between a retreat and a vacation.',
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
          { name: 'Retreat vs Vacation' },
        ]}
      />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Retreat vs Vacation: What Is the Difference?
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Most people conflate retreats and vacations. Both involve leaving home. Both promise
            rest. But they work on fundamentally different levels. A vacation changes your
            scenery. A retreat changes your state. Understanding this difference might be the
            most important thing you read before booking either one.
          </p>
        </header>

        {/* ── THE CORE DIFFERENCE ──────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            The Core Difference
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            A vacation adds &mdash; new experiences, new sights, new pleasures, new meals, new
            entertainment. A retreat subtracts &mdash; removes noise, removes decisions, removes
            stimulation, removes social performance. Both have value. But they address different
            needs.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>&nbsp;</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Vacation</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Retreat</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Purpose</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Pleasure, novelty, relaxation</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Depth, recalibration, transformation</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Stimulation</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>More than usual</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Less than usual</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Devices</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Ever-present (photos, maps, reviews)</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Removed or minimised</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Schedule</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Self-directed, spontaneous</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Structured, held by guides</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Social</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Conversation, companionship</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Often silent or minimal conversation</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Effect</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Refreshed, entertained</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Changed, recalibrated</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>After-effect</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Often fades within days</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>Often deepens over weeks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── WHY VACATIONS DON'T FIX BURNOUT ──────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Why Vacations Do Not Fix Burnout
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            If you are genuinely burned out &mdash; not tired, but depleted at the level of
            meaning and motivation &mdash; a vacation will not fix it. You will lie on a beach and
            still feel empty. You will visit beautiful places and feel nothing. This is because
            burnout is not a deficit of pleasure. It is a deficit of depth.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            A retreat addresses this by removing the conditions that caused the burnout:
            constant stimulation, decision fatigue, social performance, and the unrelenting
            pressure to be productive. In a Himalayan retreat, the mountains do not care about
            your productivity. The forest does not ask for output. This is the medicine. See
            our <Link href="/burnout-recovery-retreats" style={{ color: 'var(--color-primary)' }}>burnout recovery retreats</Link>.
          </p>
        </section>

        <PrimaryCTA
          label="Explore Our Retreats"
          subtext="Not sure if you need a retreat or a vacation? Talk to us honestly — we'll help you decide."
          vertical="retreat"
          category="guide-retreat-vs-vacation"
          sourcePath={PATH}
        />

        {/* ── WHEN TO VACATION, WHEN TO RETREAT ────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            How to Know Which One You Need
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Choose a vacation if:</strong> you are generally well but need a break from
            routine, you want to explore a new place, you want shared pleasure with friends or
            family, you need novelty and stimulation.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Choose a retreat if:</strong> vacations no longer refresh you, you feel
            disconnected from yourself or your work, you are carrying stress that sleep does not
            resolve, you suspect the problem is not tiredness but something deeper, you need
            silence more than entertainment.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            If you are reading this page, the honest answer is probably: retreat.
          </p>
        </section>

        {/* ── HIMALAYAN RETREATS ───────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Why the Himalayas (Not Just Any Retreat)
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            You can do a retreat in a city studio, a suburban centre, or a converted farmhouse.
            But the Himalayas offer something these cannot: environmental medicine. The altitude
            naturally slows the mind. The forest acoustics regulate the nervous system. The
            remoteness creates genuine psychological separation from daily life. The beauty is
            constant and requires nothing of you.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            Explore our <Link href="/locations" style={{ color: 'var(--color-primary)' }}>retreat locations</Link>{' '}
            or read about the{' '}
            <Link href="/benefits-of-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>specific benefits of Himalayan retreats</Link>.
          </p>
        </section>

        <PrimaryCTA
          label="Find My Retreat"
          subtext="Ready to go beyond a vacation? Tell us what you need and we'll recommend the right retreat."
          vertical="retreat"
          category="guide-retreat-vs-vacation"
          sourcePath={PATH}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/how-to-choose-a-meditation-retreat" style={{ color: 'var(--color-primary)' }}>How to Choose a Meditation Retreat</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/how-to-prepare-for-a-retreat" style={{ color: 'var(--color-primary)' }}>How to Prepare for a Retreat</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/benefits-of-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>Benefits of Himalayan Retreats</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
