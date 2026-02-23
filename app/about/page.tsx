import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import AllRetreatPrograms from '@/components/AllRetreatPrograms';

const PATH = '/about';

export function generateMetadata(): Metadata {
  return {
    title: 'About Retreats And Treks — Our Approach to Himalayan Retreat Design',
    description:
      'Learn how Retreats And Treks designs structured Himalayan retreat experiences across carefully selected mountain locations in North India.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'About Retreats And Treks — Our Approach to Himalayan Retreat Design',
      description:
        'Learn how Retreats And Treks designs structured Himalayan retreat experiences across carefully selected mountain locations in North India.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

export default function AboutPage() {
  return (
    <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <article>

        {/* ── H1 ────────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            About Retreats And Treks
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-muted)' }}>
            Retreats And Treks designs structured Himalayan retreat experiences across carefully selected mountain locations in North India. This page explains our approach, our location philosophy, and who our programs are built for.
          </p>
        </header>

        {/* ── WHY HIMALAYAN RETREATS ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Why We Focus on Himalayan Retreats
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The Himalayan region of North India offers environmental conditions that meaningfully support retreat work. Lower population density, reduced sensory stimulation, cooler climates, and expansive landscapes create natural containment for structured reflection.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Retreats are not simply vacations in quiet places. They are intentionally designed containers for recalibration. The Himalayas provide the environmental stability required for that container to function effectively.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            We focus specifically on mountain-based retreat environments because geography influences psychological pace. Open ridgelines, forested trails, and reduced urban exposure support sustained attention in ways that high-density destinations do not.
          </p>
        </section>

        {/* ── HOW WE DESIGN PROGRAMS ────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            How We Design Retreat Programs
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Each retreat program is structured around rhythm rather than intensity. Days are intentionally paced to balance guided sessions, quiet integration time, shared meals, and unstructured reflection.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Program design prioritizes containment over stimulation. Rather than compressing activities into tight schedules, retreats are built to allow transition into slower mental states.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            Facilitators are selected based on alignment with retreat-first methodology rather than performance-driven formats. The objective is not productivity, but recalibration.
          </p>
        </section>

        {/* ── LOCATION SELECTION ────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Our Location Selection Philosophy
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Not all mountain destinations are equally suited for retreat formats. We prioritize locations that offer environmental quiet, manageable accessibility, and stable seasonal conditions.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Locations such as Chakrata, Sankri, Munsiyari, and Rishikesh are selected for specific reasons — ranging from forest containment to valley immersion to structured yoga infrastructure.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            Geographic selection is deliberate. Retreat work depends on environmental reinforcement rather than environmental resistance.
          </p>
        </section>

        {/* ── WHO OUR RETREATS ARE FOR ──────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Our Retreats Are Designed For
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Our retreats are structured for individuals seeking intentional pause. This includes professionals experiencing sustained workload pressure, founders navigating transition, creatives requiring uninterrupted thought space, and participants seeking guided recalibration.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Programs are designed to accommodate mixed experience levels. Prior retreat experience is not required. What matters is willingness to engage with slower pacing and structured reflection.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            Retreat-first design means programs remain accessible without sacrificing depth.
          </p>
        </section>

        {/* ── LONG-TERM VISION ──────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Our Long-Term Vision
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Retreats And Treks is built as a Himalayan retreat authority platform rather than a single-location operator. Our long-term vision is to curate structured mountain-based programs across carefully selected regions while maintaining program quality and environmental integrity.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            We believe retreat environments should remain smaller-scale, structured, and intentionally designed. Growth is approached through geographic depth rather than volume expansion.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            By combining structured retreat programming with carefully selected mountain settings, we aim to build a sustainable ecosystem that supports both participants and the regions that host them.
          </p>
        </section>

        {/* ── KNOWLEDGE BASE LINKS ──────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Explore Our Retreat Knowledge Base
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, margin: 0 }}>
            <li>
              <Link href="/topics/retreat-decision" style={{ color: 'var(--color-primary)' }}>
                Decision &amp; Planning Guides
              </Link>
            </li>
            <li>
              <Link href="/topics/location-authority" style={{ color: 'var(--color-primary)' }}>
                Location-Based Retreat Guides
              </Link>
            </li>
          </ul>
        </section>

        {/* ── EXPLORE PROGRAMS (conversion layer) ──────────────────── */}
        <AllRetreatPrograms />

      </article>
    </main>
  );
}
