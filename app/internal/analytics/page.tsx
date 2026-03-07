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
import { getAllExperiencePageSlugs } from '@/config/experiencePages';
import { getAllExperienceLocationSlugs } from '@/config/experienceLocationPages';
import { getAllItinerarySlugs } from '@/config/itineraryPages';
import { getAllRetreatProgramSlugs } from '@/config/retreatProgramEvents';

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

  // ── Booking Proximity Stats ─────────────────────────────────────────────────

  // Page-type funnel: classify every event's `from` page into a funnel stage
  const authoritySlugs = new Set(getAllExperiencePageSlugs().map((s) => `/${s}`));
  const elSlugs = new Set(getAllExperienceLocationSlugs().map((s) => `/${s}`));
  const itSlugs = new Set(getAllItinerarySlugs().map((s) => `/${s}`));
  const programSlugs = new Set(getAllRetreatProgramSlugs().map((s) => `/${s}`));
  const locationPattern = /^\/locations\/[a-z-]+$/;

  function classifyPage(pagePath: string): string | null {
    if (authoritySlugs.has(pagePath)) return 'authority';
    if (locationPattern.test(pagePath)) return 'location';
    if (elSlugs.has(pagePath)) return 'experience-location';
    if (itSlugs.has(pagePath)) return 'itinerary';
    if (programSlugs.has(pagePath)) return 'program-event';
    if (pagePath === '/retreat-calendar' || pagePath === '/find-your-retreat') return 'conversion-hub';
    return null;
  }

  const pageTypeFunnel = new Map<string, number>();
  for (const e of events) {
    const stage = classifyPage(e.from);
    if (stage) pageTypeFunnel.set(stage, (pageTypeFunnel.get(stage) ?? 0) + 1);
    // Also count destination pages for navigation events
    if (e.to) {
      const toStage = classifyPage(e.to);
      if (toStage) pageTypeFunnel.set(toStage, (pageTypeFunnel.get(toStage) ?? 0) + 1);
    }
  }

  const funnelStages = [
    'authority', 'location', 'experience-location', 'itinerary', 'program-event', 'conversion-hub',
  ];

  // Micro-commitment signals per page
  const microEvents = events.filter((e) => ['micro_save', 'micro_share', 'micro_download'].includes(e.event));
  const microByPage = new Map<string, { saves: number; shares: number; downloads: number }>();
  for (const e of microEvents) {
    if (!microByPage.has(e.from)) microByPage.set(e.from, { saves: 0, shares: 0, downloads: 0 });
    const entry = microByPage.get(e.from)!;
    if (e.event === 'micro_save') entry.saves++;
    else if (e.event === 'micro_share') entry.shares++;
    else if (e.event === 'micro_download') entry.downloads++;
  }
  const microByPageSorted = [...microByPage.entries()]
    .map(([page, counts]) => ({ page, ...counts, total: counts.saves + counts.shares + counts.downloads }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 15);

  // Booking intent signals
  const calendarFilters = events.filter((e) => e.event === 'calendar_filter');
  const programPageVisits = events.filter((e) => programSlugs.has(e.from) || (e.to && programSlugs.has(e.to)));
  const programPageCounts = new Map<string, number>();
  for (const e of programPageVisits) {
    const page = programSlugs.has(e.from) ? e.from : e.to!;
    programPageCounts.set(page, (programPageCounts.get(page) ?? 0) + 1);
  }
  const programPageSorted = [...programPageCounts.entries()].sort((a, b) => b[1] - a[1]);

  // Authority → Conversion ratio
  const authorityVisits = pageTypeFunnel.get('authority') ?? 0;
  const programVisits = pageTypeFunnel.get('program-event') ?? 0;
  const conversionRatio = authorityVisits > 0 ? ((programVisits / authorityVisits) * 100).toFixed(1) : '—';

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
    // Booking proximity
    pageTypeFunnel,
    funnelStages,
    microByPageSorted,
    microTotal: microEvents.length,
    calendarFilters: calendarFilters.length,
    programPageSorted,
    authorityVisits,
    programVisits,
    conversionRatio,
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

          {/* ── BOOKING PROXIMITY PANELS ──────────────────────────────────── */}

          <div style={{ borderTop: '3px solid #2d6a4f', marginTop: '2.5rem', paddingTop: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Booking Proximity</h2>
            <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1.5rem' }}>Which pages are closest to generating bookings?</p>
          </div>

          {/* ── Panel A: Authority → Conversion Ratio ──────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ ...card, textAlign: 'center' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#888', marginBottom: '0.5rem' }}>Authority Page Events</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2d6a4f', margin: 0 }}>{s.authorityVisits}</p>
            </div>
            <div style={{ ...card, textAlign: 'center' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#888', marginBottom: '0.5rem' }}>Program Event Page Events</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#b5651d', margin: 0 }}>{s.programVisits}</p>
            </div>
            <div style={{ ...card, textAlign: 'center' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#888', marginBottom: '0.5rem' }}>Authority → Program Ratio</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 800, color: typeof s.conversionRatio === 'string' && parseFloat(s.conversionRatio) >= 2 ? '#2d6a4f' : '#c0392b', margin: 0 }}>
                {s.conversionRatio}%
              </p>
              <p style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '0.25rem' }}>Healthy: 2–5%</p>
            </div>
          </div>

          {/* ── Panel B: Page-Type Funnel ──────────────────────────────────── */}
          <div style={card}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Page-Type Funnel</h2>
            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1rem' }}>Events by page category — shows where users are in the buying journey.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ ...th, width: '25%' }}>Stage</th>
                  <th style={th}>Activity</th>
                </tr>
              </thead>
              <tbody>
                {s.funnelStages.map((stage) => {
                  const count = s.pageTypeFunnel.get(stage) ?? 0;
                  const maxFunnel = Math.max(...s.funnelStages.map((st) => s.pageTypeFunnel.get(st) ?? 0), 1);
                  const stageLabels: Record<string, string> = {
                    'authority': '1. Authority Pages',
                    'location': '2. Location Hubs',
                    'experience-location': '3. Experience × Location',
                    'itinerary': '4. Itinerary Pages',
                    'program-event': '5. Program Events',
                    'conversion-hub': '6. Calendar / Finder',
                  };
                  return (
                    <tr key={stage}>
                      <td style={{ ...td, fontSize: '0.85rem', fontWeight: 600 }}>{stageLabels[stage] ?? stage}</td>
                      <td style={td}><Bar value={count} max={maxFunnel} color={stage === 'program-event' ? '#b5651d' : '#2d6a4f'} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Panel C: Micro-Commitment Signals ─────────────────────────── */}
          <div style={card}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Micro-Commitment Signals</h2>
            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1rem' }}>
              {s.microTotal} total micro-commitments — saves, shares, and downloads indicate pre-booking intent.
            </p>
            {s.microByPageSorted.length === 0 ? (
              <p style={{ color: '#aaa', fontSize: '0.875rem' }}>No micro-commitment events recorded yet.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ ...th, width: '45%' }}>Page</th>
                    <th style={{ ...th, width: '4rem' }}>Saves</th>
                    <th style={{ ...th, width: '4rem' }}>Downloads</th>
                    <th style={{ ...th, width: '4rem' }}>Shares</th>
                    <th style={{ ...th, width: '4rem' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {s.microByPageSorted.map(({ page, saves, downloads, shares, total }) => (
                    <tr key={page}>
                      <td style={{ ...td, fontSize: '0.8rem', wordBreak: 'break-all' }}>{page}</td>
                      <td style={{ ...td, fontWeight: saves > 0 ? 700 : 400, color: saves > 0 ? '#2d6a4f' : '#aaa' }}>{saves}</td>
                      <td style={{ ...td, fontWeight: downloads > 0 ? 700 : 400, color: downloads > 0 ? '#2d6a4f' : '#aaa' }}>{downloads}</td>
                      <td style={{ ...td, fontWeight: shares > 0 ? 700 : 400, color: shares > 0 ? '#2d6a4f' : '#aaa' }}>{shares}</td>
                      <td style={{ ...td, fontWeight: 800 }}>{total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* ── Panel D: Booking Intent ────────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={card}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Calendar Filter Events</h2>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#b5651d', marginBottom: '0.5rem' }}>{s.calendarFilters}</p>
              <p style={{ fontSize: '0.8rem', color: '#888' }}>Users filtering by date or location in the retreat calendar — strong buying signal.</p>
            </div>

            <div style={card}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Program Event Page Activity</h2>
              {s.programPageSorted.length === 0 ? (
                <p style={{ color: '#aaa', fontSize: '0.875rem' }}>No event page activity yet.</p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr><th style={th}>Event Page</th><th style={{ ...th, width: '4rem' }}>Events</th></tr></thead>
                  <tbody>
                    {s.programPageSorted.map(([page, count]) => (
                      <tr key={page}>
                        <td style={{ ...td, fontSize: '0.8rem', wordBreak: 'break-all' }}>{page}</td>
                        <td style={{ ...td, fontWeight: 700 }}>{count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* ── END BOOKING PROXIMITY ─────────────────────────────────────── */}

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
