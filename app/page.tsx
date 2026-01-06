import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { AgreementsGrid } from "@/components/AgreementsGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { getAppData } from "@/lib/api";

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
