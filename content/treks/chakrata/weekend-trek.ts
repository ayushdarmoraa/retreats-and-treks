import { TrekContent } from '@/types/content';

const weekendTrek: TrekContent = {
  slug: 'weekend-trek',
  title: 'Chakrata Weekend Trek',
  description:
    'A refreshing 2 nights 3 days weekend trek in Chakrata. Forest trails, mountain views, camping under stars, and guided outdoor experience. Pickup and drop from Dehradun.',

  locationId: 'chakrata',
  trekType: 'Weekend Trek',

  difficulty: 'Easy',
  distance: '8 km',
  altitude: '2100 m',

  duration: '2 Nights / 3 Days',
  bestSeason: ['March', 'April', 'September', 'October', 'November'],
  pickupPoint: 'Dehradun',

  overview:
    'Experience the charm of Chakrata on this easy weekend trek. Perfect for trekking beginners and families, this route takes you through pine forests, grasslands, and offers panoramic mountain views. Trek during the day, camp under the stars at night.',

  highlights: [
    'Easy-to-moderate forest trails',
    'Scenic grassland meadows',
    'Mountain camping experience',
    'Sunrise and sunset views',
    'Local guide assistance',
  ],

  itinerary: [
    'Day 1: Pickup from Dehradun, trek orientation, afternoon trek to basecamp, bonfire dinner',
    'Day 2: Morning trek through forest, midday rest, afternoon exploration, night camping',
    'Day 3: Sunrise trek, breakfast at basecamp, return to Dehradun',
  ],

  inclusions: [
    'All meals',
    'Camping setup',
    'Guide services',
    'Local transfers',
  ],

  exclusions: [
    'Travel insurance',
    'Personal trekking gear',
    'Extra activities',
  ],

  images: [
    {
      src: '/images/chakrata-trek-1.jpg',
      alt: 'Forest trail in Chakrata mountains',
    },
  ],

  faqs: [
    {
      question: 'Is this trek suitable for beginners?',
      answer:
        'Yes. This is an easy trek with minimal altitude gain. Perfect for first-time trekkers.',
    },
    {
      question: 'What fitness level is required?',
      answer:
        'Basic fitness. The trek involves 3-4 hours of walking daily on easy terrain.',
    },
  ],
};

export default weekendTrek;
