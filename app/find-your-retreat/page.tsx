import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import RetreatFinder from '@/components/RetreatFinder';
import { getAllRetreatServices } from '@/content/retreats/services';
import { getAggregateRating } from '@/content/reviews';

const PATH = '/find-your-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Find Your Retreat — Guided Retreat Recommendation | Retreats And Treks',
    description:
      'Answer 5 questions and get a personalised Himalayan retreat recommendation. Based on your energy, goals, duration, and preferences — not marketing. Takes 2 minutes.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Find Your Retreat',
      description: 'Answer 5 questions. Get matched to the right Himalayan retreat.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Find Your Retreat'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How does the retreat finder work?',
    answer:
      'Five questions about your energy level, goals, preferred duration, social orientation, and relationship with physical movement. Based on your answers, a scoring engine matches you to the top two retreat programs from our registry. No guesswork, no upselling — just an honest match based on what you need right now.',
  },
  {
    question: 'Is the recommendation binding?',
    answer:
      'No. The retreat finder gives you a starting point. You can explore the recommended programs, compare them with others, or contact us for a more detailed conversation. Nothing is booked until you inquire and we confirm availability.',
  },
  {
    question: 'What if none of the recommendations feel right?',
    answer:
      'Contact us directly. The finder covers our standard programs, but we also offer private and custom retreats designed entirely around your specific needs, timeline, and preferences. Sometimes the right retreat does not exist yet — and we build it for you.',
  },
  {
    question: 'Can I retake the quiz?',
    answer:
      'Yes, as many times as you want. There is a reset button at the results screen. Your answers are not stored or sent anywhere — the matching happens entirely in your browser.',
  },
];

export default function FindYourRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const allRetreats = getAllRetreatServices();
  const finderRatings = Object.fromEntries(
    allRetreats.flatMap((s) => {
      const r = getAggregateRating(s.slug);
      return r ? [[s.slug, { value: r.ratingValue, count: r.reviewCount }]] : [];
    }),
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Find Your Retreat', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Find Your Retreat' }]} />

      <header style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
          Find Your Retreat
        </h1>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
          Not sure which retreat is right for you? Answer five questions about your
          current state, goals, and preferences. The recommendation engine matches you
          to the programs that fit — based on honest scoring, not marketing.
        </p>
      </header>

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <RetreatFinder fromPath={PATH} ratings={finderRatings} />
      </section>

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          Or Explore by Category
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>By Experience</h3>
            <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, fontSize: '0.9rem' }}>
              <li><Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>Meditation Retreats</Link></li>
              <li><Link href="/silent-retreats" style={{ color: 'var(--color-primary)' }}>Silent Retreats</Link></li>
              <li><Link href="/yoga-retreats" style={{ color: 'var(--color-primary)' }}>Yoga Retreats</Link></li>
              <li><Link href="/burnout-recovery-retreats" style={{ color: 'var(--color-primary)' }}>Burnout Recovery</Link></li>
              <li><Link href="/healing-retreat-himalayas" style={{ color: 'var(--color-primary)' }}>Healing Retreats</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>By Duration</h3>
            <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, fontSize: '0.9rem' }}>
              <li><Link href="/3-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>3-Day Retreats</Link></li>
              <li><Link href="/5-day-yoga-retreat" style={{ color: 'var(--color-primary)' }}>5-Day Retreats</Link></li>
              <li><Link href="/7-day-meditation-retreat" style={{ color: 'var(--color-primary)' }}>7-Day Retreats</Link></li>
              <li><Link href="/10-day-silent-retreat" style={{ color: 'var(--color-primary)' }}>10-Day Retreats</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

      <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
        <Link href="/retreat-programs" style={{ color: 'var(--color-primary)' }}>All Programs</Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href="/retreats" style={{ color: 'var(--color-primary)' }}>All Retreats</Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href="/contact" style={{ color: 'var(--color-primary)' }}>Contact Us</Link>
      </p>
    </TrackedPage>
  );
}
