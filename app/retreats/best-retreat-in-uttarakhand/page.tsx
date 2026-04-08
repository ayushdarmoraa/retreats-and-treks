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
    title: '10 Best Retreats in Uttarakhand (2026 Guide) — Yoga, Luxury & Weekend Picks',
    description:
      'Looking for the best retreat in Uttarakhand? Compare yoga retreats in Rishikesh, luxury escapes in Munsiyari, weekend resets near Delhi and seasonal Himalayan wellness programs — ranked by purpose and budget.',
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
        'Looking for the best retreat in Uttarakhand? Compare yoga retreats in Rishikesh, luxury escapes in Munsiyari, weekend resets near Delhi and seasonal Himalayan wellness programs.',
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
      'Looking for the best retreat in Uttarakhand? Compare yoga retreats in Rishikesh, luxury escapes in Munsiyari, weekend resets near Delhi and seasonal Himalayan wellness programs — ranked by purpose and budget.',
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
    position: relative;
    background: #f7f9f7;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    padding: 5rem 0 4rem;
    overflow: hidden;
  }

  /* subtle top green rule */
  .bru-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, var(--color-primary) 30%, var(--color-primary) 70%, transparent 100%);
    
  }

  /* faint mountain silhouette — purely decorative */
  .bru-hero::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 120px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath d='M0,120 L0,80 L120,40 L240,65 L360,20 L480,55 L600,10 L720,45 L840,15 L960,50 L1080,25 L1200,60 L1320,35 L1440,70 L1440,120 Z' fill='%230f766e' fill-opacity='0.04'/%3E%3C/svg%3E");
    background-size: 100% 100%;
    pointer-events: none;
  }

  .bru-hero-inner {
    max-width: 56rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
    position: relative;
    z-index: 1;
  }

  /* eyebrow */
  .bru-eyebrow {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  .bru-eyebrow-line {
    width: 24px;
    height: 1px;
    background: var(--color-primary);
    
    flex-shrink: 0;
  }
  .bru-eyebrow-text {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #374151;
  }

  /* h1 */
  .bru-h1 {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: clamp(1.6rem, 3.2vw, 2.4rem);
    font-weight: 200;
    letter-spacing: -0.03em;
    line-height: 1.15;
    color: #111111;
    margin: 0 0 1.5rem 0;
    max-width: 44rem;
  }

  .bru-h1 em {
    font-style: normal;
    color: #374151;
    font-weight: 200;
  }

  /* lead text */
  .bru-lead {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.93rem;
    font-weight: 300;
    line-height: 1.85;
    color: #555555;
    margin: 0 0 1rem 0;
    max-width: 42rem;
  }

  /* pill tags row */
  .bru-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1.75rem;
  }
  .bru-tag {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    padding: 3px 10px;
    border-radius: 100px;
    background: rgba(15,118,110,0.08);
    color: #374151;
    border: 1px solid rgba(15,118,110,0.15);
  }

  /* thin divider below */
  .bru-hero-divider {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(15,118,110,0.15) 20%, rgba(15,118,110,0.15) 80%, transparent 100%);
    margin-top: 4rem;
  }
`}</style>

<header className="bru-hero">
  <div className="bru-hero-inner">

    <div className="bru-eyebrow">
      <span className="bru-eyebrow-line" />
      <span className="bru-eyebrow-text">Ranked Guide · 2026</span>
    </div>

    <h1 className="bru-h1">
      Best Retreats in Uttarakhand: Top Mountain Wellness Escapes{' '}
      <em>Ranked by Purpose</em> &amp; Season
    </h1>

    <p className="bru-lead">
      Uttarakhand is India&rsquo;s most concentrated mountain wellness region —
      but the &ldquo;best&rdquo; retreat depends entirely on your goal. A yoga
      immersion in Rishikesh feels different from alpine seclusion in Munsiyari
      or a short forest reset in Chakrata.
    </p>
    <p className="bru-lead" style={{ margin: 0 }}>
      This ranked guide compares the best retreats in Uttarakhand by purpose,
      season, duration and budget. Whether you want structured daily yoga, silent
      meditation, a luxury mountain escape or a two-day reset near Delhi,
      you&rsquo;ll find the right retreat category below.
    </p>

    <div className="bru-tags">
      {['Yoga', 'Meditation', 'Luxury', 'Weekend Escapes', 'Near Delhi', 'Summer', 'Winter'].map((tag) => (
        <span key={tag} className="bru-tag">{tag}</span>
      ))}
    </div>

  </div>
</header>

<div className="bru-hero-divider" />

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
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background:  #f7f9f7;
    padding: 5rem 0;
  }
  .bru-cmp-inner {
    max-width: 56rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
  .bru-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.88rem;
    line-height: 1.7;
  }
  .bru-table thead tr {
    border-bottom: 1px solid rgba(15,118,110,0.2);
  }
  .bru-table th {
    text-align: left;
    padding: 0.75rem 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #374151;
  }
  .bru-table tbody tr {
    border-bottom: 1px solid rgba(15,118,110,0.07);
    transition: background 0.2s ease;
    cursor: default;
  }
  .bru-table tbody tr:hover {
    background: rgba(15,118,110,0.03);
  }
  .bru-table tbody tr:hover .bru-td-cat {
    color: #374151;
  }
  .bru-td-cat {
    padding: 0.85rem 1rem;
    font-weight: 400;
    color: #222222;
    font-size: 0.88rem;
    transition: color 0.2s;
    width: 55%;
  }
  .bru-td-opt {
    padding: 0.85rem 1rem;
    font-weight: 300;
    color: #666666;
    font-size: 0.85rem;
  }
  .bru-td-opt-pill {
    display: inline-block;
    background: rgba(15,118,110,0.07);
    color: #374151;
    font-size: 0.72rem;
    font-weight: 500;
    padding: 2px 10px;
    border-radius: 100px;
    letter-spacing: 0.02em;
  }
`}</style>

<section className="bru-cmp scroll-fade" style={{ marginBottom: 0 }}>
  <div className="bru-cmp-inner">

    {/* eyebrow */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151'}}>
        At a Glance
      </span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      marginBottom: '1rem',
      lineHeight: 1.15,
    }}>
      Quick Comparison — Best Retreats by Category
    </h2>

    <p style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.88rem',
      fontWeight: 300,
      lineHeight: 1.85,
      color: '#555555',
      marginBottom: '2rem',
      maxWidth: '42rem',
    }}>
      The table below maps each retreat objective to its strongest location. These
      are not interchangeable — a yoga retreat in Rishikesh and a luxury retreat in
      Munsiyari serve fundamentally different needs even though both fall under
      &ldquo;Himalayan retreat.&rdquo; Skim the category that matches your intent,
      then read the detailed section below.
    </p>

    <div style={{ overflowX: 'auto' }}>
      <table className="bru-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Best Option</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Best Yoga Retreat', 'Rishikesh'],
            ['Best Meditation Retreat', 'Rishikesh / Munsiyari'],
            ['Best Luxury Retreat', 'Munsiyari'],
            ['Best Weekend Retreat', 'Chakrata'],
            ['Best Retreat Near Delhi', 'Chakrata / Rishikesh'],
            ['Best Summer Retreat', 'Munsiyari / Sankri'],
            ['Best Winter Retreat', 'Rishikesh'],
          ].map(([category, option]) => (
            <tr key={category}>
              <td className="bru-td-cat">{category}</td>
              <td className="bru-td-opt">
                <span className="bru-td-opt-pill">{option}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #f7f9f7;
    padding: 5rem 0;
  }
  .bru-yoga-inner {
    max-width: 56rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
`}</style>

<section className="bru-yoga scroll-fade">
  <div className="bru-yoga-inner">

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151'}}>
        Best Yoga Retreat
      </span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      marginBottom: '0.5rem',
      lineHeight: 1.15,
    }}>
      Best Yoga Retreat — Rishikesh
    </h2>

    <h3 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.78rem',
      fontWeight: 500,
      letterSpacing: '0.06em',
      color: '#888888',
      marginBottom: '1.5rem',
      textTransform: 'uppercase',
    }}>
      Why Rishikesh Leads for Yoga
    </h3>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
      Rishikesh is the undisputed centre of yoga retreat culture in northern India.
      The concentration of certified instructors, the range of styles (Hatha,
      Vinyasa, Ashtanga, Yin, Kundalini), and the Ganges-side practice settings
      make it the default choice for anyone whose primary retreat goal is yoga. Our{' '}
      <Link href="/retreats/yoga-retreat-rishikesh" style={{ color: '#374151' }}>
        yoga retreat in Rishikesh
      </Link>{' '}
      guide covers structure, scheduling, and instructor profiles in detail.
    </p>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
      Rishikesh yoga programs run year-round. Winter mornings are cool and focused.
      Monsoon (July to September) limits some outdoor sessions but deepens the
      contemplative atmosphere. Spring and autumn are peak seasons — clear weather,
      moderate temperatures, and the river at its cleanest.
    </p>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
      For yoga practice combined with mountain altitude and forest immersion rather
      than river-valley energy, see the broader{' '}
      <Link href="/retreats/yoga-retreat-uttarakhand" style={{ color: '#374151' }}>
        yoga retreat in Uttarakhand
      </Link>{' '}
      overview, which includes Chakrata and Sankri options alongside Rishikesh.
    </p>

  </div>
</section>

        {/* ── MEDITATION ────────────────────────────────────────────── */}
<style>{`
  .bru-med {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #ffffff;
    padding: 5rem 0;
  }
  .bru-med-inner {
    max-width: 56rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
`}</style>

<section className="bru-med scroll-fade">
  <div className="bru-med-inner">

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151'}}>
        Best Meditation Retreat
      </span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      marginBottom: '0.5rem',
      lineHeight: 1.15,
    }}>
      Best Meditation Retreat — Mountain &amp; River Options
    </h2>

    <h3 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.78rem',
      fontWeight: 500,
      letterSpacing: '0.06em',
      color: '#888888',
      marginBottom: '1.5rem',
      textTransform: 'uppercase',
    }}>
      River Stillness vs Alpine Silence
    </h3>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
      Meditation retreats split into two distinct experiences in Uttarakhand.{' '}
      <Link href="/retreats/rishikesh" style={{ color: '#374151' }}>
        Rishikesh
      </Link>{' '}
      offers structured programs: guided Vipassana, mindfulness courses, silent
      retreats with group support, and ashram-based practice rooted in decades of
      lineage. The{' '}
      <Link href="/retreats/meditation-retreat-rishikesh" style={{ color: '#374151' }}>
        meditation retreat in Rishikesh
      </Link>{' '}
      guide covers these programs in detail.
    </p>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
      <Link href="/retreats/munsiyari" style={{ color: '#374151' }}>
        Munsiyari
      </Link>{' '}
      offers something different — altitude silence. At 2,200 metres facing the
      Panchachuli massif, Munsiyari provides natural stillness that no guided
      session can replicate. Fewer visitors, thinner air, wider horizons. Meditation
      here is landscape-driven rather than instructor-driven. It suits experienced
      practitioners or anyone seeking genuine seclusion.
    </p>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
      For a complete view across all meditation-friendly locations, see{' '}
      <Link href="/retreats/meditation-retreat-uttarakhand" style={{ color: '#374151' }}>
        meditation retreats in Uttarakhand
      </Link>
      .
    </p>

  </div>
</section>

        {/* ── LUXURY ────────────────────────────────────────────────── */}
<style>{`
  .bru-lux {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #f7f9f7;
    padding: 5rem 0;
  }
  .bru-lux-inner {
    max-width: 56rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
`}</style>

<section className="bru-lux scroll-fade">
  <div className="bru-lux-inner">

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151'}}>
        Best Luxury Retreat
      </span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      marginBottom: '0.5rem',
      lineHeight: 1.15,
    }}>
      Best Luxury Retreat — Alpine Seclusion
    </h2>

    <h3 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.78rem',
      fontWeight: 500,
      letterSpacing: '0.06em',
      color: '#888888',
      marginBottom: '1.5rem',
      textTransform: 'uppercase',
    }}>
      Why Munsiyari Leads for Luxury
    </h3>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
      Luxury in the Himalayas is not about marble lobbies — it is about privacy,
      views, curated programming, and the absence of crowds. Munsiyari leads this
      category. Its combination of Panchachuli panoramas, limited visitor volume,
      and premium accommodation creates a retreat experience closer to alpine
      seclusion than mainstream hospitality.
    </p>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
      The{' '}
      <Link href="/retreats/luxury-himalayan-retreats" style={{ color: '#374151' }}>
        luxury Himalayan retreats
      </Link>{' '}
      guide compares premium options across all locations — Munsiyari for
      alpine exclusivity, Rishikesh for heritage luxury, and Sankri for
      off-grid wilderness comfort. If your primary criterion is quality of
      accommodation and curated experience rather than program intensity, start
      there.
    </p>

  </div>
</section>

        {/* ── WEEKEND ───────────────────────────────────────────────── */}
<style>{`
  .bru-wknd {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #ffffff;
    padding: 5rem 0;
  }
  .bru-wknd-inner {
    max-width: 56rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
`}</style>

<section className="bru-wknd scroll-fade">
  <div className="bru-wknd-inner">

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151'}}>
        Best Weekend Retreat
      </span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      marginBottom: '0.5rem',
      lineHeight: 1.15,
    }}>
      Best Weekend Retreat Near Delhi
    </h2>

    <h3 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.78rem',
      fontWeight: 500,
      letterSpacing: '0.06em',
      color: '#888888',
      marginBottom: '1.5rem',
      textTransform: 'uppercase',
    }}>
      Why Chakrata Leads for Weekends
    </h3>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1rem' }}>
      For a two-day mountain wellness escape from Delhi, NCR or Chandigarh,{' '}
      <Link href="/retreats/chakrata" style={{ color: '#374151' }}>
        Chakrata
      </Link>{' '}
      is the most time-efficient option. Six hours by road, no flight, no complex
      logistics. At 2,200 metres, it delivers immediate altitude relief — cool air,
      deodar forest, Himalayan quiet — the moment you arrive. Morning yoga, afternoon
      forest walks, evening meditation. A weekend is enough to feel the shift.
    </p>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
      Our{' '}
      <Link href="/retreats/weekend-himalayan-retreats" style={{ color: '#374151' }}>
        weekend Himalayan retreats
      </Link>{' '}
      guide covers two-day and three-day formats across all locations. For options
      beyond Chakrata, including Rishikesh and Mussoorie, see the full{' '}
      <Link href="/retreats/retreats-near-delhi" style={{ color: '#374151' }}>
        retreat near Delhi
      </Link>{' '}
      comparison.
    </p>

  </div>
</section>

        {/* ── BY SEASON ─────────────────────────────────────────────── */}
<style>{`
  .bru-season {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #f7f9f7;
    padding: 5rem 0;
  }
  .bru-season-inner {
    max-width: 56rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
  .bru-season-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
  }
  @media (max-width: 640px) {
    .bru-season-cards { grid-template-columns: 1fr; }
  }
  .bru-season-card {
    background: #ffffff;
    border: 1px solid rgba(15,118,110,0.1);
    border-top: 2px solid var(--color-primary);
    padding: 1.75rem;
    position: relative;
  }
  .bru-season-card-label {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #374151;
    margin-bottom: 0.75rem;
    display: block;
  }
  .bru-season-card p {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.85;
    color: #555555;
    margin: 0;
  }
  .bru-season-card strong {
    font-weight: 500;
    color: #222222;
  }
`}</style>

<section className="bru-season">
  <div className="bru-season-inner">

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151'}}>
        Best Retreat by Season
      </span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      marginBottom: '0.5rem',
      lineHeight: 1.15,
    }}>
      Best Retreat by Season
    </h2>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: 0 }}>
      Season determines which locations are at their peak and which offer off-season value.
    </p>

    <div className="bru-season-cards sf-stagger">

      <div className="bru-season-card">
        <span className="bru-season-card-label">April – June</span>
        <p>
          <strong>Summer (April to June).</strong> Munsiyari and{' '}
          <Link href="/retreats/sankri" style={{ color: '#374151' }}>
            Sankri
          </Link>{' '}
          are at their best —
          green valleys, snow-peak views, temperatures between 15 and 25 degrees while
          the plains bake above 40. High-altitude summer retreats combine forest bathing,
          yoga, and the clearest mountain visibility of the year. See{' '}
          <Link href="/retreats/summer-himalayan-retreats" style={{ color: '#374151' }}>
            summer Himalayan retreats
          </Link>{' '}
          for full seasonal options.
        </p>
      </div>

      <div className="bru-season-card">
        <span className="bru-season-card-label">October – February</span>
        <p>
          <strong>Winter (October to February).</strong> Rishikesh is the strongest
          winter retreat destination — cool mornings sharpen yoga practice, the Ganges
          is at its clearest, and the valley is uncrowded after monsoon. Chakrata offers
          cold-air forest stillness with occasional frost. High-altitude locations
          (Munsiyari, Sankri) close or operate limited winter programs. See{' '}
          <Link href="/retreats/winter-himalayan-retreats" style={{ color: '#374151' }}>
            winter Himalayan retreats
          </Link>{' '}
          for details.
        </p>
      </div>

    </div>

  </div>
</section>

        {/* ── HOW TO CHOOSE ─────────────────────────────────────────── */}
<style>{`
  .bru-htc {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #ffffff;
    padding: 5rem 0;
  }
  .bru-htc-inner {
    max-width: 56rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
  .bru-htc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: rgba(15,118,110,0.08);
    border: 1px solid rgba(15,118,110,0.08);
    margin: 2rem 0;
  }
  @media (max-width: 640px) {
    .bru-htc-grid { grid-template-columns: 1fr; }
  }
  .bru-htc-cell {
    background: #ffffff;
    padding: 1.75rem;
    position: relative;
    transition: background 0.2s;
  }
  .bru-htc-cell:hover {
    background: rgba(15,118,110,0.02);
  }
  .bru-htc-cell-label {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #374151;
    display: block;
    margin-bottom: 0.6rem;
  }
  .bru-htc-cell p {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.85;
    color: #555555;
    margin: 0;
  }
  .bru-htc-cell strong {
    font-weight: 500;
    color: #222222;
  }
  .bru-htc-note {
    border-left: 3px solid rgba(15,118,110,0.25);
    padding: 1.25rem 1.5rem;
    background: rgba(15,118,110,0.02);
    margin-top: 0;
  }
  .bru-htc-note p {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.85;
    color: #555555;
    margin: 0;
  }
`}</style>

<section className="bru-htc scroll-fade">
  <div className="bru-htc-inner">

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151'}}>
        How to Choose
      </span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      marginBottom: '0.5rem',
      lineHeight: 1.15,
    }}>
      How to Choose the Best Retreat for You
    </h2>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: 0 }}>
      Five dimensions determine the right retreat.
    </p>

    <div className="bru-htc-grid sf-stagger">
      {[
        { label: 'Duration', content: <><strong>Duration.</strong> Two to three days: Chakrata or Rishikesh weekend format. Five to seven days: Rishikesh deep program, Munsiyari immersion, or Sankri wilderness stay. Ten days or more: teacher training, silent retreat, or extended personal practice.</> },
        { label: 'Budget', content: <><strong>Budget.</strong> Chakrata and Sankri offer the most affordable mountain wellness experiences. Rishikesh spans every price bracket from ashram-basic to heritage-premium. Munsiyari skews toward the higher end due to its exclusivity and limited capacity.</> },
        { label: 'Intensity', content: <><strong>Intensity.</strong> For structured, instructor-led programs with daily schedules: Rishikesh. For self-directed rest with optional guided sessions: Chakrata or Munsiyari. For a blend of nature immersion and light wellness programming: Sankri.</> },
        { label: 'Location Preference', content: <><strong>Location preference.</strong> River energy: Rishikesh. Forest altitude: Chakrata. High-alpine solitude: Munsiyari. Wilderness valley: Sankri. Each landscape shapes the retreat experience at a fundamental level.</> },
        { label: 'Travel Time', content: <><strong>Travel time.</strong> Five to six hours from Delhi: Rishikesh or Chakrata. Eight to nine hours: Sankri. Twelve hours or overnight: Munsiyari. Travel time is the most common constraint — if you have only a weekend, your location is decided before you choose a program.</> },
      ].map(({ label, content }) => (
        <div key={label} className="bru-htc-cell">
          <span className="bru-htc-cell-label">{label}</span>
          <p>{content}</p>
        </div>
      ))}

      {/* last cell — links para */}
      <div className="bru-htc-cell">
        <span className="bru-htc-cell-label">All Options</span>
        <p>
          For a structured view of all options by location and program type, see the{' '}
          <Link href="/retreats/uttarakhand-retreats" style={{ color: '#374151' }}>
            Uttarakhand retreats
          </Link>{' '}
          overview and the main{' '}
          <Link href="/retreats/himalayan-retreats" style={{ color: '#374151' }}>
            Himalayan retreats in India
          </Link>{' '}
          directory.
        </p>
      </div>
    </div>

    <div className="bru-htc-note">
      <p>
        Program styles vary significantly across locations. Rishikesh offers the widest spectrum — Hatha yoga for alignment-focused practice, Vinyasa for dynamic flow, pranayama-centred breathwork intensives, and structured Vipassana-style silent immersion programs lasting three to ten days. Munsiyari and Sankri operate on a boutique retreat format: small groups of four to eight, private facilitator models where a single lead practitioner holds the entire program arc, and silent-immersion scheduling that eliminates group social pressure. Chakrata programs lean toward weekend-accessible gentle yoga and guided nature meditation rather than intensive technique training. Understanding the distinction between ashram-style group instruction, boutique private facilitation, and self-directed silent retreats is the single most important factor in choosing well.
      </p>
    </div>

  </div>
</section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
<section className="bru-faq scroll-fade" style={{
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  padding: '6rem 0',
}}>
  <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 var(--space-md, 1.5rem)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151'}}>FAQ</span>
    </div>
    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      marginBottom: 'var(--space-lg)',
      lineHeight: 1.15,
    }}>
      Frequently Asked Questions
    </h2>
    <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
  </div>
</section>

      </article>
    </TrackedPage>
  );
}
