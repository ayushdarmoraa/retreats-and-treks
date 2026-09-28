import type { Metadata } from 'next';
import Link from 'next/link';
import PrimaryCTA from '@/components/PrimaryCTA';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { getUpcomingEventsByProduct, YOGA_TTC_PRODUCT } from '@/config/retreatProgramEvents';
import { schemaIds } from '@/lib/schemaIds';

const PATH = '/yoga-teacher-training';

const FAQ_ITEMS = YOGA_TTC_PRODUCT.faqItems?.length
  ? [...YOGA_TTC_PRODUCT.faqItems]
  : [
      {
        question: 'Is Yoga Teacher Training the same as a Yoga retreat?',
        answer: 'No. A Yoga retreat is for personal practice; Teacher Training is a separate study pathway. See the current product fields below for the published information state.',
      },
      {
        question: 'How long is the course and where is it held?',
        answer: `Duration: ${YOGA_TTC_PRODUCT.durationDays ? `${YOGA_TTC_PRODUCT.durationDays} days` : 'not published'}. Location: ${YOGA_TTC_PRODUCT.locations?.join(', ') || 'not published'}. Ask the team for verified details before making travel plans.`,
      },
      {
        question: 'What are the dates, fees, and curriculum?',
        answer: `Dates: ${YOGA_TTC_PRODUCT.publicationState === 'published' ? 'see published dates below' : 'not published'}. Fee: ${YOGA_TTC_PRODUCT.fee ? `${YOGA_TTC_PRODUCT.fee.currency} ${YOGA_TTC_PRODUCT.fee.amount.toLocaleString('en-IN')}` : 'not published'}. Curriculum: ${YOGA_TTC_PRODUCT.curriculum?.join('; ') || 'not published'}.`,
      },
      {
        question: 'Does the course include accommodation, meals, or certification?',
        answer: `Accommodation: ${YOGA_TTC_PRODUCT.accommodation || 'not published'}. Meals: ${YOGA_TTC_PRODUCT.meals || 'not published'}. Certification: ${YOGA_TTC_PRODUCT.certification ? `${YOGA_TTC_PRODUCT.certification.credential} from ${YOGA_TTC_PRODUCT.certification.issuer}` : 'not published'}.`,
      },
    ];

export const metadata: Metadata = {
  title: 'Yoga Teacher Training Course | Retreats And Treks',
  description: 'Request verified Yoga Teacher Training Course details. Course dates, fees, curriculum, eligibility, location, accommodation, and certification are not currently published.',
  alternates: { canonical: buildCanonicalUrl(PATH) },
  robots: { index: YOGA_TTC_PRODUCT.publicationState === 'published', follow: true },
};

export default function YogaTeacherTrainingPage() {
  const canonicalUrl = buildCanonicalUrl(PATH);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Yoga Retreats', url: buildCanonicalUrl('/yoga-retreats') },
    { name: 'Yoga Teacher Training', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const detailsPublished = YOGA_TTC_PRODUCT.publicationState === 'published';
  const departures = detailsPublished ? getUpcomingEventsByProduct(YOGA_TTC_PRODUCT.id) : [];
  const productSchema = detailsPublished ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${canonicalUrl}#yoga-ttc`,
    name: YOGA_TTC_PRODUCT.name,
    ...(YOGA_TTC_PRODUCT.curriculum?.length ? { description: YOGA_TTC_PRODUCT.curriculum.join('. ') } : {}),
    brand: { '@id': schemaIds.organization },
    url: canonicalUrl,
    ...(departures.some((event) => event.bookingState === 'booking-open' && event.bookingUrl)
      ? {
          offers: departures
            .filter((event) => event.bookingState === 'booking-open' && event.bookingUrl && event.status !== 'sold-out')
            .map((event) => ({
              '@type': 'Offer',
              price: event.price,
              priceCurrency: event.currency,
              availability: 'https://schema.org/InStock',
              url: event.bookingUrl,
            })),
        }
      : {}),
  } : null;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, ...(productSchema ? [productSchema] : [])]) }}
      />
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '1rem 1.5rem' }}>
        <Breadcrumb items={[
          { name: 'Home', href: '/' },
          { name: 'Yoga Retreats', href: '/yoga-retreats' },
          { name: 'Yoga Teacher Training' },
        ]} />
      </div>

      <main style={{ maxWidth: '58rem', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        <p style={{ margin: '0 0 0.65rem', color: '#6b7280', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
          Separate from personal-practice retreats
        </p>
        <h1 style={{ margin: '0 0 1rem', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1 }}>
          Yoga Teacher Training Course
        </h1>
        <p style={{ maxWidth: '48rem', color: '#4b5563', lineHeight: 1.75 }}>
          Teacher Training is a distinct study pathway, not a Yoga retreat. We only present course dates, fees, curriculum, eligibility, location, accommodation, meals, facilitator, and certification when those details are confirmed for a published course.
        </p>

        <section aria-labelledby="ttc-publication" style={{ margin: '2rem 0', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', padding: '1.5rem 0' }}>
          <h2 id="ttc-publication" style={{ margin: '0 0 0.75rem', fontSize: '1.2rem' }}>
            {detailsPublished ? 'Published course information' : 'Course details are not currently published'}
          </h2>
          {!detailsPublished && (
            <>
              <p role="status" style={{ margin: '0 0 0.75rem', color: '#4b5563', lineHeight: 1.7 }}>
                No current course dates, fee, location, duration, curriculum, eligibility, accommodation, meals, facilitator assignment, or certification information is available to display.
              </p>
              <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.7 }}>
                Send an enquiry and the team can provide verified details if a course is currently being offered. An enquiry does not reserve a place.
              </p>
            </>
          )}
          {detailsPublished && (
            <div style={{ display: 'grid', gap: '0.65rem', color: '#4b5563', lineHeight: 1.7 }}>
              {YOGA_TTC_PRODUCT.durationDays && <p style={{ margin: 0 }}><strong>Duration:</strong> {YOGA_TTC_PRODUCT.durationDays} days</p>}
              {YOGA_TTC_PRODUCT.locations?.length && <p style={{ margin: 0 }}><strong>Location:</strong> {YOGA_TTC_PRODUCT.locations.join(', ')}</p>}
              {YOGA_TTC_PRODUCT.fee && <p style={{ margin: 0 }}><strong>Fee:</strong> {YOGA_TTC_PRODUCT.fee.currency} {YOGA_TTC_PRODUCT.fee.amount.toLocaleString('en-IN')}</p>}
              {YOGA_TTC_PRODUCT.eligibility && <p style={{ margin: 0 }}><strong>Eligibility:</strong> {YOGA_TTC_PRODUCT.eligibility}</p>}
              {YOGA_TTC_PRODUCT.accommodation && <p style={{ margin: 0 }}><strong>Accommodation:</strong> {YOGA_TTC_PRODUCT.accommodation}</p>}
              {YOGA_TTC_PRODUCT.meals && <p style={{ margin: 0 }}><strong>Meals:</strong> {YOGA_TTC_PRODUCT.meals}</p>}
              {YOGA_TTC_PRODUCT.facilitator && <p style={{ margin: 0 }}><strong>Facilitator:</strong> {YOGA_TTC_PRODUCT.facilitator}</p>}
              {YOGA_TTC_PRODUCT.certification && <p style={{ margin: 0 }}><strong>Certification:</strong> {YOGA_TTC_PRODUCT.certification.credential} · {YOGA_TTC_PRODUCT.certification.issuer}</p>}
              {YOGA_TTC_PRODUCT.curriculum?.length ? (
                <div><strong>Curriculum:</strong><ul>{YOGA_TTC_PRODUCT.curriculum.map((item) => <li key={item}>{item}</li>)}</ul></div>
              ) : <p style={{ margin: 0 }}>Curriculum details are not published.</p>}
              {departures.length > 0 ? departures.map((event) => (
                <p key={event.slug} style={{ margin: 0 }}>
                  <Link href={`/${event.slug}`}>{event.dateRange} · {event.durationDays} days · {event.locationName}</Link>
                  {' '}· {event.status === 'sold-out' ? 'Sold out' : event.status === 'filling-fast' || event.status === 'last-few' ? 'Limited availability' : 'Available'}
                  {' '}· {event.currency} {event.price.toLocaleString('en-IN')}
                </p>
              )) : <p role="status" style={{ margin: 0 }}>No future TTC dates are published.</p>}
            </div>
          )}
        </section>

        <PrimaryCTA
          label="Check TTC Details"
          subtext="Request current course information. The form will mark this as a Yoga Teacher Training enquiry."
          vertical="retreat"
          category="yoga-ttc"
          sourcePath={PATH}
          yogaInterest="Yoga TTC"
        />
        {YOGA_TTC_PRODUCT.bookingUrl && detailsPublished && (
          <p style={{ margin: '0.75rem 0 0', textAlign: 'center' }}>
            <a href={YOGA_TTC_PRODUCT.bookingUrl} rel="nofollow" style={{ color: '#0f766e', fontWeight: 600 }}>Book the published course</a>
          </p>
        )}

        <section style={{ marginTop: '2.5rem' }}>
          <h2 style={{ fontSize: '1.35rem' }}>Common questions</h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </section>

        <nav aria-label="Related Yoga pages" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
          <Link href="/yoga-retreats">Yoga retreats hub</Link>
          <Link href="/retreats/yoga-retreat-rishikesh">Rishikesh Yoga retreat</Link>
          <Link href="/find-your-retreat">Help Me Choose</Link>
        </nav>
      </main>
    </TrackedPage>
  );
}
