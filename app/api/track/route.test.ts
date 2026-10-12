import assert from 'node:assert/strict';
import test from 'node:test';
import { NextRequest } from 'next/server';

import { createTrackPostHandler, TRACK_EVENT_TYPES } from './route';
import { CLIENT_EVENT_TYPES } from '@/utils/telemetry';

function request(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
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
