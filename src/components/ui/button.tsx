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
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-bold transition-all duration-160 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-orange text-text hover:-translate-y-px hover:bg-orange-hover hover:shadow-card-hover":
              variant === "default",
            "border border-border bg-surface text-text hover:-translate-y-px hover:shadow-card":
              variant === "outline",
            "text-text hover:bg-page": variant === "ghost",
            "bg-forest text-on-forest hover:-translate-y-px hover:bg-forest-hover":
              variant === "forest",
            "border border-white/30 bg-transparent text-on-forest hover:bg-white/10":
              variant === "forest-outline",
          },
          {
            "h-10 px-5 text-sm": size === "sm",
            "h-12 px-5 text-sm": size === "default",
            "h-12 px-6 text-sm": size === "lg",
            "h-11 w-11": size === "icon",
          },
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
