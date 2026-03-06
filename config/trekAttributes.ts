/**
 * TREK ATTRIBUTE PAGE CONFIG
 *
 * Defines filter criteria and SEO content for programmatic attribute pages.
 * Each config entry drives a statically-generated page that filters ALL_TREKS.
 */

import { TrekContent } from '@/types/content';

export interface TrekAttributeConfig {
  /** URL slug under /treks/ */
  slug: string;
  /** Page title (H1 + <title>) */
  title: string;
  /** Meta description */
  description: string;
  /** Short intro paragraph */
  intro: string;
  /** Filter function applied to ALL_TREKS */
  filter: (trek: TrekContent) => boolean;
  /** FAQ items */
  faqs: { question: string; answer: string }[];
  /** Sitemap priority */
  priority: number;
}

function parseAltitude(trek: TrekContent): number {
  if (!trek.altitude) return 0;
  return parseInt(trek.altitude.replace(/[^\d]/g, ''), 10) || 0;
}

function parseDurationDays(trek: TrekContent): number {
  const match = trek.duration.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export const TREK_ATTRIBUTE_PAGES: TrekAttributeConfig[] = [
  /* ── Altitude ──────────────────────────────────────────────────────── */
  {
    slug: 'above-4000m-treks-uttarakhand',
    title: 'Treks Above 4,000m in Uttarakhand — High-Altitude Expeditions',
    description:
      'High-altitude treks above 4,000m in Uttarakhand: Roopkund (4,800m) and Pangarchulla (4,590m). Expedition routes, fitness requirements, and season guide for experienced trekkers.',
    intro:
      'Above 4,000 metres, Uttarakhand trekking enters expedition territory — glacier moraines, sustained altitude exposure, and mountain conditions that demand prior experience. These routes are for trekkers who have completed moderate Himalayan treks and are ready to push higher.',
    filter: (trek) => parseAltitude(trek) >= 4000,
    faqs: [
      {
        question: 'Which treks in Uttarakhand go above 4,000m?',
        answer:
          'Roopkund (4,800m) and Pangarchulla Peak (4,590m) are the two primary treks above 4,000m in Uttarakhand. Both are rated Challenging and require prior high-altitude experience.',
      },
      {
        question: 'Do I need special fitness for treks above 4,000m?',
        answer:
          'Yes. 6–8 weeks of structured cardiovascular training is recommended. You should be able to walk 8–10 hours on consecutive days at altitude. Prior trekking experience above 3,500m is essential.',
      },
    ],
    priority: 0.75,
  },
  {
    slug: 'low-altitude-treks-uttarakhand',
    title: 'Low-Altitude Treks in Uttarakhand — Below 3,500m, No AMS Risk',
    description:
      'Low-altitude treks below 3,500m in Uttarakhand with no altitude sickness risk. Day hikes, weekend treks, and forest trails in Chakrata and Munsiyari. Ideal for families and first-timers.',
    intro:
      'Below 3,500 metres, altitude sickness is virtually absent and oxygen levels are comfortable for any fitness level. These Uttarakhand treks stay in forest and meadow terrain — no glacier approaches, no exposed ridges, no need for acclimatisation days. Ideal for families, weekend travellers, and anyone who wants a Himalayan experience without altitude concerns.',
    filter: (trek) => parseAltitude(trek) > 0 && parseAltitude(trek) < 3500,
    faqs: [
      {
        question: 'Which Uttarakhand treks have no altitude sickness risk?',
        answer:
          'All treks below 3,500m carry negligible AMS risk. Tiger Fall (2,200m), Budher Caves (2,300m), and the Chakrata Weekend Trek (2,500m) stay well within the safe altitude band. You can also try Khaliya Top (3,500m) or the Guided Chakrata Trek — both are below the threshold where altitude sickness becomes a concern.',
      },
      {
        question: 'Can children and families do low-altitude treks?',
        answer:
          'Yes. Day treks like Tiger Fall and Budher Caves are suitable for children aged 8+. The trails are forest paths at 2,000–2,500m with no exposure or technical terrain. The Chakrata Weekend Trek works well for family groups with moderate walking fitness.',
      },
    ],
    priority: 0.7,
  },

  /* ── Season ────────────────────────────────────────────────────────── */
  {
    slug: 'spring-treks-uttarakhand',
    title: 'Best Spring Treks in Uttarakhand (March–May) — Rhododendron Season',
    description:
      'Spring treks in Uttarakhand from March to May. Rhododendron blooms, clearing snow, and the best weather for Kuari Pass, Pangarchulla, Brahmatal, and Khaliya Top.',
    intro:
      'Spring in Uttarakhand (March–May) brings rhododendron blooms, retreating snow, and the longest daylight hours before monsoon. The trail conditions are ideal — firm, dry, and warm enough for comfortable camping. This is the widest trekking window of the year.',
    filter: (trek) =>
      trek.bestSeason.some((s) =>
        ['March', 'April', 'May'].includes(s),
      ),
    faqs: [
      {
        question: 'Which Uttarakhand treks are best in spring?',
        answer:
          'Kuari Pass (March–May) for panoramic ridge walking with rhododendron bloom. Pangarchulla (March–May) for a challenging summit. Brahmatal (March) for late-season snow. Khaliya Top (May) for Panchachuli views. Spring is the most versatile trekking season.',
      },
      {
        question: 'Is there still snow on treks in March?',
        answer:
          'Yes, above 3,200m. Brahmatal and the Kuari Pass upper sections have retreating snow in March. By April, most trails are snow-free except the highest passes. Pangarchulla retains summit snow through May.',
      },
    ],
    priority: 0.75,
  },
  {
    slug: 'autumn-treks-uttarakhand',
    title: 'Best Autumn Treks in Uttarakhand (September–November) — Clearest Skies',
    description:
      'Autumn treks in Uttarakhand from September to November. Post-monsoon clarity, golden foliage, and the best mountain visibility of the year. Kuari Pass, Roopkund, Har Ki Dun, and more.',
    intro:
      'Autumn (September–November) is the sharpest trekking season in Uttarakhand. The monsoon washes out haze, leaving crystal-clear skies and razor-sharp mountain views. Trails are dry, temperatures are comfortable, and crowds thin after the summer rush.',
    filter: (trek) =>
      trek.bestSeason.some((s) =>
        ['September', 'October', 'November'].includes(s),
      ),
    faqs: [
      {
        question: 'Why is autumn the best trekking season in Uttarakhand?',
        answer:
          'Post-monsoon air is the clearest of the year. Mountain visibility peaks in October — Nanda Devi, Trishul, and Panchachuli are razor-sharp from sunrise to sunset. Trails are dry and firm. Temperatures are comfortable for camping.',
      },
      {
        question: 'Which treks are best in October?',
        answer:
          'Kuari Pass offers the best panoramic visibility. Roopkund has the most reliable post-monsoon weather window. Har Ki Dun is at peak autumn colour. Khaliya Top has clear Panchachuli views. October is the single best month for Uttarakhand trekking.',
      },
    ],
    priority: 0.75,
  },

  /* ── Duration ──────────────────────────────────────────────────────── */
  {
    slug: '5-day-treks-uttarakhand',
    title: '5-Day Treks in Uttarakhand — Kedarkantha, Kuari Pass & Har Ki Dun',
    description:
      'Best 5-day treks in Uttarakhand: Kedarkantha summit, Kuari Pass ridge walk, and Har Ki Dun valley trek. Moderate to challenging routes ideal for a week off work.',
    intro:
      'Five days is the sweet spot for Himalayan trekking — enough time for genuine altitude, landscape immersion, and a proper summit or valley experience without requiring extended leave. These three routes represent the best 5-day options across different seasons and difficulty levels.',
    filter: (trek) => parseDurationDays(trek) === 5,
    faqs: [
      {
        question: 'Which is the best 5-day trek in Uttarakhand?',
        answer:
          'Kuari Pass for the widest panoramic views over 5 days. Kedarkantha for a winter summit experience. Har Ki Dun for a valley immersion through traditional villages. All three are 5-day routes from different base towns.',
      },
      {
        question: 'Can I do a 5-day trek with only weekdays off?',
        answer:
          'Yes. With a Saturday–Wednesday or Monday–Friday window, you can complete any 5-day trek. Add one travel day each way (Delhi–base town). Total: 7 days including travel.',
      },
    ],
    priority: 0.7,
  },
  {
    slug: 'week-long-treks-uttarakhand',
    title: 'Week-Long Treks in Uttarakhand (6–10 Days) — Expedition Routes',
    description:
      'Week-long and multi-day treks in Uttarakhand: Pangarchulla (6 days), Roopkund (7 days), and Milam Glacier (8–10 days). Extended expedition routes for experienced trekkers.',
    intro:
      'Extended treks of 6 to 10 days take you deeper into the Himalaya than any short route can. These are expedition-grade commitments that reward with landscapes, terrain, and mountain experiences unavailable on shorter routes.',
    filter: (trek) => parseDurationDays(trek) >= 6,
    faqs: [
      {
        question: 'Which is the longest trek in Uttarakhand?',
        answer:
          'Milam Glacier is the longest at 8–10 days, covering 118 km along the ancient Johar trade route from Munsiyari. Roopkund is 7 days (53 km). Pangarchulla is 6 days (32 km).',
      },
      {
        question: 'Do I need expedition experience for long treks?',
        answer:
          'Prior multi-day trekking experience above 3,500m is essential for all routes over 6 days. Roopkund and Milam Glacier require comfort with sustained altitude exposure and remote camping. Pangarchulla requires summit-day climbing fitness.',
      },
    ],
    priority: 0.7,
  },
];
