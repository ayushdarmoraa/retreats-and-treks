import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { getAllTreks } from '@/lib/treks';
import { getAllLocations } from '@/lib/locations';
import TreksClient from './TreksClient';

export function generateMetadata(): Metadata {
  return {
    title: 'Guided Himalayan Treks in Uttarakhand',
    description:
      'Browse treks by destination, difficulty, and duration. Weekend treks and multi-day Himalayan experiences across Chakrata, Sankri, and beyond.',
    alternates: {
      canonical: buildCanonicalUrl('/treks'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function TreksPage() {
  const allTreks = getAllTreks();
  const trekLocations = getAllLocations().filter((l) => l.supportsTreks);

  return (
    <main style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 'var(--space-sm)', lineHeight: 1.3 }}>
        Guided Himalayan Treks in Uttarakhand
      </h1>
      <p style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)', maxWidth: '48rem' }}>
        Explore guided Himalayan treks in Uttarakhand designed for small groups and clearly defined difficulty levels. From beginner-friendly weekend treks near Dehradun to multi-day high-altitude routes in Sankri and beyond, each trek is structured around terrain, season, safety standards, and experienced local mountain guides. Our trekking programs balance accessibility with authentic mountain exposure, offering both short escapes and classic Himalayan summit experiences.
      </p>

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
          Available Treks
        </h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, margin: 0 }}>
          {allTreks.map((trek) => (
            <li key={trek.slug}>
              <Link href={`/treks/${trek.slug}`} style={{ color: 'var(--color-primary)' }}>
                {trek.title}
              </Link>
              {' — '}
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                {trek.description.slice(0, 100)}{trek.description.length > 100 ? '…' : ''}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
          Trek by Location
        </h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, margin: 0 }}>
          {trekLocations.map((loc) => (
            <li key={loc.id}>
              <Link href={`/treks/location/${loc.id}`} style={{ color: 'var(--color-primary)' }}>
                Treks in {loc.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p style={{ fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 'var(--space-lg)', color: 'var(--color-text)' }}>
        Not sure whether trekking or a retreat is right for you? Read our guide on{' '}
        <Link href="/blog/retreat-vs-trek-which-is-right-for-you" style={{ color: 'var(--color-primary)' }}>
          retreat vs trek: which is right for you
        </Link>
        , or explore our{' '}
        <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
          Himalayan retreats guide
        </Link>
        .
      </p>

      <TreksClient />
    </main>
  );
}
