import type { ArticleBlock } from "@/data/blog";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Info, Lightbulb } from "lucide-react";
import Link from "next/link";

const calloutStyles = {
  tip: "border-primary/30 bg-primary-light/40",
  warning: "border-amber-300 bg-amber-50",
  conclusion: "border-green-300 bg-green-50",
  info: "border-border bg-background",
};

const calloutIcons = {
  tip: Lightbulb,
  warning: AlertTriangle,
  conclusion: CheckCircle2,
  info: Info,
};

export function BlogArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose-blog mx-auto max-w-3xl">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="mb-5 text-sm leading-relaxed text-gray sm:text-base"
              >
                {block.text}
              </p>
            );

          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={index}
                  id={block.id}
                  className="mb-4 mt-10 scroll-mt-24 text-xl font-bold text-dark first:mt-0 sm:text-2xl"
                >
                  {block.text}
                </h2>
              );
            }
            return (
              <h3
                key={index}
                id={block.id}
                className="mb-3 mt-8 scroll-mt-24 text-lg font-semibold text-dark sm:text-xl"
              >
                {block.text}
              </h3>
            );

          case "list":
            if (block.ordered) {
              return (
                <ol
                  key={index}
                  className="mb-6 list-decimal space-y-2 pl-5 text-sm text-gray sm:text-base"
                >
                  {block.items.map((item) => (
                    <li key={item.slice(0, 30)} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <ul
                key={index}
                className="mb-6 list-disc space-y-2 pl-5 text-sm text-gray sm:text-base"
              >
                {block.items.map((item) => (
                  <li key={item.slice(0, 30)} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "table":
            return (
              <div key={index} className="mb-8 overflow-x-auto">
                {block.caption && (
                  <p className="mb-2 text-sm font-semibold text-dark">
                    {block.caption}
                  </p>
                )}
                <table className="w-full min-w-[480px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-background">
                      {block.headers.map((header) => (
                        <th
                          key={header}
                          className="p-3 text-left font-semibold text-dark"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b border-border/70 even:bg-background/50"
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className={cn(
                              "p-3 text-gray",
                              cellIndex === 0 && "font-medium text-dark"
                            )}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "callout": {
            const Icon = calloutIcons[block.variant];
            return (
              <div
                key={index}
                className={cn(
                  "mb-6 rounded-card border p-4 sm:p-5",
                  calloutStyles[block.variant]
                )}
              >
                <div className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-dark">{block.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray">
                      {block.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          case "links":
            return (
              <div
                key={index}
                className="mb-8 rounded-card border border-border bg-background p-4 sm:p-5"
              >
                <p className="mb-3 text-sm font-semibold text-dark">
                  {block.title}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {block.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-primary hover:bg-primary-light sm:text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
