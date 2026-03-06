import { TrekContent } from '@/types/content';

const roopkundTrek: TrekContent = {
  slug: 'roopkund-trek',
  title: 'Roopkund Trek (4,800m) – Mystery Lake Expedition from Lohajung',
  description:
    'Trek to the legendary Roopkund skeleton lake at 4,800m in the Garhwal Himalayas. 7 days, 53 km from Lohajung through Bedni Bugyal meadows and glacial terrain. Challenging. Best: May–Jun & Sep–Oct.',

  locationId: 'lohajung',
  trekType: 'Guided Trek',

  difficulty: 'Challenging',
  distance: '53 km',
  altitude: '4800 m',

  duration: '7 Days / 6 Nights',
  bestSeason: ['May', 'June', 'September', 'October'],
  pickupPoint: 'Lohajung',

  overview:
    'Roopkund is one of India\'s most iconic treks — a high-altitude route to a glacial lake at 4,800 metres, famous for the ancient skeletal remains discovered on its shores. The trail climbs from Lohajung through dense forests, vast alpine meadows (Bugyal), and glacial moraines to reach the frozen or thawing lake depending on the season.\n\nThis is a demanding trek that requires genuine physical fitness and comfort with high-altitude exposure. The reward is a landscape unlike anything else in the Indian Himalayas — the Bugyal meadows alone justify the effort, stretching kilometres in every direction with unbroken views of the Trishul and Nanda Ghunti ranges.',

  highlights: [
    'Roopkund Lake at 4,800 m — the mystery lake',
    'Vast Bugyal meadows — among the largest alpine grasslands in India',
    'Views of Trishul (7,120 m) and Nanda Ghunti (6,309 m)',
    'Diverse terrain — forest, meadow, moraine, glacier',
    'Historical and archaeological significance',
  ],

  itinerary: [
    'Day 1: Lohajung to Didina village (8 km, gradual ascent through oak forest)',
    'Day 2: Didina to Ali Bugyal (5 km, treeline to vast meadows)',
    'Day 3: Ali Bugyal to Ghora Lotani (4 km, acclimatisation and meadow traverse)',
    'Day 4: Ghora Lotani to Bhagwabasa (6 km, steep ascent above treeline)',
    'Day 5: Bhagwabasa to Roopkund Lake and return to Bhagwabasa (summit day, 5 km)',
    'Day 6: Bhagwabasa to Bedni Bugyal (descent through meadows, 10 km)',
    'Day 7: Bedni Bugyal to Wan to Lohajung (15 km descent, drive back)',
  ],

  inclusions: [
    'All meals during trek',
    'Camping and tent accommodation',
    'Expert trek leader, guide, and support staff',
    'Safety and medical equipment',
    'Forest and camping permits',
    'Porter support for common equipment',
  ],

  exclusions: [
    'Travel to/from Lohajung',
    'Personal trekking gear, clothing, and daypack',
    'Travel and medical insurance',
    'Tips and gratuities',
    'Any meals outside trek dates',
  ],

  images: [
    { src: '/images/treks/roopkund-1.jpg', alt: 'Roopkund lake with mountain backdrop' },
  ],

  monthlyConditions: [
    { month: 'May', conditions: 'Pre-monsoon window opens. Snow recedes below 4,000 m but the pass and lake remain snow-covered. Temperatures: 5°C to -5°C at upper camps. Alpine flowers begin on Bugyal meadows. Clear mornings, afternoon clouds possible. Best month for first-timers on this route.' },
    { month: 'June', conditions: 'Late pre-monsoon. Snow mostly gone below 4,200 m. Lake may be partially thawed. Temperatures: 8°C to -2°C at Bhagwabasa. Longer daylight and warmer conditions but monsoon can arrive by late June. Book early June for safest weather window.' },
    { month: 'September', conditions: 'Post-monsoon begins. Trails can be wet and slippery in early September. By mid-September conditions stabilise — skies clear, air freshens. Temperatures: 3°C to -6°C at upper camps. Fewer trekkers than May. Lush green Bugyals after the rains.' },
    { month: 'October', conditions: 'Peak post-monsoon. The best month for visibility — razor-sharp Trishul and Nanda Ghunti views. Dry trails, clear skies, crisp air. Temperatures: 0°C to -8°C at Bhagwabasa. Nights are cold but days are ideal for trekking. Most reliable weather window of the year.' },
  ],

  faqs: [
    {
      question: 'How difficult is the Roopkund trek?',
      answer: 'Roopkund is rated Challenging. It reaches 4,800 m with steep sections, glacial moraines, and potential snow. Prior multi-day trekking experience at altitude (above 3,500 m) is strongly recommended.',
    },
    {
      question: 'Is Roopkund open for trekking in 2025–2026?',
      answer: 'Roopkund is subject to permit restrictions that may change seasonally. As of 2025, trekking requires a forest department permit obtained at the Lohajung check post and must be done with an authorised operator. Check current permit availability with the Uttarakhand forest department before planning. When open, the best windows are May–June and September–October.',
    },
    {
      question: 'What fitness level is required?',
      answer: 'You should be able to walk 8–10 hours on consecutive days at altitude. Regular cardiovascular training (running, cycling, stair climbing) for at least 8 weeks before the trek is recommended.',
    },
  ],

  updatedAt: '2026-03-05',
};

export default roopkundTrek;
