import { Metadata } from 'next';
import { getExperiencePage } from '@/config/experiencePages';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import ExperienceHubPage from '@/components/ExperienceHubPage';

const PAGE = getExperiencePage('yoga-retreats')!;

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return {
    title: PAGE.title,
    description: PAGE.metaDescription,
    alternates: { canonical: buildCanonicalUrl(`/${PAGE.slug}`) },
    openGraph: {
      title: PAGE.title,
      description: PAGE.metaDescription,
      url: buildCanonicalUrl(`/${PAGE.slug}`),
      type: 'website',
      images: buildOgImages(PAGE.title),
    },
  };
}

export default function YogaRetreatsPage() {
  return <ExperienceHubPage page={PAGE} />;
}
