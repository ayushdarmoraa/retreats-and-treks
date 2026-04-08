'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const SummerRetreatClient = dynamic(() => import('@/components/SummerRetreatClient'), { ssr: false });

export default function DeferredSummerRetreatClient() {
  return <SummerRetreatClient />;
}
