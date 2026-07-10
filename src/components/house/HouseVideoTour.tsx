import type { HouseDetailContent } from "@/data/house-detail";
import type { House } from "@/types/house";
import { Play } from "lucide-react";

interface HouseVideoTourProps {
  house: House;
  detail: HouseDetailContent;
}

export function HouseVideoTour({ house, detail }: HouseVideoTourProps) {
  if (!detail.videoUrl) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-dark sm:text-2xl">Видеообзор</h2>
      <div className="relative mt-5 aspect-video overflow-hidden rounded-card border border-border bg-dark">
        <iframe
          src={detail.videoUrl}
          title={`Видеообзор — ${house.title}`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}

/** Placeholder when no video URL — shows attractive block with CTA */
export function HouseVideoPlaceholder({ house }: { house: House }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-dark sm:text-2xl">Видеообзор</h2>
      <div className="relative mt-5 flex aspect-video items-center justify-center overflow-hidden rounded-card border border-border bg-gradient-to-br from-dark to-dark/80">
        <div className="text-center text-white">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
            <Play className="h-7 w-7 fill-white text-white" />
          </div>
          <p className="text-sm text-white/80">
            Видеообзор {house.title} — по запросу на просмотре
          </p>
        </div>
      </div>
    </section>
  );
}
