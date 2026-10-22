import assert from 'node:assert/strict';
import test from 'node:test';
import { isValidElement } from 'react';

import YogaTeacherTrainingPage, { metadata } from './page';
import YogaComparisonPage from '@/components/YogaComparisonPage';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import sitemap from '@/app/sitemap';

function visibleText(node: unknown): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(visibleText).join(' ');
  if (isValidElement<{
    children?: unknown;
    items?: readonly { question: string; answer: string }[];
  }>(node)) {
    const itemsText = node.props.items?.map(({ question, answer }) => `${question} ${answer}`).join(' ') ?? '';
    return `${visibleText(node.props.children)} ${itemsText}`;
  }
  return '';
}

test('unpublished Yoga Teacher Training details stay out of public page and comparison', () => {
  assert.deepEqual(metadata.robots, { index: false, follow: true });

  const pageText = visibleText(YogaTeacherTrainingPage().props.children);
  assert.match(pageText, /not currently published/i);
  assert.doesNotMatch(pageText, /49,999|28 days|certificate of completion|teaching practicum/i);

  const comparisonText = visibleText(
    YogaComparisonPage({ comparisonKey: 'retreat-vs-ttc' }).props.children,
  );
  assert.match(comparisonText, /not currently published/i);
  assert.doesNotMatch(comparisonText, /49,999|28 days|certificate of completion|teaching practicum/i);

  const ttcUrl = buildCanonicalUrl('/yoga-teacher-training');
  assert.equal(sitemap().some((entry) => entry.url === ttcUrl), false);
});
