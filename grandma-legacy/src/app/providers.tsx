"use client";

import { BackgroundMusicProvider } from "@/components/BackgroundMusicProvider";
import { LenisProvider } from "@/components/LenisProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <BackgroundMusicProvider>{children}</BackgroundMusicProvider>
    </LenisProvider>
  );
}

