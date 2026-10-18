import assert from 'node:assert/strict';
import test from 'node:test';
import { NextRequest } from 'next/server';
import type { getDb } from '@/lib/db';
import { createLeadsGetHandler } from './route';

function makeDatabase(rows: Record<string, unknown>[] = [], total = 0) {
  const calls: Array<{ text: string; values: unknown[] }> = [];
  const query = ((strings: TemplateStringsArray, ...values: unknown[]) => {
    const text = strings.join(' ? ').replace(/\s+/g, ' ').trim();
    calls.push({ text, values });

    if (text.includes('SELECT DISTINCT')) {
      return Promise.resolve([]);
    }
    if (text.includes('COUNT(*)')) {
      return Promise.resolve([{ total }]);
    }
    return Promise.resolve(rows);
  }) as unknown as ReturnType<typeof getDb>;

  return { query, calls };
}

function makeRequest(search = '') {
  return new NextRequest(`http://localhost/api/internal/leads${search}`);
}

test('rejects invalid filters, date ranges, sort values, and pagination before querying', async () => {
  const database = makeDatabase();
  const handler = createLeadsGetHandler({
    getDb: () => database.query,
    hasDatabase: () => true,
  });

  for (const query of [
    '?tier=imaginary',
    '?vertical=mountains',
    '?from=2026-02-30',
    '?from=2026-10-10&to=2026-10-09',
    '?sort=name',
    '?order=sideways',
    '?page=0',
    '?limit=201',
  ]) {
    const response = await handler(makeRequest(query));
    assert.equal(response.status, 400, query);
  }

  assert.equal(database.calls.length, 0);
});

test('combines supported filters server-side and uses deterministic pagination and sorting', async () => {
  const database = makeDatabase([{ id: 'lead-1', lead_reference: 'RT-261009-0001' }], 2);
  const handler = createLeadsGetHandler({
    getDb: () => database.query,
    hasDatabase: () => true,
  });
  const response = await handler(makeRequest(
    '?from=2026-10-01&to=2026-10-09&vertical=yoga&product=yoga-rishikesh-5-day' +
    '&location=Rishikesh&tier=warm&route=direct_product&source=organic&cta=hero_cta' +
    '&pagePath=%2Fyoga-retreats&status=replied&page=2&limit=1&sort=score&order=asc',
  ));
  const body = await response.json();
  const rowQuery = database.calls.find((call) => call.text.includes('FROM inquiries') && call.text.includes('lead_reference'))!;

  assert.equal(response.status, 200);
  assert.equal(body.leads[0].lead_reference, 'RT-261009-0001');
  assert.equal(body.pagination.page, 2);
  assert.equal(body.pagination.total, 2);
  assert.equal(body.pagination.pages, 2);
  for (const expected of [
    '2026-10-01',
    '2026-10-09',
    'yoga',
    'yoga-rishikesh-5-day',
    'Rishikesh',
    'warm',
    'direct_product',
    'organic',
    'hero_cta',
    '/yoga-retreats',
    'replied',
  ]) {
    assert.ok(database.calls.some((call) => call.values.some((value) => (
      value === expected || (Array.isArray(value) && value.includes(expected))
    ))), `SQL parameter includes ${expected}`);
  }
  assert.ok(rowQuery.text.includes('ORDER BY'));
  assert.ok(rowQuery.text.includes('sales_route'));
  assert.ok(rowQuery.text.includes('canonical_lead_tier'));
  assert.ok(rowQuery.text.includes('LIMIT'));
  assert.ok(rowQuery.text.includes('OFFSET'));
  assert.equal(rowQuery.values.at(-2), 1);
  assert.equal(rowQuery.values.at(-1), 1);
});

test('normalizes canonical and historical dashboard tier labels before filtering', async () => {
  const database = makeDatabase();
  const handler = createLeadsGetHandler({
    getDb: () => database.query,
    hasDatabase: () => true,
  });
  const response = await handler(makeRequest('?tier=Hot,Warm,Nurture,Early,Cold,Unscored'));

  assert.equal(response.status, 200);
  assert.ok(database.calls.some((call) => call.values.some((value) => (
    Array.isArray(value) && value.join(',') === 'hot,warm,nurture,early,cold,unscored'
  ))));
});

test('clamps out-of-range pages and returns persisted lead context fields', async () => {
  const database = makeDatabase([{
    id: 'lead-1',
    lead_reference: 'RT-261009-0001',
    cta_id: 'trek_hero',
    first_utm_source: 'newsletter',
    first_utm_id: 'campaign-42',
    first_touch_at: '2026-10-09T08:00:00.000Z',
    last_utm_id: 'campaign-43',
    last_touch_at: '2026-10-10T08:00:00.000Z',
  }], 1);
  const handler = createLeadsGetHandler({
    getDb: () => database.query,
    hasDatabase: () => true,
  });
  const response = await handler(makeRequest('?page=99&limit=10'));
  const body = await response.json();
  const rowQuery = database.calls.find((call) => call.text.includes('FROM inquiries') && call.text.includes('lead_reference'))!;

  assert.equal(body.pagination.page, 1);
  assert.equal(body.leads[0].cta_id, 'trek_hero');
  assert.equal(body.leads[0].first_utm_source, 'newsletter');
  assert.equal(body.leads[0].first_utm_id, 'campaign-42');
  assert.equal(body.leads[0].first_touch_at, '2026-10-09T08:00:00.000Z');
  assert.equal(body.leads[0].last_utm_id, 'campaign-43');
  assert.equal(body.leads[0].last_touch_at, '2026-10-10T08:00:00.000Z');
  for (const field of ['first_utm_id', 'first_touch_at', 'last_utm_id', 'last_touch_at']) {
    assert.ok(rowQuery.text.includes(field), `lead query selects ${field}`);
  }
  assert.ok(rowQuery.text.includes('AS lead_tier'));
  assert.equal(database.calls.some((call) => call.values.includes(0)), true);
});
