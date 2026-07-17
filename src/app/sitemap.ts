import type { MetadataRoute } from "next";
import { blogArticles } from "@/data/blog";
import { realHouses } from "@/data/houses";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/catalog",
    "/catalog/saratov",
    "/catalog/engels",
    "/catalog/balakovo",
    "/compare",
    "/blog",
    ...blogArticles.map((a) => `/blog/${a.slug}`),
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
