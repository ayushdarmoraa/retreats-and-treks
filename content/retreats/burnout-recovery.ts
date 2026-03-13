/**
 * BURNOUT RECOVERY RETREAT SERVICE
 * First-class service definition, location-agnostic
 */

export const burnoutRecoveryRetreat = {
  slug: 'burnout-recovery',
  title: 'Burnout Recovery Retreat in the Himalayas',
  oneLineEssence: 'A weekend mountain retreat designed to help you disconnect from constant work pressure and reconnect with nature, slow living, and meaningful rest.',

  description: `
Spend three days in the quiet forests of Chakrata exploring waterfalls, mountain trails, local villages, and the unique Jaunsaari culture while enjoying authentic pahadi food and peaceful Himalayan landscapes.

Modern work culture rarely allows people to truly pause.

Long working hours, constant notifications, deadlines, and screen time often create a feeling of mental exhaustion that slowly builds into burnout.

This retreat offers a simple alternative: step away from the city and spend a weekend in the mountains.

Set in the peaceful Himalayan region of Chakrata, this retreat focuses on slowing down and reconnecting with the natural world. Instead of structured therapy sessions or intensive workshops, the experience revolves around nature, culture, and simple moments of rest.

During the retreat, you will explore forest trails, visit waterfalls, walk through local villages, experience traditional Jaunsaari culture, and enjoy freshly prepared mountain food.

The goal is not to "fix" burnout in a weekend, but to create the space where your mind and body can begin to relax again.

By the end of the retreat, many participants simply feel something they had forgotten: mental quiet and clarity.
  `.trim(),

  keyHighlights: [
    '3-Day Weekend Retreat (Friday–Sunday)',
    'Small Group Experience',
    'All Meals & Accommodation Included',
    'Guided Local Exploration',
    'Departures from Delhi and Dehradun',
  ],

  forNotFor: {
    for: [
      'Professionals experiencing work fatigue or stress',
      'Entrepreneurs and freelancers needing a break from constant productivity',
      'People feeling mentally drained from city life',
      'Remote workers who spend most of their day in front of screens',
      'Anyone seeking a short nature escape in the Himalayas',
    ],
    notFor: [
      'People looking for structured therapy or clinical treatment',
      'Those expecting intensive workshops or productivity coaching',
      'Anyone wanting strenuous trekking or adventure activities',
      'People uncomfortable with slow-paced, nature-focused experiences',
      'Those seeking luxury resort-style accommodation',
    ],
  },

  idealIf: [
    'you feel mentally exhausted from constant work pressure',
    'you want a short break from city life',
    'you want to spend time in nature without planning everything',
    'you enjoy exploring mountain landscapes and waterfalls',
    'you want a meaningful weekend reset',
  ],

  whatMakesItUnique: {
    intro: 'Unlike structured wellness programs, this retreat focuses on simple mountain experiences that naturally help people slow down and reset.',
    points: [
      {
        title: 'Nature First Experience',
        description: 'Most of the retreat is spent outdoors exploring forests, waterfalls, and mountain viewpoints.',
      },
      {
        title: 'Authentic Local Culture',
        description: 'Participants experience the Jaunsaari culture of the region through village visits and local food.',
      },
      {
        title: 'Small Group Atmosphere',
        description: 'The retreat keeps groups small to create a relaxed and personal experience.',
      },
      {
        title: 'Unstructured Time',
        description: 'The retreat avoids rigid schedules, allowing participants to rest and explore at their own pace.',
      },
    ],
  },

  experiences: [
    {
      title: 'Forest Walks',
      description: 'Slow walks through deodar and pine forests around Chakrata.',
    },
    {
      title: 'Tiger Falls Exploration',
      description: 'Visit one of the highest waterfalls in Uttarakhand.',
    },
    {
      title: 'Village Exploration',
      description: 'Discover local Jaunsaari villages and learn about regional traditions.',
    },
    {
      title: 'Sunrise & Sunset Views',
      description: 'Experience panoramic Himalayan views from scenic viewpoints.',
    },
    {
      title: 'Bonfire Evenings',
      description: 'Relaxed evenings around the fire under clear mountain skies.',
    },
  ],

  placesWeExplore: [
    { name: 'Tiger Falls', description: 'One of the most beautiful waterfalls in the region surrounded by forest.' },
    { name: 'Moila Top', description: 'A scenic hilltop offering wide Himalayan views.' },
    { name: 'Budher Caves', description: 'A natural cave system with local mythological stories.' },
    { name: 'Chilmiri Viewpoint', description: 'A peaceful spot known for sunset and sunrise views.' },
  ],

  howItWorks: {
    rhythm: `
Friday — Arrival & Welcome
Participants travel from Delhi or Dehradun and arrive in Chakrata by evening. After settling into the accommodation, the group gathers for a welcome dinner and introductions. The evening ends with a relaxed bonfire under the stars.

Saturday — Nature & Exploration
The day begins with a peaceful morning walk in the forest. After breakfast, the group visits Tiger Falls and spends time exploring the surrounding landscape. Later in the day, participants explore nearby villages and learn about the local culture of the Jaunsar region. The evening includes a sunset viewpoint visit followed by dinner and a bonfire gathering.

Sunday — Sunrise & Departure
The final day begins with an optional sunrise viewpoint visit. After breakfast, the group explores another scenic location such as Moila Top or Budher Caves before beginning the journey back. Participants return to Delhi or Dehradun by evening.
    `.trim(),
  },

  foodAndAccommodation: 'Accommodation is arranged in comfortable mountain stays surrounded by forests. Meals include traditional pahadi cuisine prepared with local ingredients. All meals during the retreat are included.',

  locationInfo: {
    name: 'Chakrata',
    description: 'Chakrata is a quiet hill region in Uttarakhand known for its forests, waterfalls, and peaceful mountain landscapes. Unlike crowded hill stations, the area remains calm and relatively untouched.',
  },

  travel: {
    fromDelhi: 'Travel from Delhi takes approximately 6–7 hours by road.',
    fromDehradun: 'Chakrata is about a 3 hour drive from Dehradun.',
    note: 'Detailed travel instructions are shared after registration.',
  },

  whereItWorksBest: {
    primary: 'chakrata' as const,
    primaryReason: 'The quiet forests, waterfalls, and mountain views around Chakrata create the perfect environment for disconnecting from work stress. Unlike crowded hill stations, Chakrata remains peaceful and undisturbed.',
    alsoWorks: ['sankri', 'munsiyari'],
    contextByLocation: {
      sankri: 'The remoteness and altitude create a genuine break from the system that broke you.',
      chakrata: 'For those newly burnt out, the forest supports gentle healing without extremity.',
      munsiyari: 'For those at deep threshold, the alpine terrain mirrors transformation.',
      mussoorie: 'A softer recalibration path for those needing gentleness first.',
      rishikesh: 'Spiritual ground supports meaning reconstruction through tradition and practice.',
    },
  },

  adaptability: `
This retreat adapts to where you actually are. If you are very depleted, the pacing is gentler and more restorative. If you are ready for deeper exploration, we can extend the itinerary.

This retreat runs periodically throughout the year depending on season and group availability. Upcoming retreat dates and availability can be found on request.
  `.trim(),

  invitation: `
If you are experiencing burnout — if constant work pressure has left you feeling drained — this retreat is built for you. Talk to us. We will find the timing and group that makes sense for where you actually are.
  `.trim(),

  faqItems: [
    {
      question: 'Is this retreat suitable for beginners?',
      answer: 'Yes. The activities involve light hiking and exploration rather than strenuous trekking.',
    },
    {
      question: 'Do I need previous trekking experience?',
      answer: 'No previous trekking experience is required.',
    },
    {
      question: 'What should I bring?',
      answer: 'Participants receive a packing list after registration.',
    },
    {
      question: 'Is the retreat suitable for solo travelers?',
      answer: 'Yes. Many participants join the retreat alone and enjoy meeting like-minded people.',
    },
    {
      question: 'Where is this retreat held?',
      answer: 'This retreat is held in Chakrata, a quiet hill town in the Himalayas of Uttarakhand. It is approximately 6–7 hours from Delhi and 3 hours from Dehradun.',
    },
    {
      question: 'What does the retreat include?',
      answer: 'The retreat includes all meals, accommodation, guided exploration of local sites, and bonfire evenings. Transportation details are shared after registration.',
    },
  ],
} as const;
