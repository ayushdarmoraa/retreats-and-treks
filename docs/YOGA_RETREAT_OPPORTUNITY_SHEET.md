# Yoga Retreat Opportunity Sheet

## Scope and current status

Audit scope follows the approved Yoga work-division and master-prompt requirements: the Yoga hub, location and duration pages, teacher-training page, comparison routes, conversion paths, SEO, responsive behavior, and evidence-backed content.

The route/runtime baseline was checked on the separate `grp/main` and `sir/main` integration targets before the publication correction below. Each target retains its own Yoga history; this sheet records shared findings and does not imply the implementations are identical.

## Route baseline

All 11 required Yoga routes returned HTTP 200 in isolated production builds:

| Route | Baseline |
|---|---|
| `/yoga-retreats` | HTTP 200 |
| `/retreats/yoga-retreat-rishikesh` | HTTP 200 |
| `/retreats/yoga-retreat-uttarakhand` | HTTP 200 |
| `/retreats/chakrata/yoga-retreat` | HTTP 200 |
| `/retreats/sankri/yoga-retreat` | HTTP 200 |
| `/yoga-retreat-zanskar` | HTTP 200 |
| `/5-day-yoga-retreat` | HTTP 200 |
| `/7-day-yoga-retreat` | HTTP 200 |
| `/10-day-yoga-retreat` | HTTP 200 |
| `/retreats/journeys/yoga-and-movement` | HTTP 200 |
| `/yoga-teacher-training` | HTTP 200 |

The prior browser baseline found one H1 and a canonical URL on each route, parseable JSON-LD, all 11 routes in the sitemap, no broken loaded images, and no horizontal overflow at 1365×900 or 390×844. These checks do not constitute a complete visual or accessibility audit.

## Evidence-backed opportunities and action

### Teacher Training publication state — corrected in this change

`config/retreatProgramEvents.ts` sets `YOGA_TTC_PRODUCT.publicationState` to `unpublished`, while the previous page, comparison card, and sitemap publicly exposed a 28-day duration, ₹49,999 fee, curriculum/certificate, accommodation, and indexable/sitemap placement.

The correction uses that registry state as the publication gate:

- The TTC page keeps its canonical route but serves a neutral unpublished notice, suppresses programme claims and product structured data, and sets `noindex,follow`.
- The TTC comparison no longer advertises unpublished duration, fee, curriculum, certificate, accommodation, or enquiry details.
- The TTC URL is omitted from the sitemap until its state is `published`.
- A focused regression test covers the page, comparison, metadata, and sitemap behavior.

Publishing the product later requires authorized, current evidence for its programme, pricing, venue/arrangements, dates, and any certification claims before changing its registry state.

### Images and usage rights — unresolved

No authoritative commercial-use rights or provenance evidence for Yoga imagery was established in this audit. Do not add, replace, or claim rights for imagery without that evidence. Image-rights review remains blocked.

### Conversion persistence — environment-limited

The isolated environments did not have `.env.local`; `/api/track` returned HTTP 503 and explicitly reported `durable: false`. Live durable analytics persistence is not verified. No production database or customer lead was used.

### Accessibility and interaction coverage — incomplete

Responsive overflow and basic rendered-page checks passed in the prior baseline. Keyboard/focus behavior, contrast, and a complete assistive-technology review were not run. One Yoga hub CTA opened its form in the `sir` target without submission; the corresponding `grp` CTA interaction was not successfully completed. Do not mark full CTA/browser accessibility acceptance complete.

## Prior validation evidence

The previous isolated-target run reported:

- TypeScript passed on both targets.
- Full tests passed: 152 on `grp`, 156 on `sir`.
- Focused Yoga ESLint had no errors: 14 warnings on `grp`, 17 on `sir`.
- Schema and link audits passed.
- Production builds passed with 427 static pages; Edge-runtime and stale Browserslist warnings remained.
- The full-repository ESLint command failed on both targets with 287 errors (366 warnings on `grp`, 370 on `sir`). No repository CI lint gate was found. These are not reported as Yoga-only regressions or as a passing full lint result.

The TTC publication change requires the focused regression test and affected build/type/lint checks to be rerun on each target before integration.

## Completion assessment

The route and basic runtime baseline is present, but the Yoga workstream is **not 100% complete**. Image-rights evidence, keyboard/focus and contrast review, durable analytics verification, and a successful `grp` CTA interaction remain outstanding. Full repository ESLint also remains failing on pre-existing unrelated errors.
