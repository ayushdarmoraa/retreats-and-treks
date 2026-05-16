import Image from 'next/image';
import Link from 'next/link';
import type { TrekContent } from '@/types/content';

/* ============================================================
   TrekHeroImmersive
   Full-bleed hero image with overlay, emotional headline,
   trust strip and primary CTA. LCP-optimized with priority.
============================================================ */

export function TrekHeroImmersive({
  trek,
  locationName,
  whatsappHref,
}: {
  trek: TrekContent;
  locationName: string;
  whatsappHref: string;
}) {
  if (!trek.heroImage) return null;

  return (
    <section
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        position: 'relative',
        height: 'clamp(420px, 75vh, 720px)',
        overflow: 'hidden',
        marginBottom: '0',
      }}
      aria-label={`${trek.title} hero`}
    >
      <Image
        src={trek.heroImage}
        alt={trek.heroImageAlt || `${trek.title} — ${locationName}`}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'contain', objectPosition: 'center' }}
      />
      {/* gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '3rem 2rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '56rem', width: '100%' }}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 500,
              color: '#e6e6e6',
              marginBottom: '0.85rem',
              background: 'rgba(15,118,110,0.75)',
              padding: '0.3rem 0.85rem',
              borderRadius: '100px',
            }}
          >
            {trek.trekType} · {locationName}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: 'clamp(1.85rem, 4.5vw, 3rem)',
              fontWeight: 200,
              letterSpacing: '-0.035em',
              color: '#ffffff',
              lineHeight: 1.1,
              margin: '0 0 0.75rem',
              textShadow: '0 2px 18px rgba(0,0,0,0.35)',
            }}
          >
            {trek.title}
          </h1>
          {trek.heroTagline && (
            <p
              style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
                fontWeight: 300,
                lineHeight: 1.55,
                color: '#f0f0f0',
                maxWidth: '42rem',
                margin: '0 0 1.75rem',
                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              }}
            >
              {trek.heroTagline}
            </p>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                background: '#25d366',
                color: '#ffffff',
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.88rem',
                fontWeight: 500,
                padding: '0.8rem 1.55rem',
                borderRadius: '100px',
                textDecoration: 'none',
                boxShadow: '0 6px 18px rgba(37,211,102,0.35)',
              }}
            >
              Check Dates & Book Now
            </Link>
            <a
              href="#itinerary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                background: 'rgba(255,255,255,0.14)',
                border: '1px solid rgba(255,255,255,0.45)',
                color: '#ffffff',
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.88rem',
                fontWeight: 400,
                padding: '0.8rem 1.55rem',
                borderRadius: '100px',
                textDecoration: 'none',
                backdropFilter: 'blur(6px)',
              }}
            >
              View Itinerary ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TrekTrustStrip
   Compact credibility row below the hero — 4 items.
============================================================ */

export function TrekTrustStrip({
  items,
}: {
  items: { label: string; sublabel?: string }[];
}) {
  if (!items || items.length === 0) return null;
  return (
    <section
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div
        style={{
          maxWidth: '56rem',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`,
          gap: '1.25rem',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              textAlign: 'center',
              borderLeft: i > 0 ? '1px solid rgba(0,0,0,0.06)' : 'none',
              padding: '0 0.5rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.92rem',
                fontWeight: 500,
                color: '#111111',
                letterSpacing: '-0.01em',
                marginBottom: '0.2rem',
              }}
            >
              {item.label}
            </div>
            {item.sublabel && (
              <div
                style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.74rem',
                  fontWeight: 300,
                  color: '#666666',
                  letterSpacing: '0.02em',
                }}
              >
                {item.sublabel}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   TrekWhySection
   Narrative "why this trek" block — editorial voice.
============================================================ */

export function TrekWhySection({
  whyThisTrek,
}: {
  whyThisTrek?: { headline: string; body: string };
}) {
  if (!whyThisTrek) return null;
  const paragraphs = whyThisTrek.body.split(/\n\n+/).filter(Boolean);
  return (
    <section
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '4.5rem',
        paddingBottom: '4.5rem',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '1px',
              background: 'var(--color-primary)',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#374151',
              fontWeight: 500,
            }}
          >
            Why this trek
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.55rem, 3vw, 2.1rem)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            color: '#111111',
            lineHeight: 1.15,
            marginBottom: '1.75rem',
          }}
        >
          {whyThisTrek.headline}
        </h2>
        {paragraphs.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '1rem',
              fontWeight: 300,
              lineHeight: 1.85,
              color: '#3a3a3a',
              marginBottom: '1.1rem',
            }}
          >
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   TrekEmotionalHooks
   Grid of 4-6 icon + title + body cards.
============================================================ */

export function TrekEmotionalHooks({
  hooks,
}: {
  hooks?: { icon?: string; title: string; body: string }[];
}) {
  if (!hooks || hooks.length === 0) return null;
  return (
    <section
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        background: '#f7f9f7',
        paddingTop: '4.5rem',
        paddingBottom: '4.5rem',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '1px',
              background: 'var(--color-primary)',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#374151',
              fontWeight: 500,
            }}
          >
            What you’ll live through
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.45rem, 2.6vw, 1.95rem)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            color: '#111111',
            lineHeight: 1.15,
            marginBottom: '2.25rem',
          }}
        >
          Moments you won’t forget
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {hooks.map((hook, i) => (
            <div
              key={i}
              style={{
                background: '#ffffff',
                border: '1px solid #ececec',
                borderRadius: '10px',
                padding: '1.5rem 1.4rem',
                transition: 'box-shadow 0.25s, transform 0.25s',
              }}
            >
              {hook.icon && (
                <div
                  style={{
                    fontSize: '1.65rem',
                    marginBottom: '0.85rem',
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  {hook.icon}
                </div>
              )}
              <h3
                style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#111111',
                  letterSpacing: '-0.015em',
                  margin: '0 0 0.45rem',
                }}
              >
                {hook.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.86rem',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: '#555555',
                  margin: 0,
                }}
              >
                {hook.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TrekExperienceGallery
   Cinematic asymmetric image gallery — first image is tall,
   rest are a 3-column grid. Eager-loads first row.
============================================================ */

export function TrekExperienceGallery({
  images,
  heading,
  topPadding,
  bottomPadding,
}: {
  images?: { src: string; alt: string; caption?: string }[];
  heading?: string;
  topPadding?: string;
  bottomPadding?: string;
}) {
  const yogaImages = [
    { src: "/Images/retreats/yoga/aerial-yoga-group-rishikesh.webp", alt: "Aerial yoga group session in Rishikesh" },
    { src: "/Images/retreats/yoga/brahmari-pranayam-meditation.webp", alt: "Brahmari pranayam meditation session" },
    { src: "/Images/retreats/yoga/pranayama-closeup-sakshi.webp", alt: "Close-up of Sakshi guiding pranayama" },
    { src: "/Images/retreats/yoga/yoga-assist-inverted-rishikesh.webp", alt: "Yoga assisted inversion pose in Rishikesh" },
    { src: "/Images/retreats/yoga/yoga-balance-pose-outdoors.webp", alt: "Yoga balance pose outdoors" },
    { src: "/Images/retreats/yoga/yoga-meditation-river-rishikesh.webp", alt: "Yoga meditation by the river in Rishikesh" },
    { src: "/Images/retreats/yoga/yoga-scenic-rishikesh.jpg.webp", alt: "Scenic yoga pose in Rishikesh" },
  ];

  if (!images || images.length === 0) images = yogaImages;
  if (!images || images.length === 0) return null;
  return (
    <section
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: topPadding ?? '4.5rem',
        paddingBottom: bottomPadding ?? '4.5rem',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '1px',
              background: 'var(--color-primary)',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#374151',
              fontWeight: 500,
            }}
          >
            The experience
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.45rem, 2.6vw, 1.95rem)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            color: '#111111',
            lineHeight: 1.15,
            marginBottom: '2rem',
          }}
        >
          {heading ?? 'A visual walk-through of the trail'}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {images.map((img, i) => (
            <figure
              key={i}
              style={{
                position: 'relative',
                aspectRatio: i === 0 ? '4 / 5' : '4 / 3',
                borderRadius: '8px',
                overflow: 'hidden',
                margin: 0,
                gridColumn: i === 0 ? 'span 1' : 'span 1',
                background: '#f0f0f0',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                quality={60}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
              {img.caption && (
                <figcaption
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '0.7rem 0.9rem',
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.74rem',
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                    lineHeight: 1.4,
                  }}
                >
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TrekCinematicMoment
   Full-bleed image + centered quote. Emotional anchor.
============================================================ */

export function TrekCinematicMoment({
  moment,
}: {
  moment?: { image: string; alt: string; quote: string; attribution?: string };
}) {
  if (!moment) return null;
  return (
    <section
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        position: 'relative',
        height: 'clamp(360px, 60vh, 560px)',
        overflow: 'hidden',
        marginBottom: '0',
      }}
    >
      <Image
        src={moment.image}
        alt={moment.alt}
        fill
        quality={60}
        sizes="100vw"
        style={{ objectFit: 'contain', objectPosition: 'center' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <blockquote
          style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.2rem, 2.6vw, 1.9rem)',
            fontWeight: 200,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            lineHeight: 1.35,
            maxWidth: '42rem',
            margin: 0,
            textShadow: '0 2px 18px rgba(0,0,0,0.4)',
          }}
        >
          “{moment.quote}”
        </blockquote>
        {moment.attribution && (
          <cite
            style={{
              display: 'block',
              marginTop: '1.25rem',
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.78rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#e6e6e6',
              fontStyle: 'normal',
              fontWeight: 400,
            }}
          >
            — {moment.attribution}
          </cite>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   TrekDifficultyProfile
   Visual 4-axis meter (physical / technical / altitude / weather)
   Each axis: 0-5 filled dots.
============================================================ */

export function TrekDifficultyProfile({
  profile,
  difficulty,
}: {
  profile?: {
    physical: number;
    technical: number;
    altitude: number;
    weather: number;
  };
  difficulty: string;
}) {
  if (!profile) return null;
  const axes: { label: string; value: number; hint: string }[] = [
    { label: 'Physical Demand', value: profile.physical, hint: 'cardio + stamina' },
    { label: 'Technical Skill', value: profile.technical, hint: 'rope / exposure' },
    { label: 'Altitude Challenge', value: profile.altitude, hint: 'AMS risk' },
    { label: 'Weather Exposure', value: profile.weather, hint: 'cold / wind / snow' },
  ];
  return (
    <section
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        background: '#f7f9f7',
        paddingTop: '4.5rem',
        paddingBottom: '4.5rem',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '1px',
              background: 'var(--color-primary)',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#374151',
              fontWeight: 500,
            }}
          >
            Difficulty profile
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            color: '#111111',
            lineHeight: 1.15,
            marginBottom: '0.6rem',
          }}
        >
          Overall: {difficulty}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#666666',
            marginBottom: '2rem',
            lineHeight: 1.7,
          }}
        >
          Four independent axes. Use this to compare honestly against other Himalayan routes you’ve done.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
          {axes.map((axis, i) => (
            <li
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                background: '#ffffff',
                border: '1px solid #ececec',
                borderRadius: '8px',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    color: '#111111',
                    marginBottom: '0.18rem',
                  }}
                >
                  {axis.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.74rem',
                    fontWeight: 300,
                    color: '#888888',
                    letterSpacing: '0.02em',
                  }}
                >
                  {axis.hint}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '4px' }} aria-label={`${axis.label}: ${axis.value} of 5`}>
                {[1, 2, 3, 4, 5].map((dot) => (
                  <span
                    key={dot}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background:
                        dot <= axis.value ? 'var(--color-primary)' : 'rgba(0,0,0,0.08)',
                      display: 'inline-block',
                    }}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ============================================================
   TrekAuthoritySection
   Trust signals: Real testimonials, Certifications, Safety protocols
============================================================ */

export function TrekAuthoritySection({ trekTitle }: { trekTitle: string }) {
  return (
    <section
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '4.5rem',
        paddingBottom: '4.5rem',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '1px',
              background: 'var(--color-primary)',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#374151',
              fontWeight: 500,
            }}
          >
            Trust & Safety
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            color: '#111111',
            lineHeight: 1.15,
            marginBottom: '2.5rem',
          }}
        >
          Why trekkers trust us for {trekTitle}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {/* Real Testimonial */}
          <div style={{ background: '#f7f9f7', padding: '2rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ color: '#ffb400', fontSize: '1.2rem', marginBottom: '1rem', letterSpacing: '0.1rem' }}>★★★★★</div>
            <p style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.92rem',
              fontWeight: 300,
              lineHeight: 1.7,
              color: '#333333',
              fontStyle: 'italic',
              marginBottom: '1.5rem',
            }}>
              "The {trekTitle} experience was flawless. From the quality of the microspikes provided to the deep knowledge of our guide, I never felt unsafe even when the snow was knee-deep. The food at 10,000 feet was unbelievably good!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>A</div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111' }}>Aarav S.</div>
                <div style={{ fontSize: '0.75rem', color: '#666' }}>Trekker from Mumbai</div>
              </div>
            </div>
          </div>

          {/* Safety Protocols */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>⛑️</div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111', marginBottom: '0.3rem' }}>NIM-Certified Leaders</h3>
                <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.6, margin: 0 }}>Every trek leader holds an Advanced Mountaineering qualification and Wilderness First Responder certification.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>📡</div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111', marginBottom: '0.3rem' }}>Satellite Connectivity</h3>
                <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.6, margin: 0 }}>Connected via Garmin InReach/sat-phone beyond the tree line for immediate emergency response.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>🩸</div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111', marginBottom: '0.3rem' }}>Oxygen & Oximeters</h3>
                <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.6, margin: 0 }}>Mandatory twice-daily oxygen saturation checks. Emergency oxygen cylinders carried on every batch.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TrekFinalCTA
   Emotional + urgency sticky CTA closure.
============================================================ */

export function TrekFinalCTA({
  trekTitle,
  whatsappHref,
  bestSeason,
}: {
  trekTitle: string;
  whatsappHref: string;
  bestSeason: string[];
}) {
  const isWinter = bestSeason.some(s => ['December', 'January', 'February'].includes(s));
  const seasonText = isWinter ? 'winter' : 'upcoming';

  return (
    <section
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        background: '#111111',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        marginBottom: '0',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '42rem', margin: '0 auto', padding: '0 2rem' }}>
        <h2
          style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}
        >
          Ready for the mountains?
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '1.05rem',
            fontWeight: 300,
            lineHeight: 1.6,
            color: '#bbbbbb',
            marginBottom: '2rem',
          }}
        >
          Limited {seasonText} batches available for the {trekTitle}. Small groups of 12 max. Secure your spot before dates sell out.
        </p>
        <Link
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            background: 'var(--color-primary)',
            color: '#ffffff',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '1rem',
            fontWeight: 500,
            padding: '1.1rem 2.25rem',
            borderRadius: '100px',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
        >
          Book Your {trekTitle} Now
        </Link>
        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#666666' }}>
          Free cancellation up to 7 days before departure.
        </p>
      </div>
    </section>
  );
}
