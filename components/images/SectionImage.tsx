import Image from 'next/image';
import type { SiteImage } from '@/lib/images';

interface SectionImageProps {
  image: SiteImage;
  /** Max width of the image. Default '100%'. */
  maxWidth?: number | string;
  /** Border radius. Default 8px. */
  rounded?: number;
  className?: string;
}

export default function SectionImage({
  image,
  maxWidth = '100%',
  rounded = 8,
  className,
}: SectionImageProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        borderRadius: `${rounded}px`,
        overflow: 'hidden',
        aspectRatio: '16 / 9',
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}
