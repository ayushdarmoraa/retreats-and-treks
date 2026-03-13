import { Metadata } from 'next';
import { getDurationPage } from '@/config/durationPages';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import DurationHubPage from '@/components/DurationHubPage';

const PAGE = getDurationPage('7-day-meditation-retreat')!;

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

export default function SevenDayMeditationRetreatPage() {
  return <DurationHubPage page={PAGE} />;
}
