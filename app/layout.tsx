import type { Metadata } from "next";
import DeferredScrollObserver from '@/components/client/DeferredScrollObserver';
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { generateWebsiteSchema, generateOrganizationSchema } from "@/components/seo/Schema";
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
    template: '%s',
  },
  description:
    'Curated weekend retreats and guided treks in the Himalayas. Starting from Dehradun.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.retreatsandtreks.com',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteSchema()) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
        suppressHydrationWarning 
      >
        <Header />
         <DeferredScrollObserver />
        {children}
        <FloatingWhatsApp />
        <Footer />
      </body>
    </html>
  );
}
