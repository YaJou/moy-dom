import { homeFaqItems } from "@/data/home-nav";
import { IconPlus } from "./icons";

export function HomeFAQ() {
  return (
    <section id="faq" className="bg-page py-10">
      <div className="container-main">
        <div className="grid gap-8 lg:grid-cols-[384px_1fr] lg:gap-12">
          <div>
            <h2 className="h2-desktop text-text">
              Перед покупкой обычно спрашивают
            </h2>
            <p className="mt-3 text-base text-muted">
              Ответы на вопросы о доме и сделке
            </p>
          </div>

          <div className="divide-y divide-border">
            {homeFaqItems.map((item) => (
              <details
                key={item.id}
                className="group min-h-[56px] py-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-text marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="shrink-0 text-muted transition-transform group-open:rotate-45">
                    <IconPlus />
                  </span>
                </summary>
                <p className="mt-3 pr-8 text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
