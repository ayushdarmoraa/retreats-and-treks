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
import PrimaryCTA from '@/components/PrimaryCTA';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/retreats/luxury-himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Luxury Himalayan Retreats | Retreats And Treks',
    description:
      'Discover luxury Himalayan retreats in Munsiyari, Sankri and Chakrata. Premium stays, private sessions and private mountain experiences in Uttarakhand.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Luxury Himalayan Retreats in India — Premium Mountain Stays',
      description:
        'Premium Himalayan retreat experiences in Munsiyari, Sankri and Chakrata. Private rooms, planned schedules, small groups and premium mountain retreat time.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Luxury Himalayan Retreats in India — Premium Mountain Stays'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is included in a luxury Himalayan retreat?',
    answer:
      'A luxury Himalayan retreat includes private rooms with scenic views, all meals prepared with local ingredients, daily yoga and meditation sessions with experienced teachers, private wellness check-ins, guided nature walks, and transfers from the nearest transport hub. Most premium programs also include one-on-one breathwork or sound healing sessions, guided journaling materials, and personal scheduling. Group sizes are capped at six to ten guests to ensure personal attention throughout.',
  },
  {
    question: 'Are rooms private in a luxury retreat?',
    answer:
      'Yes. All luxury-tier retreats offer private rooms as standard. In Munsiyari and Sankri, rooms are positioned for mountain or valley views with private bathrooms. Shared accommodation is not part of the premium format. Couples receive private rooms with more space and privacy. The accommodation itself is part of the experience — designed for rest, reflection, and visual link with the surrounding landscape.',
  },
  {
    question: 'Which Himalayan destination is the most private?',
    answer:
      'Munsiyari is the most private destination in the network. Its remoteness — roughly twelve hours from Delhi — naturally filters visitors. The Panchachuli range backdrop, alpine meadow access, and very few tourists create a setting that closer destinations cannot match. Sankri offers comparable solitude in a forest setting. Chakrata provides a quieter executive-retreat format with easier access. Each serves a different meaning of privacy.',
  },
  {
    question: 'Is Munsiyari suitable for retreats year-round?',
    answer:
      'Munsiyari operates retreat programs from late March through November. The peak season — April to June and September to November — offers the clearest skies and most comfortable temperatures. Winter brings heavy snowfall that limits road access and outdoor programming, making December through February impractical for most retreat formats. Monsoon months (July–August) see reduced visibility but lush landscapes — programs run with adjusted indoor-outdoor balance during this window.',
  },
  {
    question: 'How far in advance should I book a luxury Himalayan retreat?',
    answer:
      'Four to six weeks is recommended for standard dates. For peak-season windows — October, November, April and May — booking six to eight weeks ahead is best, as premium programs have few rooms by design. Long weekends and festival holidays fill fastest. Last-minute availability is sometimes possible outside peak season, but the planned nature of luxury programs means advance booking ensures the best room allocation and schedule flexibility.',
  },
  {
    question: 'How is a luxury retreat different from a luxury hotel stay?',
    answer:
      'A luxury hotel provides comfort and service. A luxury retreat supports personal change within that comfort. The difference is structure — guided yoga, meditation, breathwork, nature time, guided reflection and digital detox are woven into a planned flow. You are not simply staying somewhere beautiful; you are participating in a guided process of rest. The room quality is similar, but the intent is very different.',
  },
];

export default function LuxuryHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Luxury Himalayan Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Luxury Himalayan Retreats in India"
        description="Discover luxury Himalayan retreats in Munsiyari, Sankri and Chakrata. Premium stays, private sessions and private mountain experiences in Uttarakhand."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Luxury Himalayan Retreats' },
        ]}
      />

      <style>{`
        .lux-shell { width: 100vw; margin-left: calc(-50vw + 50%); }
        .lux-outer { max-width: 76rem; margin: 0 auto; padding: 0 1.5rem; }
        .lux-inner { max-width: 58rem; margin: 0 auto; padding: 0 1.5rem; }

        .lux-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.1rem; }
        .lux-eyebrow-line { width: 30px; height: 1px; background: rgba(15,118,110,0.35); flex-shrink: 0; }
        .lux-eyebrow-text { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6b7280; font-weight: 600; }

        .lux-h2 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.12; margin: 0 0 1.1rem; }
        .lux-h2 span { color: #0f766e; }
        .lux-h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.15rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.7rem; letter-spacing: -0.01em; }
        .lux-body { font-family: var(--font-inter), sans-serif; font-size: 0.98rem; line-height: 1.9; color: #4b5259; font-weight: 400; margin: 0 0 1rem; }
        .lux-body:last-child { margin-bottom: 0; }
        .lux-body strong { color: #2B2A26; font-weight: 600; }

        .lux-card {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(15,31,28,0.05);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .lux-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: #0f766e; transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: 2;
        }
        .lux-card:hover { transform: translateY(-6px); border-color: rgba(15,118,110,0.28); box-shadow: 0 22px 48px rgba(15,31,28,0.12); }
        .lux-card:hover::before { transform: scaleX(1); }

        .lux-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem 2.3rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.25); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid #0f766e; }
        .lux-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.32); }
        .lux-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.85rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .lux-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }

        .lux-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
        @media (max-width: 900px) { .lux-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .lux-outer, .lux-inner { padding-left: 1.25rem; padding-right: 1.25rem; } }

        @keyframes lux-hero-zoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        .lux-hero-bg { animation: lux-hero-zoom 24s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .lux-hero-bg { animation: none; } }

        .lux-list { padding-left: 1.15rem; margin: 0; display: flex; flex-direction: column; gap: 0.9rem; }
        .lux-list li { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #4b5259; font-weight: 400; }
        .lux-list li strong { color: #2B2A26; font-weight: 600; }

        .lux-stat-row { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid rgba(15,118,110,0.12); border-radius: 14px; overflow: hidden; margin-bottom: 1.6rem; }
        .lux-stat { text-align: center; padding: 1.3rem 0.5rem; background: #fafaf8; border-right: 1px solid rgba(15,118,110,0.1); }
        .lux-stat:last-child { border-right: none; }
        .lux-stat-num { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.5rem; font-weight: 500; color: #0f766e; letter-spacing: -0.02em; line-height: 1; margin-bottom: 0.3rem; }
        .lux-stat-label { font-family: var(--font-inter), sans-serif; font-size: 0.58rem; letter-spacing: 0.16em; text-transform: uppercase; color: #6b7280; }
      `}</style>

      {/* ── HERO (short + punchy, image-led) ── */}
      <section className="lux-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="lux-hero-bg" src="/Images/location/munsiyari.webp" alt="Luxury Himalayan retreat, Munsiyari" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Private &amp; Premium</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Luxury Himalayan Retreats in India
          </h1>
          <p style={{ maxWidth: '40rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Private rooms, capped groups, and a schedule built around you — in Munsiyari, Sankri, and Chakrata.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['Private Rooms', '6–10 Guests Max', 'Private Sessions Included', '4–7 Days'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.45rem 0.9rem', background: 'rgba(15,118,110,0.35)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in a luxury Himalayan retreat. Can you tell me more?")}`} className="lux-cta-btn" target="_blank" rel="noopener noreferrer">Design My Private Retreat</a>
            <a href="#luxury-explained" className="lux-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Learn What Makes It Luxury</a>
          </div>
        </div>
      </section>

      {/* ── INTRO (exact original hero paragraphs, now as a readable section) ── */}
      <section id="luxury-explained" className="lux-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="lux-inner">
          <div className="lux-eyebrow">
            <span className="lux-eyebrow-line" />
            <span className="lux-eyebrow-text">What Luxury Means Here</span>
          </div>
          <h2 className="lux-h2">Luxury is <span>privacy</span>, not price</h2>
          <p className="lux-body">
            Luxury in the Himalayas is not a marble lobby or a thread-count competition. It
            is privacy. It is a room with a view of the Panchachuli range where no one knocks
            unless invited. It is a group small enough that the facilitator knows your name,
            your intention, and your physical limits before the first session begins. It is
            food prepared with attention — local ingredients, seasonal menus, meals timed to
            the rhythm of practice rather than a hotel clock.
          </p>
          <p className="lux-body">
            The difference matters because most retreat marketing uses &ldquo;luxury&rdquo;
            to mean expensive. What experienced travellers actually seek is a different quality
            of attention — planned schedules, private rooms, low participant ratios,
            personal guidance, and an environment where restoration is the architecture, not an
            afterthought. That is what premium Himalayan retreats deliver.
          </p>
          <p className="lux-body" style={{ marginBottom: 0 }}>
            These programs are designed for people who have stayed at fine hotels and know that
            comfort alone does not produce change. The mountains provide the setting. The
            structure provides the container. The luxury is in how precisely the two are
            combined.
          </p>
          <div style={{ marginTop: '2.2rem' }}>
            <PrimaryCTA
              label="Design My Private Retreat"
              subtext="Interested in a private retreat? Let us design it around you."
              vertical="retreat"
              category="luxury"
              sourcePath="/retreats/luxury-himalayan-retreats"
            />
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES A RETREAT TRULY LUXURY (exact original paragraphs) ── */}
      <section className="lux-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="lux-inner">
          <div className="lux-eyebrow">
            <span className="lux-eyebrow-line" />
            <span className="lux-eyebrow-text">What Makes It Luxury</span>
          </div>
          <h2 className="lux-h2">What Makes a Himalayan Retreat Truly <span>Luxury</span></h2>
          <p className="lux-body">
            A premium retreat is defined by limits — fewer guests, more space, deeper
            individual attention. Standard retreats serve groups of fifteen to twenty-five.
            Luxury formats cap at six to ten. That ratio changes everything: the yoga teacher
            adjusts your alignment personally, the facilitator supports your personal
            process, and the schedule flexes around the group&apos;s actual energy rather than
            a fixed template.
          </p>

          <div className="lux-grid-3" style={{ marginTop: '2rem' }}>
            <div className="lux-card" style={{ padding: '1.6rem' }}>
              <h3 className="lux-h3">Private rooms with scenic views</h3>
              <p className="lux-body" style={{ marginBottom: 0 }}>Not shared dormitories. Not
                rooms facing a corridor. Every accommodation in a luxury Himalayan retreat is
                private, positioned for mountain views, forest canopy, or valley sightlines. The
                room is part of the practice — morning light through the window becomes the first
                grounding of the day.</p>
            </div>
            <div className="lux-card" style={{ padding: '1.6rem' }}>
              <h3 className="lux-h3">Planned scheduling</h3>
              <p className="lux-body" style={{ marginBottom: 0 }}>Standard programs follow fixed timetables.
                Premium programs build in choice. Extended morning practice for those who want depth.
                Free time that is genuinely free. Afternoon options — a private{' '}
                <Link href="/retreats/journeys/sound-healing" style={{ color: '#0f766e', fontWeight: 600 }}>
                  sound healing
                </Link>{' '}
                session, a solo forest walk, a one-on-one breathwork consultation — rather than a
                single group activity.</p>
            </div>
            <div className="lux-card" style={{ padding: '1.6rem' }}>
              <h3 className="lux-h3">Elevated food quality</h3>
              <p className="lux-body" style={{ marginBottom: 0 }}>Meals in luxury retreats are not canteen
                service. Ingredients are locally sourced — Himalayan herbs, seasonal vegetables,
                regional grains. Meals are prepared with dietary awareness and served at a pace that
                respects the day&apos;s rhythm. Eating is part of the restoration, not a break from it.</p>
            </div>
          </div>

          <div className="lux-card" style={{ padding: '1.8rem', marginTop: '1.5rem' }}>
            <h3 className="lux-h3">Personal wellness guidance</h3>
            <p className="lux-body" style={{ marginBottom: 0 }}>A luxury retreat includes at least one
              private session — whether breathwork, meditation instruction, movement assessment,
              or intention-setting dialogue. This is the line between group wellness and personalised
              transformation.</p>
          </div>
        </div>
      </section>

      <div className="lux-shell" style={{ background: '#f7f9f7', padding: '3rem 0' }}>
        <div className="lux-inner">
          <PrimaryCTA
            label="Design My Private Retreat"
            subtext="Tell us your preferences. We will curate a private retreat experience."
            vertical="retreat"
            category="luxury"
            sourcePath="/retreats/luxury-himalayan-retreats"
          />
        </div>
      </div>

      {/* ── BEST DESTINATIONS (exact original paragraphs, per destination) ── */}
      <section className="lux-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="lux-inner">
          <div className="lux-eyebrow">
            <span className="lux-eyebrow-line" />
            <span className="lux-eyebrow-text">Where to Go</span>
          </div>
          <h2 className="lux-h2">Best Destinations for <span>Luxury Himalayan Retreats</span></h2>
          <p className="lux-body">
            Not every Himalayan location supports a luxury format. Remoteness, natural
            quality, accommodation, and small group size all
            determine which destinations qualify.
          </p>

          <div className="lux-card" style={{ padding: '2rem', marginTop: '1.8rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/munsiyari" style={{ color: 'inherit', textDecoration: 'none' }}>
                Munsiyari — Alpine Privacy and Panchachuli Views
              </Link>
            </h3>
            <p className="lux-body">
              Munsiyari is the strongest luxury retreat destination in the Indian Himalayas. At
              2,200 metres in the Kumaon region, it faces the Panchachuli massif — five peaks
              above 6,000 metres that dominate the northern horizon. The visual scale is
              unmatched by any comparable retreat location in Uttarakhand. Mornings begin with
              alpenglow on snow. Evenings close with the range turning copper before dark.
            </p>
            <p className="lux-body">
              What makes{' '}
              <Link href="/retreats/munsiyari" style={{ color: '#0f766e', fontWeight: 600 }}>
                Munsiyari
              </Link>{' '}
              genuinely premium is how remote it is. Twelve hours from Delhi by road, it
              receives a fraction of the visitors that Rishikesh or even Chakrata attract. There
              are no tourist crowds, no commercial strip, no ambient noise. The village operates
              at a pace that mirrors the retreat rhythm rather than competing with it.
            </p>
            <p className="lux-body">
              Retreat accommodation here offers private rooms with direct mountain views, heated
              facilities for shoulder-season stays, and outdoor practice spaces at the meadow
              edge. Sessions run against a backdrop that makes any designed environment feel
              unnecessary — the landscape is the architecture. For guests seeking the
              highest-quality immersive experience in India, Munsiyari is the obvious choice.
            </p>
            <p className="lux-body" style={{ marginBottom: 0 }}>
              The remoteness also means that group sizes are naturally small. Premium programs
              here rarely exceed six guests, creating an intimacy that larger locations
              cannot manufacture. Facilitators have the space to work with individuals. The
              silence between sessions is genuine — not enforced, but held by the setting.
            </p>
          </div>

          <div className="lux-card" style={{ padding: '2rem', marginTop: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/sankri" style={{ color: 'inherit', textDecoration: 'none' }}>
                Sankri — Boutique Forest Retreats
              </Link>
            </h3>
            <p className="lux-body">
              Sankri sits in the upper Tons Valley near the Govind Wildlife Sanctuary — dense
              pine and oak forests, glacial river sound, and genuine wilderness at the doorstep.
              The luxury feel here is different from Munsiyari. Where Munsiyari offers
              alpine grandeur,{' '}
              <Link href="/retreats/sankri" style={{ color: '#0f766e', fontWeight: 600 }}>
                Sankri
              </Link>{' '}
              offers forest intimacy.
            </p>
            <p className="lux-body">
              Premium retreat stays in Sankri feature boutique accommodation in traditional
              Himalayan-style structures — stone and wood, heated rooms, locally crafted interiors.
              Practice spaces sit within earshot of the river. Forest walks move through trails
              that feel untouched. The participant ratio is kept under eight, and the surrounding
              wilderness ensures that the retreat container extends well beyond the property
              boundary.
            </p>
            <p className="lux-body" style={{ marginBottom: 0 }}>
              Sankri is eight to nine hours from Delhi — accessible enough for extended stays of
              four to seven days, which is the optimal format for luxury programming. Participants
              who choose Sankri tend to value depth over spectacle: deep forest quiet, sustained
              practice, and the meditative quality of river-valley living.
            </p>
          </div>

          <div className="lux-card" style={{ padding: '2rem', marginTop: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/chakrata" style={{ color: 'inherit', textDecoration: 'none' }}>
                Chakrata — Quiet Executive Escape
              </Link>
            </h3>
            <p className="lux-body">
              Chakrata serves the luxury segment differently — as an accessible premium option
              for senior professionals who need quality without the time commitment of a remote
              journey. Six to seven hours from Delhi, it offers cantonment-area calm, deodar
              forests, and ridge-line setting at 2,200 metres.
            </p>
            <p className="lux-body" style={{ marginBottom: 0 }}>
              Premium{' '}
              <Link href="/retreats/chakrata" style={{ color: '#0f766e', fontWeight: 600 }}>
                Chakrata retreats
              </Link>{' '}
              suit four-to-five-day formats — arrive Monday, depart Friday, re-enter work with
              minimal schedule disruption. Private rooms on forest edges, guided wellness
              programming, and low-density group sizes make this the executive-retreat choice for
              those who prioritise efficiency alongside restoration.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHO CHOOSES A LUXURY RETREAT (exact original list) ── */}
      <section className="lux-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="lux-inner">
          <div className="lux-eyebrow">
            <span className="lux-eyebrow-line" />
            <span className="lux-eyebrow-text">Who It&apos;s For</span>
          </div>
          <h2 className="lux-h2">Who Chooses a <span>Luxury Himalayan Retreat</span></h2>
          <p className="lux-body">
            Premium-tier retreats attract a clear participant profile — people for whom time is
            the most expensive resource and who will not compromise on environment quality.
          </p>
          <div className="lux-card" style={{ padding: '2rem' }}>
            <ul className="lux-list">
              <li>
                <strong>Senior professionals and C-suite executives</strong> — carrying built-up
                decision fatigue and requiring a reset environment that matches the quality standard
                they maintain elsewhere in life.
              </li>
              <li>
                <strong>Founders and entrepreneurs</strong> — operating at sustained pressure,
                seeking a contained pause that is clear enough to prevent work-creep but
                flexible enough to respect their autonomy.
              </li>
              <li>
                <strong>International travellers</strong> — visiting India for
                high-quality wellness retreat time, expecting accommodation and facilitation standards
                comparable to premium retreat centres in Southeast Asia or Europe.
              </li>
              <li>
                <strong>Couples seeking private retreat</strong> — shared transformation in a
                setting that supports both individual practice and joint experience, without the
                social dynamics of large groups.
              </li>
              <li>
                <strong>Small private groups</strong> — corporate leadership teams, close friend
                circles, or family units who want an private booking with custom plans.
              </li>
            </ul>
          </div>
          <p className="lux-body" style={{ marginTop: '1.5rem', marginBottom: 0 }}>
            If shorter duration fits better, our{' '}
            <Link href="/retreats/weekend-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
              weekend Himalayan retreats
            </Link>{' '}
            offer guided two-to-three-day formats at all locations — a practical entry point
            before booking to an extended luxury stay.
          </p>
        </div>
      </section>

      {/* ── WHAT TO EXPECT (exact original paragraphs) ── */}
      <section className="lux-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="lux-inner">
          <div className="lux-eyebrow">
            <span className="lux-eyebrow-line" />
            <span className="lux-eyebrow-text">The Experience</span>
          </div>
          <h2 className="lux-h2">What to Expect in a <span>Premium Mountain Retreat</span></h2>

          <div className="lux-card" style={{ padding: '1.8rem', marginBottom: '1.4rem' }}>
            <h3 className="lux-h3">Private transfers</h3>
            <p className="lux-body" style={{ marginBottom: 0 }}>Luxury retreats include managed transport from
              the nearest rail or air hub. For Munsiyari, transfers coordinate from Kathgodam
              station. For Sankri, from Dehradun. For Chakrata, from Dehradun or Delhi direct.
              You do not navigate logistics — the journey is handled from the moment you step
              off the train.</p>
          </div>

          <div className="lux-card" style={{ padding: '1.8rem', marginBottom: '1.4rem' }}>
            <h3 className="lux-h3">Extended stay formats</h3>
            <p className="lux-body" style={{ marginBottom: 0 }}>Premium programs typically run four to seven
              days. This duration allows a genuine arc — arrival and decompression, deepening
              practice through mid-stay, settling in the final days. Shorter luxury formats
              of three nights are available for those with tighter schedules, particularly in
              Chakrata. For guidance on optimal retreat duration, see our comparison of{' '}
              <Link href="/blog/3-day-vs-5-day-himalayan-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>
                three-day versus five-day retreat formats
              </Link>.</p>
          </div>

          <div className="lux-card" style={{ padding: '1.8rem', marginBottom: '1.4rem' }}>
            <h3 className="lux-h3">Scenic accommodation</h3>
            <p className="lux-body" style={{ marginBottom: 0 }}>Every room is selected for its relationship
              with the landscape — sight, sound, and air quality. In Munsiyari, this means
              Panchachuli views. In Sankri, forest canopy proximity. In Chakrata, ridge-top
              a setting among deodars. The room is not where you sleep between sessions — it is
              an extension of the retreat container.</p>
          </div>

          <div className="lux-card" style={{ padding: '1.8rem', marginBottom: '1.4rem' }}>
            <h3 className="lux-h3">Flexible scheduling</h3>
            <p className="lux-body" style={{ marginBottom: 0 }}>Premium programs offer guided flexibility.
              Core sessions — morning yoga, guided meditation, nature time — anchor the day.
              Between them, guests choose: private{' '}
              <Link href="/retreats/journeys/burnout-recovery" style={{ color: '#0f766e', fontWeight: 600 }}>
                burnout recovery
              </Link>{' '}
              consultations, extended solo walks, additional bodywork, or simply rest. The schedule
              adapts to the group rather than the group adapting to the schedule.</p>
          </div>

          <div className="lux-card" style={{ padding: '1.8rem', marginBottom: '1.4rem' }}>
            <h3 className="lux-h3">Limited participant intake</h3>
            <p className="lux-body" style={{ marginBottom: 0 }}>This is the non-negotiable of luxury
              programming. Groups are capped at six to ten across all locations, with some
              Munsiyari programs accepting as few as four. Smaller groups mean deeper facilitation,
              less social negotiation, and a setting where real quiet is respected
              rather than merely tolerated.</p>
          </div>

          <div className="lux-card" style={{ padding: '2rem' }}>
            <div className="lux-stat-row">
              <div className="lux-stat">
                <div className="lux-stat-num">₹35K+</div>
                <div className="lux-stat-label">3N Chakrata</div>
              </div>
              <div className="lux-stat">
                <div className="lux-stat-num">1:4</div>
                <div className="lux-stat-label">Teacher Ratio</div>
              </div>
              <div className="lux-stat">
                <div className="lux-stat-num">₹1.2L+</div>
                <div className="lux-stat-label">7N Munsiyari</div>
              </div>
            </div>
            <h3 className="lux-h3">Investment range</h3>
            <p className="lux-body" style={{ marginBottom: 0 }}>Luxury Himalayan retreats typically range from ₹35,000 for a three-night private-room weekend in Chakrata to ₹1,20,000 or more for a seven-night premium retreat in Munsiyari with dedicated facilitator access. The main cost variables are duration, accommodation tier (private room with mountain view versus standard private), teacher-to-guest ratio (1:4 costs more than 1:8), and inclusion of private one-on-one sessions such as breathwork, sound healing, or wellness consultations. All luxury-tier programs include private rooms as standard — shared accommodation does not exist at this level. Meals, transfers from the nearest hub, and all guided sessions are included in the quoted price. The only typical add-ons are long-stay charges and private session upgrades beyond the standard plan.</p>
          </div>
        </div>
      </section>

      {/* ── SEASONAL PLANNING (exact original paragraphs) ── */}
      <section className="lux-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="lux-inner">
          <div className="lux-eyebrow">
            <span className="lux-eyebrow-line" />
            <span className="lux-eyebrow-text">Timing It Right</span>
          </div>
          <h2 className="lux-h2">Seasonal Planning for <span>Luxury Retreats</span></h2>
          <p className="lux-body">
            Each season shapes the luxury retreat experience differently. October and November
            are the premium window — clear Himalayan skies, comfortable temperatures, and peak
            visual clarity across all three locations. The Panchachuli range from Munsiyari in
            late October is arguably the finest mountain view available in Indian wellness travel.
          </p>
          <p className="lux-body">
            April through June suits guests escaping summer heat — temperatures at altitude
            remain fifteen to twenty-five degrees cooler than the plains. For seasonal
            guidance, see our{' '}
            <Link href="/retreats/summer-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
              summer Himalayan retreats
            </Link>{' '}
            guide covering all four locations.
          </p>
          <p className="lux-body" style={{ marginBottom: 0 }}>
            September through November offers the clear air after monsoon that photographers and
            visual-landscape seekers value most. Sankri&apos;s forests turn gold in October.
            Munsiyari&apos;s snowline descends visibly week by week. Chakrata&apos;s ridges
            sharpen against autumn blue. Luxury retreats during this window fill earliest —
            advance booking of six to eight weeks is best.
          </p>
        </div>
      </section>

      {/* ── COMMERCIAL NAVIGATION (exact original text) ── */}
      <section className="lux-shell" style={{ background: '#f7f9f7', padding: '0 0 3rem' }}>
        <div className="lux-inner">
          <div className="lux-card" style={{ padding: '1.5rem 1.8rem' }}>
            <p className="lux-body" style={{ margin: 0, fontSize: '0.95rem' }}>
              Exploring all formats?{' '}
              <Link href="/retreats/himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                Himalayan retreats in India
              </Link>{' '}
              covers every duration, location, and program type across the network.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ (unchanged) ── */}
      <section className="lux-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="lux-inner">
          <div className="lux-eyebrow">
            <span className="lux-eyebrow-line" />
            <span className="lux-eyebrow-text">Common Questions</span>
          </div>
          <h2 className="lux-h2">Frequently Asked <span>Questions</span></h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── NAVIGATION ── */}
      <nav className="lux-shell" style={{ background: '#ffffff' }}>
        <div className="lux-inner" style={{ borderTop: '1px solid rgba(15,118,110,0.1)', padding: '2rem 1.5rem 3.5rem' }}>
          <Link href="/retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
            ← All Retreats
          </Link>
        </div>
      </nav>
    </TrackedPage>
  );
}