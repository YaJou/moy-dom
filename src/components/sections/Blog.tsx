"use client";

import { blogData } from "@/data/site";
import { blogTabs } from "@/data/homepage";
import { BlogCard } from "@/components/cards/BlogCard";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export function Blog() {
  const [activeTab, setActiveTab] = useState("latest");

  const filtered = useMemo(() => {
    switch (activeTab) {
      case "popular":
        return blogData.filter((a) => a.popular);
      case "mortgage":
        return blogData.filter((a) => a.category === "mortgage");
      case "construction":
        return blogData.filter((a) => a.category === "construction");
      default:
        return blogData;
    }
  }, [activeTab]);

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="section-title">Полезные статьи</h2>
          <Link href="/blog" className="section-link shrink-0">
            Все статьи
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
          {blogTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "border border-border bg-background text-dark hover:border-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
          {filtered.map((article) => (
            <BlogCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
