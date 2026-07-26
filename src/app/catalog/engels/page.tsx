import { CityLandingPage } from "@/components/pages/CityLandingPage";
import { getCityLanding } from "@/data/city-landings";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const landing = getCityLanding("engels");

export const metadata: Metadata = buildPageMetadata({
  title: landing.seoTitle,
  description: landing.seoDescription,
  path: "/catalog/engels/",
  image: landing.heroImage,
});

export default function EngelsLandingPage() {
  return <CityLandingPage slug="engels" />;
}
