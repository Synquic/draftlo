import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { AgreementsGrid } from "@/components/AgreementsGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { getAppData } from "@/lib/api";

// Force dynamic rendering to fetch fresh data at runtime
export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const data = await getAppData();

  return (
    <Layout data={data}>
      <HeroSection />
      <AgreementsGrid data={data} />
      <HowItWorks />
    </Layout>
  );
}
