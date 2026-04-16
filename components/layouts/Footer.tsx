import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <>
      <style>{`
        .ft-root {
          background: #0a1f1c;
          margin-top: 3rem;
          font-family: var(--font-geist-sans), 'Geist', sans-serif;
          color: rgba(255,255,255,0.7);
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* ── TOP FOOTER (Brand + CTA) ── */
        .ft-brand {
          padding: 56px 0 48px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .ft-brand-left {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .ft-brand-tagline {
          font-size: 1.05rem;
          font-weight: 300;
          color: rgba(255,255,255,0.6);
          letter-spacing: -0.01em;
          line-height: 1.6;
          max-width: 28rem;
          margin: 0;
        }
        .ft-brand-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .ft-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.75rem;
          background: var(--color-primary);
          color: #ffffff;
          text-decoration: none;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          border-radius: 100px;
          transition: background 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .ft-cta-btn:hover {
          background: rgba(15,118,110,0.85);
          transform: translateY(-1px);
        }
        .ft-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.75rem;
          background: transparent;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.15);
          transition: border-color 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .ft-wa-btn:hover {
          border-color: rgba(255,255,255,0.4);
          color: #ffffff;
        }
        .ft-social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .ft-social-link:hover {
          border-color: rgba(255,255,255,0.4);
          color: #ffffff;
        }

        /* ── GRID (4 columns) ── */
        .ft-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 48px;
          padding: 56px 0;
        }
        @media (max-width: 1023px) {
          .ft-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }
        @media (max-width: 767px) {
          .ft-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .ft-col {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .ft-col h3 {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin: 0 0 16px 0;
        }
        .ft-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .ft-link {
          font-size: 0.85rem;
          font-weight: 400;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          padding: 6px 0;
          display: block;
          transition: color 0.15s;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ft-link:hover {
          color: #ffffff;
        }
        .ft-link--primary {
          color: rgba(255,255,255,0.82);
          font-weight: 500;
        }
        @media (max-width: 767px) {
          .ft-link {
            padding: 8px 0;
            font-size: 0.88rem;
          }
        }

        /* ── TRUST STRIP ── */
        .ft-trust {
          padding: 24px 0;
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          display: flex;
          gap: 2rem;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
        .ft-trust-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          font-weight: 400;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.01em;
          white-space: nowrap;
        }
        .ft-trust-icon {
          width: 14px;
          height: 14px;
          color: var(--color-primary);
          flex-shrink: 0;
        }
        .ft-trust-sep {
          width: 1px;
          height: 14px;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .ft-trust { justify-content: flex-start; gap: 1.25rem; }
          .ft-trust-sep { display: none; }
        }

        /* ── BOTTOM BAR ── */
        .ft-bottom {
          padding: 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.3);
          font-weight: 400;
        }
        .ft-bottom-links {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .ft-bottom a {
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: color 0.15s;
        }
        .ft-bottom a:hover {
          color: rgba(255,255,255,0.7);
        }

        /* ── MOBILE BRAND ── */
        @media (max-width: 767px) {
          .ft-brand {
            flex-direction: column;
            align-items: flex-start;
            padding: 40px 0 36px;
          }
          .ft-brand-right {
            width: 100%;
          }
          .ft-cta-btn, .ft-wa-btn {
            flex: 1;
            justify-content: center;
            min-width: 140px;
          }
        }
      `}</style>

      <footer className="ft-root">
        <div className="footer-container">

          {/* ── TOP: BRAND + CTA ── */}
          <div className="ft-brand">
            <div className="ft-brand-left">
              <Link href="/">
                <Image
                  src="/Images/logo/footlogo1.png"
                  alt="Retreats And Treks"
                  width={200}
                  height={212}
                  style={{ height: '48px', width: 'auto', display: 'block', filter: 'brightness(0) invert(1)', opacity: 0.8 }}
                  quality={75}
                />
              </Link>
              <p className="ft-brand-tagline">Curated Himalayan retreats & treks — designed, not sold.</p>
              <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', fontWeight: 300, color: 'rgba(255,255,255,0.35)', margin: 0, letterSpacing: '0.02em' }}>Explore treks across Uttarakhand, Himachal & beyond.</p>
            </div>
            <div className="ft-brand-right">
              <Link href="/contact" className="ft-cta-btn">Plan Your Journey →</Link>
              <a href="https://wa.me/919760446101?text=Hi%2C%20I%27d%20like%20to%20plan%20a%20trek%20or%20retreat." className="ft-wa-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a href="https://instagram.com/retreatsandtreks" target="_blank" rel="noopener noreferrer" className="ft-social-link" aria-label="Follow us on Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* ── 4-COLUMN GRID ── */}
          <div className="ft-grid">

            {/* COL 1: Treks */}
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

            {/* COL 2: Retreats */}
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

            {/* COL 3: Learn */}
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

            {/* COL 4: Locations */}
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