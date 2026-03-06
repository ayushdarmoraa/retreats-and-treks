import { Metadata } from 'next';
import TrekMonthPage, { generateMonthMetadata, generateMonthStaticParams } from '@/components/TrekMonthPage';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return generateMonthStaticParams('kuari-pass');
}

export async function generateMetadata({ params }: { params: Promise<{ month: string }> }): Promise<Metadata> {
  const { month } = await params;
  return generateMonthMetadata('kuari-pass', month);
}

export default async function KuariPassMonthPage({ params }: { params: Promise<{ month: string }> }) {
  const { month } = await params;
  return <TrekMonthPage urlSlug="kuari-pass" month={month} />;
}
