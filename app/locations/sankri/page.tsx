import { redirect } from 'next/navigation';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

export default function SankriLocationRedirect() {
  redirect(buildCanonicalUrl('/retreats/sankri'));
}
