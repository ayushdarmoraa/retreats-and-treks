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
import TrackedPage from '@/components/TrackedPage';

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

const COMPARE_TITLE_LABELS: Record<string, string> = {
  'art-and-creative': 'Creative Healing',
  'burnout-recovery': 'Burnout Recovery',
  'meditation-and-silence': 'Meditation',
  'private-and-custom': 'Custom',
  'rest-and-reset': 'Rest & Reset',
  'sound-healing': 'Sound Healing',
  'trek-and-paint': 'Trek & Paint',
  'weekend-art-retreat': 'Weekend Art',
  'weekend-retreat': 'Weekend Retreat',
  'yoga-and-movement': 'Yoga & Movement',
};

function compareTitleLabel(slug: string, fallback: string): string {
  return COMPARE_TITLE_LABELS[slug] ?? fallback.replace(/ Retreat in the Himalayas$/, '').replace(/ Retreat$/, '');
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
  const titleA = compareTitleLabel(ca, serviceA.title);
  const titleB = compareTitleLabel(cb, serviceB.title);

  return {
    title: `${titleA} vs ${titleB} | Retreats And Treks`,
    description: `Compare ${titleA} and ${titleB} retreats by structure, intensity, duration, ideal participant, and how to choose the right path.`,
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
  const titleA = compareTitleLabel(ca, serviceA.title);
  const titleB = compareTitleLabel(cb, serviceB.title);

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
    <TrackedPage page={canonicalPath} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <style>{`
        .med-shell { width: 100vw; margin-left: calc(-50vw + 50%); }
        .med-outer { max-width: 76rem; margin: 0 auto; padding: 0 1.5rem; }
        .med-inner { max-width: 58rem; margin: 0 auto; padding: 0 1.5rem; }

        .med-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.1rem; }
        .med-eyebrow-line { width: 30px; height: 1px; background: rgba(15,118,110,0.35); flex-shrink: 0; }
        .med-eyebrow-text { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6b7280; font-weight: 600; }

        .med-h2 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.12; margin: 0 0 1.1rem; }
        .med-h2 span { color: #0f766e; }
        .med-h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.15rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.7rem; letter-spacing: -0.01em; }
        .med-body { font-family: var(--font-inter), sans-serif; font-size: 0.98rem; line-height: 1.9; color: #4b5259; font-weight: 400; margin: 0 0 1rem; }
        .med-body:last-child { margin-bottom: 0; }
        .med-body strong { color: #2B2A26; font-weight: 600; }

        .med-card {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(15,31,28,0.05);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .med-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: #0f766e; transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: 2;
        }
        .med-card:hover { transform: translateY(-6px); border-color: rgba(15,118,110,0.28); box-shadow: 0 22px 48px rgba(15,31,28,0.12); }
        .med-card:hover::before { transform: scaleX(1); }

        .med-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem 2.3rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.25); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid #0f766e; }
        .med-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.32); }
        .med-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.85rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .med-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-compare-hero { padding: 5rem 0 4rem; border-bottom: 1px solid rgba(15,118,110,0.08); position: relative; }
        .med-compare-hero .med-h1 { font-size: clamp(1.6rem, 3.2vw, 2.4rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.15; margin: 0 0 1rem; }
        .med-compare-hero .med-h1 span { color: #0f766e; }

        .med-compare-table { width: 100%; border-collapse: collapse; font-family: var(--font-inter), sans-serif; font-size: 0.88rem; line-height: 1.7; }
        .med-compare-table thead tr { border-bottom: 2px solid #0f766e; }
        .med-compare-table th { text-align: left; padding: 0.75rem 1rem; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #6b7280; }
        .med-compare-table tbody tr { border-bottom: 1px solid rgba(15,118,110,0.06); transition: background 0.2s; }
        .med-compare-table tbody tr:hover { background: rgba(15,118,110,0.02); }
        .med-compare-table td { padding: 0.85rem 1rem; vertical-align: top; color: #4b5259; }
        .med-compare-table td:first-child { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.04em; color: #6b7280; text-transform: uppercase; width: 20%; white-space: nowrap; }
        .med-compare-table ul { margin: 0; padding: 0; list-style: none; }
        .med-compare-table ul li { padding: 0.2rem 0 0.2rem 1rem; position: relative; color: #4b5259; }
        .med-compare-table ul li::before { content: '—'; position: absolute; left: 0; color: #0f766e; font-size: 0.7rem; }

        .med-rhythm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; overflow: hidden; }
        @media (max-width: 640px) { .med-rhythm-grid { grid-template-columns: 1fr; } }
        .med-rhythm-cell { padding: 2rem; background: #fff; }
        .med-section-alt .med-rhythm-cell { background: #f7f9f7; }
        .med-rhythm-cell:first-child { border-right: 1px solid rgba(15,118,110,0.06); }
        @media (max-width: 640px) { .med-rhythm-cell:first-child { border-right: none; border-bottom: 1px solid rgba(15,118,110,0.06); } }
        .med-rhythm-cell .med-h3 { font-size: 0.85rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.75rem; }
        .med-rhythm-cell .med-body { font-size: 0.88rem; margin-bottom: 0; white-space: pre-line; }

        .med-choose-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; overflow: hidden; margin-bottom: 2rem; }
        @media (max-width: 640px) { .med-choose-grid { grid-template-columns: 1fr; } }
        .med-choose-cell { padding: 2rem; background: #fff; position: relative; }
        .med-choose-cell:first-child { border-right: 1px solid rgba(15,118,110,0.06); }
        @media (max-width: 640px) { .med-choose-cell:first-child { border-right: none; border-bottom: 1px solid rgba(15,118,110,0.06); } }
        .med-choose-cell .med-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.25rem 0.6rem; border-radius: 999px; margin-bottom: 0.75rem; }
        .med-choose-cell .med-body { margin-bottom: 0; }
        .med-choose-cell .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-choose-cell .med-body a:hover { text-decoration: underline; }

        .med-compare-cta { padding: 1.25rem 1.5rem; border-left: 3px solid #0f766e; border-radius: 18px; background: #f7f9f7; border: 1px solid rgba(15,118,110,0.12); }
        .med-compare-cta .med-body { font-size: 0.88rem; margin-bottom: 0; }
        .med-compare-cta .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-compare-cta .med-body a:hover { text-decoration: underline; }

        .med-compare-score { display: flex; align-items: center; gap: 1rem; }
        .med-compare-score .med-score-label { font-family: var(--font-inter), sans-serif; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; }
        .med-compare-score .med-score-bar { flex: 1; height: 6px; border-radius: 999px; background: rgba(15,118,110,0.12); overflow: hidden; position: relative; }
        .med-compare-score .med-score-bar .med-score-fill { height: 100%; border-radius: 999px; transition: width 0.6s ease; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        /* last word green heading pattern - override */
        .med-compare-hero .med-h1 span { color: #0f766e; }
      `}</style>

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Himalayan Retreats', href: '/retreats/himalayan-retreats' },
              { name: `${serviceA.title} vs ${serviceB.title}` },
            ]}
          />
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article>

        {/* ── HERO ── */}
        <section className="med-shell med-section-alt med-compare-hero">
          <div className="med-outer">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Retreat Comparison</span>
            </div>
            <h1 className="med-h1">
              {serviceA.title} <span>vs</span> {serviceB.title}
            </h1>
            <p className="med-body" style={{ maxWidth: '48rem' }}>
              Both are structured Himalayan retreat programs. The difference lies in purpose, pacing, and who each format is best suited for. This comparison outlines the key distinctions to help you choose.
            </p>
          </div>
        </section>

        {/* ── AT A GLANCE ── */}
        <section className="med-shell med-section-white" style={{ padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">At a Glance</span>
            </div>
            <h2 className="med-h2">{titleA} vs {titleB} <span>at a Glance</span></h2>

            <div style={{ overflowX: 'auto', marginTop: '1.8rem' }}>
              <table className="med-compare-table">
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
        <section className="med-shell med-section-alt" style={{ padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Suitability</span>
            </div>
            <h2 className="med-h2">Who Should Choose {titleA} <span>or</span> {titleB}</h2>

            <div style={{ overflowX: 'auto', marginTop: '1.8rem' }}>
              <table className="med-compare-table">
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
                          <li key={item} style={{ color: '#9ca3af' }}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {serviceB.forNotFor.notFor.map((item) => (
                          <li key={item} style={{ color: '#9ca3af' }}>{item}</li>
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
        <section className="med-shell med-section-white" style={{ padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Daily Rhythm</span>
            </div>
            <h2 className="med-h2">Daily <span>Rhythm</span></h2>

            <div className="med-rhythm-grid">
              <div className="med-rhythm-cell">
                <h3 className="med-h3">{serviceA.title}</h3>
                <p className="med-body">{serviceA.howItWorks.rhythm}</p>
              </div>
              <div className="med-rhythm-cell">
                <h3 className="med-h3">{serviceB.title}</h3>
                <p className="med-body">{serviceB.howItWorks.rhythm}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SCORE COMPARISON ── */}
        {RETREAT_SCORES[ca] && RETREAT_SCORES[cb] && (
          <section className="med-shell med-section-alt" style={{ padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
            <div className="med-outer">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Program Profile</span>
              </div>
              <h2 className="med-h2">Program Profile <span>Comparison</span></h2>

              <div style={{ overflowX: 'auto', marginTop: '1.8rem' }}>
                <table className="med-compare-table">
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
                        <td>
                          <div className="med-compare-score">
                            <span className="med-score-label">{RETREAT_SCORES[ca]![dim]}</span>
                            <div className="med-score-bar">
                              <div className="med-score-fill" style={{ width: `${(RETREAT_SCORES[ca]![dim] / 10) * 100}%`, background: '#0f766e' }} />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="med-compare-score">
                            <span className="med-score-label">{RETREAT_SCORES[cb]![dim]}</span>
                            <div className="med-score-bar">
                              <div className="med-score-fill" style={{ width: `${(RETREAT_SCORES[cb]![dim] / 10) * 100}%`, background: '#0f766e' }} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ── HOW TO CHOOSE ── */}
        <section className="med-shell med-section-white" style={{ padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decision Guide</span>
            </div>
            <h2 className="med-h2">How to <span>Choose</span></h2>

            <div className="med-choose-grid">
              <div className="med-choose-cell">
                <span className="med-tag">{serviceA.title}</span>
                <p className="med-body">
                  If your primary need is {serviceA.oneLineEssence.toLowerCase().replace(/\.$/, '')}, the{' '}
                  <Link href={`/retreats/journeys/${ca}`}>
                    {serviceA.title}
                  </Link>{' '}
                  retreat may be more aligned.
                </p>
              </div>
              <div className="med-choose-cell">
                <span className="med-tag">{serviceB.title}</span>
                <p className="med-body">
                  If your primary need is {serviceB.oneLineEssence.toLowerCase().replace(/\.$/, '')}, explore the{' '}
                  <Link href={`/retreats/journeys/${cb}`}>
                    {serviceB.title}
                  </Link>{' '}
                  retreat instead.
                </p>
              </div>
            </div>

            <div className="med-compare-cta">
              <p className="med-body">
                For a broader overview of all retreat programs and formats, visit our complete guide to{' '}
                <Link href="/retreats/himalayan-retreats">
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

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-alt" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-nav-grid">
              <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Retreats</span>
              </Link>
              <Link href="/retreats/himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Himalayan Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreats/best-retreat-in-uttarakhand" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Best Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/find-your-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Find Your Retreat</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
            </div>
          </div>
        </nav>
      </article>
    </TrackedPage>
  );
}