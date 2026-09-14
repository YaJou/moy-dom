import { siteConfig } from "@/data/site";
import { IconCheck, IconPhone } from "./icons";
import { ViewingForm, ViewingFormTelegramLink } from "./ViewingForm";

const BENEFITS = [
  "Ответим за 10 минут",
  "Без навязчивых звонков",
  "Консультация бесплатна",
  "Помощь с ипотекой",
  "Организация просмотра",
] as const;

export function HomeViewingSection() {
  return (
    <section id="viewing" className="viewing-section">
      <div className="container-main">
        <div className="viewing-panel">
          <div className="viewing-copy">
            <h2 className="viewing-title">Посмотрите дом вживую</h2>
            <p className="viewing-subtitle">
              Оставьте заявку — менеджер свяжется с вами в течение 15 минут,
              ответит на вопросы и подберёт подходящие варианты домов.
            </p>
            <p className="viewing-call-note">
              Это просто короткий звонок: без обязательств, без спама и без
              давления — только ответы на ваши вопросы.
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
                  Или просто позвоните — и всё
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
