import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { blogImageMap } from '@/lib/images';

export function generateMetadata(): Metadata {
  return {
    title: 'Himalayan Retreat Blog | Retreats And Treks',
    description:
      'Read our blog to learn about trekking, wellness retreats, and Himalayan travel tips. Make informed decisions about your next adventure.',
    alternates: {
      canonical: buildCanonicalUrl('/blog'),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Himalayan Retreat Blog | Retreats And Treks',
      description: 'Read our blog to learn about trekking, wellness retreats, and Himalayan travel tips. Make informed decisions about your next adventure.',
      url: buildCanonicalUrl('/blog'),
      type: 'website',
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages('Himalayan Retreat Blog | Retreats And Treks'),
    },
  };
}

const TOPICS = [
  { href: '/topics/retreat-decision', label: 'Retreat Decision Guides' },
  { href: '/topics/location-authority', label: 'Location Guides' },
  { href: '/topics/trek-decision', label: 'Trek Guides' },
  { href: '/topics/lifestyle', label: 'Lifestyle' },
];

const ARTICLES = [
  {
    slug: 'kedarkantha-vs-har-ki-dun',
    tag: 'Trek Guide',
    title: 'Kedarkantha vs Har Ki Dun Trek: Which Peak Should You Climb?',
    desc: 'Comparing two popular Himalayan treks from Sankri: Which one matches your ambition, fitness level, and mountain style?',
    featured: true,
  },
  {
    slug: 'chakrata-vs-sankri',
    tag: 'Location Guide',
    title: 'Chakrata vs Sankri: Choose Your Himalayan Destination',
    desc: "Should you retreat in peaceful Chakrata or trek from the remote base of Sankri? Here's how to choose based on what you want.",
  },
  {
    slug: 'trek-vs-retreat',
    tag: 'Retreat Decision',
    title: 'Trek vs Retreat: Which Mountain Experience Is Right For You?',
    desc: 'Not sure whether to climb a peak or find peace in the mountains? Learn the differences, and which one will transform you.',
  },
  {
    slug: 'is-weekend-retreat-worth-it',
    tag: 'Lifestyle',
    title: 'Is a Weekend Retreat Worth It? The Real Answer.',
    desc: "You have a limited weekend. Learn why a two-day mountain retreat can reset your mind and body more than you'd expect.",
  },
  {
    slug: 'chakrata-vs-mussoorie-weekend-trip',
    tag: 'Location Guide',
    title: 'Chakrata vs Mussoorie: Where to Spend Your Weekend Escape',
    desc: 'Two Himalayan towns, two very different vibes. Find out which one fits your weekend escape better.',
  },
];

export default function BlogPage() {
  return (
    <main style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <style>{`
        .med-shell { width: 100vw; margin-left: calc(-50vw + 50%); }
        .med-outer { max-width: 76rem; margin: 0 auto; padding: 0 1.5rem; }
        .med-inner { max-width: 58rem; margin: 0 auto; padding: 0 1.5rem; }

        .med-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.1rem; }
        .med-eyebrow-line { width: 30px; height: 1px; background: rgba(15,118,110,0.35); flex-shrink: 0; }
        .med-eyebrow-text { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6b7280; font-weight: 600; }

        .med-h2 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.12; margin: 0 0 1.1rem; }
        .med-h2 span { color: #0f766e; }
        .med-body { font-family: var(--font-inter), sans-serif; font-size: 0.98rem; line-height: 1.9; color: #4b5259; font-weight: 400; margin: 0 0 1rem; }
        .med-body:last-child { margin-bottom: 0; }

        .med-card {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(15,31,28,0.05);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .med-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: #0f766e; transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: 2;
        }
        .med-card:hover { transform: translateY(-6px); border-color: rgba(15,118,110,0.28); box-shadow: 0 22px 48px rgba(15,31,28,0.12); }
        .med-card:hover::before { transform: scaleX(1); }

        .med-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem 2.3rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.25); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid #0f766e; }
        .med-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.32); }

        @keyframes med-hero-zoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        .med-hero-bg { animation: med-hero-zoom 24s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .med-hero-bg { animation: none; } }

        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } }

        /* ── TOPIC PILLS ── */
        .med-topic-pill {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-family: var(--font-inter), sans-serif; font-size: 0.78rem; font-weight: 500;
          color: #2B2A26; background: #ffffff; border: 1px solid rgba(15,118,110,0.16);
          border-radius: 999px; padding: 0.6rem 1.3rem; text-decoration: none;
          transition: all 0.25s ease;
        }
        .med-topic-pill:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); color: #0f766e; transform: translateY(-2px); }
        .med-topic-dot { width: 6px; height: 6px; border-radius: 50%; background: #0f766e; flex-shrink: 0; }

        /* ── ARTICLE GRID ── */
        .med-blog-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.6rem; }
        @media (max-width: 1024px) { .med-blog-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px) { .med-blog-grid { grid-template-columns: 1fr; } }

        .med-blog-card { display: flex; flex-direction: column; text-decoration: none; color: inherit; }
        .med-blog-img-wrap { position: relative; height: 190px; overflow: hidden; border-radius: 18px 18px 0 0; }
        .med-blog-img { transition: transform 0.7s cubic-bezier(0.22,1,0.36,1) !important; }
        .med-blog-card:hover .med-blog-img { transform: scale(1.06); }
        .med-blog-tag {
          position: absolute; top: 0.9rem; left: 0.9rem; z-index: 2;
          font-family: var(--font-inter), sans-serif; font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: #ffffff;
          background: rgba(15,118,110,0.92); padding: 0.32rem 0.7rem; border-radius: 999px;
        }
        .med-blog-body { padding: 1.4rem 1.5rem 1.6rem; display: flex; flex-direction: column; flex: 1; }
        .med-blog-title { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.05rem; font-weight: 600; color: #2B2A26; line-height: 1.32; margin: 0 0 0.6rem; transition: color 0.2s; }
        .med-blog-card:hover .med-blog-title { color: #0f766e; }
        .med-blog-desc { font-family: var(--font-inter), sans-serif; font-size: 0.85rem; line-height: 1.75; color: #666666; margin: 0 0 1.1rem; flex: 1; }
        .med-blog-link { display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--font-inter), sans-serif; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #0f766e; transition: gap 0.2s; }
        .med-blog-card:hover .med-blog-link { gap: 0.65rem; }

        .med-blog-featured { grid-column: 1 / -1; flex-direction: row; }
        .med-blog-featured .med-blog-img-wrap { width: 45%; min-width: 45%; height: auto; border-radius: 18px 0 0 18px; }
        .med-blog-featured .med-blog-body { padding: 2rem; justify-content: center; }
        .med-blog-featured .med-blog-title { font-size: 1.3rem; }
        @media (max-width: 900px) {
          .med-blog-featured { flex-direction: column; }
          .med-blog-featured .med-blog-img-wrap { width: 100%; min-width: unset; height: 220px; border-radius: 18px 18px 0 0; }
        }

        /* ── SUBSCRIBE GRID ── */
        .med-subscribe-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        @media (max-width: 768px) { .med-subscribe-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '58vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            className="med-hero-bg"
            src="/Images/hero/valley-forest.webp"
            alt="Himalayan valley forest"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '50rem', width: '100%', padding: '5rem 1.5rem 4rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Journal &middot; Guides &middot; Stories</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.1rem, 4.4vw, 3.2rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.1, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Our Blog
          </h1>
          <p style={{ maxWidth: '38rem', margin: '0 auto', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.02rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Articles about trekking, wellness retreats, and mountain experiences in the Himalayas.
          </p>
        </div>
      </section>

      {/* ── BROWSE BY TOPIC ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4rem 0' }}>
        <div className="med-inner" style={{ textAlign: 'center' }}>
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Browse by Topic</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>Find What You&apos;re <span>Looking For</span></h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', justifyContent: 'center', marginTop: '1.8rem' }}>
            {TOPICS.map((topic) => (
              <Link key={topic.href} href={topic.href} className="med-topic-pill">
                <span className="med-topic-dot" />
                {topic.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT ARTICLES ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Recent Articles</span>
          </div>
          <h2 className="med-h2">Latest from the <span>Journal</span></h2>

          <div className="med-blog-grid" style={{ marginTop: '2rem' }}>
            {ARTICLES.map((article) => {
              const img = blogImageMap[article.slug];
              return (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className={`med-card med-blog-card ${article.featured ? 'med-blog-featured' : ''}`}
                >
                  <div className="med-blog-img-wrap">
                    <Image
                      className="med-blog-img"
                      src={img?.src ?? '/Images/hero/alpine-ridge.webp'}
                      alt={img?.alt ?? article.title}
                      fill
                      sizes={article.featured ? '(max-width: 900px) 100vw, 45vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                      style={{ objectFit: 'cover' }}
                    />
                    <span className="med-blog-tag">{article.tag}</span>
                  </div>
                  <div className="med-blog-body">
                    <h3 className="med-blog-title">{article.title}</h3>
                    <p className="med-blog-desc">{article.desc}</p>
                    <span className="med-blog-link">Read Article →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIBE ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-outer med-subscribe-grid">
          <div>
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Stay Connected</span>
            </div>
            <h2 className="med-h2">Subscribe for <span>Mountain Stories</span></h2>
            <p className="med-body" style={{ marginBottom: 0 }}>
              We share insights about mountain wellness, trekking preparation, and Himalayan travel. Get them in your inbox.
            </p>
          </div>
          <div className="med-card" style={{ padding: '2rem', borderLeft: '3px solid #0f766e' }}>
            <p className="med-body" style={{ fontStyle: 'italic', fontSize: '0.88rem', marginBottom: '1rem' }}>
              Email subscription form coming soon.
            </p>
            <span style={{ display: 'inline-block', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0f766e', fontWeight: 700 }}>
              Coming Soon
            </span>
          </div>
        </div>
      </section>

    </main>
  );
}
