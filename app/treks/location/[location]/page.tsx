import { Metadata } from 'next';
import Link from 'next/link';
import TrekCard from '@/components/TrekCard';
import { getTreksByLocation } from '@/lib/treks';
import { getLocationById, getAllLocations } from '@/lib/locations';
import { getTrekHubMetadata } from '@/lib/metadata';
import type { LocationId } from '@/config/locations';

interface PageProps {
  params: Promise<{ location: string }>;
}

export function generateStaticParams(): { location: string }[] {
  return getAllLocations()
    .filter((loc) => loc.supportsTreks)
    .map((loc) => ({ location: loc.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location } = await params;
  const locationId = location as unknown as LocationId;
  return getTrekHubMetadata(locationId);
}

export default async function TrekHubPage({ params }: PageProps) {
  const { location } = await params;
  const locationId = location as unknown as LocationId;
  const locationData = getLocationById(locationId);
  const treks = getTreksByLocation(locationId);

  if (!locationData) {
    return (
      <main style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
        <h1>Location not found</h1>
        <Link href="/treks" style={{ color: 'var(--color-primary)' }}>
          ← Back to all treks
        </Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      {/* SECTION 1: HERO */}
      <section style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Treks Around {locationData.name}</h1>
        <p style={{ fontSize: '1rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5 }}>
          {locationData.tagline}
        </p>
      </section>

      {/* SECTION 2: ALL TREKS (PRIMARY) */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.25rem' }}>Available Treks</h2>

        {treks.length > 0 ? (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              {treks.map((trek) => (
                <TrekCard
                  key={trek.slug}
                  name={trek.title}
                  duration={trek.duration}
                  difficulty={trek.difficulty}
                  description={trek.description}
                  href={`/treks/${trek.slug}`}
                />
              ))}
            </div>
            <Link
              href="/treks"
              style={{
                color: 'var(--color-primary)',
                fontWeight: 500,
                textDecoration: 'none',
                fontSize: '0.95rem',
              }}
            >
              View all treks across locations →
            </Link>
          </>
        ) : (
          <p style={{ color: 'var(--color-muted)' }}>No treks available at this location yet.</p>
        )}
      </section>

      {/* SECTION 3: RELATED EXPERIENCES */}
      <section style={{ marginBottom: '3rem' }}>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
          {locationData.name} also offers{' '}
          <Link
            href={`/retreats/${location}`}
            style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none' }}
          >
            wellness retreats and meditation experiences
          </Link>
          .
        </p>
      </section>

      {/* SECTION 4: SOFT CTA */}
      <section style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
        <p style={{ marginBottom: '1rem', color: 'var(--color-muted)' }}>Ready to book a trek?</p>
        <a
          href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20am%20interested%20in%20a%20trek%20in%20{locationData.name}."
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.25rem',
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
            borderRadius: 'var(--radius-sm)',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '0.95rem',
          }}
        >
          Chat on WhatsApp
        </a>
      </section>
    </main>
  );
}

