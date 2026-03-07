# Repository Structural Analysis — Chakrata Retreats

> Technical onboarding document for frontend developers.
> Generated from a complete codebase audit.

---

## 1. Framework & Runtime

| Property | Value |
|---|---|
| **Framework** | Next.js 16.1.6 (App Router) |
| **React** | 19.2.3 |
| **Language** | TypeScript 5.x (strict mode) |
| **Package manager** | pnpm 10.17.1 |
| **Node target** | ES2017 |
| **Deployment** | Vercel (static export, `force-static` on all routes) |
| **Module resolution** | `bundler` |
| **Path alias** | `@/*` → project root |

### Key Runtime Constraints

- **All pages are statically generated** — `export const dynamic = 'force-static'` and `dynamicParams = false` on generated routes.
- **`params` is a Promise** — Next.js 16 breaking change: always `await params` in `generateMetadata` and page components.
- **322 static pages** at last build.
- **No ISR / no SSR** — the site is a full static export with API routes for form submission and telemetry.

### Dependencies (Production)

| Package | Purpose |
|---|---|
| `next` 16.1.6 | Framework |
| `react` / `react-dom` 19.2.3 | UI |
| `@neondatabase/serverless` ^1.0.2 | Postgres (Neon) — serverless HTTP driver |
| `resend` ^6.9.3 | Transactional email |
| `react-markdown` ^10.1.0 | Markdown rendering in blog posts |
| `zod` ^4.3.6 | Runtime schema validation (API inputs) |

### Dev Dependencies

| Package | Purpose |
|---|---|
| `tailwindcss` ^4 / `@tailwindcss/postcss` ^4 | CSS framework (PostCSS plugin) |
| `eslint` ^9 / `eslint-config-next` 16.1.6 | Linting (core-web-vitals + TypeScript rules) |
| `typescript` ^5 | Type checking |

### Styling Approach

**Hybrid**: The project uses both **Tailwind CSS 4** (via PostCSS plugin) and **inline React styles** (`style={{ }}`). Most components use inline styles extensively. Tailwind classes appear in `globals.css`, the error boundary, and the root `<body>` element. CSS custom properties are defined in `globals.css` under `:root`:

```
--color-primary: #0f766e   (calm nature green)
--color-border: #e5e7eb
--color-muted: #555555
--space-xs/sm/md/lg/xl     (0.5rem → 3rem)
--radius-sm/md              (6px / 10px)
```

### Fonts

Google Fonts loaded via `next/font/google`: **Geist** (sans) and **Geist Mono** — applied as CSS variables `--font-geist-sans` / `--font-geist-mono` with `display: swap`.

---

## 2. Folder Architecture

```
chakrata-retreats/
├── app/                     # Next.js App Router — all routes
│   ├── layout.tsx           # Root layout (Header + Footer + JSON-LD Organization/WebSite)
│   ├── page.tsx             # Homepage (server) → HomeClient.tsx (client)
│   ├── globals.css          # Tailwind import + CSS custom properties
│   ├── error.tsx            # Global error boundary (client component)
│   ├── robots.ts            # Programmatic robots.txt
│   ├── sitemap.ts           # Programmatic sitemap.xml (priority hierarchy)
│   ├── HomeClient.tsx       # Homepage client interactivity (intent tiles, WhatsApp CTA)
│   ├── (generated)/         # Dynamic catch-all for programmatic pages
│   │   └── [slug]/page.tsx  # Serves 68 pages: 30 E×L + 30 Itinerary + 8 ProgramEvent
│   ├── api/                 # API routes
│   │   ├── inquire/         # POST — form submission pipeline
│   │   ├── track/           # POST — behavioral telemetry → events.jsonl
│   │   ├── cron/            # Vercel cron jobs
│   │   │   ├── followups/   # Daily lead follow-up emails
│   │   │   └── sitemap-ping/# Daily Google/Bing sitemap ping
│   │   └── internal/        # Admin API (auth, analytics, leads)
│   ├── internal/            # Auth-protected admin dashboard
│   │   ├── login/           # Admin login page
│   │   ├── analytics/       # Telemetry dashboard
│   │   └── dashboard/       # Lead management
│   ├── retreats/            # Retreat content hierarchy
│   │   ├── page.tsx         # /retreats hub
│   │   ├── [location]/      # /retreats/chakrata, /retreats/sankri, etc.
│   │   ├── journeys/        # (if present) retreat journey pages
│   │   └── {named-routes}/  # 15+ named sub-routes (best-retreat-in-uttarakhand, etc.)
│   ├── treks/               # Trek content hierarchy
│   │   ├── page.tsx         # /treks hub
│   │   ├── location/        # /treks/location/{loc}/{trek}
│   │   └── {named-routes}/  # 26+ trek detail + attribute pages
│   ├── blog/                # Blog hub + [slug] posts
│   ├── topics/              # Topic archive pages + [topic] dynamic
│   ├── facilitators/        # /facilitators hub + [slug] profiles (5 facilitators)
│   ├── compare/             # /compare/[pair] — retreat comparison pages
│   ├── find-your-retreat/   # Interactive retreat finder quiz
│   ├── retreat-programs/    # Matrix table of all retreat programs
│   ├── retreat-calendar/    # Calendar view of scheduled departures
│   ├── contact/             # Contact form (client component)
│   ├── about/               # About page
│   ├── site-map/            # HTML sitemap for users
│   ├── sitemaps/            # Sitemap index sub-sitemaps (blogs, compare, retreats)
│   └── {40+ editorial pages}  # Standalone SEO content pages (see Section 4)
│
├── components/              # Reusable React components
│   ├── layouts/             # Header, Footer, BlogLayout, LandingLayout
│   ├── seo/                 # Metadata.ts, Schema.ts, Breadcrumbs.ts
│   ├── ProgramEventPage.tsx # Conversion page template (dated retreats)
│   ├── ExperienceLocationPage.tsx  # E×L intersection page template
│   ├── ItineraryPage.tsx    # Day-by-day itinerary page template
│   ├── DeparturePage.tsx    # Trek departure page template
│   ├── InquiryForm.tsx      # Full inquiry form
│   ├── InlineInquiryForm.tsx# Compact inline inquiry form
│   ├── PrimaryCTA.tsx       # Main call-to-action button
│   ├── CTAExpandToggle.tsx  # Expandable CTA with inline form
│   ├── RetreatFinder.tsx    # Interactive retreat quiz wizard
│   ├── MicroCommitment.tsx  # Save/share/download micro-CTA buttons
│   ├── TrackedFAQ.tsx       # FAQ accordion with telemetry
│   ├── TrackedPage.tsx      # Page wrapper with scroll tracking
│   ├── ScrollTracker.tsx    # Scroll depth telemetry
│   ├── TrackLink.tsx        # Link with click telemetry
│   ├── RelatedReads.tsx     # Related article links section
│   ├── RelatedRetreats.tsx  # Related retreat cards (server)
│   ├── RelatedRetreatsClient.tsx  # Related retreats (client)
│   ├── Breadcrumb.tsx       # Breadcrumb navigation
│   ├── RatingBadge.tsx      # Star rating display
│   ├── RetreatScoreBar.tsx  # Fit-score radar visualization
│   └── {Trek components}    # TrekCard, StickyTrekCTA, TrekConversionLayer, etc.
│
├── config/                  # Typed configuration registries (single sources of truth)
│   ├── locations.ts         # 8 locations (chakrata, sankri, mussoorie, munsiyari, rishikesh, lohajung, joshimath, zanskar)
│   ├── experiencePages.ts   # 9 experience pillar pages
│   ├── experienceLocationPages.ts # 30 E×L intersection pages (programmatic)
│   ├── itineraryPages.ts    # 30 itinerary pages (programmatic)
│   ├── retreatProgramEvents.ts  # 8 dated retreat events (conversion pages)
│   ├── durationPages.ts     # 7 duration pages (3-day, 5-day, 7-day, 10-day, weekend)
│   ├── facilitators.ts      # 5 facilitator profiles
│   ├── departures.ts        # Trek departure batches (dates, pricing, seats)
│   ├── retreatMatrix.ts     # Retreat program comparison metadata
│   ├── retreatScores.ts     # 4-axis retreat fit scores
│   ├── retreatDurations.ts  # Service → duration group mapping
│   └── trekAttributes.ts    # Trek filter/attribute page definitions
│
├── content/                 # Editorial content (TypeScript modules)
│   ├── retreats/            # 8 retreat service files + services.ts registry
│   │   ├── services.ts      # Central registry: getAllRetreatServices()
│   │   └── {service}.ts     # rest-and-reset, meditation-and-silence, etc.
│   ├── treks/               # Trek content organized by location
│   │   ├── index.ts         # Central registry: ALL_TREKS
│   │   └── {location}/      # chakrata/, sankri/, joshimath/, lohajung/, munsiyari/
│   ├── blogs/               # 25 blog post TS modules + index.ts
│   ├── locations/           # 8 location content files (chakrata.ts, zanskar.ts, etc.)
│   └── reviews/             # Review data (index.ts)
│
├── lib/                     # Server-side business logic
│   ├── db.ts                # Neon Postgres connection (serverless HTTP)
│   ├── inquiries.ts         # Inquiry storage (Postgres + JSONL fallback)
│   ├── conversion-events.ts # Conversion event logger (Postgres)
│   ├── lead-scoring.ts      # 0–100 scoring engine (hot/warm/cold tiers)
│   ├── email.ts             # Tiered auto-response emails (Resend)
│   ├── followups.ts         # Day 3/7 follow-up sequence engine
│   ├── rate-limit.ts        # IP + global rate limiting + bot UA detection
│   ├── schemas.ts           # Zod validation schemas
│   ├── metadata.ts          # Location-based metadata generator
│   ├── locations.ts         # Location query helpers
│   ├── retreats.ts          # Retreat query helpers
│   ├── treks.ts             # Trek query helpers
│   ├── analytics.ts         # Client-side quiet analytics (intent clicks, WhatsApp)
│   ├── api-utils.ts         # Shared API utilities
│   ├── auth.ts              # Admin auth helpers
│   └── sitemap-ping.ts      # Google/Bing sitemap notification
│
├── utils/                   # Client-side utilities
│   ├── telemetry.ts         # Fire-and-forget event tracker (POST /api/track)
│   ├── sessionPreferences.ts # Session-based user preference storage
│   ├── validateCanonical.ts # Canonical URL validation
│   └── validateFAQSync.ts   # FAQ data integrity validation
│
├── types/
│   └── content.ts           # Master type definitions (RetreatContent, TrekContent, BlogContent)
│
├── scripts/                 # Dev/CI tooling
│   ├── init-db.ts           # Database schema initializer
│   ├── content-governance.ts # Content audit script
│   ├── link-audit.ts        # Internal link checker
│   ├── schema-validate.ts   # JSON-LD schema validator
│   ├── performance-budget.ts # Performance budget checker
│   └── analytics-report.ts  # Analytics data export
│
├── data/
│   └── events.jsonl         # Telemetry event log (append-only)
│
├── public/                  # Static assets (SVG icons only)
│   ├── file.svg, globe.svg, next.svg, vercel.svg, window.svg
│
├── src/app/                 # (Legacy/empty — unused)
│
├── middleware.ts            # Edge middleware — auth gate for /internal/*
├── next.config.ts           # Redirects (trek URL migration, location consolidation)
├── tsconfig.json            # TypeScript config (strict, bundler resolution)
├── eslint.config.mjs        # ESLint 9 flat config (core-web-vitals + TS)
├── postcss.config.mjs       # PostCSS with Tailwind CSS 4 plugin
├── vercel.json              # Vercel crons: daily followups (8 AM) + sitemap ping (8:30 AM)
└── lighthouserc.js          # Lighthouse CI configuration
```

---

## 3. SEO Infrastructure

### Sitemap Generation

[app/sitemap.ts](app/sitemap.ts) generates a single `sitemap.xml` with a **priority hierarchy**:

| Priority | Page Type | Count |
|---|---|---|
| 1.0 | Homepage | 1 |
| 0.95 | Experience pillar pages | 9 |
| 0.9 | Best-of comparison hubs | 3 |
| 0.85 | Duration × retreat pages | 7 |
| 0.85 | E×L intersection pages | 30 |
| 0.85 | Itinerary pages | 30 |
| 0.85 | Program event pages | 8 |
| 0.8 | Retreat guide pages, seasonal, transformation | ~15 |
| 0.75 | Micro-topic clusters, story pages, Zanskar cluster | ~20 |
| 0.7 | Blog posts, trek pages | Varies |

Sub-sitemaps exist at [app/sitemaps/](app/sitemaps/) for blogs, comparisons, and retreats.

### Robots.txt

[app/robots.ts](app/robots.ts) — Programmatic. Disallows `/api/`, `/_next/`, `/internal/`, `/dashboard/`, `/admin/`, `/private/`, debug routes. Sets crawl delay for AhrefsBot and SemrushBot (10s).

### Canonical URLs

All canonical URLs flow through `buildCanonicalUrl()` in [components/seo/Metadata.ts](components/seo/Metadata.ts), which reads `NEXT_PUBLIC_SITE_URL` and validates via `validateCanonical()`.

### JSON-LD Structured Data

[components/seo/Schema.ts](components/seo/Schema.ts) generates:
- `TouristTrip` schema for retreats and treks
- `FAQPage` schema for FAQ sections
- `Person` schema for facilitator profiles
- `Event` schema for program events (with offers, performer, location)
- `AggregateRating` and `Review` schemas

[components/seo/Breadcrumbs.ts](components/seo/Breadcrumbs.ts) generates `BreadcrumbList` schema.

Root layout injects global `Organization` and `WebSite` JSON-LD with `hasPart` collection pages.

### Metadata Pattern

Every page uses Next.js `generateMetadata()` (async) with:
- `title` (template: `%s | Retreats And Treks`)
- `description`
- `alternates.canonical`
- `robots: { index: true, follow: true }`
- `openGraph` (title, description, url, type)

### Redirects

[next.config.ts](next.config.ts) contains 301 redirects for:
- Trek URL migration: flat `/treks/{slug}` → hierarchical `/treks/location/{loc}/{slug}`
- Location hub consolidation: `/locations/:location` → `/retreats/:location`
- Singular → plural dedup: `/treks/best-trek-*` → `/treks/best-treks-*`

---

## 4. Content Architecture

### Content Taxonomy (5 Axes)

| Axis | Registry | Pages | Example URL |
|---|---|---|---|
| **Experience** (problem-based) | `config/experiencePages.ts` | 9 | `/meditation-retreats` |
| **Location** | `config/locations.ts` | 8 locations | `/retreats/chakrata` |
| **Experience × Location** | `config/experienceLocationPages.ts` | 30 | `/meditation-retreat-chakrata` |
| **Duration** | `config/durationPages.ts` | 7 | `/7-day-meditation-retreat` |
| **Itinerary** (day-by-day) | `config/itineraryPages.ts` | 30 | `/7-day-meditation-retreat-chakrata-itinerary` |

### Programmatic Page Generation

[app/(generated)/[slug]/page.tsx](app/(generated)/[slug]/page.tsx) is the unified dynamic route for 3 page types:

1. **Experience × Location** (30 pages) → `ExperienceLocationPage` component
2. **Itinerary** (30 pages) → `ItineraryPage` component
3. **Program Event** (8 pages) → `ProgramEventPage` component

`generateStaticParams()` unions all three slug sets. At render time, it checks each registry in order: E×L → Itinerary → ProgramEvent → `notFound()`.

### Retreat Services (8)

Defined in `content/retreats/` as TypeScript modules:

| Service | Slug |
|---|---|
| Rest & Reset | `rest-and-reset` |
| Burnout Recovery | `burnout-recovery` |
| Yoga & Movement | `yoga-and-movement` |
| Meditation & Silence | `meditation-and-silence` |
| Art & Creative | `art-and-creative` |
| Sound Healing | `sound-healing` |
| Weekend Retreat | `weekend-retreat` |
| Private & Custom | `private-and-custom` |

Central registry: `content/retreats/services.ts` → `getAllRetreatServices()`.

### Editorial Page Categories (~40+ standalone pages)

| Category | Examples |
|---|---|
| Seasonal | `winter-retreat-himalayas`, `summer-retreat-himalayas`, `spring-retreat-himalayas`, `autumn-retreat-himalayas` |
| Transformation | `self-discovery-retreat`, `life-reset-retreat`, `spiritual-awakening-retreat`, `personal-growth-retreat` |
| Comparison | `vipassana-vs-meditation-retreat`, `retreat-vs-therapy`, `silent-retreat-vs-digital-detox` |
| Preparation | `how-to-prepare-for-a-retreat`, `what-to-pack-for-a-retreat`, `retreats-for-beginners` |
| First-person stories | `my-7-day-meditation-retreat-in-zanskar`, `what-i-learned-from-a-silent-retreat`, `a-week-without-my-phone-digital-detox` |
| Zanskar cluster | `why-zanskar-is-perfect-for-retreats`, `best-time-for-a-retreat-in-zanskar`, `how-to-reach-zanskar-for-a-retreat` |
| Best-of | `best-meditation-retreats-in-india`, `best-himalayan-retreats`, `himalayan-silent-retreats` |

### Blog Content

25 blog posts in `content/blogs/` as TypeScript modules. Types defined in `types/content.ts` (`BlogContent`). Four categories: Location Authority, Retreat Decision, Trek Decision, Lifestyle. Each blog has a `targetMoneyPage` field for deterministic internal linking.

### Trek Content

Trek content in `content/treks/` organized by base camp location (chakrata, sankri, joshimath, lohajung, munsiyari). Types: `TrekContent` with difficulty, altitude, distance, monthly conditions, safety info.

---

## 5. Conversion Infrastructure

### Inquiry Pipeline

```
User submits form
    ↓
POST /api/inquire (app/api/inquire/route.ts)
    ↓
1. Bot UA check → fake 200 if bot
2. Global rate limit check (200 req/min)
3. IP rate limit check (5 req/min per IP)
4. Honeypot field check
5. Timestamp delta check (min 2s fill time)
6. Zod schema validation (lib/schemas.ts)
7. Lead scoring (lib/lead-scoring.ts) → 0–100 score → hot/warm/cold tier
8. Insert into Postgres `inquiries` table (lib/inquiries.ts)
9. Log conversion event to `conversion_events` table
10. Send tiered auto-response email via Resend (lib/email.ts)
    ↓
Response: { success: true, id: UUID }
```

### Lead Scoring (lib/lead-scoring.ts)

| Tier | Score Range | Response |
|---|---|---|
| Hot | 70–100 | Premium brochure + direct scheduler link |
| Warm | 40–69 | Resource pack + qualification questions |
| Cold | 0–39 | Standard helpful response |

Signals: group size, location specificity, month specificity, vertical (retreat vs trek), category (luxury/private = premium), source page depth.

### Follow-Up Automation

[lib/followups.ts](lib/followups.ts) — Vercel cron (daily 8 AM via [vercel.json](vercel.json)):
- Day 3: First follow-up for hot + warm leads
- Day 7: Second follow-up for all tiers
- Max 2 follow-ups per lead

### Conversion Components

| Component | Purpose |
|---|---|
| `PrimaryCTA` | Main CTA button (WhatsApp or inquiry form trigger) |
| `CTAExpandToggle` | Expandable inline CTA that reveals a form |
| `InquiryForm` | Full multi-field inquiry form |
| `InlineInquiryForm` | Compact contextual form |
| `MicroCommitment` | Save/share/download buttons (pre-booking signals) |
| `AvailabilityModal` | Availability check modal |
| `RetreatFinder` | Interactive quiz wizard → matched retreat |

### Telemetry

**Client** ([utils/telemetry.ts](utils/telemetry.ts)): Fire-and-forget `POST /api/track`. Events:

- Navigation: `topic_to_pillar`, `blog_to_journey`, `comparison_to_journey`, `pillar_to_journey`, `matrix_to_journey`
- Behavioral: `scroll_depth`, `faq_expand`, `comparison_sort`, `comparison_filter`, `finder_complete`, `sticky_cta_click`, `availability_form_submit`, `departure_table_click`, `whatsapp_click`, `phone_click`, `calendar_filter`, `micro_save`, `micro_share`, `micro_download`

**Server** ([app/api/track/route.ts](app/api/track/route.ts)): Validates event type, appends JSON line to `data/events.jsonl`.

---

## 6. Data Sources

### Neon Postgres (Production)

Connection: `@neondatabase/serverless` via `lib/db.ts`. Environment variable: `DATABASE_URL`.

#### Tables

| Table | Purpose | Key Columns |
|---|---|---|
| `inquiries` | Lead pipeline | id (UUID), name, email, interested_in, location, month, group_size, budget, source_url, vertical, category, lead_score, lead_tier, status, followup_count, last_followup_at, created_at |
| `conversion_events` | Funnel event log | event_type, inquiry_id (FK), source_url, vertical, category, ip_hash, user_agent, meta (JSONB) |

Schema initialized by: `npx ts-node --project tsconfig.json scripts/init-db.ts`

#### Constraints

- `lead_tier` CHECK: `hot`, `warm`, `cold`, `unscored`
- `status` CHECK: `open`, `replied`, `closed`, `booked`
- `pgcrypto` extension for UUID generation

### JSONL Event Log

`data/events.jsonl` — append-only behavioral telemetry. Each line is a JSON object with `event`, `from`, `to?`, `meta?`, `timestamp`.

### Static Content (TypeScript)

All content is defined in TypeScript modules — no CMS, no markdown files, no database content queries. Content changes = code changes = deployed via git.

| Source | Location |
|---|---|
| Retreat services | `content/retreats/{service}.ts` |
| Trek content | `content/treks/{location}/{trek}.ts` |
| Blog posts | `content/blogs/{slug}.ts` |
| Location profiles | `content/locations/{location}.ts` |
| Reviews | `content/reviews/index.ts` |

### Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `DATABASE_URL` | Neon Postgres connection string | Yes (prod) |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL | Yes |
| `RESEND_API_KEY` | Transactional email API key | Yes (prod) |
| `RESEND_FROM_EMAIL` | Sender email address | Optional |
| `TEAM_NOTIFICATION_EMAIL` | Internal alert recipient | Optional |
| `ADMIN_SECRET` | HMAC signing key for session cookies | Yes |
| `ADMIN_PASSWORD` | Admin login password | Yes |
| `CRON_SECRET` | Bearer token for cron endpoint auth | Yes |

---

## 7. Build System & Scripts

### Build Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Next.js dev server |
| `pnpm build` | Production static build (322 pages) |
| `pnpm start` | Serve production build |
| `pnpm lint` | ESLint |

### Audit Scripts

| Command | Script |
|---|---|
| `pnpm audit:governance` | `scripts/content-governance.ts` — content freshness + completeness audit |
| `pnpm audit:links` | `scripts/link-audit.ts` — internal link integrity check |
| `pnpm audit:schema` | `scripts/schema-validate.ts` — JSON-LD schema validation |
| `pnpm audit:perf` | `scripts/performance-budget.ts` — performance budget checker |
| `pnpm audit:analytics` | `scripts/analytics-report.ts` — telemetry data export |
| `pnpm audit:all` | Runs governance + links + schema + perf in sequence |

### Lighthouse CI

[lighthouserc.js](lighthouserc.js) configured for static build. Tested URLs: `/`, `/retreats/himalayan-retreats`, `/retreats/chakrata`, `/blog`, `/about`.

### Vercel Cron Jobs

| Schedule | Endpoint | Purpose |
|---|---|---|
| `0 8 * * *` (daily 8 AM UTC) | `/api/cron/followups` | Lead follow-up email sequence |
| `30 8 * * *` (daily 8:30 AM UTC) | `/api/cron/sitemap-ping` | Ping Google/Bing with updated sitemap |

---

## 8. Critical SEO Files

These files directly affect search indexing. Modify with care.

| File | Purpose | Impact |
|---|---|---|
| [app/sitemap.ts](app/sitemap.ts) | Programmatic sitemap.xml with priority hierarchy | Crawl budget allocation |
| [app/robots.ts](app/robots.ts) | robots.txt with disallow rules + crawl delays | Crawler access control |
| [components/seo/Metadata.ts](components/seo/Metadata.ts) | `buildCanonicalUrl()` — every page's canonical URL | Duplicate content prevention |
| [components/seo/Schema.ts](components/seo/Schema.ts) | JSON-LD structured data generators | Rich snippet eligibility |
| [components/seo/Breadcrumbs.ts](components/seo/Breadcrumbs.ts) | BreadcrumbList JSON-LD | Search result breadcrumbs |
| [app/layout.tsx](app/layout.tsx) | Root layout with Organization + WebSite JSON-LD | Site-wide schema |
| [next.config.ts](next.config.ts) | 301 redirect rules | URL migration integrity |
| [middleware.ts](middleware.ts) | Auth gate — must NOT block public routes | Indexability |
| [utils/validateCanonical.ts](utils/validateCanonical.ts) | Canonical URL validation | Prevents malformed canonicals |

---

## 9. Layout, Navigation & Template Components

### Root Layout ([app/layout.tsx](app/layout.tsx))

```
<html lang="en">
  <head>
    Organization JSON-LD (schema.org)
    WebSite JSON-LD with hasPart collection pages
  </head>
  <body class="geist-sans geist-mono antialiased">
    <Header />       ← Global navigation
    {children}       ← Route content
    <Footer />       ← Global footer with link grid
  </body>
</html>
```

### Header ([components/layouts/Header.tsx](components/layouts/Header.tsx))

Inline-styled `<nav>` with horizontal link list. Key links: Home, Retreats, Best Retreats, Programs, Treks (dropdown mega-nav with location hubs + popular treks + attribute filters), Blog, About, Contact.

Treks dropdown uses CSS `:hover`/`:focus-within` for accessibility (defined in `globals.css`).

### Footer ([components/layouts/Footer.tsx](components/layouts/Footer.tsx))

Multi-column footer grid: Popular Treks, Retreat Programs, Explore, Plan (comparison pages, guides). All internal links.

### Page Templates

| Template | Component | Serves | Key Sections |
|---|---|---|---|
| Program Event | `ProgramEventPage.tsx` | 8 dated retreat pages | Hero → Pricing → Booking Assurance → MicroCommitment → CTA → Facilitator → Itinerary → Included → What to Bring → Reviews → CTA → FAQ → Related Links |
| Experience × Location | `ExperienceLocationPage.tsx` | 30 intersection pages | Intro → Who Is This For → What to Expect → Sample Schedule → Location Details → FAQ → Related |
| Itinerary | `ItineraryPage.tsx` | 30 day-by-day pages | Intro → Day-by-day narrative → FAQ → Related |
| Departure | `DeparturePage.tsx` | Trek departure pages | Trek details → Departure table → Booking CTA |
| Duration Hub | `DurationHubPage.tsx` | 7 duration pages | Intro → Ideal For → Typical Day → Location Cards → Related |
| Experience Hub | `ExperienceHubPage.tsx` | 9 experience pages | Intro → Who Is This For → What to Expect → Location Angles → Closing |
| Blog | `BlogLayout.tsx` | Blog posts | Title → Description → Date/Reading Time → Content |
| Landing | `LandingLayout.tsx` | Generic landing pages | Title → Description → Content |
| Trek Attribute | `TrekAttributePage.tsx` | Trek filter pages | Intro → Filtered Trek Cards → FAQ |

### Key Interactive Components (Client)

| Component | `'use client'` | Purpose |
|---|---|---|
| `HomeClient.tsx` | Yes | Homepage intent tiles, WhatsApp CTA |
| `RetreatFinder.tsx` | Yes | Multi-step quiz → matched retreat |
| `RetreatCalendarClient.tsx` | Yes | Calendar filter for departures |
| `CTAExpandToggle.tsx` | Yes | Expandable inline inquiry form |
| `InquiryForm.tsx` | Yes | Full form with validation |
| `AvailabilityModal.tsx` | Yes | Availability check overlay |
| `MicroCommitment.tsx` | Yes | Save/share/download buttons with telemetry |
| `TrackedFAQ.tsx` | Yes | FAQ accordion with expand telemetry |
| `ScrollTracker.tsx` | Yes | Scroll depth telemetry |
| `RelatedRetreatsClient.tsx` | Yes | Dynamic related retreat cards |
| `RetreatScoreBar.tsx` | Yes | Visual fit-score display |

---

## 10. Static Assets

### `/public/` Directory

Minimal — only 5 SVG icons inherited from the Next.js starter:

| File | Description |
|---|---|
| `file.svg` | Generic file icon |
| `globe.svg` | Globe icon |
| `next.svg` | Next.js logo |
| `vercel.svg` | Vercel logo |
| `window.svg` | Window icon |

**No images, no photographs, no custom icons.** The site is entirely text-based with no media assets. No `<img>` tags serving from `/public/`. All visual content is CSS-styled HTML.

### CSS Assets

Single global stylesheet: [app/globals.css](app/globals.css) with:
- Tailwind CSS 4 import (`@import "tailwindcss"`)
- CSS custom properties (colors, spacing, radius)
- Dropdown hover/focus styles
- Card interaction styles

No CSS modules, no `.scss`, no component-scoped stylesheets.

---

## Appendix: Auth Architecture

### Admin Routes Protection

[middleware.ts](middleware.ts) — Edge Middleware matching `/internal/*`, `/api/internal/*`, `/api/cron/*`.

- **Admin pages**: Validates `admin_session` cookie (base64 encoded `timestamp:hashVersion:hmacSignature`)
- **HMAC-SHA256** signing with `ADMIN_SECRET`, includes SHA-256 hash of `ADMIN_PASSWORD` in payload
- **24-hour session max age**
- **Cron endpoints**: Validated via `Authorization: Bearer {CRON_SECRET}` header
- **Excluded from auth**: `/internal/login`, `/api/internal/auth/*`

### Content Type Registry

| Registry File | Type Interface | Count | Used By |
|---|---|---|---|
| `config/locations.ts` | `Location` | 8 | All location-aware pages |
| `config/experiencePages.ts` | `ExperiencePage` | 9 | Experience hub pages |
| `config/experienceLocationPages.ts` | `ExperienceLocationPage` | 30 | `(generated)/[slug]` |
| `config/itineraryPages.ts` | `ItineraryPage` | 30 | `(generated)/[slug]` |
| `config/retreatProgramEvents.ts` | `RetreatProgramEvent` | 8 | `(generated)/[slug]` |
| `config/durationPages.ts` | `DurationPage` | 7 | Duration hub pages |
| `config/facilitators.ts` | `Facilitator` | 5 | `/facilitators/[slug]` |
| `config/departures.ts` | `TrekDepartures` | Varies | Trek departure tables |
| `config/retreatMatrix.ts` | `MatrixMeta` | 8 | `/retreat-programs` matrix |
| `config/retreatScores.ts` | `RetreatScores` | 8 | Fit score displays |
| `config/retreatDurations.ts` | `DurationGroup` | 8 | Duration-based suggestions |
| `config/trekAttributes.ts` | `TrekAttributeConfig` | Varies | Trek filter pages |
