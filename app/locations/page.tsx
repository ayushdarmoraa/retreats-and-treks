import { Metadata } from 'next';
import Link from 'next/link';
import { getAllLocations } from '@/lib/locations';
import { getLocationPremiumContent } from '@/content/locations';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateItemListSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import type { LocationId } from '@/config/locations';
import TrackedPage from '@/components/TrackedPage';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  const title = 'Himalayan Locations | Retreats And Treks';
  const description =
    'Explore Himalayan locations for retreats and treks, from accessible hill towns to remote valleys chosen for silence, depth, and transformation.';
  const canonical = buildCanonicalUrl('/locations');

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: 'website', images: buildOgImages(title) },
  };
}

export default function LocationsIndexPage() {
  const locations = getAllLocations();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Locations', url: buildCanonicalUrl('/locations') },
  ]);

  const itemListSchema = generateItemListSchema(
    locations.map((loc) => ({
      name: loc.name,
      url: buildCanonicalUrl(`/locations/${loc.id}`),
    })),
  );

  // Split heading for green last word
  const h1Words = "Our Locations".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page="/locations" style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Himalayan Locations — Retreats and Treks"
        description="Explore Himalayan locations for retreats and treks, from accessible hill towns to remote valleys chosen for silence, depth, and transformation."
        path="/locations"
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

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-hero-section {
          position: relative;
          overflow: hidden;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(15,118,110,0.12);
        }
        .med-hero-section .med-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%);
        }
        .med-hero-section .med-hero-content {
          position: relative;
          z-index: 2;
          max-width: 58rem;
          width: 100%;
          padding: 5rem 1.5rem 4.5rem;
          text-align: center;
        }
        .med-hero-section .med-hero-content .med-h1 {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(2.3rem, 4.6vw, 3.4rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 1.1rem;
          line-height: 1.08;
          text-shadow: 0 3px 24px rgba(0,0,0,0.5);
        }
        .med-hero-section .med-hero-content .med-h1 span {
          color: #5eead4;
        }
        .med-hero-section .med-hero-content .med-body {
          max-width: 46rem;
          margin: 0 auto 1.5rem;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.85);
          text-shadow: 0 2px 14px rgba(0,0,0,0.45);
        }
        .med-hero-section .med-hero-content .med-hero-tags {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .med-hero-section .med-hero-content .med-hero-tags span {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 999px;
          padding: 0.35rem 0.9rem;
          background: rgba(15,118,110,0.25);
        }
        .med-hero-section .med-hero-content .med-hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .med-section-padding { padding: 4rem 0; }
        .med-section-padding-sm { padding: 3rem 0; }

        /* ── Location Index specific styles ── */
        .med-loc-grid { display: grid; gap: 1.4rem; margin-top: 1.8rem; }

        .med-loc-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .med-loc-card .med-loc-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .med-loc-card .med-loc-header .med-h3 {
          font-size: 1.15rem;
          margin: 0;
        }
        .med-loc-card .med-loc-header .med-h3 a {
          color: #0f766e;
          text-decoration: none;
        }
        .med-loc-card .med-loc-header .med-h3 a:hover {
          text-decoration: underline;
        }
        .med-loc-card .med-loc-region {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          color: #6b7280;
        }
        .med-loc-card .med-body {
          font-size: 0.95rem;
          margin: 0;
        }
        .med-loc-card .med-loc-tags {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          align-items: center;
          margin-top: 0.25rem;
        }
        .med-loc-card .med-loc-tag {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          padding: 0.2rem 0.7rem;
          border-radius: 999px;
          border: 1px solid rgba(15,118,110,0.15);
          color: #6b7280;
          font-weight: 500;
        }
        .med-loc-card .med-loc-link {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          color: #0f766e;
          font-weight: 500;
          text-decoration: none;
          margin-left: auto;
        }
        .med-loc-card .med-loc-link:hover {
          text-decoration: underline;
        }

        .med-loc-narrative {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(15,118,110,0.08);
        }
        .med-loc-narrative .med-body {
          margin-bottom: 1rem;
        }
        .med-loc-narrative .med-body:last-child { margin-bottom: 0; }
        .med-loc-narrative a {
          color: #0f766e;
          font-weight: 500;
          text-decoration: none;
        }
        .med-loc-narrative a:hover {
          text-decoration: underline;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Locations' },
            ]}
          />
        </div>
      </div>

      <article>

        {/* ── HERO ── */}
        <section className="med-shell med-hero-section">
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              className="med-hero-bg"
              src={heroImage.src}
              alt={heroImage.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div className="med-hero-overlay" />
          </div>
          <div className="med-hero-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Himalayan Network</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Each location in our network is chosen for a specific quality — silence, altitude, remoteness, monastic lineage, forest density, or river energy. We do not operate from tourist hubs. We work with places where the land itself supports inner work and movement.
            </p>
            <div className="med-hero-tags">
              <span>Silence</span>
              <span>Altitude</span>
              <span>Remoteness</span>
              <span>Monastic Lineage</span>
            </div>
            <div className="med-hero-actions">
              <a href="#locations" className="med-cta-btn">Explore Locations</a>
              <a href="#network" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Our Network</a>
            </div>
          </div>
        </section>

        {/* ── LOCATIONS GRID ── */}
        <section id="locations" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Destinations</span>
            </div>
            <h2 className="med-h2">Explore <span>Our Locations</span></h2>

            <div className="med-loc-grid">
              {locations.map((loc) => {
                const content = getLocationPremiumContent(loc.id as LocationId);
                const tags: string[] = [];
                if (loc.supportsRetreats) tags.push('Retreats');
                if (loc.supportsTreks) tags.push('Treks');

                return (
                  <div key={loc.id} className="med-card med-loc-card">
                    <div className="med-loc-header">
                      <h3 className="med-h3">
                        <Link href={`/locations/${loc.id}`}>{loc.name}</Link>
                      </h3>
                      <span className="med-loc-region">{loc.address.region}, India</span>
                    </div>

                    <p className="med-body">{loc.tagline}</p>

                    {content && (
                      <p className="med-body" style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                        {content.landTone.opening.slice(0, 200)}…
                      </p>
                    )}

                    <div className="med-loc-tags">
                      {tags.map((tag) => (
                        <span key={tag} className="med-loc-tag">{tag}</span>
                      ))}
                      <Link href={`/locations/${loc.id}`} className="med-loc-link">
                        Explore {loc.name} →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── NARRATIVE ── */}
        <section id="network" className="med-shell med-section-alt med-section-padding">
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Our Network</span>
            </div>
            <h2 className="med-h2">A Himalayan Network, <span>Not a Single Destination</span></h2>

            <div className="med-loc-narrative">
              <p className="med-body">
                We work across multiple locations because different people need different kinds of places. Someone recovering from burnout needs the accessible forest silence of Chakrata. A serious practitioner may need the monastic remoteness of Zanskar. A first-time trekker might start from Sankri. A yoga seeker heads to Rishikesh.
              </p>
              <p className="med-body">
                Each location is selected — not for tourism appeal, but for what it offers the nervous system, the body, and the inner life of the people who travel there.
              </p>
              <p className="med-body">
                If you are unsure which location suits you, <Link href="/contact">reach out</Link>. We will help you choose based on your intention, fitness, and what you are seeking.
              </p>
            </div>
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Retreats</span>
              </Link>
              <Link href="/treks" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Treks</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/contact" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Contact Us</span>
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
