#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const EXT_WHITELIST = new Set(['.tsx', '.ts', '.jsx', '.js', '.css', '.mjs', '.scss']);
const SKIP_DIRS = new Set(['node_modules', '.git', '.next']);

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(full, cb);
    } else if (e.isFile()) {
      cb(full);
    }
  }
}

function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!EXT_WHITELIST.has(ext)) return;
  // don't modify this script file itself
  if (file.endsWith('scripts\\replace-small-text.js') || file.endsWith('scripts/replace-small-text.js')) return;

  let content = fs.readFileSync(file, 'utf8');
  // quick bail: nothing to do (also check for broken inline-style commas)
  const needsRemFix = content.includes('0.56rem') || content.includes('0.55rem');
  const needsOpacityFix = content.includes('opacity:');
  const brokenInlineComma = /color\s*:\s*(['\"][^'\"]*['\"]|#[0-9a-fA-F]{3,6}|var\([^)]*\))\s+[A-Za-z_$][\w$]*\s*:/.test(content);
  if (!needsRemFix && !needsOpacityFix && !brokenInlineComma) return;

  const original = content;

  // 1) Replace any 0.55rem / 0.56rem occurrences (font-size, padding, gap, margins etc.)
  content = content.replace(/0\.(?:55|56)rem/g, '0.75rem');

  // 2) Remove fractional opacity declarations (e.g. 0.5, 0.15, .6) but leave opacity: 1
  content = content.replace(/opacity\s*:\s*(?:0(?:\.\d+)?|\.\d+)\s*(?:;|,)?/g, '');

  // 3) CSS color replacement (for CSS blocks): color: var(--color-primary) -> color: #374151;
  content = content.replace(/color\s*:\s*var\(--color-primary\)\s*;?/g, 'color: #374151;');

  // 4) Inline-style object color replacements: keep quotes and commas
  content = content.replace(/color\s*:\s*(['\"])var\(--color-primary\)\1/g, "color: '#374151'");
  content = content.replace(/color\s*:\s*(['\"])rgba\(\s*15\s*,\s*118\s*,\s*110\s*,\s*0\.(?:7|8)\s*\)\1/g, "color: '#374151'");

  // 5) CSS rgba replacement
  content = content.replace(/rgba\(\s*15\s*,\s*118\s*,\s*110\s*,\s*0\.(?:7|8)\s*\)/g, '#374151');

  // 6) Fix missing commas in inline style objects where color was followed directly by another property
  if (ext === '.tsx' || ext === '.ts' || ext === '.jsx' || ext === '.js') {
    content = content.replace(/(color\s*:\s*(['"][^'"]*['"]|#[0-9a-fA-F]{3,6}|var\([^)]*\)))\s+([A-Za-z_$][\w$]*\s*:)/g, '$1, $3');
    // Fix cases where numeric property values lack a trailing comma (e.g., "fontWeight: 600 marginBottom")
    content = content.replace(/(fontWeight\s*:\s*\d+)\s+([A-Za-z_$][\w$]*\s*:)/g, '$1, $2');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', path.relative(ROOT, file));
  }
}

console.log('Scanning for 0.55rem / 0.56rem occurrences...');
walk(ROOT, processFile);
console.log('Done');
