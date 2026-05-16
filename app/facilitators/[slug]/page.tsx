import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
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

  return (
    <TrackedPage page={`/facilitators/${slug}`} style={{ width: '100%', maxWidth: '100%', padding: 0, overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, personSchema]) }}
      />

      <style>{`
        .fac-detail-inner { max-width: 68rem; margin: 0 auto; padding: 0 2rem; }
        .fac-detail-eyebrow { font-family: var(--font-geist-sans), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #374151; margin: 0 0 0.8rem; }
        .fac-detail-title { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(2.1rem, 5vw, 4.4rem); line-height: 0.95; font-weight: 200; letter-spacing: -0.06em; color: #0f1f1c; margin: 0 0 1rem; }
        .fac-detail-subtitle { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1rem, 2vw, 1.25rem); line-height: 1.65; color: #4b5563; font-weight: 300; margin: 0; }
        .fac-detail-chip { display: inline-flex; align-items: center; border: 1px solid rgba(15,118,110,0.18); background: rgba(247,249,247,0.9); color: #374151; border-radius: 999px; padding: 0.42rem 0.78rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }
        .fac-detail-card { background: #ffffff; border: 1px solid rgba(15,31,28,0.08); border-radius: 16px; padding: 1.35rem; box-shadow: 0 18px 50px rgba(15,31,28,0.06); }
        .fac-detail-card-title { font-family: var(--font-geist-sans), sans-serif; font-size: 0.9rem; font-weight: 650; color: #111827; margin: 0 0 0.55rem; letter-spacing: -0.01em; }
        .fac-detail-card-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.9rem; line-height: 1.75; color: #5f6865; font-weight: 300; margin: 0; }
        .fac-detail-section { width: 100vw; margin-left: calc(-50vw + 50%); padding: 4.5rem 0; }
        .fac-detail-h2 { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.55rem, 3vw, 2.35rem); line-height: 1.1; font-weight: 250; letter-spacing: -0.04em; color: #111827; margin: 0 0 1rem; }
        .fac-detail-h2 span { color: #374151; }
        .fac-detail-cta { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; background: #0f766e; color: #ffffff; padding: 0.95rem 1.45rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 650; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; box-shadow: 0 16px 36px rgba(15,118,110,0.22); }
        .fac-detail-cta-secondary { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; border: 1px solid rgba(15,31,28,0.16); color: #111827; padding: 0.9rem 1.25rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; font-weight: 650; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; background: rgba(255,255,255,0.75); }
        .fac-detail-program { text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: 0.85rem; min-height: 100%; }
        .fac-detail-program:hover .fac-detail-program-link { gap: 0.75rem; }
        .fac-detail-program-link { font-family: var(--font-geist-sans), sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0f766e; display: inline-flex; gap: 0.45rem; transition: gap 0.2s ease; margin-top: auto; }
        @media (max-width: 760px) {
          .fac-detail-inner { padding: 0 1.25rem; }
          .fac-detail-hero-grid { grid-template-columns: 1fr !important; }
          .fac-detail-two-grid, .fac-detail-three-grid { grid-template-columns: 1fr !important; }
          .fac-detail-hero-image { min-height: 360px !important; }
        }
      `}</style>

      <div className="fac-detail-inner" style={{ paddingTop: '1.25rem' }}>
        <Breadcrumb items={[
          { name: 'Home', href: '/' },
          { name: 'Our Facilitators', href: '/facilitators' },
          { name: facilitator.name },
        ]} />
      </div>

      <section className="fac-detail-section" style={{ background: 'linear-gradient(135deg, #f7f9f7 0%, #ffffff 48%, #eef5f2 100%)', paddingTop: '2.5rem' }}>
        <div className="fac-detail-inner">
          <div className="fac-detail-hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(280px, 0.75fr)', gap: '3rem', alignItems: 'center' }}>
            <div>
              <p className="fac-detail-eyebrow">Retreat Facilitator</p>
              <h1 className="fac-detail-title">{facilitator.name}</h1>
              <p className="fac-detail-subtitle">
                {facilitator.title} with {facilitator.yearsExperience} years of experience guiding retreat spaces, inner work, and mountain-based practice.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1.5rem' }}>
                {facilitator.specialisations.map((item) => (
                  <span key={item} className="fac-detail-chip">{item}</span>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginTop: '2rem' }}>
                <a href={whatsappHref} className="fac-detail-cta" target="_blank" rel="noopener noreferrer">
                  Ask About Retreats →
                </a>
                <Link href="/facilitators" className="fac-detail-cta-secondary">
                  All Facilitators
                </Link>
              </div>
            </div>

            {facilitator.image && (
              <div className="fac-detail-hero-image" style={{ position: 'relative', minHeight: 460, borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 80px rgba(15,31,28,0.16)', background: '#e8eee9' }}>
                <Image src={facilitator.image.src} alt={facilitator.image.alt} fill priority sizes="(max-width: 760px) 100vw, 420px" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,31,28,0.45), transparent 52%)' }} />
                <div style={{ position: 'absolute', left: '1.25rem', right: '1.25rem', bottom: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="fac-detail-chip" style={{ background: 'rgba(255,255,255,0.9)' }}>{facilitator.yearsExperience} years</span>
                  <span className="fac-detail-chip" style={{ background: 'rgba(255,255,255,0.9)' }}>{facilitator.locationIds.join(' · ')}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="fac-detail-section" style={{ background: '#ffffff' }}>
        <div className="fac-detail-inner">
          <div style={{ maxWidth: '52rem' }}>
            <p className="fac-detail-eyebrow">About the facilitator</p>
            <h2 className="fac-detail-h2">The person behind the <span>practice</span></h2>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.05rem', lineHeight: 1.9, color: '#4b5563', fontWeight: 300, margin: 0 }}>
              {facilitator.bio}
            </p>
          </div>
        </div>
      </section>

      <section className="fac-detail-section" style={{ background: '#f7f9f7' }}>
        <div className="fac-detail-inner">
          <p className="fac-detail-eyebrow">Experience & training</p>
          <h2 className="fac-detail-h2">Background that shapes the <span>retreat</span></h2>
          <div className="fac-detail-two-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
            {facilitator.background.map((item) => (
              <div key={item} className="fac-detail-card">
                <p className="fac-detail-card-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fac-detail-section" style={{ background: '#ffffff' }}>
        <div className="fac-detail-inner">
          <div className="fac-detail-two-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', alignItems: 'start' }}>
            <div className="fac-detail-card" style={{ padding: '1.8rem' }}>
              <p className="fac-detail-eyebrow">Approach</p>
              <h2 className="fac-detail-h2">How the space is <span>held</span></h2>
              <p className="fac-detail-card-text" style={{ fontSize: '0.98rem' }}>
                {facilitator.approach}
              </p>
            </div>
            <div className="fac-detail-card" style={{ padding: '1.8rem' }}>
              <p className="fac-detail-eyebrow">Qualifications</p>
              <h2 className="fac-detail-h2">Practice <span>signals</span></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {facilitator.qualifications.map((q) => (
                  <div key={q} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#0f766e', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', fontWeight: 700, flexShrink: 0, marginTop: '0.2rem' }}>✓</span>
                    <p className="fac-detail-card-text">{q}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {linkedServices.length > 0 && (
        <section className="fac-detail-section" style={{ background: '#f7f9f7' }}>
          <div className="fac-detail-inner">
            <p className="fac-detail-eyebrow">Retreat programs</p>
            <h2 className="fac-detail-h2">Retreats connected to <span>{facilitator.name.split(' ')[0]}</span></h2>
            <div className="fac-detail-three-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem', marginTop: '2rem' }}>
              {linkedServices.map((s) => (
                <Link key={s.slug} href={`/retreats/journeys/${s.slug}`} className="fac-detail-card fac-detail-program">
                  <h3 className="fac-detail-card-title">{s.title}</h3>
                  {'oneLineEssence' in s && (
                    <p className="fac-detail-card-text">{s.oneLineEssence}</p>
                  )}
                  {'keyHighlights' in s && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {s.keyHighlights.slice(0, 3).map((tag) => (
                        <span key={tag} className="fac-detail-chip" style={{ fontSize: '0.58rem', padding: '0.28rem 0.55rem' }}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <span className="fac-detail-program-link">View retreat →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {chaitraGallery.length > 0 && (
        <section className="fac-detail-section" style={{ background: '#ffffff' }}>
          <div className="fac-detail-inner">
            <p className="fac-detail-eyebrow">Real retreat moments</p>
            <h2 className="fac-detail-h2">From Chaitra’s <span>art retreats</span></h2>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.98rem', lineHeight: 1.85, color: '#5f6865', fontWeight: 300, maxWidth: '42rem', margin: '0 0 2rem' }}>
              Actual creative spaces, art therapy sessions, reflection circles, and participant artwork from retreats guided by Chaitra.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr 1fr', gap: '1rem' }} className="fac-detail-three-grid">
              {chaitraGallery.map((image, index) => (
                <div
                  key={image.src}
                  style={{
                    position: 'relative',
                    minHeight: index === 0 ? 420 : 205,
                    borderRadius: 18,
                    overflow: 'hidden',
                    gridRow: index === 0 ? 'span 2' : undefined,
                    boxShadow: '0 18px 48px rgba(15,31,28,0.08)',
                    background: '#eef0ee',
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    quality={70}
                    sizes="(max-width: 760px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,31,28,0.35), transparent 55%)' }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="fac-detail-section" style={{ background: '#0a1f1c', textAlign: 'center' }}>
        <div className="fac-detail-inner" style={{ maxWidth: '48rem' }}>
          <p className="fac-detail-eyebrow" style={{ color: 'rgba(255,255,255,0.58)' }}>Plan with us</p>
          <h2 className="fac-detail-h2" style={{ color: '#ffffff' }}>Want to know if this facilitator or retreat style is right for you?</h2>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.62)', fontWeight: 300, margin: '0 auto 2rem', maxWidth: '38rem' }}>
            Tell us what you are looking for. We will help you choose the right retreat format, dates, location, and level of support.
          </p>
          <a href={whatsappHref} className="fac-detail-cta" target="_blank" rel="noopener noreferrer">
            Message on WhatsApp →
          </a>
          <nav style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/facilitators" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.85rem' }}>All Facilitators</Link>
            <Link href="/retreat-calendar" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.85rem' }}>Retreat Calendar</Link>
            <Link href="/retreat-programs" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.85rem' }}>All Programs</Link>
            <Link href="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.85rem' }}>Contact</Link>
          </nav>
        </div>
      </section>
    </TrackedPage>
  );
}
