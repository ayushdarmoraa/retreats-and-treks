import { Metadata } from 'next';
import LandingLayout from '@/components/layouts/LandingLayout';
import retreat from '@/content/retreats/chakrata/yoga-retreat';
import { generateRetreatSchema, generateFAQSchema } from '@/components/seo/Schema';

export function generateMetadata(): Metadata {
  return {
    title: retreat.title,
    description: retreat.description,
  };
}

export default function Page() {
  const retreatSchema = generateRetreatSchema(retreat);
  const faqSchema = generateFAQSchema(retreat.faqs);

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
