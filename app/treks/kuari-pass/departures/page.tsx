import { Metadata } from 'next';
import DeparturePage, { generateDepartureMetadata } from '@/components/DeparturePage';

export const metadata: Metadata = generateDepartureMetadata('kuari-pass');

export default function KuariPassDeparturesPage() {
  return <DeparturePage urlSlug="kuari-pass" />;
}
