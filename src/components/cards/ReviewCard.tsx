import { Star, Home } from "lucide-react";
import Image from "next/image";

export interface ReviewCardProps {
  name: string;
  city: string;
  text: string;
  rating: number;
  avatar: string;
  houseImage: string;
  houseBought?: string;
  date?: string;
}

const avatarPlaceholders = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
];

const housePlaceholders = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=200&q=80",
];

export function ReviewCard({
  name,
  city,
  text,
  rating,
  houseBought,
  date,
}: ReviewCardProps) {
  const avatarIndex = name.length % avatarPlaceholders.length;

  return (
    <article className="card-base relative flex flex-col p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20">
          <Image
            src={avatarPlaceholders[avatarIndex]}
            alt={name}
            fill
            className="object-cover"
            sizes="56px"
            loading="lazy"
          />
        </div>
        <div>
          <h3 className="font-semibold text-dark">{name}</h3>
          <p className="text-sm text-gray">{city}</p>
          {date && (
            <p className="mt-0.5 text-xs text-gray/80">{date}</p>
          )}
        </div>
      </div>

      {houseBought && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary-light px-3 py-2 text-xs text-primary sm:text-sm">
          <Home className="h-4 w-4 shrink-0" />
          <span className="font-medium">{houseBought}</span>
        </div>
      )}

      <p className="mt-4 flex-1 text-sm leading-relaxed text-gray sm:text-[15px]">
        {text}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
        </div>
        <div className="relative h-14 w-20 overflow-hidden rounded-lg sm:h-16 sm:w-24">
          <Image
            src={housePlaceholders[avatarIndex]}
            alt={`Дом ${name}`}
            fill
            className="object-cover"
            sizes="96px"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}
