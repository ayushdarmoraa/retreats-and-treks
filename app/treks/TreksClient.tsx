'use client';

import { useState, useMemo, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllTreks, getTreksGroupedByLocation } from '@/lib/treks';
import { getAllLocations } from '@/lib/locations';

/* ── Image mappings ── */
const trekImageMap: Record<string, string> = {
  'weekend-trek': '/Images/trek/region/chakraweekend.webp',
  'tiger-fall-trek': '/Images/trek/region/tigerfall.webp',
  'budher-caves-trek': '/Images/trek/region/budher.webp',
  'guided-treks': '/Images/trek/region/chakraguided.webp',
  'kedarkantha-trek': '/Images/trek/region/kedarkantha-summit.webp',
  'har-ki-dun-trek': '/Images/trek/region/harkidun-valley.webp',
  'khaliya-top-trek': '/Images/trek/region/Khaliya.webp',
  'milam-glacier-trek': '/Images/trek/region/milamglacier.webp',
  'brahmatal-trek': '/Images/trek/region/brahmatal-lake.webp',
  'roopkund-trek': '/Images/trek/region/roopkund_lake.webp',
  'kuari-pass-trek': '/Images/trek/region/kuari.webp',
  'pangarchulla-trek': '/Images/trek/region/pangarchulla.webp',
  'dayara-bugyal-trek': '/Images/trek/region/garhwal.webp',
};

const locationImageMap: Record<string, string> = {
  chakrata: '/Images/location/chakrata.webp',
  sankri: '/Images/location/sankri.webp',
  munsiyari: '/Images/location/munsiyari.webp',
  lohajung: '/Images/location/lohajung.webp',
  joshimath: '/Images/location/joshimath.webp',
  barsu: '/Images/trek/region/garhwal.webp',
  zanskar: '/Images/location/zanskar.webp',
};

/* ── SEO alt text ── */
const trekAltMap: Record<string, string> = {
  'weekend-trek': 'Chakrata Weekend Trek in Chakrata, Uttarakhand',
  'tiger-fall-trek': 'Tiger Fall Trek in Chakrata, Uttarakhand',
  'budher-caves-trek': 'Budher Caves Trek in Chakrata, Uttarakhand',
  'guided-treks': 'Guided Treks in Chakrata, Uttarakhand',
  'kedarkantha-trek': 'Kedarkantha Trek in Sankri, Uttarakhand',
  'har-ki-dun-trek': 'Har Ki Dun Trek in Sankri, Uttarakhand',
  'khaliya-top-trek': 'Khaliya Top Trek in Munsiyari, Uttarakhand',
  'milam-glacier-trek': 'Milam Glacier Trek in Munsiyari, Uttarakhand',
  'brahmatal-trek': 'Brahmatal Trek in Lohajung, Uttarakhand',
  'roopkund-trek': 'Roopkund Trek in Lohajung, Uttarakhand',
  'kuari-pass-trek': 'Kuari Pass Trek in Joshimath, Uttarakhand',
  'pangarchulla-trek': 'Pangarchulla Trek in Joshimath, Uttarakhand',
  'dayara-bugyal-trek': 'Dayara Bugyal Trek in Barsu, Uttarakhand',
};

const locationAltMap: Record<string, string> = {
  chakrata: 'Trekking trails near Chakrata, Uttarakhand',
  sankri: 'Sankri basecamp for Himalayan treks, Uttarakhand',
  munsiyari: 'Mountain views from Munsiyari, Uttarakhand',
  lohajung: 'Lohajung trekking basecamp, Uttarakhand',
  joshimath: 'Joshimath mountain town, Uttarakhand',
  barsu: 'Barsu village gateway to Dayara Bugyal, Uttarakhand',
  zanskar: 'Zanskar valley landscape, Ladakh',
};

/* ── Location micro-intros with internal links ── */
function LocationIntro({ locationId }: { locationId: string }): ReactNode {
  const intros: Record<string, ReactNode> = {
    chakrata: <>Just 4 hours from Dehradun, Chakrata offers forested trails, waterfalls, and cave treks at gentle altitudes. Ideal for <Link href="/treks/best-treks-in-uttarakhand/beginner" style={iLinkStyle}>first-time trekkers</Link> exploring Uttarakhand on a <Link href="/treks/3-day-treks-uttarakhand" style={iLinkStyle}>weekend getaway</Link>.</>,
    sankri: <>A remote Himalayan basecamp in the Tons Valley, Sankri is the gateway to <Link href="/treks/location/sankri/kedarkantha-trek" style={iLinkStyle}>Kedarkantha</Link> and <Link href="/treks/location/sankri/har-ki-dun-trek" style={iLinkStyle}>Har Ki Dun</Link> — two of Uttarakhand&apos;s most iconic multi-day treks.</>,
    munsiyari: <>Perched in the Kumaon Himalayas with views of the Panchachuli peaks, Munsiyari offers the <Link href="/treks/location/munsiyari/khaliya-top-trek" style={iLinkStyle}>Khaliya Top meadow trek</Link> and the challenging <Link href="/treks/location/munsiyari/milam-glacier-trek" style={iLinkStyle}>Milam Glacier approach</Link> for experienced trekkers.</>,
    lohajung: <>Located in the Garhwal Himalayas, Lohajung serves as the basecamp for <Link href="/treks/location/lohajung/brahmatal-trek" style={iLinkStyle}>Brahmatal</Link> and <Link href="/treks/location/lohajung/roopkund-trek" style={iLinkStyle}>Roopkund</Link> — known for frozen alpine lakes and high-altitude snow ridges.</>,
    joshimath: <>A historic mountain town at the confluence of multiple trekking corridors, Joshimath is the launchpad for <Link href="/treks/location/joshimath/kuari-pass-trek" style={iLinkStyle}>Kuari Pass</Link> and <Link href="/treks/location/joshimath/pangarchulla-trek" style={iLinkStyle}>Pangarchulla</Link> — two classic ridge treks in the Nanda Devi region.</>,
    barsu: <>A quiet village in the Garhwal Himalayas, Barsu is the starting point for the <Link href="/treks/location/barsu/dayara-bugyal-trek" style={iLinkStyle}>Dayara Bugyal trek</Link> — one of the most beautiful <Link href="/treks/above-4000m-treks-uttarakhand" style={iLinkStyle}>high-altitude meadows</Link> in India.</>,
  };
  if (!intros[locationId]) return null;
  return <p className="trk-cat-loc-intro">{intros[locationId]}</p>;
}

const iLinkStyle = { color: 'var(--color-primary)', textDecoration: 'none' as const, borderBottom: '1px solid rgba(15,118,110,0.2)' };

const difficultyColor = (difficulty: string) => {
  const d = difficulty.toLowerCase();
  if (d.includes('easy')) return { bg: 'rgba(15,118,110,0.07)', color: 'var(--color-primary)' };
  if (d.includes('challenging') || d.includes('hard')) return { bg: 'rgba(180,60,40,0.07)', color: '#b43c28' };
  return { bg: 'rgba(100,80,20,0.07)', color: '#7a6010' };
};

const FEATURED_SLUGS = ['kedarkantha-trek', 'brahmatal-trek', 'har-ki-dun-trek', 'kuari-pass-trek'];
const POPULAR_SLUGS = ['kedarkantha-trek', 'brahmatal-trek', 'roopkund-trek', 'har-ki-dun-trek', 'kuari-pass-trek', 'pangarchulla-trek'];

const TESTIMONIALS = [
  { name: 'Priya', trek: 'Kedarkantha Trek', text: 'Kedarkantha was my first winter trek. The snow, the summit sunrise — unforgettable. The guides made everything feel safe even at 12,500 ft. I came back a different person.' },
  { name: 'Arjun', trek: 'Brahmatal Trek', text: 'Did the Brahmatal trek last December. Frozen lake, clear skies, and the best campsite views I\'ve ever seen. Will come back for Har Ki Dun next.' },
  { name: 'Meera', trek: 'Chakrata Weekend Trek', text: 'We tried the Chakrata Weekend Trek as a family. Kids loved the forest trails. A perfect intro to Himalayan trekking without overdoing it.' },
];

const TESTIMONIAL_CONTEXT: Record<string, string> = {
  Priya: 'Winter · 6 Days · Moderate',
  Arjun: 'December · 5 Days · Moderate',
  Meera: 'October · 3 Days · Easy',
};

const FAQ_DATA = [
  { question: 'What is the best time to trek in Uttarakhand?', answer: 'The best months for trekking in Uttarakhand are March to June (spring/summer) and September to November (autumn). Winter treks like Kedarkantha and Brahmatal are popular from December to March for snow experiences. Monsoon months (July–August) are generally avoided due to landslide risks and trail closures.' },
  { question: 'Are beginner treks in the Himalayas safe?', answer: 'Yes. Beginner treks like the Chakrata Weekend Trek, Budher Caves Trek, and Khaliya Top Trek are designed with safety in mind. All our treks include experienced local mountain guides, small group sizes, and a safety-first approach with proper acclimatisation schedules and first-aid readiness.' },
  { question: 'What should I pack for a Himalayan trek?', answer: 'Essential items include layered clothing (base layer, insulation, waterproof shell), sturdy trekking shoes with ankle support, a 40–60L backpack, sunscreen, sunglasses, a headlamp, personal medications, and a refillable water bottle. For winter treks, add thermal innerwear, down jackets, and snow gaiters.' },
  { question: 'How difficult are Himalayan treks?', answer: 'Himalayan treks range from easy half-day walks to challenging multi-day expeditions above 4,000 m. Easy treks like Chakrata Weekend Trek require no prior experience. Moderate treks like Kedarkantha involve 5–6 hours of daily walking. Challenging treks like Roopkund demand strong fitness, prior trekking experience, and altitude readiness.' },
  { question: 'Do I need prior trekking experience?', answer: 'Not for beginner-level treks. Treks graded "Easy" are designed for first-time trekkers and require only basic fitness. For moderate and challenging treks, prior experience with multi-day walks and some altitude exposure is recommended. Our guides assess each group and adjust pacing accordingly.' },
  { question: 'Which trek is best for first-time trekkers?', answer: 'The Chakrata Weekend Trek is our top recommendation for first-timers. It is a 2-night, 3-day guided trek through gentle forested trails with no altitude concerns. For those wanting something slightly longer, the Khaliya Top Trek in Munsiyari offers beautiful meadow views at moderate altitude with full guide support.' },
  { question: 'Are guided treks necessary in the Himalayas?', answer: 'Strongly recommended, especially for first-time and moderate-level trekkers. Himalayan terrain involves unmarked trails, altitude risks, sudden weather changes, and areas with no mobile connectivity. Our local mountain guides know every trail condition, water source, and safe campsite — and they carry first-aid and emergency communication.' },
  { question: 'How should I prepare for high-altitude treks?', answer: 'Start building cardiovascular fitness at least 4–6 weeks before your trek. Include daily walks, stair climbing, and light jogging. For treks above 4,000 m like Roopkund or Pangarchulla, prior altitude exposure is helpful. On the trek itself, our guides enforce gradual altitude gain, proper hydration, and rest-day protocols to minimise altitude sickness risk.' },
];

/* ── Separator component ── */
function SectionSeparator() {
  return (
    <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', padding: '0.5rem 0', display: 'flex', justifyContent: 'center', background: 'transparent' }}>
      <span style={{ width: 48, height: 1, background: 'rgba(15,118,110,0.15)', display: 'block' }} />
    </div>
  );
}

export default function TreksClient() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver;
    const init = () => {
      const targets = document.querySelectorAll('.trk-featured, .trk-whofor, .trk-curated, .trk-experience, .trk-discovery, .trk-season, .trk-testimonials, .trk-expertise, .trk-faq, .trk-plan-cta, .trk-how');
      observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('trk-in-view'); observer.unobserve(e.target); } }),
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
      );
      targets.forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight) {
          el.classList.add('trk-fade');
          observer.observe(el);
        }
      });
    };
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(init, { timeout: 2000 });
      return () => { cancelIdleCallback(id); observer?.disconnect(); };
    } else {
      const tid = setTimeout(init, 500);
      return () => { clearTimeout(tid); observer?.disconnect(); };
    }
  }, []);

  const allTreks = getAllTreks();
  const treksGroupedByLocation = getTreksGroupedByLocation();
  const locations = getAllLocations();

  const featuredTreks = useMemo(() => FEATURED_SLUGS.map((s) => allTreks.find((t) => t.slug === s)).filter(Boolean) as typeof allTreks, [allTreks]);
  const popularTreks = useMemo(() => POPULAR_SLUGS.map((s) => allTreks.find((t) => t.slug === s)).filter(Boolean) as typeof allTreks, [allTreks]);

  const availableDifficulties = useMemo(() => {
    const d = new Set(allTreks.map((t) => {
      if (t.difficulty.includes('Moderate') && t.difficulty.includes('Easy')) return 'easy-moderate';
      if (t.difficulty === 'Easy') return 'easy';
      if (t.difficulty === 'Moderate') return 'moderate';
      if (t.difficulty === 'Challenging') return 'hard';
      return 'moderate';
    }));
    return Array.from(d).sort();
  }, [allTreks]);

  const availableDurations = useMemo(() => {
    const d = new Set(allTreks.map((t) => (t.duration.includes('Half day') || t.duration.includes('1 day') || t.duration.includes('2') || t.duration.includes('3')) ? 'weekend' : 'multiday'));
    return Array.from(d).sort();
  }, [allTreks]);

  const filterTreks = (treks: typeof allTreks) => treks.filter((trek) => {
    if (selectedDestination && trek.locationId !== selectedDestination) return false;
    if (selectedDifficulty) {
      const c = trek.difficulty.includes('Moderate') && trek.difficulty.includes('Easy') ? 'easy-moderate' : trek.difficulty === 'Easy' ? 'easy' : trek.difficulty === 'Moderate' ? 'moderate' : 'hard';
      if (c !== selectedDifficulty) return false;
    }
    if (selectedDuration) {
      const c = (trek.duration.includes('Half day') || trek.duration.includes('1 day') || trek.duration.includes('2') || trek.duration.includes('3')) ? 'weekend' : 'multiday';
      if (c !== selectedDuration) return false;
    }
    return true;
  });

  const filteredTreks = filterTreks(allTreks);
  const filteredByLocation = selectedDestination
    ? { [selectedDestination]: filterTreks(treksGroupedByLocation[selectedDestination] || []) }
    : Object.fromEntries(locations.map((loc: typeof locations[number]) => [loc.id, filterTreks(treksGroupedByLocation[loc.id] || [])]));
  const hasAnyTreks = filteredTreks.length > 0;

  const currentDate = new Date();
  const lastUpdated = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>

<style>{`
  /* ── SHARED ── */
  .trk-section-inner { max-width: 72rem; margin: 0 auto; padding: 0 var(--space-md, 1.5rem); }
  .trk-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
  .trk-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); flex-shrink: 0; display: inline-block; }
  .trk-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: #374151; }
  .trk-h2 { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200; letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2.5rem 0; }

  /* ── HERO ── */
  .trk-hero { width: 100vw; margin-left: calc(-50vw + 50%); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; min-height: 90vh; text-align: center; }
  .trk-hero-img-wrap { position: absolute; inset: 0; }
  .trk-hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 2rem; }
  .trk-hero-btn-primary { font-family: var(--font-geist-sans), sans-serif; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.95rem 2.25rem; background: #ffffff; color: #0a3d35; text-decoration: none; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; border-radius: 100px; border: 2px solid #ffffff; transition: background 0.25s, color 0.25s, transform 0.2s; }
  .trk-hero-btn-primary:hover { background: transparent; color: #ffffff; transform: translateY(-2px); }
  .trk-hero-btn-secondary { font-family: var(--font-geist-sans), sans-serif; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.95rem 2.25rem; background: transparent; color: rgba(255,255,255,0.85); text-decoration: none; font-size: 0.78rem; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; border-radius: 100px; border: 1.5px solid rgba(255,255,255,0.35); transition: border-color 0.25s, color 0.25s, transform 0.2s; }
  .trk-hero-btn-secondary:hover { border-color: rgba(255,255,255,0.8); color: #ffffff; transform: translateY(-2px); }
  /* ── HOW IT WORKS ── */
  .trk-how { width: 100vw; margin-left: calc(-50vw + 50%); background: #ffffff; padding: 4rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }
  .trk-how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; text-align: center; }
  @media (max-width: 640px) { .trk-how-grid { grid-template-columns: 1fr; gap: 2.5rem; } }
  .trk-how-step { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
  .trk-how-num { width: 48px; height: 48px; border-radius: 50%; background: rgba(15,118,110,0.08); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-family: var(--font-geist-sans), sans-serif; font-size: 1.2rem; font-weight: 300; }
  .trk-how-title { font-family: var(--font-geist-sans), sans-serif; font-size: 0.95rem; font-weight: 500; color: #111; margin: 0; }
  .trk-how-desc { font-family: var(--font-geist-sans), sans-serif; font-size: 0.82rem; font-weight: 300; color: #595959; line-height: 1.7; margin: 0; max-width: 280px; }
  .trk-hero .trk-section-inner { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
  .trk-hero .trk-eyebrow { justify-content: center; }
  .trk-hero .trk-eyebrow-text { color: rgba(255,255,255,0.8); }
  .trk-hero .trk-eyebrow-line { background: rgba(255,255,255,0.5); }

  /* ── QUICK NAV ── */
  .trk-quicknav { width: 100vw; margin-left: calc(-50vw + 50%); background: #ffffff; padding: 1.25rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }
  .trk-quicknav-inner { max-width: 72rem; margin: 0 auto; padding: 0 var(--space-md, 1.5rem); display: flex; gap: 0.5rem; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
  .trk-quicknav-inner::-webkit-scrollbar { display: none; }
  .trk-quicknav-btn { font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 400; color: #374151; text-decoration: none; padding: 0.5rem 1.15rem; border: 1px solid rgba(15,118,110,0.15); border-radius: 100px; white-space: nowrap; transition: all 0.2s ease; flex-shrink: 0; }
  .trk-quicknav-btn:hover { border-color: var(--color-primary); background: rgba(15,118,110,0.04); color: var(--color-primary); }

  /* ── FEATURED ── */
  .trk-featured { width: 100vw; margin-left: calc(-50vw + 50%); background: #f7f9f7; padding: 5rem 0; }
  .trk-featured-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 2.5rem; }
  @media (max-width: 720px) { .trk-featured-grid { grid-template-columns: 1fr; } }
  .trk-feat-card { background: #ffffff; border: 1px solid rgba(15,118,110,0.1); display: flex; flex-direction: column; position: relative; overflow: hidden; border-radius: 12px; text-decoration: none; color: inherit; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: box-shadow 0.3s ease, border-color 0.3s ease; }
  .trk-feat-card:hover { box-shadow: 0 20px 52px rgba(0,0,0,0.1); border-color: rgba(15,118,110,0.35); }
  .trk-feat-card:hover .trk-feat-cta { gap: 0.75rem; }
  .trk-feat-img { position: relative; width: 100%; height: 320px; flex-shrink: 0; overflow: hidden; }
  .trk-feat-img img { transition: transform 0.55s cubic-bezier(0.16,1,0.3,1); }
  .trk-feat-body { padding: 2.25rem; display: flex; flex-direction: column; gap: 0.85rem; flex: 1; }
  .trk-feat-meta { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
  .trk-feat-title { font-family: var(--font-geist-sans), sans-serif; font-size: 1.35rem; font-weight: 400; letter-spacing: -0.02em; color: #111111; margin: 0; line-height: 1.3; }
  .trk-feat-desc { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 300; line-height: 1.75; color: #666666; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .trk-feat-cta { display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 500; color: var(--color-primary); letter-spacing: 0.04em; transition: gap 0.2s; margin-top: auto; padding-top: 0.5rem; border-top: 1px solid rgba(15,118,110,0.1); }

  /* ── POPULAR ── */
  .trk-popular { width: 100vw; margin-left: calc(-50vw + 50%); background: #ffffff; padding: 4rem 0; }
  .trk-popular-list { display: flex; flex-wrap: wrap; gap: 0.6rem; }
  .trk-popular-chip { font-family: var(--font-geist-sans), sans-serif; font-size: 0.82rem; font-weight: 400; color: #374151; text-decoration: none; padding: 0.6rem 1.3rem; border: 1px solid rgba(15,118,110,0.15); border-radius: 100px; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 0.4rem; }
  .trk-popular-chip:hover { border-color: var(--color-primary); background: rgba(15,118,110,0.04); color: var(--color-primary); }
  .trk-popular-chip::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--color-primary); flex-shrink: 0; }

  /* ── FILTER ── */
  .trk-filter { width: 100vw; margin-left: calc(-50vw + 50%); background: #f7f9f7; padding: 2.5rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }
  .trk-filter-inner { max-width: 72rem; margin: 0 auto; padding: 0 var(--space-md, 1.5rem); display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 2rem; }
  .trk-filter-label { display: block; font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: #374151; margin-bottom: 0.75rem; }
  .trk-filter-btns { display: flex; gap: 0.4rem; flex-wrap: wrap; }
  .trk-btn { font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; font-weight: 400; padding: 0.35rem 0.85rem; border-radius: 100px; cursor: pointer; transition: all 0.2s ease; letter-spacing: 0.02em; }
  .trk-btn-inactive { border: 1px solid rgba(15,118,110,0.15); background: transparent; color: #555555; }
  .trk-btn-inactive:hover { border-color: #374151; color: #374151; background: rgba(15,118,110,0.04); }
  .trk-btn-active { border: 1px solid var(--color-primary); background: var(--color-primary); color: #ffffff; }

  /* ── CATALOGUE ── */
  .trk-cat-section { width: 100vw; margin-left: calc(-50vw + 50%); background: #ffffff; padding: 5rem 0; }
  .trk-cat-location { margin-bottom: 5rem; padding-bottom: 5rem; border-bottom: 1px solid rgba(15,118,110,0.08); }
  .trk-cat-location:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
  .trk-cat-loc-name { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200; letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 0.5rem 0; text-transform: capitalize; }
  .trk-cat-loc-intro { font-family: var(--font-geist-sans), sans-serif; font-size: 0.85rem; font-weight: 300; color: #555555; line-height: 1.85; margin: 0 0 1.5rem 0; max-width: 52rem; }
  .trk-cat-loc-intro a { color: var(--color-primary); text-decoration: none; border-bottom: 1px solid rgba(15,118,110,0.2); }
  .trk-cat-loc-tagline { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #555555; line-height: 1.85; margin: 0 0 2rem 0; }
  .trk-loc-img-wrap { width: 100%; position: relative; height: clamp(200px, 28vw, 360px); overflow: hidden; border-radius: 6px; margin-bottom: 2.5rem; }
  .trk-loc-img-wrap::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 80px; background: linear-gradient(to top, rgba(255,255,255,0.6), transparent); z-index: 1; }
  .trk-cat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.75rem; margin-bottom: 1.5rem; }
  .trk-cat-browse { font-family: var(--font-geist-sans), sans-serif; font-size: 0.82rem; font-weight: 400; color: #374151; text-decoration: none; text-transform: capitalize; display: inline-flex; align-items: center; gap: 0.4rem; transition: gap 0.2s; }
  .trk-cat-browse:hover { gap: 0.65rem; }
  .trk-empty { text-align: center; padding: 4rem 2rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #888888; }

  /* ── TREK CARD ── */
  .trk-item-card { background: #ffffff; border: 1px solid rgba(15,118,110,0.1); display: flex; flex-direction: column; position: relative; overflow: hidden; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); transition: box-shadow 0.3s ease, border-color 0.3s ease; }
  .trk-item-card:hover { box-shadow: 0 12px 36px rgba(0,0,0,0.08); border-color: rgba(15,118,110,0.25); }
  .trk-item-card:hover .trk-item-arrow { gap: 0.65rem !important; }
  .trk-item-img-wrap { position: relative; width: 100%; height: 200px; overflow: hidden; flex-shrink: 0; }
  .trk-item-body { padding: 1.25rem 1.5rem; flex: 1; display: flex; flex-direction: column; gap: 0.75rem; }
  .trk-item-footer { padding: 1rem 1.5rem; border-top: 1px solid rgba(15,118,110,0.07); }
  .trk-item-arrow { display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; font-weight: 400; color: var(--color-primary); text-decoration: none; letter-spacing: 0.02em; transition: gap 0.2s; }

  /* ── BANNER ── */
  .trk-section-banner { width: 100%; position: relative; height: clamp(180px, 22vw, 300px); overflow: hidden; border-radius: 6px; margin-bottom: 2.5rem; }
  .trk-section-banner::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 80px; background: linear-gradient(to top, rgba(255,255,255,0.7), transparent); z-index: 1; }
  .trk-section-banner--gray::after { background: linear-gradient(to top, rgba(247,249,247,0.7), transparent); }

  /* ── CURATED ── */
  .trk-curated { width: 100vw; margin-left: calc(-50vw + 50%); background: #f7f9f7; padding: 5rem 0; }
  .trk-collection { margin-bottom: 3rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(15,118,110,0.08); }
  .trk-collection:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
  .trk-collection-h3 { font-family: var(--font-geist-sans), sans-serif; font-size: 1.1rem; font-weight: 300; letter-spacing: -0.02em; color: #111111; margin: 0 0 0.4rem 0; }
  .trk-collection-p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.82rem; font-weight: 300; color: #888888; line-height: 1.7; margin: 0 0 1.5rem 0; }
  .trk-collection-links { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .trk-collection-chip { font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 400; color: #374151; text-decoration: none; padding: 0.5rem 1.1rem; border: 1px solid rgba(15,118,110,0.15); border-radius: 100px; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 0.35rem; }
  .trk-collection-chip:hover { border-color: var(--color-primary); background: rgba(15,118,110,0.04); color: var(--color-primary); }
  .trk-collection-link { font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 400; color: #374151; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; transition: gap 0.2s; margin-top: 1rem; }
  .trk-collection-link:hover { gap: 0.65rem; }

  /* ── EXPERIENCE LEVEL ── */
  .trk-experience { width: 100vw; margin-left: calc(-50vw + 50%); background: #ffffff; padding: 5rem 0; }
  .trk-exp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(15,118,110,0.08); border: 1px solid rgba(15,118,110,0.08); }
  @media (max-width: 768px) { .trk-exp-grid { grid-template-columns: 1fr; } }
  .trk-exp-block { background: #ffffff; padding: 2rem 1.75rem; display: flex; flex-direction: column; gap: 0.75rem; position: relative; overflow: hidden; transition: background 0.2s; }
  .trk-exp-block::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--color-primary); transform: scaleX(0); transform-origin: left; transition: transform 0.45s cubic-bezier(0.16,1,0.3,1); }
  .trk-exp-block:hover { background: #f7f9f7; }
  .trk-exp-block:hover::before { transform: scaleX(1); }
  .trk-exp-h3 { font-family: var(--font-geist-sans), sans-serif; font-size: 1.05rem; font-weight: 400; color: #111111; margin: 0; }
  .trk-exp-desc { font-family: var(--font-geist-sans), sans-serif; font-size: 0.82rem; font-weight: 300; color: #666666; line-height: 1.7; margin: 0; }
  .trk-exp-links { display: flex; flex-direction: column; gap: 0.35rem; margin-top: 0.25rem; }
  .trk-exp-link { font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 400; color: var(--color-primary); text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; transition: gap 0.2s; }
  .trk-exp-link:hover { gap: 0.6rem; }

  /* ── DIFFICULTY GUIDE ── */
  .trk-diffguide { width: 100vw; margin-left: calc(-50vw + 50%); background: #f7f9f7; padding: 4rem 0; }
  .trk-diffguide-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  @media (max-width: 768px) { .trk-diffguide-grid { grid-template-columns: 1fr; } }
  .trk-diffguide-block { display: flex; align-items: flex-start; gap: 0.75rem; }
  .trk-diffguide-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
  .trk-diffguide-label { font-family: var(--font-geist-sans), sans-serif; font-size: 0.85rem; font-weight: 400; color: #222222; margin: 0 0 0.2rem 0; }
  .trk-diffguide-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 300; color: #666666; line-height: 1.7; margin: 0; }

  /* ── DISCOVERY ── */
  .trk-discovery { width: 100vw; margin-left: calc(-50vw + 50%); background: #ffffff; padding: 5rem 0; }
  .trk-discovery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1px; background: rgba(15,118,110,0.08); border: 1px solid rgba(15,118,110,0.08); }
  .trk-disc-card { background: #ffffff; padding: 2rem; display: flex; flex-direction: column; gap: 0.75rem; position: relative; overflow: hidden; transition: background 0.25s; }
  .trk-disc-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--color-primary); transform: scaleX(0); transform-origin: left; transition: transform 0.45s cubic-bezier(0.16,1,0.3,1); }
  .trk-disc-card:hover { background: #f7f9f7; }
  .trk-disc-card:hover::before { transform: scaleX(1); }
  .trk-disc-card:hover .trk-disc-link { gap: 0.65rem; }
  .trk-disc-h3 { font-family: var(--font-geist-sans), sans-serif; font-size: 1rem; font-weight: 400; letter-spacing: -0.01em; color: #111111; margin: 0; }
  .trk-disc-p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.82rem; font-weight: 300; color: #666666; line-height: 1.8; margin: 0; flex: 1; }
  .trk-disc-link { font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; font-weight: 400; color: #374151; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; transition: gap 0.2s; align-self: flex-start; }

  /* ── BEST TIME ── */
  .trk-season { width: 100vw; margin-left: calc(-50vw + 50%); background: #f7f9f7; padding: 5rem 0; }
  .trk-season-intro { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #555555; line-height: 1.85; margin: 0 0 3rem 0; max-width: 48rem; }
  .trk-season-intro a { color: var(--color-primary); text-decoration: none; border-bottom: 1px solid rgba(15,118,110,0.2); transition: border-color 0.2s; }
  .trk-season-intro a:hover { border-color: var(--color-primary); }
  .trk-season-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(15,118,110,0.08); border: 1px solid rgba(15,118,110,0.08); }
  @media (max-width: 768px) { .trk-season-grid { grid-template-columns: 1fr; } }
  .trk-season-block { background: #f7f9f7; padding: 2rem 1.75rem; display: flex; flex-direction: column; gap: 0.75rem; position: relative; overflow: hidden; transition: background 0.2s; }
  .trk-season-block::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--color-primary); transform: scaleX(0); transform-origin: left; transition: transform 0.45s cubic-bezier(0.16,1,0.3,1); }
  .trk-season-block:hover { background: #ffffff; }
  .trk-season-block:hover::before { transform: scaleX(1); }
  .trk-season-h3 { font-family: var(--font-geist-sans), sans-serif; font-size: 1.05rem; font-weight: 400; color: #111111; margin: 0; }
  .trk-season-months { font-family: var(--font-geist-sans), sans-serif; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-primary); margin: 0; }
  .trk-season-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.82rem; font-weight: 300; color: #666666; line-height: 1.7; margin: 0; }
  .trk-season-links { display: flex; flex-direction: column; gap: 0.35rem; margin-top: 0.25rem; }
  .trk-season-link { font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 400; color: var(--color-primary); text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; transition: gap 0.2s; }
  .trk-season-link:hover { gap: 0.6rem; }

  /* ── MID CTA ── */
  .trk-midcta { width: 100vw; margin-left: calc(-50vw + 50%); background: #ffffff; padding: 3rem 0; }
  .trk-midcta-inner { max-width: 72rem; margin: 0 auto; padding: 1.5rem var(--space-md, 1.5rem); background: #f7f9f7; border: 1px solid rgba(15,118,110,0.1); border-radius: 6px; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
  .trk-midcta-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.92rem; font-weight: 300; color: #222222; margin: 0; }
  .trk-midcta-btn { font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; font-weight: 500; padding: 0.65rem 1.5rem; background: var(--color-primary); color: #ffffff; text-decoration: none; border-radius: 100px; transition: background 0.2s, transform 0.2s; white-space: nowrap; display: inline-flex; align-items: center; gap: 0.4rem; }
  .trk-midcta-btn:hover { background: rgba(15,118,110,0.85); transform: translateY(-1px); }

  /* ── TRUST ── */
  .trk-trust { width: 100vw; margin-left: calc(-50vw + 50%); background: #f7f9f7; padding: 5rem 0; }
  .trk-trust-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: rgba(15,118,110,0.08); border: 1px solid rgba(15,118,110,0.08); list-style: none; padding: 0; margin: 0; }
  @media (max-width: 640px) { .trk-trust-grid { grid-template-columns: 1fr; } }
  .trk-trust-item { background: #f7f9f7; padding: 2rem 1.75rem; position: relative; overflow: hidden; transition: background 0.2s; display: flex; align-items: flex-start; gap: 1rem; }
  .trk-trust-item::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--color-primary); transform: scaleX(0); transform-origin: left; transition: transform 0.45s cubic-bezier(0.16,1,0.3,1); }
  .trk-trust-item:hover { background: #ffffff; }
  .trk-trust-item:hover::before { transform: scaleX(1); }
  .trk-trust-item strong { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 400; color: #222222; letter-spacing: -0.01em; display: block; }
  .trk-trust-icon { width: 32px; height: 32px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: var(--color-primary); }

  /* ── TESTIMONIALS ── */
  .trk-testimonials { width: 100vw; margin-left: calc(-50vw + 50%); background: #ffffff; padding: 5rem 0; }
  .trk-test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  @media (max-width: 768px) { .trk-test-grid { grid-template-columns: 1fr; } }
  .trk-test-card { background: #f7f9f7; border: 1px solid rgba(15,118,110,0.1); border-radius: 4px; padding: 2rem 1.75rem; display: flex; flex-direction: column; gap: 1rem; position: relative; overflow: hidden; transition: border-color 0.25s; }
  .trk-test-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--color-primary); transform: scaleX(0); transform-origin: left; transition: transform 0.45s cubic-bezier(0.16,1,0.3,1); }
  .trk-test-card:hover { border-color: rgba(15,118,110,0.25); }
  .trk-test-card:hover::before { transform: scaleX(1); }
  .trk-test-quote { font-family: var(--font-geist-sans), sans-serif; font-size: 0.85rem; font-weight: 300; font-style: italic; color: #555555; line-height: 1.8; margin: 0; }
  .trk-test-author { display: flex; align-items: center; gap: 0.75rem; margin-top: auto; }
  .trk-test-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--color-primary); color: #ffffff; display: flex; align-items: center; justify-content: center; font-family: var(--font-geist-sans), sans-serif; font-size: 0.8rem; font-weight: 500; flex-shrink: 0; }
  .trk-test-name { font-family: var(--font-geist-sans), sans-serif; font-size: 0.82rem; font-weight: 400; color: #222222; margin: 0; }
  .trk-test-trek { font-family: var(--font-geist-sans), sans-serif; font-size: 0.7rem; font-weight: 300; color: #888888; margin: 0; }

  /* ── EXPERTISE ── */
  .trk-expertise { width: 100vw; margin-left: calc(-50vw + 50%); background: #f7f9f7; padding: 5rem 0; }
  .trk-expertise-content { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 60rem; }
  @media (max-width: 768px) { .trk-expertise-content { grid-template-columns: 1fr; } }
  .trk-expertise-p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #555555; line-height: 1.85; margin: 0; }
  .trk-expertise-p a { color: var(--color-primary); text-decoration: none; border-bottom: 1px solid rgba(15,118,110,0.2); transition: border-color 0.2s; }
  .trk-expertise-p a:hover { border-color: var(--color-primary); }

  /* ── FAQ ── */
  .trk-faq { width: 100vw; margin-left: calc(-50vw + 50%); background: #ffffff; padding: 5rem 0; }
  .trk-faq-list { display: flex; flex-direction: column; gap: 0; max-width: 52rem; }
  .trk-faq-item { border-bottom: 1px solid rgba(15,118,110,0.1); }
  .trk-faq-item:first-child { border-top: 1px solid rgba(15,118,110,0.1); }
  .trk-faq-q { font-family: var(--font-geist-sans), sans-serif; font-size: 0.95rem; font-weight: 400; color: #111111; padding: 1.25rem 0; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 1rem; background: none; border: none; width: 100%; text-align: left; transition: color 0.2s; }
  .trk-faq-q:hover { color: var(--color-primary); }
  .trk-faq-chevron { width: 20px; height: 20px; flex-shrink: 0; color: #888; transition: transform 0.3s ease, color 0.2s; }
  .trk-faq-chevron--open { transform: rotate(180deg); color: var(--color-primary); }
  .trk-faq-a { font-family: var(--font-geist-sans), sans-serif; font-size: 0.85rem; font-weight: 300; color: #555555; line-height: 1.85; padding: 0 0 1.5rem 0; margin: 0; }
  .trk-last-updated { font-family: var(--font-geist-sans), sans-serif; font-size: 0.7rem; font-weight: 400; color: #999; letter-spacing: 0.04em; margin-top: 2rem; }

  /* ── LINK CLUSTER ── */
  .trk-links-cluster { width: 100vw; margin-left: calc(-50vw + 50%); background: #f7f9f7; padding: 5rem 0; }
  .trk-links-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem; }
  .trk-links-item { font-family: var(--font-geist-sans), sans-serif; font-size: 0.85rem; font-weight: 400; color: #374151; text-decoration: none; padding: 1rem 1.25rem; border: 1px solid rgba(15,118,110,0.1); border-radius: 4px; background: #ffffff; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s ease; }
  .trk-links-item:hover { border-color: var(--color-primary); color: var(--color-primary); background: rgba(15,118,110,0.02); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
  .trk-links-item::before { content: '→'; color: var(--color-primary); font-size: 0.8rem; flex-shrink: 0; }

  /* ── PLAN CTA ── */
  .trk-plan-cta { width: 100vw; margin-left: calc(-50vw + 50%); background: #0a3d35; padding: 7rem 0; position: relative; overflow: hidden; }
  .trk-plan-cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 60% 50%, rgba(15,118,110,0.18) 0%, transparent 70%); pointer-events: none; }
  .trk-plan-inner { max-width: 72rem; margin: 0 auto; padding: 0 var(--space-md, 1.5rem); display: flex; flex-direction: column; align-items: center; text-align: center; position: relative; z-index: 1; }
  .trk-plan-cta .trk-h2 { color: #ffffff; }
  .trk-plan-cta .trk-eyebrow-text { color: rgba(255,255,255,0.6); }
  .trk-plan-cta .trk-eyebrow-line { background: rgba(255,255,255,0.3); }
  .trk-plan-cta .trk-scarcity { color: rgba(255,255,255,0.45); }
  .trk-plan-desc { font-family: var(--font-geist-sans), sans-serif; font-size: 0.92rem; font-weight: 300; color: rgba(255,255,255,0.7); line-height: 1.85; margin: 0 0 2.5rem 0; max-width: 36rem; }
  .trk-plan-btns { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
  .trk-plan-btn-primary { font-family: var(--font-geist-sans), sans-serif; display: inline-flex; align-items: center; gap: 0.75rem; padding: 1.1rem 2.75rem; background: #ffffff; color: #0a3d35; text-decoration: none; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; border-radius: 100px; border: 2px solid #ffffff; transition: gap 0.2s, background 0.25s, color 0.25s, transform 0.2s; }
  .trk-plan-btn-primary:hover { background: transparent; color: #ffffff; gap: 1.1rem; transform: translateY(-2px); }
  @keyframes trk-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.4); } 50% { box-shadow: 0 0 0 10px rgba(255,255,255,0); } }
  .trk-plan-btn-primary { animation: trk-pulse 3.5s ease-in-out infinite; }
  .trk-plan-btn-secondary { font-family: var(--font-geist-sans), sans-serif; display: inline-flex; align-items: center; gap: 0.75rem; padding: 1.1rem 2.75rem; background: transparent; color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.8rem; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; border-radius: 100px; border: 1.5px solid rgba(255,255,255,0.3); transition: gap 0.2s, border-color 0.25s, color 0.25s, transform 0.2s; }
  .trk-plan-btn-secondary:hover { border-color: rgba(255,255,255,0.7); color: #ffffff; gap: 1.1rem; transform: translateY(-2px); }
  .trk-plan-cta .trk-microcopy { color: rgba(255,255,255,0.4); }

  /* ── SOFT CTA ── */
  .trk-cta { width: 100vw; margin-left: calc(-50vw + 50%); background: #f7f9f7; padding: 5rem 0; position: relative; overflow: hidden; }
  .trk-cta::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(15,118,110,0.4) 30%, rgba(15,118,110,0.4) 70%, transparent); }
  .trk-cta-inner { max-width: 72rem; margin: 0 auto; padding: 0 var(--space-md, 1.5rem); display: flex; flex-direction: column; align-items: center; text-align: center; position: relative; z-index: 1; }
  .trk-cta-btn { font-family: var(--font-geist-sans), sans-serif; display: inline-flex; align-items: center; gap: 0.75rem; padding: 1rem 2.5rem; background: var(--color-primary); color: #ffffff; text-decoration: none; font-size: 0.78rem; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase; border: 1px solid var(--color-primary); transition: gap 0.2s, background 0.25s; }
  .trk-cta-btn:hover { background: rgba(15,118,110,0.85); gap: 1.1rem; }

  /* ── STICKY ── */
  .trk-sticky { position: fixed; bottom: 24px; right: 24px; z-index: 999; transition: opacity 0.3s ease, transform 0.3s ease; }
  .trk-sticky--hidden { opacity: 0; pointer-events: none; transform: translateY(16px); }
  .trk-sticky--visible { opacity: 1; pointer-events: auto; transform: translateY(0); }
  .trk-sticky-btn { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.85rem 1.5rem; background: var(--color-primary); color: #ffffff; text-decoration: none; border-radius: 100px; font-family: var(--font-geist-sans), sans-serif; font-size: 0.82rem; font-weight: 500; letter-spacing: 0.02em; box-shadow: 0 8px 32px rgba(15,118,110,0.35); transition: box-shadow 0.25s, transform 0.25s, background 0.25s; }
  .trk-sticky-btn:hover { box-shadow: 0 12px 40px rgba(15,118,110,0.45); transform: translateY(-2px); background: rgba(15,118,110,0.9); }

  /* ── TRUST STRIP ── */
  .trk-trust-strip { width: 100vw; margin-left: calc(-50vw + 50%); background: #ffffff; padding: 1rem 0; }
  .trk-trust-strip-inner { max-width: 72rem; margin: 0 auto; padding: 0 var(--space-md, 1.5rem); display: flex; gap: 1.5rem; align-items: center; justify-content: center; flex-wrap: wrap; }
  .trk-trust-badge { display: inline-flex; align-items: center; gap: 0.5rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 400; color: #555555; letter-spacing: 0.01em; }
  .trk-trust-badge-icon { width: 16px; height: 16px; color: var(--color-primary); flex-shrink: 0; }
  .trk-trust-sep { width: 1px; height: 16px; background: rgba(15,118,110,0.15); flex-shrink: 0; }
  @media (max-width: 480px) { .trk-trust-sep { display: none; } }

  /* ── WHO FOR ── */
  .trk-whofor { width: 100vw; margin-left: calc(-50vw + 50%); background: #ffffff; padding: 3.5rem 0; }
  .trk-whofor-list { display: flex; gap: 2.5rem; flex-wrap: wrap; }
  @media (max-width: 640px) { .trk-whofor-list { flex-direction: column; gap: 1.25rem; } }
  .trk-whofor-item { display: flex; align-items: flex-start; gap: 0.75rem; flex: 1; min-width: 200px; }
  .trk-whofor-icon { width: 20px; height: 20px; color: var(--color-primary); flex-shrink: 0; margin-top: 2px; }
  .trk-whofor-title { font-family: var(--font-geist-sans), sans-serif; font-size: 0.92rem; font-weight: 400; color: #111111; margin: 0 0 0.2rem 0; }
  .trk-whofor-desc { font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 300; color: #666666; line-height: 1.7; margin: 0; }

  /* ── TESTIMONIAL CONTEXT ── */
  .trk-test-context { font-family: var(--font-geist-sans), sans-serif; font-size: 0.65rem; font-weight: 400; color: var(--color-primary); letter-spacing: 0.08em; text-transform: uppercase; margin: 0.2rem 0 0 0; }

  /* ── MICRO COPY + SCARCITY ── */
  .trk-microcopy { font-family: var(--font-geist-sans), sans-serif; font-size: 0.72rem; font-weight: 300; color: #999999; letter-spacing: 0.02em; margin-top: 1rem; }
  .trk-scarcity { font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 300; font-style: italic; color: #888888; margin: 0 0 2rem 0; }

  /* ── SIGNATURE VISUAL (removed — overlays baked into images) ── */

  /* ── FEATURED TESTIMONIAL ── */
  .trk-test-card--featured { grid-column: 1 / -1; text-align: center; max-width: 48rem; margin: 0 auto 1rem; padding: 3rem 3.5rem; background: #f0fdf4; border: 1.5px solid var(--color-primary); border-radius: 12px; box-shadow: 0 12px 48px rgba(15,118,110,0.12); }
  .trk-test-card--featured .trk-test-quote { font-size: 1.25rem; line-height: 1.85; font-style: normal; color: #111111; font-weight: 300; }
  .trk-test-card--featured .trk-test-author { justify-content: center; margin-top: 1.5rem; }
  .trk-test-card--featured .trk-test-avatar { width: 44px; height: 44px; font-size: 0.9rem; }
  @media (max-width: 768px) { .trk-test-card--featured { padding: 2rem 1.75rem; } .trk-test-card--featured .trk-test-quote { font-size: 0.96rem; } }

  /* ── ANTI-MASS INTRO ── */
  .trk-anti-mass { font-family: var(--font-geist-sans), sans-serif; font-size: 0.85rem; font-weight: 300; color: #555555; line-height: 1.85; margin: 0 0 2.5rem 0; max-width: 48rem; }

  /* ── SCROLL REVEAL ── */
  .trk-fade { opacity: 0; transform: translateY(20px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
  .trk-fade.trk-in-view { opacity: 1; transform: translateY(0); }
`}</style>

{/* ═══ 1: HERO ═══ */}
<section className="trk-hero">
  <div className="trk-hero-img-wrap">
    <Image src="/Images/hero/treks-hero.webp" alt="Golden-hour Himalayan peaks with an alpine trekking trail" width={1920} height={1080} priority fetchPriority="high" quality={60} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
  </div>
  <div className="trk-section-inner">
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">Himalayan Treks</span></div>
    <h1 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: 200, letterSpacing: '-0.04em', color: '#ffffff', lineHeight: 1.1, margin: '0 0 1.25rem 0', maxWidth: '52rem', textShadow: '0 2px 32px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.5)' }}>Trekking in the Himalayas</h1>
    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.85)', margin: 0, maxWidth: '38rem' }}>Not all treks are created equal. We curate only the ones worth your time.</p>
    <div className="trk-hero-btns">
      <a href="#catalogue" className="trk-hero-btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore All Treks →</a>
      <a href="https://wa.me/919760446101?text=Hi%2C%20I%20need%20help%20choosing%20the%20right%20trek." className="trk-hero-btn-secondary">Talk to an Expert</a>
    </div>
  </div>
</section>

{/* ═══ 1.05: HOW IT WORKS ═══ */}
<section className="trk-how">
  <div className="trk-section-inner">
    <div className="trk-eyebrow" style={{ justifyContent: 'center' }}><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">How It Works</span><span className="trk-eyebrow-line" /></div>
    <h2 className="trk-h2" style={{ textAlign: 'center', marginBottom: '3rem' }}>Three Steps to Your Himalayan Trek</h2>
    <div className="trk-how-grid">
      <div className="trk-how-step">
        <span className="trk-how-num">1</span>
        <p className="trk-how-title">Choose Your Trek</p>
        <p className="trk-how-desc">Browse treks by difficulty, duration, or region. Every route is personally scouted by our team.</p>
      </div>
      <div className="trk-how-step">
        <span className="trk-how-num">2</span>
        <p className="trk-how-title">Talk to a Local Expert</p>
        <p className="trk-how-desc">Get a personalised recommendation from our Uttarakhand-based team — free, no obligations.</p>
      </div>
      <div className="trk-how-step">
        <span className="trk-how-num">3</span>
        <p className="trk-how-title">Trek With Confidence</p>
        <p className="trk-how-desc">Small groups, certified guides, safety-first approach. We handle the logistics, you enjoy the mountains.</p>
      </div>
    </div>
  </div>
</section>

{/* ═══ 1.1: QUICK NAV BAR ═══ */}
<nav className="trk-quicknav" aria-label="Quick trek navigation">
  <div className="trk-quicknav-inner">
    <Link href="/treks/best-treks-in-uttarakhand/beginner" className="trk-quicknav-btn">Beginner Treks</Link>
    <Link href="/treks/3-day-treks-uttarakhand" className="trk-quicknav-btn">Weekend Treks</Link>
    <Link href="/treks/best-treks-in-uttarakhand/snow" className="trk-quicknav-btn">Snow Treks</Link>
    <Link href="/treks/best-treks-in-uttarakhand" className="trk-quicknav-btn">Best Treks</Link>
    <a href="#catalogue" className="trk-quicknav-btn" onClick={(e) => { e.preventDefault(); document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' }); }}>All Treks ↓</a>
  </div>
</nav>

{/* ═══ 1.2: TRUST STRIP ═══ */}
<div className="trk-trust-strip">
  <div className="trk-trust-strip-inner">
    <span className="trk-trust-badge"><svg className="trk-trust-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>500+ trekkers hosted</span>
    <span className="trk-trust-sep" />
    <span className="trk-trust-badge"><svg className="trk-trust-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>Local Uttarakhand team</span>
    <span className="trk-trust-sep" />
    <span className="trk-trust-badge"><svg className="trk-trust-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Small group sizes</span>
  </div>
</div>

{/* ═══ 1.5: FEATURED TREKS (fully clickable cards) ═══ */}
<section className="trk-featured">
  <div className="trk-section-inner">
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">Featured</span></div>
    <h2 className="trk-h2">Featured Treks in Uttarakhand</h2>
    <div className="trk-featured-grid">
      {featuredTreks.map((trek) => {
        const diffStyle = difficultyColor(trek.difficulty);
        const trekImg = trekImageMap[trek.slug];
        return (
          <Link key={trek.slug} href={`/treks/location/${trek.locationId}/${trek.slug}`} className="trk-feat-card">
            <span style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 3, fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', background: 'var(--color-primary)', padding: '4px 12px', borderRadius: '100px' }}>Most Popular</span>
            {trekImg && <div className="trk-feat-img"><Image src={trekImg} alt={trekAltMap[trek.slug] || `${trek.title} trek in Uttarakhand`} width={800} height={600} loading="lazy" sizes="(max-width: 540px) 100vw, 360px" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}
            <div className="trk-feat-body">
              <div className="trk-feat-meta">
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', fontWeight: 400, color: '#888888' }}>{trek.duration}</span>
                <span style={{ color: 'rgba(15,118,110,0.2)', fontSize: '0.6rem' }}>·</span>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', fontWeight: 500, padding: '2px 8px', borderRadius: '100px', background: diffStyle.bg, color: diffStyle.color }}>{trek.difficulty}</span>
              </div>
              <h3 className="trk-feat-title">{trek.title}</h3>
              <p className="trk-feat-desc">{trek.description}</p>
              <span className="trk-feat-cta">View Details →</span>
            </div>
          </Link>
        );
      })}
    </div>
  </div>
</section>

{/* ═══ 1.55: SIGNATURE VISUAL ═══ */}
<section className="trk-signature">
  <Image src="/Images/hero/himalayan-sunrise.webp" alt="Himalayan sunrise over Uttarakhand mountain trails" width={1920} height={1080} loading="lazy" sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }} />
  <div className="trk-signature-text">
    <p className="trk-signature-quote">Trekking in Uttarakhand isn’t about ticking peaks.<br />It’s about experiencing the Himalayas the right way.</p>
    <span className="trk-signature-line" />
  </div>
</section>

{/* ═══ 1.6: WHO THESE TREKS ARE FOR ═══ */}
<section className="trk-whofor">
  <div className="trk-section-inner">
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">Made For You</span></div>
    <h2 className="trk-h2" style={{ marginBottom: '2rem' }}>Who These Treks Are For</h2>
    <div className="trk-whofor-list">
      <div className="trk-whofor-item">
        <svg className="trk-whofor-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        <div><p className="trk-whofor-title">First-Time Trekkers</p><p className="trk-whofor-desc">Never trekked before? Our easy, guided Himalayan trails are built for you — no experience needed.</p></div>
      </div>
      <div className="trk-whofor-item">
        <svg className="trk-whofor-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <div><p className="trk-whofor-title">Weekend Explorers</p><p className="trk-whofor-desc">Short on time? Forest and waterfall treks that fit a 2–3 day break from the city.</p></div>
      </div>
      <div className="trk-whofor-item">
        <svg className="trk-whofor-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22L12 4l10 18H2z"/></svg>
        <div><p className="trk-whofor-title">Serious Mountain Lovers</p><p className="trk-whofor-desc">Looking for summit pushes, high-altitude snow, and multi-day ridge walks in the Himalayas.</p></div>
      </div>
    </div>
  </div>
</section>

{/* ═══ 1.7: MOST POPULAR ═══ */}
<section className="trk-popular">
  <div className="trk-section-inner">
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">Top Searched</span></div>
    <h2 className="trk-h2" style={{ marginBottom: '1.5rem' }}>Most Popular Treks in Uttarakhand</h2>
    <div className="trk-popular-list">
      {popularTreks.map((trek) => <Link key={trek.slug} href={`/treks/location/${trek.locationId}/${trek.slug}`} className="trk-popular-chip">{trek.title}</Link>)}
    </div>
  </div>
</section>

<SectionSeparator />

{/* ═══ 2: FILTER ═══ */}
<section className="trk-filter">
  <div className="trk-filter-inner">
    <div>
      <label className="trk-filter-label">Destination</label>
      <div className="trk-filter-btns">
        <button onClick={() => setSelectedDestination(null)} className={`trk-btn ${selectedDestination === null ? 'trk-btn-active' : 'trk-btn-inactive'}`}>All</button>
        {locations.map((l: typeof locations[number]) => <button key={l.id} onClick={() => setSelectedDestination(l.id)} className={`trk-btn ${selectedDestination === l.id ? 'trk-btn-active' : 'trk-btn-inactive'}`} style={{ textTransform: 'capitalize' }}>{l.name}</button>)}
      </div>
    </div>
    <div>
      <label className="trk-filter-label">Difficulty</label>
      <div className="trk-filter-btns">
        <button onClick={() => setSelectedDifficulty(null)} className={`trk-btn ${selectedDifficulty === null ? 'trk-btn-active' : 'trk-btn-inactive'}`}>All</button>
        {availableDifficulties.map((d) => <button key={d} onClick={() => setSelectedDifficulty(d)} className={`trk-btn ${selectedDifficulty === d ? 'trk-btn-active' : 'trk-btn-inactive'}`} style={{ textTransform: 'capitalize' }}>{d === 'easy-moderate' ? 'Moderate' : d.charAt(0).toUpperCase() + d.slice(1)}</button>)}
      </div>
    </div>
    <div>
      <label className="trk-filter-label">Duration</label>
      <div className="trk-filter-btns">
        <button onClick={() => setSelectedDuration(null)} className={`trk-btn ${selectedDuration === null ? 'trk-btn-active' : 'trk-btn-inactive'}`}>All</button>
        {availableDurations.map((d) => <button key={d} onClick={() => setSelectedDuration(d)} className={`trk-btn ${selectedDuration === d ? 'trk-btn-active' : 'trk-btn-inactive'}`} style={{ textTransform: 'capitalize' }}>{d === 'weekend' ? 'Weekend' : 'Multi-day'}</button>)}
      </div>
    </div>
  </div>
</section>

{/* ═══ 3: CATALOGUE ═══ */}
{!hasAnyTreks && <div className="trk-empty"><p>No treks match your filters. Try adjusting your selection.</p></div>}
{hasAnyTreks && (
  <section id="catalogue" className="trk-cat-section">
    <div className="trk-section-inner">
      {Object.entries(filteredByLocation).map(([locationId, treks]: [string, typeof allTreks]) => {
        const location = locations.find((l: typeof locations[number]) => l.id === locationId);
        if (!location || treks.length === 0) return null;
        return (
          <div key={locationId} className="trk-cat-location">
            <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">{location.name}</span></div>
            <h2 className="trk-cat-loc-name">{location.name} Treks</h2>
            <LocationIntro locationId={locationId} />
            {locationImageMap[locationId] && <div className="trk-loc-img-wrap"><Image src={locationImageMap[locationId]} alt={locationAltMap[locationId] || `${location.name} trekking destination, Uttarakhand`} width={1200} height={675} loading="lazy" sizes="(max-width: 768px) 100vw, 1152px" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}
            <p className="trk-cat-loc-tagline">{location.tagline}</p>
            <div className="trk-cat-grid">
              {treks.map((trek: typeof allTreks[number]) => {
                const ds = difficultyColor(trek.difficulty);
                const img = trekImageMap[trek.slug];
                return (
                  <div key={trek.slug} className="trk-item-card">
                    {img && <div className="trk-item-img-wrap"><Image src={img} alt={trekAltMap[trek.slug] || `${trek.title} trek in Uttarakhand`} width={800} height={600} loading="lazy" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}
                    <div className="trk-item-body">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', fontWeight: 400, color: '#888888' }}>{trek.duration}</span>
                        <span style={{ color: 'rgba(15,118,110,0.2)', fontSize: '0.6rem' }}>·</span>
                        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', fontWeight: 500, padding: '2px 8px', borderRadius: '100px', background: ds.bg, color: ds.color }}>{trek.difficulty}</span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1rem', fontWeight: 400, letterSpacing: '-0.01em', color: '#111111', margin: 0, lineHeight: 1.3 }}>{trek.title}</h3>
                      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.8, color: '#666666', margin: 0 }}>{trek.description}</p>
                    </div>
                    <div className="trk-item-footer"><Link href={`/treks/location/${trek.locationId}/${trek.slug}`} className="trk-item-arrow">View {trek.title} details →</Link></div>
                  </div>
                );
              })}
            </div>
            <Link href={`/treks/location/${locationId}`} className="trk-cat-browse">Browse {location.name} treks →</Link>
          </div>
        );
      })}
    </div>
  </section>
)}

<SectionSeparator />

{/* ═══ 4: EXPLORE BY INTEREST ═══ */}
<section className="trk-curated">
  <div className="trk-section-inner">
    <div className="trk-section-banner">
      <Image src="/Images/hero/valley-forest.webp" alt="Himalayan valley forest trails for trekking in Uttarakhand" width={1400} height={788} loading="lazy" sizes="(max-width: 768px) 100vw, 1152px" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">By Interest</span></div>
    <h2 className="trk-h2" style={{ marginBottom: '3.5rem' }}>Explore Treks by Interest</h2>
    <div className="trk-collection">
      <h3 className="trk-collection-h3">Beginner-Friendly Treks</h3>
      <p className="trk-collection-p">Easy-paced treks suitable for first-time trekkers.</p>
      <div className="trk-collection-links">
        {filterTreks(allTreks.filter((t) => t.difficulty === 'Easy' || (t.difficulty.includes('Easy') && t.difficulty.includes('Moderate')))).slice(0, 6).map((t) => <Link key={t.slug} href={`/treks/location/${t.locationId}/${t.slug}`} className="trk-collection-chip">{t.title} →</Link>)}
      </div>
      <Link href="/treks/best-treks-in-uttarakhand/beginner" className="trk-collection-link">Browse beginner-friendly trek itineraries →</Link>
    </div>
    <div className="trk-collection">
      <h3 className="trk-collection-h3">Weekend Treks</h3>
      <p className="trk-collection-p">Perfect short escapes from Dehradun and nearby cities.</p>
      <div className="trk-collection-links">
        {filterTreks(allTreks.filter((t) => t.duration.includes('Half day') || t.duration.includes('1 day') || t.duration.includes('2') || t.duration.includes('3'))).slice(0, 6).map((t) => <Link key={t.slug} href={`/treks/location/${t.locationId}/${t.slug}`} className="trk-collection-chip">{t.title} →</Link>)}
      </div>
      <Link href="/treks/3-day-treks-uttarakhand" className="trk-collection-link">Browse weekend treks from Dehradun →</Link>
    </div>
    <div className="trk-collection">
      <h3 className="trk-collection-h3">Classic Himalayan Treks</h3>
      <p className="trk-collection-p">Iconic Himalayan routes with mountain views and cultural depth.</p>
      <div className="trk-collection-links">
        {filterTreks(allTreks.filter((t) => !t.duration.includes('Half day') && !t.duration.includes('1 day'))).slice(0, 6).map((t) => <Link key={t.slug} href={`/treks/location/${t.locationId}/${t.slug}`} className="trk-collection-chip">{t.title} →</Link>)}
      </div>
      <Link href="/treks/best-treks-in-uttarakhand" className="trk-collection-link">Explore classic Himalayan summit treks →</Link>
    </div>
  </div>
</section>

{/* ═══ 4.5: EXPERIENCE LEVEL ═══ */}
<section className="trk-experience">
  <div className="trk-section-inner">
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">Experience Level</span></div>
    <h2 className="trk-h2" style={{ marginBottom: '3rem' }}>Choose Treks by Experience Level</h2>
    <div className="trk-exp-grid">
      <div className="trk-exp-block"><h3 className="trk-exp-h3">Beginner Treks</h3><p className="trk-exp-desc">Gentle trails with no prior experience needed. Guided, safe, and scenic.</p><div className="trk-exp-links"><Link href="/treks/location/chakrata/weekend-trek" className="trk-exp-link">Chakrata Weekend Trek →</Link><Link href="/treks/location/chakrata/budher-caves-trek" className="trk-exp-link">Budher Caves Trek →</Link><Link href="/treks/location/munsiyari/khaliya-top-trek" className="trk-exp-link">Khaliya Top Trek →</Link></div></div>
      <div className="trk-exp-block"><h3 className="trk-exp-h3">Moderate Treks</h3><p className="trk-exp-desc">Multi-day routes with some altitude. Ideal for active hikers ready for more.</p><div className="trk-exp-links"><Link href="/treks/location/sankri/kedarkantha-trek" className="trk-exp-link">Kedarkantha Trek →</Link><Link href="/treks/location/lohajung/brahmatal-trek" className="trk-exp-link">Brahmatal Trek →</Link><Link href="/treks/location/joshimath/kuari-pass-trek" className="trk-exp-link">Kuari Pass Trek →</Link></div></div>
      <div className="trk-exp-block"><h3 className="trk-exp-h3">Difficult Treks</h3><p className="trk-exp-desc">Challenging high-altitude routes for experienced trekkers with proven fitness.</p><div className="trk-exp-links"><Link href="/treks/location/lohajung/roopkund-trek" className="trk-exp-link">Roopkund Trek →</Link><Link href="/treks/location/joshimath/pangarchulla-trek" className="trk-exp-link">Pangarchulla Trek →</Link><Link href="/treks/location/munsiyari/milam-glacier-trek" className="trk-exp-link">Milam Glacier Trek →</Link></div></div>
    </div>
  </div>
</section>

{/* ═══ 4.6: DIFFICULTY GUIDE ═══ */}
<section className="trk-diffguide">
  <div className="trk-section-inner">
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">Difficulty Scale</span></div>
    <h2 className="trk-h2" style={{ marginBottom: '2rem' }}>Trek Difficulty Explained</h2>
    <div className="trk-diffguide-grid">
      <div className="trk-diffguide-block">
        <span className="trk-diffguide-dot" style={{ background: 'var(--color-primary)' }} />
        <div><p className="trk-diffguide-label">Easy</p><p className="trk-diffguide-text">Short duration, low altitude, well-marked trails. No prior trekking experience needed. Suitable for families and <Link href="/treks/best-treks-in-uttarakhand/beginner" style={iLinkStyle}>first-time trekkers</Link>.</p></div>
      </div>
      <div className="trk-diffguide-block">
        <span className="trk-diffguide-dot" style={{ background: '#7a6010' }} />
        <div><p className="trk-diffguide-label">Moderate</p><p className="trk-diffguide-text">Multi-day treks, 5–6 hours daily walking, altitudes up to 4,000 m. Basic fitness and some hiking experience recommended. Includes treks like <Link href="/treks/location/sankri/kedarkantha-trek" style={iLinkStyle}>Kedarkantha</Link>.</p></div>
      </div>
      <div className="trk-diffguide-block">
        <span className="trk-diffguide-dot" style={{ background: '#b43c28' }} />
        <div><p className="trk-diffguide-label">Difficult</p><p className="trk-diffguide-text">High altitude, long days, steep ascents, and unpredictable weather. Prior trekking experience and strong cardiovascular fitness essential. See our <Link href="/treks/garhwal-himalayas/fitness-guide" style={iLinkStyle}>fitness preparation guide</Link>.</p></div>
      </div>
    </div>
  </div>
</section>

<SectionSeparator />

{/* ═══ 5: FIND YOUR TREK ═══ */}
<section className="trk-discovery">
  <div className="trk-section-inner">
    <div className="trk-section-banner">
      <Image src="/Images/hero/alpine-ridge.webp" alt="Alpine ridge trail for Himalayan trekking in Uttarakhand" width={1920} height={1080} loading="lazy" sizes="(max-width: 768px) 100vw, 1152px" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">Find Your Trek</span></div>
    <h2 className="trk-h2">Not Sure Which Trek Is Right for You?</h2>
    <div className="trk-discovery-grid">
      <div className="trk-disc-card"><h3 className="trk-disc-h3">First-Time Trekkers</h3><p className="trk-disc-p">New to trekking? Start with easy, guided trails that focus on experience, not endurance.</p><Link href="/treks/best-treks-in-uttarakhand/beginner" className="trk-disc-link">Browse beginner-friendly treks →</Link></div>
      <div className="trk-disc-card"><h3 className="trk-disc-h3">Weekend Explorers</h3><p className="trk-disc-p">Short on time? Choose forest and waterfall treks that fit into a weekend.</p><Link href="/treks/location/chakrata" className="trk-disc-link">View Chakrata Weekend Trek itinerary →</Link></div>
      <div className="trk-disc-card"><h3 className="trk-disc-h3">Adventure Seekers</h3><p className="trk-disc-p">Looking for snow, altitude, and longer days on the trail?</p><Link href="/treks/location/sankri" className="trk-disc-link">Discover Sankri multi-day trek itineraries →</Link></div>
    </div>
  </div>
</section>

{/* ═══ 5.5: BEST TIME ═══ */}
<section className="trk-season">
  <div className="trk-section-inner">
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">Seasonal Guide</span></div>
    <h2 className="trk-h2" style={{ marginBottom: '1rem' }}>Best Time for Trekking in Uttarakhand</h2>
    <p className="trk-season-intro">Uttarakhand offers trekking year-round, with each season transforming the landscape. From spring wildflowers in the <Link href="/treks/location/joshimath">Joshimath region</Link> to deep snow on the <Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha summit</Link>, timing your trek shapes the entire experience.</p>
    <div className="trk-season-grid">
      <div className="trk-season-block"><h3 className="trk-season-h3">Summer Treks</h3><span className="trk-season-months">March – June</span><p className="trk-season-text">Clear skies and wildflower meadows. Best for high-altitude passes like <Link href="/treks/location/joshimath/kuari-pass-trek" style={iLinkStyle}>Kuari Pass</Link> and valley treks in <Link href="/treks/location/sankri/har-ki-dun-trek" style={iLinkStyle}>Har Ki Dun</Link>. Snow begins melting at lower altitudes, opening longer routes.</p><div className="trk-season-links"><Link href="/treks/location/sankri/har-ki-dun-trek" className="trk-season-link">Har Ki Dun Trek →</Link><Link href="/treks/location/joshimath/kuari-pass-trek" className="trk-season-link">Kuari Pass Trek →</Link><Link href="/treks/spring-treks-uttarakhand" className="trk-season-link">All spring treks →</Link></div></div>
      <div className="trk-season-block"><h3 className="trk-season-h3">Autumn Treks</h3><span className="trk-season-months">September – November</span><p className="trk-season-text">Post-monsoon clarity with the most vivid Himalayan views. Ideal for <Link href="/treks/location/lohajung/brahmatal-trek" style={iLinkStyle}>Brahmatal</Link>, <Link href="/treks/location/munsiyari/khaliya-top-trek" style={iLinkStyle}>Khaliya Top</Link>, and forest treks near Chakrata. Less crowded trails.</p><div className="trk-season-links"><Link href="/treks/location/lohajung/brahmatal-trek" className="trk-season-link">Brahmatal Trek →</Link><Link href="/treks/location/munsiyari/khaliya-top-trek" className="trk-season-link">Khaliya Top Trek →</Link><Link href="/treks/autumn-treks-uttarakhand" className="trk-season-link">All autumn treks →</Link></div></div>
      <div className="trk-season-block"><h3 className="trk-season-h3">Winter Treks</h3><span className="trk-season-months">December – February</span><p className="trk-season-text">Deep snow trekking at its finest. <Link href="/treks/location/sankri/kedarkantha-trek" style={iLinkStyle}>Kedarkantha</Link> and <Link href="/treks/location/lohajung/brahmatal-trek" style={iLinkStyle}>Brahmatal</Link> are flagship winter treks with stunning snow-covered summit views. Requires proper gear — see our <Link href="/treks/garhwal-himalayas/packing-checklist" style={iLinkStyle}>packing checklist</Link>.</p><div className="trk-season-links"><Link href="/treks/location/sankri/kedarkantha-trek" className="trk-season-link">Kedarkantha Trek →</Link><Link href="/treks/location/lohajung/brahmatal-trek" className="trk-season-link">Brahmatal Trek →</Link><Link href="/treks/best-treks-in-uttarakhand/snow" className="trk-season-link">All winter treks →</Link></div></div>
    </div>
  </div>
</section>

{/* ═══ 5.7: MID CTA ═══ */}
<section className="trk-midcta">
  <div className="trk-midcta-inner">
    <p className="trk-midcta-text">Confused between treks? Talk to an expert and get a personalised recommendation.</p>
    <a href="https://wa.me/919760446101?text=Hi%2C%20I%20need%20help%20choosing%20the%20right%20trek." className="trk-midcta-btn">Talk to a Local Trek Expert →</a>
  </div>
</section>

<SectionSeparator />

{/* ═══ 6: WHY TREK WITH US ═══ */}
<section className="trk-trust">
  <div className="trk-section-inner">
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">Our Approach</span></div>
    <h2 className="trk-h2">Why Trek With Us</h2>
    <p className="trk-anti-mass">We don’t run crowded batches. Every trek is intentionally small and experience-focused.</p>
    <ul className="trk-trust-grid">
      <li className="trk-trust-item"><span className="trk-trust-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span><strong>Beginner-friendly pacing</strong></li>
      <li className="trk-trust-item"><span className="trk-trust-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span><strong>Small groups</strong></li>
      <li className="trk-trust-item"><span className="trk-trust-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg></span><strong>Local mountain guides</strong></li>
      <li className="trk-trust-item"><span className="trk-trust-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span><strong>Safety-first approach</strong></li>
      <li className="trk-trust-item"><span className="trk-trust-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span><strong>Weekend and long-format treks</strong></li>
    </ul>
  </div>
</section>

{/* ═══ 6.3: TESTIMONIALS ═══ */}
<section className="trk-testimonials">
  <div className="trk-section-inner">
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">Trekker Stories</span></div>
    <h2 className="trk-h2">Real Trek Experiences</h2>
    <div className="trk-test-grid">
      {TESTIMONIALS.map((t, i) => (
        <div key={i} className={`trk-test-card ${i === 0 ? 'trk-test-card--featured' : ''}`}>
          <p className="trk-test-quote">&ldquo;{t.text}&rdquo;</p>
          <div className="trk-test-author"><span className="trk-test-avatar">{t.name[0]}</span><div><p className="trk-test-name">{t.name}</p><p className="trk-test-trek">{t.trek}</p>{TESTIMONIAL_CONTEXT[t.name] && <p className="trk-test-context">{TESTIMONIAL_CONTEXT[t.name]}</p>}</div></div>
        </div>
      ))}
    </div>
  </div>
</section>

<SectionSeparator />

{/* ═══ 6.5: EXPERTISE ═══ */}
<section className="trk-expertise">
  <div className="trk-section-inner">
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">About Us</span></div>
    <h2 className="trk-h2">Our Trekking Expertise</h2>
    <div className="trk-expertise-content">
      <p className="trk-expertise-p">We have been organising guided Himalayan treks across Uttarakhand for years — from weekend forest walks near <Link href="/treks/location/chakrata">Chakrata</Link> to challenging summit expeditions out of <Link href="/treks/location/sankri">Sankri</Link> and <Link href="/treks/location/joshimath">Joshimath</Link>. Our operations are rooted in deep local knowledge, not outsourced logistics.</p>
      <p className="trk-expertise-p">We’ve walked these trails in every season — from snow-covered Kedarkantha winters to monsoon valleys in Har Ki Dun. Every route recommendation comes from real experience on these mountains, not a brochure.</p>
      <p className="trk-expertise-p">Every trek route we offer has been personally scouted by our team. We understand trail conditions in each season, from the monsoon-swollen rivers of <Link href="/treks/location/chakrata/tiger-fall-trek">Tiger Fall</Link> to the frozen ridgelines of <Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha</Link> in January. This is not theoretical — it is lived experience on these mountains.</p>
      <p className="trk-expertise-p">Our focus is exclusively Uttarakhand and the Indian Himalayas. Instead of spreading thin across dozens of destinations, we go deep — covering regions like <Link href="/treks/location/munsiyari">Munsiyari</Link> in Kumaon, <Link href="/treks/location/lohajung">Lohajung</Link> in Garhwal, and the remote valleys of Sankri. This regional specialisation means better guides, better logistics, and better safety. We focus only on Uttarakhand — not mass, multi-state operations.</p>
      <p className="trk-expertise-p">Safety is never an afterthought. Every trek includes trained local guides, proper acclimatisation schedules, first-aid kits, and emergency communication. For high-altitude treks above 4,000 m like <Link href="/treks/location/lohajung/roopkund-trek">Roopkund</Link> and <Link href="/treks/location/joshimath/pangarchulla-trek">Pangarchulla</Link>, we enforce fitness screening and altitude-gain protocols. Read our <Link href="/treks/garhwal-himalayas/fitness-guide">fitness preparation guide</Link> before booking.</p>
    </div>
  </div>
</section>

{/* ═══ 6.7: FAQ (8 questions) ═══ */}
<section className="trk-faq">
  <div className="trk-section-inner">
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">Common Questions</span></div>
    <h2 className="trk-h2">Trekking FAQs</h2>
    <div className="trk-faq-list">
      {FAQ_DATA.map((faq, index) => (
        <div key={index} className="trk-faq-item">
          <button className="trk-faq-q" onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} aria-expanded={openFaqIndex === index}>
            {faq.question}
            <svg className={`trk-faq-chevron ${openFaqIndex === index ? 'trk-faq-chevron--open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
          {openFaqIndex === index && <p className="trk-faq-a">{faq.answer}</p>}
        </div>
      ))}
    </div>
    <p className="trk-last-updated">Last Updated: {lastUpdated}</p>
  </div>
</section>

{/* ═══ 6.9: LINK CLUSTER ═══ */}
<section className="trk-links-cluster">
  <div className="trk-section-inner">
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">Resources</span></div>
    <h2 className="trk-h2">Explore More Trekking Guides</h2>
    <div className="trk-links-grid">
      <Link href="/treks/best-treks-in-uttarakhand/beginner" className="trk-links-item">Beginner Treks in Uttarakhand</Link>
      <Link href="/treks/best-treks-in-uttarakhand" className="trk-links-item">Best Treks in Uttarakhand</Link>
      <Link href="/treks/best-treks-in-uttarakhand/snow" className="trk-links-item">Winter Treks in Uttarakhand</Link>
      <Link href="/treks/trek-near-delhi" className="trk-links-item">Treks Near Delhi</Link>
      <Link href="/treks/garhwal-himalayas/packing-checklist" className="trk-links-item">Trekking Packing Checklist</Link>
      <Link href="/treks/garhwal-himalayas/fitness-guide" className="trk-links-item">Trek Fitness Preparation Guide</Link>
      <Link href="/treks/above-4000m-treks-uttarakhand" className="trk-links-item">High Altitude Treks Above 4000m</Link>
      <Link href="/treks/trek-packages-uttarakhand" className="trk-links-item">Trek Packages in Uttarakhand</Link>
    </div>
  </div>
</section>

{/* ═══ 7: GET YOUR TREK RECOMMENDATION ═══ */}
<section className="trk-plan-cta">
  <div className="trk-plan-inner">
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">Start Planning</span><span className="trk-eyebrow-line" /></div>
    <h2 className="trk-h2">Talk to a Local Trek Expert</h2>
    <p className="trk-plan-desc">Not sure which trek is right for you? Let our team help you plan the perfect Himalayan adventure based on your experience, schedule, and goals.</p>
    <p className="trk-scarcity">Limited group sizes for each trek</p>
    <div className="trk-plan-btns">
      <a href="https://wa.me/919760446101?text=Hi%2C%20I%27d%20like%20a%20personalised%20trek%20recommendation." className="trk-plan-btn-primary">Talk to a Local Expert Before You Book Your Trek →</a>
      <Link href="/treks/best-treks-in-uttarakhand" className="trk-plan-btn-secondary">Browse All Treks →</Link>
    </div>
    <p className="trk-microcopy">Free consultation · No spam · Quick response</p>
  </div>
</section>

{/* ═══ 8: SOFT CTA ═══ */}
<section className="trk-cta">
  <div className="trk-cta-inner">
    <div className="trk-eyebrow"><span className="trk-eyebrow-line" /><span className="trk-eyebrow-text">Get in Touch</span><span className="trk-eyebrow-line" /></div>
    <h2 className="trk-h2">Not sure which trek fits you best?</h2>
    <a href="https://wa.me/919760446101?text=Hi%2C%20I%27d%20like%20to%20know%20which%20trek%20would%20be%20best%20for%20me." className="trk-cta-btn">Talk to us on WhatsApp →</a>
  </div>
</section>

{/* ═══ STICKY CTA ═══ */}
<div className={`trk-sticky ${showSticky ? 'trk-sticky--visible' : 'trk-sticky--hidden'}`}>
  <a href="https://wa.me/919760446101?text=Hi%2C%20I%20need%20a%20trek%20recommendation." className="trk-sticky-btn" aria-label="Talk to a local trek expert via WhatsApp">👉 Talk to a Local Expert</a>
</div>

    </div>
  );
}
