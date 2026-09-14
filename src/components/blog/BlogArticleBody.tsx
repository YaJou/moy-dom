import type { ArticleBlock } from "@/data/blog";
import {
  PriorityQuiz,
  ReasonsAccordion,
  TimelineCompare,
} from "@/components/blog/PrichinyInteractive";
import {
  FinishChecklist,
  FinishHousesCta,
  FinishQuiz,
  FinishStagesSwitcher,
  FinishViewingChecklist,
} from "@/components/blog/OtdelkaInteractive";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BlogArticleBodyProps {
  blocks: ArticleBlock[];
  variant?: "default" | "journal";
}

export function BlogArticleBody({
  blocks,
  variant = "default",
}: BlogArticleBodyProps) {
  const journal = variant === "journal";

  return (
    <div className={cn(journal ? "ja-body" : "prose-blog mx-auto max-w-3xl")}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className={
                  journal
                    ? "ja-p"
                    : "mb-5 text-sm leading-relaxed text-gray sm:text-base"
                }
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
                  className={
                    journal
                      ? "ja-h2 scroll-mt-28"
                      : "mb-4 mt-10 scroll-mt-24 text-xl font-bold text-dark first:mt-0 sm:text-2xl"
                  }
                >
                  {block.text}
                </h2>
              );
            }
            return (
              <h3
                key={index}
                id={block.id}
                className={
                  journal
                    ? "ja-h3 scroll-mt-28"
                    : "mb-3 mt-8 scroll-mt-24 text-lg font-semibold text-dark sm:text-xl"
                }
              >
                {block.text}
              </h3>
            );

          case "list":
            if (block.ordered) {
              return (
                <ol
                  key={index}
                  className={
                    journal
                      ? "ja-ol"
                      : "mb-6 list-decimal space-y-2 pl-5 text-sm text-gray sm:text-base"
                  }
                >
                  {block.items.map((item) => (
                    <li key={item.slice(0, 40)}>{item}</li>
                  ))}
                </ol>
              );
            }
            return (
              <ul
                key={index}
                className={
                  journal
                    ? "ja-ul"
                    : "mb-6 list-disc space-y-2 pl-5 text-sm text-gray sm:text-base"
                }
              >
                {block.items.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ul>
            );

          case "table":
            return (
              <div
                key={index}
                className={journal ? "ja-table-wrap" : "mb-8 overflow-x-auto"}
              >
                {block.caption ? (
                  <p
                    className={
                      journal
                        ? "ja-table-caption"
                        : "mb-2 text-sm font-semibold text-dark"
                    }
                  >
                    {block.caption}
                  </p>
                ) : null}
                <table
                  className={
                    journal
                      ? "ja-table"
                      : "w-full min-w-[480px] border-collapse text-sm"
                  }
                >
                  <thead>
                    <tr>
                      {block.headers.map((header) => (
                        <th key={header}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "callout": {
            if (journal) {
              const peach = block.variant === "warning";
              return (
                <aside
                  key={index}
                  className={peach ? "ja-check-peach" : "ja-card"}
                >
                  <p className="ja-callout-title">{block.title}</p>
                  <p>{block.text}</p>
                </aside>
              );
            }
            return (
              <div
                key={index}
                className="mb-6 rounded-card border border-border bg-page p-4 sm:p-5"
              >
                <p className="font-semibold text-dark">{block.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {block.text}
                </p>
              </div>
            );
          }

          case "links":
            if (journal) return null;
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
                        className="inline-flex rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-forest"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );

          case "stats":
            if (journal) return null;
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
                    <p className="text-xl font-bold text-forest">{item.value}</p>
                    <p className="mt-1 text-xs text-muted">{item.label}</p>
                  </div>
                ))}
              </div>
            );

          case "compare":
            return (
              <div
                key={index}
                className={journal ? "ja-table-wrap" : "mb-8 overflow-x-auto"}
              >
                <table
                  className={
                    journal
                      ? "ja-table"
                      : "w-full min-w-[560px] border-collapse text-sm"
                  }
                >
                  <thead>
                    <tr>
                      <th>Параметр</th>
                      <th>{block.leftTitle}</th>
                      <th>{block.rightTitle}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row.label}>
                        <td>{row.label}</td>
                        <td>{row.left}</td>
                        <td>{row.right}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "interactive":
            if (block.kind === "reasons")
              return <ReasonsAccordion key={index} />;
            if (block.kind === "timeline")
              return <TimelineCompare key={index} />;
            if (block.kind === "quiz") return <PriorityQuiz key={index} />;
            if (block.kind === "finish-stages")
              return <FinishStagesSwitcher key={index} />;
            if (block.kind === "finish-checklist")
              return <FinishChecklist key={index} />;
            if (block.kind === "finish-quiz")
              return <FinishQuiz key={index} />;
            if (block.kind === "finish-viewing-checklist")
              return <FinishViewingChecklist key={index} />;
            if (block.kind === "finish-houses-cta")
              return <FinishHousesCta key={index} />;
            return null;

          default:
            return null;
        }
      })}
    </div>
  );
}
