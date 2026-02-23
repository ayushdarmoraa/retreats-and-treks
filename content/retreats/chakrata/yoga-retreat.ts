import { RetreatContent } from '@/types/content';

const yogaRetreat: RetreatContent = {
  slug: 'yoga-retreat',
  title: 'Chakrata Yoga Retreat',
  description:
    'A rejuvenating 2 nights 3 days yoga retreat in Chakrata. Daily yoga classes, asana practice, pranayama sessions, and holistic wellness. Pickup and drop from Dehradun.',

  locationId: 'chakrata',
  retreatType: 'Yoga',

  duration: '2 Nights / 3 Days',
  pickupPoint: 'Dehradun',
  bestFor: ['yoga enthusiasts', 'flexibility seekers', 'wellness lovers'],

  overview:
    'Reconnect with your body and breath in this immersive Chakrata yoga retreat. Surrounded by mountain air and forest silence, practice yoga asanas, learn pranayama techniques, and experience holistic wellness in the heart of the Himalayas.',

  highlights: [
    'Sunrise and evening yoga classes',
    'Asana practice for all levels',
    'Pranayama and breathing techniques',
    'Yoga philosophy discussions',
    'Forest nature walks',
  ],

  itinerary: [
    'Day 1: Pickup from Dehradun, check-in, evening beginner yoga session',
    'Day 2: Sunrise yoga, breakfast, intermediate asana class, nature walk, evening pranayama',
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
      src: '/images/chakrata-yoga-1.jpg',
      alt: 'Yoga practice in Chakrata mountains',
    },
  ],

  faqs: [
    {
      question: 'What yoga level is this retreat suitable for?',
      answer:
        'This retreat accommodates all levels—beginners through advanced practitioners. Classes are adaptive.',
    },
    {
      question: 'Do I need to bring a yoga mat?',
      answer:
        'Yoga mats are provided. Feel free to bring your own if you prefer.',
    },
  ],

  ctaLabel: 'WhatsApp Us',
};

export default yogaRetreat;
