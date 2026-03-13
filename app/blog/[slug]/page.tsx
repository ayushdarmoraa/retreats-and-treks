import { Metadata } from 'next';
import Link from 'next/link';
import { marked } from 'marked';
import { getBlogBySlug, ALL_BLOG_POSTS } from '@/content/blogs';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBlogPostingSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
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
  if (!blog) return { title: 'Blog Post Not Found', robots: { index: false } };
  const path = `/blog/${slug}`;
  return {
    title: blog.title,
    description: blog.description,
    alternates: { canonical: buildCanonicalUrl(path) },
    robots: { index: true, follow: true },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: buildCanonicalUrl(path),
      type: 'article',
      publishedTime: blog.publishedAt,
      images: buildOgImages(blog.title),
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
        <p>This blog post doesn&apos;t exist. Return to{' '}
          <Link href="/blog" style={{ color: 'var(--color-primary)' }}>all blog posts</Link>.
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

  const faqSchema = blog.faqItems?.length ? generateFAQSchema(blog.faqItems) : null;

  const relatedTreks =
    blog.relatedTreks?.map((s) => getTrekBySlug(s)).filter((t) => t !== undefined) ?? [];
  const relatedRetreats =
    blog.relatedRetreats?.map((s) => getRetreatServiceBySlug(s)).filter((r) => r !== undefined) ?? [];

  return (
    <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>

      <style>{`
        /* ── BLG scoped styles — prefix: blg- ── */

        /* Prose — styles dangerouslySetInnerHTML HTML */
        .blg-prose { font-family: var(--font-geist-sans), sans-serif; font-size: 0.95rem; font-weight: 300; line-height: 1.85; color: #555555; }
        .blg-prose h2 { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200; letter-spacing: -0.03em; color: #111111; margin: 2.5rem 0 0.85rem; padding-top: 2rem; border-top: 1px solid #eef0ee; }
        .blg-prose h3 { font-family: var(--font-geist-sans), sans-serif; font-size: 0.95rem; font-weight: 500; color: #111111; margin: 1.75rem 0 0.5rem; letter-spacing: -0.01em; }
        .blg-prose p { margin: 0 0 1.1rem; }
        .blg-prose p:last-child { margin-bottom: 0; }
        .blg-prose ul { padding-left: 0; list-style: none; margin: 0 0 1.25rem; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: #fff; }
        .blg-prose ul li { position: relative; padding: 0.6rem 1rem 0.6rem 2rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #555555; line-height: 1.75; border-bottom: 1px solid #f0f0f0; transition: background 0.12s; }
        .blg-prose ul li:last-child { border-bottom: none; }
        .blg-prose ul li:hover { background: #f7f9f7; }
        .blg-prose ul li::before { content: '→'; position: absolute; left: 0.75rem; color: var(--color-primary); opacity: 0.5; font-size: 0.75rem; top: 0.65rem; }
        .blg-prose ol { padding-left: 0; list-style: none; margin: 0 0 1.25rem; counter-reset: blg-ol; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: #fff; }
        .blg-prose ol li { counter-increment: blg-ol; position: relative; padding: 0.6rem 1rem 0.6rem 2rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #555555; line-height: 1.75; border-bottom: 1px solid #f0f0f0; }
        .blg-prose ol li:last-child { border-bottom: none; }
        .blg-prose ol li::before { content: counter(blg-ol) '.'; position: absolute; left: 0.75rem; color: var(--color-primary); font-size: 0.75rem; font-weight: 600; top: 0.65rem; }
        .blg-prose a { color: var(--color-primary); font-weight: 500; text-decoration: none; border-bottom: 1px solid rgba(15,118,110,0.25); }
        .blg-prose a:hover { border-bottom-color: var(--color-primary); }
        .blg-prose strong { font-weight: 500; color: #222222; }
        .blg-prose blockquote { border-left: 3px solid var(--color-primary); margin: 1.75rem 0; padding: 0.85rem 1.25rem; background: #f7f9f7; border-radius: 0 8px 8px 0; color: #555; }

        /* Related card */
        .blg-related-card { background: #fff; border: 1px solid #e5e7eb; border-top: 2px solid var(--color-primary); border-radius: 8px; overflow: hidden; }
        .blg-related-link { display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; border-bottom: 1px solid #f0f0f0; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #333; text-decoration: none; transition: background 0.15s, color 0.15s; }
        .blg-related-link:last-child { border-bottom: none; }
        .blg-related-link:hover { background: #f7f9f7; color: var(--color-primary); }
        .blg-related-link::after { content: '→'; color: var(--color-primary); opacity: 0.5; }

        /* Nav */
        .blg-nav-group { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .blg-nav-link { display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; border-bottom: 1px solid #f0f0f0; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #333; text-decoration: none; transition: background 0.15s, color 0.15s; }
        .blg-nav-link:last-child { border-bottom: none; }
        .blg-nav-link:hover { background: #f7f9f7; color: var(--color-primary); }
        .blg-nav-link.back::before { content: '←'; color: var(--color-primary); opacity: 0.5; margin-right: 0.5rem; }

        /* CTA inline strip */
        .blg-cta-strip { background: #fff; border: 1px solid #e5e7eb; border-left: 3px solid var(--color-primary); border-radius: 8px; padding: 1rem 1.25rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; }
        .blg-cta-strip a { color: var(--color-primary); font-weight: 500; text-decoration: none; }
        .blg-cta-strip a:hover { text-decoration: underline; }

        /* Meta */
        .blg-meta { display: flex; flex-wrap: wrap; gap: 0.3rem 0.75rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 300; color: #888; align-items: center; }
        .blg-meta-dot { opacity: 0.3; }
        .blg-category { display: inline-block; font-size: 0.58rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; padding: 0.18rem 0.6rem; border-radius: 3px; background: rgba(15,118,110,0.08); color: var(--color-primary); text-decoration: none; transition: background 0.15s; }
        .blg-category:hover { background: rgba(15,118,110,0.15); }

        @media (max-width: 640px) {
          .blg-prose h2 { font-size: 1.2rem; }
        }
      `}</style>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: blog.title }]} />

      <article>

        {/* ── HERO ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>
                Blog · {blog.category}
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: 'clamp(1.75rem,3.5vw,2.4rem)', fontWeight: 200, letterSpacing: '-0.035em', color: '#111', lineHeight: 1.1, margin: '0 0 1.25rem' }}>
              {blog.title}
            </h1>
            <div className="blg-meta">
              <span>{blog.readingTime}</span>
              <span className="blg-meta-dot">·</span>
              <span>Published {new Date(blog.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              {blog.lastUpdated && blog.lastUpdated !== blog.publishedAt && (
                <>
                  <span className="blg-meta-dot">·</span>
                  <span>Updated {new Date(blog.lastUpdated).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
                </>
              )}
              <span className="blg-meta-dot">·</span>
              <Link href={`/topics/${blog.category.toLowerCase().replace(/\s+/g, '-')}`} className="blg-category">
                {blog.category}
              </Link>
            </div>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '3.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="blg-prose" dangerouslySetInnerHTML={{ __html: marked(blog.content) as string }} />
            {slug === '3-day-vs-5-day-himalayan-retreat' && <DurationRetreatSuggestions />}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '3rem', paddingBottom: '3rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="blg-cta-strip">
              <div style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', opacity: 0.7, marginBottom: '0.35rem' }}>Experience It</div>
              Ready to experience what we write about? Explore our{' '}
              <Link href={blog.targetMoneyPage}>offerings →</Link>
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        {(relatedTreks.length > 0 || relatedRetreats.length > 0) && (
          <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>Related Experiences</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: 'clamp(1.4rem,2.5vw,1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
                Explore related experiences
              </h2>
              <div className="blg-related-card">
                {relatedTreks.slice(0, 2).map((trek) => (
                  <Link key={trek.slug} href={`/treks/location/${trek.locationId}/${trek.slug}`} className="blg-related-link">
                    {trek.title}
                  </Link>
                ))}
                {relatedRetreats.slice(0, 2).map((retreat) => (
                  <Link key={retreat.slug} href={`/retreats/journeys/${retreat.slug}`} className="blg-related-link">
                    {retreat.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── BACK NAV ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="blg-nav-group">
              <Link href="/blog" className="blg-nav-link back">Back to all articles</Link>
            </div>
          </div>
        </section>

      </article>
    </main>
  );
}