import { TrekContent } from '@/types/content';

const milamGlacierTrek: TrekContent = {
  slug: 'milam-glacier-trek',
  title: 'Milam Glacier Trek',
  description:
    'An 8–10 day expedition trek from Munsiyari to the Milam Glacier in the Kumaon Himalaya. Follow the ancient Johar trade route through abandoned villages, glacial moraines, and the Goriganga River valley to one of Uttarakhand\u2019s most remote glacier basecamps at 3,450 metres.',

  locationId: 'munsiyari',
  trekType: 'Guided Trek',

  difficulty: 'Challenging',
  distance: '118 km (round trip)',
  altitude: '3450 m',

  duration: '8–10 Days',
  bestSeason: ['May', 'June', 'September', 'October'],
  pickupPoint: 'Munsiyari',

  overview:
    'The Milam Glacier trek is one of India\u2019s great Himalayan expeditions — a journey that traces the historic Johar Valley trade route from Munsiyari to the snout of the Milam Glacier, beneath the Panchachuli and Trishuli massifs. This is not a weekend escape or a guided nature walk. It is a genuine multi-day expedition through glacial terrain, river crossings, and abandoned trading villages that once connected Kumaon to Tibet.\n\nThe route follows the Goriganga River upstream through progressively more remote terrain. You pass through Lilam, Bogudiar, Martoli, and Burfu — villages that were part of the Johar Bhotiya salt and wool trade network until the Indo-China war of 1962 forced their evacuation. Martoli, at 3,200 metres, is one of the most hauntingly beautiful abandoned settlements in the Indian Himalaya: stone houses with intact walls, empty grain stores, and prayer flags left by returning descendants.\n\nThe glacier itself sits at approximately 3,450 metres — modest by Himalayan standards, yet the surrounding terrain is utterly raw. Moraine fields, braided glacial streams, and the sheer scale of the Panchachuli range above create an environment that feels genuinely wild. The Milam trek rewards patience and endurance, not speed. It is for trekkers who want to walk deep into the mountains, not just look at them from a ridgeline.',

  highlights: [
    'Follow the historic Johar Valley trade route to Tibet',
    'Camp near the Milam Glacier at 3,450 m beneath the Panchachuli range',
    'Walk through abandoned Bhotiya villages — Martoli, Burfu, Bilju',
    'Genuine expedition trekking with 8–10 days of continuous trail',
    'Glacier proximity — moraine fields, braided streams, ice formations',
    'Far fewer trekkers than Garhwal routes — authentic remoteness',
    'Goriganga River valley — one of Kumaon\u2019s most dramatic river corridors',
    'Cultural depth — Johar trade history, Bhotiya heritage, border region significance',
  ],

  itinerary: [
    'Day 1: Arrive in Munsiyari (2,200 m). Permit processing at SDM office. Equipment check and trek briefing. Overnight in guesthouse.',
    'Day 2: Munsiyari to Lilam (1,850 m). Descend to the Goriganga River and follow the valley trail through dense forest. Gradual introduction to the terrain. 12 km, 5–6 hours.',
    'Day 3: Lilam to Bogudiar (2,450 m). Steady ascent through oak and rhododendron forest. River crossings on log bridges. The valley begins to open. 10 km, 5–6 hours.',
    'Day 4: Bogudiar to Martoli (3,200 m). Enter the abandoned village zone. The trail climbs above the treeline onto exposed slopes. Martoli camp sits among ruined stone houses with Panchachuli views. 12 km, 6–7 hours.',
    'Day 5: Acclimatisation day at Martoli. Explore the village ruins, walk to viewpoints above camp. Critical rest day — do not skip this. Light activity, hydration focus.',
    'Day 6: Martoli to Milam Glacier basecamp (3,450 m) via Burfu. Cross moraine fields and braided glacial streams. The final approach to the glacier snout is across loose rock and ice rubble. 14 km, 7–8 hours.',
    'Day 7: Glacier exploration day. Approach the glacier snout, explore lateral moraines, photograph the ice formations and surrounding peaks. Return to basecamp.',
    'Day 8: Begin return — Milam basecamp to Martoli (3,200 m). Faster descent on known trail. 14 km, 5–6 hours.',
    'Day 9: Martoli to Lilam (1,850 m). Long descent day through the valley. 22 km, 7–8 hours.',
    'Day 10: Lilam to Munsiyari (2,200 m). Final ascent back to town. Trek completion. 12 km, 5–6 hours.',
  ],

  inclusions: [
    'Inner Line Permit processing assistance',
    'Experienced local guide and porters',
    'All meals on trek (breakfast, lunch, dinner)',
    'Camping equipment (tents, sleeping bags, mats)',
    'First aid kit and emergency protocols',
    'Munsiyari guesthouse on Day 1 and final night',
  ],

  exclusions: [
    'Travel to/from Munsiyari',
    'Personal trekking gear and clothing',
    'Travel insurance (strongly recommended)',
    'Tips for guides and porters',
    'Any costs arising from itinerary changes due to weather or health',
  ],

  images: [
    {
      src: '/images/milam-glacier-1.jpg',
      alt: 'Milam Glacier and Panchachuli range from the basecamp approach',
    },
  ],

  faqs: [
    {
      question: 'How difficult is the Milam Glacier trek?',
      answer:
        'This is a challenging expedition requiring prior multi-day Himalayan trekking experience. The altitude ceiling is moderate (3,450 m) but the duration (8–10 days), terrain (moraine, river crossings, exposed trails), and remoteness make it significantly harder than treks like Kedarkantha or Har Ki Dun. You should be comfortable with 6–8 hours of daily trekking over rough ground.',
    },
    {
      question: 'Do I need a permit for the Milam Glacier trek?',
      answer:
        'Yes — an Inner Line Permit is mandatory, obtained from the Munsiyari SDM office. Processing takes 1–2 days. Carry passport-size photos and valid government ID. Foreign nationals face additional restrictions near the Indo-China border; check current regulations before planning.',
    },
    {
      question: 'When is the best time to do this trek?',
      answer:
        'May to June (pre-monsoon) and September to October (post-monsoon). May–June offers the best glacier access and wildflower meadows. September–October provides the clearest mountain views after monsoon withdrawal. Avoid July–August entirely due to heavy rainfall and dangerous river conditions.',
    },
    {
      question: 'Is there mobile coverage on the trek?',
      answer:
        'No. BSNL may work intermittently in Munsiyari town, but once you leave for Lilam there is zero mobile coverage for the entire trek. Carry a power bank, inform family of your itinerary, and trust your guide team for communication.',
    },
    {
      question: 'Can beginners attempt this trek?',
      answer:
        'Not recommended. If this is your first Himalayan trek, start with Chakrata for weekend trails or Sankri for 5-day alpine treks. Build your endurance and altitude comfort before attempting a multi-day glacier expedition.',
    },
  ],
};

export default milamGlacierTrek;
