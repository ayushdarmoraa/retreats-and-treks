import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';

const PATH = '/site-map';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return {
    title: 'Site Map — Retreats And Treks',
    description:
      'Complete directory of all treks, retreats, guides, and planning pages on Retreats And Treks. Browse by region, difficulty, season, or duration.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
  };
}

const sectionStyle: React.CSSProperties = {
  marginBottom: 'var(--space-xl)',
};

const headingStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: 'var(--space-sm)',
  borderBottom: '1px solid var(--color-border)',
  paddingBottom: '0.5rem',
};

const listStyle: React.CSSProperties = {
  paddingLeft: '1.25rem',
  lineHeight: 2,
  listStyle: 'none',
};

const linkStyle: React.CSSProperties = {
  color: 'var(--color-primary)',
  textDecoration: 'none',
};

export default function SiteMapPage() {
  return (
    <TrackedPage
      page={PATH}
      style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}
    >
      <style>{`
        /* ── Hero ── */
        .smp-hero {
          width: 100vw; margin-left: calc(-50vw + 50%);
          background: #f7f9f7;
          padding: 4rem 0 3.5rem;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 3.5rem;
        }
        .smp-hero-inner { max-width: 72rem; margin: 0 auto; padding: 0 2rem; }
        .smp-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .smp-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; flex-shrink: 0; }
        .smp-eyebrow-text { font-family: var(--font-geist-sans),sans-serif; font-size: 0.56rem; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: var(--color-primary); opacity: 0.7; }
        .smp-h1 { font-family: var(--font-geist-sans),sans-serif; font-size: clamp(1.75rem,3.5vw,2.4rem); font-weight: 200; letter-spacing: -0.035em; color: #111; line-height: 1.1; margin: 0; }

        /* ── Grid ── */
        .smp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 900px) { .smp-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .smp-grid { grid-template-columns: 1fr; } }

        /* ── Group card ── */
        .smp-group {
          background: #fff;
          border: 1px solid #eef0ee;
          border-radius: 8px;
          overflow: hidden;
        }
        .smp-group-header {
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid #f0f2f0;
          background: #f7f9f7;
        }
        .smp-group-title {
          font-family: var(--font-geist-sans),sans-serif;
          font-size: 0.56rem; font-weight: 600;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--color-primary);
        }
        .smp-group-links { padding: 0.5rem 0; }
        .smp-group-link {
          display: block;
          font-family: var(--font-geist-sans),sans-serif;
          font-size: 0.82rem; font-weight: 300;
          color: #333; text-decoration: none;
          padding: 0.45rem 1.25rem;
          border-bottom: 1px solid #f5f5f5;
          transition: background 0.15s, color 0.15s, padding-left 0.15s;
        }
        .smp-group-link:last-child { border-bottom: none; }
        .smp-group-link:hover { background: #f0f7f5; color: var(--color-primary); padding-left: 1.5rem; }
        .smp-group-link::before { content: '→'; font-size: 0.65rem; margin-right: 0.5rem; opacity: 0.4; }
      `}</style>

      {/* Hero */}
      <div className="smp-hero">
        <div className="smp-hero-inner">
          <div className="smp-eyebrow">
            <span className="smp-eyebrow-line" />
            <span className="smp-eyebrow-text">Directory</span>
          </div>
          <h1 className="smp-h1">Site Map</h1>
        </div>
      </div>

      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Site Map' }]} />

      <div className="smp-grid" style={{ marginTop: '2rem' }}>

        {/* Trek Discovery */}
        <div className="smp-group">
          <div className="smp-group-header"><span className="smp-group-title">Trek Discovery</span></div>
          <div className="smp-group-links">
            <Link href="/treks/best-treks-in-uttarakhand" className="smp-group-link">Best Treks in Uttarakhand</Link>
            <Link href="/treks/best-treks-in-uttarakhand/beginner" className="smp-group-link">Beginner Treks</Link>
            <Link href="/treks/best-treks-in-uttarakhand/snow" className="smp-group-link">Snow Treks</Link>
            <Link href="/treks/best-treks-in-uttarakhand/challenging" className="smp-group-link">Challenging Treks</Link>
            <Link href="/treks/best-treks-in-uttarakhand/high-altitude" className="smp-group-link">High-Altitude Treks</Link>
            <Link href="/treks/garhwal-himalayas" className="smp-group-link">Garhwal Himalaya Treks</Link>
          </div>
        </div>

        {/* Trek Filters */}
        <div className="smp-group">
          <div className="smp-group-header"><span className="smp-group-title">Trek Filters</span></div>
          <div className="smp-group-links">
            <Link href="/treks/beginner-treks-uttarakhand" className="smp-group-link">Beginner Treks in Uttarakhand</Link>
            <Link href="/treks/winter-treks-uttarakhand" className="smp-group-link">Winter Treks (December–February)</Link>
            <Link href="/treks/summer-treks-uttarakhand" className="smp-group-link">Summer Treks (May–June)</Link>
            <Link href="/treks/spring-treks-uttarakhand" className="smp-group-link">Spring Treks (March–May)</Link>
            <Link href="/treks/autumn-treks-uttarakhand" className="smp-group-link">Autumn Treks (September–November)</Link>
            <Link href="/treks/3-day-treks-uttarakhand" className="smp-group-link">3-Day Treks</Link>
            <Link href="/treks/5-day-treks-uttarakhand" className="smp-group-link">5-Day Treks</Link>
            <Link href="/treks/week-long-treks-uttarakhand" className="smp-group-link">Week-Long Treks (6–10 Days)</Link>
            <Link href="/treks/above-4000m-treks-uttarakhand" className="smp-group-link">Treks Above 4,000m</Link>
            <Link href="/treks/low-altitude-treks-uttarakhand" className="smp-group-link">Low-Altitude Treks (Below 3,500m)</Link>
            <Link href="/treks/trek-near-delhi" className="smp-group-link">Treks Near Delhi</Link>
            <Link href="/treks/trek-packages-uttarakhand" className="smp-group-link">Trek Packages in Uttarakhand</Link>
          </div>
        </div>

        {/* Trek Regions */}
        <div className="smp-group">
          <div className="smp-group-header"><span className="smp-group-title">Trek Regions</span></div>
          <div className="smp-group-links">
            <Link href="/treks/location/chakrata" className="smp-group-link">Chakrata Treks</Link>
            <Link href="/treks/location/sankri" className="smp-group-link">Sankri Treks</Link>
            <Link href="/treks/location/joshimath" className="smp-group-link">Joshimath Treks</Link>
            <Link href="/treks/location/lohajung" className="smp-group-link">Lohajung Treks</Link>
            <Link href="/treks/location/munsiyari" className="smp-group-link">Munsiyari Treks</Link>
          </div>
        </div>

        {/* All Treks */}
        <div className="smp-group">
          <div className="smp-group-header"><span className="smp-group-title">All Treks</span></div>
          <div className="smp-group-links">
            <Link href="/treks/location/lohajung/brahmatal-trek" className="smp-group-link">Brahmatal Trek</Link>
            <Link href="/treks/location/joshimath/kuari-pass-trek" className="smp-group-link">Kuari Pass Trek</Link>
            <Link href="/treks/location/lohajung/roopkund-trek" className="smp-group-link">Roopkund Trek</Link>
            <Link href="/treks/location/joshimath/pangarchulla-trek" className="smp-group-link">Pangarchulla Peak Trek</Link>
            <Link href="/treks/location/sankri/kedarkantha-trek" className="smp-group-link">Kedarkantha Trek</Link>
            <Link href="/treks/location/sankri/har-ki-dun-trek" className="smp-group-link">Har Ki Dun Trek</Link>
            <Link href="/treks/location/munsiyari/khaliya-top-trek" className="smp-group-link">Khaliya Top Trek</Link>
            <Link href="/treks/location/munsiyari/milam-glacier-trek" className="smp-group-link">Milam Glacier Trek</Link>
            <Link href="/treks/location/chakrata/tiger-fall-trek" className="smp-group-link">Tiger Fall Trek</Link>
            <Link href="/treks/location/chakrata/budher-caves-trek" className="smp-group-link">Budher Caves Trek</Link>
            <Link href="/treks/location/chakrata/weekend-trek" className="smp-group-link">Chakrata Weekend Trek</Link>
            <Link href="/treks/location/chakrata/guided-treks" className="smp-group-link">Guided Chakrata Treks</Link>
          </div>
        </div>

        {/* Trek Comparisons */}
        <div className="smp-group">
          <div className="smp-group-header"><span className="smp-group-title">Trek Comparisons</span></div>
          <div className="smp-group-links">
            <Link href="/treks/kedarkantha-vs-har-ki-dun" className="smp-group-link">Kedarkantha vs Har Ki Dun</Link>
            <Link href="/treks/brahmatal-vs-kuari-pass" className="smp-group-link">Brahmatal vs Kuari Pass</Link>
            <Link href="/treks/roopkund-vs-pangarchulla" className="smp-group-link">Roopkund vs Pangarchulla</Link>
          </div>
        </div>

        {/* Trekking Guides */}
        <div className="smp-group">
          <div className="smp-group-header"><span className="smp-group-title">Trekking Guides</span></div>
          <div className="smp-group-links">
            <Link href="/treks/garhwal-himalayas/fitness-guide" className="smp-group-link">Garhwal Trek Fitness Guide</Link>
            <Link href="/treks/garhwal-himalayas/packing-checklist" className="smp-group-link">Trek Packing Checklist</Link>
          </div>
        </div>

        {/* Retreats */}
        <div className="smp-group">
          <div className="smp-group-header"><span className="smp-group-title">Retreats</span></div>
          <div className="smp-group-links">
            <Link href="/retreats" className="smp-group-link">All Retreats</Link>
            <Link href="/retreats/himalayan-retreats" className="smp-group-link">Himalayan Retreats</Link>
            <Link href="/retreats/best-retreat-in-uttarakhand" className="smp-group-link">Best Retreat in Uttarakhand</Link>
            <Link href="/retreat-programs" className="smp-group-link">Retreat Programs</Link>
            <Link href="/retreats/winter-himalayan-retreats" className="smp-group-link">Winter Retreats</Link>
            <Link href="/retreats/summer-himalayan-retreats" className="smp-group-link">Summer Retreats</Link>
            <Link href="/retreats/weekend-himalayan-retreats" className="smp-group-link">Weekend Retreats</Link>
          </div>
        </div>

        {/* Retreat Journeys */}
        <div className="smp-group">
          <div className="smp-group-header"><span className="smp-group-title">Retreat Journeys</span></div>
          <div className="smp-group-links">
            <Link href="/retreats/journeys/rest-and-reset" className="smp-group-link">Rest &amp; Reset</Link>
            <Link href="/retreats/journeys/burnout-recovery" className="smp-group-link">Burnout Recovery</Link>
            <Link href="/retreats/journeys/yoga-and-movement" className="smp-group-link">Yoga &amp; Movement</Link>
            <Link href="/retreats/journeys/meditation-and-silence" className="smp-group-link">Meditation &amp; Silence</Link>
            <Link href="/retreats/journeys/art-and-creative" className="smp-group-link">Art &amp; Creative</Link>
            <Link href="/retreats/journeys/sound-healing" className="smp-group-link">Sound Healing</Link>
            <Link href="/retreats/journeys/weekend-retreat" className="smp-group-link">Weekend Retreat</Link>
            <Link href="/retreats/journeys/private-and-custom" className="smp-group-link">Private &amp; Custom</Link>
          </div>
        </div>

        {/* Retreat Locations */}
        <div className="smp-group">
          <div className="smp-group-header"><span className="smp-group-title">Retreat Locations</span></div>
          <div className="smp-group-links">
            <Link href="/retreats/chakrata" className="smp-group-link">Retreats in Chakrata</Link>
            <Link href="/retreats/sankri" className="smp-group-link">Retreats in Sankri</Link>
            <Link href="/retreats/mussoorie" className="smp-group-link">Retreats in Mussoorie</Link>
            <Link href="/retreats/munsiyari" className="smp-group-link">Retreats in Munsiyari</Link>
            <Link href="/retreats/rishikesh" className="smp-group-link">Retreats in Rishikesh</Link>
          </div>
        </div>

        {/* Blog & Company */}
        <div className="smp-group">
          <div className="smp-group-header"><span className="smp-group-title">Blog &amp; Company</span></div>
          <div className="smp-group-links">
            <Link href="/blog" className="smp-group-link">Blog</Link>
            <Link href="/about" className="smp-group-link">About</Link>
            <Link href="/contact" className="smp-group-link">Contact</Link>
          </div>
        </div>

      </div>
    </TrackedPage>
  );
}
