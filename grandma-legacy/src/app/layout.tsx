import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { siteCopy } from "@/lib/siteCopy";

export const metadata: Metadata = {
  title: siteCopy.metaTitle,
  description: siteCopy.metaDescription,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" }
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "512x512" }]
  }
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

