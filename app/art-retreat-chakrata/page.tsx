import type { Metadata } from 'next';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import ArtRetreatLocationPage from '@/components/ArtRetreatLocationPage';
import { chakrataLocation } from '@/content/locations/chakrata';

const PATH = '/art-retreat-chakrata';

export const dynamic = 'force-static';

const artChakrataContent = {
  ...chakrataLocation,
  landTone: {
    ...chakrataLocation.landTone,
    opening: 'Chakrata offers a forest and mountain setting for creative practice and observation. The confirmed programme determines which activities and locations are included.',
  },
  bridgingInnerWorkMovement: {
    title: 'Creative Practice in Chakrata',
    description: 'The programme may combine creative activities with time outdoors. Ask which activities, locations, and access arrangements are included for your dates.',
  },
  retreatLogic: {
    title: 'A Setting for Creative Practice',
    factors: [
      {
        title: 'Outdoor Observation',
        description: 'Ask whether the confirmed itinerary includes outdoor creative activities and which locations are planned.',
      },
      {
        title: 'Programme Details',
        description: 'Schedules, walking routes, and access arrangements depend on the specific programme and current conditions.',
      },
      {
        title: 'Current Conditions',
        description: 'Confirm weather, road access, and any activity requirements with the organizer before booking.',
      },
    ],
  },
  seasonalCharacter: {
    title: 'Seasonal Conditions',
    seasons: [
      {
        month: 'Before travel',
        mood: 'Check current conditions',
        description: 'Weather, road access, and activity suitability can vary. Ask the organizer for current seasonal guidance for your dates.',
      },
    ],
  },
  practicalContext: {
    ...chakrataLocation.practicalContext,
    bestSeasons: 'Suitable dates depend on current weather, access, and the confirmed programme. Contact the organizer for seasonal guidance.',
    accessibility: 'Travel times, road conditions, and access requirements vary. Confirm the current route and transport details with the retreat team before booking.',
    crowdProfile: 'Local conditions and visitor levels can vary. Contact the organizer for current details about the planned location.',
    notFor: 'Confirm available services, connectivity, and access requirements with the organizer before booking.',
  },
  faq: chakrataLocation.faq?.map((item) =>
    item.question === 'How do I reach an art retreat in Chakrata?'
      ? {
        ...item,
        answer: 'Routes and travel times vary. Contact the retreat team for current directions and transport guidance for your dates.',
      }
      : item.question === 'Why is Chakrata a suitable setting for an art retreat?'
        ? {
          ...item,
          answer: 'Ask whether the planned programme includes creative activities in or around Chakrata and confirm the location and access details for your dates.',
        }
      : item,
  ),
  placesAndLandscapes: chakrataLocation.placesAndLandscapes.map((place) => ({
    ...place,
    description: 'This location may be included in an itinerary. Confirm availability, access, and current conditions with the organizer.',
    season: 'Confirm current conditions',
  })),
  softExperiences: chakrataLocation.softExperiences.map((experience) => ({
    ...experience,
    description: 'Confirm whether this activity is included in the current programme and suitable for conditions during your dates.',
  })),
  networkContext: 'Chakrata is one location where a retreat may be offered. Confirm the location, activities, and current access details for the programme you are considering.',
  ctaText: 'Contact us to discuss the planned programme, location, access, and travel arrangements for your dates.',
};

export const metadata: Metadata = {
  title: 'Art Retreat in Chakrata | Retreats And Treks',
  description: 'Explore creative retreat options in Chakrata. Confirm current programme, location, access, and travel details with the retreat team.',
  alternates: { canonical: buildCanonicalUrl(PATH) },
};

export default function ArtRetreatChakrataPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Art Retreats', url: buildCanonicalUrl('/retreats/art') },
    { name: 'Art Retreat in Chakrata', url: buildCanonicalUrl(PATH) },
  ]);

  return (
    <TrackedPage page={PATH}>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Art Retreats', href: '/retreats/art' }, { name: 'Chakrata' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ArtRetreatLocationPage content={artChakrataContent} path={PATH} />
    </TrackedPage>
  );
}
