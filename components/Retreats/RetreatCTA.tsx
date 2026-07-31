'use client';

import Link from 'next/link';
import { Section, Container, Button } from '@/components/ui';
import { getCTAData } from '@/content/retreats/cta';
import { logWhatsAppOpen } from '@/lib/analytics';

export default function RetreatCTA() {
  const data = getCTAData();

  return (
    <Section
      className="cta-section"
      style={{
        background: '#ffffff',
        padding: '7rem 0',
        borderTop: '1px solid rgba(0, 0, 0, 0.04)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative glows */}
      <div
        style={{
          position: 'absolute',
          top: '-30%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(15,118,110,0.04), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,115,85,0.03), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="cta-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.8rem',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  width: '36px',
                  height: '1px',
                  background: '#0f766e',
                  opacity: 0.3,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: '#6b7280',
                  fontWeight: 500,
                }}
              >
                {data.eyebrow}
              </span>
            </div>

            <h2
              className="cta-headline"
              style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: 'clamp(2.8rem, 4.5vw, 4rem)',
                fontWeight: 200,
                letterSpacing: '-0.04em',
                color: '#1a1814',
                lineHeight: 1.05,
                margin: '0 0 0.5rem',
              }}
            >
              {data.headline}
              <span
                style={{
                  color: '#0f766e',
                  fontWeight: 200,
                  display: 'block',
                  position: 'relative',
                }}
              >
                {data.accent}
              </span>
            </h2>

            <div
              style={{
                width: '48px',
                height: '2px',
                background: 'linear-gradient(90deg, #0f766e, rgba(15, 118, 110, 0.05))',
                margin: '1.5rem 0',
                borderRadius: '4px',
              }}
            />

            <p
              className="cta-desc"
              style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.95rem',
                lineHeight: 2,
                color: '#6b7280',
                fontWeight: 300,
                maxWidth: '420px',
                margin: '0 0 2rem',
              }}
            >
              {data.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {data.points.map((text) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: '#0f766e',
                      opacity: 0.2,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="cta-point-text"
                    style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '0.85rem',
                      color: '#6b7280',
                      fontWeight: 300,
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div
            className="cta-card"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.04)',
              borderRadius: '24px',
              padding: '3rem 2.8rem',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04), 0 12px 40px rgba(0, 0, 0, 0.03)',
            }}
          >
            {/* Stats */}
            <div
              className="cta-stats"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '2rem',
              }}
            >
              {data.stats.map((s, i) => (
                <div
                  key={s.num}
                  className="cta-stat"
                  style={{
                    textAlign: 'center',
                    padding: '1.2rem 0.5rem',
                    background: '#fafafa',
                    borderRight: i < data.stats.length - 1 ? '1px solid rgba(0, 0, 0, 0.04)' : 'none',
                  }}
                >
                  <div
                    className="cta-stat-num"
                    style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '1.5rem',
                      fontWeight: 200,
                      color: '#0f766e',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      marginBottom: '0.2rem',
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '0.5rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#6b7280',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '0.3rem',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#1a1814',
                  letterSpacing: '-0.01em',
                  margin: 0,
                }}
              >
                Start with a conversation
              </h3>
              <span
                className="cta-price-badge"
                style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: '#0f766e',
                  background: 'rgba(15,118,110,0.06)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '100px',
                  border: '1px solid rgba(15,118,110,0.04)',
                  letterSpacing: '0.02em',
                }}
              >
                {data.priceLabel}
              </span>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.85rem',
                color: '#6b7280',
                fontWeight: 300,
                lineHeight: 1.8,
                margin: '0 0 1.8rem',
              }}
            >
              No forms, no checkout. Just tell us what you're looking for — we'll take it from there.
              <span
                style={{
                  display: 'block',
                  color: '#9ca3af',
                  marginTop: '0.2rem',
                  fontSize: '0.8rem',
                }}
              >
                Custom pricing based on your plan.
              </span>
            </p>

            {/* Buttons - using reusable Button component */}
            <Button
              variant="primary"
              className="w-full mb-3"
              onClick={() => {
                logWhatsAppOpen('/retreats', undefined, undefined);
                window.open(data.whatsappLink, '_blank');
              }}
            >
              {data.buttonText}
            </Button>

            <Button variant="ghost" href="/retreats" className="w-full">
              {data.secondaryButtonText}
            </Button>

            <div
              className="cta-tags"
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.2rem',
                flexWrap: 'wrap',
              }}
            >
              {data.tags.map((t, i) => (
                <span
                  key={t}
                  className="cta-tag"
                  style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.5rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#9ca3af',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  {i !== 0 && (
                    <span
                      style={{
                        width: '3px',
                        height: '3px',
                        borderRadius: '50%',
                        background: '#0f766e',
                        opacity: 0.2,
                      }}
                    />
                  )}
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .cta-section .cta-grid {
              grid-template-columns: 1fr !important;
              gap: 3rem !important;
            }
          }
          @media (max-width: 640px) {
            .cta-section .cta-card {
              padding: 2rem 1.5rem !important;
            }
            .cta-section .cta-headline {
              font-size: clamp(2rem, 8vw, 2.8rem) !important;
            }
            .cta-section .cta-desc {
              font-size: 0.9rem !important;
            }
            .cta-section .cta-point-text {
              font-size: 0.82rem !important;
            }
            .cta-section .cta-stat-num {
              font-size: 1.2rem !important;
            }
          }
          @media (max-width: 480px) {
            .cta-section .cta-card {
              padding: 1.5rem 1.2rem !important;
            }
            .cta-section .cta-headline {
              font-size: clamp(1.8rem, 7vw, 2.5rem) !important;
            }
            .cta-section .cta-stats {
              grid-template-columns: repeat(3, 1fr) !important;
            }
            .cta-section .cta-stat {
              padding: 0.8rem 0.3rem !important;
            }
            .cta-section .cta-stat-num {
              font-size: 1rem !important;
            }
            .cta-section .cta-price-badge {
              font-size: 0.6rem !important;
            }
            .cta-section .cta-tags {
              gap: 0.8rem !important;
            }
            .cta-section .cta-tag {
              font-size: 0.45rem !important;
            }
          }
        `}</style>
      </Container>
    </Section>
  );
}