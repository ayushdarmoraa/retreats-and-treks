'use client';

import { Section, Container } from '@/components/ui';
import { journeyForNotForContent } from '@/content/retreats/Journey/forNotFor';

interface JourneyForNotForProps {
  title: string;
  forItems: readonly string[];
  notForItems: readonly string[];
}

export default function JourneyForNotFor({
  title,
  forItems,
  notForItems,
}: JourneyForNotForProps) {
  const content = journeyForNotForContent;

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
            }}>{content.eyebrow}</span>
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
            Who {title} is <span style={{ color: '#374151' }}>for</span>
          </h2>

          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {/* Label bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              borderBottom: '1px solid #e5e7eb',
            }}>
              <div style={{
                padding: '0.85rem 1.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                borderRight: '1px solid #e5e7eb',
                background: '#f0f7f0',
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#111111',
                }}>{content.forLabel}</span>
              </div>
              <div style={{
                padding: '0.85rem 1.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: '#fafafa',
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#cccccc',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#111111',
                }}>{content.notForLabel}</span>
              </div>
            </div>

            {/* Body */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
            }}>
              <div style={{
                padding: '1.75rem',
                borderRight: '1px solid #e5e7eb',
                background: '#f0f7f0',
              }}>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                }}>
                  {forItems.map((line, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.85rem 0',
                      borderBottom: '1px solid rgba(0,0,0,0.05)',
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '0.87rem',
                      lineHeight: 1.6,
                      fontWeight: 300,
                      color: '#333333',
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
                        marginTop: '0.1rem',
                        fontSize: '0.6rem',
                        color: '#ffffff',
                        fontWeight: 700,
                      }}>✓</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{
                padding: '1.75rem',
                background: '#fafafa',
              }}>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                }}>
                  {notForItems.map((line, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.85rem 0',
                      borderBottom: '1px solid rgba(0,0,0,0.05)',
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '0.87rem',
                      lineHeight: 1.6,
                      fontWeight: 300,
                      color: '#595959',
                    }}>
                      <span style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: '#eeeeee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '0.1rem',
                        fontSize: '0.75rem',
                        color: '#636363',
                        fontWeight: 400,
                      }}>—</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}