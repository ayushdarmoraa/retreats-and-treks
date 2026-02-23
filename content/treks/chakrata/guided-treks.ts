import { TrekContent } from '@/types/content';

const guidedTreks: TrekContent = {
  slug: 'guided-treks',
  title: 'Chakrata Guided Treks',
  description:
    'Expert-guided trekking experiences in Chakrata. Scenic trails, experienced local guides, nature interpretation, and safe outdoor adventure. Flexible durations from day treks to multi-day expeditions.',

  locationId: 'chakrata',
  trekType: 'Guided Trek',

  difficulty: 'Moderate',
  distance: '10-15 km',
  altitude: '2000-2400 m',

  duration: '1-3 Days (flexible)',
  bestSeason: ['February', 'March', 'April', 'September', 'October', 'November'],
  pickupPoint: 'Dehradun',

  overview:
    'Explore Chakrata with expert guides who know every trail, viewpoint, and hidden gem. These guided treks combine adventure with education, offering insights into local ecology, culture, and mountain living.',

  highlights: [
    'Expert local guides',
    'Nature and ecology interpretation',
    'Flexible trek durations',
    'Off-the-beaten-path trails',
    'Photography opportunities',
  ],

  itinerary: [
    'Day 1: Pickup from Dehradun, guide briefing, trek start, forest exploration, basecamp setup',
    'Day 2: Full-day guided trek, nature walks, local viewpoints, evening activities',
    'Day 3: Optional extended trek or return to Dehradun',
  ],

  inclusions: [
    'Experienced guide',
    'Meals (on multi-day treks)',
    'Local transfers',
    'First aid support',
  ],

  exclusions: [
    'Travel insurance',
    'Personal equipment',
    'Extra meals',
  ],

  images: [
    {
      src: '/images/chakrata-guided-trek-1.jpg',
      alt: 'Guided group trekking in Chakrata',
    },
  ],

  faqs: [
    {
      question: 'Can I customize my trek duration?',
      answer:
        'Yes. Guided treks can be customized from day-long to multi-day experiences based on your preference.',
    },
    {
      question: 'What size are guided trek groups?',
      answer:
        'Groups typically consist of 4-8 people for a personalized experience.',
    },
  ],
};

export default guidedTreks;
