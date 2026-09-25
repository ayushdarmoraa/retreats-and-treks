import { Metadata } from 'next';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import ChakrataRetreatPage from '../ChakrataRetreatPage';
import retreat from '@/content/retreats/chakrata/yoga-retreat';

const PATH = '/retreats/chakrata/yoga-retreat';

export function generateMetadata(): Metadata {
  return {
    title: 'Chakrata Yoga Retreat | Retreats And Treks',
    description: retreat.description,
    alternates: { canonical: buildCanonicalUrl(PATH) },
    openGraph: {
      title: 'Chakrata Yoga Retreat | Retreats And Treks',
      description: retreat.description,
      url: buildCanonicalUrl(PATH),
      type: 'website',
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages('Chakrata Yoga Retreat | Retreats And Treks'),
    },
  };
}

export default function Page() {
  return (
    <ChakrataRetreatPage
      retreat={{
        ...retreat,
        heroImage: '/Images/experience-hubs/yoga-hero.webp',
        heroAlt: 'Yoga retreat in the deodar forests of Chakrata, Uttarakhand',
        tags: ['Pickup from Dehradun', retreat.duration, 'All levels welcome', 'Forest setting at 2,200m'],
        metaTitle: 'Chakrata Yoga Retreat | Retreats And Treks',
      }}
      path={PATH}
      primaryCtaLabel="Plan My Yoga Retreat"
      showYogaAlternative
      breadcrumbItems={[
        { name: 'Home', href: '/' },
        { name: 'Retreats', href: '/retreats' },
        { name: 'Chakrata', href: '/retreats/chakrata' },
        { name: 'Yoga Retreat' },
      ]}
      waText={`Hi, I'm interested in the ${retreat.title}.`}
    />
  );
}
