import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers } from "./providers";
import { MetaPixel } from "@/components/MetaPixel";
import { GoogleTagManager } from "@/components/GoogleTagManager";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import "@/index.css";
import { DM_Sans, Inter } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Draftlo – Legal Agreements India | Ready Drafts in 5 Minutes",
  description:
    "Get legally compliant legal agreements in India instantly. Rental agreements, NDAs, employment contracts, T&Cs, power of attorney and more. Starting at ₹250.",
  keywords:
    "legal agreements India, legal drafts India, rental agreement India, employment contract India, NDA India, legal templates India, power of attorney India",
  alternates: {
    canonical: "https://draftlo.com",
  },
  verification: {
    other: {
      "facebook-domain-verification": "dsqs8e04v4yuy5thze53mpqpkc92nc",
    },
  },
  openGraph: {
    title: "Draftlo – Legal Agreements India | Ready Drafts in 5 Minutes",
    description:
      "Get legally compliant legal agreements in India instantly. Rental agreements, NDAs, employment contracts and more. Starting at ₹250.",
    type: "website",
    url: "https://draftlo.com",
    siteName: "Draftlo",
    images: [
      {
        url: "https://draftlo.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Draftlo – Legal Agreements India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Draftlo – Legal Agreements India | Ready Drafts in 5 Minutes",
    description:
      "Get legally compliant legal agreements in India instantly. Starting at ₹250.",
    images: ["https://draftlo.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${inter.variable}`}
    >
      <head>
        {/* Meta Pixel */}
        <MetaPixel />

        {/* Google Tag Manager */}
        <GoogleTagManager />

        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Draftlo",
              url: "https://draftlo.com",
              logo: "https://draftlo.com/og-image.png",
              description:
                "Draftlo provides legally compliant legal agreements in India including rental agreements, NDAs, employment contracts, and more.",
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: "English",
              },
            }),
          }}
        />
      </head>

      <body className="font-body antialiased min-h-screen">
        <Providers>
          <TooltipProvider>
            <Suspense fallback={null}>
              <AnalyticsProvider>
                {/* 🔑 ROOT STRUCTURE FIX */}
                <div className="flex min-h-screen flex-col overflow-x-hidden">
                  <Toaster />
                  <Sonner />

                  {/* Pages (Navbar lives inside pages) */}
                  <main className="flex-1 overflow-visible">
                    {children}
                  </main>
                </div>
              </AnalyticsProvider>
            </Suspense>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
