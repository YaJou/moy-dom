import { purchaseSteps } from "@/data/site";

export function HowToBuy() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <h2 className="section-title mb-8 text-center sm:mb-10 lg:mb-12">
          Как купить дом
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {purchaseSteps.map((step, index) => (
            <div
              key={step.id}
              className="relative rounded-card border border-border bg-background p-5 sm:p-6"
            >
              {index < purchaseSteps.length - 1 && (
                <div className="absolute -right-2 top-1/2 hidden h-0.5 w-4 bg-border lg:block" />
              )}
              <div className="mb-3 text-2xl font-bold text-primary">{step.step}</div>
              <h3 className="text-base font-semibold text-dark sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
