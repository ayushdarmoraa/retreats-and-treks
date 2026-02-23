/**
 * ART & CREATIVE RETREAT SERVICE
 * First-class service definition, location-agnostic
 */

export const artAndCreativeRetreat = {
  slug: 'art-and-creative',
  title: 'Art & Creative',
  oneLineEssence: 'Awaken your creative voice in a container designed for authentic expression.',

  description: `
Art & Creative is for anyone seeking to reconnect with the part of themselves that makes, creates, and imagines. You do not need experience. You do not need talent. You need only curiosity and a willingness to create without judgment.

This retreat is a permission structure for your creative voice. Whether that expression comes through painting, writing, movement, music, or forms you discover in the process—the work is about unfettering what wants to emerge.

Days are structured to create flow. Mornings offer instruction or prompt-based exploration. Afternoons are free creation time. Evenings bring gentle sharing and reflection.

By the end, you will have created work that is authentically yours. More importantly, you will have remembered that creativity is your natural state.
  `.trim(),

  forNotFor: {
    for: [
      'Anyone seeking to reconnect with their creative voice',
      'People interested in exploration without performance pressure',
      'Those wanting a container for authentic self-expression',
      'Beginners and experienced artists alike',
    ],
    notFor: [
      'People seeking external validation or market-ready work',
      'Those uncomfortable with vulnerability or self-expression',
      'Anyone wanting technical mastery as the goal',
    ],
  },

  howItWorks: {
    rhythm: `
Mornings begin with a prompt, technique, or theme offered by the facilitator. You explore through your chosen medium—drawing, writing, movement, collage, or whatever calls you.

Mid-morning brings a break. Tea, reflection, settling.

Afternoon is open creation time. This is your space. The facilitator is available if guidance is needed, but the work is entirely yours.

Evenings are gentle. Dinner, then optional sharing. If you wish to show your work and receive presence for it, there is that invitation. If you prefer to keep it private, that is equally honored.

Over the days, patterns emerge. What you needed to express becomes clear. The work deepens naturally.
    `.trim(),
  },

  whereItWorksBest: {
    primary: 'mussoorie' as const,
    primaryReason: 'The landscape itself is creative inspiration. Views, light, and aesthetic beauty amplify the inner creative impulse.',
    alsoWorks: ['chakrata', 'rishikesh'],
    contextByLocation: {
      mussoorie: 'Mountain vistas awaken aesthetic sense. The beauty around you invites creative response.',
      chakrata: 'Forest silence creates space for internal creativity to emerge without distraction.',
      rishikesh: 'Spiritual ground supports the vulnerability that authentic creation requires.',
      sankri: 'High altitude intensifies inner vision and imaginative clarity.',
      munsiyari: 'Alpine beauty for profound creative solitude.',
    },
  },

  adaptability: `
Art & Creative welcomes all mediums. If you have a practice, bring it. If you wish to explore something new, we will support that. The work is about your voice, not the medium.

Solo retreat offers undistracted creation. Group retreats create a field of creative support and gentle witnessing. Pair retreats deepen shared creative exploration.
  `.trim(),

  invitation: `
Your creative voice wants to emerge. We create the conditions. You do the emergence. Come create with us.
  `.trim(),
} as const;
