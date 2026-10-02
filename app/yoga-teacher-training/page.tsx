import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { YOGA_TTC_PRODUCT } from '@/config/retreatProgramEvents';
import { schemaIds } from '@/lib/schemaIds';

const PATH = '/yoga-teacher-training';
const WHATSAPP_HREF = `https://wa.me/919760446101?text=${encodeURIComponent('Hi, I\'m interested in the 28-Day Yoga Teacher Training in Rishikesh. Please share the upcoming batch details.')}`;

const FAQ_ITEMS = [
  {
    question: 'What is the 28-Day Yoga Teacher Training?',
    answer: 'It is a structured long-form Yoga study and teacher-preparation pathway in Rishikesh, separate from a short-term personal-practice Yoga retreat.',
  },
  {
    question: 'What does the programme cover?',
    answer: 'The published programme areas include Yoga practice, philosophy, anatomy and fundamentals, pranayama, meditation, teaching methodology, sequencing, practicum, assessment, and a certificate of completion.',
  },
  {
    question: 'Is there a confirmed batch date?',
    answer: 'No batch date is currently published. Upcoming TTC batches are enquiry-only; ask on WhatsApp for current batch details.',
  },
  {
    question: 'How do I enquire?',
    answer: 'Use the WhatsApp CTA and ask about the upcoming 28-day batch details. The team can confirm current operational information through enquiry.',
  },
  {
    question: 'How is TTC different from a Yoga retreat?',
    answer: 'A Yoga retreat is a shorter personal-practice experience. TTC is a structured education and teacher-preparation pathway with theory, methodology, practice teaching, and assessment.',
  },
];

export const metadata: Metadata = {
  title: '28 Day Yoga Teacher Training in Rishikesh | RetreatsAndTreks',
  description: '28-day Yoga Teacher Training in Rishikesh with ₹49,999 fee, structured study, teaching practice, assessment, and upcoming batches available by WhatsApp enquiry.',
  alternates: { canonical: buildCanonicalUrl(PATH) },
  robots: { index: true, follow: true },
};

const sectionStyle = (background: string): React.CSSProperties => ({
  width: '100%',
  background,
  padding: '4rem 1.25rem',
  borderBottom: '1px solid rgba(15,118,110,0.08)',
  boxSizing: 'border-box',
});

export default function YogaTeacherTrainingPage() {
  const canonicalUrl = buildCanonicalUrl(PATH);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Yoga Retreats', url: buildCanonicalUrl('/yoga-retreats') },
    { name: 'Yoga Teacher Training', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: 0, padding: 0, overflowX: 'hidden' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${canonicalUrl}#yoga-ttc`,
        name: YOGA_TTC_PRODUCT.name,
        description: YOGA_TTC_PRODUCT.curriculum?.join('. '),
        brand: { '@id': schemaIds.organization },
        url: canonicalUrl,
      }]) }} />

      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '1rem 1.25rem' }}>
        <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Yoga Retreats', href: '/yoga-retreats' }, { name: 'Yoga Teacher Training' }]} />
      </div>

      <header style={{ ...sectionStyle('#0b241f'), color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '54rem', margin: '0 auto' }}>
          <p style={{ margin: '0 0 0.75rem', color: '#99f6e4', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Separate from Yoga retreats</p>
          <h1 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.1rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>28-Day Yoga Teacher Training in Rishikesh</h1>
          <p style={{ maxWidth: '44rem', margin: '0 auto 1.5rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.8 }}>
            A structured long-form education and teacher-preparation pathway for people wanting deeper Yoga study, theory, teaching methodology, practical teaching experience, and assessment.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <TrackedWhatsAppLink href={WHATSAPP_HREF} sourcePath={PATH} location="Rishikesh" intent="28-day Yoga TTC enquiry" analyticsEvent="yoga_whatsapp_click" product={YOGA_TTC_PRODUCT.name} productId={YOGA_TTC_PRODUCT.id} duration="28 days" ctaPosition="hero" style={{ display: 'inline-flex', padding: '0.9rem 1.4rem', borderRadius: 999, background: '#fff', color: '#0f766e', fontWeight: 700, textDecoration: 'none' }}>
              Ask About the 28-Day TTC
            </TrackedWhatsAppLink>
            <Link href="/compare/yoga-retreat-vs-yoga-teacher-training" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.9rem 1.4rem', borderRadius: 999, border: '1px solid rgba(255,255,255,0.4)', color: '#fff', fontWeight: 700, textDecoration: 'none' }}>
              Compare TTC and Retreats
            </Link>
          </div>
        </div>
      </header>

      <section style={sectionStyle('#fff')} aria-labelledby="ttc-facts">
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <h2 id="ttc-facts" style={{ margin: '0 0 1.25rem', color: '#2B2A26', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}>Course facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))', gap: '1rem' }}>
            <div><strong>Duration</strong><p style={{ margin: '0.35rem 0 0', color: '#4b5259' }}>28 days</p></div>
            <div><strong>Location</strong><p style={{ margin: '0.35rem 0 0', color: '#4b5259' }}>Rishikesh</p></div>
            <div><strong>Fee</strong><p style={{ margin: '0.35rem 0 0', color: '#0f766e', fontSize: '1.25rem', fontWeight: 700 }}>₹49,999</p></div>
            <div><strong>Accommodation</strong><p style={{ margin: '0.35rem 0 0', color: '#4b5259' }}>Shared accommodation</p></div>
          </div>
          <p style={{ margin: '1.25rem 0 0', color: '#4b5259', lineHeight: 1.8 }}>Meals are standard retreat-style meals. Exact venue and other operational details are confirmed through enquiry.</p>
          <div style={{ marginTop: '1.25rem', padding: '1rem 1.2rem', borderLeft: '3px solid #0f766e', background: '#f7f9f7', color: '#2B2A26', fontWeight: 600 }}>Upcoming TTC batches — enquire on WhatsApp.</div>
        </div>
      </section>

      <section style={sectionStyle('#f7f9f7')} aria-labelledby="ttc-curriculum">
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <h2 id="ttc-curriculum" style={{ margin: '0 0 1.25rem', color: '#2B2A26', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}>Programme areas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 15rem), 1fr))', gap: '0.75rem' }}>
            {YOGA_TTC_PRODUCT.curriculum?.map((item) => <div key={item} style={{ padding: '0.9rem 1rem', background: '#fff', border: '1px solid rgba(15,118,110,0.12)', borderRadius: 8, color: '#2B2A26', fontWeight: 600 }}>{item}</div>)}
          </div>
        </div>
      </section>

      <section style={sectionStyle('#fff')} aria-labelledby="ttc-audience">
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))', gap: '2rem' }}>
          <div>
            <h2 id="ttc-audience" style={{ margin: '0 0 0.75rem', color: '#2B2A26', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}>Who this pathway is for</h2>
            <p style={{ margin: 0, color: '#4b5259', lineHeight: 1.8 }}>{YOGA_TTC_PRODUCT.eligibility}</p>
          </div>
          <div>
            <h2 style={{ margin: '0 0 0.75rem', color: '#2B2A26', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}>TTC versus a retreat</h2>
            <p style={{ margin: 0, color: '#4b5259', lineHeight: 1.8 }}>A retreat is a short-term personal experience. TTC is structured long-form education with theory, methodology, practice teaching, sequencing, practicum, and assessment.</p>
          </div>
        </div>
      </section>

      <section style={sectionStyle('#f7f9f7')} aria-labelledby="ttc-faq">
        <div style={{ maxWidth: '58rem', margin: '0 auto' }}>
          <h2 id="ttc-faq" style={{ margin: '0 0 1.25rem', color: '#2B2A26', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}>Common questions</h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      <section style={sectionStyle('#fff')}>
        <div style={{ maxWidth: '58rem', margin: '0 auto', textAlign: 'center' }}>
          <TrackedWhatsAppLink href={WHATSAPP_HREF} sourcePath={PATH} location="Rishikesh" intent="28-day Yoga TTC enquiry" analyticsEvent="yoga_whatsapp_click" product={YOGA_TTC_PRODUCT.name} productId={YOGA_TTC_PRODUCT.id} duration="28 days" ctaPosition="closing" style={{ display: 'inline-flex', padding: '0.95rem 1.5rem', borderRadius: 999, background: '#0f766e', color: '#fff', fontWeight: 700, textDecoration: 'none' }}>
            Ask About Upcoming TTC Batches
          </TrackedWhatsAppLink>
          <nav aria-label="Related Yoga pages" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
            <Link href="/yoga-retreats">Yoga retreats hub</Link>
            <Link href="/retreats/yoga-retreat-rishikesh">Rishikesh Yoga retreats</Link>
            <Link href="/find-your-retreat?type=yoga">Help Me Choose</Link>
          </nav>
        </div>
      </section>
    </TrackedPage>
  );
}
