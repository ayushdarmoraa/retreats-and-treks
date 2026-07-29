'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Section, Container, Card, ImageBadge } from '@/components/ui';
import SectionHeading from '@/components/ui/SectionHeading';
import { getAllIntentions } from '@/content/retreats/intentions';
import { logIntentClick } from '@/lib/analytics';

export default function RetreatIntentions() {
  const intentions = getAllIntentions();
  
  // Count items to fill grid
  const itemsToShow: Array<ReturnType<typeof getAllIntentions>[number] | null> = [...intentions];
  const remainingItems = itemsToShow.length % 3;
  
  // Add empty placeholders if needed
  if (remainingItems === 1) {
    itemsToShow.push(null, null); // Add 2 empty placeholders
  } else if (remainingItems === 2) {
    itemsToShow.push(null); // Add 1 empty placeholder
  }

  return (
    <Section
      className="intentions-section"
      style={{
        background: '#f7f9f7',
        padding: '7rem 0',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="Retreat pathways"
          title="Choose the Retreat That Matches Your Intention"
          description="Each pathway is designed around a different need — rest, movement, silence, creativity, sound healing, or a fully private retreat."
        />

        <div className="intentions-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          marginTop: '3rem',
        }}>
          {itemsToShow.map((intention, index) => {
            // Empty placeholder - invisible card
            if (!intention) {
              return (
                <div 
                  key={`placeholder-${index}`} 
                  style={{ 
                    visibility: 'hidden',
                    height: '0',
                    padding: '0',
                    margin: '0',
                  }}
                />
              );
            }
            
            return (
              <Card
                key={intention.slug}
                href={intention.slug === 'art' ? '/retreats/art' : `/retreats/journeys/${intention.slug}`}
                onClick={() => logIntentClick(intention.slug, undefined, '/retreats')}
                className="intention-card"
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
                    src={intention.image}
                    alt={intention.title}
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
                  <ImageBadge label="Retreat" />
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
                    {intention.title}
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
                    {intention.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.88rem',
                    color: '#6b7280',
                    margin: '0 0 1.2rem',
                    lineHeight: 1.8,
                    fontWeight: 300,
                    flex: 1,
                  }}>
                    {intention.description}
                  </p>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#0f766e',
                    transition: 'all 0.3s ease',
                    borderBottom: '2px solid rgba(15, 118, 110, 0.08)',
                    paddingBottom: '0.25rem',
                    width: 'fit-content',
                    flexShrink: 0,
                    marginTop: 'auto',
                  }}>
                    Learn more <span style={{
                      transition: 'transform 0.3s ease',
                      display: 'inline-block',
                    }}>→</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <style>{`
          .intention-card:hover .intention-card-img {
            transform: scale(1.05);
          }
          .intention-card:hover .intention-card-overlay {
            opacity: 0.3;
          }
          .intention-card:hover .intention-card-line {
            opacity: 0.15;
            width: 48px;
          }
          .intention-card:hover .intention-card-title {
            color: #0f766e;
          }
          .intention-card:hover .intention-card-cta {
            gap: 0.8rem;
            border-bottom-color: rgba(15, 118, 110, 0.25);
          }
          .intention-card:hover .intention-card-arrow {
            transform: translateX(4px);
          }
          @media (max-width: 1024px) {
            .intentions-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1.5rem;
            }
          }
          @media (max-width: 640px) {
            .intentions-grid {
              grid-template-columns: 1fr;
              gap: 1.2rem;
            }
            .intention-card-img-wrap {
              height: 200px;
            }
            .intention-card-body {
              padding: 1.5rem 1.5rem 1.8rem;
            }
            .intention-card-title {
              font-size: 1rem;
            }
            .intention-card-desc {
              font-size: 0.85rem;
            }
          }
          @media (max-width: 480px) {
            .intention-card-img-wrap {
              height: 180px;
            }
            .intention-card-body {
              padding: 1.2rem 1.2rem 1.5rem;
            }
            .intention-card-title {
              font-size: 0.95rem;
            }
            .intention-card-desc {
              font-size: 0.82rem;
            }
            .intention-card-img-title {
              font-size: 1rem;
            }
            .intention-card-cta {
              font-size: 0.6rem;
            }
          }
        `}</style>
      </Container>
    </Section>
  );
}
