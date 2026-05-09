/**
 * TREK & PAINT RETREAT SERVICE
 * First-class service definition, location-agnostic
 * Combines Himalayan trekking with plein-air painting
 */

export const trekAndPaintRetreat = {
  slug: 'trek-and-paint',
  title: 'Trek & Paint Retreat',
  oneLineEssence: 'Walk the Himalayas by day, paint what you see by evening — where trail meets canvas.',
  seoTitle: 'Trek & Paint Retreat in the Himalayas — Plein Air Art & Mountain Hiking | Retreats And Treks',
  seoDescription: 'Combine Himalayan trekking with plein air painting. Walk forest trails by morning, paint mountain landscapes by afternoon. No art or hiking experience needed. 5–7 days in Chakrata, Uttarakhand.',

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

  keyHighlights: ['From ₹22,000', '5–7 Days', 'Chakrata Trails', 'Moderate Walking', 'Art Supplies Included'],

  description: `\
Trek & Paint is for people who want to move through landscapes — not just look at them. Each day combines a Himalayan trek with outdoor painting sessions at the most striking viewpoints along the trail.

This is not a painting class with a hike attached. The walking IS the creative preparation. Hours of rhythmic movement through forests, ridgelines, and valleys quiet the mind and open perception. By the time you stop to paint, you are seeing differently.

Mornings are for walking. We follow trails through deodar forests, along ridgelines, past waterfalls. Afternoons, we stop at carefully chosen viewpoints and paint. Watercolors, pencils, ink — whatever feels right. No experience needed. The mountain is patient.

By the end, you'll have a visual journal of landscapes you walked through — and the quiet confidence that comes from having made something real in beautiful places.`,

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
      { title: 'Movement as Preparation', description: 'Hours of walking through forests and ridgelines quiet your mind. By the time you paint, you\'re seeing with fresh eyes — not thinking about technique.' },
      { title: 'Real Landscapes, Not Photos', description: 'You paint what\'s in front of you — shifting light, moving clouds, the actual mountain. This is fundamentally different from working from photos in a studio.' },
      { title: 'Visual Journaling', description: 'Each day produces pages in your visual journal — sketches, watercolors, notes. You leave with a physical record of every trail and viewpoint.' },
      { title: 'Accessible to Everyone', description: 'No art experience required. No trekking experience required beyond basic fitness. The trails are moderate and the painting is guided.' },
    ],
  },

  experiences: [
    { title: 'Morning Trek', description: 'Each day begins with a 3–5 hour trek through Himalayan forest, ridgeline, or valley trails. The pace is intentionally moderate — fast enough to cover ground, slow enough to notice.' },
    { title: 'Trailside Painting Sessions', description: 'At selected viewpoints along the trail, we stop to paint. The facilitator offers technique guidance — composition, color mixing, light capture — while you work from the live landscape.' },
    { title: 'Evening Art Review', description: 'After dinner, we review the day\'s work together. Not critique — appreciation. Seeing what others noticed in the same landscape teaches you to see differently.' },
    { title: 'Solo Sketching Time', description: 'Rest days include unstructured time for solo sketching anywhere on the property or nearby trails. Some of the best work happens in these quiet hours.' },
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
      'Anyone who finds creativity through physical movement',
    ],
    notFor: [
      'Those seeking intensive technical art training',
      'People who prefer sedentary retreat formats',
      'Anyone looking for challenging high-altitude treks (our trails are moderate)',
    ],
  },

  howItWorks: {
    rhythm: `\
Mornings begin at sunrise with tea and a light breakfast. We pack art supplies and water, and hit the trail by 7:30 AM.

The trek lasts 3–5 hours depending on the day, with frequent stops to observe and quick-sketch interesting subjects.

After lunch at a viewpoint or camp, the afternoon is dedicated painting time. The facilitator guides composition and technique while you work from the live landscape.

Evenings are relaxed. Dinner, then optional sharing of the day's work. The group sees the same trail through different eyes — and that's part of the learning.

Rest days are built in for solo exploration and sustained painting sessions.`,
  },

  whereItWorksBest: {
    primary: 'chakrata' as const,
    primaryReason: 'Dense forests, varied terrain, and stunning ridge viewpoints make Chakrata ideal for combining walking with painting.',
    alsoWorks: ['mussoorie', 'sankri'],
    contextByLocation: {
      chakrata: 'Forest trails with dramatic viewpoints — the variety of terrain keeps both the walking and the painting engaging.',
      mussoorie: 'Accessible trails with panoramic views. The colonial hill station aesthetic adds an interesting architectural subject.',
      sankri: 'Higher altitude trails with snow-capped peaks. For painters who want dramatic Himalayan subjects.',
      rishikesh: 'River valley walks with the Ganges as a central subject. More spiritual landscape, less mountain panorama.',
      munsiyari: 'Remote alpine beauty with Panchachuli peaks. For experienced trekkers who want extreme landscape subjects.',
    },
  },

  adaptability: `\
Trek & Paint adapts to your fitness and art level. Trails can be shortened. Painting sessions can be extended. Rest days can be added.

Solo retreat offers total immersion in your own creative rhythm. Group retreats create a traveling art studio — you paint alongside others and learn from how they see. Pair retreats are particularly compelling for couples or friends who trek together.`,

  invitation: `\
Walk the Himalayas. See them differently. Paint what you find. Trek & Paint is for anyone who believes that the best art comes from being fully present in a landscape — not just passing through it.`,

  foodAndAccommodation: 'Simple, nutritious meals prepared with local ingredients. Accommodation ranges from guesthouses to tented camps depending on the trail. Emphasis on comfort without luxury — the landscape is the luxury.',

  travel: {
    fromDelhi: 'Drive to Dehradun (5–6 hours) or fly to Dehradun airport. We arrange pickup from there.',
    fromDehradun: 'Drive to the trailhead (2–4 hours depending on location). We handle all logistics.',
    note: 'All art supplies (watercolors, paper, pencils, ink) are provided. Bring your own if you prefer.',
  },

  faqItems: [
    {
      question: 'Do I need trekking experience?',
      answer: 'No. The trails are moderate — 3–5 hours of walking at a gentle pace through forests and ridgelines. If you can walk for a few hours on a trail, you are ready. This is not mountaineering; it is walking through beautiful landscapes with deliberate stops for art.',
    },
    {
      question: 'Do I need painting experience?',
      answer: 'No. The facilitator guides you through techniques — composition, colour mixing, capturing light — at your level. Many participants have never painted outdoors before. The mountain landscape is patient and forgiving as a subject. Some of the most compelling work comes from complete beginners.',
    },
    {
      question: 'What art supplies are provided?',
      answer: 'All supplies: watercolours, pencils, ink, sketchbooks, and paper. Everything is selected for portability on the trail. If you have preferred materials, bring them — we can accommodate. The emphasis is on capturing the experience, not producing gallery-ready work.',
    },
    {
      question: 'How much do we trek vs paint each day?',
      answer: 'Roughly half and half. Mornings are typically 3–5 hours of trekking. Afternoons are dedicated painting time at viewpoints discovered along the trail. Rest days are built in for sustained painting sessions or solo exploration.',
    },
    {
      question: 'What fitness level is required?',
      answer: 'Moderate fitness: ability to walk 3–5 hours on uneven terrain at a comfortable pace with a daypack. We carry art supplies in shared packs. The trails involve gradual elevation gain — not steep climbs. If you walk regularly, you are likely ready.',
    },
    {
      question: 'Where does this retreat take place?',
      answer: 'Primarily in Chakrata — dense forests, dramatic viewpoints, and varied terrain perfect for both walking and painting. Also available in Mussoorie (more accessible) and Sankri (higher altitude, snow-capped peak subjects). All locations are in Uttarakhand, India.',
    },
    {
      question: 'Do I keep the art I create?',
      answer: 'Yes — your visual journal, sketches, and paintings are entirely yours. You leave with a physical record of every trail and viewpoint you experienced. Many participants frame their work or continue the practice at home.',
    },
    {
      question: 'What is the accommodation like?',
      answer: 'Comfortable guesthouses or tented camps depending on the trail. Warm bedding, hot meals, and mountain views. The accommodation ranges from simple to basic — the landscape is the luxury. All meals are included.',
    },
    {
      question: 'Can I join as a solo traveller?',
      answer: 'Absolutely. Many participants come solo. The group format (max 10) creates natural connection through shared experience — walking the same trail, painting the same view, sharing work over dinner. It is one of the most bonding retreat formats we offer.',
    },
    {
      question: 'What is the best season for Trek & Paint?',
      answer: 'Autumn (October–November) offers the clearest skies and best mountain visibility — ideal for painting distant peaks. Spring (March–May) brings wildflowers and soft light. Both seasons provide comfortable trekking temperatures. Monsoon is avoided due to trail conditions.',
    },
  ],
} as const;
