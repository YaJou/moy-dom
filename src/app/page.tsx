import { HomeHero } from "@/components/home/HomeHero";
import { HomeFilter } from "@/components/home/HomeFilter";
import { HomeCatalog } from "@/components/home/HomeCatalog";
import { HomeIncluded } from "@/components/home/HomeIncluded";
import { HomeFloorPlans } from "@/components/home/HomeFloorPlans";
import { HomeLocations } from "@/components/home/HomeLocations";
import { HomeConstruction } from "@/components/home/HomeConstruction";
import { HomeMortgage } from "@/components/home/HomeMortgage";
import { HomeTrust } from "@/components/home/HomeTrust";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { HomeViewingSection } from "@/components/home/HomeViewingSection";
import { HomeArticles } from "@/components/home/HomeArticles";
import { PageCitability } from "@/components/seo/PageCitability";
import {
  BreadcrumbJsonLd,
  FaqPageSchema,
  HomePageSchema,
} from "@/components/seo/Schema";
import { homeCitability } from "@/data/geo";
import { homeFaqItems } from "@/data/home-nav";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

const homeTitle =
  "Готовые дома в Энгельсе, Саратове, Балаково — Кров-Сервис";

export default function HomePage() {
  const citations = homeCitability.sources.map((s) => ({
    name: s.label,
    url: s.external ? s.href : absoluteUrl(s.href),
  }));

  const faqForSchema = homeFaqItems.map((item, index) => ({
    id: index + 1,
    question: item.question,
    answer: item.answer,
  }));

  return (
    <>
      <HomePageSchema
        title={homeTitle}
        description={siteConfig.description}
        datePublished={homeCitability.datePublished}
        dateModified={homeCitability.dateModified}
        citations={citations}
      />
      <BreadcrumbJsonLd items={[{ label: "Главная", href: "/" }]} />
      <FaqPageSchema items={faqForSchema} />
      <HomeHero />
      <HomeFilter />
      <HomeCatalog />
      <HomeIncluded />
      <HomeFloorPlans />
      <HomeLocations />
      <HomeConstruction />
      <HomeMortgage />
      <HomeTrust />
      <HomeFAQ />
      <HomeViewingSection />
      <HomeArticles />
      <PageCitability />
    </>
  );
}
