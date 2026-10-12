import assert from 'node:assert/strict';
import test, { before, type TestContext } from 'node:test';
import { createElement } from 'react';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://retreats-and-treks.test/retreats/sankri/weekend-retreat',
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
  const [testingLibrary, userEventModule, nextContexts, ctaModule] = await Promise.all([
    import('@testing-library/react'),
    import('@testing-library/user-event'),
    import('next/dist/shared/lib/hooks-client-context.shared-runtime'),
    import('@/components/CTAExpandToggle'),
  ]);
  return {
    ...testingLibrary,
    userEvent: userEventModule.default,
    SearchParamsContext: nextContexts.SearchParamsContext,
    CTAExpandToggle: ctaModule.default,
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

function installFetch(inquireResponse: Promise<Response> | Response) {
  const calls: FetchCall[] = [];
  const fetchMock = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, init });
    if (url === '/api/inquire') return inquireResponse;
    return { ok: true, json: async () => ({ success: true }) } as Response;
  }) as typeof fetch;

  globalThis.fetch = fetchMock;
  dom.window.fetch = fetchMock;
  return calls;
}

function jsonResponse(body: Record<string, unknown>, ok = true): Response {
  return { ok, json: async () => body } as Response;
}

function renderJourneyEnquiry() {
  const result = ui.render(
    createElement(
      ui.SearchParamsContext.Provider,
      { value: new URLSearchParams() },
      createElement(ui.CTAExpandToggle, {
        label: 'Chat on WhatsApp',
        vertical: 'retreat',
        category: 'weekend-retreat',
        sourcePath: '/retreats/sankri/weekend-retreat',
        location: 'Sankri',
        productName: 'Weekend Retreat in Sankri',
        ctaId: 'sankri_weekend_hero_enquiry',
        ctaPosition: 'hero',
      }),
    ),
  );
  return {
    ...result,
    user: ui.userEvent.setup(),
  };
}

async function advanceToContact(user: ReturnType<typeof ui.userEvent.setup>) {
  for (let step = 0; step < 5; step += 1) {
    const saveButton = ui.screen.queryByRole('button', { name: 'Save my details' });
    if (saveButton) return saveButton;
    await user.click(ui.screen.getByRole('button', { name: 'Continue' }));
  }
  return ui.screen.getByRole('button', { name: 'Save my details' });
}

async function completeContactDetails(user: ReturnType<typeof ui.userEvent.setup>) {
  await user.type(ui.screen.getByLabelText('Name *'), 'Asha Mehta');
  await user.type(ui.screen.getByLabelText('WhatsApp / phone *'), '+91 9876543210');
}

function releaseTestResources(
  t: TestContext,
  originalFetch: typeof fetch,
) {
  t.after(() => {
    ui.cleanup();
    globalThis.fetch = originalFetch;
    dom.window.fetch = originalFetch;
  });
}

test('journey CTA submits verified page context and only exposes an explicit WhatsApp handoff after persistence', async (t) => {
  const originalFetch = globalThis.fetch;
  releaseTestResources(t, originalFetch);
  let resolveInquiry!: (response: Response) => void;
  const pendingResponse = new Promise<Response>((resolve) => {
    resolveInquiry = resolve;
  });
  const calls = installFetch(pendingResponse);
  const { user } = renderJourneyEnquiry();

  await user.click(ui.screen.getByRole('button', { name: 'Chat on WhatsApp' }));
  await advanceToContact(user);
  await completeContactDetails(user);
  await user.click(ui.screen.getByRole('button', { name: 'Save my details' }));

  await ui.waitFor(() => {
    assert.ok(calls.some((call) => call.url === '/api/inquire'));
  });
  assert.equal(ui.screen.queryByText('Your details are saved.'), null);
  assert.equal(ui.screen.queryByRole('link', { name: 'Continue on WhatsApp' }), null);

  resolveInquiry(jsonResponse({ success: true, leadReference: 'RT-PHASE9-TEST' }));
  await ui.waitFor(() => {
    assert.ok(ui.screen.getByText('Your details are saved.'));
  });

  const inquiryCall = calls.find((call) => call.url === '/api/inquire');
  assert.ok(inquiryCall?.init?.body);
  const payload = JSON.parse(String(inquiryCall.init.body)) as Record<string, unknown>;
  assert.equal(payload.source, '/retreats/sankri/weekend-retreat');
  assert.equal(payload.pageType, 'retreat_product');
  assert.equal(payload.category, 'weekend-retreat');
  assert.equal(payload.location, 'Sankri');
  assert.equal(payload.product, 'Weekend Retreat in Sankri');
  assert.equal(payload.ctaId, 'sankri_weekend_hero_enquiry');
  assert.equal(payload.ctaPosition, 'hero');

  const handoff = ui.screen.getByRole('link', { name: 'Continue on WhatsApp' });
  const handoffUrl = new URL(handoff.getAttribute('href') || '');
  const message = handoffUrl.searchParams.get('text') || '';
  assert.equal(handoffUrl.hostname, 'wa.me');
  assert.equal(handoffUrl.pathname, '/919760446101');
  assert.match(message, /Weekend Retreat in Sankri/);
  assert.match(message, /Sankri/);
  assert.doesNotMatch(message, /utm_|cta_id|conversion_session_id|lead score|routing/i);

  const trackEvents = () => calls
    .filter((call) => call.url === '/api/track')
    .map((call) => JSON.parse(String(call.init?.body)) as { event?: string; meta?: Record<string, unknown> });
  const beforeExplicitClick = trackEvents();
  assert.equal(beforeExplicitClick.filter((event) => event.event === 'whatsapp_click').length, 0);
  assert.equal(
    beforeExplicitClick.filter((event) => event.event === 'cta_click' && event.meta?.cta_id === 'sankri_weekend_hero_enquiry').length,
    1,
  );

  handoff.addEventListener('click', (event) => event.preventDefault(), { once: true });
  await user.click(handoff);
  await ui.waitFor(() => {
    assert.equal(trackEvents().filter((event) => event.event === 'whatsapp_click').length, 1);
  });
});

test('journey CTA does not expose success or WhatsApp after a persistence failure', async (t) => {
  const originalFetch = globalThis.fetch;
  releaseTestResources(t, originalFetch);
  const calls = installFetch(jsonResponse({ success: false, error: 'Unable to save' }, false));
  const { user } = renderJourneyEnquiry();

  await user.click(ui.screen.getByRole('button', { name: 'Chat on WhatsApp' }));
  await advanceToContact(user);
  await completeContactDetails(user);
  await user.click(ui.screen.getByRole('button', { name: 'Save my details' }));

  await ui.waitFor(() => {
    assert.ok(ui.screen.getByText('Unable to save'));
  });
  assert.equal(ui.screen.queryByText('Your details are saved.'), null);
  assert.equal(ui.screen.queryByRole('link', { name: 'Continue on WhatsApp' }), null);
  assert.equal(calls.filter((call) => call.url === '/api/inquire').length, 1);
  const trackEvents = calls
    .filter((call) => call.url === '/api/track')
    .map((call) => JSON.parse(String(call.init?.body)) as { event?: string });
  assert.equal(trackEvents.filter((event) => event.event === 'whatsapp_click').length, 0);
});
