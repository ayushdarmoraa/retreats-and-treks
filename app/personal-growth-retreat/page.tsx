import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/personal-growth-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Personal Growth Retreat in the Himalayas | Retreats And Treks',
    description:
      'Personal growth retreat in the Himalayas — meditation, reflection, nature immersion. Not a seminar. An experience designed for genuine inner development. Chakrata, Rishikesh, Zanskar.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Personal Growth Retreat in the Himalayas',
      description: 'Not a seminar. An experience designed for genuine inner development in Himalayan environments.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How is this different from a personal development seminar?',
    answer:
      'Seminars operate through information: frameworks, models, techniques. A personal growth retreat operates through experience: silence, nature, stillness, and encounter with your own inner life. The growth happens not because you learn something new, but because the familiar structures dissolve enough to reveal what was already there — strengths, values, clarity, and purpose you did not have access to under the noise.',
  },
  {
    question: 'Do I need meditation experience?',
    answer:
      'No. Personal growth retreats include guided meditation but do not require prior experience. The meditation is a tool, not the goal. Walking meditation, journalling, nature immersion, and structured reflection are equally important. If you have never meditated, this is a powerful way to start — in an environment that supports sustained inner attention.',
  },
  {
    question: 'What kind of "growth" should I expect?',
    answer:
      'Not the motivational-poster kind. Genuine growth on retreat often looks like: seeing a pattern you did not know you had, understanding why a relationship dynamic keeps repeating, recognizing a value you have been ignoring, feeling a creative impulse you had suppressed. It is subtle, honest, and sometimes uncomfortable. But it is real.',
  },
  {
    question: 'Is a 3-day or 7-day retreat better for personal growth?',
    answer:
      'Three days is enough for meaningful insight. Seven days allows those insights to settle and deepen. If personal growth is your primary intention and you have the time, 7 days is significantly more powerful. The first 3 days clear the noise; the remaining 4 are where the genuine development happens.',
  },
];

export default function PersonalGrowthRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Personal Growth Retreat', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Personal Growth Retreat' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Personal Growth Retreat in the Himalayas
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Most personal growth happens despite our efforts, not because of them. The podcast
            episodes, the journalling prompts, the coaching calls &mdash; they add knowledge.
            But real growth requires something different: an interruption in the pattern. A space
            where you are not performing, not producing, not optimising &mdash; and where the
            parts of you that have been waiting beneath the busyness finally have room to emerge.
            A Himalayan retreat provides that interruption through environment, silence, and time.
          </p>
        </header>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Who This Is For
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li>People who have done the courses and read the books but haven&rsquo;t felt the shift</li>
            <li>Professionals seeking to develop emotional intelligence, clarity, and presence</li>
            <li>Those in transition who want direction from within rather than from advice</li>
            <li>Creative people whose creative capacity has been buried under demands</li>
            <li>Anyone drawn to the idea that growth happens through subtraction, not addition</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Explore Personal Growth Retreats"
          subtext="Tell us what you're working on — we'll suggest the right environment and duration."
          vertical="retreat"
          category="personal-growth"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            The Retreat Structure
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Not a lecture series. Not a workshop with handouts. A personal growth retreat is
            structured around experience:
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><strong>Morning meditation</strong> &mdash; clear the surface noise</li>
            <li><strong>Guided reflection</strong> &mdash; questions that open rather than close</li>
            <li><strong>Nature immersion</strong> &mdash; walking, sitting, observing without agenda</li>
            <li><strong>Journalling</strong> &mdash; making visible what the silence reveals</li>
            <li><strong>Evening integration</strong> &mdash; weaving the day&rsquo;s insights into understanding</li>
            <li><strong>Rest</strong> &mdash; genuine rest as a growth practice, not laziness</li>
          </ul>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Where to Grow
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/meditation-retreat-chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link> — forest environment ideal for gentle, sustained inner work</li>
            <li><Link href="/yoga-retreat-rishikesh" style={{ color: 'var(--color-primary)' }}>Rishikesh</Link> — tradition-supported growth through yoga and meditation</li>
            <li><Link href="/silent-retreat-zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar</Link> — radical depth for those ready to go all the way</li>
            <li><Link href="/healing-retreat-munsiyari" style={{ color: 'var(--color-primary)' }}>Munsiyari</Link> — growth through landscape and perspective</li>
          </ul>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Duration Options
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3-day retreat</Link> — enough for meaningful insight</li>
            <li><Link href="/5-day-yoga-retreat" style={{ color: 'var(--color-primary)' }}>5-day retreat</Link> — body and mind integration</li>
            <li><Link href="/7-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>7-day retreat</Link> — the depth where genuine growth lives</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Start Growing"
          subtext="The growth you need is already inside you. The retreat just removes what's in the way."
          vertical="retreat"
          category="personal-growth"
          sourcePath={PATH}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/self-discovery-retreat" style={{ color: 'var(--color-primary)' }}>Self-Discovery Retreat</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/life-reset-retreat" style={{ color: 'var(--color-primary)' }}>Life Reset Retreat</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/spiritual-awakening-retreat" style={{ color: 'var(--color-primary)' }}>Spiritual Awakening</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
