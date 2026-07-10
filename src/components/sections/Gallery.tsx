"use client";

import { galleryData } from "@/data/site";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const galleryImages = [
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
];

type GalleryItem = { id: number; alt: string; type: "photo" | "video" };

const items: GalleryItem[] = galleryData.map((item, i) => ({
  ...item,
  type: i === 2 || i === 4 ? "video" : "photo",
}));

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="mb-8 flex items-center justify-between gap-4 sm:mb-10 lg:mb-12">
          <h2 className="section-title">Построенные дома</h2>
          <Link href="/built" className="section-link shrink-0">
            Смотреть все работы
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="columns-2 gap-4 sm:columns-3 lg:gap-5">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightbox(index)}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-card"
            >
              <div className={`relative w-full ${index % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                <Image
                  src={galleryImages[index % galleryImages.length]}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading="lazy"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                      <Play className="h-5 w-5 fill-primary text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal
        >
          <div className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-card">
            <Image
              src={galleryImages[lightbox % galleryImages.length]}
              alt={items[lightbox].alt}
              width={900}
              height={600}
              className="max-h-[85vh] w-auto object-contain"
            />
            {items[lightbox].type === "video" && (
              <p className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1.5 text-sm text-white">
                Видеообзор дома
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
