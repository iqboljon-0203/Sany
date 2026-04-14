import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
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
  metadataBase: new URL("https://sanyasia.uz"),
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
    url: "https://sanyasia.uz",
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

import { createClient } from "@/lib/supabase/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('settings').select('*').maybeSingle();

  return (
    <html
      lang="ru"
      className={`${montserrat.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SANY Uzbekistan",
              "alternateName": "SANY AUTOMOBILE MANUFACTURING CENTRAL ASIA",
              "url": "https://sanyasia.uz",
              "logo": "https://sanyasia.uz/favicon.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": settings?.phone_sales || "+998-91-772-72-73",
                "contactType": "sales",
                "areaServed": "UZ",
                "availableLanguage": ["Uzbek", "Russian", "English"]
              },
              "sameAs": [
                settings?.telegram_url || "https://t.me/sany_uz"
              ]
            }),
          }}
        />
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <AppShell settings={settings}>{children}</AppShell>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
