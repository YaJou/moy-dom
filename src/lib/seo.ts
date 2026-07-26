import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

/** Absolute URL. Directories get trailing slash; files with extension do not. */
export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return `${siteConfig.url}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  const isFile = /\.[a-zA-Z0-9]{1,8}$/.test(clean);
  if (isFile) return `${siteConfig.url}${clean}`;
  const withSlash = clean.endsWith("/") ? clean : `${clean}/`;
  return `${siteConfig.url}${withSlash}`;
}

/** Path for Next metadata.alternates.canonical — always with trailing slash. */
export function canonicalPath(path = "/"): string {
  if (!path || path === "/") return "/";
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean.endsWith("/") ? clean : `${clean}/`;
}

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    __html: JSON.stringify(data),
  };
}

type OgOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = "/og-image.jpg",
  type = "website",
  publishedTime,
}: OgOptions): Metadata {
  const url = absoluteUrl(path);
  const canonical = canonicalPath(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image.replace(/\/$/, ""));

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "ru_RU",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        {
          url: image.startsWith("http") ? image : image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path
        ? { item: absoluteUrl(item.path) }
        : index === items.length - 1
          ? {}
          : {}),
    })),
  };
}
