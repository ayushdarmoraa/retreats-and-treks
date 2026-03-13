import { Metadata } from 'next';
import Link from 'next/link';
import { getAllLocations } from '@/lib/locations';
import { getLocationPremiumContent } from '@/content/locations';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateItemListSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import type { LocationId } from '@/config/locations';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  const title = 'Our Locations — Himalayan Retreats & Treks | Retreats And Treks';
  const description =
    'Explore our network of Himalayan locations — from accessible hill towns to remote high-altitude valleys. Each chosen for depth, silence, and transformative potential.';
  const canonical = buildCanonicalUrl('/locations');

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: 'website',       images: buildOgImages(title),
},
  };
}

export default function LocationsIndexPage() {
  const locations = getAllLocations();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Locations', url: buildCanonicalUrl('/locations') },
  ]);

  const itemListSchema = generateItemListSchema(
    locations.map((loc) => ({
      name: loc.name,
      url: buildCanonicalUrl(`/locations/${loc.id}`),
    })),
  );

  return (
    <>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Locations' }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Our Locations</h1>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--color-muted)', marginBottom: 'var(--space-xl)' }}>
          Each location in our network is chosen for a specific quality — silence, altitude, remoteness, 
          monastic lineage, forest density, or river energy. We do not operate from tourist hubs. 
          We work with places where the land itself supports inner work and movement.
        </p>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {locations.map((loc) => {
            const content = getLocationPremiumContent(loc.id as LocationId);
            const tags: string[] = [];
            if (loc.supportsRetreats) tags.push('Retreats');
            if (loc.supportsTreks) tags.push('Treks');

            return (
              <article
                key={loc.id}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
                    <Link
                      href={`/locations/${loc.id}`}
                      style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
                    >
                      {loc.name}
                    </Link>
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                    {loc.address.region}, India
                  </span>
                </div>

                <p style={{ margin: 0, lineHeight: 1.7, color: 'var(--color-text)', fontSize: '0.95rem' }}>
                  {loc.tagline}
                </p>

                {content && (
                  <p style={{ margin: 0, lineHeight: 1.7, color: 'var(--color-text)', fontSize: '0.9rem' }}>
                    {content.landTone.opening.slice(0, 200)}…
                  </p>
                )}

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.8rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-muted)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}

                  <Link
                    href={`/locations/${loc.id}`}
                    style={{ fontSize: '0.9rem', color: 'var(--color-primary)', marginLeft: 'auto' }}
                  >
                    Explore {loc.name} →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Network narrative ──────────────────────────────────── */}
        <section style={{ marginTop: 'var(--space-2xl)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            A Himalayan Network, Not a Single Destination
          </h2>
          <p style={{ lineHeight: 1.75, color: 'var(--color-text)', marginBottom: '1rem' }}>
            We work across multiple locations because different people need different kinds of places.
            Someone recovering from burnout needs the accessible forest silence of Chakrata.
            A serious practitioner may need the monastic remoteness of Zanskar.
            A first-time trekker might start from Sankri. A yoga seeker heads to Rishikesh.
          </p>
          <p style={{ lineHeight: 1.75, color: 'var(--color-text)', marginBottom: '1rem' }}>
            Each location is selected — not for tourism appeal, but for what it offers the nervous system,
            the body, and the inner life of the people who travel there.
          </p>
          <p style={{ lineHeight: 1.75, color: 'var(--color-text)' }}>
            If you are unsure which location suits you,{' '}
            <Link href="/contact" style={{ color: 'var(--color-primary)' }}>
              reach out
            </Link>
            . We will help you choose based on your intention, fitness, and what you are seeking.
          </p>
        </section>
      </main>
    </>
  );
}
