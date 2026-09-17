"use client";

import { CompareProvider } from "@/context/CompareContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { FormSuccessToast } from "@/components/feedback/FormSuccessToast";
import { ViewingModalProvider } from "@/components/home/ViewingModalProvider";
import { CompareBar } from "@/components/layout/CompareBar";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { CookieBanner } from "@/components/legal/CookieBanner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <CompareProvider>
        <ViewingModalProvider>
          {children}
          <CompareBar />
          <StickyMobileCTA />
          <CookieBanner />
          <FormSuccessToast />
        </ViewingModalProvider>
      </CompareProvider>
    </FavoritesProvider>
  );
}
