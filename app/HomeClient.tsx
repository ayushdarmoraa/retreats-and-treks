'use client';
import { useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { LocationId } from '@/config/locations';
import { logIntentClick, logWhatsAppOpen } from '@/lib/analytics';
import { getAllRetreatServices } from '@/content/retreats/services';
import { getAllTreks } from '@/lib/treks';
import Image from 'next/image';
import { images } from '@/lib/images';
import { CardImage } from '@/components/images';
import HeroSection from '@/components/home/HeroSection';
import PhilosophySection from '@/components/home/PhilosophySection';

interface Location {
  id: LocationId;
  name: string;
  tagline: string;
}

interface HomeClientProps {
  locations: Location[];
}

// Lazy-load below-the-fold content
const BelowFoldHomeContent = dynamic(
  () => import('@/components/BelowFoldHomeContent'),
  { ssr: false, loading: () => null }
);

export default function HomeClient({ locations }: HomeClientProps) {
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

  const intentOptions = [
    {
      key: 'deep-rest',
      title: 'Deep Rest & Renewal',
      description: 'For those who have been running too long.',
    },
    {
      key: 'clarity',
      title: 'Clarity & Emotional Reset',
      description: 'When you need to see what comes next.',
    },
    {
      key: 'threshold',
      title: 'Threshold & Transformation',
      description: 'For those ready to cross into something new.',
    },
    {
      key: 'spiritual',
      title: 'Spiritual Grounding',
      description: 'Connection to practice, tradition, and earth.',
    },
  ];

  return (
    <div>
    <HeroSection/>
<main>

   <PhilosophySection/>

      {/* SECTION 3-11: BELOW-THE-FOLD (LAZY LOADED) */}
      <BelowFoldHomeContent locations={locations} />
    </main>
     </div>
  );
}