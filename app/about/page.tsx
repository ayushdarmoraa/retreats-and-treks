import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import AllRetreatPrograms from '@/components/AllRetreatPrograms';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';

const PATH = '/about';

export function generateMetadata(): Metadata {
  return {
    title: 'About Retreats And Treks in the Himalayas',
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
      images: buildOgImages('About Retreats And Treks — Our Approach to Himalayan Retreat Design'),
    },
  };
}

export default function AboutPage() {
  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="About Retreats And Treks"
        description="Learn how Retreats And Treks designs structured Himalayan retreat experiences across carefully selected mountain locations in North India."
        path={PATH}
      />

      <style>{`
        .med-shell { width: 100vw; margin-left: calc(-50vw + 50%); }
        .med-outer { max-width: 76rem; margin: 0 auto; padding: 0 1.5rem; }
        .med-inner { max-width: 58rem; margin: 0 auto; padding: 0 1.5rem; }

        .med-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.1rem; }
        .med-eyebrow-line { width: 30px; height: 1px; background: rgba(15,118,110,0.35); flex-shrink: 0; }
        .med-eyebrow-text { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6b7280; font-weight: 600; }

        .med-h2 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.12; margin: 0 0 1.1rem; }
        .med-h2 span { color: #0f766e; }
        .med-h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.15rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.7rem; letter-spacing: -0.01em; }
        .med-body { font-family: var(--font-inter), sans-serif; font-size: 0.98rem; line-height: 1.9; color: #4b5259; font-weight: 400; margin: 0 0 1rem; }
        .med-body:last-child { margin-bottom: 0; }
        .med-body strong { color: #2B2A26; font-weight: 600; }

        .med-card {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(15,31,28,0.05);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .med-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: #0f766e; transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: 2;
        }
        .med-card:hover { transform: translateY(-6px); border-color: rgba(15,118,110,0.28); box-shadow: 0 22px 48px rgba(15,31,28,0.12); }
        .med-card:hover::before { transform: scaleX(1); }

        .med-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem 2.3rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.25); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid #0f766e; }
        .med-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.32); }
        .med-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.85rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .med-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 960px) { .med-grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } .med-grid-4 { grid-template-columns: 1fr; } }

        @keyframes med-hero-zoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        .med-hero-bg { animation: med-hero-zoom 24s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .med-hero-bg { animation: none; } }

        .med-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .med-list-item { display: grid; grid-template-columns: 1.9rem 1fr; gap: 0.9rem; }
        .med-list-dot { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid rgba(15,118,110,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .med-list-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; }
        .med-list-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #4b5259; font-weight: 400; }
        .med-list-text strong { color: #2B2A26; font-weight: 600; }

        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }

        .med-section-dark { background: #0b241f; color: #fff; }
        .med-section-dark .med-eyebrow-text { color: rgba(255,255,255,0.6); }
        .med-section-dark .med-eyebrow-line { background: rgba(94,234,212,0.4); }
        .med-section-dark .med-h2 { color: #fff; }
        .med-section-dark .med-h2 span { color: #5eead4; }
        .med-section-dark .med-body { color: rgba(255,255,255,0.72); }
        .med-section-dark .med-card { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.12); color: #fff; }
        .med-section-dark .med-card .med-h3 { color: #fff; }
        .med-section-dark .med-card .med-body { color: rgba(255,255,255,0.72); }
        .med-section-dark .med-card .med-season-tag { color: #5eead4; background: rgba(94,234,212,0.12); }
        .med-section-dark .med-card .med-cta-outline { color: #5eead4; border-color: rgba(94,234,212,0.3); }
        .med-section-dark .med-card .med-cta-outline:hover { background: rgba(94,234,212,0.1); border-color: #5eead4; }
        .med-section-dark .med-card::before { background: #5eead4; }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-card-link { text-decoration: none; display: block; height: 100%; }
        .med-card-link .med-card { height: 100%; display: flex; flex-direction: column; }

        .med-location-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 960px) { .med-location-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px) { .med-location-grid { grid-template-columns: 1fr; } }

        .med-location-card { overflow: hidden; }
        .med-location-card .med-img-wrap { position: relative; width: 100%; height: 180px; overflow: hidden; }
        .med-location-card .med-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .med-location-card .med-body-wrap { padding: 1.5rem; }

        .med-split-section { display: grid; grid-template-columns: 1fr 1fr; gap: 0; min-height: 400px; }
        .med-split-section .med-split-image { position: relative; min-height: 400px; overflow: hidden; }
        .med-split-section .med-split-image img { width: 100%; height: 100%; object-fit: cover; }
        .med-split-section .med-split-content { padding: 4rem; display: flex; flex-direction: column; justify-content: center; background: #0b241f; color: #fff; }
        .med-split-section .med-split-content .med-h2 { color: #fff; }
        .med-split-section .med-split-content .med-h2 span { color: #5eead4; }
        .med-split-section .med-split-content .med-body { color: rgba(255,255,255,0.72); }
        @media (max-width: 860px) { .med-split-section { grid-template-columns: 1fr; } .med-split-section .med-split-image { min-height: 300px; } .med-split-section .med-split-content { padding: 2rem; } }

        .med-feature-item { border-left: 2px solid #0f766e; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .med-feature-item:last-child { margin-bottom: 0; }
        .med-feature-item .med-h3 { margin-bottom: 0.3rem; }

        .med-dark-link-card { display: block; background: rgba(255,255,255,0.06); padding: 1.25rem 2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); text-decoration: none; color: #fff; transition: background 0.2s, transform 0.2s; font-family: var(--font-inter), sans-serif; font-size: 1rem; }
        .med-dark-link-card:hover { background: rgba(255,255,255,0.12); transform: translateY(-2px); }

        .med-nav-links { display: flex; flex-direction: column; gap: 1rem; }
      `}</style>

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b241f' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/Journeys/HighTerrain.webp" alt="Himalayan mountain peaks" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>Our Story &amp; Philosophy</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.4)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.5rem', lineHeight: 1.08, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Designing the Himalayan <br />
            <span style={{ color: '#5eead4', fontWeight: 500 }}>Experience</span>
          </h1>
          <p style={{ maxWidth: '46rem', margin: '0 auto', fontFamily: 'var(--font-inter), sans-serif', fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)', fontWeight: 400, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>
            We design clear retreat and trekking journeys across selected mountain landscapes in North India.
          </p>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner" style={{ textAlign: 'center' }}>
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Environment</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ marginBottom: '2rem' }}>The Logic of the <span>Mountains</span></h2>
          <div style={{ textAlign: 'left' }}>
            <p className="med-body" style={{ fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              The Himalayan region of North India naturally supports inner work. Quieter places, cooler weather, open landscapes, and fewer distractions create space for rest, reflection, and change.
            </p>
            <p className="med-body" style={{ fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              <strong>Retreats are not just vacations in quiet places.</strong> They are carefully designed spaces for reset. The Himalayas give that process steadiness, silence, and room to work.
            </p>
            <p className="med-body" style={{ fontSize: '1.05rem', marginBottom: 0 }}>
              We focus on mountain settings because place changes pace. Open ridgelines, forest trails, and distance from city noise help the body and mind slow down.
            </p>
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY ── */}
      <section className="med-shell med-split-section">
        <div className="med-split-image">
          <img src="/Images/Journeys/yoga.webp" alt="Structured morning yoga and meditation session in a Himalayan retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="med-split-content">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" style={{ background: 'rgba(94,234,212,0.4)' }} />
            <span className="med-eyebrow-text" style={{ color: 'rgba(255,255,255,0.6)' }}>Program Design</span>
          </div>
          <h2 className="med-h2">Pacing Over <span>Productivity</span></h2>

          <div className="med-feature-item">
            <h3 className="med-h3" style={{ color: '#fff' }}>Designing for Rhythm</h3>
            <p className="med-body" style={{ color: 'rgba(255,255,255,0.72)' }}>Each program is built around rhythm, not intensity. Days balance guided sessions, quiet time, shared meals, and space to reflect.</p>
          </div>
          <div className="med-feature-item">
            <h3 className="med-h3" style={{ color: '#fff' }}>Creating Containment</h3>
            <p className="med-body" style={{ color: 'rgba(255,255,255,0.72)' }}>Program design values calm over stimulation. Instead of filling every hour, our journeys leave space for the mind to settle.</p>
          </div>
          <div className="med-feature-item">
            <h3 className="med-h3" style={{ color: '#fff' }}>Expert Facilitation</h3>
            <p className="med-body" style={{ color: 'rgba(255,255,255,0.72)' }}>Our facilitators are chosen for a retreat-first approach, not performance-driven formats. The aim is not productivity. It is rest, clarity, and reset.</p>
          </div>
        </div>
      </section>

      {/* ── LOCATION PHILOSOPHY ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Destinations</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>Curating the <span>Wild</span></h2>
          <p className="med-body" style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 2.5rem' }}>
            Not every mountain destination supports deep work. We choose places with quiet surroundings, practical access, and reliable seasons.
          </p>

          <div className="med-location-grid">
            {[
              { name: 'Chakrata', img: '/Images/location/chakrata.webp', desc: 'Forest containment on a quiet cantonment ridge, 2,200m.' },
              { name: 'Sankri', img: '/Images/location/sankri.webp', desc: 'Remote valley immersion near Govind Wildlife Sanctuary.' },
              { name: 'Munsiyari', img: '/Images/location/munsiyari.webp', desc: 'Alpine silence facing the massive Panchachuli range.' },
              { name: 'Rishikesh', img: '/Images/location/rishikesh.webp', desc: 'Structured yoga infrastructure on the riverbank.' }
            ].map((loc) => (
              <div key={loc.name} className="med-card med-location-card">
                <div className="med-img-wrap">
                  <img src={loc.img} alt={`${loc.name} — Himalayan retreat location`} />
                </div>
                <div className="med-body-wrap">
                  <h3 className="med-h3">{loc.name}</h3>
                  <p className="med-body" style={{ fontSize: '0.9rem', marginBottom: 0 }}>{loc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Participant</span>
          </div>
          <h2 className="med-h2">Who These Journeys Are <span>Built For</span></h2>
          <p className="med-body" style={{ fontSize: '1.05rem', marginBottom: '2.5rem' }}>
            Our retreats are for people who need an intentional pause. You do not need prior retreat experience. What matters is a willingness to slow down and reflect.
          </p>

          <div className="med-grid-2">
            {[
              { label: 'High-Paced Professionals', body: 'People under steady work pressure who need real rest without using all their annual leave.' },
              { label: 'Founders & Leaders', body: 'Entrepreneurs in transition who need distance from fast decisions and constant pressure.' },
              { label: 'Creative Thinkers', body: 'People who need uninterrupted thinking space. Mountain settings remove the noise that blocks creative reset.' },
              { label: 'First-time Participants', body: 'Our retreat-first design keeps programs accessible for beginners while still offering depth.' }
            ].map((item, i) => (
              <div key={i} className="med-card" style={{ padding: '1.75rem', borderLeft: '3px solid #0f766e' }}>
                <h3 className="med-h3" style={{ fontSize: '1.05rem' }}>{item.label}</h3>
                <p className="med-body" style={{ fontSize: '0.9rem', marginBottom: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANNING & EXPLORATION LINKS ── */}
      <section className="med-shell med-section-dark" style={{ padding: '4rem 0' }}>
        <div className="med-inner" style={{ textAlign: 'center' }}>
          <h2 className="med-h2" style={{ marginBottom: '2rem' }}>Begin Your <span>Planning</span></h2>
          <div className="med-nav-links">
            <Link href="/topics/retreat-decision" className="med-dark-link-card">
              Read our Decision &amp; Planning Guides →
            </Link>
            <Link href="/locations" className="med-dark-link-card">
              Explore all our Basecamp Locations →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell" style={{ background: '#ffffff', padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-nav-grid">
            <Link href="/" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Home</span>
            </Link>
            <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreats</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/treks" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Treks</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/locations" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Locations</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
          </div>
        </div>
      </nav>
    </TrackedPage>
  );
}
