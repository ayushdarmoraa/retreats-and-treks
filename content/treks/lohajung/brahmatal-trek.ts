import { TrekContent } from '@/types/content';

const brahmatalTrek: TrekContent = {
  slug: 'brahmatal-trek',
  title: 'Brahmatal Trek (3,850m) – Snow Trek from Lohajung',
  description:
    'Trek to the frozen Brahmatal Lake at 3,850m in the Garhwal Himalayas. 4 days, 22 km from Lohajung through snow-covered ridges with Trishul and Nanda Ghunti views. Best: Dec–Mar.',

  locationId: 'lohajung',
  trekType: 'Weekend Trek',

  difficulty: 'Moderate',
  distance: '22 km',
  altitude: '3850 m',

  duration: '4 Days / 3 Nights',
  bestSeason: ['December', 'January', 'February', 'March'],
  pickupPoint: 'Lohajung',

  overview:
    'Brahmatal is one of the finest winter treks in the Indian Himalayas, offering a rare combination of frozen alpine lakes, snow ridges, and unobstructed views of the Trishul and Nanda Ghunti massifs. The trail passes through dense oak and rhododendron forests before opening into high-altitude meadows and the frozen Brahmatal Lake at approximately 3,850 metres.\n\nUnlike more demanding winter treks, Brahmatal maintains a moderate difficulty profile — making it accessible to trekkers with basic fitness and minimal winter experience. The route is well-established and the altitude gain is gradual, allowing comfortable acclimatisation across four days.',

  highlights: [
    'Frozen Brahmatal Lake at 3,850 m',
    'Panoramic views of Trishul and Nanda Ghunti',
    'Snow-covered oak and rhododendron forests',
    'Gradual altitude gain — suitable for intermediate trekkers',
    'Clear winter skies with exceptional mountain visibility',
  ],

  itinerary: [
    'Day 1: Drive to Lohajung, trek to Bekaltal (3 km, forest trail)',
    'Day 2: Bekaltal to Brahmatal via Tilandi (8 km, meadows and snow)',
    'Day 3: Brahmatal summit day — ridge walk with 360° Himalayan views, return to Tilandi',
    'Day 4: Descend to Lohajung, drive back',
  ],

  inclusions: [
    'All meals during trek',
    'Camping and tent accommodation',
    'Expert trek leader and support staff',
    'Safety equipment and first-aid',
    'Forest permits',
  ],

  exclusions: [
    'Travel to/from Lohajung',
    'Personal trekking gear and clothing',
    'Travel insurance',
    'Tips and gratuities',
  ],

  images: [
    { src: '/images/treks/brahmatal-1.jpg', alt: 'Brahmatal frozen lake in winter' },
  ],

  safety:
    'Brahmatal is a moderate winter trek with manageable risk when properly prepared. The primary hazards are cold exposure (temperatures drop to -10°C at camp), trail ice above 3,200 m, and limited evacuation options in heavy snowfall. Trek with a guided operator that carries pulse oximeters, emergency communication (satellite phone or InReach), and maintains a turnaround protocol. Carry personal microspikes, gaiters, and a headlamp at all times above the treeline. Avoid trekking solo in winter — trails can be obscured by fresh snow within hours.',

  permits:
    'Forest department permit required (arranged by trek operators). No special mountaineering permits needed. Indian nationals need a valid photo ID. Foreign nationals should carry passport and a copy of their Indian visa. There is no BSNL/Jio coverage above Lohajung — inform your emergency contacts before departure.',

  monthlyConditions: [
    { month: 'December', conditions: 'Early winter. Snow begins accumulating above 3,000 m. Temperatures: -2°C to -8°C at camp. Trail is mostly defined but upper sections may have fresh snow. Fewer trekkers — quiet and scenic. Shortest daylight hours (sunrise ~6:45, sunset ~5:15).' },
    { month: 'January', conditions: 'Peak winter. Heavy snow above 2,800 m, often knee-deep on the ridge. Temperatures: -5°C to -12°C at camp. The frozen lake is at its most dramatic. Requires proper layering and winter sleeping bag (-15°C comfort). Hardest month but most rewarding visually.' },
    { month: 'February', conditions: 'Late winter. Snow remains deep but days lengthen noticeably. Temperatures: -3°C to -10°C at camp. Trail is well-packed by January traffic. The frozen lake may begin showing melt cracks by late February. Best balance of winter conditions and manageable cold.' },
    { month: 'March', conditions: 'Transitional. Snow recedes below 3,200 m. Upper sections still snow-covered. Temperatures: 0°C to -5°C at camp. Longer days, warmer sun, but nights remain cold. Rhododendron buds start appearing at lower elevations. Good option if you want winter scenery without extreme cold.' },
  ],

  whoShouldAvoid:
    'People with uncontrolled asthma, heart conditions, or a history of severe altitude sickness should consult a physician before attempting Brahmatal. Not recommended for children under 10 in deep winter (December–January). If you have never trekked in snow before, consider a guided introductory snow trek at lower altitude first, or choose March when conditions are milder.',

  localLogistics:
    'Drive from Rishikesh to Lohajung: 260 km, 10–12 hours via Karnaprayag (road condition varies, expect rough patches after Dewal). Shared taxis available from Rishikesh (depart early morning). Lohajung has basic guesthouses for pre/post-trek stays. ATM: Last reliable ATM in Karnaprayag — carry cash. Medical: Nearest hospital in Chamoli (3–4 hours from Lohajung). Mobile coverage: Spotty BSNL in Lohajung, none on trail. Gear rental (microspikes, gaiters, jackets) available through trek operators — confirm in advance.',

  faqs: [
    {
      question: 'Is Brahmatal suitable for first-time trekkers?',
      answer: 'Brahmatal is a moderate-difficulty trek. Prior trekking experience is helpful but not mandatory if you have good cardiovascular fitness. It is not recommended as a first-ever Himalayan trek in deep winter without preparation.',
    },
    {
      question: 'What kind of snow conditions should I expect?',
      answer: 'From mid-December through February, the trail above 3,000 metres is typically covered in snow. Expect knee-deep snow on the upper ridge sections. Gaiters and microspikes are recommended.',
    },
    {
      question: 'How do I reach Lohajung?',
      answer: 'Lohajung is approximately 260 km from Rishikesh (10–12 hours by road via Karnaprayag). The nearest major transport hub is Rishikesh or Dehradun.',
    },
    {
      question: 'Do I need crampons for Brahmatal?',
      answer: 'Microspikes are sufficient for most conditions. Full crampons are not required. Your trek operator will provide microspikes if the trail is icy. Gaiters are strongly recommended for the knee-deep snow sections on the ridge.',
    },
    {
      question: 'What temperatures should I prepare for?',
      answer: 'Night temperatures at camp range from -5°C to -12°C in January, the coldest month. Daytime temperatures on the trail are usually between -2°C and 5°C. Carry a sleeping bag rated to -15°C comfort and dress in layers with a windproof outer shell.',
    },
    {
      question: 'Is there mobile network on the Brahmatal trek?',
      answer: 'BSNL has spotty coverage in Lohajung village only. There is no mobile network once you leave the village. Inform your emergency contacts before departure. Guided operators carry satellite communication devices for emergencies.',
    },
  ],

  updatedAt: '2026-03-05',
};

export default brahmatalTrek;
