import { Metadata } from 'next';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import ChakrataRetreatPage from '../ChakrataRetreatPage';
import retreat from '@/content/retreats/chakrata/meditation-retreat';

const PATH = '/retreats/chakrata/meditation-retreat';

export function generateMetadata(): Metadata {
  return {
    title: 'Chakrata Meditation Retreat | Retreats And Treks',
    description: retreat.description,
    alternates: { canonical: buildCanonicalUrl(PATH) },
    openGraph: {
      title: 'Chakrata Meditation Retreat | Retreats And Treks',
      description: retreat.description,
      url: buildCanonicalUrl(PATH),
      type: 'website',
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages('Chakrata Meditation Retreat | Retreats And Treks'),
    },
  };
}

export default function Page() {
  return (
    <ChakrataRetreatPage
      retreat={{
        ...retreat,
        heroImage: '/Images/experience-hubs/meditation-hero.webp',
        heroAlt: 'Meditation retreat in the forests of Chakrata, Uttarakhand',
        tags: ['Pickup from Dehradun', retreat.duration, 'All-inclusive', 'Max 12 per group'],
        metaTitle: 'Chakrata Meditation Retreat | Retreats And Treks',
      }}
      path={PATH}
      breadcrumbItems={[
        { name: 'Home', href: '/' },
        { name: 'Retreats', href: '/retreats' },
        { name: 'Chakrata', href: '/retreats/chakrata' },
        { name: 'Meditation Retreat' },
      ]}
      waText={`Hi, I'm interested in the ${retreat.title}.`}
    />
  );
}