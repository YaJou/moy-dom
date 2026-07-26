import type { MetadataRoute } from "next";
import { blogArticles } from "@/data/blog";
import { realHouses } from "@/data/houses";
import { siteConfig } from "@/data/site";

export const dynamic = "force-static";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: string;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: Entry[] = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/catalog/", priority: 0.95, changeFrequency: "daily" },
    { path: "/catalog/saratov/", priority: 0.9, changeFrequency: "weekly" },
    { path: "/catalog/engels/", priority: 0.9, changeFrequency: "weekly" },
    { path: "/catalog/balakovo/", priority: 0.9, changeFrequency: "weekly" },
    { path: "/blog/", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contacts/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/built/", priority: 0.7, changeFrequency: "weekly" },
    { path: "/partners/", priority: 0.5, changeFrequency: "monthly" },
    { path: "/documents/", priority: 0.4, changeFrequency: "monthly" },
    { path: "/cookies/", priority: 0.35, changeFrequency: "yearly" },
    { path: "/privacy/", priority: 0.3, changeFrequency: "yearly" },
    { path: "/offer/", priority: 0.3, changeFrequency: "yearly" },
    { path: "/sitemap/", priority: 0.3, changeFrequency: "monthly" },
  ];

  const houses: Entry[] = realHouses.map((h) => ({
    path: `/catalog/${h.id}/`,
    priority: 0.9,
    changeFrequency: "weekly" as const,
  }));

  const articles: Entry[] = blogArticles.map((a) => ({
    path: `/blog/${a.slug}/`,
    priority: 0.75,
    changeFrequency: "monthly" as const,
    lastModified: a.dateIso,
  }));

  return [...staticPages, ...houses, ...articles].map((entry) => ({
    url:
      entry.path === "/"
        ? `${siteConfig.url}/`
        : `${siteConfig.url}${entry.path}`,
    lastModified: entry.lastModified
      ? new Date(entry.lastModified)
      : new Date(),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
