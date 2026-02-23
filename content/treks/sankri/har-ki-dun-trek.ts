import { TrekContent } from '@/types/content';

const harKiDunTrek: TrekContent = {
  slug: 'har-ki-dun-trek',
  title: 'Har Ki Dun Trek',
  description:
    'A classic multi-day valley trek from Sankri to Har Ki Dun. Remote alpine meadows, traditional village routes, pristine valleys, and Himalayan wilderness. 5 days trekking adventure.',

  locationId: 'sankri',
  trekType: 'Weekend Trek',

  difficulty: 'Moderate',
  distance: '30 km',
  altitude: '3566 m',

  duration: '5 Days / 4 Nights',
  bestSeason: ['May', 'June', 'September', 'October'],
  pickupPoint: 'Sankri',

  overview:
    'Har Ki Dun is a legendary valley trek offering pristine alpine meadows, remote villages, and stunning Himalayan scenery. Combining high-altitude adventure with cultural immersion, this trek is ideal for those seeking authentic mountain wilderness.',

  highlights: [
    'Pristine alpine meadows and wildflowers',
    'Traditional mountain villages',
    'Remote high-altitude valley',
    'Panoramic Himalayan views',
    'Acclimatization-friendly pacing',
  ],

  itinerary: [
    'Day 1: Sankri to Pulna Forest Camp — moderate trek through pine forests',
    'Day 2: Pulna to Taluka Base — rocky terrain with mountain views',
    'Day 3: Taluka to Har Ki Dun — varied terrain, stunning valley views',
    'Day 4: Explore Har Ki Dun valley, rest day or optional higher climb',
    'Day 5: Return trek to Sankri',
  ],

  inclusions: [
    'Camp accommodation',
    'All meals',
    'Professional guide',
    'Local transfers',
  ],

  exclusions: [
    'Travel to Sankri',
    'Personal trekking gear',
    'Travel insurance',
  ],

  images: [
    {
      src: '/images/trek-har-ki-dun-1.jpg',
      alt: 'Har Ki Dun valley meadow',
    },
  ],

  faqs: [
    {
      question: 'Is this trek suitable for beginners?',
      answer:
        'With prior trekking experience (1-2 multi-day treks), most intermediate trekkers can complete this trek successfully.',
    },
    {
      question: 'What about water and supplies?',
      answer:
        'Natural water sources are available along the route. Supplies are carried by porters from Sankri.',
    },
    {
      question: 'How remote is this trek?',
      answer:
        'Very remote. There are no villages or services beyond Sankri. Proper preparation and guides are essential.',
    },
  ],
};

export default harKiDunTrek;
