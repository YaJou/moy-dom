import Link from "next/link";
import { navigation, siteConfig } from "@/data/site";
import { HeaderClient } from "./HeaderClient";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/95 backdrop-blur-md">
      <div className="container-main relative">
        <div className="flex h-14 items-center justify-between gap-3 sm:h-16 lg:gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light sm:h-10 sm:w-10">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-primary"
              >
                <path
                  d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V14H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold leading-tight text-dark lg:text-base">
                {siteConfig.name}
              </div>
              <div className="text-[11px] text-gray">{siteConfig.tagline}</div>
            </div>
          </Link>

          <HeaderClient
            navigation={navigation}
            phone={siteConfig.phone}
            phoneHours={siteConfig.phoneHours}
            whatsapp={siteConfig.whatsapp}
            telegram={siteConfig.telegram}
          />
        </div>
      </div>
    </header>
  );
}
