import { MetadataRoute } from 'next';
import { getAllLocations } from '@/lib/locations';
import { getAllTreks } from '@/lib/treks';
import { getAllRetreatServices } from '@/content/retreats/services';
import { getBlogPostsForSitemap, ALL_BLOG_POSTS } from '@/content/blogs';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { EXPERIENCE_PAGES } from '@/config/experiencePages';
import { DURATION_PAGES } from '@/config/durationPages';
import { EXPERIENCE_LOCATION_PAGES } from '@/config/experienceLocationPages';
import { ITINERARY_PAGES } from '@/config/itineraryPages';
import { RETREAT_PROGRAM_EVENTS } from '@/config/retreatProgramEvents';
import { FACILITATOR_PROFILES } from '@/config/facilitators';

const COMPARE_SEPARATOR = '-vs-';

function canonicalPair(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a];
}

/**
 * Crawl Budget Priority Hierarchy
 * ─────────────────────────────────
 * 1.0  Home
 * 1.0  Pillar (/retreats/himalayan-retreats)  ← revenue authority node
 * 0.9  Global hubs (/retreats, /treks)
 * 0.9  Location hubs (/retreats/[location])
 * 0.85 Retreat journey pages
 * 0.8  Trek location hubs
 * 0.75 Trek detail pages
 * 0.7  Topic archive pages
 * 0.6  /blog hub, /about
 * 0.6  Blog posts
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // ── 1. Home ──────────────────────────────────────────────────────────────
  entries.push({
    url: buildCanonicalUrl('/'),
    lastModified: now,
    priority: 1.0,
    changeFrequency: 'monthly',
  });

  // ── 1b. Experience authority pages (Axis 2 — problem-based) ──────────────
  for (const exp of EXPERIENCE_PAGES) {
    entries.push({
      url: buildCanonicalUrl(`/${exp.slug}`),
      lastModified: now,
      priority: 0.95,
      changeFrequency: 'monthly',
    });
  }

  // ── 1c. Best-of comparison pages (top-of-funnel) ──────────────────────────
  for (const slug of ['best-meditation-retreats-in-india', 'best-himalayan-retreats', 'himalayan-silent-retreats']) {
    entries.push({
      url: buildCanonicalUrl(`/${slug}`),
      lastModified: now,
      priority: 0.9,
      changeFrequency: 'monthly',
    });
  }

  // ── 1d. Retreat guide pages (informational content engine) ────────────────
  for (const slug of [
    'how-to-choose-a-meditation-retreat',
    'what-happens-at-a-silent-retreat',
    'how-to-prepare-for-a-retreat',
    'retreat-vs-vacation',
    'benefits-of-himalayan-retreats',
  ]) {
    entries.push({
      url: buildCanonicalUrl(`/${slug}`),
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'monthly',
    });
  }

  // ── 1e. Duration × retreat-type pages (high-conversion) ──────────────────
  for (const dp of DURATION_PAGES) {
    entries.push({
      url: buildCanonicalUrl(`/${dp.slug}`),
      lastModified: now,
      priority: 0.85,
      changeFrequency: 'monthly',
    });
  }

  // ── 1f. Micro-topic cluster pages (meditation retreat pillar support) ─────
  for (const slug of [
    'benefits-of-meditation-retreat',
    'is-a-meditation-retreat-worth-it',
    'what-to-expect-at-a-meditation-retreat',
    'first-meditation-retreat-tips',
  ]) {
    entries.push({
      url: buildCanonicalUrl(`/${slug}`),
      lastModified: now,
      priority: 0.75,
      changeFrequency: 'monthly',
    });
  }

  // ── 1f-2. Retreat story pages (first-person narratives) ──────────────────
  for (const slug of [
    'my-7-day-meditation-retreat-in-zanskar',
    'what-i-learned-from-a-silent-retreat',
    'a-week-without-my-phone-digital-detox',
    'why-people-go-to-meditation-retreats',
    'what-happens-to-your-mind-in-silence',
  ]) {
    entries.push({
      url: buildCanonicalUrl(`/${slug}`),
      lastModified: now,
      priority: 0.75,
      changeFrequency: 'monthly',
    });
  }

  // ── 1f-3. Comparison & preparation pages ─────────────────────────────────
  for (const slug of [
    'vipassana-vs-meditation-retreat',
    'retreat-vs-therapy',
    'silent-retreat-vs-digital-detox',
    'what-to-pack-for-a-retreat',
    'how-hard-is-a-silent-retreat',
    'first-day-of-a-meditation-retreat',
    'how-long-should-a-meditation-retreat-be',
    'retreats-for-beginners',
  ]) {
    entries.push({
      url: buildCanonicalUrl(`/${slug}`),
      lastModified: now,
      priority: 0.75,
      changeFrequency: 'monthly',
    });
  }

  // ── 1f-4. Zanskar authority cluster ──────────────────────────────────────
  for (const slug of [
    'why-zanskar-is-perfect-for-retreats',
    'best-time-for-a-retreat-in-zanskar',
    'how-to-reach-zanskar-for-a-retreat',
  ]) {
    entries.push({
      url: buildCanonicalUrl(`/${slug}`),
      lastModified: now,
      priority: 0.75,
      changeFrequency: 'monthly',
    });
  }

  // ── 1g. Experience × Location intersection pages (30 programmatic) ────────
  for (const elp of EXPERIENCE_LOCATION_PAGES) {
    entries.push({
      url: buildCanonicalUrl(`/${elp.slug}`),
      lastModified: now,
      priority: 0.85,
      changeFrequency: 'monthly',
    });
  }

  // ── 1h. Seasonal retreat pages ────────────────────────────────────────────
  for (const slug of [
    'winter-retreat-himalayas',
    'summer-retreat-himalayas',
    'spring-retreat-himalayas',
    'autumn-retreat-himalayas',
  ]) {
    entries.push({
      url: buildCanonicalUrl(`/${slug}`),
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'monthly',
    });
  }

  // ── 1i. Transformation retreat pages ──────────────────────────────────────
  for (const slug of [
    'self-discovery-retreat',
    'life-reset-retreat',
    'spiritual-awakening-retreat',
    'personal-growth-retreat',
  ]) {
    entries.push({
      url: buildCanonicalUrl(`/${slug}`),
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'monthly',
    });
  }

  // ── 1j. Trek + retreat hybrid pages ───────────────────────────────────────
  for (const slug of [
    'meditation-retreat-and-trek',
    'himalayan-retreat-with-trekking',
    'trek-and-meditate-himalayas',
  ]) {
    entries.push({
      url: buildCanonicalUrl(`/${slug}`),
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'monthly',
    });
  }

  // ── 1k. Retreat itinerary pages (30 programmatic) ─────────────────────────
  for (const itp of ITINERARY_PAGES) {
    entries.push({
      url: buildCanonicalUrl(`/${itp.slug}`),
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'monthly',
    });
  }

  // ── 1l. Retreat Finder page ───────────────────────────────────────────────
  entries.push({
    url: buildCanonicalUrl('/find-your-retreat'),
    lastModified: now,
    priority: 0.9,
    changeFrequency: 'monthly',
  });

  // ── 1m. Retreat Calendar page ─────────────────────────────────────────────
  entries.push({
    url: buildCanonicalUrl('/retreat-calendar'),
    lastModified: now,
    priority: 0.9,
    changeFrequency: 'weekly',
  });

  // ── 1n. Program event pages (highest conversion — dated retreats) ─────────
  for (const ev of RETREAT_PROGRAM_EVENTS) {
    entries.push({
      url: buildCanonicalUrl(`/${ev.slug}`),
      lastModified: now,
      priority: 0.9,
      changeFrequency: 'weekly',
    });
  }

  // ── 2. Retreat pillar (highest revenue authority) ────────────────────

  // ── 1o. Facilitator pages (trust signals) ─────────────────────────────
  entries.push({
    url: buildCanonicalUrl('/facilitators'),
    lastModified: now,
    priority: 0.8,
    changeFrequency: 'monthly',
  });
  for (const f of FACILITATOR_PROFILES) {
    entries.push({
      url: buildCanonicalUrl(`/facilitators/${f.slug}`),
      lastModified: now,
      priority: 0.75,
      changeFrequency: 'monthly',
    });
  }

  // ── 2. Retreat pillar (highest revenue authority) ────────────────────────
  entries.push({
    url: buildCanonicalUrl('/retreats/himalayan-retreats'),
    lastModified: now,
    priority: 1.0,
    changeFrequency: 'weekly',
  });

  // ── 2a. Retreat apex aggregator ───────────────────────────────────────
  entries.push({
    url: buildCanonicalUrl('/retreats/best-retreat-in-uttarakhand'),
    lastModified: now,
    priority: 0.95,
    changeFrequency: 'monthly',
  });

  // ── 2b. Commercial modifier pages ─────────────────────────────────────
  entries.push(
    {
      url: buildCanonicalUrl('/retreats/winter-himalayan-retreats'),
      lastModified: now,
      priority: 0.9,
      changeFrequency: 'monthly',
    },
    {
      url: buildCanonicalUrl('/retreats/summer-himalayan-retreats'),
      lastModified: now,
      priority: 0.9,
      changeFrequency: 'monthly',
    },
    {
      url: buildCanonicalUrl('/retreats/weekend-himalayan-retreats'),
      lastModified: now,
      priority: 0.9,
      changeFrequency: 'monthly',
    },
  );

  // ── 3. Global category hubs ───────────────────────────────────────────────
  entries.push(
    {
      url: buildCanonicalUrl('/retreat-programs'),
      lastModified: now,
      priority: 0.95,
      changeFrequency: 'monthly' as const,
    },
    {
      url: buildCanonicalUrl('/retreats'),
      lastModified: now,
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: buildCanonicalUrl('/treks'),
      lastModified: now,
      priority: 0.9,
      changeFrequency: 'weekly',
    },
  );

  // ── 3a. Trek apex — master index (top-of-funnel traffic distributor) ──────
  entries.push({
    url: buildCanonicalUrl('/treks/best-treks-in-uttarakhand'),
    lastModified: now,
    priority: 0.95,
    changeFrequency: 'monthly',
  });

  // ── 3a-filter. Trek filter child pages (long-tail programmatic) ───────────
  for (const filter of ['beginner', 'snow', 'high-altitude', 'challenging']) {
    entries.push({
      url: buildCanonicalUrl(`/treks/best-treks-in-uttarakhand/${filter}`),
      lastModified: now,
      priority: 0.85,
      changeFrequency: 'monthly',
    });
  }

  // ── 3a-departures. Fixed departure / calendar pages (high-conversion) ────
  for (const slug of ['brahmatal', 'kuari-pass', 'roopkund', 'pangarchulla']) {
    entries.push({
      url: buildCanonicalUrl(`/treks/${slug}/departures`),
      lastModified: now,
      priority: 0.85,
      changeFrequency: 'weekly',
    });
  }

  // ── 3b. Trek modifier pages ───────────────────────────────────────────────
  entries.push(
    {
      url: buildCanonicalUrl('/treks/trek-near-delhi'),
      lastModified: now,
      priority: 0.85,
      changeFrequency: 'monthly',
    },
    {
      url: buildCanonicalUrl('/treks/beginner-treks-uttarakhand'),
      lastModified: now,
      priority: 0.85,
      changeFrequency: 'monthly',
    },
    {
      url: buildCanonicalUrl('/treks/winter-treks-uttarakhand'),
      lastModified: now,
      priority: 0.85,
      changeFrequency: 'monthly',
    },
    {
      url: buildCanonicalUrl('/treks/summer-treks-uttarakhand'),
      lastModified: now,
      priority: 0.85,
      changeFrequency: 'monthly',
    },
    {
      url: buildCanonicalUrl('/treks/kedarkantha-vs-har-ki-dun'),
      lastModified: now,
      priority: 0.80,
      changeFrequency: 'monthly',
    },
    {
      url: buildCanonicalUrl('/treks/brahmatal-vs-kuari-pass'),
      lastModified: now,
      priority: 0.80,
      changeFrequency: 'monthly',
    },
    {
      url: buildCanonicalUrl('/treks/roopkund-vs-pangarchulla'),
      lastModified: now,
      priority: 0.80,
      changeFrequency: 'monthly',
    },
    {
      url: buildCanonicalUrl('/treks/3-day-treks-uttarakhand'),
      lastModified: now,
      priority: 0.85,
      changeFrequency: 'monthly',
    },
    {
      url: buildCanonicalUrl('/treks/trek-packages-uttarakhand'),
      lastModified: now,
      priority: 0.85,
      changeFrequency: 'monthly',
    },
  );

  // ── 3d. Attribute filter pages ────────────────────────────────────────────
  const attributeSlugs = [
    'above-4000m-treks-uttarakhand',
    'low-altitude-treks-uttarakhand',
    'spring-treks-uttarakhand',
    'autumn-treks-uttarakhand',
    '5-day-treks-uttarakhand',
    'week-long-treks-uttarakhand',
  ];
  for (const slug of attributeSlugs) {
    entries.push({
      url: buildCanonicalUrl(`/treks/${slug}`),
      lastModified: now,
      priority: 0.75,
      changeFrequency: 'monthly' as const,
    });
  }

  // ── 3c. Garhwal region pillar ─────────────────────────────────────────────
  entries.push(
    {
      url: buildCanonicalUrl('/treks/garhwal-himalayas'),
      lastModified: now,
      priority: 0.9,
      changeFrequency: 'monthly',
    },
    {
      url: buildCanonicalUrl('/treks/garhwal-himalayas/fitness-guide'),
      lastModified: now,
      priority: 0.75,
      changeFrequency: 'monthly',
    },
    {
      url: buildCanonicalUrl('/treks/garhwal-himalayas/packing-checklist'),
      lastModified: now,
      priority: 0.75,
      changeFrequency: 'monthly',
    },
  );

  // ── 4. Location hubs ──────────────────────────────────────────────────────
  const locations = getAllLocations();

  // Locations index page
  entries.push({
    url: buildCanonicalUrl('/locations'),
    lastModified: now,
    priority: 0.9,
    changeFrequency: 'monthly',
  });

  for (const location of locations) {
    // Unified location hub page
    entries.push({
      url: buildCanonicalUrl(`/locations/${location.id}`),
      lastModified: now,
      priority: 0.85,
      changeFrequency: 'monthly',
    });
    if (location.supportsRetreats) {
      entries.push({
        url: buildCanonicalUrl(`/retreats/${location.id}`),
        lastModified: now,
        priority: 0.9,
        changeFrequency: 'monthly',
      });
    }
    if (location.supportsTreks) {
      entries.push({
        url: buildCanonicalUrl(`/treks/location/${location.id}`),
        lastModified: now,
        priority: 0.8,
        changeFrequency: 'monthly',
      });
    }
  }

  // ── 5. Retreat journey pages ──────────────────────────────────────────────
  const retreatServices = getAllRetreatServices();
  for (const service of retreatServices) {
    entries.push({
      url: buildCanonicalUrl(`/retreats/journeys/${service.slug}`),
      lastModified: now,
      priority: 0.85,
      changeFrequency: 'monthly',
    });
  }

  // ── 6. Trek detail pages ──────────────────────────────────────────────────
  const allTreks = getAllTreks();
  for (const trek of allTreks) {
    entries.push({
      url: buildCanonicalUrl(`/treks/location/${trek.locationId}/${trek.slug}`),
      lastModified: trek.updatedAt ? new Date(trek.updatedAt) : now,
      priority: 0.75,
      changeFrequency: 'weekly',
    });
  }

  // ── 6a. Trek month pages (long-tail: "brahmatal trek in december") ────────
  const MONTH_URL_SLUGS: Record<string, string> = {
    'brahmatal-trek': 'brahmatal',
    'kuari-pass-trek': 'kuari-pass',
    'roopkund-trek': 'roopkund',
    'pangarchulla-trek': 'pangarchulla',
    'kedarkantha-trek': 'kedarkantha',
    'har-ki-dun-trek': 'har-ki-dun',
  };
  for (const trek of allTreks) {
    const urlSlug = MONTH_URL_SLUGS[trek.slug];
    if (!urlSlug || !trek.monthlyConditions) continue;
    for (const mc of trek.monthlyConditions) {
      entries.push({
        url: buildCanonicalUrl(`/treks/${urlSlug}/${mc.month.toLowerCase()}`),
        lastModified: trek.updatedAt ? new Date(trek.updatedAt) : now,
        priority: 0.65,
        changeFrequency: 'monthly',
      });
    }
  }

  // ── 7. Topic archive pages — only include topics with >= 3 posts ───────────
  const TOPIC_MAP: Record<string, string> = {
    'location-authority': 'Location Authority',
    'retreat-decision': 'Retreat Decision',
    'trek-decision': 'Trek Decision',
    // 'lifestyle' has its own static authority page — included separately below
  };

  for (const topic of Object.keys(TOPIC_MAP)) {
    const category = TOPIC_MAP[topic];
    const postCount = ALL_BLOG_POSTS.filter((p) => p.category === category).length;
    // Include only when there are at least 3 posts — otherwise treat as thin archive
    if (postCount >= 3) {
      entries.push({
        url: buildCanonicalUrl(`/topics/${topic}`),
        lastModified: now,
        priority: 0.7,
        changeFrequency: 'weekly',
      });
    }
  }

  // Always include /topics/lifestyle — it has its own static authority page
  entries.push({
    url: buildCanonicalUrl('/topics/lifestyle'),
    lastModified: now,
    priority: 0.7,
    changeFrequency: 'weekly',
  });

  // ── 8. Static authority pages ─────────────────────────────────────────────
  entries.push(
    {
      url: buildCanonicalUrl('/about'),
      lastModified: now,
      priority: 0.6,
      changeFrequency: 'monthly',
    },
    {
      url: buildCanonicalUrl('/blog'),
      lastModified: now,
      priority: 0.6,
      changeFrequency: 'weekly',
    },
    {
      url: buildCanonicalUrl('/site-map'),
      lastModified: now,
      priority: 0.5,
      changeFrequency: 'monthly',
    },
  );

  // ── 9. Comparison pages (commercial middle-funnel surfaces) ─────────────
  const retreatSlugs = retreatServices.map((s) => s.slug);
  for (let i = 0; i < retreatSlugs.length; i++) {
    for (let j = i + 1; j < retreatSlugs.length; j++) {
      const [a, b] = canonicalPair(retreatSlugs[i], retreatSlugs[j]);
      entries.push({
        url: buildCanonicalUrl(`/compare/${a}${COMPARE_SEPARATOR}${b}`),
        lastModified: now,
        priority: 0.65,
        changeFrequency: 'monthly' as const,
      });
    }
  }

  // ── 10. Blog posts (per-entry freshness via lastUpdated) ──────────────────
  const blogPosts = getBlogPostsForSitemap();
  for (const post of blogPosts) {
    entries.push({
      url: buildCanonicalUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.lastUpdated ?? post.publishedAt),
      priority: 0.6,
      changeFrequency: 'monthly',
    });
  }

  return entries;
}
