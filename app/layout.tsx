import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers } from "./providers";
import { MetaPixel } from "@/components/MetaPixel";
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
  description: "Generate professional legal drafts within 5 minutes. Rental agreements, employment contracts, NDAs, and more. Fast, easy, and legally compliant.",
  keywords: "legal drafts, rental agreement, employment contract, NDA, legal templates, power of attorney",
  openGraph: {
    title: "Draftlo - Generate Legal Drafts within 5 Minutes",
    description: "Generate professional legal drafts within 5 minutes. Fast, easy, and legally compliant.",
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
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${inter.variable}`}>
      <head>
        <MetaPixel />
      </head>
      <body className="font-body antialiased">
        <Providers>
          <TooltipProvider>
            <AnalyticsProvider>
              <Toaster />
              <Sonner />
              {children}
            </AnalyticsProvider>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
