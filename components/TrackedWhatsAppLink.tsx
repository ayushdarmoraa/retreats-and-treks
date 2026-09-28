'use client';

import type { ReactNode, CSSProperties } from 'react';
import { track } from '@/utils/telemetry';
import { buildAttributionQuery, captureAttribution } from '@/utils/attribution';

interface TrackedWhatsAppLinkProps {
  href: string;
  sourcePath: string;
  location?: string;
  intent?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export default function TrackedWhatsAppLink({
  href,
  sourcePath,
  location,
  intent,
  className,
  style,
  children,
}: TrackedWhatsAppLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={() => {
        const searchParams = new URLSearchParams(window.location.search);
        captureAttribution(searchParams);
        track({
          event: 'whatsapp_click',
          from: sourcePath,
          meta: {
            location: location || '',
            intent: intent || '',
            source: sourcePath,
            source_utm: buildAttributionQuery(searchParams),
          },
        });
      }}
    >
      {children}
    </a>
  );
}
