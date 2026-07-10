"use client";

import { getHouseCover } from "@/lib/house-images";
import { formatPrice } from "@/lib/utils";
import type { House } from "@/types/house";
import type * as L from "leaflet";
import { useEffect, useRef } from "react";

interface HousesMapProps {
  houses: House[];
  selectedId: number | null;
  onSelect: (house: House) => void;
}

function buildPopupHtml(house: House): string {
  const image = getHouseCover(house);
  const price = formatPrice(house.price);
  return `
    <div class="house-map-card">
      <img src="${image}" alt="${house.title}" class="house-map-card__img" />
      <div class="house-map-card__body">
        <p class="house-map-card__title">${house.title}</p>
        <p class="house-map-card__meta">${house.district} · ${house.area} м² · ${house.land} сот.</p>
        <p class="house-map-card__price">${price}</p>
        <a href="/catalog/${house.id}" class="house-map-card__link">Смотреть объект →</a>
      </div>
    </div>
  `;
}

function createHouseIcon(L: typeof import("leaflet"), active: boolean) {
  return L.divIcon({
    className: "",
    html: `<div class="house-map-pin${active ? " house-map-pin--active" : ""}"><span></span></div>`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -42],
  });
}

function updateMarkerIcons(
  L: typeof import("leaflet"),
  markers: Map<number, L.Marker>,
  activeId: number | null
) {
  markers.forEach((marker, id) => {
    marker.setIcon(createHouseIcon(L, id === activeId));
  });
}

function openHousePopup(
  map: L.Map,
  marker: L.Marker,
  house: House,
  animate = true
) {
  if (animate) {
    map.setView([house.lat, house.lng], 17, { animate: true });
  }
  marker.openPopup();
}

async function loadLeaflet(): Promise<typeof import("leaflet")> {
  if (typeof window === "undefined") {
    throw new Error("Leaflet runs only in browser");
  }

  const win = window as Window & { L?: typeof import("leaflet") };
  if (win.L) return win.L;

  if (!document.querySelector('link[data-leaflet-css]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.dataset.leafletCss = "true";
    document.head.appendChild(link);
  }

  await new Promise<void>((resolve, reject) => {
    if (win.L) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Leaflet"));
    document.body.appendChild(script);
  });

  if (!win.L) throw new Error("Leaflet not available");
  return win.L;
}

export function HousesMap({ houses, selectedId, onSelect }: HousesMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<number, L.Marker>>(new Map());
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const skipSelectionEffectRef = useRef(false);
  const onSelectRef = useRef(onSelect);

  onSelectRef.current = onSelect;

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!containerRef.current || houses.length === 0) return;

      const L = await loadLeaflet();
      if (cancelled || !containerRef.current) return;

      leafletRef.current = L;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current.clear();
      }

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        maxZoom: 19,
      }).addTo(map);

      const bounds = L.latLngBounds(houses.map((h) => [h.lat, h.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 15 });

      houses.forEach((house) => {
        const marker = L.marker([house.lat, house.lng], {
          icon: createHouseIcon(L, false),
        });

        marker.bindPopup(buildPopupHtml(house), {
          className: "house-map-popup",
          minWidth: 260,
          maxWidth: 280,
          autoClose: true,
          closeOnClick: true,
        });

        marker.on("click", () => {
          skipSelectionEffectRef.current = true;
          onSelectRef.current(house);
          updateMarkerIcons(L, markersRef.current, house.id);
          openHousePopup(map, marker, house);
        });

        marker.addTo(map);
        markersRef.current.set(house.id, marker);
      });

      mapRef.current = map;
    }

    init().catch(console.error);

    return () => {
      cancelled = true;
      const map = mapRef.current;
      if (map) {
        map.remove();
        mapRef.current = null;
        markersRef.current.clear();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [houses]);

  // Выбор из списка справа — приблизить и открыть карточку
  useEffect(() => {
    if (skipSelectionEffectRef.current) {
      skipSelectionEffectRef.current = false;
      return;
    }

    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map) return;

    updateMarkerIcons(L, markersRef.current, selectedId);

    if (selectedId == null) return;

    const house = houses.find((h) => h.id === selectedId);
    const marker = markersRef.current.get(selectedId);
    if (!house || !marker) return;

    openHousePopup(map, marker, house);
  }, [selectedId, houses]);

  return (
    <div
      ref={containerRef}
      className="h-full min-h-[320px] w-full rounded-card sm:min-h-[400px]"
      aria-label="Интерактивная карта объектов"
    />
  );
}
