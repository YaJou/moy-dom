"use client";

import { homeNavigation } from "@/data/home-nav";
import { siteConfig } from "@/data/site";
import { useViewingModal } from "@/components/home/ViewingModalProvider";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IconTelegram } from "@/components/home/icons";

interface HeaderClientProps {
  navigation: typeof homeNavigation;
  telegram: string;
}

export function HeaderClient({ navigation, telegram }: HeaderClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { openViewing } = useViewingModal();

  return (
    <>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <a
          href={telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#0088cc] transition-colors hover:bg-[#0088cc]/10"
          aria-label="Telegram"
        >
          <IconTelegram className="h-5 w-5" />
        </a>
        <button
          type="button"
          className="btn-header-cta hidden sm:inline-flex"
          onClick={() => openViewing()}
        >
          Записаться на просмотр
        </button>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-control border border-border lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-border bg-surface p-4 shadow-card lg:hidden">
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-control px-3 py-3 text-sm font-semibold text-text"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/catalog/"
              className="rounded-control px-3 py-3 text-sm font-semibold text-text"
              onClick={() => setIsOpen(false)}
            >
              Каталог
            </Link>
            <Link
              href="/contacts/"
              className="rounded-control px-3 py-3 text-sm font-semibold text-text"
              onClick={() => setIsOpen(false)}
            >
              Контакты
            </Link>
          </nav>
          <a
            href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
            className="mt-4 block text-sm font-bold text-text"
          >
            {siteConfig.phone}
          </a>
          <button
            type="button"
            className="btn-primary mt-4 w-full"
            onClick={() => {
              setIsOpen(false);
              openViewing();
            }}
          >
            Записаться на просмотр
          </button>
        </div>
      )}
    </>
  );
}
