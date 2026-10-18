import assert from 'node:assert/strict';
import test from 'node:test';

import { hashIp, isBotUserAgent, isRateLimited } from './rate-limit';

test('rate limiter allows requests up to the limit and blocks the next one in the same window', () => {
  const key = `unit-test:${hashIp('198.51.100.1')}:window`;
  assert.equal(isRateLimited(key, 2, 60_000), false);
  assert.equal(isRateLimited(key, 2, 60_000), false);
  assert.equal(isRateLimited(key, 2, 60_000), true);
});

test('rate limiter keeps keys independent', () => {
  const first = `unit-test:${hashIp('198.51.100.2')}:independent`;
  const second = `unit-test:${hashIp('198.51.100.3')}:independent`;
  assert.equal(isRateLimited(first, 1, 60_000), false);
  assert.equal(isRateLimited(first, 1, 60_000), true);
  assert.equal(isRateLimited(second, 1, 60_000), false);
});

test('rate limiter admits requests again after the window expires', async () => {
  const key = `unit-test:${hashIp('198.51.100.4')}:expiry`;
  assert.equal(isRateLimited(key, 1, 25), false);
  assert.equal(isRateLimited(key, 1, 25), true);
  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.equal(isRateLimited(key, 1, 25), false);
});

test('bot user-agent detection blocks known automation tools and missing agents', () => {
  for (const ua of ['curl/8.4.0', 'python-requests/2.31', 'HeadlessChrome/120', 'puppeteer']) {
    assert.equal(isBotUserAgent(ua), true, ua);
  }
  for (const ua of ['Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)']) {
    assert.equal(isBotUserAgent(ua), false, ua);
  }
  assert.equal(isBotUserAgent(''), true);
});

test('hashIp is deterministic and separates distinct addresses', () => {
  assert.equal(hashIp('203.0.113.9'), hashIp('203.0.113.9'));
  assert.notEqual(hashIp('203.0.113.9'), hashIp('203.0.113.10'));
  assert.ok(!hashIp('203.0.113.9').includes('203.0.113.9'));
});