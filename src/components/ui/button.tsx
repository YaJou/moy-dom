import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost" | "forest" | "forest-outline";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all duration-[160ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && size === "default" && "btn-primary",
          variant === "default" && size === "sm" && "btn-compact bg-orange text-text hover:bg-orange-hover hover:-translate-y-px",
          variant === "default" && size === "lg" && "btn-primary h-12 px-6",
          variant === "outline" && "btn-secondary",
          variant === "ghost" && "h-12 px-5 text-sm text-text hover:bg-page",
          variant === "forest" && "h-12 px-5 text-sm bg-forest text-on-forest hover:bg-forest-hover",
          variant === "forest-outline" && "h-12 px-5 text-sm border border-white/30 bg-transparent text-on-forest hover:bg-white/10",
          size === "icon" && "h-11 w-11 rounded-control p-0",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
