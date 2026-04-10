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
  dayara: {
    contentSlug: 'dayara-bugyal-trek',
    displayName: 'Dayara Bugyal Trek',
    locationPath: '/treks/location/barsu/dayara-bugyal-trek',
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
    style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}
  >
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([breadcrumbSchema, faqSchema]),
      }}
    />

    <style>{`
      .tm-body { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555555; margin: 0; }
      .tm-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
      .tm-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); display: inline-block; }
      .tm-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase; color: #374151; font-weight: 500; }

      .tm-table-wrap { overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 10px; background: #ffffff; }
      .tm-table { width: 100%; border-collapse: collapse; }
      .tm-table td { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 300; color: #444; padding: 0.75rem 1rem; border-bottom: 1px solid #f0f0f0; }
      .tm-table td:first-child { font-weight: 500; color: #111; width: 35%; }
      .tm-table tr:last-child td { border-bottom: none; }
      .tm-table tbody tr { transition: background 0.15s ease; }
      .tm-table tbody tr:hover td { background: #f7f9f7; }

      .tm-callout { background: #f7f9f7; border: 1px solid #eef0ee; border-left: 3px solid var(--color-primary); border-radius: 10px; padding: 1rem 1.25rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; margin-bottom: 1rem; }

      .tm-faq-item { border-bottom: 1px solid #f0f0f0; padding: 0.85rem 0; }
      .tm-faq-item summary { cursor: pointer; font-family: var(--font-geist-sans), sans-serif; font-weight: 500; font-size: 0.92rem; line-height: 1.6; color: #111; }
      .tm-faq-item p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; margin-top: 0.5rem; }

      .tm-nav-group { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
      .tm-nav-link { display: flex; align-items: center; justify-content: space-between; padding: 0.9rem 1.1rem; border-bottom: 1px solid #f0f0f0; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #333; text-decoration: none; transition: background 0.15s ease, color 0.15s ease; }
      .tm-nav-link:hover { background: #f7f9f7; color: #374151; }
      .tm-nav-link::after { content: '→'; color: #374151; }
      .tm-nav-group .tm-nav-link:last-child { border-bottom: none; }
    `}</style>

    {/* ── BREADCRUMB ── */}
    <div style={{ padding: '0 0 0.5rem' }}>
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Treks', href: '/treks' },
          { name: trekInfo.displayName, href: trekInfo.locationPath },
          { name: monthCapitalised },
        ]}
      />
    </div>

    {/* ── HERO ── */}
<section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
  <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
    <div className="tm-eyebrow">
      <span className="tm-eyebrow-line" />
      <span className="tm-eyebrow-text">
        {trekInfo.displayName} · {trek.difficulty} · {trek.altitude}
      </span>
    </div>
    <h1 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
      fontWeight: 200,
      letterSpacing: '-0.035em',
      color: '#111111',
      lineHeight: 1.1,
      margin: '0 0 1.5rem',
    }}>
      {trekInfo.displayName} in {monthCapitalised}
    </h1>
    <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem', color: '#555555', fontFamily: 'var(--font-geist-sans), sans-serif', fontWeight: 300 }}>
      {condition.conditions}
    </p>
    {isBestSeason && (
      <span style={{
        display: 'inline-block',
        background: '#ecfdf5',
        color: '#065f46',
        padding: '0.35rem 0.85rem',
        borderRadius: '4px',
        fontSize: '0.82rem',
        fontWeight: 600,
        fontFamily: 'var(--font-geist-sans), sans-serif',
        letterSpacing: '0.02em',
      }}>
        {monthCapitalised} is within the best season for this trek
      </span>
    )}
  </div>
</section>

    {/* ── AT A GLANCE TABLE ── */}
    <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
        <div className="tm-eyebrow"><span className="tm-eyebrow-line" /><span className="tm-eyebrow-text">{monthCapitalised} at a Glance</span></div>
        <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
          {monthCapitalised} at a Glance
        </h2>
        <div className="tm-table-wrap">
          <table className="tm-table">
            <tbody>
              {[
                { label: 'Trek', value: trekInfo.displayName },
                { label: 'Month', value: monthCapitalised },
                { label: 'Altitude', value: trek.altitude },
                { label: 'Distance', value: trek.distance },
                { label: 'Duration', value: trek.duration },
                { label: 'Difficulty', value: trek.difficulty },
                { label: 'Best Season', value: trek.bestSeason.join(', ') },
                { label: `${monthCapitalised} Rating`, value: isBestSeason ? '★ Best Season' : 'Outside Primary Season' },
              ].map((row, i) => (
                <tr key={i}><td>{row.label}</td><td>{row.value}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* ── TREK OVERVIEW ── */}
    <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
        <div className="tm-eyebrow"><span className="tm-eyebrow-line" /><span className="tm-eyebrow-text">About the Trek</span></div>
        <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
          About the {trekInfo.displayName}
        </h2>
        <p className="tm-body" style={{ marginBottom: '1rem' }}>
          {trek.overview.split('\n\n')[0]}
        </p>
        <p className="tm-body">
          Read the full{' '}
          <Link href={trekInfo.locationPath} style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>
            {trekInfo.displayName} guide →
          </Link>
        </p>
      </div>
    </section>

    {/* ── CTA ── */}
    <PrimaryCTA
      label={`Plan My ${monthCapitalised} Trek`}
      subtext={`Tell us your dates in ${monthCapitalised} and we will confirm availability and conditions.`}
      vertical="trek"
      category="month"
      sourcePath={path}
    />

    {/* ── DEPARTURES ── */}
    {trekInfo.departuresPath && (
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="tm-eyebrow"><span className="tm-eyebrow-line" /><span className="tm-eyebrow-text">{monthCapitalised} Departures</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            {monthCapitalised} Departures
          </h2>
          <p className="tm-body">
            Check{' '}
            <Link href={trekInfo.departuresPath} style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>
              upcoming {trekInfo.displayName} departure dates →
            </Link>
          </p>
        </div>
      </section>
    )}

    {/* ── FAQ ── */}
    <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
        <div className="tm-eyebrow"><span className="tm-eyebrow-line" /><span className="tm-eyebrow-text">FAQ</span></div>
        <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
          Frequently Asked Questions
        </h2>
        {faqItems.map((faq, i) => (
          <details key={i} className="tm-faq-item">
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>

    {/* ── OTHER MONTHS ── */}
    {otherMonths.length > 0 && (
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="tm-eyebrow"><span className="tm-eyebrow-line" /><span className="tm-eyebrow-text">Other Months</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            {trekInfo.displayName} in Other Months
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {otherMonths.map((mc) => (
              <Link
                key={mc.month}
                href={`/treks/${urlSlug}/${mc.month.toLowerCase()}`}
                style={{
                  display: 'inline-block',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid var(--color-primary)',
                  color: 'var(--color-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                }}
              >
                {mc.month}
              </Link>
            ))}
          </div>
        </div>
      </section>
    )}

    {/* ── EXPLORE MORE ── */}
    <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
        <div className="tm-eyebrow"><span className="tm-eyebrow-line" /><span className="tm-eyebrow-text">Explore More</span></div>
        <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
          Explore More
        </h2>
        <div className="tm-nav-group">
          <Link href={trekInfo.locationPath} className="tm-nav-link">{trekInfo.displayName} — Full Guide</Link>
          <Link href="/treks/best-treks-in-uttarakhand" className="tm-nav-link">Best Treks in Uttarakhand</Link>
          <Link href="/treks/winter-treks-uttarakhand" className="tm-nav-link">Winter Treks in Uttarakhand</Link>
          <Link href="/treks/summer-treks-uttarakhand" className="tm-nav-link">Summer Treks in Uttarakhand</Link>
        </div>
      </div>
    </section>

  </TrackedPage>
);
}
