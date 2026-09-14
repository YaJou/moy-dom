import Link from "next/link";
import { navigation, siteConfig } from "@/data/site";
import { HeaderClient } from "./HeaderClient";
import { NavMenu } from "./NavMenu";

export function Header() {
  return (
    <>
      <div className="sticky top-0 z-50 border-b border-border/60 bg-white lg:static lg:z-40">
        <div className="container-main">
          <div className="flex h-14 items-center justify-between gap-3 sm:h-16">
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-soft sm:h-10 sm:w-10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-orange"
                  aria-hidden
                >
                  <path
                    d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V14H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold leading-none text-text sm:text-base">
                  {siteConfig.name}
                </div>
                <div className="mt-1 hidden text-[11px] leading-none text-muted sm:block">
                  {siteConfig.tagline}
                </div>
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
      </div>

      <div className="sticky top-0 z-50 hidden border-b border-border/60 bg-white/95 backdrop-blur-md lg:block">
        <div className="container-main">
          <div className="flex h-11 items-center justify-center">
            <NavMenu items={navigation} />
          </div>
        </div>
      </div>
    </>
  );
}
