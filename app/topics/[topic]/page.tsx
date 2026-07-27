import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { ALL_BLOG_POSTS } from '@/content/blogs';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import type { BlogContent } from '@/types/content';
import TrackedPage from '@/components/TrackedPage';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

type BlogCategory = BlogContent['category'];

interface PageProps {
  params: Promise<{ topic: string }>;
}

const TOPIC_MAP: Record<string, BlogCategory> = {
  'location-authority': 'Location Authority',
  'retreat-decision': 'Retreat Decision',
  'trek-decision': 'Trek Decision',
};

const TOPIC_DESCRIPTIONS: Record<BlogCategory, string> = {
  'Location Authority':
    'Guides to Himalayan retreat destinations — seasons, access, and location comparisons.',
  'Retreat Decision':
    'Articles to help you decide between retreat formats, durations, and approaches before booking.',
  'Trek Decision':
    'Guides comparing Himalayan trekking routes, difficulty levels, and what each experience offers.',
  'Lifestyle':
    'Perspectives on slow living, mindful travel, and the rhythms of life in the Himalayas.',
};

export async function generateStaticParams() {
  return Object.keys(TOPIC_MAP).map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const category = TOPIC_MAP[topic];

  if (!category) {
    return { title: 'Topic Not Found', robots: { index: false } };
  }

  const path = `/topics/${topic}`;
  const posts = ALL_BLOG_POSTS.filter((post) => post.category === category);
  const shouldIndex = posts.length >= 3;

  return {
    title: `${category} — Retreats And Treks`,
    description: `Explore ${category.toLowerCase()} guides for Himalayan retreats and treks, with practical advice on routes, places, seasons, and trip planning.`,
    alternates: {
      canonical: buildCanonicalUrl(path),
    },
    robots: {
      index: shouldIndex,
      follow: true,
    },
    openGraph: {
      title: `${category} — Retreats And Treks`,
      description: `Explore ${category.toLowerCase()} guides for Himalayan retreats and treks, with practical advice on routes, places, seasons, and trip planning.`,
      url: buildCanonicalUrl(path),
      type: 'website',
      images: buildOgImages(`${category} — Retreats And Treks`),
    },
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { topic } = await params;
  const category = TOPIC_MAP[topic];

  if (!category) notFound();

  const posts = ALL_BLOG_POSTS.filter((post) => post.category === category);

  if (posts.length === 0) notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Topics', url: buildCanonicalUrl('/topics') },
    { name: category, url: buildCanonicalUrl(`/topics/${topic}`) },
  ]);

  // Split heading for green last word
  const h1Words = category.split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={`/topics/${topic}`} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title={`${category} — Retreats And Treks`}
        description={`Explore ${category.toLowerCase()} guides for Himalayan retreats and treks.`}
        path={`/topics/${topic}`}
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
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } }
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

        /* ── Topic specific styles ── */
        .med-topic-hero-body {
          max-width: 46rem;
          margin: 0 auto 1.5rem;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.85);
          text-shadow: 0 2px 14px rgba(0,0,0,0.45);
          text-align: center;
        }

        .med-topic-meta {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #6b7280;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .med-topic-meta .med-line {
          width: 24px;
          height: 1px;
          background: rgba(15,118,110,0.35);
        }

        .med-topic-post-card {
          display: block;
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 0.75rem;
          text-decoration: none;
          position: relative;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          overflow: hidden;
        }
        .med-topic-post-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: #0f766e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .med-topic-post-card:hover {
          transform: translateY(-4px);
          border-color: rgba(15,118,110,0.28);
          box-shadow: 0 16px 40px rgba(15,31,28,0.08);
        }
        .med-topic-post-card:hover::before {
          transform: scaleX(1);
        }
        .med-topic-post-card .med-h3 {
          font-size: 0.95rem;
          margin: 0 0 0.3rem;
          font-weight: 500;
          color: #2B2A26;
        }
        .med-topic-post-card .med-body {
          font-size: 0.88rem;
          margin: 0;
          color: #4b5259;
        }
        .med-topic-post-card .med-arrow {
          position: absolute;
          right: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: #0f766e;
          font-size: 0.8rem;
          opacity: 0.3;
          transition: opacity 0.3s, transform 0.3s;
        }
        .med-topic-post-card:hover .med-arrow {
          opacity: 1;
          transform: translateY(-50%) translateX(3px);
        }

        .med-topic-nav-group {
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 12px;
          overflow: hidden;
        }
        .med-topic-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid rgba(15,118,110,0.06);
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          font-weight: 400;
          color: #2B2A26;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .med-topic-nav-link:last-child { border-bottom: none; }
        .med-topic-nav-link:hover { background: #f7f9f7; color: #0f766e; }
        .med-topic-nav-link .med-arrow { color: #0f766e; font-size: 0.7rem; opacity: 0.4; transition: opacity 0.3s; }
        .med-topic-nav-link:hover .med-arrow { opacity: 1; }

        .med-topic-callout {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-left: 4px solid #0f766e;
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          font-weight: 400;
          line-height: 1.85;
          color: #4b5259;
        }
        .med-topic-callout a {
          color: #0f766e;
          font-weight: 500;
          text-decoration: none;
        }
        .med-topic-callout a:hover { text-decoration: underline; }
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
              { name: 'Topics', href: '/topics' },
              { name: category },
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
            <div className="med-topic-meta" style={{ justifyContent: 'center' }}>
              <span className="med-line" />
              <span>Topic · {posts.length} {posts.length === 1 ? 'article' : 'articles'}</span>
              <span className="med-line" />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-topic-hero-body">{TOPIC_DESCRIPTIONS[category]}</p>
            <div className="med-hero-tags">
              <span>{posts.length} Articles</span>
              <span>Planning Guides</span>
              <span>Himalayan Resources</span>
            </div>
          </div>
        </section>

        {/* ── POSTS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Articles</span>
            </div>
            <h2 className="med-h2">{category} <span>Articles</span></h2>

            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="med-topic-post-card">
                <h3 className="med-h3">{post.title}</h3>
                <p className="med-body">{post.description}</p>
                <span className="med-arrow">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CALLOUT ── */}
        <section className="med-shell med-section-alt med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-topic-callout">
              <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0f766e', marginBottom: '0.25rem' }}>
                Related
              </div>
              For a complete overview of guided mountain programs, visit our{' '}
              <Link href="/retreats/himalayan-retreats">Himalayan Retreats guide</Link>.
            </div>
          </div>
        </section>

        {/* ── NAV ── */}
        <section className="med-shell med-section-white med-section-padding-sm">
          <div className="med-inner">
            <div className="med-topic-nav-group">
              <Link href="/blog" className="med-topic-nav-link">
                <span>All articles</span>
                <span className="med-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

      </article>
    </TrackedPage>
  );
}