import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import TrackedFAQ from '@/components/TrackedFAQ';
import PrimaryCTA from '@/components/PrimaryCTA';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import { getAllTreks } from '@/lib/treks';
import { TrekAttributeConfig } from '@/config/trekAttributes';
import { TrekContent } from '@/types/content';

/* ── Location path mapping ────────────────────────────────────────────── */

const LOCATION_PATH: Record<string, string> = {
  chakrata: '/treks/location/chakrata',
  sankri: '/treks/location/sankri',
  joshimath: '/treks/location/joshimath',
  lohajung: '/treks/location/lohajung',
  munsiyari: '/treks/location/munsiyari',
};

function trekPath(trek: TrekContent): string {
  const base = LOCATION_PATH[trek.locationId] ?? '/treks';
  return `${base}/${trek.slug}`;
}

/* ── Metadata generator ───────────────────────────────────────────────── */

export function generateAttributeMetadata(config: TrekAttributeConfig): Metadata {
  const path = `/treks/${config.slug}`;
  return {
    title: `${config.title} | Retreats And Treks`,
    description: config.description,
    alternates: { canonical: buildCanonicalUrl(path) },
    robots: { index: true, follow: true },
    openGraph: {
      title: config.title,
      description: config.description,
      url: buildCanonicalUrl(path),
      type: 'website',
    },
  };
}

/* ── Page component ───────────────────────────────────────────────────── */

export default function TrekAttributePage({
  config,
}: {
  config: TrekAttributeConfig;
}) {
  const path = `/treks/${config.slug}`;
  const allTreks = getAllTreks();
  const matchedTreks = allTreks.filter(config.filter);

  validateFAQSync(config.faqs, path);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: config.title.split('—')[0].trim(), url: buildCanonicalUrl(path) },
  ]);

  const faqSchema = generateFAQSchema(config.faqs);

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
          { name: config.title.split('—')[0].trim() },
        ]}
      />

      <article>
        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 400,
              marginBottom: '0.75rem',
            }}
          >
            {config.title.split('—')[0].trim()}
          </h1>
          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              marginBottom: '1rem',
            }}
          >
            {config.intro}
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
            {matchedTreks.length} treks match this filter
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.8, marginTop: '1rem' }}>
            Explore all routes in our{' '}
            <Link
              href="/treks/best-treks-in-uttarakhand"
              style={{ color: 'var(--color-primary)' }}
            >
              Best Treks in Uttarakhand
            </Link>{' '}
            guide.
          </p>
        </header>

        <PrimaryCTA
          label="Plan My Trek"
          subtext="Tell us your dates, group size, and experience level — we'll recommend the right route."
          vertical="trek"
          category="filter"
          sourcePath={path}
        />

        {/* ── COMPARISON TABLE ────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2
            style={{
              fontSize: '1.4rem',
              fontWeight: 600,
              marginBottom: 'var(--space-md)',
            }}
          >
            Quick Comparison
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
              <thead>
                <tr
                  style={{
                    borderBottom: '2px solid var(--color-border)',
                    textAlign: 'left',
                  }}
                >
                  <th style={{ padding: '0.5rem 0.75rem' }}>Trek</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Altitude</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Duration</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Difficulty</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Best Season</th>
                </tr>
              </thead>
              <tbody>
                {matchedTreks.map((trek) => (
                  <tr
                    key={trek.slug}
                    style={{
                      borderBottom: '1px solid var(--color-border)',
                    }}
                  >
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      <Link
                        href={trekPath(trek)}
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {trek.title}
                      </Link>
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      {trek.altitude ?? '—'}
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      {trek.duration}
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      {trek.difficulty}
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      {trek.bestSeason.join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── TREK CARDS ──────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2
            style={{
              fontSize: '1.4rem',
              fontWeight: 600,
              marginBottom: 'var(--space-md)',
            }}
          >
            Detailed Overview
          </h2>
          {matchedTreks.map((trek) => (
            <div
              key={trek.slug}
              style={{
                marginBottom: 'var(--space-lg)',
                paddingBottom: 'var(--space-lg)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                <Link
                  href={trekPath(trek)}
                  style={{ color: 'var(--color-primary)' }}
                >
                  {trek.title}
                </Link>
              </h3>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-muted)',
                  marginBottom: '0.5rem',
                }}
              >
                {trek.altitude ?? ''} · {trek.duration} ·{' '}
                {trek.difficulty} · {trek.bestSeason.slice(0, 3).join(', ')}
                {trek.bestSeason.length > 3 ? ' …' : ''}
              </p>
              <p style={{ lineHeight: 1.8, margin: 0 }}>{trek.overview}</p>
            </div>
          ))}
        </section>

        <PrimaryCTA
          label="Plan My Trek"
          subtext="Not sure which trek suits you? Share your dates and preferences — we'll help you choose."
          vertical="trek"
          category="filter"
          sourcePath={path}
        />

        {/* ── CROSS-LINKS ─────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2
            style={{
              fontSize: '1.4rem',
              fontWeight: 600,
              marginBottom: 'var(--space-md)',
            }}
          >
            Explore More
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li>
              <Link
                href="/treks/best-treks-in-uttarakhand"
                style={{ color: 'var(--color-primary)' }}
              >
                Best Treks in Uttarakhand — Complete Guide
              </Link>
            </li>
            <li>
              <Link
                href="/treks/beginner-treks-uttarakhand"
                style={{ color: 'var(--color-primary)' }}
              >
                Beginner Treks in Uttarakhand
              </Link>
            </li>
            <li>
              <Link
                href="/treks/best-treks-in-uttarakhand#challenging-treks"
                style={{ color: 'var(--color-primary)' }}
              >
                Challenging Treks in Uttarakhand
              </Link>
            </li>
            <li>
              <Link
                href="/treks/best-treks-in-uttarakhand#snow-treks"
                style={{ color: 'var(--color-primary)' }}
              >
                Snow Treks in Uttarakhand
              </Link>
            </li>
            <li>
              <Link
                href="/treks/winter-treks-uttarakhand"
                style={{ color: 'var(--color-primary)' }}
              >
                Winter Treks (December–February)
              </Link>
            </li>
            <li>
              <Link
                href="/treks/summer-treks-uttarakhand"
                style={{ color: 'var(--color-primary)' }}
              >
                Summer Treks (May–June)
              </Link>
            </li>
          </ul>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <TrackedFAQ items={config.faqs} page={path} />
      </article>
    </TrackedPage>
  );
}
