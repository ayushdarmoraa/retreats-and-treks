import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import { ALL_BLOG_POSTS } from '@/content/blogs';
import TrackedPage from '@/components/TrackedPage';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const TOPICS = [
  {
    href: '/topics/retreat-decision',
    title: 'Retreat Decision',
    description: 'Guides to help you choose retreat types, trip length, places, and style before booking.',
    category: 'Retreat Decision',
  },
  {
    href: '/topics/location-authority',
    title: 'Location Authority',
    description: 'Place guides for Himalayan retreat and trekking regions.',
    category: 'Location Authority',
  },
  {
    href: '/topics/trek-decision',
    title: 'Trek Decision',
    description: 'Simple planning guides for Himalayan trek routes, difficulty, season, and fit.',
    category: 'Trek Decision',
  },
  {
    href: '/topics/lifestyle',
    title: 'Lifestyle & Himalayan Living',
    description: 'Guides on slow living, mountain life, retreat mindset, and purposeful travel.',
    category: 'Lifestyle',
  },
] as const;

export const metadata: Metadata = {
  title: 'Retreat and Trek Topics | Retreats And Treks',
  description:
    'Browse retreat, trek, location, lifestyle, and planning guides from Retreats And Treks to choose better Himalayan retreats and trekking experiences.',
  alternates: {
    canonical: buildCanonicalUrl('/topics'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Topics — Retreats And Treks',
    description:
      'Browse retreat, trek, location, lifestyle, and planning guides from Retreats And Treks to choose better Himalayan retreats and trekking experiences.',
    url: buildCanonicalUrl('/topics'),
    type: 'website',
    images: buildOgImages('Topics — Retreats And Treks'),
  },
};

export default function TopicsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Topics', url: buildCanonicalUrl('/topics') },
  ]);

  // Split heading for green last word
  const h1Words = "Explore retreat, trek, and Himalayan living guides".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page="/topics" style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Retreat and Trek Topics | Retreats And Treks"
        description="Browse retreat, trek, location, lifestyle, and planning guides from Retreats And Treks."
        path="/topics"
      />

      <style>{`
        .med-shell { width: 100vw; margin-left: calc(-50vw + 50%); }
        .med-outer { max-width: 76rem; margin: 0 auto; padding: 0 1.5rem; }
        .med-inner { max-width: 58rem; margin: 0 auto; padding: 0 1.5rem; }

        .med-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.1rem; }
        .med-eyebrow-line { width: 30px; height: 1px; background: rgba(15,118,110,0.35); flex-shrink: 0; }
        .med-eyebrow-text { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6b7280; font-weight: 600; }

        .med-h2 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.12; margin: 0 0 1.1rem; }
        .med-h2 span { color: #0f766e; }
        .med-h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.15rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.7rem; letter-spacing: -0.01em; }
        .med-body { font-family: var(--font-inter), sans-serif; font-size: 0.98rem; line-height: 1.9; color: #4b5259; font-weight: 400; margin: 0 0 1rem; }
        .med-body:last-child { margin-bottom: 0; }
        .med-body strong { color: #2B2A26; font-weight: 600; }

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
        .med-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.85rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .med-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } .med-grid-4 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } }

        @keyframes med-hero-zoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        .med-hero-bg { animation: med-hero-zoom 24s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .med-hero-bg { animation: none; } }

        .med-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .med-list-item { display: grid; grid-template-columns: 1.9rem 1fr; gap: 0.9rem; }
        .med-list-dot { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid rgba(15,118,110,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .med-list-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; }
        .med-list-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #4b5259; font-weight: 400; }
        .med-list-text strong { color: #2B2A26; font-weight: 600; }

        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-hero-section {
          position: relative;
          overflow: hidden;
          min-height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(15,118,110,0.12);
        }
        .med-hero-section .med-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%);
        }
        .med-hero-section .med-hero-content {
          position: relative;
          z-index: 2;
          max-width: 58rem;
          width: 100%;
          padding: 5rem 1.5rem 4.5rem;
          text-align: center;
        }
        .med-hero-section .med-hero-content .med-h1 {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(2.3rem, 4.6vw, 3.4rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 1.1rem;
          line-height: 1.08;
          text-shadow: 0 3px 24px rgba(0,0,0,0.5);
        }
        .med-hero-section .med-hero-content .med-h1 span {
          color: #5eead4;
        }
        .med-hero-section .med-hero-content .med-body {
          max-width: 46rem;
          margin: 0 auto 1.5rem;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.85);
          text-shadow: 0 2px 14px rgba(0,0,0,0.45);
        }
        .med-hero-section .med-hero-content .med-hero-tags {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .med-hero-section .med-hero-content .med-hero-tags span {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 999px;
          padding: 0.35rem 0.9rem;
          background: rgba(15,118,110,0.25);
        }
        .med-hero-section .med-hero-content .med-hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .med-section-padding { padding: 4rem 0; }
        .med-section-padding-sm { padding: 3rem 0; }

        /* ── Topics specific styles ── */
        .med-topics-hero-body {
          max-width: 46rem;
          margin: 0 auto 1.5rem;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.85);
          text-shadow: 0 2px 14px rgba(0,0,0,0.45);
          text-align: center;
        }

        .med-topics-intro {
          max-width: 48rem;
          line-height: 1.8;
          color: #4b5259;
          font-size: 0.98rem;
          margin-bottom: 1rem;
        }

        .med-topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
          margin-top: 1.5rem;
        }

        .med-topics-card {
          display: block;
          text-decoration: none;
          color: inherit;
          padding: 1.5rem;
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
          height: 100%;
        }
        .med-topics-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #0f766e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
          z-index: 2;
        }
        .med-topics-card:hover {
          transform: translateY(-6px);
          border-color: rgba(15,118,110,0.28);
          box-shadow: 0 22px 48px rgba(15,31,28,0.12);
        }
        .med-topics-card:hover::before {
          transform: scaleX(1);
        }
        .med-topics-card .med-count {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          color: #0f766e;
          font-weight: 600;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          display: block;
        }
        .med-topics-card .med-h3 {
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
        }
        .med-topics-card .med-body {
          font-size: 0.92rem;
          margin-bottom: 0;
          color: #4b5259;
        }

        .med-topics-back {
          border-top: 1px solid rgba(15,118,110,0.08);
          padding-top: 1.5rem;
          margin-top: 2rem;
        }
        .med-topics-back a {
          color: #0f766e;
          font-size: 0.95rem;
          font-weight: 500;
          text-decoration: none;
        }
        .med-topics-back a:hover {
          text-decoration: underline;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Topics' },
            ]}
          />
        </div>
      </div>

      <article>

        {/* ── HERO ── */}
        <section className="med-shell med-hero-section">
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              className="med-hero-bg"
              src={heroImage.src}
              alt={heroImage.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div className="med-hero-overlay" />
          </div>
          <div className="med-hero-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Topic Clusters</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-topics-hero-body">
              Browse topic hubs by planning stage, place, trek route, or mountain life. Each hub groups related articles around one planning need.
            </p>
            <div className="med-hero-tags">
              <span>{TOPICS.length} Topics</span>
              <span>{ALL_BLOG_POSTS.length} Articles</span>
              <span>Planning Guides</span>
              <span>Himalayan Living</span>
            </div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <p className="med-topics-intro">
              These topic hubs bring related articles together. Use them to compare retreat types, learn about Himalayan places, compare treks, or explore slower mountain life before choosing a retreat or trek.
            </p>
            <p className="med-topics-intro">
              Each topic hub groups related guides around one planning need. This helps visitors move from early research to a clear next step without jumping between unrelated pages.
            </p>
          </div>
        </section>

        {/* ── HOW TO USE ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">How to Use</span>
            </div>
            <h2 className="med-h2">How to Use <span>These Topic Hubs</span></h2>
            <p className="med-body">
              Start with retreat decision guides if you are comparing silence, yoga, creative work, burnout recovery, or weekend resets. Use place guides when your main question is where to go.
            </p>
            <p className="med-body">
              Trek guides compare routes, difficulty, season, and fitness needs. Lifestyle guides cover mountain rhythm, preparation, and slower travel. Each hub connects planning articles with next steps, so you can choose the right retreat, trek, season, or place with more confidence.
            </p>
          </div>
        </section>

        {/* ── TOPICS GRID ── */}
        <section className="med-shell med-section-white med-section-padding">
          <div className="med-outer">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">All Topics</span>
            </div>
            <h2 className="med-h2">Explore <span>Our Topics</span></h2>

            <div className="med-topics-grid">
              {TOPICS.map((topic) => {
                const count = ALL_BLOG_POSTS.filter((post) => post.category === topic.category).length;

                return (
                  <Link key={topic.href} href={topic.href} className="med-topics-card">
                    <span className="med-count">{count} {count === 1 ? 'article' : 'articles'}</span>
                    <h3 className="med-h3">{topic.title}</h3>
                    <p className="med-body">{topic.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── BACK LINK ── */}
        <div className="med-topics-back">
          <div className="med-inner">
            <Link href="/blog">← All articles</Link>
          </div>
        </div>

      </article>
    </TrackedPage>
  );
}
