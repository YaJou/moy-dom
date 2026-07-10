# МОЙ ДОМ — Сайт строительной компании

Современный лендинг для продажи готовых частных домов. Построен на Next.js 15 с App Router, TypeScript и TailwindCSS.

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Сборка

```bash
npm run build
npm start
```

## Структура

```
src/
├── app/              # App Router (layout, page, SEO)
├── components/
│   ├── cards/        # HouseCard, CityCard, FeatureCard, BlogCard, ReviewCard
│   ├── layout/       # Header, Footer
│   ├── sections/     # Hero, SearchBar, Gallery, FAQ и др.
│   ├── seo/          # Schema.org, Breadcrumb
│   └── ui/           # shadcn/ui компоненты
├── data/             # Все тексты и данные
└── lib/              # Утилиты
```

## Замена изображений

Все изображения используют заглушки из Unsplash. Для замены:

1. Положите файлы в `public/images/`
2. Обновите пути в `src/data/site.ts`

## Цветовая схема

- Primary: `#F58220`
- Hover: `#E76A00`
- Light: `#FFF4EA`
- Dark: `#222222`
- Gray: `#6B7280`
- Background: `#FAFAFA`

## SEO

- Metadata API
- OpenGraph / Twitter Cards
- Schema.org (Organization, WebSite, Breadcrumb)
- robots.txt / sitemap.xml
- Canonical URLs
