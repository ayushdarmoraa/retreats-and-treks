import { Metadata } from 'next';
import DeparturePage, { generateDepartureMetadata } from '@/components/DeparturePage';

export const metadata: Metadata = generateDepartureMetadata('brahmatal');

export default function BrahmatalDeparturesPage() {
  return <DeparturePage urlSlug="brahmatal" />;
}
