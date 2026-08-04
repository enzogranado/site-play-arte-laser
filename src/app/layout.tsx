import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import FloatingCartButton from "@/components/FloatingCartButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://playartelaser.com.br"),
  title: "Play Arte Laser | Corte e Gravação a Laser em São Paulo",
  description:
    "Especialistas em corte a laser, gravação personalizada, acrílico, MDF, LEDs personalizados, copos personalizados e projetos sob medida em São Paulo.",
  keywords: [
    "Corte a laser",
    "Gravação a laser",
    "Acrílico personalizado",
    "MDF personalizado",
    "Copos personalizados",
    "LED personalizado",
    "Letreiro em acrílico",
    "Placas personalizadas",
    "Brindes personalizados",
    "Comunicação visual",
    "Corte CNC",
    "Personalização em São Paulo",
  ],
  authors: [{ name: "Play Arte Laser" }],
  openGraph: {
    title: "Play Arte Laser | Corte e Gravação a Laser em São Paulo",
    description:
      "Transformamos ideias em peças únicas. Corte e gravação a laser de alta precisão em acrílico, MDF, LEDs, copos e brindes personalizados.",
    url: "https://playartelaser.com.br",
    siteName: "Play Arte Laser",
    images: [
      {
        url: "/images/hero_laser.png",
        width: 1200,
        height: 630,
        alt: "Play Arte Laser - Corte e Gravação a Laser",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${poppins.variable} scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 selection:bg-red-600 selection:text-white">
        <CartProvider>
          {children}
          <CartDrawer />
          <FloatingCartButton />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
