import { TrekContent } from '@/types/content';

const kedarkanthaTrek: TrekContent = {
  slug: 'kedarkantha-trek',
  title: 'Kedarkantha Trek',
  description:
    'Kedarkantha winter snow trek from Sankri with pine forests, summit views, and a 5-day guided Himalayan route suitable for fit beginners.',

  locationId: 'sankri',
  trekType: 'Weekend Trek',

  difficulty: 'Moderate',
  distance: '20 km',
  altitude: '3,810 m (12,500 ft)',
  priceRange: '₹8,500 - ₹9,500',
  groupSize: '12-15 Trekkers',

  duration: '5 Days / 4 Nights',
  bestSeason: ['December', 'January', 'February', 'March', 'April'],
  pickupPoint: 'Dehradun',

  /* ----------------- VISUAL / CONVERSION UPGRADE (2026-Q2) ----------------- */

  heroImage: '/Images/trek/region/kedarkantha-summit.webp',
  heroImageAlt: 'Trekkers making their way to the snowy summit of Kedarkantha at sunrise',
  heroTagline: 'The definitive Indian winter trek. A thrilling summit climb through deep pine forests to a 360-degree Himalayan panorama.',

  trustSignals: [
    { label: 'NIM Certified', sublabel: 'Expert Trek Leaders' },
    { label: '4.9/5 Rating', sublabel: 'Over 1000+ Trekkers' },
    { label: 'Oximetry', sublabel: 'Daily health checks' },
    { label: 'Small Groups', sublabel: 'Max 15 people' },
  ],

  whyThisTrek: {
    headline: 'Why Kedarkantha is India’s Most Loved Winter Trek',
    body: 'Kedarkantha is not just a trek; it is a rite of passage for winter trekking in India. While most treks offer a pass crossing or a lake view, Kedarkantha rewards you with a true summit climb. Standing at 12,500 feet, you are treated to an unmatched 360-degree panorama of the Garhwal Himalayas, with peaks like Swargarohini, Black Peak, and Bandarpunch feeling remarkably close.\n\nWhat sets Kedarkantha apart is the unparalleled beauty of its campsites and trail. You walk through ancient pine and oak forests completely blanketed in pristine white snow, camping in clearing areas like Juda Ka Talab—a frozen lake surrounded by dark, imposing pines. The ascent is steady and entirely safe, making it the perfect introduction to winter summit expeditions for beginners, while offering enough thrill to keep experienced trekkers coming back.',
  },

  emotionalHooks: [
    {
      icon: '🏔️',
      title: 'A True Summit Experience',
      body: 'Stand victorious at 12,500 ft. A rare and exhilarating feeling of conquering a prominent Himalayan peak, staring out at a sea of endless snowy mountains.',
    },
    {
      icon: '❄️',
      title: 'Walking in a Winter Wonderland',
      body: 'Trek through silent, ancient pine forests heavily draped in knee-deep powder snow, creating a magical, Narnia-like atmosphere on the trail.',
    },
    {
      icon: '⛺',
      title: 'Frozen Lake Camping',
      body: 'Pitch your tent beside Juda Ka Talab, a stunning high-altitude lake completely frozen in winter, surrounded by atmospheric, towering cedar trees.',
    },
    {
      icon: '🌅',
      title: 'Unreal Sunrise Panoramas',
      body: 'Start your summit push at 3 AM to witness the morning sun setting the Swargarohini and Bandarpunch massifs ablaze in vibrant gold and pink hues.',
    },
  ],

  experienceGallery: [
    { src: '/Images/trek/itinerary/kedarkantha/day1.webp', alt: 'Trekkers climbing the final ridge to Kedarkantha summit in snow' },
    { src: '/Images/trek/itinerary/kedarkantha/day2.webp', alt: 'Camping in the snow at Juda Ka Talab' },
    { src: '/Images/trek/itinerary/kedarkantha/day3.webp', alt: 'A beautiful morning in the pine forests of Sankri' },
    { src: '/Images/trek/itinerary/kedarkantha/day4.webp', alt: '360 degree panoramic view from Kedarkantha top' },
    { src: '/Images/trek/itinerary/kedarkantha/day5.webp', alt: 'Trekkers having hot tea at a snowy campsite' },
  ],

  cinematicMoment: {
    image: '/Images/trek/region/kedarkantha.webp',
    alt: 'The golden hour light hitting the Swargarohini peaks viewed from Kedarkantha',
    quote: "When you reach the summit at dawn and the entire Himalayan range turns gold, every freezing step you took to get there instantly makes sense.",
    attribution: 'The Kedarkantha Summit',
  },

  difficultyProfile: {
    physical: 3,     // Moderate cardiovascular demand
    technical: 1,    // Simple walking, microspikes applied
    altitude: 3,     // 3810m carries mild AMS risk
    weather: 4,      // Serious cold exposure in Jan/Feb
  },

  /* ----------------- CORE SEO CONTENT ----------------- */

  overview:
    `The Kedarkantha Trek is arguably India’s most popular winter trek, and for excellent reason. Sited in the Govind Pashu Vihar National Park, the trail originates from the cultural hub of Sankri (1,950 m) and concludes with an exhilarating push to the Kedarkantha Summit at 3,810 m (12,500 ft). Over five days, trekkers navigate approximately 20 kilometres of trail that morphs from dense, autumnal deciduous forests into an alpine winter wonderland of pine, oak, and bottomless powder snow.\n\nUnlike many treks that conclude at a high pass or an alpine lake, Kedarkantha is famous for offering a true summit climb. The feeling of pushing for the peak in the pre-dawn darkness, navigating the steep, frozen ridges with headlamps, and arriving at the top just in time to watch the sun ignite the Swargarohini, Black Peak, and Bandarpunch ranges is a profound, transformative experience. Despite the lofty altitude, the gradual ascent profile of the trek makes it an exceptional introductory expedition for determined beginners, while maintaining enough raw Himalayan charm to satisfy seasoned mountaineers.\n\nWhile December through February draws trekkers looking for knee-deep snow and frozen lakes like Juda Ka Talab, the spring months of March and April reveal a completely different character. During spring, the lower forests burst into vivid reds and pinks with blooming rhododendrons, while the upper reaches retain enough snow for a classic winter summit experience. The contrast of warm, colourful valleys against the icy, monochromatic summit makes Kedarkantha a highly dynamic and visually arresting journey regardless of when you choose to go.`,

  highlights: [
    'True summit climb to 3,810 m (12,500 ft) with breathtaking 360-degree views.',
    'Trekking through the enchanting, wildlife-rich Govind Pashu Vihar National Park.',
    'Camping beside the frozen, mythological lake of Juda Ka Talab surrounded by giant pines.',
    'Incredible vistas of the Swargarohini, Black Peak, and Bandarpunch ranges.',
    'Experiencing the unique wooden architecture and culture of the basecamp village, Sankri.',
  ],

  itinerary: [
    `Day 1: Drive from Dehradun to Sankri (1,950 m) · 200 km · 8-10 Hours Drive\n\nThe journey to Kedarkantha begins with a spectacular 10-hour drive from Dehradun to the basecamp village of Sankri. Following the Yamuna and later the Tons river, the route winds through dense pine forests and remote mountain hamlets. As you gain elevation, the air cools significantly, and the towering peaks of the Swargarohini massif begin to dominate the skyline. Sankri is a vibrant hub for trekkers, filled with wooden heritage homes, small cafes, and gear rental shops. You will spend the night in a cozy guesthouse, meet your trek leader, undergo a thorough briefing, and finalize any gear rentals needed for the rigid temperatures ahead.`,
    
    `Day 2: Trek from Sankri to Juda Ka Talab (2,700 m) · 4 km · Terrain: Steep forest trails, pine clearings\n\nYou officially hit the trail right after breakfast. Leaving Sankri behind, you immediately enter a dense forest of maple, oak, and towering Himalayan cedar (Deodar). The gradient is moderately steep, providing a quick warm-up. As you ascend, the village noise fades, replaced by the crunch of leaves and, in winter months, snow. After about 4 hours of steady climbing, the dense trees suddenly part to reveal Juda Ka Talab—a striking, high-altitude lake. In deep winter, this lake freezes solid, allowing trekkers to walk safely across its surface. The campsite here is intensely atmospheric, sheltered by giant trees that catch the evening light beautifully.`,

    `Day 3: Trek from Juda Ka Talab to Kedarkantha Base Camp (3,400 m) · 4 km · Terrain: Open snow meadows, steady incline\n\nThe trek today is relatively short but visually explosive. Leaving the dense forest canopy, the trail climbs into vast, open alpine meadows (bugyals) that, in winter, are buried under thick, rolling waves of snow. You will likely strap on microspikes and gaiters here if you haven't already. The tree line falls away, exposing the dramatic, jagged peaks of the surrounding Himalayan ranges. Kedarkantha Base Camp is situated in a wide, sweeping clearing with the triangular face of the Kedarkantha peak looming directly above. Tonight, temperatures often plummet to -10°C, so the team will spend time resting, acclimatizing, and having an early dinner in preparation for the midnight summit push.`,

    `Day 4: Summit Day! Base Camp to Kedarkantha Summit (3,810 m) and descend to Hargaon (2,700 m) · 6 km · Terrain: Steep icy ridges, deep snow descent\n\nThis is the definitive summit experience. You will wake up at 2 AM, layer up heavily, and begin the ascent by the light of your headlamp. The climb is steep and demanding, zigzagging up the dark, exposed ridge against a biting wind. As the sky begins to lighten, turning from deep violet to orange, you push through the final, steepest section to reach the summit. At 12,500 feet, you are rewarded with a mind-blowing 360-degree panorama: the Gangotri and Yamunotri ranges, Swargarohini, and Mt. Bandarpoonch stand shoulder-to-shoulder in the morning sun. After spending time at the summit shrine taking in the triumph, you will glissade (slide) down the snow slopes back to base camp for lunch, before continuing a rapid descent to the warmer, forested campsite at Hargaon.`,

    `Day 5: Descend from Hargaon to Sankri (1,950 m) and Drive back to Dehradun · 6 km Trek + 200 km Drive\n\nThe final morning involves a relaxed, beautiful descent from Hargaon back to the bustling basecamp of Sankri. Retracing your steps through the thick pine forests, the trail is well-marked and relatively easy on the knees. You will arrive back in Sankri by midday. After handing back any rented winter gear and saying goodbye to your local guides and support staff, you will board the transport vehicles for the long, scenic drive back to Dehradun. You can expect to reach Dehradun railway station or ISBT by 8:00 PM, concluding an incredible Himalayan journey.`,
  ],

  inclusions: [
    'Accommodation in standard homestays/guesthouses at Sankri on Day 1.',
    'High-quality, alpine weather-tested tents (3-person tents shared by 2) during the trek.',
    'All highly nutritious, vegetarian meals from dinner on Day 1 to Breakfast on Day 5.',
    'Experienced, NIM-certified Trek Leader, local guides, and dedicated support staff.',
    'Comprehensive safety equipment including microspikes, gaiters, oxygen cylinders, and med-kits.',
    'All forest permits, entry fees, and camping charges for Govind Pashu Vihar National Park.',
  ],

  exclusions: [
    'Transport from Dehradun to Sankri and back (can be arranged at an additional cost sharing basis).',
    'Offloading of personal rucksacks (available at an extra daily charge for mules/porters).',
    'Personal trekking gear like heavy down jackets, waterproof shoes, or trekking poles (rentals available at Sankri).',
    'Any meals taken during the road transit between Dehradun and Sankri.',
    'Trek insurance and emergency medical evacuation costs.',
  ],

  safety:
    `Kedarkantha is notoriously cold in January and February, making cold exposure the absolute primary hazard. Nighttime temperatures at Base Camp routinely plunge to -12°C. Hypothermia and frostbite are genuine risks if trekkers are poorly equipped. Additionally, the summit ridge becomes highly slick and icy, requiring proper traction devices.\n\nOur safety response is rigorous and non-negotiable. Every trekker is monitored twice a day using pulse oximeters to check oxygen saturation and resting heart rates, ensuring that Acute Mountain Sickness (AMS) is caught early. We provide heavy-duty microspikes and gaiters to navigate the summit ice safely. Our certified trek leaders are trained as Wilderness First Responders and carry comprehensive high-altitude med-kits, including emergency oxygen cylinders and lifesaving medications like Nifedipine and Dexamethasone. If severe weather hits and the summit becomes unsafe due to whiteout conditions or severe storms, our leaders operate on a strict, conservative turnaround protocol to ensure every individual returns to Sankri safely.`,

  permits:
    'The Kedarkantha trail falls entirely within the protected Govind Pashu Vihar National Park. A forest department entry permit is mandatory and is arranged by our team at the Netwar check post before you reach Sankri. You must carry a valid, original Government Photo ID (Aadhaar Card, Passport, or Driving Licence) and a couple of photocopies. Foreign nationals must possess a valid Indian Visa and passport.',

  howToReach: [
    'By Air: The Jolly Grant Airport in Dehradun is the nearest airport, located about 30 km from the city center. You can fly in from Delhi or Mumbai.',
    'By Train: Dehradun Railway Station is well-connected to Delhi via the overnight Nanda Devi Express and the day-time Shatabdi Express.',
    'By Bus: Numerous AC Volvo buses operate overnight from ISBT Kashmiri Gate in Delhi to Dehradun ISBT, taking about 6-7 hours.',
    'Onward to Sankri: From Dehradun, Sankri is a 10-hour drive. We organize shared transport pickups early in the morning from the Dehradun Railway Station directly to the basecamp.',
  ],

  whoShouldAvoid:
    'Individuals with severe asthma, chronic respiratory issues, or heart conditions should avoid attempting a 12,500 ft summit. Pregnant women and children under the age of 10 should not participate in deep-winter batches (December and January) due to the extreme cold. If you are recovering from a recent ankle or knee surgery, the steep, slippery descents on Day 4 will put dangerous stress on your joints. Trekkers should be capable of jogging 4 km in 30 minutes before taking on this physical challenge.',

  localLogistics:
    `Sankri is a remote, beautiful village that serves as the nexus for multiple prominent treks including Har Ki Dun and Bali Pass. You will find several gear rental shops here where you can easily rent heavy down jackets, trekking shoes, poles, and waterproof gloves at reasonable daily rates. It is highly recommended to finalize your rentals on Day 1 evening.\n\nCrucially, there are no ATMs in Sankri. The last reliable cash point is in Purola or Mori, quite a few hours back on the road. You must withdraw enough cash in Dehradun to cover offloading fees, rentals, snacks, and driver tips. Network connectivity is extremely limited; BSNL and Jio work intermittently in Sankri, but absolutely all cellular networks vanish once you step onto the trail. Inform your family about your unreachability before leaving Sankri.`,

  images: [
    {
      src: '/Images/trek/region/kedarkantha-summit.webp',
      alt: 'Kedarkantha summit in winter snow',
    },
  ],

  monthlyConditions: [
    { month: 'December', conditions: 'Early winter sets in. The trek typically sees its first snowfall by mid-December above 3,000 m. Daytime temperatures hover around 8°C, dropping to -5°C at night. The trail is mostly defined and arguably the easiest winter month before deep powder arrives. Ideal for those who want to experience snow camping without battling extreme, freezing storms.' },
    { month: 'January', conditions: 'Peak winter. Heavy, frequent snowfall covers the entire trail, often waist-deep around Base Camp and on the summit ridge. Temperatures plunge to -12°C at night and rarely go above freezing during the day. It is the hardest month physically, but visually the most stunning, transforming the landscape into a pristine, white desert. Exceptional winter gear is absolutely essential.' },
    { month: 'February', conditions: 'Late winter. The snowpack is incredibly deep but has solidified from January traffic, making walking slightly easier on a packed trail. Days begin to lengthen marginally and daytime temperatures rise to 10°C, though nights remain bitterly cold at -10°C. Considered the "golden month" providing the perfect balance of massive snow volume without the unpredictability of January storms.' },
    { month: 'March', conditions: 'Spring transition. The snowline rapidly recedes below 3,000 m, clearing the lower forests and exposing the earth. Daytime weather becomes quite pleasant. The spectacular rhododendron forests bloom in violent shades of red and pink, heavily contrasting with the pure white snow that still caps the summit ridge. A breathtakingly dynamic month.' },
    { month: 'April', conditions: 'Full spring. The trail is mostly green and dry up to the Base Camp. Snow is generally found only on the final summit push. Temperatures are highly comfortable, and the skies are the clearest of the year, providing outrageously crisp views of the Swargarohini peaks. Highly recommended for beginners who want the summit without the bitter cold.' },
  ],

  faqs: [
    {
      question: 'Is Kedarkantha suitable for absolute beginners?',
      answer:
        'Yes. Thanks to its gradual altitude gain and well-maintained trail, Kedarkantha is considered the perfect introductory trek to the Himalayas. However, "beginner-friendly" does not mean easy. You still must be physically fit, as walking in snow for 5 hours a day is physically demanding.',
    },
    {
      question: 'How cold does it actually get at night?',
      answer:
        'In peak winter (Jan/Feb), temperatures at Juda Ka Talab and Base Camp will drop between -10°C and -15°C at night. During the day, if the sun is out, it can feel surprisingly warm, around 8°C to 12°C. Proper layering with thermal inners, a fleece, and a heavy down jacket is non-negotiable.',
    },
    {
      question: 'Can I rent trekking gear in Sankri?',
      answer:
        'Absolutely. Sankri is a major trekking hub. You can rent high-quality trekking shoes, heavy -10°C down jackets, trekking poles, waterproof gloves, and backpacks for a nominal per-day fee. Our team can assist you with this upon your arrival.',
    },
    {
      question: 'What if I cannot carry my own backpack?',
      answer:
        'You have the option to offload your backpack to our mules or porters. This must be arranged at least 15 days prior to the trek so we can secure the necessary transport. There is an additional daily charge for this service. You will still need to carry a small daypack with essentials like water, a fleece, and a rain jacket.',
    },
  ],

  updatedAt: '2026-04-20',
};

export default kedarkanthaTrek;
