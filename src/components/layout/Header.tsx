import Link from "next/link";
import { homeNavigation } from "@/data/home-nav";
import { siteConfig } from "@/data/site";
import { HeaderClient } from "./HeaderClient";

function LogoMark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className="text-orange"
      aria-hidden
    >
      <path
        d="M4 14L16 4L28 14V26C28 26.5523 27.5523 27 27 27H21V19H11V27H5C4.44772 27 4 26.5523 4 26V14Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <div className="container-main relative">
        <div className="flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <LogoMark />
            <div>
              <div className="text-xl font-bold leading-[26px] tracking-tight text-text">
                {siteConfig.name}
              </div>
              <div className="hidden text-[11px] leading-4 text-muted sm:block">
                {siteConfig.tagline}
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Основная навигация">
            {homeNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-text transition-colors hover:text-orange"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <HeaderClient navigation={homeNavigation} telegram={siteConfig.telegram} />
        </div>
      </div>
    </header>
  );
}
