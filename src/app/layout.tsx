import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyContactWidget from "@/components/StickyContactWidget";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n";

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
  metadataBase: new URL("https://sany-asia.uz"),
  alternates: {
    canonical: '/',
    languages: {
      'ru-RU': '/ru',
      'uz-UZ': '/uz',
      'en-US': '/en',
    },
  },
  title: {
    default: "SANY Uzbekistan — Официальный дистрибьютор в Центральной Азии",
    template: "%s | SANY Uzbekistan",
  },
  description:
    "SANY AUTOMOBILE MANUFACTURING CENTRAL ASIA — официальный представитель SANY в Узбекистане. Продажа экскаваторов, кранов, карьерных самосвалов и спецтехники. Сервис 24/7 и оригинальные запчасти.",
  keywords: [
    "SANY",
    "SANY Uzbekistan",
    "SANY Asia",
    "SANY Central Asia",
    "SANY Tashkent",
    "экскаватор sany",
    "автокран sany",
    "купить экскаватор узбекистан",
    "спецтехника в ташкенте",
    "продажа кранов sany",
    "запчасти sany узбекистан",
    "лизинг спецтехники узбекистан",
  ],
  authors: [{ name: "SANY Uzbekistan" }],
  creator: "SANY AUTOMOBILE MANUFACTURING CENTRAL ASIA",
  publisher: "SANY GROUP",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "SANY Uzbekistan — Quality Changes the World",
    description:
      "Официальный дистрибьютор строительной и горнодобывающей техники SANY. Полный каталог, сервис и запасные части в Узбекистане и Центральной Азии.",
    url: "https://sany-asia.uz",
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
    title: "SANY Uzbekistan | Официальный Дилер",
    description: "Надежная техника мирового класса для строительства и горнодобычи в Центральной Азии.",
    images: ["/images/sany_logo_main.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <Navbar />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "SANY Uzbekistan",
                  "alternateName": "SANY AUTOMOBILE MANUFACTURING CENTRAL ASIA",
                  "url": "https://sany-asia.uz",
                  "logo": "https://sany-asia.uz/favicon.svg",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+998-91-772-72-73",
                    "contactType": "sales",
                    "areaServed": "UZ",
                    "availableLanguage": ["Uzbek", "Russian", "English"]
                  },
                  "sameAs": [
                    "https://t.me/sany_uzbekistan"
                  ]
                }),
              }}
            />
            <main className="flex-1">{children}</main>
            <Footer />
            <StickyContactWidget />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
