'use client';

import { Section, Container } from '@/components/ui';

interface UniquePoint {
  title: string;
  description: string;
}

interface JourneyUniqueProps {
  intro: string;
  points: readonly UniquePoint[];
}

export default function JourneyUnique({ intro, points }: JourneyUniqueProps) {
  if (!points || points.length === 0) return null;

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
            }}>What Sets This Apart</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            color: '#111111',
            lineHeight: 1.15,
            margin: '0 0 1.5rem',
          }}>
            What makes this retreat <span style={{ color: '#374151' }}>unique</span>
          </h2>

          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            lineHeight: 1.85,
            color: '#555',
            fontWeight: 300,
            margin: '0 0 2.5rem',
          }}>
            {intro}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
          }}>
            {points.map((pt, i) => (
              <div key={i} style={{
                background: '#ffffff',
                border: '1px solid #eef0ee',
                borderRadius: 8,
                padding: '1.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#111',
                  margin: '0 0 0.6rem',
                  letterSpacing: '-0.01em',
                }}>
                  {pt.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.82rem',
                  lineHeight: 1.7,
                  color: '#666',
                  fontWeight: 300,
                  margin: 0,
                }}>
                  {pt.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
