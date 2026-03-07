/**
 * ExperienceLocationPage — shared server component for experience × location intersection pages
 * Renders: breadcrumb → hero → location detail → schedule → who-is-this-for → durations → siblings → CTA → FAQ
 */

import Link from 'next/link';
import type { ExperienceLocationPage as PageConfig } from '@/config/experienceLocationPages';
import { getSiblingPages } from '@/config/experienceLocationPages';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';

interface Props {
  page: PageConfig;
}

export default function ExperienceLocationPage({ page }: Props) {
  validateFAQSync(page.faqItems as { question: string; answer: string }[], `/${page.slug}`);

  const siblings = getSiblingPages(page.slug);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: `${page.label}s`, url: buildCanonicalUrl(`/${page.parentHubSlug}`) },
    { name: `${page.label} in ${page.locationName}`, url: buildCanonicalUrl(`/${page.slug}`) },
  ]);
  const faqSchema = generateFAQSchema(page.faqItems as { question: string; answer: string }[]);

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

  return (
    <TrackedPage page={`/${page.slug}`} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
      />
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: `${page.label}s`, href: `/${page.parentHubSlug}` },
          { name: `in ${page.locationName}` },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <header style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
          {page.h1}
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '0.75rem' }}>
          {page.locationHeading}
        </p>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>{page.intro}</p>
      </header>

      <PrimaryCTA
        label={`Inquire About This ${page.label}`}
        subtext={`${page.label} in ${page.locationName}. Small groups, experienced guides. Tell us what you're seeking.`}
        vertical="retreat"
        category={`exp-loc-${page.locationId}`}
        sourcePath={`/${page.slug}`}
      />

      {/* ── Location Details ──────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>About {page.locationName}</h2>
        <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.95rem', lineHeight: 1.75 }}>
          <p style={{ margin: 0 }}><strong>Terrain:</strong> {page.terrain}</p>
          <p style={{ margin: 0 }}><strong>Best seasons:</strong> {page.bestSeasons}</p>
          <p style={{ margin: 0 }}><strong>How to reach:</strong> {page.access}</p>
          <p style={{ margin: 0 }}><strong>Atmosphere:</strong> {page.atmosphere}</p>
          {page.landmarks.length > 0 && (
            <p style={{ margin: 0 }}>
              <strong>Nearby:</strong>{' '}
              {page.landmarks.join(', ')}
            </p>
          )}
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          <Link href={`/locations/${page.locationId}`} style={{ color: 'var(--color-primary)' }}>
            Full guide to {page.locationName} →
          </Link>
        </p>
      </section>

      {/* ── Who Is This For ──────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Who Is This For</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
          {page.whoIsThisFor.map((item) => (
            <li key={item} style={{ fontSize: '0.95rem' }}>{item}</li>
          ))}
        </ul>
      </section>

      {/* ── Sample Day ────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Sample Day</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', lineHeight: 1.6 }}>
            <tbody>
              {page.sampleSchedule.map((row) => {
                const [time, ...rest] = row.split(' — ');
                const activity = rest.join(' — ');
                return (
                  <tr key={row} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.6rem 0.5rem', whiteSpace: 'nowrap', fontWeight: 500 }}>{time}</td>
                    <td style={{ padding: '0.6rem 0.5rem' }}>{activity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '0.5rem' }}>
          Schedules adapt to the season, group energy, and {page.locationName}&rsquo;s natural rhythms.
        </p>
      </section>

      {/* ── What to Expect ────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to Expect</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
          {page.whatToExpect.map((item) => (
            <li key={item} style={{ fontSize: '0.95rem' }}>{item}</li>
          ))}
        </ul>
      </section>

      <PrimaryCTA
        label="Plan My Retreat"
        subtext={`Tell us about yourself — we'll design a ${page.label.toLowerCase()} in ${page.locationName} that fits.`}
        vertical="retreat"
        category={`exp-loc-${page.locationId}`}
        sourcePath={`/${page.slug}`}
      />

      {/* ── Duration Options ──────────────────────────────────── */}
      {page.relatedDurationSlugs.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Duration Options</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            {page.relatedDurationSlugs.map((dSlug) => (
              <li key={dSlug}>
                <Link href={`/${dSlug}`} style={{ color: 'var(--color-primary)' }}>
                  {dSlug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Other Locations ──────────────────────────────────── */}
      {siblings.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>{page.label} in Other Locations</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {siblings.map((sib) => (
              <Link
                key={sib.slug}
                href={`/${sib.slug}`}
                style={{
                  display: 'block',
                  padding: '1rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <strong style={{ color: 'var(--color-primary)' }}>{sib.locationName}</strong>
                <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                  {sib.locationHeading}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <TrackedFAQ items={page.faqItems as { question: string; answer: string }[]} page={`/${page.slug}`} />

      {/* ── Footer Links ──────────────────────────────────────── */}
      <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem', maxWidth: '56rem', margin: 'var(--space-xl) auto 0', padding: '0 var(--space-md)' }}>
        <Link href={`/${page.parentHubSlug}`} style={{ color: 'var(--color-primary)' }}>
          &larr; All {page.label}s
        </Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href={`/locations/${page.locationId}`} style={{ color: 'var(--color-primary)' }}>
          {page.locationName} Guide
        </Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href="/contact" style={{ color: 'var(--color-primary)' }}>
          Contact Us
        </Link>
      </p>
    </TrackedPage>
  );
}
