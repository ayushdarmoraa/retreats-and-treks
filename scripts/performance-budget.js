/**
 * Performance Budget Enforcement
 * Run after `next build` with: node scripts/performance-budget.js
 *
 * Checks:
 * 1. Static prerender coverage — flags any strategic page not statically/prerender generated
 * 2. Client JS bundle size — warns if shared chunks exceed threshold
 * 3. Build manifest sanity — counts total routes and client bundles
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(process.cwd(), '.next');
const ROUTES_MANIFEST = path.join(BUILD_DIR, 'routes-manifest.json');
const BUILD_MANIFEST = path.join(BUILD_DIR, 'build-manifest.json');
const PRERENDER_MANIFEST = path.join(BUILD_DIR, 'prerender-manifest.json');

const MAX_SHARED_BUNDLE_KB = 300;
const MAX_SINGLE_CHUNK_KB = 150;

const MUST_BE_STATIC = [
  '/',
  '/about',
  '/retreats',
  '/retreats/himalayan-retreats',
  '/blog',
  '/topics/retreat-decision',
  '/topics/location-authority',
];

function checkBuildExists() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('\n  ✖  No .next build directory found. Run `next build` first.\n');
    return false;
  }
  return true;
}

function getFileSizeKB(filePath) {
  try {
    const stat = fs.statSync(filePath);
    return stat.size / 1024;
  } catch {
    return 0;
  }
}

function collectStaticPages() {
  const staticPages = new Set();

  if (fs.existsSync(ROUTES_MANIFEST)) {
    const routes = JSON.parse(fs.readFileSync(ROUTES_MANIFEST, 'utf-8'));
    for (const route of routes.staticRoutes ?? []) {
      if (route.page) staticPages.add(route.page);
      if (route.route) staticPages.add(route.route);
    }
  }

  if (fs.existsSync(PRERENDER_MANIFEST)) {
    const prerenderManifest = JSON.parse(fs.readFileSync(PRERENDER_MANIFEST, 'utf-8'));
    for (const page of Object.keys(prerenderManifest.routes ?? {})) {
      staticPages.add(page);
    }
  }

  return staticPages;
}

function run() {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║       PERFORMANCE BUDGET ENFORCEMENT                     ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  if (!checkBuildExists()) {
    process.exit(1);
  }

  let hasErrors = false;

  console.log('  SECTION 1: Static Prerender Coverage\n');

  if (fs.existsSync(ROUTES_MANIFEST) || fs.existsSync(PRERENDER_MANIFEST)) {
    const staticPages = collectStaticPages();

    for (const page of MUST_BE_STATIC) {
      const isStatic = staticPages.has(page);
      const status = isStatic ? '✓ STATIC ' : '⚠ DYNAMIC';
      console.log(`  ${status}  ${page}`);
      if (!isStatic) {
        console.log('            ↑ This page should be statically generated.');
      }
    }
  } else {
    console.log('  ⚠  routes-manifest.json and prerender-manifest.json not found — skipping static check\n');
  }

  console.log('\n  SECTION 2: Client JS Bundle Sizes\n');

  if (fs.existsSync(BUILD_MANIFEST)) {
    const manifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST, 'utf-8'));

    const allChunks = new Set();
    for (const files of Object.values(manifest.pages ?? {})) {
      for (const file of files) {
        if (file.endsWith('.js')) allChunks.add(file);
      }
    }

    let totalSizeKB = 0;
    const oversizedChunks = [];

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
      console.log('     Recommendation:');
      console.log('       • Review client components in components/ for unnecessary imports');
      console.log('       • Ensure heavy libs are only imported in client components');
      console.log('       • Run `next build --debug` for bundle analysis\n');
    }
  } else {
    console.log('  ⚠  build-manifest.json not found — skipping bundle check\n');
  }

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
