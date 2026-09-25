import { TrackHouseView } from "@/components/house/TrackHouseView";
import { HouseGallery, HouseHeroActions } from "@/components/house/HouseGallery";
import { HousePriceCard, HouseMobileAsk } from "@/components/house/HousePriceCard";
import { HouseKeyFeatures } from "@/components/house/HouseKeyFeatures";
import { HouseFloorPlan } from "@/components/house/HouseFloorPlan";
import { HouseArticle } from "@/components/house/HouseArticle";
import { HouseWhyChoose } from "@/components/house/HouseWhyChoose";
import { HouseAudience } from "@/components/house/HouseAudience";
import { HouseVideoTour } from "@/components/house/HouseVideoTour";
import { HouseCompleteness } from "@/components/house/HouseCompleteness";
import { HouseDocsAndBuild } from "@/components/house/HouseDocsAndBuild";
import { HouseLocationBlock } from "@/components/house/HouseLocationBlock";
import { HouseMortgageSection } from "@/components/house/HouseMortgageSection";
import { HouseSeoContent } from "@/components/house/HouseSeoContent";
import { HouseFAQ } from "@/components/house/HouseFAQ";
import { HouseViewingCTA } from "@/components/house/HouseViewingCTA";
import { SimilarHouses } from "@/components/house/SimilarHouses";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { getHouseDetail } from "@/data/house-detail";
import { getHouseById, realHouses } from "@/data/houses";
import { getCityCatalogHref } from "@/lib/catalog-urls";
import { getReadinessLabel } from "@/lib/house-page";
import {
  buildHouseMetadata,
  buildHouseSchemas,
} from "@/lib/house-seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface HousePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return realHouses.map((house) => ({ id: String(house.id) }));
}

export async function generateMetadata({
  params,
}: HousePageProps): Promise<Metadata> {
  const { id } = await params;
  const house = getHouseById(Number(id));
  if (!house) return {};
  return buildHouseMetadata(house);
}

export default async function HousePage({ params }: HousePageProps) {
  const { id } = await params;
  const house = getHouseById(Number(id));
  if (!house) notFound();

  const detail = getHouseDetail(house);
  const schemas = buildHouseSchemas(house, detail);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Каталог", href: "/catalog" },
          { label: house.city, href: getCityCatalogHref(house.city) },
          { label: house.title },
        ]}
      />

      <article className="hp-page">
        <TrackHouseView houseId={house.id} />
        <div className="container-main">
          <header className="hp-hero-head">
            <div className="hp-hero-top">
              <div>
                <h1 className="hp-h1">{house.title}</h1>
                <p className="hp-address">
                  <a
                    href={house.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hp-link"
                  >
                    {house.address}
                  </a>
                </p>
              </div>
              <div className="hp-hero-meta">
                <span className="hp-status">{getReadinessLabel(house)}</span>
                <HouseHeroActions houseId={house.id} />
              </div>
            </div>
            <HouseMobileAsk house={house} />
          </header>

          <div className="hp-top-grid">
            <div className="hp-top-gallery">
              <HouseGallery house={house} />
            </div>
            <aside className="hp-top-aside">
              <div className="hp-sticky">
                <HousePriceCard house={house} />
              </div>
            </aside>
          </div>

          <HouseKeyFeatures house={house} detail={detail} />
          <HouseFloorPlan house={house} detail={detail} />
          <HouseArticle house={house} detail={detail} />
          <HouseWhyChoose detail={detail} />
          <HouseAudience detail={detail} />
          <HouseVideoTour house={house} detail={detail} />
          <HouseCompleteness house={house} detail={detail} />
          <HouseDocsAndBuild house={house} detail={detail} />
          <HouseLocationBlock house={house} detail={detail} />
          <HouseMortgageSection house={house} />
          <HouseSeoContent house={house} detail={detail} />
          <HouseFAQ detail={detail} />
          <HouseViewingCTA house={house} />
          <SimilarHouses house={house} />
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.product) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.residence) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.listing) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }}
      />
      {schemas.images.map((img, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(img) }}
        />
      ))}
    </>
  );
}
