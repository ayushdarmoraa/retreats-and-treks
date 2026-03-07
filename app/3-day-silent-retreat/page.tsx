import { Metadata } from 'next';
import { getDurationPage } from '@/config/durationPages';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import DurationHubPage from '@/components/DurationHubPage';

const PAGE = getDurationPage('3-day-silent-retreat')!;

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
    },
  };
}

export default function ThreeDaySilentRetreatPage() {
  return <DurationHubPage page={PAGE} />;
}
