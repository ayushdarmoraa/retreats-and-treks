import type { Metadata } from 'next';
import YogaComparisonPage from '@/components/YogaComparisonPage';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

const PATH = '/compare/5-day-yoga-retreat-vs-7-day-yoga-retreat';

export const metadata: Metadata = {
  title: '5-Day vs 7-Day Yoga Retreat | Retreats And Treks',
  description: 'Compare 5-day and 7-day Yoga retreat formats and check linked Rishikesh departures without assuming dates, prices or availability.',
  alternates: { canonical: buildCanonicalUrl(PATH) },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <YogaComparisonPage comparisonKey="five-vs-seven-days" />;
}
