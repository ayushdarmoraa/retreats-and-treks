import assert from 'node:assert/strict';
import test from 'node:test';

import { acquirePendingSubmissionToken } from './submission-token';

function createStorage() {
  const values = new Map<string, string>();
  return {
    values,
    storage: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      removeItem: (key: string) => values.delete(key),
    },
  };
}

function testOptions(storage: ReturnType<typeof createStorage>['storage'], tokens: string[]) {
  return {
    storage,
    createToken: () => {
      const token = tokens.shift();
      if (!token) throw new Error('No test token available.');
      return token;
    },
  };
}

const FIRST_TOKEN = '19d1821d-4c14-4ef1-8802-9eb522e19061';
const SECOND_TOKEN = 'b1f24eae-8615-41b2-ae53-b1d165361702';
const INQUIRY = { name: 'Asha Mehta', phone: '+91 9876543210', source: '/contact?utm_source=mail' };

test('reuses the same token when retry-time attribution changes', async () => {
  const store = createStorage();
  const options = testOptions(store.storage, [FIRST_TOKEN]);
  const firstMount = await acquirePendingSubmissionToken('network-retry-form', INQUIRY, options);
  const tokenSentOnFailedRequest = firstMount.token;
  const remountedForm = await acquirePendingSubmissionToken('network-retry-form', {
    ...INQUIRY,
    source: '/contact?utm_source=mail&utm_campaign=changed',
    lastTouchAt: '2026-10-10T12:01:00.000Z',
  }, options);

  assert.equal(tokenSentOnFailedRequest, FIRST_TOKEN);
  assert.equal(remountedForm.token, tokenSentOnFailedRequest);
});

test('clears after confirmed success so the next intentional submission gets a new token', async () => {
  const store = createStorage();
  const options = testOptions(store.storage, [FIRST_TOKEN, SECOND_TOKEN]);
  const completed = await acquirePendingSubmissionToken('success-rotation-form', INQUIRY, options);
  completed.clear();
  const nextSubmission = await acquirePendingSubmissionToken('success-rotation-form', INQUIRY, options);

  assert.equal(completed.token, FIRST_TOKEN);
  assert.equal(nextSubmission.token, SECOND_TOKEN);
});

test('isolates pending tokens by form scope without storing form data', async () => {
  const store = createStorage();
  const options = testOptions(store.storage, [FIRST_TOKEN, SECOND_TOKEN, '41670c7e-1a4f-4df4-ae1f-28ba903fac2e']);
  const contactForm = await acquirePendingSubmissionToken('distinct-contact-form', INQUIRY, options);
  const trekForm = await acquirePendingSubmissionToken('distinct-trek-form', INQUIRY, options);
  const secondContactForm = await acquirePendingSubmissionToken('distinct-contact-form:second', INQUIRY, options);

  assert.notEqual(contactForm.token, trekForm.token);
  assert.notEqual(contactForm.token, secondContactForm.token);
  assert.ok([...store.values.values()].every((value) => {
    const parsed = JSON.parse(value) as { token: string; fingerprint: string };
    return [FIRST_TOKEN, SECOND_TOKEN, '41670c7e-1a4f-4df4-ae1f-28ba903fac2e'].includes(parsed.token)
      && /^[0-9a-f]{64}$/.test(parsed.fingerprint)
      && !value.includes('Asha Mehta')
      && !value.includes('+91 9876543210');
  }));
  assert.ok([...store.values.keys()].every((key) => !key.includes('Asha') && !key.includes('+91')));
});

test('creates a new token when a remounted form has a different inquiry payload', async () => {
  const store = createStorage();
  const options = testOptions(store.storage, [FIRST_TOKEN, SECOND_TOKEN]);
  const firstMount = await acquirePendingSubmissionToken('changed-payload-form', INQUIRY, options);
  const remountedForm = await acquirePendingSubmissionToken('changed-payload-form', {
    ...INQUIRY,
    phone: '+91 9000000000',
  }, options);

  assert.equal(firstMount.token, FIRST_TOKEN);
  assert.equal(remountedForm.token, SECOND_TOKEN);
});

test('reuses an in-memory token and continues when session storage is unavailable', async () => {
  const unavailableStorage = {
    getItem: () => { throw new Error('storage disabled'); },
    setItem: () => { throw new Error('storage disabled'); },
    removeItem: () => { throw new Error('storage disabled'); },
  };
  const options = testOptions(unavailableStorage, [FIRST_TOKEN]);
  const pending = await acquirePendingSubmissionToken('unavailable-storage-form', INQUIRY, options);
  const retry = await acquirePendingSubmissionToken('unavailable-storage-form', INQUIRY, options);

  assert.equal(pending.token, FIRST_TOKEN);
  assert.equal(retry.token, pending.token);
  assert.doesNotThrow(() => pending.clear());
});
