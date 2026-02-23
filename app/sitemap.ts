import { MetadataRoute } from 'next';
import { getAllLocations } from '@/lib/locations';
import { getAllTreks } from '@/lib/treks';
import { getAllRetreatServices } from '@/content/retreats/services';
import { getBlogPostsForSitemap, ALL_BLOG_POSTS } from '@/content/blogs';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

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

  // ── 2. Retreat pillar (highest revenue authority) ────────────────────────
  entries.push({
    url: buildCanonicalUrl('/retreats/himalayan-retreats'),
    lastModified: now,
    priority: 1.0,
    changeFrequency: 'weekly',
  });

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

  // ── 4. Location hubs ──────────────────────────────────────────────────────
  const locations = getAllLocations();
  for (const location of locations) {
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
      url: buildCanonicalUrl(`/treks/${trek.slug}`),
      lastModified: now,
      priority: 0.75,
      changeFrequency: 'monthly',
    });
  }

  // ── 7. Topic archive pages — only include topics with >= 3 posts ───────────
  const TOPIC_MAP: Record<string, string> = {
    'location-authority': 'Location Authority',
    'retreat-decision': 'Retreat Decision',
    'trek-decision': 'Trek Decision',
    'lifestyle': 'Lifestyle',
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
