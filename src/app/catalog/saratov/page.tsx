import { CityLandingPage } from "@/components/pages/CityLandingPage";
import { getCityLanding } from "@/data/city-landings";
import type { Metadata } from "next";

const landing = getCityLanding("saratov");

export const metadata: Metadata = {
  title: landing.seoTitle,
  description: landing.seoDescription,
  alternates: { canonical: landing.catalogHref },
  openGraph: {
    title: landing.seoTitle,
    description: landing.seoDescription,
    url: landing.catalogHref,
    locale: "ru_RU",
    type: "website",
  },
};

export default function SaratovLandingPage() {
  return <CityLandingPage slug="saratov" />;
}
