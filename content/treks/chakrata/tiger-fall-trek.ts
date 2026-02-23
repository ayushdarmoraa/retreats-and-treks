import { TrekContent } from '@/types/content';

const tigerFallTrek: TrekContent = {
  slug: 'tiger-fall-trek',
  title: 'Chakrata Tiger Fall Trek',
  description:
    'A scenic trek to Tiger Fall, a majestic waterfall near Chakrata. Forest trails, waterfall views, swimming opportunity, and nature immersion. 2 nights 3 days guided adventure from Dehradun.',

  locationId: 'chakrata',
  trekType: 'Waterfall Trek',

  difficulty: 'Moderate',
  distance: '12 km',
  altitude: '2000 m',

  duration: '2 Nights / 3 Days',
  bestSeason: ['July', 'August', 'September', 'October'],
  pickupPoint: 'Dehradun',

  overview:
    'Trek to the spectacular Tiger Fall, where crystal-clear waters cascade down mountain cliffs. This trek combines forested trails, river crossings, and swimming at the waterfall base. Best visited during monsoon and post-monsoon seasons.',

  highlights: [
    'Majestic waterfall views',
    'River crossings and water activities',
    'Swimming at waterfall pool',
    'Forest and alpine meadows',
    'Wildlife spotting opportunities',
  ],

  itinerary: [
    'Day 1: Pickup from Dehradun, trek begins through forest, basecamp near waterfall trail',
    'Day 2: Full trek to Tiger Fall, swimming and exploration, waterfall camping',
    'Day 3: Return trek, breakfast, drop to Dehradun',
  ],

  inclusions: [
    'All meals',
    'Guide services',
    'Camping equipment',
    'Local transfers',
  ],

  exclusions: [
    'Travel insurance',
    'Personal trekking gear',
    'Swimming gear',
  ],

  images: [
    {
      src: '/images/chakrata-tiger-fall-1.jpg',
      alt: 'Tiger Fall waterfall in Chakrata',
    },
  ],

  faqs: [
    {
      question: 'When is the best time to trek Tiger Fall?',
      answer:
        'July to October, when water flow is strong and weather is stable. Best in September-October.',
    },
    {
      question: 'Is swimming safe at Tiger Fall?',
      answer:
        'Yes, with proper precautions. Guides ensure safety and provide instruction.',
    },
  ],
};

export default tigerFallTrek;
