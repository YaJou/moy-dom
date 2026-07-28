import { homeCitability } from "@/data/geo";
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

  return (
    <aside
      className="border-y border-border bg-white"
      aria-label="Сведения об авторе и источниках"
    >
      <div className="container-main py-5 sm:py-6">
        <dl className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray">
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray/80">Автор</dt>
            <dd className="mt-0.5 font-medium text-dark">
              <Link href={author.url} className="hover:text-primary">
                {author.legalName}
              </Link>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray/80">
              Опубликовано
            </dt>
            <dd className="mt-0.5 font-medium text-dark">
              <time dateTime={datePublished}>{formatRuDate(datePublished)}</time>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray/80">
              Обновлено
            </dt>
            <dd className="mt-0.5 font-medium text-dark">
              <time dateTime={dateModified}>{formatRuDate(dateModified)}</time>
            </dd>
          </div>
        </dl>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-wide text-gray/80">
            Первоисточники
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {sources.map((source) =>
              source.external ? (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:text-primary-hover"
                    title={source.note}
                  >
                    {source.label}
                  </a>
                </li>
              ) : (
                <li key={source.href}>
                  <Link
                    href={source.href}
                    className="font-medium text-primary hover:text-primary-hover"
                    title={source.note}
                  >
                    {source.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
}
