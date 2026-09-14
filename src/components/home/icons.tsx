import { Icon } from "@/components/ui/Icon";

type IconClassProps = { className?: string };

export function IconHouse({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="home" className={className} />;
}

export function IconArrow({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="arrow-right" className={className} />;
}

export function IconMapPin({ className = "h-4 w-4" }: IconClassProps) {
  return <Icon name="map-pin" className={className} />;
}

function LeafGlyph({
  className = "h-5 w-5",
  strokeWidth = 1.75,
}: IconClassProps & { strokeWidth?: number }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M20.5 3.5C10 3 3 7 3 13a7 7 0 0 0 7 7c6 0 10-7 10.5-16.5Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 21 16 8"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconLeaf({ className = "h-5 w-5" }: IconClassProps) {
  return <LeafGlyph className={className} />;
}

export function IconLeafOutline({ className = "h-14 w-14" }: IconClassProps) {
  return <LeafGlyph className={className} strokeWidth={1.35} />;
}

export function IconPhoto({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="image" className={className} />;
}

export function IconCamera({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="camera" className={className} />;
}

export function IconEye({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="image" className={className} />;
}

export function IconPlus({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="plus" className={className} />;
}

export function IconCompare({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="compare" className={className} />;
}

export function IconHeart({
  className = "h-5 w-5",
  filled = false,
}: IconClassProps & { filled?: boolean }) {
  if (filled) {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden>
        <path
          d="M20.5 5.5a5.1 5.1 0 0 0-7.2 0L12 6.8l-1.3-1.3a5.1 5.1 0 0 0-7.2 7.2L12 21l8.5-8.3a5.1 5.1 0 0 0 0-7.2Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return <Icon name="heart" className={className} />;
}

export function IconLayout({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="rooms" className={className} />;
}

/** Рубль в наборе нет — компактный глиф */
export function IconRuble({ className = "h-5 w-5" }: IconClassProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 4h7a4.5 4.5 0 0 1 0 9H7V4Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M7 13v7M11 16h5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconBed({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="bed" className={className} />;
}

export function IconSofa({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="sofa" className={className} />;
}

export function IconStorage({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="wardrobe" className={className} />;
}

export function IconTelegram({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="telegram" className={className} />;
}

export function IconPhone({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="phone" className={className} />;
}

export function IconCheck({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="circle-check" className={className} />;
}

export function IconFilter({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="filter" className={className} />;
}

export function IconChevronDown({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="chevron-down" className={className} />;
}

export function IconChevronLeft({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="chevron-left" className={className} />;
}

export function IconChevronRight({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="chevron-right" className={className} />;
}

export function IconMaximize({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="maximize" className={className} />;
}

export function IconClose({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="close" className={className} />;
}

export function IconMenu({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="menu" className={className} />;
}

export function IconSend({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="send" className={className} />;
}

export function IconCalendar({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="calendar" className={className} />;
}

export function IconClock({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="clock" className={className} />;
}

export function IconUser({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="user" className={className} />;
}

export function IconArrowUpRight({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="arrow-up-right" className={className} />;
}

export function IconFaucet({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="faucet" className={className} />;
}

export function IconClipboard({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="clipboard" className={className} />;
}

export function IconKey({ className = "h-5 w-5" }: IconClassProps) {
  return <Icon name="key" className={className} />;
}

export { Icon } from "@/components/ui/Icon";
export type { IconName } from "@/components/ui/Icon";
