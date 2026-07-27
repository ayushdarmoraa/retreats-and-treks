import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import FeaturedRetreat from '@/components/FeaturedRetreat';
import RelatedReads from '@/components/RelatedReads';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/a-week-without-my-phone-digital-detox';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'A Week Without My Phone | Retreats And Treks',
    description:
      'A first-person account of a 7-day Himalayan digital detox retreat: phone withdrawal, recalibration, silence, and what changes afterward.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'A Week Without My Phone — Digital Detox Retreat',
      description:
        'What really happens when you disconnect for a week. A first-person digital detox story from the Himalayas.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('A Week Without My Phone — Digital Detox Retreat'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What happens to your phone during a digital detox retreat?',
    answer:
      'You hand your phone to the facilitator at the start of the retreat. It is stored securely and returned at the end. You can request it for genuine emergencies. Most participants report that the moment of handover is the hardest part — everything after that is easier than expected.',
  },
  {
    question: 'How long does digital withdrawal last?',
    answer:
      'The phantom-phone sensations — reaching for it, feeling the impulse to check — typically peak on day one and fade significantly by day three. By day four, most participants report that the urge has been replaced by a sense of relief. The speed of this transition surprises almost everyone.',
  },
  {
    question: 'Will I miss important messages or calls?',
    answer:
      'Before the retreat, you notify key contacts of your absence. Emergency contact information is provided to your family or workplace. In the history of our retreats, the number of genuine emergencies requiring phone access has been very close to zero. What most people discover is that the world continues perfectly well without their constant availability.',
  },
  {
    question: 'Is a digital detox retreat just about phones?',
    answer:
      'Phones are the primary device, but the detox extends to all screens — laptops, tablets, e-readers. The goal is not anti-technology ideology; it is the removal of constant informational input so your nervous system can recalibrate. You can still use a watch, a headlamp, and a journal. The target is dopamine-driven distraction, not all technology.',
  },
  {
    question: 'What is the difference between a digital detox retreat and a silent retreat?',
    answer:
      'A silent retreat removes speech; a digital detox retreat removes screens and connectivity. They overlap significantly — most silent retreats are also phone-free. A dedicated digital detox retreat may include conversation, group activities, and nature-based experiences while maintaining the no-screen protocol. Both achieve nervous system downregulation through different pathways.',
  },
];

export default function DigitalDetoxStoryPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Digital Detox Retreat', url: buildCanonicalUrl('/digital-detox-retreat') },
    { name: 'A Week Without My Phone', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'A Week Without My Phone — Digital Detox Retreat in the Himalayas',
    description:
      'A first-person account of a 7-day digital detox retreat in the Himalayas.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2025-12-05',
    dateModified: '2026-03-01',
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="A Week Without My Phone — Digital Detox Retreat"
        description="A first-person account of a 7-day digital detox retreat in the Himalayas."
        path={PATH}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
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
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
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

        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }

        .med-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.25rem 0.6rem; border-radius: 999px; }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-story-meta { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .med-story-meta span { font-family: var(--font-inter), sans-serif; font-size: 0.75rem; color: #6b7280; }
        .med-story-meta span::after { content: '·'; margin-left: 0.5rem; }
        .med-story-meta span:last-child::after { content: ''; }
      `}</style>

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Digital Detox Retreat', href: '/digital-detox-retreat' },
          { name: 'A Week Without My Phone' },
        ]}
      />

      <article>
       {/* ── HERO ── */}
<section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
  <div style={{ position: 'absolute', inset: 0 }}>
    <img className="med-hero-bg" src="/Images/location/chakrata.webp" alt="Digital detox retreat in the Himalayas" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
  </div>
  <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
      <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
      <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>First-Person Story &middot; 7 Days</span>
      <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
    </div>
    <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
      A Week Without My Phone: <span style={{ color: '#5eead4' }}>Digital Detox Retreat</span>
    </h1>
    <div className="med-story-meta" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.6)' }}>
      <span>A first-person account</span>
      <span>7 days</span>
      <span>Chakrata, Uttarakhand</span>
      <span>2,000m</span>
    </div>
    <p style={{ maxWidth: '40rem', margin: '0 auto 1rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
      My average screen time was eleven hours and forty-two minutes per day. I know this because my phone told me, weekly, in a notification I had learned to dismiss without reading. The irony of a device measuring the problem it creates was not lost on me. It was lost on my behaviour, though. I kept scrolling.
    </p>
    <p style={{ maxWidth: '40rem', margin: '0 auto', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
      A friend who had done a <Link href="/digital-detox-retreat" style={{ color: '#5eead4', fontWeight: 600 }}>digital detox retreat</Link> described it as "the most boring and most important week of my life." I signed up the next day. Not because I was inspired. Because I was scared of how dependent I had become on a piece of glass.
    </p>
  </div>
</section>

        {/* ── HANDING OVER THE PHONE ── */}
        <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Day 0</span>
            </div>
            <h2 className="med-h2">Handing Over <span>the Phone</span></h2>
            <p className="med-body">
              The retreat was in <Link href="/locations/chakrata" style={{ color: '#0f766e', fontWeight: 600 }}>Chakrata</Link> — a small Himalayan town at 2,000 metres, surrounded by old-growth deodar forest. Two and a half hours from Dehradun. Close enough to reach easily. Far enough that the world felt distant.
            </p>
            <p className="med-body">
              After the orientation session, the facilitator collected phones. She placed them in a locked box and set the box on a shelf. "You will see it every day," she said. "That is intentional. You need to know it is safe. What you will discover is how quickly you stop needing it."
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              The moment my phone left my hand, my body reacted before my mind caught up. A tightness in the chest. A phantom vibration in my pocket. My right hand, for the rest of that evening, kept moving to where the phone usually lived. I counted: it happened fourteen times before dinner. Fourteen unconscious reaches for a device that was already gone. That number told me everything I needed to know about why I was here.
            </p>
          </div>
        </section>

        {/* ── DAY 1 ── */}
        <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Day 1</span>
            </div>
            <h2 className="med-h2">Phantom Vibrations and <span>the Urge to Check</span></h2>
            <p className="med-body">
              The first morning without a phone was disorienting in a way that felt disproportionate to the actual loss. I had no alarm (a bell woke us). No weather check (I looked out the window). No news (the world, presumably, continued). No messages (my emergency contact list had been distributed before the retreat).
            </p>
            <p className="med-body">
              What I noticed most acutely was the urge to document. Walking through the forest, encountering extraordinary light filtering through deodar branches, my first instinct was not to see it but to photograph it. The camera impulse — capture, share, move on — was so deeply embedded that experiencing something directly felt almost transgressive. Who sees a beautiful thing and just... sees it?
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              The morning meditation session was challenging. Without the pre-session scroll (checking everything before sitting down to "clear the deck"), my mind had no sense of completion. There were unfinished loops everywhere — conversations un-replied to, articles half-read, a general ambient anxiety that something somewhere needed my attention. The facilitator named this: "Your mind is running completion software. It will keep looking for closure on open loops. The loops will not close. Eventually, the software stops running."
            </p>
          </div>
        </section>

        <PrimaryCTA
          label="Explore Digital Detox Retreats"
          subtext="Structured disconnection in Himalayan forest. 3 to 7 days. Groups of 12 or fewer."
          vertical="retreat"
          category="detox-story"
          sourcePath={PATH}
        />

        {/* ── DAY 2 ── */}
        <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Day 2</span>
            </div>
            <h2 className="med-h2">The Withdrawal <span>Is Real</span></h2>
            <p className="med-body">
              I want to describe day two honestly because most accounts of digital detox retreats skip this part: it was genuinely unpleasant. Not in a dramatic, crisis way. In an itchy, restless, low-grade way. My attention span, trained by years of scrolling, was approximately ninety seconds. I could not sit with a single thought for more than a minute before my mind demanded new input.
            </p>
            <p className="med-body">
              Without a phone, there was nothing to switch to. No tab to open. No app to check. No quick hit of novelty. The boredom was exquisite. I paced. I organised my bag. I reorganised it. I stood at the window watching nothing happen in the forest, and the nothing felt unbearable.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              The afternoon was a forest walk — three hours moving through old-growth trees on a ridge trail. No headphones. No podcast. No music. Just footsteps and breath and the intermittent sound of birds I could not identify. Somewhere around hour two, the restlessness shifted. Not disappeared — shifted. My attention, starved of quick inputs, began to settle on slower ones. The texture of bark. The way light changed as clouds moved. The rhythm of my own walking. I was not entertained. I was present. The difference was massive.
            </p>
          </div>
        </section>

        {/* ── DAY 3 ── */}
        <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Day 3</span>
            </div>
            <h2 className="med-h2">When the <span>Craving Stops</span></h2>
            <p className="med-body">
              I woke on day three and realised something had changed overnight. The phantom vibrations were gone. My hand had stopped reaching for my pocket. The background anxiety — the sense that something required checking — had faded to a whisper. In its place was a quality I can only describe as spaciousness. My mind had room.
            </p>
            <p className="med-body">
              The meditation session that morning lasted an hour, and for the first time, it did not feel long. Without the neural chatter of unfinished digital loops, my attention was available. The breath was interesting. The sounds of the forest were interesting. My own emotional state was interesting. Not consumed by anxiety or planning — just available for observation.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              The facilitator explained the neuroscience: dopamine-driven reward loops — the cycles of check, receive, check again — require approximately 72 hours to downregulate without the stimulus. After three days, the compulsive quality of phone use fades because the reward pathway is no longer being reinforced. What remains is a cleaner baseline of attention. Not elevated. Not blissful. Just undistorted. This was the most surprising discovery of the retreat: my normal state of consciousness was distorted, and I had no reference point to recognise it until the distortion was removed.
            </p>
          </div>
        </section>

        {/* ── DAY 4-5 ── */}
        <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Days 4–5</span>
            </div>
            <h2 className="med-h2">What You Find <span>Without a Screen</span></h2>
            <p className="med-body">
              With the craving gone, the retreat became something else entirely. Not a discipline. Not an endurance test. A different mode of living. I read a physical book — a novel I had been meaning to read for two years. I read for three hours without interruption. When did I last do that? Before smartphones, probably.
            </p>
            <p className="med-body">
              Conversations with other participants deepened in a way I hadn't expected. Without the option of retreating to a screen, social interactions became longer, more sustained, and less performative. We talked about things that mattered — quietly, without the competitive energy of dinner-party conversation. One man described his relationship with work in terms I recognised painfully. A woman talked about raising children in an attention economy. These conversations would not have happened at this depth with phones available. The screen is always an exit door, and when it is removed, you stay in the room.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              Day five included a dawn trek to a ridge above Chakrata where the Himalayan snow peaks were visible in the distance. Twelve people standing in cold air watching the sun hit snow at 6,000 metres. No one photographed it. Not because of the rules — by day five, no one wanted to. The experience of seeing it directly was enough. Complete. Not needing to be captured, shared, or validated. Just witnessed.
            </p>
          </div>
        </section>

        <PrimaryCTA
          label="Plan a Digital Detox Retreat"
          subtext="Step away from the screen. Himalayan forest, small groups, guided reconnection."
          vertical="retreat"
          category="detox-story"
          sourcePath={PATH}
        />

        {/* ── DAY 6-7 ── */}
        <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Days 6–7</span>
            </div>
            <h2 className="med-h2">Getting the <span>Phone Back</span></h2>
            <p className="med-body">
              On the morning of day six, the facilitator returned our phones. The ritual was deliberately low-key — no ceremony, no speech. She unlocked the box and placed them on a table. Take yours when you are ready.
            </p>
            <p className="med-body">
              I watched myself pick it up. The screen lit with 847 notifications. 847. In seven days. I scrolled through the first page and felt something I did not expect: nothing. Not relief. Not urgency. Not the dopamine hit of catching up. Just a mild recognition that most of these notifications were noise. Promotional emails. App updates. Social media likes on posts I had forgotten writing. Perhaps six of the 847 were genuinely relevant.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              The drive back to Dehradun was quiet. Several participants kept their phones turned off for the journey. I checked mine, replied to the six messages that mattered, then put it in my bag. At the airport, I watched other travellers — heads down, scrolling, earbuds in, attention elsewhere. I had been that person a week ago. I would probably be that person again within a month. But for now, I could see it. That seeing is the retreat's lasting gift.
            </p>
          </div>
        </section>

        {/* ── WHAT CHANGED ── */}
        <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Aftermath</span>
            </div>
            <h2 className="med-h2">What Changed After <span>I Got My Phone Back</span></h2>
            <p className="med-body">Two months later, here is what stuck:</p>

            <ul className="med-list" style={{ marginBottom: '1rem' }}>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Screen time dropped 40%.</strong> Not through willpower or app blockers. Through changed preference. After seven days of undistorted attention, the scroll feels less appealing. The cost is visible now.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Morning phone check eliminated.</strong> I charge the phone outside the bedroom. First hour of the day is phoneless. This single change improved my mornings more than any productivity hack I have tried.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Deeper reading restored.</strong> I finished four books in the month after the retreat. I had finished one in the six months before.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Better sleep.</strong> No screens for 90 minutes before bed. Not as a rule — as a preference. The retreat retrained the preference.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>An awareness of the cost.</strong> Every time I reach for the phone without intention, I notice it now. Not every time. But often enough to interrupt the loop. That awareness is the most durable outcome.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ── WHO THIS IS FOR ── */}
        <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Who This Is For</span>
            </div>
            <h2 className="med-h2">Who Should Consider a <span>Digital Detox Retreat</span></h2>
            <p className="med-body">If you recognise yourself in any of these, a structured digital detox may help:</p>

            <ul className="med-list" style={{ marginBottom: '1rem' }}>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Screen time above 6 hours daily (the average in India is 7.3 hours)</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Checking your phone within 5 minutes of waking</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Inability to read a book for more than 20 minutes without switching tasks</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">A persistent sense that your attention is fragmented</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Sleeping poorly with a phone on the nightstand</span>
              </li>
            </ul>

            <p className="med-body">
              Our <Link href="/digital-detox-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>digital detox retreats</Link> run 3 to 7 days in <Link href="/locations/chakrata" style={{ color: '#0f766e', fontWeight: 600 }}>Chakrata</Link>. For those wanting silence alongside disconnection, the <Link href="/what-i-learned-from-a-silent-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>silent retreat format</Link> combines both. For maximum depth with complete environmental separation, consider the <Link href="/my-7-day-meditation-retreat-in-zanskar" style={{ color: '#0f766e', fontWeight: 600 }}>Zanskar programme</Link> where disconnection is imposed by geography rather than choice.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              See our <Link href="/burnout-recovery-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>burnout recovery retreats</Link> if your screen dependence is connected to chronic work stress, or our <Link href="/stress-relief-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>stress relief programmes</Link> for a broader approach to nervous system recalibration.
            </p>
          </div>
        </section>

        <PrimaryCTA
          label="Start My Digital Detox"
          subtext="Tell us about your situation — we'll recommend the right format and duration."
          vertical="retreat"
          category="detox-story"
          sourcePath={PATH}
        />

        <FeaturedRetreat
          title="Digital Detox Retreat in the Himalayas"
          description="Leave your devices behind. Structured disconnection in the Chakrata forest with guided practice, nature immersion, and complete digital silence."
          links={[
            { label: 'View programme', href: '/digital-detox-retreat' },
            { label: 'Explore Chakrata', href: '/locations/chakrata' },
            { label: 'See all dates', href: '/retreat-calendar' },
          ]}
        />

        {/* ── FAQ ── */}
        <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Common Questions</span>
            </div>
            <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
            { label: 'Why People Go to Meditation Retreats', href: '/why-people-go-to-meditation-retreats' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
            { label: 'What I Learned from a Silent Retreat', href: '/what-i-learned-from-a-silent-retreat' },
          ]}
        />

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell" style={{ background: '#f7f9f7', padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/digital-detox-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Digital Detox Retreats</span>
              </Link>
              <Link href="/what-i-learned-from-a-silent-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Silent Retreat Story</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreat-vs-vacation" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreat vs. Vacation</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>All Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
            </div>
          </div>
        </nav>
      </article>
    </TrackedPage>
  );
}