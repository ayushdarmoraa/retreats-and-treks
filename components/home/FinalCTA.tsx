'use client';

import { logWhatsAppOpen } from '@/lib/analytics';
import { Section, Button } from '@/components/ui';

interface FinalCTAProps {
  whatsappLink: string;
}

const FinalCTA = ({ whatsappLink }: FinalCTAProps) => {
  return (
    <Section
      style={{
        background: '#f7f9f7',
        padding: '7rem 0',
        borderTop: '1px solid rgba(15, 118, 110, 0.06)',
      }}
      className="final-cta-section"
    >
      <div className="final-cta-container">
        <div className="final-cta-grid">
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
                Begin Your Journey
              </span>
            </div>

            <h2 className="final-cta-heading">
              The mountains
              <span
                style={{
                  color: '#0f766e',
                  fontWeight: 200,
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

            <p className="final-cta-subtext">
              Tell us what you&apos;re seeking. We&apos;ll listen — and together design something real, in the Himalayas.
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
          <div className="final-cta-card">
            {/* Stats */}
            <div
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
                  style={{
                    textAlign: 'center',
                    padding: '1.2rem 0.5rem',
                    background: '#fafafa',
                    borderRight: '1px solid rgba(0, 0, 0, 0.04)',
                  }}
                >
                  <div
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
                style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
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
                Starting from ₹18,000
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
              No forms, no checkout. Just tell us what you&apos;re looking for — we&apos;ll take it from there.
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

            {/* Buttons — now using shared Button component */}
            <Button
              variant="primary"
              className="w-full mb-3"
              onClick={() => {
                logWhatsAppOpen('/', undefined, undefined);
                window.open(whatsappLink, '_blank');
              }}
            >
              Talk on WhatsApp
            </Button>

            <Button variant="ghost" href="/retreats" className="w-full">
              Browse Retreats
            </Button>

            <div
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
      </div>

      <style jsx>{`
        .final-cta-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }

        .final-cta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .final-cta-heading {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(2.8rem, 4.5vw, 4rem);
          font-weight: 200;
          letter-spacing: -0.04em;
          color: #1a1814;
          line-height: 1.05;
          margin: 0 0 0.5rem;
        }

        .final-cta-subtext {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.95rem;
          line-height: 2;
          color: #6b7280;
          font-weight: 300;
          max-width: 420px;
          margin: 0 0 2rem;
        }

        .final-cta-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 24px;
          padding: 3rem 2.8rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04), 0 12px 40px rgba(0, 0, 0, 0.03);
        }

        /* ===== Tablet ===== */
        @media (max-width: 1024px) {
          .final-cta-container {
            padding: 0 2.5rem;
          }

          .final-cta-grid {
            gap: 3rem;
          }

          .final-cta-card {
            padding: 2.5rem 2rem;
          }
        }

        /* ===== Mobile ===== */
        @media (max-width: 768px) {
          :global(.final-cta-section) {
            padding: 4rem 0 !important;
          }

          .final-cta-container {
            padding: 0 1.5rem;
          }

          .final-cta-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .final-cta-heading {
            font-size: clamp(2.2rem, 8vw, 2.8rem);
          }

          .final-cta-subtext {
            max-width: 100%;
          }

          .final-cta-card {
            padding: 2rem 1.5rem;
            border-radius: 18px;
          }
        }

        /* ===== Small mobile ===== */
        @media (max-width: 420px) {
          .final-cta-container {
            padding: 0 1.25rem;
          }

          .final-cta-card {
            padding: 1.75rem 1.25rem;
          }
        }
      `}</style>
    </Section>
  );
};

export default FinalCTA;