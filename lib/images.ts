// lib/images.ts
// Image registry — based on actual files in /public/Images/

export interface SiteImage {
  src: string;
  alt: string;
}

export const images = {

  // ── Heroes (folder is empty, using Unsplash for now) ──
  heroes: {
    himalayanSunrise: {
     src: '/Images/heros/himalayan-sunrise.webp',
      alt: 'Himalayan snow peaks at sunrise',
    },
    valleyForest: {
      src: '/Images/heros/valley-forest.webp',
      alt: 'Himalayan valley with forest',
    },
    alpineRidge: {
      src: '/Images/heros/alpine-ridge.webp',
      alt: 'Alpine ridge trekking in Himalayas',
    },
    retreatHero: {
      src: '/Images/location/rehero.webp',
      alt: 'Himalayan retreat hero',
    },
  },

  // ── Locations ──
  locations: {
    chakrata: {
      src: '/Images/location/chakrata.webp',
      alt: 'Chakrata — deodar forest ridge in Uttarakhand',
    },
    sankri: {
      src: '/Images/location/sankri.webp',
      alt: 'Sankri — pine valley at the edge of Govind Wildlife Sanctuary',
    },
    munsiyari: {
      src: '/Images/location/munsiyari.webp',
      alt: 'Munsiyari — Panchachuli massif views from Kumaon Himalaya',
    },
    mussoorie: {
      src: '/Images/location/mussoorie.webp',
      alt: 'Mussoorie — Queen of Hills in the Garhwal foothills',
    },
    rishikesh: {
      src: '/Images/location/rishikesh.webp',
      alt: 'Rishikesh — Ganges riverside yoga and retreat destination',
    },
    zanskar: {
      src: '/Images/location/zanskar.webp',
      alt: 'Zanskar — remote high-altitude valley in Ladakh',
    },
    joshimath: {
   src: '/Images/location/joshimath.webp',
    alt: 'Joshimath — gateway to Kuari Pass and Auli in Garhwal',
  },
  lohajung: {
     src: '/Images/location/lohajung.webp',
    alt: 'Lohajung — base village for Roopkund and Brahmatal treks',
  },
    // About page location variants
    aboutChakrata: {
      src: '/Images/about/chakrata.webp',
      alt: 'Chakrata landscape',
    },
    aboutMunsiyari: {
      src: '/Images/about/munsiyari.webp',
      alt: 'Munsiyari landscape',
    },
    aboutRishikesh: {
      src: '/Images/about/rishikesh.webp',
      alt: 'Rishikesh landscape',
    },
    aboutSankri: {
      src: '/Images/about/sankri.webp',
      alt: 'Sankri landscape',
    },
  },

  // ── Journeys ──
  journeys: {
    highTerrain: {
      src: '/Images/Journeys/HighTerrain.webp',
      alt: 'Movement and high terrain — Himalayan trek',
    },
    meditation: {
      src: '/Images/Journeys/meditation.webp',
      alt: 'Meditation & Silence — deep stillness and inner clarity',
    },
    stillness: {
      src: '/Images/Journeys/Stillness.webp',
      alt: 'Stillness and inner reset — Himalayan retreat',
    },
    weekend: {
      src: '/Images/Journeys/weekend.webp',
      alt: 'Weekend Retreat — rejuvenating escape into nature',
    },
    yoga: {
      src: '/Images/Journeys/yoga.webp',
      alt: 'Yoga & Movement — mindful practice in serene surroundings',
    },
  },

  // ── Services ──
  services: {
    artCreative: {
      src: '/Images/services/artcreative.webp',
      alt: 'Art & Creative Retreat',
    },
    burnoutRecovery: {
      src: '/Images/services/burnoutrec.webp',
      alt: 'Burnout Recovery Retreat',
    },
    meditationService: {
      src: '/Images/services/meditation.webp',
      alt: 'Meditation & Silence Retreat',
    },
    privateCustom: {
      src: '/Images/services/privatecustom.webp',
      alt: 'Private Custom Retreat',
    },
    restReset: {
      src: '/Images/services/restreset.webp',
      alt: 'Rest & Reset Retreat',
    },
    soundHealing: {
      src: '/Images/services/soundhealing.webp',
      alt: 'Sound Healing Retreat',
    },
    weekendRetreat: {
      src: '/Images/services/weekendretreat.webp',
      alt: 'Weekend Retreat',
    },
    yogaService: {
      src: '/Images/services/yoga.webp',
      alt: 'Yoga Retreat',
    },
    yogaMovement: {
      src: '/Images/services/yogamov.webp',
      alt: 'Yoga & Movement Retreat',
    },
  },

  // ── Treks — Region ──
  treks: {
    brahmatal: {
      src: '/Images/trek/region/bramhatal.webp',
      alt: 'Brahmatal Trek — frozen lake and snow peaks',
    },
    budherCaves: {
      src: '/Images/trek/region/budher.webp',
      alt: 'Budher Caves Trek — Chakrata',
    },
    chakraGuided: {
      src: '/Images/trek/region/chakraguided.webp',
      alt: 'Chakrata Guided Trek',
    },
    chakraWeekend: {
      src: '/Images/trek/region/chakraweekend.webp',
      alt: 'Chakrata Weekend Trek',
    },
    garhwal: {
      src: '/Images/trek/region/garhwal.webp',
      alt: 'Garhwal Himalaya Trek',
    },
    harKiDun: {
      src: '/Images/trek/region/harkidun.webp',
      alt: 'Har Ki Dun Trek — valley of Gods',
    },
    kedarkantha: {
      src: '/Images/trek/region/kedarkantha.webp',
      alt: 'Kedarkantha Trek — snow summit views',
    },
    khaliya: {
      src: '/Images/trek/region/Khaliya.webp',
      alt: 'Khaliya Top Trek — Munsiyari',
    },
    kuariPass: {
      src: '/Images/trek/region/kuari.webp',
      alt: 'Kuari Pass Trek — Lord Curzon Trail',
    },
    milamGlacier: {
      src: '/Images/trek/region/milamglacier.webp',
      alt: 'Milam Glacier Trek — Kumaon',
    },
    pangarchulla: {
      src: '/Images/trek/region/pangarchulla.webp',
      alt: 'Pangarchulla Peak Trek',
    },
    roopkund: {
      src: '/Images/trek/region/roopkund_lake.webp',
      alt: 'Roopkund Lake Trek — mystery lake',
    },
    tigerFall: {
      src: '/Images/trek/region/tigerfall.webp',
      alt: 'Tiger Fall — Chakrata waterfall',
    },
    // Snow variants
    snowBrahmatal: {
      src: '/Images/trek/snow/bramhatal.webp',
      alt: 'Brahmatal — winter snow trek',
    },
    snowKedarkantha: {
      src: '/Images/trek/snow/kedarkantha.webp',
      alt: 'Kedarkantha — winter snow summit',
    },
    snowKuari: {
      src: '/Images/trek/snow/kuari.webp',
      alt: 'Kuari Pass — winter snow trek',
    },
    // Beginner variants
    beginnerBrahmatal: {
      src: '/Images/trek/begineertrek/bramhatal.webp',
      alt: 'Brahmatal — beginner friendly trek',
    },
    beginnerBudher: {
      src: '/Images/trek/begineertrek/budher.webp',
      alt: 'Budher Caves — easy trek',
    },
    beginnerKhaliya: {
      src: '/Images/trek/begineertrek/Khaliya.webp',
      alt: 'Khaliya Top — beginner trek',
    },
    beginnerKuari: {
      src: '/Images/trek/begineertrek/kuari.webp',
      alt: 'Kuari Pass — beginner trek',
    },
    beginnerTigerFall: {
      src: '/Images/trek/begineertrek/tigerfall.webp',
      alt: 'Tiger Fall — easy day trek',
    },
    // Challenging
    challengingMilam: {
      src: '/Images/trek/challenging/milamglacier.webp',
      alt: 'Milam Glacier — challenging trek',
    },
    challengingPangar: {
      src: '/Images/trek/challenging/pangarchulla.webp',
      alt: 'Pangarchulla — challenging summit',
    },
    challengingRoopkund: {
      src: '/Images/trek/challenging/roopkund_lake.webp',
      alt: 'Roopkund — challenging high altitude trek',
    },
  },

  // ── Himalayan Retreats ──
  himalayanRetreats: {
    creative: {
      src: '/Images/himalayanretreats/creative.webp',
      alt: 'Creative retreat in the Himalayas',
    },
    retreatTrek: {
      src: '/Images/himalayanretreats/retreaktrek.webp',
      alt: 'Retreat and trek combination',
    },
    silentRetreat: {
      src: '/Images/himalayanretreats/silentretreat.webp',
      alt: 'Silent meditation retreat in Himalayas',
    },
    weekendHimalayan: {
      src: '/Images/himalayanretreats/weekend.webp',
      alt: 'Weekend retreat in Himalayas',
    },
    yogaHimalayan: {
      src: '/Images/himalayanretreats/yoga.webp',
      alt: 'Yoga retreat in Himalayas',
    },
  },

  // ── Why Himalaya ──
  whyHimalaya: {
    cultural: {
      src: '/Images/whyhimalaya/cultural.webp',
      alt: 'Cultural richness of the Himalayas',
    },
    environment: {
      src: '/Images/whyhimalaya/environment.webp',
      alt: 'Himalayan environment and ecology',
    },
    nature: {
      src: '/Images/whyhimalaya/nature.webp',
      alt: 'Natural beauty of the Himalayas',
    },
    psychological: {
      src: '/Images/whyhimalaya/psycological.webp',
      alt: 'Psychological benefits of Himalayan retreat',
    },
    top: {
      src: '/Images/whyhimalaya/top.webp',
      alt: 'Himalayan peaks — why the mountains matter',
    },
  },

  // ── Logo ──
  logo: {
    header: {
      src: '/Images/logo/headerlogo.webp',
      alt: 'Himalayan Retreats & Treks logo',
    },
    headerPng: {
      src: '/Images/logo/headerlogo1.png',
      alt: 'Himalayan Retreats & Treks logo',
    },
  },
};