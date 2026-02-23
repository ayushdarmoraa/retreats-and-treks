/**
 * Session Preference Store — localStorage-backed inference layer
 *
 * Accumulates lightweight behavioral signals from:
 *   - Matrix filter interactions (intensity / duration preference)
 *   - Deep scroll events (75%+ scroll on a journey page = strong interest)
 *   - Finder completion (inferred from top result)
 *
 * Used by adaptive client components to re-rank suggestions.
 * TTL: 24 hours. No PII. No server calls.
 *
 * Key: "rat_prefs"
 */

const STORAGE_KEY = 'rat_prefs';
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export interface SessionPrefs {
  preferredIntensity?: 'low' | 'medium' | 'high';
  preferredDuration?: '3-day' | '5-day' | 'flexible';
  /** Retreat slugs the user has deeply explored (scroll ≥75%), ordered by recency */
  deeplyViewedSlugs: string[];
  /** Top result slug from the most recent Finder completion */
  finderMatch?: string;
  /** Unix timestamp of last write — used for TTL */
  lastUpdated: number;
}

const DEFAULT_PREFS: SessionPrefs = {
  deeplyViewedSlugs: [],
  lastUpdated: 0,
};

function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function readPrefs(): SessionPrefs {
  if (!isClient()) return { ...DEFAULT_PREFS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PREFS };
    const parsed = JSON.parse(raw) as SessionPrefs;
    // Expire after TTL
    if (Date.now() - (parsed.lastUpdated ?? 0) > TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return { ...DEFAULT_PREFS };
    }
    return { ...DEFAULT_PREFS, ...parsed };
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

function writePrefs(prefs: SessionPrefs): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prefs, lastUpdated: Date.now() }));
  } catch {
    // Storage quota exceeded or denied — silent fail
  }
}

export function setIntensityPref(intensity: 'low' | 'medium' | 'high'): void {
  writePrefs({ ...readPrefs(), preferredIntensity: intensity });
}

export function setDurationPref(duration: '3-day' | '5-day' | 'flexible'): void {
  writePrefs({ ...readPrefs(), preferredDuration: duration });
}

export function recordDeepView(slug: string): void {
  const prefs = readPrefs();
  const updated = [slug, ...prefs.deeplyViewedSlugs.filter((s) => s !== slug)].slice(0, 8);
  writePrefs({ ...prefs, deeplyViewedSlugs: updated });
}

export function recordFinderMatch(slug: string): void {
  writePrefs({ ...readPrefs(), finderMatch: slug });
}

/**
 * Rank a list of retreat slugs by preference affinity.
 * Higher score = more preferred. Returns sorted copy.
 *
 * Scoring:
 *   +4  finderMatch exact
 *   +3  deeplyViewed (first in list = most recent)
 *   +2  preferredIntensity match
 *   +1  preferredDuration match
 */
export function rankByPreference(
  slugs: string[],
  intensityMap: Record<string, string>,
  durationMap: Record<string, string>,
): string[] {
  const prefs = readPrefs();
  const hasAnyPref =
    prefs.preferredIntensity ||
    prefs.preferredDuration ||
    prefs.deeplyViewedSlugs.length > 0 ||
    prefs.finderMatch;

  if (!hasAnyPref) return slugs; // no prefs yet — preserve server order

  const score = (slug: string): number => {
    let s = 0;
    if (prefs.finderMatch === slug) s += 4;
    const viewIdx = prefs.deeplyViewedSlugs.indexOf(slug);
    if (viewIdx !== -1) s += 3 - Math.min(viewIdx, 2); // recency decay
    if (prefs.preferredIntensity && intensityMap[slug] === prefs.preferredIntensity) s += 2;
    if (prefs.preferredDuration && durationMap[slug] === prefs.preferredDuration) s += 1;
    return s;
  };

  return [...slugs].sort((a, b) => score(b) - score(a));
}
