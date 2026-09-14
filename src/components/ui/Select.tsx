"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icon";

export type SelectOption = string | { value: string; label: string };

function normalizeOptions(options: SelectOption[]) {
  return options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );
}

interface SelectProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  triggerClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  leadingIcon?: ReactNode;
  "aria-label"?: string;
  variant?: "default" | "filter" | "field";
}

export function Select({
  id,
  name,
  value,
  onChange,
  options,
  className,
  triggerClassName,
  placeholder = "Выберите",
  disabled = false,
  leadingIcon,
  "aria-label": ariaLabel,
  variant = "default",
}: SelectProps) {
  const uid = useId();
  const listboxId = `${uid}-listbox`;
  const triggerId = id ?? `${uid}-trigger`;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });

  const items = normalizeOptions(options);
  const selected = items.find((o) => o.value === value);
  const selectedIndex = items.findIndex((o) => o.value === value);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const gap = 6;
    const estimatedH = Math.min(280, items.length * 44 + 16);
    const spaceBelow = window.innerHeight - rect.bottom - gap;
    const placeTop = spaceBelow < estimatedH && rect.top > spaceBelow;
    setPlacement(placeTop ? "top" : "bottom");
    setMenuPos({
      top: placeTop ? rect.top - gap : rect.bottom + gap,
      left: rect.left,
      width: rect.width,
    });
  }, [items.length]);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [open, selectedIndex]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      const t = e.target as Node;
      if (rootRef.current?.contains(t)) return;
      if (listRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  const choose = (next: string) => {
    onChange(next);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, items.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(items.length - 1);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const item = items[activeIndex];
      if (item) choose(item.value);
    }
  };

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => listRef.current?.focus());
  }, [open]);

  const openUp = placement === "top";

  const menu = mounted
    ? createPortal(
        <AnimatePresence>
          {open ? (
            <motion.ul
              key={listboxId}
              ref={listRef}
              id={listboxId}
              role="listbox"
              tabIndex={-1}
              aria-activedescendant={`${uid}-opt-${activeIndex}`}
              aria-labelledby={triggerId}
              className="ks-select-menu"
              style={{
                position: "fixed",
                top: openUp ? undefined : menuPos.top,
                bottom: openUp
                  ? Math.max(0, window.innerHeight - menuPos.top)
                  : undefined,
                left: menuPos.left,
                width: menuPos.width,
                transformOrigin: openUp ? "bottom center" : "top center",
              }}
              initial={{ opacity: 0, y: openUp ? 8 : -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: openUp ? 6 : -6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onKeyDown={onListKeyDown}
            >
              {items.map((item, index) => {
                const isSelected = item.value === value;
                const isActive = index === activeIndex;
                return (
                  <li
                    key={item.value}
                    id={`${uid}-opt-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    data-index={index}
                    className={cn(
                      "ks-select-option",
                      isSelected && "is-selected",
                      isActive && "is-active"
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => choose(item.value)}
                  >
                    <span>{item.label}</span>
                    {isSelected ? (
                      <Icon name="check" className="h-4 w-4 ks-select-check" />
                    ) : null}
                  </li>
                );
              })}
            </motion.ul>
          ) : null}
        </AnimatePresence>,
        document.body
      )
    : null;

  return (
    <div
      ref={rootRef}
      className={cn("ks-select", `ks-select--${variant}`, className)}
    >
      {name ? <input type="hidden" name={name} value={value} readOnly /> : null}
      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        disabled={disabled}
        className={cn(
          "ks-select-trigger",
          leadingIcon && "has-icon",
          open && "is-open",
          triggerClassName
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        onClick={() => {
          if (disabled) return;
          setOpen((v) => !v);
        }}
        onKeyDown={onTriggerKeyDown}
      >
        {leadingIcon ? (
          <span className="ks-select-leading" aria-hidden>
            {leadingIcon}
          </span>
        ) : null}
        <span className={cn("ks-select-value", !selected && "is-placeholder")}>
          {selected?.label ?? placeholder}
        </span>
        <Icon
          name="chevron-down"
          className={cn("ks-select-chevron h-5 w-5", open && "is-open")}
        />
      </button>
      {menu}
    </div>
  );
}
