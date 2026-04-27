import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { AgreementsGrid } from "@/components/AgreementsGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { getAppData } from "@/lib/api";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Draftlo – Legal Agreements India | Ready Drafts in 5 Minutes",
  description:
    "Get legally compliant legal agreements in India instantly. Rental agreements, NDAs, employment contracts, T&Cs, power of attorney and more. Starting at ₹250.",
  alternates: { canonical: "https://draftlo.com" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Draftlo",
  url: "https://draftlo.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://draftlo.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function Home() {
  const data = await getAppData();

  return (
    <Layout data={data}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HeroSection drafts={data.drafts} />
      <AgreementsGrid data={data} />
      <HowItWorks />
    </Layout>
  );
}
