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
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        borderRadius: `${rounded}px`,
        overflow: 'hidden',
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
}
