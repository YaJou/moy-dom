import { CityLandingPage } from "@/components/pages/CityLandingPage";
import { getCityLanding } from "@/data/city-landings";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const landing = getCityLanding("saratov");

export const metadata: Metadata = buildPageMetadata({
  title: landing.seoTitle,
  description: landing.seoDescription,
  path: "/catalog/saratov/",
  image: landing.heroImage,
});

export default function SaratovLandingPage() {
  return <CityLandingPage slug="saratov" />;
}
