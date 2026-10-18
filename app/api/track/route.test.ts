import assert from 'node:assert/strict';
import test from 'node:test';
import { NextRequest } from 'next/server';

import {
  createTrackPostHandler,
  MAX_TRACK_BODY_BYTES,
  TRACK_EVENT_RATE_LIMIT,
  TRACK_EVENT_TYPES,
} from './route';
import { CLIENT_EVENT_TYPES } from '@/utils/telemetry';

function request(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function rawRequest(body: string, headers: Record<string, string> = {}): NextRequest {
  return new NextRequest('http://localhost/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body,
  });
}

test('client and server telemetry event allowlists are aligned', () => {
  assert.deepEqual([...TRACK_EVENT_TYPES].sort(), [...CLIENT_EVENT_TYPES].sort());
});

test('conversion lifecycle events are durably persisted', async () => {
  const handler = createTrackPostHandler({
    persistEvent: async () => 'persisted',
  });
  for (const event of [
    'cta_view',
    'cta_click',
    'lead_capture_open',
    'lead_capture_step_view',
    'lead_capture_step_complete',
    'lead_capture_abandon',
    'form_submission',
    'whatsapp_click',
  ]) {
    const response = await handler(request({ event, from: '/retreats/chakrata' }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true, durable: true });
  }
});

test('durable persistence failure is returned instead of a success-shaped response', async () => {
  const handler = createTrackPostHandler({
    persistEvent: async () => 'failed',
  });
  const response = await handler(request({ event: 'cta_click', from: '/retreats/chakrata' }));
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    error: 'durable_persistence_failed',
    durable: false,
  });
});

test('tracking endpoint rate-limits per client before durable persistence', async () => {
  let persisted = 0;
  let rateLimitCall: { key: string; limit: number; windowMs: number } | undefined;
  const handler = createTrackPostHandler({
    persistEvent: async () => {
      persisted += 1;
      return 'persisted';
    },
    rateLimit: (key, limit = 5, windowMs = 60_000) => {
      rateLimitCall = { key, limit, windowMs };
      return true;
    },
  });
  const trackedRequest = new NextRequest('http://localhost/api/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': '203.0.113.25, 10.0.0.1',
    },
    body: JSON.stringify({ event: 'cta_click', from: '/retreats/chakrata' }),
  });

  const response = await handler(trackedRequest);

  assert.equal(response.status, 429);
  assert.deepEqual(await response.json(), { error: 'rate_limited' });
  if (!rateLimitCall) throw new Error('The per-client rate limiter was not invoked.');
  assert.equal(rateLimitCall.limit, TRACK_EVENT_RATE_LIMIT);
  assert.equal(rateLimitCall.windowMs, 60_000);
  assert.ok(rateLimitCall.key.startsWith('track:'));
  assert.ok(!rateLimitCall.key.includes('203.0.113.25'));
  assert.equal(persisted, 0);
});

test('page views persist as page views and are not promoted to CTA impressions', async () => {
  const persisted: string[] = [];
  const handler = createTrackPostHandler({
    persistEvent: async (event) => {
      persisted.push(event.eventType);
      return 'persisted';
    },
  });
  const response = await handler(request({ event: 'page_view', from: '/retreats/chakrata' }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, durable: true });
  assert.deepEqual(persisted, ['page_view']);
});

test('intentional CTA-view deduplication is acknowledged as durable', async () => {
  const handler = createTrackPostHandler({
    persistEvent: async () => 'deduplicated',
  });
  const response = await handler(request({ event: 'cta_view', from: '/retreats/chakrata' }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    ok: true,
    durable: true,
    deduplicated: true,
  });
});

test('unknown event names and malformed payloads are rejected', async () => {
  const handler = createTrackPostHandler({
    persistEvent: async () => 'persisted',
  });
  assert.equal((await handler(request({ event: 'not_allowed', from: '/' }))).status, 422);
  assert.equal((await handler(request({ event: 'cta_click', from: '/', meta: [] }))).status, 422);
  assert.equal((await handler(request({ event: 'cta_click', from: '/', to: 'not-a-path' }))).status, 422);
});

test('metadata accepts the existing serialized-size boundary and rejects larger payloads before persistence', async () => {
  let persisted = 0;
  const handler = createTrackPostHandler({
    persistEvent: async () => {
      persisted += 1;
      return 'persisted';
    },
  });
  const envelopeLength = JSON.stringify({ value: '' }).length;
  const maximumValue = 'x'.repeat(6000 - envelopeLength);
  const withinLimit = await handler(request({
    event: 'cta_click',
    from: '/retreats/chakrata',
    meta: { value: maximumValue },
  }));
  const beyondLimit = await handler(request({
    event: 'cta_click',
    from: '/retreats/chakrata',
    meta: { value: `${maximumValue}x` },
  }));

  assert.equal(withinLimit.status, 200);
  assert.equal(beyondLimit.status, 422);
  assert.deepEqual(await beyondLimit.json(), { error: 'Invalid event payload' });
  assert.equal(persisted, 1);
});

test('a thrown durable persistence error is reported as unavailable, not success', async () => {
  const originalError = console.error;
  console.error = () => {};
  try {
    const handler = createTrackPostHandler({
      persistEvent: async () => {
        throw new Error('database unavailable');
      },
    });
    const response = await handler(request({ event: 'cta_click', from: '/retreats/chakrata' }));

    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      error: 'durable_persistence_failed',
      durable: false,
    });
  } finally {
    console.error = originalError;
  }
});

test('oversized request bodies are rejected with 413 before persistence', async () => {
  let persisted = 0;
  const handler = createTrackPostHandler({
    persistEvent: async () => {
      persisted += 1;
      return 'persisted';
    },
  });

  const oversized = JSON.stringify({
    event: 'cta_click',
    from: '/retreats/chakrata',
    padding: 'x'.repeat(MAX_TRACK_BODY_BYTES),
  });
  const response = await handler(rawRequest(oversized));

  assert.equal(response.status, 413);
  assert.deepEqual(await response.json(), { error: 'Request body too large' });
  assert.equal(persisted, 0);
});

test('a declared Content-Length above the limit is rejected without persisting', async () => {
  let persisted = 0;
  const handler = createTrackPostHandler({
    persistEvent: async () => {
      persisted += 1;
      return 'persisted';
    },
  });

  const response = await handler(rawRequest('{}', {
    'Content-Length': String(MAX_TRACK_BODY_BYTES + 1),
  }));

  assert.equal(response.status, 413);
  assert.equal(persisted, 0);
});

test('bodies just under the size limit still process normally', async () => {
  const handler = createTrackPostHandler({ persistEvent: async () => 'persisted' });
  const nearLimit = JSON.stringify({
    event: 'page_view',
    from: '/retreats/chakrata',
    padding: 'x'.repeat(MAX_TRACK_BODY_BYTES - 256),
  });
  assert.ok(nearLimit.length <= MAX_TRACK_BODY_BYTES);

  const response = await handler(rawRequest(nearLimit));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, durable: true });
});

test('unparseable and empty bodies are rejected with 400', async () => {
  let persisted = 0;
  const handler = createTrackPostHandler({
    persistEvent: async () => {
      persisted += 1;
      return 'persisted';
    },
  });

  assert.equal((await handler(rawRequest('not-json'))).status, 400);
  assert.equal((await handler(rawRequest(''))).status, 400);
  assert.equal(persisted, 0);
});
