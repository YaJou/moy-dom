import { trustPoints } from "@/data/house-detail";
import { Check } from "lucide-react";

export function HouseTrustBlock() {
  return (
    <ul className="mt-4 space-y-1.5 border-t border-border pt-4">
      {trustPoints.map((point) => (
        <li key={point} className="flex items-center gap-2 text-xs text-gray">
          <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
          {point}
        </li>
      ))}
    </ul>
  );
}
