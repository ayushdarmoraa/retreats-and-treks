import assert from 'node:assert/strict';
import test from 'node:test';
import { NextRequest } from 'next/server';
import { COOKIE_NAME, createSession } from './lib/auth';
import { proxy } from './proxy';

test('rejects unauthorized internal API and redirects unauthorized dashboard access', async () => {
  const apiResponse = await proxy(new NextRequest('http://localhost/api/internal/leads'));
  const pageResponse = await proxy(new NextRequest('http://localhost/internal/dashboard'));

  assert.equal(apiResponse.status, 401);
  assert.equal(pageResponse.status, 307);
  assert.equal(pageResponse.headers.get('location')?.includes('/internal/login'), true);
});

test('allows an authorized session to reach internal endpoints', async () => {
  const previousPassword = process.env.ADMIN_PASSWORD;
  const previousSecret = process.env.ADMIN_SECRET;
  process.env.ADMIN_PASSWORD = 'phase-11-test-password';
  process.env.ADMIN_SECRET = 'phase-11-test-signing-key';

  try {
    const token = await createSession('phase-11-test-password');
    assert.ok(token);
    const response = await proxy(new NextRequest('http://localhost/api/internal/leads', {
      headers: { cookie: `${COOKIE_NAME}=${token}` },
    }));

    assert.equal(response.status, 200);
  } finally {
    if (previousPassword === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = previousPassword;
    if (previousSecret === undefined) delete process.env.ADMIN_SECRET;
    else process.env.ADMIN_SECRET = previousSecret;
  }
});
