/**
 * Content Governance Layer
 * Run with: npx ts-node --project tsconfig.json scripts/content-governance.ts
 *
 * Validates all blog registry entries against structural rules.
 * Warns on soft violations. Exits with code 1 on hard violations.
 *
 * In next.config.ts you can call this at build time.
 */

import { ALL_BLOG_POSTS } from '../content/blogs';
import type { BlogContent } from '../types/content';

const VALID_CATEGORIES: BlogContent['category'][] = [
  'Location Authority',
  'Retreat Decision',
  'Trek Decision',
  'Lifestyle',
];

const REQUIRED_FIELDS: (keyof BlogContent)[] = [
  'slug',
  'title',
  'description',
  'category',
  'publishedAt',
  'readingTime',
  'content',
  'targetMoneyPage',
];

const SOFT_WARN_FIELDS: (keyof BlogContent)[] = ['lastUpdated'];

interface Violation {
  slug: string;
  level: 'error' | 'warn';
  message: string;
}

function validateBlogs(): boolean {
  const violations: Violation[] = [];

  for (const post of ALL_BLOG_POSTS) {
    const slug = post.slug || '(unknown slug)';

    // Hard: required fields present
    for (const field of REQUIRED_FIELDS) {
      if (!post[field]) {
        violations.push({ slug, level: 'error', message: `Missing required field: "${field}"` });
      }
    }

    // Hard: category must be whitelisted
    if (post.category && !VALID_CATEGORIES.includes(post.category)) {
      violations.push({
        slug,
        level: 'error',
        message: `Invalid category "${post.category}". Allowed: ${VALID_CATEGORIES.join(', ')}`,
      });
    }

    // Hard: content must not be placeholder
    if (post.content && post.content.trim() === 'Content coming soon.') {
      violations.push({ slug, level: 'error', message: `Content is still placeholder text` });
    }

    // Hard: description must be >= 80 chars (too short = low quality)
    if (post.description && post.description.length < 80) {
      violations.push({
        slug,
        level: 'error',
        message: `Description too short (${post.description.length} chars, minimum 80)`,
      });
    }

    // Hard: targetMoneyPage must start with /
    if (post.targetMoneyPage && !post.targetMoneyPage.startsWith('/')) {
      violations.push({
        slug,
        level: 'error',
        message: `targetMoneyPage must be a relative path starting with /`,
      });
    }

    // Soft: lastUpdated recommended
    for (const field of SOFT_WARN_FIELDS) {
      if (!post[field]) {
        violations.push({ slug, level: 'warn', message: `Missing recommended field: "${field}"` });
      }
    }
  }

  // Duplicate slug check
  const slugs = ALL_BLOG_POSTS.map((p) => p.slug);
  const seen = new Set<string>();
  for (const slug of slugs) {
    if (seen.has(slug)) {
      violations.push({ slug, level: 'error', message: `Duplicate slug detected` });
    }
    seen.add(slug);
  }

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║        CONTENT GOVERNANCE AUDIT — Retreats And Treks     ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  console.log(`  Validated ${ALL_BLOG_POSTS.length} blog entries.\n`);

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

  console.log('  ✓  All blog entries pass governance rules.\n');
  return true;
}

const passed = validateBlogs();
if (!passed && process.env.NODE_ENV === 'production') {
  process.exit(1);
}
