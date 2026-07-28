import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProviders } from "@/components/layout/AppProviders";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  OrganizationSchema,
  WebSiteSchema,
} from "@/components/seo/Schema";
import { homeCitability } from "@/data/geo";
import { siteConfig } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "600", "700"],
  preload: true,
});

const homeTitle =
  "Готовые дома в Саратове, Энгельсе, Балаково — Кров-Сервис";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "готовые дома",
    "частные дома",
    "дома с участком",
    "купить дом",
    "строительная компания",
    "Саратов",
    "Энгельс",
    "Балаково",
    "коттеджи",
    "загородные дома",
    "семейная ипотека",
    "Кров-Сервис",
  ],
  authors: [
    { name: siteConfig.name, url: `${siteConfig.url}/about/` },
    { name: 'ООО "Кров-Сервис"', url: `${siteConfig.url}/about/` },
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "real estate",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  other: {
    "article:author": siteConfig.name,
    "article:published_time": homeCitability.datePublished,
    "article:modified_time": homeCitability.dateModified,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: homeTitle,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: homeTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className="min-h-screen overflow-x-hidden pb-20 font-sans lg:pb-0">
        <AppProviders>
          <Header />
          <main className="overflow-x-hidden">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
