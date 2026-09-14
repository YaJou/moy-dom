"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ViewingFormContext } from "./ViewingForm";
import { ViewingModal } from "./ViewingModal";

interface ViewingModalContextValue {
  openViewing: (context?: ViewingFormContext) => void;
  closeViewing: () => void;
}

const ViewingModalContext = createContext<ViewingModalContextValue | null>(
  null
);

export function ViewingModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [context, setContext] = useState<ViewingFormContext | undefined>();

  const openViewing = useCallback((ctx?: ViewingFormContext) => {
    setContext(ctx);
    setOpen(true);
  }, []);

  const closeViewing = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({ openViewing, closeViewing }),
    [openViewing, closeViewing]
  );

  return (
    <ViewingModalContext.Provider value={value}>
      {children}
      <ViewingModal
        open={open}
        onClose={closeViewing}
        context={context}
        defaultCity={context?.city}
      />
    </ViewingModalContext.Provider>
  );
}

export function useViewingModal() {
  const ctx = useContext(ViewingModalContext);
  if (!ctx) {
    throw new Error("useViewingModal must be used within ViewingModalProvider");
  }
  return ctx;
}
