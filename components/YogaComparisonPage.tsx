import Link from 'next/link';
import PrimaryCTA from '@/components/PrimaryCTA';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import TrackedFAQ from '@/components/TrackedFAQ';

export type YogaComparisonKey = 'rishikesh-vs-chakrata' | 'five-vs-seven-days' | 'retreat-vs-ttc';

const COMPARISONS: Record<YogaComparisonKey, {
  path: string;
  title: string;
  description: string;
  firstTitle: string;
  firstSummary: string;
  secondTitle: string;
  secondSummary: string;
  decision: string;
  primaryHref: string;
  primaryLabel: string;
  relatedLinks: { href: string; label: string }[];
  interest: string;
  faqs: { question: string; answer: string }[];
}> = {
  'rishikesh-vs-chakrata': {
    path: '/compare/chakrata-yoga-retreat-vs-rishikesh-yoga-retreat',
    title: 'Rishikesh vs Chakrata Yoga Retreat',
    description: 'Compare the published Rishikesh Yoga product pathway with an on-request Chakrata Yoga enquiry.',
    firstTitle: 'Rishikesh',
    firstSummary: 'Rishikesh is the primary recurring Yoga destination in the product plan. Weekend, 5-day, 7-day and 10-day products are defined; departures, dates, pricing and availability are shown only when published.',
    secondTitle: 'Chakrata',
    secondSummary: 'Chakrata is demand-led and on request. No recurring Yoga departure or location-specific package details are currently published; season, access and programme suitability need confirmation.',
    decision: 'Start with Rishikesh if you want to compare defined duration products and check the live published-date state. Ask about Chakrata when you prefer that setting and can be flexible while the team confirms feasibility.',
    primaryHref: '/retreats/yoga-retreat-rishikesh',
    primaryLabel: 'Check Rishikesh Yoga dates',
    relatedLinks: [
      { href: '/retreats/chakrata/yoga-retreat', label: 'Chakrata enquiry' },
      { href: '/retreats/yoga-retreat-uttarakhand', label: 'Uttarakhand locations' },
    ],
    interest: 'Yoga Retreat',
    faqs: [
      { question: 'Does Chakrata have a fixed Yoga departure?', answer: 'No fixed Chakrata Yoga departure is currently published. Enquiries are demand-led.' },
      { question: 'Are dates and prices available in Rishikesh?', answer: 'Only product-linked future departures in the shared event registry are published. If none appear, no date or price is currently published.' },
    ],
  },
  'five-vs-seven-days': {
    path: '/compare/5-day-yoga-retreat-vs-7-day-yoga-retreat',
    title: '5-Day vs 7-Day Yoga Retreat',
    description: 'Compare two Rishikesh Yoga retreat duration formats and check current published departures.',
    firstTitle: '5 days',
    firstSummary: 'The 5-day product is a shorter extended format for people who want more time than a weekend. The actual programme, dates, stay and price depend on published departure data.',
    secondTitle: '7 days',
    secondSummary: 'The 7-day product provides a longer time window. No specific daily schedule, outcomes, dates or inclusions are assumed without a linked departure.',
    decision: 'Choose based on time available and the confirmed programme. Current departures and dates are shown in each duration page; an empty calendar means no date is published.',
    primaryHref: '/5-day-yoga-retreat',
    primaryLabel: 'Compare 5-day dates',
    relatedLinks: [
      { href: '/retreats/yoga-retreat-rishikesh', label: 'Rishikesh product' },
      { href: '/7-day-yoga-retreat', label: '7-day format' },
    ],
    interest: 'Yoga Retreat',
    faqs: [
      { question: 'Is one format better for beginners?', answer: 'The current departure records do not specify different eligibility by duration. Ask the team to confirm suitability for your experience and selected programme.' },
      { question: 'Are either of these formats currently scheduled?', answer: 'The duration pages show only linked future departures. No fixed date is implied by a product format.' },
    ],
  },
  'retreat-vs-ttc': {
    path: '/compare/yoga-retreat-vs-yoga-teacher-training',
    title: 'Yoga Retreat vs Yoga Teacher Training',
    description: 'Understand the difference between personal-practice retreats and a separate Yoga Teacher Training enquiry.',
    firstTitle: 'Yoga retreat',
    firstSummary: 'A retreat is oriented around personal practice. Rishikesh retreat products have Weekend, 5-day, 7-day and 10-day formats; current course details and availability require a published departure.',
    secondTitle: 'Yoga Teacher Training',
    secondSummary: 'TTC is a distinct study pathway. Current duration, location, dates, fees, curriculum, eligibility and certification information are not published in the TTC product record.',
    decision: 'Choose a retreat if your goal is personal practice. Choose the TTC enquiry route if you are considering formal study; an enquiry does not confirm that a course or credential is available.',
    primaryHref: '/yoga-teacher-training',
    primaryLabel: 'Request TTC information',
    relatedLinks: [
      { href: '/retreats/yoga-retreat-rishikesh', label: 'Rishikesh Yoga retreat' },
      { href: '/5-day-yoga-retreat', label: '5-day format' },
      { href: '/7-day-yoga-retreat', label: '7-day format' },
      { href: '/10-day-yoga-retreat', label: '10-day format' },
    ],
    interest: 'Yoga TTC',
    faqs: [
      { question: 'Does a Yoga retreat provide teacher certification?', answer: 'No certification is represented by the retreat products. TTC is a separate unpublished product record and requires verified business information.' },
      { question: 'Is the TTC a 28-day course?', answer: 'The form previously included a 28-day choice, but no verified course duration is published. Do not treat that old form option as course data.' },
    ],
  },
};

export default function YogaComparisonPage({ comparisonKey }: { comparisonKey: YogaComparisonKey }) {
  const comparison = COMPARISONS[comparisonKey];
  const canonicalUrl = buildCanonicalUrl(comparison.path);
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Yoga Retreats', url: buildCanonicalUrl('/yoga-retreats') },
    { name: comparison.title, url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(comparison.faqs);

  return (
    <TrackedPage page={comparison.path} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbs, faqSchema]) }} />
      <main style={{ maxWidth: '68rem', margin: '0 auto', padding: '1rem 1.5rem 4rem' }}>
        <Breadcrumb items={[
          { name: 'Home', href: '/' },
          { name: 'Yoga Retreats', href: '/yoga-retreats' },
          { name: comparison.title },
        ]} />
        <p style={{ margin: '2rem 0 0.5rem', color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Yoga comparison</p>
        <h1 style={{ margin: '0 0 0.75rem', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}>{comparison.title}</h1>
        <p style={{ maxWidth: '48rem', margin: '0 0 2rem', color: '#4b5563', lineHeight: 1.7 }}>{comparison.description}</p>

        <section aria-label="Comparison" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))', gap: '1.5rem', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', padding: '1.5rem 0' }}>
          {[{ title: comparison.firstTitle, summary: comparison.firstSummary }, { title: comparison.secondTitle, summary: comparison.secondSummary }].map((item) => (
            <article key={item.title}>
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>{item.title}</h2>
              <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.7 }}>{item.summary}</p>
            </article>
          ))}
        </section>

        <section style={{ padding: '1.5rem 0' }}>
          <h2 style={{ fontSize: '1.2rem' }}>How to decide</h2>
          <p style={{ maxWidth: '48rem', color: '#4b5563', lineHeight: 1.7 }}>{comparison.decision}</p>
          <p style={{ marginBottom: '1rem' }}><Link href={comparison.primaryHref} style={{ color: '#0f766e', fontWeight: 600 }}>{comparison.primaryLabel} →</Link></p>
          <Link href="/yoga-retreats" style={{ color: '#0f766e' }}>All Yoga retreat formats</Link>
          {' · '}
          <Link href="/find-your-retreat?type=yoga" style={{ color: '#0f766e' }}>Help Me Choose</Link>
          <nav aria-label="Related Yoga pages" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
            {comparison.relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{ color: '#0f766e' }}>{link.label}</Link>
            ))}
          </nav>
        </section>

        <PrimaryCTA
          label={comparisonKey === 'retreat-vs-ttc' ? 'Check TTC Details' : 'Ask About Yoga Options'}
          subtext="Dates and programme facts are confirmed only when published or verified by the team."
          vertical="retreat"
          category={comparisonKey === 'retreat-vs-ttc' ? 'yoga-ttc' : 'yoga-comparison'}
          sourcePath={comparison.path}
          yogaInterest={comparison.interest}
        />

        <section style={{ paddingTop: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem' }}>Common questions</h2>
          <TrackedFAQ items={comparison.faqs} page={comparison.path} />
        </section>
      </main>
    </TrackedPage>
  );
}
