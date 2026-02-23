import { RetreatContent } from '@/types/content';

const meditationRetreat: RetreatContent = {
  slug: 'meditation-retreat',
  title: 'Chakrata Meditation Retreat',
  description:
    'A transformative 2 nights 3 days meditation retreat in Chakrata. Guided meditation sessions, mindfulness practice, nature immersion, and peaceful evenings. Pickup and drop from Dehradun.',

  locationId: 'chakrata',
  retreatType: 'Meditation',

  duration: '2 Nights / 3 Days',
  pickupPoint: 'Dehradun',
  bestFor: ['stress relief', 'beginners', 'meditation seekers'],

  overview:
    'This Chakrata meditation retreat is designed for anyone seeking inner peace and mental clarity. Nestled in the serene forests of Chakrata, the retreat combines daily meditation sessions, breathwork, and mindful living in a distraction-free environment.',

  highlights: [
    'Daily guided meditation sessions',
    'Breathwork and pranayama practice',
    'Silent nature walks in the forest',
    'Mindfulness meals and tea ceremonies',
    'Evening reflection circles',
  ],

  itinerary: [
    'Day 1: Pickup from Dehradun, arrival, meditation orientation, evening silent dinner',
    'Day 2: Morning meditation, breakfast, forest walk, afternoon practice, bonfire circle',
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
      src: '/images/chakrata-meditation-1.jpg',
      alt: 'Meditation session in Chakrata',
    },
  ],

  faqs: [
    {
      question: 'Do I need prior meditation experience?',
      answer:
        'No. This retreat is designed for beginners and experienced practitioners alike. All sessions are guided.',
    },
    {
      question: 'What should I bring?',
      answer:
        'Comfortable clothing, personal medications, and an open mind. Phones are collected during sessions.',
    },
  ],

  ctaLabel: 'WhatsApp Us',
};

export default meditationRetreat;
