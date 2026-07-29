import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getExperiencePage } from '@/config/experiencePages';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateServiceSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import PrimaryCTA from '@/components/PrimaryCTA';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import Breadcrumb from '@/components/Breadcrumb';
import { EXPERIENCE_LOCATION_PAGES } from '@/config/experienceLocationPages';
import { getLocationById } from '@/lib/locations';
import { getRetreatServiceBySlug } from '@/content/retreats/services';
import { getReviewsForSlug } from '@/content/reviews';
import { getUpcomingEvents } from '@/config/retreatProgramEvents';
import ReviewCard from '@/components/reviews/ReviewCard';

const PAGE = getExperiencePage('digital-detox-retreat')!;
const PATH = '/digital-detox-retreat';

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

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return {
    title: PAGE.seoTitle ?? PAGE.title,
    description: PAGE.metaDescription,
    alternates: { canonical: buildCanonicalUrl(`/${PAGE.slug}`) },
    openGraph: {
      title: PAGE.title,
      description: PAGE.metaDescription,
      url: buildCanonicalUrl(`/${PAGE.slug}`),
      type: 'website',
      images: buildOgImages(PAGE.title),
    },
  };
}

export default function DigitalDetoxRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const serviceSchema = generateServiceSchema(
    { title: 'Digital Detox Retreat', description: 'Reclaim your attention through complete digital disconnection in the Himalayas.' },
    buildCanonicalUrl(PATH),
    'Himalayas',
  );
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const retreatServices = PAGE.retreatServiceSlugs
    .map((slug) => getRetreatServiceBySlug(slug))
    .filter((s) => s !== undefined);

  const LOCATION_IMAGE_MAP: Record<string, string> = {
    zanskar: '/Images/location/zanskar.webp',
    chakrata: '/Images/location/chakrata.webp',
    rishikesh: '/Images/location/rishikesh.webp',
    munsiyari: '/Images/location/munsiyari.webp',
    mussoorie: '/Images/location/mussoorie.webp',
    sankri: '/Images/location/sankri.webp',
    default: '/Images/whyhimalaya/nature.webp'
  };

  // Split heading for green last word
  const h1Words = PAGE.h1.split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Digital Detox Retreat"
        description="Reclaim your attention through complete digital disconnection in the Himalayas."
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

        .med-location-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 960px) { .med-location-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px) { .med-location-grid { grid-template-columns: 1fr; } }

        .med-location-card { overflow: hidden; }
        .med-location-card .med-img-wrap { position: relative; width: 100%; height: 200px; overflow: hidden; }
        .med-location-card .med-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .med-location-card .med-body-wrap { padding: 1.5rem; }

        .med-feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        @media (max-width: 860px) { .med-feature-grid { grid-template-columns: 1fr; } }

        .med-feature-card { padding: 2rem; border-radius: 18px; background: #f7f9f7; border: 1px solid rgba(15,118,110,0.06); }

        .med-service-list { border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; overflow: hidden; }
        .med-service-item { display: block; padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(15,118,110,0.08); text-decoration: none; background: #fff; transition: background 0.2s; }
        .med-service-item:last-child { border-bottom: none; }
        .med-service-item:hover { background: #f7f9f7; }
        .med-service-item .med-service-title { font-family: var(--font-inter), sans-serif; font-size: 1rem; font-weight: 500; color: #2B2A26; display: block; margin-bottom: 0.15rem; }
        .med-service-item .med-service-essence { font-family: var(--font-inter), sans-serif; font-size: 0.82rem; font-weight: 300; color: #6b7280; }

        .med-story-card { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-radius: 18px; background: #fff; border: 1px solid rgba(15,118,110,0.12); text-decoration: none; transition: all 0.3s ease; }
        .med-story-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(15,31,28,0.1); border-color: rgba(15,118,110,0.28); }
        .med-story-card .med-story-label { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; font-weight: 500; color: #2B2A26; }
        .med-story-card .med-story-arrow { color: #0f766e; font-size: 1.2rem; }

        .med-closing-quote { padding-left: 1.5rem; border-left: 4px solid #0f766e; font-family: var(--font-inter), sans-serif; font-size: 1.1rem; font-weight: 400; line-height: 1.85; color: #4b5259; font-style: italic; }

        .med-cta-wrap { background: #f7f9f7; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; padding: 2.5rem; text-align: center; }

        .med-review-card { padding: 0.5rem; background: #fff; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; overflow: hidden; }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }
        .med-detox-cta { padding: 3rem 0; text-align: center; }
        .med-detox-cta .med-body { max-width: 42rem; margin: 0 auto 1.5rem; }

        .med-deep-item { margin-bottom: 2.5rem; }
        .med-deep-item:last-child { margin-bottom: 0; }
        .med-deep-item .med-img-wrap { position: relative; width: 100%; aspect-ratio: 16/9; border-radius: 18px; overflow: hidden; margin-bottom: 2rem; }
        .med-deep-item .med-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .med-deep-item .med-body strong { color: #2B2A26; font-weight: 600; }
        .med-deep-item .med-list { margin: 1rem 0; }
      `}</style>

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Retreats', href: '/retreats' },
              { name: 'Digital Detox Retreat' },
            ]}
          />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema]) }}
      />

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '78vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src={PAGE.heroImage || '/Images/whyhimalaya/nature.webp'} alt={PAGE.heroImageAlt || PAGE.h1} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Digital Detox Retreat</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.5rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            {h1Rest} <span style={{ color: '#5eead4' }}>{h1LastWord}</span>
          </h1>
          <p style={{ maxWidth: '46rem', margin: '0 auto 1.5rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', fontWeight: 400, lineHeight: 1.85, color: 'rgba(255,255,255,0.85)', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            {PAGE.intro}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['No Signal', 'No Screens', '3–7 Days', 'Deep Reconnection'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '999px', padding: '0.35rem 0.9rem', background: 'rgba(15,118,110,0.25)' }}>
                {tag}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#inquiry" className="med-cta-btn">Plan Your Digital Detox</a>
            <a href="#deep-dive" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Learn More</a>
          </div>
        </div>
      </section>

      {/* ── WHO IS THIS FOR + WHAT TO EXPECT ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-feature-grid">
            <div className="med-feature-card">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Who Is This For</span>
              </div>
              <h2 className="med-h2" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Who This Is <span>For</span></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {PAGE.whoIsThisFor.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.95rem', fontWeight: 400, lineHeight: 1.65, color: '#2B2A26' }}>
                    <span style={{ color: '#0f766e', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="med-feature-card">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">What to Expect</span>
              </div>
              <h2 className="med-h2" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>What to <span>Expect</span></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {PAGE.whatToExpect.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.95rem', fontWeight: 400, lineHeight: 1.65, color: '#2B2A26' }}>
                    <span style={{ color: '#0f766e', flexShrink: 0, marginTop: '2px' }}>✦</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEEP CONTENT ── */}
      {PAGE.deepContent && PAGE.deepContent.length > 0 && (
        <section id="deep-dive" className="med-shell" style={{ background: '#f7f9f7', padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            {PAGE.deepContent.map((section, idx) => {
              const headingText = section.heading;
              const words = headingText.split(' ');
              const lastWord = words[words.length - 1];
              const restWords = words.slice(0, -1).join(' ');

              return (
                <div key={section.heading} className="med-card med-deep-item" style={{ padding: '2rem' }}>
                  {idx === 0 && (
                    <div className="med-eyebrow">
                      <span className="med-eyebrow-line" />
                      <span className="med-eyebrow-text">Deep Dive</span>
                    </div>
                  )}

                  {section.image && (
                    <div className="med-img-wrap">
                      <img src={section.image} alt={section.imageAlt || section.heading} />
                    </div>
                  )}

                  <h2 className="med-h2" style={{ marginBottom: '1.5rem' }}>
                    {restWords} <span>{lastWord}</span>
                  </h2>

                  {section.body.split('\n\n').map((paragraph, i) => {
                    if (paragraph.includes('\n•') || paragraph.includes('\n-')) {
                      const lines = paragraph.split('\n');
                      const listItems = lines.filter(line => line.trim().startsWith('•') || line.trim().startsWith('-'));
                      const textBefore = lines.filter(line => !line.trim().startsWith('•') && !line.trim().startsWith('-')).join('\n');

                      return (
                        <div key={i}>
                          {textBefore && (
                            <p className="med-body" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                              {textBefore.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return <strong key={j} style={{ fontWeight: 600, color: '#2B2A26' }}>{part.slice(2, -2)}</strong>;
                                }
                                return <span key={j}>{part}</span>;
                              })}
                            </p>
                          )}
                          {listItems.length > 0 && (
                            <ul className="med-list" style={{ margin: '1rem 0' }}>
                              {listItems.map((item, idx) => (
                                <li key={idx} className="med-list-item">
                                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                                  <span className="med-list-text">
                                    {item.replace(/^[•-]\s*/, '').split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
                                      if (part.startsWith('**') && part.endsWith('**')) {
                                        return <strong key={j} style={{ fontWeight: 600, color: '#2B2A26' }}>{part.slice(2, -2)}</strong>;
                                      }
                                      return <span key={j}>{part}</span>;
                                    })}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    }

                    const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                    return (
                      <p key={i} className="med-body" style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                        {parts.map((part, j) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j} style={{ fontWeight: 600, color: '#2B2A26' }}>{part.slice(2, -2)}</strong>;
                          }
                          return <span key={j}>{part}</span>;
                        })}
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── WHERE WE OFFER THIS ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Where We Offer This</span>
          </div>
          <h2 className="med-h2" style={{ marginBottom: '2.5rem' }}>Locations &amp; <span>Environments</span></h2>

          <div className="med-location-grid">
            {PAGE.locationAngles.map((angle) => {
              const loc = getLocationById(angle.locationId);
              const elPage = EXPERIENCE_LOCATION_PAGES.find(
                (p) => p.experienceSlug === PAGE.slug && p.locationId === angle.locationId,
              );
              const imgUrl = LOCATION_IMAGE_MAP[angle.locationId] || LOCATION_IMAGE_MAP.default;

              return (
                <div key={angle.locationId} className="med-card med-location-card">
                  <div className="med-img-wrap">
                    <img src={imgUrl} alt={angle.heading} />
                  </div>
                  <div className="med-body-wrap">
                    <h3 className="med-h3" style={{ fontSize: '1.1rem' }}>
                      <Link href={`/locations/${angle.locationId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {angle.heading}
                      </Link>
                    </h3>
                    <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: '0.75rem' }}>{angle.description}</p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', borderTop: '1px solid rgba(15,118,110,0.08)', paddingTop: '1rem' }}>
                      {elPage ? (
                        <Link href={`/${elPage.slug}`} style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                          {PAGE.h1.replace(' in the Himalayas', '')} in {loc?.name ?? angle.locationId} →
                        </Link>
                      ) : (
                        <Link href={`/locations/${angle.locationId}`} style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                          About {loc?.name ?? angle.locationId} →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RELATED RETREAT JOURNEYS & EVENTS ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-grid-2" style={{ alignItems: 'start' }}>
            {retreatServices.length > 0 && (
              <div>
                <div className="med-eyebrow">
                  <span className="med-eyebrow-line" />
                  <span className="med-eyebrow-text">Service Offerings</span>
                </div>
                <h3 className="med-h3" style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Related Retreats</h3>
                <div className="med-service-list">
                  {retreatServices.map((service, i, arr) => (
                    <Link key={service.slug} href={`/retreats/journeys/${service.slug}`} className="med-service-item">
                      <span className="med-service-title">{service.title} →</span>
                      <span className="med-service-essence">{service.oneLineEssence}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {(() => {
              const events = getUpcomingEvents()
                .filter((e) => e.experienceSlug === PAGE.slug)
                .slice(0, 4);
              if (events.length === 0) return null;
              return (
                <div>
                  <div className="med-eyebrow">
                    <span className="med-eyebrow-line" />
                    <span className="med-eyebrow-text">Schedules</span>
                  </div>
                  <h3 className="med-h3" style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Upcoming Departures</h3>
                  <div className="med-service-list">
                    {events.map((ev, i, arr) => (
                      <Link key={ev.slug} href={`/${ev.slug}`} className="med-service-item">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="med-service-title">{ev.label} in {ev.locationName}</span>
                          <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 600, color: ev.seatsLeft <= 3 ? '#c92a2a' : '#0f766e' }}>{ev.seatsLeft} seats left →</span>
                        </div>
                        <span className="med-service-essence">{ev.dateRange} · {ev.durationDays} days · ₹{ev.price.toLocaleString('en-IN')}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── PARTICIPANT TESTIMONIALS ── */}
      {(() => {
        const allReviews = PAGE.retreatServiceSlugs.flatMap((slug) => getReviewsForSlug(slug));
        if (allReviews.length === 0) return null;
        const topReviews = allReviews.filter((r) => r.ratingValue >= 4).slice(0, 3);
        if (topReviews.length === 0) return null;
        return (
          <section className="med-shell" style={{ background: '#ffffff', padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
            <div className="med-outer">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">What Participants Say</span>
              </div>
              <h2 className="med-h2" style={{ marginBottom: '2.5rem' }}>Real <span>Experiences</span></h2>
              <div className="med-grid-3" style={{ marginBottom: '2rem' }}>
                {topReviews.map((review) => (
                  <div key={`${review.participantName}-${review.datePublished}`} className="med-review-card">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
              <Link href="/reviews" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.95rem', fontWeight: 400, textDecoration: 'underline' }}>
                Read more experiences →
              </Link>
            </div>
          </section>
        );
      })()}

      {/* ── RETREAT STORIES ── */}
      {PAGE.storyLinks && PAGE.storyLinks.length > 0 && (
        <section className="med-shell" style={{ background: '#f7f9f7', padding: '5rem 0' }}>
          <div className="med-inner" style={{ textAlign: 'center' }}>
            <h2 className="med-h2" style={{ marginBottom: '0.5rem' }}>Retreat <span>Stories</span></h2>
            <p className="med-body" style={{ marginBottom: '2rem', fontSize: '1.05rem', color: '#6b7280' }}>First-person accounts from people who have done this retreat.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              {PAGE.storyLinks.map((story) => (
                <Link key={story.href} href={story.href} className="med-story-card">
                  <span className="med-story-label">{story.label}</span>
                  <span className="med-story-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CLOSING NARRATIVE ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '5rem 0 2rem' }}>
        <div className="med-inner">
          <p className="med-closing-quote" style={{ margin: 0 }}>{PAGE.closingNarrative}</p>
        </div>
      </section>

      {/* ── HIGH VISIBILITY CTA ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '2rem 0 5rem' }}>
        <div className="med-inner">
          <div className="med-cta-wrap">
            <PrimaryCTA
              label={`Find Your ${PAGE.h1.replace(' in the Himalayas', '')}`}
              subtext={`Not sure which location or duration is right for you? Describe where you are and what you need, and we will pair you with the right retreat.`}
              vertical="retreat"
              category="experience-hub"
              sourcePath={`/${PAGE.slug}`}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="med-shell med-section-white" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Common Questions</span>
          </div>
          <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── PRIMARY CTA ── */}
      <section id="inquiry" className="med-shell med-section-alt med-detox-cta" style={{ padding: '4rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Ready to Disconnect</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>Start Your Digital <span>Detox Journey</span></h2>
          <p className="med-body" style={{ textAlign: 'center' }}>
            Reclaim your attention and rediscover what your mind does when it belongs to you again.
          </p>
          <PrimaryCTA
            label="Plan Your Digital Detox"
            vertical="retreat"
            category="digital-detox"
            sourcePath="/digital-detox-retreat"
          />
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell med-section-alt" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-nav-grid">
            <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Retreats</span>
            </Link>
            <Link href="/retreats/himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Himalayan Retreats</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/retreats/digital-detox-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Digital Detox</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/find-your-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Find Your Retreat</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
          </div>
        </div>
      </nav>

    </TrackedPage>
  );
}
