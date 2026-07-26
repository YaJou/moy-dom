import { siteConfig } from "@/data/site";
import { absoluteUrl, jsonLdScript } from "@/lib/seo";
import type { BreadcrumbItem } from "@/components/seo/Breadcrumb";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLdScript(data)}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: 'ООО "Кров-Сервис"',
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: absoluteUrl("/og-image.jpg"),
    logo: absoluteUrl("/icon.svg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Пристанская, 70",
      addressLocality: "Энгельс",
      addressRegion: "Саратовская область",
      postalCode: "413100",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.4854,
      longitude: 46.1268,
    },
    areaServed: [
      { "@type": "City", name: "Саратов" },
      { "@type": "City", name: "Энгельс" },
      { "@type": "City", name: "Балаково" },
    ],
    priceRange: "₽₽₽",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "17:00",
    },
    sameAs: [
      "https://vk.com/dom_krovservice64",
      siteConfig.telegram,
      siteConfig.whatsapp,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "sales",
      areaServed: "RU",
      availableLanguage: "Russian",
    },
  };

  return <JsonLd data={schema} />;
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ru-RU",
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/catalog/?city={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={schema} />;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const isLast = index === items.length - 1;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        ...(!isLast && item.href
          ? { item: absoluteUrl(item.href) }
          : isLast
            ? {}
            : item.href
              ? { item: absoluteUrl(item.href) }
              : {}),
      };
    }),
  };

  return <JsonLd data={schema} />;
}

export function FaqPageSchema({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  if (!items.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  return <JsonLd data={schema} />;
}

export function ArticleSchema({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image.startsWith("http") ? image : absoluteUrl(image),
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.svg"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
    inLanguage: "ru-RU",
  };
  return <JsonLd data={schema} />;
}
