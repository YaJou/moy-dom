"use client";

import { CompareProvider } from "@/context/CompareContext";
import { CompareBar } from "@/components/layout/CompareBar";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { CookieBanner } from "@/components/legal/CookieBanner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CompareProvider>
      {children}
      <CompareBar />
      <StickyMobileCTA />
      <CookieBanner />
    </CompareProvider>
  );
}
