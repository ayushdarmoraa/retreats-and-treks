import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import { getUpcomingEvents } from '@/config/retreatProgramEvents';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import {
  LocationHero,
  LocationLandTone,
  LocationFAQ,
  LocationBridge,
  LocationRetreatLogic,
  LocationRetreatServices,
  LocationBeyondRetreat,
  LocationPlaces,
  LocationSoftExperiences,
  LocationPractical,
  LocationSeasonal,
  LocationReading,
  LocationDiscover,
  LocationCTA,
} from '@/components/Retreats/Location';
import { chakrataLocation } from '@/content/locations/chakrata';
import { getTreksByLocation } from '@/lib/treks';
import { getAllLocationContent } from '@/content/locations';
import { getLocationById } from '@/lib/locations';
import { getAllRetreatServices } from '@/content/retreats/services';

const PATH = '/retreats/chakrata';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return {
    title: 'Retreats & Treks in Chakrata | Retreats And Treks',
    description:
      'Chakrata retreats and treks in Himalayan deodar forest. Meditation, yoga, burnout recovery, weekend retreats, forest treks, and small groups near Dehradun.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Retreats & Treks in Chakrata — Forest Silence at 2,200m',
      description:
        'Himalayan forest retreats and treks in Chakrata. Meditation, burnout recovery, weekend escapes. Small groups, experienced facilitators.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Retreats & Treks in Chakrata'),
    },
  };
}

// Retreat services that work in Chakrata
const CHAKRATA_RETREAT_SERVICES = [
  {
    slug: 'rest-and-reset',
    title: 'Rest & Reset',
    oneLineEssence: 'Permission to stop, for people who have been running too long.',
  },
  {
    slug: 'burnout-recovery',
    title: 'Burnout Recovery',
    oneLineEssence: 'A weekend mountain retreat designed to help you disconnect from constant work pressure.',
  },
  {
    slug: 'weekend-retreat',
    title: 'Weekend Retreat',
    oneLineEssence: 'A compressed reset for those who need mountain time but have limited availability.',
  },
  {
    slug: 'yoga-movement',
    title: 'Yoga & Movement',
    oneLineEssence: 'Connect body, breath, and place through conscious movement.',
  },
];

// Chakrata specific treks (filtered from all treks)
const CHAKRATA_TREK_SLUGS = ['weekend-trek', 'tiger-fall-trek', 'budher-caves-trek', 'guided-treks'];

const FAQ_ITEMS = [
  {
    question: 'How do I reach Chakrata?',
    answer:
      'Delhi → Dehradun (5.5 hours by train or 1 hour by flight). Dehradun → Chakrata (85 km, 3.5 hours by road). We handle Dehradun pickup and drop for all retreats.',
  },
  {
    question: 'Is Chakrata good for a first retreat?',
    answer:
      'Yes — it is our most recommended location for first-timers. Low altitude (2,200m), gentle forest environment, close to Dehradun, and weekend retreat options.',
  },
  {
    question: 'What is the best time to visit Chakrata?',
    answer:
      'September–October is ideal (post-monsoon clarity). June–August monsoon is best for deep introspection. March–May spring is great for beginners.',
  },
  {
    question: 'Can I combine a trek with a retreat in Chakrata?',
    answer:
      'Yes — a 2-day weekend trek followed by a 3-day retreat is our most popular combination. Both operate from the same location.',
  },
  {
    question: 'How is Chakrata different from Rishikesh?',
    answer:
      'Rishikesh has tourist traffic and noise. Chakrata is a forest cantonment with no commercial tourism — good for silence, recovery, and genuine disconnection.',
  },
];

const RETREAT_TYPES = [
  { title: 'Meditation & Silence', desc: 'Structured seated practice, walking meditation, noble silence.', link: '/meditation-retreats', img: '/Images/experience-hubs/meditation-hero.webp', duration: '3–7 days', price: 'From ₹14,000' },
  { title: 'Burnout Recovery', desc: 'Somatic therapy, rest, nervous system regulation. For professionals.', link: '/burnout-recovery-retreats', img: '/Images/location/chakrata.webp', duration: '5–7 days', price: 'From ₹28,000' },
  { title: 'Weekend Retreat', desc: 'Short reset in the forest. Ideal for first-timers.', link: '/retreats/chakrata/weekend-retreat-from-dehradun', img: '/Images/trek/region/chakraweekend.webp', duration: '2–3 days', price: 'From ₹14,000' },
  { title: 'Yoga & Movement', desc: 'Hatha, pranayama, and embodied practice in a forest setting.', link: '/yoga-retreats', img: '/Images/experience-hubs/yoga-hero.webp', duration: '3–7 days', price: 'From ₹18,000' },
];

const TREK_TYPES = [
  { title: 'Weekend Trek', desc: 'Forest trails, ridge campsites, 8 km. No experience needed.', link: '/treks/location/chakrata/weekend-trek', img: '/Images/trek/region/chakraweekend.webp', difficulty: 'Easy', duration: '2–3 days' },
  { title: 'Tiger Fall Trek', desc: '12 km to one of the highest waterfalls in the region.', link: '/treks/location/chakrata/tiger-fall-trek', img: '/Images/trek/region/tigerfall.webp', difficulty: 'Moderate', duration: '1 day' },
  { title: 'Budher Caves Trek', desc: '10 km through oak forest to ancient limestone caves.', link: '/treks/location/chakrata/budher-caves-trek', img: '/Images/trek/region/budher.webp', difficulty: 'Moderate', duration: '1 day' },
  { title: 'Guided Forest Treks', desc: 'Flexible 1–3 day itineraries with expert naturalists.', link: '/treks/location/chakrata/guided-treks', img: '/Images/trek/region/chakraguided.webp', difficulty: 'Easy–Moderate', duration: '1–3 days' },
];

const PLACES = [
  { name: 'Tiger Fall', type: 'Waterfall', description: 'A 20-meter cascade hidden in the forest.', season: 'Best Jun–Oct', img: '/Images/trek/region/tigerfall.webp' },
  { name: 'Deoban Meadows', type: 'Meadow · 2,300m', description: 'High meadows with views of distant snow peaks.', season: 'Apr–Oct', img: '/Images/trek/region/chakraguided.webp' },
  { name: 'Budher Caves', type: 'Ancient Caves', description: 'Rock caves believed to be ancient meditation sites.', season: 'Year-round', img: '/Images/trek/region/budher.webp' },
];

export default function ChakrataHubPage() {
  const allUpcoming = getUpcomingEvents();
  const chakrataEvents = allUpcoming.filter((e) => e.locationId === 'chakrata');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Chakrata', url: buildCanonicalUrl(PATH) },
  ]);

  const allLocations = getAllLocationContent()
    .filter((loc) => loc.id !== 'chakrata')
    .filter((loc) => getLocationById(loc.id as any)?.supportsRetreats)
    .map((loc) => ({
      id: loc.id,
      name: loc.name,
      opening: loc.landTone.opening,
    }));

  // Get treks
  const allTreks = getTreksByLocation('chakrata');
  const chakrataTreks = allTreks.filter((trek: any) => CHAKRATA_TREK_SLUGS.includes(trek.slug));

  return (
    <TrackedPage page={PATH}>
      <style>{`
        .ck-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }
        .ck-wide { max-width: 72rem; margin: 0 auto; padding: 0 2rem; }
        .ck-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .ck-eyebrow-line { width: 30px; height: 2px; background: #0f766e; flex-shrink: 0; border-radius: 2px; }
        .ck-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8B877C;
          font-weight: 500;
        }
        .ck-section-title {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #2B2A26;
          line-height: 1.15;
          margin: 0 0 2rem;
        }
        .ck-section-title .accent { color: #0f766e; }
        .ck-body-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.92rem;
          line-height: 1.85;
          color: rgba(43,42,38,0.5);
          font-weight: 300;
          margin: 0;
        }

        .ck-exp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }
        .ck-exp-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
        }
        .ck-exp-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 44px rgba(0,0,0,0.06);
          border-color: rgba(15,118,110,0.1);
        }
        .ck-exp-card-img {
          position: relative;
          height: 180px;
          overflow: hidden;
          background: #f5f3ef;
        }
        .ck-exp-card-img img {
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .ck-exp-card:hover .ck-exp-card-img img { transform: scale(1.06); }
        .ck-exp-card-body { padding: 1.25rem 1.25rem 1.5rem; flex: 1; display: flex; flex-direction: column; }
        .ck-exp-card-body h4 {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #2B2A26;
          margin: 0 0 0.4rem;
          transition: color 0.3s ease;
        }
        .ck-exp-card:hover .ck-exp-card-body h4 { color: #0f766e; }
        .ck-exp-card-body p {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.82rem;
          color: rgba(43,42,38,0.55);
          font-weight: 300;
          line-height: 1.65;
          margin: 0 0 0.75rem;
          flex: 1;
        }
        .ck-exp-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(0,0,0,0.04);
          padding-top: 0.75rem;
        }
        .ck-exp-card-footer span {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.6rem;
          color: #8B877C;
        }
        .ck-exp-card-footer .ck-exp-cta {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0f766e;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          transition: gap 0.3s ease;
        }
        .ck-exp-card:hover .ck-exp-card-footer .ck-exp-cta { gap: 0.6rem; }
        .ck-exp-card-footer .ck-exp-cta span {
          transition: transform 0.3s ease;
          display: inline-block;
          color: #0f766e;
        }
        .ck-exp-card:hover .ck-exp-card-footer .ck-exp-cta span { transform: translateX(4px); }

        .ck-place-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 768px) { .ck-place-grid { grid-template-columns: 1fr; } }
        .ck-place-card {
          position: relative;
          height: 280px;
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          color: #fff;
          display: flex;
          align-items: flex-end;
          transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .ck-place-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.15); }
        .ck-place-card img { transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
        .ck-place-card:hover img { transform: scale(1.05); }

        .ck-prog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .ck-prog-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
        }
        .ck-prog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.06);
          border-color: rgba(15,118,110,0.1);
        }
        .ck-prog-status {
          font-size: 0.55rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 3px;
          white-space: nowrap;
        }
        .ck-prog-open { background: #ecfdf5; color: #065f46; }
        .ck-prog-filling { background: #fef3c7; color: #92400e; }
        .ck-prog-last { background: #fee2e2; color: #991b1b; }

        .ck-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 2.25rem;
          background: #0f766e;
          color: #fff;
          text-decoration: none;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          border-radius: 100px;
          transition: all 0.3s ease;
        }
        .ck-cta-btn:hover { background: #0d6b64; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(15,118,110,0.25); }
        .ck-cta-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.7rem 1.8rem;
          border: 1px solid rgba(15,118,110,0.2);
          color: #0f766e;
          text-decoration: none;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          border-radius: 100px;
          transition: all 0.3s ease;
        }
        .ck-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.04); }

        .ck-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 768px) { .ck-trust-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .ck-trust-grid { grid-template-columns: 1fr; } }
        .ck-trust-item {
          text-align: center;
          padding: 1.5rem 1rem;
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 12px;
          background: #fff;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }
        .ck-trust-item:hover { border-color: rgba(15,118,110,0.1); transform: translateY(-2px); }

        .ck-funnel-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media (max-width: 768px) { .ck-funnel-grid { grid-template-columns: 1fr; } }
        .ck-funnel-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1.75rem 1.5rem;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          align-items: center;
          text-align: center;
          transition: all 0.3s ease;
          color: #fff;
        }
        .ck-funnel-card:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.2); transform: translateY(-3px); }

        .ck-season-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        @media (max-width: 768px) { .ck-season-grid { grid-template-columns: repeat(2, 1fr); } }
        .ck-season-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }
        .ck-season-card:hover { border-color: rgba(15,118,110,0.1); transform: translateY(-2px); }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema]) }} />

      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Retreats', href: '/retreats' }, { name: 'Chakrata' }]} />

      {/* 1. HERO */}
      <LocationHero
        name={chakrataLocation.name}
        opening={chakrataLocation.landTone.opening}
        heroImage={chakrataLocation.heroImage}
        heroImageAlt={chakrataLocation.heroImageAlt}
        stats={['2,200m altitude', '3.5 hrs from Dehradun', 'Small groups', 'Forest silence']}
        tags={['Himalayan Retreats', 'Quiet Places', 'Small Groups']}
      />

      {/* 2. LAND TONE */}
      <LocationLandTone
        name={chakrataLocation.name}
        opening={chakrataLocation.landTone.opening}
      />

      {/* 3. FAQ */}
      <LocationFAQ
        locationName={chakrataLocation.name}
        faqs={FAQ_ITEMS}
      />

      {/* 4. BRIDGE - INNER WORK */}
      <LocationBridge
        title={chakrataLocation.bridgingInnerWorkMovement.title}
        description={chakrataLocation.bridgingInnerWorkMovement.description}
      />

      {/* 5. RETREAT LOGIC */}
      <LocationRetreatLogic
        title={chakrataLocation.retreatLogic.title}
        factors={chakrataLocation.retreatLogic.factors}
      />

      {/* 6. RETREAT SERVICES */}
      <LocationRetreatServices
        locationName={chakrataLocation.name}
        services={CHAKRATA_RETREAT_SERVICES}
        locationId="chakrata"
      />

      {/* 7. BEYOND RETREAT - TREKS */}
      {chakrataTreks.length > 0 && (
        <LocationBeyondRetreat
          locationName={chakrataLocation.name}
          experiences={chakrataTreks.map((trek) => ({
            name: trek.title,
            duration: trek.duration,
            description: trek.description,
            difficulty: trek.difficulty,
            distance: trek.distance,
          }))}
          type="treks"
        />
      )}

      {/* 8. PLACES & LANDSCAPES */}
      <LocationPlaces
        locationName={chakrataLocation.name}
        places={PLACES}
      />

      {/* 9. SOFT EXPERIENCES */}
      {chakrataLocation.softExperiences.length > 0 && (
        <LocationSoftExperiences experiences={chakrataLocation.softExperiences} />
      )}

      {/* 10. PRACTICAL CONTEXT */}
      <LocationPractical data={chakrataLocation.practicalContext} />

      {/* 11. SEASONAL CHARACTER */}
      <LocationSeasonal
        title={chakrataLocation.seasonalCharacter.title}
        seasons={chakrataLocation.seasonalCharacter.seasons}
      />

      {/* 12. READING FROM THIS LAND */}
      {chakrataLocation.relatedBlogSlugs.length > 0 && (
        <LocationReading
          locationName={chakrataLocation.name}
          slugs={chakrataLocation.relatedBlogSlugs}
        />
      )}

      {/* 13. DISCOVER OTHER LOCATIONS */}
      <LocationDiscover
        currentLocationId="chakrata"
        locations={allLocations}
      />

      {/* 14. CTA */}
      <LocationCTA
        locationId="chakrata"
        networkContext={chakrataLocation.networkContext}
        ctaText={chakrataLocation.ctaText}
        whatsappLink={`https://wa.me/919760446101?text=${encodeURIComponent(`Hi, I'm interested in visiting ${chakrataLocation.name}.`)}`}
      />
    </TrackedPage>
  );
}
