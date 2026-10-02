import type { Metadata } from 'next';
import YogaComparisonPage from '@/components/YogaComparisonPage';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

const PATH = '/compare/7-day-yoga-retreat-vs-10-day-yoga-retreat';

export const metadata: Metadata = {
  title: '7-Day vs 10-Day Yoga Retreat | Retreats And Treks',
  description: 'Compare deeper seven-day and extended ten-day Rishikesh Yoga retreats, prices, programme depth, and upcoming dates.',
  alternates: { canonical: buildCanonicalUrl(PATH) },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <YogaComparisonPage comparisonKey="seven-vs-ten-days" />;
}
