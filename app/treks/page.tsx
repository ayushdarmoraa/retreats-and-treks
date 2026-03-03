import { Metadata } from 'next';
import TreksClient from './TreksClient';

export const metadata: Metadata = {
  title: 'Himalayan Treks | Guided Trekking Experiences',
  description:
    'Explore guided treks across the Indian Himalayas — from beginner-friendly valley walks to challenging summit expeditions in Sankri, Chakrata, and beyond.',
  alternates: {
    canonical: '/treks',
  },
};

export default function TreksPage() {
  return <TreksClient />;
}
