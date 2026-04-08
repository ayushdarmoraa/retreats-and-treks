import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { ALL_BLOG_POSTS } from '@/content/blogs';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import type { BlogContent } from '@/types/content';

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
    'Guides covering specific Himalayan retreat destinations — seasonal planning, accessibility, and location comparisons.',
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
    description: `Articles related to ${category.toLowerCase()} within the Himalayan retreat platform.`,
    alternates: {
      canonical: buildCanonicalUrl(path),
    },
    robots: {
      index: shouldIndex,
      follow: true,
    },
    openGraph: {
      title: `${category} — Retreats And Treks`,
      description: `Articles related to ${category.toLowerCase()} within the Himalayan retreat platform.`,
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

  return (
    <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>

      <style>{`
        .tpc-post-card {
          background: #fff;
          border: 1px solid #eef0ee;
          border-radius: 8px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 0.75rem;
          text-decoration: none;
          display: block;
          position: relative;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .tpc-post-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--color-primary);
          border-radius: 8px 8px 0 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.22s ease;
        }
        .tpc-post-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.07);
        }
        .tpc-post-card:hover::before { transform: scaleX(1); }
        .tpc-post-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: #111;
          margin: 0 0 0.4rem;
          letter-spacing: -0.01em;
          transition: color 0.15s;
        }
        .tpc-post-card:hover .tpc-post-title { color: #374151; }
        .tpc-post-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.85;
          color: #555;
          margin: 0;
        }
        .tpc-post-arrow {
          position: absolute;
          right: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: #374151;
          
          font-size: 0.85rem;
          transition: opacity 0.15s, right 0.15s;
        }
        .tpc-post-card:hover .tpc-post-arrow { right: 1rem; }
        .tpc-nav-group { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .tpc-nav-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.85rem 1rem;
          border-bottom: 1px solid #f0f0f0;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem; font-weight: 300; color: #333;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .tpc-nav-link:last-child { border-bottom: none; }
        .tpc-nav-link:hover { background: #f7f9f7; color: #374151; }
        .tpc-nav-link::before { content: '←'; color: #374151;  margin-right: 0.5rem; }
        .tpc-callout {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-left: 3px solid var(--color-primary);
          border-radius: 8px;
          padding: 1rem 1.25rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555;
        }
        .tpc-callout a { color: #374151; font-weight: 500; text-decoration: none; }
        .tpc-callout a:hover { text-decoration: underline; }
        @media (max-width: 640px) {
          .tpc-post-card { padding: 1rem 1.1rem; }
          .tpc-post-arrow { display: none; }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Topics', href: '/topics' },
          { name: category },
        ]}
      />

      {/* ── HERO ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>
              Topic · {posts.length} {posts.length === 1 ? 'article' : 'articles'}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: 'clamp(1.75rem,3.5vw,2.4rem)', fontWeight: 200, letterSpacing: '-0.035em', color: '#111', lineHeight: 1.1, margin: '0 0 1.25rem' }}>
            {category}
          </h1>
          <p style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555', margin: 0 }}>
            {TOPIC_DESCRIPTIONS[category]}
          </p>
        </div>
      </section>

      {/* ── POSTS ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Articles</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: 'clamp(1.4rem,2.5vw,1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            All articles in this topic
          </h2>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="tpc-post-card">
              <p className="tpc-post-title">{post.title}</p>
              <p className="tpc-post-desc">{post.description}</p>
              <span className="tpc-post-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CALLOUT ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '3rem', paddingBottom: '3rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="tpc-callout">
            <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#374151', marginBottom: '0.35rem' }}>Related</div>
            For a complete overview of structured mountain-based programs, visit our{' '}
            <Link href="/retreats/himalayan-retreats">Himalayan Retreats guide</Link>.
          </div>
        </div>
      </section>

      {/* ── NAV ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="tpc-nav-group">
            <Link href="/blog" className="tpc-nav-link">All articles</Link>
          </div>
        </div>
      </section>

    </main>
  );
}