import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { SearchBar } from "@/components/sections/SearchBar";
import { SeoIntro } from "@/components/sections/SeoIntro";
import { KeyFacts } from "@/components/sections/KeyFacts";
import { NewHouses } from "@/components/sections/NewHouses";
import { PopularHouses } from "@/components/sections/PopularHouses";
import { Features } from "@/components/sections/Features";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { MortgageCalculator } from "@/components/sections/MortgageCalculator";
import { AboutCompany } from "@/components/sections/AboutCompany";
import { Cities } from "@/components/sections/Cities";
import { StatsSection } from "@/components/sections/StatsSection";
import { PageCitability } from "@/components/seo/PageCitability";
import {
  BreadcrumbJsonLd,
  FaqPageSchema,
  HomePageSchema,
} from "@/components/seo/Schema";
import { homeCitability } from "@/data/geo";
import { faqData, siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";
import { MapSection } from "@/components/sections/MapSection";

const homeTitle =
  "Готовые дома в Саратове, Энгельсе, Балаково — Кров-Сервис";

const Gallery = dynamic(() =>
  import("@/components/sections/Gallery").then((mod) => mod.Gallery)
);
const VideoSection = dynamic(() =>
  import("@/components/sections/VideoSection").then((mod) => mod.VideoSection)
);
const Reviews = dynamic(() =>
  import("@/components/sections/Reviews").then((mod) => mod.Reviews)
);
const HouseVsApartment = dynamic(() =>
  import("@/components/sections/HouseVsApartment").then((mod) => mod.HouseVsApartment)
);
const IncludedPrice = dynamic(() =>
  import("@/components/sections/IncludedPrice").then((mod) => mod.IncludedPrice)
);
const LocalSEO = dynamic(() =>
  import("@/components/sections/LocalSEO").then((mod) => mod.LocalSEO)
);
const Blog = dynamic(() =>
  import("@/components/sections/Blog").then((mod) => mod.Blog)
);
const Partners = dynamic(() =>
  import("@/components/sections/Partners").then((mod) => mod.Partners)
);
const Certificates = dynamic(() =>
  import("@/components/sections/Certificates").then((mod) => mod.Certificates)
);
const FAQ = dynamic(() =>
  import("@/components/sections/FAQ").then((mod) => mod.FAQ)
);
const ConsultationForm = dynamic(() =>
  import("@/components/sections/ConsultationForm").then((mod) => mod.ConsultationForm)
);
const Newsletter = dynamic(() =>
  import("@/components/sections/Newsletter").then((mod) => mod.Newsletter)
);

export default function HomePage() {
  const citations = homeCitability.sources.map((s) => ({
    name: s.label,
    url: s.external ? s.href : absoluteUrl(s.href),
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
      <FaqPageSchema items={faqData} />
      <Hero />
      <SearchBar />
      <PageCitability />
      <SeoIntro />
      <KeyFacts />
      <NewHouses />
      <PopularHouses />
      <Features />
      <VideoSection />
      <HowToBuy />
      <MortgageCalculator />
      <AboutCompany />
      <Certificates />
      <Cities />
      <MapSection />
      <StatsSection />
      <Gallery />
      <div id="reviews">
        <Reviews />
      </div>
      <HouseVsApartment />
      <IncludedPrice />
      <LocalSEO />
      <Blog />
      <Partners />
      <FAQ />
      <ConsultationForm />
      <Newsletter />
    </>
  );
}
