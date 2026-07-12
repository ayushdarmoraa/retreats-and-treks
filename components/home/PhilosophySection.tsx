'use client';

import { SectionHeading, Section, Card, CardDivider, NumberBadge } from '@/components/ui';
import { philosophyCards } from '@/content/home/philosophy';

export default function PhilosophySection() {
  return (
    <Section
      className="philosophy-section"
      style={{
        marginBottom: '0',
        marginTop: '-4rem',
        background: '#f7f9f7',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .philosophy-section {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f7f9f7;
          min-height: 100vh;
        }

        .philosophy-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 15% 20%, rgba(15, 118, 110, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 80%, rgba(15, 118, 110, 0.02) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .philosophy-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 7rem 5rem 0;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .philosophy-header {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 4rem;
          align-items: flex-end;
          padding-bottom: 3.5rem;
          border-bottom: 1px solid rgba(15, 118, 110, 0.06);
          animation: fadeUp 0.8s ease 0.1s both;
        }

        .philosophy-intro {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          line-height: 2;
          color: #6b7280;
          font-weight: 400;
          max-width: 420px;
          align-self: flex-end;
          padding-bottom: 0.2rem;
          padding-left: 2rem;
          border-left: 2px solid rgba(15, 118, 110, 0.08);
          letter-spacing: 0.01em;
        }
        .philosophy-intro strong {
          color: #1a1814;
          font-weight: 500;
        }
        .philosophy-intro em {
          font-style: italic;
          color: #0f766e;
          font-weight: 500;
        }

        /* Cards Grid */
        .philosophy-cards-wrap {
          padding: 0 5rem;
          margin-top: 2rem;
          position: relative;
          z-index: 1;
        }
        .philosophy-cards {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 2rem;
          animation: fadeUp 0.9s ease 0.3s both;
        }

        /* Override Card's default padding for this section's larger card size */
        .philosophy-card-item {
          padding: 3.5rem 2.8rem 3rem !important;
          cursor: default;
        }

        .philosophy-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #1a1814;
          margin-bottom: 0.8rem;
          line-height: 1.25;
          position: relative;
          z-index: 1;
          transition: color 0.4s ease;
        }
        .ui-card:hover .philosophy-card-title {
          color: #0f766e;
        }

        .philosophy-card-body {
          font-family: 'Inter', sans-serif;
          font-size: 0.92rem;
          line-height: 2;
          color: #6b7280;
          font-weight: 400;
          margin: 0;
          letter-spacing: 0.005em;
          position: relative;
          z-index: 1;
          transition: color 0.4s ease;
        }
        .ui-card:hover .philosophy-card-body {
          color: #4b5563;
        }

        .philosophy-bottom {
          padding: 4.5rem 5rem 4rem;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .philosophy-bottom-line {
          max-width: 60px;
          margin: 0 auto;
          height: 1px;
          background: linear-gradient(90deg, #0f766e, rgba(15, 118, 110, 0.02));
          border-radius: 4px;
          opacity: 0.2;
        }

        @media (max-width: 1024px) {
          .philosophy-container {
            padding: 6rem 3rem 0;
          }
          .philosophy-cards-wrap {
            padding: 0 3rem;
          }
          .philosophy-cards {
            gap: 1.5rem;
          }
          .philosophy-card-item {
            padding: 3rem 2rem 2.5rem !important;
          }
        }

        @media (max-width: 900px) {
          .philosophy-container {
            padding: 5rem 2rem 0;
          }
          .philosophy-header {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding-bottom: 2.5rem;
          }
          .philosophy-intro {
            max-width: 100%;
            padding-left: 1.2rem;
            border-left: 2px solid rgba(15, 118, 110, 0.05);
            font-size: 0.9rem;
          }
          .philosophy-cards-wrap {
            padding: 0 2rem;
          }
          .philosophy-cards {
            grid-template-columns: 1fr 1fr;
            gap: 1.2rem;
          }
          .philosophy-bottom {
            padding: 3.5rem 2rem 3rem;
          }
        }

        @media (max-width: 768px) {
          .philosophy-container {
            padding: 4rem 1.5rem 0;
          }
          .philosophy-cards-wrap {
            padding: 0 1.5rem;
          }
          .philosophy-cards {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .philosophy-card-item {
            padding: 2.5rem 1.8rem 2rem !important;
          }
          .philosophy-card-title {
            font-size: 1.3rem;
          }
          .philosophy-card-body {
            font-size: 0.88rem;
          }
        }

        @media (max-width: 480px) {
          .philosophy-container {
            padding: 3.5rem 1.2rem 0;
          }
          .philosophy-cards-wrap {
            padding: 0 1.2rem;
          }
          .philosophy-card-item {
            padding: 2rem 1.4rem 1.8rem !important;
          }
          .philosophy-card-title {
            font-size: 1.1rem;
          }
          .philosophy-card-body {
            font-size: 0.85rem;
            line-height: 1.9;
          }
          .philosophy-intro {
            font-size: 0.85rem;
            padding-left: 0.8rem;
          }
        }
      `}</style>

      <div className="philosophy-container">
        {/* Header */}
        <div className="philosophy-header">
          <div>
            <SectionHeading
              eyebrow="Our Philosophy"
              title="How We Work"
              className="mb-0 text-left"
            />
          </div>
          <p className="philosophy-intro">
            Every journey begins with a <em>conversation</em> — not a checkout page.
            We take time to understand what you&apos;re really looking for before <strong>suggesting anything</strong>.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="philosophy-cards-wrap">
        <div className="philosophy-cards">
          {philosophyCards.map((card) => (
            <Card key={card.id} className="philosophy-card-item">
              <NumberBadge value={card.id} serif />
              <h3 className="philosophy-card-title">{card.title}</h3>
              <p className="philosophy-card-body">{card.body}</p>
              <CardDivider />
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="philosophy-bottom">
        <div className="philosophy-bottom-line" />
      </div>
    </Section>
  );
}