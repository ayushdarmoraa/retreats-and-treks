/**
 * REST & RESET RETREAT SERVICE
 * First-class service definition, location-agnostic
 */

export const restAndResetRetreat = {
  slug: 'rest-and-reset',
  title: 'Rest & Reset',
  oneLineEssence: 'Permission to stop, for people who have been running too long.',

  description: `
Rest & Reset is for people whose nervous systems have been running on fumes. Not burnt out yet. But tired in the way sleep alone cannot fix. You move through days on momentum, and somewhere between Tuesday and Friday you can no longer remember what rested actually feels like.

This retreat is an explicit permission structure to stop.

To move without purpose. To let your body remember what ease feels like. To sit in a room without reaching for your phone and realize that the world continues without your constant attention. That you are full, not because of what you produce, but because of who you are.

Over a long weekend or week, your only work is to let your nervous system settle. The landscape holds the container. You simply breathe into it.

Mornings unfold quietly. You wake naturally. Chai, coffee, silence—available, not required. Some people meditate. Some read. Some walk the forest path and listen. There is no protocol, only permission.

By mid-week, you will notice a subtle shift. Your shoulders sit lower. Your breath deepens without your trying. Sleep arrives naturally. And the thought-loops that have occupied your mind begin to quiet.

You will leave with one clear gift: the memory of what unstressed actually feels like. That memory becomes your compass home.
  `.trim(),

  forNotFor: {
    for: [
      'People running on momentum who need to remember what rest actually is',
      'Anyone whose nervous system is stuck in alert mode despite external safety',
      'Those whose sleep is poor, digestion is struggling, or energy is depleted',
      'People seeking genuine silence without group activities, teaching, or optimization',
      'Anyone who recognizes they need permission to stop before crisis forces them to',
    ],
    notFor: [
      'People seeking adventure, challenge, or active physical transformation',
      'Those in acute crisis or requiring psychiatric care',
      'Anyone uncomfortable with silence, stillness, or introspection',
      'People wanting structure, achievement, or measurable progress',
      'Those treating this as a productivity hack or wellness optimization',
    ],
  },

  howItWorks: {
    rhythm: `
Mornings arrive without demand. You wake when your body is ready. The forest is quiet. Some practitioners offer gentle breathing or soft yoga on the lawn—a whisper of practice, not a requirement. Most people sit with tea and notice the light shifting through trees.

Late morning brings a natural transition. The heat of the day arrives. This is your time for rest—napping, reading, sitting by water, moving slowly if you feel like it. No itinerary. No check-ins.

Afternoons are spacious. Lunch is simple and the eating is slow. Some people walk forest trails. Some lie in hammocks. Some do nothing at all, and that is completely okay. This is where the nervous system does its actual work—in the absence of demand.

Evenings gather lightly. There is dinner. There is conversation if you want it. There might be gentle music or complete quiet. It is offered, not prescribed.

By evening of the third or fourth day, something shifts. Your body stops waiting for the next demand. Your mind stops planning tomorrow. You inhabit just this moment, and that moment feels like home.
    `.trim(),
  },

  whereItWorksBest: {
    primary: 'chakrata' as const,
    primaryReason: 'The forest creates a natural cocoon for the nervous system. No tourist noise. No signal. Just the profound quiet of trees and altitude.',
    alsoWorks: ['mussoorie', 'rishikesh'],
    contextByLocation: {
      chakrata: 'Forest immersion becomes part of the healing. The silence is not empty—it is full of life.',
      mussoorie: 'Softer terrain for those needing gentleness. The landscape meets you where you are.',
      rishikesh: 'Spiritual ground amplifies the inner turn. Traditions of rest live here.',
      sankri: 'High altitude intensifies the nervous system reset. The mountain holds you.',
      munsiyari: 'Alpine solitude for those ready for a deeper break from the world.',
    },
  },

  adaptability: `
This retreat breathes with seasons. Winter brings stillness and warm spaces. Monsoon brings introspection and the sound of rain as your companion. Summer offers clear skies and cool mornings. The rhythm of rest remains constant—the landscape simply changes its texture.

Solo retreat, pair retreat, small group—each creates a different quality. We match the size and pacing to what you actually need.
  `.trim(),

  invitation: `
If you recognize this tiredness—if the word "rest" feels like a distant memory—come explore it with us. We will help you find the season, location, and depth that makes sense for your nervous system right now.
  `.trim(),
} as const;
