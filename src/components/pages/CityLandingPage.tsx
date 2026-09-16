import dynamic from "next/dynamic";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeFilter } from "@/components/home/HomeFilter";
import { HomeCatalog } from "@/components/home/HomeCatalog";
import { HomeIncluded } from "@/components/home/HomeIncluded";
import { HomeMortgage } from "@/components/home/HomeMortgage";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { HomeViewingSection } from "@/components/home/HomeViewingSection";
import { SeoIntro } from "@/components/sections/SeoIntro";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import {
  getCityLanding,
  type CitySlug,
} from "@/data/city-landings";

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

interface CityLandingPageProps {
  slug: CitySlug;
}

export function CityLandingPage({ slug }: CityLandingPageProps) {
  const landing = getCityLanding(slug);
  const includedPhoto =
    slug === "balakovo"
      ? "/images/houses/natalino-stepnaya-87/02.jpg"
      : undefined;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Каталог", href: "/catalog/" },
          { label: landing.city },
        ]}
      />
      <HomeHero
        city={landing.city}
        title={landing.title}
        titleAccent={landing.titleCities}
        subtitle={landing.subtitle}
        catalogHref="#homes"
      />
      <HomeFilter initialCity={landing.city} />
      <HomeCatalog
        city={landing.city}
        title={`Дома в ${landing.city}`}
        subtitle="Сравните расположение, планировку и комплектацию"
        catalogHref={landing.catalogHref}
        limit={6}
      />
      <HomeIncluded city={landing.city} photo={includedPhoto} />
      <HomeFloorPlans city={landing.city} />
      <SeoIntro
        title={landing.seoIntroTitle}
        paragraphs={landing.seoIntroParagraphs}
        image={landing.heroImage}
        imageAlt={landing.heroImageAlt}
      />
      <HomeLocations />
      <HomeConstruction />
      <HomeMortgage />
      <HomeTrust />
      <HomeFAQ />
      <HomeViewingSection />
      <HomeArticles />
    </>
  );
}
