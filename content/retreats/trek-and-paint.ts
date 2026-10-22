/**
 * TREK & PAINT RETREAT SERVICE
 * First-class service definition, location-agnostic
 * Combines Himalayan trekking with plein-air painting
 */

export const trekAndPaintRetreat = {
  slug: 'trek-and-paint',
  title: 'Trek & Paint Retreat',
  oneLineEssence: 'Walk the Himalayas by day, paint what you see by evening — where trail meets canvas.',
  seoTitle: 'Trek & Paint Retreat | Retreats And Treks',
  seoDescription: 'Trek and paint in Chakrata with forest walks, plein air painting, mountain landscapes, and 5–7 day creative retreat formats.',

  /* ── Visual Assets ── */
  heroImage: '/Images/art-retreat/chaitra/outdoor-easel-painting-art-retreat.webp',
  heroAlt: 'Outdoor easel painting during an art retreat with Chaitra Ram — real plein air creative practice',
  signatureImage: '/Images/art-retreat/chaitra/garden-canvas-painting-art-retreat.webp',
  signatureAlt: 'Garden canvas painting during a real art retreat guided by Chaitra Ram',
  signatureQuote: `The mountain does not pose for you. It simply is. And somehow, that is enough.`,
  galleryImages: [
    { src: '/Images/art-retreat/chaitra/outdoor-easel-painting-art-retreat.webp', alt: 'Outdoor easel painting during a real Himalayan art retreat' },
    { src: '/Images/art-retreat/chaitra/garden-canvas-painting-art-retreat.webp', alt: 'Garden canvas painting session during an art retreat' },
    { src: '/Images/art-retreat/chaitra/group-art-retreat-participants-paintings.webp', alt: 'Participants holding paintings created during an art retreat' },
    { src: '/Images/art-retreat/art-supplies.webp', alt: 'Art supplies provided for painting and creative retreat sessions' },
  ],

  keyHighlights: ['Pricing on enquiry', '5–7 Days', 'Route Confirmed Before Booking', 'Walking & Outdoor Art', 'Art Supplies — Confirm Details'],

  description: `\
Trek & Paint is for people interested in combining walks in Himalayan landscapes with outdoor painting. The format pairs time on trails with opportunities to observe and make work from the surrounding landscape.

This is not a painting class with a hike attached. Walking and outdoor art-making are both part of the retreat format; the confirmed route and schedule depend on the specific programme.

The confirmed itinerary determines where and how far participants walk and which outdoor art-making settings are included. Contact the team for current route, terrain, schedule, and supply details.

Participants can record observations and artwork from the landscapes they visit. The work created and each participant's experience will vary.`,

  idealIf: [
    'You love being outdoors and want to add a creative layer to your trekking',
    'You want to paint but prefer active movement over sitting in a studio',
    'You are drawn to plein air painting and want to learn in stunning landscapes',
    'You want a retreat that combines physical challenge with creative expression',
    'You want to slow down from trekking enough to actually see what you\'re walking through',
  ],

  whatMakesItUnique: {
    intro: 'Most art retreats are stationary. This one moves. You walk into the landscape, then paint from inside it.',
    points: [
      { title: 'Walking and Observation', description: 'Time outdoors can provide subjects for creative practice. The route and walking schedule depend on the confirmed itinerary.' },
      { title: 'Outdoor Observation', description: 'The confirmed itinerary determines whether outdoor art-making is included and which settings are available.' },
      { title: 'Creative Practice', description: 'Ask whether the current programme includes a visual journal or other materials to record observations.' },
      { title: 'Experience and Guidance', description: 'Ask the organizer about experience requirements and what creative guidance is included in the current programme.' },
    ],
  },

  experiences: [
    { title: 'Walking', description: 'Walking routes, terrain, distance, and daily schedule are confirmed for each programme before booking.' },
    { title: 'Outdoor Art Sessions', description: 'The itinerary may include opportunities to make art outdoors. Confirm the locations, materials, and facilitator guidance for the current programme.' },
    { title: 'Group Reflection', description: 'Ask whether group reflection or sharing is part of the current itinerary.' },
    { title: 'Independent Creative Time', description: 'Ask whether the current itinerary includes time for independent sketching or other creative practice.' },
  ],

  placesWeExplore: [
    { name: 'Forest Ridgelines', description: 'High points with 180° views of layered mountain ranges. Perfect for panoramic watercolor work.' },
    { name: 'Deodar Forest Trails', description: 'Filtered light through ancient trees. The interplay of shadow and sunlight creates compelling subjects.' },
    { name: 'Mountain Streams', description: 'Moving water is one of the most challenging and rewarding plein air subjects. We spend time learning to capture flow.' },
  ],

  forNotFor: {
    for: [
      'Trekkers who want to add a creative dimension to their walks',
      'Artists who want to paint outdoors in stunning locations',
      'Beginners who want to try painting in a non-judgmental setting',
      'People interested in combining outdoor activity and creative practice, subject to the confirmed itinerary',
    ],
    notFor: [
      'Those seeking intensive technical art training',
      'People who prefer sedentary retreat formats',
      'Anyone seeking a fixed route or difficulty level without confirming the current itinerary',
    ],
  },

  howItWorks: {
    rhythm: `\
The schedule, walking route, terrain, and time for art-making depend on the confirmed programme. Ask the organizer for the current itinerary, fitness requirements, and what materials or guidance are included before booking.`,
  },

  whereItWorksBest: {
    primary: 'chakrata' as const,
    primaryReason: 'Chakrata is listed as the primary setting for this format. Confirm the current route, terrain, and access details before booking.',
    alsoWorks: ['mussoorie', 'sankri'],
    contextByLocation: {
      chakrata: 'Ask about the current route, terrain, and access arrangements for Chakrata.',
      mussoorie: 'Ask whether the current programme includes Mussoorie and confirm route and access details.',
      sankri: 'Ask whether the current programme includes Sankri and confirm route and access details.',
      rishikesh: 'Ask whether the current programme includes Rishikesh and confirm route and access details.',
      munsiyari: 'Ask whether the current programme includes Munsiyari and confirm route and access details.',
    },
  },

  adaptability: `\
Ask the organizer whether the current route and schedule can be adapted to your fitness and art experience. Confirm any rest-day options before booking.
Confirm whether solo, group, or pair bookings and any schedule adaptations are available for your dates.`,

  invitation: `\
Walk the Himalayas. See them differently. Paint what you find. Trek & Paint is for anyone who believes that the best art comes from being fully present in a landscape — not just passing through it.`,

  foodAndAccommodation: 'Accommodation and meal arrangements depend on the confirmed itinerary. Contact the organizer for current details.',

  travel: {
    fromDelhi: 'Travel time and route depend on the confirmed destination. Contact the team for current directions and transfer information.',
    fromDehradun: 'The route and travel time depend on the confirmed trailhead. Ask the organizer about pickup and transport arrangements.',
    note: 'Confirm which art supplies are included for the current programme; you may ask whether personal materials can be brought.',
  },

  faqItems: [
    {
      question: 'Do I need trekking experience?',
      answer: 'Walking distance, terrain, and difficulty vary by itinerary. Ask the organizer for the confirmed route and fitness requirements before booking.',
    },
    {
      question: 'Do I need painting experience?',
      answer: 'No. The facilitator guides you through techniques — composition, colour mixing, capturing light — at your level. Many participants have never painted outdoors before. The mountain landscape is patient and forgiving as a subject. Some of the most compelling work comes from complete beginners.',
    },
    {
      question: 'What art supplies are provided?',
      answer: 'Materials depend on the confirmed programme. Ask which supplies are included and whether you may bring preferred personal materials.',
    },
    {
      question: 'How much do we trek vs paint each day?',
      answer: 'The balance of walking and art-making depends on the confirmed itinerary. Contact the organizer for the current daily schedule and any rest-day arrangements.',
    },
    {
      question: 'What fitness level is required?',
      answer: 'Fitness requirements depend on the route, terrain, and altitude. Ask the organizer for the current itinerary and its specific requirements before booking.',
    },
    {
      question: 'Where does this retreat take place?',
      answer: 'Chakrata is listed as the primary setting. Ask the organizer whether other locations are available and confirm the route, terrain, access, and current conditions for your dates.',
    },
    {
      question: 'Do I keep the art I create?',
      answer: 'Yes — your visual journal, sketches, and paintings are entirely yours. You leave with a physical record of every trail and viewpoint you experienced. Many participants frame their work or continue the practice at home.',
    },
    {
      question: 'What is the accommodation like?',
      answer: 'Accommodation and meal arrangements depend on the confirmed route and programme. Contact the organizer for current details before booking.',
    },
    {
      question: 'Can I join as a solo traveller?',
      answer: 'Contact the organizer to confirm whether solo bookings are available and what group arrangements apply to your dates.',
    },
    {
      question: 'What is the best season for Trek & Paint?',
      answer: 'Suitable dates depend on the confirmed route and current access and weather conditions. Contact the organizer for season-specific guidance before booking.',
    },
  ],
} as const;
