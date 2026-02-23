/**
 * Internal Link Density + Orphan Page Audit
 * Run with: npx ts-node --project tsconfig.json scripts/link-audit.ts
 *
 * 1. Counts inbound internal links per strategic URL.
 *    Flags pages with fewer than MIN_LINKS inbound references.
 *
 * 2. Orphan detection: flags strategic pages that appear in the
 *    strategic list but have 0 inbound links from any source file.
 *
 * 3. Sitemap coverage check: validates that all strategic pages
 *    appear in sitemap.ts source.
 */

import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(process.cwd(), 'app');
const COMPONENTS_DIR = path.join(process.cwd(), 'components');
const SITEMAP_FILE = path.join(process.cwd(), 'app', 'sitemap.ts');
const MIN_LINKS = 3;

/** Strategic pages requiring strong internal link density */
const STRATEGIC_PATHS = [
  '/retreats/himalayan-retreats',
  '/retreats',
  '/retreats/chakrata',
  '/retreats/sankri',
  '/retreats/munsiyari',
  '/retreats/rishikesh',
  '/retreats/journeys/rest-and-reset',
  '/retreats/journeys/burnout-recovery',
  '/retreats/journeys/yoga-and-movement',
  '/retreats/journeys/meditation-and-silence',
  '/retreats/journeys/weekend-retreat',
  '/retreats/journeys/sound-healing',
  '/retreats/journeys/art-and-creative',
  '/retreats/journeys/private-and-custom',
  '/topics/retreat-decision',
  '/topics/location-authority',
  '/about',
  '/blog',
  '/treks',
];

function getAllSourceFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllSourceFiles(fullPath));
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

function countLinksToPath(
  files: string[],
  targetPath: string
): { count: number; sources: string[] } {
  const sources: string[] = [];
  const escaped = targetPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`href=["'\`]${escaped}["'\`/]`, 'g');

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    if (pattern.test(content)) {
      sources.push(file.replace(process.cwd(), ''));
    }
    pattern.lastIndex = 0;
  }
  return { count: sources.length, sources };
}

function checkSitemapCoverage(paths: string[]): string[] {
  const sitemapContent = fs.readFileSync(SITEMAP_FILE, 'utf-8');
  return paths.filter((p) => !sitemapContent.includes(`'${p}'`) && !sitemapContent.includes(`"${p}"`));
}

function run() {
  const allFiles = [
    ...getAllSourceFiles(APP_DIR),
    ...getAllSourceFiles(COMPONENTS_DIR),
  ];

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║     INTERNAL LINK DENSITY + ORPHAN AUDIT                 ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  let hasErrors = false;

  // ── Section 1: Link density ──────────────────────────────────────────────
  console.log('  SECTION 1: Inbound Link Density\n');

  const orphans: string[] = [];
  for (const targetPath of STRATEGIC_PATHS) {
    const { count } = countLinksToPath(allFiles, targetPath);
    const isOrphan = count === 0;
    const isWeak = count > 0 && count < MIN_LINKS;
    const status = isOrphan ? '✖ ORPHAN' : isWeak ? '⚠ WEAK  ' : '✓ OK    ';
    const flag = isOrphan ? ' ← 0 inbound links' : isWeak ? ` ← only ${count} inbound links` : '';

    console.log(`  ${status}  [${String(count).padStart(2)}]  ${targetPath}${flag}`);

    if (isOrphan) {
      orphans.push(targetPath);
      hasErrors = true;
    }
  }

  // ── Section 2: Sitemap coverage ─────────────────────────────────────────
  console.log('\n  SECTION 2: Sitemap Coverage\n');

  const missingSitemap = checkSitemapCoverage(STRATEGIC_PATHS);
  if (missingSitemap.length === 0) {
    console.log('  ✓ All strategic pages appear in sitemap.ts\n');
  } else {
    for (const p of missingSitemap) {
      console.log(`  ⚠ MISSING FROM SITEMAP: ${p}`);
    }
    console.log();
  }

  // ── Summary ──────────────────────────────────────────────────────────────
  console.log('  ──────────────────────────────────────────────────────────');
  if (orphans.length > 0) {
    console.log(`  ✖  ${orphans.length} orphaned strategic page(s) detected.`);
    console.log('     Add at least one inbound internal link to each.\n');
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  } else {
    console.log('  ✓  No orphan pages detected among strategic paths.\n');
  }
}

run();
