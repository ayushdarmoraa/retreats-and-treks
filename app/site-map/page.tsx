import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const PATH = '/site-map';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return {
    title: 'Complete Site Map | Retreats And Treks',
    description:
      'Complete directory of all treks, retreats, guides, and planning pages on Retreats And Treks. Browse by region, difficulty, season, or duration.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    openGraph: {
      title: 'Complete Site Map | Retreats And Treks',
      description: 'Complete directory of all treks, retreats, guides, and planning pages on Retreats And Treks. Browse by region, difficulty, season, or duration.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages('Complete Site Map | Retreats And Treks'),
    },
    robots: { index: true, follow: true },
  };
}

const SITEMAP_GROUPS = [
  {
    title: 'Trek Discovery',
    links: [
      { label: 'Best Treks in Uttarakhand', href: '/treks/best-treks-in-uttarakhand' },
      { label: 'Beginner Treks', href: '/treks/best-treks-in-uttarakhand/beginner' },
      { label: 'Snow Treks', href: '/treks/best-treks-in-uttarakhand/snow' },
      { label: 'Challenging Treks', href: '/treks/best-treks-in-uttarakhand/challenging' },
      { label: 'High-Altitude Treks', href: '/treks/best-treks-in-uttarakhand/high-altitude' },
      { label: 'Garhwal Himalaya Treks', href: '/treks/garhwal-himalayas' },
    ],
  },
  {
    title: 'Trek Filters',
    links: [
      { label: 'Beginner Treks in Uttarakhand', href: '/treks/best-treks-in-uttarakhand/beginner' },
      { label: 'Winter Treks (December–February)', href: '/treks/best-treks-in-uttarakhand/snow' },
      { label: 'Summer Treks (May–June)', href: '/treks/summer-treks-uttarakhand' },
      { label: 'Spring Treks (March–May)', href: '/treks/spring-treks-uttarakhand' },
      { label: 'Autumn Treks (September–November)', href: '/treks/autumn-treks-uttarakhand' },
      { label: '3-Day Treks', href: '/treks/3-day-treks-uttarakhand' },
      { label: '5-Day Treks', href: '/treks/5-day-treks-uttarakhand' },
      { label: 'Week-Long Treks (6–10 Days)', href: '/treks/week-long-treks-uttarakhand' },
      { label: 'Treks Above 4,000m', href: '/treks/above-4000m-treks-uttarakhand' },
      { label: 'Low-Altitude Treks (Below 3,500m)', href: '/treks/low-altitude-treks-uttarakhand' },
      { label: 'Treks Near Delhi', href: '/treks/trek-near-delhi' },
      { label: 'Trek Packages in Uttarakhand', href: '/treks/trek-packages-uttarakhand' },
    ],
  },
  {
    title: 'Trek Regions',
    links: [
      { label: 'Chakrata Treks', href: '/treks/location/chakrata' },
      { label: 'Sankri Treks', href: '/treks/location/sankri' },
      { label: 'Joshimath Treks', href: '/treks/location/joshimath' },
      { label: 'Lohajung Treks', href: '/treks/location/lohajung' },
      { label: 'Munsiyari Treks', href: '/treks/location/munsiyari' },
    ],
  },
  {
    title: 'All Treks',
    links: [
      { label: 'Brahmatal Trek', href: '/treks/location/lohajung/brahmatal-trek' },
      { label: 'Kuari Pass Trek', href: '/treks/location/joshimath/kuari-pass-trek' },
      { label: 'Roopkund Trek', href: '/treks/location/lohajung/roopkund-trek' },
      { label: 'Pangarchulla Peak Trek', href: '/treks/location/joshimath/pangarchulla-trek' },
      { label: 'Kedarkantha Trek', href: '/treks/location/sankri/kedarkantha-trek' },
      { label: 'Har Ki Dun Trek', href: '/treks/location/sankri/har-ki-dun-trek' },
      { label: 'Khaliya Top Trek', href: '/treks/location/munsiyari/khaliya-top-trek' },
      { label: 'Milam Glacier Trek', href: '/treks/location/munsiyari/milam-glacier-trek' },
      { label: 'Tiger Fall Trek', href: '/treks/location/chakrata/tiger-fall-trek' },
      { label: 'Budher Caves Trek', href: '/treks/location/chakrata/budher-caves-trek' },
      { label: 'Chakrata Weekend Trek', href: '/treks/location/chakrata/weekend-trek' },
      { label: 'Guided Chakrata Treks', href: '/treks/location/chakrata/guided-treks' },
    ],
  },
  {
    title: 'Trek Comparisons',
    links: [
      { label: 'Kedarkantha vs Har Ki Dun', href: '/treks/kedarkantha-vs-har-ki-dun' },
      { label: 'Brahmatal vs Kuari Pass', href: '/treks/brahmatal-vs-kuari-pass' },
      { label: 'Roopkund vs Pangarchulla', href: '/treks/roopkund-vs-pangarchulla' },
    ],
  },
  {
    title: 'Trekking Guides',
    links: [
      { label: 'Garhwal Trek Fitness Guide', href: '/treks/garhwal-himalayas/fitness-guide' },
      { label: 'Trek Packing Checklist', href: '/treks/garhwal-himalayas/packing-checklist' },
      { label: 'Trek and Paint Guide', href: '/trek-and-paint-himalayas' },
    ],
  },
  {
    title: 'Retreats',
    links: [
      { label: 'All Retreats', href: '/retreats' },
      { label: 'Himalayan Retreats', href: '/retreats/himalayan-retreats' },
      { label: 'Best Retreat in Uttarakhand', href: '/retreats/best-retreat-in-uttarakhand' },
      { label: 'Retreat Programs', href: '/retreat-programs' },
      { label: 'Winter Retreats', href: '/retreats/winter-himalayan-retreats' },
      { label: 'Summer Retreats', href: '/retreats/summer-himalayan-retreats' },
      { label: 'Weekend Retreats', href: '/retreats/weekend-himalayan-retreats' },
    ],
  },
  {
    title: 'Retreat Journeys',
    links: [
      { label: 'Rest & Reset', href: '/retreats/journeys/rest-and-reset' },
      { label: 'Burnout Recovery', href: '/retreats/journeys/burnout-recovery' },
      { label: 'Yoga & Movement', href: '/retreats/journeys/yoga-and-movement' },
      { label: 'Meditation & Silence', href: '/retreats/journeys/meditation-and-silence' },
      { label: 'Art & Creative', href: '/retreats/journeys/art-and-creative' },
      { label: 'Trek & Paint', href: '/retreats/journeys/trek-and-paint' },
      { label: 'Weekend Art Retreat', href: '/retreats/journeys/weekend-art-retreat' },
      { label: 'Sound Healing', href: '/retreats/journeys/sound-healing' },
      { label: 'Weekend Retreat', href: '/retreats/journeys/weekend-retreat' },
      { label: 'Private & Custom', href: '/retreats/journeys/private-and-custom' },
    ],
  },
  {
    title: 'Retreat Locations',
    links: [
      { label: 'Retreats in Chakrata', href: '/retreats/chakrata' },
      { label: 'Retreats in Sankri', href: '/retreats/sankri' },
      { label: 'Retreats in Mussoorie', href: '/retreats/mussoorie' },
      { label: 'Retreats in Munsiyari', href: '/retreats/munsiyari' },
      { label: 'Retreats in Rishikesh', href: '/retreats/rishikesh' },
    ],
  },
  {
    title: 'Blog & Company',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export default function SiteMapPage() {
  // Split heading for green last word
  const h1Words = "Site Map".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Complete Site Map | Retreats And Treks"
        description="Complete directory of all treks, retreats, guides, and planning pages on Retreats And Treks."
        path={PATH}
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

        .med-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .med-list-item { display: grid; grid-template-columns: 1.9rem 1fr; gap: 0.9rem; }
        .med-list-dot { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid rgba(15,118,110,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .med-list-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; }
        .med-list-text { font-family: var(--font-inter), sans-serif; font-size: 0.9rem; line-height: 1.7; color: #4b5259; font-weight: 400; }
        .med-list-text a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-list-text a:hover { text-decoration: underline; }

        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-hero-section {
          position: relative;
          overflow: hidden;
          min-height: 40vh;
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
          padding: 4rem 1.5rem 3.5rem;
          text-align: center;
        }
        .med-hero-section .med-hero-content .med-h1 {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(2.3rem, 4.6vw, 3.4rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 0.5rem;
          line-height: 1.08;
          text-shadow: 0 3px 24px rgba(0,0,0,0.5);
        }
        .med-hero-section .med-hero-content .med-h1 span {
          color: #5eead4;
        }
        .med-hero-section .med-hero-content .med-body {
          max-width: 46rem;
          margin: 0 auto;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.85);
          text-shadow: 0 2px 14px rgba(0,0,0,0.45);
        }
        .med-hero-section .med-hero-content .med-hero-tags {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
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

        .med-section-padding { padding: 4rem 0; }
        .med-section-padding-sm { padding: 3rem 0; }

        /* ── Sitemap specific styles ── */
        .med-sitemap-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 900px) { .med-sitemap-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .med-sitemap-grid { grid-template-columns: 1fr; } }

        .med-sitemap-group {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.1);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .med-sitemap-group:hover {
          border-color: rgba(15,118,110,0.25);
          box-shadow: 0 4px 16px rgba(15,118,110,0.06);
        }
        .med-sitemap-group .med-header {
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid rgba(15,118,110,0.06);
          background: #f7f9f7;
        }
        .med-sitemap-group .med-header .med-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #0f766e;
          margin: 0;
        }
        .med-sitemap-group .med-links {
          padding: 0.25rem 0;
        }
        .med-sitemap-group .med-link {
          display: block;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          color: #2B2A26;
          text-decoration: none;
          padding: 0.45rem 1.25rem;
          border-bottom: 1px solid rgba(15,118,110,0.04);
          transition: background 0.2s, color 0.2s, padding-left 0.2s;
        }
        .med-sitemap-group .med-link:last-child { border-bottom: none; }
        .med-sitemap-group .med-link:hover {
          background: #f7f9f7;
          color: #0f766e;
          padding-left: 1.5rem;
        }
        .med-sitemap-group .med-link::before {
          content: '→';
          font-size: 0.6rem;
          margin-right: 0.5rem;
          color: #0f766e;
          opacity: 0.4;
          transition: opacity 0.2s;
        }
        .med-sitemap-group .med-link:hover::before {
          opacity: 1;
        }
      `}</style>

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Site Map' },
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
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem', justifyContent: 'center' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Directory</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Complete directory of all treks, retreats, guides, and planning pages on Retreats And Treks.
            </p>
          </div>
        </section>

        {/* ── SITEMAP GRID ── */}
        <section className="med-shell med-section-white med-section-padding">
          <div className="med-outer">
            <div className="med-sitemap-grid">
              {SITEMAP_GROUPS.map((group) => (
                <div key={group.title} className="med-sitemap-group">
                  <div className="med-header">
                    <h2 className="med-title">{group.title}</h2>
                  </div>
                  <div className="med-links">
                    {group.links.map((link) => (
                      <Link key={link.href} href={link.href} className="med-link">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Home</span>
              </Link>
              <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/treks" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Treks</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/contact" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Contact</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
            </div>
          </div>
        </nav>

      </article>
    </TrackedPage>
  );
}