/**
 * SANKRI LOCATION PREMIUM CONTENT
 * Editorial, intention-based content for /retreats/sankri
 * This explains WHY this place, not WHAT we offer
 */

export const sankriLocation = {
  id: 'sankri',
  name: 'Sankri',
  
  // Section 1: The Land Sets the Tone
  landTone: {
    opening:
      'Sankri is not chosen easily. It is chosen for rawness, altitude, remoteness, and the particular medicine of mountain basecamp. Three thousand meters above the plains, at the convergence of trekking routes and Himalayan wilderness, this is where bodies are tested and minds become clear.' +
      ' Getting here requires intention. And that alone is part of the work.',
  },

  // Section 2B: Bridging Inner Work & Movement
  bridgingInnerWorkMovement: {
    title: 'Why Both High-Altitude Retreat & Trekking Succeed Here',
    description:
      'Sankri is both basecamp for serious trekking and location for altitude-based inner work. The same high elevation that creates transformational clarity also fuels physical challenge. You can retreat into silence at altitude and let the mountain do its work. Or you can trek the high passes, moving through terrain that demands presence. Many journeys combine both — the trek becomes the retreat.',
  },

  // Section 3: Why Inner Work Deepens Here
  retreatLogic: {
    title: 'Why Inner Work Deepens Here',
    factors: [
      {
        title: 'High Altitude Clarity',
        description:
          'Three thousand meters creates significant physiological shift. The oxygen reduction is real. This concentrates thinking and dissolves small concerns. What matters becomes clear. What does not matters less.',
      },
      {
        title: 'Genuine Remoteness',
        description:
          'Sankri is a working trekking basecamp, not a destination town. No parallel tourist infrastructure. No convenience. This remoteness is not romantic — it is real.',
      },
      {
        title: 'Mountain Risk & Presence',
        description:
          'The terrain is serious. Your body knows it. This creates a particular kind of aliveness and presence. Distraction becomes impossible. You cannot half-attend at high altitude with mountain trails nearby.',
      },
      {
        title: 'Seasonal Brevity',
        description:
          'Sankri is only fully accessible in specific months. This creates natural rhythm and prevents it from becoming over-touristed. The constraint is part of the medicine.',
      },
    ],
  },

  // Section 3: Retreat Intentions That Naturally Fit
  intentionsFit: {
    title: 'Why People Come to Sankri',
    description: 'People typically seek Sankri for:',
    intentions: [
      {
        title: 'Breakthrough & Transformation',
        description:
          'For those ready to be changed, not just rested. The difficulty and altitude work as gateways. What emerges on the other side of Sankri is different.',
      },
      {
        title: 'Embodied Presence & Somatic Work',
        description:
          'When the body needs to become real again. Mountain air, altitude, simple living — these bring people back into their flesh in ways flatland does not.',
      },
      {
        title: 'Silent Trek-Based Retreat',
        description:
          'Walking at altitude in silence, moving through landscape, sleeping in simple places. The retreat itself is the movement.',
      },
      {
        title: 'Courage & Threshold Crossing',
        description:
          'For those at a decision point. Sankri does not make things easier — it illuminates. People come asking for clarity and find it through the very act of being there.',
      },
    ],
  },

  // Section 5: Practical Context
  practicalContext: {
    title: 'Essential Information',
    bestSeasons: 'May–June and September–October. September–October offers the clearest skies and stable weather. Available only during these windows.',
    accessibility: 'Base village accessible by road from Dehradun (10+ hours). High altitude basecamp (3000m) requires acclimatization and fitness. Not for people avoiding physical challenge.',
    crowdProfile: 'Trekking basecamp character. Mix of local porters, guides, trekkers, and retreat participants. Not isolated, but genuinely remote. No tourism infrastructure.',
    notFor: 'If you need comfort, warm showers, easy accessibility, or prefer lowland retreat — Sankri is not suitable. If altitude sickness is a concern or fitness is limited, reconsider.',
  },

  // Section 6: Seasonal & Environmental Character
  seasonalCharacter: {
    title: 'Timing & the Mountain Rhythm',
    seasons: [
      {
        month: 'May – Late June',
        mood: 'Awakening',
        description:
          'The high altitude awakens. Snow melts. Days are long, temperatures are moderate at basecamp. Mountain visibility is excellent. Good for people capable of altitude, seeking clarity without extreme weather.',
      },
      {
        month: 'July – August',
        mood: 'Green Intensity',
        description:
          'Peak monsoon. Clouds, rain, mist. The mountains are veiled. Days feel compressed. Vegetation is alive. This is difficult time weather-wise, but emotionally powerful — the retreat must lean into rawness.',
      },
      {
        month: 'September – October',
        mood: 'Crystalline',
        description:
          'Post-monsoon clarity. Days are sharp, nights are cold. Snow appears on peaks. Air is thin and clean. This is the most accessible season for Sankri mountain work — recommended for most.',
      },
      {
        month: 'November – April',
        mood: 'Closed',
        description:
          'Sankri closes. Snow, limited access, extreme cold. The mountain retreats into itself. Not available for retreat work.',
      },
    ],
  },

  // Section 7: Network Context
  networkContext:
    'Sankri is one of several Himalayan locations we work with — each chosen for different kinds of inner work. We return to Sankri for people seeking altitude medicine, genuine remoteness, and the particular transformation that comes from being changed by terrain and elevation.' +
    ' If you are seeking more accessible rest, forest immersion, or the ability to fully disengage without physical challenge, Chakrata may be the location your retreat reaches for instead.',

  // Section 8: CTA
  ctaText:
    'If this description resonates — if you recognize yourself in one of these intentions, or want to explore whether Sankri is the right place for your mountain journey — reach out. We will help you decide whether this altitude and terrain are what you are seeking.',

  // Data Associations
  retreatSlugs: [
    'burnout-recovery',
    'meditation-and-silence',
    'yoga-and-movement',
    'weekend-retreat',
  ],
  trekSlugs: [
    'kedarkantha-trek',
    'har-ki-dun-trek',
  ],
  relatedBlogSlugs: [
    'chakrata-vs-sankri',
    'kedarkantha-vs-har-ki-dun',
    'trek-vs-retreat',
  ],

  // Placeholder sections (to be populated)
  placesAndLandscapes: [],
  softExperiences: [],
} as const;
