/**
 * MUNSIYARI LOCATION PREMIUM CONTENT
 * Editorial, intention-based content for /retreats/munsiyari
 * This explains WHY this place, not WHAT we offer
 */

export const munsiyariLocation = {
  id: 'munsiyari',
  name: 'Munsiyari',

  // Section 1: The Land Sets the Tone
  landTone: {
    opening:
      'Munsiyari is not chosen casually. It is chosen for transformation through terrain and altitude. Three thousand six hundred meters above sea level, in the high alpine meadows of the eastern Himalayas, this is where the body becomes clear and the mind strips down to what matters.' +
      ' The effort to reach here is part of the work. The altitude is not decoration — it is medicine.',
  },

  // Section 2B: Bridging Inner Work & Movement
  bridgingInnerWorkMovement: {
    title: 'Why Both High-Altitude Stillness & Alpine Trekking Are Here',
    description:
      'Munsiyari offers the rarest combination: world-class high altitude for retreat work + alpine terrain for serious trekking. The same elevation that creates profound clarity also enables multi-day high-altitude journeys. A traditional retreat can transition into a trek, or trekking days can be bookended with silent practice. This is the place where transformational silence and transformational movement converge.',
  },

  // Section 3: Why Transformation Happens Here
  retreatLogic: {
    title: 'Why Transformation Happens Here',
    factors: [
      {
        title: 'Serious Altitude Medicine',
        description:
          'Three thousand six hundred meters is high enough to genuinely shift neurology. Oxygen reduction, slower pace, clarity of thought. This altitude does active work on your system.',
      },
      {
        title: 'Alpine Solitude',
        description:
          'Munsiyari is not a destination — it is a basecamp for high wilderness. Few tourists arrive. Fewer stay. The isolation is real and sustained.',
      },
      {
        title: 'Embodied Presence Requirements',
        description:
          'Travel here is not restorative tourism. You feel the altitude in your legs and lungs. This physiological reality grounds you completely in the present moment.',
      },
      {
        title: 'Seasonal Closure',
        description:
          'Heavy snow closes Munsiyari from November through April. This creates natural rhythm and prevents overtourism. The mountain controls access.',
      },
    ],
  },

  // Section 3: Retreat Intentions That Naturally Fit
  intentionsFit: {
    title: 'Why People Come to Munsiyari',
    description: 'People typically seek Munsiyari for:',
    intentions: [
      {
        title: 'Transformation Through Difficulty',
        description:
          'For those ready to be changed by conditions. The altitude, remoteness, and effort are not obstacles — they are catalysts. What emerges is different.',
      },
      {
        title: 'Embodied Awakening',
        description:
          'When the mind needs to be brought into the body. High altitude, thin air, movement through terrain — the body becomes the teacher.',
      },
      {
        title: 'Vision Quest & Threshold Work',
        description:
          'For people at decision points or crossroads. Munsiyari\'s rawness and intensity create conditions for genuine insight and re-orientation.',
      },
      {
        title: 'Alpine Solitude & Completion',
        description:
          'For advanced practitioners seeking genuinely remote conditions. Munsiyari is not a wellness retreat — it is wilderness immersion with intentional design.',
      },
    ],
  },

  // Section 5: Practical Context
  practicalContext: {
    title: 'Essential Information',
    bestSeasons: 'Late June–September. This is the only window when roads are passable and weather is stable. October is possible but unpredictable.',
    accessibility: 'Most remote of our locations. 18+ hours from Delhi (driving + trekking). Accessible only during the brief summer window. Requires fitness and altitude tolerance.',
    crowdProfile: 'Minimal tourist presence. Primarily experienced trekkers and mountaineers. The place itself is wild, not domestic.',
    notFor: 'If you seek comfort, easy accessibility, or preference for warm weather — Munsiyari is not suitable. If altitude sickness is a concern or fitness is limited, choose lower locations.',
  },

  // Section 6: Seasonal & Environmental Character
  seasonalCharacter: {
    title: 'Timing & the Alpine Rhythm',
    seasons: [
      {
        month: 'May – Early June',
        mood: 'Awakening',
        description:
          'Snow has melted. Alpine meadows emerge. Days are long and cool. The world is opening. Good for people capable of altitude and seeking upward energy.',
      },
      {
        month: 'Late June – September',
        mood: 'Peak Season',
        description:
          'Clear skies, stable weather, fully accessible routes. Nights are cold, days are crisp and sharp. This is the optimal window for all retreat types at Munsiyari.',
      },
      {
        month: 'October',
        mood: 'Transition',
        description:
          'Early snow may arrive. Sky is unpredictable. The mountain is shutting down but still accessible. For people seeking intensity and close to wilderness closure.',
      },
      {
        month: 'November – April',
        mood: 'Closed',
        description:
          'Heavy snow. Roads closed. Munsiyari becomes inaccessible. The mountain withdraws. Not available for retreat work.',
      },
    ],
  },

  // Section 7: Network Context
  networkContext:
    'Munsiyari is one of five Himalayan locations we work with — each chosen for different kinds of inner work. We return to Munsiyari for people seeking altitude medicine, genuine remoteness, and the particular alchemy of high wilderness and personal transformation.' +
    ' If you are seeking rest without challenge, accessible beauty, or cultural immersion, other locations (Mussoorie, Rishikesh) may be more aligned.' +
    ' Munsiyari is for people ready to be changed, not just rested.',

  // Section 8: CTA
  ctaText:
    'If this description resonates — if you recognize yourself in one of these intentions, or want to explore whether Munsiyari is the right place for your transformation — reach out. We will help you decide whether this mountain and altitude are what you are truly seeking.',

  // Data Associations
  retreatSlugs: [
    'meditation-and-silence',
    'yoga-and-movement',
    'private-and-custom',
  ],
  trekSlugs: [],
  relatedBlogSlugs: [
    'trek-vs-retreat',
  ],

  // Placeholder sections (to be populated)
  placesAndLandscapes: [],
  softExperiences: [],
} as const;
