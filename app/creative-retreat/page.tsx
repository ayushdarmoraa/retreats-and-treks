import { Metadata } from 'next';
import { getExperiencePage } from '@/config/experiencePages';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import ExperienceHubPage from '@/components/ExperienceHubPage';
import PrimaryCTA from '@/components/PrimaryCTA';

const PAGE = getExperiencePage('creative-retreat')!;

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

export default function CreativeHealingRetreatPage() {
  return (
    <>
      <ExperienceHubPage page={PAGE} />
      <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 var(--space-md) var(--space-2xl)' }}>
        <PrimaryCTA
          label="Join the Creative Healing Retreat"
          vertical="retreat"
          category="art-retreat"
          sourcePath="/creative-retreat"
        />
      </div>
    </>
  );
}
