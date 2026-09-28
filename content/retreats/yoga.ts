import { RetreatContent } from '@/types/content';

/** Legacy generic format record; current location and schedule details are enquiry-led. */
const yogaRetreat: RetreatContent = {
  slug: 'yoga-retreat',
  title: 'Yoga Retreat',
  description:
    'Demand-led Yoga retreat enquiries. No fixed dates, duration, price, or departure-specific programme details are currently published.',

  locationId: 'chakrata', // Primary location
  retreatType: 'Yoga',

  duration: 'Not published',
  pickupPoint: 'Confirm by enquiry',
  bestFor: ['yoga enthusiasts', 'flexibility seekers', 'wellness lovers'],

  overview:
    'Yoga requests are handled on demand rather than as a recurring fixed departure. The team must confirm whether a programme can be arranged and provide its dates, schedule, stay, meals, inclusions, exclusions, and access details.',

  highlights: [
    'Demand-led enquiry',
    'No fixed Yoga dates currently published',
    'Programme details confirmed individually',
  ],

  itinerary: [],

  inclusions: [],

  exclusions: [],

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
        'Experience requirements depend on the programme proposed. Share your experience and the team will confirm suitability before arranging a retreat.',
    },
    {
      question: 'Do I need to bring a yoga mat?',
      answer:
        'Equipment and what to bring are not currently published. Confirm these details with the team for the proposed programme.',
    },
    {
      question: 'What if I have injuries or limitations?',
      answer:
        'Share relevant limitations in your enquiry. The team must confirm suitability and adaptations for any proposed programme before you commit.',
    },
  ],

  ctaLabel: 'Inquire About This Retreat',
};

export default yogaRetreat;
