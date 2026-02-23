/**
 * YOGA & MOVEMENT RETREAT SERVICE
 * First-class service definition, location-agnostic
 */

export const yogaAndMovementRetreat = {
  slug: 'yoga-and-movement',
  title: 'Yoga & Movement',
  oneLineEssence: 'Reconnect your body and breath through conscious movement in mountain silence.',

  description: `
Yoga & Movement is for people seeking to re-inhabit their bodies through practice. Whether you are new to yoga or have been practicing for years, this retreat creates space for your form and breath to deepen in the presence of mountains.

The practice is grounded—no performance, no achievement metrics. You move at the pace your body knows, guided by teachers who understand that presence matters more than precision.

Days begin with gentle morning practice as the light shifts. You will explore asana, pranayama, and meditation. The afternoons offer rest and integration. Evenings bring closing practice and reflection.

By the end of the retreat, you will notice: breath arrives more easily, your body feels more familiar, and the connection between movement and mind becomes clear.
  `.trim(),

  forNotFor: {
    for: [
      'Anyone seeking to deepen their yoga practice in a supported environment',
      'People wanting to reconnect with their body through mindful movement',
      'Practitioners new to yoga wanting to build a solid foundation',
      'Those seeking movement as a path to presence and calm',
    ],
    notFor: [
      'People seeking intense physical training or advanced fitness challenges',
      'Those uncomfortable with physical practice or body awareness work',
      'Anyone needing medical rehabilitation or physical therapy',
    ],
  },

  howItWorks: {
    rhythm: `
Morning practice arrives with the light—typically 6:00-7:30 AM. This is when the body is naturally receptive. You will move through gentle warmups, standing poses, seated poses, and closing. The pace is deliberate and internally focused.

After practice, breakfast arrives slowly. Time to rest and integrate.

Midday is free time—time for your own practice, reading, walking, or rest.

Late afternoon brings another practice session, gentler and more introspective. This might be restorative, yin yoga, or meditation—whatever serves the day's unfolding.

Evenings close with reflection and rest.
    `.trim(),
  },

  whereItWorksBest: {
    primary: 'rishikesh' as const,
    primaryReason: 'Rishikesh is the traditional home of yoga. The spiritual ground amplifies practice.',
    alsoWorks: ['chakrata', 'sankri'],
    contextByLocation: {
      rishikesh: 'Yoga\'s birthplace. Teachers, lineage, and tradition all support deepening practice here.',
      chakrata: 'Forest silence becomes part of your internal practice. Natural, undistracted, grounded.',
      sankri: 'High altitude brings heightened presence and breath awareness. The mountain teaches.',
      mussoorie: 'Accessible terrain with views that open the heart during practice.',
      munsiyari: 'Alpine serenity for those seeking profound internal focus.',
    },
  },

  adaptability: `
Yoga & Movement adapts to all levels. Beginners will learn foundations. Experienced practitioners will deepen their understanding. Teachers meet you where your body is, not where it should be.

Group practice creates community. Private sessions serve those seeking individual attention. Pair retreats deepen connection through shared practice.
  `.trim(),

  invitation: `
Whether you are returning to your breath or deepening a practice you have held for years, we welcome you. Come move with us in the mountains.
  `.trim(),
} as const;
