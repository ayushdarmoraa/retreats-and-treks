'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Section, Container, Card, ImageBadge } from '@/components/ui';
import SectionHeading from '@/components/ui/SectionHeading';
import { getAllSignatureRetreats } from '@/content/retreats/signature';

export default function RetreatSignature() {
  const retreats = getAllSignatureRetreats();

  return (
    <Section
      className="signature-section"
      style={{
        background: '#ffffff',
        padding: '7rem 0',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
      }}
    >
      <Container>
        {/* FIX: Heading ko sahi karo - single title mein */}
        <SectionHeading
          eyebrow="Our Signature Retreats"
          title="Our Signature Retreats"
          description="If you're unsure where to begin, these are the retreat experiences most guests choose first."
        />

        <div className="signature-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          marginTop: '3rem',
        }}>
          {retreats.map((retreat) => (
            <Card
              key={retreat.slug}
              href={retreat.href}
              className="signature-card"
              style={{ height: '100%' }}
            >
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                height: '200px',
                background: '#f5f3ef',
                flexShrink: 0,
              }}>
                <Image
                  src={retreat.image}
                  alt={retreat.title}
                  width={400}
                  height={210}
                  quality={75}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(26, 24, 20, 0.5), transparent 60%)',
                  opacity: 0.6,
                  transition: 'opacity 0.5s ease',
                }} />
                <ImageBadge label={retreat.tag} />
                <span style={{
                  position: 'absolute',
                  bottom: '1.2rem',
                  left: '1.2rem',
                  right: '1.2rem',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  textShadow: '0 2px 20px rgba(0, 0, 0, 0.15)',
                }}>
                  {retreat.title}
                </span>
              </div>

              <div style={{
                padding: '1.5rem 1.5rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}>
                <div style={{
                  width: '28px',
                  height: '2px',
                  background: '#0f766e',
                  opacity: 0.06,
                  marginBottom: '0.8rem',
                  borderRadius: '4px',
                  transition: 'all 0.5s ease',
                  flexShrink: 0,
                }} />
                <h3 style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#1a1814',
                  margin: '0 0 0.3rem',
                  transition: 'color 0.4s ease',
                  flexShrink: 0,
                }}>
                  {retreat.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.82rem',
                  color: '#6b7280',
                  margin: '0 0 1rem',
                  lineHeight: 1.7,
                  fontWeight: 300,
                  flex: 1,
                }}>
                  {retreat.description}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#0f766e',
                  transition: 'all 0.3s ease',
                  borderBottom: '2px solid rgba(15, 118, 110, 0.08)',
                  paddingBottom: '0.2rem',
                  width: 'fit-content',
                  flexShrink: 0,
                  marginTop: 'auto',
                }}>
                  Explore <span style={{
                    transition: 'transform 0.3s ease',
                    display: 'inline-block',
                  }}>→</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <style>{`
          .signature-card:hover .signature-card-img {
            transform: scale(1.05);
          }
          .signature-card:hover .signature-card-overlay {
            opacity: 0.3;
          }
          .signature-card:hover .signature-card-line {
            opacity: 0.15;
            width: 40px;
          }
          .signature-card:hover .signature-card-title {
            color: #0f766e;
          }
          .signature-card:hover .signature-card-cta {
            gap: 0.6rem;
            border-bottom-color: rgba(15, 118, 110, 0.25);
          }
          .signature-card:hover .signature-card-arrow {
            transform: translateX(4px);
          }
          @media (max-width: 1024px) {
            .signature-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1.5rem;
            }
          }
          @media (max-width: 640px) {
            .signature-grid {
              grid-template-columns: 1fr;
              gap: 1.2rem;
            }
            .signature-card-img-wrap {
              height: 200px;
            }
            .signature-card-body {
              padding: 1.5rem 1.5rem 1.8rem;
            }
            .signature-card-title {
              font-size: 1rem;
            }
            .signature-card-desc {
              font-size: 0.85rem;
            }
          }
          @media (max-width: 480px) {
            .signature-card-img-wrap {
              height: 180px;
            }
            .signature-card-body {
              padding: 1.2rem 1.2rem 1.5rem;
            }
            .signature-card-title {
              font-size: 0.95rem;
            }
            .signature-card-desc {
              font-size: 0.82rem;
            }
            .signature-card-img-title {
              font-size: 1rem;
            }
            .signature-card-cta {
              font-size: 0.6rem;
            }
          }
        `}</style>
      </Container>
    </Section>
  );
}