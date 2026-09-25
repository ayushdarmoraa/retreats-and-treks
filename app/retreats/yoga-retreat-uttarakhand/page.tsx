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

const PATH = '/retreats/yoga-retreat-uttarakhand';

export function generateMetadata(): Metadata {
  return {
    title: 'Yoga Retreats in Uttarakhand | Retreats And Treks',
    description:
      'Find yoga retreats in Uttarakhand across Rishikesh, Chakrata, and Sankri with asana, pranayama, meditation, and Himalayan settings.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Yoga Retreats in Uttarakhand — Mountain Practice in the Himalayas',
      description:
        'Immersive yoga retreat programs in Uttarakhand. Rishikesh, Chakrata and Sankri — asana, breathwork and meditation in genuine Himalayan environments.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Yoga Retreats in Uttarakhand — Mountain Practice in the Himalayas'),
    },
  };
}

const PLACES = [
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    tag: 'Riverside Yoga Capital',
    image: '/Images/location/rishikesh.webp',
    context:
      "India's yoga capital on the Ganges — the widest teacher pool, ashram tradition, and the most accessible entry point at five to six hours from Delhi.",
  },
  {
    id: 'chakrata',
    name: 'Chakrata',
    tag: 'Quiet Forest Immersion',
    image: '/Images/location/chakrata.webp',
    context:
      'Deodar-covered ridges at 2,200 metres with no tourist strip. Yoga woven into nature immersion rather than delivered in a studio setting.',
  },
  {
    id: 'sankri',
    name: 'Sankri',
    tag: 'High-Altitude Practice',
    image: '/Images/location/sankri.webp',
    context:
      'Upper Tons Valley, at the edge of the treeline. Yoga paired with wilderness — best suited to extended retreats and experienced practitioners.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Is Rishikesh the best place for a yoga retreat in Uttarakhand?',
    answer:
      'Rishikesh is the most established yoga destination in Uttarakhand and one of the most recognised globally. It offers the widest range of teachers, ashram traditions, and riverside practice settings. However, "best" depends on what you seek. If you want structured lineage-based yoga with spiritual infrastructure, Rishikesh is unmatched. If you want forest silence with yoga woven into nature immersion, Chakrata may serve you better. Both are strong choices — they serve different intentions.',
  },
  {
    question: 'Are yoga retreats in Uttarakhand suitable for beginners?',
    answer:
      'Yes. Most yoga retreats in Uttarakhand welcome beginners and structure sessions to accommodate mixed experience levels. Facilitators adjust postures and offer modifications. Pranayama and meditation sessions require no prior experience. The mountain environment itself supports practice — clean air, natural quiet, and reduced stimulation make it easier to settle into focused attention. Beginners often report faster progress in a retreat setting than in months of studio classes.',
  },
  {
    question: 'How long should a yoga retreat in Uttarakhand be?',
    answer:
      'A two-to-three-night retreat delivers a genuine reset and is the most practical format for working professionals. You will experience multiple practice sessions, breathwork instruction, and enough environmental immersion for measurable benefit. For deeper transformation — especially if combining yoga with meditation, journaling, or nature therapy — a five-to-seven-night format allows the body to fully adjust and the practice to deepen beyond surface-level relaxation.',
  },
  {
    question: 'Are yoga retreats in Uttarakhand open year-round?',
    answer:
      'Rishikesh and Chakrata operate yoga retreat programs throughout the year. Rishikesh remains mild in winter and warm in summer. Chakrata is cool year-round with occasional light snow in January. Sankri operates from April through November, with winter snowfall limiting access. October to November and February to April are the most popular booking windows across all locations.',
  },
  {
    question: 'What is typically included in a yoga retreat in Uttarakhand?',
    answer:
      'A standard yoga retreat includes daily asana sessions (usually morning and late afternoon), pranayama instruction, guided meditation, meals (often vegetarian or sattvic), accommodation, and facilitated group activities such as nature walks or evening reflection circles. Some retreats also include sound healing, journaling workshops, or Ayurvedic consultations. Equipment like yoga mats and props are provided. You bring comfortable clothing and an open mind.',
  },
  {
    question: 'Do I need to be physically fit for a yoga retreat?',
    answer:
      'No. Yoga retreats in Uttarakhand are designed to meet participants where they are. Sessions are adapted for different fitness levels — chair modifications, supported postures, and restorative sequences are standard offerings. The emphasis is on mindful movement and breath awareness, not athletic performance. If you can walk comfortably, you can participate fully in a yoga retreat.',
  },
];

export default function YogaRetreatUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Yoga Retreats in Uttarakhand', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Yoga Retreats in Uttarakhand"
        description="Find yoga retreats in Uttarakhand across Rishikesh, Chakrata and Sankri. Structured asana, pranayama and meditation programs in Himalayan mountain settings."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Yoga Retreats in Uttarakhand' },
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
        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 960px) { .med-grid-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } .med-grid-3 { grid-template-columns: 1fr; } }

        @keyframes med-hero-zoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        .med-hero-bg { animation: med-hero-zoom 24s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .med-hero-bg { animation: none; } }

        .med-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .med-list-item { display: grid; grid-template-columns: 1.9rem 1fr; gap: 0.9rem; }
        .med-list-dot { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid rgba(15,118,110,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .med-list-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; }
        .med-list-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #4b5259; font-weight: 400; }
        .med-list-text strong { color: #2B2A26; font-weight: 600; }

        .med-check-list { padding-left: 0; margin: 0 0 1rem; list-style: none; display: flex; flex-direction: column; gap: 0.7rem; }
        .med-check-item { display: flex; align-items: flex-start; gap: 0.75rem; }
        .med-check-badge { width: 20px; height: 20px; border-radius: 50%; background: #0f766e; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 0.15rem; font-size: 0.62rem; color: #fff; font-weight: 700; }
        .med-check-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.8; color: #4b5259; font-weight: 400; }

        .med-season-card { padding: 1.6rem; }
        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }
      `}</style>

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/himalayanretreats/yoga.webp" alt="Yoga retreats in Uttarakhand" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Asana &middot; Pranayama &middot; Meditation</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Yoga Retreats in Uttarakhand
          </h1>
          <p style={{ maxWidth: '42rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Structured practice across Rishikesh, Chakrata, and Sankri — where studio yoga
            gives way to mountain ridges, river valleys, and genuine Himalayan silence.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['3 Locations', 'Beginner Friendly', '5–9 Hrs from Delhi', 'Year-Round'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.45rem 0.9rem', background: 'rgba(15,118,110,0.35)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in a yoga retreat in Uttarakhand. Can you tell me more?")}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Check Dates &amp; Programs</a>
            <a href="#places" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Compare Locations</a>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">From Studio Floors to Mountain Ridges</span>
          </div>
          <h2 className="med-h2">Where practice meets <span>altitude</span></h2>
          <p className="med-body">
            Uttarakhand is where yoga moved from studio floors to mountain ridges. The state
            holds India&apos;s deepest concentration of practice lineages, river-valley ashrams,
            and high-altitude retreat settings — all within the Himalayan foothills. This is
            not a drop-in class or a resort add-on. A yoga retreat here means structured daily
            practice in an environment that amplifies every session: clean mountain air,
            natural silence, and the kind of sensory reduction that makes focused attention
            effortless.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            Whether you are beginning a practice or deepening one that has plateaued in urban
            settings, the Himalayan environment changes the equation. Altitude quiets the
            nervous system. Forest canopy filters stimulation. River sound holds attention
            without effort. The yoga is the same — the container is radically different.
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
          <h2 className="med-h2">Why Uttarakhand Is the Heart of <span>Yoga in the Himalayas</span></h2>
          <p className="med-body">
            The connection between Uttarakhand and yoga is not marketing — it is history.
            Sages practiced in these valleys long before the word &ldquo;retreat&rdquo; existed.
            Rishikesh became the world&apos;s yoga capital not by accident but because the
            Ganges valley offered precisely the conditions that sustained practice demands:
            isolation from commerce, clean water, moderate climate, and a lineage of teachers
            who never left.
          </p>
          <p className="med-body">
            Beyond the spiritual lineage, the physical environment is what makes Uttarakhand
            irreplaceable for yoga. Mountain silence is not merely the absence of noise — it
            is a positive quality that settles the mind before the first session begins.
            Practice at altitude, with deodar forests on three sides and Himalayan peaks on
            the horizon, engages the body differently. Breathing exercises at 1,500 to 2,200
            metres feel qualitatively different from the same exercises at sea level. The air
            is thinner, cooler, and carries none of the particulate load that urban lungs
            have normalised.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            River settings add another dimension. The sound of flowing water — not
            recorded, not simulated, but present in the room where you practise — acts as a
            natural anchor for meditation. Forest settings provide canopy shade for outdoor
            sessions and walking meditation paths that no built environment can replicate.
            This is why serious practitioners return to Uttarakhand. The environment is not
            decoration — it is infrastructure.
          </p>
        </div>
      </section>

      {/* ── BEST PLACES ── */}
      <section id="places" className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-outer">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Choose Your Setting</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>Best Places for a <span>Yoga Retreat</span> in Uttarakhand</h2>
          <p className="med-body" style={{ textAlign: 'center', maxWidth: '46rem', margin: '0 auto 2.2rem' }}>
            Uttarakhand offers multiple retreat environments — each with a distinct character
            that serves different practice intentions. The strongest locations combine
            accessibility with environmental quality, and all support structured yoga
            programming.
          </p>

          <div className="med-grid-3" style={{ marginBottom: '2.2rem' }}>
            {PLACES.map((place) => (
              <Link key={place.id} href={`/retreats/${place.id}`} className="med-loc-card" style={{ position: 'relative', height: '260px', borderRadius: '18px', textDecoration: 'none', color: 'white', display: 'block' }}>
                <img className="med-thumb-img" src={place.image} alt={`${place.name} yoga retreat`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,31,28,0.85), rgba(10,31,28,0.25) 55%, transparent 100%)' }} />
                <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(15,118,110,0.9)', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '999px', fontSize: '0.56rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{place.tag}</span>
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <h3 style={{ margin: '0 0 0.4rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.2rem', fontWeight: 500 }}>{place.name}</h3>
                  <p style={{ margin: 0, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>{place.context}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="med-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/yoga-retreat-rishikesh" style={{ color: 'inherit', textDecoration: 'none' }}>
                Rishikesh — Riverside Yoga Capital
              </Link>
            </h3>
            <p className="med-body">
              Rishikesh is the starting point for most yoga seekers in India, and for good
              reason. The town holds the highest density of experienced yoga teachers, ashram
              traditions, and structured training programmes in the country. Practice here
              happens on the banks of the Ganges — morning sessions with mist on the water,
              evening meditation as temple bells mark the transition to night.
            </p>
            <p className="med-body">
              What distinguishes{' '}
              <Link href="/retreats/yoga-retreat-rishikesh" style={{ color: '#0f766e', fontWeight: 600 }}>
                Rishikesh Yoga retreats
              </Link>{' '}
              from its reputation as a backpacker stop is the depth of the teaching lineage.
              Retreat programmes here draw from Hatha, Ashtanga, Iyengar, and Kundalini
              traditions — often with facilitators who have decades of unbroken practice.
              Riverside pranayama at dawn, followed by two-hour asana sessions, followed by
              guided meditation in the afternoon. The structure is rigorous but accessible.
              Beginners are welcome; the teaching adjusts.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              Rishikesh is five to six hours from Delhi by road, making it the most accessible
              yoga retreat destination in the Himalayas. For weekend formats or first-time
              participants, it is the lowest-friction entry point.
            </p>
          </div>

          <div className="med-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/chakrata/yoga-retreat" style={{ color: 'inherit', textDecoration: 'none' }}>
                Chakrata — Quiet Forest Yoga Immersion
              </Link>
            </h3>
            <p className="med-body">
              Chakrata offers what Rishikesh cannot: complete quiet. Sitting at 2,200 metres on
              a deodar-covered ridge in Dehradun district, this former cantonment town has no
              tourist infrastructure, no ashram strip, and no ambient noise. Yoga practice here
              happens on forest platforms with views of the greater Himalayan range.
            </p>
            <p className="med-body">
              The{' '}
              <Link href="/retreats/chakrata/yoga-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>
                Chakrata retreat environment
              </Link>{' '}
              is built for participants who want yoga woven into nature immersion rather than
              delivered in a studio setting. Morning asana under deodar canopy. Walking
              meditation on forest trails. Breathwork sessions where the only competing sound
              is birdsong. Evening restorative yoga by firelight. The programme rhythm follows
              the mountain day — sunrise to sunset — rather than a clock.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              For practitioners who have hit a plateau in urban settings, Chakrata&apos;s
              sensory reduction often unlocks progress that more stimulation never could. Six
              to seven hours from Delhi by road.
            </p>
          </div>

          <div className="med-card" style={{ padding: '2rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/sankri/yoga-retreat" style={{ color: 'inherit', textDecoration: 'none' }}>
                Sankri — High-Altitude Yoga and Nature
              </Link>
            </h3>
            <p className="med-body">
              Sankri sits in the upper Tons Valley near the Govind Wildlife Sanctuary — deeper
              into the mountains, at the edge of the treeline. Yoga here is paired with
              wilderness: pine forest walks, glacial river meditation, and practice sessions
              in settings where the nearest town is hours away.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              The eight-to-nine-hour drive from Delhi makes{' '}
              <Link href="/retreats/sankri/yoga-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>
                Sankri
              </Link>{' '}
              better suited for extended retreats or long weekends. What you sacrifice in
              accessibility, you gain in depth of immersion. For experienced practitioners
              seeking a yoga retreat that strips away every layer of distraction, Sankri
              delivers.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Daily Rhythm</span>
          </div>
          <h2 className="med-h2">What to Expect in a <span>Yoga Retreat</span> in Uttarakhand</h2>
          <p className="med-body">
            A yoga retreat in the Himalayas is not a hotel stay with a morning class attached.
            It is a structured container designed to shift your physical and mental state over
            two to seven days. Here is what a typical day looks like across our Uttarakhand
            locations.
          </p>

          <div className="med-card" style={{ padding: '2rem' }}>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Pre-dawn meditation (6:00–6:30 AM).</strong> Optional seated practice
                  as the mountain light shifts. No instruction — just held space and silence.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Morning asana (7:00–8:30 AM).</strong> The primary practice session.
                  Ninety minutes of guided posture work — Hatha or Vinyasa flow depending on the
                  programme. Modifications offered for all levels. In Rishikesh, this often
                  happens on a riverside platform. In Chakrata, on a forest deck.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Pranayama and breathwork (10:00–10:45 AM).</strong> Structured
                  breathing techniques — alternate nostril breathing, box breathing, kapalabhati.
                  Mountain air makes these sessions uniquely effective. Participants consistently
                  note the difference between practising breathwork at altitude versus sea level.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Nature immersion (afternoon).</strong> Guided forest walk, waterfall
                  visit, or riverside sitting. Not fitness hiking — slow, attentive movement
                  through the landscape. This integrates the morning practice into the body.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Evening session (5:00–6:30 PM).</strong> Restorative yoga, yin
                  practice, or{' '}
                  <Link href="/retreats/journeys/sound-healing" style={{ color: '#0f766e', fontWeight: 600 }}>
                    sound healing
                  </Link>
                  . Slower, deeper, and designed to prepare the body for sleep.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Digital detox.</strong> Screens stay off throughout. This is not a
                  suggestion — it is structure. Removing the device removes the last source of
                  urban rhythm. Most participants report that the absence of screens is the single
                  most impactful element of the retreat.</span>
              </li>
            </ul>
          </div>

          <p className="med-body" style={{ marginTop: '1.6rem', marginBottom: 0 }}>
            Meals are vegetarian, timed to support the practice rhythm, and prepared with
            local ingredients. The food is part of the programme — not an afterthought.
          </p>
        </div>
      </section>

      {/* ── WHO SHOULD CHOOSE ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Who It&apos;s For</span>
          </div>
          <h2 className="med-h2">Who Should Choose a <span>Yoga Retreat</span> in Uttarakhand</h2>
          <p className="med-body">
            You do not need to be flexible, experienced, or spiritual. You need to be ready
            for a structured pause.
          </p>

          <div className="med-card" style={{ padding: '2rem' }}>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Beginners with no formal practice.</strong> A retreat is arguably the
                  best place to start. Immersive environments bypass the inconsistency of weekly
                  classes. Three days of guided practice builds more foundation than three months
                  of sporadic studio visits.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Corporate professionals carrying chronic stress.</strong> Yoga is one
                  of the most evidence-based interventions for nervous system regulation. A
                  Himalayan retreat compounds the benefit — the environment does half the work
                  before the first session begins.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Couples seeking a shared reset.</strong> Practising together in a
                  mountain setting creates connection and presence that a resort holiday does not
                  deliver. Shared physical practice, shared meals, shared silence.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>International visitors.</strong> Uttarakhand is the global destination
                  for authentic yoga practice. Rishikesh alone draws practitioners from over fifty
                  countries annually. If you are travelling to India for yoga, this is where you
                  come.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Long-stay participants.</strong> For those with the time and
                  intention for seven-to-fourteen-day immersion, Uttarakhand offers the
                  infrastructure and teaching depth to sustain extended practice without
                  diminishing returns.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── BEST TIME ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Timing It Right</span>
          </div>
          <h2 className="med-h2">Best Time for a <span>Yoga Retreat</span> in Uttarakhand</h2>
          <p className="med-body">
            Uttarakhand supports year-round yoga retreats, but each season changes the
            character of the experience. Choosing the right window depends on what you want
            from the environment.
          </p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Peak Window</span>
              <h3 className="med-h3">October to November &amp; February to April</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Clear skies, moderate temperatures, and the best Himalayan visibility. These
                shoulder seasons offer the strongest combination of outdoor practice conditions
                and comfortable living. Most retreat programmes run their flagship schedules
                during these months.
              </p>
            </div>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Summer</span>
              <h3 className="med-h3">May to June</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                <Link href="/retreats/summer-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                  Summer Himalayan retreats
                </Link>{' '}
                offer heat escape — Chakrata and Sankri remain cool while plains temperatures
                climb past 40°C.
              </p>
            </div>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Monsoon</span>
              <h3 className="med-h3">July to September</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Limits outdoor sessions but creates a uniquely introspective atmosphere for
                indoor practice with rain on the roof.
              </p>
            </div>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Winter</span>
              <h3 className="med-h3">December to February</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                <Link href="/retreats/winter-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                  Winter Himalayan retreats
                </Link>{' '}
                suit practitioners who want cold-air breathwork and the meditative quality of
                short mountain days. Rishikesh stays mild. Chakrata offers crisp mornings with
                occasional frost. Sankri closes for the season.
              </p>
            </div>
          </div>

          <p className="med-body" style={{ marginTop: '1.6rem', marginBottom: 0 }}>
            Each window serves a different practice intention — there is no wrong time, only
            different experiences.
          </p>
        </div>
      </section>

      {/* ── COMMERCIAL NAVIGATION ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '0 0 3rem' }}>
        <div className="med-inner">
          <div className="med-card" style={{ padding: '1.6rem 1.8rem' }}>
            <p className="med-body" style={{ fontSize: '0.95rem' }}>
              Exploring all retreat options? See{' '}
              <Link href="/retreats/himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                Himalayan wellness retreats
              </Link>{' '}
              for every destination, duration, and program type.
            </p>
            <p className="med-body" style={{ margin: 0, fontSize: '0.95rem' }}>
              For location-specific planning across the state, see{' '}
              <Link href="/retreats/uttarakhand-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                Uttarakhand retreats
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
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
          <img src="/Images/location/chakrata.webp" alt="Yoga retreat setting in Uttarakhand" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.86)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '42rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.5rem, 2.9vw, 2.1rem)', fontWeight: 500, color: '#F6F2E7' }}>Ready to find your practice in the mountains?</h2>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(246,242,231,0.78)' }}>Talk with us about dates, location, and the right format for your practice.</p>
          <a href={`https://wa.me/919760446101?text=${encodeURIComponent('Hi, I want to plan a yoga retreat in Uttarakhand. Can we discuss dates and options?')}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Check Dates &amp; Programs</a>
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
