"use client";

import { trackHouseView } from "@/lib/recently-viewed";
import { useEffect } from "react";

/** Пишет дом в «Недавно смотрели» при открытии карточки. */
export function TrackHouseView({ houseId }: { houseId: number }) {
  useEffect(() => {
    trackHouseView(houseId);
  }, [houseId]);

  return null;
}
