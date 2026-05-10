/**
 * Content Governance Layer
 * Run with: node scripts/content-governance.js
 *
 * Validates registered blog entries without importing TypeScript modules.
 * This avoids ts-node, path aliases, and ESM/CJS runtime issues.
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(process.cwd(), 'content', 'blogs');
const BLOG_INDEX = path.join(BLOG_DIR, 'index.ts');

const VALID_CATEGORIES = [
  'Location Authority',
  'Retreat Decision',
  'Trek Decision',
  'Lifestyle',
];

const REQUIRED_FIELDS = [
  'slug',
  'title',
  'description',
  'category',
  'publishedAt',
  'readingTime',
  'content',
  'targetMoneyPage',
];

const SOFT_WARN_FIELDS = ['lastUpdated'];

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function listBlogTypeScriptFiles() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith('.ts'))
    .map((name) => path.join(BLOG_DIR, name));
}

function extractRegisteredNames(indexText) {
  const match = indexText.match(/ALL_BLOG_POSTS[\s\S]*?=\s*\[([\s\S]*?)\]\s*as const\s*;/);

  if (!match) {
    throw new Error('Could not find ALL_BLOG_POSTS registry array in content/blogs/index.ts');
  }

  return match[1]
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .filter((entry) => /^[A-Za-z_$][\w$]*$/.test(entry));
}

function findMatchingBrace(text, openBraceIndex) {
  let depth = 0;
  let quote = null;
  let templateDepth = 0;
  let escaped = false;

  for (let i = openBraceIndex; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (quote) {
      if (char === '\\') {
        escaped = true;
        continue;
      }

      if (quote === '`' && char === '$' && next === '{') {
        templateDepth += 1;
        i += 1;
        continue;
      }

      if (quote === '`' && templateDepth > 0) {
        if (char === '{') templateDepth += 1;
        if (char === '}') templateDepth -= 1;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }

    if (char === '{') depth += 1;
    if (char === '}') depth -= 1;

    if (depth === 0) {
      return i;
    }
  }

  return -1;
}

function extractObjectBlock(text, variableName) {
  const declarationPattern = new RegExp(`const\\s+${variableName}\\s*(?::[^=]+)?=\\s*\\{`, 'm');
  const match = declarationPattern.exec(text);

  if (!match) return null;

  const openBraceIndex = text.indexOf('{', match.index);
  const closeBraceIndex = findMatchingBrace(text, openBraceIndex);

  if (closeBraceIndex === -1) return null;

  return text.slice(openBraceIndex, closeBraceIndex + 1);
}

function extractStringField(objectText, fieldName) {
  const fieldIndex = objectText.search(new RegExp(`\\b${fieldName}\\s*:`));

  if (fieldIndex === -1) return '';

  const colonIndex = objectText.indexOf(':', fieldIndex);
  let i = colonIndex + 1;

  while (/\s/.test(objectText[i])) i += 1;

  const quote = objectText[i];

  if (quote !== "'" && quote !== '"' && quote !== '`') {
    return '__NON_STRING_VALUE__';
  }

  i += 1;
  let value = '';
  let escaped = false;

  for (; i < objectText.length; i += 1) {
    const char = objectText[i];

    if (escaped) {
      value += char;
      escaped = false;
      continue;
    }

    if (char === '\\') {
      escaped = true;
      value += char;
      continue;
    }

    if (char === quote) {
      return value;
    }

    value += char;
  }

  return '';
}

function buildObjectMap() {
  const map = new Map();

  for (const filePath of listBlogTypeScriptFiles()) {
    const text = readText(filePath);

    const declarationMatches = text.matchAll(/const\s+([A-Za-z_$][\w$]*)\s*(?::[^=]+)?=\s*\{/g);

    for (const match of declarationMatches) {
      const variableName = match[1];
      const block = extractObjectBlock(text, variableName);

      if (block && block.includes('slug:') && block.includes('targetMoneyPage:')) {
        map.set(variableName, {
          variableName,
          filePath,
          objectText: block,
        });
      }
    }
  }

  return map;
}

function validateBlogs() {
  const violations = [];
  const indexText = readText(BLOG_INDEX);
  const registeredNames = extractRegisteredNames(indexText);
  const objectMap = buildObjectMap();

  const posts = [];

  for (const name of registeredNames) {
    const found = objectMap.get(name);

    if (!found) {
      violations.push({
        slug: name,
        level: 'error',
        message: `Registered blog object "${name}" was not found in content/blogs/*.ts`,
      });
      continue;
    }

    const fields = {};
    for (const field of [...REQUIRED_FIELDS, ...SOFT_WARN_FIELDS]) {
      fields[field] = extractStringField(found.objectText, field);
    }

    posts.push({
      registryName: name,
      filePath: found.filePath,
      fields,
    });
  }

  for (const post of posts) {
    const slug = post.fields.slug || post.registryName || '(unknown slug)';

    for (const field of REQUIRED_FIELDS) {
      if (!post.fields[field]) {
        violations.push({
          slug,
          level: 'error',
          message: `Missing required field: "${field}"`,
        });
      }
    }

    if (post.fields.category && !VALID_CATEGORIES.includes(post.fields.category)) {
      violations.push({
        slug,
        level: 'error',
        message: `Invalid category "${post.fields.category}". Allowed: ${VALID_CATEGORIES.join(', ')}`,
      });
    }

    if (post.fields.content && post.fields.content.trim() === 'Content coming soon.') {
      violations.push({
        slug,
        level: 'error',
        message: 'Content is still placeholder text',
      });
    }

    if (post.fields.description && post.fields.description.length < 80) {
      violations.push({
        slug,
        level: 'error',
        message: `Description too short (${post.fields.description.length} chars, minimum 80)`,
      });
    }

    if (post.fields.targetMoneyPage && !post.fields.targetMoneyPage.startsWith('/')) {
      violations.push({
        slug,
        level: 'error',
        message: 'targetMoneyPage must be a relative path starting with /',
      });
    }

    for (const field of SOFT_WARN_FIELDS) {
      if (!post.fields[field]) {
        violations.push({
          slug,
          level: 'warn',
          message: `Missing recommended field: "${field}"`,
        });
      }
    }
  }

  const slugs = posts.map((post) => post.fields.slug).filter(Boolean);
  const seen = new Set();

  for (const slug of slugs) {
    if (seen.has(slug)) {
      violations.push({
        slug,
        level: 'error',
        message: 'Duplicate slug detected',
      });
    }
    seen.add(slug);
  }

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║        CONTENT GOVERNANCE AUDIT — Retreats And Treks     ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  console.log(`  Registered blog entries: ${registeredNames.length}`);
  console.log(`  Validated blog entries:  ${posts.length}\n`);

  const errors = violations.filter((v) => v.level === 'error');
  const warnings = violations.filter((v) => v.level === 'warn');

  if (warnings.length > 0) {
    console.log('  ⚠  Warnings:');
    for (const w of warnings) {
      console.log(`     [${w.slug}] ${w.message}`);
    }
    console.log();
  }

  if (errors.length > 0) {
    console.log('  ✖  Errors (build-blocking):');
    for (const e of errors) {
      console.log(`     [${e.slug}] ${e.message}`);
    }
    console.log('\n  Governance check FAILED. Fix errors before deploying.\n');
    return false;
  }

  console.log('  ✓  All registered blog entries pass governance rules.\n');
  return true;
}

try {
  const passed = validateBlogs();

  if (!passed && process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
} catch (error) {
  console.error('\n  ✖  Governance audit crashed:');
  console.error(`     ${error.message}\n`);
  process.exit(1);
}
