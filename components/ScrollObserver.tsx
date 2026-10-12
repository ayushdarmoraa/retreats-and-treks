'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureAttribution } from '@/utils/attribution';

export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution(new URLSearchParams(window.location.search));
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
  }, [pathname]);

  return null;
}
