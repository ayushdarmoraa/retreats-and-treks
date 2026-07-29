import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import PrimaryCTA from '@/components/PrimaryCTA';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
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
  const title = `${trekInfo.displayName} in ${monthCapitalised} | Retreats And Treks`;
  const description = `${trekInfo.displayName} in ${monthCapitalised}: weather, trail conditions, snow level, altitude, difficulty, and planning tips for your trek.`;

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
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages(title),
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
    style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}
  >
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([breadcrumbSchema, faqSchema]),
      }}
    />

    <style>{`
      .med-shell { width: 100vw; margin-left: calc(-50vw + 50%); }
      .med-outer { max-width: 76rem; margin: 0 auto; padding: 0 1.5rem; }
      .med-inner { max-width: 58rem; margin: 0 auto; padding: 0 1.5rem; }

      .med-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.1rem; }
      .med-eyebrow-line { width: 30px; height: 1px; background: rgba(15,118,110,0.35); flex-shrink: 0; }
      .med-eyebrow-text { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6b7280; font-weight: 600; }

      .med-h2 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.7rem, 3vw, 2.2rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.15; margin: 0 0 1.5rem; }
      .med-h2 span { color: #0f766e; }
      .med-body { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; font-weight: 400; line-height: 1.9; color: #4b5259; margin: 0; }

      .med-breadcrumb-wrap { padding: 1rem 0 0.5rem; }

      .med-section-alt { background: #f7f9f7; }
      .med-section-white { background: #ffffff; }
      .med-section-padding { padding: 4rem 0; }

      /* ── Hero (no photo — data-driven trek page) ── */
      .med-tm-hero {
        background: linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
        padding: 4.5rem 0;
        border-bottom: 1px solid rgba(15,118,110,0.1);
      }
      .med-tm-h1 {
        font-family: var(--font-fraunces), Georgia, serif;
        font-size: clamp(2rem, 4vw, 2.9rem);
        font-weight: 600;
        letter-spacing: -0.03em;
        color: #2B2A26;
        line-height: 1.1;
        margin: 0 0 1.4rem;
      }
      .med-tm-badge {
        display: inline-block;
        background: rgba(15,118,110,0.08);
        color: #0f766e;
        padding: 0.42rem 0.9rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 700;
        font-family: var(--font-inter), sans-serif;
        letter-spacing: 0.03em;
        border: 1px solid rgba(15,118,110,0.16);
      }

      /* ── Table (card-wrapped) ── */
      .med-tm-table-card {
        background: #fff;
        border: 1px solid rgba(15,118,110,0.12);
        border-radius: 18px;
        box-shadow: 0 10px 30px rgba(15,31,28,0.05);
        overflow: hidden;
      }
      .med-tm-table { width: 100%; border-collapse: collapse; }
      .med-tm-table td {
        font-family: var(--font-inter), sans-serif;
        font-size: 0.88rem;
        font-weight: 400;
        color: #4b5259;
        padding: 0.9rem 1.4rem;
        border-bottom: 1px solid rgba(15,118,110,0.08);
      }
      .med-tm-table td:first-child {
        font-weight: 600;
        color: #2B2A26;
        width: 38%;
        font-family: var(--font-fraunces), Georgia, serif;
        font-size: 0.9rem;
      }
      .med-tm-table tr:last-child td { border-bottom: none; }
      .med-tm-table tbody tr { transition: background 0.2s ease; }
      .med-tm-table tbody tr:hover td { background: #f7f9f7; }

      /* ── FAQ accordion (shared pattern) ── */
      .med-faq-accordion { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem; }
      .med-faq-details { background: #fff; border: 1px solid rgba(15,118,110,0.1); border-radius: 12px; overflow: hidden; transition: border-color 0.3s ease; }
      .med-faq-details:hover { border-color: rgba(15,118,110,0.25); }
      .med-faq-details[open] { border-color: rgba(15,118,110,0.3); }
      .med-faq-summary {
        display: flex; justify-content: space-between; align-items: center;
        padding: 1.25rem 1.5rem; cursor: pointer; list-style: none;
        font-family: var(--font-inter), sans-serif; font-size: 0.95rem; font-weight: 500; color: #2B2A26;
        transition: background 0.2s ease; user-select: none; gap: 1rem;
      }
      .med-faq-summary::-webkit-details-marker { display: none; }
      .med-faq-summary:hover { background: rgba(15,118,110,0.03); }
      .med-faq-details[open] .med-faq-summary { background: rgba(15,118,110,0.04); border-bottom: 1px solid rgba(15,118,110,0.06); }
      .med-faq-answer { padding: 0 1.5rem 1.5rem; animation: med-faq-slide 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
      @keyframes med-faq-slide { 0% { opacity: 0; transform: translateY(-12px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
      .med-faq-answer p { margin: 0; font-family: var(--font-inter), sans-serif; font-size: 0.92rem; line-height: 1.9; color: #4b5259; }

      /* ── Nav list ── */
      .med-tm-nav-group { border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; overflow: hidden; background: #fff; }
      .med-tm-nav-link {
        display: flex; align-items: center; justify-content: space-between;
        padding: 0.95rem 1.4rem; border-bottom: 1px solid rgba(15,118,110,0.08);
        font-family: var(--font-inter), sans-serif; font-size: 0.9rem; font-weight: 500; color: #2B2A26;
        text-decoration: none; transition: background 0.2s ease, color 0.2s ease;
      }
      .med-tm-nav-link:hover { background: #f7f9f7; color: #0f766e; }
      .med-tm-nav-link::after { content: '→'; color: #0f766e; }
      .med-tm-nav-group .med-tm-nav-link:last-child { border-bottom: none; }

      .med-tm-month-pill {
        display: inline-block;
        padding: 0.5rem 1.1rem;
        border-radius: 999px;
        border: 1px solid rgba(15,118,110,0.3);
        color: #0f766e;
        font-size: 0.85rem;
        font-weight: 600;
        text-decoration: none;
        font-family: var(--font-inter), sans-serif;
        transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
      }
      .med-tm-month-pill:hover {
        background: #0f766e;
        color: #fff;
        transform: translateY(-2px);
      }
    `}</style>

    {/* ── BREADCRUMB ── */}
    <div className="med-breadcrumb-wrap">
      <div className="med-outer">
        <Breadcrumb
          items={[
            { name: 'Home', href: '/' },
            { name: 'Treks', href: '/treks' },
            { name: trekInfo.displayName, href: trekInfo.locationPath },
            { name: monthCapitalised },
          ]}
        />
      </div>
    </div>

    {/* ── HERO ── */}
    <section className="med-shell med-tm-hero">
      <div className="med-inner">
        <div className="med-eyebrow">
          <span className="med-eyebrow-line" />
          <span className="med-eyebrow-text">
            {trekInfo.displayName} · {trek.difficulty} · {trek.altitude}
          </span>
        </div>
        <h1 className="med-tm-h1">
          {trekInfo.displayName} in <span style={{ color: '#0f766e' }}>{monthCapitalised}</span>
        </h1>
        <p className="med-body" style={{ fontSize: '1.02rem', marginBottom: '1.5rem' }}>
          {condition.conditions}
        </p>
        {isBestSeason && (
          <span className="med-tm-badge">
            {monthCapitalised} is within the best season for this trek
          </span>
        )}
      </div>
    </section>

    {/* ── AT A GLANCE TABLE ── */}
    <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
      <div className="med-inner">
        <div className="med-eyebrow"><span className="med-eyebrow-line" /><span className="med-eyebrow-text">{monthCapitalised} at a Glance</span></div>
        <h2 className="med-h2">{trekInfo.displayName} in {monthCapitalised} <span>at a Glance</span></h2>
        <div className="med-tm-table-card">
          <table className="med-tm-table">
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
    <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
      <div className="med-inner">
        <div className="med-eyebrow"><span className="med-eyebrow-line" /><span className="med-eyebrow-text">About the Trek</span></div>
        <h2 className="med-h2">About the {trekInfo.displayName} in <span>{monthCapitalised}</span></h2>
        <p className="med-body" style={{ marginBottom: '1rem' }}>
          {trek.overview.split('\n\n')[0]}
        </p>
        <p className="med-body">
          Read the full{' '}
          <Link href={trekInfo.locationPath} style={{ color: '#0f766e', textDecoration: 'none', fontWeight: 600 }}>
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
      <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow"><span className="med-eyebrow-line" /><span className="med-eyebrow-text">{monthCapitalised} Departures</span></div>
          <h2 className="med-h2">{monthCapitalised} <span>Departures</span></h2>
          <p className="med-body">
            Check{' '}
            <Link href={trekInfo.departuresPath} style={{ color: '#0f766e', textDecoration: 'none', fontWeight: 600 }}>
              upcoming {trekInfo.displayName} departure dates →
            </Link>
          </p>
        </div>
      </section>
    )}

    {/* ── FAQ ── */}
    <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
      <div className="med-inner">
        <div className="med-eyebrow"><span className="med-eyebrow-line" /><span className="med-eyebrow-text">FAQ</span></div>
        <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
        <div className="med-faq-accordion">
          {faqItems.map((faq, i) => (
            <details key={i} className="med-faq-details">
              <summary className="med-faq-summary">
                <span style={{ flex: 1 }}>{faq.question}</span>
                <span style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f766e' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </summary>
              <div className="med-faq-answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* ── OTHER MONTHS ── */}
    {otherMonths.length > 0 && (
      <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow"><span className="med-eyebrow-line" /><span className="med-eyebrow-text">Other Months</span></div>
          <h2 className="med-h2">{trekInfo.displayName} in <span>Other Months</span></h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
            {otherMonths.map((mc) => (
              <Link
                key={mc.month}
                href={`/treks/${urlSlug}/${mc.month.toLowerCase()}`}
                className="med-tm-month-pill"
              >
                {mc.month}
              </Link>
            ))}
          </div>
        </div>
      </section>
    )}

    {/* ── EXPLORE MORE ── */}
    <section className="med-shell med-section-alt med-section-padding">
      <div className="med-inner">
        <div className="med-eyebrow"><span className="med-eyebrow-line" /><span className="med-eyebrow-text">Explore More</span></div>
        <h2 className="med-h2">Explore <span>More</span></h2>
        <div className="med-tm-nav-group">
          <Link href={trekInfo.locationPath} className="med-tm-nav-link">{trekInfo.displayName} — Full Guide</Link>
          <Link href="/treks/best-treks-in-uttarakhand" className="med-tm-nav-link">Best Treks in Uttarakhand</Link>
          <Link href="/treks/best-treks-in-uttarakhand/snow" className="med-tm-nav-link">Winter Treks in Uttarakhand</Link>
          <Link href="/treks/summer-treks-uttarakhand" className="med-tm-nav-link">Summer Treks in Uttarakhand</Link>
        </div>
      </div>
    </section>

  </TrackedPage>
);
}
