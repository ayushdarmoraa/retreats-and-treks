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
import TrackedPage from '@/components/TrackedPage';

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

  return (
    <TrackedPage page={`/${page.slug}`} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

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

        @keyframes med-hero-zoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        .med-hero-bg { animation: med-hero-zoom 24s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .med-hero-bg { animation: none; } }

        .med-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .med-list-item { display: grid; grid-template-columns: 1.9rem 1fr; gap: 0.9rem; }
        .med-list-dot { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid rgba(15,118,110,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .med-list-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; }
        .med-list-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #4b5259; font-weight: 400; }
        .med-list-text strong { color: #2B2A26; font-weight: 600; }

        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }

        .med-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.25rem 0.6rem; border-radius: 999px; }

        .med-table-wrap { overflow-x: auto; border-radius: 18px; border: 1px solid rgba(15,118,110,0.12); }
        .med-table { width: 100%; border-collapse: collapse; font-family: var(--font-inter), sans-serif; font-size: 0.88rem; }
        .med-table th { text-align: left; padding: 0.85rem 1rem; background: #f7f9f7; border-bottom: 2px solid #0f766e; font-weight: 600; color: #2B2A26; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; }
        .med-table td { padding: 0.85rem 1rem; border-bottom: 1px solid rgba(15,118,110,0.08); color: #4b5259; }
        .med-table tr:last-child td { border-bottom: none; }
        .med-table tr:hover td { background: #f7f9f7; }
        .med-table .med-highlight { color: #0f766e; font-weight: 600; }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }
      `}</style>

      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: page.h1 }]} />

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/hero/himalayan-sunrise.webp" alt={page.h1} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Duration: {page.durationLabel}</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            {page.h1}
          </h1>
          <p style={{ maxWidth: '40rem', margin: '0 auto 1.5rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            {page.intro}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <Link href="#plan" className="med-cta-btn">Plan My {page.durationLabel.split('/')[0].trim()} Retreat</Link>
            <Link href="#locations" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Where to Do This</Link>
          </div>
        </div>
      </section>

      {/* ── PRIMARY CTA ── */}
      <section  className="med-shell" style={{ background: '#ffffff', padding: '3rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <PrimaryCTA
            label={`Plan My ${page.durationLabel.split('/')[0].trim()} Retreat`}
            subtext="Tell us your dates and interests — we'll build the right programme."
            vertical="retreat"
            category={`duration-${page.slug}`}
            sourcePath={`/${page.slug}`}
          />
        </div>
      </section>

      {/* ── IDEAL FOR ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Who This Is For</span>
          </div>
          <h2 className="med-h2">Who This <span>Is For</span></h2>
          <ul className="med-list">
            {page.idealFor.map((item) => (
              <li key={item} className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── TYPICAL DAY ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Daily Schedule</span>
          </div>
          <h2 className="med-h2">A Typical <span>Day</span></h2>

          <div className="med-table-wrap">
            <table className="med-table">
              <tbody>
                {page.typicalDay.map((line, i) => {
                  const [time, ...rest] = line.split(' — ');
                  return (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, whiteSpace: 'nowrap', width: '25%' }}>{time}</td>
                      <td>{rest.join(' — ')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── LOCATION ANGLES ── */}
      <section id="locations" className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Where to Do This</span>
          </div>
          <h2 className="med-h2">Where to <span>Do This</span></h2>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            {page.locationAngles.map((angle) => {
              const loc = getLocationById(angle.locationId);
              return (
                <div key={angle.locationId} className="med-card" style={{ padding: '1.5rem' }}>
                  <span className="med-season-tag">{loc?.name ?? angle.locationId}</span>
                  <h3 className="med-h3">
                    <Link href={`/locations/${angle.locationId}`} style={{ color: '#0f766e', textDecoration: 'none' }}>
                      {angle.heading}
                    </Link>
                  </h3>
                  <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: '0.75rem' }}>{angle.description}</p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link href={`/locations/${angle.locationId}`} className="med-cta-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.65rem' }}>
                      About {loc?.name ?? angle.locationId} →
                    </Link>
                    {loc?.supportsRetreats && (
                      <Link href={`/retreats/${angle.locationId}`} className="med-cta-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.65rem' }}>
                        Retreats in {loc.name} →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RELATED EXPERIENCE PAGES ── */}
      {page.relatedExperienceSlugs.length > 0 && (
        <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Related</span>
            </div>
            <h2 className="med-h2">Related <span>Retreat Types</span></h2>

            <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
              {page.relatedExperienceSlugs.map((slug) => (
                <Link key={slug} href={`/${slug}`} className="med-card" style={{ padding: '1.2rem 1.5rem', textDecoration: 'none' }}>
                  <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>
                    {slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')}
                  </span>
                  <span style={{ color: '#0f766e', fontSize: '1.2rem' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CLOSING + CTA ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="med-inner" style={{ textAlign: 'center' }}>
          <p className="med-body" style={{ maxWidth: '42rem', margin: '0 auto 1.5rem', fontSize: '1.05rem' }}>
            {page.closingNarrative}
          </p>
          <PrimaryCTA
            label="Get Started"
            subtext="Describe what you need and we'll recommend the right duration, location, and programme."
            vertical="retreat"
            category={`duration-${page.slug}`}
            sourcePath={`/${page.slug}`}
          />
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell" style={{ background: '#ffffff', padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-nav-grid">
            <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Retreats</span>
            </Link>
            <Link href="/retreats/himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Himalayan Retreats</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/retreats/meditation-retreat-uttarakhand" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Meditation Retreats</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/find-your-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Find Your Retreat</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
          </div>
        </div>
      </nav>
    </TrackedPage>
  );
}
