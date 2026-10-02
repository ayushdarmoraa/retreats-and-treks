import Link from 'next/link';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';
import {
  getUpcomingYogaDepartures,
  YOGA_RETREAT_CONTENT,
  YOGA_RETREAT_PRODUCTS,
  type YogaRetreatProductId,
} from '@/config/retreatProgramEvents';

const WHATSAPP_NUMBER = '919760446101';

const PRODUCT_ROUTES: Record<YogaRetreatProductId, string> = {
  'yoga-rishikesh-weekend': '/retreats/yoga-retreat-rishikesh?duration=Weekend#yoga-enquiry',
  'yoga-rishikesh-5-day': '/5-day-yoga-retreat',
  'yoga-rishikesh-7-day': '/7-day-yoga-retreat',
  'yoga-rishikesh-10-day': '/10-day-yoga-retreat',
};

const PRODUCT_FOCUS: Record<YogaRetreatProductId, string> = {
  'yoga-rishikesh-weekend': 'A short Yoga reset with introductory practice, relaxation, and an accessible immersive experience.',
  'yoga-rishikesh-5-day': 'The primary introductory retreat for building a consistent practice through foundational Yoga, pranayama, meditation, and deeper relaxation.',
  'yoga-rishikesh-7-day': 'A deeper immersion with more time for consistency, workshops, meditation, and mindful lifestyle practices.',
  'yoga-rishikesh-10-day': 'An extended immersion with sustained routine, deeper practice, reflective time, and greater opportunity for exploration.',
};

interface YogaCommercialSectionsProps {
  sourcePath: string;
  productId?: YogaRetreatProductId;
  showProductCards?: boolean;
}

function whatsappHref(productName: string) {
  const message = `Hi, I'm interested in the ${productName}. Please share the upcoming dates and details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function sectionStyle(background: string): React.CSSProperties {
  return {
    width: '100%',
    background,
    padding: '4rem 1.25rem',
    borderBottom: '1px solid rgba(15,118,110,0.08)',
    boxSizing: 'border-box',
  };
}

function innerStyle(): React.CSSProperties {
  return { maxWidth: '72rem', margin: '0 auto' };
}

function headingStyle(): React.CSSProperties {
  return {
    margin: '0 0 0.75rem',
    color: '#2B2A26',
    fontFamily: 'var(--font-fraunces), Georgia, serif',
    fontSize: 'clamp(1.65rem, 3vw, 2.35rem)',
    lineHeight: 1.15,
  };
}

function bodyStyle(): React.CSSProperties {
  return { margin: 0, color: '#4b5259', lineHeight: 1.8, fontSize: '0.96rem' };
}

export default function YogaCommercialSections({
  sourcePath,
  productId,
  showProductCards = true,
}: YogaCommercialSectionsProps) {
  const products = productId
    ? YOGA_RETREAT_PRODUCTS.filter((product) => product.id === productId)
    : YOGA_RETREAT_PRODUCTS;
  const displayedProducts = showProductCards ? products : [];
  const durationLinks = YOGA_RETREAT_PRODUCTS.filter((product) => product.id !== productId);

  return (
    <>
      {showProductCards && (
        <section style={sectionStyle('#ffffff')} aria-labelledby="yoga-products-heading">
          <div style={innerStyle()}>
            <p style={{ margin: '0 0 0.5rem', color: '#0f766e', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              Rishikesh product options
            </p>
            <h2 id="yoga-products-heading" style={headingStyle()}>Choose the time you can give to practice</h2>
            <p style={{ ...bodyStyle(), maxWidth: '48rem', marginBottom: '1.5rem' }}>
              Rishikesh is the only location with recurring published Yoga departures in this product family. Every listed date is open for enquiry; confirm exact venue and accommodation details through WhatsApp.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))', gap: '1rem' }}>
              {displayedProducts.map((product) => {
                const departures = getUpcomingYogaDepartures(product.id).slice(0, 3);
                return (
                  <article key={product.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', border: '1px solid rgba(15,118,110,0.16)', borderRadius: 10, padding: '1.25rem', minWidth: 0 }}>
                    <div>
                      <h3 style={{ margin: 0, color: '#2B2A26', fontSize: '1.15rem', lineHeight: 1.3 }}>{product.name}</h3>
                      <p style={{ margin: '0.45rem 0 0', color: '#0f766e', fontWeight: 700 }}>{product.durationLabel}</p>
                    </div>
                    <p style={{ margin: 0, color: '#2B2A26', fontSize: '1.35rem', fontWeight: 700 }}>₹{product.price.toLocaleString('en-IN')}</p>
                    <p style={bodyStyle()}>{product.positioning} {PRODUCT_FOCUS[product.id]}</p>
                    <div style={{ borderTop: '1px solid rgba(15,118,110,0.1)', paddingTop: '0.8rem' }}>
                      <p style={{ margin: '0 0 0.45rem', fontWeight: 700, fontSize: '0.85rem' }}>Upcoming dates</p>
                      {departures.length > 0 ? departures.map((departure) => (
                        <p key={departure.slug} style={{ margin: '0.3rem 0', color: '#4b5259', fontSize: '0.84rem' }}>
                          {departure.dateRange} · Open for enquiry
                        </p>
                      )) : (
                        <p style={{ ...bodyStyle(), fontSize: '0.84rem' }}>Ask on WhatsApp for current dates.</p>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: 'auto' }}>
                      <Link href={PRODUCT_ROUTES[product.id]} style={{ color: '#0f766e', fontWeight: 700, fontSize: '0.85rem' }}>View format</Link>
                      <TrackedWhatsAppLink
                        href={whatsappHref(product.name)}
                        sourcePath={sourcePath}
                        location="Rishikesh"
                        intent={`${product.name} enquiry`}
                        analyticsEvent="yoga_whatsapp_click"
                        product={product.name}
                        productId={product.id}
                        duration={product.durationLabel}
                        ctaPosition="product-card"
                        style={{ color: '#0f766e', fontWeight: 700, fontSize: '0.85rem' }}
                      >
                        Ask on WhatsApp
                      </TrackedWhatsAppLink>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section style={sectionStyle('#f7f9f7')} aria-labelledby="yoga-stay-heading">
        <div style={innerStyle()}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))', gap: '2rem' }}>
            <div>
              <p style={{ margin: '0 0 0.5rem', color: '#0f766e', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Stay and meals</p>
              <h2 id="yoga-stay-heading" style={headingStyle()}>A clear, enquiry-based stay model</h2>
              <p style={{ ...bodyStyle(), marginBottom: '0.8rem' }}>
                Standard pricing represents shared accommodation. A private room is available on request, but it is not a separate public product and its price is not published. Exact private-room availability and pricing are confirmed manually through WhatsApp.
              </p>
              <p style={bodyStyle()}>
                The location is Rishikesh, Uttarakhand, India. No venue, hotel, or ashram is named in the public product because exact venue and accommodation details are confirmed through the WhatsApp enquiry process.
              </p>
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.75rem', color: '#2B2A26', fontSize: '1.15rem' }}>Standard package meals</h3>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#4b5259', lineHeight: 1.9 }}>
                {YOGA_RETREAT_CONTENT.meals.map((meal) => <li key={meal}>{meal}</li>)}
              </ul>
              <p style={{ ...bodyStyle(), marginTop: '1rem' }}>Meals are vegetarian/Sattvic-style and include breakfast, lunch, dinner, and drinking water.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={sectionStyle('#ffffff')} aria-labelledby="yoga-practice-heading">
        <div style={innerStyle()}>
          <p style={{ margin: '0 0 0.5rem', color: '#0f766e', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Programme</p>
          <h2 id="yoga-practice-heading" style={headingStyle()}>Guided practice for beginners and experienced practitioners</h2>
          <p style={{ ...bodyStyle(), maxWidth: '50rem', marginBottom: '1.25rem' }}>
            The programme is built around personal practice rather than certification or medical treatment. Beginners are welcome, and experienced practitioners may also participate. Exact sessions can vary by retreat.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))', gap: '0.7rem' }}>
            {YOGA_RETREAT_CONTENT.practiceModel.map((practice) => (
              <div key={practice} style={{ borderLeft: '3px solid #0f766e', padding: '0.75rem 1rem', background: '#f7f9f7', color: '#2B2A26', fontWeight: 600 }}>{practice}</div>
            ))}
          </div>
        </div>
      </section>

      <section style={sectionStyle('#f7f9f7')} aria-labelledby="yoga-day-heading">
        <div style={innerStyle()}>
          <p style={{ margin: '0 0 0.5rem', color: '#0f766e', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Representative rhythm</p>
          <h2 id="yoga-day-heading" style={headingStyle()}>A day follows a flexible practice rhythm</h2>
          <p style={{ ...bodyStyle(), maxWidth: '50rem', marginBottom: '1.25rem' }}>This is a representative structure, not a rigid timetable. The exact daily programme can vary by retreat.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 15rem), 1fr))', gap: '1rem' }}>
            {[
              ['Morning', 'Yoga practice, pranayama, and meditation.'],
              ['Daytime', 'Breakfast, workshop or practice, free/rest time, lunch, and optional exploration.'],
              ['Evening', 'Gentle Yoga, meditation or relaxation, dinner, and reflection/free time.'],
            ].map(([label, text]) => (
              <div key={label} style={{ padding: '1.2rem', border: '1px solid rgba(15,118,110,0.14)', borderRadius: 8, background: '#fff' }}>
                <h3 style={{ margin: '0 0 0.45rem', color: '#2B2A26', fontSize: '1.05rem' }}>{label}</h3>
                <p style={bodyStyle()}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={sectionStyle('#ffffff')} aria-labelledby="yoga-included-heading">
        <div style={innerStyle()}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))', gap: '2rem' }}>
            <div>
              <h2 id="yoga-included-heading" style={headingStyle()}>What is included</h2>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#4b5259', lineHeight: 1.9 }}>
                <li>Shared accommodation</li>
                <li>Vegetarian/Sattvic-style meals: breakfast, lunch, and dinner</li>
                <li>Drinking water</li>
                <li>Guided Yoga and practice programme</li>
              </ul>
            </div>
            <div>
              <h2 style={headingStyle()}>What is not published as included</h2>
              <p style={bodyStyle()}>Flights, train tickets, transportation, excursions, medical services, insurance, equipment, and other operational details are not included in this public summary. Confirm any specific requirement through WhatsApp before booking.</p>
            </div>
          </div>
        </div>
      </section>

      {productId && (
        <section style={sectionStyle('#f7f9f7')} aria-labelledby="related-yoga-heading">
          <div style={innerStyle()}>
            <h2 id="related-yoga-heading" style={headingStyle()}>Related Rishikesh Yoga options</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
              <Link href="/retreats/yoga-retreat-rishikesh" style={{ color: '#0f766e', fontWeight: 700 }}>All Rishikesh products</Link>
              {durationLinks.map((product) => <Link key={product.id} href={PRODUCT_ROUTES[product.id]} style={{ color: '#0f766e', fontWeight: 700 }}>{product.durationLabel}</Link>)}
              <Link href="/yoga-retreats" style={{ color: '#0f766e', fontWeight: 700 }}>Yoga retreats hub</Link>
              <Link href="/retreats/yoga-retreat-rishikesh#yoga-calendar" style={{ color: '#0f766e', fontWeight: 700 }}>Upcoming calendar</Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
