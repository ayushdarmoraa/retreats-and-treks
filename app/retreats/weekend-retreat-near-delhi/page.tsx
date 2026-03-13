import { Metadata } from 'next';
import Link from 'next/link';
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

const PATH = '/retreats/weekend-retreat-near-delhi';

export function generateMetadata(): Metadata {
  return {
    title: 'Weekend Retreat Near Delhi: A Mountain Reset in the Himalayas',
    description:
      'Escape the stress of city life with a peaceful weekend retreat near Delhi. Explore forests, waterfalls, mountain villages, and authentic Himalayan culture in Chakrata.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Weekend Retreat Near Delhi: A Mountain Reset in the Himalayas',
      description:
        'Escape the stress of city life with a peaceful weekend retreat near Delhi. Explore forests, waterfalls, mountain villages, and authentic Himalayan culture in Chakrata.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Weekend Retreat Near Delhi: A Mountain Reset in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How far is Chakrata from Delhi?',
    answer:
      'Chakrata is located in Uttarakhand and can be reached by road from Delhi in approximately 6–7 hours. It is also about a 3-hour drive from Dehradun.',
  },
  {
    question: 'Is a weekend retreat enough to feel a difference?',
    answer:
      'A weekend retreat cannot solve every challenge of modern life. However, even a short period away from constant work pressure can help people reconnect with themselves, nature, and a slower rhythm of living. Many participants return home feeling mentally lighter, more focused, and more present.',
  },
  {
    question: 'What is included in the retreat?',
    answer:
      'The retreat includes comfortable accommodation in a peaceful mountain setting, freshly prepared local meals, guided exploration of natural places, small group experiences, and time for rest and reflection.',
  },
  {
    question: 'Do I need previous trekking or yoga experience?',
    answer:
      'No. The retreat involves light exploration such as forest walks, waterfall visits, and village walks. No previous experience is required.',
  },
  {
    question: 'Is the retreat suitable for solo travelers?',
    answer:
      'Yes. Many participants join alone and enjoy meeting like-minded people during the retreat.',
  },
  {
    question: 'What places will I explore during the retreat?',
    answer:
      'Depending on the retreat, participants may explore Tiger Falls, Moila Top, Budher Caves, Chilmiri Sunset Viewpoint, and traditional Jaunsaari villages in the Chakrata region.',
  },
];

export default function WeekendRetreatNearDelhiPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Weekend Retreat Near Delhi', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <AutoArticleSchema
        title="Weekend Retreat Near Delhi"
        description="Escape the stress of city life with a peaceful weekend retreat near Delhi. Explore forests, waterfalls, mountain villages, and authentic Himalayan culture in Chakrata."
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
          { name: 'Weekend Retreat Near Delhi' },
        ]}
      />

      <article>

        <style>{`
  .wnrd-section { width:100vw; margin-left:calc(-50vw + 50%); padding-top:4rem; padding-bottom:4rem; border-bottom:1px solid #e5e7eb; }
  .wnrd-inner { max-width:52rem; margin:0 auto; padding:0 2rem; }
  .wnrd-eyebrow { display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem; }
  .wnrd-eyebrow-line { width:24px; height:1px; background:var(--color-primary); opacity:0.5; display:inline-block; }
  .wnrd-eyebrow-text { font-family:var(--font-geist-sans),sans-serif; font-size:0.56rem; letter-spacing:0.28em; text-transform:uppercase; color:var(--color-primary); font-weight:500; opacity:0.7; }
  .wnrd-h1 { font-family:var(--font-geist-sans),sans-serif; font-size:clamp(1.75rem,3.5vw,2.4rem); font-weight:200; letter-spacing:-0.035em; color:#111; line-height:1.1; margin:0 0 1.5rem; }
  .wnrd-h2 { font-family:var(--font-geist-sans),sans-serif; font-size:clamp(1.4rem,2.5vw,1.85rem); font-weight:200; letter-spacing:-0.03em; color:#111; line-height:1.15; margin:0 0 1.5rem; }
  .wnrd-h2 span { color:var(--color-primary); }
  .wnrd-p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0 0 1.25rem; }
  .wnrd-p:last-child { margin-bottom:0; }
  .wnrd-list { list-style:none; padding:0; margin:0 0 1.5rem; display:flex; flex-direction:column; gap:0.6rem; }
  .wnrd-list li { display:flex; align-items:flex-start; gap:0.75rem; font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; line-height:1.7; font-weight:300; color:#555; }
  .wnrd-check { width:18px; height:18px; border-radius:50%; background:var(--color-primary); display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:0.15rem; font-size:0.6rem; color:#fff; font-weight:700; }
  .wnrd-place-card { background:#fff; border:1px solid #eef0ee; border-radius:8px; padding:1rem 1.25rem; }
  .wnrd-place-name { font-family:var(--font-geist-sans),sans-serif; font-size:0.85rem; font-weight:600; color:#111; margin:0; }
  .wnrd-retreat-card { background:#fff; border:1px solid #eef0ee; border-radius:8px; padding:1.5rem; border-top:2px solid var(--color-primary); }
  .wnrd-retreat-title { font-family:var(--font-geist-sans),sans-serif; font-size:0.95rem; font-weight:500; color:#111; margin:0 0 0.75rem; }
  .wnrd-retreat-title a { color:inherit; text-decoration:none; }
  .wnrd-retreat-title a:hover { color:var(--color-primary); }
  .wnrd-travel-card { background:#f7f9f7; border:1px solid #eef0ee; border-radius:8px; padding:1.25rem 1.5rem; }
  .wnrd-travel-label { font-family:var(--font-geist-sans),sans-serif; font-size:0.85rem; font-weight:600; color:#111; margin:0 0 0.4rem; }
  .wnrd-nav-group { border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
  .wnrd-nav-link { display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1rem; border-bottom:1px solid #f0f0f0; font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; color:#333; text-decoration:none; }
  .wnrd-nav-link:last-child { border-bottom:none; }
  .wnrd-nav-link:hover { background:#f7f9f7; color:var(--color-primary); }
  .wnrd-nav-link::after { content:'→'; color:var(--color-primary); opacity:0.5; }
  @media(max-width:640px){
    .wnrd-section { padding-top:3rem; padding-bottom:3rem; }
    .wnrd-inner { padding:0 1.25rem; }
  }
`}</style>

        {/* ── HERO ── */}
        <section className="wnrd-section" style={{ background: '#f7f9f7' }}>
          <div className="wnrd-inner">
            <div className="wnrd-eyebrow">
              <span className="wnrd-eyebrow-line" />
              <span className="wnrd-eyebrow-text">Weekend Retreats · Near Delhi</span>
            </div>
            <h1 className="wnrd-h1">
              Weekend Retreat Near Delhi: A Mountain Reset in the Himalayas
            </h1>
          </div>
        </section>

        {/* ── SECTION 1: WHY PEOPLE LOOK ── */}
        <section className="wnrd-section" style={{ background: '#ffffff' }}>
          <div className="wnrd-inner">
            <div className="wnrd-eyebrow">
              <span className="wnrd-eyebrow-line" />
              <span className="wnrd-eyebrow-text">The Need</span>
            </div>
            <h2 className="wnrd-h2">
              Why people look for <span>weekend retreats</span> near Delhi
            </h2>
            <p className="wnrd-p">Life in large cities like Delhi moves at an exhausting pace.</p>
            <p className="wnrd-p">Long working hours, constant notifications, traffic, and crowded urban spaces often leave people feeling mentally drained. Many professionals, entrepreneurs, and remote workers eventually realize they need a short break from the intensity of city life.</p>
            <p className="wnrd-p">This is why weekend retreats near Delhi have become increasingly popular.</p>
            <p className="wnrd-p">Instead of long vacations that require extensive planning, a weekend retreat offers a simple way to step away from work and spend a few days reconnecting with nature, quiet environments, and slower rhythms of living.</p>
            <p className="wnrd-p">For many people, even a short mountain retreat can create the mental space needed to recharge and regain clarity.</p>
          </div>
        </section>

        {/* ── SECTION 2: WHY MOUNTAINS ── */}
        <section className="wnrd-section" style={{ background: '#f7f9f7' }}>
          <div className="wnrd-inner">
            <div className="wnrd-eyebrow">
              <span className="wnrd-eyebrow-line" />
              <span className="wnrd-eyebrow-text">The Setting</span>
            </div>
            <h2 className="wnrd-h2">
              Why the mountains are <span>ideal</span> for short retreats
            </h2>
            <p className="wnrd-p">The Himalayan foothills surrounding Delhi offer a completely different environment from urban life.</p>
            <p className="wnrd-p">Dense forests, quiet villages, waterfalls, and wide mountain views create a natural setting where the mind can relax.</p>
            <p className="wnrd-p">Places like Chakrata are especially suited for retreats because they remain relatively peaceful compared to crowded hill stations.</p>
            <p className="wnrd-p">Visitors can spend their time walking through forests, exploring waterfalls, visiting traditional villages, and enjoying fresh mountain air.</p>
            <p className="wnrd-p">These simple experiences often provide exactly what people are searching for when they look for a retreat: space to slow down.</p>
          </div>
        </section>

        {/* ── SECTION 3: WHAT TO EXPECT ── */}
        <section className="wnrd-section" style={{ background: '#ffffff' }}>
          <div className="wnrd-inner">
            <div className="wnrd-eyebrow">
              <span className="wnrd-eyebrow-line" />
              <span className="wnrd-eyebrow-text">What to Expect</span>
            </div>
            <h2 className="wnrd-h2">
              What to expect from a <span>weekend retreat</span>
            </h2>
            <p className="wnrd-p">A well-designed weekend retreat usually includes:</p>
            <ul className="wnrd-list">
              <li><span className="wnrd-check">✓</span>Comfortable accommodation in a peaceful mountain setting</li>
              <li><span className="wnrd-check">✓</span>Freshly prepared local meals</li>
              <li><span className="wnrd-check">✓</span>Guided exploration of natural places</li>
              <li><span className="wnrd-check">✓</span>Small group experiences</li>
              <li><span className="wnrd-check">✓</span>Time for rest and reflection</li>
            </ul>
            <p className="wnrd-p">Rather than filling every moment with activities, the goal is to create a balance between exploration and relaxation.</p>
            <p className="wnrd-p">Participants often spend time visiting scenic locations, walking through forests, watching sunsets over mountain valleys, and sharing conversations around a bonfire in the evening.</p>
          </div>
        </section>

        {/* ── SECTION 4: CHAKRATA ── */}
        <section className="wnrd-section" style={{ background: '#f7f9f7' }}>
          <div className="wnrd-inner">
            <div className="wnrd-eyebrow">
              <span className="wnrd-eyebrow-line" />
              <span className="wnrd-eyebrow-text">The Destination</span>
            </div>
            <h2 className="wnrd-h2">
              A retreat experience in <span>Chakrata</span>
            </h2>
            <p className="wnrd-p">Chakrata is one of the most peaceful mountain regions within reach of Delhi.</p>
            <p className="wnrd-p">Surrounded by forests and waterfalls, the region offers a natural environment ideal for retreats and nature immersion.</p>
            <p className="wnrd-p">During a retreat in Chakrata, participants may explore places such as:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {['Tiger Falls', 'Moila Top', 'Budher Caves', 'Chilmiri Sunset Viewpoint', 'Traditional Jaunsaari Villages'].map((place) => (
                <div key={place} className="wnrd-place-card">
                  <p className="wnrd-place-name">{place}</p>
                </div>
              ))}
            </div>
            <p className="wnrd-p">The combination of natural landscapes and local culture creates an experience that feels very different from the fast-paced environment of city life.</p>
          </div>
        </section>

        {/* ── SECTION 5: WHY CHAKRATA ── */}
        <section className="wnrd-section" style={{ background: '#ffffff' }}>
          <div className="wnrd-inner">
            <div className="wnrd-eyebrow">
              <span className="wnrd-eyebrow-line" />
              <span className="wnrd-eyebrow-text">The Difference</span>
            </div>
            <h2 className="wnrd-h2">
              Why Chakrata is <span>better</span> than crowded hill stations
            </h2>
            <p className="wnrd-p">Most popular hill stations near Delhi — Mussoorie, Manali, Shimla — have become heavily commercialized. Weekend traffic jams, noisy markets, and crowded viewpoints often defeat the purpose of going to the mountains for rest.</p>
            <p className="wnrd-p">Chakrata offers a very different experience:</p>
            <ul className="wnrd-list">
              <li><span className="wnrd-check">✓</span>Quieter than Mussoorie — no Mall Road crowds, no tourist congestion</li>
              <li><span className="wnrd-check">✓</span>Less commercial than Manali — no overpriced tourist traps, no party culture</li>
              <li><span className="wnrd-check">✓</span>A more peaceful environment designed for retreats — forests, waterfalls, and open mountain views</li>
              <li><span className="wnrd-check">✓</span>Better for nature immersion — authentic Jaunsaari villages, quiet forest trails, and undisturbed landscapes</li>
            </ul>
            <p className="wnrd-p">For people looking for a genuine retreat experience rather than a tourist holiday, Chakrata provides the kind of environment where real rest and reflection become possible.</p>
          </div>
        </section>

        {/* ── SECTION 6: RETREATS YOU CAN JOIN ── */}
        <section className="wnrd-section" style={{ background: '#f7f9f7' }}>
          <div className="wnrd-inner">
            <div className="wnrd-eyebrow">
              <span className="wnrd-eyebrow-line" />
              <span className="wnrd-eyebrow-text">Our Retreats</span>
            </div>
            <h2 className="wnrd-h2">
              Retreats you can <span>join</span>
            </h2>
            <p className="wnrd-p">You can join several types of retreats designed to help people disconnect from stress and reconnect with nature.</p>

            <div className="wnrd-retreat-card" style={{ marginBottom: '1.5rem' }}>
              <h3 className="wnrd-retreat-title">
                <Link href="/retreats/journeys/burnout-recovery">Burnout Recovery Retreat</Link>
              </h3>
              <p className="wnrd-p">A weekend retreat designed for people feeling mentally exhausted from work or city life.</p>
              <p className="wnrd-p">Participants spend three days exploring forests, waterfalls, and mountain villages while enjoying peaceful evenings and authentic local food.</p>
              <Link href="/retreats/journeys/burnout-recovery" style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-primary)', textDecoration: 'none' }}>
                Learn more about this retreat →
              </Link>
            </div>

            <PrimaryCTA label="Talk to Us About Retreats" subtext="Not sure which retreat is right for you? We can help you choose." vertical="retreat" category="weekend" sourcePath={PATH} />
          </div>
        </section>

        {/* ── SECTION 6: HOW FAR ── */}
        <section className="wnrd-section" style={{ background: '#f7f9f7' }}>
          <div className="wnrd-inner">
            <div className="wnrd-eyebrow">
              <span className="wnrd-eyebrow-line" />
              <span className="wnrd-eyebrow-text">Getting There</span>
            </div>
            <h2 className="wnrd-h2">
              How far is <span>Chakrata</span> from Delhi
            </h2>
            <p className="wnrd-p">Chakrata is located in Uttarakhand and can be reached by road from Delhi in approximately 6–7 hours.</p>
            <p className="wnrd-p">The route passes through scenic landscapes as it gradually climbs into the Himalayan foothills.</p>
            <p className="wnrd-p">The town is also about a 3-hour drive from Dehradun, making it accessible for travelers arriving by train or flight.</p>
            <p className="wnrd-p">Because Chakrata remains less commercialized than many other hill stations, it provides a quieter environment ideal for retreats.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="wnrd-travel-card">
                <p className="wnrd-travel-label">From Delhi</p>
                <p className="wnrd-p">Approximately 6–7 hours by road.</p>
              </div>
              <div className="wnrd-travel-card">
                <p className="wnrd-travel-label">From Dehradun</p>
                <p className="wnrd-p">About a 3-hour drive.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 7: WHO THIS IS FOR ── */}
        <section className="wnrd-section" style={{ background: '#ffffff' }}>
          <div className="wnrd-inner">
            <div className="wnrd-eyebrow">
              <span className="wnrd-eyebrow-line" />
              <span className="wnrd-eyebrow-text">Is It Right for You</span>
            </div>
            <h2 className="wnrd-h2">
              Who this retreat is <span>perfect for</span>
            </h2>
            <p className="wnrd-p">People who benefit most from a weekend retreat near Delhi often include:</p>
            <ul className="wnrd-list">
              <li><span className="wnrd-check">✓</span>Professionals feeling overwhelmed by work stress</li>
              <li><span className="wnrd-check">✓</span>Entrepreneurs who rarely disconnect from their business</li>
              <li><span className="wnrd-check">✓</span>Remote workers spending long hours on screens</li>
              <li><span className="wnrd-check">✓</span>People who need a short nature escape without long travel</li>
            </ul>
            <p className="wnrd-p">Many participants join retreats simply because they feel mentally exhausted and want a few days away from the noise of city life.</p>
            <p className="wnrd-p">A peaceful mountain environment, simple daily routines, and time in nature often provide exactly the reset they are looking for.</p>
          </div>
        </section>

        {/* ── SECTION 8: IS IT ENOUGH ── */}
        <section className="wnrd-section" style={{ background: '#f7f9f7' }}>
          <div className="wnrd-inner">
            <div className="wnrd-eyebrow">
              <span className="wnrd-eyebrow-line" />
              <span className="wnrd-eyebrow-text">The Reset</span>
            </div>
            <h2 className="wnrd-h2">
              Is a weekend retreat <span>enough</span> to reset?
            </h2>
            <p className="wnrd-p">A weekend retreat cannot solve every challenge of modern life.</p>
            <p className="wnrd-p">However, even a short period away from constant work pressure can help people reconnect with themselves, nature, and a slower rhythm of living.</p>
            <p className="wnrd-p">Many retreat participants return home feeling:</p>
            <ul className="wnrd-list">
              <li><span className="wnrd-check">✓</span>Mentally lighter</li>
              <li><span className="wnrd-check">✓</span>More focused</li>
              <li><span className="wnrd-check">✓</span>More present</li>
            </ul>
            <p className="wnrd-p">Sometimes a few quiet days in the mountains can provide exactly the reset people need.</p>
            <div style={{ marginTop: '1.5rem' }}>
              <PrimaryCTA label="Plan My Weekend Retreat" subtext="Ready to step away? Let us help you plan it." vertical="retreat" category="weekend" sourcePath={PATH} />
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="wnrd-section" style={{ background: '#f7f9f7' }}>
          <div className="wnrd-inner">
            <div className="wnrd-eyebrow">
              <span className="wnrd-eyebrow-line" />
              <span className="wnrd-eyebrow-text">Common Questions</span>
            </div>
            <h2 className="wnrd-h2">
              Frequently asked <span>questions</span>
            </h2>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

        {/* ── RELATED LINKS ── */}
        <section className="wnrd-section" style={{ background: '#ffffff' }}>
          <div className="wnrd-inner">
            <div className="wnrd-eyebrow">
              <span className="wnrd-eyebrow-line" />
              <span className="wnrd-eyebrow-text">Explore More</span>
            </div>
            <h2 className="wnrd-h2">
              Related <span>pages</span>
            </h2>
            <div className="wnrd-nav-group">
              <Link href="/retreats/journeys/burnout-recovery" className="wnrd-nav-link">Burnout Recovery Retreat</Link>
              <Link href="/retreats/journeys/rest-and-reset" className="wnrd-nav-link">Rest &amp; Reset Retreat</Link>
              <Link href="/retreats/chakrata" className="wnrd-nav-link">Retreats in Chakrata</Link>
              <Link href="/retreats/weekend-himalayan-retreats" className="wnrd-nav-link">Weekend Himalayan Retreats</Link>
              <Link href="/retreats" className="wnrd-nav-link">All Retreats</Link>
            </div>
          </div>
        </section>

      </article>
    </TrackedPage>
  );
}
