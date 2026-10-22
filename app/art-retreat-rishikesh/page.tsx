import type { Metadata } from 'next';
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from '@/components/seo/Schema';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import ArtRetreatLocationPage from '@/components/ArtRetreatLocationPage';
import { rishikeshLocation } from '@/content/locations/rishikesh';

const PATH = '/art-retreat-rishikesh';
const PAGE_TITLE = 'Art Retreat in Rishikesh | Retreats And Treks';
const PAGE_DESCRIPTION =
  'Explore an art retreat in Rishikesh where the Ganges, ashrams, bridges, and contemplative setting offer subjects for sketching, painting, and visual journaling. Ask about dates and programme details.';

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

export default function ArtRetreatRishikeshPage() {
  const canonicalUrl = buildCanonicalUrl(PATH);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Art Retreats', url: buildCanonicalUrl('/retreats/art') },
    { name: 'Art Retreat in Rishikesh', url: canonicalUrl },
  ]);
  const serviceSchema = generateServiceSchema(
    { title: PAGE_TITLE, description: PAGE_DESCRIPTION },
    canonicalUrl,
    'Rishikesh',
  );
  const faqSchema = generateFAQSchema([...(rishikeshLocation.faq ?? [])]);

  return (
    <TrackedPage page={PATH}>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Art Retreats', href: '/retreats/art' }, { name: 'Rishikesh' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, serviceSchema, faqSchema]) }} />
      <ArtRetreatLocationPage content={rishikeshLocation} path={PATH} />
    </TrackedPage>
  );
}
