import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import ContactClient from './ContactClient';

export function generateMetadata(): Metadata {
  return {
    title: 'Contact Retreats And Treks | Human-Centered Retreat Planning',
    description:
      'Reach out directly to our retreat designers. No forms, no automation — just genuine conversation about what might serve you best.',
    alternates: {
      canonical: buildCanonicalUrl('/contact'),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Contact Retreats And Treks',
      description: 'Reach out directly to our retreat designers for a genuine conversation.',
      url: buildCanonicalUrl('/contact'),
      type: 'website',
    },
  };
}

export default function ContactPage() {
  return (
    <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 'var(--space-sm)', lineHeight: 1.3 }}>
        Contact Us
      </h1>
      <p style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)', maxWidth: '48rem' }}>
        Retreats And Treks programs are designed for small groups and individual journeys. Every
        retreat, every trek, and every experience can be tailored to what you are looking for. There
        is no standard template — just a genuine conversation about what might serve you best.
      </p>
      <p style={{ fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 'var(--space-lg)', color: 'var(--color-text)' }}>
        If you are still exploring options, our{' '}
        <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
          Himalayan retreats guide
        </Link>{' '}
        and the{' '}
        <Link href="/retreat-programs" style={{ color: 'var(--color-primary)' }}>
          program comparison matrix
        </Link>{' '}
        may help clarify which format and duration suits you before reaching out.
      </p>

      <ContactClient />
    </main>
  );
}
