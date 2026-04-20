import { TrekContent } from '@/types/content';

const dayaraBugyalTrek: TrekContent = {
  slug: 'dayara-bugyal-trek',
  title: 'Dayara Bugyal Trek (3,750m) – The Great Himalayan Meadow',
  description:
    'Trek to Dayara Bugyal, one of India’s most expansive and beautiful alpine meadows. A perfect 4-day beginner trek from Barsu offering jaw-dropping views of the Bandarpoonch massif.',

  locationId: 'barsu',
  trekType: 'Beginner Trek',

  difficulty: 'Easy',
  distance: '22 km',
  altitude: '3,750 m (12,300 ft)',
  priceRange: '₹8,500 – ₹10,500',
  groupSize: '8–15 Trekkers',

  duration: '4 Days / 3 Nights',
  bestSeason: ['January', 'February', 'March', 'April', 'May', 'October', 'November'],
  pickupPoint: 'Dehradun / Rishikesh',

  /* ----------------- VISUAL / CONVERSION UPGRADE (2026-Q2) ----------------- */

  heroImage: '/Images/trek/region/bramhatal.webp', // Placeholder until Dayara specific image uploaded
  heroImageAlt: 'The vast rolling green and snowy meadows of Dayara Bugyal with Bandarpoonch peak',
  heroTagline: 'Walk upon endless miles of velvet green grass. The perfect beginner trek offering the single largest meadow in Uttarakhand and towering views of Mount Bandarpoonch.',

  trustSignals: [
    { label: 'Beginner Friendly', sublabel: 'Perfect first trek' },
    { label: 'Short Duration', sublabel: 'Only 4 Days' },
    { label: 'Oximetry', sublabel: 'Daily health checks' },
    { label: 'Small Groups', sublabel: 'Max 15 people' },
  ],

  whyThisTrek: {
    headline: 'Why Dayara Bugyal is the absolute best trek for beginners',
    body: 'If you ask any seasoned mountaineer where a beginner should start their Himalayan journey, they will almost universally say: Dayara Bugyal. Unlike summit treks that involve grueling ascents and treacherous moraines, this trek is an absolute joy. Starting from the beautiful village of Barsu, the trail meanders through shaded, ancient oak forests that completely protect you from the harsh sun and wind.\n\nThe real magic happens when you break the treeline. You do not just see a small patch of grass; you step onto a jaw-dropping 28-square-kilometre expanse of alpine meadow that rolls continuously across the horizon. Depending on the season, this sprawling carpet is either intensely green and dotted with wildflowers, or covered in a perfectly smooth blanket of winter snow. To cap it all off, the mammoth Bandarpoonch and Black Peak mountains loom majestically in the background, offering world-class views for a fraction of the physical effort required by other treks.',
  },

  emotionalHooks: [
    {
      icon: '🌿',
      title: 'The Largest Meadow in Garhwal',
      body: 'At nearly 28 square kilometres, Dayara Bugyal is astronomically large. Walking barefoot on the soft, velvet grass while staring at 6,000m peaks is an unmatched feeling.',
    },
    {
      icon: '🏔️',
      title: 'Mount Bandarpoonch Views',
      body: 'The massive, sprawling Bandarpoonch (Monkey’s Tail) massif dominates the skyline. During sunset, the snows on the peak turn a burning, fiery gold.',
    },
    {
      icon: '❄️',
      title: 'A Winter Wonderland',
      body: 'In January and February, the entire meadow freezes and is buried under feet of fresh snow. It becomes one of the safest and most photogenic winter snow treks in India.',
    },
    {
      icon: '🌲',
      title: 'Oak & Maple Forests',
      body: 'The initial climb through the forests of Barnala is deeply meditative. The ancient brown oak and maple trees create a canopy that filters the mountain sunlight perfectly.',
    },
  ],

  experienceGallery: [
    { src: '/Images/whyhimalaya/nature.webp', alt: 'Trekkers making their way through the ancient oak forests from Barsu' },
    { src: '/Images/trek/region/bramhatal.webp', alt: 'Camping at Barnala Tal under a canopy of stars' },
    { src: '/Images/whyhimalaya/nature.webp', alt: 'The expansive, rolling meadows of Dayara Bugyal in full bloom' },
    { src: '/Images/trek/region/bramhatal.webp', alt: 'The majestic Bandarpoonch peak viewed from the meadow' },
    { src: '/Images/whyhimalaya/nature.webp', alt: 'Trekkers descending through the snowy winter landscape' },
  ],

  cinematicMoment: {
    image: '/Images/trek/region/bramhatal.webp',
    alt: 'The golden hour lighting up the Dayara Bugyal meadows',
    quote: "When you step out of the dark oak forest and see miles of perfectly vibrant green meadows sprawling toward the sky, breathing suddenly becomes very easy.",
    attribution: 'The Great Himalayan Meadow',
  },

  difficultyProfile: {
    physical: 1,     // Short walking days 
    technical: 1,    // Basic walking trails
    altitude: 2,     // Max 3750m, very safe
    weather: 2,      // Mild in summer
  },

  /* ----------------- CORE SEO CONTENT ----------------- */

  overview:
    `For many seeking their first taste of the high Himalayas, the Dayara Bugyal trek represents the perfect induction. Located in the Uttarkashi district of Uttarakhand, this 4-day, 22-kilometre trek is famous for culminating at one of the finest and largest alpine meadows (Bugyals) in the entire country. Peaking at an altitude of 3,750 metres (12,300 ft), the trek is perfectly engineered to offer maximum visual reward with minimal physical punishment.\n\nThe journey begins from the quaint village of Barsu, plunging immediately into incredibly deep, silent forests of oak, pine, and rhododendron. The tree cover is so absolute that you often walk in cool shade until you reach the intermediate campsite at Barnala Tal. The pristine Barnala lake, surrounded by pine trees, sets the stage for the dramatic reveal on Day 3. Moving past the treeline, you step out onto Dayara Bugyal—a 28-square-kilometre expanse of rolling, velvety alpine grass that stretches as far as the eye can see.\n\nThe sheer scale of the meadow is what leaves trekkers speechless. It is so vast that it feels like walking on a green ocean. Looming directly over these meadows are the colossal snow-capped peaks of the Gangotri range, most notably the towering Bandarpoonch massif and Black Peak. Whether you do this trek in the spring to witness the meadows explode with wildflowers, or in the dead of winter (January) when the entire bugyal turns into a pristine, undulating snowfield, Dayara Bugyal is an experience that stays with you forever.`,

  highlights: [
    'Exploring Dayara Bugyal, widely considered the most beautiful and expansive high-altitude meadow in India.',
    'Jaw-dropping, completely unobstructed views of the Bandarpoonch massif, Black Peak, and the Gangotri range.',
    'A highly beginner-friendly altitude profile makes this the absolute safest Himalayan trek for first-timers and families.',
    'Camping beside the serene, forest-enclosed waters of Barnala Tal.',
    'A deeply immersive walk through ancient, heavily shaded oak and rhododendron forests that bloom bright red in spring.',
  ],

  itinerary: [
    `Day 1: Drive from Dehradun to Barsu (2,200 m) · 185 km · 7-8 Hours Drive\n\nThe expedition begins early at the Dehradun Railway Station. You will board a shared vehicle for a highly scenic drive cutting through the Garhwal Himalayas. The route follows the beautiful Bhagirathi River for a significant stretch, passing through the historic mountain town of Uttarkashi. By late afternoon, you arrive at the quiet, terraced village of Barsu, the basecamp for Dayara Bugyal. You will check into a guesthouse or homestay, enjoy the crisp mountain air, meet your Trek Leader, and complete a final gear check before a hearty dinner.`,
    
    `Day 2: Trek from Barsu to Barnala Tal (2,700 m) · 5 km · 4 Hours\n\nThe trekking begins! After breakfast, you step onto a well-defined stone trail leading out of Barsu. Almost immediately, you are swallowed by a dense, beautiful forest of silver oak, maple, and rhododendron. The trail ascends gradually. The canopy is so thick that sunlight filters through in bright, dramatic shafts. After roughly 4 hours of highly enjoyable, shaded walking, the forest suddenly thins out, revealing a large clearing. This is Barnala—your first campsite. Nearby lies Barnala Tal, a small, pristine lake reflecting the surrounding oak trees. You will pitch tents here and spend the evening watching the sunset over the distant peaks.`,

    `Day 3: Trek from Barnala to Dayara Bugyal (3,750 m) and return · 10 km · 6-7 Hours\n\nThis is the summit day and the absolute highlight of the trek. You leave Barnala early, continuing your climb through the oak forest. As you ascend, the trees begin to shrink and eventually vanish entirely as you cross the tree line. In front of you, the landscape rips open to reveal Dayara Bugyal. The sheer scale of the 28 sq. km meadow is breathtaking. You will spend hours walking across the undulating green (or snowy) hills, gaining altitude until you reach the highest point, Bakaria Top (3,800m). From here, the 180-degree panorama of the Gangotri peaks—including Bandarpoonch and Kala Nag—is utterly spectacular. After soaking in the views, you descend back to the Barnala camp for the night.`,

    `Day 4: Trek from Barnala to Barsu, Drive to Dehradun · 5 km Trek + 7 Hours Drive\n\nThe final day is a very quick, easy descent. With your lungs fully acclimatized, the downhill walk back through the oak forest to Barsu will likely take you less than two hours. Arriving back at the village, you will say goodbye to your support staff, have a final cup of tea, and board the vehicles back to Dehradun. The drive retraces the scenic route past Uttarkashi, and you will be dropped off at the Dehradun Railway Station by early evening, concluding an incredible journey.`,
  ],

  inclusions: [
    'Accommodation in standard homestays/guesthouses at Barsu and premium alpine tents during the trek.',
    'All freshly prepared, calorie-dense vegetarian meals from dinner on Day 1 to Breakfast on Day 4.',
    'Experienced, NIM-certified Trek Leader, assistant guides, and dedicated support and kitchen staff.',
    'Complete safety and medical equipment, including pulse oximeters, emergency oxygen cylinders, and extensive first-aid kits.',
    'All mandatory forest permits, entry fees, and camping charges required by the local Uttarakhand forest department.',
  ],

  exclusions: [
    'Transport from Dehradun to Barsu and back (we arrange reliable shared vehicles at an extra, divided cost).',
    'Offloading of personal rucksacks onto mules/porters (available at an extra per-day charge if needed).',
    'Personal high-altitude trekking gear like thick down jackets, trekking boots, or poles (rentals can be arranged).',
    'Any meals or snacks consumed during the highway transit between Dehradun and Barsu.',
    'Personal trek insurance (mandatory) and emergency medical evacuation costs.',
  ],

  safety:
    `Dayara Bugyal is statistically the safest multi-day high-altitude trek in Uttarakhand. The altitude gain is exceptionally gradual, maxing out at 3,750 metres, which gives your body excellent time to acclimatize and drastically reduces the risk of Acute Mountain Sickness (AMS). Furthermore, the trail is wide, well-defined, and completely devoid of dangerous scree slopes, technical moraines, or deep river crossings.\n\nDespite the beginner rating, our safety protocols remain uncompromising. Our Trek Leaders carry pulse oximeters and measure every trekker's oxygen saturation levels twice a day. A fully stocked high-altitude med-kit (including life-saving altitude drugs and emergency oxygen) is always present on the trail. During winter batches (Jan/Feb) when the meadow is buried under deep snow, we provide high-quality microspikes and gaiters to ensure perfect traction, eliminating the risk of slipping on ice.`,

  permits:
    'A standard forest entry permit is required to enter the Dayara Bugyal region, which falls under the jurisdiction of the Uttarkashi forest division. Our team entirely handles the permit acquisition process at the basecamp. You are simply required to bring a valid, original Government Photo ID (Aadhaar Card, Passport, or Driving Licence) and a photocopy.',

  howToReach: [
    'By Air: The Jolly Grant Airport in Dehradun is the nearest airport, located roughly 200 km from Barsu.',
    'By Train: Dehradun Railway Station is the primary arrival point, well connected to Delhi by the Shatabdi Express and Vande Bharat.',
    'By Road to Barsu: The drive from Dehradun to Barsu covers 185 km and takes about 7-8 hours. We organize highly reliable shared transport pickups directly from Dehradun on Day 1 morning.',
  ],

  whoShouldAvoid:
    'Because it is so incredibly accessible, there are very few people who should avoid Dayara Bugyal. It is perfect for children as young as 7 years old and fit adults up to 65. However, individuals with severe, chronic cardiovascular conditions or respiratory diseases should consult a physician before attempting any high-altitude activity. If you cannot walk 4 kilometres at sea level without severe exhaustion, you must build basic fitness before attempting the trek.',

  localLogistics:
    `Barsu is a relatively small, quiet village compared to massive hubs like Sankri. While there are basic shops, high-end gear rental options are limited. We highly recommend renting heavy winter jackets or trekking shoes from Dehradun or Uttarkashi on the way up, or informing our team weeks in advance so we can arrange them for you.\n\nThere are absolutely no ATMs in Barsu. You must withdraw all necessary cash (for offloading fees, snacks, tips) in Dehradun or Uttarkashi. Network connectivity is spotty; BSNL and Jio work decently in Barsu, but once you enter the forest toward Barnala, all cellular signals will vanish entirely. Prepare your family for 2-3 days of radio silence.`,

  images: [
    {
      src: '/Images/trek/region/bramhatal.webp',
      alt: 'Trekkers exploring the highest point of Dayara Bugyal meadow',
    },
  ],

  monthlyConditions: [
    { month: 'January', conditions: 'The meadow is completely frozen and buried under feet of thick snow. It transforms into one of the best snow treks in India. The skies are flawlessly blue, and the snow reflects a blinding white. Microspikes are strictly required. Daytime is pleasant while walking, but nights plunge to -5°C.' },
    { month: 'April', conditions: 'Peak spring. The winter snow has melted away, leaving the meadow intensely green. The oak and rhododendron forests leading up to Barnala are aggressively blooming with red and pink flowers. The weather is phenomenally pleasant and warm during the day (15°C).' },
    { month: 'May', conditions: 'The most popular summer month. The grass on the bugyal is lush and thick, dotted with tiny yellow and white wildflowers. The skies can occasionally gather clouds in the afternoon, but the mornings offer staggering views of Bandarpoonch. Extremely comfortable temperatures.' },
    { month: 'October', conditions: 'Post-monsoon perfection. The skies are washed completely clean, offering the sharpest, most high-definition views of the Gangotri range all year. The green meadow grass begins to turn a beautiful, fiery shade of orange and gold. Crisp, cold air sets in during the evenings.' },
    { month: 'November', conditions: 'Early winter sets in. The orange grasses dry out completely, and the first dusting of winter snow often falls on Bakaria Top by late November. The crowds thin out dramatically, making it a highly peaceful experience. Temperatures drop to around 0°C at night at Barnala.' },
  ],

  faqs: [
    {
      question: 'Is Dayara Bugyal really suitable for absolute beginners?',
      answer: 'Yes, it is widely considered the ultimate beginner trek. The daily walking distances are short (mostly 5 km), the altitude gain is incredibly gradual, and the well-marked forest trails require absolutely no technical scrambling. It is highly recommended for families.',
    },
    {
      question: 'Will there be snow on the Dayara Bugyal trek?',
      answer: 'If you want guaranteed snow, you must trek in late December, January, or February. During these months, the meadow acts as a giant snowfield. By late April and May, the snow melts completely, revealing the lush green grass.',
    },
    {
      question: 'What is the temperature like on the trek?',
      answer: 'During summer (May/June), daytime temperatures range from 15°C to 20°C, and nights stay around 5°C. In winter (Jan/Feb), daytime is roughly 8°C to 12°C, but nights at Barnala can easily plunge to -5°C. You will need a proper down jacket regardless of the season.',
    },
    {
      question: 'Can I rent trekking gear?',
      answer: 'Barsu has limited rental options. We strongly advise either carrying your own gear, renting it in Uttarkashi on the way up, or informing our team 15 days in advance so we can guarantee the availability of jackets, shoes, and poles for you at basecamp.',
    },
    {
      question: 'Can I offload my backpack?',
      answer: 'Yes, if you feel you cannot carry your 8 kg rucksack, you can offload it onto our mules for an extra daily charge. You will only need to carry a small 20-litre daypack with your water bottle, fleece layer, and rain poncho while walking.',
    },
  ],

  updatedAt: '2026-04-20',
};

export default dayaraBugyalTrek;
