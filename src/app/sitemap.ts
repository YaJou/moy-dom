import type { MetadataRoute } from "next";
import { realHouses } from "@/data/houses";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/catalog",
    "/catalog/balakovo",
    ...realHouses.map((h) => `/catalog/${h.id}`),
    "/projects",
    "/plots",
    "/built",
    "/blog",
    "/about",
    "/contacts",
    "/reviews",
    "/privacy",
    "/offer",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/catalog/") ? 0.9 : 0.8,
  }));
}
