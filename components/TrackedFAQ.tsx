'use client';

/**
 * TrackedFAQ
 *
 * Accordion FAQ component that fires faq_expand telemetry on open.
 * Replaces static FAQ rendering wherever behavioral insight is needed.
 *
 * - Accessible: uses <details>/<summary> — no JS required to open
 * - Animated: smooth height transition via CSS
 * - Tracked: fires once per question per session (deduped by index)
 *
 * Usage:
 *   import TrackedFAQ from '@/components/TrackedFAQ';
 *   <TrackedFAQ items={FAQ_ITEMS} page="/retreats/himalayan-retreats" />
 */

import { useRef } from 'react';
import { track } from '@/utils/telemetry';

export interface FAQItem {
  question: string;
  answer: string;
}

interface TrackedFAQProps {
  items: FAQItem[];
  page: string;
}

export default function TrackedFAQ({ items, page }: TrackedFAQProps) {
  const fired = useRef<Set<number>>(new Set());

  function handleToggle(index: number, question: string, open: boolean) {
    if (open && !fired.current.has(index)) {
      fired.current.add(index);
      track({
        event: 'faq_expand',
        from: page,
        meta: { question: question.slice(0, 80), index },
      });
    }
  }

  return (
    <>
      <style>{`
  .tfaq-details {
    border-bottom: 1px solid rgba(15,118,110,0.08);
  }
  .tfaq-details[open] .tfaq-question {
    color: var(--color-primary);
  }
  .tfaq-details[open] .tfaq-icon {
    border-color: var(--color-primary);
    background: rgba(15,118,110,0.06);
  }
  .tfaq-summary::-webkit-details-marker { display: none; }
  .tfaq-summary { list-style: none; }

  .tfaq-details summary .tfaq-icon::after {
    content: '+';
  }
  .tfaq-details[open] summary .tfaq-icon::after {
    content: '−';
  }
`}</style>

      <div>
        {items.map((faq, index) => (
          <details
            key={faq.question}
            className="tfaq-details"
            style={{ marginBottom: '0' }}
            onToggle={(e) => handleToggle(index, faq.question, (e.target as HTMLDetailsElement).open)}
          >
            <summary
              className="tfaq-summary"
              style={{
                cursor: 'pointer',
                padding: '1.1rem 0',
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontWeight: 400,
                fontSize: '0.92rem',
                lineHeight: 1.6,
                color: '#222222',
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                transition: 'color 0.2s',
              }}
            >
              <span className="tfaq-question">{faq.question}</span>
              <span
                className="tfaq-icon"
                style={{
                  flexShrink: 0,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: '1px solid rgba(15,118,110,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  color: 'var(--color-primary)',
                  lineHeight: 1,
                  userSelect: 'none',
                  marginTop: '2px',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                aria-hidden="true"
              >
                
              </span>
            </summary>
            <p
              style={{
                margin: '0 0 1.25rem',
                lineHeight: 1.85,
                color: '#666666',
                fontSize: '0.88rem',
                fontWeight: 300,
                fontFamily: 'var(--font-geist-sans), sans-serif',
                paddingRight: '2rem',
              }}
            >
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </>
  );
}