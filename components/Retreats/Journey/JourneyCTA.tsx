'use client';

import Link from 'next/link';
import { logWhatsAppOpen } from '@/lib/analytics';
import { Section, Button } from '@/components/ui';
import { locationCtaContent } from '@/content/retreats/location/cta';

interface JourneyCTAProps {
  title: string;
  invitation: string;
  priceLabel: string;
}

export default function JourneyCTA({ title, invitation, priceLabel }: JourneyCTAProps) {
  const content = locationCtaContent;
  const whatsappLink = `https://wa.me/919760446101?text=${encodeURIComponent(
    `Hi, I'm interested in ${title}. ${invitation}`,
  )}`;

  return (
    <Section
      className="jcta-section"
      style={{
        background: '#f7f9f7',
        padding: '7rem 0',
        borderTop: '1px solid rgba(15, 118, 110, 0.06)',
        borderBottom: '1px solid rgba(15, 118, 110, 0.06)',
      }}
    >
      <div className="jcta-container">
        <div className="jcta-grid">
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
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: '#6b7280',
                  fontWeight: 500,
                }}
              >
                {content.eyebrow}
              </span>
            </div>

            <h2 className="jcta-headline">
              The mountains
              <span
                style={{
                  color: '#0f766e',
                  fontWeight: 500,
                  display: 'block',
                  position: 'relative',
                }}
              >
                are waiting.
              </span>
              Are you ready?
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

            <p className="jcta-desc">
              {invitation}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                'Small groups only — never crowded',
                'Every journey built in conversation',
                'No fixed dates, no fixed packages',
              ].map((text) => (
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
                    className="jcta-point-text"
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
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
          <div className="jcta-card">
            {/* Stats */}
            <div
              className="jcta-stats"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '2rem',
              }}
            >
              {[
                { num: '8+', label: 'Locations' },
                { num: '100%', label: 'Custom' },
                { num: '1:1', label: 'Consult' },
              ].map((s) => (
                <div
                  key={s.num}
                  className="jcta-stat"
                  style={{
                    textAlign: 'center',
                    padding: '1.2rem 0.5rem',
                    background: '#fafafa',
                    borderRight: '1px solid rgba(0, 0, 0, 0.04)',
                  }}
                >
                  <div
                    className="jcta-stat-num"
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
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
                      fontFamily: 'var(--font-inter), sans-serif',
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
                  fontFamily: 'var(--font-fraunces), Georgia, serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#2B2A26',
                  letterSpacing: '-0.01em',
                  margin: 0,
                }}
              >
                {content.cardTitle}
              </h3>
              <span
                className="jcta-price-badge"
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: '#0f766e',
                  background: 'rgba(15, 118, 110, 0.06)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '100px',
                  border: '1px solid rgba(15, 118, 110, 0.04)',
                  letterSpacing: '0.02em',
                }}
              >
                {priceLabel}
              </span>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.85rem',
                color: '#6b7280',
                fontWeight: 300,
                lineHeight: 1.8,
                margin: '0 0 1.8rem',
              }}
            >
              {content.cardSub}
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

            {/* Buttons */}
            <Button
              variant="primary"
              className="w-full mb-3"
              onClick={() => {
                logWhatsAppOpen('journey-cta', title);
                window.open(whatsappLink, '_blank');
              }}
            >
              {content.buttonText}
            </Button>

            <Button variant="ghost" href="/retreats" className="w-full">
              {content.secondaryButtonText}
            </Button>

            <div
              className="jcta-tags"
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.2rem',
                flexWrap: 'wrap',
              }}
            >
              {['Small groups', 'No fixed dates', 'Fully custom'].map((t, i) => (
                <span
                  key={t}
                  className="jcta-tag"
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
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
      </div>

      <style jsx>{`
        .jcta-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }

        .jcta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .jcta-headline {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(2.8rem, 4.5vw, 4rem);
          font-weight: 500;
          letter-spacing: -0.04em;
          color: #2B2A26;
          line-height: 1.05;
          margin: 0 0 0.5rem;
        }

        .jcta-desc {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          line-height: 2;
          color: #6b7280;
          font-weight: 300;
          max-width: 420px;
          margin: 0 0 2rem;
        }

        .jcta-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 24px;
          padding: 3rem 2.8rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04), 0 12px 40px rgba(0, 0, 0, 0.03);
        }

        /* ===== Tablet ===== */
        @media (max-width: 1024px) {
          .jcta-container {
            padding: 0 2.5rem;
          }

          .jcta-grid {
            gap: 3rem;
          }

          .jcta-card {
            padding: 2.5rem 2rem;
          }
        }

        /* ===== Mobile ===== */
        @media (max-width: 768px) {
          :global(.jcta-section) {
            padding: 4rem 0 !important;
          }

          .jcta-container {
            padding: 0 1.5rem;
          }

          .jcta-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .jcta-headline {
            font-size: clamp(2.2rem, 8vw, 2.8rem);
          }

          .jcta-desc {
            max-width: 100%;
            font-size: 0.9rem;
          }

          .jcta-point-text {
            font-size: 0.82rem;
          }

          .jcta-card {
            padding: 2rem 1.5rem;
            border-radius: 18px;
          }

          .jcta-stat-num {
            font-size: 1.2rem;
          }
        }

        /* ===== Small mobile ===== */
        @media (max-width: 420px) {
          .jcta-container {
            padding: 0 1.25rem;
          }

          .jcta-card {
            padding: 1.75rem 1.25rem;
          }

          .jcta-stats {
            gap: 0;
          }

          .jcta-stat {
            padding: 0.8rem 0.3rem;
          }

          .jcta-stat-num {
            font-size: 1rem;
          }

          .jcta-price-badge {
            font-size: 0.6rem;
          }

          .jcta-tags {
            gap: 0.8rem;
          }

          .jcta-tag {
            font-size: 0.45rem;
          }
        }
      `}</style>
    </Section>
  );
}