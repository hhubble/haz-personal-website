import type { Metadata } from "next";
import {
  Caveat,
  IM_Fell_English,
  Shadows_Into_Light_Two,
} from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import "./globals.css";
import { PageTurnProvider } from "@/components/page-turn";
import { personJsonLd, siteMetadata } from "@/lib/site";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-caveat",
});

const visitorHand = Shadows_Into_Light_Two({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-visitor-hand",
});

const fellEnglish = IM_Fell_English({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-fell-english",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    siteName: siteMetadata.name,
    images: [
      {
        url: siteMetadata.image,
        width: 1200,
        height: 630,
        alt: siteMetadata.imageAlt,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.image],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${caveat.variable} ${visitorHand.variable} ${fellEnglish.variable}`}
      >
        <Script
          id="person-json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        <a className="skip-link" href="#main-content">
          skip to the writing
        </a>
        <PageTurnProvider>
          <main id="main-content">{children}</main>
        </PageTurnProvider>
      </body>
    </html>
  );
}
