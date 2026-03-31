import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://maat-compliance-simplifier.vercel.app";

export const viewport: Viewport = {
  themeColor: "#0d0f0e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ma'at — Compliance Simplifier",
    template: "%s | Ma'at",
  },
  description:
    "Turn bureaucratic and legal documents into structured action reports. Know what to do, when, and what's at risk — in under 60 seconds.",
  keywords: [
    "compliance simplifier", "legal document", "bureaucracy", "expat Europe",
    "freelancer tax", "VAT notice", "residency letter", "AI compliance",
  ],
  authors: [{ name: "Ma'at" }],
  creator: "Ma'at Compliance",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Ma'at",
    title: "Ma'at — Compliance Simplifier",
    description: "Transform legal complexity into clear action. Understand any notice in under 60 seconds.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ma'at Compliance Simplifier" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ma'at — Compliance Simplifier",
    description: "Transform legal complexity into clear action.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [{ rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
