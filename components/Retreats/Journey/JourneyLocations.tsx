'use client';

import Link from 'next/link';
import { Section, Container } from '@/components/ui';

interface Location {
  id: string;
  name: string;
  tagline: string;
}

interface JourneyLocationsProps {
  primary: string;
  primaryReason: string;
  locations: Location[];
  contextByLocation: Record<string, string>;
}

export default function JourneyLocations({
  primary,
  primaryReason,
  locations,
  contextByLocation,
}: JourneyLocationsProps) {
  return (
    <Section
      style={{
        background: '#f7f9f7',
        padding: '5rem 0',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <Container>
        <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}>
            <span style={{
              width: '24px',
              height: '1px',
              background: 'var(--color-primary)',
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#374151',
              fontWeight: 500,
            }}>Locations</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            color: '#111111',
            lineHeight: 1.15,
            margin: '0 0 2.5rem',
          }}>
            Where this retreat works <span style={{ color: '#374151' }}>best</span>
          </h2>

          {/* Primary */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #eef0ee',
            borderLeft: '3px solid var(--color-primary)',
            borderRadius: '8px',
            padding: '1.6rem 1.75rem',
            marginBottom: '2rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}>
            <p style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.58rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#374151',
              margin: '0 0 0.5rem',
            }}>
              Primary location: {primary}
            </p>
            <p style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.88rem',
              color: '#555555',
              fontWeight: 300,
              lineHeight: 1.75,
              margin: 0,
            }}>
              {primaryReason}
            </p>
          </div>

          {/* Also held in */}
          {locations.length > 0 && (
            <div>
              <p style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.58rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#636363',
                margin: '0 0 0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                Also held in
                <span style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
              </p>

              <div style={{ display: 'grid', gap: '0.6rem' }}>
                {locations.map((loc) => (
                  <Link
                    key={loc.id}
                    href={`/retreats/${loc.id}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1.1rem 1.35rem',
                      border: '1px solid #eef0ee',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      background: '#ffffff',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                      transition: 'border-color 0.22s, background 0.22s, box-shadow 0.22s',
                    }}
                  >
                    <div>
                      <p style={{
                        fontFamily: 'var(--font-geist-sans), sans-serif',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: '#111111',
                        margin: '0 0 0.22rem',
                        letterSpacing: '-0.01em',
                      }}>
                        {loc.name}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-geist-sans), sans-serif',
                        fontSize: '0.78rem',
                        color: '#595959',
                        fontWeight: 300,
                        margin: 0,
                        lineHeight: 1.5,
                      }}>
                        {contextByLocation[loc.id] || primaryReason}
                      </p>
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#374151',
                      flexShrink: 0,
                    }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
