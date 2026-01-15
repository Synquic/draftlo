import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { AgreementsGrid } from "@/components/AgreementsGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { getAppData } from "@/lib/api";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function Home() {
  const data = await getAppData();

  return (
    <Layout data={data}>
      <HeroSection drafts={data.drafts} />
      <AgreementsGrid data={data} />
      <HowItWorks />
    </Layout>
  );
}
