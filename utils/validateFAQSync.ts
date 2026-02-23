/**
 * FAQ Structural Data Validation Utility
 *
 * Ensures visible FAQ questions match the JSON-LD FAQPage schema exactly.
 * Call validateFAQSync(faqItems) in any server component or page that
 * renders a FAQ section with corresponding JSON-LD.
 *
 * Usage:
 *   import { validateFAQSync } from '@/utils/validateFAQSync';
 *   validateFAQSync(FAQ_ITEMS, '/retreats/himalayan-retreats');
 */

export interface FAQItem {
  question: string;
  answer: string;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates that FAQ items meet structural requirements.
 * In production, throws on hard errors. In development, logs warnings.
 */
export function validateFAQSync(
  items: FAQItem[],
  pageContext = 'unknown page',
): void {
  const result = auditFAQItems(items, pageContext);

  if (result.warnings.length > 0) {
    for (const w of result.warnings) {
      console.warn(`[FAQ Sync] ${pageContext}: ${w}`);
    }
  }

  if (!result.valid) {
    const message = `[FAQ Sync] Schema drift detected on ${pageContext}:\n  ${result.errors.join('\n  ')}`;
    if (process.env.NODE_ENV === 'production') {
      throw new Error(message);
    } else {
      console.error(message);
    }
  }
}

/**
 * Compares two FAQ arrays (visible vs schema) and reports divergence.
 * Use when visible items and schema items are built from separate sources.
 */
export function compareFAQLists(
  visibleItems: FAQItem[],
  schemaItems: FAQItem[],
  pageContext = 'unknown page',
): void {
  const errors: string[] = [];

  if (visibleItems.length !== schemaItems.length) {
    errors.push(
      `Count mismatch: ${visibleItems.length} visible FAQs but ${schemaItems.length} in JSON-LD`,
    );
  }

  const visibleQuestions = new Set(visibleItems.map((i) => i.question.trim()));
  const schemaQuestions = new Set(schemaItems.map((i) => i.question.trim()));

  for (const q of visibleQuestions) {
    if (!schemaQuestions.has(q)) {
      errors.push(`Question in visible FAQ missing from JSON-LD: "${q.slice(0, 60)}..."`);
    }
  }
  for (const q of schemaQuestions) {
    if (!visibleQuestions.has(q)) {
      errors.push(`Question in JSON-LD missing from visible FAQ: "${q.slice(0, 60)}..."`);
    }
  }

  if (errors.length > 0) {
    const message = `[FAQ Sync] Schema divergence on ${pageContext}:\n  ${errors.join('\n  ')}`;
    if (process.env.NODE_ENV === 'production') {
      throw new Error(message);
    } else {
      console.error(message);
    }
  }
}

function auditFAQItems(items: FAQItem[], pageContext: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!items || items.length === 0) {
    errors.push('FAQ array is empty — JSON-LD FAQPage will be invalid');
  }

  for (let i = 0; i < items.length; i++) {
    const { question, answer } = items[i];

    if (!question || question.trim() === '') {
      errors.push(`FAQ[${i}]: question is empty`);
    }
    if (!answer || answer.trim() === '') {
      errors.push(`FAQ[${i}]: answer is empty for question "${question?.slice(0, 40)}"`);
    }
    if (answer && answer.length < 40) {
      warnings.push(
        `FAQ[${i}]: answer is very short (${answer.length} chars) — may reduce rich result quality`,
      );
    }
    if (question && !question.trim().endsWith('?')) {
      warnings.push(`FAQ[${i}]: question does not end with "?" — "${question.slice(0, 60)}"`);
    }
  }

  // Duplicate question check
  const seen = new Set<string>();
  for (const item of items) {
    const key = item.question?.trim().toLowerCase();
    if (key && seen.has(key)) {
      errors.push(`Duplicate FAQ question: "${item.question.slice(0, 60)}"`);
    }
    if (key) seen.add(key);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
