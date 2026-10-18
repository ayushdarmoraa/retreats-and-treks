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

function makeIdentity(): { name: string; phone: string; campaign: string } {
  const id = randomUUID().replaceAll('-', '');
  return {
    name: `E2E contact ${id}`,
    phone: `+1555555${randomInt(1000, 10_000)}`,
    campaign: id.slice(0, 12),
  };
}

test.afterAll(closeTestPool);

test('contact inquiry persists once, keeps its context, and hands off to WhatsApp only on click', async ({ page, context }) => {
  await verifyTestBranch();
  const identity = makeIdentity();
  const sourceQuery = new URLSearchParams({
    vertical: 'trek',
    category: 'dayara-bugyal-trek',
    source: trekPath,
    location: 'Barsu',
    utm_source: 'e2e',
    utm_campaign: identity.campaign,
  });
  let sessionId: string | null = null;
  const testUserAgent = makeTestUserAgent(identity.campaign);

  try {
    await page.setExtraHTTPHeaders({ 'User-Agent': testUserAgent });
    await page.goto(`/contact?${sourceQuery}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
    await page.locator('#inq-name').waitFor();
    await expect.poll(() => page.evaluate(
      () => window.sessionStorage.getItem('conversion_session_id_v1'),
    )).toBeTruthy();
    sessionId = await page.evaluate(() => window.sessionStorage.getItem('conversion_session_id_v1'));
    expect(sessionId).toBeTruthy();
    expect(await page.title()).toBe('Contact Retreats And Treks | Human-Centered Retreat Planning');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.retreatsandtreks.com/contact',
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index/);

    await page.locator('#inq-name').fill(identity.name);
    await page.locator('#inq-phone').fill(identity.phone);
    await page.waitForTimeout(2_100);

    const submittedRequestPromise = page.waitForRequest((request) =>
      request.url().endsWith('/api/inquire') && request.method() === 'POST');
    await page.getByRole('button', { name: 'Send Inquiry', exact: true }).click();
    const submittedRequest = await submittedRequestPromise;
    const payloadText = submittedRequest.postData();
    expect(payloadText).toBeTruthy();

    const duplicateResponse = await page.evaluate(async (body) => {
      const response = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      return { status: response.status, body: await response.json() };
    }, payloadText ?? '');
    expect(duplicateResponse.status).toBe(200);
    expect(duplicateResponse.body).toMatchObject({ success: true, duplicate: true });
    await expect(page.getByText('Inquiry received.', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Continue on WhatsApp' })).toBeVisible();
    expect(context.pages()).toHaveLength(1);

    const lead = await findOwnedLead(identity);
    expect(lead).not.toBeNull();
    if (!lead) throw new Error('The submitted contact inquiry was not persisted.');
    expect(lead.lead_reference).toMatch(/^RT-\d{6}-\d{4}$/);
    expect(lead.lead_score).toBeGreaterThanOrEqual(0);
    expect(['hot', 'warm', 'nurture', 'early', 'cold', 'unscored']).toContain(lead.lead_tier);
    expect(lead.canonical_lead_tier === null || ['hot', 'warm', 'nurture', 'early'].includes(lead.canonical_lead_tier)).toBe(true);
    expect(lead.product_id).toBe('dayara-bugyal-trek');
    expect(lead.vertical).toBe('trek');
    expect(lead.source_url).toContain(trekPath);
    expect(lead.source_url).toContain('utm_source=e2e');
    expect(lead.first_utm_source).toBe('e2e');
    expect(lead.conversion_session_id).toBe(sessionId);

    const whatsappUrl = await page.getByRole('link', { name: 'Continue on WhatsApp' }).getAttribute('href');
    expect(whatsappUrl).toContain('wa.me');
    if (!whatsappUrl) throw new Error('The saved inquiry is missing its WhatsApp handoff URL.');
    await context.route(`${new URL(whatsappUrl).origin}/**`, (route) => route.abort());
    const popupPromise = context.waitForEvent('page');
    await page.getByRole('link', { name: 'Continue on WhatsApp' }).click();
    const popup = await popupPromise;
    expect(context.pages()).toHaveLength(2);
    await popup.close();

    await expect.poll(async () => {
      const events = await readOwnedEvents(lead.id, sessionId ?? '');
      const eventTypes = new Set(events.map((event) => event.event_type));
      return {
        required: eventTypes.has('lead_submitted') && eventTypes.has('inquiry_submitted'),
        handoff: events.some((event) =>
          event.event_type === 'whatsapp_handoff' &&
          event.lead_reference === lead.lead_reference &&
          event.conversion_session_id === sessionId),
      };
    }).toEqual({ required: true, handoff: true });

    const finalLead = await findOwnedLead(identity);
    expect(finalLead?.id).toBe(lead.id);
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
