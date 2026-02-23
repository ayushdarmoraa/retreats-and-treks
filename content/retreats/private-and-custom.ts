/**
 * PRIVATE & CUSTOM RETREAT SERVICE
 * First-class service definition, location-agnostic
 */

export const privateAndCustomRetreat = {
  slug: 'private-and-custom',
  title: 'Private & Custom',
  oneLineEssence: 'A retreat designed entirely around your needs, timeline, and intentions.',

  description: `
Private & Custom Retreat is for those who know exactly what they need—or want the space to discover it without the constraints of a group schedule.

Whether you need a solo retreat for deep work, a couple's retreat for reconnection, a small family or team experience, or something entirely bespoke—we design it with you.

Your retreat is not adapted from a standard program. It is built specifically for your situation, your pace, your depth. If you need five days of silence followed by movement work, we provide it. If you need sound healing, forest rest, and creative expression woven together, we create that container.

The flexibility is complete. The intention is unwavering. You will get exactly what you need.
  `.trim(),

  forNotFor: {
    for: [
      'Anyone with specific retreat intentions that don\'t fit standard programs',
      'Couples seeking retreat for deepening or healing connection',
      'Small groups or teams seeking shared retreat experience',
      'People with specific dietary, accessibility, or practice needs',
      'Those wanting to explore something entirely new or non-traditional',
    ],
    notFor: [
      'People seeking the most affordable option (custom comes at a premium)',
      'Those uncomfortable with the design process or clear intention-setting',
    ],
  },

  howItWorks: {
    rhythm: `
We begin with conversation. What do you need? What are you seeking? What does your body know? What does your heart want?

From that conversation, we design your retreat. Duration, location, practices, pacing, depth, community level—all customized.

We source teachers, facilitators, and support specific to your needs. We handle accommodations, meals, logistics.

You arrive into a container that was built specifically for your unfolding.

The rhythm is yours, held within our expertise and care.
    `.trim(),
  },

  whereItWorksBest: {
    primary: 'chakrata' as const,
    primaryReason: 'Our primary location. Logistically optimal for most custom configurations.',
    alsoWorks: ['sankri', 'rishikesh', 'mussoorie', 'munsiyari'],
    contextByLocation: {
      chakrata: 'Primary base. Full infrastructure, maximum flexibility in program design.',
      sankri: 'For somatic, embodied, or high-altitude work. Dense, powerful mountain energy.',
      rishikesh: 'For yoga, spiritual, or lineage-based work. Ancient tradition deeply alive.',
      mussoorie: 'For couples or aesthetic retreats. Beauty and accessibility combined.',
      munsiyari: 'For intense solitude or advanced practitioners. Extreme alpine depth.',
    },
  },

  adaptability: `
Complete adaptability is the entire point. Private & Custom exists because "one-size-fits-all" doesn't work for everyone.

Solo, duo, small group, family, team—any configuration is possible. Any combination of practices. Any duration, season, intention.
  `.trim(),

  invitation: `
If you know what you need but haven't found it, or if you're ready to discover what your retreat could be—let's talk. We design retreats that fit exactly what you're seeking.
  `.trim(),
} as const;
