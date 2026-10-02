/* eslint @typescript-eslint/no-require-imports: off */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const ts = require('typescript');

function transpileExtension(module, filename, jsx = false) {
  const source = fs.readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      ...(jsx ? { jsx: ts.JsxEmit.ReactJSX } : {}),
    },
  }).outputText;
  module._compile(output, filename);
}

require.extensions['.ts'] = (module, filename) => transpileExtension(module, filename);
require.extensions['.tsx'] = (module, filename) => transpileExtension(module, filename, true);

const storage = new Map();
global.window = {
  sessionStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  },
};

const { buildAttributionQuery, captureAttribution } = require('../utils/attribution.ts');
const telemetrySource = fs.readFileSync('utils/telemetry.ts', 'utf8');
const trackRouteSource = fs.readFileSync('app/api/track/route.ts', 'utf8');
const componentSources = {
  trackedPage: fs.readFileSync('components/TrackedPage.tsx', 'utf8'),
  trackedWhatsApp: fs.readFileSync('components/TrackedWhatsAppLink.tsx', 'utf8'),
  cta: fs.readFileSync('components/CTAExpandToggle.tsx', 'utf8'),
  form: fs.readFileSync('components/InlineInquiryForm.tsx', 'utf8'),
  finder: fs.readFileSync('components/RetreatFinder.tsx', 'utf8'),
  calendar: fs.readFileSync('components/YogaDepartureCalendar.tsx', 'utf8'),
  yogaHub: fs.readFileSync('app/yoga-retreats/page.tsx', 'utf8'),
};

const search = (values) => ({ get: (key) => values[key] ?? null });
captureAttribution(search({ utm_source: 'first-source', utm_campaign: 'spring' }));
let query = new URLSearchParams(buildAttributionQuery(search({})));
assert.equal(query.get('first_utm_source'), 'first-source');
assert.equal(query.get('utm_source'), 'first-source');

captureAttribution(search({ utm_source: 'last-source', utm_medium: 'social' }));
query = new URLSearchParams(buildAttributionQuery(search({})));
assert.equal(query.get('first_utm_source'), 'first-source', 'first-touch UTM is retained');
assert.equal(query.get('first_utm_campaign'), 'spring');
assert.equal(query.get('utm_source'), 'last-source', 'last-touch UTM is updated');
assert.equal(query.get('utm_medium'), 'social');
assert.equal(query.get('first_utm_source'), 'first-source');

const expectedEvents = [
  'page_view',
  'cta_click',
  'form_start',
  'form_submission',
  'yoga_whatsapp_click',
  'yoga_form_open',
  'yoga_form_completion',
  'yoga_finder_start',
  'yoga_finder_recommendation',
  'yoga_departure_selection',
];
for (const event of expectedEvents) {
  assert.ok(telemetrySource.includes(`'${event}'`), `telemetry type includes ${event}`);
  assert.ok(trackRouteSource.includes(`'${event}'`), `track API accepts ${event}`);
}

assert.match(componentSources.trackedPage, /event:\s*'page_view'/, 'page view is emitted by TrackedPage');
assert.match(componentSources.trackedPage, /source_utm/, 'Yoga page views include attribution context');
assert.match(componentSources.yogaHub, /<TrackedPage page=\{PATH\}/, 'Yoga hub uses tracked page wrapper');
assert.match(componentSources.yogaHub, /analyticsEvent="yoga_whatsapp_click"/, 'Yoga hub CTA uses Yoga WhatsApp event');
assert.match(componentSources.cta, /event:\s*'cta_click'/, 'Yoga CTA click is tracked');
assert.match(componentSources.cta, /event:\s*'yoga_form_open'/, 'Yoga form open is tracked');
assert.match(componentSources.form, /event:\s*'form_start'/, 'form start is tracked');
assert.match(componentSources.form, /event:\s*'yoga_form_completion'/, 'form completion is tracked');
assert.match(componentSources.form, /event:\s*'form_submission'/, 'successful form submission is tracked');
assert.match(componentSources.form, /source_utm:\s*attribution/, 'form events retain attribution context');
const funnelContextSource = componentSources.form.match(/const funnelContext = \{([\s\S]*?)\n      \};/)?.[1] ?? '';
assert.ok(funnelContextSource, 'form funnel analytics context is defined');
assert.doesNotMatch(funnelContextSource, /\b(name|email|phone)\s*[:,]/, 'form funnel analytics excludes contact fields');
assert.match(componentSources.finder, /event:\s*'yoga_finder_start'/, 'Yoga finder start is tracked');
assert.match(componentSources.finder, /event:\s*'finder_complete'/, 'finder completion uses conversion event');
assert.match(componentSources.finder, /event:\s*'yoga_finder_recommendation'/, 'Yoga recommendation is tracked');
assert.match(componentSources.calendar, /trackDepartureSelection/, 'departure calendar enables departure-selection tracking');
assert.match(componentSources.calendar, /departureId=\{departure\.slug\}/, 'departure event context uses registry departure id');
assert.match(componentSources.calendar, /duration=\{product\?\.durationLabel/, 'departure event context includes product duration');
assert.match(componentSources.trackedWhatsApp, /event: analyticsEvent/, 'WhatsApp emits the configured event');
assert.match(componentSources.trackedWhatsApp, /event: 'yoga_departure_selection'/, 'selected departure emits its separate selection event');

const emitted = [];
const attribution = { buildAttributionQuery, captureAttribution };
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === '@/utils/telemetry') return { track: (event) => emitted.push(event) };
  if (request === '@/utils/attribution') return attribution;
  return originalLoad.call(this, request, parent, isMain);
};

const { default: TrackedWhatsAppLink } = require('../components/TrackedWhatsAppLink.tsx');
const clickLink = (props) => {
  const link = TrackedWhatsAppLink({ href: 'https://wa.me/919760446101', children: 'Ask', ...props });
  assert.equal(link.type, 'a', 'tracked WhatsApp component renders an anchor');
  link.props.onClick();
  return emitted.splice(0);
};
const serializedEvents = (events) => JSON.stringify(events).toLowerCase();
const assertNoPii = (events, label) => {
  const serialized = serializedEvents(events);
  for (const value of ['test person', 'test@example.com', '+919876543210']) {
    assert.ok(!serialized.includes(value), `${label} does not include submitted PII`);
  }
  for (const key of ['"name"', '"email"', '"phone"']) {
    assert.ok(!serialized.includes(key), `${label} does not include a PII field`);
  }
};

global.window.location = { search: '?utm_source=last-source&utm_medium=social' };
const yogaClick = clickLink({
  sourcePath: '/yoga-retreats',
  location: 'Rishikesh',
  intent: 'Yoga retreat enquiry',
  analyticsEvent: 'yoga_whatsapp_click',
  product: 'Yoga Retreats in Rishikesh',
  duration: 'Weekend',
  ctaPosition: 'hero',
});
assert.deepEqual(yogaClick.map((event) => event.event), ['yoga_whatsapp_click'], 'Yoga CTA emits exactly one WhatsApp event');
assert.equal(yogaClick[0].meta.location, 'Rishikesh');
assert.equal(yogaClick[0].meta.duration, 'Weekend');
assert.equal(new URLSearchParams(yogaClick[0].meta.source_utm).get('first_utm_source'), 'first-source');
assert.equal(new URLSearchParams(yogaClick[0].meta.source_utm).get('utm_source'), 'last-source');
assertNoPii(yogaClick, 'Yoga WhatsApp analytics');

const departureClick = clickLink({
  sourcePath: '/retreats/yoga-retreat-rishikesh',
  location: 'Rishikesh',
  intent: 'Yoga departure enquiry',
  analyticsEvent: 'yoga_whatsapp_click',
  product: '5-Day Yoga Retreat',
  productId: 'yoga-rishikesh-5-day',
  departureId: 'yoga-rishikesh-5-day-2026-10-12',
  departureDate: '2026-10-12',
  departureEndDate: '2026-10-16',
  duration: '5 days',
  trackDepartureSelection: true,
});
assert.deepEqual(
  departureClick.map((event) => event.event),
  ['yoga_departure_selection', 'yoga_whatsapp_click'],
  'departure WhatsApp click emits one selection and one WhatsApp event, without a duplicate generic WhatsApp event',
);
assert.equal(departureClick[0].meta.departure_id, 'yoga-rishikesh-5-day-2026-10-12');
assert.equal(departureClick[0].meta.departure_date, '2026-10-12');
assert.equal(departureClick[0].meta.departure_end_date, '2026-10-16');
assert.equal(departureClick[0].meta.product_id, 'yoga-rishikesh-5-day');
assertNoPii(departureClick, 'Departure WhatsApp analytics');

for (const duration of ['Weekend', '5 days', '7 days', '10 days']) {
  const [event] = clickLink({
    sourcePath: '/yoga-retreats',
    analyticsEvent: 'yoga_whatsapp_click',
    duration,
  });
  assert.equal(event.meta.duration, duration, `${duration} WhatsApp context is preserved`);
}
for (const location of ['Sankri', 'Chakrata', 'Zanskar', 'Rishikesh']) {
  const [event] = clickLink({
    sourcePath: '/yoga-retreats',
    location,
    analyticsEvent: 'yoga_whatsapp_click',
  });
  assert.equal(event.meta.location, location, `${location} WhatsApp context is preserved`);
}
const ttcClick = clickLink({
  sourcePath: '/yoga-teacher-training',
  location: 'Rishikesh',
  intent: 'Yoga TTC enquiry',
  analyticsEvent: 'yoga_whatsapp_click',
  product: '28-Day Yoga Teacher Training in Rishikesh',
  productId: 'yoga-ttc',
  duration: '28 days-TTC',
  ctaPosition: 'hero',
});
assert.deepEqual(ttcClick.map((event) => event.event), ['yoga_whatsapp_click'], 'TTC WhatsApp emits one Yoga event');
assert.equal(ttcClick[0].meta.product_id, 'yoga-ttc');
assert.equal(ttcClick[0].meta.location, 'Rishikesh');
assert.equal(ttcClick[0].meta.duration, '28 days-TTC');
assertNoPii(ttcClick, 'TTC WhatsApp analytics');

const genericClick = clickLink({ sourcePath: '/art-retreat-mussoorie', analyticsEvent: 'whatsapp_click' });
assert.deepEqual(genericClick.map((event) => event.event), ['whatsapp_click'], 'generic/Art WhatsApp remains one generic event');
assert.ok(!genericClick.some((event) => event.event.startsWith('yoga_')), 'generic/Art WhatsApp does not emit Yoga events');
assertNoPii(genericClick, 'Generic WhatsApp analytics');

console.log('Yoga analytics deterministic checks passed: events, contexts, attribution, PII, duplicate protection, and generic regression');
