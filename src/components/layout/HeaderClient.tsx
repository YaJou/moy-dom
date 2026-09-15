"use client";

import { Button } from "@/components/ui/button";
import { useViewingModal } from "@/components/home/ViewingModalProvider";
import { IconClose, IconMenu, IconPhone } from "@/components/home/icons";
import type { NavItem } from "@/data/site";
import Link from "next/link";
import { useState } from "react";

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
  whatsapp,
  telegram,
}: HeaderClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { openViewing } = useViewingModal();

  return (
    <>
      <div className="hidden items-center gap-2.5 lg:flex">
        <Button
          size="sm"
          variant="outline"
          className="h-9 rounded-full px-3.5 text-[13px]"
          onClick={() => openViewing({ intent: "viewing" })}
        >
          Подобрать дом
        </Button>
        <Button
          size="sm"
          className="h-9 rounded-full px-3.5 text-[13px]"
          onClick={() => openViewing({ intent: "callback" })}
        >
          Обратный звонок
        </Button>
      </div>

      <div className="flex items-center gap-2 lg:hidden">
        <a
          href={`tel:${phone.replace(/\D/g, "")}`}
          className="hidden whitespace-nowrap text-sm font-semibold text-text sm:block"
        >
          {phone}
        </a>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-page"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isOpen}
        >
          {isOpen ? <IconClose className="h-4 w-4" /> : <IconMenu className="h-4 w-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-border bg-white p-3 shadow-card lg:hidden">
          <nav className="rounded-2xl bg-page p-1.5">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-text"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 space-y-3 rounded-2xl bg-page p-3">
            <div className="flex gap-2">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-border text-sm font-medium text-[#25D366]"
              >
                WhatsApp
              </a>
              <a
                href={telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-border text-sm font-medium text-[#0088cc]"
              >
                Telegram
              </a>
            </div>
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="flex items-center gap-2 text-sm font-semibold text-text"
            >
              <IconPhone className="h-4 w-4 text-orange" /> {phone}
            </a>
            <Button
              className="w-full rounded-full"
              onClick={() => {
                setIsOpen(false);
                openViewing({ intent: "viewing" });
              }}
            >
              Подобрать дом
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
