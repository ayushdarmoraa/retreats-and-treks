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

  monthlyConditions: [
    { month: 'May', conditions: 'Late spring. Snow melted below 3,200 m. Valley is vivid green with wildflowers blooming across meadows. Temperatures: 8°C to 0°C at camp. Longer days, pleasant trekking weather. River crossings manageable. One of the two best months for this trek.' },
    { month: 'June', conditions: 'Early summer. Lush vegetation, full wildflower bloom in the upper valley. Temperatures: 10°C to 3°C. Some afternoon rain possible as monsoon approaches. Early June is ideal; late June may see the first monsoon showers. River levels begin rising.' },
    { month: 'September', conditions: 'Post-monsoon. Valley is at peak green after the rains. Trails may be slippery in early September. Temperatures: 6°C to -2°C. By mid-September, skies clear beautifully. Fewer trekkers than May. Waterfalls are at their most dramatic.' },
    { month: 'October', conditions: 'Autumn. Golden light on the meadows, changing foliage in the forest. Crystal-clear skies — the best visibility of any season. Temperatures: 3°C to -5°C at camp. Dry trails, crisp air, spectacular colours. The most photogenic month for Har Ki Dun.' },
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

  updatedAt: '2026-03-05',
};

export default harKiDunTrek;
