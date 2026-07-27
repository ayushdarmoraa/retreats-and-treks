import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import RetreatFinder from '@/components/RetreatFinder';
import { getAllRetreatServices } from '@/content/retreats/services';
import { getAggregateRating } from '@/content/reviews';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/find-your-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Find Your Retreat | Retreats And Treks',
    description:
      'Answer 5 questions and get a personalised Himalayan retreat recommendation based on your energy, goals, duration, and preferences.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Find Your Retreat',
      description: 'Answer 5 questions. Get matched to the right Himalayan retreat.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Find Your Retreat'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How does the retreat finder work?',
    answer:
      'Five questions about your energy level, goals, preferred duration, social orientation, and relationship with physical movement. Based on your answers, a scoring engine matches you to the top two retreat programs from our registry. No guesswork, no upselling — just an honest match based on what you need right now.',
  },
  {
    question: 'Is the recommendation binding?',
    answer:
      'No. The retreat finder gives you a starting point. You can explore the recommended programs, compare them with others, or contact us for a more detailed conversation. Nothing is booked until you inquire and we confirm availability.',
  },
  {
    question: 'What if none of the recommendations feel right?',
    answer:
      'Contact us directly. The finder covers our standard programs, but we also offer private and custom retreats designed entirely around your specific needs, timeline, and preferences. Sometimes the right retreat does not exist yet — and we build it for you.',
  },
  {
    question: 'Can I retake the quiz?',
    answer:
      'Yes, as many times as you want. There is a reset button at the results screen. Your answers are not stored or sent anywhere — the matching happens entirely in your browser.',
  },
];

export default function FindYourRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const allRetreats = getAllRetreatServices();
  const finderRatings = Object.fromEntries(
    allRetreats.flatMap((s) => {
      const r = getAggregateRating(s.slug);
      return r ? [[s.slug, { value: r.ratingValue, count: r.reviewCount }]] : [];
    }),
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Find Your Retreat', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Find Your Retreat"
        description="Answer 5 questions. Get matched to the right Himalayan retreat."
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

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-finder-hero { padding: 4rem 0; text-align: center; border-bottom: 1px solid rgba(15,118,110,0.08); }
        .med-finder-hero .med-h1 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; letter-spacing: -0.03em; color: #2B2A26; margin: 0 0 0.5rem; }
        .med-finder-hero .med-h1 span { color: #0f766e; }
        .med-finder-hero .med-body { max-width: 520px; margin: 0 auto; }

        .med-finder-section { padding: 4rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-finder-category-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        @media (max-width: 720px) { .med-finder-category-grid { grid-template-columns: 1fr; } }
        .med-finder-category { padding: 1.5rem; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; background: #fff; }
        .med-finder-category .med-h3 { font-size: 1rem; margin-bottom: 0.5rem; }
        .med-finder-category ul { padding-left: 0; list-style: none; line-height: 2; font-size: 0.9rem; }
        .med-finder-category ul li a { color: #0f766e; text-decoration: none; }
        .med-finder-category ul li a:hover { text-decoration: underline; }

        .med-finder-nav { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; padding-top: 1.5rem; }
        .med-finder-nav a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .med-finder-nav a:hover { text-decoration: underline; }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Find Your Retreat' }]} />
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="med-shell med-section-white med-finder-hero">
        <div className="med-inner">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Retreat Finder</span>
            <span className="med-eyebrow-line" />
          </div>
          <h1 className="med-h1">Find Your <span>Retreat</span></h1>
          <p className="med-body">
            Not sure which retreat is right for you? Answer five questions about your current state, goals, and preferences. The recommendation engine matches you to the programs that fit — based on honest scoring, not marketing.
          </p>
        </div>
      </section>

      {/* ── RETREAT FINDER ── */}
      <section className="med-shell med-section-alt med-finder-section">
        <div className="med-inner">
          <RetreatFinder fromPath={PATH} ratings={finderRatings} />
        </div>
      </section>

      {/* ── EXPLORE BY CATEGORY ── */}
      <section className="med-shell med-section-white" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Browse Options</span>
          </div>
          <h2 className="med-h2">Or Explore by <span>Category</span></h2>

          <div className="med-finder-category-grid" style={{ marginTop: '1.8rem' }}>
            <div className="med-finder-category">
              <h3 className="med-h3">By Experience</h3>
              <ul>
                <li><Link href="/meditation-retreats">Meditation Retreats</Link></li>
                <li><Link href="/silent-retreats">Silent Retreats</Link></li>
                <li><Link href="/yoga-retreats">Yoga Retreats</Link></li>
                <li><Link href="/burnout-recovery-retreats">Burnout Recovery</Link></li>
                <li><Link href="/healing-retreat-himalayas">Healing Retreats</Link></li>
              </ul>
            </div>

            <div className="med-finder-category">
              <h3 className="med-h3">By Duration</h3>
              <ul>
                <li><Link href="/3-day-meditation-retreat">3-Day Retreats</Link></li>
                <li><Link href="/5-day-yoga-retreat">5-Day Retreats</Link></li>
                <li><Link href="/7-day-meditation-retreat">7-Day Retreats</Link></li>
                <li><Link href="/10-day-silent-retreat">10-Day Retreats</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

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
            <Link href="/retreat-programs" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Programs</span>
            </Link>
            <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>All Retreats</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/contact" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Contact Us</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/facilitators" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Our Facilitators</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
          </div>
        </div>
      </nav>

    </TrackedPage>
  );
}