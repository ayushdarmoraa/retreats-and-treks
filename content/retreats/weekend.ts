import { RetreatContent } from '@/types/content';

/**
 * WEEKEND RETREAT FORMAT
 * A peaceful 2-3 day retreat designed for professionals and weekend travelers.
 * Core experience: rest, nature immersion, slow pacing, reset.
 * Runs in: Chakrata (primary), future: Sankri on request, Munsiyari
 */
const weekendRetreat: RetreatContent = {
  slug: 'weekend-retreat',
  title: 'Weekend Retreat',
  description:
    'A peaceful 2–3 day retreat combining rest, nature immersion, and guided wellness activities in a serene mountain setting.',

  locationId: 'chakrata', // Primary location; future: multi-location support
  retreatType: 'Wellness',

  duration: '2 Nights / 3 Days',
  pickupPoint: 'Dehradun',
  bestFor: ['burnout', 'working professionals', 'weekend travelers'],

  overview:
    'Escape the city with a short but deeply refreshing break in nature. Surrounded by forests and Himalayan views, this retreat combines rest, mindful activities, and slow travel—perfect for anyone seeking a quick reset.',

  highlights: [
    'Scenic mountain stay in a quiet setting',
    'Guided nature walks and silence hours',
    'Simple wellness and relaxation sessions',
    'Bonfire and quiet evenings',
    'Pickup and drop from Dehradun',
  ],

  itinerary: [
    'Day 1: Pickup from Dehradun, arrival, check-in, evening relaxation',
    'Day 2: Morning wellness session, nature walk, sightseeing, bonfire evening',
    'Day 3: Breakfast, reflection time, return to Dehradun',
  ],

  inclusions: [
    'Accommodation',
    'All meals',
    'Local transfers',
    'Guided activities',
  ],

  exclusions: [
    'Personal expenses',
    'Travel insurance',
    'Anything not mentioned in inclusions',
  ],

  images: [
    {
      src: '/images/retreat-weekend-1.jpg',
      alt: 'Mountain retreat stay in nature',
    },
  ],

  faqs: [
    {
      question: 'Is this suitable for beginners?',
      answer: 'Yes. This retreat is designed for anyone new to wellness experiences or needing a quick reset.',
    },
    {
      question: 'Where does the retreat start and end?',
      answer: 'Pickup and drop from Dehradun. Travel time is 2–3 hours each way.',
    },
    {
      question: 'What should I bring?',
      answer: 'Comfortable clothing, personal medications, and an open mind. We provide everything else.',
    },
  ],

  ctaLabel: 'Inquire About This Retreat',
};

export default weekendRetreat;
