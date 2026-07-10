import { HouseImage } from "@/components/ui/HouseImage";
import type { HouseDetailContent } from "@/data/house-detail";
import type { House } from "@/types/house";

interface HouseFloorPlanProps {
  house: House;
  detail: HouseDetailContent;
}

export function HouseFloorPlan({ house, detail }: HouseFloorPlanProps) {
  if (!detail.floorPlanImage || detail.floorPlanRooms.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-dark sm:text-2xl">Планировка дома</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border bg-[#f5f5f5]">
          <HouseImage
            src={detail.floorPlanImage}
            alt={`Планировка — ${house.title}`}
            fill
            objectFit="contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {detail.floorPlanRooms.map((room) => (
            <div
              key={room.name}
              className="rounded-xl border border-border bg-background p-4"
            >
              <h3 className="font-semibold text-dark">{room.name}</h3>
              <p className="mt-1 text-sm text-gray">{room.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
