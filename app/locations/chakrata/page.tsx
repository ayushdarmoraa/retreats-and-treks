import { redirect } from 'next/navigation';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

export default function ChakrataLocationRedirect() {
  redirect(buildCanonicalUrl('/retreats/chakrata'));
}
