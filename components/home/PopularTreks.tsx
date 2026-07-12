'use client';

import { getAllTreks } from '@/lib/treks';
import {
  SectionHeading,
  Section,
  Card,
  CardDivider,
  NumberBadge,
  ArrowLink,
  PillButton,
} from '@/components/ui';

const PopularTreks = () => {
  const allTreks = getAllTreks();
  const featuredTreks = allTreks.slice(0, 4);

  return (
    <Section className="popular-treks" style={{ background: '#ffffff', padding: '7rem 0' }}>
      <style>{`
        .popular-treks::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 80% 20%, rgba(15, 118, 110, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(139, 115, 85, 0.02) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .popular-treks-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }

        /* Grid */
        .popular-treks-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          animation: fadeUp 0.9s ease 0.3s both;
        }

        .trek-card-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: #1a1814;
          margin: 0 0 0.4rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
          transition: color 0.4s ease;
        }
        .ui-card:hover .trek-card-title {
          color: #0f766e;
        }

        .trek-card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-items: center;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.72rem;
          color: #6b7280;
          font-weight: 300;
          letter-spacing: 0.02em;
        }

        .trek-card-meta-dot {
          color: #0f766e;
          opacity: 0.2;
        }

        .trek-card-cta-wrap {
          margin-top: 1.2rem;
        }

        /* View All Footer */
        .popular-treks-footer {
          margin-top: 4rem;
          text-align: center;
          animation: fadeUp 0.8s ease 0.5s both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .popular-treks-grid {
            gap: 1.5rem;
          }
        }

        @media (max-width: 1024px) {
          .popular-treks-container {
            padding: 0 3rem;
          }
          .popular-treks-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 900px) {
          .popular-treks {
            padding: 5rem 0 !important;
          }
          .popular-treks-container {
            padding: 0 2rem;
          }
        }

        @media (max-width: 640px) {
          .popular-treks {
            padding: 4rem 0 !important;
          }
          .popular-treks-container {
            padding: 0 1.5rem;
          }
          .popular-treks-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .trek-card-title {
            font-size: 0.95rem;
          }
          .trek-card-meta {
            font-size: 0.7rem;
          }
          .trek-card-cta-wrap {
            margin-top: 1rem;
          }
        }

        @media (max-width: 480px) {
          .popular-treks-container {
            padding: 0 1.2rem;
          }
          .trek-card-title {
            font-size: 0.9rem;
          }
          .trek-card-meta {
            font-size: 0.65rem;
          }
          .trek-card-cta-wrap {
            margin-top: 0.8rem;
          }
        }
      `}</style>

      <div className="popular-treks-container">
        <SectionHeading
          eyebrow="Popular Treks"
          title="Our Most Sought Treks"
        />

        {/* Cards */}
        <div className="popular-treks-grid">
          {featuredTreks.map((trek, index) => (
            <Card
              key={trek.slug}
              href={`/treks/location/${trek.locationId}/${trek.slug}`}
              padded
            >
              <NumberBadge value={index + 1} />
              <CardDivider />
              <h3 className="trek-card-title">{trek.title}</h3>
              <p className="trek-card-meta">
                <span>{trek.difficulty}</span>
                <span className="trek-card-meta-dot">·</span>
                <span>{trek.duration}</span>
              </p>
              <div className="trek-card-cta-wrap">
                <ArrowLink>Explore</ArrowLink>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="popular-treks-footer">
          <PillButton href="/treks">View all treks</PillButton>
        </div>
      </div>
    </Section>
  );
};

export default PopularTreks;