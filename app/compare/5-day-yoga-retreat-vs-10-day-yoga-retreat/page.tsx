import type { Metadata } from 'next';
import YogaComparisonPage from '@/components/YogaComparisonPage';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

const PATH = '/compare/5-day-yoga-retreat-vs-10-day-yoga-retreat';

export const metadata: Metadata = {
  title: '5-Day vs 10-Day Yoga Retreat | Retreats And Treks',
  description: 'Compare the 5-day and 10-day Rishikesh Yoga retreat formats, prices, programme depth, and upcoming published dates.',
  alternates: { canonical: buildCanonicalUrl(PATH) },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <YogaComparisonPage comparisonKey="five-vs-ten-days" />;
}
