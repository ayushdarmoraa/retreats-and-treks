/**
 * DurationHubPage — shared server component for duration × retreat-type pages
 * Renders: breadcrumb → hero → ideal for → typical day → locations → related → CTA
 */

import Link from 'next/link';
import type { DurationPage } from '@/config/durationPages';
import { getLocationById } from '@/lib/locations';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateItemListSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

interface DurationHubPageProps {
  page: DurationPage;
}

export default function DurationHubPage({ page }: DurationHubPageProps) {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: page.h1, url: buildCanonicalUrl(`/${page.slug}`) },
  ]);

  const itemListSchema = generateItemListSchema(
    page.locationAngles.map((angle) => {
      const loc = getLocationById(angle.locationId);
      return {
        name: loc ? `${page.h1} in ${loc.name}` : angle.heading,
        url: buildCanonicalUrl(`/locations/${angle.locationId}`),
      };
    }),
  );

  const sectionStyle = {
    maxWidth: '56rem',
    margin: '0 auto',
    padding: 'var(--space-xl) var(--space-md)',
  } as const;

  const h2Style = {
    fontSize: '1.35rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
  } as const;

  const proseStyle = {
    lineHeight: 1.75,
    color: 'var(--color-text)',
    marginBottom: '1rem',
  } as const;

  return (
    <>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: page.h1 }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <header style={{ ...sectionStyle, paddingBottom: 0 }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{page.h1}</h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
          Duration: {page.durationLabel}
        </p>
        <p style={{ ...proseStyle, fontSize: '1.05rem' }}>{page.intro}</p>
      </header>

      <div style={sectionStyle}>
        <PrimaryCTA
          label={`Plan My ${page.durationLabel.split('/')[0].trim()} Retreat`}
          subtext="Tell us your dates and interests — we'll build the right programme."
          vertical="retreat"
          category={`duration-${page.slug}`}
          sourcePath={`/${page.slug}`}
        />
      </div>

      {/* ── Ideal For ──────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Who This Is For</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
          {page.idealFor.map((item) => (
            <li key={item} style={{ color: 'var(--color-text)', fontSize: '0.95rem' }}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Typical Day ────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>A Typical Day</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', lineHeight: 1.6 }}>
            <tbody>
              {page.typicalDay.map((line, i) => {
                const [time, ...rest] = line.split(' — ');
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 600, whiteSpace: 'nowrap', width: '25%' }}>
                      {time}
                    </td>
                    <td style={{ padding: '0.5rem' }}>{rest.join(' — ')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Location Angles ────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Where to Do This</h2>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {page.locationAngles.map((angle) => {
            const loc = getLocationById(angle.locationId);
            return (
              <article
                key={angle.locationId}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.5rem',
                }}
              >
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  <Link
                    href={`/locations/${angle.locationId}`}
                    style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
                  >
                    {angle.heading}
                  </Link>
                </h3>
                <p style={{ ...proseStyle, marginBottom: '0.75rem' }}>{angle.description}</p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
                  <Link href={`/locations/${angle.locationId}`} style={{ color: 'var(--color-primary)' }}>
                    About {loc?.name ?? angle.locationId} →
                  </Link>
                  {loc?.supportsRetreats && (
                    <Link href={`/retreats/${angle.locationId}`} style={{ color: 'var(--color-primary)' }}>
                      Retreats in {loc.name} →
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Related Experience Pages ───────────────────────────── */}
      {page.relatedExperienceSlugs.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Related Retreat Types</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            {page.relatedExperienceSlugs.map((slug) => (
              <li key={slug}>
                <Link href={`/${slug}`} style={{ color: 'var(--color-primary)' }}>
                  {slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Closing + CTA ──────────────────────────────────────── */}
      <section style={{ ...sectionStyle, textAlign: 'center', paddingBottom: 'var(--space-2xl)' }}>
        <p style={{ ...proseStyle, maxWidth: '42rem', margin: '0 auto 1.5rem' }}>
          {page.closingNarrative}
        </p>
        <PrimaryCTA
          label="Get Started"
          subtext="Describe what you need and we'll recommend the right duration, location, and programme."
          vertical="retreat"
          category={`duration-${page.slug}`}
          sourcePath={`/${page.slug}`}
        />
      </section>
    </>
  );
}
