import assert from 'node:assert/strict';
import test, { before, type TestContext } from 'node:test';
import { createElement } from 'react';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://retreats-and-treks.test/retreats/art',
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
  const [testingLibrary, userEventModule, nextContexts, artDepartures, events] = await Promise.all([
    import('@testing-library/react'),
    import('@testing-library/user-event'),
    import('next/dist/shared/lib/hooks-client-context.shared-runtime'),
    import('./ArtFixedDepartures'),
    import('@/config/retreatProgramEvents'),
  ]);
  return {
    ...testingLibrary,
    userEvent: userEventModule.default,
    SearchParamsContext: nextContexts.SearchParamsContext,
    ArtFixedDepartures: artDepartures.default,
    getUpcomingEvents: events.getUpcomingEvents,
  };
}

type Ui = Awaited<ReturnType<typeof loadUi>>;
let ui: Ui;
before(async () => {
  ui = await loadUi();
});

const ART_SERVICE_SLUGS = ['art-and-creative', 'trek-and-paint', 'weekend-art-retreat'];

function usePublishedDepartureDate(t: TestContext) {
  t.mock.timers.enable({ apis: ['Date'], now: new Date('2026-10-01T00:00:00Z') });
  t.after(() => {
    ui.cleanup();
    t.mock.timers.reset();
  });
}

interface FetchCall {
  url: string;
  init?: RequestInit;
}

function installFetch(inquireResponse: Promise<Response> | Response) {
  const calls: FetchCall[] = [];
  const fetchMock = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, init });
    if (url === '/api/inquire') {
      return inquireResponse;
    }
    return { ok: true, json: async () => ({}) } as Response;
  }) as typeof fetch;

  globalThis.fetch = fetchMock;
  dom.window.fetch = fetchMock;
  return calls;
}

function jsonResponse(
  body: Record<string, unknown>,
  ok = true,
): Response {
  return { ok, json: async () => body } as Response;
}

function getPublishedArtDeparture() {
  const departure = ui.getUpcomingEvents().find((event) =>
    ART_SERVICE_SLUGS.includes(event.serviceSlug),
  );
  assert.ok(departure, 'A published upcoming Art departure is required for this UI regression test.');
  return departure;
}

function renderFixedDepartures() {
  const departure = getPublishedArtDeparture();
  const result = ui.render(
    createElement(
      ui.SearchParamsContext.Provider,
      { value: new URLSearchParams() },
      createElement(ui.ArtFixedDepartures),
    ),
  );
  const card = ui.screen.getByText(departure.h1).closest('article');
  assert.ok(card);
  return {
    ...result,
    departure,
    user: ui.userEvent.setup(),
    cta: ui.within(card).getByRole('button', { name: 'Book This Date →' }),
  };
}

async function advanceToContact(
  user: ReturnType<typeof ui.userEvent.setup>,
) {
  for (let step = 0; step < 4; step += 1) {
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

test('fixed-departure CTA passes the selected published event context to lead capture', async (t) => {
  usePublishedDepartureDate(t);
  const calls = installFetch(jsonResponse({ success: true, leadReference: 'RT-TEST-001' }));
  const { user, departure, cta } = renderFixedDepartures();

  await user.click(cta);
  await advanceToContact(user);
  await completeContactDetails(user);
  await user.click(ui.screen.getByRole('button', { name: 'Save my details' }));

  await ui.waitFor(() => {
    assert.ok(calls.some((call) => call.url === '/api/inquire'));
  });
  const request = calls.find((call) => call.url === '/api/inquire');
  assert.ok(request?.init?.body);
  const payload = JSON.parse(String(request.init.body)) as Record<string, unknown>;

  assert.equal(payload.productId, departure.serviceSlug);
  assert.equal(payload.departureId, departure.slug);
  assert.equal(payload.departureDate, departure.dateRange);
  assert.equal(payload.preferredDate, departure.dateRange);
  assert.equal(payload.duration, `${departure.durationDays} days`);
  assert.equal(payload.pageType, 'art_hub');
  assert.equal(payload.vertical, 'retreat');
  assert.equal(payload.category, departure.serviceSlug);
  assert.equal(payload.source, '/retreats/art');
  assert.equal(payload.ctaId, `art_fixed_departure_${departure.slug}_book`);
  assert.equal(payload.ctaPosition, 'card');
  if (departure.locationName !== 'TBA') {
    assert.equal(payload.location, departure.locationName);
  } else {
    assert.equal(payload.location, undefined);
  }
});

test('does not expose save confirmation or WhatsApp while persistence is pending or fails', async (t) => {
  usePublishedDepartureDate(t);
  let resolvePersistence!: (response: Response) => void;
  const pendingPersistence = new Promise<Response>((resolve) => {
    resolvePersistence = resolve;
  });
  const calls = installFetch(pendingPersistence);
  const { user, cta } = renderFixedDepartures();

  await user.click(cta);
  await advanceToContact(user);
  await completeContactDetails(user);
  await user.click(ui.screen.getByRole('button', { name: 'Save my details' }));

  await ui.waitFor(() => assert.ok(calls.some((call) => call.url === '/api/inquire')));
  assert.equal(ui.screen.queryByText('Your details are saved.'), null);
  assert.equal(ui.screen.queryByRole('link', { name: 'Continue on WhatsApp' }), null);

  resolvePersistence(jsonResponse({ success: false, error: 'Persistence failed.' }, false));
  assert.ok(await ui.screen.findByRole('alert'));
  assert.equal(ui.screen.queryByText('Your details are saved.'), null);
  assert.equal(ui.screen.queryByRole('link', { name: 'Continue on WhatsApp' }), null);
});

test('offers contextual WhatsApp only after persistence and records the explicit handoff click', async (t) => {
  usePublishedDepartureDate(t);
  let resolvePersistence!: (response: Response) => void;
  const pendingPersistence = new Promise<Response>((resolve) => {
    resolvePersistence = resolve;
  });
  const calls = installFetch(pendingPersistence);
  const { user, departure, cta } = renderFixedDepartures();
  const openCalls: string[] = [];
  const originalOpen = dom.window.open;
  dom.window.open = ((url?: string | URL) => {
    openCalls.push(String(url ?? ''));
    return null;
  }) as typeof dom.window.open;

  try {
    await user.click(cta);
    await advanceToContact(user);
    await completeContactDetails(user);
    await user.click(ui.screen.getByRole('button', { name: 'Save my details' }));

    await ui.waitFor(() => assert.ok(calls.some((call) => call.url === '/api/inquire')));
    assert.equal(ui.screen.queryByRole('link', { name: 'Continue on WhatsApp' }), null);
    assert.equal(openCalls.length, 0);

    resolvePersistence(jsonResponse({ success: true, leadReference: 'RT-TEST-002' }));
    const handoff = await ui.screen.findByRole('link', { name: 'Continue on WhatsApp' });
    const handoffUrl = new URL(handoff.getAttribute('href') ?? '');
    const message = handoffUrl.searchParams.get('text') ?? '';

    assert.equal(handoffUrl.origin, 'https://wa.me');
    assert.equal(handoffUrl.pathname, '/919760446101');
    assert.match(message, /Hi, I have saved an enquiry/);
    assert.ok(message.includes(departure.label));
    assert.ok(message.includes(departure.dateRange));
    assert.ok(message.includes(`${departure.durationDays} days`));
    if (departure.locationName !== 'TBA') {
      assert.ok(message.includes(departure.locationName));
    }
    assert.equal(openCalls.length, 0, 'The form must not open WhatsApp automatically after persistence.');

    await user.click(handoff);
    await ui.waitFor(() => {
      const handoffEvent = calls
        .filter((call) => call.url === '/api/track')
        .map((call) => JSON.parse(String(call.init?.body)) as Record<string, unknown>)
        .find((event) => event.event === 'whatsapp_click' && event.meta &&
          (event.meta as Record<string, unknown>).cta_id === 'inline_inquiry_whatsapp');
      assert.ok(handoffEvent, 'The explicit handoff click should be tracked once.');
    });
    const handoffEvents = calls
      .filter((call) => call.url === '/api/track')
      .map((call) => JSON.parse(String(call.init?.body)) as Record<string, unknown>)
      .filter((event) => event.event === 'whatsapp_click' && event.meta &&
        (event.meta as Record<string, unknown>).cta_id === 'inline_inquiry_whatsapp');
    assert.equal(handoffEvents.length, 1);
    assert.equal(openCalls.length, 0, 'jsdom does not perform external navigation.');
  } finally {
    dom.window.open = originalOpen;
  }
});
