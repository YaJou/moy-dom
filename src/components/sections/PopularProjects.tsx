import { projectsData } from "@/data/site";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, DoorOpen, Maximize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projectImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80",
];

export function PopularProjects() {
  return (
    <section className="section-padding border-y border-border bg-background">
      <div className="container-main">
        <div className="mb-8 flex items-center justify-between gap-4 sm:mb-10 lg:mb-12">
          <h2 className="section-title">Популярные проекты</h2>
          <Link href="/projects" className="section-link shrink-0">
            Все проекты
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
          {projectsData.map((project, index) => (
            <Link
              key={project.id}
              href={project.href}
              className="card-base group block transition-shadow hover:shadow-cardHover"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={projectImages[index]}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 rounded-lg bg-primary px-2.5 py-1 text-xs font-bold text-white">
                  Популярный
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-base font-semibold text-dark sm:text-lg">
                  {project.title}
                </h3>
                <div className="mt-3 flex items-center gap-4 text-sm text-gray">
                  <span className="flex items-center gap-1.5">
                    <Maximize2 className="h-4 w-4 text-primary" />
                    {project.area} м²
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DoorOpen className="h-4 w-4 text-primary" />
                    {project.rooms} комн.
                  </span>
                </div>
                <p className="mt-3 text-lg font-bold text-dark">
                  от {formatPrice(project.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
