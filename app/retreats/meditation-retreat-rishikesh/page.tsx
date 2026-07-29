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

const PATH = '/retreats/meditation-retreat-rishikesh';

export function generateMetadata(): Metadata {
  return {
    title: 'Meditation Retreats in Rishikesh | Retreats And Treks',
    description:
      'Find meditation retreats in Rishikesh with guided silence, breath awareness, walking meditation, Ganga-side practice, and residential programs.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Meditation Retreats in Rishikesh — Guided Silence on the Ganges',
      description:
        'Residential meditation retreat programs in Rishikesh. Silent sittings, breath awareness and guided practice beside the Ganges in the Himalayan foothills.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Meditation Retreats in Rishikesh — Guided Silence on the Ganges'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Are meditation retreats in Rishikesh silent?',
    answer:
      'Most meditation retreats in Rishikesh include structured silent periods — typically from evening through the following morning. Some programmes offer extended noble silence lasting twenty-four to forty-eight hours. Full Vipassana-style ten-day silence is also available. However, not every retreat is entirely silent. Guided instruction, group check-ins, and meal conversations may occur at designated times. The level of silence is stated clearly before booking so you can choose the format that matches your comfort level.',
  },
  {
    question: 'Is prior meditation experience required for a retreat in Rishikesh?',
    answer:
      'No. Most retreat programmes in Rishikesh welcome beginners and include foundational instruction. Facilitators teach seated posture, breath awareness, body scanning, and concentration techniques from the ground up. The residential format makes it easier to learn — you practise multiple times daily with guidance and correction, which builds competence faster than weekly classes. If you can sit comfortably for fifteen to twenty minutes and follow a schedule, you are ready.',
  },
  {
    question: 'Are meditation retreats in Rishikesh residential?',
    answer:
      'Yes. Retreat programmes are residential — you stay on-site for the entire duration. This is a deliberate design choice. Living within the retreat container removes the transitions, decisions, and distractions that dilute the practice. You eat, sleep, practise, and rest in one environment. Accommodation ranges from simple ashram rooms to comfortable private rooms with river views, depending on the programme and price point.',
  },
  {
    question: 'What is included in a meditation retreat in Rishikesh?',
    answer:
      'A standard meditation retreat includes multiple daily guided sittings, walking meditation sessions, breath awareness instruction, vegetarian meals, accommodation, and facilitated group activities. Many programmes also include sound healing, journaling workshops, or one-on-one guidance with the facilitator. Digital detox is enforced — devices are stored on arrival. You bring comfortable clothing and personal items. All practice materials and spaces are provided.',
  },
  {
    question: 'Can beginners attend a meditation retreat in Rishikesh?',
    answer:
      'Absolutely. Rishikesh is one of the best places in the world for a first meditation retreat. The town holds experienced facilitators who specialise in guiding newcomers through the initial discomfort of sustained sitting. Sessions start with shorter durations — fifteen to twenty minutes — and build gradually. The Ganges-side setting makes stillness easier than it would be in an urban studio. Most beginners report that the retreat exceeded their expectations within the first full day.',
  },
  {
    question: 'How is a meditation retreat different from a yoga retreat?',
    answer:
      'A meditation retreat centres on stillness, silence, and inward attention. Daily structure revolves around seated practice, walking meditation, and breath awareness with minimal physical exertion. A yoga retreat centres on physical practice — asana, movement, and embodied awareness. Both include elements of the other, but the emphasis is distinct. Choose meditation if you want to quiet the mind. Choose yoga if you want to move the body. Both are available in Rishikesh, often at the same centres.',
  },
];

export default function MeditationRetreatRishikeshPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Meditation Retreats in Rishikesh', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Meditation Retreats in Rishikesh"
        description="Find meditation retreats in Rishikesh with guided silence, breath awareness and walking meditation on the Ganges."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Meditation Retreats in Rishikesh' },
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

      {/* ── HERO (short + punchy, image-led) ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/location/rishikesh.webp" alt="Meditation retreat, Rishikesh" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Guided Silence &middot; Ganges</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Meditation Retreats in Rishikesh
          </h1>
          <p style={{ maxWidth: '40rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Guided silence, breath awareness, and walking meditation beside the Ganges — residential programs in the Himalayan foothills.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['Beginner Friendly', 'Residential', 'Digital Detox', '3–7 Days'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.45rem 0.9rem', background: 'rgba(15,118,110,0.35)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in a meditation retreat in Rishikesh. Can you tell me more?")}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Check Dates &amp; Programs</a>
            <a href="#why-rishikesh" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Why Rishikesh</a>
          </div>
        </div>
      </section>

      {/* ── INTRO (exact original hero paragraphs) ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Presence Without Effort</span>
          </div>
          <h2 className="med-h2">The river holds what the <span>mind cannot</span></h2>
          <p className="med-body">
            The Ganges moves through Rishikesh with a sound that does not demand attention
            but holds it effortlessly. That quality — presence without effort — is what
            defines meditation in this town. Where urban life fills every gap with
            notification, obligation, and decision, Rishikesh offers the opposite: a
            riverbank, mountain air, and structured silence. A meditation retreat here is not
            an add-on to a holiday. It is a residential programme built around sustained
            stillness — guided sittings, walking meditation along the river, breath awareness
            in the Himalayan foothills, and periods of noble silence that let the mind finally
            stop performing.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            You arrive carrying months of accumulated input. The retreat does not ask you to
            process it. It asks you to stop. To sit. To breathe. To let the river sound
            replace the internal monologue. Two to seven days of this — in the place where
            contemplative traditions have been practised for centuries — produces a shift
            that no app, no book, and no weekend of sleep can replicate.
          </p>
        </div>
      </section>

      {/* ── WHY RISHIKESH (exact original paragraphs) ── */}
      <section id="why-rishikesh" className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Why This Town</span>
          </div>
          <h2 className="med-h2">Why Rishikesh Is Ideal for <span>Meditation Retreats</span></h2>
          <p className="med-body">
            Rishikesh&apos;s reputation in yoga is well known. What is less discussed is its
            strength as a meditation destination — and the two are not the same. Meditation
            requires deeper quiet, longer stillness, and an environment that supports
            inwardness without stimulation. Rishikesh delivers on every count.
          </p>
          <p className="med-body">
            The ashram ecosystem is the foundation. Rishikesh holds retreat centres and ashrams
            that have hosted contemplative practice for decades — not as a supplement to yoga
            training but as a primary discipline. Vipassana traditions, mantra-based
            concentration practice, Zen-influenced sitting, and secular mindfulness programmes
            all operate within the town. The range of facilitation is unmatched in India. You
            can find a guide for nearly any meditation lineage within a few kilometres of the
            river.
          </p>
          <p className="med-body">
            The Ganges adds a dimension that built environments cannot replicate. River sound
            is not white noise — it is complex, layered, and continuously shifting. It holds
            attention without stimulating it, creating a natural anchor for practice that
            beginners find particularly helpful. Morning sittings on the riverbank, with mist
            rising and temple bells marking the hour, produce a meditative state that hours
            of effort in a quiet room may not reach.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            Then there is the practical advantage. Rishikesh is five to six hours from Delhi
            by road, with Dehradun airport forty-five minutes away. For practitioners
            travelling from Delhi, other Indian cities, or internationally, it is the most
            accessible serious meditation destination in the Himalayas. No multi-day journey
            required. No remote mountain logistics. You arrive and begin. See all{' '}
            <Link href="/retreats/rishikesh" style={{ color: '#0f766e', fontWeight: 600 }}>
              retreat programs in Rishikesh
            </Link>{' '}
            for the full range of formats available.
          </p>
        </div>
      </section>

      {/* ── WHAT IT LOOKS LIKE (exact original list) ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Structure</span>
          </div>
          <h2 className="med-h2">What a Meditation Retreat in Rishikesh <span>Looks Like</span></h2>
          <p className="med-body">
            This is not a yoga class with a meditation segment attached. It is a distinct
            programme format — structured around stillness, silence, and progressive deepening
            of awareness over multiple days.
          </p>

          <div className="med-card" style={{ padding: '2rem' }}>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Silent periods.</strong> Noble silence begins after the evening
                  orientation on day one and continues through early morning. Extended formats
                  hold silence for twenty-four to forty-eight hours at a stretch. Speech is
                  reduced to essential communication with facilitators. This is the structural
                  core — removing verbal output allows the mind to settle in ways that talking
                  environments never permit.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Guided sittings (3–4 per day).</strong> Facilitated meditation sessions
                  building from twenty minutes toward forty-five. Techniques include breath
                  counting, open awareness, body scanning, loving-kindness, and mantra practice.
                  Instruction is precise and verbal — you are guided through each session, not
                  left alone to struggle. Rishikesh facilitators draw from multiple traditions
                  and adapt to the group.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Walking meditation.</strong> Slow, deliberate movement along the
                  riverbank or through ashram gardens. Attention on the feet, the breath, the
                  sensory field. Walking sessions between sittings prevent physical stiffness
                  and teach awareness in motion — a skill that transfers directly into daily
                  life after the retreat ends.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Limited group size.</strong> Most Rishikesh meditation retreats cap at
                  twelve to twenty participants. This is deliberate. Smaller groups create a
                  more contained environment, allow for individual guidance, and reduce the
                  social energy that larger groups generate. The intimacy of the container is
                  part of the practice.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Residential format.</strong> You live on-site for the full duration.
                  Meals, sleep, practice, and rest happen within one environment. There is no
                  commuting, no restaurant decisions, no logistical friction. The container is
                  seamless — you step into it on arrival and step out on departure. Everything
                  in between is held.</span>
              </li>
            </ul>
          </div>

          <p className="med-body" style={{ marginTop: '1.6rem', marginBottom: 0 }}>
            Meals are vegetarian, eaten in silence during extended silent periods, and
            deliberately simple. The food supports practice rather than competing for
            attention. Digital detox is enforced — devices are stored on arrival. This is
            not optional. The retreat begins when the screen goes dark. If physical practice
            is more what you seek, see{' '}
            <Link href="/retreats/yoga-retreat-rishikesh" style={{ color: '#0f766e', fontWeight: 600 }}>
              yoga retreats in Rishikesh
            </Link>{' '}
            for movement-centred programmes at the same locations.
          </p>
        </div>
      </section>

      {/* ── WHO SHOULD CHOOSE (exact original list) ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Who It&apos;s For</span>
          </div>
          <h2 className="med-h2">Who Should Choose a <span>Meditation Retreat</span> in Rishikesh</h2>
          <p className="med-body">
            You do not need to be spiritual, experienced, or calm. You need to be willing to
            sit still and follow a structure.
          </p>

          <div className="med-card" style={{ padding: '2rem' }}>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Professionals carrying chronic stress.</strong> If your mind races
                  at 2 AM, if weekends no longer feel restorative, if you cannot remember the
                  last time you felt genuinely present — a meditation retreat addresses the
                  cause, not the symptom. Sustained silence and guided practice interrupt the
                  overthinking loop that{' '}
                  <Link href="/retreats/journeys/burnout-recovery" style={{ color: '#0f766e', fontWeight: 600 }}>
                    burnout recovery retreats
                  </Link>{' '}
                  are designed to break. Rishikesh is five to six hours from Delhi — accessible
                  enough for a{' '}
                  <Link href="/retreats/retreats-near-delhi" style={{ color: '#0f766e', fontWeight: 600 }}>
                    retreats near Delhi
                  </Link>{' '}
                  without extended leave.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>First-time silent retreat participants.</strong> The idea of sustained
                  silence feels intimidating before you experience it. It should not. Rishikesh
                  programmes are facilitated — you are held through the process. The schedule
                  provides rhythm. The river provides ambient support. Most first-timers report
                  that discomfort dissolves within the first half-day and is replaced by a quiet
                  clarity they did not know was available.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Experienced meditators seeking depth.</strong> A twenty-minute daily
                  practice has a ceiling. Retreat immersion — six to eight hours of practice
                  daily in a Ganges-side container — breaks through it. States and insights that
                  are inaccessible in home practice emerge when the mind has been still long
                  enough. Rishikesh holds facilitators experienced enough to guide advanced
                  practitioners into new territory.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>International visitors.</strong> Rishikesh draws meditation
                  practitioners from over fifty countries. Sessions are in English. The town is
                  well-connected internationally via Dehradun airport. Retreat centres are
                  accustomed to hosting global participants and accommodate dietary, language,
                  and cultural needs as standard.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Three-to-five-day seekers.</strong> Not everyone has a week. A three-
                  to five-night meditation retreat in Rishikesh delivers meaningful depth — the
                  mind typically settles into sustained stillness by day two. The concentrated
                  facilitator infrastructure means every session is maximally effective. Short
                  formats here achieve what longer formats in less structured settings may not.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── BEST TIME (exact original paragraphs, as season cards) ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Timing It Right</span>
          </div>
          <h2 className="med-h2">Best Time for a <span>Meditation Retreat</span> in Rishikesh</h2>
          <p className="med-body">
            Rishikesh operates year-round, and each season shapes the meditation experience
            differently. The climate is milder than higher-altitude locations, making it
            practical in every month.
          </p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Strongest Window</span>
              <h3 className="med-h3">October to November</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>Post-monsoon air
                is washed clean. Temperatures sit between 20 and 28°C. The Ganges runs clear.
                Morning riverbank sittings carry extraordinary clarity — sharp light, cool air,
                no humidity. This is our first recommendation for anyone new to meditation
                retreats.</p>
            </div>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Second Peak</span>
              <h3 className="med-h3">February to April</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>Winter lifts gradually.
                Mornings are cool (12–18°C) and afternoons warm gently. The town is quieter than
                autumn — fewer visitors, more spaciousness, and a contemplative atmosphere that
                suits silent practice.</p>
            </div>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Summer</span>
              <h3 className="med-h3">May to June</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                <Link href="/retreats/summer-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                  Summer Himalayan retreats
                </Link>{' '}
                are warm in Rishikesh. Daytime temperatures reach 35–40°C. Morning
                and evening sittings remain comfortable. Midday practice moves to shaded or
                air-cooled spaces. The heat itself can become a practice object — sustained
                attention in discomfort has a long contemplative lineage.</p>
            </div>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Monsoon</span>
              <h3 className="med-h3">July to September</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>Rain deepens the river
                sound. Mist fills the valley. The enforced inwardness of rainy days amplifies
                the meditation container — fewer outdoor distractions, longer indoor sits, and
                an atmosphere of natural seclusion.</p>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.8rem', marginTop: '1.4rem' }}>
            <span className="med-season-tag">Winter</span>
            <h3 className="med-h3">December to January</h3>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <Link href="/retreats/winter-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                Winter Himalayan retreats
              </Link>{' '}
              bring cold mornings (8–14°C) and mild afternoons. Rishikesh
              never freezes. Cold-air breath practice has a distinctive sharpness. The low
              winter light — golden in the morning, soft in the afternoon — creates
              meditative visual conditions that other seasons do not offer.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW LONG (exact original paragraphs, as duration cards) ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Choosing Duration</span>
          </div>
          <h2 className="med-h2">How Long Should a <span>Meditation Retreat</span> Be?</h2>
          <p className="med-body">
            Duration determines depth. The mind settles in layers, and each layer requires
            time.
          </p>

          <div className="med-card" style={{ padding: '1.8rem', marginBottom: '1.4rem' }}>
            <span className="med-duration-badge">3D</span>
            <h3 className="med-h3">3 days (2 nights) — the entry format</h3>
            <p className="med-body" style={{ marginBottom: 0 }}>Friday arrival, full
              Saturday immersion, Sunday morning closing. The mind resists on day one and
              begins to settle on day two. By Sunday morning, you experience a taste of the
              quiet that longer formats deepen. This is enough for measurable benefit —
              reduced mental chatter, improved sleep quality, and restored capacity for
              presence. Ideal for working professionals testing the retreat format.</p>
          </div>

          <div className="med-card" style={{ padding: '1.8rem', marginBottom: '1.4rem' }}>
            <span className="med-duration-badge">5D</span>
            <h3 className="med-h3">5 days (4 nights) — the recommended format</h3>
            <p className="med-body" style={{ marginBottom: 0 }}>For genuine
              transformation. By day three, resistance dissolves and the practice becomes
              self-sustaining. Days four and five are where the work happens — layers of
              accumulated tension surface and release, sustained concentration stabilises,
              and the mind accesses a quality of stillness that shorter formats only glimpse.
              This is where most participants report the experience they came seeking.</p>
          </div>

          <div className="med-card" style={{ padding: '1.8rem' }}>
            <span className="med-duration-badge">7D+</span>
            <h3 className="med-h3">7+ days — extended silent retreat</h3>
            <p className="med-body" style={{ marginBottom: 0 }}>For committed practitioners.
              One week of residential meditation — multiple daily sittings, full noble
              silence, minimal external input — creates a before-and-after line in
              practice. Habitual thought patterns that seemed permanent begin to loosen.
              Emotional processing that has been deferred for months or years finds space.
              The Ganges-side container holds this work with a steadiness that less
              established settings cannot.</p>
          </div>

          <p className="med-body" style={{ marginTop: '1.6rem', marginBottom: 0 }}>
            Weighing your options? Our guide to{' '}
            <Link href="/blog/3-day-vs-5-day-himalayan-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>
              three-day versus five-day retreat formats
            </Link>{' '}
            breaks down the practical trade-offs.
          </p>
        </div>
      </section>

      {/* ── COMMERCIAL NAVIGATION (exact original text) ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '0 0 3rem' }}>
        <div className="med-inner">
          <div className="med-card" style={{ padding: '1.6rem 1.8rem' }}>
            <p className="med-body" style={{ fontSize: '0.95rem' }}>
              Considering all{' '}
              <Link href="/retreats/rishikesh" style={{ color: '#0f766e', fontWeight: 600 }}>
                Rishikesh retreat programs
              </Link>?
              Yoga, sound healing, and burnout recovery formats are also available at the same
              locations.
            </p>
            <p className="med-body" style={{ margin: 0, fontSize: '0.95rem' }}>
              For meditation across all Himalayan locations, see{' '}
              <Link href="/retreats/meditation-retreat-uttarakhand" style={{ color: '#0f766e', fontWeight: 600 }}>
                meditation retreats in Uttarakhand
              </Link>
              . For the complete retreat directory, start at{' '}
              <Link href="/retreats/himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                Himalayan retreats in India
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
          <img src="/Images/location/rishikesh.webp" alt="Rishikesh meditation retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.86)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '42rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.5rem, 2.9vw, 2.1rem)', fontWeight: 500, color: '#F6F2E7' }}>Ready to sit beside the Ganges?</h2>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(246,242,231,0.78)' }}>Talk with us about dates, duration, and the right level of silence for you.</p>
          <a href={`https://wa.me/919760446101?text=${encodeURIComponent('Hi, I want to plan a meditation retreat in Rishikesh. Can we discuss dates and options?')}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Check Dates &amp; Programs</a>
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
