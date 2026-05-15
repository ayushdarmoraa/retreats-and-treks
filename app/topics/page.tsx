import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import { ALL_BLOG_POSTS } from '@/content/blogs';

const TOPICS = [
  {
    href: '/topics/retreat-decision',
    title: 'Retreat Decision',
    description: 'Guides to help you choose retreat formats, durations, locations, and approaches before booking.',
    category: 'Retreat Decision',
  },
  {
    href: '/topics/location-authority',
    title: 'Location Authority',
    description: 'Destination-specific guides for Himalayan retreat and trekking regions.',
    category: 'Location Authority',
  },
  {
    href: '/topics/trek-decision',
    title: 'Trek Decision',
    description: 'Comparisons and planning guides for Himalayan trekking routes, difficulty, season, and fit.',
    category: 'Trek Decision',
  },
  {
    href: '/topics/lifestyle',
    title: 'Lifestyle & Himalayan Living',
    description: 'Perspectives on slow living, mountain lifestyle, retreat psychology, and intentional travel.',
    category: 'Lifestyle',
  },
] as const;

export const metadata: Metadata = {
  title: 'Topics — Retreats And Treks',
  description:
    'Browse retreat, trek, location, and lifestyle topic clusters from Retreats And Treks.',
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
      'Browse retreat, trek, location, and lifestyle topic clusters from Retreats And Treks.',
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

  return (
    <main style={{ maxWidth: '64rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Topics' },
        ]}
      />

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <p style={{ fontSize: '0.78rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
          Topic clusters
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, letterSpacing: '-0.04em', marginBottom: '1rem' }}>
          Explore retreat, trek, and Himalayan living guides
        </h1>
        <p style={{ maxWidth: '44rem', lineHeight: 1.8, color: 'var(--color-muted)', fontSize: '1rem' }}>
          Browse our topic hubs by decision stage, destination, trekking route, or mountain lifestyle perspective.
        </p>
        <p style={{ maxWidth: '46rem', lineHeight: 1.8, color: 'var(--color-muted)', fontSize: '1rem', marginTop: '1rem' }}>
          These topic clusters bring related articles together so you can move from broad research to a clearer decision. Use them to compare retreat formats, understand Himalayan locations, evaluate trekking routes, or explore slower mountain living before choosing a retreat or trek.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 500, marginBottom: '0.85rem' }}>
          How to Use These Topic Hubs
        </h2>
        <p style={{ maxWidth: '48rem', lineHeight: 1.8, color: 'var(--color-muted)', fontSize: '0.98rem' }}>
          Start with retreat decision guides if you are comparing formats such as silence, yoga, creative work, burnout recovery, or weekend resets. Use location guides when your main question is where to go. Trek decision guides help compare routes, difficulty, season, and fitness needs. Lifestyle guides cover the slower questions around mountain rhythm, preparation, and intentional travel. Each hub is designed to connect planning articles with practical next steps, so you can move from reading to choosing the right retreat, trek, season, or destination with more confidence.
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          marginBottom: 'var(--space-xl)',
        }}
      >
        {TOPICS.map((topic) => {
          const count = ALL_BLOG_POSTS.filter((post) => post.category === topic.category).length;

          return (
            <Link
              key={topic.href}
              href={topic.href}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid var(--color-border)',
                borderRadius: '14px',
                padding: '1.25rem',
                background: '#fff',
              }}
            >
              <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                {count} {count === 1 ? 'article' : 'articles'}
              </p>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 500, marginBottom: '0.65rem' }}>
                {topic.title}
              </h2>
              <p style={{ lineHeight: 1.65, color: 'var(--color-muted)', fontSize: '0.92rem', margin: 0 }}>
                {topic.description}
              </p>
            </Link>
          );
        })}
      </section>

      <nav style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-lg)' }}>
        <Link href="/blog" style={{ color: 'var(--color-primary)', fontSize: '0.95rem' }}>
          ← All articles
        </Link>
      </nav>
    </main>
  );
}
