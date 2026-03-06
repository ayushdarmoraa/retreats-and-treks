import { Metadata } from 'next';
import TrekMonthPage, { generateMonthMetadata, generateMonthStaticParams } from '@/components/TrekMonthPage';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return generateMonthStaticParams('kedarkantha');
}

export async function generateMetadata({ params }: { params: Promise<{ month: string }> }): Promise<Metadata> {
  const { month } = await params;
  return generateMonthMetadata('kedarkantha', month);
}

export default async function KedarkanthaMonthPage({ params }: { params: Promise<{ month: string }> }) {
  const { month } = await params;
  return <TrekMonthPage urlSlug="kedarkantha" month={month} />;
}
