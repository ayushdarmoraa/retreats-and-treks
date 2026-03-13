import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  EXPERIENCE_LOCATION_PAGES,
  getExperienceLocationPage,
  getAllExperienceLocationSlugs,
} from '@/config/experienceLocationPages';
import {
  getItineraryPage,
  getAllItinerarySlugs,
} from '@/config/itineraryPages';
import {
  getRetreatProgramEvent,
  getAllRetreatProgramSlugs,
} from '@/config/retreatProgramEvents';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import ExperienceLocationPage from '@/components/ExperienceLocationPage';
import ItineraryPage from '@/components/ItineraryPage';
import ProgramEventPage from '@/components/ProgramEventPage';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  const elSlugs = getAllExperienceLocationSlugs().map((slug) => ({ slug }));
  const itSlugs = getAllItinerarySlugs().map((slug) => ({ slug }));
  const evSlugs = getAllRetreatProgramSlugs().map((slug) => ({ slug }));
  return [...elSlugs, ...itSlugs, ...evSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const elPage = getExperienceLocationPage(slug);
  if (elPage) {
    return {
      title: elPage.title,
      description: elPage.metaDescription,
      alternates: { canonical: buildCanonicalUrl(`/${elPage.slug}`) },
      robots: { index: true, follow: true },
      openGraph: {
        title: elPage.h1,
        description: elPage.metaDescription,
        url: buildCanonicalUrl(`/${elPage.slug}`),
        type: 'website',
        images: buildOgImages(elPage.h1),
      },
    };
  }

  const itPage = getItineraryPage(slug);
  if (itPage) {
    return {
      title: itPage.title,
      description: itPage.metaDescription,
      alternates: { canonical: buildCanonicalUrl(`/${itPage.slug}`) },
      robots: { index: true, follow: true },
      openGraph: {
        title: itPage.h1,
        description: itPage.metaDescription,
        url: buildCanonicalUrl(`/${itPage.slug}`),
        type: 'article',
        images: buildOgImages(itPage.h1),
      },
    };
  }

  const ev = getRetreatProgramEvent(slug);
  if (ev) {
    return {
      title: ev.title,
      description: ev.metaDescription,
      alternates: { canonical: buildCanonicalUrl(`/${ev.slug}`) },
      robots: { index: true, follow: true },
      openGraph: {
        title: ev.h1,
        description: ev.metaDescription,
        url: buildCanonicalUrl(`/${ev.slug}`),
        type: 'article',
        images: buildOgImages(ev.h1),
      },
    };
  }

  return {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const elPage = getExperienceLocationPage(slug);
  if (elPage) return <ExperienceLocationPage page={elPage} />;

  const itPage = getItineraryPage(slug);
  if (itPage) return <ItineraryPage page={itPage} />;

  const ev = getRetreatProgramEvent(slug);
  if (ev) return <ProgramEventPage event={ev} />;

  notFound();
}
