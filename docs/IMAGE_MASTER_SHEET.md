# IMAGE MASTER SHEET — Complete Asset Preparation Guide

> **Your job**: Find/generate images, compress, name correctly, place in folders.
> **Developer's job**: Wire them into components using the image system.

---

## VISUAL STYLE GUIDE

### Photography Rules
| Rule | Standard |
|------|----------|
| **Color tone** | Warm natural light — golden hour, sunrise, soft mist. No neon or oversaturated. |
| **Lighting** | Dawn/dusk preferred. Soft natural light. No harsh midday shadows. |
| **Orientation** | Hero = landscape 16:9. Cards = landscape 4:3. Sections = landscape 3:2. |
| **Human presence** | Retreats = humans doing yoga/meditation (backs to camera, silhouettes). Treks = small figures on trails showing scale. Landscapes = no people. |
| **Mood** | Calm, aspirational, spiritual-but-not-religious. Think "peaceful adventure." |
| **Location authenticity** | Use actual Himalayan landscapes (Uttarakhand, Ladakh). Avoid generic stock. |
| **No text on images** | Never burn text into images — that's the developer's job via overlays. |
| **Diversity** | Mix solo travelers, small groups, male/female representation. |

### Image Dimensions & Compression
| Type | Resolution | Max File Size | Format |
|------|-----------|---------------|--------|
| Hero images | 1920×1080 | 150 KB | .webp |
| Card images | 800×600 | 80 KB | .webp |
| Section images | 1200×800 | 100 KB | .webp |
| Gallery images | 1200×800 | 100 KB | .webp |
| Icons/SVGs | 64×64 or 128×128 | 5 KB | .svg or .webp |
| Blog featured | 1200×630 | 100 KB | .webp |
| People/portraits | 400×400 | 50 KB | .webp |

### Compression Tools
- **squoosh.app** (Google's free tool — best quality/size ratio)
- **tinypng.com** (good for batch processing)
- **imageoptim** (Mac) or **Caesium** (Windows)

---

## SECTION 1: IMAGES YOU ALREADY HAVE (61 files — all registered)

These are DONE. Developer just needs to connect them.

| # | File | Location | Registry Key | Current Alt Text |
|---|------|----------|-------------|------------------|
| 1 | `/Images/location/chakrata.webp` | `public/Images/location/` | `images.locations.chakrata` | Chakrata — deodar forest ridge in Uttarakhand at 2,200 metres |
| 2 | `/Images/location/sankri.webp` | `public/Images/location/` | `images.locations.sankri` | Sankri village — gateway to Kedarkantha and Har Ki Dun treks |
| 3 | `/Images/location/munsiyari.webp` | `public/Images/location/` | `images.locations.munsiyari` | Munsiyari — panoramic Panchachuli peaks in Kumaon Himalayas |
| 4 | `/Images/location/mussoorie.webp` | `public/Images/location/` | `images.locations.mussoorie` | Mussoorie — hill station with mountain views in Uttarakhand |
| 5 | `/Images/location/rishikesh.webp` | `public/Images/location/` | `images.locations.rishikesh` | Rishikesh — yoga capital on the banks of the Ganges |
| 6 | `/Images/location/zanskar.webp` | `public/Images/location/` | `images.locations.zanskar` | Zanskar valley — remote high-altitude landscape in Ladakh |
| 7 | `/Images/location/rehero.webp` | `public/Images/location/` | `images.heroes.retreatHero` | Serene Himalayan retreat setting surrounded by deodar forests |
| 8 | `/Images/Journeys/weekend.webp` | `public/Images/Journeys/` | `images.journeys.weekend` | Weekend retreat — rejuvenating escape into Himalayan nature |
| 9 | `/Images/Journeys/yoga.webp` | `public/Images/Journeys/` | `images.journeys.yoga` | Yoga retreat — mindful practice in serene mountain surroundings |
| 10 | `/Images/Journeys/meditation.webp` | `public/Images/Journeys/` | `images.journeys.meditation` | Meditation retreat — deep stillness and inner clarity in the Himalayas |
| 11 | `/Images/Journeys/Stillness.webp` | `public/Images/Journeys/` | `images.journeys.stillness` | Silent retreat — immersive stillness in a mountain setting |
| 12 | `/Images/Journeys/HighTerrain.webp` | `public/Images/Journeys/` | `images.journeys.highTerrain` | High-altitude retreat — mountain terrain and open skies |
| 13 | `/Images/services/artcreative.webp` | `public/Images/services/` | `images.services.artCreative` | Art and creative retreat in the Himalayas |
| 14 | `/Images/services/burnoutrec.webp` | `public/Images/services/` | `images.services.burnoutRecovery` | Burnout recovery retreat — rest and reset programme |
| 15 | `/Images/services/meditation.webp` | `public/Images/services/` | `images.services.meditationService` | Meditation retreat — guided silence and contemplation |
| 16 | `/Images/services/privatecustom.webp` | `public/Images/services/` | `images.services.privateCustom` | Private custom retreat — personalised Himalayan experience |
| 17 | `/Images/services/restreset.webp` | `public/Images/services/` | `images.services.restReset` | Rest and reset retreat — deep relaxation programme |
| 18 | `/Images/services/soundhealing.webp` | `public/Images/services/` | `images.services.soundHealing` | Sound healing retreat — therapeutic sound immersion |
| 19 | `/Images/services/weekendretreat.webp` | `public/Images/services/` | `images.services.weekendRetreat` | Weekend retreat — short Himalayan getaway |
| 20 | `/Images/services/yoga.webp` | `public/Images/services/` | `images.services.yogaService` | Yoga retreat — mountain yoga and movement practice |
| 21 | `/Images/services/yogamov.webp` | `public/Images/services/` | `images.services.yogaMovement` | Yoga and movement — dynamic body practice in nature |
| 22 | `/Images/trek/region/kedarkantha.webp` | `public/Images/trek/region/` | `images.treks.kedarkantha` | Kedarkantha summit — snow-covered peak with panoramic views |
| 23 | `/Images/trek/region/harkidun.webp` | `public/Images/trek/region/` | `images.treks.harKiDun` | Har Ki Dun valley — ancient cradle-shaped valley |
| 24 | `/Images/trek/region/bramhatal.webp` | `public/Images/trek/region/` | `images.treks.brahmatal` | Brahmatal trek — frozen lake campsite with views |
| 25 | `/Images/trek/region/roopkund_lake.webp` | `public/Images/trek/region/` | `images.treks.roopkund` | Roopkund glacial lake — mysterious skeleton lake |
| 26 | `/Images/trek/region/kuari.webp` | `public/Images/trek/region/` | `images.treks.kuariPass` | Kuari Pass trail — panoramic ridge walk |
| 27 | `/Images/trek/region/tigerfall.webp` | `public/Images/trek/region/` | `images.treks.tigerFall` | Tiger Fall — highest direct waterfalls in Uttarakhand |
| 28 | `/Images/trek/region/budher.webp` | `public/Images/trek/region/` | `images.treks.budherCaves` | Budher Caves — limestone cave system |
| 29 | `/Images/trek/region/chakraweekend.webp` | `public/Images/trek/region/` | `images.treks.chakraWeekend` | Chakrata weekend trek — forest ridge trail |
| 30 | `/Images/trek/region/chakraguided.webp` | `public/Images/trek/region/` | `images.treks.chakraGuided` | Chakrata guided treks — professional-led expeditions |
| 31 | `/Images/trek/region/Khaliya.webp` | `public/Images/trek/region/` | `images.treks.khaliya` | Khaliya Top — alpine meadow with peak panorama |
| 32 | `/Images/trek/region/pangarchulla.webp` | `public/Images/trek/region/` | `images.treks.pangarchulla` | Pangarchulla summit — challenging climb |
| 33 | `/Images/trek/region/milamglacier.webp` | `public/Images/trek/region/` | `images.treks.milamGlacier` | Milam Glacier — remote glacier trek |
| 34 | `/Images/trek/region/garhwal.webp` | `public/Images/trek/region/` | `images.treks.garhwal` | Garhwal Himalayas — dramatic mountain landscape |
| 35 | `/Images/trek/snow/kedarkantha.webp` | `public/Images/trek/snow/` | `images.treks.kedarkanthaSnow` | Kedarkantha winter trek — fresh snowfall |
| 36 | `/Images/trek/snow/bramhatal.webp` | `public/Images/trek/snow/` | `images.treks.brahmatalSnow` | Brahmatal winter — frozen lake surrounded by snow |
| 37 | `/Images/trek/snow/kuari.webp` | `public/Images/trek/snow/` | `images.treks.kuariSnow` | Kuari Pass winter — snow-covered ridge walk |
| 38 | `/Images/trek/begineertrek/bramhatal.webp` | `public/Images/trek/begineertrek/` | `images.treks.brahmatalBeginner` | Brahmatal — beginner-friendly winter trek |
| 39 | `/Images/trek/begineertrek/budher.webp` | `public/Images/trek/begineertrek/` | `images.treks.budherBeginner` | Budher Caves — easy forest trek |
| 40 | `/Images/trek/begineertrek/Khaliya.webp` | `public/Images/trek/begineertrek/` | `images.treks.khaliyaBeginner` | Khaliya Top — gentle meadow trek |
| 41 | `/Images/trek/begineertrek/kuari.webp` | `public/Images/trek/begineertrek/` | `images.treks.kuariBeginner` | Kuari Pass — accessible ridge trek |
| 42 | `/Images/trek/begineertrek/tigerfall.webp` | `public/Images/trek/begineertrek/` | `images.treks.tigerfallBeginner` | Tiger Fall — easy day trek |
| 43 | `/Images/trek/challenging/milamglacier.webp` | `public/Images/trek/challenging/` | `images.treks.milamChallenging` | Milam Glacier — challenging glacier expedition |
| 44 | `/Images/trek/challenging/pangarchulla.webp` | `public/Images/trek/challenging/` | `images.treks.pangarchullaChallenging` | Pangarchulla — demanding summit push |
| 45 | `/Images/trek/challenging/roopkund_lake.webp` | `public/Images/trek/challenging/` | `images.treks.roopkundChallenging` | Roopkund — challenging high-altitude trek |
| 46 | `/Images/himalayanretreats/creative.webp` | `public/Images/himalayanretreats/` | `images.himalayanRetreats.creative` | Creative retreat — art and expression |
| 47 | `/Images/himalayanretreats/retreaktrek.webp` | `public/Images/himalayanretreats/` | `images.himalayanRetreats.retreatTrek` | Retreat and trek combination |
| 48 | `/Images/himalayanretreats/silentretreat.webp` | `public/Images/himalayanretreats/` | `images.himalayanRetreats.silentRetreat` | Silent retreat — deep quiet |
| 49 | `/Images/himalayanretreats/weekend.webp` | `public/Images/himalayanretreats/` | `images.himalayanRetreats.weekendHimalayan` | Weekend Himalayan retreat |
| 50 | `/Images/himalayanretreats/yoga.webp` | `public/Images/himalayanretreats/` | `images.himalayanRetreats.yogaHimalayan` | Yoga in the Himalayas |
| 51 | `/Images/whyhimalaya/cultural.webp` | `public/Images/whyhimalaya/` | `images.whyHimalaya.cultural` | Himalayan cultural heritage |
| 52 | `/Images/whyhimalaya/environment.webp` | `public/Images/whyhimalaya/` | `images.whyHimalaya.environment` | Himalayan environment |
| 53 | `/Images/whyhimalaya/nature.webp` | `public/Images/whyhimalaya/` | `images.whyHimalaya.nature` | Himalayan nature |
| 54 | `/Images/whyhimalaya/psycological.webp` | `public/Images/whyhimalaya/` | `images.whyHimalaya.psychological` | Psychological benefits of Himalayan retreats |
| 55 | `/Images/whyhimalaya/top.webp` | `public/Images/whyhimalaya/` | `images.whyHimalaya.top` | View from a Himalayan summit |
| 56 | `/Images/about/chakrata.webp` | `public/Images/about/` | `images.locations.aboutChakrata` | Chakrata forest landscape |
| 57 | `/Images/about/sankri.webp` | `public/Images/about/` | `images.locations.aboutSankri` | Sankri village in the Himalayas |
| 58 | `/Images/about/munsiyari.webp` | `public/Images/about/` | `images.locations.aboutMunsiyari` | Munsiyari mountain panorama |
| 59 | `/Images/about/rishikesh.webp` | `public/Images/about/` | `images.locations.aboutRishikesh` | Rishikesh riverside view |
| 60 | `/Images/logo/headerlogo.webp` | `public/Images/logo/` | `images.logo.header` | Retreats And Treks logo |
| 61 | `/Images/logo/headerlogo1.png` | `public/Images/logo/` | `images.logo.headerPng` | Retreats And Treks logo |

---

## SECTION 2: NEW IMAGES NEEDED — HEROES (replace 3 Unsplash URLs)

The homepage hero currently uses 3 external Unsplash URLs. These MUST be replaced with local images for performance and reliability.

| # | File to Create | Folder | Purpose | SEO Alt Text | AI Prompt |
|---|---------------|--------|---------|-------------|-----------|
| 62 | `himalayan-sunrise.webp` | `public/Images/heroes/` | Homepage hero slide 1 | Snow-capped Himalayan peaks glowing at sunrise with misty valleys stretching below in Uttarakhand India | Aerial cinematic view of snow-capped Himalayan peaks at golden sunrise, misty valleys below, warm orange light hitting mountain ridges, dramatic clouds, Uttarakhand India, landscape photography, 16:9 aspect ratio |
| 63 | `valley-forest.webp` | `public/Images/heroes/` | Homepage hero slide 2 | Lush green mountain valley with dense deodar forest and a winding river in the Himalayas | Wide landscape of a lush green Himalayan valley with dense deodar cedar forest, a winding turquoise river below, morning mist hanging between trees, soft diffused light, Uttarakhand India, 16:9 |
| 64 | `alpine-ridge.webp` | `public/Images/heroes/` | Homepage hero slide 3 | A solo trekker on an alpine ridge trail with panoramic mountain views at golden hour in the Himalayas | Solo hiker silhouette walking on a narrow alpine ridge trail, panoramic snow-capped mountain range in background, golden hour warm light, dramatic sky, cinematic adventure photography, Uttarakhand Himalayas, 16:9 |
| 65 | `blog-hero.webp` | `public/Images/heroes/` | Blog listing page hero | Himalayan mountain range at dawn with morning light illuminating prayer flags in the foreground | Wide landscape of Himalayan mountain range at dawn, colorful Buddhist prayer flags fluttering in foreground, soft pink and gold light, serene atmosphere, editorial travel photography, 16:9 |
| 66 | `treks-hero.webp` | `public/Images/heroes/` | Treks listing page hero | Trekkers on a Himalayan trail with snow peaks and alpine meadows stretching into the distance | Group of three trekkers with backpacks walking on a mountain trail, vast Himalayan snow peaks in distance, green alpine meadow, early morning golden light, adventure travel photography, wide shot, 16:9 |
| 67 | `contact-hero.webp` | `public/Images/heroes/` | Contact page hero | Peaceful Himalayan village with traditional stone houses and mountain backdrop in Uttarakhand | Quaint Himalayan village with traditional stone and wood houses, terrace farming, snow mountains behind, soft morning light, peaceful atmosphere, travel editorial photography, 16:9 |

---

## SECTION 3: NEW IMAGES NEEDED — EXPERIENCE HUB PAGES (50+ pages)

These pages all use the `ExperienceHubPage` component. One image per page — placed in the hero section.

### Retreat Type Pages

| # | File to Create | Folder | Page Route | SEO Alt Text | AI Prompt |
|---|---------------|--------|-----------|-------------|-----------|
| 68 | `meditation-retreats.webp` | `public/Images/experience-hubs/` | `/meditation-retreats` | Person meditating in lotus position on a cliff overlooking misty Himalayan valleys at sunrise | Single person sitting in lotus meditation pose on flat rock ledge, overlooking vast misty Himalayan valley, golden sunrise, peaceful expression, meditation retreat setting, cinematic, 16:9 |
| 69 | `silent-retreats.webp` | `public/Images/experience-hubs/` | `/silent-retreats` | Serene mountain landscape in complete stillness with a quiet meditation hall surrounded by deodar trees | Minimalist wooden meditation hall in a clearing surrounded by tall deodar cedar trees, mountain range in background, early morning fog, absolute stillness, no people, zen atmosphere, 16:9 |
| 70 | `spiritual-retreats.webp` | `public/Images/experience-hubs/` | `/spiritual-retreats` | Ancient Himalayan temple at dawn with prayer flags and mountain peaks in the background | Small ancient stone temple on a mountain ridge at dawn, colorful prayer flags stretching to peaks, warm golden light, spiritual atmosphere, Uttarakhand Himalayas, 16:9 |
| 71 | `yoga-retreats.webp` | `public/Images/experience-hubs/` | `/yoga-retreats` | Group yoga session on a mountain terrace overlooking snow-capped Himalayan peaks at sunrise | Group of five people doing yoga warrior pose on outdoor wooden deck, snow-capped mountains in background, golden sunrise, peaceful mountain retreat setting, 16:9 |
| 72 | `digital-detox-retreat.webp` | `public/Images/experience-hubs/` | `/digital-detox-retreat` | Person walking barefoot through a mountain meadow leaving behind all technology surrounded by Himalayan nature | Person walking barefoot through lush green alpine meadow, mountain range in distance, no technology visible, freedom and nature reconnection, soft afternoon light, 16:9 |
| 73 | `healing-retreat.webp` | `public/Images/experience-hubs/` | `/healing-retreat-himalayas` | Natural hot spring pool beside a mountain stream in the Himalayas with healing herbs growing nearby | Natural stone pool beside a mountain stream, steam rising, lush green ferns and healing herbs around, mountain backdrop, therapeutic atmosphere, soft light, 16:9 |
| 74 | `burnout-recovery.webp` | `public/Images/experience-hubs/` | `/burnout-recovery-retreats` | Person resting in a hammock between deodar trees overlooking a quiet Himalayan valley | Person resting peacefully in a cotton hammock strung between two large deodar trees, misty valley view below, dappled afternoon sunlight, complete relaxation, 16:9 |
| 75 | `anxiety-healing.webp` | `public/Images/experience-hubs/` | `/anxiety-healing-retreat` | Calm river flowing through a peaceful forest clearing in the Himalayas creating a sense of tranquility | Gentle mountain river flowing over smooth rocks through a peaceful deodar forest clearing, dappled sunlight, incredibly calm water reflections, therapeutic forest scene, 16:9 |
| 76 | `creative-retreat.webp` | `public/Images/experience-hubs/` | `/creative-retreat` | Artist painting a mountain landscape en plein air on a Himalayan hillside | Person painting on easel outdoors on a grassy Himalayan hillside, vast mountain landscape before them, scattered art supplies, warm afternoon light, creative inspiration, 16:9 |
| 77 | `stress-relief.webp` | `public/Images/experience-hubs/` | `/stress-relief-retreats` | Woman practicing breathing exercises on a mountain balcony overlooking peaceful Himalayan forests | Woman sitting cross-legged on a wooden mountain lodge balcony, eyes closed, deep breathing, pine forest valley stretching below, soft morning light, absolute peace, 16:9 |
| 78 | `self-discovery.webp` | `public/Images/experience-hubs/` | `/self-discovery-retreat` | Solo traveler standing at the edge of a mountain cliff gazing at the vast Himalayan horizon at dawn | Solo person standing at edge of high mountain cliff, looking out at vast layered Himalayan ranges, dawn light, contemplative mood, journey of self-discovery, 16:9 |
| 79 | `personal-growth.webp` | `public/Images/experience-hubs/` | `/personal-growth-retreat` | Small group sharing a circle conversation around a campfire under Himalayan stars | Small group of five people sitting in circle around gentle campfire, starry Himalayan sky above, warm faces lit by fire, intimate sharing circle, mountain retreat, 16:9 |
| 80 | `life-reset.webp` | `public/Images/experience-hubs/` | `/life-reset-retreat` | Person standing with arms open at a mountain summit embracing a new beginning in the Himalayas | Person standing at mountain summit with arms spread wide, facing vast Himalayan panorama, sunrise behind them, feeling of freedom and new beginning, 16:9 |
| 81 | `retreats-for-beginners.webp` | `public/Images/experience-hubs/` | `/retreats-for-beginners` | Welcoming mountain retreat entrance with a simple path leading through a garden to a cozy lodge | Welcoming entrance to a mountain retreat, stone-lined garden path leading to a warm cozy wooden lodge, mountains behind, friendly inviting atmosphere, 16:9 |

### Seasonal Retreat Pages

| # | File to Create | Folder | Page Route | SEO Alt Text | AI Prompt |
|---|---------------|--------|-----------|-------------|-----------|
| 82 | `autumn-retreat.webp` | `public/Images/experience-hubs/` | `/autumn-retreat-himalayas` | Golden autumn foliage on Himalayan hillsides with a meditation clearing in a forest of orange and red trees | Himalayan hillside covered in golden and red autumn foliage, small clearing with meditation cushions, warm autumn light, leaves gently falling, cozy atmosphere, 16:9 |
| 83 | `spring-retreat.webp` | `public/Images/experience-hubs/` | `/spring-retreat-himalayas` | Himalayan meadow in full spring bloom with rhododendron flowers and snow peaks in the distance | Vast alpine meadow covered in blooming red and pink rhododendron flowers, snow-capped peaks in distance, bright spring sunshine, vibrant colors, 16:9 |
| 84 | `summer-retreat.webp` | `public/Images/experience-hubs/` | `/summer-retreat-himalayas` | Lush green Himalayan valley in summer with waterfalls and terraced fields under clear blue skies | Lush green Himalayan valley in peak summer, multiple waterfalls cascading down hillsides, terraced fields, clear blue sky, bright natural light, 16:9 |
| 85 | `winter-retreat.webp` | `public/Images/experience-hubs/` | `/winter-retreat-himalayas` | Snow-covered Himalayan retreat lodge with warm lights glowing from windows on a peaceful winter evening | Cozy mountain lodge blanketed in fresh snow, warm golden light from windows, snow-covered deodar trees, peaceful winter evening, chimney smoke, 16:9 |
| 86 | `weekend-retreat.webp` | `public/Images/experience-hubs/` | `/weekend-retreat-himalayas` | Quick weekend escape into the mountains showing a scenic drive arriving at a Himalayan retreat | Mountain road winding through deodar forest leading to a retreat, car visible on scenic road, mountains ahead, feeling of adventure and escape, 16:9 |

### Duration-Based Pages

| # | File to Create | Folder | Page Route | SEO Alt Text | AI Prompt |
|---|---------------|--------|-----------|-------------|-----------|
| 87 | `3-day-retreat.webp` | `public/Images/experience-hubs/` | `/3-day-meditation-retreat`, `/3-day-silent-retreat` | Three-day meditation journey depicted through a serene mountain morning scene | Serene mountain scene at dawn, small meditation pavilion, short retreat feeling of a focused weekend, soft golden light, intimate and accessible, 16:9 |
| 88 | `5-day-retreat.webp` | `public/Images/experience-hubs/` | `/5-day-yoga-retreat` | Five-day yoga retreat setting with outdoor yoga platform overlooking a mountain valley | Wooden outdoor yoga platform on a mountain edge, yoga mats laid out, vast valley view, mid-morning light, perfect for a week-long practice, 16:9 |
| 89 | `7-day-retreat.webp` | `public/Images/experience-hubs/` | `/7-day-meditation-retreat`, `/7-day-healing-retreat` | Week-long retreat experience showing the depth of immersion in mountain solitude | Wide shot of an isolated mountain retreat settlement, multiple small cottages, prayer flags, surrounded by forest, suggesting deep immersive stay, 16:9 |
| 90 | `10-day-retreat.webp` | `public/Images/experience-hubs/` | `/10-day-silent-retreat` | Ten-day silent retreat setting in a remote mountain monastery surrounded by pristine nature | Remote mountain monastery on a cliff edge, prayer flags, absolutely no roads or technology visible, pristine wilderness, suggesting deep silence and isolation, 16:9 |

### Informational & Comparison Pages

| # | File to Create | Folder | Page Route | SEO Alt Text | AI Prompt |
|---|---------------|--------|-----------|-------------|-----------|
| 91 | `himalayan-silent-retreats.webp` | `public/Images/experience-hubs/` | `/himalayan-silent-retreats` | Silent retreat meditation hall in the Himalayas with natural wood interiors and mountain view windows | Beautiful wooden meditation hall interior, large windows showing Himalayan peaks, cushions on floor, natural light, absolute silence atmosphere, 16:9 |
| 92 | `benefits-meditation.webp` | `public/Images/experience-hubs/` | `/benefits-of-meditation-retreat` | Person experiencing deep peace during meditation with Himalayan sunrise light | Close up of person meditating, golden sunrise light on face, mountain landscape visible behind, expression of deep peace and clarity, 16:9 |
| 93 | `benefits-himalayan.webp` | `public/Images/experience-hubs/` | `/benefits-of-himalayan-retreats` | Panoramic Himalayan landscape showcasing the natural healing environment of the mountains | Epic wide panoramic shot of layered Himalayan mountain ranges, clouds between peaks, pristine environment, healing atmosphere, 16:9 |
| 94 | `best-himalayan-retreats.webp` | `public/Images/experience-hubs/` | `/best-himalayan-retreats` | Collection of Himalayan retreat settings showing diverse landscapes from valley to peak | Split landscape showing valley retreat, forest retreat, and mountain peak retreat in one panoramic view of Himalayan diversity, 16:9 |
| 95 | `best-meditation-india.webp` | `public/Images/experience-hubs/` | `/best-meditation-retreats-in-india` | Top meditation retreat in India showing a mountain ashram with meditation gardens | Mountain ashram with beautifully maintained meditation garden, stone pathways, traditional architecture, mountain backdrop, India retreat setting, 16:9 |
| 96 | `retreat-vs-therapy.webp` | `public/Images/experience-hubs/` | `/retreat-vs-therapy` | Split image of a therapy room and a mountain meditation setting showing two paths to healing | Creative split composition: left half showing simple therapy chair in room, right half showing mountain meditation setting, contrast of indoor clinical vs outdoor natural healing, 16:9 |
| 97 | `retreat-vs-vacation.webp` | `public/Images/experience-hubs/` | `/retreat-vs-vacation` | Contrast between a typical vacation resort and a mountain retreat showing different intentions | Split composition: left showing typical beach resort pool scene, right showing mountain retreat meditation morning, contrasting vacation vs transformation, 16:9 |
| 98 | `silent-vs-detox.webp` | `public/Images/experience-hubs/` | `/silent-retreat-vs-digital-detox` | Person choosing between silence and nature immersion as retreat paths in the mountains | Fork in a mountain trail, two paths, one leading to silent meditation clearing, other leading to forest adventure trail, choice and journey metaphor, 16:9 |
| 99 | `how-to-choose.webp` | `public/Images/experience-hubs/` | `/how-to-choose-a-meditation-retreat` | Person studying a map of Himalayan retreat locations on a mountain viewpoint | Person sitting on mountain viewpoint, looking at a physical map, various mountains visible, planning and choosing, golden hour light, 16:9 |
| 100 | `how-to-prepare.webp` | `public/Images/experience-hubs/` | `/how-to-prepare-for-a-retreat` | Mindful packing for a retreat with a backpack and simple essentials laid out on a mountain cabin bed | Flat lay of minimal travel essentials on a wooden surface: small backpack, journal, water bottle, shawl, comfortable clothes, mountain cabin window visible, 16:9 |
| 101 | `first-retreat-tips.webp` | `public/Images/experience-hubs/` | `/first-meditation-retreat-tips` | First-time retreat goer arriving at a mountain retreat centre with a sense of wonder | Person with small backpack arriving at a mountain retreat entrance, looking up at mountains with wonder, welcoming pathway, first-time feeling, 16:9 |
| 102 | `first-day.webp` | `public/Images/experience-hubs/` | `/first-day-of-a-meditation-retreat` | Morning of the first day at a retreat showing dawn light entering a simple mountain room | Simple mountain room at dawn, early morning light streaming through window onto meditation cushion, fresh start feeling, minimal decor, 16:9 |
| 103 | `worth-it.webp` | `public/Images/experience-hubs/` | `/is-a-meditation-retreat-worth-it` | Person looking transformed and peaceful after a retreat sitting in front of mountain panorama | Person sitting peacefully on mountain rock, calm expression, transformed feeling, vast panorama behind, golden hour, sense of fulfillment, 16:9 |
| 104 | `how-long.webp` | `public/Images/experience-hubs/` | `/how-long-should-a-meditation-retreat-be` | Calendar or timeline visual showing progression of retreat depth from 3 to 10 days in mountains | Creative shot of mountain sunrise with path stretching into distance, milestones or markers along trail, suggesting progression and depth over time, 16:9 |
| 105 | `how-hard-silent.webp` | `public/Images/experience-hubs/` | `/how-hard-is-a-silent-retreat` | Person sitting in quiet contemplation during a challenging moment of a silent retreat | Person sitting alone on porch of mountain cabin, thoughtful expression, not distressed but contemplative, quiet struggle and growth, soft light, 16:9 |
| 106 | `why-people-go.webp` | `public/Images/experience-hubs/` | `/why-people-go-to-meditation-retreats` | Diverse group of people arriving at a mountain retreat from different walks of life | Small diverse group walking up mountain path toward retreat, different ages and backgrounds, all carrying simple packs, shared journey, 16:9 |
| 107 | `zanskar-retreat.webp` | `public/Images/experience-hubs/` | `/best-time-for-a-retreat-in-zanskar`, `/why-zanskar-is-perfect-for-retreats` | Zanskar valley in Ladakh with dramatic barren mountains and clear blue river ideal for remote retreats | Dramatic Zanskar valley landscape, barren colorful mountains, crystal clear blue Zanskar river, remote and otherworldly, high altitude desert, 16:9 |
| 108 | `reach-zanskar.webp` | `public/Images/experience-hubs/` | `/how-to-reach-zanskar-for-a-retreat` | Scenic mountain road leading to Zanskar valley through dramatic Himalayan passes | Winding mountain road through dramatic Himalayan passes heading to Zanskar, rugged terrain, adventure journey, clear sky, 16:9 |
| 109 | `what-to-expect.webp` | `public/Images/experience-hubs/` | `/what-to-expect-at-a-meditation-retreat` | Daily routine at a meditation retreat showing a peaceful morning scene with meditation cushions and herbal tea | Morning scene at retreat: meditation cushions arranged in semicircle, steaming cups of herbal tea, mountain view through open windows, 16:9 |
| 110 | `mind-in-silence.webp` | `public/Images/experience-hubs/` | `/what-happens-to-your-mind-in-silence` | Abstract representation of inner peace and mental clarity achieved through silence in mountains | Ethereal mountain scene with mirror-still lake perfectly reflecting mountains, absolute stillness, representing mind in silence, no people, 16:9 |
| 111 | `what-happens-silent.webp` | `public/Images/experience-hubs/` | `/what-happens-at-a-silent-retreat` | Day in the life of a silent retreat showing meditation bell and mountain sunrise | Close-up of singing bowl with mountain sunrise in background, drops of morning dew, representing the silent retreat experience, 16:9 |
| 112 | `what-to-pack.webp` | `public/Images/experience-hubs/` | `/what-to-pack-for-a-retreat` | Complete packing checklist layout for a mountain retreat with all essential items | Flat lay of complete retreat packing: warm layers, meditation shawl, journal, water bottle, flashlight, comfortable shoes, toiletries, on wooden floor, 16:9 |
| 113 | `7-day-zanskar-story.webp` | `public/Images/experience-hubs/` | `/my-7-day-meditation-retreat-in-zanskar` | Personal journal scene from a 7-day Zanskar retreat with journal open on a mountain ledge | Open journal with handwritten notes on a stone ledge, Zanskar valley panorama behind, pen and coffee cup, personal story atmosphere, 16:9 |
| 114 | `vipassana-vs-meditation.webp` | `public/Images/experience-hubs/` | `/vipassana-vs-meditation-retreat` | Two different meditation styles shown side by side in mountain settings | Split scene: left showing formal Vipassana sitting meditation in strict hall, right showing relaxed mountain meditation outdoors, contrast, 16:9 |
| 115 | `retreat-trek-combo.webp` | `public/Images/experience-hubs/` | `/himalayan-retreat-with-trekking`, `/meditation-retreat-and-trek`, `/trek-and-meditate-himalayas` | Combined retreat and trekking experience showing a meditator by a mountain campsite | Person meditating beside a mountain campfire, trekking gear nearby, tent pitched, mountains in background, combining adventure and stillness, 16:9 |
| 116 | `week-without-phone.webp` | `public/Images/experience-hubs/` | `/a-week-without-my-phone-digital-detox` | Person joyfully disconnected in nature without any technology surrounded by Himalayan beauty | Person laughing with arms out, walking through mountain meadow, no phone or devices anywhere, pure joy of disconnection, natural beauty, 16:9 |

---

## SECTION 4: NEW IMAGES NEEDED — BLOG

| # | File to Create | Folder | Page Route | SEO Alt Text | AI Prompt |
|---|---------------|--------|-----------|-------------|-----------|
| 117 | `how-to-choose-meditation-retreat.webp` | `public/Images/blog/` | Blog post | Guide to choosing a meditation retreat in the Indian Himalayas | Person at crossroads of mountain trails, map in hand, multiple retreat centers visible in distance, decision-making journey, 16:9 |
| 118 | `kedarkantha-trek-guide.webp` | `public/Images/blog/` | Blog post | Snow-covered Kedarkantha summit trail with trekkers approaching the peak | Trekkers approaching Kedarkantha summit, fresh snow everywhere, prayer flags at summit visible, bright winter sun, adventure, 16:9 |
| 119 | `chakrata-guide.webp` | `public/Images/blog/` | Blog post | Complete guide to Chakrata showing deodar forest trails and mountain viewpoints | Multiple Chakrata highlights: deodar forest trail, mountain viewpoint, Tiger Falls glimpse, comprehensive guide feeling, 16:9 |
| 120 | `trek-vs-retreat.webp` | `public/Images/blog/` | Blog post | Comparison of trekking adventure and meditation retreat experiences in the Himalayas | Creative split: left showing adventurous trekking scene, right showing peaceful meditation scene, both in Himalayan settings, 16:9 |
| 121 | `weekend-retreat-guide.webp` | `public/Images/blog/` | Blog post | Weekend retreat escape from city to mountains showing the journey transformation | Before/after feel: blurry city stress transitioning to crisp mountain retreat clarity, transformation in a weekend, 16:9 |
| 122 | `chakrata-vs-mussoorie.webp` | `public/Images/blog/` | Blog post | Side by side comparison of Chakrata wilderness and Mussoorie hill station | Split frame: Chakrata deep forest wilderness vs Mussoorie developed hill station, authentic vs tourist, contrast, 16:9 |

> **Note**: Add more blog images as you publish new articles. Name them matching the blog slug.

---

## SECTION 5: NEW IMAGES NEEDED — OTHER PAGES

### Facilitators (portraits)

| # | File to Create | Folder | Purpose | SEO Alt Text | AI Prompt |
|---|---------------|--------|---------|-------------|-----------|
| 123 | `facilitator-placeholder.webp` | `public/Images/people/` | Default facilitator image | Meditation facilitator in a peaceful mountain setting | Professional but warm portrait of a meditation teacher, mountain backdrop, natural light, calm expression, 1:1 square crop |

> **Note**: Replace with real facilitator photos when available. Use actual team/facilitator photographs — not AI-generated faces.

### Sections (for text-heavy homepage areas)

| # | File to Create | Folder | Purpose | SEO Alt Text | AI Prompt |
|---|---------------|--------|---------|-------------|-----------|
| 124 | `how-it-works.webp` | `public/Images/sections/` | Homepage "How It Works" section | Step by step process of planning a Himalayan retreat journey | Conceptual image: mountain path with three visible milestones/waypoints, journey planning metaphor, warm light, 16:9 |
| 125 | `not-a-package-deal.webp` | `public/Images/sections/` | Homepage "Our Promise" section | Personalized retreat experience showing a custom crafted mountain journey | Intimate scene of two people discussing over a hand-drawn journey map, mountain cabin setting, personal attention, 16:9 |
| 126 | `final-cta.webp` | `public/Images/sections/` | Homepage CTA background | Breathtaking Himalayan panorama inviting the viewer to begin their journey | Stunning wide Himalayan panorama, golden hour, trail leading into mountains, inviting and inspiring, call-to-adventure feeling, 16:9 |

### Daily Rhythm (for retreat journey pages)

| # | File to Create | Folder | Purpose | SEO Alt Text | AI Prompt |
|---|---------------|--------|---------|-------------|-----------|
| 127 | `morning.webp` | `public/Images/rhythm/` | Morning retreat session | Early morning meditation session at sunrise in the Himalayan mountains | Person meditating at dawn, first light hitting mountains, misty atmosphere, early morning discipline, quiet, 16:9 |
| 128 | `afternoon.webp` | `public/Images/rhythm/` | Afternoon retreat activity | Afternoon nature walk and journaling session in mountain forests | Person walking through deodar forest, journal in hand, dappled afternoon light, contemplative exploration, 16:9 |
| 129 | `evening.webp` | `public/Images/rhythm/` | Evening retreat session | Evening gathering around a fireplace in a mountain retreat lodge | Small group seated around warm fireplace in mountain lodge, evening wind-down, warm amber light, reflection time, 16:9 |

---

## SECTION 6: SUMMARY COUNTS

| Category | Already Have | Need to Create | Total |
|----------|------------|----------------|-------|
| Heroes (local) | 1 | 6 | 7 |
| Locations | 10 | 0 | 10 |
| Journeys | 5 | 0 | 5 |
| Services | 9 | 0 | 9 |
| Treks | 24 | 0 | 24 |
| Himalayan Retreats | 5 | 0 | 5 |
| Why Himalaya | 5 | 0 | 5 |
| About | 4 | 0 | 4 |
| Logo | 2 | 0 | 2 |
| Experience Hubs | 0 | **49** | 49 |
| Blog | 0 | **6+** | 6+ |
| People | 0 | **1+** | 1+ |
| Sections | 0 | **3** | 3 |
| Daily Rhythm | 0 | **3** | 3 |
| **TOTALS** | **65** | **~68** | **~133** |

> ChatGPT's estimate of 400-800 images is inflated. Your site needs ~130-150 total unique images for full coverage. Many experience hub pages can reuse the same image (e.g., all Zanskar pages share one Zanskar image).

---

## SECTION 7: DEVELOPER HANDOFF INSTRUCTIONS

Once you have prepared the images, give your developer these instructions:

### Quick Wins (can do in 1-2 hours)
1. **Replace 3 Unsplash hero URLs** in `HomeClient.tsx` with local `images.heroes.*` entries
2. **Replace all plain `<img>` tags** in `HomeClient.tsx` with `CardImage` components using registry keys
3. **Replace `<img>` tags** in `RetreatsClient.tsx`, `about/page.tsx`, `blog/page.tsx` with registry components

### Medium Effort (2-4 hours)
4. **Add `heroImage` prop** to `ExperiencePage` type in `config/experiencePages.ts`
5. **Add `HeroImage` rendering** in `ExperienceHubPage.tsx` component (ONE change → 50+ pages get images)
6. **Add hero image key** to each page config in `config/experiencePages.ts`

### Larger Effort (4-8 hours)
7. **Add images to RetreatsLocationClient.tsx** — location hero, service cards, trek cards
8. **Add images to RetreatJourneyClient.tsx** — hero, daily rhythm, location cards
9. **Add images to TreksClient.tsx** — hero, region sections
10. **Add images to blog/[slug]/page.tsx** — featured image per post

### Image Registration
For every new image the developer needs to:
1. Add entry to `lib/images.ts` in the appropriate category
2. Use the registry key in components (not hardcoded paths)

---

## SECTION 8: IMAGE SOURCING OPTIONS

### Free Stock Photos (Best for Himalayan content)
- **Unsplash** (unsplash.com) — Download and self-host (don't hotlink)
- **Pexels** (pexels.com) — Good Himalayan landscape collection
- **Pixabay** (pixabay.com) — Free, no attribution required

### AI Image Generation
- **Midjourney** — Best quality for landscapes (use prompts from this doc)
- **DALL-E 3** (via ChatGPT Plus) — Good for specific scenes
- **Leonardo.ai** — Free tier available, good for nature scenes
- **Adobe Firefly** — Commercial-safe images

### Your Own Photos
- Best option for authenticity and SEO
- Google favors original photography
- Take photos on your next trek/retreat visit

### Important
- Never use images with visible watermarks
- Always verify license allows commercial use
- Compress every image before adding to the project
- Use `.webp` format for all images (best compression + quality)
