import Image from "next/image";
import Link from "next/link";

export interface BlogCardProps {
  title: string;
  date: string;
  image: string;
  href: string;
}

const blogImages = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
];

export function BlogCard({ title, date, image, href }: BlogCardProps) {
  const index = title.length % blogImages.length;

  return (
    <Link href={href} className="card-base group block transition-shadow hover:shadow-cardHover">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={blogImages[index]}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
