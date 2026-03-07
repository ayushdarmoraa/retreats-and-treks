/**
 * DURATION PAGES REGISTRY
 * Program-duration × retreat-type pages targeting searches like
 * "7 day meditation retreat", "weekend retreat Himalayas", "10 day silent retreat"
 */

import type { LocationId } from '@/config/locations';

export interface DurationLocationAngle {
  readonly locationId: LocationId;
  readonly heading: string;
  readonly description: string;
}

export interface DurationPage {
  readonly slug: string;
  readonly title: string;
  readonly h1: string;
  readonly metaDescription: string;
  readonly intro: string;
  readonly durationLabel: string;
  /** What this duration is ideal for */
  readonly idealFor: readonly string[];
  /** What a typical day looks like */
  readonly typicalDay: readonly string[];
  /** Location-specific angles — each becomes a card */
  readonly locationAngles: readonly DurationLocationAngle[];
  /** Related experience page slugs for cross-linking */
  readonly relatedExperienceSlugs: readonly string[];
  /** Closing narrative */
  readonly closingNarrative: string;
}

export const DURATION_PAGES: readonly DurationPage[] = [
  // ── 1. 3-Day Meditation Retreat ───────────────────────────────────────────
  {
    slug: '3-day-meditation-retreat',
    title: '3-Day Meditation Retreat in the Himalayas | Retreats And Treks',
    h1: '3-Day Meditation Retreat in the Himalayas',
    metaDescription:
      'A 3-day Himalayan meditation retreat — enough time for your nervous system to settle and genuine depth to begin. Chakrata forest, small groups, guided practice. No experience required.',
    intro:
      'Three days is the minimum commitment for genuine meditation depth. Day one is transition — your mind adjusts to the absence of input. Day two is settling — the internal noise begins to subside. Day three is opening — something quieter emerges beneath the habitual loops. A three-day meditation retreat in the Himalayas is not a taster. It is a complete experience that produces measurable change: reduced cortisol, restored attention, and the beginning of a relationship with your own silence.',
    durationLabel: '3 Days / 2 Nights',
    idealFor: [
      'First-time meditation retreat participants',
      'Professionals with limited time who need genuine reset',
      'People testing whether extended meditation is right for them',
      'Weekend seekers within driving distance of Dehradun',
    ],
    typicalDay: [
      '6:00 AM — Morning tea, gentle stretching',
      '6:30 – 8:00 — Guided meditation session',
      '8:00 – 9:00 — Breakfast in silence',
      '9:00 – 11:00 — Walking meditation in forest / free practice',
      '11:00 – 12:30 — Midday teaching and sitting',
      '12:30 – 2:00 — Lunch and rest',
      '2:00 – 4:00 — Personal practice, journalling, or nature walks',
      '4:00 – 5:30 — Afternoon session',
      '6:00 – 7:00 — Dinner',
      '7:30 – 8:30 — Evening meditation',
    ],
    locationAngles: [
      {
        locationId: 'chakrata',
        heading: 'Chakrata — The Ideal 3-Day Setting',
        description:
          'Two and a half hours from Dehradun. Dense deodar forest at 2,000 metres. No tourist noise. The acoustic environment supports meditation from hour one. For a 3-day retreat, Chakrata is perfect — accessible enough for a weekend commitment, remote enough for genuine depth.',
      },
      {
        locationId: 'rishikesh',
        heading: 'Rishikesh — Tradition in Three Days',
        description:
          'For those who want their short retreat immersed in yogic tradition. The Ganges, the ashrams, the living spiritual heritage — all accessible within a 3-day window. Rishikesh adds cultural depth to the time-limited retreat.',
      },
    ],
    relatedExperienceSlugs: ['meditation-retreats', 'silent-retreats'],
    closingNarrative:
      'Three days will not make you a monk. But they will show you what your mind does when you stop feeding it noise — and that discovery changes everything that follows. If you have never done a meditation retreat, this is where to start.',
  },

  // ── 2. 7-Day Meditation Retreat ───────────────────────────────────────────
  {
    slug: '7-day-meditation-retreat',
    title: '7-Day Meditation Retreat in the Himalayas | Retreats And Treks',
    h1: '7-Day Meditation Retreat in the Himalayas',
    metaDescription:
      'A 7-day Himalayan meditation retreat — deep immersion in forest or mountain silence. Guided practice, noble silence, small groups. Where real transformation begins.',
    intro:
      'Seven days is where meditation retreats move from experience to transformation. The first three days follow the same arc as a short retreat — adjustment, settling, opening. But days four through seven take you somewhere new. The mind, having exhausted its habitual loops, begins to access a quality of stillness that most people have never encountered. Insights arise not through thinking but through a kind of direct knowing. The Himalayas amplify this process — altitude slows the mind, forest absorbs distraction, and the accumulated silence of the mountains becomes your meditation partner.',
    durationLabel: '7 Days / 6 Nights',
    idealFor: [
      'People ready for genuine meditation depth',
      'Practitioners with some experience seeking sustained immersion',
      'Those who tried a short retreat and want to go deeper',
      'Anyone carrying chronic stress, burnout, or decision fatigue',
    ],
    typicalDay: [
      '5:30 AM — Wake, personal practice',
      '6:00 – 7:30 — Morning meditation (sitting and walking)',
      '7:30 – 8:30 — Breakfast in noble silence',
      '9:00 – 11:00 — Teaching session and guided practice',
      '11:00 – 12:30 — Forest walking or nature immersion',
      '12:30 – 2:00 — Lunch and deep rest',
      '2:00 – 4:00 — Afternoon sitting and personal practice',
      '4:00 – 5:00 — Tea, journalling, or still time',
      '5:00 – 6:30 — Evening meditation',
      '7:00 — Light dinner, then silence until morning',
    ],
    locationAngles: [
      {
        locationId: 'chakrata',
        heading: 'Chakrata — Forest Immersion for a Week',
        description:
          'Seven days in Chakrata\'s deodar forest creates a complete container. By day three, the forest feels like home. By day five, the silence is not a practice — it is the default state. The gentle altitude (2,000m) supports sustained practice without physical strain.',
      },
      {
        locationId: 'zanskar',
        heading: 'Zanskar — Seven Days of Monastery Depth',
        description:
          'The minimum recommended duration for Zanskar. Seven days allows acclimatisation to 3,500 metres, absorption of the monastic environment, and genuine encounter with geological silence. Near Stongdey Monastery, where meditation practice has continued for over 800 years.',
      },
      {
        locationId: 'munsiyari',
        heading: 'Munsiyari — A Week of Alpine Clarity',
        description:
          'Seven days facing the Panchachuli range. The spaciousness of high-altitude meadows, the clarity of mountain air, and the visual vastness of five 6,000-metre peaks create an environment where the mind naturally expands. Moderate altitude, profound openness.',
      },
    ],
    relatedExperienceSlugs: ['meditation-retreats', 'silent-retreats', 'burnout-recovery-retreats'],
    closingNarrative:
      'A seven-day meditation retreat is a serious commitment — to yourself, to your practice, to the possibility that you might emerge different from who went in. The Himalayas have been holding this kind of commitment for millennia. We will help you choose the right mountain.',
  },

  // ── 3. 10-Day Silent Retreat ──────────────────────────────────────────────
  {
    slug: '10-day-silent-retreat',
    title: '10-Day Silent Retreat in the Himalayas | Retreats And Treks',
    h1: '10-Day Silent Retreat in the Himalayas',
    metaDescription:
      'A 10-day Himalayan silent retreat — extended noble silence in Zanskar or Chakrata. Guided meditation, somatic practice, and the deep stillness that only sustained silence creates.',
    intro:
      'Ten days of silence changes you. Not metaphorically — physiologically. Your nervous system recalibrates. Your sensory awareness sharpens to a degree you did not know was possible. Emotional material that has been stored for years surfaces and processes. The quality of your attention transforms. A ten-day silent retreat is the gold standard of contemplative practice — long enough for genuine depth, structured enough to hold you through the difficult passages, and set in Himalayan environments where the silence of the land matches the silence you are cultivating.',
    durationLabel: '10 Days / 9 Nights',
    idealFor: [
      'Experienced meditators seeking sustained depth',
      'People who completed shorter retreats and need more',
      'Those carrying deep emotional material that needs space to process',
      'Practitioners interested in the Vipassana-length format in a mountain setting',
    ],
    typicalDay: [
      '5:00 AM — Wake in silence',
      '5:30 – 7:00 — Morning sitting meditation',
      '7:00 – 8:00 — Breakfast in noble silence',
      '8:30 – 10:00 — Walking meditation',
      '10:00 – 11:30 — Teaching and guided practice',
      '11:30 – 1:00 — Lunch and deep rest',
      '1:00 – 2:30 — Personal practice or nature immersion',
      '2:30 – 4:00 — Afternoon sitting',
      '4:00 – 5:00 — Tea, gentle stretching',
      '5:00 – 6:30 — Evening meditation',
      '6:30 — Light meal, then silence until morning',
    ],
    locationAngles: [
      {
        locationId: 'zanskar',
        heading: 'Zanskar — Ten Days in Geological Silence',
        description:
          'The definitive setting for a 10-day silent retreat. Zanskar\'s remoteness (230 km from Leh), altitude (3,500m), and monastic heritage create conditions where ten days of silence feels natural rather than forced. Near Stongdey Monastery and Phugtal Gompa — places where silence has accumulated for a thousand years.',
      },
      {
        locationId: 'chakrata',
        heading: 'Chakrata — Ten Days in Forest Quiet',
        description:
          'For those who want extended silence in a nurturing environment. Chakrata\'s forests create acoustic enclosure — the silence wraps around you rather than exposing you. Over ten days, this contained quiet builds a depth of inner stillness that more extreme environments achieve through confrontation.',
      },
    ],
    relatedExperienceSlugs: ['silent-retreats', 'meditation-retreats', 'spiritual-retreats'],
    closingNarrative:
      'Ten days of silence is not for everyone — and it is not meant to be. It is for people who sense that something important lives beneath the noise of daily life and are willing to sit with it until it reveals itself. The Himalayas have been holding this space for seekers since before recorded history. If you are ready, reach out.',
  },

  // ── 4. Weekend Retreat Himalayas ─────────────────────────────────────────
  {
    slug: 'weekend-retreat-himalayas',
    title: 'Weekend Retreat in the Himalayas — Friday to Sunday | Retreats And Treks',
    h1: 'Weekend Retreat in the Himalayas',
    metaDescription:
      'A weekend Himalayan retreat — Friday evening to Sunday afternoon. Forest immersion, meditation, genuine rest in Chakrata. 2.5 hours from Dehradun. No leave from work required.',
    intro:
      'Not everyone can take a week off. But everyone can take a weekend. A Himalayan weekend retreat packs genuine reset into 48 hours — arrive Friday evening, leave Sunday afternoon. The key is location: close enough to reach after work, remote enough that you feel genuinely separated from it. Chakrata is 60 km from Dehradun, through mountain roads that climb into dense deodar forest. By the time you arrive, the city is already a memory. By Sunday, your nervous system has genuinely shifted.',
    durationLabel: 'Friday Eve – Sunday Afternoon',
    idealFor: [
      'Working professionals who cannot take extended leave',
      'People new to retreats wanting a low-commitment first experience',
      'Regular retreat-goers who need frequent short resets',
      'Delhi/NCR residents within weekend driving distance of Dehradun',
    ],
    typicalDay: [
      'Friday 7 PM — Arrive, settle in, orientation, evening meditation',
      'Saturday 6 AM — Full retreat day: morning meditation, forest walk, teaching, afternoon practice, evening session',
      'Sunday 6 AM — Morning meditation, forest walk, closing circle, brunch, depart by 2 PM',
    ],
    locationAngles: [
      {
        locationId: 'chakrata',
        heading: 'Chakrata — The Weekend Retreat Sweet Spot',
        description:
          'The only location in our network optimised for weekend retreats. Two and a half hours from Dehradun (60 km). Accessible by car on Friday evening, yet once you arrive, the dense forest and 2,000-metre altitude create complete separation. No phone-checking temptation — there is barely signal in the forest.',
      },
      {
        locationId: 'rishikesh',
        heading: 'Rishikesh — Weekend with Tradition',
        description:
          'For those who want their weekend retreat immersed in yogic heritage. Accessible from Dehradun or Delhi (5–6 hours). A weekend in Rishikesh combines ashram atmosphere, Ganges energy, and guided practice — condensed but genuine.',
      },
    ],
    relatedExperienceSlugs: ['meditation-retreats', 'stress-relief-retreats', 'digital-detox-retreat'],
    closingNarrative:
      'A weekend in the Himalayas is not a holiday — it is a recalibration tool. Used regularly (monthly or quarterly), weekend retreats become the rhythm that sustains your capacity through high-demand professional life. Your nervous system learns the transition. Reach out and we will schedule your first one.',
  },

  // ── 5. 5-Day Yoga Retreat ─────────────────────────────────────────────────
  {
    slug: '5-day-yoga-retreat',
    title: '5-Day Yoga Retreat in the Himalayas | Retreats And Treks',
    h1: '5-Day Yoga Retreat in the Himalayas',
    metaDescription:
      'A 5-day Himalayan yoga retreat — daily asana, pranayama, and meditation at altitude. Rishikesh, Zanskar, Sankri. Small groups, experienced teachers, mountain practice.',
    intro:
      'Five days is the ideal duration for a yoga retreat. One day to arrive and adjust. Three full days of twice-daily practice — morning and evening. One day to integrate and depart. In the Himalayas, every element of practice is amplified: pranayama changes at altitude because each breath is more conscious. Asana on a mountain morning, with clean cold air and sunrise on snow peaks, is not the same practice as in a city studio. Five days allows your body to adapt to the altitude and your practice to adapt to the environment. The result is a shift in how you relate to your body and your breath that persists long after you return home.',
    durationLabel: '5 Days / 4 Nights',
    idealFor: [
      'Yoga practitioners of all levels seeking mountain immersion',
      'People combining physical practice with mental reset',
      'Those who want a structured midweek programme',
      'Practitioners exploring the connection between breath, altitude, and awareness',
    ],
    typicalDay: [
      '6:00 AM — Morning pranayama (30 min)',
      '6:30 – 8:00 — Asana practice (Hatha/Vinyasa, adapted to altitude)',
      '8:00 – 9:00 — Breakfast',
      '9:30 – 11:00 — Teaching session or nature walk',
      '11:00 – 12:30 — Free time / personal practice',
      '12:30 – 2:00 — Lunch and rest',
      '3:00 – 4:30 — Restorative yoga or Yin',
      '5:00 – 6:00 — Evening meditation',
      '6:30 — Dinner, evening free',
    ],
    locationAngles: [
      {
        locationId: 'rishikesh',
        heading: 'Rishikesh — Five Days in the Yoga Capital',
        description:
          'The spiritual home of yoga in India. Five days here immerses you in the tradition — practice by the Ganges, teaching from lineage-trained instructors, the accumulated energy of generations of practitioners. The most culturally rich option for a yoga retreat.',
      },
      {
        locationId: 'sankri',
        heading: 'Sankri — Mountain Yoga at Altitude',
        description:
          'Yoga at a trekking basecamp surrounded by peaks and forest. Five days here combines asana with hiking, altitude breathing, and mountain movement. For practitioners who want their yoga physically grounded and connected to landscape.',
      },
      {
        locationId: 'zanskar',
        heading: 'Zanskar — Yoga at the Edge of the World',
        description:
          'Yoga at 3,500 metres where every pose demands full presence. The altitude makes breathwork non-negotiable — each inhale is conscious. Five days in Zanskar transforms yoga from a physical practice into a practice of attention. For experienced yogis seeking depth.',
      },
    ],
    relatedExperienceSlugs: ['yoga-retreats', 'meditation-retreats'],
    closingNarrative:
      'Five days of yoga in the Himalayas will not make you more flexible. It will make you more present — to your body, your breath, and the mountain environment that has been teaching practitioners for millennia. Reach out with your experience level and preferred dates.',
  },

  // ── 6. 3-Day Silent Retreat ───────────────────────────────────────────────
  {
    slug: '3-day-silent-retreat',
    title: '3-Day Silent Retreat — First Experience of Silence | Retreats And Treks',
    h1: '3-Day Silent Retreat in the Himalayas',
    metaDescription:
      'A 3-day silent retreat for first-timers — guided noble silence in Himalayan forest. Chakrata, 2.5 hours from Dehradun. No meditation experience required. Discover what silence can do.',
    intro:
      'Three days of silence is the entry point. Long enough that your nervous system genuinely settles. Short enough that the commitment feels manageable. A three-day silent retreat is how most people discover that silence is not empty — it is full of something your daily life has been drowning out. In Chakrata\'s deodar forest, the silence is not imposed by rules alone. It is supported by the environment — the forest absorbs sound, the altitude slows thought, and the absence of stimulation makes quiet the natural state.',
    durationLabel: '3 Days / 2 Nights',
    idealFor: [
      'Complete beginners to silent practice',
      'People curious about silence but uncertain about long commitments',
      'Weekend availability — Friday evening to Sunday',
      'Those who found 10-day formats intimidating but want genuine depth',
    ],
    typicalDay: [
      '6:00 AM — Tea, gentle awakening',
      '6:30 – 8:00 — Guided meditation with silent sitting periods',
      '8:00 – 9:00 — Breakfast in noble silence',
      '9:30 – 11:00 — Forest walking meditation',
      '11:00 – 12:30 — Teaching session — working with thoughts in silence',
      '12:30 – 2:00 — Lunch and rest',
      '2:30 – 4:00 — Personal practice or guided nature immersion',
      '4:30 – 5:30 — Afternoon sitting',
      '6:00 – 7:00 — Dinner in silence',
      '7:30 – 8:15 — Evening meditation, then sleep',
    ],
    locationAngles: [
      {
        locationId: 'chakrata',
        heading: 'Chakrata — The Gentlest Silence',
        description:
          'Chakrata is specifically designed as the entry point for silent retreats. Dense forest, no tourist noise, 2,000-metre altitude. The environment does most of the work — you do not need to fight for silence here. You just stop talking and let the forest hold you. Three days in this container is enough to change how you hear the world.',
      },
      {
        locationId: 'munsiyari',
        heading: 'Munsiyari — Silent Weekend in the Alps',
        description:
          'For those who find enclosed silence claustrophobic, Munsiyari offers three days of open-sky quiet. High meadows, Panchachuli views, enormous space. The silence here is expansive rather than enclosed. A different quality of first experience.',
      },
    ],
    relatedExperienceSlugs: ['silent-retreats', 'meditation-retreats', 'stress-relief-retreats'],
    closingNarrative:
      'You do not need experience to do a silent retreat. You need willingness — to stop talking, to sit with discomfort, and to discover what lives beneath the noise. Three days is enough. The forest will do the rest.',
  },

  // ── 7. 7-Day Healing Retreat ──────────────────────────────────────────────
  {
    slug: '7-day-healing-retreat',
    title: '7-Day Healing Retreat in the Himalayas | Retreats And Treks',
    h1: '7-Day Healing Retreat in the Himalayas',
    metaDescription:
      'A 7-day Himalayan healing retreat — forest bathing, somatic work, breathwork, and silence. Chakrata, Zanskar, Rishikesh. Space for grief, transition, and emotional restoration.',
    intro:
      'Healing takes time. Not weeks or months necessarily, but more than a weekend. Seven days creates the minimum container for genuine healing work: three days for the armour to soften, two days for what lies beneath to surface, and two days to begin integrating what emerged. In a Himalayan healing retreat, the environment is the primary therapist — the forest regulates the nervous system, the altitude quiets the mind, the silence gives permission for whatever needs to surface. Seven days of this is not a luxury. For those carrying grief, exhaustion, or the residue of difficult transitions, it is a necessity.',
    durationLabel: '7 Days / 6 Nights',
    idealFor: [
      'People processing grief, loss, or life transitions',
      'Those recovering from burnout at deep physiological level',
      'Anyone carrying emotional weight that shorter interventions have not addressed',
      'People who need permission to stop and feel what they have been avoiding',
    ],
    typicalDay: [
      '6:30 AM — Gentle wake, breathwork',
      '7:00 – 8:00 — Morning somatic practice or gentle yoga',
      '8:00 – 9:00 — Breakfast',
      '9:30 – 11:00 — Forest bathing / nature immersion',
      '11:00 – 12:30 — Guided healing session (breathwork, body awareness, or meditation)',
      '12:30 – 2:00 — Lunch and deep rest',
      '2:00 – 4:00 — Personal time — journalling, walking, or stillness',
      '4:00 – 5:30 — Afternoon session (restorative, sound healing, or guided meditation)',
      '6:00 – 7:00 — Dinner',
      '7:30 — Evening meditation or free time',
    ],
    locationAngles: [
      {
        locationId: 'chakrata',
        heading: 'Chakrata — Nurturing Healing in Forest',
        description:
          'Seven days in Chakrata\'s forests creates a holding environment for emotional work. The forest is non-judgmental, constantly present, and gently regulating. The phytoncides from deodar trees have measurable effects on cortisol and immune function. For grief and burnout, this is the most nurturing option.',
      },
      {
        locationId: 'zanskar',
        heading: 'Zanskar — Deep Healing at Altitude',
        description:
          'For healing that requires radical separation from the familiar. Seven days at 3,500 metres, 230 km from the nearest city, near ancient monasteries. The environment strips away pretence and gives whatever you carry no place to hide. Confrontational but thorough.',
      },
      {
        locationId: 'rishikesh',
        heading: 'Rishikesh — Healing in Tradition',
        description:
          'Seven days drawing on yoga, Ayurveda, and the accumulated spiritual energy of India\'s sacred geography. The Ganges, the ashrams, and the lineage of healing practice create a container that is both traditional and deeply effective.',
      },
    ],
    relatedExperienceSlugs: ['healing-retreat-himalayas', 'burnout-recovery-retreats', 'stress-relief-retreats'],
    closingNarrative:
      'Healing is not a product you can schedule or optimise. It is a process that needs the right conditions — safety, time, and an environment patient enough to wait. Seven days in the Himalayas provides all three. If you are carrying something that needs tending, reach out. We will find the right place for your healing.',
  },
] as const;

export function getDurationPage(slug: string): DurationPage | undefined {
  return DURATION_PAGES.find((p) => p.slug === slug);
}

export function getAllDurationPageSlugs(): string[] {
  return DURATION_PAGES.map((p) => p.slug);
}
