/**
 * EXPERIENCE × LOCATION PAGES — Programmatic intersection pages
 * Generates one page per valid experience–location combination.
 * Content is derived from experiencePages locationAngles + location supplements.
 *
 * Adding a page = add a locationAngle to the parent experience in experiencePages.ts
 */

import { EXPERIENCE_PAGES, type ExperienceLocationAngle } from './experiencePages';
import type { LocationId } from './locations';

// ── Types ────────────────────────────────────────────────────────────────

export interface FAQItem {
  readonly question: string;
  readonly answer: string;
}

export interface ExperienceLocationPage {
  readonly slug: string;
  readonly experienceSlug: string;
  readonly locationId: string;
  readonly label: string;
  readonly locationName: string;
  readonly title: string;
  readonly h1: string;
  readonly metaDescription: string;
  readonly intro: string;
  readonly locationHeading: string;
  readonly whoIsThisFor: readonly string[];
  readonly whatToExpect: readonly string[];
  readonly sampleSchedule: readonly string[];
  readonly bestSeasons: string;
  readonly terrain: string;
  readonly access: string;
  readonly atmosphere: string;
  readonly landmarks: readonly string[];
  readonly relatedDurationSlugs: readonly string[];
  readonly parentHubSlug: string;
  readonly faqItems: readonly FAQItem[];
}

// ── Experience Type Mappings ─────────────────────────────────────────────

interface ExperienceTypeMapping {
  readonly experienceSlug: string;
  readonly urlPrefix: string;
  readonly label: string;
  readonly sampleSchedule: readonly string[];
  readonly relatedDurationSlugs: readonly string[];
}

const EXPERIENCE_TYPE_MAPPINGS: readonly ExperienceTypeMapping[] = [
  {
    experienceSlug: 'meditation-retreats',
    urlPrefix: 'meditation-retreat',
    label: 'Meditation Retreat',
    sampleSchedule: [
      '6:00 AM — Morning meditation',
      '7:30 AM — Breakfast in silence',
      '9:00 AM — Guided sitting meditation',
      '11:00 AM — Walking meditation',
      '12:30 PM — Lunch',
      '2:00 PM — Rest or personal practice',
      '4:00 PM — Afternoon meditation',
      '6:00 PM — Dinner',
      '7:30 PM — Evening dharma talk',
    ],
    relatedDurationSlugs: ['3-day-meditation-retreat', '7-day-meditation-retreat', '10-day-silent-retreat'],
  },
  {
    experienceSlug: 'silent-retreats',
    urlPrefix: 'silent-retreat',
    label: 'Silent Retreat',
    sampleSchedule: [
      '5:30 AM — Wake bell',
      '6:00 AM — Sitting meditation',
      '7:30 AM — Mindful breakfast',
      '9:00 AM — Walking meditation in nature',
      '10:30 AM — Sitting meditation',
      '12:00 PM — Lunch in silence',
      '2:00 PM — Personal time — walking, journalling',
      '4:00 PM — Afternoon sitting',
      '6:30 PM — Supper',
      '7:30 PM — Evening meditation',
    ],
    relatedDurationSlugs: ['3-day-silent-retreat', '10-day-silent-retreat'],
  },
  {
    experienceSlug: 'yoga-retreats',
    urlPrefix: 'yoga-retreat',
    label: 'Yoga Retreat',
    sampleSchedule: [
      '6:00 AM — Sunrise pranayama',
      '7:00 AM — Morning asana practice',
      '8:30 AM — Breakfast',
      '10:00 AM — Philosophy or technique workshop',
      '12:00 PM — Lunch',
      '2:00 PM — Rest or nature walk',
      '4:00 PM — Restorative yoga',
      '6:00 PM — Meditation',
      '7:00 PM — Dinner',
    ],
    relatedDurationSlugs: ['5-day-yoga-retreat', 'weekend-retreat-himalayas'],
  },
  {
    experienceSlug: 'burnout-recovery-retreats',
    urlPrefix: 'burnout-recovery-retreat',
    label: 'Burnout Recovery Retreat',
    sampleSchedule: [
      '7:00 AM — Gentle wake — natural light, no alarm',
      '8:00 AM — Light breakfast',
      '9:30 AM — Somatic therapy or breathwork',
      '11:00 AM — Nature immersion — forest walk',
      '12:30 PM — Lunch',
      '2:00 PM — Complete rest — sleep, read, journal',
      '4:00 PM — Gentle movement or body awareness',
      '6:00 PM — Dinner',
      '7:30 PM — Guided relaxation',
    ],
    relatedDurationSlugs: ['7-day-healing-retreat', '3-day-meditation-retreat'],
  },
  {
    experienceSlug: 'spiritual-retreats',
    urlPrefix: 'spiritual-retreat',
    label: 'Spiritual Retreat',
    sampleSchedule: [
      '5:30 AM — Pre-dawn meditation',
      '6:30 AM — Chanting or contemplative prayer',
      '7:30 AM — Breakfast',
      '9:00 AM — Dharma study or contemplative practice',
      '11:00 AM — Walking meditation',
      '12:30 PM — Lunch',
      '2:00 PM — Personal practice — sitting, journalling, reading',
      '4:00 PM — Guided group meditation',
      '6:00 PM — Dinner',
      '7:00 PM — Evening aarti or chanting',
    ],
    relatedDurationSlugs: ['7-day-meditation-retreat', '10-day-silent-retreat'],
  },
  {
    experienceSlug: 'stress-relief-retreats',
    urlPrefix: 'stress-relief-retreat',
    label: 'Stress Relief Retreat',
    sampleSchedule: [
      '7:00 AM — Gentle movement — stretching, tai chi',
      '8:00 AM — Breakfast',
      '9:30 AM — Breathwork session',
      '11:00 AM — Forest bathing',
      '12:30 PM — Lunch',
      '2:00 PM — Rest — no obligations',
      '4:00 PM — Somatic release or guided relaxation',
      '6:00 PM — Dinner',
      '7:30 PM — Sound healing or meditation',
    ],
    relatedDurationSlugs: ['3-day-meditation-retreat', 'weekend-retreat-himalayas', '7-day-healing-retreat'],
  },
  {
    experienceSlug: 'anxiety-healing-retreat',
    urlPrefix: 'anxiety-healing-retreat',
    label: 'Anxiety Healing Retreat',
    sampleSchedule: [
      '7:30 AM — Grounding breathwork',
      '8:30 AM — Breakfast',
      '10:00 AM — Guided anxiety-specific meditation',
      '11:30 AM — Nature walk — forest or meadow',
      '12:30 PM — Lunch',
      '2:00 PM — Rest or journalling',
      '3:30 PM — Body awareness practice',
      '5:00 PM — Gentle movement',
      '6:30 PM — Dinner',
      '8:00 PM — Calming meditation',
    ],
    relatedDurationSlugs: ['3-day-meditation-retreat', '7-day-healing-retreat'],
  },
  {
    experienceSlug: 'digital-detox-retreat',
    urlPrefix: 'digital-detox-retreat',
    label: 'Digital Detox Retreat',
    sampleSchedule: [
      '6:30 AM — Wake with natural light',
      '7:00 AM — Morning walk or meditation',
      '8:00 AM — Breakfast',
      '9:30 AM — Analog activity — reading, drawing, writing',
      '11:00 AM — Group conversation or nature exploration',
      '12:30 PM — Lunch',
      '2:00 PM — Free time — no structure, no screens',
      '4:00 PM — Creative practice or manual skill',
      '6:00 PM — Dinner',
      '7:30 PM — Stargazing, fireside, or journalling',
    ],
    relatedDurationSlugs: ['3-day-meditation-retreat', 'weekend-retreat-himalayas'],
  },
  {
    experienceSlug: 'healing-retreat-himalayas',
    urlPrefix: 'healing-retreat',
    label: 'Healing Retreat',
    sampleSchedule: [
      '7:00 AM — Gentle breathwork',
      '8:00 AM — Breakfast',
      '9:30 AM — Guided healing meditation',
      '11:00 AM — Forest bathing or body therapy',
      '12:30 PM — Lunch',
      '2:00 PM — Deep rest — part of the healing',
      '4:00 PM — Somatic practice or sound healing',
      '6:00 PM — Dinner',
      '7:30 PM — Reflective journalling or group sharing',
    ],
    relatedDurationSlugs: ['7-day-healing-retreat', '3-day-meditation-retreat'],
  },
];

// ── Location Supplements ─────────────────────────────────────────────────

interface LocationSupplement {
  readonly name: string;
  readonly bestSeasons: string;
  readonly terrain: string;
  readonly access: string;
  readonly atmosphere: string;
  readonly landmarks: readonly string[];
  readonly firstTimerFriendly: boolean;
  readonly firstTimerNote: string;
}

const LOCATION_SUPPLEMENTS: Record<string, LocationSupplement> = {
  chakrata: {
    name: 'Chakrata',
    bestSeasons: 'March–May and September–November',
    terrain: 'Dense deodar forests at 2,200 m on a quiet Himalayan ridge',
    access: 'Dehradun → Chakrata, 85 km (3.5 hours by road). Dehradun is well connected by rail and air from Delhi.',
    atmosphere: 'Complete absence of commercial tourism. Deep forest silence where the acoustic environment is naturally regulating.',
    landmarks: ['Tiger Falls', 'Budher Caves', 'Deoban viewpoint'],
    firstTimerFriendly: true,
    firstTimerNote: 'Chakrata is our most recommended location for first-time retreatants — accessible, gentle, and deeply nurturing without extreme conditions.',
  },
  sankri: {
    name: 'Sankri',
    bestSeasons: 'March–May and September–November',
    terrain: 'Mountain village at 2,000 m in Govind Wildlife Sanctuary',
    access: 'Dehradun → Sankri, 195 km (7 hours by road). The journey through Mussoorie and Purola is itself a transition into mountain quiet.',
    atmosphere: 'Remote Himalayan village with pastoral simplicity. Trekking culture meets genuine mountain isolation.',
    landmarks: ['Har Ki Dun valley', 'Govind Wildlife Sanctuary', 'Swargarohini peaks'],
    firstTimerFriendly: true,
    firstTimerNote: 'Sankri works well for first-timers who are comfortable with a longer journey and enjoy physical environments. The village setting is warm and welcoming.',
  },
  mussoorie: {
    name: 'Mussoorie',
    bestSeasons: 'March–June and September–November',
    terrain: 'Colonial hill station at 2,000 m with misty ridgelines and pine forests',
    access: 'Dehradun → Mussoorie, 35 km (1.5 hours by road). The most accessible Himalayan retreat location.',
    atmosphere: 'Established hill station with quieter pockets away from Mall Road. Cloud forests and colonial-era architecture.',
    landmarks: ['Lal Tibba', 'Cloud End', 'George Everest Peak'],
    firstTimerFriendly: true,
    firstTimerNote: 'Mussoorie is ideal for first-timers who want a Himalayan experience with maximum accessibility and comfortable infrastructure.',
  },
  munsiyari: {
    name: 'Munsiyari',
    bestSeasons: 'March–June and September–November',
    terrain: 'High-altitude plateau at 2,300 m facing the Panchachuli peaks',
    access: 'Kathgodam → Munsiyari, 265 km (9 hours by road). The long journey creates natural separation from daily life.',
    atmosphere: 'Edge-of-civilisation remoteness. Vast alpine meadows, enormous sky, and the Panchachuli range filling the horizon.',
    landmarks: ['Panchachuli peaks', 'Khaliya Top meadows', 'Birthi Falls'],
    firstTimerFriendly: false,
    firstTimerNote: 'Munsiyari suits those comfortable with remoteness and a long approach journey. The reward is expansive landscapes that few other locations can match.',
  },
  rishikesh: {
    name: 'Rishikesh',
    bestSeasons: 'September–March (avoid monsoon June–August)',
    terrain: 'Ganges riverbank in the Himalayan foothills at 370 m',
    access: 'Dehradun → Rishikesh, 45 km (1.5 hours by road). Also accessible directly from Delhi (5.5 hours by road or train to Haridwar).',
    atmosphere: 'India\'s spiritual capital. Living yoga and meditation tradition along the Ganges. Ashrams, temples, and accumulated spiritual energy.',
    landmarks: ['Ganges river', 'Ram Jhula', 'Triveni Ghat'],
    firstTimerFriendly: true,
    firstTimerNote: 'Rishikesh is excellent for first-timers drawn to tradition, community, and a spiritual atmosphere with easy access and established infrastructure.',
  },
  zanskar: {
    name: 'Zanskar',
    bestSeasons: 'June–September',
    terrain: 'Trans-Himalayan plateau at 3,500 m with arid valleys and ancient geology',
    access: 'Leh → Zanskar, 230 km (8–10 hours by road). Flights from Delhi to Leh, then road journey through high passes.',
    atmosphere: 'Extreme remoteness. Buddhist monastery culture stretching back over a thousand years. No reliable phone signal.',
    landmarks: ['Stongdey Monastery', 'Phuktal Gompa', 'Zanskar River gorge'],
    firstTimerFriendly: false,
    firstTimerNote: 'Zanskar is recommended for those with prior retreat or high-altitude experience. The remoteness and altitude demand physical readiness and psychological willingness. The depth it offers is unmatched.',
  },
};

// ── FAQ Generator ────────────────────────────────────────────────────────

function generateFAQs(
  label: string,
  locationName: string,
  supplement: LocationSupplement,
  experienceSlug: string,
): FAQItem[] {
  const lLabel = label.toLowerCase();

  return [
    {
      question: `When is the best time for a ${lLabel} in ${locationName}?`,
      answer: `The best time for a ${lLabel} in ${locationName} is ${supplement.bestSeasons}. The weather during these months supports outdoor practice, comfortable daily schedules, and the kind of environmental clarity that deepens the retreat experience. ${locationName === 'Zanskar' ? 'Outside this window, Zanskar is inaccessible due to snow on the passes.' : locationName === 'Rishikesh' ? 'Avoid June–August when monsoon rains disrupt schedules and raise humidity.' : 'Monsoon months (July–August) bring heavy rainfall and are not recommended for retreats.'}`,
    },
    {
      question: `How do I get to ${locationName} for a retreat?`,
      answer: `${supplement.access} We coordinate arrival and departure logistics for all retreatants, including pickup arrangements from the nearest transport hub. The journey itself begins the transition into retreat mode — ${locationName === 'Munsiyari' || locationName === 'Zanskar' ? 'the long approach creates natural withdrawal from daily life before you even arrive.' : 'leaving the city behind as the landscape changes.'}`,
    },
    {
      question: `Is ${locationName} suitable for a first ${lLabel}?`,
      answer: supplement.firstTimerFriendly
        ? `Yes. ${supplement.firstTimerNote} For a first ${lLabel}, a supportive environment matters more than anything else — and ${locationName} provides that.`
        : `${supplement.firstTimerNote} For a first ${lLabel}, we often recommend starting with Chakrata — it offers the gentlest entry while still providing genuine depth. If you are drawn specifically to ${locationName}, reach out and we will assess whether the timing is right.`,
    },
    {
      question: `What makes a ${lLabel} in ${locationName} different from other locations?`,
      answer: `${supplement.atmosphere} The nearby landmarks — ${supplement.landmarks.join(', ')} — enrich the experience. ${supplement.terrain}. Every location we operate in offers a distinct quality, and ${locationName}'s strength is ${locationName === 'Chakrata' ? 'accessibility combined with genuine forest silence.' : locationName === 'Zanskar' ? 'unparalleled depth through radical remoteness and monastic heritage.' : locationName === 'Rishikesh' ? 'living spiritual tradition and the presence of the Ganges.' : locationName === 'Munsiyari' ? 'vast alpine landscapes that expand perspective.' : locationName === 'Sankri' ? 'integration of physical terrain with contemplative practice.' : 'a balance of comfort and natural beauty.'}`,
    },
  ];
}

// ── Page Generator ───────────────────────────────────────────────────────

function generatePages(): ExperienceLocationPage[] {
  const pages: ExperienceLocationPage[] = [];

  for (const mapping of EXPERIENCE_TYPE_MAPPINGS) {
    const experience = EXPERIENCE_PAGES.find((e) => e.slug === mapping.experienceSlug);
    if (!experience) continue;

    for (const angle of experience.locationAngles) {
      const supplement = LOCATION_SUPPLEMENTS[angle.locationId];
      if (!supplement) continue;

      const slug = `${mapping.urlPrefix}-${angle.locationId}`;
      const locationName = supplement.name;

      pages.push({
        slug,
        experienceSlug: mapping.experienceSlug,
        locationId: angle.locationId,
        label: mapping.label,
        locationName,
        title: `${mapping.label} in ${locationName} — ${angle.heading.split(' — ')[1] || locationName} | Retreats And Treks`,
        h1: `${mapping.label} in ${locationName}`,
        metaDescription: `${mapping.label} in ${locationName}. ${angle.heading}. Best time: ${supplement.bestSeasons}. Small-group, immersive Himalayan retreat. Inquire now.`,
        intro: angle.description,
        locationHeading: angle.heading,
        whoIsThisFor: experience.whoIsThisFor,
        whatToExpect: experience.whatToExpect,
        sampleSchedule: mapping.sampleSchedule,
        bestSeasons: supplement.bestSeasons,
        terrain: supplement.terrain,
        access: supplement.access,
        atmosphere: supplement.atmosphere,
        landmarks: supplement.landmarks,
        relatedDurationSlugs: mapping.relatedDurationSlugs,
        parentHubSlug: mapping.experienceSlug,
        faqItems: generateFAQs(mapping.label, locationName, supplement, mapping.experienceSlug),
      });
    }
  }

  return pages;
}

// ── Exports ──────────────────────────────────────────────────────────────

export const EXPERIENCE_LOCATION_PAGES: readonly ExperienceLocationPage[] = generatePages();

export function getExperienceLocationPage(slug: string): ExperienceLocationPage | undefined {
  return EXPERIENCE_LOCATION_PAGES.find((p) => p.slug === slug);
}

export function getAllExperienceLocationSlugs(): string[] {
  return EXPERIENCE_LOCATION_PAGES.map((p) => p.slug);
}

/**
 * Get all sibling pages (same experience, different location)
 */
export function getSiblingPages(slug: string): ExperienceLocationPage[] {
  const page = getExperienceLocationPage(slug);
  if (!page) return [];
  return EXPERIENCE_LOCATION_PAGES.filter(
    (p) => p.experienceSlug === page.experienceSlug && p.slug !== slug,
  );
}
