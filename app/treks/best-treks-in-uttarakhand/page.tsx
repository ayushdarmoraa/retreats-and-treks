import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
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

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Best Treks in Uttarakhand: Beginner to High-Altitude Guide
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Uttarakhand stretches from the foothills north of Delhi to the highest peaks in India — Nanda Devi at 7,816 metres, Kamet, Chaukhamba, and the Panchachuli massif. Across four distinct trekking regions, the state offers a complete spectrum of Himalayan experiences: frozen lake traverses in winter, panoramic ridge walks in spring, remote glacier expeditions in summer, and weekend forest trails accessible year-round.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            This guide covers the 10 best treks across{' '}
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)' }}>Garhwal</Link>,{' '}
            Kumaon, Sankri and Chakrata — ranked by difficulty, altitude, season and the kind of mountain experience each delivers. Whether you are planning your first Himalayan trek or your tenth, the right route depends on three variables: when you are going, how many days you have, and what you want from the mountains.
          </p>
        </header>

        {/* ── TABLE OF CONTENTS ─────────────────────────────────────── */}
        <nav
          aria-label="Table of contents"
          style={{
            marginBottom: 'var(--space-xl)',
            padding: '1.25rem 1.5rem',
            background: 'var(--color-surface, #f9f9f9)',
            borderRadius: 'var(--radius-md, 8px)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.75rem' }}>
            In This Guide
          </p>
          <ol style={{ paddingLeft: '1.25rem', margin: 0, lineHeight: 2.1, fontSize: '0.95rem' }}>
            <li><a href="#beginner-treks" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Beginner-Friendly Treks</a></li>
            <li><a href="#moderate-treks" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Moderate Multi-Day Treks</a></li>
            <li><a href="#challenging-treks" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Challenging High-Altitude Treks</a></li>
            <li><a href="#snow-treks" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Best Snow Treks</a></li>
            <li><a href="#high-altitude" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>High-Altitude Treks Above 4,000 m</a></li>
            <li><a href="#regions" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Trekking Regions in Uttarakhand</a></li>
            <li><a href="#progression" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>The Trekking Progression Path</a></li>
            <li><a href="#how-to-choose" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>How to Choose the Right Trek</a></li>
          </ol>
        </nav>

        <PrimaryCTA
          label="Plan My Uttarakhand Trek"
          subtext="Tell us your dates, fitness level and preferred difficulty. We will match you to the right route."
          vertical="trek"
          category="apex"
          sourcePath={PATH}
        />

        {/* ── MASTER COMPARISON TABLE ──────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            All 10 Treks at a Glance
          </h2>
          <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem', lineHeight: 1.7 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Trek</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Altitude</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Difficulty</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Days</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Best Season</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Region</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,850 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Dec–Mar</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Garhwal</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>Kuari Pass</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,876 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>5</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Mar–May, Oct–Nov</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Garhwal</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>Kedarkantha</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,810 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate–Challenging</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>5</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Dec–Feb</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Sankri</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)' }}>Har Ki Dun</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,566 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>5</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>May–Jun, Sep–Oct</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Sankri</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/munsiyari/khaliya-top-trek" style={{ color: 'var(--color-primary)' }}>Khaliya Top</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,500 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3–4</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>May–Jun, Sep–Oct</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Kumaon</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>Roopkund</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4,800 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Challenging</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>7</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>May–Jun, Sep–Oct</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Garhwal</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>Pangarchulla</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4,590 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Challenging</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>6</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Mar–May</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Garhwal</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/munsiyari/milam-glacier-trek" style={{ color: 'var(--color-primary)' }}>Milam Glacier</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,450 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Challenging</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>8–10</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>May–Jun, Sep–Oct</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Kumaon</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/chakrata/tiger-fall-trek" style={{ color: 'var(--color-primary)' }}>Tiger Fall</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>~2,200 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Easy</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>1</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Year-round</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Chakrata</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/chakrata/budher-caves-trek" style={{ color: 'var(--color-primary)' }}>Budher Caves</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>~2,200 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Easy</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>1</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Year-round</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Chakrata</td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav aria-label="Filter treks by category" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {[
              { href: `${PATH}/beginner`, label: 'Beginner Treks' },
              { href: `${PATH}/snow`, label: 'Snow Treks' },
              { href: `${PATH}/high-altitude`, label: 'High-Altitude (4,000 m+)' },
              { href: `${PATH}/challenging`, label: 'Challenging Treks' },
            ].map(f => (
              <Link
                key={f.href}
                href={f.href}
                style={{
                  display: 'inline-block',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-primary)',
                  color: 'var(--color-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                {f.label}
              </Link>
            ))}
          </nav>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            <strong>Looking for a beginner trek?</strong> Start with{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal</Link>{' '}
            or{' '}
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>Kuari Pass</Link>{' '}
            — both moderate, no technical skills needed. See all{' '}
            <Link href={`${PATH}/beginner`} style={{ color: 'var(--color-primary)' }}>beginner treks →</Link>
          </p>
          <p style={{ lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
            <strong>Want a summit challenge?</strong> See{' '}
            <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>Pangarchulla</Link>{' '}
            or{' '}
            <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>Roopkund</Link>{' '}
            — challenging routes above 4,500 m for experienced trekkers. Full{' '}
            <Link href={`${PATH}/challenging`} style={{ color: 'var(--color-primary)' }}>challenging treks guide →</Link>
          </p>
        </section>

        {/* ── SECTION 1: BEGINNER TREKS ────────────────────────────── */}
        <section id="beginner-treks" style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Beginner-Friendly Treks in Uttarakhand
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            These routes require no prior Himalayan experience. They stay below 4,000 metres, have no technical sections (no ropes, crampons, or glacier crossings), and are supported by established guide infrastructure. The right starting point depends on how many days you have and whether you want a summit experience or a gentler introduction.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Brahmatal Trek — The Ideal First High-Altitude Trek
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>3,850 m</strong> &nbsp;|&nbsp; <strong>Moderate</strong> &nbsp;|&nbsp;
            <strong>4 days</strong> &nbsp;|&nbsp; <strong>Dec–Mar</strong> &nbsp;|&nbsp;
            Lohajung, Garhwal
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>
              Brahmatal Trek
            </Link>{' '}
            is a 22 km route from Lohajung to a frozen alpine lake at 3,850 metres, passing through oak and rhododendron forest before emerging onto snow-covered ridges with views of Trishul (7,120 m) and Nanda Ghunti. The altitude gain is gradual, the trail is well-defined, and the 4-day duration keeps fatigue manageable. For anyone seeking their first real Himalayan trek beyond a day walk, Brahmatal delivers genuine high-altitude reward at moderate difficulty. It is the premier{' '}
            <Link href="/blog/best-snow-treks-garhwal-himalaya" style={{ color: 'var(--color-primary)' }}>
              snow trek in the Garhwal Himalaya
            </Link>.
            {' '}Check{' '}
            <Link href="/treks/brahmatal-trek/departures" style={{ color: 'var(--color-primary)' }}>
              upcoming Brahmatal trek departures
            </Link>{' →'}
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Kuari Pass Trek — Best Views for Moderate Effort
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>3,876 m</strong> &nbsp;|&nbsp; <strong>Moderate</strong> &nbsp;|&nbsp;
            <strong>5 days</strong> &nbsp;|&nbsp; <strong>Mar–May, Oct–Nov</strong> &nbsp;|&nbsp;
            Joshimath, Garhwal
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>
              Kuari Pass Trek
            </Link>{' '}
            follows the historic Lord Curzon Trail along a high ridge with near-continuous views of Nanda Devi (7,816 m), Dronagiri, Chaukhamba, and Kamet. No technical challenges, no glacier terrain — just sustained ridge walking through oak forest and alpine meadow. The view-to-effort ratio is the highest of any trek in Uttarakhand. Spring brings rhododendron blooms; autumn delivers the sharpest visibility. Choosing between these two?{' '}
            <Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)' }}>
              Compare Brahmatal vs Kuari Pass
            </Link>{' '}
            for the detailed breakdown. Check{' '}
            <Link href="/treks/kuari-pass-trek/departures" style={{ color: 'var(--color-primary)' }}>
              upcoming Kuari Pass trek departures
            </Link>{' →'}
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Khaliya Top Trek — Shortest Route to Serious Views
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>3,500 m</strong> &nbsp;|&nbsp; <strong>Moderate</strong> &nbsp;|&nbsp;
            <strong>3–4 days</strong> &nbsp;|&nbsp; <strong>May–Jun, Sep–Oct</strong> &nbsp;|&nbsp;
            Munsiyari, Kumaon
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/munsiyari/khaliya-top-trek" style={{ color: 'var(--color-primary)' }}>
              Khaliya Top
            </Link>{' '}
            is a broad alpine meadow at 3,500 metres above Munsiyari, offering an unbroken 180-degree panorama of the five Panchachuli summits, Nanda Devi East, and the Rajrambha range. The trek is pure sustained uphill through rhododendron forest — no technical terrain, no river crossings.  At 3–4 days, it is the shortest route to genuine high-altitude Himalayan views in Uttarakhand. Ideal for working professionals on extended weekends, and as acclimatisation before the{' '}
            <Link href="/treks/location/munsiyari/milam-glacier-trek" style={{ color: 'var(--color-primary)' }}>
              Milam Glacier expedition
            </Link>.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Tiger Fall &amp; Budher Caves — Weekend Day Treks
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>~2,200 m</strong> &nbsp;|&nbsp; <strong>Easy</strong> &nbsp;|&nbsp;
            <strong>1 day each</strong> &nbsp;|&nbsp; <strong>Year-round</strong> &nbsp;|&nbsp;
            Chakrata
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/chakrata/tiger-fall-trek" style={{ color: 'var(--color-primary)' }}>
              Tiger Fall trail
            </Link>{' '}
            (12 km through deodar forest to a major Himalayan waterfall) and the{' '}
            <Link href="/treks/location/chakrata/budher-caves-trek" style={{ color: 'var(--color-primary)' }}>
              Budher Caves trek
            </Link>{' '}
            (10 km to ancient limestone caves) are the lowest-barrier entry points to Himalayan trekking.  No altitude concerns, no prior experience, no multi-day commitment. Just 2–3 hours from Dehradun. Combine with a{' '}
            <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)' }}>
              wellness retreat in Chakrata
            </Link>{' '}
            for a weekend that balances activity with rest.
          </p>
        </section>

        {/* ── SECTION 2: MODERATE MULTI-DAY ────────────────────────── */}
        <section id="moderate-treks" style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Moderate Multi-Day Treks
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            These routes offer the core Himalayan trekking experience — multiple days on trail, camping at altitude, and the slow rhythm of walking through changing landscapes. All are accessible to fit beginners willing to prepare, but they demand genuine physical effort and respect for mountain conditions.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Kedarkantha Trek — The Classic Winter Summit
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>3,810 m</strong> &nbsp;|&nbsp; <strong>Moderate–Challenging</strong> &nbsp;|&nbsp;
            <strong>5 days</strong> &nbsp;|&nbsp; <strong>Dec–Feb</strong> &nbsp;|&nbsp;
            Sankri
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>
              Kedarkantha
            </Link>{' '}
            is the most popular guided trek in northern India — and for good reason. A 5-day route from Sankri to a 3,810 m summit with 360-degree views across six Himalayan ranges. The final summit-day push gains 1,500 feet through deep snow, which lifts it above pure moderate difficulty, but the rest of the route is well-paced and guided throughout. It is the definitive first summit experience in the Indian Himalayas.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Har Ki Dun Trek — The Valley Immersion
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>3,566 m</strong> &nbsp;|&nbsp; <strong>Moderate</strong> &nbsp;|&nbsp;
            <strong>5 days</strong> &nbsp;|&nbsp; <strong>May–Jun, Sep–Oct</strong> &nbsp;|&nbsp;
            Sankri
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)' }}>
              Har Ki Dun
            </Link>{' '}
            is the finest valley trek in northern India — 5 days through the Tons Valley with forest, traditional mountain villages, alpine meadows, and a glacial amphitheatre at the head. If Kedarkantha is about one intense summit moment, Har Ki Dun is about sustained immersion in a landscape that changes with every day of walking. Best in summer when the valley is green and wildflowers carpet the higher meadows. Deciding between the two? See{' '}
            <Link href="/treks/kedarkantha-vs-har-ki-dun" style={{ color: 'var(--color-primary)' }}>
              Kedarkantha vs Har Ki Dun
            </Link>.
          </p>
        </section>

        <PrimaryCTA
          label="Find My Difficulty Level"
          subtext="Not sure where to start? Share your fitness and experience — we will recommend the right difficulty."
          vertical="trek"
          category="apex"
          sourcePath={PATH}
        />

        {/* ── SECTION 3: CHALLENGING ───────────────────────────────── */}
        <section id="challenging-treks" style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Challenging High-Altitude Treks
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            These routes require prior high-altitude experience (above 4,000 m), 6–8 weeks of structured fitness preparation, and comfort with steep, exposed, and potentially snow-covered terrain. They are not enhanced day hikes — they are serious mountain routes where preparation directly determines safety and enjoyment.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Roopkund Trek — The Mystery Lake Expedition
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>4,800 m</strong> &nbsp;|&nbsp; <strong>Challenging</strong> &nbsp;|&nbsp;
            <strong>7 days</strong> &nbsp;|&nbsp; <strong>May–Jun, Sep–Oct</strong> &nbsp;|&nbsp;
            Lohajung, Garhwal
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>
              Roopkund
            </Link>{' '}
            is India&apos;s most iconic high-altitude trek — a 53 km expedition from Lohajung to a glacial lake at 4,800 metres, known for the centuries-old skeletal remains at its shores. The route crosses the vast Bedni Bugyal alpine meadow, navigates moraine fields, and demands sustained altitude tolerance. The Bugyal alone — stretching kilometres in every direction with Trishul views — justifies the effort. This is the trek for experienced Himalayan trekkers seeking a genuine expedition in{' '}
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)' }}>
              Garhwal&apos;s most dramatic landscape
            </Link>.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Pangarchulla Peak Trek — The Summit Climb
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>4,590 m</strong> &nbsp;|&nbsp; <strong>Challenging</strong> &nbsp;|&nbsp;
            <strong>6 days</strong> &nbsp;|&nbsp; <strong>Mar–May</strong> &nbsp;|&nbsp;
            Joshimath, Garhwal
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>
              Pangarchulla
            </Link>{' '}
            is one of the few accessible true summit experiences in Uttarakhand. The route follows the Kuari Pass approach before diverging toward a steep snow-and-scree ascent with an alpine start. At the top: a 360° panorama of Nanda Devi, Dronagiri, Chaukhamba, and the entire Nanda Devi Sanctuary. Crampons required. For experienced trekkers who want to stand on a peak, not a pass. Choosing between the two Garhwal challenges?{' '}
            <Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)' }}>
              Compare Roopkund vs Pangarchulla
            </Link>.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Milam Glacier Trek — The Remote Expedition
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>3,450 m</strong> &nbsp;|&nbsp; <strong>Challenging</strong> &nbsp;|&nbsp;
            <strong>8–10 days</strong> &nbsp;|&nbsp; <strong>May–Jun, Sep–Oct</strong> &nbsp;|&nbsp;
            Munsiyari, Kumaon
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/munsiyari/milam-glacier-trek" style={{ color: 'var(--color-primary)' }}>
              Milam Glacier
            </Link>{' '}
            is Uttarakhand&apos;s great expedition trek — an 8–10 day, 118 km journey along the ancient Johar Valley trade route from Munsiyari to the glacier snout beneath the Panchachuli massif. The route passes through abandoned Bhotiya trading villages (Martoli, Burfu), crosses glacial moraines, and follows the Goriganga River into genuinely wild terrain. The altitude is lower than Roopkund, but the sustained multi-day commitment and remoteness make it equally demanding. For trekkers who want to walk deep into the mountains, not just look at them from a ridgeline.
          </p>
        </section>

        {/* ── SECTION 4: SNOW TREKS ────────────────────────────────── */}
        <section id="snow-treks" style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Snow Treks in Uttarakhand
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Winter transforms the Uttarakhand Himalaya — frozen lakes, snow-laden forests, and summit ridges under continuous white. The best snow season runs December to March, with peak conditions in January and February.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>
              <strong>Brahmatal</strong>
            </Link>{' '}
            is the ideal first snow trek — frozen lake, snow ridges, and moderate difficulty with no technical sections. The trail through snow-covered rhododendron forest is visually stunning and the 4-day duration keeps cold exposure manageable.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>
              <strong>Kedarkantha</strong>
            </Link>{' '}
            is the quintessential winter summit experience — deep snow above 3,200 m, a steep final push, and sunrise from a snow-covered peak. More physically demanding than Brahmatal, with a proper summit-day challenge.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>
              <strong>Kuari Pass (March)</strong>
            </Link>{' '}
            in early spring retains significant snow on the upper sections, adding alpine character to the ridge walk. Not a pure winter trek, but the lingering snow plus rhododendron bloom makes March the most photogenic window.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            For a deeper dive into winter route selection, see our{' '}
            <Link href="/blog/best-snow-treks-garhwal-himalaya" style={{ color: 'var(--color-primary)' }}>
              guide to Garhwal snow treks
            </Link>{' '}
            and the full{' '}
            <Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              winter treks in Uttarakhand
            </Link>{' '}
            seasonal page.
          </p>
        </section>

        {/* ── SECTION 5: HIGH ALTITUDE ─────────────────────────────── */}
        <section id="high-altitude" style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            High-Altitude Treks Above 4,000 m
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Above 4,000 metres, the landscape changes fundamentally — treeline gives way to exposed moraine and glacial terrain, oxygen pressure drops to levels that affect decision-making, and weather windows shrink. These treks require prior altitude experience and serious preparation.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>
              <strong>Roopkund (4,800 m)</strong>
            </Link>{' '}
            is the highest featured trek — a full 7-day expedition with sustained exposure above 4,000 m. The Bedni Bugyal meadows, the mystery lake, and the sheer scale of the Garhwal interior make this India&apos;s most sought-after high-altitude trekking route.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>
              <strong>Pangarchulla (4,590 m)</strong>
            </Link>{' '}
            delivers a true peak summit — not a pass or a lake, but the top of a mountain with 360° views. The alpine-start summit push through snow is the most technically demanding single day on any featured trek.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Preparing for routes above 4,000 m? Our{' '}
            <Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: 'var(--color-primary)' }}>
              8-week fitness guide for Garhwal treks
            </Link>{' '}
            covers the physical preparation framework, and the{' '}
            <Link href="/blog/high-altitude-treks-garhwal-above-4000m" style={{ color: 'var(--color-primary)' }}>
              high-altitude trekking guide
            </Link>{' '}
            covers AMS management, acclimatisation protocols, and what to expect above the treeline.
          </p>
        </section>

        <PrimaryCTA
          label="Plan My Trek"
          subtext="Ready to start? Tell us your preferred season and experience level."
          vertical="trek"
          category="apex"
          sourcePath={PATH}
        />

        {/* ── SECTION 6: REGIONS ───────────────────────────────────── */}
        <section id="regions" style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Trekking Regions in Uttarakhand
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Uttarakhand&apos;s trekking landscape divides into four distinct regions, each with its own character, altitude profile, and access logistics. Understanding the regions helps you narrow from &ldquo;I want to trek in Uttarakhand&rdquo; to a specific route.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
              Garhwal Himalayas — The High-Altitude Heart
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The Garhwal interior — accessed from{' '}
            <Link href="/treks/location/lohajung" style={{ color: 'var(--color-primary)' }}>Lohajung</Link>{' '}
            and{' '}
            <Link href="/treks/location/joshimath" style={{ color: 'var(--color-primary)' }}>Joshimath</Link>{' '}
            — is where Uttarakhand&apos;s highest and most dramatic treks live. Brahmatal, Kuari Pass, Roopkund, and Pangarchulla offer altitude ranges from 3,850 to 4,800 metres with Nanda Devi Sanctuary views.  This is the premier trekking region for those seeking classic Himalayan routes. Our{' '}
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)' }}>
              complete Garhwal trekking guide
            </Link>{' '}
            covers all four routes in depth, including seasonal windows and{' '}
            <Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: 'var(--color-primary)' }}>
              packing checklists
            </Link>.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/treks/location/sankri" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
              Sankri — Winter Summit &amp; Valley Base
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Sankri in the Govind Wildlife Sanctuary zone is the base for two of Uttarakhand&apos;s most popular multi-day treks: Kedarkantha (winter summit) and Har Ki Dun (summer valley). It sits at the intersection of alpine forest and high meadow, offering distinctly different experiences depending on the season. Reached from Dehradun in 4–5 hours — the fastest access to genuine multi-day trekking.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/treks/location/chakrata" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
              Chakrata — Weekend Forest Trails
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Chakrata is the gateway for first-time trekkers and weekend travellers from Delhi. The Tiger Fall and Budher Caves trails stay below 2,500 metres in dense deodar forest — no altitude concerns, no multi-day gear, no prior experience needed. Just 2–3 hours from Dehradun. Combine trekking with a{' '}
            <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)' }}>
              Chakrata retreat
            </Link>{' '}
            for a balanced weekend of movement and rest.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/treks/location/munsiyari" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
              Kumaon (Munsiyari) — Remote Expeditions &amp; Panchachuli Views
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Munsiyari in the Kumaon Himalaya is the base for routes that trade accessibility for authenticity — the Milam Glacier expedition (8–10 days along the Johar trade route) and the Khaliya Top summit (3–4 days to a Panchachuli panorama). Fewer crowds, deeper cultural layers (Bhotiya heritage, abandoned trading villages), and terrain that feels genuinely wild. The longer travel time from Delhi (12–14 hours) is the price of admission.
          </p>
        </section>

        {/* ── PROGRESSION PATH ─────────────────────────────────────── */}
        <section id="progression" style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            The Trekking Progression Path
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Most successful Himalayan trekkers build experience in stages. The natural progression through Uttarakhand&apos;s routes follows altitude and duration:
          </p>
          <ol style={{ paddingLeft: '1.25rem', lineHeight: 2.2, marginBottom: '1rem' }}>
            <li>
              <strong>Day treks (Easy):</strong>{' '}
              <Link href="/treks/location/chakrata/tiger-fall-trek" style={{ color: 'var(--color-primary)' }}>Tiger Fall</Link>{' '}
              or{' '}
              <Link href="/treks/location/chakrata/budher-caves-trek" style={{ color: 'var(--color-primary)' }}>Budher Caves</Link>{' '}
              in Chakrata — builds trail confidence with zero altitude risk.
            </li>
            <li>
              <strong>First multi-day (Moderate):</strong>{' '}
              <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal</Link>{' '}
              or{' '}
              <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>Kuari Pass</Link>{' '}
              — introduces camping, altitude, and multi-day rhythm.
            </li>
            <li>
              <strong>Summit experience (Moderate–Challenging):</strong>{' '}
              <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>Kedarkantha</Link>{' '}
              — adds a genuine summit push and winter snow conditions.
            </li>
            <li>
              <strong>High altitude (Challenging):</strong>{' '}
              <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>Pangarchulla</Link>{' '}
              or{' '}
              <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>Roopkund</Link>{' '}
              — sustained exposure above 4,000 m with technical demands.
            </li>
            <li>
              <strong>Expedition (Challenging):</strong>{' '}
              <Link href="/treks/location/munsiyari/milam-glacier-trek" style={{ color: 'var(--color-primary)' }}>Milam Glacier</Link>{' '}
              — 8–10 days of continuous remote trekking through glacial terrain.
            </li>
          </ol>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            For a detailed training framework that maps to each level, see our{' '}
            <Link href="/blog/beginner-to-advanced-trek-progression-garhwal" style={{ color: 'var(--color-primary)' }}>
              beginner-to-advanced trek progression guide
            </Link>{' '}
            and the{' '}
            <Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: 'var(--color-primary)' }}>
              8-week fitness preparation plan
            </Link>.
          </p>
        </section>

        {/* ── HOW TO CHOOSE ────────────────────────────────────────── */}
        <section id="how-to-choose" style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            How to Choose the Right Trek
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Three questions determine the right route:
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>When are you going?</strong> December–February: Brahmatal or Kedarkantha (snow treks). March–May: Kuari Pass, Pangarchulla, or Khaliya Top. May–June: Roopkund, Har Ki Dun, or Milam Glacier. September–November: Roopkund, Kuari Pass, or Khaliya Top. Season narrows the shortlist immediately.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>How many days do you have?</strong> 1 day: Chakrata. 3–4 days: Brahmatal or Khaliya Top. 5 days: Kuari Pass, Kedarkantha, or Har Ki Dun. 6–7 days: Pangarchulla or Roopkund. 8–10 days: Milam Glacier. Duration filters by logistics.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>What experience do you have?</strong> First trek: Tiger Fall or Brahmatal. Second trek: Kuari Pass or Kedarkantha. Third+: Pangarchulla or Roopkund. Expedition-ready: Milam Glacier. Experience determines safety and enjoyment at altitude.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Still deciding? Our{' '}
            <Link href="/treks/beginner-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              beginner treks guide
            </Link>{' '}
            and{' '}
            <Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              summer treks page
            </Link>{' '}
            offer filtered views by difficulty and season.
          </p>
        </section>

        <PrimaryCTA
          label="Talk to a Trek Coordinator"
          subtext="Share your dates and fitness level. We will recommend the exact route for your experience."
          vertical="trek"
          category="apex"
          sourcePath={PATH}
        />

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-lg)' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </section>

        {/* ── EXPLORE MORE ─────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-md)', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
            Explore by Region &amp; Topic
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2.2 }}>
            <li><Link href={`${PATH}/beginner`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Beginner Treks in Uttarakhand →</Link></li>
            <li><Link href={`${PATH}/snow`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Snow Treks in Uttarakhand →</Link></li>
            <li><Link href={`${PATH}/high-altitude`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>High-Altitude Treks Above 4,000 m →</Link></li>
            <li><Link href={`${PATH}/challenging`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Challenging Treks in Uttarakhand →</Link></li>
            <li style={{ borderTop: '1px solid var(--color-border)', marginTop: '0.5rem', paddingTop: '0.5rem' }}><Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Garhwal Himalayas — Complete Trekking Guide →</Link></li>
            <li><Link href="/treks/location/sankri" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Treks from Sankri →</Link></li>
            <li><Link href="/treks/location/munsiyari" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Treks from Munsiyari →</Link></li>
            <li><Link href="/treks/location/chakrata" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Weekend Treks from Chakrata →</Link></li>
            <li><Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal vs Kuari Pass — Moderate Trek Comparison →</Link></li>
            <li><Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund vs Pangarchulla — Challenging Trek Comparison →</Link></li>
            <li><Link href="/treks/kedarkantha-vs-har-ki-dun" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kedarkantha vs Har Ki Dun — Sankri Trek Comparison →</Link></li>
            <li><Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Winter Treks in Uttarakhand →</Link></li>
            <li><Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Summer Treks in Uttarakhand →</Link></li>
            <li><Link href="/treks/beginner-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Beginner Treks in Uttarakhand →</Link></li>
            <li><Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>8-Week Fitness Guide for Garhwal Treks →</Link></li>
            <li><Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Packing Checklist — Print-Ready Gear List →</Link></li>
          </ul>
        </section>

      </article>
    </TrackedPage>
  );
}
