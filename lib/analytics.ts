/**
 * QUIET ANALYTICS
 * Signal gathering without UI pollution, dashboards, or behavior change.
 * All events fire asynchronously (fire-and-forget).
 * No blocking. Silent failures. Zero visual indicators.
 */

/**
 * Log an intent tile click
 * Captures which intention resonates with users
 */
export async function logIntentClick(
  intentKey: string,
  location?: string,
  page?: string,
): Promise<void> {
  try {
    await fetch('/api/analytics/intent-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intentKey,
        location,
        page,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Silent fail — analytics never blocks user experience
  }
}

/**
 * Log a WhatsApp open event
 * Captures readiness to enter conversation
 * Optionally includes which intent led to this action
 */
export async function logWhatsAppOpen(
  sourcePage: string,
  location?: string,
  intent?: string,
): Promise<void> {
  try {
    await fetch('/api/analytics/whatsapp-open', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sourcePage,
        location,
        intent,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Silent fail
  }
}

/**
 * Log a location page entry
 * Captures which locations generate curiosity
 */
export async function logLocationEntry(
  locationSlug: string,
  referrer?: string,
): Promise<void> {
  try {
    // Detect if referrer is internal or external
    const isInternal = referrer ? referrer.includes(window.location.hostname) : false;

    await fetch('/api/analytics/location-entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        locationSlug,
        referrerType: isInternal ? 'internal' : 'external',
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Silent fail
  }
}

/**
 * Log format curiosity
 * Captures interaction (hover or click) with retreat format cards
 */
export async function logFormatCuriosity(
  formatKey: string,
  location?: string,
): Promise<void> {
  try {
    await fetch('/api/analytics/format-curiosity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formatKey,
        location,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Silent fail
  }
}
