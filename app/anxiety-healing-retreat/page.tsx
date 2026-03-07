import { Metadata } from 'next';
import { getExperiencePage } from '@/config/experiencePages';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import ExperienceHubPage from '@/components/ExperienceHubPage';

const PAGE = getExperiencePage('anxiety-healing-retreat')!;

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

export default function AnxietyHealingRetreatPage() {
  return <ExperienceHubPage page={PAGE} />;
}
