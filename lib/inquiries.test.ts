import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createInquiryPayloadFingerprint,
  deriveCanonicalLeadTier,
  normalizeLegacyLeadTier,
  type Inquiry,
} from './inquiries';

const inquiry: Inquiry = {
  name: 'Asha Mehta',
  phone: '+91 9876543210',
  email: 'asha@example.com',
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
  source: '/contact?utm_source=newsletter',
  vertical: '',
  category: '',
  trek: '',
  timestamp: '2026-10-10T12:00:00.000Z',
  firstTouchAt: '2026-10-10T11:00:00.000Z',
  conversionSessionId: 'session-one',
};

test('inquiry payload fingerprint is deterministic and ignores attribution timestamps and UTM query changes', () => {
  const retry = {
    ...inquiry,
    source: '/contact?utm_source=google',
    firstTouchAt: '2026-10-10T12:00:00.000Z',
    conversionSessionId: 'session-two',
  };

  assert.equal(createInquiryPayloadFingerprint(inquiry), createInquiryPayloadFingerprint(retry));
});

test('inquiry payload fingerprint distinguishes materially changed contact or intent data', () => {
  assert.notEqual(
    createInquiryPayloadFingerprint(inquiry),
    createInquiryPayloadFingerprint({ ...inquiry, phone: '+91 9000000000' }),
  );
  assert.notEqual(
    createInquiryPayloadFingerprint(inquiry),
    createInquiryPayloadFingerprint({ ...inquiry, additionalRequest: 'Need a private group' }),
  );
});

test('legacy cold and unscored tiers remain distinct from canonical tiers', () => {
  assert.equal(normalizeLegacyLeadTier('cold'), 'cold');
  assert.equal(normalizeLegacyLeadTier('unscored'), 'unscored');
  assert.equal(deriveCanonicalLeadTier('cold'), null);
  assert.equal(deriveCanonicalLeadTier('unscored'), null);
});
