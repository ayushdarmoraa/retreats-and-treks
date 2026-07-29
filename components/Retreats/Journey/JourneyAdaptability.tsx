'use client';

import { Section, Container } from '@/components/ui';

interface JourneyAdaptabilityProps {
  adaptability: string;
}

export default function JourneyAdaptability({ adaptability }: JourneyAdaptabilityProps) {
  return (
    <Section
      style={{
        background: '#ffffff',
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
            }}>Flexibility</span>
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
            How this <span style={{ color: '#374151' }}>adapts</span>
          </h2>

          <div style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.95rem',
            lineHeight: 1.95,
            color: '#3a3a3a',
            fontWeight: 300,
            margin: 0,
            whiteSpace: 'pre-wrap',
            paddingLeft: '2rem',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: '0.3rem',
              bottom: '0.3rem',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--color-primary), transparent)',
              borderRadius: '2px',
            }} />
            {adaptability}
          </div>
        </div>
      </Container>
    </Section>
  );
}
