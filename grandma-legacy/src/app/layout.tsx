import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { siteCopy } from "@/lib/siteCopy";

export const metadata: Metadata = {
  title: siteCopy.metaTitle,
  description: siteCopy.metaDescription
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-ink" suppressHydrationWarning>
      <body className="min-h-dvh">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

