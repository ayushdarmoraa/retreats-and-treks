import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedReads from '@/components/RelatedReads';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/first-day-of-a-meditation-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'First Day at a Meditation Retreat | Retreats And Treks',
    description:
      'What happens on day one of a meditation retreat, from arrival and orientation to your first sit, silent meal, phone surrender, and settling in.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Your First Day at a Meditation Retreat — Hour by Hour',
      description: 'An honest, hour-by-hour account of what day one looks like.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Your First Day at a Meditation Retreat — Hour by Hour'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What time does a meditation retreat usually start?',
    answer:
      'Most residential retreats ask you to arrive between 2pm and 4pm on the first day. This allows time for settling in, orientation, and a first session before dinner. Some retreats start with an evening meal and an introductory talk rather than a formal meditation. Check your specific programme — our retreats send a detailed arrival guide one week before the start date.',
  },
  {
    question: 'Do you meditate on the first day?',
    answer:
      'Yes, but gently. The first sit is usually shorter — 20 to 30 minutes — with clear guidance. The purpose is orientation, not depth. You are learning the posture, the schedule, and the space. The intensive practice begins on day two.',
  },
  {
    question: 'What if I arrive late to a meditation retreat?',
    answer:
      'Contact the retreat centre before your arrival day. Most programmes can accommodate late arrivals but need to know in advance. Arriving after orientation means you miss the group introduction and initial guidelines, which makes the transition harder. Plan your travel to arrive within the stated window.',
  },
  {
    question: 'Can I leave the retreat centre on the first day?',
    answer:
      'Technically yes, but it is discouraged. The first day is about crossing a threshold — physically and mentally. Leaving the grounds, even briefly, disrupts the transition. Bring everything you need before arrival so there is no reason to leave.',
  },
  {
    question: 'What happens if I cannot sit cross-legged?',
    answer:
      'You can meditate in a chair, on a bench, or with a backrest. There is no required posture. The only requirement is that your spine is upright and unsupported (if possible). Our facilitators will help you find a position that works for your body during the first session. Flexibility is not a prerequisite.',
  },
];

export default function FirstDayOfAMeditationRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'First Day of a Retreat', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Your First Day at a Meditation Retreat — Hour by Hour',
    description: 'What actually happens on day one of a meditation retreat.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = 'Your First Day at a Meditation Retreat: Hour by Hour'.split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Your First Day at a Meditation Retreat — Hour by Hour"
        description="What actually happens on day one of a meditation retreat."
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

        .med-card-link { text-decoration: none; display: block; height: 100%; }
        .med-card-link .med-card { height: 100%; display: flex; flex-direction: column; }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-hero-section {
          position: relative;
          overflow: hidden;
          min-height: 78vh;
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
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 1.5rem;
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

        .med-fday-timeline { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; margin-top: 1.8rem; }
        @media (max-width: 720px) { .med-fday-timeline { grid-template-columns: 1fr; } }

        .med-fday-card { padding: 1.5rem; }
        .med-fday-card .med-fday-time { display: inline-flex; align-items: center; justify-content: center; min-width: 64px; height: 36px; padding: 0 0.8rem; border-radius: 10px; background: #0f766e; color: #fff; font-family: var(--font-inter), sans-serif; font-size: 0.75rem; font-weight: 600; margin-bottom: 0.75rem; }
        .med-fday-card .med-fday-note { padding-top: 0.75rem; margin-top: 0.75rem; border-top: 1px solid rgba(15,118,110,0.08); font-family: var(--font-inter), sans-serif; font-size: 0.75rem; color: #6b7280; font-style: italic; }

        .med-prepare-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 1rem; margin-top: 1.8rem; }
        @media (max-width: 960px) { .med-prepare-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px) { .med-prepare-grid { grid-template-columns: 1fr; } }

        .med-prepare-card { padding: 1.2rem; text-align: center; }
        .med-prepare-card .med-prepare-icon { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background: rgba(15,118,110,0.08); color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem; }
        .med-prepare-card .med-h3 { font-size: 0.95rem; margin-bottom: 0.3rem; }
        .med-prepare-card .med-body { font-size: 0.82rem; margin-bottom: 0; }

        .med-fday-featured { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 0; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; overflow: hidden; background: #fff; }
        .med-fday-featured .med-featured-main { padding: 2rem; }
        .med-fday-featured .med-featured-side { position: relative; min-height: 300px; background: linear-gradient(180deg, rgba(16,32,25,0.08), rgba(16,32,25,0.32)), url('/Images/experience-hubs/meditation-hero.webp'); background-size: cover; background-position: center; }
        @media (max-width: 720px) { .med-fday-featured { grid-template-columns: 1fr; } .med-fday-featured .med-featured-side { min-height: 200px; order: -1; } }
        .med-fday-featured .med-featured-points { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.75rem; margin: 1rem 0; }
        @media (max-width: 640px) { .med-fday-featured .med-featured-points { grid-template-columns: 1fr; } }
        .med-fday-featured .med-featured-point { border-radius: 12px; border: 1px solid rgba(15,118,110,0.08); background: #f7f9f7; padding: 0.7rem 0.9rem; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 500; color: #4b5259; text-align: center; }

        .med-fday-cta-box { padding: 1.25rem 1.5rem; border-left: 3px solid #0f766e; border-radius: 18px; background: #f7f9f7; border: 1px solid rgba(15,118,110,0.12); }
        .med-fday-cta-box .med-body { font-size: 0.9rem; margin-bottom: 0; }
        .med-fday-cta-box .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-fday-cta-box .med-body a:hover { text-decoration: underline; }

        .med-fday-bottom-nav { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(15,118,110,0.08); }
        .med-fday-bottom-nav a { display: inline-flex; align-items: center; justify-content: center; padding: 0.6rem 1.2rem; border-radius: 999px; background: #f7f9f7; border: 1px solid rgba(15,118,110,0.12); color: #4b5259; font-family: var(--font-inter), sans-serif; font-size: 0.78rem; font-weight: 500; text-decoration: none; transition: all 0.2s; }
        .med-fday-bottom-nav a:hover { background: rgba(15,118,110,0.06); border-color: #0f766e; transform: translateY(-2px); }
        .med-fday-bottom-nav a:first-child { background: #0f766e; color: #fff; border-color: #0f766e; }
        .med-fday-bottom-nav a:first-child:hover { background: #0d6b64; }

        .med-section-padded { padding: 4rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Meditation Retreats', href: '/meditation-retreats' }, { name: 'First Day' }]} />
        </div>
      </div>

      <article>

        {/* ── HERO ── */}
        <section className="med-shell med-hero-section">
          <div style={{ position: 'absolute', inset: 0 }}>
            <img className="med-hero-bg" src="/Images/experience-hubs/meditation-hero.webp" alt="First day at a meditation retreat" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div className="med-hero-overlay" />
          </div>
          <div className="med-hero-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>First Day Guide</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Day one is the strangest day. You are not yet in the retreat and no longer in your ordinary life. Here is exactly what happens — arrival, phone handover, orientation, first sit, first silent meal, and the moment you realise you are alone with your own mind.
            </p>
            <div className="med-hero-tags">
              <span>2:00pm Arrival</span>
              <span>Phone surrender</span>
              <span>First sit</span>
              <span>Silent meal</span>
            </div>
            <div className="med-hero-actions">
              <Link href="/meditation-retreats" className="med-cta-btn">Explore meditation retreats</Link>
              <a href="#day-one-timeline" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Jump to timeline</a>
            </div>
          </div>
        </section>

        {/* ── DAY ONE TIMELINE ── */}
<section id="day-one-timeline" className="med-shell med-section-alt med-section-padded">
  <div className="med-inner">
    <div className="med-eyebrow">
      <span className="med-eyebrow-line" />
      <span className="med-eyebrow-text">Day One Timeline</span>
    </div>
    <h2 className="med-h2">What happens on <span>the first day</span></h2>
    <p className="med-body">The first day is a threshold. It moves you from travel, conversation, and phone-checking into silence, structure, and the first honest encounter with your own mind.</p>

    <div className="med-fday-timeline">
      {[
        {
          time: '2:00pm',
          title: 'Arrival and the last conversation',
          copy: 'You arrive with your bag, complete registration, receive your room assignment, and meet other participants. Everyone is a little nervous, a little excited, and making the slightly forced small talk of people who know speech is about to be taken away.',
          note: 'What you may feel: nervous, curious, exposed, relieved',
        },
        {
          time: '3:00pm',
          title: 'The phone goes away',
          copy: 'On most silent retreats — and on all of ours — you surrender your phone. Not powered down in your room. Physically handed over. There may be a jolt of anxiety, then a strange lightness. Read more about what a week without your phone actually feels like.',
          link: { href: '/a-week-without-my-phone-digital-detox', label: 'what a week without your phone actually feels like' },
          note: 'Why it matters: the outside world becomes genuinely absent',
        },
        {
          time: '3:30pm',
          title: 'Orientation',
          copy: 'The facilitator introduces the programme: schedule, guidelines, where to sit, when meals are served, where walking paths go, and what to do if you need help. The tone should feel calm, practical, and reassuring.',
          note: 'What changes: the structure begins holding you',
        },
        {
          time: '4:30pm',
          title: 'Your first sit',
          copy: 'The first meditation session is usually 20–30 minutes. It is guided, gentle, and focused on arriving in the body. Most people\'s minds race during the first sit. This is normal. You are not failing — you are seeing how fast the mind moves.',
          note: 'Remember: the first sit is not a test',
        },
        {
          time: '6:00pm',
          title: 'First meal in silence',
          copy: 'Eating without conversation can feel disorienting. You hear chewing, cutlery, and the small sounds of the room. Many people realise here that silence is no longer an idea — it has become concrete.',
          note: 'What you may feel: awkward, alert, sensitive, oddly free',
        },
        {
          time: '7:30pm',
          title: 'Evening session and lights',
          copy: 'A short evening sit or talk closes the day. By 9pm, the centre is quiet — no screen, no book, no music. This is when many first-timers think, "What have I done?" If you want to know what happens next, read about how hard a silent retreat actually is and what happens to your mind in prolonged silence.',
          links: [
            { href: '/how-hard-is-a-silent-retreat', label: 'how hard a silent retreat actually is' },
            { href: '/what-happens-to-your-mind-in-silence', label: 'what happens to your mind in prolonged silence' },
          ],
          note: 'This is often the widest gap between old life and retreat life',
        },
      ].map((item) => (
        <div key={item.time} className="med-card med-fday-card">
          <div className="med-fday-time">{item.time}</div>
          <h3 className="med-h3">{item.title}</h3>
          <p className="med-body" style={{ fontSize: '0.9rem' }}>
            {item.copy}
            {item.link && (
              <> <Link href={item.link.href} style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>{item.link.label}</Link>.</>
            )}
            {item.links && (
              <> {item.links.map((link, idx) => (
                <span key={link.href}>
                  {idx > 0 && ' and '}
                  <Link href={link.href} style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>{link.label}</Link>
                </span>
              ))}.</>
            )}
          </p>
          <div className="med-fday-note">{item.note}</div>
        </div>
      ))}
    </div>

    <div className="med-fday-cta-box" style={{ marginTop: '1.5rem' }}>
      <p className="med-body">
        <strong>Planning your first retreat?</strong> Start with a short, guided programme where the first day is clearly structured and beginner-friendly. <Link href="/3-day-meditation-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>View 3-day meditation retreat →</Link>
      </p>
    </div>
  </div>
</section>

        {/* ── BEFORE YOU ARRIVE ── */}
        <section className="med-shell med-section-white med-section-padded">
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Before Day One</span>
            </div>
            <h2 className="med-h2">What you should know <span>before you arrive</span></h2>
            <p className="med-body">The first day feels easier when your body, travel, expectations, and emergency contact plan are already settled before you reach the retreat centre.</p>

            <div className="med-prepare-grid">
              {[
                { icon: '1', title: 'Pack light', copy: 'Bring only what supports practice. See our <Link href="/what-to-pack-for-a-retreat" style={{ color: "#0f766e", fontWeight: 500, textDecoration: "none" }}>complete packing list</Link>.' },
                { icon: '2', title: 'Arrive rested', copy: 'Do not fly in the same day or travel overnight. Give yourself a buffer before silence begins.' },
                { icon: '3', title: 'Eat normally', copy: 'Do not fast or change your diet dramatically before arrival. Keep the body steady.' },
                { icon: '4', title: 'Tell someone where you are', copy: 'Share the retreat centre contact details with a trusted person before you hand over your phone.' },
                { icon: '5', title: 'Lower your expectations', copy: 'The retreat will not match what you imagine. That is the point.' },
              ].map((item) => (
                <div key={item.title} className="med-card med-prepare-card">
                  <div className="med-prepare-icon">{item.icon}</div>
                  <h3 className="med-h3">{item.title}</h3>
                  <p className="med-body" dangerouslySetInnerHTML={{ __html: item.copy }} />
                </div>
              ))}
            </div>

            <div className="med-card" style={{ padding: '1.25rem 1.5rem', marginTop: '1.5rem', borderLeft: '3px solid #0f766e' }}>
              <p className="med-body" style={{ marginBottom: 0 }}>
                For the complete guide, read <Link href="/how-to-prepare-for-a-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>how to prepare for a retreat</Link> and <Link href="/first-meditation-retreat-tips" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>first meditation retreat tips</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* ── FEATURED ── */}
        <section className="med-shell med-section-alt med-section-padded">
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Beginner-Friendly</span>
            </div>
            <h2 className="med-h2">Start with a short, guided <span>meditation retreat</span></h2>

            <div className="med-fday-featured">
              <div className="med-featured-main">
                <span className="med-season-tag">3-Day Retreat</span>
                <p className="med-body" style={{ marginTop: '0.5rem', fontSize: '1rem' }}>
                  A 3-day meditation retreat gives you the full first-day experience without asking you to commit to a long silent programme. Meals, accommodation, guidance, and structure are included.
                </p>
                <div className="med-featured-points">
                  <div className="med-featured-point">Clear daily structure</div>
                  <div className="med-featured-point">Facilitated practice</div>
                  <div className="med-featured-point">Good for first-timers</div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                  <Link href="/3-day-meditation-retreat" className="med-cta-btn" style={{ padding: '0.7rem 1.2rem', fontSize: '0.7rem' }}>View programme</Link>
                  <Link href="/retreat-calendar" className="med-cta-outline" style={{ padding: '0.7rem 1.2rem', fontSize: '0.7rem' }}>See all dates</Link>
                  <Link href="/find-your-retreat" className="med-cta-outline" style={{ padding: '0.7rem 1.2rem', fontSize: '0.7rem' }}>Find your retreat</Link>
                </div>
              </div>
              <div className="med-featured-side" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="med-shell med-section-white med-section-padded">
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">First-Timer Questions</span>
            </div>
            <h2 className="med-h2">Questions people ask <span>before day one</span></h2>
            <p className="med-body">These are the practical doubts that usually appear before arrival: timing, the first meditation session, late arrival, movement rules, and sitting posture.</p>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

        {/* ── RELATED READS ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4rem 0' }}>
          <div className="med-inner">
            <RelatedReads
              links={[
                { label: 'How Hard Is a Silent Retreat?', href: '/how-hard-is-a-silent-retreat' },
                { label: 'What to Pack for a Retreat', href: '/what-to-pack-for-a-retreat' },
                { label: 'What to Expect at a Meditation Retreat', href: '/what-to-expect-at-a-meditation-retreat' },
                { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
              ]}
            />

            <div className="med-fday-bottom-nav">
              <Link href="/meditation-retreats">← Meditation Retreats</Link>
              <Link href="/how-to-prepare-for-a-retreat">How to Prepare</Link>
              <Link href="/retreat-calendar">Retreat Calendar</Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Retreats</span>
              </Link>
              <Link href="/meditation-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Meditation Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreats/himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Himalayan Retreats</span>
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
