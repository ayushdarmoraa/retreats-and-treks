import type { Metadata } from 'next';
import YogaComparisonPage from '@/components/YogaComparisonPage';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

const PATH = '/compare/rishikesh-yoga-retreat-vs-sankri-yoga-retreat';

export const metadata: Metadata = {
  title: 'Rishikesh vs Sankri Yoga Retreat | Retreats And Treks',
  description: 'Compare recurring published Rishikesh Yoga retreats with custom, demand-led Sankri Yoga enquiries.',
  alternates: { canonical: buildCanonicalUrl(PATH) },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <YogaComparisonPage comparisonKey="rishikesh-vs-sankri" />;
}
