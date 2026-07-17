import { seoIntroData } from "@/data/homepage";
import Image from "next/image";

const defaultImage =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80";

interface SeoIntroProps {
  title?: string;
  paragraphs?: string[];
  image?: string;
  imageAlt?: string;
}

export function SeoIntro({
  title = seoIntroData.title,
  paragraphs = seoIntroData.paragraphs,
  image = defaultImage,
  imageAlt,
}: SeoIntroProps = {}) {
  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card lg:aspect-[5/4]">
            <Image
              src={image}
              alt={imageAlt ?? title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold leading-tight text-dark sm:text-3xl lg:text-[32px]">
              {title}
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-gray sm:text-base">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
