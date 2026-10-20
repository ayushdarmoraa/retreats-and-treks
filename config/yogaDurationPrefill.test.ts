import assert from 'node:assert/strict';
import test from 'node:test';

import { getYogaDurationPrefill } from './yogaDurationPrefill';

test('Yoga duration routes prefill the matching registry product and duration', () => {
  assert.deepEqual(getYogaDurationPrefill('5-day-yoga-retreat'), {
    productId: 'yoga-rishikesh-5-day',
    duration: '5 days',
  });
  assert.deepEqual(getYogaDurationPrefill('7-day-yoga-retreat'), {
    productId: 'yoga-rishikesh-7-day',
    duration: '7 days',
  });
  assert.deepEqual(getYogaDurationPrefill('10-day-yoga-retreat'), {
    productId: 'yoga-rishikesh-10-day',
    duration: '10 days',
  });
});

test('non-Yoga duration routes receive no Yoga product context', () => {
  assert.deepEqual(getYogaDurationPrefill('7-day-meditation-retreat'), {
    productId: undefined,
    duration: undefined,
  });
});
