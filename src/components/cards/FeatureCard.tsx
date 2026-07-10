import {
  Flame,
  Thermometer,
  Map,
  Landmark,
  Shield,
  Building2,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  flame: Flame,
  thermometer: Thermometer,
  map: Map,
  landmark: Landmark,
  shield: Shield,
  building: Building2,
};

export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const Icon = iconMap[icon] || Shield;

  return (
    <div className="flex h-full flex-col rounded-card border border-border bg-background p-5 sm:p-6">
      <div className="mb-4 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-light">
          <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
        </div>
        <h3 className="pt-1 text-base font-bold leading-snug text-dark sm:text-lg">
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-gray sm:text-[15px]">
        {description}
      </p>
    </div>
  );
}
