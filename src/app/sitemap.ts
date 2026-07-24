import type { MetadataRoute } from "next";
import { blogArticles } from "@/data/blog";
import { realHouses } from "@/data/houses";
import { siteConfig } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/catalog/",
    "/catalog/saratov/",
    "/catalog/engels/",
    "/catalog/balakovo/",
    "/compare/",
    "/blog/",
    ...blogArticles.map((a) => `/blog/${a.slug}/`),
    ...realHouses.map((h) => `/catalog/${h.id}/`),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/catalog/") ? 0.9 : 0.8,
  }));
}
