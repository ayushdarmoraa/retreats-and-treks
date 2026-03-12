'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

// ── Logo image path — replace with your actual image path ──
const LOGO_IMAGE = '/Images/logo/headerlogo1.png'; // ya '/images/logo.svg' etc.

export default function Header() {
  const [trekOpen, setTrekOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();

  return (
    <>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        .hn-link {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.72rem;
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
        .hn-link.active { color: #ffffff; }
        .hn-link.active::after { width: 100%; background: var(--color-primary); }

        .hn-drop-link {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.74rem;
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
        .hn-drop-link.gold { color: var(--color-primary); font-weight: 600; }
        .hn-drop-link.gold:hover { color: #ffffff; }

        /* Mobile nav links */
        .hn-mobile-link {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.7); text-decoration: none;
          display: block; padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(15,118,110,0.1);
          transition: color 0.2s, background 0.2s;
        }
        .hn-mobile-link:hover, .hn-mobile-link.active {
          color: #ffffff; background: rgba(15,118,110,0.08);
        }
        .hn-mobile-sub {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.7rem; font-weight: 400;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.4); text-decoration: none;
          display: block; padding: 0.75rem 2.5rem;
          border-bottom: 1px solid rgba(15,118,110,0.07);
          transition: color 0.2s;
        }
        .hn-mobile-sub:hover { color: var(--color-primary); }
        .hn-mobile-sub.gold { color: var(--color-primary); }

        /* Hamburger */
        .hn-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px; cursor: pointer;
          background: none; border: none;
          padding: 4px;
        }
        .hn-hamburger span {
          display: block; width: 22px; height: 1.5px;
          background: rgba(255,255,255,0.7);
          transition: transform 0.3s, opacity 0.3s;
        }
        .hn-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hn-hamburger.open span:nth-child(2) { opacity: 0; }
        .hn-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .hn-desktop-nav { display: none !important; }
          .hn-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hn-mobile-nav { display: none !important; }
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

          {/* ── LOGO ── */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            {!logoError ? (
              <img
                src={LOGO_IMAGE}
                alt="Himalayan Retreats"
                onError={() => setLogoError(true)}
                style={{ height: '60px', width: 'auto', display: 'block' }}
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.6rem',
                  fontWeight: 300,
                  letterSpacing: '0.06em',
                  color: '#ece4d0',
                }}>
                  Himalayan <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>Retreats</em>
                </span>
                <span style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(15,118,110,0.45)',
                  marginTop: '3px',
                }}>
                  Uttarakhand · India
                </span>
              </div>
            )}
          </Link>

          {/* ── DESKTOP NAV ── */}
          <ul className="hn-desktop-nav" style={{
            display: 'flex',
            gap: '2.2rem',
            listStyle: 'none',
            padding: 0, margin: 0,
            alignItems: 'center',
          }}>
            <li><Link href="/" className={`hn-link${pathname === '/' ? ' active' : ''}`}>Home</Link></li>
            <li style={{ position: 'relative' }}
                onMouseEnter={e => { e.currentTarget.classList.add('open'); }}
                onMouseLeave={e => { e.currentTarget.classList.remove('open'); }}
            >
              <Link href="/retreats" className={`hn-link${pathname.startsWith('/retreats') ? ' active' : ''}`}>Retreats
                <span style={{ fontSize: '0.45rem', color: 'rgba(15,118,110,0.6)', marginLeft: 4 }}>
                  ▼
                </span>
              </Link>
              {/* Retreats dropdown */}
              <ul style={{
                display: 'none',
                position: 'absolute',
                top: 'calc(100% + 2px)',
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
              }}
                className="retreats-dropdown"
              >
                <li>
                  <Link href="/retreats/art" className="hn-drop-link">Art Retreats</Link>
                </li>
                <li>
                  <Link href="/retreats/journeys/art-and-creative" className="hn-drop-link">Creative Healing Retreat</Link>
                </li>
                {/* ...add other retreat links here as needed... */}
              </ul>
            </li>
            <li><Link href="/retreats/best-retreat-in-uttarakhand" prefetch={true} className={`hn-link${pathname === '/retreats/best-retreat-in-uttarakhand' ? ' active' : ''}`}>Best Retreats</Link></li>
            <li><Link href="/retreat-programs" className={`hn-link${pathname.startsWith('/retreat-programs') ? ' active' : ''}`}>Programs</Link></li>

            {/* Treks dropdown */}
            <li
              style={{ position: 'relative' }}
              onMouseEnter={() => setTrekOpen(true)}
              onMouseLeave={() => setTrekOpen(false)}
            >
              <Link href="/treks" className={`hn-link${pathname.startsWith('/treks') ? ' active' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                Treks
                <span style={{
                  fontSize: '0.45rem', color: 'rgba(15,118,110,0.6)',
                  transition: 'transform 0.25s', display: 'inline-block',
                  transform: trekOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}>▼</span>
              </Link>

              {trekOpen && (
                <ul style={{
                  position: 'absolute',
                  top: 'calc(100% + 2px)', left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(10,16,10,0.97)',
                  border: '1px solid rgba(15,118,110,0.2)',
                  borderTop: '2px solid rgba(15,118,110,0.6)',
                  borderRadius: '2px',
                  padding: '0.5rem 0', margin: 0, listStyle: 'none',
                  minWidth: '230px',
                  boxShadow: '0 20px 48px rgba(0,0,0,0.45)',
                  zIndex: 100,
                  animation: 'dropIn 0.2s ease both',
                }}>
                  <li style={{ padding: '0.3rem 1.4rem 0.6rem', borderBottom: '1px solid rgba(15,118,110,0.12)', marginBottom: '0.3rem' }}>
                    <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(15,118,110,0.4)' }}>Explore Treks</span>
                  </li>
                  {[
                    { href: '/treks/best-treks-in-uttarakhand', label: 'Best Treks in Uttarakhand', gold: true },
                    { href: '/treks/best-treks-in-uttarakhand/beginner', label: 'Beginner Treks' },
                    { href: '/treks/best-treks-in-uttarakhand/snow', label: 'Snow Treks' },
                    { href: '/treks/best-treks-in-uttarakhand/challenging', label: 'Challenging Treks' },
                    { href: '/treks/best-treks-in-uttarakhand/high-altitude', label: 'High-Altitude Treks' },
                  ].map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} className={`hn-drop-link${item.gold ? ' gold' : ''}`}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li><Link href="/blog" className={`hn-link${pathname.startsWith('/blog') ? ' active' : ''}`}>Blog</Link></li>
            <li><Link href="/about" className={`hn-link${pathname.startsWith('/about') ? ' active' : ''}`}>About</Link></li>
            <li>
              <Link href="/contact" style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.68rem', fontWeight: 700,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                textDecoration: 'none', padding: '9px 22px',
                background: 'rgba(15,118,110,0.12)', color: 'var(--color-primary)',
                border: '1px solid rgba(15,118,110,0.45)', borderRadius: '1px',
                transition: 'background 0.25s, color 0.25s, border-color 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--color-primary)'; el.style.color = '#ffffff'; el.style.borderColor = 'var(--color-primary)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(15,118,110,0.12)'; el.style.color = 'var(--color-primary)'; el.style.borderColor = 'rgba(15,118,110,0.45)'; }}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* ── HAMBURGER ── */}
          <button
            className={`hn-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </nav>

        {/* ── MOBILE NAV ── */}
        {menuOpen && (
          <div className="hn-mobile-nav" style={{
            background: 'rgba(8,14,8,0.98)',
            borderTop: '1px solid rgba(15,118,110,0.15)',
            animation: 'slideDown 0.2s ease both',
            maxHeight: '85vh', overflowY: 'auto',
          }}>
            <Link href="/" className={`hn-mobile-link${pathname === '/' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/retreats" className={`hn-mobile-link${pathname.startsWith('/retreats') ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Retreats</Link>
            <Link href="/retreats/best-retreat-in-uttarakhand" className={`hn-mobile-link${pathname === '/retreats/best-retreat-in-uttarakhand' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Best Retreats</Link>
            <Link href="/retreat-programs" className={`hn-mobile-link${pathname.startsWith('/retreat-programs') ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Programs</Link>
            <Link href="/treks" className={`hn-mobile-link${pathname.startsWith('/treks') ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Treks</Link>
            <Link href="/treks/best-treks-in-uttarakhand" className="hn-mobile-sub gold" onClick={() => setMenuOpen(false)}>Best Treks in Uttarakhand</Link>
            <Link href="/treks/best-treks-in-uttarakhand/beginner" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>Beginner Treks</Link>
            <Link href="/treks/best-treks-in-uttarakhand/snow" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>Snow Treks</Link>
            <Link href="/treks/best-treks-in-uttarakhand/challenging" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>Challenging Treks</Link>
            <Link href="/treks/best-treks-in-uttarakhand/high-altitude" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>High-Altitude Treks</Link>
            <Link href="/blog" className={`hn-mobile-link${pathname.startsWith('/blog') ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>Blog</Link>
            <Link href="/about" className={`hn-mobile-link${pathname.startsWith('/about') ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>About</Link>
            <div style={{ padding: '1rem 1.5rem' }}>
              <Link href="/contact" onClick={() => setMenuOpen(false)} style={{
                display: 'block', textAlign: 'center',
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.68rem', fontWeight: 700,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                textDecoration: 'none', padding: '12px',
                background: 'var(--color-primary)', color: '#ffffff',
                borderRadius: '2px',
              }}>Contact</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}