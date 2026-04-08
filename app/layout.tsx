import type { Metadata } from "next";
import DeferredScrollObserver from '@/components/client/DeferredScrollObserver';
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { schemaIds, SCHEMA_SITE_URL } from "@/lib/schemaIds";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal"],
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: 'Retreats And Treks — Himalayan Retreats & Weekend Treks',
    template: '%s | Retreats And Treks',
  },
  description:
    'Curated weekend retreats and guided treks in the Himalayas. Starting from Dehradun.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  openGraph: {
    siteName: 'Retreats And Treks',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Himalayan%20Retreats%20%26%20Weekend%20Treks',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  suppressHydrationWarning>
      <head>
        {/* Inline minimal critical CSS for header/nav to reduce render-blocking */}
        <style>{`header{position:fixed;top:0;left:0;right:0;z-index:200;background:rgba(8,14,8,0.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid rgba(15,118,110,0.18)} nav{max-width:72rem;margin:0 auto;padding:0 2rem;height:68px;display:flex;align-items:center;justify-content:space-between}`}</style>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': schemaIds.organization,
              name: 'Retreats And Treks',
              url: SCHEMA_SITE_URL,
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': schemaIds.website,
              name: 'Retreats and Treks',
              url: SCHEMA_SITE_URL,
              publisher: { '@id': schemaIds.organization },
              about: {
                '@type': 'Thing',
                name: 'Himalayan Trekking',
              },
              hasPart: [
                {
                  '@type': 'CollectionPage',
                  url: 'https://www.retreatsandtreks.com/treks/best-treks-in-uttarakhand',
                  name: 'Best Treks in Uttarakhand',
                },
                {
                  '@type': 'CollectionPage',
                  url: 'https://www.retreatsandtreks.com/treks/garhwal-himalayas',
                  name: 'Garhwal Himalaya Treks',
                },
                {
                  '@type': 'CollectionPage',
                  url: 'https://www.retreatsandtreks.com/treks/beginner-treks-uttarakhand',
                  name: 'Beginner Treks in Uttarakhand',
                },
                {
                  '@type': 'CollectionPage',
                  url: 'https://www.retreatsandtreks.com/treks/winter-treks-uttarakhand',
                  name: 'Winter Treks in Uttarakhand',
                },
                {
                  '@type': 'CollectionPage',
                  url: 'https://www.retreatsandtreks.com/treks/summer-treks-uttarakhand',
                  name: 'Summer Treks in Uttarakhand',
                },
                {
                  '@type': 'CollectionPage',
                  url: 'https://www.retreatsandtreks.com/retreats',
                  name: 'Himalayan Retreats',
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
        suppressHydrationWarning 
      >
        <Header />
         <BreadcrumbSchema />
         <DeferredScrollObserver />
        {children}
        <Footer />
      </body>
    </html>
  );
}
