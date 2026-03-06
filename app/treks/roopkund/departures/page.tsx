import { Metadata } from 'next';
import DeparturePage, { generateDepartureMetadata } from '@/components/DeparturePage';

export const metadata: Metadata = generateDepartureMetadata('roopkund');

export default function RoopkundDeparturesPage() {
  return <DeparturePage urlSlug="roopkund" />;
}
