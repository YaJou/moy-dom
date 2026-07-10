"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { Phone } from "lucide-react";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white/95 p-3 backdrop-blur-md lg:hidden">
      <div className="container-main flex gap-2">
        <a
          href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-white py-3 text-sm font-semibold text-dark"
        >
          <Phone className="h-4 w-4 text-primary" />
          Позвонить
        </a>
        <Button className="flex-1 rounded-xl">Заказать звонок</Button>
      </div>
    </div>
  );
}
