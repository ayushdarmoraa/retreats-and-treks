import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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

const PATH = '/retreats/weekend-himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Weekend Himalayan Retreats | Retreats And Treks',
    description:
      'Plan a 2–3 day weekend Himalayan retreat near Delhi with yoga, meditation, nature immersion, and Friday-to-Sunday programs in Chakrata and Rishikesh.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Weekend Himalayan Retreats Near Delhi — 2–3 Day Mountain Escapes',
      description:
        'Friday–Sunday Himalayan retreat programs near Delhi. 2–3 day reset in Chakrata, Rishikesh and Sankri with yoga, meditation and structured restoration.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Weekend Himalayan Retreats Near Delhi — 2–3 Day Mountain Escapes'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Can I do a Himalayan retreat in just 2 days?',
    answer:
      'Yes. A well-structured 2-night retreat delivers measurable benefit. Programs are designed for compressed timelines — Friday evening arrival with a grounding session, full Saturday immersion across yoga, breathwork, meditation and nature, and Sunday morning closing with early departure. Participants consistently report noticeable mental reset within 48 hours when the environment and structure are right. The key is not duration but design.',
  },
  {
    question: 'Which is closer to Delhi — Chakrata or Rishikesh?',
    answer:
      'Rishikesh is slightly closer at 5–6 hours by road from Delhi. Chakrata takes 6–7 hours via Dehradun. Both are comfortably reachable on a Friday evening or early Saturday morning. Rishikesh is faster if you are coming from south or central Delhi. Chakrata is more direct from north Delhi via the Yamuna Expressway corridor. Both qualify as genuine weekend destinations.',
  },
  {
    question: 'Is Sankri feasible for a weekend retreat?',
    answer:
      'Sankri requires 8–9 hours from Delhi, which makes a standard Friday–Sunday weekend tight. It works well for extended weekends or 3-day holidays where you have Friday off or can depart Thursday evening. For a regular 2-night weekend, Chakrata and Rishikesh are more practical. If Sankri is your priority, a 3-night format is recommended.',
  },
  {
    question: 'What is included in a 2-night weekend retreat?',
    answer:
      'A typical 2-night weekend retreat includes accommodation, all meals from Friday dinner through Sunday breakfast, two full yoga and meditation sessions per day, one guided nature walk or forest immersion, breathwork or sound healing workshops, and integration time. Digital detox support, journaling prompts, and personalised intention-setting are included in most formats. Specific inclusions vary by location and program.',
  },
  {
    question: 'Do I need prior yoga or meditation experience?',
    answer:
      'No. Weekend retreats are designed to be accessible for first-time participants. Sessions are guided and adapted to mixed experience levels. Facilitators provide modifications for beginners and deeper variations for experienced practitioners within the same session. Many weekend participants are professionals with no formal practice — the structured environment makes entry natural rather than intimidating.',
  },
  {
    question: 'When is the best time of year for a weekend Himalayan retreat?',
    answer:
      'Weekend Himalayan retreats operate year-round, with each season offering a different quality. October–November and February–March are the most popular windows — pleasant weather, clear skies, and comfortable temperatures. Summer weekends (May–June) offer heat escape from Delhi. Winter weekends (December–January) suit those drawn to quiet introspection and smaller groups. Road conditions at higher-altitude locations like Sankri may affect winter access.',
  },
];

export default function WeekendHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Himalayan Retreats', url: buildCanonicalUrl('/retreats/himalayan-retreats') },
    { name: 'Weekend Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <AutoArticleSchema
        title="Weekend Himalayan Retreats Near Delhi"
        description="Plan a 2–3 day weekend Himalayan retreat near Delhi. Friday–Sunday corporate reset programs in Chakrata and Rishikesh with yoga, meditation and nature immersion."
        path={PATH}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Himalayan Retreats', href: '/retreats/himalayan-retreats' },
          { name: 'Weekend Retreats' },
        ]}
      />

      <article>

        <style>{`
    .wknd-loc-card { background:#fff; border:1px solid #e5e7eb; border-top:2px solid var(--color-primary); border-radius:8px; overflow:hidden; margin-bottom:1.25rem; }
    .wknd-loc-card img { width:100%; height:200px; object-fit:cover; display:block; }
    .wknd-loc-card-body { padding:1.5rem; }
    .wknd-loc-card-body h3 { font-family:var(--font-geist-sans),sans-serif; font-size:0.95rem; font-weight:500; color:#111; margin:0 0 0.85rem; letter-spacing:-0.01em; }
    .wknd-loc-card-body h3 a { color:inherit; text-decoration:none; }
    .wknd-loc-card-body h3 a:hover { color: #374151; }
    .wknd-loc-card-body p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0 0 0.75rem; }
    .wknd-loc-card-body p:last-child { margin-bottom:0; }
    .wknd-why-item { border-left:2px solid var(--color-primary); padding-left:1rem; margin-bottom:1.25rem; }
    .wknd-why-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .wknd-day-item { background:#fff; border:1px solid #e5e7eb; border-left:3px solid var(--color-primary); border-radius:8px; padding:1rem 1.25rem; margin-bottom:0.75rem; }
    .wknd-day-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .wknd-who-item { display:flex; gap:1rem; padding:0.85rem 0; border-bottom:1px solid #f0f0f0; }
    .wknd-who-item:last-child { border-bottom:none; }
    .wknd-who-dot { flex-shrink:0; margin-top:0.75rem; width:8px; height:8px; border-radius:50%; background:var(--color-primary);  }
    .wknd-who-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .wknd-plan-item { background:#fff; border:1px solid #e5e7eb; border-left:3px solid var(--color-primary); border-radius:8px; padding:1rem 1.25rem; margin-bottom:0.75rem; }
    .wknd-plan-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .wknd-nav-link { display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1rem; border-bottom:1px solid #f0f0f0; font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; color:#333; text-decoration:none; }
    .wknd-nav-link:hover { background:#f7f9f7; color: #374151; }
    .wknd-nav-link.back::before { content:'←'; color: #374151;  margin-right:0.5rem; }
    .wknd-nav-link:not(.back)::after { content:'→'; color: #374151;  }
    .wknd-nav-group { border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
    .wknd-nav-group .wknd-nav-link:last-child { border-bottom:none; }
    @media(max-width:640px){
      .wknd-loc-card img { height:160px; }
      .wknd-loc-card-body { padding:1.1rem; }
      .wknd-day-item, .wknd-plan-item { padding:0.85rem 1rem; }
    }
  `}</style>

  {/* ── HERO ── */}
  <style>{`
    .wknd-hero {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      position:relative;
      overflow:hidden;
      background:
        radial-gradient(circle at 12% 18%, rgba(217,180,111,0.16), transparent 28%),
        radial-gradient(circle at 88% 14%, rgba(15,118,110,0.18), transparent 30%),
        linear-gradient(135deg, #fbfaf5 0%, #f4f7f1 58%, #102019 58%, #102019 100%);
      padding:4.75rem 0;
      border-bottom:1px solid rgba(15,118,110,0.14);
    }
    .wknd-hero::before {
      content:'';
      position:absolute;
      inset:0;
      background:linear-gradient(90deg, rgba(255,255,255,0.08), transparent 38%, rgba(0,0,0,0.08));
      pointer-events:none;
    }
    .wknd-hero-inner {
      position:relative;
      z-index:1;
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
      display:grid;
      grid-template-columns:1.02fr 0.98fr;
      gap:2.25rem;
      align-items:center;
    }
    .wknd-hero-copy {
      max-width:46rem;
    }
    .wknd-eyebrow {
      display:flex;
      align-items:center;
      gap:0.75rem;
      margin-bottom:1.35rem;
    }
    .wknd-eyebrow-line {
      width:34px;
      height:1px;
      background:#d9b46f;
      flex-shrink:0;
    }
    .wknd-eyebrow-text {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.72rem;
      letter-spacing:0.24em;
      text-transform:uppercase;
      font-weight:850;
      color:#102019;
    }
    .wknd-hero-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.5rem,5.7vw,5.15rem);
      line-height:0.95;
      letter-spacing:-0.075em;
      font-weight:230;
      color:#101010;
      margin:0 0 1.25rem;
      text-wrap:balance;
    }
    .wknd-hero-title span {
      color:#0f766e;
    }
    .wknd-hero-lead {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1rem,1.35vw,1.15rem);
      line-height:1.85;
      font-weight:300;
      color:#4b5563;
      margin:0 0 1rem;
      max-width:44rem;
    }
    .wknd-hero-proof {
      display:flex;
      flex-wrap:wrap;
      gap:0.5rem;
      margin:1.55rem 0 2rem;
    }
    .wknd-hero-proof span {
      display:inline-flex;
      align-items:center;
      border-radius:999px;
      padding:0.38rem 0.72rem;
      background:rgba(15,118,110,0.08);
      border:1px solid rgba(15,118,110,0.14);
      color:#374151;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.68rem;
      font-weight:800;
      letter-spacing:0.06em;
      text-transform:uppercase;
    }
    .wknd-hero-actions {
      display:flex;
      flex-wrap:wrap;
      gap:0.75rem;
      align-items:center;
      margin-top:0.25rem;
    }
    .wknd-hero-btn {
      display:inline-flex;
      align-items:center;
      justify-content:center;
      min-height:46px;
      padding:0.82rem 1.15rem;
      border-radius:999px;
      background:#102019;
      color:#fff;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.84rem;
      font-weight:900;
      text-decoration:none;
      transition:transform 0.2s ease;
    }
    .wknd-hero-btn:hover {
      transform:translateY(-2px);
    }
    .wknd-hero-btn-secondary {
      background:rgba(15,118,110,0.08);
      color:#102019;
      border:1px solid rgba(15,118,110,0.16);
    }
    .wknd-hero-card {
      position:relative;
      border-radius:34px;
      background:linear-gradient(180deg, rgba(20,42,34,0.98) 0%, rgba(10,26,21,0.99) 100%);
      border:1px solid rgba(217,180,111,0.18);
      box-shadow:0 24px 80px rgba(0,0,0,0.28);
      color:#fff;
      padding:1rem;
      overflow:hidden;
      max-width:100%;
    }
    .wknd-hero-card::before {
      content:'';
      position:absolute;
      inset:1rem;
      border-radius:28px;
      border:1px solid rgba(217,180,111,0.12);
      pointer-events:none;
    }
    .wknd-hero-card-top,
    .wknd-hero-flow,
    .wknd-hero-card-bottom {
      position:relative;
      z-index:1;
    }
    .wknd-hero-card-top {
      padding:1rem 1rem 0.35rem;
    }
    .wknd-hero-kicker {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.68rem;
      letter-spacing:0.18em;
      text-transform:uppercase;
      font-weight:900;
      color:#d9b46f;
      margin:0 0 0.7rem;
    }
    .wknd-hero-card-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.5rem,2.7vw,2.2rem);
      line-height:1.05;
      letter-spacing:-0.055em;
      font-weight:420;
      color:#fff;
      margin:0;
    }
    .wknd-hero-flow {
      display:grid;
      gap:0.65rem;
      padding:0.8rem 0.65rem;
    }
    .wknd-flow-step {
      display:grid;
      grid-template-columns:auto 1fr;
      gap:0.75rem;
      align-items:start;
      padding:0.85rem;
      border-radius:20px;
      background:rgba(255,255,255,0.06);
      border:1px solid rgba(255,255,255,0.10);
    }
    .wknd-flow-day {
      width:44px;
      height:44px;
      border-radius:17px;
      background:#d9b46f;
      color:#111;
      display:flex;
      align-items:center;
      justify-content:center;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.72rem;
      font-weight:950;
      letter-spacing:0.08em;
      text-transform:uppercase;
      flex-shrink:0;
    }
    .wknd-flow-step strong {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:1rem;
      line-height:1.15;
      letter-spacing:-0.03em;
      color:#fff;
      margin-bottom:0.3rem;
    }
    .wknd-flow-step span {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.76rem;
      line-height:1.5;
      color:rgba(255,255,255,0.78);
    }
    .wknd-hero-card-bottom {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:0.55rem;
      padding:0 0.65rem 0.65rem;
    }
    .wknd-hero-stat {
      border-radius:18px;
      background:rgba(217,180,111,0.10);
      border:1px solid rgba(217,180,111,0.16);
      padding:0.8rem;
    }
    .wknd-hero-stat strong {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:1.15rem;
      letter-spacing:-0.04em;
      color:#d9b46f;
      margin-bottom:0.2rem;
    }
    .wknd-hero-stat span {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.68rem;
      line-height:1.35;
      color:rgba(255,255,255,0.64);
    }
    @media(max-width:900px){
      .wknd-hero {
        background:
          radial-gradient(circle at 12% 18%, rgba(217,180,111,0.18), transparent 28%),
          linear-gradient(180deg, #fbfaf5 0%, #f4f7f1 56%, #102019 56%, #102019 100%);
      }
      .wknd-hero-inner {
        grid-template-columns:1fr;
        gap:2rem;
      }
    }
    @media(max-width:640px){
      .wknd-hero { padding:4.5rem 0 3.5rem; }
      .wknd-hero-inner { padding:0 1.25rem; }
      .wknd-hero-card-bottom { grid-template-columns:1fr; }
    }
  `}</style>

  <section className="wknd-hero">
    <div className="wknd-hero-inner">
      <div className="wknd-hero-copy">
        <div className="wknd-eyebrow">
          <span className="wknd-eyebrow-line" />
          <span className="wknd-eyebrow-text">Weekend Retreats · Delhi NCR</span>
        </div>

        <h1 className="wknd-hero-title">
          Leave Friday. <span>Reset Saturday.</span> Return Sunday.
        </h1>

        <p className="wknd-hero-lead">
          Most professionals in Delhi and NCR know they need a break. The problem is not awareness — it is logistics. A weekend retreat removes the planning barrier entirely.
        </p>

        <p className="wknd-hero-lead">
          Two nights in the Himalayas — Friday evening to Sunday afternoon — is enough to reset sleep, break the screen cycle, and return to work with a clarity that no amount of weekend sleeping-in can deliver.
        </p>

        <div className="wknd-hero-proof">
          <span>No flights</span>
          <span>No annual leave</span>
          <span>5–7 hours from Delhi</span>
          <span>2-night reset</span>
        </div>

        <div className="wknd-hero-actions">
          <Link href="#weekend-retreat-planner" className="wknd-hero-btn">
            Plan My Weekend Retreat
          </Link>
          <Link href="#weekend-locations" className="wknd-hero-btn wknd-hero-btn-secondary">
            See Weekend Locations
          </Link>
        </div>
      </div>

      <div className="wknd-hero-card" aria-label="Weekend retreat timeline">
        <div className="wknd-hero-card-top">
          <p className="wknd-hero-kicker">48-hour reset plan</p>
          <p className="wknd-hero-card-title">A complete retreat arc without taking leave.</p>
        </div>

        <div className="wknd-hero-flow">
          <div className="wknd-flow-step">
            <div className="wknd-flow-day">Fri</div>
            <div>
              <strong>Depart after work</strong>
              <span>Drive from Delhi/NCR and arrive into mountain air by night.</span>
            </div>
          </div>

          <div className="wknd-flow-step">
            <div className="wknd-flow-day">Sat</div>
            <div>
              <strong>Full immersion</strong>
              <span>Yoga, breathwork, nature, silence, meals, and guided integration.</span>
            </div>
          </div>

          <div className="wknd-flow-step">
            <div className="wknd-flow-day">Sun</div>
            <div>
              <strong>Return clear</strong>
              <span>Morning practice, breakfast, closing circle, and back to Delhi by evening.</span>
            </div>
          </div>
        </div>

        <div className="wknd-hero-card-bottom">
          <div className="wknd-hero-stat">
            <strong>2N</strong>
            <span>standard format</span>
          </div>
          <div className="wknd-hero-stat">
            <strong>0</strong>
            <span>leave days needed</span>
          </div>
          <div className="wknd-hero-stat">
            <strong>3</strong>
            <span>strong locations</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="weekend-retreat-planner">
    <PrimaryCTA label="Plan My Weekend Retreat" subtext="Ready for a weekend reset? A planner can help organise it." vertical="retreat" category="weekend" sourcePath="/retreats/weekend-himalayan-retreats" />
  </section>

  {/* ── WHY IT WORKS ── */}
  <style>{`
    .wknd-proof {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at top right, rgba(15,118,110,0.12), transparent 30%),
        linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .wknd-proof-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .wknd-proof-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2rem;
    }
    .wknd-proof-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.7rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .wknd-proof-title span {
      color:#0f766e;
    }
    .wknd-proof-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .wknd-proof-grid {
      display:grid;
      grid-template-columns:repeat(4,minmax(0,1fr));
      gap:1rem;
      margin-top:2rem;
    }
    .wknd-proof-card {
      position:relative;
      overflow:hidden;
      min-height:310px;
      border-radius:30px;
      border:1px solid rgba(17,24,39,0.08);
      background:#fff;
      padding:1.35rem;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      box-shadow:0 24px 80px rgba(17,24,39,0.07);
    }
    .wknd-proof-card::before {
      content:'';
      position:absolute;
      inset:0;
      background:radial-gradient(circle at top right, rgba(15,118,110,0.1), transparent 34%);
      pointer-events:none;
    }
    .wknd-proof-card:nth-child(2)::before {
      background:radial-gradient(circle at top right, rgba(217,180,111,0.16), transparent 34%);
    }
    .wknd-proof-card:nth-child(3) {
      background:#102019;
      color:#fff;
      border-color:rgba(255,255,255,0.12);
    }
    .wknd-proof-card:nth-child(3)::before {
      background:radial-gradient(circle at top right, rgba(217,180,111,0.18), transparent 34%);
    }
    .wknd-proof-card > * {
      position:relative;
      z-index:1;
    }
    .wknd-proof-num {
      display:flex;
      align-items:center;
      justify-content:center;
      width:42px;
      height:42px;
      border-radius:16px;
      background:#d9b46f;
      color:#111;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.78rem;
      font-weight:950;
      margin-bottom:1.4rem;
    }
    .wknd-proof-card h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.25rem,2vw,1.8rem);
      line-height:1.02;
      letter-spacing:-0.055em;
      font-weight:650;
      color:#111;
      margin:0 0 0.85rem;
      text-wrap:balance;
    }
    .wknd-proof-card:nth-child(3) h3 {
      color:#fff;
    }
    .wknd-proof-card p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.84rem;
      font-weight:300;
      line-height:1.72;
      color:#4b5563;
      margin:0;
    }
    .wknd-proof-card:nth-child(3) p {
      color:rgba(255,255,255,0.72);
    }
    .wknd-proof-card a {
      color:#0f766e;
      font-weight:760;
      text-decoration:none;
    }
    .wknd-proof-card:nth-child(3) a {
      color:#d9b46f;
    }
    .wknd-proof-card a:hover {
      text-decoration:underline;
    }
    .wknd-proof-bottom {
      margin-top:1rem;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:1.25rem;
      border-radius:30px;
      background:#102019;
      border:1px solid rgba(217,180,111,0.18);
      box-shadow:0 24px 80px rgba(17,24,39,0.12);
      padding:1.25rem 1.35rem;
      overflow:hidden;
    }
    .wknd-proof-bottom p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.9rem;
      font-weight:300;
      line-height:1.75;
      color:rgba(255,255,255,0.76);
      margin:0;
      max-width:48rem;
    }
    .wknd-proof-bottom strong {
      color:#d9b46f;
      font-weight:850;
    }
    .wknd-proof-bottom-btn {
      display:inline-flex;
      align-items:center;
      justify-content:center;
      min-height:44px;
      padding:0.78rem 1.05rem;
      border-radius:999px;
      background:#d9b46f;
      color:#111;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.82rem;
      font-weight:900;
      text-decoration:none;
      white-space:nowrap;
      transition:transform 0.2s ease;
    }
    .wknd-proof-bottom-btn:hover {
      transform:translateY(-2px);
    }

    @media(max-width:1050px){
      .wknd-proof-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
      .wknd-proof-card { min-height:250px; }
    }
    @media(max-width:760px){
      .wknd-proof { padding:4rem 0; }
      .wknd-proof-inner { padding:0 1.25rem; }
      .wknd-proof-head { grid-template-columns:1fr; align-items:start; }
      .wknd-proof-grid { grid-template-columns:1fr; }
      .wknd-proof-card { min-height:auto; }
      .wknd-proof-bottom {
        flex-direction:column;
        align-items:flex-start;
      }
      .wknd-proof-bottom-btn {
        width:100%;
      }
    }
  `}</style>

  <section className="wknd-proof scroll-fade">
    <div className="wknd-proof-inner">
      <div className="wknd-proof-head">
        <div>
          <div className="wknd-eyebrow">
            <span className="wknd-eyebrow-line" />
            <span className="wknd-eyebrow-text">Why It Works</span>
          </div>

          <h2 className="wknd-proof-title">
            Why <span>48 hours</span> can work.
          </h2>
        </div>

        <p className="wknd-proof-copy">
          The assumption that meaningful retreat requires a week is wrong. Environment change — not duration — is the primary driver of cognitive reset. Moving from an urban, screen-dominated context into a structured mountain environment triggers neurological downshift within hours.
        </p>
      </div>

      <div className="wknd-proof-grid">
        <div className="wknd-proof-card">
          <div>
            <div className="wknd-proof-num">01</div>
            <h3>No leave required.</h3>
            <p>A Friday evening departure and Sunday evening return uses zero annual leave. For mid-career professionals and founders who guard their leave days, this is the critical advantage.</p>
          </div>
        </div>

        <div className="wknd-proof-card">
          <div>
            <div className="wknd-proof-num">02</div>
            <h3>Minimal travel fatigue.</h3>
            <p>Five to seven hours by road from Delhi is shorter than most domestic flights once you factor in airport time. You arrive tired from travel, which often helps the first night’s sleep.</p>
          </div>
        </div>

        <div className="wknd-proof-card">
          <div>
            <div className="wknd-proof-num">03</div>
            <h3>Structured intensity.</h3>
            <p>Weekend retreats are compressed by design — early morning sessions, full-day immersion, evening integration. A focused 48-hour <Link href="/retreats/journeys/burnout-recovery">burnout recovery</Link> retreat can deliver more reset than an unstructured holiday.</p>
          </div>
        </div>

        <div className="wknd-proof-card">
          <div>
            <div className="wknd-proof-num">04</div>
            <h3>Repeatable rhythm.</h3>
            <p>A single week-long retreat per year is meaningful. A <Link href="/retreats/journeys/weekend-retreat">weekend retreat</Link> every quarter is transformational. The proximity of the Himalayas to Delhi makes quarterly reset practical.</p>
          </div>
        </div>
      </div>

      <div className="wknd-proof-bottom">
        <p>
          <strong>Simple rule:</strong> two full days in the right container is enough to complete the loop — arrive, downshift, immerse, integrate, return.
        </p>
        <Link href="/contact" className="wknd-proof-bottom-btn">
          Plan My Weekend Retreat
        </Link>
      </div>
    </div>
  </section>

  {/* ── LOCATIONS ── */}
  <style>{`
    .wknd-locations {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at top left, rgba(217,180,111,0.12), transparent 30%),
        linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .wknd-locations-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .wknd-locations-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .wknd-locations-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.6rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .wknd-locations-title span {
      color:#0f766e;
    }
    .wknd-locations-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .wknd-location-stack {
      display:grid;
      gap:1rem;
    }
    .wknd-location-row {
      display:grid;
      grid-template-columns:0.42fr 0.58fr;
      min-height:360px;
      border-radius:34px;
      overflow:hidden;
      border:1px solid rgba(17,24,39,0.08);
      background:#fff;
      box-shadow:0 24px 80px rgba(17,24,39,0.07);
    }
    .wknd-location-row-feature {
      background:#102019;
      border-color:rgba(217,180,111,0.18);
      color:#fff;
    }
    .wknd-location-row-alt {
      grid-template-columns:0.58fr 0.42fr;
    }
    .wknd-location-media {
      position:relative;
      min-height:360px;
      overflow:hidden;
      background:#102019;
    }
    .wknd-location-media img {
      width:100%;
      height:100%;
      object-fit:cover;
      display:block;
    }
    .wknd-location-row-feature .wknd-location-media img {
      opacity:0.76;
    }
    .wknd-location-body {
      padding:2rem;
      display:flex;
      flex-direction:column;
      justify-content:center;
    }
    .wknd-location-label {
      display:inline-flex;
      width:max-content;
      max-width:100%;
      border-radius:999px;
      padding:0.42rem 0.78rem;
      background:rgba(15,118,110,0.08);
      border:1px solid rgba(15,118,110,0.16);
      color:#0f766e;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.7rem;
      font-weight:900;
      letter-spacing:0.12em;
      text-transform:uppercase;
      margin-bottom:1rem;
    }
    .wknd-location-row-feature .wknd-location-label,
    .wknd-location-row-dark .wknd-location-label {
      background:rgba(217,180,111,0.12);
      border-color:rgba(217,180,111,0.24);
      color:#d9b46f;
    }
    .wknd-location-body h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.8rem,4vw,3.65rem);
      line-height:0.98;
      letter-spacing:-0.07em;
      font-weight:250;
      color:#111;
      margin:0 0 1rem;
      text-wrap:balance;
    }
    .wknd-location-row-feature .wknd-location-body h3,
    .wknd-location-row-dark .wknd-location-body h3 {
      color:#fff;
    }
    .wknd-location-body h3 a {
      color:inherit;
      text-decoration:none;
    }
    .wknd-location-body p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.9rem;
      line-height:1.78;
      font-weight:300;
      color:#4b5563;
      margin:0 0 0.85rem;
      max-width:44rem;
    }
    .wknd-location-row-feature .wknd-location-body p,
    .wknd-location-row-dark .wknd-location-body p {
      color:rgba(255,255,255,0.74);
    }
    .wknd-location-body a {
      color:#0f766e;
      font-weight:760;
      text-decoration:none;
    }
    .wknd-location-row-feature .wknd-location-body a,
    .wknd-location-row-dark .wknd-location-body a {
      color:#d9b46f;
    }
    .wknd-location-body a:hover {
      text-decoration:underline;
    }
    .wknd-location-facts {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:0.65rem;
      margin:1.1rem 0 1.25rem;
    }
    .wknd-location-fact {
      border-radius:18px;
      background:#f7f9f7;
      border:1px solid rgba(17,24,39,0.08);
      padding:0.82rem;
    }
    .wknd-location-row-feature .wknd-location-fact,
    .wknd-location-row-dark .wknd-location-fact {
      background:rgba(255,255,255,0.07);
      border-color:rgba(255,255,255,0.12);
    }
    .wknd-location-fact strong {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.68rem;
      letter-spacing:0.1em;
      text-transform:uppercase;
      color:#0f766e;
      margin-bottom:0.35rem;
    }
    .wknd-location-row-feature .wknd-location-fact strong,
    .wknd-location-row-dark .wknd-location-fact strong {
      color:#d9b46f;
    }
    .wknd-location-fact span {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.74rem;
      line-height:1.48;
      color:#4b5563;
    }
    .wknd-location-row-feature .wknd-location-fact span,
    .wknd-location-row-dark .wknd-location-fact span {
      color:rgba(255,255,255,0.68);
    }
    .wknd-location-actions {
      display:flex;
      flex-wrap:wrap;
      gap:0.75rem;
      margin-top:0.35rem;
    }
    .wknd-location-btn {
      display:inline-flex;
      align-items:center;
      justify-content:center;
      min-height:44px;
      padding:0.78rem 1.05rem;
      border-radius:999px;
      background:#102019;
      color:#fff !important;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.82rem;
      font-weight:900;
      text-decoration:none !important;
      transition:transform 0.2s ease;
    }
    .wknd-location-row-feature .wknd-location-btn,
    .wknd-location-row-dark .wknd-location-btn {
      background:#d9b46f;
      color:#111 !important;
    }
    .wknd-location-btn:hover {
      transform:translateY(-2px);
      text-decoration:none !important;
    }
    .wknd-location-row-dark {
      background:#102019;
      color:#fff;
      border-color:rgba(255,255,255,0.12);
    }
    @media(max-width:900px){
      .wknd-locations-head { grid-template-columns:1fr; align-items:start; }
      .wknd-location-row,
      .wknd-location-row-alt {
        grid-template-columns:1fr;
      }
      .wknd-location-row-alt .wknd-location-media {
        order:0;
      }
      .wknd-location-row-alt .wknd-location-body {
        order:1;
      }
      .wknd-location-media {
        min-height:240px;
      }
    }
    @media(max-width:640px){
      .wknd-locations { padding:4rem 0; }
      .wknd-locations-inner { padding:0 1.25rem; }
      .wknd-location-body { padding:1.35rem; }
      .wknd-location-facts { grid-template-columns:1fr; }
      .wknd-location-btn { width:100%; }
    }
  `}</style>

  <section id="weekend-locations" className="wknd-locations scroll-fade">
    <div className="wknd-locations-inner">
      <div className="wknd-locations-head">
        <div>
          <div className="wknd-eyebrow">
            <span className="wknd-eyebrow-line" />
            <span className="wknd-eyebrow-text">Three Locations</span>
          </div>

          <h2 className="wknd-locations-title">
            Choose by <span>weekend window.</span>
          </h2>
        </div>

        <p className="wknd-locations-copy">
          Not every mountain destination works for a weekend. The travel time must leave enough hours for genuine programming without the journey consuming the experience.
        </p>
      </div>

      <div className="wknd-location-stack">
        <div className="wknd-location-row wknd-location-row-feature">
          <div className="wknd-location-media">
            <Image src="/Images/location/chakrata.webp" alt="Chakrata — deodar forest ridge retreat near Dehradun, 6–7 hours from Delhi" width={620} height={460} sizes="(max-width: 900px) 100vw, 42vw" quality={75} />
          </div>

          <div className="wknd-location-body">
            <div className="wknd-location-label">Best 2-night forest reset</div>
            <h3><Link href="/retreats/chakrata">Chakrata — 6–7 hours from Delhi</Link></h3>

            <p>
              Chakrata is arguably the strongest weekend retreat destination from Delhi. At approximately 2,200 metres on a quiet cantonment ridge, it offers genuine mountain environment without extreme altitude or tourist congestion.
            </p>

            <div className="wknd-location-facts">
              <div className="wknd-location-fact">
                <strong>Leave</strong>
                <span>Friday by 5 PM</span>
              </div>
              <div className="wknd-location-fact">
                <strong>Arrive</strong>
                <span>Forest-edge retreat by night</span>
              </div>
              <div className="wknd-location-fact">
                <strong>Best for</strong>
                <span>Quiet, forest, altitude reset</span>
              </div>
            </div>

            <p>
              Weekend retreat programs in <Link href="/retreats/chakrata">Chakrata</Link> typically include morning yoga on forest platforms, guided meditation walks, breathwork sessions, and campfire integration.
            </p>

            <div className="wknd-location-actions">
              <Link href="/retreats/chakrata" className="wknd-location-btn">View Chakrata retreats</Link>
            </div>
          </div>
        </div>

        <div className="wknd-location-row wknd-location-row-alt">
          <div className="wknd-location-body">
            <div className="wknd-location-label">Fastest yoga weekend</div>
            <h3><Link href="/retreats/rishikesh">Rishikesh — 5–6 hours</Link></h3>

            <p>
              Rishikesh is the fastest Himalayan destination from Delhi and the most established centre for <Link href="/retreats/journeys/yoga-and-movement">yoga and movement</Link> practice in India.
            </p>

            <div className="wknd-location-facts">
              <div className="wknd-location-fact">
                <strong>Setting</strong>
                <span>Ganges riverside</span>
              </div>
              <div className="wknd-location-fact">
                <strong>Strength</strong>
                <span>Experienced teachers</span>
              </div>
              <div className="wknd-location-fact">
                <strong>Best for</strong>
                <span>Guided yoga and meditation</span>
              </div>
            </div>

            <p>
              Weekend formats in <Link href="/retreats/rishikesh">Rishikesh</Link> suit participants who want structured practice rather than open-ended nature immersion.
            </p>

            <div className="wknd-location-actions">
              <Link href="/retreats/rishikesh" className="wknd-location-btn">View Rishikesh retreats</Link>
            </div>
          </div>

          <div className="wknd-location-media">
            <Image src="/Images/location/rishikesh.webp" alt="Rishikesh — Ganges riverside yoga and meditation, 5–6 hours from Delhi" width={620} height={460} sizes="(max-width: 900px) 100vw, 42vw" quality={70} />
          </div>
        </div>

        <div className="wknd-location-row wknd-location-row-dark">
          <div className="wknd-location-media">
            <Image src="/Images/location/sankri.webp" alt="Sankri — remote Himalayan valley near Govind Wildlife Sanctuary, extended weekend" width={620} height={460} sizes="(max-width: 900px) 100vw, 42vw" quality={70} />
          </div>

          <div className="wknd-location-body">
            <div className="wknd-location-label">Extended weekend wilderness</div>
            <h3><Link href="/retreats/sankri">Sankri — 8–9 hours</Link></h3>

            <p>
              Sankri sits deeper in the Himalayas, so a standard Friday–Sunday weekend is tight. It works well for extended weekends and three-day holidays.
            </p>

            <div className="wknd-location-facts">
              <div className="wknd-location-fact">
                <strong>Works when</strong>
                <span>You have Friday off</span>
              </div>
              <div className="wknd-location-fact">
                <strong>Setting</strong>
                <span>Remote valley</span>
              </div>
              <div className="wknd-location-fact">
                <strong>Best for</strong>
                <span>Digital silence</span>
              </div>
            </div>

            <p>
              For a longer comparison of retreat formats by duration, see our guide to <Link href="/blog/3-day-vs-5-day-himalayan-retreat">choosing the right retreat length</Link>.
            </p>

            <div className="wknd-location-actions">
              <Link href="/retreats/sankri" className="wknd-location-btn">View Sankri retreats</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ── WHAT IT LOOKS LIKE ── */}
  <style>{`
    .wknd-timeline {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at 88% 12%, rgba(217,180,111,0.14), transparent 28%),
        linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .wknd-timeline-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .wknd-timeline-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .wknd-timeline-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.6rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .wknd-timeline-title span {
      color:#0f766e;
    }
    .wknd-timeline-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .wknd-timeline-board {
      position:relative;
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:1rem;
    }
    .wknd-timeline-board::before {
      content:'';
      position:absolute;
      left:7%;
      right:7%;
      top:72px;
      height:1px;
      background:linear-gradient(90deg, transparent, rgba(15,118,110,0.28), transparent);
      pointer-events:none;
    }
    .wknd-time-card {
      position:relative;
      z-index:1;
      border-radius:34px;
      border:1px solid rgba(17,24,39,0.08);
      background:#fff;
      box-shadow:0 24px 80px rgba(17,24,39,0.07);
      padding:1.5rem;
      min-height:430px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      overflow:hidden;
    }
    .wknd-time-card::before {
      content:'';
      position:absolute;
      inset:0;
      background:radial-gradient(circle at top right, rgba(15,118,110,0.1), transparent 34%);
      pointer-events:none;
    }
    .wknd-time-card-main {
      background:#102019;
      border-color:rgba(217,180,111,0.18);
      color:#fff;
    }
    .wknd-time-card-main::before {
      background:radial-gradient(circle at top right, rgba(217,180,111,0.18), transparent 36%);
    }
    .wknd-time-card > * {
      position:relative;
      z-index:1;
    }
    .wknd-time-dot {
      display:flex;
      align-items:center;
      justify-content:center;
      width:72px;
      height:72px;
      border-radius:24px;
      background:#d9b46f;
      color:#111;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.78rem;
      font-weight:950;
      letter-spacing:0.12em;
      text-transform:uppercase;
      margin-bottom:1.25rem;
      box-shadow:0 14px 40px rgba(217,180,111,0.28);
    }
    .wknd-time-label {
      display:inline-flex;
      width:max-content;
      max-width:100%;
      border-radius:999px;
      padding:0.4rem 0.72rem;
      background:rgba(15,118,110,0.08);
      border:1px solid rgba(15,118,110,0.16);
      color:#0f766e;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.68rem;
      font-weight:900;
      letter-spacing:0.11em;
      text-transform:uppercase;
      margin-bottom:1rem;
    }
    .wknd-time-card-main .wknd-time-label {
      background:rgba(217,180,111,0.12);
      border-color:rgba(217,180,111,0.24);
      color:#d9b46f;
    }
    .wknd-time-card h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.55rem,3vw,2.65rem);
      line-height:0.98;
      letter-spacing:-0.065em;
      font-weight:260;
      color:#111;
      margin:0 0 1rem;
      text-wrap:balance;
    }
    .wknd-time-card-main h3 {
      color:#fff;
    }
    .wknd-time-card p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.88rem;
      line-height:1.78;
      font-weight:300;
      color:#4b5563;
      margin:0;
    }
    .wknd-time-card-main p {
      color:rgba(255,255,255,0.74);
    }
    .wknd-time-list {
      display:grid;
      gap:0.55rem;
      margin-top:1.25rem;
    }
    .wknd-time-list span {
      display:flex;
      align-items:center;
      gap:0.55rem;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.78rem;
      line-height:1.45;
      color:#334155;
      font-weight:650;
    }
    .wknd-time-card-main .wknd-time-list span {
      color:rgba(255,255,255,0.76);
    }
    .wknd-time-list span::before {
      content:'';
      width:7px;
      height:7px;
      border-radius:50%;
      background:#0f766e;
      flex-shrink:0;
    }
    .wknd-time-card-main .wknd-time-list span::before {
      background:#d9b46f;
    }
    .wknd-timeline-note {
      margin-top:1rem;
      border-radius:30px;
      background:#fff;
      border:1px solid rgba(17,24,39,0.08);
      box-shadow:0 24px 80px rgba(17,24,39,0.06);
      padding:1.25rem 1.35rem;
    }
    .wknd-timeline-note p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.9rem;
      font-weight:300;
      line-height:1.75;
      color:#4b5563;
      margin:0;
    }
    .wknd-timeline-note strong {
      color:#111;
      font-weight:850;
    }
    @media(max-width:980px){
      .wknd-timeline-head { grid-template-columns:1fr; align-items:start; }
      .wknd-timeline-board { grid-template-columns:1fr; }
      .wknd-timeline-board::before { display:none; }
      .wknd-time-card { min-height:auto; }
    }
    @media(max-width:640px){
      .wknd-timeline { padding:4rem 0; }
      .wknd-timeline-inner { padding:0 1.25rem; }
      .wknd-time-card { padding:1.25rem; border-radius:26px; }
      .wknd-time-dot { width:60px; height:60px; border-radius:20px; }
    }
  `}</style>

  <section className="wknd-timeline scroll-fade">
    <div className="wknd-timeline-inner">
      <div className="wknd-timeline-head">
        <div>
          <div className="wknd-eyebrow">
            <span className="wknd-eyebrow-line" />
            <span className="wknd-eyebrow-text">A Typical Weekend</span>
          </div>

          <h2 className="wknd-timeline-title">
            The full reset arc, <span>Friday to Sunday.</span>
          </h2>
        </div>

        <p className="wknd-timeline-copy">
          Weekend retreats follow a compressed but complete arc — arrival, immersion, and integration within 48 hours.
        </p>
      </div>

      <div className="wknd-timeline-board">
        <div className="wknd-time-card">
          <div>
            <div className="wknd-time-dot">Fri</div>
            <div className="wknd-time-label">Arrival and settling</div>
            <h3>Arrive late. Do less.</h3>
            <p>
              Most participants arrive between 10 PM and midnight after the drive from Delhi. A light welcome — herbal tea, room orientation, and a brief grounding exercise — marks the transition from travel mode to retreat mode.
            </p>
          </div>

          <div className="wknd-time-list">
            <span>No heavy programming</span>
            <span>Travel fatigue becomes the bridge</span>
            <span>First deep mountain sleep</span>
          </div>
        </div>

        <div className="wknd-time-card wknd-time-card-main">
          <div>
            <div className="wknd-time-dot">Sat</div>
            <div className="wknd-time-label">Full immersion day</div>
            <h3>The day that does the work.</h3>
            <p>
              Saturday is the core of the retreat. Pre-dawn meditation or gentle yoga, a full morning practice session with breathwork, guided nature walk or forest immersion after lunch, an afternoon workshop, and an evening integration circle.
            </p>
          </div>

          <div className="wknd-time-list">
            <span>Yoga and breathwork</span>
            <span>Nature walk or forest immersion</span>
            <span>Workshop, meals, silence, integration</span>
          </div>
        </div>

        <div className="wknd-time-card">
          <div>
            <div className="wknd-time-dot">Sun</div>
            <div className="wknd-time-label">Closing and departure</div>
            <h3>Return before Monday arrives.</h3>
            <p>
              Sunday begins with a final morning practice — often the most powerful session, because the body and mind have already shifted from the previous day’s immersion. A closing circle anchors the experience before departure.
            </p>
          </div>

          <div className="wknd-time-list">
            <span>Final morning practice</span>
            <span>Breakfast and intention-setting</span>
            <span>Back to Delhi by evening</span>
          </div>
        </div>
      </div>

      <div className="wknd-timeline-note">
        <p>
          <strong>Why this format works:</strong> Friday removes you from the city, Saturday creates the immersion, and Sunday converts the retreat into something you can carry back into work.
        </p>
      </div>
    </div>
  </section>

  {/* ── WHO IS IT FOR ── */}
  <style>{`
    .wknd-audience {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at top left, rgba(15,118,110,0.1), transparent 30%),
        linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .wknd-audience-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .wknd-audience-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .wknd-audience-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.6rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .wknd-audience-title span {
      color:#0f766e;
    }
    .wknd-audience-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .wknd-audience-grid {
      display:grid;
      grid-template-columns:repeat(6,minmax(0,1fr));
      gap:1rem;
    }
    .wknd-audience-card {
      position:relative;
      overflow:hidden;
      border-radius:30px;
      border:1px solid rgba(17,24,39,0.08);
      background:#fff;
      box-shadow:0 24px 80px rgba(17,24,39,0.07);
      padding:1.35rem;
      min-height:275px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .wknd-audience-card::before {
      content:'';
      position:absolute;
      inset:0;
      background:radial-gradient(circle at top right, rgba(15,118,110,0.1), transparent 34%);
      pointer-events:none;
    }
    .wknd-audience-card > * {
      position:relative;
      z-index:1;
    }
    .wknd-audience-card:nth-child(1),
    .wknd-audience-card:nth-child(2),
    .wknd-audience-card:nth-child(3) {
      grid-column:span 2;
    }
    .wknd-audience-card:nth-child(4),
    .wknd-audience-card:nth-child(5) {
      grid-column:span 3;
    }
    .wknd-audience-card-primary {
      background:#102019;
      border-color:rgba(217,180,111,0.18);
      color:#fff;
    }
    .wknd-audience-card-primary::before {
      background:radial-gradient(circle at top right, rgba(217,180,111,0.18), transparent 36%);
    }
    .wknd-audience-top {
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:1rem;
      margin-bottom:1.25rem;
    }
    .wknd-audience-label {
      display:inline-flex;
      width:max-content;
      max-width:100%;
      border-radius:999px;
      padding:0.4rem 0.72rem;
      background:rgba(15,118,110,0.08);
      border:1px solid rgba(15,118,110,0.16);
      color:#0f766e;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.68rem;
      font-weight:900;
      letter-spacing:0.11em;
      text-transform:uppercase;
    }
    .wknd-audience-card-primary .wknd-audience-label {
      background:rgba(217,180,111,0.12);
      border-color:rgba(217,180,111,0.24);
      color:#d9b46f;
    }
    .wknd-audience-num {
      display:flex;
      align-items:center;
      justify-content:center;
      width:42px;
      height:42px;
      border-radius:16px;
      background:#d9b46f;
      color:#111;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.78rem;
      font-weight:950;
      flex-shrink:0;
    }
    .wknd-audience-card h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.35rem,2.6vw,2.25rem);
      line-height:1;
      letter-spacing:-0.06em;
      font-weight:300;
      color:#111;
      margin:0 0 0.9rem;
      text-wrap:balance;
    }
    .wknd-audience-card-primary h3 {
      color:#fff;
    }
    .wknd-audience-card p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.86rem;
      line-height:1.72;
      font-weight:300;
      color:#4b5563;
      margin:0;
    }
    .wknd-audience-card-primary p {
      color:rgba(255,255,255,0.74);
    }
    .wknd-audience-note {
      margin-top:1rem;
      display:grid;
      grid-template-columns:1fr auto;
      gap:1.25rem;
      align-items:center;
      border-radius:30px;
      background:#fff;
      border:1px solid rgba(17,24,39,0.08);
      box-shadow:0 24px 80px rgba(17,24,39,0.06);
      padding:1.25rem 1.35rem;
    }
    .wknd-audience-note p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.9rem;
      font-weight:300;
      line-height:1.75;
      color:#4b5563;
      margin:0;
      max-width:54rem;
    }
    .wknd-audience-note a {
      color:#0f766e;
      font-weight:800;
      text-decoration:none;
    }
    .wknd-audience-note a:hover {
      text-decoration:underline;
    }
    .wknd-audience-note-btn {
      display:inline-flex;
      align-items:center;
      justify-content:center;
      min-height:44px;
      padding:0.78rem 1.05rem;
      border-radius:999px;
      background:#102019;
      color:#fff !important;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.82rem;
      font-weight:900;
      text-decoration:none !important;
      white-space:nowrap;
      transition:transform 0.2s ease;
    }
    .wknd-audience-note-btn:hover {
      transform:translateY(-2px);
      text-decoration:none !important;
    }
    @media(max-width:980px){
      .wknd-audience-head { grid-template-columns:1fr; align-items:start; }
      .wknd-audience-grid { grid-template-columns:1fr; }
      .wknd-audience-card,
      .wknd-audience-card:nth-child(1),
      .wknd-audience-card:nth-child(2),
      .wknd-audience-card:nth-child(3),
      .wknd-audience-card:nth-child(4),
      .wknd-audience-card:nth-child(5) {
        grid-column:auto;
        min-height:auto;
      }
      .wknd-audience-note {
        grid-template-columns:1fr;
        align-items:start;
      }
      .wknd-audience-note-btn {
        width:100%;
      }
    }
    @media(max-width:640px){
      .wknd-audience { padding:4rem 0; }
      .wknd-audience-inner { padding:0 1.25rem; }
      .wknd-audience-card { padding:1.25rem; border-radius:26px; }
    }
  `}</style>

  <section className="wknd-audience scroll-fade">
    <div className="wknd-audience-inner">
      <div className="wknd-audience-head">
        <div>
          <div className="wknd-eyebrow">
            <span className="wknd-eyebrow-line" />
            <span className="wknd-eyebrow-text">Is This For You</span>
          </div>

          <h2 className="wknd-audience-title">
            Built for people who <span>cannot disappear for a week.</span>
          </h2>
        </div>

        <p className="wknd-audience-copy">
          Weekend Himalayan retreats are specifically for people whose constraints make longer programs impractical. That includes most of urban professional India.
        </p>
      </div>

      <div className="wknd-audience-grid">
        <div className="wknd-audience-card wknd-audience-card-primary">
          <div>
            <div className="wknd-audience-top">
              <span className="wknd-audience-label">Primary audience</span>
              <span className="wknd-audience-num">01</span>
            </div>
            <h3>Corporate professionals</h3>
            <p>
              People carrying decision fatigue, screen overload, and accumulated stress who cannot take a week off but urgently need restoration.
            </p>
          </div>
        </div>

        <div className="wknd-audience-card">
          <div>
            <div className="wknd-audience-top">
              <span className="wknd-audience-label">Always-on mode</span>
              <span className="wknd-audience-num">02</span>
            </div>
            <h3>Startup founders and entrepreneurs</h3>
            <p>
              Operating with no boundary between work and rest. A structured 48-hour container creates the separation that willpower alone cannot.
            </p>
          </div>
        </div>

        <div className="wknd-audience-card">
          <div>
            <div className="wknd-audience-top">
              <span className="wknd-audience-label">Perspective shift</span>
              <span className="wknd-audience-num">03</span>
            </div>
            <h3>Creatives and freelancers</h3>
            <p>
              Seeking environmental shift to unblock stalled work or reset perspective. Mountain air and digital silence deliver what no café can.
            </p>
          </div>
        </div>

        <div className="wknd-audience-card">
          <div>
            <div className="wknd-audience-top">
              <span className="wknd-audience-label">Shared reset</span>
              <span className="wknd-audience-num">04</span>
            </div>
            <h3>Couples needing a reset</h3>
            <p>
              A shared retreat experience without tourist distractions creates conversation and connection that a resort weekend does not.
            </p>
          </div>
        </div>

        <div className="wknd-audience-card">
          <div>
            <div className="wknd-audience-top">
              <span className="wknd-audience-label">Low commitment</span>
              <span className="wknd-audience-num">05</span>
            </div>
            <h3>First-time retreat participants</h3>
            <p>
              A weekend is the lowest commitment entry point. Two nights is enough to experience the retreat container without the intimidation of a full week.
            </p>
          </div>
        </div>
      </div>

      <div className="wknd-audience-note">
        <p>
          If burnout is already present, not approaching, see our dedicated <Link href="/retreats/journeys/burnout-recovery">Burnout Recovery</Link> program — available in weekend and extended formats at all locations.
        </p>
        <Link href="/retreats/journeys/burnout-recovery" className="wknd-audience-note-btn">
          View Burnout Recovery
        </Link>
      </div>
    </div>
  </section>

  {/* ── PLANNING ── */}
  <style>{`
    .wknd-planner {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at 86% 12%, rgba(15,118,110,0.12), transparent 30%),
        linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .wknd-planner-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .wknd-planner-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .wknd-planner-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.6rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .wknd-planner-title span {
      color:#0f766e;
    }
    .wknd-planner-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .wknd-planner-grid {
      display:grid;
      grid-template-columns:repeat(6,minmax(0,1fr));
      gap:1rem;
    }
    .wknd-planner-card {
      position:relative;
      overflow:hidden;
      border-radius:30px;
      border:1px solid rgba(17,24,39,0.08);
      background:#fff;
      box-shadow:0 24px 80px rgba(17,24,39,0.07);
      padding:1.35rem;
      min-height:285px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .wknd-planner-card::before {
      content:'';
      position:absolute;
      inset:0;
      background:radial-gradient(circle at top right, rgba(15,118,110,0.1), transparent 34%);
      pointer-events:none;
    }
    .wknd-planner-card > * {
      position:relative;
      z-index:1;
    }
    .wknd-planner-card:nth-child(1),
    .wknd-planner-card:nth-child(2),
    .wknd-planner-card:nth-child(3) {
      grid-column:span 2;
    }
    .wknd-planner-card:nth-child(4),
    .wknd-planner-card:nth-child(5) {
      grid-column:span 3;
    }
    .wknd-planner-card-primary {
      background:#102019;
      border-color:rgba(217,180,111,0.18);
      color:#fff;
    }
    .wknd-planner-card-primary::before {
      background:radial-gradient(circle at top right, rgba(217,180,111,0.18), transparent 36%);
    }
    .wknd-planner-top {
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:1rem;
      margin-bottom:1.15rem;
    }
    .wknd-planner-label {
      display:inline-flex;
      width:max-content;
      max-width:100%;
      border-radius:999px;
      padding:0.4rem 0.72rem;
      background:rgba(15,118,110,0.08);
      border:1px solid rgba(15,118,110,0.16);
      color:#0f766e;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.68rem;
      font-weight:900;
      letter-spacing:0.11em;
      text-transform:uppercase;
    }
    .wknd-planner-card-primary .wknd-planner-label {
      background:rgba(217,180,111,0.12);
      border-color:rgba(217,180,111,0.24);
      color:#d9b46f;
    }
    .wknd-planner-num {
      display:flex;
      align-items:center;
      justify-content:center;
      width:42px;
      height:42px;
      border-radius:16px;
      background:#d9b46f;
      color:#111;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.78rem;
      font-weight:950;
      flex-shrink:0;
    }
    .wknd-planner-card h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.35rem,2.6vw,2.25rem);
      line-height:1;
      letter-spacing:-0.06em;
      font-weight:300;
      color:#111;
      margin:0 0 0.9rem;
      text-wrap:balance;
    }
    .wknd-planner-card-primary h3 {
      color:#fff;
    }
    .wknd-planner-card p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.86rem;
      line-height:1.72;
      font-weight:300;
      color:#4b5563;
      margin:0;
    }
    .wknd-planner-card-primary p {
      color:rgba(255,255,255,0.74);
    }
    .wknd-planner-card a {
      color:#0f766e;
      font-weight:800;
      text-decoration:none;
    }
    .wknd-planner-card-primary a {
      color:#d9b46f;
    }
    .wknd-planner-card a:hover {
      text-decoration:underline;
    }
    .wknd-planner-note {
      margin-top:1rem;
      border-radius:30px;
      background:#fff;
      border:1px solid rgba(17,24,39,0.08);
      box-shadow:0 24px 80px rgba(17,24,39,0.06);
      padding:1.25rem 1.35rem;
    }
    .wknd-planner-note p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.9rem;
      font-weight:300;
      line-height:1.75;
      color:#4b5563;
      margin:0;
    }
    .wknd-planner-note strong {
      color:#111;
      font-weight:850;
    }
    @media(max-width:980px){
      .wknd-planner-head { grid-template-columns:1fr; align-items:start; }
      .wknd-planner-grid { grid-template-columns:1fr; }
      .wknd-planner-card,
      .wknd-planner-card:nth-child(1),
      .wknd-planner-card:nth-child(2),
      .wknd-planner-card:nth-child(3),
      .wknd-planner-card:nth-child(4),
      .wknd-planner-card:nth-child(5) {
        grid-column:auto;
        min-height:auto;
      }
    }
    @media(max-width:640px){
      .wknd-planner { padding:4rem 0; }
      .wknd-planner-inner { padding:0 1.25rem; }
      .wknd-planner-card { padding:1.25rem; border-radius:26px; }
    }
  `}</style>

  <section className="wknd-planner scroll-fade">
    <div className="wknd-planner-inner">
      <div className="wknd-planner-head">
        <div>
          <div className="wknd-eyebrow">
            <span className="wknd-eyebrow-line" />
            <span className="wknd-eyebrow-text">Before You Book</span>
          </div>

          <h2 className="wknd-planner-title">
            Weekend logistics, <span>made simple.</span>
          </h2>
        </div>

        <p className="wknd-planner-copy">
          A Friday–Sunday Himalayan retreat works best when the basics are clear before you leave: transport, packing, booking window, season, and road access.
        </p>
      </div>

      <div className="wknd-planner-grid">
        <div className="wknd-planner-card wknd-planner-card-primary">
          <div>
            <div className="wknd-planner-top">
              <span className="wknd-planner-label">Travel</span>
              <span className="wknd-planner-num">01</span>
            </div>
            <h3>Leave Delhi with the weekend in mind.</h3>
            <p>
              Self-drive is the most flexible option — it allows departure timing that matches your Friday schedule. Shared cabs from Delhi to Dehradun for Chakrata or Haridwar for Rishikesh are available through retreat coordination.
            </p>
          </div>
        </div>

        <div className="wknd-planner-card">
          <div>
            <div className="wknd-planner-top">
              <span className="wknd-planner-label">Packing</span>
              <span className="wknd-planner-num">02</span>
            </div>
            <h3>Pack light. Shift faster.</h3>
            <p>
              Comfortable clothing for yoga and walking, a warm layer for mountain evenings, and minimal luggage. The less you carry, the faster the mental shift begins.
            </p>
          </div>
        </div>

        <div className="wknd-planner-card">
          <div>
            <div className="wknd-planner-top">
              <span className="wknd-planner-label">Booking window</span>
              <span className="wknd-planner-num">03</span>
            </div>
            <h3>Book before the best weekends fill.</h3>
            <p>
              Weekend programs run year-round but fill quickly for long weekends, festival holidays, and popular windows. Booking two to three weeks ahead is advisable. For peak weekends, four weeks is safer.
            </p>
          </div>
        </div>

        <div className="wknd-planner-card">
          <div>
            <div className="wknd-planner-top">
              <span className="wknd-planner-label">Best months</span>
              <span className="wknd-planner-num">04</span>
            </div>
            <h3>Each season changes the reset.</h3>
            <p>
              October and November bring crisp clear skies. February and March offer warming days with snow-capped views. May–June is ideal for <Link href="/retreats/summer-himalayan-retreats">summer Himalayan retreats</Link> — escaping Delhi heat for mountain air.
            </p>
          </div>
        </div>

        <div className="wknd-planner-card">
          <div>
            <div className="wknd-planner-top">
              <span className="wknd-planner-label">Weather / access</span>
              <span className="wknd-planner-num">05</span>
            </div>
            <h3>Choose the route your weekend can handle.</h3>
            <p>
              Chakrata and Rishikesh are accessible by road in all seasons. Sankri roads may be affected by snow in January–February or landslides during monsoon. December–January suits <Link href="/retreats/winter-himalayan-retreats">winter Himalayan retreats</Link> for cold-weather contemplation.
            </p>
          </div>
        </div>
      </div>

      <div className="wknd-planner-note">
        <p>
          <strong>Simple planning rule:</strong> if you only have a regular Friday–Sunday weekend, choose Chakrata or Rishikesh. If you have Friday off or can depart Thursday evening, Sankri becomes realistic.
        </p>
      </div>
    </div>
  </section>

  {/* ── NAV CALLOUT ── */}
  <style>{`
    .wknd-longer {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at top right, rgba(217,180,111,0.14), transparent 30%),
        #102019;
      padding:5rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(255,255,255,0.1);
    }
    .wknd-longer-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .wknd-longer-card {
      position:relative;
      overflow:hidden;
      border-radius:36px;
      border:1px solid rgba(217,180,111,0.2);
      background:
        radial-gradient(circle at top left, rgba(217,180,111,0.13), transparent 32%),
        rgba(255,255,255,0.055);
      padding:2rem;
      display:grid;
      grid-template-columns:1fr auto;
      gap:2rem;
      align-items:center;
      box-shadow:0 30px 100px rgba(0,0,0,0.22);
    }
    .wknd-longer-label {
      display:inline-flex;
      width:max-content;
      border-radius:999px;
      padding:0.42rem 0.78rem;
      background:rgba(217,180,111,0.12);
      border:1px solid rgba(217,180,111,0.24);
      color:#d9b46f;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.7rem;
      font-weight:900;
      letter-spacing:0.14em;
      text-transform:uppercase;
      margin-bottom:1rem;
    }
    .wknd-longer-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2rem,4.8vw,4.4rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#fff;
      margin:0 0 1rem;
      text-wrap:balance;
    }
    .wknd-longer-title span {
      color:#d9b46f;
    }
    .wknd-longer-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.95rem;
      font-weight:300;
      line-height:1.82;
      color:rgba(255,255,255,0.74);
      margin:0;
      max-width:48rem;
    }
    .wknd-longer-action {
      display:inline-flex;
      align-items:center;
      justify-content:center;
      min-height:48px;
      padding:0.86rem 1.15rem;
      border-radius:999px;
      background:#d9b46f;
      color:#111 !important;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.84rem;
      font-weight:950;
      text-decoration:none !important;
      white-space:nowrap;
      transition:transform 0.2s ease;
    }
    .wknd-longer-action:hover {
      transform:translateY(-2px);
      text-decoration:none !important;
    }
    @media(max-width:760px){
      .wknd-longer { padding:4rem 0; }
      .wknd-longer-inner { padding:0 1.25rem; }
      .wknd-longer-card {
        grid-template-columns:1fr;
        align-items:start;
        padding:1.35rem;
        border-radius:28px;
      }
      .wknd-longer-action {
        width:100%;
      }
    }
  `}</style>

  <section className="wknd-longer scroll-fade">
    <div className="wknd-longer-inner">
      <div className="wknd-longer-card">
        <div>
          <div className="wknd-longer-label">Longer Programs</div>
          <h2 className="wknd-longer-title">
            Need more than a <span>weekend?</span>
          </h2>
          <p className="wknd-longer-copy">
            Looking for longer immersion? <Link href="/retreats/himalayan-retreats" style={{ color: '#d9b46f', textDecoration: 'none', fontWeight: 800 }}>Himalayan Retreats in India</Link> covers five-day, seven-day, and custom-length formats across all four locations.
          </p>
        </div>

        <Link href="/retreats/himalayan-retreats" className="wknd-longer-action">
          Explore Longer Retreats
        </Link>
      </div>
    </div>
  </section>

  {/* ── FAQ ── */}
  <style>{`
    .wknd-faq {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at top left, rgba(15,118,110,0.1), transparent 30%),
        linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .wknd-faq-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .wknd-faq-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .wknd-faq-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.6rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .wknd-faq-title span {
      color:#0f766e;
    }
    .wknd-faq-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .wknd-faq-card {
      border-radius:34px;
      border:1px solid rgba(17,24,39,0.08);
      background:#fff;
      padding:1.5rem;
      box-shadow:0 28px 90px rgba(17,24,39,0.08);
    }
    @media(max-width:760px){
      .wknd-faq { padding:4rem 0; }
      .wknd-faq-inner { padding:0 1.25rem; }
      .wknd-faq-head { grid-template-columns:1fr; align-items:start; }
      .wknd-faq-card { padding:1rem; border-radius:24px; }
    }
  `}</style>

  <section className="wknd-faq scroll-fade">
    <div className="wknd-faq-inner">
      <div className="wknd-faq-head">
        <div>
          <div className="wknd-eyebrow">
            <span className="wknd-eyebrow-line" />
            <span className="wknd-eyebrow-text">FAQ</span>
          </div>

          <h2 className="wknd-faq-title">
            Final questions before <span>you leave Friday.</span>
          </h2>
        </div>

        <p className="wknd-faq-copy">
          These answers cover the practical decision points: whether two days is enough, which destination is closer, when Sankri makes sense, what is included, beginner suitability, and the best season.
        </p>
      </div>

      <div className="wknd-faq-card">
        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
      </div>
    </div>
  </section>

  {/* ── NAV ── */}
  <style>{`
    .wknd-bottom-nav {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:#f7f9f7;
      padding:4rem 0;
      overflow:hidden;
    }
    .wknd-bottom-nav-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .wknd-bottom-nav-card {
      border-radius:30px;
      border:1px solid rgba(17,24,39,0.08);
      background:#fff;
      box-shadow:0 24px 80px rgba(17,24,39,0.06);
      padding:1rem;
      display:grid;
      grid-template-columns:repeat(4,minmax(0,1fr));
      gap:0.75rem;
    }
    .wknd-bottom-nav-link {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:1rem;
      min-height:58px;
      border-radius:22px;
      padding:0.95rem 1rem;
      background:#f7f9f7;
      border:1px solid rgba(17,24,39,0.06);
      color:#102019;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.82rem;
      font-weight:850;
      text-decoration:none;
      transition:transform 0.2s ease, background 0.2s ease;
    }
    .wknd-bottom-nav-link:hover {
      transform:translateY(-2px);
      background:#fff;
    }
    .wknd-bottom-nav-link::after {
      content:'→';
      color:#0f766e;
      font-weight:900;
    }
    .wknd-bottom-nav-link.back::before {
      content:'←';
      color:#0f766e;
      font-weight:900;
    }
    .wknd-bottom-nav-link.back::after {
      content:'';
    }
    @media(max-width:820px){
      .wknd-bottom-nav-card {
        grid-template-columns:1fr;
      }
    }
    @media(max-width:640px){
      .wknd-bottom-nav { padding:3rem 0; }
      .wknd-bottom-nav-inner { padding:0 1.25rem; }
      .wknd-bottom-nav-card { border-radius:24px; }
    }
  `}</style>

  <section className="wknd-bottom-nav">
    <div className="wknd-bottom-nav-inner">
      <div className="wknd-bottom-nav-card">
        <Link href="/retreats" className="wknd-bottom-nav-link back">All Retreats</Link>
        <Link href="/retreats/himalayan-retreats" className="wknd-bottom-nav-link">Himalayan Retreats</Link>
        <Link href="/retreats/retreats-near-delhi" className="wknd-bottom-nav-link">Retreats Near Delhi</Link>
        <Link href="/find-your-retreat" className="wknd-bottom-nav-link">Find Your Retreat</Link>
      </div>
    </div>
  </section>

      </article>
    </TrackedPage>
  );
}
