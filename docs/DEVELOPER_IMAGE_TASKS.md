# 🖼️ Website Ke Liye Images — Developer Ko Kya Karna Hai

> **Tumhara kaam SIRF yeh hai:** Photos/icons banao ya download karo, sahi size mein karo,
> aur sahi folder mein rakhdo. **BAS. Koi coding nahi karni hai.** Code ka saara kaam
> alag se ho jayega.
>
> **Total: ~91 images chahiye. Neeche sab detail mein likha hai — kaunsi photo, kaise honi chahiye,
> kahan rakhni hai.**

---

## 🧠 IMAGE SYSTEM SAMJHO — Yeh Kaise Kaam Karta Hai (Simple Hindi Mein)

Dekho bhai, pehle yeh samajh lo ki website pe images kaise kaam karti hain. Yeh samajhna zaroori hai taaki tumhe pata rahe ki tum kya kar rahe ho aur kyun kar rahe ho. Don't worry — bahut simple hai.

### Purana Tarika (Jo Galat Tha)

Pehle website mein images aise lagayi jaati thi:
- Har page mein alag alag jagah se photo ka link daal diya
- Koi ek jagah photo ki list nahi thi
- Agar ek photo 10 pages mein use hoti thi, toh 10 jagah uska link likhna padta tha
- Agar photo change karni ho toh 10 jagah jaake change karo — ek bhi miss hua toh galat photo dikhegi
- Kuch photos internet se aa rahi thi (Unsplash URLs) — slow hoti hain, kabhi kabhi load hi nahi hoti

Yeh bahut messy tha. Ek photo change karne mein 10 files kholni padti thi.

### Naya System (Jo Ab Bana Hua Hai)

Ab ek **central image registry** bana hua hai. Isko aise samjho:

**Socho ek diary hai jismein saari photos ki list hai.** Har photo ka ek naam hai, uska file path hai, uski description hai, aur size likhi hai. Yeh diary ek file mein rakhi hui hai — `lib/images.ts`.

Jab website ke kisi bhi page ko koi photo chahiye, toh woh seedha is diary mein jaake dekhta hai — "mujhe `himalayan-sunrise` wali photo do" — aur diary usko sahi photo de deti hai.

**Fayda kya hai?**
- Saari photos ki list **ek hi jagah** hai
- Agar photo change karni ho — **sirf diary mein change karo**, saare pages pe automatically update ho jayegi
- Koi photo miss nahi hogi, koi galat path nahi aayega
- Speed fast hai kyunki saari photos local hain (apni website pe stored), internet se nahi aa rahi

### System Ke 3 Hisse Hain

**HISSA 1: Photo Files (public/Images/ folder)**

Yeh tumhara kaam hai. Saari actual photo files yahan rakhi jaati hain:

```
public/
  Images/
    hero/           ← Home page ki badi photos (3 photos)
    location/       ← Har location ki photo (Chakrata, Sankri, etc.)
    Journeys/       ← Retreat type ki photos (yoga, meditation, weekend)
    services/       ← Service category photos (art, burnout, etc.)
    trek/
      region/       ← Har trek ki main photo (Kedarkantha, etc.)
      snow/         ← Snow trek photos
      begineertrek/ ← Beginner trek photos
      challenging/  ← Hard trek photos
    facilitators/   ← Teacher photos (5 logon ki — ABHI KHAALI HAI)
    blog/           ← Blog post featured images (37 — ABHI KHAALI HAI)
    icons/          ← Home page + topic icons (13 — ABHI KHAALI HAI)
    people/         ← Team photo (1 — ABHI KHAALI HAI)
    logo/           ← Website ka logo
    himalayanretreats/ ← Retreat category cards
    whyhimalaya/    ← "Why Himalayas" section photos
    about/          ← About page ki photos
```

Jab tum ek photo `public/Images/hero/` mein daalte ho, toh website usse `/Images/hero/filename.webp` pe access kar sakti hai. `public` folder website ka root hai — jo bhi file tum `public/` mein daaloge, woh direct URL se accessible ho jayegi.

**HISSA 2: Image Diary / Registry (lib/images.ts)**

Yeh ek code file hai jismein har photo ka record hai. Isko tum chhuna mat — yeh agent ka kaam hai. Lekin samjhne ke liye batata hoon:

Har photo ka entry aisa dikhta hai:
```
himalayanSunrise: {
  src: '/Images/hero/himalayan-sunrise.webp',    ← file kahan hai
  alt: 'Himalayan peaks at sunrise',              ← photo ki description (SEO ke liye)
  width: 1920,                                    ← photo kitni chaudi hai
  height: 1080,                                   ← photo kitni lambi hai
}
```

Abhi is diary mein **61 entries** hain. Matlab 61 photos registered hain. Jismein se:
- **58 photos local hain** (apni website pe stored — `public/Images/` mein)
- **3 photos abhi bhi internet se aa rahi hain** (Unsplash URLs) — yeh woh 3 Hero photos hain jo tumhe banani hain (KAAM 1)

Jab tum naye photos banaoge aur folder mein daaloge, toh agent is diary mein unka entry add kar dega.

**HISSA 3: Pages Jo Photos Use Karti Hain**

Website ke 60+ pages iss diary se photo maangte hain. Ek component hai `ContentHero` — yeh ek mapping rakhta hai ki kaunse page ko kaunsi photo milegi. Ismein **120+ pages mapped** hain.

Jaise:
- `/find-your-retreat` page khologe → usse `retreatHero` photo milegi
- `/meditation-retreats` page khologe → usse `meditation` service photo milegi
- `/treks/location/chakrata` khologe → usse `chakrata` location photo milegi

Yeh sab mapping already set up hai. Tumhe iss se koi matlab nahi — yeh code level ka kaam hai.

### Toh Tumhara Kaam Kya Hai Exactly?

Tumhara kaam sirf **HISSA 1** hai — photos banao aur sahi folder mein daalo. Bas.

Jab tum photos daaloge:
1. Tum photo banate ho → WebP mein convert karte ho → folder mein daalte ho
2. Tum hume batate ho ki ready hai
3. Agent **HISSA 2** mein diary entry add karta hai (photo ka path, alt text, size)
4. Agent **HISSA 3** mein mapping update karta hai (kaunse page ko yeh photo milegi)
5. Done — photo website pe dikhne lagti hai

**Tumhe sirf Step 1 aur Step 2 karna hai. Step 3, 4, 5 agent karega.**

### Kaunsi Photos Abhi Missing Hain?

Abhi system mein **61 photos registered hain** aur sab kaam kar rahi hain. Lekin kuch jagah photos missing hain:

| Kya missing hai | Kitni | Kyun zaroori hai |
|-----------------|-------|------------------|
| 3 Hero photos | 3 | Abhi internet se aa rahi hain — slow + unreliable |
| 5 Facilitator photos | 5 | Teachers ki photos dikhani hain profile pages pe |
| 37 Blog featured photos | 37 | Har blog ko apni unique photo chahiye |
| 13 Icons (home + topics) | 13 | Text-only sections mein visual chahiye |
| 32 Trek itinerary photos | 32 | Day-wise trek photos chahiye |
| 1 Team photo | 1 | Contact page pe team dikhani hai |
| **TOTAL** | **~91** | |

Yeh saari **91 photos tumhe banani hain**. Neeche har ek ki detail di gayi hai.

### Quick Example — Start Se End Tak

Maan lo tumhe Hero photo banani hai:

1. **Photo lo:** Camera se Himalayan sunrise ki photo lo, ya pexels.com se download karo
2. **Resize karo:** 1920 x 1080 pixels (paint.net ya canva se)
3. **Convert karo:** squoosh.app pe jaao → photo daalo → WebP select karo → quality 85% → download
4. **Naam rakho:** `himalayan-sunrise.webp` (chhota naam, hyphens, no spaces)
5. **Folder mein daalo:** `public/Images/hero/himalayan-sunrise.webp`
6. **Batao:** "Hero photos ready hain"
7. **Agent karega:** Diary mein Unsplash URL hatake local path daalega. Done — photo website pe local se load hogi.

Bas. Itna simple hai. Ab neeche detailed task list padho.

---

## ⚡ PEHLE YEH SAMJHO (2 minute mein)

Website pe ek image system bana hua hai. Tumhe sirf:

1. **Photo banao ya download karo** (sahi size mein)
2. **WebP format mein convert karo** (squoosh.app pe free mein hota hai)
3. **Sahi folder mein daal do** (`public/Images/` ke andar)

**Bas itna. Baaki sab code ka kaam agent karega.**

### Photo Ko WebP Mein Kaise Convert Karo:
1. Browser mein jaao: **squoosh.app**
2. Apni photo drag karo
3. Right side mein "WebP" select karo
4. Quality slider ko **80%** pe rakho (hero photos ke liye 85%)
5. Download karo
6. File ka naam chhota, simple, English mein rakho — spaces nahi, hyphens use karo
   - ✅ Sahi: `valley-forest.webp`
   - ❌ Galat: `Valley Forest.webp` ya `valley forest.WEBP`

---

## 📋 KAAM KI LIST — Pehle Kya Karo?

| # | Kya Karna Hai | Kitne Photos | Pehle Ya Baad Mein? |
|---|--------------|-------------|---------------------|
| 1 | 3 Hero photos (mountains/valleys) | 3 | 🔴 **SABSE PEHLE** |
| 2 | 5 Teacher/facilitator photos | 5 | 🔴 **JALDI KARO** |
| 3 | 37 Blog post photos | ~37 | 🟡 Baad mein chalega |
| 4 | 9 Home page icons | 9 | 🟡 Baad mein chalega |
| 5 | 4 Topic category icons | 4 | 🟡 Baad mein chalega |
| 6 | 32 Trek day-by-day photos | ~32 | 🟢 Sabse baad mein |
| 7 | 1 Team photo (contact page) | 1 | 🟢 Sabse baad mein |

---

## 🔴 KAAM 1: 3 Hero Photos (SABSE PEHLE KARO)

**Kahan dikhenge:** Home page ki sabse upar wali badi sliding images mein. Yeh almost har page pe
bhi dikhte hain. Abhi internet se aa rahe hain (Unsplash) — unreliable hai, slow hai.

### 3 photos chahiye:

| # | Photo Kaise Honi Chahiye | File ka naam | Folder |
|---|-------------------------|-------------|--------|
| 1 | **Sunrise wali mountain photo** — subah ka nazara, golden light, Himalayan peaks | `himalayan-sunrise.webp` | `public/Images/hero/` |
| 2 | **Valley mein jungle/forest** — hara bhara, deep valley, trees | `valley-forest.webp` | `public/Images/hero/` |
| 3 | **Mountain ridge/peak** — upar se view, dramatic ridge line | `alpine-ridge.webp` | `public/Images/hero/` |

### Photo rules:
- **Size:** 1920 x 1080 pixels (horizontal/landscape — seedhi nahi)
- **Format:** WebP (squoosh.app pe convert karo)
- **Quality:** 85%
- **Har photo 200KB se chhoti honi chahiye**
- **Source:** Khud camera se lo, ya pexels.com / unsplash.com se royalty-free download karo — phir local WebP banao

### Kahan rakhni hai:
```
public/Images/hero/himalayan-sunrise.webp
public/Images/hero/valley-forest.webp
public/Images/hero/alpine-ridge.webp
```
Agar `public/Images/hero/` folder nahi hai toh pehle banao.

✅ **3 photos banao, folder mein daalo. Bas. Coding agent karega.**

---

## 🔴 KAAM 2: 5 Teacher (Facilitator) Photos

**Kahan dikhenge:** `/facilitators` page pe — jahan sab teachers ki listing hai. Aur individual
profile pages pe bhi (jaise `/facilitators/arjun-mehta`).

### 5 photos chahiye — inn logon ki:

| # | Naam | File ka naam |
|---|------|-------------|
| 1 | Arjun Mehta | `arjun-mehta.webp` |
| 2 | Kavya Sharma | `kavya-sharma.webp` |
| 3 | Nidhi Rawat | `nidhi-rawat.webp` |
| 4 | Tenzin Dorje | `tenzin-dorje.webp` |
| 5 | Sunaina Bhat | `sunaina-bhat.webp` |

### Photo kaise honi chahiye:
- **Style:** Face clearly dikhna chahiye, shoulders tak — professional lekin friendly (stiff passport photo nahi)
- **Size:** 400 x 400 pixels (square — barabar height aur width)
- **Format:** WebP
- **Background:** Simple — outdoors ya plain color
- **Har photo 50KB se chhoti honi chahiye**

### Kahan rakhni hai:
```
public/Images/facilitators/arjun-mehta.webp
public/Images/facilitators/kavya-sharma.webp
public/Images/facilitators/nidhi-rawat.webp
public/Images/facilitators/tenzin-dorje.webp
public/Images/facilitators/sunaina-bhat.webp
```

✅ **5 photos banao, folder mein daalo. Bas. Coding agent karega.**

---

## 🟡 KAAM 3: 37 Blog Post Photos

**Kahan dikhenge:** Har blog post ke upar ek featured image dikhti hai. Abhi sab mein same generic
mountain/trek photos lag rahe hain. Har blog ko apni alag photo chahiye jo uske topic se match kare.

### Photo kaise honi chahiye:
- **Size:** 800 x 450 pixels (horizontal/landscape)
- **Format:** WebP
- **Quality:** 80%
- **Har photo 100KB se chhoti**
- Photo blog ke topic se related honi chahiye (neeche suggestions di hain)

### Kahan rakhni hai:
```
public/Images/blog/[blog-ka-naam].webp
```

### FULL LIST — 37 Photos (naam + kaise photo honi chahiye):

**Location wale blogs (12 photos):**

| # | File naam | Photo kaise honi chahiye |
|---|----------|------------------------|
| 1 | `best-time-for-retreat-in-chakrata.webp` | Chakrata ka seasonal view — autumn ya spring |
| 2 | `best-time-for-retreat-in-munsiyari.webp` | Munsiyari ka seasonal view — mountains + green |
| 3 | `best-time-for-retreat-in-rishikesh.webp` | Rishikesh ka Ganga + mountain view |
| 4 | `best-time-for-retreat-in-sankri.webp` | Sankri village ka seasonal photo |
| 5 | `how-to-reach-chakrata-for-a-retreat.webp` | Chakrata ki road/route — winding mountain road |
| 6 | `how-to-reach-munsiyari-for-a-retreat.webp` | Munsiyari ki road — mountain highway |
| 7 | `how-to-reach-rishikesh-for-a-retreat.webp` | Rishikesh bridge ya road |
| 8 | `how-to-reach-sankri-for-a-retreat.webp` | Sankri ki road — jeep trail through mountains |
| 9 | `is-chakrata-good-for-a-retreat.webp` | Chakrata overview — peaceful town + mountains |
| 10 | `is-munsiyari-good-for-a-retreat.webp` | Munsiyari overview — Panchachuli peaks |
| 11 | `is-rishikesh-good-for-a-retreat.webp` | Rishikesh overview — yoga by Ganga |
| 12 | `is-sankri-good-for-a-retreat.webp` | Sankri overview — quiet village setting |

**Comparison wale blogs (4 photos):**

| # | File naam | Photo kaise honi chahiye |
|---|----------|------------------------|
| 13 | `chakrata-vs-mussoorie-weekend-trip.webp` | Split view — Chakrata ek taraf, Mussoorie dusri taraf |
| 14 | `chakrata-vs-rishikesh-for-a-retreat.webp` | Split view — Chakrata vs Rishikesh |
| 15 | `chakrata-vs-sankri.webp` | Split view — Chakrata vs Sankri |
| 16 | `sankri-vs-munsiyari-retreat.webp` | Split view — Sankri vs Munsiyari |

**Trek wale blogs (4 photos):**

| # | File naam | Photo kaise honi chahiye |
|---|----------|------------------------|
| 17 | `kedarkantha-vs-har-ki-dun.webp` | Dono treks ki side-by-side mountain photos |
| 18 | `best-snow-treks-garhwal-himalaya.webp` | Snow-covered Himalayan peaks/trail |
| 19 | `high-altitude-treks-garhwal-above-4000m.webp` | High altitude mountain view — dramatic |
| 20 | `beginner-to-advanced-trek-progression-garhwal.webp` | Easy trail → hard trail visual |

**Retreat decision wale blogs (5 photos):**

| # | File naam | Photo kaise honi chahiye |
|---|----------|------------------------|
| 21 | `3-day-vs-5-day-himalayan-retreat.webp` | Calendar/schedule type visual, nature background |
| 22 | `how-much-does-a-himalayan-retreat-cost.webp` | Peaceful retreat setting — value for money feeling |
| 23 | `is-weekend-retreat-worth-it.webp` | Weekend getaway — Friday se Sunday vibe |
| 24 | `retreat-vs-trek-which-is-right-for-you.webp` | Meditation vs hiking split visual |
| 25 | `trek-vs-retreat.webp` | Adventure (trekking) vs peace (meditation) |

**Art retreat wale blogs (8 photos):**

| # | File naam | Photo kaise honi chahiye |
|---|----------|------------------------|
| 26 | `art-and-yoga-retreat-himalayas.webp` | Art supplies + yoga mat in mountain setting |
| 27 | `art-retreat-for-beginners.webp` | Beginner painting — simple, welcoming |
| 28 | `art-retreat-packing-list.webp` | Art supplies flat lay — paints, brushes, sketchbook |
| 29 | `art-retreat-vs-art-class.webp` | Nature studio vs indoor classroom |
| 30 | `art-therapy-vs-art-retreat.webp` | Therapeutic art — calming, meditative painting |
| 31 | `can-a-retreat-unblock-creativity.webp` | Inspiration visual — sunrise + blank canvas |
| 32 | `what-to-expect-at-an-art-retreat.webp` | Art retreat day — people painting outdoors |
| 33 | `why-art-retreats-work.webp` | Finished art in nature — transformation |

**Other blogs (4 photos):**

| # | File naam | Photo kaise honi chahiye |
|---|----------|------------------------|
| 34 | `best-himalayan-locations-for-art-retreat.webp` | Multiple Himalayan locations collage/panorama |
| 35 | `how-nature-inspires-creative-practice.webp` | Close-up nature textures — leaves, water, stone |
| 36 | `painting-in-the-himalayas.webp` | Someone painting with mountain view |
| 37 | `why-digital-detox-works-in-the-himalayas.webp` | Phone-free nature — mountains, no gadgets |

✅ **37 photos banao, `public/Images/blog/` mein daalo. Bas. Coding agent karega.**

---

## 🟡 KAAM 4: 9 Home Page Icons

**Kahan dikhenge:** Home page pe 3 sections hain jahan sirf text hai, icons lagane hain:
- "The Philosophy" (3 cards numbered 01, 02, 03)
- "How It Works" (3 steps)
- "Our Promise" (3 promise items)

### 9 icons chahiye:

**Philosophy ke 3 icons:**

| # | Kaunsa card | Icon kaise hona chahiye | File naam |
|---|------------|------------------------|-----------|
| 1 | 01 card | Compass ya direction arrow (journey) | `philosophy-compass.svg` |
| 2 | 02 card | Mountain ya leaf (nature) | `philosophy-mountain.svg` |
| 3 | 03 card | Silence/shh symbol (stillness) | `philosophy-silence.svg` |

**How It Works ke 3 icons:**

| # | Step | Icon kaise hona chahiye | File naam |
|---|------|------------------------|-----------|
| 4 | Step 1 | Calendar ya selection icon (choose retreat) | `step-choose.svg` |
| 5 | Step 2 | Open arms ya welcome icon (arrive) | `step-arrive.svg` |
| 6 | Step 3 | Butterfly ya sunrise icon (transformation) | `step-transform.svg` |

**Our Promise ke 3 icons:**

| # | Promise | Icon kaise hona chahiye | File naam |
|---|---------|------------------------|-----------|
| 7 | Small groups | Group of people icon | `promise-group.svg` |
| 8 | Real practitioners | Badge/verified checkmark | `promise-verified.svg` |
| 9 | No gimmicks | Honest/grounded — handshake ya anchor | `promise-honest.svg` |

### Icon rules:
- **Size:** 48 x 48 pixels
- **Format:** SVG (best) — ya PNG agar SVG nahi bana sakte
- **Style:** Simple line-art (patli lines), ek hi rang — **teal green (#0f766e)** ya **grey**
- **Har icon 10KB se chhota**
- **Source:** flaticon.com, iconmonstr.com, ya Figma mein khud banao

### Kahan rakhni hai:
```
public/Images/icons/philosophy-compass.svg
public/Images/icons/philosophy-mountain.svg
public/Images/icons/philosophy-silence.svg
public/Images/icons/step-choose.svg
public/Images/icons/step-arrive.svg
public/Images/icons/step-transform.svg
public/Images/icons/promise-group.svg
public/Images/icons/promise-verified.svg
public/Images/icons/promise-honest.svg
```

✅ **9 icons banao, `public/Images/icons/` mein daalo. Bas. Coding agent karega.**

---

## 🟡 KAAM 5: 4 Topic Category Icons

**Kahan dikhenge:** `/topics` page pe — jahan 4 topic categories ki listing hai. Har category ke
card mein ek icon chahiye taaki visually alag dikhe.

### 4 icons chahiye:

| # | Category | Icon kaise hona chahiye | File naam |
|---|----------|------------------------|-----------|
| 1 | Location Authority | Map pin ya compass | `topic-location.svg` |
| 2 | Retreat Decision | Weighing scale ya comparison arrows | `topic-retreat.svg` |
| 3 | Trek Decision | Hiking boot ya mountain trail | `topic-trek.svg` |
| 4 | Lifestyle | Sunrise ya mountain silhouette | `topic-lifestyle.svg` |

### Icon rules (same as KAAM 4):
- 48 x 48 pixels, SVG, line-art, single color, < 10KB

### Kahan rakhni hai:
```
public/Images/icons/topic-location.svg
public/Images/icons/topic-retreat.svg
public/Images/icons/topic-trek.svg
public/Images/icons/topic-lifestyle.svg
```

✅ **4 icons banao, folder mein daalo. Bas.**

---

## 🟢 KAAM 6: 32 Trek Day-by-Day Photos

**Kahan dikhenge:** Jab koi ek trek ka detail page kholega (jaise Kedarkantha trek), toh wahan
day-wise schedule dikhta hai — "Day 1: base camp", "Day 2: forest trail" wagairah. Har day ke
saath ek photo lagani hai.

### Kitni photos per trek:

| Trek | Kitne Din | Kitne Photos | Folder |
|------|----------|-------------|--------|
| Kedarkantha | 5 days | 5 | `public/Images/trek/itinerary/kedarkantha/` |
| Brahmatal | 4 days | 4 | `public/Images/trek/itinerary/brahmatal/` |
| Har Ki Dun | 5 days | 5 | `public/Images/trek/itinerary/har-ki-dun/` |
| Kuari Pass | 5 days | 5 | `public/Images/trek/itinerary/kuari-pass/` |
| Roopkund | 7 days | 7 | `public/Images/trek/itinerary/roopkund/` |
| Pangarchulla | 6 days | 6 | `public/Images/trek/itinerary/pangarchulla/` |

### Photo kaise honi chahiye:
Har photo us din ki trek se match honi chahiye:
- **Day 1** usually: base camp, gaadi se utarna, starting village
- **Middle days:** jungle trail, river crossing, campsite at night, snow mein chalna
- **Last day:** summit/peak ya wapas aana

### Photo rules:
- **Size:** 800 x 500 pixels (horizontal)
- **Format:** WebP, quality 80%
- **Har photo 100KB se chhoti**

### File naming:
```
public/Images/trek/itinerary/kedarkantha/day1.webp
public/Images/trek/itinerary/kedarkantha/day2.webp
public/Images/trek/itinerary/kedarkantha/day3.webp
public/Images/trek/itinerary/kedarkantha/day4.webp
public/Images/trek/itinerary/kedarkantha/day5.webp

public/Images/trek/itinerary/brahmatal/day1.webp
public/Images/trek/itinerary/brahmatal/day2.webp
public/Images/trek/itinerary/brahmatal/day3.webp
public/Images/trek/itinerary/brahmatal/day4.webp

public/Images/trek/itinerary/har-ki-dun/day1.webp
... (day1 se day5 tak)

public/Images/trek/itinerary/kuari-pass/day1.webp
... (day1 se day5 tak)

public/Images/trek/itinerary/roopkund/day1.webp
... (day1 se day7 tak)

public/Images/trek/itinerary/pangarchulla/day1.webp
... (day1 se day6 tak)
```

✅ **32 photos banao, sahi folders mein daalo. Bas.**

---

## 🟢 KAAM 7: 1 Team Photo (Contact Page)

**Kahan dikhega:** `/contact` page pe "Who You'll Speak To" section mein.

### Photo kaise honi chahiye:
- Team members saath mein — kaam karte hue ya Himalayan setting mein
- **Professional but natural** — corporate stiff photo nahi, warm feeling
- **Size:** 600 x 400 pixels (horizontal)
- **Format:** WebP, quality 80%
- **100KB se chhoti**

### Kahan rakhni hai:
```
public/Images/people/team.webp
```

✅ **1 photo banao, folder mein daalo. Bas.**

---

## ⚠️ ZAROORI RULES — HAMESHA FOLLOW KARO

| Rule | Sahi ✅ | Galat ❌ |
|------|--------|---------|
| File format | `.webp` (photos), `.svg` (icons) | `.jpg`, `.png`, `.jpeg` (heavy hain) |
| File naam | `valley-forest.webp` (chhota, hyphens) | `Valley Forest.webp` (spaces, capitals) |
| Folder | `public/Images/` ke andar | Kisi aur jagah mat rakho |
| Photo size | Hero: < 200KB, Cards: < 100KB, Icons: < 10KB | 1MB+ ki file kabhi nahi |
| Dimensions | Exact size follow karo jo upar likhi hai | Andaze se mat karo |
| Compress | squoosh.app pe karo (free hai) | Bina compress baad mein slow hoga |

---

## 🧪 CHECK KAISE KARO — Photo Daalke Kaam Ho Gaya Ya Nahi

Jab bhi photos daal do folder mein, yeh check karo:

1. **File sahi jagah hai?**
   Folder kholo aur dekho — file dikhni chahiye

2. **File ka naam sahi hai?**
   Chhota naam, hyphens, `.webp` extension — jo upar likha hai exactly wahi

3. **File ka size theek hai?**
   Right-click → Properties → 200KB se chhoti honi chahiye (hero photos)

4. **Batao ki photos ready hain**
   Jab sab photos daal do, toh batao — phir coding ka kaam agent kar dega

---

## ✅ SUMMARY

```
Tumhara kaam:
  → Photos/icons banao ya download karo
  → Sahi size mein karo (squoosh.app se)
  → Sahi folder mein daal do
  → DONE. Coding mat karo.

Total: ~91 images

Kahan se shuru karo:
  1. Pehle KAAM 1 ke 3 hero photos banao (10 min ka kaam)
  2. Phir KAAM 2 ke 5 facilitator photos banao
  3. Baaki baad mein

Photos ready hone ke baad batao — code ka kaam agent karega.
```
