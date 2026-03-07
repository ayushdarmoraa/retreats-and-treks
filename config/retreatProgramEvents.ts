/**
 * RETREAT PROGRAM EVENTS — Scheduled retreat batches with dates, pricing, availability
 * ─────────────────────────────────────────────────────────────────────────────────────
 * Each event is a specific dated retreat at a specific location.
 * These are the pages that actually convert into bookings.
 *
 * Slug format: {location}-{experience}-retreat-{month}-{year}
 * Example:     zanskar-meditation-retreat-june-2026
 *
 * Modeled after config/departures.ts (trek departures) but for retreats.
 */

import type { LocationId } from './locations';

// ── Types ────────────────────────────────────────────────────────────────

export interface RetreatProgramEvent {
  /** URL slug: zanskar-meditation-retreat-june-2026 */
  readonly slug: string;
  /** Experience type slug from experiencePages (e.g. 'meditation-retreats') */
  readonly experienceSlug: string;
  /** Retreat service slug from services (e.g. 'meditation-and-silence') */
  readonly serviceSlug: string;
  /** Location */
  readonly locationId: LocationId;
  readonly locationName: string;
  /** Display label */
  readonly label: string;
  /** Full page title */
  readonly title: string;
  readonly h1: string;
  readonly metaDescription: string;
  /** Editorial intro paragraph */
  readonly intro: string;
  /** Date info */
  readonly dateRange: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly durationDays: number;
  readonly month: string;
  readonly year: number;
  /** Pricing */
  readonly price: number;
  readonly currency: string;
  readonly priceNote: string;
  /** Capacity */
  readonly groupSize: number;
  readonly seatsLeft: number;
  readonly status: 'open' | 'filling-fast' | 'last-few' | 'sold-out';
  /** What's included */
  readonly included: readonly string[];
  /** What to bring */
  readonly toBring: readonly string[];
  /** Quick itinerary (day-level) */
  readonly quickItinerary: readonly string[];
  /** Related slugs for cross-linking */
  readonly parentExperienceSlug: string;
  readonly parentLocationSlug: string;
  readonly itinerarySlug: string;
  /** FAQ */
  readonly faqItems: readonly { question: string; answer: string }[];
}

// ── Event Definitions ────────────────────────────────────────────────────

const EVENTS: RetreatProgramEvent[] = [
  // ── Zanskar Meditation Retreat — June 2026 ─────────────────────────────
  {
    slug: 'zanskar-meditation-retreat-june-2026',
    experienceSlug: 'meditation-retreats',
    serviceSlug: 'meditation-and-silence',
    locationId: 'zanskar',
    locationName: 'Zanskar',
    label: 'Meditation Retreat',
    title: 'Zanskar Meditation Retreat — June 2026 | Retreats And Treks',
    h1: 'Zanskar Meditation Retreat — June 2026',
    metaDescription:
      '7-day meditation retreat in Zanskar, June 2026. Monastery setting at 3,500m. Small group (max 10). ₹45,000 all-inclusive. Limited seats.',
    intro:
      'Seven days of structured meditation practice in the Trans-Himalayan valley of Zanskar. The monastery tradition here stretches back over a thousand years. At 3,500 metres, the reduced oxygen naturally slows the thinking mind. June is the first month of the Zanskar season — passes have just opened, the valley is fresh, and the monsoon has not yet reached this rain-shadow region. This is the most immersive retreat we offer.',
    dateRange: '8 Jun – 14 Jun 2026',
    startDate: '2026-06-08',
    endDate: '2026-06-14',
    durationDays: 7,
    month: 'June',
    year: 2026,
    price: 45000,
    currency: 'INR',
    priceNote: 'Per person, all-inclusive. Leh pickup/drop, meals, accommodation, meditation instruction, internal transport.',
    groupSize: 10,
    seatsLeft: 7,
    status: 'open',
    included: [
      'Leh airport pickup and drop',
      'All road transport (Leh–Zanskar–Leh)',
      'Accommodation in monastery guesthouse / retreat lodge',
      'Three vegetarian meals daily',
      'Guided meditation sessions (3x daily)',
      'Dharma talks by resident teacher',
      'Walking meditation walks',
      'All permits and fees',
    ],
    toBring: [
      'Warm layers (temperatures drop at night even in June)',
      'Comfortable meditation clothing',
      'Personal medication',
      'Journal and pen',
      'Headlamp or torch',
      'Sunscreen and sunglasses (high-altitude UV)',
    ],
    quickItinerary: [
      'Day 1: Arrive Leh → Acclimatization rest',
      'Day 2: Drive to Zanskar valley (8 hrs through high passes)',
      'Day 3–6: Structured retreat — morning, afternoon, evening meditation',
      'Day 7: Closing session → Drive back toward Leh',
    ],
    parentExperienceSlug: 'meditation-retreats',
    parentLocationSlug: 'meditation-retreat-zanskar',
    itinerarySlug: '7-day-zanskar-meditation-retreat-itinerary',
    faqItems: [
      {
        question: 'How do I get to Zanskar for the June retreat?',
        answer: 'Fly to Leh (flights from Delhi, 1.5 hours). We pick you up from Leh airport. The drive to Zanskar takes one full day through high passes — Fotu La (4,108m) and Pensi La (4,400m). This drive is itself part of the journey — the landscape strips away everything unnecessary.',
      },
      {
        question: 'Is the altitude dangerous?',
        answer: 'At 3,500m, altitude effects are real but manageable. We include a full acclimatization day in Leh before driving to Zanskar. The retreat pace is intentionally slow — sitting meditation is not physically demanding. If you have severe respiratory or cardiac conditions, consult your doctor first.',
      },
      {
        question: 'What is the accommodation like?',
        answer: 'Simple but clean. Monastery guesthouse with individual rooms, shared bathrooms, hot water available. This is not a luxury resort — it is a practice environment. The simplicity is deliberate and supports the meditation.',
      },
      {
        question: 'Can I extend my stay in Zanskar after the retreat?',
        answer: 'Yes. We can arrange additional days for independent exploration, trekking to Phuktal Gompa, or river walks. Contact us to discuss extensions. June and July are the best months for post-retreat exploration in Zanskar.',
      },
    ],
  },

  // ── Chakrata Burnout Recovery — August 2026 ────────────────────────────
  {
    slug: 'chakrata-burnout-recovery-retreat-august-2026',
    experienceSlug: 'burnout-recovery-retreats',
    serviceSlug: 'burnout-recovery',
    locationId: 'chakrata',
    locationName: 'Chakrata',
    label: 'Burnout Recovery Retreat',
    title: 'Chakrata Burnout Recovery Retreat — August 2026 | Retreats And Treks',
    h1: 'Chakrata Burnout Recovery Retreat — August 2026',
    metaDescription:
      '5-day burnout recovery retreat in Chakrata, August 2026. Forest setting at 2,200m. Somatic therapy, rest, nervous system regulation. ₹28,000 all-inclusive.',
    intro:
      'Five days designed for people who have been running on empty. Chakrata in August is monsoon season — the forest is at its most alive, cloud cover wraps the ridge, and the air smells of wet deodar. It rains, and you rest. The sound of rain on the forest canopy is itself a form of therapy. This retreat does not ask you to do more. It asks you to stop.',
    dateRange: '10 Aug – 14 Aug 2026',
    startDate: '2026-08-10',
    endDate: '2026-08-14',
    durationDays: 5,
    month: 'August',
    year: 2026,
    price: 28000,
    currency: 'INR',
    priceNote: 'Per person, all-inclusive. Dehradun pickup/drop, meals, accommodation, all sessions.',
    groupSize: 8,
    seatsLeft: 6,
    status: 'open',
    included: [
      'Dehradun pickup and drop',
      'Accommodation in forest retreat house',
      'Three meals daily (Ayurvedic-influenced menu)',
      'Daily somatic therapy session',
      'Breathwork instruction',
      'Forest bathing walks',
      'One-on-one session with facilitator',
      'Re-entry guidance session on final day',
    ],
    toBring: [
      'Comfortable, loose clothing',
      'Rain jacket and waterproof shoes (monsoon season)',
      'Journal and pen',
      'Personal medication',
      'A book or nothing at all',
    ],
    quickItinerary: [
      'Day 1: Arrive Chakrata → Settle → Evening breathwork introduction',
      'Day 2: Somatic session + forest walk + extended rest',
      'Day 3: Deeper rest + body awareness practice + journalling',
      'Day 4: Gentle movement + one-on-one session + nature immersion',
      'Day 5: Re-entry planning session → Departure after lunch',
    ],
    parentExperienceSlug: 'burnout-recovery-retreats',
    parentLocationSlug: 'burnout-recovery-retreat-chakrata',
    itinerarySlug: '5-day-chakrata-burnout-recovery-retreat-itinerary',
    faqItems: [
      {
        question: 'Is August a good time for a retreat in Chakrata?',
        answer: 'August is monsoon season. It rains frequently, sometimes heavily. But for a burnout recovery retreat, this is actually ideal — the rain creates a natural cocoon, the forest is lush, and the cloud cover removes the pressure to be outdoors doing things. You are here to rest, and monsoon Chakrata supports that.',
      },
      {
        question: 'I am still working — can I bring my laptop?',
        answer: 'You can bring it, but we strongly recommend against using it. The retreat is 5 days. Your nervous system needs those 5 days without work stimulation. If you must check email, limit it to one 15-minute slot per day. The facilitator can help you set boundaries before arrival.',
      },
      {
        question: 'What if I break down emotionally during the retreat?',
        answer: 'That is expected and welcome. Burnout recovery often involves releasing suppressed emotion — exhaustion hides grief, frustration, and overwhelm. The facilitator is trained to hold space for this. You will not be judged or rushed. Emotional release is not a problem — it is part of the recovery.',
      },
      {
        question: 'How accessible is Chakrata from Delhi?',
        answer: 'Delhi → Dehradun (5.5 hours by train or 1 hour by flight). Dehradun → Chakrata (85 km, 3.5 hours by road). We handle Dehradun pickup and drop. Total travel time from Delhi: approximately 5–6 hours including pickup coordination.',
      },
    ],
  },

  // ── Chakrata Silent Retreat — October 2026 ─────────────────────────────
  {
    slug: 'chakrata-silent-retreat-october-2026',
    experienceSlug: 'silent-retreats',
    serviceSlug: 'meditation-and-silence',
    locationId: 'chakrata',
    locationName: 'Chakrata',
    label: 'Silent Retreat',
    title: 'Chakrata Silent Retreat — October 2026 | Retreats And Treks',
    h1: 'Chakrata Silent Retreat — October 2026',
    metaDescription:
      '7-day silent retreat in Chakrata, October 2026. Deodar forest at 2,200m. Noble silence, structured practice, small group (max 8). ₹32,000 all-inclusive.',
    intro:
      'Seven days of noble silence in the deodar forests of Chakrata. October is the finest month here — post-monsoon clarity, cool days, warm light through the trees, and absolute absence of tourist traffic. The forest provides the silence; we provide the structure. No conversation, no devices, no reading. Just you and the quiet that lives beneath everything.',
    dateRange: '5 Oct – 11 Oct 2026',
    startDate: '2026-10-05',
    endDate: '2026-10-11',
    durationDays: 7,
    month: 'October',
    year: 2026,
    price: 32000,
    currency: 'INR',
    priceNote: 'Per person, all-inclusive. Dehradun pickup/drop, meals, accommodation, all guided sessions.',
    groupSize: 8,
    seatsLeft: 5,
    status: 'filling-fast',
    included: [
      'Dehradun pickup and drop',
      'Accommodation in forest retreat house (single rooms)',
      'Three meals daily (eaten in silence)',
      'Guided meditation sessions (3x daily)',
      'Walking meditation in the forest',
      'Dharma talks (the only speech during the retreat)',
      'One-on-one teacher meeting (optional)',
    ],
    toBring: [
      'Comfortable meditation clothing',
      'Warm layers (October nights are cool at 2,200m)',
      'Headlamp or torch',
      'Journal and pen',
      'Personal medication',
    ],
    quickItinerary: [
      'Day 1: Arrive → Orientation → Silence begins after dinner',
      'Day 2–3: Establishing rhythm — sit, walk, eat, rest, sit',
      'Day 4–5: Deepening — extended sittings, minimal structure',
      'Day 6: Integration — practice meets daily activity',
      'Day 7: Silence breaks → Closing circle → Departure',
    ],
    parentExperienceSlug: 'silent-retreats',
    parentLocationSlug: 'silent-retreat-chakrata',
    itinerarySlug: '7-day-chakrata-silent-retreat-itinerary',
    faqItems: [
      {
        question: 'What does noble silence mean?',
        answer: 'No conversation, no phone, no email, no reading, no writing to others. You may journal for personal reflection. The teacher gives dharma talks and is available for one-on-one meetings. Other than that, no speech. Eye contact with others is left to what feels natural — some practitioners prefer to avoid it; others find it grounding.',
      },
      {
        question: 'What if I cannot handle 7 days of silence?',
        answer: 'Most people who fear the silence discover that the difficulty peaks on day 2–3 and then subsides. The structure carries you. If you genuinely need to speak, the teacher is available. We have never had anyone leave a retreat due to the silence itself — the challenge is usually boredom or emotional surfacing, not the quiet.',
      },
      {
        question: 'Is October 2026 the only scheduled silent retreat?',
        answer: 'No. We run silent retreats at various times throughout the year. October in Chakrata is our flagship offering. Additional dates in spring (March–April) and at other locations (Zanskar in summer, Munsiyari in autumn) will be published as they are confirmed.',
      },
      {
        question: 'Are rooms shared?',
        answer: 'No. Each participant has a private room. During a silent retreat, personal space is essential. Bathrooms may be shared (2 participants per bathroom), but rooms are individual.',
      },
    ],
  },

  // ── Rishikesh Yoga Retreat — March 2026 ────────────────────────────────
  {
    slug: 'rishikesh-yoga-retreat-march-2026',
    experienceSlug: 'yoga-retreats',
    serviceSlug: 'yoga-and-movement',
    locationId: 'rishikesh',
    locationName: 'Rishikesh',
    label: 'Yoga Retreat',
    title: 'Rishikesh Yoga Retreat — March 2026 | Retreats And Treks',
    h1: 'Rishikesh Yoga Retreat — March 2026',
    metaDescription:
      '5-day yoga retreat in Rishikesh, March 2026. Ganges riverbank location. Daily asana, pranayama, philosophy. Small group (max 12). ₹24,000 all-inclusive.',
    intro:
      'Five days of yoga practice on the banks of the Ganges. March is ideal — pre-heat, post-winter, the river is calm, and the light is warm without being harsh. Rishikesh carries a living lineage of yoga practice that no other location in the world can replicate. This retreat connects you to that lineage through daily practice, philosophical study, and the presence of the river itself.',
    dateRange: '16 Mar – 20 Mar 2026',
    startDate: '2026-03-16',
    endDate: '2026-03-20',
    durationDays: 5,
    month: 'March',
    year: 2026,
    price: 24000,
    currency: 'INR',
    priceNote: 'Per person, all-inclusive. Meals, accommodation, all yoga sessions, philosophy workshops.',
    groupSize: 12,
    seatsLeft: 8,
    status: 'open',
    included: [
      'Accommodation overlooking the Ganges',
      'Three Sattvic meals daily',
      'Morning asana practice (2 hours)',
      'Afternoon philosophy/technique workshop',
      'Evening pranayama and meditation',
      'One evening Ganga Aarti experience',
      'Basic Ayurvedic wellness consultation',
    ],
    toBring: [
      'Yoga mat (or we can provide)',
      'Comfortable practice clothing',
      'Light layers for morning practice',
      'Journal and pen',
      'Personal medication',
      'Water bottle',
    ],
    quickItinerary: [
      'Day 1: Arrive Rishikesh → Welcome → Gentle opening practice',
      'Day 2: Morning vinyasa → Philosophy workshop → Evening pranayama',
      'Day 3: Deepening practice → Alignment focus → Ganga walk',
      'Day 4: Self-led morning practice → Individual guidance → Aarti',
      'Day 5: Integration practice → Closing circle → Departure',
    ],
    parentExperienceSlug: 'yoga-retreats',
    parentLocationSlug: 'yoga-retreat-rishikesh',
    itinerarySlug: '5-day-rishikesh-yoga-retreat-itinerary',
    faqItems: [
      {
        question: 'What level of yoga experience is needed?',
        answer: 'All levels welcome. The teacher adjusts instruction to the group. If you are a complete beginner, you will receive foundation instruction. If you are experienced, the teacher offers advanced modifications. The group size (max 12) allows personal attention.',
      },
      {
        question: 'Is this a certification course?',
        answer: 'No. This is a practice retreat, not a teacher training. The focus is on your personal relationship with yoga — deepening your practice, understanding the philosophical context, and developing a sustainable home practice. No certificates are issued.',
      },
      {
        question: 'Where exactly in Rishikesh is the retreat?',
        answer: 'On the quieter side of the river, away from the market areas. The accommodation overlooks the Ganges with direct river access for morning walks. We deliberately avoid the commercial zones of Rishikesh — the retreat environment needs to be quiet, not touristic.',
      },
      {
        question: 'Can I arrive early or stay longer in Rishikesh?',
        answer: 'Yes. Rishikesh is easy to explore independently. We can help arrange accommodation before or after the retreat dates. Many participants stay an extra day or two to visit ashrams, walk along the river, or simply absorb the town.',
      },
    ],
  },

  // ── Sankri Stress Relief Retreat — April 2026 ──────────────────────────
  {
    slug: 'sankri-stress-relief-retreat-april-2026',
    experienceSlug: 'stress-relief-retreats',
    serviceSlug: 'rest-and-reset',
    locationId: 'sankri',
    locationName: 'Sankri',
    label: 'Stress Relief Retreat',
    title: 'Sankri Stress Relief Retreat — April 2026 | Retreats And Treks',
    h1: 'Sankri Stress Relief Retreat — April 2026',
    metaDescription:
      '5-day stress relief retreat in Sankri, April 2026. Mountain village at 2,000m. Breathwork, forest bathing, somatic therapy. ₹26,000 all-inclusive.',
    intro:
      'Five days of nervous system regulation in the Himalayan village of Sankri. April is spring in the mountains — apple blossoms, clear skies, and the kind of clean air that feels medicinal. Sankri sits at the edge of the Govind Wildlife Sanctuary, far from any city noise. The remoteness is not a bug — it is the primary therapeutic tool. Your stress patterns require separation from their triggers, and Sankri provides that separation physically.',
    dateRange: '14 Apr – 18 Apr 2026',
    startDate: '2026-04-14',
    endDate: '2026-04-18',
    durationDays: 5,
    month: 'April',
    year: 2026,
    price: 26000,
    currency: 'INR',
    priceNote: 'Per person, all-inclusive. Dehradun pickup/drop, meals, accommodation, all therapeutic sessions.',
    groupSize: 8,
    seatsLeft: 8,
    status: 'open',
    included: [
      'Dehradun to Sankri transport (7 hours — itself a decompression)',
      'Accommodation in mountain guesthouse',
      'Three meals daily (locally sourced)',
      'Daily breathwork sessions',
      'Forest bathing walks along the river',
      'Somatic therapy session',
      'Sound healing evening',
      'Re-entry planning session',
    ],
    toBring: [
      'Comfortable clothing',
      'Warm layers (nights at 2,000m are cool in April)',
      'Walking shoes for forest paths',
      'Journal and pen',
      'Personal medication',
    ],
    quickItinerary: [
      'Day 1: Drive Dehradun → Sankri → Settle → Evening breathwork',
      'Day 2: Breathwork + river walk + extended rest',
      'Day 3: Forest bathing + somatic session + journalling',
      'Day 4: Sound healing + movement + nature immersion',
      'Day 5: Re-entry planning → Drive back to Dehradun',
    ],
    parentExperienceSlug: 'stress-relief-retreats',
    parentLocationSlug: 'stress-relief-retreat-sankri',
    itinerarySlug: '5-day-sankri-stress-relief-retreat-itinerary',
    faqItems: [
      {
        question: 'How remote is Sankri?',
        answer: 'Very. It is a 7-hour drive from Dehradun through increasingly remote mountain roads. Phone signal is weak-to-absent. There is no nightlife, no restaurants, no commerce beyond a few village shops. This remoteness is the point — your nervous system cannot reset while still receiving the stimulation that overwhelmed it.',
      },
      {
        question: 'Is there phone/internet access?',
        answer: 'Intermittent phone signal (BSNL works best). No reliable internet. We recommend treating this as a feature. If you need to be reachable for emergencies, we can provide a local contact number that reaches the retreat house.',
      },
      {
        question: 'What is somatic therapy?',
        answer: 'Body-based therapeutic work that addresses stored stress through guided awareness, gentle movement, and breathwork. Stress is not only psychological — it lives in the body as tension, constriction, and holding patterns. Somatic therapy helps release these patterns. No prior experience is needed.',
      },
      {
        question: 'Can this retreat help if I am on medication for stress/anxiety?',
        answer: 'The retreat complements medical treatment — it does not replace it. Continue your prescribed medication. Inform the facilitator about any medication before arrival. The breathwork and somatic practices are gentle and adaptable. If you are in active psychiatric care, consult your doctor before attending.',
      },
    ],
  },

  // ── Munsiyari Healing Retreat — September 2026 ─────────────────────────
  {
    slug: 'munsiyari-healing-retreat-september-2026',
    experienceSlug: 'healing-retreat-himalayas',
    serviceSlug: 'rest-and-reset',
    locationId: 'munsiyari',
    locationName: 'Munsiyari',
    label: 'Healing Retreat',
    title: 'Munsiyari Healing Retreat — September 2026 | Retreats And Treks',
    h1: 'Munsiyari Healing Retreat — September 2026',
    metaDescription:
      '7-day healing retreat in Munsiyari, September 2026. Alpine meadows facing Panchachuli peaks. Sound healing, breathwork, forest therapy. ₹35,000 all-inclusive.',
    intro:
      'Seven days of gentle, supported healing in the alpine meadows of Munsiyari. September is the transition from monsoon to autumn — the air is the clearest it will be all year, the Panchachuli peaks are freshly snow-dusted, and the landscape has that post-rain luminosity that makes everything feel new. This retreat is for people carrying something — grief, transition, exhaustion, or something unnamed. You do not need to know what you need healing from. The process reveals itself.',
    dateRange: '15 Sep – 21 Sep 2026',
    startDate: '2026-09-15',
    endDate: '2026-09-21',
    durationDays: 7,
    month: 'September',
    year: 2026,
    price: 35000,
    currency: 'INR',
    priceNote: 'Per person, all-inclusive. Kathgodam pickup/drop, meals, accommodation, all sessions.',
    groupSize: 8,
    seatsLeft: 8,
    status: 'open',
    included: [
      'Kathgodam station pickup and drop (9-hour scenic drive)',
      'Accommodation with Panchachuli views',
      'Three meals daily (local Kumaoni cuisine)',
      'Daily breathwork sessions',
      'Sound healing sessions (2x during retreat)',
      'Guided forest therapy walks',
      'One-on-one session with facilitator',
      'Evening meditation',
      'Journalling materials provided',
    ],
    toBring: [
      'Comfortable, layered clothing',
      'Warm jacket (September evenings at 2,300m are cool)',
      'Walking shoes for meadow paths',
      'Personal medication',
      'An open mind',
    ],
    quickItinerary: [
      'Day 1: Arrive Munsiyari → Settle with Panchachuli view → Evening breathwork',
      'Day 2: Morning meditation → Body therapy → Forest walk → Rest',
      'Day 3: Somatic work → The body remembers what the mind suppresses',
      'Day 4: Sound healing → Extended rest → Journalling',
      'Day 5: Deep release day → Facilitator-held space',
      'Day 6: Integration → Gentle movement → Group sharing (optional)',
      'Day 7: Final meditation → Closing circle → Departure',
    ],
    parentExperienceSlug: 'healing-retreat-himalayas',
    parentLocationSlug: 'healing-retreat-munsiyari',
    itinerarySlug: '7-day-munsiyari-healing-retreat-itinerary',
    faqItems: [
      {
        question: 'Do I need to have a specific condition to attend a healing retreat?',
        answer: 'No. Some participants come with a named experience — grief, burnout, relationship endings, career transitions. Others come simply feeling that something needs to shift but cannot articulate what. Both are equally welcome. The retreat creates conditions for healing; it does not prescribe what needs to be healed.',
      },
      {
        question: 'Is this psychological therapy?',
        answer: 'No. The facilitators are trained in breathwork, somatic awareness, and contemplative practice — not psychotherapy. The retreat is therapeutic in the sense that it creates conditions for natural healing processes. If you are in active therapy, the retreat can complement your work. It does not replace professional mental health care.',
      },
      {
        question: 'How do I get to Munsiyari?',
        answer: 'Train to Kathgodam (overnight from Delhi, or 5-hour Shatabdi). We pick you up from Kathgodam station. The drive to Munsiyari is 9 hours through the Kumaon hills — long, but the landscape transformation from plains to alpine is itself part of the healing journey.',
      },
      {
        question: 'Is September safe weather-wise in Munsiyari?',
        answer: 'Mid-September marks the end of monsoon. There may be occasional showers, but rainfall drops significantly. The payoff is extraordinary clarity — the mountains are visible in a way that earlier months cannot match, and the air is washed clean. We monitor weather closely and adjust outdoor activities as needed.',
      },
    ],
  },

  // ── Chakrata Weekend Retreat — May 2026 ────────────────────────────────
  {
    slug: 'chakrata-weekend-retreat-may-2026',
    experienceSlug: 'stress-relief-retreats',
    serviceSlug: 'weekend-retreat',
    locationId: 'chakrata',
    locationName: 'Chakrata',
    label: 'Weekend Retreat',
    title: 'Chakrata Weekend Retreat — May 2026 | Retreats And Treks',
    h1: 'Chakrata Weekend Retreat — May 2026',
    metaDescription:
      '3-day weekend retreat in Chakrata, May 2026. Forest setting at 2,200m, 3.5 hours from Dehradun. ₹14,000 all-inclusive. Ideal first retreat.',
    intro:
      'Three days in the Chakrata forest. Enough time to settle, enough structure to create a genuine shift, short enough to fit into a working schedule. May is pre-monsoon — warm days, cool evenings, the forest fully leafed out, and wildflowers in the meadows. This is our most accessible retreat: close to Dehradun, gentle in structure, and designed for people who have never attended a retreat before.',
    dateRange: '22 May – 24 May 2026',
    startDate: '2026-05-22',
    endDate: '2026-05-24',
    durationDays: 3,
    month: 'May',
    year: 2026,
    price: 14000,
    currency: 'INR',
    priceNote: 'Per person, all-inclusive. Dehradun pickup/drop, meals, accommodation, all sessions.',
    groupSize: 10,
    seatsLeft: 10,
    status: 'open',
    included: [
      'Dehradun pickup and drop',
      'Accommodation in forest retreat house',
      'Three meals daily',
      'Morning meditation sessions',
      'Forest walking meditation',
      'Evening breathwork or sound healing',
      'Closing integration session',
    ],
    toBring: [
      'Comfortable clothing',
      'Light warm layer for evenings',
      'Walking shoes',
      'Journal and pen',
      'Personal medication',
    ],
    quickItinerary: [
      'Day 1 (Fri): Arrive by noon → Lunch → Forest walk → Evening session',
      'Day 2 (Sat): Morning meditation → Nature immersion → Rest → Evening sound healing',
      'Day 3 (Sun): Morning practice → Closing circle → Departure after lunch',
    ],
    parentExperienceSlug: 'stress-relief-retreats',
    parentLocationSlug: 'stress-relief-retreat-chakrata',
    itinerarySlug: '5-day-chakrata-stress-relief-retreat-itinerary',
    faqItems: [
      {
        question: 'Is 3 days enough for a meaningful retreat experience?',
        answer: 'Yes — for a first retreat, or for maintaining an existing practice, 3 days is a powerful duration. You will not reach the same depth as a 7-day retreat, but you will experience a genuine shift. Most participants report feeling measurably different by the morning of day 2. Our weekend format is specifically designed to maximise depth within the constraint.',
      },
      {
        question: 'Can I drive myself to Chakrata?',
        answer: 'Yes. Dehradun → Chakrata is 85 km (3.5 hours by road). We provide directions and meeting point details. If you prefer, we arrange shared transport from Dehradun with other participants.',
      },
      {
        question: 'Is this suitable as a first retreat?',
        answer: 'This is our most recommended first retreat. Short duration, gentle location, accessible from Dehradun, no extreme conditions. If you are curious about retreats but uncertain, start here.',
      },
      {
        question: 'What happens if it rains in May?',
        answer: 'Possible but infrequent. If it rains, forest sessions continue (the forest canopy is dense enough to walk under light rain) or move to covered spaces. Rain enhances the retreat — the sound and smell of rain on a deodar forest is deeply calming.',
      },
    ],
  },

  // ── Zanskar Spiritual Retreat — July 2026 ──────────────────────────────
  {
    slug: 'zanskar-spiritual-retreat-july-2026',
    experienceSlug: 'spiritual-retreats',
    serviceSlug: 'meditation-and-silence',
    locationId: 'zanskar',
    locationName: 'Zanskar',
    label: 'Spiritual Retreat',
    title: 'Zanskar Spiritual Retreat — July 2026 | Retreats And Treks',
    h1: 'Zanskar Spiritual Retreat — July 2026',
    metaDescription:
      '7-day spiritual retreat in Zanskar, July 2026. Monastery setting, chanting, contemplative practice. Trans-Himalayan immersion at 3,500m. ₹48,000 all-inclusive.',
    intro:
      'Seven days of contemplative practice in the monastic landscape of Zanskar. July is the heart of the Zanskar season — the valley is fully open, monasteries are active with summer pujas, and the long days allow extended practice. This retreat draws on the Buddhist contemplative tradition without requiring you to follow it. The methods — chanting, silence, inquiry, walking — are universal. The monastery setting provides the weight of a lineage that has been practising here for a thousand years.',
    dateRange: '6 Jul – 12 Jul 2026',
    startDate: '2026-07-06',
    endDate: '2026-07-12',
    durationDays: 7,
    month: 'July',
    year: 2026,
    price: 48000,
    currency: 'INR',
    priceNote: 'Per person, all-inclusive. Leh pickup/drop, all internal transport, meals, accommodation, instruction.',
    groupSize: 10,
    seatsLeft: 10,
    status: 'open',
    included: [
      'Leh airport pickup and drop',
      'All road transport (Leh–Zanskar–Leh)',
      'Monastery guesthouse accommodation',
      'Three vegetarian meals daily',
      'Morning and evening chanting sessions',
      'Guided contemplative practice (3x daily)',
      'Dharma study sessions',
      'Walking meditation to monastery sites',
      'All permits and entry fees',
    ],
    toBring: [
      'Warm layers (nights are cold at 3,500m even in July)',
      'Comfortable practice clothing',
      'Sun protection (high-altitude UV)',
      'Headlamp or torch',
      'Journal and pen',
      'Personal medication',
    ],
    quickItinerary: [
      'Day 1: Arrive Leh → Acclimatization and rest',
      'Day 2: Drive to Zanskar a  (high pass crossings)',
      'Day 3–6: Monastery-based practice — chanting, silence, inquiry, walking',
      'Day 7: Closing ceremony → Begin return journey to Leh',
    ],
    parentExperienceSlug: 'spiritual-retreats',
    parentLocationSlug: 'spiritual-retreat-zanskar',
    itinerarySlug: '7-day-zanskar-spiritual-retreat-itinerary',
    faqItems: [
      {
        question: 'Do I need to be Buddhist to attend?',
        answer: 'No. The retreat uses contemplative methods from the Buddhist tradition — chanting, sitting meditation, walking practice, dharma study — but does not require adherence to any belief system. Participants from all backgrounds and traditions are welcome. The practice is experiential, not doctrinal.',
      },
      {
        question: 'How is this different from the Zanskar meditation retreat?',
        answer: 'The meditation retreat focuses on technique — structured sitting practice, walking meditation, silence. The spiritual retreat adds a devotional dimension — chanting, dharma study, contemplative inquiry into deeper questions (suffering, impermanence, the nature of self). It is more intellectually and emotionally engaged.',
      },
      {
        question: 'Is July the best month for Zanskar?',
        answer: 'July is peak Zanskar season. All passes are open, weather is warm by Zanskar standards (15–25°C during the day), and monastery festivals are active. The trade-off is slightly more visitors on the main road, but Zanskar is so remote that "busy" still means very few people.',
      },
      {
        question: 'What altitude precautions should I take?',
        answer: 'Leh is at 3,500m and Zanskar is similar. Acclimatization day 1 in Leh is mandatory. Drink extra water, avoid alcohol on arrival, and do not exert yourself the first day. If you have prior experience at altitude, the adjustment is manageable. First-timers should be aware of mild headache and fatigue — this passes within 24–48 hours.',
      },
    ],
  },

  // ── Chakrata Digital Detox — November 2026 ─────────────────────────────
  {
    slug: 'chakrata-digital-detox-retreat-november-2026',
    experienceSlug: 'digital-detox-retreat',
    serviceSlug: 'rest-and-reset',
    locationId: 'chakrata',
    locationName: 'Chakrata',
    label: 'Digital Detox Retreat',
    title: 'Chakrata Digital Detox Retreat — November 2026 | Retreats And Treks',
    h1: 'Chakrata Digital Detox Retreat — November 2026',
    metaDescription:
      '5-day digital detox retreat in Chakrata, November 2026. Surrender your devices. Forest at 2,200m. Analog living. ₹22,000 all-inclusive.',
    intro:
      'Five days without screens. November in Chakrata: the autumn colour has passed, the forest is quiet, early frost on the mornings, and fire in the evenings. The structure is simple — surrender your devices on arrival, spend five days doing things humans did for thousands of years before screens existed, and then re-enter digital life with boundaries you set before leaving.',
    dateRange: '9 Nov – 13 Nov 2026',
    startDate: '2026-11-09',
    endDate: '2026-11-13',
    durationDays: 5,
    month: 'November',
    year: 2026,
    price: 22000,
    currency: 'INR',
    priceNote: 'Per person, all-inclusive. Dehradun pickup/drop, meals, accommodation, all sessions.',
    groupSize: 10,
    seatsLeft: 10,
    status: 'open',
    included: [
      'Dehradun pickup and drop',
      'Forest retreat house accommodation',
      'Three meals daily',
      'Device surrender and secure storage',
      'Morning meditation',
      'Analog activities — drawing, writing, nature walks, stargazing',
      'Group conversations (the old-fashioned kind)',
      'Digital re-entry planning session on final day',
    ],
    toBring: [
      'Warm clothing (November nights are cold at 2,200m)',
      'A book (physical)',
      'Journal and pen',
      'Personal medication',
      'A willingness to be bored — it transforms',
    ],
    quickItinerary: [
      'Day 1: Arrive → Device surrender → Orientation → Journalling session',
      'Day 2: First full day offline — morning meditation, nature walk, analog afternoon',
      'Day 3: Attention span returns — creative practice, extended conversation, exploration',
      'Day 4: Boredom becomes doorway — unstructured day → fireside evening',
      'Day 5: Digital re-entry workshop → Devices returned → Departure',
    ],
    parentExperienceSlug: 'digital-detox-retreat',
    parentLocationSlug: 'digital-detox-retreat-chakrata',
    itinerarySlug: '5-day-chakrata-digital-detox-retreat-itinerary',
    faqItems: [
      {
        question: 'What happens to my phone during the retreat?',
        answer: 'We store it securely on arrival. You get it back during the re-entry session on the final day. For genuine emergencies, the retreat house has a landline and staff carry phones — you can be reached through them. Your employer or family can be given an emergency contact number before you leave.',
      },
      {
        question: 'What do I do without my phone for 5 days?',
        answer: 'Day 1: anxiety. Day 2: restlessness and phantom pocket-checking. Day 3: your attention span starts to return. Day 4: you notice things you normally miss. Day 5: you consider not taking it back. The structured activities — meditation, nature walks, creative practice, conversation — fill the time. More importantly, the unstructured time fills itself once the compulsive reaching stops.',
      },
      {
        question: 'Can I bring a camera?',
        answer: 'A dedicated camera (not a phone camera) is acceptable if photography is part of your creative practice. Laptops, tablets, smartwatches, and e-readers are surrendered along with phones. The goal is to remove the automatic reaching behaviour, not to enforce asceticism about all technology.',
      },
      {
        question: 'Is November cold in Chakrata?',
        answer: 'Yes. Daytime temperatures around 12–15°C, dropping to 2–5°C at night. The retreat house has heating and warm bedding. Bring proper winter layers. The cold is actually beneficial — it drives you inward, toward fire and conversation and early sleep, which is the natural rhythm this retreat supports.',
      },
    ],
  },
];

// ── Exports ──────────────────────────────────────────────────────────────

export const RETREAT_PROGRAM_EVENTS: readonly RetreatProgramEvent[] = EVENTS;

export function getRetreatProgramEvent(slug: string): RetreatProgramEvent | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

export function getAllRetreatProgramSlugs(): string[] {
  return EVENTS.map((e) => e.slug);
}

export function getUpcomingEvents(): RetreatProgramEvent[] {
  const now = new Date().toISOString().split('T')[0];
  return EVENTS
    .filter((e) => e.startDate >= now && e.status !== 'sold-out')
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function getEventsByLocation(locationId: string): RetreatProgramEvent[] {
  return EVENTS.filter((e) => e.locationId === locationId);
}

export function getEventsByMonth(month: string): RetreatProgramEvent[] {
  return EVENTS.filter((e) => e.month === month);
}

export function getEventsByExperience(experienceSlug: string): RetreatProgramEvent[] {
  return EVENTS.filter((e) => e.experienceSlug === experienceSlug);
}
