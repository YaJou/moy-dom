import { cn } from "@/lib/utils";
import Image from "next/image";

interface EditorialImageProps {
  src: string;
  alt?: string;
  /** CSS aspect-ratio, e.g. "3 / 2" */
  aspect?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

/** Stable framed image for journal articles (no next/image fill). */
export function EditorialImage({
  src,
  alt = "",
  aspect = "3 / 2",
  className,
  imgClassName,
  priority,
  sizes = "(max-width: 768px) 100vw, 1200px",
  width = 1200,
  height = 800,
}: EditorialImageProps) {
  return (
    <div className={cn("pr-img-frame", className)} style={{ aspectRatio: aspect }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={cn("pr-img-el", imgClassName)}
      />
    </div>
  );
}
