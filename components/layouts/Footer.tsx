// components/layouts/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <>
      <style>{`
        .ft-root {
          background: #0a0f0d;
          border-top: 1px solid rgba(15, 118, 110, 0.06);
          font-family: var(--font-geist-sans), 'Geist', sans-serif;
          color: rgba(255, 255, 255, 0.7);
          position: relative;
          overflow: hidden;
        }

        .ft-root::before {
          content: '';
          position: absolute;
          top: -30%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(15, 118, 110, 0.04), transparent 70%);
          pointer-events: none;
        }

        .ft-root::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(15, 118, 110, 0.06), transparent);
          pointer-events: none;
        }

        .footer-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }

        .ft-brand {
          padding: 4.5rem 0 3.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .ft-brand-left {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .ft-logo {
          display: block;
          height: 44px;
          width: auto;
          filter: brightness(0) invert(1);
          opacity: 0.85;
          transition: opacity 0.3s ease;
        }
        .ft-logo:hover {
          opacity: 1;
        }

        .ft-brand-tagline {
          font-size: 1.05rem;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.01em;
          line-height: 1.7;
          max-width: 28rem;
          margin: 0;
        }

        .ft-brand-sub {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.78rem;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.3);
          margin: 0;
          letter-spacing: 0.04em;
        }

        .ft-brand-right {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        .ft-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.8rem 2rem;
          background: #0f766e;
          color: #ffffff;
          text-decoration: none;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-radius: 100px;
          transition: all 0.3s ease;
          white-space: nowrap;
          border: 1px solid #0f766e;
        }
        .ft-cta-btn:hover {
          background: #0d6b64;
          border-color: #0d6b64;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(15, 118, 110, 0.15);
        }

        .ft-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.8rem;
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .ft-wa-btn:hover {
          border-color: rgba(15, 118, 110, 0.3);
          color: #ffffff;
          background: rgba(15, 118, 110, 0.08);
          transform: translateY(-2px);
        }

        /* ── SOCIAL ICONS ── */
        .ft-social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        /* Instagram hover - gradient */
        .ft-social-link.instagram:hover {
          background: radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
          border-color: transparent;
          color: #ffffff;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 24px rgba(214, 41, 118, 0.3);
        }

        /* WhatsApp hover - green */
        .ft-social-link.whatsapp:hover {
          background: #25D366;
          border-color: #25D366;
          color: #ffffff;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.3);
        }

        .ft-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3.5rem;
          padding: 4rem 0 3.5rem;
        }

        @media (max-width: 1024px) {
          .ft-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .ft-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .ft-col h3 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          margin: 0 0 1.2rem 0;
          position: relative;
          display: inline-block;
        }
        .ft-col h3::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 24px;
          height: 1.5px;
          background: #0f766e;
          opacity: 0.3;
          border-radius: 2px;
        }

        .ft-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .ft-link {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.45);
          text-decoration: none;
          padding: 4px 0;
          display: block;
          transition: all 0.3s ease;
        }
        .ft-link:hover {
          color: rgba(255, 255, 255, 0.85);
          transform: translateX(4px);
        }
        .ft-link--primary {
          color: rgba(255, 255, 255, 0.65);
          font-weight: 500;
        }
        .ft-link--primary:hover {
          color: #ffffff;
        }

        .ft-trust {
          padding: 2.5rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          display: flex;
          gap: 3rem;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }

        .ft-trust-item {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 0.01em;
          transition: all 0.3s ease;
        }
        .ft-trust-item:hover {
          color: rgba(255, 255, 255, 0.75);
        }

        .ft-trust-icon {
          width: 16px;
          height: 16px;
          color: #0f766e;
          flex-shrink: 0;
          opacity: 0.25;
        }
        .ft-trust-item:hover .ft-trust-icon {
          opacity: 0.5;
        }

        .ft-trust-sep {
          width: 1px;
          height: 20px;
          background: rgba(255, 255, 255, 0.04);
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .ft-trust {
            justify-content: flex-start;
            gap: 1.2rem;
          }
          .ft-trust-sep {
            display: none;
          }
        }

        .ft-bottom {
          padding: 2rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.2);
          font-weight: 400;
        }

        .ft-bottom-links {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .ft-bottom a {
          color: rgba(255, 255, 255, 0.2);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .ft-bottom a:hover {
          color: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 900px) {
          .footer-container {
            padding: 0 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 0 1.5rem;
          }
          .ft-brand {
            flex-direction: column;
            align-items: flex-start;
            padding: 3rem 0 2rem;
          }
          .ft-brand-right {
            width: 100%;
          }
          .ft-cta-btn,
          .ft-wa-btn {
            flex: 1;
            justify-content: center;
            min-width: 140px;
          }
          .ft-trust {
            justify-content: flex-start;
          }
          .ft-bottom {
            flex-direction: column;
            text-align: center;
          }
          .ft-bottom-links {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 0 1.2rem;
          }
          .ft-brand {
            padding: 2rem 0 1.5rem;
          }
          .ft-brand-tagline {
            font-size: 0.9rem;
          }
          .ft-cta-btn,
          .ft-wa-btn {
            font-size: 0.6rem;
            padding: 0.6rem 1.2rem;
            min-width: 120px;
          }
          .ft-grid {
            padding: 2rem 0;
            gap: 1.5rem;
          }
          .ft-trust-item {
            font-size: 0.7rem;
          }
          .ft-bottom {
            font-size: 0.7rem;
          }
          .ft-logo {
            height: 36px;
          }
        }
      `}</style>

      <footer className="ft-root">
        <div className="footer-container">

          <div className="ft-brand">
            <div className="ft-brand-left">
              <Link href="/">
                <Image
                  src="/Images/logo/footlogo1.png"
                  alt="Retreats And Treks"
                  width={200}
                  height={212}
                  className="ft-logo"
                  quality={75}
                />
              </Link>
              <p className="ft-brand-tagline">Curated Himalayan retreats & treks — designed, not sold.</p>
              <p className="ft-brand-sub">Explore treks across Uttarakhand, Himachal &amp; beyond.</p>
            </div>
            <div className="ft-brand-right">
              <Link href="/contact" className="ft-cta-btn">
                Plan Your Journey →
              </Link>
              <a
                href="https://wa.me/919760446101?text=Hi%2C%20I%27d%20like%20to%20plan%20a%20trek%20or%20retreat."
                className="ft-wa-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a
                href="https://instagram.com/retreatsandtreks"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-social-link instagram"
                aria-label="Follow us on Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── 4-COLUMN GRID ── */}
          <div className="ft-grid">
            <div className="ft-col">
              <h3>Treks</h3>
              <ul className="ft-list">
                <li><Link href="/treks/location/lohajung/brahmatal-trek" className="ft-link ft-link--primary">Brahmatal Trek</Link></li>
                <li><Link href="/treks/location/sankri/kedarkantha-trek" className="ft-link">Kedarkantha Trek</Link></li>
                <li><Link href="/treks/location/joshimath/kuari-pass-trek" className="ft-link">Kuari Pass Trek</Link></li>
                <li><Link href="/treks/location/sankri/har-ki-dun-trek" className="ft-link">Har Ki Dun Trek</Link></li>
                <li><Link href="/treks/best-treks-in-uttarakhand" className="ft-link">Treks in Uttarakhand</Link></li>
                <li><Link href="/treks" className="ft-link">All Himalayan Treks →</Link></li>
              </ul>
            </div>

            <div className="ft-col">
              <h3>Retreats</h3>
              <ul className="ft-list">
                <li><Link href="/retreats/himalayan-retreats" className="ft-link ft-link--primary">Himalayan Retreats in India</Link></li>
                <li><Link href="/retreats/chakrata" className="ft-link">Chakrata Retreats</Link></li>
                <li><Link href="/retreats/sankri" className="ft-link">Sankri Retreats</Link></li>
                <li><Link href="/retreats/rishikesh" className="ft-link">Rishikesh Retreats</Link></li>
                <li><Link href="/retreats" className="ft-link">All Retreats →</Link></li>
              </ul>
            </div>

            <div className="ft-col">
              <h3>Learn</h3>
              <ul className="ft-list">
                <li><Link href="/treks/best-treks-in-uttarakhand" className="ft-link ft-link--primary">Trekking Guides in India</Link></li>
                <li><Link href="/treks/brahmatal-vs-kuari-pass" className="ft-link">Trek Comparisons</Link></li>
                <li><Link href="/treks/garhwal-himalayas/fitness-guide" className="ft-link">Trek Fitness Guide</Link></li>
                <li><Link href="/treks/garhwal-himalayas/packing-checklist" className="ft-link">Packing Checklist</Link></li>
                <li><Link href="/blog" className="ft-link">Blog →</Link></li>
              </ul>
            </div>

            <div className="ft-col">
              <h3>Locations</h3>
              <ul className="ft-list">
                <li><Link href="/treks/best-treks-in-uttarakhand" className="ft-link ft-link--primary">Uttarakhand Treks</Link></li>
                <li><Link href="/treks/location/sankri" className="ft-link">Sankri Treks</Link></li>
                <li><Link href="/treks/location/lohajung" className="ft-link">Lohajung Treks</Link></li>
                <li><Link href="/treks/location/joshimath" className="ft-link">Joshimath Treks</Link></li>
                <li><Link href="/treks/trek-near-delhi" className="ft-link">Treks from Delhi</Link></li>
                <li><Link href="/locations" className="ft-link">All Locations →</Link></li>
              </ul>
            </div>
          </div>

          {/* ── TRUST STRIP ── */}
          <div className="ft-trust">
            <span className="ft-trust-item">
              <svg className="ft-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              Uttarakhand-based operations
            </span>
            <span className="ft-trust-sep" />
            <span className="ft-trust-item">
              <svg className="ft-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              Experienced trek leaders
            </span>
            <span className="ft-trust-sep" />
            <span className="ft-trust-item">
              <svg className="ft-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Small group experiences
            </span>
            <span className="ft-trust-sep" />
            <span className="ft-trust-item">
              <svg className="ft-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Custom itinerary support
            </span>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="ft-bottom">
            <span>© {new Date().getFullYear()} Retreats And Treks</span>
            <div className="ft-bottom-links">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/site-map">Site Map</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}