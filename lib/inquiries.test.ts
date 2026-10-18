import assert from 'node:assert/strict';
import test from 'node:test';
import type { getDb } from './db';

import {
  createInquiryPayloadFingerprint,
  deriveCanonicalLeadTier,
  insertInquiry,
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

function makeBranchGuardDatabase(actualBranchId: string) {
  const executedQueries: Array<{ text: string; values: unknown[] }> = [];
  let insertExecuted = false;
  const tag = (strings: TemplateStringsArray, ...values: unknown[]) => ({
    text: strings.join(' ? ').replace(/\s+/g, ' ').trim(),
    values,
  });
  const sql = Object.assign(tag, {
    transaction: async (queries: Array<{ text: string; values: unknown[] }>) => {
      const results: unknown[][] = [];
      for (const query of queries) {
        executedQueries.push(query);
        if (query.text.includes("current_setting('neon.branch_id', true)")) {
          if (actualBranchId !== query.values[0]) {
            throw new Error('Expected Neon branch guard rejected this connection');
          }
          results.push([{ branch_guard: 1 }]);
        } else if (query.text.startsWith('INSERT INTO inquiries')) {
          insertExecuted = true;
          results.push([{ id: 'inquiry-test-id', lead_reference: 'RT-261016-0042' }]);
        } else {
          results.push([]);
        }
      }
      return results;
    },
  }) as unknown as ReturnType<typeof getDb>;

  return { sql, executedQueries, wasInsertExecuted: () => insertExecuted };
}

test('configured expected-branch guard runs before inquiry insertion using a safe SQL test double', async () => {
  const database = makeBranchGuardDatabase('branch-test');
  const result = await insertInquiry(inquiry, 10, 'early', [], {
    databaseUrl: 'mock://no-network',
    expectedBranchId: 'branch-test',
    getDb: () => database.sql,
  });

  assert.equal(result.status, 'inserted');
  assert.equal(database.executedQueries[0].text.includes("current_setting('neon.branch_id', true)"), true);
  assert.equal(database.wasInsertExecuted(), true);
});

test('a mismatched expected-branch guard prevents inquiry insertion without database access', async () => {
  const database = makeBranchGuardDatabase('branch-other');

  await assert.rejects(
    insertInquiry(inquiry, 10, 'early', [], {
      databaseUrl: 'mock://no-network',
      expectedBranchId: 'branch-test',
      getDb: () => database.sql,
    }),
    /branch guard rejected/,
  );

  assert.equal(database.wasInsertExecuted(), false);
  assert.equal(database.executedQueries.length, 1);
  assert.equal(database.executedQueries[0].text.includes("current_setting('neon.branch_id', true)"), true);
});
