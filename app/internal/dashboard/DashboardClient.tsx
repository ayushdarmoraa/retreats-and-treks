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
  lead_reference: string | null;
  name: string;
  email: string;
  phone: string | null;
  age: string | null;
  origin_city: string | null;
  origin_country: string | null;
  interest: string | null;
  destination: string | null;
  departure: string | null;
  departure_date: string | null;
  preferred_timing: string | null;
  yoga_interest: string | null;
  product: string | null;
  product_id: string | null;
  departure_id: string | null;
  yoga_classification: string | null;
  sales_route: string | null;
  yoga_sales_route: string | null;
  recommended_product: string | null;
  recommended_alternative: string | null;
  interested_in: string | null;
  location: string | null;
  month: string | null;
  preferred_date: string | null;
  planning_horizon: string | null;
  group_size: string | null;
  budget: string | null;
  duration: string | null;
  yoga_experience: string | null;
  booking_readiness: string | null;
  source_url: string | null;
  referrer: string | null;
  first_landing_page: string | null;
  last_landing_page: string | null;
  page_title: string | null;
  page_type: string | null;
  first_utm_source: string | null;
  first_utm_medium: string | null;
  first_utm_campaign: string | null;
  first_utm_term: string | null;
  first_utm_content: string | null;
  first_utm_id: string | null;
  first_touch_at: string | null;
  last_utm_source: string | null;
  last_utm_medium: string | null;
  last_utm_campaign: string | null;
  last_utm_term: string | null;
  last_utm_content: string | null;
  last_utm_id: string | null;
  last_touch_at: string | null;
  cta_id: string | null;
  cta_position: string | null;
  cta_label: string | null;
  cta_variant: string | null;
  conversion_session_id: string | null;
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
  page_path: string | null;
  page_type: string | null;
  vertical: string | null;
  category: string | null;
  cta_id: string | null;
  cta_position: string | null;
  cta_label: string | null;
  cta_variant: string | null;
  lead_reference: string | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface LeadFilterOptions {
  months: string[];
  products: { value: string; label: string }[];
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
    yogaLeads: number;
    artLeads: number;
    nurtureLeads: number;
    earlyLeads: number;
    unscoredLeads: number;
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

const TIERS = ['Hot', 'Warm', 'Nurture', 'Early', 'Cold', 'Unscored'] as const;
const STATUSES = ['open', 'replied', 'closed', 'booked'] as const;
const VERTICALS = ['retreat', 'trek', 'yoga', 'art'] as const;

const TIER_COLORS: Record<string, string> = {
  Hot: 'bg-red-100 text-red-800 border-red-200',
  Warm: 'bg-amber-100 text-amber-800 border-amber-200',
  Nurture: 'bg-sky-100 text-sky-800 border-sky-200',
  Early: 'bg-gray-100 text-gray-600 border-gray-200',
  Cold: 'bg-gray-100 text-gray-600 border-gray-200',
  Unscored: 'bg-gray-50 text-gray-400 border-gray-200',
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
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [verticalFilter, setVerticalFilter] = useState('');
  const [yogaTypeFilter, setYogaTypeFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [routeFilter, setRouteFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [ctaFilter, setCtaFilter] = useState('');
  const [pagePathFilter, setPagePathFilter] = useState('');
  const [sort, setSort] = useState<'date' | 'score'>('date');
  const [order, setOrder] = useState<'desc' | 'asc'>('desc');
  const [page, setPage] = useState(1);
  const [filtersReady, setFiltersReady] = useState(false);

  // Data
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterOptions, setFilterOptions] = useState<LeadFilterOptions>({ months: [], products: [] });
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Expanded lead (event log)
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [events, setEvents] = useState<ConversionEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState('');

  // Status update in-flight
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Analytics
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [showAnalyticsDetail, setShowAnalyticsDetail] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const allowedTiers = new Set([...TIERS, 'hot', 'warm', 'cold', 'nurture', 'early', 'unscored']);
    const allowedStatuses = new Set<string>(STATUSES);
    setTierFilter([...new Set((params.get('tier') || '')
      .split(',')
      .filter((value) => allowedTiers.has(value))
      .map((value) => TIERS.find((tier) => tier.toLowerCase() === value.toLowerCase()) || value))]);
    setStatusFilter((params.get('status') || '').split(',').filter((value) => allowedStatuses.has(value)));
    setVerticalFilter(VERTICALS.includes(params.get('vertical') as (typeof VERTICALS)[number])
      ? params.get('vertical') || ''
      : '');
    setYogaTypeFilter(['rishikesh', 'custom', 'ttc'].includes(params.get('yogaType') || '')
      ? params.get('yogaType') || ''
      : '');
    setMonthFilter(params.get('month') || '');
    setProductFilter(params.get('product') || '');
    setSearch(params.get('q') || '');
    setFromDate(params.get('from') || '');
    setToDate(params.get('to') || '');
    setLocationFilter(params.get('location') || '');
    setRouteFilter(params.get('route') || '');
    setSourceFilter(params.get('source') || '');
    setCtaFilter(params.get('cta') || '');
    setPagePathFilter(params.get('pagePath') || '');
    setSort(params.get('sort') === 'score' ? 'score' : 'date');
    setOrder(params.get('order') === 'asc' ? 'asc' : 'desc');
    setPage(Math.max(1, Number(params.get('page')) || 1));
    setFiltersReady(true);
  }, []);

  useEffect(() => {
    if (!filtersReady) return;

    const params = new URLSearchParams();
    if (tierFilter.length) params.set('tier', tierFilter.join(','));
    if (statusFilter.length) params.set('status', statusFilter.join(','));
    if (verticalFilter) params.set('vertical', verticalFilter);
    if (yogaTypeFilter) params.set('yogaType', yogaTypeFilter);
    if (fromDate) params.set('from', fromDate);
    if (toDate) params.set('to', toDate);
    if (productFilter) params.set('product', productFilter);
    if (locationFilter) params.set('location', locationFilter);
    if (routeFilter) params.set('route', routeFilter);
    if (sourceFilter) params.set('source', sourceFilter);
    if (ctaFilter) params.set('cta', ctaFilter);
    if (pagePathFilter) params.set('pagePath', pagePathFilter);
    if (monthFilter) params.set('month', monthFilter);
    if (search) params.set('q', search);
    if (sort !== 'date') params.set('sort', sort);
    if (order !== 'desc') params.set('order', order);
    if (page > 1) params.set('page', String(page));
    const query = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
  }, [
    filtersReady, tierFilter, statusFilter, verticalFilter, yogaTypeFilter, fromDate,
    toDate, productFilter, locationFilter, routeFilter, sourceFilter, ctaFilter,
    pagePathFilter, monthFilter, search, sort, order, page,
  ]);

  // ── FETCH LEADS ────────────────────────────────────────

  const fetchLeads = useCallback(async () => {
    if (!filtersReady) return;
    setLoading(true);
    setError('');

    const params = new URLSearchParams();
    if (tierFilter.length) params.set('tier', tierFilter.join(','));
    if (statusFilter.length) params.set('status', statusFilter.join(','));
    if (verticalFilter) params.set('vertical', verticalFilter);
    if (yogaTypeFilter) params.set('yogaType', yogaTypeFilter);
    if (monthFilter) params.set('month', monthFilter);
    if (productFilter) params.set('product', productFilter);
    if (fromDate) params.set('from', fromDate);
    if (toDate) params.set('to', toDate);
    if (locationFilter) params.set('location', locationFilter);
    if (routeFilter) params.set('route', routeFilter);
    if (sourceFilter) params.set('source', sourceFilter);
    if (ctaFilter) params.set('cta', ctaFilter);
    if (pagePathFilter) params.set('pagePath', pagePathFilter);
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
      setFilterOptions(data.filterOptions || { months: [], products: [] });
      setPagination(data.pagination || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leads');
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, [
    filtersReady, tierFilter, statusFilter, verticalFilter, yogaTypeFilter, monthFilter,
    productFilter, fromDate, toDate, locationFilter, routeFilter, sourceFilter,
    ctaFilter, pagePathFilter, search, sort, order, page,
  ]);

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
      setEventsError('');
      return;
    }

    setExpandedId(leadId);
    setEventsLoading(true);
    setEventsError('');

    try {
      const res = await fetch(`/api/internal/leads/${leadId}`);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const data = await res.json();
      setEvents(data.events || []);
    } catch {
      setEvents([]);
      setEventsError('Failed to load conversion timeline. Refresh and try again.');
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

  const resetFilters = () => {
    setTierFilter([]);
    setStatusFilter([]);
    setVerticalFilter('');
    setYogaTypeFilter('');
    setMonthFilter('');
    setProductFilter('');
    setSearch('');
    setFromDate('');
    setToDate('');
    setLocationFilter('');
    setRouteFilter('');
    setSourceFilter('');
    setCtaFilter('');
    setPagePathFilter('');
    setSort('date');
    setOrder('desc');
    setPage(1);
  };

  // ── SUMMARY STATS ──────────────────────────────────────

  const counts = {
    total: pagination?.total ?? 0,
    hot: leads.filter((l) => l.lead_tier.toLowerCase() === 'hot').length,
    warm: leads.filter((l) => l.lead_tier.toLowerCase() === 'warm').length,
    nurture: leads.filter((l) => l.lead_tier.toLowerCase() === 'nurture').length,
    early: leads.filter((l) => l.lead_tier.toLowerCase() === 'early').length,
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
      l.lead_tier.toLowerCase() === 'hot' &&
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
              sub={`${analytics.metrics.retreatLeads} retreat · ${analytics.metrics.trekLeads} trek · ${analytics.metrics.yogaLeads} yoga · ${analytics.metrics.artLeads} art`}
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
              <div>
                <h4 className="text-xs font-semibold text-gray-600 mb-2">Lead tiers (30d)</h4>
                <div className="flex flex-wrap gap-3 text-xs">
                  {[
                    ['Hot', analytics.metrics.hotLeads],
                    ['Warm', analytics.metrics.warmLeads],
                    ['Nurture', analytics.metrics.nurtureLeads],
                    ['Early', analytics.metrics.earlyLeads],
                    ['Cold', analytics.metrics.coldLeads],
                    ['Unscored', analytics.metrics.unscoredLeads],
                  ].map(([tier, count]) => (
                    <span key={tier} className="text-gray-600">{tier}: <strong>{count}</strong></span>
                  ))}
                </div>
              </div>
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
          aria-label="Search name or email"
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

        {/* Yoga location type */}
        <select
          aria-label="Yoga location type"
          value={yogaTypeFilter}
          onChange={(e) => { setYogaTypeFilter(e.target.value); setPage(1); }}
          className="px-2 py-1.5 border border-gray-300 rounded text-sm bg-white focus:outline-none"
        >
          <option value="">All Yoga location types</option>
          <option value="rishikesh">Rishikesh</option>
          <option value="custom">Custom</option>
          <option value="ttc">TTC</option>
        </select>

        <select
          aria-label="Preferred month"
          value={monthFilter}
          onChange={(e) => { setMonthFilter(e.target.value); setPage(1); }}
          className="px-2 py-1.5 border border-gray-300 rounded text-sm bg-white focus:outline-none"
        >
          <option value="">All months</option>
          {filterOptions.months.map((month) => <option key={month} value={month}>{month}</option>)}
        </select>

        <select
          aria-label="Product"
          value={productFilter}
          onChange={(e) => { setProductFilter(e.target.value); setPage(1); }}
          className="px-2 py-1.5 border border-gray-300 rounded text-sm bg-white focus:outline-none"
        >
          <option value="">All products</option>
          {filterOptions.products.map((product) => <option key={product.value} value={product.value}>{product.label}</option>)}
        </select>

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
          aria-label="Vertical"
          value={verticalFilter}
          onChange={(e) => { setVerticalFilter(e.target.value); setPage(1); }}
          className="px-2 py-1.5 border border-gray-300 rounded text-sm bg-white focus:outline-none"
        >
          <option value="">All verticals</option>
          {VERTICALS.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <label className="flex items-center gap-1 text-xs text-gray-500">
          From
          <input
            type="date"
            aria-label="From date"
            value={fromDate}
            onChange={(e) => { setFromDate(e.target.value); setPage(1); }}
            className="px-2 py-1 border border-gray-300 rounded text-sm text-gray-800"
          />
        </label>
        <label className="flex items-center gap-1 text-xs text-gray-500">
          To
          <input
            type="date"
            aria-label="To date"
            value={toDate}
            onChange={(e) => { setToDate(e.target.value); setPage(1); }}
            className="px-2 py-1 border border-gray-300 rounded text-sm text-gray-800"
          />
        </label>
        <input
          type="text"
          aria-label="Location"
          placeholder="Location"
          value={locationFilter}
          onChange={(e) => { setLocationFilter(e.target.value); setPage(1); }}
          className="px-3 py-1.5 border border-gray-300 rounded text-sm w-36"
        />
        <input
          type="text"
          aria-label="Sales route"
          placeholder="Sales route"
          value={routeFilter}
          onChange={(e) => { setRouteFilter(e.target.value); setPage(1); }}
          className="px-3 py-1.5 border border-gray-300 rounded text-sm w-36"
        />
        <input
          type="text"
          aria-label="Source"
          placeholder="Source"
          value={sourceFilter}
          onChange={(e) => { setSourceFilter(e.target.value); setPage(1); }}
          className="px-3 py-1.5 border border-gray-300 rounded text-sm w-36"
        />
        <input
          type="text"
          aria-label="CTA ID"
          placeholder="CTA ID"
          value={ctaFilter}
          onChange={(e) => { setCtaFilter(e.target.value); setPage(1); }}
          className="px-3 py-1.5 border border-gray-300 rounded text-sm w-36"
        />
        <input
          type="text"
          aria-label="Landing page"
          placeholder="Landing page"
          value={pagePathFilter}
          onChange={(e) => { setPagePathFilter(e.target.value); setPage(1); }}
          className="px-3 py-1.5 border border-gray-300 rounded text-sm w-36"
        />

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
          <button
            onClick={resetFilters}
            className="px-2 py-0.5 text-xs rounded border bg-white text-gray-500 border-gray-200 hover:border-gray-400"
          >
            Reset filters
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
                    eventsError={expandedId === lead.id ? eventsError : ''}
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
  eventsError,
  isUpdating,
  onToggleEvents,
  onUpdateStatus,
}: {
  lead: Lead;
  now: number;
  isExpanded: boolean;
  events: ConversionEvent[];
  eventsLoading: boolean;
  eventsError: string;
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
          <span className={`px-1.5 py-0.5 rounded text-xs border ${TIER_COLORS[lead.lead_tier] || TIER_COLORS[lead.lead_tier.toLowerCase()] || TIER_COLORS.unscored}`}>
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
                {lead.yoga_interest && <div><span className="text-gray-500">Interest:</span> {lead.yoga_interest}</div>}
                {lead.interest && <div><span className="text-gray-500">Inquiry:</span> {lead.interest}</div>}
                {lead.product && <div><span className="text-gray-500">Product:</span> {lead.product}{lead.product_id ? ` (${lead.product_id})` : ''}</div>}
                {lead.destination && <div><span className="text-gray-500">Destination:</span> {lead.destination}</div>}
                {lead.departure && <div><span className="text-gray-500">Departure:</span> {lead.departure}</div>}
                {lead.departure_id && <div><span className="text-gray-500">Departure:</span> {lead.departure_id}</div>}
                {lead.departure_date && <div><span className="text-gray-500">Departure date:</span> {lead.departure_date}</div>}
                {lead.yoga_classification && <div><span className="text-gray-500">Classification:</span> {lead.yoga_classification}</div>}
                {(lead.sales_route || lead.yoga_sales_route) && <div><span className="text-gray-500">Sales route:</span> {lead.sales_route || lead.yoga_sales_route}</div>}
                {lead.recommended_product && <div><span className="text-gray-500">Recommended product:</span> {lead.recommended_product}</div>}
                {lead.recommended_alternative && <div><span className="text-gray-500">Suggested alternative:</span> {lead.recommended_alternative}</div>}
                <div><span className="text-gray-500">Score / tier:</span> {lead.lead_score} / {lead.lead_tier}</div>
                {lead.phone && <div><span className="text-gray-500">Phone / WhatsApp:</span> {lead.phone}</div>}
                {lead.lead_reference && <div><span className="text-gray-500">Lead reference:</span> {lead.lead_reference}</div>}
                {lead.location && <div><span className="text-gray-500">Requested location:</span> {lead.location}</div>}
                {lead.origin_city && <div><span className="text-gray-500">Origin:</span> {lead.origin_city}{lead.origin_country ? `, ${lead.origin_country}` : ''}</div>}
                {lead.age && <div><span className="text-gray-500">Age:</span> {lead.age}</div>}
                {lead.month && <div><span className="text-gray-500">Month:</span> {lead.month}</div>}
                {lead.preferred_date && <div><span className="text-gray-500">Preferred date:</span> {lead.preferred_date}</div>}
                {lead.preferred_timing && <div><span className="text-gray-500">Preferred timing:</span> {lead.preferred_timing}</div>}
                {lead.duration && <div><span className="text-gray-500">Duration:</span> {lead.duration}</div>}
                {lead.yoga_experience && <div><span className="text-gray-500">Yoga experience:</span> {lead.yoga_experience}</div>}
                {lead.booking_readiness && <div><span className="text-gray-500">Readiness:</span> {lead.booking_readiness}</div>}
                {lead.planning_horizon && <div><span className="text-gray-500">Planning horizon:</span> {lead.planning_horizon}</div>}
                {lead.group_size && <div><span className="text-gray-500">Group:</span> {lead.group_size}</div>}
                {lead.budget && <div><span className="text-gray-500">Budget:</span> {lead.budget}</div>}
                {lead.vertical && <div><span className="text-gray-500">Vertical:</span> {lead.vertical}</div>}
                {lead.category && <div><span className="text-gray-500">Category:</span> {lead.category}</div>}
                {lead.source_url && <SourceAttribution sourceUrl={lead.source_url} />}
                {lead.first_landing_page && <div><span className="text-gray-500">First landing:</span> <span className="font-mono text-[10px]">{lead.first_landing_page}</span></div>}
                {lead.last_landing_page && lead.last_landing_page !== lead.first_landing_page && <div><span className="text-gray-500">Last landing:</span> <span className="font-mono text-[10px]">{lead.last_landing_page}</span></div>}
                {(lead.cta_id || lead.cta_position || lead.cta_label) && (
                  <div>
                    <span className="text-gray-500">CTA:</span>{' '}
                    {[lead.cta_id, lead.cta_position, lead.cta_label, lead.cta_variant].filter(Boolean).join(' · ')}
                  </div>
                )}
                {(lead.first_utm_source || lead.first_utm_medium || lead.first_utm_campaign || lead.first_utm_term || lead.first_utm_content || lead.first_utm_id || lead.first_touch_at) && (
                  <div>
                    <span className="text-gray-500">First touch:</span>{' '}
                    {[lead.first_utm_source, lead.first_utm_medium, lead.first_utm_campaign, lead.first_utm_term, lead.first_utm_content, lead.first_utm_id].filter(Boolean).join(' / ')}
                    {lead.first_touch_at && <span className="ml-1 text-gray-500">({new Date(lead.first_touch_at).toLocaleString()})</span>}
                  </div>
                )}
                {(lead.last_utm_source || lead.last_utm_medium || lead.last_utm_campaign || lead.last_utm_term || lead.last_utm_content || lead.last_utm_id || lead.last_touch_at) && (
                  <div>
                    <span className="text-gray-500">Last touch:</span>{' '}
                    {[lead.last_utm_source, lead.last_utm_medium, lead.last_utm_campaign, lead.last_utm_term, lead.last_utm_content, lead.last_utm_id].filter(Boolean).join(' / ')}
                    {lead.last_touch_at && <span className="ml-1 text-gray-500">({new Date(lead.last_touch_at).toLocaleString()})</span>}
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
                ) : eventsError ? (
                  <div role="alert" className="text-xs text-red-700">{eventsError}</div>
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
                        {(evt.page_path || evt.cta_id || evt.cta_position) && (
                          <span className="text-gray-500 truncate max-w-sm">
                            {[evt.page_path, evt.cta_id, evt.cta_position, evt.cta_label].filter(Boolean).join(' · ')}
                          </span>
                        )}
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
    conversion_cta_view: 'bg-sky-100 text-sky-700',
    conversion_cta_click: 'bg-indigo-100 text-indigo-700',
    form_open: 'bg-violet-100 text-violet-700',
    form_step: 'bg-violet-100 text-violet-700',
    form_abandoned: 'bg-orange-100 text-orange-700',
    lead_submitted: 'bg-green-100 text-green-700',
    whatsapp_handoff: 'bg-emerald-100 text-emerald-700',
  };

  return (
    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${styles[type] || 'bg-gray-100 text-gray-600'}`}>
      {type.replace('inquiry_', '')}
    </span>
  );
}

// ── HELPERS ──────────────────────────────────────────────

const UTM_KEYS = new Set([
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id',
  'first_utm_source', 'first_utm_medium', 'first_utm_campaign', 'first_utm_term', 'first_utm_content', 'first_utm_id',
]);

function SourceAttribution({ sourceUrl }: { sourceUrl: string }) {
  const [source, query = ''] = sourceUrl.split('?');
  const sourcePath = source.startsWith('http')
    ? new URL(source).pathname
    : source;
  const utmValues = [...new URLSearchParams(query.split('#')[0]).entries()]
    .filter(([key]) => UTM_KEYS.has(key))
    .map(([key, value]) => `${key}=${value}`);

  return (
    <>
      <div><span className="text-gray-500">Source:</span> <span className="font-mono text-[10px]">{sourcePath}</span></div>
      {utmValues.length > 0 && (
        <div><span className="text-gray-500">UTM:</span> <span className="font-mono text-[10px] break-all">{utmValues.join(' · ')}</span></div>
      )}
    </>
  );
}

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

  const isHot = lead.lead_tier.toLowerCase() === 'hot';
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
