import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "4 Irmãos | Materiais de Construção e Ferragens",
    template: "%s | 4 Irmãos",
  },
  description:
    "4 Irmãos Materiais de Construção e Ferragens em Manaus. Construção, elétrica, hidráulica, ferragens, ferramentas, acabamento e WhatsApp (92) 98138-6162.",
  keywords: [
    "4 Irmãos",
    "materiais de construção Manaus",
    "ferragens Manaus",
    "elétrica",
    "hidráulica",
    "ferramentas",
    "acabamento",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "4 Irmãos | Materiais de Construção e Ferragens",
    description:
      "Materiais de construção, elétrica, hidráulica, ferragens, ferramentas e acabamento em Manaus.",
    url: "/",
    siteName: "4 Irmãos",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "4 Irmãos | Materiais de Construção e Ferragens",
    description:
      "Construção, elétrica, hidráulica, ferragens, ferramentas e acabamento em Manaus.",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-black text-white antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
