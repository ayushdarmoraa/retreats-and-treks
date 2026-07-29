import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import ArtFixedDepartures from '@/components/ArtFixedDepartures';
import { images } from '@/lib/images';
import { getFacilitatorsByRetreat } from '@/config/facilitators';
import { artAndCreativeRetreat } from '@/content/retreats/art-and-creative';
import { trekAndPaintRetreat } from '@/content/retreats/trek-and-paint';
import { weekendArtRetreat } from '@/content/retreats/weekend-art-retreat';

export const dynamic = 'force-static';

const PATH = '/retreats/art';
const ART_FACILITATOR = getFacilitatorsByRetreat('art-and-creative')[0];

const CHAITRA_ART_GALLERY = [
  images.chaitraArtRetreat.riversideSetup,
  images.chaitraArtRetreat.mountainSession,
  images.chaitraArtRetreat.indoorWorkshop,
  images.chaitraArtRetreat.eveningReflection,
  images.chaitraArtRetreat.groupPaintings,
  images.chaitraArtRetreat.outdoorEaselPainting,
  images.chaitraArtRetreat.gardenCanvasPainting,
];

export function generateMetadata(): Metadata {
  return {
    title: 'Art Retreats in the Himalayas | Retreats And Treks',
    description:
      'Art retreats in India with painting, writing, movement, and yoga in the Himalayas. Small groups, real guidance, and no experience needed.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    openGraph: {
      title: 'Art Retreats in the Himalayas | Retreats And Treks',
      description: 'Art retreats in India with painting, writing, movement, and yoga in the Himalayas. Small groups, real guidance, and no experience needed.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages('Art Retreats in the Himalayas | Retreats And Treks'),
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
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Art Retreats' },
        ]}
      />

      <style>{`
        .art-shell { width: 100vw; margin-left: calc(-50vw + 50%); }
        .art-outer { max-width: 72rem; margin: 0 auto; padding: 0 1.5rem; }
        .art-inner { max-width: 56rem; margin: 0 auto; padding: 0 1.5rem; }
        .art-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .art-eyebrow-line { width: 28px; height: 1px; background: rgba(15,118,110,0.35); flex-shrink: 0; }
        .art-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.72rem; letter-spacing: 0.28em; text-transform: uppercase; color: #6b7280; font-weight: 600; }
        .art-section-title { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.75rem, 3vw, 2.35rem); font-weight: 200; letter-spacing: -0.03em; color: #111; line-height: 1.1; margin: 0 0 1rem; }
        .art-section-title span { color: #0f766e; font-weight: 200; }
        .art-body-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #5f6b72; font-weight: 300; margin: 0; }

        /* ── Shared card: elevated, with a top accent line that reveals on
           hover. Enhancing this one rule lifts every card section on the
           page (why-it-works, outcomes, retreats, guides, testimonials). ── */
        .art-card {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(15,31,28,0.05);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .art-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: #0f766e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
          z-index: 2;
        }
        .art-card:hover {
          transform: translateY(-6px);
          border-color: rgba(15,118,110,0.28);
          box-shadow: 0 22px 48px rgba(15,31,28,0.12);
        }
        .art-card:hover::before { transform: scaleX(1); }

        /* ── Image zoom-on-hover, applied to thumbnails inside cards ── */
        .art-thumb-img {
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1) !important;
        }
        .art-card:hover .art-thumb-img,
        .art-loc-card:hover .art-thumb-img {
          transform: scale(1.06);
        }

        .art-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.95rem 2.2rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.22); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .art-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.3); }
        .art-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.82rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-geist-sans), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .art-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }
        .art-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
        .art-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; }
        @media (max-width: 900px) { .art-grid-3 { grid-template-columns: repeat(2, minmax(0,1fr)); } .art-grid-2 { grid-template-columns: 1fr; } .art-facilitator-card { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .art-grid-3 { grid-template-columns: 1fr; } .art-outer, .art-inner { padding-left: 1.25rem; padding-right: 1.25rem; } }

        /* ── Hero background: slow, subtle Ken Burns zoom for a cinematic
           feel instead of a static photo ── */
        @keyframes art-hero-zoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        .art-hero-bg { animation: art-hero-zoom 24s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .art-hero-bg { animation: none; } }

        /* ── Location card wrapper needs the same overflow/position setup
           as .art-card so the image-zoom rule above can clip correctly ── */
        .art-loc-card { position: relative; overflow: hidden; transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease; }
        .art-loc-card:hover { transform: translateY(-5px); box-shadow: 0 20px 44px rgba(10,31,28,0.28); }

        /* ── Timeline dot: soft glow ring for a touch more polish ── */
        .art-timeline-dot { box-shadow: 0 0 0 4px rgba(15,118,110,0.08); }

        /* ── Feature grid: 2 columns so 3/4 items resolve cleanly (no lone
           orphan card stretched or stranded), with numbered accent badges ── */
        .art-feature-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
        }
        .art-feature-card {
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 16px;
          padding: 2rem 2rem 1.9rem;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
        }
        .art-feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: #0f766e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .art-feature-card:hover {
          transform: translateY(-6px);
          border-color: rgba(15,118,110,0.28);
          box-shadow: 0 22px 48px rgba(15,31,28,0.1);
        }
        .art-feature-card:hover::before { transform: scaleX(1); }
        .art-feature-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(15,118,110,0.3);
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          color: #0f766e;
          margin-bottom: 1.1rem;
        }
        .art-feature-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #111;
          margin: 0 0 0.6rem;
          letter-spacing: -0.01em;
        }
        @media (max-width: 720px) {
          .art-feature-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="art-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f3f0', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="art-hero-bg" src="/Images/art-retreat/category-hero.webp" alt="Art retreats in the Himalayas" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(5,15,8,0.8) 0%, rgba(5,15,8,0.5) 45%, rgba(5,15,8,0.75) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '56rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.55)' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.72rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Art & Creativity</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.55)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 200, letterSpacing: '-0.04em', color: 'white', margin: '0 0 1rem', lineHeight: 1.05, textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}>
            Art retreats in the Himalayas
          </h1>
          <p style={{ maxWidth: '42rem', margin: '0 auto 2rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1rem', fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.84)' }}>
            Emotional healing through painting, writing, movement and yoga — no experience needed. Small groups. Real guidance. Mountain silence.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['From ₹14,000', 'Materials Included', 'No Experience Needed', '2–7 Days'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.86)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '999px', padding: '0.42rem 0.85rem', background: 'rgba(255,255,255,0.08)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in your art retreats in the Himalayas. Can you tell me more?")}`} className="art-cta-btn" target="_blank" rel="noopener noreferrer">Check Dates & Starting Price</a>
            <a href="#retreats" className="art-cta-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.28)' }}>Compare Art Retreats</a>
          </div>
        </div>
      </section>

      <section className="art-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="art-inner">
          <div className="art-eyebrow">
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Understanding Art Retreats</span>
          </div>
          <h2 className="art-section-title">What is a Himalayan <span>art retreat</span>?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p className="art-body-text">An art retreat is a structured period of creative immersion — typically 2 to 7 days — where you step away from daily life to focus entirely on creative expression. Unlike art classes, the goal is not technical mastery. It is reconnection with your own creative voice.</p>
            <p className="art-body-text">In the Himalayas, art retreats take on a different character. Mountain silence, forest light, and the sheer scale of the landscape become active participants in your creative process. Many participants discover that their most authentic work emerges not from instruction, but from the combination of creative space, nature, and stillness.</p>
            <p className="art-body-text">Our art retreats use multiple mediums — painting, writing, collage, movement, and music — as doorways to emotional truth and creative reconnection. No experience is needed. No talent is required. Only curiosity and a willingness to create without judgment.</p>
          </div>
        </div>
      </section>

      <section className="art-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="art-inner">
          <div className="art-eyebrow">
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Why It Works</span>
          </div>
          <h2 className="art-section-title">Why Himalayan art retreats <span>heal</span></h2>
          <p className="art-body-text" style={{ marginBottom: '2.5rem' }}>This is not an art class. It is a healing container where creativity is the modality — and the Himalayas are the co-facilitator.</p>
          <div className="art-feature-grid">
            {artAndCreativeRetreat.whatMakesItUnique!.points.map((point, index) => (
              <div key={index} className="art-feature-card">
                <span className="art-feature-num">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="art-feature-title">{point.title}</h3>
                <p className="art-body-text">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="art-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="art-outer">
          <div className="art-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Creative Outcomes</span>
            <span className="art-eyebrow-line" />
          </div>
          <h2 className="art-section-title" style={{ textAlign: 'center' }}>What you’ll create and <span>take home</span></h2>
          <p className="art-body-text" style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto 2.5rem' }}>You do not come here to make perfect art. You come to make honest work — and leave with physical reminders of what opened during the retreat.</p>
          <div className="art-grid-3">
            {[
              { title: 'A personal creative portfolio', text: 'In the Creative Healing format, everything you make is yours. You leave with paintings, writing, collage, or mixed-media work that reflects a real moment of expression.' },
              { title: 'A visual journal of the mountains', text: 'In Trek & Paint, each trail and viewpoint becomes part of your journal — sketches, watercolours, notes, and landscape studies made from direct experience.' },
              { title: 'Materials, prompts, and a practice to continue', text: 'Basic art materials are provided, and the retreat rhythm gives you prompts, techniques, and creative rituals you can carry back into everyday life.' },
            ].map((item) => (
              <div key={item.title} className="art-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.95rem', fontWeight: 600, color: '#111', margin: '0 0 0.7rem' }}>{item.title}</h3>
                <p className="art-body-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="retreats" className="art-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="art-outer">
          <div className="art-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Choose Your Retreat</span>
            <span className="art-eyebrow-line" />
          </div>
          <h2 className="art-section-title" style={{ textAlign: 'center' }}>Our art <span>retreats</span></h2>
          <p className="art-body-text" style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto 2.5rem' }}>Three formats, one promise: authentic creative expression in the Himalayan mountains. Choose the retreat that matches your time and intention.</p>
          <div className="art-grid-3">
            {RETREATS.map((retreat) => (
              <Link key={retreat.slug} href={retreat.href} className="art-card" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <Image className="art-thumb-img" src={retreat.image} alt={retreat.title} width={800} height={533} loading="lazy" quality={55} sizes="(max-width: 640px) 100vw, 33vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,31,28,0.7), transparent 55%)' }} />
                  <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#0f766e', color: 'white', padding: '0.35rem 0.65rem', borderRadius: '999px', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{retreat.format}</span>
                </div>
                <div style={{ padding: '1.35rem 1.35rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  <p style={{ margin: 0, fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#6b7280' }}>{retreat.duration}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.05rem', fontWeight: 500, color: '#111' }}>{retreat.title}</h3>
                    <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.84rem', fontWeight: 600, color: '#111' }}>{retreat.price}</span>
                  </div>
                  <p className="art-body-text">{retreat.outcome}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.3rem' }}>
                    {retreat.keyHighlights.map((tag) => (
                      <span key={tag} style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0f766e', background: 'rgba(15,118,110,0.08)', padding: '0.3rem 0.55rem', borderRadius: '999px' }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: '0.6rem', paddingTop: '0.9rem', borderTop: '1px solid rgba(15,118,110,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                    <div>
                      <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#d97706' }}>{retreat.nextBatch}</div>
                      <div style={{ fontSize: '0.68rem', color: '#6b7280' }}>Only {retreat.seats} seats total</div>
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0f766e' }}>View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ArtFixedDepartures />

      <section className="art-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
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
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1.8rem 1fr', gap: '0 1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span className="art-timeline-dot" style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff', border: '2px solid #0f766e', marginTop: '0.35rem', zIndex: 1 }} />
                  {idx < 3 && <span style={{ width: 1, flex: 1, background: 'linear-gradient(to bottom, rgba(15,118,110,0.3), rgba(15,118,110,0.05))', marginTop: 4, minHeight: '1.2rem' }} />}
                </div>
                <div style={{ paddingBottom: idx < 3 ? '1.5rem' : 0 }}>
                  <p style={{ margin: '0 0 0.35rem', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#374151' }}>{phase.time}</p>
                  <p className="art-body-text">{phase.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="art-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="art-outer">
          <div className="art-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Locations</span>
            <span className="art-eyebrow-line" />
          </div>
          <h2 className="art-section-title" style={{ textAlign: 'center' }}>Where we host art <span>retreats</span></h2>
          <p className="art-body-text" style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto 2.5rem' }}>Each location brings a different creative energy. Mussoorie for aesthetic beauty. Chakrata for forest silence. Rishikesh for spiritual depth. Sankri for high-altitude wilderness. Zanskar for remote creative solitude.</p>
          <div className="art-grid-3">
            {LOCATIONS.map((loc) => (
              <Link key={loc.id} href={`/retreats/${loc.id}`} className="art-loc-card" style={{ position: 'relative', height: '260px', borderRadius: '16px', textDecoration: 'none', color: 'white', display: 'block' }}>
                <Image className="art-thumb-img" src={loc.image} alt={`${loc.name} art retreat location`} width={800} height={462} loading="lazy" quality={55} sizes="(max-width: 640px) 100vw, 33vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,31,28,0.75), rgba(10,31,28,0.2) 55%, transparent 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, padding: '1.3rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <h3 style={{ margin: '0 0 0.45rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.08rem', fontWeight: 500 }}>{loc.name}</h3>
                  <p style={{ margin: 0, fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>{loc.context}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="art-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="art-outer">
          <div className="art-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Plan Your Retreat</span>
            <span className="art-eyebrow-line" />
          </div>
          <h2 className="art-section-title" style={{ textAlign: 'center' }}>Choose your art retreat with <span>clarity</span></h2>
          <p className="art-body-text" style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto 2.5rem' }}>Explore practical guides, location advice, and deeper format pages before you decide which creative journey fits you best.</p>
          <div className="art-grid-3">
            {[
              { href: '/blog/best-himalayan-locations-for-art-retreat', title: 'Best Himalayan locations for art retreats', text: 'Compare the creative energy of Mussoorie, Chakrata, Rishikesh, Sankri, and other mountain settings.' },
              { href: '/blog/art-retreat-for-beginners', title: 'Art retreats for beginners', text: 'A gentle guide if you feel curious, blocked, or unsure because you do not consider yourself an artist.' },
              { href: '/blog/painting-in-the-himalayas', title: 'Painting in the Himalayas', text: 'Understand what plein air painting feels like when the trail, light, and mountain weather become part of the work.' },
              { href: '/creative-retreat', title: 'Creative retreat overview', text: 'A deeper supporting page for emotional healing through art, yoga, expression, and mountain stillness.' },
              { href: '/trek-and-paint-himalayas', title: 'Trek and paint in the Himalayas', text: 'Explore the active version of the art retreat for people who want walking, viewpoints, and visual journaling.' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="art-card" style={{ padding: '1.35rem', textDecoration: 'none', color: 'inherit' }}>
                <h3 style={{ margin: '0 0 0.65rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.95rem', fontWeight: 600, color: '#111' }}>{item.title}</h3>
                <p className="art-body-text">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {ART_FACILITATOR && (
        <section className="art-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
          <div className="art-outer">
            <div className="art-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="art-eyebrow-line" />
              <span className="art-eyebrow-text">Creative Facilitation</span>
              <span className="art-eyebrow-line" />
            </div>
            <h2 className="art-section-title" style={{ textAlign: 'center' }}>Who holds the <span>creative space</span></h2>
            <div
              style={{
                marginTop: '2rem',
                background: '#ffffff',
                border: '1px solid rgba(15,118,110,0.12)',
                borderRadius: '20px',
                boxShadow: '0 18px 44px rgba(15,31,28,0.08)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
                alignItems: 'stretch',
              }}
              className="art-facilitator-card"
            >
              {ART_FACILITATOR.image && (
                <div style={{ position: 'relative', width: '100%', minHeight: '280px', background: '#eef0ee' }}>
                  <Image src={ART_FACILITATOR.image.src} alt={ART_FACILITATOR.image.alt} width={800} height={800} loading="lazy" quality={70} sizes="(max-width: 720px) 100vw, 320px" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                </div>
              )}
              <div style={{ padding: '2.2rem 2.4rem' }}>
                <p style={{ margin: '0 0 0.7rem', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#374151' }}>{ART_FACILITATOR.yearsExperience} years experience</p>
                <h3 style={{ margin: '0 0 0.35rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.35rem', fontWeight: 500, color: '#111' }}>{ART_FACILITATOR.name}</h3>
                <p style={{ margin: '0 0 1rem', color: '#374151' }}>{ART_FACILITATOR.title}</p>
                <p className="art-body-text" style={{ marginBottom: '1.25rem' }}>{ART_FACILITATOR.approach}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginBottom: '1.25rem' }}>
                  {ART_FACILITATOR.specialisations.map((item) => (
                    <span key={item} style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#374151', border: '1px solid rgba(15,118,110,0.18)', borderRadius: '999px', padding: '0.35rem 0.7rem', background: '#f7f9f7' }}>{item}</span>
                  ))}
                </div>
                <Link href={`/facilitators/${ART_FACILITATOR.slug}`} className="art-cta-outline">Meet {ART_FACILITATOR.name.split(' ')[0]} →</Link>
              </div>
            </div>
          </div>
        </section>
      )}

     <section className="art-shell" style={{ position: 'relative', overflow: 'hidden', padding: '4rem 0', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="art-hero-bg" src="/Images/location/mussoorie.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 45%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,17,15,0.88) 0%, rgba(6,17,15,0.8) 60%, rgba(6,17,15,0.9) 100%)' }} />
        </div>
        <div style={{ position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(15,118,110,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '44rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <h3 style={{ margin: '0 0 0.8rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.25rem, 2.4vw, 1.7rem)', fontWeight: 200, color: 'white', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>Want help choosing the right art retreat?</h3>
          <p style={{ margin: '0 0 1.8rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.7)' }}>Talk with us directly — no forms, no commitment. Just a conversation about what you need.</p>
          <a href="/contact" className="art-cta-btn">Check Dates & Starting Price</a>
          <p style={{ marginTop: '1rem', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Dates · Starting price · Format guidance</p>
        </div>
      </section>

      <section className="art-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="art-outer">
          <div className="art-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Guest Stories</span>
            <span className="art-eyebrow-line" />
          </div>
          <h2 className="art-section-title" style={{ textAlign: 'center' }}>Real <span>retreat experiences</span></h2>
          <div className="art-grid-3" style={{ marginTop: '2rem' }}>
            {ART_TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="art-card" style={{ padding: '1.5rem' }}>
                <p style={{ margin: '0 0 1.1rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', lineHeight: 1.8, color: '#555', fontStyle: 'italic' }}>&ldquo;{testimonial.text}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ width: 38, height: 38, borderRadius: '50%', background: '#0f766e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>{testimonial.name[0]}</span>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>{testimonial.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>{testimonial.retreat}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="art-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="art-inner">
          <div className="art-eyebrow">
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Moments</span>
          </div>
          <h2 className="art-section-title">From Chaitra’s <span>art retreats</span></h2>
          <p className="art-body-text" style={{ marginBottom: '2rem' }}>Real creative spaces, art therapy sessions, reflection circles, and finished participant artwork from retreats guided by Chaitra Ram.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
            {CHAITRA_ART_GALLERY.map((image, index) => (
              <div key={image.src} style={{ position: 'relative', minHeight: index === 0 ? '420px' : '205px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 18px 48px rgba(15,31,28,0.08)', background: '#eef0ee' }}>
                <Image src={image.src} alt={image.alt} width={1200} height={800} loading="lazy" quality={70} sizes="(max-width: 600px) 100vw, 50vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="art-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="art-inner">
          <div className="art-eyebrow">
            <span className="art-eyebrow-line" />
            <span className="art-eyebrow-text">Common Questions</span>
          </div>
          <h2 className="art-section-title">Frequently asked <span>questions</span></h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      <section className="art-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '52vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/location/mussoorie.webp" alt="Mountain retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.86)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '44rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 200, color: 'white' }}>Ready to plan your creative retreat?</h2>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.72)' }}>No fixed dates. No rigid schedules. We design each retreat around you — your time, your medium, your intention. The mountains are always ready.</p>
          <a href={`https://wa.me/919760446101?text=${encodeURIComponent('Hi, I want to book an art retreat in the Himalayas. Can we discuss dates and options?')}`} className="art-cta-btn" target="_blank" rel="noopener noreferrer">Check Art Retreat Dates</a>
        </div>
      </section>
    </TrackedPage>
  );
}
