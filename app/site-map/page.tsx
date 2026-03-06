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
      style={{
        maxWidth: '56rem',
        margin: '0 auto',
        padding: 'var(--space-lg) var(--space-md)',
      }}
    >
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Site Map' },
        ]}
      />

      <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: 'var(--space-lg)' }}>
        Site Map
      </h1>

      {/* ── Discovery Hubs ────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Trek Discovery</h2>
        <ul style={listStyle}>
          <li><Link href="/treks/best-treks-in-uttarakhand" style={linkStyle}>Best Treks in Uttarakhand</Link></li>
          <li><Link href="/treks/best-treks-in-uttarakhand/beginner" style={linkStyle}>Beginner Treks</Link></li>
          <li><Link href="/treks/best-treks-in-uttarakhand/snow" style={linkStyle}>Snow Treks</Link></li>
          <li><Link href="/treks/best-treks-in-uttarakhand/challenging" style={linkStyle}>Challenging Treks</Link></li>
          <li><Link href="/treks/best-treks-in-uttarakhand/high-altitude" style={linkStyle}>High-Altitude Treks</Link></li>
          <li><Link href="/treks/garhwal-himalayas" style={linkStyle}>Garhwal Himalaya Treks</Link></li>
        </ul>
      </section>

      {/* ── Filter & Attribute Pages ─────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Trek Filters</h2>
        <ul style={listStyle}>
          <li><Link href="/treks/beginner-treks-uttarakhand" style={linkStyle}>Beginner Treks in Uttarakhand</Link></li>
          <li><Link href="/treks/winter-treks-uttarakhand" style={linkStyle}>Winter Treks (December–February)</Link></li>
          <li><Link href="/treks/summer-treks-uttarakhand" style={linkStyle}>Summer Treks (May–June)</Link></li>
          <li><Link href="/treks/spring-treks-uttarakhand" style={linkStyle}>Spring Treks (March–May)</Link></li>
          <li><Link href="/treks/autumn-treks-uttarakhand" style={linkStyle}>Autumn Treks (September–November)</Link></li>
          <li><Link href="/treks/3-day-treks-uttarakhand" style={linkStyle}>3-Day Treks</Link></li>
          <li><Link href="/treks/5-day-treks-uttarakhand" style={linkStyle}>5-Day Treks</Link></li>
          <li><Link href="/treks/week-long-treks-uttarakhand" style={linkStyle}>Week-Long Treks (6–10 Days)</Link></li>
          <li><Link href="/treks/above-4000m-treks-uttarakhand" style={linkStyle}>Treks Above 4,000m</Link></li>
          <li><Link href="/treks/low-altitude-treks-uttarakhand" style={linkStyle}>Low-Altitude Treks (Below 3,500m)</Link></li>
          <li><Link href="/treks/trek-near-delhi" style={linkStyle}>Treks Near Delhi</Link></li>
          <li><Link href="/treks/trek-packages-uttarakhand" style={linkStyle}>Trek Packages in Uttarakhand</Link></li>
        </ul>
      </section>

      {/* ── Trek Regions ──────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Trek Regions</h2>
        <ul style={listStyle}>
          <li><Link href="/treks/location/chakrata" style={linkStyle}>Chakrata Treks</Link></li>
          <li><Link href="/treks/location/sankri" style={linkStyle}>Sankri Treks</Link></li>
          <li><Link href="/treks/location/joshimath" style={linkStyle}>Joshimath Treks</Link></li>
          <li><Link href="/treks/location/lohajung" style={linkStyle}>Lohajung Treks</Link></li>
          <li><Link href="/treks/location/munsiyari" style={linkStyle}>Munsiyari Treks</Link></li>
        </ul>
      </section>

      {/* ── Trek Detail Pages ─────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>All Treks</h2>
        <ul style={listStyle}>
          <li><Link href="/treks/location/lohajung/brahmatal-trek" style={linkStyle}>Brahmatal Trek</Link></li>
          <li><Link href="/treks/location/joshimath/kuari-pass-trek" style={linkStyle}>Kuari Pass Trek</Link></li>
          <li><Link href="/treks/location/lohajung/roopkund-trek" style={linkStyle}>Roopkund Trek</Link></li>
          <li><Link href="/treks/location/joshimath/pangarchulla-trek" style={linkStyle}>Pangarchulla Peak Trek</Link></li>
          <li><Link href="/treks/location/sankri/kedarkantha-trek" style={linkStyle}>Kedarkantha Trek</Link></li>
          <li><Link href="/treks/location/sankri/har-ki-dun-trek" style={linkStyle}>Har Ki Dun Trek</Link></li>
          <li><Link href="/treks/location/munsiyari/khaliya-top-trek" style={linkStyle}>Khaliya Top Trek</Link></li>
          <li><Link href="/treks/location/munsiyari/milam-glacier-trek" style={linkStyle}>Milam Glacier Trek</Link></li>
          <li><Link href="/treks/location/chakrata/tiger-fall-trek" style={linkStyle}>Tiger Fall Trek</Link></li>
          <li><Link href="/treks/location/chakrata/budher-caves-trek" style={linkStyle}>Budher Caves Trek</Link></li>
          <li><Link href="/treks/location/chakrata/weekend-trek" style={linkStyle}>Chakrata Weekend Trek</Link></li>
          <li><Link href="/treks/location/chakrata/guided-treks" style={linkStyle}>Guided Chakrata Treks</Link></li>
        </ul>
      </section>

      {/* ── Comparisons ───────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Trek Comparisons</h2>
        <ul style={listStyle}>
          <li><Link href="/treks/kedarkantha-vs-har-ki-dun" style={linkStyle}>Kedarkantha vs Har Ki Dun</Link></li>
          <li><Link href="/treks/brahmatal-vs-kuari-pass" style={linkStyle}>Brahmatal vs Kuari Pass</Link></li>
          <li><Link href="/treks/roopkund-vs-pangarchulla" style={linkStyle}>Roopkund vs Pangarchulla</Link></li>
        </ul>
      </section>

      {/* ── Guides ────────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Trekking Guides</h2>
        <ul style={listStyle}>
          <li><Link href="/treks/garhwal-himalayas/fitness-guide" style={linkStyle}>Garhwal Trek Fitness Guide</Link></li>
          <li><Link href="/treks/garhwal-himalayas/packing-checklist" style={linkStyle}>Trek Packing Checklist</Link></li>
        </ul>
      </section>

      {/* ── Retreats ──────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Retreats</h2>
        <ul style={listStyle}>
          <li><Link href="/retreats" style={linkStyle}>All Retreats</Link></li>
          <li><Link href="/retreats/himalayan-retreats" style={linkStyle}>Himalayan Retreats</Link></li>
          <li><Link href="/retreats/best-retreat-in-uttarakhand" style={linkStyle}>Best Retreat in Uttarakhand</Link></li>
          <li><Link href="/retreat-programs" style={linkStyle}>Retreat Programs</Link></li>
          <li><Link href="/retreats/winter-himalayan-retreats" style={linkStyle}>Winter Retreats</Link></li>
          <li><Link href="/retreats/summer-himalayan-retreats" style={linkStyle}>Summer Retreats</Link></li>
          <li><Link href="/retreats/weekend-himalayan-retreats" style={linkStyle}>Weekend Retreats</Link></li>
        </ul>
      </section>

      {/* ── Retreat Journeys ──────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Retreat Journeys</h2>
        <ul style={listStyle}>
          <li><Link href="/retreats/journeys/rest-and-reset" style={linkStyle}>Rest &amp; Reset</Link></li>
          <li><Link href="/retreats/journeys/burnout-recovery" style={linkStyle}>Burnout Recovery</Link></li>
          <li><Link href="/retreats/journeys/yoga-and-movement" style={linkStyle}>Yoga &amp; Movement</Link></li>
          <li><Link href="/retreats/journeys/meditation-and-silence" style={linkStyle}>Meditation &amp; Silence</Link></li>
          <li><Link href="/retreats/journeys/art-and-creative" style={linkStyle}>Art &amp; Creative</Link></li>
          <li><Link href="/retreats/journeys/sound-healing" style={linkStyle}>Sound Healing</Link></li>
          <li><Link href="/retreats/journeys/weekend-retreat" style={linkStyle}>Weekend Retreat</Link></li>
          <li><Link href="/retreats/journeys/private-and-custom" style={linkStyle}>Private &amp; Custom</Link></li>
        </ul>
      </section>

      {/* ── Retreat Locations ─────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Retreat Locations</h2>
        <ul style={listStyle}>
          <li><Link href="/retreats/chakrata" style={linkStyle}>Retreats in Chakrata</Link></li>
          <li><Link href="/retreats/sankri" style={linkStyle}>Retreats in Sankri</Link></li>
          <li><Link href="/retreats/mussoorie" style={linkStyle}>Retreats in Mussoorie</Link></li>
          <li><Link href="/retreats/munsiyari" style={linkStyle}>Retreats in Munsiyari</Link></li>
          <li><Link href="/retreats/rishikesh" style={linkStyle}>Retreats in Rishikesh</Link></li>
        </ul>
      </section>

      {/* ── Blog & About ──────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Blog &amp; Company</h2>
        <ul style={listStyle}>
          <li><Link href="/blog" style={linkStyle}>Blog</Link></li>
          <li><Link href="/about" style={linkStyle}>About</Link></li>
          <li><Link href="/contact" style={linkStyle}>Contact</Link></li>
        </ul>
      </section>
    </TrackedPage>
  );
}
