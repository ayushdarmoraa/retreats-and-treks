import Link from 'next/link';

const footerLinkStyle = { textDecoration: 'none' } as const;
const footerHeadingStyle = { fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' } as const;
const footerColStyle = { minWidth: '180px', flex: '1 1 180px' } as const;

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        marginTop: '3rem',
      }}
    >
      <nav
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '2rem 1rem 1.5rem',
        }}
      >
        {/* ── FOOTER GRID ──────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem 3rem',
            marginBottom: '1.5rem',
          }}
        >
          {/* Column 1: Popular Treks */}
          <div style={footerColStyle}>
            <p style={footerHeadingStyle}>Popular Treks</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2, fontSize: '0.85rem' }}>
              <li><Link href="/treks/location/lohajung/brahmatal-trek" style={footerLinkStyle}>Brahmatal Trek</Link></li>
              <li><Link href="/treks/location/joshimath/kuari-pass-trek" style={footerLinkStyle}>Kuari Pass Trek</Link></li>
              <li><Link href="/treks/location/lohajung/roopkund-trek" style={footerLinkStyle}>Roopkund Trek</Link></li>
              <li><Link href="/treks/location/joshimath/pangarchulla-trek" style={footerLinkStyle}>Pangarchulla Trek</Link></li>
              <li><Link href="/treks/location/sankri/kedarkantha-trek" style={footerLinkStyle}>Kedarkantha Trek</Link></li>
              <li><Link href="/treks/location/sankri/har-ki-dun-trek" style={footerLinkStyle}>Har Ki Dun Trek</Link></li>
            </ul>
          </div>

          {/* Column 2: Garhwal Himalaya Treks */}
          <div style={footerColStyle}>
            <p style={footerHeadingStyle}>Garhwal Himalaya Treks</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2, fontSize: '0.85rem' }}>
              <li><Link href="/treks/garhwal-himalayas" style={footerLinkStyle}>Garhwal Trek Guide</Link></li>
              <li><Link href="/treks/location/lohajung/brahmatal-trek" style={footerLinkStyle}>Brahmatal Trek</Link></li>
              <li><Link href="/treks/location/joshimath/kuari-pass-trek" style={footerLinkStyle}>Kuari Pass Trek</Link></li>
              <li><Link href="/treks/location/lohajung/roopkund-trek" style={footerLinkStyle}>Roopkund Trek</Link></li>
              <li><Link href="/treks/location/joshimath/pangarchulla-trek" style={footerLinkStyle}>Pangarchulla Peak Trek</Link></li>
              <li><Link href="/treks/location/lohajung" style={footerLinkStyle}>Treks in Lohajung</Link></li>
              <li><Link href="/treks/location/joshimath" style={footerLinkStyle}>Treks in Joshimath</Link></li>
            </ul>
          </div>

          {/* Column 3: Trekking Guides */}
          <div style={footerColStyle}>
            <p style={footerHeadingStyle}>Trekking Guides</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2, fontSize: '0.85rem' }}>
              <li><Link href="/treks/best-treks-in-uttarakhand" style={footerLinkStyle}>Best Treks in Uttarakhand</Link></li>
              <li><Link href="/treks/best-treks-in-uttarakhand/beginner" style={footerLinkStyle}>Beginner Treks</Link></li>
              <li><Link href="/treks/best-treks-in-uttarakhand/snow" style={footerLinkStyle}>Snow Treks</Link></li>
              <li><Link href="/treks/best-treks-in-uttarakhand/high-altitude" style={footerLinkStyle}>High-Altitude Treks</Link></li>
              <li><Link href="/treks/garhwal-himalayas/fitness-guide" style={footerLinkStyle}>Trek Fitness Guide</Link></li>
            </ul>
          </div>

          {/* Column 3: Trek Comparisons */}
          <div style={footerColStyle}>
            <p style={footerHeadingStyle}>Trek Comparisons</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2, fontSize: '0.85rem' }}>
              <li><Link href="/treks/brahmatal-vs-kuari-pass" style={footerLinkStyle}>Brahmatal vs Kuari Pass</Link></li>
              <li><Link href="/treks/roopkund-vs-pangarchulla" style={footerLinkStyle}>Roopkund vs Pangarchulla</Link></li>
              <li><Link href="/treks/kedarkantha-vs-har-ki-dun" style={footerLinkStyle}>Kedarkantha vs Har Ki Dun</Link></li>
            </ul>
          </div>

          {/* Column 4: Retreats & Company */}
          <div style={footerColStyle}>
            <p style={footerHeadingStyle}>Retreats</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2, fontSize: '0.85rem' }}>
              <li><Link href="/retreats/himalayan-retreats" style={footerLinkStyle}>Himalayan Retreats</Link></li>
              <li><Link href="/retreats/chakrata" style={footerLinkStyle}>Chakrata</Link></li>
              <li><Link href="/retreats/sankri" style={footerLinkStyle}>Sankri</Link></li>
              <li><Link href="/retreats/rishikesh" style={footerLinkStyle}>Rishikesh</Link></li>
              <li><Link href="/retreat-programs" style={footerLinkStyle}>All Programs</Link></li>
            </ul>
          </div>
        </div>

        {/* ── BOTTOM BAR ───────────────────────────────────────────── */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '1rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            alignItems: 'center',
            fontSize: '0.85rem',
            color: 'var(--color-text-secondary)',
          }}
        >
          <span>© {new Date().getFullYear()} Retreats And Treks</span>
          <Link href="/blog" style={footerLinkStyle}>Blog</Link>
          <Link href="/about" style={footerLinkStyle}>About</Link>
          <Link href="/contact" style={footerLinkStyle}>Contact</Link>
          <Link href="/site-map" style={footerLinkStyle}>Site Map</Link>
          <Link href="/sitemap.xml" style={footerLinkStyle}>Sitemap</Link>
        </div>
      </nav>
    </footer>
  );
}
