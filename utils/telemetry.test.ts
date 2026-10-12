import assert from 'node:assert/strict';
import test from 'node:test';
import { track } from './telemetry';

test('telemetry attaches the persistent conversion session to events unless explicitly supplied', () => {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const previousFetch = globalThis.fetch;
  const stored = new Map<string, string>();
  const requests: Record<string, unknown>[] = [];

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      sessionStorage: {
        getItem: (key: string) => stored.get(key) ?? null,
        setItem: (key: string, value: string) => stored.set(key, value),
      },
    },
  });
  globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    if (String(input) === '/api/track' && typeof init?.body === 'string') {
      requests.push(JSON.parse(init.body) as Record<string, unknown>);
    }
    return Promise.resolve({ ok: true } as Response);
  }) as typeof fetch;

  try {
    track({ event: 'cta_click', from: '/treks/brahmatal', meta: { cta_id: 'trek_hero' } });
    track({
      event: 'whatsapp_click',
      from: '/treks/brahmatal',
      meta: { conversion_session_id: '11111111-2222-4333-8444-555555555555' },
    });

    const firstMeta = requests[0].meta as Record<string, unknown>;
    const secondMeta = requests[1].meta as Record<string, unknown>;
    assert.equal(typeof firstMeta.conversion_session_id, 'string');
    assert.notEqual(firstMeta.conversion_session_id, secondMeta.conversion_session_id);
    assert.equal(secondMeta.conversion_session_id, '11111111-2222-4333-8444-555555555555');
    assert.equal(firstMeta.cta_id, 'trek_hero');
  } finally {
    globalThis.fetch = previousFetch;
    if (previousWindow) {
      Object.defineProperty(globalThis, 'window', previousWindow);
    } else {
      Reflect.deleteProperty(globalThis, 'window');
    }
  }
});
