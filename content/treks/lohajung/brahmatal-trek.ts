import { TrekContent } from '@/types/content';

const brahmatalTrek: TrekContent = {
  slug: 'brahmatal-trek',
  title: 'Brahmatal Trek (3,850m) – Snow Trek from Lohajung',
  description:
    'Brahmatal Trek: 4-day frozen alpine lake trek from Lohajung to 3,850m in the Garhwal Himalayas. Panoramic Trishul & Nanda Ghunti views, oak forests, snow ridges. Best Dec–Mar.',

  locationId: 'lohajung',
  trekType: 'Weekend Trek',

  difficulty: 'Moderate',
  distance: '22 km',
  altitude: '3850 m',

  duration: '4 Days / 3 Nights',
  bestSeason: ['December', 'January', 'February', 'March'],
  pickupPoint: 'Lohajung',

  priceRange: '₹8,500 – ₹12,500',
  groupSize: '8–18 people',

  /* ============================================================
     VISUAL + CONVERSION UPGRADE (2026-Q2)
  ============================================================ */

  heroImage: '/Images/trek/region/brahmatal-lake.webp',
  heroImageAlt:
    'Frozen Brahmatal Lake in winter with snow-covered Himalayan peaks in the background, Uttarakhand',

  heroTagline:
    'Walk onto a frozen alpine lake at 3,850 metres. Four days of snow trails, oak forests, and a 360° ridge of Trishul and Nanda Ghunti — the most accessible winter snow trek in the Indian Himalayas.',

  trustSignals: [
    { label: 'Certified Trek Leaders', sublabel: 'NIM / AMG / first-aid trained' },
    { label: '4 Days · 22 km', sublabel: 'Lohajung → Brahmatal → Lohajung' },
    { label: 'Winter Safety Protocol', sublabel: 'pulse oximeter · sat comms' },
    { label: 'Free Reschedule', sublabel: 'up to 15 days before departure' },
  ],

  whyThisTrek: {
    headline: 'The most approachable frozen-lake trek in the Garhwal Himalayas',
    body:
      'Brahmatal sits in a rare sweet spot. It is high enough to deliver deep winter snow, frozen alpine water, and a summit ridge that opens up to Trishul (7,120 m) and Nanda Ghunti (6,309 m) — yet low enough that a reasonably fit first-time Himalayan trekker can complete it safely in four days.\n\nUnlike Kedarkantha, Brahmatal remains quiet. Unlike Roopkund, the altitude gain is gradual. Unlike Kuari Pass, the final ridge walk delivers a genuine frozen lake — not just a viewpoint. For trekkers choosing their first snow trek, or experienced trekkers looking for a short, photogenic winter escape from Delhi, Dehradun, or Rishikesh, Brahmatal is the route that consistently over-delivers.\n\nThe trail passes through dense oak and rhododendron forests, opens into the glacial lake at Bekaltal, climbs through snow-covered meadows, and finishes with a ridge walk that is — on a clear January morning — one of the finest panoramic vantage points in the Indian Himalayas.',
  },

  emotionalHooks: [
    {
      icon: '❄',
      title: 'A frozen lake at 3,850 m',
      body:
        'Brahmatal lake locks into winter from late December through February — a flat sheet of white that most people only see in photos. You will stand on it.',
    },
    {
      icon: '🏔',
      title: 'Trishul & Nanda Ghunti, up close',
      body:
        'The summit ridge gives you an uninterrupted 270° view of the greater Garhwal — including the Trishul massif, Nanda Ghunti, and on clear days, Neelkanth and Chaukhamba.',
    },
    {
      icon: '🌲',
      title: 'Snow-laden oak forests',
      body:
        'Day one and day four wind through old-growth oak and rhododendron. In December–February the branches hold snow for days after a storm — the trail becomes a silent white corridor.',
    },
    {
      icon: '🏕',
      title: 'Camps under Himalayan stars',
      body:
        'At Bekaltal and Tilandi, the camps sit above the tree line with zero light pollution. Most nights you will see the Milky Way stretch clean across the sky.',
    },
    {
      icon: '🥾',
      title: 'Beginner-friendly, honestly',
      body:
        'A max 4-hour walking day, gradual altitude gain, and a well-marked trail. No ropes, no scrambling, no exposure. If you can walk 8 km with a daypack, you can do Brahmatal.',
    },
    {
      icon: '🎒',
      title: 'One of the cheapest full-snow treks',
      body:
        'At ₹8,500–₹12,500 all-inclusive, Brahmatal is among the best-value winter snow treks in Uttarakhand. Gear rental (microspikes, gaiters, jacket) available on site.',
    },
  ],

  experienceGallery: [
    {
      src: '/Images/trek/itinerary/brahmatal/day1.webp',
      alt: 'Brahmatal trek day 1 — oak forest trail from Lohajung to Bekaltal',
      caption: 'Day 1 — Oak & rhododendron forest, Lohajung to Bekaltal',
    },
    {
      src: '/Images/trek/itinerary/brahmatal/day2.webp',
      alt: 'Brahmatal trek day 2 — snow-covered meadows approaching Brahmatal lake',
      caption: 'Day 2 — Snow meadows via Tilandi',
    },
    {
      src: '/Images/trek/itinerary/brahmatal/day3.webp',
      alt: 'Brahmatal trek summit ridge with 360-degree Himalayan views',
      caption: 'Day 3 — Summit ridge · Trishul & Nanda Ghunti',
    },
    {
      src: '/Images/trek/itinerary/brahmatal/day4.webp',
      alt: 'Descending from Brahmatal back to Lohajung through winter forest',
      caption: 'Day 4 — Descent to Lohajung',
    },
    {
      src: '/Images/hero/alpine-ridge.webp',
      alt: 'Alpine ridge section of Brahmatal trek under clear winter sky',
      caption: 'The ridge walk — Brahmatal to Jhandi Top',
    },
    {
      src: '/Images/hero/himalayan-sunrise.webp',
      alt: 'Sunrise over the Garhwal Himalayas from Brahmatal summit camp',
      caption: 'First light over the Garhwal range',
    },
  ],

  cinematicMoment: {
    image: '/Images/trek/region/sunrise_ridge.png',
    alt: 'Sunrise on Brahmatal summit ridge with Trishul and Nanda Ghunti in the distance',
    quote:
      'Four days of silence, one frozen lake, and a sunrise that rearranges what you thought a mountain morning could feel like.',
    attribution: 'Trek journal, January 2025',
  },

  difficultyProfile: {
    physical: 3,
    technical: 1,
    altitude: 3,
    weather: 4,
  },

  whatYouExperience: [
    'Sleeping above the tree line in a winter camp',
    'Crossing a frozen lake on foot',
    'Walking in knee-deep powder snow',
    'Summit ridge with zero horizon obstruction',
    'Star-filled sky with no light pollution',
    'Rhododendron and oak corridors',
  ],

  seoKeywordCluster: [
    'brahmatal trek',
    'brahmatal trek cost',
    'brahmatal trek itinerary',
    'brahmatal trek difficulty',
    'brahmatal trek best time',
    'brahmatal trek from lohajung',
    'brahmatal snow trek',
    'brahmatal winter trek',
    'frozen lake trek uttarakhand',
    'trishul nanda ghunti trek',
    'beginner snow trek himalayas',
    'weekend snow trek uttarakhand',
  ],

  /* ============================================================
     EXISTING FIELDS (expanded)
  ============================================================ */

  overview:
    `Brahmatal Trek is arguably the most approachable frozen-lake snow trek in the Indian Himalayas. Spanning four days and approximately 22 kilometres, the route climbs from the basecamp village of Lohajung (2,300 m) through dense oak and rhododendron forests, past the smaller lake of Bekaltal, onto the snow-covered meadows at Tilandi, and finally up to the frozen Brahmatal lake at 3,850 metres. It is here that a spectacular ridge walk opens onto an unobstructed 270-degree panorama of Mt. Trishul (7,120 m) and Nanda Ghunti (6,309 m).\n\nFor first-time Himalayan trekkers and weekend adventurers travelling from Delhi, Bengaluru, or Mumbai, the Brahmatal trek delivers an unusual and highly sought-after combination: authentic high-altitude winter conditions without the technical demands and severe exposure of routes like Roopkund or Pangarchulla. Unlike many popular winter viewpoints, this trek delivers a genuine frozen alpine lake. The altitude gain is meticulously gradual — roughly 400 m per day — which facilitates comfortable acclimatisation and significantly minimises the risk of Acute Mountain Sickness (AMS).\n\nFrom mid-December through early March, the upper sections of the trail are draped in knee-deep snow, locking the Brahmatal lake itself in solid ice. March provides a softer, warmer alternative — snow recedes below 3,200 m, daylight lengthens, and vibrant rhododendron buds begin to emerge on the lower trail sections. Regardless of the month you choose, the route remains well-marked, professionally supported by local Lohajung operators, and maintains an impeccable safety record for guided groups.`,

  highlights: [
    'Frozen Brahmatal Lake at 3,850 m — walkable in December–February',
    'Panoramic ridge views of Trishul (7,120 m) and Nanda Ghunti (6,309 m)',
    'Snow-covered oak and rhododendron forest corridors',
    'Gradual altitude gain — genuinely suitable for first-time snow trekkers',
    'Quiet, photogenic alternative to the more crowded Kedarkantha and Kuari Pass',
  ],

  itinerary: [
    `Day 1: Drive from Rishikesh/Dehradun to Lohajung (2,300 m), trek to Bekaltal (2,700 m) · 3 km · Terrain: Forest trail, dense oak and rhododendron\n\nThe journey begins with a scenic 10-12 hour drive to the basecamp village of Lohajung. After arriving and securing your forest permits, you step directly onto a well-marked trail. The first few hours involve a moderate ascent through a heavy canopy of ancient oak and rhododendron trees. In December and January, this section starts dry but quickly transitions to snow patches as you near the 2,700 m mark. You will camp for the night near Bekaltal, a high-altitude lake surrounded by thick forest padding that protects from wind.`,
    `Day 2: Bekaltal to Brahmatal via Tilandi (3,250 m) · 8 km · Terrain: Snow-covered alpine meadows, steep switchbacks\n\nToday the landscape opens up. After a steep early climb out of the forest canopy, you break the tree line at Tilandi — a vast, sweeping high-altitude meadow. During peak winter, this section requires walking in knee-deep powder snow, and microspikes are often fitted here. The views begin to hint at what is to come, with Mt. Trishul occasionally revealing itself. The day ends at the Brahmatal campsite, positioned safely below the ridge line where the team rests in sub-zero temperatures.`,
    `Day 3: Summit Day — Ridge Walk to Jhandi Top and Brahmatal Lake (3,850 m), returning to Tilandi · 9 km · Terrain: Exposed ridge walk, deep snow, frozen lake surface\n\nThis is the definitive visual climax of the Brahmatal trek. Starting before sunrise, you tackle a steep ascent to Jhandi Top. The moment you clear the ridge, a 270-degree panorama of the Garhwal Himalayas explodes into view — Trishul (7,120 m) and Nanda Ghunti (6,309 m) appear close enough to touch. You then descend slightly to the actual Brahmatal Lake, entirely frozen from late December to February. Standing on the frozen sheet of water surrounded by high peaks is a rare experience. After spending time at the summit, the group descends to a lower camp to escape the extreme cold.`,
    `Day 4: Descend to Lohajung · 6 km · Terrain: Packed snow, descending forest path\n\nThe final day is a continuous descent, heavily loading the knees and thighs. Retracing parts of the route through the rhododendron corridors, the snow gradually gives way to dry earth as you drop altitude. Reaching Lohajung by early afternoon leaves adequate time for the 10-12 hour return journey to Rishikesh or Dehradun. The sudden change in temperature and oxygen availability as you descend makes this day feel physically much easier, though care must be taken on slippery, icy sections in the morning.`,
  ],

  inclusions: [
    'All meals during trek (vegetarian, Indian)',
    'Camping and tent accommodation (shared, 2-3 per tent)',
    'Certified trek leader, local guides, and support staff',
    'Safety equipment — first-aid, pulse oximeter, satellite communication',
    'All forest department and entry permits',
  ],

  exclusions: [
    'Travel to/from Lohajung (Rishikesh/Dehradun drop-off is separately bookable)',
    'Personal trekking gear — shoes, backpack, clothing (rental available)',
    'Travel insurance (strongly recommended)',
    'Tips and gratuities for staff',
  ],

  images: [
    {
      src: '/Images/trek/region/brahmatal-lake.webp',
      alt: 'Frozen Brahmatal Lake at 3,850m in winter with Trishul in the background',
    },
  ],

  safety:
    `While the Brahmatal trek is considered moderate, winter conditions introduce genuine risk factors that demand professional preparation. The primary hazards include severe cold exposure—with January night temperatures at camp dropping to a brutal -12°C—as well as trail ice above 3,200 m, and restricted evacuation options following a sudden heavy snowfall.\n\nTo mitigate these risks, we operate with a rigorous winter safety protocol. Every trekking group carries a pulse oximeter to conduct mandatory daily altitude sickness screenings, a comprehensive, certified first-aid kit stocked with dexamethasone and nifedipine for emergency altitude descent, and a satellite communication device (InReach or satellite phone) to maintain contact on sections beyond BSNL network range. All trek leaders are thoroughly trained by the Nehru Institute of Mountaineering (NIM) or an equivalent governing body. We enforce a conservative turnaround policy: if visibility drops or weather deteriorates on the vital summit day, the team will descend and re-attempt the following morning rather than pushing into unsafe conditions.\n\nTrekkers must carry or rent personal microspikes and gaiters for any sections above the tree line. Both are crucial for maintaining traction on slick ice and preventing deep snow from saturating footwear.`,

  permits:
    'Forest department permit is required from the Uttarakhand Forest Division and is arranged by the trek operator at the Lohajung check post. No special mountaineering permits are needed for Brahmatal. Indian nationals carry a valid government photo ID (Aadhaar, passport, or driving licence). Foreign nationals should carry their passport and a copy of their Indian visa. Mobile coverage: BSNL works intermittently in Lohajung village; there is no coverage above the village. Inform your emergency contacts before leaving Lohajung.',

  monthlyConditions: [
    {
      month: 'December',
      conditions:
        'Early winter. Snow begins accumulating above 3,000 m, and the upper ridge may have fresh snow cover. Camp temperatures: -2°C to -8°C. Trail below 3,000 m is mostly dry. Fewer trekkers — ideal for photography and solitude. Shortest daylight (sunrise ~6:45, sunset ~5:15) — the camp routine compresses around this.',
    },
    {
      month: 'January',
      conditions:
        'Peak winter. Heavy snow above 2,800 m, often knee-deep on the ridge. Camp temperatures: -5°C to -12°C. The lake is at its most photogenic — a full frozen sheet. Requires proper layering and a -15°C-rated sleeping bag. The hardest month physically, but visually unmatched.',
    },
    {
      month: 'February',
      conditions:
        'Late winter. Snow remains deep but days lengthen noticeably. Camp temperatures: -3°C to -10°C. The trail is well-packed from January traffic, which helps on the upper sections. By late February the lake surface may show melt cracks on south-facing edges. Best balance of winter conditions and cold tolerance for most trekkers.',
    },
    {
      month: 'March',
      conditions:
        'Transitional. Snow recedes below 3,200 m; upper sections remain snow-covered into mid-March. Camp temperatures: 0°C to -5°C. Longer days, warmer sun, rhododendron buds begin appearing on the lower trail. The most comfortable option if winter cold is a concern, while still offering real snow experience on the summit day.',
    },
  ],

  whoShouldAvoid:
    'People with uncontrolled asthma, heart conditions, or a history of severe altitude sickness (AMS at lower altitudes) should consult a physician before attempting Brahmatal. Not recommended for children under 10 in deep winter (December–January) due to cold exposure risk. If you have never trekked in snow and are unsure of your tolerance, consider a guided introductory snow trek at lower altitude first, or choose March conditions for your Brahmatal attempt. Trekkers recovering from recent orthopaedic injury should defer the trek until full rehabilitation — descent on icy ground places significant load on knees and ankles.',

  localLogistics:
    `The Brahmatal trek begins and ends in Lohajung, a remote village in the Chamoli district. Driving from Rishikesh or Dehradun to Lohajung takes approximately 10–12 hours, covering 260 km via the mountain towns of Karnaprayag and Dewal. The road condition varies significantly according to the season—expect rough, unpaved patches after crossing Dewal. Shared taxis and regional buses are readily available from Rishikesh and Dehradun, but must be boarded early in the morning to reach Lohajung before nightfall.\n\nLohajung offers basic infrastructure including guesthouses and homestays designed for trekkers to rest pre- and post-trek. Given the harsh winter temperatures, it is highly recommended to book accommodation in advance during the peak December to January period. Note that the last reliable ATM is located in Karnaprayag; it is essential to carry sufficient cash for the entirety of the trek and the return journey. The nearest major hospital is in Chamoli (3–4 hours by road from Lohajung), though for serious emergencies, evacuation is coordinated directly to Dehradun.\n\nComprehensive winter gear rental—including microspikes, gaiters, heavy down jackets, and -15°C sleeping bags—is easily accessible through trek operators stationed in Lohajung. Please request gear well in advance. Lohajung village also features a small provision shop for last-minute essentials like batteries, snacks, and toiletries.`,

  howToReach: [
    'Fly / train to Dehradun or Rishikesh (the nearest major transport hubs)',
    'Drive to Lohajung (10–12 hours) via Karnaprayag and Dewal — shared cabs available from both cities',
    'Overnight at Lohajung in a homestay or basic guesthouse before the trek',
    'Trek departs from Lohajung base at ~8:00 AM on Day 1',
  ],

  packingList: [
    'Waterproof trekking shoes with ankle support (broken in)',
    'Down or synthetic jacket rated to -15°C',
    'Thermal base layers (top + bottom, merino or synthetic)',
    'Woolen cap, insulated gloves, neck gaiter',
    'Microspikes and gaiters (rental available in Lohajung)',
    '40–50 L backpack + rain cover',
    'Headlamp with spare batteries',
    'Reusable water bottle and thermos flask (1 L)',
    'Sunglasses with UV protection (snow glare is intense)',
    'Personal toiletries, SPF 50 sunscreen, lip balm',
  ],

  altitudeProfile: [
    'Lohajung base — 2,300 m',
    'Bekaltal camp — 2,700 m',
    'Tilandi meadow — 3,250 m',
    'Brahmatal summit ridge — 3,850 m',
  ],

  risksAndSafety: [
    'Cold exposure (camp temperatures down to -12°C in January)',
    'Trail ice and verglas above 3,200 m — microspikes mandatory',
    'Heavy snowfall in January can compress or obscure the trail',
    'Remote location — limited road evacuation in deep winter',
    'Altitude sickness risk above 3,500 m for the unacclimatised',
  ],

  faqs: [
    {
      question: 'Is Brahmatal suitable for first-time trekkers?',
      answer:
        'Yes — Brahmatal is consistently ranked as one of the best first-Himalayan-trek options. The altitude gain is gradual (~400 m per day), the walking days are short (3–6 hours), and there are no technical sections. Basic cardiovascular fitness (a 5 km jog in 30 minutes, or a 30-minute stair-climb session) is sufficient. It is not recommended as a first-ever trek in deep January snow without any prior trekking experience.',
    },
    {
      question: 'What snow conditions should I expect on Brahmatal?',
      answer:
        'From mid-December to late February the trail above 3,000 m is typically snow-covered. On the summit ridge (Day 3) expect knee-deep powder snow. The Brahmatal lake itself is fully frozen during this window. In March the lower sections are mostly clear while the summit day still involves snow walking. Microspikes and gaiters are strongly recommended across the full winter window.',
    },
    {
      question: 'How do I reach Lohajung from Delhi or Rishikesh?',
      answer:
        'Lohajung is approximately 500 km from Delhi and 260 km from Rishikesh. The standard route is Delhi → Rishikesh (overnight train or flight to Dehradun) → Lohajung by road (10–12 hours via Karnaprayag and Dewal). Shared taxis depart Rishikesh and Dehradun early each morning. Most trekkers arrive in Lohajung the evening before the trek starts and stay at a local homestay.',
    },
    {
      question: 'Do I need crampons for Brahmatal?',
      answer:
        'Full crampons are not required. Microspikes are sufficient for all Brahmatal sections, including the summit ridge. Your trek operator provides microspikes if the trail is icy. Gaiters are strongly recommended — the upper sections carry deep snow that will otherwise enter your shoes.',
    },
    {
      question: 'What temperatures should I prepare for on the Brahmatal trek?',
      answer:
        'Night temperatures at camp range from -5°C to -12°C in January (the coldest month), -3°C to -10°C in December and February, and 0°C to -5°C in March. Daytime temperatures on the trail range from -2°C to +5°C. Carry a sleeping bag rated to -15°C comfort, and dress in three layers: thermal base, insulating mid-layer, windproof outer shell.',
    },
    {
      question: 'Is there mobile network or internet on the Brahmatal trek?',
      answer:
        'BSNL has intermittent coverage in Lohajung village only. Jio and Airtel work poorly. Once you leave Lohajung for the trek, there is no mobile network. Guided operators carry satellite communication (InReach or sat phone) for emergencies. Inform your emergency contacts before departure and let them know you will be unreachable for 3–4 days.',
    },
    {
      question: 'What is the total distance of the Brahmatal trek?',
      answer:
        'The total trekking distance is approximately 22–26 km over 4 days. Daily distances: Day 1: 3 km, Day 2: 8 km, Day 3: 9 km (summit + partial descent), Day 4: 6 km. Distances vary slightly based on snow conditions and exact route taken.',
    },
    {
      question: 'What is the highest altitude reached on the Brahmatal trek?',
      answer:
        'The highest point is the Brahmatal summit ridge at approximately 3,850 metres (12,630 feet). The Brahmatal lake sits slightly below, around 3,750 m. Most groups reach the summit ridge on Day 3 morning and descend the same day.',
    },
    {
      question: 'How many days does the Brahmatal trek take?',
      answer:
        'The standard Brahmatal trek is 4 days and 3 nights — one day to reach the trailhead and begin trekking, two full trekking days including the summit, and one day for descent and return drive. Some extended versions add an extra acclimatisation day at Bekaltal.',
    },
    {
      question: 'Do I need permits for the Brahmatal trek?',
      answer:
        'Yes — Forest department permits are required from the Uttarakhand Forest Division. Your trek operator arranges these at the Lohajung check post. Permit costs are typically included in the trek package. Indian nationals carry a government photo ID; foreign nationals carry passport + Indian visa copy.',
    },
    {
      question: 'What is the best time for the Brahmatal trek?',
      answer:
        'The best windows are December to March for a snow trek experience, with each month offering slightly different conditions. December is quiet and early-winter; January is peak winter with maximum snow and lowest temperatures; February offers a well-packed trail with deep snow; March is transitional, warmer, and easier for first-time winter trekkers. September–October offer clear skies but no snow — generally not recommended unless you specifically want mild weather.',
    },
    {
      question: 'What is the cost of the Brahmatal trek?',
      answer:
        'Standard Brahmatal trek packages from Lohajung range from ₹8,500 to ₹12,500 per person, depending on group size, season, and inclusions. This typically covers all meals on the trek, camping accommodation, trek leader and support staff, forest permits, and safety equipment. Travel to Lohajung, personal gear, and gratuities are additional.',
    },
    {
      question: 'Is Brahmatal safer than Kedarkantha or Kuari Pass?',
      answer:
        'Brahmatal has a comparable safety profile to Kuari Pass and is slightly safer than Kedarkantha in deep winter — the summit day on Kedarkantha is steeper and more exposed. Brahmatal summit is a ridge walk with no serious exposure, making it the most forgiving of the three for first-time snow trekkers. All three are moderate treks when operated professionally.',
    },
    {
      question: 'What fitness level is required for Brahmatal?',
      answer:
        'Basic cardiovascular fitness is sufficient. Target: 5 km jog in 30 minutes, or 40 minutes of brisk stair-climbing without significant breathlessness. Start preparing 4–6 weeks before the trek if you are currently sedentary. No specific strength training is required, though light leg and core work improves descent comfort.',
    },
    {
      question: 'Can I rent winter gear at Lohajung?',
      answer:
        'Yes. Microspikes, gaiters, down jackets, and sleeping bags are available for rent through trek operators in Lohajung. Rental is typically ₹100–₹300 per day per item. Request rental items at least 3 days before trek departure so the operator can confirm sizes and availability.',
    },
    {
      question: 'What if there is heavy snowfall during my trek dates?',
      answer:
        'We monitor weather forecasts continuously. In case of forecast heavy snowfall, the trek operator may reschedule the group by 1–2 days, shift the itinerary to a lower alternate camp, or in rare cases cancel with a full refund or free reschedule. Safety takes precedence over completing the route. Trekkers are encouraged to build a 1–2 day buffer into their travel plans.',
    },
  ],

  relatedBlogSlugs: [
    'brahmatal-trek-cost',
    'brahmatal-trek-best-time',
    'brahmatal-trek-difficulty',
    'brahmatal-trek-packing-list',
  ],

  updatedAt: '2026-04-20',
};

export default brahmatalTrek;
