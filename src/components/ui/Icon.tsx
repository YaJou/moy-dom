import { cn } from "@/lib/utils";

export const ICON_NAMES = [
  "home",
  "leaf",
  "map",
  "map-pin",
  "area",
  "bed",
  "rooms",
  "sofa",
  "wardrobe",
  "bath",
  "garage",
  "car",
  "floors",
  "ruler",
  "maximize",
  "filter",
  "search",
  "heart",
  "compare",
  "chevron-down",
  "chevron-up",
  "chevron-left",
  "chevron-right",
  "arrow-right",
  "arrow-up-right",
  "external-link",
  "plus",
  "minus",
  "close",
  "menu",
  "check",
  "circle-check",
  "shield",
  "phone",
  "telegram",
  "play",
  "video",
  "camera",
  "image",
  "calendar",
  "clock",
  "mail",
  "message",
  "send",
  "bell",
  "building",
  "document",
  "download",
  "clipboard",
  "water",
  "faucet",
  "flame",
  "thermometer",
  "underfloor-heating",
  "brick-wall",
  "foundation",
  "roof",
  "calculator",
  "info",
  "user",
  "users",
  "key",
  "tree",
  "star",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

interface IconProps {
  name: IconName;
  className?: string;
  title?: string;
}

/** Иконка из набора Кров-Сервис (sprite в /icons/). Цвет — через currentColor. */
export function Icon({ name, className = "h-5 w-5", title }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("shrink-0", className)}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      aria-label={title}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <use href={`/icons/krov-service-sprite.svg#ks-${name}`} />
    </svg>
  );
}
