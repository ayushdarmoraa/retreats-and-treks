import assert from 'node:assert/strict';
import test from 'node:test';

import type { getDb } from './db';
import type { ConversionEvent } from './conversion-events';
import type { LeadTier } from './lead-scoring';
import { processFollowUps } from './followups';

interface FakeLead {
  id: string;
  name: string;
  email: string;
  interested_in: string | null;
  location: string | null;
  month: string | null;
  group_size: string | null;
  budget: string | null;
  vertical: string | null;
  lead_tier: LeadTier;
  lead_score: number;
  followup_count: number;
  created_at: string;
}

function makeLead(overrides: Partial<FakeLead> = {}): FakeLead {
  return {
    id: 'lead-1',
    name: 'Asha Mehta',
    email: 'asha@example.com',
    interested_in: 'retreat',
    location: 'Chakrata',
    month: 'October',
    group_size: '2',
    budget: 'Not sure yet',
    vertical: 'retreat',
    lead_tier: 'hot',
    lead_score: 80,
    followup_count: 0,
    created_at: '2026-10-01T08:00:00.000Z',
    ...overrides,
  };
}

function makeDatabase(options: {
  day3?: FakeLead[];
  day7?: FakeLead[];
  failUpdate?: boolean;
} = {}) {
  const queries: Array<{ text: string; values: unknown[] }> = [];
  const updatedIds: string[] = [];
  let updateCount = 0;
  const sql = (strings: TemplateStringsArray, ...values: unknown[]) => {
    const text = strings.join(' ? ').trim();
    queries.push({ text, values });
    if (text.includes("interval '3 days'")) return Promise.resolve(options.day3 ?? []);
    if (text.includes("interval '7 days'")) return Promise.resolve(options.day7 ?? []);
    if (text.startsWith('UPDATE inquiries')) {
      if (options.failUpdate) return Promise.reject(new Error('update failed'));
      updateCount += 1;
      updatedIds.push(String(values[0]));
      return Promise.resolve([]);
    }
    return Promise.resolve([]);
  };

  return {
    queries,
    updatedIds,
    updateCount: () => updateCount,
    getDb: () => sql as unknown as ReturnType<typeof getDb>,
  };
}

function setup(options: {
  day3?: FakeLead[];
  day7?: FakeLead[];
  failUpdate?: boolean;
  failSendFor?: string[];
} = {}) {
  const database = makeDatabase(options);
  const sends: Array<{ to: string; subject: string; html: string }> = [];
  const events: ConversionEvent[] = [];

  const run = () => processFollowUps({
    databaseUrl: 'mock://no-network',
    getDb: database.getDb,
    sendEmail: async (payload) => {
      sends.push(payload);
      if (options.failSendFor?.includes(payload.to)) {
        throw new Error('provider unavailable');
      }
    },
    logEvent: async (event) => {
      events.push(event);
    },
  });

  return { run, database, sends, events };
}

test('selects email-reachable candidates only, per the Day-3 and Day-7 query contracts', async () => {
  const api = setup();
  const originalWarn = console.warn;
  console.warn = () => {};
  try {
    await api.run();
  } finally {
    console.warn = originalWarn;
  }

  const day3Query = api.database.queries[0];
  const day7Query = api.database.queries[1];
  assert.ok(day3Query.text.includes("interval '3 days'"));
  assert.ok(day3Query.text.includes("email IS NOT NULL AND email <> ''"));
  assert.ok(day3Query.text.includes("lead_tier IN ('hot', 'warm')"));
  assert.ok(day3Query.text.includes("followup_count = 0"));
  assert.ok(day3Query.text.includes("status = 'open'"));
  assert.ok(day3Query.text.includes("created_at <= now() - interval '3 days'"));
  assert.ok(day3Query.text.includes("created_at > now() - interval '4 days'"));
  assert.ok(day3Query.text.includes('ORDER BY lead_score DESC'));
  assert.ok(day3Query.text.includes('LIMIT 50'));
  assert.ok(day7Query.text.includes("interval '7 days'"));
  assert.ok(day7Query.text.includes("email IS NOT NULL AND email <> ''"));
  assert.ok(day7Query.text.includes('followup_count < 2'));
  assert.ok(day7Query.text.includes("status = 'open'"));
  assert.ok(day7Query.text.includes("created_at <= now() - interval '7 days'"));
  assert.ok(day7Query.text.includes("created_at > now() - interval '8 days'"));
  assert.ok(day7Query.text.includes('ORDER BY lead_score DESC'));
  assert.ok(day7Query.text.includes('LIMIT 50'));
});

test('processes Day-3 and Day-7 candidates: emails sent and follow-up counts incremented', async () => {
  const api = setup({
    day3: [makeLead({ id: 'd3', email: 'hot@example.com', lead_tier: 'hot' })],
    day7: [makeLead({ id: 'd7', email: 'cold@example.com', lead_tier: 'cold', followup_count: 1 })],
  });

  const result = await api.run();

  assert.deepEqual(result, { processed: 2, sent: 2, skipped: 0, errors: 0 });
  assert.deepEqual(api.sends.map((send) => send.to).sort(), ['cold@example.com', 'hot@example.com']);
  assert.ok(api.sends.every((send) => send.subject.length > 0 && send.html.length > 0));
  assert.equal(api.database.updateCount(), 2);
  assert.deepEqual(api.database.updatedIds.sort(), ['d3', 'd7']);

  const day3Event = api.events.find((event) => event.eventType === 'inquiry_email_sent' && event.inquiryId === 'd3');
  assert.equal((day3Event?.meta as Record<string, unknown> | undefined)?.followup_day, 3);
  const day7Event = api.events.find((event) => event.eventType === 'inquiry_email_sent' && event.inquiryId === 'd7');
  assert.equal((day7Event?.meta as Record<string, unknown> | undefined)?.followup_day, 7);
});

test('does not mark failed email sends as sent or update follow-up counts', async () => {
  const api = setup({
    day3: [makeLead({ id: 'failed-send', email: 'unavailable@example.com' })],
    failSendFor: ['unavailable@example.com'],
  });
  const originalError = console.error;
  console.error = () => {};
  let result: Awaited<ReturnType<typeof processFollowUps>>;
  try {
    result = await api.run();
  } finally {
    console.error = originalError;
  }

  assert.deepEqual(result, { processed: 1, sent: 0, skipped: 1, errors: 0 });
  assert.deepEqual(api.sends.map((send) => send.to), ['unavailable@example.com']);
  assert.equal(api.database.updateCount(), 0);
  assert.ok(api.events.some((event) => event.eventType === 'inquiry_email_failed' && event.inquiryId === 'failed-send'));
  assert.ok(!api.events.some((event) => event.eventType === 'inquiry_email_sent' && event.inquiryId === 'failed-send'));
});

test('reports database update failures without counting the follow-up as sent', async () => {
  const api = setup({
    day7: [makeLead({ id: 'failed-update', lead_tier: 'cold', followup_count: 1 })],
    failUpdate: true,
  });
  const originalError = console.error;
  console.error = () => {};
  let result: Awaited<ReturnType<typeof processFollowUps>>;
  try {
    result = await api.run();
  } finally {
    console.error = originalError;
  }

  assert.deepEqual(result, { processed: 1, sent: 0, skipped: 0, errors: 1 });
  assert.deepEqual(api.sends.map((send) => send.to), ['asha@example.com']);
  assert.equal(api.database.updateCount(), 0);
  assert.ok(api.events.some((event) => event.eventType === 'inquiry_email_sent' && event.inquiryId === 'failed-update'));
});