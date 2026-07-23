import type { Metadata } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Serigrafics — Impresión Industrial y Serigrafía",
  description:
    "Taller de impresión industrial especializado en serigrafía, grabado láser, tampografía, sublimación y lonas. Calidad y experiencia en cada proyecto.",
  keywords: [
    "serigrafía",
    "impresiones",
    "grabado láser",
    "sublimación",
    "lonas",
    "tampografía",
    "imprenta",
    "CDMX",
  ],
  openGraph: {
    title: "Serigrafics — Impresión Industrial y Serigrafía",
    description:
      "Taller de impresión industrial especializado en serigrafía, grabado láser, tampografía, sublimación y lonas. Calidad y experiencia en cada proyecto.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <SmoothScroll />
        <Header />
        <main className="flex-1">
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
