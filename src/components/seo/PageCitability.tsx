import { homeCitability } from "@/data/geo";
import { ArrowUpRight, CalendarDays, RefreshCw, UserRound } from "lucide-react";
import Link from "next/link";

function formatRuDate(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}

export function PageCitability() {
  const { author, datePublished, dateModified, sources } = homeCitability;

  const meta = [
    {
      label: "Автор",
      icon: UserRound,
      content: (
        <Link
          href={author.url}
          className="transition-colors hover:text-orange"
        >
          {author.legalName}
        </Link>
      ),
    },
    {
      label: "Опубликовано",
      icon: CalendarDays,
      content: (
        <time dateTime={datePublished}>{formatRuDate(datePublished)}</time>
      ),
    },
    {
      label: "Обновлено",
      icon: RefreshCw,
      content: (
        <time dateTime={dateModified}>{formatRuDate(dateModified)}</time>
      ),
    },
  ] as const;

  return (
    <aside
      className="border-t border-border bg-page"
      aria-label="Сведения об авторе и источниках"
    >
      <div className="container-main py-8 md:py-10">
        <div className="overflow-hidden rounded-panel border border-border bg-white shadow-card">
          <div className="border-b border-border bg-forest px-5 py-4 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-on-forest">
              О материале на странице
            </p>
            <p className="mt-1 text-sm text-on-forest/90">
              Автор, даты и первоисточники для проверки сведений
            </p>
          </div>

          <dl className="grid gap-0 sm:grid-cols-3">
            {meta.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={
                    index < meta.length - 1
                      ? "border-b border-border px-5 py-5 sm:border-b-0 sm:border-r sm:px-6"
                      : "px-5 py-5 sm:px-6"
                  }
                >
                  <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                    <Icon className="h-3.5 w-3.5 text-orange" strokeWidth={2} />
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold leading-snug text-text">
                    {item.content}
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="border-t border-border bg-page/70 px-5 py-5 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              Первоисточники
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {sources.map((source) => {
                const className =
                  "group inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2 text-[13px] font-medium text-text shadow-sm transition-colors hover:border-orange/40 hover:bg-orange-soft hover:text-orange";

                if (source.external) {
                  return (
                    <li key={source.href}>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                        title={source.note}
                      >
                        {source.label}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-orange" />
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={source.href}>
                    <Link
                      href={source.href}
                      className={className}
                      title={source.note}
                    >
                      {source.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
