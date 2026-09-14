"use client";

import { useViewingModal } from "@/components/home/ViewingModalProvider";
import { siteConfig } from "@/data/site";
import { analytics } from "@/lib/analytics";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

export function StickyMobileCTA() {
  const { openViewing } = useViewingModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("section");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
      style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
    >
      <div className="container-main flex gap-2 py-3">
        <a
          href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-control border border-border text-sm font-bold text-text"
          onClick={() => analytics.contactClick("phone")}
        >
          <Phone className="h-5 w-5" strokeWidth={1.75} />
          Позвонить
        </a>
        <button
          type="button"
          className="btn-primary h-11 flex-1"
          onClick={() => {
            analytics.viewingFormOpen("mobile-bar");
            openViewing();
          }}
        >
          Записаться
        </button>
      </div>
    </div>
  );
}
