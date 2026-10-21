import assert from 'node:assert/strict';
import test from 'node:test';

import { getYogaRecommendation } from './yoga-finder-recommendation';

test('keeps Yoga Teacher Training enquiry location aligned with its Rishikesh programme', () => {
  const recommendation = getYogaRecommendation({
    yogaType: 'ttc',
    yogaLocation: 'zanskar',
  });

  assert.equal(recommendation.ttc, true);
  assert.equal(recommendation.requestedLocation, 'rishikesh');
  assert.equal(recommendation.href, '/yoga-teacher-training');
});

test('preserves the selected location for a location-specific Yoga retreat enquiry', () => {
  const recommendation = getYogaRecommendation({
    yogaType: 'retreat',
    yogaLocation: 'zanskar',
  });

  assert.equal(recommendation.custom, true);
  assert.equal(recommendation.requestedLocation, 'zanskar');
  assert.equal(recommendation.href, '/yoga-retreat-zanskar');
});
