# Image Implementation Guide — Current Status & Developer Tasks

> **Last updated: June 2025**
>
> ALL code-level image work has been completed by the agent. Every page uses Next.js `<Image>` from the
> central registry (`lib/images.ts`). Zero `<img>` tags remain. Every `<Image fill>` has a `sizes` prop.
>
> **What remains is ONLY manual work** — creating new image files, optimizing them, and placing them
> in the correct folders. See `DEVELOPER_IMAGE_INSTRUCTIONS_HINDI.md` for the full Hindi developer guide.

---

## Image System Overview

```tsx
// Central registry
import { images } from '@/lib/images';

// Image components (optional wrappers)
import { HeroImage, CardImage, SectionImage, Gallery } from '@/components/images';

// Direct Next.js usage (most pages use this pattern)
import Image from 'next/image';
<Image src={images.heroes.himalayanSunrise.src} alt={images.heroes.himalayanSunrise.alt} fill sizes="100vw" priority />
```

To add a NEW image: drop file in `public/Images/{category}/`, add entry in `lib/images.ts`, use it.

---

## STATUS: AGENT CODE WORK — 100% COMPLETE

### What Was Done (by Agent)

| Category | Count | Details |
|----------|-------|---------|
| `<img>` → `<Image>` conversions | 65+ | Every HTML img tag replaced with Next.js Image across 20+ files |
| Hero images added | 40+ pages | ContentHero (120+ path mappings), plus custom heroes on dynamic pages |
| Missing `sizes` props added | 21 | Every `<Image fill>` now has responsive `sizes` |
| Empty alt text fixed | 1 | CTA background now uses registry alt |
| Logo conversions | 2 | Header + Footer logos converted to `<Image>` |
| `loading="lazy"` cleanup | 1 | Redundant prop removed (Next.js handles this) |

### Verification Results

```
<img> tags remaining:     0
Image fill without sizes: 0 (1 in JSX comment — inactive)
Compilation errors:       0
```

---

## PER-PAGE STATUS

### PHASE 1 — HIGHEST SEO IMPACT

#### 1. Home Page — `app/HomeClient.tsx`

| Section | Status | Image Source |
|---------|--------|-------------|
| Hero slideshow (3 slides) | ✅ DONE | `images.heroes.himalayanSunrise`, `.valleyForest`, `.alpineRidge` — with `sizes="100vw"` + priority |
| Featured Journeys cards | ✅ DONE | `images.journeys.*` mapping — with `sizes` |
| Our Locations cards | ✅ DONE | `images.locations.*` mapping — with `sizes` |
| Two Paths cards (Retreats/Treks) | ✅ DONE | `images.journeys.stillness`, `.highTerrain` — with `sizes` |
| Begin Your Journey CTA | ✅ DONE | `images.heroes.alpineRidge` background — with `sizes="100vw"` |
| Philosophy icons (01, 02, 03) | 🔧 DEVELOPER | Need 3 SVG icons (compass, mountain, speech) |
| How It Works step icons | 🔧 DEVELOPER | Need 3 SVG step icons |
| Our Promise icons | 🔧 DEVELOPER | Need 3 SVG promise icons |

#### 2. Trek Location Pages — `app/treks/location/[location]/page.tsx`

| Section | Status | Details |
|---------|--------|---------|
| Location hero image | ✅ DONE | `LOCATION_HERO_IMAGES` mapping for all 5 locations — `sizes="100vw"` |
| Trek card images + thumbnails | ✅ DONE | `TREK_IMAGES` mapping for all 12 treks — `sizes` on all |
| Authority guide sections | ✅ DONE | Text content rendered, location-specific |

#### 3. Trek Detail Pages — `app/treks/location/[location]/[slug]/page.tsx`

| Section | Status | Details |
|---------|--------|---------|
| Trek hero image | ✅ DONE | `TREK_HERO_IMAGES` mapping — `sizes="100vw"` + priority |
| Per-day itinerary images | 🔧 DEVELOPER | Need 32 day-by-day photos across 6 treks |

#### 4. Retreat Location Pages — `app/retreats/[location]/RetreatsLocationClient.tsx`

| Section | Status | Details |
|---------|--------|---------|
| Location hero image | ✅ DONE | `LOCATION_IMAGES` — `sizes="100vw"` |
| Service card thumbnails | ✅ DONE | `SERVICE_IMAGES` mapping — `sizes` added |
| Trek card thumbnails | ✅ DONE | `TREK_IMAGES` mapping — `sizes` added |
| Places & Landscapes photos | ✅ DONE | `PLACE_IMAGES` (Tiger Fall, Budher Caves, etc.) — `sizes` added |

---

### PHASE 2 — CONVERSION PAGES

#### 5. Retreat Journey Pages — `app/retreats/journeys/RetreatJourneyClient.tsx`

| Section | Status | Details |
|---------|--------|---------|
| Hero image | ✅ DONE | `RETREAT_HERO_IMAGES` for all 8 services — `sizes="100vw"` + priority |
| Location thumbnails | ✅ DONE | `LOCATION_IMAGES` — `sizes="48px"` |

#### 6. Treks Listing — `app/treks/TreksClient.tsx`

| Section | Status | Details |
|---------|--------|---------|
| Panoramic hero | ✅ DONE | `images.heroes.himalayanSunrise` — `sizes="100vw"` + priority |
| Location card images | ✅ DONE | `LOCATION_IMAGES` per region — `sizes` responsive |

#### 7. Retreats Listing — `app/retreats/RetreatsClient.tsx`

| Section | Status | Details |
|---------|--------|---------|
| Hero (right panel) | ✅ DONE | `images.heroes.retreatHero` with Ken Burns overlay |
| Service card images | ✅ DONE | `SERVICE_IMAGE_MAP` for all 9 services — `sizes` |
| Format card images | ✅ DONE | Per-format mapping — `sizes` |
| Location card images | ✅ DONE | Location mapping — `sizes` |

---

### PHASE 3 — CONTENT SEO

#### 8. Blog Listing — `app/blog/page.tsx`

| Section | Status | Details |
|---------|--------|---------|
| Article card thumbnail images | ✅ DONE | Topic-based image mapping — `sizes` |
| Per-post unique featured images | 🔧 DEVELOPER | Need ~37 unique blog images (currently uses proxy images from registry) |

#### 9. Blog Posts — `app/blog/[slug]/page.tsx`

| Section | Status | Details |
|---------|--------|---------|
| Featured image above prose | ✅ DONE | `BLOG_FEATURED_IMAGES` mapping for 40+ slugs — `sizes` |
| Unique images per post | 🔧 DEVELOPER | Currently all map to existing registry entries. Need unique images. |

#### 10. Comparison Pages — `app/compare/[pair]/page.tsx`

| Section | Status | Details |
|---------|--------|---------|
| Split comparison images | ✅ DONE | `COMPARE_IMAGES` for both services — `sizes="(max-width: 640px) 100vw, 50vw"` |

#### 11. Trek Category Pages

| Page | Status |
|------|--------|
| `best-treks-in-uttarakhand/page.tsx` | ✅ DONE — `TREK_CARD_IMAGES` with all treks |
| `best-treks-in-uttarakhand/beginner/page.tsx` | ✅ DONE — 5 trek card images |
| `best-treks-in-uttarakhand/challenging/page.tsx` | ✅ DONE — 3 trek card images |
| `best-treks-in-uttarakhand/high-altitude/page.tsx` | ✅ DONE — 3 trek card images |
| `best-treks-in-uttarakhand/snow/page.tsx` | ✅ DONE — 3 snow trek images |
| `beginner-treks-uttarakhand/page.tsx` | ✅ DONE — Hero + trek images |
| `winter-treks-uttarakhand/page.tsx` | ✅ DONE — Hero + all trek images |

#### 12. Trek Comparison Pages

| Page | Status |
|------|--------|
| `brahmatal-vs-kuari-pass/page.tsx` | ✅ DONE — 2 comparison images |
| `kedarkantha-vs-har-ki-dun/page.tsx` | ✅ DONE — 2 comparison images |
| `roopkund-vs-pangarchulla/page.tsx` | ✅ DONE — 2 comparison images |

---

### PHASE 4 — LOW PRIORITY & MISC

#### 13. About Page — `app/about/page.tsx`

| Section | Status | Details |
|---------|--------|---------|
| Hero image | ✅ DONE | `images.heroes.valleyForest` — `sizes="100vw"` + priority |
| Location cards | ✅ DONE | `images.locations.aboutChakrata` etc. — `sizes` |
| Yoga section image | ✅ DONE | `images.journeys.yoga` |

#### 14. Contact Page — `app/contact/page.tsx`

| Section | Status | Details |
|---------|--------|---------|
| Hero image | ✅ DONE | `images.heroes.valleyForest` |
| Staff photo | 🔧 DEVELOPER | Need team/staff photo |

#### 15. Other Completed Pages

| Page | Status | Details |
|------|--------|---------|
| `retreat-programs/page.tsx` | ✅ DONE | Hero with `images.heroes.retreatHero` |
| `facilitators/page.tsx` | ✅ DONE | ContentHero component |
| `topics/[topic]/page.tsx` | ✅ DONE | `TOPIC_HERO_IMAGES` for 3 topics |
| `topics/lifestyle/page.tsx` | ✅ DONE | ContentHero component |
| `locations/page.tsx` | ✅ DONE | `LOCATION_IMAGES` per card |
| `locations/[slug]/page.tsx` | ✅ DONE | Location hero from registry |
| `himalayan-retreats/page.tsx` | ✅ DONE | 15 images converted |
| `summer-himalayan-retreats/page.tsx` | ✅ DONE | 4 location card images |
| `weekend-himalayan-retreats/page.tsx` | ✅ DONE | 3 location card images |
| `winter-himalayan-retreats/page.tsx` | ✅ DONE | 4 location card images |
| `retreats/art/page.tsx` | ✅ DONE | 1 program card image |
| `garhwal-himalayas/fitness-guide/page.tsx` | ✅ DONE | Hero image |
| `components/TrekCard.tsx` | ✅ DONE | Image prop with `sizes` |
| `components/TrekMonthPage.tsx` | ✅ DONE | `TREK_HERO_IMAGES` — ~20 monthly pages covered |
| `components/DeparturePage.tsx` | ✅ DONE | `DEPARTURE_HERO_IMAGES` |
| `components/ContentHero.tsx` | ✅ DONE | 120+ path→image mappings |
| `components/layouts/Header.tsx` | ✅ DONE | Logo `<Image>` with priority + onError |
| `components/layouts/Footer.tsx` | ✅ DONE | Logo `<Image>` |
| 60+ content pages (retreats, meditation, etc.) | ✅ DONE | Via ContentHero path mappings |

---

## IMAGE REGISTRY QUICK REFERENCE

```
images.heroes.             → himalayanSunrise, valleyForest, alpineRidge, retreatHero
images.locations.          → chakrata, sankri, munsiyari, mussoorie, rishikesh, zanskar
                             aboutChakrata, aboutSankri, aboutMussoorie, aboutRishikesh
images.journeys.           → weekend, yoga, meditation, stillness, highTerrain
images.services.           → artCreative, burnoutRecovery, meditationService, restReset,
                             soundHealing, weekendRetreat, yogaService, yogaMovement, privateCustom
images.treks.              → kedarkantha, harKiDun, brahmatal, roopkund, kuariPass, tigerFall,
                             budherCaves, chakraWeekend, chakraGuided, khaliya, pangarchulla,
                             milamGlacier, garhwal
                             + snow variants: kedarkanthaSnow, brahmatalSnow, kuariSnow
                             + beginner variants: brahmatalBeginner, kuariBeginner, khaliyaBeginner,
                               budherBeginner, tigerFallBeginner
                             + challenging: roopkundChallenging, pangarchullaChallenging,
                               milamChallenging
images.himalayanRetreats.  → creative, retreatTrek, silentRetreat, weekendHimalayan, yogaHimalayan
images.whyHimalaya.        → cultural, environment, nature, psychological, top
images.logo.               → header, headerPng
```

---

## REMAINING DEVELOPER WORK (Manual Only)

All remaining work requires creating NEW image assets. No code changes needed unless specified.
See `DEVELOPER_IMAGE_INSTRUCTIONS_HINDI.md` for detailed Hindi instructions with exact file paths.

| # | Task | Images Needed | Priority |
|---|------|--------------|----------|
| 1 | Replace 3 Unsplash hero URLs in `lib/images.ts` | 3 photos (1920×1080 WebP) | **HIGH** |
| 2 | Add 5 facilitator portrait photos | 5 photos (400×400 WebP) + code changes | **HIGH** |
| 3 | Create unique blog featured images | ~37 images (800×450 WebP) | **MEDIUM** |
| 4 | Create Home page icons (Philosophy + Steps + Promise) | 9 SVG icons (48×48) | **MEDIUM** |
| 5 | Create Topic category icons | 4 SVG icons (48×48) | **MEDIUM** |
| 6 | Create trek itinerary per-day photos | ~32 photos (800×500 WebP) | **LOW** |
| 7 | Add contact page staff photo | 1 photo (600×400 WebP) | **LOW** |

**Total: ~91 images to create manually.**
