import { ViewingForm, ViewingFormTelegramLink } from "./ViewingForm";

export function HomeViewingSection() {
  return (
    <section id="viewing" className="bg-page py-8">
      <div className="container-main">
        <div className="grid gap-8 rounded-card bg-orange-soft p-6 sm:p-10 lg:grid-cols-[1fr_440px] lg:gap-14">
          <div>
            <h2 className="h2-desktop text-text">
              Посмотрите дом вживую
            </h2>
            <p className="mt-4 text-lg leading-7 text-muted">
              Выберите город и удобный способ связи. Договоримся о просмотре
            </p>
            <ViewingFormTelegramLink />
          </div>
          <ViewingForm id="viewing-form" />
        </div>
      </div>
    </section>
  );
}
