import type { Metadata } from 'next';
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from '@/components/seo/Schema';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import ArtRetreatLocationPage from '@/components/ArtRetreatLocationPage';
import { mussoorieLocation } from '@/content/locations/mussoorie';

const PATH = '/art-retreat-mussoorie';
const PAGE_TITLE = 'Art Retreat in Mussoorie | Retreats And Treks';
const PAGE_DESCRIPTION =
  'Explore an art retreat in Mussoorie shaped by mountain views, changing light, and deodar-lined paths. Find ideas for sketching, journaling, and plein-air practice, and ask about current dates.';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: buildCanonicalUrl(PATH) },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: buildCanonicalUrl(PATH),
    type: 'website',
  },
};

export default function ArtRetreatMussooriePage() {
  const canonicalUrl = buildCanonicalUrl(PATH);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Art Retreats', url: buildCanonicalUrl('/retreats/art') },
    { name: 'Art Retreat in Mussoorie', url: canonicalUrl },
  ]);
  const serviceSchema = generateServiceSchema(
    { title: PAGE_TITLE, description: PAGE_DESCRIPTION },
    canonicalUrl,
    'Mussoorie',
  );
  const faqSchema = generateFAQSchema([...(mussoorieLocation.faq ?? [])]);

  return (
    <TrackedPage page={PATH}>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Art Retreats', href: '/retreats/art' }, { name: 'Mussoorie' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, serviceSchema, faqSchema]) }} />
      <ArtRetreatLocationPage content={mussoorieLocation} path={PATH} />
    </TrackedPage>
  );
}
