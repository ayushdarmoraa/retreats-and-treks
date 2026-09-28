import type { Metadata } from 'next';
import YogaComparisonPage from '@/components/YogaComparisonPage';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

const PATH = '/compare/yoga-retreat-vs-yoga-teacher-training';

export const metadata: Metadata = {
  title: 'Yoga Retreat vs Yoga Teacher Training | Retreats And Treks',
  description: 'Understand the difference between personal-practice Yoga retreats and the separate, currently unpublished Yoga Teacher Training enquiry path.',
  alternates: { canonical: buildCanonicalUrl(PATH) },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <YogaComparisonPage comparisonKey="retreat-vs-ttc" />;
}
