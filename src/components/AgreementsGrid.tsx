import { CategoryCard } from "./CategoryCard";
import type { AppData } from "@/lib/api";

interface AgreementsGridProps {
  data: AppData;
}

export const AgreementsGrid = ({ data }: AgreementsGridProps) => {

  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data?.categories?.map((agreement) => (
            <CategoryCard key={agreement.name} {...agreement} />
          ))}
        </div>
      </div>
    </section>
  );
};
