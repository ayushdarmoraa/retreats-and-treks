import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';

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
      images: buildOgImages('How to Prepare for a Retreat — Practical Checklist'),
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
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md) 0' }}>
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
        <style>{`
          .hpr-section {
            width:100vw;
            margin-left:calc(-50vw + 50%);
            padding-top:4rem;
            padding-bottom:4rem;
            border-bottom:1px solid #e5e7eb;
          }
          .hpr-inner {
            max-width:72rem;
            margin:0 auto;
            padding:0 2rem;
          }
          .hpr-eyebrow {
            display:flex;
            align-items:center;
            gap:0.75rem;
            margin-bottom:1rem;
          }
          .hpr-eyebrow-line {
            width:32px;
            height:1px;
            background:#d9b46f;
          }
          .hpr-eyebrow-text {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.68rem;
            letter-spacing:0.18em;
            text-transform:uppercase;
            font-weight:700;
          }
          .hpr-hero {
            position:relative;
            min-height:76vh;
            display:flex;
            align-items:center;
            overflow:hidden;
            background-image:
              linear-gradient(90deg, rgba(5,18,14,0.9) 0%, rgba(5,18,14,0.72) 44%, rgba(5,18,14,0.18) 100%),
              url('/Images/blog/how-to-reach-chakrata-for-a-retreat.webp');
            background-size:cover;
            background-position:center;
            color:#fff;
            border-bottom:none;
          }
          .hpr-hero::after {
            content:'';
            position:absolute;
            inset:auto 0 0;
            height:34%;
            background:linear-gradient(0deg, rgba(247,249,247,1) 0%, rgba(247,249,247,0) 100%);
            pointer-events:none;
          }
          .hpr-hero-inner {
            position:relative;
            z-index:1;
            max-width:72rem;
            width:100%;
            margin:0 auto;
            padding:7rem 2rem 8rem;
          }
          .hpr-hero-content {
            max-width:48rem;
          }
          .hpr-hero-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(2.7rem,6vw,5.8rem);
            font-weight:250;
            letter-spacing:-0.065em;
            line-height:0.96;
            margin:0 0 1.35rem;
            color:#fff;
            text-wrap:balance;
          }
          .hpr-hero-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(1rem,1.4vw,1.18rem);
            line-height:1.85;
            font-weight:300;
            color:rgba(255,255,255,0.86);
            max-width:43rem;
            margin:0 0 2rem;
          }
          .hpr-hero-actions {
            display:flex;
            flex-wrap:wrap;
            gap:0.8rem;
            margin-bottom:2rem;
          }
          .hpr-hero-btn {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            min-height:46px;
            padding:0.85rem 1.25rem;
            border-radius:999px;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.86rem;
            font-weight:750;
            text-decoration:none;
            transition:transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
          }
          .hpr-hero-btn:hover {
            transform:translateY(-2px);
          }
          .hpr-hero-btn-primary {
            background:#d9b46f;
            color:#111;
            border:1px solid rgba(217,180,111,0.9);
          }
          .hpr-hero-btn-secondary {
            background:rgba(255,255,255,0.08);
            color:#fff;
            border:1px solid rgba(255,255,255,0.28);
            backdrop-filter:blur(14px);
          }
          .hpr-hero-stats {
            display:grid;
            grid-template-columns:repeat(4,minmax(0,1fr));
            gap:0.9rem;
            max-width:58rem;
          }
          .hpr-hero-stat {
            border:1px solid rgba(255,255,255,0.18);
            background:rgba(255,255,255,0.1);
            backdrop-filter:blur(16px);
            border-radius:18px;
            padding:1.05rem;
            box-shadow:0 24px 70px rgba(0,0,0,0.22);
          }
          .hpr-hero-stat-value {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.95rem;
            font-weight:750;
            color:#fff;
            margin:0 0 0.35rem;
          }
          .hpr-hero-stat-label {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.72rem;
            line-height:1.5;
            color:rgba(255,255,255,0.72);
            margin:0;
          }
          .hpr-timeline-section {
            background:
              radial-gradient(circle at top left, rgba(217,180,111,0.14), transparent 34%),
              linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
          }
          .hpr-section-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(2rem,4.4vw,4rem);
            font-weight:250;
            letter-spacing:-0.06em;
            line-height:1;
            color:#111;
            margin:0 0 1rem;
            text-wrap:balance;
          }
          .hpr-section-title span {
            color:#0f766e;
          }
          .hpr-section-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:1rem;
            line-height:1.85;
            font-weight:300;
            color:#555;
            max-width:46rem;
            margin:0 0 2rem;
          }
          .hpr-timeline-grid {
            display:grid;
            grid-template-columns:repeat(4,minmax(0,1fr));
            gap:1rem;
          }
          .hpr-timeline-card {
            position:relative;
            overflow:hidden;
            min-height:320px;
            padding:1.25rem;
            border-radius:26px;
            border:1px solid rgba(17,24,39,0.08);
            background:#fff;
            box-shadow:0 24px 80px rgba(17,24,39,0.08);
            display:flex;
            flex-direction:column;
          }
          .hpr-timeline-card::before {
            content:'';
            position:absolute;
            inset:0;
            background:
              linear-gradient(135deg, rgba(217,180,111,0.18), transparent 38%),
              radial-gradient(circle at bottom right, rgba(16,32,25,0.1), transparent 34%);
            pointer-events:none;
          }
          .hpr-timeline-card > * {
            position:relative;
            z-index:1;
          }
          .hpr-timeline-step {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            width:max-content;
            min-width:72px;
            height:46px;
            padding:0 0.85rem;
            border-radius:17px;
            background:#102019;
            color:#d9b46f;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.88rem;
            font-weight:850;
            margin-bottom:1.1rem;
          }
          .hpr-timeline-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:1.08rem;
            line-height:1.18;
            letter-spacing:-0.035em;
            font-weight:750;
            color:#111;
            margin:0 0 0.7rem;
          }
          .hpr-timeline-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.84rem;
            line-height:1.72;
            font-weight:300;
            color:#555;
            margin:0 0 1rem;
          }
          .hpr-timeline-list {
            list-style:none;
            display:grid;
            gap:0.55rem;
            padding:0;
            margin:auto 0 0;
            border-top:1px solid rgba(17,24,39,0.08);
            padding-top:1rem;
          }
          .hpr-timeline-list li {
            display:flex;
            align-items:flex-start;
            gap:0.55rem;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.76rem;
            line-height:1.55;
            color:#374151;
            font-weight:450;
          }
          .hpr-timeline-list li::before {
            content:'✓';
            color:#0f766e;
            font-weight:900;
            flex-shrink:0;
          }
          .hpr-timeline-cta {
            margin-top:1.25rem;
            padding:1.25rem;
            border-radius:24px;
            background:#102019;
            color:rgba(255,255,255,0.78);
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:1rem;
            flex-wrap:wrap;
          }
          .hpr-timeline-cta-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            line-height:1.7;
            font-weight:300;
            margin:0;
            max-width:42rem;
          }
          .hpr-timeline-cta-copy strong {
            color:#d9b46f;
            font-weight:750;
          }
          .hpr-timeline-cta-btn {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            min-height:44px;
            padding:0.8rem 1.1rem;
            border-radius:999px;
            background:#d9b46f;
            color:#111;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.82rem;
            font-weight:850;
            text-decoration:none;
            white-space:nowrap;
          }

          .hpr-travel-section {
            background:#102019;
            color:#fff;
            border-bottom:none;
          }
          .hpr-travel-section .hpr-eyebrow-text {
            color:rgba(255,255,255,0.72);
          }
          .hpr-travel-section .hpr-section-title {
            color:#fff;
          }
          .hpr-travel-section .hpr-section-title span {
            color:#d9b46f;
          }
          .hpr-travel-section .hpr-section-copy {
            color:rgba(255,255,255,0.74);
          }
          .hpr-travel-card {
            display:grid;
            grid-template-columns:0.95fr 1.05fr;
            gap:1rem;
            overflow:hidden;
            border-radius:32px;
            border:1px solid rgba(255,255,255,0.14);
            background:
              radial-gradient(circle at top right, rgba(217,180,111,0.16), transparent 34%),
              rgba(255,255,255,0.07);
            box-shadow:0 30px 90px rgba(0,0,0,0.24);
          }
          .hpr-travel-image-wrap {
            position:relative;
            min-height:430px;
            overflow:hidden;
          }
          .hpr-travel-image {
            position:absolute;
            inset:0;
            width:100%;
            height:100%;
            object-fit:cover;
            opacity:0.92;
            transform:scale(1.03);
          }
          .hpr-travel-image-wrap::after {
            content:'';
            position:absolute;
            inset:0;
            background:
              linear-gradient(180deg, rgba(5,18,14,0.05) 0%, rgba(5,18,14,0.42) 48%, rgba(5,18,14,0.84) 100%);
            pointer-events:none;
          }
          .hpr-travel-image-caption {
            position:absolute;
            left:1.25rem;
            right:1.25rem;
            bottom:1.25rem;
            z-index:1;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.82rem;
            line-height:1.65;
            color:rgba(255,255,255,0.78);
            font-weight:300;
            margin:0;
          }
          .hpr-travel-content {
            padding:2rem;
            display:flex;
            flex-direction:column;
            justify-content:center;
          }
          .hpr-travel-list {
            list-style:none;
            display:grid;
            gap:0.8rem;
            padding:0;
            margin:0;
          }
          .hpr-travel-list li {
            display:flex;
            gap:0.75rem;
            align-items:flex-start;
            padding:0.9rem;
            border-radius:20px;
            background:rgba(255,255,255,0.08);
            border:1px solid rgba(255,255,255,0.1);
          }
          .hpr-travel-check {
            width:28px;
            height:28px;
            border-radius:999px;
            display:flex;
            align-items:center;
            justify-content:center;
            flex-shrink:0;
            background:rgba(217,180,111,0.16);
            color:#d9b46f;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.82rem;
            font-weight:900;
          }
          .hpr-travel-list strong {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.88rem;
            line-height:1.25;
            color:#fff;
            font-weight:800;
            margin-bottom:0.25rem;
          }
          .hpr-travel-list span {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.8rem;
            line-height:1.6;
            color:rgba(255,255,255,0.7);
            font-weight:300;
          }

          .hpr-readiness-section {
            background:
              radial-gradient(circle at top left, rgba(217,180,111,0.14), transparent 34%),
              linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
          }
          .hpr-readiness-grid {
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:1rem;
            margin-top:2rem;
          }
          .hpr-readiness-card {
            position:relative;
            overflow:hidden;
            min-height:390px;
            padding:1.45rem;
            border-radius:28px;
            border:1px solid rgba(17,24,39,0.08);
            background:#fff;
            box-shadow:0 24px 80px rgba(17,24,39,0.08);
          }
          .hpr-readiness-card::before {
            content:'';
            position:absolute;
            inset:0;
            background:
              linear-gradient(135deg, rgba(217,180,111,0.18), transparent 38%),
              radial-gradient(circle at bottom right, rgba(16,32,25,0.1), transparent 34%);
            pointer-events:none;
          }
          .hpr-readiness-card > * {
            position:relative;
            z-index:1;
          }
          .hpr-readiness-badge {
            display:inline-flex;
            align-items:center;
            padding:0.42rem 0.7rem;
            border-radius:999px;
            background:#102019;
            color:#d9b46f;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.68rem;
            line-height:1;
            letter-spacing:0.12em;
            text-transform:uppercase;
            font-weight:800;
            margin-bottom:1rem;
          }
          .hpr-readiness-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(1.35rem,2.4vw,2rem);
            line-height:1.05;
            letter-spacing:-0.05em;
            font-weight:750;
            color:#111;
            margin:0 0 0.85rem;
          }
          .hpr-readiness-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            line-height:1.78;
            color:#555;
            font-weight:300;
            margin:0 0 1.15rem;
          }
          .hpr-readiness-list {
            list-style:none;
            display:grid;
            gap:0.65rem;
            padding:0;
            margin:0;
          }
          .hpr-readiness-list li {
            display:flex;
            gap:0.55rem;
            align-items:flex-start;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.84rem;
            line-height:1.6;
            color:#374151;
            font-weight:300;
          }
          .hpr-readiness-list li::before {
            content:'✓';
            color:#0f766e;
            font-weight:850;
            flex-shrink:0;
          }
          .hpr-readiness-list a {
            color:#0f766e;
            font-weight:650;
            text-decoration:none;
          }
          .hpr-readiness-list a:hover {
            text-decoration:underline;
          }

          .hpr-support-cta {
            margin-top:1.25rem;
            display:grid;
            grid-template-columns:1.1fr 0.9fr;
            gap:1rem;
            align-items:stretch;
            border-radius:30px;
            overflow:hidden;
            background:#102019;
            color:#fff;
            box-shadow:0 30px 90px rgba(17,24,39,0.16);
          }
          .hpr-support-cta-main {
            padding:1.6rem;
          }
          .hpr-support-cta-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(1.35rem,2.5vw,2rem);
            line-height:1.05;
            letter-spacing:-0.05em;
            color:#fff;
            font-weight:750;
            margin:0 0 0.75rem;
          }
          .hpr-support-cta-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            line-height:1.75;
            color:rgba(255,255,255,0.74);
            font-weight:300;
            margin:0;
          }
          .hpr-support-cta-actions {
            padding:1.6rem;
            display:flex;
            flex-direction:column;
            justify-content:center;
            gap:0.8rem;
            background:rgba(0,0,0,0.16);
          }
          .hpr-support-cta-btn {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            min-height:46px;
            padding:0.85rem 1.15rem;
            border-radius:999px;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.86rem;
            font-weight:850;
            text-decoration:none;
            transition:transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
          }
          .hpr-support-cta-btn:hover {
            transform:translateY(-2px);
          }
          .hpr-support-cta-btn-primary {
            background:#d9b46f;
            color:#111;
            border:1px solid rgba(217,180,111,0.9);
          }
          .hpr-support-cta-btn-secondary {
            background:rgba(255,255,255,0.08);
            color:#fff;
            border:1px solid rgba(255,255,255,0.22);
          }

          .hpr-related-section {
            background:
              radial-gradient(circle at top left, rgba(217,180,111,0.14), transparent 34%),
              linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
          }
          .hpr-related-grid {
            display:grid;
            grid-template-columns:repeat(3,minmax(0,1fr));
            gap:0.9rem;
          }
          .hpr-related-card {
            position:relative;
            overflow:hidden;
            display:block;
            min-height:170px;
            padding:1.2rem;
            border-radius:24px;
            border:1px solid rgba(17,24,39,0.08);
            background:#fff;
            color:#111;
            text-decoration:none;
            box-shadow:0 24px 80px rgba(17,24,39,0.08);
            transition:transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
          }
          .hpr-related-card::before {
            content:'';
            position:absolute;
            inset:0;
            background:
              linear-gradient(135deg, rgba(217,180,111,0.16), transparent 38%),
              radial-gradient(circle at bottom right, rgba(16,32,25,0.08), transparent 34%);
            pointer-events:none;
          }
          .hpr-related-card > * {
            position:relative;
            z-index:1;
          }
          .hpr-related-card:hover {
            transform:translateY(-4px);
            border-color:rgba(15,118,110,0.22);
            box-shadow:0 30px 90px rgba(17,24,39,0.12);
          }
          .hpr-related-kicker {
            display:block;
            margin-bottom:0.7rem;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.66rem;
            letter-spacing:0.14em;
            text-transform:uppercase;
            color:#0f766e;
            font-weight:850;
          }
          .hpr-related-title {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:1rem;
            line-height:1.3;
            letter-spacing:-0.025em;
            color:#111;
            font-weight:800;
            margin-bottom:0.65rem;
          }
          .hpr-related-copy {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.82rem;
            line-height:1.65;
            color:#555;
            font-weight:300;
            padding-right:1.4rem;
          }
          .hpr-related-arrow {
            position:absolute;
            right:1.1rem;
            bottom:1rem;
            color:#0f766e;
            font-family:var(--font-geist-sans),sans-serif;
            font-weight:900;
          }

          .hpr-faq-section {
            background:#102019;
            color:#fff;
            border-bottom:none;
          }
          .hpr-faq-section .hpr-eyebrow-text {
            color:rgba(255,255,255,0.72);
          }
          .hpr-faq-section .hpr-section-title {
            color:#fff;
          }
          .hpr-faq-section .hpr-section-title span {
            color:#d9b46f;
          }
          .hpr-faq-card {
            display:grid;
            grid-template-columns:0.82fr 1.18fr;
            gap:2rem;
            align-items:start;
            padding:2rem;
            border-radius:32px;
            border:1px solid rgba(255,255,255,0.14);
            background:
              radial-gradient(circle at top right, rgba(217,180,111,0.16), transparent 34%),
              rgba(255,255,255,0.07);
            box-shadow:0 30px 90px rgba(0,0,0,0.24);
          }
          .hpr-faq-intro {
            position:sticky;
            top:6rem;
          }
          .hpr-faq-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            line-height:1.8;
            font-weight:300;
            color:rgba(255,255,255,0.74);
            margin:0 0 1.2rem;
          }
          .hpr-faq-mini {
            display:grid;
            gap:0.65rem;
            margin-top:1.2rem;
          }
          .hpr-faq-mini-item {
            display:flex;
            align-items:flex-start;
            gap:0.6rem;
            padding:0.8rem;
            border-radius:18px;
            background:rgba(255,255,255,0.08);
            border:1px solid rgba(255,255,255,0.1);
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.8rem;
            line-height:1.55;
            color:rgba(255,255,255,0.72);
            font-weight:300;
          }
          .hpr-faq-mini-item span {
            color:#d9b46f;
            font-weight:900;
            flex-shrink:0;
          }
          .hpr-faq-list {
            padding:0.25rem 0.5rem;
            background:#fff;
            border-radius:24px;
          }

          .ft-root {
            margin-top:0;
          }

          @media(max-width:760px){
            .hpr-section { padding-top:3rem; padding-bottom:3rem; }
            .hpr-inner { padding:0 1.25rem; }
            .hpr-hero { min-height:auto; }
            .hpr-hero-inner { padding:5.5rem 1.25rem 6rem; }
            .hpr-hero-actions { flex-direction:column; align-items:stretch; }
            .hpr-hero-btn { width:100%; }
            .hpr-hero-stats { grid-template-columns:1fr; }
            .hpr-timeline-grid { grid-template-columns:1fr; }
            .hpr-timeline-card { min-height:auto; }
            .hpr-timeline-cta { align-items:stretch; }
            .hpr-timeline-cta-btn { width:100%; }
            .hpr-travel-card { grid-template-columns:1fr; }
            .hpr-travel-image-wrap { min-height:320px; }
            .hpr-travel-content { padding:1.25rem; }
            .hpr-readiness-grid { grid-template-columns:1fr; }
            .hpr-readiness-card { min-height:auto; }
            .hpr-support-cta { grid-template-columns:1fr; }
            .hpr-support-cta-main, .hpr-support-cta-actions { padding:1.25rem; }
            .hpr-related-grid { grid-template-columns:1fr; }
            .hpr-faq-card { grid-template-columns:1fr; padding:1.25rem; }
            .hpr-faq-intro { position:static; }
            .hpr-faq-list { padding:0; }
          }
        `}</style>
        <section className="hpr-section hpr-hero">
          <div className="hpr-hero-inner">
            <div className="hpr-hero-content">
              <div className="hpr-eyebrow">
                <span className="hpr-eyebrow-line" />
                <span className="hpr-eyebrow-text">Retreat Preparation Guide</span>
              </div>

              <h1 className="hpr-hero-title">
                How to Prepare for a Retreat
              </h1>

              <p className="hpr-hero-copy">
                The retreat does not start when you arrive. It starts when you begin preparing. How you handle the days before — physically, mentally, digitally, and logistically — affects how quickly you settle once you reach the mountains.
              </p>

              <div className="hpr-hero-actions">
                <Link href="/retreats" className="hpr-hero-btn hpr-hero-btn-primary">
                  Explore retreats
                </Link>
                <a href="#preparation-timeline" className="hpr-hero-btn hpr-hero-btn-secondary">
                  Jump to preparation checklist
                </a>
              </div>

              <div className="hpr-hero-stats">
                <div className="hpr-hero-stat">
                  <p className="hpr-hero-stat-value">2 weeks before</p>
                  <p className="hpr-hero-stat-label">Start reducing inputs, caffeine, and unnecessary commitments.</p>
                </div>
                <div className="hpr-hero-stat">
                  <p className="hpr-hero-stat-value">1 week before</p>
                  <p className="hpr-hero-stat-label">Close work loops, pack early, and create clear communication boundaries.</p>
                </div>
                <div className="hpr-hero-stat">
                  <p className="hpr-hero-stat-value">Travel day</p>
                  <p className="hpr-hero-stat-label">Let the journey become the transition from daily life to retreat life.</p>
                </div>
                <div className="hpr-hero-stat">
                  <p className="hpr-hero-stat-value">Arrival mindset</p>
                  <p className="hpr-hero-stat-label">Release expectations and let the retreat structure hold you.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PREPARATION TIMELINE ─────────────────────────────────── */}
        <section id="preparation-timeline" className="hpr-section hpr-timeline-section">
          <div className="hpr-inner">
            <div className="hpr-eyebrow">
              <span className="hpr-eyebrow-line" />
              <span className="hpr-eyebrow-text">Preparation Timeline</span>
            </div>
            <h2 className="hpr-section-title">
              Start preparing <span>before you arrive</span>
            </h2>
            <p className="hpr-section-copy">
              A retreat settles faster when your body, phone, calendar, and mind have already started slowing down. Use the days before arrival as a gradual transition instead of treating the retreat as a sudden switch.
            </p>

            <div className="hpr-timeline-grid">
              {[
                {
                  step: '2 weeks',
                  title: 'Begin the transition',
                  copy: 'Start reducing the inputs that keep your nervous system activated. The goal is not perfection — it is momentum toward simplicity.',
                  points: ['Reduce screen time', 'Cut caffeine gradually', 'Simplify diet', 'Spend time outdoors'],
                },
                {
                  step: '1 week',
                  title: 'Close practical loops',
                  copy: 'The fewer loose ends you carry into the retreat, the easier it becomes to settle into silence, rest, and practice.',
                  points: ['Finish or delegate work', 'Set auto-replies', 'Inform key people', 'Pack early'],
                },
                {
                  step: '48 hours',
                  title: 'Lower information noise',
                  copy: 'Begin an information fast before the retreat so your mind is not arriving full of headlines, messages, and open loops.',
                  points: ['Stop consuming news', 'Limit social media', 'Sleep earlier', 'Sit quietly for 10 minutes'],
                },
                {
                  step: 'Travel day',
                  title: 'Let the journey work',
                  copy: 'Treat the road into the mountains as part of the retreat. Travel can become the bridge between your normal rhythm and retreat rhythm.',
                  points: ['Use airplane mode', 'Eat lightly', 'Watch the landscape', 'Arrive without expectations'],
                },
              ].map((item) => (
                <div key={item.step} className="hpr-timeline-card">
                  <div className="hpr-timeline-step">{item.step}</div>
                  <h3 className="hpr-timeline-title">{item.title}</h3>
                  <p className="hpr-timeline-copy">{item.copy}</p>
                  <ul className="hpr-timeline-list">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="hpr-timeline-cta">
              <p className="hpr-timeline-cta-copy">
                <strong>Not sure what to prepare for?</strong> Tell us your retreat type, dates, and comfort level. We can help you prepare for the specific environment and format.
              </p>
              <Link href="/contact" className="hpr-timeline-cta-btn">
                Ask for preparation guidance
              </Link>
            </div>
          </div>
        </section>

        {/* ── TRAVEL DAY ───────────────────────────────────────────── */}
        <section className="hpr-section hpr-travel-section">
          <div className="hpr-inner">
            <div className="hpr-eyebrow">
              <span className="hpr-eyebrow-line" />
              <span className="hpr-eyebrow-text">Travel Day</span>
            </div>
            <h2 className="hpr-section-title">
              The journey is <span>part of the retreat</span>
            </h2>
            <p className="hpr-section-copy">
              For Himalayan retreats, travel often involves a flight to Dehradun or Leh, followed by hours of mountain road. This journey is not wasted time — it is the psychological transition between daily life and the retreat environment.
            </p>

            <div className="hpr-travel-card">
              <div className="hpr-travel-image-wrap">
                <img
                  src="/Images/blog/how-to-reach-chakrata-for-a-retreat.webp"
                  alt="Mountain road journey toward a Himalayan retreat"
                  className="hpr-travel-image"
                  loading="lazy"
                />
                <p className="hpr-travel-image-caption">
                  Let the road, altitude, forest, and changing landscape begin the retreat before the first session starts.
                </p>
              </div>

              <div className="hpr-travel-content">
                <ul className="hpr-travel-list">
                  <li>
                    <span className="hpr-travel-check">✓</span>
                    <span>
                      <strong>Use airplane mode early</strong>
                      Leave your phone on airplane mode once the mountain drive begins.
                    </span>
                  </li>
                  <li>
                    <span className="hpr-travel-check">✓</span>
                    <span>
                      <strong>Watch the landscape change</strong>
                      Let the visual transition from city to mountain work on your nervous system.
                    </span>
                  </li>
                  <li>
                    <span className="hpr-travel-check">✓</span>
                    <span>
                      <strong>Eat lightly</strong>
                      Altitude and winding roads can cause nausea, so keep meals simple while travelling.
                    </span>
                  </li>
                  <li>
                    <span className="hpr-travel-check">✓</span>
                    <span>
                      <strong>Arrive without expectations</strong>
                      Come with openness instead of a fixed idea of what the retreat must give you.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── MENTAL + PHYSICAL READINESS ──────────────────────────── */}
        <section className="hpr-section hpr-readiness-section">
          <div className="hpr-inner">
            <div className="hpr-eyebrow">
              <span className="hpr-eyebrow-line" />
              <span className="hpr-eyebrow-text">Mental + Physical Readiness</span>
            </div>
            <h2 className="hpr-section-title">
              Prepare for what the retreat <span>actually asks of you</span>
            </h2>
            <p className="hpr-section-copy">
              You do not need to arrive perfect, peaceful, or highly fit. You need to arrive honest, rested enough to participate, and willing to let the retreat structure support you.
            </p>

            <div className="hpr-readiness-grid">
              <div className="hpr-readiness-card">
                <span className="hpr-readiness-badge">Mind</span>
                <h3 className="hpr-readiness-title">Expect discomfort without treating it as failure</h3>
                <p className="hpr-readiness-copy">
                  The first day of any retreat — especially a silent one — can include restlessness, boredom, anxiety, or irritation. This is normal. It is the mind adjusting.
                </p>
                <ul className="hpr-readiness-list">
                  <li>Release the goal of “achieving inner peace”</li>
                  <li>Use the intention: “I will show up and stay present”</li>
                  <li>Let the schedule, guides, and environment hold you</li>
                  <li>Do not judge early restlessness as a sign the retreat is not working</li>
                </ul>
              </div>

              <div className="hpr-readiness-card">
                <span className="hpr-readiness-badge">Body</span>
                <h3 className="hpr-readiness-title">You need comfort, not athletic fitness</h3>
                <p className="hpr-readiness-copy">
                  You do not need to be fit to attend a meditation or silent retreat. You need to be comfortable sitting for extended periods and able to walk gently on mountain terrain.
                </p>
                <ul className="hpr-readiness-list">
                  <li>Cushions and chairs are always available for sitting practice</li>
                  <li><Link href="/locations/chakrata">Chakrata</Link> and <Link href="/locations/munsiyari">Munsiyari</Link> need no special preparation beyond normal health</li>
                  <li>Higher altitude locations like <Link href="/locations/zanskar">Zanskar</Link> need basic cardiovascular fitness and acclimatisation awareness</li>
                  <li>Carry personal medication and tell the team about relevant needs in advance</li>
                </ul>
              </div>
            </div>

            <div className="hpr-support-cta">
              <div className="hpr-support-cta-main">
                <h3 className="hpr-support-cta-title">Ready to go, but unsure what your retreat requires?</h3>
                <p className="hpr-support-cta-copy">
                  Share your dates, location, retreat type, and comfort level. We can help you understand what to pack, how to prepare, and what to expect before arrival.
                </p>
              </div>
              <div className="hpr-support-cta-actions">
                <Link href="/retreats" className="hpr-support-cta-btn hpr-support-cta-btn-primary">
                  Explore retreats
                </Link>
                <Link href="/contact" className="hpr-support-cta-btn hpr-support-cta-btn-secondary">
                  Ask for preparation help
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FURTHER READING ──────────────────────────────────────── */}
        <section className="hpr-section hpr-related-section">
          <div className="hpr-inner">
            <div className="hpr-eyebrow">
              <span className="hpr-eyebrow-line" />
              <span className="hpr-eyebrow-text">Further Reading</span>
            </div>
            <h2 className="hpr-section-title">
              Continue preparing for your <span>retreat</span>
            </h2>
            <p className="hpr-section-copy">
              These guides help you choose the right retreat, understand silence, compare retreat and vacation formats, and explore Himalayan retreat locations before you arrive.
            </p>

            <div className="hpr-related-grid">
              {[
                {
                  href: '/how-to-choose-a-meditation-retreat',
                  kicker: 'Decision guide',
                  title: 'How to choose a meditation retreat',
                  copy: 'Compare environment, duration, group size, teaching style, and location fit.',
                },
                {
                  href: '/what-happens-at-a-silent-retreat',
                  kicker: 'Silence guide',
                  title: 'What happens at a silent retreat?',
                  copy: 'Understand what the first days of silence can feel like and how to prepare.',
                },
                {
                  href: '/retreat-vs-vacation',
                  kicker: 'Format comparison',
                  title: 'Retreat vs vacation',
                  copy: 'Learn why a retreat is structured differently from a normal holiday.',
                },
                {
                  href: '/benefits-of-himalayan-retreats',
                  kicker: 'Himalayan context',
                  title: 'Benefits of Himalayan retreats',
                  copy: 'See how altitude, quiet, forests, and distance support retreat depth.',
                },
                {
                  href: '/locations',
                  kicker: 'Location planning',
                  title: 'All retreat locations',
                  copy: 'Compare retreat destinations by travel time, terrain, altitude, and atmosphere.',
                },
              ].map((guide) => (
                <Link key={guide.href} href={guide.href} className="hpr-related-card">
                  <span className="hpr-related-kicker">{guide.kicker}</span>
                  <span className="hpr-related-title">{guide.title}</span>
                  <span className="hpr-related-copy">{guide.copy}</span>
                  <span className="hpr-related-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="hpr-section hpr-faq-section">
          <div className="hpr-inner">
            <div className="hpr-faq-card">
              <div className="hpr-faq-intro">
                <div className="hpr-eyebrow">
                  <span className="hpr-eyebrow-line" />
                  <span className="hpr-eyebrow-text">Common Questions</span>
                </div>
                <h2 className="hpr-section-title">
                  Retreat preparation <span>questions</span>
                </h2>
                <p className="hpr-faq-copy">
                  Clear answers for people preparing for their first retreat: when to start, whether to meditate beforehand, what to pack, how to handle work, and what to do if nervousness appears.
                </p>
                <div className="hpr-faq-mini">
                  <div className="hpr-faq-mini-item"><span>✓</span> Packing, work, and phone boundaries</div>
                  <div className="hpr-faq-mini-item"><span>✓</span> First-retreat nervousness and preparation</div>
                  <div className="hpr-faq-mini-item"><span>✓</span> Practical support before arrival</div>
                </div>
              </div>

              <div className="hpr-faq-list">
                <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
              </div>
            </div>
          </div>
        </section>
      </article>
    </TrackedPage>
  );
}
