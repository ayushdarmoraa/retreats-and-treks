'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { formatViolations, scanSource } = require('./check-whatsapp-links.cjs');

const WHATSAPP_DOMAIN = 'wa.me';
const WHATSAPP_ORIGIN = ['https:', '', WHATSAPP_DOMAIN].join('/');
const BUSINESS_NUMBER = ['91976', '044', '6101'].join('');
const WHATSAPP_URL = `${WHATSAPP_ORIGIN}/${BUSINESS_NUMBER}`;
const API_WHATSAPP_URL = `${['https:', '', 'api.whatsapp.com'].join('/')}/send?phone=${BUSINESS_NUMBER}`;

test('allows the central builder URL and configured business number only in its source file', () => {
  assert.deepEqual(
    scanSource(
      'lib/whatsapp.ts',
      `const number = '+91 9760446101';\nreturn \`${WHATSAPP_ORIGIN}/\${number}\`;`,
    ),
    [],
  );
});

test('allows the exact configured WhatsApp CSP origin', () => {
  assert.deepEqual(scanSource('next.config.ts', `"form-action 'self' ${WHATSAPP_ORIGIN}",`), []);
  assert.equal(
    scanSource('next.config.ts', `"form-action 'self' ${WHATSAPP_ORIGIN} https://example.com",`).length,
    1,
  );
});

test('allows only the known stale homepage links, not new links in that file', () => {
  assert.deepEqual(
    scanSource(
      'app/HomeClient_clean.tsx',
      `const whatsappLink = \`${WHATSAPP_URL}?text=\${encodeURIComponent(whatsappMessage)}\`;`,
    ),
    [],
  );
  assert.equal(
    scanSource('app/HomeClient_clean.tsx', `const newLink = "${WHATSAPP_URL}";`).length,
    1,
  );
});

test('flags raw wa.me and api.whatsapp.com links in ordinary source files', () => {
  const waMe = scanSource('app/page.tsx', `<a href="${WHATSAPP_URL}">Chat</a>`);
  const apiWhatsApp = scanSource(
    'components/Chat.tsx',
    `const href = "${API_WHATSAPP_URL}";`,
  );

  assert.equal(waMe.length, 1);
  assert.equal(apiWhatsApp.length, 1);
  assert.equal(waMe[0].file, 'app/page.tsx');
});

test('flags protocol-less WhatsApp hrefs and dynamic window.open bypasses', () => {
  assert.equal(
    scanSource('app/page.tsx', `<a href="//${WHATSAPP_DOMAIN}/${BUSINESS_NUMBER}">Chat</a>`).length,
    1,
  );
  const dynamicOpenCall = [
    'window.open(',
    'whatsappUrl);',
  ].join('');
  assert.equal(
    scanSource('app/page.tsx', dynamicOpenCall).length,
    1,
  );
});

test('keeps the builder exception narrow to its exact path', () => {
  const ordinarySource = scanSource(
    'components/page.tsx',
    `const href = \`${WHATSAPP_ORIGIN}/\${phone}\`;`,
  );

  assert.equal(ordinarySource.length, 1);
  assert.match(formatViolations(ordinarySource), /components\/page\.tsx:1/);
});
