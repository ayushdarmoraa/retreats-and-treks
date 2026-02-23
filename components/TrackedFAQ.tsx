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
    <div>
      {items.map((faq, index) => (
        <details
          key={faq.question}
          style={{ marginBottom: '1rem', borderBottom: '1px solid var(--color-border, #e0e0e0)' }}
          onToggle={(e) => handleToggle(index, faq.question, (e.target as HTMLDetailsElement).open)}
        >
          <summary
            style={{
              cursor: 'pointer',
              padding: '0.85rem 0',
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: 1.5,
              listStyle: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem',
            }}
          >
            <span>{faq.question}</span>
            <span
              style={{
                flexShrink: 0,
                fontSize: '1.1rem',
                color: 'var(--color-primary)',
                lineHeight: 1.5,
                userSelect: 'none',
              }}
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p
            style={{
              margin: '0 0 1rem',
              lineHeight: 1.75,
              color: 'var(--color-text-secondary)',
              fontSize: '0.95rem',
              paddingRight: '2rem',
            }}
          >
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
