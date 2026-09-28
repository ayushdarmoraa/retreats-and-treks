import type { Metadata } from 'next';
import YogaComparisonPage from '@/components/YogaComparisonPage';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

const PATH = '/compare/chakrata-yoga-retreat-vs-rishikesh-yoga-retreat';

export const metadata: Metadata = {
  title: 'Rishikesh vs Chakrata Yoga Retreat | Retreats And Treks',
  description: 'Compare Rishikesh recurring Yoga products with demand-led Chakrata Yoga enquiries. Check published dates and ask for confirmed programme details.',
  alternates: { canonical: buildCanonicalUrl(PATH) },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <YogaComparisonPage comparisonKey="rishikesh-vs-chakrata" />;
}
