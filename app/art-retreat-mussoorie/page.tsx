import type { Metadata } from 'next';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import ArtRetreatLocationPage from '@/components/ArtRetreatLocationPage';
import { mussoorieLocation } from '@/content/locations/mussoorie';

const PATH = '/art-retreat-mussoorie';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Art Retreat in Mussoorie | Retreats And Treks',
  description: 'Art retreat in Mussoorie with Himalayan views, gentle mountain landscapes, and guided creative practice.',
  alternates: { canonical: buildCanonicalUrl(PATH) },
};

export default function ArtRetreatMussooriePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Art Retreats', url: buildCanonicalUrl('/retreats/art') },
    { name: 'Art Retreat in Mussoorie', url: buildCanonicalUrl(PATH) },
  ]);

  return (
    <TrackedPage page={PATH}>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Art Retreats', href: '/retreats/art' }, { name: 'Mussoorie' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ArtRetreatLocationPage content={mussoorieLocation} path={PATH} />
    </TrackedPage>
  );
}
