'use client';

import Image from 'next/image';
import { Section, Container } from '@/components/ui';
import { journeyAboutContent } from '@/content/retreats/Journey/about';

interface JourneyAboutProps {
  description: string;
  galleryImages?: readonly { src: string; alt: string; objectPosition?: string }[];
}

export default function JourneyAbout({
  description,
  galleryImages,
}: JourneyAboutProps) {
  const content = journeyAboutContent;

  return (
    <Section
      id="about-this-retreat"
      style={{
        background: '#ffffff',
        padding: '5rem 0',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <style>{`
        .ja-gallery {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.1rem;
          margin-top: 3rem;
        }
        .ja-gallery-item {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          box-shadow: 0 10px 30px rgba(15,23,20,0.08);
          border: 1px solid rgba(15,118,110,0.08);
        }
        .ja-gallery-item img {
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
          display: block;
        }
        .ja-gallery-item:hover img {
          transform: scale(1.045);
        }
        .ja-gallery-item::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(200deg, rgba(15,118,110,0.16), transparent 45%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .ja-gallery-item:hover::after {
          opacity: 1;
        }
        @media (max-width: 640px) {
          .ja-gallery {
            gap: 0.7rem;
          }
        }
        @media (max-width: 420px) {
          .ja-gallery {
            gap: 0.5rem;
          }
        }
      `}</style>

      <Container>
        <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '2rem',
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

          <div style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.95rem',
            lineHeight: 1.95,
            color: '#3a3a3a',
            fontWeight: 300,
            margin: 0,
            whiteSpace: 'pre-wrap',
            paddingLeft: '2rem',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: '0.3rem',
              bottom: '0.3rem',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--color-primary), transparent)',
              borderRadius: '2px',
            }} />
            {description}
          </div>

          {galleryImages && galleryImages.length > 0 && (
            <div className="ja-gallery">
              {galleryImages.map((img, i) => (
                <div key={i} className="ja-gallery-item">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={600}
                    loading="lazy"
                    quality={70}
                    sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 25vw"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: img.objectPosition || 'center',
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
