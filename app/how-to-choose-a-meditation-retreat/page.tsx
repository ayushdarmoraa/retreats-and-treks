import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';

const PATH = '/how-to-choose-a-meditation-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'How to Choose a Meditation Retreat | Retreats And Treks',
    description:
      'How to choose a meditation retreat by environment, duration, group size, teaching style, location, experience level, and personal intention.',
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
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md) 0' }}>
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
        <style>{`
          .hcmr-section {
            width:100vw;
            margin-left:calc(-50vw + 50%);
            padding-top:4rem;
            padding-bottom:4rem;
            border-bottom:1px solid #e5e7eb;
          }
          .hcmr-inner {
            max-width:72rem;
            margin:0 auto;
            padding:0 2rem;
          }
          .hcmr-eyebrow {
            display:flex;
            align-items:center;
            gap:0.75rem;
            margin-bottom:1rem;
          }
          .hcmr-eyebrow-line {
            width:32px;
            height:1px;
            background:#d9b46f;
          }
          .hcmr-eyebrow-text {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.68rem;
            letter-spacing:0.18em;
            text-transform:uppercase;
            font-weight:700;
          }
          .hcmr-hero {
            position:relative;
            min-height:76vh;
            display:flex;
            align-items:center;
            overflow:hidden;
            background-image:
              linear-gradient(90deg, rgba(5,18,14,0.9) 0%, rgba(5,18,14,0.72) 44%, rgba(5,18,14,0.18) 100%),
              url('/Images/experience-hubs/meditation-hero.png');
            background-size:cover;
            background-position:center;
            color:#fff;
            border-bottom:none;
          }
          .hcmr-hero::after {
            content:'';
            position:absolute;
            inset:auto 0 0;
            height:34%;
            background:linear-gradient(0deg, rgba(247,249,247,1) 0%, rgba(247,249,247,0) 100%);
            pointer-events:none;
          }
          .hcmr-hero-inner {
            position:relative;
            z-index:1;
            max-width:72rem;
            width:100%;
            margin:0 auto;
            padding:7rem 2rem 8rem;
          }
          .hcmr-hero-content {
            max-width:48rem;
          }
          .hcmr-hero-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(2.7rem,6vw,5.8rem);
            font-weight:250;
            letter-spacing:-0.065em;
            line-height:0.96;
            margin:0 0 1.35rem;
            color:#fff;
            text-wrap:balance;
          }
          .hcmr-hero-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(1rem,1.4vw,1.18rem);
            line-height:1.85;
            font-weight:300;
            color:rgba(255,255,255,0.86);
            max-width:43rem;
            margin:0 0 2rem;
          }
          .hcmr-hero-actions {
            display:flex;
            flex-wrap:wrap;
            gap:0.8rem;
            margin-bottom:2rem;
          }
          .hcmr-hero-btn {
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
          .hcmr-hero-btn:hover {
            transform:translateY(-2px);
          }
          .hcmr-hero-btn-primary {
            background:#d9b46f;
            color:#111;
            border:1px solid rgba(217,180,111,0.9);
          }
          .hcmr-hero-btn-secondary {
            background:rgba(255,255,255,0.08);
            color:#fff;
            border:1px solid rgba(255,255,255,0.28);
            backdrop-filter:blur(14px);
          }
          .hcmr-hero-stats {
            display:grid;
            grid-template-columns:repeat(4,minmax(0,1fr));
            gap:0.9rem;
            max-width:58rem;
          }
          .hcmr-hero-stat {
            border:1px solid rgba(255,255,255,0.18);
            background:rgba(255,255,255,0.1);
            backdrop-filter:blur(16px);
            border-radius:18px;
            padding:1.05rem;
            box-shadow:0 24px 70px rgba(0,0,0,0.22);
          }
          .hcmr-hero-stat-value {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.95rem;
            font-weight:750;
            color:#fff;
            margin:0 0 0.35rem;
          }
          .hcmr-hero-stat-label {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.72rem;
            line-height:1.5;
            color:rgba(255,255,255,0.72);
            margin:0;
          }
          .hcmr-env-section {
            background:
              radial-gradient(circle at top left, rgba(217,180,111,0.14), transparent 34%),
              linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
          }
          .hcmr-section-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(2rem,4.4vw,4rem);
            font-weight:250;
            letter-spacing:-0.06em;
            line-height:1;
            color:#111;
            margin:0 0 1rem;
            text-wrap:balance;
          }
          .hcmr-section-title span {
            color:#0f766e;
          }
          .hcmr-section-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:1rem;
            line-height:1.85;
            font-weight:300;
            color:#555;
            max-width:46rem;
            margin:0 0 2rem;
          }
          .hcmr-env-grid {
            display:grid;
            grid-template-columns:repeat(4,minmax(0,1fr));
            gap:1rem;
          }
          .hcmr-env-card {
            position:relative;
            overflow:hidden;
            min-height:250px;
            padding:1.25rem;
            border-radius:26px;
            border:1px solid rgba(17,24,39,0.08);
            background:#fff;
            box-shadow:0 24px 80px rgba(17,24,39,0.08);
          }
          .hcmr-env-card::before {
            content:'';
            position:absolute;
            inset:0;
            background:
              linear-gradient(135deg, rgba(217,180,111,0.18), transparent 38%),
              radial-gradient(circle at bottom right, rgba(16,32,25,0.1), transparent 34%);
            pointer-events:none;
          }
          .hcmr-env-card > * {
            position:relative;
            z-index:1;
          }
          .hcmr-env-icon {
            width:46px;
            height:46px;
            border-radius:17px;
            display:flex;
            align-items:center;
            justify-content:center;
            background:#102019;
            color:#d9b46f;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:1rem;
            font-weight:850;
            margin-bottom:1.15rem;
            box-shadow:0 16px 38px rgba(16,32,25,0.18);
          }
          .hcmr-env-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:1.08rem;
            line-height:1.18;
            letter-spacing:-0.035em;
            font-weight:750;
            color:#111;
            margin:0 0 0.7rem;
          }
          .hcmr-env-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.84rem;
            line-height:1.72;
            font-weight:300;
            color:#555;
            margin:0;
          }
          .hcmr-env-locations {
            margin-top:1.25rem;
            padding:1.2rem 1.25rem;
            border-radius:24px;
            background:#102019;
            color:rgba(255,255,255,0.78);
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            line-height:1.75;
            font-weight:300;
          }
          .hcmr-env-locations strong {
            color:#d9b46f;
            font-weight:750;
          }
          .hcmr-env-locations a {
            color:#fff;
            font-weight:700;
            text-decoration:none;
            border-bottom:1px solid rgba(217,180,111,0.5);
          }

          .hcmr-duration-section {
            background:
              radial-gradient(circle at top right, rgba(217,180,111,0.14), transparent 34%),
              linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
          }
          .hcmr-duration-grid {
            display:grid;
            grid-template-columns:repeat(4,minmax(0,1fr));
            gap:1rem;
          }
          .hcmr-duration-card {
            position:relative;
            overflow:hidden;
            min-height:290px;
            padding:1.25rem;
            border-radius:26px;
            border:1px solid rgba(17,24,39,0.08);
            background:#fff;
            box-shadow:0 24px 80px rgba(17,24,39,0.08);
            display:flex;
            flex-direction:column;
          }
          .hcmr-duration-card::before {
            content:'';
            position:absolute;
            inset:0;
            background:
              linear-gradient(135deg, rgba(217,180,111,0.18), transparent 38%),
              radial-gradient(circle at bottom right, rgba(16,32,25,0.1), transparent 34%);
            pointer-events:none;
          }
          .hcmr-duration-card > * {
            position:relative;
            z-index:1;
          }
          .hcmr-duration-days {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            width:max-content;
            min-width:62px;
            height:46px;
            padding:0 0.85rem;
            border-radius:17px;
            background:#102019;
            color:#d9b46f;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.95rem;
            font-weight:850;
            margin-bottom:1.1rem;
          }
          .hcmr-duration-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:1.05rem;
            line-height:1.18;
            letter-spacing:-0.035em;
            font-weight:750;
            color:#111;
            margin:0 0 0.7rem;
          }
          .hcmr-duration-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.84rem;
            line-height:1.72;
            font-weight:300;
            color:#555;
            margin:0 0 1rem;
          }
          .hcmr-duration-best {
            margin-top:auto;
            padding-top:1rem;
            border-top:1px solid rgba(17,24,39,0.08);
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.72rem;
            line-height:1.55;
            letter-spacing:0.1em;
            text-transform:uppercase;
            color:#374151;
            font-weight:750;
          }
          .hcmr-duration-cta {
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
          .hcmr-duration-cta-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            line-height:1.7;
            font-weight:300;
            margin:0;
            max-width:42rem;
          }
          .hcmr-duration-cta-copy strong {
            color:#d9b46f;
            font-weight:750;
          }
          .hcmr-duration-cta-btn {
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

          .hcmr-guidance-section {
            background:#102019;
            color:#fff;
            border-bottom:none;
          }
          .hcmr-guidance-section .hcmr-eyebrow-text {
            color:rgba(255,255,255,0.72);
          }
          .hcmr-guidance-section .hcmr-section-title {
            color:#fff;
          }
          .hcmr-guidance-section .hcmr-section-title span {
            color:#d9b46f;
          }
          .hcmr-guidance-section .hcmr-section-copy {
            color:rgba(255,255,255,0.74);
          }
          .hcmr-guidance-grid {
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:1rem;
            margin-top:2rem;
          }
          .hcmr-guidance-card {
            position:relative;
            overflow:hidden;
            min-height:390px;
            padding:1.45rem;
            border-radius:28px;
            border:1px solid rgba(255,255,255,0.14);
            background:
              radial-gradient(circle at top right, rgba(217,180,111,0.18), transparent 36%),
              rgba(255,255,255,0.07);
            box-shadow:0 30px 90px rgba(0,0,0,0.28);
          }
          .hcmr-guidance-card > * {
            position:relative;
            z-index:1;
          }
          .hcmr-guidance-badge {
            display:inline-flex;
            align-items:center;
            padding:0.42rem 0.7rem;
            border-radius:999px;
            background:rgba(255,255,255,0.12);
            border:1px solid rgba(255,255,255,0.16);
            color:rgba(255,255,255,0.84);
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.68rem;
            line-height:1;
            letter-spacing:0.12em;
            text-transform:uppercase;
            font-weight:750;
            margin-bottom:1rem;
            backdrop-filter:blur(14px);
          }
          .hcmr-guidance-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(1.35rem,2.4vw,2rem);
            line-height:1.05;
            letter-spacing:-0.05em;
            font-weight:750;
            color:#fff;
            margin:0 0 0.85rem;
          }
          .hcmr-guidance-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            line-height:1.78;
            color:rgba(255,255,255,0.76);
            font-weight:300;
            margin:0 0 1.15rem;
          }
          .hcmr-guidance-list {
            list-style:none;
            display:grid;
            gap:0.65rem;
            padding:0;
            margin:0;
          }
          .hcmr-guidance-list li {
            display:flex;
            gap:0.55rem;
            align-items:flex-start;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.84rem;
            line-height:1.6;
            color:rgba(255,255,255,0.78);
            font-weight:300;
          }
          .hcmr-guidance-list li::before {
            content:'✓';
            color:#d9b46f;
            font-weight:850;
            flex-shrink:0;
          }
          .hcmr-guidance-note {
            margin-top:1.25rem;
            padding:1.15rem 1.25rem;
            border-radius:22px;
            background:rgba(255,255,255,0.08);
            border:1px solid rgba(255,255,255,0.12);
            color:rgba(255,255,255,0.78);
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            line-height:1.75;
            font-weight:300;
          }
          .hcmr-guidance-note strong {
            color:#d9b46f;
            font-weight:750;
          }

          .hcmr-location-section {
            background:
              radial-gradient(circle at top left, rgba(217,180,111,0.14), transparent 34%),
              linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
          }
          .hcmr-location-grid {
            display:grid;
            grid-template-columns:repeat(2,minmax(0,1fr));
            gap:1rem;
          }
          .hcmr-location-card {
            position:relative;
            overflow:hidden;
            min-height:390px;
            border-radius:30px;
            background:#102019;
            color:#fff;
            text-decoration:none;
            border:1px solid rgba(17,24,39,0.08);
            box-shadow:0 28px 85px rgba(17,24,39,0.12);
            display:block;
          }
          .hcmr-location-image {
            position:absolute;
            inset:0;
            width:100%;
            height:100%;
            object-fit:cover;
            opacity:0.84;
            transform:scale(1.03);
            transition:transform 0.35s ease, opacity 0.35s ease;
          }
          .hcmr-location-card:hover .hcmr-location-image {
            transform:scale(1.08);
            opacity:1;
          }
          .hcmr-location-card::after {
            content:'';
            position:absolute;
            inset:0;
            background:
              linear-gradient(180deg, rgba(5,18,14,0.05) 0%, rgba(5,18,14,0.42) 42%, rgba(5,18,14,0.95) 100%),
              linear-gradient(90deg, rgba(5,18,14,0.42), rgba(5,18,14,0.08));
            pointer-events:none;
          }
          .hcmr-location-content {
            position:absolute;
            inset:auto 0 0;
            z-index:1;
            padding:1.45rem;
          }
          .hcmr-location-badge {
            display:inline-flex;
            align-items:center;
            padding:0.42rem 0.7rem;
            border-radius:999px;
            background:rgba(255,255,255,0.12);
            border:1px solid rgba(255,255,255,0.16);
            color:rgba(255,255,255,0.84);
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.68rem;
            line-height:1;
            letter-spacing:0.12em;
            text-transform:uppercase;
            font-weight:750;
            margin-bottom:0.9rem;
            backdrop-filter:blur(14px);
          }
          .hcmr-location-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(1.45rem,2.6vw,2.1rem);
            line-height:1.04;
            letter-spacing:-0.05em;
            font-weight:750;
            color:#fff;
            margin:0 0 0.75rem;
          }
          .hcmr-location-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            line-height:1.72;
            color:rgba(255,255,255,0.76);
            font-weight:300;
            margin:0 0 1rem;
            max-width:30rem;
          }
          .hcmr-location-pill-row {
            display:flex;
            flex-wrap:wrap;
            gap:0.55rem;
            margin-bottom:1rem;
          }
          .hcmr-location-pill {
            display:inline-flex;
            align-items:center;
            padding:0.4rem 0.65rem;
            border-radius:999px;
            background:rgba(255,255,255,0.1);
            border:1px solid rgba(255,255,255,0.12);
            color:rgba(255,255,255,0.76);
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.72rem;
            font-weight:650;
          }
          .hcmr-location-link {
            color:#d9b46f;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.84rem;
            font-weight:850;
          }

          .hcmr-redflags-section {
            background:#102019;
            color:#fff;
            border-bottom:none;
          }
          .hcmr-redflags-section .hcmr-eyebrow-text {
            color:rgba(255,255,255,0.72);
          }
          .hcmr-redflags-section .hcmr-section-title {
            color:#fff;
          }
          .hcmr-redflags-section .hcmr-section-title span {
            color:#d9b46f;
          }
          .hcmr-redflags-section .hcmr-section-copy {
            color:rgba(255,255,255,0.74);
          }
          .hcmr-redflags-grid {
            display:grid;
            grid-template-columns:repeat(5,minmax(0,1fr));
            gap:0.85rem;
            margin-top:2rem;
          }
          .hcmr-redflag-card {
            position:relative;
            overflow:hidden;
            min-height:230px;
            padding:1.15rem;
            border-radius:24px;
            border:1px solid rgba(255,255,255,0.14);
            background:
              radial-gradient(circle at top right, rgba(217,180,111,0.16), transparent 36%),
              rgba(255,255,255,0.07);
            box-shadow:0 26px 80px rgba(0,0,0,0.24);
          }
          .hcmr-redflag-icon {
            width:42px;
            height:42px;
            border-radius:16px;
            display:flex;
            align-items:center;
            justify-content:center;
            background:rgba(217,180,111,0.14);
            color:#d9b46f;
            border:1px solid rgba(217,180,111,0.28);
            font-family:var(--font-geist-sans),sans-serif;
            font-size:1rem;
            font-weight:900;
            margin-bottom:1rem;
          }
          .hcmr-redflag-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.98rem;
            line-height:1.18;
            letter-spacing:-0.03em;
            font-weight:800;
            color:#fff;
            margin:0 0 0.65rem;
          }
          .hcmr-redflag-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.8rem;
            line-height:1.65;
            color:rgba(255,255,255,0.7);
            font-weight:300;
            margin:0;
          }

          .hcmr-final-cta {
            margin-top:1.25rem;
            display:grid;
            grid-template-columns:1.1fr 0.9fr;
            gap:1rem;
            align-items:stretch;
            border-radius:30px;
            overflow:hidden;
            border:1px solid rgba(255,255,255,0.14);
            background:
              radial-gradient(circle at top left, rgba(217,180,111,0.18), transparent 34%),
              rgba(255,255,255,0.08);
          }
          .hcmr-final-cta-main {
            padding:1.6rem;
          }
          .hcmr-final-cta-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(1.35rem,2.5vw,2rem);
            line-height:1.05;
            letter-spacing:-0.05em;
            color:#fff;
            font-weight:750;
            margin:0 0 0.75rem;
          }
          .hcmr-final-cta-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            line-height:1.75;
            color:rgba(255,255,255,0.74);
            font-weight:300;
            margin:0;
          }
          .hcmr-final-cta-actions {
            padding:1.6rem;
            display:flex;
            flex-direction:column;
            justify-content:center;
            gap:0.8rem;
            background:rgba(0,0,0,0.16);
          }
          .hcmr-final-cta-btn {
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
          .hcmr-final-cta-btn:hover {
            transform:translateY(-2px);
          }
          .hcmr-final-cta-btn-primary {
            background:#d9b46f;
            color:#111;
            border:1px solid rgba(217,180,111,0.9);
          }
          .hcmr-final-cta-btn-secondary {
            background:rgba(255,255,255,0.08);
            color:#fff;
            border:1px solid rgba(255,255,255,0.22);
          }

          .hcmr-related-section {
            background:
              radial-gradient(circle at top left, rgba(217,180,111,0.14), transparent 34%),
              linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
          }
          .hcmr-related-grid {
            display:grid;
            grid-template-columns:repeat(3,minmax(0,1fr));
            gap:0.9rem;
          }
          .hcmr-related-card {
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
          .hcmr-related-card::before {
            content:'';
            position:absolute;
            inset:0;
            background:
              linear-gradient(135deg, rgba(217,180,111,0.16), transparent 38%),
              radial-gradient(circle at bottom right, rgba(16,32,25,0.08), transparent 34%);
            pointer-events:none;
          }
          .hcmr-related-card > * {
            position:relative;
            z-index:1;
          }
          .hcmr-related-card:hover {
            transform:translateY(-4px);
            border-color:rgba(15,118,110,0.22);
            box-shadow:0 30px 90px rgba(17,24,39,0.12);
          }
          .hcmr-related-kicker {
            display:block;
            margin-bottom:0.7rem;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.66rem;
            letter-spacing:0.14em;
            text-transform:uppercase;
            color:#0f766e;
            font-weight:850;
          }
          .hcmr-related-title {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:1rem;
            line-height:1.3;
            letter-spacing:-0.025em;
            color:#111;
            font-weight:800;
            margin-bottom:0.65rem;
          }
          .hcmr-related-copy {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.82rem;
            line-height:1.65;
            color:#555;
            font-weight:300;
            padding-right:1.4rem;
          }
          .hcmr-related-arrow {
            position:absolute;
            right:1.1rem;
            bottom:1rem;
            color:#0f766e;
            font-family:var(--font-geist-sans),sans-serif;
            font-weight:900;
          }

          .hcmr-faq-section {
            background:#102019;
            color:#fff;
            border-bottom:none;
          }
          .hcmr-faq-section .hcmr-eyebrow-text {
            color:rgba(255,255,255,0.72);
          }
          .hcmr-faq-section .hcmr-section-title {
            color:#fff;
          }
          .hcmr-faq-section .hcmr-section-title span {
            color:#d9b46f;
          }
          .hcmr-faq-card {
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
          .hcmr-faq-intro {
            position:sticky;
            top:6rem;
          }
          .hcmr-faq-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            line-height:1.8;
            font-weight:300;
            color:rgba(255,255,255,0.74);
            margin:0 0 1.2rem;
          }
          .hcmr-faq-mini {
            display:grid;
            gap:0.65rem;
            margin-top:1.2rem;
          }
          .hcmr-faq-mini-item {
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
          .hcmr-faq-mini-item span {
            color:#d9b46f;
            font-weight:900;
            flex-shrink:0;
          }
          .hcmr-faq-list {
            padding:0.25rem 0.5rem;
            background:#fff;
            border-radius:24px;
          }

          .ft-root {
            margin-top:0;
          }

          @media(max-width:760px){
            .hcmr-section { padding-top:3rem; padding-bottom:3rem; }
            .hcmr-inner { padding:0 1.25rem; }
            .hcmr-hero { min-height:auto; }
            .hcmr-hero-inner { padding:5.5rem 1.25rem 6rem; }
            .hcmr-hero-actions { flex-direction:column; align-items:stretch; }
            .hcmr-hero-btn { width:100%; }
            .hcmr-hero-stats { grid-template-columns:1fr; }
            .hcmr-env-grid { grid-template-columns:1fr; }
            .hcmr-env-card { min-height:auto; }
            .hcmr-duration-grid { grid-template-columns:1fr; }
            .hcmr-duration-card { min-height:auto; }
            .hcmr-duration-cta { align-items:stretch; }
            .hcmr-duration-cta-btn { width:100%; }
            .hcmr-guidance-grid { grid-template-columns:1fr; }
            .hcmr-guidance-card { min-height:auto; }
            .hcmr-location-grid { grid-template-columns:1fr; }
            .hcmr-location-card { min-height:380px; }
            .hcmr-redflags-grid { grid-template-columns:1fr; }
            .hcmr-redflag-card { min-height:auto; }
            .hcmr-final-cta { grid-template-columns:1fr; }
            .hcmr-final-cta-main, .hcmr-final-cta-actions { padding:1.25rem; }
            .hcmr-related-grid { grid-template-columns:1fr; }
            .hcmr-faq-card { grid-template-columns:1fr; padding:1.25rem; }
            .hcmr-faq-intro { position:static; }
            .hcmr-faq-list { padding:0; }
          }
        `}</style>
        <section className="hcmr-section hcmr-hero">
          <div className="hcmr-hero-inner">
            <div className="hcmr-hero-content">
              <div className="hcmr-eyebrow">
                <span className="hcmr-eyebrow-line" />
                <span className="hcmr-eyebrow-text">Meditation Retreat Decision Guide</span>
              </div>

              <h1 className="hcmr-hero-title">
                How to Choose a Meditation Retreat
              </h1>

              <p className="hcmr-hero-copy">
                The internet is full of meditation retreats. Choosing the right one is not about finding the best-looking website. It is about matching your nervous system, experience level, and intention to the right environment, duration, group size, and teaching approach.
              </p>

              <div className="hcmr-hero-actions">
                <Link href="/meditation-retreats" className="hcmr-hero-btn hcmr-hero-btn-primary">
                  Explore meditation retreats
                </Link>
                <a href="#retreat-environment" className="hcmr-hero-btn hcmr-hero-btn-secondary">
                  Start with the key factors
                </a>
              </div>

              <div className="hcmr-hero-stats">
                <div className="hcmr-hero-stat">
                  <p className="hcmr-hero-stat-value">Environment</p>
                  <p className="hcmr-hero-stat-label">Quiet, nature, and distance from daily triggers matter most.</p>
                </div>
                <div className="hcmr-hero-stat">
                  <p className="hcmr-hero-stat-value">Duration</p>
                  <p className="hcmr-hero-stat-label">Three days is a reset. Five to seven days creates depth.</p>
                </div>
                <div className="hcmr-hero-stat">
                  <p className="hcmr-hero-stat-value">Group size</p>
                  <p className="hcmr-hero-stat-label">Small groups allow more attention and safer guidance.</p>
                </div>
                <div className="hcmr-hero-stat">
                  <p className="hcmr-hero-stat-value">Teacher fit</p>
                  <p className="hcmr-hero-stat-label">Choose practice, presence, and experience over performance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ENVIRONMENT ───────────────────────────────────────────── */}
        <section id="retreat-environment" className="hcmr-section hcmr-env-section">
          <div className="hcmr-inner">
            <div className="hcmr-eyebrow">
              <span className="hcmr-eyebrow-line" />
              <span className="hcmr-eyebrow-text">Factor 01 · Environment</span>
            </div>
            <h2 className="hcmr-section-title">
              Environment is the <span>most important factor</span>
            </h2>
            <p className="hcmr-section-copy">
              The environment where you meditate matters more than the technique. A perfect meditation method in a noisy, commercial, or visually chaotic setting will not go deep. A simple breath practice in a Himalayan forest at 2,000 metres will.
            </p>

            <div className="hcmr-env-grid">
              {[
                {
                  icon: '∿',
                  title: 'Acoustic quiet',
                  copy: 'Choose a place without traffic, tourism noise, loud music, or constant movement around the retreat space.',
                },
                {
                  icon: '△',
                  title: 'Natural beauty',
                  copy: 'Forest, mountains, rivers, and open sky support practice better than a conference-room setting dressed as wellness.',
                },
                {
                  icon: '↑',
                  title: 'Altitude',
                  copy: 'Even moderate altitude between 1,500 and 2,500 metres can create a sense of spaciousness and natural slowing down.',
                },
                {
                  icon: '○',
                  title: 'Remoteness',
                  copy: 'The retreat should feel far enough from daily life that your nervous system understands this is a real separation.',
                },
              ].map((item) => (
                <div key={item.title} className="hcmr-env-card">
                  <div className="hcmr-env-icon">{item.icon}</div>
                  <h3 className="hcmr-env-title">{item.title}</h3>
                  <p className="hcmr-env-copy">{item.copy}</p>
                </div>
              ))}
            </div>

            <div className="hcmr-env-locations">
              <strong>Location guide:</strong> In our network, <Link href="/locations/chakrata">Chakrata</Link> offers forest quiet, <Link href="/locations/zanskar">Zanskar</Link> offers radical remoteness, and <Link href="/locations/rishikesh">Rishikesh</Link> offers sacred tradition.
            </div>
          </div>
        </section>

        {/* ── DURATION ──────────────────────────────────────────────── */}
        <section className="hcmr-section hcmr-duration-section">
          <div className="hcmr-inner">
            <div className="hcmr-eyebrow">
              <span className="hcmr-eyebrow-line" />
              <span className="hcmr-eyebrow-text">Factor 02 · Duration</span>
            </div>
            <h2 className="hcmr-section-title">
              Duration should be <span>longer than you think</span>
            </h2>
            <p className="hcmr-section-copy">
              One day is a taster. Three days gives you genuine depth. Five to seven days is where real transformation begins. Ten days or more is for serious practitioners who want sustained immersion.
            </p>

            <div className="hcmr-duration-grid">
              {[
                {
                  days: '1 day',
                  title: 'A taster',
                  copy: 'Useful for trying meditation in a guided setting, but usually too short for the mind to leave daily momentum behind.',
                  best: 'Best for: curiosity, local workshops, first exposure',
                },
                {
                  days: '3 days',
                  title: 'First real reset',
                  copy: 'Enough time for day-one adjustment, day-two settling, and day-three clarity. This is the safest meaningful first retreat length.',
                  best: 'Best for: beginners, stress relief, accessible depth',
                },
                {
                  days: '5–7 days',
                  title: 'Deeper immersion',
                  copy: 'The retreat becomes less about resting and more about practice, emotional processing, silence, and genuine pattern interruption.',
                  best: 'Best for: deeper reset, burnout, emotional space',
                },
                {
                  days: '10+ days',
                  title: 'Serious practice',
                  copy: 'Best for people ready for sustained silence, discipline, and a fuller break from digital, social, and professional identity.',
                  best: 'Best for: experienced practitioners, silence, transformation',
                },
              ].map((item) => (
                <div key={item.days} className="hcmr-duration-card">
                  <div className="hcmr-duration-days">{item.days}</div>
                  <h3 className="hcmr-duration-title">{item.title}</h3>
                  <p className="hcmr-duration-copy">{item.copy}</p>
                  <div className="hcmr-duration-best">{item.best}</div>
                </div>
              ))}
            </div>

            <div className="hcmr-duration-cta">
              <p className="hcmr-duration-cta-copy">
                <strong>Choosing for the first time?</strong> Start with three days if you want a safe, meaningful reset. Choose five to seven days if you already know you need deeper disconnection.
              </p>
              <Link href="/contact" className="hcmr-duration-cta-btn">
                Ask for retreat guidance
              </Link>
            </div>
          </div>
        </section>

        {/* ── GROUP SIZE + TEACHING STYLE ───────────────────────────── */}
        <section className="hcmr-section hcmr-guidance-section">
          <div className="hcmr-inner">
            <div className="hcmr-eyebrow">
              <span className="hcmr-eyebrow-line" />
              <span className="hcmr-eyebrow-text">Factors 03–04 · Guidance Quality</span>
            </div>
            <h2 className="hcmr-section-title">
              Choose depth of <span>support</span>, not just a retreat label
            </h2>
            <p className="hcmr-section-copy">
              A meditation retreat is not only a place and a schedule. The group size and teaching style decide whether you feel seen, guided, and safely supported when silence becomes uncomfortable.
            </p>

            <div className="hcmr-guidance-grid">
              <div className="hcmr-guidance-card">
                <span className="hcmr-guidance-badge">Group size</span>
                <h3 className="hcmr-guidance-title">Smaller is better</h3>
                <p className="hcmr-guidance-copy">
                  Large meditation retreats can be affordable, but they often sacrifice depth. You are one of many, the teacher cannot see you clearly, and personal guidance is minimal.
                </p>
                <ul className="hcmr-guidance-list">
                  <li>Small groups allow teachers to notice when you are struggling</li>
                  <li>Adjustments can happen in real time instead of through generic instructions</li>
                  <li>Shared silence feels more intimate and less anonymous</li>
                  <li>Our retreats are capped at 12 participants for this reason</li>
                </ul>
              </div>

              <div className="hcmr-guidance-card">
                <span className="hcmr-guidance-badge">Teaching style</span>
                <h3 className="hcmr-guidance-title">Practice over performance</h3>
                <p className="hcmr-guidance-copy">
                  Choose teachers who can hold practice, not just an audience. A good retreat teacher is more like a mountain guide than a lecturer — they know the terrain and walk it with you.
                </p>
                <ul className="hcmr-guidance-list">
                  <li>Look for sustained personal practice, not only certification</li>
                  <li>Choose teachers comfortable with silence themselves</li>
                  <li>Avoid retreat formats built mostly around performance or entertainment</li>
                  <li>Prioritize lived experience, steadiness, and grounded guidance</li>
                </ul>
              </div>
            </div>

            <div className="hcmr-guidance-note">
              <strong>Trust signal:</strong> the best retreat is not always the biggest or most polished. It is the one where the environment, facilitator, and group container are strong enough to support real practice.
            </div>
          </div>
        </section>

        {/* ── LOCATION ──────────────────────────────────────────────── */}
        <section className="hcmr-section hcmr-location-section">
          <div className="hcmr-inner">
            <div className="hcmr-eyebrow">
              <span className="hcmr-eyebrow-line" />
              <span className="hcmr-eyebrow-text">Factor 05 · Location Match</span>
            </div>
            <h2 className="hcmr-section-title">
              Match the <span>land</span> to your need
            </h2>
            <p className="hcmr-section-copy">
              A meditation retreat location is not just scenery. The land changes the pace, intensity, safety, and emotional tone of the retreat. Choose the place that supports what you actually need.
            </p>

            <div className="hcmr-location-grid">
              {[
                {
                  href: '/locations/chakrata',
                  image: '/Images/location/chakrata.webp',
                  badge: 'Gentle first experience',
                  title: 'Chakrata',
                  copy: 'Forest quiet, accessibility, and a nurturing Himalayan pace make Chakrata the safest first choice for many beginners.',
                  pills: ['Forest quiet', 'Accessible', 'Beginner friendly'],
                },
                {
                  href: '/locations/zanskar',
                  image: '/Images/hero/mountain-snow.webp',
                  badge: 'Deep immersion',
                  title: 'Zanskar',
                  copy: 'Radical remoteness and monastery lineage make Zanskar more suitable for serious depth than casual reset.',
                  pills: ['Remote', 'Monastery lineage', 'Serious silence'],
                },
                {
                  href: '/locations/rishikesh',
                  image: '/Images/location/rishikesh.webp',
                  badge: 'Yogic tradition',
                  title: 'Rishikesh',
                  copy: 'Sacred geography, the Ganges, and living practice traditions make Rishikesh ideal for yoga-linked meditation.',
                  pills: ['Sacred geography', 'Ganges energy', 'Tradition'],
                },
                {
                  href: '/locations/munsiyari',
                  image: '/Images/location/munsiyari.webp',
                  badge: 'Spacious stillness',
                  title: 'Munsiyari',
                  copy: 'Alpine openness and Panchachuli views create awe, distance, and a spacious container for deeper stillness.',
                  pills: ['Alpine openness', 'Peak views', 'Solitude'],
                },
              ].map((loc) => (
                <Link key={loc.title} href={loc.href} className="hcmr-location-card">
                  <img src={loc.image} alt={`${loc.title} meditation retreat setting`} className="hcmr-location-image" loading="lazy" />
                  <div className="hcmr-location-content">
                    <span className="hcmr-location-badge">{loc.badge}</span>
                    <h3 className="hcmr-location-title">{loc.title}</h3>
                    <p className="hcmr-location-copy">{loc.copy}</p>
                    <div className="hcmr-location-pill-row">
                      {loc.pills.map((pill) => (
                        <span key={pill} className="hcmr-location-pill">{pill}</span>
                      ))}
                    </div>
                    <span className="hcmr-location-link">View location guide →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT TO AVOID ─────────────────────────────────────────── */}
        <section className="hcmr-section hcmr-redflags-section">
          <div className="hcmr-inner">
            <div className="hcmr-eyebrow">
              <span className="hcmr-eyebrow-line" />
              <span className="hcmr-eyebrow-text">Red Flags</span>
            </div>
            <h2 className="hcmr-section-title">
              What to <span>avoid</span> when choosing a meditation retreat
            </h2>
            <p className="hcmr-section-copy">
              A genuine retreat describes the conditions that support practice. Be careful when a retreat sells certainty, spectacle, or comfort without enough silence, guidance, and space.
            </p>

            <div className="hcmr-redflags-grid">
              {[
                {
                  title: 'Guaranteed outcomes',
                  copy: 'Avoid retreats promising specific results like guaranteed enlightenment, instant transformation, or permanent peace.',
                },
                {
                  title: 'Very large groups',
                  copy: 'If personal attention is impossible, the retreat may feel anonymous when support is needed most.',
                },
                {
                  title: 'Urban noise',
                  copy: 'A city hotel or noisy tourist area dressed as a retreat can defeat the purpose of meditation practice.',
                },
                {
                  title: 'Overpacked schedules',
                  copy: 'Too many workshops, activities, and talks can leave no real space for stillness or integration.',
                },
                {
                  title: 'No lived practice',
                  copy: 'Ask how teachers live and practise, not just what they advertise or what certifications they list.',
                },
              ].map((item) => (
                <div key={item.title} className="hcmr-redflag-card">
                  <div className="hcmr-redflag-icon">!</div>
                  <h3 className="hcmr-redflag-title">{item.title}</h3>
                  <p className="hcmr-redflag-copy">{item.copy}</p>
                </div>
              ))}
            </div>

            <div className="hcmr-final-cta">
              <div className="hcmr-final-cta-main">
                <h3 className="hcmr-final-cta-title">Not sure where to start?</h3>
                <p className="hcmr-final-cta-copy">
                  Share your experience level, timeline, comfort with silence, and what you are seeking. We can help match you to the right environment, duration, and approach.
                </p>
              </div>
              <div className="hcmr-final-cta-actions">
                <Link href="/meditation-retreats" className="hcmr-final-cta-btn hcmr-final-cta-btn-primary">
                  Explore meditation retreats
                </Link>
                <Link href="/contact" className="hcmr-final-cta-btn hcmr-final-cta-btn-secondary">
                  Ask for help choosing
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="hcmr-section hcmr-related-section">
          <div className="hcmr-inner">
            <div className="hcmr-eyebrow">
              <span className="hcmr-eyebrow-line" />
              <span className="hcmr-eyebrow-text">Further Reading</span>
            </div>
            <h2 className="hcmr-section-title">
              Continue comparing <span>retreat options</span>
            </h2>
            <p className="hcmr-section-copy">
              These guides help you compare meditation retreats, silence-based formats, retreat benefits, and the difference between a real retreat and a normal vacation.
            </p>

            <div className="hcmr-related-grid">
              {[
                {
                  href: '/meditation-retreats',
                  kicker: 'Main guide',
                  title: 'Meditation retreats in the Himalayas',
                  copy: 'Explore meditation retreat formats, locations, and practical planning guidance.',
                },
                {
                  href: '/silent-retreats',
                  kicker: 'Silence format',
                  title: 'Silent retreats',
                  copy: 'Understand when silence helps, who it suits, and how to prepare for it.',
                },
                {
                  href: '/what-happens-at-a-silent-retreat',
                  kicker: 'Experience guide',
                  title: 'What happens at a silent retreat?',
                  copy: 'A practical walkthrough of what people often experience in retreat silence.',
                },
                {
                  href: '/best-meditation-retreats-in-india',
                  kicker: 'Comparison',
                  title: 'Best meditation retreats in India',
                  copy: 'Compare retreat types, locations, and formats across India.',
                },
                {
                  href: '/retreat-vs-vacation',
                  kicker: 'Decision guide',
                  title: 'Retreat vs vacation',
                  copy: 'Understand why a retreat is structured differently from a holiday.',
                },
              ].map((guide) => (
                <Link key={guide.href} href={guide.href} className="hcmr-related-card">
                  <span className="hcmr-related-kicker">{guide.kicker}</span>
                  <span className="hcmr-related-title">{guide.title}</span>
                  <span className="hcmr-related-copy">{guide.copy}</span>
                  <span className="hcmr-related-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="hcmr-section hcmr-faq-section">
          <div className="hcmr-inner">
            <div className="hcmr-faq-card">
              <div className="hcmr-faq-intro">
                <div className="hcmr-eyebrow">
                  <span className="hcmr-eyebrow-line" />
                  <span className="hcmr-eyebrow-text">Common Questions</span>
                </div>
                <h2 className="hcmr-section-title">
                  Choosing a retreat <span>with confidence</span>
                </h2>
                <p className="hcmr-faq-copy">
                  Answers to the questions people usually ask before choosing a meditation retreat: experience level, duration, distance, group size, retreat authenticity, and combining meditation with walking or trekking.
                </p>
                <div className="hcmr-faq-mini">
                  <div className="hcmr-faq-mini-item"><span>✓</span> Beginner-friendly decision guidance</div>
                  <div className="hcmr-faq-mini-item"><span>✓</span> Helps compare duration and distance</div>
                  <div className="hcmr-faq-mini-item"><span>✓</span> Useful before booking a retreat</div>
                </div>
              </div>

              <div className="hcmr-faq-list">
                <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
              </div>
            </div>
          </div>
        </section>
      </article>
    </TrackedPage>
  );
}
