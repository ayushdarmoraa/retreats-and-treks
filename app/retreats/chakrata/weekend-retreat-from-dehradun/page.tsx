import { Metadata } from 'next';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import ChakrataRetreatPage from '../ChakrataRetreatPage';
import retreat from '@/content/retreats/chakrata/weekend-retreat-from-dehradun';

const PATH = '/retreats/chakrata/weekend-retreat-from-dehradun';

export function generateMetadata(): Metadata {
  return {
    title: 'Chakrata Weekend Retreat | Retreats And Treks',
    description: retreat.description,
    alternates: { canonical: buildCanonicalUrl(PATH) },
    openGraph: {
      title: 'Chakrata Weekend Retreat | Retreats And Treks',
      description: retreat.description,
      url: buildCanonicalUrl(PATH),
      type: 'website',
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages('Chakrata Weekend Retreat | Retreats And Treks'),
    },
  };
}

export default function Page() {
  return (
    <ChakrataRetreatPage
      retreat={{
        ...retreat,
        heroImage: '/Images/trek/region/chakraweekend.webp',
        heroAlt: 'Weekend retreat campsite in Chakrata forest, Uttarakhand',
        tags: ['Pickup from Dehradun', retreat.duration, 'All meals included', 'Ideal first retreat'],
        metaTitle: 'Chakrata Weekend Retreat | Retreats And Treks',
      }}
      path={PATH}
      breadcrumbItems={[
        { name: 'Home', href: '/' },
        { name: 'Retreats', href: '/retreats' },
        { name: 'Chakrata', href: '/retreats/chakrata' },
        { name: 'Weekend Retreat' },
      ]}
      waText={`Hi, I'm interested in the ${retreat.title}.`}
    />
  );
}