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

const PATH = '/treks/best-treks-in-uttarakhand/snow';
const PARENT_PATH = '/treks/best-treks-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Snow Treks in Uttarakhand (2025) — Winter Himalayan Routes',
    description:
      'The 3 best snow treks in Uttarakhand for winter 2024–25. Brahmatal, Kedarkantha, and Kuari Pass ranked by snow conditions, difficulty, and experience required.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
  };
}

const FAQ_ITEMS = [
  {
    question: 'When is the best time for snow treks in Uttarakhand?',
    answer:
      'December to March offers the best snow conditions. January and February deliver peak snow depth — Kedarkantha and Brahmatal trails are fully snow-covered above 3,000 m. Early December and late March can have patchy snow at lower elevations.',
  },
  {
    question: 'Which snow trek is easiest for first-timers?',
    answer:
      'Brahmatal is the easiest snow trek. At 4 days duration with moderate difficulty and no technical sections, it provides a complete snow trekking experience (frozen lake, snow ridges, summit views) without the steep summit push required on Kedarkantha.',
  },
  {
    question: 'Do I need crampons or ice axes for snow treks?',
    answer:
      'Microspikes or basic crampons are recommended for Kedarkantha summit day (steep snow above 3,500 m). Brahmatal can be done with gaiters and good trekking boots. Kuari Pass in March needs gaiters for upper snow sections. Trek operators typically provide microspikes if needed.',
  },
  {
    question: 'How cold does it get on winter treks in Uttarakhand?',
    answer:
      'Night temperatures at camp drop to -5°C to -15°C depending on altitude and month. January is coldest. Daytime on trail with sun is typically 0°C to 5°C. A proper 4-layer system (base, insulation, fleece, shell) plus a -15°C sleeping bag is essential.',
  },
];

const BREADCRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Treks', href: '/treks' },
  { name: 'Best Treks in Uttarakhand', href: PARENT_PATH },
  { name: 'Snow Treks' },
];

export default function SnowTreksPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Best Treks in Uttarakhand', url: buildCanonicalUrl(PARENT_PATH) },
    { name: 'Snow Treks', url: buildCanonicalUrl(PATH) },
  ]);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Best Snow Treks in Uttarakhand',
        description:
          'Curated selection of winter snow treks in Uttarakhand covering December to March routes with varying difficulty levels.',
        url: buildCanonicalUrl(PATH),
        isPartOf: {
          '@type': 'CollectionPage',
          url: buildCanonicalUrl(PARENT_PATH),
          name: '10 Best Treks in Uttarakhand',
        },
      },
      {
        '@type': 'ItemList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Brahmatal Trek', url: buildCanonicalUrl('/treks/location/lohajung/brahmatal-trek') },
          { '@type': 'ListItem', position: 2, name: 'Kedarkantha Trek', url: buildCanonicalUrl('/treks/location/sankri/kedarkantha-trek') },
          { '@type': 'ListItem', position: 3, name: 'Kuari Pass Trek (March)', url: buildCanonicalUrl('/treks/location/joshimath/kuari-pass-trek') },
        ],
      },
      breadcrumbSchema,
      faqSchema,
    ],
  };

  return (
    <TrackedPage page={PATH}>
      <article style={{ maxWidth: 720, margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
        <Breadcrumb items={BREADCRUMBS} />

        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.25, marginBottom: 'var(--space-md)' }}>
          Best Snow Treks in Uttarakhand
        </h1>

        <aside style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1rem 1.25rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
          <strong>First snow trek?</strong>{' '}
          Choose{' '}
          <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal</Link>{' '}
          — frozen lake, snow ridges, moderate difficulty.{' '}
          <strong>Want a summit?</strong>{' '}
          <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>Kedarkantha</Link>{' '}
          delivers deep-snow summit views across six Himalayan ranges.
        </aside>

        <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
          Winter transforms the Uttarakhand Himalaya — frozen lakes, snow-laden conifer forests, and summit ridges
          under continuous white. The snow trekking season runs December to March, with January and February delivering
          peak conditions. Three featured routes offer distinctly different winter experiences, from a gentle frozen-lake
          walk to a proper summit push through deep snow.
        </p>
        <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>
          These routes are drawn from our{' '}
          <Link href={PARENT_PATH} style={{ color: 'var(--color-primary)' }}>
            complete ranking of the 10 best treks in Uttarakhand
          </Link>. For non-winter routes, see the{' '}
          <Link href={`${PARENT_PATH}/beginner`} style={{ color: 'var(--color-primary)' }}>
            beginner treks
          </Link>{' '}
          and{' '}
          <Link href={`${PARENT_PATH}/high-altitude`} style={{ color: 'var(--color-primary)' }}>
            high-altitude treks
          </Link>{' '}
          filter pages.
        </p>

        {/* ── BRAHMATAL ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Brahmatal — The Ideal First Snow Trek
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>3,850 m</strong> &nbsp;|&nbsp; <strong>Moderate</strong> &nbsp;|&nbsp;
            <strong>4 days</strong> &nbsp;|&nbsp; <strong>Dec–Mar</strong> &nbsp;|&nbsp;
            Lohajung, Garhwal
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>
              Brahmatal
            </Link>{' '}
            is the snow trek most often recommended for first-time winter trekkers — and for good reason. A 4-day route
            from Lohajung through snow-covered rhododendron forest to a frozen alpine lake at 3,850 m, with continuous
            Trishul and Nanda Ghunti views from the upper ridges. No technical sections, no exposed scrambles, no
            crampons needed. The shorter 4-day duration also limits cold-weather exposure, which is the real challenge
            of winter trekking for beginners.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Snow conditions:</strong> Above 3,000 m, expect 1–3 feet of packed snow from mid-December. The
            trail through snow-covered forest is visually stunning and the frozen lake itself — with mountain reflections
            visible through ice — is the signature moment. January and February offer the deepest snow.
          </p>
        </section>

        {/* ── KEDARKANTHA ──────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Kedarkantha — The Quintessential Winter Summit
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>3,810 m</strong> &nbsp;|&nbsp; <strong>Moderate–Challenging</strong> &nbsp;|&nbsp;
            <strong>5 days</strong> &nbsp;|&nbsp; <strong>Dec–Feb</strong> &nbsp;|&nbsp;
            Sankri
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>
              Kedarkantha
            </Link>{' '}
            is the most popular winter trek in India — the definitive first summit experience in deep snow. A 5-day
            route from Sankri with a final summit push that gains 1,500 feet through knee-deep snow to a 3,810 m peak
            offering 360-degree views across six Himalayan ranges. More physically demanding than Brahmatal, with a
            proper summit-day challenge that separates it from a standard snow walk.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Snow conditions:</strong> Deep snow above 3,200 m from December. The summit push is the centrepiece —
            a steep, sustained climb through snow that requires microspikes and genuine effort. Sunrise from the
            snow-covered peak is the most photographed moment in Indian winter trekking.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Choosing between the two winter routes? Our detailed{' '}
            <Link href="/blog/kedarkantha-vs-har-ki-dun" style={{ color: 'var(--color-primary)' }}>
              Kedarkantha vs Har Ki Dun comparison
            </Link>{' '}
            covers the decision framework for Sankri-based treks.
          </p>
        </section>

        {/* ── KUARI PASS MARCH ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Kuari Pass (March) — Snow Meets Spring
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>3,876 m</strong> &nbsp;|&nbsp; <strong>Moderate</strong> &nbsp;|&nbsp;
            <strong>5 days</strong> &nbsp;|&nbsp; <strong>March</strong> &nbsp;|&nbsp;
            Joshimath, Garhwal
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>
              Kuari Pass
            </Link>{' '}
            in early March sits at the intersection of winter and spring — significant snow remains on the upper
            sections while rhododendrons begin blooming on the lower trail. Not a pure deep-snow trek like Kedarkantha,
            but the combination of lingering snow, spring colour, and the famous Curzon Trail ridge walk creates the
            most photogenic window of any featured route.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Snow conditions:</strong> Upper sections (above 3,400 m) retain 1–2 feet of snow through mid-March.
            Lower trail transitions from snow to mud to dry trail as spring advances. The ridge walk with snow
            underfoot and Nanda Devi views is the highlight.
          </p>
        </section>

        {/* ── COMPARISON CALLOUT ───────────────────────────────────── */}
        <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-xl)', background: 'var(--color-surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-primary)' }}>
          <strong>Choosing between Kedarkantha and Har Ki Dun from Sankri?</strong>{' '}
          Both leave from the same base town but deliver opposite experiences.{' '}
          <Link href="/treks/kedarkantha-vs-har-ki-dun" style={{ color: 'var(--color-primary)' }}>
            See the full Kedarkantha vs Har Ki Dun comparison →
          </Link>
        </p>

        {/* ── COMPARISON TABLE ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Snow Treks at a Glance
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Trek</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Altitude</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Difficulty</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Days</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Peak Snow</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,850 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Jan–Feb</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>Kedarkantha</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,810 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate–Challenging</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>5</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Dec–Feb</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>Kuari Pass</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,876 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>5</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Mar (lingering)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── GEAR ESSENTIALS ──────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Winter Gear Essentials
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Snow trekking demands specific gear beyond standard 3-season equipment. The critical additions:
            waterproof shell layers (jacket + pants), insulated gloves with waterproof outers, gaiters to keep snow
            out of boots, microspikes for icy sections, and a sleeping bag rated to -15°C minimum.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Our{' '}
            <Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: 'var(--color-primary)' }}>
              print-ready packing checklist
            </Link>{' '}
            includes a winter-specific section covering all snow trek gear. For fitness preparation targeting
            winter conditions, see the{' '}
            <Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: 'var(--color-primary)' }}>
              8-week fitness guide
            </Link>.
          </p>
        </section>

        <PrimaryCTA
          label="Book a Winter Trek"
          subtext="Share your preferred dates — we will confirm snow conditions and availability."
          vertical="trek"
          category="filter-snow"
          sourcePath={PATH}
        />

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-lg)' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </section>

        {/* ── RELATED FILTER PAGES ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-md)', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
            Browse by Category
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2.2 }}>
            <li><Link href={PARENT_PATH} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>← All 10 Best Treks in Uttarakhand</Link></li>
            <li><Link href={`${PARENT_PATH}/beginner`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Beginner Treks in Uttarakhand →</Link></li>
            <li><Link href={`${PARENT_PATH}/high-altitude`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>High-Altitude Treks Above 4,000 m →</Link></li>
            <li><Link href={`${PARENT_PATH}/challenging`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Challenging Treks in Uttarakhand →</Link></li>
            <li><Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Winter Treks in Uttarakhand — Seasonal Guide →</Link></li>
          </ul>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </article>
    </TrackedPage>
  );
}
