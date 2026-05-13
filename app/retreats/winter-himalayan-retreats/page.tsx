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

const PATH = '/retreats/winter-himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Winter Himalayan Retreats in India — December to February',
    description:
      'Winter Himalayan retreats across Sankri, Chakrata, Munsiyari, and Rishikesh. Snow silence, forest calm, alpine stillness, and December–February programs.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Winter Himalayan Retreats in India — December to February',
      description:
        'Snow silence, crisp air, fewer tourists, slower rhythm. Winter retreat programs across four Himalayan locations.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Winter Himalayan Retreats in India — December to February'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is it too cold for a winter Himalayan retreat?',
    answer:
      'Temperatures vary by location and altitude. Rishikesh remains mild (8–20°C). Chakrata is cool but manageable (2–15°C). Sankri and Munsiyari can drop below freezing at night, but retreat accommodations provide warm bedding, heaters, and hot meals. Most participants find the cold invigorating rather than uncomfortable — it sharpens attention and deepens sleep. Packing appropriate layers is recommended.',
  },
  {
    question: 'Will there be snow during a winter retreat?',
    answer:
      'Sankri typically receives snowfall from mid-December through February, often creating a snow-covered landscape. Munsiyari sees snow at higher elevations and occasionally in the town itself. Chakrata receives light snow in some years, particularly in January. Rishikesh does not receive snow. Snow conditions vary by year — retreat programs adapt schedules accordingly.',
  },
  {
    question: 'Are mountain roads accessible in winter?',
    answer:
      'Chakrata and Rishikesh remain accessible by road throughout winter. Sankri roads may be affected by snowfall — retreat operators monitor conditions and provide updated travel guidance before departure. Munsiyari access can be more challenging in heavy snow years, and some programs operate on a weather-dependent basis. Participants receive detailed travel advisories before booking confirmation.',
  },
  {
    question: 'What should I pack for a winter Himalayan retreat?',
    answer:
      'Layered thermal clothing is essential — base layers, fleece mid-layers, and a warm outer jacket. Warm socks, gloves, and a hat are recommended for higher-altitude locations. Comfortable indoor clothing for practice sessions, a reusable water bottle, personal medications, and a headlamp or torch for early mornings are also useful. Detailed packing lists are provided after booking.',
  },
  {
    question: 'Are winter retreats suitable for first-time participants?',
    answer:
      'Yes. Winter retreats often have smaller group sizes, which creates a more intimate and supportive container. The slower seasonal rhythm naturally suits first-time participants who benefit from reduced stimulation. However, those uncomfortable with cold temperatures may prefer spring or autumn programs, or the milder climate of Rishikesh.',
  },
  {
    question: 'How do winter retreats differ from other seasons?',
    answer:
      'Winter retreats are characterised by smaller groups, quieter environments, and more introspective programming. Snow cover and colder air reduce the impulse toward outdoor activity, naturally deepening indoor practices like meditation, breathwork, and journaling. Early sunsets create longer evenings for reflection. The overall pace is slower and more contained than warmer-season programs.',
  },
];

export default function WinterHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Himalayan Retreats', url: buildCanonicalUrl('/retreats/himalayan-retreats') },
    { name: 'Winter Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <AutoArticleSchema
        title="Winter Himalayan Retreats in India"
        description="Winter retreat experiences across the Indian Himalayas. Snow silence in Sankri, forest calm in Chakrata, alpine stillness in Munsiyari, and mild spiritual immersion in Rishikesh."
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
          { name: 'Winter Retreats' },
        ]}
      />

      <article>

  {/* ── HERO ── */}
  <style>{`
    .win-hero {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      position:relative;
      overflow:hidden;
      background:
        radial-gradient(circle at 14% 18%, rgba(217,180,111,0.14), transparent 28%),
        radial-gradient(circle at 86% 12%, rgba(255,255,255,0.12), transparent 30%),
        linear-gradient(135deg, #f7f9f7 0%, #eef3f1 56%, #102019 56%, #102019 100%);
      padding:5rem 0;
      border-bottom:1px solid rgba(15,118,110,0.14);
    }
    .win-hero::before {
      content:'';
      position:absolute;
      inset:0;
      background:
        linear-gradient(90deg, rgba(255,255,255,0.14), transparent 38%, rgba(0,0,0,0.1)),
        radial-gradient(circle at 70% 82%, rgba(217,180,111,0.08), transparent 26%);
      pointer-events:none;
    }
    .win-hero-inner {
      position:relative;
      z-index:1;
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
      display:grid;
      grid-template-columns:1.03fr 0.97fr;
      gap:2.5rem;
      align-items:center;
    }
    .win-hero-copy {
      max-width:46rem;
    }
    .win-eyebrow {
      display:flex;
      align-items:center;
      gap:0.75rem;
      margin-bottom:1.35rem;
    }
    .win-eyebrow-line {
      width:34px;
      height:1px;
      background:#d9b46f;
      flex-shrink:0;
    }
    .win-eyebrow-text {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.72rem;
      letter-spacing:0.24em;
      text-transform:uppercase;
      font-weight:850;
      color:#102019;
    }
    .win-hero-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.65rem,6vw,5.45rem);
      line-height:0.95;
      letter-spacing:-0.075em;
      font-weight:230;
      color:#101010;
      margin:0 0 1.25rem;
      text-wrap:balance;
    }
    .win-hero-title span {
      color:#0f766e;
    }
    .win-hero-lead {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1rem,1.35vw,1.14rem);
      line-height:1.85;
      font-weight:300;
      color:#4b5563;
      margin:0 0 1rem;
      max-width:44rem;
    }
    .win-hero-signals {
      display:flex;
      flex-wrap:wrap;
      gap:0.5rem;
      margin:1.55rem 0 2rem;
    }
    .win-hero-signals span {
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
    .win-hero-actions {
      display:flex;
      flex-wrap:wrap;
      gap:0.75rem;
      align-items:center;
      margin-top:0.25rem;
    }
    .win-hero-btn {
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
    .win-hero-btn:hover {
      transform:translateY(-2px);
    }
    .win-hero-btn-secondary {
      background:rgba(15,118,110,0.08);
      color:#102019;
      border:1px solid rgba(15,118,110,0.16);
    }
    .win-hero-card {
      position:relative;
      border-radius:36px;
      background:linear-gradient(180deg, rgba(20,42,34,0.98) 0%, rgba(10,26,21,0.99) 100%);
      border:1px solid rgba(217,180,111,0.18);
      box-shadow:0 26px 90px rgba(0,0,0,0.3);
      color:#fff;
      padding:1.1rem;
      overflow:hidden;
      max-width:100%;
    }
    .win-hero-card::before {
      content:'';
      position:absolute;
      inset:1rem;
      border-radius:28px;
      border:1px solid rgba(217,180,111,0.12);
      pointer-events:none;
    }
    .win-hero-card-top,
    .win-hero-signal-grid,
    .win-hero-card-bottom {
      position:relative;
      z-index:1;
    }
    .win-hero-card-top {
      padding:1.05rem 1.05rem 0.45rem;
    }
    .win-hero-kicker {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.68rem;
      letter-spacing:0.18em;
      text-transform:uppercase;
      font-weight:900;
      color:#d9b46f;
      margin:0 0 0.7rem;
    }
    .win-hero-card-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.45rem,2.7vw,2.15rem);
      line-height:1.05;
      letter-spacing:-0.055em;
      font-weight:420;
      color:#fff;
      margin:0;
      text-wrap:balance;
    }
    .win-hero-signal-grid {
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:0.7rem;
      padding:1rem 0.75rem 0.75rem;
    }
    .win-signal {
      min-height:128px;
      border-radius:22px;
      background:rgba(255,255,255,0.065);
      border:1px solid rgba(255,255,255,0.1);
      padding:1rem;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .win-signal strong {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:1.05rem;
      line-height:1.08;
      letter-spacing:-0.04em;
      color:#fff;
      margin-bottom:0.5rem;
    }
    .win-signal span {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.75rem;
      line-height:1.5;
      color:rgba(255,255,255,0.72);
    }
    .win-signal-mark {
      width:34px;
      height:34px;
      border-radius:14px;
      background:#d9b46f;
      color:#111;
      display:flex;
      align-items:center;
      justify-content:center;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.72rem;
      font-weight:950;
      margin-bottom:0.85rem;
    }
    .win-hero-card-bottom {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:0.55rem;
      padding:0 0.75rem 0.75rem;
    }
    .win-hero-stat {
      border-radius:18px;
      background:rgba(217,180,111,0.1);
      border:1px solid rgba(217,180,111,0.16);
      padding:0.8rem;
    }
    .win-hero-stat strong {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:1.1rem;
      letter-spacing:-0.04em;
      color:#d9b46f;
      margin-bottom:0.2rem;
    }
    .win-hero-stat span {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.68rem;
      line-height:1.35;
      color:rgba(255,255,255,0.64);
    }
    @media(max-width:900px){
      .win-hero {
        background:
          radial-gradient(circle at 12% 18%, rgba(217,180,111,0.14), transparent 28%),
          linear-gradient(180deg, #f7f9f7 0%, #eef3f1 56%, #102019 56%, #102019 100%);
      }
      .win-hero-inner {
        grid-template-columns:1fr;
        gap:2rem;
      }
    }
    @media(max-width:640px){
      .win-hero { padding:4.5rem 0 3.5rem; }
      .win-hero-inner { padding:0 1.25rem; }
      .win-hero-signal-grid,
      .win-hero-card-bottom { grid-template-columns:1fr; }
    }
  `}</style>

  <section className="win-hero">
    <div className="win-hero-inner">
      <div className="win-hero-copy">
        <div className="win-eyebrow">
          <span className="win-eyebrow-line" />
          <span className="win-eyebrow-text">Winter Retreats · Dec–Feb</span>
        </div>

        <h1 className="win-hero-title">
          Winter Himalayan Retreats <span>in India.</span>
        </h1>

        <p className="win-hero-lead">
          Winter in the Himalayas strips everything to essentials. Snow absorbs sound. Cold air sharpens attention. Tourist traffic drops to near zero. The mountains become quieter, starker, and more honest.
        </p>

        <p className="win-hero-lead">
          From December through February, days are shorter, mornings are crisp and still, and evenings arrive early — creating long hours for reflection, reading, and fireside quiet.
        </p>

        <div className="win-hero-signals">
          <span>Snow silence</span>
          <span>Cold air</span>
          <span>Smaller groups</span>
          <span>Long evenings</span>
        </div>

        <div className="win-hero-actions">
          <Link href="#winter-retreat-planner" className="win-hero-btn">
            Plan My Winter Retreat
          </Link>
          <Link href="#winter-locations" className="win-hero-btn win-hero-btn-secondary">
            Compare Winter Locations
          </Link>
        </div>
      </div>

      <div className="win-hero-card" aria-label="Winter retreat atmosphere">
        <div className="win-hero-card-top">
          <p className="win-hero-kicker">Seasonal container</p>
          <p className="win-hero-card-title">A slower retreat season shaped by cold, silence, and early darkness.</p>
        </div>

        <div className="win-hero-signal-grid">
          <div className="win-signal">
            <div>
              <div className="win-signal-mark">01</div>
              <strong>Snow silence</strong>
            </div>
            <span>Softened sound and fewer distractions.</span>
          </div>

          <div className="win-signal">
            <div>
              <div className="win-signal-mark">02</div>
              <strong>Early evenings</strong>
            </div>
            <span>More time for reading, journaling, and rest.</span>
          </div>

          <div className="win-signal">
            <div>
              <div className="win-signal-mark">03</div>
              <strong>Small circles</strong>
            </div>
            <span>Lower group size and more facilitator attention.</span>
          </div>

          <div className="win-signal">
            <div>
              <div className="win-signal-mark">04</div>
              <strong>Warm interiors</strong>
            </div>
            <span>Fire, hot chai, slow meals, and deep sleep.</span>
          </div>
        </div>

        <div className="win-hero-card-bottom">
          <div className="win-hero-stat">
            <strong>Dec</strong>
            <span>first stillness</span>
          </div>
          <div className="win-hero-stat">
            <strong>Jan</strong>
            <span>deep winter</span>
          </div>
          <div className="win-hero-stat">
            <strong>Feb</strong>
            <span>softening light</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="winter-retreat-planner">
    <PrimaryCTA label="Plan My Winter Retreat" subtext="Considering a winter retreat? A planner can help you choose." vertical="retreat" category="seasonal" sourcePath="/retreats/winter-himalayan-retreats" />
  </section>

  {/* ── WHY WINTER ── */}
  <style>{`
    .win-why {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at 12% 12%, rgba(217,180,111,0.12), transparent 30%),
        linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .win-why-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .win-why-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .win-why-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.7rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .win-why-title span {
      color:#0f766e;
    }
    .win-why-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .win-why-panel {
      border-radius:38px;
      background:#102019;
      border:1px solid rgba(217,180,111,0.18);
      box-shadow:0 30px 100px rgba(17,24,39,0.14);
      overflow:hidden;
      padding:1rem;
    }
    .win-why-layer {
      display:grid;
      grid-template-columns:auto 0.34fr 1fr;
      gap:1.1rem;
      align-items:start;
      padding:1.25rem;
      border-radius:28px;
      border:1px solid rgba(255,255,255,0.08);
      background:rgba(255,255,255,0.04);
      margin-bottom:0.75rem;
    }
    .win-why-layer:last-child {
      margin-bottom:0;
    }
    .win-why-num {
      display:flex;
      align-items:center;
      justify-content:center;
      width:46px;
      height:46px;
      border-radius:17px;
      background:#d9b46f;
      color:#111;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.78rem;
      font-weight:950;
      flex-shrink:0;
    }
    .win-why-layer h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.15rem,2vw,1.75rem);
      line-height:1.05;
      letter-spacing:-0.055em;
      font-weight:320;
      color:#fff;
      margin:0;
      text-wrap:balance;
    }
    .win-why-layer p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.88rem;
      font-weight:300;
      line-height:1.78;
      color:rgba(255,255,255,0.72);
      margin:0;
    }
    .win-why-note {
      margin-top:1rem;
      border-radius:30px;
      background:#fff;
      border:1px solid rgba(17,24,39,0.08);
      box-shadow:0 24px 80px rgba(17,24,39,0.06);
      padding:1.25rem 1.35rem;
    }
    .win-why-note p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.9rem;
      font-weight:300;
      line-height:1.75;
      color:#4b5563;
      margin:0;
    }
    .win-why-note strong {
      color:#111;
      font-weight:850;
    }
    @media(max-width:900px){
      .win-why-head { grid-template-columns:1fr; align-items:start; }
      .win-why-layer {
        grid-template-columns:auto 1fr;
      }
      .win-why-layer p {
        grid-column:1 / -1;
      }
    }
    @media(max-width:640px){
      .win-why { padding:4rem 0; }
      .win-why-inner { padding:0 1.25rem; }
      .win-why-panel { border-radius:28px; padding:0.75rem; }
      .win-why-layer { border-radius:22px; padding:1rem; }
    }
  `}</style>

  <section className="win-why scroll-fade">
    <div className="win-why-inner">
      <div className="win-why-head">
        <div>
          <div className="win-eyebrow">
            <span className="win-eyebrow-line" />
            <span className="win-eyebrow-text">Why Winter</span>
          </div>

          <h2 className="win-why-title">
            Why winter changes <span>the retreat experience.</span>
          </h2>
        </div>

        <p className="win-why-copy">
          Retreat environments are shaped by season as much as by facilitation. In winter, the Himalayas create conditions that are qualitatively different from spring or autumn programs — not better or worse, but distinct in what they offer the nervous system.
        </p>
      </div>

      <div className="win-why-panel">
        <div className="win-why-layer">
          <div className="win-why-num">01</div>
          <h3>Reduced stimulation.</h3>
          <p>
            Snow cover dampens ambient sound. Fewer travellers mean quieter roads, emptier trails, and smaller groups. The external world becomes simpler — and that simplicity transfers inward.
          </p>
        </div>

        <div className="win-why-layer">
          <div className="win-why-num">02</div>
          <h3>Snow acoustics and sensory softening.</h3>
          <p>
            Fresh snow absorbs high-frequency sound, creating a muted acoustic environment that is measurably different from other seasons. For meditation, breathwork, and journaling, the container is held by the physical environment itself.
          </p>
        </div>

        <div className="win-why-layer">
          <div className="win-why-num">03</div>
          <h3>Early sunsets and long evenings.</h3>
          <p>
            When darkness arrives by 5:30 PM, the evening expands. Fireside conversation, quiet reading, early sleep — winter naturally creates the spacious evenings that retreat designers try to build artificially in other seasons.
          </p>
        </div>

        <div className="win-why-layer">
          <div className="win-why-num">04</div>
          <h3>Small group intimacy.</h3>
          <p>
            Winter programs draw fewer participants, which means smaller circles, more facilitator attention, and deeper relational dynamics. Groups of 6–10 create a different kind of trust than groups of 20.
          </p>
        </div>

        <div className="win-why-layer">
          <div className="win-why-num">05</div>
          <h3>Contrast therapy.</h3>
          <p>
            Cold mornings and warm interiors create a natural rhythm of contraction and expansion. Stepping into sharp mountain air at dawn, then returning to hot chai and a warm practice space, makes discomfort brief and purposeful.
          </p>
        </div>
      </div>

      <div className="win-why-note">
        <p>
          <strong>Winter’s real advantage:</strong> silence feels less like discipline and more like a continuation of what the landscape is already doing.
        </p>
      </div>
    </div>
  </section>

  {/* ── LOCATIONS ── */}
  <style>{`
    .win-locations {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at top left, rgba(217,180,111,0.12), transparent 30%),
        linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .win-locations-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .win-locations-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .win-locations-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.7rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .win-locations-title span {
      color:#0f766e;
    }
    .win-locations-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .win-spectrum {
      display:grid;
      gap:1rem;
    }
    .win-location-row {
      display:grid;
      grid-template-columns:0.38fr 0.62fr;
      min-height:340px;
      border-radius:34px;
      overflow:hidden;
      border:1px solid rgba(17,24,39,0.08);
      background:#fff;
      box-shadow:0 24px 80px rgba(17,24,39,0.07);
    }
    .win-location-row-deep,
    .win-location-row-alpine {
      background:#102019;
      border-color:rgba(217,180,111,0.18);
      color:#fff;
    }
    .win-location-row-alt {
      grid-template-columns:0.62fr 0.38fr;
    }
    .win-location-media {
      position:relative;
      min-height:340px;
      overflow:hidden;
      background:#102019;
    }
    .win-location-media img {
      width:100%;
      height:100%;
      object-fit:cover;
      display:block;
    }
    .win-location-row-deep .win-location-media img,
    .win-location-row-alpine .win-location-media img {
      opacity:0.76;
    }
    .win-location-body {
      padding:2rem;
      display:flex;
      flex-direction:column;
      justify-content:center;
    }
    .win-location-label {
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
    .win-location-row-deep .win-location-label,
    .win-location-row-alpine .win-location-label {
      background:rgba(217,180,111,0.12);
      border-color:rgba(217,180,111,0.24);
      color:#d9b46f;
    }
    .win-location-body h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.75rem,3.8vw,3.55rem);
      line-height:0.98;
      letter-spacing:-0.07em;
      font-weight:250;
      color:#111;
      margin:0 0 1rem;
      text-wrap:balance;
    }
    .win-location-row-deep .win-location-body h3,
    .win-location-row-alpine .win-location-body h3 {
      color:#fff;
    }
    .win-location-body h3 a {
      color:inherit;
      text-decoration:none;
    }
    .win-location-body p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.88rem;
      line-height:1.78;
      font-weight:300;
      color:#4b5563;
      margin:0 0 0.85rem;
      max-width:44rem;
    }
    .win-location-row-deep .win-location-body p,
    .win-location-row-alpine .win-location-body p {
      color:rgba(255,255,255,0.74);
    }
    .win-location-body a {
      color:#0f766e;
      font-weight:760;
      text-decoration:none;
    }
    .win-location-row-deep .win-location-body a,
    .win-location-row-alpine .win-location-body a {
      color:#d9b46f;
    }
    .win-location-body a:hover {
      text-decoration:underline;
    }
    .win-location-facts {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:0.65rem;
      margin:1.1rem 0 1.25rem;
    }
    .win-location-fact {
      border-radius:18px;
      background:#f7f9f7;
      border:1px solid rgba(17,24,39,0.08);
      padding:0.82rem;
    }
    .win-location-row-deep .win-location-fact,
    .win-location-row-alpine .win-location-fact {
      background:rgba(255,255,255,0.07);
      border-color:rgba(255,255,255,0.12);
    }
    .win-location-fact strong {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.68rem;
      letter-spacing:0.1em;
      text-transform:uppercase;
      color:#0f766e;
      margin-bottom:0.35rem;
    }
    .win-location-row-deep .win-location-fact strong,
    .win-location-row-alpine .win-location-fact strong {
      color:#d9b46f;
    }
    .win-location-fact span {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.74rem;
      line-height:1.48;
      color:#4b5563;
    }
    .win-location-row-deep .win-location-fact span,
    .win-location-row-alpine .win-location-fact span {
      color:rgba(255,255,255,0.68);
    }
    .win-location-actions {
      display:flex;
      flex-wrap:wrap;
      gap:0.75rem;
      margin-top:0.35rem;
    }
    .win-location-btn {
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
    .win-location-row-deep .win-location-btn,
    .win-location-row-alpine .win-location-btn {
      background:#d9b46f;
      color:#111 !important;
    }
    .win-location-btn:hover {
      transform:translateY(-2px);
      text-decoration:none !important;
    }
    @media(max-width:900px){
      .win-locations-head { grid-template-columns:1fr; align-items:start; }
      .win-location-row,
      .win-location-row-alt {
        grid-template-columns:1fr;
      }
      .win-location-row-alt .win-location-media {
        order:0;
      }
      .win-location-row-alt .win-location-body {
        order:1;
      }
      .win-location-media {
        min-height:240px;
      }
    }
    @media(max-width:640px){
      .win-locations { padding:4rem 0; }
      .win-locations-inner { padding:0 1.25rem; }
      .win-location-body { padding:1.35rem; }
      .win-location-facts { grid-template-columns:1fr; }
      .win-location-btn { width:100%; }
    }
  `}</style>

  <section id="winter-locations" className="win-locations scroll-fade">
    <div className="win-locations-inner">
      <div className="win-locations-head">
        <div>
          <div className="win-eyebrow">
            <span className="win-eyebrow-line" />
            <span className="win-eyebrow-text">Four Locations</span>
          </div>

          <h2 className="win-locations-title">
            Choose your <span>winter intensity.</span>
          </h2>
        </div>

        <p className="win-locations-copy">
          Each of our four Himalayan locations responds differently to winter. Choosing the right one depends on how much cold you welcome, what kind of stillness you seek, and whether you want snow or simply quiet.
        </p>
      </div>

      <div className="win-spectrum">
        <div className="win-location-row win-location-row-deep">
          <div className="win-location-media">
            <Image src="/Images/location/sankri.webp" alt="Sankri — snow-covered valley and pine forests in winter, Garhwal" width={620} height={460} sizes="(max-width: 900px) 100vw, 38vw" quality={75} />
          </div>

          <div className="win-location-body">
            <div className="win-location-label">Deep snow</div>
            <h3><Link href="/retreats/sankri">Sankri — Snow and high-altitude stillness</Link></h3>

            <p>
              Sankri in winter is a snow-covered valley at the edge of the treeline. Pine forests hold snow on their branches, creating corridors of white silence.
            </p>

            <div className="win-location-facts">
              <div className="win-location-fact">
                <strong>Winter type</strong>
                <span>Real snow and freezing nights</span>
              </div>
              <div className="win-location-fact">
                <strong>Best for</strong>
                <span>People who want winter as the retreat</span>
              </div>
              <div className="win-location-fact">
                <strong>Feel</strong>
                <span>Wood fires, layers, deep quiet</span>
              </div>
            </div>

            <p>
              Retreats here operate in genuine mountain winter. For seasonal planning, see our guide on <Link href="/blog/best-time-for-retreat-in-sankri">the best time for a retreat in Sankri</Link>.
            </p>

            <div className="win-location-actions">
              <Link href="/retreats/sankri" className="win-location-btn">View Sankri retreats</Link>
            </div>
          </div>
        </div>

        <div className="win-location-row win-location-row-alt">
          <div className="win-location-body">
            <div className="win-location-label">Forest cold</div>
            <h3><Link href="/retreats/chakrata">Chakrata — Quiet forest winter</Link></h3>

            <p>
              Chakrata sits lower than Sankri, along a forested ridge that sees winter as cold calm rather than deep snow. The deodar and oak forests thin in winter, opening longer views across valleys.
            </p>

            <div className="win-location-facts">
              <div className="win-location-fact">
                <strong>Winter type</strong>
                <span>Cold calm, frost, occasional snow</span>
              </div>
              <div className="win-location-fact">
                <strong>Best for</strong>
                <span>Seasonal stillness without extreme cold</span>
              </div>
              <div className="win-location-fact">
                <strong>Access</strong>
                <span>Practical even in January</span>
              </div>
            </div>

            <p>
              This is the right winter location for people who want stillness without the intensity of high-altitude winter.
            </p>

            <div className="win-location-actions">
              <Link href="/retreats/chakrata" className="win-location-btn">View Chakrata retreats</Link>
            </div>
          </div>

          <div className="win-location-media">
            <Image src="/Images/location/chakrata.webp" alt="Chakrata — deodar forest in winter calm near Dehradun" width={620} height={460} sizes="(max-width: 900px) 100vw, 38vw" quality={75} />
          </div>
        </div>

        <div className="win-location-row win-location-row-alpine">
          <div className="win-location-media">
            <Image src="/Images/location/munsiyari.webp" alt="Munsiyari — Panchachuli range under winter snow, Kumaon Himalaya" width={620} height={460} sizes="(max-width: 900px) 100vw, 38vw" quality={75} />
          </div>

          <div className="win-location-body">
            <div className="win-location-label">Raw alpine</div>
            <h3><Link href="/retreats/munsiyari">Munsiyari — Alpine silence, weather dependent</Link></h3>

            <p>
              Munsiyari in winter faces the Panchachuli range under full snow. The village becomes very quiet — few visitors, reduced services, and a pace set entirely by weather.
            </p>

            <div className="win-location-facts">
              <div className="win-location-fact">
                <strong>Winter type</strong>
                <span>Raw, remote, weather-led</span>
              </div>
              <div className="win-location-fact">
                <strong>Best for</strong>
                <span>Comfort with uncertainty</span>
              </div>
              <div className="win-location-fact">
                <strong>Access</strong>
                <span>Programs depend on conditions</span>
              </div>
            </div>

            <p>
              When conditions allow, this is perhaps the most unmediated winter retreat setting we offer.
            </p>

            <div className="win-location-actions">
              <Link href="/retreats/munsiyari" className="win-location-btn">View Munsiyari retreats</Link>
            </div>
          </div>
        </div>

        <div className="win-location-row win-location-row-alt">
          <div className="win-location-body">
            <div className="win-location-label">Mild practice</div>
            <h3><Link href="/retreats/rishikesh">Rishikesh — Mild winter on the Ganges</Link></h3>

            <p>
              Rishikesh does not experience mountain winter. Days are cool and comfortable, nights are brisk but not cold, and the Ganges runs clearer in winter.
            </p>

            <div className="win-location-facts">
              <div className="win-location-fact">
                <strong>Winter type</strong>
                <span>Cool, accessible, no snow</span>
              </div>
              <div className="win-location-fact">
                <strong>Best for</strong>
                <span>Yoga, tradition, community</span>
              </div>
              <div className="win-location-fact">
                <strong>Feel</strong>
                <span>Ashram rhythm and smaller cohorts</span>
              </div>
            </div>

            <p>
              For participants who want a winter retreat without cold-weather intensity, Rishikesh offers structured practice in a mild, accessible climate.
            </p>

            <div className="win-location-actions">
              <Link href="/retreats/rishikesh" className="win-location-btn">View Rishikesh retreats</Link>
            </div>
          </div>

          <div className="win-location-media">
            <Image src="/Images/location/rishikesh.webp" alt="Rishikesh — Ganges riverside in mild winter, ashram and yoga programs" width={620} height={460} sizes="(max-width: 900px) 100vw, 38vw" quality={75} />
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ── BEST MONTHS ── */}
  <style>{`
    .win-months {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at 86% 12%, rgba(217,180,111,0.13), transparent 30%),
        linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .win-months-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .win-months-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .win-months-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.7rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .win-months-title span {
      color:#0f766e;
    }
    .win-months-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .win-months-board {
      position:relative;
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:1rem;
    }
    .win-months-board::before {
      content:'';
      position:absolute;
      left:7%;
      right:7%;
      top:76px;
      height:1px;
      background:linear-gradient(90deg, transparent, rgba(15,118,110,0.28), transparent);
      pointer-events:none;
    }
    .win-month-card {
      position:relative;
      z-index:1;
      border-radius:34px;
      border:1px solid rgba(17,24,39,0.08);
      background:#fff;
      box-shadow:0 24px 80px rgba(17,24,39,0.07);
      padding:1.5rem;
      min-height:440px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      overflow:hidden;
    }
    .win-month-card::before {
      content:'';
      position:absolute;
      inset:0;
      background:radial-gradient(circle at top right, rgba(15,118,110,0.1), transparent 34%);
      pointer-events:none;
    }
    .win-month-card-deep {
      background:#102019;
      border-color:rgba(217,180,111,0.18);
      color:#fff;
    }
    .win-month-card-deep::before {
      background:radial-gradient(circle at top right, rgba(217,180,111,0.18), transparent 36%);
    }
    .win-month-card > * {
      position:relative;
      z-index:1;
    }
    .win-month-dot {
      display:flex;
      align-items:center;
      justify-content:center;
      width:76px;
      height:76px;
      border-radius:26px;
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
    .win-month-label {
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
    .win-month-card-deep .win-month-label {
      background:rgba(217,180,111,0.12);
      border-color:rgba(217,180,111,0.24);
      color:#d9b46f;
    }
    .win-month-card h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.55rem,3vw,2.65rem);
      line-height:0.98;
      letter-spacing:-0.065em;
      font-weight:260;
      color:#111;
      margin:0 0 1rem;
      text-wrap:balance;
    }
    .win-month-card-deep h3 {
      color:#fff;
    }
    .win-month-card p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.88rem;
      line-height:1.78;
      font-weight:300;
      color:#4b5563;
      margin:0;
    }
    .win-month-card-deep p {
      color:rgba(255,255,255,0.74);
    }
    .win-month-list {
      display:grid;
      gap:0.55rem;
      margin-top:1.25rem;
    }
    .win-month-list span {
      display:flex;
      align-items:center;
      gap:0.55rem;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.78rem;
      line-height:1.45;
      color:#334155;
      font-weight:650;
    }
    .win-month-card-deep .win-month-list span {
      color:rgba(255,255,255,0.76);
    }
    .win-month-list span::before {
      content:'';
      width:7px;
      height:7px;
      border-radius:50%;
      background:#0f766e;
      flex-shrink:0;
    }
    .win-month-card-deep .win-month-list span::before {
      background:#d9b46f;
    }
    .win-months-note {
      margin-top:1rem;
      border-radius:30px;
      background:#fff;
      border:1px solid rgba(17,24,39,0.08);
      box-shadow:0 24px 80px rgba(17,24,39,0.06);
      padding:1.25rem 1.35rem;
    }
    .win-months-note p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.9rem;
      font-weight:300;
      line-height:1.75;
      color:#4b5563;
      margin:0;
    }
    .win-months-note strong {
      color:#111;
      font-weight:850;
    }
    @media(max-width:980px){
      .win-months-head { grid-template-columns:1fr; align-items:start; }
      .win-months-board { grid-template-columns:1fr; }
      .win-months-board::before { display:none; }
      .win-month-card { min-height:auto; }
    }
    @media(max-width:640px){
      .win-months { padding:4rem 0; }
      .win-months-inner { padding:0 1.25rem; }
      .win-month-card { padding:1.25rem; border-radius:26px; }
      .win-month-dot { width:62px; height:62px; border-radius:20px; }
    }
  `}</style>

  <section className="win-months scroll-fade">
    <div className="win-months-inner">
      <div className="win-months-head">
        <div>
          <div className="win-eyebrow">
            <span className="win-eyebrow-line" />
            <span className="win-eyebrow-text">When To Come</span>
          </div>

          <h2 className="win-months-title">
            December to February, <span>three different winters.</span>
          </h2>
        </div>

        <p className="win-months-copy">
          Winter is not one uniform season. December, January, and February each create a different retreat container — from first stillness to deep cold to the first signs of seasonal return.
        </p>
      </div>

      <div className="win-months-board">
        <div className="win-month-card">
          <div>
            <div className="win-month-dot">Dec</div>
            <div className="win-month-label">First stillness</div>
            <h3>The transition month.</h3>
            <p>
              Snow begins arriving at higher elevations like Sankri and Munsiyari. Chakrata turns cold and clear. Rishikesh enters peak pilgrimage season. December retreats offer the first taste of winter stillness without the deepest cold.
            </p>
          </div>

          <div className="win-month-list">
            <span>Early snow at altitude</span>
            <span>Clearer roads and easier access</span>
            <span>Best for gentle winter entry</span>
          </div>
        </div>

        <div className="win-month-card win-month-card-deep">
          <div>
            <div className="win-month-dot">Jan</div>
            <div className="win-month-label">Deep winter</div>
            <h3>The coldest, quietest month.</h3>
            <p>
              January is the coldest month across all Himalayan locations. Sankri is fully snow-covered. Munsiyari may become intermittently inaccessible. Chakrata sees its lowest temperatures.
            </p>
          </div>

          <div className="win-month-list">
            <span>Maximum stillness</span>
            <span>Smallest groups</span>
            <span>Best for people who seek real cold</span>
          </div>
        </div>

        <div className="win-month-card">
          <div>
            <div className="win-month-dot">Feb</div>
            <div className="win-month-label">Softening light</div>
            <h3>Late winter, slightly easier.</h3>
            <p>
              Days begin lengthening. Snow persists at altitude but becomes softer. Chakrata warms slightly. Rishikesh starts the transition toward spring energy.
            </p>
          </div>

          <div className="win-month-list">
            <span>Winter character without January’s edge</span>
            <span>Longer days and softer snow</span>
            <span>Best for balanced winter depth</span>
          </div>
        </div>
      </div>

      <div className="win-months-note">
        <p>
          <strong>Simple month rule:</strong> choose December for accessibility, January for the deepest winter container, and February for winter depth with softer light.
        </p>
      </div>
    </div>
  </section>

  {/* ── WHO IS IT FOR ── */}
  <style>{`
    .win-audience {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at top left, rgba(15,118,110,0.1), transparent 30%),
        linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .win-audience-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .win-audience-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .win-audience-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.7rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .win-audience-title span {
      color:#0f766e;
    }
    .win-audience-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .win-audience-grid {
      display:grid;
      grid-template-columns:repeat(4,minmax(0,1fr));
      gap:1rem;
    }
    .win-audience-card {
      position:relative;
      overflow:hidden;
      min-height:330px;
      border-radius:30px;
      border:1px solid rgba(17,24,39,0.08);
      background:#fff;
      box-shadow:0 24px 80px rgba(17,24,39,0.07);
      padding:1.35rem;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .win-audience-card::before {
      content:'';
      position:absolute;
      inset:0;
      background:radial-gradient(circle at top right, rgba(15,118,110,0.1), transparent 34%);
      pointer-events:none;
    }
    .win-audience-card:nth-child(2)::before {
      background:radial-gradient(circle at top right, rgba(217,180,111,0.16), transparent 34%);
    }
    .win-audience-card-primary {
      background:#102019;
      color:#fff;
      border-color:rgba(217,180,111,0.18);
    }
    .win-audience-card-primary::before {
      background:radial-gradient(circle at top right, rgba(217,180,111,0.18), transparent 36%);
    }
    .win-audience-card > * {
      position:relative;
      z-index:1;
    }
    .win-audience-top {
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:1rem;
      margin-bottom:1.25rem;
    }
    .win-audience-label {
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
    .win-audience-card-primary .win-audience-label {
      background:rgba(217,180,111,0.12);
      border-color:rgba(217,180,111,0.24);
      color:#d9b46f;
    }
    .win-audience-num {
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
    .win-audience-card h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.3rem,2.6vw,2.15rem);
      line-height:1;
      letter-spacing:-0.06em;
      font-weight:300;
      color:#111;
      margin:0 0 0.9rem;
      text-wrap:balance;
    }
    .win-audience-card-primary h3 {
      color:#fff;
    }
    .win-audience-card p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.86rem;
      line-height:1.72;
      font-weight:300;
      color:#4b5563;
      margin:0;
    }
    .win-audience-card-primary p {
      color:rgba(255,255,255,0.74);
    }
    .win-audience-note {
      margin-top:1rem;
      border-radius:30px;
      background:#102019;
      border:1px solid rgba(217,180,111,0.18);
      box-shadow:0 24px 80px rgba(17,24,39,0.12);
      padding:1.25rem 1.35rem;
    }
    .win-audience-note p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.9rem;
      font-weight:300;
      line-height:1.75;
      color:rgba(255,255,255,0.76);
      margin:0;
    }
    .win-audience-note strong {
      color:#d9b46f;
      font-weight:850;
    }
    @media(max-width:1050px){
      .win-audience-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
      .win-audience-card { min-height:280px; }
    }
    @media(max-width:760px){
      .win-audience { padding:4rem 0; }
      .win-audience-inner { padding:0 1.25rem; }
      .win-audience-head { grid-template-columns:1fr; align-items:start; }
      .win-audience-grid { grid-template-columns:1fr; }
      .win-audience-card { min-height:auto; padding:1.25rem; border-radius:26px; }
    }
  `}</style>

  <section className="win-audience scroll-fade">
    <div className="win-audience-inner">
      <div className="win-audience-head">
        <div>
          <div className="win-eyebrow">
            <span className="win-eyebrow-line" />
            <span className="win-eyebrow-text">Is This For You</span>
          </div>

          <h2 className="win-audience-title">
            Winter is for people who want <span>less input.</span>
          </h2>
        </div>

        <p className="win-audience-copy">
          Winter retreats attract a specific kind of participant — people who recognise that the discomfort of cold and the scarcity of daylight are not obstacles but tools.
        </p>
      </div>

      <div className="win-audience-grid">
        <div className="win-audience-card win-audience-card-primary">
          <div>
            <div className="win-audience-top">
              <span className="win-audience-label">Nervous system reset</span>
              <span className="win-audience-num">01</span>
            </div>
            <h3>Burnout recovery.</h3>
            <p>
              The reduced stimulation of a winter Himalayan setting is neurologically ideal for overstimulated systems. Cold air, early sleep, and limited screen access create conditions the nervous system cannot resist resting in.
            </p>
          </div>
        </div>

        <div className="win-audience-card">
          <div>
            <div className="win-audience-top">
              <span className="win-audience-label">Threshold season</span>
              <span className="win-audience-num">02</span>
            </div>
            <h3>Deep reflection and transition.</h3>
            <p>
              Year-end and new-year retreats serve people processing career changes, relationship shifts, or creative blocks. Winter creates the psychological container for honest self-assessment.
            </p>
          </div>
        </div>

        <div className="win-audience-card">
          <div>
            <div className="win-audience-top">
              <span className="win-audience-label">Screen silence</span>
              <span className="win-audience-num">03</span>
            </div>
            <h3>Digital detox.</h3>
            <p>
              Shorter days and cold evenings eliminate the usual triggers for compulsive screen use. Winter removes the competition — there is nothing more stimulating outside the retreat to pull your attention.
            </p>
          </div>
        </div>

        <div className="win-audience-card">
          <div>
            <div className="win-audience-top">
              <span className="win-audience-label">Cold-weather seekers</span>
              <span className="win-audience-num">04</span>
            </div>
            <h3>People who come alive in cold.</h3>
            <p>
              For them, the sharp air, snow light, and physical aliveness of a Himalayan winter are not tolerated but desired. These participants often find winter retreats more transformative than any other season.
            </p>
          </div>
        </div>
      </div>

      <div className="win-audience-note">
        <p>
          <strong>Not everyone wants this.</strong> Winter retreats are not built for entertainment or busy itineraries. They are best for people seeking something deeper than relaxation.
        </p>
      </div>
    </div>
  </section>

  {/* ── FORMAT ── */}
  <style>{`
    .win-format {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at 86% 12%, rgba(217,180,111,0.14), transparent 30%),
        linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .win-format-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .win-format-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .win-format-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.7rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .win-format-title span {
      color:#0f766e;
    }
    .win-format-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .win-format-grid {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:1rem;
    }
    .win-format-card {
      position:relative;
      overflow:hidden;
      min-height:390px;
      border-radius:34px;
      border:1px solid rgba(17,24,39,0.08);
      background:#fff;
      box-shadow:0 24px 80px rgba(17,24,39,0.07);
      padding:1.45rem;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .win-format-card::before {
      content:'';
      position:absolute;
      inset:0;
      background:radial-gradient(circle at top right, rgba(15,118,110,0.1), transparent 34%);
      pointer-events:none;
    }
    .win-format-card-primary {
      background:#102019;
      border-color:rgba(217,180,111,0.18);
      color:#fff;
    }
    .win-format-card-primary::before {
      background:radial-gradient(circle at top right, rgba(217,180,111,0.18), transparent 36%);
    }
    .win-format-card > * {
      position:relative;
      z-index:1;
    }
    .win-format-top {
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:1rem;
      margin-bottom:1.25rem;
    }
    .win-format-label {
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
    .win-format-card-primary .win-format-label {
      background:rgba(217,180,111,0.12);
      border-color:rgba(217,180,111,0.24);
      color:#d9b46f;
    }
    .win-format-num {
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
    .win-format-card h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.45rem,3vw,2.55rem);
      line-height:0.98;
      letter-spacing:-0.065em;
      font-weight:270;
      color:#111;
      margin:0 0 1rem;
      text-wrap:balance;
    }
    .win-format-card-primary h3 {
      color:#fff;
    }
    .win-format-card p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.88rem;
      line-height:1.76;
      font-weight:300;
      color:#4b5563;
      margin:0;
    }
    .win-format-card-primary p {
      color:rgba(255,255,255,0.74);
    }
    .win-format-card-link {
      display:inline-flex;
      align-items:center;
      justify-content:center;
      width:max-content;
      max-width:100%;
      min-height:44px;
      margin-top:1.35rem;
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
    .win-format-card-primary .win-format-card-link {
      background:#d9b46f;
      color:#111 !important;
    }
    .win-format-card-link:hover {
      transform:translateY(-2px);
      text-decoration:none !important;
    }
    .win-format-note {
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
    .win-format-note p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.9rem;
      font-weight:300;
      line-height:1.75;
      color:#4b5563;
      margin:0;
      max-width:54rem;
    }
    .win-format-note a {
      color:#0f766e;
      font-weight:800;
      text-decoration:none;
    }
    .win-format-note a:hover {
      text-decoration:underline;
    }
    .win-format-note-btn {
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
    .win-format-note-btn:hover {
      transform:translateY(-2px);
      text-decoration:none !important;
    }
    @media(max-width:980px){
      .win-format-head { grid-template-columns:1fr; align-items:start; }
      .win-format-grid { grid-template-columns:1fr; }
      .win-format-card { min-height:auto; }
      .win-format-note {
        grid-template-columns:1fr;
        align-items:start;
      }
      .win-format-note-btn {
        width:100%;
      }
    }
    @media(max-width:640px){
      .win-format { padding:4rem 0; }
      .win-format-inner { padding:0 1.25rem; }
      .win-format-card { padding:1.25rem; border-radius:26px; }
    }
  `}</style>

  <section className="win-format scroll-fade">
    <div className="win-format-inner">
      <div className="win-format-head">
        <div>
          <div className="win-eyebrow">
            <span className="win-eyebrow-line" />
            <span className="win-eyebrow-text">Best Fit</span>
          </div>

          <h2 className="win-format-title">
            Best winter <span>program matches.</span>
          </h2>
        </div>

        <p className="win-format-copy">
          Not every retreat format suits winter equally. The season amplifies certain styles and makes others impractical. Three formats align particularly well with cold, quiet, and early darkness.
        </p>
      </div>

      <div className="win-format-grid">
        <div className="win-format-card win-format-card-primary">
          <div>
            <div className="win-format-top">
              <span className="win-format-label">Strongest match</span>
              <span className="win-format-num">01</span>
            </div>
            <h3>Burnout Recovery</h3>
            <p>
              Winter reduces input to the minimum. The cold, quiet, and darkness support nervous system recovery naturally, making this the strongest seasonal match for burnout programs.
            </p>
          </div>

          <Link href="/retreats/journeys/burnout-recovery" className="win-format-card-link">
            View Burnout Recovery
          </Link>
        </div>

        <div className="win-format-card">
          <div>
            <div className="win-format-top">
              <span className="win-format-label">Silence-led</span>
              <span className="win-format-num">02</span>
            </div>
            <h3>Meditation &amp; Silence</h3>
            <p>
              Snow acoustics and fewer people create ambient silence that supports formal practice without artificial enforcement. Winter silence feels organic.
            </p>
          </div>

          <Link href="/retreats/journeys/meditation-and-silence" className="win-format-card-link">
            View Meditation &amp; Silence
          </Link>
        </div>

        <div className="win-format-card">
          <div>
            <div className="win-format-top">
              <span className="win-format-label">Rest-led</span>
              <span className="win-format-num">03</span>
            </div>
            <h3>Rest &amp; Reset</h3>
            <p>
              Short days and long evenings naturally encourage extra sleep, slower meals, and unhurried integration. Winter does the work of rest without requiring discipline.
            </p>
          </div>

          <Link href="/retreats/journeys/rest-and-reset" className="win-format-card-link">
            View Rest &amp; Reset
          </Link>
        </div>
      </div>

      <div className="win-format-note">
        <p>
          For a broader view of how all retreat formats are structured, see our complete guide to <Link href="/retreats/himalayan-retreats">Himalayan Retreats in India</Link>.
        </p>
        <Link href="/retreats/himalayan-retreats" className="win-format-note-btn">
          View All Himalayan Retreats
        </Link>
      </div>
    </div>
  </section>

  {/* ── FAQ ── */}
  <style>{`
    .win-faq {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at top left, rgba(15,118,110,0.1), transparent 30%),
        linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .win-faq-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .win-faq-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .win-faq-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.7rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .win-faq-title span {
      color:#0f766e;
    }
    .win-faq-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .win-faq-card {
      border-radius:34px;
      border:1px solid rgba(17,24,39,0.08);
      background:#fff;
      padding:1.5rem;
      box-shadow:0 28px 90px rgba(17,24,39,0.08);
    }
    @media(max-width:760px){
      .win-faq { padding:4rem 0; }
      .win-faq-inner { padding:0 1.25rem; }
      .win-faq-head { grid-template-columns:1fr; align-items:start; }
      .win-faq-card { padding:1rem; border-radius:24px; }
    }
  `}</style>

  <section className="win-faq scroll-fade">
    <div className="win-faq-inner">
      <div className="win-faq-head">
        <div>
          <div className="win-eyebrow">
            <span className="win-eyebrow-line" />
            <span className="win-eyebrow-text">FAQ</span>
          </div>

          <h2 className="win-faq-title">
            Practical questions before <span>you choose winter.</span>
          </h2>
        </div>

        <p className="win-faq-copy">
          These answers cover cold, snow, road access, packing, first-time suitability, and how winter retreats differ from warmer-season programs.
        </p>
      </div>

      <div className="win-faq-card">
        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
      </div>
    </div>
  </section>

  {/* ── NAV ── */}
  <style>{`
    .win-bottom-nav {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at 14% 18%, rgba(217,180,111,0.12), transparent 30%),
        linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
      padding:5rem 0 4.5rem;
      overflow:hidden;
      border-top:1px solid rgba(15,118,110,0.1);
    }
    .win-bottom-nav-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .win-bottom-nav-shell {
      border-radius:36px;
      border:1px solid rgba(17,24,39,0.08);
      background:#fff;
      box-shadow:0 28px 90px rgba(17,24,39,0.08);
      padding:1.25rem;
      overflow:hidden;
    }
    .win-bottom-nav-head {
      display:grid;
      grid-template-columns:0.95fr 1.05fr;
      gap:1.5rem;
      align-items:end;
      padding:1.35rem 1.35rem 1.5rem;
      border-bottom:1px solid rgba(17,24,39,0.08);
      margin-bottom:1rem;
    }
    .win-bottom-nav-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.8rem,4vw,3.6rem);
      font-weight:240;
      letter-spacing:-0.07em;
      line-height:0.98;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .win-bottom-nav-title span {
      color:#0f766e;
    }
    .win-bottom-nav-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.94rem;
      font-weight:300;
      line-height:1.78;
      color:#4b5563;
      margin:0;
      max-width:42rem;
    }
    .win-bottom-nav-card {
      display:grid;
      grid-template-columns:repeat(4,minmax(0,1fr));
      gap:0.75rem;
    }
    .win-bottom-nav-link {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:1rem;
      min-height:66px;
      border-radius:24px;
      padding:1rem 1.05rem;
      background:#f7f9f7;
      border:1px solid rgba(17,24,39,0.06);
      color:#102019;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.82rem;
      font-weight:900;
      text-decoration:none;
      transition:transform 0.2s ease, background 0.2s ease;
    }
    .win-bottom-nav-link:hover {
      transform:translateY(-2px);
      background:#fff;
    }
    .win-bottom-nav-link::after {
      content:'→';
      color:#0f766e;
      font-weight:950;
    }
    .win-bottom-nav-link.back::before {
      content:'←';
      color:#0f766e;
      font-weight:950;
    }
    .win-bottom-nav-link.back::after {
      content:'';
    }
    @media(max-width:900px){
      .win-bottom-nav-head {
        grid-template-columns:1fr;
        align-items:start;
      }
      .win-bottom-nav-card {
        grid-template-columns:1fr;
      }
    }
    @media(max-width:640px){
      .win-bottom-nav { padding:3.5rem 0; }
      .win-bottom-nav-inner { padding:0 1.25rem; }
      .win-bottom-nav-shell { border-radius:26px; padding:0.85rem; }
      .win-bottom-nav-head { padding:1rem 1rem 1.25rem; }
    }
  `}</style>

  <section className="win-bottom-nav">
    <div className="win-bottom-nav-inner">
      <div className="win-bottom-nav-shell">
        <div className="win-bottom-nav-head">
          <div>
            <div className="win-eyebrow">
              <span className="win-eyebrow-line" />
              <span className="win-eyebrow-text">Explore More</span>
            </div>

            <h2 className="win-bottom-nav-title">
              Continue planning your <span>Himalayan retreat.</span>
            </h2>
          </div>

          <p className="win-bottom-nav-copy">
            Winter is one season. Compare it with summer timing, weekend formats, or the full Himalayan retreat directory before choosing.
          </p>
        </div>

        <div className="win-bottom-nav-card">
          <Link href="/retreats/himalayan-retreats" className="win-bottom-nav-link back">Himalayan Retreats</Link>
          <Link href="/retreats/summer-himalayan-retreats" className="win-bottom-nav-link">Summer Retreats</Link>
          <Link href="/retreats/weekend-himalayan-retreats" className="win-bottom-nav-link">Weekend Retreats</Link>
          <Link href="/retreats" className="win-bottom-nav-link">All Retreats</Link>
        </div>
      </div>
    </div>
  </section>

      </article>
    </TrackedPage>
  );
}
