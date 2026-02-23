import { TrekContent } from '@/types/content';

const budherCavesTrek: TrekContent = {
  slug: 'budher-caves-trek',
  title: 'Chakrata Budher Caves Trek',
  description:
    'An adventurous trek to the historic Budher Caves in Chakrata. Explore ancient caves, forest trails, mountain views, and local heritage. 2 nights 3 days guided experience from Dehradun.',

  locationId: 'chakrata',
  trekType: 'Cave Trek',

  difficulty: 'Moderate',
  distance: '10 km',
  altitude: '2050 m',

  duration: '2 Nights / 3 Days',
  bestSeason: ['February', 'March', 'April', 'October', 'November'],
  pickupPoint: 'Dehradun',

  overview:
    'Discover the ancient Budher Caves, a fascinating natural and historical site in Chakrata. This trek combines moderate hiking with cave exploration, offering glimpses into the region\'s past and pristine nature.',

  highlights: [
    'Ancient Budher Caves exploration',
    'Historical significance and local stories',
    'Moderate forest trails',
    'Panoramic mountain views',
    'Wildlife and bird watching',
  ],

  itinerary: [
    'Day 1: Pickup from Dehradun, trek orientation, afternoon trek through forest, basecamp setup',
    'Day 2: Full-day cave exploration and hiking, local guide stories, evening at basecamp',
    'Day 3: Optional morning exploration, breakfast, return to Dehradun',
  ],

  inclusions: [
    'All meals',
    'Expert guide services',
    'Camping and equipment',
    'Local transfers',
  ],

  exclusions: [
    'Travel insurance',
    'Personal gear',
    'Cave exploration equipment',
  ],

  images: [
    {
      src: '/images/chakrata-budher-caves-1.jpg',
      alt: 'Budher Caves entrance in Chakrata',
    },
  ],

  faqs: [
    {
      question: 'Are the caves safe to explore?',
      answer:
        'Yes. Guides ensure safety and provide light sources. Basic fitness is required.',
    },
    {
      question: 'What is the historical significance of Budher Caves?',
      answer:
        'The caves are ancient and hold cultural significance in the region. Guides share local stories and history.',
    },
  ],
};

export default budherCavesTrek;
