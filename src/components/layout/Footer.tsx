import {
  footerCities,
  companyRequisites,
} from "@/data/homepage";
import { alertsData, footerLinks, siteConfig } from "@/data/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-forest text-on-forest">
      <div className="container-main py-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr] lg:gap-8">
          <div>
            <p className="text-lg font-extrabold">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-muted-on-forest">
              Готовые дома в Саратовской области
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Города</h4>
            <ul className="space-y-2">
              {footerCities.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-on-forest transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Компания</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-on-forest transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/built/"
                  className="text-sm text-muted-on-forest transition-colors hover:text-white"
                >
                  Построенные дома
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/"
                  className="text-sm text-muted-on-forest transition-colors hover:text-white"
                >
                  Блог
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-on-forest">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                  className="font-semibold text-white hover:text-orange"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.address}</li>
              <li>{siteConfig.workingHours}</li>
            </ul>

            <div className="mt-5 rounded-panel border border-white/16 p-4">
              <p className="text-sm font-semibold text-white">
                {alertsData.title}
              </p>
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex h-10 items-center justify-center rounded-control bg-orange px-4 text-sm font-bold text-text"
              >
                Подписаться в Telegram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/16 pt-6">
          <div className="flex flex-col gap-4 text-xs leading-[18px] text-muted-on-forest sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p>
                © {new Date().getFullYear()} {siteConfig.name}. Все права
                защищены.
              </p>
              <p className="mt-1">
                {companyRequisites.name} · ИНН {companyRequisites.inn} ·{" "}
                {companyRequisites.ogrnLabel} {companyRequisites.ogrn}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy/" className="hover:text-white">
                Политика ПДн
              </Link>
              <Link href="/cookies/" className="hover:text-white">
                Cookie
              </Link>
              <Link href="/offer/" className="hover:text-white">
                Оферта
              </Link>
              <Link href="/documents/" className="hover:text-white">
                Документы
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
