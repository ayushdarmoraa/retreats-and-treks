import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/retreats/uttarakhand-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Uttarakhand Retreats | Retreats And Treks',
    description:
      'Explore retreats in Uttarakhand across Munsiyari, Sankri, Chakrata, and Rishikesh, with yoga, meditation, and Himalayan wellness programs.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Uttarakhand Retreats in the Himalayas — Mountain Wellness Stays',
      description:
        'Yoga, meditation and wellness retreats across Uttarakhand. Programs in Munsiyari, Sankri, Chakrata and Rishikesh — from quiet alpine space to riverside retreat stays.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Uttarakhand Retreats in the Himalayas — Mountain Wellness Stays'),
    },
  };
}

const DESTINATIONS = [
  {
    id: 'munsiyari',
    name: 'Munsiyari',
    tag: "Kumaon's Alpine Sanctuary",
    context:
      'Panchachuli views, twelve hours from Delhi. The most remote and visually dramatic retreat location in the network — quiet as the main ingredient.',
    image: '/Images/location/munsiyari.webp',
  },
  {
    id: 'sankri',
    name: 'Sankri',
    tag: 'Gateway to the High Himalayas',
    context:
      'Upper Tons Valley, pine and oak forests. Where retreat calm meets trekking adventure — eight to nine hours from Delhi.',
    image: '/Images/location/sankri.webp',
  },
  {
    id: 'chakrata',
    name: 'Chakrata',
    tag: 'Quiet Garhwal Hill Retreat',
    context:
      'Cantonment calm, deodar canopy, six to seven hours from Delhi. The reliable default for first-time Uttarakhand retreat guests.',
    image: '/Images/location/chakrata.webp',
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    tag: 'Riverside Yoga & Meditation Hub',
    context:
      "India's yoga capital on the Ganges — five to six hours from Delhi. Ashram tradition and the deepest teacher pool in the network.",
    image: '/Images/location/rishikesh.webp',
  },
];

const FAQ_ITEMS = [
  {
    question: 'What is the best location for retreats in Uttarakhand?',
    answer:
      'It depends on what you are seeking. Munsiyari offers the most remote alpine experience with Panchachuli views. Sankri provides deep forest retreat time in the upper Tons Valley. Chakrata delivers easy-to-reach mountain calm six to seven hours from Delhi. Rishikesh is the established centre for yoga and meditation with the shortest travel time from the capital. Each location serves a different retreat goal — solitude, forest quiet, convenience, or spiritual tradition.',
  },
  {
    question: 'Is Uttarakhand suitable for retreats year-round?',
    answer:
      'Yes, with season changes by location. Rishikesh and Chakrata operate comfortably year-round. Munsiyari and Sankri are best from late March through November — winter snowfall limits road access at higher mountains. October and November are the most popular months across all locations. May and June draw people escaping summer heat. December through February is ideal for those seeking winter stillness at easy-to-reach elevations like Rishikesh and Chakrata.',
  },
  {
    question: 'Which district is best for a mountain retreat in Uttarakhand?',
    answer:
      'Uttarkashi district (Sankri) and Pithoragarh district (Munsiyari) offer the highest and deepest mountain settings. Dehradun district covers both Chakrata and Rishikesh — the two easiest destinations. Garhwal locations tend toward forest and river settings. Kumaon locations lean toward alpine grandeur and wide mountain views. The choice of district is really a choice of landscape.',
  },
  {
    question: 'How far are Uttarakhand retreats from Delhi?',
    answer:
      'Rishikesh is the closest at five to six hours by road. Chakrata takes six to seven hours via Dehradun. Sankri requires eight to nine hours. Munsiyari is the most remote at approximately twelve hours by road or a combination of train to Kathgodam and road transfer. All locations are reachable without flights — road travel from Delhi is the standard approach, with overnight options available for longer journeys.',
  },
  {
    question: 'Are retreats in Uttarakhand beginner-friendly?',
    answer:
      'All retreat programs across Uttarakhand are designed for mixed experience levels. Yoga and meditation sessions are guided with simple changes for beginners. No prior practice is required. Teachers adapt to the group — first-time guests receive personal guidance within group sessions. Weekend formats at Chakrata and Rishikesh are especially accessible for those new to guided retreats.',
  },
  {
    question: 'What types of retreats are available in Uttarakhand?',
    answer:
      'Uttarakhand hosts yoga retreats, meditation and silence retreats, burnout recovery programs, sound healing programs, creative retreats, and weekend reset formats. Programs range from two nights to seven days. Seasonal formats run in summer and winter with location-based scheduling. Private and custom retreats are available for couples, small groups, and corporate teams across all four locations.',
  },
];

export default function UttarakhandRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Uttarakhand Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Uttarakhand Retreats in the Himalayas"
        description="Explore retreats in Uttarakhand across Munsiyari, Sankri, Chakrata, and Rishikesh, with yoga, meditation, and Himalayan wellness programs."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Uttarakhand Retreats' },
        ]}
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

        .med-thumb-img { transition: transform 0.7s cubic-bezier(0.22,1,0.36,1) !important; }
        .med-loc-card:hover .med-thumb-img { transform: scale(1.06); }
        .med-loc-card { position: relative; overflow: hidden; transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease; }
        .med-loc-card:hover { transform: translateY(-5px); box-shadow: 0 20px 44px rgba(10,31,28,0.28); }

        .med-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem 2.3rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.25); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid #0f766e; }
        .med-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.32); }
        .med-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.85rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .med-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 960px) { .med-grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } }
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

        .med-season-card { padding: 1.6rem; }
        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }
      `}</style>

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/location/munsiyari.webp" alt="Uttarakhand retreats in the Himalayas" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Mountain Wellness &middot; India</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Uttarakhand Retreats in the Himalayas
          </h1>
          <p style={{ maxWidth: '42rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Yoga, meditation, and wellness across Munsiyari, Sankri, Chakrata, and Rishikesh — every altitude, setting, and access level in one corridor.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['4 Locations', 'Year-Round', '5–12 Hrs from Delhi', 'Weekend to 7 Days'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.45rem 0.9rem', background: 'rgba(15,118,110,0.35)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in a retreat in Uttarakhand. Can you tell me more?")}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Check Dates &amp; Programs</a>
            <a href="#destinations" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Compare Locations</a>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">India&apos;s Definitive Retreat State</span>
          </div>
          <h2 className="med-h2">Every landscape a retreat guest could <span>seek</span></h2>
          <p className="med-body">
            Uttarakhand is India&apos;s definitive Himalayan retreat state. Stretching across
            the Garhwal and Kumaon divisions, it holds every landscape a retreat guest
            could seek — from the spiritual riverbanks of Rishikesh to the quiet alpine space of
            Munsiyari, from dense oak forests in the Tons Valley to quiet cantonment ridges
            above Dehradun. No other Indian state offers this range of altitude, setting,
            and access in one corridor.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            Four different retreat places work across Uttarakhand, each serving a
            different goal and traveller type. Whether the goal is guided yoga
            practice, silent meditation, burnout recovery, or simply a deliberate pause in
            clean mountain air — the landscape here supports it. And every location sits within
            a day&apos;s drive of Delhi, making these programs accessible without flights or
            complex travel planning.
          </p>
        </div>
      </section>

      {/* ── WHY UTTARAKHAND ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Why Here</span>
          </div>
          <h2 className="med-h2">Why Uttarakhand Is Ideal for <span>Himalayan Retreats</span></h2>
          <p className="med-body">
            <strong>Altitude diversity.</strong> Retreat locations in Uttarakhand span from 350
            metres at Rishikesh to over 2,200 metres at Munsiyari. This range means guests
            can choose between subtropical river valleys, mid-altitude forest ridges, and genuine
            alpine environments — each producing a very different retreat experience.
            The altitude itself helps: cooler air, reduced pollution, and the
            body shift that comes with height change.
          </p>
          <p className="med-body">
            <strong>Range of settings.</strong> Garhwal offers dense deodar and oak forests,
            river-valley acoustics, and the ashram heritage of Rishikesh. Kumaon delivers
            wide Himalayan views, alpine meadows, and the silence that comes from real
            remoteness. Between these zones lie cantonment villages, wildlife sanctuaries, and
            glacial valleys — each adding texture to the retreat landscape.
          </p>
          <p className="med-body">
            <strong>Access from Delhi.</strong> Every retreat place in Uttarakhand
            is reachable by road from Delhi within a single day. The closest — Rishikesh — takes
            five hours. The most remote — Munsiyari — takes twelve. This closeness means
            retreat guests do not need to fly, take multiple connections, or burn a full
            travel day in each direction. Friday departures from Delhi are standard practice.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            <strong>Spiritual roots.</strong> Uttarakhand has hosted quiet practice
            for centuries. Rishikesh is globally recognised as the yoga capital. Valley
            communities across the state maintain meditation traditions, temple cultures, and a
            relationship with the landscape that commercial tourism has not yet displaced. This
            tradition means teachers here draw on deep practice, not imported trends.
          </p>
        </div>
      </section>

      {/* ── RETREAT DESTINATIONS ── */}
      <section id="destinations" className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-outer">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Choose Your Setting</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>Retreat Destinations Across <span>Uttarakhand</span></h2>
          <p className="med-body" style={{ textAlign: 'center', maxWidth: '46rem', margin: '0 auto 2.2rem' }}>
            Each location has a clear role — altitude, character, travel time, and guest
            types differ in useful ways. Choosing the right destination is choosing the
            right retreat experience.
          </p>

          <div className="med-grid-4" style={{ marginBottom: '2.2rem' }}>
            {DESTINATIONS.map((dest) => (
              <Link key={dest.id} href={`/retreats/${dest.id}`} className="med-loc-card" style={{ position: 'relative', height: '280px', borderRadius: '18px', textDecoration: 'none', color: 'white', display: 'block' }}>
                <img className="med-thumb-img" src={dest.image} alt={`${dest.name} retreat`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,31,28,0.85), rgba(10,31,28,0.25) 55%, transparent 100%)' }} />
                <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(15,118,110,0.9)', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '999px', fontSize: '0.56rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{dest.tag}</span>
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <h3 style={{ margin: '0 0 0.4rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.2rem', fontWeight: 500 }}>{dest.name}</h3>
                  <p style={{ margin: 0, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.76rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.82)' }}>{dest.context}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="med-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/munsiyari" style={{ color: 'inherit', textDecoration: 'none' }}>
                Munsiyari — Kumaon&apos;s Alpine Sanctuary
              </Link>
            </h3>
            <p className="med-body">
              Munsiyari sits at 2,200 metres in Pithoragarh district, facing the Panchachuli
              massif — five peaks above 6,000 metres. It is the most remote and visually
              dramatic retreat location in the network. The twelve-hour journey from Delhi
              filters out casual visitors, leaving a quiet setting built for deep work.
              Alpine meadows, glacier-view practice spaces, and very small groups
              define the character here.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              Programs in{' '}
              <Link href="/retreats/munsiyari" style={{ color: '#0f766e', fontWeight: 600 }}>
                Munsiyari
              </Link>{' '}
              suit people with retreat experience, international visitors seeking deeper
              Himalayan retreat depth, and anyone who values quiet as the main retreat
              ingredient. Best from April through November.
            </p>
          </div>

          <div className="med-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/sankri" style={{ color: 'inherit', textDecoration: 'none' }}>
                Sankri — Gateway to the High Himalayas
              </Link>
            </h3>
            <p className="med-body">
              Sankri occupies the upper Tons Valley in Uttarkashi district, near the Govind
              Wildlife Sanctuary. Pine and oak forests, glacial river sound, and trail access
              into genuine wilderness define the location. Eight to nine hours from Delhi, it
              sits at the intersection of retreat calm and trekking adventure — making it ideal
              for guests who want both stillness and physical activity with the mountains.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <Link href="/retreats/sankri" style={{ color: '#0f766e', fontWeight: 600 }}>
                Sankri retreats
              </Link>{' '}
              suit those drawn to forest time, river-valley living, and the meditative
              quality of an setting shaped by wilderness rather than cultivation. Extended
              formats of four to seven days work best here.
            </p>
          </div>

          <div className="med-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/chakrata" style={{ color: 'inherit', textDecoration: 'none' }}>
                Chakrata — Quiet Garhwal Hill Retreat
              </Link>
            </h3>
            <p className="med-body">
              Chakrata is a cantonment town at 2,200 metres in Dehradun district —
              low-commercial, forest-surrounded, and six to seven hours from Delhi by road.
              Deodar canopy, ridge walks, and Tiger Falls provide the natural retreat setting.
              The military heritage means limited tourist development, which preserves the quiet
              that makes retreat work effective.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <Link href="/retreats/chakrata" style={{ color: '#0f766e', fontWeight: 600 }}>
                Chakrata
              </Link>{' '}
              is the most practical option for professionals seeking easy-to-reach mountain retreat
              without long travel. Weekend and mid-week formats both work here. Year-round
              easy access makes it the reliable default for first-time Uttarakhand retreat
              guests.
            </p>
          </div>

          <div className="med-card" style={{ padding: '2rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/rishikesh" style={{ color: 'inherit', textDecoration: 'none' }}>
                Rishikesh — Riverside Yoga and Meditation Hub
              </Link>
            </h3>
            <p className="med-body">
              Rishikesh needs little introduction. India&apos;s yoga capital sits on the Ganges
              at the foothills, five to six hours from Delhi. The ashram tradition, experienced
              teacher pool, and riverside practice settings are unmatched in India. For
              guests whose main interest is guided yoga, pranayama, and spiritual
              work, Rishikesh remains the natural choice.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              Retreat formats in Rishikesh range from weekend programs to week-long intensives.
              The lower altitude means year-round operation without weather disruption. The trade-off
              is more visitors compared to mountain locations — which is why serious
              practitioners sometimes begin in Rishikesh and graduate to Chakrata, Sankri, or
              Munsiyari for deeper retreat time.
            </p>
          </div>
        </div>
      </section>

      {/* ── TYPES OF RETREATS ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Formats</span>
          </div>
          <h2 className="med-h2">Types of Retreats Available in <span>Uttarakhand</span></h2>
          <p className="med-body">
            Uttarakhand supports every major retreat format. The state&apos;s natural and
            cultural range means programs are not limited to a single format.
          </p>

          <div className="med-card" style={{ padding: '2rem' }}>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Yoga retreats</strong> — guided asana, pranayama, and philosophy
                  across all four locations, with Rishikesh offering the deepest tradition</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Meditation and silence retreats</strong> — guided and self-directed
                  formats, especially suited to the quiet of Munsiyari and Sankri</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Burnout recovery</strong> — guided{' '}
                  <Link href="/retreats/journeys/burnout-recovery" style={{ color: '#0f766e', fontWeight: 600 }}>
                    burnout recovery retreats
                  </Link>{' '}
                  combining rest, nature time, and guided processing</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Sound healing</strong> — resonance-based{' '}
                  <Link href="/retreats/journeys/sound-healing" style={{ color: '#0f766e', fontWeight: 600 }}>
                    sound healing programs
                  </Link>{' '}
                  using singing bowls, gongs, and guided frequency work in mountain settings</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Seasonal programs</strong> — summer heat-escape formats and winter
                  quiet retreats tailored to each location&apos;s climate window</span>
              </li>
            </ul>
          </div>

          <p className="med-body" style={{ marginTop: '1.6rem', marginBottom: 0 }}>
            For a complete overview of every program type, see our{' '}
            <Link href="/retreats/himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
              Himalayan retreats in India
            </Link>{' '}
            guide covering formats, durations, and locations across the network.
          </p>
        </div>
      </section>

      {/* ── WHEN TO PLAN ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Timing It Right</span>
          </div>
          <h2 className="med-h2">When to Plan a Retreat in <span>Uttarakhand</span></h2>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Best Window</span>
              <h3 className="med-h3">October to November</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Clear air after monsoon, mild temperatures, and the sharpest mountain views
                of the year. Munsiyari&apos;s Panchachuli range is at its most dramatic.
                Sankri&apos;s forests turn gold. Chakrata and Rishikesh enjoy crisp, clear
                days. This is when booking fills fastest — four to six weeks advance is
                advisable.
              </p>
            </div>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Summer</span>
              <h3 className="med-h3">April to June</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                The{' '}
                <Link href="/retreats/summer-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                  summer Himalayan retreats
                </Link>{' '}
                window draws people escaping Delhi heat. Temperatures at altitude run fifteen
                to twenty-five degrees cooler than the plains. Munsiyari and Sankri are at
                their most accessible. Long daylight hours support longer outdoor plans.
              </p>
            </div>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Winter</span>
              <h3 className="med-h3">December to February</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                The{' '}
                <Link href="/retreats/winter-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                  winter Himalayan retreats
                </Link>{' '}
                season suits those drawn to cold-weather contemplation. Rishikesh and
                Chakrata can run fully. Sankri receives snow. Munsiyari is largely
                inaccessible. Winter retreats attract smaller groups and offer the deepest
                quiet of the year.
              </p>
            </div>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Shoulder Months</span>
              <h3 className="med-h3">February–March &amp; September</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Provide excellent conditions with lower demand. These windows suit guests
                who prefer smaller groups and flexible scheduling without the peak-season
                booking pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO CHOOSES UTTARAKHAND ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Who It&apos;s For</span>
          </div>
          <h2 className="med-h2">Who Chooses <span>Uttarakhand</span> for Retreats</h2>
          <p className="med-body">
            Uttarakhand draws retreat guests who want real mountain feel without
            leaving the country — and increasingly, international visitors arriving in India
            for Himalayan wellness.
          </p>

          <div className="med-card" style={{ padding: '2rem' }}>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Delhi and NCR professionals</strong> — the largest segment, seeking
                  accessible mountain reset programs that fit within working schedules and do
                  not require flights.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>International wellness travellers</strong> — visiting India for
                  yoga, meditation, or spiritual practice and choosing Uttarakhand for its
                  combination of practice tradition and Himalayan setting.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Couples and partners</strong> — seeking shared retreat experience in
                  settings that balance privacy with facilitated connection, particularly at
                  higher-altitude locations.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Small groups and corporate teams</strong> — leadership offsites,
                  friend circles, and family groups booking guided programs across any of the
                  four locations.</span>
              </li>
            </ul>
          </div>

          <p className="med-body" style={{ marginTop: '1.6rem', marginBottom: 0 }}>
            Each location serves a different goal. Choosing the right one depends on
            travel time, landscape choice, and whether you prefer easy access or
            remoteness. For a ranked overview across every category, see our guide to the{' '}
            <Link href="/retreats/best-retreat-in-uttarakhand" style={{ color: '#0f766e', fontWeight: 600 }}>
              best retreats in Uttarakhand
            </Link>.
          </p>
        </div>
      </section>

      {/* ── COMMERCIAL NAVIGATION ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '0 0 3rem' }}>
        <div className="med-inner">
          <div className="med-card" style={{ padding: '1.6rem 1.8rem' }}>
            <p className="med-body" style={{ margin: 0, fontSize: '0.95rem' }}>
              Exploring all programs? Our parent guide covers every format, duration, and
              location across the network — from weekend resets to week-long retreats.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '0 0 4.5rem' }}>
        <div className="med-inner">
          <div className="med-eyebrow" style={{ paddingTop: '4.5rem' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Common Questions</span>
          </div>
          <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '48vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/location/rishikesh.webp" alt="Uttarakhand retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.86)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '42rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.5rem, 2.9vw, 2.1rem)', fontWeight: 500, color: '#F6F2E7' }}>Ready to choose your Himalayan setting?</h2>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(246,242,231,0.78)' }}>Talk with us about dates, location, and the right level of remoteness for you.</p>
          <a href={`https://wa.me/919760446101?text=${encodeURIComponent('Hi, I want to plan a retreat in Uttarakhand. Can we discuss dates and options?')}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Check Dates &amp; Programs</a>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell" style={{ background: '#ffffff' }}>
        <div className="med-inner" style={{ borderTop: '1px solid rgba(15,118,110,0.1)', padding: '2rem 1.5rem 3.5rem' }}>
          <Link href="/retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
            ← All Retreats
          </Link>
        </div>
      </nav>
    </TrackedPage>
  );
}