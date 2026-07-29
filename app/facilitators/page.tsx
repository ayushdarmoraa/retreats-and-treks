import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { FACILITATOR_PROFILES } from '@/config/facilitators';

const PATH = '/facilitators';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Our Facilitators | Retreats And Treks',
    description:
      'Meet the facilitators who lead our Himalayan retreats, including meditation teachers, yoga instructors, psychologists, guides, and healers.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Our Facilitators',
      description: 'Meet the people behind our retreat programs.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Our Facilitators'),
    },
  };
}

export default function FacilitatorsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Our Facilitators', url: buildCanonicalUrl(PATH) },
  ]);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Our Facilitators"
        description="Meet the people behind our retreat programs."
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

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-fac-hero { padding: 4rem 0; text-align: center; border-bottom: 1px solid rgba(15,118,110,0.08); }
        .med-fac-hero .med-h1 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; letter-spacing: -0.03em; color: #2B2A26; margin: 0 0 0.5rem; }
        .med-fac-hero .med-h1 span { color: #0f766e; }
        .med-fac-hero .med-body { max-width: 520px; margin: 0 auto; }

        .med-fac-card { display: flex; gap: 1.25rem; align-items: flex-start; padding: 1.5rem; text-decoration: none; color: inherit; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; background: #fff; transition: all 0.3s ease; }
        .med-fac-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(15,31,28,0.1); border-color: rgba(15,118,110,0.28); }
        .med-fac-card .med-avatar { flex-shrink: 0; width: 80px; height: 80px; border-radius: 50%; overflow: hidden; position: relative; background: #f7f9f7; border: 2px solid rgba(15,118,110,0.12); }
        .med-fac-card .med-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .med-fac-card .med-fac-name { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.1rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.25rem 0; }
        .med-fac-card .med-fac-title { font-family: var(--font-inter), sans-serif; font-size: 0.85rem; color: #6b7280; margin: 0 0 0.5rem 0; }
        .med-fac-card .med-fac-spec { font-family: var(--font-inter), sans-serif; font-size: 0.85rem; line-height: 1.6; color: #4b5259; margin: 0; }
        .med-fac-card .med-fac-spec .med-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.2rem 0.6rem; border-radius: 999px; margin: 0.1rem 0.2rem; }

        .med-fac-grid { display: grid; gap: 1.4rem; margin-top: 1.8rem; }

        .med-fac-nav { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; padding-top: 2.5rem; border-top: 1px solid rgba(15,118,110,0.08); margin-top: 2.5rem; }
        .med-fac-nav a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .med-fac-nav a:hover { text-decoration: underline; }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Our Facilitators' }]} />

      {/* ── HERO ── */}
      <section className="med-shell med-section-white med-fac-hero">
        <div className="med-inner">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Meet the Team</span>
            <span className="med-eyebrow-line" />
          </div>
          <h1 className="med-h1">Our <span>Facilitators</span></h1>
          <p className="med-body">
            Every retreat is led by someone with direct experience — not a script. Our facilitators are meditation teachers, clinical psychologists, yoga practitioners, mountain guides, and sound healing specialists who live the work they lead.
          </p>
        </div>
      </section>

      {/* ── FACILITATORS GRID ── */}
      <section className="med-shell med-section-alt" style={{ padding: '4rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Our Facilitators</span>
          </div>
          <h2 className="med-h2">Meet the people <span>behind the retreats</span></h2>

          <div className="med-fac-grid">
            {FACILITATOR_PROFILES.map((f) => (
              <Link
                key={f.slug}
                href={`/facilitators/${f.slug}`}
                className="med-fac-card"
              >
                <div className="med-avatar">
                  {f.image && (
                    <Image src={f.image.src} alt={f.image.alt} width={80} height={80} />
                  )}
                </div>
                <div>
                  <h3 className="med-fac-name">{f.name}</h3>
                  <p className="med-fac-title">{f.title} · {f.yearsExperience} years</p>
                  <p className="med-fac-spec">
                    {f.specialisations.map((spec) => (
                      <span key={spec} className="med-tag">{spec}</span>
                    ))}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* ── NAV ── */}
          <div className="med-fac-nav">
            <Link href="/retreat-calendar">Retreat Calendar</Link>
            <Link href="/retreat-programs">All Programs</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-nav-grid">
            <Link href="/" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Home</span>
            </Link>
            <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreats</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/treks" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Treks</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/contact" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Contact</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
          </div>
        </div>
      </nav>

    </TrackedPage>
  );
}
