import { TrekContent } from '@/types/content';

const pangarchullaTrek: TrekContent = {
  slug: 'pangarchulla-trek',
  title: 'Pangarchulla Peak Trek (4,590m) – Summit Climb from Joshimath',
  description:
    'Summit Pangarchulla Peak at 4,590m near Joshimath with 360° Nanda Devi Sanctuary views. 6 days, 32 km. Steep snow climbing, crampons required, alpine start. Challenging. Best: Mar–May.',

  locationId: 'joshimath',
  trekType: 'Guided Trek',

  difficulty: 'Challenging',
  distance: '32 km',
  altitude: '4590 m',

  duration: '6 Days / 5 Nights',
  bestSeason: ['March', 'April', 'May'],
  pickupPoint: 'Joshimath',

  overview:
    'Pangarchulla is one of the few true summit treks accessible from Joshimath, combining the scenic beauty of the Kuari Pass trail with a serious high-altitude push to 4,590 metres. The route follows the Kuari Pass approach through dense oak forests and alpine meadows before diverging toward the Pangarchulla summit ridge.\n\nThe final day involves a steep snow-and-scree ascent with an early alpine start. At the top, the reward is extraordinary: a 360° panorama that includes Nanda Devi, Nanda Ghunti, Dronagiri, Chaukhamba, Hathi Parvat, and the peaks of the Nanda Devi Sanctuary. This trek is recommended for experienced trekkers with prior high-altitude exposure.',

  highlights: [
    'True summit experience at 4,590 m',
    '360° panoramic views from the summit',
    'Nanda Devi, Dronagiri, and Chaukhamba visible from the peak',
    'Alpine start summit push through snow',
    'Combined Kuari Pass and summit route',
  ],

  itinerary: [
    'Day 1: Joshimath to Dhak to Gulling (6 km, forest trail ascent)',
    'Day 2: Gulling to Tali Lake (8 km, ridge walk through oak forest)',
    'Day 3: Tali to Khullara via Kuari Pass (10 km, acclimatisation push)',
    'Day 4: Khullara — rest and acclimatisation day',
    'Day 5: Khullara to Pangarchulla Summit and back (8 km, alpine start, summit day)',
    'Day 6: Khullara to Auli to Joshimath (descent)',
  ],

  inclusions: [
    'All meals during trek',
    'Camping and tent accommodation',
    'Expert trek leader and summit support',
    'Safety equipment including crampons and gaiters',
    'Forest permits',
  ],

  exclusions: [
    'Travel to/from Joshimath',
    'Personal mountaineering gear and clothing',
    'Travel insurance',
    'Tips and gratuities',
  ],

  images: [
    { src: '/images/treks/pangarchulla-1.jpg', alt: 'Pangarchulla Peak summit ridge with snow approach' },
  ],

  monthlyConditions: [
    { month: 'March', conditions: 'Early spring. Deep consolidated snow on summit approach — ideal crampon conditions. Temperatures: 0°C to -10°C at Khullara. Short days mean very early alpine starts (2–3 AM). Best month for a true winter-summit experience. Kuari Pass section has partial snow cover.' },
    { month: 'April', conditions: 'Prime month. Snow consolidates well for the summit push. Temperatures: 3°C to -6°C at Khullara. Longer days, warmer mornings, rhododendron bloom on lower sections. Good summit success rate. The most popular month for Pangarchulla.' },
    { month: 'May', conditions: 'Late spring. Snow line recedes — summit approach may have mixed snow and scree. Temperatures: 6°C to -2°C at Khullara. Afternoon clouds build more frequently. Early May is good; late May risks pre-monsoon weather. Wildflowers on the Kuari Pass traverse.' },
  ],

  faqs: [
    {
      question: 'How difficult is the Pangarchulla summit in 2025–2026?',
      answer:
        'Pangarchulla is rated Challenging. The summit day involves a steep snow ascent of approximately 700 m elevation gain with an alpine start around 3 AM. Crampons are mandatory for the final snow slope. Prior high-altitude trekking experience (above 4,000 m) is strongly recommended. Conditions as of the 2025–2026 spring season remain consistent with prior years.',
    },
    {
      question: 'What is the best time for Pangarchulla?',
      answer:
        'March to May is the best window. March and early April offer consolidated snow for the summit push. Late April and May have clearer skies but the snow line recedes. The trek is not viable in monsoon or post-monsoon.',
    },
    {
      question: 'Do I need special equipment?',
      answer:
        'Crampons, gaiters, and trekking poles are required for summit day. We provide safety equipment. You should bring a 4-season sleeping bag and layered clothing rated to −10°C.',
    },
  ],

  updatedAt: '2026-03-05',
};

export default pangarchullaTrek;
