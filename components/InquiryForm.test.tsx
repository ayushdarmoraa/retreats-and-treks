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
  const [testingLibrary, userEventModule, nextContexts, inquiryForm, availabilityModal, trekMiniLeadForm, inlineInquiryForm, retreatFinder, trackedWhatsAppLink] = await Promise.all([
    import('@testing-library/react'),
    import('@testing-library/user-event'),
    import('next/dist/shared/lib/hooks-client-context.shared-runtime'),
    import('./InquiryForm'),
    import('./AvailabilityModal'),
    import('./TrekMiniLeadForm'),
    import('./InlineInquiryForm'),
    import('./RetreatFinder'),
    import('./TrackedWhatsAppLink'),
  ]);
  return {
    ...testingLibrary,
    userEvent: userEventModule.default,
    SearchParamsContext: nextContexts.SearchParamsContext,
    InquiryForm: inquiryForm.default,
    AvailabilityModal: availabilityModal.default,
    TrekMiniLeadForm: trekMiniLeadForm.default,
    InlineInquiryForm: inlineInquiryForm.default,
    RetreatFinder: retreatFinder.default,
    TrackedWhatsAppLink: trackedWhatsAppLink.default,
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

function renderInlineForm(query = '') {
  const result = ui.render(
    createElement(
      ui.SearchParamsContext.Provider,
      { value: new URLSearchParams(query) },
      createElement(ui.InlineInquiryForm, {
        vertical: 'trek',
        category: 'general',
        sourcePath: '/contact',
      }),
    ),
  );
  return { ...result, user: ui.userEvent.setup() };
}

function renderTrackedWhatsAppLink() {
  function TestWhatsAppLink() {
    return (
      <ui.TrackedWhatsAppLink
        sourcePath="/treks/roopkund"
        vertical="trek"
        category="roopkund-trek"
        product="Roopkund Trek"
        productId="roopkund-trek"
        location="Sankri"
        duration="7 days"
        departureId="roopkund-may"
        departureDate="2027-05-10"
        ctaId="roopkund_hero_whatsapp"
        ctaLabel="Chat on WhatsApp"
        ctaPosition="hero"
      >
        Chat on WhatsApp
      </ui.TrackedWhatsAppLink>
    );
  }

  return ui.render(
    createElement(
      ui.SearchParamsContext.Provider,
      { value: new URLSearchParams(dom.window.location.search) },
      createElement(TestWhatsAppLink),
    ),
  );
}

function renderYogaFinder() {
  const result = ui.render(
    createElement(
      ui.SearchParamsContext.Provider,
      { value: new URLSearchParams(dom.window.location.search) },
      createElement(ui.RetreatFinder, {
        fromPath: '/yoga-retreats',
        yogaMode: true,
      }),
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
    .map((call) => JSON.parse(String(call.init?.body)) as {
      event?: string;
      meta?: Record<string, unknown>;
    });
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
  assert.equal(events.filter((event) => event.event === 'lead_capture_open').length, 1);
  assert.equal(events.filter((event) => event.event === 'whatsapp_click').length, 0);
  const sessionId = inquirePayloads(calls)[0].conversionSessionId;
  assert.equal(events.find((event) => event.event === 'lead_capture_open')?.meta?.conversion_session_id, sessionId);

  ui.cleanup();
  assert.equal(trackEvents(calls).filter((event) => event.event === 'lead_capture_abandon').length, 0);
});

test('generic contact submission includes its browser session and attribution snapshot', async (t) => {
  t.after(() => ui.cleanup());
  dom.window.sessionStorage.clear();
  const calls = installFetch({
    inquire: [jsonResponse({ success: true, leadReference: 'RT-TEST-ATTR' })],
  });
  const { readConversionSessionId } = await import('../lib/conversion-foundation');
  const expectedSessionId = readConversionSessionId();
  const { user } = renderForm(`${QUERY}&utm_source=campaign&utm_medium=email`);

  await fillValidContact(user);
  submitForm();
  await ui.waitFor(() => assert.ok(calls.some((call) => call.url === '/api/inquire')));

  const [payload] = inquirePayloads(calls);
  assert.equal(payload.conversionSessionId, expectedSessionId);
  assert.equal((payload.firstUtm as Record<string, unknown>).utm_source, 'campaign');
  assert.equal((payload.firstUtm as Record<string, unknown>).utm_medium, 'email');
  assert.equal((payload.lastUtm as Record<string, unknown>).utm_source, 'campaign');
  assert.equal(payload.phone, '+91 9876543210');
  assert.equal(payload.email, '');
  const submissionEvent = trackEvents(calls).find((event) => event.event === 'form_submission');
  assert.equal(submissionEvent?.meta?.conversion_session_id, expectedSessionId);
});

test('direct WhatsApp CTA requires consent, saves contextual lead and opens only after explicit handoff', async (t) => {
  t.after(() => {
    ui.cleanup();
    dom.window.history.replaceState({}, '', '/contact');
    dom.window.sessionStorage.clear();
  });
  dom.window.sessionStorage.clear();
  dom.window.history.replaceState({}, '', '/treks/roopkund?utm_source=partner&utm_campaign=summer');
  const calls = installFetch({
    inquire: [jsonResponse({ success: true, leadReference: 'RT-WA-0001' })],
  });
  const { readConversionSessionId } = await import('../lib/conversion-foundation');
  const expectedSessionId = readConversionSessionId();
  const user = ui.userEvent.setup();
  renderTrackedWhatsAppLink();

  const cta = ui.screen.getByRole('link', { name: 'Chat on WhatsApp' });
  assert.equal(cta.getAttribute('target'), '_blank');
  await user.click(cta);
  const dialog = ui.screen.getByRole('dialog', { name: 'Before you continue to WhatsApp' });
  assert.ok(dialog);
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 0);
  assert.match(
    ui.screen.getByText(/contact me on WhatsApp/i).textContent ?? '',
    /contact me on WhatsApp/i,
  );

  await user.type(ui.screen.getByLabelText('Name *'), 'Asha Mehta');
  await user.type(ui.screen.getByLabelText('WhatsApp / phone *'), '+91 9876543210');
  await user.type(ui.screen.getByLabelText('Email (optional)'), 'asha@example.com');
  await user.type(ui.screen.getByLabelText('Preferred dates or timing (optional)'), 'May 2027');
  await user.type(ui.screen.getByLabelText('Group size (optional)'), '2');
  await user.type(ui.screen.getByLabelText('Anything else we should know? (optional)'), 'Interested in a guided trek.');

  await user.click(ui.screen.getByRole('button', { name: 'Save and continue' }));
  assert.match((await ui.screen.findByRole('alert')).textContent ?? '', /agree/i);
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 0);
  assert.equal(ui.screen.queryByRole('link', { name: 'Continue to WhatsApp' }), null);

  const phoneInput = ui.screen.getByLabelText('WhatsApp / phone *');
  await user.clear(phoneInput);
  await user.type(phoneInput, 'letters1234567');
  await user.click(ui.screen.getByRole('button', { name: 'Save and continue' }));
  assert.match((await ui.screen.findByRole('alert')).textContent ?? '', /valid WhatsApp number/);
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 0);

  await user.clear(phoneInput);
  await user.type(phoneInput, '+91 9876543210');
  await user.click(ui.screen.getByLabelText(/I agree that Retreats and Treks/));
  await user.click(ui.screen.getByRole('button', { name: 'Save and continue' }));
  await ui.waitFor(() => assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 1));
  const successDialog = await ui.screen.findByRole('dialog', { name: 'Continue to WhatsApp' });
  assert.equal(
    ui.within(successDialog).queryByText(/enquiry saved|details are saved|reference:/i),
    null,
  );
  assert.ok(ui.within(successDialog).getByRole('link', { name: 'Continue to WhatsApp' }));

  const [payload] = inquirePayloads(calls);
  assert.equal(payload.name, 'Asha Mehta');
  assert.equal(payload.phone, '+91 9876543210');
  assert.equal(payload.email, 'asha@example.com');
  assert.equal(payload.source, '/treks/roopkund');
  assert.equal(payload.productId, 'roopkund-trek');
  assert.equal(payload.departureId, 'roopkund-may');
  assert.equal(payload.location, 'Sankri');
  assert.equal(payload.preferredTiming, 'May 2027');
  assert.equal(payload.groupSize, '2');
  assert.equal(payload.conversionSessionId, expectedSessionId);
  assert.equal(payload.firstLandingPage, '/treks/roopkund');
  assert.equal((payload.firstUtm as Record<string, unknown>).utm_source, 'partner');
  assert.equal((payload.lastUtm as Record<string, unknown>).utm_campaign, 'summer');
  assert.match(String(payload.additionalRequest), /Interested in a guided trek/);
  assert.match(String(payload.additionalRequest), /consent provided/i);
  assert.equal(trackEvents(calls).filter((event) => event.event === 'whatsapp_click').length, 0);

  const handoff = ui.screen.getByRole('link', { name: 'Continue to WhatsApp' });
  const handoffUrl = new URL(handoff.getAttribute('href') ?? '');
  assert.equal(handoffUrl.hostname, 'wa.me');
  const handoffMessage = handoffUrl.searchParams.get('text') || '';
  assert.match(handoffMessage, /Name: Asha Mehta/);
  assert.match(handoffMessage, /Phone: \+91 9876543210/);
  assert.match(handoffMessage, /Retreat: Roopkund Trek - Sankri - 7 days - 2027-05-10/);
  assert.match(handoffMessage, /Preferred dates: May 2027/);
  assert.match(handoffMessage, /Group size: 2/);
  assert.match(handoffMessage, /Additional notes: Interested in a guided trek\./);
  assert.match(handoffMessage, /Lead reference: RT-WA-0001/);
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 1);

  handoff.addEventListener('click', (event) => event.preventDefault(), { once: true });
  await user.click(handoff);
  await ui.waitFor(() => {
    const handoffEvent = trackEvents(calls).find((event) => event.event === 'whatsapp_click');
    assert.ok(handoffEvent);
    assert.equal(handoffEvent.meta?.lead_reference, 'RT-WA-0001');
    assert.equal(handoffEvent.meta?.conversion_session_id, expectedSessionId);
  });
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 1);
});

test('direct WhatsApp CTA keeps capture retryable after persistence failure and never auto-opens', async (t) => {
  t.after(() => {
    ui.cleanup();
    dom.window.history.replaceState({}, '', '/contact');
    dom.window.sessionStorage.clear();
  });
  dom.window.sessionStorage.clear();
  dom.window.history.replaceState({}, '', '/treks/roopkund');
  const calls = installFetch({
    inquire: [
      jsonResponse({ success: false, code: 'persistence_error', error: 'Unable to save your enquiry.' }, false),
      jsonResponse({ success: true, leadReference: 'RT-WA-RETRY' }),
    ],
  });
  const user = ui.userEvent.setup();
  renderTrackedWhatsAppLink();
  await user.click(ui.screen.getByRole('link', { name: 'Chat on WhatsApp' }));
  await user.type(ui.screen.getByLabelText('Name *'), 'Asha Mehta');
  await user.type(ui.screen.getByLabelText('WhatsApp / phone *'), '+91 9876543210');
  await user.click(ui.screen.getByLabelText(/I agree that Retreats and Treks/));

  await user.click(ui.screen.getByRole('button', { name: 'Save and continue' }));
  assert.equal((await ui.screen.findByRole('alert')).textContent, 'Unable to save your enquiry.');
  assert.equal(ui.screen.queryByText('Enquiry saved'), null);
  assert.equal(ui.screen.queryByRole('link', { name: 'Continue to WhatsApp' }), null);
  assert.equal(trackEvents(calls).filter((event) => event.event === 'whatsapp_click').length, 0);
  assert.equal((ui.screen.getByLabelText('Name *') as HTMLInputElement).value, 'Asha Mehta');

  await user.click(ui.screen.getByRole('button', { name: 'Save and continue' }));
  const successDialog = await ui.screen.findByRole('dialog', { name: 'Continue to WhatsApp' });
  assert.ok(ui.within(successDialog).getByRole('link', { name: 'Continue to WhatsApp' }));
  assert.equal(
    ui.within(successDialog).queryByText(/enquiry saved|details are saved|reference:/i),
    null,
  );
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 2);
  const payloads = inquirePayloads(calls);
  assert.equal(payloads[1].submissionToken, payloads[0].submissionToken);
  assert.equal(trackEvents(calls).filter((event) => event.event === 'whatsapp_click').length, 0);
});

test('contact form reports an engaged abandonment with the same conversion session', async (t) => {
  t.after(() => ui.cleanup());
  dom.window.sessionStorage.clear();
  const calls = installFetch({ inquire: [jsonResponse({ success: true })] });
  const { user } = renderForm();
  await user.click(ui.screen.getByLabelText('Name *'));

  ui.cleanup();

  const events = trackEvents(calls);
  const opened = events.find((event) => event.event === 'lead_capture_open');
  const abandoned = events.find((event) => event.event === 'lead_capture_abandon');
  assert.ok(opened);
  assert.ok(abandoned);
  assert.equal(abandoned.meta?.conversion_session_id, opened.meta?.conversion_session_id);
  assert.equal(abandoned.meta?.form, 'contact_inquiry');
});

test('Yoga Retreat Finder carries its recommendation and attribution into a structured inquiry', async (t) => {
  const initialUrl = dom.window.location.href;
  t.after(() => {
    ui.cleanup();
    dom.window.history.replaceState({}, '', initialUrl);
    dom.window.sessionStorage.clear();
  });
  dom.window.sessionStorage.clear();
  dom.window.history.replaceState({}, '', '/yoga-retreats?utm_source=finder&utm_campaign=autumn');
  const calls = installFetch({
    inquire: [jsonResponse({ success: true, leadReference: 'RT-YOGA-FINDER-001' })],
  });
  const { user } = renderYogaFinder();
  const answers = [
    ['Yoga Teacher Training', 'Next →'],
    ['No preference', 'Next →'],
    ['Flexible', 'Next →'],
    ['Not sure', 'Next →'],
    ['Not sure yet', 'Next →'],
    ['No timing information', 'Show my matches →'],
  ] as const;

  for (const [answer, next] of answers) {
    await user.click(ui.screen.getByRole('button', { name: answer }));
    await user.click(ui.screen.getByRole('button', { name: next }));
  }

  assert.ok(ui.screen.getByRole('heading', { name: 'Yoga Teacher Training enquiry' }));
  await user.click(ui.screen.getByRole('button', { name: 'Send structured enquiry' }));
  await user.type(ui.screen.getByLabelText('Name *'), 'Asha Mehta');
  await user.type(ui.screen.getByLabelText('WhatsApp / phone *'), '+91 9876543210');
  await user.click(ui.screen.getByRole('button', { name: 'Next' }));
  await user.click(ui.screen.getByRole('button', { name: 'Send enquiry' }));

  assert.ok(await ui.screen.findByText('Inquiry received.'));
  assert.ok(ui.screen.getByText('Reference: RT-YOGA-FINDER-001'));

  const [payload] = inquirePayloads(calls);
  assert.equal(String(payload.source).split('?')[0], '/yoga-retreats');
  assert.equal(payload.vertical, 'yoga');
  assert.equal(payload.category, 'yoga-finder');
  assert.equal(payload.yogaInterest, 'Yoga TTC');
  assert.equal(payload.productId, 'yoga-ttc');
  assert.equal(payload.conversionSessionId, JSON.parse(
    String(calls.find((call) => call.url === '/api/track'
      && JSON.parse(String(call.init?.body)).event === 'cta_click')?.init?.body),
  ).meta.conversion_session_id);
  assert.equal((payload.firstUtm as Record<string, unknown>).utm_source, 'finder');
  assert.equal((payload.lastUtm as Record<string, unknown>).utm_campaign, 'autumn');
});

test('Yoga Finder does not show success or offer WhatsApp after inquiry persistence fails', async (t) => {
  const initialUrl = dom.window.location.href;
  t.after(() => {
    ui.cleanup();
    dom.window.history.replaceState({}, '', initialUrl);
    dom.window.sessionStorage.clear();
  });
  dom.window.history.replaceState({}, '', '/yoga-retreats');
  const calls = installFetch({
    inquire: [jsonResponse({ success: false, error: 'Unable to save enquiry.' }, false)],
  });
  const { user } = renderYogaFinder();
  const answers = [
    ['Yoga Teacher Training', 'Next →'],
    ['No preference', 'Next →'],
    ['Flexible', 'Next →'],
    ['Not sure', 'Next →'],
    ['Not sure yet', 'Next →'],
    ['No timing information', 'Show my matches →'],
  ] as const;

  for (const [answer, next] of answers) {
    await user.click(ui.screen.getByRole('button', { name: answer }));
    await user.click(ui.screen.getByRole('button', { name: next }));
  }
  await user.click(ui.screen.getByRole('button', { name: 'Send structured enquiry' }));
  await user.type(ui.screen.getByLabelText('Name *'), 'Asha Mehta');
  await user.type(ui.screen.getByLabelText('WhatsApp / phone *'), '+91 9876543210');
  await user.click(ui.screen.getByRole('button', { name: 'Next' }));
  await user.click(ui.screen.getByRole('button', { name: 'Send enquiry' }));

  assert.equal((await ui.screen.findByRole('alert')).textContent, 'Unable to save enquiry.');
  assert.equal(ui.screen.queryByText('Inquiry received.'), null);
  assert.equal(ui.screen.queryByRole('link', { name: 'Continue on WhatsApp' }), null);
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 1);
});

test('progressive abandonment reports the last active step at each capture stage', async (t) => {
  t.after(() => ui.cleanup());
  for (const [step, continueCount] of [
    ['interest', 0],
    ['destination', 1],
    ['timing', 2],
    ['group', 3],
    ['contact', 4],
  ] as const) {
    dom.window.sessionStorage.clear();
    const calls = installFetch({ inquire: [jsonResponse({ success: true })] });
    const { user, unmount } = renderInlineForm();

    for (let index = 0; index < continueCount; index += 1) {
      if (index === 0) {
        await user.selectOptions(ui.screen.getByLabelText('Interested in'), 'trek');
      } else if (index === 1) {
        await user.selectOptions(ui.screen.getByLabelText('Destination (optional)'), 'chakrata');
      }
      await user.click(ui.screen.getByRole('button', { name: 'Continue' }));
    }

    assert.ok(ui.screen.getByRole('heading', { name: {
      interest: 'What are you interested in?',
      destination: 'Where would you like to go?',
      timing: 'When are you thinking of travelling?',
      group: 'How many people are travelling?',
      contact: 'How can we reach you?',
    }[step] }));
    unmount();

    await ui.waitFor(() => {
      assert.ok(trackEvents(calls).some((event) => event.event === 'lead_capture_abandon'));
    });
    const abandonment = trackEvents(calls).find((event) => event.event === 'lead_capture_abandon');
    assert.equal(abandonment?.meta?.step, step);
  }
});

test('successfully saved progressive inquiry is not recorded as abandoned', async (t) => {
  t.after(() => ui.cleanup());
  dom.window.sessionStorage.clear();
  const calls = installFetch({
    inquire: [jsonResponse({ success: true, leadReference: 'RT-TEST-SAVED' })],
  });
  const { user, unmount } = renderInlineForm();

  await user.selectOptions(ui.screen.getByLabelText('Interested in'), 'trek');
  await user.click(ui.screen.getByRole('button', { name: 'Continue' }));
  await user.click(ui.screen.getByRole('button', { name: 'Continue' }));
  await user.click(ui.screen.getByRole('button', { name: 'Continue' }));
  await user.click(ui.screen.getByRole('button', { name: 'Continue' }));
  await user.type(ui.screen.getByLabelText('Name *'), 'Asha Mehta');
  await user.type(ui.screen.getByLabelText('WhatsApp / phone *'), '+91 9876543210');
  await user.click(ui.screen.getByRole('button', { name: 'Save my details' }));
  assert.ok(await ui.screen.findByText('Your details are saved.'));

  unmount();
  assert.equal(
    trackEvents(calls).filter((event) => event.event === 'lead_capture_abandon').length,
    0,
  );
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
  const initialUrl = dom.window.location.href;
  t.after(() => {
    ui.cleanup();
    dom.window.history.replaceState({}, '', initialUrl);
    dom.window.sessionStorage.clear();
  });
  dom.window.sessionStorage.clear();
  dom.window.history.replaceState({}, '', '/treks/roopkund?utm_source=partner&utm_campaign=autumn');
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
  const [payload] = inquirePayloads(calls);
  assert.equal(typeof payload.conversionSessionId, 'string');
  assert.ok((payload.conversionSessionId as string).length > 0);
  assert.equal((payload.firstUtm as Record<string, unknown>).utm_source, 'partner');
  assert.equal((payload.firstUtm as Record<string, unknown>).utm_campaign, 'autumn');
  assert.equal((payload.lastUtm as Record<string, unknown>).utm_source, 'partner');

  ui.cleanup();
  assert.equal(trackEvents(calls).filter((event) => event.event === 'lead_capture_abandon').length, 0);
});

test('Trek mini form reports an engaged abandonment with its conversion session', async (t) => {
  t.after(() => ui.cleanup());
  dom.window.sessionStorage.clear();
  const calls = installFetch({ inquire: [jsonResponse({ success: true })] });
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
  await user.click(ui.screen.getByLabelText('Name *'));

  ui.cleanup();

  const events = trackEvents(calls);
  const opened = events.find((event) => event.event === 'lead_capture_open');
  const abandoned = events.find((event) => event.event === 'lead_capture_abandon');
  assert.ok(opened);
  assert.ok(abandoned);
  assert.equal(abandoned.meta?.conversion_session_id, opened.meta?.conversion_session_id);
  assert.equal(abandoned.meta?.form, 'trek_mini');
});

test('Trek mini form does not report success or offer WhatsApp after persistence fails', async (t) => {
  t.after(() => ui.cleanup());
  const calls = installFetch({
    inquire: [jsonResponse({ success: false, error: 'Unable to save trek enquiry.' }, false)],
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
  await user.type(ui.screen.getByLabelText('Name *'), 'Asha Mehta');
  await user.type(ui.screen.getByLabelText('Phone / WhatsApp *'), '+91 9876543210');
  submitForm();

  assert.equal((await ui.screen.findByRole('alert')).textContent, 'Unable to save trek enquiry.');
  assert.equal(ui.screen.queryByText('Reference:'), null);
  assert.equal(ui.screen.queryByRole('link', { name: 'Continue on WhatsApp' }), null);
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 1);
});

test('Availability modal reports an engaged abandonment with its conversion session', async (t) => {
  t.after(() => ui.cleanup());
  dom.window.sessionStorage.clear();
  const calls = installFetch({ inquire: [jsonResponse({ success: true })] });
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
  await user.click(ui.screen.getByLabelText('Name *'));

  ui.cleanup();

  const events = trackEvents(calls);
  const opened = events.find((event) => event.event === 'lead_capture_open');
  const abandoned = events.find((event) => event.event === 'lead_capture_abandon');
  assert.ok(opened);
  assert.ok(abandoned);
  assert.equal(abandoned.meta?.conversion_session_id, opened.meta?.conversion_session_id);
  assert.equal(abandoned.meta?.form, 'availability_modal');
});

test('availability modal submission includes the browser session and attribution snapshot', async (t) => {
  t.after(() => {
    ui.cleanup();
    dom.window.history.replaceState({}, '', '/contact');
    dom.window.sessionStorage.clear();
  });
  dom.window.sessionStorage.clear();
  dom.window.history.replaceState({}, '', '/treks/roopkund?utm_source=modal&utm_campaign=autumn');
  const calls = installFetch({
    inquire: [jsonResponse({ success: true, leadReference: 'RT-AVAIL-ATTR' })],
  });
  const { readConversionSessionId } = await import('../lib/conversion-foundation');
  const expectedSessionId = readConversionSessionId();
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
  await user.type(ui.screen.getByLabelText('WhatsApp / phone *'), '+91 9876543210');
  await user.click(ui.screen.getByRole('button', { name: 'Check Availability' }));
  await ui.waitFor(() => assert.ok(calls.some((call) => call.url === '/api/inquire')));

  const [payload] = inquirePayloads(calls);
  assert.equal(payload.conversionSessionId, expectedSessionId);
  assert.equal((payload.firstUtm as Record<string, unknown>).utm_source, 'modal');
  assert.equal((payload.firstUtm as Record<string, unknown>).utm_campaign, 'autumn');
  assert.equal((payload.lastUtm as Record<string, unknown>).utm_source, 'modal');
  assert.equal(payload.firstLandingPage, '/treks/roopkund');
  assert.equal(payload.lastLandingPage, '/treks/roopkund');
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

  ui.cleanup();
  assert.equal(trackEvents(calls).filter((event) => event.event === 'lead_capture_abandon').length, 0);
});

test('availability modal does not report success or offer WhatsApp after persistence fails', async (t) => {
  t.after(() => ui.cleanup());
  const calls = installFetch({
    inquire: [jsonResponse({ success: false, error: 'Unable to save availability request.' }, false)],
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
  await user.type(ui.screen.getByLabelText('WhatsApp / phone *'), '+91 9876543210');
  submitForm();

  assert.equal((await ui.screen.findByRole('alert')).textContent, 'Unable to save availability request.');
  assert.equal(ui.screen.queryByText('Reference:'), null);
  assert.equal(ui.screen.queryByRole('link', { name: 'Continue on WhatsApp' }), null);
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
    inquire: [jsonResponse({ success: true, leadReference: 'RT-261016-0001' })],
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
    assert.ok(ui.screen.getByText('Reference: RT-261016-0001'));
    const handoff = ui.screen.getByRole('link', { name: 'Continue on WhatsApp' });

    const rawHref = handoff.getAttribute('href') ?? '';
    assert.ok(!rawHref.includes(' '), 'Message content must be URL-encoded.');
    const handoffUrl = new URL(rawHref);
    assert.equal(handoffUrl.protocol, 'https:');
    assert.equal(handoffUrl.hostname, 'wa.me');
    assert.equal(handoffUrl.pathname, '/919760446101');

    const message = handoffUrl.searchParams.get('text') ?? '';
    assert.match(message, /Hi, I have submitted an enquiry for sankri/);
    assert.ok(message.includes('Lead reference: RT-261016-0001'));
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

      await user.click(handoff);
      await ui.waitFor(() => {
        assert.equal(trackEvents(calls).filter((event) => event.event === 'whatsapp_click').length, 1);
      });
      const handoffEvent = trackEvents(calls).find((event) => event.event === 'whatsapp_click');
      assert.equal(handoffEvent?.meta?.lead_reference, 'RT-261016-0001');
      assert.equal(handoffEvent?.meta?.conversion_session_id, inquirePayloads(calls)[0].conversionSessionId);
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
