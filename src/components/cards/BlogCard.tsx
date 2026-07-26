import Image from "next/image";
import Link from "next/link";

export interface BlogCardProps {
  title: string;
  date: string;
  image: string;
  href: string;
}

export function BlogCard({ title, date, image, href }: BlogCardProps) {
  return (
    <Link href={href} className="card-base group block transition-shadow hover:shadow-cardHover">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#f0f0f0]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          loading="lazy"
        />
      </div>
      <div className="p-4 sm:p-5">
        <time className="text-xs text-gray sm:text-sm">{date}</time>
        <h3 className="mt-2 text-base font-semibold leading-snug text-dark transition-colors group-hover:text-primary sm:text-lg">
          {title}
        </h3>
      </div>
    </Link>
  );
}
