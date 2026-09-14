"use client";

import { alertsData, siteConfig } from "@/data/site";
import Link from "next/link";
import { useState } from "react";

export function NewsletterCompact() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-5">
      <p className="text-sm font-semibold text-white">
        {alertsData.title}
      </p>
      <Link
        href={siteConfig.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-compact mt-3 inline-flex border border-white/30 bg-transparent text-white hover:bg-white/10"
      >
        Подписаться в Telegram
      </Link>
      <button
        type="button"
        className="mt-2 block text-xs text-muted-on-forest underline hover:text-white"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Скрыть уведомления" : "Другие каналы уведомлений"}
      </button>
      {expanded && (
        <p className="mt-2 text-xs text-muted-on-forest">
          SMS, WhatsApp и ВК — в форме на{" "}
          <Link href="/#viewing" className="underline hover:text-white">
            главной
          </Link>
          . Города: {alertsData.cities.join(", ")}.
        </p>
      )}
    </div>
  );
}
