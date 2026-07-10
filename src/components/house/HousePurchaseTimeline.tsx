import { purchaseSteps } from "@/data/house-detail";

export function HousePurchaseTimeline() {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-dark sm:text-2xl">
        Как проходит покупка
      </h2>
      <div className="mt-6 flex flex-col gap-0 sm:flex-row sm:items-start sm:justify-between">
        {purchaseSteps.map((step, i) => (
          <div key={step.step} className="flex flex-1 flex-col items-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {step.step}
            </div>
            <h3 className="mt-3 text-sm font-semibold text-dark">{step.title}</h3>
            <p className="mt-1 max-w-[140px] text-xs text-gray">{step.description}</p>
            {i < purchaseSteps.length - 1 && (
              <div className="my-3 hidden h-0.5 flex-1 bg-primary/30 sm:block sm:w-full sm:translate-y-5" aria-hidden />
            )}
            {i < purchaseSteps.length - 1 && (
              <div className="my-2 text-primary sm:hidden" aria-hidden>↓</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
