import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedReads from '@/components/RelatedReads';

const PATH = '/first-day-of-a-meditation-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'First Day at a Meditation Retreat | Retreats And Treks',
    description:
      'What happens on day one of a meditation retreat, from arrival and orientation to your first sit, silent meal, phone surrender, and settling in.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Your First Day at a Meditation Retreat — Hour by Hour',
      description: 'An honest, hour-by-hour account of what day one looks like.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Your First Day at a Meditation Retreat — Hour by Hour'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What time does a meditation retreat usually start?',
    answer:
      'Most residential retreats ask you to arrive between 2pm and 4pm on the first day. This allows time for settling in, orientation, and a first session before dinner. Some retreats start with an evening meal and an introductory talk rather than a formal meditation. Check your specific programme — our retreats send a detailed arrival guide one week before the start date.',
  },
  {
    question: 'Do you meditate on the first day?',
    answer:
      'Yes, but gently. The first sit is usually shorter — 20 to 30 minutes — with clear guidance. The purpose is orientation, not depth. You are learning the posture, the schedule, and the space. The intensive practice begins on day two.',
  },
  {
    question: 'What if I arrive late to a meditation retreat?',
    answer:
      'Contact the retreat centre before your arrival day. Most programmes can accommodate late arrivals but need to know in advance. Arriving after orientation means you miss the group introduction and initial guidelines, which makes the transition harder. Plan your travel to arrive within the stated window.',
  },
  {
    question: 'Can I leave the retreat centre on the first day?',
    answer:
      'Technically yes, but it is discouraged. The first day is about crossing a threshold — physically and mentally. Leaving the grounds, even briefly, disrupts the transition. Bring everything you need before arrival so there is no reason to leave.',
  },
  {
    question: 'What happens if I cannot sit cross-legged?',
    answer:
      'You can meditate in a chair, on a bench, or with a backrest. There is no required posture. The only requirement is that your spine is upright and unsupported (if possible). Our facilitators will help you find a position that works for your body during the first session. Flexibility is not a prerequisite.',
  },
];

export default function FirstDayOfAMeditationRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'First Day of a Retreat', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Your First Day at a Meditation Retreat — Hour by Hour',
    description: 'What actually happens on day one of a meditation retreat.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
      />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Meditation Retreats', href: '/meditation-retreats' }, { name: 'First Day' }]} />

      <article>
        <style>{`
          .fdmr-section {
            width:100vw;
            margin-left:calc(-50vw + 50%);
            padding-top:4rem;
            padding-bottom:4rem;
            border-bottom:1px solid #e5e7eb;
          }
          .fdmr-inner {
            max-width:72rem;
            margin:0 auto;
            padding:0 2rem;
          }
          .fdmr-eyebrow {
            display:flex;
            align-items:center;
            gap:0.75rem;
            margin-bottom:1rem;
          }
          .fdmr-eyebrow-line {
            width:32px;
            height:1px;
            background:#d9b46f;
          }
          .fdmr-eyebrow-text {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.68rem;
            letter-spacing:0.18em;
            text-transform:uppercase;
            font-weight:700;
          }
          .fdmr-hero {
            position:relative;
            min-height:76vh;
            display:flex;
            align-items:center;
            overflow:hidden;
            background-image:
              linear-gradient(90deg, rgba(5,18,14,0.9) 0%, rgba(5,18,14,0.72) 44%, rgba(5,18,14,0.18) 100%),
              url('/Images/experience-hubs/meditation-hero.webp');
            background-size:cover;
            background-position:center;
            color:#fff;
            border-bottom:none;
          }
          .fdmr-hero::after {
            content:'';
            position:absolute;
            inset:auto 0 0;
            height:34%;
            background:linear-gradient(0deg, rgba(247,249,247,1) 0%, rgba(247,249,247,0) 100%);
            pointer-events:none;
          }
          .fdmr-hero-inner {
            position:relative;
            z-index:1;
            max-width:72rem;
            width:100%;
            margin:0 auto;
            padding:7rem 2rem 8rem;
          }
          .fdmr-hero-content {
            max-width:50rem;
          }
          .fdmr-hero-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(2.65rem,6vw,5.8rem);
            font-weight:250;
            letter-spacing:-0.065em;
            line-height:0.96;
            margin:0 0 1.35rem;
            color:#fff;
            text-wrap:balance;
          }
          .fdmr-hero-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(1rem,1.4vw,1.18rem);
            line-height:1.85;
            font-weight:300;
            color:rgba(255,255,255,0.86);
            max-width:43rem;
            margin:0 0 2rem;
          }
          .fdmr-hero-actions {
            display:flex;
            flex-wrap:wrap;
            gap:0.8rem;
            margin-bottom:2rem;
          }
          .fdmr-hero-btn {
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
          .fdmr-hero-btn:hover {
            transform:translateY(-2px);
          }
          .fdmr-hero-btn-primary {
            background:#d9b46f;
            color:#111;
            border:1px solid rgba(217,180,111,0.9);
          }
          .fdmr-hero-btn-secondary {
            background:rgba(255,255,255,0.08);
            color:#fff;
            border:1px solid rgba(255,255,255,0.28);
            backdrop-filter:blur(14px);
          }
          .fdmr-hero-stats {
            display:grid;
            grid-template-columns:repeat(4,minmax(0,1fr));
            gap:0.9rem;
            max-width:58rem;
          }
          .fdmr-hero-stat {
            border:1px solid rgba(255,255,255,0.18);
            background:rgba(255,255,255,0.1);
            backdrop-filter:blur(16px);
            border-radius:18px;
            padding:1.05rem;
            box-shadow:0 24px 70px rgba(0,0,0,0.22);
          }
          .fdmr-hero-stat-value {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.95rem;
            font-weight:750;
            color:#fff;
            margin:0 0 0.35rem;
          }
          .fdmr-hero-stat-label {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.72rem;
            line-height:1.5;
            color:rgba(255,255,255,0.72);
            margin:0;
          }
          .fdmr-timeline-section {
            background:
              radial-gradient(circle at top left, rgba(217,180,111,0.14), transparent 34%),
              linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
          }
          .fdmr-section-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(2rem,4.4vw,4rem);
            font-weight:250;
            letter-spacing:-0.06em;
            line-height:1;
            color:#111;
            margin:0 0 1rem;
            text-wrap:balance;
          }
          .fdmr-section-title span {
            color:#0f766e;
          }
          .fdmr-section-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:1rem;
            line-height:1.85;
            font-weight:300;
            color:#555;
            max-width:46rem;
            margin:0 0 2rem;
          }
          .fdmr-timeline-grid {
            display:grid;
            grid-template-columns:repeat(2,minmax(0,1fr));
            gap:1rem;
          }
          .fdmr-timeline-card {
            position:relative;
            overflow:hidden;
            min-height:330px;
            padding:1.35rem;
            border-radius:28px;
            border:1px solid rgba(17,24,39,0.08);
            background:#fff;
            box-shadow:0 24px 80px rgba(17,24,39,0.08);
            display:flex;
            flex-direction:column;
          }
          .fdmr-timeline-card::before {
            content:'';
            position:absolute;
            inset:0;
            background:
              linear-gradient(135deg, rgba(217,180,111,0.18), transparent 38%),
              radial-gradient(circle at bottom right, rgba(16,32,25,0.1), transparent 34%);
            pointer-events:none;
          }
          .fdmr-timeline-card > * {
            position:relative;
            z-index:1;
          }
          .fdmr-timeline-time {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            width:max-content;
            min-width:76px;
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
          .fdmr-timeline-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(1.2rem,2vw,1.55rem);
            line-height:1.12;
            letter-spacing:-0.04em;
            font-weight:750;
            color:#111;
            margin:0 0 0.75rem;
          }
          .fdmr-timeline-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.88rem;
            line-height:1.76;
            font-weight:300;
            color:#555;
            margin:0 0 1rem;
          }
          .fdmr-timeline-copy a {
            color:#0f766e;
            font-weight:650;
            text-decoration:none;
          }
          .fdmr-timeline-copy a:hover {
            text-decoration:underline;
          }
          .fdmr-timeline-note {
            margin-top:auto;
            padding-top:1rem;
            border-top:1px solid rgba(17,24,39,0.08);
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.74rem;
            line-height:1.55;
            letter-spacing:0.1em;
            text-transform:uppercase;
            color:#374151;
            font-weight:750;
          }
          .fdmr-timeline-cta {
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
          .fdmr-timeline-cta-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            line-height:1.7;
            font-weight:300;
            margin:0;
            max-width:42rem;
          }
          .fdmr-timeline-cta-copy strong {
            color:#d9b46f;
            font-weight:750;
          }
          .fdmr-timeline-cta-btn {
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
          .fdmr-prepare-section {
            background:
              linear-gradient(135deg, rgba(16,32,25,0.96), rgba(16,32,25,0.9)),
              radial-gradient(circle at top right, rgba(217,180,111,0.18), transparent 34%);
            color:#fff;
          }
          .fdmr-prepare-section .fdmr-section-title {
            color:#fff;
          }
          .fdmr-prepare-section .fdmr-section-title span {
            color:#d9b46f;
          }
          .fdmr-prepare-section .fdmr-section-copy {
            color:rgba(255,255,255,0.76);
          }
          .fdmr-prepare-grid {
            display:grid;
            grid-template-columns:repeat(5,minmax(0,1fr));
            gap:0.9rem;
            margin-top:1.75rem;
          }
          .fdmr-prepare-card {
            position:relative;
            overflow:hidden;
            border-radius:24px;
            border:1px solid rgba(255,255,255,0.14);
            background:rgba(255,255,255,0.08);
            backdrop-filter:blur(16px);
            padding:1.1rem;
            min-height:205px;
            box-shadow:0 24px 70px rgba(0,0,0,0.18);
          }
          .fdmr-prepare-card::before {
            content:'';
            position:absolute;
            inset:0;
            background:linear-gradient(135deg, rgba(217,180,111,0.16), transparent 48%);
            pointer-events:none;
          }
          .fdmr-prepare-card > * {
            position:relative;
            z-index:1;
          }
          .fdmr-prepare-icon {
            display:flex;
            align-items:center;
            justify-content:center;
            width:40px;
            height:40px;
            border-radius:15px;
            background:#d9b46f;
            color:#111;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:1rem;
            font-weight:900;
            margin-bottom:0.9rem;
          }
          .fdmr-prepare-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:1rem;
            line-height:1.18;
            letter-spacing:-0.035em;
            font-weight:800;
            color:#fff;
            margin:0 0 0.6rem;
          }
          .fdmr-prepare-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.8rem;
            line-height:1.68;
            font-weight:300;
            color:rgba(255,255,255,0.72);
            margin:0;
          }
          .fdmr-prepare-copy a {
            color:#d9b46f;
            font-weight:750;
            text-decoration:none;
          }
          .fdmr-prepare-copy a:hover {
            text-decoration:underline;
          }
          .fdmr-prepare-links {
            margin-top:1.1rem;
            padding:1.15rem;
            border-radius:22px;
            border:1px solid rgba(255,255,255,0.12);
            background:rgba(255,255,255,0.06);
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.88rem;
            line-height:1.8;
            font-weight:300;
            color:rgba(255,255,255,0.75);
          }
          .fdmr-prepare-links a {
            color:#d9b46f;
            font-weight:750;
            text-decoration:none;
          }
          .fdmr-prepare-links a:hover {
            text-decoration:underline;
          }
          .fdmr-featured-section {
            background:
              radial-gradient(circle at top left, rgba(217,180,111,0.18), transparent 32%),
              linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
          }
          .fdmr-featured-card {
            position:relative;
            overflow:hidden;
            border-radius:34px;
            border:1px solid rgba(17,24,39,0.08);
            background:#fff;
            box-shadow:0 30px 90px rgba(17,24,39,0.1);
            display:grid;
            grid-template-columns:1.15fr 0.85fr;
            gap:0;
          }
          .fdmr-featured-main {
            padding:2rem;
          }
          .fdmr-featured-side {
            position:relative;
            min-height:360px;
            background:
              linear-gradient(180deg, rgba(16,32,25,0.08), rgba(16,32,25,0.32)),
              url('/Images/experience-hubs/meditation-hero.webp');
            background-size:cover;
            background-position:center;
          }
          .fdmr-featured-side::after {
            content:'';
            position:absolute;
            inset:0;
            background:linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0) 38%);
          }
          .fdmr-featured-label {
            display:inline-flex;
            align-items:center;
            width:max-content;
            border-radius:999px;
            padding:0.45rem 0.75rem;
            background:#102019;
            color:#d9b46f;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.68rem;
            font-weight:850;
            letter-spacing:0.13em;
            text-transform:uppercase;
            margin-bottom:1rem;
          }
          .fdmr-featured-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(1.75rem,3.8vw,3.35rem);
            font-weight:250;
            letter-spacing:-0.06em;
            line-height:1;
            color:#111;
            margin:0 0 1rem;
            text-wrap:balance;
          }
          .fdmr-featured-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:1rem;
            line-height:1.85;
            font-weight:300;
            color:#4b5563;
            max-width:42rem;
            margin:0 0 1.4rem;
          }
          .fdmr-featured-actions {
            display:flex;
            flex-wrap:wrap;
            gap:0.8rem;
            margin-top:1.5rem;
          }
          .fdmr-featured-btn {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            min-height:46px;
            padding:0.82rem 1.1rem;
            border-radius:999px;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.84rem;
            font-weight:850;
            text-decoration:none;
            transition:transform 0.2s ease, background 0.2s ease;
          }
          .fdmr-featured-btn:hover {
            transform:translateY(-2px);
          }
          .fdmr-featured-btn-primary {
            background:#102019;
            color:#fff;
          }
          .fdmr-featured-btn-secondary {
            background:#f3f4f6;
            color:#111;
            border:1px solid rgba(17,24,39,0.08);
          }
          .fdmr-featured-points {
            display:grid;
            grid-template-columns:repeat(3,minmax(0,1fr));
            gap:0.75rem;
            margin-top:1.4rem;
          }
          .fdmr-featured-point {
            border-radius:18px;
            border:1px solid rgba(17,24,39,0.08);
            background:#f7f9f7;
            padding:0.85rem;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.76rem;
            line-height:1.55;
            font-weight:650;
            color:#374151;
          }
          .fdmr-faq-section {
            background:#fff;
          }
          .fdmr-faq-wrap {
            border-radius:32px;
            border:1px solid rgba(17,24,39,0.08);
            background:
              radial-gradient(circle at top right, rgba(217,180,111,0.12), transparent 30%),
              #f7f9f7;
            padding:2rem;
            box-shadow:0 24px 80px rgba(17,24,39,0.07);
          }
          .fdmr-related-section {
            background:
              linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
          }
          .fdmr-related-wrap {
            border-radius:32px;
            border:1px solid rgba(17,24,39,0.08);
            background:#fff;
            padding:2rem;
            box-shadow:0 24px 80px rgba(17,24,39,0.07);
          }
          .fdmr-bottom-nav {
            margin-top:1.25rem;
            padding-top:1.25rem;
            border-top:1px solid rgba(17,24,39,0.08);
            display:grid;
            grid-template-columns:repeat(3,max-content);
            justify-content:start;
            gap:0.75rem;
            align-items:center;
          }
          .fdmr-bottom-nav a {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            min-height:40px;
            padding:0.7rem 0.95rem;
            border-radius:999px;
            background:#f3f4f6;
            color:#111;
            border:1px solid rgba(17,24,39,0.08);
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.82rem;
            font-weight:800;
            text-decoration:none;
          }
          .fdmr-bottom-nav a:first-child {
            background:#102019;
            color:#fff;
          }

          @media(max-width:980px){
            .fdmr-prepare-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
          }

          @media(max-width:760px){
            .fdmr-section { padding-top:3rem; padding-bottom:3rem; }
            .fdmr-inner { padding:0 1.25rem; }
            .fdmr-hero { min-height:auto; }
            .fdmr-hero-inner { padding:5.5rem 1.25rem 6rem; }
            .fdmr-hero-actions { flex-direction:column; align-items:stretch; }
            .fdmr-hero-btn { width:100%; }
            .fdmr-hero-stats { grid-template-columns:1fr; }
            .fdmr-timeline-grid { grid-template-columns:1fr; }
            .fdmr-timeline-card { min-height:auto; }
            .fdmr-timeline-cta { align-items:stretch; }
            .fdmr-timeline-cta-btn { width:100%; }
            .fdmr-prepare-grid { grid-template-columns:1fr; }
            .fdmr-prepare-card { min-height:auto; }
            .fdmr-featured-card { grid-template-columns:1fr; }
            .fdmr-featured-main { padding:1.35rem; }
            .fdmr-featured-side { min-height:240px; order:-1; }
            .fdmr-featured-side::after { display:none; }
            .fdmr-featured-actions { flex-direction:column; align-items:stretch; }
            .fdmr-featured-btn { width:100%; }
            .fdmr-featured-points { grid-template-columns:1fr; }
            .fdmr-faq-wrap,
            .fdmr-related-wrap { padding:1.25rem; border-radius:24px; }
            .fdmr-bottom-nav {
              grid-template-columns:1fr;
              justify-content:stretch;
            }
            .fdmr-bottom-nav a { width:100%; }
          }
        `}</style>
        <section className="fdmr-section fdmr-hero">
          <div className="fdmr-hero-inner">
            <div className="fdmr-hero-content">
              <div className="fdmr-eyebrow">
                <span className="fdmr-eyebrow-line" />
                <span className="fdmr-eyebrow-text">First Day Meditation Retreat Guide</span>
              </div>

              <h1 className="fdmr-hero-title">
                Your First Day at a Meditation Retreat: Hour by Hour
              </h1>

              <p className="fdmr-hero-copy">
                Day one is the strangest day. You are not yet in the retreat and no longer in your ordinary life. Here is exactly what happens — arrival, phone handover, orientation, first sit, first silent meal, and the moment you realise you are alone with your own mind.
              </p>

              <div className="fdmr-hero-actions">
                <Link href="/meditation-retreats" className="fdmr-hero-btn fdmr-hero-btn-primary">
                  Explore meditation retreats
                </Link>
                <a href="#day-one-timeline" className="fdmr-hero-btn fdmr-hero-btn-secondary">
                  Jump to hour-by-hour timeline
                </a>
              </div>

              <div className="fdmr-hero-stats">
                <div className="fdmr-hero-stat">
                  <p className="fdmr-hero-stat-value">2:00pm</p>
                  <p className="fdmr-hero-stat-label">Arrival, registration, room assignment, and last conversation.</p>
                </div>
                <div className="fdmr-hero-stat">
                  <p className="fdmr-hero-stat-value">3:00pm</p>
                  <p className="fdmr-hero-stat-label">The phone goes away and the outside world becomes quiet.</p>
                </div>
                <div className="fdmr-hero-stat">
                  <p className="fdmr-hero-stat-value">4:30pm</p>
                  <p className="fdmr-hero-stat-label">Your first guided sit begins gently, not intensely.</p>
                </div>
                <div className="fdmr-hero-stat">
                  <p className="fdmr-hero-stat-value">6:00pm</p>
                  <p className="fdmr-hero-stat-label">The first silent meal makes the retreat feel real.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Day One Timeline --- */}
        <section id="day-one-timeline" className="fdmr-section fdmr-timeline-section">
          <div className="fdmr-inner">
            <div className="fdmr-eyebrow">
              <span className="fdmr-eyebrow-line" />
              <span className="fdmr-eyebrow-text">Day One Timeline</span>
            </div>
            <h2 className="fdmr-section-title">
              What happens on <span>the first day</span>
            </h2>
            <p className="fdmr-section-copy">
              The first day is a threshold. It moves you from travel, conversation, and phone-checking into silence, structure, and the first honest encounter with your own mind.
            </p>

            <div className="fdmr-timeline-grid">
              {[
                {
                  time: '2:00pm',
                  title: 'Arrival and the last conversation',
                  copy: 'You arrive with your bag, complete registration, receive your room assignment, and meet other participants. Everyone is a little nervous, a little excited, and making the slightly forced small talk of people who know speech is about to be taken away.',
                  note: 'What you may feel: nervous, curious, exposed, relieved',
                },
                {
                  time: '3:00pm',
                  title: 'The phone goes away',
                  copy: <>On most silent retreats — and on all of ours — you surrender your phone. Not powered down in your room. Physically handed over. There may be a jolt of anxiety, then a strange lightness. Read more about <Link href="/a-week-without-my-phone-digital-detox">what a week without your phone actually feels like</Link>.</>,
                  note: 'Why it matters: the outside world becomes genuinely absent',
                },
                {
                  time: '3:30pm',
                  title: 'Orientation',
                  copy: 'The facilitator introduces the programme: schedule, guidelines, where to sit, when meals are served, where walking paths go, and what to do if you need help. The tone should feel calm, practical, and reassuring.',
                  note: 'What changes: the structure begins holding you',
                },
                {
                  time: '4:30pm',
                  title: 'Your first sit',
                  copy: 'The first meditation session is usually 20–30 minutes. It is guided, gentle, and focused on arriving in the body. Most people’s minds race during the first sit. This is normal. You are not failing — you are seeing how fast the mind moves.',
                  note: 'Remember: the first sit is not a test',
                },
                {
                  time: '6:00pm',
                  title: 'First meal in silence',
                  copy: 'Eating without conversation can feel disorienting. You hear chewing, cutlery, and the small sounds of the room. Many people realise here that silence is no longer an idea — it has become concrete.',
                  note: 'What you may feel: awkward, alert, sensitive, oddly free',
                },
                {
                  time: '7:30pm',
                  title: 'Evening session and lights',
                  copy: <>A short evening sit or talk closes the day. By 9pm, the centre is quiet — no screen, no book, no music. This is when many first-timers think, “What have I done?” If you want to know what happens next, read about <Link href="/how-hard-is-a-silent-retreat">how hard a silent retreat actually is</Link> and <Link href="/what-happens-to-your-mind-in-silence">what happens to your mind in prolonged silence</Link>.</>,
                  note: 'This is often the widest gap between old life and retreat life',
                },
              ].map((item) => (
                <div key={item.time} className="fdmr-timeline-card">
                  <div className="fdmr-timeline-time">{item.time}</div>
                  <h3 className="fdmr-timeline-title">{item.title}</h3>
                  <p className="fdmr-timeline-copy">{item.copy}</p>
                  <div className="fdmr-timeline-note">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="fdmr-timeline-cta">
              <p className="fdmr-timeline-cta-copy">
                <strong>Planning your first retreat?</strong> Start with a short, guided programme where the first day is clearly structured and beginner-friendly.
              </p>
              <Link href="/3-day-meditation-retreat" className="fdmr-timeline-cta-btn">
                View 3-day meditation retreat
              </Link>
            </div>
          </div>
        </section>

        {/* --- What to know --- */}
        <section className="fdmr-section fdmr-prepare-section">
          <div className="fdmr-inner">
            <div className="fdmr-eyebrow">
              <span className="fdmr-eyebrow-line" />
              <span className="fdmr-eyebrow-text">Before Day One</span>
            </div>

            <h2 className="fdmr-section-title">
              What you should know <span>before you arrive</span>
            </h2>

            <p className="fdmr-section-copy">
              The first day feels easier when your body, travel, expectations, and emergency contact plan are already settled before you reach the retreat centre.
            </p>

            <div className="fdmr-prepare-grid">
              <div className="fdmr-prepare-card">
                <div className="fdmr-prepare-icon">1</div>
                <h3 className="fdmr-prepare-title">Pack light</h3>
                <p className="fdmr-prepare-copy">
                  Bring only what supports practice. See our <Link href="/what-to-pack-for-a-retreat">complete packing list</Link>.
                </p>
              </div>

              <div className="fdmr-prepare-card">
                <div className="fdmr-prepare-icon">2</div>
                <h3 className="fdmr-prepare-title">Arrive rested</h3>
                <p className="fdmr-prepare-copy">
                  Do not fly in the same day or travel overnight. Give yourself a buffer before silence begins.
                </p>
              </div>

              <div className="fdmr-prepare-card">
                <div className="fdmr-prepare-icon">3</div>
                <h3 className="fdmr-prepare-title">Eat normally</h3>
                <p className="fdmr-prepare-copy">
                  Do not fast or change your diet dramatically before arrival. Keep the body steady.
                </p>
              </div>

              <div className="fdmr-prepare-card">
                <div className="fdmr-prepare-icon">4</div>
                <h3 className="fdmr-prepare-title">Tell someone where you are</h3>
                <p className="fdmr-prepare-copy">
                  Share the retreat centre contact details with a trusted person before you hand over your phone.
                </p>
              </div>

              <div className="fdmr-prepare-card">
                <div className="fdmr-prepare-icon">5</div>
                <h3 className="fdmr-prepare-title">Lower your expectations</h3>
                <p className="fdmr-prepare-copy">
                  The retreat will not match what you imagine. That is the point.
                </p>
              </div>
            </div>

            <div className="fdmr-prepare-links">
              For the complete guide, read <Link href="/how-to-prepare-for-a-retreat">how to prepare for a retreat</Link> and <Link href="/first-meditation-retreat-tips">first meditation retreat tips</Link>.
            </div>
          </div>
        </section>

        <section className="fdmr-section fdmr-featured-section">
          <div className="fdmr-inner">
            <div className="fdmr-featured-card">
              <div className="fdmr-featured-main">
                <div className="fdmr-featured-label">Beginner-Friendly Retreat</div>
                <h2 className="fdmr-featured-title">
                  Start with a short, guided meditation retreat.
                </h2>
                <p className="fdmr-featured-copy">
                  A 3-day meditation retreat gives you the full first-day experience without asking you to commit to a long silent programme. Meals, accommodation, guidance, and structure are included.
                </p>

                <div className="fdmr-featured-points">
                  <div className="fdmr-featured-point">Clear daily structure</div>
                  <div className="fdmr-featured-point">Facilitated practice</div>
                  <div className="fdmr-featured-point">Good for first-timers</div>
                </div>

                <div className="fdmr-featured-actions">
                  <Link href="/3-day-meditation-retreat" className="fdmr-featured-btn fdmr-featured-btn-primary">
                    View programme
                  </Link>
                  <Link href="/retreat-calendar" className="fdmr-featured-btn fdmr-featured-btn-secondary">
                    See all dates
                  </Link>
                  <Link href="/find-your-retreat" className="fdmr-featured-btn fdmr-featured-btn-secondary">
                    Find your retreat
                  </Link>
                </div>
              </div>

              <div className="fdmr-featured-side" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="fdmr-section fdmr-faq-section">
          <div className="fdmr-inner">
            <div className="fdmr-eyebrow">
              <span className="fdmr-eyebrow-line" />
              <span className="fdmr-eyebrow-text">First-Timer Questions</span>
            </div>

            <h2 className="fdmr-section-title">
              Questions people ask <span>before day one</span>
            </h2>

            <p className="fdmr-section-copy">
              These are the practical doubts that usually appear before arrival: timing, the first meditation session, late arrival, movement rules, and sitting posture.
            </p>

            <div className="fdmr-faq-wrap">
              <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
            </div>
          </div>
        </section>

        <section className="fdmr-section fdmr-related-section">
          <div className="fdmr-inner">
            <div className="fdmr-related-wrap">
              <div className="fdmr-eyebrow">
                <span className="fdmr-eyebrow-line" />
                <span className="fdmr-eyebrow-text">Continue Reading</span>
              </div>

              <h2 className="fdmr-section-title">
                Go deeper before <span>you choose a retreat</span>
              </h2>

              <p className="fdmr-section-copy">
                Read the next guides if you want to understand silent practice, packing, expectations, and what the mind does when the usual distractions disappear.
              </p>

              <RelatedReads
                links={[
                  { label: 'How Hard Is a Silent Retreat?', href: '/how-hard-is-a-silent-retreat' },
                  { label: 'What to Pack for a Retreat', href: '/what-to-pack-for-a-retreat' },
                  { label: 'What to Expect at a Meditation Retreat', href: '/what-to-expect-at-a-meditation-retreat' },
                  { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
                ]}
              />

              <nav className="fdmr-bottom-nav" aria-label="Meditation retreat navigation">
                <Link href="/meditation-retreats">← Meditation Retreats</Link>
                <Link href="/how-to-prepare-for-a-retreat">How to Prepare</Link>
                <Link href="/retreat-calendar">Retreat Calendar</Link>
              </nav>
            </div>
          </div>
        </section>
      </article>
    </TrackedPage>
  );
}
