import { TrekContent } from '@/types/content';

const roopkundTrek: TrekContent = {
  slug: 'roopkund-trek',
  title: 'Roopkund Trek (4,800m) – The Skeleton Lake Expedition',
  description:
    'Roopkund trek from Lohajung to the 4,800m skeleton lake, crossing Bedni Bugyal with Trishul views on a challenging 7-day route.',

  locationId: 'lohajung',
  trekType: 'Guided Trek',

  difficulty: 'Challenging',
  distance: '53 km',
  altitude: '4,800 m (15,750 ft)',
  priceRange: '₹14,500 - ₹18,000',
  groupSize: '8-15 Trekkers',

  duration: '7 Days / 6 Nights',
  bestSeason: ['May', 'June', 'September', 'October'],
  pickupPoint: 'Rishikesh / Dehradun',

  /* ----------------- VISUAL / CONVERSION UPGRADE (2026-Q2) ----------------- */

  heroImage: '/Images/trek/region/roopkund_lake.webp',
  heroImageAlt: 'The mysterious Roopkund Lake surrounded by ice and glacial moraine',
  heroTagline: 'Uncover the ultimate Himalayan mystery. An intensely beautiful, deeply challenging high-altitude expedition culminating at the legendary Skeleton Lake.',

  trustSignals: [
    { label: 'Experienced Leaders', sublabel: 'Mountaineering Certified' },
    { label: 'Emergency Evacuation', sublabel: 'Strict turnaround protocols' },
    { label: 'Oximetry', sublabel: 'Daily health checks' },
    { label: 'Small Groups', sublabel: 'Max 12 people' },
  ],

  whyThisTrek: {
    headline: 'Why Roopkund stands alone in the Indian Himalayas',
    body: 'Roopkund is arguably the most famous trek in India, and for good reason. It offers an unparalleled progression of landscapes that few other Himalayan routes can match. Over 53 kilometres, you transition from shadowy, ancient oak forests into the impossibly vast, rolling green carpets of Ali and Bedni Bugyal (the largest high-altitude meadows in Asia). From the meadows, the landscape violently shifts into a stark, lunar world of rock, ice, and glacial moraines as you push to 15,750 feet.\n\nBut the true magnetic pull of this trek is the mystery. Arriving at the shores of Roopkund Lake to find hundreds of ancient human skeletons scattered in the ice and shallow waters is a deeply humbling, eerie, and unforgettable experience. The sheer physical challenge of reaching the lake, combined with the breathtaking proximity to Mount Trishul and Nanda Ghunti, makes Roopkund the ultimate rite of passage for serious Indian trekkers.',
  },

  emotionalHooks: [
    {
      icon: '💀',
      title: 'The Mystery of the Skeletons',
      body: 'Stand on the shores of a frozen lake at 15,750 ft surrounded by the skeletal remains of over 300 ancient travelers. A deeply haunting and awe-inspiring destination.',
    },
    {
      icon: '🏔️',
      title: 'Mount Trishul, Up Close',
      body: 'As you hike across the sprawling Bedni Bugyal, the 7,120-metre high Mount Trishul dominates the horizon, feeling so massive and close you can almost touch it.',
    },
    {
      icon: '🌿',
      title: 'The Twin Bugyals',
      body: 'Walk for days across Ali and Bedni Bugyal. These endless, velvety alpine grasslands are considered the most beautiful and expansive high-altitude meadows in Asia.',
    },
    {
      icon: '🧗‍♂️',
      title: 'A True Himalayan Challenge',
      body: 'Roopkund is a notoriously steep, physically demanding expedition. Reaching the lake requires immense mental grit and cardiovascular endurance. The triumph is earned.',
    },
  ],

  experienceGallery: [
    { src: '/Images/trek/itinerary/roopkund/day1.webp', alt: 'Trekkers hiking through the dense oak forests near Lohajung' },
    { src: '/Images/trek/itinerary/roopkund/day3.webp', alt: 'The sprawling, endless green expanse of Ali Bugyal' },
    { src: '/Images/trek/itinerary/roopkund/day4.webp', alt: 'Camping at Bedni Bugyal with Mount Trishul in the background' },
    { src: '/Images/trek/itinerary/roopkund/day6.webp', alt: 'Navigating the rocky, snowy moraines on the final push to Roopkund' },
    { src: '/Images/trek/itinerary/roopkund/day7.webp', alt: 'The 4,800m Roopkund lake surrounded by ice' },
  ],

  cinematicMoment: {
    image: '/Images/trek/region/roopkund_lake.webp',
    alt: 'Looking down into the frozen bowl of Roopkund Lake',
    quote: "When you finally crest the ridge gasping for air, and look down into the icy, skeletal bowl of Roopkund, the sheer magnitude of the Himalayas hits you all at once.",
    attribution: 'The Skeleton Lake Expedition',
  },

  difficultyProfile: {
    physical: 4,     // Demanding daily distances and steep ascents
    technical: 3,    // Scree, moraine, potential ice near the lake
    altitude: 4,     // 4800m is very severe, high AMS risk
    weather: 4,      // Highly volatile at Bhagwabasa
  },

  /* ----------------- CORE SEO CONTENT ----------------- */

  overview:
    `The Roopkund Trek is the undisputed legend of the Indian Himalayas. Starting from the basecamp of Lohajung in Uttarakhand, this 7-day, 53-kilometre expedition pushes trekkers to a staggering altitude of 4,800 metres (15,750 feet). The final destination is a shallow glacial lake, locked in ice for most of the year, famous for the hundreds of ancient human skeletons visible in its waters—remains that radiocarbon dating traces back to a catastrophic hailstorm in the 9th century.\n\nWhile the macabre history of the lake is the primary draw, the actual journey there is what makes Roopkund structurally flawless as a trekking route. The trail acts as a textbook showcase of Himalayan biomes. You begin in dense, ancient forests of rhododendron and oak, climb out above the tree line onto the twin alpine meadows of Ali and Bedni Bugyal—which roll endlessly like green velvet oceans—and finally enter a hostile, high-altitude alpine zone of black rock, sharp scree, and permanent snow at Bhagwabasa and Roopkund.\n\nThis is a challenging trek. It is NOT for beginners. The altitude gain is aggressive, the air is thin, and the weather above 14,000 feet is notoriously unpredictable. Trekkers must possess excellent cardiovascular endurance and prior high-altitude experience (such as Kuari Pass or Kedarkantha). For those prepared, Roopkund offers an unparalleled sense of achievement and the absolute sharpest, most intimidating views of the Trishul and Nanda Ghunti massifs available in Garhwal.`,

  highlights: [
    'Reaching the legendary Roopkund Lake (15,750 ft) and observing the ancient 9th-century skeletal remains.',
    'Traversing the impossibly vast, rolling green carpets of Ali Bugyal and Bedni Bugyal.',
    'Experiencing staggering, up-close views of Mount Trishul (7,120 m) and Nanda Ghunti (6,309 m).',
    'Camping in extremely diverse environments, from deep oak forests to the rocky, hostile terrain of Bhagwabasa.',
    'A dramatic transition through three distinct ecological zones: Forest, Alpine Meadow, and Glacial Moraine.',
  ],

  itinerary: [
    `Day 1: Drive from Rishikesh/Dehradun to Lohajung (2,300 m) · 250 km · 10-11 Hours Drive\n\nThe expedition begins with a long, spectacular Himalayan drive. Starting early from Rishikesh, you follow the Alaknanda and Pindar rivers, winding through narrow mountain roads. By late afternoon, you arrive at Lohajung, a vibrant trekking hub that serves as the basecamp for Roopkund, Brahmatal, and Ali Bedni Bugyal. The air here is instantly cooler. You will check into a guest house, meet your Expedition Leader, undergo a mandatory blood-pressure and oxygen check, and arrange any last-minute winter gear rentals from the local shops.`,
    
    `Day 2: Trek from Lohajung to Didina (2,450 m) · 8 km · 5-6 Hours\n\nThe trek starts with a relatively easy descent through mixed forests into the Gyan Ganga valley. You will cross a sturdy bridge over the Neel Ganga river, which is a perfect spot to refill water bottles and rest. From the river, a sharp, steep climb begins through a dense, shady forest of ancient brown oak. The ascent is taxing but sets the rhythm for the days ahead. By mid-afternoon, you break through the trees to reach Didina village, a beautiful, isolated settlement where you will camp or stay in traditional homestays for the night.`,

    `Day 3: Trek from Didina to Ali Bugyal (3,400 m) via Tolpani · 10 km · 7 Hours\n\nToday is visually explosive. You begin with a steep, demanding climb straight up through a thick oak and rhododendron forest. After hours of climbing, the tree line abruptly ends, and the landscape violently transforms. You step out onto Ali Bugyal—one of the largest high-altitude meadows in Asia. The sheer scale of the rolling green hills is staggering, and as you walk along the ridge, the massive snow-capped peaks of Trishul and Nanda Ghunti suddenly dominate the sky. The sprawling walk across the velvety bugyal to your campsite is widely considered one of the greatest days of trekking in India.`,

    `Day 4: Trek from Ali Bugyal to Ghora Lotani / Patar Nachauni (3,900 m) via Bedni Bugyal · 7 km · 5 Hours\n\nThis is a crucial acclimatization day. You leave Ali Bugyal and seamlessly cross into Bedni Bugyal. You will pass the Bedni Kund, a small, holy glacial lake reflecting the towering Trishul peak in its waters. The walk is mostly a gentle, undulating traverse across the meadows. However, as you approach Patar Nachauni or Ghora Lotani, the green grass begins to thin out, replaced by brown earth and rocky patches. The altitude nears 13,000 feet, and the air becomes noticeably thinner. You will camp here in exposed terrain, where the wind is notoriously fierce and cold.`,

    `Day 5: Trek from Patar Nachauni to Bhagwabasa (4,100 m) via Kalu Vinayak · 6 km · 5 Hours\n\nToday, you enter the high alpine zone. The day starts with a brutal, steep, zig-zagging climb up to the Kalu Vinayak temple, a small stone shrine dedicated to Lord Ganesha, perched on a dramatic ridge. From the temple, the landscape changes entirely into a desolate, lunar world of black rock, sharp scree, and patches of old snow. You will carefully traverse a rocky path down to Bhagwabasa. At 14,000 feet, this is your highest and coldest camp. The terrain is entirely hostile, and temperatures routinely drop well below freezing by late afternoon. Rest and hydration here are absolutely critical.`,

    `Day 6: Summit Day! Bhagwabasa to Roopkund (4,800 m) & descend to Patar Nachauni · 10 km · 9-10 Hours\n\nThe ultimate push. You will wake up at 3:00 AM, strap on microspikes, and begin climbing by headlamp. The path is a steep, incredibly demanding ascent over rocky, snow-covered moraines. Breathing becomes difficult, and the pace slows to a crawl. As dawn breaks, you crest a final, severely steep ridge and look down into the bowl of Roopkund Lake. The skeletal remains are immediately visible around the edges. After spending 30 to 45 minutes at 15,750 feet taking in the macabre history and the staggering panoramic triumph, you begin the long, exhausting descent all the way back past Bhagwabasa and down to the greener, safer campsite at Patar Nachauni.`,

    `Day 7: Descend from Patar Nachauni to Lohajung via Wan · 15 km Trek + Drive · 7 Hours\n\nThe final trekking day is a massive descent. You retrace your steps past Bedni Bugyal and then plunge onto a steep, knee-jarring trail down through dense forests toward the village of Wan. You will cross the Neel Ganga river one last time before a final, short uphill push to the Wan road-head. Here, your trek formally ends. You will board waiting jeeps for a bumpy, 1-hour drive back to Lohajung. The evening is spent celebrating the immense achievement, sharing stories, and resting in the comfort of a solid bed before departing for Rishikesh the next morning.`,
  ],

  inclusions: [
    'Accommodation in standard homestays at Lohajung and specialized four-season alpine tents during the trek.',
    'All highly nutritious, calorie-dense vegetarian meals from dinner on Day 1 to Breakfast on Day 8 (departure).',
    'Expert, mountaineering-certified Trek Leader, high-altitude guides, and a dedicated sweep team.',
    'Advanced safety equipment including microspikes, climbing ropes (if needed), emergency oxygen cylinders, and pulse oximeters.',
    'All mandatory forest permits, entry fees, and camping charges required by the Uttarakhand Forest Department.',
  ],

  exclusions: [
    'Transport from Rishikesh to Lohajung and back (arranged on an additional cost-sharing basis).',
    'Offloading of heavy personal rucksacks (available at an extra daily charge for mules/porters).',
    'Personal high-altitude trekking gear like -15°C down jackets, trekking boots, or poles (rentals available in Lohajung).',
    'Any meals consumed during the highway road transit between Rishikesh and Lohajung.',
    'Trek insurance (mandatory) and emergency helicopter medical evacuation costs.',
  ],

  safety:
    `Roopkund is a high-risk, high-reward expedition. Reaching 4,800 metres (15,750 feet) places trekkers in a zone where Acute Mountain Sickness (AMS), High Altitude Pulmonary Edema (HAPE), and Cerebral Edema (HACE) are genuine threats. The weather at Bhagwabasa and the summit ridge is exceptionally volatile, capable of producing severe snowstorms or whiteouts within minutes.\n\nOur safety infrastructure for Roopkund is uncompromising. Trekkers are monitored twice daily using pulse oximeters. Our expedition leaders are certified Wilderness First Responders carrying high-capacity oxygen cylinders and comprehensive altitude med-kits (Nifedipine, Dexamethasone, Diamox). During the final ascent, leaders assess the ice conditions directly; if the technical difficulty exceeds safety limits due to fresh snow, or if a storm approaches, our leaders execute a strict, non-negotiable turnaround protocol. The safety of the team absolutely overrides reaching the lake.`,

  permits:
    'Roopkund operates under tightly controlled access by the Uttarakhand Forest Department due to its ecological sensitivity and archaeological importance. Forest permits are strictly mandatory and are processed by our team at the Lohajung check post. Access rules occasionally change; trekkers must carry a valid Original Government Photo ID (Aadhaar Card, Passport) and multiple photocopies. Foreign nationals require a valid Passport and Indian Visa.',

  howToReach: [
    'By Air: Jolly Grant Airport in Dehradun is the nearest airport, though Rishikesh/Kathgodam are better staging points.',
    'By Train: Yog Nagari Rishikesh or Kathgodam railway stations are the standard arrival points.',
    'By Road to Lohajung: It is a 10-12 hour, 250+ km drive from Rishikesh or Kathgodam. We organize reliable, shared 4x4 pickups early in the morning from Rishikesh.',
  ],

  whoShouldAvoid:
    'Roopkund is absolutely not for beginners. If you have never completed a multi-day high-altitude trek (like Kedarkantha or Kuari Pass), you should not attempt Roopkund. Individuals with asthma, cardiovascular conditions, or severe blood pressure issues are strictly prohibited. The final descent involves a 15km knee-crushing drop; anyone with prior ACL, meniscus, or chronic knee issues will find Day 7 excruciating. You must be able to run 5 km in under 30 minutes comfortably to register.',

  localLogistics:
    `Lohajung is a bustling trekking basecamp. It has several well-stocked gear rental shops where you can easily rent heavy winter jackets, specialized trekking boots, poles, and waterproof gloves. It is imperative that you finalize these rentals on Day 1.\n\nCritically, there are absolutely no ATMs in Lohajung, and digital payments rarely work due to poor network. You must withdraw all necessary cash in Rishikesh, Kathgodam, or Dewal to cover offloading fees, rentals, and tips. Network connectivity is patchy; Jio and BSNL work intermittently in Lohajung, but all cellular signals vanish entirely once you begin the trek on Day 2. Inform your family of a 6-day communication blackout.`,

  images: [
    {
      src: '/Images/trek/region/roopkund_lake.webp',
      alt: 'Trekkers standing near the icy shores of the Roopkund skeleton lake',
    },
  ],

  monthlyConditions: [
    { month: 'May', conditions: 'The primary pre-monsoon window. The massive snowdrifts from winter begin to melt, clearing the lower trails and bugyals. However, Bhagwabasa and the final climb to Roopkund remain heavily buried under hard snow and ice. Temperatures at high camps drop to -5°C. Microspikes are mandatory for the summit push.' },
    { month: 'June', conditions: 'Late pre-monsoon. The snow line recedes significantly, often clearing the path up to Roopkund itself. The lake begins to thaw, increasing the chance of seeing the skeletons clearly. Temperatures are slightly warmer (-2°C at night). However, the risk of early monsoon showers arriving in late June makes weather unpredictable.' },
    { month: 'September', conditions: 'Post-monsoon begins. The incredible Bugyals are at their absolute most vibrant, lush green after months of rain. The trail up to Bhagwabasa may be slippery in early September. The skies begin to clear, offering phenomenal views of Trishul. Snow is generally minimal at the lake.' },
    { month: 'October', conditions: 'Peak post-monsoon. The absolute best month for weather stability and razor-sharp mountain visibility. The bugyals turn a stunning golden-brown. However, temperatures are brutally cold, frequently plunging beautifully below -8°C at Bhagwabasa. The lake freezes over, but the crystal-clear views make it the most rewarding month.' },
  ],

  faqs: [
    {
      question: 'Is Roopkund trek suitable for beginners?',
      answer: 'Absolutely not. Roopkund is a High Altitude, Challenging grade trek. You must have prior experience trekking above 3,500m (like Kedarkantha or Brahmatal) to understand how your body reacts to altitude. The days are extremely long and physically punishing.',
    },
    {
      question: 'Will I definitely see the skeletons?',
      answer: 'It depends heavily on the month and snow levels. In May and early June, the lake is often frozen and covered in deep snow, obscuring the skeletons. By late June, September, and October, the snow melts enough that the skeletons scattered around the edges and in the shallow water are clearly visible.',
    },
    {
      question: 'What is the temperature at Bhagwabasa and Roopkund?',
      answer: 'Bhagwabasa is notoriously freezing and windy. In May/June, expect daytime temperatures of 5°C and nights dropping to -5°C. In September/October, nights regularly plunge to -8°C or colder. You need heavy, specialized winter gear for the upper camps.',
    },
    {
      question: 'Is the Roopkund Trek currently open?',
      answer: 'Roopkund operates under strict forest department regulations which occasionally close the trail for ecological recovery. You must check current permit status with an authorized operator or the Uttarakhand Forest Department before planning your expedition.',
    },
    {
      question: 'Do I need technical climbing gear like ropes and ice axes?',
      answer: 'Roopkund is primarily a trekking peak, not a technical mountaineering climb. Ropes and ice axes are rarely necessary unless there is unseasonal heavy ice. However, microspikes and gaiters are almost always required for the final push from Bhagwabasa to the lake.',
    },
  ],

  updatedAt: '2026-04-20',
};

export default roopkundTrek;
