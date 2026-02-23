'use client';

import Link from 'next/link';
import type { LocationId } from '@/config/locations';
import { logIntentClick, logWhatsAppOpen } from '@/lib/analytics';
import { getAllRetreatServices } from '@/content/retreats/services';

interface Location {
  id: LocationId;
  name: string;
  tagline: string;
}

interface HomeClientProps {
  locations: Location[];
}

export default function HomeClient({ locations }: HomeClientProps) {
  const whatsappMessage = `Hi, I'm interested in learning more about your Himalayan journeys.`;
  const whatsappLink = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(whatsappMessage)}`;

  const intentOptions = [
    {
      key: 'deep-rest',
      title: 'Deep Rest & Renewal',
      description: 'For those who have been running too long.',
    },
    {
      key: 'clarity',
      title: 'Clarity & Emotional Reset',
      description: 'When you need to see what comes next.',
    },
    {
      key: 'threshold',
      title: 'Threshold & Transformation',
      description: 'For those ready to cross into something new.',
    },
    {
      key: 'spiritual',
      title: 'Spiritual Grounding',
      description: 'Connection to practice, tradition, and earth.',
    },
  ];

  return (
    <main style={{ maxWidth: '64rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      {/* SECTION 1: HERO — THE INVITATION */}
      <section style={{ marginBottom: '6rem', paddingBottom: '3rem', textAlign: 'center', borderBottom: '1px solid var(--color-border)' }}>
        <h1 style={{ marginBottom: '1.5rem', fontSize: '2.5rem', lineHeight: 1.2, fontWeight: 400 }}>
          Journeys into the Himalayas
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.7, marginBottom: '0.75rem' }}>
          For rest, clarity, and inner reset.
        </p>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', margin: '1.5rem 0 0 0', lineHeight: 1.6 }}>
          Retreats and treks across carefully chosen Himalayan landscapes. Designed around your intention, not fixed schedules.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <Link
            href="/retreats"
            style={{
              display: 'inline-block',
              padding: '0.85rem 1.5rem',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              transition: 'opacity 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.opacity = '1';
            }}
          >
            Explore all retreats
          </Link>
        </div>
      </section>

      {/* SECTION 2: THE PHILOSOPHY */}
      <section style={{ marginBottom: '6rem', paddingBottom: '3rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
          How We Work
        </h2>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-text)', margin: 0, marginBottom: '1rem' }}>
          We don't run fixed events or fixed schedules. We design journeys around what you're actually seeking.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-text)', margin: 0, marginBottom: '1rem' }}>
          Each Himalayan location is chosen deliberately — for its landscape, its silence, and its medicine. Not convenience. Not trend.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-text)', margin: 0 }}>
          Your journey takes shape in conversation, not checkout pages.
        </p>
      </section>

      {/* SECTION 3: FEATURED RETREATS */}
      <section style={{ marginBottom: '6rem', paddingBottom: '3rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '2.5rem', fontSize: '1.25rem', fontWeight: 600, textAlign: 'center' }}>
          Featured retreat journeys
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {getAllRetreatServices()
            .filter((service) => ['weekend-retreat', 'yoga-and-movement', 'meditation-and-silence'].includes(service.slug))
            .map((retreat) => (
              <Link
                key={retreat.slug}
                href={`/retreats/journeys/${retreat.slug}`}
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
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>
                  {retreat.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5 }}>
                  {retreat.oneLineEssence}
                </p>
                <div style={{ marginTop: '0.75rem', color: 'var(--color-primary)', fontWeight: 500, fontSize: '0.9rem' }}>
                  Learn more →
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* SECTION 4: THE LANDSCAPES WE WORK WITH */}
      <section style={{ marginBottom: '6rem', paddingBottom: '3rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '2.5rem', fontSize: '1.25rem', fontWeight: 600, textAlign: 'center' }}>
          The landscapes we work with
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
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
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>
                {location.name}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5 }}>
                {location.tagline}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 5: RETREATS & TREKS (SIDE BY SIDE) */}
      <section style={{ marginBottom: '6rem', paddingBottom: '3rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '3rem', fontSize: '1.25rem', fontWeight: 600, textAlign: 'center' }}>
          Two paths forward
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem' }}>
          {/* Retreats Column */}
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>Retreats</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--color-text)', marginBottom: '1.5rem' }}>
              Stillness and inner recalibration. Time to reset your nervous system and come home to yourself.
            </p>
            <Link
              href="/retreats"
              onClick={() => {
                logWhatsAppOpen('/');
              }}
              style={{
                display: 'inline-block',
                color: 'var(--color-primary)',
                fontWeight: 500,
                textDecoration: 'none',
                fontSize: '0.95rem',
              }}
            >
              Explore retreats →
            </Link>
          </div>

          {/* Treks Column */}
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>Treks</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--color-text)', marginBottom: '1.5rem' }}>
              Movement and embodied presence. Walking through high terrain where your mind becomes clear.
            </p>
            <Link
              href="/treks"
              onClick={() => {
                logWhatsAppOpen('/');
              }}
              style={{
                display: 'inline-block',
                color: 'var(--color-primary)',
                fontWeight: 500,
                textDecoration: 'none',
                fontSize: '0.95rem',
              }}
            >
              Explore treks →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: HOW IT WORKS */}
      <section style={{ marginBottom: '6rem', paddingBottom: '3rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '2.5rem', fontSize: '1.25rem', fontWeight: 600, textAlign: 'center' }}>
          How this works
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {[
            { step: '1', title: 'You share what you\'re seeking', desc: 'Your intention, what\'s happening in your life, what a retreat would need to be.' },
            { step: '2', title: 'We help you choose the right land', desc: 'Which location and which retreat format makes sense — or we suggest something unexpected.' },
            { step: '3', title: 'Your journey takes shape', desc: 'In conversation. Not checkout pages, not templates. A retreat designed for you.' },
          ].map((item) => (
            <div key={item.step} style={{ display: 'flex', gap: '1.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  minWidth: '2.5rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                {item.step}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ marginTop: 0, marginBottom: '0.25rem', fontSize: '0.95rem', fontWeight: 600 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: QUIET TRUST SIGNALS */}
      <section style={{ marginBottom: '6rem', paddingBottom: '3rem', borderBottom: '1px solid var(--color-border)' }}>
        <div
          style={{
            padding: '2.5rem',
            backgroundColor: 'var(--color-bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 600, textAlign: 'center' }}>
            This is not a package deal
          </h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              'Small groups or private journeys',
              'Request-based, not scheduled events',
              'No fixed itineraries or price lists',
              'Designed, not templated',
            ].map((signal, idx) => (
              <li key={idx} style={{ fontSize: '0.95rem', lineHeight: 1.6, paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)', fontWeight: 'bold' }}>✓</span>
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 8: FINAL INVITATION CTA */}
      <section style={{ textAlign: 'center', paddingTop: '2rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.3rem', fontWeight: 600 }}>
          Ready to explore?
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
          Talk to us about what you're seeking. We'll help you decide if the Himalayas are right for you.
        </p>
        <a
          href={whatsappLink}
          onClick={() => {
            logWhatsAppOpen('/', undefined, undefined);
          }}
          style={{
            display: 'inline-block',
            padding: '0.85rem 1.5rem',
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
            borderRadius: 'var(--radius-sm)',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '0.95rem',
            transition: 'opacity 0.2s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = '0.9';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
          }}
        >
          Talk on WhatsApp
        </a>
      </section>
    </main>
  );
}
