import { Metadata } from 'next';
import TreksClient from './TreksClient';
import { getAllTreks } from '@/lib/treks';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';

export const metadata: Metadata = {
  title: 'Himalayan Treks | Guided Trekking Experiences',
  description:
    'Explore guided treks across the Indian Himalayas — from beginner-friendly valley walks to challenging summit expeditions in Sankri, Chakrata, and beyond.',
  alternates: {
    canonical: buildCanonicalUrl('/treks'),
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

  // ItemList schema — trek catalogue
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Himalayan Treks in Uttarakhand',
    description:
      'Guided trekking experiences across the Indian Himalayas — Chakrata, Sankri, Munsiyari, Lohajung, Joshimath, and beyond.',
    numberOfItems: allTreks.length,
    itemListElement: allTreks.map((trek, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: trek.title,
      url: buildCanonicalUrl(`/treks/location/${trek.locationId}/${trek.slug}`),
      description: trek.description,
    })),
  };

  // FAQPage schema — 8 questions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best time to trek in Uttarakhand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best months for trekking in Uttarakhand are March to June (spring/summer) and September to November (autumn). Winter treks like Kedarkantha and Brahmatal are popular from December to March for snow experiences. Monsoon months (July–August) are generally avoided due to landslide risks and trail closures.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are beginner treks in the Himalayas safe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Beginner treks like the Chakrata Weekend Trek, Budher Caves Trek, and Khaliya Top Trek are designed with safety in mind. All our treks include experienced local mountain guides, small group sizes, and a safety-first approach with proper acclimatisation schedules and first-aid readiness.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should I pack for a Himalayan trek?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Essential items include layered clothing (base layer, insulation, waterproof shell), sturdy trekking shoes with ankle support, a 40–60L backpack, sunscreen, sunglasses, a headlamp, personal medications, and a refillable water bottle. For winter treks, add thermal innerwear, down jackets, and snow gaiters.',
        },
      },
      {
        '@type': 'Question',
        name: 'How difficult are Himalayan treks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Himalayan treks range from easy half-day walks to challenging multi-day expeditions above 4,000 m. Easy treks like Chakrata Weekend Trek require no prior experience. Moderate treks like Kedarkantha involve 5–6 hours of daily walking. Challenging treks like Roopkund demand strong fitness, prior trekking experience, and altitude readiness.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need prior trekking experience?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not for beginner-level treks. Treks graded "Easy" are designed for first-time trekkers and require only basic fitness. For moderate and challenging treks, prior experience with multi-day walks and some altitude exposure is recommended. Our guides assess each group and adjust pacing accordingly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which trek is best for first-time trekkers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Chakrata Weekend Trek is our top recommendation for first-timers. It is a 2-night, 3-day guided trek through gentle forested trails with no altitude concerns. For those wanting something slightly longer, the Khaliya Top Trek in Munsiyari offers beautiful meadow views at moderate altitude with full guide support.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are guided treks necessary in the Himalayas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Strongly recommended, especially for first-time and moderate-level trekkers. Himalayan terrain involves unmarked trails, altitude risks, sudden weather changes, and areas with no mobile connectivity. Local mountain guides know every trail condition, water source, and safe campsite — and carry first-aid and emergency communication.',
        },
      },
      {
        '@type': 'Question',
        name: 'How should I prepare for high-altitude treks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start building cardiovascular fitness at least 4–6 weeks before your trek. Include daily walks, stair climbing, and light jogging. For treks above 4,000 m like Roopkund or Pangarchulla, prior altitude exposure is helpful. On the trek itself, guides enforce gradual altitude gain, proper hydration, and rest-day protocols to minimise altitude sickness risk.',
        },
      },
    ],
  };

  return { itemListSchema, faqSchema };
}

export default function TreksPage() {
  const { itemListSchema, faqSchema } = generateSchemas();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TreksClient />
    </>
  );
}
