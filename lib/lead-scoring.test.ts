import assert from 'node:assert/strict';
import test from 'node:test';

import type { Inquiry } from './inquiries';
import { getYogaLeadTier, scoreInquiry } from './lead-scoring';

const baseInquiry: Inquiry = {
  name: 'Asha Mehta',
  phone: '+91 9876543210',
  yogaInterest: '',
  product: '',
  productId: '',
  departureId: '',
  planningHorizon: '',
  interestedIn: '',
  location: '',
  month: '',
  preferredDate: '',
  groupSize: '',
  budget: '',
  duration: '',
  yogaExperience: '',
  experience: '',
  bookingReadiness: '',
  yogaClassification: '',
  yogaSalesRoute: '',
  recommendedProduct: '',
  recommendedAlternative: '',
  source: '/contact',
  vertical: '',
  category: '',
  trek: '',
  timestamp: '2026-10-10T12:00:00.000Z',
};

test('scores mutually exclusive product and generic interest intent without double counting', () => {
  assert.equal(scoreInquiry({ ...baseInquiry, interest: 'retreat' }).score, 5);
  assert.equal(scoreInquiry({ ...baseInquiry, productId: 'verified-product', interest: 'retreat' }).score, 20);
});

test('scores specificity, opportunity, readiness, and caps the canonical score at 100', () => {
  const scored = scoreInquiry({
    ...baseInquiry,
    productId: 'verified-product',
    destination: 'Rishikesh',
    month: 'This month',
    bookingReadiness: 'Ready to book',
    duration: '5 days',
    groupSize: '3–4',
    budget: '₹30–60k',
    interest: 'private group',
  });

  assert.equal(scored.score, 100);
  assert.equal(scored.tier, 'hot');
  assert.ok(scored.signals.includes('group_specificity(+5)'));
  assert.ok(scored.signals.includes('group_opportunity(+5)'));
  assert.ok(scored.signals.includes('custom_opportunity(+10)'));
});

test('uses canonical score-tier boundaries', () => {
  const boundaries: Array<[number, string]> = [
    [0, 'early'],
    [24, 'early'],
    [25, 'nurture'],
    [49, 'nurture'],
    [50, 'warm'],
    [74, 'warm'],
    [75, 'hot'],
    [100, 'hot'],
  ];
  for (const [score, tier] of boundaries) {
    assert.equal(getYogaLeadTier(score), tier);
  }
});
