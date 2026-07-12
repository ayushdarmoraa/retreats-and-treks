'use client';

import { Section, SectionHeading, Card, NumberBadge, CardDivider } from '@/components/ui';

const HowItWorks = () => {
  return (
    <Section className="how-it-works" style={{ background: '#f7f9f7', padding: '7rem 0' }}>
      <style>{`
        .how-it-works::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 30% 20%, rgba(15, 118, 110, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(139, 115, 85, 0.02) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .how-it-works-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }

        /* Grid */
        .how-it-works-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          animation: fadeUp 0.9s ease 0.3s both;
        }

        /* Card Header */
        .step-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          margin-bottom: 1.5rem;
        }

        /* Icon */
        .step-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 14px;
          background: rgba(15, 118, 110, 0.04);
          border: 1px solid rgba(15, 118, 110, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s ease;
          color: #0f766e;
          opacity: 0.4;
        }
        .ui-card:hover .step-icon {
          background: rgba(15, 118, 110, 0.08);
          border-color: rgba(15, 118, 110, 0.12);
          opacity: 0.7;
          transform: scale(1.05) rotate(-2deg);
        }

        .step-icon svg {
          width: 20px;
          height: 20px;
        }

        /* Content */
        .step-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .step-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.15rem;
          font-weight: 500;
          color: #1a1814;
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1.3;
          transition: color 0.4s ease;
        }
        .ui-card:hover .step-title {
          color: #0f766e;
        }

        .step-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.9rem;
          line-height: 1.9;
          color: #6b7280;
          margin: 0;
          font-weight: 300;
          letter-spacing: 0.005em;
          transition: color 0.4s ease;
        }
        .ui-card:hover .step-desc {
          color: #4b5563;
        }

        /* Arrow between cards */
        .step-arrow {
          display: none;
        }
        @media (min-width: 769px) {
          .step-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: -1.5rem;
            top: 50%;
            transform: translateY(-50%);
            width: 2.2rem;
            height: 2.2rem;
            background: #ffffff;
            border: 1px solid rgba(15, 118, 110, 0.08);
            border-radius: 50%;
            font-size: 0.65rem;
            color: #6b7280;
            z-index: 2;
            transition: all 0.3s ease;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          }
          .ui-card:hover .step-arrow {
            background: rgba(15, 118, 110, 0.04);
            border-color: rgba(15, 118, 110, 0.15);
            color: #0f766e;
            transform: translateY(-50%) scale(1.05);
          }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .how-it-works-container {
            padding: 0 3rem;
          }
          .how-it-works-grid {
            gap: 2rem;
          }
        }

        @media (max-width: 900px) {
          .how-it-works {
            padding: 5rem 0 !important;
          }
          .how-it-works-container {
            padding: 0 2rem;
          }
          .how-it-works-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .step-arrow {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .how-it-works {
            padding: 4rem 0 !important;
          }
          .how-it-works-container {
            padding: 0 1.5rem;
          }
          .step-icon {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 12px;
          }
          .step-icon svg {
            width: 16px;
            height: 16px;
          }
          .step-title {
            font-size: 1rem;
          }
          .step-desc {
            font-size: 0.85rem;
            line-height: 1.8;
          }
        }

        @media (max-width: 480px) {
          .how-it-works-container {
            padding: 0 1.2rem;
          }
          .step-icon {
            width: 2.2rem;
            height: 2.2rem;
            border-radius: 10px;
          }
          .step-icon svg {
            width: 14px;
            height: 14px;
          }
          .step-title {
            font-size: 0.95rem;
          }
          .step-desc {
            font-size: 0.82rem;
            line-height: 1.7;
          }
        }
      `}</style>

      <div className="how-it-works-container">
        <SectionHeading
          eyebrow="The Process"
          title="How This Works"
        />

        {/* Cards */}
        <div className="how-it-works-grid">
          {[
            {
              step: 1,
              title: "You share what you're seeking",
              desc: "Your intention, what's happening in your life, what a retreat would need to be.",
              icon: (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              ),
            },
            {
              step: 2,
              title: 'We help you choose the right land',
              desc: 'Which location and which retreat format makes sense — or we suggest something unexpected.',
              icon: (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
                </svg>
              ),
            },
            {
              step: 3,
              title: 'Your journey takes shape',
              desc: 'In conversation. Not checkout pages, not templates. A retreat designed for you.',
              icon: (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4l3 3"/>
                </svg>
              ),
            },
          ].map((item, i, arr) => (
            <Card key={item.step} padded className="step-card">
              <div className="step-card-header">
                <NumberBadge value={item.step} className="step-num" />
                <div className="step-icon">{item.icon}</div>
              </div>
              <CardDivider className="step-card-line" />
              <div className="step-content">
                <h3 className="step-title">{item.title}</h3>
                <p className="step-desc">{item.desc}</p>
              </div>
              {i < arr.length - 1 && (
                <div className="step-arrow">→</div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default HowItWorks;