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

const PATH = '/treks/best-treks-in-uttarakhand/challenging';
const PARENT_PATH = '/treks/best-treks-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Most Challenging Treks in Uttarakhand (2025) — Difficult Routes',
    description:
      'The 3 most challenging treks in Uttarakhand for experienced trekkers. Roopkund, Pangarchulla, and Milam Glacier — difficulty analysis, fitness requirements, and route comparison.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the most difficult trek in Uttarakhand?',
    answer:
      'Milam Glacier is the most demanding in terms of sustained commitment — 8–10 days, 118 km, through remote Kumaon terrain with limited evacuation options. Roopkund is the most demanding in terms of altitude (4,800 m with multiple days above 4,000 m). Pangarchulla has the most intense single day — a 1,200 m alpine-start summit push through snow.',
  },
  {
    question: 'What experience do I need for challenging treks?',
    answer:
      'Prior high-altitude experience above 3,500 m is essential — ideally Kedarkantha, Kuari Pass, or Brahmatal. You should have completed at least 2–3 multi-day treks and be comfortable with camping, cold weather, and sustained physical effort across 6–8 hours per day.',
  },
  {
    question: 'How fit do I need to be for Roopkund or Pangarchulla?',
    answer:
      '6–8 weeks of structured preparation: running/cycling 30–45 min 4x/week, loaded stair climbing (15 kg pack) 2x/week, and core stability work. You should be able to run 5 km in under 30 minutes and climb 60 floors in an hour with a loaded pack before attempting either route.',
  },
  {
    question: 'Which challenging trek should I do first — Roopkund or Pangarchulla?',
    answer:
      'Pangarchulla if you prefer a concentrated summit challenge (one very hard day). Roopkund if you prefer sustained expedition-style trekking (multiple days above 4,000 m). Both require similar fitness, but the physical demands are distributed differently.',
  },
];

const BREADCRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Treks', href: '/treks' },
  { name: 'Best Treks in Uttarakhand', href: PARENT_PATH },
  { name: 'Challenging Treks' },
];

export default function ChallengingTreksPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Best Treks in Uttarakhand', url: buildCanonicalUrl(PARENT_PATH) },
    { name: 'Challenging Treks', url: buildCanonicalUrl(PATH) },
  ]);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Most Challenging Treks in Uttarakhand',
        description:
          'Curated selection of difficult treks in Uttarakhand for experienced trekkers — Roopkund, Pangarchulla, and Milam Glacier.',
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
          { '@type': 'ListItem', position: 1, name: 'Roopkund Trek', url: buildCanonicalUrl('/treks/location/lohajung/roopkund-trek') },
          { '@type': 'ListItem', position: 2, name: 'Pangarchulla Peak Trek', url: buildCanonicalUrl('/treks/location/joshimath/pangarchulla-trek') },
          { '@type': 'ListItem', position: 3, name: 'Milam Glacier Trek', url: buildCanonicalUrl('/treks/location/munsiyari/milam-glacier-trek') },
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
          Most Challenging Treks in Uttarakhand
        </h1>

        <aside style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1rem 1.25rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
          <strong>Quick pick:</strong>{' '}
          <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>Roopkund</Link>{' '}
          for sustained high-altitude endurance (7 days, 4,800 m).{' '}
          <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>Pangarchulla</Link>{' '}
          for an intense single-day summit push (4,590 m).{' '}
          <Link href="/treks/location/munsiyari/milam-glacier-trek" style={{ color: 'var(--color-primary)' }}>Milam Glacier</Link>{' '}
          for remote 8–10 day expedition trekking.
        </aside>

        <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
          These are not enhanced day hikes. They are serious mountain routes where preparation directly determines
          safety and enjoyment. All three require prior high-altitude experience (above 3,500 m), 6–8 weeks of
          structured fitness work, and comfort with steep, exposed, and potentially snow-covered terrain. Each offers
          a fundamentally different type of challenge — from sustained expedition endurance to a single
          do-or-die summit push.
        </p>
        <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>
          These routes are drawn from our{' '}
          <Link href={PARENT_PATH} style={{ color: 'var(--color-primary)' }}>
            complete ranking of the 10 best treks in Uttarakhand
          </Link>. Not ready for challenging routes yet? The{' '}
          <Link href={`${PARENT_PATH}/beginner`} style={{ color: 'var(--color-primary)' }}>
            beginner treks
          </Link>{' '}
          page covers easy and moderate alternatives.
        </p>

        {/* ── ROOPKUND ─────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Roopkund — The Mystery Lake Expedition
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
            is India&apos;s most iconic high-altitude trek — a 53 km expedition from Lohajung to a glacial lake at
            4,800 metres, known for the centuries-old skeletal remains at its shores. The route crosses the vast Bedni
            Bugyal alpine meadow, navigates moraine fields, and demands sustained altitude tolerance across multiple days
            above 4,000 metres. The Bugyal alone — stretching kilometres in every direction with Trishul views — justifies
            the effort.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Why it is challenging:</strong> Unlike Pangarchulla (where the difficulty concentrates in a single summit
            day), Roopkund distributes its demands across 7 days with sustained exposure above 4,000 m. Altitude sickness
            risk is cumulative. The moraine fields above 4,200 m require careful foot placement for hours at a time.
            Weather deteriorates rapidly above the Bugyal. This is expedition trekking, not a weekend challenge.
          </p>
        </section>

        {/* ── PANGARCHULLA ─────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Pangarchulla Peak — The Summit Climb
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
            is one of the few accessible true summit experiences in Uttarakhand. The route follows the Kuari Pass approach
            before diverging toward a steep snow-and-scree ascent with an alpine start. At the top: a 360-degree panorama
            of Nanda Devi, Dronagiri, Chaukhamba, and the entire Nanda Devi Sanctuary. Crampons required. For experienced
            trekkers who want to stand on a peak, not a pass.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Why it is challenging:</strong> Summit day gains 1,200 m from high camp in a single alpine-start push
            beginning before dawn. The snow-and-scree terrain above 4,200 m requires crampons and confident movement on
            steep ground. The rest of the approach (Days 1–4 via the Kuari Pass trail) is moderate — the difficulty is
            concentrated into one relentless day.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Choosing between the two Garhwal challenges?{' '}
            <Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)' }}>
              Compare Roopkund vs Pangarchulla →
            </Link>
          </p>
        </section>

        {/* ── MILAM GLACIER ────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Milam Glacier — The Remote Expedition
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>3,450 m</strong> &nbsp;|&nbsp; <strong>Challenging</strong> &nbsp;|&nbsp;
            <strong>8–10 days</strong> &nbsp;|&nbsp; <strong>May–Jun, Sep–Oct</strong> &nbsp;|&nbsp;
            Munsiyari, Kumaon
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <Link href="/treks/location/munsiyari/milam-glacier-trek" style={{ color: 'var(--color-primary)' }}>
              Milam Glacier
            </Link>{' '}
            is Uttarakhand&apos;s great expedition trek — an 8–10 day, 118 km journey along the ancient Johar Valley
            trade route from Munsiyari to the glacier snout beneath the Panchachuli massif. The route passes through
            abandoned Bhotiya trading villages (Martoli, Burfu), crosses glacial moraines, and follows the Goriganga
            River into genuinely wild terrain.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Why it is challenging:</strong> The altitude is lower than Roopkund (3,450 m max), but the sustained
            8–10 day commitment through remote terrain with limited evacuation options makes it equally demanding. You
            are walking deep into the mountains — days from the nearest road — with river crossings, moraines, and
            unpredictable weather. This is for trekkers who want genuine wilderness immersion, not a curated mountain
            experience.
          </p>
        </section>
        {/* ── COMPARISON CALLOUT ───────────────────────────────────── */}
        <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-xl)', background: 'var(--color-surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-primary)' }}>
          <strong>Still choosing between Roopkund and Pangarchulla?</strong>{' '}
          Our detailed{' '}
          <Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)' }}>
            Roopkund vs Pangarchulla comparison
          </Link>{' '}
          breaks down summit difficulty, seasonal windows, and which challenge suits your experience.
        </p>
        {/* ── COMPARISON TABLE ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Challenging Treks at a Glance
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Trek</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Max Altitude</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Days</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Challenge Type</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Region</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>Roopkund</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4,800 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>7</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Sustained altitude</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Garhwal</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>Pangarchulla</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4,590 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>6</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Intense summit push</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Garhwal</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/munsiyari/milam-glacier-trek" style={{ color: 'var(--color-primary)' }}>Milam Glacier</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,450 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>8–10</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Remote endurance</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Kumaon</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── PREPARATION PATH ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            The Path to Challenging Treks
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Attempting a challenging trek without proper progression increases both risk and misery. The recommended build-up:
          </p>
          <ol style={{ paddingLeft: '1.25rem', lineHeight: 2.2, marginBottom: '1rem' }}>
            <li>
              <strong>First multi-day:</strong>{' '}
              <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal</Link>{' '}
              or{' '}
              <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>Kuari Pass</Link>{' '}
              — tests altitude response at 3,850–3,876 m.
            </li>
            <li>
              <strong>Summit experience:</strong>{' '}
              <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>Kedarkantha</Link>{' '}
              — adds a genuine summit push and snow conditions.
            </li>
            <li>
              <strong>Challenging route:</strong> Pangarchulla, Roopkund, or Milam Glacier — full high-altitude or expedition demands.
            </li>
          </ol>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            For the complete progression framework with training plans for each level, see our{' '}
            <Link href="/blog/beginner-to-advanced-trek-progression-garhwal" style={{ color: 'var(--color-primary)' }}>
              beginner-to-advanced trek progression guide
            </Link>{' '}
            and the{' '}
            <Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: 'var(--color-primary)' }}>
              8-week fitness preparation plan
            </Link>.
          </p>
        </section>

        <PrimaryCTA
          label="Plan a Challenging Trek"
          subtext="Share your trekking history and preferred dates — we will match you with the right route."
          vertical="trek"
          category="filter-challenging"
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
            <li><Link href={`${PARENT_PATH}/high-altitude`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>High-Altitude Treks Above 4,000 m →</Link></li>
            <li><Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund vs Pangarchulla — Full Comparison →</Link></li>
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
