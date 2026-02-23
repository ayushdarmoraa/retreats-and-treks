import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateFAQSchema, generateTrekSchema, generateBreadcrumbSchema } from '@/components/seo/Schema';
import { getTrekBySlug, getAllTreks } from '@/lib/treks';
import { getLocationById } from '@/lib/locations';
import { getBlogBySlug } from '@/content/blogs';
import { getRetreatsForLocation } from '@/content/retreats/services';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return getAllTreks().map((trek) => ({ slug: trek.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const trek = getTrekBySlug(slug);

  if (!trek) {
    return {
      title: 'Trek Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const path = `/treks/${slug}`;
  const canonicalUrl = buildCanonicalUrl(path);

  return {
    title: trek.title,
    description: trek.description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: trek.title,
      description: trek.description,
      url: canonicalUrl,
      type: 'article',
    },
  };
}

export default async function TrekDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const trek = getTrekBySlug(slug);

  if (!trek) {
    notFound();
  }

  const location = getLocationById(trek.locationId);
  const trekSchema = generateTrekSchema(trek);
  const faqSchema = trek.faqs.length > 0 ? generateFAQSchema(trek.faqs) : null;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: trek.title, url: buildCanonicalUrl(`/treks/${trek.slug}`) },
  ]);

  const relatedBlogs =
    trek.relatedBlogSlugs
      ?.map((blogSlug) => getBlogBySlug(blogSlug))
      .filter((blog) => blog !== undefined) ?? [];

  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in the ${trek.title} trek. Can you share more details?`,
  );
  const whatsappHref = `https://wa.me/91XXXXXXXXXX?text=${whatsappMessage}`;

  const relatedRetreatService =
    location != null ? getRetreatsForLocation(location.id)[0] : undefined;

  return (
    <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      {/* JSON-LD: TouristTrip for trek */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(trekSchema),
        }}
      />
      {/* JSON-LD: FAQPage for trek FAQs */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <article>
        {/* Header */}
        <header style={{ marginBottom: 'var(--space-lg)' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{trek.title}</h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
            {trek.duration} • {trek.difficulty}
            {trek.altitude ? ` • Max altitude: ${trek.altitude}` : ''}
          </p>
        </header>

        {/* Overview */}
        <section style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Overview</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75 }}>{trek.overview}</p>
        </section>

        {/* Highlights */}
        {trek.highlights.length > 0 && (
          <section style={{ marginBottom: 'var(--space-lg)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Highlights</h2>
            <ul style={{ paddingLeft: '1.25rem', margin: 0, lineHeight: 1.75 }}>
              {trek.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Itinerary */}
        {trek.itinerary.length > 0 && (
          <section style={{ marginBottom: 'var(--space-lg)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Itinerary</h2>
            <ol style={{ paddingLeft: '1.25rem', margin: 0, lineHeight: 1.75 }}>
              {trek.itinerary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        )}

        {/* Inclusions / Exclusions */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: 'var(--space-lg)',
          }}
        >
          {trek.inclusions.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Inclusions</h2>
              <ul style={{ paddingLeft: '1.25rem', margin: 0, lineHeight: 1.75 }}>
                {trek.inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {trek.exclusions.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Exclusions</h2>
              <ul style={{ paddingLeft: '1.25rem', margin: 0, lineHeight: 1.75 }}>
                {trek.exclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* FAQs */}
        {trek.faqs.length > 0 && (
          <section style={{ marginBottom: 'var(--space-xl)' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Questions About This Trek</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {trek.faqs.map((faq) => (
                <details
                  key={faq.question}
                  style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}
                >
                  <summary style={{ cursor: 'pointer', fontWeight: 500 }}>{faq.question}</summary>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', lineHeight: 1.7 }}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related reading */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Related reading</h2>
          {relatedBlogs.length > 0 ? (
            <ul style={{ paddingLeft: '1.25rem', margin: 0, lineHeight: 1.75 }}>
              {relatedBlogs.slice(0, 2).map((blog) => (
                <li key={blog.slug}>
                  <Link href={`/blog/${blog.slug}`} style={{ color: 'var(--color-primary)' }}>
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontSize: '0.95rem' }}>
              Explore more context and decision guides in our{' '}
              <Link href="/blog" style={{ color: 'var(--color-primary)' }}>
                blog
              </Link>
              .
            </p>
          )}
        </section>

        {/* Related retreat */}
        {relatedRetreatService && location && (
          <section
            style={{
              marginTop: 'var(--space-lg)',
              paddingTop: 'var(--space-lg)',
              borderTop: '1px solid var(--color-border)',
              marginBottom: 'var(--space-lg)',
            }}
          >
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              Prefer a slower, retreat-style experience?
            </h2>
            <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
              Explore the{' '}
              <Link
                href={`/retreats/journeys/${relatedRetreatService.slug}`}
                style={{ color: 'var(--color-primary)' }}
              >
                {relatedRetreatService.title} retreat
              </Link>{' '}
              in {location.name}.
            </p>
          </section>
        )}

        {/* Primary CTA */}
        <section
          style={{
            marginTop: 'var(--space-lg)',
            paddingTop: 'var(--space-lg)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.95rem' }}>
            Ready to plan this trek? Chat with us on WhatsApp to discuss dates, fitness, and pricing.
          </p>
          <a
            href={whatsappHref}
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.25rem',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              alignSelf: 'flex-start',
            }}
          >
            Chat on WhatsApp
          </a>
        </section>

        {/* Secondary navigation */}
        <section style={{ marginTop: 'var(--space-xl)', paddingTop: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
            <Link href="/treks" style={{ color: 'var(--color-primary)' }}>
              ← Back to all treks
            </Link>
            {location && (
              <Link href={`/retreats/${location.id}`} style={{ color: 'var(--color-primary)' }}>
                Explore retreats in {location.name}
              </Link>
            )}
          </div>
        </section>
      </article>
    </main>
  );
}

