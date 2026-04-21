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
  title: "Draftlo - Generate Legal Drafts within 5 Minutes",
  description:
    "Generate professional legal drafts within 5 minutes. Rental agreements, employment contracts, NDAs, and more. Fast, easy, and legally compliant.",
  keywords:
    "legal drafts, rental agreement, employment contract, NDA, legal templates, power of attorney",
  verification: {
    other: {
      "facebook-domain-verification": "dsqs8e04v4yuy5thze53mpqpkc92nc",
    },
  },
  openGraph: {
    title: "Draftlo - Generate Legal Drafts within 5 Minutes",
    description:
      "Generate professional legal drafts within 5 minutes. Fast, easy, and legally compliant.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
      </head>

      <body className="font-body antialiased min-h-screen">
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5JKQJWJC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Providers>
          <TooltipProvider>
            <Suspense fallback={null}>
              <AnalyticsProvider>
                {/* ROOT STRUCTURE FIX */}
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
