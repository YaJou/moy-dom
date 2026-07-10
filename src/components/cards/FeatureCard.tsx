import {
  Flame,
  Thermometer,
  Paintbrush,
  Map,
  Landmark,
  Shield,
  Building2,
  FileCheck,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  flame: Flame,
  thermometer: Thermometer,
  paintbrush: Paintbrush,
  map: Map,
  landmark: Landmark,
  shield: Shield,
  building: Building2,
  filecheck: FileCheck,
};

export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const Icon = iconMap[icon] || Shield;

  return (
    <div className="rounded-card border border-border bg-white p-5 shadow-card sm:p-6">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light">
        <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
      </div>
      <h3 className="text-base font-semibold text-dark sm:text-lg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray">{description}</p>
    </div>
  );
}
