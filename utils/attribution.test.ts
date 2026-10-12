import assert from 'node:assert/strict';
import test from 'node:test';

import { buildAttributionQuery, captureAttribution, readAttributionSnapshot } from './attribution';

function withBrowser<T>(run: (storage: Map<string, string>) => T): T {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  const storage = new Map<string, string>();
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      location: { pathname: '/retreats/chakrata' },
      sessionStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
      },
    },
  });
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: { referrer: 'https://search.example/results?q=private-value#result' },
  });

  try {
    return run(storage);
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, 'window', previousWindow);
    else Reflect.deleteProperty(globalThis, 'window');
    if (previousDocument) Object.defineProperty(globalThis, 'document', previousDocument);
    else Reflect.deleteProperty(globalThis, 'document');
  }
}

test('first touch stays fixed while new attributable visits update last touch', () => {
  withBrowser((storage) => {
    captureAttribution(new URLSearchParams('utm_source=first&utm_campaign=launch&utm_id=first-id'));
    const first = readAttributionSnapshot(new URLSearchParams());

    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: {
        location: { pathname: '/retreats/rishikesh' },
        sessionStorage: {
          getItem: (key: string) => storage.get(key) ?? null,
          setItem: (key: string, value: string) => storage.set(key, value),
        },
      },
    });
    captureAttribution(new URLSearchParams('utm_source=return&utm_medium=email&utm_id=return-id'));
    const latest = readAttributionSnapshot(new URLSearchParams());

    assert.equal(latest.firstUtm.utm_source, 'first');
    assert.equal(latest.firstUtm.utm_id, 'first-id');
    assert.equal(latest.lastUtm.utm_source, 'return');
    assert.equal(latest.lastUtm.utm_medium, 'email');
    assert.equal(latest.lastUtm.utm_id, 'return-id');
    assert.equal(latest.firstLandingPage, '/retreats/chakrata');
    assert.equal(latest.lastLandingPage, '/retreats/rishikesh');
    assert.equal(latest.referrer, 'https://search.example/results');
    assert.ok(latest.firstTouchAt);
    assert.ok(latest.lastTouchAt);
    assert.equal(first.firstTouchAt, latest.firstTouchAt);
    assert.equal(new URLSearchParams(buildAttributionQuery(new URLSearchParams())).get('first_utm_id'), 'first-id');
  });
});

test('missing UTM values do not erase stored attribution or manufacture a touch', () => {
  withBrowser((storage) => {
    captureAttribution(new URLSearchParams('utm_source=campaign'));
    const stored = storage.get('retreats-and-treks-attribution-v1');
    captureAttribution(new URLSearchParams());
    assert.equal(storage.get('retreats-and-treks-attribution-v1'), stored);

    const snapshot = readAttributionSnapshot(new URLSearchParams());
    assert.equal(snapshot.firstUtm.utm_source, 'campaign');
    assert.equal(snapshot.lastUtm.utm_source, 'campaign');
    assert.equal(snapshot.firstLandingPage, '/retreats/chakrata');
    assert.ok(snapshot.firstTouchAt);
    assert.ok(snapshot.lastTouchAt);
  });
});

test('organic first touch is captured without UTMs and later direct navigation preserves it', () => {
  withBrowser((storage) => {
    captureAttribution(new URLSearchParams());
    const initial = JSON.parse(storage.get('retreats-and-treks-attribution-v1') || '{}') as {
      firstLandingPage?: string;
      lastLandingPage?: string;
      referrer?: string;
      firstTouchAt?: string;
      first?: Record<string, string>;
    };
    assert.equal(initial.firstLandingPage, '/retreats/chakrata');
    assert.equal(initial.lastLandingPage, '/retreats/chakrata');
    assert.equal(initial.referrer, 'https://search.example/results');
    assert.ok(initial.firstTouchAt);
    assert.deepEqual(initial.first, {});

    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: {
        location: { pathname: '/retreats/rishikesh' },
        sessionStorage: {
          getItem: (key: string) => storage.get(key) ?? null,
          setItem: (key: string, value: string) => storage.set(key, value),
        },
      },
    });
    captureAttribution(new URLSearchParams());
    const snapshot = readAttributionSnapshot(new URLSearchParams());
    assert.equal(snapshot.firstLandingPage, '/retreats/chakrata');
    assert.equal(snapshot.lastLandingPage, '/retreats/rishikesh');
    assert.equal(snapshot.referrer, 'https://search.example/results');
    assert.deepEqual(snapshot.firstUtm, {});
    assert.deepEqual(snapshot.lastUtm, {});
  });
});

test('a direct visit updates the latest landing path without replacing last campaign data', () => {
  withBrowser((storage) => {
    captureAttribution(new URLSearchParams('utm_source=campaign&utm_medium=email'));
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: {
        location: { pathname: '/retreats/sankri' },
        sessionStorage: {
          getItem: (key: string) => storage.get(key) ?? null,
          setItem: (key: string, value: string) => storage.set(key, value),
        },
      },
    });

    captureAttribution(new URLSearchParams());
    const snapshot = readAttributionSnapshot(new URLSearchParams());
    assert.equal(snapshot.firstUtm.utm_source, 'campaign');
    assert.equal(snapshot.lastUtm.utm_source, 'campaign');
    assert.equal(snapshot.lastLandingPage, '/retreats/sankri');
  });
});

test('attribution storage failures do not interrupt conversion capture', () => {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      location: { pathname: '/contact' },
      sessionStorage: {
        getItem: () => { throw new Error('storage unavailable'); },
        setItem: () => { throw new Error('storage unavailable'); },
      },
    },
  });
  try {
    assert.doesNotThrow(() => captureAttribution(new URLSearchParams()));
    assert.equal(readAttributionSnapshot(new URLSearchParams()).firstLandingPage, '/contact');
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, 'window', previousWindow);
    else Reflect.deleteProperty(globalThis, 'window');
  }
});
