'use client';

import dynamic from 'next/dynamic';
import type { FC } from 'react';

const DynamicReviewerSection = dynamic(
  () => import('@/components/DynamicReviewerSection'),
  { ssr: false, loading: () => null }
);

interface Props {
  finderRatings: Record<string, { value: number; count: number }>;
}

const DeferredReviewerSection: FC<Props> = (props) => {
  return <DynamicReviewerSection {...props} />;
};

export default DeferredReviewerSection;
