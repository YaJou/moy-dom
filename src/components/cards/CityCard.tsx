import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface CityCardProps {
  name: string;
  housesCount: number;
  projectsCount?: number;
  priceFrom?: number;
  image: string;
  href: string;
}

const cityImages = [
  "https://images.unsplash.com/photo-1513326738677-b964a06d8f8a?w=800&q=80",
  "https://images.unsplash.com/photo-1520106212290-d0b81af694f8?w=800&q=80",
  "https://images.unsplash.com/photo-1547448415-3d79d908137a?w=800&q=80",
];

function formatPriceFrom(price: number) {
  const millions = price / 1_000_000;
  return `от ${millions.toFixed(1).replace(".0", "")} млн`;
}

export function CityCard({
  name,
  housesCount,
  projectsCount,
  priceFrom,
  href,
}: CityCardProps) {
  const index = ["Саратов", "Энгельс", "Балаково"].indexOf(name);
  const imgSrc = cityImages[index >= 0 ? index : 0];

  return (
    <Link
      href={href}
      className="group relative block aspect-[16/10] overflow-hidden rounded-card sm:aspect-[16/9]"
    >
      <Image
        src={imgSrc}
        alt={`Дома в ${name}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-8">
        <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          {name}
        </h3>
        <div className="mt-2 space-y-1 text-sm text-white/85 sm:text-base">
          <p>{housesCount} домов в продаже</p>
          {priceFrom && <p>{formatPriceFrom(priceFrom)}</p>}
          {projectsCount && <p>{projectsCount} проектов</p>}
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors group-hover:text-primary-light sm:mt-4 sm:text-base">
          Смотреть дома
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
