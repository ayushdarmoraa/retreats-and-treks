'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Section, Container, Card, ImageBadge } from '@/components/ui';
import { getAllRetreatFormats } from '@/content/retreats/formats';

export default function RetreatFormats() {
  const formats = getAllRetreatFormats();

  return (
    <Section
      className="formats-section"
      style={{
        background: '#f7f9f7',
        padding: '7rem 0',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
      }}
    >
      <Container>
        {/* HEADER - Direct HTML */}
        <div className="formats-header" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.8rem',
            marginBottom: '1.5rem',
          }}>
            <span style={{ width: '36px', height: '1px', background: '#0f766e', opacity: 0.3 }} />
            <span style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#6b7280',
              fontWeight: 500,
            }}>Retreat formats</span>
            <span style={{ width: '36px', height: '1px', background: '#0f766e', opacity: 0.3 }} />
          </div>
          
          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            color: '#1a1814',
            margin: 0,
            lineHeight: 1.1,
          }}>
            Choose Your <span style={{ color: '#0f766e', fontWeight: 200 }}>Pace</span>
          </h2>
          
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '1rem',
            color: '#6b7280',
            fontWeight: 300,
            maxWidth: '44rem',
            margin: '0.75rem auto 0',
            lineHeight: 1.8,
          }}>
            Short weekend reset, deeper meditation, or movement-led retreat — each format can be adapted around your intention, dates, and availability.
          </p>
        </div>

        {/* GRID */}
        <div className="formats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          marginTop: '3rem',
        }}>
          {formats.map((format) => (
            <Card
              key={format.slug}
              href={format.href}
              className="format-card"
              style={{ height: '100%' }}
            >
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                height: '220px',
                background: '#f5f3ef',
                flexShrink: 0,
              }}>
                <Image
                  src={format.image}
                  alt={format.title}
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
                <ImageBadge label={format.tag} />
                <span style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '1.15rem',
                  fontWeight: 500,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  textShadow: '0 2px 20px rgba(0, 0, 0, 0.15)',
                }}>
                  {format.title}
                </span>
              </div>

              <div style={{
                padding: '1.8rem 2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}>
                <div style={{
                  width: '32px',
                  height: '2px',
                  background: '#0f766e',
                  opacity: 0.06,
                  marginBottom: '1rem',
                  borderRadius: '4px',
                  transition: 'all 0.5s ease',
                  flexShrink: 0,
                }} />
                <h3 style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: '#1a1814',
                  margin: '0 0 0.4rem',
                  transition: 'color 0.4s ease',
                  flexShrink: 0,
                }}>
                  {format.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.88rem',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: 1.8,
                  fontWeight: 300,
                  flex: 1,
                }}>
                  {format.description}
                </p>
                {/* EXPLORE BUTTON REMOVED */}
              </div>
            </Card>
          ))}
        </div>

        <style>{`
          .format-card:hover .format-card-img {
            transform: scale(1.05);
          }
          .format-card:hover .format-card-overlay {
            opacity: 0.3;
          }
          .format-card:hover .format-card-line {
            opacity: 0.15;
            width: 48px;
          }
          .format-card:hover .format-card-title {
            color: #0f766e;
          }
          @media (max-width: 1024px) {
            .formats-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1.5rem;
            }
          }
          @media (max-width: 640px) {
            .formats-grid {
              grid-template-columns: 1fr;
              gap: 1.2rem;
            }
            .format-card-img-wrap {
              height: 200px;
            }
            .format-card-body {
              padding: 1.5rem 1.5rem 1.8rem;
            }
            .format-card-title {
              font-size: 1rem;
            }
            .format-card-desc {
              font-size: 0.85rem;
            }
          }
          @media (max-width: 480px) {
            .format-card-img-wrap {
              height: 180px;
            }
            .format-card-body {
              padding: 1.2rem 1.2rem 1.5rem;
            }
            .format-card-title {
              font-size: 0.95rem;
            }
            .format-card-desc {
              font-size: 0.82rem;
            }
            .format-card-img-title {
              font-size: 1rem;
            }
          }
        `}</style>
      </Container>
    </Section>
  );
}