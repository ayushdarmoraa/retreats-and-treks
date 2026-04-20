import { TrekContent } from '@/types/content';

const kuariPassTrek: TrekContent = {
  slug: 'kuari-pass-trek',
  title: 'Kuari Pass Trek (3,876m) – The Lord Curzon Trail',
  description:
    'Trek the historic Lord Curzon Trail to Kuari Pass at 3,876m. Experience continuous 180° views of Nanda Devi, Dronagiri & Chaukhamba. A perfect 5-day moderate trek from Joshimath/Rishikesh.',

  locationId: 'joshimath',
  trekType: 'Guided Trek',

  difficulty: 'Moderate',
  distance: '33 km',
  altitude: '3,876 m (12,716 ft)',
  priceRange: '₹9,500 - ₹11,000',
  groupSize: '10-14 Trekkers',

  duration: '5 Days / 4 Nights',
  bestSeason: ['March', 'April', 'May', 'October', 'November'],
  pickupPoint: 'Rishikesh / Joshimath',

  /* ----------------- VISUAL / CONVERSION UPGRADE (2026-Q2) ----------------- */

  heroImage: '/Images/trek/region/kuari.webp',
  heroImageAlt: 'Stunning panoramic views of Mount Nanda Devi from the Kuari Pass summit ridge',
  heroTagline: 'Step into the amphitheater of giants. Walk the historic Lord Curzon Trail and witness the most spectacular, uninterrupted panorama of India’s highest mountains.',

  trustSignals: [
    { label: 'Unmatched Panoramas', sublabel: 'Nanda Devi & Chaukhamba' },
    { label: 'Beginner Friendly', sublabel: 'Perfect altitude profile' },
    { label: 'Oximetry', sublabel: 'Daily health checks' },
    { label: 'Small Groups', sublabel: 'Max 14 people' },
  ],

  whyThisTrek: {
    headline: 'Why Kuari Pass offers the greatest effort-to-reward ratio in the Himalayas',
    body: 'When Lord Curzon trekked this route in 1905, he was so struck by its beauty that the trail was named after him. Today, the Kuari Pass Trek remains an absolute crown jewel for one simple reason: it offers the most expansive, up-close views of the highest peaks in the Indian Himalayas without requiring a grueling expedition.\n\nFrom the moment you leave the forests of Gulling, the skyline is dominated by colossal 7,000-metre giants. You are treated to razor-sharp views of Mount Nanda Devi (India’s highest mountain entirely within the country), the imposing Dronagiri, Kamet, and the sprawling mass of Chaukhamba. Unlike deeply enclosed valleys where peaks peak through gaps, Kuari Pass sets you on an open ridge, giving you a 180-degree wall of snow-capped mountains. The lack of brutal inclines makes this an incredibly accessible trek for beginners seeking their first high-altitude panorama.',
  },

  emotionalHooks: [
    {
      icon: '🏔️',
      title: 'The Nanda Devi Sanctuary',
      body: 'Gaze into the legendary sanctuary of Nanda Devi. The twin peaks of the goddess mountain perfectly frame your horizon for almost the entire duration of the trek.',
    },
    {
      icon: '🌲',
      title: 'Ancient Oak & Rhododendron Forests',
      body: 'Walk through pristine, moss-draped ancient oak forests that transform into violent shades of red and pink during the spring rhododendron bloom.',
    },
    {
      icon: '🏕️',
      title: 'Alpine Meadow Camping',
      body: 'Pitch your tents in the stunning high-altitude clearings of Khullara and Tali, deeply immersed in absolute silence beneath a heavy canopy of Himalayan stars.',
    },
    {
      icon: '📖',
      title: 'The Historical Lord Curzon Trail',
      body: 'Walk the exact path discovered over a century ago by the Viceroy of India, passing through deeply remote shepherd trails untouched by modern encroachment.',
    },
  ],

  experienceGallery: [
    { src: '/Images/trek/itinerary/kuari-pass/day1.webp', alt: 'Trekkers passing through thick Himalayan oak forests' },
    { src: '/Images/trek/itinerary/kuari-pass/day2.webp', alt: 'The view of Mount Dronagiri from Khullara camp' },
    { src: '/Images/trek/itinerary/kuari-pass/day3.webp', alt: 'Standing triumphantly at Kuari Pass with Nanda Devi behind' },
    { src: '/Images/trek/itinerary/kuari-pass/day4.webp', alt: 'Descent through the pristine alpine meadows of Gorson Bugyal' },
    { src: '/Images/trek/itinerary/kuari-pass/day5.webp', alt: 'Trekking near the beautiful Auli ski slopes' },
  ],

  cinematicMoment: {
    image: '/Images/trek/snow/kuari.webp',
    alt: 'The golden hues of sunset hitting the Chaukhamba massif from Kuari Pass',
    quote: "No photograph can ever prepare you for the scale of Nanda Devi when it suddenly breaks through the clouds in front of you.",
    attribution: 'The Lord Curzon Trail',
  },

  difficultyProfile: {
    physical: 2,     // Relatively easy gradient
    technical: 1,    // Basic walking
    altitude: 3,     // Up to 3876m carries mild AMS risk
    weather: 2,      // Very pleasant in Spring/Autumn
  },

  /* ----------------- CORE SEO CONTENT ----------------- */

  overview:
    `Kuari Pass holds an elite status among Himalayan trekking routes. Also known as the Lord Curzon Trail, this moderate trek snakes its way through the Nanda Devi Biosphere Reserve, beginning from Joshimath and concluding at the famed Auli ski slopes. Over five days, trekkers ascend to a maximum altitude of 3,876 metres (12,716 ft), weaving through varying landscapes that include ancient oak canopies, expansive alpine meadows known as "bugyals", and high-altitude, rocky ridges.\n\nThe undeniable draw of the Kuari Pass trek is the mountains. You aren't just walking towards one peak; you are walking alongside a gallery of giants. The trail acts as a natural balcony presenting a 180-degree unobstructed vista of the Eastern Garhwal Himalayas. You will clearly see Mount Nanda Devi (7,816 m)—the jewel of India—along with Dronagiri, Hathi Ghoda, Kamet, and the Chaukhamba massifs. It is rare to get such high-altitude views on a trek that demands so little physical hardship.\n\nIdeal for families, determined beginners, and seasoned hikers seeking visual rewards rather than grueling punishment, the trek is exceptionally beautiful in two distinct windows. In spring (March to May), the lower forests erupt in vibrant rhododendron blooms and the upper meadows begin taking on lush green tones. In autumn (October to November), the monsoon has washed thousands of miles of atmosphere clean, leaving the mountains looking razor-sharp against crisp, blue skies, while the foliage turns into a sea of golden yellow.`,

  highlights: [
    'Uninterrupted, 180-degree panoramic views of Nanda Devi, Chaukhamba, Dronagiri, and Kamet.',
    'Walking the historical Lord Curzon Trail pioneered in 1905 by the British Viceroy of India.',
    'Traversing through the enchanting oak and rhododendron forests of the Nanda Devi Biosphere.',
    'Camping at Khullara and Tali – vast alpine meadows known for their intense starlight and tranquility.',
    'Concluding the trek by descending through the famous, rolling ski slopes of Auli.',
  ],

  itinerary: [
    `Day 1: Drive from Rishikesh to Joshimath (1,890 m) · 250 km · 9-10 Hours Drive\n\nThe journey to Kuari Pass begins with a sprawling road trip deep into the Garhwal Himalayas. Starting from the spiritual hub of Rishikesh, the route follows the magnificent Alaknanda River, winding through legendary confluences like Devprayag, Rudraprayag, and Karnaprayag. The scenic drive takes about 10 hours and rapidly gains elevation, depositing you in the mountain town of Joshimath by early evening. Important as the winter seat of Lord Badrinath and a gateway to several high-altitude expeditions, Joshimath is a bustling hub. You'll check into a comfortable guest house, meet your trekking team, finalize gear rentals, and get a thorough safety briefing for the days ahead.`,
    
    `Day 2: Drive from Joshimath to Dhak (12 km), Trek to Gulling (2,800 m) · 6 km Trek · 4 Hours\n\nAfter a short, 45-minute drive from Joshimath, the actual walking begins at the dusty village of Dhak. The trail ascends immediately, moving past traditional step-terrace farms and the mud-and-stone houses of Tugasi village. The ascent here is moderate, allowing you to settle into a comfortable walking rhythm. Soon, the exposed, rocky terrain shifts into dense, cooling forests of brown oak and maple. If trekking in spring, the forest floor is usually carpeted in dry leaves while the canopy bursts with rhododendrons. After 4 hours of steady trekking, you arrive at Gulling, a picturesque campsite tucked safely inside the forest line, offering your first clear glimpses of the looming Dronagiri peak.`,

    `Day 3: Trek from Gulling to Tali Lake / Khullara (3,350 m) · 6 km · 5 Hours\n\nToday's trek is remarkably beautiful and gentle. Leaving Gulling, you continue ascending through a silent oak forest that progressively gives way to sweeping alpine meadows, or 'bugyals'. As you break through the tree line near Tali, the landscape suddenly bursts open. The imposing, jagged structure of Mount Nanda Devi suddenly occupies the skyline to your right, framed perfectly by the rolling green (or snowy) meadows. The trail is mostly a traverse here, moving over rolling hills toward the Khullara campsite. Khullara is a vast, open meadow. Camping here is an incredible experience; the sheer face of Dronagiri feels close enough to touch, and the night sky is famously devoid of any light pollution.`,

    `Day 4: Summit Day! Khullara to Kuari Pass (3,876 m) and return to Tali (3,350 m) · 12 km · 7-8 Hours\n\nThis is the longest, most rewarding day of the expedition. You will start early, tackling a steady, zig-zagging ascent up to the Kuari Pass ridge known as the 'Lord Curzon Trail'. Though the altitude crosses 12,000 feet, the gradient is manageable. As you reach the pass, the air thins and the temperature drops, but the visual reward is staggering. You are greeted by a 180-degree amphitheater of the greatest mountains in India: Nanda Devi, Chaukhamba, Neelkanth, Kamet, Hathi Parbat, and Ghori Parbat. After taking ample photographs and resting at the wind-swept pass, you will retrace your steps back down to the Khullara meadow, and continue a short distance to camp at the beautiful, serene Tali lake.`,

    `Day 5: Tali to Auli (2,600 m) and Drive to Joshimath · 8 km Trek · 5 Hours\n\nThe final day is famous for the stunning descent through the Gorson Bugyal. Leaving Tali, you navigate a narrow, slightly exposed ridge line that leads out into massive, rolling alpine plains. Gorson Bugyal is incredibly vast, and on a clear day, the entire Nanda Devi sanctuary is visible as you walk across the grass. Eventually, the trail drops into dense pine forests and converges with the famous ski slopes of Auli. Here, the trek formally ends. You'll board waiting vehicles (or the ropeway, if operational) for the short trip back to Joshimath, arriving in time for a hot shower, a celebratory dinner, and a good night’s rest before driving back to Rishikesh the following morning.`,
  ],

  inclusions: [
    'Accommodation in premium guest houses in Joshimath (Day 1) and four-season high-altitude tents during the trek.',
    'All freshly prepared, highly nutritious vegetarian meals starting from dinner warmly served on Day 1 to Breakfast on Day 5.',
    'Highly experienced, NIM-certified Trek Leader, assistant guides, and dedicated kitchen staff.',
    'Comprehensive safety equipment including specialized microspikes, Gaiters, emergency oxygen cylinders, and pulse oximeters.',
    'All forest permits, entry fees, and camping charges for the Nanda Devi Biosphere and Lord Curzon Trail.',
  ],

  exclusions: [
    'Transport from Rishikesh to Joshimath and back (can be facilitated on a shared-cost basis).',
    'Offloading of personal rucksacks to mules/porters (available at an extra per-day charge).',
    'Trekking gear rentals such as heavy winter jackets, hiking boots, or trekking poles (rentable in Joshimath).',
    'Any meals consumed during the highway transit between Rishikesh and Joshimath.',
    'Personal trek insurance, emergency evacuation costs, and staff gratuities.',
  ],

  safety:
    `Kuari Pass is celebrated as one of the safest moderate-altitude treks in Uttarakhand. Its gradual altitude progression makes it highly suitable for first-timers, heavily reducing the risk of Acute Mountain Sickness (AMS). Additionally, the Kuari Pass route does not require traversing glaciers, navigating highly exposed ledges, or utilizing technical mountaineering gear. The trails are wide and established.\n\nHowever, our safety protocols remain absolute regardless of the difficulty rating. Trek leaders monitor every participant twice a day with pulse oximeters to accurately track oxygen saturation and heart rates. Medical kits—equipped with Nifedipine, Dexamethasone, and emergency oxygen—are always present. During November or early spring batches, when the summit ridge may hold ice or fresh snow, we provide heavy-duty microspikes to ensure perfect traction. Communication is maintained through satellite trackers and radios in dead zones.`,

  permits:
    'The Lord Curzon trail and the Kuari Pass region fall under the jurisdiction of the Nanda Devi National Park and local forest departments. A standard forest permit is mandatory, which is arranged entirely by our team in Joshimath before the trek begins. You are simply required to carry a valid Government-issued Original Photo ID (Aadhaar Card, Passport, or Voter ID) and a physical photocopy. Foreign nationals require a valid Indian Visa and Passport.',

  howToReach: [
    'By Air: The Jolly Grant Airport in Dehradun is the nearest airport, located approximately 270 km from Joshimath. Direct flights operate daily from Delhi.',
    'By Train: Yog Nagari Rishikesh or Haridwar Railway Stations are the main railheads, extremely well connected to Delhi by the Shatabdi and Vande Bharat expresses.',
    'By Road to Joshimath: The journey from Rishikesh to Joshimath covers 250+ km and takes around 9-10 hours. We organize highly reliable shared transport pickups directly from Rishikesh at 6 AM on Day 1.',
  ],

  whoShouldAvoid:
    'While beginner-friendly, Kuari Pass still demands walking 5 to 6 hours a day across rough, undulating terrain at high altitudes. Individuals with chronic cardiovascular conditions, severe asthma, or uncontrolled blood pressure issues must consult a specialist before registering. If you are recovering from recent knee, ankle, or hip surgeries, the descents on Day 4 and Day 5 can heavily aggravate joint stress. Trekkers should be able to cover 5 kilometres in roughly 35 minutes comfortably.',

  localLogistics:
    `Joshimath is an exceptionally well-equipped mountain town. It serves as the basecamp for Kuari Pass, the Valley of Flowers, and major mountaineering expeditions. If you lack heavy winter down jackets, waterproof trekking boots, or poles, you can easily rent high-quality equipment from numerous rental shops in the main bazaar on Day 1.\n\nIt features multiple working ATMs (State Bank of India being the most reliable) and pharmacies. However, we highly recommend drawing your necessary cash in Rishikesh, as mountain ATMs frequently run out of cash during peak pilgrimage season. Network connectivity is robust in Joshimath (Jio, Airtel, BSNL), but signal becomes highly fragmented past Dhak and disappears entirely at Khullara and Tali lakes. Inform your family you will be off the grid for 3 days.`,

  images: [
    {
      src: '/Images/trek/region/kuari.webp',
      alt: 'Trekkers on the Kuari pass ridge with Chaukhamba mountain views',
    },
  ],

  monthlyConditions: [
    { month: 'March', conditions: 'Late winter transitioning to spring. The trail below 3,200 m (Gulling/Tali) is clear, but upper meadow sections and the pass will still retain thick blankets of white snow. Temperatures drop to -5°C at camp. Rhododendron buds begin opening at lower elevations. An excellent mix of deep snow and spring warmth.' },
    { month: 'April', conditions: 'Prime spring trekking. The forests between 2,800m and 3,500m are completely ablaze with giant rhododendron blooms in vivid red, pink, and white. The trail is mostly snow-free except near the pass itself. Temperatures linger between 5°C and -2°C at camp. Warm, comfortable hiking conditions make this the most popular month.' },
    { month: 'May', conditions: 'Late spring. The trail is almost entirely snow-free. The weather is notably warmer, with nighttime temperatures rarely dropping freezing (around 2°C). High alpine meadows burst with tiny wildflowers. Some afternoon cloud buildup is common, meaning mornings offer the sharpest views of Nanda Devi. Extremely beginner-friendly conditions.' },
    { month: 'October', conditions: 'Post-monsoon perfection. The skies have been completely washed by the monsoon rains, resulting in the most crystal-clear, razor-sharp air of the year. The mountain visibility is utterly flawless. The foliage rapidly turns a burning gold/yellow. Temperatures drop sharply at night, to around -4°C. The absolute best month for photographers.' },
    { month: 'November', conditions: 'Early winter sets in. The crisp autumn views remain, but the temperatures nosedive, frequently hitting -7°C at Tali and Khullara. The days shorten considerably. First snows on the pass are possible by mid-month. It offers near-total solitude for trekkers willing to brave the bitter cold before the trail closes for deep winter.' },
  ],

  faqs: [
    {
      question: 'Is Kuari Pass suitable for absolute beginners?',
      answer: 'Yes, Kuari Pass is often cited as the best beginner high-altitude trek in India. The altitude gain is gradual, the distances are manageable, and there are no technical sections. However, "beginner" implies a baseline level of fitness—you must still be prepared to walk roughly 6 km a day over steep forest trails.',
    },
    {
      question: 'When is the absolute best time to do the Kuari Pass trek?',
      answer: 'It depends entirely on your objective. If you want to see snow and blooming red rhododendron forests, choose April. If you are an avid photographer and want absolutely flawless, crystal-clear views of Nanda Devi and Chaukhamba, choose October or early November.',
    },
    {
      question: 'Can I do Kuari Pass and Pangarchulla together?',
      answer: 'Yes. The Pangarchulla Peak (4,700m) expedition shares the exact same basecamps and initial route as Kuari Pass. If you want a more extreme challenge, you can book the Pangarchulla trek. However, Pangarchulla is a difficult, demanding summit climb requiring high fitness and prior experience, unlike Kuari Pass.',
    },
    {
      question: 'Do I need to carry my own backpack?',
      answer: 'Trekking is highly rewarding when you carry your own rucksack. However, if you feel unable to carry your 8-10kg bag, you can opt to offload it to our mules or porters. This must be informed at least 15 days in advance so transport can be arranged. There is an additional daily charge for offloading.',
    },
    {
      question: 'Is the Auli cable car operating?',
      answer: 'The descent goes through Auli. The famous Auli Ropeway connects the top to Joshimath, offering a stunning ride down. Its operation depends strictly on the local authorities and seasonal maintenance. If operational, you can opt to ride it down. If closed, we simply drive or walk down directly to Joshimath.',
    },
  ],

  updatedAt: '2026-04-20',
};

export default kuariPassTrek;
