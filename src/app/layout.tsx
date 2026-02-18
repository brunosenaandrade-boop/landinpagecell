import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lp.cellflow.com.br"),
  title: "CellFlow — Sistema para Assistência Técnica e Loja de Celular",
  description:
    "Gerencie ordens de serviço, vendas, estoque, caixa e clientes em um só lugar. Sistema completo para lojas de celular e assistência técnica. 7 dias grátis.",
  keywords: [
    "sistema assistência técnica",
    "sistema loja celular",
    "ordem de serviço celular",
    "PDV assistência técnica",
    "gestão loja celular",
    "controle estoque celular",
    "sistema OS celular",
    "software assistência técnica",
    "gestão assistência técnica",
    "sistema para loja de celular",
    "CellFlow",
  ],
  authors: [{ name: "CellFlow" }],
  creator: "CellFlow",
  publisher: "CellFlow",
  alternates: {
    canonical: "https://lp.cellflow.com.br",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://lp.cellflow.com.br",
    siteName: "CellFlow",
    title: "CellFlow — Sistema para Assistência Técnica e Loja de Celular",
    description:
      "Gerencie ordens de serviço, vendas, estoque, caixa e clientes em um só lugar. 7 dias grátis para testar.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CellFlow — Sistema para Assistência Técnica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CellFlow — Sistema para Assistência Técnica e Loja de Celular",
    description:
      "Gerencie ordens de serviço, vendas, estoque, caixa e clientes em um só lugar. 7 dias grátis.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/icon.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
