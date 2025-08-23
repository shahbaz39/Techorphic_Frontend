// src/components/StrapiImage.tsx
import Image from 'next/image';
import React from 'react';

interface StrapiImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

const StrapiImage: React.FC<StrapiImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}) => {
  const imageUrl = src.startsWith('/') ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${src}` : src;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={85}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};

export default StrapiImage;