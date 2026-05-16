// components/images/index.tsx
import Image from 'next/image';
import type { SiteImage } from '@/lib/images'; 

interface CardImageProps {
  image: SiteImage;
  height?: number;
  className?: string;
}

interface HeroImageProps {
  image: SiteImage;
  height?: number;
  priority?: boolean;
  className?: string;
}

interface SectionImageProps {
  image: SiteImage;
  height?: number;
  className?: string;
}

export function CardImage({ image, height = 250, className }: CardImageProps) {
  return (
    <div style={{ position: 'relative', width: '100%', height: `${height}px`, overflow: 'hidden' }}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        quality={90}
        style={{ objectFit: 'cover' }}
        className={className}
      />
    </div>
  );
}

export function HeroImage({ image, height = 400, priority = false, className }: HeroImageProps) {
  return (
    <div style={{ position: 'relative', width: '100%', height: `${height}px`, overflow: 'hidden' }}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        quality={90}
        priority={priority}
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        className={className}
      />
    </div>
  );
}

export function SectionImage({ image, height = 300, className }: SectionImageProps) {
  return (
    <div style={{ position: 'relative', width: '100%', height: `${height}px`, overflow: 'hidden', borderRadius: '6px' }}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        quality={85}
        style={{ objectFit: 'cover' }}
        className={className}
      />
    </div>
  );
}

export function Gallery({ images }: { images: SiteImage[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
      {images.map((img, i) => (
        <SectionImage key={i} image={img} />
      ))}
    </div>
  );
}