"use client";

import { NavMenu } from "@/components/layout/NavMenu";
import { Button } from "@/components/ui/button";
import type { NavItem } from "@/data/site";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function MessengerIcon({ type }: { type: "whatsapp" | "telegram" }) {
  if (type === "telegram") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.14.121.1.154.234.17.331.015.098.034.321.019.495z" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884" />
    </svg>
  );
}

interface HeaderClientProps {
  navigation: NavItem[];
  phone: string;
  phoneHours: string;
  whatsapp: string;
  telegram: string;
}

export function HeaderClient({
  navigation,
  phone,
  phoneHours,
  whatsapp,
  telegram,
}: HeaderClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden min-w-0 flex-1 justify-center lg:flex">
        <NavMenu items={navigation} />
      </div>

      <div className="hidden shrink-0 items-center gap-1.5 lg:flex xl:gap-3">
        <div className="flex items-center gap-1">
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-[#25D366] transition-colors hover:bg-[#25D366]/10"
            aria-label="WhatsApp"
          >
            <MessengerIcon type="whatsapp" />
          </a>
          <a
            href={telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-[#0088cc] transition-colors hover:bg-[#0088cc]/10"
            aria-label="Telegram"
          >
            <MessengerIcon type="telegram" />
          </a>
        </div>
        <div className="text-right">
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="block text-sm font-semibold leading-tight text-dark transition-colors hover:text-primary"
          >
            {phone}
          </a>
          <span className="hidden text-[11px] text-gray xl:block">{phoneHours}</span>
        </div>
        <Button asChild size="sm" variant="outline" className="hidden h-9 rounded-full px-3 text-[12px] xl:inline-flex xl:px-4 xl:text-[13px]">
          <Link href="/#consultation">Подобрать дом</Link>
        </Button>
        <Button size="sm" className="h-9 rounded-full px-3 text-[12px] xl:px-4 xl:text-[13px]">
          Обратный звонок
        </Button>
      </div>

      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-border bg-white p-3 shadow-card lg:hidden">
          <nav className="rounded-2xl bg-background p-1.5">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-dark"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 space-y-3 rounded-2xl bg-background p-3">
            <div className="flex gap-2">
              <a href={whatsapp} className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-border text-sm font-medium text-[#25D366]">
                WhatsApp
              </a>
              <a href={telegram} className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-border text-sm font-medium text-[#0088cc]">
                Telegram
              </a>
            </div>
            <a href={`tel:${phone.replace(/\D/g, "")}`} className="flex items-center gap-2 text-sm font-semibold">
              <Phone className="h-4 w-4 text-primary" /> {phone}
            </a>
            <Button asChild className="w-full rounded-full"><Link href="/#consultation">Подобрать дом</Link></Button>
          </div>
        </div>
      )}
    </>
  );
}
