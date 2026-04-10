import { Metadata } from 'next';
import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { getAllRetreatServices, getRetreatServiceBySlug } from '@/content/retreats/services';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
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

function parsePair(pair: string): [string, string] | null {
  const idx = pair.indexOf(SEPARATOR);
  if (idx === -1) return null;
  const slugA = pair.slice(0, idx);
  const slugB = pair.slice(idx + SEPARATOR.length);
  if (!slugA || !slugB || slugA === slugB) return null;
  return [slugA, slugB];
}

function canonicalPair(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a];
}

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
      images: buildOgImages(`${serviceA.title} vs ${serviceB.title} — Retreat Comparison`),
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { pair } = await params;
  const parsed = parsePair(pair);
  if (!parsed) return notFound();
  const [slugA, slugB] = parsed;
  const [ca, cb] = canonicalPair(slugA, slugB);
  if (slugA !== ca || slugB !== cb) redirect(buildCompareUrl(slugA, slugB));
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

  return (
<main style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 var(--space-md)' }}>      
  <style>{`
        .cmp-hero {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  background: #f7f9f7;
  padding: 5rem 0 4rem;
  margin-bottom: 0;
  position: relative;
}
        .cmp-hero::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(15,118,110,0.5) 30%, rgba(15,118,110,0.5) 70%, transparent);
        }
        .cmp-hero-inner {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 var(--space-md);
  width: 100%;
}
        .cmp-eyebrow {
          display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;
        }
        .cmp-eyebrow-line {
          width: 24px; height: 1px; background: var(--color-primary);  flex-shrink: 0;
        }
        .cmp-eyebrow-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.75rem; font-weight: 500; letter-spacing: 0.28em;
          text-transform: uppercase; color: #374151;
        }
        .cmp-h1 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(1.6rem, 3.2vw, 2.4rem);
          font-weight: 200; letter-spacing: -0.03em;
          color: #111111; line-height: 1.15;
          margin: 0 0 1rem;
        }
        .cmp-h1 em { color: #374151; font-style: normal; font-weight: 200; }
        .cmp-lead {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem; font-weight: 300;
          line-height: 1.85; color: #555555; margin: 0; max-width: 48rem;
        }

        /* sections */
        .cmp-section {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          padding: 5rem 0;
        }
        .cmp-section-white { background: #ffffff; }
        .cmp-section-tint  { background: #f7f9f7; }
        .cmp-section-inner {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 var(--space-md);
        }
        .cmp-h2 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 200; letter-spacing: -0.03em;
          color: #111111; line-height: 1.15;
          margin: 0 0 2rem;
        }
        .cmp-h2 em { color: #374151; font-style: normal; font-weight: 200; }

        /* table */
        .cmp-table {
          width: 100%; border-collapse: collapse;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem; line-height: 1.7;
        }
        .cmp-table thead tr {
          border-bottom: 1px solid rgba(15,118,110,0.2);
        }
        .cmp-table th {
          text-align: left; padding: 0.75rem 1rem;
          font-size: 0.75rem; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #374151;
        }
        .cmp-table th:first-child {  }
        .cmp-table tbody tr {
          border-bottom: 1px solid rgba(15,118,110,0.07);
          transition: background 0.2s;
        }
        .cmp-table tbody tr:hover { background: rgba(15,118,110,0.02); }
        .cmp-table td {
          padding: 0.85rem 1rem;
          vertical-align: top;
          font-weight: 300; color: #444444;
        }
        .cmp-table td:first-child {
          font-size: 0.75rem; font-weight: 500;
          letter-spacing: 0.04em; color: #888888;
          text-transform: uppercase; width: 22%;
          white-space: nowrap;
        }
        .cmp-table ul {
          margin: 0; padding: 0; list-style: none;
        }
        .cmp-table ul li {
          padding: 0.2rem 0 0.2rem 1rem;
          position: relative; font-weight: 300;
          color: #555555;
        }
        .cmp-table ul li::before {
          content: '—';
          position: absolute; left: 0;
          color: #374151; 
          font-size: 0.7rem;
        }

        /* rhythm grid */
        .cmp-rhythm-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(15,118,110,0.08);
          border: 1px solid rgba(15,118,110,0.08);
        }
        @media (max-width: 640px) {
          .cmp-rhythm-grid { grid-template-columns: 1fr; }
        }
        .cmp-rhythm-cell {
          background: #ffffff;
          padding: 2rem;
        }
        .cmp-section-tint .cmp-rhythm-cell { background: #f7f9f7; }
        .cmp-rhythm-cell h3 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: #888888; margin: 0 0 1rem;
        }
        .cmp-rhythm-cell p {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem; font-weight: 300;
          line-height: 1.85; color: #555555;
          margin: 0; white-space: pre-line;
        }

        /* how to choose */
        .cmp-choose-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(15,118,110,0.08);
          border: 1px solid rgba(15,118,110,0.08);
          margin-bottom: 2rem;
        }
        @media (max-width: 640px) {
          .cmp-choose-grid { grid-template-columns: 1fr; }
        }
        .cmp-choose-cell {
          background: #ffffff;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        .cmp-choose-cell::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--color-primary);
          
        }
        .cmp-choose-cell-label {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.75rem; font-weight: 500;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: #374151;
          display: block; margin-bottom: 0.75rem;
        }
        .cmp-choose-cell p {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem; font-weight: 300;
          line-height: 1.85; color: #555555; margin: 0;
        }

        /* cta note */
        .cmp-cta-note {
          border-left: 3px solid rgba(15,118,110,0.25);
          padding: 1.25rem 1.5rem;
          background: rgba(15,118,110,0.02);
        }
        .cmp-cta-note p {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem; font-weight: 300;
          line-height: 1.85; color: #555555; margin: 0;
        }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── BREADCRUMB ── */}
      <div style={{
        width: '100%',
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 0',
        marginTop: '4rem',
      }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 var(--space-md)' }}>
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Himalayan Retreats', href: '/retreats/himalayan-retreats' },
              { name: `${serviceA.title} vs ${serviceB.title}` },
            ]}
          />
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="cmp-hero">
        <div className="cmp-hero-inner">
          <div className="cmp-eyebrow">
            <span className="cmp-eyebrow-line" />
            <span className="cmp-eyebrow-text">Retreat Comparison</span>
          </div>
          <h1 className="cmp-h1">
            {serviceA.title} <em>vs</em> {serviceB.title}
          </h1>
          <p className="cmp-lead">
            Both are structured Himalayan retreat programs. The difference lies in purpose, pacing, and who
            each format is best suited for. This comparison outlines the key distinctions to help you choose.
          </p>
        </div>
      </div>

      {/* ── AT A GLANCE ── */}
      <section className="cmp-section cmp-section-white">
        <div className="cmp-section-inner">
          <div className="cmp-eyebrow">
            <span className="cmp-eyebrow-line" />
            <span className="cmp-eyebrow-text">At a Glance</span>
          </div>
          <h2 className="cmp-h2">At a Glance</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="cmp-table" aria-label="Retreat comparison overview">
              <thead>
                <tr>
                  <th></th>
                  <th>{serviceA.title}</th>
                  <th>{serviceB.title}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Format</td>
                  <td>{serviceA.oneLineEssence}</td>
                  <td>{serviceB.oneLineEssence}</td>
                </tr>
                <tr>
                  <td>Duration</td>
                  <td>{durationA === '3-day' ? '3-day program' : durationA === '5-day' ? '5-day program' : 'Flexible (custom)'}</td>
                  <td>{durationB === '3-day' ? '3-day program' : durationB === '5-day' ? '5-day program' : 'Flexible (custom)'}</td>
                </tr>
                <tr>
                  <td>Primary Location</td>
                  <td style={{ textTransform: 'capitalize' }}>{serviceA.whereItWorksBest.primary}</td>
                  <td style={{ textTransform: 'capitalize' }}>{serviceB.whereItWorksBest.primary}</td>
                </tr>
                <tr>
                  <td>Why that location</td>
                  <td>{serviceA.whereItWorksBest.primaryReason}</td>
                  <td>{serviceB.whereItWorksBest.primaryReason}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── WHO EACH RETREAT IS FOR ── */}
      <section className="cmp-section cmp-section-tint">
        <div className="cmp-section-inner">
          <div className="cmp-eyebrow">
            <span className="cmp-eyebrow-line" />
            <span className="cmp-eyebrow-text">Suitability</span>
          </div>
          <h2 className="cmp-h2">Who Each Retreat Is For</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="cmp-table" aria-label="Retreat participant suitability">
              <thead>
                <tr>
                  <th></th>
                  <th>{serviceA.title}</th>
                  <th>{serviceB.title}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Best suited for</td>
                  <td>
                    <ul>
                      {serviceA.forNotFor.for.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {serviceB.forNotFor.for.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>Not for</td>
                  <td>
                    <ul>
                      {serviceA.forNotFor.notFor.map((item) => (
                        <li key={item} style={{ color: '#999999' }}>{item}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {serviceB.forNotFor.notFor.map((item) => (
                        <li key={item} style={{ color: '#999999' }}>{item}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── DAILY RHYTHM ── */}
      <section className="cmp-section cmp-section-white">
        <div className="cmp-section-inner">
          <div className="cmp-eyebrow">
            <span className="cmp-eyebrow-line" />
            <span className="cmp-eyebrow-text">Daily Rhythm</span>
          </div>
          <h2 className="cmp-h2">Daily Rhythm</h2>
          <div className="cmp-rhythm-grid">
            <div className="cmp-rhythm-cell">
              <h3>{serviceA.title}</h3>
              <p>{serviceA.howItWorks.rhythm}</p>
            </div>
            <div className="cmp-rhythm-cell">
              <h3>{serviceB.title}</h3>
              <p>{serviceB.howItWorks.rhythm}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCORE COMPARISON ── */}
      {RETREAT_SCORES[ca] && RETREAT_SCORES[cb] && (
        <section className="cmp-section cmp-section-tint">
          <div className="cmp-section-inner">
            <div className="cmp-eyebrow">
              <span className="cmp-eyebrow-line" />
              <span className="cmp-eyebrow-text">Program Profile</span>
            </div>
            <h2 className="cmp-h2">Program Profile Comparison</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="cmp-table" aria-label="Retreat score comparison">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>{serviceA.title}</th>
                    <th>{serviceB.title}</th>
                  </tr>
                </thead>
                <tbody>
                  {(Object.keys(RETREAT_SCORES[ca]!) as (keyof RetreatScores)[]).map((dim) => (
                    <tr key={dim}>
                      <td>{SCORE_LABELS[dim]}</td>
                      <td><div style={{ flex: 1 }}><ScoreBar dimension={dim} value={RETREAT_SCORES[ca]![dim]} /></div></td>
                      <td><div style={{ flex: 1 }}><ScoreBar dimension={dim} value={RETREAT_SCORES[cb]![dim]} /></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── HOW TO CHOOSE ── */}
      <section className="cmp-section cmp-section-white">
        <div className="cmp-section-inner">
          <div className="cmp-eyebrow">
            <span className="cmp-eyebrow-line" />
            <span className="cmp-eyebrow-text">Decision Guide</span>
          </div>
          <h2 className="cmp-h2">How to Choose</h2>
          <div className="cmp-choose-grid">
            <div className="cmp-choose-cell">
              <span className="cmp-choose-cell-label">{serviceA.title}</span>
              <p>
                If your primary need is {serviceA.oneLineEssence.toLowerCase().replace(/\.$/, '')}, the{' '}
                <Link href={`/retreats/journeys/${ca}`} style={{ color: '#374151' }}>
                  {serviceA.title}
                </Link>{' '}
                retreat may be more aligned.
              </p>
            </div>
            <div className="cmp-choose-cell">
              <span className="cmp-choose-cell-label">{serviceB.title}</span>
              <p>
                If your primary need is {serviceB.oneLineEssence.toLowerCase().replace(/\.$/, '')}, explore the{' '}
                <Link href={`/retreats/journeys/${cb}`} style={{ color: '#374151' }}>
                  {serviceB.title}
                </Link>{' '}
                retreat instead.
              </p>
            </div>
          </div>

          <div className="cmp-cta-note">
            <p>
              For a broader overview of all retreat programs and formats, visit our complete guide to{' '}
              <Link href="/retreats/himalayan-retreats" style={{ color: '#374151' }}>
                Himalayan Retreats in India
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── OTHER COMPARISONS ── */}
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