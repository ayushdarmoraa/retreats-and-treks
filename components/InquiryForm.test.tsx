import assert from 'node:assert/strict';
import test, { before } from 'node:test';
import { createElement } from 'react';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://retreats-and-treks.test/contact',
});

Object.assign(globalThis, {
  self: dom.window,
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  Node: dom.window.Node,
  Event: dom.window.Event,
  MouseEvent: dom.window.MouseEvent,
  getComputedStyle: dom.window.getComputedStyle,
  IS_REACT_ACT_ENVIRONMENT: true,
});
Object.defineProperty(globalThis, 'navigator', {
  configurable: true,
  value: dom.window.navigator,
});

async function loadUi() {
  const [testingLibrary, userEventModule, nextContexts, inquiryForm, availabilityModal, trekMiniLeadForm, inlineInquiryForm] = await Promise.all([
    import('@testing-library/react'),
    import('@testing-library/user-event'),
    import('next/dist/shared/lib/hooks-client-context.shared-runtime'),
    import('./InquiryForm'),
    import('./AvailabilityModal'),
    import('./TrekMiniLeadForm'),
    import('./InlineInquiryForm'),
  ]);
  return {
    ...testingLibrary,
    userEvent: userEventModule.default,
    SearchParamsContext: nextContexts.SearchParamsContext,
    InquiryForm: inquiryForm.default,
    AvailabilityModal: availabilityModal.default,
    TrekMiniLeadForm: trekMiniLeadForm.default,
    validateProgressiveCaptureStep: inlineInquiryForm.validateProgressiveCaptureStep,
  };
}

type Ui = Awaited<ReturnType<typeof loadUi>>;
let ui: Ui;

before(async () => {
  ui = await loadUi();
});

interface FetchCall {
  url: string;
  init?: RequestInit;
}

interface FetchOptions {
  /** Queued responses for POST /api/inquire; the last one repeats if exhausted. */
  inquire: Array<Response | Promise<Response>>;
  /** Behaviour of the fire-and-forget telemetry endpoint. */
  track?: 'ok' | 'reject';
}

function installFetch(options: FetchOptions) {
  const calls: FetchCall[] = [];
  let inquireIndex = 0;
  const fetchMock = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, init });
    if (url === '/api/inquire') {
      const next = options.inquire[Math.min(inquireIndex, options.inquire.length - 1)];
      inquireIndex += 1;
      return next;
    }
    if (url === '/api/track') {
      if (options.track === 'reject') {
        return Promise.reject(new Error('telemetry endpoint offline'));
      }
      return { ok: true, json: async () => ({ ok: true }) } as Response;
    }
    return { ok: true, json: async () => ({}) } as Response;
  }) as typeof fetch;

  globalThis.fetch = fetchMock;
  dom.window.fetch = fetchMock;
  return calls;
}

function jsonResponse(body: Record<string, unknown>, ok = true): Response {
  return { ok, json: async () => body } as Response;
}

const QUERY = 'vertical=trek&category=roopkund-trek&source=/contact&location=sankri';

function renderForm(query = QUERY) {
  const result = ui.render(
    createElement(
      ui.SearchParamsContext.Provider,
      { value: new URLSearchParams(query) },
      createElement(ui.InquiryForm),
    ),
  );
  return { ...result, user: ui.userEvent.setup() };
}

async function fillValidContact(
  user: ReturnType<typeof ui.userEvent.setup>,
  email?: string,
) {
  await user.type(ui.screen.getByLabelText('Name *'), 'Asha Mehta');
  await user.type(ui.screen.getByLabelText('WhatsApp / phone *'), '+91 9876543210');
  if (email) {
    await user.type(ui.screen.getByLabelText('Email (optional)'), email);
  }
}

function submitForm() {
  const form = ui.screen.getByLabelText('Name *').closest('form');
  assert.ok(form, 'The inquiry form must be rendered.');
  ui.fireEvent.submit(form);
}

function inquirePayloads(calls: FetchCall[]) {
  return calls
    .filter((call) => call.url === '/api/inquire')
    .map((call) => JSON.parse(String(call.init?.body)) as Record<string, unknown>);
}

function trackEvents(calls: FetchCall[]) {
  return calls
    .filter((call) => call.url === '/api/track')
    .map((call) => JSON.parse(String(call.init?.body)) as { event?: string });
}

test('valid submission reaches the inquiry API with the standardized payload', async (t) => {
  t.after(() => ui.cleanup());
  dom.window.sessionStorage.clear();
  const calls = installFetch({
    inquire: [jsonResponse({ success: true, leadReference: 'RT-TEST-001' })],
  });
  const { user } = renderForm();

  await fillValidContact(user);
  submitForm();

  await ui.waitFor(() => assert.ok(calls.some((call) => call.url === '/api/inquire')));
  assert.ok(await ui.screen.findByText('Inquiry received.'));

  const payloads = inquirePayloads(calls);
  assert.equal(payloads.length, 1);
  assert.equal(payloads[0].name, 'Asha Mehta');
  assert.equal(payloads[0].phone, '+91 9876543210');
  assert.equal(payloads[0].source, '/contact');
  assert.equal(payloads[0].vertical, 'trek');
  assert.equal(payloads[0].category, 'roopkund-trek');
  assert.equal(payloads[0].location, 'sankri');
  assert.match(String(payloads[0].submissionToken), /^[0-9a-f-]{36}$/i);

  const events = trackEvents(calls);
  assert.equal(events.filter((event) => event.event === 'form_submission').length, 1);
  assert.equal(events.filter((event) => event.event === 'whatsapp_click').length, 0);
});

test('invalid input shows field-level validation feedback without submitting', async (t) => {
  t.after(() => ui.cleanup());
  dom.window.sessionStorage.clear();
  const calls = installFetch({ inquire: [jsonResponse({ success: true })] });
  const { user } = renderForm();

  submitForm();
  assert.ok(await ui.screen.findByText('Please enter your name.'));
  assert.ok(await ui.screen.findByText('Please enter a valid WhatsApp number.'));
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 0);

  await fillValidContact(user, 'not-an-email');
  submitForm();
  assert.ok(await ui.screen.findByText('Please enter a valid email address or leave it blank.'));
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 0);

  // Entered values stay available after a blocked submission.
  assert.equal((ui.screen.getByLabelText('Name *') as HTMLInputElement).value, 'Asha Mehta');
  assert.equal((ui.screen.getByLabelText('Email (optional)') as HTMLInputElement).value, 'not-an-email');
  assert.equal(ui.screen.queryByRole('link', { name: 'Continue on WhatsApp' }), null);
});

test('phone validation rejects unsupported characters before submitting', async (t) => {
  t.after(() => ui.cleanup());
  dom.window.sessionStorage.clear();
  const calls = installFetch({ inquire: [jsonResponse({ success: true })] });
  const { user } = renderForm();

  await user.type(ui.screen.getByLabelText('Name *'), 'Asha Mehta');
  await user.type(ui.screen.getByLabelText('WhatsApp / phone *'), 'abc1234567');
  submitForm();

  assert.ok(await ui.screen.findByText('Please enter a valid WhatsApp number.'));
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 0);
});

test('progressive inquiry contact validation matches the API phone format and length', () => {
  const validate = ui.validateProgressiveCaptureStep;
  const baseContact = { name: 'Asha Mehta', email: '' };

  assert.match(validate('contact', { ...baseContact, phone: 'abc1234567' }) ?? '', /valid WhatsApp number/);
  assert.match(validate('contact', { ...baseContact, phone: '1234567890123456' }) ?? '', /valid WhatsApp number/);
  assert.equal(validate('contact', { ...baseContact, phone: '+91 (987) 654-3210' }), undefined);
});

test('Trek mini form gives accessible phone feedback, preserves fields, and displays its saved reference', async (t) => {
  t.after(() => ui.cleanup());
  const calls = installFetch({
    inquire: [jsonResponse({ success: true, leadReference: 'RT-TREK-001' })],
  });
  ui.render(
    createElement(ui.TrekMiniLeadForm, {
      trekTitle: 'Roopkund Trek',
      trekSlug: 'roopkund-trek',
      locationId: 'sankri',
      sourcePath: '/treks/roopkund',
      bestSeason: ['May'],
    }),
  );
  const user = ui.userEvent.setup();
  const nameInput = ui.screen.getByLabelText('Name *');
  const phoneInput = ui.screen.getByLabelText('Phone / WhatsApp *');

  await user.type(nameInput, 'Asha Mehta');
  await user.type(phoneInput, 'letters1234567');
  submitForm();

  assert.match((await ui.screen.findByRole('alert')).textContent ?? '', /valid WhatsApp number/);
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 0);
  assert.equal((nameInput as HTMLInputElement).value, 'Asha Mehta');

  await user.clear(phoneInput);
  await user.type(phoneInput, '+91 9876543210');
  submitForm();

  assert.ok(await ui.screen.findByText('Reference: RT-TREK-001'));
  const handoff = ui.screen.getByRole('link', { name: 'Continue on WhatsApp' });
  assert.ok(new URL(handoff.getAttribute('href') ?? '').searchParams.get('text')?.includes('RT-TREK-001'));
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 1);
});

test('availability modal rejects malformed contact accessibly and displays the persisted reference', async (t) => {
  t.after(() => ui.cleanup());
  const calls = installFetch({
    inquire: [jsonResponse({ success: true, leadReference: 'RT-AVAIL-001' })],
  });
  ui.render(
    createElement(ui.AvailabilityModal, {
      trekTitle: 'Roopkund Trek',
      trekSlug: 'roopkund-trek',
      difficulty: 'Challenging',
      bestSeason: ['May'],
      locationId: 'sankri',
      locationName: 'Sankri',
      sourcePath: '/treks/roopkund',
      onClose: () => {},
    }),
  );
  const user = ui.userEvent.setup();
  await user.type(ui.screen.getByLabelText('Name *'), 'Asha Mehta');
  await user.selectOptions(ui.screen.getByLabelText('Preferred month *'), 'May');
  await user.selectOptions(ui.screen.getByLabelText('Group size *'), '2');
  await user.selectOptions(ui.screen.getByLabelText('Experience level *'), 'Beginner');
  assert.ok(ui.screen.getByLabelText('Email (optional)'));
  const contactInput = ui.screen.getByLabelText('WhatsApp / phone *');
  await user.type(contactInput, 'letters1234567');
  const form = contactInput.closest('form');
  assert.ok(form);
  ui.fireEvent.submit(form);

  assert.match((await ui.screen.findByRole('alert')).textContent ?? '', /valid WhatsApp number/);
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 0);

  await user.clear(contactInput);
  await user.type(contactInput, '+91 9876543210');
  ui.fireEvent.submit(form);

  assert.ok(await ui.screen.findByText('Reference: RT-AVAIL-001'));
  const handoff = ui.screen.getByRole('link', { name: 'Continue on WhatsApp' });
  assert.ok(new URL(handoff.getAttribute('href') ?? '').searchParams.get('text')?.includes('RT-AVAIL-001'));
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 1);
});

test('loading state prevents unintended duplicate submissions', async (t) => {
  t.after(() => ui.cleanup());
  dom.window.sessionStorage.clear();
  const pending = new Promise<Response>(() => {});
  const calls = installFetch({ inquire: [pending] });
  const { user } = renderForm();

  await fillValidContact(user);
  submitForm();
  submitForm();

  await ui.waitFor(() => {
    const button = ui.screen.getByRole('button', { name: 'Sending...' });
    assert.equal((button as HTMLButtonElement).disabled, true);
  });
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 1);
  assert.equal(ui.screen.queryByRole('link', { name: 'Continue on WhatsApp' }), null);
});

test('failed request preserves input and reuses the same submission token on retry', async (t) => {
  t.after(() => ui.cleanup());
  dom.window.sessionStorage.clear();
  const calls = installFetch({
    inquire: [
      jsonResponse(
        { success: false, code: 'persistence_error', error: 'Unable to save your enquiry. Please try again.' },
        false,
      ),
      jsonResponse({ success: true, duplicate: true, leadReference: 'RT-TEST-002' }),
    ],
  });
  const { user } = renderForm();
  await fillValidContact(user);
  submitForm();

  const alert = await ui.screen.findByRole('alert');
  assert.match(alert.textContent ?? '', /Unable to save your enquiry/);
  assert.equal(ui.screen.queryByText('Inquiry received.'), null);
  assert.equal(ui.screen.queryByRole('link', { name: 'Continue on WhatsApp' }), null);
  assert.equal((ui.screen.getByLabelText('Name *') as HTMLInputElement).value, 'Asha Mehta');
  assert.equal((ui.screen.getByLabelText('WhatsApp / phone *') as HTMLInputElement).value, '+91 9876543210');

  submitForm();
  assert.ok(await ui.screen.findByText('Inquiry received.'));
  assert.ok(ui.screen.getByText('Reference: RT-TEST-002'));
  const handoff = ui.screen.getByRole('link', { name: 'Continue on WhatsApp' });
  assert.ok(new URL(handoff.getAttribute('href') ?? '').searchParams.get('text')?.includes('RT-TEST-002'));

  const payloads = inquirePayloads(calls);
  assert.equal(payloads.length, 2);
  assert.match(String(payloads[0].submissionToken), /^[0-9a-f-]{36}$/i);
  assert.equal(
    payloads[1].submissionToken,
    payloads[0].submissionToken,
    'A retry of the same logical inquiry must reuse the pending submission token.',
  );
});

test('confirmed success offers an explicit, safely encoded WhatsApp handoff with the reference', async (t) => {
  t.after(() => ui.cleanup());
  dom.window.sessionStorage.clear();
  const calls = installFetch({
    inquire: [jsonResponse({ success: true, leadReference: 'RT-TEST-001' })],
  });
  const openCalls: string[] = [];
  const originalOpen = dom.window.open;
  dom.window.open = ((url?: string | URL) => {
    openCalls.push(String(url ?? ''));
    return null;
  }) as typeof dom.window.open;

  try {
    const { user } = renderForm();
    await fillValidContact(user);
    await user.selectOptions(ui.screen.getByLabelText('Group size'), '2');
    submitForm();

    assert.ok(await ui.screen.findByText('Inquiry received.'));
    assert.ok(ui.screen.getByText('Reference: RT-TEST-001'));
    const handoff = ui.screen.getByRole('link', { name: 'Continue on WhatsApp' });

    const rawHref = handoff.getAttribute('href') ?? '';
    assert.ok(!rawHref.includes(' '), 'Message content must be URL-encoded.');
    const handoffUrl = new URL(rawHref);
    assert.equal(handoffUrl.protocol, 'https:');
    assert.equal(handoffUrl.hostname, 'wa.me');
    assert.equal(handoffUrl.pathname, '/919760446101');

    const message = handoffUrl.searchParams.get('text') ?? '';
    assert.match(message, /Hi, I have submitted an enquiry for sankri/);
    assert.ok(message.includes('Lead reference: RT-TEST-001'));
    assert.ok(message.includes('Location: sankri'));
    assert.ok(message.includes('Group size: 2'));
    assert.ok(!message.includes('9876543210'), 'Phone number must not leak into the URL.');
    assert.ok(!message.includes('Asha Mehta'), 'Name must not leak into the URL.');

    assert.equal(handoff.getAttribute('target'), '_blank');
    assert.equal(openCalls.length, 0, 'WhatsApp must not open without an explicit user action.');
    assert.equal(dom.window.location.href, 'https://retreats-and-treks.test/contact');

    const events = trackEvents(calls);
    assert.equal(events.filter((event) => event.event === 'form_submission').length, 1);
    assert.equal(events.filter((event) => event.event === 'whatsapp_click').length, 0);
  } finally {
    dom.window.open = originalOpen;
  }
});

test('telemetry failure after persistence does not report the inquiry as failed', async (t) => {
  t.after(() => ui.cleanup());
  dom.window.sessionStorage.clear();
  const calls = installFetch({
    inquire: [jsonResponse({ success: true, leadReference: 'RT-TEST-003' })],
    track: 'reject',
  });
  const { user } = renderForm();
  await fillValidContact(user);
  submitForm();

  assert.ok(await ui.screen.findByText('Inquiry received.'));
  assert.equal(ui.screen.queryByRole('alert'), null);
  assert.ok(ui.screen.getByRole('link', { name: 'Continue on WhatsApp' }));
  assert.ok(calls.some((call) => call.url === '/api/track'), 'Telemetry was attempted.');
});
