import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { getFacilitator, getAllFacilitatorSlugs } from '@/config/facilitators';
import { getAllRetreatServices } from '@/content/retreats/services';
import { images } from '@/lib/images';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllFacilitatorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const facilitator = getFacilitator(slug);
  if (!facilitator) return {};
  return {
    title: facilitator.seoTitle ?? `${facilitator.name} | Retreats And Treks`,
    description: facilitator.metaDescription,
    alternates: { canonical: buildCanonicalUrl(`/facilitators/${slug}`) },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${facilitator.name} — ${facilitator.title}`,
      description: facilitator.metaDescription,
      url: buildCanonicalUrl(`/facilitators/${slug}`),
      type: 'profile',
      images: buildOgImages(`${facilitator.name} — ${facilitator.title}`),
    },
  };
}

export default async function FacilitatorPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const facilitator = getFacilitator(slug);
  if (!facilitator) notFound();

  const allServices = getAllRetreatServices();
  const linkedServices = allServices.filter((s) => facilitator.retreatSlugs.includes(s.slug));
  const chaitraGallery = slug === 'chaitra-ram'
    ? [
        images.chaitraArtRetreat.riversideSetup,
        images.chaitraArtRetreat.mountainSession,
        images.chaitraArtRetreat.indoorWorkshop,
        images.chaitraArtRetreat.eveningReflection,
        images.chaitraArtRetreat.groupPaintings,
        images.chaitraArtRetreat.outdoorEaselPainting,
        images.chaitraArtRetreat.expressiveWallPainting,
        images.chaitraArtRetreat.gardenCanvasPainting,
      ]
    : [];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Our Facilitators', url: buildCanonicalUrl('/facilitators') },
    { name: facilitator.name, url: buildCanonicalUrl(`/facilitators/${slug}`) },
  ]);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: facilitator.name,
    jobTitle: facilitator.title,
    description: facilitator.bio,
    worksFor: { '@id': schemaIds.organization },
    url: buildCanonicalUrl(`/facilitators/${slug}`),
  };

  const whatsappText = encodeURIComponent(`Hi, I want to know more about retreats guided by ${facilitator.name}.`);
  const whatsappHref = `https://wa.me/919760446101?text=${whatsappText}`;

  // Split heading for green last word
  const h1Words = facilitator.name.split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  return (
    <TrackedPage page={`/facilitators/${slug}`} style={{ width: '100%', maxWidth: '100%', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title={`${facilitator.name} — ${facilitator.title}`}
        description={facilitator.metaDescription}
        path={`/facilitators/${slug}`}
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

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-fac-hero { padding: 3rem 0 4rem; border-bottom: 1px solid rgba(15,118,110,0.08); }
        .med-fac-hero .med-h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 600; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.08; margin: 0 0 0.5rem; }
        .med-fac-hero .med-h1 span { color: #0f766e; }
        .med-fac-hero .med-body { max-width: 520px; }

        .med-fac-chip { display: inline-flex; align-items: center; border: 1px solid rgba(15,118,110,0.12); background: #f7f9f7; color: #4b5259; border-radius: 999px; padding: 0.3rem 0.7rem; font-family: var(--font-inter), sans-serif; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }

        .med-fac-card { padding: 1.5rem; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; background: #fff; transition: all 0.3s ease; }
        .med-fac-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(15,31,28,0.1); border-color: rgba(15,118,110,0.28); }
        .med-fac-card .med-fac-card-title { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.05rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.5rem; }
        .med-fac-card .med-body { font-size: 0.88rem; margin-bottom: 0.5rem; }
        .med-fac-card .med-fac-link { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #0f766e; display: inline-flex; align-items: center; gap: 0.4rem; margin-top: auto; }
        .med-fac-card .med-fac-link:hover { gap: 0.7rem; }

        .med-fac-gallery { display: grid; grid-template-columns: 1.25fr 1fr 1fr; gap: 1rem; }
        .med-fac-gallery .med-gallery-item { position: relative; min-height: 205px; border-radius: 18px; overflow: hidden; background: #f7f9f7; border: 1px solid rgba(15,118,110,0.08); }
        .med-fac-gallery .med-gallery-item:first-child { min-height: 420px; grid-row: span 2; }
        .med-fac-gallery .med-gallery-item img { width: 100%; height: 100%; object-fit: cover; }
        @media (max-width: 760px) { .med-fac-gallery { grid-template-columns: 1fr; } .med-fac-gallery .med-gallery-item:first-child { min-height: 280px; grid-row: auto; } }

        .med-fac-cta-section { padding: 4rem 0; text-align: center; background: #f7f9f7; border-top: 1px solid rgba(15,118,110,0.08); }
        .med-fac-cta-section .med-body { max-width: 42rem; margin: 0 auto 1.5rem; }
        .med-fac-cta-section .med-cta-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }

        .med-fac-check { display: flex; gap: 0.75rem; align-items: flex-start; margin-bottom: 0.6rem; }
        .med-fac-check:last-child { margin-bottom: 0; }
        .med-fac-check .med-check-icon { width: 20px; height: 20px; border-radius: 50%; background: #0f766e; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: 700; flex-shrink: 0; margin-top: 0.15rem; }
        .med-fac-check .med-body { font-size: 0.9rem; margin-bottom: 0; }
      `}</style>

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb items={[
            { name: 'Home', href: '/' },
            { name: 'Our Facilitators', href: '/facilitators' },
            { name: facilitator.name },
          ]} />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, personSchema]) }}
      />

      {/* ── HERO ── */}
      <section className="med-shell med-section-white med-fac-hero">
        <div className="med-outer">
          <div className="med-grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Retreat Facilitator</span>
              </div>
              <h1 className="med-h1">
                {h1Rest} <span>{h1LastWord}</span>
              </h1>
              <p className="med-body">
                {facilitator.title} with {facilitator.yearsExperience} years of experience guiding retreat spaces, inner work, and mountain-based practice.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                {facilitator.specialisations.map((item) => (
                  <span key={item} className="med-fac-chip">{item}</span>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
                <a href={whatsappHref} className="med-cta-btn" target="_blank" rel="noopener noreferrer">
                  Ask About Retreats →
                </a>
                <Link href="/facilitators" className="med-cta-outline">
                  All Facilitators
                </Link>
              </div>
            </div>

            {facilitator.image && (
              <div style={{ position: 'relative', minHeight: 400, borderRadius: 18, overflow: 'hidden', background: '#f7f9f7', border: '1px solid rgba(15,118,110,0.08)' }}>
                <Image src={facilitator.image.src} alt={facilitator.image.alt} width={840} height={840} priority sizes="(max-width: 760px) 100vw, 420px" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="med-fac-chip" style={{ background: 'rgba(255,255,255,0.9)' }}>{facilitator.yearsExperience} years</span>
                  <span className="med-fac-chip" style={{ background: 'rgba(255,255,255,0.9)' }}>{facilitator.locationIds.join(' · ')}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="med-shell med-section-alt" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">About the facilitator</span>
          </div>
          <h2 className="med-h2">About <span>{facilitator.name}</span></h2>
          <p className="med-body" style={{ fontSize: '1.05rem', marginBottom: 0 }}>
            {facilitator.bio}
          </p>
        </div>
      </section>

      {/* ── BACKGROUND ── */}
      <section className="med-shell med-section-white" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Experience &amp; Training</span>
          </div>
          <h2 className="med-h2">{facilitator.name.split(' ')[0]}'s retreat <span>background</span></h2>
          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            {facilitator.background.map((item) => (
              <div key={item} className="med-card" style={{ padding: '1.5rem' }}>
                <p className="med-body" style={{ fontSize: '0.92rem', marginBottom: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPROACH & QUALIFICATIONS ── */}
      <section className="med-shell med-section-alt" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-grid-2" style={{ alignItems: 'start' }}>
            <div className="med-card" style={{ padding: '2rem' }}>
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Approach</span>
              </div>
              <h2 className="med-h2">How the space is <span>held</span></h2>
              <p className="med-body" style={{ fontSize: '0.98rem', marginBottom: 0 }}>
                {facilitator.approach}
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Qualifications</span>
              </div>
              <h2 className="med-h2">Practice <span>signals</span></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {facilitator.qualifications.map((q) => (
                  <div key={q} className="med-fac-check">
                    <span className="med-check-icon">✓</span>
                    <p className="med-body">{q}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LINKED RETREATS ── */}
      {linkedServices.length > 0 && (
        <section className="med-shell med-section-white" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Retreat programs</span>
            </div>
            <h2 className="med-h2">Retreats connected to <span>{facilitator.name.split(' ')[0]}</span></h2>
            <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
              {linkedServices.map((s) => (
                <Link key={s.slug} href={`/retreats/journeys/${s.slug}`} className="med-fac-card" style={{ textDecoration: 'none' }}>
                  <h3 className="med-fac-card-title">{s.title}</h3>
                  {'oneLineEssence' in s && (
                    <p className="med-body">{s.oneLineEssence}</p>
                  )}
                  {'keyHighlights' in s && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                      {s.keyHighlights.slice(0, 3).map((tag) => (
                        <span key={tag} className="med-fac-chip" style={{ fontSize: '0.55rem', padding: '0.25rem 0.5rem' }}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <span className="med-fac-link">View retreat →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CHAITRA GALLERY ── */}
      {chaitraGallery.length > 0 && (
        <section className="med-shell med-section-alt" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Real retreat moments</span>
            </div>
            <h2 className="med-h2">From Chaitra's <span>art retreats</span></h2>
            <p className="med-body" style={{ maxWidth: '42rem', marginBottom: '1.5rem' }}>
              Actual creative spaces, art therapy sessions, reflection circles, and participant artwork from retreats guided by Chaitra.
            </p>
            <div className="med-fac-gallery">
              {chaitraGallery.map((image, index) => (
                <div key={image.src} className="med-gallery-item">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    loading="lazy"
                    quality={70}
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA SECTION ── */}
      <section className="med-shell med-fac-cta-section">
        <div className="med-inner">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Plan with us</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>Want to know if this facilitator or retreat style <span>is right for you?</span></h2>
          <p className="med-body">
            Tell us what you are looking for. We will help you choose the right retreat format, dates, location, and level of support.
          </p>
          <div className="med-cta-actions">
            <a href={whatsappHref} className="med-cta-btn" target="_blank" rel="noopener noreferrer">
              Message on WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell med-section-alt" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-nav-grid">
            <Link href="/facilitators" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Facilitators</span>
            </Link>
            <Link href="/retreat-calendar" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreat Calendar</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/retreat-programs" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>All Programs</span>
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