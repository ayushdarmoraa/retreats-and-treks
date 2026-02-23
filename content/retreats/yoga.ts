import { RetreatContent } from '@/types/content';

/**
 * YOGA RETREAT FORMAT
 * A rejuvenating retreat focused on yoga asanas, pranayama, and holistic wellness.
 * Core experience: daily yoga classes, breathwork, philosophy, nature connection.
 * Runs in: Chakrata (primary), future: Sankri on request
 */
const yogaRetreat: RetreatContent = {
  slug: 'yoga-retreat',
  title: 'Yoga Retreat',
  description:
    'A rejuvenating 2–3 day yoga retreat with daily classes, asana practice, pranayama, and holistic wellness in a mountain setting.',

  locationId: 'chakrata', // Primary location
  retreatType: 'Yoga',

  duration: '2 Nights / 3 Days',
  pickupPoint: 'Dehradun',
  bestFor: ['yoga enthusiasts', 'flexibility seekers', 'wellness lovers'],

  overview:
    'Reconnect with your body and breath in this immersive yoga retreat. Surrounded by mountain air and forest silence, practice yoga asanas, learn pranayama techniques, and experience holistic wellness in the heart of the Himalayas.',

  highlights: [
    'Sunrise and evening yoga classes for all levels',
    'Asana practice (beginner to intermediate)',
    'Pranayama and breathing techniques',
    'Yoga philosophy and discussion sessions',
    'Forest nature walks and outdoor practice',
  ],

  itinerary: [
    'Day 1: Pickup from Dehradun, check-in, evening beginner yoga session and dinner',
    'Day 2: Sunrise yoga, breakfast, intermediate asana class, nature walk, evening pranayama session',
    'Day 3: Sunrise yoga, breakfast, yoga philosophy session, return to Dehradun',
  ],

  inclusions: [
    'Accommodation',
    'All meals',
    'Yoga classes and sessions',
    'Local transfers',
  ],

  exclusions: [
    'Personal expenses',
    'Travel insurance',
    'Extra activities',
  ],

  images: [
    {
      src: '/images/retreat-yoga-1.jpg',
      alt: 'Yoga practice in mountain setting',
    },
  ],

  faqs: [
    {
      question: 'What yoga level is this retreat suitable for?',
      answer:
        'All levels—beginners through advanced practitioners. Classes are adaptive and personalized.',
    },
    {
      question: 'Do I need to bring a yoga mat?',
      answer:
        'Yoga mats are provided. Feel free to bring your own if you prefer a familiar mat.',
    },
    {
      question: 'What if I have injuries or limitations?',
      answer:
        'All instructors provide modifications. Please inform us of any injuries or limitations at arrival.',
    },
  ],

  ctaLabel: 'Inquire About This Retreat',
};

export default yogaRetreat;
