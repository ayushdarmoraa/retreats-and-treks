'use client';

import Link from 'next/link';
import { Section, Container } from '@/components/ui';

interface SuggestedTrek {
  slug: string;
  title: string;
  locationId: string;
}

interface JourneyRelatedTrekProps {
  suggestedTrek: SuggestedTrek;
}

export default function JourneyRelatedTrek({ suggestedTrek }: JourneyRelatedTrekProps) {
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
            }}>Also Consider</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            color: '#111111',
            lineHeight: 1.15,
            margin: '0 0 2rem',
          }}>
            Want to experience this as a <span style={{ color: '#374151' }}>trek</span>?
          </h2>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap',
            padding: '1.6rem 1.75rem',
            border: '1px solid #eef0ee',
            borderRadius: '8px',
            background: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
          }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#374151',
                margin: '0 0 0.35rem',
              }}>Suggested Trek</p>
              <p style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#111111',
                margin: '0 0 0.25rem',
                letterSpacing: '-0.01em',
              }}>
                {suggestedTrek.title}
              </p>
              <p style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.8rem',
                color: '#595959',
                fontWeight: 300,
                margin: 0,
              }}>Guided Himalayan trek</p>
            </div>

            <Link
              href={`/treks/location/${suggestedTrek.locationId}/${suggestedTrek.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.62rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#374151',
                border: '1px solid rgba(15,118,110,0.35)',
                padding: '10px 18px',
                borderRadius: '4px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'background 0.2s, color 0.2s, border-color 0.2s',
              }}
            >
              Explore Trek →
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}