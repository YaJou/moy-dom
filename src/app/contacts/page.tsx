import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { JsonLd } from "@/components/seo/Schema";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Контакты",
  description: `Контакты ${siteConfig.name}: телефон ${siteConfig.phone}, адрес ${siteConfig.address}. Запись на просмотр дома в Энгельсе, Саратове и Балаково.`,
  path: "/contacts/",
});

export default function ContactsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Контакты — ${siteConfig.name}`,
    url: absoluteUrl("/contacts/"),
    mainEntity: {
      "@type": "RealEstateAgent",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Пристанская, 70",
        addressLocality: "Энгельс",
        addressRegion: "Саратовская область",
        addressCountry: "RU",
      },
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Контакты" },
        ]}
      />
      <section className="section-padding bg-white">
        <div className="container-main max-w-3xl">
          <h1 className="section-title">Контакты</h1>
          <p className="mt-3 text-sm text-gray sm:text-base">
            Запишитесь на просмотр дома или задайте вопрос по ипотеке и
            рассрочке.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-card border border-border p-5">
              <h2 className="text-base font-semibold text-dark">Телефон</h2>
              <a
                href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                className="mt-2 block text-lg font-bold text-primary"
              >
                {siteConfig.phone}
              </a>
              <p className="mt-1 text-sm text-gray">{siteConfig.phoneHours}</p>
            </div>
            <div className="rounded-card border border-border p-5">
              <h2 className="text-base font-semibold text-dark">Адрес офиса</h2>
              <p className="mt-2 text-dark">{siteConfig.address}</p>
              <p className="mt-1 text-sm text-gray">{siteConfig.workingHours}</p>
            </div>
            <div className="rounded-card border border-border p-5">
              <h2 className="text-base font-semibold text-dark">Email</h2>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-2 block text-primary hover:underline"
              >
                {siteConfig.email}
              </a>
            </div>
            <div className="rounded-card border border-border p-5">
              <h2 className="text-base font-semibold text-dark">Мессенджеры</h2>
              <div className="mt-2 flex flex-col gap-1 text-sm">
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  WhatsApp
                </a>
                <a
                  href={siteConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Telegram
                </a>
                <a
                  href="https://vk.com/dom_krovservice64"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  ВКонтакте
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
