import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import PrimaryCTA from '@/components/PrimaryCTA';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { getTrekBySlug } from '@/lib/treks';
import { notFound } from 'next/navigation';

/* ── Trek slug mapping (URL slug → content slug) ──────────────────────── */

const TREK_SLUG_MAP: Record<string, { contentSlug: string; displayName: string; locationPath: string; departuresPath?: string }> = {
  brahmatal: {
    contentSlug: 'brahmatal-trek',
    displayName: 'Brahmatal Trek',
    locationPath: '/treks/location/lohajung/brahmatal-trek',
    departuresPath: '/treks/brahmatal/departures',
  },
  'kuari-pass': {
    contentSlug: 'kuari-pass-trek',
    displayName: 'Kuari Pass Trek',
    locationPath: '/treks/location/joshimath/kuari-pass-trek',
    departuresPath: '/treks/kuari-pass/departures',
  },
  roopkund: {
    contentSlug: 'roopkund-trek',
    displayName: 'Roopkund Trek',
    locationPath: '/treks/location/lohajung/roopkund-trek',
    departuresPath: '/treks/roopkund/departures',
  },
  pangarchulla: {
    contentSlug: 'pangarchulla-trek',
    displayName: 'Pangarchulla Peak Trek',
    locationPath: '/treks/location/joshimath/pangarchulla-trek',
    departuresPath: '/treks/pangarchulla/departures',
  },
  kedarkantha: {
    contentSlug: 'kedarkantha-trek',
    displayName: 'Kedarkantha Trek',
    locationPath: '/treks/location/sankri/kedarkantha-trek',
  },
  'har-ki-dun': {
    contentSlug: 'har-ki-dun-trek',
    displayName: 'Har Ki Dun Trek',
    locationPath: '/treks/location/sankri/har-ki-dun-trek',
  },
};

const VALID_MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
] as const;

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function getTrekAndMonth(urlSlug: string, month: string) {
  const trekInfo = TREK_SLUG_MAP[urlSlug];
  if (!trekInfo) return null;

  const monthLower = month.toLowerCase();
  if (!VALID_MONTHS.includes(monthLower as typeof VALID_MONTHS[number])) return null;

  const trek = getTrekBySlug(trekInfo.contentSlug);
  if (!trek) return null;

  const monthCapitalised = capitalise(monthLower);
  const condition = trek.monthlyConditions?.find(
    (mc) => mc.month.toLowerCase() === monthLower,
  );

  return { trek, trekInfo, monthCapitalised, monthLower, condition };
}

/* ── Metadata generator ───────────────────────────────────────────────── */

export function generateMonthMetadata(urlSlug: string, month: string): Metadata {
  const data = getTrekAndMonth(urlSlug, month);
  if (!data) return {};

  const { trek, trekInfo, monthCapitalised } = data;
  const path = `/treks/${urlSlug}/${data.monthLower}`;
  const title = `${trekInfo.displayName} in ${monthCapitalised} — Conditions, Weather & Tips | Retreats And Treks`;
  const description = `${trekInfo.displayName} in ${monthCapitalised}: trail conditions, temperature, snow level, and what to expect. ${trek.altitude} altitude, ${trek.difficulty} difficulty. Plan your ${monthCapitalised} trek.`;

  return {
    title,
    description,
    alternates: { canonical: buildCanonicalUrl(path) },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${trekInfo.displayName} in ${monthCapitalised}`,
      description,
      url: buildCanonicalUrl(path),
      type: 'website',
    },
  };
}

/* ── Static params generator ──────────────────────────────────────────── */

export function generateMonthStaticParams(urlSlug: string) {
  const trekInfo = TREK_SLUG_MAP[urlSlug];
  if (!trekInfo) return [];

  const trek = getTrekBySlug(trekInfo.contentSlug);
  if (!trek?.monthlyConditions) return [];

  return trek.monthlyConditions.map((mc) => ({
    month: mc.month.toLowerCase(),
  }));
}

/* ── Page component ───────────────────────────────────────────────────── */

export default function TrekMonthPage({
  urlSlug,
  month,
}: {
  urlSlug: string;
  month: string;
}) {
  const data = getTrekAndMonth(urlSlug, month);
  if (!data || !data.condition) notFound();

  const { trek, trekInfo, monthCapitalised, monthLower, condition } = data;
  const path = `/treks/${urlSlug}/${monthLower}`;
  const isBestSeason = trek.bestSeason.some(
    (s) => s.toLowerCase() === monthLower,
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: trekInfo.displayName, url: buildCanonicalUrl(trekInfo.locationPath) },
    { name: monthCapitalised, url: buildCanonicalUrl(path) },
  ]);

  const faqItems = [
    {
      question: `Is ${monthCapitalised} a good time for the ${trekInfo.displayName}?`,
      answer: isBestSeason
        ? `Yes. ${monthCapitalised} falls within the best season for the ${trekInfo.displayName}. ${condition.conditions}`
        : `${monthCapitalised} is outside the primary season for the ${trekInfo.displayName}. The best months are ${trek.bestSeason.join(', ')}. ${condition.conditions}`,
    },
    {
      question: `What is the difficulty of ${trekInfo.displayName} in ${monthCapitalised}?`,
      answer: `The ${trekInfo.displayName} is rated ${trek.difficulty}. It reaches ${trek.altitude} over ${trek.duration.toLowerCase()}. Conditions in ${monthCapitalised} may affect trail difficulty — ${condition.conditions.split('.')[0].toLowerCase()}.`,
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);

  /* ── Other months for internal linking ─────────────────────────────── */
  const otherMonths = (trek.monthlyConditions ?? []).filter(
    (mc) => mc.month.toLowerCase() !== monthLower,
  );

  return (
    <TrackedPage
      page={path}
      style={{
        maxWidth: '56rem',
        margin: '0 auto',
        padding: 'var(--space-lg) var(--space-md)',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, faqSchema]),
        }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Treks', href: '/treks' },
          { name: trekInfo.displayName, href: trekInfo.locationPath },
          { name: monthCapitalised },
        ]}
      />

      <article>
        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            {trekInfo.displayName} in {monthCapitalised}
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            {condition.conditions}
          </p>
          {isBestSeason && (
            <p
              style={{
                display: 'inline-block',
                background: '#ecfdf5',
                color: '#065f46',
                padding: '0.35rem 0.85rem',
                borderRadius: '4px',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              {monthCapitalised} is within the best season for this trek
            </p>
          )}
        </header>

        {/* ── QUICK CONDITIONS TABLE ──────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            {monthCapitalised} at a Glance
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.95rem',
                lineHeight: 1.7,
              }}
            >
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600 }}>Trek</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>{trekInfo.displayName}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600 }}>Month</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>{monthCapitalised}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600 }}>Altitude</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>{trek.altitude}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600 }}>Distance</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>{trek.distance}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600 }}>Duration</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>{trek.duration}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600 }}>Difficulty</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>{trek.difficulty}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600 }}>Best Season</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>{trek.bestSeason.join(', ')}</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600 }}>
                    {monthCapitalised} Rating
                  </td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>
                    {isBestSeason ? '★ Best Season' : 'Outside Primary Season'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── TREK OVERVIEW ────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            About the {trekInfo.displayName}
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            {trek.overview.split('\n\n')[0]}
          </p>
          <p style={{ lineHeight: 1.8 }}>
            Read the full{' '}
            <Link href={trekInfo.locationPath} style={{ color: 'var(--color-primary)' }}>
              {trekInfo.displayName} guide
            </Link>{' '}
            for itinerary, inclusions, and safety information.
          </p>
        </section>

        <PrimaryCTA
          label={`Plan My ${monthCapitalised} Trek`}
          subtext={`Tell us your dates in ${monthCapitalised} and we will confirm availability and conditions.`}
          vertical="trek"
          category="month"
          sourcePath={path}
        />

        {/* ── DEPARTURES LINK ─────────────────────────────────────── */}
        {trekInfo.departuresPath && (
          <section style={{ marginBottom: 'var(--space-xl)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
              {monthCapitalised} Departures
            </h2>
            <p style={{ lineHeight: 1.8 }}>
              Check{' '}
              <Link
                href={trekInfo.departuresPath}
                style={{ color: 'var(--color-primary)', fontWeight: 500 }}
              >
                upcoming {trekInfo.displayName} departure dates →
              </Link>
            </p>
          </section>
        )}

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Frequently Asked Questions
          </h2>
          {faqItems.map((faq, i) => (
            <details
              key={i}
              style={{
                borderBottom: '1px solid var(--color-border)',
                padding: 'var(--space-sm) 0',
              }}
            >
              <summary
                style={{
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '1rem',
                  lineHeight: 1.6,
                }}
              >
                {faq.question}
              </summary>
              <p style={{ lineHeight: 1.8, marginTop: '0.5rem' }}>{faq.answer}</p>
            </details>
          ))}
        </section>

        {/* ── OTHER MONTHS ─────────────────────────────────────────── */}
        {otherMonths.length > 0 && (
          <section style={{ marginBottom: 'var(--space-xl)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
              {trekInfo.displayName} in Other Months
            </h2>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              {otherMonths.map((mc) => (
                <li key={mc.month}>
                  <Link
                    href={`/treks/${urlSlug}/${mc.month.toLowerCase()}`}
                    style={{
                      display: 'inline-block',
                      padding: '0.4rem 0.85rem',
                      borderRadius: 'var(--radius-sm, 6px)',
                      border: '1px solid var(--color-primary)',
                      color: 'var(--color-primary)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                  >
                    {mc.month}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── EXPLORE MORE ─────────────────────────────────────────── */}
        <section
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
            Explore More
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2.2 }}>
            <li>
              <Link href={trekInfo.locationPath} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
                {trekInfo.displayName} — Full Guide →
              </Link>
            </li>
            <li>
              <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
                Best Treks in Uttarakhand →
              </Link>
            </li>
            <li>
              <Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
                Winter Treks in Uttarakhand →
              </Link>
            </li>
            <li>
              <Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
                Summer Treks in Uttarakhand →
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </TrackedPage>
  );
}
