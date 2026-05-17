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
        width={1200}
        height={675}
        quality={90}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
        width={1920}
        height={1080}
        quality={90}
        priority={priority}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
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
        width={1200}
        height={675}
        quality={85}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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