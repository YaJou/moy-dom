export interface StatItemProps {
  value: string;
  label: string;
}

export function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col items-center px-4 py-2 text-center sm:px-6">
      <div className="text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
        {value}
      </div>
      <div className="mt-2 text-sm text-gray sm:text-base">{label}</div>
    </div>
  );
}
