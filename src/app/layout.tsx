import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyContactWidget from "@/components/StickyContactWidget";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sany.uz"), // Assuming production URL
  title: {
    default: "SANY Uzbekistan — Официальный представитель в Узбекистане",
    template: "%s | SANY Uzbekistan",
  },
  description:
    "ИП ООО «SANY AUTOMOBILE MANUFACTURING CENTRAL ASIA» — официальный представитель SANY в Узбекистане и Центральной Азии. Экскаваторы, краны, карьерные самосвалы. Продажа, лизинг, сервис и оригинальные запасные части 24/7.",
  keywords: [
    "SANY",
    "SANY Uzbekistan",
    "SANY Central Asia",
    "экскаватор",
    "автокран",
    "строительная техника",
    "горнодобывающая техника",
    "Узбекистан",
    "лизинг спецтехники",
    "SANY запчасти Ташкент",
  ],
  authors: [{ name: "SANY Uzbekistan" }],
  creator: "SANY AUTOMOBILE MANUFACTURING CENTRAL ASIA",
  publisher: "SANY GROUP",
  robots: "index, follow",
  openGraph: {
    title: "SANY Uzbekistan — Quality Changes the World",
    description:
      "Официальный представитель строительной и горнодобывающей техники SANY. Полный каталог, сервис и запасные части в Узбекистане.",
    url: "https://sany.uz",
    siteName: "SANY Uzbekistan",
    images: [
      {
        url: "/images/sany_logo_main.png",
        width: 1200,
        height: 630,
        alt: "SANY Uzbekistan Official Distributor",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SANY Uzbekistan",
    description: "Техника мирового класса для строительства и горнодобычи.",
    images: ["/images/sany_logo_main.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${montserrat.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyContactWidget />
      </body>
    </html>
  );
}
