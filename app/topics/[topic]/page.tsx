import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { ALL_BLOG_POSTS } from '@/content/blogs';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import type { BlogContent } from '@/types/content';

type BlogCategory = BlogContent['category'];

interface PageProps {
  params: Promise<{ topic: string }>;
}

/** Maps URL slug → display category name */
const TOPIC_MAP: Record<string, BlogCategory> = {
  'location-authority': 'Location Authority',
  'retreat-decision': 'Retreat Decision',
  'trek-decision': 'Trek Decision',
  'lifestyle': 'Lifestyle',
};

/** Maps display category name → short intro sentence */
const TOPIC_DESCRIPTIONS: Record<BlogCategory, string> = {
  'Location Authority':
    'Guides covering specific Himalayan retreat destinations — seasonal planning, accessibility, and location comparisons.',
  'Retreat Decision':
    'Articles to help you decide between retreat formats, durations, and approaches before booking.',
  'Trek Decision':
    'Guides comparing Himalayan trekking routes, difficulty levels, and what each experience offers.',
  'Lifestyle':
    'Broader perspectives on rest, recalibration, and intentional living in relation to mountain experiences.',
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

  // Determine posts count for this topic to decide indexing policy (thin-page strategy)
  const posts = ALL_BLOG_POSTS.filter((post) => post.category === category);
  const shouldIndex = posts.length >= 3;

  return {
    title: `${category} — Retreats And Treks`,
    description: `Articles related to ${category.toLowerCase()} within the Himalayan retreat platform.`,
    alternates: {
      canonical: buildCanonicalUrl(path),
    },
    robots: {
      // Thin topic pages (fewer than 3 posts) are not indexed until matured
      index: shouldIndex,
      follow: true,
    },
    openGraph: {
      title: `${category} — Retreats And Treks`,
      description: `Articles related to ${category.toLowerCase()} within the Himalayan retreat platform.`,
      url: buildCanonicalUrl(path),
      type: 'website',
    },
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { topic } = await params;
  const category = TOPIC_MAP[topic];

  if (!category) {
    notFound();
  }

  const posts = ALL_BLOG_POSTS.filter((post) => post.category === category);

  if (posts.length === 0) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Topics', url: buildCanonicalUrl('/topics') },
    { name: category, url: buildCanonicalUrl(`/topics/${topic}`) },
  ]);

  return (
    <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
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

      <header style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 400, marginBottom: '0.75rem' }}>
          {category}
        </h1>
        <p style={{ lineHeight: 1.75, color: 'var(--color-muted)', fontSize: '1rem' }}>
          {TOPIC_DESCRIPTIONS[category]}
        </p>
      </header>

      <p style={{ lineHeight: 1.75, marginBottom: 'var(--space-lg)', fontSize: '0.95rem' }}>
        For a complete overview of structured mountain-based programs, visit our{' '}
        <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
          Himalayan Retreats guide
        </Link>
        .
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {posts.map((post) => (
          <li
            key={post.slug}
            style={{
              marginBottom: 'var(--space-lg)',
              paddingBottom: 'var(--space-lg)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <Link
              href={`/blog/${post.slug}`}
              style={{ color: 'var(--color-primary)', fontWeight: '500', fontSize: '1.05rem' }}
            >
              {post.title}
            </Link>
            <p
              style={{
                margin: '0.35rem 0 0',
                lineHeight: 1.65,
                color: 'var(--color-muted)',
                fontSize: '0.95rem',
              }}
            >
              {post.description}
            </p>
          </li>
        ))}
      </ul>

      <nav style={{ marginTop: 'var(--space-xl)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--color-border)' }}>
        <Link href="/blog" style={{ color: 'var(--color-primary)', fontSize: '0.95rem' }}>
          ← All articles
        </Link>
      </nav>
    </main>
  );
}
