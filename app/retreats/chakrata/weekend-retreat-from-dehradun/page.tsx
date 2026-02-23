import { Metadata } from 'next';
import LandingLayout from '@/components/layouts/LandingLayout';
import retreat from '@/content/retreats/chakrata/weekend-retreat-from-dehradun';
import { generateRetreatSchema, generateFAQSchema } from '@/components/seo/Schema';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema } from '@/components/seo/Breadcrumbs';

export function generateMetadata(): Metadata {
  const path = '/retreats/chakrata/weekend-retreat-from-dehradun';

  return {
    title: retreat.title,
    description: retreat.description,
    alternates: {
      canonical: buildCanonicalUrl(path),
    },
  };
}

export default function Page() {
  const retreatSchema = generateRetreatSchema(retreat);
  const faqSchema = generateFAQSchema(retreat.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Retreats', path: '/retreats/chakrata' },
    {
      name: 'Weekend Retreat From Dehradun',
      path: '/retreats/chakrata/weekend-retreat-from-dehradun',
    },
  ]);

  return (
    <LandingLayout
      title={retreat.title}
      description={retreat.description}
    >
      {/* JSON-LD: TouristTrip */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(retreatSchema),
        }}
      />

      {/* JSON-LD: FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* JSON-LD: Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <section>
        <h2>Highlights</h2>
        <ul>
          {retreat.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Itinerary</h2>
        <ol>
          {retreat.itinerary.map((day) => (
            <li key={day}>{day}</li>
          ))}
        </ol>
      </section>
    </LandingLayout>
  );
}
