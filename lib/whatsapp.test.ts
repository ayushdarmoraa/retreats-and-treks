import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildCanonicalWhatsAppUrl,
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_NUMBER,
} from './whatsapp';

test('WhatsApp URLs use the configured destination and URL-encode customer messages', () => {
  const url = new URL(buildWhatsAppUrl({
    message: 'Hi, I’m interested in yoga & retreat details.',
    leadReference: 'RT-261009-0042',
  }));

  assert.equal(url.origin, new URL(buildWhatsAppUrl()).origin);
  assert.equal(url.pathname, `/${DEFAULT_WHATSAPP_NUMBER.replace(/\D/g, '')}`);
  assert.match(url.search, /%/);
  assert.match(url.searchParams.get('text') || '', /yoga & retreat details/);
  assert.match(url.searchParams.get('text') || '', /RT-261009-0042/);
  assert.doesNotMatch(url.searchParams.get('text') || '', /score|tier|routing|utm_|ip_hash/i);
});

test('canonical link builder preserves a legacy message only for the configured WhatsApp destination', () => {
  const canonicalNumber = DEFAULT_WHATSAPP_NUMBER.replace(/\D/g, '');
  const acceptedHref = new URL(buildWhatsAppUrl());
  acceptedHref.searchParams.set('text', 'Question about published dates');
  const rejectedHref = new URL(buildWhatsAppUrl());
  rejectedHref.pathname = '/15551234567';
  rejectedHref.searchParams.set('text', 'untrusted-destination-message');
  const accepted = new URL(buildCanonicalWhatsAppUrl(
    acceptedHref.toString(),
  ));
  const rejected = new URL(buildCanonicalWhatsAppUrl(
    rejectedHref.toString(),
    { message: 'Please share general retreat details.' },
  ));

  assert.equal(accepted.pathname, `/${canonicalNumber}`);
  assert.equal(accepted.searchParams.get('text'), 'Question about published dates');
  assert.equal(rejected.pathname, `/${canonicalNumber}`);
  assert.match(rejected.searchParams.get('text') || '', /general retreat details/);
  assert.doesNotMatch(rejected.searchParams.get('text') || '', /untrusted-destination-message/);
});
