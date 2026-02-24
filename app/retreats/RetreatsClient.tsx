'use client';

import Link from 'next/link';
import type { RetreatContent } from '@/types/content';
import type { LocationId } from '@/config/locations';
import { logIntentClick, logWhatsAppOpen } from '@/lib/analytics';
import { getAllRetreatServices } from '@/content/retreats/services';

interface IntentOption {
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface Location {
  id: LocationId;
  name: string;
  tagline: string;
  supportsRetreats: boolean;
  supportsTreks: boolean;
  active: boolean;
  priority: number;
}

interface RetreatsClientProps {
  intentions: IntentOption[];
  processSteps: ProcessStep[];
  whyUsPoints: string[];
  retreatFormats: RetreatContent[];
  locations: Location[];
}

export default function RetreatsClient({
  intentions,
  processSteps,
  whyUsPoints,
  retreatFormats,
  locations,
}: RetreatsClientProps) {
  return (
    <>
      {/* SECTION 1: HERO — BRAND PROMISE */}
      <section style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '0.75rem', fontSize: '2.25rem', lineHeight: 1.2 }}>
          Guided Himalayan Retreats, Designed With Intention
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.6, marginBottom: '1.5rem' }}>
          Small-group and private retreats across quiet Himalayan locations — created around rest, clarity, and depth.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="#explore-intentions"
            style={{
              padding: '0.85rem 1.5rem',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.opacity = '1';
            }}
          >
            Explore Our Retreats
          </Link>
        </div>
      </section>

      {/* SECTION 2: RETREAT SERVICES CATALOG */}
      <section id="explore-intentions" style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '2rem', textAlign: 'center', fontSize: '1.5rem' }}>
          Our retreat services
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {getAllRetreatServices().map((service) => (
            <Link
              key={service.slug}
              href={`/retreats/journeys/${service.slug}`}
              onClick={() => {
                logIntentClick(service.slug, undefined, '/retreats');
              }}
              style={{
                padding: '1.5rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                color: 'var(--color-text)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.backgroundColor = '#fafafa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                {service.title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5 }}>
                {service.oneLineEssence}
              </p>
              <div style={{ marginTop: '0.75rem', color: 'var(--color-primary)', fontWeight: 500, fontSize: '0.9rem' }}>
                Learn more →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: HOW OUR RETREATS WORK */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '2rem', textAlign: 'center', fontSize: '1.5rem' }}>
          How our retreats work
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
          }}
        >
          {processSteps.map((ps) => (
            <div key={ps.step} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  margin: '0 auto 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  borderRadius: '50%',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                }}
              >
                {ps.step}
              </div>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                {ps.title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5 }}>
                {ps.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: RETREAT FORMATS */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem', textAlign: 'center' }}>
          Retreat formats we offer
        </h2>
        <p style={{ textAlign: 'center', fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
          These are examples — many retreats are designed specifically around you.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {retreatFormats.map((format) => (
            <div
              key={format.slug}
              style={{
                padding: '1.5rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                {format.title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5 }}>
                {format.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: HIMALAYAN LOCATIONS */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '2rem', fontSize: '1.5rem', textAlign: 'center' }}>
          Himalayan locations we work with
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {locations.map((location) => (
            <Link
              key={location.id}
              href={`/retreats/${location.id}`}
              style={{
                padding: '1.5rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                color: 'var(--color-text)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.backgroundColor = '#fafafa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                {location.name}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5, marginBottom: '0.75rem' }}>
                {location.tagline}
              </p>
              <div style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '0.9rem' }}>
                Explore this location →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 6: WHY THIS BRAND */}
      <section
        style={{
          marginBottom: '4rem',
          padding: '2rem',
          backgroundColor: 'var(--color-bg-subtle)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border)',
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem', textAlign: 'center' }}>
          What makes our retreats different
        </h2>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {whyUsPoints.map((point, idx) => (
            <li key={idx} style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', marginRight: '0.5rem' }}>✓</span>
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 7: INVITATION CTA */}
      <section style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.3rem' }}>
          Let's design your retreat
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Every retreat is personal. Share what you're seeking, and we'll match you with the right location, format, and dates.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/91XXXXXXXXXX?text=I%27d%20like%20to%20design%20a%20retreat."
            onClick={() => {
              logWhatsAppOpen('/retreats');
            }}
            style={{
              padding: '0.85rem 1.5rem',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Talk on WhatsApp
          </a>
          <a
            href="https://wa.me/91XXXXXXXXXX?text=Tell%20me%20about%20your%20retreat%20options."
            onClick={() => {
              logWhatsAppOpen('/retreats');
            }}
            style={{
              padding: '0.85rem 1.5rem',
              backgroundColor: 'transparent',
              color: 'var(--color-primary)',
              border: '1px solid var(--color-primary)',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Share Your Intention
          </a>
        </div>
      </section>
    </>
  );
}
