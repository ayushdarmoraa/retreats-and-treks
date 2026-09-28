import Link from 'next/link';
import type { ExperienceLocationPage as PageConfig } from '@/config/experienceLocationPages';
import { getSiblingPages } from '@/config/experienceLocationPages';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';

interface Props {
  page: PageConfig;
}

export default function ExperienceLocationPage({ page }: Props) {
  const isYogaLocation = page.experienceSlug === 'yoga-retreats';
  const yogaFaqItems = [
    { question: `Are fixed Yoga dates published for ${page.locationName}?`, answer: 'No recurring fixed departure is published on this location page. Dates and availability are shown only when linked to a real event in the retreat registry.' },
    { question: 'What schedule, stay, meals, and inclusions should I expect?', answer: 'These details are not currently published for a future Yoga departure at this location. Ask for the written itinerary and inclusions for any proposed programme.' },
    { question: 'How do I check whether the location and season are suitable?', answer: 'Share your experience and preferred dates. Access, seasonal suitability, and programme details must be confirmed for the specific request.' },
    { question: 'What if this location cannot be arranged?', answer: 'The team can review the request and discuss the Rishikesh Yoga product as an alternative. An alternative is not booked or available until confirmed.' },
  ];
  const faqItems = isYogaLocation
    ? yogaFaqItems
    : page.faqItems.map((item) => ({ question: item.question, answer: item.answer }));
  validateFAQSync(faqItems, `/${page.slug}`);

  const siblings = getSiblingPages(page.slug);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: `${page.label}s`, url: buildCanonicalUrl(`/${page.parentHubSlug}`) },
    { name: `${page.label} in ${page.locationName}`, url: buildCanonicalUrl(`/${page.slug}`) },
  ]);
  const faqSchema = generateFAQSchema(faqItems);

  const itineraryArcMap: Record<string, { duration: number; urlPrefix: string }> = {
    'meditation-retreats': { duration: 7, urlPrefix: 'meditation-retreat' },
    'silent-retreats': { duration: 7, urlPrefix: 'silent-retreat' },
    'yoga-retreats': { duration: 5, urlPrefix: 'yoga-retreat' },
    'burnout-recovery-retreats': { duration: 5, urlPrefix: 'burnout-recovery-retreat' },
    'spiritual-retreats': { duration: 7, urlPrefix: 'spiritual-retreat' },
    'stress-relief-retreats': { duration: 5, urlPrefix: 'stress-relief-retreat' },
    'anxiety-healing-retreat': { duration: 5, urlPrefix: 'anxiety-healing-retreat' },
    'digital-detox-retreat': { duration: 5, urlPrefix: 'digital-detox-retreat' },
    'healing-retreat-himalayas': { duration: 7, urlPrefix: 'healing-retreat' },
    'creative-retreat': { duration: 7, urlPrefix: 'art-retreat' },
  };

  const itineraryArc = itineraryArcMap[page.parentHubSlug];
  const itinerarySlug = itineraryArc
    ? `${itineraryArc.duration}-day-${page.locationId}-${itineraryArc.urlPrefix}-itinerary`
    : undefined;
  const eyebrow = { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' } as const;
  const eyebrowLine = { width: '24px', height: '1px', background: 'var(--color-primary)', display: 'inline-block' } as const;
  const eyebrowText = {
    fontFamily: 'var(--font-geist-sans), sans-serif',
    fontSize: '0.75rem', letterSpacing: '0.28em',
    textTransform: 'uppercase' as const,
    color: '#374151', fontWeight: 500,
  };

  return (
    <TrackedPage page={`/${page.slug}`} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[
        { name: 'Home', href: '/' },
        { name: `${page.label}s`, href: `/${page.parentHubSlug}` },
        { name: `in ${page.locationName}` },
      ]} />

      {/* ── HERO ── */}
      <div style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#f7f9f7',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={eyebrow}>
            <span style={eyebrowLine} />
            <span style={eyebrowText}>{page.locationName}</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
            fontWeight: 200, letterSpacing: '-0.035em',
            color: '#111111', lineHeight: 1.1,
            margin: '0 0 0.75rem',
          }}>{page.h1}</h1>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.8rem', letterSpacing: '0.1em',
            color: '#6b7280', margin: '0 0 1.25rem',
          }}>{isYogaLocation ? 'On-request Yoga enquiries' : page.locationHeading}</p>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.95rem', fontWeight: 300,
            lineHeight: 1.85, color: '#3a3a3a',
            margin: 0,
            paddingLeft: '1.5rem',
            borderLeft: '2px solid rgba(15,118,110,0.25)',
          }}>{isYogaLocation
            ? `Yoga requests in ${page.locationName} are demand-led. This page is not a scheduled departure; current venue, access, season, and programme details must be confirmed for each enquiry.`
            : page.intro}</p>
          {isYogaLocation && (
            <p role="status" style={{ margin: '1.25rem 0 0', color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.7 }}>
              This is an on-request Yoga location. No recurring fixed departure is implied; dates, access, season, and programme details are confirmed for each enquiry.
            </p>
          )}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '2rem 2rem 0' }}>
        <PrimaryCTA
          label={isYogaLocation ? 'Plan My Yoga Retreat' : `Inquire About This ${page.label}`}
          subtext={isYogaLocation
            ? `This is an on-request enquiry, not a fixed departure. Share your experience and preferred dates for ${page.locationName}.`
            : `${page.label} in ${page.locationName}. Small groups, experienced guides. Tell us what you're seeking.`}
          vertical="retreat"
          category={`exp-loc-${page.locationId}`}
          sourcePath={`/${page.slug}`}
          location={page.locationName}
          yogaInterest={isYogaLocation ? 'Yoga Retreat' : undefined}
        />
        {isYogaLocation && (
          <p style={{ margin: '0.75rem 0 0', textAlign: 'center' }}>
            <TrackedWhatsAppLink
              href={`https://wa.me/919760446101?text=${encodeURIComponent(`Hi, I would like to enquire about a Yoga retreat in ${page.locationName}.`)}`}
              sourcePath={`/${page.slug}`}
              location={page.locationName}
              intent="Yoga retreat enquiry"
              style={{ color: 'var(--color-primary)', fontWeight: 500 }}
            >
              WhatsApp about this location
            </TrackedWhatsAppLink>
          </p>
        )}
        {isYogaLocation && (
          <p style={{ margin: '0.9rem 0 0', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', fontWeight: 300, color: '#6b7280' }}>
            Looking for regular Yoga retreat departures?{' '}
            <Link href="/retreats/yoga-retreat-rishikesh" style={{ color: 'var(--color-primary)', fontWeight: 400 }}>
              Explore Yoga retreats in Rishikesh →
            </Link>
          </p>
        )}
      </div>

      {/* ── ABOUT LOCATION ── */}
      <div style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={eyebrow}>
            <span style={eyebrowLine} />
            <span style={eyebrowText}>About {page.locationName}</span>
          </div>
          {isYogaLocation ? (
            <p role="status" style={{ margin: 0, fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.75, color: '#3a3a3a' }}>
              Current Yoga-specific season, access, terrain suitability, and programme details are not published for this location. Confirm them for the dates being considered.
            </p>
          ) : <div style={{
            background: '#f7f9f7', border: '1px solid #e5e7eb',
            borderLeft: '3px solid var(--color-primary)',
            borderRadius: '8px', padding: '1.5rem',
            display: 'grid', gap: '0.6rem',
          }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.75, color: '#3a3a3a' }}>
              <strong style={{ fontWeight: 500, color: '#111111' }}>Terrain:</strong> {page.terrain}
            </p>
            <p style={{ margin: 0, fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.75, color: '#3a3a3a' }}>
              <strong style={{ fontWeight: 500, color: '#111111' }}>Best seasons:</strong> {page.bestSeasons}
            </p>
            <p style={{ margin: 0, fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.75, color: '#3a3a3a' }}>
              <strong style={{ fontWeight: 500, color: '#111111' }}>How to reach:</strong> {page.access}
            </p>
            <p style={{ margin: 0, fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.75, color: '#3a3a3a' }}>
              <strong style={{ fontWeight: 500, color: '#111111' }}>Atmosphere:</strong> {page.atmosphere}
            </p>
            {page.landmarks.length > 0 && (
              <p style={{ margin: 0, fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.75, color: '#3a3a3a' }}>
                <strong style={{ fontWeight: 500, color: '#111111' }}>Nearby:</strong> {page.landmarks.join(', ')}
              </p>
            )}
          </div>}
          <Link href={`/locations/${page.locationId}`} style={{
            display: 'inline-block', marginTop: '1rem',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.82rem', fontWeight: 300,
            color: 'var(--color-primary)',
          }}>
            Full guide to {page.locationName} →
          </Link>
        </div>
      </div>

      {/* ── WHO IS THIS FOR + WHAT TO EXPECT ── */}
      <div style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#f7f9f7',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))', gap: '2.5rem' }}>
          <div>
            <div style={eyebrow}><span style={eyebrowLine} /><span style={eyebrowText}>{isYogaLocation ? 'Suitability' : 'Who Is This For'}</span></div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.6rem' }}>
              {(isYogaLocation
                ? ['Share your Yoga experience, preferred dates, group size, and any access or mobility needs.', 'Suitability is confirmed against the proposed programme and travel conditions.']
                : page.whoIsThisFor).map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.65, color: '#3a3a3a' }}>
                  <span style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }}>✦</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={eyebrow}><span style={eyebrowLine} /><span style={eyebrowText}>{isYogaLocation ? 'Published Information' : 'What to Expect'}</span></div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.6rem' }}>
              {(isYogaLocation
                ? ['No fixed Yoga dates or departure-specific schedule are currently published.', 'Stay, meals, sessions, inclusions, and exclusions are confirmed by enquiry.']
                : page.whatToExpect).map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.65, color: '#3a3a3a' }}>
                  <span style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }}>✦</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SAMPLE DAY ── */}
      <div style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={eyebrow}><span style={eyebrowLine} /><span style={eyebrowText}>Sample Day</span></div>
          {isYogaLocation ? (
            <p role="status" style={{ margin: 0, border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem 1.25rem', color: '#59636e', lineHeight: 1.7 }}>
              A departure-specific schedule is not currently published for this on-request location. Ask the team for the proposed itinerary and timings.
            </p>
          ) : <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            {page.sampleSchedule.map((row, i, arr) => {
              const [time, ...rest] = row.split(' — ');
              const activity = rest.join(' — ');
              return (
                <div key={row} style={{
                  display: 'grid', gridTemplateColumns: '7rem 1fr',
                  padding: '0.75rem 1.25rem',
                  borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none',
                  background: i % 2 === 0 ? '#ffffff' : '#f7f9f7',
                }}>
                  <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', fontWeight: 500, color: '#374151' }}>{time}</span>
                  <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', fontWeight: 300, color: '#3a3a3a', lineHeight: 1.6 }}>{activity}</span>
                </div>
              );
            })}
          </div>}
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', fontWeight: 300, color: '#9ca3af', marginTop: '0.75rem' }}>
            Schedules adapt to the season, group energy, and {page.locationName}&rsquo;s natural rhythms.
          </p>
        </div>
      </div>

      {/* ── CTA 2 ── */}
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '2rem 2rem 0' }}>
        <PrimaryCTA
          label={isYogaLocation ? 'Plan My Yoga Retreat' : 'Plan My Retreat'}
          subtext={isYogaLocation
            ? `Ask whether a custom Yoga programme can be arranged in ${page.locationName}. Dates and details are confirmed individually.`
            : `Tell us about yourself — we'll design a ${page.label.toLowerCase()} in ${page.locationName} that fits.`}
          vertical="retreat"
          category={`exp-loc-${page.locationId}`}
          sourcePath={`/${page.slug}`}
          location={page.locationName}
          yogaInterest={isYogaLocation ? 'Yoga Retreat' : undefined}
        />
      </div>

      {/* ── DURATION OPTIONS ── */}
      {page.relatedDurationSlugs.length > 0 && (
        <div style={{
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          background: '#f7f9f7',
          paddingTop: '4rem', paddingBottom: '4rem',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={eyebrow}><span style={eyebrowLine} /><span style={eyebrowText}>Duration Options</span></div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              {page.relatedDurationSlugs.map((dSlug, i, arr) => (
                <Link key={dSlug} href={`/${dSlug}`} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none',
                  textDecoration: 'none', background: '#ffffff',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.88rem', fontWeight: 300, color: '#333333',
                }}>
                  <span>{dSlug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')}</span>
                  <span style={{ color: '#374151', fontSize: '0.8rem' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── DAY-BY-DAY ITINERARY ── */}
      {itinerarySlug && !isYogaLocation && (
        <div style={{
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          background: '#ffffff',
          paddingTop: '4rem', paddingBottom: '4rem',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={eyebrow}><span style={eyebrowLine} /><span style={eyebrowText}>Day-by-Day Plan</span></div>
            <div style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '1.25rem',
              background: '#f7f9f7',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '1.15rem',
                fontWeight: 400,
                color: '#111111',
                margin: '0 0 0.6rem',
              }}>
                See the full {page.locationName} {itineraryArc?.duration}-day itinerary
              </h2>
              <p style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.88rem',
                fontWeight: 300,
                lineHeight: 1.75,
                color: '#3a3a3a',
                margin: '0 0 1rem',
              }}>
                Review the daily rhythm, arrival flow, practice structure, and departure plan for this {page.label.toLowerCase()} in {page.locationName}.
              </p>
              <Link href={`/${itinerarySlug}`} style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.88rem',
                fontWeight: 400,
                textDecoration: 'none',
              }}>
                View day-by-day itinerary →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── OTHER LOCATIONS ── */}
      {siblings.length > 0 && (
        <div style={{
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          background: '#ffffff',
          paddingTop: '4rem', paddingBottom: '4rem',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={eyebrow}><span style={eyebrowLine} /><span style={eyebrowText}>{page.label} in Other Locations</span></div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              {siblings.map((sib, i, arr) => (
                <Link key={sib.slug} href={`/${sib.slug}`} style={{
                  display: 'flex', flexDirection: 'column' as const,
                  padding: '1rem 1.25rem',
                  borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none',
                  textDecoration: 'none', background: '#ffffff',
                }}>
                  <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 400, color: 'var(--color-primary)' }}>{sib.locationName} →</span>
                  <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', fontWeight: 300, color: '#6b7280', marginTop: '0.2rem' }}>{sib.locationHeading}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── FAQ ── */}
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '4rem 2rem 0' }}>
        <div style={eyebrow}><span style={eyebrowLine} /><span style={eyebrowText}>FAQ</span></div>
        <TrackedFAQ items={faqItems} page={`/${page.slug}`} />
      </div>

      {/* ── FOOTER LINKS ── */}
      <div style={{ maxWidth: '52rem', margin: '2rem auto 0', padding: '0 2rem 4rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' as const }}>
        <Link href={`/${page.parentHubSlug}`} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', fontWeight: 300, color: 'var(--color-primary)' }}>
          ← All {page.label}s
        </Link>
        <span style={{ color: '#e5e7eb' }}>|</span>
        <Link href={`/locations/${page.locationId}`} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', fontWeight: 300, color: 'var(--color-primary)' }}>
          {page.locationName} Guide
        </Link>
        <span style={{ color: '#e5e7eb' }}>|</span>
        <Link href="/contact" style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', fontWeight: 300, color: 'var(--color-primary)' }}>
          Contact Us
        </Link>
      </div>
    </TrackedPage>
  );
}
