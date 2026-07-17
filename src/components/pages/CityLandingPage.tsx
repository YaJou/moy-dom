import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { SearchBar } from "@/components/sections/SearchBar";
import { SeoIntro } from "@/components/sections/SeoIntro";
import { NewHouses } from "@/components/sections/NewHouses";
import { PopularHouses } from "@/components/sections/PopularHouses";
import { Features } from "@/components/sections/Features";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { MortgageCalculator } from "@/components/sections/MortgageCalculator";
import { AboutCompany } from "@/components/sections/AboutCompany";
import { Cities } from "@/components/sections/Cities";
import { StatsSection } from "@/components/sections/StatsSection";
import { MapSection } from "@/components/sections/MapSection";
import {
  getCityLanding,
  getCityMinPrice,
  type CitySlug,
} from "@/data/city-landings";
import { DEFAULT_FILTERS } from "@/types/house";

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
  import("@/components/sections/HouseVsApartment").then(
    (mod) => mod.HouseVsApartment
  )
);
const IncludedPrice = dynamic(() =>
  import("@/components/sections/IncludedPrice").then((mod) => mod.IncludedPrice)
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
  import("@/components/sections/ConsultationForm").then(
    (mod) => mod.ConsultationForm
  )
);
const Newsletter = dynamic(() =>
  import("@/components/sections/Newsletter").then((mod) => mod.Newsletter)
);

interface CityLandingPageProps {
  slug: CitySlug;
}

export function CityLandingPage({ slug }: CityLandingPageProps) {
  const landing = getCityLanding(slug);
  const priceFrom = getCityMinPrice(landing.city);
  const housesAnchor = "#houses";

  return (
    <>
      <Hero
        title={landing.title}
        titleCities={landing.titleCities}
        subtitle={landing.subtitle}
        priceFrom={priceFrom}
        primaryHref={housesAnchor}
        secondaryHref="#consultation"
        image={landing.heroImage}
        imageAlt={landing.heroImageAlt}
      />
      <SearchBar
        initialFilters={{ ...DEFAULT_FILTERS, city: landing.city }}
      />
      <SeoIntro
        title={landing.seoIntroTitle}
        paragraphs={landing.seoIntroParagraphs}
        image={landing.heroImage}
        imageAlt={landing.heroImageAlt}
      />
      <div id="houses">
        <NewHouses
          city={landing.city}
          title={`Дома в ${landing.city}`}
          catalogHref={housesAnchor}
        />
      </div>
      <PopularHouses
        city={landing.city}
        title={`Популярные дома в ${landing.city}`}
        catalogHref={housesAnchor}
      />
      <Features />
      <VideoSection />
      <HowToBuy />
      <MortgageCalculator />
      <AboutCompany />
      <Certificates />
      <Cities />
      <MapSection initialCity={landing.city} />
      <StatsSection />
      <Gallery />
      <Reviews />
      <HouseVsApartment />
      <IncludedPrice />
      <Blog />
      <Partners />
      <FAQ />
      <ConsultationForm defaultCity={landing.city} />
      <Newsletter />
    </>
  );
}
