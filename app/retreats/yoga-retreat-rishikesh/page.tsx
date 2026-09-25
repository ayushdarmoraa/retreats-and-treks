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
import PrimaryCTA from '@/components/PrimaryCTA';
import ReviewCard from '@/components/reviews/ReviewCard';
import { getReviewsForSlug } from '@/content/reviews';
import { getFacilitatorsByRetreat } from '@/config/facilitators';

const PATH = '/retreats/yoga-retreat-rishikesh';

export function generateMetadata(): Metadata {
  return {
    title: 'Yoga Retreats in Rishikesh | Retreats And Treks',
    description:
      'Find yoga retreats in Rishikesh with structured asana, pranayama, meditation, Ganga-side practice, and multi-day residential programs.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Yoga Retreats in Rishikesh — Structured Practice on the Ganges',
      description:
        'Residential yoga retreats in Rishikesh with Ganga-side practice, pranayama, meditation, and structured multi-day Himalayan foothill immersion.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Yoga Retreats in Rishikesh — Structured Practice on the Ganges'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is Rishikesh the best place for a yoga retreat in India?',
    answer:
      'Rishikesh is widely regarded as the best place for a yoga retreat in India because it brings together a living yoga culture, a high concentration of experienced teachers, and a river-and-mountain environment that supports daily practice without distraction. It is not only about tradition — it is about access. Different programmes, teaching styles, and levels of intensity are concentrated here in a way that is hard to replicate in a single city elsewhere in India.',
  },
  {
    question: 'Are yoga retreats in Rishikesh beginner-friendly?',
    answer:
      'Yes. Most yoga retreats in Rishikesh structure sessions for mixed experience levels. Facilitators offer modifications for every posture. Pranayama and meditation sessions are taught from foundations — no prior experience assumed. Beginners often report faster progress in a retreat than in months of weekly classes because the immersive format allows the body and mind to adapt without interruption between sessions.',
  },
  {
    question: 'What is included in a yoga retreat in Rishikesh?',
    answer:
      'A standard yoga retreat in Rishikesh includes daily asana sessions (typically two per day), pranayama instruction, guided meditation, vegetarian meals, accommodation, and facilitated group activities such as nature walks or evening satsang. Many programmes also include sound healing, journaling workshops, or Ayurvedic consultations. Yoga mats, props, and practice spaces are provided. You bring comfortable clothing and a willingness to follow the daily structure.',
  },
  {
    question: 'Are yoga retreats in Rishikesh residential?',
    answer:
      'Yes. Retreat programmes in Rishikesh are residential — you stay on-site for the full duration. This is essential to the retreat format. Living within the programme container, eating together, practising together, and sleeping on-site creates the sustained immersion that distinguishes a retreat from a series of drop-in classes. Accommodation ranges from simple ashram rooms to comfortable private rooms depending on the programme.',
  },
  {
    question: 'Can international visitors attend yoga retreats in Rishikesh?',
    answer:
      'Absolutely. Rishikesh draws yoga practitioners from over fifty countries annually. Sessions are conducted in English. International visitors need a valid Indian tourist visa or e-visa. Rishikesh is well-connected — five to six hours from Delhi by road, with Dehradun airport forty-five minutes away offering domestic connections. Many retreats offer airport transfer arrangements for international participants.',
  },
  {
    question: 'How is a yoga retreat different from yoga teacher training?',
    answer:
      'A yoga retreat focuses on personal practice, restoration, and immersive experience. It is for anyone seeking a structured pause. Yoga teacher training (YTT) is a professional certification programme — typically 200 or 500 hours — designed to qualify graduates to teach. Retreats are shorter (two to seven days), less academic, and prioritise personal transformation over technical instruction. If you want to deepen your practice, choose a retreat. If you want to teach, pursue YTT. The two can overlap, but they are not the same outcome.',
  },
  {
    question: 'What should a beginner expect in a first yoga retreat?',
    answer:
      'Expect a slower pace than a normal class, more personal attention, and a clearer structure for each day. You may notice that the first day feels physically simple but mentally noisy; the second day usually feels easier because the body starts to find its rhythm. Beginners are not expected to be flexible; the teaching focus is on breath awareness, alignment cues, and building consistency rather than demonstrating extreme range of motion.',
  },
];

export default function YogaRetreatRishikeshPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const facilitator = getFacilitatorsByRetreat('yoga-and-movement')[0];
  const yogaReviews = getReviewsForSlug('yoga-and-movement');

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Yoga Retreats in Rishikesh', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Yoga Retreats in Rishikesh"
        description="Find yoga retreats in Rishikesh with structured asana, pranayama, meditation, Ganga-side practice, and residential programs."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Yoga Retreats in Rishikesh' },
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

        .med-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem 2.3rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.25); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid #0f766e; }
        .med-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.32); }
        .med-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.85rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .med-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } }
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

        .med-duration-badge { display: inline-flex; align-items: center; justify-content: center; min-width: 64px; height: 40px; padding: 0 0.9rem; border-radius: 10px; background: #0f766e; color: #fff; font-family: var(--font-fraunces), Georgia, serif; font-size: 1rem; font-weight: 600; margin-bottom: 1rem; }
      `}</style>

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/location/rishikesh.webp" alt="Yoga retreat, Rishikesh" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Structured Practice &middot; Ganges</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Yoga Retreats in Rishikesh
          </h1>
          <p style={{ maxWidth: '40rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Structured asana, pranayama, and meditation beside the Ganges — residential yoga programs in the Himalayan foothills.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['Beginner Friendly', 'Residential', 'Ganga-Side Practice', '3–7 Days'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.45rem 0.9rem', background: 'rgba(15,118,110,0.35)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in a yoga retreat in Rishikesh. Can you tell me more?")}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Check Dates &amp; Programs</a>
            <a href="#why-rishikesh" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Why Rishikesh</a>
          </div>
        </div>
      </section>

      <PrimaryCTA
        label="Plan My Yoga Retreat"
        subtext="Share your preferred duration and timing. We will confirm the current Rishikesh Yoga options through the existing enquiry flow."
        vertical="retreat"
        category="yoga-and-movement"
        sourcePath={PATH}
        location="Rishikesh"
      />

      {facilitator && (
        <section className="med-shell" style={{ background: '#f7f9f7', padding: '4rem 0' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Your Facilitator</span>
            </div>
            <h2 className="med-h2">Practice with <span>{facilitator.name}</span></h2>
            <p className="med-body"><strong>{facilitator.title}.</strong> {facilitator.bio}</p>
            <p className="med-body" style={{ marginBottom: 0 }}>{facilitator.approach}</p>
          </div>
        </section>
      )}

      {yogaReviews.length > 0 && (
        <section className="med-shell" style={{ background: '#ffffff', padding: '4rem 0' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Yoga Retreat Experiences</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>What participants <span>experienced</span></h2>
            <div className="med-grid-2" style={{ marginTop: '1.5rem' }}>
              {yogaReviews.map((review) => <ReviewCard key={`${review.participantName}-${review.datePublished}`} review={review} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── INTRO ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Where Practice Begins</span>
          </div>
          <h2 className="med-h2">Not a studio. A <span>tradition</span></h2>
          <p className="med-body">
            Rishikesh is where serious yoga practice begins. Not in a studio with mirrored
            walls and playlist curation — on the banks of the Ganges, in the foothills of the
            Himalayas, inside a tradition that has sustained unbroken practice for generations.
            A yoga retreat here is a residential programme: structured daily asana, pranayama,
            meditation, and guided integration over multiple days. You arrive carrying whatever
            the city has loaded onto you. You leave with a body that has remembered how to
            breathe and a mind that has stopped racing.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            This is not a holiday with yoga attached. It is a programme built around practice,
            held in the one place on earth most associated with that practice. The river
            provides the soundtrack. The mountains provide the frame. The teaching lineage
            provides the structure. Everything else — the noise, the notifications, the
            decision fatigue — stays outside the gate.
          </p>
        </div>
      </section>

      {/* ── WHY RISHIKESH ── */}
      <section id="why-rishikesh" className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Why This Town</span>
          </div>
          <h2 className="med-h2">Why Rishikesh Is the <span>Yoga Capital</span> of India</h2>
          <p className="med-body">
            The title is not honorary. Rishikesh earned it through density of practice,
            depth of lineage, and a physical environment that no other city in India can
            match. The Ganges enters the plains here — cold, fast, and clean enough to sit
            beside at dawn without the cognitive dissonance that other river cities create.
            The Himalayan foothills rise immediately behind the town, delivering mountain
            air, forest canopy, and a natural sound barrier against the world beyond.
          </p>
          <p className="med-body">
            The ashram tradition in Rishikesh is unbroken. Teachers here hold lineages in
            Hatha, Ashtanga, Iyengar, Sivananda, and Kundalini yoga — not as academic
            knowledge but as living practice transmitted teacher to student across decades.
            This depth of instruction is what separates a Rishikesh retreat from a wellness
            resort with a yoga schedule. The teaching carries weight. The corrections are
            precise. The philosophy is integrated into every session, not bolted on as
            an afterthought.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            International recognition followed naturally. Practitioners from over fifty
            countries travel to Rishikesh annually. The town holds India&apos;s highest
            concentration of registered yoga schools, retreat centres, and residential
            programmes. When the world thinks of yoga in India, it thinks of Rishikesh.
            That reputation is infrastructure — it means the best teachers, the most refined
            programmes, and the deepest practice containers are concentrated here. Explore
            all{' '}
            <Link href="/retreats/rishikesh" style={{ color: '#0f766e', fontWeight: 600 }}>
              Rishikesh retreat programs
            </Link>{' '}
            to see the full range of formats available.
          </p>
        </div>
      </section>

      {/* ── WHAT IT LOOKS LIKE ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Structure</span>
          </div>
          <h2 className="med-h2">What a Yoga Retreat in Rishikesh <span>Looks Like</span></h2>
          <p className="med-body">
            A retreat in Rishikesh follows a rhythm built around the river and the mountain
            day. It is not a menu of activities you choose from — it is a structured
            container designed to move you through a physical and mental reset over two to
            seven days.
          </p>

          <div className="med-card" style={{ padding: '2rem' }}>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Morning Ganga-side practice (6:30–8:00 AM).</strong> The primary asana
                  session. Ninety minutes of guided practice on a riverside platform as mist
                  lifts from the water. Hatha or Vinyasa flow depending on the programme.
                  Modifications for all levels. The sound of the Ganges holds attention without
                  effort — external noise management is unnecessary when the river is the
                  background.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Pranayama (9:00–9:45 AM).</strong> Structured breathwork following
                  breakfast. Alternate nostril breathing, kapalabhati, box breathing, and
                  extended exhale techniques. In Rishikesh&apos;s river-valley air, breath
                  exercises carry a distinctive freshness that studio environments cannot
                  replicate.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Guided meditation (11:00–11:45 AM).</strong> Seated practice — often
                  on the riverbank or in a shaded courtyard. Breath-based concentration, body
                  scanning, or mantra meditation depending on the tradition. This session
                  integrates the morning&apos;s physical practice into stillness.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Afternoon free practice or nature time.</strong> Unstructured hours
                  for personal practice, journaling, walking along the riverbank, or simply
                  resting. This space is deliberate — the body needs integration time between
                  structured sessions.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Evening session (5:00–6:30 PM).</strong> Restorative yoga, yin
                  practice, or{' '}
                  <Link href="/retreats/journeys/sound-healing" style={{ color: '#0f766e', fontWeight: 600 }}>
                    sound healing retreats
                  </Link>
                  . Slower, softer, and designed to wind the nervous system down. Some programmes
                  include evening satsang — guided philosophical discussion around a theme from
                  the day&apos;s practice.</span>
              </li>
            </ul>
          </div>

          <p className="med-body" style={{ marginTop: '1.6rem' }}>
            Meals are vegetarian, often sattvic — light, clean, and timed to support practice
            rather than social dining. Digital detox is standard. Screens go off on arrival.
            The retreat begins the moment the device goes dark.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            This is not yoga teacher training. Teacher training programmes (200-hour, 500-hour)
            are academic and certification-focused. A retreat is experiential and
            restoration-focused. Both exist in Rishikesh. They serve different purposes.
          </p>
        </div>
      </section>

      {/* ── WHO SHOULD CHOOSE ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Who It&apos;s For</span>
          </div>
          <h2 className="med-h2">Who Should Choose a <span>Yoga Retreat</span> in Rishikesh</h2>
          <p className="med-body">
            Rishikesh serves the widest range of participants of any yoga destination in
            India. The infrastructure supports everything from first-time gentle practice
            to advanced intensive formats.
          </p>

          <div className="med-card" style={{ padding: '2rem' }}>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Beginners who want proper foundations.</strong> A retreat is the fastest
                  way to build a practice. Three days of guided instruction with personal
                  correction establishes alignment, breath awareness, and postural foundations
                  that self-guided learning takes months to approximate. Rishikesh offers the
                  widest selection of beginner-welcoming programmes.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Corporate professionals carrying{' '}
                  <Link href="/retreats/journeys/burnout-recovery" style={{ color: '#0f766e', fontWeight: 600 }}>
                    burnout recovery retreats
                  </Link>.</strong>{' '}
                  Decision fatigue, screen overload, and sleep disruption respond powerfully to
                  structured yoga immersion. The physical practice releases held tension. The
                  breathwork resets the autonomic nervous system. The environment completes the
                  intervention — Rishikesh is five to six hours from Delhi, making it the most
                  accessible serious reset available to NCR professionals. See all{' '}
                  <Link href="/retreats/retreats-near-delhi" style={{ color: '#0f766e', fontWeight: 600 }}>
                    retreats near Delhi
                  </Link>{' '}
                  for accessible options.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>International visitors.</strong> If you are travelling to India for
                  yoga, Rishikesh is the destination. English-language instruction is standard.
                  The town is well-connected — Dehradun airport is forty-five minutes away with
                  domestic flights from Delhi, Mumbai, and Bangalore. Visa requirements are
                  straightforward. The retreats are structured for international comfort without
                  diluting the depth of practice.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Couples seeking a shared practice experience.</strong> Practising yoga
                  together in a residential retreat — meals, sessions, silence, riverbank walks —
                  creates shared presence that a resort holiday cannot. Rishikesh provides the
                  structure that turns a trip into a transformative shared experience.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Short-term seekers (3–5 days).</strong> Not everyone has a week.
                  Rishikesh&apos;s proximity to Delhi and its dense concentration of programmes
                  means you can arrive Friday evening and depart Monday or Tuesday with a
                  complete retreat experience. The short format works here because the teaching
                  infrastructure is so refined — every session counts.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── BEST TIME ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Timing It Right</span>
          </div>
          <h2 className="med-h2">Best Time for a <span>Yoga Retreat</span> in Rishikesh</h2>
          <p className="med-body">
            Rishikesh operates year-round, but the practice quality shifts with the seasons.
            Choosing the right window depends on whether you prioritise outdoor practice
            conditions, quieter atmosphere, or specific weather preferences.
          </p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Strongest Window</span>
              <h3 className="med-h3">October to November</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>Post-monsoon
                clarity, mild temperatures (20–28°C), and excellent river conditions. Morning
                Ganga-side practice is at its best — crisp air, clear skies, low humidity.
                This is the strongest recommendation for first-time visitors.</p>
            </div>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Second Peak</span>
              <h3 className="med-h3">February to April</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>Winter lifts,
                wildflowers appear in the foothills, and the town is quieter than autumn.
                Mornings are cool (12–18°C) and afternoons warm comfortably. Ideal for
                practitioners who prefer fewer visitors and a more intimate retreat
                atmosphere.</p>
            </div>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Summer</span>
              <h3 className="med-h3">May to June</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                <Link href="/retreats/summer-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                  Summer Himalayan retreats
                </Link>{' '}
                are warm in Rishikesh — daytime temperatures reach 35–40°C. Early
                morning and evening sessions remain comfortable, but midday practice moves
                indoors. Some practitioners prefer the heat for its detoxifying intensity.</p>
            </div>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Monsoon</span>
              <h3 className="med-h3">July to September</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>Rain, humidity,
                and a transformed landscape. The Ganges rises and quickens. Outdoor riverside
                practice shifts to covered spaces. The atmosphere is uniquely introspective —
                fewer visitors, lush green foothills, and rain-on-roof meditation that carries
                its own quality.</p>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.8rem', marginTop: '1.4rem' }}>
            <span className="med-season-tag">Winter</span>
            <h3 className="med-h3">December to January</h3>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <Link href="/retreats/winter-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                Winter Himalayan retreats
              </Link>{' '}
              bring cool mornings (8–14°C) and mild afternoons. Rishikesh
              never freezes. Winter practice has a sharp, clear quality — cold air deepens
              pranayama and the low-angle winter light creates beautiful morning session
              conditions.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW LONG ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Choosing Duration</span>
          </div>
          <h2 className="med-h2">How Long Should a <span>Yoga Retreat</span> in Rishikesh Be?</h2>
          <p className="med-body">
            Duration shapes the depth. Each format serves a different intention and schedule
            reality.
          </p>

          <div className="med-card" style={{ padding: '1.8rem', marginBottom: '1.4rem' }}>
            <span className="med-duration-badge">3D</span>
            <h3 className="med-h3">Weekend format — the shorter reset</h3>
            <p className="med-body" style={{ marginBottom: 0 }}>Friday arrival,
              full Saturday immersion, Sunday morning closing. The existing Weekend route is a
              shared Himalayan retreat format rather than a dedicated fixed Rishikesh Yoga
              departure. Ask through the enquiry flow if you want to explore whether a weekend
              Yoga format can be planned in Rishikesh.</p>
          </div>

          <div className="med-card" style={{ padding: '1.8rem', marginBottom: '1.4rem' }}>
            <span className="med-duration-badge">5D</span>
            <h3 className="med-h3">5 days (4 nights) — the sweet spot</h3>
            <p className="med-body" style={{ marginBottom: 0 }}>By day
              three, the body has fully adjusted to the retreat rhythm. Days four and five are
              where the deeper benefits emerge — sustained concentration, emotional processing,
              and the kind of insight that only arrives when the mind has been quiet long
              enough. This format allows the teaching to build progressively rather than
              compress everything into a single full day.</p>
          </div>

          <div className="med-card" style={{ padding: '1.8rem' }}>
            <span className="med-duration-badge">7D</span>
            <h3 className="med-h3">7 days (6 nights) — the full immersion format</h3>
            <p className="med-body" style={{ marginBottom: 0 }}>One week in
              Rishikesh — practising twice daily, eating clean, sleeping in mountain air,
              disconnected from devices — creates a before-and-after line that shorter formats
              approach but do not cross. Physical flexibility increases noticeably. Mental
              patterns that seemed fixed begin to shift. Relationships with stress, sleep, and
              attention reset at a foundational level.</p>
          </div>

          <p className="med-body" style={{ marginTop: '1.6rem', marginBottom: 0 }}>
            Not sure which duration fits your situation? Our comparison of{' '}
            <Link href="/blog/3-day-vs-5-day-himalayan-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>
              three-day versus five-day retreat formats
            </Link>{' '}
            covers the trade-offs in detail.
          </p>
        </div>
      </section>

      {/* ── COMMERCIAL NAVIGATION ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '0 0 3rem' }}>
        <div className="med-inner">
          <div className="med-card" style={{ padding: '1.6rem 1.8rem' }}>
            <p className="med-body" style={{ fontSize: '0.95rem' }}>
              Looking at the full picture? See all{' '}
              <Link href="/retreats/rishikesh" style={{ color: '#0f766e', fontWeight: 600 }}>
                Rishikesh retreat programs
              </Link>{' '}
              including meditation, sound healing, and burnout recovery formats.
            </p>
            <p className="med-body" style={{ margin: 0, fontSize: '0.95rem' }}>
              For yoga programmes across all Himalayan locations, see{' '}
              <Link href="/retreats/yoga-retreat-uttarakhand" style={{ color: '#0f766e', fontWeight: 600 }}>
                yoga retreats in Uttarakhand
              </Link>
              . For all retreat types and destinations, start at{' '}
              <Link href="/retreats/himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                Himalayan retreats in India
              </Link>.
            </p>
            <p className="med-body" style={{ margin: '1rem 0 0', fontSize: '0.95rem' }}>
              Compare the existing{' '}
              <Link href="/5-day-yoga-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>5-day</Link>,{' '}
              <Link href="/7-day-yoga-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>7-day</Link>, and{' '}
              <Link href="/10-day-yoga-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>10-day Yoga retreat</Link>{' '}
              formats, or return to the{' '}
              <Link href="/yoga-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>main Yoga hub</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
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

      {/* ── CLOSING CTA ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '48vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/location/rishikesh.webp" alt="Rishikesh yoga retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.86)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '42rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.5rem, 2.9vw, 2.1rem)', fontWeight: 500, color: '#F6F2E7' }}>Ready to practice beside the Ganges?</h2>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(246,242,231,0.78)' }}>Talk with us about dates, duration, and the right format for your practice.</p>
          <a href={`https://wa.me/919760446101?text=${encodeURIComponent('Hi, I want to plan a yoga retreat in Rishikesh. Can we discuss dates and options?')}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Check Dates &amp; Programs</a>
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
