import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import { RETREAT_PROGRAM_EVENTS } from '@/config/retreatProgramEvents';
import RetreatCalendarClient, { type CalendarEvent } from '@/components/RetreatCalendarClient';

const PATH = '/retreat-calendar';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Retreat Calendar — Upcoming Himalayan Retreats 2026 | Retreats And Treks',
    description:
      'Browse all scheduled Himalayan retreat dates for 2026. Filter by location, experience type, or month. See pricing, availability, and seats remaining. Book directly.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Retreat Calendar 2026',
      description: 'All scheduled retreats with dates, pricing, and real-time availability.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Retreat Calendar 2026'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How far in advance should I book a retreat?',
    answer:
      'For popular programs like the Zanskar meditation retreat, booking 3–4 months ahead is recommended. Weekend retreats in Chakrata can often be booked 4–6 weeks out. Once a retreat shows "Filling Fast", only a few seats remain.',
  },
  {
    question: 'What does the price include?',
    answer:
      'All listed prices are per person and all-inclusive: accommodation, three meals daily, guided sessions, local transport within the retreat, and applicable permits. The only exclusion is travel to the pickup point (typically Delhi, Dehradun, or Leh depending on location).',
  },
  {
    question: 'Can I request a private retreat on different dates?',
    answer:
      'Yes. This calendar shows scheduled group batches. If you need a private retreat for a specific date range, contact us through the inquiry form on any retreat page and we will design a custom program for your group.',
  },
  {
    question: 'What happens if a retreat is sold out?',
    answer:
      'We maintain a waitlist. If a seat opens up, the first person on the waitlist gets a 48-hour reservation window. Alternatively, check if a similar program is running at another location or month.',
  },
  {
    question: 'Are there any cancellation policies?',
    answer:
      'Cancellations 30+ days before the start date receive a full refund minus processing fees. 15–30 days: 50% refund. Under 15 days: credit toward a future retreat. Details are shared at the time of booking confirmation.',
  },
];

export default function RetreatCalendarPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  // Serialize events for the client component
  const calendarEvents: CalendarEvent[] = RETREAT_PROGRAM_EVENTS.map((ev) => ({
    slug: ev.slug,
    label: ev.label,
    locationId: ev.locationId,
    locationName: ev.locationName,
    experienceSlug: ev.experienceSlug,
    month: ev.month,
    year: ev.year,
    dateRange: ev.dateRange,
    durationDays: ev.durationDays,
    price: ev.price,
    seatsLeft: ev.seatsLeft,
    groupSize: ev.groupSize,
    status: ev.status,
  }));

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreat Calendar', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const totalSeats = RETREAT_PROGRAM_EVENTS.reduce((s, e) => s + e.seatsLeft, 0);
  const locationCount = new Set(RETREAT_PROGRAM_EVENTS.map((e) => e.locationId)).size;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Retreat Calendar' }]} />

      <header style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
          Retreat Calendar — 2026
        </h1>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
          {RETREAT_PROGRAM_EVENTS.length} scheduled retreats across {locationCount} Himalayan
          locations. {totalSeats} seats available. Filter by location, experience type, or
          month to find your dates.
        </p>
      </header>

      {/* ── Interactive Calendar ────────────────────────────────────────── */}
      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <RetreatCalendarClient events={calendarEvents} />
      </section>

      {/* ── How Booking Works ──────────────────────────────────────────── */}
      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          How Booking Works
        </h2>
        <ol style={{ paddingLeft: '1.5rem', lineHeight: 2.0, fontSize: '0.95rem' }}>
          <li>Choose a retreat from the calendar above and click through to the details page.</li>
          <li>Submit an inquiry — we confirm availability within 24 hours.</li>
          <li>Pay a 30% advance to reserve your seat. Balance due 15 days before start date.</li>
          <li>Receive your pre-retreat preparation guide and packing checklist by email.</li>
        </ol>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

      {/* ── Cross-links ────────────────────────────────────────────────── */}
      <nav style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
        <Link href="/find-your-retreat" style={{ color: 'var(--color-primary)' }}>Retreat Finder</Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href="/retreat-programs" style={{ color: 'var(--color-primary)' }}>All Programs</Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href="/retreats" style={{ color: 'var(--color-primary)' }}>All Retreats</Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href="/contact" style={{ color: 'var(--color-primary)' }}>Contact Us</Link>
      </nav>
    </TrackedPage>
  );
}
