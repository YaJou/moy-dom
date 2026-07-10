"use client";

import { HOUSE_IMAGE_FALLBACK } from "@/lib/house-images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HouseImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
}

export function HouseImage({
  src,
  alt,
  fill,
  className,
  sizes,
  priority,
  objectFit = "cover",
}: HouseImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      key={imgSrc}
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={fill ? undefined : 800}
      height={fill ? undefined : 600}
      className={cn(
        objectFit === "contain" ? "object-contain" : "object-cover",
        className
      )}
      sizes={sizes}
      priority={priority}
      onError={() => setImgSrc(HOUSE_IMAGE_FALLBACK)}
    />
  );
}
