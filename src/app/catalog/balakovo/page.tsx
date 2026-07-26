import { CityLandingPage } from "@/components/pages/CityLandingPage";
import { getCityLanding } from "@/data/city-landings";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const landing = getCityLanding("balakovo");

export const metadata: Metadata = buildPageMetadata({
  title: landing.seoTitle,
  description: landing.seoDescription,
  path: "/catalog/balakovo/",
  image: landing.heroImage,
});

export default function BalakovoLandingPage() {
  return <CityLandingPage slug="balakovo" />;
}
