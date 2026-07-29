'use client';

import { Section, Container } from '@/components/ui';
import SectionHeading from '@/components/ui/SectionHeading';
import { journeyHowItWorksContent } from '@/content/retreats/Journey/howItWorks';

interface JourneyHowItWorksProps {
  rhythm: string;
}

export default function JourneyHowItWorks({ rhythm }: JourneyHowItWorksProps) {
  const content = journeyHowItWorksContent;

  const steps = rhythm.split('\n\n').filter(Boolean);
  const timeLabels = ['Morning', 'After practice', 'Midday', 'Late afternoon', 'Evening'];

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
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.heading}
            accent={content.accent}
          />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {steps.map((para, idx) => {
              const matchedLabel = timeLabels.find(t => para.startsWith(t));
              return (
                <div key={idx} style={{
                  display: 'grid',
                  gridTemplateColumns: '2rem 1fr',
                  gap: '0 1.25rem',
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    <span style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      border: '2px solid var(--color-primary)',
                      flexShrink: 0,
                      marginTop: '0.28rem',
                      transition: 'background 0.25s',
                      zIndex: 1,
                    }} />
                    {idx < steps.length - 1 && (
                      <span style={{
                        width: '1px',
                        flex: 1,
                        background: 'linear-gradient(to bottom, rgba(15,118,110,0.3), rgba(15,118,110,0.05))',
                        marginTop: '4px',
                        minHeight: '1.5rem',
                      }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: idx < steps.length - 1 ? '2rem' : 0 }}>
                    {matchedLabel && (
                      <p style={{
                        fontFamily: 'var(--font-geist-sans), sans-serif',
                        fontSize: '0.58rem',
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#374151',
                        margin: '0 0 0.4rem',
                      }}>
                        {matchedLabel}
                      </p>
                    )}
                    <p style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '0.9rem',
                      lineHeight: 1.85,
                      color: '#555555',
                      fontWeight: 300,
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                    }}>
                      {para}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
