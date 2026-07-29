'use client';

import { Section, Container } from '@/components/ui';
import SectionHeading from '@/components/ui/SectionHeading';
import { getWhyUsPoints } from '@/content/retreats/whyUs';

export default function RetreatWhyUs() {
  const points = getWhyUsPoints();

  return (
    <Section
      className="whyus-section"
      style={{
        background: '#f7f9f7',
        padding: '7rem 0',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
      }}
    >
      <Container>
        {/* HEADER - Reusable SectionHeading */}
        <SectionHeading
          eyebrow="Why travel with us"
          title="Retreats Built for Depth, Not Crowds"
        />

        {/* GRID */}
        <ul className="whyus-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          marginTop: '3rem',
          listStyle: 'none',
          padding: 0,
        }}>
          {points.map((point, idx) => (
            <li
              key={idx}
              className="whyus-item"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                borderRadius: '20px',
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top row with number and check */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '2.8rem',
                  fontWeight: 200,
                  color: '#374151',
                  opacity: 0.15,
                  lineHeight: 1,
                  letterSpacing: '-0.06em',
                  transition: 'opacity 0.4s ease',
                  userSelect: 'none',
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(15, 118, 110, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#374151',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  transition: 'all 0.4s ease',
                  flexShrink: 0,
                  opacity: 0.3,
                }}>
                  ✓
                </div>
              </div>

              {/* Text */}
              <p style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.92rem',
                lineHeight: 1.8,
                color: '#6b7280',
                fontWeight: 300,
                transition: 'color 0.3s ease',
                margin: 0,
              }}>
                {point}
              </p>

              {/* Hover effect styles */}
              <style>{`
                .whyus-item::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  height: 2px;
                  background: #0f766e;
                  transform: scaleX(0);
                  transform-origin: left;
                  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                  border-radius: 20px 20px 0 0;
                }
                .whyus-item:hover::before {
                  transform: scaleX(1);
                }
                .whyus-item:hover {
                  transform: translateY(-4px);
                  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
                  border-color: rgba(15, 118, 110, 0.04);
                }
                .whyus-item:hover .whyus-num {
                  opacity: 1;
                }
                .whyus-item:hover .whyus-check {
                  background: #0f766e;
                  color: #ffffff;
                  border-color: #0f766e;
                  opacity: 1;
                }
                .whyus-item:hover .whyus-text {
                  color: #4b5563;
                }
              `}</style>
            </li>
          ))}
        </ul>

        <style>{`
          @media (max-width: 1024px) {
            .whyus-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 1.5rem !important;
            }
          }
          @media (max-width: 640px) {
            .whyus-grid {
              grid-template-columns: 1fr !important;
              gap: 1.2rem !important;
            }
            .whyus-item {
              padding: 1.8rem 1.5rem !important;
            }
            .whyus-item .whyus-num {
              font-size: 2.2rem !important;
              opacity: 0.15 !important;
            }
            .whyus-item .whyus-text {
              font-size: 0.88rem !important;
            }
          }
          @media (max-width: 480px) {
            .whyus-item {
              padding: 1.5rem 1.2rem !important;
            }
            .whyus-item .whyus-num {
              font-size: 1.8rem !important;
              opacity: 0.15 !important;
            }
            .whyus-item .whyus-text {
              font-size: 0.85rem !important;
            }
            .whyus-item .whyus-check {
              width: 28px !important;
              height: 28px !important;
              font-size: 0.65rem !important;
            }
          }
        `}</style>
      </Container>
    </Section>
  );
}
