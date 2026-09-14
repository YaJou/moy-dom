import { siteConfig } from "@/data/site";
import { absoluteUrl, jsonLdScript } from "@/lib/seo";
import type { BreadcrumbItem } from "@/components/seo/Breadcrumb";
import { companyRequisites } from "@/data/homepage";

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
    "@type": ["Organization", "RealEstateAgent", "LocalBusiness"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: companyRequisites.name,
    alternateName: companyRequisites.brandName,
    taxID: companyRequisites.inn,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: absoluteUrl("/og-image.jpg"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/krovservice-logo.png"),
    },
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

export function HomePageSchema({
  title,
  description,
  datePublished,
  dateModified,
  citations,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  citations: { name: string; url: string }[];
}) {
  const pageUrl = absoluteUrl("/");
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: "ru-RU",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    author: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    datePublished,
    dateModified,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl("/og-image.jpg"),
    },
    citation: citations.map((c) => ({
      "@type": "CreativeWork",
      name: c.name,
      url: c.url.startsWith("http") ? c.url : absoluteUrl(c.url),
    })),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".section-title", "#faq"],
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
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
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
        url: absoluteUrl("/images/krovservice-logo.png"),
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
