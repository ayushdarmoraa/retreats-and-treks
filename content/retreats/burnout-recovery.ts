/**
 * BURNOUT RECOVERY RETREAT SERVICE
 * First-class service definition, location-agnostic
 */

export const burnoutRecoveryRetreat = {
  slug: 'burnout-recovery',
  title: 'Burnout Recovery',
  oneLineEssence: 'Recalibration for people who have hit the wall and need to rebuild.',

  description: `
Burnout is not tiredness. It is the collapse of meaning. You have given everything and the transaction feels fundamentally broken. You have become numb to things that once mattered. Return to normal is not possible—normal was what broke you.

Burnout Recovery is for people in that exact place. Not in acute crisis, but definitely in the place where your old life no longer fits and you cannot yet see what comes next.

This retreat creates space for genuine recalibration. Not positivity. Not productivity optimization. Not another system to try. But actual opening—the kind that happens when you finally stop running and feel what has been waiting underneath.

Mornings begin with somatic work. Your body has been carrying the weight of burnout in your muscles, your breath, your tissues. Gentle movement—led by practitioners who understand what is held in the nervous system—helps your body release what it has been protecting. This is not yoga. It is coming home to your own skin.

You will have time alone to process. Time with others who have also hit the wall, who understand that burnout is not a personal failure but a signal that something had to change.

By mid-week, something shifts. The fog lifts slightly. Meaning begins to whisper again. Not answers yet. But the possibility of answers.

You will leave with a sense of direction. Not a plan. Not a new job or life decision. But a felt sense that rebuilding is possible, and that you are not fundamentally broken.
  `.trim(),

  forNotFor: {
    for: [
      'People who have hit genuine burnout—where meaning collapsed, not just energy dropped',
      'Anyone feeling numb, cynical, or disconnected from their own values',
      'Those whose bodies are holding trauma from overwork—tension, insomnia, digestive issues',
      'People ready to ask hard questions about what they actually want',
      'Anyone whose old life no longer fits and cannot yet see what comes next',
    ],
    notFor: [
      'People in acute crisis or needing psychiatric care',
      'Those seeking quick fixes, motivation, or productivity hacks',
      'Anyone uncomfortable with emotional depth or body-based work',
      'People wanting to integrate back into their old life unchanged',
      'Those preferring external solutions to internal recalibration',
    ],
  },

  howItWorks: {
    rhythm: `
Mornings begin in the body. Somatic work—breathing, gentle movement, the kind of practice that helps your nervous system remember it is safe—creates the foundation. This is not transcendence. It is practical healing.

Mid-morning opens into space. Some people do individual therapy or coaching. Some journal. Some sit with the mountain. There is no prescription, only skilled practitioners available if you need them.

Afternoons bring lighter air. You walk in landscape. You rest. You eat slowly. You are among others who understand that burnout is not weakness—it is a signal that something fundamental needed to change.

One evening per week, there is a circle. Optional. A safe space where people speak about what burnout has taught them and what they are beginning to rebuild. Not group therapy. Just honest presence.

By the end of days, your nervous system begins to trust again. The constant vigilance softens. Sleep comes more naturally. And in that opening, something wants to rebuild.
    `.trim(),
  },

  whereItWorksBest: {
    primary: 'sankri' as const,
    primaryReason: 'The remoteness and altitude create a genuine break from the system that broke you. You cannot check email. You cannot pretend everything is normal. The mountain holds you while you fall apart and begin again.',
    alsoWorks: ['chakrata', 'munsiyari'],
    contextByLocation: {
      sankri: 'The difficulty of reaching it means you are truly away. The altitude amplifies psychological opening.',
      chakrata: 'For those newly burnt out, the forest supports gentle healing without extremity.',
      munsiyari: 'For those at deep threshold, the alpine terrain mirrors transformation.',
      mussoorie: 'A softer recalibration path for those needing gentleness first.',
      rishikesh: 'Spiritual ground supports meaning reconstruction through tradition and practice.',
    },
  },

  adaptability: `
This retreat adapts to where you actually are. If you are very depleted, the pacing is gentler and more restorative. If you are ready for therapeutic depth, we can go there. The structure holds both.

Seasonal timing matters. Winter at altitude for those ready to go deep. Monsoon for the introspective phase. Spring for emergence. We match the season to your readiness.
  `.trim(),

  invitation: `
If you are in burnout—if this description touches something real—this retreat is built for you. Talk to us. We will find the timing, location, and depth of work that makes sense for where you actually are.
  `.trim(),
} as const;
