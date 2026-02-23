/**
 * SOUND HEALING RETREAT SERVICE
 * First-class service definition, location-agnostic
 */

export const soundHealingRetreat = {
  slug: 'sound-healing',
  title: 'Sound Healing',
  oneLineEssence: 'Bathe your nervous system in resonance that restores and recalibrates.',

  description: `
Sound Healing is for those seeking the therapeutic power of vibration and resonance. Sound travels through your entire being—not just your ears, but your bones, organs, cells. This retreat creates immersive experiences with instruments and frequencies designed to calm, balance, and restore.

You will experience sound baths, gong ceremonies, singing bowls, and guided resonance work. Each session creates a space for your nervous system to release what it has been holding and return to a state of natural ease.

The work is entirely receptive. You lie down, open to the sound, and let vibration do its work. There is nothing to do, achieve, or understand. Simply receive.

By the end of the retreat, you will notice: deeper sleep, easier breathing, quieter mind, and a sense that your body is humming at a slower, more resonant frequency.
  `.trim(),

  forNotFor: {
    for: [
      'Anyone seeking nervous system restoration through sound',
      'People drawn to vibrational or somatic healing',
      'Those wanting a receptive, non-effortful healing experience',
      'Practitioners seeking complement to meditation or movement practice',
    ],
    notFor: [
      'People with severe hearing sensitivities or auditory processing issues',
      'Those requiring active engagement or instruction',
      'Anyone uncomfortable with sensory immersion experiences',
    ],
  },

  howItWorks: {
    rhythm: `
Days are structured around sound sessions. Morning sessions are gentle—singing bowls, softer frequencies designed to open the day.

Mid-morning brings free time. Walk, rest, integrate, or continue personal practice.

Afternoon brings another session—perhaps gong, perhaps a full sound bath with multiple instruments. You lie in a comfortable position and receive the sound.

Evenings are quieter. Gentle sound meditation or silence, allowing the day's resonance to settle into your nervous system.

Over days, your body begins to remember resonance. Tension releases. Sleep deepens. A natural rhythm emerges.
    `.trim(),
  },

  whereItWorksBest: {
    primary: 'rishikesh' as const,
    primaryReason: 'Sacred ground amplifies the healing power of sound. Tradition and intention live here.',
    alsoWorks: ['chakrata', 'munsiyari'],
    contextByLocation: {
      rishikesh: 'Spiritual earth resonates with sound healing work. The tradition is ancient here.',
      chakrata: 'Forest acoustics create natural amplification. Sound travels deeply through silence.',
      munsiyari: 'Alpine caverns naturally amplify resonance. The mountain becomes part of the healing.',
      sankri: 'High altitude intensifies the subtlety of vibration perception.',
      mussoorie: 'Accessible setting for those beginning sound healing work.',
    },
  },

  adaptability: `
Sound Healing welcomes all. No prior experience or belief system required. Your nervous system will respond to the vibration regardless of expectation.

Group sound baths create a shared field of resonance. Private sessions offer personalized frequency work. Small group retreats allow for both collective and individual attention.
  `.trim(),

  invitation: `
Let your body remember what resonance feels like. We will provide the sound. Your nervous system will do the healing.
  `.trim(),
} as const;
