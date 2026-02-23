/**
 * Conversion Telemetry Report
 * Run with: npx ts-node --project tsconfig.json scripts/analytics-report.ts
 *
 * Reads data/events.jsonl and outputs:
 *   1. Total event counts by type
 *   2. Top conversion paths (from → to)
 *   3. Top destination pages (most linked to)
 *   4. Top source pages (most clicks originating from)
 *   5. Recent 10 events (for debugging)
 */

import fs from 'fs';
import path from 'path';

const EVENT_LOG = path.join(process.cwd(), 'data', 'events.jsonl');

interface TrackEvent {
  event: string;
  from: string;
  to?: string;
  meta?: Record<string, unknown>;
  ts: string;
}

function readEvents(): TrackEvent[] {
  if (!fs.existsSync(EVENT_LOG)) {
    console.log('\n  No events log found. No events recorded yet.\n');
    return [];
  }
  return fs
    .readFileSync(EVENT_LOG, 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line) as TrackEvent;
      } catch {
        return null;
      }
    })
    .filter((e): e is TrackEvent => e !== null);
}

function topN<T extends string>(map: Map<T, number>, n: number): [T, number][] {
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

function run() {
  const events = readEvents();

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║        CONVERSION TELEMETRY REPORT                       ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  console.log(`  Total events recorded: ${events.length}\n`);

  if (events.length === 0) return;

  // ── 1. Event type counts ──────────────────────────────────────────────────
  console.log('  BY EVENT TYPE\n');
  const byType = new Map<string, number>();
  for (const e of events) byType.set(e.event, (byType.get(e.event) ?? 0) + 1);
  for (const [type, count] of [...byType.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(count).padStart(5)}  ${type}`);
  }
  console.log();

  // ── 1b. Behavioral breakdown ──────────────────────────────────────────────
  const behavioralTypes = ['scroll_depth', 'faq_expand', 'comparison_sort', 'comparison_filter', 'finder_complete'];
  const behavioralEvents = events.filter((e) => behavioralTypes.includes(e.event));
  if (behavioralEvents.length > 0) {
    console.log('  BEHAVIORAL EVENTS DETAIL\n');

    const scrollEvents = behavioralEvents.filter((e) => e.event === 'scroll_depth');
    if (scrollEvents.length > 0) {
      const depthCounts = new Map<number, number>();
      for (const e of scrollEvents) {
        const d = (e.meta?.depth as number) ?? 0;
        depthCounts.set(d, (depthCounts.get(d) ?? 0) + 1);
      }
      console.log('  Scroll depth milestones:');
      for (const [depth, count] of [...depthCounts.entries()].sort((a, b) => a[0] - b[0])) {
        console.log(`  ${String(count).padStart(5)}  ${depth}% scroll depth`);
      }
      console.log();
    }

    const faqEvents = behavioralEvents.filter((e) => e.event === 'faq_expand');
    if (faqEvents.length > 0) {
      const faqCounts = new Map<string, number>();
      for (const e of faqEvents) {
        const q = (e.meta?.question as string ?? 'unknown').slice(0, 60);
        faqCounts.set(q, (faqCounts.get(q) ?? 0) + 1);
      }
      console.log('  Most expanded FAQ questions:');
      for (const [q, count] of topN(faqCounts, 5)) {
        console.log(`  ${String(count).padStart(5)}  ${q}`);
      }
      console.log();
    }
  }

  // ── 2. Top conversion paths ───────────────────────────────────────────────
  const navEvents = events.filter((e) => e.to);
  console.log('  TOP CONVERSION PATHS (from → to)\n');
  const byPath = new Map<string, number>();
  for (const e of navEvents) {
    const key = `${e.from}  →  ${e.to}`;
    byPath.set(key, (byPath.get(key) ?? 0) + 1);
  }
  for (const [path, count] of topN(byPath, 10)) {
    console.log(`  ${String(count).padStart(5)}  ${path}`);
  }
  console.log();

  // ── 3. Top destination pages ──────────────────────────────────────────────
  console.log('  TOP DESTINATION PAGES\n');
  const byDest = new Map<string, number>();
  for (const e of navEvents) {
    if (e.to) byDest.set(e.to, (byDest.get(e.to) ?? 0) + 1);
  }
  for (const [dest, count] of topN(byDest, 8)) {
    console.log(`  ${String(count).padStart(5)}  ${dest}`);
  }
  console.log();

  // ── 4. Top source pages ───────────────────────────────────────────────────
  console.log('  TOP SOURCE PAGES\n');
  const bySrc = new Map<string, number>();
  for (const e of events) bySrc.set(e.from, (bySrc.get(e.from) ?? 0) + 1);
  for (const [src, count] of topN(bySrc, 8)) {
    console.log(`  ${String(count).padStart(5)}  ${src}`);
  }
  console.log();

  // ── 5. Recent 10 events ───────────────────────────────────────────────────
  console.log('  RECENT 10 EVENTS\n');
  const recent = events.slice(-10).reverse();
  for (const e of recent) {
    const d = new Date(e.ts).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    console.log(`  [${d}]  ${e.event}  ${e.from}  →  ${e.to}`);
  }
  console.log();
}

run();
