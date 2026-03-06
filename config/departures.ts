/**
 * Fixed Departure data for Garhwal treks
 * ─────────────────────────────────────────
 * Each trek has a list of upcoming departure batches with dates,
 * pricing, group capacity, and availability status.
 *
 * Prices are per person, all-inclusive (accommodation, meals,
 * permits, guide, safety gear). Travel to base camp excluded.
 */

export interface Departure {
  /** Display label, e.g. "15 Dec – 18 Dec 2025" */
  dateRange: string;
  /** ISO start date for schema markup */
  startDate: string;
  /** ISO end date for schema markup */
  endDate: string;
  /** Total group capacity */
  groupSize: number;
  /** Seats still available */
  seatsLeft: number;
  /** Per-person cost (INR) */
  price: number;
  /** Batch status */
  status: 'open' | 'filling-fast' | 'last-few' | 'sold-out';
}

export interface TrekDepartures {
  /** Must match the trek slug in content */
  slug: string;
  /** Display name for headings */
  trekName: string;
  /** Short name for compact contexts */
  shortName: string;
  /** Trek duration label */
  duration: string;
  /** Difficulty level */
  difficulty: string;
  /** Max altitude */
  altitude: string;
  /** Pickup location */
  pickupPoint: string;
  /** URL path segment (no leading slash) */
  urlSlug: string;
  /** Best months summary for sidebar */
  bestMonths: string;
  /** Base price for schema markup (lowest current price) */
  basePrice: number;
  /** Currency */
  currency: string;
  /** Upcoming departures sorted by date */
  departures: Departure[];
  /** Quick itinerary for the departure page */
  quickItinerary: string[];
  /** What's included summary */
  included: string[];
  /** Difficulty guide paragraph */
  difficultyGuide: string;
}

// ─── Brahmatal ──────────────────────────────────────────────────────────────

const brahmatalDepartures: TrekDepartures = {
  slug: 'brahmatal-trek',
  trekName: 'Brahmatal Trek',
  shortName: 'Brahmatal',
  duration: '4 Days / 3 Nights',
  difficulty: 'Moderate',
  altitude: '3,850 m',
  pickupPoint: 'Lohajung',
  urlSlug: 'brahmatal',
  bestMonths: 'December – March',
  basePrice: 7499,
  currency: 'INR',
  departures: [
    { dateRange: '15 Dec – 18 Dec 2025', startDate: '2025-12-15', endDate: '2025-12-18', groupSize: 16, seatsLeft: 9, price: 7499, status: 'open' },
    { dateRange: '22 Dec – 25 Dec 2025', startDate: '2025-12-22', endDate: '2025-12-25', groupSize: 16, seatsLeft: 4, price: 7999, status: 'filling-fast' },
    { dateRange: '29 Dec – 1 Jan 2026', startDate: '2025-12-29', endDate: '2026-01-01', groupSize: 16, seatsLeft: 2, price: 8499, status: 'last-few' },
    { dateRange: '5 Jan – 8 Jan 2026', startDate: '2026-01-05', endDate: '2026-01-08', groupSize: 16, seatsLeft: 12, price: 7499, status: 'open' },
    { dateRange: '12 Jan – 15 Jan 2026', startDate: '2026-01-12', endDate: '2026-01-15', groupSize: 16, seatsLeft: 7, price: 7499, status: 'open' },
    { dateRange: '19 Jan – 22 Jan 2026', startDate: '2026-01-19', endDate: '2026-01-22', groupSize: 16, seatsLeft: 5, price: 7499, status: 'filling-fast' },
    { dateRange: '2 Feb – 5 Feb 2026', startDate: '2026-02-02', endDate: '2026-02-05', groupSize: 16, seatsLeft: 14, price: 7499, status: 'open' },
    { dateRange: '14 Feb – 17 Feb 2026', startDate: '2026-02-14', endDate: '2026-02-17', groupSize: 16, seatsLeft: 3, price: 7999, status: 'last-few' },
    { dateRange: '1 Mar – 4 Mar 2026', startDate: '2026-03-01', endDate: '2026-03-04', groupSize: 16, seatsLeft: 16, price: 6999, status: 'open' },
    { dateRange: '15 Mar – 18 Mar 2026', startDate: '2026-03-15', endDate: '2026-03-18', groupSize: 16, seatsLeft: 16, price: 6999, status: 'open' },
  ],
  quickItinerary: [
    'Day 1: Drive to Lohajung → Trek to Bekaltal (3 km)',
    'Day 2: Bekaltal → Brahmatal via Tilandi (8 km)',
    'Day 3: Summit day — ridge walk with 360° views → return to Tilandi',
    'Day 4: Descend to Lohajung → drive back',
  ],
  included: [
    'All meals (veg & non-veg options)',
    'Camping & tent accommodation',
    'Expert trek leader + support staff',
    'Safety equipment & first-aid kit',
    'Forest permits & camping charges',
    'Microspikes & gaiters (winter gear)',
  ],
  difficultyGuide:
    'Brahmatal is rated Moderate — suitable for trekkers with basic fitness. The trail gains altitude gradually over 4 days with no technical sections. Prior winter trekking experience is helpful but not mandatory. You should be comfortable walking 6–8 km per day on uneven terrain with a daypack. Temperatures at camp drop to -10°C in January — proper layering and a -15°C sleeping bag are essential.',
};

// ─── Kuari Pass ─────────────────────────────────────────────────────────────

const kuariPassDepartures: TrekDepartures = {
  slug: 'kuari-pass-trek',
  trekName: 'Kuari Pass Trek',
  shortName: 'Kuari Pass',
  duration: '5 Days / 4 Nights',
  difficulty: 'Moderate',
  altitude: '3,876 m',
  pickupPoint: 'Joshimath',
  urlSlug: 'kuari-pass',
  bestMonths: 'March – May & October – November',
  basePrice: 8499,
  currency: 'INR',
  departures: [
    { dateRange: '1 Mar – 5 Mar 2026', startDate: '2026-03-01', endDate: '2026-03-05', groupSize: 16, seatsLeft: 10, price: 8499, status: 'open' },
    { dateRange: '10 Mar – 14 Mar 2026', startDate: '2026-03-10', endDate: '2026-03-14', groupSize: 16, seatsLeft: 6, price: 8499, status: 'filling-fast' },
    { dateRange: '22 Mar – 26 Mar 2026', startDate: '2026-03-22', endDate: '2026-03-26', groupSize: 16, seatsLeft: 14, price: 8499, status: 'open' },
    { dateRange: '5 Apr – 9 Apr 2026', startDate: '2026-04-05', endDate: '2026-04-09', groupSize: 16, seatsLeft: 4, price: 8999, status: 'filling-fast' },
    { dateRange: '15 Apr – 19 Apr 2026', startDate: '2026-04-15', endDate: '2026-04-19', groupSize: 16, seatsLeft: 8, price: 8999, status: 'open' },
    { dateRange: '1 May – 5 May 2026', startDate: '2026-05-01', endDate: '2026-05-05', groupSize: 16, seatsLeft: 16, price: 8499, status: 'open' },
    { dateRange: '10 Oct – 14 Oct 2026', startDate: '2026-10-10', endDate: '2026-10-14', groupSize: 16, seatsLeft: 16, price: 8999, status: 'open' },
    { dateRange: '25 Oct – 29 Oct 2026', startDate: '2026-10-25', endDate: '2026-10-29', groupSize: 16, seatsLeft: 16, price: 8999, status: 'open' },
    { dateRange: '5 Nov – 9 Nov 2026', startDate: '2026-11-05', endDate: '2026-11-09', groupSize: 16, seatsLeft: 16, price: 8499, status: 'open' },
    { dateRange: '15 Nov – 19 Nov 2026', startDate: '2026-11-15', endDate: '2026-11-19', groupSize: 16, seatsLeft: 16, price: 8499, status: 'open' },
  ],
  quickItinerary: [
    'Day 1: Joshimath → Dhak → Gulling (6 km, forest ascent)',
    'Day 2: Gulling → Tali Lake (8 km, ridge walk with views)',
    'Day 3: Tali → Kuari Pass → Khullara (10 km, summit day)',
    'Day 4: Khullara → Auli (6 km, descent through meadows)',
    'Day 5: Auli → Joshimath (cable car or trail descent)',
  ],
  included: [
    'All meals (veg & non-veg options)',
    'Camping & tent accommodation',
    'Expert trek leader + support staff',
    'Safety equipment & first-aid kit',
    'Forest permits & camping charges',
    'Auli cable car / transport coordination',
  ],
  difficultyGuide:
    'Kuari Pass is rated Moderate — one of the best choices for a first serious Himalayan trek. No technical sections, no glacier crossings. The altitude stays below 4,000 m and the daily distances are manageable. If you can jog 5 km comfortably and walk 10 km on moderate terrain, you are ready for Kuari Pass. Spring batches have warmer conditions; autumn batches offer the clearest mountain views.',
};

// ─── Roopkund ───────────────────────────────────────────────────────────────

const roopkundDepartures: TrekDepartures = {
  slug: 'roopkund-trek',
  trekName: 'Roopkund Trek',
  shortName: 'Roopkund',
  duration: '7 Days / 6 Nights',
  difficulty: 'Challenging',
  altitude: '4,800 m',
  pickupPoint: 'Lohajung',
  urlSlug: 'roopkund',
  bestMonths: 'May – June & September – October',
  basePrice: 11499,
  currency: 'INR',
  departures: [
    { dateRange: '10 May – 16 May 2026', startDate: '2026-05-10', endDate: '2026-05-16', groupSize: 12, seatsLeft: 8, price: 11499, status: 'open' },
    { dateRange: '20 May – 26 May 2026', startDate: '2026-05-20', endDate: '2026-05-26', groupSize: 12, seatsLeft: 5, price: 11499, status: 'filling-fast' },
    { dateRange: '1 Jun – 7 Jun 2026', startDate: '2026-06-01', endDate: '2026-06-07', groupSize: 12, seatsLeft: 10, price: 11499, status: 'open' },
    { dateRange: '10 Jun – 16 Jun 2026', startDate: '2026-06-10', endDate: '2026-06-16', groupSize: 12, seatsLeft: 12, price: 10999, status: 'open' },
    { dateRange: '15 Sep – 21 Sep 2026', startDate: '2026-09-15', endDate: '2026-09-21', groupSize: 12, seatsLeft: 12, price: 11999, status: 'open' },
    { dateRange: '25 Sep – 1 Oct 2026', startDate: '2026-09-25', endDate: '2026-10-01', groupSize: 12, seatsLeft: 12, price: 11999, status: 'open' },
    { dateRange: '5 Oct – 11 Oct 2026', startDate: '2026-10-05', endDate: '2026-10-11', groupSize: 12, seatsLeft: 12, price: 11999, status: 'open' },
    { dateRange: '15 Oct – 21 Oct 2026', startDate: '2026-10-15', endDate: '2026-10-21', groupSize: 12, seatsLeft: 12, price: 11499, status: 'open' },
  ],
  quickItinerary: [
    'Day 1: Lohajung → Didina village (8 km, forest trail)',
    'Day 2: Didina → Ali Bugyal (5 km, meadows)',
    'Day 3: Ali Bugyal → Ghora Lotani (4 km, acclimatisation)',
    'Day 4: Ghora Lotani → Bhagwabasa (6 km, steep ascent)',
    'Day 5: Summit day — Bhagwabasa → Roopkund Lake → return (5 km)',
    'Day 6: Bhagwabasa → Bedni Bugyal (10 km, descent)',
    'Day 7: Bedni Bugyal → Wan → Lohajung (15 km)',
  ],
  included: [
    'All meals (veg & non-veg options)',
    'Camping & tent accommodation',
    'Expert trek leader + summit support',
    'Safety & medical equipment',
    'Forest & camping permits',
    'Porter support for common equipment',
  ],
  difficultyGuide:
    'Roopkund is rated Challenging — this is a serious high-altitude trek. You will reach 4,800 m with steep glacial moraine sections and potential snow. Prior multi-day trekking experience above 3,500 m is strongly recommended. You should be able to walk 8–10 hours on consecutive days at altitude. Start cardiovascular training (running, cycling, stair climbing) at least 8 weeks before your departure date. Smaller group sizes (12 max) ensure more individual attention from the guide.',
};

// ─── Pangarchulla ───────────────────────────────────────────────────────────

const pangarchullaDepartures: TrekDepartures = {
  slug: 'pangarchulla-trek',
  trekName: 'Pangarchulla Peak Trek',
  shortName: 'Pangarchulla',
  duration: '6 Days / 5 Nights',
  difficulty: 'Challenging',
  altitude: '4,590 m',
  pickupPoint: 'Joshimath',
  urlSlug: 'pangarchulla',
  bestMonths: 'March – May',
  basePrice: 10499,
  currency: 'INR',
  departures: [
    { dateRange: '5 Mar – 10 Mar 2026', startDate: '2026-03-05', endDate: '2026-03-10', groupSize: 12, seatsLeft: 7, price: 10499, status: 'open' },
    { dateRange: '15 Mar – 20 Mar 2026', startDate: '2026-03-15', endDate: '2026-03-20', groupSize: 12, seatsLeft: 3, price: 10999, status: 'last-few' },
    { dateRange: '28 Mar – 2 Apr 2026', startDate: '2026-03-28', endDate: '2026-04-02', groupSize: 12, seatsLeft: 10, price: 10499, status: 'open' },
    { dateRange: '8 Apr – 13 Apr 2026', startDate: '2026-04-08', endDate: '2026-04-13', groupSize: 12, seatsLeft: 6, price: 10999, status: 'filling-fast' },
    { dateRange: '20 Apr – 25 Apr 2026', startDate: '2026-04-20', endDate: '2026-04-25', groupSize: 12, seatsLeft: 12, price: 10499, status: 'open' },
    { dateRange: '1 May – 6 May 2026', startDate: '2026-05-01', endDate: '2026-05-06', groupSize: 12, seatsLeft: 12, price: 9999, status: 'open' },
    { dateRange: '10 May – 15 May 2026', startDate: '2026-05-10', endDate: '2026-05-15', groupSize: 12, seatsLeft: 12, price: 9999, status: 'open' },
    { dateRange: '20 May – 25 May 2026', startDate: '2026-05-20', endDate: '2026-05-25', groupSize: 12, seatsLeft: 12, price: 9999, status: 'open' },
  ],
  quickItinerary: [
    'Day 1: Joshimath → Dhak → Gulling (6 km, forest trail)',
    'Day 2: Gulling → Tali Lake (8 km, ridge walk)',
    'Day 3: Tali → Kuari Pass → Khullara (10 km)',
    'Day 4: Khullara — rest & acclimatisation',
    'Day 5: Summit day — Khullara → Pangarchulla Peak → return (8 km, alpine start)',
    'Day 6: Khullara → Auli → Joshimath (descent)',
  ],
  included: [
    'All meals (veg & non-veg options)',
    'Camping & tent accommodation',
    'Expert trek leader + summit support',
    'Safety equipment incl. crampons & gaiters',
    'Forest permits & camping charges',
    'Auli transport coordination',
  ],
  difficultyGuide:
    'Pangarchulla is rated Challenging — a true summit trek requiring prior high-altitude experience. The final push to 4,590 m involves steep snow-and-scree climbing with an early alpine start (2–3 AM). Crampons are required for the summit day. You should have completed at least one trek above 3,500 m and be comfortable walking 8+ hours per day. The acclimatisation day at Khullara is built in to help your body prepare for the summit push. Smaller groups (12 max) allow for a safer summit attempt.',
};

// ─── Exports ────────────────────────────────────────────────────────────────

export const ALL_DEPARTURES: TrekDepartures[] = [
  brahmatalDepartures,
  kuariPassDepartures,
  roopkundDepartures,
  pangarchullaDepartures,
];

export function getDeparturesBySlug(urlSlug: string): TrekDepartures | undefined {
  return ALL_DEPARTURES.find((d) => d.urlSlug === urlSlug);
}

export function getAllDepartureUrlSlugs(): string[] {
  return ALL_DEPARTURES.map((d) => d.urlSlug);
}
