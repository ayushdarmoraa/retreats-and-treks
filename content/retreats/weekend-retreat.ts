/**
 * WEEKEND RETREAT SERVICE
 * First-class service definition, location-agnostic
 */

export const weekendRetreat = {
  slug: 'weekend-retreat',
  title: 'Weekend Retreat',
  oneLineEssence: 'A compressed reset for those who need mountain time but have limited availability.',

  description: `
Weekend Retreat is for people whose schedules don't allow for a full week away. Over Friday evening through Sunday, you gain enough distance from daily life to actually reset.

A weekend in the mountains is not nothing. It is enough time to step out of momentum, to notice what your body needs, and to begin the process of recalibration. The experience is compressed but real. Three days of clear focus creates genuine shift.

Fridays arrive with opening. Saturday deepens. Sunday integrates. You leave with enough renewal to return to your week changed.
  `.trim(),

  forNotFor: {
    for: [
      'Working professionals with limited vacation time',
      'Anyone seeking a quick reset without committing a full week',
      'Those wanting to taste mountain retreat experience before longer commitment',
      'People ready to step away but needing compressed structure',
    ],
    notFor: [
      'Those needing extended time for deep transformation',
      'People with unstable schedules or work interruptions',
    ],
  },

  howItWorks: {
    rhythm: `
Friday evening: Arrival, opening circle, settling into place.

Saturday: The full day contains practice—could be yoga, meditation, creative work, sound, or rest. Morning and afternoon sessions with free time between. Evening community dinner.

Sunday: Morning practice, gentle integration, closing circle, departure by afternoon.

The rhythm is deliberately gentle but purposeful. Enough structure to hold focus. Enough space for your own unfolding.
    `.trim(),
  },

  whereItWorksBest: {
    primary: 'chakrata' as const,
    primaryReason: 'Close enough from Delhi to make a weekend feasible. Remote enough to create genuine separation.',
    alsoWorks: ['mussoorie', 'rishikesh'],
    contextByLocation: {
      chakrata: 'Optimal distance from city for a weekend. True wilderness reset in minimal time.',
      mussoorie: 'Closer option for weekend travelers. Quick entry to mountain space.',
      rishikesh: 'Spiritual atmosphere for weekend spiritual exploration.',
      sankri: 'For those with more travel capacity. Higher altitude intensifies reset.',
      munsiyari: 'Extended weekend option—32 hours in alpine solitude.',
    },
  },

  adaptability: `
Weekend Retreats can focus on any practice—rest, yoga, meditation, creative work, sound healing. We customize the 48 hours to what serves you.

Group weekends create community. Small groups allow for depth. Solo weekends offer undistracted rest.
  `.trim(),

  invitation: `
You don't need a full week to reset. Three days in the mountains, held with intention, changes everything. Come spend a weekend with us.
  `.trim(),
} as const;
