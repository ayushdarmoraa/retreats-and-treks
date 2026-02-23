import { Metadata } from 'next';
import Link from 'next/link';
import { getBlogBySlug, ALL_BLOG_POSTS } from '@/content/blogs';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBlogPostingSchema, generateBreadcrumbSchema } from '@/components/seo/Schema';
import { getTrekBySlug } from '@/lib/treks';
import { getRetreatServiceBySlug } from '@/content/retreats/services';
import DurationRetreatSuggestions from '@/components/DurationRetreatSuggestions';
import Breadcrumb from '@/components/Breadcrumb';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return ALL_BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      robots: { index: false },
    };
  }

  const path = `/blog/${slug}`;

  return {
    title: blog.title,
    description: blog.description,
    alternates: {
      canonical: buildCanonicalUrl(path),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: buildCanonicalUrl(path),
      type: 'article',
      publishedTime: blog.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return (
      <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
        <h1>Blog post not found</h1>
        <p>
          This blog post doesn't exist. Return to{' '}
          <Link href="/blog" style={{ color: 'var(--color-primary)' }}>
            all blog posts
          </Link>
          .
        </p>
      </main>
    );
  }

  const path = `/blog/${slug}`;
  const canonicalUrl = buildCanonicalUrl(path);

  const blogSchema = generateBlogPostingSchema({
    title: blog.title,
    description: blog.description,
    publishedAt: blog.publishedAt,
    lastUpdated: blog.lastUpdated,
    url: canonicalUrl,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Blog', url: buildCanonicalUrl('/blog') },
    { name: blog.title, url: canonicalUrl },
  ]);

  const relatedTreks =
    blog.relatedTreks
      ?.map((trekSlug) => getTrekBySlug(trekSlug))
      .filter((trek) => trek !== undefined) ?? [];

  const relatedRetreats =
    blog.relatedRetreats
      ?.map((retreatSlug) => getRetreatServiceBySlug(retreatSlug))
      .filter((retreat) => retreat !== undefined) ?? [];

  return (
    <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      {/* JSON-LD: BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
          { name: blog.title },
        ]}
      />

      <article>
        <header style={{ marginBottom: 'var(--space-lg)' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{blog.title}</h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
            {blog.readingTime} • Published {new Date(blog.publishedAt).toLocaleDateString()}
            {blog.lastUpdated && blog.lastUpdated !== blog.publishedAt && (
              <> • Last updated {new Date(blog.lastUpdated).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</>
            )}
          </p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.4rem', color: 'var(--color-muted)' }}>
            Filed under:{' '}
            <Link
              href={`/topics/${blog.category.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ color: 'var(--color-primary)' }}
            >
              {blog.category}
            </Link>
          </p>
        </header>

        {/* Blog Content */}
        <div
          style={{
            fontSize: '1rem',
            lineHeight: '1.75',
            marginBottom: 'var(--space-lg)',
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Duration suggestions — rendered only on the 3-day vs 5-day comparison page */}
        {slug === '3-day-vs-5-day-himalayan-retreat' && <DurationRetreatSuggestions />}

        {/* CTA Link */}
        <section
          style={{
            marginTop: 'var(--space-xl)',
            paddingTop: 'var(--space-lg)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <p>
            Ready to experience what we write about? Explore our{' '}
            <Link href={blog.targetMoneyPage} style={{ color: 'var(--color-primary)', fontWeight: '500' }}>
              offerings →
            </Link>
          </p>
        </section>

        {/* Related experiences */}
        {(relatedTreks.length > 0 || relatedRetreats.length > 0) && (
          <section
            style={{
              marginTop: 'var(--space-xl)',
              paddingTop: 'var(--space-lg)',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <h2 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Explore related experiences</h2>

            <ul style={{ paddingLeft: '1.25rem', margin: 0, lineHeight: 1.75 }}>
              {relatedTreks.slice(0, 2).map((trek) => (
                <li key={trek.slug}>
                  <Link href={`/treks/${trek.slug}`} style={{ color: 'var(--color-primary)' }}>
                    {trek.title}
                  </Link>
                </li>
              ))}
              {relatedRetreats.slice(0, 2).map((retreat) => (
                <li key={retreat.slug}>
                  <Link href={`/retreats/journeys/${retreat.slug}`} style={{ color: 'var(--color-primary)' }}>
                    {retreat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {/* Navigation */}
      <section style={{ marginTop: 'var(--space-xl)', paddingTop: 'var(--space-lg)' }}>
        <Link href="/blog" style={{ color: 'var(--color-primary)' }}>
          ← Back to all articles
        </Link>
      </section>
    </main>
  );
}
