'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { RetreatContent } from '@/types/content';
import type { LocationId } from '@/config/locations';
import { logIntentClick, logWhatsAppOpen } from '@/lib/analytics';
import { getAllRetreatServices } from '@/content/retreats/services';
import HeroSection from '@/components/Retreats/RetreatHero';
import RetreatIntentions from '@/components/Retreats/RetreatIntentions';
import RetreatSignature from '@/components/Retreats/RetreatSignature';
import RetreatFormats from '@/components/Retreats/RetreatFormats';
import RetreatLocations from '@/components/Retreats/RetreatLocations';
import RetreatWhyUs from '@/components/Retreats/RetreatWhyUs';
import RetreatCTA from '@/components/Retreats/RetreatCTA';

interface IntentOption {
  title: string;
  description: string;
}

interface Location {
  id: LocationId;
  name: string;
  tagline: string;
  supportsRetreats: boolean;
  supportsTreks: boolean;
  active: boolean;
  priority: number;
}

interface RetreatsClientProps {
  intentions: IntentOption[];
  whyUsPoints: string[];
  retreatFormats: RetreatContent[];
  locations: Location[];
}

export default function RetreatsClient({
  intentions,
  whyUsPoints,
  retreatFormats,
  locations,
}: RetreatsClientProps) {
  return (
    <>
      <HeroSection/>
      <RetreatIntentions/>
      <RetreatSignature/>
      <RetreatFormats/>
      <RetreatLocations/>
      <RetreatWhyUs/>
      <RetreatCTA/>
    </>
  );
}
