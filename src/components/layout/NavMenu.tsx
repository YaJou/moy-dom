"use client";

import type { NavItem } from "@/data/site";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface NavMenuProps {
  items: NavItem[];
}

const linkClass =
  "inline-flex h-9 shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-2.5 text-[13px] font-medium text-text transition-colors hover:bg-page hover:text-orange xl:px-3";

function NavLabel({ item }: { item: NavItem }) {
  if (item.shortLabel) {
    return (
      <>
        <span className="2xl:hidden">{item.shortLabel}</span>
        <span className="hidden 2xl:inline">{item.label}</span>
      </>
    );
  }
  return <>{item.label}</>;
}

function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          linkClass,
          open && "bg-page text-orange"
        )}
      >
        <NavLabel item={item} />
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-200",
            open && "rotate-180 text-orange"
          )}
        />
      </button>

      <AnimatePresence>
        {open && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-[calc(100%+8px)] z-50 min-w-[200px] -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-white py-1.5 shadow-card">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="block whitespace-nowrap px-4 py-2.5 text-[13px] font-medium text-text transition-colors hover:bg-orange-soft hover:text-orange"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavLink({ item }: { item: NavItem }) {
  return (
    <Link href={item.href} className={linkClass}>
      <NavLabel item={item} />
    </Link>
  );
}

export function NavMenu({ items }: NavMenuProps) {
  return (
    <nav className="hidden items-center gap-0.5 lg:flex">
      {items.map((item) =>
        item.children ? (
          <NavDropdown key={item.href} item={item} />
        ) : (
          <NavLink key={item.href} item={item} />
        )
      )}
    </nav>
  );
}
