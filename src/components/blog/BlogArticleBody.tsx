import type { ArticleBlock } from "@/data/blog";
import {
  PriorityQuiz,
  ReasonsAccordion,
  TimelineCompare,
} from "@/components/blog/PrichinyInteractive";
import {
  FinishChecklist,
  FinishQuiz,
  FinishStagesSwitcher,
} from "@/components/blog/OtdelkaInteractive";
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
                    <li key={item.slice(0, 40)} className="leading-relaxed">
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
                  <li key={item.slice(0, 40)} className="leading-relaxed">
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
                    <li key={link.href + link.label}>
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

          case "stats":
            return (
              <div
                key={index}
                className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
              >
                {block.items.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-card border border-border bg-background p-4 text-center"
                  >
                    <p className="text-xl font-bold text-primary sm:text-2xl">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-gray sm:text-sm">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            );

          case "compare":
            return (
              <div key={index} className="mb-8 overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="bg-background p-3 text-left font-medium text-gray">
                        Параметр
                      </th>
                      <th className="bg-background p-3 text-left font-semibold text-dark">
                        {block.leftTitle}
                      </th>
                      <th className="bg-primary-light/50 p-3 text-left font-semibold text-primary">
                        {block.rightTitle}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-border/70"
                      >
                        <td className="p-3 font-medium text-dark">
                          {row.label}
                        </td>
                        <td
                          className={cn(
                            "p-3 text-gray",
                            row.winner === "left" &&
                              "bg-green-50 font-semibold text-dark"
                          )}
                        >
                          {row.left}
                        </td>
                        <td
                          className={cn(
                            "p-3 text-gray",
                            row.winner === "right" &&
                              "bg-primary-light/60 font-semibold text-primary"
                          )}
                        >
                          {row.right}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "interactive":
            if (block.kind === "reasons") {
              return <ReasonsAccordion key={index} />;
            }
            if (block.kind === "timeline") {
              return <TimelineCompare key={index} />;
            }
            if (block.kind === "quiz") {
              return <PriorityQuiz key={index} />;
            }
            if (block.kind === "finish-stages") {
              return <FinishStagesSwitcher key={index} />;
            }
            if (block.kind === "finish-checklist") {
              return <FinishChecklist key={index} />;
            }
            if (block.kind === "finish-quiz") {
              return <FinishQuiz key={index} />;
            }
            return null;

          default:
            return null;
        }
      })}
    </div>
  );
}
