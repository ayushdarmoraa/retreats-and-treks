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
          }}
        >
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/retreats">Retreats</Link>
          </li>
          <li>
            <Link href="/retreat-programs">Programs</Link>
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
      </nav>
    </header>
  );
}
