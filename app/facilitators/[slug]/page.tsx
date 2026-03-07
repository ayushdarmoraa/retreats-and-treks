import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import { getFacilitator, getAllFacilitatorSlugs, type Facilitator } from '@/config/facilitators';
import { getAllRetreatServices } from '@/content/retreats/services';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllFacilitatorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const facilitator = getFacilitator(slug);
  if (!facilitator) return {};
  return {
    title: `${facilitator.name} — ${facilitator.title} | Retreats And Treks`,
    description: facilitator.metaDescription,
    alternates: { canonical: buildCanonicalUrl(`/facilitators/${slug}`) },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${facilitator.name} — ${facilitator.title}`,
      description: facilitator.metaDescription,
      url: buildCanonicalUrl(`/facilitators/${slug}`),
      type: 'profile',
    },
  };
}

export default async function FacilitatorPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const facilitator = getFacilitator(slug);
  if (!facilitator) notFound();

  const allServices = getAllRetreatServices();
  const linkedServices = allServices.filter((s) => facilitator.retreatSlugs.includes(s.slug));

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Our Facilitators', url: buildCanonicalUrl('/facilitators') },
    { name: facilitator.name, url: buildCanonicalUrl(`/facilitators/${slug}`) },
  ]);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: facilitator.name,
    jobTitle: facilitator.title,
    description: facilitator.bio,
    worksFor: {
      '@type': 'Organization',
      name: 'Retreats And Treks',
      url: buildCanonicalUrl('/'),
    },
    url: buildCanonicalUrl(`/facilitators/${slug}`),
  };

  return (
    <TrackedPage page={`/facilitators/${slug}`} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, personSchema]) }}
      />
      <Breadcrumb items={[
        { name: 'Home', href: '/' },
        { name: 'Our Facilitators', href: '/facilitators' },
        { name: facilitator.name },
      ]} />

      <header style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.5rem' }}>
          {facilitator.name}
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', margin: 0 }}>
          {facilitator.title} · {facilitator.yearsExperience} years experience
        </p>
      </header>

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
          {facilitator.bio}
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          Background
        </h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
          {facilitator.background.map((item) => (
            <li key={item} style={{ fontSize: '0.95rem' }}>{item}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          Approach
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
          {facilitator.approach}
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          Qualifications
        </h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
          {facilitator.qualifications.map((q) => (
            <li key={q} style={{ fontSize: '0.95rem' }}>{q}</li>
          ))}
        </ul>
      </section>

      {linkedServices.length > 0 && (
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Retreat Programs
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            {linkedServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/retreats/chakrata/${s.slug}`} style={{ color: 'var(--color-primary)', fontSize: '0.95rem' }}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
        <Link href="/facilitators" style={{ color: 'var(--color-primary)' }}>All Facilitators</Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href="/retreat-calendar" style={{ color: 'var(--color-primary)' }}>Retreat Calendar</Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href="/retreat-programs" style={{ color: 'var(--color-primary)' }}>All Programs</Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href="/contact" style={{ color: 'var(--color-primary)' }}>Contact</Link>
      </nav>
    </TrackedPage>
  );
}
