import assert from 'node:assert/strict';
import { afterEach, test, before } from 'node:test';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/internal/dashboard',
});
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  MutationObserver: dom.window.MutationObserver,
  getComputedStyle: dom.window.getComputedStyle,
  IS_REACT_ACT_ENVIRONMENT: true,
});
Object.defineProperty(globalThis, 'navigator', {
  value: dom.window.navigator,
  configurable: true,
});

let cleanup: () => void = () => {};
let fireEvent: typeof import('@testing-library/react').fireEvent;
let render: typeof import('@testing-library/react').render;
let screen: typeof import('@testing-library/react').screen;
let waitFor: typeof import('@testing-library/react').waitFor;
let DashboardClient: typeof import('./DashboardClient').default;

before(async () => {
  const testingLibrary = await import('@testing-library/react');
  cleanup = testingLibrary.cleanup;
  fireEvent = testingLibrary.fireEvent;
  render = testingLibrary.render;
  screen = testingLibrary.screen;
  waitFor = testingLibrary.waitFor;
  DashboardClient = (await import('./DashboardClient')).default;
});

const lead = {
  id: 'lead-1',
  lead_reference: 'RT-261009-0042',
  name: 'Asha Mehta',
  email: 'asha@example.com',
  phone: '+91 9876543210',
  age: '34',
  origin_city: 'Delhi',
  origin_country: 'India',
  interest: 'Art retreat',
  destination: 'Chakrata',
  departure: 'Autumn Art Weekend',
  departure_id: 'art-chakrata-2026-10',
  departure_date: '2026-10-24',
  preferred_timing: 'October',
  yoga_interest: null,
  product: 'Art Retreat',
  product_id: 'art-retreat-chakrata',
  yoga_classification: null,
  yoga_sales_route: null,
  recommended_product: null,
  recommended_alternative: null,
  interested_in: 'Art retreat',
  location: 'Chakrata',
  month: 'October',
  preferred_date: '2026-10-24',
  planning_horizon: 'Within 3 months',
  group_size: '2',
  budget: '₹25,000',
  duration: '3 days',
  yoga_experience: null,
  booking_readiness: null,
  source_url: 'https://www.retreatsandtreks.com/retreats/art',
  referrer: 'https://example.com',
  first_landing_page: '/retreats/art',
  last_landing_page: '/retreats/art',
  page_title: 'Art Retreats',
  page_type: 'art-retreat',
  first_utm_source: 'newsletter',
  first_utm_medium: 'email',
  first_utm_campaign: 'autumn-art',
  first_utm_term: null,
  first_utm_content: null,
  first_utm_id: 'first-touch-id',
  first_touch_at: '2026-10-09T08:00:00.000Z',
  last_utm_source: 'newsletter',
  last_utm_medium: 'email',
  last_utm_campaign: 'autumn-art',
  last_utm_term: null,
  last_utm_content: null,
  last_utm_id: 'last-touch-id',
  last_touch_at: '2026-10-10T08:00:00.000Z',
  cta_id: 'art_departure_october',
  cta_position: 'fixed_departure_card',
  cta_label: 'Enquire about this departure',
  cta_variant: null,
  conversion_session_id: 'session-42',
  vertical: 'art',
  category: 'art-retreat',
  lead_score: 42,
  lead_tier: 'Warm',
  status: 'open',
  followup_count: 0,
  last_followup_at: null,
  created_at: '2026-10-09T08:00:00.000Z',
};

const events = [
  {
    id: 'event-1',
    event_type: 'conversion_cta_click',
    meta: null,
    created_at: '2026-10-09T08:01:00.000Z',
    page_path: '/retreats/art',
    page_type: 'art-retreat',
    vertical: 'art',
    category: 'art-retreat',
    cta_id: 'art_departure_october',
    cta_position: 'fixed_departure_card',
    cta_label: 'Enquire about this departure',
    cta_variant: null,
    lead_reference: null,
  },
  {
    id: 'event-2',
    event_type: 'lead_submitted',
    meta: null,
    created_at: '2026-10-09T08:02:00.000Z',
    page_path: '/retreats/art',
    page_type: 'art-retreat',
    vertical: 'art',
    category: 'art-retreat',
    cta_id: 'art_departure_october',
    cta_position: 'fixed_departure_card',
    cta_label: 'Enquire about this departure',
    cta_variant: null,
    lead_reference: 'RT-261009-0042',
  },
  {
    id: 'event-3',
    event_type: 'whatsapp_handoff',
    meta: null,
    created_at: '2026-10-09T08:03:00.000Z',
    page_path: '/retreats/art',
    page_type: 'art-retreat',
    vertical: 'art',
    category: 'art-retreat',
    cta_id: 'art_departure_october',
    cta_position: 'fixed_departure_card',
    cta_label: 'Enquire about this departure',
    cta_variant: null,
    lead_reference: 'RT-261009-0042',
  },
];

function mockDashboardFetch(options: { detailFailure?: boolean } = {}) {
  const requests: Array<{ url: string; method?: string }> = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    requests.push({ url, method: init?.method });
    if (url.includes('/api/internal/leads/lead-1')) {
      if (options.detailFailure) return new Response('{}', { status: 500 });
      return new Response(JSON.stringify({ lead, events }), { status: 200 });
    }
    if (url.includes('/api/internal/leads?')) {
      return new Response(JSON.stringify({
        leads: [lead],
        filterOptions: { months: ['October'], products: [{ value: 'art-retreat-chakrata', label: 'Art Retreat' }] },
        pagination: { page: 1, limit: 50, total: 1, pages: 1 },
      }), { status: 200 });
    }
    if (url.includes('/api/internal/analytics')) {
      return new Response(JSON.stringify({
        metrics: {
          totalLeads: 1, hotLeads: 0, warmLeads: 1, coldLeads: 0, booked: 0,
          replied: 0, closed: 0, open: 1, avgScore: 42, conversionRate: 0,
          retreatLeads: 0, trekLeads: 0,
        },
        hotConversion: { totalHot: 0, hotBooked: 0, hotConversionRate: 0 },
        topSources: [],
        budgetDistribution: [],
      }), { status: 200 });
    }
    throw new Error(`Unexpected dashboard request: ${url}`);
  }) as typeof fetch;
  return requests;
}

afterEach(() => {
  cleanup();
  dom.reconfigure({ url: 'http://localhost/internal/dashboard' });
});

test('renders persisted lead attribution and the chronological linked conversion timeline', async () => {
  const requests = mockDashboardFetch();
  const { container } = render(<DashboardClient />);

  assert.equal((await screen.findByText('Asha Mehta')).textContent, 'Asha Mehta');
  fireEvent.click(screen.getByTitle('View event log'));

  await screen.findByText('whatsapp_handoff');
  const rendered = container.textContent || '';
  assert.match(rendered, /RT-261009-0042/);
  assert.match(rendered, /art_departure_october/);
  assert.match(rendered, /fixed_departure_card/);
  assert.match(rendered, /newsletter \/ email \/ autumn-art/);
  assert.match(rendered, /first-touch-id/);
  assert.match(rendered, /last-touch-id/);
  assert.match(rendered, /First touch:/);
  assert.match(rendered, /Last touch:/);
  assert.match(rendered, /\/retreats\/art/);
  assert.ok(rendered.indexOf('conversion_cta_click') < rendered.indexOf('lead_submitted'));
  assert.ok(rendered.indexOf('lead_submitted') < rendered.indexOf('whatsapp_handoff'));
  assert.ok(requests.some(({ url }) => url.endsWith('/api/internal/leads/lead-1')));
});

test('initializes filters from the URL and synchronizes user filter changes back to it', async () => {
  dom.reconfigure({
    url: 'http://localhost/internal/dashboard?vertical=art&from=2026-10-01&cta=art_departure_october',
  });
  const requests = mockDashboardFetch();
  render(<DashboardClient />);

  await screen.findByText('Asha Mehta');
  assert.equal((screen.getByLabelText('Vertical') as HTMLSelectElement).value, 'art');
  assert.equal((screen.getByLabelText('From date') as HTMLInputElement).value, '2026-10-01');
  assert.ok(requests.some(({ url }) => (
    url.includes('vertical=art') &&
    url.includes('from=2026-10-01') &&
    url.includes('cta=art_departure_october')
  )));

  fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'Chakrata' } });
  await waitFor(() => {
    assert.equal(new URLSearchParams(window.location.search).get('location'), 'Chakrata');
  });
  assert.ok(requests.some(({ url }) => url.includes('location=Chakrata')));

  fireEvent.click(screen.getByText('Reset filters'));
  await waitFor(() => {
    assert.equal(window.location.search, '');
  });
});

test('selects canonical and historical tiers without changing other filters', async () => {
  dom.reconfigure({
    url: 'http://localhost/internal/dashboard?vertical=art&status=open',
  });
  const requests = mockDashboardFetch();
  render(<DashboardClient />);
  await screen.findByText('Asha Mehta');

  const selectedTiers = ['Hot', 'Warm', 'Nurture', 'Early', 'Cold', 'Unscored'];
  for (const tier of selectedTiers) {
    fireEvent.click(screen.getByRole('button', { name: tier }));
  }

  await waitFor(() => {
    assert.deepEqual(new URLSearchParams(window.location.search).get('tier')?.split(','), selectedTiers);
  });
  assert.ok(requests.some(({ url }) => {
    const params = new URL(url, 'http://localhost').searchParams;
    return params.get('tier') === selectedTiers.join(',');
  }));

  fireEvent.click(screen.getByRole('button', { name: 'Warm' }));
  await waitFor(() => {
    assert.deepEqual(
      new URLSearchParams(window.location.search).get('tier')?.split(','),
      selectedTiers.filter((tier) => tier !== 'Warm'),
    );
  });
  const params = new URLSearchParams(window.location.search);
  assert.equal(params.get('vertical'), 'art');
  assert.equal(params.get('status'), 'open');
});

test('surfaces a failed lead timeline request instead of presenting it as an empty event history', async () => {
  mockDashboardFetch({ detailFailure: true });
  render(<DashboardClient />);

  await screen.findByText('Asha Mehta');
  fireEvent.click(screen.getByTitle('View event log'));

  assert.equal(
    (await screen.findByRole('alert')).textContent,
    'Failed to load conversion timeline. Refresh and try again.',
  );
  assert.equal(screen.queryByText('No events recorded'), null);
});
