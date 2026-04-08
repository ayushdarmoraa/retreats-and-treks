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
      style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}
    >
      <style>{`
        .tap-body { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0 0 1rem; }
        .tap-h2 { font-family:var(--font-geist-sans),sans-serif; font-size:clamp(1.4rem,2.5vw,1.85rem); font-weight:200; letter-spacing:-0.03em; color:#111; line-height:1.15; margin:0 0 0.75rem; }
        .tap-eyebrow { display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem; }
        .tap-eyebrow-line { width:24px; height:1px; background:var(--color-primary); opacity:0.5; display:inline-block; }
        .tap-eyebrow-text { font-size:0.75rem; letter-spacing:0.28em; text-transform:uppercase; color:#374151; font-weight:500; }
        .tap-link { color:var(--color-primary); font-weight:500; text-decoration:none; border-bottom:1px solid rgba(15,118,110,0.25); }
        .tap-link:hover { border-bottom-color:var(--color-primary); }

        .tap-table-wrap { border:1px solid #eef0ee; border-radius:8px; overflow:hidden; }
        .tap-table { width:100%; border-collapse:collapse; font-family:var(--font-geist-sans),sans-serif; font-size:0.82rem; font-weight:300; }
        .tap-table thead tr { background:#f7f9f7; border-bottom:2px solid #e5e7eb; }
        .tap-table th { padding:0.65rem 1rem; text-align:left; font-weight:500; color:#111; font-size:0.75rem; letter-spacing:0.02em; }
        .tap-table tbody tr { border-bottom:1px solid #f0f0f0; transition:background 0.12s; }
        .tap-table tbody tr:last-child { border-bottom:none; }
        .tap-table tbody tr:hover { background:#f7f9f7; }
        .tap-table td { padding:0.65rem 1rem; color:#555; }
        .tap-table td a { color:var(--color-primary); font-weight:500; text-decoration:none; }
        .tap-table td a:hover { text-decoration:underline; }

        .tap-trek-card { background:#fff; border:1px solid #eef0ee; border-top:2px solid var(--color-primary); border-radius:8px; padding:1.25rem 1.5rem; margin-bottom:0.75rem; transition:transform 0.18s,box-shadow 0.18s; }
        .tap-trek-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.07); }
        .tap-trek-meta { font-size:0.75rem; font-weight:400; color:#888; margin:0.35rem 0 0.65rem; }
        .tap-trek-title a { font-family:var(--font-geist-sans),sans-serif; font-size:0.95rem; font-weight:500; color:var(--color-primary); text-decoration:none; }
        .tap-trek-title a:hover { text-decoration:underline; }

        .tap-nav-group { border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
        .tap-nav-link { display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1rem; border-bottom:1px solid #f0f0f0; font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; color:#333; text-decoration:none; transition:background 0.15s,color 0.15s; }
        .tap-nav-link:last-child { border-bottom:none; }
        .tap-nav-link:hover { background:#f7f9f7; color:var(--color-primary); }
        .tap-nav-link::after { content:'→'; color:var(--color-primary); opacity:0.5; }

        .tap-count { display:inline-block; font-size:0.75rem; font-weight:500; color:var(--color-primary); background:rgba(15,118,110,0.08); border-radius:3px; padding:0.15rem 0.55rem; letter-spacing:0.04em; }

        @media(max-width:700px){ .tap-table-wrap { overflow-x:auto; } .tap-trek-card { padding:1rem; } }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Treks', href: '/treks' },
          { name: config.title.split('—')[0].trim() },
        ]}
      />

      <article>

        {/* ── HERO ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tap-eyebrow">
              <span className="tap-eyebrow-line" />
              <span className="tap-eyebrow-text">Treks · Uttarakhand</span>
            </div>
            <h1 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.4rem)', fontWeight:200, letterSpacing:'-0.035em', color:'#111', lineHeight:1.1, margin:'0 0 1.25rem' }}>
              {config.title.split('—')[0].trim()}
            </h1>
            <p className="tap-body" style={{ margin:'0 0 0.75rem' }}>{config.intro}</p>
            <p style={{ margin:'0 0 0.75rem' }}>
              <span className="tap-count">{matchedTreks.length} treks match this filter</span>
            </p>
            <p className="tap-body" style={{ margin:0 }}>
              Explore all routes in our{' '}
              <Link href="/treks/best-treks-in-uttarakhand" className="tap-link">Best Treks in Uttarakhand</Link> guide.
            </p>
          </div>
        </section>

        {/* ── CTA 1 ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'3rem', paddingBottom:'3rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <PrimaryCTA
              label="Plan My Trek"
              subtext="Tell us your dates, group size, and experience level — we'll recommend the right route."
              vertical="trek"
              category="filter"
              sourcePath={path}
            />
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tap-eyebrow"><span className="tap-eyebrow-line" /><span className="tap-eyebrow-text">At a Glance</span></div>
            <h2 className="tap-h2" style={{ marginBottom:'1.75rem' }}>Quick Comparison</h2>
            <div className="tap-table-wrap">
              <table className="tap-table">
                <thead>
                  <tr>
                    <th>Trek</th>
                    <th>Altitude</th>
                    <th>Duration</th>
                    <th>Difficulty</th>
                    <th>Best Season</th>
                  </tr>
                </thead>
                <tbody>
                  {matchedTreks.map((trek) => (
                    <tr key={trek.slug}>
                      <td><Link href={trekPath(trek)}>{trek.title}</Link></td>
                      <td>{trek.altitude ?? '—'}</td>
                      <td>{trek.duration}</td>
                      <td>{trek.difficulty}</td>
                      <td>{trek.bestSeason.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── TREK CARDS ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tap-eyebrow"><span className="tap-eyebrow-line" /><span className="tap-eyebrow-text">Detailed Overview</span></div>
            <h2 className="tap-h2" style={{ marginBottom:'1.75rem' }}>Detailed Overview</h2>
            {matchedTreks.map((trek) => (
              <div key={trek.slug} className="tap-trek-card">
                <p className="tap-trek-title">
                  <Link href={trekPath(trek)}>{trek.title}</Link>
                </p>
                <p className="tap-trek-meta">
                  {trek.altitude ?? ''} · {trek.duration} · {trek.difficulty} · {trek.bestSeason.slice(0, 3).join(', ')}{trek.bestSeason.length > 3 ? ' …' : ''}
                </p>
                <p className="tap-body" style={{ margin:0 }}>{trek.overview}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA 2 ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'3rem', paddingBottom:'3rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <PrimaryCTA
              label="Plan My Trek"
              subtext="Not sure which trek suits you? Share your dates and preferences — we'll help you choose."
              vertical="trek"
              category="filter"
              sourcePath={path}
            />
          </div>
        </section>

        {/* ── EXPLORE MORE ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tap-eyebrow"><span className="tap-eyebrow-line" /><span className="tap-eyebrow-text">Explore More</span></div>
            <h2 className="tap-h2" style={{ marginBottom:'1.75rem' }}>Explore More</h2>
            <div className="tap-nav-group">
              <Link href="/treks/best-treks-in-uttarakhand" className="tap-nav-link">Best Treks in Uttarakhand — Complete Guide</Link>
              <Link href="/treks/beginner-treks-uttarakhand" className="tap-nav-link">Beginner Treks in Uttarakhand</Link>
              <Link href="/treks/best-treks-in-uttarakhand#challenging-treks" className="tap-nav-link">Challenging Treks in Uttarakhand</Link>
              <Link href="/treks/best-treks-in-uttarakhand#snow-treks" className="tap-nav-link">Snow Treks in Uttarakhand</Link>
              <Link href="/treks/winter-treks-uttarakhand" className="tap-nav-link">Winter Treks (December–February)</Link>
              <Link href="/treks/summer-treks-uttarakhand" className="tap-nav-link">Summer Treks (May–June)</Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tap-eyebrow"><span className="tap-eyebrow-line" /><span className="tap-eyebrow-text">FAQ</span></div>
            <TrackedFAQ items={config.faqs} page={path} />
          </div>
        </section>

      </article>
    </TrackedPage>
  );
}
