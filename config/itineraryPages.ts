/**
 * ITINERARY PAGES — Day-by-day retreat schedule pages
 * Generates one itinerary page per Experience × Location combination.
 * Targets: "meditation retreat schedule", "what happens during a retreat",
 *          "7 day retreat itinerary", etc.
 *
 * Each page inherits the sampleSchedule from its parent E×L config
 * and adds a day-by-day narrative arc.
 */

import { EXPERIENCE_LOCATION_PAGES, type ExperienceLocationPage as ELPage, type FAQItem } from './experienceLocationPages';

// ── Types ────────────────────────────────────────────────────────────────

export interface ItineraryDay {
  readonly day: number;
  readonly theme: string;
  readonly description: string;
  readonly schedule: readonly string[];
}

export interface ItineraryPage {
  readonly slug: string;
  readonly parentSlug: string;
  readonly durationDays: number;
  readonly experienceSlug: string;
  readonly locationId: string;
  readonly label: string;
  readonly locationName: string;
  readonly title: string;
  readonly h1: string;
  readonly metaDescription: string;
  readonly intro: string;
  readonly days: readonly ItineraryDay[];
  readonly faqItems: readonly FAQItem[];
  readonly parentHubSlug: string;
  readonly relatedDurationSlugs: readonly string[];
}

// ── Experience Arc Definitions ───────────────────────────────────────────

interface ExperienceArc {
  readonly urlPrefix: string;
  readonly duration: number;
  readonly themes: readonly string[];
  readonly descriptions: readonly string[]; // {location} placeholder
  readonly arrivalSchedule: readonly string[];
  readonly departureSchedule: readonly string[];
}

const ARCS: Record<string, ExperienceArc> = {
  'meditation-retreats': {
    urlPrefix: 'meditation-retreat',
    duration: 7,
    themes: [
      'Arrival & First Sitting',
      'Establishing the Container',
      'Settling Into Rhythm',
      'The Deepening',
      'Full Immersion',
      'Integration',
      'Closing & Departure',
    ],
    descriptions: [
      'You arrive in {location}, unpack, and take your first walk through the retreat grounds. The evening begins with orientation and a short sitting meditation — your first taste of what the week holds.',
      'Your first full day of structured practice. Three meditation sessions, walking meditation, and a dharma talk establish the rhythm you will follow. The mind is still busy — that is expected and part of the process.',
      'The rhythm becomes familiar. By the third day, the body knows when to sit, when to walk, when to eat. The mind is still active but no longer fighting the structure. Something begins to settle.',
      'Practice deepens noticeably. Sessions lengthen. Guidance becomes less verbal, more spacious. Many practitioners report a quality shift around day four — the constant mental commentary begins to thin.',
      'The heart of the retreat. Extended sitting with minimal instruction. The practice carries itself. The environment in {location} supports what is happening internally — spaciousness outside, spaciousness inside.',
      'Practice moves from the cushion into ordinary activities. Walking, eating, resting — all become opportunities for the same quality of attention developed during sitting. The boundary between practice and life blurs.',
      'A final morning sitting, then a closing circle. Guidance on maintaining practice at home. Departure after lunch. The transition from retreat silence back to conversation deserves care.',
    ],
    arrivalSchedule: [
      'Afternoon — Arrival and room allocation',
      '4:00 PM — Tea and welcome',
      '5:00 PM — Orientation walk',
      '6:30 PM — First sitting meditation (30 min)',
      '7:30 PM — Dinner',
    ],
    departureSchedule: [
      '6:00 AM — Final morning meditation',
      '7:30 AM — Breakfast in silence',
      '9:00 AM — Closing circle and reflection',
      '10:30 AM — Tea and farewells',
      '11:00 AM — Departure',
    ],
  },

  'silent-retreats': {
    urlPrefix: 'silent-retreat',
    duration: 7,
    themes: [
      'Arrival & Entering Silence',
      'The First Full Day of Silence',
      'When the Mind Gets Loud',
      'The Settling',
      'Deep Silence',
      'Embodied Quiet',
      'Breaking Silence & Departure',
    ],
    descriptions: [
      'You arrive in {location} and attend the evening orientation. After a shared dinner, noble silence begins. The last conversation you have will be the orientation. From here, it is you and the silence.',
      'Your first full day without speech. The structure holds you — sit, walk, eat, rest, sit again. Without conversation to fill the gaps, everything becomes more vivid. The sounds of {location} fill the space words used to occupy.',
      'Day three is often the hardest. The mind, denied its usual outlet of speech, gets louder internally. Restlessness, boredom, or emotional surfacing are common. This is the work. The schedule carries you through.',
      'Something shifts. The internal noise begins to subside — not because you forced it, but because it exhausted itself. The silence of {location} starts to feel like a presence rather than an absence.',
      'The deepest day. Extended sitting, long walking meditation, minimal structure beyond the basic rhythm. The quality of attention available now is different from day one. The silence has done its work.',
      'Awareness extends beyond formal practice. The silence is no longer a container you step into — it is a quality you carry. Each activity becomes a meditation. {location} feels different when perceived this way.',
      'Silence is broken gently after the morning session. A closing circle allows the first words in days. Many find speaking difficult — a sign of how deeply the silence settled. Departure after lunch.',
    ],
    arrivalSchedule: [
      'Afternoon — Arrival and settling',
      '4:30 PM — Tea',
      '5:30 PM — Orientation (last spoken session)',
      '7:00 PM — Dinner',
      '8:00 PM — Noble silence begins',
    ],
    departureSchedule: [
      '5:30 AM — Wake bell',
      '6:00 AM — Final sitting meditation',
      '7:30 AM — Mindful breakfast',
      '9:00 AM — Silence breaks — closing circle',
      '10:30 AM — Tea and gentle conversation',
      '11:00 AM — Departure',
    ],
  },

  'yoga-retreats': {
    urlPrefix: 'yoga-retreat',
    duration: 5,
    themes: [
      'Arrival & Opening Practice',
      'Building the Foundation',
      'Deepening Practice',
      'Personal Development',
      'Integration & Departure',
    ],
    descriptions: [
      'You arrive in {location} and settle in. The evening includes a gentle opening class — nothing strenuous, just enough to reconnect with the body after travel. Pranayama introduction and dinner follow.',
      'Your first full practice day. Morning vinyasa establishes the physical baseline. The afternoon workshop introduces philosophical context — yoga as more than physical exercise. Evening restorative session.',
      'Practice deepens. The morning class builds on day two. Alignment refinement, longer holds, breath integration. The afternoon philosophy session connects asana to the broader tradition. You feel {location} entering the practice.',
      'The focus shifts from instruction to your own practice. The morning session is less guided — you work with what you have learned. Afternoon is personal practice time with the teacher available for individual guidance.',
      'A final morning practice that integrates everything from the week. Guidance on designing a home practice. Closing circle after breakfast, departure before lunch.',
    ],
    arrivalSchedule: [
      'Afternoon — Arrival and room allocation',
      '4:00 PM — Welcome tea',
      '5:00 PM — Gentle opening class',
      '6:30 PM — Pranayama introduction',
      '7:00 PM — Dinner',
    ],
    departureSchedule: [
      '6:00 AM — Sunrise pranayama',
      '7:00 AM — Integration practice (self-led)',
      '8:30 AM — Breakfast',
      '9:30 AM — Closing circle',
      '10:30 AM — Departure',
    ],
  },

  'burnout-recovery-retreats': {
    urlPrefix: 'burnout-recovery-retreat',
    duration: 5,
    themes: [
      'Arrival & Permission to Stop',
      'Beginning to Unwind',
      'The Rest Deepens',
      'Reconnecting With the Body',
      'Re-entry Preparation',
    ],
    descriptions: [
      'You arrive in {location} carrying everything you came to put down. No agenda this afternoon — just arrive, unpack, walk if you want, sleep if you need to. A light evening session introduces breathwork as a tool for nervous system regulation.',
      'The first full day is deliberately light. One somatic session in the morning, a forest walk, and extended rest in the afternoon. Burnout recovery does not begin with more activity — it begins with the radical permission to do less.',
      'Rest deepens. By day three, the hypervigilance of chronic overwork begins to soften. The body starts to register how tired it actually is. The morning breathwork session may bring unexpected emotion — that is welcome.',
      'The body begins to come back online. Gentle movement, body awareness practice, and time in nature in {location}. Not exercise — reconnection. The afternoon includes journalling prompts for identifying the patterns that led here.',
      'Guidance on re-entering your life without immediately recreating the conditions that caused burnout. Practical frameworks for boundary-setting, energy management, and recognising early warning signs. Departure after lunch.',
    ],
    arrivalSchedule: [
      'Afternoon — Arrival at your own pace',
      '5:00 PM — Welcome tea (optional)',
      '6:30 PM — Introduction to breathwork',
      '7:30 PM — Dinner',
      '8:30 PM — Early rest encouraged',
    ],
    departureSchedule: [
      '7:00 AM — Gentle wake',
      '8:00 AM — Breakfast',
      '9:00 AM — Re-entry guidance session',
      '10:30 AM — Closing and farewell',
      '11:00 AM — Departure',
    ],
  },

  'spiritual-retreats': {
    urlPrefix: 'spiritual-retreat',
    duration: 7,
    themes: [
      'Arrival & Sacred Welcome',
      'Establishing Devotional Rhythm',
      'The Contemplative Ground',
      'Inner Inquiry',
      'Surrender',
      'Living the Practice',
      'Closing Ceremony & Departure',
    ],
    descriptions: [
      'You arrive in {location} and receive a simple welcome. The evening begins with chanting or contemplative prayer — establishing the devotional tone that will carry through the week.',
      'Your first full day of contemplative structure. Morning meditation, dharma study, and walking practice create the container. The spiritual tradition of {location} becomes tangible — not as history, but as living practice.',
      'The contemplative ground deepens. Study sessions explore core questions — suffering, impermanence, the nature of self. Afternoon practice sits with these questions without seeking premature answers.',
      'The inquiry turns inward. Extended sitting with self-inquiry techniques. The teacher is available for individual dialogue. The accumulated weight of the first four days creates pressure — something is being worked through.',
      'The heart of the spiritual retreat. Practice moves beyond technique into territory where effort becomes counterproductive. What remains when you stop trying? The environment of {location} holds the question.',
      'Practice extends into daily activity. Cooking, walking, cleaning — all become sacred. The distinction between spiritual practice and ordinary life collapses.',
      'A closing ceremony appropriate to the tradition. Chanting, silence, a final dharma talk. Guidance on continuing the inquiry at home. Departure after shared lunch.',
    ],
    arrivalSchedule: [
      'Afternoon — Arrival and settling',
      '4:30 PM — Tea',
      '5:30 PM — Orientation',
      '6:30 PM — Opening chanting or contemplative prayer',
      '7:30 PM — Dinner',
    ],
    departureSchedule: [
      '5:30 AM — Pre-dawn meditation',
      '6:30 AM — Closing ceremony',
      '7:30 AM — Breakfast',
      '9:00 AM — Final dharma talk',
      '10:30 AM — Farewell',
      '11:00 AM — Departure',
    ],
  },

  'stress-relief-retreats': {
    urlPrefix: 'stress-relief-retreat',
    duration: 5,
    themes: [
      'Arrival & Initial Decompression',
      'Nervous System Reset',
      'Forest and Breath',
      'Somatic Release',
      'Sustainable Calm & Departure',
    ],
    descriptions: [
      'You arrive in {location} carrying tension you may not even feel yet. The afternoon is unstructured. Evening begins with guided breathwork — your first tool for active stress regulation.',
      'The first full day focuses on the nervous system. Morning breathwork, forest bathing, and a somatic therapy session begin to down-regulate the fight-or-flight pattern. Afternoon is deliberately empty — rest is part of the treatment.',
      'Forest and breath become the primary tools today. Extended forest bathing in {location}, with walking breathwork practice interwoven. The afternoon brings sound healing or guided body relaxation.',
      'Somatic release work — the body stores what the mind suppresses. Morning body awareness practice and gentle movement help release held tension. Some find this emotional; that is the stress leaving.',
      'The final day focuses on sustainability. What practices can you take home? How do you notice stress building before it becomes chronic? Practical frameworks for daily regulation. Departure after lunch.',
    ],
    arrivalSchedule: [
      'Afternoon — Arrival and settling',
      '4:30 PM — Welcome tea',
      '6:00 PM — Guided breathwork (40 min)',
      '7:00 PM — Dinner',
      '8:30 PM — Rest',
    ],
    departureSchedule: [
      '7:00 AM — Gentle movement',
      '8:00 AM — Breakfast',
      '9:00 AM — Sustainability session — taking practice home',
      '10:30 AM — Closing',
      '11:00 AM — Departure',
    ],
  },

  'anxiety-healing-retreat': {
    urlPrefix: 'anxiety-healing-retreat',
    duration: 5,
    themes: [
      'Arrival & Safe Landing',
      'Understanding the Pattern',
      'Breath and Ground',
      'Rewiring the Response',
      'Building Resilience & Departure',
    ],
    descriptions: [
      'You arrive in {location} — perhaps anxious about the retreat itself. That is fine. The environment is designed to feel safe. Evening grounding breathwork gives you your first tool. No pressure to be anything other than what you are.',
      'The first full day is educational and experiential. Morning meditation focuses on anxiety-specific techniques — grounding, breath counting, body scanning. The afternoon explores the anxiety pattern: what triggers it, where you feel it, what maintains it.',
      'Breath becomes the primary intervention today. Extended breathwork sessions in {location}, alternating with nature walks. The forest or mountain environment provides co-regulation — the nervous system calibrates to the calm of the landscape.',
      'The focus shifts to neurological rewiring. Guided practices designed to interrupt the anxiety loop and build new response pathways. Body awareness work addresses the physical holding patterns that anxiety creates.',
      'The final day builds a toolkit for home. Which practices worked best for you? How to recognise escalation early and intervene before the spiral. Practical, specific, personalised. Departure after lunch.',
    ],
    arrivalSchedule: [
      'Afternoon — Arrival at your own pace',
      '5:00 PM — Welcome tea and introductions',
      '6:00 PM — Grounding breathwork (30 min)',
      '7:00 PM — Dinner',
    ],
    departureSchedule: [
      '7:30 AM — Morning grounding practice',
      '8:30 AM — Breakfast',
      '9:30 AM — Personal toolkit session',
      '10:30 AM — Closing circle',
      '11:00 AM — Departure',
    ],
  },

  'digital-detox-retreat': {
    urlPrefix: 'digital-detox-retreat',
    duration: 5,
    themes: [
      'Arrival & Device Surrender',
      'The First Day Without Screens',
      'Rediscovering Analog Attention',
      'Boredom Becomes Creativity',
      'Re-entry Planning & Departure',
    ],
    descriptions: [
      'You arrive in {location} and hand over your phone, laptop, and any other screens. This is the hardest moment — the phantom buzz, the reflexive reach. Evening orientation includes a journalling session with actual pen and paper.',
      'Your first full day offline. The morning is structured: meditation, breakfast, an analog activity. By afternoon, the restlessness peaks. Most people report checking an imaginary pocket repeatedly. Walk in {location} instead. Let the discomfort be information.',
      'Something shifts on day three. Attention span lengthens. Conversations deepen. You notice details in the landscape of {location} that screens would have prevented you from seeing. Morning creative practice and nature exploration.',
      'The boredom that terrified you on day one becomes a doorway. Without digital stimulation, the mind generates its own content: ideas, memories, creative impulses. Afternoon is fully unstructured — trust yourself to fill it.',
      'The final day addresses re-entry. How to reintroduce technology without losing what you gained. Practical boundaries: notification settings, usage patterns, phone-free zones. Devices returned after the closing session.',
    ],
    arrivalSchedule: [
      'Afternoon — Arrival and settling',
      '4:00 PM — Welcome tea',
      '5:00 PM — Device surrender ceremony',
      '5:30 PM — Orientation and ground rules',
      '6:30 PM — Journalling session (pen and paper)',
      '7:30 PM — Dinner',
    ],
    departureSchedule: [
      '6:30 AM — Wake with natural light',
      '7:00 AM — Morning walk',
      '8:00 AM — Breakfast',
      '9:00 AM — Digital re-entry planning session',
      '10:30 AM — Devices returned',
      '11:00 AM — Departure',
    ],
  },

  'healing-retreat-himalayas': {
    urlPrefix: 'healing-retreat',
    duration: 7,
    themes: [
      'Arrival & Being Held',
      'Beginning to Soften',
      'The Body Remembers',
      'Going Deeper',
      'The Release',
      'Integration & Wholeness',
      'Gentle Departure',
    ],
    descriptions: [
      'You arrive in {location} carrying whatever brought you here — grief, exhaustion, a life transition, or something you cannot yet name. The evening begins with gentle breathwork. No one asks you to explain.',
      'The first full day is soft. Morning healing meditation, body therapy or forest bathing, extended rest. The container of {location} holds you while the layers of protection begin to thin.',
      'The body stores what happened. Day three introduces somatic work — guided body awareness practice that helps you locate and release held tension. This can be emotional. The practitioners and the environment both support you.',
      'Healing deepens when you stop trying to heal and instead allow what needs to move through you. Extended meditation, sound healing, and sustained rest. The schedule is loose by design — the body heals on its own timetable.',
      'For many, day five carries a release — tears, laughter, a deep exhale that has been held for months or years. The practices have created conditions for this. {location} holds the space.',
      'Practice shifts toward integration. How do you carry this new openness back into your life? Gentle movement, journalling, and group sharing (optional). The fragments begin to reassemble into something more whole.',
      'A final morning meditation and closing circle. Guidance on continuing the healing process at home. Departure is gentle — no rush. The week has loosened something, and you will need time to understand what.',
    ],
    arrivalSchedule: [
      'Afternoon — Arrival and room allocation',
      '5:00 PM — Welcome tea',
      '6:00 PM — Gentle breathwork (30 min)',
      '7:00 PM — Dinner',
      '8:30 PM — Rest',
    ],
    departureSchedule: [
      '7:00 AM — Final gentle breathwork',
      '8:00 AM — Breakfast',
      '9:30 AM — Closing circle',
      '10:30 AM — Farewell tea',
      '11:30 AM — Departure',
    ],
  },

  'creative-retreat': {
    urlPrefix: 'art-retreat',
    duration: 7,
    themes: [
      'Arrival & First Marks',
      'Loosening the Grip',
      'Seeing Without Judging',
      'The Creative Deepening',
      'Nature as Medium',
      'Integration & Expression',
      'Closing Gallery & Departure',
    ],
    descriptions: [
      'You arrive in {location} and settle into your room. The evening begins with a simple creative exercise — blind contour drawing, or painting with your non-dominant hand. The point is not quality. The point is starting before the inner critic wakes up.',
      'Your first full day of facilitated creation. Morning session introduces your chosen medium — watercolour, ink, clay, collage, or mixed media. The emphasis is on process, not product. Afternoon nature walk with a sketchbook. {location} becomes your subject.',
      'The inner critic will have appeared by now. Today addresses it directly. Morning exercises designed to bypass perfectionism — timed drawings, collaborative pieces, working with limitations. Afternoon free creation time. Let the work be what it wants to be.',
      'Practice deepens. The morning session explores emotional expression through art — what cannot be said in words sometimes finds form in colour, shape, texture. Extended studio time in the afternoon. {location} provides both inspiration and quiet.',
      'Creation moves outdoors. Plein air painting, land art, natural material sculpture, or nature journalling in {location}. The landscape is not just backdrop but collaborator. Afternoon open studio with facilitator support.',
      'The focus shifts from creating to understanding what you have created. Morning reflection on the week\'s work. What emerged? What surprised you? Afternoon session on maintaining a creative practice at home — how to protect creative time and keep the inner critic quiet.',
      'A final morning session — create one piece that captures what the week held for you. Optional gallery walk where participants share their work. No critiques, only witnessing. Closing circle after lunch. Departure with everything you made.',
    ],
    arrivalSchedule: [
      'Afternoon — Arrival and room allocation',
      '4:30 PM — Welcome tea',
      '5:30 PM — Introduction and creative warm-up exercise',
      '7:00 PM — Dinner',
      '8:00 PM — Free time — explore the materials',
    ],
    departureSchedule: [
      '7:00 AM — Morning yoga or gentle movement',
      '8:00 AM — Breakfast',
      '9:00 AM — Final creative piece',
      '10:30 AM — Optional gallery walk',
      '11:30 AM — Closing circle',
      '12:00 PM — Lunch and departure',
    ],
  },
};

// ── FAQ Generator ────────────────────────────────────────────────────────

function generateItineraryFAQs(
  label: string,
  locationName: string,
  duration: number,
): FAQItem[] {
  const lLabel = label.toLowerCase();
  return [
    {
      question: `What does a typical day look like during a ${duration}-day ${lLabel} in ${locationName}?`,
      answer: `Each day follows a structured rhythm: morning practice, meals, afternoon sessions, evening meditation or relaxation. Days two through ${duration - 1} follow the full schedule. The first day is lighter (arrival afternoon, evening session only) and the last day ends at midday. The structure creates a container — you do not have to decide what to do next. That is part of the healing.`,
    },
    {
      question: `How physically demanding is the ${duration}-day itinerary?`,
      answer: `Not demanding at all. The schedule includes rest periods every day. Walking is gentle — forest paths or grounds walks, not trekking. If you are recovering from illness, exhaustion, or simply need to rest, the itinerary accommodates that. Nothing is forced. The daily structure is a framework, not a military schedule.`,
    },
    {
      question: `Can the ${duration}-day itinerary be customised?`,
      answer: `Yes, within the overall framework. The core structure — morning practice, meals, evening sessions — stays consistent because it creates the container. But specific activities, rest periods, and intensity levels can be adjusted based on your needs. Contact us before arrival to discuss adjustments, or talk with the facilitator on day one.`,
    },
    {
      question: `What should I bring for a ${duration}-day retreat in ${locationName}?`,
      answer: `Comfortable, loose clothing for practice. Warm layers (mountain temperatures drop in the evening even in summer). A journal and pen. Any personal medication. We provide bedding, meditation cushions, and meals. Leave work materials, heavy reading, and expectations at home. A headlamp or torch is useful for early morning walks.`,
    },
  ];
}

// ── Page Generator ───────────────────────────────────────────────────────

function generateItineraryPages(): ItineraryPage[] {
  const pages: ItineraryPage[] = [];

  for (const elPage of EXPERIENCE_LOCATION_PAGES) {
    const arc = ARCS[elPage.experienceSlug];
    if (!arc) continue;

    const days: ItineraryDay[] = [];
    for (let i = 0; i < arc.duration; i++) {
      const isFirst = i === 0;
      const isLast = i === arc.duration - 1;

      days.push({
        day: i + 1,
        theme: arc.themes[i],
        description: arc.descriptions[i].replace(/\{location\}/g, elPage.locationName),
        schedule: isFirst
          ? arc.arrivalSchedule
          : isLast
            ? arc.departureSchedule
            : elPage.sampleSchedule,
      });
    }

    const slug = `${arc.duration}-day-${elPage.locationId}-${arc.urlPrefix}-itinerary`;
    const durationLabel = `${arc.duration}-Day`;

    pages.push({
      slug,
      parentSlug: elPage.slug,
      durationDays: arc.duration,
      experienceSlug: elPage.experienceSlug,
      locationId: elPage.locationId,
      label: elPage.label,
      locationName: elPage.locationName,
      title: `${durationLabel} ${elPage.label} Itinerary — ${elPage.locationName} | Retreats And Treks`,
      h1: `${durationLabel} ${elPage.label} Itinerary in ${elPage.locationName}`,
      metaDescription: `Day-by-day itinerary for a ${arc.duration}-day ${elPage.label.toLowerCase()} in ${elPage.locationName}. Full schedule, daily themes, what to expect each day. Plan your Himalayan retreat.`,
      intro: `What actually happens during a ${arc.duration}-day ${elPage.label.toLowerCase()} in ${elPage.locationName}? Below is the day-by-day itinerary — not a marketing brochure, but the actual rhythm of the retreat. Times are approximate; the schedule serves the practice, not the other way around.`,
      days,
      faqItems: generateItineraryFAQs(elPage.label, elPage.locationName, arc.duration),
      parentHubSlug: elPage.parentHubSlug,
      relatedDurationSlugs: elPage.relatedDurationSlugs,
    });
  }

  return pages;
}

// ── Exports ──────────────────────────────────────────────────────────────

export const ITINERARY_PAGES: readonly ItineraryPage[] = generateItineraryPages();

export function getItineraryPage(slug: string): ItineraryPage | undefined {
  return ITINERARY_PAGES.find((p) => p.slug === slug);
}

export function getAllItinerarySlugs(): string[] {
  return ITINERARY_PAGES.map((p) => p.slug);
}
