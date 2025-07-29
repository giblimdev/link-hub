import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jean-Philippe HEURTEUX - Développeur Full-Stack",
  description:
    "Développeur Full-Stack passionné, spécialisé en React/Next.js. Création d'expériences digitales modernes et performantes.",
  keywords:
    "développeur, full-stack, React, Next.js, TypeScript, Node.js, web development",
  authors: [{ name: "Jean-Philippe HEURTEUX" }],
  creator: "Jean-Philippe HEURTEUX",
  openGraph: {
    title: "Jean-Philippe HEURTEUX - Développeur Full-Stack",
    description:
      "Développeur Full-Stack passionné, spécialisé en React/Next.js",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jean-Philippe HEURTEUX - Développeur Full-Stack",
    description:
      "Développeur Full-Stack passionné, spécialisé en React/Next.js",
  },
};

// Nouvelle export viewport séparée
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Header />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
