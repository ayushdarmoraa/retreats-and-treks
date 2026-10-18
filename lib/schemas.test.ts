import assert from 'node:assert/strict';
import test from 'node:test';

import { LeadTierEnum } from './schemas';

test('lead tier schema accepts existing scorer output and preserved historical values', () => {
  for (const tier of ['hot', 'warm', 'nurture', 'early', 'cold', 'unscored']) {
    assert.equal(LeadTierEnum.parse(tier), tier);
  }
  for (const tier of ['Hot', 'Warm', 'Nurture', 'Early']) {
    assert.equal(LeadTierEnum.parse(tier), tier);
  }
});

test('lead tier schema rejects unsupported values and casing', () => {
  for (const tier of ['HOT', 'COLD', 'Unscored', 'unknown', '']) {
    assert.equal(LeadTierEnum.safeParse(tier).success, false, tier);
  }
});
