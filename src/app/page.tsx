import dynamic from "next/dynamic";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeFilter } from "@/components/home/HomeFilter";
import { HomeCatalog } from "@/components/home/HomeCatalog";
import { HomeIncluded } from "@/components/home/HomeIncluded";
import { HomeMortgage } from "@/components/home/HomeMortgage";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { HomeViewingSection } from "@/components/home/HomeViewingSection";
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

const HomeFloorPlans = dynamic(
  () =>
    import("@/components/home/HomeFloorPlans").then((m) => m.HomeFloorPlans),
  { loading: () => null }
);
const HomeLocations = dynamic(
  () => import("@/components/home/HomeLocations").then((m) => m.HomeLocations),
  { loading: () => null }
);
const HomeConstruction = dynamic(
  () =>
    import("@/components/home/HomeConstruction").then(
      (m) => m.HomeConstruction
    ),
  { loading: () => null }
);
const HomeTrust = dynamic(
  () => import("@/components/home/HomeTrust").then((m) => m.HomeTrust),
  { loading: () => null }
);
const HomeArticles = dynamic(
  () => import("@/components/home/HomeArticles").then((m) => m.HomeArticles),
  { loading: () => null }
);

const homeTitle =
  "Готовые дома в Энгельсе, Саратове, Балаково — Кров-Сервис";

const LCP_IMAGE =
  "/images/houses/engels-snt-novoe-veselaya-116/02.jpg";

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
      <link
        rel="preload"
        as="image"
        href={LCP_IMAGE}
        fetchPriority="high"
      />
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
