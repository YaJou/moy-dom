import { ViewingForm, ViewingFormTelegramLink } from "./ViewingForm";

export function HomeViewingSection() {
  return (
    <section id="viewing" className="viewing-section">
      <div className="container-main">
        <div className="viewing-panel">
          <div className="viewing-copy">
            <h2 className="viewing-title">Посмотрите дом вживую</h2>
            <p className="viewing-subtitle">
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
