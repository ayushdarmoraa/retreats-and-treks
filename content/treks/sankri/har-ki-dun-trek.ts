import { TrekContent } from '@/types/content';

const harKiDunTrek: TrekContent = {
    priceRange: "₹10,000 – ₹15,000",
    groupSize: "8–16 people",

    howToReach: [
      "Reach Dehradun",
      "Drive to Sankri (8–9 hrs)",
      "Start trek from Sankri base"
    ],

    packingList: [
      "Trekking shoes",
      "Warm jacket",
      "Thermal layers",
      "Rain cover",
      "Trekking pole",
    ],

    altitudeProfile: [
      "Sankri – 1,950 m",
      "Pulna – 2,400 m",
      "Taluka – 2,700 m",
      "Har Ki Dun – 3,566 m"
    ],

    permits: "Forest entry permit required from Sankri",

    risksAndSafety: [
      "River crossings",
      "Remote location, limited evacuation",
      "Altitude gain above 3,500 m",
      "Weather changes in valley"
    ],
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
    {
      question: 'What is the total distance of Har Ki Dun trek?',
      answer: 'The total distance is approximately 30–35 km over 5–6 days including acclimatization. Daily distances range from 5–8 km depending on altitude gains and valley terrain.',
    },
    {
      question: 'What is the highest altitude of Har Ki Dun trek?',
      answer: 'Har Ki Dun meadow plateau is located at approximately 3,400 meters (11,155 feet) above sea level.',
    },
    {
      question: 'How many days does Har Ki Dun trek take?',
      answer: 'The standard Har Ki Dun trek takes 5–6 days including acclimatization. This provides proper adjustment time and reduces altitude-related issues.',
    },
    {
      question: 'Can families with children do Har Ki Dun?',
      answer: 'Yes, Har Ki Dun is suitable for families with children aged 10 and above who have basic fitness. The trail is well-maintained and the altitude gain is gradual.',
    },
    {
      question: 'Do I need permits for Har Ki Dun trek?',
      answer: 'Local forest permits are required from the Uttarakhand forest department. Trek operators typically arrange permits through Sankri. Permit availability may vary by season.',
    },
  ],

  relatedBlogSlugs: [
    'har-ki-dun-trek-cost',
    'har-ki-dun-best-time',
    'har-ki-dun-difficulty',
    'har-ki-dun-packing-list',
  ],
  updatedAt: '2026-03-05',
};

export default harKiDunTrek;
