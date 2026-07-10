import { FavoritesProvider } from "@/context/FavoritesContext";
import { CompareBar } from "@/components/layout/CompareBar";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      {children}
      <CompareBar />
      <StickyMobileCTA />
    </FavoritesProvider>
  );
}
