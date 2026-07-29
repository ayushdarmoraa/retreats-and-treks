import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
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
        'Compare the best retreats in Uttarakhand by purpose, budget, location, season, retreat style, and access.',
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
      'Rishikesh is the best location for a yoga retreat in Uttarakhand. It offers the largest group of teachers, the widest range of yoga styles (Hatha, Vinyasa, Ashtanga, Yin), riverside practice settings along the Ganges, and programs through the year. For a quieter mountain alternative, Sankri and Munsiyari offer yoga programs at higher altitude with smaller groups and forest retreat time.',
  },
  {
    question: 'What is the best retreat near Delhi?',
    answer:
      'Chakrata is the best retreat destination near Delhi — six hours by road, no flight required. It offers weekend-friendly wellness stays with yoga, meditation, forest walks, and Himalayan stillness at 2,200 metres. Rishikesh is also reachable in five to six hours and offers a wider range of programs. For a two-day escape, Chakrata is the most practical option. For a deeper program, choose Rishikesh.',
  },
  {
    question: 'Is Munsiyari better than Rishikesh for a retreat?',
    answer:
      'They serve different needs. Munsiyari is better for quiet distance, alpine views, and quiet luxury — it sits at 2,200 metres facing the Panchachuli peaks and receives very few visitors. Rishikesh is better for guided yoga training, instructor access, and yoga tradition and spiritual history. Choose Munsiyari for luxury and solitude. Choose Rishikesh for depth and technique.',
  },
  {
    question: 'Which retreat is best in summer?',
    answer:
      'Munsiyari and Sankri are the best summer retreat destinations. Both sit above 2,000 metres where temperatures stay between 15 and 25 degrees while the plains exceed 40. Green forests, cool air, and snow-peak views make summer the ideal season for mountain wellness. Rishikesh is warm in summer but still running with riverside programs.',
  },
  {
    question: 'Are retreats in Uttarakhand beginner-friendly?',
    answer:
      'Yes. Most retreats in Uttarakhand are designed for beginners and do not require prior yoga or meditation experience. Guided programs include basic sessions, personal instruction, and step-by-step difficulty. Chakrata and Rishikesh are the most beginner-friendly locations — accessible, well-supported, and geared toward first-time participants.',
  },
  {
    question: 'How many days are ideal for a Himalayan retreat?',
    answer:
      'Two to three days works for a weekend reset — enough for a few yoga sessions, guided meditation, and mountain stillness. Five to seven days is ideal for a meaningful change — deeper practice, deep rest, and real distance from routine. For deeper programs such as teacher training or silent retreats, ten days or more is standard. Choose duration based on goal: reset, restore, or transform.',
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
      'Compare the best retreats in Uttarakhand by purpose, budget, location, season, retreat style, and access across Rishikesh, Munsiyari, and Chakrata.',
    url: canonicalUrl,
    isPartOf: { '@id': schemaIds.website },
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
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
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

      <style>{`
        .med-shell { width: 100vw; margin-left: calc(-50vw + 50%); }
        .med-outer { max-width: 76rem; margin: 0 auto; padding: 0 1.5rem; }
        .med-inner { max-width: 58rem; margin: 0 auto; padding: 0 1.5rem; }

        .med-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.1rem; }
        .med-eyebrow-line { width: 30px; height: 1px; background: rgba(15,118,110,0.35); flex-shrink: 0; }
        .med-eyebrow-text { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6b7280; font-weight: 600; }

        .med-h2 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.12; margin: 0 0 1.1rem; }
        .med-h2 span { color: #0f766e; }
        .med-h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.15rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.7rem; letter-spacing: -0.01em; }
        .med-body { font-family: var(--font-inter), sans-serif; font-size: 0.98rem; line-height: 1.9; color: #4b5259; font-weight: 400; margin: 0 0 1rem; }
        .med-body:last-child { margin-bottom: 0; }
        .med-body strong { color: #2B2A26; font-weight: 600; }

        .med-card {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(15,31,28,0.05);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .med-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: #0f766e; transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: 2;
        }
        .med-card:hover { transform: translateY(-6px); border-color: rgba(15,118,110,0.28); box-shadow: 0 22px 48px rgba(15,31,28,0.12); }
        .med-card:hover::before { transform: scaleX(1); }

        .med-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem 2.3rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.25); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid #0f766e; }
        .med-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.32); }
        .med-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.85rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .med-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 960px) { .med-grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } .med-grid-4 { grid-template-columns: 1fr; } }

        @keyframes med-hero-zoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        .med-hero-bg { animation: med-hero-zoom 24s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .med-hero-bg { animation: none; } }

        .med-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .med-list-item { display: grid; grid-template-columns: 1.9rem 1fr; gap: 0.9rem; }
        .med-list-dot { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid rgba(15,118,110,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .med-list-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; }
        .med-list-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #4b5259; font-weight: 400; }
        .med-list-text strong { color: #2B2A26; font-weight: 600; }

        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }

        .med-stat { text-align: center; padding: 1.5rem; }
        .med-stat-value { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 600; color: #0f766e; margin: 0 0 0.3rem; }
        .med-stat-label { font-family: var(--font-inter), sans-serif; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; font-weight: 600; margin: 0; }

        .med-fact-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.5rem; }
        @media (max-width: 640px) { .med-fact-grid { grid-template-columns: 1fr; } }
        .med-fact-item { border-radius: 12px; background: #f7f9f7; padding: 0.6rem 0.7rem; border: 1px solid rgba(15,118,110,0.06); }
        .med-fact-item strong { display: block; font-family: var(--font-inter), sans-serif; font-size: 0.55rem; letter-spacing: 0.08em; text-transform: uppercase; color: #0f766e; margin-bottom: 0.15rem; font-weight: 700; }
        .med-fact-item span { display: block; font-family: var(--font-inter), sans-serif; font-size: 0.68rem; line-height: 1.3; color: #4b5563; }

        .med-winner-card { display: grid; grid-template-columns: 0.74fr 1.26fr; gap: 0; border-radius: 18px; overflow: hidden; background: #fff; border: 1px solid rgba(15,118,110,0.12); box-shadow: 0 10px 30px rgba(15,31,28,0.05); }
        .med-winner-rank { position: relative; min-height: 400px; padding: 2rem; background: linear-gradient(180deg, rgba(16,32,25,0.24), rgba(16,32,25,0.72)), url('/Images/retreats/yoga/yoga-backbend-cave-rishikesh.webp'); background-size: cover; background-position: center; color: #fff; display: flex; flex-direction: column; justify-content: space-between; }
        .med-winner-rank .med-rank-number { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(4rem, 8vw, 6rem); line-height: 0.9; font-weight: 500; color: #5eead4; margin: 0; }
        .med-winner-rank .med-rank-label { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.7); }
        .med-winner-body { padding: 2rem; display: flex; flex-direction: column; justify-content: center; }
        @media (max-width: 860px) { .med-winner-card { grid-template-columns: 1fr; } .med-winner-rank { min-height: 250px; } .med-winner-body { padding: 1.5rem; } }

        .med-choice-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-choice-grid { grid-template-columns: 1fr; } }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-card-link { text-decoration: none; display: block; height: 100%; }
        .med-card-link .med-card { height: 100%; display: flex; flex-direction: column; }
        .med-card-link .med-card-body { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }

        .bru-selector-card { min-height: 220px; }
        .bru-selector-card .med-h3 { font-size: 1.1rem; margin-bottom: 0.3rem; }
        .bru-selector-card .med-season-tag { margin-bottom: 0.5rem; }

        .med-card-equal { display: flex; flex-direction: column; justify-content: space-between; }
      `}</style>

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/hero/himalayan-sunrise.webp" alt="Best retreats in Uttarakhand" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Ranked Guide &middot; 2026</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Best retreats in Uttarakhand, <span style={{ color: '#5eead4' }}>chosen by purpose.</span>
          </h1>
          <p style={{ maxWidth: '40rem', margin: '0 auto 1.5rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Uttarakhand is India's most concentrated mountain wellness region — but the best retreat depends entirely on your goal. A yoga retreat in Rishikesh feels different from alpine seclusion in Munsiyari or a short forest reset in Chakrata.
          </p>
          <p style={{ maxWidth: '40rem', margin: '0 auto 1.5rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Use this guide like a retreat finder: compare yoga, meditation, luxury, weekend, near-Delhi, summer and winter options before choosing where to go.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['Yoga', 'Meditation', 'Luxury', 'Weekend Escapes', 'Near Delhi', 'Summer', 'Winter'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '999px', padding: '0.35rem 0.8rem', background: 'rgba(15,118,110,0.25)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/find-your-retreat" className="med-cta-btn">Find my retreat</Link>
            <a href="#quick-comparison" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Compare retreat types</a>
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

      {/* ── QUICK COMPARISON ── */}
      <section id="quick-comparison" className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">At a Glance</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>
            Pick the retreat by <span>what you need most.</span>
          </h2>
          <p className="med-body" style={{ textAlign: 'center', maxWidth: '46rem', margin: '0 auto 2.2rem' }}>
            These categories are not interchangeable. Rishikesh is strongest for guided yoga, Munsiyari for alpine seclusion, Chakrata for short resets, and Sankri for high-altitude summer calm.
          </p>

          <div className="med-grid-4" style={{ marginTop: '1.8rem' }}>
            {[
              { rank: '01', type: 'Best Yoga Retreat', place: 'Rishikesh', copy: 'Instructor depth, daily structure, Ganges-side practice, and year-round yoga culture.', href: '/retreats/yoga-retreat-rishikesh' },
              { rank: '02', type: 'Best Meditation Retreat', place: 'Rishikesh / Munsiyari', copy: 'Choose Rishikesh for guided programs or Munsiyari for altitude silence and wide horizons.', href: '/retreats/meditation-retreat-uttarakhand' },
              { rank: '03', type: 'Best Luxury Retreat', place: 'Munsiyari', copy: 'Panchachuli views, fewer visitors, premium stays, and a slower alpine retreat rhythm.', href: '/retreats/luxury-himalayan-retreats' },
              { rank: '04', type: 'Best Weekend Retreat', place: 'Chakrata', copy: 'Six-hour road access, deodar forest, cool altitude, and simple weekend logistics.', href: '/retreats/weekend-himalayan-retreats' },
              { rank: '05', type: 'Best Near Delhi', place: 'Chakrata / Rishikesh', copy: 'Choose Chakrata for quiet forest time or Rishikesh for more retreat variety.', href: '/retreats/retreats-near-delhi' },
              { rank: '06', type: 'Best Summer Retreat', place: 'Munsiyari / Sankri', copy: 'High-altitude air, green valleys, snow-peak views, and cooler mountain days.', href: '/retreats/summer-himalayan-retreats' },
              { rank: '07', type: 'Best Winter Retreat', place: 'Rishikesh', copy: 'Cool mornings, clearer skies, easier access, and reliable winter practice conditions.', href: '/retreats/winter-himalayan-retreats' },
            ].map((item) => (
              <Link key={item.rank} href={item.href} className="med-card-link">
                <div className="med-card bru-selector-card" style={{ padding: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span className="med-season-tag" style={{ marginBottom: 0 }}>{item.type}</span>
                      <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#0f766e' }}>{item.rank}</span>
                    </div>
                    <h3 className="med-h3" style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{item.place}</h3>
                    <p className="med-body" style={{ fontSize: '0.85rem', marginBottom: 0 }}>{item.copy}</p>
                  </div>
                  <span style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 600, marginTop: '1rem' }}>Explore →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="med-card" style={{ padding: '1.2rem 1.5rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0, fontSize: '0.9rem' }}>
              <strong>Fast rule:</strong> choose Rishikesh for technique, Munsiyari for solitude, Chakrata for a short reset, and Sankri when summer heat is the problem.
            </p>
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

      {/* ── HOW TO USE THIS GUIDE ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">How to use this guide</span>
          </div>
          <h2 className="med-h2">Match the retreat to <span>your intention.</span></h2>

          <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <h3 className="med-h3">Best for yoga depth</h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Rishikesh for daily practice, teacher access, and strong structure.</p>
              </div>
              <Link href="/retreats/yoga-retreat-rishikesh" className="med-cta-outline" style={{ marginTop: '1rem', display: 'inline-flex' }}>Explore →</Link>
            </div>
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <h3 className="med-h3">Best for silence</h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Munsiyari or Sankri for alpine air, fewer people, and deeper stillness.</p>
              </div>
              <Link href="/retreats/meditation-retreat-uttarakhand" className="med-cta-outline" style={{ marginTop: '1rem', display: 'inline-flex' }}>Explore →</Link>
            </div>
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <h3 className="med-h3">Best for a short reset</h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Chakrata for a weekend-friendly forest retreat without a long travel window.</p>
              </div>
              <Link href="/retreats/retreats-near-delhi" className="med-cta-outline" style={{ marginTop: '1rem', display: 'inline-flex' }}>Explore →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST YOGA RETREAT ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-winner-card">
            <div className="med-winner-rank">
              <div>
                <p className="med-rank-label">Ranked winner</p>
                <p className="med-rank-number">01</p>
              </div>
              <div style={{ display: 'inline-flex', width: 'max-content', borderRadius: '999px', padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Rishikesh</div>
            </div>
            <div className="med-winner-body">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Best Yoga Retreat</span>
              </div>
              <h2 className="med-h2">Best Yoga Retreat — <span>Rishikesh</span></h2>
              <p className="med-body" style={{ fontSize: '0.85rem', fontWeight: 500, color: '#8a6a2f', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Why Rishikesh leads for yoga</p>
              <p className="med-body" style={{ fontSize: '0.9rem' }}>Rishikesh is the undisputed centre of yoga retreat culture in northern India. The concentration of certified instructors, the range of styles (Hatha, Vinyasa, Ashtanga, Yin, Kundalini), and the Ganges-side practice settings make it the default choice for anyone whose main retreat goal is yoga. Our <Link href="/retreats/yoga-retreat-rishikesh" style={{ color: '#0f766e', fontWeight: 600 }}>yoga retreat in Rishikesh</Link> guide covers structure, schedules, and instructor profiles clearly.</p>

              <div className="med-fact-grid" style={{ margin: '1rem 0' }}>
                <div className="med-fact-item">
                  <strong>Best for</strong>
                  <span>Guided daily yoga, technique, teachers, and practice rhythm.</span>
                </div>
                <div className="med-fact-item">
                  <strong>Peak feel</strong>
                  <span>Spring and autumn for clear weather, moderate temperature, and clean river energy.</span>
                </div>
                <div className="med-fact-item">
                  <strong>Alternative</strong>
                  <span>Chakrata or Sankri if you want yoga with forest altitude instead of river-valley energy.</span>
                </div>
              </div>

              <p className="med-body" style={{ fontSize: '0.9rem' }}>Rishikesh yoga programs run year-round. Winter mornings are cool and focused. Monsoon (July to September) limits some outdoor sessions but deepens the quieter atmosphere. Spring and autumn are peak seasons — clear weather, moderate temperatures, and the river at its cleanest.</p>
              <p className="med-body" style={{ fontSize: '0.9rem' }}>For yoga practice combined with mountain altitude and forest-based retreat time rather than river-valley energy, see the broader <Link href="/retreats/yoga-retreat-uttarakhand" style={{ color: '#0f766e', fontWeight: 600 }}>yoga retreat in Uttarakhand</Link> overview, which includes Chakrata and Sankri options alongside Rishikesh.</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                <Link href="/retreats/yoga-retreat-rishikesh" className="med-cta-btn" style={{ padding: '0.7rem 1.2rem', fontSize: '0.7rem' }}>View Rishikesh yoga retreat</Link>
                <Link href="/retreats/yoga-retreat-uttarakhand" className="med-cta-outline" style={{ padding: '0.7rem 1.2rem', fontSize: '0.7rem' }}>Compare yoga retreats</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST MEDITATION RETREAT ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Best Meditation Retreat</span>
          </div>
          <h2 className="med-h2">Choose your silence: <span>river or alpine.</span></h2>
          <p className="med-body">Meditation retreats split into two different experiences in Uttarakhand. Rishikesh gives structure, teachers, and group support. Munsiyari gives altitude, seclusion, and stillness shaped by the landscape.</p>

          <div className="med-choice-grid" style={{ marginTop: '1.8rem' }}>
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="med-season-tag" style={{ marginBottom: 0 }}>River stillness</span>
                  <span className="med-season-tag" style={{ marginBottom: 0, background: 'rgba(15,118,110,0.15)' }}>Rishikesh</span>
                </div>
                <h3 className="med-h3">Guided practice with structure.</h3>
                <p className="med-body" style={{ fontSize: '0.88rem' }}><Link href="/retreats/rishikesh" style={{ color: '#0f766e', fontWeight: 600 }}>Rishikesh</Link> offers guided programs: Vipassana, mindfulness courses, silent retreats with group support, and ashram-based practice rooted in a long teaching tradition. The <Link href="/retreats/meditation-retreat-rishikesh" style={{ color: '#0f766e', fontWeight: 600 }}>meditation retreat in Rishikesh</Link> guide explains these programs clearly.</p>
                <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                  <li className="med-list-item"><span className="med-list-dot"><span className="med-list-dot-inner" /></span><span className="med-list-text">Best for first-timers who want guidance</span></li>
                  <li className="med-list-item"><span className="med-list-dot"><span className="med-list-dot-inner" /></span><span className="med-list-text">Best for lineage, teachers, and daily structure</span></li>
                  <li className="med-list-item"><span className="med-list-dot"><span className="med-list-dot-inner" /></span><span className="med-list-text">Best when you want support around silence</span></li>
                </ul>
              </div>
              <Link href="/retreats/meditation-retreat-rishikesh" className="med-cta-btn" style={{ padding: '0.7rem 1.2rem', fontSize: '0.7rem', marginTop: '1rem', display: 'inline-flex' }}>View Rishikesh meditation</Link>
            </div>

            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="med-season-tag" style={{ marginBottom: 0 }}>Alpine silence</span>
                  <span className="med-season-tag" style={{ marginBottom: 0, background: 'rgba(15,118,110,0.15)' }}>Munsiyari</span>
                </div>
                <h3 className="med-h3">Stillness without performance.</h3>
                <p className="med-body" style={{ fontSize: '0.88rem' }}><Link href="/retreats/munsiyari" style={{ color: '#0f766e', fontWeight: 600 }}>Munsiyari</Link> offers something different — altitude silence. At 2,200 metres facing the Panchachuli massif, Munsiyari provides natural stillness that no guided session can match. Fewer visitors, thinner air, wider horizons. Meditation here is landscape-driven rather than instructor-driven.</p>
                <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                  <li className="med-list-item"><span className="med-list-dot"><span className="med-list-dot-inner" /></span><span className="med-list-text">Best for people with meditation experience</span></li>
                  <li className="med-list-item"><span className="med-list-dot"><span className="med-list-dot-inner" /></span><span className="med-list-text">Best for solitude, views, and fewer visitors</span></li>
                  <li className="med-list-item"><span className="med-list-dot"><span className="med-list-dot-inner" /></span><span className="med-list-text">Best when landscape itself is the teacher</span></li>
                </ul>
              </div>
              <Link href="/retreats/munsiyari" className="med-cta-btn" style={{ padding: '0.7rem 1.2rem', fontSize: '0.7rem', marginTop: '1rem', display: 'inline-flex' }}>Explore Munsiyari</Link>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.2rem 1.5rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0, fontSize: '0.9rem' }}>For a complete view across all meditation-friendly locations, see <Link href="/retreats/meditation-retreat-uttarakhand" style={{ color: '#0f766e', fontWeight: 600 }}>meditation retreats in Uttarakhand</Link>.</p>
          </div>
        </div>
      </section>

      {/* ── BEST LUXURY RETREAT ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-card" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '2rem', alignItems: 'center' }}>
              <div>
                <span className="med-season-tag">Best Luxury Retreat · Munsiyari</span>
                <h2 className="med-h2" style={{ margin: '0.5rem 0 1rem' }}>Luxury is not marble. <span>It is space.</span></h2>
                <p className="med-body">Luxury in the Himalayas is not about marble lobbies — it is about privacy, views, guided programming, and the absence of crowds. Munsiyari leads this category. Its combination of Panchachuli views, fewer visitors, and premium stays creates a retreat experience closer to a quiet alpine setting than standard hotel luxury.</p>
                <p className="med-body">The <Link href="/retreats/luxury-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>luxury Himalayan retreats</Link> guide compares premium options across all locations — Munsiyari for quiet alpine luxury, Rishikesh for heritage luxury, and Sankri for remote wilderness comfort.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                  <Link href="/retreats/luxury-himalayan-retreats" className="med-cta-btn" style={{ padding: '0.7rem 1.2rem', fontSize: '0.7rem' }}>Explore luxury retreats</Link>
                  <Link href="/retreats/munsiyari" className="med-cta-outline" style={{ padding: '0.7rem 1.2rem', fontSize: '0.7rem' }}>View Munsiyari retreats</Link>
                </div>
              </div>

              <div className="med-grid-2" style={{ gap: '0.85rem' }}>
                <div className="med-card" style={{ padding: '1.15rem' }}>
                  <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#0f766e', marginBottom: '0.5rem' }}>01</div>
                  <h3 className="med-h3" style={{ fontSize: '1rem' }}>Privacy</h3>
                  <p className="med-body" style={{ fontSize: '0.78rem', marginBottom: 0 }}>Fewer visitors and more distance from mainstream travel circuits.</p>
                </div>
                <div className="med-card" style={{ padding: '1.15rem' }}>
                  <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#0f766e', marginBottom: '0.5rem' }}>02</div>
                  <h3 className="med-h3" style={{ fontSize: '1rem' }}>Panchachuli views</h3>
                  <p className="med-body" style={{ fontSize: '0.78rem', marginBottom: 0 }}>Alpine scale, long horizons, and a retreat mood shaped by the peaks.</p>
                </div>
                <div className="med-card" style={{ padding: '1.15rem' }}>
                  <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#0f766e', marginBottom: '0.5rem' }}>03</div>
                  <h3 className="med-h3" style={{ fontSize: '1rem' }}>Curated stay</h3>
                  <p className="med-body" style={{ fontSize: '0.78rem', marginBottom: 0 }}>Comfort matters, but the real value is rhythm, silence, and quality of setting.</p>
                </div>
                <div className="med-card" style={{ padding: '1.15rem' }}>
                  <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#0f766e', marginBottom: '0.5rem' }}>04</div>
                  <h3 className="med-h3" style={{ fontSize: '1rem' }}>Low crowd volume</h3>
                  <p className="med-body" style={{ fontSize: '0.78rem', marginBottom: 0 }}>The absence of noise is part of the luxury, not a side benefit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST WEEKEND RETREAT ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-grid-2" style={{ gap: '1rem' }}>
            <div className="med-card" style={{ padding: '2rem' }}>
              <span className="med-season-tag">Best Weekend Retreat</span>
              <div style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(3.6rem, 6vw, 4.5rem)', fontWeight: 500, color: '#0f766e', lineHeight: 0.9, margin: '0.5rem 0 0.3rem' }}>6h</div>
              <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem' }}>by road</p>
              <p className="med-body" style={{ fontSize: '0.9rem' }}>Close enough for a weekend, high enough to feel like a real mountain reset.</p>
              <div style={{ marginTop: '1rem' }}>
                <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
                  <strong style={{ display: 'block', fontFamily: 'var(--font-inter), sans-serif', color: '#2B2A26' }}>Delhi / NCR</strong>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8rem', color: '#6b7280' }}>Leave after breakfast or early morning.</span>
                </div>
                <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
                  <strong style={{ display: 'block', fontFamily: 'var(--font-inter), sans-serif', color: '#2B2A26' }}>Chakrata</strong>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8rem', color: '#6b7280' }}>Arrive into deodar forest and cooler air.</span>
                </div>
                <div style={{ padding: '0.8rem 1rem' }}>
                  <strong style={{ display: 'block', fontFamily: 'var(--font-inter), sans-serif', color: '#2B2A26' }}>Retreat rhythm</strong>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8rem', color: '#6b7280' }}>Yoga, forest walks, meditation, rest.</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', color: '#6b7280' }}>✓ No flight required</span>
                <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', color: '#6b7280' }}>✓ Works for two or three days</span>
                <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', color: '#6b7280' }}>✓ Forest air at about 2,200 metres</span>
              </div>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Near Delhi Decision</span>
              </div>
              <h2 className="med-h2">Only have 2 days? <span>Choose Chakrata.</span></h2>
              <p className="med-body" style={{ fontSize: '0.85rem', fontWeight: 500, color: '#8a6a2f', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Why Chakrata leads for weekends</p>
              <p className="med-body" style={{ fontSize: '0.9rem' }}>For a two-day mountain wellness escape from Delhi, NCR or Chandigarh, <Link href="/retreats/chakrata" style={{ color: '#0f766e', fontWeight: 600 }}>Chakrata</Link> is the most time-efficient option. Six hours by road, no flight, no complex logistics. At 2,200 metres, it delivers immediate altitude relief — cool air, deodar forest, Himalayan quiet — the moment you arrive.</p>

              <div className="med-fact-grid" style={{ margin: '1rem 0' }}>
                <div className="med-fact-item">
                  <strong>Travel logic</strong>
                  <span>Short enough for a weekend, still far enough to feel like the mountains.</span>
                </div>
                <div className="med-fact-item">
                  <strong>Retreat rhythm</strong>
                  <span>Morning yoga, afternoon forest walks, evening meditation.</span>
                </div>
                <div className="med-fact-item">
                  <strong>Best user</strong>
                  <span>Delhi/NCR guests who need a reset without complex planning.</span>
                </div>
              </div>

              <p className="med-body" style={{ fontSize: '0.9rem' }}>Our <Link href="/retreats/weekend-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>weekend Himalayan retreats</Link> guide covers two-day and three-day formats across all locations. For options beyond Chakrata, including Rishikesh and Mussoorie, see the full <Link href="/retreats/retreats-near-delhi" style={{ color: '#0f766e', fontWeight: 600 }}>retreat near Delhi</Link> comparison.</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                <Link href="/retreats/weekend-himalayan-retreats" className="med-cta-btn" style={{ padding: '0.7rem 1.2rem', fontSize: '0.7rem' }}>View weekend retreats</Link>
                <Link href="/retreats/retreats-near-delhi" className="med-cta-outline" style={{ padding: '0.7rem 1.2rem', fontSize: '0.7rem' }}>Compare near Delhi options</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST RETREAT BY SEASON ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Best Retreat by Season</span>
          </div>
          <h2 className="med-h2">Match the retreat to <span>the mountain season.</span></h2>
          <p className="med-body">Season determines which locations are at their peak and which offer off-season value. Summer rewards altitude. Winter rewards access, clear mornings, and steadier retreat schedules.</p>

          <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
            {/* Summer */}
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="med-season-tag" style={{ marginBottom: 0 }}>April – June</span>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.2rem' }}>☀️</span>
                </div>
                <h3 className="med-h3" style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Summer retreat: Munsiyari / Sankri</h3>
                <div className="med-fact-grid" style={{ margin: '0.5rem 0' }}>
                  <div className="med-fact-item"><strong>Why</strong><span>Cool altitude while the plains heat up.</span></div>
                  <div className="med-fact-item"><strong>Feel</strong><span>Green valleys, snow views, forest air.</span></div>
                  <div className="med-fact-item"><strong>Best for</strong><span>Yoga, nature rest, mountain visibility.</span></div>
                </div>
                <p className="med-body" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}><strong>Summer (April to June).</strong> Munsiyari and <Link href="/retreats/sankri" style={{ color: '#0f766e', fontWeight: 600 }}>Sankri</Link> are at their best — green valleys, snow-peak views, temperatures between 15 and 25 degrees while the plains bake above 40.</p>
              </div>
              <Link href="/retreats/summer-himalayan-retreats" className="med-cta-btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.65rem', width: '100%', textAlign: 'center' }}>View summer retreats</Link>
            </div>

            {/* Winter */}
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="med-season-tag" style={{ marginBottom: 0 }}>October – February</span>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.2rem' }}>❄️</span>
                </div>
                <h3 className="med-h3" style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Winter retreat: Rishikesh</h3>
                <div className="med-fact-grid" style={{ margin: '0.5rem 0' }}>
                  <div className="med-fact-item"><strong>Why</strong><span>Reliable access and focused practice weather.</span></div>
                  <div className="med-fact-item"><strong>Feel</strong><span>Cool mornings, clear Ganges, quieter valley.</span></div>
                  <div className="med-fact-item"><strong>Avoid</strong><span>High-altitude closures and limited programs.</span></div>
                </div>
                <p className="med-body" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}><strong>Winter (October to February).</strong> Rishikesh is the strongest winter retreat destination — cool mornings sharpen yoga practice, the Ganges is at its clearest, and the valley is uncrowded after monsoon.</p>
              </div>
              <Link href="/retreats/winter-himalayan-retreats" className="med-cta-btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.65rem', width: '100%', textAlign: 'center' }}>View winter retreats</Link>
            </div>

            {/* Weekend / Chakrata */}
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="med-season-tag" style={{ marginBottom: 0 }}>March – Jun / Sep – Nov</span>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.2rem' }}>🌿</span>
                </div>
                <h3 className="med-h3" style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Weekend retreat: Chakrata</h3>
                <div className="med-fact-grid" style={{ margin: '0.5rem 0' }}>
                  <div className="med-fact-item"><strong>Why</strong><span>Near Delhi, forest altitude, and simple road access.</span></div>
                  <div className="med-fact-item"><strong>Feel</strong><span>Deodar shade, cool air, quiet mornings, slower evenings.</span></div>
                  <div className="med-fact-item"><strong>Best for</strong><span>Two-day resets when you cannot take a long retreat.</span></div>
                </div>
                <p className="med-body" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}><strong>Shoulder season and short breaks.</strong> Chakrata deserves its own seasonal lane because it works when time is the limit. Spring, early summer, and post-monsoon weekends give you cooler forest air without the travel commitment.</p>
              </div>
              <Link href="/retreats/chakrata" className="med-cta-btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.65rem', width: '100%', textAlign: 'center' }}>View Chakrata retreats</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO CHOOSE ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">How to Choose</span>
          </div>
          <h2 className="med-h2">Your retreat decision <span>matrix.</span></h2>
          <p className="med-body">Five factors determine the right retreat: duration, budget, effort, landscape, and travel time. Use them together, not separately.</p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="med-season-tag" style={{ marginBottom: 0 }}>Duration</span>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#0f766e' }}>01</span>
                </div>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}><strong>Duration.</strong> Two to three days: Chakrata or Rishikesh weekend format. Five to seven days: Rishikesh deep program, Munsiyari deep retreat, or Sankri wilderness stay. Ten days or more: teacher training, silent retreat, or extended personal practice.</p>
              </div>
            </div>
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="med-season-tag" style={{ marginBottom: 0 }}>Budget</span>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#0f766e' }}>02</span>
                </div>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}><strong>Budget.</strong> Chakrata and Sankri offer the most affordable mountain wellness experiences. Rishikesh spans every price bracket from ashram-basic to heritage-premium. Munsiyari skews toward the higher end due to its remote setting and limited rooms.</p>
              </div>
            </div>
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="med-season-tag" style={{ marginBottom: 0 }}>Effort</span>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#0f766e' }}>03</span>
                </div>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}><strong>Effort.</strong> For guided, instructor-led programs with daily schedules: Rishikesh. For self-directed rest with optional guided sessions: Chakrata or Munsiyari. For a blend of nature time and light wellness programming: Sankri.</p>
              </div>
            </div>
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="med-season-tag" style={{ marginBottom: 0 }}>Landscape</span>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#0f766e' }}>04</span>
                </div>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}><strong>Location preference.</strong> River energy: Rishikesh. Forest altitude: Chakrata. High-alpine solitude: Munsiyari. Wilderness valley: Sankri. Each landscape shapes the retreat experience deeply.</p>
              </div>
            </div>
            <div className="med-card med-card-equal" style={{ padding: '1.5rem', gridColumn: '1 / -1' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="med-season-tag" style={{ marginBottom: 0 }}>Travel Time</span>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#0f766e' }}>05</span>
                </div>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}><strong>Travel time.</strong> Five to six hours from Delhi: Rishikesh or Chakrata. Eight to nine hours: Sankri. Twelve hours or overnight: Munsiyari. Travel time is the most common limit — if you have only a weekend, your location is decided before you choose a program.</p>
              </div>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.5rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0, fontSize: '0.9rem' }}>
              <strong>See the complete retreat map.</strong> For a clear view of all options by location and program type, see the <Link href="/retreats/uttarakhand-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>Uttarakhand retreats</Link> overview and the main <Link href="/retreats/himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>Himalayan retreats in India</Link> directory.
            </p>
          </div>

          <div className="med-card" style={{ padding: '1.5rem', marginTop: '1.4rem' }}>
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Program style matters</span>
            </div>
            <p className="med-body" style={{ fontSize: '0.9rem' }}>Program styles vary clearly across locations. Rishikesh offers the widest range: Hatha yoga for alignment, Vinyasa for dynamic flow, pranayama-centred breathwork, and guided Vipassana-style silent retreats lasting three to ten days.</p>
            <p className="med-body" style={{ fontSize: '0.9rem' }}>Munsiyari and Sankri use a small retreat format. Groups are usually small, with a single lead teacher holding the full program flow. Silent-retreat schedules also reduce group social pressure.</p>
            <p className="med-body" style={{ fontSize: '0.9rem', marginBottom: 0 }}>Chakrata programs lean toward weekend-accessible gentle yoga and guided nature meditation rather than detailed technique training. Understanding the difference between ashram-style group instruction, private guidance, and self-directed silent retreats is the most important factor in choosing well.</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Common Questions</span>
          </div>
          <h2 className="med-h2">Final questions before <span>you choose.</span></h2>
          <p className="med-body">These answers clarify the most common decision points: yoga location, near-Delhi access, Munsiyari versus Rishikesh, summer timing, beginner suitability, and ideal retreat duration.</p>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell" style={{ background: '#f7f9f7', padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-nav-grid">
            <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Retreats</span>
            </Link>
            <Link href="/retreats/uttarakhand-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Uttarakhand Retreats</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/retreats/himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Himalayan Retreats</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/find-your-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Find Your Retreat</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
          </div>
        </div>
      </nav>
    </TrackedPage>
  );
}
