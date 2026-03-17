import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { blogImageMap } from '@/lib/images';

export function generateMetadata(): Metadata {
  return {
    title: 'Blog | Retreats And Treks',
    description:
      'Read our blog to learn about trekking, wellness retreats, and Himalayan travel tips. Make informed decisions about your next adventure.',
    alternates: {
      canonical: buildCanonicalUrl('/blog'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function BlogPage() {
  return (
    <main style={{ width: '100%', padding: '0' }}>
      <style>{`
        /* ── HERO ── */
        .bl-hero {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          background: #f7f9f7;
          padding: 8rem 2rem 4.5rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .bl-hero-inner {
          max-width: 78rem;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .bl-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .bl-eyebrow-line {
          width: 24px;
          height: 1px;
          background: var(--color-primary);
          opacity: 0.5;
          display: inline-block;
        }
        .bl-eyebrow-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.56rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--color-primary);
          font-weight: 500;
          opacity: 0.7;
        }
        .bl-hero h1 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(2.2rem, 4.5vw, 3.5rem);
          font-weight: 200;
          letter-spacing: -0.04em;
          color: #111111;
          line-height: 1.05;
          margin: 0 0 1.25rem;
          text-align: center;
        }
        .bl-hero-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.95rem;
          font-weight: 300;
          line-height: 1.85;
          color: #555555;
          max-width: 520px;
          margin: 0;
          text-align: center;
        }

        /* ── TOPICS ── */
        .bl-topics-section {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          background: #ffffff;
          padding: 4rem 2rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .bl-topics-inner {
          max-width: 78rem;
          margin: 0 auto;
          text-align: center;
        }
        .bl-topics-inner h2 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #111111;
          line-height: 1.15;
          margin: 0 0 2rem;
          text-align: center;
        }
        .bl-topics-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          justify-content: center;
        }
        .bl-topic-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          color: #333333;
          background: #f7f9f7;
          border: 1px solid #e5e7eb;
          border-radius: 100px;
          padding: 8px 18px;
          text-decoration: none;
          transition: background 0.22s, border-color 0.22s, color 0.22s, transform 0.18s;
        }
        .bl-topic-pill:hover {
          background: rgba(15, 118, 110, 0.06);
          border-color: rgba(15, 118, 110, 0.35);
          color: var(--color-primary);
          transform: translateY(-2px);
        }
        .bl-topic-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-primary);
          opacity: 0.4;
          flex-shrink: 0;
        }

        /* ── ARTICLES GRID ── */
        .bl-articles-section {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          background: #f7f9f7;
          padding: 5rem 2rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .bl-articles-inner {
          max-width: 78rem;
          margin: 0 auto;
        }
        .bl-articles-inner h2 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #111111;
          line-height: 1.15;
          margin: 0 0 2.75rem;
        }
        .bl-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .bl-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .bl-grid { grid-template-columns: 1fr; }
        }

        /* ── CARD ── */
        .bl-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid #eef0ee;
          border-radius: 8px;
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.32s,
                      border-color 0.25s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
          position: relative;
        }
        .bl-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--color-primary);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 8px 8px 0 0;
          z-index: 1;
        }
        .bl-card:hover::before { transform: scaleX(1); }
        .bl-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.10);
          border-color: rgba(15, 118, 110, 0.18);
        }

        /* Card image */
        .bl-card-img-wrap {
          position: relative;
          overflow: hidden;
          height: 190px;
        }
        .bl-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .bl-card:hover .bl-card-img { transform: scale(1.05); }
        .bl-card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(2,10,2,0.55) 0%, rgba(2,10,2,0) 60%);
          transition: opacity 0.32s;
        }
        .bl-card:hover .bl-card-img-overlay { opacity: 0.75; }

        /* Topic tag over image */
        .bl-card-tag {
          position: absolute;
          top: 0.85rem;
          left: 0.85rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.52rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #ffffff;
          background: var(--color-primary);
          padding: 3px 9px;
          border-radius: 2px;
          font-weight: 600;
          z-index: 1;
        }

        /* Card body */
        .bl-card-body {
          padding: 1.4rem 1.5rem 1.6rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .bl-card-body h3 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.92rem;
          font-weight: 500;
          color: #111111;
          letter-spacing: -0.015em;
          line-height: 1.3;
          margin: 0 0 0.6rem;
          transition: color 0.2s;
        }
        .bl-card:hover .bl-card-body h3 { color: var(--color-primary); }
        .bl-card-body p {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.84rem;
          font-weight: 300;
          line-height: 1.8;
          color: #777777;
          margin: 0 0 1.25rem;
          flex: 1;
        }
        .bl-read-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-primary);
          text-decoration: none;
          transition: gap 0.2s;
        }
        .bl-card:hover .bl-read-link { gap: 0.65rem; }

        /* ── FEATURED CARD (first article, spans 2 cols) ── */
        .bl-card-featured {
          grid-column: 1 / -1;
          flex-direction: row;
          max-height: 280px;
        }
        .bl-card-featured .bl-card-img-wrap {
          width: 45%;
          min-width: 45%;
          height: auto;
          max-height: 280px;
        }
        .bl-card-featured .bl-card-body {
          padding: 2rem 2rem;
          justify-content: center;
        }
        .bl-card-featured .bl-card-body h3 {
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
        }
        @media (max-width: 1024px) {
          .bl-card-featured {
            flex-direction: column;
            max-height: none;
          }
          .bl-card-featured .bl-card-img-wrap {
            width: 100%;
            min-width: unset;
            height: 220px;
            max-height: 220px;
          }
        }
        @media (max-width: 640px) {
          .bl-card-featured .bl-card-img-wrap { height: 180px; }
          .bl-card-featured .bl-card-body { padding: 1.25rem; }
        }

        /* ── SUBSCRIBE ── */
        .bl-subscribe-section {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          background: #ffffff;
          padding: 5rem 2rem;
        }
        .bl-subscribe-inner {
          max-width: 78rem;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .bl-subscribe-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        .bl-subscribe-inner h2 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #111111;
          line-height: 1.15;
          margin: 0 0 1rem;
        }
        .bl-subscribe-inner p {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.92rem;
          font-weight: 300;
          line-height: 1.85;
          color: #555555;
          margin: 0;
        }
        .bl-subscribe-card {
          background: #f7f9f7;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 2rem 2rem;
          border-left: 3px solid var(--color-primary);
        }
        .bl-subscribe-card p {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.78rem;
          font-weight: 300;
          color: #777777;
          line-height: 1.75;
          margin: 0;
          font-style: italic;
        }
        .bl-subscribe-soon {
          display: inline-block;
          margin-top: 1rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.56rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-primary);
          opacity: 0.6;
          font-weight: 500;
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="bl-hero">
        <div className="bl-hero-inner">
          <div className="bl-eyebrow">
            <span className="bl-eyebrow-line" />
            <span className="bl-eyebrow-text">Journal · Guides · Stories</span>
          </div>
          <h1>Our Blog</h1>
          <p className="bl-hero-desc">
            Explore articles about trekking, wellness retreats, and mountain experiences in the Himalayas.
          </p>
        </div>
      </section>

      {/* ── BROWSE BY TOPIC ── */}
      <section className="bl-topics-section">
        <div className="bl-topics-inner">
          <div className="bl-eyebrow">
            <span className="bl-eyebrow-line" />
            <span className="bl-eyebrow-text">Browse by Topic</span>
          </div>
          <h2>Browse by Topic</h2>
          <div className="bl-topics-grid">
            {[
              { href: '/topics/retreat-decision', label: 'Retreat Decision Guides' },
              { href: '/topics/location-authority', label: 'Location Guides' },
              { href: '/topics/trek-decision', label: 'Trek Guides' },
              { href: '/topics/lifestyle', label: 'Lifestyle' },
            ].map((topic) => (
              <Link key={topic.href} href={topic.href} className="bl-topic-pill">
                <span className="bl-topic-dot" />
                {topic.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT ARTICLES ── */}
      <section className="bl-articles-section">
        <div className="bl-articles-inner">
          <div className="bl-eyebrow">
            <span className="bl-eyebrow-line" />
            <span className="bl-eyebrow-text">Recent Articles</span>
          </div>
          <h2>Recent Articles</h2>

          <div className="bl-grid">

            {/* Article 1 — Featured (full width) */}
            <Link href="/blog/kedarkantha-vs-har-ki-dun" className="bl-card bl-card-featured">
              <div className="bl-card-img-wrap">
                <Image
                  fill
                  className="bl-card-img"
                  style={{ objectFit: 'cover' }}
                  src={blogImageMap['kedarkantha-vs-har-ki-dun']?.src ?? '/Images/hero/alpine-ridge.webp'}
                  alt={blogImageMap['kedarkantha-vs-har-ki-dun']?.alt ?? 'Kedarkantha winter snow trek'}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 45vw"
                />
                <div className="bl-card-img-overlay" />
                <span className="bl-card-tag">Trek Guide</span>
              </div>
              <div className="bl-card-body">
                <h3>
                  Kedarkantha vs Har Ki Dun Trek: Which Peak Should You Climb?
                </h3>
                <p>
                  Comparing two popular Himalayan treks from Sankri: Which one matches your ambition, fitness level, and mountain style?
                </p>
                <span className="bl-read-link">Read Article →</span>
              </div>
            </Link>

            {/* Article 2 */}
            <Link href="/blog/chakrata-vs-sankri" className="bl-card">
              <div className="bl-card-img-wrap">
                <Image
                  fill
                  className="bl-card-img"
                  style={{ objectFit: 'cover' }}
                  src={blogImageMap['chakrata-vs-sankri']?.src ?? '/Images/hero/alpine-ridge.webp'}
                  alt={blogImageMap['chakrata-vs-sankri']?.alt ?? 'Chakrata deodar forest'}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="bl-card-img-overlay" />
                <span className="bl-card-tag">Location Guide</span>
              </div>
              <div className="bl-card-body">
                <h3>
                  Chakrata vs Sankri: Choose Your Himalayan Destination
                </h3>
                <p>
                  Should you retreat in peaceful Chakrata or trek from the remote base of Sankri? Here's how to choose based on what you want.
                </p>
                <span className="bl-read-link">Read Article →</span>
              </div>
            </Link>

            {/* Article 3 */}
            <Link href="/blog/trek-vs-retreat" className="bl-card">
              <div className="bl-card-img-wrap">
                <Image
                  fill
                  className="bl-card-img"
                  style={{ objectFit: 'cover' }}
                  src={blogImageMap['trek-vs-retreat']?.src ?? '/Images/hero/alpine-ridge.webp'}
                  alt={blogImageMap['trek-vs-retreat']?.alt ?? 'Himalayan meditation retreat'}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="bl-card-img-overlay" />
                <span className="bl-card-tag">Retreat Decision</span>
              </div>
              <div className="bl-card-body">
                <h3>
                  Trek vs Retreat: Which Mountain Experience Is Right For You?
                </h3>
                <p>
                  Not sure whether to climb a peak or find peace in the mountains? Learn the differences, and which one will transform you.
                </p>
                <span className="bl-read-link">Read Article →</span>
              </div>
            </Link>

            {/* Article 4 */}
            <Link href="/blog/is-weekend-retreat-worth-it" className="bl-card">
              <div className="bl-card-img-wrap">
                <Image
                  fill
                  className="bl-card-img"
                  style={{ objectFit: 'cover' }}
                  src={blogImageMap['is-weekend-retreat-worth-it']?.src ?? '/Images/hero/alpine-ridge.webp'}
                  alt={blogImageMap['is-weekend-retreat-worth-it']?.alt ?? 'Peaceful Himalayan mountain view'}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="bl-card-img-overlay" />
                <span className="bl-card-tag">Lifestyle</span>
              </div>
              <div className="bl-card-body">
                <h3>
                  Is a Weekend Retreat Worth It? The Real Answer.
                </h3>
                <p>
                  You have a limited weekend. Learn why a two-day mountain retreat can reset your mind and body more than you'd expect.
                </p>
                <span className="bl-read-link">Read Article →</span>
              </div>
            </Link>

            {/* Article 5 */}
            <Link href="/blog/chakrata-vs-mussoorie-weekend-trip" className="bl-card">
              <div className="bl-card-img-wrap">
                <Image
                  fill
                  className="bl-card-img"
                  style={{ objectFit: 'cover' }}
                  src={blogImageMap['chakrata-vs-mussoorie-weekend-trip']?.src ?? '/Images/hero/alpine-ridge.webp'}
                  alt={blogImageMap['chakrata-vs-mussoorie-weekend-trip']?.alt ?? 'Mussoorie hill station Himalayan town'}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="bl-card-img-overlay" />
                <span className="bl-card-tag">Location Guide</span>
              </div>
              <div className="bl-card-body">
                <h3>
                  Chakrata vs Mussoorie: Where to Spend Your Weekend Escape
                </h3>
                <p>
                  Two Himalayan towns, two very different vibes. Find out which one fits your weekend escape better.
                </p>
                <span className="bl-read-link">Read Article →</span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ── SUBSCRIBE ── */}
      <section className="bl-subscribe-section">
        <div className="bl-subscribe-inner">
          <div>
            <div className="bl-eyebrow">
              <span className="bl-eyebrow-line" />
              <span className="bl-eyebrow-text">Stay Connected</span>
            </div>
            <h2>Subscribe for Mountain Stories</h2>
            <p>
              We share insights about mountain wellness, trekking preparation, and Himalayan travel. Get them in your inbox.
            </p>
          </div>
          <div className="bl-subscribe-card">
            <p>Email subscription form coming soon.</p>
            <span className="bl-subscribe-soon">Coming Soon</span>
          </div>
        </div>
      </section>

    </main>
  );
}