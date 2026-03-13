/**
 * Migration script: Add buildOgImages() to all pages with openGraph blocks.
 * 
 * What it does:
 * 1. Finds all .tsx page files under app/ that have openGraph blocks
 * 2. Skips files that already use buildOgImages
 * 3. Updates imports to include buildOgImages
 * 4. Adds images: buildOgImages(title) to each openGraph block
 * 
 * Run: node scripts/migrate-og-images.mjs --dry-run   (preview changes)
 * Run: node scripts/migrate-og-images.mjs              (apply changes)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const APP_DIR = path.join(ROOT, 'app');

const DRY_RUN = process.argv.includes('--dry-run');

function findPageFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPageFiles(full));
    } else if (entry.name === 'page.tsx') {
      results.push(full);
    }
  }
  return results;
}

function extractOgTitle(ogBlock) {
  // Match title: VALUE patterns
  // Pattern 1: title: 'string literal' or title: "string literal"
  const stringMatch = ogBlock.match(/title:\s*(['"`])(.*?)\1/);
  if (stringMatch) return stringMatch[0].replace(/^title:\s*/, '').trim();

  // Pattern 2: title: variable.property (e.g., blog.title, PAGE.title, elPage.h1)
  const varMatch = ogBlock.match(/title:\s*([a-zA-Z_$][\w$.]*)/);
  if (varMatch) return varMatch[1];

  // Pattern 3: shorthand title (just `title,` or `title`)
  const shorthandMatch = ogBlock.match(/^\s*title[\s,]/m);
  if (shorthandMatch) return 'title';

  // Pattern 4: template literal
  const templateMatch = ogBlock.match(/title:\s*(`[^`]+`)/);
  if (templateMatch) return templateMatch[1];

  return null;
}

function processFile(filePath) {
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/');
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip layout.tsx (root layout has its own OG config)
  if (relPath === 'app/layout.tsx') return null;

  // Skip if no openGraph
  if (!content.includes('openGraph')) return null;

  // Skip if already uses buildOgImages
  if (content.includes('buildOgImages')) return null;

  const changes = [];

  // Step 1: Update or add import for buildOgImages
  const importRegex = /import\s*\{([^}]*buildCanonicalUrl[^}]*)\}\s*from\s*['"]@\/components\/seo\/Metadata['"]/;
  const importMatch = content.match(importRegex);

  if (importMatch) {
    const currentImports = importMatch[1];
    if (!currentImports.includes('buildOgImages')) {
      const newImports = currentImports.replace(
        'buildCanonicalUrl',
        'buildCanonicalUrl, buildOgImages'
      );
      content = content.replace(importMatch[0], importMatch[0].replace(currentImports, newImports));
      changes.push('Updated import to include buildOgImages');
    }
  } else {
    // No existing import from Metadata module — add one at top after other imports
    const lastImportIdx = content.lastIndexOf('\nimport ');
    if (lastImportIdx !== -1) {
      const lineEnd = content.indexOf('\n', lastImportIdx + 1);
      content = content.slice(0, lineEnd + 1) +
        "import { buildOgImages } from '@/components/seo/Metadata';\n" +
        content.slice(lineEnd + 1);
      changes.push('Added buildOgImages import');
    }
  }

  // Step 2: Find each openGraph block and add images
  // We need to handle nested braces carefully
  const ogMatches = [...content.matchAll(/openGraph:\s*\{/g)];

  for (let i = ogMatches.length - 1; i >= 0; i--) {
    const match = ogMatches[i];
    const startIdx = match.index + match[0].length;

    // Find the matching closing brace
    let braceCount = 1;
    let pos = startIdx;
    while (pos < content.length && braceCount > 0) {
      if (content[pos] === '{') braceCount++;
      if (content[pos] === '}') braceCount--;
      pos++;
    }

    const ogBlockContent = content.slice(startIdx, pos - 1);

    // Skip if images already exists
    if (ogBlockContent.includes('images:') || ogBlockContent.includes('images :')) continue;

    // Extract the title expression
    const ogTitle = extractOgTitle(ogBlockContent);
    if (!ogTitle) {
      console.warn(`  ⚠ Could not extract OG title from ${relPath}`);
      continue;
    }

    // Find the last property line before the closing brace
    // Insert images: buildOgImages(title) before the closing brace
    const closingBraceIdx = pos - 1;

    // Detect indentation from existing properties
    const indentMatch = ogBlockContent.match(/\n(\s+)\w/);
    const indent = indentMatch ? indentMatch[1] : '      ';

    // Check if the last character before closing brace needs a comma
    const beforeClose = content.slice(startIdx, closingBraceIdx).trimEnd();
    const needsComma = beforeClose.length > 0 && !beforeClose.endsWith(',');

    let insertion = '';
    if (needsComma) {
      // Find the last non-whitespace character position
      const lastContentPos = startIdx + beforeClose.length;
      content = content.slice(0, lastContentPos) + ',' +
        content.slice(lastContentPos, closingBraceIdx) +
        `${indent}images: buildOgImages(${ogTitle}),\n` +
        content.slice(closingBraceIdx);
    } else {
      content = content.slice(0, closingBraceIdx) +
        `${indent}images: buildOgImages(${ogTitle}),\n` +
        content.slice(closingBraceIdx);
    }

    changes.push(`Added images: buildOgImages(${ogTitle})`);
  }

  if (changes.length === 0) return null;

  return { relPath, content, changes };
}

// Main
const files = findPageFiles(APP_DIR);
const results = [];
const skipped = [];

for (const file of files) {
  const result = processFile(file);
  if (result) {
    results.push(result);
  }
}

console.log(`\n📊 Migration Summary`);
console.log(`   Found ${files.length} page files`);
console.log(`   ${results.length} files to update\n`);

for (const { relPath, content, changes } of results) {
  console.log(`  ✏️  ${relPath}`);
  for (const change of changes) {
    console.log(`      ${change}`);
  }

  if (!DRY_RUN) {
    fs.writeFileSync(path.join(ROOT, relPath), content, 'utf8');
  }
}

if (DRY_RUN) {
  console.log(`\n🔍 DRY RUN — no files were modified. Remove --dry-run to apply.`);
} else {
  console.log(`\n✅ ${results.length} files updated successfully.`);
}
