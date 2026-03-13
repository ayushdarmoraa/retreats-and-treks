/**
 * Cleanup script: Fix indentation of inserted buildOgImages lines.
 * Run: node scripts/fix-og-indent.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const APP_DIR = path.join(ROOT, 'app');

function findPageFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findPageFiles(full));
    else if (entry.name === 'page.tsx') results.push(full);
  }
  return results;
}

let fixed = 0;

for (const file of findPageFiles(APP_DIR)) {
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('buildOgImages')) continue;

  const lines = content.split('\n');
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    // Find the "images: buildOgImages(" line
    if (!lines[i].includes('images: buildOgImages(')) continue;

    // Look backwards to find a sibling property line (e.g. type:, url:, description:, title:)
    let siblingIndent = null;
    for (let j = i - 1; j >= 0; j--) {
      const m = lines[j].match(/^(\s+)(title|description|url|type|publishedTime):/);
      if (m) {
        siblingIndent = m[1];
        break;
      }
    }
    if (!siblingIndent) continue;

    // Fix the images line indent
    const trimmedImages = lines[i].trim();
    if (lines[i] !== siblingIndent + trimmedImages) {
      lines[i] = siblingIndent + trimmedImages;
      changed = true;
    }

    // The next line should be the closing brace of openGraph — fix its indent too
    if (i + 1 < lines.length && lines[i + 1].trim().startsWith('}')) {
      // openGraph closing brace should be 2 spaces less than property indent
      const closingIndent = siblingIndent.slice(0, -2);
      const trimmedClose = lines[i + 1].trim();
      if (lines[i + 1] !== closingIndent + trimmedClose) {
        lines[i + 1] = closingIndent + trimmedClose;
        changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(file, lines.join('\n'), 'utf8');
    fixed++;
  }
}

console.log(`Fixed indentation in ${fixed} files.`);
