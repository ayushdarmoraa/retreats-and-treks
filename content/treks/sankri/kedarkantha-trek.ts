import { TrekContent } from '@/types/content';

const kedarkanthaTrek: TrekContent = {
  slug: 'kedarkantha-trek',
  title: 'Kedarkantha Trek',
  description:
    'A classic winter snow trek to Kedarkantha summit in Sankri. Snow-covered peaks, high-altitude passes, panoramic views, and mountaineering experience. 5 days from Sankri basecamp.',

  locationId: 'sankri',
  trekType: 'Weekend Trek',

  difficulty: 'Challenging',
  distance: '25 km',
  altitude: '3810 m',

  duration: '5 Days / 4 Nights',
  bestSeason: ['December', 'January', 'February'],
  pickupPoint: 'Sankri',

  overview:
    'Kedarkantha is one of Uttarakhand\'s most iconic winter snow treks, offering panoramic Himalayan views and the challenge of summiting a 3810m peak. The trek combines high-altitude passes, snow trails, and mountain camping for an unforgettable alpine experience.',

  highlights: [
    'Snow-covered summit with 360-degree views',
    'High-altitude alpine terrain',
    'Crystal-clear mountain air',
    'Established camps at scenic locations',
    'Professional guide support and safety protocols',
  ],

  itinerary: [
    'Day 1: Sankri arrival, acclimatization walk, camp setup',
    'Day 2: Trek to Juda Ka Talab camp, high-altitude experience',
    'Day 3: Summit day — early start, climb to Kedarkantha peak, descent to camp',
    'Day 4: Return trek, preparation for exit',
    'Day 5: Final descent to Sankri',
  ],

  inclusions: [
    'Camp accommodation',
    'All meals',
    'Professional guide',
    'Safety equipment',
    'Local transfers',
  ],

  exclusions: [
    'Travel to Sankri',
    'Personal trekking gear',
    'Travel insurance',
    'Permits (if required)',
  ],

  images: [
    {
      src: '/images/trek-kedarkantha-1.jpg',
      alt: 'Kedarkantha summit in winter snow',
    },
  ],

  faqs: [
    {
      question: 'What is the altitude sickness risk?',
      answer:
        'Altitude sickness is possible at 3800m. We recommend prior acclimatization treks and consulting with a doctor.',
    },
    {
      question: 'How experienced do I need to be?',
      answer:
        'This is a challenging trek. Prior trekking experience (2-3 multi-day treks) is strongly recommended.',
    },
    {
      question: 'What about snow and weather?',
      answer:
        'Winter weather is unpredictable. We track conditions closely and may adjust or postpone for safety.',
    },
  ],
};

export default kedarkanthaTrek;
