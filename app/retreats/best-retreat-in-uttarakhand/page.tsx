import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/retreats/best-retreat-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Retreats in Uttarakhand | Retreats And Treks',
    description:
      'Compare the best retreats in Uttarakhand by purpose, budget, location, and style — yoga, wellness, weekend resets, luxury escapes, and Himalayan healing.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: '10 Best Retreats in Uttarakhand (2026) — Yoga, Luxury & Weekend Picks',
      description:
        'Compare the best retreats in Uttarakhand by purpose, budget, location, season, retreat style, and accessibility.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('10 Best Retreats in Uttarakhand (2026) — Yoga, Luxury & Weekend Picks'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is the best yoga retreat in Uttarakhand?',
    answer:
      'Rishikesh is the best location for a yoga retreat in Uttarakhand. It offers the deepest instructor pool, the widest range of yoga styles (Hatha, Vinyasa, Ashtanga, Yin), riverside practice settings along the Ganges, and year-round availability. For a quieter mountain alternative, Sankri and Munsiyari offer yoga programs at higher altitude with smaller groups and forest immersion.',
  },
  {
    question: 'What is the best retreat near Delhi?',
    answer:
      'Chakrata is the best retreat destination near Delhi — six hours by road, no flight required. It offers weekend-friendly wellness stays with yoga, meditation, forest walks, and Himalayan stillness at 2,200 metres. Rishikesh is also reachable in five to six hours and offers a wider range of programs. For a two-day escape, Chakrata is the most practical option. For a deeper program, choose Rishikesh.',
  },
  {
    question: 'Is Munsiyari better than Rishikesh for a retreat?',
    answer:
      'They serve different needs. Munsiyari is better for seclusion, alpine views, and premium stillness — it sits at 2,200 metres facing the Panchachuli peaks and receives very few visitors. Rishikesh is better for structured yoga training, instructor access, and spiritual heritage. Choose Munsiyari for luxury and solitude. Choose Rishikesh for depth and technique.',
  },
  {
    question: 'Which retreat is best in summer?',
    answer:
      'Munsiyari and Sankri are the best summer retreat destinations. Both sit above 2,000 metres where temperatures stay between 15 and 25 degrees while the plains exceed 40. Green forests, cool air, and snow-peak views make summer the ideal season for mountain wellness. Rishikesh is warm in summer but still operational with riverside programs.',
  },
  {
    question: 'Are retreats in Uttarakhand beginner-friendly?',
    answer:
      'Yes. Most retreats in Uttarakhand are designed for beginners and do not require prior yoga or meditation experience. Guided programs include foundational sessions, personal instruction, and progressive difficulty. Chakrata and Rishikesh are the most beginner-friendly locations — accessible, well-supported, and geared toward first-time participants.',
  },
  {
    question: 'How many days are ideal for a Himalayan retreat?',
    answer:
      'Two to three days works for a weekend reset — enough for a few yoga sessions, guided meditation, and mountain stillness. Five to seven days is ideal for a meaningful transformation — deeper practice, accumulated rest, and real detachment from routine. For immersive programs (teacher training, silent retreats), ten days or more is standard. Choose duration based on objective: reset, restore, or transform.',
  },
];

export default function BestRetreatInUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Best Retreat in Uttarakhand', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Retreats in Uttarakhand',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: 5,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Yoga Retreats in Rishikesh',
        url: buildCanonicalUrl('/retreats/yoga-retreat-rishikesh'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Meditation Retreats in Rishikesh',
        url: buildCanonicalUrl('/retreats/meditation-retreat-rishikesh'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Luxury Himalayan Retreats',
        url: buildCanonicalUrl('/retreats/luxury-himalayan-retreats'),
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Weekend Himalayan Retreats',
        url: buildCanonicalUrl('/retreats/weekend-himalayan-retreats'),
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Retreats Near Delhi',
        url: buildCanonicalUrl('/retreats/retreats-near-delhi'),
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '10 Best Retreats in Uttarakhand (2026 Guide)',
    description:
      'Compare the best retreats in Uttarakhand by purpose, budget, location, season, retreat style, and accessibility across Rishikesh, Munsiyari, and Chakrata.',
    url: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Retreats And Treks',
    },
    about: {
      '@type': 'Thing',
      name: 'Himalayan wellness retreats in Uttarakhand',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2'],
    },
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <AutoArticleSchema
        title="10 Best Retreats in Uttarakhand (2026 Guide)"
        description="Looking for the best retreat in Uttarakhand? Compare yoga retreats in Rishikesh, luxury escapes in Munsiyari, weekend resets near Delhi and seasonal Himalayan wellness programs."
        path={PATH}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          breadcrumbSchema,
          faqSchema,
          itemListSchema,
          webPageSchema,
        ]) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Best Retreat in Uttarakhand' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <style>{`
          .bru-hero {
            position:relative;
            width:100vw;
            margin-left:calc(-50vw + 50%);
            overflow:hidden;
            background:
              radial-gradient(circle at 12% 18%, rgba(217,180,111,0.18), transparent 28%),
              radial-gradient(circle at 86% 16%, rgba(15,118,110,0.18), transparent 30%),
              linear-gradient(135deg, #fbfaf5 0%, #f4f7f1 48%, #102019 48%, #102019 100%);
            padding:6rem 0 5rem;
            border-bottom:1px solid rgba(15,118,110,0.14);
          }
          .bru-hero::before {
            content:'';
            position:absolute;
            inset:auto 0 0;
            height:180px;
            background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 180' preserveAspectRatio='none'%3E%3Cpath d='M0,180 L0,118 L120,72 L240,102 L360,46 L480,90 L600,30 L720,76 L840,42 L960,86 L1080,50 L1200,96 L1320,62 L1440,108 L1440,180 Z' fill='%230f766e' fill-opacity='0.06'/%3E%3C/svg%3E");
            background-size:100% 100%;
            pointer-events:none;
          }
          .bru-hero-inner {
            position:relative;
            z-index:1;
            max-width:76rem;
            margin:0 auto;
            padding:0 2rem;
            display:grid;
            grid-template-columns:1.08fr 0.92fr;
            gap:3rem;
            align-items:center;
          }
          .bru-hero-copycol {
            max-width:46rem;
          }
          .bru-eyebrow {
            display:flex;
            align-items:center;
            gap:0.75rem;
            margin-bottom:1.35rem;
          }
          .bru-eyebrow-line {
            width:34px;
            height:1px;
            background:#d9b46f;
            flex-shrink:0;
          }
          .bru-eyebrow-text {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.72rem;
            letter-spacing:0.24em;
            text-transform:uppercase;
            font-weight:800;
            color:#102019;
          }
          .bru-h1 {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(2.6rem,6vw,5.7rem);
            font-weight:230;
            letter-spacing:-0.07em;
            line-height:0.95;
            color:#101010;
            margin:0 0 1.4rem;
            text-wrap:balance;
          }
          .bru-h1 em {
            font-style:normal;
            color:#0f766e;
          }
          .bru-lead {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(1rem,1.35vw,1.15rem);
            font-weight:300;
            line-height:1.85;
            color:#4b5563;
            margin:0 0 1rem;
            max-width:44rem;
          }
          .bru-hero-actions {
            display:flex;
            flex-wrap:wrap;
            gap:0.8rem;
            margin-top:2rem;
          }
          .bru-hero-btn {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            min-height:46px;
            padding:0.82rem 1.15rem;
            border-radius:999px;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.84rem;
            font-weight:850;
            text-decoration:none;
            transition:transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
          }
          .bru-hero-btn:hover {
            transform:translateY(-2px);
          }
          .bru-hero-btn-primary {
            background:#102019;
            color:#fff;
          }
          .bru-hero-btn-secondary {
            background:rgba(255,255,255,0.68);
            color:#111;
            border:1px solid rgba(16,32,25,0.14);
            backdrop-filter:blur(10px);
          }
          .bru-tags {
            display:flex;
            flex-wrap:wrap;
            gap:0.5rem;
            margin-top:1.6rem;
          }
          .bru-tag {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.68rem;
            font-weight:750;
            letter-spacing:0.06em;
            padding:0.36rem 0.72rem;
            border-radius:999px;
            background:rgba(15,118,110,0.08);
            color:#374151;
            border:1px solid rgba(15,118,110,0.14);
          }
          .bru-finder-card {
            position:relative;
            border-radius:34px;
            padding:1.2rem;
            background:rgba(255,255,255,0.1);
            border:1px solid rgba(255,255,255,0.16);
            box-shadow:0 30px 100px rgba(0,0,0,0.24);
            backdrop-filter:blur(16px);
            color:#fff;
          }
          .bru-finder-card::before {
            content:'';
            position:absolute;
            inset:1rem;
            border-radius:26px;
            border:1px solid rgba(217,180,111,0.22);
            pointer-events:none;
          }
          .bru-finder-top {
            position:relative;
            z-index:1;
            padding:1.2rem 1.2rem 0.9rem;
          }
          .bru-finder-kicker {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.68rem;
            letter-spacing:0.18em;
            text-transform:uppercase;
            font-weight:850;
            color:#d9b46f;
            margin:0 0 0.7rem;
          }
          .bru-finder-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(1.45rem,2.5vw,2.05rem);
            line-height:1.08;
            letter-spacing:-0.045em;
            font-weight:450;
            color:#fff;
            margin:0;
          }
          .bru-finder-grid {
            position:relative;
            z-index:1;
            display:grid;
            grid-template-columns:repeat(2,minmax(0,1fr));
            gap:0.75rem;
            padding:0.8rem;
          }
          .bru-finder-option {
            min-height:132px;
            border-radius:22px;
            padding:1rem;
            background:rgba(255,255,255,0.08);
            border:1px solid rgba(255,255,255,0.12);
            display:flex;
            flex-direction:column;
            justify-content:space-between;
          }
          .bru-finder-option strong {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.98rem;
            letter-spacing:-0.03em;
            line-height:1.15;
            color:#fff;
          }
          .bru-finder-option span {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.74rem;
            line-height:1.5;
            color:rgba(255,255,255,0.64);
            margin-top:0.55rem;
          }
          .bru-finder-option em {
            font-style:normal;
            width:max-content;
            border-radius:999px;
            padding:0.28rem 0.55rem;
            background:#d9b46f;
            color:#111;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.66rem;
            font-weight:900;
            letter-spacing:0.08em;
            text-transform:uppercase;
          }
          .bru-hero-divider {
            display:none;
          }
          @media(max-width:900px){
            .bru-hero {
              background:
                radial-gradient(circle at 12% 18%, rgba(217,180,111,0.18), transparent 28%),
                linear-gradient(180deg, #fbfaf5 0%, #f4f7f1 58%, #102019 58%, #102019 100%);
            }
            .bru-hero-inner {
              grid-template-columns:1fr;
              gap:2rem;
            }
          }
          @media(max-width:640px){
            .bru-hero { padding:4.5rem 0 3.5rem; }
            .bru-hero-inner { padding:0 1.25rem; }
            .bru-hero-actions { flex-direction:column; align-items:stretch; }
            .bru-hero-btn { width:100%; }
            .bru-finder-grid { grid-template-columns:1fr; }
            .bru-finder-option { min-height:auto; gap:1rem; }
          }
        `}</style>

        <section className="bru-hero">
          <div className="bru-hero-inner">
            <div className="bru-hero-copycol">
              <div className="bru-eyebrow">
                <span className="bru-eyebrow-line" />
                <span className="bru-eyebrow-text">Ranked Guide · 2026</span>
              </div>

              <h1 className="bru-h1">
                Best retreats in Uttarakhand, <em>chosen by purpose.</em>
              </h1>

              <p className="bru-lead">
                Uttarakhand is India&rsquo;s most concentrated mountain wellness region — but the best retreat depends entirely on your goal. A yoga immersion in Rishikesh feels different from alpine seclusion in Munsiyari or a short forest reset in Chakrata.
              </p>

              <p className="bru-lead">
                Use this guide like a retreat finder: compare yoga, meditation, luxury, weekend, near-Delhi, summer and winter options before choosing where to go.
              </p>

              <div className="bru-hero-actions">
                <Link href="/find-your-retreat" className="bru-hero-btn bru-hero-btn-primary">
                  Find my retreat
                </Link>
                <a href="#quick-comparison" className="bru-hero-btn bru-hero-btn-secondary">
                  Compare retreat types
                </a>
              </div>

              <div className="bru-tags">
                {['Yoga', 'Meditation', 'Luxury', 'Weekend Escapes', 'Near Delhi', 'Summer', 'Winter'].map((tag) => (
                  <span key={tag} className="bru-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="bru-finder-card" aria-label="Retreat finder highlights">
              <div className="bru-finder-top">
                <p className="bru-finder-kicker">Choose your retreat lane</p>
                <p className="bru-finder-title">One state. Five very different retreat moods.</p>
              </div>

              <div className="bru-finder-grid">
                <div className="bru-finder-option">
                  <div>
                    <strong>Yoga depth</strong>
                    <span>Structured practice, teachers, daily rhythm.</span>
                  </div>
                  <em>Rishikesh</em>
                </div>

                <div className="bru-finder-option">
                  <div>
                    <strong>Alpine silence</strong>
                    <span>Big views, privacy, fewer visitors.</span>
                  </div>
                  <em>Munsiyari</em>
                </div>

                <div className="bru-finder-option">
                  <div>
                    <strong>Weekend reset</strong>
                    <span>Short travel, forest air, simple logistics.</span>
                  </div>
                  <em>Chakrata</em>
                </div>

                <div className="bru-finder-option">
                  <div>
                    <strong>Summer cooling</strong>
                    <span>High-altitude air when plains are hot.</span>
                  </div>
                  <em>Sankri</em>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Retreat"
          subtext="Not sure which retreat suits you? A mountain planner can help."
          vertical="retreat"
          category="apex"
          sourcePath={PATH}
        />

        {/* ── QUICK COMPARISON ──────────────────────────────────────── */}
        <style>{`
          .bru-cmp {
            width:100vw;
            margin-left:calc(-50vw + 50%);
            background:
              linear-gradient(180deg, #102019 0%, #163026 100%);
            padding:5rem 0;
            color:#fff;
            overflow:hidden;
          }
          .bru-cmp-inner {
            max-width:76rem;
            margin:0 auto;
            padding:0 2rem;
          }
          .bru-cmp-head {
            display:grid;
            grid-template-columns:0.86fr 1.14fr;
            gap:2rem;
            align-items:end;
            margin-bottom:2rem;
          }
          .bru-cmp .bru-eyebrow-text {
            color:rgba(255,255,255,0.78);
          }
          .bru-cmp-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(2rem,4.8vw,4rem);
            font-weight:230;
            letter-spacing:-0.065em;
            line-height:0.98;
            color:#fff;
            margin:0;
            text-wrap:balance;
          }
          .bru-cmp-title span {
            color:#d9b46f;
          }
          .bru-cmp-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.98rem;
            font-weight:300;
            line-height:1.85;
            color:rgba(255,255,255,0.68);
            margin:0;
            max-width:44rem;
          }
          .bru-selector-grid {
            display:grid;
            grid-template-columns:repeat(6,minmax(0,1fr));
            gap:1rem;
          }
          .bru-selector-card {
            position:relative;
            overflow:hidden;
            min-height:235px;
            border-radius:30px;
            border:1px solid rgba(255,255,255,0.13);
            background:linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.045));
            padding:1.25rem;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            transition:transform 0.22s ease, background 0.22s ease, border-color 0.22s ease;
            box-shadow:0 18px 60px rgba(0,0,0,0.16);
          }
          .bru-selector-card:nth-child(1),
          .bru-selector-card:nth-child(2),
          .bru-selector-card:nth-child(3) {
            grid-column:span 2;
          }
          .bru-selector-card:nth-child(4),
          .bru-selector-card:nth-child(5),
          .bru-selector-card:nth-child(6),
          .bru-selector-card:nth-child(7) {
            grid-column:span 3;
          }
          .bru-selector-card::before {
            content:'';
            position:absolute;
            inset:0;
            background:
              radial-gradient(circle at top left, rgba(217,180,111,0.18), transparent 34%),
              linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0));
            pointer-events:none;
          }
          .bru-selector-card:hover {
            transform:translateY(-5px);
            background:rgba(255,255,255,0.1);
            border-color:rgba(217,180,111,0.36);
          }
          .bru-selector-card > * {
            position:relative;
            z-index:1;
          }
          .bru-selector-rank {
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:0.75rem;
            margin-bottom:1.45rem;
          }
          .bru-selector-rank span {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.68rem;
            letter-spacing:0.18em;
            text-transform:uppercase;
            color:rgba(255,255,255,0.5);
            font-weight:850;
            line-height:1.35;
          }
          .bru-selector-rank em {
            font-style:normal;
            width:34px;
            height:34px;
            display:flex;
            align-items:center;
            justify-content:center;
            border-radius:50%;
            background:#d9b46f;
            color:#111;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.76rem;
            font-weight:900;
          }
          .bru-selector-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(1.2rem,1.8vw,1.7rem);
            line-height:1.02;
            letter-spacing:-0.055em;
            color:#fff;
            font-weight:650;
            margin:0 0 0.85rem;
            max-width:13rem;
          }
          .bru-selector-place {
            display:inline-flex;
            width:max-content;
            max-width:100%;
            border-radius:999px;
            padding:0.38rem 0.72rem;
            background:rgba(217,180,111,0.14);
            border:1px solid rgba(217,180,111,0.3);
            color:#d9b46f;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.68rem;
            font-weight:850;
            letter-spacing:0.08em;
            text-transform:uppercase;
            margin-bottom:0.9rem;
          }
          .bru-selector-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.84rem;
            line-height:1.68;
            color:rgba(255,255,255,0.68);
            font-weight:300;
            margin:0;
            max-width:20rem;
          }
          .bru-selector-link {
            display:inline-flex;
            align-items:center;
            width:max-content;
            margin-top:1rem;
            color:#fff;
            text-decoration:none;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.74rem;
            font-weight:850;
            letter-spacing:0.08em;
            text-transform:uppercase;
          }
          .bru-cmp-note {
            margin-top:1.25rem;
            border-radius:24px;
            border:1px solid rgba(255,255,255,0.12);
            background:rgba(255,255,255,0.06);
            padding:1rem 1.1rem;
            color:rgba(255,255,255,0.68);
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.86rem;
            line-height:1.7;
            font-weight:300;
          }
          .bru-cmp-note strong {
            color:#d9b46f;
            font-weight:850;
          }
          @media(max-width:1100px){
            .bru-selector-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
            .bru-selector-card,
            .bru-selector-card:nth-child(1),
            .bru-selector-card:nth-child(2),
            .bru-selector-card:nth-child(3),
            .bru-selector-card:nth-child(4),
            .bru-selector-card:nth-child(5),
            .bru-selector-card:nth-child(6),
            .bru-selector-card:nth-child(7) {
              grid-column:auto;
              min-height:220px;
            }
          }
          @media(max-width:760px){
            .bru-cmp { padding:4rem 0; }
            .bru-cmp-inner { padding:0 1.25rem; }
            .bru-cmp-head { grid-template-columns:1fr; align-items:start; }
            .bru-selector-grid { grid-template-columns:1fr; }
            .bru-selector-card { min-height:auto; }
          }
        `}</style>

        <section id="quick-comparison" className="bru-cmp scroll-fade" style={{ marginBottom: 0 }}>
          <div className="bru-cmp-inner">
            <div className="bru-cmp-head">
              <div>
                <div className="bru-eyebrow">
                  <span className="bru-eyebrow-line" />
                  <span className="bru-eyebrow-text">At a Glance</span>
                </div>

                <h2 className="bru-cmp-title">
                  Pick the retreat by <span>what you need most.</span>
                </h2>
              </div>

              <p className="bru-cmp-copy">
                These categories are not interchangeable. Rishikesh is strongest for structured yoga, Munsiyari for alpine seclusion, Chakrata for short resets, and Sankri for high-altitude summer calm.
              </p>
            </div>

            <div className="bru-selector-grid">
              {[
                {
                  rank: '01',
                  type: 'Yoga depth',
                  title: 'Best Yoga Retreat',
                  place: 'Rishikesh',
                  copy: 'Instructor depth, daily structure, Ganges-side practice, and year-round yoga culture.',
                  href: '/retreats/yoga-retreat-rishikesh',
                },
                {
                  rank: '02',
                  type: 'Inner stillness',
                  title: 'Best Meditation Retreat',
                  place: 'Rishikesh / Munsiyari',
                  copy: 'Choose Rishikesh for guided programs or Munsiyari for altitude silence and wide horizons.',
                  href: '/retreats/meditation-retreat-uttarakhand',
                },
                {
                  rank: '03',
                  type: 'Privacy',
                  title: 'Best Luxury Retreat',
                  place: 'Munsiyari',
                  copy: 'Panchachuli views, fewer visitors, premium stays, and a slower alpine retreat rhythm.',
                  href: '/retreats/luxury-himalayan-retreats',
                },
                {
                  rank: '04',
                  type: 'Two-day reset',
                  title: 'Best Weekend Retreat',
                  place: 'Chakrata',
                  copy: 'Six-hour road access, deodar forest, cool altitude, and simple weekend logistics.',
                  href: '/retreats/weekend-himalayan-retreats',
                },
                {
                  rank: '05',
                  type: 'Access',
                  title: 'Best Near Delhi',
                  place: 'Chakrata / Rishikesh',
                  copy: 'Choose Chakrata for quiet forest time or Rishikesh for more retreat variety.',
                  href: '/retreats/retreats-near-delhi',
                },
                {
                  rank: '06',
                  type: 'Heat escape',
                  title: 'Best Summer Retreat',
                  place: 'Munsiyari / Sankri',
                  copy: 'High-altitude air, green valleys, snow-peak views, and cooler mountain days.',
                  href: '/retreats/summer-himalayan-retreats',
                },
                {
                  rank: '07',
                  type: 'Clear mornings',
                  title: 'Best Winter Retreat',
                  place: 'Rishikesh',
                  copy: 'Cool mornings, clearer skies, easier access, and reliable winter practice conditions.',
                  href: '/retreats/winter-himalayan-retreats',
                },
              ].map((item) => (
                <Link key={item.rank} href={item.href} className="bru-selector-card">
                  <div>
                    <div className="bru-selector-rank">
                      <span>{item.type}</span>
                      <em>{item.rank}</em>
                    </div>
                    <h3 className="bru-selector-title">{item.title}</h3>
                    <div className="bru-selector-place">{item.place}</div>
                    <p className="bru-selector-copy">{item.copy}</p>
                  </div>
                  <span className="bru-selector-link">Explore →</span>
                </Link>
              ))}
            </div>

            <div className="bru-cmp-note">
              <strong>Fast rule:</strong> choose Rishikesh for technique, Munsiyari for solitude, Chakrata for a short reset, and Sankri when summer heat is the problem.
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Speak With a Mountain Planner"
          subtext="Ready to start planning? Share your preferences and dates."
          vertical="retreat"
          category="apex"
          sourcePath={PATH}
        />

        {/* ── YOGA ──────────────────────────────────────────────────── */}
        <style>{`
          .bru-yoga {
            width:100vw;
            margin-left:calc(-50vw + 50%);
            background:
              radial-gradient(circle at top left, rgba(217,180,111,0.16), transparent 30%),
              linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
            padding:5rem 0;
            overflow:hidden;
          }
          .bru-yoga-inner {
            max-width:76rem;
            margin:0 auto;
            padding:0 2rem;
          }
          .bru-winner-card {
            display:grid;
            grid-template-columns:0.74fr 1.26fr;
            gap:0;
            border-radius:38px;
            overflow:hidden;
            background:#fff;
            border:1px solid rgba(17,24,39,0.08);
            box-shadow:0 30px 100px rgba(17,24,39,0.1);
          }
          .bru-winner-rank {
            position:relative;
            min-height:520px;
            padding:2rem;
            background:
              linear-gradient(180deg, rgba(16,32,25,0.24), rgba(16,32,25,0.72)),
              url('/Images/retreats/yoga/yoga-balance-pose-outdoors.webp');
            background-size:cover;
            background-position:center;
            color:#fff;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
          }
          .bru-winner-rank::after {
            content:'';
            position:absolute;
            inset:0;
            background:radial-gradient(circle at top left, rgba(217,180,111,0.22), transparent 34%);
            pointer-events:none;
          }
          .bru-winner-rank > * {
            position:relative;
            z-index:1;
          }
          .bru-rank-number {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(5rem,11vw,9rem);
            line-height:0.8;
            letter-spacing:-0.08em;
            font-weight:220;
            color:#d9b46f;
            margin:0;
          }
          .bru-rank-label {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.72rem;
            letter-spacing:0.2em;
            text-transform:uppercase;
            font-weight:900;
            color:rgba(255,255,255,0.76);
            margin:0;
          }
          .bru-winner-location {
            display:inline-flex;
            width:max-content;
            border-radius:999px;
            padding:0.48rem 0.78rem;
            background:rgba(255,255,255,0.1);
            border:1px solid rgba(255,255,255,0.2);
            backdrop-filter:blur(10px);
            color:#fff;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.72rem;
            font-weight:850;
            letter-spacing:0.12em;
            text-transform:uppercase;
          }
          .bru-winner-body {
            padding:2.4rem;
          }
          .bru-winner-eyebrow {
            display:flex;
            align-items:center;
            gap:0.75rem;
            margin-bottom:1.15rem;
          }
          .bru-winner-eyebrow-line {
            width:34px;
            height:1px;
            background:#d9b46f;
          }
          .bru-winner-eyebrow-text {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.72rem;
            letter-spacing:0.22em;
            text-transform:uppercase;
            font-weight:850;
            color:#374151;
          }
          .bru-winner-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(2rem,4.4vw,4rem);
            font-weight:230;
            letter-spacing:-0.065em;
            line-height:0.98;
            color:#111;
            margin:0 0 1rem;
            text-wrap:balance;
          }
          .bru-winner-title span {
            color:#0f766e;
          }
          .bru-winner-subtitle {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.78rem;
            font-weight:850;
            letter-spacing:0.12em;
            color:#8a6a2f;
            margin:0 0 1.35rem;
            text-transform:uppercase;
          }
          .bru-winner-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.92rem;
            font-weight:300;
            line-height:1.85;
            color:#4b5563;
            margin:0 0 1rem;
          }
          .bru-winner-copy a {
            color:#0f766e;
            font-weight:700;
            text-decoration:none;
          }
          .bru-winner-copy a:hover {
            text-decoration:underline;
          }
          .bru-yoga-proof-grid {
            display:grid;
            grid-template-columns:repeat(3,minmax(0,1fr));
            gap:0.75rem;
            margin:1.4rem 0 1.5rem;
          }
          .bru-yoga-proof {
            border-radius:20px;
            border:1px solid rgba(17,24,39,0.08);
            background:#f7f9f7;
            padding:0.95rem;
          }
          .bru-yoga-proof strong {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.78rem;
            letter-spacing:0.08em;
            text-transform:uppercase;
            color:#111;
            margin-bottom:0.35rem;
          }
          .bru-yoga-proof span {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.78rem;
            line-height:1.55;
            color:#64748b;
          }
          .bru-winner-actions {
            display:flex;
            flex-wrap:wrap;
            gap:0.75rem;
            margin-top:1.5rem;
          }
          .bru-winner-btn {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            min-height:44px;
            padding:0.78rem 1.05rem;
            border-radius:999px;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.82rem;
            font-weight:850;
            text-decoration:none;
            transition:transform 0.2s ease, background 0.2s ease;
          }
          .bru-winner-btn:hover {
            transform:translateY(-2px);
          }
          .bru-winner-btn-primary {
            background:#102019;
            color:#fff;
          }
          .bru-winner-btn-secondary {
            background:#f3f4f6;
            color:#111;
            border:1px solid rgba(17,24,39,0.08);
          }
          @media(max-width:860px){
            .bru-yoga-inner { padding:0 1.25rem; }
            .bru-winner-card { grid-template-columns:1fr; }
            .bru-winner-rank { min-height:320px; }
            .bru-winner-body { padding:1.5rem; }
            .bru-yoga-proof-grid { grid-template-columns:1fr; }
            .bru-winner-actions { flex-direction:column; align-items:stretch; }
            .bru-winner-btn { width:100%; }
          }
        `}</style>

        <section className="bru-yoga scroll-fade">
          <div className="bru-yoga-inner">
            <div className="bru-winner-card">
              <div className="bru-winner-rank">
                <div>
                  <p className="bru-rank-label">Ranked winner</p>
                  <p className="bru-rank-number">01</p>
                </div>
                <div className="bru-winner-location">Rishikesh</div>
              </div>

              <div className="bru-winner-body">
                <div className="bru-winner-eyebrow">
                  <span className="bru-winner-eyebrow-line" />
                  <span className="bru-winner-eyebrow-text">Best Yoga Retreat</span>
                </div>

                <h2 className="bru-winner-title">
                  Best Yoga Retreat — <span>Rishikesh</span>
                </h2>

                <p className="bru-winner-subtitle">Why Rishikesh leads for yoga</p>

                <p className="bru-winner-copy">
                  Rishikesh is the undisputed centre of yoga retreat culture in northern India. The concentration of certified instructors, the range of styles (Hatha, Vinyasa, Ashtanga, Yin, Kundalini), and the Ganges-side practice settings make it the default choice for anyone whose primary retreat goal is yoga. Our <Link href="/retreats/yoga-retreat-rishikesh">yoga retreat in Rishikesh</Link> guide covers structure, scheduling, and instructor profiles in detail.
                </p>

                <div className="bru-yoga-proof-grid">
                  <div className="bru-yoga-proof">
                    <strong>Best for</strong>
                    <span>Structured daily yoga, technique, teachers, and practice rhythm.</span>
                  </div>
                  <div className="bru-yoga-proof">
                    <strong>Peak feel</strong>
                    <span>Spring and autumn for clear weather, moderate temperature, and clean river energy.</span>
                  </div>
                  <div className="bru-yoga-proof">
                    <strong>Alternative</strong>
                    <span>Chakrata or Sankri if you want yoga with forest altitude instead of river-valley energy.</span>
                  </div>
                </div>

                <p className="bru-winner-copy">
                  Rishikesh yoga programs run year-round. Winter mornings are cool and focused. Monsoon (July to September) limits some outdoor sessions but deepens the contemplative atmosphere. Spring and autumn are peak seasons — clear weather, moderate temperatures, and the river at its cleanest.
                </p>

                <p className="bru-winner-copy">
                  For yoga practice combined with mountain altitude and forest immersion rather than river-valley energy, see the broader <Link href="/retreats/yoga-retreat-uttarakhand">yoga retreat in Uttarakhand</Link> overview, which includes Chakrata and Sankri options alongside Rishikesh.
                </p>

                <div className="bru-winner-actions">
                  <Link href="/retreats/yoga-retreat-rishikesh" className="bru-winner-btn bru-winner-btn-primary">
                    View Rishikesh yoga retreat
                  </Link>
                  <Link href="/retreats/yoga-retreat-uttarakhand" className="bru-winner-btn bru-winner-btn-secondary">
                    Compare yoga retreats
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MEDITATION ────────────────────────────────────────────── */}
        <style>{`
          .bru-med {
            width:100vw;
            margin-left:calc(-50vw + 50%);
            background:#ffffff;
            padding:5rem 0;
            overflow:hidden;
          }
          .bru-med-inner {
            max-width:76rem;
            margin:0 auto;
            padding:0 2rem;
          }
          .bru-med-head {
            max-width:58rem;
            margin-bottom:2rem;
          }
          .bru-med-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(2rem,4.6vw,4.2rem);
            font-weight:230;
            letter-spacing:-0.065em;
            line-height:0.98;
            color:#111;
            margin:0 0 1rem;
            text-wrap:balance;
          }
          .bru-med-title span {
            color:#0f766e;
          }
          .bru-med-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.96rem;
            font-weight:300;
            line-height:1.85;
            color:#4b5563;
            margin:0;
            max-width:48rem;
          }
          .bru-med-choice-grid {
            display:grid;
            grid-template-columns:repeat(2,minmax(0,1fr));
            gap:1rem;
          }
          .bru-med-choice {
            position:relative;
            overflow:hidden;
            border-radius:34px;
            min-height:430px;
            padding:1.6rem;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            border:1px solid rgba(17,24,39,0.08);
            box-shadow:0 28px 90px rgba(17,24,39,0.09);
          }
          .bru-med-choice-river {
            background:
              linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.98)),
              radial-gradient(circle at top left, rgba(15,118,110,0.16), transparent 34%);
          }
          .bru-med-choice-alpine {
            background:
              linear-gradient(180deg, rgba(16,32,25,0.86), rgba(16,32,25,0.96)),
              radial-gradient(circle at top right, rgba(217,180,111,0.22), transparent 34%);
            color:#fff;
          }
          .bru-med-choice::before {
            content:'';
            position:absolute;
            inset:auto 1.6rem 1.6rem auto;
            width:120px;
            height:120px;
            border-radius:50%;
            background:rgba(15,118,110,0.08);
            pointer-events:none;
          }
          .bru-med-choice-alpine::before {
            background:rgba(217,180,111,0.12);
          }
          .bru-med-choice > * {
            position:relative;
            z-index:1;
          }
          .bru-med-choice-kicker {
            display:flex;
            justify-content:space-between;
            gap:1rem;
            align-items:center;
            margin-bottom:1.2rem;
          }
          .bru-med-choice-kicker span {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.68rem;
            letter-spacing:0.18em;
            text-transform:uppercase;
            font-weight:900;
            color:#64748b;
          }
          .bru-med-choice-alpine .bru-med-choice-kicker span {
            color:rgba(255,255,255,0.6);
          }
          .bru-med-choice-kicker em {
            font-style:normal;
            border-radius:999px;
            padding:0.36rem 0.68rem;
            background:#d9b46f;
            color:#111;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.68rem;
            letter-spacing:0.08em;
            text-transform:uppercase;
            font-weight:900;
            white-space:nowrap;
          }
          .bru-med-choice-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(1.6rem,3vw,2.7rem);
            font-weight:260;
            letter-spacing:-0.06em;
            line-height:1;
            color:#111;
            margin:0 0 1rem;
          }
          .bru-med-choice-alpine .bru-med-choice-title {
            color:#fff;
          }
          .bru-med-choice-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            font-weight:300;
            line-height:1.8;
            color:#4b5563;
            margin:0 0 1rem;
          }
          .bru-med-choice-alpine .bru-med-choice-copy {
            color:rgba(255,255,255,0.72);
          }
          .bru-med-choice-copy a {
            color:#0f766e;
            font-weight:750;
            text-decoration:none;
          }
          .bru-med-choice-alpine .bru-med-choice-copy a {
            color:#d9b46f;
          }
          .bru-med-choice-copy a:hover {
            text-decoration:underline;
          }
          .bru-med-list {
            display:grid;
            gap:0.55rem;
            margin:1.2rem 0 0;
          }
          .bru-med-list span {
            display:flex;
            align-items:center;
            gap:0.55rem;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.78rem;
            line-height:1.45;
            color:#334155;
            font-weight:650;
          }
          .bru-med-choice-alpine .bru-med-list span {
            color:rgba(255,255,255,0.76);
          }
          .bru-med-list span::before {
            content:'';
            width:7px;
            height:7px;
            border-radius:50%;
            background:#0f766e;
            flex-shrink:0;
          }
          .bru-med-choice-alpine .bru-med-list span::before {
            background:#d9b46f;
          }
          .bru-med-actions {
            display:flex;
            flex-wrap:wrap;
            gap:0.75rem;
            margin-top:1.4rem;
          }
          .bru-med-btn {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            min-height:42px;
            padding:0.74rem 1rem;
            border-radius:999px;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.8rem;
            font-weight:850;
            text-decoration:none;
            transition:transform 0.2s ease, background 0.2s ease;
          }
          .bru-med-btn:hover {
            transform:translateY(-2px);
          }
          .bru-med-btn-light {
            background:#102019;
            color:#fff;
          }
          .bru-med-btn-dark {
            background:#d9b46f;
            color:#111;
          }
          .bru-med-bottom {
            margin-top:1rem;
            border-radius:24px;
            border:1px solid rgba(17,24,39,0.08);
            background:#f7f9f7;
            padding:1.1rem;
          }
          .bru-med-bottom p {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.88rem;
            font-weight:300;
            line-height:1.75;
            color:#4b5563;
            margin:0;
          }
          .bru-med-bottom a {
            color:#0f766e;
            font-weight:750;
            text-decoration:none;
          }
          .bru-med-bottom a:hover {
            text-decoration:underline;
          }
          @media(max-width:860px){
            .bru-med-inner { padding:0 1.25rem; }
            .bru-med-choice-grid { grid-template-columns:1fr; }
            .bru-med-choice { min-height:auto; }
            .bru-med-actions { flex-direction:column; align-items:stretch; }
            .bru-med-btn { width:100%; }
          }
        `}</style>

        <section className="bru-med scroll-fade">
          <div className="bru-med-inner">
            <div className="bru-med-head">
              <div className="bru-winner-eyebrow">
                <span className="bru-winner-eyebrow-line" />
                <span className="bru-winner-eyebrow-text">Best Meditation Retreat</span>
              </div>

              <h2 className="bru-med-title">
                Choose your silence: <span>river or alpine.</span>
              </h2>

              <p className="bru-med-copy">
                Meditation retreats split into two distinct experiences in Uttarakhand. Rishikesh gives structure, teachers, and group support. Munsiyari gives altitude, seclusion, and landscape-driven stillness.
              </p>
            </div>

            <div className="bru-med-choice-grid">
              <div className="bru-med-choice bru-med-choice-river">
                <div>
                  <div className="bru-med-choice-kicker">
                    <span>River stillness</span>
                    <em>Rishikesh</em>
                  </div>

                  <h3 className="bru-med-choice-title">Guided practice with structure.</h3>

                  <p className="bru-med-choice-copy">
                    <Link href="/retreats/rishikesh">Rishikesh</Link> offers structured programs: guided Vipassana, mindfulness courses, silent retreats with group support, and ashram-based practice rooted in decades of lineage. The <Link href="/retreats/meditation-retreat-rishikesh">meditation retreat in Rishikesh</Link> guide covers these programs in detail.
                  </p>

                  <div className="bru-med-list">
                    <span>Best for first-timers who want guidance</span>
                    <span>Best for lineage, teachers, and daily structure</span>
                    <span>Best when you want support around silence</span>
                  </div>
                </div>

                <div className="bru-med-actions">
                  <Link href="/retreats/meditation-retreat-rishikesh" className="bru-med-btn bru-med-btn-light">
                    View Rishikesh meditation
                  </Link>
                </div>
              </div>

              <div className="bru-med-choice bru-med-choice-alpine">
                <div>
                  <div className="bru-med-choice-kicker">
                    <span>Alpine silence</span>
                    <em>Munsiyari</em>
                  </div>

                  <h3 className="bru-med-choice-title">Stillness without performance.</h3>

                  <p className="bru-med-choice-copy">
                    <Link href="/retreats/munsiyari">Munsiyari</Link> offers something different — altitude silence. At 2,200 metres facing the Panchachuli massif, Munsiyari provides natural stillness that no guided session can replicate. Fewer visitors, thinner air, wider horizons. Meditation here is landscape-driven rather than instructor-driven.
                  </p>

                  <div className="bru-med-list">
                    <span>Best for experienced practitioners</span>
                    <span>Best for solitude, views, and fewer visitors</span>
                    <span>Best when landscape itself is the teacher</span>
                  </div>
                </div>

                <div className="bru-med-actions">
                  <Link href="/retreats/munsiyari" className="bru-med-btn bru-med-btn-dark">
                    Explore Munsiyari
                  </Link>
                </div>
              </div>
            </div>

            <div className="bru-med-bottom">
              <p>
                For a complete view across all meditation-friendly locations, see <Link href="/retreats/meditation-retreat-uttarakhand">meditation retreats in Uttarakhand</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* ── LUXURY ────────────────────────────────────────────────── */}
        <style>{`
          .bru-lux {
            width:100vw;
            margin-left:calc(-50vw + 50%);
            background:#102019;
            padding:5.5rem 0;
            overflow:hidden;
            color:#fff;
          }
          .bru-lux-inner {
            max-width:76rem;
            margin:0 auto;
            padding:0 2rem;
          }
          .bru-lux-panel {
            position:relative;
            overflow:hidden;
            border-radius:42px;
            border:1px solid rgba(255,255,255,0.14);
            background:
              radial-gradient(circle at 78% 18%, rgba(217,180,111,0.18), transparent 30%),
              linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.035));
            padding:2rem;
            box-shadow:0 34px 110px rgba(0,0,0,0.28);
          }
          .bru-lux-panel::before {
            content:'';
            position:absolute;
            inset:auto 0 0;
            height:180px;
            background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 180' preserveAspectRatio='none'%3E%3Cpath d='M0,180 L0,112 L110,72 L230,98 L350,38 L480,86 L610,28 L735,74 L860,44 L990,88 L1120,46 L1240,92 L1360,58 L1440,104 L1440,180 Z' fill='%23d9b46f' fill-opacity='0.08'/%3E%3C/svg%3E");
            background-size:100% 100%;
            pointer-events:none;
          }
          .bru-lux-grid {
            position:relative;
            z-index:1;
            display:grid;
            grid-template-columns:1.05fr 0.95fr;
            gap:2rem;
            align-items:center;
          }
          .bru-lux-kicker {
            display:inline-flex;
            width:max-content;
            border-radius:999px;
            padding:0.42rem 0.78rem;
            background:rgba(217,180,111,0.12);
            border:1px solid rgba(217,180,111,0.28);
            color:#d9b46f;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.7rem;
            font-weight:900;
            letter-spacing:0.14em;
            text-transform:uppercase;
            margin-bottom:1.2rem;
          }
          .bru-lux-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(2.4rem,5.6vw,5.4rem);
            font-weight:220;
            letter-spacing:-0.075em;
            line-height:0.92;
            color:#fff;
            margin:0 0 1.2rem;
            text-wrap:balance;
          }
          .bru-lux-title span {
            color:#d9b46f;
          }
          .bru-lux-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.96rem;
            font-weight:300;
            line-height:1.86;
            color:rgba(255,255,255,0.72);
            margin:0 0 1rem;
            max-width:45rem;
          }
          .bru-lux-copy a {
            color:#d9b46f;
            font-weight:800;
            text-decoration:none;
          }
          .bru-lux-copy a:hover {
            text-decoration:underline;
          }
          .bru-lux-actions {
            display:flex;
            flex-wrap:wrap;
            gap:0.75rem;
            margin-top:1.5rem;
          }
          .bru-lux-btn {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            min-height:44px;
            padding:0.78rem 1.05rem;
            border-radius:999px;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.82rem;
            font-weight:900;
            text-decoration:none;
            transition:transform 0.2s ease, background 0.2s ease;
          }
          .bru-lux-btn:hover {
            transform:translateY(-2px);
          }
          .bru-lux-btn-primary {
            background:#d9b46f;
            color:#111;
          }
          .bru-lux-btn-secondary {
            background:rgba(255,255,255,0.08);
            color:#fff;
            border:1px solid rgba(255,255,255,0.14);
          }
          .bru-lux-pillars {
            display:grid;
            grid-template-columns:repeat(2,minmax(0,1fr));
            gap:0.85rem;
          }
          .bru-lux-pillar {
            min-height:160px;
            border-radius:26px;
            border:1px solid rgba(255,255,255,0.12);
            background:rgba(255,255,255,0.07);
            padding:1.15rem;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            backdrop-filter:blur(12px);
          }
          .bru-lux-pillar em {
            font-style:normal;
            display:flex;
            align-items:center;
            justify-content:center;
            width:38px;
            height:38px;
            border-radius:15px;
            background:#d9b46f;
            color:#111;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.78rem;
            font-weight:950;
            margin-bottom:1rem;
          }
          .bru-lux-pillar strong {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:1rem;
            line-height:1.12;
            letter-spacing:-0.035em;
            color:#fff;
            margin-bottom:0.5rem;
          }
          .bru-lux-pillar span {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.78rem;
            line-height:1.58;
            color:rgba(255,255,255,0.62);
          }
          @media(max-width:880px){
            .bru-lux-inner { padding:0 1.25rem; }
            .bru-lux-panel { padding:1.25rem; border-radius:30px; }
            .bru-lux-grid { grid-template-columns:1fr; }
            .bru-lux-pillars { grid-template-columns:1fr; }
            .bru-lux-actions { flex-direction:column; align-items:stretch; }
            .bru-lux-btn { width:100%; }
          }
        `}</style>

        <section className="bru-lux scroll-fade">
          <div className="bru-lux-inner">
            <div className="bru-lux-panel">
              <div className="bru-lux-grid">
                <div>
                  <div className="bru-lux-kicker">Best Luxury Retreat · Munsiyari</div>

                  <h2 className="bru-lux-title">
                    Luxury is not marble. <span>It is space.</span>
                  </h2>

                  <p className="bru-lux-copy">
                    Luxury in the Himalayas is not about marble lobbies — it is about privacy, views, curated programming, and the absence of crowds. Munsiyari leads this category. Its combination of Panchachuli panoramas, limited visitor volume, and premium accommodation creates a retreat experience closer to alpine seclusion than mainstream hospitality.
                  </p>

                  <p className="bru-lux-copy">
                    The <Link href="/retreats/luxury-himalayan-retreats">luxury Himalayan retreats</Link> guide compares premium options across all locations — Munsiyari for alpine exclusivity, Rishikesh for heritage luxury, and Sankri for off-grid wilderness comfort. If your primary criterion is quality of accommodation and curated experience rather than program intensity, start there.
                  </p>

                  <div className="bru-lux-actions">
                    <Link href="/retreats/luxury-himalayan-retreats" className="bru-lux-btn bru-lux-btn-primary">
                      Explore luxury retreats
                    </Link>
                    <Link href="/retreats/munsiyari" className="bru-lux-btn bru-lux-btn-secondary">
                      View Munsiyari retreats
                    </Link>
                  </div>
                </div>

                <div className="bru-lux-pillars">
                  <div className="bru-lux-pillar">
                    <div>
                      <em>01</em>
                      <strong>Privacy</strong>
                      <span>Fewer visitors and more distance from mainstream travel circuits.</span>
                    </div>
                  </div>

                  <div className="bru-lux-pillar">
                    <div>
                      <em>02</em>
                      <strong>Panchachuli views</strong>
                      <span>Alpine scale, long horizons, and a retreat mood shaped by the peaks.</span>
                    </div>
                  </div>

                  <div className="bru-lux-pillar">
                    <div>
                      <em>03</em>
                      <strong>Curated stay</strong>
                      <span>Comfort matters, but the real value is rhythm, silence, and quality of setting.</span>
                    </div>
                  </div>

                  <div className="bru-lux-pillar">
                    <div>
                      <em>04</em>
                      <strong>Low crowd volume</strong>
                      <span>The absence of noise is part of the luxury, not a side benefit.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WEEKEND ───────────────────────────────────────────────── */}
        <style>{`
          .bru-wknd {
            width:100vw;
            margin-left:calc(-50vw + 50%);
            background:
              radial-gradient(circle at top right, rgba(15,118,110,0.12), transparent 30%),
              linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
            padding:5rem 0;
            overflow:hidden;
          }
          .bru-wknd-inner {
            max-width:76rem;
            margin:0 auto;
            padding:0 2rem;
          }
          .bru-wknd-box {
            display:grid;
            grid-template-columns:0.9fr 1.1fr;
            gap:1rem;
            align-items:stretch;
          }
          .bru-wknd-time {
            border-radius:36px;
            background:#102019;
            color:#fff;
            padding:2rem;
            min-height:auto;
            display:flex;
            flex-direction:column;
            justify-content:flex-start;
            position:relative;
            overflow:hidden;
            box-shadow:0 28px 90px rgba(17,24,39,0.14);
          }
          .bru-wknd-time::before {
            content:'';
            position:absolute;
            inset:auto -70px -80px auto;
            width:260px;
            height:260px;
            border-radius:50%;
            background:rgba(217,180,111,0.12);
            pointer-events:none;
          }
          .bru-wknd-time::after {
            content:'';
            position:absolute;
            left:2.2rem;
            top:11.5rem;
            bottom:8.8rem;
            width:1px;
            background:linear-gradient(180deg, rgba(217,180,111,0.7), rgba(217,180,111,0.08));
            pointer-events:none;
          }
          .bru-wknd-kicker {
            position:relative;
            z-index:1;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.72rem;
            letter-spacing:0.2em;
            text-transform:uppercase;
            font-weight:900;
            color:#d9b46f;
            margin:0 0 1rem;
          }
          .bru-wknd-big {
            position:relative;
            z-index:1;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(3.6rem,8vw,6.2rem);
            line-height:0.82;
            letter-spacing:-0.08em;
            font-weight:220;
            color:#fff;
            margin:0;
          }
          .bru-wknd-big span {
            display:block;
            font-size:clamp(0.92rem,1.8vw,1.15rem);
            letter-spacing:0.1em;
            text-transform:uppercase;
            font-weight:900;
            color:#d9b46f;
            margin-top:0.75rem;
          }
          .bru-wknd-time-note {
            position:relative;
            z-index:1;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.86rem;
            line-height:1.65;
            font-weight:300;
            color:rgba(255,255,255,0.68);
            max-width:23rem;
            margin:1rem 0 0;
          }
          .bru-wknd-route {
            position:relative;
            z-index:1;
            display:grid;
            gap:0.75rem;
            margin:1.35rem 0 1rem;
          }
          .bru-wknd-route-step {
            position:relative;
            padding:0.9rem 1rem 0.9rem 2.2rem;
            border-radius:20px;
            background:rgba(255,255,255,0.07);
            border:1px solid rgba(255,255,255,0.1);
          }
          .bru-wknd-route-step::before {
            content:'';
            position:absolute;
            left:0.95rem;
            top:1.15rem;
            width:9px;
            height:9px;
            border-radius:50%;
            background:#d9b46f;
            box-shadow:0 0 0 5px rgba(217,180,111,0.12);
          }
          .bru-wknd-route-step strong {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            line-height:1.2;
            color:#fff;
            letter-spacing:-0.02em;
            margin-bottom:0.2rem;
          }
          .bru-wknd-route-step span {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.74rem;
            line-height:1.45;
            color:rgba(255,255,255,0.58);
          }
          .bru-wknd-mini {
            position:relative;
            z-index:1;
            display:grid;
            grid-template-columns:1fr;
            gap:0.55rem;
            margin-top:0.75rem;
            padding:0.95rem;
            border-radius:22px;
            background:rgba(217,180,111,0.1);
            border:1px solid rgba(217,180,111,0.18);
          }
          .bru-wknd-mini span {
            display:flex;
            align-items:center;
            gap:0.55rem;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.78rem;
            line-height:1.45;
            color:rgba(255,255,255,0.78);
            font-weight:700;
          }
          .bru-wknd-mini span::before {
            content:'';
            width:7px;
            height:7px;
            border-radius:50%;
            background:#d9b46f;
            flex-shrink:0;
          }
          .bru-wknd-main {
            border-radius:36px;
            background:#fff;
            border:1px solid rgba(17,24,39,0.08);
            padding:2.2rem;
            box-shadow:0 28px 90px rgba(17,24,39,0.08);
          }
          .bru-wknd-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(2rem,4.6vw,4.2rem);
            line-height:0.98;
            letter-spacing:-0.065em;
            font-weight:230;
            color:#111;
            margin:0 0 1rem;
            text-wrap:balance;
          }
          .bru-wknd-title span {
            color:#0f766e;
          }
          .bru-wknd-sub {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.78rem;
            font-weight:900;
            letter-spacing:0.14em;
            text-transform:uppercase;
            color:#8a6a2f;
            margin:0 0 1.3rem;
          }
          .bru-wknd-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.92rem;
            font-weight:300;
            line-height:1.86;
            color:#4b5563;
            margin:0 0 1rem;
          }
          .bru-wknd-copy a {
            color:#0f766e;
            font-weight:750;
            text-decoration:none;
          }
          .bru-wknd-copy a:hover {
            text-decoration:underline;
          }
          .bru-wknd-decision {
            display:grid;
            grid-template-columns:repeat(3,minmax(0,1fr));
            gap:0.75rem;
            margin:1.35rem 0 1.5rem;
          }
          .bru-wknd-chip {
            border-radius:20px;
            border:1px solid rgba(17,24,39,0.08);
            background:#f7f9f7;
            padding:0.95rem;
          }
          .bru-wknd-chip strong {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.78rem;
            letter-spacing:0.08em;
            text-transform:uppercase;
            color:#111;
            margin-bottom:0.35rem;
          }
          .bru-wknd-chip span {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.78rem;
            line-height:1.55;
            color:#64748b;
          }
          .bru-wknd-actions {
            display:flex;
            flex-wrap:wrap;
            gap:0.75rem;
            margin-top:1.5rem;
          }
          .bru-wknd-btn {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            min-height:44px;
            padding:0.78rem 1.05rem;
            border-radius:999px;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.82rem;
            font-weight:900;
            text-decoration:none;
            transition:transform 0.2s ease, background 0.2s ease;
          }
          .bru-wknd-btn:hover {
            transform:translateY(-2px);
          }
          .bru-wknd-btn-primary {
            background:#102019;
            color:#fff;
          }
          .bru-wknd-btn-secondary {
            background:#f3f4f6;
            color:#111;
            border:1px solid rgba(17,24,39,0.08);
          }
          @media(max-width:860px){
            .bru-wknd-inner { padding:0 1.25rem; }
            .bru-wknd-box { grid-template-columns:1fr; }
            .bru-wknd-time { min-height:300px; }
            .bru-wknd-main { padding:1.5rem; }
            .bru-wknd-decision { grid-template-columns:1fr; }
            .bru-wknd-actions { flex-direction:column; align-items:stretch; }
            .bru-wknd-btn { width:100%; }
          }
        `}</style>

        <section className="bru-wknd scroll-fade">
          <div className="bru-wknd-inner">
            <div className="bru-wknd-box">
              <div className="bru-wknd-time">
                <div>
                  <p className="bru-wknd-kicker">Best Weekend Retreat</p>
                  <p className="bru-wknd-big">
                    6h
                    <span>by road</span>
                  </p>

                  <p className="bru-wknd-time-note">
                    Close enough for a weekend, high enough to feel like a real mountain reset.
                  </p>

                  <div className="bru-wknd-route">
                    <div className="bru-wknd-route-step">
                      <strong>Delhi / NCR</strong>
                      <span>Leave after breakfast or early morning.</span>
                    </div>
                    <div className="bru-wknd-route-step">
                      <strong>Chakrata</strong>
                      <span>Arrive into deodar forest and cooler air.</span>
                    </div>
                    <div className="bru-wknd-route-step">
                      <strong>Retreat rhythm</strong>
                      <span>Yoga, forest walks, meditation, rest.</span>
                    </div>
                  </div>
                </div>

                <div className="bru-wknd-mini">
                  <span>No flight required</span>
                  <span>Works for two or three days</span>
                  <span>Forest air at about 2,200 metres</span>
                </div>
              </div>

              <div className="bru-wknd-main">
                <div className="bru-winner-eyebrow">
                  <span className="bru-winner-eyebrow-line" />
                  <span className="bru-winner-eyebrow-text">Near Delhi Decision</span>
                </div>

                <h2 className="bru-wknd-title">
                  Only have 2 days? <span>Choose Chakrata.</span>
                </h2>

                <p className="bru-wknd-sub">Why Chakrata leads for weekends</p>

                <p className="bru-wknd-copy">
                  For a two-day mountain wellness escape from Delhi, NCR or Chandigarh, <Link href="/retreats/chakrata">Chakrata</Link> is the most time-efficient option. Six hours by road, no flight, no complex logistics. At 2,200 metres, it delivers immediate altitude relief — cool air, deodar forest, Himalayan quiet — the moment you arrive.
                </p>

                <div className="bru-wknd-decision">
                  <div className="bru-wknd-chip">
                    <strong>Travel logic</strong>
                    <span>Short enough for a weekend, still far enough to feel like the mountains.</span>
                  </div>
                  <div className="bru-wknd-chip">
                    <strong>Retreat rhythm</strong>
                    <span>Morning yoga, afternoon forest walks, evening meditation.</span>
                  </div>
                  <div className="bru-wknd-chip">
                    <strong>Best user</strong>
                    <span>Delhi/NCR guests who need a reset without complex planning.</span>
                  </div>
                </div>

                <p className="bru-wknd-copy">
                  Our <Link href="/retreats/weekend-himalayan-retreats">weekend Himalayan retreats</Link> guide covers two-day and three-day formats across all locations. For options beyond Chakrata, including Rishikesh and Mussoorie, see the full <Link href="/retreats/retreats-near-delhi">retreat near Delhi</Link> comparison.
                </p>

                <div className="bru-wknd-actions">
                  <Link href="/retreats/weekend-himalayan-retreats" className="bru-wknd-btn bru-wknd-btn-primary">
                    View weekend retreats
                  </Link>
                  <Link href="/retreats/retreats-near-delhi" className="bru-wknd-btn bru-wknd-btn-secondary">
                    Compare near Delhi options
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BY SEASON ─────────────────────────────────────────────── */}
        <style>{`
          .bru-season {
            width:100vw;
            margin-left:calc(-50vw + 50%);
            background:
              radial-gradient(circle at top left, rgba(217,180,111,0.14), transparent 28%),
              linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
            padding:5rem 0;
            overflow:hidden;
          }
          .bru-season-inner {
            max-width:76rem;
            margin:0 auto;
            padding:0 2rem;
          }
          .bru-season-head {
            display:grid;
            grid-template-columns:0.9fr 1.1fr;
            gap:2rem;
            align-items:end;
            margin-bottom:2rem;
          }
          .bru-season-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(2rem,4.8vw,4rem);
            font-weight:230;
            letter-spacing:-0.065em;
            line-height:0.98;
            color:#111;
            margin:0;
            text-wrap:balance;
          }
          .bru-season-title span {
            color:#0f766e;
          }
          .bru-season-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.96rem;
            font-weight:300;
            line-height:1.85;
            color:#4b5563;
            margin:0;
            max-width:44rem;
          }
          .bru-season-planner {
            display:grid;
            grid-template-columns:repeat(2,minmax(0,1fr));
            gap:1rem;
          }
          .bru-season-card {
            position:relative;
            overflow:hidden;
            border-radius:36px;
            border:1px solid rgba(17,24,39,0.08);
            background:#fff;
            box-shadow:0 28px 90px rgba(17,24,39,0.08);
            padding:1.5rem;
            min-height:430px;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
          }
          .bru-season-card::before {
            content:'';
            position:absolute;
            inset:0;
            background:radial-gradient(circle at top right, rgba(15,118,110,0.12), transparent 32%);
            pointer-events:none;
          }
          .bru-season-card-winter {
            background:#102019;
            color:#fff;
            border-color:rgba(255,255,255,0.12);
          }
          .bru-season-card-chakrata {
            grid-column:1 / -1;
            min-height:auto;
            background:
              radial-gradient(circle at top right, rgba(217,180,111,0.14), transparent 32%),
              #fbfaf5;
          }
          .bru-season-card-winter::before {
            background:radial-gradient(circle at top right, rgba(217,180,111,0.18), transparent 32%);
          }
          .bru-season-card-chakrata::before {
            background:radial-gradient(circle at top right, rgba(15,118,110,0.12), transparent 32%);
          }
          .bru-season-card > * {
            position:relative;
            z-index:1;
          }
          .bru-season-top {
            display:flex;
            align-items:flex-start;
            justify-content:space-between;
            gap:1rem;
            margin-bottom:1.5rem;
          }
          .bru-season-label {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.7rem;
            letter-spacing:0.18em;
            text-transform:uppercase;
            color:#64748b;
            font-weight:900;
            margin:0 0 0.6rem;
          }
          .bru-season-card-winter .bru-season-label {
            color:rgba(255,255,255,0.58);
          }
          .bru-season-months {
            display:inline-flex;
            width:max-content;
            border-radius:999px;
            padding:0.42rem 0.75rem;
            background:rgba(15,118,110,0.08);
            border:1px solid rgba(15,118,110,0.16);
            color:#0f766e;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.7rem;
            font-weight:900;
            letter-spacing:0.1em;
            text-transform:uppercase;
          }
          .bru-season-card-winter .bru-season-months {
            background:rgba(217,180,111,0.12);
            border-color:rgba(217,180,111,0.28);
            color:#d9b46f;
          }
          .bru-season-name {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(1.8rem,3.7vw,3.2rem);
            line-height:0.96;
            letter-spacing:-0.065em;
            font-weight:240;
            color:#111;
            margin:0;
          }
          .bru-season-card-chakrata .bru-season-name {
            font-size:clamp(1.8rem,3.8vw,3.4rem);
            max-width:34rem;
          }
          .bru-season-card-winter .bru-season-name {
            color:#fff;
          }
          .bru-season-badge {
            display:flex;
            align-items:center;
            justify-content:center;
            width:58px;
            height:58px;
            border-radius:22px;
            background:#d9b46f;
            color:#111;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.78rem;
            font-weight:950;
            letter-spacing:0.08em;
            text-transform:uppercase;
            flex-shrink:0;
          }
          .bru-season-body p {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            font-weight:300;
            line-height:1.84;
            color:#4b5563;
            margin:0 0 1rem;
          }
          .bru-season-card-winter .bru-season-body p {
            color:rgba(255,255,255,0.72);
          }
          .bru-season-body a {
            color:#0f766e;
            font-weight:780;
            text-decoration:none;
          }
          .bru-season-card-winter .bru-season-body a {
            color:#d9b46f;
          }
          .bru-season-body a:hover {
            text-decoration:underline;
          }
          .bru-season-facts {
            display:grid;
            grid-template-columns:repeat(3,minmax(0,1fr));
            gap:0.65rem;
            margin:1.25rem 0;
          }
          .bru-season-fact {
            border-radius:18px;
            padding:0.85rem;
            background:#f7f9f7;
            border:1px solid rgba(17,24,39,0.08);
          }
          .bru-season-card-winter .bru-season-fact {
            background:rgba(255,255,255,0.07);
            border-color:rgba(255,255,255,0.1);
          }
          .bru-season-fact strong {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.68rem;
            letter-spacing:0.1em;
            text-transform:uppercase;
            color:#111;
            margin-bottom:0.35rem;
          }
          .bru-season-card-winter .bru-season-fact strong {
            color:#fff;
          }
          .bru-season-fact span {
            display:block;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.74rem;
            line-height:1.48;
            color:#64748b;
          }
          .bru-season-card-winter .bru-season-fact span {
            color:rgba(255,255,255,0.62);
          }
          .bru-season-chakrata-layout {
            display:grid;
            grid-template-columns:0.9fr 1.1fr;
            gap:1.5rem;
            align-items:center;
          }
          .bru-season-card-chakrata .bru-season-facts {
            margin:0;
          }
          .bru-season-card-chakrata .bru-season-body p {
            max-width:48rem;
          }
          .bru-season-action {
            display:inline-flex;
            align-items:center;
            justify-content:center;
            min-height:44px;
            width:max-content;
            padding:0.78rem 1.05rem;
            border-radius:999px;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.82rem;
            font-weight:900;
            text-decoration:none;
            background:#102019;
            color:#fff;
            transition:transform 0.2s ease, background 0.2s ease;
          }
          .bru-season-card-winter .bru-season-action {
            background:#d9b46f;
            color:#111;
          }
          .bru-season-action:hover {
            transform:translateY(-2px);
          }
          @media(max-width:1100px){
            .bru-season-planner { grid-template-columns:1fr; }
            .bru-season-card { min-height:auto; }
            .bru-season-card-chakrata { grid-column:auto; }
            .bru-season-chakrata-layout { grid-template-columns:1fr; }
          }
          @media(max-width:900px){
            .bru-season-inner { padding:0 1.25rem; }
            .bru-season-head { grid-template-columns:1fr; align-items:start; }
          }
          @media(max-width:560px){
            .bru-season-top { flex-direction:column; }
            .bru-season-facts { grid-template-columns:1fr; }
            .bru-season-action { width:100%; }
          }
        `}</style>

        <section className="bru-season scroll-fade">
          <div className="bru-season-inner">
            <div className="bru-season-head">
              <div>
                <div className="bru-winner-eyebrow">
                  <span className="bru-winner-eyebrow-line" />
                  <span className="bru-winner-eyebrow-text">Best Retreat by Season</span>
                </div>

                <h2 className="bru-season-title">
                  Match the retreat to <span>the mountain season.</span>
                </h2>
              </div>

              <p className="bru-season-copy">
                Season determines which locations are at their peak and which offer off-season value. Summer rewards altitude. Winter rewards access, clear mornings, and steadier retreat schedules.
              </p>
            </div>

            <div className="bru-season-planner">
              <div className="bru-season-card">
                <div>
                  <div className="bru-season-top">
                    <div>
                      <p className="bru-season-label">Heat escape</p>
                      <div className="bru-season-months">April – June</div>
                    </div>
                    <div className="bru-season-badge">Sun</div>
                  </div>

                  <h3 className="bru-season-name">Summer retreat: Munsiyari / Sankri</h3>

                  <div className="bru-season-facts">
                    <div className="bru-season-fact">
                      <strong>Why</strong>
                      <span>Cool altitude while the plains heat up.</span>
                    </div>
                    <div className="bru-season-fact">
                      <strong>Feel</strong>
                      <span>Green valleys, snow views, forest air.</span>
                    </div>
                    <div className="bru-season-fact">
                      <strong>Best for</strong>
                      <span>Yoga, nature rest, mountain visibility.</span>
                    </div>
                  </div>

                  <div className="bru-season-body">
                    <p>
                      <strong>Summer (April to June).</strong> Munsiyari and <Link href="/retreats/sankri">Sankri</Link> are at their best — green valleys, snow-peak views, temperatures between 15 and 25 degrees while the plains bake above 40. High-altitude summer retreats combine forest bathing, yoga, and the clearest mountain visibility of the year.
                    </p>
                  </div>
                </div>

                <Link href="/retreats/summer-himalayan-retreats" className="bru-season-action">
                  View summer retreats
                </Link>
              </div>

              <div className="bru-season-card bru-season-card-winter">
                <div>
                  <div className="bru-season-top">
                    <div>
                      <p className="bru-season-label">Clear mornings</p>
                      <div className="bru-season-months">October – February</div>
                    </div>
                    <div className="bru-season-badge">Cold</div>
                  </div>

                  <h3 className="bru-season-name">Winter retreat: Rishikesh</h3>

                  <div className="bru-season-facts">
                    <div className="bru-season-fact">
                      <strong>Why</strong>
                      <span>Reliable access and focused practice weather.</span>
                    </div>
                    <div className="bru-season-fact">
                      <strong>Feel</strong>
                      <span>Cool mornings, clear Ganges, quieter valley.</span>
                    </div>
                    <div className="bru-season-fact">
                      <strong>Avoid</strong>
                      <span>High-altitude closures and limited programs.</span>
                    </div>
                  </div>

                  <div className="bru-season-body">
                    <p>
                      <strong>Winter (October to February).</strong> Rishikesh is the strongest winter retreat destination — cool mornings sharpen yoga practice, the Ganges is at its clearest, and the valley is uncrowded after monsoon. Chakrata offers cold-air forest stillness with occasional frost. High-altitude locations (Munsiyari, Sankri) close or operate limited winter programs.
                    </p>
                  </div>
                </div>

                <Link href="/retreats/winter-himalayan-retreats" className="bru-season-action">
                  View winter retreats
                </Link>
              </div>

              <div className="bru-season-card bru-season-card-chakrata">
                <div className="bru-season-chakrata-layout">
                  <div>
                    <div className="bru-season-top">
                      <div>
                        <p className="bru-season-label">Short reset</p>
                        <div className="bru-season-months">March – June / Sep – Nov</div>
                      </div>
                      <div className="bru-season-badge">2D</div>
                    </div>

                    <h3 className="bru-season-name">Weekend retreat: Chakrata</h3>

                    <div className="bru-season-body">
                      <p>
                        <strong>Shoulder season and short breaks.</strong> Chakrata deserves its own seasonal lane because it works when time is the constraint. Spring, early summer, and post-monsoon weekends give you cooler forest air without the travel commitment of Munsiyari or Sankri.
                      </p>
                    </div>

                    <Link href="/retreats/chakrata" className="bru-season-action">
                      View Chakrata retreats
                    </Link>
                  </div>

                  <div className="bru-season-facts">
                    <div className="bru-season-fact">
                      <strong>Why</strong>
                      <span>Near Delhi, forest altitude, and simple road access.</span>
                    </div>
                    <div className="bru-season-fact">
                      <strong>Feel</strong>
                      <span>Deodar shade, cool air, quiet mornings, slower evenings.</span>
                    </div>
                    <div className="bru-season-fact">
                      <strong>Best for</strong>
                      <span>Two-day resets when you cannot take a long retreat.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW TO CHOOSE ─────────────────────────────────────────── */}
        <style>{`
          .bru-htc {
            width:100vw;
            margin-left:calc(-50vw + 50%);
            background:
              radial-gradient(circle at top left, rgba(15,118,110,0.1), transparent 30%),
              linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
            padding:5.5rem 0;
            overflow:hidden;
          }
          .bru-htc-inner {
            max-width:76rem;
            margin:0 auto;
            padding:0 2rem;
          }
          .bru-htc-head {
            display:grid;
            grid-template-columns:0.9fr 1.1fr;
            gap:2rem;
            align-items:end;
            margin-bottom:2rem;
          }
          .bru-htc-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(2.1rem,5vw,4.6rem);
            font-weight:230;
            letter-spacing:-0.07em;
            line-height:0.96;
            color:#111;
            margin:0;
            text-wrap:balance;
          }
          .bru-htc-title span {
            color:#0f766e;
          }
          .bru-htc-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.96rem;
            font-weight:300;
            line-height:1.85;
            color:#4b5563;
            margin:0;
            max-width:44rem;
          }
          .bru-htc-grid {
            display:grid;
            grid-template-columns:repeat(6,minmax(0,1fr));
            gap:1rem;
            margin:2rem 0 1rem;
          }
          .bru-htc-card {
            position:relative;
            overflow:hidden;
            border-radius:30px;
            border:1px solid rgba(17,24,39,0.08);
            background:#fff;
            padding:1.35rem;
            min-height:270px;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            box-shadow:0 24px 80px rgba(17,24,39,0.07);
          }
          .bru-htc-card::before {
            content:'';
            position:absolute;
            inset:0;
            background:radial-gradient(circle at top right, rgba(15,118,110,0.1), transparent 32%);
            pointer-events:none;
          }
          .bru-htc-card > * {
            position:relative;
            z-index:1;
          }
          .bru-htc-card:nth-child(1),
          .bru-htc-card:nth-child(2),
          .bru-htc-card:nth-child(3) {
            grid-column:span 2;
          }
          .bru-htc-card:nth-child(4),
          .bru-htc-card:nth-child(5) {
            grid-column:span 3;
          }
          .bru-htc-card-all {
            grid-column:1 / -1;
            min-height:auto;
            background:#102019;
            color:#fff;
          }
          .bru-htc-card-all::before {
            background:radial-gradient(circle at top right, rgba(217,180,111,0.16), transparent 34%);
          }
          .bru-htc-top {
            display:flex;
            align-items:flex-start;
            justify-content:space-between;
            gap:1rem;
            margin-bottom:1.25rem;
          }
          .bru-htc-label {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.7rem;
            font-weight:900;
            letter-spacing:0.18em;
            text-transform:uppercase;
            color:#64748b;
            display:block;
          }
          .bru-htc-card-all .bru-htc-label {
            color:rgba(255,255,255,0.62);
          }
          .bru-htc-num {
            display:flex;
            align-items:center;
            justify-content:center;
            width:40px;
            height:40px;
            border-radius:16px;
            background:#d9b46f;
            color:#111;
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.78rem;
            font-weight:950;
            flex-shrink:0;
          }
          .bru-htc-card p {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.88rem;
            font-weight:300;
            line-height:1.78;
            color:#4b5563;
            margin:0;
          }
          .bru-htc-card strong {
            display:block;
            font-size:1.15rem;
            line-height:1.1;
            letter-spacing:-0.04em;
            font-weight:760;
            color:#111;
            margin-bottom:0.7rem;
          }
          .bru-htc-card-all p {
            color:rgba(255,255,255,0.74);
            max-width:60rem;
          }
          .bru-htc-card-all strong {
            color:#fff;
          }
          .bru-htc-card a {
            color:#0f766e;
            font-weight:760;
            text-decoration:none;
          }
          .bru-htc-card-all a {
            color:#d9b46f;
          }
          .bru-htc-card a:hover {
            text-decoration:underline;
          }
          .bru-htc-note {
            border-radius:32px;
            border:1px solid rgba(17,24,39,0.08);
            background:#fff;
            padding:1.45rem;
            box-shadow:0 24px 80px rgba(17,24,39,0.06);
          }
          .bru-htc-note-label {
            display:flex;
            align-items:center;
            gap:0.75rem;
            margin-bottom:0.85rem;
          }
          .bru-htc-note-label::before {
            content:'';
            width:34px;
            height:1px;
            background:#d9b46f;
            flex-shrink:0;
          }
          .bru-htc-note-label span {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.7rem;
            letter-spacing:0.18em;
            text-transform:uppercase;
            color:#374151;
            font-weight:900;
          }
          .bru-htc-note p {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.9rem;
            font-weight:300;
            line-height:1.85;
            color:#4b5563;
            margin:0;
          }
          @media(max-width:980px){
            .bru-htc-inner { padding:0 1.25rem; }
            .bru-htc-head { grid-template-columns:1fr; align-items:start; }
            .bru-htc-grid { grid-template-columns:1fr; }
            .bru-htc-card,
            .bru-htc-card:nth-child(1),
            .bru-htc-card:nth-child(2),
            .bru-htc-card:nth-child(3),
            .bru-htc-card:nth-child(4),
            .bru-htc-card:nth-child(5),
            .bru-htc-card-all {
              grid-column:auto;
              min-height:auto;
            }
          }
        `}</style>

        <section className="bru-htc scroll-fade">
          <div className="bru-htc-inner">
            <div className="bru-htc-head">
              <div>
                <div className="bru-winner-eyebrow">
                  <span className="bru-winner-eyebrow-line" />
                  <span className="bru-winner-eyebrow-text">How to Choose</span>
                </div>

                <h2 className="bru-htc-title">
                  Your retreat decision <span>matrix.</span>
                </h2>
              </div>

              <p className="bru-htc-copy">
                Five dimensions determine the right retreat: duration, budget, intensity, landscape, and travel time. Use them together, not separately.
              </p>
            </div>

            <div className="bru-htc-grid sf-stagger">
              {[
                {
                  label: 'Duration',
                  num: '01',
                  content: <><strong>Duration.</strong> Two to three days: Chakrata or Rishikesh weekend format. Five to seven days: Rishikesh deep program, Munsiyari immersion, or Sankri wilderness stay. Ten days or more: teacher training, silent retreat, or extended personal practice.</>,
                },
                {
                  label: 'Budget',
                  num: '02',
                  content: <><strong>Budget.</strong> Chakrata and Sankri offer the most affordable mountain wellness experiences. Rishikesh spans every price bracket from ashram-basic to heritage-premium. Munsiyari skews toward the higher end due to its exclusivity and limited capacity.</>,
                },
                {
                  label: 'Intensity',
                  num: '03',
                  content: <><strong>Intensity.</strong> For structured, instructor-led programs with daily schedules: Rishikesh. For self-directed rest with optional guided sessions: Chakrata or Munsiyari. For a blend of nature immersion and light wellness programming: Sankri.</>,
                },
                {
                  label: 'Landscape',
                  num: '04',
                  content: <><strong>Location preference.</strong> River energy: Rishikesh. Forest altitude: Chakrata. High-alpine solitude: Munsiyari. Wilderness valley: Sankri. Each landscape shapes the retreat experience at a fundamental level.</>,
                },
                {
                  label: 'Travel Time',
                  num: '05',
                  content: <><strong>Travel time.</strong> Five to six hours from Delhi: Rishikesh or Chakrata. Eight to nine hours: Sankri. Twelve hours or overnight: Munsiyari. Travel time is the most common constraint — if you have only a weekend, your location is decided before you choose a program.</>,
                },
              ].map(({ label, num, content }) => (
                <div key={label} className="bru-htc-card">
                  <div className="bru-htc-top">
                    <span className="bru-htc-label">{label}</span>
                    <span className="bru-htc-num">{num}</span>
                  </div>
                  <p>{content}</p>
                </div>
              ))}

              <div className="bru-htc-card bru-htc-card-all">
                <div className="bru-htc-top">
                  <span className="bru-htc-label">All Options</span>
                  <span className="bru-htc-num">06</span>
                </div>
                <p>
                  <strong>See the complete retreat map.</strong> For a structured view of all options by location and program type, see the <Link href="/retreats/uttarakhand-retreats">Uttarakhand retreats</Link> overview and the main <Link href="/retreats/himalayan-retreats">Himalayan retreats in India</Link> directory.
                </p>
              </div>
            </div>

            <div className="bru-htc-note">
              <div className="bru-htc-note-label">
                <span>Program style matters</span>
              </div>
              <p>
                Program styles vary significantly across locations. Rishikesh offers the widest spectrum — Hatha yoga for alignment-focused practice, Vinyasa for dynamic flow, pranayama-centred breathwork intensives, and structured Vipassana-style silent immersion programs lasting three to ten days. Munsiyari and Sankri operate on a boutique retreat format: small groups of four to eight, private facilitator models where a single lead practitioner holds the entire program arc, and silent-immersion scheduling that eliminates group social pressure. Chakrata programs lean toward weekend-accessible gentle yoga and guided nature meditation rather than intensive technique training. Understanding the distinction between ashram-style group instruction, boutique private facilitation, and self-directed silent retreats is the single most important factor in choosing well.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <style>{`
          .bru-faq {
            width:100vw;
            margin-left:calc(-50vw + 50%);
            background:
              radial-gradient(circle at top right, rgba(217,180,111,0.12), transparent 30%),
              linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
            padding:5.5rem 0;
            overflow:hidden;
          }
          .bru-faq-inner {
            max-width:76rem;
            margin:0 auto;
            padding:0 2rem;
          }
          .bru-faq-head {
            display:grid;
            grid-template-columns:0.9fr 1.1fr;
            gap:2rem;
            align-items:end;
            margin-bottom:2rem;
          }
          .bru-faq-title {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:clamp(2.1rem,5vw,4.6rem);
            font-weight:230;
            letter-spacing:-0.07em;
            line-height:0.96;
            color:#111;
            margin:0;
            text-wrap:balance;
          }
          .bru-faq-title span {
            color:#0f766e;
          }
          .bru-faq-copy {
            font-family:var(--font-geist-sans),sans-serif;
            font-size:0.96rem;
            font-weight:300;
            line-height:1.85;
            color:#4b5563;
            margin:0;
            max-width:44rem;
          }
          .bru-faq-card {
            border-radius:34px;
            border:1px solid rgba(17,24,39,0.08);
            background:#fff;
            padding:1.5rem;
            box-shadow:0 28px 90px rgba(17,24,39,0.08);
          }
          @media(max-width:900px){
            .bru-faq-inner { padding:0 1.25rem; }
            .bru-faq-head { grid-template-columns:1fr; align-items:start; }
            .bru-faq-card { padding:1rem; border-radius:24px; }
          }
        `}</style>

        <section className="bru-faq scroll-fade">
          <div className="bru-faq-inner">
            <div className="bru-faq-head">
              <div>
                <div className="bru-winner-eyebrow">
                  <span className="bru-winner-eyebrow-line" />
                  <span className="bru-winner-eyebrow-text">FAQ</span>
                </div>

                <h2 className="bru-faq-title">
                  Final questions before <span>you choose.</span>
                </h2>
              </div>

              <p className="bru-faq-copy">
                These answers clarify the most common decision points: yoga location, near-Delhi access, Munsiyari versus Rishikesh, summer timing, beginner suitability, and ideal retreat duration.
              </p>
            </div>

            <div className="bru-faq-card">
              <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
            </div>
          </div>
        </section>

      </article>
    </TrackedPage>
  );
}
