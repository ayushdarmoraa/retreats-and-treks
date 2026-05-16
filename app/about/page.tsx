import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import AllRetreatPrograms from '@/components/AllRetreatPrograms';

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
    <main style={{ overflowX: 'hidden' }}>

      {/* ── CINEMATIC HERO ── */}
      <section style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#111',
        overflow: 'hidden'
      }}>
        <Image
          src="/Images/Journeys/HighTerrain.webp"
          alt="Himalayan mountain peaks"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
          zIndex: 1
        }} />
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '56rem',
          margin: '0 auto',
          padding: '0 2rem',
          textAlign: 'center',
          color: '#fff',
          marginTop: '4rem'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ width: '24px', height: '1px', background: '#e5e7eb', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#e5e7eb', fontWeight: 500 }}>
              Our Story & Philosophy
            </span>
            <span style={{ width: '24px', height: '1px', background: '#e5e7eb', display: 'inline-block' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
            fontWeight: 200, letterSpacing: '-0.035em',
            lineHeight: 1.1,
            margin: '0 0 1.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}>
            Designing the Himalayan <br />
            <span style={{ color: '#aaa', fontWeight: 200 }}>Experience</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)',
            fontWeight: 300,
            lineHeight: 1.7,
            color: '#f3f4f6',
            margin: '0 auto',
            maxWidth: '46rem',
            textShadow: '0 1px 5px rgba(0,0,0,0.5)'
          }}>
            We design clear retreat and trekking journeys across selected mountain landscapes in North India.
          </p>
        </div>
      </section>

      {/* ── MANIFESTO (Why We Focus on Himalayan Retreats) ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '8rem', paddingBottom: '8rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: 24, height: 1, background: 'var(--color-primary)' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151', fontWeight: 500 }}>
              The Environment
            </span>
            <span style={{ width: 24, height: 1, background: 'var(--color-primary)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111', margin: '0 0 2.5rem' }}>
            The Logic of the Mountains
          </h2>
          <div style={{ columns: '1', columnGap: '3rem', textAlign: 'left' }}>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.85, color: '#444', marginBottom: '1.5rem' }}>
              The Himalayan region of North India naturally supports inner work. Quieter places, cooler weather, open landscapes, and fewer distractions create space for rest, reflection, and change.
            </p>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.85, color: '#444', marginBottom: '1.5rem' }}>
              <strong>Retreats are not just vacations in quiet places.</strong> They are carefully designed spaces for reset. The Himalayas give that process steadiness, silence, and room to work.
            </p>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.85, color: '#444', marginBottom: '0' }}>
              We focus on mountain settings because place changes pace. Open ridgelines, forest trails, and distance from city noise help the body and mind slow down.
            </p>
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY (Image + Text Split) ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#111', color: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 50%', minWidth: '300px', position: 'relative', minHeight: '600px' }}>
            <Image
              src="/Images/Journeys/yoga.webp"
              alt="Structured morning yoga and meditation session in a Himalayan retreat setting"
              width={1200}
              height={900}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div style={{ flex: '1 1 50%', minWidth: '300px', padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ width: 24, height: 1, background: '#666' }} />
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#ccc', fontWeight: 500 }}>
                Program Design
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 2rem' }}>
              Pacing Over <span style={{ color: '#aaa', fontWeight: 200 }}>Productivity</span>
            </h2>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {[
                { title: 'Designing for Rhythm', body: 'Each program is built around rhythm, not intensity. Days balance guided sessions, quiet time, shared meals, and space to reflect.' },
                { title: 'Creating Containment', body: 'Program design values calm over stimulation. Instead of filling every hour, our journeys leave space for the mind to settle.' },
                { title: 'Expert Facilitation', body: 'Our facilitators are chosen for a retreat-first approach, not performance-driven formats. The aim is not productivity. It is rest, clarity, and reset.' }
              ].map((item, i) => (
                <div key={i} style={{ borderLeft: '2px solid var(--color-primary)', paddingLeft: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.1rem', fontWeight: 500, color: '#fff', margin: '0 0 0.5rem' }}>{item.title}</h3>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.7, color: '#ccc', margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION PHILOSOPHY (Visual Cards) ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '6rem', paddingBottom: '6rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ width: 24, height: 1, background: 'var(--color-primary)' }} />
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151', fontWeight: 500 }}>
                Destinations
              </span>
              <span style={{ width: 24, height: 1, background: 'var(--color-primary)' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111', margin: '0 0 1rem' }}>
              Curating the Wild
            </h2>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1rem', fontWeight: 300, color: '#555', maxWidth: '42rem', margin: '0 auto' }}>
              Not every mountain destination supports deep work. We choose places with quiet surroundings, practical access, and reliable seasons.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Chakrata', img: '/Images/location/chakrata.webp', desc: 'Forest containment on a quiet cantonment ridge, 2,200m.' },
              { name: 'Sankri', img: '/Images/location/sankri.webp', desc: 'Remote valley immersion near Govind Wildlife Sanctuary.' },
              { name: 'Munsiyari', img: '/Images/location/munsiyari.webp', desc: 'Alpine silence facing the massive Panchachuli range.' },
              { name: 'Rishikesh', img: '/Images/location/rishikesh.webp', desc: 'Structured yoga infrastructure on the riverbank.' }
            ].map((loc) => (
               <div key={loc.name} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', transition: 'transform 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }} className="hover:-translate-y-1">
                 <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                   <Image src={loc.img} alt={`${loc.name} — Himalayan retreat location`} width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} sizes="(max-width: 768px) 100vw, 300px" />
                 </div>
                 <div style={{ padding: '1.5rem' }}>
                   <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.15rem', fontWeight: 600, color: '#111', margin: '0 0 0.5rem' }}>{loc.name}</h3>
                   <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.6, color: '#555', margin: 0 }}>{loc.desc}</p>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '6rem', paddingBottom: '6rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: 24, height: 1, background: 'var(--color-primary)' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151', fontWeight: 500 }}>
              The Participant
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111', margin: '0 0 1.5rem' }}>
            Who These Journeys Are Built For
          </h2>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.7, color: '#444', marginBottom: '3rem' }}>
            Our retreats are for people who need an intentional pause. You do not need prior retreat experience. What matters is a willingness to slow down and reflect.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { label: 'High-Paced Professionals', body: 'People under steady work pressure who need real rest without using all their annual leave.' },
              { label: 'Founders & Leaders', body: 'Entrepreneurs in transition who need distance from fast decisions and constant pressure.' },
              { label: 'Creative Thinkers', body: 'People who need uninterrupted thinking space. Mountain settings remove the noise that blocks creative reset.' },
              { label: 'First-time Participants', body: 'Our retreat-first design keeps programs accessible for beginners while still offering depth.' }
            ].map((item, i) => (
              <div key={i} style={{ background: '#f7f9f7', padding: '1.75rem', borderRadius: '12px', border: '1px solid #e5e7eb', borderLeft: '3px solid var(--color-primary)' }}>
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.05rem', fontWeight: 600, color: '#111', margin: '0 0 0.5rem' }}>{item.label}</h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.6, color: '#555', margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANNING & EXPLORATION LINKS ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#111', color: '#fff', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 2.5rem' }}>
            Begin Your Planning
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/topics/retreat-decision" style={{
              display: 'block', background: '#222', padding: '1.25rem 2rem', borderRadius: '8px', border: '1px solid #333',
              fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1rem', color: '#fff', textDecoration: 'none', transition: 'background 0.2s'
            }} className="hover:bg-[#333]">
              Read our Decision &amp; Planning Guides →
            </Link>
            <Link href="/locations" style={{
              display: 'block', background: '#222', padding: '1.25rem 2rem', borderRadius: '8px', border: '1px solid #333',
              fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1rem', color: '#fff', textDecoration: 'none', transition: 'background 0.2s'
            }} className="hover:bg-[#333]">
              Explore all our Basecamp Locations →
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}