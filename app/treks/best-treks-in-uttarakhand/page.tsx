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

const PATH = '/treks/best-treks-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title:
      '10 Best Treks in Uttarakhand (3,000–4,800m) — Difficulty, Season & Guide | Retreats And Treks',
    description:
      'Compare the 10 best treks in Uttarakhand — Brahmatal, Kuari Pass, Roopkund, Pangarchulla and more. See altitude, difficulty, best season and trek duration to choose the right Himalayan route.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: '10 Best Treks in Uttarakhand (3,000–4,800m) — Difficulty, Season & Guide',
      description:
        'Compare the 10 best treks in Uttarakhand — Brahmatal, Kuari Pass, Roopkund, Pangarchulla and more. See altitude, difficulty, best season and trek duration to choose the right Himalayan route.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('10 Best Treks in Uttarakhand (3,000–4,800m) — Difficulty, Season & Guide'),
    },
  };
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  FAQ                                                                      */
/* ────────────────────────────────────────────────────────────────────────── */

const FAQ_ITEMS = [
  {
    question: 'What are the best treks in Uttarakhand for beginners in 2026?',
    answer:
      'The three best beginner treks in Uttarakhand are Brahmatal (3,850 m, 4 days from Lohajung — a moderate winter snow trek with no technical sections), Kuari Pass (3,876 m, 5 days from Joshimath — a panoramic ridge walk on the Lord Curzon Trail), and Khaliya Top (3,500 m, 3–4 days from Munsiyari — a short summit trek with Panchachuli views). For day treks, the Tiger Fall trail in Chakrata requires no prior experience and is completable in a single day.',
  },
  {
    question: 'Which is the best snow trek in Uttarakhand?',
    answer:
      'Brahmatal is the best snow trek for most trekkers — a 4-day moderate route to a frozen alpine lake at 3,850 m with views of Trishul and Nanda Ghunti. Best from December to March. Kedarkantha (3,810 m from Sankri) is the most popular winter summit trek with a steep final-day push through deep snow. Both are accessible to fit beginners. For experienced trekkers, Pangarchulla offers a challenging snow-and-scree summit at 4,590 m in March–May.',
  },
  {
    question: 'What is the hardest trek in Uttarakhand?',
    answer:
      'Roopkund is the hardest featured trek — a 7-day, 53 km expedition to a glacial lake at 4,800 m with sustained high-altitude exposure, moraine crossings, and unpredictable weather above 4,000 m. Pangarchulla Peak (4,590 m) is also challenging, requiring an alpine-start summit push through steep snow. Both demand 6–8 weeks of fitness preparation and prior high-altitude experience above 4,000 m. The Milam Glacier trek in Kumaon is the longest at 8–10 days.',
  },
  {
    question: 'How do I choose between Garhwal and Kumaon treks?',
    answer:
      'Garhwal (Lohajung and Joshimath bases) offers higher altitudes (3,850–4,800 m), dramatic Nanda Devi panoramas, and glacier-lake terrain — best for trekkers seeking classic Himalayan routes. Kumaon (Munsiyari base) offers remoteness, cultural depth (abandoned trade villages on the Milam Glacier route), and fewer crowds. Garhwal routes have better guide infrastructure and shorter approach drives. Kumaon routes reward patience and expedition mindset. Most trekkers start in Garhwal and explore Kumaon later.',
  },
  {
    question: 'When is the best time to trek in Uttarakhand?',
    answer:
      'October to November is the best overall window — clear skies, dry trails, and peak Himalayan visibility across all regions. For snow treks, December to March (Brahmatal, Kedarkantha). For valley treks and high-altitude expeditions, May to June (Har Ki Dun, Roopkund, Milam Glacier). September to October is the post-monsoon sweet spot for Roopkund and Kuari Pass. Monsoon (July–August) closes all high-altitude routes.',
  },
  {
    question: 'Can I trek in Uttarakhand without a guide?',
    answer:
      'Short Chakrata trails (Tiger Fall, Budher Caves) can be done independently. All multi-day treks above 3,000 m should be done with guided operators — the routes are remote, rescue infrastructure is minimal, and weather changes rapidly at altitude. Guided treks include permits, safety equipment, meals, and local knowledge. Roopkund, Pangarchulla, and Milam Glacier should never be attempted independently.',
  },
  {
    question: 'What is the cheapest trek in Uttarakhand?',
    answer:
      'The Tiger Fall day trek in Chakrata is the most affordable — no guide fees, no camping equipment, and no multi-day food costs. Among guided multi-day treks, Kedarkantha (4 days from Sankri) typically offers the best value due to short duration, established infrastructure, and high group-departure availability. Longer expeditions like Roopkund (7 days) and Milam Glacier (8–10 days) cost more due to extended camping, porters, and permit processing.',
  },
  {
    question: 'Which Uttarakhand trek has the best views?',
    answer:
      'Kuari Pass delivers the highest view-to-effort ratio — near-continuous panoramas of Nanda Devi (7,816 m), Dronagiri, Chaukhamba, and Kamet across 5 days of ridge walking at moderate difficulty. For a single summit panorama, Pangarchulla offers 360° views from 4,590 m. For valley-and-range beauty, the Har Ki Dun alpine meadow amphitheatre is unmatched. Each delivers a different kind of visual reward.',
  },
];

/* ────────────────────────────────────────────────────────────────────────── */
/*  PAGE                                                                     */
/* ────────────────────────────────────────────────────────────────────────── */

export default function BestTreksInUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  /* ── structured data ─────────────────────────────────────────────────── */

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Best Treks in Uttarakhand', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best Treks in Uttarakhand — Beginner to High-Altitude Guide',
    description:
      'A curated guide to the 10 best treks in Uttarakhand across Garhwal, Kumaon, Sankri and Chakrata — ranked by difficulty, altitude and season.',
    url: canonicalUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: 10,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Brahmatal Trek (3,850 m)',
          url: buildCanonicalUrl('/treks/location/lohajung/brahmatal-trek'),
          description: 'Moderate winter snow trek to a frozen alpine lake. 4 days from Lohajung.',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Kuari Pass Trek (3,876 m)',
          url: buildCanonicalUrl('/treks/location/joshimath/kuari-pass-trek'),
          description: 'Panoramic ridge walk on the Lord Curzon Trail. 5 days from Joshimath.',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Kedarkantha Trek (3,810 m)',
          url: buildCanonicalUrl('/treks/location/sankri/kedarkantha-trek'),
          description: 'Classic winter summit trek with 360° Himalayan views. 5 days from Sankri.',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Har Ki Dun Trek (3,566 m)',
          url: buildCanonicalUrl('/treks/location/sankri/har-ki-dun-trek'),
          description: 'Valley trek through alpine meadows and traditional villages. 5 days from Sankri.',
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Khaliya Top Trek (3,500 m)',
          url: buildCanonicalUrl('/treks/location/munsiyari/khaliya-top-trek'),
          description: 'Short summit trek with 180° Panchachuli panorama. 3–4 days from Munsiyari.',
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: 'Roopkund Trek (4,800 m)',
          url: buildCanonicalUrl('/treks/location/lohajung/roopkund-trek'),
          description: 'Challenging expedition to the mystery skeleton lake. 7 days from Lohajung.',
        },
        {
          '@type': 'ListItem',
          position: 7,
          name: 'Pangarchulla Peak Trek (4,590 m)',
          url: buildCanonicalUrl('/treks/location/joshimath/pangarchulla-trek'),
          description: 'True summit climb with alpine-start snow push. 6 days from Joshimath.',
        },
        {
          '@type': 'ListItem',
          position: 8,
          name: 'Milam Glacier Trek (3,450 m)',
          url: buildCanonicalUrl('/treks/location/munsiyari/milam-glacier-trek'),
          description: 'Remote glacier expedition along the ancient Johar trade route. 8–10 days from Munsiyari.',
        },
        {
          '@type': 'ListItem',
          position: 9,
          name: 'Tiger Fall Trek',
          url: buildCanonicalUrl('/treks/location/chakrata/tiger-fall-trek'),
          description: 'Easy day trek through deodar forest to a major Himalayan waterfall.',
        },
        {
          '@type': 'ListItem',
          position: 10,
          name: 'Budher Caves Trek',
          url: buildCanonicalUrl('/treks/location/chakrata/budher-caves-trek'),
          description: 'Easy forest trek to ancient limestone caves near Chakrata.',
        },
      ],
    },
  };

  return (
    <TrackedPage
      page={PATH}
      style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionSchema, breadcrumbSchema, faqSchema]),
        }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Treks', href: '/treks' },
          { name: 'Best Treks in Uttarakhand' },
        ]}
      />

      <article>

        {/* ── HERO ── */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const,
        color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7,
      }}>Trekking Guide · Uttarakhand</span>
    </div>
    <h1 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
      fontWeight: 200, letterSpacing: '-0.035em',
      color: '#111111', lineHeight: 1.1, margin: '0 0 1.75rem',
    }}>
      Best Treks in Uttarakhand: Beginner to High-Altitude Guide
    </h1>
    <p style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85,
      color: '#555555', margin: '0 0 1rem',
    }}>
      Uttarakhand stretches from the foothills north of Delhi to the highest peaks in India — Nanda Devi at 7,816 metres, Kamet, Chaukhamba, and the Panchachuli massif. Across four distinct trekking regions, the state offers a complete spectrum of Himalayan experiences: frozen lake traverses in winter, panoramic ridge walks in spring, remote glacier expeditions in summer, and weekend forest trails accessible year-round.
    </p>
    <p style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85,
      color: '#555555', margin: 0,
    }}>
      This guide covers the 10 best treks across{' '}
      <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Garhwal</Link>,{' '}
      Kumaon, Sankri and Chakrata — ranked by difficulty, altitude, season and the kind of mountain experience each delivers. Whether you are planning your first Himalayan trek or your tenth, the right route depends on three variables: when you are going, how many days you have, and what you want from the mountains.
    </p>
  </div>
</section>

{/* ── TABLE OF CONTENTS ── */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const,
        color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7,
      }}>In This Guide</span>
    </div>
    <style>{`
      .toc-item {
        display: flex; align-items: center; gap: 1rem;
        padding: 0.85rem 0;
        border-bottom: 1px solid #e5e7eb;
        text-decoration: none;
        font-family: var(--font-geist-sans), sans-serif;
        font-size: 0.88rem; font-weight: 300; color: #333333;
        transition: color 0.2s;
      }
      .toc-item:last-child { border-bottom: none; }
      .toc-item:hover { color: var(--color-primary); }
      .toc-num {
        font-size: 0.55rem; font-weight: 600;
        letter-spacing: 0.18em; color: var(--color-primary);
        opacity: 0.6; flex-shrink: 0; width: 1.5rem;
      }
    `}</style>
    <nav aria-label="Table of contents">
      {[
        { href: '#beginner-treks', label: 'Beginner-Friendly Treks' },
        { href: '#moderate-treks', label: 'Moderate Multi-Day Treks' },
        { href: '#challenging-treks', label: 'Challenging High-Altitude Treks' },
        { href: '#snow-treks', label: 'Best Snow Treks' },
        { href: '#high-altitude', label: 'High-Altitude Treks Above 4,000 m' },
        { href: '#regions', label: 'Trekking Regions in Uttarakhand' },
        { href: '#progression', label: 'The Trekking Progression Path' },
        { href: '#how-to-choose', label: 'How to Choose the Right Trek' },
      ].map((item, i) => (
        <a key={item.href} href={item.href} className="toc-item">
          <span className="toc-num">{String(i + 1).padStart(2, '0')}</span>
          {item.label}
        </a>
      ))}
    </nav>
  </div>
</section>

<PrimaryCTA
  label="Plan My Uttarakhand Trek"
  subtext="Tell us your dates, fitness level and preferred difficulty. We will match you to the right route."
  vertical="trek"
  category="apex"
  sourcePath={PATH}
/>
        {/* ── MASTER COMPARISON TABLE ── */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
}}>
  <style>{`
    .trek-table thead tr { border-bottom: 2px solid #e5e7eb; }
    .trek-table th {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.55rem; font-weight: 600;
      letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--color-primary); opacity: 0.7;
      padding: 0.75rem 1rem; text-align: left;
    }
    .trek-table td {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.84rem; font-weight: 300;
      color: #444444; padding: 0.75rem 1rem;
      border-bottom: 1px solid #f0f0f0;
    }
    .trek-table tbody tr:last-child td { border-bottom: none; }
    .trek-table tbody tr:hover td { background: #f7f9f7; }
    .diff-easy {
      font-size: 0.6rem; font-weight: 600; letter-spacing: 0.12em;
      text-transform: uppercase; border-radius: 100px;
      padding: 2px 10px; display: inline-block;
      color: #555; background: #f0f0f0; border: 1px solid #e0e0e0;
    }
    .diff-moderate {
      font-size: 0.6rem; font-weight: 600; letter-spacing: 0.12em;
      text-transform: uppercase; border-radius: 100px;
      padding: 2px 10px; display: inline-block;
      color: var(--color-primary);
      background: rgba(15,118,110,0.07);
      border: 1px solid rgba(15,118,110,0.2);
    }
    .diff-challenging {
      font-size: 0.6rem; font-weight: 600; letter-spacing: 0.12em;
      text-transform: uppercase; border-radius: 100px;
      padding: 2px 10px; display: inline-block;
      color: #e65100;
      background: rgba(230,81,0,0.07);
      border: 1px solid rgba(230,81,0,0.2);
    }
    .filter-pill {
      display: inline-block; padding: 0.4rem 0.85rem;
      border-radius: 100px;
      border: 1px solid var(--color-primary);
      color: var(--color-primary);
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.72rem; font-weight: 500;
      letter-spacing: 0.08em;
      text-decoration: none;
      transition: background 0.2s, color 0.2s;
    }
    .filter-pill:hover { background: var(--color-primary); color: #ffffff; }
  `}</style>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Trek Comparison</span>
    </div>
    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200, letterSpacing: '-0.03em',
      color: '#111111', lineHeight: 1.15, marginBottom: '2rem',
    }}>All 10 Treks at a Glance</h2>

    <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '1.75rem' }}>
      <table className="trek-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Trek</th>
            <th>Altitude</th>
            <th>Difficulty</th>
            <th>Days</th>
            <th>Best Season</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {[
            { href: '/treks/location/lohajung/brahmatal-trek', name: 'Brahmatal', alt: '3,850 m', diff: 'Moderate', days: '4', season: 'Dec–Mar', region: 'Garhwal' },
            { href: '/treks/location/joshimath/kuari-pass-trek', name: 'Kuari Pass', alt: '3,876 m', diff: 'Moderate', days: '5', season: 'Mar–May, Oct–Nov', region: 'Garhwal' },
            { href: '/treks/location/sankri/kedarkantha-trek', name: 'Kedarkantha', alt: '3,810 m', diff: 'Moderate–Challenging', days: '5', season: 'Dec–Feb', region: 'Sankri' },
            { href: '/treks/location/sankri/har-ki-dun-trek', name: 'Har Ki Dun', alt: '3,566 m', diff: 'Moderate', days: '5', season: 'May–Jun, Sep–Oct', region: 'Sankri' },
            { href: '/treks/location/munsiyari/khaliya-top-trek', name: 'Khaliya Top', alt: '3,500 m', diff: 'Moderate', days: '3–4', season: 'May–Jun, Sep–Oct', region: 'Kumaon' },
            { href: '/treks/location/lohajung/roopkund-trek', name: 'Roopkund', alt: '4,800 m', diff: 'Challenging', days: '7', season: 'May–Jun, Sep–Oct', region: 'Garhwal' },
            { href: '/treks/location/joshimath/pangarchulla-trek', name: 'Pangarchulla', alt: '4,590 m', diff: 'Challenging', days: '6', season: 'Mar–May', region: 'Garhwal' },
            { href: '/treks/location/munsiyari/milam-glacier-trek', name: 'Milam Glacier', alt: '3,450 m', diff: 'Challenging', days: '8–10', season: 'May–Jun, Sep–Oct', region: 'Kumaon' },
            { href: '/treks/location/chakrata/tiger-fall-trek', name: 'Tiger Fall', alt: '~2,200 m', diff: 'Easy', days: '1', season: 'Year-round', region: 'Chakrata' },
            { href: '/treks/location/chakrata/budher-caves-trek', name: 'Budher Caves', alt: '~2,200 m', diff: 'Easy', days: '1', season: 'Year-round', region: 'Chakrata' },
          ].map((row) => {
            const diffClass = row.diff.toLowerCase().startsWith('challenging') ? 'diff-challenging'
              : row.diff.toLowerCase().startsWith('easy') ? 'diff-easy'
              : 'diff-moderate';
            return (
              <tr key={row.href}>
                <td><Link href={row.href} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>{row.name}</Link></td>
                <td>{row.alt}</td>
                <td><span className={diffClass}>{row.diff}</span></td>
                <td>{row.days}</td>
                <td>{row.season}</td>
                <td>{row.region}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    <nav aria-label="Filter treks by category" style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.5rem', marginBottom: '1.75rem' }}>
      {[
        { href: `${PATH}/beginner`, label: 'Beginner Treks' },
        { href: `${PATH}/snow`, label: 'Snow Treks' },
        { href: `${PATH}/high-altitude`, label: 'High-Altitude (4,000 m+)' },
        { href: `${PATH}/challenging`, label: 'Challenging Treks' },
      ].map(f => (
        <Link key={f.href} href={f.href} className="filter-pill">{f.label}</Link>
      ))}
    </nav>

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '0.5rem' }}>
      <strong style={{ fontWeight: 500, color: '#111111' }}>Looking for a beginner trek?</strong> Start with{' '}
      <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal</Link>{' '}
      or{' '}
      <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kuari Pass</Link>{' '}
      — both moderate, no technical skills needed. See all{' '}
      <Link href={`${PATH}/beginner`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>beginner treks →</Link>
    </p>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
      <strong style={{ fontWeight: 500, color: '#111111' }}>Want a summit challenge?</strong> See{' '}
      <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Pangarchulla</Link>{' '}
      or{' '}
      <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund</Link>{' '}
      — challenging routes above 4,500 m for experienced trekkers. Full{' '}
      <Link href={`${PATH}/challenging`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>challenging treks guide →</Link>
    </p>
  </div>
</section>

       {/* ── SECTION 1: BEGINNER TREKS ── */}
<section id="beginner-treks" style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
}}>
  <style>{`
    .trek-card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-top: 2px solid var(--color-primary);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.25rem;
    }
    .trek-card:last-of-type { margin-bottom: 0; }
    .trek-meta-pills {
      display: flex; flex-wrap: wrap; gap: 0.4rem;
      margin-bottom: 1rem;
    }
    .trek-meta-pill {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.68rem; font-weight: 400;
      color: #555555; background: #f7f9f7;
      border: 1px solid #e5e7eb; border-radius: 100px;
      padding: 3px 10px; display: inline-block;
    }
    .trek-card h3 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem; font-weight: 500;
      color: #111111; margin: 0 0 0.85rem;
      letter-spacing: -0.01em;
    }
    .trek-card p {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.88rem; font-weight: 300;
      line-height: 1.85; color: #555555; margin: 0;
    }
  `}</style>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Beginner Treks</span>
    </div>
    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200, letterSpacing: '-0.03em',
      color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem',
    }}>Beginner-Friendly Treks in Uttarakhand</h2>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '2rem' }}>
      These routes require no prior Himalayan experience. They stay below 4,000 metres, have no technical sections (no ropes, crampons, or glacier crossings), and are supported by established guide infrastructure. The right starting point depends on how many days you have and whether you want a summit experience or a gentler introduction.
    </p>

    <div className="trek-card">
      <h3>Brahmatal Trek — The Ideal First High-Altitude Trek</h3>
      <div className="trek-meta-pills">
        <span className="trek-meta-pill">3,850 m</span>
        <span className="trek-meta-pill" style={{ color: 'var(--color-primary)', borderColor: 'rgba(15,118,110,0.25)', background: 'rgba(15,118,110,0.05)' }}>Moderate</span>
        <span className="trek-meta-pill">4 days</span>
        <span className="trek-meta-pill">Dec–Mar</span>
        <span className="trek-meta-pill">Lohajung, Garhwal</span>
      </div>
      <p>
        The{' '}
        <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal Trek</Link>{' '}
        is a 22 km route from Lohajung to a frozen alpine lake at 3,850 metres, passing through oak and rhododendron forest before emerging onto snow-covered ridges with views of Trishul (7,120 m) and Nanda Ghunti. The altitude gain is gradual, the trail is well-defined, and the 4-day duration keeps fatigue manageable. For anyone seeking their first real Himalayan trek beyond a day walk, Brahmatal delivers genuine high-altitude reward at moderate difficulty. It is the premier{' '}
        <Link href="/blog/best-snow-treks-garhwal-himalaya" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>snow trek in the Garhwal Himalaya</Link>.
        {' '}Check{' '}
        <Link href="/treks/brahmatal-trek/departures" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>upcoming Brahmatal trek departures</Link>{' →'}
      </p>
    </div>

    <div className="trek-card">
      <h3>Kuari Pass Trek — Best Views for Moderate Effort</h3>
      <div className="trek-meta-pills">
        <span className="trek-meta-pill">3,876 m</span>
        <span className="trek-meta-pill" style={{ color: 'var(--color-primary)', borderColor: 'rgba(15,118,110,0.25)', background: 'rgba(15,118,110,0.05)' }}>Moderate</span>
        <span className="trek-meta-pill">5 days</span>
        <span className="trek-meta-pill">Mar–May, Oct–Nov</span>
        <span className="trek-meta-pill">Joshimath, Garhwal</span>
      </div>
      <p>
        The{' '}
        <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kuari Pass Trek</Link>{' '}
        follows the historic Lord Curzon Trail along a high ridge with near-continuous views of Nanda Devi (7,816 m), Dronagiri, Chaukhamba, and Kamet. No technical challenges, no glacier terrain — just sustained ridge walking through oak forest and alpine meadow. The view-to-effort ratio is the highest of any trek in Uttarakhand. Spring brings rhododendron blooms; autumn delivers the sharpest visibility. Choosing between these two?{' '}
        <Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Compare Brahmatal vs Kuari Pass</Link>{' '}
        for the detailed breakdown. Check{' '}
        <Link href="/treks/kuari-pass-trek/departures" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>upcoming Kuari Pass trek departures</Link>{' →'}
      </p>
    </div>

    <div className="trek-card">
      <h3>Khaliya Top Trek — Shortest Route to Serious Views</h3>
      <div className="trek-meta-pills">
        <span className="trek-meta-pill">3,500 m</span>
        <span className="trek-meta-pill" style={{ color: 'var(--color-primary)', borderColor: 'rgba(15,118,110,0.25)', background: 'rgba(15,118,110,0.05)' }}>Moderate</span>
        <span className="trek-meta-pill">3–4 days</span>
        <span className="trek-meta-pill">May–Jun, Sep–Oct</span>
        <span className="trek-meta-pill">Munsiyari, Kumaon</span>
      </div>
      <p>
        <Link href="/treks/location/munsiyari/khaliya-top-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Khaliya Top</Link>{' '}
        is a broad alpine meadow at 3,500 metres above Munsiyari, offering an unbroken 180-degree panorama of the five Panchachuli summits, Nanda Devi East, and the Rajrambha range. The trek is pure sustained uphill through rhododendron forest — no technical terrain, no river crossings. At 3–4 days, it is the shortest route to genuine high-altitude Himalayan views in Uttarakhand. Ideal for working professionals on extended weekends, and as acclimatisation before the{' '}
        <Link href="/treks/location/munsiyari/milam-glacier-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Milam Glacier expedition</Link>.
      </p>
    </div>

    <div className="trek-card">
      <h3>Tiger Fall &amp; Budher Caves — Weekend Day Treks</h3>
      <div className="trek-meta-pills">
        <span className="trek-meta-pill">~2,200 m</span>
        <span className="trek-meta-pill" style={{ color: '#555', borderColor: '#e0e0e0', background: '#f0f0f0' }}>Easy</span>
        <span className="trek-meta-pill">1 day each</span>
        <span className="trek-meta-pill">Year-round</span>
        <span className="trek-meta-pill">Chakrata</span>
      </div>
      <p>
        The{' '}
        <Link href="/treks/location/chakrata/tiger-fall-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Tiger Fall trail</Link>{' '}
        (12 km through deodar forest to a major Himalayan waterfall) and the{' '}
        <Link href="/treks/location/chakrata/budher-caves-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Budher Caves trek</Link>{' '}
        (10 km to ancient limestone caves) are the lowest-barrier entry points to Himalayan trekking. No altitude concerns, no prior experience, no multi-day commitment. Just 2–3 hours from Dehradun. Combine with a{' '}
        <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>wellness retreat in Chakrata</Link>{' '}
        for a weekend that balances activity with rest.
      </p>
    </div>

  </div>
</section>

        {/* ── SECTION 2: MODERATE MULTI-DAY ── */}
<section id="moderate-treks" style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Moderate Treks</span>
    </div>
    <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>Moderate Multi-Day Treks</h2>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '2rem' }}>
      These routes offer the core Himalayan trekking experience — multiple days on trail, camping at altitude, and the slow rhythm of walking through changing landscapes. All are accessible to fit beginners willing to prepare, but they demand genuine physical effort and respect for mountain conditions.
    </p>

    <div className="trek-card">
      <h3>Kedarkantha Trek — The Classic Winter Summit</h3>
      <div className="trek-meta-pills">
        <span className="trek-meta-pill">3,810 m</span>
        <span className="trek-meta-pill" style={{ color: '#c45000', borderColor: 'rgba(230,81,0,0.25)', background: 'rgba(230,81,0,0.05)' }}>Moderate–Challenging</span>
        <span className="trek-meta-pill">5 days</span>
        <span className="trek-meta-pill">Dec–Feb</span>
        <span className="trek-meta-pill">Sankri</span>
      </div>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
        <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kedarkantha</Link>{' '}
        is the most popular guided trek in northern India — and for good reason. A 5-day route from Sankri to a 3,810 m summit with 360-degree views across six Himalayan ranges. The final summit-day push gains 1,500 feet through deep snow, which lifts it above pure moderate difficulty, but the rest of the route is well-paced and guided throughout. It is the definitive first summit experience in the Indian Himalayas.
      </p>
    </div>

    <div className="trek-card">
      <h3>Har Ki Dun Trek — The Valley Immersion</h3>
      <div className="trek-meta-pills">
        <span className="trek-meta-pill">3,566 m</span>
        <span className="trek-meta-pill" style={{ color: 'var(--color-primary)', borderColor: 'rgba(15,118,110,0.25)', background: 'rgba(15,118,110,0.05)' }}>Moderate</span>
        <span className="trek-meta-pill">5 days</span>
        <span className="trek-meta-pill">May–Jun, Sep–Oct</span>
        <span className="trek-meta-pill">Sankri</span>
      </div>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
        <Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Har Ki Dun</Link>{' '}
        is the finest valley trek in northern India — 5 days through the Tons Valley with forest, traditional mountain villages, alpine meadows, and a glacial amphitheatre at the head. If Kedarkantha is about one intense summit moment, Har Ki Dun is about sustained immersion in a landscape that changes with every day of walking. Best in summer when the valley is green and wildflowers carpet the higher meadows. Deciding between the two? See{' '}
        <Link href="/treks/kedarkantha-vs-har-ki-dun" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kedarkantha vs Har Ki Dun</Link>.
      </p>
    </div>
  </div>
</section>

<PrimaryCTA
  label="Find My Difficulty Level"
  subtext="Not sure where to start? Share your fitness and experience — we will recommend the right difficulty."
  vertical="trek"
  category="apex"
  sourcePath={PATH}
/>

{/* ── SECTION 3: CHALLENGING ── */}
<section id="challenging-treks" style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Challenging Treks</span>
    </div>
    <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>Challenging High-Altitude Treks</h2>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '2rem' }}>
      These routes require prior high-altitude experience (above 4,000 m), 6–8 weeks of structured fitness preparation, and comfort with steep, exposed, and potentially snow-covered terrain. They are not enhanced day hikes — they are serious mountain routes where preparation directly determines safety and enjoyment.
    </p>

    <div className="trek-card" style={{ borderTop: '2px solid #e65100' }}>
      <h3>Roopkund Trek — The Mystery Lake Expedition</h3>
      <div className="trek-meta-pills">
        <span className="trek-meta-pill">4,800 m</span>
        <span className="trek-meta-pill" style={{ color: '#e65100', borderColor: 'rgba(230,81,0,0.25)', background: 'rgba(230,81,0,0.05)' }}>Challenging</span>
        <span className="trek-meta-pill">7 days</span>
        <span className="trek-meta-pill">May–Jun, Sep–Oct</span>
        <span className="trek-meta-pill">Lohajung, Garhwal</span>
      </div>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
        <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund</Link>{' '}
        is India&apos;s most iconic high-altitude trek — a 53 km expedition from Lohajung to a glacial lake at 4,800 metres, known for the centuries-old skeletal remains at its shores. The route crosses the vast Bedni Bugyal alpine meadow, navigates moraine fields, and demands sustained altitude tolerance. The Bugyal alone — stretching kilometres in every direction with Trishul views — justifies the effort. This is the trek for experienced Himalayan trekkers seeking a genuine expedition in{' '}
        <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Garhwal&apos;s most dramatic landscape</Link>.
      </p>
    </div>

    <div className="trek-card" style={{ borderTop: '2px solid #e65100' }}>
      <h3>Pangarchulla Peak Trek — The Summit Climb</h3>
      <div className="trek-meta-pills">
        <span className="trek-meta-pill">4,590 m</span>
        <span className="trek-meta-pill" style={{ color: '#e65100', borderColor: 'rgba(230,81,0,0.25)', background: 'rgba(230,81,0,0.05)' }}>Challenging</span>
        <span className="trek-meta-pill">6 days</span>
        <span className="trek-meta-pill">Mar–May</span>
        <span className="trek-meta-pill">Joshimath, Garhwal</span>
      </div>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
        <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Pangarchulla</Link>{' '}
        is one of the few accessible true summit experiences in Uttarakhand. The route follows the Kuari Pass approach before diverging toward a steep snow-and-scree ascent with an alpine start. At the top: a 360° panorama of Nanda Devi, Dronagiri, Chaukhamba, and the entire Nanda Devi Sanctuary. Crampons required. For experienced trekkers who want to stand on a peak, not a pass. Choosing between the two Garhwal challenges?{' '}
        <Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Compare Roopkund vs Pangarchulla</Link>.
      </p>
    </div>

    <div className="trek-card" style={{ borderTop: '2px solid #e65100' }}>
      <h3>Milam Glacier Trek — The Remote Expedition</h3>
      <div className="trek-meta-pills">
        <span className="trek-meta-pill">3,450 m</span>
        <span className="trek-meta-pill" style={{ color: '#e65100', borderColor: 'rgba(230,81,0,0.25)', background: 'rgba(230,81,0,0.05)' }}>Challenging</span>
        <span className="trek-meta-pill">8–10 days</span>
        <span className="trek-meta-pill">May–Jun, Sep–Oct</span>
        <span className="trek-meta-pill">Munsiyari, Kumaon</span>
      </div>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
        <Link href="/treks/location/munsiyari/milam-glacier-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Milam Glacier</Link>{' '}
        is Uttarakhand&apos;s great expedition trek — an 8–10 day, 118 km journey along the ancient Johar Valley trade route from Munsiyari to the glacier snout beneath the Panchachuli massif. The route passes through abandoned Bhotiya trading villages (Martoli, Burfu), crosses glacial moraines, and follows the Goriganga River into genuinely wild terrain. The altitude is lower than Roopkund, but the sustained multi-day commitment and remoteness make it equally demanding. For trekkers who want to walk deep into the mountains, not just look at them from a ridgeline.
      </p>
    </div>
  </div>
</section>

{/* ── SECTION 4: SNOW TREKS ── */}
<section id="snow-treks" style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Snow Treks</span>
    </div>
    <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>Best Snow Treks in Uttarakhand</h2>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1.75rem' }}>
      Winter transforms the Uttarakhand Himalaya — frozen lakes, snow-laden forests, and summit ridges under continuous white. The best snow season runs December to March, with peak conditions in January and February.
    </p>
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0' }}>
      {[
        { href: '/treks/location/lohajung/brahmatal-trek', label: 'Brahmatal', text: 'is the ideal first snow trek — frozen lake, snow ridges, and moderate difficulty with no technical sections. The trail through snow-covered rhododendron forest is visually stunning and the 4-day duration keeps cold exposure manageable.' },
        { href: '/treks/location/sankri/kedarkantha-trek', label: 'Kedarkantha', text: 'is the quintessential winter summit experience — deep snow above 3,200 m, a steep final push, and sunrise from a snow-covered peak. More physically demanding than Brahmatal, with a proper summit-day challenge.' },
        { href: '/treks/location/joshimath/kuari-pass-trek', label: 'Kuari Pass (March)', text: 'in early spring retains significant snow on the upper sections, adding alpine character to the ridge walk. Not a pure winter trek, but the lingering snow plus rhododendron bloom makes March the most photogenic window.' },
      ].map((item, i) => (
        <div key={i} style={{
          display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
          padding: '1.25rem 0', borderBottom: '1px solid #f0f0f0',
        }}>
          <span style={{
            flexShrink: 0, width: '10px', height: '10px', borderRadius: '50%',
            background: 'var(--color-primary)', opacity: 0.4, marginTop: '0.45rem',
          }} />
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
            <Link href={item.href} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>{item.label}</Link>{' '}{item.text}
          </p>
        </div>
      ))}
    </div>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginTop: '1.5rem', marginBottom: 0 }}>
      For a deeper dive into winter route selection, see our{' '}
      <Link href="/blog/best-snow-treks-garhwal-himalaya" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>guide to Garhwal snow treks</Link>{' '}
      and the full{' '}
      <Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>winter treks in Uttarakhand</Link>{' '}
      seasonal page.
    </p>
  </div>
</section>

{/* ── SECTION 5: HIGH ALTITUDE ── */}
<section id="high-altitude" style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>High Altitude</span>
    </div>
    <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>High-Altitude Treks Above 4,000 m</h2>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1.75rem' }}>
      Above 4,000 metres, the landscape changes fundamentally — treeline gives way to exposed moraine and glacial terrain, oxygen pressure drops to levels that affect decision-making, and weather windows shrink. These treks require prior altitude experience and serious preparation.
    </p>
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
      {[
        { href: '/treks/location/lohajung/roopkund-trek', label: 'Roopkund (4,800 m)', text: 'is the highest featured trek — a full 7-day expedition with sustained exposure above 4,000 m. The Bedni Bugyal meadows, the mystery lake, and the sheer scale of the Garhwal interior make this India\'s most sought-after high-altitude trekking route.' },
        { href: '/treks/location/joshimath/pangarchulla-trek', label: 'Pangarchulla (4,590 m)', text: 'delivers a true peak summit — not a pass or a lake, but the top of a mountain with 360° views. The alpine-start summit push through snow is the most technically demanding single day on any featured trek.' },
      ].map((item, i) => (
        <div key={i} style={{
          display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
          padding: '1.25rem 0', borderBottom: '1px solid #e8ece8',
        }}>
          <span style={{
            flexShrink: 0, width: '10px', height: '10px', borderRadius: '50%',
            background: '#e65100', opacity: 0.5, marginTop: '0.45rem',
          }} />
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
            <Link href={item.href} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>{item.label}</Link>{' '}{item.text}
          </p>
        </div>
      ))}
    </div>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginTop: '1.5rem', marginBottom: 0 }}>
      Preparing for routes above 4,000 m? Our{' '}
      <Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>8-week fitness guide for Garhwal treks</Link>{' '}
      covers the physical preparation framework, and the{' '}
      <Link href="/blog/high-altitude-treks-garhwal-above-4000m" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>high-altitude trekking guide</Link>{' '}
      covers AMS management, acclimatisation protocols, and what to expect above the treeline.
    </p>
  </div>
</section>

<PrimaryCTA
  label="Plan My Trek"
  subtext="Ready to start? Tell us your preferred season and experience level."
  vertical="trek"
  category="apex"
  sourcePath={PATH}
/>

{/* ── SECTION 6: REGIONS ── */}
<section id="regions" style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
}}>
  <style>{`
    .region-card {
      border: 1px solid #e5e7eb;
      border-left: 3px solid var(--color-primary);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1rem;
      background: #ffffff;
    }
    .region-card:last-of-type { margin-bottom: 0; }
    .region-card h3 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.92rem; font-weight: 500;
      margin: 0 0 0.75rem; letter-spacing: -0.01em;
    }
    .region-card h3 a { color: #111111; text-decoration: none; }
    .region-card h3 a:hover { color: var(--color-primary); }
    .region-card p {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.88rem; font-weight: 300;
      line-height: 1.85; color: #555555; margin: 0;
    }
  `}</style>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Trekking Regions</span>
    </div>
    <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>Trekking Regions in Uttarakhand</h2>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '2rem' }}>
      Uttarakhand&apos;s trekking landscape divides into four distinct regions, each with its own character, altitude profile, and access logistics. Understanding the regions helps you narrow from &ldquo;I want to trek in Uttarakhand&rdquo; to a specific route.
    </p>

    <div className="region-card">
      <h3><Link href="/treks/garhwal-himalayas">Garhwal Himalayas — The High-Altitude Heart</Link></h3>
      <p>The Garhwal interior — accessed from{' '}
        <Link href="/treks/location/lohajung" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Lohajung</Link>{' '}
        and{' '}
        <Link href="/treks/location/joshimath" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Joshimath</Link>{' '}
        — is where Uttarakhand&apos;s highest and most dramatic treks live. Brahmatal, Kuari Pass, Roopkund, and Pangarchulla offer altitude ranges from 3,850 to 4,800 metres with Nanda Devi Sanctuary views. This is the premier trekking region for those seeking classic Himalayan routes. Our{' '}
        <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>complete Garhwal trekking guide</Link>{' '}
        covers all four routes in depth, including seasonal windows and{' '}
        <Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>packing checklists</Link>.
      </p>
    </div>

    <div className="region-card">
      <h3><Link href="/treks/location/sankri">Sankri — Winter Summit &amp; Valley Base</Link></h3>
      <p>Sankri in the Govind Wildlife Sanctuary zone is the base for two of Uttarakhand&apos;s most popular multi-day treks: Kedarkantha (winter summit) and Har Ki Dun (summer valley). It sits at the intersection of alpine forest and high meadow, offering distinctly different experiences depending on the season. Reached from Dehradun in 4–5 hours — the fastest access to genuine multi-day trekking.</p>
    </div>

    <div className="region-card">
      <h3><Link href="/treks/location/chakrata">Chakrata — Weekend Forest Trails</Link></h3>
      <p>Chakrata is the gateway for first-time trekkers and weekend travellers from Delhi. The Tiger Fall and Budher Caves trails stay below 2,500 metres in dense deodar forest — no altitude concerns, no multi-day gear, no prior experience needed. Just 2–3 hours from Dehradun. Combine trekking with a{' '}
        <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Chakrata retreat</Link>{' '}
        for a balanced weekend of movement and rest.
      </p>
    </div>

    <div className="region-card">
      <h3><Link href="/treks/location/munsiyari">Kumaon (Munsiyari) — Remote Expeditions &amp; Panchachuli Views</Link></h3>
      <p>Munsiyari in the Kumaon Himalaya is the base for routes that trade accessibility for authenticity — the Milam Glacier expedition (8–10 days along the Johar trade route) and the Khaliya Top summit (3–4 days to a Panchachuli panorama). Fewer crowds, deeper cultural layers (Bhotiya heritage, abandoned trading villages), and terrain that feels genuinely wild. The longer travel time from Delhi (12–14 hours) is the price of admission.</p>
    </div>
  </div>
</section>

{/* ── PROGRESSION PATH ── */}
<section id="progression" style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Progression Path</span>
    </div>
    <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>The Trekking Progression Path</h2>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '2rem' }}>
      Most successful Himalayan trekkers build experience in stages. The natural progression through Uttarakhand&apos;s routes follows altitude and duration:
    </p>

    {[
      { num: '01', label: 'Day treks (Easy)', content: <><Link href="/treks/location/chakrata/tiger-fall-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Tiger Fall</Link>{' '}or{' '}<Link href="/treks/location/chakrata/budher-caves-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Budher Caves</Link>{' '}in Chakrata — builds trail confidence with zero altitude risk.</> },
      { num: '02', label: 'First multi-day (Moderate)', content: <><Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal</Link>{' '}or{' '}<Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kuari Pass</Link>{' '}— introduces camping, altitude, and multi-day rhythm.</> },
      { num: '03', label: 'Summit experience (Moderate–Challenging)', content: <><Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kedarkantha</Link>{' '}— adds a genuine summit push and winter snow conditions.</> },
      { num: '04', label: 'High altitude (Challenging)', content: <><Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Pangarchulla</Link>{' '}or{' '}<Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund</Link>{' '}— sustained exposure above 4,000 m with technical demands.</> },
      { num: '05', label: 'Expedition (Challenging)', content: <><Link href="/treks/location/munsiyari/milam-glacier-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Milam Glacier</Link>{' '}— 8–10 days of continuous remote trekking through glacial terrain.</> },
    ].map((step, i, arr) => (
      <div key={step.num} style={{ display: 'flex', gap: '1.5rem', position: 'relative' as const }}>
        {/* spine */}
        {i < arr.length - 1 && (
          <div style={{ position: 'absolute' as const, left: '19px', top: '28px', width: '2px', height: 'calc(100% - 4px)', background: 'linear-gradient(to bottom, rgba(15,118,110,0.2), transparent)' }} />
        )}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-primary)', marginTop: '0.35rem', flexShrink: 0 }} />
        </div>
        <div style={{ paddingBottom: '1.5rem' }}>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', opacity: 0.6, margin: '0 0 0.25rem' }}>{step.num}</p>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 500, color: '#111111', margin: '0 0 0.25rem' }}>{step.label}</p>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>{step.content}</p>
        </div>
      </div>
    ))}

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginTop: '0.5rem', marginBottom: 0 }}>
      For a detailed training framework that maps to each level, see our{' '}
      <Link href="/blog/beginner-to-advanced-trek-progression-garhwal" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>beginner-to-advanced trek progression guide</Link>{' '}
      and the{' '}
      <Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>8-week fitness preparation plan</Link>.
    </p>
  </div>
</section>

{/* ── HOW TO CHOOSE ── */}
<section id="how-to-choose" style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Decision Guide</span>
    </div>
    <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>How to Choose the Right Trek</h2>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '1.75rem' }}>
      Three questions determine the right route:
    </p>

    {[
      { q: 'When are you going?', a: 'December–February: Brahmatal or Kedarkantha (snow treks). March–May: Kuari Pass, Pangarchulla, or Khaliya Top. May–June: Roopkund, Har Ki Dun, or Milam Glacier. September–November: Roopkund, Kuari Pass, or Khaliya Top. Season narrows the shortlist immediately.' },
      { q: 'How many days do you have?', a: '1 day: Chakrata. 3–4 days: Brahmatal or Khaliya Top. 5 days: Kuari Pass, Kedarkantha, or Har Ki Dun. 6–7 days: Pangarchulla or Roopkund. 8–10 days: Milam Glacier. Duration filters by logistics.' },
      { q: 'What experience do you have?', a: 'First trek: Tiger Fall or Brahmatal. Second trek: Kuari Pass or Kedarkantha. Third+: Pangarchulla or Roopkund. Expedition-ready: Milam Glacier. Experience determines safety and enjoyment at altitude.' },
    ].map((item, i) => (
      <div key={i} style={{
        background: '#f7f9f7', border: '1px solid #e5e7eb',
        borderRadius: '8px', padding: '1.25rem 1.5rem',
        marginBottom: '0.75rem',
      }}>
        <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 500, color: '#111111', margin: '0 0 0.4rem' }}>{item.q}</p>
        <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>{item.a}</p>
      </div>
    ))}

    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginTop: '1.25rem', marginBottom: 0 }}>
      Still deciding? Our{' '}
      <Link href="/treks/beginner-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>beginner treks guide</Link>{' '}
      and{' '}
      <Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>summer treks page</Link>{' '}
      offer filtered views by difficulty and season.
    </p>
  </div>
</section>

<PrimaryCTA
  label="Talk to a Trek Coordinator"
  subtext="Share your dates and fitness level. We will recommend the exact route for your experience."
  vertical="trek"
  category="apex"
  sourcePath={PATH}
/>

{/* ── FAQ ── */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#f7f9f7',
  paddingTop: '4rem', paddingBottom: '4rem',
  borderBottom: '1px solid #e5e7eb',
}}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>FAQ</span>
    </div>
    <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>Frequently Asked Questions</h2>
    <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
  </div>
</section>

{/* ── EXPLORE MORE ── */}
<section style={{
  width: '100vw', marginLeft: 'calc(-50vw + 50%)',
  background: '#ffffff',
  paddingTop: '4rem', paddingBottom: '4rem',
}}>
  <style>{`
    .explore-link {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.85rem 1rem;
      border-bottom: 1px solid #f0f0f0;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.88rem; font-weight: 300;
      color: #333333; text-decoration: none;
      transition: background 0.15s, color 0.15s;
    }
    .explore-link:hover { background: #f7f9f7; color: var(--color-primary); }
    .explore-link::after { content: '→'; color: var(--color-primary); opacity: 0.5; font-size: 0.8rem; }
    .explore-group { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 1rem; }
    .explore-group .explore-link:last-child { border-bottom: none; }
  `}</style>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Explore More</span>
    </div>
    <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>Explore by Region &amp; Topic</h2>

    <div className="explore-group">
      <Link href={`${PATH}/beginner`} className="explore-link">Beginner Treks in Uttarakhand</Link>
      <Link href={`${PATH}/snow`} className="explore-link">Snow Treks in Uttarakhand</Link>
      <Link href={`${PATH}/high-altitude`} className="explore-link">High-Altitude Treks Above 4,000 m</Link>
      <Link href={`${PATH}/challenging`} className="explore-link">Challenging Treks in Uttarakhand</Link>
    </div>

    <div className="explore-group">
      <Link href="/treks/garhwal-himalayas" className="explore-link">Garhwal Himalayas — Complete Trekking Guide</Link>
      <Link href="/treks/location/sankri" className="explore-link">Treks from Sankri</Link>
      <Link href="/treks/location/munsiyari" className="explore-link">Treks from Munsiyari</Link>
      <Link href="/treks/location/chakrata" className="explore-link">Weekend Treks from Chakrata</Link>
    </div>

    <div className="explore-group">
      <Link href="/treks/brahmatal-vs-kuari-pass" className="explore-link">Brahmatal vs Kuari Pass — Moderate Trek Comparison</Link>
      <Link href="/treks/roopkund-vs-pangarchulla" className="explore-link">Roopkund vs Pangarchulla — Challenging Trek Comparison</Link>
      <Link href="/treks/kedarkantha-vs-har-ki-dun" className="explore-link">Kedarkantha vs Har Ki Dun — Sankri Trek Comparison</Link>
    </div>

    <div className="explore-group">
      <Link href="/treks/winter-treks-uttarakhand" className="explore-link">Winter Treks in Uttarakhand</Link>
      <Link href="/treks/summer-treks-uttarakhand" className="explore-link">Summer Treks in Uttarakhand</Link>
      <Link href="/treks/beginner-treks-uttarakhand" className="explore-link">Beginner Treks in Uttarakhand</Link>
      <Link href="/treks/garhwal-himalayas/fitness-guide" className="explore-link">8-Week Fitness Guide for Garhwal Treks</Link>
      <Link href="/treks/garhwal-himalayas/packing-checklist" className="explore-link">Packing Checklist — Print-Ready Gear List</Link>
    </div>
  </div>
</section>


      </article>
    </TrackedPage>
  );
}
