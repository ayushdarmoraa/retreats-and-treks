import { Metadata } from 'next';
import TrekMonthPage, { generateMonthMetadata, generateMonthStaticParams } from '@/components/TrekMonthPage';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return generateMonthStaticParams('dayara');
}

export async function generateMetadata({ params }: { params: Promise<{ month: string }> }): Promise<Metadata> {
  const { month } = await params;
  return generateMonthMetadata('dayara', month);
}

export default async function DayaraMonthPage({ params }: { params: Promise<{ month: string }> }) {
  const { month } = await params;
  return <TrekMonthPage urlSlug="dayara" month={month} />;
}
