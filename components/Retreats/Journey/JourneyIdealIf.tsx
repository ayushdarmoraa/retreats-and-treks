'use client';

import { Section, Container } from '@/components/ui';

interface JourneyIdealIfProps {
  idealIf: readonly string[];
  title: string;
}

export default function JourneyIdealIf({ idealIf, title }: JourneyIdealIfProps) {
  if (!idealIf || idealIf.length === 0) return null;

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
            }}>You&apos;ll Love This If</span>
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
            Ideal fit for <span style={{ color: '#374151' }}>{title}</span>
          </h2>

          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}>
            {idealIf.map((item, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                fontWeight: 300,
                color: '#444444',
              }}>
                <span style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '0.15rem',
                  fontSize: '0.6rem',
                  color: '#fff',
                  fontWeight: 700,
                }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}