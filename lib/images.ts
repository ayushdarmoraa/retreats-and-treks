// lib/images.ts
// Image registry — based on actual files in /public/Images/

export interface SiteImage {
  src: string;
  alt: string;
}

export const images = {

  // ── Heroes ──
  heroes: {
    himalayanSunrise: {
      src: '/Images/hero/himalayan-sunrise.webp',
      alt: 'Himalayan snow peaks at sunrise',
    },
    heroimage: {
      src: '/Images/hero/heroimage.jpg',
      alt: 'mountain snow',
    },
    valleyForest: {
      src: '/Images/hero/valley-forest.webp',
      alt: 'Himalayan valley with forest',
    },
    alpineRidge: {
      src: '/Images/hero/alpine-ridge.webp',
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
      src: '/Images/logo/headerlogo1.webp',
      alt: 'Himalayan Retreats & Treks logo',
    },
  },

 // ── Life at the Retreat ──
  moments: {
    meditation: {
      src: '/Images/moments/meditation.webp',
      alt: 'Morning meditation on a wooden deck overlooking Himalayan valley',
    },
    walking: {
      src: '/Images/moments/walking.webp',
      alt: 'Two people walking on a forest trail in the Himalayas',
    },
    tea: {
      src: '/Images/moments/tea.webp',
      alt: 'Group of friends having chai on a sunlit mountain terrace',
    },
  },
  // ── Testimonials ──
  testimonials: {
    priya: {
      src: '/Images/testimonials/priya.webp',
      alt: 'Priya Mehta — retreat guest',
    },
    rohan: {
      src: '/Images/testimonials/rohan.webp',
      alt: 'Rohan Sharma — retreat guest',
    },
    anika: {
      src: '/Images/testimonials/anika.webp',
      alt: 'Anika Verma — retreat guest',
    },
  },

  // ── Facilitators ──   
  facilitators: {
    arjunMehta: {
      src: '/Images/facilitators/arjun-mehta.webp',
      alt: 'Arjun Mehta — retreat facilitator',
    },
    kavyaSharma: {
      src: '/Images/facilitators/kavya-sharma.webp',
      alt: 'Kavya Sharma — retreat facilitator',
    },
    nidhiRawat: {
      src: '/Images/facilitators/nidhi-rawat.webp',
      alt: 'Nidhi Rawat — retreat facilitator',
    },
    tenzinDorje: {
      src: '/Images/facilitators/tenzin-dorje.webp',
      alt: 'Tenzin Dorje — retreat facilitator',
    },
    sunainaBhat: {
      src: '/Images/facilitators/sunaina-bhat.webp',
      alt: 'Sunaina Bhat — retreat facilitator',
    },
  },

  // ── Blog Featured Images ──
  blog: {
    // Location blogs
    bestTimeChakrata: {
      src: '/Images/blog/best-time-for-retreat-in-chakrata.webp',
      alt: 'Best time to visit Chakrata for a retreat',
    },
    bestTimeMunsiyari: {
      src: '/Images/blog/best-time-for-retreat-in-munsiyari.webp',
      alt: 'Best time to visit Munsiyari for a retreat',
    },
    bestTimeRishikesh: {
      src: '/Images/blog/best-time-for-retreat-in-rishikesh.webp',
      alt: 'Best time to visit Rishikesh for a retreat',
    },
    bestTimeSankri: {
      src: '/Images/blog/best-time-for-retreat-in-sankri.webp',
      alt: 'Best time to visit Sankri for a retreat',
    },
    reachChakrata: {
      src: '/Images/blog/how-to-reach-chakrata-for-a-retreat.webp',
      alt: 'How to reach Chakrata — mountain road',
    },
    reachMunsiyari: {
      src: '/Images/blog/how-to-reach-munsiyari-for-a-retreat.webp',
      alt: 'How to reach Munsiyari — mountain highway',
    },
    reachRishikesh: {
      src: '/Images/blog/how-to-reach-rishikesh-for-a-retreat.webp',
      alt: 'How to reach Rishikesh for a retreat',
    },
    reachSankri: {
      src: '/Images/blog/how-to-reach-sankri-for-a-retreat.webp',
      alt: 'How to reach Sankri — jeep trail through mountains',
    },
    isChakrataGood: {
      src: '/Images/blog/is-chakrata-good-for-a-retreat.webp',
      alt: 'Is Chakrata good for a retreat — peaceful mountain town',
    },
    isMunsiyariGood: {
      src: '/Images/blog/is-munsiyari-good-for-a-retreat.webp',
      alt: 'Is Munsiyari good for a retreat — Panchachuli peaks',
    },
    isRishikeshGood: {
      src: '/Images/blog/is-rishikesh-good-for-a-retreat.webp',
      alt: 'Is Rishikesh good for a retreat — yoga by Ganga',
    },
    isSankriGood: {
      src: '/Images/blog/is-sankri-good-for-a-retreat.webp',
      alt: 'Is Sankri good for a retreat — quiet village setting',
    },
    // Comparison blogs
    chakrataVsMussoorie: {
      src: '/Images/blog/chakrata-vs-mussoorie-weekend-trip.webp',
      alt: 'Chakrata vs Mussoorie weekend trip comparison',
    },
    chakrataVsRishikesh: {
      src: '/Images/blog/chakrata-vs-rishikesh-for-a-retreat.webp',
      alt: 'Chakrata vs Rishikesh for a retreat',
    },
    chakrataVsSankri: {
      src: '/Images/blog/chakrata-vs-sankri.webp',
      alt: 'Chakrata vs Sankri retreat comparison',
    },
    sankriVsMunsiyari: {
      src: '/Images/blog/sankri-vs-munsiyari-retreat.webp',
      alt: 'Sankri vs Munsiyari retreat comparison',
    },
    // Trek blogs
    kedarkanthaVsHarKiDun: {
      src: '/Images/blog/kedarkantha-vs-har-ki-dun.webp',
      alt: 'Kedarkantha vs Har Ki Dun trek comparison',
    },
    bestSnowTreks: {
      src: '/Images/blog/best-snow-treks-garhwal-himalaya.webp',
      alt: 'Best snow treks in Garhwal Himalaya',
    },
    highAltitudeTreks: {
      src: '/Images/blog/high-altitude-treks-garhwal-above-4000m.webp',
      alt: 'High altitude treks in Garhwal above 4000m',
    },
    beginnerToAdvanced: {
      src: '/Images/blog/beginner-to-advanced-trek-progression-garhwal.webp',
      alt: 'Beginner to advanced trek progression in Garhwal',
    },
    // Retreat decision blogs
    threeDayVsFiveDay: {
      src: '/Images/blog/3-day-vs-5-day-himalayan-retreat.webp',
      alt: '3-day vs 5-day Himalayan retreat comparison',
    },
    retreatCost: {
      src: '/Images/blog/how-much-does-a-himalayan-retreat-cost.webp',
      alt: 'How much does a Himalayan retreat cost',
    },
    weekendWorthIt: {
      src: '/Images/blog/is-weekend-retreat-worth-it.webp',
      alt: 'Is a weekend retreat worth it',
    },
    retreatVsTrek: {
      src: '/Images/blog/retreat-vs-trek-which-is-right-for-you.webp',
      alt: 'Retreat vs trek — which is right for you',
    },
    trekVsRetreat: {
      src: '/Images/blog/trek-vs-retreat.webp',
      alt: 'Trek vs retreat — adventure vs peace',
    },
    // Art retreat blogs
    artAndYoga: {
      src: '/Images/blog/art-and-yoga-retreat-himalayas.webp',
      alt: 'Art and yoga retreat in the Himalayas',
    },
    artBeginners: {
      src: '/Images/blog/art-retreat-for-beginners.webp',
      alt: 'Art retreat for beginners',
    },
    artPackingList: {
      src: '/Images/blog/art-retreat-packing-list.webp',
      alt: 'Art retreat packing list — supplies flat lay',
    },
    artVsClass: {
      src: '/Images/blog/art-retreat-vs-art-class.webp',
      alt: 'Art retreat vs art class comparison',
    },
    artTherapyVsRetreat: {
      src: '/Images/blog/art-therapy-vs-art-retreat.webp',
      alt: 'Art therapy vs art retreat',
    },
    unblockCreativity: {
      src: '/Images/blog/can-a-retreat-unblock-creativity.webp',
      alt: 'Can a retreat unblock creativity — sunrise and blank canvas',
    },
    whatToExpectArt: {
      src: '/Images/blog/what-to-expect-at-an-art-retreat.webp',
      alt: 'What to expect at an art retreat',
    },
    whyArtRetreatsWork: {
      src: '/Images/blog/why-art-retreats-work.webp',
      alt: 'Why art retreats work — finished art in nature',
    },
    // Other blogs
    bestLocationsArt: {
      src: '/Images/blog/best-himalayan-locations-for-art-retreat.webp',
      alt: 'Best Himalayan locations for an art retreat',
    },
    natureInspires: {
      src: '/Images/blog/how-nature-inspires-creative-practice.webp',
      alt: 'How nature inspires creative practice',
    },
    paintingHimalayas: {
      src: '/Images/blog/painting-in-the-himalayas.webp',
      alt: 'Painting in the Himalayas — artist with mountain view',
    },
    digitalDetoxWorks: {
      src: '/Images/blog/why-digital-detox-works-in-the-himalayas.webp',
      alt: 'Why digital detox works in the Himalayas',
    },
  },


};

// ── Convenience lookups (slug → image) ──

/** Facilitator slug → image. Use: `facilitatorImageMap['arjun-mehta']` */
export const facilitatorImageMap: Record<string, SiteImage> = {
  'arjun-mehta':   images.facilitators.arjunMehta,
  'kavya-sharma':  images.facilitators.kavyaSharma,
  'nidhi-rawat':   images.facilitators.nidhiRawat,
  'tenzin-dorje':  images.facilitators.tenzinDorje,
  'sunaina-bhat':  images.facilitators.sunainaBhat,
};

/** Blog slug → featured image. Use: `blogImageMap['trek-vs-retreat']` */
export const blogImageMap: Record<string, SiteImage> = {
  'best-time-for-retreat-in-chakrata':          images.blog.bestTimeChakrata,
  'best-time-for-retreat-in-munsiyari':         images.blog.bestTimeMunsiyari,
  'best-time-for-retreat-in-rishikesh':         images.blog.bestTimeRishikesh,
  'best-time-for-retreat-in-sankri':            images.blog.bestTimeSankri,
  'how-to-reach-chakrata-for-a-retreat':        images.blog.reachChakrata,
  'how-to-reach-munsiyari-for-a-retreat':       images.blog.reachMunsiyari,
  'how-to-reach-rishikesh-for-a-retreat':       images.blog.reachRishikesh,
  'how-to-reach-sankri-for-a-retreat':          images.blog.reachSankri,
  'is-chakrata-good-for-a-retreat':             images.blog.isChakrataGood,
  'is-munsiyari-good-for-a-retreat':            images.blog.isMunsiyariGood,
  'is-rishikesh-good-for-a-retreat':            images.blog.isRishikeshGood,
  'is-sankri-good-for-a-retreat':               images.blog.isSankriGood,
  'chakrata-vs-mussoorie-weekend-trip':         images.blog.chakrataVsMussoorie,
  'chakrata-vs-rishikesh-for-a-retreat':        images.blog.chakrataVsRishikesh,
  'chakrata-vs-sankri':                         images.blog.chakrataVsSankri,
  'sankri-vs-munsiyari-retreat':                images.blog.sankriVsMunsiyari,
  'kedarkantha-vs-har-ki-dun':                  images.blog.kedarkanthaVsHarKiDun,
  'best-snow-treks-garhwal-himalaya':           images.blog.bestSnowTreks,
  'high-altitude-treks-garhwal-above-4000m':    images.blog.highAltitudeTreks,
  'beginner-to-advanced-trek-progression-garhwal': images.blog.beginnerToAdvanced,
  '3-day-vs-5-day-himalayan-retreat':           images.blog.threeDayVsFiveDay,
  'how-much-does-a-himalayan-retreat-cost':     images.blog.retreatCost,
  'is-weekend-retreat-worth-it':                images.blog.weekendWorthIt,
  'retreat-vs-trek-which-is-right-for-you':     images.blog.retreatVsTrek,
  'trek-vs-retreat':                            images.blog.trekVsRetreat,
  'art-and-yoga-retreat-himalayas':             images.blog.artAndYoga,
  'art-retreat-for-beginners':                  images.blog.artBeginners,
  'art-retreat-packing-list':                   images.blog.artPackingList,
  'art-retreat-vs-art-class':                   images.blog.artVsClass,
  'art-therapy-vs-art-retreat':                 images.blog.artTherapyVsRetreat,
  'can-a-retreat-unblock-creativity':           images.blog.unblockCreativity,
  'what-to-expect-at-an-art-retreat':           images.blog.whatToExpectArt,
  'why-art-retreats-work':                      images.blog.whyArtRetreatsWork,
  'best-himalayan-locations-for-art-retreat':   images.blog.bestLocationsArt,
  'how-nature-inspires-creative-practice':      images.blog.natureInspires,
  'painting-in-the-himalayas':                  images.blog.paintingHimalayas,
  'why-digital-detox-works-in-the-himalayas':   images.blog.digitalDetoxWorks,
};