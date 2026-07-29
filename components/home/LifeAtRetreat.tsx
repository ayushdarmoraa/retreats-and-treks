'use client';

import Image from 'next/image';
import { images } from '@/lib/images';
import { Section, SectionHeading, Card, ImageBadge } from '@/components/ui';

interface LifeItem {
  image: {
    src: string;
    alt: string;
  };
  tag: string;
  title: string;
  desc: string;
}

const LifeAtRetreat = () => {
  const lifeItems: LifeItem[] = [
    {
      image: images.moments.meditation,
      tag: '🧘 Meditation',
      title: 'Stillness in the Mountains',
      desc: 'Morning practice as mist lifts over the valley. Breathwork, silence, and the sound of wind.',
    },
    {
      image: images.moments.walking,
      tag: '🚶 Walking',
      title: 'Trails That Clear the Mind',
      desc: 'Forest paths, ridge walks, and the kind of quiet that only mountains offer.',
    },
    {
      image: images.moments.tea,
      tag: '🍵 Tea Vibes',
      title: 'Evenings Around the Fire',
      desc: 'Chai, conversation, and the warmth of a fire as the Himalayas turn golden.',
    },
  ];

  return (
    <Section
      className="life-at-retreat"
      style={{ background: '#f7f9f7', padding: '7rem 0', borderBottom: '1px solid rgba(0, 0, 0, 0.04)' }}
    >
      <style>{`
        .life-at-retreat::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 30% 20%, rgba(15, 118, 110, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(139, 115, 85, 0.02) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .life-at-retreat-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }

        .life-at-retreat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          animation: fadeUp 0.9s ease 0.3s both;
        }

        .life-card-img-wrap {
          position: relative;
          width: 100%;
          height: 420px;
          overflow: hidden;
          background: #f5f3ef;
        }

        .life-card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .ui-card:hover .life-card-img-wrap img {
          transform: scale(1.04);
        }

        .life-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(26, 24, 20, 0.7) 0%,
            rgba(26, 24, 20, 0.1) 45%,
            transparent 100%
          );
          opacity: 0.8;
          transition: opacity 0.5s ease;
          z-index: 1;
        }
        .ui-card:hover .life-card-overlay {
          opacity: 0.5;
        }

        .life-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem 2rem 2.2rem;
          z-index: 2;
        }

        .life-card-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.3rem;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 0.4rem;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
        }

        .life-card-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 300;
          line-height: 1.7;
          margin: 0;
          opacity: 1;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .ui-card:hover .life-card-desc {
          color: rgba(255, 255, 255, 0.8);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .life-at-retreat-container {
            padding: 0 3rem;
          }
          .life-at-retreat-grid {
            gap: 1.5rem;
          }
          .life-card-img-wrap {
            height: 360px;
          }
        }

        @media (max-width: 900px) {
          .life-at-retreat {
            padding: 5rem 0 !important;
          }
          .life-at-retreat-container {
            padding: 0 2rem;
          }
          .life-at-retreat-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .life-card-img-wrap {
            height: 320px;
          }
        }

        @media (max-width: 640px) {
          .life-at-retreat {
            padding: 4rem 0 !important;
          }
          .life-at-retreat-container {
            padding: 0 1.5rem;
          }
          .life-at-retreat-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
          .life-card-img-wrap {
            height: 280px;
          }
          .life-card-content {
            padding: 1.5rem 1.5rem 1.8rem;
          }
          .life-card-title {
            font-size: 1.1rem;
          }
          .life-card-desc {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .life-at-retreat-container {
            padding: 0 1.2rem;
          }
          .life-card-img-wrap {
            height: 240px;
          }
          .life-card-content {
            padding: 1.2rem 1.2rem 1.5rem;
          }
          .life-card-title {
            font-size: 1rem;
          }
          .life-card-desc {
            font-size: 0.75rem;
            line-height: 1.6;
          }
        }
      `}</style>

      <div className="life-at-retreat-container">
        <SectionHeading
          eyebrow="Life at the Retreat"
          title="Mountains. People. Moments."
        />

        <div className="life-at-retreat-grid">
          {lifeItems.map((item, index) => (
            <Card key={index} className="life-card">
              <div className="life-card-img-wrap">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={800}
                  height={533}
                  sizes="(max-width: 580px) 100vw, (max-width: 900px) 50vw, 33vw"
                  quality={85}
                />
              </div>
              <div className="life-card-overlay" />
              <ImageBadge label={item.tag} className="life-card-tag-position" />
              <div className="life-card-content">
                <div className="life-card-title">{item.title}</div>
                <p className="life-card-desc">{item.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default LifeAtRetreat;
