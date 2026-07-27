import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/benefits-of-himalayan-retreats';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Benefits of Himalayan Retreats | Retreats And Treks',
    description:
      'Explore the benefits of Himalayan retreats — altitude, forest, silence, remoteness, nervous system rest, restored attention, and deeper transformation.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Benefits of Himalayan Retreats',
      description: 'How altitude, forest, silence, and remoteness heal — the science and experience of Himalayan retreats.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Benefits of Himalayan Retreats'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Are the benefits of a Himalayan retreat scientifically proven?',
    answer:
      'Specific elements are well-documented: forest bathing (shinrin-yoku) reduces cortisol and blood pressure. Altitude exposure between 1,500–3,000m increases red blood cell production and improves cardiovascular efficiency. Silence reduces amygdala reactivity. Nature exposure restores directed attention. The combination of all four in a single retreat environment is what makes Himalayan retreats uniquely effective — each element amplifies the others.',
  },
  {
    question: 'How long do the benefits last after returning home?',
    answer:
      'Most retreatants report benefits lasting weeks to months. The initial clarity and calm may fade as daily life reasserts itself, but deeper shifts — in perspective, priorities, and nervous system baseline — tend to persist. Regular follow-up practice (even 10 minutes daily) extends the benefits significantly. Many people return annually as a recalibration practice.',
  },
  {
    question: 'Do I need to be spiritual to benefit from a Himalayan retreat?',
    answer:
      'Not at all. The physiological benefits — reduced cortisol, better sleep, restored attention, lower blood pressure — occur regardless of belief. The environmental effects (altitude, forest, silence) work on the body directly. If you are spiritual, the Himalayan environment deepens that dimension. If you are not, the benefits are still substantial and measurable.',
  },
  {
    question: 'Is altitude safe for retreat participants?',
    answer:
      'Our retreat locations range from 2,000m (Chakrata) to 3,500m (Zanskar). Up to 2,500m, most healthy adults experience no issues. Above that, acclimatisation protocols are followed — gradual ascent, hydration, rest days. We assess each participant\'s health before assigning a location. People with cardiovascular or respiratory conditions should consult their doctor and consider lower-altitude options.',
  },
  {
    question: 'Which Himalayan location has the strongest retreat benefits?',
    answer:
      'It depends on what you need. Chakrata offers the best combination of accessibility and forest immersion — ideal for stress relief and first retreats. Zanskar offers the deepest silence and remoteness — ideal for transformative experiences. Rishikesh offers traditional healing lineages. Munsiyari offers alpine spaciousness and perspective. The "strongest" location is the one that matches your current need.',
  },
  {
    question: 'Can a short Himalayan retreat (3 days) provide real benefits?',
    answer:
      'Yes. Research shows cortisol reduction and attention restoration beginning within 48 hours of forest immersion. Three days in a Himalayan environment produces measurable physiological and psychological changes. Longer retreats (5–7 days) allow deeper transformation, but even a three-day retreat in Chakrata is not a token experience — it is a genuine intervention.',
  },
];

export default function BenefitsOfHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Benefits of Himalayan Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: 'Benefits of Himalayan Retreats',
    description: 'How altitude, forest, silence, and remoteness create conditions for healing and transformation.',
    url: canonicalUrl,
    isPartOf: { '@id': schemaIds.website },
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Benefits of Himalayan Retreats"
        description="How altitude, forest, silence, and remoteness heal — the science and experience of Himalayan retreats."
        path={PATH}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, webPageSchema]) }}
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
        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
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

        .med-benefit-item { padding: 1.5rem; border-radius: 18px; border: 1px solid rgba(15,118,110,0.12); background: #fff; }
        .med-benefit-item .med-h3 { margin-bottom: 0.5rem; }
        .med-benefit-item .med-body { margin-bottom: 0; }

        .med-benefit-grid { display: grid; gap: 1.4rem; }
      `}</style>

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Benefits of Himalayan Retreats' },
        ]}
      />

      <article>
        {/* ── HERO ── */}
        <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <img className="med-hero-bg" src="/Images/hero/himalayan-sunrise.webp" alt="Benefits of Himalayan retreats" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
          </div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Retreat Guide</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
              Benefits of <span style={{ color: '#5eead4' }}>Himalayan Retreats</span>
            </h1>
            <p style={{ maxWidth: '40rem', margin: '0 auto', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
              A retreat in the Himalayas is not a wellness holiday with mountain views bolted on. The environment itself is the primary therapeutic agent. Altitude changes your blood chemistry. Forest changes your nervous system. Silence changes your brain. Remoteness changes your relationship to time. These are not metaphors — they are measurable physiological effects. This guide explains what the Himalayan environment does to your body and mind, and why it works where other interventions do not.
            </p>
          </div>
        </section>

        {/* ── BENEFITS LIST ── */}
        <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Science &amp; Experience</span>
            </div>
            <h2 className="med-h2">Benefits of Himalayan <span>Retreats</span></h2>

            <div className="med-benefit-grid" style={{ marginTop: '1.8rem' }}>
              {/* 1. Altitude */}
              <div className="med-card med-benefit-item">
                <span className="med-season-tag">1. Altitude</span>
                <h3 className="med-h3">What Thin Air Does to the Mind</h3>
                <p className="med-body" style={{ fontSize: '0.92rem' }}>
                  At 2,000–3,500 metres, the air contains 20–35% less oxygen than at sea level. This triggers measurable changes: increased red blood cell production, improved cardiovascular efficiency, and — most relevant for retreats — a natural slowing of mental processes. The thinking mind, which relies on glucose and oxygen, becomes less dominant. This is not impairment. It is recalibration.
                </p>
                <p className="med-body" style={{ fontSize: '0.92rem', marginBottom: 0 }}>
                  Meditators report that practices which take years to develop at sea level become accessible within days at altitude. The mind simply has less fuel for its habitual racing. In <Link href="/locations/zanskar" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>Zanskar</Link> at 3,500m, this effect is profound. In <Link href="/locations/chakrata" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>Chakrata</Link> at 2,000m, it is gentle but present.
                </p>
              </div>

              {/* 2. Forest */}
              <div className="med-card med-benefit-item">
                <span className="med-season-tag">2. Forest</span>
                <h3 className="med-h3">The Science of Shinrin-Yoku</h3>
                <p className="med-body" style={{ fontSize: '0.92rem' }}>
                  Japanese researchers coined "shinrin-yoku" (forest bathing) to describe the physiological effects of forest immersion. The findings are consistent: reduced cortisol, lowered blood pressure, decreased heart rate, improved immune function (through phytoncides — antimicrobial compounds released by trees), and enhanced parasympathetic nervous system activity.
                </p>
                <p className="med-body" style={{ fontSize: '0.92rem', marginBottom: 0 }}>
                  The Himalayan forests — particularly the deodar and oak forests around Chakrata — provide an unusually dense phytoncide environment. Walking through these forests is not just pleasant. It is a measurable health intervention. Even 24 hours of forest immersion begins to shift the body from sympathetic (fight-or-flight) to parasympathetic (rest-and-repair) dominance.
                </p>
              </div>

              {/* 3. Silence */}
              <div className="med-card med-benefit-item">
                <span className="med-season-tag">3. Silence</span>
                <h3 className="med-h3">What Happens When the Noise Stops</h3>
                <p className="med-body" style={{ fontSize: '0.92rem' }}>
                  Chronic noise exposure is a documented health hazard — it elevates cortisol, disrupts sleep architecture, and impairs cognitive function. Extended silence reverses these effects. Research from Duke University showed that two hours of silence per day stimulated hippocampal neurogenesis (the growth of new brain cells in the region associated with memory and emotion).
                </p>
                <p className="med-body" style={{ fontSize: '0.92rem', marginBottom: 0 }}>
                  In Himalayan retreat environments, the silence is not just the absence of noise — it is an active acoustic environment created by forest, altitude, and distance from civilisation. This quality of silence goes deeper than what you can create at home with headphones or a quiet room. See <Link href="/what-happens-at-a-silent-retreat" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>what happens at a silent retreat</Link> for the full experiential guide.
                </p>
              </div>

              {/* 4. Remoteness */}
              <div className="med-card med-benefit-item">
                <span className="med-season-tag">4. Remoteness</span>
                <h3 className="med-h3">The Psychology of Separation</h3>
                <p className="med-body" style={{ fontSize: '0.92rem' }}>
                  Being far from your daily environment creates genuine psychological separation. This is not just about distance — it is about the removal of environmental cues. Your office, your home, your neighbourhood all carry thousands of unconscious triggers that keep you in habitual states. Remove those triggers, and the habits they sustain begin to weaken.
                </p>
                <p className="med-body" style={{ fontSize: '0.92rem', marginBottom: 0 }}>
                  The difficulty of reaching Himalayan retreat locations is part of the medicine. A 9-hour drive to <Link href="/locations/munsiyari" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>Munsiyari</Link>, a mountain pass crossing to <Link href="/locations/zanskar" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>Zanskar</Link> — these journeys dismantle your daily identity layer by layer. By the time you arrive, the person who boarded the plane has already begun to change.
                </p>
              </div>

              {/* 5. Combined Effect */}
              <div className="med-card med-benefit-item" style={{ gridColumn: '1 / -1' }}>
                <span className="med-season-tag">5. Combined Effect</span>
                <h3 className="med-h3">Why the Himalayas Specifically</h3>
                <p className="med-body" style={{ fontSize: '0.92rem' }}>
                  Any one of these factors — altitude, forest, silence, remoteness — is beneficial on its own. The Himalayas provide all four simultaneously. This compounding effect is what makes a Himalayan retreat qualitatively different from a meditation app, a weekend workshop, or a spa holiday.
                </p>
                <p className="med-body" style={{ fontSize: '0.92rem', marginBottom: 0 }}>
                  Add to this the contemplative tradition of the region — thousands of years of spiritual practice in <Link href="/locations/rishikesh" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>Rishikesh</Link>, over a millennium of monastic silence in Zanskar — and you have an environment that has been consciously and unconsciously shaped for inner work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Experience These Benefits Yourself"
          subtext="Tell us what you're seeking and we'll match you to the right Himalayan environment."
          vertical="retreat"
          category="guide-benefits-himalayan"
          sourcePath={PATH}
        />

        {/* ── FURTHER READING ── */}
        <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Further Reading</span>
            </div>
            <h2 className="med-h2">Recommended <span>Reads</span></h2>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><Link href="/how-to-choose-a-meditation-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>How to choose a meditation retreat</Link></span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><Link href="/retreat-vs-vacation" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Retreat vs vacation</Link></span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><Link href="/healing-retreat-himalayas" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Healing retreats in the Himalayas</Link></span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><Link href="/stress-relief-retreats" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Stress relief retreats</Link></span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><Link href="/best-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Best Himalayan retreats</Link></span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><Link href="/locations" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>All retreat locations</Link></span>
              </li>
            </ul>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
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
        <nav className="med-shell" style={{ background: '#f7f9f7', padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Retreats</span>
              </Link>
              <Link href="/retreats/himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Himalayan Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreats/best-retreat-in-uttarakhand" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Best Retreats</span>
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