import Image from "next/image";
import Link from "next/link";
import { IconTelegram } from "@/components/home/icons";
import { navigation, siteConfig } from "@/data/site";
import { HeaderClient } from "./HeaderClient";
import { NavMenu } from "./NavMenu";

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/95 backdrop-blur-md">
      <div className="container-main relative">
        {/* Mobile */}
        <div className="flex h-14 items-center justify-between gap-3 sm:h-16 lg:hidden">
          <Link href="/" className="flex min-w-0 items-center">
            <Image
              src="/images/krovservice-logo.png"
              alt={siteConfig.name}
              width={280}
              height={56}
              className="h-9 w-auto max-w-[200px] object-contain object-left sm:h-10 sm:max-w-[220px]"
              priority
            />
          </Link>
          <HeaderClient
            navigation={navigation}
            phone={siteConfig.phone}
            phoneHours={siteConfig.phoneHours}
            whatsapp={siteConfig.whatsapp}
            telegram={siteConfig.telegram}
          />
        </div>

        {/* Desktop: logo spans both rows */}
        <div className="hidden items-stretch gap-5 lg:flex xl:gap-6">
          <Link
            href="/"
            className="flex shrink-0 items-center self-stretch py-2.5"
          >
            <Image
              src="/images/krovservice-logo.png"
              alt={siteConfig.name}
              width={360}
              height={96}
              className="h-[88px] w-auto max-w-[300px] object-contain object-left xl:h-[96px] xl:max-w-[340px]"
              priority
            />
          </Link>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-14 items-center justify-between gap-4 border-b border-border/50 xl:h-16">
              <div className="flex min-w-0 items-center gap-3 xl:gap-5">
                <div className="flex shrink-0 items-center gap-1.5">
                  <a
                    href={siteConfig.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-[#25D366] transition-colors hover:bg-[#25D366]/10"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon />
                  </a>
                  <a
                    href={siteConfig.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-[#0088cc] transition-colors hover:bg-[#0088cc]/10"
                    aria-label="Telegram"
                  >
                    <IconTelegram className="h-4 w-4" />
                  </a>
                </div>

                <div className="h-9 w-px shrink-0 bg-border" aria-hidden />

                <div className="min-w-0">
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

                <div className="hidden h-9 w-px shrink-0 bg-border xl:block" aria-hidden />

                <div className="hidden min-w-0 xl:block">
                  <p className="whitespace-nowrap text-sm font-semibold leading-none text-text">
                    Саратов · Энгельс · Балаково
                  </p>
                  <p className="mt-1 text-[11px] leading-none text-muted">
                    {siteConfig.address}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <HeaderClient
                  navigation={navigation}
                  phone={siteConfig.phone}
                  phoneHours={siteConfig.phoneHours}
                  whatsapp={siteConfig.whatsapp}
                  telegram={siteConfig.telegram}
                />
              </div>
            </div>

            <div className="flex h-11 items-center">
              <NavMenu items={navigation} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
