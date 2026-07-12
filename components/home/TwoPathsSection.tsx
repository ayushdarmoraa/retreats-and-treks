'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Section, Card, ArrowLink, SectionHeading } from '@/components/ui';
import { twoPathsData } from '@/content/home/twoPaths';
import { logWhatsAppOpen } from '@/lib/analytics';

export default function TwoPathsSection() {
  return (
    <Section className="two-paths-section" style={{ background: '#ffffff', padding: '7rem 0' }}>
      <style>{`
        .two-paths-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 30% 20%, rgba(15, 118, 110, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(139, 115, 85, 0.02) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .two-paths-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }

        .two-paths-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
          animation: fadeUp 0.9s ease 0.3s both;
        }

        .path-card-img-wrap {
          position: relative;
          overflow: hidden;
          height: 400px;
          background: #f5f3ef;
        }

        .path-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ui-card:hover .path-card-img {
          transform: scale(1.05);
        }

        .path-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(26, 24, 20, 0.7) 0%,
            rgba(26, 24, 20, 0.1) 50%,
            transparent 100%
          );
          opacity: 0.8;
          transition: opacity 0.5s ease;
        }
        .ui-card:hover .path-card-overlay {
          opacity: 0.5;
        }

        .path-img-label {
          position: absolute;
          bottom: 2.5rem;
          left: 2.5rem;
          right: 2.5rem;
        }

        .path-img-tag {
          display: inline-block;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ffffff;
          background: rgba(15, 118, 110, 0.85);
          backdrop-filter: blur(8px);
          padding: 0.4rem 1rem;
          border-radius: 100px;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 0.8rem;
        }

        .path-img-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 2rem;
          font-weight: 200;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        }

        .path-img-title small {
          display: block;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.8rem;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 0.3rem;
          letter-spacing: 0.02em;
          text-shadow: none;
        }

        .path-card-body {
          padding: 2rem 2.5rem 2.5rem;
          position: relative;
        }

        .path-card-body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 2.5rem;
          right: 2.5rem;
          height: 2px;
          background: linear-gradient(90deg, 
            #0f766e, 
            rgba(15, 118, 110, 0.1) 40%, 
            transparent 80%
          );
          opacity: 0.08;
          border-radius: 4px;
        }

        .path-card-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.95rem;
          line-height: 1.9;
          color: #6b7280;
          margin: 0 0 1.5rem;
          font-weight: 300;
          letter-spacing: 0.005em;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .two-paths-container {
            padding: 0 3rem;
          }
          .two-paths-grid {
            gap: 2rem;
          }
          .path-card-img-wrap {
            height: 350px;
          }
          .path-img-title {
            font-size: 1.8rem;
          }
          .path-card-body {
            padding: 1.8rem 2rem 2rem;
          }
          .path-card-body::before {
            left: 2rem;
            right: 2rem;
          }
        }

        @media (max-width: 900px) {
          .two-paths-section {
            padding: 5rem 0 !important;
          }
          .two-paths-container {
            padding: 0 2rem;
          }
          .two-paths-grid {
            gap: 1.5rem;
          }
          .path-card-img-wrap {
            height: 300px;
          }
          .path-img-title {
            font-size: 1.5rem;
          }
          .path-img-label {
            bottom: 2rem;
            left: 2rem;
            right: 2rem;
          }
          .path-card-body {
            padding: 1.5rem 1.5rem 1.8rem;
          }
          .path-card-body::before {
            left: 1.5rem;
            right: 1.5rem;
          }
          .path-card-desc {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 768px) {
          .two-paths-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .path-card-img-wrap {
            height: 280px;
          }
          .path-img-title {
            font-size: 1.6rem;
          }
          .path-img-label {
            bottom: 1.8rem;
            left: 1.8rem;
            right: 1.8rem;
          }
        }

        @media (max-width: 480px) {
          .two-paths-section {
            padding: 4rem 0 !important;
          }
          .two-paths-container {
            padding: 0 1.2rem;
          }
          .path-card-img-wrap {
            height: 240px;
          }
          .path-img-title {
            font-size: 1.3rem;
          }
          .path-img-tag {
            font-size: 0.5rem;
            padding: 0.3rem 0.8rem;
          }
          .path-img-label {
            bottom: 1.2rem;
            left: 1.2rem;
            right: 1.2rem;
          }
          .path-card-body {
            padding: 1.2rem 1.2rem 1.5rem;
          }
          .path-card-body::before {
            left: 1.2rem;
            right: 1.2rem;
          }
          .path-card-desc {
            font-size: 0.85rem;
            line-height: 1.8;
            margin-bottom: 1rem;
          }
        }
      `}</style>

      <div className="two-paths-container">
        <SectionHeading
          eyebrow="Choose Your Journey"
          title="Two Paths Forward"
        />

        <div className="two-paths-grid">
          {twoPathsData.map((path) => (
            <Card
              key={path.id}
              href={`/${path.slug}`}
              className="path-card"
              onClick={() => logWhatsAppOpen('/')}
            >
              <div className="path-card-img-wrap">
                <Image
                  src={path.image.src}
                  alt={path.image.alt}
                  width={1200}
                  height={675}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="path-card-img"
                  quality={85}
                />
                <div className="path-card-overlay" />
                <div className="path-img-label">
                  <span className="path-img-tag">{path.tag}</span>
                  <div className="path-img-title">
                    {path.title}
                    <small>{path.subtitle}</small>
                  </div>
                </div>
              </div>
              <div className="path-card-body">
                <p className="path-card-desc">{path.description}</p>
                <ArrowLink>Explore {path.slug}</ArrowLink>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}