'use client';

import { Section, SectionHeading } from '@/components/ui';

const NotAPackageDeal = () => {
  return (
    <Section className="not-package" style={{ background: '#f7f9f7', padding: '7rem 0' }}>
      <style>{`
        .not-package::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 30% 20%, rgba(15, 118, 110, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(139, 115, 85, 0.02) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .not-package-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }

        /* Grid - 2 column with border */
        .not-package-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          animation: fadeUp 0.9s ease 0.3s both;
        }

        /* Item */
        .not-package-item {
          padding: 2.5rem 2.5rem;
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          transition: all 0.4s ease;
          position: relative;
        }

        .not-package-item:nth-last-child(-n+2) {
          border-bottom: none;
        }

        .not-package-item:nth-child(odd) {
          border-right: 1px solid #e5e7eb;
        }

        .not-package-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #0f766e;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .not-package-item:hover::before {
          transform: scaleY(1);
        }

        .not-package-num {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 3rem;
          font-weight: 300;
          color: #0f766e;
          opacity: 0.08;
          line-height: 1;
          flex-shrink: 0;
          margin-top: -0.2rem;
          letter-spacing: -0.04em;
          min-width: 3.5rem;
          transition: opacity 0.4s ease;
        }
        .not-package-item:hover .not-package-num {
          opacity: 0.15;
        }

        .not-package-content {
          flex: 1;
        }

        .not-package-content-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.3rem;
        }

        .not-package-icon {
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 10px;
          background: rgba(15, 118, 110, 0.04);
          border: 1px solid rgba(15, 118, 110, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f766e;
          opacity: 0.3;
          transition: all 0.5s ease;
          flex-shrink: 0;
        }
        .not-package-item:hover .not-package-icon {
          background: rgba(15, 118, 110, 0.08);
          border-color: rgba(15, 118, 110, 0.12);
          opacity: 0.6;
          transform: scale(1.05);
        }

        .not-package-icon svg {
          width: 16px;
          height: 16px;
        }

        .not-package-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #1a1814;
          letter-spacing: -0.01em;
          line-height: 1.3;
          margin: 0;
          transition: color 0.4s ease;
        }
        .not-package-item:hover .not-package-title {
          color: #0f766e;
        }

        .not-package-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem;
          color: #6b7280;
          line-height: 1.85;
          font-weight: 300;
          margin: 0.3rem 0 0;
          letter-spacing: 0.005em;
          transition: color 0.4s ease;
        }
        .not-package-item:hover .not-package-desc {
          color: #4b5563;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .not-package-container {
            padding: 0 3rem;
          }
          .not-package-item {
            padding: 2rem 2rem;
          }
          .not-package-num {
            font-size: 2.5rem;
            min-width: 3rem;
          }
        }

        @media (max-width: 900px) {
          .not-package {
            padding: 5rem 0 !important;
          }
          .not-package-container {
            padding: 0 2rem;
          }
          .not-package-grid {
            grid-template-columns: 1fr;
            border-radius: 12px;
          }
          .not-package-item {
            padding: 1.8rem 2rem;
            border-right: none !important;
            border-bottom: 1px solid #e5e7eb;
          }
          .not-package-item:nth-last-child(-n+2) {
            border-bottom: 1px solid #e5e7eb;
          }
          .not-package-item:last-child {
            border-bottom: none;
          }
        }

        @media (max-width: 640px) {
          .not-package {
            padding: 4rem 0 !important;
          }
          .not-package-container {
            padding: 0 1.5rem;
          }
          .not-package-item {
            padding: 1.5rem 1.5rem;
            gap: 1rem;
            flex-direction: row;
          }
          .not-package-num {
            font-size: 2.2rem;
            min-width: 2.8rem;
          }
          .not-package-icon {
            width: 2rem;
            height: 2rem;
            border-radius: 8px;
          }
          .not-package-icon svg {
            width: 14px;
            height: 14px;
          }
          .not-package-title {
            font-size: 0.95rem;
          }
          .not-package-desc {
            font-size: 0.82rem;
            line-height: 1.7;
          }
        }

        @media (max-width: 480px) {
          .not-package-container {
            padding: 0 1.2rem;
          }
          .not-package-item {
            padding: 1.2rem 1.2rem;
            gap: 0.8rem;
          }
          .not-package-num {
            font-size: 1.8rem;
            min-width: 2.2rem;
          }
          .not-package-title {
            font-size: 0.9rem;
          }
          .not-package-desc {
            font-size: 0.78rem;
            line-height: 1.6;
          }
          .not-package-content-header {
            gap: 0.5rem;
          }
          .not-package-icon {
            width: 1.8rem;
            height: 1.8rem;
          }
          .not-package-icon svg {
            width: 12px;
            height: 12px;
          }
        }
      `}</style>

      <div className="not-package-container">
        <SectionHeading
          eyebrow="Our Promise"
          title="This Is Not a Package Deal"
        />

        {/* Grid */}
        <div className="not-package-grid">
          {[
            {
              num: '01',
              title: 'Small Groups Only',
              desc: 'Intimate groups or private journeys — never crowded, never rushed, never compromised.',
              icon: (
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              ),
            },
            {
              num: '02',
              title: 'Request-Based Dates',
              desc: 'No fixed schedules. You reach out, we shape the timing entirely around your life.',
              icon: (
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
              ),
            },
            {
              num: '03',
              title: 'No Price Lists',
              desc: 'No rate cards, no fixed itineraries. Every journey is priced in conversation.',
              icon: (
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              ),
            },
            {
              num: '04',
              title: 'Designed for You',
              desc: 'Built from scratch each time. Your retreat is yours alone — not a recycled template.',
              icon: (
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              ),
            },
          ].map((item) => (
            <div key={item.num} className="not-package-item">
              <span className="not-package-num">{item.num}</span>
              <div className="not-package-content">
                <div className="not-package-content-header">
                  <div className="not-package-icon">{item.icon}</div>
                  <h3 className="not-package-title">{item.title}</h3>
                </div>
                <p className="not-package-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default NotAPackageDeal;
