// components/BelowFoldHomeContent.tsx
'use client';

import { useEffect } from 'react';
import type { LocationId } from '@/config/locations';
import { 
  FeaturedRetreats,
  FeaturedLocations,
  TwoPathsSection,
  PopularTreks,
  HowItWorks,
  NotAPackageDeal,
  Testimonials,
  LifeAtRetreat,
  DayInYourRetreat,
  FinalCTA,
} from '@/components/home';

interface Location {
  id: LocationId;
  name: string;
  tagline: string;
}

interface BelowFoldHomeContentProps {
  locations: Location[];
}

export default function BelowFoldHomeContent({ locations }: BelowFoldHomeContentProps) {
  const whatsappMessage = `Hi, I'm interested in learning more about your Himalayan journeys.`;
  const whatsappLink = `https://wa.me/919760446101?text=${encodeURIComponent(whatsappMessage)}`;

  // ── Scroll fade-in observer ──
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-fade, .scroll-fade-stagger');
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sf-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <FeaturedRetreats />
      <FeaturedLocations locations={locations} />
      <TwoPathsSection />
      <PopularTreks />
      <HowItWorks />
      <NotAPackageDeal />
      <Testimonials />
      <LifeAtRetreat />
      <DayInYourRetreat />
      <FinalCTA whatsappLink={whatsappLink} />
    </>
  );
}