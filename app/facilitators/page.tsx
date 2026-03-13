import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import { FACILITATOR_PROFILES } from '@/config/facilitators';

const PATH = '/facilitators';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Our Facilitators — Retreat Leaders & Guides | Retreats And Treks',
    description:
      'Meet the people who lead our Himalayan retreats. Meditation teachers, yoga instructors, clinical psychologists, mountain guides, and sound healing practitioners.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Our Facilitators',
      description: 'Meet the people behind our retreat programs.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Our Facilitators'),
    },
  };
}

export default function FacilitatorsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Our Facilitators', url: buildCanonicalUrl(PATH) },
  ]);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Our Facilitators' }]} />

      <header style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
          Our Facilitators
        </h1>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
          Every retreat is led by someone with direct experience — not a script. Our facilitators
          are meditation teachers, clinical psychologists, yoga practitioners, mountain guides,
          and sound healing specialists who live the work they lead.
        </p>
      </header>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {FACILITATOR_PROFILES.map((f) => (
          <Link
            key={f.slug}
            href={`/facilitators/${f.slug}`}
            style={{
              display: 'block',
              border: '1px solid var(--color-border, #e0e0e0)',
              borderRadius: 'var(--radius-sm, 8px)',
              padding: '1.25rem',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'border-color 0.15s',
            }}
          >
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>
              {f.name}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0 0 0.5rem 0' }}>
              {f.title} · {f.yearsExperience} years
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
              {f.specialisations.join(' · ')}
            </p>
          </Link>
        ))}
      </div>

      <nav style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
        <Link href="/retreat-calendar" style={{ color: 'var(--color-primary)' }}>Retreat Calendar</Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href="/retreat-programs" style={{ color: 'var(--color-primary)' }}>All Programs</Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href="/contact" style={{ color: 'var(--color-primary)' }}>Contact</Link>
      </nav>
    </TrackedPage>
  );
}
