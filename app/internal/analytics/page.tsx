/**
 * /internal/analytics — Dev-only telemetry dashboard
 *
 * Blocked in production via metadata robots noindex + env check.
 * Shows conversion funnel, scroll depth heatmap, FAQ signals, finder stats.
 */

import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internal Analytics — Retreats And Treks',
  robots: { index: false, follow: false },
};

// ── Types ─────────────────────────────────────────────────────────────────────

interface TrackEvent {
  event: string;
  from: string;
  to?: string;
  meta?: Record<string, unknown>;
  ts: string;
}

// ── Data loading ──────────────────────────────────────────────────────────────

function loadEvents(): TrackEvent[] {
  const logPath = path.join(process.cwd(), 'data', 'events.jsonl');
  if (!fs.existsSync(logPath)) return [];
  return fs
    .readFileSync(logPath, 'utf-8')
    .split('\n')
    .filter(Boolean)
    .flatMap((line) => {
      try { return [JSON.parse(line) as TrackEvent]; } catch { return []; }
    });
}

function topN<K extends string>(map: Map<K, number>, n: number): [K, number][] {
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

// ── Stat computation ──────────────────────────────────────────────────────────

function computeStats(events: TrackEvent[]) {
  const byType = new Map<string, number>();
  for (const e of events) byType.set(e.event, (byType.get(e.event) ?? 0) + 1);

  const navTypes = ['topic_to_pillar', 'blog_to_journey', 'comparison_to_journey', 'pillar_to_journey', 'matrix_to_journey'];
  const navEvents = events.filter((e) => navTypes.includes(e.event));

  // Funnel order: awareness → consideration → intent
  const funnelOrder = ['topic_to_pillar', 'blog_to_journey', 'comparison_to_journey', 'pillar_to_journey', 'matrix_to_journey'];
  const funnelCounts = funnelOrder.map((t) => ({ type: t, count: byType.get(t) ?? 0 }));

  // Scroll depth per page
  const scrollEvents = events.filter((e) => e.event === 'scroll_depth');
  const scrollByPage = new Map<string, Map<number, number>>();
  for (const e of scrollEvents) {
    const depth = (e.meta?.depth as number) ?? 0;
    if (!scrollByPage.has(e.from)) scrollByPage.set(e.from, new Map());
    const pageMap = scrollByPage.get(e.from)!;
    pageMap.set(depth, (pageMap.get(depth) ?? 0) + 1);
  }

  // FAQ expansions
  const faqEvents = events.filter((e) => e.event === 'faq_expand');
  const faqByQ = new Map<string, number>();
  for (const e of faqEvents) {
    const q = (e.meta?.question as string ?? 'unknown').slice(0, 70);
    faqByQ.set(q, (faqByQ.get(q) ?? 0) + 1);
  }

  // Finder stats
  const finderEvents = events.filter((e) => e.event === 'finder_complete');
  const finderByResult = new Map<string, number>();
  for (const e of finderEvents) {
    const r = (e.meta?.result as string) ?? 'unknown';
    finderByResult.set(r, (finderByResult.get(r) ?? 0) + 1);
  }

  // Top destination pages
  const byDest = new Map<string, number>();
  for (const e of navEvents) if (e.to) byDest.set(e.to, (byDest.get(e.to) ?? 0) + 1);

  // Top source pages
  const bySrc = new Map<string, number>();
  for (const e of navEvents) bySrc.set(e.from, (bySrc.get(e.from) ?? 0) + 1);

  // Sort/filter interactions
  const sortEvents = events.filter((e) => e.event === 'comparison_sort');
  const sortByKey = new Map<string, number>();
  for (const e of sortEvents) {
    const k = (e.meta?.key as string) ?? 'unknown';
    sortByKey.set(k, (sortByKey.get(k) ?? 0) + 1);
  }

  // Recent 20
  const recent = events.slice(-20).reverse();

  return {
    total: events.length,
    byType,
    funnelCounts,
    scrollByPage,
    faqByQ,
    finderEvents: finderEvents.length,
    finderByResult,
    byDest,
    bySrc,
    sortByKey,
    recent,
  };
}

// ── Styles ────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '1.25rem',
  marginBottom: '1.5rem',
  background: '#fafafa',
};

const th: React.CSSProperties = {
  textAlign: 'left', padding: '0.5rem 0.75rem', fontWeight: 600,
  fontSize: '0.8rem', borderBottom: '2px solid #e0e0e0', background: '#f0f0f0',
};

const td: React.CSSProperties = {
  padding: '0.45rem 0.75rem', fontSize: '0.85rem',
  borderBottom: '1px solid #e0e0e0', verticalAlign: 'top',
};

function Bar({ value, max, color = '#2d6a4f' }: { value: number; max: number; color?: string }) {
  if (max === 0) return <span style={{ color: '#aaa', fontSize: '0.8rem' }}>—</span>;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ flex: 1, height: '10px', background: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
        <div style={{ width: `${Math.round((value / max) * 100)}%`, height: '100%', background: color, borderRadius: '5px' }} />
      </div>
      <span style={{ fontSize: '0.8rem', fontWeight: 600, minWidth: '2rem', textAlign: 'right' }}>{value}</span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AnalyticsDashboard() {
  if (process.env.NODE_ENV === 'production' && !process.env.INTERNAL_ANALYTICS_KEY) {
    return notFound();
  }

  const events = loadEvents();
  const s = computeStats(events);

  const funnelMax = Math.max(...s.funnelCounts.map((f) => f.count), 1);
  const faqTop = topN(s.faqByQ, 8);
  const destTop = topN(s.byDest, 8);
  const srcTop = topN(s.bySrc, 8);
  const finderTop = topN(s.finderByResult, 6);
  const sortTop = topN(s.sortByKey, 6);
  const scrollPages = [...s.scrollByPage.entries()].slice(0, 8);

  return (
    <main style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Conversion Telemetry Dashboard</h1>
        <span style={{ fontSize: '0.85rem', color: '#888' }}>
          {s.total} total events · dev-only · {new Date().toLocaleDateString('en-IN')}
        </span>
      </div>

      {events.length === 0 && (
        <div style={{ ...card, color: '#888', textAlign: 'center', padding: '3rem' }}>
          No events recorded yet. Interact with the site to generate telemetry.
        </div>
      )}

      {events.length > 0 && (
        <>
          {/* ── 1. Conversion Funnel ───────────────────────── */}
          <div style={card}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Conversion Funnel</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ ...th, width: '35%' }}>Stage</th>
                  <th style={th}>Volume</th>
                </tr>
              </thead>
              <tbody>
                {s.funnelCounts.map(({ type, count }) => (
                  <tr key={type}>
                    <td style={{ ...td, fontFamily: 'monospace', fontSize: '0.8rem' }}>{type}</td>
                    <td style={td}><Bar value={count} max={funnelMax} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── 2. Finder Stats ──────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={card}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Finder Completions</h2>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#2d6a4f', marginBottom: '0.5rem' }}>{s.finderEvents}</p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr><th style={th}>Top Result</th><th style={{ ...th, width: '4rem' }}>Count</th></tr></thead>
                <tbody>
                  {finderTop.map(([result, count]) => (
                    <tr key={result}>
                      <td style={{ ...td, fontFamily: 'monospace', fontSize: '0.8rem' }}>{result}</td>
                      <td style={{ ...td, fontWeight: 600 }}>{count}</td>
                    </tr>
                  ))}
                  {finderTop.length === 0 && (
                    <tr><td colSpan={2} style={{ ...td, color: '#aaa' }}>No finder completions yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div style={card}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Matrix Sort Interactions</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr><th style={th}>Column Sorted</th><th style={{ ...th, width: '4rem' }}>Count</th></tr></thead>
                <tbody>
                  {sortTop.map(([key, count]) => (
                    <tr key={key}>
                      <td style={{ ...td, fontFamily: 'monospace', fontSize: '0.8rem' }}>{key}</td>
                      <td style={{ ...td, fontWeight: 600 }}>{count}</td>
                    </tr>
                  ))}
                  {sortTop.length === 0 && (
                    <tr><td colSpan={2} style={{ ...td, color: '#aaa' }}>No sorts recorded yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 3. Top Destinations + Sources ──────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={card}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Top Destination Pages</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr><th style={th}>Page</th><th style={{ ...th, width: '4rem' }}>Clicks</th></tr></thead>
                <tbody>
                  {destTop.map(([dest, count]) => (
                    <tr key={dest}>
                      <td style={{ ...td, fontSize: '0.8rem', wordBreak: 'break-all' }}>{dest}</td>
                      <td style={{ ...td, fontWeight: 600 }}>{count}</td>
                    </tr>
                  ))}
                  {destTop.length === 0 && <tr><td colSpan={2} style={{ ...td, color: '#aaa' }}>No data</td></tr>}
                </tbody>
              </table>
            </div>

            <div style={card}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Top Source Pages</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr><th style={th}>Page</th><th style={{ ...th, width: '4rem' }}>Clicks</th></tr></thead>
                <tbody>
                  {srcTop.map(([src, count]) => (
                    <tr key={src}>
                      <td style={{ ...td, fontSize: '0.8rem', wordBreak: 'break-all' }}>{src}</td>
                      <td style={{ ...td, fontWeight: 600 }}>{count}</td>
                    </tr>
                  ))}
                  {srcTop.length === 0 && <tr><td colSpan={2} style={{ ...td, color: '#aaa' }}>No data</td></tr>}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 4. Scroll Depth Heatmap ──────────────────────────── */}
          <div style={card}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Scroll Depth by Page</h2>
            {scrollPages.length === 0 ? (
              <p style={{ color: '#aaa', fontSize: '0.875rem' }}>No scroll data yet.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ ...th, width: '35%' }}>Page</th>
                    <th style={th}>25%</th>
                    <th style={th}>50%</th>
                    <th style={th}>75%</th>
                    <th style={th}>90%</th>
                  </tr>
                </thead>
                <tbody>
                  {scrollPages.map(([page, depthMap]) => {
                    const d25 = depthMap.get(25) ?? 0;
                    const d50 = depthMap.get(50) ?? 0;
                    const d75 = depthMap.get(75) ?? 0;
                    const d90 = depthMap.get(90) ?? 0;
                    const maxD = Math.max(d25, d50, d75, d90, 1);
                    const cell = (v: number) => (
                      <td style={{ ...td, minWidth: '80px' }}>
                        <Bar value={v} max={maxD} color={v > 0 ? '#2d6a4f' : '#e0e0e0'} />
                      </td>
                    );
                    return (
                      <tr key={page}>
                        <td style={{ ...td, fontSize: '0.8rem', wordBreak: 'break-all' }}>{page}</td>
                        {cell(d25)}{cell(d50)}{cell(d75)}{cell(d90)}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* ── 5. FAQ Engagement ─────────────────────────────────── */}
          <div style={card}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Most Expanded FAQ Questions</h2>
            {faqTop.length === 0 ? (
              <p style={{ color: '#aaa', fontSize: '0.875rem' }}>No FAQ interactions yet.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr><th style={th}>Question</th><th style={{ ...th, width: '5rem' }}>Expansions</th></tr></thead>
                <tbody>
                  {faqTop.map(([q, count]) => (
                    <tr key={q}>
                      <td style={{ ...td, fontSize: '0.8rem' }}>{q}</td>
                      <td style={{ ...td, fontWeight: 600 }}>{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* ── 6. Recent events ─────────────────────────────────── */}
          <div style={card}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Recent 20 Events</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>Time</th>
                  <th style={th}>Event</th>
                  <th style={th}>From</th>
                  <th style={th}>To / Meta</th>
                </tr>
              </thead>
              <tbody>
                {s.recent.map((e, i) => (
                  <tr key={i}>
                    <td style={{ ...td, whiteSpace: 'nowrap', fontSize: '0.75rem', color: '#888' }}>
                      {new Date(e.ts).toLocaleTimeString('en-IN')}
                    </td>
                    <td style={{ ...td, fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 600 }}>{e.event}</td>
                    <td style={{ ...td, fontSize: '0.75rem', wordBreak: 'break-all', color: '#555' }}>{e.from}</td>
                    <td style={{ ...td, fontSize: '0.75rem', wordBreak: 'break-all', color: '#555' }}>
                      {e.to ?? (e.meta ? JSON.stringify(e.meta) : '—')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
