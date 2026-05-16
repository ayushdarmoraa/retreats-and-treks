import Image from 'next/image';
import type { SiteImage } from '@/lib/images';

interface GalleryProps {
  images: SiteImage[];
  /** Columns at desktop width. Default 3. */
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function Gallery({
  images: items,
  columns = 3,
  className,
}: GalleryProps) {
  if (items.length === 0) return null;

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '0.75rem',
      }}
    >
      {items.map((img, i) => (
        <div
          key={img.src}
          style={{
            position: 'relative',
            paddingBottom: '75%',
            overflow: 'hidden',
            borderRadius: '8px',
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${Math.round(100 / columns)}vw`}
            loading={i < columns ? 'eager' : 'lazy'}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      ))}
    </div>
  );
}
