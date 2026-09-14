"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  text: string;
}

interface ArticleTocProps {
  items: TocItem[];
  mode?: "mobile" | "desktop" | "both";
}

export function ArticleToc({ items, mode = "both" }: ArticleTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!items.length) return;
    const observers: IntersectionObserver[] = [];
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActiveId(item.id);
        },
        { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  if (!items.length) return null;

  const list = (
    <ol className="ja-toc-list">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={cn("ja-toc-link", activeId === item.id && "is-active")}
            onClick={() => setOpen(false)}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      {mode !== "desktop" ? (
        <nav className="ja-toc-mobile" aria-label="Содержание статьи">
          <button
            type="button"
            className="ja-toc-mobile-toggle"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            Содержание
            <span aria-hidden>{open ? "−" : "+"}</span>
          </button>
          {open ? list : null}
        </nav>
      ) : null}

      {mode !== "mobile" ? (
        <nav className="ja-toc-desktop" aria-label="Содержание статьи">
          <p className="ja-toc-title">Содержание</p>
          {list}
        </nav>
      ) : null}
    </>
  );
}
