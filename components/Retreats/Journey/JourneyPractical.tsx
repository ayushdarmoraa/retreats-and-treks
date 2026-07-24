'use client';

import { Section, Container } from '@/components/ui';

interface TravelInfo {
  fromDelhi: string;
  fromDehradun: string;
  note?: string;
}

interface JourneyPracticalProps {
  foodAndAccommodation?: string;
  travel?: TravelInfo;
  locationInfo?: { name: string; description: string };
}

export default function JourneyPractical({
  foodAndAccommodation,
  travel,
  locationInfo,
}: JourneyPracticalProps) {
  return (
    <>
      {/* FOOD & ACCOMMODATION */}
      {foodAndAccommodation && (
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
                }}>Stay & Food</span>
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
                Food &amp; <span style={{ color: '#374151' }}>accommodation</span>
              </h2>

              <p style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.9rem',
                lineHeight: 1.85,
                color: '#555',
                fontWeight: 300,
                margin: 0,
              }}>
                {foodAndAccommodation}
              </p>
            </div>
          </Container>
        </Section>
      )}

      {/* LOCATION INFO */}
      {locationInfo && (
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
                }}>The Location</span>
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
                About <span style={{ color: '#374151' }}>{locationInfo.name}</span>
              </h2>

              <p style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.9rem',
                lineHeight: 1.85,
                color: '#555',
                fontWeight: 300,
                margin: 0,
              }}>
                {locationInfo.description}
              </p>
            </div>
          </Container>
        </Section>
      )}

      {/* TRAVEL */}
      {travel && (
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
                }}>Getting Here</span>
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
                Travel &amp; <span style={{ color: '#374151' }}>transportation</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{
                  background: '#f7f9f7',
                  border: '1px solid #eef0ee',
                  borderRadius: 8,
                  padding: '1.25rem 1.5rem',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#111',
                    margin: '0 0 0.4rem',
                  }}>From Delhi</h3>
                  <p style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                    color: '#555',
                    fontWeight: 300,
                    margin: 0,
                  }}>{travel.fromDelhi}</p>
                </div>

                <div style={{
                  background: '#f7f9f7',
                  border: '1px solid #eef0ee',
                  borderRadius: 8,
                  padding: '1.25rem 1.5rem',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#111',
                    margin: '0 0 0.4rem',
                  }}>From Dehradun</h3>
                  <p style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                    color: '#555',
                    fontWeight: 300,
                    margin: 0,
                  }}>{travel.fromDehradun}</p>
                </div>

                {travel.note && (
                  <p style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.82rem',
                    lineHeight: 1.7,
                    color: '#595959',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    margin: '0.5rem 0 0',
                  }}>
                    {travel.note}
                  </p>
                )}
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}