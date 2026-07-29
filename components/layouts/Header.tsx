'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const LOGO_IMAGE = '/Images/logo/retreatsandtreks1-small.webp';

export default function Header() {
  const [retreatOpen, setRetreatOpen] = useState(false);
  const [trekOpen, setTrekOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // ── HOME PAGE CHECK ──
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── DETERMINE HEADER CLASS ──
  const getHeaderClass = () => {
    if (!isHome) return 'hn-header-solid'; // Non-home pages: always solid
    return scrolled ? 'hn-header-solid' : 'hn-header-transparent'; // Home: transparent on top, solid on scroll
  };

  return (
    <>
      <style>{`
        /* ── BASE HEADER ── */
        .hn-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          height: 76px;
          display: flex;
          align-items: center;
          max-width: 100vw;
        }

        .hn-header-transparent {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-bottom: none !important;
          box-shadow: none !important;
        }

        .hn-header-solid {
          background: #0a0f0d !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border-bottom: 1px solid rgba(15, 118, 110, 0.12) !important;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2) !important;
        }

        /* ── NAV LINKS ── */
        .hn-link {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          position: relative;
          padding: 6px 0;
          transition: color 0.3s ease;
          display: inline-flex;
          align-items: center;
        }
        .hn-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #0f766e;
          transition: width 0.3s ease;
          border-radius: 2px;
        }
        .hn-link:hover {
          color: #ffffff;
        }
        .hn-link:hover::after {
          width: 100%;
        }
        .hn-link.active {
          color: #ffffff;
        }
        .hn-link.active::after {
          width: 100%;
        }

        /* ── DROPDOWN ── */
        .hn-drop-link {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          display: block;
          padding: 8px 16px;
          min-height: 36px;
          transition: all 0.2s ease;
          border-left: 2px solid transparent;
          display: flex;
          align-items: center;
        }
        .hn-drop-link:hover {
          color: #ffffff;
          background: rgba(15, 118, 110, 0.08);
          border-left-color: #0f766e;
        }
        .hn-drop-link.gold {
          color: #0f766e;
          font-weight: 500;
        }
        .hn-drop-link.gold:hover {
          color: #ffffff;
        }

        /* ── MOBILE ── */
        .hn-mobile-link {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          display: block;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          min-height: 44px;
        }
        .hn-mobile-link:hover,
        .hn-mobile-link.active {
          color: #ffffff;
          background: rgba(15, 118, 110, 0.06);
        }
        .hn-mobile-sub {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.68rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
          text-decoration: none;
          display: block;
          padding: 10px 20px 10px 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          min-height: 40px;
        }
        .hn-mobile-sub:hover {
          color: #0f766e;
        }
        .hn-mobile-sub.gold {
          color: #0f766e;
        }

        /* ── HAMBURGER ── */
        .hn-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 6px;
          min-width: 44px;
          min-height: 44px;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
        }
        .hn-hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: rgba(255, 255, 255, 0.75);
          transition: all 0.3s ease;
          border-radius: 2px;
        }
        .hn-hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hn-hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hn-hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        @keyframes dropIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hn-logo-link {
          display: block;
          line-height: 0;
          flex-shrink: 0;
        }
        .hn-logo-link img {
          display: block;
        }

        /* ── DESKTOP NAV ── */
        .hn-desktop-nav {
          display: flex;
          gap: 2.2rem;
          list-style: none;
          padding: 0;
          margin: 0;
          align-items: center;
          justify-content: center;
          flex: 1;
        }

        .hn-main-nav {
          max-width: 76rem;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .hn-nav-wrapper {
          display: flex;
          align-items: center;
          flex: 1;
          justify-content: center;
        }

        /* ── CONTACT BUTTON ── */
        .hn-contact-btn {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 8px 20px;
          min-height: 36px;
          display: inline-flex;
          align-items: center;
          border-radius: 6px;
          transition: all 0.3s ease;
          flex-shrink: 0;
          margin-left: 0.5rem;
        }

        /* Transparent state - White */
        .hn-header-transparent .hn-contact-btn {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .hn-header-transparent .hn-contact-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* Solid state - Teal */
        .hn-header-solid .hn-contact-btn {
          background: rgba(15, 118, 110, 0.12);
          color: #0f766e;
          border: 1px solid rgba(15, 118, 110, 0.25);
        }
        .hn-header-solid .hn-contact-btn:hover {
          background: #0f766e;
          color: #ffffff;
          border-color: #0f766e;
        }

        /* ── MOBILE NAV PANEL (positioning hardened) ── */
        .hn-mobile-nav {
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
          width: 100%;
          max-width: 100vw;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .hn-desktop-nav {
            gap: 1.4rem;
          }
          .hn-link {
            font-size: 0.7rem;
            letter-spacing: 0.16em;
          }
          .hn-contact-btn {
            font-size: 0.55rem;
            padding: 6px 16px;
          }
        }

        @media (max-width: 768px) {
          .hn-desktop-nav {
            display: none !important;
          }
          .hn-hamburger {
            display: flex !important;
          }
          .hn-main-nav {
            height: 68px !important;
            padding: 0 1rem !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .hn-logo-link {
            max-width: 160px !important;
            overflow: hidden !important;
            flex: 0 1 auto !important;
          }
          .hn-logo-image {
            height: 50px !important;
            width: auto !important;
            max-width: 160px !important;
            object-fit: contain !important;
            object-position: left center !important;
          }
          .hn-mobile-nav {
            display: block !important;
          }
          .hn-header {
            height: 68px !important;
          }
          .hn-nav-wrapper {
            justify-content: flex-end !important;
          }
          .hn-contact-btn {
            display: none !important;
          }
        }

        @media (min-width: 769px) {
          .hn-mobile-nav {
            display: none !important;
          }
        }

        @media (max-width: 380px) {
          .hn-logo-link {
            max-width: 130px !important;
          }
          .hn-logo-image {
            height: 42px !important;
            max-width: 130px !important;
          }
        }

        /* Prevent any accidental horizontal overflow on small screens */
        @media (max-width: 480px) {
          html, body {
            overflow-x: hidden;
          }
          .hn-main-nav {
            padding: 0 0.85rem !important;
          }
        }
      `}</style>

      <header className={`hn-header ${getHeaderClass()}`}>
        <nav className="hn-main-nav">
          {/* LOGO - LEFT */}
          <Link
            href="/"
            className="hn-logo-link"
            style={{ textDecoration: 'none', flexShrink: 0 }}
            aria-label="Himalayan Retreats - Go to homepage"
          >
            {!logoError ? (
              <Image
                className="hn-logo-image"
                src={LOGO_IMAGE}
                alt="Himalayan Retreats"
                width={68}
                height={72}
                onError={() => setLogoError(true)}
                style={{
                  height: '64px',
                  width: 'auto',
                  display: 'block',
                }}
                priority
                quality={60}
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '1.3rem',
                    fontWeight: 300,
                    letterSpacing: '0.06em',
                    color: '#ece4d0',
                  }}
                >
                  Himalayan <em style={{ fontStyle: 'italic', color: '#0f766e' }}>Retreats</em>
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.45rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'rgba(15,118,110,0.4)',
                    marginTop: '2px',
                  }}
                >
                  Uttarakhand · India
                </span>
              </div>
            )}
          </Link>

          {/* NAV LINKS - CENTER */}
          <div className="hn-nav-wrapper">
            <ul className="hn-desktop-nav">
              <li>
                <Link href="/" className={`hn-link${pathname === '/' ? ' active' : ''}`}>
                  Home
                </Link>
              </li>

              {/* Retreats Dropdown */}
              <li
                style={{ position: 'relative' }}
                onMouseEnter={() => setRetreatOpen(true)}
                onMouseLeave={() => setRetreatOpen(false)}
              >
                <Link
                  href="/retreats"
                  className={`hn-link${pathname.startsWith('/retreats') ? ' active' : ''}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  Retreats
                  <span
                    style={{
                      fontSize: '0.4rem',
                      color: 'rgba(15,118,110,0.4)',
                      transition: 'transform 0.25s ease',
                      display: 'inline-block',
                      transform: retreatOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    ▼
                  </span>
                </Link>

                {retreatOpen && (
                  <ul
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(10,15,13,0.96)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(15,118,110,0.1)',
                      borderTop: '2px solid #0f766e',
                      borderRadius: '10px',
                      padding: '0.4rem 0',
                      margin: 0,
                      listStyle: 'none',
                      minWidth: '220px',
                      boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
                      zIndex: 100,
                      animation: 'dropIn 0.2s ease both',
                    }}
                  >
                    <li
                      style={{
                        padding: '0.2rem 1.4rem 0.5rem',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        marginBottom: '0.2rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-geist-sans), sans-serif',
                          fontSize: '0.48rem',
                          letterSpacing: '0.3em',
                          textTransform: 'uppercase',
                          color: 'rgba(15,118,110,0.35)',
                        }}
                      >
                        Explore Retreats
                      </span>
                    </li>
                    {[
                      { href: '/retreats', label: 'All Retreats', gold: true },
                      { href: '/retreats/journeys/rest-and-reset', label: 'Rest & Reset' },
                      { href: '/retreats/journeys/burnout-recovery', label: 'Burnout Recovery' },
                      { href: '/retreats/journeys/yoga-and-movement', label: 'Yoga & Movement' },
                      { href: '/retreats/journeys/meditation-and-silence', label: 'Meditation & Silence' },
                      { href: '/retreats/journeys/sound-healing', label: 'Sound Healing' },
                      { href: '/retreats/journeys/weekend-retreat', label: 'Weekend Retreat' },
                      { href: '/retreats/journeys/private-and-custom', label: 'Private & Custom' },
                      { href: '/retreats/art', label: 'Art Retreats', gold: true },
                      { href: '/retreats/journeys/art-and-creative', label: 'Creative Healing' },
                      { href: '/retreats/journeys/trek-and-paint', label: 'Trek & Paint' },
                      { href: '/retreats/journeys/weekend-art-retreat', label: 'Weekend Art' },
                    ].map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`hn-drop-link${item.gold ? ' gold' : ''}`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <Link
                  href="/retreats/best-retreat-in-uttarakhand"
                  prefetch={true}
                  className={`hn-link${pathname === '/retreats/best-retreat-in-uttarakhand' ? ' active' : ''}`}
                >
                  Best Retreats
                </Link>
              </li>

              <li>
                <Link
                  href="/retreat-programs"
                  className={`hn-link${pathname.startsWith('/retreat-programs') ? ' active' : ''}`}
                >
                  Programs
                </Link>
              </li>

              {/* Treks Dropdown */}
              <li
                style={{ position: 'relative' }}
                onMouseEnter={() => setTrekOpen(true)}
                onMouseLeave={() => setTrekOpen(false)}
              >
                <Link
                  href="/treks"
                  className={`hn-link${pathname.startsWith('/treks') ? ' active' : ''}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  Treks
                  <span
                    style={{
                      fontSize: '0.4rem',
                      color: 'rgba(15,118,110,0.4)',
                      transition: 'transform 0.25s ease',
                      display: 'inline-block',
                      transform: trekOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    ▼
                  </span>
                </Link>

                {trekOpen && (
                  <ul
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(10,15,13,0.96)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(15,118,110,0.1)',
                      borderTop: '2px solid #0f766e',
                      borderRadius: '10px',
                      padding: '0.4rem 0',
                      margin: 0,
                      listStyle: 'none',
                      minWidth: '220px',
                      boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
                      zIndex: 100,
                      animation: 'dropIn 0.2s ease both',
                    }}
                  >
                    <li
                      style={{
                        padding: '0.2rem 1.4rem 0.5rem',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        marginBottom: '0.2rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-geist-sans), sans-serif',
                          fontSize: '0.48rem',
                          letterSpacing: '0.3em',
                          textTransform: 'uppercase',
                          color: 'rgba(15,118,110,0.35)',
                        }}
                      >
                        Explore Treks
                      </span>
                    </li>
                    {[
                      { href: '/treks/best-treks-in-uttarakhand', label: 'Best Treks', gold: true },
                      { href: '/treks/best-treks-in-uttarakhand/beginner', label: 'Beginner Treks' },
                      { href: '/treks/best-treks-in-uttarakhand/snow', label: 'Snow Treks' },
                      { href: '/treks/best-treks-in-uttarakhand/challenging', label: 'Challenging Treks' },
                      { href: '/treks/best-treks-in-uttarakhand/high-altitude', label: 'High-Altitude' },
                    ].map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`hn-drop-link${item.gold ? ' gold' : ''}`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <Link href="/blog" className={`hn-link${pathname.startsWith('/blog') ? ' active' : ''}`}>
                  Blog
                </Link>
              </li>

              <li>
                <Link href="/about" className={`hn-link${pathname.startsWith('/about') ? ' active' : ''}`}>
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT BUTTON - RIGHT */}
          <Link href="/contact" className="hn-contact-btn">
            Contact
          </Link>

          {/* HAMBURGER */}
          <button
            className={`hn-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>

        {/* MOBILE NAV */}
        {menuOpen && (
          <div
            className="hn-mobile-nav"
            style={{
              background: '#0a0f0d',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(15,118,110,0.08)',
              animation: 'slideDown 0.25s ease both',
              maxHeight: 'calc(100vh - 68px)',
              overflowY: 'auto',
              paddingBottom: '1rem',
            }}
          >
            <Link
              href="/"
              className={`hn-mobile-link${pathname === '/' ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/retreats"
              className={`hn-mobile-link${pathname.startsWith('/retreats') ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Retreats
            </Link>
            <Link href="/retreats/journeys/rest-and-reset" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>
              Rest & Reset
            </Link>
            <Link href="/retreats/journeys/burnout-recovery" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>
              Burnout Recovery
            </Link>
            <Link href="/retreats/journeys/yoga-and-movement" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>
              Yoga & Movement
            </Link>
            <Link href="/retreats/journeys/meditation-and-silence" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>
              Meditation & Silence
            </Link>
            <Link href="/retreats/journeys/sound-healing" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>
              Sound Healing
            </Link>
            <Link href="/retreats/journeys/weekend-retreat" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>
              Weekend Retreat
            </Link>
            <Link href="/retreats/journeys/private-and-custom" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>
              Private & Custom
            </Link>
            <Link href="/retreats/art" className="hn-mobile-sub gold" onClick={() => setMenuOpen(false)}>
              Art Retreats
            </Link>
            <Link href="/retreats/journeys/art-and-creative" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>
              Creative Healing
            </Link>
            <Link href="/retreats/journeys/trek-and-paint" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>
              Trek & Paint
            </Link>
            <Link href="/retreats/journeys/weekend-art-retreat" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>
              Weekend Art
            </Link>

            <Link
              href="/retreats/best-retreat-in-uttarakhand"
              className={`hn-mobile-link${pathname === '/retreats/best-retreat-in-uttarakhand' ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Best Retreats
            </Link>

            <Link
              href="/retreat-programs"
              className={`hn-mobile-link${pathname.startsWith('/retreat-programs') ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Programs
            </Link>

            <Link
              href="/treks"
              className={`hn-mobile-link${pathname.startsWith('/treks') ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Treks
            </Link>
            <Link href="/treks/best-treks-in-uttarakhand" className="hn-mobile-sub gold" onClick={() => setMenuOpen(false)}>
              Best Treks in Uttarakhand
            </Link>
            <Link href="/treks/best-treks-in-uttarakhand/beginner" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>
              Beginner Treks
            </Link>
            <Link href="/treks/best-treks-in-uttarakhand/snow" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>
              Snow Treks
            </Link>
            <Link href="/treks/best-treks-in-uttarakhand/challenging" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>
              Challenging Treks
            </Link>
            <Link href="/treks/best-treks-in-uttarakhand/high-altitude" className="hn-mobile-sub" onClick={() => setMenuOpen(false)}>
              High-Altitude Treks
            </Link>

            <Link
              href="/blog"
              className={`hn-mobile-link${pathname.startsWith('/blog') ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>

            <Link
              href="/about"
              className={`hn-mobile-link${pathname.startsWith('/about') ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>

            <div style={{ padding: '1rem 1.5rem' }}>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '14px',
                  background: '#0f766e',
                  color: '#ffffff',
                  borderRadius: '6px',
                }}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
