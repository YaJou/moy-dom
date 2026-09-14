import { siteConfig } from "@/data/site";
import { IconCheck, IconPhone } from "./icons";
import { ViewingForm, ViewingFormTelegramLink } from "./ViewingForm";

const BENEFITS = [
  "Подберём удобное время",
  "Покажем дом и участок",
] as const;

export function HomeViewingSection() {
  return (
    <section id="viewing" className="viewing-section">
      <div className="container-main">
        <div className="viewing-panel">
          <div className="viewing-copy">
            <h2 className="viewing-title">Посмотрите дом вживую</h2>
            <p className="viewing-subtitle">
              Оставьте заявку — договоримся о времени просмотра. Короткий звонок,
              без обязательств.
            </p>

            <ul className="viewing-benefits">
              {BENEFITS.map((item) => (
                <li key={item}>
                  <IconCheck className="h-4 w-4 shrink-0 text-orange" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
              className="viewing-phone-cta"
            >
              <span className="viewing-phone-cta-icon">
                <IconPhone className="h-4 w-4" />
              </span>
              <span>
                <span className="viewing-phone-cta-label">
                  Или позвоните сами
                </span>
                <span className="viewing-phone-cta-number">
                  {siteConfig.phone}
                </span>
              </span>
            </a>

            <ViewingFormTelegramLink />
          </div>
          <ViewingForm id="viewing-form" />
        </div>
      </div>
    </section>
  );
}
