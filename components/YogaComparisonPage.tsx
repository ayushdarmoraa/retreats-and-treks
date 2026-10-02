import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import {
  getUpcomingYogaDepartures,
  getYogaRetreatProduct,
  YOGA_RETREAT_CONTENT,
  YOGA_TTC_PRODUCT,
  type YogaRetreatProductId,
} from '@/config/retreatProgramEvents';

export type YogaComparisonKey =
  | 'rishikesh-vs-chakrata'
  | 'five-vs-seven-days'
  | 'retreat-vs-ttc'
  | 'five-vs-ten-days'
  | 'seven-vs-ten-days'
  | 'rishikesh-vs-sankri'
  | 'rishikesh-vs-zanskar';

type ComparisonSide = {
  title: string;
  summary: string;
  productId?: YogaRetreatProductId;
  customLocation?: 'Chakrata' | 'Sankri' | 'Zanskar';
  ttc?: boolean;
  href: string;
  location: string;
  availability: string;
  audience: string;
  programme: string;
  accommodation: string;
  meals: string;
  booking: string;
};

type Comparison = {
  path: string;
  title: string;
  description: string;
  first: ComparisonSide;
  second: ComparisonSide;
  decision: string;
  faqs: { question: string; answer: string }[];
};

const PRODUCT_FOCUS: Record<YogaRetreatProductId, { audience: string; programme: string }> = {
  'yoga-rishikesh-weekend': {
    audience: 'People with limited time who want a short, accessible Yoga reset.',
    programme: 'Introductory practice, accessible Yoga, relaxation, and a short immersive rhythm.',
  },
  'yoga-rishikesh-5-day': {
    audience: 'Beginners and first-time retreat participants wanting a primary introduction.',
    programme: 'Foundational Yoga, pranayama, meditation, consistent practice, and deeper relaxation.',
  },
  'yoga-rishikesh-7-day': {
    audience: 'Practitioners with time for deeper immersion and greater consistency.',
    programme: 'Deeper practice, workshops, meditation, consistency, and mindful lifestyle practices.',
  },
  'yoga-rishikesh-10-day': {
    audience: 'People able to commit to an extended period of practice and reflection.',
    programme: 'Extended immersion, deeper practice, reflective time, sustained routine, and exploration.',
  },
};

const WHATSAPP_NUMBER = '919760446101';

function productSide(productId: YogaRetreatProductId): ComparisonSide {
  const product = getYogaRetreatProduct(productId);
  const focus = PRODUCT_FOCUS[productId];
  if (!product) throw new Error(`Unknown Yoga product ${productId}`);
  return {
    title: product.name,
    summary: product.positioning,
    productId,
    href: productId === 'yoga-rishikesh-weekend'
      ? '/retreats/yoga-retreat-rishikesh?duration=Weekend#yoga-enquiry'
      : `/${productId.replace('yoga-rishikesh-', '')}-yoga-retreat`,
    location: 'Rishikesh, Uttarakhand, India',
    availability: 'Recurring published departures; dates and prices come from the shared registry.',
    audience: focus.audience,
    programme: focus.programme,
    accommodation: 'Standard pricing represents shared accommodation. Private room is available on request; pricing is confirmed manually through WhatsApp.',
    meals: 'Vegetarian/Sattvic-style breakfast, lunch, dinner, and drinking water.',
    booking: 'Open for enquiry through WhatsApp; no seat scarcity is shown.',
  };
}

function customSide(location: 'Chakrata' | 'Sankri' | 'Zanskar'): ComparisonSide {
  const href = location === 'Chakrata'
    ? '/retreats/chakrata/yoga-retreat'
    : location === 'Sankri'
      ? '/retreats/sankri/yoga-retreat'
      : '/yoga-retreat-zanskar';
  return {
    title: `Custom Yoga Retreats in ${location}`,
    summary: `${location} is a custom/group Yoga opportunity rather than a recurring fixed-departure product.`,
    customLocation: location,
    href,
    location,
    availability: 'Demand-led; no recurring fixed calendar, date, price, or availability is published.',
    audience: 'Groups or practitioners willing to discuss preferred timing, group size, experience, and feasibility.',
    programme: 'A proposed Yoga programme is discussed after the enquiry; no fixed schedule is assumed.',
    accommodation: 'Exact accommodation and venue details are confirmed through the enquiry process.',
    meals: 'Meals and inclusions are confirmed for the proposed programme.',
    booking: 'WhatsApp enquiry for preferred dates, group size, interest, and experience.',
  };
}

const ttcSide: ComparisonSide = {
  title: YOGA_TTC_PRODUCT.name,
  summary: 'A separate structured long-form education and teacher-preparation pathway, not another retreat duration.',
  ttc: true,
  href: '/yoga-teacher-training',
  location: 'Rishikesh',
  availability: 'Upcoming batches are enquiry-only; no batch date is published.',
  audience: 'People wanting structured Yoga study, theory, teaching methodology, practical teaching experience, and a teacher-training pathway.',
  programme: 'Yoga practice, philosophy, anatomy/fundamentals, pranayama, meditation, methodology, sequencing, practicum, assessment, and certificate of completion.',
  accommodation: 'Shared accommodation; exact venue and operational details are confirmed through enquiry.',
  meals: 'Standard retreat-style meals.',
  booking: 'Ask on WhatsApp for upcoming batch details.',
};

const COMPARISONS: Record<YogaComparisonKey, Comparison> = {
  'rishikesh-vs-chakrata': {
    path: '/compare/chakrata-yoga-retreat-vs-rishikesh-yoga-retreat',
    title: 'Rishikesh vs Chakrata Yoga Retreat',
    description: 'Compare recurring Rishikesh Yoga products with custom, demand-led Chakrata enquiries.',
    first: productSide('yoga-rishikesh-5-day'),
    second: customSide('Chakrata'),
    decision: 'Choose Rishikesh when you want recurring published products, prices, and dates. Choose Chakrata when you prefer a custom/group request and can discuss demand, timing, and logistics.',
    faqs: [
      { question: 'Does Chakrata have a fixed Yoga departure?', answer: 'No. Chakrata is a custom/group Yoga enquiry and has no recurring published departure calendar.' },
      { question: 'What is published for Rishikesh?', answer: 'Rishikesh has recurring Weekend, 5-day, 7-day, and 10-day products with prices and actual upcoming departures in the shared registry.' },
    ],
  },
  'five-vs-seven-days': {
    path: '/compare/5-day-yoga-retreat-vs-7-day-yoga-retreat',
    title: '5-Day vs 7-Day Yoga Retreat',
    description: 'Compare two Rishikesh Yoga formats using the authoritative product and departure registry.',
    first: productSide('yoga-rishikesh-5-day'),
    second: productSide('yoga-rishikesh-7-day'),
    decision: 'The 5-day format suits a primary introduction; the 7-day format gives more time for consistency and deeper immersion. Neither is a ranking; choose by available time and the practice depth you want to discuss.',
    faqs: [
      { question: 'What is the 5-day price?', answer: 'The authoritative product price is ₹12,999 for 5 Days / 4 Nights.' },
      { question: 'What is the 7-day price?', answer: 'The authoritative product price is ₹17,999 for 7 Days / 6 Nights.' },
    ],
  },
  'retreat-vs-ttc': {
    path: '/compare/yoga-retreat-vs-yoga-teacher-training',
    title: 'Yoga Retreat vs Yoga Teacher Training',
    description: 'Understand the difference between short-term personal practice and the separate 28-day TTC pathway.',
    first: productSide('yoga-rishikesh-5-day'),
    second: ttcSide,
    decision: 'Choose a Yoga retreat for a short-term personal-practice experience. Choose TTC when you want structured long-form education and teacher preparation. The TTC is not a retreat duration.',
    faqs: [
      { question: 'Does a Yoga retreat provide teacher certification?', answer: 'No. Yoga retreats are personal-practice experiences. TTC is a separate study and teacher-preparation pathway.' },
      { question: 'What are the TTC duration and fee?', answer: 'The TTC is 28 days in Rishikesh with a ₹49,999 fee. Batch dates are enquiry-only.' },
    ],
  },
  'five-vs-ten-days': {
    path: '/compare/5-day-yoga-retreat-vs-10-day-yoga-retreat',
    title: '5-Day vs 10-Day Yoga Retreat',
    description: 'Compare the introductory 5-day Rishikesh format with the extended 10-day immersion.',
    first: productSide('yoga-rishikesh-5-day'),
    second: productSide('yoga-rishikesh-10-day'),
    decision: 'The 5-day option is a manageable introduction to foundational practice. The 10-day option is for people who can protect more time for sustained routine, reflection, and exploration.',
    faqs: [
      { question: 'What is included in both formats?', answer: 'Both use shared accommodation pricing and include vegetarian/Sattvic-style meals, drinking water, and guided Yoga practice. Exact venue details are confirmed through WhatsApp.' },
      { question: 'Are outcomes guaranteed?', answer: 'No. These are practice formats, not promises of healing, transformation, or a guaranteed result.' },
    ],
  },
  'seven-vs-ten-days': {
    path: '/compare/7-day-yoga-retreat-vs-10-day-yoga-retreat',
    title: '7-Day vs 10-Day Yoga Retreat',
    description: 'Compare deeper seven-day immersion with extended ten-day Rishikesh practice.',
    first: productSide('yoga-rishikesh-7-day'),
    second: productSide('yoga-rishikesh-10-day'),
    decision: 'Seven days provides deeper practice, workshops, and mindful lifestyle rhythm. Ten days adds more time for sustained routine, reflection, and exploration.',
    faqs: [
      { question: 'What is the 7-day price?', answer: 'The authoritative price is ₹17,999 for 7 Days / 6 Nights.' },
      { question: 'What is the 10-day price?', answer: 'The authoritative price is ₹24,999 for 10 Days / 9 Nights.' },
    ],
  },
  'rishikesh-vs-sankri': {
    path: '/compare/rishikesh-yoga-retreat-vs-sankri-yoga-retreat',
    title: 'Rishikesh vs Sankri Yoga Retreat',
    description: 'Compare recurring Rishikesh Yoga departures with custom, demand-led Sankri enquiries.',
    first: productSide('yoga-rishikesh-5-day'),
    second: customSide('Sankri'),
    decision: 'Rishikesh is the regular published alternative with four products and actual dates. Sankri is for custom/group demand where preferred dates and logistics are discussed before a programme is proposed.',
    faqs: [
      { question: 'Does Sankri have recurring Yoga departures?', answer: 'No. Sankri is custom and demand-led; no recurring fixed departure calendar is published.' },
      { question: 'Can a group ask about Sankri?', answer: 'Yes. Share preferred dates, group size, Yoga interest, and experience through WhatsApp.' },
    ],
  },
  'rishikesh-vs-zanskar': {
    path: '/compare/rishikesh-yoga-retreat-vs-zanskar-yoga-retreat',
    title: 'Rishikesh vs Zanskar Yoga Retreat',
    description: 'Compare recurring Rishikesh Yoga inventory with custom, demand-led Zanskar enquiries.',
    first: productSide('yoga-rishikesh-5-day'),
    second: customSide('Zanskar'),
    decision: 'Choose Rishikesh for regular published products, prices, and dates. Choose Zanskar when you want to discuss a custom request with preferred dates, group size, interest, and experience.',
    faqs: [
      { question: 'Does Zanskar have a fixed Yoga calendar?', answer: 'No. Zanskar is a custom enquiry and has no recurring fixed Yoga calendar.' },
      { question: 'What information should I share for Zanskar?', answer: 'Share preferred dates, group size, Yoga interest, and experience so the team can discuss feasibility.' },
    ],
  },
};

function whatsappHref(side: ComparisonSide) {
  const message = side.ttc
    ? 'Hi, I\'m interested in the 28-Day Yoga Teacher Training in Rishikesh. Please share the upcoming batch details.'
    : side.customLocation
      ? `Hi, I'm interested in a Yoga Retreat in ${side.customLocation}. I'd like to know about custom/upcoming options.`
      : `Hi, I'm interested in the ${side.title}. Please share the upcoming dates and details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function SideCard({ side, comparisonPath }: { side: ComparisonSide; comparisonPath: string }) {
  const product = side.productId ? getYogaRetreatProduct(side.productId) : undefined;
  const departures = side.productId ? getUpcomingYogaDepartures(side.productId).slice(0, 3) : [];
  return (
    <article style={{ border: '1px solid rgba(15,118,110,0.14)', borderRadius: 10, padding: '1.25rem', background: '#fff' }}>
      <h2 style={{ margin: '0 0 0.5rem', color: '#2B2A26', fontSize: '1.25rem' }}>{side.title}</h2>
      {product && <p style={{ margin: '0 0 0.7rem', color: '#0f766e', fontWeight: 700 }}>{product.durationLabel} · ₹{product.price.toLocaleString('en-IN')}</p>}
      {side.ttc && <p style={{ margin: '0 0 0.7rem', color: '#0f766e', fontWeight: 700 }}>28 days · ₹{YOGA_TTC_PRODUCT.fee?.amount.toLocaleString('en-IN')}</p>}
      <p style={{ margin: '0 0 1rem', color: '#4b5259', lineHeight: 1.7 }}>{side.summary}</p>
      <dl style={{ display: 'grid', gridTemplateColumns: 'minmax(7rem, 0.7fr) 1fr', gap: '0.55rem 0.75rem', margin: 0, color: '#4b5259', fontSize: '0.88rem', lineHeight: 1.55 }}>
        <dt style={{ fontWeight: 700, color: '#2B2A26' }}>Location</dt><dd style={{ margin: 0 }}>{side.location}</dd>
        <dt style={{ fontWeight: 700, color: '#2B2A26' }}>Availability</dt><dd style={{ margin: 0 }}>{side.availability}</dd>
        <dt style={{ fontWeight: 700, color: '#2B2A26' }}>Audience</dt><dd style={{ margin: 0 }}>{side.audience}</dd>
        <dt style={{ fontWeight: 700, color: '#2B2A26' }}>Programme</dt><dd style={{ margin: 0 }}>{side.programme}</dd>
        <dt style={{ fontWeight: 700, color: '#2B2A26' }}>Accommodation</dt><dd style={{ margin: 0 }}>{side.accommodation}</dd>
        <dt style={{ fontWeight: 700, color: '#2B2A26' }}>Meals</dt><dd style={{ margin: 0 }}>{side.meals}</dd>
        <dt style={{ fontWeight: 700, color: '#2B2A26' }}>Enquiry</dt><dd style={{ margin: 0 }}>{side.booking}</dd>
      </dl>
      {departures.length > 0 && (
        <div style={{ marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(15,118,110,0.1)' }}>
          <strong style={{ fontSize: '0.85rem' }}>Upcoming dates</strong>
          {departures.map((departure) => <p key={departure.slug} style={{ margin: '0.35rem 0 0', color: '#4b5259', fontSize: '0.84rem' }}>{departure.dateRange} · Open for enquiry</p>)}
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
        <Link href={side.href} style={{ color: '#0f766e', fontWeight: 700 }}>View option</Link>
        <TrackedWhatsAppLink
          href={whatsappHref(side)}
          sourcePath={comparisonPath}
          location={side.location}
          intent={`${side.title} comparison enquiry`}
          analyticsEvent="yoga_whatsapp_click"
          product={side.title}
          productId={side.productId ?? (side.ttc ? 'yoga-ttc' : undefined)}
          duration={product?.durationLabel ?? (side.ttc ? '28 days' : undefined)}
          ctaPosition="comparison-card"
          style={{ color: '#0f766e', fontWeight: 700 }}
        >Ask on WhatsApp</TrackedWhatsAppLink>
      </div>
    </article>
  );
}

export default function YogaComparisonPage({ comparisonKey }: { comparisonKey: YogaComparisonKey }) {
  const comparison = COMPARISONS[comparisonKey];
  const canonicalUrl = buildCanonicalUrl(comparison.path);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Yoga Retreats', url: buildCanonicalUrl('/yoga-retreats') },
    { name: comparison.title, url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(comparison.faqs);

  return (
    <TrackedPage page={comparison.path} style={{ maxWidth: '100%', margin: 0, padding: 0, overflowX: 'hidden' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <main style={{ maxWidth: '72rem', margin: '0 auto', padding: '1rem 1.25rem 4rem' }}>
        <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Yoga Retreats', href: '/yoga-retreats' }, { name: comparison.title }]} />
        <header style={{ padding: '3rem 0 2rem' }}>
          <p style={{ margin: '0 0 0.5rem', color: '#0f766e', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Yoga comparison</p>
          <h1 style={{ margin: '0 0 0.75rem', color: '#2B2A26', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1 }}>{comparison.title}</h1>
          <p style={{ maxWidth: '52rem', margin: 0, color: '#4b5259', lineHeight: 1.8 }}>{comparison.description}</p>
        </header>

        <section aria-label="Quick comparison" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))', gap: '1rem' }}>
          <SideCard side={comparison.first} comparisonPath={comparison.path} />
          <SideCard side={comparison.second} comparisonPath={comparison.path} />
        </section>

        <section style={{ marginTop: '2rem', padding: '1.5rem', borderLeft: '3px solid #0f766e', background: '#f7f9f7' }}>
          <h2 style={{ margin: '0 0 0.5rem', color: '#2B2A26', fontSize: '1.2rem' }}>How to choose</h2>
          <p style={{ margin: 0, color: '#4b5259', lineHeight: 1.8 }}>{comparison.decision}</p>
        </section>

        <section style={{ marginTop: '2.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', color: '#2B2A26', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '2rem' }}>Shared Yoga details</h2>
          <p style={{ color: '#4b5259', lineHeight: 1.8 }}>{YOGA_RETREAT_CONTENT.location.name}, {YOGA_RETREAT_CONTENT.location.region}, {YOGA_RETREAT_CONTENT.location.country} is the recurring published location for the Rishikesh products. Standard retreat pricing uses shared accommodation; vegetarian/Sattvic-style meals include breakfast, lunch, dinner, and drinking water. Exact venue details are confirmed through enquiry.</p>
        </section>

        <section style={{ marginTop: '2.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', color: '#2B2A26', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '2rem' }}>Common questions</h2>
          <TrackedFAQ items={comparison.faqs} page={comparison.path} />
        </section>

        <section style={{ marginTop: '2.5rem', padding: '1.5rem', textAlign: 'center', background: '#0b241f', color: '#fff', borderRadius: 8 }}>
          <p style={{ margin: '0 0 1rem', lineHeight: 1.7 }}>Want help choosing a Yoga format or discussing a custom location?</p>
          <TrackedWhatsAppLink href="https://wa.me/919760446101?text=Hi%2C%20I%27d%20like%20help%20choosing%20a%20Yoga%20retreat%20option." sourcePath={comparison.path} intent="Yoga comparison enquiry" analyticsEvent="yoga_whatsapp_click" ctaPosition="comparison-footer" style={{ display: 'inline-flex', padding: '0.85rem 1.2rem', borderRadius: 999, background: '#fff', color: '#0f766e', fontWeight: 700, textDecoration: 'none' }}>Ask on WhatsApp</TrackedWhatsAppLink>
        </section>

        <nav aria-label="Related Yoga options" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
          <Link href="/yoga-retreats">Yoga retreats hub</Link>
          <Link href="/retreats/yoga-retreat-rishikesh">Rishikesh Yoga retreats</Link>
          <Link href="/find-your-retreat?type=yoga">Help Me Choose</Link>
          <Link href="/yoga-teacher-training">Yoga Teacher Training</Link>
        </nav>
      </main>
    </TrackedPage>
  );
}
