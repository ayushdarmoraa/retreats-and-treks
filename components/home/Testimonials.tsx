'use client';

import Image from 'next/image';
import { images } from '@/lib/images';
import { Section, SectionHeading, Card } from '@/components/ui';

const Testimonials = () => {
  return (
    <Section className="testimonials" style={{ background: '#ffffff', padding: '7rem 0' }}>
      <style>{`
        .testimonials::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 30% 20%, rgba(15, 118, 110, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(139, 115, 85, 0.02) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .testimonials-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }

        /* Grid */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          animation: fadeUp 0.9s ease 0.3s both;
        }

        /* This section's card has its own padding & top accent line */
        .t-card {
          padding: 2.5rem 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .t-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 2rem;
          right: 2rem;
          height: 2px;
          background: linear-gradient(90deg, 
            #0f766e, 
            rgba(15, 118, 110, 0.1) 40%, 
            transparent 80%
          );
          opacity: 0.06;
          border-radius: 4px;
        }

        /* Quote mark */
        .t-quote-mark {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 3.5rem;
          font-weight: 200;
          color: #0f766e;
          opacity: 0.06;
          line-height: 1;
          position: absolute;
          top: 0.8rem;
          right: 1.5rem;
          user-select: none;
        }

        /* Stars */
        .t-stars {
          display: flex;
          gap: 0.2rem;
        }
        .t-star {
          color: #0f766e;
          font-size: 0.75rem;
          opacity: 0.2;
        }

        /* Review text */
        .t-review {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.9rem;
          line-height: 1.9;
          color: #6b7280;
          font-weight: 300;
          margin: 0;
          font-style: italic;
          letter-spacing: 0.005em;
          transition: color 0.4s ease;
        }
        .ui-card:hover .t-review {
          color: #4b5563;
        }

        /* Vibe tag */
        .t-vibe {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #0f766e;
          background: rgba(15, 118, 110, 0.04);
          padding: 0.3rem 0.8rem;
          border-radius: 100px;
          font-weight: 500;
          width: fit-content;
          border: 1px solid rgba(15, 118, 110, 0.04);
        }

        /* Person row */
        .t-person {
          display: flex;
          align-items: center;
          gap: 1rem;
          border-top: 1px solid rgba(0, 0, 0, 0.04);
          padding-top: 1.25rem;
          margin-top: 0.3rem;
        }

        .t-avatar {
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(15, 118, 110, 0.06);
          flex-shrink: 0;
        }

        .t-name {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: #1a1814;
          letter-spacing: -0.01em;
          margin-bottom: 0.15rem;
          transition: color 0.4s ease;
        }
        .ui-card:hover .t-name {
          color: #0f766e;
        }

        .t-meta {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.72rem;
          color: #6b7280;
          font-weight: 300;
          letter-spacing: 0.02em;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .testimonials-container {
            padding: 0 3rem;
          }
          .testimonials-grid {
            gap: 1.5rem;
          }
          .t-card {
            padding: 2rem 1.8rem;
          }
        }

        @media (max-width: 900px) {
          .testimonials {
            padding: 5rem 0 !important;
          }
          .testimonials-container {
            padding: 0 2rem;
          }
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .testimonials {
            padding: 4rem 0 !important;
          }
          .testimonials-container {
            padding: 0 1.5rem;
          }
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
          .t-card {
            padding: 1.8rem 1.5rem;
          }
          .t-quote-mark {
            font-size: 2.8rem;
          }
          .t-review {
            font-size: 0.85rem;
            line-height: 1.8;
          }
          .t-name {
            font-size: 0.82rem;
          }
          .t-meta {
            font-size: 0.68rem;
          }
        }

        @media (max-width: 480px) {
          .testimonials-container {
            padding: 0 1.2rem;
          }
          .t-card {
            padding: 1.5rem 1.2rem;
          }
          .t-quote-mark {
            font-size: 2.2rem;
            top: 0.5rem;
            right: 1rem;
          }
          .t-review {
            font-size: 0.82rem;
            line-height: 1.7;
          }
          .t-vibe {
            font-size: 0.5rem;
            padding: 0.2rem 0.6rem;
          }
          .t-person {
            padding-top: 1rem;
            gap: 0.8rem;
          }
          .t-avatar {
            width: 2.2rem;
            height: 2.2rem;
          }
          .t-name {
            font-size: 0.78rem;
          }
          .t-meta {
            font-size: 0.65rem;
          }
        }
      `}</style>

      <div className="testimonials-container">
        <SectionHeading
          eyebrow="Real People. Real Experiences."
          title="Those Who Came Before You"
        />

        {/* Cards */}
        <div className="testimonials-grid">
          {[
            {
              image: images.testimonials.priya,
              name: 'Priya Mehta',
              meta: 'Chakrata · Meditation Retreat',
              vibe: '🧘 Meditation',
              review: 'I came burnt out and left feeling like myself again. The silence, the mountains, the pace — nothing was rushed. It felt designed just for me, because it was.',
              stars: 5,
            },
            {
              image: images.testimonials.rohan,
              name: 'Rohan Sharma',
              meta: 'Sankri · Weekend Retreat',
              vibe: '🍵 Tea Vibes',
              review: "Woke up to mist over the valley every morning. The evenings around the fire with chai — I didn't know I needed this until I was in it. Already planning the next one.",
              stars: 5,
            },
            {
              image: images.testimonials.anika,
              name: 'Anika Verma',
              meta: 'Munsiyari · Walking Retreat',
              vibe: '🚶 Walking',
              review: "The walks weren't just physical — something shifted internally. By day three, my mind was quieter than it's been in years. This place changes you.",
              stars: 5,
            },
          ].map((t, i) => (
            <Card key={i} className="t-card">
              <span className="t-quote-mark">&ldquo;</span>

              <div className="t-stars">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <span key={s} className="t-star">★</span>
                ))}
              </div>

              <span className="t-vibe">{t.vibe}</span>

              <p className="t-review">&ldquo;{t.review}&rdquo;</p>

              <div className="t-person">
                <Image
                  src={t.image.src}
                  alt={t.image.alt}
                  width={44}
                  height={44}
                  className="t-avatar"
                />
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-meta">{t.meta}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Testimonials;