import type { PortfolioImage } from "@/data/built-portfolio";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function IllustrationBadge({
  className,
}: {
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md bg-black/55 px-2 py-1 text-[11px] font-semibold text-white",
        className
      )}
    >
      Временная иллюстрация
    </span>
  );
}

export function PortfolioImageFrame({
  image,
  className,
  priority = false,
  sizes,
  objectFit = "cover",
}: {
  image: PortfolioImage;
  className?: string;
  priority?: boolean;
  sizes: string;
  objectFit?: "cover" | "contain";
}) {
  return (
    <div className={cn("relative overflow-hidden bg-page", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className={objectFit === "contain" ? "object-contain" : "object-cover"}
        sizes={sizes}
      />
      {image.imageKind === "illustration" && (
        <div className="pointer-events-none absolute left-3 top-3 z-10">
          <IllustrationBadge />
        </div>
      )}
    </div>
  );
}
