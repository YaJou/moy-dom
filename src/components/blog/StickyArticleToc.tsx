"use client";

import { ArticleToc, type TocItem } from "@/components/blog/ArticleToc";
import { useEffect, useRef, useState } from "react";

interface StickyArticleTocProps {
  items: TocItem[];
}

/**
 * Desktop TOC: fixed while reading the article body.
 * CSS sticky is unreliable here because of layout/overflow ancestors.
 */
export function StickyArticleToc({ items }: StickyArticleTocProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [fixed, setFixed] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const update = () => {
      const slot = slotRef.current;
      const box = boxRef.current;
      if (!slot || !box) return;

      const layout = slot.closest(".ja-layout") as HTMLElement | null;
      if (!layout) return;

      const layoutRect = layout.getBoundingClientRect();
      const slotRect = slot.getBoundingClientRect();
      const top = 88;
      const boxH = box.offsetHeight;
      const bottomLimit = layoutRect.bottom - boxH - 24;

      if (layoutRect.top <= top && bottomLimit > top) {
        setFixed(true);
        setStyle({
          position: "fixed",
          top: `${top}px`,
          left: `${slotRect.left}px`,
          width: `${slotRect.width}px`,
          zIndex: 30,
        });
      } else if (bottomLimit <= top) {
        // Stick to bottom of layout when scrolling past
        setFixed(true);
        setStyle({
          position: "absolute",
          top: "auto",
          bottom: "24px",
          left: "0",
          width: "100%",
          zIndex: 30,
        });
      } else {
        setFixed(false);
        setStyle({});
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <div ref={slotRef} className="ja-aside-slot">
      <div
        ref={boxRef}
        className={fixed ? "ja-aside-fixed" : "ja-aside-sticky"}
        style={fixed ? style : undefined}
      >
        <ArticleToc items={items} mode="desktop" />
      </div>
    </div>
  );
}
