import Image from 'next/image';
import type { SiteImage } from '@/lib/images';

interface HeroImageProps {
  image: SiteImage;
  /** Fills the hero container. Default height is 420px. */
  height?: number | string;
  /** Dark gradient overlay for text readability. Default true. */
  overlay?: boolean;
  /** Mark as LCP priority image. Default true for heroes. */
  priority?: boolean;
  className?: string;
}

export default function HeroImage({
  image,
  height = 420,
  overlay = true,
  priority = true,
  className,
}: HeroImageProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: typeof height === 'number' ? `${height}px` : height,
        overflow: 'hidden',
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        priority={priority}
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      {overlay && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)',
          }}
        />
      )}
    </div>
  );
}
