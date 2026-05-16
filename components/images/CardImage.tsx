import Image from 'next/image';
import type { SiteImage } from '@/lib/images';

interface CardImageProps {
  image: SiteImage;
  /** Aspect ratio via padding-bottom trick. Default '75%' (4:3). */
  aspect?: string;
  className?: string;
}

export default function CardImage({
  image,
  aspect = '75%',
  className,
}: CardImageProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: aspect,
        overflow: 'hidden',
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={800}
        height={600}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  transition: 'transform 0.5s ease',
  display: 'block',
}}
className="card-img-inner"
      />
    </div>
  );
}
