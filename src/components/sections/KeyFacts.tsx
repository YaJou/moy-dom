import { homeKeyFacts } from "@/data/geo";

/** Вопрос → прямой ответ в первом абзаце — формат, удобный для цитирования AI */
export function KeyFacts() {
  return (
    <section className="section-padding border-t border-border bg-background">
      <div className="container-main">
        <h2 className="section-title mb-8 sm:mb-10">
          Краткие ответы о готовых домах
        </h2>
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 sm:gap-8">
          {homeKeyFacts.map((fact) => (
            <article key={fact.question}>
              <h3 className="text-lg font-bold leading-snug text-dark sm:text-xl">
                {fact.question}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray sm:text-base">
                {fact.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
