import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/constants";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const description =
    SITE_CONFIG.description[locale as keyof typeof SITE_CONFIG.description] ??
    SITE_CONFIG.description.en;

  return {
    title: {
      default: SITE_CONFIG.title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: "/",
      languages: {
        pt: "/",
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      title: SITE_CONFIG.title,
      description,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      locale: locale === "pt" ? "pt_BR" : locale === "es" ? "es_ES" : "en_US",
      type: "website",
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
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "pt" | "en" | "es")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
