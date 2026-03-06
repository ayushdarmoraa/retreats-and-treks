import { Metadata } from 'next';
import TrekAttributePage, {
  generateAttributeMetadata,
} from '@/components/TrekAttributePage';
import { TREK_ATTRIBUTE_PAGES } from '@/config/trekAttributes';

const config = TREK_ATTRIBUTE_PAGES.find(
  (c) => c.slug === 'above-4000m-treks-uttarakhand',
)!;

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return generateAttributeMetadata(config);
}

export default function Page() {
  return <TrekAttributePage config={config} />;
}
