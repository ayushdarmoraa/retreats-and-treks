import Link from 'next/link';

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
          padding: '1.5rem 1rem',
        }}
      >
        <p style={{ marginBottom: '0.75rem' }}>
          © {new Date().getFullYear()} Retreats And Treks
        </p>

        {/* Primary navigation */}
        <ul
          style={{
            display: 'flex',
            gap: '1.5rem',
            listStyle: 'none',
            padding: 0,
            margin: '0 0 1rem',
            flexWrap: 'wrap',
          }}
        >
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/retreats/himalayan-retreats">Himalayan Retreats</Link>
          </li>
          <li>
            <Link href="/retreat-programs">All Programs</Link>
          </li>
          <li>
            <Link href="/treks">Treks</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Locations */}
        <ul
          style={{
            display: 'flex',
            gap: '1.5rem',
            listStyle: 'none',
            padding: 0,
            margin: '0 0 1rem',
            flexWrap: 'wrap',
            fontSize: '0.9rem',
          }}
        >
          <li>
            <Link href="/retreats/chakrata">Chakrata</Link>
          </li>
          <li>
            <Link href="/retreats/sankri">Sankri</Link>
          </li>
          <li>
            <Link href="/retreats/munsiyari">Munsiyari</Link>
          </li>
          <li>
            <Link href="/retreats/rishikesh">Rishikesh</Link>
          </li>
        </ul>

        {/* Topics + utility */}
        <ul
          style={{
            display: 'flex',
            gap: '1.5rem',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            flexWrap: 'wrap',
            fontSize: '0.85rem',
            color: 'var(--color-text-secondary)',
          }}
        >
          <li>
            <Link href="/topics/retreat-decision">Retreat Guides</Link>
          </li>
          <li>
            <Link href="/topics/location-authority">Location Guides</Link>
          </li>
          <li>
            <Link href="/topics/trek-decision">Trek Guides</Link>
          </li>
          <li>
            <Link href="/topics/lifestyle">Lifestyle</Link>
          </li>
          <li>
            <Link href="/sitemap.xml">Sitemap</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
