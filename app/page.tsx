import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { getLocationsWithRetreats } from '@/lib/locations';
import HomeClient from './HomeClient';
import PrimaryCTA from '@/components/PrimaryCTA';
import { getAllRetreatServices } from '@/content/retreats/services';
import { getAggregateRating } from '@/content/reviews';
import DeferredReviewerSection from '@/components/client/DeferredReviewerSection';
import PhilosophyManifesto from '@/components/home/PhilosophyManifesto';
import { philosophyManifestoContent } from '@/content/home/PhilosophyManifesto.content';
import DirectoryLinks from '@/components/home/DirectoryLinks';
import { directoryLinksContent } from '@/content/home/DirectoryLinks.content';
import PlanningResources from '@/components/home/PlanningResources';
import { planningResourcesContent } from '@/content/home/PlanningResources.content';


export function generateMetadata(): Metadata {
  return {
    title: 'Himalayan Retreats & Treks – Designed Around Your Intention',
    description:
      'Curated Himalayan retreats and treks designed around your intention, with small groups, request-based journeys, and carefully chosen locations.',
    alternates: {
      canonical: buildCanonicalUrl('/'),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Himalayan Retreats & Treks – Designed Around Your Intention',
      description: 'Curated Himalayan retreats and treks designed around your intention, with small groups, request-based journeys, and carefully chosen locations.',
      url: buildCanonicalUrl('/'),
      type: 'website',
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages('Himalayan Retreats & Treks – Designed Around Your Intention'),
    },
  };
}

export default function HomePage() {
  const locationsWithRetreats = getLocationsWithRetreats();
  const allRetreats = getAllRetreatServices();
  const finderRatings = Object.fromEntries(
    allRetreats.flatMap((s) => {
      const r = getAggregateRating(s.slug);
      return r ? [[s.slug, { value: r.ratingValue, count: r.reviewCount }]] : [];
    }),
  );

  return (
    <main style={{ width: '100%', maxWidth: 'none', margin: 0, padding: 0, overflowX: 'hidden' }}>
      <HomeClient locations={locationsWithRetreats} />

      <PhilosophyManifesto {...philosophyManifestoContent} />

<section style={{ maxWidth: '52rem', margin: '0 auto', padding: '5rem 2rem 5rem' }}>
  <PrimaryCTA
    label="Speak With a Mountain Planner"
    subtext="Not sure where to start? Tell us what you are looking for and we will guide you."
    vertical="retreat"
    category="homepage"
    sourcePath="/"
  />
</section>
    <DirectoryLinks {...directoryLinksContent} />
      <DeferredReviewerSection finderRatings={finderRatings} />

      
<PlanningResources {...planningResourcesContent} />
    </main>
  );
}
