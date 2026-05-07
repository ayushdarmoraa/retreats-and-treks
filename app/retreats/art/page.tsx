import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import { getFacilitatorsByRetreat } from '@/config/facilitators';
import { artAndCreativeRetreat } from '@/content/retreats/art-and-creative';
import { trekAndPaintRetreat } from '@/content/retreats/trek-and-paint';
import { weekendArtRetreat } from '@/content/retreats/weekend-art-retreat';

export const dynamic = 'force-static';

const PATH = '/retreats/art';
const ART_FACILITATOR = getFacilitatorsByRetreat('art-and-creative')[0];

export function generateMetadata(): Metadata {
  return {
    title: 'Art Retreats in the Himalayas — Creative Healing, Painting & Yoga | Retreats And Treks',
    description:
      'Art retreats in India combining painting, writing, movement & yoga in the Himalayan mountains. No experience needed. 2–7 day programs in Mussoorie, Chakrata, Rishikesh, Sankri & Zanskar. Small groups, real guidance.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: { index: true, follow: true },
  };
}

const RETREATS = [
  {
    ...artAndCreativeRetreat,
    duration: '3–7 Days',
    format: 'Immersive',
    image: '/Images/services/artcreative.webp',
    href: '/retreats/journeys/art-and-creative',
    price: 'From ₹18,000',
    outcome: 'Return with authentic creative work — and the memory that creativity is your natural state.',
    nextBatch: 'Oct 2026',
    seats: 8,
  },
  {
    ...trekAndPaintRetreat,
    duration: '5–7 Days',
    format: 'Active + Creative',
    image: '/Images/blog/painting-in-the-himalayas.webp',
    href: '/retreats/journeys/trek-and-paint',
    price: 'From ₹22,000',
    outcome: 'Walk into Himalayan landscapes by day, paint what you see by evening.',
    nextBatch: 'Booking Open',
    seats: 10,
  },
  {
    ...weekendArtRetreat,
    duration: '2–3 Days',
    format: 'Short Escape',
    image: '/Images/blog/can-a-retreat-unblock-creativity.webp',
    href: '/retreats/journeys/weekend-art-retreat',
    price: 'From ₹14,000',
    outcome: 'Two days is enough to remember why you create. Start here.',
    nextBatch: 'Flexible Dates',
    seats: 10,
  },
];

const LOCATIONS = [
  { name: 'Mussoorie', id: 'mussoorie', context: 'Mountain vistas awaken aesthetic sense. The beauty around you invites creative response.', image: '/Images/location/mussoorie.webp' },
  { name: 'Chakrata', id: 'chakrata', context: 'Forest silence creates space for internal creativity to emerge without distraction.', image: '/Images/location/chakrata.webp' },
  { name: 'Rishikesh', id: 'rishikesh', context: 'Spiritual ground supports the vulnerability that authentic creation requires.', image: '/Images/location/rishikesh.webp' },
  { name: 'Sankri', id: 'sankri', context: 'High-altitude wilderness supports visual journaling, silence, and creative intensity.', image: '/Images/location/sankri.webp' },
  { name: 'Zanskar', id: 'zanskar', context: 'Remote Ladakh landscapes create a rare container for solitude, sketching, and deep attention.', image: '/Images/location/zanskar.webp' },
];

const ART_TESTIMONIALS = [
  { name: 'Aditi', retreat: 'Art & Creative Healing', text: 'I booked this retreat heavily burnt out. I hadn\'t painted in ten years. By day three, I was crying over a canvas, and I felt infinitely lighter. It\'s not an art class, it\'s an unburdening.' },
  { name: 'Rohan', retreat: 'Trek & Paint', text: 'Painting a Himalayan sunrise live, sitting on a ridge, changes how you see the world. The facilitators held space so beautifully. Zero pressure, pure creation.' },
  { name: 'Meera', retreat: 'Weekend Art Escape', text: 'I didn\'t know I needed the silence. The combination of early yoga, pine forests, and watercolors cracked something open for me. I went back to the city with a fresh mind.' },
];


const FAQ_ITEMS = [
  {
    question: 'Do I need art experience to join an art retreat?',
    answer:
      'No. The art retreats are designed for beginners as well as experienced artists. The focus is expression, emotional clarity, and creative reconnection, not technical performance or producing perfect work.',
  },
  {
    question: 'What is included in an art retreat?',
    answer:
      'Most art retreats include accommodation, vegetarian meals, guided creative sessions, open creation time, basic art materials, and support from the retreat team. Travel to the retreat location is usually planned separately, with guidance shared after dates and location are finalized.',
  },
  {
    question: 'Which art retreat should I choose?',
    answer:
      'Choose Creative Healing if you want emotional expression through art and yoga, Trek & Paint if you want walking and outdoor painting, and Weekend Art Retreat if you want a short Friday-to-Sunday creative reset near Delhi.',
  },
  {
    question: 'Where are the art retreats held?',
    answer:
      'Art retreats are hosted across Himalayan locations such as Mussoorie, Chakrata, Rishikesh, Sankri, and Zanskar. Each location has a different creative energy, from forest silence and mountain views to high-altitude wilderness and remote solitude.',
  },
  {
    question: 'Can I come alone?',
    answer:
      'Yes. Many guests come alone. The retreats are small, guided, and designed to feel safe for solo travellers, beginners, and people who want quiet creative space without social pressure.',
  },
  {
    question: 'How long should I come for?',
    answer:
      'A weekend retreat works well if you want a short creative reset. A 5–7 day Creative Healing or Trek & Paint retreat gives more time for deeper immersion, slower work, and stronger creative continuity.',
  },
];

export default function ArtRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <main style={{ width: '100%', maxWidth: '100%', padding: 0, paddingTop: 0, overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <style>{`
        .art-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }
        .art-wide { max-width: 72rem; margin: 0 auto; padding: 0 2rem; }
        .art-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .art-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); flex-shrink: 0; }
        .art-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase; color: #374151; font-weight: 500; }
        .art-section-title { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200; letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2rem; }
        .art-section-title span { color: #374151; }
        .art-body-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.92rem; line-height: 1.85; color: #555; font-weight: 300; margin: 0; }

        /* Hero */
        .art-hero { width: 100vw; margin-left: calc(-50vw + 50%); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; min-height: 82vh; text-align: center; padding-top: 68px; }
        .art-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.85) 100%); }

        /* Retreat Cards */
        .art-retreat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 960px) { .art-retreat-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px) { .art-retreat-grid { grid-template-columns: 1fr; } }
        .art-retreat-card {
          display: flex; flex-direction: column; text-decoration: none; color: inherit;
          background: #fff; border: 1px solid rgba(15,118,110,0.1); border-radius: 8px;
          overflow: hidden; transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .art-retreat-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,0.1); border-color: rgba(15,118,110,0.3); }
        .art-retreat-card-img { position: relative; height: 220px; overflow: hidden; }
        .art-retreat-card-img img { transition: transform 0.6s; }
        .art-retreat-card:hover .art-retreat-card-img img { transform: scale(1.05); }
        .art-retreat-card-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
        .art-retreat-card-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: auto; padding-top: 1rem; }

        /* Location Cards */
        .art-loc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.25rem; }
        .art-loc-card {
          position: relative; height: 280px; border-radius: 10px; overflow: hidden;
          text-decoration: none; color: #fff; display: flex; align-items: flex-end;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .art-loc-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.15); }
        .art-loc-card-content { position: relative; z-index: 2; padding: 1.5rem; width: 100%; }

        /* Unique Cards */
        .art-unique-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; }
        .art-unique-card {
          background: #fff; border: 1px solid #eef0ee; border-radius: 8px; padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03); transition: border-color 0.2s, box-shadow 0.2s;
        }
        .art-unique-card:hover { border-color: rgba(15,118,110,0.25); box-shadow: 0 4px 16px rgba(0,0,0,0.06); }

        /* CTA */
        .art-cta-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 2.25rem; background: var(--color-primary);
          color: #fff; text-decoration: none; font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.78rem; font-weight: 500; letter-spacing: 0.06em;
          border-radius: 100px; transition: background 0.2s, transform 0.2s;
        }
        .art-cta-btn:hover { background: #0d9e95; transform: translateY(-2px); }
        .art-cta-outline {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.7rem 1.8rem; border: 1px solid rgba(15,118,110,0.3);
          color: var(--color-primary); text-decoration: none; font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em;
          border-radius: 100px; transition: all 0.2s;
        }
        .art-cta-outline:hover { border-color: var(--color-primary); background: rgba(15,118,110,0.04); }

        /* Who grid responsive */
        @media (max-width: 640px) { .art-who-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }

        /* Testimonials */
        .art-test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 768px) { .art-test-grid { grid-template-columns: 1fr; } }
        .art-test-card { background: #fff; border: 1px solid rgba(15,118,110,0.1); border-radius: 8px; padding: 2rem 1.75rem; display: flex; flex-direction: column; gap: 1rem; position: relative; overflow: hidden; transition: border-color 0.25s; }
        .art-test-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--color-primary); transform: scaleX(0); transform-origin: left; transition: transform 0.45s cubic-bezier(0.16,1,0.3,1); }
        .art-test-card:hover { border-color: rgba(15,118,110,0.25); }
        .art-test-card:hover::before { transform: scaleX(1); }
        .art-test-quote { font-family: var(--font-geist-sans), sans-serif; font-size: 0.85rem; font-weight: 300; font-style: italic; color: #555; line-height: 1.8; margin: 0; }
        .art-test-author { display: flex; align-items: center; gap: 0.75rem; margin-top: auto; }
        .art-test-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--color-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-family: var(--font-geist-sans), sans-serif; font-size: 0.8rem; font-weight: 500; flex-shrink: 0; }
      `}</style>

      {/* ═══════════════════════════════════════════
          SECTION 1 — CINEMATIC HERO
      ═══════════════════════════════════════════ */}
      <section className="art-hero">
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="/Images/art-retreat/category-hero.webp"
            alt="Art retreats in the Himalayas — painting, yoga, and creative healing in the mountains"
            fetchPriority="high"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }}
          />
          <div className="art-hero-overlay" />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '52rem', margin: '0 auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.5)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>Art & Creativity</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.5)', display: 'inline-block' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 200,
            letterSpacing: '-0.035em', color: '#ffffff', margin: '0 0 1rem',
            lineHeight: 1.05, textShadow: '0 2px 32px rgba(0,0,0,0.7)',
          }}>
            Art Retreats in the Himalayas
          </h1>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '1rem', color: 'rgba(255,255,255,0.82)',
            fontWeight: 300, lineHeight: 1.75, maxWidth: '38rem', margin: '0 0 2rem',
          }}>
            Emotional healing through painting, writing, movement & yoga — no experience needed. Small groups. Real guidance. Mountain silence.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', marginBottom: '2rem' }}>
            {['From ₹14,000', 'Materials Included', 'No Experience Needed', '2–7 Days', 'Small Groups'].map((tag) => (
              <span key={tag} style={{
                fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', fontWeight: 500,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)',
                color: 'rgba(255,255,255,0.85)', borderRadius: '4px', padding: '0.4rem 0.85rem',
              }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <a href={`https://wa.me/919760446101?text=${encodeURIComponent('Hi, I\'m interested in your art retreats in the Himalayas. Can you tell me more?')}`} className="art-cta-btn" target="_blank" rel="noopener noreferrer" style={{ padding: '1rem 2.5rem', fontSize: '0.82rem' }}>Check Dates & Starting Price →</a>
            <a href="#retreats" className="art-cta-outline" style={{ borderColor: 'rgba(255,255,255,0.35)', color: 'rgba(255,255,255,0.9)', padding: '0.9rem 2rem', fontSize: '0.78rem' }}>Compare Art Retreats ↓</a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — WHAT IS AN ART RETREAT? (SEO)
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="art-inner">
          <div className="art-eyebrow">
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Understanding Art Retreats</span>
          </div>
          <h2 className="art-section-title">What is an <span>art retreat</span>?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p className="art-body-text">
              An art retreat is a structured period of creative immersion — typically 2 to 7 days — where you step away from daily life to focus entirely on creative expression. Unlike art classes, the goal is not technical mastery. It is reconnection with your own creative voice.
            </p>
            <p className="art-body-text">
              In the Himalayas, art retreats take on a different character. Mountain silence, forest light, and the sheer scale of the landscape become active participants in your creative process. Many participants discover that their most authentic work emerges not from instruction, but from the combination of creative space, nature, and stillness.
            </p>
            <p className="art-body-text">
              Our art retreats use multiple mediums — painting, writing, collage, movement, and music — as doorways to emotional truth and creative reconnection. No experience is needed. No talent is required. Only curiosity and a willingness to create without judgment.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — WHY ART RETREATS WORK
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="art-inner">
          <div className="art-eyebrow">
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Why It Works</span>
          </div>
          <h2 className="art-section-title">Why art retreats <span>heal</span></h2>
          <p className="art-body-text" style={{ marginBottom: '2.5rem' }}>
            This is not an art class. It is a healing container where creativity is the modality — and the Himalayas are the co-facilitator.
          </p>
          <div className="art-unique-grid">
            {artAndCreativeRetreat.whatMakesItUnique!.points.map((pt, i) => (
              <div key={i} className="art-unique-card">
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 600, color: '#111', margin: '0 0 0.6rem', letterSpacing: '-0.01em' }}>
                  {pt.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', lineHeight: 1.7, color: '#666', fontWeight: 300, margin: 0 }}>
                  {pt.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3.5 — WHAT YOU CREATE
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="art-wide">
          <div className="art-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Creative Outcomes</span>
            <span className="art-eyebrow-line" />
          </div>
          <h2 className="art-section-title" style={{ textAlign: 'center' }}>What you’ll create and <span>take home</span></h2>
          <p className="art-body-text" style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 3rem' }}>
            You do not come here to make perfect art. You come to make honest work — and leave with physical reminders of what opened during the retreat.
          </p>
          <div className="art-unique-grid">
            {[
              {
                title: 'A personal creative portfolio',
                text: 'In the Creative Healing format, everything you make is yours. You leave with paintings, writing, collage, or mixed-media work that reflects a real moment of expression.',
              },
              {
                title: 'A visual journal of the mountains',
                text: 'In Trek & Paint, each trail and viewpoint becomes part of your journal — sketches, watercolours, notes, and landscape studies made from direct experience.',
              },
              {
                title: 'Materials, prompts, and a practice to continue',
                text: 'Basic art materials are provided, and the retreat rhythm gives you prompts, techniques, and creative rituals you can carry back into everyday life.',
              },
            ].map((item) => (
              <div key={item.title} className="art-unique-card">
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 600, color: '#111', margin: '0 0 0.6rem', letterSpacing: '-0.01em' }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', lineHeight: 1.7, color: '#666', fontWeight: 300, margin: 0 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VISUAL BREAK 1
      ═══════════════════════════════════════════ */}
      <figure style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', height: '300px', overflow: 'hidden', margin: 0, padding: 0 }}>
        <img src="/Images/whyhimalaya/nature.webp" alt="Himalayan landscape — the natural setting for creative retreats" loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
        <figcaption style={{ position: 'absolute', bottom: '1.5rem', left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontWeight: 300, letterSpacing: '0.03em', fontStyle: 'italic' }}>
          The Himalayan landscape becomes part of the creative process
        </figcaption>
      </figure>

      {/* ═══════════════════════════════════════════
          SECTION 4 — WHO THIS IS FOR
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="art-inner">
          <div className="art-eyebrow">
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Is This For You</span>
          </div>
          <h2 className="art-section-title">Who art retreats are <span>for</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="art-who-grid">
            <div>
              <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', margin: '0 0 1.25rem' }}>
                ✓ Perfect if you are
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  'A complete beginner who has never painted or created before',
                  'Feeling creatively blocked and wanting to reconnect with expression',
                  'An experienced artist seeking new inspiration in a natural setting',
                  'Recovering from burnout and wanting healing through creativity',
                  'Looking for a retreat that combines art with yoga and nature',
                  'Wanting to gift yourself a transformative experience',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.6, color: '#444', fontWeight: 300, display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.5rem', color: '#fff', fontWeight: 700 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', margin: '0 0 1.25rem' }}>
                — Not the right fit if you want
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  'Technical art mastery or academic instruction',
                  'Portfolio-ready or market-oriented artwork',
                  'External validation, critiques, or grading',
                  'A structured classroom environment',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.6, color: '#777', fontWeight: 300, display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.6rem', color: '#999' }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — RETREAT OPTIONS (THE MONEY SECTION)
      ═══════════════════════════════════════════ */}
      <section id="retreats" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="art-wide">
          <div className="art-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Choose Your Retreat</span>
            <span className="art-eyebrow-line" />
          </div>
          <h2 className="art-section-title" style={{ textAlign: 'center' }}>Our art <span>retreats</span></h2>
          <p className="art-body-text" style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 3rem' }}>
            Three formats, one promise: authentic creative expression in the Himalayan mountains. Choose the retreat that matches your time and intention.
          </p>

          <div className="art-retreat-grid">
            {RETREATS.map((retreat) => (
              <Link key={retreat.slug} href={retreat.href} className="art-retreat-card">
                <div className="art-retreat-card-img">
                  <Image src={retreat.image} alt={retreat.title} fill loading="lazy" quality={55} sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
                  <span style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.52rem',
                    letterSpacing: '0.24em', textTransform: 'uppercase', color: '#fff',
                    background: 'var(--color-primary)', padding: '4px 10px', borderRadius: '2px', fontWeight: 600,
                  }}>{retreat.format}</span>
                </div>
                <div className="art-retreat-card-body">
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.7rem', color: '#999', fontWeight: 400, margin: '0 0 0.4rem', letterSpacing: '0.02em' }}>
                    {retreat.duration}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', margin: '0 0 0.6rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.05rem', fontWeight: 500, color: '#111', margin: '0', letterSpacing: '-0.015em' }}>
                      {retreat.title}
                    </h3>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#111', display: 'block' }}>{retreat.price}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', color: '#666', fontWeight: 300, lineHeight: 1.7, margin: '0' }}>
                    {retreat.outcome}
                  </p>
                  <div className="art-retreat-card-tags">
                    {retreat.keyHighlights.map((tag) => (
                      <span key={tag} style={{
                        fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.6rem', fontWeight: 500,
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                        background: 'rgba(15,118,110,0.07)', color: 'var(--color-primary)',
                        borderRadius: '3px', padding: '3px 8px',
                      }}>{tag}</span>
                    ))}
                  </div>
                  
                  <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {retreat.nextBatch}
                      </span>
                      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', color: '#888' }}>
                        Only {retreat.seats} seats total
                      </span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                      View Details →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — A DAY AT THE RETREAT
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="art-inner">
          <div className="art-eyebrow">
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">The Experience</span>
          </div>
          <h2 className="art-section-title">What a day <span>looks like</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { time: 'Morning', text: 'Gentle yoga or movement practice. Then a guided creative session — the facilitator introduces a theme, prompt, or technique. You explore through your chosen medium.' },
              { time: 'Midday', text: 'Break. Tea, reflection, a walk. The mountain air does something to your thinking — ideas arrive unbidden.' },
              { time: 'Afternoon', text: 'Open creation time. This is your space. Paint, write, sketch, collage. The facilitator is available. The work is entirely yours.' },
              { time: 'Evening', text: 'Simple dinner. Then, if you wish, a sharing circle. Show your work and receive presence for it. Or keep it private. Both are honored.' },
            ].map((phase, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2rem 1fr', gap: '0 1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff', border: '2px solid var(--color-primary)', marginTop: '0.28rem', zIndex: 1 }} />
                  {idx < 3 && <span style={{ width: 1, flex: 1, background: 'linear-gradient(to bottom, rgba(15,118,110,0.3), rgba(15,118,110,0.05))', marginTop: 4, minHeight: '1.5rem' }} />}
                </div>
                <div style={{ paddingBottom: idx < 3 ? '2rem' : 0 }}>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#374151', margin: '0 0 0.4rem' }}>{phase.time}</p>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: '#555', fontWeight: 300, margin: 0 }}>{phase.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VISUAL BREAK 2
      ═══════════════════════════════════════════ */}
      <figure style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', height: '300px', overflow: 'hidden', margin: 0, padding: 0 }}>
        <img src="/Images/hero/valley-forest.webp" alt="Himalayan valley — art retreat landscape" loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
        <figcaption style={{ position: 'absolute', bottom: '1.5rem', left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontWeight: 300, letterSpacing: '0.03em', fontStyle: 'italic' }}>
          The valleys provide the silence creativity needs
        </figcaption>
      </figure>

      {/* ═══════════════════════════════════════════
          SECTION 7 — WHERE WE HOST ART RETREATS
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="art-wide">
          <div className="art-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Locations</span>
            <span className="art-eyebrow-line" />
          </div>
          <h2 className="art-section-title" style={{ textAlign: 'center' }}>Where we host art <span>retreats</span></h2>
          <p className="art-body-text" style={{ textAlign: 'center', maxWidth: '38rem', margin: '0 auto 3rem' }}>
            Each location brings a different creative energy. Mussoorie for aesthetic beauty. Chakrata for forest silence. Rishikesh for spiritual depth. Sankri for high-altitude wilderness. Zanskar for remote creative solitude.
          </p>
          <div className="art-loc-grid">
            {LOCATIONS.map((loc) => (
              <Link key={loc.id} href={`/retreats/${loc.id}`} className="art-loc-card">
                <Image src={loc.image} alt={`${loc.name} — art retreat location`} fill loading="lazy" quality={55} sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
                <div className="art-loc-card-content">
                  <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.1rem', fontWeight: 400, color: '#fff', margin: '0 0 0.4rem', letterSpacing: '-0.01em' }}>
                    {loc.name}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', fontWeight: 300, lineHeight: 1.6, margin: 0 }}>
                    {loc.context}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7.25 — ART RETREAT PLANNING LINKS
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="art-wide">
          <div className="art-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Plan Your Retreat</span>
            <span className="art-eyebrow-line" />
          </div>
          <h2 className="art-section-title" style={{ textAlign: 'center' }}>Choose your art retreat with <span>clarity</span></h2>
          <p className="art-body-text" style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 3rem' }}>
            Explore practical guides, location advice, and deeper format pages before you decide which creative journey fits you best.
          </p>
          <div className="art-unique-grid">
            {[
              {
                href: '/blog/best-himalayan-locations-for-art-retreat',
                title: 'Best Himalayan locations for art retreats',
                text: 'Compare the creative energy of Mussoorie, Chakrata, Rishikesh, Sankri, and other mountain settings.',
              },
              {
                href: '/blog/art-retreat-for-beginners',
                title: 'Art retreats for beginners',
                text: 'A gentle guide if you feel curious, blocked, or unsure because you do not consider yourself an artist.',
              },
              {
                href: '/blog/painting-in-the-himalayas',
                title: 'Painting in the Himalayas',
                text: 'Understand what plein air painting feels like when the trail, light, and mountain weather become part of the work.',
              },
              {
                href: '/creative-retreat',
                title: 'Creative retreat overview',
                text: 'A deeper supporting page for emotional healing through art, yoga, expression, and mountain stillness.',
              },
              {
                href: '/trek-and-paint-himalayas',
                title: 'Trek and paint in the Himalayas',
                text: 'Explore the active version of the art retreat for people who want walking, viewpoints, and visual journaling.',
              },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="art-unique-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 600, color: '#111', margin: '0 0 0.6rem', letterSpacing: '-0.01em' }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', lineHeight: 1.7, color: '#666', fontWeight: 300, margin: 0 }}>
                  {item.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7.35 — CREATIVE FACILITATION
      ═══════════════════════════════════════════ */}
      {ART_FACILITATOR && (
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
          <div className="art-wide">
            <div className="art-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="art-eyebrow-line" />
              <span className="art-eyebrow-text">Creative Facilitation</span>
              <span className="art-eyebrow-line" />
            </div>
            <h2 className="art-section-title" style={{ textAlign: 'center' }}>Who holds the <span>creative space</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 0.8fr) minmax(0, 1.4fr)', gap: '2rem', alignItems: 'center', maxWidth: '54rem', margin: '0 auto' }}>
              {ART_FACILITATOR.image && (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', borderRadius: '12px', overflow: 'hidden', background: '#eef0ee' }}>
                  <Image src={ART_FACILITATOR.image.src} alt={ART_FACILITATOR.image.alt} fill loading="lazy" quality={70} sizes="(max-width: 720px) 100vw, 320px" style={{ objectFit: 'cover' }} />
                </div>
              )}
              <div>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#374151', margin: '0 0 0.75rem' }}>
                  {ART_FACILITATOR.yearsExperience} years experience
                </p>
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.15rem, 2vw, 1.45rem)', fontWeight: 400, color: '#111', margin: '0 0 0.35rem', letterSpacing: '-0.02em' }}>
                  {ART_FACILITATOR.name}
                </h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.86rem', color: '#374151', fontWeight: 400, margin: '0 0 1rem' }}>
                  {ART_FACILITATOR.title}
                </p>
                <p className="art-body-text" style={{ marginBottom: '1.25rem' }}>
                  {ART_FACILITATOR.approach}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {ART_FACILITATOR.specialisations.map((item) => (
                    <span key={item} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#374151', border: '1px solid rgba(15,118,110,0.18)', borderRadius: '100px', padding: '0.35rem 0.7rem', background: '#f7f9f7' }}>
                      {item}
                    </span>
                  ))}
                </div>
                <Link href={`/facilitators/${ART_FACILITATOR.slug}`} className="art-cta-outline">
                  Meet {ART_FACILITATOR.name.split(' ')[0]} →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          MID-PAGE CTA
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#0a1f1c', padding: '4rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '44rem', margin: '0 auto', padding: '0 2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 200, color: '#ffffff', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
            Want help choosing the right art retreat?
          </h3>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300, margin: '0 0 2rem', lineHeight: 1.7 }}>
            Talk with us directly — no forms, no commitment. Just a conversation about what you need.
          </p>
          <a href={`https://wa.me/919760446101?text=${encodeURIComponent('Hi, I\'m interested in your art retreats in the Himalayas. Can you help me choose the right format?')}`} className="art-cta-btn" target="_blank" rel="noopener noreferrer">
            Check Dates & Starting Price →
          </a>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '1rem' }}>
            Dates · Starting price · Format guidance
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7.5 — TESTIMONIALS (SOCIAL PROOF)
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="art-wide">
          <div className="art-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Guest Stories</span>
            <span className="art-eyebrow-line" />
          </div>
          <h2 className="art-section-title" style={{ textAlign: 'center' }}>Real <span>retreat experiences</span></h2>
          <div className="art-test-grid" style={{ marginTop: '3rem' }}>
            {ART_TESTIMONIALS.map((t, i) => (
              <div key={i} className="art-test-card">
                <p className="art-test-quote">&ldquo;{t.text}&rdquo;</p>
                <div className="art-test-author">
                  <span className="art-test-avatar">{t.name[0]}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', fontWeight: 400, color: '#222', margin: 0 }}>{t.name}</p>
                    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.7rem', fontWeight: 300, color: '#888', margin: 0 }}>{t.retreat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8 — GALLERY
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="art-inner">
          <div className="art-eyebrow">
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Moments</span>
          </div>
          <h2 className="art-section-title">From our <span>retreats</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
            {artAndCreativeRetreat.galleryImages.map((img, i) => (
              <div key={i} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '240px' }}>
                <Image src={img.src} alt={img.alt} fill loading="lazy" quality={55} sizes="(max-width: 600px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8.5 — FAQ
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="art-inner">
          <div className="art-eyebrow">
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Common Questions</span>
          </div>
          <h2 className="art-section-title">Frequently asked <span>questions</span></h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 9 — BOTTOM CTA
      ═══════════════════════════════════════════ */}
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        position: 'relative', overflow: 'hidden',
        minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/location/mussoorie.webp" alt="Mountain retreat setting" loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.85)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '44rem', padding: '4rem 2rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 200,
            color: '#ffffff', margin: '0 0 1rem', letterSpacing: '-0.02em',
          }}>
            Ready to plan your creative retreat?
          </h2>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', fontWeight: 300, lineHeight: 1.75, margin: '0 0 2rem' }}>
            No fixed dates. No rigid schedules. We design each retreat around you — your time, your medium, your intention. The mountains are always ready.
          </p>
          <a href={`https://wa.me/919760446101?text=${encodeURIComponent('Hi, I want to book an art retreat in the Himalayas. Can we discuss dates and options?')}`} className="art-cta-btn" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', padding: '1rem 2.5rem' }}>
            Check Art Retreat Dates →
          </a>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {['Small groups', 'No fixed dates', 'Fully custom'].map((trust) => (
              <span key={trust} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400, letterSpacing: '0.05em' }}>
                {trust}
              </span>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
