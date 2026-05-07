import React from 'react';
import Link from 'next/link';

interface YogaDeparture {
  location: string;
  startDate: string;
  endDate: string;
  duration: string;
  seatsLeft: number;
  totalSeats: number;
  price: string;
  whatsappText: string;
}

const departures: YogaDeparture[] = [
  {
    location: 'Rishikesh',
    startDate: 'June 10, 2026',
    endDate: 'June 14, 2026',
    duration: '5 days',
    seatsLeft: 8,
    totalSeats: 12,
    price: '₹22,000',
    whatsappText: 'Hi, I want to book the Yoga Retreat on June 10–14 in Rishikesh. Please share details.',
  },
  {
    location: 'Chakrata',
    startDate: 'July 5, 2026',
    endDate: 'July 9, 2026',
    duration: '5 days',
    seatsLeft: 5,
    totalSeats: 10,
    price: '₹20,000',
    whatsappText: 'Hi, I want to book the Yoga Retreat on July 5–9 in Chakrata. Please share details.',
  },
  {
    location: 'Rishikesh',
    startDate: 'Aug 12, 2026',
    endDate: 'Aug 16, 2026',
    duration: '5 days',
    seatsLeft: 10,
    totalSeats: 12,
    price: '₹22,000',
    whatsappText: 'Hi, I want to book the Yoga Retreat on Aug 12–16 in Rishikesh. Please share details.',
  },
  {
    location: 'Chakrata',
    startDate: 'Sept 3, 2026',
    endDate: 'Sept 7, 2026',
    duration: '5 days',
    seatsLeft: 6,
    totalSeats: 10,
    price: '₹20,000',
    whatsappText: 'Hi, I want to book the Yoga Retreat on Sept 3–7 in Chakrata. Please share details.',
  },
];

export default function YogaFixedDepartures() {
  return (
    <section style={{ padding: '5rem 0', background: '#ffffff', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.85rem', fontWeight: 200, marginBottom: '2rem', textAlign: 'center' }}>
        Upcoming Yoga Retreats
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
      }}>
        {departures.map((d) => (
          <div key={`${d.location}-${d.startDate}`} style={{
            border: '1px solid #eef0ee',
            borderRadius: '10px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>{d.location}</h3>
            <p style={{ margin: '0.25rem 0' }}><strong>Dates:</strong> {d.startDate} – {d.endDate}</p>
            <p style={{ margin: '0.25rem 0' }}><strong>Duration:</strong> {d.duration}</p>
            <p style={{ margin: '0.25rem 0' }}><strong>Seats left:</strong> {d.seatsLeft}/{d.totalSeats}</p>
            <p style={{ margin: '0.25rem 0', color: '#0f766e', fontWeight: 500 }}>{d.price}</p>
            <a
              href={`https://wa.me/919760446101?text=${encodeURIComponent(d.whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: '1rem',
                padding: '0.7rem 1rem',
                background: '#0f766e',
                color: '#fff',
                textAlign: 'center',
                borderRadius: '999px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Reserve on WhatsApp →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
