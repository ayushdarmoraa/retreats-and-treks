import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ borderBottom: '1px solid var(--color-border)' }}>
      <nav
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '1rem',
        }}
      >
        <ul
          style={{
            display: 'flex',
            gap: '1.5rem',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/retreats">Retreats</Link>
          </li>
          <li>
            <Link href="/retreats/best-retreat-in-uttarakhand" prefetch={true}>Best Retreats</Link>
          </li>
          <li>
            <Link href="/retreat-programs">Programs</Link>
          </li>
          {/* Treks mega nav — discovery layer exposed globally */}
          <li style={{ position: 'relative' }} className="treks-dropdown">
            <Link href="/treks" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              Treks <span style={{ fontSize: '0.65rem' }}>▼</span>
            </Link>
            <ul
              className="treks-dropdown-menu"
              style={{
                display: 'none',
                position: 'absolute',
                top: '100%',
                left: 0,
                background: 'var(--color-bg, #fff)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm, 6px)',
                padding: '0.5rem 0',
                margin: '0.25rem 0 0',
                listStyle: 'none',
                minWidth: '220px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                zIndex: 100,
              }}
            >
              <li style={{ padding: '0.4rem 1rem' }}>
                <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>
                  Best Treks in Uttarakhand
                </Link>
              </li>
              <li style={{ padding: '0.4rem 1rem' }}>
                <Link href="/treks/best-treks-in-uttarakhand/beginner" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>
                  Beginner Treks
                </Link>
              </li>
              <li style={{ padding: '0.4rem 1rem' }}>
                <Link href="/treks/best-treks-in-uttarakhand/snow" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>
                  Snow Treks
                </Link>
              </li>
              <li style={{ padding: '0.4rem 1rem' }}>
                <Link href="/treks/best-treks-in-uttarakhand/challenging" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>
                  Challenging Treks
                </Link>
              </li>
              <li style={{ padding: '0.4rem 1rem' }}>
                <Link href="/treks/best-treks-in-uttarakhand/high-altitude" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>
                  High-Altitude Treks
                </Link>
              </li>
            </ul>
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
      </nav>
    </header>
  );
}
