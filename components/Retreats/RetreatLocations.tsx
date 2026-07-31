'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Section, Container, Card, ImageBadge } from '@/components/ui';
import SectionHeading from '@/components/ui/SectionHeading';
import { getAllLocations } from '@/content/retreats/locations';

export default function RetreatLocations() {
  const locations = getAllLocations();

  return (
    <Section
      className="locations-section"
      style={{
        background: '#ffffff',
        padding: '7rem 0',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
      }}
    >
      <Container>
        {/* HEADER - Reusable SectionHeading */}
        <SectionHeading
          eyebrow="Mountain settings"
          title="Quiet Himalayan Places for Deep Retreat Work"
          description="Each location offers a different kind of stillness — forest ridges, river valleys, alpine meadows, or remote high-altitude silence."
        />

        {/* GRID */}
        <div className="locations-grid">
          {locations.map((location) => (
            <Card
              key={location.id}
              href={location.href}
              className="loc-card"
              style={{ height: '100%' }}
            >
              <div className="loc-card-img-wrap" style={{
                position: 'relative',
                overflow: 'hidden',
                background: '#f5f3ef',
                flexShrink: 0,
              }}>
                <Image
                  src={location.image}
                  alt={location.name}
                  width={400}
                  height={210}
                  quality={75}
                  className="loc-card-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                />
                <div className="loc-card-overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(26, 24, 20, 0.5), transparent 60%)',
                  opacity: 0.6,
                  transition: 'opacity 0.5s ease',
                }} />
                <ImageBadge label="Location" />
                <span className="loc-card-img-title" style={{
                  position: 'absolute',
                  bottom: '1.2rem',
                  left: '1.2rem',
                  right: '1.2rem',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontWeight: 500,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  textShadow: '0 2px 20px rgba(0, 0, 0, 0.15)',
                }}>
                  {location.name}
                </span>
              </div>

              <div className="loc-card-body" style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}>
                <div className="loc-card-line" style={{
                  width: '28px',
                  height: '2px',
                  background: '#0f766e',
                  opacity: 0.06,
                  marginBottom: '0.8rem',
                  borderRadius: '4px',
                  transition: 'all 0.5s ease',
                  flexShrink: 0,
                }} />
                <h3 className="loc-card-title" style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontWeight: 500,
                  color: '#1a1814',
                  margin: '0 0 0.3rem',
                  transition: 'color 0.4s ease',
                  flexShrink: 0,
                }}>
                  {location.name}
                </h3>
                <p className="loc-card-desc" style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  color: '#6b7280',
                  margin: '0 0 1rem',
                  lineHeight: 1.7,
                  fontWeight: 300,
                  flex: 1,
                }}>
                  {location.tagline}
                </p>
                <div className="loc-card-cta" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
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
                  Explore <span className="loc-card-arrow" style={{
                    transition: 'transform 0.3s ease',
                    display: 'inline-block',
                  }}>→</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <style>{`
          .locations-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 3rem;
          }
          .loc-card-img-wrap {
            height: 200px;
          }
          .loc-card-body {
            padding: 1.5rem 1.8rem 1.8rem;
          }
          .loc-card-title {
            font-size: 1rem;
          }
          .loc-card-desc {
            font-size: 0.85rem;
          }
          .loc-card-img-title {
            font-size: 1.1rem;
          }
          .loc-card-cta {
            font-size: 0.65rem;
          }
          .loc-card:hover .loc-card-img {
            transform: scale(1.05);
          }
          .loc-card:hover .loc-card-overlay {
            opacity: 0.3;
          }
          .loc-card:hover .loc-card-line {
            opacity: 0.15;
            width: 42px;
          }
          .loc-card:hover .loc-card-title {
            color: #0f766e;
          }
          .loc-card:hover .loc-card-cta {
            gap: 0.8rem;
            border-bottom-color: rgba(15, 118, 110, 0.25);
          }
          .loc-card:hover .loc-card-arrow {
            transform: translateX(4px);
          }
          @media (max-width: 1024px) {
            .locations-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1.5rem;
            }
          }
          @media (max-width: 640px) {
            .locations-grid {
              grid-template-columns: 1fr;
              gap: 1.2rem;
            }
            .loc-card-img-wrap {
              height: 200px;
            }
            .loc-card-body {
              padding: 1.2rem 1.5rem 1.5rem;
            }
            .loc-card-title {
              font-size: 0.95rem;
            }
            .loc-card-desc {
              font-size: 0.82rem;
            }
          }
          @media (max-width: 480px) {
            .loc-card-img-wrap {
              height: 180px;
            }
            .loc-card-body {
              padding: 1rem 1.2rem 1.2rem;
            }
            .loc-card-title {
              font-size: 0.9rem;
            }
            .loc-card-desc {
              font-size: 0.78rem;
            }
            .loc-card-img-title {
              font-size: 1rem;
            }
            .loc-card-cta {
              font-size: 0.6rem;
            }
          }
        `}</style>
      </Container>
    </Section>
  );
}