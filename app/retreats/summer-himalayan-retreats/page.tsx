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

const PATH = '/retreats/summer-himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Summer Himalayan Retreats in India — May & June Escape',
    description:
      'Escape the Indian summer with Himalayan retreats in Sankri, Munsiyari, Chakrata and Rishikesh. Cool mountain air, yoga, meditation and transformational stays from May to June.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Summer Himalayan Retreats in India — May & June Escape',
      description:
        'Cool mountain air, open landscapes, and structured retreat programs across four Himalayan locations. May–June programs for heat escape and intentional pause.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Summer Himalayan Retreats in India — May & June Escape'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How cool are the Himalayas in May and June?',
    answer:
      'Temperatures vary by altitude. Sankri and Munsiyari typically range from 10–22°C, offering genuine relief from plains heat. Chakrata sits around 15–28°C — noticeably cooler than Delhi but not alpine cold. Rishikesh is warmer at 25–35°C but still more comfortable than the deep plains. For maximum temperature contrast, higher-altitude locations like Sankri and Munsiyari deliver the strongest summer cooling.',
  },
  {
    question: 'Is summer a good time for a first retreat?',
    answer:
      'Summer is arguably the best season for first-time retreat participants. The weather is comfortable, daylight hours are long, and outdoor programming is at its fullest. Trails are accessible, landscapes are green, and the extended evenings allow gentle transition into retreat rhythm without the intensity of winter cold or monsoon restrictions. Most beginners find May and June the most approachable window.',
  },
  {
    question: 'Will monsoon affect a May or June retreat?',
    answer:
      'Monsoon typically arrives in the Himalayan foothills by late June or early July. May and early-to-mid June programs generally operate before monsoon onset. Late June retreats at lower elevations such as Rishikesh may encounter pre-monsoon humidity and occasional rain. Higher-altitude locations like Sankri and Munsiyari see monsoon effects later and less intensely. Program dates are set with seasonal timing in mind.',
  },
  {
    question: 'What should I pack for a summer Himalayan retreat?',
    answer:
      'Light layers are essential — mornings and evenings can be cool even when days are warm. A light rain jacket for unexpected showers, comfortable walking shoes with grip, sunscreen, a hat, and a reusable water bottle are recommended. Loose, breathable clothing works well for yoga and movement sessions. Detailed packing guidance is provided after booking based on the specific location and altitude.',
  },
  {
    question: 'Can I combine a summer retreat with trekking?',
    answer:
      'Yes. Summer is peak trekking season in the higher Himalayas, and locations like Sankri and Munsiyari offer natural retreat-plus-trek combinations. Kedarkantha and Har Ki Dun from Sankri, or Khaliya Top and Milam Glacier approaches from Munsiyari, can be paired with retreat programs. These hybrid formats suit participants who want both physical challenge and reflective practice.',
  },
];

export default function SummerHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Himalayan Retreats', url: buildCanonicalUrl('/retreats/himalayan-retreats') },
    { name: 'Summer Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <AutoArticleSchema
        title="Summer Himalayan Retreats in India"
        description="Escape the Indian summer with Himalayan retreats in Sankri, Munsiyari, Chakrata and Rishikesh. Cool mountain air, yoga, meditation and transformational stays from May to June."
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
          { name: 'Summer Retreats' },
        ]}
      />

    

  {/* ── HERO ── */}
  <style>{`
    .sum-hero {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      position:relative;
      overflow:hidden;
      background:
        radial-gradient(circle at 14% 18%, rgba(217,180,111,0.18), transparent 28%),
        radial-gradient(circle at 82% 14%, rgba(15,118,110,0.16), transparent 30%),
        linear-gradient(135deg, #f7f9f7 0%, #eef7ef 56%, #102019 56%, #102019 100%);
      padding:5rem 0;
      border-bottom:1px solid rgba(15,118,110,0.14);
    }
    .sum-hero::before {
      content:'';
      position:absolute;
      inset:0;
      background:
        linear-gradient(90deg, rgba(255,255,255,0.22), transparent 42%, rgba(0,0,0,0.1)),
        radial-gradient(circle at 70% 82%, rgba(217,180,111,0.08), transparent 26%);
      pointer-events:none;
    }
    .sum-hero-inner {
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
    .sum-hero-copy {
      max-width:46rem;
    }
    .sum-eyebrow {
      display:flex;
      align-items:center;
      gap:0.75rem;
      margin-bottom:1.35rem;
    }
    .sum-eyebrow-line {
      width:34px;
      height:1px;
      background:#d9b46f;
      flex-shrink:0;
    }
    .sum-eyebrow-text {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.72rem;
      letter-spacing:0.24em;
      text-transform:uppercase;
      font-weight:850;
      color:#102019;
    }
    .sum-hero-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.65rem,6vw,5.45rem);
      line-height:0.95;
      letter-spacing:-0.075em;
      font-weight:230;
      color:#101010;
      margin:0 0 1.25rem;
      text-wrap:balance;
    }
    .sum-hero-title span {
      color:#0f766e;
    }
    .sum-hero-lead {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1rem,1.35vw,1.14rem);
      line-height:1.85;
      font-weight:300;
      color:#4b5563;
      margin:0 0 1rem;
      max-width:44rem;
    }
    .sum-hero-signals {
      display:flex;
      flex-wrap:wrap;
      gap:0.5rem;
      margin:1.55rem 0 2rem;
    }
    .sum-hero-signals span {
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
    .sum-hero-actions {
      display:flex;
      flex-wrap:wrap;
      gap:0.75rem;
      align-items:center;
      margin-top:0.25rem;
    }
    .sum-hero-btn {
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
    .sum-hero-btn:hover {
      transform:translateY(-2px);
    }
    .sum-hero-btn-secondary {
      background:rgba(15,118,110,0.08);
      color:#102019;
      border:1px solid rgba(15,118,110,0.16);
    }
    .sum-hero-card {
      position:relative;
      border-radius:36px;
      background:linear-gradient(180deg, rgba(20,72,51,0.98) 0%, rgba(12,41,30,0.99) 100%);
      border:1px solid rgba(217,180,111,0.18);
      box-shadow:0 26px 90px rgba(0,0,0,0.26);
      color:#fff;
      padding:1.1rem;
      overflow:hidden;
      max-width:100%;
    }
    .sum-hero-card::before {
      content:'';
      position:absolute;
      inset:1rem;
      border-radius:28px;
      border:1px solid rgba(217,180,111,0.12);
      pointer-events:none;
    }
    .sum-hero-card-top,
    .sum-hero-signal-grid,
    .sum-hero-card-bottom {
      position:relative;
      z-index:1;
    }
    .sum-hero-card-top {
      padding:1.05rem 1.05rem 0.45rem;
    }
    .sum-hero-kicker {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.68rem;
      letter-spacing:0.18em;
      text-transform:uppercase;
      font-weight:900;
      color:#d9b46f;
      margin:0 0 0.7rem;
    }
    .sum-hero-card-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.45rem,2.7vw,2.15rem);
      line-height:1.05;
      letter-spacing:-0.055em;
      font-weight:420;
      color:#fff;
      margin:0;
      text-wrap:balance;
    }
    .sum-hero-signal-grid {
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:0.7rem;
      padding:1rem 0.75rem 0.75rem;
    }
    .sum-signal {
      min-height:128px;
      border-radius:22px;
      background:rgba(255,255,255,0.065);
      border:1px solid rgba(255,255,255,0.1);
      padding:1rem;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .sum-signal strong {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:1.05rem;
      line-height:1.08;
      letter-spacing:-0.04em;
      color:#fff;
      margin-bottom:0.5rem;
    }
    .sum-signal span {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.75rem;
      line-height:1.5;
      color:rgba(255,255,255,0.72);
    }
    .sum-signal-mark {
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
    .sum-hero-card-bottom {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:0.55rem;
      padding:0 0.75rem 0.75rem;
    }
    .sum-hero-stat {
      border-radius:18px;
      background:rgba(217,180,111,0.1);
      border:1px solid rgba(217,180,111,0.16);
      padding:0.8rem;
    }
    .sum-hero-stat strong {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:1.1rem;
      letter-spacing:-0.04em;
      color:#d9b46f;
      margin-bottom:0.2rem;
    }
    .sum-hero-stat span {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.68rem;
      line-height:1.35;
      color:rgba(255,255,255,0.64);
    }
    @media(max-width:900px){
      .sum-hero {
        background:
          radial-gradient(circle at 12% 18%, rgba(217,180,111,0.14), transparent 28%),
          linear-gradient(180deg, #f7f9f7 0%, #eef7ef 56%, #102019 56%, #102019 100%);
      }
      .sum-hero-inner {
        grid-template-columns:1fr;
        gap:2rem;
      }
    }
    @media(max-width:640px){
      .sum-hero { padding:4.5rem 0 3.5rem; }
      .sum-hero-inner { padding:0 1.25rem; }
      .sum-hero-signal-grid,
      .sum-hero-card-bottom { grid-template-columns:1fr; }
    }
  `}</style>

  <section className="sum-hero">
    <div className="sum-hero-inner">
      <div className="sum-hero-copy">
        <div className="sum-eyebrow">
          <span className="sum-eyebrow-line" />
          <span className="sum-eyebrow-text">Summer Retreats · May–June</span>
        </div>

        <h1 className="sum-hero-title">
          Summer Himalayan Retreats <span>in India.</span>
        </h1>

        <p className="sum-hero-lead">
          When the Indian plains cross 40°C in May and June, the Himalayan foothills and valleys sit between 12 and 25 degrees. The air is clean. The views are open. The forests are fully green and alive.
        </p>

        <p className="sum-hero-lead">
          Long daylight hours extend practice into early morning and late evening. Trails open for walking meditation and light trekking. Outdoor yoga happens in meadows rather than enclosed rooms.
        </p>

        <div className="sum-hero-signals">
          <span>Heat escape</span>
          <span>Long daylight</span>
          <span>Green forests</span>
          <span>Outdoor practice</span>
        </div>

        <div className="sum-hero-actions">
          <Link href="#summer-retreat-planner" className="sum-hero-btn">
            Plan My Summer Retreat
          </Link>
          <Link href="#summer-locations" className="sum-hero-btn sum-hero-btn-secondary">
            Compare Summer Locations
          </Link>
        </div>
      </div>

      <div className="sum-hero-card" aria-label="Summer retreat atmosphere">
        <div className="sum-hero-card-top">
          <p className="sum-hero-kicker">Heat escape container</p>
          <p className="sum-hero-card-title">A brighter retreat season shaped by cool air, open trails, and long green days.</p>
        </div>

        <div className="sum-hero-signal-grid">
          <div className="sum-signal">
            <div>
              <div className="sum-signal-mark">01</div>
              <strong>Cool mountain air</strong>
            </div>
            <span>Relief from 40°C plains heat.</span>
          </div>

          <div className="sum-signal">
            <div>
              <div className="sum-signal-mark">02</div>
              <strong>Long daylight</strong>
            </div>
            <span>More time for yoga, walking, and integration.</span>
          </div>

          <div className="sum-signal">
            <div>
              <div className="sum-signal-mark">03</div>
              <strong>Open trails</strong>
            </div>
            <span>Meadows, forest walks, and light trekking.</span>
          </div>

          <div className="sum-signal">
            <div>
              <div className="sum-signal-mark">04</div>
              <strong>Green forests</strong>
            </div>
            <span>Dense canopy, snowmelt rivers, and living landscape.</span>
          </div>
        </div>

        <div className="sum-hero-card-bottom">
          <div className="sum-hero-stat">
            <strong>May</strong>
            <span>clear heat escape</span>
          </div>
          <div className="sum-hero-stat">
            <strong>Jun</strong>
            <span>green pre-monsoon</span>
          </div>
          <div className="sum-hero-stat">
            <strong>12–25°</strong>
            <span>mountain relief</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="summer-retreat-planner">
    <PrimaryCTA label="Plan My Summer Retreat" subtext="Planning a summer retreat? Let us help you find the right location." vertical="retreat" category="seasonal" sourcePath="/retreats/summer-himalayan-retreats" />
  </section>

  {/* ── WHY CHOOSE ── */}
  <style>{`
    .sum-why {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at 12% 12%, rgba(217,180,111,0.13), transparent 30%),
        radial-gradient(circle at 88% 18%, rgba(15,118,110,0.1), transparent 30%),
        linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .sum-why-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .sum-why-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .sum-why-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.7rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .sum-why-title span {
      color:#0f766e;
    }
    .sum-why-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .sum-why-grid {
      display:grid;
      grid-template-columns:repeat(4,minmax(0,1fr));
      gap:1rem;
    }
    .sum-why-card {
      position:relative;
      overflow:hidden;
      min-height:340px;
      border-radius:30px;
      border:1px solid rgba(17,24,39,0.08);
      background:#fff;
      box-shadow:0 24px 80px rgba(17,24,39,0.07);
      padding:1.35rem;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .sum-why-card::before {
      content:'';
      position:absolute;
      inset:0;
      background:radial-gradient(circle at top right, rgba(15,118,110,0.1), transparent 34%);
      pointer-events:none;
    }
    .sum-why-card-primary {
      background:#102019;
      border-color:rgba(217,180,111,0.18);
      color:#fff;
    }
    .sum-why-card-primary::before {
      background:radial-gradient(circle at top right, rgba(217,180,111,0.18), transparent 36%);
    }
    .sum-why-card > * {
      position:relative;
      z-index:1;
    }
    .sum-why-top {
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:1rem;
      margin-bottom:1.25rem;
    }
    .sum-why-label {
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
    .sum-why-card-primary .sum-why-label {
      background:rgba(217,180,111,0.12);
      border-color:rgba(217,180,111,0.24);
      color:#d9b46f;
    }
    .sum-why-num {
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
    .sum-why-card h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.3rem,2.6vw,2.15rem);
      line-height:1;
      letter-spacing:-0.06em;
      font-weight:300;
      color:#111;
      margin:0 0 0.9rem;
      text-wrap:balance;
    }
    .sum-why-card-primary h3 {
      color:#fff;
    }
    .sum-why-card p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.86rem;
      line-height:1.72;
      font-weight:300;
      color:#4b5563;
      margin:0;
    }
    .sum-why-card-primary p {
      color:rgba(255,255,255,0.74);
    }
    .sum-why-note {
      margin-top:1rem;
      border-radius:30px;
      background:#fff;
      border:1px solid rgba(17,24,39,0.08);
      box-shadow:0 24px 80px rgba(17,24,39,0.06);
      padding:1.25rem 1.35rem;
    }
    .sum-why-note p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.9rem;
      font-weight:300;
      line-height:1.75;
      color:#4b5563;
      margin:0;
    }
    .sum-why-note strong {
      color:#111;
      font-weight:850;
    }
    @media(max-width:1050px){
      .sum-why-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
      .sum-why-card { min-height:280px; }
    }
    @media(max-width:760px){
      .sum-why { padding:4rem 0; }
      .sum-why-inner { padding:0 1.25rem; }
      .sum-why-head { grid-template-columns:1fr; align-items:start; }
      .sum-why-grid { grid-template-columns:1fr; }
      .sum-why-card { min-height:auto; padding:1.25rem; border-radius:26px; }
    }
  `}</style>

  <section className="sum-why scroll-fade">
    <div className="sum-why-inner">
      <div className="sum-why-head">
        <div>
          <div className="sum-eyebrow">
            <span className="sum-eyebrow-line" />
            <span className="sum-eyebrow-text">Why Summer</span>
          </div>

          <h2 className="sum-why-title">
            Why summer changes <span>the retreat outcome.</span>
          </h2>
        </div>

        <p className="sum-why-copy">
          The primary draw is climate contrast. When Delhi, Mumbai, and Bengaluru are at peak heat and humidity, the Himalayan mid-altitudes offer temperatures that feel like a different season. But the value is not merely thermal.
        </p>
      </div>

      <div className="sum-why-grid">
        <div className="sum-why-card sum-why-card-primary">
          <div>
            <div className="sum-why-top">
              <span className="sum-why-label">Climate contrast</span>
              <span className="sum-why-num">01</span>
            </div>
            <h3>Temperature and comfort.</h3>
            <p>
              At 1,500–2,500 metres, daytime temperatures range from 18 to 25°C. Nights are cool enough for deep sleep without heating. This is the Goldilocks window — warm enough for outdoor practice, cool enough for the body to recover.
            </p>
          </div>
        </div>

        <div className="sum-why-card">
          <div>
            <div className="sum-why-top">
              <span className="sum-why-label">Long days</span>
              <span className="sum-why-num">02</span>
            </div>
            <h3>Extended daylight.</h3>
            <p>
              Summer days in the Himalayas stretch past 7 PM. Morning light arrives before 5 AM. This creates programming flexibility — sunrise yoga, late-afternoon nature walks, and evening integration sessions in natural light.
            </p>
          </div>
        </div>

        <div className="sum-why-card">
          <div>
            <div className="sum-why-top">
              <span className="sum-why-label">Full landscape</span>
              <span className="sum-why-num">03</span>
            </div>
            <h3>Landscape at full capacity.</h3>
            <p>
              Forests are dense and green. Wildflowers bloom across alpine meadows. Rivers run full from snowmelt. The landscape is generous in summer — visually rich, acoustically alive, and physically inviting.
            </p>
          </div>
        </div>

        <div className="sum-why-card">
          <div>
            <div className="sum-why-top">
              <span className="sum-why-label">Easy entry</span>
              <span className="sum-why-num">04</span>
            </div>
            <h3>Beginner-friendly conditions.</h3>
            <p>
              Summer removes the barriers that discourage first-time participants in other seasons — cold temperatures, snow logistics, road uncertainty. May–June is the most natural entry point for exploring the retreat format.
            </p>
          </div>
        </div>
      </div>

      <div className="sum-why-note">
        <p>
          <strong>Summer’s real advantage:</strong> the body relaxes faster when the climate is comfortable, the landscape is open, and practice can move outdoors.
        </p>
      </div>
    </div>
  </section>

  {/* ── BEST LOCATIONS ── */}
  <style>{`
    .sum-locations {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at top left, rgba(217,180,111,0.13), transparent 30%),
        radial-gradient(circle at 88% 18%, rgba(15,118,110,0.11), transparent 30%),
        linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .sum-locations-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .sum-locations-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .sum-locations-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.7rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .sum-locations-title span {
      color:#0f766e;
    }
    .sum-locations-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .sum-spectrum {
      display:grid;
      gap:1rem;
    }
    .sum-location-row {
      display:grid;
      grid-template-columns:0.38fr 0.62fr;
      min-height:340px;
      border-radius:34px;
      overflow:hidden;
      border:1px solid rgba(17,24,39,0.08);
      background:#fff;
      box-shadow:0 24px 80px rgba(17,24,39,0.07);
    }
    .sum-location-row-cool,
    .sum-location-row-alpine {
      background:#102019;
      border-color:rgba(217,180,111,0.18);
      color:#fff;
    }
    .sum-location-row-alt {
      grid-template-columns:0.62fr 0.38fr;
    }
    .sum-location-media {
      position:relative;
      min-height:340px;
      overflow:hidden;
      background:#102019;
    }
    .sum-location-media img {
      width:100%;
      height:100%;
      object-fit:cover;
      display:block;
    }
    .sum-location-row-cool .sum-location-media img,
    .sum-location-row-alpine .sum-location-media img {
      opacity:0.8;
    }
    .sum-location-body {
      padding:2rem;
      display:flex;
      flex-direction:column;
      justify-content:center;
    }
    .sum-location-label {
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
    .sum-location-row-cool .sum-location-label,
    .sum-location-row-alpine .sum-location-label {
      background:rgba(217,180,111,0.12);
      border-color:rgba(217,180,111,0.24);
      color:#d9b46f;
    }
    .sum-location-body h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.75rem,3.8vw,3.55rem);
      line-height:0.98;
      letter-spacing:-0.07em;
      font-weight:250;
      color:#111;
      margin:0 0 1rem;
      text-wrap:balance;
    }
    .sum-location-row-cool .sum-location-body h3,
    .sum-location-row-alpine .sum-location-body h3 {
      color:#fff;
    }
    .sum-location-body h3 a {
      color:inherit;
      text-decoration:none;
    }
    .sum-location-body p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.88rem;
      line-height:1.78;
      font-weight:300;
      color:#4b5563;
      margin:0 0 0.85rem;
      max-width:44rem;
    }
    .sum-location-row-cool .sum-location-body p,
    .sum-location-row-alpine .sum-location-body p {
      color:rgba(255,255,255,0.74);
    }
    .sum-location-body a {
      color:#0f766e;
      font-weight:760;
      text-decoration:none;
    }
    .sum-location-row-cool .sum-location-body a,
    .sum-location-row-alpine .sum-location-body a {
      color:#d9b46f;
    }
    .sum-location-body a:hover {
      text-decoration:underline;
    }
    .sum-location-facts {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:0.65rem;
      margin:1.1rem 0 1.25rem;
    }
    .sum-location-fact {
      border-radius:18px;
      background:#f7f9f7;
      border:1px solid rgba(17,24,39,0.08);
      padding:0.82rem;
    }
    .sum-location-row-cool .sum-location-fact,
    .sum-location-row-alpine .sum-location-fact {
      background:rgba(255,255,255,0.07);
      border-color:rgba(255,255,255,0.12);
    }
    .sum-location-fact strong {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.68rem;
      letter-spacing:0.1em;
      text-transform:uppercase;
      color:#0f766e;
      margin-bottom:0.35rem;
    }
    .sum-location-row-cool .sum-location-fact strong,
    .sum-location-row-alpine .sum-location-fact strong {
      color:#d9b46f;
    }
    .sum-location-fact span {
      display:block;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.74rem;
      line-height:1.48;
      color:#4b5563;
    }
    .sum-location-row-cool .sum-location-fact span,
    .sum-location-row-alpine .sum-location-fact span {
      color:rgba(255,255,255,0.68);
    }
    .sum-location-actions {
      display:flex;
      flex-wrap:wrap;
      gap:0.75rem;
      margin-top:0.35rem;
    }
    .sum-location-btn {
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
    .sum-location-row-cool .sum-location-btn,
    .sum-location-row-alpine .sum-location-btn {
      background:#d9b46f;
      color:#111 !important;
    }
    .sum-location-btn:hover {
      transform:translateY(-2px);
      text-decoration:none !important;
    }
    @media(max-width:900px){
      .sum-locations-head { grid-template-columns:1fr; align-items:start; }
      .sum-location-row,
      .sum-location-row-alt {
        grid-template-columns:1fr;
      }
      .sum-location-row-alt .sum-location-media {
        order:0;
      }
      .sum-location-row-alt .sum-location-body {
        order:1;
      }
      .sum-location-media {
        min-height:240px;
      }
    }
    @media(max-width:640px){
      .sum-locations { padding:4rem 0; }
      .sum-locations-inner { padding:0 1.25rem; }
      .sum-location-body { padding:1.35rem; }
      .sum-location-facts { grid-template-columns:1fr; }
      .sum-location-btn { width:100%; }
    }
  `}</style>

  <section id="summer-locations" className="sum-locations scroll-fade">
    <div className="sum-locations-inner">
      <div className="sum-locations-head">
        <div>
          <div className="sum-eyebrow">
            <span className="sum-eyebrow-line" />
            <span className="sum-eyebrow-text">Four Locations</span>
          </div>

          <h2 className="sum-locations-title">
            Choose your <span>summer cooling level.</span>
          </h2>
        </div>

        <p className="sum-locations-copy">
          Summer amplifies the strengths of higher-altitude locations while making lower elevations warmer. The choice depends on how much altitude you want, whether you plan to combine trekking with retreat, and how far you are willing to travel.
        </p>
      </div>

      <div className="sum-spectrum">
        <div className="sum-location-row sum-location-row-cool">
          <div className="sum-location-media">
            <Image src="/Images/location/sankri.webp" alt="Sankri — pine forest valley in Govind Wildlife Sanctuary, Garhwal" width={620} height={460} sizes="(max-width: 900px) 100vw, 38vw" quality={75} />
          </div>

          <div className="sum-location-body">
            <div className="sum-location-label">Cool pine valley</div>
            <h3><Link href="/retreats/sankri">Sankri — Cool pine forest valleys</Link></h3>

            <p>
              Sankri sits at the upper edge of the treeline in the Govind Wildlife Sanctuary corridor, where summer temperatures rarely exceed 22°C. Pine and oak forests provide natural air conditioning and walking routes that stay cool even at midday.
            </p>

            <div className="sum-location-facts">
              <div className="sum-location-fact">
                <strong>Summer type</strong>
                <span>Cool, green, trail-rich</span>
              </div>
              <div className="sum-location-fact">
                <strong>Best for</strong>
                <span>Retreat plus trekking</span>
              </div>
              <div className="sum-location-fact">
                <strong>Feel</strong>
                <span>Forest shade and snowmelt rivers</span>
              </div>
            </div>

            <p>
              Kedarkantha and Har Ki Dun trails are fully accessible, making Sankri the strongest summer location for participants who want physical movement alongside reflective practice.
            </p>

            <div className="sum-location-actions">
              <Link href="/retreats/sankri" className="sum-location-btn">View Sankri retreats</Link>
            </div>
          </div>
        </div>

        <div className="sum-location-row sum-location-row-alpine sum-location-row-alt">
          <div className="sum-location-body">
            <div className="sum-location-label">Premium alpine cool</div>
            <h3><Link href="/retreats/munsiyari">Munsiyari — High altitude and Panchachuli views</Link></h3>

            <p>
              Munsiyari in summer is the premium alpine option. At over 2,200 metres, with the Panchachuli massif filling the northern horizon, this is mountain retreat at its most dramatic.
            </p>

            <div className="sum-location-facts">
              <div className="sum-location-fact">
                <strong>Summer type</strong>
                <span>15–22°C, alpine, remote</span>
              </div>
              <div className="sum-location-fact">
                <strong>Best for</strong>
                <span>Experienced retreat participants</span>
              </div>
              <div className="sum-location-fact">
                <strong>Feel</strong>
                <span>Altitude, grandeur, separation</span>
              </div>
            </div>

            <p>
              Khaliya Top meadows bloom with wildflowers. The longer journey creates natural psychological separation from routine.
            </p>

            <div className="sum-location-actions">
              <Link href="/retreats/munsiyari" className="sum-location-btn">View Munsiyari retreats</Link>
            </div>
          </div>

          <div className="sum-location-media">
            <Image src="/Images/location/munsiyari.webp" alt="Munsiyari — Panchachuli massif views from high altitude Kumaon village" width={620} height={460} sizes="(max-width: 900px) 100vw, 38vw" quality={75} />
          </div>
        </div>

        <div className="sum-location-row">
          <div className="sum-location-media">
            <Image src="/Images/location/chakrata.webp" alt="Chakrata — deodar forest trails on forested ridge near Dehradun" width={620} height={460} sizes="(max-width: 900px) 100vw, 38vw" quality={75} />
          </div>

          <div className="sum-location-body">
            <div className="sum-location-label">Easy hill escape</div>
            <h3><Link href="/retreats/chakrata">Chakrata — Quiet hill escape</Link></h3>

            <p>
              Chakrata is the most accessible summer escape — reachable from Delhi within a day, sitting on a forested ridge at moderate altitude. Summer days are warm but comfortable, and the deodar forests provide shade and walking routes.
            </p>

            <div className="sum-location-facts">
              <div className="sum-location-fact">
                <strong>Summer type</strong>
                <span>Warm, shaded, easy access</span>
              </div>
              <div className="sum-location-fact">
                <strong>Best for</strong>
                <span>Long weekends and short retreats</span>
              </div>
              <div className="sum-location-fact">
                <strong>Access</strong>
                <span>Simple logistics from Delhi</span>
              </div>
            </div>

            <p>
              For professionals seeking a three-to-five-day retreat without complex logistics, Chakrata delivers genuine mountain environment with minimal travel friction.
            </p>

            <div className="sum-location-actions">
              <Link href="/retreats/chakrata" className="sum-location-btn">View Chakrata retreats</Link>
            </div>
          </div>
        </div>

        <div className="sum-location-row sum-location-row-alt">
          <div className="sum-location-body">
            <div className="sum-location-label">Spiritual heat window</div>
            <h3><Link href="/retreats/rishikesh">Rishikesh — Riverside retreats before monsoon</Link></h3>

            <p>
              Rishikesh in May–June is warmer than the mountain locations but remains cooler than the deep plains. Pre-monsoon energy creates intensity — the Ganges runs strong and serious yoga courses run their intensive summer cohorts.
            </p>

            <div className="sum-location-facts">
              <div className="sum-location-fact">
                <strong>Summer type</strong>
                <span>Warm, spiritual, pre-monsoon</span>
              </div>
              <div className="sum-location-fact">
                <strong>Best for</strong>
                <span>Yoga and teacher-led study</span>
              </div>
              <div className="sum-location-fact">
                <strong>Feel</strong>
                <span>Riverside intensity, not cool escape</span>
              </div>
            </div>

            <p>
              For those drawn to <Link href="/retreats/journeys/yoga-and-movement">yoga and movement</Link> or philosophical study, pre-monsoon Rishikesh has focused energy.
            </p>

            <div className="sum-location-actions">
              <Link href="/retreats/rishikesh" className="sum-location-btn">View Rishikesh retreats</Link>
            </div>
          </div>

          <div className="sum-location-media">
            <Image src="/Images/location/rishikesh.webp" alt="Rishikesh — Ganges riverside yoga and retreat before monsoon" width={620} height={460} sizes="(max-width: 900px) 100vw, 38vw" quality={75} />
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ── WHAT TO EXPECT ── */}
  <style>{`
    .sum-day {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at 12% 8%, rgba(217,180,111,0.16), transparent 30%),
        radial-gradient(circle at 88% 20%, rgba(15,118,110,0.1), transparent 32%),
        linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .sum-day-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .sum-day-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .sum-day-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.7rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .sum-day-title span {
      color:#0f766e;
    }
    .sum-day-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .sum-day-shell {
      position:relative;
      display:grid;
      grid-template-columns:0.36fr 0.64fr;
      gap:1rem;
      align-items:stretch;
    }
    .sum-day-sun {
      border-radius:34px;
      background:#102019;
      border:1px solid rgba(217,180,111,0.18);
      box-shadow:0 24px 80px rgba(17,24,39,0.08);
      padding:1.5rem;
      min-height:520px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      overflow:hidden;
      position:relative;
    }
    .sum-day-sun::before {
      content:'';
      position:absolute;
      width:260px;
      height:260px;
      border-radius:999px;
      right:-70px;
      top:-70px;
      background:radial-gradient(circle, rgba(217,180,111,0.45), rgba(217,180,111,0.12) 45%, transparent 70%);
    }
    .sum-day-sun::after {
      content:'';
      position:absolute;
      inset:auto 1.5rem 1.5rem 1.5rem;
      height:1px;
      background:linear-gradient(90deg, transparent, rgba(217,180,111,0.55), transparent);
    }
    .sum-day-sun > * {
      position:relative;
      z-index:1;
    }
    .sum-day-sun-label {
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
      letter-spacing:0.12em;
      text-transform:uppercase;
    }
    .sum-day-sun h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2rem,4vw,4.2rem);
      line-height:0.92;
      letter-spacing:-0.08em;
      font-weight:230;
      color:#fff;
      margin:1.5rem 0 1rem;
      text-wrap:balance;
    }
    .sum-day-sun p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.9rem;
      line-height:1.78;
      font-weight:300;
      color:rgba(255,255,255,0.72);
      margin:0;
    }
    .sum-day-meter {
      display:grid;
      gap:0.7rem;
      margin-top:1.5rem;
    }
    .sum-day-meter-row {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:1rem;
      border-radius:18px;
      background:rgba(255,255,255,0.07);
      border:1px solid rgba(255,255,255,0.12);
      padding:0.85rem;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.74rem;
      color:rgba(255,255,255,0.7);
    }
    .sum-day-meter-row strong {
      color:#d9b46f;
      font-size:0.68rem;
      letter-spacing:0.1em;
      text-transform:uppercase;
    }
    .sum-day-timeline {
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:1rem;
    }
    .sum-day-card {
      position:relative;
      min-height:250px;
      border-radius:30px;
      background:#fff;
      border:1px solid rgba(17,24,39,0.08);
      box-shadow:0 24px 80px rgba(17,24,39,0.06);
      padding:1.35rem;
      overflow:hidden;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .sum-day-card::before {
      content:'';
      position:absolute;
      inset:0;
      background:radial-gradient(circle at top right, rgba(15,118,110,0.1), transparent 35%);
      pointer-events:none;
    }
    .sum-day-card > * {
      position:relative;
      z-index:1;
    }
    .sum-day-time {
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:1rem;
      margin-bottom:1.25rem;
    }
    .sum-day-phase {
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
    .sum-day-clock {
      display:flex;
      align-items:center;
      justify-content:center;
      width:42px;
      height:42px;
      border-radius:16px;
      background:#d9b46f;
      color:#111;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.72rem;
      font-weight:950;
      flex-shrink:0;
    }
    .sum-day-card h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.35rem,2.8vw,2.25rem);
      line-height:1;
      letter-spacing:-0.06em;
      font-weight:300;
      color:#111;
      margin:0 0 0.9rem;
      text-wrap:balance;
    }
    .sum-day-card p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.86rem;
      line-height:1.72;
      font-weight:300;
      color:#4b5563;
      margin:0;
    }
    .sum-day-note {
      margin-top:1rem;
      border-radius:30px;
      background:#fff;
      border:1px solid rgba(17,24,39,0.08);
      box-shadow:0 24px 80px rgba(17,24,39,0.06);
      padding:1.25rem 1.35rem;
    }
    .sum-day-note p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.9rem;
      font-weight:300;
      line-height:1.75;
      color:#4b5563;
      margin:0;
    }
    .sum-day-note a {
      color:#0f766e;
      text-decoration:none;
      font-weight:850;
    }
    .sum-day-note a:hover {
      text-decoration:underline;
    }
    @media(max-width:980px){
      .sum-day-shell { grid-template-columns:1fr; }
      .sum-day-sun { min-height:auto; }
    }
    @media(max-width:760px){
      .sum-day { padding:4rem 0; }
      .sum-day-inner { padding:0 1.25rem; }
      .sum-day-head { grid-template-columns:1fr; align-items:start; }
      .sum-day-timeline { grid-template-columns:1fr; }
      .sum-day-card { min-height:auto; padding:1.25rem; border-radius:26px; }
      .sum-day-sun { border-radius:26px; }
    }
  `}</style>

  <section className="sum-day scroll-fade">
    <div className="sum-day-inner">
      <div className="sum-day-head">
        <div>
          <div className="sum-eyebrow">
            <span className="sum-eyebrow-line" />
            <span className="sum-eyebrow-text">A Typical Day</span>
          </div>

          <h2 className="sum-day-title">
            A summer retreat moves with <span>the long daylight.</span>
          </h2>
        </div>

        <p className="sum-day-copy">
          Summer programming takes advantage of extended daylight and comfortable outdoor conditions. A typical day is more expansive than winter formats — more time outside, more movement, more landscape integration.
        </p>
      </div>

      <div className="sum-day-shell">
        <aside className="sum-day-sun">
          <div>
            <span className="sum-day-sun-label">Summer rhythm</span>
            <h3>First light to long evening.</h3>
            <p>
              The day begins early because mountain air is coolest and clearest before the sun rises fully. By evening, there is still enough natural light for journaling, conversation, and quiet integration.
            </p>
          </div>

          <div className="sum-day-meter">
            <div className="sum-day-meter-row">
              <strong>Morning</strong>
              <span>open air practice</span>
            </div>
            <div className="sum-day-meter-row">
              <strong>Midday</strong>
              <span>shade and recovery</span>
            </div>
            <div className="sum-day-meter-row">
              <strong>Evening</strong>
              <span>extended integration</span>
            </div>
          </div>
        </aside>

        <div className="sum-day-timeline">
          <div className="sum-day-card">
            <div>
              <div className="sum-day-time">
                <span className="sum-day-phase">First light</span>
                <span className="sum-day-clock">05 AM</span>
              </div>
              <h3>Morning yoga in open air.</h3>
              <p>
                Meadow or forest-edge sessions begin at first light, when mountain air is coolest and clearest. Breathwork and pranayama feel deeper in clean, oxygen-rich mountain air.
              </p>
            </div>
          </div>

          <div className="sum-day-card">
            <div>
              <div className="sum-day-time">
                <span className="sum-day-phase">Midday shade</span>
                <span className="sum-day-clock">11 AM</span>
              </div>
              <h3>Guided forest meditation.</h3>
              <p>
                Walking or seated practice moves under tree canopy, using natural sound as the meditation object. The shade creates a quieter middle of the day instead of a rushed schedule.
              </p>
            </div>
          </div>

          <div className="sum-day-card">
            <div>
              <div className="sum-day-time">
                <span className="sum-day-phase">Afternoon trail</span>
                <span className="sum-day-clock">04 PM</span>
              </div>
              <h3>Nature walks and light trekking.</h3>
              <p>
                Trail-based integration sessions use routes that are fully accessible in summer. Movement, landscape, and reflection become part of the retreat rather than separate activities.
              </p>
            </div>
          </div>

          <div className="sum-day-card">
            <div>
              <div className="sum-day-time">
                <span className="sum-day-phase">Long evening</span>
                <span className="sum-day-clock">07 PM</span>
              </div>
              <h3>Digital detox and integration.</h3>
              <p>
                Reduced connectivity at mountain locations makes disconnection natural rather than disciplined. Long twilight hours support journaling, conversation, or quiet time before natural sleep onset.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sum-day-note">
        <p>
          For a deeper comparison of retreat formats and how to choose between them, see our guide to <Link href="/blog/3-day-vs-5-day-himalayan-retreat">choosing the right retreat length</Link>.
        </p>
      </div>
    </div>
  </section>

  {/* ── WHO IS IT FOR ── */}
  <style>{`
    .sum-who {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at 14% 14%, rgba(217,180,111,0.14), transparent 30%),
        radial-gradient(circle at 88% 22%, rgba(15,118,110,0.1), transparent 32%),
        linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .sum-who-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .sum-who-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .sum-who-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.7rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .sum-who-title span {
      color:#0f766e;
    }
    .sum-who-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .sum-who-grid {
      display:grid;
      grid-template-columns:repeat(5,minmax(0,1fr));
      gap:1rem;
    }
    .sum-who-card {
      position:relative;
      min-height:310px;
      border-radius:30px;
      background:#fff;
      border:1px solid rgba(17,24,39,0.08);
      box-shadow:0 24px 80px rgba(17,24,39,0.06);
      padding:1.25rem;
      overflow:hidden;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .sum-who-card::before {
      content:'';
      position:absolute;
      inset:0;
      background:radial-gradient(circle at top right, rgba(15,118,110,0.1), transparent 35%);
      pointer-events:none;
    }
    .sum-who-card-feature {
      background:#102019;
      border-color:rgba(217,180,111,0.18);
      color:#fff;
    }
    .sum-who-card-feature::before {
      background:radial-gradient(circle at top right, rgba(217,180,111,0.2), transparent 38%);
    }
    .sum-who-card > * {
      position:relative;
      z-index:1;
    }
    .sum-who-icon {
      display:flex;
      align-items:center;
      justify-content:center;
      width:48px;
      height:48px;
      border-radius:18px;
      background:#d9b46f;
      color:#111;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.78rem;
      font-weight:950;
      margin-bottom:1.25rem;
    }
    .sum-who-label {
      display:inline-flex;
      width:max-content;
      max-width:100%;
      border-radius:999px;
      padding:0.38rem 0.7rem;
      background:rgba(15,118,110,0.08);
      border:1px solid rgba(15,118,110,0.16);
      color:#0f766e;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.66rem;
      font-weight:900;
      letter-spacing:0.11em;
      text-transform:uppercase;
      margin-bottom:1rem;
    }
    .sum-who-card-feature .sum-who-label {
      background:rgba(217,180,111,0.12);
      border-color:rgba(217,180,111,0.24);
      color:#d9b46f;
    }
    .sum-who-card h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.25rem,2.4vw,1.85rem);
      line-height:1;
      letter-spacing:-0.06em;
      font-weight:300;
      color:#111;
      margin:0 0 0.85rem;
      text-wrap:balance;
    }
    .sum-who-card-feature h3 {
      color:#fff;
    }
    .sum-who-card p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.82rem;
      line-height:1.7;
      font-weight:300;
      color:#4b5563;
      margin:0;
    }
    .sum-who-card-feature p {
      color:rgba(255,255,255,0.74);
    }
    .sum-who-card a {
      color:#0f766e;
      text-decoration:none;
      font-weight:850;
    }
    .sum-who-card-feature a {
      color:#d9b46f;
    }
    .sum-who-card a:hover {
      text-decoration:underline;
    }
    .sum-who-note {
      margin-top:1rem;
      border-radius:30px;
      background:#fff;
      border:1px solid rgba(17,24,39,0.08);
      box-shadow:0 24px 80px rgba(17,24,39,0.06);
      padding:1.25rem 1.35rem;
    }
    .sum-who-note p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.9rem;
      font-weight:300;
      line-height:1.75;
      color:#4b5563;
      margin:0;
    }
    .sum-who-note strong {
      color:#111;
      font-weight:850;
    }
    @media(max-width:1120px){
      .sum-who-grid { grid-template-columns:repeat(3,minmax(0,1fr)); }
    }
    @media(max-width:820px){
      .sum-who-head { grid-template-columns:1fr; align-items:start; }
      .sum-who-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
    }
    @media(max-width:640px){
      .sum-who { padding:4rem 0; }
      .sum-who-inner { padding:0 1.25rem; }
      .sum-who-grid { grid-template-columns:1fr; }
      .sum-who-card { min-height:auto; padding:1.25rem; border-radius:26px; }
    }
  `}</style>

  <section className="sum-who scroll-fade">
    <div className="sum-who-inner">
      <div className="sum-who-head">
        <div>
          <div className="sum-eyebrow">
            <span className="sum-eyebrow-line" />
            <span className="sum-eyebrow-text">Is This For You</span>
          </div>

          <h2 className="sum-who-title">
            Who summer retreats <span>work best for.</span>
          </h2>
        </div>

        <p className="sum-who-copy">
          Summer is the easiest Himalayan retreat season to enter: warm enough for outdoor practice, cool enough for recovery, and open enough for movement, conversation, and landscape-based integration.
        </p>
      </div>

      <div className="sum-who-grid">
        <div className="sum-who-card sum-who-card-feature">
          <div>
            <span className="sum-who-icon">01</span>
            <span className="sum-who-label">Work reset</span>
            <h3>Corporate professionals.</h3>
            <p>
              Needing structured pause during the May–June window before Q3 intensity begins.
            </p>
          </div>
        </div>

        <div className="sum-who-card">
          <div>
            <span className="sum-who-icon">02</span>
            <span className="sum-who-label">Nervous system</span>
            <h3>Burnout recovery.</h3>
            <p>
              The gentle climate and longer days create ideal conditions for nervous system recalibration without the intensity of winter cold. See our <Link href="/retreats/journeys/burnout-recovery">Burnout Recovery</Link> program.
            </p>
          </div>
        </div>

        <div className="sum-who-card">
          <div>
            <span className="sum-who-icon">03</span>
            <span className="sum-who-label">First retreat</span>
            <h3>First-time retreat participants.</h3>
            <p>
              Summer removes barriers of cold, logistics complexity, and seasonal uncertainty, making it the most accessible entry point.
            </p>
          </div>
        </div>

        <div className="sum-who-card">
          <div>
            <span className="sum-who-icon">04</span>
            <span className="sum-who-label">Shared pause</span>
            <h3>Couples.</h3>
            <p>
              Seeking shared reflective experience in comfortable, scenic conditions.
            </p>
          </div>
        </div>

        <div className="sum-who-card">
          <div>
            <span className="sum-who-icon">05</span>
            <span className="sum-who-label">Soft community</span>
            <h3>Solo travellers.</h3>
            <p>
              Summer group sizes are moderate, creating community without being overwhelming.
            </p>
          </div>
        </div>
      </div>

      <div className="sum-who-note">
        <p>
          <strong>Best fit:</strong> summer works especially well for people who want retreat structure without harsh weather, snow logistics, or deep winter isolation.
        </p>
      </div>
    </div>
  </section>

  {/* ── PLANNING ── */}
  <style>{`
    .sum-plan {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at 12% 12%, rgba(217,180,111,0.13), transparent 30%),
        radial-gradient(circle at 88% 20%, rgba(15,118,110,0.1), transparent 32%),
        linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .sum-plan-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .sum-plan-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .sum-plan-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.7rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .sum-plan-title span {
      color:#0f766e;
    }
    .sum-plan-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .sum-plan-layout {
      display:grid;
      grid-template-columns:0.34fr 0.66fr;
      gap:1rem;
      align-items:stretch;
    }
    .sum-plan-aside {
      position:relative;
      overflow:hidden;
      border-radius:34px;
      background:#102019;
      border:1px solid rgba(217,180,111,0.18);
      box-shadow:0 24px 80px rgba(17,24,39,0.08);
      padding:1.5rem;
      min-height:520px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .sum-plan-aside::before {
      content:'';
      position:absolute;
      width:260px;
      height:260px;
      border-radius:999px;
      right:-80px;
      top:-80px;
      background:radial-gradient(circle, rgba(217,180,111,0.42), rgba(217,180,111,0.12) 45%, transparent 70%);
    }
    .sum-plan-aside > * {
      position:relative;
      z-index:1;
    }
    .sum-plan-badge {
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
      letter-spacing:0.12em;
      text-transform:uppercase;
    }
    .sum-plan-aside h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2rem,4vw,4.2rem);
      line-height:0.92;
      letter-spacing:-0.08em;
      font-weight:230;
      color:#fff;
      margin:1.5rem 0 1rem;
      text-wrap:balance;
    }
    .sum-plan-aside p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.9rem;
      line-height:1.78;
      font-weight:300;
      color:rgba(255,255,255,0.72);
      margin:0;
    }
    .sum-plan-mini {
      display:grid;
      gap:0.7rem;
      margin-top:1.5rem;
    }
    .sum-plan-mini-row {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:1rem;
      border-radius:18px;
      background:rgba(255,255,255,0.07);
      border:1px solid rgba(255,255,255,0.12);
      padding:0.85rem;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.74rem;
      color:rgba(255,255,255,0.7);
    }
    .sum-plan-mini-row strong {
      color:#d9b46f;
      font-size:0.68rem;
      letter-spacing:0.1em;
      text-transform:uppercase;
    }
    .sum-plan-grid {
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:1rem;
    }
    .sum-plan-card {
      position:relative;
      min-height:250px;
      border-radius:30px;
      background:#fff;
      border:1px solid rgba(17,24,39,0.08);
      box-shadow:0 24px 80px rgba(17,24,39,0.06);
      padding:1.35rem;
      overflow:hidden;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .sum-plan-card::before {
      content:'';
      position:absolute;
      inset:0;
      background:radial-gradient(circle at top right, rgba(15,118,110,0.1), transparent 35%);
      pointer-events:none;
    }
    .sum-plan-card > * {
      position:relative;
      z-index:1;
    }
    .sum-plan-top {
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:1rem;
      margin-bottom:1.25rem;
    }
    .sum-plan-label {
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
    .sum-plan-num {
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
    .sum-plan-card h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.35rem,2.8vw,2.25rem);
      line-height:1;
      letter-spacing:-0.06em;
      font-weight:300;
      color:#111;
      margin:0 0 0.9rem;
      text-wrap:balance;
    }
    .sum-plan-card p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.86rem;
      line-height:1.72;
      font-weight:300;
      color:#4b5563;
      margin:0;
    }
    .sum-plan-note {
      margin-top:1rem;
      border-radius:30px;
      background:#fff;
      border:1px solid rgba(17,24,39,0.08);
      box-shadow:0 24px 80px rgba(17,24,39,0.06);
      padding:1.25rem 1.35rem;
    }
    .sum-plan-note p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.9rem;
      font-weight:300;
      line-height:1.75;
      color:#4b5563;
      margin:0;
    }
    .sum-plan-note strong {
      color:#111;
      font-weight:850;
    }
    @media(max-width:980px){
      .sum-plan-layout { grid-template-columns:1fr; }
      .sum-plan-aside { min-height:auto; }
    }
    @media(max-width:760px){
      .sum-plan { padding:4rem 0; }
      .sum-plan-inner { padding:0 1.25rem; }
      .sum-plan-head { grid-template-columns:1fr; align-items:start; }
      .sum-plan-grid { grid-template-columns:1fr; }
      .sum-plan-card { min-height:auto; padding:1.25rem; border-radius:26px; }
      .sum-plan-aside { border-radius:26px; }
    }
  `}</style>

  <section className="sum-plan scroll-fade">
    <div className="sum-plan-inner">
      <div className="sum-plan-head">
        <div>
          <div className="sum-eyebrow">
            <span className="sum-eyebrow-line" />
            <span className="sum-eyebrow-text">Before You Book</span>
          </div>

          <h2 className="sum-plan-title">
            Plan the retreat by <span>altitude, timing, and comfort.</span>
          </h2>
        </div>

        <p className="sum-plan-copy">
          Summer is the most accessible Himalayan retreat season, but the best experience still depends on choosing the right altitude, booking window, packing style, and first-day pace.
        </p>
      </div>

      <div className="sum-plan-layout">
        <aside className="sum-plan-aside">
          <div>
            <span className="sum-plan-badge">May–June checklist</span>
            <h3>Simple planning. Better retreat.</h3>
            <p>
              Treat summer planning as a comfort system: confirm dates early, match the location to your heat tolerance, pack for daily temperature shifts, and let the first day ease you into altitude.
            </p>
          </div>

          <div className="sum-plan-mini">
            <div className="sum-plan-mini-row">
              <strong>Timing</strong>
              <span>4–6 weeks ahead</span>
            </div>
            <div className="sum-plan-mini-row">
              <strong>Altitude</strong>
              <span>choose by intent</span>
            </div>
            <div className="sum-plan-mini-row">
              <strong>Packing</strong>
              <span>light layers</span>
            </div>
          </div>
        </aside>

        <div className="sum-plan-grid">
          <div className="sum-plan-card">
            <div>
              <div className="sum-plan-top">
                <span className="sum-plan-label">Dates</span>
                <span className="sum-plan-num">01</span>
              </div>
              <h3>Book early.</h3>
              <p>
                Summer is peak retreat season in the Himalayas. Popular locations and formats fill weeks in advance, particularly for May weekends and early June. Confirming your dates four to six weeks ahead is recommended.
              </p>
            </div>
          </div>

          <div className="sum-plan-card">
            <div>
              <div className="sum-plan-top">
                <span className="sum-plan-label">Location fit</span>
                <span className="sum-plan-num">02</span>
              </div>
              <h3>Choose altitude by intent.</h3>
              <p>
                If maximum cooling is the priority, choose Sankri or Munsiyari. If accessibility and weekend-friendly logistics matter more, Chakrata is optimal. If spiritual tradition matters more than climate, Rishikesh works even in summer warmth.
              </p>
            </div>
          </div>

          <div className="sum-plan-card">
            <div>
              <div className="sum-plan-top">
                <span className="sum-plan-label">Clothing</span>
                <span className="sum-plan-num">03</span>
              </div>
              <h3>Pack in layers.</h3>
              <p>
                Mountain weather shifts through the day — mornings can be 12°C and afternoons 25°C in the same location. A light fleece, rain layer, comfortable walking shoes, and sun protection cover most situations.
              </p>
            </div>
          </div>

          <div className="sum-plan-card">
            <div>
              <div className="sum-plan-top">
                <span className="sum-plan-label">First day</span>
                <span className="sum-plan-num">04</span>
              </div>
              <h3>Respect altitude gently.</h3>
              <p>
                Locations above 2,000 metres — Sankri and Munsiyari — may cause mild breathlessness on arrival. Programs account for this with gradual first-day scheduling. Hydration and rest on the travel day are sufficient for most participants.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sum-plan-note">
        <p>
          <strong>Planning rule:</strong> choose Sankri or Munsiyari for maximum cooling, Chakrata for easy access, and Rishikesh for yoga tradition before monsoon.
        </p>
      </div>
    </div>
  </section>

  {/* ── SEASONAL NAV ── */}
  <style>{`
    .sum-season {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at 12% 12%, rgba(217,180,111,0.15), transparent 30%),
        radial-gradient(circle at 88% 20%, rgba(15,118,110,0.11), transparent 32%),
        linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .sum-season-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .sum-season-card {
      position:relative;
      overflow:hidden;
      border-radius:38px;
      background:#102019;
      border:1px solid rgba(217,180,111,0.18);
      box-shadow:0 28px 90px rgba(17,24,39,0.11);
      padding:2rem;
      color:#fff;
    }
    .sum-season-card::before {
      content:'';
      position:absolute;
      width:340px;
      height:340px;
      border-radius:999px;
      right:-110px;
      top:-120px;
      background:radial-gradient(circle, rgba(217,180,111,0.42), rgba(217,180,111,0.12) 45%, transparent 70%);
    }
    .sum-season-card::after {
      content:'';
      position:absolute;
      inset:auto 2rem 2rem 2rem;
      height:1px;
      background:linear-gradient(90deg, transparent, rgba(217,180,111,0.5), transparent);
    }
    .sum-season-card > * {
      position:relative;
      z-index:1;
    }
    .sum-season-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2rem;
    }
    .sum-season-label {
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
      letter-spacing:0.12em;
      text-transform:uppercase;
      margin-bottom:1rem;
    }
    .sum-season-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.9rem);
      font-weight:230;
      letter-spacing:-0.08em;
      line-height:0.94;
      color:#fff;
      margin:0;
      text-wrap:balance;
    }
    .sum-season-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:rgba(255,255,255,0.72);
      margin:0;
      max-width:44rem;
    }
    .sum-season-grid {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:1rem;
    }
    .sum-season-option {
      border-radius:28px;
      background:rgba(255,255,255,0.07);
      border:1px solid rgba(255,255,255,0.12);
      padding:1.25rem;
      min-height:245px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .sum-season-option-light {
      background:#fff;
      border-color:rgba(255,255,255,0.16);
    }
    .sum-season-kicker {
      display:inline-flex;
      width:max-content;
      max-width:100%;
      border-radius:999px;
      padding:0.38rem 0.7rem;
      background:rgba(217,180,111,0.12);
      border:1px solid rgba(217,180,111,0.24);
      color:#d9b46f;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.66rem;
      font-weight:900;
      letter-spacing:0.11em;
      text-transform:uppercase;
      margin-bottom:1rem;
    }
    .sum-season-option-light .sum-season-kicker {
      background:rgba(15,118,110,0.08);
      border-color:rgba(15,118,110,0.16);
      color:#0f766e;
    }
    .sum-season-option h3 {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.35rem,2.8vw,2.25rem);
      line-height:1;
      letter-spacing:-0.06em;
      font-weight:300;
      color:#fff;
      margin:0 0 0.9rem;
      text-wrap:balance;
    }
    .sum-season-option-light h3 {
      color:#111;
    }
    .sum-season-option p {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.86rem;
      line-height:1.72;
      font-weight:300;
      color:rgba(255,255,255,0.68);
      margin:0;
    }
    .sum-season-option-light p {
      color:#4b5563;
    }
    .sum-season-action {
      display:inline-flex;
      align-items:center;
      justify-content:center;
      min-height:44px;
      padding:0.78rem 1.05rem;
      border-radius:999px;
      background:#d9b46f;
      color:#111 !important;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.82rem;
      font-weight:900;
      text-decoration:none !important;
      margin-top:1.25rem;
      transition:transform 0.2s ease;
    }
    .sum-season-option-light .sum-season-action {
      background:#102019;
      color:#fff !important;
    }
    .sum-season-action:hover {
      transform:translateY(-2px);
      text-decoration:none !important;
    }
    @media(max-width:900px){
      .sum-season-head { grid-template-columns:1fr; align-items:start; }
      .sum-season-grid { grid-template-columns:1fr; }
      .sum-season-option { min-height:auto; }
    }
    @media(max-width:640px){
      .sum-season { padding:4rem 0; }
      .sum-season-inner { padding:0 1.25rem; }
      .sum-season-card { padding:1.25rem; border-radius:30px; }
      .sum-season-action { width:100%; }
    }
  `}</style>

  <section className="sum-season scroll-fade">
    <div className="sum-season-inner">
      <div className="sum-season-card">
        <div className="sum-season-head">
          <div>
            <span className="sum-season-label">Other Seasons</span>
            <h2 className="sum-season-title">Choose the season that matches your retreat need.</h2>
          </div>

          <p className="sum-season-copy">
            Summer is for light, green landscapes, open-air practice, and comfortable movement. Winter changes the retreat completely — quieter, colder, smaller, and more introspective.
          </p>
        </div>

        <div className="sum-season-grid">
          <div className="sum-season-option sum-season-option-light">
            <div>
              <span className="sum-season-kicker">Current page</span>
              <h3>Summer Himalayan Retreats.</h3>
              <p>
                May–June heat escape, long daylight, green forests, outdoor yoga, and accessible first-retreat conditions.
              </p>
            </div>
          </div>

          <div className="sum-season-option">
            <div>
              <span className="sum-season-kicker">Compare season</span>
              <h3>Winter Himalayan Retreats.</h3>
              <p>
                December–February retreats offer snow silence, introspective depth, and small-group intimacy.
              </p>
            </div>

            <Link href="/retreats/winter-himalayan-retreats" className="sum-season-action">
              Explore winter retreats
            </Link>
          </div>

          <div className="sum-season-option">
            <div>
              <span className="sum-season-kicker">Complete guide</span>
              <h3>Himalayan Retreats in India.</h3>
              <p>
                For a complete overview of all seasons, locations, formats, and retreat styles, start with the main Himalayan retreats guide.
              </p>
            </div>

            <Link href="/retreats/himalayan-retreats" className="sum-season-action">
              View full guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ── FAQ ── */}
  <style>{`
    .sum-faq {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:
        radial-gradient(circle at 12% 12%, rgba(217,180,111,0.13), transparent 30%),
        radial-gradient(circle at 88% 20%, rgba(15,118,110,0.1), transparent 32%),
        linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
      padding:5.25rem 0;
      overflow:hidden;
      border-bottom:1px solid rgba(15,118,110,0.1);
    }
    .sum-faq-inner {
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .sum-faq-head {
      display:grid;
      grid-template-columns:0.9fr 1.1fr;
      gap:2rem;
      align-items:end;
      margin-bottom:2.25rem;
    }
    .sum-faq-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(2.1rem,5vw,4.7rem);
      font-weight:230;
      letter-spacing:-0.07em;
      line-height:0.96;
      color:#111;
      margin:0;
      text-wrap:balance;
    }
    .sum-faq-title span {
      color:#0f766e;
    }
    .sum-faq-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.96rem;
      font-weight:300;
      line-height:1.85;
      color:#4b5563;
      margin:0;
      max-width:44rem;
    }
    .sum-faq-shell {
      border-radius:34px;
      background:#fff;
      border:1px solid rgba(17,24,39,0.08);
      box-shadow:0 24px 80px rgba(17,24,39,0.07);
      padding:1.35rem;
      overflow:hidden;
    }
    .sum-final-nav {
      width:100vw;
      margin-left:calc(-50vw + 50%);
      background:#102019;
      padding:4rem 0;
      overflow:hidden;
      position:relative;
    }
    .sum-final-nav::before {
      content:'';
      position:absolute;
      width:360px;
      height:360px;
      border-radius:999px;
      right:-120px;
      top:-140px;
      background:radial-gradient(circle, rgba(217,180,111,0.32), rgba(217,180,111,0.1) 45%, transparent 70%);
    }
    .sum-final-nav-inner {
      position:relative;
      z-index:1;
      max-width:76rem;
      margin:0 auto;
      padding:0 2rem;
    }
    .sum-final-nav-card {
      display:grid;
      grid-template-columns:1fr auto;
      gap:2rem;
      align-items:center;
      border-radius:34px;
      background:rgba(255,255,255,0.07);
      border:1px solid rgba(255,255,255,0.12);
      padding:1.5rem;
    }
    .sum-final-nav-label {
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
      letter-spacing:0.12em;
      text-transform:uppercase;
      margin-bottom:1rem;
    }
    .sum-final-nav-title {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:clamp(1.8rem,4vw,3.7rem);
      line-height:0.96;
      letter-spacing:-0.07em;
      font-weight:230;
      color:#fff;
      margin:0 0 0.85rem;
      text-wrap:balance;
    }
    .sum-final-nav-copy {
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.92rem;
      line-height:1.75;
      font-weight:300;
      color:rgba(255,255,255,0.68);
      margin:0;
      max-width:44rem;
    }
    .sum-final-nav-actions {
      display:flex;
      flex-wrap:wrap;
      gap:0.75rem;
      justify-content:flex-end;
    }
    .sum-final-link {
      display:inline-flex;
      align-items:center;
      justify-content:center;
      min-height:46px;
      padding:0.82rem 1.1rem;
      border-radius:999px;
      background:#d9b46f;
      color:#111 !important;
      font-family:var(--font-geist-sans),sans-serif;
      font-size:0.84rem;
      font-weight:900;
      text-decoration:none !important;
      transition:transform 0.2s ease;
      white-space:nowrap;
    }
    .sum-final-link-secondary {
      background:rgba(255,255,255,0.08);
      color:#fff !important;
      border:1px solid rgba(255,255,255,0.14);
    }
    .sum-final-link:hover {
      transform:translateY(-2px);
      text-decoration:none !important;
    }
    @media(max-width:820px){
      .sum-faq-head { grid-template-columns:1fr; align-items:start; }
      .sum-final-nav-card { grid-template-columns:1fr; }
      .sum-final-nav-actions { justify-content:flex-start; }
    }
    @media(max-width:640px){
      .sum-faq { padding:4rem 0; }
      .sum-faq-inner,
      .sum-final-nav-inner { padding:0 1.25rem; }
      .sum-faq-shell { border-radius:26px; padding:1rem; }
      .sum-final-nav { padding:3.5rem 0; }
      .sum-final-nav-card { border-radius:28px; padding:1.25rem; }
      .sum-final-link { width:100%; }
    }
  `}</style>

  <section className="sum-faq scroll-fade">
    <div className="sum-faq-inner">
      <div className="sum-faq-head">
        <div>
          <div className="sum-eyebrow">
            <span className="sum-eyebrow-line" />
            <span className="sum-eyebrow-text">FAQ</span>
          </div>

          <h2 className="sum-faq-title">
            Common questions before <span>a summer retreat.</span>
          </h2>
        </div>

        <p className="sum-faq-copy">
          Use these answers to compare summer temperatures, monsoon timing, packing needs, first-retreat suitability, and trekking combinations before choosing your May–June Himalayan retreat.
        </p>
      </div>

      <div className="sum-faq-shell">
        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
      </div>
    </div>
  </section>

  {/* ── NAV ── */}
  <section className="sum-final-nav">
    <div className="sum-final-nav-inner">
      <div className="sum-final-nav-card">
        <div>
          <span className="sum-final-nav-label">Explore More</span>
          <h2 className="sum-final-nav-title">Continue planning your Himalayan retreat.</h2>
          <p className="sum-final-nav-copy">
            Compare all Himalayan retreat formats, or return to the full retreat collection to explore other journeys and locations.
          </p>
        </div>

        <div className="sum-final-nav-actions">
          <Link href="/retreats/himalayan-retreats" className="sum-final-link">
            Himalayan Retreats
          </Link>
          <Link href="/retreats" className="sum-final-link sum-final-link-secondary">
            All Retreats
          </Link>
        </div>
      </div>
    </div>
  </section>

</TrackedPage>
  );
}
