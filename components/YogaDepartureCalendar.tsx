import Link from 'next/link';
import PrimaryCTA from '@/components/PrimaryCTA';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
import {
  getUpcomingYogaDepartures,
  isYogaDepartureBookable,
  getYogaProductAvailability,
  YOGA_RETREAT_PRODUCTS,
  type YogaDepartureAvailability,
  type YogaRetreatProductId,
} from '@/config/retreatProgramEvents';

interface YogaDepartureCalendarProps {
  sourcePath: string;
  showEnquiry?: boolean;
  productId?: YogaRetreatProductId;
}

const AVAILABILITY_LABELS: Record<YogaDepartureAvailability, string> = {
  available: 'Available',
  limited: 'Limited availability',
  'sold-out': 'Sold out',
  'enquiry-only': 'Open for enquiry',
  'no-published-date': 'No published date',
};

const PRODUCT_ROUTES: Record<YogaRetreatProductId, string> = {
  'yoga-rishikesh-weekend': '/retreats/yoga-retreat-rishikesh?duration=Weekend#yoga-enquiry',
  'yoga-rishikesh-5-day': '/5-day-yoga-retreat',
  'yoga-rishikesh-7-day': '/7-day-yoga-retreat',
  'yoga-rishikesh-10-day': '/10-day-yoga-retreat',
};

function getSixMonthWindow(now: Date) {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const targetMonth = start.getUTCMonth() + 6;
  const targetYear = start.getUTCFullYear() + Math.floor(targetMonth / 12);
  const targetMonthIndex = targetMonth % 12;
  const lastTargetDay = new Date(Date.UTC(targetYear, targetMonthIndex + 1, 0)).getUTCDate();
  const end = new Date(Date.UTC(
    targetYear,
    targetMonthIndex,
    Math.min(start.getUTCDate(), lastTargetDay),
  ));
  end.setUTCDate(end.getUTCDate() - 1);
  return { start, end };
}

export default function YogaDepartureCalendar({
  sourcePath,
  showEnquiry = true,
  productId,
}: YogaDepartureCalendarProps) {
  const now = new Date();
  const { start, end } = getSixMonthWindow(now);
  const startDate = start.toISOString().slice(0, 10);
  const endDate = end.toISOString().slice(0, 10);
  const products = productId
    ? YOGA_RETREAT_PRODUCTS.filter((product) => product.id === productId)
    : YOGA_RETREAT_PRODUCTS;
  const departures = getUpcomingYogaDepartures(productId).filter(
    (departure) => departure.startDate >= startDate && departure.startDate <= endDate,
  );
  const productSchemas = products.map((product) => {
    const offers = departures
      .filter((departure) => departure.productId === product.id)
      .filter(isYogaDepartureBookable)
      .map((departure) => ({
        '@type': 'Offer',
        price: departure.price,
        priceCurrency: departure.currency,
        availability: 'https://schema.org/InStock',
        url: departure.bookingUrl,
      }));

    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': buildCanonicalUrl(`/retreats/yoga-retreat-rishikesh#${product.id}`),
      name: product.name,
      description: `${product.durationLabel} Yoga retreat format in Rishikesh. Dates and commercial details appear only when a departure is published.`,
      brand: { '@id': schemaIds.organization },
      url: buildCanonicalUrl('/retreats/yoga-retreat-rishikesh'),
      ...(offers.length > 0 ? { offers } : {}),
    };
  });

  return (
    <section id="yoga-calendar" aria-labelledby="yoga-calendar-heading" style={{ padding: '3rem 0' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemas) }} />
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <p style={{ margin: '0 0 0.5rem', color: '#6b7280', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
          Next six months
        </p>
        <h2 id="yoga-calendar-heading" style={{ margin: '0 0 0.75rem', fontSize: '1.8rem' }}>
          Rishikesh Yoga departures
        </h2>
        <p style={{ maxWidth: '48rem', margin: '0 0 1.5rem', color: '#4b5563', lineHeight: 1.7 }}>
          Only product-linked departures in the retreat event registry appear here. Dates, prices, and availability are shown only when published.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 13rem), 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {products.map((product) => {
            const productDepartures = departures.filter((departure) => departure.productId === product.id);
            const availability = getYogaProductAvailability(product.id, now, endDate);

            return (
              <div key={product.id} style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: '1rem', minWidth: 0 }}>
                <h3 style={{ margin: '0 0 0.35rem', fontSize: '1rem' }}>
                  <Link href={PRODUCT_ROUTES[product.id]} style={{ color: 'inherit' }}>{product.name}</Link>
                </h3>
                <p style={{ margin: 0, color: '#59636e', fontSize: '0.85rem' }}>{product.durationLabel}</p>
                <p style={{ margin: '0.75rem 0 0', color: '#374151', fontSize: '0.85rem', fontWeight: 600 }}>
                  {AVAILABILITY_LABELS[availability]}
                </p>
              </div>
            );
          })}
        </div>

        {departures.length === 0 ? (
          <div role="status" style={{ borderTop: '1px solid #e5e7eb', padding: '1.25rem 0' }}>
            <p style={{ margin: '0 0 0.35rem', fontWeight: 600 }}>No Rishikesh Yoga dates are published for this six-month window.</p>
            <p style={{ margin: 0, color: '#59636e', lineHeight: 1.65 }}>
              Ask about a preferred duration or date. The team can confirm options and availability without treating an unpublished date as a departure.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {departures.map((departure) => {
              const product = YOGA_RETREAT_PRODUCTS.find((item) => item.id === departure.productId);
              const canBook = isYogaDepartureBookable(departure);
              const canJoinWaitlist = departure.bookingState === 'waitlist-open';

              return (
                <article key={departure.slug} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '0.75rem', alignItems: 'center', borderTop: '1px solid #e5e7eb', padding: '1rem 0' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.35rem', fontSize: '1rem' }}>{product?.name ?? departure.label}</h3>
                    <p style={{ margin: 0, color: '#59636e', fontSize: '0.88rem' }}>
                      {departure.dateRange} · {product?.durationLabel ?? `${departure.durationDays} days`} · {departure.locationName}
                    </p>
                    <p style={{ margin: '0.35rem 0 0', fontSize: '0.88rem', fontWeight: 600 }}>
                      Open for enquiry · ₹{departure.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  {departure.bookingState === 'whatsapp' && departure.bookingUrl ? (
                    <TrackedWhatsAppLink
                      href={`https://wa.me/919760446101?text=${encodeURIComponent(`Hi, I'm interested in the ${product?.name ?? departure.label} from ${departure.startDate} to ${departure.endDate} (${product?.durationLabel ?? `${departure.durationDays} days`}). Please share the details.`)}`}
                      sourcePath={sourcePath}
                      location={departure.locationName}
                      intent="Yoga departure enquiry"
                      analyticsEvent="yoga_whatsapp_click"
                      product={product?.name ?? departure.label}
                      productId={departure.productId}
                      departureId={departure.slug}
                      departureDate={departure.startDate}
                      departureEndDate={departure.endDate}
                      duration={product?.durationLabel ?? `${departure.durationDays} days`}
                      ctaPosition="departure-calendar"
                      trackDepartureSelection
                      style={{ color: '#0f766e', fontWeight: 600 }}
                    >
                      Ask on WhatsApp
                    </TrackedWhatsAppLink>
                  ) : canBook ? (
                    <a href={departure.bookingUrl} rel="nofollow" style={{ color: '#0f766e', fontWeight: 600 }}>
                      Book
                    </a>
                  ) : canJoinWaitlist ? (
                    <Link href={`/${departure.slug}`} style={{ color: '#0f766e', fontWeight: 600 }}>
                      Join waitlist
                    </Link>
                  ) : (
                    <Link href={`/${departure.slug}`} style={{ color: '#0f766e', fontWeight: 600 }}>
                      Ask about date
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        )}

        <p style={{ margin: '1rem 0 0', color: '#6b7280', fontSize: '0.8rem' }}>
          Window: {start.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })} to {end.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}. Unpublished or past dates are not shown as upcoming availability.
        </p>

        {showEnquiry && (
          <div style={{ marginTop: '1.5rem' }}>
            <PrimaryCTA
              label="Plan My Yoga Retreat"
              subtext="Share your preferred dates and duration; the team will confirm what is currently available."
              vertical="retreat"
              category="yoga-retreat-calendar"
              sourcePath={sourcePath}
              location="Rishikesh"
              duration={products.length === 1 ? products[0].durationLabel : undefined}
            />
          </div>
        )}
      </div>
    </section>
  );
}
