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

const PATH = '/treks/best-treks-in-uttarakhand/high-altitude';
const PARENT_PATH = '/treks/best-treks-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best High-Altitude Treks in Uttarakhand (2025) — Above 4,000 m',
    description:
      'The 3 best high-altitude treks in Uttarakhand above 4,000 m. Roopkund (4,800 m), Pangarchulla (4,590 m), and Brahmatal (3,850 m) — altitude profiles, preparation, and route details.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the highest trek in Uttarakhand?',
    answer:
      'Among commonly guided treks, Roopkund at 4,800 m is the highest featured route. Pangarchulla Peak at 4,590 m is the second-highest. Both are in the Garhwal Himalayas and require prior altitude experience above 3,500 m.',
  },
  {
    question: 'How do I prepare for a trek above 4,000 m?',
    answer:
      'Start with 6–8 weeks of structured fitness preparation: cardio (running, cycling), stair climbing with a loaded pack, and core strength work. Prior experience above 3,500 m (e.g., Kedarkantha or Kuari Pass) is strongly recommended. Acclimatisation days are built into itineraries, but personal preparation determines safety.',
  },
  {
    question: 'What are the symptoms of altitude sickness?',
    answer:
      'Early symptoms include headache, nausea, dizziness, and fatigue above 3,500 m. These typically resolve with rest and hydration. Severe symptoms (confusion, difficulty breathing at rest, loss of coordination) require immediate descent. All guided treks include altitude monitoring and emergency protocols.',
  },
  {
    question: 'Which high-altitude trek should I do first?',
    answer:
      'Brahmatal (3,850 m) is the recommended first high-altitude experience — it reaches significant altitude but with moderate difficulty and gradual gain. After that, Pangarchulla (4,590 m) or Roopkund (4,800 m) become viable next steps, depending on whether you prefer a summit climb or an expedition-style route.',
  },
];

const BREADCRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Treks', href: '/treks' },
  { name: 'Best Treks in Uttarakhand', href: PARENT_PATH },
  { name: 'High-Altitude Treks' },
];

export default function HighAltitudeTreksPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Best Treks in Uttarakhand', url: buildCanonicalUrl(PARENT_PATH) },
    { name: 'High-Altitude Treks', url: buildCanonicalUrl(PATH) },
  ]);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Best High-Altitude Treks in Uttarakhand',
        description:
          'Curated selection of treks above 4,000 m in Uttarakhand — Roopkund, Pangarchulla, and Brahmatal with altitude profiles and preparation guidance.',
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
          { '@type': 'ListItem', position: 1, name: 'Roopkund Trek (4,800 m)', url: buildCanonicalUrl('/treks/location/lohajung/roopkund-trek') },
          { '@type': 'ListItem', position: 2, name: 'Pangarchulla Peak Trek (4,590 m)', url: buildCanonicalUrl('/treks/location/joshimath/pangarchulla-trek') },
          { '@type': 'ListItem', position: 3, name: 'Brahmatal Trek (3,850 m)', url: buildCanonicalUrl('/treks/location/lohajung/brahmatal-trek') },
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
          High-Altitude Treks in Uttarakhand — Above 4,000 m
        </h1>

        <aside style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1rem 1.25rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
          <strong>Expedition or summit?</strong>{' '}
          <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>Roopkund</Link>{' '}
          (4,800 m) is a 7-day mystery-lake expedition.{' '}
          <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>Pangarchulla</Link>{' '}
          (4,590 m) is a true peak summit with 360° Nanda Devi views.{' '}
          <Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)' }}>Compare both →</Link>
        </aside>

        <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
          Above 4,000 metres, the Himalayan landscape changes fundamentally. Treeline gives way to exposed moraine
          and glacial terrain, oxygen pressure drops to levels that affect decision-making, and weather windows shrink
          to hours. These treks demand prior altitude experience, 6–8 weeks of structured fitness preparation, and
          genuine respect for mountain conditions. The reward: landscapes, views, and experiences that simply do not
          exist at lower elevations.
        </p>
        <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>
          These routes are drawn from our{' '}
          <Link href={PARENT_PATH} style={{ color: 'var(--color-primary)' }}>
            complete ranking of the 10 best treks in Uttarakhand
          </Link>. New to trekking? Start with the{' '}
          <Link href={`${PARENT_PATH}/beginner`} style={{ color: 'var(--color-primary)' }}>
            beginner treks
          </Link>{' '}
          page instead.
        </p>

        {/* ── ROOPKUND ─────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Roopkund — 4,800 m — The Mystery Lake Expedition
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>4,800 m</strong> &nbsp;|&nbsp; <strong>Challenging</strong> &nbsp;|&nbsp;
            <strong>7 days</strong> &nbsp;|&nbsp; <strong>May–Jun, Sep–Oct</strong> &nbsp;|&nbsp;
            Lohajung, Garhwal
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>
              Roopkund
            </Link>{' '}
            is the highest featured trek and India&apos;s most iconic high-altitude route. A 53 km, 7-day expedition from
            Lohajung to a glacial lake at 4,800 metres, known for centuries-old skeletal remains at its shores. The
            route crosses the vast Bedni Bugyal alpine meadow (one of the largest in Asia), navigates moraine fields
            above 4,200 m, and demands sustained altitude tolerance across multiple days above 4,000 m.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Altitude profile:</strong> Gradual gain through forest (Day 1–2), exposed alpine meadow at 3,600 m
            (Day 3), moraine traverse above 4,200 m (Day 4–5), and the final lake approach at 4,800 m. Two full
            acclimatisation stops are built into the itinerary. The sustained time above 4,000 m — not just a single
            summit push — is what makes Roopkund uniquely demanding.
          </p>
        </section>

        {/* ── PANGARCHULLA ─────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Pangarchulla — 4,590 m — The True Summit Climb
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>4,590 m</strong> &nbsp;|&nbsp; <strong>Challenging</strong> &nbsp;|&nbsp;
            <strong>6 days</strong> &nbsp;|&nbsp; <strong>Mar–May</strong> &nbsp;|&nbsp;
            Joshimath, Garhwal
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>
              Pangarchulla
            </Link>{' '}
            is one of the few accessible true peak summits in Uttarakhand — not a pass, not a lake, but the top of a
            mountain with 360-degree views of Nanda Devi, Dronagiri, Chaukhamba, and the entire Nanda Devi Sanctuary.
            The route follows the Kuari Pass approach before diverging toward a steep snow-and-scree ascent with an
            alpine-start summit day. Crampons required.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Altitude profile:</strong> The approach follows the moderate Kuari Pass trail (gradual gain to 3,400 m
            over 3 days), then diverts into steep, technical terrain. Summit day gains 1,200 m from high camp in a single
            push starting before dawn — the most physically demanding single day on any featured trek. The altitude
            is slightly lower than Roopkund, but the concentrated summit push is more intense.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Choosing between the two Garhwal high-altitude routes?{' '}
            <Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)' }}>
              Compare Roopkund vs Pangarchulla →
            </Link>
          </p>
        </section>

        {/* ── BRAHMATAL ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Brahmatal — 3,850 m — Gateway to High Altitude
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
            is the recommended stepping stone before attempting Roopkund or Pangarchulla. At 3,850 m, it provides
            genuine high-altitude exposure (above treeline, reduced oxygen, cold) with moderate difficulty and gradual
            altitude gain. The 4-day duration means limited time at altitude — enough to test your body&apos;s response
            without the sustained multi-day exposure of the Challenging routes.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Why it matters as a stepping stone:</strong> If you handle 3,850 m well — no persistent headache,
            good sleep quality, maintained appetite — you are likely ready for Roopkund (4,800 m) or Pangarchulla
            (4,590 m) after additional fitness preparation. If altitude affects you significantly on Brahmatal, you
            know to invest more in acclimatisation before attempting higher routes.
          </p>
        </section>

        {/* ── COMPARISON CALLOUT ───────────────────────────────────── */}
        <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-xl)', background: 'var(--color-surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-primary)' }}>
          <strong>Choosing between the two challenging high-altitude routes?</strong>{' '}
          Our{' '}
          <Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)' }}>
            Roopkund vs Pangarchulla comparison
          </Link>{' '}
          covers summit difficulty, fitness requirements, and seasonal windows in detail.
        </p>

        {/* ── COMPARISON TABLE ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            High-Altitude Treks at a Glance
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Trek</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Max Altitude</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Difficulty</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Days</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>Roopkund</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4,800 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Challenging</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>7</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Lake expedition</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>Pangarchulla</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4,590 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Challenging</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>6</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Peak summit</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,850 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Frozen lake</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── PREPARATION ──────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Preparing for High Altitude
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The single most important factor for safe high-altitude trekking is prior mountain experience. The recommended
            progression: Brahmatal (3,850 m) → Kedarkantha (3,810 m summit push) → Pangarchulla or Roopkund (4,500+ m).
            Each step tests your body&apos;s altitude response in progressively more demanding conditions.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Physical preparation for routes above 4,000 m requires 6–8 weeks minimum: running or cycling (30–45 min, 4×/week),
            loaded stair climbing (15 kg pack, 2×/week), and core stability work. Our{' '}
            <Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: 'var(--color-primary)' }}>
              8-week fitness guide
            </Link>{' '}
            provides a week-by-week programme targeting Garhwal high-altitude routes specifically. For gear requirements, see the{' '}
            <Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: 'var(--color-primary)' }}>
              packing checklist
            </Link>{' '}
            which includes a high-altitude section covering crampons, altitude medication, and layering for sustained cold.
          </p>
        </section>

        <PrimaryCTA
          label="Plan a High-Altitude Trek"
          subtext="Share your altitude experience and preferred dates — we will recommend the right route."
          vertical="trek"
          category="filter-high-altitude"
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
            <li><Link href={`${PARENT_PATH}/snow`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Snow Treks in Uttarakhand →</Link></li>
            <li><Link href={`${PARENT_PATH}/challenging`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Challenging Treks in Uttarakhand →</Link></li>
            <li><Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Garhwal Himalayas — Complete Trekking Guide →</Link></li>
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
