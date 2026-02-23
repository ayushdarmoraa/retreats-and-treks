/**
 * Performance Budget Enforcement
 * Run after `next build` with: npx ts-node --project tsconfig.json scripts/performance-budget.ts
 *
 * Checks:
 * 1. Static prerender coverage — flags any strategic page not statically generated
 * 2. Client JS bundle size — warns if shared chunks exceed threshold
 * 3. Build manifest sanity — counts total routes and client bundles
 *
 * Thresholds (adjust as content grows):
 *   MAX_SHARED_BUNDLE_KB  — total shared JS across all pages
 *   MAX_SINGLE_CHUNK_KB   — any single JS chunk
 */

import fs from 'fs';
import path from 'path';

const BUILD_DIR = path.join(process.cwd(), '.next');
const ROUTES_MANIFEST = path.join(BUILD_DIR, 'routes-manifest.json');
const BUILD_MANIFEST = path.join(BUILD_DIR, 'build-manifest.json');

const MAX_SHARED_BUNDLE_KB = 300;  // 300 KB total shared JS
const MAX_SINGLE_CHUNK_KB = 150;   // 150 KB per individual chunk

/** Strategic pages that must be statically generated */
const MUST_BE_STATIC: string[] = [
  '/',
  '/about',
  '/retreats',
  '/retreats/himalayan-retreats',
  '/blog',
  '/topics/retreat-decision',
  '/topics/location-authority',
];

interface RoutesManifest {
  dynamicRoutes?: Array<{ page: string; regex: string }>;
  staticRoutes?: Array<{ page: string; regex: string }>;
}

interface BuildManifest {
  pages: Record<string, string[]>;
  devFiles: string[];
  ampDevFiles: string[];
  polyfillFiles: string[];
  lowPriorityFiles: string[];
  rootMainFiles: string[];
}

function checkBuildExists(): boolean {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('\n  ✖  No .next build directory found. Run `next build` first.\n');
    return false;
  }
  return true;
}

function getFileSizeKB(filePath: string): number {
  try {
    const stat = fs.statSync(filePath);
    return stat.size / 1024;
  } catch {
    return 0;
  }
}

function run() {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║       PERFORMANCE BUDGET ENFORCEMENT                     ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  if (!checkBuildExists()) {
    process.exit(1);
  }

  let hasErrors = false;

  // ── Section 1: Static prerender coverage ─────────────────────────────────
  console.log('  SECTION 1: Static Prerender Coverage\n');

  if (fs.existsSync(ROUTES_MANIFEST)) {
    const routes: RoutesManifest = JSON.parse(fs.readFileSync(ROUTES_MANIFEST, 'utf-8'));
    const staticPages = new Set((routes.staticRoutes ?? []).map((r) => r.page));

    for (const page of MUST_BE_STATIC) {
      const isStatic = staticPages.has(page);
      const status = isStatic ? '✓ STATIC ' : '⚠ DYNAMIC';
      console.log(`  ${status}  ${page}`);
      if (!isStatic) {
        console.log(`            ↑ This page should be statically generated.`);
      }
    }
  } else {
    console.log('  ⚠  routes-manifest.json not found — skipping static check\n');
  }

  // ── Section 2: JS Bundle Size Audit ──────────────────────────────────────
  console.log('\n  SECTION 2: Client JS Bundle Sizes\n');

  if (fs.existsSync(BUILD_MANIFEST)) {
    const manifest: BuildManifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST, 'utf-8'));

    // Collect all unique JS chunks across all pages
    const allChunks = new Set<string>();
    for (const files of Object.values(manifest.pages)) {
      for (const file of files) {
        if (file.endsWith('.js')) allChunks.add(file);
      }
    }

    let totalSizeKB = 0;
    const oversizedChunks: string[] = [];

    for (const chunk of allChunks) {
      const fullPath = path.join(BUILD_DIR, chunk);
      const sizeKB = getFileSizeKB(fullPath);
      totalSizeKB += sizeKB;

      if (sizeKB > MAX_SINGLE_CHUNK_KB) {
        oversizedChunks.push(`${chunk} (${sizeKB.toFixed(1)} KB > ${MAX_SINGLE_CHUNK_KB} KB limit)`);
      }
    }

    const totalStatus = totalSizeKB > MAX_SHARED_BUNDLE_KB ? '⚠ EXCEEDS BUDGET' : '✓ WITHIN BUDGET';
    console.log(`  Total JS (${allChunks.size} chunks): ${totalSizeKB.toFixed(1)} KB — ${totalStatus}`);
    console.log(`  Budget: ${MAX_SHARED_BUNDLE_KB} KB shared / ${MAX_SINGLE_CHUNK_KB} KB per chunk\n`);

    if (oversizedChunks.length > 0) {
      console.log('  ⚠  Oversized chunks:');
      for (const c of oversizedChunks) {
        console.log(`     ${c}`);
      }
      console.log();
    }

    if (totalSizeKB > MAX_SHARED_BUNDLE_KB) {
      hasErrors = true;
      console.log(`  ✖  Total JS bundle exceeds ${MAX_SHARED_BUNDLE_KB} KB budget.\n`);
      console.log(`     Recommendation:`);
      console.log(`       • Review client components in components/ for unnecessary imports`);
      console.log(`       • Ensure heavy libs are only imported in client components`);
      console.log(`       • Run \`next build --debug\` for bundle analysis\n`);
    }
  } else {
    console.log('  ⚠  build-manifest.json not found — skipping bundle check\n');
  }

  // ── Section 3: Summary ───────────────────────────────────────────────────
  console.log('  ──────────────────────────────────────────────────────────');
  if (hasErrors && process.env.NODE_ENV === 'production') {
    console.log('  ✖  Performance budget violations found. Review before deploy.\n');
    process.exit(1);
  } else if (hasErrors) {
    console.log('  ⚠  Performance budget warnings detected. Review before production.\n');
  } else {
    console.log('  ✓  Performance budget checks passed.\n');
  }
}

run();
