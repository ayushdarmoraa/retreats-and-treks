'use client';

import { useState } from 'react';
import { locationFaqContent } from '@/content/retreats/location/faq';

interface FAQItem {
  question: string;
  answer: string;
}

interface LocationFAQProps {
  locationName: string;
  faqs: readonly FAQItem[];
}

export default function LocationFAQ({ locationName, faqs }: LocationFAQProps) {
  const content = locationFaqContent;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section style={{
      width: '100%',
      padding: '5rem 0',
      background: '#ffffff',
      borderBottom: '1px solid rgba(0,0,0,0.04)',
    }}>
      <style>{`
        .faq-inner {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .faq-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .faq-eyebrow-line {
          width: 30px;
          height: 2px;
          background: #0f766e;
          flex-shrink: 0;
          border-radius: 2px;
        }
        .faq-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8B877C;
          font-weight: 500;
        }

        .faq-heading {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #2B2A26;
          margin: 0 0 2.5rem;
          line-height: 1.15;
        }
        .faq-heading .accent {
          color: #0f766e;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .faq-item {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .faq-item:hover {
          border-color: rgba(15,118,110,0.12);
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
        }
        .faq-item.open {
          border-color: rgba(15,118,110,0.2);
          box-shadow: 0 4px 20px rgba(15,118,110,0.06);
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          cursor: pointer;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.92rem;
          font-weight: 500;
          color: #2B2A26;
          transition: all 0.3s ease;
          user-select: none;
          gap: 1rem;
        }
        .faq-question:hover {
          color: #0f766e;
        }
        .faq-question:hover .faq-icon {
          color: #0f766e;
        }

        .faq-icon {
          font-size: 1.3rem;
          color: #8B877C;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease;
          flex-shrink: 0;
          font-weight: 300;
          line-height: 1;
        }
        .faq-icon.open {
          transform: rotate(45deg);
          color: #0f766e;
        }

        .faq-answer {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          line-height: 1.8;
          color: rgba(43,42,38,0.6);
          font-weight: 300;
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0 1.5rem;
        }
        .faq-answer.open {
          max-height: 600px;
          padding: 0 1.5rem 1.25rem;
        }
        .faq-answer p {
          margin: 0;
        }

        .faq-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(15,118,110,0.15), transparent);
          margin: 0 1.5rem;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .faq-item.open .faq-divider {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .faq-inner { padding: 0 1.5rem; }
          .faq-question { 
            font-size: 0.85rem; 
            padding: 0.8rem 1.2rem;
          }
          .faq-answer { 
            font-size: 0.82rem; 
            padding: 0 1.2rem;
          }
          .faq-answer.open {
            padding: 0 1.2rem 1rem;
          }
          .faq-divider { margin: 0 1.2rem; }
          .faq-heading { font-size: 1.4rem; }
        }

        @media (max-width: 480px) {
          .faq-inner { padding: 0 1rem; }
          .faq-question { 
            font-size: 0.8rem; 
            padding: 0.7rem 1rem;
          }
          .faq-answer { 
            font-size: 0.78rem; 
            padding: 0 1rem;
          }
          .faq-answer.open {
            padding: 0 1rem 0.8rem;
          }
          .faq-divider { margin: 0 1rem; }
          .faq-icon { font-size: 1.1rem; }
          .faq-heading { font-size: 1.2rem; }
        }
      `}</style>

      <div className="faq-inner">
        {/* Eyebrow */}
        <div className="faq-eyebrow">
          <span className="faq-eyebrow-line" />
          <span className="faq-eyebrow-text">{content.eyebrow}</span>
        </div>

        {/* Heading */}
        <h2 className="faq-heading">
          Frequently asked <span className="accent">questions</span>
        </h2>

        {/* FAQ List */}
        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <div
                  className="faq-question"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span>{faq.question}</span>
                  <span className={`faq-icon ${isOpen ? 'open' : ''}`}>
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
                <div className={`faq-divider ${isOpen ? 'open' : ''}`} />
                <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}