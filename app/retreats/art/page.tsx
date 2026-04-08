import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import Breadcrumb from '@/components/Breadcrumb';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return {
    title: 'Art Retreats | Retreats And Treks',
    description:
      'Creative retreats combining art, nature, and healing practices in the Himalayas. Expressive arts, yoga, and nature immersion designed for authentic expression.',
    alternates: {
      canonical: buildCanonicalUrl('/retreats/art'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const artPrograms = [
  {
    title: 'Creative Healing Retreat',
    description: 'Emotional healing through art & yoga in a container designed for authentic expression.',
    href: '/retreats/journeys/art-and-creative',
    image: '/Images/services/artcreative.webp',
    tag: 'Available Now',
  },
  {
    title: 'Trek & Paint Retreat',
    description: 'Combine Himalayan treks with plein-air painting sessions in stunning mountain landscapes.',
    href: null,
    image: null,
    tag: 'Coming Soon',
  },
  {
    title: 'Art & Nature Retreat',
    description: 'Immersive nature-based art practice — drawing, journaling, and creating in forest and mountain settings.',
    href: null,
    image: null,
    tag: 'Coming Soon',
  },
];

export default function ArtRetreatsPage() {
  return (
    <main style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>

      <style>{`
        .art-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.75rem;
        }
        .art-card {
          display: block;
          text-decoration: none;
          color: inherit;
          border-radius: 6px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 18px rgba(0,0,0,0.06);
          transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s;
        }
        .art-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        }
        .art-card-disabled {
          pointer-events: none;
        }
        .art-img-wrap { position: relative; overflow: hidden; }
        .art-img {
          width: 100%; height: 210px;
          object-fit: cover; display: block;
          transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .art-card:hover .art-img { transform: scale(1.07); }
        .art-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(2,10,2,0.65) 0%, rgba(2,10,2,0.1) 50%, rgba(2,10,2,0) 100%);
        }
        .art-img-tag {
          position: absolute; top: 1rem; left: 1rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.52rem; letter-spacing: 0.24em;
          text-transform: uppercase; color: #ffffff;
          background: var(--color-primary); padding: 4px 10px;
          border-radius: 2px; font-weight: 600;
        }
        .art-img-tag-soon {
          background: #888888;
        }
        .art-placeholder {
          width: 100%; height: 210px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #f0f4f0 0%, #e8ede8 100%);
          color: #aaaaaa;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
        }
        .art-body {
          padding: 1.4rem 1.5rem 1.6rem;
          border-top: 2px solid var(--color-primary);
        }
        .art-card-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem; font-weight: 600; color: #111111;
          margin: 0 0 0.45rem; letter-spacing: -0.015em; line-height: 1.25;
        }
        .art-card-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.87rem; color: #777777;
          margin: 0 0 1.35rem; line-height: 1.8; font-weight: 300;
        }
        .art-cta {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #374151;
        }
      `}</style>

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Art Retreats' },
        ]}
      />

      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0, display: 'inline-block' }} />
          <span style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: '#374151'
          }}>
            Art & Creativity
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
          fontWeight: 200,
          letterSpacing: '-0.03em',
          color: '#111111',
          lineHeight: 1.15,
          margin: '0 0 1rem 0',
        }}>
          Art Retreats
        </h1>

        <p style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.92rem',
          fontWeight: 300,
          lineHeight: 1.85,
          color: '#555555',
          margin: 0,
          maxWidth: '52rem',
        }}>
          Creative retreats combining art, nature, and healing practices. These programs use expressive arts — painting, writing, movement, and other forms — as doorways to emotional truth and creative reconnection.
        </p>

        <p style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.88rem',
          fontWeight: 300,
          lineHeight: 1.85,
          color: '#555555',
          marginTop: '1rem',
        }}>
          <Link href="/creative-retreat" style={{ color: '#374151', textDecoration: 'underline' }}>
            Learn about the Creative Healing Retreat experience →
          </Link>
        </p>
      </div>

      {/* Program Cards */}
      <div className="art-grid">
        {artPrograms.map((program) => {
          const isAvailable = program.href !== null;

          const inner = (
            <>
              <div className="art-img-wrap">
                {program.image ? (
                  <Image src={program.image} alt={program.title} className="art-img" width={400} height={210} sizes="(max-width: 768px) 100vw, 33vw" quality={70} />
                ) : (
                  <div className="art-placeholder">Coming Soon</div>
                )}
                {program.image && <div className="art-img-overlay" />}
                <span className={`art-img-tag${!isAvailable ? ' art-img-tag-soon' : ''}`}>
                  {program.tag}
                </span>
              </div>
              <div className="art-body">
                <h2 className="art-card-title">{program.title}</h2>
                <p className="art-card-desc">{program.description}</p>
                {isAvailable && <div className="art-cta">Learn more →</div>}
              </div>
            </>
          );

          if (isAvailable) {
            return (
              <Link key={program.title} href={program.href as string} className="art-card">
                {inner}
              </Link>
            );
          }

          return (
            <div key={program.title} className="art-card art-card-disabled">
              {inner}
            </div>
          );
        })}
      </div>

    </main>
  );
}
