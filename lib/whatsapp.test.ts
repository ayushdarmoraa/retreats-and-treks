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

test('WhatsApp capture message includes submitted details and keeps the existing destination', () => {
  const url = new URL(buildWhatsAppUrl({
    message: 'Hi, I want to plan a retreat.',
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    email: 'asha@example.com',
    retreatContext: 'Roopkund Trek - Sankri - 7 days - 2027-05-10',
    timing: 'May 2027',
    groupSize: '2',
    additionalNotes: 'Interested in a guided trek & yoga retreat.',
    leadReference: 'RT-261023-0002',
  }));
  const text = url.searchParams.get('text') || '';

  assert.equal(url.pathname, `/${DEFAULT_WHATSAPP_NUMBER.replace(/\D/g, '')}`);
  assert.match(text, /^Hi, I want to plan a retreat\./);
  assert.match(text, /Name: Asha Mehta/);
  assert.match(text, /Phone: \+91 9876543210/);
  assert.match(text, /Email: asha@example\.com/);
  assert.match(text, /Retreat: Roopkund Trek - Sankri - 7 days - 2027-05-10/);
  assert.match(text, /Preferred dates: May 2027/);
  assert.match(text, /Group size: 2/);
  assert.match(text, /Additional notes: Interested in a guided trek & yoga retreat\./);
  assert.match(text, /Lead reference: RT-261023-0002/);
  assert.match(url.search, /%20/);
  assert.match(url.search, /%26/);
});

test('WhatsApp capture message omits empty optional details', () => {
  const url = new URL(buildWhatsAppUrl({
    message: 'Hi, I want to plan a retreat.',
    name: 'Asha Mehta',
    phone: '+91 9876543210',
    retreatContext: '/retreats/chakrata',
    timing: ' ',
    groupSize: '',
    additionalNotes: '',
    leadReference: 'RT-261023-0002',
  }));
  const text = url.searchParams.get('text') || '';

  assert.match(text, /Retreat: \/retreats\/chakrata/);
  assert.doesNotMatch(text, /Email:|Preferred dates:|Group size:|Additional notes:/);
});

test('WhatsApp capture message omits a root-path retreat and lead reference when email is available', () => {
  const url = new URL(buildWhatsAppUrl({
    message: 'Hi, I want to plan a retreat.',
    email: 'asha@example.com',
    retreatContext: '/',
  }));
  const text = url.searchParams.get('text') || '';

  assert.match(text, /Email: asha@example\.com/);
  assert.doesNotMatch(text, /Retreat: \/|Lead reference:/);
});
