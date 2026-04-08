import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
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
      images: buildOgImages('About Retreats And Treks — Our Approach to Himalayan Retreat Design'),
    },
  };
}

export default function AboutPage() {
  return (
    <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>

      <style>{`
        .abt-why-item { border-left: 2px solid var(--color-primary); padding-left: 1rem; margin-bottom: 1.25rem; }
        .abt-why-item p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; margin: 0; }

        .abt-loc-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1.75rem; }
        .abt-loc-card { background: #fff; border: 1px solid #eef0ee; border-top: 2px solid var(--color-primary); border-radius: 8px; overflow: hidden; }
        .abt-loc-card img { width: 100%; height: 140px; object-fit: cover; display: block; }
        .abt-loc-card-body { padding: 1rem 1.1rem; }
        .abt-loc-card-body p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.82rem; font-weight: 300; line-height: 1.75; color: #555; margin: 0; }
        .abt-loc-label { font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 500; color: #111; margin: 0 0 0.3rem; letter-spacing: -0.01em; }

        .abt-who-item { display: flex; gap: 1rem; padding: 0.85rem 0; border-bottom: 1px solid #f0f0f0; }
        .abt-who-item:last-child { border-bottom: none; }
        .abt-who-dot { flex-shrink: 0; margin-top: 0.55rem; width: 8px; height: 8px; border-radius: 50%; background: var(--color-primary); opacity: 0.6; }
        .abt-who-item p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; margin: 0; }

        .abt-vision-callout { background: #fff; border: 1px solid #e5e7eb; border-left: 3px solid var(--color-primary); border-radius: 8px; padding: 1rem 1.25rem; margin-bottom: 0.75rem; }
        .abt-vision-callout p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; margin: 0; }

        .abt-nav-group { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .abt-nav-link { display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; border-bottom: 1px solid #f0f0f0; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #333; text-decoration: none; transition: background 0.15s, color 0.15s; }
        .abt-nav-link:last-child { border-bottom: none; }
        .abt-nav-link:hover { background: #f7f9f7; color: var(--color-primary); }
        .abt-nav-link::after { content: '→'; color: var(--color-primary); opacity: 0.5; }

        .abt-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .abt-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; display: inline-block; }
        .abt-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--color-primary); font-weight: 500; opacity: 0.7; }
        .abt-h2 { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200; letter-spacing: -0.03em; color: #111; line-height: 1.15; margin: 0 0 0.75rem; }
        .abt-body { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; margin: 0 0 1rem; }

        @media (max-width: 700px) {
          .abt-loc-grid { grid-template-columns: 1fr; }
          .abt-loc-card img { height: 120px; }
        }
      `}</style>

      <article>

        {/* ── HERO ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="abt-eyebrow">
              <span className="abt-eyebrow-line" />
              <span className="abt-eyebrow-text">About</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: 'clamp(1.75rem,3.5vw,2.4rem)', fontWeight: 200, letterSpacing: '-0.035em', color: '#111', lineHeight: 1.1, margin: '0 0 1.25rem' }}>
              About Retreats And Treks
            </h1>
            <p className="abt-body" style={{ margin: 0 }}>
              Retreats And Treks designs structured Himalayan retreat experiences across carefully selected mountain locations in North India. This page explains our approach, our location philosophy, and who our programs are built for.
            </p>
          </div>
        </section>

        {/* ── WHY HIMALAYAN RETREATS ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="abt-eyebrow">
              <span className="abt-eyebrow-line" />
              <span className="abt-eyebrow-text">Our Focus</span>
            </div>
            <h2 className="abt-h2">Why We Focus on Himalayan Retreats</h2>
            <div style={{ marginTop: '1.5rem' }}>
              {[
                'The Himalayan region of North India offers environmental conditions that meaningfully support retreat work. Lower population density, reduced sensory stimulation, cooler climates, and expansive landscapes create natural containment for structured reflection.',
                'Retreats are not simply vacations in quiet places. They are intentionally designed containers for recalibration. The Himalayas provide the environmental stability required for that container to function effectively.',
                'We focus specifically on mountain-based retreat environments because geography influences psychological pace. Open ridgelines, forested trails, and reduced urban exposure support sustained attention in ways that high-density destinations do not.',
              ].map((text, i) => (
                <div key={i} className="abt-why-item"><p>{text}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW WE DESIGN ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="abt-eyebrow">
              <span className="abt-eyebrow-line" />
              <span className="abt-eyebrow-text">Program Design</span>
            </div>
            <h2 className="abt-h2">How We Design Retreat Programs</h2>
            <img
              src="/Images/Journeys/yoga.webp"
              alt="Structured morning yoga session in a Himalayan retreat setting"
              loading="lazy"
              style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '8px', margin: '1.5rem 0', display: 'block' }}
            />
            <div>
              {[
                'Each retreat program is structured around rhythm rather than intensity. Days are intentionally paced to balance guided sessions, quiet integration time, shared meals, and unstructured reflection.',
                'Program design prioritizes containment over stimulation. Rather than compressing activities into tight schedules, retreats are built to allow transition into slower mental states.',
                'Facilitators are selected based on alignment with retreat-first methodology rather than performance-driven formats. The objective is not productivity, but recalibration.',
              ].map((text, i) => (
                <div key={i} className="abt-why-item"><p>{text}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOCATION SELECTION ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="abt-eyebrow">
              <span className="abt-eyebrow-line" />
              <span className="abt-eyebrow-text">Locations</span>
            </div>
            <h2 className="abt-h2">Our Location Selection Philosophy</h2>
            <p className="abt-body">
              Not all mountain destinations are equally suited for retreat formats. We prioritize locations that offer environmental quiet, manageable accessibility, and stable seasonal conditions.
            </p>
            <p className="abt-body">
              Locations such as Chakrata, Sankri, Munsiyari, and Rishikesh are selected for specific reasons — ranging from forest containment to valley immersion to structured yoga infrastructure.
            </p>
            <p className="abt-body">
              Geographic selection is deliberate. Retreat work depends on environmental reinforcement rather than environmental resistance.
            </p>
            <div className="abt-loc-grid">
              {[
                { name: 'Chakrata', img: '/Images/location/chakrata.webp', desc: 'Forest containment on a quiet cantonment ridge, 2,200m.' },
                { name: 'Sankri', img: '/Images/location/sankri.webp', desc: 'Remote valley immersion near Govind Wildlife Sanctuary.' },
                { name: 'Munsiyari', img: '/Images/location/munsiyari.webp', desc: 'Alpine silence facing the Panchachuli range, Kumaon.' },
                { name: 'Rishikesh', img: '/Images/location/rishikesh.webp', desc: 'Structured yoga infrastructure on the Ganges riverbank.' },
              ].map((loc) => (
                <div key={loc.name} className="abt-loc-card">
                  <Image src={loc.img} alt={`${loc.name} — Himalayan retreat location`} width={400} height={200} sizes="(max-width: 768px) 100vw, 25vw" quality={70} />
                  <div className="abt-loc-card-body">
                    <p className="abt-loc-label">{loc.name}</p>
                    <p>{loc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO IT'S FOR ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="abt-eyebrow">
              <span className="abt-eyebrow-line" />
              <span className="abt-eyebrow-text">Who It's For</span>
            </div>
            <h2 className="abt-h2">Who Our Retreats Are Designed For</h2>
            <p className="abt-body" style={{ marginBottom: '1.5rem' }}>
              Our retreats are structured for individuals seeking intentional pause. Programs are designed to accommodate mixed experience levels. Prior retreat experience is not required. What matters is willingness to engage with slower pacing and structured reflection.
            </p>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fff', padding: '0 1.25rem' }}>
              {[
                { label: 'Professionals under sustained workload pressure', body: '— seeking structured restoration without consuming annual leave.' },
                { label: 'Founders navigating transition', body: '— requiring genuine separation from decision-making environments.' },
                { label: 'Creatives needing uninterrupted thought space', body: '— mountain environments remove the stimuli that block creative recalibration.' },
                { label: 'First-time retreat participants', body: '— retreat-first design means programs remain accessible without sacrificing depth.' },
              ].map((item, i) => (
                <div key={i} className="abt-who-item">
                  <div className="abt-who-dot" />
                  <p><strong style={{ fontWeight: 500, color: '#111' }}>{item.label}</strong>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LONG-TERM VISION ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="abt-eyebrow">
              <span className="abt-eyebrow-line" />
              <span className="abt-eyebrow-text">Long-Term Vision</span>
            </div>
            <h2 className="abt-h2">Our Long-Term Vision</h2>
            <div style={{ marginTop: '1.5rem' }}>
              {[
                'Retreats And Treks is built as a Himalayan retreat authority platform rather than a single-location operator. Our long-term vision is to curate structured mountain-based programs across carefully selected regions while maintaining program quality and environmental integrity.',
                'We believe retreat environments should remain smaller-scale, structured, and intentionally designed. Growth is approached through geographic depth rather than volume expansion.',
                'By combining structured retreat programming with carefully selected mountain settings, we aim to build a sustainable ecosystem that supports both participants and the regions that host them.',
              ].map((text, i) => (
                <div key={i} className="abt-vision-callout"><p>{text}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KNOWLEDGE BASE ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div className="abt-eyebrow">
              <span className="abt-eyebrow-line" />
              <span className="abt-eyebrow-text">Knowledge Base</span>
            </div>
            <h2 className="abt-h2" style={{ marginBottom: '1.75rem' }}>Explore Our Retreat Knowledge Base</h2>
            <div className="abt-nav-group">
              <Link href="/topics/retreat-decision" className="abt-nav-link">
                Decision &amp; Planning Guides
              </Link>
              <Link href="/topics/location-authority" className="abt-nav-link">
                Location-Based Retreat Guides
              </Link>
            </div>
          </div>
        </section>

        {/* ── ALL RETREAT PROGRAMS ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <AllRetreatPrograms />
          </div>
        </section>

      </article>
    </main>
  );
}