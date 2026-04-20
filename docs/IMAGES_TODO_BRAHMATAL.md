# Brahmatal Page — Image Sourcing Checklist

The 2026-Q2 Brahmatal rebuild is live using only images already in the repo. For maximum SEO and conversion impact, replace the images below with higher-quality originals (or reshoot during the next Brahmatal departure).

## Current usage (works, but reusing generic hero stills)

| Slot | Current path | Status |
|------|--------------|--------|
| Hero image | `/public/Images/trek/region/brahmatal-lake.webp` | Brahmatal-specific. Keep if resolution ≥ 1920×1080. |
| Gallery 1–4 | `/public/Images/trek/itinerary/brahmatal/day{1-4}.webp` | Brahmatal-specific. Good. |
| Gallery 5 | `/public/Images/hero/alpine-ridge.webp` | **Generic** — reshoot with Brahmatal ridge if possible. |
| Gallery 6 | `/public/Images/hero/himalayan-sunrise.webp` | **Generic** — replace with Brahmatal sunrise. |
| Cinematic moment | `/public/Images/trek/region/sunrise_ridge.png` | Generic sunrise. Replace if you have a Brahmatal-specific sunrise shot. |

## Ideal replacements to capture on the next departure

For each slot below, the filename is the target path. Save webp at 85 quality, 1920px wide max for hero, 1200px wide for gallery.

### 1. Hero (LCP image — most important)
- **Path:** `/public/Images/trek/hero/brahmatal-hero.webp`
- **Shot:** Wide-angle of the frozen Brahmatal lake from the summit ridge, with Trishul/Nanda Ghunti visible in the background. Golden-hour or blue-hour.
- **Alt text:** `Frozen Brahmatal Lake at 3,850m in winter with Trishul and Nanda Ghunti peaks in the Garhwal Himalayas`
- **Dimensions:** 1920×1080 (16:9) minimum.

### 2–7. Experience gallery
All 4:3 aspect, 1200×900, saved as webp 85 quality.

| Filename | Scene |
|----------|-------|
| `/Images/trek/brahmatal/forest-corridor.webp` | Oak + rhododendron snow corridor Day 1 |
| `/Images/trek/brahmatal/bekaltal-camp.webp` | Camp at Bekaltal at dawn |
| `/Images/trek/brahmatal/meadow-climb.webp` | Snow meadow climb on Day 2 |
| `/Images/trek/brahmatal/summit-ridge.webp` | Ridge walk with Trishul/Nanda Ghunti backdrop |
| `/Images/trek/brahmatal/frozen-lake.webp` | Trekker standing on frozen Brahmatal lake |
| `/Images/trek/brahmatal/starfield-camp.webp` | Tents under Milky Way |

### 8. Cinematic mid-page
- **Path:** `/public/Images/trek/brahmatal/cinematic-sunrise.webp`
- **Shot:** Sunrise hitting Trishul/Nanda Ghunti from the summit ridge, silhouette of a trekker optional.
- **Alt text:** `Sunrise on Brahmatal summit ridge with Trishul and Nanda Ghunti in the Garhwal Himalayas`
- **Dimensions:** 2400×1350 (cinematic).

## After sourcing — update these fields

In `content/treks/lohajung/brahmatal-trek.ts`:

- `heroImage` → new hero path
- `experienceGallery[].src` → 6 new gallery paths
- `cinematicMoment.image` → new cinematic path

No code changes needed — the page will pick up new images automatically on rebuild.

## Alt-text conventions for SEO

Every image alt must include at least two of:
- `Brahmatal trek` / `Brahmatal lake`
- altitude (`3,850m`)
- location (`Lohajung`, `Garhwal Himalayas`, `Uttarakhand`)
- condition (`snow`, `winter`, `frozen`, `sunrise`)

Avoid alt spam like `brahmatal trek brahmatal lake brahmatal frozen lake` — Google penalises keyword-stuffed alt text.

## Lighthouse targets after image replacement

- LCP: < 2.5s (hero must be ≤ 180 KB after webp compression)
- CLS: 0 (next/image handles this automatically with `fill`)
- Total image weight on page: ≤ 1.5 MB
