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

const PATH = '/treks/best-treks-in-uttarakhand/beginner';
const PARENT_PATH = '/treks/best-treks-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Beginner Treks in Uttarakhand (2025) — Easy & Moderate Routes',
    description:
      'The 5 best beginner-friendly treks in Uttarakhand ranked by difficulty. From easy day hikes in Chakrata to moderate multi-day routes in Garhwal — no prior trekking experience needed.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is the easiest trek in Uttarakhand?',
    answer:
      'Tiger Fall in Chakrata is the easiest featured trek — a single-day forest trail below 2,500 m with no altitude risk, no camping gear needed, and year-round accessibility. It is ideal for first-time trekkers and families.',
  },
  {
    question: 'Can a complete beginner do a multi-day trek in Uttarakhand?',
    answer:
      'Yes. Brahmatal (4 days, Moderate) and Kuari Pass (5 days, Moderate) are designed for fit beginners with no prior trekking experience. Both are fully guided, with established campsites and gradual altitude gain.',
  },
  {
    question: 'What fitness level is needed for beginner treks?',
    answer:
      'For Chakrata day treks, basic walking fitness is sufficient. For Brahmatal or Kuari Pass, 4–6 weeks of preparation including cardio (jogging, cycling) and stair climbing is recommended. You should be comfortable walking 8–12 km on uneven ground.',
  },
  {
    question: 'What is the best season for beginner treks in Uttarakhand?',
    answer:
      'October–November and March–May offer the most comfortable conditions — mild temperatures, clear skies, and dry trails. Brahmatal is a winter-specific trek (Dec–Mar) with snow but moderate difficulty. Chakrata day hikes are accessible year-round.',
  },
];

const BREADCRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Treks', href: '/treks' },
  { name: 'Best Treks in Uttarakhand', href: PARENT_PATH },
  { name: 'Beginner Treks' },
];

export default function BeginnerTreksPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Best Treks in Uttarakhand', url: buildCanonicalUrl(PARENT_PATH) },
    { name: 'Beginner Treks', url: buildCanonicalUrl(PATH) },
  ]);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Best Beginner Treks in Uttarakhand',
        description:
          'Curated selection of easy and moderate treks in Uttarakhand for first-time trekkers, covering day hikes to multi-day routes.',
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
          { '@type': 'ListItem', position: 1, name: 'Tiger Fall Trek', url: buildCanonicalUrl('/treks/location/chakrata/tiger-fall-trek') },
          { '@type': 'ListItem', position: 2, name: 'Budher Caves Trek', url: buildCanonicalUrl('/treks/location/chakrata/budher-caves-trek') },
          { '@type': 'ListItem', position: 3, name: 'Brahmatal Trek', url: buildCanonicalUrl('/treks/location/lohajung/brahmatal-trek') },
          { '@type': 'ListItem', position: 4, name: 'Kuari Pass Trek', url: buildCanonicalUrl('/treks/location/joshimath/kuari-pass-trek') },
          { '@type': 'ListItem', position: 5, name: 'Khaliya Top Trek', url: buildCanonicalUrl('/treks/location/munsiyari/khaliya-top-trek') },
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
          Best Beginner Treks in Uttarakhand
        </h1>

        <aside style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1rem 1.25rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
          <strong>Not sure which beginner trek to choose?</strong>{' '}
          Start with{' '}
          <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal</Link>{' '}
          for snow views and a frozen alpine lake, or{' '}
          <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>Kuari Pass</Link>{' '}
          for panoramic Nanda Devi views on the historic Curzon Trail. Both are moderate, fully guided, and need no technical skills.
        </aside>

        <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
          You do not need expedition experience to trek in the Himalayas. Uttarakhand offers a clear pathway from
          flat forest trails to moderate multi-day routes — each step building the skills and confidence for the next.
          This page covers the 5 best treks for beginners: two easy day hikes (no gear, no altitude) and three
          moderate routes (camping, gentle altitude, fully guided).
        </p>
        <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>
          All five treks are included in our{' '}
          <Link href={PARENT_PATH} style={{ color: 'var(--color-primary)' }}>
            complete ranking of the 10 best treks in Uttarakhand
          </Link>, which also covers challenging and high-altitude routes for experienced trekkers.
        </p>

        {/* ── EASY DAY TREKS ───────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Easy Day Treks — No Experience Needed
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Chakrata sits 2–3 hours from Dehradun in dense deodar forest below 2,500 metres.
            These trails require no multi-day gear, no camping, and no altitude acclimatisation.
            They are the ideal first step for anyone who has never walked a mountain trail.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Tiger Fall Trek
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>~2,200 m</strong> &nbsp;|&nbsp; <strong>Easy</strong> &nbsp;|&nbsp;
            <strong>1 day</strong> &nbsp;|&nbsp; <strong>Year-round</strong> &nbsp;|&nbsp;
            Chakrata
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            A gentle forest walk to one of the tallest waterfalls in Uttarakhand. The trail stays below tree cover the
            entire way, with no exposed ridges or steep scrambles. Perfect for families, first-timers, or as a
            warm-up before a multi-day route.{' '}
            <Link href="/treks/location/chakrata/tiger-fall-trek" style={{ color: 'var(--color-primary)' }}>
              View full Tiger Fall trek details →
            </Link>
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Budher Caves Trek
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>~2,200 m</strong> &nbsp;|&nbsp; <strong>Easy</strong> &nbsp;|&nbsp;
            <strong>1 day</strong> &nbsp;|&nbsp; <strong>Year-round</strong> &nbsp;|&nbsp;
            Chakrata
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            A slightly longer forest trail leading to ancient limestone caves, offering more trail variety than Tiger Fall
            with a rewarding geological endpoint. Same low-altitude, low-risk profile, but adds exploration interest.{' '}
            <Link href="/treks/location/chakrata/budher-caves-trek" style={{ color: 'var(--color-primary)' }}>
              View full Budher Caves trek details →
            </Link>
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Both Chakrata trails pair well with a{' '}
            <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)' }}>
              Chakrata retreat weekend
            </Link>{' '}
            — trek in the morning, rest and reset in the afternoon.
          </p>
        </section>

        {/* ── MODERATE MULTI-DAY ───────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Moderate Multi-Day Treks — Your First Himalayan Camping Experience
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            These routes introduce camping at altitude, multi-day rhythm, and the full Himalayan trekking experience —
            but with gradual altitude gain, well-established trails, and professional guides throughout.
            No technical skills needed; 4–6 weeks of fitness preparation recommended.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Brahmatal Trek
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>3,850 m</strong> &nbsp;|&nbsp; <strong>Moderate</strong> &nbsp;|&nbsp;
            <strong>4 days</strong> &nbsp;|&nbsp; <strong>Dec–Mar</strong> &nbsp;|&nbsp;
            Lohajung, Garhwal
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The ideal first snow trek — frozen Brahmatal Lake, snow-covered ridges, and continuous Trishul and Nanda Ghunti
            views. The 4-day duration limits cold exposure while delivering a genuinely alpine experience. The route
            gains altitude gradually through forest before opening onto exposed ridge meadows.{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>
              View full Brahmatal trek details →
            </Link>
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Kuari Pass Trek
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>3,876 m</strong> &nbsp;|&nbsp; <strong>Moderate</strong> &nbsp;|&nbsp;
            <strong>5 days</strong> &nbsp;|&nbsp; <strong>Mar–May, Oct–Nov</strong> &nbsp;|&nbsp;
            Joshimath, Garhwal
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            One of the most accessible ridge walks in the Himalayas — 5 days along the historic Curzon Trail with
            Nanda Devi, Dronagiri, and Chaukhamba visible for most of the route. Spring brings snow on the upper
            sections plus rhododendron bloom along the lower trail. This is the classic first moderate trek in Garhwal.{' '}
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>
              View full Kuari Pass trek details →
            </Link>
            {' '}Deciding between the two moderate routes?{' '}
            <Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)' }}>
              Compare Brahmatal vs Kuari Pass →
            </Link>
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Khaliya Top Trek
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>3,500 m</strong> &nbsp;|&nbsp; <strong>Moderate</strong> &nbsp;|&nbsp;
            <strong>3–4 days</strong> &nbsp;|&nbsp; <strong>May–Jun, Sep–Oct</strong> &nbsp;|&nbsp;
            Munsiyari, Kumaon
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            A quieter alternative to the popular Garhwal routes — Khaliya Top offers a 360-degree Panchachuli massif panorama
            from 3,500 metres, with far fewer trekkers on trail. Based from Munsiyari in the Kumaon Himalaya, it provides
            a genuine alpine meadow summit experience at gentler altitude than Garhwal. Ideal for trekkers who value solitude
            alongside scenery.{' '}
            <Link href="/treks/location/munsiyari/khaliya-top-trek" style={{ color: 'var(--color-primary)' }}>
              View full Khaliya Top trek details →
            </Link>
          </p>
        </section>

        {/* ── COMPARISON CALLOUT ───────────────────────────────────── */}
        <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-xl)', background: 'var(--color-surface)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-primary)' }}>
          <strong>Still deciding between Brahmatal and Kuari Pass?</strong>{' '}
          See our detailed{' '}
          <Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)' }}>
            Brahmatal vs Kuari Pass comparison
          </Link>{' '}
          for a side-by-side breakdown of season, views, difficulty, and logistics.
        </p>

        {/* ── COMPARISON TABLE ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Beginner Treks at a Glance
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Trek</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Altitude</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Difficulty</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Days</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Best Season</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/chakrata/tiger-fall-trek" style={{ color: 'var(--color-primary)' }}>Tiger Fall</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>~2,200 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Easy</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>1</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Year-round</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/chakrata/budher-caves-trek" style={{ color: 'var(--color-primary)' }}>Budher Caves</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>~2,200 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Easy</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>1</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Year-round</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,850 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Dec–Mar</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>Kuari Pass</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,876 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>5</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Mar–May, Oct–Nov</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/munsiyari/khaliya-top-trek" style={{ color: 'var(--color-primary)' }}>Khaliya Top</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,500 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3–4</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>May–Jun, Sep–Oct</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── WHAT TO EXPECT ───────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            What to Expect on Your First Trek
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Day treks (Chakrata):</strong> You will walk 4–8 km on forest trails at low altitude. Carry water, snacks,
            and rain protection. No special equipment needed. Return to accommodation the same day.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Multi-day treks (Brahmatal, Kuari Pass, Khaliya Top):</strong> You will camp in tents at established sites,
            eat meals prepared by a trek crew, and walk 6–12 km per day with 500–800 m elevation gain. Guides manage
            navigation, safety, and logistics. Your main job is to walk and enjoy. Basic trekking gear (layering system,
            trekking shoes, daypack) is needed — our{' '}
            <Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: 'var(--color-primary)' }}>
              packing checklist
            </Link>{' '}
            covers everything.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Ready to progress beyond beginner routes? The{' '}
            <Link href={`${PARENT_PATH}#challenging-treks`} style={{ color: 'var(--color-primary)' }}>
              challenging treks section
            </Link>{' '}
            covers Roopkund, Pangarchulla, and Milam Glacier for experienced trekkers.
          </p>
        </section>

        <PrimaryCTA
          label="Plan My First Trek"
          subtext="Tell us your dates and fitness level — we will recommend the perfect first route."
          vertical="trek"
          category="filter-beginner"
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
            <li><Link href={`${PARENT_PATH}/snow`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Snow Treks in Uttarakhand →</Link></li>
            <li><Link href={`${PARENT_PATH}/high-altitude`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>High-Altitude Treks Above 4,000 m →</Link></li>
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
