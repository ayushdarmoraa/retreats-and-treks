'use client';

import { Section, SectionHeading, IconCircle } from '@/components/ui';

const DayInYourRetreat = () => {
  return (
    <Section
      className="day-in-retreat"
      style={{ background: '#ffffff', padding: '7rem 0', borderBottom: '1px solid rgba(0, 0, 0, 0.04)' }}
    >
      <style>{`
        .day-in-retreat::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 30% 20%, rgba(15, 118, 110, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(139, 115, 85, 0.02) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .day-in-retreat-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }

        /* ── TIMELINE ── */
        .day-timeline {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          margin-top: 4rem;
        }

        .day-timeline::before {
          content: '';
          position: absolute;
          top: 2.6rem;
          left: 12.5%;
          right: 12.5%;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(15, 118, 110, 0.15) 20%, rgba(15, 118, 110, 0.15) 80%, transparent);
        }

        .day-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 1.5rem;
          position: relative;
        }

        .day-dot-wrap {
          position: relative;
          margin-bottom: 1.75rem;
        }

        /* Ripple ring on hover — extra effect on top of IconCircle */
        .day-dot::after {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(15, 118, 110, 0.08);
          opacity: 0;
          transform: scale(0.85);
          transition: all 0.4s ease;
        }
        .day-block:hover .day-dot::after {
          opacity: 1;
          transform: scale(1);
        }

        .day-time {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #6b7280;
          font-weight: 500;
          margin-bottom: 0.6rem;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        .day-block:hover .day-time {
          opacity: 1;
        }

        .day-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.1rem;
          font-weight: 500;
          color: #1a1814;
          letter-spacing: -0.01em;
          line-height: 1.25;
          margin-bottom: 0.75rem;
          transition: color 0.3s ease;
        }
        .day-block:hover .day-title {
          color: #0f766e;
        }

        .day-divider {
          width: 24px;
          height: 2px;
          background: rgba(15, 118, 110, 0.12);
          margin: 0 auto 0.75rem;
          border-radius: 4px;
          transition: all 0.4s ease;
        }
        .day-block:hover .day-divider {
          width: 36px;
          background: rgba(15, 118, 110, 0.25);
        }

        .day-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.82rem;
          line-height: 1.8;
          color: #6b7280;
          font-weight: 300;
          max-width: 180px;
          margin: 0 auto;
          transition: color 0.3s ease;
        }
        .day-block:hover .day-desc {
          color: #4b5563;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .day-in-retreat-container {
            padding: 0 3rem;
          }
        }

        @media (max-width: 900px) {
          .day-timeline {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem 1.5rem;
            margin-top: 3rem;
          }
          .day-timeline::before {
            display: none;
          }
          .day-block {
            padding: 0;
          }
          .day-desc {
            max-width: 100%;
          }
          .day-in-retreat {
            padding: 5rem 0 !important;
          }
          .day-in-retreat-container {
            padding: 0 2rem;
          }
        }

        @media (max-width: 640px) {
          .day-timeline {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .day-block {
            flex-direction: row;
            text-align: left;
            align-items: flex-start;
            padding: 0;
            gap: 1.5rem;
          }
          .day-dot-wrap {
            margin-bottom: 0;
            flex-shrink: 0;
          }
          .day-desc {
            max-width: 100%;
          }
          .day-divider {
            margin: 0 0 0.6rem 0;
          }
          .day-time {
            font-size: 0.5rem;
          }
          .day-title {
            font-size: 1rem;
          }
          .day-in-retreat {
            padding: 4rem 0 !important;
          }
          .day-in-retreat-container {
            padding: 0 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .day-in-retreat-container {
            padding: 0 1.2rem;
          }
          .day-title {
            font-size: 0.95rem;
          }
          .day-desc {
            font-size: 0.78rem;
            line-height: 1.7;
          }
          .day-block {
            gap: 1rem;
          }
        }
      `}</style>

      <div className="day-in-retreat-container">
        {/* Header */}
        <SectionHeading
          eyebrow="The Experience"
          title="A Day in Your Retreat"
          description="No alarms. No schedules. Just a rhythm that feels right."
        />

        {/* Timeline */}
        <div className="day-timeline">
          {[
            {
              icon: (
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                </svg>
              ),
              time: 'Morning',
              title: 'Yoga & Stillness',
              desc: 'Gentle movement as the sun rises over the peaks. Breathwork, asana, and silence before the world wakes.',
            },
            {
              icon: (
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                  <path d="M3 17l4-8 4 4 3-6 4 10"/>
                  <path d="M2 20h20"/>
                </svg>
              ),
              time: 'Afternoon',
              title: 'Explore & Wander',
              desc: 'Forest walks, village trails, or simply sitting by a stream. The mountain teaches at its own pace.',
            },
            {
              icon: (
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>
                  <path d="M19 3v4M21 5h-4"/>
                </svg>
              ),
              time: 'Evening',
              title: 'Sunset & Reflection',
              desc: 'Watch the light shift over the valley. Journal, sketch, or just be. No agenda, only presence.',
            },
            {
              icon: (
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                  <path d="M12 22c4.97 0 9-2.69 9-6 0-1.5-.75-2.87-2-3.9"/>
                  <path d="M12 16c4.97 0 9-2.69 9-6S16.97 4 12 4 3 6.69 3 10c0 1.5.75 2.87 2 3.9"/>
                  <path d="M12 16v6M8 18l4 4 4-4"/>
                </svg>
              ),
              time: 'Night',
              title: 'Chill & Unwind',
              desc: 'Chai around the fire. Conversations that matter, or the comfort of deep mountain silence.',
            },
          ].map((item, index) => (
            <div key={index} className="day-block">
              <div className="day-dot-wrap">
                <IconCircle className="day-dot">{item.icon}</IconCircle>
              </div>
              <div>
                <div className="day-time">{item.time}</div>
                <div className="day-title">{item.title}</div>
                <div className="day-divider" />
                <p className="day-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default DayInYourRetreat;
