/**
 * RISHIKESH LOCATION PREMIUM CONTENT
 * Editorial, intention-based content for /retreats/rishikesh
 * This explains WHY this place, not WHAT we offer
 */

export const rishikeshLocation = {
  id: 'rishikesh',
  name: 'Rishikesh',

  // Section 1: The Land Sets the Tone
  landTone: {
    opening:
      'Rishikesh is chosen for its spiritual gravity. On the banks of the Ganges, in the yoga capital of India, this is where thousands of years of contemplative traditions are still alive in daily practice.' +
      ' This is not a place dressed up as spiritual — it is a place where spiritual life is lived. The river itself teaches. The ashrams around you remind you that you are part of something much older than yourself.',
  },

  // Section 2B: Bridging Inner Work & Movement
  bridgingInnerWorkMovement: {
    title: 'Why Both Spiritual Practice & Physical Movement Are Here',
    description:
      'Rishikesh holds yoga in all its forms — seated meditation and dynamic asana, philosophy and breathing practice, stillness and movement. The spiritual traditions here do not separate inner work from embodied practice. A retreat can lean toward devotional or philosophical depth. Or it can emphasize yoga and movement within the spiritual container. The river facilitates everything.',
  },

  // Section 3: Why Deep Practice Happens Here
  retreatLogic: {
    title: 'Why Deep Practice Happens Here',
    factors: [
      {
        title: 'Unbroken Spiritual Tradition',
        description:
          'Rishikesh has been the center of Hindu philosophy, yoga, and meditation for millennia. This is not tourism — it is archaeology of living practice. The energy is real and sustained.',
      },
      {
        title: 'The Ganges as Teacher',
        description:
          'The presence of the river is constant — in rituals, in bathing, in evening aarti ceremonies that fill the air. The Ganges is not metaphor here — it is presence.',
      },
      {
        title: 'Accessible Spirituality',
        description:
          'Unlike remote mountain ashrams, Rishikesh offers spiritual immersion without deprivation. You can live simply while having comfort. You can study deeply while staying fed and warm.',
      },
      {
        title: 'Pluralism Without Syncretism',
        description:
          'Rishikesh is home to thousands of ashrams teaching different paths — Advaita, Bhakti, Yoga, Tantra. You choose your tradition without being sold one unified fantasy.',
      },
    ],
  },

  // Section 3: Retreat Intentions That Naturally Fit
  intentionsFit: {
    title: 'Why People Come to Rishikesh',
    description: 'People typically seek Rishikesh for:',
    intentions: [
      {
        title: 'Spiritual Grounding & Philosophy',
        description:
          'For those seeking direct connection to yoga and meditation lineages. Rishikesh is where these practices originate — not where they are repackaged.',
      },
      {
        title: 'Devotional Practice & Belonging',
        description:
          'When the path is bhakti (devotion). The temples, ceremonies, and chanting practices create collective energy that supports devotional work.',
      },
      {
        title: 'Teacher-Led Deep Study',
        description:
          'Rishikesh attracts serious teachers of Vedanta, yoga philosophy, and meditation. If your retreat requires study of texts and lineage, this is the place.',
      },
      {
        title: 'Ritual & Sangha Immersion',
        description:
          'For people seeking to practice alongside other seekers in real ashram life. Morning practices, communal meals, evening ceremonies — the structure itself is transformative.',
      },
    ],
  },

  // Section 5: Practical Context
  practicalContext: {
    title: 'Essential Information',
    bestSeasons: 'March–May and September–November. December–February has high tourist traffic and festivals (energizing but crowded).',
    accessibility: 'Closest to Delhi and major cities (3 hours). Full infrastructure, restaurants, urban amenities. River-based geography but still accessible by road.',
    crowdProfile: 'Rishikesh is a pilgrimage center and yoga tourism hub. This means energy is high, community is real, but it is never truly secluded. “Quiet” is relative here.',
    notFor: 'If you seek mountain isolation, wilderness, or escape from human presence — Rishikesh is not suitable. If you prefer secular retreat without spiritual context, choose other locations.',
  },

  // Section 6: Seasonal & Environmental Character
  seasonalCharacter: {
    title: 'Timing & the Spiritual Calendar',
    seasons: [
      {
        month: 'October – November',
        mood: 'Clarity',
        description:
          'Post-monsoon weather is clear and cool. Major festivals (Dussehra, Diwali) bring energy and rituals. Good for people seeking festive spirituality and celebration.',
      },
      {
        month: 'December – February',
        mood: 'Peak Pilgrimage',
        description:
          'Winter attracts pilgrims and seekers from across India and the world. Aarti ceremonies are full. The spiritual calendar is dense. Energy is high.',
      },
      {
        month: 'March – May',
        mood: 'Practice',
        description:
          'Heat increases but not oppressive. Tourist crowds diminish. Teachers lead intensive courses. This is serious retreat season for practitioners.',
      },
      {
        month: 'June – September',
        mood: 'Inward',
        description:
          'Monsoon floods the Ganges and restricts bathing. Heat and humidity are intense. Fewer tourists means deeper community. Good for advanced practitioners seeking quieter immersion.',
      },
    ],
  },

  // Section 7: Network Context
  networkContext:
    'Rishikesh is one of five Himalayan and sacred locations we work with — each chosen for different kinds of inner work. We return to Rishikesh for people seeking spiritual traditions, philosophical depth, and the living presence of yoga and meditation lineages.' +
    ' If you are seeking mountain isolation, high-altitude medicine, or secular contemplation, other locations (Chakrata, Sankri, Munsiyari) may be more aligned.' +
    ' Rishikesh is for people ready to practice within living spiritual traditions, not outside them.',

  // Section 8: CTA
  ctaText:
    'If this description resonates — if you recognize yourself in one of these intentions, or want to explore whether Rishikesh is the right place for your spiritual deepening — reach out. We will help you decide whether this sacred geography is what you are seeking.',

  // Data Associations
  retreatSlugs: [
    'sound-healing',
    'yoga-and-movement',
    'meditation-and-silence',
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
