"use client";

import { analytics } from "@/lib/analytics";
import { reportHouseView } from "@/lib/house-views";
import { trackHouseView } from "@/lib/recently-viewed";
import { useEffect } from "react";

interface TrackHouseViewProps {
  houseId: number;
  title: string;
  city: string;
  district: string;
}

/** Локальная история + серверный счётчик просмотров карточки. */
export function TrackHouseView({
  houseId,
  title,
  city,
  district,
}: TrackHouseViewProps) {
  useEffect(() => {
    trackHouseView(houseId);
    analytics.viewItem(houseId, title);
    reportHouseView({ houseId, title, city, district });
  }, [houseId, title, city, district]);

  return null;
}
