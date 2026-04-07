import { TrekContent } from '@/types/content';

const dayaraBugyalTrek: TrekContent = {
  slug: 'dayara-bugyal-trek',
  title: 'Dayara Bugyal Trek (3,750m) – Meadow Trek from Barsu',
  description:
    'Dayara Bugyal trek is one of the most beautiful meadow treks in Uttarakhand. 4–5 days, beginner-friendly, with vast alpine grasslands and Himalayan views. Best in winter (snow) and summer.',

  locationId: 'barsu',
  trekType: 'Beginner Trek',

  difficulty: 'Easy',
  distance: '20 km',
  altitude: '3750 m',

  duration: '4 Days / 3 Nights',
  bestSeason: ['December', 'January', 'February', 'March', 'April', 'May'],
  pickupPoint: 'Barsu',

  overview:
    'Dayara Bugyal is one of the most accessible high-altitude meadow treks in Uttarakhand. Starting from Barsu, the trail climbs gradually through forests and opens into vast alpine grasslands with panoramic views of Bandarpoonch and surrounding peaks.\n\nThis trek is ideal for beginners and those looking for a shorter Himalayan experience without extreme altitude or technical difficulty.',

  highlights: [
    'Expansive Bugyal meadows',
    'Snow trekking in winter',
    'Panoramic Himalayan views',
    'Beginner-friendly terrain',
  ],

  itinerary: [
    'Day 1: Drive to Barsu',
    'Day 2: Trek to Barnala Tal',
    'Day 3: Trek to Dayara Bugyal and return',
    'Day 4: Return to Barsu',
  ],

  inclusions: [
    'Meals during trek',
    'Camping accommodation',
    'Guide and support staff',
    'Permits',
  ],

  exclusions: [
    'Travel to Barsu',
    'Personal gear',
    'Insurance',
  ],

  images: [
    { src: '/images/treks/dayara-1.jpg', alt: 'Dayara Bugyal meadow view' },
  ],

  monthlyConditions: [
    { month: 'January', conditions: 'Snow-covered meadows, ideal for winter trekking' },
    { month: 'April', conditions: 'Clear skies, green meadows start appearing' },
  ],

  faqs: [
    {
      question: 'Is Dayara Bugyal good for beginners?',
      answer: 'Yes, it is one of the best beginner treks in Uttarakhand.',
    },
    {
      question: 'What is the total distance of Dayara Bugyal trek?',
      answer: 'The total distance is approximately 20 km over 4 days. Daily distances are relatively short, ranging from 4–8 km, making it perfect for beginners.',
    },
    {
      question: 'What is the highest altitude of Dayara Bugyal trek?',
      answer: 'Dayara Bugyal meadow plateau is located at 3,750 meters (12,303 feet) above sea level, making it a high-altitude trek without extreme technical difficulty.',
    },
    {
      question: 'How many days does Dayara Bugyal trek take?',
      answer: 'The Dayara Bugyal trek typically takes 4 days and 3 nights, including a drive to Barsu and a complete return to the base.',
    },
    {
      question: 'Can children do Dayara Bugyal trek?',
      answer: 'Yes, children aged 8 and above with basic fitness can trek Dayara Bugyal. The gradual incline and short daily distances make it family-friendly.',
    },
    {
      question: 'When is the best time for Dayara Bugyal?',
      answer: 'December to March for snow meadows and winter experience, April to May for flowers and pleasant weather, and October to November for autumn colors. It is trekable year-round.',
    },
  ],

  // NEW FIELDS
  priceRange: "₹6,000 – ₹10,000",
  groupSize: "6–12 people",

  howToReach: [
    "Reach Dehradun",
    "Drive to Barsu (6–7 hrs)",
    "Start trek from Barsu"
  ],

  packingList: [
    "Warm layers",
    "Trekking shoes",
    "Gloves & cap",
    "Rain protection"
  ],

  altitudeProfile: [
    "Barsu – 2,200 m",
    "Barnala Tal – 2,700 m",
    "Dayara Bugyal – 3,750 m"
  ],

  permits: "Local forest permit required",

  risksAndSafety: [
    "Snow in winter",
    "Slippery trails",
  ],

  updatedAt: '2026-04-01',

  relatedBlogSlugs: [
    'dayara-bugyal-trek-cost',
    'dayara-bugyal-best-time',
    'dayara-bugyal-difficulty',
    'dayara-bugyal-packing-list',
  ],
};

export default dayaraBugyalTrek;
