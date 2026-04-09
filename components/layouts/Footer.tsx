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
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px 30px;
        }
        .ft-top {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }

        .ft-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 40px;
          margin-top: 40px;
        }

        .ft-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ft-col h3 {
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0f766e;
          margin-bottom: 8px;
        }

        .ft-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .ft-link {
          font-size: 0.85rem;
          color: #444;
          text-decoration: none;
          line-height: 1.6;
        }

        .ft-link:hover {
          color: #0f766e;
        }

        .ft-bottom {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 1px solid #e5e5e5;

          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          font-size: 0.78rem;
          color: #666666;
          font-family: var(--font-geist-sans), 'Geist', sans-serif;
          font-weight: 400;
        }

        .ft-bottom-links {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .ft-bottom a {
          color: #666;
          text-decoration: none;
        }

        .ft-bottom a:hover {
          color: #0f766e;
          text-decoration: underline;
        }
      `}</style>

      <footer className="ft-root">
        <div className="footer-container">

          {/* LOGO */}
          <div className="ft-top">
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

          {/* GRID */}
          <div className="ft-grid">

            <div className="ft-col">
              <h3>Popular Treks</h3>
              <ul className="ft-list">
                <li><Link href="/treks/location/lohajung/brahmatal-trek" className="ft-link">Brahmatal Trek</Link></li>
                <li><Link href="/treks/location/joshimath/kuari-pass-trek" className="ft-link">Kuari Pass Trek</Link></li>
                <li><Link href="/treks/location/lohajung/roopkund-trek" className="ft-link">Roopkund Trek</Link></li>
                <li><Link href="/treks/location/joshimath/pangarchulla-trek" className="ft-link">Pangarchulla Peak</Link></li>
                <li><Link href="/treks/location/lohajung" className="ft-link">Treks in Lohajung</Link></li>
                <li><Link href="/treks/location/joshimath" className="ft-link">Treks in Joshimath</Link></li>
              </ul>
            </div>

            <div className="ft-col">
              <h3>Garhwal Himalaya</h3>
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
              <h3>Trekking Guides</h3>
              <ul className="ft-list">
                <li><Link href="/treks/best-treks-in-uttarakhand" className="ft-link">Best Treks in Uttarakhand</Link></li>
                <li><Link href="/treks/best-treks-in-uttarakhand/beginner" className="ft-link">Beginner Treks</Link></li>
                <li><Link href="/treks/best-treks-in-uttarakhand/snow" className="ft-link">Snow Treks</Link></li>
                <li><Link href="/treks/best-treks-in-uttarakhand/high-altitude" className="ft-link">High-Altitude Treks</Link></li>
                <li><Link href="/treks/garhwal-himalayas/fitness-guide" className="ft-link">Trek Fitness Guide</Link></li>
              </ul>
            </div>

            <div className="ft-col">
              <h3>Trek Comparisons</h3>
              <ul className="ft-list">
                <li><Link href="/treks/brahmatal-vs-kuari-pass" className="ft-link">Brahmatal vs Kuari Pass</Link></li>
                <li><Link href="/treks/roopkund-vs-pangarchulla" className="ft-link">Roopkund vs Pangarchulla</Link></li>
                <li><Link href="/treks/kedarkantha-vs-har-ki-dun" className="ft-link">Kedarkantha vs Har Ki Dun</Link></li>
              </ul>
            </div>

            <div className="ft-col">
              <h3>Retreats</h3>
              <ul className="ft-list">
                <li><Link href="/retreats/himalayan-retreats" className="ft-link">Himalayan Retreats</Link></li>
                <li><Link href="/retreats/chakrata" className="ft-link">Chakrata</Link></li>
                <li><Link href="/retreats/sankri" className="ft-link">Sankri</Link></li>
                <li><Link href="/retreats/rishikesh" className="ft-link">Rishikesh</Link></li>
                <li><Link href="/retreat-programs" className="ft-link">All Programs</Link></li>
              </ul>
            </div>

            <div className="ft-col">
              <h3>Retreat Guides</h3>
              <ul className="ft-list">
                <li><Link href="/retreats/weekend-retreat-near-delhi" prefetch={false} className="ft-link">Weekend Retreat Near Delhi</Link></li>
                <li><Link href="/retreats/retreats-near-delhi" prefetch={false} className="ft-link">Retreats Near Delhi</Link></li>
                <li><Link href="/retreats/weekend-himalayan-retreats" prefetch={false} className="ft-link">Weekend Himalayan Retreats</Link></li>
                <li><Link href="/retreats/best-retreat-in-uttarakhand" prefetch={false} className="ft-link">Best Retreat in Uttarakhand</Link></li>
                <li><Link href="/retreats/retreat-cost-india" prefetch={false} className="ft-link">Retreat Costs in India (2026)</Link></li>
              </ul>
            </div>

          </div>

          {/* BOTTOM */}
          <div className="ft-bottom">
            <span>© {new Date().getFullYear()} Retreats And Treks</span>
            <div className="ft-bottom-links">
              <Link href="/blog">Blog</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/site-map">Site Map</Link>
              <Link href="/sitemap.xml">Sitemap</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}