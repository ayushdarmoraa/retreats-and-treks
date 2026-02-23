/**
 * MEDITATION & SILENCE RETREAT SERVICE
 * First-class service definition, location-agnostic
 */

export const meditationAndSilenceRetreat = {
  slug: 'meditation-and-silence',
  title: 'Meditation & Silence',
  oneLineEssence: 'Drop into the depth that silence reveals, with guidance and sanctuary.',

  description: `
Meditation & Silence is for those seeking to explore the space beyond thought. Whether you have meditated for a day or a decade, this retreat creates conditions for your mind to settle and your awareness to expand.

The practice is simple: sit quietly. Return to your breath. Notice what arises and let it pass. Repeat. With time and repetition, the ground shifts beneath your assumptions.

Days are structured in silence. You will practice meditation in the morning, afternoon, and evening. Guided sessions offer instruction. Self-practice offers freedom. Teachers remain available for questions and clarification, but the work is ultimately yours.

By the end of the retreat, you will have tasted what your mind is beneath the noise. That taste changes everything.
  `.trim(),

  forNotFor: {
    for: [
      'Anyone seeking a meditation practice or deepening an existing one',
      'People wanting to experience extended silence in a supported setting',
      'Those seeking clarity beyond daily mental patterns',
      'Practitioners ready to go deeper into their inner landscape',
    ],
    notFor: [
      'People uncomfortable with silence or introspection',
      'Those in acute psychological distress',
      'Anyone seeking social interaction or group activities',
      'People wanting immediate results or measurable progress',
    ],
  },

  howItWorks: {
    rhythm: `
Days begin early with meditation practice—6:00 AM typically. The morning session builds the day's container. You will sit for 45 minutes, then have guidance and questions.

Breakfast follows. Eating in silence, with attention to each bite.

Late morning offers another sit—often self-directed. You practice what was taught, or simply sit and observe your mind.

Midday brings lunch and quiet time. Some meditate. Some rest. Most find their rhythm.

Afternoon practice—3:00 PM—brings another guided session or self-practice, depending on the day's structure.

Dinner arrives simply. Evening brings the final sit—typically shorter, deeper, more introspective.

By day three or four, your mind begins to stabilize. The chatter quiets. What remains is spacious and clear.
    `.trim(),
  },

  whereItWorksBest: {
    primary: 'chakrata' as const,
    primaryReason: 'Forest silence creates a natural container for meditation. The mind settles faster.',
    alsoWorks: ['munsiyari', 'rishikesh'],
    contextByLocation: {
      chakrata: 'The forest is completely silent. No external noise. Meditation becomes a natural continuation of the landscape.',
      munsiyari: 'Alpine solitude at altitude. The thin air itself calms the mind.',
      rishikesh: 'Spiritual ground. The tradition of meditation lives in the very earth.',
      sankri: 'Mountain height intensifies inner focus. Breath becomes more precious.',
      mussoorie: 'Accessible silence for those new to extended meditation.',
    },
  },

  adaptability: `
Meditation & Silence welcomes all levels. Complete beginners will learn foundational technique. Experienced meditators will go deeper. Teachers adjust the pace and approach to what serves the group.

Solo retreat offers undistracted inner work. Group practice creates a field of collective silence that supports individual practice. Pair retreats deepen the shared experience of stillness.
  `.trim(),

  invitation: `
If you have wondered what your mind is beneath the noise, come sit with us in silence. We will create the conditions. The discovery is yours.
  `.trim(),
} as const;
