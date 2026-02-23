/**
 * MUSSOORIE LOCATION PREMIUM CONTENT
 * Editorial, intention-based content for /retreats/mussoorie
 * This explains WHY this place, not WHAT we offer
 */

export const mussoorieLocation = {
  id: 'mussoorie',
  name: 'Mussoorie',

  // Section 1: The Land Sets the Tone
  landTone: {
    opening:
      'Mussoorie is chosen for accessibility wrapped in beauty. Two thousand meters above the plains, in rolling cloud-covered hills dotted with pines and deodar trees, this is where serious rest arrives without heroics.' +
      ' The mountains here are soft. The air is clear. The silence is real without being extreme. This is retreat for people who need permission to truly soften.',
  },

  // Section 2B: Bridging Inner Work & Movement
  bridgingInnerWorkMovement: {
    title: 'Why Both Meditative Retreat & Forest Walks Work Here',
    description:
      'Mussoorie supports contemplation and movement equally. The soft landscape invites walking without demanding strength. The altitude calms without stressing. You can spend mornings in silent practice and afternoons on forest trails, transitioning smoothly between stillness and gentle motion. Many find that this combination works better than stillness alone.',
  },

  // Section 3: Why Inner Work Deepens Here
  retreatLogic: {
    title: 'Why Inner Work Deepens Here',
    factors: [
      {
        title: 'Gentle Altitude Reset',
        description:
          'Two thousand meters is the sweet spot—altitude enough to calm the mind, low enough that the body rests easily. No struggle. Just shift.',
      },
      {
        title: 'Romantic Landscape',
        description:
          'Mist, clouds, pine forests, vast valley views. The beauty here is soft and intimate, not dramatic. This landscape draws people into themselves rather than toward sensation.',
      },
      {
        title: 'Accessibility Paradox',
        description:
          'Close to cities, yet genuinely removed. Good roads, comfortable lodging, reliable infrastructure. This means people arrive rested enough to actually benefit from retreat—not exhausted from getting there.',
      },
      {
        title: 'Seasonal Personality',
        description:
          'Mussoorie shifts dramatically with seasons—spring awakening, summer refuge from heat, autumn clarity, winter quietude. Each season offers a different medicine.',
      },
    ],
  },

  // Section 3: Retreat Intentions That Naturally Fit
  intentionsFit: {
    title: 'Why People Come to Mussoorie',
    description: 'People typically seek Mussoorie for:',
    intentions: [
      {
        title: 'Gentleness & Renewal',
        description:
          'For those who do not need extreme conditions to change. The softness here is its strength. Rest arrives more easily.',
      },
      {
        title: 'Creative Retreat & Clarity',
        description:
          'The romantic beauty is inspiring without being distracting. Writers, artists, and people seeking fresh perspective find their voice here.',
      },
      {
        title: 'Couples & Relational Retreat',
        description:
          'The landscape invites two people into shared quiet and beauty. Mussoorie naturally facilitates connection and vulnerability.',
      },
      {
        title: 'First Retreat Retreat',
        description:
          'For people trying stillness for the first time. Accessible terrain, good lodging, and soft psychology make this an excellent threshold location.',
      },
    ],
  },

  // Section 5: Practical Context
  practicalContext: {
    title: 'Essential Information',
    bestSeasons: 'September–November (ideal) and March–May (warm and clear). June–August possible but crowded with tourists seeking coolness.',
    accessibility: 'Most accessible of our locations. 6 hours from Delhi by road. Full amenities in the town (if needed), but retreat spaces are set apart. Roads can be narrow and winding.',
    crowdProfile: 'Mussoorie attracts town visitors and tourists, especially in monsoon. While retreat locations are quiet, the overall landscape is more inhabited than Chakrata or Sankri.',
    notFor: 'If you seek total isolation or no tourist presence, choose Chakrata or Sankri instead. If you need extreme ruggedness, this gentle landscape may feel insufficient.',
  },

  // Section 6: Seasonal & Environmental Character
  seasonalCharacter: {
    title: 'Timing & the Hill Station Rhythm',
    seasons: [
      {
        month: 'March – May',
        mood: 'Awakening',
        description:
          'Spring flowers bloom. Days are warm and clear. The valley explodes with life and color. Excellent for renewal, beginnings, and people seeking gentle upward energy.',
      },
      {
        month: 'June – August',
        mood: 'Refuge',
        description:
          'Monsoon clouds play around the ridges. Temperature is 8–10 degrees cooler than plains. This is peak season for city dwellers escaping heat. Lush, misty, inward feeling.',
      },
      {
        month: 'September – November',
        mood: 'Clarity',
        description:
          'Post-monsoon skies are crystalline. Days are crisp, nights cool. Wildflowers dot the meadows. This is ideal season for contemplative retreat and emotional work.',
      },
      {
        month: 'December – February',
        mood: 'Stillness',
        description:
          'Winter brings frost and occasional snow. Days are quiet. Tourist season ends. Mussoorie becomes genuinely remote and introspective despite its accessibility.',
      },
    ],
  },

  // Section 7: Network Context
  networkContext:
    'Mussoorie is one of five Himalayan locations we work with — each chosen for different kinds of inner work. We return to Mussoorie for people seeking accessible rest, romantic beauty, and the particular medicine of gentle altitude and soft landscape.' +
    ' If you are seeking higher peaks, remote wilderness, or extreme conditions, Sankri or Munsiyari may be the location your retreat reaches for instead.' +
    ' If you are seeking cultural spirituality and yoga traditions, Rishikesh offers a different gateway.',

  // Section 8: CTA
  ctaText:
    'If this description resonates — if you recognize yourself in one of these intentions, or want to explore whether Mussoorie is the right place to soften and be quiet — reach out. We will help you decide whether this gentle landscape is what you are seeking.',

  // Data Associations
  retreatSlugs: [
    'rest-and-reset',
    'creative-arts-retreat',
    'yoga-and-movement',
    'weekend-retreat',
  ],
  trekSlugs: [],
  relatedBlogSlugs: [
    'chakrata-vs-mussoorie-weekend-trip',
  ],

  // Placeholder sections (to be populated)
  placesAndLandscapes: [],
  softExperiences: [],
} as const;
