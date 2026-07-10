import type { HouseDetailContent } from "@/data/house-detail";

interface HouseTechTableProps {
  detail: HouseDetailContent;
}

export function HouseTechTable({ detail }: HouseTechTableProps) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-dark sm:text-2xl">
        Технические характеристики
      </h2>
      <div className="mt-5 overflow-x-auto rounded-card border border-border">
        <table className="w-full min-w-0 text-sm">
          <tbody>
            {detail.technicalTable.map((row, i) => (
              <tr
                key={row.label}
                className={i % 2 === 0 ? "bg-background" : "bg-white"}
              >
                <td className="w-2/5 border-b border-border px-3 py-3 font-medium text-gray sm:px-5">
                  {row.label}
                </td>
                <td className="break-words border-b border-border px-3 py-3 text-dark sm:px-5">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
