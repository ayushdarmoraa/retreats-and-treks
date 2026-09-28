import { RetreatContent } from '@/types/content';

const yogaRetreat: RetreatContent = {
  slug: 'yoga-retreat',
  title: 'Chakrata Yoga Retreat',
  description:
    'Demand-led Yoga retreat enquiries in Chakrata. No fixed dates, duration, price, or departure details are currently published.',

  locationId: 'chakrata',
  retreatType: 'Yoga',

  duration: 'Not published',
  pickupPoint: 'Confirm by enquiry',
  bestFor: ['yoga enthusiasts', 'flexibility seekers', 'wellness lovers'],

  overview:
    'Chakrata Yoga requests are handled on demand rather than as a recurring fixed departure. The team must confirm whether a programme can be arranged and provide its dates, schedule, stay, meals, inclusions, exclusions, and access details.',

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
      src: '/Images/experience-hubs/yoga-hero.webp',
      alt: 'Yoga practice in Chakrata mountains',
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
  ],

  ctaLabel: 'WhatsApp Us',
};

export default yogaRetreat;
