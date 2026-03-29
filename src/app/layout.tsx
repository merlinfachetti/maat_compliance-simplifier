import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ma'at Compliance | Turn bureaucracy into action",
  description:
    "A focused compliance simplifier that turns dense legal and bureaucratic text into clear actions, risks, and next steps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
