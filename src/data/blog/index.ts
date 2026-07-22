import { ipotekaBlocks, otdelkaBlocks } from "@/data/blog/articles/short";
import { prichinyBlocks } from "@/data/blog/articles/prichiny";
import { uchastokBlocks } from "@/data/blog/articles/uchastok";

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | {
      type: "callout";
      variant: "tip" | "warning" | "conclusion" | "info";
      title: string;
      text: string;
    }
  | { type: "links"; title: string; links: { label: string; href: string }[] }
  | {
      type: "stats";
      items: { value: string; label: string }[];
    }
  | {
      type: "compare";
      leftTitle: string;
      rightTitle: string;
      rows: {
        label: string;
        left: string;
        right: string;
        winner?: "left" | "right";
      }[];
    }
  | {
      type: "interactive";
      kind: "reasons" | "quiz" | "timeline";
    };

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateIso: string;
  category: "construction" | "mortgage" | "general";
  popular: boolean;
  readTime: string;
  image: string;
  blocks: ArticleBlock[];
  relatedSlugs: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "uchastok",
    title: "Как выбрать участок для строительства дома: полное руководство 2026",
    description:
      "Как выбрать земельный участок под строительство дома в Саратовской области: категория земли, коммуникации, кадастр, рельеф, юридическая проверка. Таблицы, чек-листы и советы застройщика Кров-Сервис.",
    date: "15 мая 2025",
    dateIso: "2025-05-15",
    category: "construction",
    popular: true,
    readTime: "18 мин",
    image: "/images/blog/blog-1.jpg",
    relatedSlugs: ["ipoteka", "otdelka", "prichiny"],
    blocks: uchastokBlocks,
  },
  {
    slug: "ipoteka",
    title: "Ипотека на готовый дом: пошаговая инструкция",
    description:
      "Как оформить ипотеку на готовый частный дом в Саратове, Энгельсе и Балаково: семейная ипотека, документы, банки, одобрение.",
    date: "3 марта 2026",
    dateIso: "2026-03-03",
    category: "mortgage",
    popular: true,
    readTime: "12 мин",
    image: "/images/blog/blog-2.jpg",
    relatedSlugs: ["uchastok", "otdelka", "prichiny"],
    blocks: ipotekaBlocks,
  },
  {
    slug: "otdelka",
    title: "Предчистовая отделка: что входит и зачем нужна",
    description:
      "Что такое предчистовая отделка в готовом доме: стяжка, штукатурка, электрика, тёплый пол. Сколько стоит чистовой ремонт после заселения.",
    date: "14 января 2026",
    dateIso: "2026-01-14",
    category: "construction",
    popular: false,
    readTime: "9 мин",
    image: "/images/blog/blog-3.jpg",
    relatedSlugs: ["uchastok", "ipoteka", "prichiny"],
    blocks: otdelkaBlocks,
  },
  {
    slug: "prichiny",
    title: "5 причин выбрать готовый дом вместо строительства",
    description:
      "Готовый дом или стройка с нуля? Сравнение сроков, бюджета, ипотеки и гарантии. Таблицы, интерактивный тест и честный разбор — когда выгоднее купить готовый дом в Саратовской области.",
    date: "28 ноября 2025",
    dateIso: "2025-11-28",
    category: "construction",
    popular: true,
    readTime: "14 мин",
    image: "/images/blog/blog-4.jpg",
    relatedSlugs: ["uchastok", "ipoteka", "otdelka"],
    blocks: prichinyBlocks,
  },
];

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getBlogArticleHref(slug: string): string {
  return `/blog/${slug}`;
}
