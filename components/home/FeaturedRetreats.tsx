'use client';

import { getAllRetreatServices } from '@/content/retreats/services';
import { CardImage } from '@/components/images';
import {
  SectionHeading,
  Section,
  Card,
  CardDivider,
  ArrowLink,
  ImageBadge,
  PillButton,
} from '@/components/ui';
import { featuredRetreatsMeta, featuredRetreatsSlugs } from '@/content/home/featuredRetreats';

// ── Type Definitions ──
interface RetreatService {
  slug: string;
  title: string;
  oneLineEssence: string;
  [key: string]: any;
}

interface RetreatWithMeta extends RetreatService {
  image: { src: string; alt: string };
  tag: string;
}

const FeaturedRetreats = () => {
  const retreats: RetreatWithMeta[] = getAllRetreatServices()
    .filter((s: RetreatService) => featuredRetreatsSlugs.includes(s.slug))
    .map((retreat: RetreatService) => ({
      ...retreat,
      ...(featuredRetreatsMeta[retreat.slug] ?? {
        image: { src: '/Images/location/chakrata.webp', alt: retreat.title },
        tag: 'Retreat',
      })
    }));

  return (
    <Section className="featured-retreats" style={{ background: '#f7f9f7', padding: '7rem 0' }}>
      <style>{`
        .featured-retreats::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 80% 20%, rgba(15, 118, 110, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(139, 115, 85, 0.02) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .featured-retreats-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }

        /* Cards Grid */
        .featured-retreats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          animation: fadeUp 0.9s ease 0.3s both;
        }

        /* Image wrapper */
        .retreat-card-img-wrap {
          position: relative;
          overflow: hidden;
          height: 260px;
          background: #f5f3ef;
        }

        .retreat-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .ui-card:hover .retreat-card-img {
          transform: scale(1.04);
        }

        .retreat-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(26, 24, 20, 0.5) 0%,
            rgba(26, 24, 20, 0.05) 40%,
            transparent 100%
          );
          opacity: 0.85;
          transition: opacity 0.5s ease;
        }
        .ui-card:hover .retreat-card-overlay {
          opacity: 0.4;
        }

        .retreat-card-img-title {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.1rem;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.01em;
          opacity: 0.95;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
        }

        /* Body */
        .retreat-card-body {
          padding: 1.8rem 2rem 2rem;
          position: relative;
        }

        .retreat-card-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.15rem;
          font-weight: 500;
          color: #1a1814;
          margin: 0 0 0.4rem;
          letter-spacing: -0.02em;
          line-height: 1.25;
          transition: color 0.4s ease;
        }
        .ui-card:hover .retreat-card-title {
          color: #0f766e;
        }

        .retreat-card-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.85rem;
          line-height: 1.8;
          color: #6b7280;
          margin: 0 0 1rem;
          font-weight: 300;
          letter-spacing: 0.005em;
          transition: color 0.4s ease;
        }
        .ui-card:hover .retreat-card-desc {
          color: #4b5563;
        }

        /* View All Footer */
        .featured-retreats-footer {
          margin-top: 4rem;
          text-align: center;
          animation: fadeUp 0.8s ease 0.5s both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .featured-retreats-container {
            padding: 0 3rem;
          }
          .featured-retreats-grid {
            gap: 1.5rem;
          }
          .retreat-card-img-wrap {
            height: 220px;
          }
        }

        @media (max-width: 900px) {
          .featured-retreats {
            padding: 5rem 0 !important;
          }
          .featured-retreats-container {
            padding: 0 2rem;
          }
          .featured-retreats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
          .retreat-card-img-wrap {
            height: 200px;
          }
          .retreat-card-body {
            padding: 1.5rem 1.5rem 1.8rem;
          }
        }

        @media (max-width: 768px) {
          .featured-retreats {
            padding: 4rem 0 !important;
          }
          .featured-retreats-container {
            padding: 0 1.5rem;
          }
          .featured-retreats-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
          .retreat-card-img-wrap {
            height: 200px;
          }
          .retreat-card-body {
            padding: 1.2rem 1.5rem 1.5rem;
          }
          .retreat-card-title {
            font-size: 1.1rem;
          }
          .retreat-card-img-title {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .featured-retreats-container {
            padding: 0 1.2rem;
          }
          .retreat-card-img-wrap {
            height: 180px;
          }
          .retreat-card-body {
            padding: 1rem 1.2rem 1.2rem;
          }
          .retreat-card-title {
            font-size: 1rem;
          }
          .retreat-card-desc {
            font-size: 0.82rem;
            line-height: 1.8;
          }
          .retreat-card-img-title {
            font-size: 0.9rem;
            bottom: 1rem;
            left: 1rem;
            right: 1rem;
          }
        }
      `}</style>

      <div className="featured-retreats-container">
        <SectionHeading
          eyebrow="Curated Experiences"
          title="Featured Retreat Journeys"
        />

        {/* Cards */}
        <div className="featured-retreats-grid">
          {retreats.map((retreat) => (
            <Card key={retreat.slug} href={`/retreats/journeys/${retreat.slug}`}>
              {/* Image */}
              <div className="retreat-card-img-wrap">
                <CardImage image={retreat.image} className="retreat-card-img" />
                <div className="retreat-card-overlay" />
                <ImageBadge label={retreat.tag} />
                <span className="retreat-card-img-title">{retreat.title}</span>
              </div>

              {/* Body */}
              <div className="retreat-card-body">
                <CardDivider />
                <h3 className="retreat-card-title">{retreat.title}</h3>
                <p className="retreat-card-desc">{retreat.oneLineEssence}</p>
                <ArrowLink>Explore</ArrowLink>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="featured-retreats-footer">
          <PillButton href="/retreats">View All Journeys</PillButton>
        </div>
      </div>
    </Section>
  );
};

export default FeaturedRetreats;
