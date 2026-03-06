import { Metadata } from 'next';
import DeparturePage, { generateDepartureMetadata } from '@/components/DeparturePage';

export const metadata: Metadata = generateDepartureMetadata('pangarchulla');

export default function PangarchullaDeparturesPage() {
  return <DeparturePage urlSlug="pangarchulla" />;
}
