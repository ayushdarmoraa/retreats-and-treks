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

const PATH = '/retreats/meditation-retreat-uttarakhand';

export function generateMetadata(): Metadata {
  return {
    title: 'Meditation Retreats in Uttarakhand | Retreats And Treks',
    description:
      'Find meditation retreats in Uttarakhand across Rishikesh, Munsiyari, and Sankri, with guided silence, forest practice, and Himalayan settings.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Meditation Retreats in Uttarakhand — Silent Practice in the Himalayas',
      description:
        'Structured meditation retreat programs in Uttarakhand. Guided silence, breath awareness and walking meditation in genuine Himalayan environments.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Meditation Retreats in Uttarakhand — Silent Practice in the Himalayas'),
    },
  };
}

const DESTINATIONS = [
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    tag: 'Traditional Ashram',
    context:
      'Ganges-side guided silence. The most accessible, most beginner-friendly meditation destination in the Himalayas — five to six hours from Delhi.',
    image: '/Images/location/rishikesh.webp',
  },
  {
    id: 'munsiyari',
    name: 'Munsiyari',
    tag: 'Deep Solitude',
    context:
      'Panchachuli views, twelve hours from Delhi. Silence is not practised here — it is the default state. Best for three nights or longer.',
    image: '/Images/location/munsiyari.webp',
  },
  {
    id: 'sankri',
    name: 'Sankri',
    tag: 'Forest Immersion',
    context:
      'Upper Tons Valley, pine forest and glacial rivers. A middle path — genuine wilderness without the full commitment of a high-altitude journey.',
    image: '/Images/location/sankri.webp',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Are meditation retreats in Uttarakhand silent?',
    answer:
      'Most meditation retreats include extended periods of silence, but few require complete silence for the entire duration. Structured silent periods — typically from evening through the following morning — are standard. Guided sessions include verbal instruction. Group meals may be silent or conversational depending on the programme. Noble silence, where you refrain from unnecessary speech, is common. Full Vipassana-style silence for ten days exists in Rishikesh but is not the only format available.',
  },
  {
    question: 'Is prior meditation experience required?',
    answer:
      'No. Most meditation retreats in Uttarakhand welcome beginners and include foundational instruction. Facilitators teach breath awareness, body scanning, and seated posture from the ground up. Prior experience deepens the retreat but is not a prerequisite. If you can sit comfortably for twenty minutes and are willing to follow a structured schedule, you are ready. Many participants report that their first retreat was more transformative than years of self-guided practice.',
  },
  {
    question: 'How long should a meditation retreat be?',
    answer:
      'A two-to-three-night retreat provides a genuine introduction and measurable mental reset. The mind typically settles into sustained stillness by the second full day. For deeper work — processing accumulated stress, establishing a lasting practice, or exploring advanced techniques — five to seven nights allows the body and mind to move through resistance into genuine equanimity. Ten-day formats exist for committed practitioners seeking intensive transformation.',
  },
  {
    question: 'Is Munsiyari suitable for a silent meditation retreat?',
    answer:
      'Munsiyari is one of the strongest silent retreat locations in Uttarakhand. Its remoteness — high in the Kumaon Himalayas with Panchachuli peak views — provides natural isolation that supports sustained silence without effort. The environment does the work of withdrawal. There are no tourist distractions, minimal phone signal, and a stillness that makes sitting practice feel less like discipline and more like a natural state. It is best suited for retreats of three nights or longer.',
  },
  {
    question: 'Are meditation retreats in Uttarakhand beginner-friendly?',
    answer:
      'Yes. The mountain environment actually makes meditation easier for beginners. Clean air supports breath awareness. Natural silence reduces the mental agitation that makes sitting difficult in urban settings. Guided instruction walks you through each technique. Most programmes offer shorter sitting periods at the start, gradually extending as comfort builds. You do not need to sit in lotus position or clear your mind — you need to show up and follow the structure.',
  },
  {
    question: 'What is the difference between a meditation retreat and a yoga retreat?',
    answer:
      'A yoga retreat centres on physical practice — asana, movement, and breathwork with embodied awareness. A meditation retreat centres on stillness — seated practice, silence, and inward attention. Both include elements of the other, but the emphasis differs. Yoga retreats have more physical activity and group energy. Meditation retreats have more silence, fewer physical demands, and deeper introspective work. Choose based on whether you want to move or to be still.',
  },
];

export default function MeditationRetreatUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Meditation Retreats in Uttarakhand', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Meditation Retreats in Uttarakhand"
        description="Find meditation retreats in Uttarakhand across Rishikesh, Munsiyari and Sankri. Silent sittings, guided meditation and forest-based practice in Himalayan mountain settings."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Meditation Retreats in Uttarakhand' },
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

        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
        @media (max-width: 900px) { .med-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } }

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

      {/* ── HERO (short + punchy, image-led) ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/location/munsiyari.webp" alt="Meditation retreat in the Himalayas, Uttarakhand" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Silent Practice &middot; Himalayas</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Meditation Retreats in Uttarakhand
          </h1>
          <p style={{ maxWidth: '40rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Guided silence and forest practice across Rishikesh, Munsiyari, and Sankri — in genuine Himalayan environments.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['Beginner Friendly', '3 Locations', 'Digital Detox', '2–7+ Days'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.45rem 0.9rem', background: 'rgba(15,118,110,0.35)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in a meditation retreat in Uttarakhand. Can you tell me more?")}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Check Dates &amp; Programs</a>
            <a href="#locations" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Compare Locations</a>
          </div>
        </div>
      </section>

      {/* ── INTRO (exact original hero paragraphs) ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">A Silence Cities Cannot Produce</span>
          </div>
          <h2 className="med-h2">The mountains do the work of <span>withdrawal</span></h2>
          <p className="med-body">
            There is a kind of silence that cities cannot produce. Not the absence of sound —
            but a stillness that enters the body and settles the nervous system before any
            technique is applied. Uttarakhand holds this silence. In the Himalayas, at
            altitude, surrounded by forest or facing glacial peaks, the conditions for
            sustained meditation exist naturally. You do not have to manufacture them.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            A meditation retreat here is not an escape from life. It is an intervention — a
            structured pause that allows the mind to process what months of constant input
            have accumulated. Guided sittings, walking meditation through deodar groves,
            breath awareness beside mountain rivers, and long periods of noble silence. The
            Himalayan environment does not just support meditation. It demands it. The quiet
            is so complete that the mind has nowhere to go but inward.
          </p>
        </div>
      </section>

      {/* ── WHY HIMALAYAS (exact original paragraphs) ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Why Here</span>
          </div>
          <h2 className="med-h2">Why the Himalayas Are Ideal for <span>Meditation</span></h2>
          <p className="med-body">
            Meditation traditions have gravitated toward mountains for millennia — not for
            romance but for neurology. Altitude reduces oxygen pressure slightly, which
            naturally slows metabolic rate and promotes parasympathetic activation. The body
            relaxes. The breath deepens. The cognitive chatter that dominates urban waking
            hours loses its fuel. Rishikesh and the upper Himalayan valleys have hosted
            contemplative practice for centuries precisely because the environment makes
            stillness easier than agitation.
          </p>
          <p className="med-body">
            Forest settings compound this effect. Deodar canopy filters light into soft,
            diffuse patterns. Birdsong replaces traffic. The air carries no particulate load,
            no chemical signature. Breathing becomes conscious without instruction — the body
            notices the difference and responds. Studies on forest bathing confirm what
            practitioners have always known: time in dense natural canopy reduces cortisol,
            lowers heart rate, and increases parasympathetic tone. A meditation retreat in
            this context starts working before the first guided session.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            Then there is the scale. Sitting in view of peaks that rise to 6,000 metres
            changes the psychological frame. The mind, confronted with geological time and
            massive space, releases its grip on the small urgencies that normally consume it.
            Alpine environments create a natural sense of perspective that is the starting
            point — not the goal — of serious meditation practice.
          </p>
        </div>
      </section>

      {/* ── BEST PLACES (exact original paragraphs, per destination card) ── */}
      <section id="locations" className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-outer">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Choose Your Setting</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>Best Places for a <span>Meditation Retreat</span> in Uttarakhand</h2>
          <p className="med-body" style={{ textAlign: 'center', maxWidth: '46rem', margin: '0 auto 2.2rem' }}>
            Each location in Uttarakhand serves a different depth of practice. Accessibility,
            remoteness, and environmental character determine which setting matches your
            intention and experience level.
          </p>
          <div className="med-grid-3" style={{ marginBottom: '2.2rem' }}>
            {DESTINATIONS.map((dest) => (
              <Link key={dest.id} href={`/retreats/${dest.id}`} className="med-loc-card" style={{ position: 'relative', height: '300px', borderRadius: '18px', textDecoration: 'none', color: 'white', display: 'block' }}>
                <img className="med-thumb-img" src={dest.image} alt={`${dest.name} meditation retreat`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,31,28,0.82), rgba(10,31,28,0.22) 55%, transparent 100%)' }} />
                <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(15,118,110,0.9)', color: 'white', padding: '0.35rem 0.7rem', borderRadius: '999px', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{dest.tag}</span>
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, padding: '1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <h3 style={{ margin: '0 0 0.5rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 500 }}>{dest.name}</h3>
                  <p style={{ margin: 0, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.82)' }}>{dest.context}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="med-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/rishikesh" style={{ color: 'inherit', textDecoration: 'none' }}>
                Rishikesh — Traditional Ashram and Guided Silence
              </Link>
            </h3>
            <p className="med-body">
              Rishikesh is where most meditation journeys in India begin. The town&apos;s ashram
              infrastructure has supported contemplative practice for generations — guided
              Vipassana sits, mantra meditation, and pranayama-based concentration techniques
              are all available within established lineages. The Ganges provides a constant
              sonic backdrop: not silence in the absolute sense, but a natural sound floor that
              holds attention without stimulating it.
            </p>
            <p className="med-body">
              What makes{' '}
              <Link href="/retreats/rishikesh" style={{ color: '#0f766e', fontWeight: 600 }}>
                Rishikesh meditation programs
              </Link>{' '}
              strong for beginners is the structure. Sessions are facilitated. Instructions are
              clear. Sitting periods build gradually — twenty minutes, then thirty, then forty-five.
              Walking meditation on the riverbank between sittings allows the body to integrate
              without losing the thread of awareness. For first-time silent retreat participants,
              this scaffolding is essential.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              Rishikesh is five to six hours from Delhi — the most accessible serious meditation
              destination in the Himalayas. Weekend and three-day formats are practical here
              without sacrificing depth.
            </p>
          </div>

          <div className="med-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/munsiyari" style={{ color: 'inherit', textDecoration: 'none' }}>
                Munsiyari — Deep Mountain Solitude
              </Link>
            </h3>
            <p className="med-body">
              Munsiyari occupies a different register entirely. Perched high in the Kumaon
              Himalayas with direct views of the Panchachuli massif, this is a place where
              silence is not practised — it is the default state. The remoteness removes choice:
              there is no café to visit, no market to browse, no notification to check. The
              environment enforces withdrawal, and the meditation deepens accordingly.
            </p>
            <p className="med-body">
              <Link href="/retreats/munsiyari" style={{ color: '#0f766e', fontWeight: 600 }}>
                Munsiyari retreat programs
              </Link>{' '}
              are best suited for participants who want extended silence — three nights minimum,
              ideally five to seven. The journey itself is long, which filters for seriousness
              of intention. Once there, the practice container is among the most powerful in
              Uttarakhand. Early morning sittings facing Panchachuli at sunrise. Walking
              meditation through rhododendron forest. Afternoon journaling in complete quiet.
              Evening sessions as the peaks turn gold, then grey, then dark.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              This is not a beginner location. It is the destination you graduate into when
              shorter, more accessible retreats have established your foundation.
            </p>
          </div>

          <div className="med-card" style={{ padding: '2rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/sankri" style={{ color: 'inherit', textDecoration: 'none' }}>
                Sankri — Forest-Based Meditation Immersion
              </Link>
            </h3>
            <p className="med-body" style={{ marginBottom: 0 }}>
              Sankri sits in the upper Tons Valley near the Govind Wildlife Sanctuary — pine
              forests, glacial rivers, and the kind of wilderness density that makes indoor
              structured meditation feel natural rather than imposed. The{' '}
              <Link href="/retreats/sankri" style={{ color: '#0f766e', fontWeight: 600 }}>
                Sankri meditation retreats
              </Link>{' '}
              combines meditation with nature immersion: forest sits, riverside breath
              awareness, and walking practice on trails where the canopy closes overhead. Eight
              to nine hours from Delhi, it works best for extended weekends or dedicated
              retreat blocks. The remoteness is less extreme than Munsiyari but deeper than
              Rishikesh — a middle path for practitioners who want genuine wilderness without
              the full commitment of a high-altitude journey.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT (exact original list) ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Structure</span>
          </div>
          <h2 className="med-h2">What to Expect in a <span>Meditation Retreat</span></h2>
          <p className="med-body">
            A meditation retreat is not a yoga retreat with less movement. It is a fundamentally
            different container — one built around stillness, silence, and inward attention.
            Here is the typical structure across our Uttarakhand locations.
          </p>

          <div className="med-card" style={{ padding: '2rem' }}>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Silent periods.</strong> Most retreats begin noble silence after the
                  evening orientation and maintain it through the following morning. Extended
                  formats may hold silence for twenty-four to forty-eight hours. This is not
                  punishment — it is the removal of the primary source of mental agitation.
                  Participants consistently report that silence becomes comfortable, even
                  welcome, within hours.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Guided sittings.</strong> Three to four facilitated meditation sessions
                  per day. Techniques vary — breath counting, body scanning, open awareness,
                  mantra, or loving-kindness practice. Sessions start at twenty minutes and
                  build. Instruction is verbal and precise. You are not left alone to struggle.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Walking meditation.</strong> Slow, deliberate movement on forest paths
                  or riverside tracks. This is not exercise — it is meditation in motion. Attention
                  stays with the feet, the breath, the sensory field. Walking sessions between
                  sittings prevent physical stiffness and integrate awareness into the body.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Breath awareness.</strong> Dedicated pranayama sessions that bridge
                  meditation and the body. Alternate nostril breathing, box breathing, and
                  extended exhale techniques. At altitude, breath practice carries a distinctive
                  quality — the thinner air makes each breath more conscious.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Journaling.</strong> Structured reflection periods with prompts.
                  Writing anchors insight that might otherwise dissolve. Most retreats provide
                  journals and dedicated quiet time for personal processing.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Digital detox.</strong> Devices are stored on arrival. No exceptions.
                  The retreat begins the moment the screen goes dark. This single structural
                  element — not a suggestion, not optional — is what separates a retreat from a
                  holiday with meditation attached.</span>
              </li>
            </ul>
          </div>

          <p className="med-body" style={{ marginTop: '1.6rem', marginBottom: 0 }}>
            Meals are vegetarian, eaten in silence during extended silent periods, and timed
            to support the practice rhythm. Evening sessions often include{' '}
            <Link href="/retreats/journeys/sound-healing" style={{ color: '#0f766e', fontWeight: 600 }}>
              sound healing retreats
            </Link>{' '}
            — singing bowls and overtone instruments that quiet the nervous system before
            sleep.
          </p>
        </div>
      </section>

      {/* ── WHO SHOULD CHOOSE (exact original list) ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Who It&apos;s For</span>
          </div>
          <h2 className="med-h2">Who Should Choose a <span>Meditation Retreat</span></h2>
          <p className="med-body">
            Meditation retreats serve anyone willing to sit with stillness. But certain life
            situations make them particularly effective.
          </p>

          <div className="med-card" style={{ padding: '2rem' }}>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Burnout professionals.</strong> If your mind races at night, if
                  decisions feel heavier than they should, if you cannot remember the last time
                  you felt genuinely rested — a meditation retreat addresses the root cause.
                  Sustained silence and guided practice interrupt the chronic overthinking loop
                  that burnout creates.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Experienced meditators seeking depth.</strong> A home practice of
                  twenty minutes per day has a ceiling. Retreat immersion — six to eight hours
                  of practice daily in a mountain environment — breaks through that ceiling.
                  Insights and states that take months to approach in daily life can emerge
                  within days of sustained retreat practice.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Spiritual seekers.</strong> If you are drawn to contemplative traditions
                  — Buddhist, Hindu, or secular mindfulness — Uttarakhand holds the lineages and
                  the land. Rishikesh for guided spiritual practice. Munsiyari for solitary depth.
                  The mountains have hosted seekers for millennia. The infrastructure of seeking
                  is built into the landscape.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>First-time silent retreat participants.</strong> The idea of extended
                  silence can feel intimidating. It should not be. Structured retreats hold you
                  through the process. Facilitators are present. The schedule provides rhythm.
                  Most first-timers report that the hardest part is the first three hours — after
                  that, the mind begins to settle and silence becomes natural. Start with a
                  two-night format in Rishikesh. Build from there.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── BEST TIME (exact original paragraphs, as season cards) ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Timing It Right</span>
          </div>
          <h2 className="med-h2">Best Time for a <span>Meditation Retreat</span> in Uttarakhand</h2>
          <p className="med-body">
            The contemplative quality of a meditation retreat shifts with the seasons. Each
            window offers a different character — choose the one that matches your intention.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1.4rem', marginTop: '1.8rem' }}>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Clearest Window</span>
              <h3 className="med-h3">October to November</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>Post-monsoon air
                is washed clean, Himalayan visibility is at its peak, and temperatures are cool
                without being cold. Morning sittings in this season carry an extraordinary
                clarity — sharp light, sharp air, sharp attention. This is the strongest
                recommendation for first-time meditation retreat participants.</p>
            </div>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Second Peak</span>
              <h3 className="med-h3">February to April</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>Winter lifts, wildflowers
                begin, and the mountains emerge from haze. This shoulder season is quieter than
                autumn — fewer visitors, more solitude, and the quality of silence deepens
                accordingly.</p>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.8rem', marginTop: '1.4rem' }}>
            <span className="med-season-tag">Summer &amp; Monsoon</span>
            <h3 className="med-h3">May to September</h3>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <Link href="/retreats/summer-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                Summer Himalayan retreats
              </Link>{' '}
              (May to June) offer heat refuge — practise in cool mountain air while the plains
              burn. The monsoon months (July to September) create a uniquely introspective
              atmosphere: rain on the roof, mist in the valley, and an enforced inwardness
              that suits deep meditation practice.
            </p>
          </div>

          <div className="med-card" style={{ padding: '1.8rem', marginTop: '1.4rem' }}>
            <span className="med-season-tag">Winter</span>
            <h3 className="med-h3">December to February</h3>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <Link href="/retreats/winter-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                Winter Himalayan retreats
              </Link>{' '}
              bring cold-air clarity and short days that naturally
              extend sitting time. Rishikesh stays mild. Munsiyari offers snow-silence — a
              meditative quality that no other season replicates. Sankri closes for winter.
            </p>
          </div>
        </div>
      </section>

      {/* ── COMMERCIAL NAVIGATION (exact original text) ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '0 0 3rem' }}>
        <div className="med-inner">
          <div className="med-card" style={{ padding: '1.6rem 1.8rem' }}>
            <p className="med-body" style={{ margin: 0, fontSize: '0.95rem' }}>
              Exploring all retreat types?{' '}
              <Link href="/retreats/himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                mountain retreats in India
              </Link>{' '}
              covers every destination, program, and format. For all locations across the
              state, see{' '}
              <Link href="/retreats/uttarakhand-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                Uttarakhand retreats
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ (unchanged) ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '0 0 4.5rem' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Common Questions</span>
          </div>
          <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '48vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/location/munsiyari.webp" alt="Himalayan meditation retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.86)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '42rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.5rem, 2.9vw, 2.1rem)', fontWeight: 500, color: '#F6F2E7' }}>Ready to sit with the mountains?</h2>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(246,242,231,0.78)' }}>Talk with us about dates, duration, and the right location for your practice.</p>
          <a href={`https://wa.me/919760446101?text=${encodeURIComponent('Hi, I want to plan a meditation retreat in Uttarakhand. Can we discuss dates and options?')}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Check Dates &amp; Programs</a>
        </div>
      </section>

      {/* ── FOOTER NAV ───────────────────────────────────────────── */}
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