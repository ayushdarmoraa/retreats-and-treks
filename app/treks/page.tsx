import { Metadata } from 'next';
import TreksClient from './TreksClient';
import { getAllTreks } from '@/lib/treks';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateItemListSchema,
} from '@/components/seo/Schema';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Himalayan Treks | Guided Trekking Experiences',
  description:
    'Explore guided treks across the Indian Himalayas — from beginner-friendly valley walks to challenging summit expeditions in Sankri, Chakrata, and beyond.',
  alternates: {
    canonical: buildCanonicalUrl('/treks'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Himalayan Treks | Guided Trekking Experiences',
    description:
      'Explore guided treks across the Indian Himalayas — from beginner-friendly valley walks to challenging summit expeditions in Sankri, Chakrata, and beyond.',
    url: buildCanonicalUrl('/treks'),
    type: 'website',
    siteName: 'Retreats And Treks',
    locale: 'en_IN',
    images: buildOgImages('Himalayan Treks | Guided Trekking Experiences'),
  },
};

/* ── JSON-LD Schema generation ── */
function generateSchemas() {
  const allTreks = getAllTreks();

  const canonicalUrl = buildCanonicalUrl('/treks');

  // ItemList schema — trek catalogue
  const itemListSchema = generateItemListSchema(
    allTreks.map((trek) => ({
      name: trek.title,
      url: buildCanonicalUrl(`/treks/location/${trek.locationId}/${trek.slug}`),
    }))
  );

  // FAQPage schema — 8 questions
  const faqSchema = generateFAQSchema([
    {
      question: 'What is the best time to trek in Uttarakhand?',
      answer: 'The best months for trekking in Uttarakhand are March to June (spring/summer) and September to November (autumn). Winter treks like Kedarkantha and Brahmatal are popular from December to March for snow experiences. Monsoon months (July–August) are generally avoided due to landslide risks and trail closures.',
    },
    {
      question: 'Are beginner treks in the Himalayas safe?',
      answer: 'Yes. Beginner treks like the Chakrata Weekend Trek, Budher Caves Trek, and Khaliya Top Trek are designed with safety in mind. All our treks include experienced local mountain guides, small group sizes, and a safety-first approach with proper acclimatisation schedules and first-aid readiness.',
    },
    {
      question: 'What should I pack for a Himalayan trek?',
      answer: 'Essential items include layered clothing (base layer, insulation, waterproof shell), sturdy trekking shoes with ankle support, a 40–60L backpack, sunscreen, sunglasses, a headlamp, personal medications, and a refillable water bottle. For winter treks, add thermal innerwear, down jackets, and snow gaiters.',
    },
    {
      question: 'How difficult are Himalayan treks?',
      answer: 'Himalayan treks range from easy half-day walks to challenging multi-day expeditions above 4,000 m. Easy treks like Chakrata Weekend Trek require no prior experience. Moderate treks like Kedarkantha involve 5–6 hours of daily walking. Challenging treks like Roopkund demand strong fitness, prior trekking experience, and altitude readiness.',
    },
    {
      question: 'Do I need prior trekking experience?',
      answer: 'Not for beginner-level treks. Treks graded "Easy" are designed for first-time trekkers and require only basic fitness. For moderate and challenging treks, prior experience with multi-day walks and some altitude exposure is recommended. Our guides assess each group and adjust pacing accordingly.',
    },
    {
      question: 'Which trek is best for first-time trekkers?',
      answer: 'The Chakrata Weekend Trek is our top recommendation for first-timers. It is a 2-night, 3-day guided trek through gentle forested trails with no altitude concerns. For those wanting something slightly longer, the Khaliya Top Trek in Munsiyari offers beautiful meadow views at moderate altitude with full guide support.',
    },
    {
      question: 'Are guided treks necessary in the Himalayas?',
      answer: 'Strongly recommended, especially for first-time and moderate-level trekkers. Himalayan terrain involves unmarked trails, altitude risks, sudden weather changes, and areas with no mobile connectivity. Local mountain guides know every trail condition, water source, and safe campsite — and carry first-aid and emergency communication.',
    },
    {
      question: 'How should I prepare for high-altitude treks?',
      answer: 'Start building cardiovascular fitness at least 4–6 weeks before your trek. Include daily walks, stair climbing, and light jogging. For treks above 4,000 m like Roopkund or Pangarchulla, prior altitude exposure is helpful. On the trek itself, guides enforce gradual altitude gain, proper hydration, and rest-day protocols to minimise altitude sickness risk.',
    },
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: canonicalUrl },
  ]);

  return { itemListSchema, faqSchema, breadcrumbSchema };
}

export default function TreksPage() {
  const { itemListSchema, faqSchema, breadcrumbSchema } = generateSchemas();

  return (
    <>
      <AutoArticleSchema
        title="Himalayan Treks — Guided Trekking Experiences in Uttarakhand"
        description="Explore guided treks across the Indian Himalayas — from beginner-friendly valley walks to challenging summit expeditions in Sankri, Chakrata, and beyond."
        path="/treks"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TreksClient />
    </>
  );
}
