import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked';
import { getBlogBySlug, ALL_BLOG_POSTS } from '@/content/blogs';
import { blogImageMap } from '@/lib/images';
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
  const seoTitle = blog.seoTitle ?? blog.title;
  return {
    title: seoTitle,
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
          <Link href="/blog" style={{ color: '#374151' }}>all blog posts</Link>.
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
        .blg-prose ul li::before { content: '→'; position: absolute; left: 0.75rem; color: #374151;  font-size: 0.75rem; top: 0.65rem; }
        .blg-prose ol { padding-left: 0; list-style: none; margin: 0 0 1.25rem; counter-reset: blg-ol; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: #fff; }
        .blg-prose ol li { counter-increment: blg-ol; position: relative; padding: 0.6rem 1rem 0.6rem 2rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #555555; line-height: 1.75; border-bottom: 1px solid #f0f0f0; }
        .blg-prose ol li:last-child { border-bottom: none; }
        .blg-prose ol li::before { content: counter(blg-ol) '.'; position: absolute; left: 0.75rem; color: #374151; font-size: 0.75rem; font-weight: 600; top: 0.65rem; }
        .blg-prose a { color: #374151; font-weight: 500; text-decoration: none; border-bottom: 1px solid rgba(15,118,110,0.25); }
        .blg-prose a:hover { border-bottom-color: #374151; }
        .blg-prose strong { font-weight: 500; color: #222222; }
        .blg-prose blockquote { border-left: 3px solid var(--color-primary); margin: 1.75rem 0; padding: 0.85rem 1.25rem; background: #f7f9f7; border-radius: 0 8px 8px 0; color: #555; }

        /* Related card */
        .blg-related-card { background: #fff; border: 1px solid #e5e7eb; border-top: 2px solid var(--color-primary); border-radius: 8px; overflow: hidden; }
        .blg-related-link { display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; border-bottom: 1px solid #f0f0f0; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #333; text-decoration: none; transition: background 0.15s, color 0.15s; }
        .blg-related-link:last-child { border-bottom: none; }
        .blg-related-link:hover { background: #f7f9f7; color: #374151; }
        .blg-related-link::after { content: '→'; color: #374151;  }

        /* Nav */
        .blg-nav-group { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .blg-nav-link { display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; border-bottom: 1px solid #f0f0f0; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #333; text-decoration: none; transition: background 0.15s, color 0.15s; }
        .blg-nav-link:last-child { border-bottom: none; }
        .blg-nav-link:hover { background: #f7f9f7; color: #374151; }
        .blg-nav-link.back::before { content: '←'; color: #374151;  margin-right: 0.5rem; }

        /* CTA inline strip */
        .blg-cta-strip { background: #fff; border: 1px solid #e5e7eb; border-left: 3px solid var(--color-primary); border-radius: 8px; padding: 1rem 1.25rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; }
        .blg-cta-strip a { color: #374151; font-weight: 500; text-decoration: none; }
        .blg-cta-strip a:hover { text-decoration: underline; }

        /* Meta */
        .blg-meta { display: flex; flex-wrap: wrap; gap: 0.3rem 0.75rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 300; color: #888; align-items: center; }
        .blg-meta-dot {  }
        .blg-category { display: inline-block; font-size: 0.58rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; padding: 0.18rem 0.6rem; border-radius: 3px; background: rgba(15,118,110,0.08); color: #374151; text-decoration: none; transition: background 0.15s; }
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
              <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>
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

        {/* ── FEATURED IMAGE ── */}
        {blogImageMap[slug] && (
          <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '1.5rem 2rem 0' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: '8px', overflow: 'hidden' }}>
                <Image
                  src={blogImageMap[slug].src}
                  alt={blogImageMap[slug].alt}
                  width={1200}
                  height={675}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, 52rem"
                  priority
                />
              </div>
            </div>
          </section>
        )}

        {/* ── CONTENT ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '3.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 2rem' }}>
            {(() => {
              // Parse markdown
              const rawHtml = marked(blog.content) as string;
              
              // We'll split the HTML by <h3> tags so we can inject visuals between sections
              const sections = rawHtml.split(/(?=<h3)/i);
              
              const imgData = blogImageMap[slug] || { src: '/Images/whyhimalaya/nature.webp', alt: blog.title };
              
              return (
                <div className="blg-prose">
                  {sections.map((sectionHTML, index) => {
                    // Inject a beautiful full-bleed image after the first h3 section
                    const renderImage = index === 1 && (
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', margin: '3rem 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                        <Image src={imgData.src} alt={imgData.alt} width={1200} height={675} style={{ width: '100%', height: '100%', objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, 48rem" />
                      </div>
                    );

                    // Inject a high-converting inline banner after the third h3
                    const renderBanner = index === 3 && (
                      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '2.5rem', margin: '3rem 0', textAlign: 'center' }}>
                        <h4 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.25rem', fontWeight: 500, color: '#111', margin: '0 0 0.75rem' }}>
                          Let us help you plan
                        </h4>
                        <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.95rem', color: '#555', margin: '0 0 1.5rem', lineHeight: 1.6 }}>
                          Not sure which {blog.category.includes('Treks') ? 'trek' : 'retreat'} fits your experience level? Speak with our experts and we'll craft the perfect journey for you.
                        </p>
                        <Link href={blog.targetMoneyPage} style={{ display: 'inline-block', background: 'var(--color-primary)', color: '#fff', padding: '0.75rem 1.75rem', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }}>
                          Explore {blog.category.includes('Treks') ? 'Treks' : 'Retreats'}
                        </Link>
                      </div>
                    );

                    return (
                      <div key={index}>
                        <div dangerouslySetInnerHTML={{ __html: sectionHTML }} />
                        {renderImage}
                        {renderBanner}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
            {slug === '3-day-vs-5-day-himalayan-retreat' && <DurationRetreatSuggestions />}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '3rem', paddingBottom: '3rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="blg-cta-strip">
              <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#374151', marginBottom: '0.35rem' }}>Experience It</div>
              Ready to experience what we write about? Explore our{' '}
              <Link href={blog.targetMoneyPage}>offerings →</Link>
              {' · '}
              <Link href="/reviews">Read real experiences from our retreats →</Link>
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        {(relatedTreks.length > 0 || relatedRetreats.length > 0) && (
          <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Related Experiences</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: 'clamp(1.4rem,2.5vw,1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
                Related Guides for {blog.slug}
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