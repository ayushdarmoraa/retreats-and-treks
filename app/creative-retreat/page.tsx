import { Metadata } from 'next';
import { getExperiencePage } from '@/config/experiencePages';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateServiceSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import ExperienceHubPage from '@/components/ExperienceHubPage';
import PrimaryCTA from '@/components/PrimaryCTA';
import TrackedFAQ from '@/components/TrackedFAQ';

const PAGE = getExperiencePage('creative-retreat')!;
const PATH = '/creative-retreat';

const FAQ_ITEMS = [
  {
    question: 'What happens in a creative healing retreat?',
    answer:
      'You spend seven days creating art, practising yoga, and resting in nature. Mornings include gentle movement and guided reflection. Afternoons are dedicated creative studio time with facilitated watercolour, ink, charcoal, clay, and mixed media sessions. Evenings wind down with journalling or group sharing. There is no fixed curriculum — the facilitator meets you where you are.',
  },
  {
    question: 'Do I need art experience to join?',
    answer:
      'No. Most participants have not created art since school. The emphasis is on process — the experience of creating — not technical skill or finished quality. The facilitator guides you through accessible techniques that require no prior training.',
  },
  {
    question: 'What art activities are included?',
    answer:
      'Watercolour, ink drawing, charcoal sketching, clay work, collage, mixed media, nature journalling, and land art using found materials. You rotate through mediums across the week. All materials are provided.',
  },
  {
    question: 'How does art help emotional healing?',
    answer:
      'Art bypasses verbal processing and accesses emotions that are difficult to articulate. The act of creating externalises inner states, making them visible and workable. Combined with yoga and nature immersion, creative practice helps release stored tension, process grief or burnout, and rebuild a sense of agency.',
  },
  {
    question: 'What should I bring to the retreat?',
    answer:
      'Comfortable clothing for yoga and outdoor walks, a personal journal if you keep one, and any art supplies you are attached to (though all materials are provided). A detailed packing list is sent after booking. Travel light — the retreat supplies everything you need to create.',
  },
];

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return {
    title: PAGE.title,
    description: PAGE.metaDescription,
    alternates: { canonical: buildCanonicalUrl(`/${PAGE.slug}`) },
    openGraph: {
      title: PAGE.title,
      description: PAGE.metaDescription,
      url: buildCanonicalUrl(`/${PAGE.slug}`),
      type: 'website',
    },
  };
}

export default function CreativeHealingRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const serviceSchema = generateServiceSchema(
    { title: 'Creative Healing Retreat', description: 'Emotional healing through art, yoga, and nature.' },
    buildCanonicalUrl(PATH),
    'Himalayas',
  );
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <>
      <ExperienceHubPage
        page={PAGE}
        breadcrumbItems={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Creative Healing Retreat' },
        ]}
      />
      <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 var(--space-md) var(--space-2xl)' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema]) }}
        />
        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        <PrimaryCTA
          label="Join the Creative Healing Retreat"
          vertical="retreat"
          category="art-retreat"
          sourcePath="/creative-retreat"
        />
      </div>
    </>
  );
}
