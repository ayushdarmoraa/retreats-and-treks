import React from 'react';
import Link from 'next/link';

export default function YogaHeroFacilitator() {
  return (
    <section style={{ position: 'relative', textAlign: 'center', padding: '6rem 2rem', background: '#f5f5f5' }}>
      {/* Hero Image */}
      <img
        src="/Images/retreats/yoga/yoga-backbend-cave-rishikesh.webp
        alt="Yoga backbend pose in cave retreat with Sakshi"
        style={{ width: '100%', height: 'auto', borderRadius: '12px', objectFit: 'cover' }}
      />
      {/* Hero Text Overlay */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 300 }}>Yoga Retreats, Teacher Training & Aerial Yoga</h1>
        <p style={{ fontSize: '1rem', margin: '1rem 0' }}>Guided by Sakshi, 8 years of teaching experience</p>
        <a
          href="#yoga-fixed-departures"
          style={{ padding: '0.8rem 1.2rem', background: '#0f766e', color: '#fff', borderRadius: '999px', textDecoration: 'none', fontWeight: 600 }}
        >
          View Upcoming Retreats →
        </a>
      </div>

      {/* Facilitator Card */}
      <div style={{ maxWidth: '28rem', margin: '4rem auto 0', padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src="/Images/retreats/yoga/pranayama-closeup-sakshi.webp
          alt="Sakshi Yoga Facilitator"
          style={{ width: '10rem', height: '10rem', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }}
        />
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Sakshi</h2>
        <p style={{ fontSize: '0.9rem', textAlign: 'center', margin: '0.5rem 0' }}>
          Sakshi has been teaching Yoga for 8 years, guiding students through immersive retreats, teacher training, aerial yoga programs, and online classes.
        </p>
        <a
          href="#meet-sakshi"
          style={{ padding: '0.6rem 1rem', background: '#0f766e', color: '#fff', borderRadius: '999px', textDecoration: 'none', fontWeight: 600, marginTop: '1rem' }}
        >
          Meet Sakshi →
        </a>
      </div>
    </section>
  );
}
