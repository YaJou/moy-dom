import Link from "next/link";
import { navigation, siteConfig } from "@/data/site";
import { HeaderClient } from "./HeaderClient";
import { NavMenu } from "./NavMenu";

function MessengerIcon({ type }: { type: "whatsapp" | "telegram" }) {
  if (type === "telegram") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.14.121.1.154.234.17.331.015.098.034.321.019.495z" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884" />
    </svg>
  );
}

export function Header() {
  return (
    <>
      <div className="relative sticky top-0 z-50 border-b border-border/60 bg-white lg:static lg:z-40">
        <div className="container-main">
          <div className="grid h-14 grid-cols-[1fr_auto] items-center gap-3 sm:h-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-2.5 justify-self-start"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-soft sm:h-10 sm:w-10">
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

            <div className="hidden items-center gap-4 justify-self-center lg:flex xl:gap-5">
              <div className="flex items-center gap-1.5">
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-[#25D366] transition-colors hover:bg-[#25D366]/10"
                  aria-label="WhatsApp"
                >
                  <MessengerIcon type="whatsapp" />
                </a>
                <a
                  href={siteConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-[#0088cc] transition-colors hover:bg-[#0088cc]/10"
                  aria-label="Telegram"
                >
                  <MessengerIcon type="telegram" />
                </a>
              </div>

              <div className="h-9 w-px bg-border" aria-hidden />

              <div className="text-center">
                <a
                  href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                  className="block whitespace-nowrap text-sm font-semibold leading-none text-text transition-colors hover:text-orange"
                >
                  {siteConfig.phone}
                </a>
                <span className="mt-1 block text-[11px] leading-none text-muted">
                  {siteConfig.phoneHours}
                </span>
              </div>

              <div className="hidden h-9 w-px bg-border xl:block" aria-hidden />

              <div className="hidden text-center xl:block">
                <p className="whitespace-nowrap text-sm font-semibold leading-none text-text">
                  Саратов · Энгельс · Балаково
                </p>
                <p className="mt-1 text-[11px] leading-none text-muted">
                  {siteConfig.address}
                </p>
              </div>
            </div>

            <div className="justify-self-end">
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
