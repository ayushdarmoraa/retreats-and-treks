'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [trekOpen, setTrekOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        .hn-link {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          position: relative;
          transition: color 0.25s;
          padding-bottom: 2px;
        }
        .hn-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: var(--color-primary);
          transition: width 0.3s ease;
        }
        .hn-link:hover { color: #fff; }
        .hn-link:hover::after { width: 100%; }

        .hn-link.active {
          color: #ffffff;
        }
        .hn-link.active::after {
          width: 100%;
          background: var(--color-primary);
        }

        .hn-drop-link {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          display: block;
          padding: 0.55rem 1.4rem;
          transition: color 0.2s, background 0.2s;
          border-left: 2px solid transparent;
        }
        .hn-drop-link:hover {
          color: #ffffff;
          background: rgba(15,118,110,0.12);
          border-left-color: var(--color-primary);
        }
        .hn-drop-link.gold {
          color: var(--color-primary);
          font-weight: 600;
        }
        .hn-drop-link.gold:hover { color: #ffffff; }

        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 200,
        background: 'rgba(8,14,8,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(15,118,110,0.18)',
      }}>
        <nav style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 2rem',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 300,
                letterSpacing: '0.06em',
                color: '#ece4d0',
              }}>
                Himalayan <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>Retreats</em>
              </span>
              <span style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.58rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(15,118,110,0.45)',
                marginTop: '3px',
              }}>
                Uttarakhand · India
              </span>
            </div>
          </Link>

          {/* Nav */}
          <ul style={{
            display: 'flex',
            gap: '2.2rem',
            listStyle: 'none',
            padding: 0, margin: 0,
            alignItems: 'center',
          }}>
            <li>
              <Link href="/" className={`hn-link${pathname === '/' ? ' active' : ''}`}>Home</Link>
            </li>
            <li>
              <Link href="/retreats" className={`hn-link${pathname.startsWith('/retreats') ? ' active' : ''}`}>Retreats</Link>
            </li>
            <li>
              <Link href="/retreats/best-retreat-in-uttarakhand" prefetch={true} className={`hn-link${pathname === '/retreats/best-retreat-in-uttarakhand' ? ' active' : ''}`}>Best Retreats</Link>
            </li>
            <li>
              <Link href="/retreat-programs" className={`hn-link${pathname.startsWith('/retreat-programs') ? ' active' : ''}`}>Programs</Link>
            </li>

            {/* Treks dropdown */}
            <li
              style={{ position: 'relative' }}
              className="treks-dropdown"
              onMouseEnter={() => setTrekOpen(true)}
              onMouseLeave={() => setTrekOpen(false)}
            >
              <Link href="/treks" className={`hn-link${pathname.startsWith('/treks') ? ' active' : ''}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              }}>
                Treks
                <span style={{
                  fontSize: '0.45rem',
                  color: 'rgba(15,118,110,0.6)',
                  transition: 'transform 0.25s',
                  display: 'inline-block',
                  transform: trekOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}>▼</span>
              </Link>

              {trekOpen && (
                <ul style={{
                  position: 'absolute',
                  top: 'calc(100% + 16px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(10,16,10,0.97)',
                  border: '1px solid rgba(15,118,110,0.2)',
                  borderTop: '2px solid rgba(15,118,110,0.6)',
                  borderRadius: '2px',
                  padding: '0.5rem 0',
                  margin: 0,
                  listStyle: 'none',
                  minWidth: '230px',
                  boxShadow: '0 20px 48px rgba(0,0,0,0.45)',
                  zIndex: 100,
                  animation: 'dropIn 0.2s ease both',
                }}>
                  <li style={{
                    padding: '0.3rem 1.4rem 0.6rem',
                    borderBottom: '1px solid rgba(15,118,110,0.12)',
                    marginBottom: '0.3rem',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '0.58rem',
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: 'rgba(15,118,110,0.4)',
                    }}>Explore Treks</span>
                  </li>
                  {[
                    { href: '/treks/best-treks-in-uttarakhand', label: 'Best Treks in Uttarakhand', gold: true },
                    { href: '/treks/best-treks-in-uttarakhand/beginner', label: 'Beginner Treks' },
                    { href: '/treks/best-treks-in-uttarakhand/snow', label: 'Snow Treks' },
                    { href: '/treks/best-treks-in-uttarakhand/challenging', label: 'Challenging Treks' },
                    { href: '/treks/best-treks-in-uttarakhand/high-altitude', label: 'High-Altitude Treks' },
                  ].map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} className={`hn-drop-link${item.gold ? ' gold' : ''}`}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <Link href="/blog" className={`hn-link${pathname.startsWith('/blog') ? ' active' : ''}`}>Blog</Link>
            </li>
            <li>
              <Link href="/about" className={`hn-link${pathname.startsWith('/about') ? ' active' : ''}`}>About</Link>
            </li>

            <li>
              <Link href="/contact" style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '9px 22px',
                background: 'rgba(15,118,110,0.12)',
                color: 'var(--color-primary)',
                border: '1px solid rgba(15,118,110,0.45)',
                borderRadius: '1px',
                transition: 'background 0.25s, color 0.25s, border-color 0.25s',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'var(--color-primary)';
                  el.style.color = '#ffffff';
                  el.style.borderColor = 'var(--color-primary)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'rgba(15,118,110,0.12)';
                  el.style.color = 'var(--color-primary)';
                  el.style.borderColor = 'rgba(15,118,110,0.45)';
                }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}