import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema, generateBlogPostingSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/first-meditation-retreat-tips';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'First Meditation Retreat Tips | Retreats And Treks',
    description:
      'First meditation retreat tips on what to pack, day one, discomfort, choosing duration, preparation, and what experienced retreatants wish they knew.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'First Meditation Retreat Tips',
      description: 'Practical advice from people who\'ve been where you are — nervous, curious, and ready.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('First Meditation Retreat Tips'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How do I know I am ready for my first retreat?',
    answer:
      'You are ready when you are curious enough to try and honest enough to be uncomfortable. There is no prerequisite level of meditation experience, fitness, or spiritual development. If you are reading this page, you are ready. The only thing you need to bring is willingness.',
  },
  {
    question: 'Should my first retreat be silent?',
    answer:
      'It can be. A 3-day silent retreat in a gentle environment like Chakrata is manageable for complete beginners. The silence is supported by the forest environment and the structure of the day. If the idea of sustained silence feels overwhelming, start with a meditation retreat that includes some talking periods.',
  },
  {
    question: 'What if I feel like leaving on day one?',
    answer:
      'Almost everyone feels this on day one. It is the mind\'s protest at losing its habitual stimulation. Stay. The discomfort of day one is temporary. What lies beyond it is why people call retreats life-changing. If you leave on day one, you leave with the only the difficult part of the experience.',
  },
  {
    question: 'Is it better to go alone or with a friend?',
    answer:
      'Going alone is usually better, especially for silent retreats. A friend becomes a social anchor — someone to make eye contact with, to compare experiences with, to perform for. Going alone forces you into the full experience with no social buffer. If you do go with someone, commit to not seeking each other out during the retreat.',
  },
];

export default function FirstMeditationRetreatTipsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'First Retreat Tips', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: "First Meditation Retreat Tips — What I Wish I'd Known",
    description:
      'First meditation retreat tips on packing, day one, discomfort, choosing duration, preparation, and what experienced retreatants wish they knew.',
    publishedAt: '2026-03-06',
    lastUpdated: '2026-05-09',
    url: canonicalUrl,
  });

  // Split heading for green last word
  const h1Words = "First Meditation Retreat: Tips from People Who Have Been There".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="First Meditation Retreat Tips — What I Wish I'd Known"
        description="First meditation retreat tips on packing, day one, discomfort, choosing duration, preparation, and what experienced retreatants wish they knew."
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
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } }
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

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-tips-hero { padding: 4rem 0; text-align: center; border-bottom: 1px solid rgba(15,118,110,0.08); }
        .med-tips-hero .med-h1 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; letter-spacing: -0.03em; color: #2B2A26; margin: 0 0 0.5rem; }
        .med-tips-hero .med-h1 span { color: #0f766e; }
        .med-tips-hero .med-body { max-width: 520px; margin: 0 auto; }

        .med-tips-section { padding: 4rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-tip-card { padding: 1.5rem; }
        .med-tip-card .med-tip-number { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: rgba(15,118,110,0.08); color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem; }
        .med-tip-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-tip-card .med-body { font-size: 0.92rem; margin-bottom: 0; }
        .med-tip-card .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-tip-card .med-body a:hover { text-decoration: underline; }

        .med-tips-grid { display: grid; gap: 1.4rem; margin-top: 1.8rem; }

        .med-tips-recommend { margin-top: 1.5rem; }
        .med-tips-recommend .med-list { margin-top: 0.5rem; }
        .med-tips-recommend .med-list li a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-tips-recommend .med-list li a:hover { text-decoration: underline; }

        .med-tips-footer-nav { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; padding-top: 1.5rem; margin-top: 2rem; border-top: 1px solid rgba(15,118,110,0.08); }
        .med-tips-footer-nav a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .med-tips-footer-nav a:hover { text-decoration: underline; }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Meditation Retreats', href: '/meditation-retreats' }, { name: 'First Retreat Tips' }]} />
        </div>
      </div>

      <article>

        {/* ── HERO ── */}
        <section className="med-shell med-section-white med-tips-hero">
          <div className="med-inner">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">First Retreat Guide</span>
              <span className="med-eyebrow-line" />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Your first meditation retreat is unlike anything you have done before. Not harder, necessarily — but different in a way that is difficult to prepare for intellectually. These tips come from retreatants who were exactly where you are now: curious, nervous, and unsure what they were getting themselves into. They all came back.
            </p>
          </div>
        </section>

        {/* ── TIPS ── */}
        <section className="med-shell med-section-alt med-tips-section">
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Practical Advice</span>
            </div>
            <h2 className="med-h2">Tips from People Who've <span>Been There</span></h2>

            <div className="med-tips-grid">
              {[
                {
                  number: '01',
                  title: 'Start With the Right Duration',
                  content: 'Three days is the sweet spot for a first retreat. Long enough for genuine depth. Short enough that the commitment feels manageable. A <a href="/3-day-meditation-retreat" style="color:#0f766e;font-weight:500;text-decoration:none;">3-day meditation retreat</a> or <a href="/weekend-retreat-himalayas" style="color:#0f766e;font-weight:500;text-decoration:none;">weekend retreat</a> gives you the full arc — adjustment, settling, depth — without requiring a week off work. If that goes well, <a href="/7-day-meditation-retreat" style="color:#0f766e;font-weight:500;text-decoration:none;">7 days</a> awaits.',
                },
                {
                  number: '02',
                  title: 'Choose Environment Over Prestige',
                  content: 'The famous retreat with the celebrity teacher and 50 participants will give you a different experience than a small-group retreat in a Himalayan forest with an experienced guide and 10 people. For your first retreat, choose the second. The environment matters more than the brand. Read <a href="/how-to-choose-a-meditation-retreat" style="color:#0f766e;font-weight:500;text-decoration:none;">how to choose the right retreat</a>.',
                },
                {
                  number: '03',
                  title: 'Stop Preparing Three Days Before',
                  content: 'In the final three days before the retreat, stop adding. Stop reading about meditation, stop planning, stop setting expectations. Simplify your diet. Reduce screen time. Begin the transition into quieter living. The <a href="/how-to-prepare-for-a-retreat" style="color:#0f766e;font-weight:500;text-decoration:none;">preparation guide</a> covers this in detail.',
                },
                {
                  number: '04',
                  title: 'Day One Will Be Weird. Stay.',
                  content: 'You will feel restless, anxious, bored, or all three. Your mind will generate urgent reasons why you should leave. This happens to nearly everyone. It is the mind losing its inputs and panicking. By evening of day one, it begins to settle. By day two, you will be glad you stayed. The people who leave on day one never get to the good part.',
                },
                {
                  number: '05',
                  title: 'Do Not Compare Your Experience',
                  content: 'You are not trying to achieve anything. There is no correct way to feel on retreat. If someone describes blissful visions and you felt mostly restless and achy, your retreat was not a failure. Every experience is data. The value of the retreat is in what you learn about your own mind — not in matching someone else\'s description.',
                },
                {
                  number: '06',
                  title: 'The Thing Nobody Tells You',
                  content: 'The most common thing first-time retreatants say afterward is not "it was peaceful" or "I feel enlightened." It is: "I had no idea how loud my mind was." This discovery — not the peace that follows it, but the initial shock of hearing your own mental noise — is the most valuable takeaway. Once you hear it, you cannot unhear it. And that awareness is the beginning of everything meditation promises.',
                },
              ].map((tip) => (
                <div key={tip.number} className="med-card med-tip-card">
                  <div className="med-tip-number">{tip.number}</div>
                  <h3 className="med-h3">{tip.title}</h3>
                  <p className="med-body" dangerouslySetInnerHTML={{ __html: tip.content }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My First Retreat"
          subtext="Tell us you're a first-timer and we'll design an experience that meets you where you are."
          vertical="retreat"
          category="first-retreat-tips"
          sourcePath={PATH}
        />

        {/* ── RECOMMENDED RETREATS ── */}
        <section className="med-shell med-section-white med-tips-section">
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Recommended</span>
            </div>
            <h2 className="med-h2">Recommended <span>First Retreats</span></h2>

            <div className="med-tips-recommend">
              <ul className="med-list">
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><Link href="/3-day-meditation-retreat">3-day meditation retreat</Link> — the gentlest entry</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><Link href="/3-day-silent-retreat">3-day silent retreat</Link> — if you are drawn to silence</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><Link href="/weekend-retreat-himalayas">Weekend retreat</Link> — if time is limited</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><Link href="/locations/chakrata">Chakrata</Link> — the most accessible, nurturing first environment</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Start Here"
          subtext="First retreat? We specialise in making the first time genuinely good."
          vertical="retreat"
          category="first-retreat-tips"
          sourcePath={PATH}
        />

        {/* ── FAQ ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4rem 0' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Common Questions</span>
            </div>
            <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/meditation-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Meditation Retreats</span>
              </Link>
              <Link href="/what-to-expect-at-a-meditation-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>What to Expect</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/is-a-meditation-retreat-worth-it" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Is It Worth It?</span>
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