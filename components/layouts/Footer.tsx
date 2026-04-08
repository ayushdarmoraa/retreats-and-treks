import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <>
      <style>{`
        .ft-root {
          background: #f7f9f7;
          border-top: 2px solid var(--color-border);
          margin-top: 3rem;
          font-family: var(--font-geist-sans), 'Geist', sans-serif;
        }
        .ft-nav {
          max-width: 72rem;
          margin: 0 auto;
          padding: 3rem 1.5rem 2rem;
        }
        .ft-logo-row {
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--color-border);
        }
        .ft-logo-placeholder {
          width: 140px;
          height: 38px;
          border: 1.5px dashed var(--color-border);
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #444444;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-family: var(--font-geist-sans), 'Geist', sans-serif;
          text-decoration: none;
        }
        .ft-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem 3rem;
          margin-bottom: 2.5rem;
        }
        .ft-col {
          min-width: 165px;
          flex: 1 1 165px;
        }
        .ft-col-heading {
          font-family: var(--font-geist-sans), 'Geist', sans-serif;
          font-weight: 600;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin: 0 0 0.85rem 0;
        }
        .ft-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .ft-link {
          text-decoration: none;
          color: #444444;
          font-size: 0.85rem;
          font-family: var(--font-geist-sans), 'Geist', sans-serif;
          font-weight: 400;
          line-height: 2.1;
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          min-width: 44px;
          padding: 8px;
          transition: color 0.18s ease;
        }
        .ft-link:hover {
          color: var(--color-primary);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .ft-bottom {
          border-top: 1px solid var(--color-border);
          padding-top: 1.25rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          align-items: center;
          font-size: 0.78rem;
          color: #666666;
          font-family: var(--font-geist-sans), 'Geist', sans-serif;
          font-weight: 400;
        }
        .ft-bottom-link {
          text-decoration: none;
          color: #666666;
          font-size: 0.78rem;
          font-family: var(--font-geist-sans), 'Geist', sans-serif;
          font-weight: 400;
          transition: color 0.18s ease;
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          min-width: 44px;
          padding: 8px;
        }
        .ft-bottom-link:hover {
          color: var(--color-primary);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      `}</style>

      <footer className="ft-root">
        <nav className="ft-nav">

         {/* ── LOGO ── */}
<div className="ft-logo-row">
  <Link href="/">
    <Image
      src="/Images/logo/headerlogo1.webp"
      alt="Retreats And Treks"
      width={200}
      height={212}
      style={{ height: '60px', width: 'auto', display: 'block' }}
      quality={75}
    />
  </Link>
</div>

          {/* ── COLUMNS ── */}
          <div className="ft-grid">

            <div className="ft-col">
              <p className="ft-col-heading">Popular Treks</p>
              <ul className="ft-list">
                <li><Link href="/treks/location/lohajung/brahmatal-trek" className="ft-link">Brahmatal Trek</Link></li>
                <li><Link href="/treks/location/joshimath/kuari-pass-trek" className="ft-link">Kuari Pass Trek</Link></li>
                <li><Link href="/treks/location/lohajung/roopkund-trek" className="ft-link">Roopkund Trek</Link></li>
                <li><Link href="/treks/location/joshimath/pangarchulla-trek" className="ft-link">Pangarchulla Trek</Link></li>
                <li><Link href="/treks/location/sankri/kedarkantha-trek" className="ft-link">Kedarkantha Trek</Link></li>
                <li><Link href="/treks/location/sankri/har-ki-dun-trek" className="ft-link">Har Ki Dun Trek</Link></li>
              </ul>
            </div>

            <div className="ft-col">
              <p className="ft-col-heading">Garhwal Himalaya</p>
              <ul className="ft-list">
                <li><Link href="/treks/garhwal-himalayas" className="ft-link">Garhwal Trek Guide</Link></li>
                <li><Link href="/treks/location/lohajung/brahmatal-trek" className="ft-link">Brahmatal Trek</Link></li>
                <li><Link href="/treks/location/joshimath/kuari-pass-trek" className="ft-link">Kuari Pass Trek</Link></li>
                <li><Link href="/treks/location/lohajung/roopkund-trek" className="ft-link">Roopkund Trek</Link></li>
                <li><Link href="/treks/location/joshimath/pangarchulla-trek" className="ft-link">Pangarchulla Peak</Link></li>
                <li><Link href="/treks/location/lohajung" className="ft-link">Treks in Lohajung</Link></li>
                <li><Link href="/treks/location/joshimath" className="ft-link">Treks in Joshimath</Link></li>
              </ul>
            </div>

            <div className="ft-col">
              <p className="ft-col-heading">Trekking Guides</p>
              <ul className="ft-list">
                <li><Link href="/treks/best-treks-in-uttarakhand" className="ft-link">Best Treks in Uttarakhand</Link></li>
                <li><Link href="/treks/best-treks-in-uttarakhand/beginner" className="ft-link">Beginner Treks</Link></li>
                <li><Link href="/treks/best-treks-in-uttarakhand/snow" className="ft-link">Snow Treks</Link></li>
                <li><Link href="/treks/best-treks-in-uttarakhand/high-altitude" className="ft-link">High-Altitude Treks</Link></li>
                <li><Link href="/treks/garhwal-himalayas/fitness-guide" className="ft-link">Trek Fitness Guide</Link></li>
              </ul>
            </div>

            <div className="ft-col">
              <p className="ft-col-heading">Trek Comparisons</p>
              <ul className="ft-list">
                <li><Link href="/treks/brahmatal-vs-kuari-pass" className="ft-link">Brahmatal vs Kuari Pass</Link></li>
                <li><Link href="/treks/roopkund-vs-pangarchulla" className="ft-link">Roopkund vs Pangarchulla</Link></li>
                <li><Link href="/treks/kedarkantha-vs-har-ki-dun" className="ft-link">Kedarkantha vs Har Ki Dun</Link></li>
              </ul>
            </div>

            <div className="ft-col">
              <p className="ft-col-heading">Retreats</p>
              <ul className="ft-list">
                <li><Link href="/retreats/himalayan-retreats" className="ft-link">Himalayan Retreats</Link></li>
                <li><Link href="/retreats/chakrata" className="ft-link">Chakrata</Link></li>
                <li><Link href="/retreats/sankri" className="ft-link">Sankri</Link></li>
                <li><Link href="/retreats/rishikesh" className="ft-link">Rishikesh</Link></li>
                <li><Link href="/retreat-programs" className="ft-link">All Programs</Link></li>
              </ul>
            </div>

            <nav aria-labelledby="retreat-guides-heading" className="ft-col">
              <h3 id="retreat-guides-heading" className="ft-col-heading">Retreat Guides</h3>
              <ul className="ft-list">
                <li><Link href="/retreats/weekend-retreat-near-delhi" prefetch={false} className="ft-link">Weekend Retreat Near Delhi</Link></li>
                <li><Link href="/retreats/retreats-near-delhi" prefetch={false} className="ft-link">Retreats Near Delhi</Link></li>
                <li><Link href="/retreats/weekend-himalayan-retreats" prefetch={false} className="ft-link">Weekend Himalayan Retreats</Link></li>
                <li><Link href="/retreats/best-retreat-in-uttarakhand" prefetch={false} className="ft-link">Best Retreat in Uttarakhand</Link></li>
                <li><Link href="/retreats/retreat-cost-india" prefetch={false} className="ft-link">Retreat Costs in India (2026)</Link></li>
              </ul>
            </nav>

          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="ft-bottom">
            <span>© {new Date().getFullYear()} Retreats And Treks</span>
            <Link href="/blog" className="ft-bottom-link">Blog</Link>
            <Link href="/about" className="ft-bottom-link">About</Link>
            <Link href="/contact" className="ft-bottom-link">Contact</Link>
            <Link href="/site-map" className="ft-bottom-link">Site Map</Link>
            <Link href="/sitemap.xml" className="ft-bottom-link">Sitemap</Link>
          </div>

        </nav>
      </footer>
    </>
  );
}