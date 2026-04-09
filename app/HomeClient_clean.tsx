'use client';
import { useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { LocationId } from '@/config/locations';
import { logIntentClick, logWhatsAppOpen } from '@/lib/analytics';
import { getAllRetreatServices } from '@/content/retreats/services';
import { getAllTreks } from '@/lib/treks';
import Image from 'next/image';
import { images } from '@/lib/images';
import { CardImage } from '@/components/images';

interface Location {
  id: LocationId;
  name: string;
  tagline: string;
}

interface HomeClientProps {
  locations: Location[];
}

// Lazy-load below-the-fold content
const BelowFoldHomeContent = dynamic(
  () => import('@/components/BelowFoldHomeContent'),
  { ssr: false, loading: () => null }
);

export default function HomeClient({ locations }: HomeClientProps) {
  const whatsappMessage = `Hi, I'm interested in learning more about your Himalayan journeys.`;
  const whatsappLink = `https://wa.me/919760446101?text=${encodeURIComponent(whatsappMessage)}`;



// ── Scroll fade-in observer ──
useEffect(() => {
  const els = document.querySelectorAll('.scroll-fade, .scroll-fade-stagger');
  if (!els.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sf-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  els.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}, []);

  const intentOptions = [
    {
      key: 'deep-rest',
      title: 'Deep Rest & Renewal',
      description: 'For those who have been running too long.',
    },
    {
      key: 'clarity',
      title: 'Clarity & Emotional Reset',
      description: 'When you need to see what comes next.',
    },
    {
      key: 'threshold',
      title: 'Threshold & Transformation',
      description: 'For those ready to cross into something new.',
    },
    {
      key: 'spiritual',
      title: 'Spiritual Grounding',
      description: 'Connection to practice, tradition, and earth.',
    },
  ];

  return (
    <div>

      {/* SECTION 1: HERO — THE INVITATION */}
<section style={{
  position: 'relative',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'flex-end',
  overflow: 'hidden',
  marginBottom: '6rem',
}}>
  <style>{`
  
    .hh-overlay {
  position: absolute; inset: 0; z-index: 1;
  background:
    linear-gradient(
      105deg,
      rgba(2,8,2,0.75) 0%,
      rgba(2,8,2,0.45) 45%,
      rgba(2,8,2,0.05) 100%
    ),
    linear-gradient(
  to top,
  rgba(2,6,2,0.70) 0%,
  rgba(2,6,2,0.35) 28%,
  rgba(2,6,2,0.05) 60%,
  transparent 100%
);

}/* ── Scroll Fade-in ── */           ← phir yahan daalo bahar
.scroll-fade {
  
  transform: translateY(26px);
  transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1),
              transform 0.75s cubic-bezier(0.22,1,0.36,1);
}
.scroll-fade.sf-visible {
  opacity: 1;
  transform: translateY(0);
}
.scroll-fade-stagger > * {
  
  transform: translateY(22px);
  transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
              transform 0.65s cubic-bezier(0.22,1,0.36,1);
}
.scroll-fade-stagger.sf-visible > *:nth-child(1) { transition-delay: 0.00s; opacity: 1; transform: translateY(0); }
.scroll-fade-stagger.sf-visible > *:nth-child(2) { transition-delay: 0.08s; opacity: 1; transform: translateY(0); }
.scroll-fade-stagger.sf-visible > *:nth-child(3) { transition-delay: 0.16s; opacity: 1; transform: translateY(0); }
.scroll-fade-stagger.sf-visible > *:nth-child(4) { transition-delay: 0.24s; opacity: 1; transform: translateY(0); }
.scroll-fade-stagger.sf-visible > *:nth-child(5) { transition-delay: 0.32s; opacity: 1; transform: translateY(0); }
.scroll-fade-stagger.sf-visible > *:nth-child(6) { transition-delay: 0.40s; opacity: 1; transform: translateY(0); }
.scroll-fade-stagger.sf-visible > *:nth-child(7) { transition-delay: 0.48s; opacity: 1; transform: translateY(0); }
.scroll-fade-stagger.sf-visible > *:nth-child(8) { transition-delay: 0.56s; opacity: 1; transform: translateY(0); }
    .hh-content {
      position: relative; z-index: 2;
      width: 100%; max-width: 820px;
      padding: clamp(2rem,6vw,5rem) clamp(1.5rem,6vw,5rem) clamp(3.5rem,10vh,6rem);
    }
    .hh-eyebrow {
      display: flex; align-items: center; gap: 0.75rem;
      margin-bottom: 1.75rem;
       animation: hhFadeUp 0.7s ease 0.1s forwards;
    }
    .hh-eyebrow-line {
      width: 28px; height: 1px;
      background: var(--color-primary);
      transform: scaleX(0);
      transform-origin: left;
      will-change: transform, opacity;
      animation: hhLineGrow 0.9s ease 0.3s forwards;
    }
    @keyframes hhLineGrow {
      from { transform: scaleX(0);  }
      to   { transform: scaleX(1); opacity: 1; }
    }
    .hh-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem; letter-spacing: 0.32em; text-transform: uppercase;
      color: rgba(255,255,255,0.4); font-weight: 500;
    }
    .hh-heading {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(3rem, 7vw, 6rem);
      font-weight: 200; line-height: 1.02;
      letter-spacing: -0.04em; color: #f5f0e8;
      margin: 0 0 1.25rem;
      overflow: hidden;
    }
    .hh-heading-line {
      display: block; overflow: hidden;
    }
    .hh-heading-line span {
      display: block;
      
      transform: translateY(100%);
      animation: hhSlideUp 0.75s cubic-bezier(0.22,1,0.36,1) forwards;
    }
    .hh-heading-line:nth-child(1) span { animation-delay: 0.28s; }
    .hh-heading-line:nth-child(2) span { animation-delay: 0.42s; }
    @keyframes hhSlideUp {
      from {  transform: translateY(100%); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .hh-sub1 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1rem, 1.6vw, 1.2rem);
      font-weight: 300; line-height: 1.7;
      color: rgba(230,220,200,0.85);
      margin: 0 0 0.75rem;
       animation: hhFadeUp 0.8s ease 0.65s forwards;
    }
    .hh-sub2 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(0.88rem, 1.3vw, 0.95rem);
      font-weight: 300; line-height: 1.65;
      color: rgba(210,200,180,0.6);
      max-width: 480px; margin: 0 0 2.75rem;
       animation: hhFadeUp 0.8s ease 0.78s forwards;
    }
    .hh-word {
      display: inline-block;
      
      transform: translateY(8px);
      animation: hhWordIn 0.4s ease forwards;
    }
    @keyframes hhWordIn {
      to { opacity: 1; transform: translateY(0); }
    }
    .hh-btns {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      
      animation: hhFadeUp 0.7s ease 0.95s forwards;
    }
    .hh-btn {
      display: inline-flex; align-items: center; gap: 0.6rem;
      padding: 15px 32px;
      background: var(--color-primary); color: #ffffff;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.62rem; font-weight: 600;
      letter-spacing: 0.2em; text-transform: uppercase;
      border-radius: 4px; text-decoration: none;
      position: relative; overflow: hidden;
      transition: transform 0.18s, box-shadow 0.22s;
    }
    .hh-btn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%);
      transform: translateX(-100%);
      transition: transform 0.5s ease;
    }
    .hh-btn:hover::before { transform: translateX(100%); }
    .hh-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 40px rgba(15,118,110,0.45);
    }
    .hh-btn-wa {
      display: inline-flex; align-items: center; gap: 0.6rem;
      padding: 15px 32px;
      background: transparent;
      border: 1px solid rgba(255,255,255,0.25);
      color: #ffffff;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.62rem; font-weight: 600;
      letter-spacing: 0.2em; text-transform: uppercase;
      border-radius: 4px; text-decoration: none;
      transition: transform 0.18s, background 0.22s, border-color 0.22s;
    }
    .hh-btn-wa:hover {
      transform: translateY(-2px);
      background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.45);
    }
    @keyframes hhFadeUp {
      from {  transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .hh-scroll {
      position: absolute; bottom: 2.5rem; left: 50%;
      transform: translateX(-50%);
      z-index: 4;
      display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
       animation: hhFadeUp 0.8s ease 1.4s forwards;
    }
    .hh-scroll-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.5rem; letter-spacing: 0.25em; text-transform: uppercase;
      color: rgba(255,255,255,0.3);
    }
    .hh-scroll-line {
      width: 1px; height: 32px;
      background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent);
      animation: hhScrollPulse 2s ease-in-out 1.6s infinite;
    }
    @keyframes hhScrollPulse {
      0%, 100% {  transform: scaleY(1); }
      50%       { transform: scaleY(1.15); }
    }
    @media (max-width: 700px) {
      .hh-scroll { display: none; }
      .hh-btns { flex-direction: column; }
      .hh-btn, .hh-btn-wa { text-align: center; justify-content: center; }
    }
  `}</style>

  {/* Hero Poster — LCP element, present in initial HTML */}
  <Image
     src={images.heroes.himalayanSunrise.src}
    alt="Himalayan mountain landscape"
    fill
    priority
    fetchPriority="high"
    sizes="100vw"
    quality={60}
    loading="eager"
    decoding="async"
    style={{
      objectFit: 'cover',
      objectPosition: 'center',
      filter: 'brightness(0.82) saturate(1.1)',
    }}
  />



  {/* Overlay a */}
  <div className="hh-overlay" />

  {/* Content */}
  <div className="hh-content">
    <div className="hh-eyebrow">
      <span className="hh-eyebrow-line" />
      <span className="hh-eyebrow-text">Himalayan Retreats &amp; Treks</span>
    </div>

    <h2 className="hh-heading">
      <span className="hh-heading-line"><span>Journeys into</span></span>
      <span className="hh-heading-line"><span>the Himalayas</span></span>
    </h2>

    <p className="hh-sub1">
      For rest, clarity, and inner reset.
    </p>

    <p className="hh-sub2" id="hh-sub2-text" suppressHydrationWarning>
      Retreats and treks across carefully chosen Himalayan landscapes. Designed around your intention, not fixed schedules.
    </p>

    {/* Buttons */}
    <div className="hh-btns">
      <Link href="/retreats" className="hh-btn">
        Plan My Retreat
      </Link>
      
       <a href="https://wa.me/919760446101?text=Hi%2C%20I%20want%20to%20plan%20a%20custom%20retreat."
        target="_blank"
        rel="noopener noreferrer"
        className="hh-btn-wa"
      >
        💬 WhatsApp Now
      </a>
    </div>
  </div>

  {/* JS — word-by-word sub2 only — deferred to idle time */}
  <script dangerouslySetInnerHTML={{ __html: `
    (function() {
      var run = function() {
        var el = document.getElementById('hh-sub2-text');
        if (el) {
          var words = el.innerText.split(' ');
          el.innerHTML = words.map(function(w, i) {
            return '<span class="hh-word" style="animation-delay:' + (0.82 + i * 0.055) + 's">' + w + '\u00a0</span>';
          }).join('');
        }
      };
      if ('requestIdleCallback' in window) {
        requestIdleCallback(run);
      } else {
        setTimeout(run, 1);
      }
    })();
  `}} />
</section>
<main>

   {/* SECTION 2: THE PHILOSOPHY */}
<section style={{ position: 'relative', marginBottom: '0', marginTop: '-4rem', background: '#faf8f4', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
  <style>{`
    @keyframes fadeUp {
      from {  transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes growX {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }

    .ph-header {
      max-width: 78rem;
      margin: 0 auto;
      padding: 5rem 5rem 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: flex-end;
      animation: fadeUp 0.6s ease 0.1s both;
    }
    .ph-eyebrow {
      display: flex; align-items: center; gap: 0.9rem;
      margin-bottom: 1.5rem;
    }
    .ph-eyebrow-line {
      width: 36px; height: 1px;
      background: var(--color-primary);
      transform-origin: left;
      animation: growX 0.6s ease 0.2s both;
    }
    .ph-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: #374151;
      font-weight: 500;
    }
    .ph-headline {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(3rem, 5.5vw, 5rem);
      font-weight: 200;
      line-height: 0.95;
      letter-spacing: -0.04em;
      color: #1a1814;
      margin: 0;
    }
    .ph-headline-accent {
      display: block;
      font-weight: 200;
      color: #374151;
    }
    .ph-intro {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem;
      line-height: 1.9;
      color: var(--color-muted);
      font-weight: 300;
      max-width: 360px;
      align-self: flex-end;
      padding-bottom: 0.4rem;
    }

    .ph-rule {
      max-width: 78rem;
      margin: 3.5rem auto 0;
      padding: 0 5rem;
    }
    .ph-rule-inner {
      height: 1px;
      background: linear-gradient(to right, var(--color-primary) 80px, var(--color-border) 80px);
      animation: fadeUp 0.5s ease 0.25s both;
    }

    .ph-cards-wrap {
      max-width: 78rem;
      margin: 0 auto;
      padding: 0 5rem;
    }
    .ph-cards {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      animation: fadeUp 0.6s ease 0.35s both;
    }

    .ph-card {
      padding: 3.5rem 2.5rem;
      border-right: 1px solid var(--color-border);
      cursor: default;
      transition: background 0.35s ease;
      position: relative;
      overflow: hidden;
    }
    .ph-card:last-child { border-right: none; }
    .ph-card:first-child { padding-left: 0; }
    .ph-card:hover { background: rgba(15,118,110,0.03); }

    /* Green top reveal */
    .ph-card-line {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: var(--color-primary);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
    }
    .ph-card:hover .ph-card-line { transform: scaleX(1); }

    /* Icon box */
    .ph-card-icon-box {
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 8px;
      background: rgba(15,118,110,0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.75rem;
      transition: background 0.3s;
    }
    .ph-card:hover .ph-card-icon-box {
      background: rgba(15,118,110,0.15);
    }

    /* Big faint number */
    .ph-card-num {
  font-family: var(--font-geist-sans), sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #374151;
  opacity: 1;
  display: block;
  margin-bottom: 0.6rem;
}

    .ph-card-title {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: #1a1814;
      margin-bottom: 1rem;
      transition: opacity 0.3s;
      line-height: 1.3;
    }

    .ph-card-body {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.87rem;
      line-height: 1.9;
      color: var(--color-muted);
      font-weight: 300;
      transition: color 0.35s;
      margin: 0;
    }
    .ph-card:hover .ph-card-body { color: #3a3428; }

    .ph-bottom-spacer { padding-bottom: 4rem; }

    @media (max-width: 900px) {
      .ph-header { grid-template-columns: 1fr; padding: 3.5rem 2rem 0; gap: 1.5rem; }
      .ph-rule { padding: 0 2rem; }
      .ph-cards-wrap { padding: 0 2rem; }
      .ph-cards { grid-template-columns: 1fr; }
      .ph-card {
        border-right: none;
        border-bottom: 1px solid var(--color-border);
        padding: 2.5rem 0;
      }
      .ph-card:last-child { border-bottom: none; }
    }
  `}</style>

  {/* Header section*/}
  <div className="ph-header">
    <div>
      <div className="ph-eyebrow">
        <span className="ph-eyebrow-line" />
        <span className="ph-eyebrow-text">Our Approach</span>
      </div>
      <h2 className="ph-headline">
        How We
        <span className="ph-headline-accent">Work</span>
      </h2>
    </div>
    <p className="ph-intro">
      Every journey begins with a conversation — not a checkout page.
      We take time to understand what you&apos;re really looking for before suggesting anything.
    </p>
  </div>

  {/* Rule */}
  <div className="ph-rule">
    <div className="ph-rule-inner" />
  </div>

  {/* Cards */}
  <div className="ph-cards-wrap">
    <div className="ph-cards scroll-fade-stagger">
      {[
        {
          n: '01',
          title: 'Designed Around You',
          icon: (
            <svg width="20" height="20" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
          ),
          body: "We don't run fixed events or fixed schedules. We design journeys around what you're actually seeking — whether that's stillness, challenge, or transformation.",
        },
        {
          n: '02',
          title: 'Locations With Purpose',
          icon: (
            <svg width="20" height="20" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M8 3L4 8l8 13 8-13-4-5H8z"/><path d="M4 8h16M12 21V8M8 3l4 5 4-5"/>
            </svg>
          ),
          body: 'Each Himalayan location is chosen deliberately — for its landscape, its silence, and its medicine. Not for convenience. Not for trend.',
        },
        {
          n: '03',
          title: 'Conversation First',
          icon: (
            <svg width="20" height="20" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          ),
          body: 'Your journey takes shape in dialogue, not forms. We listen before we suggest — because the right retreat may not be the first one you imagine.',
        },
      ].map((c, i) => (
        <div key={i} className="ph-card" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
          <div className="ph-card-line" />

          {/* Icon box top */}
          <div className="ph-card-icon-box">
            {c.icon}
          </div>

          {/* Number */}
          <span className="ph-card-num">{c.n}</span>

          {/* Title */}
          <div className="ph-card-title">{c.title}</div>

          {/* Body */}
          <p className="ph-card-body">{c.body}</p>
        </div>
      ))}
    </div>
  </div>

  <div className="ph-bottom-spacer" />
</section>

      {/* SECTION 3-11: BELOW-THE-FOLD (LAZY LOADED) */}
      <BelowFoldHomeContent locations={locations} />
    </main>
     </div>
  );
}