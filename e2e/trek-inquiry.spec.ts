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

test('Trek mini inquiry persists route context and form lifecycle events', async ({ page }) => {
  await verifyTestBranch();
  const id = randomUUID().replaceAll('-', '');
  const identity = {
    name: `E2E trek ${id}`,
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
    await page.getByRole('textbox', { name: 'Name *' }).waitFor();
    await expect.poll(() => page.evaluate(
      () => window.sessionStorage.getItem('conversion_session_id_v1'),
    )).toBeTruthy();
    sessionId = await page.evaluate(() => window.sessionStorage.getItem('conversion_session_id_v1'));
    expect(sessionId).toBeTruthy();
    expect(await page.title()).toContain('| Retreats And Treks');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://www.retreatsandtreks.com${trekPath}`,
    );
    await page.getByRole('textbox', { name: 'Name *' }).fill(identity.name);
    await page.getByRole('textbox', { name: 'Phone / WhatsApp *' }).fill(identity.phone);
    await page.waitForTimeout(2_100);
    await page.getByRole('button', { name: 'Check Availability', exact: true }).click();
    await expect(page.getByText('Inquiry received!', { exact: true })).toBeVisible();

    const lead = await findOwnedLead(identity);
    expect(lead).not.toBeNull();
    if (!lead) throw new Error('The Trek inquiry was not persisted.');
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
