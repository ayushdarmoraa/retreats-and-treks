import type { Metadata } from 'next';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import ArtRetreatLocationPage from '@/components/ArtRetreatLocationPage';
import { chakrataLocation } from '@/content/locations/chakrata';

const PATH = '/art-retreat-chakrata';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Art Retreat in Chakrata | Retreats And Treks',
  description: 'Art retreat in Chakrata with Himalayan forest silence, creative practice, and small-group retreat experiences.',
  alternates: { canonical: buildCanonicalUrl(PATH) },
};

export default function ArtRetreatChakrataPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Art Retreats', url: buildCanonicalUrl('/retreats/art') },
    { name: 'Art Retreat in Chakrata', url: buildCanonicalUrl(PATH) },
  ]);

  return (
    <TrackedPage page={PATH}>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Art Retreats', href: '/retreats/art' }, { name: 'Chakrata' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ArtRetreatLocationPage content={chakrataLocation} path={PATH} />
    </TrackedPage>
  );
}
