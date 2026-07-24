'use client';

import Link from 'next/link';
import { Section } from '@/components/ui';
import { journeyMidCtaContent } from '@/content/retreats/Journey/midCta';

export default function JourneyMidCTA() {
  const content = journeyMidCtaContent;

  return (
    <Section
      style={{
        background: '#0a1f1c',
        padding: '4rem 0',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '44rem', margin: '0 auto', padding: '0 2rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
          fontWeight: 200,
          color: '#ffffff',
          margin: '0 0 0.75rem',
          letterSpacing: '-0.02em',
        }}>
          {content.heading}
        </h3>
        <p style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.55)',
          fontWeight: 300,
          margin: '0 0 2rem',
          lineHeight: 1.7,
        }}>
          {content.description}
        </p>
        <Link
          href="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.85rem 2.25rem',
            background: 'var(--color-primary)',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.78rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            borderRadius: '100px',
            transition: 'background 0.2s, transform 0.2s',
          }}
        >
          {content.button}
        </Link>
        <p style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.3)',
          marginTop: '1rem',
        }}>
          {content.micro}
        </p>
      </div>
    </Section>
  );
}