"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ConsentCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ConsentCheckbox({
  id,
  checked,
  onChange,
  required = true,
  className,
  children,
}: ConsentCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-gray sm:text-[13px]",
        className
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        required={required}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-primary focus:ring-primary"
      />
      <span>{children}</span>
    </label>
  );
}

export function PrivacyPolicyLink({ className }: { className?: string }) {
  return (
    <Link
      href="/privacy/"
      className={cn(
        "font-medium text-primary underline-offset-2 hover:underline",
        className
      )}
    >
      Политике обработки персональных данных
    </Link>
  );
}
