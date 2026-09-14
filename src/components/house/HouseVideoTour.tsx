import { HouseImage } from "@/components/ui/HouseImage";
import type { HouseDetailContent } from "@/data/house-detail";
import type { House } from "@/types/house";

interface HouseVideoTourProps {
  house: House;
  detail: HouseDetailContent;
}

/** Показывать только при реальном videoUrl. */
export function HouseVideoTour({ house, detail }: HouseVideoTourProps) {
  if (!detail.videoUrl) return null;

  return (
    <section className="hp-section" id="video">
      <h2 className="hp-h2">Посмотрите дом изнутри</h2>
      <p className="hp-lead">Видеообзор — {house.title}.</p>
      <div className="hp-video">
        <iframe
          src={detail.videoUrl}
          title={`Посмотрите дом изнутри — ${house.title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
