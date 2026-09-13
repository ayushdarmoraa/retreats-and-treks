import type { Metadata } from 'next';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import ArtRetreatLocationPage from '@/components/ArtRetreatLocationPage';
import { rishikeshLocation } from '@/content/locations/rishikesh';

const PATH = '/art-retreat-rishikesh';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Art Retreat in Rishikesh | Retreats And Treks',
  description: 'Art retreat in Rishikesh combining expressive creative practice with the living spiritual landscape of the Ganges.',
  alternates: { canonical: buildCanonicalUrl(PATH) },
};

export default function ArtRetreatRishikeshPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Art Retreats', url: buildCanonicalUrl('/retreats/art') },
    { name: 'Art Retreat in Rishikesh', url: buildCanonicalUrl(PATH) },
  ]);

  return (
    <TrackedPage page={PATH}>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Art Retreats', href: '/retreats/art' }, { name: 'Rishikesh' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ArtRetreatLocationPage content={rishikeshLocation} path={PATH} />
    </TrackedPage>
  );
}
