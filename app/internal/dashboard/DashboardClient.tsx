'use client';

/**
 * DashboardClient — Operational Lead Management Interface
 *
 * Features:
 *   - Table view of all leads
 *   - Filter by tier, status, vertical
 *   - Sort by score or date
 *   - Search by name/email
 *   - Inline status update (open → replied/closed/booked)
 *   - Expand row to see event log
 *   - Pagination
 *
 * Not pretty. Not fancy. Operational.
 */

import { useState, useEffect, useCallback } from 'react';

// ── TYPES ──────────────────────────────────────────────────

interface Lead {
  id: string;
  name: string;
  email: string;
  interested_in: string | null;
  location: string | null;
  month: string | null;
  group_size: string | null;
  budget: string | null;
  source_url: string | null;
  vertical: string | null;
  category: string | null;
  lead_score: number;
  lead_tier: string;
  status: string;
  followup_count: number;
  last_followup_at: string | null;
  created_at: string;
}

interface ConversionEvent {
  id: string;
  event_type: string;
  meta: Record<string, unknown> | null;
  created_at: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface AnalyticsData {
  metrics: {
    totalLeads: number;
    hotLeads: number;
    warmLeads: number;
    coldLeads: number;
    booked: number;
    replied: number;
    closed: number;
    open: number;
    avgScore: number;
    conversionRate: number;
    retreatLeads: number;
    trekLeads: number;
  };
  hotConversion: {
    totalHot: number;
    hotBooked: number;
    hotConversionRate: number;
  };
  topSources: { source_url: string; count: number; avg_score: number }[];
  budgetDistribution: { budget_range: string; count: number }[];
}

// ── CONSTANTS ──────────────────────────────────────────────

const TIERS = ['hot', 'warm', 'cold'] as const;
const STATUSES = ['open', 'replied', 'closed', 'booked'] as const;
const VERTICALS = ['retreat', 'trek'] as const;

const TIER_COLORS: Record<string, string> = {
  hot: 'bg-red-100 text-red-800 border-red-200',
  warm: 'bg-amber-100 text-amber-800 border-amber-200',
  cold: 'bg-gray-100 text-gray-600 border-gray-200',
  unscored: 'bg-gray-50 text-gray-400 border-gray-200',
};

const STATUS_COLORS: Record<string, string> = {
  open: 'bg-blue-100 text-blue-800',
  replied: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-500',
  booked: 'bg-emerald-100 text-emerald-900 font-bold',
};

// ── MAIN COMPONENT ─────────────────────────────────────────

export default function DashboardClient() {
  // Filters
  const [tierFilter, setTierFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>(['open']);
  const [verticalFilter, setVerticalFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'date' | 'score'>('date');
  const [order, setOrder] = useState<'desc' | 'asc'>('desc');
  const [page, setPage] = useState(1);

  // Data
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Expanded lead (event log)
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [events, setEvents] = useState<ConversionEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  // Status update in-flight
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Analytics
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [showAnalyticsDetail, setShowAnalyticsDetail] = useState(false);

  // ── FETCH LEADS ────────────────────────────────────────

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError('');

    const params = new URLSearchParams();
    if (tierFilter.length) params.set('tier', tierFilter.join(','));
    if (statusFilter.length) params.set('status', statusFilter.join(','));
    if (verticalFilter) params.set('vertical', verticalFilter);
    if (search) params.set('q', search);
    params.set('sort', sort);
    params.set('order', order);
    params.set('page', String(page));
    params.set('limit', '50');

    try {
      const res = await fetch(`/api/internal/leads?${params}`);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const data = await res.json();
      setLeads(data.leads || []);
      setPagination(data.pagination || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leads');
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, [tierFilter, statusFilter, verticalFilter, search, sort, order, page]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // ── FETCH ANALYTICS ────────────────────────────────────

  const fetchAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch('/api/internal/analytics');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setAnalytics(data);
    } catch {
      setAnalytics(null);
    } finally {
      setAnalyticsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // ── FETCH EVENTS FOR A LEAD ───────────────────────────

  const toggleEvents = async (leadId: string) => {
    if (expandedId === leadId) {
      setExpandedId(null);
      setEvents([]);
      return;
    }

    setExpandedId(leadId);
    setEventsLoading(true);

    try {
      const res = await fetch(`/api/internal/leads/${leadId}`);
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setEvents(data.events || []);
    } catch {
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  };

  // ── UPDATE STATUS ──────────────────────────────────────

  const updateStatus = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);

    try {
      const res = await fetch(`/api/internal/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Update failed');
        return;
      }

      // Update local state
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
    } catch {
      alert('Network error');
    } finally {
      setUpdatingId(null);
    }
  };

  // ── TOGGLE HELPERS ─────────────────────────────────────

  const toggleTier = (tier: string) => {
    setTierFilter((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
    );
    setPage(1);
  };

  const toggleStatus = (status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
    setPage(1);
  };

  // ── SUMMARY STATS ──────────────────────────────────────

  const counts = {
    total: pagination?.total ?? 0,
    hot: leads.filter((l) => l.lead_tier === 'hot').length,
    warm: leads.filter((l) => l.lead_tier === 'warm').length,
    cold: leads.filter((l) => l.lead_tier === 'cold').length,
    booked: leads.filter((l) => l.status === 'booked').length,
  };

  // ── LOGOUT ──────────────────────────────────────────────

  const handleLogout = async () => {
    await fetch('/api/internal/auth/logout', { method: 'POST' });
    window.location.href = '/internal/login';
  };

  // ── LIVE CLOCK (for response timer) ────────────────────

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 30_000); // tick every 30s
    return () => clearInterval(interval);
  }, []);

  // Hot leads needing urgent response (open, >60 min old)
  const urgentHotLeads = leads.filter(
    (l) =>
      l.lead_tier === 'hot' &&
      l.status === 'open' &&
      now - new Date(l.created_at).getTime() > 60 * 60 * 1000,
  );

  // ── RENDER ─────────────────────────────────────────────

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Urgent alert banner */}
      {urgentHotLeads.length > 0 && (
        <div className="bg-red-600 text-white rounded-lg px-4 py-3 mb-4 flex items-center gap-3 animate-pulse">
          <span className="text-lg">!</span>
          <div>
            <div className="font-bold text-sm">
              {urgentHotLeads.length} hot lead{urgentHotLeads.length > 1 ? 's' : ''} waiting &gt;60 min
            </div>
            <div className="text-xs text-red-100">
              Speed-to-lead: responding within 30–60 min converts 3–5× better.
              {urgentHotLeads.map((l) => ` ${l.name}`).join(',')}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Lead Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            {counts.total} total leads
            {counts.hot > 0 && <span className="ml-2 text-red-600">{counts.hot} hot</span>}
            {counts.booked > 0 && <span className="ml-2 text-emerald-700">{counts.booked} booked</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchLeads}
            className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm bg-white text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ── REVENUE ANALYTICS PANEL ─────────────────────────── */}
      {!analyticsLoading && analytics && (
        <div className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden">
          {/* 4 core metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            <MetricCard
              label="Total Leads (30d)"
              value={analytics.metrics.totalLeads}
              sub={`${analytics.metrics.retreatLeads} retreat · ${analytics.metrics.trekLeads} trek`}
            />
            <MetricCard
              label="Hot Leads (30d)"
              value={analytics.metrics.hotLeads}
              sub={`${analytics.hotConversion.hotConversionRate}% hot→booked`}
              highlight={analytics.metrics.hotLeads > 0}
              highlightColor="red"
            />
            <MetricCard
              label="Conversion Rate"
              value={`${analytics.metrics.conversionRate}%`}
              sub={`${analytics.metrics.booked} booked of ${analytics.metrics.totalLeads}`}
              highlight={analytics.metrics.conversionRate > 0}
              highlightColor="emerald"
            />
            <MetricCard
              label="Avg Lead Score"
              value={analytics.metrics.avgScore}
              sub={`${analytics.metrics.open} open · ${analytics.metrics.replied} replied`}
            />
          </div>

          {/* Toggle detail */}
          <button
            onClick={() => setShowAnalyticsDetail(!showAnalyticsDetail)}
            className="w-full text-xs text-gray-400 hover:text-gray-600 py-1.5 border-t border-gray-100 transition-colors"
          >
            {showAnalyticsDetail ? '▴ Hide detail' : '▾ Show sources & budget breakdown'}
          </button>

          {/* Detail section */}
          {showAnalyticsDetail && (
            <div className="border-t border-gray-100 p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top sources */}
              <div>
                <h4 className="text-xs font-semibold text-gray-600 mb-2">Top Source Pages</h4>
                {analytics.topSources.length === 0 ? (
                  <p className="text-xs text-gray-400">No data yet</p>
                ) : (
                  <div className="space-y-1">
                    {analytics.topSources.map((s) => (
                      <div key={s.source_url} className="flex items-center gap-2 text-xs">
                        <span className="font-mono text-gray-500 w-6 text-right">{s.count}</span>
                        <div className="flex-1 truncate text-gray-700" title={s.source_url}>
                          {s.source_url.replace('https://www.retreatsandtreks.com', '')}
                        </div>
                        <span className="text-gray-400">avg {s.avg_score}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Budget distribution */}
              <div>
                <h4 className="text-xs font-semibold text-gray-600 mb-2">Budget Distribution</h4>
                {analytics.budgetDistribution.length === 0 ? (
                  <p className="text-xs text-gray-400">No data yet</p>
                ) : (
                  <div className="space-y-1">
                    {analytics.budgetDistribution.map((b) => {
                      const maxCount = Math.max(...analytics.budgetDistribution.map(d => d.count));
                      const pct = maxCount > 0 ? (b.count / maxCount) * 100 : 0;
                      return (
                        <div key={b.budget_range} className="flex items-center gap-2 text-xs">
                          <span className="w-28 text-gray-700 truncate">{b.budget_range}</span>
                          <div className="flex-1 h-3 bg-gray-100 rounded overflow-hidden">
                            <div
                              className="h-full bg-blue-200 rounded"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="font-mono text-gray-500 w-6 text-right">{b.count}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Status breakdown */}
              <div className="md:col-span-2">
                <h4 className="text-xs font-semibold text-gray-600 mb-2">Pipeline Status (30d)</h4>
                <div className="flex gap-3">
                  {[
                    { label: 'Open', value: analytics.metrics.open, color: 'bg-blue-200' },
                    { label: 'Replied', value: analytics.metrics.replied, color: 'bg-green-200' },
                    { label: 'Booked', value: analytics.metrics.booked, color: 'bg-emerald-300' },
                    { label: 'Closed', value: analytics.metrics.closed, color: 'bg-gray-200' },
                  ].map((s) => {
                    const total = analytics.metrics.totalLeads || 1;
                    return (
                      <div key={s.label} className="flex-1">
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="text-xs text-gray-500">{s.label}</span>
                          <span className="text-xs font-mono font-bold">{s.value}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded overflow-hidden">
                          <div
                            className={`h-full rounded ${s.color}`}
                            style={{ width: `${(s.value / total) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filters bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-wrap gap-4 items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search name or email…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="px-3 py-1.5 border border-gray-300 rounded text-sm w-56 focus:outline-none focus:border-gray-500"
        />

        {/* Tier filters */}
        <div className="flex gap-1 items-center">
          <span className="text-xs text-gray-500 mr-1">Tier:</span>
          {TIERS.map((tier) => (
            <button
              key={tier}
              onClick={() => toggleTier(tier)}
              className={`px-2 py-0.5 text-xs rounded border transition-colors ${
                tierFilter.includes(tier)
                  ? TIER_COLORS[tier]
                  : 'bg-white text-gray-400 border-gray-200 hover:border-gray-400'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        {/* Status filters */}
        <div className="flex gap-1 items-center">
          <span className="text-xs text-gray-500 mr-1">Status:</span>
          {STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => toggleStatus(status)}
              className={`px-2 py-0.5 text-xs rounded border transition-colors ${
                statusFilter.includes(status)
                  ? STATUS_COLORS[status] + ' border-current'
                  : 'bg-white text-gray-400 border-gray-200 hover:border-gray-400'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Vertical filter */}
        <select
          value={verticalFilter}
          onChange={(e) => { setVerticalFilter(e.target.value); setPage(1); }}
          className="px-2 py-1.5 border border-gray-300 rounded text-sm bg-white focus:outline-none"
        >
          <option value="">All verticals</option>
          {VERTICALS.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        {/* Sort */}
        <div className="flex gap-1 items-center ml-auto">
          <span className="text-xs text-gray-500 mr-1">Sort:</span>
          <button
            onClick={() => { setSort('score'); setOrder('desc'); }}
            className={`px-2 py-0.5 text-xs rounded border ${
              sort === 'score' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'
            }`}
          >
            Score ↓
          </button>
          <button
            onClick={() => { setSort('date'); setOrder('desc'); }}
            className={`px-2 py-0.5 text-xs rounded border ${
              sort === 'date' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => { setSort('date'); setOrder('asc'); }}
            className={`px-2 py-0.5 text-xs rounded border ${
              sort === 'date' && order === 'asc' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'
            }`}
          >
            Oldest
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Score</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Tier</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Name</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Email</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Interest</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Location</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Budget</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Status</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Follow-ups</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Response</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600 w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={12} className="px-3 py-8 text-center text-gray-400">
                    Loading…
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-3 py-8 text-center text-gray-400">
                    No leads match current filters
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <LeadRow
                    key={lead.id}
                    lead={lead}
                    now={now}
                    isExpanded={expandedId === lead.id}
                    events={expandedId === lead.id ? events : []}
                    eventsLoading={expandedId === lead.id && eventsLoading}
                    isUpdating={updatingId === lead.id}
                    onToggleEvents={() => toggleEvents(lead.id)}
                    onUpdateStatus={(status) => updateStatus(lead.id, status)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="border-t border-gray-200 px-3 py-2 flex items-center justify-between bg-gray-50">
            <span className="text-xs text-gray-500">
              Page {pagination.page} of {pagination.pages} ({pagination.total} total)
            </span>
            <div className="flex gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-2 py-1 text-xs border rounded disabled:opacity-30 hover:bg-gray-100"
              >
                ← Prev
              </button>
              <button
                disabled={page >= pagination.pages}
                onClick={() => setPage(page + 1)}
                className="px-2 py-1 text-xs border rounded disabled:opacity-30 hover:bg-gray-100"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Deliverability checklist */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Deliverability Checklist</h3>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" /> Resend domain verified
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" /> SPF record configured
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" /> DKIM record configured
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" /> From address consistent ({`RESEND_FROM_EMAIL`})
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" /> Reply-to set to human address
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" /> Max 3 emails per lead enforced
          </label>
        </div>
      </div>
    </div>
  );
}

// ── LEAD ROW COMPONENT ───────────────────────────────────

function LeadRow({
  lead,
  now,
  isExpanded,
  events,
  eventsLoading,
  isUpdating,
  onToggleEvents,
  onUpdateStatus,
}: {
  lead: Lead;
  now: number;
  isExpanded: boolean;
  events: ConversionEvent[];
  eventsLoading: boolean;
  isUpdating: boolean;
  onToggleEvents: () => void;
  onUpdateStatus: (status: string) => void;
}) {
  const age = formatAge(lead.created_at);
  const responseTimer = getResponseTimer(lead, now);

  return (
    <>
      <tr className={`hover:bg-gray-50 transition-colors ${isExpanded ? 'bg-blue-50/50' : ''}`}>
        {/* Score */}
        <td className="px-3 py-2">
          <span className="font-mono font-bold text-sm">{lead.lead_score}</span>
        </td>

        {/* Tier */}
        <td className="px-3 py-2">
          <span className={`px-1.5 py-0.5 rounded text-xs border ${TIER_COLORS[lead.lead_tier] || TIER_COLORS.unscored}`}>
            {lead.lead_tier}
          </span>
        </td>

        {/* Name */}
        <td className="px-3 py-2 font-medium text-gray-900">{lead.name}</td>

        {/* Email */}
        <td className="px-3 py-2 text-gray-600">
          <a href={`mailto:${lead.email}`} className="hover:text-blue-600 hover:underline">
            {lead.email}
          </a>
        </td>

        {/* Interest */}
        <td className="px-3 py-2 text-gray-600">{lead.interested_in || '—'}</td>

        {/* Location */}
        <td className="px-3 py-2 text-gray-600">{lead.location || '—'}</td>

        {/* Budget */}
        <td className="px-3 py-2 text-gray-600">{lead.budget || '—'}</td>

        {/* Status */}
        <td className="px-3 py-2">
          <select
            value={lead.status}
            disabled={isUpdating || lead.status === 'booked'}
            onChange={(e) => onUpdateStatus(e.target.value)}
            className={`px-1.5 py-0.5 rounded text-xs border-0 cursor-pointer ${
              STATUS_COLORS[lead.status] || 'bg-gray-100'
            } ${isUpdating ? 'opacity-50' : ''}`}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </td>

        {/* Follow-ups */}
        <td className="px-3 py-2 text-center">
          <span className={`text-xs ${lead.followup_count > 0 ? 'text-amber-600' : 'text-gray-400'}`}>
            {lead.followup_count}/2
          </span>
        </td>

        {/* Response timer */}
        <td className="px-3 py-2">
          {responseTimer && (
            <span
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-mono font-medium ${
                responseTimer.urgent
                  ? 'bg-red-100 text-red-700 animate-pulse'
                  : responseTimer.warning
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
              title={`Inquiry received: ${new Date(lead.created_at).toLocaleString()}`}
            >
              {responseTimer.label}
            </span>
          )}
          {!responseTimer && (
            <span className="text-xs text-gray-400" title={new Date(lead.created_at).toLocaleString()}>
              {age}
            </span>
          )}
        </td>

        {/* Expand */}
        <td className="px-3 py-2">
          <button
            onClick={onToggleEvents}
            className="text-gray-400 hover:text-gray-700 text-xs"
            title="View event log"
          >
            {isExpanded ? '▾' : '▸'}
          </button>
        </td>
      </tr>

      {/* Event log row */}
      {isExpanded && (
        <tr className="bg-gray-50/80">
          <td colSpan={12} className="px-6 py-3">
            <div className="flex gap-8">
              {/* Lead details */}
              <div className="text-xs space-y-1 min-w-[200px]">
                <div className="font-semibold text-gray-700 mb-1">Details</div>
                {lead.month && <div><span className="text-gray-500">Month:</span> {lead.month}</div>}
                {lead.group_size && <div><span className="text-gray-500">Group:</span> {lead.group_size}</div>}
                {lead.vertical && <div><span className="text-gray-500">Vertical:</span> {lead.vertical}</div>}
                {lead.category && <div><span className="text-gray-500">Category:</span> {lead.category}</div>}
                {lead.source_url && (
                  <div>
                    <span className="text-gray-500">Source:</span>{' '}
                    <span className="font-mono text-[10px]">{lead.source_url}</span>
                  </div>
                )}
                {lead.last_followup_at && (
                  <div>
                    <span className="text-gray-500">Last follow-up:</span>{' '}
                    {new Date(lead.last_followup_at).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Event timeline */}
              <div className="flex-1">
                <div className="font-semibold text-xs text-gray-700 mb-1">Event Log</div>
                {eventsLoading ? (
                  <div className="text-xs text-gray-400">Loading events…</div>
                ) : events.length === 0 ? (
                  <div className="text-xs text-gray-400">No events recorded</div>
                ) : (
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {events.map((evt) => (
                      <div key={evt.id} className="flex items-start gap-2 text-xs">
                        <span className="text-gray-400 shrink-0 font-mono">
                          {new Date(evt.created_at).toLocaleString(undefined, {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                          })}
                        </span>
                        <EventBadge type={evt.event_type} />
                        {evt.meta && Object.keys(evt.meta).length > 0 && (
                          <span className="text-gray-400 font-mono text-[10px] truncate max-w-xs">
                            {JSON.stringify(evt.meta)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ── EVENT BADGE ──────────────────────────────────────────

function EventBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    inquiry_submitted: 'bg-blue-100 text-blue-700',
    inquiry_email_sent: 'bg-green-100 text-green-700',
    inquiry_email_failed: 'bg-red-100 text-red-700',
    inquiry_spam_blocked: 'bg-orange-100 text-orange-700',
    inquiry_validation_failed: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${styles[type] || 'bg-gray-100 text-gray-600'}`}>
      {type.replace('inquiry_', '')}
    </span>
  );
}

// ── HELPERS ──────────────────────────────────────────────

function formatAge(dateStr: string): string {
  const ms = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(ms / (1000 * 60 * 60));
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

/**
 * Response Timer — shows elapsed time since inquiry for open leads.
 * Hot leads >60m: urgent (red pulse)
 * Hot leads >30m: warning (amber)
 * All open leads: neutral timer
 * Non-open leads: null (show age instead)
 */
function getResponseTimer(
  lead: Lead,
  now: number,
): { label: string; urgent: boolean; warning: boolean } | null {
  // Only show timer for open leads
  if (lead.status !== 'open') return null;

  const ms = now - new Date(lead.created_at).getTime();
  const minutes = Math.floor(ms / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const isHot = lead.lead_tier === 'hot';
  const urgent = isHot && minutes > 60;
  const warning = isHot && minutes > 30 && minutes <= 60;

  let label: string;
  if (minutes < 1) label = '<1m';
  else if (minutes < 60) label = `${minutes}m`;
  else if (hours < 24) label = `${hours}h ${minutes % 60}m`;
  else label = `${days}d ${hours % 24}h`;

  return { label, urgent, warning };
}

// ── METRIC CARD ──────────────────────────────────────────

function MetricCard({
  label,
  value,
  sub,
  highlight,
  highlightColor,
}: {
  label: string;
  value: number | string;
  sub?: string;
  highlight?: boolean;
  highlightColor?: 'red' | 'emerald';
}) {
  const valueColor = highlight
    ? highlightColor === 'emerald'
      ? 'text-emerald-700'
      : 'text-red-600'
    : 'text-gray-900';

  return (
    <div className="px-4 py-3">
      <div className="text-xs text-gray-500 mb-0.5">{label}</div>
      <div className={`text-2xl font-bold font-mono ${valueColor}`}>{value}</div>
      {sub && <div className="text-[11px] text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}
