import { RetreatContent } from '@/types/content';

/**
 * MEDITATION RETREAT FORMAT
 * A transformative retreat focused on mindfulness, inner peace, and mental clarity.
 * Core experience: guided meditation, breathwork, silent practice, reflection.
 * Runs in: Chakrata (primary)
 */
const meditationRetreat: RetreatContent = {
  slug: 'meditation-retreat',
  title: 'Meditation Retreat',
  description:
    'A transformative 2–3 day meditation retreat with guided sessions, mindfulness practice, and silent immersion in nature.',

  locationId: 'chakrata', // Primary location
  retreatType: 'Meditation',

  duration: '2 Nights / 3 Days',
  pickupPoint: 'Dehradun',
  bestFor: ['stress relief', 'beginners', 'meditation seekers'],

  overview:
    'Seek inner peace and mental clarity in a distraction-free mountain environment. This retreat combines daily guided meditation, breathwork, and mindful living—designed for both beginners and experienced practitioners.',

  highlights: [
    'Daily guided meditation sessions',
    'Breathwork and pranayama practice',
    'Silent nature walks in the forest',
    'Mindfulness meals and tea ceremonies',
    'Evening reflection circles',
  ],

  itinerary: [
    'Day 1: Pickup from Dehradun, arrival, meditation orientation, silent dinner',
    'Day 2: Sunrise meditation, breakfast, forest walk, afternoon practice, bonfire circle',
    'Day 3: Sunrise meditation, breakfast, reflection session, return to Dehradun',
  ],

  inclusions: [
    'Accommodation',
    'Vegetarian meals',
    'All meditation sessions',
    'Local transfers',
  ],

  exclusions: [
    'Personal items',
    'Travel insurance',
    'Non-vegetarian meals',
  ],

  images: [
    {
      src: '/images/retreat-meditation-1.jpg',
      alt: 'Meditation session in mountain setting',
    },
  ],

  faqs: [
    {
      question: 'Do I need prior meditation experience?',
      answer:
        'No. This retreat is designed for beginners and experienced practitioners alike. All sessions are guided and adaptive.',
    },
    {
      question: 'Is this retreat silent?',
      answer:
        'Mostly. Meals and evening circles involve mindful conversation. Meditation and practice sessions are silent.',
    },
    {
      question: 'What should I bring?',
      answer:
        'Comfortable clothing, personal medications, and an open mind. Phones are collected during sessions.',
    },
  ],

  ctaLabel: 'Inquire About This Retreat',
};

export default meditationRetreat;
