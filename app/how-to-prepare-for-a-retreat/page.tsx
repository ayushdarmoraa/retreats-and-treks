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
import RelatedReads from '@/components/RelatedReads';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const PATH = '/how-to-prepare-for-a-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'How to Prepare for a Retreat | Retreats And Treks',
    description:
      'How to prepare for a meditation, silent, or healing retreat: packing, schedule changes, mental preparation, physical readiness, and what to leave behind.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'How to Prepare for a Retreat — Practical Checklist',
      description: 'What to do (and stop doing) before a retreat. Physical, mental, and practical preparation.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('How to Prepare for a Retreat — Practical Checklist'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How far in advance should I prepare for a retreat?',
    answer:
      'Two weeks is ideal. In the first week, begin reducing screen time, caffeine, and social commitments. In the second week, simplify further — eat simply, sleep earlier, spend time outdoors. The goal is not to be "retreat-ready" in some perfect sense, but to begin the transition before you arrive. Even small shifts in the last week make a meaningful difference.',
  },
  {
    question: 'Should I meditate before attending a meditation retreat?',
    answer:
      'It helps but is not required. If you have a practice, maintain it in the weeks before. If you do not, try sitting for 10 minutes daily in the week before — not to build skill, but to familiarise yourself with the act of sitting without distraction. The retreat itself will teach you what you need.',
  },
  {
    question: 'What should I pack for a Himalayan retreat?',
    answer:
      'Warm layers (even in summer), comfortable loose clothing for sitting, a warm hat and socks for early morning sessions, a journal and pen, any personal medication, and a book for travel days. Leave behind: work materials, multiple devices, tight schedules. Most retreats provide bedding, towels, and meals. Check with the specific programme for details.',
  },
  {
    question: 'Should I tell people I am going on a retreat?',
    answer:
      'Yes — but briefly. Tell your employer, family, and close friends that you will be unreachable for the duration. Set up an out-of-office reply. The important thing is to create a clean boundary so you are not worrying about unanswered messages during your retreat. The fewer loose ends, the easier it is to settle into silence.',
  },
  {
    question: 'How do I handle work responsibilities before a retreat?',
    answer:
      'Finish or delegate as much as possible in the week before. The biggest enemy of retreat depth is the unresolved task nagging at the back of your mind. Make a list of everything pending, handle what you can, delegate the rest, and make peace with anything left undone. The work will still be there when you return — and you will be better equipped to handle it.',
  },
  {
    question: 'What if I am nervous about attending my first retreat?',
    answer:
      'Nervousness is normal and appropriate. You are about to do something unfamiliar, and your mind is doing its job — scanning for risk. Acknowledge the nervousness without trying to eliminate it. Most retreatants report that the anxiety dissipates within hours of arrival, once the structure and environment take over. If this is your first time, choose a shorter retreat (3 days) in an accessible location like Chakrata.',
  },
];

export default function HowToPrepareForARetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'How to Prepare for a Retreat', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Prepare for a Retreat — Practical Checklist',
    description: 'What to do (and stop doing) before a retreat. Physical, mental, and practical preparation.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "How to Prepare for a Retreat".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.blog.reachChakrata;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="How to Prepare for a Retreat — Practical Checklist"
        description="What to do (and stop doing) before a retreat. Physical, mental, and practical preparation."
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

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-hero-section {
          position: relative;
          overflow: hidden;
          min-height: 75vh;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(15,118,110,0.12);
        }
        .med-hero-section .med-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%);
        }
        .med-hero-section .med-hero-content {
          position: relative;
          z-index: 2;
          max-width: 58rem;
          width: 100%;
          padding: 5rem 1.5rem 4.5rem;
          text-align: center;
        }
        .med-hero-section .med-hero-content .med-h1 {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(2.3rem, 4.6vw, 3.4rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 1.1rem;
          line-height: 1.08;
          text-shadow: 0 3px 24px rgba(0,0,0,0.5);
        }
        .med-hero-section .med-hero-content .med-h1 span {
          color: #5eead4;
        }
        .med-hero-section .med-hero-content .med-body {
          max-width: 46rem;
          margin: 0 auto 1.5rem;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.85);
          text-shadow: 0 2px 14px rgba(0,0,0,0.45);
        }
        .med-hero-section .med-hero-content .med-hero-tags {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .med-hero-section .med-hero-content .med-hero-tags span {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 999px;
          padding: 0.35rem 0.9rem;
          background: rgba(15,118,110,0.25);
        }
        .med-hero-section .med-hero-content .med-hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .med-section-padding { padding: 4rem 0; }
        .med-section-padding-sm { padding: 3rem 0; }

        /* ── Prepare specific styles ── */
        .med-prep-step-badge {
          display: inline-block;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #0f766e;
          background: rgba(15,118,110,0.08);
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
          margin-bottom: 0.8rem;
        }

        .med-prep-travel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(15,118,110,0.12);
        }
        .med-prep-travel .med-img-wrap { position: relative; min-height: 380px; overflow: hidden; }
        .med-prep-travel .med-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .med-prep-travel .med-content { padding: 2rem; display: flex; flex-direction: column; justify-content: center; }
        .med-prep-travel .med-content .med-body { color: #4b5259; }
        .med-prep-travel .med-content .med-body strong { color: #2B2A26; }
        @media (max-width: 720px) { .med-prep-travel { grid-template-columns: 1fr; } .med-prep-travel .med-img-wrap { min-height: 240px; } .med-prep-travel .med-content { padding: 1.25rem; } }

        .med-prep-cta-wrap {
          background: #f7f9f7;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          padding: 2.5rem;
          text-align: center;
          margin-top: 2rem;
        }
        .med-prep-cta-wrap .med-body { color: #4b5259; }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'How to Prepare for a Retreat' },
            ]}
          />
        </div>
      </div>

      <article>

        {/* ── HERO ── */}
        <section className="med-shell med-hero-section">
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              className="med-hero-bg"
              src={heroImage.src}
              alt={heroImage.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div className="med-hero-overlay" />
          </div>
          <div className="med-hero-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Retreat Preparation Guide</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              The retreat does not start when you arrive. It starts when you begin preparing. How you handle the days before — physically, mentally, digitally, and logistically — affects how quickly you settle once you reach the mountains.
            </p>
            <div className="med-hero-tags">
              <span>2 Weeks Before</span>
              <span>1 Week Before</span>
              <span>Travel Day</span>
              <span>Arrival Mindset</span>
            </div>
            <div className="med-hero-actions">
              <Link href="#timeline" className="med-cta-btn">Jump to Preparation Checklist</Link>
              <Link href="/retreats" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>
                Explore Retreats
              </Link>
            </div>
          </div>
        </section>

        {/* ── PREPARATION TIMELINE ── */}
        <section id="timeline" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Preparation Timeline</span>
            </div>
            <h2 className="med-h2">Start preparing <span>before you arrive</span></h2>
            <p className="med-body">
              A retreat settles faster when your body, phone, calendar, and mind have already started slowing down. Use the days before arrival as a gradual transition instead of treating the retreat as a sudden switch.
            </p>

            <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
              {[
                {
                  step: '2 weeks',
                  title: 'Begin the transition',
                  copy: 'Start reducing the inputs that keep your nervous system activated. The goal is not perfection — it is momentum toward simplicity.',
                  points: ['Reduce screen time', 'Cut caffeine gradually', 'Simplify diet', 'Spend time outdoors'],
                },
                {
                  step: '1 week',
                  title: 'Close practical loops',
                  copy: 'The fewer loose ends you carry into the retreat, the easier it becomes to settle into silence, rest, and practice.',
                  points: ['Finish or delegate work', 'Set auto-replies', 'Inform key people', 'Pack early'],
                },
                {
                  step: '48 hours',
                  title: 'Lower information noise',
                  copy: 'Begin an information fast before the retreat so your mind is not arriving full of headlines, messages, and open loops.',
                  points: ['Stop consuming news', 'Limit social media', 'Sleep earlier', 'Sit quietly for 10 minutes'],
                },
                {
                  step: 'Travel day',
                  title: 'Let the journey work',
                  copy: 'Treat the road into the mountains as part of the retreat. Travel can become the bridge between your normal rhythm and retreat rhythm.',
                  points: ['Use airplane mode', 'Eat lightly', 'Watch the landscape', 'Arrive without expectations'],
                },
              ].map((item) => (
                <div key={item.step} className="med-card" style={{ padding: '1.5rem' }}>
                  <div className="med-prep-step-badge">{item.step}</div>
                  <h3 className="med-h3" style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>{item.title}</h3>
                  <p className="med-body" style={{ fontSize: '0.92rem', marginBottom: '0.5rem' }}>{item.copy}</p>
                  <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                    {item.points.map((point) => (
                      <li key={point} className="med-list-item">
                        <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                        <span className="med-list-text">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="med-card" style={{ 
              padding: '1.25rem', 
              marginTop: '1.5rem', 
              background: '#f7f9f7', 
              borderColor: 'rgba(15,118,110,0.06)' 
            }}>
              <p className="med-body" style={{ fontSize: '0.92rem', margin: 0 }}>
                <strong>Not sure what to prepare for?</strong> Tell us your retreat type, dates, and comfort level. We can help you prepare for the specific environment and format.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Ask for Preparation Guidance"
          subtext="Tell us your retreat type, dates, and comfort level — we'll help you prepare for the specific environment."
          vertical="retreat"
          category="prepare-retreat"
          sourcePath={PATH}
        />

        {/* ── TRAVEL DAY ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Travel Day</span>
            </div>
            <h2 className="med-h2">The journey is <span>part of the retreat</span></h2>
            <p className="med-body">
              For Himalayan retreats, travel often involves a flight to Dehradun or Leh, followed by hours of mountain road. This journey is not wasted time — it is the psychological transition between daily life and the retreat environment.
            </p>

            <div className="med-prep-travel" style={{ marginTop: '1.8rem' }}>
              <div className="med-img-wrap">
                <img
                  src="/Images/blog/how-to-reach-chakrata-for-a-retreat.webp"
                  alt="Mountain road journey toward a Himalayan retreat"
                  loading="lazy"
                />
              </div>
              <div className="med-content">
                <p className="med-body" style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem' }}>
                  Let the road, altitude, forest, and changing landscape begin the retreat before the first session starts.
                </p>
                <ul className="med-list">
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text"><strong>Use airplane mode early</strong> — Leave your phone on airplane mode once the mountain drive begins.</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text"><strong>Watch the landscape change</strong> — Let the visual transition from city to mountain work on your nervous system.</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text"><strong>Eat lightly</strong> — Altitude and winding roads can cause nausea, so keep meals simple while travelling.</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text"><strong>Arrive without expectations</strong> — Come with openness instead of a fixed idea of what the retreat must give you.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

                {/* ── MENTAL + PHYSICAL READINESS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Mental + Physical Readiness</span>
            </div>
            <h2 className="med-h2">Prepare for what the retreat <span>actually asks of you</span></h2>
            <p className="med-body">
              You do not need to arrive perfect, peaceful, or highly fit. You need to arrive honest, rested enough to participate, and willing to let the retreat structure support you.
            </p>

            <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
              <div className="med-card" style={{ padding: '1.5rem' }}>
                <h3 className="med-h3" style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Expect discomfort without treating it as failure</h3>
                <p className="med-body" style={{ fontSize: '0.92rem', marginBottom: '0.5rem' }}>The first day of any retreat — especially a silent one — can include restlessness, boredom, anxiety, or irritation. This is normal. It is the mind adjusting.</p>
                <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Release the goal of "achieving inner peace"</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Use the intention: "I will show up and stay present"</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Let the schedule, guides, and environment hold you</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Do not judge early restlessness as a sign the retreat is not working</span>
                  </li>
                </ul>
              </div>

              <div className="med-card" style={{ padding: '1.5rem' }}>
                <h3 className="med-h3" style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>You need comfort, not athletic fitness</h3>
                <p className="med-body" style={{ fontSize: '0.92rem', marginBottom: '0.5rem' }}>You do not need to be fit to attend a meditation or silent retreat. You need to be comfortable sitting for extended periods and able to walk gently on mountain terrain.</p>
                <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Cushions and chairs are always available for sitting practice</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text"><Link href="/locations/chakrata" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Chakrata</Link> and <Link href="/locations/munsiyari" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Munsiyari</Link> need no special preparation beyond normal health</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Higher altitude locations like <Link href="/locations/zanskar" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Zanskar</Link> need basic cardiovascular fitness</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Carry personal medication and tell the team about relevant needs</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="med-prep-cta-wrap">
              <h3 className="med-h3" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Ready to go, but unsure what your retreat requires?</h3>
              <p className="med-body" style={{ marginBottom: '1.25rem' }}>
                Share your dates, location, retreat type, and comfort level. We can help you understand what to pack, how to prepare, and what to expect before arrival.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/retreats" className="med-cta-btn">Explore Retreats</Link>
                <Link href="/contact" className="med-cta-outline">Ask for Preparation Help</Link>
              </div>
            </div>
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'How to Choose a Meditation Retreat', href: '/how-to-choose-a-meditation-retreat' },
            { label: 'What Happens at a Silent Retreat?', href: '/what-happens-at-a-silent-retreat' },
            { label: 'Retreat vs Vacation — Key Differences', href: '/retreat-vs-vacation' },
            { label: 'Benefits of Himalayan Retreats', href: '/benefits-of-himalayan-retreats' },
            { label: 'All Retreat Locations', href: '/locations' },
          ]}
        />

        {/* ── FAQ ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Common Questions</span>
            </div>
            <h2 className="med-h2">Retreat preparation <span>questions</span></h2>
            <p className="med-body">
              Clear answers for people preparing for their first retreat: when to start, whether to meditate beforehand, what to pack, how to handle work, and what to do if nervousness appears.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
            </div>
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/how-to-choose-a-meditation-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← How to Choose a Retreat</span>
              </Link>
              <Link href="/what-happens-at-a-silent-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>What Happens at a Silent Retreat</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/first-meditation-retreat-tips" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>First Retreat Tips</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/find-your-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Find Your Retreat</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
            </div>
          </div>
        </nav>

      </article>
    </TrackedPage>
  );
}