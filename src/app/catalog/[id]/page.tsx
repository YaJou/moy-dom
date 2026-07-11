import { HouseGallery } from "@/components/house/HouseGallery";
import {
  HouseBanks,
  HouseHighlightsBar,
  HouseQuickLinks,
} from "@/components/house/HousePageContent";
import { HousePriceCard } from "@/components/house/HousePriceCard";
import { HouseSpecsGrid } from "@/components/house/HouseSpecs";
import { HouseMobilePrice } from "@/components/house/HouseMobilePrice";
import { HouseFloorPlan } from "@/components/house/HouseFloorPlan";
import { HouseWhyChoose } from "@/components/house/HouseWhyChoose";
import { HouseAudience } from "@/components/house/HouseAudience";
import { HouseIncludedCards } from "@/components/house/HouseIncludedCards";
import { HouseTechTable } from "@/components/house/HouseTechTable";
import { HouseInfrastructure } from "@/components/house/HouseInfrastructure";
import { HouseDistrict } from "@/components/house/HouseDistrict";
import { HousePurchaseTimeline } from "@/components/house/HousePurchaseTimeline";
import { HouseMortgageSection } from "@/components/house/HouseMortgageSection";
import { HouseVideoTour, HouseVideoPlaceholder } from "@/components/house/HouseVideoTour";
import { HouseFAQ } from "@/components/house/HouseFAQ";
import { SimilarHouses } from "@/components/house/SimilarHouses";
import { HouseRelatedArticles } from "@/components/house/HouseRelatedArticles";
import { HouseQuestionsCTA } from "@/components/house/HouseQuestionsCTA";
import { HouseSeoContent } from "@/components/house/HouseSeoContent";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { getHouseDetail } from "@/data/house-detail";
import { getHouseById, realHouses } from "@/data/houses";
import { getCityCatalogHref } from "@/lib/catalog-urls";
import { siteConfig } from "@/data/site";
import {
  buildHouseMetadata,
  buildHouseSchemas,
} from "@/lib/house-seo";
import type { Metadata } from "next";
import Link from "next/link";
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
  const mapEmbed = `https://yandex.ru/map-widget/v1/?ll=${house.lng}%2C${house.lat}&z=16&pt=${house.lng}%2C${house.lat}%2Cpm2orgl`;

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

      <article className="overflow-x-hidden bg-white pb-12 pt-2 sm:pb-16">
        <div className="container-main min-w-0">
          <header className="mb-4 lg:mb-6">
            <h1 className="text-2xl font-bold text-dark sm:text-3xl lg:text-4xl">
              {house.title}
            </h1>
            <HouseMobilePrice house={house} />
            <p className="mt-2 break-words text-sm text-gray sm:text-base">
              {house.district} · {house.address}
            </p>
            <div className="mt-4">
              <HouseHighlightsBar house={house} />
            </div>
          </header>

          <div className="grid min-w-0 gap-8 lg:grid-cols-3 lg:gap-10">
            <aside className="order-1 hidden min-w-0 space-y-6 lg:order-2 lg:block">
              <div className="lg:sticky lg:top-20">
                <HousePriceCard house={house} />
                <div className="mt-4 hidden lg:block">
                  <HouseSpecsGrid house={house} />
                </div>
              </div>
            </aside>

            <div className="order-2 min-w-0 lg:order-1 lg:col-span-2">
              <HouseGallery house={house} />

              <section className="mt-8 space-y-4">
                <h2 className="text-xl font-bold text-dark sm:text-2xl">О доме</h2>
                <p className="text-sm leading-relaxed text-gray sm:text-base">
                  {house.description}
                </p>
              </section>

              <HouseFloorPlan house={house} detail={detail} />
              <HouseWhyChoose detail={detail} />
              <HouseAudience detail={detail} />
              <HouseIncludedCards />
              <HouseTechTable detail={detail} />

              <div className="mt-8 lg:hidden">
                <HouseSpecsGrid house={house} />
              </div>

              <HouseInfrastructure detail={detail} />

              <section className="mt-10">
                <h2 className="text-xl font-bold text-dark sm:text-2xl">
                  Расположение на карте
                </h2>
                <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-card border border-border">
                  <iframe
                    src={mapEmbed}
                    title={`Карта — ${house.title}`}
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                  />
                </div>
                <a
                  href={house.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Открыть в Яндекс.Картах →
                </a>
              </section>

              <HouseDistrict detail={detail} />
              <HousePurchaseTimeline />
              <HouseMortgageSection house={house} detail={detail} />

              {detail.videoUrl ? (
                <HouseVideoTour house={house} detail={detail} />
              ) : (
                <HouseVideoPlaceholder house={house} />
              )}

              <HouseFAQ detail={detail} />
              <HouseSeoContent house={house} detail={detail} />
            </div>
          </div>

          <div className="mt-8">
            <HouseQuickLinks house={house} />
          </div>

          <SimilarHouses house={house} />
          <HouseRelatedArticles />
          <HouseQuestionsCTA />

          <div className="mt-8 rounded-card border border-primary/20 bg-primary-light p-5 sm:p-6">
            <h3 className="text-lg font-bold text-dark">
              Заинтересовал этот дом?
            </h3>
            <p className="mt-2 text-sm text-gray">
              Организуем показ в удобное время. Поможем с ипотекой и оформлением сделки.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                className="flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary-hover"
              >
                {siteConfig.phone}
              </a>
              <Link
                href="/#consultation"
                className="flex h-12 items-center justify-center rounded-xl border border-primary bg-white text-sm font-semibold text-primary hover:bg-white/80"
              >
                Оставить заявку
              </Link>
            </div>
          </div>

          <HouseBanks />
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }}
      />
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.localBusiness) }}
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
