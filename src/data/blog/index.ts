import { ipotekaBlocks } from "@/data/blog/articles/ipoteka";
import { otdelkaBlocks } from "@/data/blog/articles/otdelka";
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
      kind:
        | "reasons"
        | "quiz"
        | "timeline"
        | "finish-stages"
        | "finish-checklist"
        | "finish-quiz"
        | "finish-viewing-checklist"
        | "finish-houses-cta";
    };

export interface BlogArticleAuthor {
  name: string;
  role: string;
  experience: string;
  href: string;
  photo?: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  /** Короткий заголовок для карточек на /blog */
  cardTitle?: string;
  description: string;
  /** 1–2 предложения под заголовком карточки */
  excerpt: string;
  date: string;
  dateIso: string;
  updatedDate?: string;
  updatedDateIso?: string;
  category: "construction" | "mortgage" | "general";
  /** Тема для бейджа: ОТДЕЛКА, УЧАСТОК… */
  topicLabel: string;
  categoryLabel?: string;
  popular: boolean;
  /** Время чтения по объёму текста (~180 сл./мин + таблицы) */
  readTime: string;
  image: string;
  coverCaption?: string;
  layout?: "default" | "journal";
  author?: BlogArticleAuthor;
  blocks: ArticleBlock[];
  relatedSlugs: string[];
  /** Выделенный материал «С чего начать» */
  featured?: boolean;
  featuredTitle?: string;
  featuredDescription?: string;
  featuredCta?: string;
  /** Якорь задачи на хабе статей */
  taskId?: "house" | "plot" | "finish" | "purchase";
}

export const blogHubCopy = {
  title: "Что нужно знать перед покупкой дома",
  description:
    "Как выбрать участок, разобраться в отделке, оценить расходы и подготовиться к покупке. Объясняем на примерах частных домов.",
  tasks: [
    { id: "house" as const, label: "Выбираю дом", slug: "prichiny" },
    { id: "plot" as const, label: "Изучаю участок", slug: "uchastok" },
    { id: "finish" as const, label: "Разбираюсь в отделке", slug: "otdelka" },
    { id: "purchase" as const, label: "Планирую покупку", slug: "ipoteka" },
  ],
  author: {
    name: "Команда Кров-Сервис",
    role: "Сопровождение просмотров и комплектации",
    headline: "Разбираем вопросы, которые слышим на просмотрах",
    text: "В статьях объясняем комплектацию домов и показываем детали на наших объектах.",
    topics: "Участок · Отделка · Ипотека · Готовый дом или стройка",
    href: "/about/",
    photo: "/images/blog/prichiny/04-house-inspection.jpg",
  },
  catalogCta: {
    title: "Посмотрите, как это выглядит в конкретном доме",
    description:
      "Фотографии, планировки и состав отделки — в карточках объектов.",
    button: "Посмотреть дома",
    href: "/catalog/",
  },
} as const;

export const blogArticles: BlogArticle[] = [
  {
    slug: "uchastok",
    title: "Как выбрать участок под дом: что проверить до покупки",
    cardTitle: "Как выбрать участок под дом: что проверить до покупки",
    description:
      "Разбираем документы, размеры, подъезд и коммуникации. Показываем, какие вопросы задать продавцу и что учесть помимо цены земли.",
    excerpt:
      "Документы, размеры, подъезд и коммуникации. Какие вопросы задать продавцу и что учесть помимо цены земли.",
    date: "15 мая 2025",
    dateIso: "2025-05-15",
    updatedDate: "16 сентября 2026",
    updatedDateIso: "2026-09-16",
    category: "construction",
    topicLabel: "Участок",
    categoryLabel: "Участок",
    popular: true,
    readTime: "14 мин",
    image: "/images/design-kit/12-plot-and-access.jpg",
    coverCaption:
      "Подъезд и окружение участка: дорога, ограждение и соседняя застройка.",
    layout: "journal",
    taskId: "plot",
    author: {
      name: "Кров-Сервис",
      role: "Отдел продаж и сопровождения объектов",
      experience:
        "Помогаем оценить участок вместе с домом: подъезд, двор, коммуникации и вопросы до покупки. Юридический вывод — по документам конкретного объекта.",
      href: "/about/",
    },
    relatedSlugs: ["prichiny", "otdelka", "ipoteka"],
    blocks: uchastokBlocks,
  },
  {
    slug: "ipoteka",
    title: "Ипотека на готовый дом: от выбора до получения ключей",
    cardTitle: "Ипотека на готовый дом: шаги и расходы",
    description:
      "С чего начать покупку дома с участком: как сравнить условия, подготовить документы и разобраться с расходами до сделки",
    excerpt:
      "Как сравнить условия банка, собрать документы и заранее учесть расходы до сделки.",
    date: "3 марта 2026",
    dateIso: "2026-03-03",
    updatedDate: "15 сентября 2026",
    updatedDateIso: "2026-09-15",
    category: "mortgage",
    topicLabel: "Ипотека",
    categoryLabel: "Покупка дома",
    popular: true,
    readTime: "12 мин",
    image: "/images/blog/mortgage/02-mortgage-budget.jpg",
    coverCaption: "Расчёт бюджета и подготовка к покупке дома",
    layout: "journal",
    taskId: "purchase",
    author: {
      name: "Кров-Сервис",
      role: "Отдел продаж и сопровождения объектов",
      experience:
        "Помогаем с информацией по домам, комплектацией и организацией просмотра. Решение по кредиту принимает банк.",
      href: "/about/",
    },
    relatedSlugs: ["uchastok", "otdelka", "prichiny"],
    blocks: ipotekaBlocks,
  },
  {
    slug: "otdelka",
    title: "Предчистовая отделка: что уже сделано и что останется вам",
    cardTitle: "Предчистовая отделка: что уже сделано и что останется вам",
    description:
      "Какие работы закрывает предчистовая отделка, чем она отличается от черновой и «под ключ», что проверить на просмотре и где возможны дополнительные расходы.",
    excerpt:
      "Разбираем стены, полы и коммуникации. Какие вопросы задать продавцу и что учесть перед ремонтом.",
    date: "14 января 2026",
    dateIso: "2026-01-14",
    updatedDate: "14 сентября 2026",
    updatedDateIso: "2026-09-14",
    category: "construction",
    topicLabel: "Отделка",
    categoryLabel: "Отделка и комплектация",
    popular: false,
    readTime: "9 мин",
    image: "/images/design-kit/07-pre-finish-interior.jpg",
    coverCaption:
      "Пример помещения с предчистовой подготовкой: ровные стены и стяжка под чистовой ремонт. Уточняйте точный состав работ по выбранному дому — комплектация объектов может отличаться.",
    layout: "journal",
    taskId: "finish",
    author: {
      name: "Кров-Сервис",
      role: "Отдел продаж и сопровождения объектов",
      experience:
        "Помогаем покупателям сверять комплектацию на просмотре: стены, стяжка, инженерия и состав работ в договоре.",
      href: "/about/",
    },
    relatedSlugs: ["prichiny", "uchastok", "ipoteka"],
    blocks: otdelkaBlocks,
  },
  {
    slug: "prichiny",
    title: "Готовый дом или строительство: что подойдёт вам",
    cardTitle: "Готовый дом или строительство: что подойдёт вам",
    description:
      "У готового дома можно заранее посмотреть планировку, участок и качество отделки. Разбираем, когда такой вариант удобнее, что всё равно придётся проверить и в каких случаях лучше строить под себя",
    excerpt:
      "Сравниваем свободу выбора, организацию работ и расходы. Когда удобнее готовый дом, а когда — стройка под себя.",
    date: "28 ноября 2025",
    dateIso: "2025-11-28",
    updatedDate: "15 сентября 2026",
    updatedDateIso: "2026-09-15",
    category: "construction",
    topicLabel: "Выбор",
    categoryLabel: "Покупка дома",
    popular: true,
    readTime: "12 мин",
    image: "/images/blog/prichiny/02-house-construction.jpg",
    coverCaption: "Этап строительства и готовый дом — сравниваем подходы",
    layout: "journal",
    featured: true,
    featuredTitle: "Купить готовый дом или строить с нуля?",
    featuredDescription:
      "Сравниваем свободу выбора, организацию работ и расходы. Разбираем, когда имеет смысл каждый вариант.",
    featuredCta: "Сравнить варианты",
    taskId: "house",
    author: {
      name: "Кров-Сервис",
      role: "Отдел продаж и сопровождения объектов",
      experience:
        "Помогаем сравнить готовые дома: планировку, участок, комплектацию и оставшиеся работы до переезда.",
      href: "/about/",
    },
    relatedSlugs: ["ipoteka", "otdelka", "uchastok"],
    blocks: prichinyBlocks,
  },
];

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getBlogArticleHref(slug: string): string {
  return `/blog/${slug}/`;
}

export function getFeaturedArticle(): BlogArticle | undefined {
  return blogArticles.find((a) => a.featured);
}

export function getHubArticles(): BlogArticle[] {
  return blogArticles.filter((a) => !a.featured);
}
