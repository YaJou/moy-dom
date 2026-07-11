import type { House } from "@/types/house";
import { siteConfig } from "@/data/site";
import { getHouseCover } from "@/lib/house-images";
import { getCityCatalogHref } from "@/lib/catalog-urls";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";
import type { HouseDetailContent } from "@/data/house-detail";

export function buildHouseTitle(house: House): string {
  const readiness =
    house.readiness === "ready" ? "готов к заселению" : "от застройщика";
  return `${house.title} в ${house.district}, ${house.city} — ${formatPrice(house.price)} | ${siteConfig.name}`;
}

export function buildHouseDescription(house: House): string {
  return `${house.shortDescription} Участок ${house.land} сот., ${house.rooms} комн., ${house.area} м². Газ, скважина, ипотека. Звоните: ${siteConfig.phone}.`;
}

export function buildHouseMetadata(house: House): Metadata {
  const title = buildHouseTitle(house);
  const description = buildHouseDescription(house);
  const image = getHouseCover(house);
  const url = `${siteConfig.url}/catalog/${house.id}`;

  return {
    title,
    description,
    alternates: { canonical: `/catalog/${house.id}` },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: "ru_RU",
      images: [{ url: image, width: 1200, height: 630, alt: house.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function buildHouseSchemas(
  house: House,
  detail: HouseDetailContent
) {
  const image = getHouseCover(house);
  const url = `${siteConfig.url}/catalog/${house.id}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Каталог", item: `${siteConfig.url}/catalog` },
      {
        "@type": "ListItem",
        position: 3,
        name: house.city,
        item: `${siteConfig.url}${getCityCatalogHref(house.city)}`,
      },
      { "@type": "ListItem", position: 4, name: house.title, item: url },
    ],
  };

  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: house.title,
    description: house.shortDescription,
    image: house.images.length ? house.images : [image],
    brand: { "@type": "Brand", name: house.builder },
    offers: {
      "@type": "Offer",
      url,
      price: house.price,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: house.builder },
    },
  };

  const residence = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: house.title,
    description: house.shortDescription,
    image,
    url,
    address: {
      "@type": "PostalAddress",
      streetAddress: house.address,
      addressLocality: house.city,
      addressRegion: "Саратовская область",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: house.lat,
      longitude: house.lng,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: house.area,
      unitCode: "MTK",
    },
    numberOfRooms: house.rooms,
    numberOfBathroomsTotal: house.specs.bathroom.includes("2") ? 2 : 1,
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Энгельс",
      addressRegion: "Саратовская область",
      addressCountry: "RU",
    },
    openingHours: "Mo-Su 08:00-17:00",
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const images = house.images.map((img, i) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: img.startsWith("http") ? img : `${siteConfig.url}${img}`,
    name: `${house.title} — фото ${i + 1}`,
    description: house.shortDescription,
  }));

  return { breadcrumb, product, residence, localBusiness, faq, images };
}
