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
          <Link href="/blog" style={{ color: '#0f766e' }}>all blog posts</Link>.
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
    <main style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>

      <style>{`
        .med-shell { width: 100vw; margin-left: calc(-50vw + 50%); }
        .med-inner { max-width: 52rem; margin: 0 auto; padding: 0 1.5rem; }

        .med-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .med-eyebrow-line { width: 24px; height: 1px; background: #0f766e; flex-shrink: 0; }
        .med-eyebrow-text { font-family: var(--font-inter), sans-serif; font-size: 0.72rem; letter-spacing: 0.28em; text-transform: uppercase; color: #6b7280; font-weight: 600; }

        .med-h2 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.6rem, 2.8vw, 2.1rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.15; margin: 0 0 1.75rem; }

        .med-card {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(15,31,28,0.05);
          overflow: hidden;
        }

        /* ── META ── */
        .med-meta { display: flex; flex-wrap: wrap; gap: 0.3rem 0.75rem; font-family: var(--font-inter), sans-serif; font-size: 0.8rem; font-weight: 400; color: #7c8590; align-items: center; }
        .med-category { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; padding: 0.28rem 0.75rem; border-radius: 999px; background: rgba(15,118,110,0.08); color: #0f766e; text-decoration: none; transition: background 0.2s; }
        .med-category:hover { background: rgba(15,118,110,0.16); }

        /* ── PROSE ── */
        .med-prose { font-family: var(--font-inter), sans-serif; font-size: 0.98rem; font-weight: 400; line-height: 1.9; color: #4b5259; }
        .med-prose h2 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.5rem, 2.6vw, 1.9rem); font-weight: 600; letter-spacing: -0.02em; color: #2B2A26; margin: 2.75rem 0 1rem; padding-top: 2.25rem; border-top: 1px solid rgba(15,118,110,0.12); }
        .med-prose h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.15rem; font-weight: 600; color: #2B2A26; margin: 1.9rem 0 0.6rem; letter-spacing: -0.01em; }
        .med-prose p { margin: 0 0 1.15rem; }
        .med-prose p:last-child { margin-bottom: 0; }
        .med-prose ul { padding-left: 0; list-style: none; margin: 0 0 1.4rem; border: 1px solid rgba(15,118,110,0.14); border-radius: 12px; overflow: hidden; background: #fff; }
        .med-prose ul li { position: relative; padding: 0.65rem 1.1rem 0.65rem 2.2rem; font-family: var(--font-inter), sans-serif; font-size: 0.9rem; font-weight: 400; color: #4b5259; line-height: 1.8; border-bottom: 1px solid rgba(15,118,110,0.08); transition: background 0.15s; }
        .med-prose ul li:last-child { border-bottom: none; }
        .med-prose ul li:hover { background: #f7f9f7; }
        .med-prose ul li::before { content: '→'; position: absolute; left: 0.85rem; color: #0f766e; font-size: 0.78rem; top: 0.7rem; font-weight: 600; }
        .med-prose ol { padding-left: 0; list-style: none; margin: 0 0 1.4rem; counter-reset: med-ol; border: 1px solid rgba(15,118,110,0.14); border-radius: 12px; overflow: hidden; background: #fff; }
        .med-prose ol li { counter-increment: med-ol; position: relative; padding: 0.65rem 1.1rem 0.65rem 2.2rem; font-family: var(--font-inter), sans-serif; font-size: 0.9rem; font-weight: 400; color: #4b5259; line-height: 1.8; border-bottom: 1px solid rgba(15,118,110,0.08); }
        .med-prose ol li:last-child { border-bottom: none; }
        .med-prose ol li::before { content: counter(med-ol) '.'; position: absolute; left: 0.85rem; color: #0f766e; font-size: 0.78rem; font-weight: 700; top: 0.7rem; }
        .med-prose a { color: #0f766e; font-weight: 600; text-decoration: none; border-bottom: 1px solid rgba(15,118,110,0.28); }
        .med-prose a:hover { border-bottom-color: #0f766e; }
        .med-prose strong { font-weight: 600; color: #2B2A26; }
        .med-prose blockquote { border-left: 3px solid #0f766e; margin: 1.9rem 0; padding: 0.9rem 1.4rem; background: #f7f9f7; border-radius: 0 12px 12px 0; color: #4b5259; }

        /* ── RELATED / NAV LINKS ── */
        .med-link-group { border: 1px solid rgba(15,118,110,0.14); border-radius: 14px; overflow: hidden; background: #fff; }
        .med-link-row { display: flex; align-items: center; justify-content: space-between; padding: 0.9rem 1.2rem; border-bottom: 1px solid rgba(15,118,110,0.08); font-family: var(--font-inter), sans-serif; font-size: 0.9rem; font-weight: 500; color: #2B2A26; text-decoration: none; transition: background 0.2s, color 0.2s; }
        .med-link-row:last-child { border-bottom: none; }
        .med-link-row:hover { background: #f7f9f7; color: #0f766e; }
        .med-link-row::after { content: '→'; color: #0f766e; }
        .med-link-row.back::before { content: '←'; color: #0f766e; margin-right: 0.5rem; }

        /* ── CTA STRIP ── */
        .med-cta-strip { background: #fff; border: 1px solid rgba(15,118,110,0.14); border-left: 3px solid #0f766e; border-radius: 12px; padding: 1.1rem 1.4rem; font-family: var(--font-inter), sans-serif; font-size: 0.9rem; font-weight: 400; line-height: 1.85; color: #4b5259; }
        .med-cta-strip a { color: #0f766e; font-weight: 600; text-decoration: none; }
        .med-cta-strip a:hover { text-decoration: underline; }
        .med-cta-strip-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #0f766e; margin-bottom: 0.4rem; }

        @media (max-width: 640px) {
          .med-prose h2 { font-size: 1.3rem; }
        }
      `}</style>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <div className="med-inner" style={{ paddingTop: '1.5rem' }}>
        <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: blog.title }]} />
      </div>

      <article>

        {/* ── HERO ── */}
        <section className="med-shell" style={{ background: '#f7f9f7', paddingTop: '3.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid rgba(15,118,110,0.1)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Blog &middot; {blog.category}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#2B2A26', lineHeight: 1.15, margin: '0 0 1.3rem' }}>
              {blog.title}
            </h1>
            <div className="med-meta">
              <span>{blog.readingTime}</span>
              <span>&middot;</span>
              <span>Published {new Date(blog.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              {blog.lastUpdated && blog.lastUpdated !== blog.publishedAt && (
                <>
                  <span>&middot;</span>
                  <span>Updated {new Date(blog.lastUpdated).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
                </>
              )}
              <span>&middot;</span>
              <Link href={`/topics/${blog.category.toLowerCase().replace(/\s+/g, '-')}`} className="med-category">
                {blog.category}
              </Link>
            </div>
          </div>
        </section>

        {/* ── FEATURED IMAGE ── */}
        {blogImageMap[slug] && (
          <section className="med-shell" style={{ background: '#ffffff', borderBottom: '1px solid rgba(15,118,110,0.1)' }}>
            <div className="med-inner" style={{ paddingTop: '1.75rem', paddingBottom: '0' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(15,118,110,0.12)' }}>
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
        <section className="med-shell" style={{ background: '#ffffff', paddingTop: '3.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid rgba(15,118,110,0.1)' }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1.5rem' }}>
            {(() => {
              // Parse markdown
              const rawHtml = marked(blog.content) as string;

              // We'll split the HTML by <h3> tags so we can inject visuals between sections
              const sections = rawHtml.split(/(?=<h3)/i);

              const imgData = blogImageMap[slug] || { src: '/Images/whyhimalaya/nature.webp', alt: blog.title };

              return (
                <div className="med-prose">
                  {sections.map((sectionHTML, index) => {
                    // Inject a beautiful full-bleed image after the first h3 section
                    const renderImage = index === 1 && (
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', margin: '3rem 0', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(15,118,110,0.12)' }}>
                        <Image src={imgData.src} alt={imgData.alt} width={1200} height={675} style={{ width: '100%', height: '100%', objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, 48rem" />
                      </div>
                    );

                    // Inject a high-converting inline banner after the third h3
                    const renderBanner = index === 3 && (
                      <div style={{ background: '#f0fdf4', border: '1px solid rgba(15,118,110,0.25)', borderRadius: '14px', padding: '2.5rem', margin: '3rem 0', textAlign: 'center' }}>
                        <h4 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#2B2A26', margin: '0 0 0.75rem' }}>
                          Let us help you plan
                        </h4>
                        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.95rem', color: '#4b5259', margin: '0 0 1.5rem', lineHeight: 1.75 }}>
                          Not sure which {blog.category.includes('Treks') ? 'trek' : 'retreat'} fits your experience level? Speak with our experts and we&apos;ll craft the perfect journey for you.
                        </p>
                        <Link href={blog.targetMoneyPage} style={{ display: 'inline-block', background: '#0f766e', color: '#fff', padding: '0.85rem 2rem', borderRadius: '999px', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
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
        <section className="med-shell" style={{ background: '#f7f9f7', paddingTop: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(15,118,110,0.1)' }}>
          <div className="med-inner">
            <div className="med-cta-strip">
              <div className="med-cta-strip-label">Experience It</div>
              Ready to experience what we write about? Explore our{' '}
              <Link href={blog.targetMoneyPage}>offerings →</Link>
              {' · '}
              <Link href="/reviews">Read real experiences from our retreats →</Link>
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        {(relatedTreks.length > 0 || relatedRetreats.length > 0) && (
          <section className="med-shell" style={{ background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid rgba(15,118,110,0.1)' }}>
            <div className="med-inner">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Related Experiences</span>
              </div>
              <h2 className="med-h2">
                Related Guides for {blog.slug}
              </h2>
              <div className="med-link-group">
                {relatedTreks.slice(0, 2).map((trek) => (
                  <Link key={trek.slug} href={`/treks/location/${trek.locationId}/${trek.slug}`} className="med-link-row">
                    {trek.title}
                  </Link>
                ))}
                {relatedRetreats.slice(0, 2).map((retreat) => (
                  <Link key={retreat.slug} href={`/retreats/journeys/${retreat.slug}`} className="med-link-row">
                    {retreat.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── BACK NAV ── */}
        <section className="med-shell" style={{ background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div className="med-inner">
            <div className="med-link-group">
              <Link href="/blog" className="med-link-row back" style={{ justifyContent: 'flex-start' }}>Back to all articles</Link>
            </div>
          </div>
        </section>

      </article>
    </main>
  );
}