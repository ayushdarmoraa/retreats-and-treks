import { Metadata } from 'next';
import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { getAllRetreatServices, getRetreatServiceBySlug } from '@/content/retreats/services';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateCollectionPageSchema, generateBreadcrumbSchema } from '@/components/seo/Schema';
import { RETREAT_DURATION_GROUP } from '@/config/retreatDurations';
import { RETREAT_SCORES, SCORE_LABELS } from '@/config/retreatScores';
import { RETREAT_MATRIX_META } from '@/config/retreatMatrix';
import { ScoreBar } from '@/components/RetreatScoreBar';
import Breadcrumb from '@/components/Breadcrumb';
import OtherComparisonsAdaptive, { type ComparisonSuggestion } from '@/components/OtherComparisonsAdaptive';
import type { RetreatScores } from '@/config/retreatScores';

interface PageProps {
  params: Promise<{ pair: string }>;
}

const SEPARATOR = '-vs-';

/**
 * Parse a comparison pair slug like "rest-and-reset-vs-burnout-recovery"
 * Returns [slugA, slugB] in canonical (alphabetical) order, or null if invalid.
 */
function parsePair(pair: string): [string, string] | null {
  const idx = pair.indexOf(SEPARATOR);
  if (idx === -1) return null;
  const slugA = pair.slice(0, idx);
  const slugB = pair.slice(idx + SEPARATOR.length);
  if (!slugA || !slugB || slugA === slugB) return null;
  return [slugA, slugB];
}

/** Canonical ordering: alphabetical by slug */
function canonicalPair(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a];
}

/** Build the canonical comparison URL for a pair */
function buildCompareUrl(a: string, b: string): string {
  const [ca, cb] = canonicalPair(a, b);
  return `/compare/${ca}${SEPARATOR}${cb}`;
}

export async function generateStaticParams(): Promise<{ pair: string }[]> {
  const services = getAllRetreatServices();
  const slugs = services.map((s) => s.slug);
  const params: { pair: string }[] = [];

  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      const [a, b] = canonicalPair(slugs[i], slugs[j]);
      params.push({ pair: `${a}${SEPARATOR}${b}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pair } = await params;
  const parsed = parsePair(pair);
  if (!parsed) return { title: 'Not Found', robots: { index: false } };

  const [slugA, slugB] = parsed;
  const [ca, cb] = canonicalPair(slugA, slugB);

  const serviceA = getRetreatServiceBySlug(ca);
  const serviceB = getRetreatServiceBySlug(cb);
  if (!serviceA || !serviceB) return { title: 'Not Found', robots: { index: false } };

  const canonicalPath = buildCompareUrl(ca, cb);

  return {
    title: `${serviceA.title} vs ${serviceB.title} — Which Retreat Is Right for You? | Retreats And Treks`,
    description: `A detailed comparison of ${serviceA.title} and ${serviceB.title} retreats — structure, intensity, duration, ideal participant, and how to choose between them.`,
    alternates: { canonical: buildCanonicalUrl(canonicalPath) },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${serviceA.title} vs ${serviceB.title} — Retreat Comparison`,
      description: `Compare ${serviceA.title} and ${serviceB.title} to find the right Himalayan retreat for your needs.`,
      url: buildCanonicalUrl(canonicalPath),
      type: 'website',
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { pair } = await params;

  const parsed = parsePair(pair);
  if (!parsed) return notFound();

  const [slugA, slugB] = parsed;
  const [ca, cb] = canonicalPair(slugA, slugB);

  // Enforce canonical ordering — redirect B-vs-A to A-vs-B
  if (slugA !== ca || slugB !== cb) {
    redirect(buildCompareUrl(slugA, slugB));
  }

  const serviceA = getRetreatServiceBySlug(ca);
  const serviceB = getRetreatServiceBySlug(cb);
  if (!serviceA || !serviceB) return notFound();

  const canonicalPath = buildCompareUrl(ca, cb);
  const canonicalUrl = buildCanonicalUrl(canonicalPath);

  const durationA = RETREAT_DURATION_GROUP[ca] ?? 'flexible';
  const durationB = RETREAT_DURATION_GROUP[cb] ?? 'flexible';

  const collectionSchema = generateCollectionPageSchema({
    name: `${serviceA.title} vs ${serviceB.title}`,
    description: `A structured comparison between ${serviceA.title} and ${serviceB.title} Himalayan retreats.`,
    url: canonicalUrl,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Himalayan Retreats', url: buildCanonicalUrl('/retreats/himalayan-retreats') },
    { name: `${serviceA.title} vs ${serviceB.title}`, url: canonicalUrl },
  ]);

  const containerStyle: React.CSSProperties = {
    maxWidth: '56rem',
    margin: '0 auto',
    padding: 'var(--space-lg) var(--space-md)',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 'var(--space-xl)',
    fontSize: '0.95rem',
    lineHeight: 1.7,
  };

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '0.75rem 1rem',
    background: 'var(--color-surface, #f5f5f5)',
    fontWeight: 600,
    borderBottom: '2px solid var(--color-border, #e0e0e0)',
  };

  const tdStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    verticalAlign: 'top',
    borderBottom: '1px solid var(--color-border, #e0e0e0)',
  };

  const labelTdStyle: React.CSSProperties = {
    ...tdStyle,
    fontWeight: 500,
    width: '22%',
    color: 'var(--color-text-secondary)',
    whiteSpace: 'nowrap',
  };

  return (
    <main style={containerStyle}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Himalayan Retreats', href: '/retreats/himalayan-retreats' },
          { name: `${serviceA.title} vs ${serviceB.title}` },
        ]}
      />

      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 'var(--space-md)', lineHeight: 1.3 }}>
        {serviceA.title} vs {serviceB.title}
      </h1>
      <p style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: 'var(--space-xl)', color: 'var(--color-text-secondary)' }}>
        Both are structured Himalayan retreat programs. The difference lies in purpose, pacing, and who
        each format is best suited for. This comparison outlines the key distinctions to help you choose.
      </p>

      {/* ── Side-by-side overview ── */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
        At a Glance
      </h2>
      <table style={tableStyle} aria-label="Retreat comparison overview">
        <thead>
          <tr>
            <th style={{ ...thStyle, width: '22%' }}></th>
            <th style={thStyle}>{serviceA.title}</th>
            <th style={thStyle}>{serviceB.title}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={labelTdStyle}>Format</td>
            <td style={tdStyle}>{serviceA.oneLineEssence}</td>
            <td style={tdStyle}>{serviceB.oneLineEssence}</td>
          </tr>
          <tr>
            <td style={labelTdStyle}>Duration</td>
            <td style={tdStyle}>{durationA === '3-day' ? '3-day program' : durationA === '5-day' ? '5-day program' : 'Flexible (custom)'}</td>
            <td style={tdStyle}>{durationB === '3-day' ? '3-day program' : durationB === '5-day' ? '5-day program' : 'Flexible (custom)'}</td>
          </tr>
          <tr>
            <td style={labelTdStyle}>Primary Location</td>
            <td style={{ ...tdStyle, textTransform: 'capitalize' }}>{serviceA.whereItWorksBest.primary}</td>
            <td style={{ ...tdStyle, textTransform: 'capitalize' }}>{serviceB.whereItWorksBest.primary}</td>
          </tr>
          <tr>
            <td style={labelTdStyle}>Why that location</td>
            <td style={tdStyle}>{serviceA.whereItWorksBest.primaryReason}</td>
            <td style={tdStyle}>{serviceB.whereItWorksBest.primaryReason}</td>
          </tr>
        </tbody>
      </table>

      {/* ── Who each retreat is for ── */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
        Who Each Retreat Is For
      </h2>
      <table style={tableStyle} aria-label="Retreat participant suitability">
        <thead>
          <tr>
            <th style={{ ...thStyle, width: '22%' }}></th>
            <th style={thStyle}>{serviceA.title}</th>
            <th style={thStyle}>{serviceB.title}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={labelTdStyle}>Best suited for</td>
            <td style={tdStyle}>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                {serviceA.forNotFor.for.map((item) => (
                  <li key={item} style={{ marginBottom: '0.35rem' }}>{item}</li>
                ))}
              </ul>
            </td>
            <td style={tdStyle}>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                {serviceB.forNotFor.for.map((item) => (
                  <li key={item} style={{ marginBottom: '0.35rem' }}>{item}</li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td style={labelTdStyle}>Not for</td>
            <td style={tdStyle}>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                {serviceA.forNotFor.notFor.map((item) => (
                  <li key={item} style={{ marginBottom: '0.35rem', color: 'var(--color-text-secondary)' }}>{item}</li>
                ))}
              </ul>
            </td>
            <td style={tdStyle}>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                {serviceB.forNotFor.notFor.map((item) => (
                  <li key={item} style={{ marginBottom: '0.35rem', color: 'var(--color-text-secondary)' }}>{item}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ── Daily rhythm ── */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
        Daily Rhythm
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
            {serviceA.title}
          </h3>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--color-text-secondary)', whiteSpace: 'pre-line' }}>
            {serviceA.howItWorks.rhythm}
          </p>
        </div>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
            {serviceB.title}
          </h3>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--color-text-secondary)', whiteSpace: 'pre-line' }}>
            {serviceB.howItWorks.rhythm}
          </p>
        </div>
      </div>

      {/* ── Score comparison ── */}
      {RETREAT_SCORES[ca] && RETREAT_SCORES[cb] && (
        <>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Program Profile Comparison
          </h2>
          <table style={tableStyle} aria-label="Retreat score comparison">
            <thead>
              <tr>
                <th style={{ ...thStyle, width: '22%' }}>Dimension</th>
                <th style={thStyle}>{serviceA.title}</th>
                <th style={thStyle}>{serviceB.title}</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(RETREAT_SCORES[ca]!) as (keyof RetreatScores)[]).map((dim) => (
                <tr key={dim}>
                  <td style={labelTdStyle}>{SCORE_LABELS[dim]}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ flex: 1 }}>
                        <ScoreBar dimension={dim} value={RETREAT_SCORES[ca]![dim]} />
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ flex: 1 }}>
                        <ScoreBar dimension={dim} value={RETREAT_SCORES[cb]![dim]} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ── Making the decision ── */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
        How to Choose
      </h2>
      <p style={{ lineHeight: 1.75, marginBottom: 'var(--space-md)' }}>
        If your primary need is {serviceA.oneLineEssence.toLowerCase().replace(/\.$/, '')}, the{' '}
        <Link href={`/retreats/journeys/${ca}`} style={{ color: 'var(--color-primary)' }}>
          {serviceA.title}
        </Link>{' '}
        retreat may be more aligned.
      </p>
      <p style={{ lineHeight: 1.75, marginBottom: 'var(--space-xl)' }}>
        If your primary need is {serviceB.oneLineEssence.toLowerCase().replace(/\.$/, '')}, explore the{' '}
        <Link href={`/retreats/journeys/${cb}`} style={{ color: 'var(--color-primary)' }}>
          {serviceB.title}
        </Link>{' '}
        retreat instead.
      </p>

      {/* ── CTA ── */}
      <p style={{ lineHeight: 1.75, marginBottom: 'var(--space-md)', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
        For a broader overview of all retreat programs and formats, visit our complete guide to{' '}
        <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
          Himalayan Retreats in India
        </Link>
        .
      </p>

      {/* ── Other comparisons (adaptive) ── */}
      {(() => {
        const services = getAllRetreatServices();
        const others = services.filter((s) => s.slug !== ca && s.slug !== cb);
        const suggestions: ComparisonSuggestion[] = others.map((s) => {
          const [a, b] = canonicalPair(ca, s.slug);
          const titleA = getRetreatServiceBySlug(a)?.title ?? a;
          const titleB = getRetreatServiceBySlug(b)?.title ?? b;
          return {
            slug: s.slug,
            title: s.title,
            pairHref: `/compare/${a}${SEPARATOR}${b}`,
            pairLabel: `${titleA} vs ${titleB}`,
            intensity: RETREAT_MATRIX_META[s.slug]?.intensity ?? 'medium',
            duration: RETREAT_DURATION_GROUP[s.slug] ?? 'flexible',
          };
        });
        const intensityMap = Object.fromEntries(suggestions.map((s) => [s.slug, s.intensity]));
        const durationMap = Object.fromEntries(suggestions.map((s) => [s.slug, s.duration]));
        return (
          <OtherComparisonsAdaptive
            suggestions={suggestions}
            intensityMap={intensityMap}
            durationMap={durationMap}
          />
        );
      })()}
    </main>
  );
}
