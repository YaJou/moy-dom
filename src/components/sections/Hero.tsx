import { Button } from "@/components/ui/button";
import { getMinHousePrice } from "@/data/houses";
import { heroBenefits } from "@/data/homepage";
import { heroData } from "@/data/site";
import { formatPrice } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface HeroProps {
  title?: string;
  titleCities?: string;
  subtitle?: string;
  priceFrom?: number;
  primaryHref?: string;
  secondaryHref?: string;
  image?: string;
  imageAlt?: string;
}

export function Hero({
  title = heroData.title,
  titleCities = heroData.titleCities,
  subtitle = heroData.subtitle,
  priceFrom,
  primaryHref = "/catalog",
  secondaryHref = "/#consultation",
  image = heroData.image,
  imageAlt = heroData.imageAlt,
}: HeroProps = {}) {
  const priceLabel = `От ${formatPrice(priceFrom ?? getMinHousePrice())}`;

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[500px] sm:h-[560px] md:h-[640px] lg:h-[700px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />

        <div className="container-main relative flex h-full items-start pt-8 sm:items-center sm:pt-0">
          <div className="hero-content max-w-2xl">
            <h1 className="text-balance text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[52px] lg:leading-[1.12]">
              {title}
              <span className="mt-1 block text-2xl font-semibold text-white/95 sm:text-3xl md:text-4xl lg:text-[40px]">
                {titleCities}
              </span>
            </h1>
            <p className="mt-4 text-2xl font-bold text-primary-light sm:text-3xl">
              {priceLabel}
            </p>
            <p className="mt-2 max-w-xl text-base text-white/85 sm:text-lg">
              {subtitle}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Button asChild size="lg" className="rounded-xl">
                <Link href={primaryHref}>{heroData.primaryButton}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Link href={secondaryHref}>{heroData.secondaryButton}</Link>
              </Button>
            </div>
            <ul className="mt-6 hidden flex-wrap gap-x-4 gap-y-2 sm:flex sm:mt-8">
              {heroBenefits.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 text-xs text-white/90 sm:text-sm"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 text-primary-light" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
