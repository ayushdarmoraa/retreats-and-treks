'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const ScrollObserver = dynamic(() => import('@/components/ScrollObserver'), { ssr: false });

export default function DeferredScrollObserver() {
  return <ScrollObserver />;
}
