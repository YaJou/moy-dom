"use client";

import { videoData } from "@/data/site";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function VideoSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="video" className="section-padding bg-white">
      <div className="container-main">
        <div className="mb-8 sm:mb-10">
          <h2 className="section-title">{videoData.title}</h2>
          <p className="mt-2 text-sm text-gray sm:text-base">{videoData.subtitle}</p>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-card shadow-card">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
            alt={videoData.title}
            fill
            className="object-cover"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
          <div className="absolute inset-0 bg-black/30" />
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-card transition-transform hover:scale-110 sm:h-20 sm:w-20"
            aria-label="Смотреть видео"
          >
            <Play className="ml-1 h-7 w-7 fill-white sm:h-8 sm:w-8" />
          </button>
          <span className="absolute bottom-4 right-4 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
            {videoData.duration}
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-card">
            <iframe
              src={`${videoData.videoUrl}?autoplay=1`}
              title={videoData.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
