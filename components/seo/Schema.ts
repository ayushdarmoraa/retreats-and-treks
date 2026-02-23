import { RetreatContent } from '@/types/content';
import { TrekContent } from '@/types/content';
import { buildCanonicalUrl } from './Metadata';
import type { RetreatReview } from '@/content/reviews';

const BRAND_NAME = 'Retreats And Treks';

interface LocationSchemaInput {
  name: string;
  tagline: string;
  geo: { latitude: number; longitude: number };
  address: { region: string; country: string };
  touristType: readonly string[];
}

export function generateRetreatSchema(retreat: RetreatContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: retreat.title,
    description: retreat.description,
    touristType: retreat.retreatType,
    itinerary: retreat.itinerary.map((item) => ({
      '@type': 'TouristAttraction',
      name: item,
    })),
    provider: {
      '@type': 'Organization',
      name: BRAND_NAME,
    },
  };
}

export function generateTrekSchema(trek: TrekContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: trek.title,
    description: trek.description,
    itinerary: trek.itinerary.map((item) => ({
      '@type': 'TouristAttraction',
      name: item,
    })),
    provider: {
      '@type': 'Organization',
      name: BRAND_NAME,
    },
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBlogPostingSchema({
  title,
  description,
  publishedAt,
  lastUpdated,
  url,
}: {
  title: string;
  description: string;
  publishedAt: string;
  lastUpdated?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: lastUpdated ?? publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${BRAND_NAME} — Himalayan Retreats & Treks`,
    url: buildCanonicalUrl('/'),
    description:
      'Curated weekend retreats and guided treks in the Himalayas, starting from Dehradun.',
    inLanguage: 'en-IN',
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_NAME,
    url: buildCanonicalUrl('/'),
    logo: buildCanonicalUrl('/logo.png'),
    description:
      'Retreats And Treks organizes curated Himalayan retreats and trekking experiences designed for rest, reset, and conscious travel.',
    email: 'info@retreatsandtreks.com',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    knowsAbout: [
      'Himalayan retreats',
      'Yoga retreats in India',
      'Wellness retreats',
      'Mountain trekking',
      'Chakrata retreats',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [],
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BRAND_NAME,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dehradun',
      addressRegion: 'Uttarakhand',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Uttarakhand',
    },
    url: buildCanonicalUrl('/'),
    email: 'info@retreatsandtreks.com',
  };
}

export function generateServiceSchema(
  service: { title: string; description: string },
  canonicalUrl: string,
  locationName: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: canonicalUrl,
    provider: {
      '@type': 'Organization',
      name: BRAND_NAME,
    },
    areaServed: {
      '@type': 'TouristDestination',
      name: locationName,
    },
  };
}

export function generateCollectionPageSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: BRAND_NAME,
    },
  };
}

export function generateItemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function generateTouristDestinationSchema(
  location: LocationSchemaInput,
  canonicalUrl: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: location.name,
    description: location.tagline,
    url: canonicalUrl,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.geo.latitude,
      longitude: location.geo.longitude,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.name,
      addressRegion: location.address.region,
      addressCountry: location.address.country,
    },
    touristType: [...location.touristType],
  };
}

/**
 * Generate Review JSON-LD objects for schema.org/Service or schema.org/TouristTrip.
 * Only call when reviews.length > 0.
 */
export function generateReviewSchemas(
  reviews: RetreatReview[],
  serviceTitle: string,
  serviceUrl: string,
) {
  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Service',
      name: serviceTitle,
      url: serviceUrl,
      provider: {
        '@type': 'Organization',
        name: BRAND_NAME,
      },
    },
    author: {
      '@type': 'Person',
      name: review.participantName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
  }));
}

/**
 * Generate AggregateRating JSON-LD.
 * Only call when reviewCount >= 2.
 */
export function generateAggregateRatingSchema(
  ratingValue: number,
  reviewCount: number,
  serviceTitle: string,
  serviceUrl: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceTitle,
    url: serviceUrl,
    provider: {
      '@type': 'Organization',
      name: BRAND_NAME,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue,
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
