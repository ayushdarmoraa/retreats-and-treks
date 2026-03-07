import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/how-to-prepare-for-a-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'How to Prepare for a Retreat — Practical Checklist | Retreats And Treks',
    description:
      'How to prepare for a meditation, silent, or healing retreat — what to pack, how to adjust your schedule, mental preparation, physical readiness, and what to leave behind. Practical guide.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'How to Prepare for a Retreat — Practical Checklist',
      description: 'What to do (and stop doing) before a retreat. Physical, mental, and practical preparation.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How far in advance should I prepare for a retreat?',
    answer:
      'Two weeks is ideal. In the first week, begin reducing screen time, caffeine, and social commitments. In the second week, simplify further — eat simply, sleep earlier, spend time outdoors. The goal is not to be "retreat-ready" in some perfect sense, but to begin the transition before you arrive. Even small shifts in the last week make a meaningful difference.',
  },
  {
    question: 'Should I meditate before attending a meditation retreat?',
    answer:
      'It helps but is not required. If you have a practice, maintain it in the weeks before. If you do not, try sitting for 10 minutes daily in the week before — not to build skill, but to familiarise yourself with the act of sitting without distraction. The retreat itself will teach you what you need.',
  },
  {
    question: 'What should I pack for a Himalayan retreat?',
    answer:
      'Warm layers (even in summer), comfortable loose clothing for sitting, a warm hat and socks for early morning sessions, a journal and pen, any personal medication, and a book for travel days. Leave behind: work materials, multiple devices, tight schedules. Most retreats provide bedding, towels, and meals. Check with the specific programme for details.',
  },
  {
    question: 'Should I tell people I am going on a retreat?',
    answer:
      'Yes — but briefly. Tell your employer, family, and close friends that you will be unreachable for the duration. Set up an out-of-office reply. The important thing is to create a clean boundary so you are not worrying about unanswered messages during your retreat. The fewer loose ends, the easier it is to settle into silence.',
  },
  {
    question: 'How do I handle work responsibilities before a retreat?',
    answer:
      'Finish or delegate as much as possible in the week before. The biggest enemy of retreat depth is the unresolved task nagging at the back of your mind. Make a list of everything pending, handle what you can, delegate the rest, and make peace with anything left undone. The work will still be there when you return — and you will be better equipped to handle it.',
  },
  {
    question: 'What if I am nervous about attending my first retreat?',
    answer:
      'Nervousness is normal and appropriate. You are about to do something unfamiliar, and your mind is doing its job — scanning for risk. Acknowledge the nervousness without trying to eliminate it. Most retreatants report that the anxiety dissipates within hours of arrival, once the structure and environment take over. If this is your first time, choose a shorter retreat (3 days) in an accessible location like Chakrata.',
  },
];

export default function HowToPrepareForARetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'How to Prepare for a Retreat', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: 'How to Prepare for a Retreat',
    description: 'Practical preparation guide for meditation, silent, and healing retreats.',
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
          { name: 'How to Prepare for a Retreat' },
        ]}
      />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            How to Prepare for a Retreat
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            The retreat does not start when you arrive. It starts when you begin preparing.
            How you approach the days before &mdash; physically, mentally, logistically &mdash;
            directly affects how quickly you settle once you are there. This guide covers
            practical preparation for meditation, silent, and healing retreats in the Himalayas.
          </p>
        </header>

        {/* ── TWO WEEKS BEFORE ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Two Weeks Before: Begin the Transition
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><strong>Reduce screen time</strong> &mdash; start weaning yourself off constant device use</li>
            <li><strong>Cut caffeine gradually</strong> &mdash; caffeine withdrawal during a silent retreat is miserable</li>
            <li><strong>Simplify your diet</strong> &mdash; start eating lighter, cleaner meals</li>
            <li><strong>Spend time outdoors</strong> &mdash; even 30 minutes of daily nature exposure helps</li>
            <li><strong>Reduce social commitments</strong> &mdash; begin creating space in your schedule</li>
          </ul>
        </section>

        {/* ── ONE WEEK BEFORE ──────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            One Week Before: Practical Preparation
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><strong>Finish or delegate work</strong> &mdash; the fewer loose ends, the deeper you go</li>
            <li><strong>Set auto-replies</strong> &mdash; email, messaging apps, work platforms</li>
            <li><strong>Inform key people</strong> &mdash; family, employer, close friends: you will be unreachable</li>
            <li><strong>Pack early</strong> &mdash; warm layers, loose clothing, journal, pen, any medication</li>
            <li><strong>Begin sitting daily</strong> &mdash; even 10 minutes of quiet sitting eases the transition</li>
            <li><strong>Stop consuming news</strong> &mdash; begin the information fast before the retreat</li>
          </ul>
        </section>

        <PrimaryCTA
          label="Plan My Retreat"
          subtext="Not sure what to prepare for? Tell us your retreat interest and we'll guide you."
          vertical="retreat"
          category="guide-prepare-retreat"
          sourcePath={PATH}
        />

        {/* ── TRAVEL DAY ───────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Travel Day: The Journey Is Part of the Retreat
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            For Himalayan retreats, travel often involves a flight to Dehradun or Leh, followed
            by hours of mountain road. This journey is not wasted time &mdash; it is the
            psychological transition between your daily life and the retreat environment.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li>Leave your phone on airplane mode once you begin the mountain drive</li>
            <li>Watch the landscape change &mdash; let the visual transition work on you</li>
            <li>Eat lightly; altitude and winding roads can cause nausea</li>
            <li>Arrive with no expectations &mdash; just openness</li>
          </ul>
        </section>

        {/* ── MENTAL PREPARATION ───────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Mental Preparation: What to Expect (and Release)
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Expect discomfort.</strong> The first day of any retreat &mdash; especially a
            silent one &mdash; will include restlessness, boredom, anxiety, or irritation. This
            is normal. It is the mind adjusting. Do not judge it as failure.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            <strong>Release goals.</strong> &ldquo;I will achieve inner peace&rdquo; is not a
            useful intention. &ldquo;I will show up and stay present with whatever arises&rdquo;
            is. The less you try to get from the retreat, the more it gives.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            <strong>Trust the structure.</strong> The schedule, the guides, the environment &mdash;
            these will hold you. Your job is not to manage the retreat. Your job is to be in it.
          </p>
        </section>

        {/* ── PHYSICAL READINESS ───────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Physical Readiness
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            You do not need to be fit to attend a meditation or silent retreat. You need to be
            comfortable sitting for extended periods (cushions and chairs are always available)
            and able to walk gently on mountain terrain. For higher altitude locations like{' '}
            <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>Zanskar</Link> (3,500m),
            basic cardiovascular fitness and acclimatisation awareness are important.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            For <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link> (2,000m)
            and <Link href="/locations/munsiyari" style={{ color: 'var(--color-primary)' }}>Munsiyari</Link> (2,200m),
            no special physical preparation is needed beyond normal health.
          </p>
        </section>

        <PrimaryCTA
          label="Book My Retreat"
          subtext="Ready to go? Let us know your dates and interests."
          vertical="retreat"
          category="guide-prepare-retreat"
          sourcePath={PATH}
        />

        {/* ── FURTHER READING ──────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Further Reading
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/how-to-choose-a-meditation-retreat" style={{ color: 'var(--color-primary)' }}>How to choose a meditation retreat</Link></li>
            <li><Link href="/what-happens-at-a-silent-retreat" style={{ color: 'var(--color-primary)' }}>What happens at a silent retreat?</Link></li>
            <li><Link href="/retreat-vs-vacation" style={{ color: 'var(--color-primary)' }}>Retreat vs vacation: understanding the difference</Link></li>
            <li><Link href="/benefits-of-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>Benefits of Himalayan retreats</Link></li>
            <li><Link href="/locations" style={{ color: 'var(--color-primary)' }}>All retreat locations</Link></li>
          </ul>
        </section>

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
      </article>
    </TrackedPage>
  );
}
