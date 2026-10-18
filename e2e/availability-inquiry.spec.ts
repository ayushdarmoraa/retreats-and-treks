import { randomInt, randomUUID } from 'node:crypto';
import { expect, test } from '@playwright/test';
import {
  cleanupOwnedLead,
  cleanupOwnedSpamEvents,
  closeTestPool,
  findOwnedLead,
  makeTestUserAgent,
  readOwnedEvents,
  verifyTestBranch,
} from './playwright.config';

const trekPath = '/treks/location/barsu/dayara-bugyal-trek';

test.afterAll(closeTestPool);

test('availability modal persists its inquiry and keeps the conversion session', async ({ page }) => {
  await verifyTestBranch();
  const id = randomUUID().replaceAll('-', '');
  const identity = {
    name: `E2E availability ${id}`,
    phone: `+1555555${randomInt(1000, 10_000)}`,
    campaign: id.slice(0, 12),
  };
  let sessionId: string | null = null;
  const testUserAgent = makeTestUserAgent(identity.campaign);

  try {
    await page.setExtraHTTPHeaders({ 'User-Agent': testUserAgent });
    await page.goto(`${trekPath}?utm_source=e2e&utm_campaign=${identity.campaign}`, {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    });
    await page.getByRole('button', { name: 'Reserve Your Spot' }).first().waitFor();
    await expect.poll(() => page.evaluate(
      () => window.sessionStorage.getItem('conversion_session_id_v1'),
    )).toBeTruthy();
    sessionId = await page.evaluate(() => window.sessionStorage.getItem('conversion_session_id_v1'));
    expect(sessionId).toBeTruthy();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://www.retreatsandtreks.com${trekPath}`,
    );

    await page.getByRole('button', { name: 'Reserve Your Spot' }).first().click();
    const dialog = page.getByRole('dialog', { name: /Check availability for/i });
    await expect(dialog).toBeVisible();
    await dialog.locator('#avail-name').fill(identity.name);
    await dialog.locator('#avail-month').selectOption({ index: 1 });
    await dialog.locator('#avail-group').selectOption('2');
    await dialog.locator('#avail-experience').selectOption('Beginner');
    await dialog.locator('#avail-phone').fill(identity.phone);
    await page.waitForTimeout(2_100);
    await dialog.getByRole('button', { name: 'Check Availability', exact: true }).click();
    await expect(dialog.getByText('Request received!', { exact: true })).toBeVisible();

    const lead = await findOwnedLead(identity);
    expect(lead).not.toBeNull();
    if (!lead) throw new Error('The availability inquiry was not persisted.');
    expect(lead.lead_reference).toMatch(/^RT-\d{6}-\d{4}$/);
    expect(lead.product_id).toBe('dayara-bugyal-trek');
    expect(lead.vertical).toBe('trek');
    expect(lead.conversion_session_id).toBe(sessionId);
    expect(lead.source_url).toContain(trekPath);
    expect(lead.first_utm_source).toBe('e2e');

    await expect.poll(async () => {
      const events = await readOwnedEvents(lead.id, sessionId ?? '');
      const eventTypes = new Set(events.map((event) => event.event_type));
      return eventTypes.has('lead_submitted')
        && eventTypes.has('inquiry_submitted')
        && eventTypes.has('availability_form_submit');
    }).toBe(true);
  } finally {
    try {
      if (!page.isClosed()) {
        await page.goto('about:blank', { waitUntil: 'domcontentloaded', timeout: 10_000 });
      }
    } finally {
      try {
        await cleanupOwnedLead(identity, sessionId);
      } finally {
        await cleanupOwnedSpamEvents(testUserAgent);
      }
    }
  }
});
